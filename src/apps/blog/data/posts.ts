import type { BlogCategory, BlogPost } from "../types";

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "engineering",
    label: "Engineering",
    description: "Build systems, patterns, and how things work under the hood.",
  },
  {
    id: "interviews",
    label: "Interviews",
    description: "Frontend loops, preparation, and how to communicate trade-offs.",
  },
  {
    id: "accessibility",
    label: "Accessibility",
    description: "Inclusive UI, keyboard flows, and practical WCAG-minded notes.",
  },
  {
    id: "performance",
    label: "Performance",
    description: "Rendering, budgets, and making fast experiences measurable.",
  },
  {
    id: "career",
    label: "Career",
    description: "Learning in public, scope, and growing as a product-minded engineer.",
  },
];

const POSTS: BlogPost[] = [
  {
    slug: "react-server-components-mental-model",
    title: "A mental model for React Server Components",
    excerpt:
      "When to reach for RSC, how it changes data fetching boundaries, and what stays on the client.",
    date: "2026-03-12",
    categoryIds: ["engineering"],
    readTimeMinutes: 12,
    featured: true,
  },
  {
    slug: "frontend-system-design-outline",
    title: "A lightweight outline for frontend system design",
    excerpt:
      "Component APIs, state ownership, caching, and how to narrate trade-offs in under forty minutes.",
    date: "2026-02-28",
    categoryIds: ["interviews", "engineering"],
    readTimeMinutes: 9,
  },
  {
    slug: "focus-rings-that-feel-intentional",
    title: "Focus rings that feel intentional, not accidental",
    excerpt:
      "Pairing :focus-visible with custom components so keyboard users always know where they are.",
    date: "2026-02-14",
    categoryIds: ["accessibility", "engineering"],
    readTimeMinutes: 7,
  },
  {
    slug: "measuring-what-users-feel",
    title: "Measuring what users feel: Core Web Vitals in practice",
    excerpt:
      "Connecting LCP, INP, and CLS to real UI decisions—not just dashboard charts.",
    date: "2026-01-30",
    categoryIds: ["performance", "engineering"],
    readTimeMinutes: 11,
  },
  {
    slug: "writing-specs-before-the-pr",
    title: "Writing the spec before the PR",
    excerpt:
      "A short checklist for ambiguous tickets: scope, edge cases, and when to say no.",
    date: "2026-01-08",
    categoryIds: ["career", "engineering"],
    readTimeMinutes: 6,
  },
  {
    slug: "typescript-narrowing-patterns",
    title: "TypeScript narrowing patterns I actually use",
    excerpt:
      "Discriminated unions, assertion functions, and keeping inference friendly for teammates.",
    date: "2025-12-18",
    categoryIds: ["engineering"],
    readTimeMinutes: 8,
  },
  {
    slug: "interview-storytelling-performance",
    title: "Storytelling performance work in interviews",
    excerpt:
      "How to describe a slow page, the fix you shipped, and the metric that moved—without hand-waving.",
    date: "2025-12-02",
    categoryIds: ["interviews", "performance"],
    readTimeMinutes: 10,
  },
  {
    slug: "semantic-html-still-matters",
    title: "Semantic HTML still matters for custom components",
    excerpt:
      "Choosing the right host element up front saves a11y refactors when design iterations land.",
    date: "2025-11-15",
    categoryIds: ["accessibility", "engineering"],
    readTimeMinutes: 5,
  },
];

export function getCategories(): BlogCategory[] {
  return BLOG_CATEGORIES;
}

export function getAllPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPost(): BlogPost | undefined {
  return POSTS.find((p) => p.featured);
}

export function getCategoryById(id: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.id === id);
}
