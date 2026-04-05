import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../../../../shared/components/ui/button";
import { FRONTEND_HERO } from "../../data/homeCopy";

export interface FrontendHeroSectionProps {
  onScrollToHub: () => void;
  onContact: () => void;
}

/** Perspective-style grid funnel + centered headline; accents use design tokens (indigo / cyan). */
export default function FrontendHeroSection({
  onScrollToHub,
  onContact,
}: FrontendHeroSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[min(88vh,820px)] flex-col items-center justify-center overflow-hidden px-6 pb-28 pt-12 md:pb-32"
      aria-labelledby="frontend-hero-title"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_85%,rgba(34,211,238,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_0%,rgba(129,140,248,0.14),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.5]"
          style={{
            backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 78%)",
          }}
        />
        {!reduceMotion ? (
          <svg
            className="absolute bottom-[-8%] left-1/2 h-[52%] w-[min(140%,1100px)] -translate-x-1/2 text-border opacity-70"
            viewBox="0 0 800 360"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="frontend-hero-funnel-glow"
                x1="0"
                y1="1"
                x2="0"
                y2="0"
              >
                <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.45" />
                <stop offset="55%" stopColor="rgb(129 140 248)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="rgb(129 140 248)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect
              x="0"
              y="260"
              width="800"
              height="100"
              fill="url(#frontend-hero-funnel-glow)"
            />
            {Array.from({ length: 19 }, (_, i) => {
              const x0 = 80 + i * 36;
              return (
                <line
                  key={i}
                  x1={x0}
                  y1="0"
                  x2="400"
                  y2="340"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>
        ) : (
          <div className="absolute bottom-0 left-1/2 h-40 w-full max-w-3xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(129,140,248,0.15),transparent_70%)]" />
        )}
      </div>

      <div className="relative z-[2] mx-auto max-w-3xl text-center">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="font-['DM_Mono',monospace] text-xs font-semibold uppercase tracking-[0.18em] text-accent-indigo"
        >
          {FRONTEND_HERO.label}
        </motion.p>
        <motion.h1
          id="frontend-hero-title"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-['Syne',sans-serif] text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          {FRONTEND_HERO.titleLine1}{" "}
          <span className="section-title-accent">{FRONTEND_HERO.titleAccent}</span>
        </motion.h1>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mx-auto mt-5 max-w-xl text-base text-muted md:text-lg"
        >
          {FRONTEND_HERO.subtitle}
        </motion.p>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button type="button" size="lg" onClick={onScrollToHub}>
            {FRONTEND_HERO.primaryCta}
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="border-border"
            onClick={onContact}
          >
            {FRONTEND_HERO.secondaryCta}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
