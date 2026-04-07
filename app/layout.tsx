import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/shared/theme/ThemeProvider";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL != null &&
  String(process.env.NEXT_PUBLIC_SITE_URL).trim() !== ""
    ? String(process.env.NEXT_PUBLIC_SITE_URL).trim()
    : "https://meetpawan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pawan Kumar · Portfolio",
    template: "%s · Pawan Kumar",
  },
  description: "Software engineer — portfolio, projects, experience, and contact.",
  icons: {
    icon: "/assets/my-image.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Pawan Kumar",
  },
};

const themeBootstrap = `
(function () {
  try {
    var k = "portfolio-theme";
    var p = localStorage.getItem(k);
    var h = new Date().getHours();
    var dark = p === "dark" || (p !== "light" && (h < 6 || h >= 18));
    var r = document.documentElement;
    r.classList.toggle("dark", dark);
    r.style.colorScheme = dark ? "dark" : "light";
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", dark ? "#0b1020" : "#f1f5f9");
  } catch (e) {}
})()
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#f1f5f9" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Serif:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900;1,14..32,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/devicon@2.16.0/devicon.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrap}
        </Script>
        <script
          async
          src="https://script-stg.getbreakout.ai/command_bar_widget.js"
          {...({ "tenant-id": "cursor", "agent-id": "1" } as Record<string, string>)}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
