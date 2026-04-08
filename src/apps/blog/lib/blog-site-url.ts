import { getConfiguredHostForAppId } from "@/config/hostApps";

/**
 * Canonical origin for blog URLs (OG, sitemap, RSS).
 * Prefer `NEXT_PUBLIC_BLOG_CANONICAL_URL` when apex site URL differs from the blog host.
 */
export function getBlogCanonicalOrigin(): string {
  const explicit = process.env.NEXT_PUBLIC_BLOG_CANONICAL_URL?.replace(
    /\/$/,
    ""
  ).trim();
  if (explicit) return explicit;
  const host = getConfiguredHostForAppId("blog");
  if (host) return `https://${host}`;
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "").trim();
  if (site) return site;
  return "";
}
