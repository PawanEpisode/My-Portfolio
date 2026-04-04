export const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export const CORE_TECH = [
  { name: "React",      icon: "devicon-react-original colored" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored" },
  { name: "Next.js",    icon: "devicon-nextjs-plain colored" },
  { name: "Tailwind",   icon: "devicon-tailwindcss-plain colored" },
  { name: "Node.js",    icon: "devicon-nodejs-plain colored" },
  { name: "Docker",     icon: "devicon-docker-plain colored" },
  { name: "AWS",        icon: "devicon-amazonwebservices-plain colored" },
  { name: "Git",        icon: "devicon-git-plain colored" },
];

export const ROLES = [
  "Frontend Engineer",
  "React Specialist",
  "UI/UX Craftsman",
  "Platform Builder",
];
