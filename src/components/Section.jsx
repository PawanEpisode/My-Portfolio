import { motion } from "framer-motion";

/* Parses "Some *italic* text" into mixed bold-Syne + italic-serif spans */
function parseMixedTitle(title) {
  const parts = title.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="section-title-accent">
        {part.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Section({ id, label, title, subtitle, children }) {
  return (
    <section
      id={id}
      className="relative py-24 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(129,140,248,0.04), transparent)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Full-width header row ── */}
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

          <div className="flex items-start justify-between gap-8">
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

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-base max-w-lg"
              style={{ color: "var(--text-muted)" }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* ── Content row — fully separate from header ── */}
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
