import { motion, useTransform } from "framer-motion";
import { useStackScroll } from "../../../shared/hooks/useStackScroll";
import ExperienceCard from "./ExperienceCard";
import SectionNav from "../../../shared/components/SectionNav";
import { SCROLL_PER_CARD } from "../constants";

/** Single animated stack card wrapper driven by scrollYProgress. */
function StackCard({ item, index, totalCards, scrollYProgress, isActive }) {
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
      className="absolute inset-0 origin-top will-change-[transform,opacity]"
      style={{
        zIndex: (index + 1) * 10,
        y,
        scale,
        opacity,
        // Only the visible card should receive pointer events; every card
        // above it in z-index order would otherwise swallow clicks even when
        // it is invisible (opacity/transform do not suppress pointer events).
        pointerEvents: isActive ? "auto" : "none",
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
      <div className="sticky top-[20%] h-[60vh] overflow-hidden">
        <SectionNav prevSection="home" nextSection="projects" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_28%_50%,rgba(129,140,248,0.06),transparent)]" />

        <div className="relative z-[1] mx-auto h-full max-w-[600px] p-6">
          <div className="relative h-full max-h-[600px] w-full">
            {items.map((item, idx) => (
              <StackCard
                key={idx}
                item={item}
                index={idx}
                totalCards={items.length}
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
