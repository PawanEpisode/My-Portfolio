import { generateHTML } from "@tiptap/html";
import sanitizeHtml from "sanitize-html";
import type { JSONContent } from "@tiptap/core";
import { getBlogHtmlExtensions } from "./tiptap-extensions";

export function tiptapJsonToSafeHtml(doc: JSONContent): string {
  const extensions = getBlogHtmlExtensions();
  const raw = generateHTML(doc, extensions);
  return sanitizeHtml(raw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "img",
      "pre",
      "code",
      "span",
      "hr",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height", "loading"],
      a: ["href", "name", "target", "rel"],
      code: ["class"],
    },
    allowVulnerableTags: false,
  });
}
