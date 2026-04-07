# Agent guide — portfolio monorepo

This document is for AI coding agents and human contributors. It describes how this repository is structured, where to place new code, and production-oriented constraints.

For a navigable map of paths and links, see [INDEX.md](./INDEX.md).

---

## Product shape

- **Single Next.js 15 (App Router)** app deployed on **Vercel** (default Node/Edge server build; not static export).
- **Hostname-based routing** via root [`middleware.ts`](./middleware.ts): rewrites `blog.*` / `frontend.*` (and dev `*.localhost`) to internal `/blog/*` and `/frontend/*`; apex / `www` / plain `localhost` serve the portfolio at `/`. Hostname lists align with [`src/lib/hostRouting.ts`](./src/lib/hostRouting.ts) and [`src/config/hostApps.ts`](./src/config/hostApps.ts) (env + `getConfiguredHostForAppId` for links).
- **Default host** (apex / `www` / plain `localhost`): **portfolio** — [`app/page.tsx`](./app/page.tsx) → [`src/apps/portfolio/PortfolioApp.tsx`](./src/apps/portfolio/PortfolioApp.tsx).
- **Subdomain hosts**: **blog** — [`app/blog/`](./app/blog/); **frontend** — [`app/frontend/`](./app/frontend/); shared UI under `src/apps/blog/` and `src/apps/frontend/`.

All hosts share one build. Per-route `metadata` in `app/**/page.tsx` drives SEO; interactive sections use Client Components where needed.

---

## Directory contract

| Area            | Path                     | Responsibility                                                                                                       |
| --------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| App Router      | `app/`                   | `layout.tsx`, `page.tsx`, `globals.css`; `blog/` and `frontend/` route segments; **metadata** on `page.tsx` files.   |
| Host middleware | `middleware.ts`          | Host header → rewrite to `/`, `/blog/*`, `/frontend/*`.                                                              |
| Host registry   | `src/config/hostApps.ts` | Hostname env keys (`NEXT_PUBLIC_*_HOSTNAME`), dev `*.localhost` aliases, `getConfiguredHostForAppId`.                |
| Portfolio UI    | `src/apps/portfolio/`    | `PortfolioApp.tsx`, `layout/`, `sections/*` — main marketing site.                                                   |
| Blog UI         | `src/apps/blog/`         | Blog-specific components, data, sections; routes live under `app/blog/`.                                             |
| Frontend UI     | `src/apps/frontend/`     | Same pattern; routes under `app/frontend/`.                                                                          |
| Shared          | `src/shared/`            | Anything used by **more than one** app: `components/`, `contact/`, `content/`, `hooks/`, `lib/`, `theme/`, `utils/`. |

**Rules for agents**

1. **Prefer colocation**: new UI/logic that only the portfolio needs → under `apps/portfolio/`. Only promote to `shared/` when a second consumer exists or is imminent.
2. **Do not duplicate** contact form or Supabase browser client: use `shared/contact/` and `shared/lib/`.
3. **Subdomain apps** should wrap feature UI in [`SubdomainAppShell`](./src/shared/components/SubdomainAppShell.tsx) when you want the same chrome (noise, theme toggle, contact slot) as blog/frontend today.

---

## Environment and secrets

- **Public env** exposed to the browser uses the **`NEXT_PUBLIC_`** prefix. See [`.env.example`](./.env.example).
- **Never** add private API keys, Resend keys, or service role keys as `NEXT_PUBLIC_*`. Server-side secrets belong in **Supabase Edge Function** secrets or Vercel env (without `NEXT_PUBLIC_`), not in shipped JS.
- Supabase URL + anon key are used for the contact flow; the browser client is created lazily via [`getSupabaseBrowserClient()`](./src/shared/lib/supabase.ts) (client components only).
- **Typed env**: extend [`src/env.d.ts`](./src/env.d.ts) when adding new `NEXT_PUBLIC_*` keys; keep `hostApps` `SubdomainHostnameEnvKey` in sync.

---

## Local development

- **Dev server**: `npm run dev` — Next.js on port **5199** (see [`package.json`](./package.json) scripts).
- **Subdomains without `/etc/hosts`**: use `http://blog.localhost:5199` and `http://frontend.localhost:5199` (browsers resolve `*.localhost` to loopback).
- **Production-shaped hosts**: add `127.0.0.1 blog.meetpawan.com` (etc.) to the hosts file if you need exact production hostnames locally.

---

## Adding a new subdomain app

1. Add `app/<name>/` routes (`layout.tsx`, `page.tsx`, …) and colocate or reuse UI under `src/apps/<name>/`.
2. Extend [`middleware.ts`](./middleware.ts) and [`src/lib/hostRouting.ts`](./src/lib/hostRouting.ts) to rewrite the new host to `/name/*`.
3. Register in [`HOST_APP_ENTRIES`](./src/config/hostApps.ts): unique `id`, `envKey`, `defaultHost`, `devLocalHost`. Extend `SubdomainHostnameEnvKey` and `src/env.d.ts` when adding a new env key.
4. Document `NEXT_PUBLIC_<NAME>_HOSTNAME` in `.env.example`.
5. **Vercel**: Project → Domains → add the hostname; DNS CNAME as instructed (same project as apex).

---

## Styling and UI

- **Tailwind CSS v4** via **PostCSS** (`@tailwindcss/postcss` in [`postcss.config.mjs`](./postcss.config.mjs)); global tokens in [`app/globals.css`](./app/globals.css).
- **Theme**: [`shared/theme/ThemeProvider.tsx`](./src/shared/theme/ThemeProvider.tsx) wraps the tree in [`app/layout.tsx`](./app/layout.tsx); preference + local-time rules in `localTimeTheme.ts`. Shared types: `ThemePreference` in [`themePreference.ts`](./src/shared/theme/themePreference.ts).
- **Radix-based primitives** under `shared/components/ui/` — extend these before adding parallel button/dialog systems.

---

## Data and APIs

- **Static site content** (person, projects, skills, …): [`shared/content/data.ts`](./src/shared/content/data.ts) typed as [`SiteData`](./src/shared/types/site.ts). Keep structured; large media URLs point at `public/assets/`.
- **Contact submissions**: `shared/lib/contact.ts` → Supabase `contacts` table; RLS should allow **insert-only** for anon. Notifications via Edge Function (see Supabase folder and `.env.example` comments).

---

## TypeScript

- **Config**: [`tsconfig.json`](./tsconfig.json) — Next.js defaults: `strict`, `moduleResolution: "bundler"`, `jsx: "preserve"`, `plugins: [{ "name": "next" }]`, path alias `@/*` → `./src/*`.
- **`noImplicitAny`**: currently **off** so the codebase compiles while props are incrementally annotated; prefer explicit props and `import type` for new code, then enable `noImplicitAny` when ready.
- **Types by layer**
  - Cross-app domain models: [`src/shared/types/site.ts`](./src/shared/types/site.ts) (`Person`, `SiteData`, `ProjectItem`, …). Re-export hub: [`src/shared/types/index.ts`](./src/shared/types/index.ts).
  - Theme: [`src/shared/theme/themePreference.ts`](./src/shared/theme/themePreference.ts).
  - Host routing: [`HostAppEntry`](./src/config/hostApps.ts), `SubdomainHostnameEnvKey` aligned with [`src/env.d.ts`](./src/env.d.ts).
- **Imports**: use extensionless paths and `@/` for `src/` (e.g. `@/shared/theme/ThemeProvider`); Next resolves `.tsx`/`.ts`.

---

## Quality tooling (ESLint, Prettier, CI)

- **ESLint** ([`eslint.config.js`](./eslint.config.js)): flat config with [`eslint-config-next`](https://nextjs.org/docs/app/api-reference/config/eslint) (`next/core-web-vitals`, `next/typescript`) via `@eslint/eslintrc` `FlatCompat`, plus [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) last. UI primitives and `ThemeProvider.tsx` disable `react-refresh/only-export-components` where non-component exports are intentional.
- **Prettier** ([`.prettierrc`](./.prettierrc), [`.prettierignore`](./.prettierignore)): run `npm run format` before large commits; `npm run format:check` in CI. Ignores `dist`, `.next`, lockfiles, `.agents`, `.cursor`.
- **Editor**: [`.editorconfig`](./.editorconfig) for baseline whitespace; [`.vscode/settings.json`](./.vscode/settings.json) enables format-on-save + ESLint fix (recommended extensions in [`.vscode/extensions.json`](./.vscode/extensions.json)).
- **Git hooks**: [Husky](https://typicode.github.io/husky/) `prepare` script runs `husky`; [`.husky/pre-commit`](./.husky/pre-commit) runs **`npm run typecheck`** first, then [lint-staged](https://github.com/lint-staged/lint-staged) (`eslint --fix --max-warnings=0` + `prettier --write` on staged `*.{js,jsx,ts,tsx,mjs,cjs}` and Prettier on other globs). CI still runs the full `validate` pipeline including typecheck.
- **CI**: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs `format:check`, **`typecheck` (`tsc --noEmit`)**, `lint`, and `build` on pushes/PRs to `main` and `cursor/**`.
- **Node**: `engines.node` in [`package.json`](./package.json) is `>=20` (aligns with Next.js 15).

---

## Production and quality checklist (agents)

When changing behavior or adding features, prefer:

- **Validate**: `npm run validate` (format check + **typecheck** + lint + build) before opening a PR.
- **Types**: `npm run typecheck` — must pass in CI and locally before merge.
- **Build**: `npm run build` must pass.
- **Lint**: `npm run lint` — fix new issues you introduce; use `npm run lint:fix` when safe.
- **Format**: `npm run format` if Prettier reports drift in CI.
- **Accessibility**: preserve semantic headings, labels on controls, focus states; motion respects `prefers-reduced-motion` where you add animation.
- **Performance**: avoid unnecessary large client dependencies; consider `import()` for heavy optional routes **if** bundle size becomes a problem (future optimization).
- **SEO / sharing**: use `export const metadata` / `generateMetadata` on `app/**/page.tsx`; keep Open Graph defaults sensible for new hosts.

---

## Anti-patterns

- Hardcoding production hostnames in components when `getConfiguredHostForAppId()` or env-driven config exists.
- Importing portfolio sections from blog/frontend without moving shared pieces to `shared/` first.
- Putting feature-specific state in `shared/` without a clear second consumer (YAGNI).

---

## Related docs

- [INDEX.md](./INDEX.md) — path index and external references.
- [Next.js environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel + Next.js](https://vercel.com/docs/frameworks/nextjs)
