import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "../utils/cn";

export interface MegaMenuItemConfig {
  id: string;
  visible: boolean;
  title: string;
  description: string;
  tags: string[];
  /** Client route key — consumed by host app pseudo pages */
  routeKey: string;
  icon: LucideIcon;
}

export interface MegaMenuCategoryConfig {
  id: string;
  label: string;
  items: MegaMenuItemConfig[];
}

export interface MegaMenuPanelProps {
  categories: MegaMenuCategoryConfig[];
  activeCategoryId: string;
  onCategoryChange: (id: string) => void;
  onSelectItem: (routeKey: string) => void;
  /** Left border accent for the active category (portfolio: indigo) */
  activeCategoryClassName?: string;
}

export default function MegaMenuPanel({
  categories,
  activeCategoryId,
  onCategoryChange,
  onSelectItem,
  activeCategoryClassName = "border-l-accent-indigo",
}: MegaMenuPanelProps) {
  const active = categories.find((c) => c.id === activeCategoryId) ?? categories[0];
  const visibleItems = active?.items.filter((i) => i.visible) ?? [];

  return (
    <div className="flex min-h-[280px] w-[min(92vw,760px)]">
      <nav
        className="flex w-[200px] shrink-0 flex-col gap-0.5 border-r border-border py-1 pr-3"
        aria-label="Section"
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              type="button"
              onMouseEnter={() => onCategoryChange(cat.id)}
              onFocus={() => onCategoryChange(cat.id)}
              className={cn(
                "border-l-2 border-transparent py-2.5 pl-3 pr-2 text-left text-sm font-medium transition-colors",
                isActive
                  ? cn("bg-surface font-medium text-accent-indigo", activeCategoryClassName)
                  : "text-muted hover:bg-surface-hover hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>

      <div className="min-w-0 flex-1 pl-4">
        <ul className="flex flex-col gap-1">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const shownTags = item.tags.slice(0, 3);
            const more = item.tags.length - shownTags.length;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelectItem(item.routeKey)}
                  className="group flex w-full items-start gap-3 rounded-xl px-2 py-3 text-left transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground">
                    <Icon className="h-5 w-5 opacity-90" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-foreground">{item.title}</span>
                      <ArrowRight
                        className="mt-0.5 h-4 w-4 shrink-0 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-muted">
                      {item.description}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {shownTags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-muted"
                        >
                          {t}
                        </span>
                      ))}
                      {more > 0 ? (
                        <span className="rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] font-medium text-muted">
                          +{more} more
                        </span>
                      ) : null}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {visibleItems.length === 0 ? (
          <p className="px-2 py-6 text-sm text-muted">No topics visible in this section yet.</p>
        ) : null}
      </div>
    </div>
  );
}
