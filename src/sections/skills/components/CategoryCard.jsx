import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_CONFIG, MAX_VISIBLE_TAGS } from "../constants";
import SkillTag from "./SkillTag";

/**
 * Single skill-category card displayed in the desktop grid.
 * @param {"past" | "active" | "future"} state
 */
export default function CategoryCard({ categoryKey, skills, state }) {
  const cfg      = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG.frameworks;
  const isPast   = state === "past";
  const isActive = state === "active";

  const visibleTags = isActive ? skills.slice(0, MAX_VISIBLE_TAGS) : [];
  const hiddenCount = isActive ? Math.max(0, skills.length - MAX_VISIBLE_TAGS) : 0;

  return (
    <motion.div
      animate={{ opacity: isActive ? 1 : isPast ? 0.45 : 0.18, scale: isActive ? 1 : 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-5 flex flex-col gap-3 h-full"
      style={{
        background: isActive ? cfg.bg : "var(--surface)",
        border: isActive ? `1px solid ${cfg.border}` : "1px solid var(--border)",
        boxShadow: isActive ? `0 0 32px ${cfg.glow}, inset 0 0 0 1px rgba(255,255,255,0.04)` : "none",
        transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
        minHeight: "160px",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{
              background: isActive ? cfg.bg : "rgba(255,255,255,0.03)",
              color: isActive ? cfg.color : "var(--text-subtle)",
              border: `1px solid ${isActive ? cfg.border : "var(--border)"}`,
              transition: "all 0.4s",
            }}
          >
            {cfg.icon}
          </span>
          <div>
            <h3
              className="text-sm font-bold leading-tight"
              style={{
                color: isActive ? cfg.color : isPast ? "var(--text-muted)" : "var(--text-subtle)",
                transition: "color 0.4s",
              }}
            >
              {cfg.label}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-subtle)" }}>
              {skills.length} skills
            </p>
          </div>
        </div>

        {isPast && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#34d399" }}
          >
            ✓ Done
          </span>
        )}
        {isActive && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
          >
            Active
          </motion.span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key="tags"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-1.5"
          >
            {visibleTags.map((skill) => (
              <SkillTag key={skill} skill={skill} color={cfg.color} bg={cfg.bg} border={cfg.border} />
            ))}
            {hiddenCount > 0 && (
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
              >
                +{hiddenCount} more
              </span>
            )}
          </motion.div>
        )}

        {isPast && (
          <motion.p
            key="past-summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-xs leading-relaxed"
            style={{ color: "var(--text-subtle)" }}
          >
            {skills.slice(0, 5).join(" · ")}
            {skills.length > 5 && ` · +${skills.length - 5} more`}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
