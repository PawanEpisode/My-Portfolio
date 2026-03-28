import { AnimatePresence, useScroll, useMotionValueEvent, motion } from "framer-motion";
import { useRef, useState } from "react";
import { DEVICON_MAP } from "../lib/constants";

/* ─── Shared section header (mixed Syne bold + Instrument Serif italic) ── */
function SectionHeader({ label, title }) {
  const parts = title.split(/(\*[^*]+\*)/g);
  const parsed = parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="section-title-accent">{part.slice(1, -1)}</em>
    ) : (
      <span key={i}>{part}</span>
    )
  );

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

        <div className="flex items-start justify-between gap-8 max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="section-title-main"
          >
            {parsed}
          </motion.h2>
        </div>
      </div>
    </div>
  );
}

/* ─── Category config ─────────────────────────────────────────── */
const CATEGORY_CONFIG = {
  languages: {
    label: "Languages",
    shortLabel: "Languages",
    icon: "{ }",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.2)",
    glow: "rgba(249,115,22,0.18)",
  },
  frameworks: {
    label: "Frameworks & Libraries",
    shortLabel: "Frameworks",
    icon: "⚛",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.08)",
    border: "rgba(129,140,248,0.2)",
    glow: "rgba(129,140,248,0.18)",
  },
  tools: {
    label: "Tools & Platforms",
    shortLabel: "Tools",
    icon: "⚙",
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.08)",
    border: "rgba(34,211,238,0.2)",
    glow: "rgba(34,211,238,0.18)",
  },
  practices: {
    label: "Best Practices",
    shortLabel: "Practices",
    icon: "✦",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
    glow: "rgba(52,211,153,0.18)",
  },
  softSkills: {
    label: "Soft Skills",
    shortLabel: "Soft Skills",
    icon: "◈",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.08)",
    border: "rgba(244,114,182,0.2)",
    glow: "rgba(244,114,182,0.18)",
  },
};

const CATEGORY_ORDER = [
  "languages",
  "frameworks",
  "tools",
  "practices",
  "softSkills",
];
const SKILL_SCROLL_VH = 55;
const MAX_VISIBLE_TAGS = 8;

/* ─── Skill tag pill ──────────────────────────────────────────── */
function SkillTag({ skill, color, bg, border }) {
  const iconClass = DEVICON_MAP[skill];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: bg, border: `1px solid ${border}`, color }}
    >
      {iconClass && (
        <i
          className={iconClass}
          style={{ fontSize: "13px", lineHeight: 1, flexShrink: 0 }}
        />
      )}
      {skill}
    </span>
  );
}

/* ─── Horizontal milestone timeline bar ───────────────────────── */
function MilestoneBar({ activeIndex }) {
  const fillPercent = (activeIndex / (CATEGORY_ORDER.length - 1)) * 100;

  return (
    <div className="w-full px-2">
      {/* Labels row */}
      <div className="flex justify-between mb-3">
        {CATEGORY_ORDER.map((key, idx) => {
          const cfg = CATEGORY_CONFIG[key];
          const isPast = idx < activeIndex;
          const isActive = idx === activeIndex;
          return (
            <div
              key={key}
              className="flex flex-col items-center gap-1"
              style={{ flex: 1, minWidth: 0 }}
            >
              <span
                className="text-xs font-semibold truncate text-center px-1"
                style={{
                  color: isActive
                    ? cfg.color
                    : isPast
                      ? "var(--text-muted)"
                      : "var(--text-subtle)",
                  transition: "color 0.4s",
                }}
              >
                {cfg.shortLabel}
              </span>
            </div>
          );
        })}
      </div>

      {/* Track + dots row */}
      <div className="relative flex items-center">
        {/* Background track */}
        <div
          className="absolute left-0 right-0 h-[2px] rounded-full"
          style={{
            background: "var(--border)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        {/* Filled track */}
        <div
          className="absolute left-0 h-[2px] rounded-full"
          style={{
            width: `${fillPercent}%`,
            background: "linear-gradient(to right, #818cf8, #22d3ee)",
            top: "50%",
            transform: "translateY(-50%)",
            transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />

        {/* Milestone dots — evenly spaced */}
        <div className="relative w-full flex justify-between">
          {CATEGORY_ORDER.map((key, idx) => {
            const cfg = CATEGORY_CONFIG[key];
            const isPast = idx < activeIndex;
            const isActive = idx === activeIndex;

            return (
              <motion.div
                key={key}
                animate={{
                  scale: isActive ? 1.3 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: isActive ? 16 : 12,
                  height: isActive ? 16 : 12,
                  borderRadius: "50%",
                  background:
                    isPast || isActive ? cfg.color : "var(--bg-primary)",
                  border:
                    isPast || isActive
                      ? `2px solid ${cfg.color}`
                      : "2px solid var(--text-subtle)",
                  boxShadow: isActive ? `0 0 12px ${cfg.glow}` : "none",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                {isPast && (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ color: "#fff", fontSize: "8px", fontWeight: 700 }}
                  >
                    ✓
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Single category card — state-driven styling ─────────────── */
function CategoryCard({ categoryKey, skills, state }) {
  const cfg = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG.frameworks;
  const isPast = state === "past";
  const isActive = state === "active";

  const visibleTags = isActive ? skills.slice(0, MAX_VISIBLE_TAGS) : [];
  const hiddenCount = isActive
    ? Math.max(0, skills.length - MAX_VISIBLE_TAGS)
    : 0;

  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : isPast ? 0.45 : 0.18,
        scale: isActive ? 1 : 0.97,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-5 flex flex-col gap-3 h-full"
      style={{
        background: isActive ? cfg.bg : "var(--surface)",
        border: isActive
          ? `1px solid ${cfg.border}`
          : isPast
            ? "1px solid var(--border)"
            : "1px solid var(--border)",
        boxShadow: isActive
          ? `0 0 32px ${cfg.glow}, inset 0 0 0 1px rgba(255,255,255,0.04)`
          : "none",
        transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
        minHeight: "160px",
      }}
    >
      {/* Header */}
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
                color: isActive
                  ? cfg.color
                  : isPast
                    ? "var(--text-muted)"
                    : "var(--text-subtle)",
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

        {/* State badge */}
        {isPast && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.2)",
              color: "#34d399",
            }}
          >
            ✓ Done
          </span>
        )}
        {isActive && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              color: cfg.color,
            }}
          >
            Active
          </motion.span>
        )}
      </div>

      {/* Tags — only shown when active */}
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
              <SkillTag
                key={skill}
                skill={skill}
                color={cfg.color}
                bg={cfg.bg}
                border={cfg.border}
              />
            ))}
            {hiddenCount > 0 && (
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                +{hiddenCount} more
              </span>
            )}
          </motion.div>
        )}

        {/* Past: show a compact skill name list */}
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

/* ─── Desktop: scroll-driven sticky viewer ────────────────────── */
function DesktopSkills({ skillValues }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(
      Math.min(
        CATEGORY_ORDER.length - 1,
        Math.floor(v * CATEGORY_ORDER.length),
      ),
    );
  });

  const activeCfg = CATEGORY_CONFIG[CATEGORY_ORDER[activeIndex]];

  return (
    <div
      ref={containerRef}
      style={{
        height: `calc(100vh + ${CATEGORY_ORDER.length * SKILL_SCROLL_VH}vh)`,
      }}
      className="relative"
    >
      {/* Sticky 100vh viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 28% 50%, rgba(129,140,248,0.05), transparent)",
          }}
        />

        <div
          className="relative z-10 h-full flex flex-col px-6 max-w-6xl mx-auto w-full"
          style={{ paddingTop: "80px", paddingBottom: "32px", gap: "0" }}
        >
          {/* ── Top area: left panel + milestone bar ── */}
          <div className="grid grid-cols-5 gap-10 w-full items-start mb-8">
            {/* LEFT COLUMN — progress info only (no section title) */}
            <div className="col-span-2 flex flex-col gap-3">
              {/* Active category display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                      background: activeCfg.bg,
                      border: `1px solid ${activeCfg.border}`,
                      color: activeCfg.color,
                      boxShadow: `0 0 16px ${activeCfg.glow}`,
                    }}
                  >
                    {activeCfg.icon}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-xs font-medium uppercase tracking-wide"
                      style={{ color: "var(--text-subtle)" }}
                    >
                      Currently viewing
                    </p>
                    <p
                      className="text-sm font-bold truncate mt-0.5"
                      style={{ color: activeCfg.color }}
                    >
                      {activeCfg.label}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {skillValues[CATEGORY_ORDER[activeIndex]]?.length ?? 0}{" "}
                      skills
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Animated counter */}
              <div className="flex items-baseline gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="text-4xl font-black text-gradient-static"
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span
                  className="text-base font-semibold"
                  style={{ color: "var(--text-subtle)" }}
                >
                  / {String(CATEGORY_ORDER.length).padStart(2, "0")}
                </span>
              </div>

              {/* Category progress list */}
              <div className="flex flex-col gap-2">
                {CATEGORY_ORDER.map((key, idx) => {
                  const cfg = CATEGORY_CONFIG[key];
                  const isActive = idx === activeIndex;
                  const isPast = idx < activeIndex;
                  return (
                    <motion.div
                      key={key}
                      animate={{
                        opacity: isActive ? 1 : isPast ? 0.5 : 0.25,
                        x: isActive ? 6 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2.5"
                    >
                      {/* Animated dot */}
                      <div
                        style={{
                          width: isActive ? "8px" : "5px",
                          height: isActive ? "8px" : "5px",
                          borderRadius: "50%",
                          flexShrink: 0,
                          background: isActive
                            ? cfg.color
                            : isPast
                              ? "rgba(52,211,153,0.6)"
                              : "var(--text-subtle)",
                          boxShadow: isActive ? `0 0 10px ${cfg.glow}` : "none",
                          transition: "all 0.3s",
                        }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{
                          color: isActive
                            ? cfg.color
                            : isPast
                              ? "var(--text-muted)"
                              : "var(--text-subtle)",
                          transition: "color 0.3s",
                        }}
                      >
                        {cfg.shortLabel}
                      </span>
                      {isPast && (
                        <span
                          className="text-[9px] font-bold"
                          style={{ color: "#34d399" }}
                        >
                          ✓
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <p
                className="text-[10px] tracking-widest uppercase mt-1"
                style={{ color: "var(--text-subtle)" }}
              >
                ↕ Scroll to explore
              </p>
            </div>

            {/* RIGHT COLUMN: Milestone timeline bar */}
            <div className="col-span-3 flex flex-col justify-center pt-6">
              <MilestoneBar activeIndex={activeIndex} />
            </div>
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-5 gap-3 flex-1">
            {CATEGORY_ORDER.map((key, idx) => {
              const state =
                idx < activeIndex
                  ? "past"
                  : idx === activeIndex
                    ? "active"
                    : "future";
              return (
                <CategoryCard
                  key={key}
                  categoryKey={key}
                  skills={skillValues[key] || []}
                  state={state}
                  activeIndex={activeIndex}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile: accordion (unchanged) ──────────────────────────── */
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
        border: isActive
          ? `1px solid ${cfg.border}`
          : "1px solid var(--border)",
        transition: "border-color 0.3s",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{
              background: cfg.bg,
              color: cfg.color,
              border: `1px solid ${cfg.border}`,
            }}
          >
            {cfg.icon}
          </span>
          <div>
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {cfg.label}
            </h3>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              {skills.length} skills
            </p>
          </div>
        </div>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-transform duration-200"
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
          className="px-5 pb-5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="flex flex-wrap gap-2 pt-4">
            {skills.map((skill) => (
              <SkillTag
                key={skill}
                skill={skill}
                color={cfg.color}
                bg={cfg.bg}
                border={cfg.border}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function MobileSkills({ skillValues }) {
  const [activeCategories, setActiveCategories] = useState(
    Object.fromEntries(
      CATEGORY_ORDER.map((key) => [
        key,
        key === "languages" || key === "frameworks",
      ]),
    ),
  );

  const toggle = (key) =>
    setActiveCategories((prev) => ({ ...prev, [key]: !prev[key] }));

  const orderedEntries = CATEGORY_ORDER.filter((key) => skillValues[key]).map(
    (key) => [key, skillValues[key]],
  );

  return (
    <section
      className="py-20 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mb-12">
        <p className="section-label">Skills &amp; Expertise</p>
        <h2 className="section-title-main" style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}>
          Technologies I{" "}
          <em className="section-title-accent">master</em>
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

/* ─── Concept marquee ─────────────────────────────────────────── */
function chunkArray(arr, count) {
  const chunks = Array.from({ length: count }, () => []);
  arr.forEach((item, i) => chunks[i % count].push(item));
  return chunks;
}

function LoopSlider({ items, direction = "normal", duration = 30000 }) {
  const loopItems = [...items, ...items];
  return (
    <div
      className="loop-slider"
      style={{ "--duration": `${duration}ms`, "--direction": direction }}
    >
      <div className="inner">
        {loopItems.map((label, idx) => (
          <span key={`${label}-${idx}`} className="concept-tag">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ConceptMarquee({ conceptTags }) {
  if (!conceptTags || conceptTags.length === 0) return null;
  const conceptGroups = chunkArray(conceptTags, 4);
  const baseDuration = 28000;

  return (
    <div
      className="py-14 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          Concepts &amp; Topics
        </motion.p>
        <div className="flex flex-col gap-3">
          {conceptGroups.map((group, idx) => (
            <LoopSlider
              key={idx}
              items={group}
              direction={idx % 2 === 0 ? "normal" : "reverse"}
              duration={baseDuration - idx * 2000 + (idx % 2 === 0 ? 600 : 900)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────── */
export default function Skills({ skillValues, conceptTags, id }) {
  return (
    <>
      {/* Desktop: full-width header + scroll-driven sticky */}
      <div className="hidden md:block" id={id}>
        <SectionHeader label="Skills & Expertise" title="Technologies I *master*" />
        <DesktopSkills skillValues={skillValues} />
      </div>

      {/* Mobile: accordion */}
      <div id={id} className="md:hidden">
        <MobileSkills skillValues={skillValues} />
      </div>

      {/* Concept marquee — always visible, outside the sticky container */}
      <ConceptMarquee conceptTags={conceptTags} />
    </>
  );
}
