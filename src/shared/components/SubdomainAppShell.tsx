import type { ReactNode } from "react";

/**
 * Shared chrome for subdomain apps (blog, frontend, …): noise, sticky header, main content.
 */
export default function SubdomainAppShell({
  children,
  header,
}: {
  children: ReactNode;
  header: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="noise-overlay" aria-hidden />
      {header}
      {/* Above noise (z-1) so texture never composites oddly with in-flow content */}
      <div className="relative z-[2] min-h-0 flex-1">{children}</div>
    </div>
  );
}
