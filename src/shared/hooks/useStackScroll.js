import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * Drives the scroll-based "stacking" UI shared by ExperienceStack,
 * ProjectsStack, and the Skills sticky viewer.
 *
 * Attaches a scroll listener to containerRef and derives the active
 * index by dividing scrollYProgress into equal segments.
 *
 * @param {number} itemCount - Total number of items/categories
 * @returns {{ containerRef, activeIndex, scrollYProgress }}
 */
export function useStackScroll(itemCount) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(itemCount - 1, Math.floor(v * itemCount)));
  });

  return { containerRef, activeIndex, scrollYProgress };
}
