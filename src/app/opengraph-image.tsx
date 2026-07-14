import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Don't Burn Crypto — Before you burn it. Donate it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 600,
            letterSpacing: -2,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Before you burn it.
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 600,
            letterSpacing: -2,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Donate it.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: "#8A8A8E",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          dontburncrypto.org
        </div>
      </div>
    ),
    { ...size }
  );
}
