import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X, FileText } from "lucide-react";
import { useScrolled } from "../shared/hooks/useScrolled";
import ThemeToggleButton from "../theme/ThemeToggleButton.jsx";

const LOGO_SRC = "/assets/pk_logo_comet.gif";

const NAV_ITEMS = [
  { label: "Experience",   href: "#experience" },
  { label: "Projects",     href: "#projects" },
  { label: "Skills",       href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact Me",      href: "#contact" },
];

export default function Header({ person, social, moreAboutMe }) {
  const { name }           = person;
  const { linkedin, github } = social;
  const { resumeViewLink } = moreAboutMe;

  const scrolled = useScrolled(40);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[500] flex justify-center pt-4 px-4"
      >
        <div
          className={`w-full max-w-4xl rounded-2xl px-4 py-3 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "glass-elevated shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "glass"
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            {/* <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#818cf8] to-[#22d3ee] text-sm font-bold text-white">
              {initials}
            </span> */}
            <img src={LOGO_SRC} alt="Logo" className="w-8 h-8 rounded-full" />
            <span className="hidden text-sm font-semibold text-foreground sm:block">
              {name}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted transition-all duration-200 hover:bg-white/8 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggleButton />

            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:bg-surface-hover hover:text-foreground"
            >
              <Github size={16} />
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all duration-200 hover:bg-[rgba(129,140,248,0.1)] hover:text-accent-indigo"
            >
              <Linkedin size={16} />
            </a>

            <a
              href={resumeViewLink}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-lg border border-[rgba(129,140,248,0.25)] bg-gradient-to-br from-[rgba(129,140,248,0.15)] to-[rgba(34,211,238,0.1)] px-3 py-1.5 text-xs font-semibold text-accent-indigo transition-all duration-200 hover:from-[rgba(129,140,248,0.25)] hover:to-[rgba(34,211,238,0.15)] sm:flex"
            >
              <FileText size={13} />
              Resume
            </a>

            {/* Mobile menu toggle */}
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-muted md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="glass-elevated fixed top-[72px] left-4 right-4 z-[499] flex flex-col gap-1 rounded-2xl border border-border p-4 shadow-[0_16px_48px_rgba(0,0,0,0.2)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-muted transition-all duration-200 hover:bg-surface-hover hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
