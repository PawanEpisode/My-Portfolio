import data from "../content/data";

export default function Certificates() {
  if (!data.certificates.length) return null;
  return (
    <ul role="list" className="grid sm:grid-cols-2 gap-4">
      {data.certificates.map(({ title, issuer, credentialId, link, photo }) => (
        <li
          key={link}
          className="group rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 transition hover:shadow-sm hover:bg-slate-50 dark:hover:bg-neutral-800"
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 text-slate-800 dark:text-white"
          >
            <div className="flex flex-col gap-2 text-slate-900 dark:text-white">
              <img src={issuer} alt={issuer} className="w-56" />
              <span className="font-medium tracking-tight text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors line-clamp-1 sm:line-clamp-none">
                {title}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="text-sm hidden sm:inline">Credential ID:</span>
                <span className="text-xs sm:text-sm px-2 w-fit rounded-2xl bg-indigo-400 text-white dark:text-white/90 truncate max-w-[150px] sm:max-w-none">
                  {credentialId}
                </span>
              </div>
            </div>
            <div className="w-56 h-40">
            <img src={photo} alt={title} className="object-fill w-full h-full" />
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
