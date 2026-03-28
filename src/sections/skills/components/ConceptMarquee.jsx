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
  const baseDuration  = 28000;

  return (
    <div className="py-14 px-6" style={{ borderTop: "1px solid var(--border)" }}>
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
              duration={baseDuration - idx * 2000 + (idx % 2 === 0 ? 600 : 900)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
