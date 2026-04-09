"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useEffect, useState } from "react";

type InsertTableDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (opts: { rows: number; cols: number; withHeaderRow: boolean }) => void;
  defaultRows?: number;
  defaultCols?: number;
};

export default function InsertTableDialog({
  open,
  onOpenChange,
  onInsert,
  defaultRows = 4,
  defaultCols = 2,
}: InsertTableDialogProps) {
  const [rows, setRows] = useState(defaultRows);
  const [cols, setCols] = useState(defaultCols);
  const [header, setHeader] = useState(true);

  useEffect(() => {
    if (open) {
      setRows(defaultRows);
      setCols(defaultCols);
      setHeader(true);
    }
  }, [open, defaultRows, defaultCols]);

  function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
  }

  function submit() {
    const r = clamp(Math.floor(rows) || 1, 1, 30);
    const c = clamp(Math.floor(cols) || 1, 1, 12);
    onInsert({ rows: r, cols: c, withHeaderRow: header });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-background">
        <DialogHeader>
          <DialogTitle>Insert table</DialogTitle>
          <DialogDescription>
            Choose size. You can add or remove rows and columns later with the floating
            table menu.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="tbl-rows" className="text-sm font-medium text-foreground">
              Rows
            </label>
            <input
              id="tbl-rows"
              type="number"
              min={1}
              max={30}
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="tbl-cols" className="text-sm font-medium text-foreground">
              Columns
            </label>
            <input
              id="tbl-cols"
              type="number"
              min={1}
              max={12}
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={header}
            onChange={(e) => setHeader(e.target.checked)}
            className="rounded border-border"
          />
          Header row
        </label>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="border-border"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={submit}>
            Insert
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
