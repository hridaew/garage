import { getWixClient } from "./wix-client";

export async function getAllPosts(limit = 12) {
  const wixClient = getWixClient();
  const response = await wixClient.posts.listPosts({
    paging: { limit },
  });
  return response;
}

export async function getPostBySlug(slug: string) {
  const wixClient = getWixClient();
  const response = await wixClient.posts.getPostBySlug(slug, {
    fieldsets: ["RICH_CONTENT"],
  });
  return response.post || null;
}

export async function getCategories() {
  const wixClient = getWixClient();
  const response = await wixClient.categories.queryCategories({});
  return response.categories || [];
}

export async function getPostsByCategory(categoryId: string, limit = 12) {
  const wixClient = getWixClient();
  const response = await wixClient.posts.listPosts({
    paging: { limit },
    categoryIds: [categoryId],
  });
  return response;
}
