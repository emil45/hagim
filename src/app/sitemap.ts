import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getLocalizedUrl } from "@/lib/locale";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hagim.online";

  const pages = ["", "/glossary", "/about"];

  const entries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and page
  // Hebrew pages are at root (/), other locales are prefixed (/en/, /ru/)
  for (const locale of routing.locales) {
    for (const page of pages) {
      entries.push({
        url: getLocalizedUrl(page || "/", locale, baseUrl),
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  return entries;
}
