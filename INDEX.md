# Repository index

Quick map of this project for humans and AI tools. Operational rules for agents live in [AGENTS.md](./AGENTS.md).

---

## Stack

| Layer             | Choice                                                       |
| ----------------- | ------------------------------------------------------------ |
| UI                | React 19, Next.js 15 (App Router)                            |
| CSS               | Tailwind CSS 4 (`@tailwindcss/postcss`)                      |
| Motion            | Framer Motion                                                |
| Backend (contact) | Supabase (TypeScript client + Edge Functions in `supabase/`) |
| Hosting           | Vercel                                                       |

---

## Entry points

| File                                                 | Role                                               |
| ---------------------------------------------------- | -------------------------------------------------- |
| [`app/layout.tsx`](./app/layout.tsx)                 | Root layout, `globals.css`, fonts, theme bootstrap |
| [`app/page.tsx`](./app/page.tsx)                     | Portfolio (apex / default host)                    |
| [`middleware.ts`](./middleware.ts)                   | Host-based rewrite → `/blog/*`, `/frontend/*`      |
| [`src/config/hostApps.ts`](./src/config/hostApps.ts) | Hostname env registry, `getConfiguredHostForAppId` |

---

## Source tree (high level)

```
app/
├── layout.tsx              # Root shell + ThemeProvider
├── page.tsx                # Portfolio
├── globals.css             # Tailwind + design tokens
├── blog/                   # Blog routes (layout + pages)
└── frontend/               # Frontend learning hub routes

src/
├── env.d.ts                # NEXT_PUBLIC_* typings
├── lib/                    # hostRouting, pathname helpers
├── assets/                 # Bundled asset re-exports (images)
├── config/
│   └── hostApps.ts         # Subdomain hostname registry
├── apps/
│   ├── portfolio/          # Main site UI
│   │   ├── PortfolioApp.tsx
│   │   ├── layout/
│   │   └── sections/
│   ├── blog/               # Blog components, data, sections
│   └── frontend/           # Frontend hub UI + topic context
└── shared/
    ├── components/
    ├── contact/
    ├── content/
    ├── types/
    ├── hooks/
    ├── lib/
    ├── theme/
    └── utils/
```

---

## Configuration files

| File                                                     | Notes                                                                             |
| -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [`next.config.ts`](./next.config.ts)                     | Next.js app configuration                                                         |
| [`middleware.ts`](./middleware.ts)                       | Hostname → internal path rewrites                                                 |
| [`postcss.config.mjs`](./postcss.config.mjs)             | Tailwind v4 PostCSS plugin                                                        |
| [`tailwind.config.js`](./tailwind.config.js)             | `content` includes `app/` and `src/**/*`                                          |
| [`tsconfig.json`](./tsconfig.json)                       | TypeScript (strict; `noImplicitAny` off until annotations are complete)           |
| [`eslint.config.js`](./eslint.config.js)                 | ESLint flat + `eslint-config-next`, Prettier last                                 |
| [`.prettierrc`](./.prettierrc)                           | Prettier formatting defaults                                                      |
| [`.prettierignore`](./.prettierignore)                   | Paths excluded from Prettier                                                      |
| [`.editorconfig`](./.editorconfig)                       | Cross-editor indentation / EOL                                                    |
| [`.env.example`](./.env.example)                         | Document `NEXT_PUBLIC_*`; never document secrets with that prefix                 |
| [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) | GitHub Actions: format check, typecheck, lint, build                              |
| [`.husky/pre-commit`](./.husky/pre-commit)               | **`npm run typecheck`**, then **lint-staged** (ESLint + Prettier on staged files) |
| [`supabase/`](./supabase/)                               | CLI config, Edge Functions, migrations                                            |

---

## Hostname → app (current)

| Host pattern                                           | App module                                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `blog.meetpawan.com` or `blog.localhost` (dev)         | [`app/blog/`](./app/blog/) + [`src/apps/blog/`](./src/apps/blog/)                          |
| `frontend.meetpawan.com` or `frontend.localhost` (dev) | [`app/frontend/`](./app/frontend/) + [`src/apps/frontend/`](./src/apps/frontend/)          |
| Everything else (apex, `www`, `localhost`, …)          | [`app/page.tsx`](./app/page.tsx) → [`PortfolioApp`](./src/apps/portfolio/PortfolioApp.tsx) |

Override production names with `NEXT_PUBLIC_BLOG_HOSTNAME` / `NEXT_PUBLIC_FRONTEND_HOSTNAME` (see `.env.example`).

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
npm run dev           # Next.js dev server (port 5199)
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
- **Path aliases**: `@/*` → `./src/*` in `tsconfig.json` for shorter imports.
- **Stricter TS**: enable `noImplicitAny` and tighten component props incrementally.
- **Testing**: Vitest + React Testing Library for `shared/contact` and critical hooks.
- **Monitoring**: Vercel Analytics / web vitals; error reporting (e.g. Sentry) with env not exposed as `NEXT_PUBLIC_*` unless using a public DSN pattern.
- **i18n**: if needed, colocate strings per app or introduce a shared `messages/` layer.

---

## External references

- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel + Next.js](https://vercel.com/docs/frameworks/nextjs)
- [Supabase (JS client)](https://supabase.com/docs/reference/javascript/introduction)
- [Framer Motion](https://motion.dev/)

---

## Agent workflow pointer

Before editing: read [AGENTS.md](./AGENTS.md) for placement rules, security, and the checklist for production-minded changes.
