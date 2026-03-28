import { motion } from "framer-motion";
import { parseMixedTitle } from "../utils/parseMixedTitle";

/**
 * Standalone section header used by sticky-scroll sections
 * (ExperienceStack, ProjectsStack, Skills) that render outside <Section>.
 *
 * Renders a full-width label + animated h2 with the *italic* markup syntax.
 */
export default function SectionHeader({ label, title }) {
  return (
    <div
      className="relative px-6 pt-20 pb-12"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto relative">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          {label}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="section-title-main"
        >
          {parseMixedTitle(title)}
        </motion.h2>
      </div>
    </div>
  );
}
