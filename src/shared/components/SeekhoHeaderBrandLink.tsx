import Link from "next/link";
import { cn } from "../utils/cn";

const LOGO_SRC = "/assets/brand-logo.png";

export interface SeekhoHeaderBrandLinkProps {
  /** Shown in Instrument Serif after the wordmark (e.g. Blog, Frontend). */
  productLabel: string;
  /** Full accessible name for the home link. */
  ariaLabel: string;
  href?: string;
  className?: string;
  /** Optional side effect when the home link is activated (e.g. reset client route state). */
  onNavigate?: () => void;
}

/**
 * Seekho.dev wordmark + logo lockup for subdomain app headers (blog, frontend, …).
 */
export default function SeekhoHeaderBrandLink({
  productLabel,
  ariaLabel,
  href = "/",
  className,
  onNavigate,
}: SeekhoHeaderBrandLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group relative shrink-0 flex items-center gap-2.5 rounded-xl py-1 pl-1 pr-2 -ml-1",
        "outline-none transition-[color,background-color]",
        "focus-visible:ring-2 focus-visible:ring-accent-indigo/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      aria-label={ariaLabel}
    >
      <span className="relative shrink-0">
        <span
          className="pointer-events-none absolute -inset-1 rounded-[0.65rem] bg-gradient-to-br from-accent-indigo/25 via-transparent to-accent-cyan/15 opacity-0 blur-md transition-opacity duration-500 motion-safe:group-hover:opacity-100"
          aria-hidden
        />
        <img
          src={LOGO_SRC}
          alt=""
          width={36}
          height={36}
          className="relative h-9 w-9 rounded-xl object-cover ring-1 ring-border/90 shadow-[var(--project-card-shadow-idle)] transition-[box-shadow,ring-color] duration-300 group-hover:ring-accent-indigo/40 dark:shadow-[0_8px_28px_rgba(0,0,0,0.45)] motion-safe:group-hover:shadow-[0_0_28px_var(--glow-indigo)]"
        />
      </span>
      <span className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0">
        <span className="font-['Syne',sans-serif] text-[1.05rem] font-extrabold leading-none tracking-[-0.03em] md:text-lg">
          <span className="bg-gradient-to-r from-accent-indigo via-accent-violet to-accent-cyan bg-clip-text text-transparent">
            Seekho
          </span>
          <span className="text-foreground">.dev</span>
        </span>
        <span
          className="hidden h-3.5 w-px shrink-0 bg-gradient-to-b from-transparent via-border-hover to-transparent sm:block"
          aria-hidden
        />
        <span className="font-['Instrument_Serif',serif] text-[1.15rem] font-normal italic leading-none text-muted transition-colors duration-300 group-hover:text-accent-cyan md:text-[1.2rem]">
          {productLabel}
        </span>
      </span>
    </Link>
  );
}
