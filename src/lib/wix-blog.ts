import { unstable_cache } from "next/cache";
import { getWixClient } from "./wix-client";

export interface WixSeoTag {
  type: "title" | "meta" | "script" | "link";
  props?: Record<string, string>;
  children?: string;
  custom?: boolean;
  disabled?: boolean;
}

export interface BlogPost {
  _id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  minutesToRead?: number;
  firstPublishedDate?: string | Date | null;
  lastPublishedDate?: string | Date | null;
  coverImage?: string;
  media?: {
    wixMedia?: {
      image?: string;
    };
  };
  richContent?: {
    nodes?: unknown[];
  };
  seoData?: {
    tags?: WixSeoTag[];
    settings?: {
      keywords?: Array<{ term?: string; isMain?: boolean }>;
    };
  };
}

export interface WixPostSeo {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

export function getCoverImageUrl(
  post: { media?: { wixMedia?: { image?: string } }; coverImage?: string } | null | undefined,
): string | undefined {
  const imageUrl = post?.media?.wixMedia?.image || post?.coverImage;
  if (!imageUrl) return undefined;
  if (imageUrl.startsWith("http")) return imageUrl;
  if (imageUrl.startsWith("wix:image://")) {
    const parts = imageUrl.replace("wix:image://v1/", "").split("/");
    return `https://static.wixstatic.com/media/${parts[0]}`;
  }
  return `https://static.wixstatic.com/media/${imageUrl}`;
}

export function readSeoTags(post: BlogPost | null | undefined): WixPostSeo {
  const tags = post?.seoData?.tags ?? [];
  if (!tags.length) return {};

  const metaByName = (name: string, key: "name" | "property" = "name") =>
    tags.find((t) => t.type === "meta" && !t.disabled && t.props?.[key] === name)?.props?.content;

  return {
    title: tags.find((t) => t.type === "title" && !t.disabled)?.children,
    description: metaByName("description"),
    ogTitle: metaByName("og:title", "property"),
    ogDescription: metaByName("og:description", "property"),
    ogImage: metaByName("og:image", "property"),
    canonical: tags.find(
      (t) => t.type === "link" && !t.disabled && t.props?.rel === "canonical",
    )?.props?.href,
  };
}

export interface SafePostsResponse {
  posts?: BlogPost[];
}

const hasWixClientId = Boolean(process.env.NEXT_PUBLIC_WIX_CLIENT_ID);
const blogRevalidateSeconds = 3600;

async function fetchAllPosts(limit: number): Promise<SafePostsResponse> {
  if (!hasWixClientId) {
    return { posts: [] };
  }

  const wixClient = getWixClient();
  const response = await wixClient.posts.listPosts({
    paging: { limit },
  });
  return response as SafePostsResponse;
}

const getCachedAllPosts = unstable_cache(fetchAllPosts, ["wix-blog-posts"], {
  revalidate: blogRevalidateSeconds,
  tags: ["wix-blog-posts"],
});

export async function getAllPosts(limit = 12): Promise<SafePostsResponse> {
  return getCachedAllPosts(limit);
}

async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!hasWixClientId) {
    return null;
  }

  const wixClient = getWixClient();
  const response = await wixClient.posts.getPostBySlug(slug, {
    fieldsets: ["RICH_CONTENT", "SEO"],
  });
  return (response.post as BlogPost | undefined) || null;
}

const getCachedPostBySlug = unstable_cache(fetchPostBySlug, ["wix-blog-post"], {
  revalidate: blogRevalidateSeconds,
  tags: ["wix-blog-post"],
});

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return getCachedPostBySlug(slug);
}

export async function getCategories() {
  if (!hasWixClientId) {
    return [];
  }

  const wixClient = getWixClient();
  const response = await wixClient.categories.queryCategories({});
  return response.categories || [];
}

export async function getPostsByCategory(
  categoryId: string,
  limit = 12
): Promise<SafePostsResponse> {
  if (!hasWixClientId) {
    return { posts: [] };
  }

  const wixClient = getWixClient();
  const response = await wixClient.posts.listPosts({
    paging: { limit },
    categoryIds: [categoryId],
  });
  return response as SafePostsResponse;
}
