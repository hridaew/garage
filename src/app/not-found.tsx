import type { Metadata } from "next";
import Link from "next/link";
import ContentContainer from "@/components/layout/ContentContainer";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-28 md:pt-34">
      <ContentContainer className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-garage-blue">
          404
        </p>
        <h1 className="editorial-display mt-3 text-4xl text-garage-black md:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-garage-gray">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-garage-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-garage-blue"
          >
            Go Home
          </Link>
          <Link
            href="/contact-us-about-fitness"
            className="inline-flex items-center gap-2 rounded-lg border border-garage-border px-6 py-3 text-sm font-semibold text-garage-black transition-colors hover:bg-garage-light"
          >
            Contact Us
          </Link>
        </div>
      </ContentContainer>
    </section>
  );
}
