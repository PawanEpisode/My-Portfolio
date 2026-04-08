"use client";

import { getSupabaseBrowserClient } from "@/shared/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/shared/utils/cn";

export default function BlogAdminNavLink({ className }: { className?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user || cancelled) return;
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();
        if (!cancelled && profile?.role === "author") setShow(true);
      } catch {
        /* missing env / not signed in */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!show) return null;

  return (
    <Link
      href="/admin"
      className={cn(
        "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50",
        className
      )}
    >
      Admin
    </Link>
  );
}
