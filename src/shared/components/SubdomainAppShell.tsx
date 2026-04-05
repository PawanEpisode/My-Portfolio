import type { ReactNode } from "react";
import ThemeToggleButton from "../theme/ThemeToggleButton";

/**
 * Shared chrome for subdomain apps (blog, frontend, …): noise, theme toggle, and a host-provided contact region.
 */
export default function SubdomainAppShell({
  children,
  contact,
}: {
  children: ReactNode;
  contact: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="noise-overlay" />
      <div className="fixed right-4 top-4 z-50 md:right-6 md:top-6">
        <ThemeToggleButton />
      </div>
      {children}
      {contact}
    </div>
  );
}
