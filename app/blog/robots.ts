import type { MetadataRoute } from "next";
import { getBlogCanonicalOrigin } from "@/apps/blog/lib/blog-site-url";

export default function robots(): MetadataRoute.Robots {
  const origin = getBlogCanonicalOrigin();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/auth/"],
    },
    sitemap: origin ? `${origin}/sitemap.xml` : undefined,
  };
}
