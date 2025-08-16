import { motion, useScroll, useSpring } from "framer-motion";
import Section from "./components/Section";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Skills from "./components/Skills";
import Concepts from "./components/Concepts";
import Footer from "./components/Footer";
import GridLayout from "./components/GridLayout";
import data from "./content/data";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const { person, social, moreAboutMe, extensiveSkills, projects, certificates, timeline, conceptTags, skills } = data;

  return (
    <div className="bg-white dark:bg-black">
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 z-[1000]"
      />

      <Header
        person={person}
        social={social}
        moreAboutMe={moreAboutMe}
        extensiveSkills={extensiveSkills}
        projects={projects}
        certificates={certificates}
      />

      <main id="home" className="relative">
        <GridLayout />
        <Hero
          person={person}
          social={social}
          moreAboutMe={moreAboutMe}
          extensiveSkills={extensiveSkills}
          projects={projects}
          certificates={certificates}
        />

        <Section id="story" title="A Story in Milestones">
          <Timeline timeline={timeline} />
        </Section>

        <Section id="concepts" title="Concepts Covered">
          <Concepts conceptTags={conceptTags} />
        </Section>

        {projects.length > 0 && (
          <Section id="projects" title="Projects">
            <Projects projects={projects} />
          </Section>
        )}

        <Section id="skills" title="Skills">
          <Skills skillValues={skills} />
        </Section>

        <Section id="certificates" title="Certificates">
          <Certificates certificates={certificates} />
        </Section>

        <Footer person={person} social={social} />
      </main>
    </div>
  );
}
