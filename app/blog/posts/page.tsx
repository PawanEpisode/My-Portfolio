import type { Metadata } from "next";
import BlogPlaceholderPage from "@/apps/blog/pseudo/BlogPlaceholderPage";

export const metadata: Metadata = {
  title: "Posts",
  description: "Article index — posts and series",
};

export default function BlogPostsPage() {
  return <BlogPlaceholderPage route="posts" />;
}
