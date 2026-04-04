import { DEVICON_MAP } from "../constants";

/** Single skill pill with optional devicon and themed color. */
export default function SkillTag({ skill, color, bg, border, isActive }) {
  const iconClass = DEVICON_MAP[skill];
  const pillColor = isActive
    ? color ?? "var(--text-primary)"
    : "var(--text-muted)";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        background: isActive ? bg : "var(--surface)",
        border: `1px solid ${isActive ? border : "var(--border)"}`,
        color: pillColor,
      }}
    >
      {iconClass && (
        <i className={`${iconClass} inline-block shrink-0 text-[13px] leading-none not-italic`} aria-hidden />
      )}
      {skill}
    </span>
  );
}
