import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

/** Animated scroll hint pinned to the bottom-centre of the hero section. */
export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
    >
      <span className="text-xs uppercase tracking-widest text-subtle">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={16} className="text-subtle" />
      </motion.div>
    </motion.div>
  );
}
