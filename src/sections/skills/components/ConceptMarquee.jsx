import { motion } from "framer-motion";

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
          <span key={`${label}-${idx}`} className="concept-tag">{label}</span>
        ))}
      </div>
    </div>
  );
}

/** Horizontally scrolling marquee of concept/topic tags. */
export default function ConceptMarquee({ conceptTags }) {
  if (!conceptTags?.length) return null;

  const conceptGroups = chunkArray(conceptTags, 4);
  const baseDuration  = 50000;

  return (
    <div className="border-t border-border px-6 py-14">
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
              duration={baseDuration - idx * 500 + (idx % 2 === 0 ? 100 : 300)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
