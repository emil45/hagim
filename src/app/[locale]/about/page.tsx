import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { AppShell } from "@/components/AppShell";
import { AboutContent } from "@/components/feature/AboutContent";
import { routing, Locale } from "@/i18n/routing";

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

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${BASE_URL}/${loc}/about`;
  }

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      url: `${BASE_URL}/${locale}/about`,
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
