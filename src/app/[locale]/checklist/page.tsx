import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { AppShell } from "@/components/AppShell";
import { ChecklistContent } from "@/components/feature/ChecklistContent";
import { Locale } from "@/i18n/routing";
import { generateLanguageAlternates, getLocalizedUrl, getHebrewYear } from "@/lib/locale";

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
  const t = await getTranslations({ locale, namespace: "checklist" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const year = new Date().getFullYear();
  const yearParams = { year: String(year), hebrewYear: getHebrewYear(year) };

  const languages = generateLanguageAlternates("/checklist", BASE_URL);
  const canonicalUrl = getLocalizedUrl("/checklist", locale, BASE_URL);

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
      siteName: tMeta("title", yearParams),
      locale: LOCALE_TO_OG_LOCALE[locale as Locale] ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

export default async function ChecklistPage({ params }: PageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "checklist" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tNav("home"),
        item: getLocalizedUrl("", locale, BASE_URL),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("title"),
        item: getLocalizedUrl("/checklist", locale, BASE_URL),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AppShell>
        <ChecklistContent />
      </AppShell>
    </>
  );
}
