import { getSupabasePublicEnv } from "@/shared/lib/supabase/env";

/** Public bucket `blog-covers` path like `{userId}/file.webp`. */
export function getBlogCoverPublicUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const env = getSupabasePublicEnv();
  if (!env) return null;
  const base = env.url.replace(/\/$/, "");
  const encoded = path
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `${base}/storage/v1/object/public/blog-covers/${encoded}`;
}
