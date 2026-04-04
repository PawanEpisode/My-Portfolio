import ThemeToggleButton from "../theme/ThemeToggleButton.jsx";
import Contact from "../contact/Contact.jsx";
import data from "../content/data.js";

/**
 * Shared chrome for subdomain apps (blog, frontend, …): noise, theme toggle, contact block.
 */
export default function SubdomainAppShell({ children }) {
  const { person, social } = data;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="noise-overlay" />
      <div className="fixed right-4 top-4 z-50 md:right-6 md:top-6">
        <ThemeToggleButton />
      </div>
      {children}
      <Contact person={person} social={social} />
    </div>
  );
}
