"use client";

import ContentContainer from "@/components/layout/ContentContainer";
import NavigationLink from "@/components/motion/NavigationLink";

export default function FitnessBlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (process.env.NODE_ENV !== "production") {
    console.error("[fitnessblog/error]", error);
  }

  return (
    <section className="section-space-md pt-28 md:pt-34">
      <ContentContainer>
        <div className="mx-auto max-w-2xl border border-garage-border bg-white px-6 py-10 text-center md:px-10 md:py-14">
          <h1 className="editorial-display text-3xl text-garage-black md:text-4xl">
            Something went wrong loading this post
          </h1>
          <p className="mt-4 text-garage-gray">
            We hit a hiccup fetching this content. Give it another try, or head back to the blog.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center border border-garage-black bg-garage-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-garage-ink"
            >
              Try again
            </button>
            <NavigationLink
              href="/fitnessblog"
              className="inline-flex items-center justify-center border border-garage-border px-6 py-3 text-sm font-semibold text-garage-black transition-colors hover:bg-garage-panel"
            >
              Back to Blog
            </NavigationLink>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
