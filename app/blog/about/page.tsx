import type { Metadata } from "next";
import BlogPlaceholderPage from "@/apps/blog/pseudo/BlogPlaceholderPage";

export const metadata: Metadata = {
  title: "About this blog",
  description: "About the blog — editorial notes and purpose",
};

export default function BlogAboutPage() {
  return <BlogPlaceholderPage route="about" />;
}
