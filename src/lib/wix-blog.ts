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

interface WixUnavailableMeta {
  wixUnavailable: boolean;
}

export interface SafePostsResponse {
  posts?: BlogPost[];
  meta?: WixUnavailableMeta;
}

const hasWixClientId = Boolean(process.env.NEXT_PUBLIC_WIX_CLIENT_ID);

function withUnavailableMeta(response: SafePostsResponse): SafePostsResponse {
  return {
    ...response,
    meta: {
      ...(response.meta || {}),
      wixUnavailable: true,
    },
  };
}

function logWixError(context: string, error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[wix-blog] ${context}:`, error);
  }
}

export async function getAllPosts(limit = 12): Promise<SafePostsResponse> {
  if (!hasWixClientId) {
    return withUnavailableMeta({ posts: [] });
  }

  try {
    const wixClient = getWixClient();
    const response = await wixClient.posts.listPosts({
      paging: { limit },
    });
    return response as SafePostsResponse;
  } catch (error) {
    logWixError("listPosts failed", error);
    return withUnavailableMeta({ posts: [] });
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!hasWixClientId) {
    return null;
  }

  try {
    const wixClient = getWixClient();
    const response = await wixClient.posts.getPostBySlug(slug, {
      fieldsets: ["RICH_CONTENT"],
    });
    return (response.post as BlogPost | undefined) || null;
  } catch (error) {
    logWixError(`getPostBySlug failed for slug "${slug}"`, error);
    return null;
  }
}

export async function getCategories() {
  if (!hasWixClientId) {
    return [];
  }

  try {
    const wixClient = getWixClient();
    const response = await wixClient.categories.queryCategories({});
    return response.categories || [];
  } catch (error) {
    logWixError("queryCategories failed", error);
    return [];
  }
}

export async function getPostsByCategory(
  categoryId: string,
  limit = 12
): Promise<SafePostsResponse> {
  if (!hasWixClientId) {
    return withUnavailableMeta({ posts: [] });
  }

  try {
    const wixClient = getWixClient();
    const response = await wixClient.posts.listPosts({
      paging: { limit },
      categoryIds: [categoryId],
    });
    return response as SafePostsResponse;
  } catch (error) {
    logWixError(`getPostsByCategory failed for category "${categoryId}"`, error);
    return withUnavailableMeta({ posts: [] });
  }
}
