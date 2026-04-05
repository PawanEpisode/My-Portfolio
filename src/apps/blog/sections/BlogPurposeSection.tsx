import { motion } from "framer-motion";

export default function BlogPurposeSection() {
  return (
    <section
      className="relative border-b border-border/60 py-16 md:py-20"
      aria-labelledby="blog-purpose-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(129,140,248,0.06),transparent)]" />
      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="section-label"
        >
          Why this exists
        </motion.p>
        <motion.h1
          id="blog-purpose-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="section-title-main max-w-3xl"
        >
          Notes for builders who care about{" "}
          <span className="section-title-accent">clarity</span> and craft.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-6 max-w-2xl space-y-4 text-base text-muted md:text-lg"
        >
          <p>
            This blog is a place for long-form writing on frontend engineering,
            interviews, and the small decisions that make interfaces feel
            trustworthy—performance, accessibility, and APIs teammates can reason about.
          </p>
          <p>
            Expect practical breakdowns, outlines you can reuse, and honest
            trade-offs—not hype cycles. Start with the featured piece below, browse by
            topic, or jump to the full archive when you are ready to go deeper.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
