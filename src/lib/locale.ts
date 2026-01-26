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
