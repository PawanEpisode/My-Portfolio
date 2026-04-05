import ThemeToggleButton from "../../shared/theme/ThemeToggleButton";
import { frontendHostnameDisplay } from "../../shared/lib/subdomainHostDisplay";
import { cn } from "../../shared/utils/cn";
import { INTERVIEW_MENU } from "./data/interviewMenu";
import { PREPARE_MENU } from "./data/prepareMenu";
import NavHoverMegaMenu from "./components/NavHoverMegaMenu";

export interface FrontendNavHeaderProps {
  onNavigate: (routeKey: string) => void;
}

export default function FrontendNavHeader({ onNavigate }: FrontendNavHeaderProps) {
  const host = frontendHostnameDisplay();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md",
        "supports-[backdrop-filter]:bg-background/70"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <a
          href="/"
          className="shrink-0 font-['Syne',sans-serif] text-sm font-semibold tracking-tight text-foreground underline-offset-4 hover:underline"
        >
          {host}
        </a>

        <nav
          className="flex items-center gap-1 md:gap-2"
          aria-label="Frontend app primary"
        >
          <NavHoverMegaMenu
            label="Interview"
            categories={INTERVIEW_MENU}
            onSelectItem={onNavigate}
          />
          <NavHoverMegaMenu
            label="Prepare"
            categories={PREPARE_MENU}
            onSelectItem={onNavigate}
          />
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
}
