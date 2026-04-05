import { useEffect } from "react";
import SubdomainAppShell from "../../shared/components/SubdomainAppShell";
import { useClientPath } from "../../shared/hooks/useClientPath";
import BlogContactSection from "./BlogContactSection";
import BlogNavHeader from "./BlogNavHeader";
import { blogPathToRoute } from "./blogPaths";
import BlogHomePage from "./BlogHomePage";
import BlogPlaceholderPage from "./pseudo/BlogPlaceholderPage";

export default function BlogApp() {
  const { pathname, navigate } = useClientPath();
  const route = blogPathToRoute(pathname);

  useEffect(() => {
    const prev = document.title;
    document.title =
      route === "contact" ? "Contact · Blog · Pawan Kumar" : "Blog · Pawan Kumar";
    return () => {
      document.title = prev;
    };
  }, [route]);

  return (
    <SubdomainAppShell
      header={<BlogNavHeader active={route} onNavigatePath={navigate} />}
    >
      {route === "home" ? <BlogHomePage onNavigatePath={navigate} /> : null}

      {route === "about" || route === "posts" ? (
        <BlogPlaceholderPage route={route} />
      ) : null}

      {route === "contact" ? (
        <main>
          <BlogContactSection />
        </main>
      ) : null}
    </SubdomainAppShell>
  );
}
