import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MobileProjectCard from "./MobileProjectCard";

const navBtnBase =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-foreground transition-[color,background-color,border-color,box-shadow,transform,opacity] " +
  "border-border bg-bg-secondary shadow-[0_4px_16px_rgba(0,0,0,0.08)] " +
  "enabled:hover:border-border-hover enabled:hover:bg-surface-hover enabled:hover:shadow-[0_6px_22px_rgba(0,0,0,0.12)] " +
  "enabled:active:scale-[0.96] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-border disabled:bg-bg-secondary disabled:text-muted disabled:opacity-40 disabled:shadow-none " +
  "dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] dark:enabled:hover:shadow-[0_8px_28px_rgba(0,0,0,0.45)]";

export default function ProjectCarouselNavigation({ projects }) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const count = projects?.length ?? 0;
  const lastIndex = Math.max(0, count - 1);
  const safeIndex = Math.min(currentProjectIndex, lastIndex);

  const currentProject = useMemo(
    () => (count > 0 ? projects[safeIndex] : null),
    [projects, count, safeIndex],
  );

  const goTo = (index) => {
    setCurrentProjectIndex(Math.max(0, Math.min(lastIndex, index)));
  };

  useEffect(() => {
    setCurrentProjectIndex((i) => Math.min(i, lastIndex));
  }, [lastIndex]);

  if (count === 0) return null;

  const atStart = safeIndex === 0;
  const atEnd = safeIndex === lastIndex;

  return (
    <div className="flex w-full flex-col gap-4">
      <MobileProjectCard
        key={currentProject?.title ?? safeIndex}
        project={currentProject}
        index={safeIndex}
      />
      <div
        className="flex w-full items-center justify-between gap-4 px-1"
        role="group"
        aria-label="Project carousel controls"
      >
        <button
          type="button"
          className={navBtnBase}
          aria-label="Previous project"
          disabled={atStart}
          onClick={() => goTo(safeIndex - 1)}
        >
          <ChevronLeft size={22} strokeWidth={2.25} className="shrink-0" aria-hidden />
        </button>
        <button
          type="button"
          className={navBtnBase}
          aria-label="Next project"
          disabled={atEnd}
          onClick={() => goTo(safeIndex + 1)}
        >
          <ChevronRight size={22} strokeWidth={2.25} className="shrink-0" aria-hidden />
        </button>
      </div>
    </div>
  );
}
