"use client";

import { useMemo, useState } from "react";
import { getAllPosts, getCategories, getFeaturedPost } from "./data/posts";
import BlogPurposeSection from "./sections/BlogPurposeSection";
import BlogFeaturedPost from "./sections/BlogFeaturedPost";
import BlogCategoriesSection from "./sections/BlogCategoriesSection";
import BlogWritingSection from "./sections/BlogWritingSection";
import BlogNewsletterSection from "./sections/BlogNewsletterSection";

export default function BlogHomePage() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const allPosts = useMemo(() => getAllPosts(), []);
  const categories = useMemo(() => getCategories(), []);
  const featured = useMemo(() => getFeaturedPost(), []);

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
      {featured ? <BlogFeaturedPost post={featured} /> : null}
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
