import type { Editor } from "@tiptap/core";
import { tableRunners } from "./tableActionRunners";

export type TableActionSection = "row" | "column" | "cell";

export type TableActionDef = {
  id: string;
  section: TableActionSection;
  label: string;
  keywords: string;
  danger?: boolean;
  run: (editor: Editor) => boolean;
};

const deleteTableAction: TableActionDef = {
  id: "deleteTable",
  section: "row",
  label: "Delete table",
  keywords: "remove table entire",
  danger: true,
  run: tableRunners.deleteTable,
};

const ALL: TableActionDef[] = [
  {
    id: "rowInsertAbove",
    section: "row",
    label: "Insert row above",
    keywords: "insert above row add",
    run: tableRunners.addRowBefore,
  },
  {
    id: "rowInsertBelow",
    section: "row",
    label: "Insert row below",
    keywords: "insert below row add",
    run: tableRunners.addRowAfter,
  },
  {
    id: "rowClear",
    section: "row",
    label: "Clear row contents",
    keywords: "clear empty row text",
    run: tableRunners.clearRow,
  },
  {
    id: "rowDelete",
    section: "row",
    label: "Delete row",
    keywords: "remove row delete",
    danger: true,
    run: tableRunners.deleteRow,
  },
  {
    id: "colInsertLeft",
    section: "column",
    label: "Insert column left",
    keywords: "insert left column add",
    run: tableRunners.addColumnBefore,
  },
  {
    id: "colInsertRight",
    section: "column",
    label: "Insert column right",
    keywords: "insert right column add",
    run: tableRunners.addColumnAfter,
  },
  {
    id: "colClear",
    section: "column",
    label: "Clear column contents",
    keywords: "clear empty column text",
    run: tableRunners.clearColumn,
  },
  {
    id: "colDelete",
    section: "column",
    label: "Delete column",
    keywords: "remove column delete",
    danger: true,
    run: tableRunners.deleteColumn,
  },
  {
    id: "cellClear",
    section: "cell",
    label: "Clear cell",
    keywords: "clear empty cell text",
    run: tableRunners.clearCell,
  },
  {
    id: "cellMerge",
    section: "cell",
    label: "Merge cells",
    keywords: "merge combine",
    run: tableRunners.mergeCells,
  },
  {
    id: "cellSplit",
    section: "cell",
    label: "Split cell",
    keywords: "split divide unmerge",
    run: tableRunners.splitCell,
  },
];

export function getActionsForGrip(mode: TableActionSection): TableActionDef[] {
  const base = ALL.filter((a) => a.section === mode);
  if (mode === "row") return [...base, deleteTableAction];
  return base;
}

export function filterTableActions(
  list: TableActionDef[],
  query: string
): TableActionDef[] {
  const s = query.trim().toLowerCase();
  if (!s) return list;
  return list.filter(
    (a) => a.label.toLowerCase().includes(s) || a.keywords.toLowerCase().includes(s)
  );
}
