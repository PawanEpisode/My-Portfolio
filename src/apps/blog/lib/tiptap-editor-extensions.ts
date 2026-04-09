import Placeholder from "@tiptap/extension-placeholder";
import type { AnyExtension } from "@tiptap/core";
import { getBlogDocExtensions } from "./tiptap-doc-extensions";
import { BlogSlashCommands } from "./tiptap-slash-extension";

export function getBlogEditorExtensions(placeholder?: string): AnyExtension[] {
  return [
    ...getBlogDocExtensions(),
    BlogSlashCommands,
    Placeholder.configure({
      placeholder:
        placeholder ??
        "Type / for blocks, or use the toolbar. Headings, tables, callouts, and code blocks match published styling.",
    }),
  ];
}
