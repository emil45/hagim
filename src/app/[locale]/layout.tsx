import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Rubik } from "next/font/google";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing, Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { generateLanguageAlternates, getLocalizedUrl } from "@/lib/locale";

const BASE_URL = "https://hagim.online";

const LOCALE_TO_OG_LOCALE: Record<Locale, string> = {
  he: "he_IL",
  ru: "ru_RU",
  en: "en_US",
};

const rubik = Rubik({
  subsets: ["hebrew", "latin", "cyrillic"],
  variable: "--font-rubik",
  display: "swap",
});

export function generateStaticParams(): Array<{ locale: Locale }> {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const languages = generateLanguageAlternates("", BASE_URL);
  const canonicalUrl = getLocalizedUrl("", locale, BASE_URL);

  return {
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Emanuel" }],
    creator: "Emanuel",
    publisher: "hagim.online",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: t("title"),
      locale: LOCALE_TO_OG_LOCALE[locale as Locale] ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<React.ReactElement> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "metadata" });
  const dir = locale === "he" ? "rtl" : "ltr";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("title"),
    url: BASE_URL,
    description: t("description"),
    inLanguage: ["he", "en", "ru"],
    publisher: {
      "@type": "Organization",
      name: "hagim.online",
      url: BASE_URL,
    },
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${rubik.variable} font-sans antialiased`}>
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider defaultTheme="light" storageKey="hagim-theme">
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
