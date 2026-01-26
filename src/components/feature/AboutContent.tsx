"use client";

import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutContent(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("about");

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/${locale}`)}
            className="mr-4 rtl:mr-4 ltr:ml-4 ltr:mr-0"
          >
            <ArrowRight className="h-5 w-5 rtl:rotate-0 ltr:rotate-180" />
            <span className="sr-only">{t("backToHome")}</span>
          </Button>
          <h1 className="text-3xl font-bold mr-3 rtl:mr-3 ltr:ml-3 ltr:mr-0">
            {t("title")}
          </h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            {t("subtitle")}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("missionTitle")}</h2>
            <p>{t("missionContent")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("featuresTitle")}</h2>
            <ul className="space-y-2">
              <li>{t("feature1")}</li>
              <li>{t("feature2")}</li>
              <li>{t("feature3")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t("disclaimerTitle")}</h2>
            <p className="text-muted-foreground">{t("disclaimerContent")}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
