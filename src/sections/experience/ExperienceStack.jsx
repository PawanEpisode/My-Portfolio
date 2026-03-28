/**
 * ExperienceStack — Scroll-driven stacking card viewer.
 *
 * Rendered OUTSIDE <Section> intentionally — Section's whileInView wrapper
 * would create a transform context that breaks position:sticky.
 */

import { useMemo } from "react";
import SectionHeader from "../../shared/components/SectionHeader";
import DesktopExperienceStack from "./components/DesktopExperienceStack";
import MobileExperienceStack from "./components/MobileExperienceStack";

export default function ExperienceStack({ timeline, id }) {
  const items = useMemo(() => [...timeline].reverse(), [timeline]);

  return (
    <div id={id}>
      <div className="hidden md:block">
        <SectionHeader label="Experience" title="Where I've *shipped* things" />
        <DesktopExperienceStack items={items} />
      </div>

      <div className="md:hidden">
        <MobileExperienceStack items={items} />
      </div>
    </div>
  );
}
