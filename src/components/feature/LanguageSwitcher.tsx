"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { routing, Locale } from "@/i18n/routing";
import { getLocalizedPath, getPathWithoutLocale } from "@/lib/locale";

const LANGUAGE_NAMES: Record<Locale, string> = {
  he: "עברית",
  en: "English",
  ru: "Русский",
};

export function LanguageSwitcher(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as Locale;

  function switchLocale(newLocale: Locale): void {
    // Get the path without the current locale prefix
    const pathWithoutLocale = getPathWithoutLocale(pathname, currentLocale);
    // Get the new localized path
    const newPath = getLocalizedPath(pathWithoutLocale, newLocale);
    router.push(newPath);
  }

  return (
    <div className="flex flex-col gap-2">
      {routing.locales.map((locale) => (
        <Button
          key={locale}
          variant={currentLocale === locale ? "default" : "outline"}
          className="w-full justify-start"
          onClick={() => switchLocale(locale)}
        >
          {LANGUAGE_NAMES[locale]}
        </Button>
      ))}
    </div>
  );
}
