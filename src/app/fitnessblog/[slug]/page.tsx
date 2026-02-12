import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/lib/wix-blog";
import RichContent from "@/components/blog/RichContent";

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
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-garage-black text-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/fitnessblog"
            className="text-garage-gray hover:text-white transition-colors text-sm mb-6 inline-flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-garage-gray text-sm">
            <time>{formatDate(post.firstPublishedDate)}</time>
            {post.minutesToRead && (
              <>
                <span>&middot;</span>
                <span>{post.minutesToRead} min read</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {post.richContent ? (
          <RichContent content={post.richContent} />
        ) : post.excerpt ? (
          <p className="text-garage-black/80 leading-relaxed">{post.excerpt}</p>
        ) : (
          <p className="text-garage-gray">No content available.</p>
        )}
      </article>

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <Link
          href="/fitnessblog"
          className="text-garage-blue hover:underline inline-flex items-center gap-1"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          All Posts
        </Link>
      </div>
    </main>
  );
}
