import { motion } from "framer-motion";
import { ACCENT_COLORS } from "../constants";

/** Mobile card-list layout for the projects section. */
export default function MobileProjectsStack({ projects }) {
  return (
    <section className="border-t border-border px-4 pb-20 pt-24 min-[360px]:px-6">
      <div className="mb-12 min-w-0">
        <p className="section-label">Selected Work</p>
        <h2 className="section-title-main">
          Projects that{" "}
          <em className="section-title-accent">made an impact</em>
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        {projects.map((project, idx) => {
          const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length];
          return (
            <motion.a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="block overflow-hidden rounded-2xl border border-border bg-bg-secondary no-underline"
            >
              <div className="relative h-[180px] overflow-hidden">
                <img
                  src={project.photo}
                  alt={project.title}
                  className="block h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${accent.from}22, transparent)` }}
                />
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-bg-secondary to-transparent" />
              </div>

              <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold leading-snug text-foreground">
                    {project.title}
                  </h3>
                  <span
                    className="flex-shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      background: `${accent.from}18`,
                      borderColor: `${accent.from}38`,
                      color: accent.from,
                    }}
                  >
                    {project.period}
                  </span>
                </div>

                <p className="mb-2.5 line-clamp-2 text-xs leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {project.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted"
                      style={{ background: "var(--tag-pill-bg)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
