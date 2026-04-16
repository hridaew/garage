import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/wix-blog";

const BASE_URL = "https://garage1880.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: "2026-04-14", changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/personal-training`, lastModified: "2026-04-14", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about-us`, lastModified: "2026-04-14", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact-us-about-fitness`, lastModified: "2026-04-14", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/fitnessblog`, lastModified: "2026-04-14", changeFrequency: "weekly", priority: 0.9 },
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const response = await getAllPosts(100);
    const posts = response.posts || [];
    blogPages = posts
      .filter((post) => Boolean(post.slug))
      .map((post) => ({
        url: `${BASE_URL}/fitnessblog/${post.slug}`,
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
