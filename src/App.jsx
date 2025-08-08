import "./App.css";
import { cn } from "./lib/utils";
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

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div className="bg-white dark:bg-black">
      {/* Grid backgrounds */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 z-[1000]"
      />

      <Header />

      <main id="home" className="mx-auto max-w-5xl px-4 relative z-50">
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
