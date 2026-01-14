import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["he", "en", "ru"],
  defaultLocale: "he",
});

export type Locale = (typeof routing.locales)[number];
