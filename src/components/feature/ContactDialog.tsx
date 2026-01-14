"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const EMAIL = "emil45@gmail.com";
const COPY_FEEDBACK_DURATION = 2000;

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps): React.ReactElement {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");

  function copyEmail(): void {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogDescription className="text-center">
            {t("dialogDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <button
            onClick={copyEmail}
            className="flex items-center gap-2 text-primary hover:underline transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span className="text-base font-medium" dir="ltr">
              {EMAIL}
            </span>
            {copied && (
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <Check className="h-4 w-4" />
                {t("copied")}
              </span>
            )}
          </button>

          <p className="text-center text-muted-foreground mt-2">
            {t("personalMessage")}
          </p>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {tCommon("close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
