import { tryCreateSupabaseServerClient } from "@/shared/lib/supabase/server-optional";
import type { JSONContent } from "@tiptap/core";
import type { CommentRow, PostRow, PostStatus } from "./types";

export type BlogPostListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string;
  readTimeMinutes: number | null;
  isFeatured: boolean;
  tagSlugs: string[];
};

/** Shape returned by `postListSelect` (not full `PostRow`). */
type PostListQueryRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  published_at: string | null;
  read_time_minutes: number | null;
  is_featured: boolean;
  created_at: string;
  post_tags: unknown;
};

function tagSlugFromJoin(pt: unknown): string | null {
  if (!pt || typeof pt !== "object") return null;
  const tags = (pt as { tags?: unknown }).tags;
  if (!tags) return null;
  const row = Array.isArray(tags) ? tags[0] : tags;
  if (!row || typeof row !== "object") return null;
  const slug = (row as { slug?: string }).slug;
  return typeof slug === "string" ? slug : null;
}

function mapListRow(row: PostListQueryRow): BlogPostListItem {
  const pt = row.post_tags;
  const tagSlugs = Array.isArray(pt)
    ? pt.map(tagSlugFromJoin).filter((s): s is string => Boolean(s))
    : [];
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    publishedAt: row.published_at ?? row.created_at,
    readTimeMinutes: row.read_time_minutes,
    isFeatured: row.is_featured,
    tagSlugs,
  };
}

const postListSelect = `
  id,
  slug,
  title,
  excerpt,
  published_at,
  read_time_minutes,
  is_featured,
  created_at,
  post_tags ( tags ( slug, label ) )
`;

export async function fetchPublishedPostsPage(params: {
  page: number;
  pageSize: number;
}): Promise<{ items: BlogPostListItem[]; totalApprox: number }> {
  const supabase = await tryCreateSupabaseServerClient();
  if (!supabase) return { items: [], totalApprox: 0 };

  const from = (params.page - 1) * params.pageSize;
  const to = from + params.pageSize - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select(postListSelect, { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .range(from, to);

  if (error || !data) {
    console.error("fetchPublishedPostsPage", error);
    return { items: [], totalApprox: 0 };
  }

  return {
    items: data.map((row) => mapListRow(row as unknown as PostListQueryRow)),
    totalApprox: count ?? data.length,
  };
}

export async function fetchPublishedPostSummaries(): Promise<BlogPostListItem[]> {
  const supabase = await tryCreateSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(postListSelect)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error || !data) {
    console.error("fetchPublishedPostSummaries", error);
    return [];
  }

  return data.map((row) => mapListRow(row as unknown as PostListQueryRow));
}

export async function fetchPublishedPostBySlug(
  slug: string
): Promise<(PostRow & { tagSlugs: string[] }) | null> {
  const supabase = await tryCreateSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      author_id,
      title,
      slug,
      excerpt,
      content,
      cover_image_path,
      status,
      published_at,
      read_time_minutes,
      is_featured,
      created_at,
      updated_at,
      post_tags ( tags ( slug ) )
    `
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    if (error) console.error("fetchPublishedPostBySlug", error);
    return null;
  }

  const row = data as unknown as PostRow & { post_tags: unknown };
  const pt = row.post_tags;
  const tagSlugs = Array.isArray(pt)
    ? pt.map(tagSlugFromJoin).filter((s): s is string => Boolean(s))
    : [];

  return {
    ...row,
    content: row.content as JSONContent,
    tagSlugs,
  };
}

export type CommentWithAuthor = CommentRow & {
  display_name: string | null;
};

export async function fetchCommentsForPost(
  postId: string
): Promise<CommentWithAuthor[]> {
  const supabase = await tryCreateSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      post_id,
      user_id,
      body,
      parent_id,
      deleted_at,
      created_at,
      updated_at,
      profiles ( display_name )
    `
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    console.error("fetchCommentsForPost", error);
    return [];
  }

  return data.map((raw) => {
    const r = raw as CommentRow & {
      profiles:
        | { display_name: string | null }
        | { display_name: string | null }[]
        | null;
    };
    const prof = r.profiles;
    const displayName = Array.isArray(prof)
      ? (prof[0]?.display_name ?? null)
      : (prof?.display_name ?? null);
    return {
      id: r.id,
      post_id: r.post_id,
      user_id: r.user_id,
      body: r.body,
      parent_id: r.parent_id,
      deleted_at: r.deleted_at,
      created_at: r.created_at,
      updated_at: r.updated_at,
      display_name: displayName,
    };
  });
}

export async function fetchLikeCount(postId: string): Promise<number> {
  const supabase = await tryCreateSupabaseServerClient();
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from("post_likes")
    .select("post_id", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) {
    console.error("fetchLikeCount", error);
    return 0;
  }
  return count ?? 0;
}

export async function fetchAuthorPosts(): Promise<
  {
    id: string;
    slug: string;
    title: string;
    status: PostStatus;
    published_at: string | null;
    updated_at: string;
  }[]
> {
  const supabase = await tryCreateSupabaseServerClient();
  if (!supabase) return [];

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "author") return [];

  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, status, published_at, updated_at")
    .eq("author_id", user.id)
    .order("updated_at", { ascending: false });

  if (error || !data) {
    console.error("fetchAuthorPosts", error);
    return [];
  }

  return data;
}

export async function fetchPostForAuthorEdit(
  id: string
): Promise<(PostRow & { tagSlugs: string[] }) | null> {
  const supabase = await tryCreateSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      author_id,
      title,
      slug,
      excerpt,
      content,
      cover_image_path,
      status,
      published_at,
      read_time_minutes,
      is_featured,
      created_at,
      updated_at,
      post_tags ( tags ( slug ) )
    `
    )
    .eq("id", id)
    .eq("author_id", user.id)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as unknown as PostRow & { post_tags: unknown };
  const pt = row.post_tags;
  const tagSlugs = Array.isArray(pt)
    ? pt.map(tagSlugFromJoin).filter((s): s is string => Boolean(s))
    : [];

  return {
    ...row,
    content: row.content as JSONContent,
    tagSlugs,
  };
}

export function emptyTiptapDoc(): JSONContent {
  return { type: "doc", content: [{ type: "paragraph" }] };
}
