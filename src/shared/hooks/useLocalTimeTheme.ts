import { useEffect } from "react";
import {
  applyDocumentTheme,
  msUntilNextAutoThemeChange,
  resolveShouldUseDark,
} from "../theme/localTimeTheme";
import type { ThemePreference } from "../theme/themePreference";

/**
 * Keeps `document.documentElement` in sync with preference + local time.
 */
export function useLocalTimeTheme(preference: ThemePreference): void {
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
