"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import InsertTableDialog from "@/apps/blog/admin/InsertTableDialog";
import { cn } from "@/shared/utils/cn";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Quote,
  Strikethrough,
  Table2,
  Underline as UnderlineIcon,
} from "lucide-react";

function BarBtn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-transparent text-muted transition-colors",
        "hover:bg-surface-hover hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50",
        active && "border-border bg-surface text-foreground",
        disabled && "pointer-events-none opacity-40"
      )}
    >
      {children}
    </button>
  );
}

export default function BlogEditorToolbar({ editor }: { editor: Editor | null }) {
  const [tableDialogOpen, setTableDialogOpen] = useState(false);

  if (!editor) return null;

  return (
    <div
      className="mb-2 flex flex-wrap items-center gap-0.5 rounded-lg border border-border bg-surface/60 p-1.5"
      role="toolbar"
      aria-label="Formatting"
    >
      <BarBtn
        title="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" aria-hidden />
      </BarBtn>
      <BarBtn
        title="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" aria-hidden />
      </BarBtn>
      <BarBtn
        title="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" aria-hidden />
      </BarBtn>
      <BarBtn
        title="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" aria-hidden />
      </BarBtn>

      <span className="mx-1 hidden h-5 w-px bg-border sm:inline" aria-hidden />

      <BarBtn
        title="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" aria-hidden />
      </BarBtn>
      <BarBtn
        title="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" aria-hidden />
      </BarBtn>
      <BarBtn
        title="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" aria-hidden />
      </BarBtn>

      <span className="mx-1 hidden h-5 w-px bg-border sm:inline" aria-hidden />

      <BarBtn
        title="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" aria-hidden />
      </BarBtn>
      <BarBtn
        title="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" aria-hidden />
      </BarBtn>
      <BarBtn
        title="Callout (blockquote)"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" aria-hidden />
      </BarBtn>
      <BarBtn
        title="Inline code"
        active={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" aria-hidden />
      </BarBtn>
      <BarBtn
        title="Code block"
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code2 className="h-4 w-4" aria-hidden />
      </BarBtn>

      <span className="mx-1 hidden h-5 w-px bg-border sm:inline" aria-hidden />

      <BarBtn title="Insert table…" onClick={() => setTableDialogOpen(true)}>
        <Table2 className="h-4 w-4" aria-hidden />
      </BarBtn>
      <InsertTableDialog
        open={tableDialogOpen}
        onOpenChange={setTableDialogOpen}
        onInsert={({ rows, cols, withHeaderRow }) => {
          editor.chain().focus().insertTable({ rows, cols, withHeaderRow }).run();
        }}
      />
      <BarBtn
        title="Horizontal rule"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="h-4 w-4" aria-hidden />
      </BarBtn>
      <BarBtn
        title="Link"
        active={editor.isActive("link")}
        onClick={() => {
          const prev = editor.getAttributes("link").href as string | undefined;
          const url = window.prompt("Link URL", prev ?? "https://");
          if (url === null) return;
          if (url.trim() === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url.trim() })
            .run();
        }}
      >
        <LinkIcon className="h-4 w-4" aria-hidden />
      </BarBtn>
    </div>
  );
}
