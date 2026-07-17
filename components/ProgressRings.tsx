"use client";

/**
 * Concentric progress rings (Apple-Activity style, house voice: flat
 * colors, no gradients, no glow). One SVG, one ring per measure, drawn
 * from the top clockwise. No animation library: the parent renders every
 * measure at 0 on the server, hydration swaps in the real counts, and a
 * CSS transition on stroke-dashoffset draws the rings in — staggered per
 * ring, killed by the global reduced-motion block.
 */
export default function ProgressRings({
  items,
  size = 200,
  strokeWidth = 14,
}: {
  /** Outer ring first. done is capped at total for the arc. */
  items: { label: string; done: number; total: number; color: string }[];
  size?: number;
  strokeWidth?: number;
}) {
  const gap = 4;
  const step = strokeWidth + gap;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="-rotate-90 shrink-0"
      aria-hidden
    >
      {items.map((item, i) => {
        const radius = (size - strokeWidth) / 2 - i * step;
        const circumference = radius * 2 * Math.PI;
        const pct = item.total > 0 ? Math.min(item.done / item.total, 1) : 0;
        return (
          <g key={item.label}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeOpacity={0.14}
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - pct)}
              style={{
                transition: `stroke-dashoffset 1400ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 180}ms`,
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}
