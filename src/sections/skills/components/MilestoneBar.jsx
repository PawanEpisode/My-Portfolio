import { motion } from "framer-motion";
import { CATEGORY_ORDER, CATEGORY_CONFIG } from "../constants";

/** Horizontal progress bar that highlights the current skill category. */
export default function MilestoneBar({ activeIndex }) {
  const fillPercent = (activeIndex / (CATEGORY_ORDER.length - 1)) * 100;

  return (
    <div className="w-full px-2">
      <div className="relative flex w-full items-center justify-between">
        <div className="absolute z-1 left-0 right-0 top-11 h-0.5 -translate-y-1/2 rounded-full bg-border" />
        <div
          className="absolute z-1 left-0 top-11 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#818cf8] to-[#22d3ee] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${fillPercent}%` }}
        />
        {CATEGORY_ORDER.map((key, idx) => {
          const cfg = CATEGORY_CONFIG[key];
          const isActive = idx <= activeIndex;
          return (
            <div key={key} className="flex min-w-0 flex-1 flex-col items-center gap-3">
              <span
                className="truncate px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-widest transition-colors duration-[400ms]"
                style={{
                  background: isActive ? cfg.color : "var(--surface)",
                  color: isActive ? "#fff" : "var(--text-muted)",
                  borderRadius: "9999px",
                  padding: "4px 8px",
                  border: isActive ? "none" : "1px solid var(--border)",
                }}
              >
                {cfg.shortLabel}
              </span>
              <motion.div
                key={key}
                animate={{ scale: isActive ? 1.3 : 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="z-50 flex-shrink-0 rounded-full transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: isActive ? 16 : 12,
                  height: isActive ? 16 : 12,
                  background: isActive ? cfg.color : "var(--surface)",
                  border: isActive
                    ? `2px solid ${cfg.color}`
                    : "2px solid var(--border)",
                  boxShadow: isActive ? `0 0 12px ${cfg.glow}` : "none",
                }}
              >
                {isActive && (
                  <div className="flex h-full w-full items-center justify-center text-[8px] font-bold text-white">
                    ✓
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
