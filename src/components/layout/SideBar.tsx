"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Settings, MessageCircle, X, Book, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tribes } from "@/lib/data";
import { LanguageSwitcher } from "@/components/feature/LanguageSwitcher";

interface SidebarProps {
  selectedTribe: string;
  onTribeChange: (tribe: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  openContactDialog: () => void;
  currentPath: string;
}

function getSidebarPositionClasses(isRTL: boolean, isOpen: boolean): string {
  const baseClasses = "fixed top-0 h-full transition-transform duration-300 ease-in-out";

  if (isRTL) {
    const translateClass = isOpen ? "translate-x-0" : "translate-x-full";
    return `${baseClasses} right-0 ${translateClass} border-l`;
  }

  const translateClass = isOpen ? "translate-x-0" : "-translate-x-full";
  return `${baseClasses} left-0 ${translateClass} border-r`;
}

export function Sidebar({
  selectedTribe,
  onTribeChange,
  isOpen,
  toggleSidebar,
  openContactDialog,
  currentPath,
}: SidebarProps): React.ReactElement {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations();
  const isRTL = locale === "he";

  const isGlossaryActive = currentPath.includes("/glossary");
  const isHomeActive = !isGlossaryActive;

  const sidebarPositionClasses = getSidebarPositionClasses(isRTL, isOpen);

  return (
    <>
      {/* Sidebar backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-card border-border shadow-lg z-50 ${sidebarPositionClasses}`}
      >
        <div className="flex flex-col h-full p-4 pt-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">{t("settings.title")}</h2>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSidebar}
              className="hover:bg-muted"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">{t("common.close")}</span>
            </Button>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">{t("sidebar.pages")}</h3>
            <div className="space-y-2">
              <Button
                variant={isHomeActive ? "default" : "outline"}
                className="w-full justify-start"
                asChild
                onClick={toggleSidebar}
              >
                <Link href={`/${locale}`}>
                  <Home className="h-4 w-4 ml-2 rtl:ml-2 ltr:mr-2 ltr:ml-0" />
                  {t("nav.home")}
                </Link>
              </Button>
              <Button
                variant={isGlossaryActive ? "default" : "outline"}
                className="w-full justify-start"
                asChild
                onClick={toggleSidebar}
              >
                <Link href={`/${locale}/glossary`}>
                  <Book className="h-4 w-4 ml-2 rtl:ml-2 ltr:mr-2 ltr:ml-0" />
                  <span>{t("nav.glossary")}</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">{t("sidebar.tribes")}</h3>
            <div className="space-y-2">
              {tribes.map((tribe) => (
                <Button
                  key={tribe.id}
                  disabled={tribe.disabled}
                  variant={selectedTribe === tribe.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => onTribeChange(tribe.id)}
                >
                  {t(`tribes.${tribe.id}`)}
                  {tribe.disabled && (
                    <span className="text-xs opacity-60 mr-2 rtl:mr-2 ltr:ml-2 ltr:mr-0">
                      ({t("sidebar.comingSoon")})
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">{t("common.language")}</h3>
            <LanguageSwitcher />
          </div>

          <div className="mt-auto space-y-2">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={openContactDialog}
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t("nav.contact")}</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full mt-2 flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span>{t("settings.additionalSettings")}</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
