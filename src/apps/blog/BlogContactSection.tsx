import EducationalContactSection from "../../shared/contact/EducationalContactSection";
import data from "../../shared/content/data";

export default function BlogContactSection() {
  const { person, social } = data;

  return (
    <EducationalContactSection
      label="Contact"
      title={
        <>
          Questions, corrections, or{" "}
          <span className="section-title-accent">ideas for what to write next</span>
        </>
      }
      description="This space is for readers and fellow learners. If something in a post was unclear, you found an error, or you have a topic you wish someone would unpack—send a message. I read every note and reply when I can, usually within a few days."
      bullets={[
        "Typos, broken links, or factual fixes on published articles",
        "Deeper questions or alternate perspectives on something you read",
        "Suggestions for guides, series, or subjects you want covered next",
        "Polite inquiries about collaboration on educational writing or speaking",
      ]}
      footnote="I use your details only to respond to you. I do not add you to a newsletter or marketing list unless you explicitly ask."
      person={person}
      social={social}
      formClassName="border-l-4 border-l-accent-violet/80"
    />
  );
}
