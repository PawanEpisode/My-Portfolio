import { motion, useScroll, useSpring } from "framer-motion";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./sections/hero/Hero";
import ExperienceStack from "./sections/experience/ExperienceStack";
import ProjectsStack from "./sections/projects/ProjectsStack";
import Skills from "./sections/skills/Skills";
import Certificates from "./sections/certificates/Certificates";
import Section from "./shared/components/Section";
import data from "./content/data";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  const { person, social, moreAboutMe, projects, certificates, timeline, conceptTags, skills } = data;

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }} className="min-h-screen">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Scroll progress bar */}
      <div className="fixed left-0 right-0 top-0 h-[2px] z-[9999] pointer-events-none overflow-hidden">
        <motion.div
          style={{
            scaleX,
            transformOrigin: "left",
            height: "100%",
            background: "linear-gradient(to right, #818cf8, #22d3ee, #f472b6)",
          }}
        />
      </div>

      <Header person={person} social={social} moreAboutMe={moreAboutMe} />

      <main>
        <Hero
          person={person}
          social={social}
          moreAboutMe={moreAboutMe}
          projects={projects}
          certificates={certificates}
        />

        {/*
          ExperienceStack, ProjectsStack, and Skills are rendered OUTSIDE <Section>
          intentionally. Their sticky scroll-driven layouts require position:sticky,
          which breaks inside Section's whileInView transform wrapper.
        */}
        <ExperienceStack timeline={timeline} id="experience" />
        <ProjectsStack projects={projects} id="projects" />
        <Skills skillValues={skills} conceptTags={conceptTags} id="skills" />

        <Section id="certificates" label="Achievements" title="*Certifications* & Badges">
          <Certificates certificates={certificates} />
        </Section>

        <Footer person={person} social={social} />
      </main>
    </div>
  );
}
