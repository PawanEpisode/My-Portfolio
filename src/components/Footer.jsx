import React from "react";
import data from "../content/data";
import LinkedinIcon from "../lib/icons/linkedin-icon";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col sm:flex-row justify-between items-center p-5 rounded-2xl border-2 border-indigo-600 bg-indigo-50 text-center text-white dark:text-black">
      <div className="flex flex-col gap-1 sm:items-start items-center">
        <span className="text-sm text-slate-600 dark:text-black">
          Designed & developed with ❤️ by{" "}
          <a
            href={data.social.linkedin}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-600 hover:underline-offset-2 hover:underline transition-colors"
          >
            Pawan Kumar
          </a>
        </span>
        <span className="text-sm text-slate-600 dark:text-black">
          pawan4super30 (@) gmail.com
        </span>
        <span className="text-sm text-slate-600 dark:text-black">
          +91 8756507317 | © {new Date().getFullYear()}
        </span>
      </div>
      <div className="flex items-center">
        <a
          href={data.social.github}
          className="p-2 rounded hover:bg-slate-100 dark:hover:bg-white/10"
          target="_blank"
          rel="noreferrer"
        >
          <i class="devicon-github-original colored text-[24px]"></i>
        </a>
        <a
          href={data.social.linkedin}
          className="p-2 rounded hover:bg-slate-100 dark:hover:bg-white/10"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedinIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
