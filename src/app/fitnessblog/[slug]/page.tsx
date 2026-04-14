import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/wix-blog";
import RichContent from "@/components/blog/RichContent";
import Reveal from "@/components/motion/Reveal";
import ContentContainer from "@/components/layout/ContentContainer";

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const response = await getAllPosts(100);
  const posts = response.posts || [];
  return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: `/fitnessblog/${params.slug}` },
    openGraph: {
      type: "article",
      title: post.title || undefined,
      description: post.excerpt || undefined,
      url: `/fitnessblog/${params.slug}`,
      publishedTime: post.firstPublishedDate
        ? new Date(post.firstPublishedDate).toISOString()
        : undefined,
      modifiedTime: post.lastPublishedDate
        ? new Date(post.lastPublishedDate).toISOString()
        : undefined,
    },
    twitter: {
      card: "summary",
      title: post.title || undefined,
      description: post.excerpt || undefined,
    },
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

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    url: `https://garage1880.com/fitnessblog/${params.slug}`,
    datePublished: post.firstPublishedDate
      ? new Date(post.firstPublishedDate).toISOString()
      : undefined,
    dateModified: post.lastPublishedDate
      ? new Date(post.lastPublishedDate).toISOString()
      : undefined,
    author: {
      "@type": "Organization",
      name: "Garage 1880",
      url: "https://garage1880.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Garage 1880",
      url: "https://garage1880.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://garage1880.com/fitnessblog/${params.slug}`,
    },
  };

  return (
    <section className="section-space-md pt-28 md:pt-34">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
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
