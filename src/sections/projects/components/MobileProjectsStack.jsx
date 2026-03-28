import { motion } from "framer-motion";
import { ACCENT_COLORS } from "../constants";

/** Mobile card-list layout for the projects section. */
export default function MobileProjectsStack({ projects }) {
  return (
    <section className="py-20 px-6" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mb-12">
        <p className="section-label">Selected Work</p>
        <h2 className="section-title-main" style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}>
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
              style={{
                display: "block", borderRadius: 16, overflow: "hidden",
                background: "rgb(10,12,26)", border: "1px solid var(--border)", textDecoration: "none",
              }}
            >
              <div style={{ height: 180, position: "relative", overflow: "hidden" }}>
                <img
                  src={project.photo}
                  alt={project.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${accent.from}22, transparent)` }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 56, background: "linear-gradient(to top, rgb(10,12,26), transparent)" }} />
              </div>

              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                    {project.title}
                  </h3>
                  <span
                    style={{
                      fontSize: 10, padding: "2px 8px", borderRadius: 9999,
                      background: `${accent.from}18`, border: `1px solid ${accent.from}38`,
                      color: accent.from, flexShrink: 0, fontWeight: 600,
                    }}
                  >
                    {project.period}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: 12, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 10,
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                  }}
                >
                  {project.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {project.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10, padding: "2px 8px", borderRadius: 9999,
                        background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--text-muted)",
                      }}
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
