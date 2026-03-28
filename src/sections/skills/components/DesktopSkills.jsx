import { motion, AnimatePresence } from "framer-motion";
import { useStackScroll } from "../../../shared/hooks/useStackScroll";
import AnimatedCounter from "../../../shared/components/AnimatedCounter";
import { CATEGORY_ORDER, CATEGORY_CONFIG, SKILL_SCROLL_VH } from "../constants";
import MilestoneBar from "./MilestoneBar";
import CategoryCard from "./CategoryCard";

/** Desktop sticky-scroll layout for the skills section. */
export default function DesktopSkills({ skillValues }) {
  const { containerRef, activeIndex } = useStackScroll(CATEGORY_ORDER.length);
  const activeCfg = CATEGORY_CONFIG[CATEGORY_ORDER[activeIndex]];

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(100vh + ${CATEGORY_ORDER.length * SKILL_SCROLL_VH}vh)` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 50% at 28% 50%, rgba(129,140,248,0.05), transparent)" }}
        />

        <div
          className="relative z-10 h-full flex flex-col px-6 max-w-6xl mx-auto w-full"
          style={{ paddingTop: "80px", paddingBottom: "32px" }}
        >
          {/* Top: left panel + milestone bar */}
          <div className="grid grid-cols-5 gap-10 w-full items-start mb-8">
            <div className="col-span-2 flex flex-col gap-3">
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
                      background: activeCfg.bg, border: `1px solid ${activeCfg.border}`,
                      color: activeCfg.color, boxShadow: `0 0 16px ${activeCfg.glow}`,
                    }}
                  >
                    {activeCfg.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-subtle)" }}>
                      Currently viewing
                    </p>
                    <p className="text-sm font-bold truncate mt-0.5" style={{ color: activeCfg.color }}>
                      {activeCfg.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {skillValues[CATEGORY_ORDER[activeIndex]]?.length ?? 0} skills
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <AnimatedCounter current={activeIndex + 1} total={CATEGORY_ORDER.length} />

              {/* Category progress list */}
              <div className="flex flex-col gap-2">
                {CATEGORY_ORDER.map((key, idx) => {
                  const cfg      = CATEGORY_CONFIG[key];
                  const isActive = idx === activeIndex;
                  const isPast   = idx < activeIndex;
                  return (
                    <motion.div
                      key={key}
                      animate={{ opacity: isActive ? 1 : isPast ? 0.5 : 0.25, x: isActive ? 6 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2.5"
                    >
                      <div
                        style={{
                          width:  isActive ? "8px" : "5px",
                          height: isActive ? "8px" : "5px",
                          borderRadius: "50%", flexShrink: 0,
                          background: isActive ? cfg.color : isPast ? "rgba(52,211,153,0.6)" : "var(--text-subtle)",
                          boxShadow: isActive ? `0 0 10px ${cfg.glow}` : "none",
                          transition: "all 0.3s",
                        }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{
                          color: isActive ? cfg.color : isPast ? "var(--text-muted)" : "var(--text-subtle)",
                          transition: "color 0.3s",
                        }}
                      >
                        {cfg.shortLabel}
                      </span>
                      {isPast && <span className="text-[9px] font-bold" style={{ color: "#34d399" }}>✓</span>}
                    </motion.div>
                  );
                })}
              </div>

              <p className="text-[10px] tracking-widest uppercase mt-1" style={{ color: "var(--text-subtle)" }}>
                ↕ Scroll to explore
              </p>
            </div>

            <div className="col-span-3 flex flex-col justify-center pt-6">
              <MilestoneBar activeIndex={activeIndex} />
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-5 gap-3 flex-1">
            {CATEGORY_ORDER.map((key, idx) => {
              const state = idx < activeIndex ? "past" : idx === activeIndex ? "active" : "future";
              return (
                <CategoryCard
                  key={key}
                  categoryKey={key}
                  skills={skillValues[key] || []}
                  state={state}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
