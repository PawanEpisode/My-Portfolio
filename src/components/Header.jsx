import { Github } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import data from "../content/data";
import LinkedinIcon from "../lib/icons/linkedin-icon";

export default function Header() {
  const theme = JSON.parse(JSON.stringify(localStorage.getItem("theme")));
  console.log({ theme });
  return (
    <header className="sticky top-0 z-[100] backdrop-blur bg-white/70 dark:bg-black/30 border-b border-slate-200 dark:border-white/10 text-slate-800 dark:text-white">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <a
          href="#home"
          className="group w-full flex gap-2 items-center font-semibold tracking-tight"
        >
          <span className="flex items-center justify-center w-6 h-6 p-1 rounded text-white bg-indigo-600">
            P
          </span>
          <span className="text-xl relative">
            <span>Pawan Kumar | Engineer</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300 origin-left group-hover:origin-right"></span>
          </span>
        </a>
        <div className="flex items-center gap-3">
          <a
            href={data.social.github}
            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-white/10"
            target="_blank"
            rel="noreferrer"
          >
            <i
              class={`devicon-github-original ${
                theme === "dark" ? "" : "colored"
              } text-[24px]`}
            ></i>
          </a>
          <a
            href={data.social.linkedin}
            className="p-2 rounded hover:bg-slate-100 dark:hover:bg-white/10"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedinIcon />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
