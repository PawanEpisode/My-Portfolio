"use client";

import BlogBodyPreview from "@/apps/blog/admin/BlogBodyPreview";
import BlogEditorToolbar from "@/apps/blog/admin/BlogEditorToolbar";
import BlogTableEditorUi from "@/apps/blog/admin/tables/BlogTableEditorUi";
import { upsertBlogPostAction } from "@/apps/blog/admin/actions";
import { getBlogEditorExtensions } from "@/apps/blog/lib/tiptap-editor-extensions";
import { tiptapJsonToSafeHtml } from "@/apps/blog/lib/tiptap-html";
import { slugifyTitle } from "@/apps/blog/lib/slug";
import { getSupabaseBrowserClient } from "@/shared/lib/supabase";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";
import { EditorContent, useEditor } from "@tiptap/react";
import type { JSONContent } from "@tiptap/core";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, useTransition } from "react";

export type BlogPostEditorInitial = {
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;
  status: "draft" | "published";
  isFeatured: boolean;
  tagLabels: string;
  coverImagePath: string | null;
};

export default function BlogPostEditor(props: {
  mode: "create" | "edit";
  postId?: string;
  initial: BlogPostEditorInitial;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(props.initial.title);
  const [slug, setSlug] = useState(props.initial.slug);
  const [excerpt, setExcerpt] = useState(props.initial.excerpt);
  const [isFeatured, setIsFeatured] = useState(props.initial.isFeatured);
  const [tagLabels, setTagLabels] = useState(props.initial.tagLabels);
  const [coverImagePath, setCoverImagePath] = useState<string | null>(
    props.initial.coverImagePath
  );
  const [coverUploading, setCoverUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "split">("split");
  const [docRev, setDocRev] = useState(0);
  const editorSurfaceRef = useRef<HTMLDivElement>(null);

  const extensions = useMemo(() => getBlogEditorExtensions(), []);

  const editor = useEditor({
    extensions,
    content: props.initial.content,
    immediatelyRender: false,
    onUpdate: () => setDocRev((n) => n + 1),
    editorProps: {
      attributes: {
        class:
          "blog-doc-prose prose prose-invert max-w-none min-h-[280px] px-4 py-3 text-sm text-foreground focus-visible:outline-none",
      },
    },
  });

  const previewHtml = useMemo(() => {
    if (!editor) return "";
    void docRev;
    return tiptapJsonToSafeHtml(editor.getJSON());
  }, [editor, docRev]);

  const editorSurfaceClass =
    "relative rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-accent-indigo/25";

  async function uploadCover(file: File) {
    setCoverUploading(true);
    setError(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not signed in");
      const safeName = file.name.replace(/[^\w.-]/g, "_");
      const path = `${user.id}/${Date.now()}-${safeName}`;
      const { error: upErr } = await supabase.storage
        .from("blog-covers")
        .upload(path, file, {
          upsert: true,
          contentType: file.type || undefined,
        });
      if (upErr) throw upErr;
      setCoverImagePath(path);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Cover upload failed");
    } finally {
      setCoverUploading(false);
    }
  }

  function submit(nextStatus: "draft" | "published") {
    if (!editor) return;
    setError(null);
    const json = editor.getJSON();
    const s = slug.trim() || slugifyTitle(title);
    if (!s) {
      setError("Add a title or slug.");
      return;
    }
    startTransition(async () => {
      try {
        const result = await upsertBlogPostAction({
          id: props.postId,
          title: title.trim(),
          slug: s,
          excerpt: excerpt.trim(),
          content: json,
          status: nextStatus,
          isFeatured,
          tagLabels,
          coverImagePath,
        });
        if (props.mode === "create") {
          router.replace(`/admin/posts/${result.id}/edit`);
        }
        router.refresh();
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Save failed");
      }
    });
  }

  return (
    <div className="mt-8 space-y-8">
      {error ? (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-800 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            className="block text-sm font-medium text-foreground"
            htmlFor="post-title"
          >
            Title
          </label>
          <input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <div className="flex items-end justify-between gap-2">
            <label
              className="block text-sm font-medium text-foreground"
              htmlFor="post-slug"
            >
              Slug
            </label>
            <button
              type="button"
              className="text-xs font-medium text-accent-indigo hover:underline"
              onClick={() => setSlug(slugifyTitle(title))}
            >
              From title
            </button>
          </div>
          <input
            id="post-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-foreground"
            htmlFor="post-tags"
          >
            Tags (comma-separated)
          </label>
          <input
            id="post-tags"
            value={tagLabels}
            onChange={(e) => setTagLabels(e.target.value)}
            placeholder="engineering, accessibility"
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            className="block text-sm font-medium text-foreground"
            htmlFor="post-excerpt"
          >
            Excerpt
          </label>
          <textarea
            id="post-excerpt"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <span className="block text-sm font-medium text-foreground">Cover image</span>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="text-sm text-muted file:mr-3 file:rounded-lg file:border file:border-border file:bg-surface file:px-3 file:py-1.5 file:text-sm file:font-medium"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void uploadCover(f);
            }}
          />
          {coverUploading ? (
            <span className="text-xs text-muted">Uploading…</span>
          ) : null}
          {coverImagePath ? (
            <span className="font-mono text-xs text-muted">{coverImagePath}</span>
          ) : null}
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-foreground">Body</span>
          <div
            className="inline-flex rounded-lg border border-border bg-surface/50 p-0.5"
            role="group"
            aria-label="Editor view"
          >
            {(
              [
                ["edit", "Write"],
                ["split", "Split"],
                ["preview", "Preview"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setViewMode(id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  viewMode === id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-1 max-w-2xl text-xs text-muted">
          Type{" "}
          <kbd className="rounded border border-border bg-surface px-1 font-mono">
            /
          </kbd>{" "}
          for a quick insert menu, or use the toolbar. Tables support row/column
          controls when the cursor is inside the table. Flowcharts work best in a{" "}
          <strong className="font-medium text-foreground">code block</strong> (monospace
          + box). Matches published styling in Preview.
        </p>

        <div
          className={cn(
            "mt-2",
            viewMode === "split" && "grid gap-4 lg:grid-cols-2 lg:items-start"
          )}
        >
          {(viewMode === "edit" || viewMode === "split") && (
            <div className={cn("min-h-0", viewMode === "split" && "min-h-[320px]")}>
              {viewMode === "split" ? (
                <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted">
                  Editor
                </span>
              ) : null}
              <div ref={editorSurfaceRef} className={editorSurfaceClass}>
                <BlogEditorToolbar editor={editor} />
                <BlogTableEditorUi editor={editor} wrapperRef={editorSurfaceRef} />
                <EditorContent editor={editor} />
              </div>
            </div>
          )}
          {(viewMode === "preview" || viewMode === "split") && (
            <div className={cn("min-h-0", viewMode === "split" && "min-h-[320px]")}>
              {viewMode === "split" ? (
                <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted">
                  Preview
                </span>
              ) : null}
              <BlogBodyPreview html={previewHtml} />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="rounded border-border"
          />
          Featured on home
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          disabled={pending || !editor}
          onClick={() => submit("draft")}
        >
          Save draft
        </Button>
        <Button
          type="button"
          variant="default"
          disabled={pending || !editor}
          className="bg-accent-indigo text-white hover:bg-accent-indigo/90"
          onClick={() => submit("published")}
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
