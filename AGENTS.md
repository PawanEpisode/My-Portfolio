# Agent guide — portfolio monorepo

This document is for AI coding agents and human contributors. It describes how this repository is structured, where to place new code, and production-oriented constraints.

For a navigable map of paths and links, see [INDEX.md](./INDEX.md).

---

## Product shape

- **Single Vite + React** app deployed on **Vercel** (static client bundle).
- **Hostname-based routing** at the root: `App.tsx` chooses `PortfolioApp` vs a subdomain app via `getHostAppComponent(window.location.hostname)` ([`src/config/hostApps.ts`](./src/config/hostApps.ts)).
- **Default host** (apex / `www` / plain `localhost`): **portfolio** — [`src/apps/portfolio/PortfolioApp.tsx`](./src/apps/portfolio/PortfolioApp.tsx).
- **Subdomain hosts** (e.g. `blog.meetpawan.com`, `frontend.meetpawan.com`): dedicated app shells; list and env keys live in `hostApps.ts`.

All hosts share one build. There is no separate server-side render for per-host HTML; behavior is entirely client-side after load.

---

## Directory contract

| Area          | Path                     | Responsibility                                                                                                       |
| ------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Root router   | `src/App.tsx`            | Host detection only; keep thin.                                                                                      |
| Host registry | `src/config/hostApps.ts` | Subdomain → component mapping, `VITE_*_HOSTNAME`, dev `*.localhost` aliases.                                         |
| Portfolio app | `src/apps/portfolio/`    | `PortfolioApp.tsx`, `layout/`, `sections/*` — main marketing site.                                                   |
| Blog app      | `src/apps/blog/`         | `BlogApp.tsx`; colocate `components/`, `hooks/`, `lib/`, `constants/` as you add features.                           |
| Frontend app  | `src/apps/frontend/`     | Same pattern as blog.                                                                                                |
| Shared        | `src/shared/`            | Anything used by **more than one** app: `components/`, `contact/`, `content/`, `hooks/`, `lib/`, `theme/`, `utils/`. |

**Rules for agents**

1. **Prefer colocation**: new UI/logic that only the portfolio needs → under `apps/portfolio/`. Only promote to `shared/` when a second consumer exists or is imminent.
2. **Do not duplicate** contact form or Supabase browser client: use `shared/contact/` and `shared/lib/`.
3. **Subdomain apps** should wrap feature UI in [`SubdomainAppShell`](./src/shared/components/SubdomainAppShell.tsx) when you want the same chrome (noise, theme toggle, contact slot) as blog/frontend today.

---

## Environment and secrets

- **Public env only** uses the `VITE_` prefix (embedded in the client bundle). See [`.env.example`](./.env.example).
- **Never** add private API keys, Resend keys, or service role keys as `VITE_*`. Server-side secrets belong in **Supabase Edge Function** secrets or Vercel env (non-`VITE_`), not in shipped JS.
- Supabase URL + anon key are expected for the contact flow; missing vars throw at module load in [`shared/lib/supabase.ts`](./src/shared/lib/supabase.ts).
- **Typed env**: extend [`src/vite-env.d.ts`](./src/vite-env.d.ts) when adding new `VITE_*` keys; keep `hostApps` `SubdomainHostnameEnvKey` in sync.

---

## Local development

- **Dev server**: `npm run dev` — port **5199** (`strictPort: true` in [`vite.config.js`](./vite.config.js)).
- **Subdomains without `/etc/hosts`**: use `http://blog.localhost:5199` and `http://frontend.localhost:5199` (browsers resolve `*.localhost` to loopback).
- **Production-shaped hosts**: add `127.0.0.1 blog.meetpawan.com` (etc.) to the hosts file; `allowedHosts` includes `.meetpawan.com` and `.localhost`.

---

## Adding a new subdomain app

1. Create `src/apps/<name>/<Name>App.tsx` (and subfolders as needed).
2. Register in [`HOST_APP_ENTRIES`](./src/config/hostApps.ts): unique `id`, `envKey`, `defaultHost`, `devLocalHost` (must not collide with existing `*.localhost` names). Extend `SubdomainHostnameEnvKey` and `ImportMetaEnv` when adding a new env key.
3. Document `VITE_<NAME>_HOSTNAME` in `.env.example`.
4. **Vercel**: Project → Domains → add the hostname; DNS CNAME as instructed (same project as apex is fine for this SPA).

---

## Styling and UI

- **Tailwind CSS v4** via `@tailwindcss/vite`; global tokens in [`src/index.css`](./src/index.css).
- **Theme**: [`shared/theme/ThemeProvider.tsx`](./src/shared/theme/ThemeProvider.tsx) wraps the tree in [`main.tsx`](./src/main.tsx); preference + local-time rules in `localTimeTheme.ts`. Shared types: `ThemePreference` in [`themePreference.ts`](./src/shared/theme/themePreference.ts).
- **Radix-based primitives** under `shared/components/ui/` — extend these before adding parallel button/dialog systems.

---

## Data and APIs

- **Static site content** (person, projects, skills, …): [`shared/content/data.ts`](./src/shared/content/data.ts) typed as [`SiteData`](./src/shared/types/site.ts). Keep structured; large media URLs point at `public/assets/`.
- **Contact submissions**: `shared/lib/contact.ts` → Supabase `contacts` table; RLS should allow **insert-only** for anon. Notifications via Edge Function (see Supabase folder and `.env.example` comments).

---

## TypeScript

- **Config**: [`tsconfig.json`](./tsconfig.json) — `strict` mode, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `allowImportingTsExtensions` for Vite.
- **`noImplicitAny`**: currently **off** so the codebase compiles while props are incrementally annotated; prefer explicit props and `import type` for new code, then enable `noImplicitAny` when ready.
- **Types by layer**
  - Cross-app domain models: [`src/shared/types/site.ts`](./src/shared/types/site.ts) (`Person`, `SiteData`, `ProjectItem`, …). Re-export hub: [`src/shared/types/index.ts`](./src/shared/types/index.ts).
  - Theme: [`src/shared/theme/themePreference.ts`](./src/shared/theme/themePreference.ts).
  - Host routing: [`HostAppEntry`](./src/config/hostApps.ts), `SubdomainHostnameEnvKey` aligned with `vite-env.d.ts`.
- **Imports**: use extensionless paths (e.g. `./App`, `./shared/theme/ThemeProvider`); Vite resolves `.tsx`/`.ts`.

---

## Quality tooling (ESLint, Prettier, CI)

- **ESLint** ([`eslint.config.js`](./eslint.config.js)): flat config, **typescript-eslint** (`projectService`) for `src/**/*.{ts,tsx}`, React + hooks + Vite refresh, [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) last. Root `*.config.js` / `vite.config.js` use Node globals + ESM. UI primitives and `ThemeProvider.tsx` disable `react-refresh/only-export-components` where non-component exports are intentional.
- **Prettier** ([`.prettierrc`](./.prettierrc), [`.prettierignore`](./.prettierignore)): run `npm run format` before large commits; `npm run format:check` in CI. Ignores `dist`, lockfiles, `.agents`, `.cursor`.
- **Editor**: [`.editorconfig`](./.editorconfig) for baseline whitespace; [`.vscode/settings.json`](./.vscode/settings.json) enables format-on-save + ESLint fix (recommended extensions in [`.vscode/extensions.json`](./.vscode/extensions.json)).
- **Git hooks**: [Husky](https://typicode.github.io/husky/) `prepare` script runs `husky`; [`.husky/pre-commit`](./.husky/pre-commit) runs **`npm run typecheck`** first, then [lint-staged](https://github.com/lint-staged/lint-staged) (`eslint --fix --max-warnings=0` + `prettier --write` on staged `*.{js,jsx,ts,tsx,mjs,cjs}` and Prettier on other globs). CI still runs the full `validate` pipeline including typecheck.
- **CI**: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs `format:check`, **`typecheck` (`tsc --noEmit`)**, `lint`, and `build` on pushes/PRs to `main` and `cursor/**`.
- **Node**: `engines.node` in [`package.json`](./package.json) is `>=20` (aligns with Vite 7).

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
