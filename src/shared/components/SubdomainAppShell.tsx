import type { ReactNode } from "react";

/**
 * Shared chrome for subdomain apps (blog, frontend, …): noise, sticky header (includes theme), main, contact.
 */
export default function SubdomainAppShell({
  children,
  contact,
  header,
}: {
  children: ReactNode;
  contact: ReactNode;
  header: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="noise-overlay" />
      {header}
      {children}
      {contact}
    </div>
  );
}
