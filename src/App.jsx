import "./App.css";
import { motion, useScroll, useSpring } from "framer-motion";
import Section from "./components/Section";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Skills from "./components/Skills";
import data from "./content/data";
import Concepts from "./components/Concepts";
import Footer from "./components/Footer";
import GridLayout from "./components/GridLayout";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div className="bg-white dark:bg-black">
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 z-[1000]"
      />

      <Header />

      <main id="home" className="relative">
        <GridLayout />
        <Hero />

        <Section id="story" title="A Story in Milestones">
          <Timeline />
        </Section>

        <Section id="concepts" title="Concepts Covered">
          <Concepts />
        </Section>

        {data.projects.length > 0 && (
          <Section id="projects" title="Projects">
            <Projects />
          </Section>
        )}

        <Section id="skills" title="Skills">
          <Skills />
        </Section>

        <Section id="certificates" title="Certificates">
          <Certificates />
        </Section>

        <Footer />
      </main>
    </div>
  );
}
