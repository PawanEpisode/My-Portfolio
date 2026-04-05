import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import type { MegaMenuCategoryConfig } from "../../../../shared/components/MegaMenuPanel";
import { INTERVIEW_MENU } from "../../data/interviewMenu";
import { PREPARE_MENU } from "../../data/prepareMenu";

function flatVisible(categories: MegaMenuCategoryConfig[]) {
  return categories.flatMap((c) => c.items.filter((i) => i.visible));
}

export interface FrontendExploreTopicsSectionProps {
  onNavigateTopic: (routeKey: string) => void;
}

export default function FrontendExploreTopicsSection({
  onNavigateTopic,
}: FrontendExploreTopicsSectionProps) {
  const items = useMemo(() => {
    const interview = flatVisible(INTERVIEW_MENU);
    const prepare = flatVisible(PREPARE_MENU);
    return [...interview.slice(0, 4), ...prepare.slice(0, 4)];
  }, []);

  return (
    <section
      className="border-t border-border/60 px-6 py-16 md:px-10 md:py-24"
      aria-labelledby="explore-topics-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Open a track
        </motion.p>
        <motion.h2
          id="explore-topics-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight md:text-3xl"
        >
          Jump into interview or prepare menus
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 max-w-2xl text-muted"
        >
          Each card opens the same topic shell as the header mega menus—use them as
          entry points while the full catalog stays in the nav.
        </motion.p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.li
              key={item.routeKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <button
                type="button"
                onClick={() => onNavigateTopic(item.routeKey)}
                className="group flex h-full w-full flex-col rounded-xl border border-border bg-[var(--card-elevated-bg)] p-4 text-left ring-1 ring-inset ring-[var(--card-elevated-border)] transition-colors hover:border-border-hover hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50"
              >
                <span className="font-['Syne',sans-serif] text-base font-semibold text-foreground group-hover:text-accent-indigo">
                  {item.title}
                </span>
                <span className="mt-2 line-clamp-2 flex-1 text-sm text-muted">
                  {item.description}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan">
                  Open
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
