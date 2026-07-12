"use client";

// Small dependency-free SVG charts (donut + trend line) for the calculators.
// Each chart draws itself in once on first viewport entry (donut segments
// bloom with a stagger, trend lines draw left to right); prefers-reduced-
// motion renders the finished chart immediately.

import { useEffect, useRef, useState } from "react";

function useDrawIn() {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          // Double rAF so the pre-draw state paints first and the
          // transition actually runs.
          requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, drawn };
}

export interface Segment {
  value: number;
  color: string;
  label: string;
}

export function Donut({
  segments,
  size = 168,
  thickness = 26,
  centerTop,
  centerSub,
  className = "h-44 w-44 flex-shrink-0",
  light = false,
}: {
  segments: Segment[];
  size?: number;
  thickness?: number;
  centerTop?: string;
  centerSub?: string;
  /** Rendered box (the viewBox scales into it). */
  className?: string;
  /** Set on cream/paper cards: ink center text + dark track. */
  light?: boolean;
}) {
  const { ref, drawn } = useDrawIn();
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
  let acc = 0;
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={light ? "rgba(17,33,28,0.08)" : "rgba(255,255,255,0.06)"}
        strokeWidth={thickness}
      />
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {segments.map((seg, i) => {
          const len = (Math.max(0, seg.value) / total) * c;
          const node = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={drawn ? `${len} ${c - len}` : `0 ${c}`}
              strokeDashoffset={-acc}
              style={{
                transition: `stroke-dasharray 650ms cubic-bezier(0.25, 0.6, 0.3, 1) ${i * 110}ms`,
              }}
            />
          );
          acc += len;
          return node;
        })}
      </g>
      {centerTop && (
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-display"
          fontSize="26"
          fontWeight="700"
          fill={light ? "#11211c" : "#fbf8f1"}
        >
          {centerTop}
        </text>
      )}
      {centerSub && (
        <text
          x="50%"
          y="59%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill={light ? "rgba(17,33,28,0.55)" : "rgba(251,248,241,0.55)"}
        >
          {centerSub}
        </text>
      )}
    </svg>
  );
}

export function Legend({
  items,
}: {
  items: { color: string; label: string; value?: string }[];
}) {
  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li
          key={it.label}
          className="flex items-center justify-between gap-3 text-sm"
        >
          <span className="inline-flex items-center gap-2 text-cream/75">
            <span
              className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ background: it.color }}
            />
            {it.label}
          </span>
          {it.value && (
            <span className="font-medium text-cream">{it.value}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export interface TrendSeries {
  data: number[];
  color: string;
  fill?: boolean;
  dashed?: boolean;
}

export function TrendChart({
  series,
  height = 150,
  yMax,
  startLabel,
  endLabel,
}: {
  series: TrendSeries[];
  height?: number;
  yMax?: number;
  startLabel?: string;
  endLabel?: string;
}) {
  const { ref, drawn } = useDrawIn();
  const maxLen = Math.max(2, ...series.map((s) => s.data.length));
  const maxY = yMax ?? Math.max(1, ...series.flatMap((s) => s.data));
  const X = (i: number) => (i / (maxLen - 1)) * 100;
  const Y = (v: number) => 100 - (v / maxY) * 100;
  const line = (d: number[]) =>
    d
      .map((v, i) => `${i ? "L" : "M"}${X(i).toFixed(2)},${Y(v).toFixed(2)}`)
      .join(" ");
  const area = (d: number[]) => `${line(d)} L100,100 L0,100 Z`;

  return (
    <div>
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ height, width: "100%" }}
        aria-hidden="true"
      >
        {[25, 50, 75].map((g) => (
          <line
            key={g}
            x1="0"
            y1={g}
            x2="100"
            y2={g}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {series.map((s, i) =>
          s.fill ? (
            <path
              key={`a${i}`}
              d={area(s.data)}
              fill={s.color}
              fillOpacity={drawn ? 0.15 : 0}
              style={{ transition: "fill-opacity 500ms ease 500ms" }}
            />
          ) : null
        )}
        {series.map((s, i) =>
          s.dashed ? (
            // Dashed lines can't use the dashoffset draw trick; fade in.
            <path
              key={`l${i}`}
              d={line(s.data)}
              fill="none"
              stroke={s.color}
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeDasharray="4 3"
              vectorEffect="non-scaling-stroke"
              opacity={drawn ? 1 : 0}
              style={{ transition: "opacity 450ms ease 350ms" }}
            />
          ) : (
            <path
              key={`l${i}`}
              d={line(s.data)}
              fill="none"
              stroke={s.color}
              strokeWidth="2.5"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={drawn ? 0 : 1}
              style={{
                transition: `stroke-dashoffset 900ms cubic-bezier(0.3, 0.6, 0.3, 1) ${i * 130}ms`,
              }}
            />
          )
        )}
      </svg>
      {(startLabel || endLabel) && (
        <div className="mt-1.5 flex justify-between text-[11px] text-cream/45">
          <span>{startLabel}</span>
          <span>{endLabel}</span>
        </div>
      )}
    </div>
  );
}
