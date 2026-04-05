import { motion } from "framer-motion";
import { VALUE_PROPS } from "../../data/homeCopy";

export default function FrontendValueSection() {
  return (
    <section
      className="border-t border-border/60 px-6 py-16 md:px-10 md:py-20"
      aria-labelledby="value-props-title"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label"
        >
          Why use this space
        </motion.p>
        <motion.h2
          id="value-props-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-['Syne',sans-serif] text-2xl font-bold tracking-tight md:text-3xl"
        >
          Built for depth, not checkbox tutorials
        </motion.h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {VALUE_PROPS.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-border bg-[var(--card-elevated-bg)] p-6 ring-1 ring-inset ring-[var(--card-elevated-border)]"
            >
              <h3 className="font-['Syne',sans-serif] text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted md:text-base">{item.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
