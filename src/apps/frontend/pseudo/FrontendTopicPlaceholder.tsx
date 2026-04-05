import { findFrontendRoute } from "./frontendRouteLookup";

export interface FrontendTopicPlaceholderProps {
  routeKey: string;
}

export default function FrontendTopicPlaceholder({ routeKey }: FrontendTopicPlaceholderProps) {
  const resolved = findFrontendRoute(routeKey);
  const title = resolved?.item.title ?? "Topic";
  const description =
    resolved?.item.description ??
    "This route is not mapped to menu metadata yet—wire it when the real page ships.";
  const categoryLabel = resolved?.categoryLabel ?? "Explore";
  const visible = resolved?.item.visible ?? true;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">{categoryLabel}</p>
      <h1 className="mt-2 font-['Syne',sans-serif] text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>

      <div className="mt-8 rounded-xl border border-border bg-surface/80 p-6">
        <h2 className="text-sm font-semibold text-foreground">Pseudo page</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Route key <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">{routeKey}</code>{" "}
          is a stand-in for future MDX, sandboxes, or question banks. Swap this component for a real
          route module when content exists.
        </p>
        <dl className="mt-4 grid gap-2 text-sm">
          <div className="flex flex-wrap gap-2">
            <dt className="text-muted">Visibility flag</dt>
            <dd className="font-medium text-foreground">{visible ? "visible" : "hidden in menu"}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
