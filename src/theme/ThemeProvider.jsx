import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocalTimeTheme } from "../shared/hooks/useLocalTimeTheme";
import {
  cycleThemePreference,
  getThemePreference,
  setThemePreference,
  THEME_STORAGE_KEY,
} from "./localTimeTheme";

const ThemePreferenceContext = createContext(null);

export function ThemeProvider({ children }) {
  const [preference, setPreferenceState] = useState(getThemePreference);

  useLocalTimeTheme(preference);

  const setPreference = useCallback((pref) => {
    setThemePreference(pref);
    setPreferenceState(pref);
  }, []);

  const cyclePreference = useCallback(() => {
    setPreference(cycleThemePreference(preference));
  }, [preference, setPreference]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.storageArea !== localStorage || e.key !== THEME_STORAGE_KEY) return;
      setPreferenceState(getThemePreference());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({ preference, setPreference, cyclePreference }),
    [preference, setPreference, cyclePreference]
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function useThemePreference() {
  const ctx = useContext(ThemePreferenceContext);
  if (!ctx) {
    throw new Error("useThemePreference must be used within ThemeProvider");
  }
  return ctx;
}
