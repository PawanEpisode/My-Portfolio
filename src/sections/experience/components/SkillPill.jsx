/** Single skill tag pill used inside experience cards. */
export default function SkillPill({ skill }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 9999,
        fontSize: 11,
        fontWeight: 500,
        background: "rgba(129,140,248,0.09)",
        border: "1px solid rgba(129,140,248,0.2)",
        color: "var(--accent-indigo)",
        cursor: "default",
        transition: "background 0.15s",
      }}
    >
      {skill}
    </span>
  );
}
