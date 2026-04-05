import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Button } from "../../../shared/components/ui/button";

const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function BlogNewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!emailOk(trimmed)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    // TODO: wire to provider (e.g. Buttondown, Resend, Supabase) — keep keys server-side.
    console.info("[newsletter] signup:", trimmed);
  };

  return (
    <section className="py-16 md:py-24" aria-labelledby="newsletter-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl border border-border bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(129,140,248,0.12),transparent)] px-6 py-10 md:px-12 md:py-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_100%,rgba(34,211,238,0.08),transparent)]" />
        <div className="relative z-10 mx-auto max-w-xl text-center">
          <p className="mb-3 font-['DM_Mono',monospace] text-xs font-semibold uppercase tracking-[0.14em] text-accent-indigo">
            Newsletter
          </p>
          <h2
            id="newsletter-heading"
            className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight md:text-3xl"
          >
            New posts in your inbox
          </h2>
          <p className="mt-3 text-muted">
            Roughly monthly—long articles, no spam. Unsubscribe anytime.
          </p>

          {status === "success" ? (
            <p className="mt-8 text-sm font-medium text-accent-cyan" role="status">
              Thanks. You are on the list—we will be in touch when the next piece ships.
            </p>
          ) : (
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch"
              onSubmit={handleSubmit}
              noValidate
            >
              <label htmlFor="blog-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="blog-newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(ev) => {
                  setEmail(ev.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                className="min-h-11 flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo/50"
                aria-invalid={status === "error"}
                aria-describedby={
                  status === "error" ? "newsletter-email-error" : undefined
                }
              />
              <Button type="submit" className="shrink-0 sm:min-w-[140px]">
                Subscribe
              </Button>
            </form>
          )}
          {status === "error" ? (
            <p
              id="newsletter-email-error"
              className="mt-2 text-sm text-accent-pink"
              role="alert"
            >
              Enter a valid email address.
            </p>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
