"use client";

import { useTranslations } from "next-intl";

export function Footer(): React.ReactElement {
  const t = useTranslations("footer");

  return (
    <footer className="bg-card py-4 w-full">
      <p className="text-sm text-muted-foreground text-center">{t("blessing")}</p>
    </footer>
  );
}
