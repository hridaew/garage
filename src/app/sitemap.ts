import { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo-url";
import { getAllPosts } from "@/lib/wix-blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: getCanonicalUrl(), lastModified: "2026-05-01", changeFrequency: "monthly", priority: 1 },
    { url: getCanonicalUrl("/personal-training"), lastModified: "2026-04-25", changeFrequency: "monthly", priority: 0.9 },
    { url: getCanonicalUrl("/about-us"), lastModified: "2026-04-25", changeFrequency: "monthly", priority: 0.8 },
    { url: getCanonicalUrl("/contact-us-about-fitness"), lastModified: "2026-04-25", changeFrequency: "monthly", priority: 0.8 },
    { url: getCanonicalUrl("/fitnessblog"), lastModified: "2026-04-14", changeFrequency: "weekly", priority: 0.9 },
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const response = await getAllPosts(100);
    const posts = response.posts || [];
    blogPages = posts
      .filter((post) => Boolean(post.slug))
      .map((post) => ({
        url: getCanonicalUrl(`/fitnessblog/${post.slug}`),
        lastModified: post.lastPublishedDate
          ? new Date(post.lastPublishedDate)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
  } catch (err) {
    console.error("[sitemap] Failed to fetch blog posts; emitting static pages only:", err);
  }

  return [...staticPages, ...blogPages];
}
