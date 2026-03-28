import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Heart } from "lucide-react";

export default function Footer({ person, social }) {
  const { name, email, phone, location } = person;
  const { linkedin, github, followOnLinkedin } = social;
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-16 px-6 overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(129,140,248,0.05), transparent)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black"
                  style={{ background: "linear-gradient(135deg, #818cf8, #22d3ee)" }}
                >
                  PK
                </span>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    {name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Software Engineer
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Building fast, accessible, and delightful web experiences with modern frontend technologies.
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
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-indigo)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <Mail size={14} />
                {email}
              </a>
              <span className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                <Phone size={14} />
                {phone}
              </span>
              <span className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
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
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--surface)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <Github size={15} style={{ color: "var(--text-muted)" }} />
                </div>
                <span
                  className="text-sm transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  GitHub
                </span>
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(129,140,248,0.15)";
                    e.currentTarget.style.borderColor = "rgba(129,140,248,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--surface)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <Linkedin size={15} style={{ color: "var(--text-muted)" }} />
                </div>
                <span
                  className="text-sm transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  LinkedIn
                </span>
              </a>
              <a
                href={followOnLinkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-fit mt-2 text-sm"
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.8125rem" }}
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
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--text-subtle)" }}>
            Designed & built with{" "}
            <Heart size={11} style={{ color: "#f472b6", fill: "#f472b6" }} />
            {" "}by {name}
          </p>
          <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
            © {year} · All rights reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
