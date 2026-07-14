// Branded social-share image (July 2026 SEO pass — the site had none, so
// shared links showed a blank preview). Generated at the edge via next/og;
// applies site-wide as og:image (child routes inherit unless they add their
// own). Brand palette only, default font (no webfont fetch = no failure
// mode). 1200×630 is the standard OG canvas.

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Empower — free, plain-English financial education for first-generation, low-income, and immigrant students";
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
          justifyContent: "space-between",
          background: "#0c4a39",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              borderRadius: "14px",
              background: "#e7a33c",
              color: "#11211c",
              fontSize: "38px",
              fontWeight: 700,
            }}
          >
            E
          </div>
          <div style={{ display: "flex", fontSize: "34px", fontWeight: 700 }}>
            <span style={{ color: "#e7a33c" }}>EMP</span>
            <span style={{ color: "#fbf8f1" }}>ower</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "68px",
              fontWeight: 700,
              lineHeight: 1.08,
              maxWidth: "900px",
            }}
          >
            <span style={{ color: "#fbf8f1" }}>Money, explained plainly.&nbsp;</span>
            <span style={{ color: "#e7a33c", fontStyle: "italic" }}>
              Free, forever.
            </span>
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "30px",
              color: "rgba(251,248,241,0.82)",
              maxWidth: "860px",
              lineHeight: 1.35,
            }}
          >
            Guides, calculators, and verified scholarships for first-gen,
            low-income, and immigrant students.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "26px", color: "#e7a33c" }}>
          economicmobilityproject.org
        </div>
      </div>
    ),
    { ...size }
  );
}
