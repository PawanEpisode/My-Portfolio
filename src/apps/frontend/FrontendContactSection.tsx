import EducationalContactSection from "../../shared/contact/EducationalContactSection";
import data from "../../shared/content/data";

export default function FrontendContactSection() {
  const { person, social } = data;

  return (
    <EducationalContactSection
      label="Contact"
      title={
        <>
          Feedback on demos, patterns, and{" "}
          <span className="section-title-accent">how we build UIs</span>
        </>
      }
      description="Use this form for frontend-focused teaching and tooling: accessibility, performance, CSS, JavaScript frameworks, and how those ideas show up in real interfaces. Short context (what you tried, what you expected) helps me answer in one pass."
      bullets={[
        "Questions tied to examples, articles, or code shared on this site",
        "Reports of outdated snippets, broken sandboxes, or confusing steps",
        "Requests for deep dives on specific patterns (a11y, layout, performance)",
        "Workshops, talks, or mentorship-style collaborations with clear goals",
      ]}
      footnote="Your email is only used to reply. I do not subscribe you to anything without your consent."
      person={person}
      social={social}
      formClassName="border-l-4 border-l-accent-violet/80"
    />
  );
}
