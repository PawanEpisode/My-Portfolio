import { useEffect, useState } from "react";
import SubdomainAppShell from "../../shared/components/SubdomainAppShell";
import { normalizePathname, useClientPath } from "../../shared/hooks/useClientPath";
import FrontendContactSection from "./FrontendContactSection";
import FrontendNavHeader from "./FrontendNavHeader";
import FrontendHomePage from "./components/home/FrontendHomePage";
import FrontendTopicPlaceholder from "./pseudo/FrontendTopicPlaceholder";

export default function FrontendApp() {
  const { pathname, navigate } = useClientPath();
  const [routeKey, setRouteKey] = useState<string>("home");
  const isContact = normalizePathname(pathname) === "/contact";

  useEffect(() => {
    const prev = document.title;
    document.title = isContact
      ? "Contact · Frontend · Pawan Kumar"
      : "Frontend · Pawan Kumar";
    return () => {
      document.title = prev;
    };
  }, [isContact]);

  const handleTopic = (key: string) => {
    setRouteKey(key);
    navigate("/");
  };

  const handleHome = () => {
    setRouteKey("home");
    navigate("/");
  };

  return (
    <SubdomainAppShell
      header={
        <FrontendNavHeader
          contactActive={isContact}
          onNavigatePath={navigate}
          onNavigateTopic={handleTopic}
          onHome={handleHome}
        />
      }
    >
      {isContact ? (
        <main>
          <FrontendContactSection />
        </main>
      ) : routeKey === "home" ? (
        <FrontendHomePage onNavigateTopic={handleTopic} onNavigatePath={navigate} />
      ) : (
        <FrontendTopicPlaceholder routeKey={routeKey} />
      )}
    </SubdomainAppShell>
  );
}
