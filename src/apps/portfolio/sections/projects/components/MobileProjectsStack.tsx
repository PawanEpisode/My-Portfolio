import ProjectCarouselNavigation from "./ProjectCarouselNavigation";

/** Mobile card-list layout for the projects section. */
export default function MobileProjectsStack({ projects }) {
  return (
    <section className="border-t border-border px-4 py-12 min-[360px]:px-6">
      <div className="mb-12 min-w-0 flex flex-col items-center">
        <p className="section-label">Selected Work</p>
        <h2 className="section-title-main text-center">
          Projects that <em className="section-title-accent">made an impact</em>
        </h2>
      </div>
      <ProjectCarouselNavigation projects={projects} />
    </section>
  );
}
