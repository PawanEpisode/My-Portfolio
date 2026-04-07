"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import ThemeToggleButton from "../../shared/theme/ThemeToggleButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../shared/components/ui/dialog";
import SeekhoHeaderBrandLink from "../../shared/components/SeekhoHeaderBrandLink";
import { cn } from "../../shared/utils/cn";
import { blogPathToRoute } from "./blogPaths";

const navClass =
  "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50";

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        navClass,
        active && "bg-surface text-foreground ring-1 ring-inset ring-accent-indigo/35"
      )}
    >
      {children}
    </Link>
  );
}

export default function BlogNavHeader() {
  const pathname = usePathname();
  const active = blogPathToRoute(pathname);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md",
        "supports-[backdrop-filter]:bg-background/70"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <SeekhoHeaderBrandLink
          productLabel="Blog"
          ariaLabel="Seekho.dev Blog — home"
          href="/"
        />

        <nav
          className="flex items-center gap-0.5 md:gap-1"
          aria-label="Blog primary navigation"
        >
          <NavLink href="/about" active={active === "about"}>
            About
          </NavLink>
          <NavLink href="/posts" active={active === "posts"}>
            Posts
          </NavLink>
          <NavLink href="/contact" active={active === "contact"}>
            Contact
          </NavLink>

          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50"
                aria-label="Open search"
              >
                <Search className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">Search</span>
              </button>
            </DialogTrigger>
            <DialogContent className="border-border bg-background sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Search</DialogTitle>
                <DialogDescription>
                  Full-text search across posts will plug in here (e.g. Pagefind,
                  Algolia, or a server route). This dialog is a production-shaped shell.
                </DialogDescription>
              </DialogHeader>
              <label
                className="mt-2 block text-sm font-medium text-foreground"
                htmlFor="blog-search-q"
              >
                Query
              </label>
              <input
                id="blog-search-q"
                type="search"
                placeholder="Try: react, accessibility, performance…"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50"
                autoComplete="off"
              />
            </DialogContent>
          </Dialog>

          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
}
