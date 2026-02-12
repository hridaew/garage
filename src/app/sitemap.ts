import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/wix-blog";

const BASE_URL = "https://garage1880.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/personal-training`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact-us-about-fitness`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/fitnessblog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const response = await getAllPosts(100);
    const posts = response.posts || [];
    blogPages = posts.map((post) => ({
      url: `${BASE_URL}/fitnessblog/${post.slug}`,
      lastModified: post.lastPublishedDate ? new Date(post.lastPublishedDate) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Sitemap will just have static pages if blog API fails
  }

  return [...staticPages, ...blogPages];
}
