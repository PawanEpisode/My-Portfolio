/** User-selected theme mode stored in localStorage (`portfolio-theme`). */
export type ThemePreference = "auto" | "light" | "dark";

export interface ThemePreferenceContextValue {
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
  cyclePreference: () => void;
}
