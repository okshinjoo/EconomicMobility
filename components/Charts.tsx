// Small dependency-free SVG charts (donut + trend line) for the calculators.

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
}: {
  segments: Segment[];
  size?: number;
  thickness?: number;
  centerTop?: string;
  centerSub?: string;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
  let acc = 0;
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="h-44 w-44 flex-shrink-0"
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
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
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-acc}
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
          fill="#fbf8f1"
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
          fill="rgba(251,248,241,0.55)"
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
            <path key={`a${i}`} d={area(s.data)} fill={s.color} fillOpacity="0.15" />
          ) : null
        )}
        {series.map((s, i) => (
          <path
            key={`l${i}`}
            d={line(s.data)}
            fill="none"
            stroke={s.color}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeDasharray={s.dashed ? "4 3" : undefined}
            vectorEffect="non-scaling-stroke"
          />
        ))}
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
