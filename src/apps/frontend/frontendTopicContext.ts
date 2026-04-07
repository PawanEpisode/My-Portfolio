import { createContext } from "react";

export interface FrontendTopicContextValue {
  routeKey: string;
  navigateToTopic: (key: string) => void;
  navigateHome: () => void;
}

export const FrontendTopicContext = createContext<FrontendTopicContextValue | null>(
  null
);
