export type BlogCategory = {
  id: string;
  label: string;
  description: string;
};

export type BlogPost = {
  /** Present when loaded from Supabase */
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string */
  date: string;
  /** Tag slugs (aligned with `BLOG_CATEGORIES[].id` when you use those slugs in the DB). */
  categoryIds: string[];
  readTimeMinutes: number;
  featured?: boolean;
};
