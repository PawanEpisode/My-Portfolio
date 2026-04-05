/** Viewport-height units allocated per category in the scroll animation */
export const SKILL_SCROLL_VH = 55;

/** Max skill tags shown in the active category card before truncating */
export const MAX_VISIBLE_TAGS = 8;

/** Ordered list of skill category keys (drives left-panel progress + cards grid) */
export const CATEGORY_ORDER = [
  "languages",
  "frameworks",
  "tools",
  "practices",
  "softSkills",
];

/** Display config per category: label, icon, colours */
export const CATEGORY_CONFIG = {
  languages: {
    label: "Languages",
    shortLabel: "Languages",
    icon: "{ }",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.12)",
    border: "rgba(99,102,241,0.32)",
    glow: "rgba(129,140,248,0.18)",
  },
  frameworks: {
    label: "Frameworks & Libraries",
    shortLabel: "Frameworks",
    icon: "⚛",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.12)",
    border: "rgba(99,102,241,0.32)",
    glow: "rgba(129,140,248,0.18)",
  },
  tools: {
    label: "Tools & Platforms",
    shortLabel: "Tools",
    icon: "⚙",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.12)",
    border: "rgba(99,102,241,0.32)",
    glow: "rgba(129,140,248,0.18)",
  },
  practices: {
    label: "Best Practices",
    shortLabel: "Practices",
    icon: "✦",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.12)",
    border: "rgba(99,102,241,0.32)",
    glow: "rgba(129,140,248,0.18)",
  },
  softSkills: {
    label: "Soft Skills",
    shortLabel: "Soft Skills",
    icon: "◈",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.12)",
    border: "rgba(99,102,241,0.32)",
    glow: "rgba(129,140,248,0.18)",
  },
};

/** Maps skill name → devicon CSS class. Only consumed by the Skills section. */
export const DEVICON_MAP: Record<string, string> = {
  JavaScript: "devicon-javascript-plain colored",
  TypeScript: "devicon-typescript-plain colored",
  Python: "devicon-python-plain colored",
  "C++": "devicon-cplusplus-plain colored",
  HTML: "devicon-html5-plain colored",
  CSS: "devicon-css3-plain colored",
  SQL: "devicon-mysql-plain colored",
  MongoDB: "devicon-mongodb-plain colored",
  Postgres: "devicon-postgresql-plain colored",
  ReactJS: "devicon-react-original colored",
  "Next.js": "devicon-nextjs-plain colored",
  "Node.js": "devicon-nodejs-plain colored",
  SCSS: "devicon-sass-plain colored",
  Sass: "devicon-sass-plain colored",
  Redux: "devicon-redux-original colored",
  GSAP: "devicon-gsap-plain colored",
  "React Router": "devicon-reactrouter-plain colored",
  "Express.js": "devicon-express-original",
  "Tailwind CSS": "devicon-tailwindcss-plain colored",
  "Material UI": "devicon-materialui-plain colored",
  "Ant Design": "devicon-antdesign-plain colored",
  Git: "devicon-git-plain colored",
  "GitHub/GitLab": "devicon-github-original",
  "GitHub Actions": "devicon-githubactions-plain colored",
  Docker: "devicon-docker-plain colored",
  Kubernetes: "devicon-kubernetes-plain colored",
  AWS: "devicon-amazonwebservices-plain colored",
  Vite: "devicon-vitejs-plain colored",
  Jest: "devicon-jest-plain colored",
  Figma: "devicon-figma-plain colored",
  Postman: "devicon-postman-plain colored",
  "Webpack 5": "devicon-webpack-plain colored",
  Storybook: "devicon-storybook-plain colored",
  "AWS Cloudfront CDN": "devicon-amazonwebservices-plain colored",
};
