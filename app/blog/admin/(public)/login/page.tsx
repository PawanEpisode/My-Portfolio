import type { Metadata } from "next";
import AdminLoginForm from "@/apps/blog/admin/AdminLoginForm";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function BlogAdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight">
        Blog admin
      </h1>
      <p className="mt-2 text-sm text-muted">
        Sign in with a magic link or Google. You need the{" "}
        <span className="text-foreground">author</span> role in Supabase to manage
        posts.
      </p>
      <Suspense fallback={<p className="mt-8 text-sm text-muted">Loading…</p>}>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
