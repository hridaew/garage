import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getCoverImageUrl, getPostBySlug, readSeoTags } from "@/lib/wix-blog";
import RichContent from "@/components/blog/RichContent";
import { RichContentErrorBoundary } from "@/components/blog/RichContentErrorBoundary";
import Reveal from "@/components/motion/Reveal";
import ContentContainer from "@/components/layout/ContentContainer";
import { getCanonicalUrl } from "@/lib/seo-url";
import NavigationLink from "@/components/motion/NavigationLink";

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const response = await getAllPosts(100);
    const posts = response.posts || [];
    return posts.filter((p) => p.slug).map((p) => ({ slug: p.slug! }));
  } catch (err) {
    console.error("[blog/[slug]] generateStaticParams failed:", err);
    if (process.env.NODE_ENV === "production") {
      throw err;
    }
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  const seo = readSeoTags(post);
  const title = seo.title || post.title || undefined;
  const description = seo.description || post.excerpt || undefined;
  const ogTitle = seo.ogTitle || title;
  const ogDescription = seo.ogDescription || description;
  const ogImage = seo.ogImage;
  const canonicalUrl = getCanonicalUrl(`/fitnessblog/${params.slug}`);

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      images: ogImage ? [{ url: ogImage }] : undefined,
      publishedTime: post.firstPublishedDate
        ? new Date(post.firstPublishedDate).toISOString()
        : undefined,
      modifiedTime: post.lastPublishedDate
        ? new Date(post.lastPublishedDate).toISOString()
        : undefined,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
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

  const seo = readSeoTags(post);
  const postImage = getCoverImageUrl(post) ?? seo.ogImage;
  const postUrl = getCanonicalUrl(`/fitnessblog/${params.slug}`);
  const homeUrl = getCanonicalUrl();
  const blogUrl = getCanonicalUrl("/fitnessblog");

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    image: postImage,
    url: postUrl,
    datePublished: post.firstPublishedDate
      ? new Date(post.firstPublishedDate).toISOString()
      : undefined,
    dateModified: post.lastPublishedDate
      ? new Date(post.lastPublishedDate).toISOString()
      : undefined,
    author: {
      "@type": "Organization",
      name: "Garage 1880",
      url: homeUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Garage 1880",
      url: homeUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: homeUrl },
      { "@type": "ListItem", position: 2, name: "Fitness Blog", item: blogUrl },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  const excerptFallback = post.excerpt ? (
    <p className="leading-relaxed text-garage-ink">{post.excerpt}</p>
  ) : (
    <p className="text-garage-gray">No content available.</p>
  );

  return (
    <section className="section-space-md pt-28 md:pt-34">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContentContainer>
        <article className="mx-auto max-w-3xl">
        <Reveal preset="fade">
          <NavigationLink
            href="/fitnessblog"
            className="inline-flex items-center gap-2 text-sm font-medium text-garage-gray transition-colors hover:text-garage-black"
          >
            <span aria-hidden>&larr;</span>
            Back to Blog
          </NavigationLink>
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
            <RichContentErrorBoundary fallback={excerptFallback}>
              <RichContent content={post.richContent} />
            </RichContentErrorBoundary>
          ) : (
            excerptFallback
          )}
        </Reveal>

        <Reveal delay={0.12} className="mt-8">
          <NavigationLink
            href="/fitnessblog"
            className="inline-flex items-center gap-2 text-garage-blue hover:underline"
          >
            <span aria-hidden>&larr;</span>
            All Posts
          </NavigationLink>
        </Reveal>
        </article>
      </ContentContainer>
    </section>
  );
}
