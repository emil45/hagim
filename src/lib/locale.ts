import { routing, Locale } from "@/i18n/routing";

/**
 * Gets the localized path for a given path and locale.
 * Hebrew (default locale) pages are at root (/), other locales are prefixed (/en/, /ru/).
 */
export function getLocalizedPath(path: string, locale: string): string {
  if (locale === routing.defaultLocale) {
    return path || "/";
  }
  return `/${locale}${path}`;
}

/**
 * Gets the localized URL for a given path and locale (with base URL).
 */
export function getLocalizedUrl(basePath: string, locale: string, baseUrl: string): string {
  if (locale === routing.defaultLocale) {
    return `${baseUrl}${basePath}`;
  }
  return `${baseUrl}/${locale}${basePath}`;
}

/**
 * Generates language alternates for metadata.
 * Returns an object mapping locale codes to full URLs.
 */
export function generateLanguageAlternates(
  basePath: string,
  baseUrl: string
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = getLocalizedUrl(basePath, loc, baseUrl);
  }
  return languages;
}

/**
 * Gets the path segment without the locale prefix.
 * Works whether the path has a locale prefix or not.
 */
export function getPathWithoutLocale(pathname: string, currentLocale: string): string {
  // If current locale is the default (Hebrew), path has no prefix
  if (currentLocale === routing.defaultLocale) {
    return pathname;
  }
  // Otherwise, remove the locale prefix
  return pathname.replace(`/${currentLocale}`, "") || "/";
}

/**
 * Checks if a locale is the default locale (Hebrew).
 */
export function isDefaultLocale(locale: string): boolean {
  return locale === routing.defaultLocale;
}

/**
 * Maps a Gregorian year to the corresponding Hebrew year string.
 * The Hebrew year starts in Tishrei (Sep/Oct), so for most of the Gregorian year
 * (Jan–Sep) the Hebrew year = Gregorian + 3760.
 * This returns the Hebrew year that overlaps Pesach (Nisan) of that Gregorian year.
 */
const HEBREW_YEAR_STRINGS: Record<number, string> = {
  5785: "תשפ״ה",
  5786: "תשפ״ו",
  5787: "תשפ״ז",
  5788: "תשפ״ח",
  5789: "תשפ״ט",
  5790: "תש״צ",
};

export function getHebrewYear(gregorianYear: number): string {
  const hebrewYear = gregorianYear + 3760;
  return HEBREW_YEAR_STRINGS[hebrewYear] ?? `${hebrewYear}`;
}
