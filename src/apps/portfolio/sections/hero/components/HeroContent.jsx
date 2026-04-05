import { motion } from "framer-motion";
import { Download, MapPin, Mail, ExternalLink } from "lucide-react";
import { containerVariants, itemVariants, CORE_TECH } from "../constants";

/**
 * Left column of the Hero section.
 *
 * Renders: available badge, name, typewriter role, summary,
 * location/email, CTA buttons, stats grid, and core tech stack.
 */
export default function HeroContent({
  person,
  resumeDownloadLink,
  stats,
  typewriterText,
}) {
  const { name, location, email, summary } = person;

  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col justify-center"
    >
      {/* Available badge */}
      <motion.div variants={itemVariants}>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(129,140,248,0.25)] bg-[rgba(129,140,248,0.1)] px-3 py-1.5 text-xs font-medium text-accent-indigo">
          <span className="h-1.5 w-1.5 animate-[glow-pulse_2s_ease-in-out_infinite] rounded-full bg-[#22d3ee]" />
          Available for opportunities
        </div>
      </motion.div>

      {/* Name */}
      <motion.div variants={itemVariants}>
        <h1 className="overflow-visible font-black leading-[0.92] tracking-tight">
          <span className="text-gradient block overflow-visible pr-[0.08em] text-[clamp(3.5rem,9vw,5rem)]">
            {firstName}
          </span>
          <span className="block overflow-visible text-[clamp(3.5rem,9vw,5rem)] text-foreground">
            {lastName}
          </span>
        </h1>
      </motion.div>

      {/* Typewriter role */}
      <motion.div variants={itemVariants} className="mt-4 flex items-center gap-2">
        <span className="text-xl font-semibold text-muted md:text-2xl">
          {typewriterText}
          <span className="mb-0.5 ml-0.5 inline-block h-6 w-0.5 align-middle bg-accent-cyan animate-[blink_1s_step-end_infinite]" />
        </span>
      </motion.div>

      {/* Summary */}
      <motion.p
        variants={itemVariants}
        className="mt-5 max-w-lg text-base leading-relaxed text-muted"
      >
        {summary}
      </motion.p>

      {/* Location + Email */}
      <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-4">
        <span className="inline-flex items-center gap-1.5 text-sm text-subtle">
          <MapPin size={13} />
          {location}
        </span>
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-1.5 text-sm text-subtle transition-colors hover:text-accent-indigo"
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
        className="mt-10 grid grid-cols-4 gap-4 border-t border-border pt-8"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <span className="text-2xl font-black text-gradient-static">
              {stat.value}
            </span>
            <span className="mt-0.5 text-xs leading-tight text-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Core tech stack */}
      <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-subtle">
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
              className="flex cursor-default items-center gap-1.5 rounded-lg border border-border bg-white/[0.04] px-2.5 py-1.5 transition-[border-color,background,transform] duration-200"
              whileHover={{ y: -2, scale: 1.06 }}
            >
              <i
                className={`${icon} inline-block text-base leading-none not-italic`}
                aria-hidden
              />
              <span className="text-xs font-medium text-muted">{techName}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
