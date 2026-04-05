# Repository index

Quick map of this project for humans and AI tools. Operational rules for agents live in [AGENTS.md](./AGENTS.md).

---

## Stack

| Layer             | Choice                                               |
| ----------------- | ---------------------------------------------------- |
| UI                | React 19, Vite 7                                     |
| CSS               | Tailwind CSS 4 (`@tailwindcss/vite`)                 |
| Motion            | Framer Motion                                        |
| Backend (contact) | Supabase (JS client + Edge Functions in `supabase/`) |
| Hosting           | Vercel                                               |

---

## Entry points

| File                                                 | Role                                          |
| ---------------------------------------------------- | --------------------------------------------- |
| [`index.html`](./index.html)                         | HTML shell, fonts, theme bootstrap script     |
| [`src/main.jsx`](./src/main.jsx)                     | React root, `ThemeProvider`, `App`            |
| [`src/App.jsx`](./src/App.jsx)                       | Host-based branch: subdomain app vs portfolio |
| [`src/config/hostApps.js`](./src/config/hostApps.js) | Subdomain registry and hostname helpers       |

---

## Source tree (high level)

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── assets/                 # Bundled asset re-exports (images)
├── config/
│   └── hostApps.js         # Subdomain → app component
├── apps/
│   ├── portfolio/          # Main site
│   │   ├── PortfolioApp.jsx
│   │   ├── layout/         # Header, Footer
│   │   └── sections/       # hero, experience, projects, skills, certificates
│   ├── blog/
│   │   └── BlogApp.jsx
│   └── frontend/
│       └── FrontendApp.jsx
└── shared/
    ├── components/         # SectionHeader, Section, SubdomainAppShell, ui/, …
    ├── contact/            # Contact section + form (cross-app)
    ├── content/
    │   └── data.js         # Site copy and structured data
    ├── hooks/
    ├── lib/                # supabase.js, contact.js
    ├── theme/
    └── utils/
```

---

## Configuration files

| File                                                     | Notes                                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [`vite.config.js`](./vite.config.js)                     | Dev `host`, `port` 5199, `allowedHosts` for `.meetpawan.com` and `.localhost` |
| [`tailwind.config.js`](./tailwind.config.js)             | `content` globs include `./src/**/*`                                          |
| [`eslint.config.js`](./eslint.config.js)                 | ESLint flat config + Prettier compatibility                                   |
| [`.prettierrc`](./.prettierrc)                           | Prettier formatting defaults                                                  |
| [`.prettierignore`](./.prettierignore)                   | Paths excluded from Prettier                                                  |
| [`.editorconfig`](./.editorconfig)                       | Cross-editor indentation / EOL                                                |
| [`.env.example`](./.env.example)                         | Document all `VITE_*` variables; never document secrets with `VITE_`          |
| [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) | GitHub Actions: format check, lint, build                                     |
| [`supabase/`](./supabase/)                               | CLI config, Edge Functions, migrations                                        |

---

## Hostname → app (current)

| Host pattern                                           | App module                                                                 |
| ------------------------------------------------------ | -------------------------------------------------------------------------- |
| `blog.meetpawan.com` or `blog.localhost` (dev)         | [`apps/blog/BlogApp.jsx`](./src/apps/blog/BlogApp.jsx)                     |
| `frontend.meetpawan.com` or `frontend.localhost` (dev) | [`apps/frontend/FrontendApp.jsx`](./src/apps/frontend/FrontendApp.jsx)     |
| Everything else (apex, `www`, `localhost`, …)          | [`apps/portfolio/PortfolioApp.jsx`](./src/apps/portfolio/PortfolioApp.jsx) |

Override production names with `VITE_BLOG_HOSTNAME` / `VITE_FRONTEND_HOSTNAME` (see `.env.example`).

---

## Shared building blocks

| Concern                          | Location                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| Contact UI + form                | [`shared/contact/`](./src/shared/contact/)                                                 |
| Person / social / projects data  | [`shared/content/data.js`](./src/shared/content/data.js)                                   |
| Theme (auto / light / dark)      | [`shared/theme/`](./src/shared/theme/)                                                     |
| Subdomain layout + contact reuse | [`shared/components/SubdomainAppShell.jsx`](./src/shared/components/SubdomainAppShell.jsx) |

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
npm run validate      # format:check + lint + build
```

---

## Future optimizations (optional)

- **Code splitting**: lazy-load `PortfolioApp` vs subdomain apps with `React.lazy` + `Suspense` if the main bundle grows uncomfortably large.
- **Path aliases**: e.g. `@shared/`, `@apps/` in `vite.config.js` + `jsconfig`/`tsconfig` paths to shorten imports.
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
