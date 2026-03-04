"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { getLocalizedPath } from "@/lib/locale";
import type { GlossaryTerm } from "@/types/glossary";

interface GlossaryPopoverProps {
  term: GlossaryTerm;
  children: React.ReactNode;
}

export function GlossaryPopover({
  term,
  children,
}: GlossaryPopoverProps): React.ReactElement {
  const t = useTranslations("glossaryPopover");
  const params = useParams();
  const locale = params.locale as string;

  const glossaryLink = getLocalizedPath(
    `/glossary#term-${term.id}`,
    locale
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          role="button"
          tabIndex={0}
          style={{ all: "unset", cursor: "pointer", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "2px" }}
          className="decoration-primary/50 hover:decoration-primary"
        >
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3" side="top">
        <div className="space-y-2">
          <p className="font-bold text-sm">{term.term}</p>
          <p className="text-xs text-muted-foreground line-clamp-3">
            {term.definition}
          </p>
          <a
            href={glossaryLink}
            className="text-xs text-primary hover:underline inline-block"
          >
            {t("readMore")} &rarr;
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}
