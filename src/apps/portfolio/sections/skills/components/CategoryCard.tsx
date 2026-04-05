import { motion, AnimatePresence } from "framer-motion";
import { CATEGORY_CONFIG } from "../constants";
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
      className="flex flex-col gap-3 rounded-2xl p-5 transition-[background,border-color] duration-[400ms]"
      style={{
        background: isActive ? cfg.bg : "var(--surface)",
        border: isActive ? `1px solid ${cfg.border}` : "1px solid var(--border)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-2xl font-bold transition-all duration-[400ms]"
            style={{
              background: isActive ? cfg.bg : "var(--surface)",
              color: isActive ? "var(--text-primary)" : "var(--text-muted)",
              border: `1px solid ${cfg.border}`,
            }}
          >
            {cfg.icon}
          </span>
          <div>
            <h3
              className="text-sm font-bold leading-tight transition-colors duration-[400ms]"
              style={{
                color: isActive ? "var(--text-primary)" : "var(--text-muted)",
              }}
            >
              {cfg.label}
            </h3>
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
