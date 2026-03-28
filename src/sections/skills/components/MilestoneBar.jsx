import { motion } from "framer-motion";
import { CATEGORY_ORDER, CATEGORY_CONFIG } from "../constants";

/** Horizontal progress bar that highlights the current skill category. */
export default function MilestoneBar({ activeIndex }) {
  const fillPercent = (activeIndex / (CATEGORY_ORDER.length - 1)) * 100;

  return (
    <div className="w-full px-2">
      <div className="flex justify-between mb-3">
        {CATEGORY_ORDER.map((key, idx) => {
          const cfg      = CATEGORY_CONFIG[key];
          const isPast   = idx < activeIndex;
          const isActive = idx === activeIndex;
          return (
            <div key={key} className="flex flex-col items-center gap-1" style={{ flex: 1, minWidth: 0 }}>
              <span
                className="text-xs font-semibold truncate text-center px-1"
                style={{
                  color: isActive ? cfg.color : isPast ? "var(--text-muted)" : "var(--text-subtle)",
                  transition: "color 0.4s",
                }}
              >
                {cfg.shortLabel}
              </span>
            </div>
          );
        })}
      </div>

      <div className="relative flex items-center">
        <div
          className="absolute left-0 right-0 h-[2px] rounded-full"
          style={{ background: "var(--border)", top: "50%", transform: "translateY(-50%)" }}
        />
        <div
          className="absolute left-0 h-[2px] rounded-full"
          style={{
            width: `${fillPercent}%`,
            background: "linear-gradient(to right, #818cf8, #22d3ee)",
            top: "50%", transform: "translateY(-50%)",
            transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <div className="relative w-full flex justify-between">
          {CATEGORY_ORDER.map((key, idx) => {
            const cfg      = CATEGORY_CONFIG[key];
            const isPast   = idx < activeIndex;
            const isActive = idx === activeIndex;
            return (
              <motion.div
                key={key}
                animate={{ scale: isActive ? 1.3 : 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width:  isActive ? 16 : 12,
                  height: isActive ? 16 : 12,
                  borderRadius: "50%",
                  background: isPast || isActive ? cfg.color : "var(--bg-primary)",
                  border: isPast || isActive ? `2px solid ${cfg.color}` : "2px solid var(--text-subtle)",
                  boxShadow: isActive ? `0 0 12px ${cfg.glow}` : "none",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  flexShrink: 0, zIndex: 1,
                }}
              >
                {isPast && (
                  <div className="w-full h-full flex items-center justify-center" style={{ color: "#fff", fontSize: "8px", fontWeight: 700 }}>
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
