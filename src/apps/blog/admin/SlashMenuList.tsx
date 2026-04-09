"use client";

import type { Editor } from "@tiptap/core";
import { cn } from "@/shared/utils/cn";
import { useCallback, useEffect, useRef, useState } from "react";

export type SlashMenuItem = {
  title: string;
  description?: string;
  run: (editor: Editor) => void;
};

export type SlashMenuListProps = {
  items: SlashMenuItem[];
  command: (item: SlashMenuItem) => void;
};

/** Keeps keyboard handler in sync for @tiptap/suggestion render.onKeyDown */
export const slashMenuKeyRef: { current: ((e: KeyboardEvent) => boolean) | null } = {
  current: null,
};

export default function SlashMenuList({ items, command }: SlashMenuListProps) {
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(0);
  }, [items]);

  const selectIndex = useCallback(
    (i: number) => {
      if (items.length === 0) return;
      const next = ((i % items.length) + items.length) % items.length;
      setSelected(next);
    },
    [items.length]
  );

  useEffect(() => {
    slashMenuKeyRef.current = (event: KeyboardEvent) => {
      if (items.length === 0) return false;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        selectIndex(selected + 1);
        return true;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        selectIndex(selected - 1);
        return true;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const item = items[selected];
        if (item) command(item);
        return true;
      }
      return false;
    };
    return () => {
      slashMenuKeyRef.current = null;
    };
  }, [items, selected, command, selectIndex]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-slash-index="${selected}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  if (items.length === 0) {
    return (
      <div className="w-64 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted shadow-lg">
        No matches — keep typing or press Esc
      </div>
    );
  }

  return (
    <div
      ref={listRef}
      className="max-h-72 w-72 overflow-y-auto rounded-lg border border-border bg-background py-1 text-sm shadow-xl"
      role="listbox"
      aria-label="Insert block"
    >
      {items.map((item, i) => (
        <button
          key={item.title}
          type="button"
          role="option"
          data-slash-index={i}
          aria-selected={i === selected}
          className={cn(
            "flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left transition-colors",
            i === selected
              ? "bg-surface-hover text-foreground"
              : "text-foreground hover:bg-surface-hover"
          )}
          onMouseEnter={() => setSelected(i)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => command(item)}
        >
          <span className="font-medium">{item.title}</span>
          {item.description ? (
            <span className="text-xs text-muted">{item.description}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
