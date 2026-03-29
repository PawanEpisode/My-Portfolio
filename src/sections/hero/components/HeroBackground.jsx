import { motion } from "framer-motion";

/** Ambient gradient orbs + subtle grid texture behind the hero section. */
export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="orb-1 absolute -left-[180px] -top-[200px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.14),transparent_68%)]"
      />
      <motion.div
        className="orb-2 absolute -right-[100px] -bottom-[150px] h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_68%)]"
      />
      <motion.div
        className="orb-3 absolute left-[60%] top-[40%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.08),transparent_68%)]"
      />
      <div
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] [background-size:60px_60px]"
      />
    </div>
  );
}
