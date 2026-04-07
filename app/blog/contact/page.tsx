import type { Metadata } from "next";
import BlogContactSection from "@/apps/blog/BlogContactSection";

export const metadata: Metadata = {
  title: "Contact · Blog",
  description: "Get in touch — Blog · Pawan Kumar",
  openGraph: {
    title: "Contact · Blog · Pawan Kumar",
  },
};

export default function BlogContactPage() {
  return (
    <main>
      <BlogContactSection />
    </main>
  );
}
