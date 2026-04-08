"use client";

import { useMemo, useState } from "react";
import type { BlogPostListItem } from "./db/queries";
import { getCategories } from "./data/posts";
import { listItemToBlogPost } from "./mapPost";
import BlogPurposeSection from "./sections/BlogPurposeSection";
import BlogFeaturedPost from "./sections/BlogFeaturedPost";
import BlogCategoriesSection from "./sections/BlogCategoriesSection";
import BlogWritingSection from "./sections/BlogWritingSection";
import BlogNewsletterSection from "./sections/BlogNewsletterSection";

export default function BlogHomePage({
  initialPosts,
}: {
  initialPosts: BlogPostListItem[];
}) {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const allPosts = useMemo(() => initialPosts.map(listItemToBlogPost), [initialPosts]);
  const categories = useMemo(() => getCategories(), []);

  const featured = useMemo(() => {
    const f = allPosts.find((p) => p.featured);
    return f ?? allPosts[0];
  }, [allPosts]);

  const listPosts = useMemo(() => {
    let rows = categoryId
      ? allPosts.filter((p) => p.categoryIds.includes(categoryId))
      : allPosts;
    if (!categoryId && featured) {
      rows = rows.filter((p) => p.slug !== featured.slug);
    }
    return rows;
  }, [allPosts, categoryId, featured]);

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10">
      <BlogPurposeSection />
      {allPosts.length === 0 ? (
        <section className="border-b border-border/60 py-16 md:py-20">
          <p className="section-label">Writing</p>
          <h2 className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight md:text-3xl">
            Posts go live here
          </h2>
          <p className="mt-3 max-w-lg text-muted">
            No published posts yet. After you run Supabase migrations and publish from{" "}
            <span className="text-foreground">/admin</span>, articles appear on the home
            page and in the archive.
          </p>
        </section>
      ) : null}
      {featured && allPosts.length > 0 ? <BlogFeaturedPost post={featured} /> : null}
      <BlogCategoriesSection
        categories={categories}
        selectedCategoryId={categoryId}
        onCategoryChange={setCategoryId}
      />
      <BlogWritingSection posts={listPosts} />
      <BlogNewsletterSection />
    </main>
  );
}
