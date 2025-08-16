import { motion } from "framer-motion";
import { useMemo } from "react";
import { clsx } from "clsx";
import { Building2, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function Timeline({ timeline }) {
  const items = useMemo(() => timeline, []);
  const reverseItems = items.slice().reverse();

  const getSkillsData = (item) => {
    if (!item.skills) return { visibleSkills: [], hiddenSkills: [] };

    const sortedSkills = item.skills.sort((a, b) => a.length - b.length);
    const visibleSkills = sortedSkills.slice(0, 8);
    const hiddenSkills = sortedSkills.slice(8);

    return { visibleSkills, hiddenSkills };
  };

  return (
    <div className="relative">
      <div className="absolute left-4 z-0 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500 via-fuchsia-500" />
      <ul className="space-y-10">
        {reverseItems.map((item, idx) => (
          <li key={idx} className="relative">
            <div
              className={clsx(
                "flex gap-6 items-start rounded-4xl p-0.5 w-full relative shimmer-diagonal",
                idx % 2 ? "md:flex-row-reverse" : "md:flex-row"
              )}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * idx }}
                className="flex-1 flex items-centre justify-center flex-col rounded-4xl bg-white dark:bg-black p-6 text-slate-800 dark:text-white dark:hover:bg-slate-900 hover:bg-gray-50"
              >
                <TimelineHeader key={idx} item={item} />
                <TimeLineDetails item={item} />
                <TooltipProvider delayDuration={20}>
                  {item.skills && <TimeLineSkills {...getSkillsData(item)} />}
                </TooltipProvider>
              </motion.div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const TimeLineSkills = ({ visibleSkills, hiddenSkills }) => {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {visibleSkills.map((s) => (
        <SkillBadge key={s} skill={s} />
      ))}
      {hiddenSkills.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="text-xs cursor-pointer rounded-full bg-gray-500/10 border border-gray-500/20 px-2 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-500/20 transition-colors duration-200 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              {hiddenSkills.length} more
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs !p-4 relative !z-50">
            <div className="flex flex-wrap gap-1">
              {hiddenSkills.map((s) => (
                <SkillBadge key={s} skill={s} />
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

const TimeLineDetails = ({ item }) => {
  return (
    <>
      <p className="text-lg font-semibold text-center sm:text-start">
        {item.title}
      </p>
      {item.subtitle && (
        <p className="w-fit mt-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 dark:border-indigo-300 px-2 py-1 text-indigo-700 dark:text-indigo-300">
          {item.subtitle}
        </p>
      )}
      <ul className="mt-3 space-y-1 list-disc list-inside text-slate-700 dark:text-white/80">
        {item.points?.map((p, i) => (
          <li key={i} className="text-sm text-slate-950 dark:text-white">
            {p}
          </li>
        ))}
      </ul>
    </>
  );
};

const TimelineHeader = ({ item }) => {
  return (
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
        className="text-indigo-600 text-center sm:text-start w-fit text-lg dark:text-indigo-400 hover:underline"
      >
        {item.headTitle}
      </a>
      <span className="text-slate-600 hidden sm:block dark:text-white/70">
        |
      </span>
      <span className="text-slate-600 dark:text-white/70">{item.period}</span>
    </div>
  );
};

const SkillBadge = ({ skill }) => {
  return (
    <span className="text-xs rounded-full bg-indigo-500/10 border border-indigo-500 px-2 py-1 text-indigo-700 dark:text-white">
      {skill}
    </span>
  );
};
