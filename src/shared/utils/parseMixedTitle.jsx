/**
 * Converts "Some *italic* title text" into an array of React nodes
 * where text wrapped in *asterisks* becomes <em className="section-title-accent">.
 *
 * Used by Section and SectionHeader to render mixed bold + italic titles.
 */
export function parseMixedTitle(title) {
  const parts = title.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="section-title-accent">
        {part.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
