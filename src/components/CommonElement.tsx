import React from "react";
import { cn } from "../lib/utils";
import LinkedinIcon from "../lib/icons/linkedin-icon";
import GithubIcon from "./GithubIcon";

const NameElement = ({
  name,
  className,
  link,
}: {
  name: string;
  className?: string;
  link: string;
}) => {
  return (
    <a
      href={link}
      className={cn(
        "text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-600 hover:underline-offset-2 hover:underline transition-colors",
        className
      )}
    >
      {name}
    </a>
  );
};

const GithubIconElement = ({ link }: { link: string }) => {
  return (
    <a
      href={link}
      className="p-2 rounded hover:bg-slate-100 dark:hover:bg-white/10 hover:scale-105 transition-all duration-300"
      target="_blank"
      rel="noreferrer"
    >
      <GithubIcon />
    </a>
  );
};

const LinkedinIconElement = ({ link }: { link: string }) => {
  return (
    <a
      href={link}
      className="p-2 rounded hover:bg-slate-100 dark:hover:bg-white/10 hover:scale-105 transition-all duration-300"
      target="_blank"
      rel="noreferrer"
    >
      <LinkedinIcon />
    </a>
  );
};

const FollowOnLinkedIn = ({ link }: { link: string }) => {
  return (
    <a
      className="follow-on-linkedin-button bg-black dark:bg-white text-white dark:text-black border hover:scale-105 transition-all duration-300"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      Follow on LinkedIn
    </a>
  );
};

export {
  NameElement,
  GithubIconElement,
  LinkedinIconElement,
  FollowOnLinkedIn,
};
