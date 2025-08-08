import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => {
        if (isDisabled) return;
        setIsDisabled(true);
        setTheme(theme === "dark" ? "light" : "dark");
        // Allow Tailwind's styles to settle and avoid rapid toggles
        window.setTimeout(() => setIsDisabled(false), 350);
      }}
      disabled={isDisabled}
      className="rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 backdrop-blur hover:bg-slate-100 dark:hover:bg-white/10 transition text-slate-700 dark:text-white"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
