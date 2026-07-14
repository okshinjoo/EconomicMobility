// Hand-drawn outline doodles of each challenge's literal subject (owner ask
// July 2026: the challenge tiles were the last plain-text cards). Same
// stroke family as CourseDoodle/ToolDoodle; drawn in currentColor so the
// card decides the ink.

export default function ChallengeDoodle({
  id,
  className = "",
  style,
}: {
  id: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const common = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    style,
  };

  switch (id) {
    case "money-reset-week":
      // Week calendar page with a check on the last day
      return (
        <svg {...common} className={className}>
          <rect x="8" y="14" width="48" height="40" rx="4" />
          <path d="M8 26 h48" />
          <path d="M20 8 v10 M44 8 v10" />
          <path d="M16 34 h6 M29 34 h6 M42 34 h6 M16 44 h6 M29 44 h6" />
          <path d="M41 44 l4 4 l7 -8" />
        </svg>
      );
    case "no-spend-weekend":
      // Padlocked wallet
      return (
        <svg {...common} className={className}>
          <path d="M8 22 h40 a6 6 0 0 1 6 6 v20 a6 6 0 0 1 -6 6 H14 a6 6 0 0 1 -6 -6 Z" />
          <path d="M8 22 v-4 a5 5 0 0 1 5 -5 h30" />
          <path d="M38 38 h16 v10 h-16 Z" />
          <path d="M41 38 v-4 a5 5 0 0 1 10 0 v4" />
        </svg>
      );
    case "credit-checkup":
      // Credit card under a stethoscope
      return (
        <svg {...common} className={className}>
          <rect x="6" y="10" width="52" height="30" rx="5" />
          <path d="M6 19 h52" />
          <path d="M14 32 h9" />
          <path d="M20 44 v4 a10 10 0 0 0 20 0 v-4" />
          <circle cx="48" cy="50" r="5" />
          <path d="M40 48 a8 8 0 0 0 3 2" />
        </svg>
      );
    case "starter-fund-sprint":
      // Savings jar with a coin dropping in
      return (
        <svg {...common} className={className}>
          <path d="M18 24 h28 v26 a6 6 0 0 1 -6 6 H24 a6 6 0 0 1 -6 -6 Z" />
          <path d="M15 24 h34" />
          <circle cx="32" cy="10" r="5" />
          <path d="M32 18 v3" />
          <path d="M24 42 a8 8 0 0 0 16 0" />
        </svg>
      );
    case "subscription-audit":
      // Scissors cutting a dotted billing line
      return (
        <svg {...common} className={className}>
          <circle cx="14" cy="18" r="6" />
          <circle cx="14" cy="42" r="6" />
          <path d="M19 22 L46 38 M19 38 L46 22" />
          <path d="M50 30 h2 M56 30 h2" strokeDasharray="0.1 6" />
          <path d="M46 22 l10 -6 M46 38 l10 6" />
        </svg>
      );
    default:
      return null;
  }
}
