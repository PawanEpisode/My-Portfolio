/**
 * ProjectsStack — Scroll-driven stacking project viewer.
 *
 * Rendered OUTSIDE <Section> intentionally — Section's whileInView wrapper
 * would create a transform context that breaks position:sticky.
 */

import SectionHeader from "../../shared/components/SectionHeader";
import DesktopProjectsStack from "./components/DesktopProjectsStack";
import MobileProjectsStack from "./components/MobileProjectsStack";

export default function ProjectsStack({ projects, id }) {
  return (
    <>
      <div className="hidden md:block" id={id}>
        <SectionHeader label="Selected Work" title="Projects that *made an impact*" />
        <DesktopProjectsStack projects={projects} />
      </div>

      <div className="md:hidden">
        <MobileProjectsStack projects={projects} id={id} />
      </div>
    </>
  );
}
