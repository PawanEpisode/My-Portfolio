import { motion } from "framer-motion";
import { useMemo } from "react";
import { clsx } from "clsx";
import data from "../content/data";
import { Building2 } from "lucide-react";

export default function Timeline() {
  const items = useMemo(() => data.timeline, []);
  const reverseItems = items.slice().reverse();

  const getkills = (item) =>
    item.skills.slice(0, 10).sort((a, b) => a.localeCompare(b));
  return (
    <div className="relative">
      <div className="absolute left-4 z-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500/50 via-fuchsia-500/50" />
      <ul className="space-y-10">
        {reverseItems.map((item, idx) => (
          <li key={idx} className="relative">
            <div
              className={clsx(
                "flex gap-6 items-start rounded-2xl p-0.5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 to-purple-700",
                idx % 2 ? "md:flex-row-reverse" : "md:flex-row"
              )}
            >
              <div class="absolute inset-0 rounded-4xl bg-gradient-to-r from-green-400/40 to-blue-500/40 z-0"></div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * idx }}
                className="flex-1 relative z-50 rounded-4xl bg-white dark:bg-black p-6 text-slate-800 dark:text-white dark:hover:bg-slate-900 hover:bg-green-50"
              >
                <div className="text-sm text-slate-600 dark:text-white/70 mb-1 flex flex-col sm:flex-row items-center gap-2">
                  {item.icon ? (
                    <div className="w-10 h-10 rounded-full ring-2 ring-indigo-100 ring-inset-2">
                      <img
                        src={item.icon}
                        alt={item.headTitle}
                        className="rounded-full w-full h-full object-fill"
                      />
                    </div>
                  ) : (
                    <Building2 />
                  )}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 text-center text-lg dark:text-indigo-400 hover:underline"
                  >
                    {item.headTitle}
                  </a>
                  <span className="text-slate-600 hidden sm:block dark:text-white/70">
                    |
                  </span>
                  <span className="text-slate-600 dark:text-white/70">
                    {item.period}
                  </span>
                </div>
                <div className="text-lg font-semibold text-center sm:text-start">
                  {item.title}
                </div>
                {item.subtitle && (
                  <div className="w-fit mt-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 dark:border-indigo-300/20 px-2 py-1 text-indigo-700 dark:text-indigo-300">
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
                    {getkills(item).map((s) => (
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
