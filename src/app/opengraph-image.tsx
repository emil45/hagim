import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "הכשרת כלים לפסח";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image(): ImageResponse {
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
            direction: "rtl",
          }}
        >
          הכשרת כלים לפסח
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#e0e0e0",
            textAlign: "center",
            direction: "rtl",
          }}
        >
          מדריך הלכתי להכשרת כלים
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
