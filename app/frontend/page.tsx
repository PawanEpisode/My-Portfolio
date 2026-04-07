import type { Metadata } from "next";
import FrontendHomeGate from "./FrontendHomeGate";

export const metadata: Metadata = {
  title: "Frontend",
  description: "Frontend learning hub — interviews, preparation, and craft",
  openGraph: {
    title: "Frontend · Pawan Kumar",
    description: "Frontend learning hub — interviews, preparation, and craft",
  },
};

export default function FrontendHome() {
  return <FrontendHomeGate />;
}
