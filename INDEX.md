# Repository index

Quick map of this project for humans and AI tools. Operational rules for agents live in [AGENTS.md](./AGENTS.md).

---

## Stack

| Layer             | Choice                                                       |
| ----------------- | ------------------------------------------------------------ |
| UI                | React 19, Vite 7                                             |
| CSS               | Tailwind CSS 4 (`@tailwindcss/vite`)                         |
| Motion            | Framer Motion                                                |
| Backend (contact) | Supabase (TypeScript client + Edge Functions in `supabase/`) |
| Hosting           | Vercel                                                       |

---

## Entry points

| File                                                 | Role                                          |
| ---------------------------------------------------- | --------------------------------------------- |
| [`index.html`](./index.html)                         | HTML shell, fonts, theme bootstrap script     |
| [`src/main.tsx`](./src/main.tsx)                     | React root, `ThemeProvider`, `App`            |
| [`src/App.tsx`](./src/App.tsx)                       | Host-based branch: subdomain app vs portfolio |
| [`src/config/hostApps.ts`](./src/config/hostApps.ts) | Subdomain registry and hostname helpers       |

---

## Source tree (high level)

```
src/
├── App.tsx
├── main.tsx
├── vite-env.d.ts           # Vite env + static asset module types
├── index.css
├── assets/                 # Bundled asset re-exports (images)
├── config/
│   └── hostApps.ts         # Subdomain → app component
├── apps/
│   ├── portfolio/          # Main site
│   │   ├── PortfolioApp.tsx
│   │   ├── layout/         # Header, Footer
│   │   └── sections/       # hero, experience, projects, skills, certificates
│   ├── blog/
│   │   └── BlogApp.tsx
│   └── frontend/
│       └── FrontendApp.tsx
└── shared/
    ├── components/         # SectionHeader, Section, SubdomainAppShell, ui/, …
    ├── contact/            # Contact section + form (cross-app)
    ├── content/
    │   └── data.ts         # Site copy and structured data (typed `SiteData`)
    ├── types/              # Domain + re-exports (person, projects, theme, …)
    ├── hooks/
    ├── lib/                # supabase.ts, contact.ts
    ├── theme/
    └── utils/
```

---

## Configuration files

| File                                                     | Notes                                                                             |
| -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`vite.config.js`](./vite.config.js)                     | Dev `host`, `port` 5199, `allowedHosts` for `.meetpawan.com` and `.localhost`     |
| [`tailwind.config.js`](./tailwind.config.js)             | `content` globs include `./src/**/*`                                              |
| [`tsconfig.json`](./tsconfig.json)                       | TypeScript (strict; `noImplicitAny` off until annotations are complete)           |
| [`eslint.config.js`](./eslint.config.js)                 | ESLint flat config, typescript-eslint for `src/**/*.{ts,tsx}`, Prettier last      |
| [`.prettierrc`](./.prettierrc)                           | Prettier formatting defaults                                                      |
| [`.prettierignore`](./.prettierignore)                   | Paths excluded from Prettier                                                      |
| [`.editorconfig`](./.editorconfig)                       | Cross-editor indentation / EOL                                                    |
| [`.env.example`](./.env.example)                         | Document all `VITE_*` variables; never document secrets with `VITE_`              |
| [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) | GitHub Actions: format check, typecheck, lint, build                              |
| [`.husky/pre-commit`](./.husky/pre-commit)               | **`npm run typecheck`**, then **lint-staged** (ESLint + Prettier on staged files) |
| [`supabase/`](./supabase/)                               | CLI config, Edge Functions, migrations                                            |

---

## Hostname → app (current)

| Host pattern                                           | App module                                                                 |
| ------------------------------------------------------ | -------------------------------------------------------------------------- |
| `blog.meetpawan.com` or `blog.localhost` (dev)         | [`apps/blog/BlogApp.tsx`](./src/apps/blog/BlogApp.tsx)                     |
| `frontend.meetpawan.com` or `frontend.localhost` (dev) | [`apps/frontend/FrontendApp.tsx`](./src/apps/frontend/FrontendApp.tsx)     |
| Everything else (apex, `www`, `localhost`, …)          | [`apps/portfolio/PortfolioApp.tsx`](./src/apps/portfolio/PortfolioApp.tsx) |

Override production names with `VITE_BLOG_HOSTNAME` / `VITE_FRONTEND_HOSTNAME` (see `.env.example`).

---

## Shared building blocks

| Concern                          | Location                                                                                                        |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Contact UI + form                | [`shared/contact/`](./src/shared/contact/)                                                                      |
| Person / social / projects data  | [`shared/content/data.ts`](./src/shared/content/data.ts) + [`shared/types/site.ts`](./src/shared/types/site.ts) |
| Theme (auto / light / dark)      | [`shared/theme/`](./src/shared/theme/)                                                                          |
| Subdomain layout + contact reuse | [`shared/components/SubdomainAppShell.tsx`](./src/shared/components/SubdomainAppShell.tsx)                      |

---

## Scripts

```bash
npm run dev           # Vite dev server
npm run build         # Production bundle → dist/
npm run preview       # Preview production build
npm run lint          # ESLint
npm run lint:fix      # ESLint with --fix
npm run format        # Prettier --write
npm run format:check  # Prettier --check (CI)
npm run typecheck     # tsc --noEmit (CI + local before PR)
npm run validate      # format:check + typecheck + lint + build
```

---

## Future optimizations (optional)

- **Code splitting**: lazy-load `PortfolioApp` vs subdomain apps with `React.lazy` + `Suspense` if the main bundle grows uncomfortably large.
- **Path aliases**: e.g. `@shared/`, `@apps/` in `vite.config.js` + `tsconfig` `paths` to shorten imports.
- **Stricter TS**: enable `noImplicitAny` and tighten component props incrementally.
- **Testing**: Vitest + React Testing Library for `shared/contact` and critical hooks.
- **Monitoring**: Vercel Analytics / web vitals; error reporting (e.g. Sentry) with env not exposed as `VITE_` unless using a public DSN pattern.
- **i18n**: if needed, colocate strings per app or introduce a shared `messages/` layer.

---

## External references

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel + Vite](https://vercel.com/docs/frameworks/vite)
- [Supabase (JS client)](https://supabase.com/docs/reference/javascript/introduction)
- [Framer Motion](https://motion.dev/)

---

## Agent workflow pointer

Before editing: read [AGENTS.md](./AGENTS.md) for placement rules, security, and the checklist for production-minded changes.
