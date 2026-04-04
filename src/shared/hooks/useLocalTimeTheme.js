import { useEffect } from "react";
import {
  applyDocumentTheme,
  msUntilNextAutoThemeChange,
  resolveShouldUseDark,
  THEME_STORAGE_KEY,
} from "../theme/localTimeTheme";

/**
 * Keeps `document.documentElement` in sync with preference + local time.
 * @param {"auto" | "light" | "dark"} preference
 */
export function useLocalTimeTheme(preference) {
  useEffect(() => {
    const sync = () => {
      applyDocumentTheme(resolveShouldUseDark(new Date(), preference));
    };

    sync();

    let timeoutId = 0;

    const scheduleNextBoundary = () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (preference !== "auto") return;
      const ms = msUntilNextAutoThemeChange();
      timeoutId = window.setTimeout(() => {
        sync();
        scheduleNextBoundary();
      }, ms);
    };

    scheduleNextBoundary();

    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      sync();
      scheduleNextBoundary();
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [preference]);
}
