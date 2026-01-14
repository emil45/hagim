import { setRequestLocale } from "next-intl/server";
import { AppShell } from "@/components/AppShell";
import { HomeContent } from "@/components/feature/HomeContent";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps): Promise<React.ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AppShell>
      <HomeContent />
    </AppShell>
  );
}
