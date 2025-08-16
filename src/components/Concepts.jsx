import React from "react";

function chunkArray(items, chunkCount) {
  const chunks = Array.from({ length: chunkCount }, () => []);
  items.forEach((item, index) => {
    chunks[index % chunkCount].push(item);
  });
  return chunks;
}

function LoopSlider({ items, direction = "normal", duration = 32000 }) {
  // Duplicate the items to create a seamless loop
  const loopItems = [...items, ...items];

  return (
    <div
      className="loop-slider"
      style={{ "--duration": `${duration}ms`, "--direction": direction }}
    >
      <div className="inner">
        {loopItems.map((label, idx) => (
          <div
            className="tag dark:text-white bg-white dark:bg-black"
            key={`${label}-${idx}`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Concepts({ conceptTags }) {
  const tags = conceptTags || [];
  const groups = chunkArray(tags, 5);

  // Alternate directions and vary durations slightly per row for a natural feel
  const baseDuration = 32000; // ms

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group, index) => (
        <LoopSlider
          key={index}
          items={group}
          direction={index % 2 === 0 ? "reverse" : "normal"}
          duration={baseDuration - index * 1500 + (index % 2 === 0 ? 595 : 733)}
        />
      ))}
    </div>
  );
}
