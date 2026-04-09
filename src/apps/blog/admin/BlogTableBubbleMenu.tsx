"use client";

import type { ReactNode } from "react";
import type { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { cn } from "@/shared/utils/cn";

function MiniBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        "rounded-md px-2 py-1 text-xs font-medium text-foreground",
        "border border-border bg-surface hover:bg-surface-hover",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50"
      )}
    >
      {children}
    </button>
  );
}

export default function BlogTableBubbleMenu({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor: ed }) => ed.isEditable && ed.isActive("table")}
      options={{ placement: "top" }}
      className="flex max-w-[min(100vw-2rem,28rem)] flex-wrap items-center gap-1 rounded-lg border border-border bg-background p-1.5 shadow-lg"
    >
      <MiniBtn
        title="Add row below"
        onClick={() => editor.chain().focus().addRowAfter().run()}
      >
        + Row
      </MiniBtn>
      <MiniBtn
        title="Add row above"
        onClick={() => editor.chain().focus().addRowBefore().run()}
      >
        Row ↑
      </MiniBtn>
      <MiniBtn
        title="Delete row"
        onClick={() => editor.chain().focus().deleteRow().run()}
      >
        − Row
      </MiniBtn>
      <span className="mx-0.5 h-4 w-px bg-border" aria-hidden />
      <MiniBtn
        title="Add column after"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      >
        + Col
      </MiniBtn>
      <MiniBtn
        title="Add column before"
        onClick={() => editor.chain().focus().addColumnBefore().run()}
      >
        Col ←
      </MiniBtn>
      <MiniBtn
        title="Delete column"
        onClick={() => editor.chain().focus().deleteColumn().run()}
      >
        − Col
      </MiniBtn>
      <span className="mx-0.5 h-4 w-px bg-border" aria-hidden />
      <MiniBtn
        title="Delete table"
        onClick={() => editor.chain().focus().deleteTable().run()}
      >
        Delete table
      </MiniBtn>
    </BubbleMenu>
  );
}
