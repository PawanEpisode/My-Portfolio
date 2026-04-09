import { common, createLowlight } from "lowlight";

/** Shared highlighter for Tiptap CodeBlockLowlight + SSR HTML generation. */
export const blogLowlight = createLowlight(common);
