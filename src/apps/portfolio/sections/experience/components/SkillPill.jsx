/** Single skill tag pill used inside experience cards. */
export default function SkillPill({ skill }) {
  return (
    <span className="inline-flex cursor-default items-center rounded-full border border-[rgba(129,140,248,0.2)] bg-[rgba(129,140,248,0.09)] px-2.5 py-0.5 text-[11px] font-medium text-accent-indigo transition-[background] duration-150">
      {skill}
    </span>
  );
}
