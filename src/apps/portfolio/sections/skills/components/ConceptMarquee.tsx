import type { CSSProperties } from "react";
import { motion } from "framer-motion";

function chunkArray<T>(arr: T[], count: number): T[][] {
  const chunks: T[][] = Array.from({ length: count }, () => []);
  arr.forEach((item, i) => {
    chunks[i % count]?.push(item);
  });
  return chunks;
}

function LoopSlider({
  items,
  direction = "normal",
  duration = 30000,
}: {
  items: string[];
  direction?: "normal" | "reverse";
  duration?: number;
}) {
  const loopItems = [...items, ...items];
  const sliderStyle = {
    "--duration": `${duration}ms`,
    "--direction": direction,
  } as CSSProperties;

  return (
    <div className="loop-slider" style={sliderStyle}>
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

/** Horizontally scrolling marquee of concept/topic tags. */
export default function ConceptMarquee({ conceptTags }: { conceptTags: string[] }) {
  if (!conceptTags?.length) return null;

  const conceptGroups = chunkArray(conceptTags, 4);
  const baseDuration = 50000;

  return (
    <div className="border-t border-border px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6 w-full text-center"
        >
          Concepts &amp; Topics
        </motion.p>
        <div className="flex flex-col gap-3">
          {conceptGroups.map((group, idx) => (
            <LoopSlider
              key={idx}
              items={group}
              direction={idx % 2 === 0 ? "normal" : "reverse"}
              duration={baseDuration - idx * 500 + (idx % 2 === 0 ? 100 : 300)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
