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

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div className="bg-[radial-gradient(1000px_600px_at_10%_-10%,rgba(99,102,241,0.15),transparent),radial-gradient(800px_400px_at_90%_10%,rgba(236,72,153,0.12),transparent)] min-h-screen text-slate-900 dark:text-white bg-white dark:bg-black">
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 h-1 origin-left bg-gradient-to-r dark:from-yellow dark:via-white/20 dark:to-red-600/20 from-indigo-500 via-fuchsia-500 to-pink-500 z-50"
      />

      <Header />

      <main id="home" className="mx-auto max-w-5xl px-4">
        <Hero />

        <Section id="story" title="A Story in Milestones">
          <Timeline />
        </Section>

        <Section id="skills" title="Skills">
          <Skills />
        </Section>

        {data.projects.length > 0 && (
          <Section id="projects" title="Projects">
            <Projects />
          </Section>
        )}

        {data.certificates.length > 0 && (
          <Section id="certificates" title="Certificates">
            <Certificates />
          </Section>
        )}

        <footer className="py-16 text-center text-slate-600 dark:text-white/60">
          © {new Date().getFullYear()} Pawan Kumar
        </footer>
      </main>
    </div>
  );
}
