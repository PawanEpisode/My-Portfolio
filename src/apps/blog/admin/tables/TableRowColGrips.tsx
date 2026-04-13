"use client";

import type { Editor } from "@tiptap/core";
import type { Dispatch, SetStateAction } from "react";
import { GripHorizontal, GripVertical, LayoutGrid } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import TableActionsPopover from "./TableActionsPopover";
import type { BlogTableLayout } from "./tableLayout";

export type OpenTableGrip = "row" | "column" | "cell" | null;

const gripBtn = cn(
  "flex cursor-pointer items-center justify-center rounded border-2 border-accent-indigo bg-accent-indigo/15 text-foreground shadow-sm",
  "transition-colors hover:border-accent-indigo hover:bg-accent-indigo/30",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50"
);

type TableRowColGripsProps = {
  editor: Editor;
  layout: BlogTableLayout;
  openGrip: OpenTableGrip;
  setOpenGrip: Dispatch<SetStateAction<OpenTableGrip>>;
};

export default function TableRowColGrips({
  editor,
  layout,
  openGrip,
  setOpenGrip,
}: TableRowColGripsProps) {
  const rowSize = 22;
  const colH = 20;
  const cellSize = 22;

  const rowTop = layout.rowRect.top + layout.rowRect.height / 2 - rowSize / 2;
  const rowLeft = layout.tableRect.left - rowSize - 4;

  const colStyle = {
    top: layout.columnGripRect.top,
    left: layout.columnGripRect.left,
    width: layout.columnGripRect.width,
    height: colH,
  };

  const cellTop = layout.cellRect.top + layout.cellRect.height / 2 - cellSize / 2;
  const cellLeft = layout.cellRect.left + layout.cellRect.width / 2 - cellSize / 2;

  return (
    <>
      <TableActionsPopover
        editor={editor}
        section="row"
        open={openGrip === "row"}
        onOpenChange={(o) => {
          if (o) setOpenGrip("row");
          else setOpenGrip((g) => (g === "row" ? null : g));
        }}
        trigger={
          <button
            type="button"
            aria-label="Row actions"
            className={cn(gripBtn, "pointer-events-auto absolute z-[9999]")}
            style={{
              top: rowTop,
              left: rowLeft,
              width: rowSize,
              height: rowSize,
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <GripVertical className="h-3.5 w-3.5" aria-hidden />
          </button>
        }
      />

      <TableActionsPopover
        editor={editor}
        section="column"
        open={openGrip === "column"}
        onOpenChange={(o) => {
          if (o) setOpenGrip("column");
          else setOpenGrip((g) => (g === "column" ? null : g));
        }}
        trigger={
          <button
            type="button"
            aria-label="Column actions"
            className={cn(gripBtn, "pointer-events-auto absolute z-[9999]")}
            style={colStyle}
            onMouseDown={(e) => e.preventDefault()}
          >
            <GripHorizontal className="h-3.5 w-3.5" aria-hidden />
          </button>
        }
      />

      <TableActionsPopover
        editor={editor}
        section="cell"
        open={openGrip === "cell"}
        onOpenChange={(o) => {
          if (o) setOpenGrip("cell");
          else setOpenGrip((g) => (g === "cell" ? null : g));
        }}
        trigger={
          <button
            type="button"
            aria-label="Cell actions"
            className={cn(
              gripBtn,
              "pointer-events-auto absolute z-[9999] opacity-70 hover:opacity-100",
              "border-border bg-surface/90 hover:border-accent-indigo hover:bg-accent-indigo/20"
            )}
            style={{
              top: cellTop,
              left: cellLeft,
              width: cellSize,
              height: cellSize,
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
          </button>
        }
      />
    </>
  );
}
