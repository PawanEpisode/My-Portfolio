import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import MegaMenuPanel, {
  type MegaMenuCategoryConfig,
} from "../../../shared/components/MegaMenuPanel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../shared/components/ui/hover-card";
import { cn } from "../../../shared/utils/cn";

export interface NavHoverMegaMenuProps {
  label: string;
  categories: MegaMenuCategoryConfig[];
  onSelectItem: (routeKey: string) => void;
}

export default function NavHoverMegaMenu({
  label,
  categories,
  onSelectItem,
}: NavHoverMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const firstId = categories[0]?.id ?? "";
  const [activeCategoryId, setActiveCategoryId] = useState(firstId);

  useEffect(() => {
    if (open && firstId) setActiveCategoryId(firstId);
  }, [open, firstId]);

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={60} closeDelay={120}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50",
            open
              ? "bg-surface text-accent-indigo ring-1 ring-inset ring-accent-indigo/30"
              : "text-muted hover:bg-surface-hover hover:text-foreground"
          )}
          aria-expanded={open}
        >
          {label}
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              open ? "rotate-180 text-accent-indigo" : "text-muted"
            )}
            aria-hidden
          />
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        sideOffset={10}
        className="border-border bg-background p-3 shadow-2xl"
      >
        <MegaMenuPanel
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryChange={setActiveCategoryId}
          onSelectItem={(routeKey) => {
            onSelectItem(routeKey);
            setOpen(false);
          }}
        />
      </HoverCardContent>
    </HoverCard>
  );
}
