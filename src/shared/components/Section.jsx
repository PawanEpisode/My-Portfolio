import { motion } from "framer-motion";
import { parseMixedTitle } from "../utils/parseMixedTitle";

/**
 * Generic full-page section wrapper.
 * Handles the section header (label, title, optional subtitle) plus
 * an animated content area for children.
 *
 * Sections that use position:sticky (ExperienceStack, ProjectsStack, Skills)
 * render OUTSIDE this wrapper — Section's whileInView transform would break
 * their sticky scroll behaviour.
 */
export default function Section({ id, label, title, subtitle, children }) {
  return (
    <section id={id} className="relative border-t border-border px-6 py-24">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(129,140,248,0.04),transparent)]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header row */}
        <div className="relative mb-16">
          {label && (
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-label"
            >
              {label}
            </motion.p>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="section-title-main"
          >
            {parseMixedTitle(title)}
          </motion.h2>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-lg text-base text-muted"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
