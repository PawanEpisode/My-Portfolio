import type { MegaMenuItemConfig } from "../../../shared/components/MegaMenuPanel";
import { INTERVIEW_MENU } from "../data/interviewMenu";
import { PREPARE_MENU } from "../data/prepareMenu";

export interface ResolvedFrontendRoute {
  categoryLabel: string;
  item: MegaMenuItemConfig;
}

export function findFrontendRoute(routeKey: string): ResolvedFrontendRoute | null {
  const menus = [
    { categories: INTERVIEW_MENU, group: "Interview" },
    { categories: PREPARE_MENU, group: "Prepare" },
  ] as const;

  for (const { categories, group } of menus) {
    for (const cat of categories) {
      const item = cat.items.find((i) => i.routeKey === routeKey);
      if (item) {
        return { categoryLabel: `${group} · ${cat.label}`, item };
      }
    }
  }
  return null;
}
