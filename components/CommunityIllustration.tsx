export default function CommunityIllustration() {
  return (
    <svg
      viewBox="0 0 1600 460"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="h-[420px] w-full sm:h-[460px]"
    >
      {/* ── Deep forest base ── */}
      <rect width="1600" height="460" fill="#0c4a39" />

      {/* ── Background depth circles ── */}
      <circle cx="1300" cy="100" r="280" fill="#15624b" opacity="0.5" />
      <circle cx="1450" cy="380" r="200" fill="#1f9069" opacity="0.2" />
      <circle cx="900" cy="500" r="260" fill="#e7a33c" opacity="0.06" />
      <circle cx="250" cy="-50" r="200" fill="#15624b" opacity="0.3" />

      {/* ── Connection lines between figures ── */}
      <line x1="780" y1="230" x2="1000" y2="230" stroke="#e7a33c" strokeWidth="1.5" opacity="0.25" />
      <line x1="1000" y1="230" x2="1220" y2="230" stroke="#e7a33c" strokeWidth="1.5" opacity="0.25" />
      <line x1="890" y1="170" x2="1000" y2="230" stroke="#e7a33c" strokeWidth="1.2" opacity="0.2" />
      <line x1="1110" y1="170" x2="1000" y2="230" stroke="#e7a33c" strokeWidth="1.2" opacity="0.2" />
      {/* Dots on lines */}
      <circle cx="890" cy="230" r="5" fill="#e7a33c" opacity="0.4" />
      <circle cx="1000" cy="230" r="7" fill="#e7a33c" opacity="0.5" />
      <circle cx="1110" cy="230" r="5" fill="#e7a33c" opacity="0.4" />

      {/* ── Three people figures (right half) ── */}
      {/* Left figure */}
      <g transform="translate(760,130)">
        <circle cx="30" cy="0" r="32" fill="#d26a4c" />
        <rect x="10" y="32" width="40" height="52" rx="10" fill="#d26a4c" opacity="0.85" />
        <rect x="6" y="84" width="18" height="48" rx="8" fill="#11221d" />
        <rect x="36" y="84" width="18" height="48" rx="8" fill="#11221d" />
      </g>
      {/* Centre figure */}
      <g transform="translate(960,95)">
        <circle cx="40" cy="0" r="38" fill="#e7a33c" />
        <rect x="14" y="38" width="52" height="62" rx="12" fill="#e7a33c" opacity="0.85" />
        <rect x="10" y="100" width="22" height="56" rx="9" fill="#0c4a39" />
        <rect x="48" y="100" width="22" height="56" rx="9" fill="#0c4a39" />
      </g>
      {/* Right figure */}
      <g transform="translate(1176,138)">
        <circle cx="32" cy="0" r="30" fill="#1f9069" />
        <rect x="12" y="30" width="40" height="50" rx="10" fill="#1f9069" opacity="0.85" />
        <rect x="8" y="80" width="17" height="46" rx="8" fill="#0a3e2e" />
        <rect x="35" y="80" width="17" height="46" rx="8" fill="#0a3e2e" />
      </g>

      {/* ── Floating cards / stat bubbles (right region) ── */}
      {/* Knowledge bubble */}
      <g transform="translate(1330,90)">
        <rect x="0" y="0" width="140" height="58" rx="12" fill="#fbf8f1" opacity="0.12" />
        <rect x="0" y="0" width="140" height="58" rx="12" fill="none" stroke="#e7a33c" strokeWidth="1" opacity="0.35" />
        <circle cx="24" cy="29" r="12" fill="#e7a33c" opacity="0.25" />
        <line x1="16" y1="29" x2="32" y2="29" stroke="#e7a33c" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="21" x2="24" y2="37" stroke="#e7a33c" strokeWidth="2" strokeLinecap="round" />
        <line x1="44" y1="20" x2="120" y2="20" stroke="#fbf8f1" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
        <line x1="44" y1="30" x2="108" y2="30" stroke="#fbf8f1" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
        <line x1="44" y1="40" x2="94" y2="40" stroke="#fbf8f1" strokeWidth="1.5" opacity="0.15" strokeLinecap="round" />
      </g>
      {/* Support bubble */}
      <g transform="translate(1340,200)">
        <rect x="0" y="0" width="130" height="50" rx="12" fill="#fbf8f1" opacity="0.1" />
        <rect x="0" y="0" width="130" height="50" rx="12" fill="none" stroke="#1f9069" strokeWidth="1" opacity="0.3" />
        <circle cx="22" cy="25" r="10" fill="#1f9069" opacity="0.3" />
        <path d="M16,25 A6,6 0 0,1 28,25" stroke="#1f9069" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="38" y1="18" x2="108" y2="18" stroke="#fbf8f1" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
        <line x1="38" y1="28" x2="96" y2="28" stroke="#fbf8f1" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
        <line x1="38" y1="38" x2="80" y2="38" stroke="#fbf8f1" strokeWidth="1.5" opacity="0.12" strokeLinecap="round" />
      </g>

      {/* ── Decorative organic shapes (far right) ── */}
      <circle cx="1560" cy="200" r="90" fill="#e7a33c" opacity="0.06" />
      <circle cx="1560" cy="350" r="55" fill="#d26a4c" opacity="0.08" />

      {/* ── Sparkle dots ── */}
      <circle cx="720" cy="80" r="5" fill="#e7a33c" opacity="0.45" />
      <circle cx="1260" cy="70" r="4" fill="#e7a33c" opacity="0.4" />
      <circle cx="1490" cy="130" r="6" fill="#e7a33c" opacity="0.35" />
      <circle cx="1420" cy="310" r="5" fill="#fbf8f1" opacity="0.2" />
      <circle cx="700" cy="340" r="4" fill="#1f9069" opacity="0.3" />

      {/* ── Left fade so text sits on dark bg ── */}
      <defs>
        <linearGradient id="communityFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#0c4a39" stopOpacity="1" />
          <stop offset="40%"  stopColor="#0c4a39" stopOpacity="0.9" />
          <stop offset="70%"  stopColor="#0c4a39" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0c4a39" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1600" height="460" fill="url(#communityFade)" />
    </svg>
  );
}
