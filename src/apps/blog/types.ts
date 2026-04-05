export type BlogCategory = {
  id: string;
  label: string;
  description: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date string */
  date: string;
  categoryIds: string[];
  readTimeMinutes: number;
  featured?: boolean;
};
