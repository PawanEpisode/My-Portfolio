/**
 * Subdomain hostname registry (aligned with `middleware.ts` + `src/lib/hostRouting.ts`).
 * Use `getConfiguredHostForAppId` for cross-links; do not hardcode production hostnames in UI.
 */

/** Env keys for public subdomain hostnames (see `next-env.d.ts` / `src/env.d.ts`). */
export type SubdomainHostnameEnvKey =
  | "NEXT_PUBLIC_BLOG_HOSTNAME"
  | "NEXT_PUBLIC_FRONTEND_HOSTNAME";

function envHost(key: SubdomainHostnameEnvKey, fallback: string): string {
  const v = typeof process !== "undefined" ? process.env[key] : undefined;
  if (v == null || String(v).trim() === "") return fallback;
  return String(v).trim();
}

export interface HostAppEntry {
  id: string;
  envKey: SubdomainHostnameEnvKey;
  defaultHost: string;
  /** Dev-only: resolves to 127.0.0.1 in modern browsers; no /etc/hosts needed */
  devLocalHost: string;
}

const HOST_APP_ENTRIES: readonly HostAppEntry[] = [
  {
    id: "blog",
    envKey: "NEXT_PUBLIC_BLOG_HOSTNAME",
    defaultHost: "blog.meetpawan.com",
    devLocalHost: "blog.localhost",
  },
  {
    id: "frontend",
    envKey: "NEXT_PUBLIC_FRONTEND_HOSTNAME",
    defaultHost: "frontend.meetpawan.com",
    devLocalHost: "frontend.localhost",
  },
];

function resolvedHosts(entry: HostAppEntry): string[] {
  const production = envHost(entry.envKey, entry.defaultHost);
  const hosts = [production];
  if (process.env.NODE_ENV === "development") hosts.push(entry.devLocalHost);
  return hosts;
}

export function resolveHostAppEntry(hostname: string): HostAppEntry | null {
  const h = hostname.split(":")[0]?.toLowerCase() ?? "";
  for (const entry of HOST_APP_ENTRIES) {
    if (resolvedHosts(entry).includes(h)) return entry;
  }
  return null;
}

/** Production hostname for an app id (after env), for links / metadata */
export function getConfiguredHostForAppId(id: string): string | null {
  const entry = HOST_APP_ENTRIES.find((e) => e.id === id);
  if (!entry) return null;
  return envHost(entry.envKey, entry.defaultHost);
}

export interface HostAppBindingInfo {
  id: string;
  productionHost: string;
  devLocalHost: string | null;
}

/** Introspection (e.g. docs, debug) */
export function listHostAppBindings(): HostAppBindingInfo[] {
  return HOST_APP_ENTRIES.map((e) => ({
    id: e.id,
    productionHost: envHost(e.envKey, e.defaultHost),
    devLocalHost: process.env.NODE_ENV === "development" ? e.devLocalHost : null,
  }));
}
