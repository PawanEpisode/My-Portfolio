import React from "react";

const LinkIcon = () => {
  return (
    <svg
      className="h-4 w-4 text-indigo-600 dark:text-indigo-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 7H17V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LinkIcon;
