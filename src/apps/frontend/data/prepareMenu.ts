import {
  Atom,
  Briefcase,
  Building2,
  Code2,
  FileCode2,
  LayoutTemplate,
  ListChecks,
} from "lucide-react";
import type { MegaMenuCategoryConfig } from "../../../shared/components/MegaMenuPanel";

/** Prepare mega-menu: categories match product spec; `visible` gates rows in the hover panel. */
export const PREPARE_MENU: MegaMenuCategoryConfig[] = [
  {
    id: "practice",
    label: "Practice questions",
    items: [
      {
        id: "all-practice",
        visible: true,
        title: "All practice questions",
        description:
          "Browse every question across topics—coding, frameworks, and browser fundamentals.",
        tags: ["Coding", "React", "TypeScript", "JavaScript"],
        routeKey: "prepare:practice:all",
        icon: ListChecks,
      },
      {
        id: "react-patterns",
        visible: true,
        title: "React patterns",
        description: "Hooks, rendering, performance, and composition in production UIs.",
        tags: ["React", "Hooks", "Performance"],
        routeKey: "prepare:practice:react",
        icon: LayoutTemplate,
      },
      {
        id: "typescript-drills",
        visible: true,
        title: "TypeScript drills",
        description: "Types, generics, and narrowing for safer frontend codebases.",
        tags: ["TypeScript", "Types"],
        routeKey: "prepare:practice:typescript",
        icon: FileCode2,
      },
      {
        id: "draft-bank",
        visible: false,
        title: "Draft question bank",
        description: "Hidden until you flip visibility—useful for WIP content.",
        tags: ["Draft"],
        routeKey: "prepare:practice:draft",
        icon: Code2,
      },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks / Languages",
    items: [
      {
        id: "javascript-core",
        visible: true,
        title: "JavaScript fundamentals",
        description: "Closures, async, modules, and the event loop—plain JS first.",
        tags: ["JavaScript", "ESM", "Async"],
        routeKey: "prepare:frameworks:javascript",
        icon: Code2,
      },
      {
        id: "css-layout",
        visible: true,
        title: "CSS & layout",
        description: "Flex, grid, responsive patterns, and maintainable styling.",
        tags: ["CSS", "Layout"],
        routeKey: "prepare:frameworks:css",
        icon: Atom,
      },
      {
        id: "wasm-preview",
        visible: false,
        title: "WebAssembly track",
        description: "Not listed in the menu while visibility is false.",
        tags: ["WASM"],
        routeKey: "prepare:frameworks:wasm",
        icon: Code2,
      },
    ],
  },
  {
    id: "company",
    label: "Company-based questions",
    items: [
      {
        id: "product-companies",
        visible: true,
        title: "Product-company style sets",
        description:
          "Curated prompts styled after frontend loops at large product companies.",
        tags: ["Frontend", "Pairing"],
        routeKey: "prepare:company:product",
        icon: Building2,
      },
      {
        id: "startup-rounds",
        visible: true,
        title: "Startup & scale-up rounds",
        description: "Practical screens, take-homes, and live coding expectations.",
        tags: ["Take-home", "Live coding"],
        routeKey: "prepare:company:startup",
        icon: Briefcase,
      },
    ],
  },
];
