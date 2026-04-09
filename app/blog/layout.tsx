import "highlight.js/styles/github-dark.css";
import "tippy.js/dist/tippy.css";
import "@/apps/blog/styles/blog-doc-prose.css";
import SubdomainAppShell from "@/shared/components/SubdomainAppShell";
import BlogNavHeader from "@/apps/blog/BlogNavHeader";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <SubdomainAppShell header={<BlogNavHeader />}>{children}</SubdomainAppShell>;
}
