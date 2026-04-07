"use client";

import type { ReactNode } from "react";
import {
  FrontendTopicContext,
  type FrontendTopicContextValue,
} from "./frontendTopicContext";

export function FrontendTopicProvider({
  value,
  children,
}: {
  value: FrontendTopicContextValue;
  children: ReactNode;
}) {
  return (
    <FrontendTopicContext.Provider value={value}>
      {children}
    </FrontendTopicContext.Provider>
  );
}
