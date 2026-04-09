"use client";

import { cn } from "@/shared/utils/cn";

export default function BlogBodyPreview({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  if (!html.trim()) {
    return (
      <div
        className={cn(
          "blog-doc-prose flex min-h-[280px] items-center justify-center rounded-lg border border-dashed border-border bg-background/50 px-4 py-8 text-sm text-muted",
          className
        )}
      >
        Nothing to preview yet — add headings, lists, or a table in the editor.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "blog-doc-prose prose prose-invert max-w-none min-h-[280px] overflow-x-auto rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground prose-a:text-accent-indigo",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
