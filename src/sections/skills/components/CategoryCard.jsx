import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_CONFIG, MAX_VISIBLE_TAGS } from "../constants";
import SkillTag from "./SkillTag";

/**
 * Single skill-category card displayed in the desktop grid.
 * @param {"past" | "active" | "future"} state
 */
export default function CategoryCard({ categoryKey, skills, state }) {
  const cfg = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG.frameworks;
  const isActive = state === "active";

  return (
    <motion.div
      animate={{ scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{
        background: isActive ? cfg.bg : "var(--surface)",
        border: isActive
          ? `1px solid ${cfg.border}`
          : "1px solid var(--border)",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-2xl font-bold flex-shrink-0"
            style={{
              background: isActive ? cfg.bg : "var(--surface)",
              color: isActive ? cfg.color : "var(--text-subtle)",
              border: `1px solid ${cfg.border}`,
              transition: "all 0.4s",
            }}
          >
            {cfg.icon}
          </span>
          <div>
            <h3
              className="text-sm font-bold leading-tight"
              style={{
                color: isActive ? cfg.color : "var(--text-subtle)",
                transition: "color 0.4s",
              }}
            >
              {cfg.label}
            </h3>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-subtle)" }}
            >
              {skills.length} skills
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="tags"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-1.5"
        >
          {skills.map((skill) => (
            <SkillTag
              key={skill}
              skill={skill}
              color={cfg.color}
              bg={cfg.bg}
              border={cfg.border}
              isActive={isActive}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
