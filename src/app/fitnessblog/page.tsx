import { Metadata } from "next";
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
  let posts = response.posts || [];
  const wixUnavailable = response.meta?.wixUnavailable;

  // Render dummy posts if Wix is unconfigured or unavailable to keep the layout active during dev
  if (wixUnavailable || posts.length === 0) {
    posts = [
      {
        _id: "mock1",
        title: "5 Exercises for Building Sustainable Strength",
        excerpt: "Discover the fundamental movements that will help you build lasting, functional strength without risking injury or burnout.",
        slug: "5-exercises-for-sustainable-strength",
        firstPublishedDate: new Date().toISOString(),
        minutesToRead: 4,
        coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2670&auto=format&fit=crop",
      },
      {
        _id: "mock2",
        title: "The Importance of Rest Days in Your Routine",
        excerpt: "Why pushing harder isn't always the answer. Learn how strategic recovery accelerates your fitness progress and mental wellbeing.",
        slug: "importance-of-rest-days",
        firstPublishedDate: new Date(Date.now() - 86400000 * 3).toISOString(),
        minutesToRead: 3,
        coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2720&auto=format&fit=crop",
      },
      {
        _id: "mock3",
        title: "Nutrition Myths That Are Holding You Back",
        excerpt: "We break down common dietary misconceptions and explain what actually matters when fueling your body for performance and longevity.",
        slug: "nutrition-myths-holding-you-back",
        firstPublishedDate: new Date(Date.now() - 86400000 * 7).toISOString(),
        minutesToRead: 6,
        coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2653&auto=format&fit=crop",
      }
    ];
  }

  return (
    <section className="section-space-md pt-28 md:pt-34">
      <ContentContainer>
        <SectionHeading
          eyebrow="Fitness Blog"
          title="Garage 1880 Fitness Blog"
          description="Tips, insights, and stories from our trainers to help you become 1% better every day."
        />

        {wixUnavailable ? (
          <Reveal className="mt-10 mb-10">
            <div className="border border-garage-border bg-garage-light p-6 text-garage-black rounded-lg">
              <p className="text-sm font-semibold">
                Note: Wix CMS is currently disconnected in this environment. Displaying placeholder content.
              </p>
            </div>
          </Reveal>
        ) : null}

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: {
            _id?: string;
            title?: string;
            excerpt?: string;
            slug?: string;
            firstPublishedDate?: string | Date | null;
            minutesToRead?: number;
            coverImage?: string;
            media?: { wixMedia?: { image?: string } };
          }, index: number) => (
            <Reveal key={post._id} delay={index * 0.04} preset="scale">
              <BlogCard
                title={post.title || "Untitled"}
                excerpt={post.excerpt || ""}
                slug={post.slug || ""}
                date={formatDate(post.firstPublishedDate)}
                dateTime={post.firstPublishedDate ? new Date(post.firstPublishedDate).toISOString() : undefined}
                minutesToRead={post.minutesToRead}
                coverImageUrl={getCoverImageUrl(post)}
              />
            </Reveal>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
