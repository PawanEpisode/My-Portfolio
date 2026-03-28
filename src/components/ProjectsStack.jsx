/**
 * ProjectsStack — Scroll-driven stacking project viewer.
 *
 * How it works (same engine as ExperienceStack):
 *  • Extra-height wrapper + sticky inner div pinned to top:0.
 *  • All cards are absolutely stacked; each card's y / scale / opacity
 *    is driven by scrollYProgress via useTransform — no RAF, no state lag.
 *  • Past cards keep a reduced scale/opacity so they "peek" from behind
 *    the active card, reinforcing the stacking metaphor.
 *
 * New additions vs ExperienceStack:
 *  • Two-column card layout — project image (left) + details (right).
 *  • Cursor-following "Open <Project>" button on the active card.
 *    The button tracks the mouse with a spring for a smooth magnetic feel.
 *    The card itself is also an anchor so the whole card is clickable.
 */

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ─── Shared section header (mixed Syne bold + Instrument Serif italic) ── */
function SectionHeader({ label, title }) {
  const parts = title.split(/(\*[^*]+\*)/g);
  const parsed = parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="section-title-accent">{part.slice(1, -1)}</em>
    ) : (
      <span key={i}>{part}</span>
    )
  );

  return (
    <div
      className="relative px-6 pt-20 pb-12"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto relative">
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          {label}
        </motion.p>

        <div className="flex items-start justify-between gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="section-title-main"
          >
            {parsed}
          </motion.h2>
        </div>
      </div>
    </div>
  );
}

/* ─── Constants ──────────────────────────────────────────────────── */
const SCROLL_PER_CARD = 500;
const CARD_HEIGHT     = 460;

const ACCENT_COLORS = [
  { from: "#818cf8", to: "#22d3ee" },
  { from: "#22d3ee", to: "#f472b6" },
  { from: "#f472b6", to: "#a78bfa" },
  { from: "#a78bfa", to: "#818cf8" },
  { from: "#818cf8", to: "#f472b6" },
  { from: "#22d3ee", to: "#a78bfa" },
  { from: "#f472b6", to: "#22d3ee" },
  { from: "#a78bfa", to: "#818cf8" },
  { from: "#818cf8", to: "#a78bfa" },
];

/* ─── Cursor-following "Open" button (purely visual) ─────────────── */
function CursorButton({ title, accent, isVisible }) {
  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.65 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "11px 22px",
        borderRadius: 9999,
        fontWeight: 700,
        fontSize: 13,
        color: "#fff",
        background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
        boxShadow: `0 8px 32px ${accent.from}66, 0 2px 8px rgba(0,0,0,0.5)`,
        whiteSpace: "nowrap",
        pointerEvents: "none",
        userSelect: "none",
        letterSpacing: "0.01em",
      }}
    >
      Open {title}
      <ArrowUpRight size={14} strokeWidth={2.5} />
    </motion.div>
  );
}

/* ─── Project card content ───────────────────────────────────────── */
function ProjectCardContent({ project, index, isActive }) {
  const { photo, title, period, description, tags, link } = project;
  const accent   = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const cardRef  = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  /* Mouse-position motion values for the cursor button */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  /* Offset so button center aligns with cursor (approx half-dims) */
  const shiftedX = useTransform(rawX, (v) => v - 72);
  const shiftedY = useTransform(rawY, (v) => v - 22);
  const btnX = useSpring(shiftedX, { stiffness: 280, damping: 26 });
  const btnY = useSpring(shiftedY, { stiffness: 280, damping: 26 });

  const handleMouseMove = useCallback((e) => {
    if (!isActive) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  }, [isActive, rawX, rawY]);

  const handleMouseEnter = useCallback(() => {
    if (isActive) setIsHovered(true);
  }, [isActive]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  /* Sync hovered state when isActive changes */
  if (!isActive && isHovered) setIsHovered(false);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 20,
        overflow: "hidden",
        background: "rgb(10,12,26)",
        border: `1px solid ${isActive ? `${accent.from}48` : "rgba(255,255,255,0.07)"}`,
        boxShadow: isActive
          ? `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${accent.from}1a, inset 0 1px 0 rgba(255,255,255,0.06)`
          : "0 8px 24px rgba(0,0,0,0.3)",
        display: "flex",
        position: "relative",
        cursor: isHovered && isActive ? "none" : "auto",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* ── Invisible full-card anchor (active card click target) ── */}
      {isActive && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${title}`}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 15,
            cursor: isHovered ? "none" : "pointer",
          }}
        />
      )}

      {/* ── Left: project image ────────────────────────────────── */}
      <div
        style={{
          width: "42%",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.img
          src={photo}
          alt={title}
          animate={{ scale: isActive ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Color wash */}
        <motion.div
          animate={{ opacity: isActive ? 1 : 0.2 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(160deg, ${accent.from}2a, ${accent.to}16)`,
          }}
        />

        {/* Bleed gradient into card bg */}
        <div
          style={{
            position: "absolute",
            top: 0, right: 0, bottom: 0,
            width: "48%",
            background: "linear-gradient(to right, transparent, rgb(10,12,26))",
          }}
        />

        {/* "Active" badge */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.28 }}
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px",
                borderRadius: 9999,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "rgba(10,12,26,0.88)",
                border: `1px solid ${accent.from}55`,
                color: accent.from,
                backdropFilter: "blur(10px)",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  width: 5, height: 5,
                  borderRadius: "50%",
                  background: accent.from,
                  boxShadow: `0 0 8px ${accent.from}`,
                  flexShrink: 0,
                }}
              />
              Now viewing
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Right: project details ─────────────────────────────── */}
      <div
        style={{
          flex: 1,
          padding: "28px 28px 28px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Period */}
        <span
          style={{
            alignSelf: "flex-start",
            padding: "3px 10px",
            borderRadius: 9999,
            fontSize: 11,
            fontWeight: 600,
            background: `${accent.from}18`,
            border: `1px solid ${accent.from}38`,
            color: accent.from,
            letterSpacing: "0.02em",
          }}
        >
          {period}
        </span>

        {/* Title */}
        <h3
          style={{
            fontSize: "clamp(1.05rem, 1.35vw, 1.4rem)",
            fontWeight: 800,
            lineHeight: 1.25,
            color: "var(--text-primary)",
            letterSpacing: "-0.025em",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.7,
            color: "var(--text-muted)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>

        {/* Tags */}
        {tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "3px 9px",
                  borderRadius: 9999,
                  fontSize: 11,
                  fontWeight: 500,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span
                style={{
                  padding: "3px 9px",
                  borderRadius: 9999,
                  fontSize: 11,
                  color: "var(--text-subtle)",
                }}
              >
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Static link — shown only on non-active cards */}
        {!isActive && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            style={{
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "6px 14px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
              background: "transparent",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accent.from + "66";
              e.currentTarget.style.color = accent.from;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            View project <ArrowUpRight size={11} />
          </a>
        )}

        {/* Subtle hover hint — active card only */}
        {isActive && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: 11,
              color: "var(--text-subtle)",
              letterSpacing: "0.04em",
            }}
          >
            Hover &amp; click anywhere to open →
          </motion.p>
        )}
      </div>

      {/* ── Cursor-following button (visual, z-index above anchor) ── */}
      {isActive && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            x: btnX,
            y: btnY,
            pointerEvents: "none",
            zIndex: 20,
          }}
        >
          <CursorButton title={title} accent={accent} isVisible={isHovered} />
        </motion.div>
      )}
    </div>
  );
}

/* ─── Scroll-animated card wrapper ──────────────────────────────── */
function StackCard({ project, index, totalCards, scrollYProgress, isActive }) {
  /*
   * phase = 0  → card is active (centered, full size)
   * phase < 0  → future card (below viewport, not yet visible)
   * phase > 0  → past card (pushed behind / peeking from above)
   */
  const phase = useTransform(scrollYProgress, [0, 1], [-index, totalCards - index]);

  const y = useTransform(
    phase,
    [-1,     -0.05,   0,       0.75,    1.75,    3.5],
    ["80px", "80px",  "0px",   "-18px", "-34px", "-54px"]
  );

  const scale = useTransform(
    phase,
    [-1,   0,   0.75, 1.75, 3.5],
    [0.94, 1,   0.97, 0.93, 0.87]
  );

  /* Past cards remain partially visible so they peek behind the active card */
  const opacity = useTransform(
    phase,
    [-0.55, -0.15, 0, 0.9,  1.75, 2.8,  4.5],
    [0,      0.3,   1,  1,   0.5, 0.28, 0.1]
  );

  /* Later cards always render on top */
  const zIndex = (index + 1) * 10;

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        y,
        scale,
        opacity,
        transformOrigin: "top center",
        willChange: "transform, opacity",
      }}
    >
      <ProjectCardContent project={project} index={index} isActive={isActive} />
    </motion.div>
  );
}

/* ─── Desktop sticky-scroll layout ──────────────────────────────── */
function DesktopProjectsStack({ projects }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(projects.length - 1, Math.floor(v * projects.length)));
  });

  const totalHeight    = `calc(60vh + ${projects.length * SCROLL_PER_CARD}px)`;
  const activeProject  = projects[activeIndex];
  const activeAccent   = ACCENT_COLORS[activeIndex % ACCENT_COLORS.length];

  return (
    <div ref={containerRef} style={{ height: totalHeight }}>
      {/* ── Sticky viewport ─────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: '20%',
          height: "60vh",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 55% 50% at 28% 50%, rgba(129,140,248,0.06), transparent)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* ═══ LEFT PANEL — progress info only (no title) ═════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Active project thumbnail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.88, y: 10 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{   opacity: 0, scale: 0.92,  y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  borderRadius: 14,
                  overflow: "hidden",
                  border: `1px solid ${activeAccent.from}38`,
                  height: 100,
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <img
                  src={activeProject.photo}
                  alt={activeProject.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${activeAccent.from}44, ${activeAccent.to}22)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    padding: "8px 12px",
                    background: "linear-gradient(to top, rgba(10,12,26,0.95), transparent)",
                  }}
                >
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)" }}>
                    {activeProject.title}
                  </p>
                  <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 1 }}>
                    {activeProject.period}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Animated counter */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0  }}
                  exit={{   opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-gradient-static"
                  style={{ fontSize: 40, fontWeight: 900, lineHeight: 1 }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text-subtle)" }}>
                / {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            {/* Project list progress */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {projects.map((proj, idx) => {
                const isAct  = idx === activeIndex;
                const isPast = idx < activeIndex;
                const acc    = ACCENT_COLORS[idx % ACCENT_COLORS.length];
                return (
                  <motion.div
                    key={idx}
                    animate={{
                      opacity: isAct ? 1 : isPast ? 0.45 : 0.28,
                      x: isAct ? 6 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width:  isAct ? 8 : 5,
                        height: isAct ? 8 : 5,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: isAct
                          ? `linear-gradient(135deg, ${acc.from}, ${acc.to})`
                          : "var(--text-subtle)",
                        boxShadow: isAct ? `0 0 10px ${acc.from}bb` : "none",
                        transition: "all 0.3s",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: isAct ? 600 : 400,
                        color: isAct ? "var(--text-primary)" : "var(--text-muted)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 190,
                      }}
                    >
                      {proj.title}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-subtle)",
              }}
            >
              ↕ Scroll to explore
            </p>
          </div>

          {/* ═══ RIGHT PANEL — stacked cards ═════════════════════ */}
          <div style={{ position: "relative", height: CARD_HEIGHT }}>
            {projects.map((project, idx) => (
              <StackCard
                key={idx}
                project={project}
                index={idx}
                totalCards={projects.length}
                scrollYProgress={scrollYProgress}
                isActive={idx === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile: simple card list ───────────────────────────────────── */
function MobileProjectsStack({ projects, id }) {
  return (
    <section
      id={id}
      className="py-20 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
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
                display: "block",
                borderRadius: 16,
                overflow: "hidden",
                background: "rgb(10,12,26)",
                border: "1px solid var(--border)",
                textDecoration: "none",
              }}
            >
              {/* Image */}
              <div style={{ height: 180, position: "relative", overflow: "hidden" }}>
                <img
                  src={project.photo}
                  alt={project.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${accent.from}22, transparent)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: 56,
                    background: "linear-gradient(to top, rgb(10,12,26), transparent)",
                  }}
                />
              </div>

              {/* Details */}
              <div style={{ padding: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </h3>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 9999,
                      background: `${accent.from}18`,
                      border: `1px solid ${accent.from}38`,
                      color: accent.from,
                      flexShrink: 0,
                      fontWeight: 600,
                    }}
                  >
                    {project.period}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    lineHeight: 1.65,
                    marginBottom: 10,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {project.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {project.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10,
                        padding: "2px 8px",
                        borderRadius: 9999,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--border)",
                        color: "var(--text-muted)",
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

/* ─── Main export ────────────────────────────────────────────────── */
export default function ProjectsStack({ projects, id }) {
  return (
    <>
      {/* Desktop: full-width header + sticky scroll cards */}
      <div className="hidden md:block" id={id}>
        <SectionHeader label="Selected Work" title="Projects that *made an impact*" />
        <DesktopProjectsStack projects={projects} />
      </div>

      {/* Mobile: header + card list */}
      <div className="md:hidden">
        <MobileProjectsStack projects={projects} id={id} />
      </div>
    </>
  );
}
