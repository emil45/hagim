import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "הכשרת כלים לפסח - Kashering Utensils for Passover",
    short_name: "הכשרת כלים",
    description:
      "מדריך הלכתי להכשרת כלים לפסח - A halachic guide to kashering utensils for Passover",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e3a5f",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
