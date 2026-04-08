import type { Metadata } from "next";
import Link from "next/link";
import { fetchAuthorPosts } from "@/apps/blog/db/queries";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function BlogAdminDashboardPage() {
  const posts = await fetchAuthorPosts();

  return (
    <div>
      <h1 className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight">
        Posts
      </h1>
      <p className="mt-1 text-sm text-muted">Drafts and published articles you own.</p>

      <ul className="mt-8 divide-y divide-border rounded-xl border border-border">
        {posts.length === 0 ? (
          <li className="px-4 py-8 text-sm text-muted">
            No posts yet.{" "}
            <Link
              href="/admin/posts/new"
              className="font-medium text-accent-indigo hover:underline"
            >
              Create one
            </Link>
            .
          </li>
        ) : (
          posts.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-4"
            >
              <div>
                <Link
                  href={`/admin/posts/${p.id}/edit`}
                  className="font-medium text-foreground hover:text-accent-indigo"
                >
                  {p.title}
                </Link>
                <p className="mt-0.5 text-xs text-muted">
                  {p.status} · {p.slug}
                  {p.published_at ? ` · ${p.published_at.slice(0, 10)}` : ""}
                </p>
              </div>
              <span
                className={
                  p.status === "published"
                    ? "rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400"
                    : "rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300"
                }
              >
                {p.status}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
