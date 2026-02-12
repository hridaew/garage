import { Metadata } from "next";
import { getAllPosts } from "@/lib/wix-blog";
import BlogCard from "@/components/blog/BlogCard";
import Link from "next/link";

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

function getCoverImageUrl(post: { media?: { wixMedia?: { image?: string } }; coverImage?: string }): string | undefined {
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

  return (
    <main className="min-h-screen bg-garage-light">
      <div className="bg-garage-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Garage 1880 Fitness Blog
          </h1>
          <p className="text-garage-gray text-lg max-w-2xl mx-auto">
            Tips, insights, and stories from our trainers to help you become 1%
            better every day.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-garage-gray text-lg">
              No blog posts yet. Check back soon!
            </p>
            <Link
              href="/"
              className="text-garage-blue hover:underline mt-4 inline-block"
            >
              &larr; Back to home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard
                key={post._id}
                title={post.title || "Untitled"}
                excerpt={post.excerpt || ""}
                slug={post.slug || ""}
                date={formatDate(post.firstPublishedDate)}
                minutesToRead={post.minutesToRead}
                coverImageUrl={getCoverImageUrl(post)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
