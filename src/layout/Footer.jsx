import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Heart } from "lucide-react";
import { Logo } from "../assets/index.jsx";

export default function Footer({ person, social }) {
  const { name, email, phone, location } = person;
  const { linkedin, github, followOnLinkedin } = social;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(129,140,248,0.05),transparent)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <img src={Logo} alt="Logo" className="w-8 h-8 rounded-full" />
                <p className="text-sm font-bold text-foreground">{name}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                Building fast, accessible, and delightful web experiences with
                modern frontend technologies.
              </p>
            </motion.div>
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1"
          >
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent-indigo"
              >
                <Mail size={14} />
                {email}
              </a>
              <span className="flex items-center gap-2 text-sm text-muted">
                <Phone size={14} />
                {phone}
              </span>
              <span className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={14} />
                {location}
              </span>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1"
          >
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface transition-all duration-200 hover:border-border-hover hover:bg-white/[0.08]">
                  <Github size={15} className="text-muted" />
                </div>
                <span className="text-sm text-muted transition-colors group-hover:text-foreground">
                  GitHub
                </span>
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface transition-all duration-200 hover:border-[rgba(129,140,248,0.35)] hover:bg-[rgba(129,140,248,0.15)]">
                  <Linkedin size={15} className="text-muted" />
                </div>
                <span className="text-sm text-muted transition-colors group-hover:text-foreground">
                  LinkedIn
                </span>
              </a>

              <a
                href={followOnLinkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-2 w-fit px-5 py-2 text-[0.8125rem]"
              >
                Follow on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row"
        >
          <p className="flex items-center gap-1.5 text-xs text-subtle">
            Designed &amp; built with{" "}
            <Heart size={11} className="fill-[#f472b6] text-[#f472b6]" /> by{" "}
            {name}
          </p>
          <p className="text-xs text-subtle">© {year} · All rights reserved</p>
        </motion.div>
      </div>
    </footer>
  );
}
