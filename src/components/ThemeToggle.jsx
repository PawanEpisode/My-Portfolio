import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/theme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleThemeToggle = () => {
    if (isDisabled) return;
    setIsDisabled(true);
    setTheme(theme === "dark" ? "light" : "dark");
    // Allow Tailwind's styles to settle and avoid rapid toggles
    window.setTimeout(() => setIsDisabled(false), 350);
  };
  return (
    <button
      aria-label="Toggle theme"
      onClick={handleThemeToggle}
      disabled={isDisabled}
      className="rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 backdrop-blur hover:bg-slate-100 dark:hover:bg-white/10 transition text-slate-700 dark:text-white"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
