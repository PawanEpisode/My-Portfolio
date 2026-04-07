"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import SubdomainAppShell from "@/shared/components/SubdomainAppShell";
import FrontendNavHeader from "./FrontendNavHeader";
import { FrontendTopicProvider } from "./FrontendTopicProvider";

export default function FrontendLayoutClient({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [routeKey, setRouteKey] = useState("home");

  const navigateToTopic = useCallback(
    (key: string) => {
      setRouteKey(key);
      router.push("/");
    },
    [router]
  );

  const navigateHome = useCallback(() => {
    setRouteKey("home");
  }, []);

  const topicValue = useMemo(
    () => ({
      routeKey,
      navigateToTopic,
      navigateHome,
    }),
    [routeKey, navigateToTopic, navigateHome]
  );

  return (
    <FrontendTopicProvider value={topicValue}>
      <SubdomainAppShell
        header={
          <FrontendNavHeader onNavigateTopic={navigateToTopic} onHome={navigateHome} />
        }
      >
        {children}
      </SubdomainAppShell>
    </FrontendTopicProvider>
  );
}
