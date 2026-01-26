import { ImageResponse } from "next/og";
import { Locale } from "@/i18n/routing";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const OG_CONTENT: Record<Locale, { title: string; subtitle: string; alt: string }> = {
  he: {
    title: "הכשרת כלים לפסח",
    subtitle: "מדריך הלכתי להכשרת כלים",
    alt: "הכשרת כלים לפסח",
  },
  en: {
    title: "Kashering Utensils for Passover",
    subtitle: "A halachic guide to kashering utensils",
    alt: "Kashering Utensils for Passover",
  },
  ru: {
    title: "Кошерование посуды к Песаху",
    subtitle: "Галахическое руководство по кошерованию",
    alt: "Кошерование посуды к Песаху",
  },
};

export function generateImageMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const content = OG_CONTENT[locale] ?? OG_CONTENT.he;
  return [{ id: "og", alt: content.alt }];
}

export default function Image({ params }: { params: { locale: string } }): ImageResponse {
  const locale = params.locale as Locale;
  const content = OG_CONTENT[locale] ?? OG_CONTENT.he;
  const isRtl = locale === "he";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 120,
            marginBottom: 20,
          }}
        >
          🍷
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            marginBottom: 20,
            direction: isRtl ? "rtl" : "ltr",
            padding: "0 40px",
          }}
        >
          {content.title}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#e0e0e0",
            textAlign: "center",
            direction: isRtl ? "rtl" : "ltr",
            padding: "0 40px",
          }}
        >
          {content.subtitle}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 24,
            color: "#a0a0a0",
          }}
        >
          hagim.online
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
