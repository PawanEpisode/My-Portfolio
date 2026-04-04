import { useEffect } from "react";

export default function BlogApp() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Blog · Pawan Kumar";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="noise-overlay" />

      <header className="border-b border-border/60 px-6 py-6 md:px-10">
        <p className="font-['Syne',sans-serif] text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          blog app
        </p>
        <h1 className="mt-2 font-['Syne',sans-serif] text-3xl font-bold tracking-tight md:text-4xl">
          Writing
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Posts and notes live here. Build this page out under{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            src/apps/BlogApp.jsx
          </code>
          .
        </p>
      </header>

      <main className="px-6 py-12 md:px-10">
        <p className="text-muted-foreground">
          Local dev (no hosts file):{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            http://blog.localhost:5199
          </code>
          {" · "}
          Or mirror production:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            127.0.0.1 blog.meetpawan.com
          </code>{" "}
          in hosts →{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
            http://blog.meetpawan.com:5199
          </code>
          .
        </p>
      </main>
    </div>
  );
}
