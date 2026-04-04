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
    <div className="mt-3 flex max-h-[200px] flex-wrap gap-1.5 overflow-auto">
      {visible.map((s) => (
        <SkillPill key={s} skill={s} />
      ))}
      {expanded && hidden.map((s) => <SkillPill key={s} skill={s} />)}

      {hidden.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted transition-[border-color] duration-200 hover:border-border-hover"
          style={{ background: "var(--tag-pill-bg)" }}
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
