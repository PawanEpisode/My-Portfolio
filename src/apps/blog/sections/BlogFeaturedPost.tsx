import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "../types";
import { getCategoryById } from "../data/posts";

export interface BlogFeaturedPostProps {
  post: BlogPost;
  onNavigatePath: (path: string) => void;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

export default function BlogFeaturedPost({
  post,
  onNavigatePath,
}: BlogFeaturedPostProps) {
  const primaryCategory = getCategoryById(post.categoryIds[0] ?? "");

  return (
    <section
      className="border-b border-border/60 py-16 md:py-20"
      aria-labelledby="featured-heading"
    >
      <motion.p
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="section-label"
      >
        Featured post
      </motion.p>
      <motion.h2
        id="featured-heading"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight md:text-3xl"
      >
        Right now on the front page
      </motion.h2>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 overflow-hidden rounded-2xl border border-border bg-[var(--card-elevated-bg)] shadow-[var(--project-card-shadow-idle)] ring-1 ring-inset ring-[var(--card-elevated-border)] transition-shadow hover:shadow-[var(--project-card-shadow-active)]"
      >
        <a
          href={`/posts#${post.slug}`}
          className="group block px-6 py-8 md:px-10 md:py-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={(e) => {
            e.preventDefault();
            onNavigatePath(`/posts#${post.slug}`);
          }}
        >
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            {primaryCategory ? (
              <span className="rounded-full bg-tag-pill-bg px-3 py-1 font-medium text-foreground ring-1 ring-border/80">
                {primaryCategory.label}
              </span>
            ) : null}
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {post.readTimeMinutes} min read
            </span>
          </div>
          <h3 className="mt-4 font-['Syne',sans-serif] text-xl font-bold tracking-tight text-foreground group-hover:text-accent-indigo md:text-2xl">
            {post.title}
          </h3>
          <p className="mt-3 max-w-2xl text-base text-muted md:text-lg">
            {post.excerpt}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-indigo">
            Read the full post
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </motion.article>
    </section>
  );
}
