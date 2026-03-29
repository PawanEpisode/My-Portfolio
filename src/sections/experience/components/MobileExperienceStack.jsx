import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";

/** Mobile vertical timeline layout for the experience section. */
export default function MobileExperienceStack({ items }) {
  return (
    <section className="border-t border-border px-4 pb-20 pt-24 min-[360px]:px-6">
      <div className="mb-12 min-w-0">
        <p className="section-label">Career Path</p>
        <h2 className="section-title-main">
          Where I&apos;ve{" "}
          <em className="section-title-accent">shipped</em>
          {" "}things
        </h2>
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-accent-indigo via-accent-cyan to-accent-pink" />
        <div className="flex flex-col gap-6 pl-12">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -left-8 top-[22px] h-3 w-3 -translate-x-1/2 rounded-full bg-gradient-to-br from-accent-indigo to-accent-cyan shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
              <div className="rounded-2xl border border-border bg-surface p-5">
                <ExperienceCard item={item} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
