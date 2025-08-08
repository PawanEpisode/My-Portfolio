import data from "../content/data";

export default function Skills() {
  return (
    <div className="flex flex-wrap gap-2">
      {data.skills.map((s) => (
        <span
          key={s}
          className="text-sm rounded-full bg-white px-3 py-1 border border-slate-200 text-slate-800 dark:bg-white/5 dark:border-white/10 dark:text-white"
        >
          {s}
        </span>
      ))}
    </div>
  );
}
