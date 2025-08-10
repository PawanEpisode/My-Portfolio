import React from "react";
import data from "../content/data";
import LinkedinIcon from "../lib/icons/linkedin-icon";
import GithubIcon from "./GithubIcon";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col sm:flex-row justify-between py-8 items-center border-t-2 border-t-indigo-600 text-center text-white max-w-5xl px-4 mx-auto relative z-2">
      <div className="flex flex-col gap-1 sm:items-start items-center">
        <span className="text-lg flex gap-2 text-slate-900 dark:text-white">
          Designed & developed with ❤️ by{" "}
          <a
            href={data.social.linkedin}
            className="text-indigo-600 hidden sm:block dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-600 hover:underline-offset-2 hover:underline transition-colors"
          >
            Pawan Kumar
          </a>
        </span>
        <a
          href={data.social.linkedin}
          className="text-indigo-600 block sm:hidden dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-600 hover:underline-offset-2 hover:underline transition-colors"
        >
          Pawan Kumar
        </a>
        <span className="text-sm text-slate-900 dark:text-white">
          pawan4super30 (@) gmail.com
        </span>
        <span className="text-sm text-slate-900 dark:text-white">
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
          <GithubIcon />
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
