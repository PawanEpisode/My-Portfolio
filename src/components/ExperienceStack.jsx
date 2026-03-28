/**
 * ExperienceStack — Scroll-driven stacking card viewer.
 *
 * How it works:
 *  • The wrapper div has extra height (100vh + N × SCROLL_PER_CARD px).
 *  • An inner div is `position:sticky; top:0; height:100vh; overflow:hidden`.
 *  • All N cards are absolutely stacked in the same position inside that sticky viewport.
 *  • Each card's translateY / scale / opacity is driven directly by scrollYProgress
 *    via useTransform — no state, no RAF, no spring lag; frame-perfect.
 *
 * Card lifecycle (phase = 0 means "card is perfectly centered / active"):
 *  phase < -0.5 → invisible, below viewport (future card)
 *  phase  -0.5 → 0  → entering: slides up from below, fades in
 *  phase   0        → active: full opacity, scale 1, centered
 *  phase   0 → 1   → exiting: shrinks, moves up slightly, fades — covered by next card
 *  phase > 1       → deep past: tiny, very faint, peeking far above
 *
 * Z-index rule: later cards (higher array index) get a higher z-index so they
 * naturally slide ON TOP of earlier cards, matching the "overlap" behaviour.
 */

import { useRef, useMemo, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Building2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

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

/* ─── Scroll space allocated per card (in pixels) ──────────────── */
const SCROLL_PER_CARD = 550;

/* ─── Inline chip toggle (all chips in one flex row) ─────────────
   Same pattern as Timeline: visible + hidden chips + toggle button
   are siblings inside one flex-wrap so expansion flows inline.
───────────────────────────────────────────────────────────────── */
const VISIBLE_CHIPS = 6;

function SkillPill({ skill }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 9999,
        fontSize: 11,
        fontWeight: 500,
        background: "rgba(129,140,248,0.09)",
        border: "1px solid rgba(129,140,248,0.2)",
        color: "var(--accent-indigo)",
        cursor: "default",
        transition: "background 0.15s",
      }}
    >
      {skill}
    </span>
  );
}

function SkillChips({ skills }) {
  const [expanded, setExpanded] = useState(false);
  const sorted = useMemo(() => [...skills].sort((a, b) => a.length - b.length), [skills]);
  const visible = sorted.slice(0, VISIBLE_CHIPS);
  const hidden  = sorted.slice(VISIBLE_CHIPS);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
      {visible.map((s) => <SkillPill key={s} skill={s} />)}
      {expanded && hidden.map((s) => <SkillPill key={s} skill={s} />)}
      {hidden.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 10px",
            borderRadius: 9999,
            fontSize: 11,
            fontWeight: 500,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
        >
          {expanded
            ? <><ChevronUp size={10} /> Show less</>
            : <><ChevronDown size={10} />+{hidden.length} more</>}
        </button>
      )}
    </div>
  );
}

/* ─── Card content ────────────────────────────────────────────── */
function CardContent({ item }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        padding: "28px",
        background: "rgb(10,12,26)",
        border: "1px solid rgba(129,140,248,0.22)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        overflow: "hidden",
      }}
    >
      {/* Company header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            padding: 2,
            background: "linear-gradient(135deg, #818cf8, #22d3ee)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 12,
              overflow: "hidden",
              background: "var(--bg-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 13,
              fontWeight: 700,
              color: "var(--accent-indigo)",
              textDecoration: "none",
            }}
          >
            {item.headTitle}
            <ExternalLink size={11} />
          </a>
          <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{item.period}</p>
        </div>
      </div>

      {/* Role */}
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.25 }}>
          {item.title}
        </h3>
        {item.subtitle && (
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              padding: "3px 10px",
              borderRadius: 9999,
              marginTop: 8,
              fontWeight: 600,
              background: "rgba(34,211,238,0.1)",
              border: "1px solid rgba(34,211,238,0.25)",
              color: "var(--accent-cyan)",
            }}
          >
            {item.subtitle}
          </span>
        )}
      </div>

      {/* Bullet points — max 3 */}
      {item.points && (
        <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {item.points.slice(0, 3).map((pt, i) => (
            <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, lineHeight: 1.5 }}>
              <span
                style={{
                  marginTop: 7,
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: "var(--accent-indigo)",
                }}
              />
              <span style={{ color: "var(--text-muted)" }}>{pt}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Skills */}
      {item.skills && <SkillChips skills={item.skills} />}
    </div>
  );
}

/* ─── Individual animated card ────────────────────────────────── */
function StackCard({ item, index, totalCards, scrollYProgress }) {
  /*
   * Phase drives everything:
   *   < 0  → future (haven't arrived yet)
   *     0  → active (centered, full size)
   *   > 0  → past   (covered by later card)
   *
   * useTransform maps scrollYProgress [0,1] to
   * [-index, totalCards - index] so that phase = 0
   * occurs exactly at scrollYProgress = index / totalCards.
   */
  const phase = useTransform(scrollYProgress, [0, 1], [-index, totalCards - index]);

  /* Slide in from below → active → shrink & push behind */
  const y = useTransform(
    phase,
    [-1,     -0.05,   0,      0.6,    1.5,    3],
    ["80px", "80px",  "0px",  "-14px","-24px","-38px"]
  );

  const scale = useTransform(
    phase,
    [-1,   0,   0.6,  1.5,  3],
    [0.95, 1,   0.97, 0.94, 0.88]
  );

  /* Opacity: invisible while far below, full while active, fades to 0 once behind */
  const opacity = useTransform(
    phase,
    [-0.55, -0.15, 0, 0.7, 1.1, 1.5],
    [0,      0.3,   1,  1,  0.2, 0]
  );

  /*
   * Later cards get a higher static z-index so they slide ON TOP
   * of earlier cards — matching the "overlap" effect.
   */
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
      <CardContent item={item} />
    </motion.div>
  );
}

/* ─── Desktop layout ──────────────────────────────────────────── */
function DesktopStack({ items }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Track active card for the left-panel UI */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(items.length - 1, Math.floor(v * items.length)));
  });

  const totalHeight = `calc(60vh + ${items.length * SCROLL_PER_CARD}px)`;

  return (
    <div ref={containerRef} style={{ height: totalHeight }}>
      {/* ─── Sticky viewport ─────────────────────────────────── */}
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
          {/* ═══ LEFT — progress info only (no section title) ═══ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* ── Large animated active logo ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.82, y: 10 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                exit={{   opacity: 0, scale: 0.88,  y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", alignItems: "center", gap: 14 }}
              >
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 20,
                    padding: 3,
                    background: "linear-gradient(135deg, #818cf8, #22d3ee)",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 17,
                      overflow: "hidden",
                      background: "var(--bg-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {items[activeIndex].icon ? (
                      <img
                        src={items[activeIndex].icon}
                        alt={items[activeIndex].headTitle}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <Building2 size={30} style={{ color: "var(--text-muted)" }} />
                    )}
                  </div>
                </div>

                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
                    Currently viewing
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginTop: 3 }}>
                    {items[activeIndex].headTitle}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                    {items[activeIndex].period}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Counter */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{   opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-gradient-static"
                  style={{ fontSize: 40, fontWeight: 900, lineHeight: 1 }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text-subtle)" }}>
                / {String(items.length).padStart(2, "0")}
              </span>
            </div>

            {/* Company progress list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map((item, idx) => {
                const isActive = idx === activeIndex;
                const isPast   = idx < activeIndex;
                return (
                  <motion.div
                    key={idx}
                    animate={{
                      opacity: isActive ? 1 : isPast ? 0.45 : 0.28,
                      x: isActive ? 6 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width:  isActive ? 8 : 5,
                        height: isActive ? 8 : 5,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: isActive
                          ? "linear-gradient(135deg, #818cf8, #22d3ee)"
                          : "var(--text-subtle)",
                        boxShadow: isActive ? "0 0 10px rgba(129,140,248,0.7)" : "none",
                        transition: "all 0.3s",
                      }}
                    />
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        overflow: "hidden",
                        flexShrink: 0,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid var(--border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon
                        ? <img src={item.icon} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <Building2 size={10} style={{ color: "var(--text-muted)" }} />
                      }
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.headTitle}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-subtle)" }}>
              ↕ Scroll to explore
            </p>
          </div>

          {/* ═══ RIGHT — stacked cards ═══════════════════════════ */}
          <div style={{ position: "relative", height: 480 }}>
            {items.map((item, idx) => (
              <StackCard
                key={idx}
                item={item}
                index={idx}
                totalCards={items.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile: vertical scroll timeline ───────────────────────── */
function MobileStack({ items, id }) {
  return (
    <section
      id={id}
      className="py-20 px-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mb-12">
        <p className="section-label">Career Path</p>
        <h2 className="section-title-main" style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}>
          Where I&apos;ve{" "}
          <em className="section-title-accent">shipped</em>
          {" "}things
        </h2>
      </div>

      <div className="relative">
        {/* Gradient line */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, var(--accent-indigo), var(--accent-cyan), var(--accent-pink))" }}
        />

        <div className="flex flex-col gap-6 pl-12">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-32px",
                  top: "22px",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))",
                  boxShadow: "0 0 8px rgba(129,140,248,0.5)",
                  transform: "translateX(-50%)",
                }}
              />
              <div style={{ borderRadius: 16, padding: 20, background: "var(--surface)", border: "1px solid var(--border)" }}>
                <CardContent item={item} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main export ─────────────────────────────────────────────── */
export default function ExperienceStack({ timeline, id }) {
  const items = useMemo(() => [...timeline].reverse(), [timeline]);

  return (
    <>
      {/* Desktop: full-width header + sticky scroll cards */}
      <div className="hidden md:block" id={id}>
        <SectionHeader label="Experience" title="Where I've *shipped* things" />
        <DesktopStack items={items} />
      </div>

      {/* Mobile: header + timeline */}
      <div className="md:hidden">
        <MobileStack items={items} id={id} />
      </div>
    </>
  );
}
