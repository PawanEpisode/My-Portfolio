import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";

/** Mobile vertical timeline layout for the experience section. */
export default function MobileExperienceStack({ items }) {
  return (
    <section className="py-20 px-6" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mb-12">
        <p className="section-label">Career Path</p>
        <h2 className="section-title-main" style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}>
          Where I&apos;ve{" "}
          <em className="section-title-accent">shipped</em>
          {" "}things
        </h2>
      </div>

      <div className="relative">
        <div
          className="absolute left-4 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, var(--accent-indigo), var(--accent-cyan), var(--accent-pink))" }}
        />
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
              <div
                style={{
                  position: "absolute", left: "-32px", top: "22px",
                  width: 12, height: 12, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))",
                  boxShadow: "0 0 8px rgba(129,140,248,0.5)",
                  transform: "translateX(-50%)",
                }}
              />
              <div style={{ borderRadius: 16, padding: 20, background: "var(--surface)", border: "1px solid var(--border)" }}>
                <ExperienceCard item={item} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
