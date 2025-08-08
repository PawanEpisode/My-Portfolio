import { motion } from "framer-motion";
import { useMemo } from "react";
import { clsx } from "clsx";
import data from "../content/data";

export default function Timeline() {
  const items = useMemo(() => data.timeline, []);
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 h-full w-px bg-gradient-to-b from-indigo-500/50 via-fuchsia-500/50 to-transparent" />
      <ul className="space-y-10">
        {items.map((item, idx) => (
          <li key={idx} className="relative">
            <div
              className={clsx(
                "flex gap-6 items-start",
                idx % 2 ? "md:flex-row-reverse" : "md:flex-row"
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * idx }}
                className="flex-1 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 backdrop-blur shadow-lg text-slate-800 dark:text-white"
              >
                <div className="text-sm text-slate-600 dark:text-white/70 mb-1">
                  {item.period}
                </div>
                <div className="text-lg font-semibold">{item.title}</div>
                {item.subtitle && (
                  <div className="text-slate-700 dark:text-white/80">
                    {item.subtitle}
                  </div>
                )}
                <ul className="mt-3 space-y-1 list-disc list-inside text-slate-700 dark:text-white/80">
                  {item.points?.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                {item.skills && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 text-indigo-700 dark:text-indigo-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
