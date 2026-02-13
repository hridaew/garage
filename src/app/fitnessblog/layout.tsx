import SiteShell from "@/components/layout/SiteShell";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
