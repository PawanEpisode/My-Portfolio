import { motion } from "framer-motion";
import data from "../content/data";

export default function Projects() {
  if (!data.projects.length) return null;
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {data.projects.map((p, idx) => (
        <motion.a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 * idx }}
          className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 backdrop-blur hover:bg-slate-50 dark:hover:bg-white/10 transition text-slate-800 dark:text-white"
        >
          <div className="text-xl font-semibold">{p.title}</div>
          <div className="text-sm text-slate-500 dark:text-white/50">
            {p.period}
          </div>
          <p className="text-slate-700 dark:text-white/80 mt-2">
            {p.description}
          </p>
          {p.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs rounded bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 text-indigo-700 dark:text-indigo-300"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </motion.a>
      ))}
    </div>
  );
}
