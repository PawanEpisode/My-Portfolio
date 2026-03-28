import { motion, useTransform } from "framer-motion";
import { useStackScroll } from "../../../shared/hooks/useStackScroll";
import ProjectCard from "./ProjectCard";
import { SCROLL_PER_CARD } from "../constants";

/** Single animated stack card wrapper driven by scrollYProgress. */
function StackCard({ project, index, totalCards, scrollYProgress, isActive }) {
  const phase = useTransform(
    scrollYProgress,
    [0, 1],
    [-index, totalCards - index],
  );

  const y = useTransform(
    phase,
    [-1, -0.05, 0, 0.75, 1.75, 3.5],
    ["80px", "80px", "0px", "-18px", "-34px", "-54px"],
  );
  const scale = useTransform(
    phase,
    [-1, 0, 0.75, 1.75, 3.5],
    [0.94, 1, 0.97, 0.93, 0.87],
  );
  const opacity = useTransform(
    phase,
    [-0.55, -0.15, 0, 0.9, 1.75, 2.8, 4.5],
    [0, 0.3, 1, 1, 0.5, 0.28, 0.1],
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: (index + 1) * 10,
        y,
        scale,
        opacity,
        transformOrigin: "top center",
        willChange: "transform, opacity",
        // Non-active cards have higher z-index than cards below them and
        // would intercept mouse events even at zero opacity without this.
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <ProjectCard project={project} index={index} isActive={isActive} />
    </motion.div>
  );
}

/** Desktop sticky-scroll layout for the projects section. */
export default function DesktopProjectsStack({ projects }) {
  const { containerRef, activeIndex, scrollYProgress } = useStackScroll(
    projects.length,
  );
  const totalHeight = `calc(60vh + ${projects.length * SCROLL_PER_CARD}px)`;

  return (
    <div ref={containerRef} style={{ height: totalHeight }}>
      <div
        style={{
          position: "sticky",
          top: "20%",
          height: "60vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 55% 50% at 28% 50%, rgba(129,140,248,0.06), transparent)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "24px",
          }}
        >
          <div style={{ position: "relative", height: '100%', width: '100%' }}>
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
