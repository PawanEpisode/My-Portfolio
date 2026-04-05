import { motion, useReducedMotion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import ContactForm from "./components/ContactForm";
import { cn } from "../utils/cn";

/**
 * Two-column contact layout for subdomain / educational surfaces.
 * Copy is supplied by the host app; the form stays shared.
 */
export default function EducationalContactSection({
  label,
  title,
  description,
  bullets,
  footnote,
  person,
  social,
  formClassName,
}) {
  const reduceMotion = useReducedMotion();

  const block = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
      };

  return (
    <section
      id="contact"
      aria-labelledby="subdomain-contact-heading"
      className="relative border-t border-border"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_0%_100%,rgba(34,211,238,0.06),transparent)] dark:bg-[radial-gradient(ellipse_70%_45%_at_0%_100%,rgba(129,140,248,0.08),transparent)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-start">
          <div className="lg:col-span-5">
            <motion.p
              {...block}
              transition={{ duration: 0.45 }}
              className="section-label"
            >
              {label}
            </motion.p>

            <motion.h2
              {...block}
              id="subdomain-contact-heading"
              transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="section-title-main mt-3 text-balance text-left"
            >
              {title}
            </motion.h2>

            <motion.p
              {...block}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-base leading-relaxed text-muted"
            >
              {description}
            </motion.p>

            <ul className="mt-8 space-y-3 text-sm leading-relaxed text-foreground/90">
              {bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <CircleCheck
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-indigo opacity-90"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {footnote ? (
              <motion.p
                {...block}
                transition={{ duration: 0.45, delay: 0.18 }}
                className="mt-8 text-sm leading-relaxed text-muted"
              >
                {footnote}
              </motion.p>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            <motion.div
              {...block}
              transition={{
                duration: 0.6,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ContactForm
                person={person}
                social={social}
                className={cn(
                  "shadow-sm shadow-black/5 dark:shadow-black/20",
                  formClassName
                )}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
