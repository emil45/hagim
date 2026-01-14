import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hagim.online"),
  title: {
    default: "הכשרת כלים לפסח",
    template: "%s | הכשרת כלים לפסח",
  },
  description:
    "מדריך הלכתי ברור ומדויק להכשרת כלים לפסח: הגעלה, ליבון, עירוי, חמץ ושאור - כולל מקורות מהתורה, גמרא והפוסקים. מתאים לכל הרמות.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
