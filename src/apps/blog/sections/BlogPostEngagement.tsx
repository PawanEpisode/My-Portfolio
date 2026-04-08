"use client";

import type { CommentWithAuthor } from "@/apps/blog/db/queries";
import { looksLikeSpamComment } from "@/apps/blog/lib/comment-spam";
import { getSupabaseBrowserClient } from "@/shared/lib/supabase";
import { Button } from "@/shared/components/ui/button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  postId: string;
  initialLikeCount: number;
  initialComments: CommentWithAuthor[];
};

export default function BlogPostEngagement({
  postId,
  initialLikeCount,
  initialComments,
}: Props) {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(false);
  const [likeBusy, setLikeBusy] = useState(false);
  const [body, setBody] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [commentBusy, setCommentBusy] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  const refreshLiked = useCallback(async () => {
    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLiked(false);
        return;
      }
      const { data } = await supabase
        .from("post_likes")
        .select("post_id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .maybeSingle();
      setLiked(Boolean(data));
    } catch {
      setLiked(false);
    }
  }, [postId]);

  useEffect(() => {
    void refreshLiked();
  }, [refreshLiked]);

  async function toggleLike() {
    setLikeBusy(true);
    setCommentError(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setCommentError(
          "Sign in to like posts (use the admin login flow or add a reader sign-in)."
        );
        setLikeBusy(false);
        return;
      }
      if (liked) {
        const { error } = await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
        if (error) throw error;
        setLiked(false);
        setLikeCount((c) => Math.max(0, c - 1));
      } else {
        const { error } = await supabase.from("post_likes").insert({
          post_id: postId,
          user_id: user.id,
        });
        if (error) throw error;
        setLiked(true);
        setLikeCount((c) => c + 1);
      }
    } catch (e: unknown) {
      setCommentError(e instanceof Error ? e.message : "Could not update like");
    } finally {
      setLikeBusy(false);
    }
  }

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    setCommentError(null);
    const text = body.trim();
    if (text.length < 2) return;
    if (looksLikeSpamComment(text)) {
      setCommentError(
        "This message looks like spam. Please shorten links and try again."
      );
      return;
    }
    setCommentBusy(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setCommentError("Sign in to comment.");
        setCommentBusy(false);
        return;
      }
      const { error } = await supabase.from("comments").insert({
        post_id: postId,
        user_id: user.id,
        body: text,
        parent_id: parentId,
      });
      if (error) throw error;
      setBody("");
      setParentId(null);
      router.refresh();
    } catch (e: unknown) {
      setCommentError(e instanceof Error ? e.message : "Could not post comment");
    } finally {
      setCommentBusy(false);
    }
  }

  const tree = useMemo(() => buildCommentTree(initialComments), [initialComments]);

  return (
    <section
      className="mt-16 border-t border-border pt-12"
      aria-labelledby="engagement-heading"
    >
      <h2
        id="engagement-heading"
        className="font-['Syne',sans-serif] text-xl font-bold tracking-tight"
      >
        Reactions & comments
      </h2>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant={liked ? "default" : "outline"}
          size="sm"
          disabled={likeBusy}
          onClick={() => void toggleLike()}
          className={liked ? "bg-accent-indigo text-white" : "border-border"}
        >
          {liked ? "Liked" : "Like"} · {likeCount}
        </Button>
      </div>

      <form onSubmit={submitComment} className="mt-8 space-y-3">
        <label
          htmlFor="comment-body"
          className="block text-sm font-medium text-foreground"
        >
          Add a comment
        </label>
        <textarea
          id="comment-body"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share a thought or question…"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        />
        {parentId ? (
          <p className="text-xs text-muted">
            Replying to a thread.{" "}
            <button
              type="button"
              className="text-accent-indigo hover:underline"
              onClick={() => setParentId(null)}
            >
              Cancel reply
            </button>
          </p>
        ) : null}
        {commentError ? (
          <p className="text-sm text-red-600 dark:text-red-400">{commentError}</p>
        ) : null}
        <Button type="submit" disabled={commentBusy || body.trim().length < 2}>
          {commentBusy ? "Posting…" : "Post comment"}
        </Button>
      </form>

      <ul className="mt-10 space-y-6">
        {tree.map((node) => (
          <CommentThread
            key={node.id}
            node={node}
            onReply={(id) => {
              setParentId(id);
              document.getElementById("comment-body")?.focus();
            }}
          />
        ))}
      </ul>
    </section>
  );
}

type Node = CommentWithAuthor & { children: Node[] };

function buildCommentTree(flat: CommentWithAuthor[]): Node[] {
  const map = new Map<string, Node>();
  for (const c of flat) {
    map.set(c.id, { ...c, children: [] });
  }
  const roots: Node[] = [];
  for (const c of flat) {
    const node = map.get(c.id)!;
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id)!.children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

function CommentThread({
  node,
  onReply,
  depth = 0,
}: {
  node: Node;
  onReply: (id: string) => void;
  depth?: number;
}) {
  const deleted = Boolean(node.deleted_at);
  const display = deleted ? "[Comment removed]" : node.body;
  const name = node.display_name ?? "Reader";

  return (
    <li className="rounded-lg border border-border bg-surface/40 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-foreground">
          {deleted ? "Removed" : name}
        </span>
        <time className="text-xs text-muted" dateTime={node.created_at}>
          {node.created_at.slice(0, 10)}
        </time>
      </div>
      <p
        className={`mt-2 text-sm ${deleted ? "italic text-muted" : "text-foreground"}`}
      >
        {display}
      </p>
      {!deleted ? (
        <button
          type="button"
          className="mt-2 text-xs font-medium text-accent-indigo hover:underline"
          onClick={() => onReply(node.id)}
        >
          Reply
        </button>
      ) : null}
      {node.children.length > 0 ? (
        <ul
          className={`mt-4 space-y-4 border-l border-border pl-4 ${depth > 4 ? "" : ""}`}
        >
          {node.children.map((ch) => (
            <CommentThread key={ch.id} node={ch} onReply={onReply} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
