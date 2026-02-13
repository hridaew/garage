import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/wix-blog";
import BlogCard from "@/components/blog/BlogCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import ContentContainer from "@/components/layout/ContentContainer";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fitness Blog",
  description:
    "Fitness tips, nutrition advice, and training insights from the Garage 1880 team in Sunnyside, Denver.",
};

function formatDate(dateStr: string | Date | null | undefined): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getCoverImageUrl(post: {
  media?: { wixMedia?: { image?: string } };
  coverImage?: string;
}): string | undefined {
  const imageUrl = post.media?.wixMedia?.image || post.coverImage;
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith("http")) return imageUrl;
  if (imageUrl.startsWith("wix:image://")) {
    const parts = imageUrl.replace("wix:image://v1/", "").split("/");
    return `https://static.wixstatic.com/media/${parts[0]}`;
  }
  return `https://static.wixstatic.com/media/${imageUrl}`;
}

export default async function BlogPage() {
  const response = await getAllPosts(20);
  const posts = response.posts || [];
  const wixUnavailable = response.meta?.wixUnavailable;

  return (
    <section className="section-space-md pt-28 md:pt-34">
      <ContentContainer>
        <SectionHeading
          eyebrow="Fitness Blog"
          title="Garage 1880 Fitness Blog"
          description="Tips, insights, and stories from our trainers to help you become 1% better every day."
        />

        {wixUnavailable ? (
          <Reveal className="mt-10">
            <div className="border border-garage-border border border-garage-border bg-white p-8 text-garage-gray">
              <p className="text-base">
                Blog content is temporarily unavailable in this environment. Wix credentials may not be configured.
              </p>
              <Link href="/" className="mt-4 inline-block text-sm font-semibold text-garage-blue hover:underline">
                Back to home
              </Link>
            </div>
          </Reveal>
        ) : null}

        {!wixUnavailable && posts.length === 0 ? (
          <Reveal className="mt-10">
            <div className="border border-garage-border border border-garage-border bg-white p-8 text-garage-gray">
              <p>No blog posts yet. Check back soon.</p>
              <Link href="/" className="mt-4 inline-block text-sm font-semibold text-garage-blue hover:underline">
                Back to home
              </Link>
            </div>
          </Reveal>
        ) : null}

        {posts.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post._id} delay={index * 0.04} preset="scale">
                <BlogCard
                  title={post.title || "Untitled"}
                  excerpt={post.excerpt || ""}
                  slug={post.slug || ""}
                  date={formatDate(post.firstPublishedDate)}
                  minutesToRead={post.minutesToRead}
                  coverImageUrl={getCoverImageUrl(post)}
                />
              </Reveal>
            ))}
          </div>
        ) : null}
      </ContentContainer>
    </section>
  );
}
