import { fetchPublishedPostSummaries } from "@/apps/blog/db/queries";
import { getBlogCanonicalOrigin } from "@/apps/blog/lib/blog-site-url";

export const revalidate = 3600;

function cdata(s: string) {
  return `<![CDATA[${s.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

export async function GET() {
  const origin = getBlogCanonicalOrigin();
  const posts = await fetchPublishedPostSummaries();

  const items = posts
    .map((p) => {
      const link = origin ? `${origin}/posts/${p.slug}` : `/posts/${p.slug}`;
      return `    <item>
      <title>${cdata(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${cdata(p.excerpt ?? "")}</description>
    </item>`;
    })
    .join("\n");

  const channelLink = origin || "";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pawan Kumar — Blog</title>
    <link>${channelLink}</link>
    <description>Educational writing on frontend craft</description>
    <language>en</language>
    ${origin ? `<atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/>` : ""}
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
