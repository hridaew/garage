import { MetadataRoute } from "next";
import { getCanonicalUrl } from "@/lib/seo-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: getCanonicalUrl("/sitemap.xml"),
  };
}
