/**
 * Skills — Scroll-driven sticky category viewer + mobile accordion.
 *
 * Rendered OUTSIDE <Section> intentionally — Section's whileInView wrapper
 * would create a transform context that breaks position:sticky.
 */

import SectionHeader from "../../shared/components/SectionHeader";
import DesktopSkills from "./components/DesktopSkills";
import MobileSkills from "./components/MobileSkills";
import ConceptMarquee from "./components/ConceptMarquee";

export default function Skills({ skillValues, conceptTags, id }) {
  return (
    <>
      <div className="hidden md:block" id={id}>
        <SectionHeader label="Skills & Expertise" title="Technologies I *master*" />
        <DesktopSkills skillValues={skillValues} />
      </div>

      <div id={id} className="md:hidden">
        <MobileSkills skillValues={skillValues} />
      </div>

      <ConceptMarquee conceptTags={conceptTags} />
    </>
  );
}
