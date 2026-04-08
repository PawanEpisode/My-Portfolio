import type { MetadataRoute } from "next";
import { fetchPublishedPostSummaries } from "@/apps/blog/db/queries";
import { getBlogCanonicalOrigin } from "@/apps/blog/lib/blog-site-url";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getBlogCanonicalOrigin();
  if (!origin) return [];

  const posts = await fetchPublishedPostSummaries();
  const now = new Date();

  const staticPaths = ["/", "/posts", "/about", "/contact"];
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${origin}${path}`,
    lastModified: now,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${origin}/posts/${p.slug}`,
    lastModified: new Date(p.publishedAt),
  }));

  return [...staticEntries, ...postEntries];
}
