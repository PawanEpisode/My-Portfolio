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
  const wrapRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawX     = useMotionValue(0);
  const rawY     = useMotionValue(0);
  const shiftedX = useTransform(rawX, (v) => v - 72);
  const shiftedY = useTransform(rawY, (v) => v - 22);
  const btnX     = useSpring(shiftedX, { stiffness: 280, damping: 26 });
  const btnY     = useSpring(shiftedY, { stiffness: 280, damping: 26 });

  const handleMouseMove = useCallback((e) => {
    if (!isActive) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }, [isActive, rawX, rawY]);

  const handleMouseEnter = useCallback(() => { if (isActive) setIsHovered(true); },  [isActive]);
  const handleMouseLeave = useCallback(() => { setIsHovered(false); }, []);

  if (!isActive && isHovered) setIsHovered(false);

  return (
    // Outer wrapper: no overflow:hidden so the cursor button can roam freely
    // across the full card area without being clipped.
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%", height: "100%", position: "relative",
        cursor: isHovered && isActive ? "none" : "auto",
      }}
    >
      {/* Visible card with rounded corners + clipped content */}
      <div
        style={{
          width: "100%", height: "100%", borderRadius: 20, overflow: "hidden",
          background: "rgb(10,12,26)",
          border: `1px solid ${isActive ? `${accent.from}48` : "rgba(255,255,255,0.07)"}`,
          boxShadow: isActive
            ? `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accent.from}1a, inset 0 1px 0 rgba(255,255,255,0.06)`
            : "0 8px 24px rgba(0,0,0,0.3)",
          display: "flex", position: "relative",
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
        <div style={{ width: "70%", flexShrink: 0, position: "relative", overflow: "hidden" }}>
          <motion.img
            src={photo}
            alt={title}
            animate={{ scale: isActive ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%", height: "100%", objectFit: "fill", display: "block" }}
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
              {tags.map((tag) => (
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
            </div>
          )}
        </div>
      </div>

      {/* Cursor-following button — lives on the outer wrapper (no overflow:hidden)
          so it can freely follow the cursor across the full card area. */}
      {isActive && (
        <motion.div
          style={{
            position: "absolute", top: 0, left: 0,
            x: btnX, y: btnY,
            pointerEvents: "none", zIndex: 20,
          }}
        >
          <CursorButton title={title} accent={accent} isVisible={isHovered} />
        </motion.div>
      )}
    </div>
  );
}
