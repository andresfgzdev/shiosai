import { ImageResponse } from "next/og";
import { hero, site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#13265C";
const paper = "#F2EEE3";
const cobalt = "#244C9A";
const copper = "#A9441F";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{ display: "flex", width: "100%", height: "100%", background: cobalt, padding: 24 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          background: paper,
          padding: 64,
          border: `2px solid ${ink}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            color: ink,
          }}
        >
          <span>SHIOSAI · MANAZURU HARBOUR</span>
          <span style={{ color: copper }}>NO. 276 · 2026</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1,
            color: ink,
            letterSpacing: -3,
          }}
        >
          {hero.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: ink,
          }}
        >
          <span style={{ fontSize: 26 }}>
            Nine course tide menu · Book a table at 17:30 or 20:00
          </span>
          <span style={{ fontSize: 64, fontWeight: 700, color: cobalt }}>¥16,500</span>
        </div>
      </div>
    </div>,
    size,
  );
}
