import { MetadataRoute } from "next";
import { routing, Locale } from "@/i18n/routing";
import { getLocalizedUrl } from "@/lib/locale";

const BASE_URL = "https://hagim.online";
const PAGES = ["", "/glossary", "/about"];

function generateAlternates(page: string): Record<Locale | "x-default", string> {
  const alternates: Record<string, string> = {};
  for (const locale of routing.locales) {
    alternates[locale] = getLocalizedUrl(page || "/", locale, BASE_URL);
  }
  // x-default points to the default locale (Hebrew at root)
  alternates["x-default"] = getLocalizedUrl(page || "/", routing.defaultLocale, BASE_URL);
  return alternates as Record<Locale | "x-default", string>;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of PAGES) {
      entries.push({
        url: getLocalizedUrl(page || "/", locale, BASE_URL),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: generateAlternates(page),
        },
      });
    }
  }

  return entries;
}
