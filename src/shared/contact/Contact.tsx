import { motion } from "framer-motion";
import ContactForm from "./components/ContactForm";

export default function Contact({ person, social }) {
  return (
    <section id="contact" className="relative border-t border-border py-12 px-4">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(129,140,248,0.07),transparent)]" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          Get in touch
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="section-title-main mb-4 text-center w-[90%] lg:w-full"
        >
          {"Let's build something "}
          <span className="section-title-accent">remarkable</span>
          {" together"}
        </motion.h2>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 text-base text-muted text-center w-full"
        >
          Have a project in mind? I respond within 24 hours and am open to exciting
          collaborations.
        </motion.p>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <ContactForm person={person} social={social} />
        </motion.div>
      </div>
    </section>
  );
}
