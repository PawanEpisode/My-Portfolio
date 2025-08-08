import { Github, Linkedin } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import data from "../content/data";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-black/30 border-b border-slate-200 dark:border-white/10 text-slate-800 dark:text-white">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight">
          Pawan Kumar
        </a>
        <div className="flex items-center gap-3">
          <a
            href={data.social.linkedin}
            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-white/10"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={18} />
          </a>
          {data.social.github && (
            <a
              href={data.social.github}
              className="p-2 rounded hover:bg-slate-100 dark:hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} />
            </a>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
