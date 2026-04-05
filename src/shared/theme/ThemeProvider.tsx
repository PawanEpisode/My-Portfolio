import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocalTimeTheme } from "../hooks/useLocalTimeTheme";
import {
  cycleThemePreference,
  getThemePreference,
  setThemePreference,
  THEME_STORAGE_KEY,
} from "./localTimeTheme";
import type { ThemePreference, ThemePreferenceContextValue } from "./themePreference";

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] =
    useState<ThemePreference>(getThemePreference);

  useLocalTimeTheme(preference);

  const setPreference = useCallback((pref: ThemePreference) => {
    setThemePreference(pref);
    setPreferenceState(pref);
  }, []);

  const cyclePreference = useCallback(() => {
    setPreference(cycleThemePreference(preference));
  }, [preference, setPreference]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea !== localStorage || e.key !== THEME_STORAGE_KEY) return;
      setPreferenceState(getThemePreference());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<ThemePreferenceContextValue>(
    () => ({ preference, setPreference, cyclePreference }),
    [preference, setPreference, cyclePreference]
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference(): ThemePreferenceContextValue {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) {
    throw new Error("useThemePreference must be used within ThemeProvider");
  }
  return ctx;
}
