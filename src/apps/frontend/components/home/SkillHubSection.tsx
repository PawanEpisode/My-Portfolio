import { motion } from "framer-motion";
import { HUB_SECTION } from "../../data/homeCopy";
import FrontendConceptsMindMap from "./FrontendConceptsMindMap";

export interface SkillHubSectionProps {
  id?: string;
}

export default function SkillHubSection({ id }: SkillHubSectionProps) {
  return (
    <section
      id={id}
      className="border-t border-border/60 px-6 py-16 md:px-10 md:py-24"
      aria-labelledby="skill-hub-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label"
        >
          {HUB_SECTION.label}
        </motion.p>
        <motion.h2
          id="skill-hub-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title-main max-w-3xl"
        >
          {HUB_SECTION.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 max-w-2xl text-muted md:text-lg"
        >
          {HUB_SECTION.body}
        </motion.p>
      </div>
      <FrontendConceptsMindMap />
    </section>
  );
}
