import type { JSONContent } from "@tiptap/core";

export type PostStatus = "draft" | "published";

export type ProfileRow = {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  role: "reader" | "author";
};

export type PostRow = {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: JSONContent;
  cover_image_path: string | null;
  status: PostStatus;
  published_at: string | null;
  read_time_minutes: number | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export type TagRow = {
  id: string;
  slug: string;
  label: string;
};

export type CommentRow = {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  parent_id: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};
