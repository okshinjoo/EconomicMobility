// Per-article social cards (July 17, 2026, owner ask: "title-card OG images
// would make shared links look intentional"). One 1200x630 card per guide,
// in house voice: forest field, Lora serif title, amber squiggle, the
// article header's dot-grid ornament in the topic accent. Satori renders
// these — flexbox only, every element explicit display:flex, SVGs need
// literal width/height (which is why TopicMark isn't used: it sizes via
// Tailwind classes Satori can't resolve). Lora ships in assets/fonts/
// (OFL) and is fs-read (literal path so Vercel traces it into the
// function), with a fetch fallback from the live origin.

import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { getArticle } from "@/lib/articles";
import { topics } from "@/lib/topics";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Empower — a free, plain-English money guide";

let loraPromise: Promise<ArrayBuffer> | null = null;
function loadLora(): Promise<ArrayBuffer> {
  if (!loraPromise) {
    loraPromise = readFile(join(process.cwd(), "assets/fonts/lora-semibold.ttf"))
      .then((b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer)
      .catch(() =>
        // Tracing missed the asset (shouldn't happen): pull the same file
        // from the deployed origin instead. Don't cache a failure.
        fetch("https://economicmobilityproject.org/fonts/lora-semibold.ttf").then((r) => {
          if (!r.ok) {
            loraPromise = null;
            throw new Error("Lora font unavailable");
          }
          return r.arrayBuffer();
        })
      );
  }
  return loraPromise;
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ topic: string; article: string }>;
}) {
  const { topic, article } = await params;
  const t = topics.find((x) => x.id === topic);
  const found = t ? getArticle(t.id, article) : undefined;

  const title = found?.title ?? "Free, plain-English money help";
  const kicker = t?.title ?? "Empower";
  const accent = t?.color ?? "#e7a33c";
  const meta = found ? `${found.level} · ${found.readMinutes} min read` : "";
  const fontSize = title.length > 72 ? 50 : title.length > 46 ? 58 : 66;
  const lora = await loadLora();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c4a39",
          padding: "56px 64px",
          fontFamily: "Lora",
          position: "relative",
        }}
      >
        {/* The article header's dot-grid ornament, topic accent */}
        <svg
          width="150"
          height="150"
          viewBox="0 0 56 56"
          style={{ position: "absolute", top: 52, right: 64, opacity: 0.35 }}
        >
          {[6, 22, 38, 54].map((y) =>
            [6, 22, 38, 54].map((x) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill={accent} />
            ))
          )}
        </svg>

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 46,
              height: 46,
              backgroundColor: "#e7a33c",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#11211c",
              fontSize: 28,
            }}
          >
            E
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#fbf8f1" }}>
            <span style={{ color: "#e7a33c" }}>EMP</span>ower
          </div>
        </div>

        {/* Kicker + title + squiggle */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1020 }}>
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#e7a33c",
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              fontSize,
              color: "#fbf8f1",
              lineHeight: 1.12,
              marginTop: 20,
            }}
          >
            {title}
          </div>
          <svg width="330" height="21" viewBox="0 0 300 18" style={{ marginTop: 26 }}>
            <path
              d="M3,13 C60,4 120,4 160,9 C210,15 260,8 297,5"
              fill="none"
              stroke="#e7a33c"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Bottom line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 23,
            color: "rgba(251, 248, 241, 0.7)",
          }}
        >
          <div style={{ display: "flex" }}>
            economicmobilityproject.org · free, no sign-up
          </div>
          {meta ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: accent,
                  display: "flex",
                }}
              />
              <div style={{ display: "flex" }}>{meta}</div>
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Lora", data: lora, weight: 600, style: "normal" }],
    }
  );
}
