import { ACCENT_COLORS } from "../constants";
import { motion } from "framer-motion";

const MobileProjectCard = ({ project, index }) => {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  return (
    <motion.a
      key={index}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="block rounded-2xl border border-border bg-bg-secondary no-underline min-w-[300px]"
    >
      <div className="relative h-[180px] rounded-2xl">
        <img
          src={project.photo}
          alt={project.title}
          className="block h-full w-full object-cover rounded-t-2xl"
        />
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${accent.from}22, transparent)`,
          }}
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
};

export default MobileProjectCard;
