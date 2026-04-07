import SubdomainAppShell from "@/shared/components/SubdomainAppShell";
import BlogNavHeader from "@/apps/blog/BlogNavHeader";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <SubdomainAppShell header={<BlogNavHeader />}>{children}</SubdomainAppShell>;
}
