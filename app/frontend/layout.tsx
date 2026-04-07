import FrontendLayoutClient from "@/apps/frontend/FrontendLayoutClient";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <FrontendLayoutClient>{children}</FrontendLayoutClient>;
}
