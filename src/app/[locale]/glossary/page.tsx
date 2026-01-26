import type { Metadata } from "next";
import { setRequestLocale, getTranslations, getMessages } from "next-intl/server";
import { AppShell } from "@/components/AppShell";
import { GlossaryContent } from "@/components/feature/GlossaryContent";
import { GLOSSARY_TERM_IDS } from "@/lib/glossaryData";
import { Locale } from "@/i18n/routing";
import { generateLanguageAlternates, getLocalizedUrl } from "@/lib/locale";
import type { GlossaryTermContent } from "@/types/glossary";

const BASE_URL = "https://hagim.online";

const LOCALE_TO_OG_LOCALE: Record<Locale, string> = {
  he: "he_IL",
  ru: "ru_RU",
  en: "en_US",
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface Messages {
  glossaryTerms: Record<string, GlossaryTermContent>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "glossary" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const languages = generateLanguageAlternates("/glossary", BASE_URL);
  const canonicalUrl = getLocalizedUrl("/glossary", locale, BASE_URL);

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

export default async function GlossaryPage({ params }: PageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);

  // Get localized messages for JSON-LD
  const messages = (await getMessages()) as unknown as Messages;
  const glossaryTermsMessages = messages.glossaryTerms || {};

  const t = await getTranslations({ locale, namespace: "glossary" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  // Build localized JSON-LD FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GLOSSARY_TERM_IDS.map((termId) => {
      const content = glossaryTermsMessages[termId];
      return {
        "@type": "Question",
        name: content?.term || termId,
        acceptedAnswer: {
          "@type": "Answer",
          text: content?.definition || "",
        },
      };
    }),
  };

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
        item: getLocalizedUrl("/glossary", locale, BASE_URL),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AppShell>
        <GlossaryContent />
      </AppShell>
    </>
  );
}
