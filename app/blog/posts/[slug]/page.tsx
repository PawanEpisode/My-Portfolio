import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchCommentsForPost,
  fetchLikeCount,
  fetchPublishedPostBySlug,
} from "@/apps/blog/db/queries";
import { getBlogCoverPublicUrl } from "@/apps/blog/lib/cover-url";
import { tiptapJsonToSafeHtml } from "@/apps/blog/lib/tiptap-html";
import { getBlogCanonicalOrigin } from "@/apps/blog/lib/blog-site-url";
import { getCategoryById } from "@/apps/blog/data/posts";
import BlogPostEngagement from "@/apps/blog/sections/BlogPostEngagement";

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPublishedPostBySlug(slug);
  if (!post) {
    return { title: "Post" };
  }

  const origin = getBlogCanonicalOrigin();
  const path = `/posts/${post.slug}`;
  const url = origin ? `${origin}${path}` : undefined;
  const title = post.title;
  const description = post.excerpt ?? undefined;
  const cover = getBlogCoverPublicUrl(post.cover_image_path) ?? undefined;

  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      url,
      images: cover ? [{ url: cover }] : undefined,
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title,
      description,
      images: cover ? [cover] : undefined,
    },
  };
}

function articleJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string | null;
  read_time_minutes: number | null;
}) {
  const origin = getBlogCanonicalOrigin();
  if (!origin) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.published_at ?? undefined,
    timeRequired: post.read_time_minutes ? `PT${post.read_time_minutes}M` : undefined,
    mainEntityOfPage: `${origin}/posts/${post.slug}`,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchPublishedPostBySlug(slug);
  if (!post) notFound();

  const html = tiptapJsonToSafeHtml(post.content);
  const coverUrl = getBlogCoverPublicUrl(post.cover_image_path);
  const comments = await fetchCommentsForPost(post.id);
  const likeCount = await fetchLikeCount(post.id);
  const jsonLd = articleJsonLd(post);
  const primaryCat = getCategoryById(post.tagSlugs[0] ?? "");

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16">
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      <Link
        href="/posts"
        className="text-sm font-medium text-accent-indigo hover:underline"
      >
        ← All posts
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {primaryCat ? (
            <span className="rounded-full bg-tag-pill-bg px-3 py-1 font-medium text-foreground ring-1 ring-border/80">
              {primaryCat.label}
            </span>
          ) : null}
          {post.published_at ? (
            <time dateTime={post.published_at}>{post.published_at.slice(0, 10)}</time>
          ) : null}
          {post.read_time_minutes != null ? (
            <span>{post.read_time_minutes} min read</span>
          ) : null}
        </div>
        <h1 className="mt-4 font-['Syne',sans-serif] text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
        ) : null}
      </header>

      {coverUrl ? (
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
          <img src={coverUrl} alt="" className="aspect-[16/9] w-full object-cover" />
        </div>
      ) : null}

      <div
        className="blog-doc-prose prose prose-invert mt-10 max-w-none text-foreground prose-headings:font-['Syne',sans-serif] prose-a:text-accent-indigo"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <BlogPostEngagement
        postId={post.id}
        initialLikeCount={likeCount}
        initialComments={comments}
      />
    </article>
  );
}
