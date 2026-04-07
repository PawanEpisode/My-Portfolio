import type { Metadata } from "next";
import FrontendContactSection from "@/apps/frontend/FrontendContactSection";

export const metadata: Metadata = {
  title: "Contact · Frontend",
  description: "Get in touch — Frontend · Pawan Kumar",
  openGraph: {
    title: "Contact · Frontend · Pawan Kumar",
  },
};

export default function FrontendContactPage() {
  return (
    <main>
      <FrontendContactSection />
    </main>
  );
}
