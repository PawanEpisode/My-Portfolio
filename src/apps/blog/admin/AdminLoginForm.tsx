"use client";

import { getSupabaseBrowserClient } from "@/shared/lib/supabase";
import { Button } from "@/shared/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MAGIC_LINK_WATCH_KEY = "blog_admin_magic_link_watch";
const POLL_MS = 2000;
const MAX_WAIT_MS = 10 * 60 * 1000;

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const err = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  /** Resume watching if the user refreshed after requesting a link (same browser, within 10 minutes). */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(MAGIC_LINK_WATCH_KEY);
      if (!raw) return;
      const start = parseInt(raw, 10);
      if (Number.isNaN(start) || Date.now() - start > MAX_WAIT_MS) {
        sessionStorage.removeItem(MAGIC_LINK_WATCH_KEY);
        return;
      }
      setStatus("sent");
      setMessage(
        "Finish signing in from the link in your email (it may open in another tab). This page will go to the dashboard as soon as you are signed in."
      );
    } catch {
      /* sessionStorage unavailable */
    }
  }, []);

  /** Poll for session cookies set by the magic-link tab (/auth/callback). */
  useEffect(() => {
    if (status !== "sent") return;

    let cancelled = false;
    const started = Date.now();

    async function checkSession() {
      if (cancelled || Date.now() - started > MAX_WAIT_MS) {
        sessionStorage.removeItem(MAGIC_LINK_WATCH_KEY);
        if (!cancelled && Date.now() - started > MAX_WAIT_MS) {
          setMessage((prev) =>
            prev?.includes("Finish signing in")
              ? "Sign-in link expired or timed out. Request a new magic link if you still need to sign in."
              : prev
          );
        }
        return true;
      }
      try {
        const supabase = getSupabaseBrowserClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user && !cancelled) {
          sessionStorage.removeItem(MAGIC_LINK_WATCH_KEY);
          router.replace("/admin");
          router.refresh();
          return true;
        }
      } catch {
        /* env missing or network */
      }
      return false;
    }

    const id = setInterval(() => {
      void checkSession().then((done) => {
        if (done) {
          clearInterval(id);
        }
      });
    }, POLL_MS);

    void checkSession().then((done) => {
      if (done) clearInterval(id);
    });

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [status, router]);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const origin = window.location.origin;
      // Must match an entry in Supabase Auth → Redirect URLs exactly (query strings
      // often do not match a path-only allowlist, and Supabase falls back to Site URL).
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });
      if (error) throw error;
      try {
        sessionStorage.setItem(MAGIC_LINK_WATCH_KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
      setStatus("sent");
      setMessage(
        "We sent a sign-in link. Open it from your email (often in a new tab). You can stay on this page — we will send you to the dashboard automatically once sign-in completes."
      );
    } catch (e: unknown) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Could not send link");
    }
  }

  async function signInWithGoogle() {
    setStatus("sending");
    setMessage(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${origin}/auth/callback` },
      });
      if (error) throw error;
    } catch (e: unknown) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Google sign-in failed");
    }
  }

  const errorHint =
    err === "forbidden"
      ? "Your account is signed in but does not have the author role yet. Ask the project owner to run the SQL promotion step."
      : err === "exchange"
        ? "Session exchange failed. Try signing in again."
        : err
          ? "Something went wrong. Try again."
          : null;

  return (
    <div className="mt-8 space-y-6">
      {errorHint ? (
        <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-900 dark:text-amber-200">
          {errorHint}
        </p>
      ) : null}

      <form onSubmit={sendMagicLink} className="space-y-4">
        <div>
          <label
            htmlFor="admin-email"
            className="block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50"
            placeholder="you@example.com"
          />
        </div>
        <Button
          type="submit"
          disabled={status === "sending"}
          className="w-full sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Email magic link"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wide">
          <span className="bg-background px-2 text-muted">or</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-border"
        onClick={signInWithGoogle}
      >
        Continue with Google
      </Button>

      {message ? (
        <p className="text-sm text-muted" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
