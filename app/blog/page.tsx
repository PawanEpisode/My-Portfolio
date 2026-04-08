import type { Metadata } from "next";
import BlogHomePage from "@/apps/blog/BlogHomePage";
import { fetchPublishedPostSummaries } from "@/apps/blog/db/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description: "Educational writing on frontend craft — Pawan Kumar",
  openGraph: {
    title: "Blog · Pawan Kumar",
    description: "Educational writing on frontend craft — Pawan Kumar",
  },
};

export default async function BlogHome() {
  const initialPosts = await fetchPublishedPostSummaries();
  return <BlogHomePage initialPosts={initialPosts} />;
}
