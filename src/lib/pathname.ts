/** Normalize pathname for route matching (no trailing slash except root). */
export function normalizePathname(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

/** Strip internal `/blog` or `/frontend` prefix when matching public routes after middleware rewrite. */
export function stripInternalAppPrefix(
  pathname: string,
  prefix: "/blog" | "/frontend"
): string {
  const p = normalizePathname(pathname);
  if (p === prefix) return "/";
  if (p.startsWith(`${prefix}/`)) {
    return normalizePathname(p.slice(prefix.length));
  }
  return p;
}
