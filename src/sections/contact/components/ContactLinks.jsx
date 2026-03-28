import { Mail, Github, Linkedin } from "lucide-react";

const LINK_STYLE_BASE = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  fontSize: "0.8125rem",
  color: "var(--text-muted)",
  transition: "color 0.2s",
  textDecoration: "none",
};

function ContactLink({ href, icon: Icon, label, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={LINK_STYLE_BASE}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-indigo)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
    >
      <Icon size={13} />
      {label}
    </a>
  );
}

function Separator() {
  return (
    <span
      className="hidden sm:block"
      style={{ color: "var(--border-hover)", userSelect: "none" }}
    >
      ·
    </span>
  );
}

export default function ContactLinks({ person, social }) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-5 mt-5"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <ContactLink
        href={`mailto:${person.email}`}
        icon={Mail}
        label={person.email}
      />
      <Separator />
      <ContactLink
        href={social.github}
        icon={Github}
        label="PawanEpisode"
        external
      />
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
