import ThemeToggleButton from "../../shared/theme/ThemeToggleButton";
import { frontendHostnameDisplay } from "../../shared/lib/subdomainHostDisplay";
import { cn } from "../../shared/utils/cn";
import { INTERVIEW_MENU } from "./data/interviewMenu";
import { PREPARE_MENU } from "./data/prepareMenu";
import NavHoverMegaMenu from "./components/NavHoverMegaMenu";

export interface FrontendNavHeaderProps {
  onNavigateTopic: (routeKey: string) => void;
  onNavigatePath: (path: string) => void;
  onHome: () => void;
  contactActive: boolean;
}

/** Matches blog nav: indigo focus ring; active state uses surface + indigo ring (design system). */
const contactNavClass =
  "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50";

export default function FrontendNavHeader({
  onNavigateTopic,
  onNavigatePath,
  onHome,
  contactActive,
}: FrontendNavHeaderProps) {
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
          onClick={(e) => {
            e.preventDefault();
            onHome();
          }}
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
            onSelectItem={onNavigateTopic}
          />
          <NavHoverMegaMenu
            label="Prepare"
            categories={PREPARE_MENU}
            onSelectItem={onNavigateTopic}
          />
          <a
            href="/contact"
            className={cn(
              contactNavClass,
              contactActive
                ? "bg-surface text-foreground ring-1 ring-inset ring-accent-indigo/35"
                : "text-muted hover:bg-surface-hover hover:text-foreground"
            )}
            onClick={(e) => {
              e.preventDefault();
              onNavigatePath("/contact");
            }}
          >
            Contact
          </a>
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
}
