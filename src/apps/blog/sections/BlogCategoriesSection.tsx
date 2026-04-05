import { motion } from "framer-motion";
import type { BlogCategory } from "../types";
import { cn } from "../../../shared/utils/cn";

export interface BlogCategoriesSectionProps {
  categories: BlogCategory[];
  selectedCategoryId: string | null;
  onCategoryChange: (id: string | null) => void;
}

export default function BlogCategoriesSection({
  categories,
  selectedCategoryId,
  onCategoryChange,
}: BlogCategoriesSectionProps) {
  return (
    <section
      className="border-b border-border/60 py-16 md:py-20"
      aria-labelledby="categories-heading"
    >
      <motion.p
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="section-label"
      >
        Browse by category
      </motion.p>
      <motion.h2
        id="categories-heading"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight md:text-3xl"
      >
        Find the thread you are in the mood for
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-3 max-w-2xl text-muted"
      >
        Tap a category to filter the writing grid below. Choose &ldquo;All&rdquo; to see
        everything again.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter posts by category"
      >
        <button
          type="button"
          onClick={() => onCategoryChange(null)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50",
            selectedCategoryId === null
              ? "bg-surface text-foreground ring-1 ring-inset ring-accent-indigo/35"
              : "bg-tag-pill-bg text-muted hover:bg-surface-hover hover:text-foreground"
          )}
        >
          All
        </button>
        {categories.map((cat) => {
          const active = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              title={cat.description}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50",
                active
                  ? "bg-surface text-foreground ring-1 ring-inset ring-accent-indigo/35"
                  : "bg-tag-pill-bg text-muted hover:bg-surface-hover hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </motion.div>
    </section>
  );
}
