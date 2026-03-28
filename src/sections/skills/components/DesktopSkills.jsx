import { useStackScroll } from "../../../shared/hooks/useStackScroll";
import { CATEGORY_ORDER, SKILL_SCROLL_VH } from "../constants";
import MilestoneBar from "./MilestoneBar";
import CategoryCard from "./CategoryCard";
import SectionNav from "../../../shared/components/SectionNav";

/** Desktop sticky-scroll layout for the skills section. */
export default function DesktopSkills({ skillValues }) {
  const { containerRef, activeIndex } = useStackScroll(CATEGORY_ORDER.length);

  return (
    <div
      ref={containerRef}
      style={{
        height: `calc(60vh + ${CATEGORY_ORDER.length * SKILL_SCROLL_VH}vh)`,
      }}
      className="relative"
    >
      <div className="sticky top-[5%] overflow-hidden">
        <SectionNav prevSection="projects" nextSection="certificates" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 28% 50%, rgba(129,140,248,0.05), transparent)",
          }}
        />

        <div
          className="relative z-10 h-full flex flex-col px-6 max-w-6xl mx-auto w-full"
          style={{ paddingTop: "80px", paddingBottom: "32px" }}
        >
          <div className="flex gap-10 w-full items-start mb-8">
            <MilestoneBar activeIndex={activeIndex} />
          </div>

          {/* Cards grid */}
          <div className="w-full flex gap-3 flex-1 items-start justify-between">
            {CATEGORY_ORDER.map((key, idx) => {
              const state = idx <= activeIndex ? "active" : "future";
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
