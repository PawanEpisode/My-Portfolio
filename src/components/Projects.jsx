import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const ACCENT_COLORS = [
  { from: "#818cf8", to: "#22d3ee" },
  { from: "#22d3ee", to: "#f472b6" },
  { from: "#f472b6", to: "#a78bfa" },
  { from: "#a78bfa", to: "#818cf8" },
];

function ProjectCard({ project, index }) {
  const { photo, title, period, description, tags, link } = project;
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
    >
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="block rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${accent.from}44`;
          e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${accent.from}22`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: "220px" }}>
          <img
            src={photo}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Image overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, ${accent.from}22, ${accent.to}11)`,
              opacity: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24"
            style={{
              background: "linear-gradient(to top, var(--bg-secondary), transparent)",
            }}
          />
          {/* Arrow icon */}
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ArrowUpRight size={14} style={{ color: "#fff" }} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
              {title}
            </h3>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
              style={{
                background: `${accent.from}18`,
                color: accent.from,
                border: `1px solid ${accent.from}30`,
              }}
            >
              {period}
            </span>
          </div>

          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2"
            style={{ color: "var(--text-muted)" }}
          >
            {description}
          </p>

          {tags && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  {tag}
                </span>
              ))}
              {tags.length > 5 && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ color: "var(--text-subtle)" }}
                >
                  +{tags.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </a>
    </motion.div>
  );
}

export default function Projects({ projects }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((project, idx) => (
        <ProjectCard key={idx} project={project} index={idx} />
      ))}
    </div>
  );
}
