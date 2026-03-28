import { motion } from "framer-motion";
import { Star } from "lucide-react";

/**
 * Right column of the Hero section.
 *
 * The glass profile card with a faux browser chrome, profile photo,
 * availability pill, and four floating social/stack badges.
 */
export default function HeroProfileCard({ person, social }) {
  const { name, profilePhoto } = person;
  const { github, followOnLinkedin } = social;

  return (
    <motion.div
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center mt-12 lg:mt-0 lg:justify-end"
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

      {/* Profile card */}
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
        {/* Faux browser chrome */}
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

        {/* Profile photo */}
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
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(3,7,17,0.55) 0%, transparent 45%)",
              }}
            />
          </div>
        </div>

        {/* Card footer: name + availability */}
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
            <p style={{ fontSize: 11, fontFamily: '"DM Mono", monospace', color: "var(--text-muted)", marginTop: 3 }}>
              Frontend Engineer · 4+ yrs
            </p>
          </div>
          <div
            style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "5px 11px", borderRadius: 9999,
              background: "rgba(34,211,238,0.08)",
              border: "1px solid rgba(34,211,238,0.22)",
              fontSize: 11, fontWeight: 600,
              color: "var(--accent-cyan)", whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d3ee", animation: "glow-pulse 2s ease-in-out infinite" }} />
            Available
          </div>
        </div>

        {/* Floating badge: LinkedIn (top-right) */}
        <motion.a
          href={followOnLinkedin}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
          style={{
            position: "absolute", top: -18, right: -22,
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 12px", borderRadius: 14,
            background: "rgba(10,102,194,0.15)",
            border: "1px solid rgba(10,102,194,0.35)",
            backdropFilter: "blur(16px)", textDecoration: "none",
            animation: "float-slow 7s ease-in-out infinite", cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 28, height: 28, borderRadius: 8, background: "#0A66C2",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 12, fontWeight: 800, flexShrink: 0,
            }}
          >
            in
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>Connect</p>
            <p style={{ fontSize: 10, color: "var(--text-primary)" }}>on LinkedIn</p>
          </div>
        </motion.a>

        {/* Floating badge: GitHub (bottom-left) */}
        <motion.a
          href={github}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
          style={{
            position: "absolute", bottom: -18, left: -22,
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 12px", borderRadius: 14,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)", textDecoration: "none",
            animation: "float-slow-2 8s ease-in-out infinite", cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>Open Source</p>
            <p style={{ fontSize: 10, color: "var(--text-primary)", fontFamily: '"DM Mono", monospace' }}>@PawanEpisode</p>
          </div>
        </motion.a>

        {/* Floating badge: stack pills (left-middle) */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", top: "28%", left: -28,
            display: "flex", flexDirection: "column", gap: 6,
            animation: "float-slow 9s ease-in-out infinite reverse",
          }}
        >
          {[
            { icon: "devicon-react-original colored",   label: "React" },
            { icon: "devicon-typescript-plain colored", label: "TS" },
            { icon: "devicon-nextjs-plain",             label: "Next" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              title={label}
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <i className={icon} style={{ fontSize: 18 }} />
            </div>
          ))}
        </motion.div>

        {/* Floating badge: project count (right-middle) */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", top: "60%", right: -22,
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 12px", borderRadius: 12,
            background: "rgba(168,139,250,0.1)",
            border: "1px solid rgba(168,139,250,0.25)",
            backdropFilter: "blur(14px)",
            animation: "float-slow-2 6s ease-in-out infinite",
          }}
        >
          <Star size={13} style={{ color: "var(--accent-violet)", flexShrink: 0 }} />
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>8+</p>
            <p style={{ fontSize: 9, color: "var(--text-primary)", marginTop: 2 }}>Projects</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
