# Pawan Kumar — Portfolio (React + Vite + Tailwind)

Production-grade personal portfolio built with React, Vite, Tailwind CSS, and Radix UI primitives. The site is component-driven, content-powered, responsive, accessible, and themeable.

## Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Start the dev server (HMR)
npm run dev

# 3) Create a production build
npm run build

# 4) Preview the production build locally
npm run preview
```

## Tech Stack

- React 19 + Vite 7 (fast dev server, HMR, optimized build)
- Tailwind CSS 4 (utility-first styling, PostCSS pipeline)
- Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-tooltip`, `@radix-ui/react-slot`)
- `framer-motion` for animations
- `lucide-react` for icons
- `class-variance-authority`, `clsx`, and `tailwind-merge` for robust className management
- ESLint 9 with React Hooks and Refresh plugins

## Scripts

- `npm run dev`: Start the Vite dev server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Lint the project

## Project Structure

```
portfolio/
  ├─ README.md
  ├─ index.html
  ├─ package.json
  ├─ postcss.config.js
  ├─ tailwind.config.js
  ├─ vite.config.js
  ├─ public/
  │   ├─ my-image.jpeg
  │   └─ vite.svg
  └─ src/
      ├─ main.jsx
      ├─ App.jsx
      ├─ index.css
      ├─ assets/
      │   ├─ article_summarizer_app.jpeg
      │   ├─ breakoutai_logo.jpeg
      │   ├─ canso_app.png
      │   ├─ ecommerce_app.jpeg
      │   ├─ football_app.jpeg
      │   ├─ iiita_logo.jpeg
      │   ├─ image_generator_app.jpeg
      │   ├─ index.jsx
      │   ├─ infoedge_logo.jpeg
      │   ├─ javascript_certificate.png
      │   ├─ minipage_builder_app.jpeg
      │   ├─ musicplayer_app.jpeg
      │   ├─ my-image.jpeg
      │   ├─ namastedev.webp
      │   ├─ nike_landing_app.jpeg
      │   ├─ react_certificate.png
      │   └─ yugenanalytics_logo.jpeg
      ├─ components/
      │   ├─ 3DPin.jsx
      │   ├─ Certificates.jsx
      │   ├─ Concepts.jsx
      │   ├─ Footer.jsx
      │   ├─ GithubIcon.jsx
      │   ├─ GridLayout.jsx
      │   ├─ Header.jsx
      │   ├─ Hero.jsx
      │   ├─ MoreAboutMe.jsx
      │   ├─ Projects.jsx
      │   ├─ Section.jsx
      │   ├─ Skills.jsx
      │   ├─ ThemeToggle.jsx
      │   ├─ Timeline.jsx
      │   └─ ui/
      │       ├─ button.jsx
      │       ├─ dialog.jsx
      │       └─ tooltip.jsx
      ├─ content/
      │   └─ data.js
      └─ lib/
          ├─ icons/
          │   ├─ link-icon.jsx
          │   └─ linkedin-icon.jsx
          ├─ theme.jsx
          └─ utils.js
```

## Architectural Overview

- Component-Driven UI: The site is organized by feature/section components such as `Hero`, `Projects`, `Skills`, `Certificates`, `Timeline`, `MoreAboutMe`, and layout/navigation components like `Header`, `Footer`, `GridLayout`.
- UI Primitives: Reusable primitives in `src/components/ui/` wrap Radix primitives (`button`, `dialog`, `tooltip`) to ensure consistent styles, accessibility, and API ergonomics.
- Content-First: All dynamic content (projects, skills, certificates, timeline) is defined in `src/content/data.js`, keeping rendering purely presentational and easy to update.
- Theming: A global `ThemeProvider` in `src/lib/theme.jsx` exposes a context and a `ThemeToggle` component for switching between light/dark. The theme is applied via a root attribute/class and persisted (e.g., in localStorage) so user preference is remembered.
- Utilities: `src/lib/utils.js` centralizes helpers such as className merging (`clsx` + `tailwind-merge`) and other small, pure utilities used across components.
- Assets and Icons: All images live under `src/assets/` and are imported where needed. Icons come from `lucide-react` and local `lib/icons/*` for branded or custom icons.

## Styling and Theming

- Tailwind CSS v4 drives the styling with a minimal global stylesheet (`src/index.css`) for CSS resets and app-level tokens.
- Tailwind plugins included: `@tailwindcss/forms`, `@tailwindcss/typography`, and `@tailwindcss/aspect-ratio`.
- The `ThemeToggle` component switches themes via the `ThemeProvider` in `src/lib/theme.jsx`.

## Key Components

- `Header`: Top navigation, branding, and theme switcher.
- `Hero`: Above-the-fold personal intro with CTA and imagery. May include `3DPin` for a decorative/interactive element.
- `Projects`: Grid/list of selected work with images, tech stack, and external links (GitHub, Live Demo).
- `Skills`: Categorized skill badges and/or progress.
- `Certificates`: Gallery of certifications with issuing org and validation links.
- `Timeline`: Chronological experience/education milestones.
- `MoreAboutMe`: Longer bio, interests, and personal highlights.
- `Footer`: Contact, social links, and copyright.
- `Section`: Reusable wrapper to standardize section spacing, titles, and responsive layout.
- `GridLayout`: Responsive utility for consistent grids used by multiple sections.
- `ui/*` (button, dialog, tooltip): Accessible, theme-aware primitives composed with Radix.

## Data Model (`src/content/data.js`)

The portfolio content is maintained in a single source of truth. Typical structures include arrays like `projects`, `skills`, `certificates`, and `timeline`. Each item generally includes fields such as:

- Projects: `title`, `description`, `image` (from `src/assets`), `techStack` (array of strings), `links` (`github`, `demo`).
- Skills: `title`/`category`, `items` (array of strings), optional `icon`.
- Certificates: `title`, `issuer`, `image`, optional `url`/`credentialId`.
- Timeline: `title`, `org`, `logo`, `start`, `end`, and `summary`.

> Note: Open `src/content/data.js` to view the exact schema and add new entries following the existing shape.

### Adding a Project (example)

```js
// src/content/data.js
export const projects = [
  // ...existing
  {
    title: "New Project",
    description: "What it does and the impact.",
    image: "<imported_image>", // import from src/assets and reference here
    techStack: ["React", "Tailwind", "Vite"],
    links: {
      github: "https://github.com/username/repo",
      demo: "https://demo.example.com",
    },
  },
];
```

## Animations

- `framer-motion` powers subtle transitions and in-view animations for a polished feel without compromising performance.

## Accessibility

- Radix primitives ensure keyboard navigation, focus management, and ARIA attributes are applied correctly out of the box.
- Color contrast and theme tokens are chosen to be legible across light/dark modes.

## Linting & Formatting

- ESLint 9 with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` is configured. Run `npm run lint`.

## Deployment

Any static host that serves the `dist/` output works.

- Vercel: Import the repo, framework = Vite, build command `npm run build`, output `dist`.
- Netlify: Build command `npm run build`, publish directory `dist`.
- GitHub Pages: `npm run build` and serve `dist` with a pages action or any static server.

## Design Principles & Patterns

- Separation of Concerns: Content (`src/content`) is decoupled from presentation (`src/components`).
- Reuse Over Rebuild: Shared layouts and primitives (`Section`, `GridLayout`, `ui/*`) prevent duplication.
- Progressive Enhancement: Works without JS-heavy effects; animations are additive.
- Type-Safe Styling: Class composition via `clsx`, `tailwind-merge`, and optional `class-variance-authority` patterns to prevent conflicting Tailwind utilities.
- Accessibility First: Start with semantic HTML and augment with Radix components for complex behaviors.

## Credits

- Icons: `lucide-react` and custom icons in `src/lib/icons/*`.
- UI Primitives: Radix UI.
- Build: Vite.
- Styling: Tailwind CSS.

---

If you spot any inconsistencies or want to add new sections, start by updating `src/content/data.js` and composing a new component under `src/components/`, then wire it in `src/App.jsx`.
