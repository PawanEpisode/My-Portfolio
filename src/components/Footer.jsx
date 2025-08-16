import React from "react";
import { Mail, Phone, Locate } from "lucide-react";
import {
  NameElement,
  GithubIconElement,
  LinkedinIconElement,
  FollowOnLinkedIn,
} from "./CommonElement";

const Footer = ({ person, social }) => {
  const { name, email, phone, location } = person;
  const { linkedin, github, followOnLinkedin } = social;
  return (
    <footer className="w-full flex flex-col gap-8 sm:flex-row justify-between py-8 items-center border-t-2 border-t-indigo-600 text-center text-white max-w-5xl px-4 mx-auto relative z-2">
      <div className="flex flex-col gap-1 sm:items-start items-center">
        <span className="text-lg flex gap-2 text-slate-900 dark:text-white">
          Designed & developed with ❤️ by{" "}
          <NameElement
            name={name}
            className="hidden sm:block"
            link={linkedin}
          />
        </span>
        <NameElement name={name} className="block sm:hidden" link={linkedin} />
        <span className="text-sm inline-flex items-center gap-2 text-slate-900 dark:text-white">
          <Mail className="w-4 h-4" /> {email}
        </span>
        <span className="text-sm inline-flex items-center gap-2 text-slate-900 dark:text-white">
          <Phone className="w-4 h-4" /> {phone}
        </span>
        <span className="text-sm inline-flex items-center gap-2 text-slate-900 dark:text-white">
          <Locate className="w-4 h-4" /> {location} | ©{" "}
          {new Date().getFullYear()}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <FollowOnLinkedIn link={followOnLinkedin} />
        <GithubIconElement link={github} />
        <LinkedinIconElement link={linkedin} />
      </div>
    </footer>
  );
};

export default Footer;
