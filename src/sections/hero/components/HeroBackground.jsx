import { motion } from "framer-motion";

/** Ambient gradient orbs + subtle grid texture behind the hero section. */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="orb-1 absolute"
        style={{
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(129,140,248,0.14), transparent 68%)",
          top: "-200px", left: "-180px",
        }}
      />
      <motion.div
        className="orb-2 absolute"
        style={{
          width: 550, height: 550, borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(34,211,238,0.10), transparent 68%)",
          bottom: "-150px", right: "-100px",
        }}
      />
      <motion.div
        className="orb-3 absolute"
        style={{
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(244,114,182,0.08), transparent 68%)",
          top: "40%", left: "60%",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
