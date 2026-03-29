import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

/**
 * SectionNav — Floating up/down navigation buttons for scroll-driven sections.
 *
 * Absolutely positioned inside a sticky container so it stays visible while
 * the user is mid-scroll inside a tall scroll-driven section.
 *
 * Props:
 *   prevSection  — id of the section above (pass "home" to scroll to page top)
 *   nextSection  — id of the section below
 *   style        — optional extra inline styles (e.g. override position)
 */

function scrollToSection(id) {
  if (!id) return;
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function SectionNav({ prevSection, nextSection, style }) {
  if (!prevSection && !nextSection) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto absolute bottom-6 right-6 z-[100] flex flex-col gap-1.5"
      style={style}
    >
      {prevSection && (
        <button
          onClick={() => scrollToSection(prevSection)}
          aria-label="Go to previous section"
          className="section-nav-btn"
        >
          <ChevronUp size={14} strokeWidth={2.5} />
        </button>
      )}
      {nextSection && (
        <button
          onClick={() => scrollToSection(nextSection)}
          aria-label="Go to next section"
          className="section-nav-btn"
        >
          <ChevronDown size={14} strokeWidth={2.5} />
        </button>
      )}
    </motion.div>
  );
}
