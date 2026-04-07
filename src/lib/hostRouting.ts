/**
 * Hostname routing for subdomain apps (replaces env-driven hostApps matching).
 * Used by middleware; public env is NEXT_PUBLIC_*.
 */

export type HostAppId = "blog" | "frontend" | "portfolio";

function envString(key: string): string | undefined {
  const v = process.env[key];
  if (v == null || String(v).trim() === "") return undefined;
  return String(v).trim();
}

export function getBlogHostname(): string {
  return envString("NEXT_PUBLIC_BLOG_HOSTNAME") ?? "blog.meetpawan.com";
}

export function getFrontendHostname(): string {
  return envString("NEXT_PUBLIC_FRONTEND_HOSTNAME") ?? "frontend.meetpawan.com";
}

export const BLOG_DEV_LOCAL_HOST = "blog.localhost";
export const FRONTEND_DEV_LOCAL_HOST = "frontend.localhost";

/** Host header value without port, lowercased */
export function normalizeHostHeader(host: string | null): string {
  if (!host) return "";
  return host.split(":")[0]?.toLowerCase() ?? "";
}

export function resolveHostAppId(hostname: string): HostAppId {
  const host = normalizeHostHeader(hostname);
  const blog = getBlogHostname().toLowerCase();
  const frontend = getFrontendHostname().toLowerCase();

  if (host === blog || host === BLOG_DEV_LOCAL_HOST) return "blog";
  if (host === frontend || host === FRONTEND_DEV_LOCAL_HOST) return "frontend";
  return "portfolio";
}
