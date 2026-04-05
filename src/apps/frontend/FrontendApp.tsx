import { useEffect, useState } from "react";
import SubdomainAppShell from "../../shared/components/SubdomainAppShell";
import FrontendContactSection from "./FrontendContactSection";
import FrontendNavHeader from "./FrontendNavHeader";
import FrontendTopicPlaceholder from "./pseudo/FrontendTopicPlaceholder";

export default function FrontendApp() {
  const [routeKey, setRouteKey] = useState<string>("home");

  useEffect(() => {
    const prev = document.title;
    document.title = "Frontend · Pawan Kumar";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <SubdomainAppShell
      header={<FrontendNavHeader onNavigate={setRouteKey} />}
      contact={<FrontendContactSection />}
    >
      {routeKey === "home" ? (
        <>
          <header className="border-b border-border/60 px-6 py-6 md:px-10">
            <p className="font-['Syne',sans-serif] text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              frontend app
            </p>
            <h1 className="mt-2 font-['Syne',sans-serif] text-3xl font-bold tracking-tight md:text-4xl">
              Frontend
            </h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              UI experiments and frontend-focused content. Extend under{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
                src/apps/frontend/
              </code>
              .
            </p>
          </header>

          <main className="px-6 py-12 md:px-10">
            <p className="text-muted-foreground">
              Local dev:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
                http://frontend.localhost:5199
              </code>
              {" · "}
              Production-shaped URL: add{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
                127.0.0.1 frontend.meetpawan.com
              </code>{" "}
              to hosts, then{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
                http://frontend.meetpawan.com:5199
              </code>
              .
            </p>
          </main>
        </>
      ) : (
        <FrontendTopicPlaceholder routeKey={routeKey} onBack={() => setRouteKey("home")} />
      )}
    </SubdomainAppShell>
  );
}
