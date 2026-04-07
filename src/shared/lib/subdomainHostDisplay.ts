/** Display hostnames without importing `hostApps` (avoids circular imports with app entry components). */

function trimEnv(value: unknown): string | null {
  if (value == null) return null;
  const s = String(value).trim();
  return s === "" ? null : s;
}

export function blogHostnameDisplay(): string {
  return trimEnv(process.env.NEXT_PUBLIC_BLOG_HOSTNAME) ?? "blog.meetpawan.com";
}

export function frontendHostnameDisplay(): string {
  return trimEnv(process.env.NEXT_PUBLIC_FRONTEND_HOSTNAME) ?? "frontend.meetpawan.com";
}
