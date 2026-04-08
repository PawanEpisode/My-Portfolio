const BANNED = [/viagra/i, /casino/i, /\bseo\s+service\b/i];

/** Cheap first-line defense; pair with rate limits server-side later. */
export function looksLikeSpamComment(body: string): boolean {
  const t = body.trim();
  if (t.length < 2) return true;
  if (t.length > 8000) return true;
  const linkCount = (t.match(/https?:\/\//gi) ?? []).length;
  if (linkCount > 5) return true;
  return BANNED.some((re) => re.test(t));
}
