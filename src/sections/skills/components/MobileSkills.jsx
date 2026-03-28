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
      className="rounded-2xl overflow-hidden"
      style={{
        background: "var(--surface)",
        border: isActive ? `1px solid ${cfg.border}` : "1px solid var(--border)",
        transition: "border-color 0.3s",
      }}
    >
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 text-left">
        <div className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
          >
            {cfg.icon}
          </span>
          <div>
            <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {cfg.label}
            </h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{skills.length} skills</p>
          </div>
        </div>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-transform duration-200"
          style={{
            background: cfg.bg, color: cfg.color,
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
          className="px-5 pb-5"
          style={{ borderTop: "1px solid var(--border)" }}
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
    <section className="py-20 px-6" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mb-12">
        <p className="section-label">Skills &amp; Expertise</p>
        <h2 className="section-title-main" style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}>
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
