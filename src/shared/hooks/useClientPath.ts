import { useCallback, useEffect, useState } from "react";

function readPathname(): string {
  return window.location.pathname || "/";
}

/**
 * Browser pathname + `history.pushState` navigation (no router dependency).
 * Syncs on `popstate` for back/forward.
 */
export function useClientPath() {
  const [pathname, setPathname] = useState(readPathname);

  useEffect(() => {
    const onPop = () => setPathname(readPathname());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const next = to.startsWith("/") ? to : `/${to}`;
    window.history.pushState({}, "", next);
    setPathname(next);
  }, []);

  return { pathname, navigate };
}

export function normalizePathname(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}
