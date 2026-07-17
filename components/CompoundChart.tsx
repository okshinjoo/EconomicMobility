"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/** Decorative chart for the homepage "math, visualized" band (Base44
 *  direct copy, July 2026; variants July 17 — owner: hovering a calculator
 *  in the rail "should show a different visual"). Five variants, one per
 *  rail calculator, each computed from REAL arithmetic below (the honesty
 *  rule: "not a prediction, just arithmetic") and normalized into the same
 *  400×240 stage. Look follows the owner's bklit.com reference (July 17):
 *  a smooth curve, dashed column gridlines at the milestones, labels
 *  centered under their columns. Amber line draws in, columns fade up,
 *  dots pop — the full show once on first viewport entry, a faster
 *  replay on every variant swap. Server renders the finished compound chart (no-JS and
 *  reduced-motion visitors see charts complete, swaps included).
 *  Deliberately no dollar axis: the calculators hold the real numbers. */

export type MathVariant = "compound" | "debt" | "savings" | "loan" | "tax";

const X0 = 20, X1 = 380, Y_TOP = 20, Y_BASE = 220;

interface VariantData {
  line: string;
  area: string;
  /** Optional dashed reference (savings goal line, tax gross line). */
  refLine?: string;
  dots: Array<[number, number]>;
  labels: Array<[number, string]>;
  caption: string;
}

/** Normalize a sampled series into the stage; returns a SMOOTH path
 *  (Catmull-Rom converted to cubic beziers — the bklit look) plus
 *  interpolators. */
function stage(values: number[], yMax: number) {
  const n = values.length - 1;
  const x = (i: number) => X0 + (i / n) * (X1 - X0);
  const y = (v: number) => Y_BASE - (v / yMax) * (Y_BASE - Y_TOP);
  const pts = values.map((v, i) => [x(i), y(v)] as const);
  let line = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    line += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  const area = `${line} L${X1},${Y_BASE} L${X0},${Y_BASE} Z`;
  return { line, area, x, y };
}

/** Five milestone picks along a series: dot coords + labels centered on
 *  the same column x (clamped so edge labels stay inside the stage). */
function milestones(
  values: number[],
  yMax: number,
  fracs: number[],
  names: string[]
) {
  const { x, y } = stage(values, yMax);
  const n = values.length - 1;
  const dots: Array<[number, number]> = [];
  const labels: Array<[number, string]> = [];
  fracs.forEach((f, i) => {
    const idx = Math.round(f * n);
    dots.push([x(idx), y(values[idx])]);
    labels.push([Math.min(366, Math.max(34, x(idx))), names[i]]);
  });
  return { dots, labels };
}

const VARIANTS: Record<MathVariant, VariantData> = (() => {
  const out = {} as Record<MathVariant, VariantData>;

  // Compound: $200/mo at 7%, 30 years.
  {
    const r = 0.07 / 12;
    const vals: number[] = [];
    let v = 0;
    for (let m = 0; m <= 360; m++) {
      if (m % 15 === 0) vals.push(v);
      v = v * (1 + r) + 200;
    }
    const max = vals[vals.length - 1];
    const s = stage(vals, max);
    const m = milestones(vals, max, [1 / 30, 5 / 30, 10 / 30, 20 / 30, 1], [
      "Yr 1", "Yr 5", "Yr 10", "Yr 20", "Yr 30",
    ]);
    out.compound = {
      line: s.line, area: s.area, ...m,
      caption: "$200 a month at 7% — thirty years of compounding.",
    };
  }

  // Debt payoff: $6,000 at 22% APR, $300/mo — gone in about two years.
  {
    const r = 0.22 / 12;
    const vals: number[] = [];
    let b = 6000;
    vals.push(b);
    while (b > 0 && vals.length < 40) {
      b = Math.max(0, b * (1 + r) - 300);
      vals.push(b);
    }
    const max = 6000;
    const s = stage(vals, max);
    const n = vals.length - 1;
    const m = milestones(vals, max, [0, 0.25, 0.5, 0.75, 1], [
      "Mo 1", `Mo ${Math.round(n * 0.25)}`, `Mo ${Math.round(n * 0.5)}`,
      `Mo ${Math.round(n * 0.75)}`, `Mo ${n}`,
    ]);
    out.debt = {
      line: s.line, area: s.area, ...m,
      caption: "$6,000 of card debt at 22% APR, $300 a month: gone in 26 months.",
    };
  }

  // Savings goal: $150/mo at 4% APY toward $5,000 (the dashed line).
  {
    const r = 0.04 / 12;
    const goal = 5000;
    const vals: number[] = [];
    let v = 0;
    vals.push(v);
    while (v < goal && vals.length < 40) {
      v = v * (1 + r) + 150;
      vals.push(Math.min(v, goal * 1.04));
    }
    const max = goal * 1.12;
    const s = stage(vals, max);
    const gy = Y_BASE - (goal / max) * (Y_BASE - Y_TOP);
    const n = vals.length - 1;
    const m = milestones(vals, max, [0, 0.25, 0.5, 0.75, 1], [
      "Mo 1", `Mo ${Math.round(n * 0.25)}`, `Mo ${Math.round(n * 0.5)}`,
      `Mo ${Math.round(n * 0.75)}`, `Mo ${n}`,
    ]);
    out.savings = {
      line: s.line,
      area: s.area,
      refLine: `M${X0},${gy.toFixed(1)} L${X1},${gy.toFixed(1)}`,
      ...m,
      caption: "$150 a month toward a $5,000 goal (the dashed line).",
    };
  }

  // Student loan: $30,000 at 6.8%, standard 10-year payoff.
  {
    const r = 0.068 / 12;
    const n = 120;
    const pay = (30000 * r) / (1 - Math.pow(1 + r, -n));
    const vals: number[] = [];
    let b = 30000;
    for (let m = 0; m <= n; m++) {
      if (m % 5 === 0) vals.push(Math.max(0, b));
      b = b * (1 + r) - pay;
    }
    const max = 30000;
    const s = stage(vals, max);
    const m = milestones(vals, max, [0, 0.3, 0.5, 0.7, 1], [
      "Yr 1", "Yr 3", "Yr 5", "Yr 7", "Yr 10",
    ]);
    out.loan = {
      line: s.line, area: s.area, ...m,
      caption: "$30,000 borrowed at 6.8% — the standard 10-year payoff.",
    };
  }

  // Tax: take-home (solid) vs gross (dashed) as income climbs. Single
  // filer, 2024-shape brackets + standard deduction + 7.65% FICA —
  // simplified on purpose; the paycheck calculator holds the real detail.
  {
    const gross: number[] = [];
    const net: number[] = [];
    for (let g = 0; g <= 160000; g += 8000) {
      const taxable = Math.max(0, g - 14600);
      let tax = 0;
      const brackets: Array<[number, number]> = [
        [11600, 0.1], [47150, 0.12], [100525, 0.22], [Infinity, 0.24],
      ];
      let prev = 0;
      for (const [cap, rate] of brackets) {
        if (taxable > prev) tax += (Math.min(taxable, cap) - prev) * rate;
        if (taxable <= cap) break;
        prev = cap;
      }
      net.push(g - tax - g * 0.0765);
      gross.push(g);
    }
    const max = 160000;
    const s = stage(net, max);
    const ref = stage(gross, max);
    const m = milestones(net, max, [0.2, 0.4, 0.6, 0.8, 1], [
      "$32k", "$64k", "$96k", "$128k", "$160k",
    ]);
    out.tax = {
      line: s.line,
      area: s.area,
      refLine: ref.line,
      ...m,
      caption: "Take-home (solid) vs. gross pay (dashed) as income climbs.",
    };
  }

  return out;
})();

export default function CompoundChart({
  className = "",
  variant = "compound",
}: {
  className?: string;
  variant?: MathVariant;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [phase, setPhase] = useState<"final" | "hidden" | "in">("final");
  const [len, setLen] = useState(0);
  const [quick, setQuick] = useState(false);
  const enteredRef = useRef(false);

  const data = useMemo(() => VARIANTS[variant], [variant]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = svgRef.current;
    const path = lineRef.current;
    if (!el || !path) return;
    setLen(path.getTotalLength());
    setPhase("hidden");
    if (enteredRef.current) {
      // Variant swap: fast replay, no waiting on the observer.
      setQuick(true);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase("in"))
      );
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        enteredRef.current = true;
        // Two frames so the hidden state paints before transitions start.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setPhase("in"))
        );
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  const hidden = phase === "hidden";
  const armed = phase !== "final";
  // Swap replays run at well under half the entrance timings.
  const t = quick ? 0.4 : 1;

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
        {/* Dashed column gridlines at the milestones (the bklit look) */}
        {data.dots.map(([cx], i) => (
          <line
            key={`col-${i}`}
            x1={cx}
            y1={Y_TOP - 8}
            x2={cx}
            y2={Y_BASE}
            stroke="rgba(251,248,241,0.12)"
            strokeWidth="1"
            strokeDasharray="4 4"
            style={
              armed
                ? {
                    opacity: hidden ? 0 : 1,
                    transition: `opacity ${0.5 * t}s ease ${(0.2 + i * 0.1) * t}s`,
                  }
                : undefined
            }
          />
        ))}
        {/* Soft area fill under the curve */}
        <path
          d={data.area}
          fill="#e7a33c"
          fillOpacity="0.1"
          style={
            armed
              ? {
                  opacity: hidden ? 0 : 1,
                  transition: `opacity ${1 * t}s ease ${1.2 * t}s`,
                }
              : undefined
          }
        />
        {/* Dashed reference line (savings goal / gross pay) */}
        {data.refLine && (
          <path
            d={data.refLine}
            stroke="rgba(251,248,241,0.45)"
            strokeWidth="2"
            strokeDasharray="6 6"
            style={
              armed
                ? {
                    opacity: hidden ? 0 : 1,
                    transition: `opacity ${0.8 * t}s ease ${0.6 * t}s`,
                  }
                : undefined
            }
          />
        )}
        {/* The line itself, drawing left to right */}
        <path
          ref={lineRef}
          d={data.line}
          stroke="#e7a33c"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            armed
              ? {
                  strokeDasharray: len,
                  strokeDashoffset: hidden ? len : 0,
                  transition: `stroke-dashoffset ${1.8 * t}s ease-in-out`,
                }
              : undefined
          }
        />
        {/* Milestone dots popping in along the line */}
        {data.dots.map(([cx, cy], i) => (
          <circle
            key={`${variant}-${i}`}
            cx={cx}
            cy={cy}
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
                    transition: `transform ${0.3 * t}s ease ${
                      (1.5 + i * 0.15) * t
                    }s`,
                  }
                : undefined
            }
          />
        ))}
        {/* Axis labels */}
        {data.labels.map(([x, label]) => (
          <text
            key={label}
            x={x}
            y="234"
            fontSize="10"
            textAnchor="middle"
            fill="rgba(251,248,241,0.5)"
          >
            {label}
          </text>
        ))}
      </svg>
      <p className="mt-3 text-xs leading-5 text-cream/60">{data.caption}</p>
    </div>
  );
}
