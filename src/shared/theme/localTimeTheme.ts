/** Local-time day/night: light 06:00–17:59, dark otherwise. */

import type { ThemePreference } from "./themePreference";

export const THEME_STORAGE_KEY = "portfolio-theme";

export const THEME_META_COLORS = {
  light: "#f1f5f9",
  dark: "#0b1020",
};

export function getThemePreference(): ThemePreference {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    if (v === "light" || v === "dark" || v === "auto") return v;
  } catch {
    /* ignore */
  }
  return "auto";
}

export function setThemePreference(pref: ThemePreference): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    /* ignore */
  }
}

/** true when local time is night (before 6am or from 6pm). */
export function shouldUseDarkTheme(date: Date = new Date()): boolean {
  const h = date.getHours();
  return h < 6 || h >= 18;
}

export function resolveShouldUseDark(
  date: Date = new Date(),
  preference: ThemePreference = getThemePreference()
): boolean {
  if (preference === "light") return false;
  if (preference === "dark") return true;
  return shouldUseDarkTheme(date);
}

export function cycleThemePreference(current: ThemePreference): ThemePreference {
  if (current === "auto") return "light";
  if (current === "light") return "dark";
  return "auto";
}

/**
 * Milliseconds until the next 06:00 or 18:00 local boundary (for auto mode).
 */
export function msUntilNextAutoThemeChange(date: Date = new Date()): number {
  const next = new Date(date.getTime());
  const h = date.getHours();

  if (h < 6) {
    next.setHours(6, 0, 0, 0);
    return Math.max(0, next.getTime() - date.getTime());
  }
  if (h < 18) {
    next.setHours(18, 0, 0, 0);
    return Math.max(0, next.getTime() - date.getTime());
  }
  next.setDate(next.getDate() + 1);
  next.setHours(6, 0, 0, 0);
  return Math.max(0, next.getTime() - date.getTime());
}

export function applyDocumentTheme(isDark: boolean): void {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute(
      "content",
      isDark ? THEME_META_COLORS.dark : THEME_META_COLORS.light
    );
  }
}
