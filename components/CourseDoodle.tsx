// Hand-drawn outline doodles of each course's literal subject (owner call
// July 2026 — her spin on the Base44 courses page, which used full
// illustration headers: same imagery, but as semi-transparent line art
// woven into OUR poster bands). One simple stroke drawing per course id,
// same family as ToolDoodle/ToolMark. Drawn in currentColor so the band
// decides the ink.

export default function CourseDoodle({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "first-paycheck":
      // Envelope with a bill poking out
      return (
        <svg {...common} className={className}>
          <rect x="18" y="8" width="28" height="14" rx="2" />
          <circle cx="32" cy="15" r="4" />
          <path d="M8 28 h48 v26 H8 Z" />
          <path d="M8 28 L32 43 L56 28" />
        </svg>
      );
    case "credit-from-zero":
      // Credit card
      return (
        <svg {...common} className={className}>
          <rect x="6" y="16" width="52" height="34" rx="5" />
          <path d="M6 26 h52" />
          <rect x="13" y="33" width="10" height="8" rx="2" />
          <path d="M40 42 h11" />
        </svg>
      );
    case "paying-for-college":
      // Mortarboard with tassel
      return (
        <svg {...common} className={className}>
          <path d="M32 10 L58 21 L32 32 L6 21 Z" />
          <path d="M20 27 v10 c0 5 24 5 24 0 v-10" />
          <path d="M58 21 v14" />
          <circle cx="58" cy="38" r="2.5" />
        </svg>
      );
    case "first-apartment":
      // Door key
      return (
        <svg {...common} className={className}>
          <circle cx="17" cy="32" r="10" />
          <circle cx="17" cy="32" r="3.5" />
          <path d="M27 32 h30" />
          <path d="M46 32 v9" />
          <path d="M55 32 v7" />
        </svg>
      );
    case "start-investing":
      // Sprout growing from a coin stack
      return (
        <svg {...common} className={className}>
          <ellipse cx="30" cy="52" rx="18" ry="5" />
          <path d="M12 44 c0 3 8 5 18 5 s18 -2 18 -5" />
          <path d="M30 42 V24" />
          <path d="M30 30 c-2 -8 -10 -10 -15 -9 c1 6 8 10 15 9 Z" />
          <path d="M30 26 c2 -7 9 -9 13 -8 c-1 5 -7 9 -13 8 Z" />
        </svg>
      );
    case "scam-proof":
      // Shield with a check
      return (
        <svg {...common} className={className}>
          <path d="M32 6 L54 14 v16 c0 14 -9 23 -22 28 C19 53 10 44 10 30 V14 Z" />
          <path d="M22 32 l7 7 l13 -14" />
        </svg>
      );
    case "invest-smarter":
      // Piggy bank catching a coin
      return (
        <svg {...common} className={className}>
          <circle cx="46" cy="10" r="5" />
          <ellipse cx="30" cy="38" rx="22" ry="15" />
          <path d="M24 24 h12" />
          <path d="M14 51 v6" />
          <path d="M45 51 v6" />
          <path d="M52 34 c4 0 5 4 2 6" />
          <circle cx="21" cy="35" r="1.5" fill="currentColor" />
        </svg>
      );
    case "debt-comeback":
      // Chain snapping apart
      return (
        <svg {...common} className={className}>
          <rect x="4" y="26" width="20" height="12" rx="6" />
          <rect x="40" y="26" width="20" height="12" rx="6" />
          <path d="M30 18 l2 -6" />
          <path d="M34 18 l4 -4" />
          <path d="M30 46 l2 6" />
          <path d="M34 46 l4 4" />
        </svg>
      );
    case "retirement-started":
      // Beach umbrella and sun
      return (
        <svg {...common} className={className}>
          <circle cx="52" cy="12" r="6" />
          <path d="M8 30 c2 -12 14 -20 26 -18 c-4 2 -6 6 -6 6 s6 -1 10 2 c-10 2 -30 10 -30 10 Z" />
          <path d="M22 20 L34 56" />
          <path d="M6 56 h52" />
        </svg>
      );
    case "taxes-handled":
      // Receipt with a percent
      return (
        <svg {...common} className={className}>
          <path d="M16 6 h32 v52 l-6 -4 -6 4 -6 -4 -6 4 -6 -4 -2 2 Z" />
          <circle cx="26" cy="24" r="4" />
          <circle cx="38" cy="38" r="4" />
          <path d="M39 21 L25 41" />
        </svg>
      );
    default:
      return null;
  }
}
