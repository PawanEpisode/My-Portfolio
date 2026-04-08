import type { JSONContent } from "@tiptap/core";

function extractTextFromNode(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as JSONContent;
  if (typeof n.text === "string") return `${n.text} `;
  if (Array.isArray(n.content)) {
    return n.content.map(extractTextFromNode).join("");
  }
  return "";
}

/** ~200 wpm; returns at least 1 for non-empty content. */
export function readTimeMinutesFromTiptap(doc: JSONContent | null | undefined): number {
  if (!doc) return 1;
  const text = extractTextFromNode(doc).trim();
  if (!text) return 1;
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
