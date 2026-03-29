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
      className="relative mt-12 flex items-center justify-center lg:mt-0 lg:justify-end"
    >
      {/* Ambient glow behind card */}
      <div className="pointer-events-none absolute h-[clamp(300px,38vw,460px)] w-[clamp(300px,38vw,460px)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.16),rgba(34,211,238,0.06)_55%,transparent_75%)] blur-[28px]" />

      {/* Profile card */}
      <div className="relative w-[clamp(280px,34vw,400px)] overflow-visible rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_40px_100px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[24px]">
        {/* Faux browser chrome */}
        <div className="flex items-center justify-between border-b border-white/[0.055] px-4 py-3">
          <div className="flex items-center gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div
                key={c}
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>
          <span className="font-['DM_Mono',monospace] text-[11px] tracking-[0.04em] text-subtle">
            pawan.dev/profile
          </span>
          <div className="w-[52px]" />
        </div>

        {/* Profile photo */}
        <div className="px-4 pt-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[rgba(129,140,248,0.06)]">
            <img
              src={profilePhoto}
              alt={name}
              className="block h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,7,17,0.55)] from-0% to-transparent to-45%" />
          </div>
        </div>

        {/* Card footer: name + availability */}
        <div className="flex items-center justify-between px-[18px] pb-[18px] pt-3.5">
          <div>
            <p className="text-[15px] font-extrabold leading-tight text-foreground">
              {name}
            </p>
            <p className="mt-0.5 font-['DM_Mono',monospace] text-[11px] text-muted">
              Frontend Engineer · 4+ yrs
            </p>
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[rgba(34,211,238,0.22)] bg-[rgba(34,211,238,0.08)] px-[11px] py-1.5 text-[11px] font-semibold text-accent-cyan">
            <span className="h-1.5 w-1.5 animate-[glow-pulse_2s_ease-in-out_infinite] rounded-full bg-[#22d3ee]" />
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
          className="absolute -right-[22px] -top-[18px] flex cursor-pointer items-center gap-2 rounded-[14px] border border-[rgba(10,102,194,0.35)] bg-[rgba(10,102,194,0.15)] px-3 py-2 backdrop-blur-[16px] animate-[float-slow_7s_ease-in-out_infinite] no-underline"
        >
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#0A66C2] text-xs font-extrabold text-white">
            in
          </div>
          <div>
            <p className="text-[11px] font-bold leading-tight text-foreground">
              Connect
            </p>
            <p className="text-[10px] text-foreground">on LinkedIn</p>
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
          className="absolute -bottom-[18px] -left-[22px] flex cursor-pointer items-center gap-2 rounded-[14px] border border-white/12 bg-white/[0.04] px-3 py-2 backdrop-blur-[16px] animate-[float-slow-2_8s_ease-in-out_infinite] no-underline"
        >
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/[0.07]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-bold leading-tight text-foreground">
              Open Source
            </p>
            <p className="font-['DM_Mono',monospace] text-[10px] text-foreground">
              @PawanEpisode
            </p>
          </div>
        </motion.a>

        {/* Floating badge: stack pills (left-middle) */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -left-7 top-[28%] flex flex-col gap-1.5 animate-[float-slow_9s_ease-in-out_infinite_reverse]"
        >
          {[
            { icon: "devicon-react-original colored", label: "React" },
            { icon: "devicon-typescript-plain colored", label: "TS" },
            { icon: "devicon-nextjs-plain colored", label: "Next" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              title={label}
              className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.08]"
            >
              <i className={`${icon} inline-block text-lg leading-none not-italic`} aria-hidden />
            </div>
          ))}
        </motion.div>

        {/* Floating badge: project count (right-middle) */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -right-[22px] top-[60%] flex items-center gap-[7px] rounded-xl border border-[rgba(168,139,250,0.25)] bg-[rgba(168,139,250,0.1)] px-3 py-2 backdrop-blur-[14px] animate-[float-slow-2_6s_ease-in-out_infinite]"
        >
          <Star size={13} className="flex-shrink-0 text-accent-violet" />
          <div>
            <p className="text-xs font-extrabold leading-none text-foreground">
              8+
            </p>
            <p className="mt-0.5 text-[9px] text-foreground">Projects</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
