import {
  BookOpen,
  Layers,
  MessageCircle,
  MonitorPlay,
  Puzzle,
  Sparkles,
} from "lucide-react";
import type { MegaMenuCategoryConfig } from "../../../shared/components/MegaMenuPanel";

export const INTERVIEW_MENU: MegaMenuCategoryConfig[] = [
  {
    id: "formats",
    label: "Interview formats",
    items: [
      {
        id: "live-coding",
        visible: true,
        title: "Live coding sessions",
        description: "What reviewers look for in editor-based frontend rounds.",
        tags: ["Live", "Algorithms", "UI"],
        routeKey: "interview:formats:live",
        icon: MonitorPlay,
      },
      {
        id: "system-frontend",
        visible: true,
        title: "Frontend system design",
        description: "Component APIs, data flow, performance, and trade-off narration.",
        tags: ["Architecture", "Trade-offs"],
        routeKey: "interview:formats:system",
        icon: Layers,
      },
      {
        id: "retro-format",
        visible: false,
        title: "Legacy format notes",
        description: "Hidden example—toggle visible when you publish this track.",
        tags: ["Archive"],
        routeKey: "interview:formats:legacy",
        icon: BookOpen,
      },
    ],
  },
  {
    id: "topics",
    label: "Topic deep dives",
    items: [
      {
        id: "a11y",
        visible: true,
        title: "Accessibility checkpoints",
        description: "Keyboard flows, ARIA, and inclusive component patterns.",
        tags: ["A11y", "WCAG"],
        routeKey: "interview:topics:a11y",
        icon: Puzzle,
      },
      {
        id: "performance",
        visible: true,
        title: "Performance storytelling",
        description: "How to explain metrics, budgets, and rendering work in interviews.",
        tags: ["Web Vitals", "Profiling"],
        routeKey: "interview:topics:performance",
        icon: Sparkles,
      },
    ],
  },
  {
    id: "soft",
    label: "Communication",
    items: [
      {
        id: "narration",
        visible: true,
        title: "Thinking out loud",
        description: "Templates for clarifying requirements and checking assumptions.",
        tags: ["Communication", "Structure"],
        routeKey: "interview:soft:narration",
        icon: MessageCircle,
      },
    ],
  },
];
