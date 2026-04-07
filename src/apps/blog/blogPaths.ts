import { normalizePathname, stripInternalAppPrefix } from "@/lib/pathname";
import type { BlogRouteId } from "./blogRoutes";

export function blogPathToRoute(pathname: string): BlogRouteId {
  const p = normalizePathname(stripInternalAppPrefix(pathname, "/blog"));
  if (p === "/contact") return "contact";
  if (p === "/about") return "about";
  if (p === "/posts") return "posts";
  return "home";
}
