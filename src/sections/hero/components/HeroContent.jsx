import { motion } from "framer-motion";
import { Download, MapPin, Mail, ExternalLink } from "lucide-react";
import { containerVariants, itemVariants, CORE_TECH } from "../constants";

/**
 * Left column of the Hero section.
 *
 * Renders: available badge, name, typewriter role, summary,
 * location/email, CTA buttons, stats grid, and core tech stack.
 */
export default function HeroContent({ person, resumeDownloadLink, stats, typewriterText }) {
  const { name, location, email, summary } = person;

  const firstName = name.split(" ")[0];
  const lastName  = name.split(" ").slice(1).join(" ");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col justify-center"
    >
      {/* Available badge */}
      <motion.div variants={itemVariants}>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{
            background: "rgba(129,140,248,0.1)",
            border: "1px solid rgba(129,140,248,0.25)",
            color: "var(--accent-indigo)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#22d3ee", animation: "glow-pulse 2s ease-in-out infinite" }}
          />
          Available for opportunities
        </div>
      </motion.div>

      {/* Name */}
      <motion.div variants={itemVariants}>
        <h1 className="font-black leading-[0.92] tracking-tight" style={{ overflow: "visible" }}>
          <span
            className="block text-gradient"
            style={{ fontSize: "clamp(3.5rem, 9vw, 5rem)", display: "block", paddingRight: "0.08em", overflow: "visible" }}
          >
            {firstName}
          </span>
          <span
            className="block"
            style={{ fontSize: "clamp(3.5rem, 9vw, 5rem)", color: "var(--text-primary)", overflow: "visible" }}
          >
            {lastName}
          </span>
        </h1>
      </motion.div>

      {/* Typewriter role */}
      <motion.div variants={itemVariants} className="mt-4 flex items-center gap-2">
        <span className="text-xl md:text-2xl font-semibold" style={{ color: "var(--text-muted)" }}>
          {typewriterText}
          <span
            className="ml-0.5 inline-block w-0.5 h-6 align-middle"
            style={{
              background: "var(--accent-cyan)",
              animation: "blink 1s step-end infinite",
              verticalAlign: "middle",
              marginBottom: "2px",
            }}
          />
        </span>
      </motion.div>

      {/* Summary */}
      <motion.p
        variants={itemVariants}
        className="mt-5 text-base leading-relaxed max-w-lg"
        style={{ color: "var(--text-muted)" }}
      >
        {summary}
      </motion.p>

      {/* Location + Email */}
      <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-4">
        <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--text-subtle)" }}>
          <MapPin size={13} />
          {location}
        </span>
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: "var(--text-subtle)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-indigo)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
        >
          <Mail size={13} />
          {email}
        </a>
      </motion.div>

      {/* CTAs */}
      <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
        <a href="#projects" className="btn-primary">
          View My Work
          <ExternalLink size={15} />
        </a>
        <a href={resumeDownloadLink} className="btn-ghost" download>
          <Download size={15} />
          Download Resume
        </a>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="mt-10 grid grid-cols-4 gap-4 pt-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <span className="text-2xl font-black text-gradient-static">{stat.value}</span>
            <span className="text-xs mt-0.5 leading-tight" style={{ color: "var(--text-muted)" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Core tech stack */}
      <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-2">
        <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--text-subtle)" }}>
          Core Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {CORE_TECH.map(({ name: techName, icon }, idx) => (
            <motion.div
              key={techName}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + idx * 0.06, duration: 0.4 }}
              title={techName}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-default"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                transition: "border-color 0.2s, background 0.2s, transform 0.15s",
              }}
              whileHover={{ y: -2, scale: 1.06 }}
            >
              <i className={icon} style={{ fontSize: "16px", lineHeight: 1 }} />
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                {techName}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
