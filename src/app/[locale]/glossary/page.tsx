import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { AppShell } from "@/components/AppShell";
import { GlossaryContent } from "@/components/feature/GlossaryContent";
import { glossaryTerms } from "@/lib/glossaryData";
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
  const t = await getTranslations({ locale, namespace: "glossary" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${BASE_URL}/${loc}/glossary`;
  }

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/glossary`,
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      url: `${BASE_URL}/${locale}/glossary`,
      siteName: tMeta("title"),
      locale: LOCALE_TO_OG_LOCALE[locale as Locale] ?? "en_US",
      type: "website",
    },
  };
}

// JSON-LD FAQ Schema for glossary terms
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: glossaryTerms.map((term) => ({
    "@type": "Question",
    name: term.term,
    acceptedAnswer: {
      "@type": "Answer",
      text: term.definition,
    },
  })),
};

export default async function GlossaryPage({ params }: PageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AppShell>
        <GlossaryContent />
      </AppShell>
    </>
  );
}
