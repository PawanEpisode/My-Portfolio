import { motion, useTransform, AnimatePresence } from "framer-motion";
import { Building2 } from "lucide-react";
import { useStackScroll } from "../../../shared/hooks/useStackScroll";
import AnimatedCounter from "../../../shared/components/AnimatedCounter";
import ExperienceCard from "./ExperienceCard";
import { SCROLL_PER_CARD } from "../constants";

/** Single animated stack card wrapper driven by scrollYProgress. */
function StackCard({ item, index, totalCards, scrollYProgress }) {
  const phase = useTransform(scrollYProgress, [0, 1], [-index, totalCards - index]);

  const y = useTransform(
    phase,
    [-1,     -0.05,  0,       0.6,     1.5,     3],
    ["80px", "80px", "0px",   "-14px", "-24px", "-38px"]
  );
  const scale   = useTransform(phase, [-1, 0, 0.6, 1.5, 3], [0.95, 1, 0.97, 0.94, 0.88]);
  const opacity = useTransform(phase, [-0.55, -0.15, 0, 0.7, 1.1, 1.5], [0, 0.3, 1, 1, 0.2, 0]);

  return (
    <motion.div
      style={{
        position: "absolute", inset: 0, zIndex: (index + 1) * 10,
        y, scale, opacity,
        transformOrigin: "top center",
        willChange: "transform, opacity",
      }}
    >
      <ExperienceCard item={item} />
    </motion.div>
  );
}

/** Desktop sticky-scroll layout for the experience section. */
export default function DesktopExperienceStack({ items }) {
  const { containerRef, activeIndex, scrollYProgress } = useStackScroll(items.length);
  const totalHeight = `calc(60vh + ${items.length * SCROLL_PER_CARD}px)`;

  return (
    <div ref={containerRef} style={{ height: totalHeight }}>
      <div style={{ position: "sticky", top: "20%", height: "60vh", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 55% 50% at 28% 50%, rgba(129,140,248,0.06), transparent)",
          }}
        />

        <div
          style={{
            position: "relative", zIndex: 1, height: "100%",
            maxWidth: 1200, margin: "0 auto", padding: "0 24px",
            display: "grid", gridTemplateColumns: "2fr 3fr",
            gap: 48, alignItems: "center",
          }}
        >
          {/* LEFT — progress info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.82, y: 10 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{   opacity: 0, scale: 0.88,  y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", alignItems: "center", gap: 14 }}
              >
                <div
                  style={{
                    width: 76, height: 76, borderRadius: 20, padding: 3,
                    background: "linear-gradient(135deg, #818cf8, #22d3ee)", flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: "100%", height: "100%", borderRadius: 17, overflow: "hidden",
                      background: "var(--bg-primary)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {items[activeIndex].icon ? (
                      <img src={items[activeIndex].icon} alt={items[activeIndex].headTitle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <Building2 size={30} style={{ color: "var(--text-muted)" }} />
                    )}
                  </div>
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
                    Currently viewing
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginTop: 3 }}>
                    {items[activeIndex].headTitle}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                    {items[activeIndex].period}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatedCounter current={activeIndex + 1} total={items.length} />

            {/* Company progress list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;
                const isPast   = idx < activeIndex;
                return (
                  <motion.div
                    key={idx}
                    animate={{ opacity: isActive ? 1 : isPast ? 0.45 : 0.28, x: isActive ? 6 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width:  isActive ? 8 : 5, height: isActive ? 8 : 5,
                        borderRadius: "50%", flexShrink: 0,
                        background: isActive ? "linear-gradient(135deg, #818cf8, #22d3ee)" : "var(--text-subtle)",
                        boxShadow: isActive ? "0 0 10px rgba(129,140,248,0.7)" : "none",
                        transition: "all 0.3s",
                      }}
                    />
                    <div
                      style={{
                        width: 20, height: 20, borderRadius: 6, overflow: "hidden", flexShrink: 0,
                        background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      {item.icon
                        ? <img src={item.icon} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <Building2 size={10} style={{ color: "var(--text-muted)" }} />
                      }
                    </div>
                    <span
                      style={{
                        fontSize: 12, fontWeight: 500,
                        color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}
                    >
                      {item.headTitle}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
              ↕ Scroll to explore
            </p>
          </div>

          {/* RIGHT — stacked cards */}
          <div style={{ position: "relative", height: 480 }}>
            {items.map((item, idx) => (
              <StackCard
                key={idx}
                item={item}
                index={idx}
                totalCards={items.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
