# Pawan Kumar — Portfolio

A production-oriented personal portfolio: **Next.js 15** (App Router), React 19, Tailwind CSS v4, accessible UI primitives, motion, and **Supabase** for contact form persistence plus optional **email notifications** via an Edge Function and Resend.

---

## Quick start

```bash
npm install
npm run dev          # Next.js dev server (port 5199)
npm run build        # production build (.next/)
npm run start        # serve production build locally (port 5199)
npm run lint         # ESLint
```

Copy [`.env.example`](.env.example) to `.env.local` and set `NEXT_PUBLIC_SUPABASE_*` before using the contact form (the browser client throws if they are missing when submitting).

---

## Tech stack

| Layer             | Choice                                                     | Why                                                                                                           |
| ----------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| UI                | **React 19**                                               | Concurrent-ready, modern hooks, ecosystem fit.                                                                |
| Build             | **Next.js 15**                                             | App Router, SSR/SSG, built-in routing, Vercel-optimized production builds.                                    |
| Styling           | **Tailwind CSS v4** + **`@tailwindcss/postcss`**           | Tokens and `@import "tailwindcss"` in `app/globals.css`.                                                      |
| Components        | **Radix UI** (`dialog`, `tooltip`, `slot`)                 | Unstyled primitives with focus management and ARIA; styled in-house for a custom look.                        |
| Motion            | **Framer Motion**                                          | Scroll-linked and in-view animations without hand-rolling physics.                                            |
| Icons             | **lucide-react**                                           | Consistent stroke icons, tree-shakeable.                                                                      |
| Class names       | **clsx**, **tailwind-merge**, **class-variance-authority** | Predictable composition for variants and conflicting utilities.                                               |
| Backend (contact) | **Supabase** (Postgres + PostgREST + Edge Functions)       | Managed Postgres, row-level security, serverless hooks without running your own API server for a simple form. |
| Email             | **Resend** (from Edge Function)                            | HTTP API from Deno; no secret keys in the browser.                                                            |

---

## Repository layout

```
portfolio/
├── app/
│   ├── layout.tsx             # Root layout, ThemeProvider, globals.css, fonts
│   ├── page.tsx               # Portfolio (default host)
│   ├── globals.css            # Tailwind + design tokens
│   ├── blog/                  # Blog routes (subdomain via middleware)
│   └── frontend/              # Frontend hub routes
├── middleware.ts              # Hostname → /blog/*, /frontend/* rewrites
├── public/
│   └── assets/                # Static images (see “Static assets” below)
├── src/
│   ├── apps/                  # portfolio, blog, frontend feature UI
│   ├── shared/                # Cross-app components, contact, content, theme, lib
│   ├── config/hostApps.ts     # Hostname registry for links
│   └── lib/                   # hostRouting, pathname helpers
└── supabase/
    ├── config.toml            # Local Supabase + Edge Function settings
    ├── migrations/
    │   └── 001_create_contacts.sql
    ├── functions/
    │   └── contact-notification/
    │       └── index.ts       # Webhook receiver → Resend email
    └── seed.sql
```

---

## Architecture and design decisions

### Section-based composition

The portfolio is built from **layout** (`Header`, `Footer`) and **sections** under `src/apps/portfolio/sections/`. Each section owns its UI and imports only what it needs. `PortfolioApp.tsx` passes slices of `data` as props so sections stay testable and dumb where possible.

**Sticky scroll stacks** (`ExperienceStack`, `ProjectsStack`, `Skills`) are rendered **outside** the generic `Section` wrapper on purpose: `Section` uses Framer Motion `whileInView` transforms that would break `position: sticky` behavior. This is called out in comments in `PortfolioApp.tsx`.

### Content vs presentation

All narrative content, project metadata, timeline entries, skills, certificate rows, and **paths to images** live in `src/shared/content/data.ts`. Components render that data; they do not embed long copy. That keeps updates to one file and avoids scattering strings across JSX.

### Shared layer

`src/shared/` holds cross-cutting UI (`Section`, `SectionHeader`, UI primitives under `shared/components/ui/`), hooks (`useStackScroll`, `useScrolled`, etc.), and small utilities (`cn.js`). This avoids a single oversized `components/` folder and groups by purpose.

### Theming: local time + user override

Theme behavior is implemented in `src/shared/theme/`:

- **`localTimeTheme.ts`** defines `auto` as **light from 06:00–17:59** local time and **dark otherwise** (configurable helpers).
- User preference is stored under **`portfolio-theme`** in `localStorage` (`light` | `dark` | `auto`).
- **`ThemeProvider.tsx`** applies the resolved mode, syncs across tabs via `storage` events, and exposes context for the toggle.
- **`app/layout.tsx`** uses Next `Script` (`beforeInteractive`) with the same logic to set `theme-color` / `class` before paint and reduce flash.

**Why:** Many portfolios only offer manual light/dark. Here, `auto` ties the default to the visitor’s day/night without removing manual control.

### Styling model

- **CSS variables** in `app/globals.css` define surfaces, borders, accents, and dark-mode overrides under `.dark`.
- **Tailwind** consumes those via theme extension patterns and utility classes.
- Plugins in `package.json` (`@tailwindcss/forms`, `typography`, `aspect-ratio`) support form styling and rich text if you extend content later.

### Animations

Framer Motion drives scroll progress at the top of the viewport, section entrances, and interactive hovers. Animations are progressive enhancement: the layout and content remain usable if motion is reduced or disabled at the OS level (you can extend with `prefers-reduced-motion` if you tighten a11y further).

### Accessibility

Radix primitives supply focus traps, keyboard navigation, and correct roles for dialog and tooltip. Semantic headings and landmarks are preserved in section components.

---

## Static assets (`public/assets/`)

Raster and vector files (logos, project screenshots, certificates, profile photo, animated logo) live under **`public/assets/`**.

Next.js serves the `public/` directory at the **site root**, so files are referenced as **`/assets/<filename>`** (e.g. `/assets/my-image.jpeg`).

**Why not `import` from `src/assets`?**

- **Stable URLs:** Content in `data.js` stays plain strings; no need for a barrel file re-exporting every image.
- **Predictable caching:** You can CDN-cache `/assets/*` with long TTLs and optional cache-busting filenames if you change files later.
- **Separation:** Large binaries do not go through the JS module graph; the build stays focused on code.

To add an image: place the file in `public/assets/`, then reference `/assets/your-file.ext` in `data.js` or in a component `src` attribute.

---

## Data model (`src/content/data.js`)

The default export aggregates:

- **`person`** — name, role, bio snippets, **`profilePhoto`** (URL string under `/assets/…`).
- **`social`** — links for header/footer/contact.
- **`projects`** — `photo`, `title`, `description`/`period`, `tags`, `link`, etc.
- **`certificates`** — `photo`, `issuer` (issuer badge image URL), `title`, `credentialId`, `link`.
- **`timeline`** — experience/education cards with **`icon`** (org logo URL).
- **`skills`**, **`conceptTags`**, **`moreAboutMe`** — structured copy for the skills and hero areas.

Shape is intentionally plain objects/arrays so you can later move the same schema to a CMS or API without rewriting components.

---

## Supabase integration

### What Supabase is used for

1. **Postgres table `contacts`** — stores contact form submissions.
2. **Row Level Security (RLS)** — the **anon** key (used in the browser) may **INSERT** only; it cannot read other people’s rows.
3. **Optional Edge Function `contact-notification`** — invoked by a **Database Webhook** on `INSERT` into `contacts` to send you an email via **Resend**.

The browser **never** sees Resend or service-role keys; only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Client (`src/lib/supabase.js`)

Uses `getSupabaseBrowserClient()` from `@supabase/supabase-js` with `process.env.NEXT_PUBLIC_SUPABASE_*`. If either variable is missing, the factory throws when the contact form runs in the browser.

### Contact submit (`src/lib/contact.js`)

`submitContact({ name, email, subject, message })` performs `supabase.from("contacts").insert(...)`. Errors from PostgREST bubble to the UI (`ContactForm.jsx`), which shows a transient error state.

### Schema and RLS (`supabase/migrations/001_create_contacts.sql`)

- Columns: `id` (uuid), `name`, `email`, `subject`, `message`, `read`, `created_at`.
- **CHECK** constraints mirror basic client validation (lengths, simple email pattern).
- **Policies:** `anon` **INSERT** allowed; **`authenticated`** **SELECT** allowed (for a future admin UI). Service role bypasses RLS for operational tasks.

### Edge Function (`supabase/functions/contact-notification/index.ts`)

- Expects **POST** with a **Database Webhook** payload (`type: "INSERT"`, `table: "contacts"`, `record: { ... }`).
- Validates payload; skips non-matching events with `200` + `{ skipped: true }` so other hooks are not broken.
- Reads **`NOTIFY_TO_EMAIL`**, **`RESEND_API_KEY`**, optional **`RESEND_FROM_EMAIL`**, **`SITE_NAME`**, and optional **`WEBHOOK_SECRET`** from the function environment.
- If `WEBHOOK_SECRET` is set, the request must include header **`x-webhook-secret`** matching it (configure the same value in the Supabase webhook and in function secrets).
- Sends HTML email through **Resend’s REST API**; `reply_to` is set to the submitter’s email.

`supabase/config.toml` sets **`verify_jwt = false`** for this function so the **database webhook** (no user JWT) can invoke it. Lock down with **`WEBHOOK_SECRET`** so arbitrary callers cannot trigger email sends.

### Database webhook payload shape

Supabase **Database Webhooks** POST a JSON body to your Edge Function URL. This project’s handler only acts when the payload matches an **`INSERT`** into **`public.contacts`**; anything else gets **`200`** with `{ "ok": true, "skipped": true }` so other tables or events do not error the webhook.

**Fields the function reads** (aligned with `contact-notification/index.ts`):

| Field        | Expected         | Notes                                                   |
| ------------ | ---------------- | ------------------------------------------------------- |
| `type`       | `"INSERT"`       | Ignored for other event types.                          |
| `schema`     | `"public"`       | Must match.                                             |
| `table`      | `"contacts"`     | Must match.                                             |
| `record`     | object           | New row; required for email path.                       |
| `old_record` | `null` on INSERT | Present in webhook payloads; not read by this function. |

**`record`** uses the columns from `001_create_contacts.sql` (types as JSON):

```json
{
  "type": "INSERT",
  "table": "contacts",
  "schema": "public",
  "record": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "subject": "Hello from the portfolio form",
    "message": "I would like to discuss …",
    "read": false,
    "created_at": "2026-03-29T12:34:56.789Z"
  },
  "old_record": null
}
```

The dashboard may emit **extra top-level keys**; they are harmless. If you set **`WEBHOOK_SECRET`**, configure the webhook (or Edge Function invocation) to send header **`x-webhook-secret: <same value>`** so only your database pipeline can trigger email sends.

For the canonical types in code, see `InsertPayload` and `ContactRecord` in [`supabase/functions/contact-notification/index.ts`](supabase/functions/contact-notification/index.ts).

### Environment variables

| Where                 | Variable                        | Purpose                        |
| --------------------- | ------------------------------- | ------------------------------ |
| App (`.env.local`)    | `NEXT_PUBLIC_SUPABASE_URL`      | Project URL                    |
| App (`.env.local`)    | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (RLS-enforced) |
| Edge Function secrets | `RESEND_API_KEY`                | Resend API auth                |
| Edge Function secrets | `NOTIFY_TO_EMAIL`               | Your inbox                     |
| Edge Function secrets | `RESEND_FROM_EMAIL`             | Optional verified sender       |
| Edge Function secrets | `SITE_NAME`                     | Email subject/branding         |
| Edge Function secrets | `WEBHOOK_SECRET`                | Shared secret with DB webhook  |

Never prefix secrets that must stay server-only with `NEXT_PUBLIC_` — those are embedded in the client bundle.

### Operational checklist (hosted Supabase)

1. Create a project; run the SQL in `001_create_contacts.sql` (or use `supabase db push` from CI).
2. Deploy **`contact-notification`** (`supabase functions deploy contact-notification`).
3. Set function secrets (`supabase secrets set ...` or Dashboard).
4. Add a **Database Webhook** on `contacts` **INSERT** pointing to the function URL; add **`x-webhook-secret`** if you enabled `WEBHOOK_SECRET`.

### Local Supabase (optional)

Use the Supabase CLI: `supabase start`, link the project, apply migrations, serve functions, and set secrets for local testing. See [Supabase CLI docs](https://supabase.com/docs/guides/cli) for the exact commands in your environment.

---

## Deployment

Any static host can serve **`dist/`** after `npm run build`.

- Set **`NEXT_PUBLIC_SUPABASE_URL`** and **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** in the host’s environment (Vercel env UI, etc.).
- Supabase Edge Function secrets are configured in the Supabase project, not on the static host.

---

## Scripts

| Script            | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Vite dev server            |
| `npm run build`   | Optimized production build |
| `npm run preview` | Preview `dist/`            |
| `npm run lint`    | ESLint                     |

---

## Linting

ESLint 9 with React, React Hooks, and React Refresh plugins. Configuration lives in `eslint.config.js`.

---

## Credits

- UI primitives: [Radix UI](https://www.radix-ui.com/)
- Icons: [Lucide](https://lucide.dev/)
- Backend: [Supabase](https://supabase.com/)
- Transactional email: [Resend](https://resend.com/)
