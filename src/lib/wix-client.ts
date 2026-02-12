import { createClient, OAuthStrategy } from "@wix/sdk";
import { posts, categories } from "@wix/blog";

export function getWixClient() {
  return createClient({
    modules: { posts, categories },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    }),
  });
}
