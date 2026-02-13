import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/wix-blog";
import RichContent from "@/components/blog/RichContent";
import Reveal from "@/components/motion/Reveal";
import ContentContainer from "@/components/layout/ContentContainer";

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
  };
}

function formatDate(dateStr: string | Date | null | undefined): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <section className="section-space-md pt-28 md:pt-34">
      <ContentContainer>
        <article className="mx-auto max-w-3xl">
        <Reveal preset="fade">
          <Link
            href="/fitnessblog"
            className="inline-flex items-center gap-2 text-sm font-medium text-garage-gray transition-colors hover:text-garage-black"
          >
            <span aria-hidden>&larr;</span>
            Back to Blog
          </Link>
        </Reveal>

        <Reveal className="mt-5">
          <h1 className="editorial-display text-4xl text-garage-black md:text-5xl">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.06} className="mt-4 flex items-center gap-3 text-sm text-garage-gray">
          <time>{formatDate(post.firstPublishedDate)}</time>
          {post.minutesToRead ? (
            <>
              <span>&middot;</span>
              <span>{post.minutesToRead} min read</span>
            </>
          ) : null}
        </Reveal>

        <Reveal delay={0.1} className="mt-10 border border-garage-border bg-white px-6 py-8 md:px-8 md:py-10">
          {post.richContent ? (
            <RichContent content={post.richContent} />
          ) : post.excerpt ? (
            <p className="leading-relaxed text-garage-ink">{post.excerpt}</p>
          ) : (
            <p className="text-garage-gray">No content available.</p>
          )}
        </Reveal>

        <Reveal delay={0.12} className="mt-8">
          <Link
            href="/fitnessblog"
            className="inline-flex items-center gap-2 text-garage-blue hover:underline"
          >
            <span aria-hidden>&larr;</span>
            All Posts
          </Link>
        </Reveal>
        </article>
      </ContentContainer>
    </section>
  );
}
