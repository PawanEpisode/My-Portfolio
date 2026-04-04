import BlogApp from "../apps/blog/BlogApp";
import FrontendApp from "../apps/frontend/FrontendApp";

/**
 * Resolve hostname from Vite env (empty / unset → fallback).
 * @param {string} key - e.g. VITE_BLOG_HOSTNAME
 * @param {string} fallback
 */
function envHost(key, fallback) {
  const v = import.meta.env[key];
  if (v == null || String(v).trim() === "") return fallback;
  return String(v).trim();
}

/**
 * Subdomain apps (anything not matched falls through to PortfolioApp).
 *
 * To add another app:
 * 1. Create src/apps/<name>/YourApp.jsx (and optional components/, hooks/, …)
 * 2. Add VITE_*_HOSTNAME to .env.example
 * 3. Push an entry here with a unique `devLocalHost` (*.localhost, dev-only)
 */
const HOST_APP_ENTRIES = [
  {
    id: "blog",
    envKey: "VITE_BLOG_HOSTNAME",
    defaultHost: "blog.meetpawan.com",
    /** Dev-only: resolves to 127.0.0.1 in modern browsers; no /etc/hosts needed */
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

function resolvedHosts(entry) {
  const production = envHost(entry.envKey, entry.defaultHost);
  const hosts = [production];
  if (import.meta.env.DEV) hosts.push(entry.devLocalHost);
  return hosts;
}

/**
 * @param {string} hostname - `window.location.hostname`
 * @returns {(typeof HOST_APP_ENTRIES)[number] | null}
 */
export function resolveHostAppEntry(hostname) {
  for (const entry of HOST_APP_ENTRIES) {
    if (resolvedHosts(entry).includes(hostname)) return entry;
  }
  return null;
}

/**
 * @param {string} hostname
 * @returns {import("react").ComponentType | null}
 */
export function getHostAppComponent(hostname) {
  const entry = resolveHostAppEntry(hostname);
  return entry ? entry.component : null;
}

/** Production hostname for an app id (after env), for links / metadata */
export function getConfiguredHostForAppId(id) {
  const entry = HOST_APP_ENTRIES.find((e) => e.id === id);
  if (!entry) return null;
  return envHost(entry.envKey, entry.defaultHost);
}

/** Introspection (e.g. docs, debug) */
export function listHostAppBindings() {
  return HOST_APP_ENTRIES.map((e) => ({
    id: e.id,
    productionHost: envHost(e.envKey, e.defaultHost),
    devLocalHost: import.meta.env.DEV ? e.devLocalHost : null,
  }));
}
