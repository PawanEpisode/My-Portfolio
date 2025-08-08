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
          className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 transition"
        >
          <img
            src={p.photo}
            alt={p.title}
            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-xl font-semibold text-white">{p.title}</div>
            <div className="text-sm text-white/70">{p.period}</div>
            <p className="text-white/90 mt-2">{p.description}</p>
            {p.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="text-xs rounded bg-white/10 border border-white/20 px-2 py-1 text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.a>
      ))}
    </div>
  );
}
