import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import pawan from "../assets/my-image.jpeg";

const AvatarWithSkeleton = () => {
  return (
    <div className="relative h-12 w-12">
      <img
        src={pawan}
        alt="Pawan Kumar"
        className="h-12 w-12 rounded-full object-fill ring-2 ring-indigo-500/20 transition-opacity"
      />
    </div>
  );
};

const MoreAboutMe = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">More about me</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold dark:text-white">
            About My Journey
          </DialogTitle>
          <DialogDescription>
            A deeper look at my background, projects, and skills.
          </DialogDescription>
          {/* Profile + Resume actions */}
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <AvatarWithSkeleton />
            <div className="flex items-center gap-2">
              <a
                href="https://drive.google.com/file/d/12osFv7i6nMe6mUhpsj40jmeuRZ-RHsYd/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-slate-200 dark:border-white/10 px-3 py-1.5 text-sm text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
              >
                View resume
              </a>
              <a
                href="https://drive.google.com/uc?export=download&id=12osFv7i6nMe6mUhpsj40jmeuRZ-RHsYd"
                className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
              >
                Download
              </a>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-10">
          {/* Intro / Bio */}
          <section aria-labelledby="about-intro" className="space-y-4">
            <h3
              id="about-intro"
              className="text-base font-semibold text-slate-900 dark:text-white"
            >
              Professional summary
            </h3>
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-neutral-900/60 p-4 sm:p-5 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/50">
              <div className="space-y-3 leading-relaxed text-slate-700 dark:text-white/80">
                <p>
                  Passionate Frontend Software Engineer with a proven track
                  record of 4+ years in designing and implementing innovative
                  and user-friendly web interfaces. Specializing in cutting-edge
                  frontend technologies, including React, NextJS, JavaScript,
                  Webpack 5, Cloudfront CDN, Docker, Kubernetes, ArgoCD, GitHub
                  Actions, and OpenApi Specification Using Swagger.
                </p>
                <p>
                  I've had the privilege of contributing to impactful projects
                  that enhance user experiences. My expertise extends across the
                  Software Development Lifecycle (SDLC), from requirement
                  analysis and documentation to coding, testing, and
                  maintenance. I thrive in dynamic environments, leveraging my
                  analytical skills and strong communication abilities to
                  collaborate effectively with cross-functional teams.
                </p>
                <p>
                  I am always excited to continue pushing the boundaries of
                  front-end development and contribute to creating seamless and
                  visually appealing digital experiences.
                </p>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section aria-labelledby="about-projects" className="space-y-4">
            <h3
              id="about-projects"
              className="text-base font-semibold text-slate-900 dark:text-white"
            >
              Some of my personal projects
            </h3>
            <ul role="list" className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Football Manager App",
                  href: "https://football-manager-app-mu.vercel.app/",
                },
                {
                  label: "E-Commerce App",
                  href: "https://e-commerce-neon-nu.vercel.app/",
                },
                {
                  label: "Mini-Page Builder App",
                  href: "https://mini-page-builder-orcin.vercel.app/",
                },
                {
                  label: "Music Player App",
                  href: "https://nirvana-musik-app.netlify.app/",
                },
                {
                  label: "Article Summarizer App",
                  href: "https://openai-article-summary.netlify.app/",
                },
                {
                  label: "Nike Landing App",
                  href: "https://nike-landing-ui-app.netlify.app/",
                },
                {
                  label: "Image Generator",
                  href: "https://envision-image.netlify.app/",
                },
                {
                  label: "Canso.ai Project Video (Yugen.ai)",
                  href: "https://drive.google.com/uc?export=view&id=1O2Rk_hwXLyqAIgAZjsYWwXt0xb4ZHLEs",
                },
              ].map(({ label, href }) => (
                <li
                  key={href}
                  className="group rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 transition hover:shadow-sm hover:bg-slate-50 dark:hover:bg-neutral-800"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 text-slate-800 dark:text-white"
                  >
                    <span className="font-medium tracking-tight text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                      {label}
                    </span>
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
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Certificates */}
          <section aria-labelledby="about-certificates" className="space-y-4">
            <h3
              id="about-certificates"
              className="text-base font-semibold text-slate-900 dark:text-white"
            >
              Certificates
            </h3>
            <ul role="list" className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Certificate 1",
                  href: "https://drive.google.com/uc?export=view&id=1y-hMXEDmlipiMlFUxtWPrtwR--BUAvVP",
                },
                {
                  label: "Certificate 2",
                  href: "https://drive.google.com/uc?export=view&id=1-CjhIF6s1zJQUMfGPc0WjgXUrXW-uN9_",
                },
              ].map(({ label, href }) => (
                <li
                  key={href}
                  className="group rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 transition hover:shadow-sm hover:bg-slate-50 dark:hover:bg-neutral-800"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 text-slate-800 dark:text-white"
                  >
                    <span className="font-medium tracking-tight text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                      {label}
                    </span>
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
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Skills */}
          <section aria-labelledby="about-skills" className="space-y-4">
            <h3
              id="about-skills"
              className="text-base font-semibold text-slate-900 dark:text-white"
            >
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "ReactJS",
                "Javascript",
                "Typescript",
                "Redux",
                "Python",
                "Webpack",
                "Tanstack libraries",
                "Websocket",
                "Storybook",
                "Monorepo Structure",
                "RTL",
                "GSAP",
                "REST API Integration",
                "JWT",
                "SOLID",
                "Node.js",
                "OWASP Compliance",
                "ZAP pen-testing",
                "Postgres",
                "Ant Design",
                "Webpack 5",
                "Tailwind CSS",
                "SCSS",
                "MongoDB",
                "Azure",
                "AWS",
                "CI/CD",
                "LLMs",
                "Cloudfront CDN",
                "Docker",
                "Kubernetes",
                "ArgoCD",
                "GitHub Actions",
                "PWA",
                "C++",
                "Java",
                "SEO optimization",
                "Data Visualisation UI",
                "OpenApi Specification Using Swagger",
                "Agile Methodologies",
                "technical feasibility of UI/UX designs",
                "Coding",
                "Debugging",
                "Production Support",
                "Technical Support",
              ].map((skill, idx) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/10 px-3 py-1 text-xs font-medium text-slate-700 dark:text-white/80 shadow-sm transition-colors hover:bg-slate-100 dark:hover:bg-white/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 flex justify-end">
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoreAboutMe;
