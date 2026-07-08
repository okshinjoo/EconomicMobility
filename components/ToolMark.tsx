// Per-tool marks for the calculator cards — tiny hand-coded doodles in the
// same flat family as ToolDoodle's category graphics and the TopicMark set.
// One distinctive shape per tool (a jar, a car, a scale, a flag...), drawn in
// the category accent on ink-neutral support shapes. No icon library.

const INK = "#11211c";

export default function ToolMark({
  slug,
  color,
  className,
}: {
  slug: string;
  color: string;
  className?: string;
}) {
  const p = {
    viewBox: "0 0 32 32",
    "aria-hidden": true as const,
    className: className ?? "h-8 w-8",
  };

  switch (slug) {
    case "budget": // allocation donut
      return (
        <svg {...p}>
          <circle cx="14" cy="16" r="9" fill="none" stroke={INK} strokeOpacity="0.13" strokeWidth="5.5" />
          <circle cx="14" cy="16" r="9" fill="none" stroke={color} strokeWidth="5.5" strokeDasharray="31 57" transform="rotate(-90 14 16)" />
          <rect x="26" y="9" width="4" height="14" rx="2" fill={color} opacity="0.4" />
        </svg>
      );
    case "paycheck": // banknote
      return (
        <svg {...p}>
          <rect x="3" y="9" width="26" height="14" rx="2.5" fill={color} opacity="0.3" />
          <circle cx="16" cy="16" r="4.2" fill={color} />
          <rect x="6.5" y="13.8" width="3.5" height="4.4" rx="1" fill={INK} opacity="0.3" />
          <rect x="22" y="13.8" width="3.5" height="4.4" rx="1" fill={INK} opacity="0.3" />
        </svg>
      );
    case "rent": // front door
      return (
        <svg {...p}>
          <rect x="4" y="26" width="24" height="2.5" rx="1.25" fill={INK} opacity="0.18" />
          <rect x="10.5" y="5" width="11" height="21.5" rx="2" fill={color} />
          <circle cx="18.6" cy="16.5" r="1.4" fill="#fbf8f1" />
        </svg>
      );
    case "emergency-fund": // nest egg
      return (
        <svg {...p}>
          <path d="M16 27c-5.4 0-9-3-9-7.6C7 13.6 11 5 16 5s9 8.6 9 14.4C25 24 21.4 27 16 27Z" fill={color} opacity="0.3" />
          <path d="M18.5 25c-3.4 0-5.7-1.9-5.7-4.8 0-3.6 2.5-9 5.7-9s5.7 5.4 5.7 9c0 2.9-2.3 4.8-5.7 4.8Z" fill={color} />
        </svg>
      );
    case "reality-check": // compass
      return (
        <svg {...p}>
          <circle cx="16" cy="16" r="11.5" fill="none" stroke={INK} strokeOpacity="0.16" strokeWidth="2.6" />
          <path d="M21.5 10.5 18 18l-7.5 3.5L14 14l7.5-3.5Z" fill={color} />
          <circle cx="16" cy="16" r="1.6" fill={INK} />
        </svg>
      );
    case "jars": // savings jar, half full
      return (
        <svg {...p}>
          <rect x="10.5" y="3.5" width="11" height="3.4" rx="1.5" fill={INK} opacity="0.35" />
          <rect x="8.5" y="8" width="15" height="20" rx="3.5" fill={INK} opacity="0.1" />
          <path d="M8.5 18h15v6.5a3.5 3.5 0 0 1-3.5 3.5h-8a3.5 3.5 0 0 1-3.5-3.5V18Z" fill={color} />
        </svg>
      );
    case "net-worth": // balance scale
      return (
        <svg {...p}>
          <rect x="14.9" y="6" width="2.2" height="18" rx="1.1" fill={INK} opacity="0.55" />
          <rect x="5" y="7.4" width="22" height="2.2" rx="1.1" fill={INK} opacity="0.55" />
          <path d="M3.5 15.5a4.5 4.5 0 0 0 9 0l-4.5-7-4.5 7Z" fill={color} />
          <path d="M19.5 15.5a4.5 4.5 0 0 0 9 0L24 8.5l-4.5 7Z" fill={color} opacity="0.45" />
          <rect x="10" y="25" width="12" height="2.4" rx="1.2" fill={INK} opacity="0.3" />
        </svg>
      );
    case "payoff": // shrinking balance steps
      return (
        <svg {...p}>
          <rect x="4" y="8" width="6.5" height="20" rx="1.8" fill={color} />
          <rect x="12.8" y="15" width="6.5" height="13" rx="1.8" fill={color} opacity="0.55" />
          <rect x="21.6" y="21" width="6.5" height="7" rx="1.8" fill={color} opacity="0.28" />
        </svg>
      );
    case "auto-loan": // car
      return (
        <svg {...p}>
          <path d="M4 20.5c0-1.6 1-3 2.6-3.3l2-4.7A4 4 0 0 1 12.3 10h7.4a4 4 0 0 1 3.7 2.5l2 4.7c1.5.3 2.6 1.7 2.6 3.3v2.7a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 23.2v-2.7Z" fill={color} />
          <circle cx="10.5" cy="25" r="2.8" fill={INK} />
          <circle cx="21.5" cy="25" r="2.8" fill={INK} />
        </svg>
      );
    case "mortgage": // house
      return (
        <svg {...p}>
          <path d="M16 4 3.5 14h25L16 4Z" fill={color} />
          <rect x="7" y="15.5" width="18" height="12.5" rx="1.5" fill={color} opacity="0.35" />
          <rect x="13.4" y="20" width="5.2" height="8" rx="1" fill={INK} opacity="0.45" />
        </svg>
      );
    case "credit-card": // card
      return (
        <svg {...p}>
          <rect x="3" y="8" width="26" height="17" rx="3" fill={color} opacity="0.32" />
          <rect x="3" y="12" width="26" height="3.6" fill={INK} opacity="0.55" />
          <rect x="6.5" y="19" width="7" height="2.6" rx="1.3" fill={color} />
        </svg>
      );
    case "dti": // ratio gauge
      return (
        <svg {...p}>
          <path d="M5 24a11 11 0 0 1 22 0" fill="none" stroke={INK} strokeOpacity="0.14" strokeWidth="5" />
          <path d="M5 24a11 11 0 0 1 8.2-10.6" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
          <path d="m16 24 6-8" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="16" cy="24" r="2" fill={INK} />
        </svg>
      );
    case "goal": // flag planted at the goal
      return (
        <svg {...p}>
          <rect x="9" y="4" width="2.2" height="24" rx="1.1" fill={INK} opacity="0.55" />
          <path d="M11.2 5.5h13l-3.6 4.5 3.6 4.5h-13v-9Z" fill={color} />
          <rect x="5" y="27" width="12" height="2.4" rx="1.2" fill={INK} opacity="0.25" />
        </svg>
      );
    case "compound": // the snowball, growing
      return (
        <svg {...p}>
          <rect x="3" y="26" width="26" height="2.2" rx="1.1" fill={INK} opacity="0.16" />
          <circle cx="7" cy="23" r="2.6" fill={color} opacity="0.4" />
          <circle cx="15" cy="20" r="4.4" fill={color} opacity="0.7" />
          <circle cx="25" cy="15" r="6.8" fill={color} />
        </svg>
      );
    case "retirement": // sunrise
      return (
        <svg {...p}>
          <path d="M6.5 21a9.5 9.5 0 0 1 19 0" fill={color} />
          <rect x="3" y="21.5" width="26" height="2.4" rx="1.2" fill={INK} opacity="0.4" />
          <rect x="14.9" y="3" width="2.2" height="4.5" rx="1.1" fill={color} opacity="0.6" />
          <rect x="5.2" y="7.4" width="2.2" height="4.5" rx="1.1" fill={color} opacity="0.6" transform="rotate(-45 6.3 9.6)" />
          <rect x="24.6" y="7.4" width="2.2" height="4.5" rx="1.1" fill={color} opacity="0.6" transform="rotate(45 25.7 9.6)" />
        </svg>
      );
    case "roth-ira": // sprouting pot
      return (
        <svg {...p}>
          <path d="M9 20h14l-1.6 6.5a2.5 2.5 0 0 1-2.4 1.9h-6a2.5 2.5 0 0 1-2.4-1.9L9 20Z" fill={INK} opacity="0.3" />
          <rect x="14.9" y="11" width="2.2" height="9" rx="1.1" fill={color} />
          <path d="M16 12c0-4 2.8-6.8 7-7 0 4.2-2.8 7-7 7Z" fill={color} />
          <path d="M16 12c0-4-2.8-6.8-7-7 0 4.2 2.8 7 7 7Z" fill={color} opacity="0.5" />
        </svg>
      );
    case "investment": // stair-step growth with marker
      return (
        <svg {...p}>
          <rect x="4" y="21" width="6.5" height="7" rx="1.8" fill={color} opacity="0.32" />
          <rect x="12.8" y="15" width="6.5" height="13" rx="1.8" fill={color} opacity="0.6" />
          <rect x="21.6" y="8" width="6.5" height="20" rx="1.8" fill={color} />
          <circle cx="24.85" cy="5" r="2.2" fill={INK} />
        </svg>
      );
    case "cost": // campus building
      return (
        <svg {...p}>
          <path d="M16 3.5 4.5 9.5h23L16 3.5Z" fill={color} />
          <rect x="6.5" y="11" width="3.4" height="13" rx="1.2" fill={color} opacity="0.55" />
          <rect x="14.3" y="11" width="3.4" height="13" rx="1.2" fill={color} opacity="0.55" />
          <rect x="22.1" y="11" width="3.4" height="13" rx="1.2" fill={color} opacity="0.55" />
          <rect x="4" y="25.5" width="24" height="2.6" rx="1.3" fill={INK} opacity="0.35" />
        </svg>
      );
    case "student-loan": // mortarboard + coin
      return (
        <svg {...p}>
          <path d="M16 5 2.5 11 16 17l13.5-6L16 5Z" fill={color} />
          <path d="M9 14.5v5c0 1.8 3.1 3.5 7 3.5s7-1.7 7-3.5v-5l-7 3.1-7-3.1Z" fill={color} opacity="0.5" />
          <circle cx="26" cy="24.5" r="3.6" fill={INK} opacity="0.5" />
        </svg>
      );
    case "compare-offers": // two offers, one ahead
      return (
        <svg {...p}>
          <rect x="5" y="12" width="9" height="16" rx="2" fill={INK} opacity="0.16" />
          <rect x="18" y="7" width="9" height="21" rx="2" fill={color} />
          <path d="m20.5 13 1.8 1.8 3.2-3.6" fill="none" stroke="#fbf8f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default: // quiet fallback chip
      return (
        <svg {...p}>
          <rect x="8" y="8" width="16" height="16" rx="4" fill={color} opacity="0.45" />
        </svg>
      );
  }
}
