import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface SiteShellProps {
  children: React.ReactNode;
  className?: string;
  mainClassName?: string;
  withFooter?: boolean;
}

export default function SiteShell({
  children,
  className = "",
  mainClassName = "",
  withFooter = true,
}: SiteShellProps) {
  return (
    <div className={`relative overflow-x-clip pb-32 ${className}`}>
      <Navbar />
      <main className={mainClassName}>{children}</main>
      {withFooter ? <Footer /> : null}
    </div>
  );
}
