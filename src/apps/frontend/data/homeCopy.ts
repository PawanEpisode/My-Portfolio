/** Static copy for the frontend subdomain home (hero, hub labels, value props). */

export const FRONTEND_HERO = {
  label: "Frontend lab",
  titleLine1: "Ship UIs with",
  titleAccent: "confidence",
  subtitle:
    "Interview formats, practice sets, and deep dives in one place—structured so you can rehearse, reflect, and walk into the room with a clear story.",
  primaryCta: "Explore the map",
  secondaryCta: "Contact",
} as const;

export const HUB_LEFT_NODES = [
  { id: "accessibility", label: "Accessibility" },
  { id: "js-functions", label: "JavaScript Functions" },
  { id: "react", label: "React" },
  { id: "networking", label: "Networking" },
  { id: "dsa", label: "Data structures & algorithms" },
];

export const HUB_RIGHT_NODES = [
  { id: "fe-system", label: "Front end system design" },
  { id: "dom", label: "DOM manipulation" },
  { id: "i18n", label: "Internationalization" },
  { id: "ui", label: "User interfaces" },
  { id: "performance", label: "Performance" },
];

export const HUB_CENTER_ITEMS = [
  { num: 1, label: "Interview formats" },
  { num: 2, label: "Practice & drills" },
  { num: 3, label: "Topic deep dives" },
  { num: 4, label: "Frontend System Design" },
];

export const HUB_SECTION = {
  label: "How it fits together",
  title: "A simple map for a messy craft",
  body: "Frontend interviews reward breadth and narration. This space groups formats, drills, and topics so you can see how accessibility, performance, and system design reinforce each other—not random trivia in isolation.",
} as const;

export const VALUE_PROPS = [
  {
    title: "Formats first",
    text: "Know what each round is measuring—live coding, UI craft, or architecture—before you optimize the wrong thing.",
  },
  {
    title: "Practice with intent",
    text: "Drills mirror real constraints: TypeScript, layout, and product-style prompts you can repeat on a timer.",
  },
  {
    title: "Narrate trade-offs",
    text: "Communication tracks help you clarify assumptions and compare options out loud, like you would with a team.",
  },
] as const;
