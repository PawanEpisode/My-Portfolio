import { motion, useTransform, AnimatePresence } from "framer-motion";
import { useStackScroll } from "../../../shared/hooks/useStackScroll";
import AnimatedCounter from "../../../shared/components/AnimatedCounter";
import ProjectCard from "./ProjectCard";
import { SCROLL_PER_CARD, CARD_HEIGHT, ACCENT_COLORS } from "../constants";

/** Single animated stack card wrapper driven by scrollYProgress. */
function StackCard({ project, index, totalCards, scrollYProgress, isActive }) {
  const phase = useTransform(scrollYProgress, [0, 1], [-index, totalCards - index]);

  const y = useTransform(
    phase,
    [-1,     -0.05,  0,       0.75,    1.75,    3.5],
    ["80px", "80px", "0px",   "-18px", "-34px", "-54px"]
  );
  const scale   = useTransform(phase, [-1, 0, 0.75, 1.75, 3.5], [0.94, 1, 0.97, 0.93, 0.87]);
  const opacity = useTransform(phase, [-0.55, -0.15, 0, 0.9, 1.75, 2.8, 4.5], [0, 0.3, 1, 1, 0.5, 0.28, 0.1]);

  return (
    <motion.div
      style={{
        position: "absolute", inset: 0, zIndex: (index + 1) * 10,
        y, scale, opacity,
        transformOrigin: "top center",
        willChange: "transform, opacity",
      }}
    >
      <ProjectCard project={project} index={index} isActive={isActive} />
    </motion.div>
  );
}

/** Desktop sticky-scroll layout for the projects section. */
export default function DesktopProjectsStack({ projects }) {
  const { containerRef, activeIndex, scrollYProgress } = useStackScroll(projects.length);
  const totalHeight   = `calc(60vh + ${projects.length * SCROLL_PER_CARD}px)`;
  const activeProject = projects[activeIndex];
  const activeAccent  = ACCENT_COLORS[activeIndex % ACCENT_COLORS.length];

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
                initial={{ opacity: 0, scale: 0.88, y: 10 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{   opacity: 0, scale: 0.92,  y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  borderRadius: 14, overflow: "hidden",
                  border: `1px solid ${activeAccent.from}38`,
                  height: 100, position: "relative", flexShrink: 0,
                }}
              >
                <img src={activeProject.photo} alt={activeProject.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${activeAccent.from}44, ${activeAccent.to}22)` }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 12px", background: "linear-gradient(to top, rgba(10,12,26,0.95), transparent)" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>{activeProject.title}</p>
                  <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 1 }}>{activeProject.period}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatedCounter current={activeIndex + 1} total={projects.length} />

            {/* Project progress list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {projects.map((proj, idx) => {
                const isAct  = idx === activeIndex;
                const isPast = idx < activeIndex;
                const acc    = ACCENT_COLORS[idx % ACCENT_COLORS.length];
                return (
                  <motion.div
                    key={idx}
                    animate={{ opacity: isAct ? 1 : isPast ? 0.45 : 0.28, x: isAct ? 6 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width:  isAct ? 8 : 5, height: isAct ? 8 : 5,
                        borderRadius: "50%", flexShrink: 0,
                        background: isAct ? `linear-gradient(135deg, ${acc.from}, ${acc.to})` : "var(--text-subtle)",
                        boxShadow: isAct ? `0 0 10px ${acc.from}bb` : "none",
                        transition: "all 0.3s",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12, fontWeight: isAct ? 600 : 400,
                        color: isAct ? "var(--text-primary)" : "var(--text-muted)",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 190,
                      }}
                    >
                      {proj.title}
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
          <div style={{ position: "relative", height: CARD_HEIGHT }}>
            {projects.map((project, idx) => (
              <StackCard
                key={idx}
                project={project}
                index={idx}
                totalCards={projects.length}
                scrollYProgress={scrollYProgress}
                isActive={idx === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
