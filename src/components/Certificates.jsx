import data from "../content/data";

export default function Certificates() {
  if (!data.certificates.length) return null;
  return (
    <ul className="space-y-3">
      {data.certificates.map((c, idx) => (
        <li
          key={idx}
          className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 text-slate-800 dark:text-white"
        >
          <div>
            <div className="font-medium">{c.title}</div>
            <div className="text-sm text-slate-600 dark:text-white/70">
              {c.issuer}
            </div>
          </div>
          {c.link && (
            <a
              className="text-sm text-indigo-700 dark:text-indigo-300 hover:underline"
              href={c.link}
              target="_blank"
              rel="noreferrer"
            >
              View
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
