import data from "../content/data";

export default function Certificates() {
  if (!data.certificates.length) return null;
  return (
    <ul className="flex w-full flex-wrap gap-4">
      {data.certificates.map((c, idx) => (
        <li
          key={idx}
          className="min-w-sm flex items-center justify-between rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 text-slate-800 dark:text-white"
        >
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium">{c.title}</p>
              <p className="text-sm text-slate-500 dark:text-white/50">
                {c.credentialId}
              </p>
            </div>
            <p className="text-sm text-slate-600 dark:text-white/70">
              {c.issuer}
            </p>
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
