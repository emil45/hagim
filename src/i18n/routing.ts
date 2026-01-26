import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["he", "en", "ru"],
  defaultLocale: "he",
  localePrefix: "as-needed",
  localeDetection: false, // Don't auto-detect from Accept-Language - SEO requires consistent URLs
});

export type Locale = (typeof routing.locales)[number];
