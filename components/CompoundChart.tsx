"use client";

import { useEffect, useRef, useState } from "react";

/** Decorative compound-growth chart for the homepage "math, visualized"
 *  band (Base44 direct copy, July 2026). Amber line draws itself in, faint
 *  bars rise, dots pop — once, on first viewport entry. Server renders the
 *  finished chart (no-JS and reduced-motion visitors see it complete); the
 *  animation only arms client-side, CountUp-style. Deliberately no dollar
 *  axis: the copy calls it arithmetic, not a prediction — the calculators
 *  hold the real numbers. */

const BARS = [30, 42, 58, 75, 96];
const LINE = "M20,200 L100,170 L180,130 L260,85 L340,30 L380,10";
const AREA = `${LINE} L380,240 L20,240 Z`;
const YEAR_LABELS: Array<[number, string]> = [
  [40, "Yr 1"],
  [110, "Yr 5"],
  [180, "Yr 10"],
  [250, "Yr 20"],
  [320, "Yr 30"],
];

export default function CompoundChart({
  className = "",
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [phase, setPhase] = useState<"final" | "hidden" | "in">("final");
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = svgRef.current;
    const path = lineRef.current;
    if (!el || !path) return;
    setLen(path.getTotalLength());
    setPhase("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Two frames so the hidden state paints before transitions start.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setPhase("in"))
        );
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = phase === "hidden";
  const armed = phase !== "final";

  return (
    <div className={`relative ${className}`} aria-hidden>
      <svg
        ref={svgRef}
        viewBox="0 0 400 240"
        className="h-full w-full"
        fill="none"
      >
        {/* Dashed gridlines */}
        {[0, 60, 120, 180, 240].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke="rgba(251,248,241,0.14)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
        {/* Faint bars rising under the line */}
        {BARS.map((h, i) => (
          <rect
            key={i}
            x={40 + i * 70}
            y={240 - h * 2}
            width="36"
            height={h * 2}
            rx="4"
            fill="#11211c"
            fillOpacity="0.25"
            style={
              armed
                ? {
                    transformBox: "fill-box",
                    transformOrigin: "bottom",
                    transform: hidden ? "scaleY(0)" : "scaleY(1)",
                    transition: `transform 0.6s cubic-bezier(0.22,1,0.36,1) ${
                      0.3 + i * 0.12
                    }s`,
                  }
                : undefined
            }
          />
        ))}
        {/* Area under the line */}
        <path
          d={AREA}
          fill="#e7a33c"
          fillOpacity="0.1"
          style={
            armed
              ? {
                  opacity: hidden ? 0 : 1,
                  transition: "opacity 1s ease 1.2s",
                }
              : undefined
          }
        />
        {/* The line itself, drawing left to right */}
        <path
          ref={lineRef}
          d={LINE}
          stroke="#e7a33c"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            armed
              ? {
                  strokeDasharray: len,
                  strokeDashoffset: hidden ? len : 0,
                  transition: "stroke-dashoffset 1.8s ease-in-out",
                }
              : undefined
          }
        />
        {/* Milestone dots popping in along the line */}
        {BARS.map((_, i) => (
          <circle
            key={i}
            cx={58 + i * 70}
            cy={200 - i * 42}
            r="5"
            fill="#e7a33c"
            stroke="#fbf8f1"
            strokeWidth="2"
            style={
              armed
                ? {
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    transform: hidden ? "scale(0)" : "scale(1)",
                    transition: `transform 0.3s ease ${1.5 + i * 0.15}s`,
                  }
                : undefined
            }
          />
        ))}
        {/* Year labels */}
        {YEAR_LABELS.map(([x, label]) => (
          <text
            key={label}
            x={x}
            y="232"
            fontSize="10"
            fill="rgba(251,248,241,0.5)"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}
