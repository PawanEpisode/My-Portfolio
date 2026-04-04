import { useState } from "react";
import { motion } from "framer-motion";
import { CATEGORY_ORDER, CATEGORY_CONFIG } from "../constants";
import SkillTag from "./SkillTag";

/** Single accordion row for a skill category on mobile. */
function MobileSkillCategory({ categoryKey, skills, isActive, onToggle }) {
  const cfg = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG.frameworks;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl bg-surface transition-[border-color] duration-300"
      style={{
        border: isActive ? `1px solid ${cfg.border}` : "1px solid var(--border)",
      }}
    >
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-2 p-4 text-left min-[360px]:p-5">
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
          >
            {cfg.icon}
          </span>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {cfg.label}
            </h3>
            <p className="text-xs text-muted">{skills.length} skills</p>
          </div>
        </div>
        <div
          className="flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold transition-transform duration-200"
          style={{
            background: cfg.bg,
            color: cfg.color,
            transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </div>
      </button>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="border-t border-border px-4 pb-4 min-[360px]:px-5 min-[360px]:pb-5"
        >
          <div className="flex flex-wrap gap-2 pt-4">
            {skills.map((skill) => (
              <SkillTag key={skill} skill={skill} color={cfg.color} bg={cfg.bg} border={cfg.border} />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/** Mobile accordion layout for the skills section. */
export default function MobileSkills({ skillValues }) {
  const [activeCategories, setActiveCategories] = useState(
    Object.fromEntries(
      CATEGORY_ORDER.map((key) => [key, key === "languages" || key === "frameworks"])
    )
  );

  const toggle = (key) => setActiveCategories((prev) => ({ ...prev, [key]: !prev[key] }));

  const orderedEntries = CATEGORY_ORDER.filter((key) => skillValues[key]).map(
    (key) => [key, skillValues[key]]
  );

  return (
    <section className="border-t border-border px-4 py-12 min-[360px]:px-6">
      <div className="mb-12 min-w-0 flex flex-col items-center">
        <p className="section-label">Skills &amp; Expertise</p>
        <h2 className="section-title-main text-center">
          Technologies I <em className="section-title-accent">master</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {orderedEntries.map(([key, skills]) => (
          <MobileSkillCategory
            key={key}
            categoryKey={key}
            skills={skills}
            isActive={!!activeCategories[key]}
            onToggle={() => toggle(key)}
          />
        ))}
      </div>
    </section>
  );
}
