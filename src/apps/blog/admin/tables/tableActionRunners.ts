import type { Editor } from "@tiptap/core";

function cellDepthRange(
  state: Editor["state"],
  pos: number
): { from: number; to: number } | null {
  const $pos = state.doc.resolve(pos);
  for (let d = $pos.depth; d > 0; d--) {
    const name = $pos.node(d).type.name;
    if (name === "tableCell" || name === "tableHeader") {
      const from = $pos.start(d) + 1;
      const to = $pos.end(d) - 1;
      if (from <= to) return { from, to };
      return null;
    }
  }
  return null;
}

export function runClearCell(editor: Editor): boolean {
  const pos = editor.state.selection.anchor;
  const range = cellDepthRange(editor.state, pos);
  if (!range) return false;
  if (range.from >= range.to) return true;
  return editor.chain().focus().deleteRange({ from: range.from, to: range.to }).run();
}

function collectCellContentRangesInRow(
  editor: Editor
): { from: number; to: number }[] | null {
  const view = editor.view;
  const anchor = editor.state.selection.anchor;
  const domAt = view.domAtPos(anchor);
  let el: Node | null = domAt.node;
  if (el.nodeType === Node.TEXT_NODE) el = el.parentNode;
  const trEl = (el as Element | null)?.closest?.("tr");
  if (!trEl || !view.dom.contains(trEl)) return null;

  const cells = [
    ...trEl.querySelectorAll<HTMLTableCellElement>(":scope > td, :scope > th"),
  ];
  const ranges: { from: number; to: number }[] = [];
  const state = editor.state;

  for (const cell of cells) {
    const pos = view.posAtDOM(cell, 0);
    if (pos == null || pos < 0) continue;
    const r = cellDepthRange(state, pos);
    if (r && r.from < r.to) ranges.push(r);
  }
  return ranges;
}

export function runClearRow(editor: Editor): boolean {
  const ranges = collectCellContentRangesInRow(editor);
  if (!ranges || ranges.length === 0) return true;
  ranges.sort((a, b) => b.from - a.from);
  const tr = editor.state.tr;
  for (const r of ranges) {
    tr.delete(r.from, r.to);
  }
  editor.view.dispatch(tr);
  return true;
}

function collectCellContentRangesInColumn(
  editor: Editor
): { from: number; to: number }[] | null {
  const view = editor.view;
  const anchor = editor.state.selection.anchor;
  const domAt = view.domAtPos(anchor);
  let el: Node | null = domAt.node;
  if (el.nodeType === Node.TEXT_NODE) el = el.parentNode;
  const cellEl = (el as Element | null)?.closest?.(
    "td, th"
  ) as HTMLTableCellElement | null;
  const table = cellEl?.closest("table");
  if (!cellEl || !table || !view.dom.contains(table)) return null;

  const colIndex = cellEl.cellIndex;
  const rows = [...table.querySelectorAll("tr")];
  const ranges: { from: number; to: number }[] = [];
  const state = editor.state;

  for (const row of rows) {
    const c = row.cells[colIndex] as HTMLTableCellElement | undefined;
    if (!c) continue;
    const pos = view.posAtDOM(c, 0);
    if (pos == null || pos < 0) continue;
    const r = cellDepthRange(state, pos);
    if (r && r.from < r.to) ranges.push(r);
  }
  return ranges;
}

export function runClearColumn(editor: Editor): boolean {
  const ranges = collectCellContentRangesInColumn(editor);
  if (!ranges || ranges.length === 0) return true;
  ranges.sort((a, b) => b.from - a.from);
  const tr = editor.state.tr;
  for (const r of ranges) {
    tr.delete(r.from, r.to);
  }
  editor.view.dispatch(tr);
  return true;
}

export const tableRunners = {
  addRowBefore: (ed: Editor) => ed.chain().focus().addRowBefore().run(),
  addRowAfter: (ed: Editor) => ed.chain().focus().addRowAfter().run(),
  deleteRow: (ed: Editor) => ed.chain().focus().deleteRow().run(),
  addColumnBefore: (ed: Editor) => ed.chain().focus().addColumnBefore().run(),
  addColumnAfter: (ed: Editor) => ed.chain().focus().addColumnAfter().run(),
  deleteColumn: (ed: Editor) => ed.chain().focus().deleteColumn().run(),
  deleteTable: (ed: Editor) => ed.chain().focus().deleteTable().run(),
  mergeCells: (ed: Editor) => ed.chain().focus().mergeCells().run(),
  splitCell: (ed: Editor) => ed.chain().focus().splitCell().run(),
  clearCell: runClearCell,
  clearRow: runClearRow,
  clearColumn: runClearColumn,
} as const;
