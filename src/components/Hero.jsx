import { motion } from "framer-motion";
import data from "../content/data";
import MoreAboutMe from "./MoreAboutMe";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import pawan from "../assets/my-image.jpeg";

export default function Hero() {
  return (
    <section className="pt-20 pb-16 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
          Software Engineer crafting delightful web experiences
        </h1>
        <p className="mt-4 text-slate-700 dark:text-white/80">{data.summary}</p>
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
                  href="https://drive.google.com/uc?export=download&id=12osFv7i6nMe6mUhpsj40jmeuRZ-RHsYd"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 border border-transparent"
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
          <MoreAboutMe />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="aspect-square p-0.5 rounded-3xl border-gradient overflow-hidden border border-slate-200 dark:border-white/10 bg-gradient-to-br dark:from-blue-500/30 dark:via-white/20 dark:to-red-600/20 from-indigo-600/30 via-fuchsia-600/20 to-pink-600/20"
      >
        <img
          src={pawan}
          alt="Pawan Kumar"
          className="h-full w-full rounded-3xl object-fill"
          loading="eager"
          decoding="async"
        />
      </motion.div>
    </section>
  );
}
