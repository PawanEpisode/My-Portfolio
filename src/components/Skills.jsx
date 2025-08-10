import data from "../content/data";

export default function Skills() {
  return (
    <div className="flex flex-wrap gap-2">
      {data.skills.map((s) => (
        <span
          key={s}
          className="text-sm rounded-full bg-white px-3 py-1 border border-indigo-300 text-slate-800 dark:bg-black dark:border-indigo-300 dark:text-white"
        >
          {s}
        </span>
      ))}
    </div>
  );
}
