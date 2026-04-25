import { siteConfig } from "@/config/site";

export const canonicalSiteUrl = siteConfig.url.replace(/\/+$/, "");

export function normalizeCanonicalPath(path = "/"): string {
  const url = new URL(path, `${canonicalSiteUrl}/`);
  const normalizedPath = url.pathname.replace(/\/+$/, "");

  return normalizedPath || "/";
}

export function getCanonicalUrl(path = "/"): string {
  const normalizedPath = normalizeCanonicalPath(path);

  if (normalizedPath === "/") {
    return canonicalSiteUrl;
  }

  return `${canonicalSiteUrl}${normalizedPath}`;
}
