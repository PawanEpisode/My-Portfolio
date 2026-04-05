import type { BlogRouteId } from "../blogRoutes";

const copy: Record<Exclude<BlogRouteId, "home" | "contact">, { title: string; body: string }> = {
  about: {
    title: "About this blog",
    body: "Educational writing on frontend craft, with room for longer-form notes and references. Replace this block with your bio, editorial guidelines, or a colophon when the real page is ready.",
  },
  posts: {
    title: "Posts",
    body: "Article index, tags, and series will render here. Until then, this route proves navigation and layout—swap in your post list or MDX collection driver.",
  },
};

export interface BlogPlaceholderPageProps {
  route: Exclude<BlogRouteId, "home" | "contact">;
}

export default function BlogPlaceholderPage({ route }: BlogPlaceholderPageProps) {
  const { title, body } = copy[route];
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Blog</p>
      <h1 className="mt-2 font-['Syne',sans-serif] text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted">{body}</p>
    </article>
  );
}
