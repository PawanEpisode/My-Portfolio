"use client";

import type { Editor } from "@tiptap/core";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Combine,
  Eraser,
  GripHorizontal,
  GripVertical,
  Search,
  SquareSplitVertical,
  Table2,
  Trash2,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/utils/cn";
import type { TableActionSection } from "./tableActionCatalog";
import { filterTableActions, getActionsForGrip } from "./tableActionCatalog";

function ActionIcon({ id }: { id: string }) {
  const className = "h-4 w-4 shrink-0";
  switch (id) {
    case "rowInsertAbove":
      return <ArrowUp className={className} aria-hidden />;
    case "rowInsertBelow":
      return <ArrowDown className={className} aria-hidden />;
    case "rowClear":
    case "colClear":
    case "cellClear":
      return <Eraser className={className} aria-hidden />;
    case "rowDelete":
    case "colDelete":
    case "deleteTable":
      return <Trash2 className={className} aria-hidden />;
    case "colInsertLeft":
      return <ArrowLeft className={className} aria-hidden />;
    case "colInsertRight":
      return <ArrowRight className={className} aria-hidden />;
    case "cellMerge":
      return <Combine className={className} aria-hidden />;
    case "cellSplit":
      return <SquareSplitVertical className={className} aria-hidden />;
    default:
      return <Table2 className={className} aria-hidden />;
  }
}

type TableActionsPopoverProps = {
  editor: Editor;
  section: TableActionSection;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
};

const sectionTitle: Record<TableActionSection, string> = {
  row: "Row",
  column: "Column",
  cell: "Cell",
};

export default function TableActionsPopover({
  editor,
  section,
  open,
  onOpenChange,
  trigger,
}: TableActionsPopoverProps) {
  const [query, setQuery] = useState("");
  const base = useMemo(() => getActionsForGrip(section), [section]);
  const filtered = useMemo(() => filterTableActions(base, query), [base, query]);

  const FooterIcon =
    section === "row" ? GripVertical : section === "column" ? GripHorizontal : Table2;

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setQuery("");
      }}
    >
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-80 border-border bg-background p-0 shadow-xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="border-b border-border px-2 py-2">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search actions…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={cn(
                "w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-2 text-sm text-foreground",
                "placeholder:text-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50"
              )}
              aria-label="Search table actions"
            />
          </div>
        </div>
        <div className="max-h-72 overflow-y-auto py-1">
          <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wide text-muted">
            {sectionTitle[section]}
          </p>
          {filtered.length === 0 ? (
            <p className="px-3 py-4 text-center text-sm text-muted">
              No matching actions
            </p>
          ) : (
            <ul className="space-y-0.5 px-1" role="menu">
              {filtered.map((action) => (
                <li key={action.id} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors",
                      action.danger
                        ? "text-red-600 hover:bg-red-500/10 dark:text-red-400"
                        : "text-foreground hover:bg-surface-hover"
                    )}
                    onClick={() => {
                      action.run(editor);
                      onOpenChange(false);
                      setQuery("");
                    }}
                  >
                    <ActionIcon id={action.id} />
                    <span className="flex-1">{action.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center gap-2 border-t border-border px-3 py-2 text-xs text-muted">
          <FooterIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>Table actions</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
