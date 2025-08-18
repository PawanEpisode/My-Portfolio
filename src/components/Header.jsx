import ThemeToggle from "./ThemeToggle";
import MoreAboutMe from "./MoreAboutMe";
import {
  FollowOnLinkedIn,
  GithubIconElement,
  LinkedinIconElement,
} from "./CommonElement";

export default function Header({
  person,
  social,
  moreAboutMe,
  extensiveSkills,
  projects,
  certificates,
}) {
  const { name, designationTitle } = person;
  const { linkedin, github, followOnLinkedin } = social;
  const nameArray = name.split(" ");
  const firstName = nameArray[0];
  const lastName = nameArray[nameArray.length - 1];
  const designationTitleArray = designationTitle.split(" ");
  const designationTitleFirstWord = designationTitleArray[0];
  const designationTitleLastWord =
    designationTitleArray[designationTitleArray.length - 1];
  return (
    <header className="sticky top-0 z-[100] backdrop-blur bg-white/70 dark:bg-black/30 border-b border-slate-200 dark:border-white/40 text-slate-800 dark:text-white">
      <div className="mx-auto max-w-5xl px-4 py-2 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <a
            href="#home"
            className="group w-full flex gap-2 items-center font-semibold tracking-tight"
          >
            <span className="flex items-center justify-center w-10 h-10 p-1 rounded-full text-white bg-indigo-600">
              {firstName.charAt(0)}
            </span>
            <div className="text-xl relative flex gap-1">
              <span>{firstName}</span>
              <span>{lastName}</span>
              <span className="hidden xl:block">
                {" "}
                | {designationTitleFirstWord}
              </span>
              <span className="hidden xl:block">
                {designationTitleLastWord}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300 origin-left group-hover:origin-right"></span>
            </div>
          </a>
          <div className="hidden sm:flex">
            <MoreAboutMe
              btnClassName="!p-1 !px-2 w-20"
              person={person}
              moreAboutMe={moreAboutMe}
              extensiveSkills={extensiveSkills}
              projects={projects}
              certificates={certificates}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <FollowOnLinkedIn link={followOnLinkedin} />
          </div>
          <GithubIconElement link={github} />
          <LinkedinIconElement link={linkedin} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
