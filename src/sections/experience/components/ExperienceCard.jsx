import { Building2, ExternalLink } from "lucide-react";
import SkillChips from "./SkillChips";

/** Full content rendered inside each experience stack card. */
export default function ExperienceCard({ item }) {
  return (
    <div
      className="flex h-full w-full flex-col gap-3.5 overflow-hidden rounded-[20px] border border-[rgba(129,140,248,0.22)] bg-bg-secondary p-7 backdrop-blur-[24px]"
      style={{ boxShadow: "var(--experience-card-shadow)" }}
    >
      {/* Company header */}
      <div className="flex items-center gap-3">
        <div className="h-[52px] w-[52px] flex-shrink-0 rounded-[14px] bg-gradient-to-br from-[#818cf8] to-[#22d3ee] p-0.5">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-background">
            {item.icon
              ? <img src={item.icon} alt={item.headTitle} className="h-full w-full object-cover" />
              : <Building2 size={22} className="text-muted" />
            }
          </div>
        </div>

        <div className="min-w-0">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[13px] font-bold text-accent-indigo no-underline"
          >
            {item.headTitle}
            <ExternalLink size={11} />
          </a>
          <p className="mt-0.5 text-[11px] text-muted">{item.period}</p>
        </div>
      </div>

      {/* Role title + type badge */}
      <div>
        <h3 className="text-xl font-extrabold leading-tight text-foreground">
          {item.title}
        </h3>
        {item.subtitle && (
          <span className="mt-2 inline-block rounded-full border border-[rgba(34,211,238,0.25)] bg-[rgba(34,211,238,0.1)] px-2.5 py-0.5 text-[11px] font-semibold text-accent-cyan">
            {item.subtitle}
          </span>
        )}
      </div>

      {/* Bullet points */}
      {item.points && (
        <ul className="flex flex-col gap-2">
          {item.points.map((pt, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-normal">
              <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-accent-indigo" />
              <span className="text-muted">{pt}</span>
            </li>
          ))}
        </ul>
      )}

      {item.skills && <SkillChips key={item.id} skills={item.skills} />}
    </div>
  );
}
