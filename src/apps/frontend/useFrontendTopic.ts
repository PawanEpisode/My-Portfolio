"use client";

import { useContext } from "react";
import { FrontendTopicContext } from "./frontendTopicContext";

export function useFrontendTopic() {
  const ctx = useContext(FrontendTopicContext);
  if (!ctx) {
    throw new Error("useFrontendTopic must be used within FrontendTopicProvider");
  }
  return ctx;
}
