import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hagim.online";

  const pages = ["", "/glossary"];

  const entries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and page
  for (const locale of routing.locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
