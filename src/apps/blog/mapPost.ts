import type { BlogPostListItem } from "./db/queries";
import type { BlogPost } from "./types";

export function listItemToBlogPost(p: BlogPostListItem): BlogPost {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    date: (p.publishedAt ?? "").slice(0, 10),
    categoryIds: p.tagSlugs,
    readTimeMinutes: p.readTimeMinutes ?? 1,
    featured: p.isFeatured,
  };
}
