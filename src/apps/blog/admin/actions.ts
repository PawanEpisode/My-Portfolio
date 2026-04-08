"use server";

import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { readTimeMinutesFromTiptap } from "@/apps/blog/lib/read-time";
import { slugifyTagLabel } from "@/apps/blog/lib/slug";
import type { JSONContent } from "@tiptap/core";
import { revalidatePath } from "next/cache";

async function requireAuthorForAction() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "author") throw new Error("Forbidden");

  return { supabase, userId: user.id };
}

export async function upsertBlogPostAction(input: {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;
  status: "draft" | "published";
  isFeatured: boolean;
  tagLabels: string;
  coverImagePath: string | null;
}): Promise<{ id: string; slug: string }> {
  const { supabase, userId } = await requireAuthorForAction();

  const readMins = readTimeMinutesFromTiptap(input.content);

  let publishedAt: string | null = null;
  if (input.status === "published") {
    if (input.id) {
      const { data: existing } = await supabase
        .from("posts")
        .select("published_at")
        .eq("id", input.id)
        .eq("author_id", userId)
        .maybeSingle();
      publishedAt = existing?.published_at ?? new Date().toISOString();
    } else {
      publishedAt = new Date().toISOString();
    }
  }

  if (input.isFeatured) {
    await supabase.from("posts").update({ is_featured: false }).eq("author_id", userId);
  }

  const row = {
    author_id: userId,
    title: input.title.trim(),
    slug: input.slug.trim(),
    excerpt: input.excerpt.trim() || null,
    content: input.content,
    cover_image_path: input.coverImagePath,
    status: input.status,
    published_at: publishedAt,
    read_time_minutes: readMins,
    is_featured: input.isFeatured,
  };

  let postId = input.id;

  if (input.id) {
    const { error } = await supabase
      .from("posts")
      .update(row)
      .eq("id", input.id)
      .eq("author_id", userId);
    if (error) throw error;
  } else {
    const { data: inserted, error } = await supabase
      .from("posts")
      .insert(row)
      .select("id")
      .single();
    if (error) throw error;
    postId = inserted?.id;
  }

  if (!postId) throw new Error("Failed to save post");

  await supabase.from("post_tags").delete().eq("post_id", postId);

  const labels = [
    ...new Set(
      input.tagLabels
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    ),
  ];

  for (const label of labels) {
    const slug = slugifyTagLabel(label);
    if (!slug) continue;

    const { error: tagErr } = await supabase
      .from("tags")
      .upsert({ slug, label }, { onConflict: "slug" });
    if (tagErr) throw tagErr;

    const { data: tag, error: tagFetchErr } = await supabase
      .from("tags")
      .select("id")
      .eq("slug", slug)
      .single();

    if (tagFetchErr || !tag) throw tagFetchErr ?? new Error("Tag missing");

    const { error: ptErr } = await supabase.from("post_tags").insert({
      post_id: postId,
      tag_id: tag.id,
    });
    if (ptErr) throw ptErr;
  }

  revalidatePath("/blog");
  revalidatePath("/blog/posts");
  revalidatePath(`/blog/posts/${input.slug}`);

  return { id: postId, slug: input.slug };
}

export async function deleteBlogPostAction(id: string): Promise<void> {
  const { supabase, userId } = await requireAuthorForAction();
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .eq("author_id", userId);
  if (error) throw error;
  revalidatePath("/blog");
  revalidatePath("/blog/posts");
}
