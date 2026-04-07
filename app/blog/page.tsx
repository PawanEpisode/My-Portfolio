import type { Metadata } from "next";
import BlogHomePage from "@/apps/blog/BlogHomePage";

export const metadata: Metadata = {
  title: "Blog",
  description: "Educational writing on frontend craft — Pawan Kumar",
  openGraph: {
    title: "Blog · Pawan Kumar",
    description: "Educational writing on frontend craft — Pawan Kumar",
  },
};

export default function BlogHome() {
  return <BlogHomePage />;
}
