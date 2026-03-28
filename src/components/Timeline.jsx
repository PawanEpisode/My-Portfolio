import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Building2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

/* ─── Skill chip inline toggle ───────────────────────────────────
   All chips — visible + hidden + the toggle button — are siblings
   inside ONE flex-wrap div, so expansion always flows inline.
───────────────────────────────────────────────────────────────── */
const VISIBLE_SKILL_COUNT = 6;

function SkillPill({ skill }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium cursor-default"
      style={{
        background: "rgba(129,140,248,0.08)",
        border: "1px solid rgba(129,140,248,0.18)",
        color: "var(--accent-indigo)",
        transition: "background 0.15s, transform 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(129,140,248,0.18)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(129,140,248,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {skill}
    </span>
  );
}

function SkillChips({ skills }) {
  const [expanded, setExpanded] = useState(false);
  const sorted = useMemo(() => [...skills].sort((a, b) => a.length - b.length), [skills]);
  const visible = sorted.slice(0, VISIBLE_SKILL_COUNT);
  const hidden = sorted.slice(VISIBLE_SKILL_COUNT);

  return (
    <div className="flex flex-wrap gap-1.5 mt-4">
      {visible.map((s) => <SkillPill key={s} skill={s} />)}

      {expanded && hidden.map((s) => <SkillPill key={s} skill={s} />)}

      {hidden.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          {expanded ? <><ChevronUp size={10} /> Show less</> : <><ChevronDown size={10} />+{hidden.length} more</>}
        </button>
      )}
    </div>
  );
}

/* ─── Shared card body (desktop + mobile) ────────────────────── */
function ExperienceCardBody({ item }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Company header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)" }}
        >
          {item.icon
            ? <img src={item.icon} alt={item.headTitle} className="w-full h-full object-cover" />
            : <Building2 size={18} style={{ color: "var(--text-muted)" }} />
          }
        </div>
        <div className="min-w-0">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold hover:underline"
            style={{ color: "var(--accent-indigo)" }}
          >
            {item.headTitle}
            <ExternalLink size={11} />
          </a>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
            {item.period}
          </p>
        </div>
      </div>

      {/* Role */}
      <div>
        <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
          {item.title}
        </h3>
        {item.subtitle && (
          <span
            className="inline-block text-xs px-2.5 py-1 rounded-full mt-2 font-medium"
            style={{
              background: "rgba(34,211,238,0.1)",
              border: "1px solid rgba(34,211,238,0.2)",
              color: "var(--accent-cyan)",
            }}
          >
            {item.subtitle}
          </span>
        )}
      </div>

      {/* Bullet points */}
      {item.points && (
        <ul className="space-y-2">
          {item.points.map((pt, i) => (
            <li key={i} className="flex gap-2 text-sm leading-snug">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--accent-indigo)" }}
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

/* ─── Desktop: scroll-driven sticky viewer ───────────────────── */
const CARD_SCROLL_VH = 55;

function DesktopTimeline({ items }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(Math.min(items.length - 1, Math.floor(v * items.length)));
  });

  return (
    <div ref={containerRef} style={{ height: `calc(100vh + ${items.length * CARD_SCROLL_VH}vh)` }} className="relative -mx-6">
      {/* Sticky 100vh viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 55% 50% at 28% 50%, rgba(129,140,248,0.06), transparent)",
          }}
        />

        <div className="relative z-10 h-full flex items-center px-6 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-5 gap-10 w-full items-center">

            {/* ═══ LEFT COLUMN ═══════════════════════════════════ */}
            <div className="col-span-2 flex flex-col gap-4 h-full justify-center">
              <p className="section-label">Career Path</p>

              <h2 className="text-2xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
                Experience &amp;<br />Education
              </h2>

              {/* ── Active company logo (large, animated) ── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-4"
                >
                  {/* Logo box with gradient ring */}
                  <div
                    className="relative rounded-2xl overflow-hidden flex-shrink-0"
                    style={{
                      width: 72,
                      height: 72,
                      padding: "2px",
                      background: "linear-gradient(135deg, #818cf8, #22d3ee)",
                    }}
                  >
                    <div
                      className="w-full h-full rounded-[14px] overflow-hidden flex items-center justify-center"
                      style={{ background: "var(--bg-primary)" }}
                    >
                      {items[activeIndex].icon ? (
                        <img
                          src={items[activeIndex].icon}
                          alt={items[activeIndex].headTitle}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building2 size={28} style={{ color: "var(--text-muted)" }} />
                      )}
                    </div>
                  </div>

                  {/* Company info next to logo */}
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-subtle)" }}>
                      Currently viewing
                    </p>
                    <p className="text-sm font-bold truncate mt-0.5" style={{ color: "var(--text-primary)" }}>
                      {items[activeIndex].headTitle}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>
                      {items[activeIndex].period}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Counter */}
              <div className="flex items-baseline gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="text-4xl font-black text-gradient-static"
                  >
                    {String(activeIndex + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className="text-base font-semibold" style={{ color: "var(--text-subtle)" }}>
                  / {String(items.length).padStart(2, "0")}
                </span>
              </div>

              {/* Company progress list */}
              <div className="flex flex-col gap-2">
                {items.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  const isPast   = idx < activeIndex;
                  return (
                    <motion.div
                      key={idx}
                      animate={{ opacity: isActive ? 1 : isPast ? 0.45 : 0.28, x: isActive ? 6 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2.5"
                    >
                      {/* Animated dot */}
                      <div
                        style={{
                          width:  isActive ? "8px" : "5px",
                          height: isActive ? "8px" : "5px",
                          borderRadius: "50%",
                          flexShrink: 0,
                          background: isActive
                            ? "linear-gradient(135deg, #818cf8, #22d3ee)"
                            : "var(--text-subtle)",
                          boxShadow: isActive ? "0 0 10px rgba(129,140,248,0.7)" : "none",
                          transition: "all 0.3s",
                        }}
                      />
                      {/* Company mini logo */}
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)" }}
                      >
                        {item.icon
                          ? <img src={item.icon} alt="" className="w-full h-full object-cover" />
                          : <Building2 size={10} style={{ color: "var(--text-muted)" }} />
                        }
                      </div>
                      <span
                        className="text-xs font-medium truncate"
                        style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}
                      >
                        {item.headTitle}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              <p className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-subtle)" }}>
                ↕ Scroll to explore
              </p>
            </div>

            {/* ═══ RIGHT COLUMN — animated active card ════════════ */}
            <div className="col-span-3 flex flex-col gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 48, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0,  filter: "blur(0px)" }}
                  exit={{   opacity: 0, x: -48, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl p-7"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(129,140,248,0.25)",
                    boxShadow: "0 0 48px rgba(129,140,248,0.07), inset 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                >
                  <ExperienceCardBody item={items[activeIndex]} />
                </motion.div>
              </AnimatePresence>

              {/* Progress pill dots */}
              <div className="flex gap-1.5 justify-end">
                {items.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width:  idx === activeIndex ? "22px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background:
                        idx === activeIndex
                          ? "linear-gradient(to right, #818cf8, #22d3ee)"
                          : idx < activeIndex
                          ? "rgba(129,140,248,0.4)"
                          : "var(--border)",
                      transition: "width 0.35s, background 0.35s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile: scroll-triggered vertical timeline ─────────────── */
function MobileTimeline({ items }) {
  return (
    <div className="relative">
      <div
        className="absolute left-4 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, var(--accent-indigo), var(--accent-cyan), var(--accent-pink))" }}
      />
      <div className="flex flex-col gap-6 pl-12">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
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
                top: "20px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))",
                boxShadow: "0 0 8px rgba(129,140,248,0.5)",
                transform: "translateX(-50%)",
              }}
            />
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              {/* Mobile: show full company logo prominently */}
              {item.icon && (
                <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div
                    className="rounded-xl overflow-hidden flex-shrink-0"
                    style={{
                      width: 48, height: 48,
                      border: "1px solid var(--border)",
                    }}
                  >
                    <img src={item.icon} alt={item.headTitle} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-bold hover:underline"
                      style={{ color: "var(--accent-indigo)" }}
                    >
                      {item.headTitle} <ExternalLink size={11} />
                    </a>
                    <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>{item.period}</p>
                  </div>
                </div>
              )}
              <ExperienceCardBody item={item} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────── */
export default function Timeline({ timeline, id }) {
  const items = useMemo(() => [...timeline].reverse(), [timeline]);

  return (
    <>
      {/* Desktop: scroll-driven sticky */}
      <div id={id} className="hidden md:block">
        <DesktopTimeline items={items} />
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden">
        <section
          id={id}
          className="py-20 px-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="mb-12">
            <p className="section-label">Career Path</p>
            <h2 className="text-4xl font-black" style={{ color: "var(--text-primary)" }}>
              Experience &amp; Education
            </h2>
          </div>
          <MobileTimeline items={items} />
        </section>
      </div>
    </>
  );
}
