import { AnimatePresence, motion } from "framer-motion";

/**
 * Animated "01 / 05" counter used by sticky-scroll sections
 * (ExperienceStack, ProjectsStack, Skills).
 *
 * The current number slides in/out vertically with AnimatePresence
 * whenever it changes.
 */
export default function AnimatedCounter({ current, total }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="text-gradient-static"
          style={{ fontSize: 40, fontWeight: 900, lineHeight: 1 }}
        >
          {String(current).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
      <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text-subtle)" }}>
        / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
