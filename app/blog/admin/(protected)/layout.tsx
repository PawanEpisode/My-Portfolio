import { requireAuthor } from "@/apps/blog/admin/requireAuthor";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BlogAdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuthor();
  return (
    <div className="border-b border-border bg-surface/50">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-3">
        <Link href="/" className="text-sm font-medium text-muted hover:text-foreground">
          ← Blog
        </Link>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/admin" className="text-foreground">
            Dashboard
          </Link>
          <Link href="/admin/posts/new" className="text-muted hover:text-foreground">
            New post
          </Link>
        </nav>
      </div>
      <TooltipProvider delayDuration={350}>
        <div className="mx-auto max-w-4xl px-6 py-10">{children}</div>
      </TooltipProvider>
    </div>
  );
}
