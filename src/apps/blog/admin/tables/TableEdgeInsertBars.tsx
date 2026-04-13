"use client";

import { Plus } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import type { RelRect } from "./tableLayout";

type TableEdgeInsertBarsProps = {
  bottomBar: RelRect;
  rightBar: RelRect;
  onAddRow: () => void;
  onAddColumn: () => void;
};

export default function TableEdgeInsertBars({
  bottomBar,
  rightBar,
  onAddRow,
  onAddColumn,
}: TableEdgeInsertBarsProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="Add row below"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddRow();
            }}
            className={cn(
              "pointer-events-auto absolute z-[9999] flex cursor-pointer items-center justify-center",
              "rounded-md border border-border bg-surface/90 text-muted shadow-sm",
              "transition-colors hover:border-accent-indigo/40 hover:bg-surface-hover hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50"
            )}
            style={{
              top: bottomBar.top,
              left: bottomBar.left,
              width: bottomBar.width,
              height: bottomBar.height,
            }}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="max-w-xs border-border bg-background px-3 py-2 text-foreground"
        >
          <p className="font-medium">Click to add a new row</p>
          <p className="mt-1 text-muted">
            Use the row grip on the left for insert, clear, or delete actions.
          </p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label="Add column after"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddColumn();
            }}
            className={cn(
              "pointer-events-auto absolute z-[9999] flex cursor-pointer items-center justify-center",
              "rounded-md border border-border bg-surface/90 text-muted shadow-sm",
              "transition-colors hover:border-accent-indigo/40 hover:bg-surface-hover hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50"
            )}
            style={{
              top: rightBar.top,
              left: rightBar.left,
              width: rightBar.width,
              height: rightBar.height,
            }}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="max-w-xs border-border bg-background px-3 py-2 text-foreground"
        >
          <p className="font-medium">Click to add a new column</p>
          <p className="mt-1 text-muted">
            Use the column grip above the header for more column actions.
          </p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}
