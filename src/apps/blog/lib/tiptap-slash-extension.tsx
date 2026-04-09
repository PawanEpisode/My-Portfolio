"use client";

import { Extension } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import Suggestion from "@tiptap/suggestion";
import SlashMenuList, {
  type SlashMenuItem,
  slashMenuKeyRef,
} from "@/apps/blog/admin/SlashMenuList";
import { createRoot, type Root } from "react-dom/client";
import tippy, { type Instance } from "tippy.js";

const slashPluginKey = new PluginKey("blogSlashCommands");

function slashItems({ query }: { query: string }): SlashMenuItem[] {
  const q = query.toLowerCase().trim();
  const defaults = { rows: 4, cols: 2, withHeaderRow: true as const };

  const all: SlashMenuItem[] = [
    {
      title: "Table",
      description: `${defaults.rows}×${defaults.cols} with header (adjust after insert)`,
      run: (ed) =>
        void ed
          .chain()
          .focus()
          .insertTable({ ...defaults })
          .run(),
    },
    {
      title: "Callout",
      description: "Left-border panel (blockquote)",
      run: (ed) => void ed.chain().focus().toggleBlockquote().run(),
    },
    {
      title: "Code block",
      description: "Syntax-highlighted fenced block",
      run: (ed) => void ed.chain().focus().toggleCodeBlock().run(),
    },
    {
      title: "Heading 1",
      run: (ed) => void ed.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      title: "Heading 2",
      run: (ed) => void ed.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      title: "Bullet list",
      run: (ed) => void ed.chain().focus().toggleBulletList().run(),
    },
    {
      title: "Numbered list",
      run: (ed) => void ed.chain().focus().toggleOrderedList().run(),
    },
    {
      title: "Divider",
      description: "Horizontal rule",
      run: (ed) => void ed.chain().focus().setHorizontalRule().run(),
    },
  ];

  if (!q) return all;

  return all.filter(
    (i) =>
      i.title.toLowerCase().includes(q) ||
      (i.description && i.description.toLowerCase().includes(q))
  );
}

export const BlogSlashCommands = Extension.create({
  name: "blogSlashCommands",

  addProseMirrorPlugins() {
    const editor = this.editor;

    let popup: Instance | null = null;
    let reactRoot: Root | null = null;
    let mountEl: HTMLDivElement | null = null;

    return [
      Suggestion({
        pluginKey: slashPluginKey,
        editor,
        char: "/",
        allowSpaces: false,
        allowedPrefixes: null,
        startOfLine: false,
        allow: ({ editor: ed }) => !ed.isActive("codeBlock") && !ed.isActive("table"),
        command: ({ editor: ed, range, props }) => {
          ed.chain().focus().deleteRange(range).run();
          props.run(ed);
        },
        items: ({ query }) => slashItems({ query }),
        render: () => ({
          onStart: (props) => {
            mountEl = document.createElement("div");
            reactRoot = createRoot(mountEl);
            reactRoot.render(
              <SlashMenuList items={props.items} command={props.command} />
            );
            popup = tippy(document.body, {
              getReferenceClientRect: () =>
                props.clientRect?.() ?? new DOMRect(0, 0, 0, 0),
              appendTo: () => document.body,
              content: mountEl,
              interactive: true,
              trigger: "manual",
              placement: "bottom-start",
              showOnCreate: true,
              arrow: false,
              offset: [0, 8],
              zIndex: 9999,
            });
          },
          onUpdate: (props) => {
            reactRoot?.render(
              <SlashMenuList items={props.items} command={props.command} />
            );
            popup?.setProps({
              getReferenceClientRect: () =>
                props.clientRect?.() ?? new DOMRect(0, 0, 0, 0),
            });
          },
          onKeyDown: (keyProps) => {
            return slashMenuKeyRef.current?.(keyProps.event) ?? false;
          },
          onExit: () => {
            popup?.destroy();
            popup = null;
            reactRoot?.unmount();
            reactRoot = null;
            mountEl = null;
            slashMenuKeyRef.current = null;
          },
        }),
      }),
    ];
  },
});
