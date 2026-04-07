import type { Metadata } from "next";
import PortfolioApp from "@/apps/portfolio/PortfolioApp";

export const metadata: Metadata = {
  title: "Pawan Kumar · Portfolio",
  description:
    "Software engineer — portfolio, projects, experience, certifications, and contact.",
  openGraph: {
    title: "Pawan Kumar · Portfolio",
    description:
      "Software engineer — portfolio, projects, experience, certifications, and contact.",
    images: [{ url: "/assets/my-image.jpeg" }],
  },
};

export default function HomePage() {
  return <PortfolioApp />;
}
