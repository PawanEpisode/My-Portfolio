import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, Download, MapPin, Mail, ExternalLink, GitBranch, Star } from "lucide-react";

/* Core tech shown as devicons in the Hero — uses the globally
   loaded devicons CSS from index.html (cdn.jsdelivr.net)        */
const CORE_TECH = [
  { name: "React",       icon: "devicon-react-original colored" },
  { name: "TypeScript",  icon: "devicon-typescript-plain colored" },
  { name: "Next.js",     icon: "devicon-nextjs-plain" },
  { name: "Tailwind",    icon: "devicon-tailwindcss-plain colored" },
  { name: "Node.js",     icon: "devicon-nodejs-plain colored" },
  { name: "Docker",      icon: "devicon-docker-plain colored" },
  { name: "AWS",         icon: "devicon-amazonwebservices-plain colored" },
  { name: "Git",         icon: "devicon-git-plain colored" },
];

const ROLES = [
  "Frontend Engineer",
  "React Specialist",
  "UI/UX Craftsman",
  "Platform Builder",
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ person, social, moreAboutMe, projects, certificates }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const typewriterText = useTypewriter(ROLES);

  const { name, profilePhoto, location, email, summary } = person;
  const { github, followOnLinkedin } = social;
  const { resumeDownloadLink } = moreAboutMe;

  const firstName = name.split(" ")[0];
  const lastName = name.split(" ").slice(1).join(" ");

  const stats = [
    { value: "4+", label: "Years of Experience" },
    { value: projects.length + "+", label: "Projects Built" },
    { value: certificates.length, label: "Certifications" },
    { value: "5", label: "Companies" },
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: "88px" }}
    >
      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="orb-1 absolute"
          style={{
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle at center, rgba(129,140,248,0.14), transparent 68%)",
            top: "-200px",
            left: "-180px",
          }}
        />
        <motion.div
          className="orb-2 absolute"
          style={{
            width: 550,
            height: 550,
            borderRadius: "50%",
            background: "radial-gradient(circle at center, rgba(34,211,238,0.10), transparent 68%)",
            bottom: "-150px",
            right: "-100px",
          }}
        />
        <motion.div
          className="orb-3 absolute"
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle at center, rgba(244,114,182,0.08), transparent 68%)",
            top: "40%",
            left: "60%",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-88px)]">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
                style={{
                  background: "rgba(129,140,248,0.1)",
                  border: "1px solid rgba(129,140,248,0.25)",
                  color: "var(--accent-indigo)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#22d3ee", animation: "glow-pulse 2s ease-in-out infinite" }}
                />
                Available for opportunities
              </div>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1 className="font-black leading-[0.92] tracking-tight" style={{ overflow: "visible" }}>
                <span
                  className="block text-gradient"
                  style={{
                    fontSize: "clamp(3.5rem, 9vw, 5rem)",
                    display: "block",
                    paddingRight: "0.08em",
                    overflow: "visible",
                  }}
                >
                  {firstName}
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: "clamp(3.5rem, 9vw, 5rem)",
                    color: "var(--text-primary)",
                    overflow: "visible",
                  }}
                >
                  {lastName}
                </span>
              </h1>
            </motion.div>

            {/* Typewriter */}
            <motion.div variants={itemVariants} className="mt-4 flex items-center gap-2">
              <span
                className="text-xl md:text-2xl font-semibold"
                style={{ color: "var(--text-muted)" }}
              >
                {typewriterText}
                <span
                  className="ml-0.5 inline-block w-0.5 h-6 align-middle"
                  style={{
                    background: "var(--accent-cyan)",
                    animation: "blink 1s step-end infinite",
                    verticalAlign: "middle",
                    marginBottom: "2px",
                  }}
                />
              </span>
            </motion.div>

            {/* Summary */}
            <motion.p
              variants={itemVariants}
              className="mt-5 text-base leading-relaxed max-w-lg"
              style={{ color: "var(--text-muted)" }}
            >
              {summary}
            </motion.p>

            {/* Location + Email */}
            <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-4">
              <span
                className="inline-flex items-center gap-1.5 text-sm"
                style={{ color: "var(--text-subtle)" }}
              >
                <MapPin size={13} />
                {location}
              </span>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: "var(--text-subtle)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-indigo)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
              >
                <Mail size={13} />
                {email}
              </a>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">
                View My Work
                <ExternalLink size={15} />
              </a>
              <a
                href={resumeDownloadLink}
                className="btn-ghost"
                download
              >
                <Download size={15} />
                Download Resume
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-10 grid grid-cols-4 gap-4 pt-8"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-black text-gradient-static">
                    {stat.value}
                  </span>
                  <span className="text-xs mt-0.5 leading-tight" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Core tech stack icon strip */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-col gap-2"
            >
              <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--text-subtle)" }}>
                Core Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {CORE_TECH.map(({ name, icon }, idx) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + idx * 0.06, duration: 0.4 }}
                    title={name}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      transition: "border-color 0.2s, background 0.2s, transform 0.15s",
                    }}
                    whileHover={{ y: -2, scale: 1.06 }}
                  >
                    <i className={icon} style={{ fontSize: "16px", lineHeight: 1 }} />
                    <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Developer profile card */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Ambient glow behind card */}
            <div
              style={{
                position: "absolute",
                width: "clamp(300px, 38vw, 460px)",
                height: "clamp(300px, 38vw, 460px)",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at center, rgba(129,140,248,0.16), rgba(34,211,238,0.06) 55%, transparent 75%)",
                filter: "blur(28px)",
                pointerEvents: "none",
              }}
            />

            {/* ── Main profile card ── */}
            <div
              style={{
                position: "relative",
                width: "clamp(280px, 34vw, 400px)",
                borderRadius: 28,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
                overflow: "visible",
              }}
            >
              {/* Faux browser / app chrome bar */}
              <div
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255,255,255,0.055)",
                }}
              >
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: '"DM Mono", monospace',
                    color: "var(--text-subtle)",
                    letterSpacing: "0.04em",
                  }}
                >
                  pawan.dev/profile
                </span>
                <div style={{ width: 52 }} />
              </div>

              {/* Profile photo — inside card */}
              <div style={{ padding: "16px 16px 0" }}>
                <div
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    position: "relative",
                    aspectRatio: "4 / 5",
                    background: "rgba(129,140,248,0.06)",
                  }}
                >
                  <img
                    src={profilePhoto}
                    alt={name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="eager"
                  />
                  {/* Subtle inner gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(3,7,17,0.55) 0%, transparent 45%)",
                    }}
                  />
                </div>
              </div>

              {/* Card footer info row */}
              <div
                style={{
                  padding: "14px 18px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>
                    {name}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      fontFamily: '"DM Mono", monospace',
                      color: "var(--text-muted)",
                      marginTop: 3,
                    }}
                  >
                    Frontend Engineer · 4+ yrs
                  </p>
                </div>
                {/* Live availability pill */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "5px 11px",
                    borderRadius: 9999,
                    background: "rgba(34,211,238,0.08)",
                    border: "1px solid rgba(34,211,238,0.22)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--accent-cyan)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#22d3ee",
                      animation: "glow-pulse 2s ease-in-out infinite",
                    }}
                  />
                  Available
                </div>
              </div>

              {/* ── Floating badge: LinkedIn (top-right) ── */}
              <motion.a
                href={followOnLinkedin}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  top: -18,
                  right: -22,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 14,
                  background: "rgba(10,102,194,0.15)",
                  border: "1px solid rgba(10,102,194,0.35)",
                  backdropFilter: "blur(16px)",
                  textDecoration: "none",
                  animation: "float-slow 7s ease-in-out infinite",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "#0A66C2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  in
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
                    Connect
                  </p>
                  <p style={{ fontSize: 10, color: "var(--text-primary)" }}>on LinkedIn</p>
                </div>
              </motion.a>

              {/* ── Floating badge: GitHub (bottom-left) ── */}
              <motion.a
                href={github}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  bottom: -18,
                  left: -22,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(16px)",
                  textDecoration: "none",
                  animation: "float-slow-2 8s ease-in-out infinite",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
                    Open Source
                  </p>
                  <p style={{ fontSize: 10, color: "var(--text-primary)", fontFamily: '"DM Mono", monospace' }}>@PawanEpisode</p>
                </div>
              </motion.a>

              {/* ── Floating badge: top-left — stack pill ── */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  top: "28%",
                  left: -28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  animation: "float-slow 9s ease-in-out infinite reverse",
                }}
              >
                {[
                  { icon: "devicon-react-original colored", label: "React" },
                  { icon: "devicon-typescript-plain colored", label: "TS" },
                  { icon: "devicon-nextjs-plain", label: "Next" },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    title={label}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className={icon} style={{ fontSize: 18 }} />
                  </div>
                ))}
              </motion.div>

              {/* ── Floating badge: commits / activity (right-middle) ── */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  top: "60%",
                  right: -22,
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "8px 12px",
                  borderRadius: 12,
                  background: "rgba(168,139,250,0.1)",
                  border: "1px solid rgba(168,139,250,0.25)",
                  backdropFilter: "blur(14px)",
                  animation: "float-slow-2 6s ease-in-out infinite",
                }}
              >
                <Star size={13} style={{ color: "var(--accent-violet)", flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 12, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                    8+
                  </p>
                  <p style={{ fontSize: 9, color: "var(--text-primary)", marginTop: 2 }}>Projects</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-subtle)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} style={{ color: "var(--text-subtle)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
