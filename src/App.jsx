import { motion, useScroll, useSpring } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ExperienceStack from "./components/ExperienceStack";
import ProjectsStack from "./components/ProjectsStack";
import Certificates from "./components/Certificates";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Section from "./components/Section";
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
      {/* Noise texture */}
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
          ExperienceStack rendered OUTSIDE <Section> intentionally.
          The sticky scroll-driven layout needs no transform-creating
          ancestor — Section's whileInView wrapper breaks position:sticky.
        */}
        <ExperienceStack timeline={timeline} id="experience" />

        {/*
          ProjectsStack rendered OUTSIDE <Section> intentionally.
          The sticky scroll-driven layout needs no transform-creating
          ancestor — Section's whileInView wrapper breaks position:sticky.
        */}
        <ProjectsStack projects={projects} id="projects" />

        {/*
          Skills rendered OUTSIDE <Section> intentionally.
          The sticky scroll-driven layout needs no transform-creating
          ancestor — Section's whileInView wrapper breaks position:sticky.
        */}
        <Skills skillValues={skills} conceptTags={conceptTags} id="skills" />

        <Section id="certificates" label="Achievements" title="*Certifications* & Badges">
          <Certificates certificates={certificates} />
        </Section>

        <Footer person={person} social={social} />
      </main>
    </div>
  );
}
