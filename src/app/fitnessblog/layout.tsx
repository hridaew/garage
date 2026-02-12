import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pb-32">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
