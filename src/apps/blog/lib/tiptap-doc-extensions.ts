import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";
import { TableKit } from "@tiptap/extension-table/kit";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import type { AnyExtension } from "@tiptap/core";
import { blogLowlight } from "./blog-lowlight";

function blogStarterKit() {
  return StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4],
    },
    blockquote: {
      HTMLAttributes: {
        class: "blog-callout",
      },
    },
    codeBlock: false,
  });
}

const codeBlockLowlight = CodeBlockLowlight.configure({
  lowlight: blogLowlight,
  defaultLanguage: "typescript",
  HTMLAttributes: {
    class: "hljs blog-code-block",
  },
});

const tableKit = TableKit.configure({
  table: {
    resizable: false,
    HTMLAttributes: {
      class: "blog-table",
    },
  },
});

const linkExtension = Link.configure({
  openOnClick: false,
  autolink: true,
  defaultProtocol: "https",
  HTMLAttributes: {
    class: "blog-link",
    rel: "noopener noreferrer nofollow",
  },
});

/**
 * Document schema for SSR HTML and shared with the editor (no slash menu — avoids Tippy/React on server).
 */
export function getBlogDocExtensions(): AnyExtension[] {
  return [blogStarterKit(), codeBlockLowlight, Underline, linkExtension, tableKit];
}

export function getBlogHtmlExtensions(): AnyExtension[] {
  return getBlogDocExtensions();
}
