import type { TopicId } from "@/lib/topics";

interface Props {
  id: TopicId;
  color: string;
  className?: string;
}

const AMBER = "#e7a33c";
const CREAM = "#fbf8f1";

export function TopicIcon({ id, color, className = "h-6 w-6" }: Props) {
  const base = {
    viewBox: "0 0 48 48" as const,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none" as const,
    "aria-hidden": true as const,
    className,
  };

  switch (id) {
    /* ─── Credit Scores ─── */
    case "credit":
      return (
        <svg {...base}>
          {/* Card body */}
          <rect x="3" y="11" width="42" height="27" rx="5" fill={color} />
          {/* Magnetic stripe */}
          <rect x="3" y="18" width="42" height="8" fill="rgba(0,0,0,0.18)" />
          {/* EMV chip */}
          <rect x="8" y="13" width="10" height="7" rx="2" fill={AMBER} />
          <line x1="11" y1="13" x2="11" y2="20" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
          <line x1="14" y1="13" x2="14" y2="20" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
          <line x1="8" y1="16.5" x2="18" y2="16.5" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
          {/* Score arc track */}
          <path
            d="M25,34 A10.5,10.5 0 0,1 47,34"
            stroke={CREAM}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.25"
          />
          {/* Score arc filled ~75% */}
          <path
            d="M25,34 A10.5,10.5 0 0,1 40.5,26"
            stroke={AMBER}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="40.5" cy="26" r="2.5" fill={AMBER} />
        </svg>
      );

    /* ─── Budgeting ─── */
    case "budgeting": {
      const r = 15;
      const c = 2 * Math.PI * r; // 94.25
      return (
        <svg {...base}>
          {/* Track */}
          <circle
            cx="24" cy="24" r={r}
            fill="none"
            stroke="#e4d8c1"
            strokeWidth="8"
          />
          {/* Housing 35% */}
          <circle
            cx="24" cy="24" r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${c * 0.35} ${c * 0.65}`}
            transform="rotate(-90 24 24)"
          />
          {/* Food 25% */}
          <circle
            cx="24" cy="24" r={r}
            fill="none"
            stroke={AMBER}
            strokeWidth="8"
            strokeDasharray={`${c * 0.25} ${c * 0.75}`}
            strokeDashoffset={-(c * 0.35)}
            transform="rotate(-90 24 24)"
          />
          {/* Savings 18% */}
          <circle
            cx="24" cy="24" r={r}
            fill="none"
            stroke="#d26a4c"
            strokeWidth="8"
            strokeDasharray={`${c * 0.18} ${c * 0.82}`}
            strokeDashoffset={-(c * 0.60)}
            transform="rotate(-90 24 24)"
          />
          {/* Centre */}
          <circle cx="24" cy="24" r="8.5" fill="#f7f2e8" />
          {/* Dollar sign (SVG path, no font dependency) */}
          <line x1="24" y1="18.5" x2="24" y2="29.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M20.5,21 Q24,18.5 27.5,21 Q27.5,24 24,24 Q27.5,24 27.5,27 Q24,29.5 20.5,27"
            stroke={color}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    /* ─── Taxes ─── */
    case "taxes":
      return (
        <svg {...base}>
          {/* Paper */}
          <rect x="9" y="3" width="26" height="38" rx="3" fill={color} />
          {/* Dog-ear fold */}
          <path d="M26,3 L35,12 L26,12Z" fill="rgba(0,0,0,0.22)" />
          <line x1="26" y1="3" x2="26" y2="12" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          {/* Ruling lines */}
          <line x1="13" y1="18" x2="30" y2="18" stroke={AMBER} strokeWidth="2" strokeLinecap="round" />
          <line x1="13" y1="24" x2="28" y2="24" stroke={CREAM} strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
          <line x1="13" y1="30" x2="25" y2="30" stroke={CREAM} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
          {/* Checkmark badge */}
          <circle cx="38" cy="38" r="8" fill={AMBER} />
          <path
            d="M33.5,38 L36.5,41.5 L42.5,34.5"
            stroke={color}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    /* ─── College ─── */
    case "college":
      return (
        <svg {...base}>
          {/* Mortarboard top */}
          <polygon points="24,7 3,18 45,18" fill={color} />
          {/* Cap dome */}
          <path d="M11,18 Q11,34 24,37 Q37,34 37,18Z" fill={color} opacity="0.8" />
          {/* Tassel */}
          <line x1="40" y1="18" x2="40" y2="32" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="40" cy="35.5" r="4" fill={AMBER} />
          {/* Diploma scroll */}
          <rect x="10" y="38" width="28" height="9" rx="3.5" fill={AMBER} />
          <line x1="16" y1="41" x2="32" y2="41" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="44" x2="27" y2="44" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.45" />
        </svg>
      );

    /* ─── Investing ─── */
    case "investing":
      return (
        <svg {...base}>
          {/* Grid */}
          {([38, 30, 22, 14] as number[]).map((y) => (
            <line key={y} x1="8" y1={y} x2="44" y2={y} stroke="#e4d8c1" strokeWidth="0.75" />
          ))}
          <line x1="8" y1="8" x2="8" y2="40" stroke="#e4d8c1" strokeWidth="0.75" />
          <line x1="8" y1="40" x2="44" y2="40" stroke="#e4d8c1" strokeWidth="1" />
          {/* Area fill */}
          <path
            d="M8,36 L17,29 L25,22 L33,16 L44,9 L44,40 L8,40Z"
            fill={color}
            opacity="0.12"
          />
          {/* Line */}
          <path
            d="M8,36 L17,29 L25,22 L33,16 L44,9"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Glow + peak dot */}
          <circle cx="44" cy="9" r="6" fill={color} opacity="0.18" />
          <circle cx="44" cy="9" r="4" fill={color} />
          <circle cx="44" cy="9" r="2.2" fill={AMBER} />
        </svg>
      );

    /* ─── Home Ownership ─── */
    case "home-ownership":
      return (
        <svg {...base}>
          {/* Roof */}
          <polygon points="24,4 3,19 45,19" fill={color} />
          {/* Chimney */}
          <rect x="34" y="9" width="5" height="11" fill={color} opacity="0.8" />
          {/* Walls */}
          <rect x="6" y="19" width="36" height="25" fill={color} opacity="0.85" />
          {/* Door */}
          <rect x="18" y="27" width="12" height="17" rx="2" fill={AMBER} />
          <circle cx="27.5" cy="36" r="1.5" fill={color} />
          {/* Left window */}
          <rect x="8" y="23" width="9" height="8" rx="1.5" fill={CREAM} opacity="0.7" />
          <line x1="12.5" y1="23" x2="12.5" y2="31" stroke={color} strokeWidth="0.75" />
          <line x1="8" y1="27" x2="17" y2="27" stroke={color} strokeWidth="0.75" />
          {/* Right window */}
          <rect x="31" y="23" width="9" height="8" rx="1.5" fill={CREAM} opacity="0.7" />
          <line x1="35.5" y1="23" x2="35.5" y2="31" stroke={color} strokeWidth="0.75" />
          <line x1="31" y1="27" x2="40" y2="27" stroke={color} strokeWidth="0.75" />
        </svg>
      );

    /* ─── Government Aid ─── */
    case "government-aid":
      return (
        <svg {...base}>
          {/* Coin */}
          <circle cx="24" cy="11" r="8.5" fill={AMBER} />
          <circle cx="24" cy="11" r="5.5" fill="none" stroke={color} strokeWidth="1.2" />
          {/* Dollar on coin */}
          <line x1="24" y1="6" x2="24" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M21,7.8 Q24,6.5 27,7.8 Q27,11 24,11 Q27,11 27,14.2 Q24,15.5 21,14.2"
            stroke={color}
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Cupped / receiving hands */}
          <path
            d="M7,31 Q5,25 9,22 Q13,19 17,22 L22,26 Q23,22 24,22 Q25,22 26,26 L31,22 Q35,19 39,22 Q43,25 41,31 Q40,37 34,36 L26,33 Q25,36 24,36 Q23,36 22,33 L14,36 Q8,37 7,31Z"
            fill={color}
          />
        </svg>
      );

    /* ─── Money Safety ─── */
    case "money-safety":
      return (
        <svg {...base}>
          {/* Shield outer */}
          <path
            d="M24,3 L43,10 L43,27 Q43,40 24,46 Q5,40 5,27 L5,10Z"
            fill={color}
          />
          {/* Shield inner tint */}
          <path
            d="M24,8 L38,14 L38,27 Q38,36.5 24,41.5 Q10,36.5 10,27 L10,14Z"
            fill={color}
            opacity="0.38"
          />
          {/* Checkmark */}
          <path
            d="M14.5,25 L21,32 L33.5,17"
            stroke={AMBER}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    /* ─── Insurance ─── */
    case "insurance":
      return (
        <svg {...base}>
          {/* Canopy */}
          <path d="M4,24 Q4,7 24,5 Q44,7 44,24Z" fill={color} />
          {/* Canopy ribs */}
          <line x1="24" y1="5" x2="24" y2="24" stroke={CREAM} strokeWidth="1" opacity="0.18" />
          <line x1="4" y1="24" x2="24" y2="5" stroke={CREAM} strokeWidth="1" opacity="0.14" />
          <line x1="44" y1="24" x2="24" y2="5" stroke={CREAM} strokeWidth="1" opacity="0.14" />
          <line x1="14" y1="14.5" x2="24" y2="24" stroke={CREAM} strokeWidth="1" opacity="0.1" />
          <line x1="34" y1="14.5" x2="24" y2="24" stroke={CREAM} strokeWidth="1" opacity="0.1" />
          {/* Spine */}
          <line x1="24" y1="24" x2="24" y2="40" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M24,40 Q24,45.5 29.5,45.5 Q35,45.5 35,40"
            stroke={color}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Amber rain drops */}
          <line x1="10" y1="29" x2="8.5" y2="37" stroke={AMBER} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <line x1="16" y1="31" x2="14.5" y2="39" stroke={AMBER} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <line x1="36" y1="29" x2="34.5" y2="37" stroke={AMBER} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <line x1="42" y1="31" x2="40.5" y2="39" stroke={AMBER} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      );
  }
}
