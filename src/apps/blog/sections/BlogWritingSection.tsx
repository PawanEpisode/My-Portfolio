import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "../types";
import { getCategoryById } from "../data/posts";
import { Button } from "../../../shared/components/ui/button";

export interface BlogWritingSectionProps {
  posts: BlogPost[];
  onNavigatePath: (path: string) => void;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

export default function BlogWritingSection({
  posts,
  onNavigatePath,
}: BlogWritingSectionProps) {
  return (
    <section
      id="writing"
      className="border-b border-border/60 py-16 md:py-20"
      aria-labelledby="writing-heading"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Writing
          </motion.p>
          <motion.h2
            id="writing-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight md:text-3xl"
          >
            All posts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 max-w-lg text-muted"
          >
            Deep dives and shorter notes—narrow the list with categories above, or open
            the full archive.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button
            type="button"
            variant="outline"
            className="shrink-0 border-border"
            onClick={() => onNavigatePath("/posts")}
          >
            View archive
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">No posts match this category yet.</p>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => {
            const cat = getCategoryById(post.categoryIds[0] ?? "");
            return (
              <motion.li
                key={post.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <a
                  href={`/posts#${post.slug}`}
                  className="flex h-full flex-col rounded-xl border border-border bg-[var(--card-elevated-bg)] p-5 ring-1 ring-inset ring-[var(--card-elevated-border)] transition-colors hover:border-border-hover hover:bg-surface"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePath(`/posts#${post.slug}`);
                  }}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                    {cat ? (
                      <span className="rounded-md bg-tag-pill-bg px-2 py-0.5 font-medium text-foreground">
                        {cat.label}
                      </span>
                    ) : null}
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="inline-flex items-center gap-0.5">
                      <Clock className="h-3 w-3" aria-hidden />
                      {post.readTimeMinutes} min
                    </span>
                  </div>
                  <h3 className="mt-3 font-['Syne',sans-serif] text-lg font-semibold tracking-tight text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 text-sm font-medium text-accent-indigo">
                    Read more
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
