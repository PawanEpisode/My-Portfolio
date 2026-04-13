import type { Editor } from "@tiptap/core";

export type RelRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

/** Viewport rects converted to coordinates inside a `position: relative` wrapper. */
export function elementRectRelativeToWrapper(
  element: Element,
  wrapper: Element
): RelRect | null {
  const w = wrapper.getBoundingClientRect();
  const e = element.getBoundingClientRect();
  return {
    top: e.top - w.top,
    left: e.left - w.left,
    width: e.width,
    height: e.height,
  };
}

export function getCellAndTableFromEditorPos(
  editor: Editor,
  pos: number
): {
  cell: HTMLTableCellElement;
  table: HTMLTableElement;
  tr: HTMLTableRowElement;
} | null {
  const view = editor.view;
  const { node } = view.domAtPos(pos);
  let el: Node | null = node;
  if (el.nodeType === Node.TEXT_NODE) {
    el = el.parentNode;
  }
  const cell = (el as Element | null)?.closest?.(
    "td, th"
  ) as HTMLTableCellElement | null;
  if (!cell || !view.dom.contains(cell)) return null;
  const table = cell.closest("table") as HTMLTableElement | null;
  const tr = cell.closest("tr") as HTMLTableRowElement | null;
  if (!table || !tr) return null;
  return { cell, table, tr };
}

export type BlogTableLayout = {
  table: HTMLTableElement;
  cell: HTMLTableCellElement;
  tr: HTMLTableRowElement;
  rowIndex: number;
  colIndex: number;
  tableRect: RelRect;
  cellRect: RelRect;
  rowRect: RelRect;
  /** Top strip over the active column (first row cell in that column). */
  columnGripRect: RelRect;
};

export function resolveBlogTableLayout(
  editor: Editor,
  wrapperEl: HTMLElement | null,
  pos: number
): BlogTableLayout | null {
  if (!wrapperEl) return null;
  const resolved = getCellAndTableFromEditorPos(editor, pos);
  if (!resolved) return null;

  const { cell, table, tr } = resolved;
  const rowIndex = tr.rowIndex;
  const colIndex = cell.cellIndex;

  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody") ?? table;
  let headerCell: HTMLTableCellElement | null = null;
  if (thead) {
    const hr = thead.rows[0];
    if (hr?.cells[colIndex]) headerCell = hr.cells[colIndex] as HTMLTableCellElement;
  }
  if (!headerCell && tbody.rows[0]?.cells[colIndex]) {
    headerCell = tbody.rows[0].cells[colIndex] as HTMLTableCellElement;
  }
  if (!headerCell) {
    headerCell = cell;
  }

  const tableRect = elementRectRelativeToWrapper(table, wrapperEl);
  const cellRect = elementRectRelativeToWrapper(cell, wrapperEl);
  const rowRect = elementRectRelativeToWrapper(tr, wrapperEl);
  const colTopRect = elementRectRelativeToWrapper(headerCell, wrapperEl);
  if (!tableRect || !cellRect || !rowRect || !colTopRect) return null;

  const gripH = 22;
  const columnGripRect: RelRect = {
    top: colTopRect.top - gripH + 4,
    left: colTopRect.left,
    width: colTopRect.width,
    height: gripH,
  };

  return {
    table,
    cell,
    tr,
    rowIndex,
    colIndex,
    tableRect,
    cellRect,
    rowRect,
    columnGripRect,
  };
}

export function resolveTableFromHoveredElement(
  wrapperEl: HTMLElement | null,
  target: EventTarget | null
): HTMLTableElement | null {
  if (!wrapperEl || !(target instanceof Element)) return null;
  const table = target.closest("table.blog-table, table");
  if (!table || !wrapperEl.contains(table)) return null;
  return table as HTMLTableElement;
}

export function tableEdgeRects(
  table: HTMLTableElement,
  wrapperEl: HTMLElement
): { bottomBar: RelRect; rightBar: RelRect } | null {
  const t = elementRectRelativeToWrapper(table, wrapperEl);
  if (!t) return null;
  const barH = 12;
  const barW = 14;
  const gap = 2;
  return {
    bottomBar: {
      top: t.top + t.height + gap,
      left: t.left,
      width: t.width,
      height: barH,
    },
    rightBar: {
      top: t.top,
      left: t.left + t.width + gap,
      width: barW,
      height: t.height,
    },
  };
}
