# Agent guide — portfolio monorepo

This document is for AI coding agents and human contributors. It describes how this repository is structured, where to place new code, and production-oriented constraints.

For a navigable map of paths and links, see [INDEX.md](./INDEX.md).

---

## Product shape

- **Single Vite + React** app deployed on **Vercel** (static client bundle).
- **Hostname-based routing** at the root: `App.jsx` chooses `PortfolioApp` vs a subdomain app via `getHostAppComponent(window.location.hostname)` ([`src/config/hostApps.js`](./src/config/hostApps.js)).
- **Default host** (apex / `www` / plain `localhost`): **portfolio** — [`src/apps/portfolio/PortfolioApp.jsx`](./src/apps/portfolio/PortfolioApp.jsx).
- **Subdomain hosts** (e.g. `blog.meetpawan.com`, `frontend.meetpawan.com`): dedicated app shells; list and env keys live in `hostApps.js`.

All hosts share one build. There is no separate server-side render for per-host HTML; behavior is entirely client-side after load.

---

## Directory contract

| Area          | Path                     | Responsibility                                                                                                       |
| ------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Root router   | `src/App.jsx`            | Host detection only; keep thin.                                                                                      |
| Host registry | `src/config/hostApps.js` | Subdomain → component mapping, `VITE_*_HOSTNAME`, dev `*.localhost` aliases.                                         |
| Portfolio app | `src/apps/portfolio/`    | `PortfolioApp.jsx`, `layout/`, `sections/*` — main marketing site.                                                   |
| Blog app      | `src/apps/blog/`         | `BlogApp.jsx`; colocate `components/`, `hooks/`, `lib/`, `constants/` as you add features.                           |
| Frontend app  | `src/apps/frontend/`     | Same pattern as blog.                                                                                                |
| Shared        | `src/shared/`            | Anything used by **more than one** app: `components/`, `contact/`, `content/`, `hooks/`, `lib/`, `theme/`, `utils/`. |

**Rules for agents**

1. **Prefer colocation**: new UI/logic that only the portfolio needs → under `apps/portfolio/`. Only promote to `shared/` when a second consumer exists or is imminent.
2. **Do not duplicate** contact form or Supabase browser client: use `shared/contact/` and `shared/lib/`.
3. **Subdomain apps** should wrap feature UI in [`SubdomainAppShell`](./src/shared/components/SubdomainAppShell.jsx) when you want the same chrome (noise, theme toggle, shared **Contact** section) as blog/frontend today.

---

## Environment and secrets

- **Public env only** uses the `VITE_` prefix (embedded in the client bundle). See [`.env.example`](./.env.example).
- **Never** add private API keys, Resend keys, or service role keys as `VITE_*`. Server-side secrets belong in **Supabase Edge Function** secrets or Vercel env (non-`VITE_`), not in shipped JS.
- Supabase URL + anon key are expected for the contact flow; missing vars throw at module load in [`shared/lib/supabase.js`](./src/shared/lib/supabase.js).

---

## Local development

- **Dev server**: `npm run dev` — port **5199** (`strictPort: true` in [`vite.config.js`](./vite.config.js)).
- **Subdomains without `/etc/hosts`**: use `http://blog.localhost:5199` and `http://frontend.localhost:5199` (browsers resolve `*.localhost` to loopback).
- **Production-shaped hosts**: add `127.0.0.1 blog.meetpawan.com` (etc.) to the hosts file; `allowedHosts` includes `.meetpawan.com` and `.localhost`.

---

## Adding a new subdomain app

1. Create `src/apps/<name>/<Name>App.jsx` (and subfolders as needed).
2. Register in [`HOST_APP_ENTRIES`](./src/config/hostApps.js): unique `id`, `envKey`, `defaultHost`, `devLocalHost` (must not collide with existing `*.localhost` names).
3. Document `VITE_<NAME>_HOSTNAME` in `.env.example`.
4. **Vercel**: Project → Domains → add the hostname; DNS CNAME as instructed (same project as apex is fine for this SPA).

---

## Styling and UI

- **Tailwind CSS v4** via `@tailwindcss/vite`; global tokens in [`src/index.css`](./src/index.css).
- **Theme**: [`shared/theme/ThemeProvider.jsx`](./src/shared/theme/ThemeProvider.jsx) wraps the tree in [`main.jsx`](./src/main.jsx); preference + local-time rules in `localTimeTheme.js`.
- **Radix-based primitives** under `shared/components/ui/` — extend these before adding parallel button/dialog systems.

---

## Data and APIs

- **Static site content** (person, projects, skills, …): [`shared/content/data.js`](./src/shared/content/data.js). Keep structured; large media URLs point at `public/assets/`.
- **Contact submissions**: `shared/lib/contact.js` → Supabase `contacts` table; RLS should allow **insert-only** for anon. Notifications via Edge Function (see Supabase folder and `.env.example` comments).

---

## Quality tooling (ESLint, Prettier, CI)

- **ESLint** ([`eslint.config.js`](./eslint.config.js)): flat config, React + hooks + Vite refresh, [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) last so style is owned by Prettier. Root `*.config.js` / `vite.config.js` use Node globals + ESM. UI primitives and `ThemeProvider` disable `react-refresh/only-export-components` where non-component exports are intentional.
- **Prettier** ([`.prettierrc`](./.prettierrc), [`.prettierignore`](./.prettierignore)): run `npm run format` before large commits; `npm run format:check` in CI. Ignores `dist`, lockfiles, `.agents`, `.cursor`.
- **Editor**: [`.editorconfig`](./.editorconfig) for baseline whitespace; [`.vscode/settings.json`](./.vscode/settings.json) enables format-on-save + ESLint fix (recommended extensions in [`.vscode/extensions.json`](./.vscode/extensions.json)).
- **Git hooks**: [Husky](https://typicode.github.io/husky/) `prepare` script runs `husky`; [`.husky/pre-commit`](./.husky/pre-commit) runs [lint-staged](https://github.com/lint-staged/lint-staged) (`eslint --fix` + `prettier --write` on staged files). After clone, run `npm install` so hooks install; if hooks do not run, execute `npx husky init` once (or ensure `core.hooksPath` is `.husky`).
- **CI**: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs `format:check`, `lint`, and `build` on pushes/PRs to `main` and `cursor/**`.
- **Node**: `engines.node` in [`package.json`](./package.json) is `>=20` (aligns with Vite 7).

---

## Production and quality checklist (agents)

When changing behavior or adding features, prefer:

- **Validate**: `npm run validate` (format check + lint + build) before opening a PR.
- **Build**: `npm run build` must pass.
- **Lint**: `npm run lint` — fix new issues you introduce; use `npm run lint:fix` when safe.
- **Format**: `npm run format` if Prettier reports drift in CI.
- **Accessibility**: preserve semantic headings, labels on controls, focus states; motion respects `prefers-reduced-motion` where you add animation.
- **Performance**: avoid unnecessary large client dependencies; consider `import()` for heavy optional routes **if** bundle size becomes a problem (future optimization).
- **SEO / sharing**: root `index.html` title is portfolio-oriented; subdomain apps set `document.title` in their app shell — keep that pattern for new hosts.

---

## Anti-patterns

- Hardcoding production hostnames in components when `getConfiguredHostForAppId()` or env-driven config exists.
- Importing portfolio sections from blog/frontend without moving shared pieces to `shared/` first.
- Putting feature-specific state in `shared/` without a clear second consumer (YAGNI).

---

## Related docs

- [INDEX.md](./INDEX.md) — path index and external references.
- [Vite env variables](https://vite.dev/guide/env-and-mode.html)
- [Vercel SPA / static deployments](https://vercel.com/docs/frameworks/vite)
