import { motion } from "framer-motion";

export default function Section({ id, title, children }) {
  return (
    <section id={id} className="py-16 max-w-5xl px-4 mx-auto relative z-2">
      <div className="mx-auto max-w-5xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold mb-10 text-gradient"
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
}
