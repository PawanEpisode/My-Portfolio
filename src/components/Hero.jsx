import { motion } from "framer-motion";
import MoreAboutMe from "./MoreAboutMe";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { PinContainer } from "./3DPin";

export default function Hero({
  person,
  social,
  moreAboutMe,
  extensiveSkills,
  projects,
  certificates,
}) {
  const { designationTitle, summary, profilePhoto, designationSubtitle } =
    person;
  const { followOnLinkedin } = social;
  const { resumeDownloadLink } = moreAboutMe;
  return (
    <section className="pt-20 pb-16 grid md:grid-cols-2 gap-8 items-center justify-center max-w-5xl px-4 mx-auto relative z-2">
      <div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
          <span className="text-gradient italic">{designationTitle}</span>{" "}
          {designationSubtitle}
        </h1>
        <p className="mt-4 text-slate-700 dark:text-white/80">{summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#story"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:opacity-90 text-white"
          >
            View my journey
          </a>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={resumeDownloadLink}
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:ring-2 hover:ring-indigo-600 hover:bg-white hover:text-black dark:bg-white dark:text-slate-900 border border-transparent"
                >
                  Download Resume
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-slate-900 dark:text-white">
                  Go ahead and download my resume
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="block sm:hidden">
            <MoreAboutMe
              person={person}
              moreAboutMe={moreAboutMe}
              extensiveSkills={extensiveSkills}
              projects={projects}
              certificates={certificates}
            />
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="my-56 sm:m-6"
      >
        <PinContainer title="Pawan Kumar" href={followOnLinkedin}>
          <div className="flex flex-col sm:basis-1/2 w-[20rem] sm:w-[24rem] h-[24rem] rounded-3xl border-gradient overflow-hidden border border-slate-200 dark:border-white/10 bg-gradient-to-br dark:from-blue-500/30 dark:via-white/20 dark:to-red-600/20 from-indigo-600/30 via-fuchsia-600/20 to-pink-600/20">
            <img
              src={profilePhoto}
              alt="Pawan Kumar"
              className="h-full w-full rounded-3xl object-fill"
              loading="eager"
              decoding="async"
            />
          </div>
        </PinContainer>
      </motion.div>
    </section>
  );
}
