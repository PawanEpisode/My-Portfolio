import { useRef, useState, useCallback } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ACCENT_COLORS } from "../constants";

/** Cursor-following "Open" pill button (visual only, no pointer events). */
function CursorButton({ title, accent, isVisible }) {
  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.65 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="pointer-events-none inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full px-[22px] py-[11px] text-[13px] font-bold tracking-wide text-white"
      style={{
        background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
        boxShadow: `0 8px 32px ${accent.from}66, 0 2px 8px rgba(0,0,0,0.5)`,
      }}
    >
      Open {title}
      <ArrowUpRight size={14} strokeWidth={2.5} />
    </motion.div>
  );
}

/** Full project card content with cursor-following button and hover state. */
export default function ProjectCard({ project, index, isActive }) {
  const { photo, title, period, description, tags, link } = project;
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const shiftedX = useTransform(rawX, (v) => v - 72);
  const shiftedY = useTransform(rawY, (v) => v - 22);
  const btnX = useSpring(shiftedX, { stiffness: 280, damping: 26 });
  const btnY = useSpring(shiftedY, { stiffness: 280, damping: 26 });

  const handleMouseMove = useCallback(
    (e) => {
      if (!isActive) return;
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    },
    [isActive, rawX, rawY]
  );

  const handleMouseEnter = useCallback(() => {
    if (isActive) setIsHovered(true);
  }, [isActive]);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  if (!isActive && isHovered) setIsHovered(false);

  const cardBorder = isActive ? `${accent.from}48` : "var(--border)";
  const cardShadow = isActive
    ? `0 32px 80px var(--project-card-shadow-drop), 0 0 0 1px ${accent.from}1a, inset 0 1px 0 var(--project-card-inset)`
    : "var(--project-card-shadow-idle)";

  return (
    // Outer wrapper: no overflow:hidden so the cursor button can roam freely
    // across the full card area without being clipped.
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-full w-full"
      style={{ cursor: isHovered && isActive ? "none" : "auto" }}
    >
      {/* Visible card with rounded corners + clipped content */}
      <div
        className="relative flex h-full w-full overflow-hidden rounded-[20px] bg-bg-secondary transition-[border-color,box-shadow] duration-[400ms] ease-out"
        style={{
          border: `1px solid ${cardBorder}`,
          boxShadow: cardShadow,
        }}
      >
        {/* Full-card click anchor (active only) */}
        {isActive && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${title}`}
            className="absolute inset-0 z-[15]"
            style={{ cursor: isHovered ? "none" : "pointer" }}
          />
        )}

        {/* Left: project image */}
        <div className="relative w-[70%] flex-shrink-0 overflow-hidden">
          <motion.img
            src={photo}
            alt={title}
            animate={{ scale: isActive ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block h-full w-full object-fill"
          />
          <motion.div
            animate={{ opacity: isActive ? 1 : 0.2 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${accent.from}2a, ${accent.to}16)`,
            }}
          />
          <div className="absolute inset-y-0 right-0 w-[48%] bg-gradient-to-r from-transparent to-bg-secondary" />
        </div>

        {/* Right: project details */}
        <div className="relative z-[1] flex flex-1 flex-col justify-center gap-3.5 overflow-hidden py-7 pl-3.5 pr-7">
          <span
            className="self-start rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide"
            style={{
              background: `${accent.from}18`,
              borderColor: `${accent.from}38`,
              color: accent.from,
            }}
          >
            {period}
          </span>

          <h3 className="text-[clamp(1.05rem,1.35vw,1.4rem)] font-extrabold leading-tight tracking-[-0.025em] text-foreground">
            {title}
          </h3>

          <p className="line-clamp-3 text-[13px] leading-[1.7] text-muted">
            {description}
          </p>

          {tags && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 text-[11px] font-medium text-muted"
                  style={{ background: "var(--tag-pill-bg)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cursor-following button — lives on the outer wrapper (no overflow:hidden)
          so it can freely follow the cursor across the full card area. */}
      {isActive && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-20"
          style={{ x: btnX, y: btnY }}
        >
          <CursorButton title={title} accent={accent} isVisible={isHovered} />
        </motion.div>
      )}
    </div>
  );
}
