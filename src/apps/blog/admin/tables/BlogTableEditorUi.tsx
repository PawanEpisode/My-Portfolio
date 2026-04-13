"use client";

import type { Editor } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import {
  resolveBlogTableLayout,
  tableEdgeRects,
  type BlogTableLayout,
} from "./tableLayout";
import { tableRunners } from "./tableActionRunners";
import TableEdgeInsertBars from "./TableEdgeInsertBars";
import TableRowColGrips, { type OpenTableGrip } from "./TableRowColGrips";

type BlogTableEditorUiProps = {
  editor: Editor | null;
  wrapperRef: RefObject<HTMLDivElement | null>;
};

export default function BlogTableEditorUi({
  editor,
  wrapperRef,
}: BlogTableEditorUiProps) {
  const [layout, setLayout] = useState<BlogTableLayout | null>(null);
  const [openGrip, setOpenGrip] = useState<OpenTableGrip>(null);
  const rafRef = useRef<number | null>(null);

  const scheduleLayout = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const wrap = wrapperRef.current;
      if (!editor || !wrap) {
        setLayout(null);
        return;
      }
      if (!editor.isEditable) {
        setLayout(null);
        return;
      }
      const inTable = editor.isActive("tableCell") || editor.isActive("tableHeader");
      if (!inTable) {
        setLayout(null);
        return;
      }
      try {
        const pos = editor.state.selection.anchor;
        const next = resolveBlogTableLayout(editor, wrap, pos);
        setLayout(next);
      } catch {
        setLayout(null);
      }
    });
  }, [editor, wrapperRef]);

  useEffect(() => {
    scheduleLayout();
  }, [scheduleLayout]);

  useEffect(() => {
    if (!editor) return;
    const up = () => scheduleLayout();
    editor.on("selectionUpdate", up);
    editor.on("transaction", up);
    const el = wrapperRef.current;
    const ro = el ? new ResizeObserver(up) : null;
    if (el) ro?.observe(el);
    window.addEventListener("resize", up);
    document.addEventListener("scroll", up, true);
    return () => {
      editor.off("selectionUpdate", up);
      editor.off("transaction", up);
      ro?.disconnect();
      window.removeEventListener("resize", up);
      document.removeEventListener("scroll", up, true);
    };
  }, [editor, scheduleLayout, wrapperRef]);

  useEffect(() => {
    if (!layout) setOpenGrip(null);
  }, [layout]);

  if (!editor || !layout) return null;

  const wrap = wrapperRef.current;
  if (!wrap) return null;

  const edges = tableEdgeRects(layout.table, wrap);
  if (!edges) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-visible">
      <TableEdgeInsertBars
        bottomBar={edges.bottomBar}
        rightBar={edges.rightBar}
        onAddRow={() => {
          tableRunners.addRowAfter(editor);
          scheduleLayout();
        }}
        onAddColumn={() => {
          tableRunners.addColumnAfter(editor);
          scheduleLayout();
        }}
      />
      <TableRowColGrips
        editor={editor}
        layout={layout}
        openGrip={openGrip}
        setOpenGrip={setOpenGrip}
      />
    </div>
  );
}
