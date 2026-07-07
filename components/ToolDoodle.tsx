// Flat pastel product-tile styling + hand-coded "data doodles" for the
// calculator categories — shared by the homepage tools band and /tools hub.

// Per-category color block + a small hand-coded "data doodle" for the tools
// band — flat pastel product tiles (Wealthsimple-style) in brand-adjacent
// hues, each with a finance-shaped graphic (allocation bars, payoff line,
// growth curve, cost bars) instead of generic icon tiles.
export const toolStyles: Record<string, { bg: string; accent: string }> = {
  budgeting: { bg: "#f3dcab", accent: "#c9842a" }, // pale amber / gold
  debt: { bg: "#f0d0c0", accent: "#b7593f" }, // pale clay / terracotta
  saving: { bg: "#d0e5d8", accent: "#157a5a" }, // pale mint / green
  college: { bg: "#d7e2e9", accent: "#3f6478" }, // pale sky / slate
};

export default function ToolDoodle({
  id,
  color,
  wide,
}: {
  id: string;
  color: string;
  wide?: boolean;
}) {
  const ink = "#11211c";
  const common = {
    viewBox: wide ? "0 0 640 72" : "0 0 320 72",
    "aria-hidden": true,
    className: wide ? "h-20 w-full" : "h-16 w-full",
    preserveAspectRatio: "xMinYMid meet",
  } as const;

  switch (id) {
    case "budgeting": {
      // A budget at a glance: spending donut + allocation bars.
      const C = 2 * Math.PI * 26;
      const barWidths = wide ? [420, 260, 150] : [190, 120, 70];
      return (
        <svg {...common}>
          <circle cx="36" cy="36" r="26" fill="none" stroke={ink} strokeOpacity="0.12" strokeWidth="13" />
          <circle
            cx="36" cy="36" r="26" fill="none" stroke={color} strokeWidth="13"
            strokeDasharray={`${C * 0.52} ${C}`} transform="rotate(-90 36 36)"
          />
          <circle
            cx="36" cy="36" r="26" fill="none" stroke={color} strokeOpacity="0.45" strokeWidth="13"
            strokeDasharray={`${C * 0.22} ${C}`} strokeDashoffset={-C * 0.52} transform="rotate(-90 36 36)"
          />
          <rect x="92" y="10" width={barWidths[0]} height="11" rx="5.5" fill={color} />
          <rect x="92" y="31" width={barWidths[1]} height="11" rx="5.5" fill={color} opacity="0.45" />
          <rect x="92" y="52" width={barWidths[2]} height="11" rx="5.5" fill={ink} opacity="0.14" />
        </svg>
      );
    }
    case "debt": {
      // Monthly balances shrinking to zero, payoff line overlaid.
      const heights = (wide
        ? [46, 40, 34, 29, 24, 19, 15, 12, 9, 7, 5, 4, 3, 3]
        : [46, 40, 34, 29, 24, 19, 15]
      );
      const line = wide ? "M10,12 C170,20 380,44 625,60" : "M10,14 C90,22 200,44 305,58";
      const dot = wide ? { x: 625, y: 60 } : { x: 305, y: 58 };
      return (
        <svg {...common}>
          {heights.map((h, i) => (
            <rect
              key={i} x={8 + i * 44} y={64 - h} width="26" height={h} rx="4"
              fill={color} opacity="0.28"
            />
          ))}
          <path d={`M2,64 h${wide ? 632 : 312}`} stroke={ink} strokeOpacity="0.2" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
          <path d={line} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <circle cx={dot.x} cy={dot.y} r="5.5" fill={color} />
        </svg>
      );
    }
    case "saving": {
      // Contributions stacking up, compound growth curving above them.
      const heights = (wide
        ? [4, 6, 8, 10, 13, 16, 20, 24, 28, 33, 38, 44, 50, 56]
        : [5, 8, 12, 17, 23, 30, 38]
      );
      const curve = wide ? "M8,62 C220,58 430,34 628,6" : "M8,60 C110,56 220,38 306,12";
      const area = wide ? "M8,62 C220,58 430,34 628,6 V72 H8 Z" : "M8,60 C110,56 220,38 306,12 V72 H8 Z";
      const dot = wide ? { x: 628, y: 6 } : { x: 306, y: 12 };
      return (
        <svg {...common}>
          <path d={area} fill={color} opacity="0.12" />
          {heights.map((h, i) => (
            <rect
              key={i} x={8 + i * 44} y={64 - h} width="26" height={h} rx="4"
              fill={color} opacity="0.32"
            />
          ))}
          <path d={curve} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <circle cx={dot.x} cy={dot.y} r="5.5" fill={color} />
        </svg>
      );
    }
    default: {
      // College costs stacking year over year, aid line to compare against.
      const totals = wide
        ? [20, 26, 32, 38, 44, 49, 54, 58, 61, 63]
        : [24, 34, 44, 53, 60];
      return (
        <svg {...common}>
          {totals.map((h, i) => {
            const x = 8 + i * 58;
            const mid = h * 0.55;
            return (
              <g key={i}>
                <rect x={x} y={66 - h} width="34" height={h} rx="4" fill={color} opacity="0.22" />
                <rect x={x} y={66 - h * 0.8} width="34" height={h * 0.25} fill={color} opacity="0.45" />
                <rect x={x} y={66 - mid} width="34" height={mid} rx="4" fill={color} opacity="0.85" />
              </g>
            );
          })}
          <path d={`M2,${wide ? 22 : 24} h${wide ? 632 : 312}`} stroke={ink} strokeOpacity="0.3" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
        </svg>
      );
    }
  }
}
