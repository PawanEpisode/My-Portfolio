"use client";

import { useFrontendTopic } from "@/apps/frontend/useFrontendTopic";
import FrontendHomePage from "@/apps/frontend/components/home/FrontendHomePage";
import FrontendTopicPlaceholder from "@/apps/frontend/pseudo/FrontendTopicPlaceholder";

export default function FrontendHomeGate() {
  const { routeKey } = useFrontendTopic();
  if (routeKey !== "home") {
    return <FrontendTopicPlaceholder routeKey={routeKey} />;
  }
  return <FrontendHomePage />;
}
