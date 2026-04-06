import FrontendExploreTopicsSection from "./FrontendExploreTopicsSection";
import FrontendHeroSection from "./FrontendHeroSection";
import FrontendValueSection from "./FrontendValueSection";
import SkillHubSection from "./SkillHubSection";

const SKILL_HUB_ANCHOR = "frontend-skill-hub";

export interface FrontendHomePageProps {
  onNavigateTopic: (routeKey: string) => void;
  onNavigatePath: (path: string) => void;
}

export default function FrontendHomePage({
  onNavigateTopic,
  onNavigatePath,
}: FrontendHomePageProps) {
  const scrollToHub = () => {
    document
      .getElementById(SKILL_HUB_ANCHOR)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative">
      <FrontendHeroSection
        onScrollToHub={scrollToHub}
        onContact={() => onNavigatePath("/contact")}
      />
      <main className="mx-auto w-full max-w-6xl">
        <SkillHubSection id={SKILL_HUB_ANCHOR} />
        <FrontendValueSection />
        <FrontendExploreTopicsSection onNavigateTopic={onNavigateTopic} />
      </main>
    </div>
  );
}
