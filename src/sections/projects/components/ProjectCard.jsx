import { useRef, useState, useCallback } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ACCENT_COLORS } from "../constants";

/** Cursor-following "Open" pill button (visual only, no pointer events). */
function CursorButton({ title, accent, isVisible }) {
  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.65 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "11px 22px", borderRadius: 9999,
        fontWeight: 700, fontSize: 13, color: "#fff",
        background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
        boxShadow: `0 8px 32px ${accent.from}66, 0 2px 8px rgba(0,0,0,0.5)`,
        whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
        letterSpacing: "0.01em",
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
  const accent  = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawX     = useMotionValue(0);
  const rawY     = useMotionValue(0);
  const shiftedX = useTransform(rawX, (v) => v - 72);
  const shiftedY = useTransform(rawY, (v) => v - 22);
  const btnX     = useSpring(shiftedX, { stiffness: 280, damping: 26 });
  const btnY     = useSpring(shiftedY, { stiffness: 280, damping: 26 });

  const handleMouseMove = useCallback((e) => {
    if (!isActive) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }, [isActive, rawX, rawY]);

  const handleMouseEnter = useCallback(() => { if (isActive) setIsHovered(true); },  [isActive]);
  const handleMouseLeave = useCallback(() => { setIsHovered(false); }, []);

  if (!isActive && isHovered) setIsHovered(false);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%", height: "100%", borderRadius: 20, overflow: "hidden",
        background: "rgb(10,12,26)",
        border: `1px solid ${isActive ? `${accent.from}48` : "rgba(255,255,255,0.07)"}`,
        boxShadow: isActive
          ? `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accent.from}1a, inset 0 1px 0 rgba(255,255,255,0.06)`
          : "0 8px 24px rgba(0,0,0,0.3)",
        display: "flex", position: "relative",
        cursor: isHovered && isActive ? "none" : "auto",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Full-card click anchor (active only) */}
      {isActive && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${title}`}
          style={{ position: "absolute", inset: 0, zIndex: 15, cursor: isHovered ? "none" : "pointer" }}
        />
      )}

      {/* Left: project image */}
      <div style={{ width: "42%", flexShrink: 0, position: "relative", overflow: "hidden" }}>
        <motion.img
          src={photo}
          alt={title}
          animate={{ scale: isActive ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <motion.div
          animate={{ opacity: isActive ? 1 : 0.2 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(160deg, ${accent.from}2a, ${accent.to}16)`,
          }}
        />
        <div
          style={{
            position: "absolute", top: 0, right: 0, bottom: 0, width: "48%",
            background: "linear-gradient(to right, transparent, rgb(10,12,26))",
          }}
        />

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.28 }}
              style={{
                position: "absolute", top: 14, left: 14,
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "4px 10px", borderRadius: 9999,
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                background: "rgba(10,12,26,0.88)", border: `1px solid ${accent.from}55`,
                color: accent.from, backdropFilter: "blur(10px)", zIndex: 2,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: accent.from, boxShadow: `0 0 8px ${accent.from}`, flexShrink: 0 }} />
              Now viewing
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: project details */}
      <div
        style={{
          flex: 1, padding: "28px 28px 28px 14px",
          display: "flex", flexDirection: "column", gap: 14, justifyContent: "center",
          overflow: "hidden", position: "relative", zIndex: 1,
        }}
      >
        <span
          style={{
            alignSelf: "flex-start", padding: "3px 10px", borderRadius: 9999,
            fontSize: 11, fontWeight: 600,
            background: `${accent.from}18`, border: `1px solid ${accent.from}38`,
            color: accent.from, letterSpacing: "0.02em",
          }}
        >
          {period}
        </span>

        <h3 style={{ fontSize: "clamp(1.05rem, 1.35vw, 1.4rem)", fontWeight: 800, lineHeight: 1.25, color: "var(--text-primary)", letterSpacing: "-0.025em" }}>
          {title}
        </h3>

        <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text-muted)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {description}
        </p>

        {tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 9px", borderRadius: 9999, fontSize: 11, fontWeight: 500,
                  background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--text-muted)",
                }}
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span style={{ padding: "3px 9px", borderRadius: 9999, fontSize: 11, color: "var(--text-subtle)" }}>
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}

        {!isActive && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            style={{
              alignSelf: "flex-start",
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
              color: "var(--text-muted)", border: "1px solid var(--border)",
              background: "transparent", textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent.from}66`; e.currentTarget.style.color = accent.from; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            View project <ArrowUpRight size={11} />
          </a>
        )}

        {isActive && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontSize: 11, color: "var(--text-subtle)", letterSpacing: "0.04em" }}
          >
            Hover &amp; click anywhere to open →
          </motion.p>
        )}
      </div>

      {/* Cursor-following button */}
      {isActive && (
        <motion.div style={{ position: "absolute", top: 0, left: 0, x: btnX, y: btnY, pointerEvents: "none", zIndex: 20 }}>
          <CursorButton title={title} accent={accent} isVisible={isHovered} />
        </motion.div>
      )}
    </div>
  );
}
