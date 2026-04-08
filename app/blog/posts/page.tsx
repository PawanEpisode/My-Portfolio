import type { Metadata } from "next";
import Link from "next/link";
import { fetchPublishedPostsPage } from "@/apps/blog/db/queries";
import { listItemToBlogPost } from "@/apps/blog/mapPost";
import { Clock } from "lucide-react";
import { getCategoryById } from "@/apps/blog/data/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Posts",
  description: "Article index — posts and series",
};

const PAGE_SIZE = 10;

type PageProps = { searchParams: Promise<{ page?: string }> };

export default async function BlogPostsArchivePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const { items, totalApprox } = await fetchPublishedPostsPage({
    page,
    pageSize: PAGE_SIZE,
  });
  const totalPages = Math.max(1, Math.ceil(totalApprox / PAGE_SIZE));
  const posts = items.map(listItemToBlogPost);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-10">
      <p className="section-label">Archive</p>
      <h1 className="font-['Syne',sans-serif] text-3xl font-bold tracking-tight">
        All posts
      </h1>
      <p className="mt-2 text-muted">
        Page {page} of {totalPages} · {totalApprox} posts
      </p>

      <ul className="mt-10 divide-y divide-border border-t border-border">
        {posts.length === 0 ? (
          <li className="py-10 text-sm text-muted">No published posts yet.</li>
        ) : (
          posts.map((post) => {
            const cat = getCategoryById(post.categoryIds[0] ?? "");
            return (
              <li key={post.slug} className="py-6">
                <Link
                  href={`/posts/${post.slug}`}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    {cat ? (
                      <span className="rounded-md bg-tag-pill-bg px-2 py-0.5 font-medium text-foreground">
                        {cat.label}
                      </span>
                    ) : null}
                    <time dateTime={post.date}>{post.date}</time>
                    <span className="inline-flex items-center gap-0.5">
                      <Clock className="h-3 w-3" aria-hidden />
                      {post.readTimeMinutes} min
                    </span>
                  </div>
                  <h2 className="mt-2 font-['Syne',sans-serif] text-xl font-semibold tracking-tight text-foreground group-hover:text-accent-indigo">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{post.excerpt}</p>
                </Link>
              </li>
            );
          })
        )}
      </ul>

      {totalPages > 1 ? (
        <nav
          className="mt-10 flex justify-between gap-4 text-sm font-medium"
          aria-label="Pagination"
        >
          {page > 1 ? (
            <Link
              href={page === 2 ? "/posts" : `/posts?page=${page - 1}`}
              className="text-accent-indigo hover:underline"
            >
              ← Newer
            </Link>
          ) : (
            <span className="text-muted">← Newer</span>
          )}
          {page < totalPages ? (
            <Link
              href={`/posts?page=${page + 1}`}
              className="text-accent-indigo hover:underline"
            >
              Older →
            </Link>
          ) : (
            <span className="text-muted">Older →</span>
          )}
        </nav>
      ) : null}
    </main>
  );
}
