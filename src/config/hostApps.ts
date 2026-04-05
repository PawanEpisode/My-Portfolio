import type { ComponentType } from "react";
import BlogApp from "../apps/blog/BlogApp";
import FrontendApp from "../apps/frontend/FrontendApp";

/** Env keys used for subdomain hostnames (see `ImportMetaEnv` in `vite-env.d.ts`). */
type SubdomainHostnameEnvKey = "VITE_BLOG_HOSTNAME" | "VITE_FRONTEND_HOSTNAME";

function envHost(key: SubdomainHostnameEnvKey, fallback: string): string {
  const v = import.meta.env[key];
  if (v == null || String(v).trim() === "") return fallback;
  return String(v).trim();
}

export interface HostAppEntry {
  id: string;
  envKey: SubdomainHostnameEnvKey;
  defaultHost: string;
  /** Dev-only: resolves to 127.0.0.1 in modern browsers; no /etc/hosts needed */
  devLocalHost: string;
  component: ComponentType;
}

/**
 * Subdomain apps (anything not matched falls through to PortfolioApp).
 *
 * To add another app:
 * 1. Create `src/apps/<name>/<Name>App.tsx` (and optional `components/`, `hooks/`, …)
 * 2. Extend `SubdomainHostnameEnvKey` + `ImportMetaEnv` in `vite-env.d.ts`
 * 3. Add `VITE_*_HOSTNAME` to `.env.example`
 * 4. Push an entry here with a unique `devLocalHost` (`*.localhost`, dev-only)
 */
const HOST_APP_ENTRIES: readonly HostAppEntry[] = [
  {
    id: "blog",
    envKey: "VITE_BLOG_HOSTNAME",
    defaultHost: "blog.meetpawan.com",
    devLocalHost: "blog.localhost",
    component: BlogApp,
  },
  {
    id: "frontend",
    envKey: "VITE_FRONTEND_HOSTNAME",
    defaultHost: "frontend.meetpawan.com",
    devLocalHost: "frontend.localhost",
    component: FrontendApp,
  },
];

function resolvedHosts(entry: HostAppEntry): string[] {
  const production = envHost(entry.envKey, entry.defaultHost);
  const hosts = [production];
  if (import.meta.env.DEV) hosts.push(entry.devLocalHost);
  return hosts;
}

export function resolveHostAppEntry(hostname: string): HostAppEntry | null {
  for (const entry of HOST_APP_ENTRIES) {
    if (resolvedHosts(entry).includes(hostname)) return entry;
  }
  return null;
}

export function getHostAppComponent(hostname: string): ComponentType | null {
  const entry = resolveHostAppEntry(hostname);
  return entry ? entry.component : null;
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
    devLocalHost: import.meta.env.DEV ? e.devLocalHost : null,
  }));
}
