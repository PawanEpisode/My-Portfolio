import { Building2, ExternalLink } from "lucide-react";
import SkillChips from "./SkillChips";

/** Full content rendered inside each experience stack card. */
export default function ExperienceCard({ item }) {
  return (
    <div
      style={{
        width: "100%", height: "100%", borderRadius: "20px", padding: "28px",
        background: "rgb(10,12,26)",
        border: "1px solid rgba(129,140,248,0.22)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
        display: "flex", flexDirection: "column", gap: "14px",
        overflow: "hidden",
      }}
    >
      {/* Company header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 52, height: 52, borderRadius: 14, padding: 2,
            background: "linear-gradient(135deg, #818cf8, #22d3ee)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "100%", height: "100%", borderRadius: 12, overflow: "hidden",
              background: "var(--bg-primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {item.icon
              ? <img src={item.icon} alt={item.headTitle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <Building2 size={22} style={{ color: "var(--text-muted)" }} />
            }
          </div>
        </div>

        <div style={{ minWidth: 0 }}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 13, fontWeight: 700,
              color: "var(--accent-indigo)", textDecoration: "none",
            }}
          >
            {item.headTitle}
            <ExternalLink size={11} />
          </a>
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{item.period}</p>
        </div>
      </div>

      {/* Role title + type badge */}
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.25 }}>
          {item.title}
        </h3>
        {item.subtitle && (
          <span
            style={{
              display: "inline-block", fontSize: 11, padding: "3px 10px", borderRadius: 9999,
              marginTop: 8, fontWeight: 600,
              background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)",
              color: "var(--accent-cyan)",
            }}
          >
            {item.subtitle}
          </span>
        )}
      </div>

      {/* Bullet points */}
      {item.points && (
        <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {item.points.map((pt, i) => (
            <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, lineHeight: 1.5 }}>
              <span
                style={{
                  marginTop: 7, width: 5, height: 5, borderRadius: "50%",
                  flexShrink: 0, background: "var(--accent-indigo)",
                }}
              />
              <span style={{ color: "var(--text-muted)" }}>{pt}</span>
            </li>
          ))}
        </ul>
      )}

      {item.skills && <SkillChips key={item.id} skills={item.skills} />}
    </div>
  );
}
