import { getWixClient } from "./wix-client";

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
}

export interface SafePostsResponse {
  posts?: BlogPost[];
}

const hasWixClientId = Boolean(process.env.NEXT_PUBLIC_WIX_CLIENT_ID);

export async function getAllPosts(limit = 12): Promise<SafePostsResponse> {
  if (!hasWixClientId) {
    return { posts: [] };
  }

  const wixClient = getWixClient();
  const response = await wixClient.posts.listPosts({
    paging: { limit },
  });
  return response as SafePostsResponse;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!hasWixClientId) {
    return null;
  }

  const wixClient = getWixClient();
  const response = await wixClient.posts.getPostBySlug(slug, {
    fieldsets: ["RICH_CONTENT"],
  });
  return (response.post as BlogPost | undefined) || null;
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
