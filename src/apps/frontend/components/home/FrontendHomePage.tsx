"use client";

import { useRouter } from "next/navigation";
import { useFrontendTopic } from "../../useFrontendTopic";
import FrontendExploreTopicsSection from "./FrontendExploreTopicsSection";
import FrontendHeroSection from "./FrontendHeroSection";
import FrontendValueSection from "./FrontendValueSection";
import SkillHubSection from "./SkillHubSection";

const SKILL_HUB_ANCHOR = "frontend-skill-hub";

export default function FrontendHomePage() {
  const router = useRouter();
  const { navigateToTopic } = useFrontendTopic();

  const scrollToHub = () => {
    document
      .getElementById(SKILL_HUB_ANCHOR)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative">
      <FrontendHeroSection
        onScrollToHub={scrollToHub}
        onContact={() => router.push("/contact")}
      />
      <main className="mx-auto w-full max-w-6xl">
        <SkillHubSection id={SKILL_HUB_ANCHOR} />
        <FrontendValueSection />
        <FrontendExploreTopicsSection onNavigateTopic={navigateToTopic} />
      </main>
    </div>
  );
}
