import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: the "0x" mark on the site's ink, matching the navbar. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1f2430",
          color: "#f6f2ea",
          fontSize: "20px",
          fontWeight: 700,
          borderRadius: "7px",
        }}
      >
        0x
      </div>
    ),
    size
  );
}
