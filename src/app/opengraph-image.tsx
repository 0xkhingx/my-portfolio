import { ImageResponse } from "next/og";

export const alt = "0xkhingx — Oluwadamilare Ogundele, Software Engineer & ML Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CREAM = "#f6f2ea";
const INK = "#1f2430";
const INK_SOFT = "#4a4f5c";
const CLAY = "#b0764f";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: CREAM,
          padding: "96px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "88px",
            height: "8px",
            backgroundColor: CLAY,
            borderRadius: "4px",
            marginBottom: "48px",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: "104px",
            fontWeight: 700,
            color: INK,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          0xkhingx
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "44px",
            color: INK,
            marginTop: "20px",
          }}
        >
          Oluwadamilare Ogundele
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "30px",
            color: INK_SOFT,
            marginTop: "36px",
          }}
        >
          Software Engineer · ML Specialist
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: INK_SOFT,
            marginTop: "12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Machine learning, human touch
        </div>
      </div>
    ),
    size
  );
}
