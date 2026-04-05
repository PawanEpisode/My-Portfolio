import type { BlogRouteId } from "./blogRoutes";
import { normalizePathname } from "../../shared/hooks/useClientPath";

export function blogPathToRoute(pathname: string): BlogRouteId {
  const p = normalizePathname(pathname);
  if (p === "/contact") return "contact";
  if (p === "/about") return "about";
  if (p === "/posts") return "posts";
  return "home";
}
