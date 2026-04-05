import { Mail, Github, Linkedin } from "lucide-react";

function ContactLink({ href, icon: Icon, label, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-[0.4rem] text-[0.8125rem] text-muted no-underline transition-colors hover:text-accent-indigo"
    >
      <Icon size={13} />
      {label}
    </a>
  );
}

function Separator() {
  return <span className="hidden select-none text-border-hover sm:block">·</span>;
}

export default function ContactLinks({ person, social }) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border pt-5">
      <ContactLink href={`mailto:${person.email}`} icon={Mail} label={person.email} />
      <Separator />
      <ContactLink href={social.github} icon={Github} label="PawanEpisode" external />
      <Separator />
      <ContactLink
        href={social.linkedin}
        icon={Linkedin}
        label="Pawan Kumar"
        external
      />
    </div>
  );
}
