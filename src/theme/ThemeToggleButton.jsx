import { Moon, Sun, SunMoon } from "lucide-react";
import { useThemePreference } from "./ThemeProvider";

const labels = {
  auto: "Theme: automatic (follows local time). Click to use light.",
  light: "Theme: light. Click to use dark.",
  dark: "Theme: dark. Click to return to automatic.",
};

export default function ThemeToggleButton() {
  const { preference, cyclePreference } = useThemePreference();

  const Icon = preference === "auto" ? SunMoon : preference === "light" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={cyclePreference}
      aria-label={labels[preference]}
      title={labels[preference]}
      className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:bg-surface-hover hover:text-foreground"
    >
      <Icon size={16} strokeWidth={2} />
    </button>
  );
}
