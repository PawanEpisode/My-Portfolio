import { getHostAppComponent } from "./config/hostApps";
import PortfolioApp from "./apps/PortfolioApp";

export default function App() {
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const HostApp = getHostAppComponent(hostname);
  if (HostApp) return <HostApp />;
  return <PortfolioApp />;
}
