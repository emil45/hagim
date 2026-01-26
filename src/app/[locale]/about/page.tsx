import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { AppShell } from "@/components/AppShell";
import { AboutContent } from "@/components/feature/AboutContent";
import { Locale } from "@/i18n/routing";
import { generateLanguageAlternates, getLocalizedUrl } from "@/lib/locale";

const BASE_URL = "https://hagim.online";

const LOCALE_TO_OG_LOCALE: Record<Locale, string> = {
  he: "he_IL",
  ru: "ru_RU",
  en: "en_US",
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const languages = generateLanguageAlternates("/about", BASE_URL);
  const canonicalUrl = getLocalizedUrl("/about", locale, BASE_URL);

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      url: canonicalUrl,
      siteName: tMeta("title"),
      locale: LOCALE_TO_OG_LOCALE[locale as Locale] ?? "en_US",
      type: "website",
    },
  };
}

export default async function AboutPage({ params }: PageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AppShell>
      <AboutContent />
    </AppShell>
  );
}
