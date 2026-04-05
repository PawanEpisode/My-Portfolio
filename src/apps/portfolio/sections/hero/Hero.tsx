import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ROLES } from "./constants";
import { useTypewriter } from "./hooks/useTypewriter";
import HeroBackground from "./components/HeroBackground";
import HeroContent from "./components/HeroContent";
import HeroProfileCard from "./components/HeroProfileCard";
import ScrollIndicator from "./components/ScrollIndicator";

export default function Hero({ person, social, moreAboutMe, projects, certificates }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const typewriterText = useTypewriter(ROLES);
  const { resumeDownloadLink } = moreAboutMe;

  const stats = [
    { value: "4+", label: "Years of Experience" },
    { value: `${projects.length}+`, label: "Projects Built" },
    { value: certificates.length, label: "Certifications" },
    { value: "5", label: "Companies" },
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-[88px]"
    >
      <HeroBackground />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-88px)]">
          <HeroContent
            person={person}
            resumeDownloadLink={resumeDownloadLink}
            stats={stats}
            typewriterText={typewriterText}
          />
          <HeroProfileCard person={person} social={social} />
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
