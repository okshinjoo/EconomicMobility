export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-full w-full"
      style={{ background: "#ede7d6" }}
    >
      {/* ── Soft background shapes ── */}
      <circle cx="380" cy="100" r="155" fill="#0c4a39" opacity="0.07" />
      <circle cx="100" cy="395" r="110" fill="#e7a33c" opacity="0.09" />
      <circle cx="360" cy="400" r="55" fill="#d26a4c" opacity="0.07" />

      {/* ── Bar chart (4 rising bars) ── */}
      <rect x="82"  y="370" width="62" height="70"  rx="10" fill="#1f9069" />
      <rect x="162" y="310" width="62" height="130" rx="10" fill="#0c4a39" />
      <rect x="242" y="240" width="62" height="200" rx="10" fill="#1f9069" />
      <rect x="322" y="158" width="62" height="282" rx="10" fill="#0c4a39" />

      {/* X-axis */}
      <line x1="62" y1="440" x2="420" y2="440" stroke="#c2b49a" strokeWidth="2" />

      {/* ── Person figure (on tallest bar) ── */}
      {/* Hair */}
      <path
        d="M327,126 Q325,108 335,103 Q353,95 368,103 Q378,108 374,124 Q368,110 353,108 Q336,110 327,126Z"
        fill="#11211c"
      />
      {/* Head */}
      <circle cx="352" cy="131" r="24" fill="#d26a4c" />
      {/* Body */}
      <rect x="334" y="155" width="36" height="42" rx="9" fill="#d26a4c" opacity="0.9" />
      {/* Left arm reaching up-left */}
      <path
        d="M334,163 Q316,148 310,130"
        stroke="#d26a4c"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right arm reaching up-right toward coin */}
      <path
        d="M370,163 Q390,148 396,130"
        stroke="#d26a4c"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── Golden coin ── */}
      <circle cx="398" cy="113" r="28" fill="#e7a33c" opacity="0.25" />
      <circle cx="398" cy="113" r="22" fill="#e7a33c" />
      <circle cx="398" cy="113" r="16" fill="none" stroke="#c9842a" strokeWidth="1.5" />
      {/* $ path */}
      <line x1="398" y1="105" x2="398" y2="121" stroke="#0c4a39" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M393,107.5 Q398,105.5 403,107.5 Q403,113 398,113 Q403,113 403,118.5 Q398,120.5 393,118.5"
        stroke="#0c4a39"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Outer glow ring */}
      <circle cx="398" cy="113" r="34" fill="none" stroke="#e7a33c" strokeWidth="1.5" opacity="0.3" />

      {/* ── Floating house (upper left) ── */}
      <g transform="translate(50,90)">
        <polygon points="38,4 4,24 72,24" fill="#0c4a39" />
        <rect x="8" y="24" width="60" height="44" fill="#15624b" />
        {/* Door */}
        <rect x="24" y="35" width="18" height="33" rx="2" fill="#e7a33c" />
        {/* Window */}
        <rect x="42" y="30" width="16" height="13" rx="1.5" fill="#fbf8f1" opacity="0.6" />
        <line x1="50" y1="30" x2="50" y2="43" stroke="#15624b" strokeWidth="0.75" />
        <line x1="42" y1="36.5" x2="58" y2="36.5" stroke="#15624b" strokeWidth="0.75" />
      </g>

      {/* ── Diploma scroll (lower left) ── */}
      <g transform="translate(46,234)">
        <rect x="0" y="0" width="68" height="48" rx="8" fill="#fbf8f1" stroke="#e4d8c1" strokeWidth="1.5" />
        {/* Heading line */}
        <line x1="10" y1="14" x2="58" y2="14" stroke="#0c4a39" strokeWidth="2.2" strokeLinecap="round" />
        {/* Body lines */}
        <line x1="10" y1="22" x2="52" y2="22" stroke="#44514a" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        <line x1="10" y1="30" x2="44" y2="30" stroke="#44514a" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        {/* Wax seal */}
        <circle cx="57" cy="39" r="10" fill="#d26a4c" />
        <path
          d="M52.5,39 L55.5,42.5 L61.5,35"
          stroke="white"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* ── Sparkle dots ── */}
      <circle cx="196" cy="163" r="5.5" fill="#e7a33c" opacity="0.85" />
      <circle cx="218" cy="135" r="3.5" fill="#d26a4c" opacity="0.65" />
      <circle cx="185" cy="198" r="3" fill="#0c4a39" opacity="0.4" />
      <circle cx="460" cy="310" r="9" fill="#e4d8c1" opacity="0.55" />
      <circle cx="445" cy="370" r="5.5" fill="#1f9069" opacity="0.3" />
    </svg>
  );
}
