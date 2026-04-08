import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import type { AnyExtension } from "@tiptap/core";

function starterKit() {
  return StarterKit.configure({
    heading: { levels: [2, 3, 4] },
  });
}

/** Server-side HTML: StarterKit only (no Placeholder). */
export function getBlogHtmlExtensions(): AnyExtension[] {
  return [starterKit()];
}

export function getBlogEditorExtensions(placeholder?: string): AnyExtension[] {
  return [
    starterKit(),
    Placeholder.configure({
      placeholder: placeholder ?? "Write your post…",
    }),
  ];
}
