import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SkillPill from "./SkillPill";
import { VISIBLE_CHIPS } from "../constants";

/**
 * Inline expandable skill chip list.
 * Visible chips + hidden chips + toggle button are siblings in one flex-wrap
 * so expansion flows naturally in-line.
 */
export default function SkillChips({ skills }) {
  const [expanded, setExpanded] = useState(false);
  const sorted = useMemo(
    () => [...skills].sort((a, b) => a.length - b.length),
    [skills],
  );
  const visible = sorted.slice(0, VISIBLE_CHIPS);
  const hidden = sorted.slice(VISIBLE_CHIPS);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
        marginTop: "12px",
        maxHeight: "200px",
        overflow: "auto",
      }}
    >
      {visible.map((s) => (
        <SkillPill key={s} skill={s} />
      ))}
      {expanded && hidden.map((s) => <SkillPill key={s} skill={s} />)}

      {hidden.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 10px",
            borderRadius: 9999,
            fontSize: 11,
            fontWeight: 500,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
        >
          {expanded ? (
            <>
              <ChevronUp size={10} /> Show less
            </>
          ) : (
            <>
              <ChevronDown size={10} />+{hidden.length} more
            </>
          )}
        </button>
      )}
    </div>
  );
}
