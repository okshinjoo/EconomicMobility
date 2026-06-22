export default function GraduateIllustration() {
  return (
    <svg
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-full w-full"
      style={{ background: "#ede7d6" }}
    >
      {/* ── Background shapes ── */}
      <circle cx="320" cy="100" r="130" fill="#0c4a39" opacity="0.07" />
      <circle cx="80" cy="420" r="100" fill="#e7a33c" opacity="0.09" />
      <circle cx="200" cy="460" r="60" fill="#d26a4c" opacity="0.06" />

      {/* ── Sunburst behind figure ── */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 200 + Math.cos(angle) * 70;
        const y1 = 230 + Math.sin(angle) * 70;
        const x2 = 200 + Math.cos(angle) * 115;
        const y2 = 230 + Math.sin(angle) * 115;
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#e7a33c"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.35"
          />
        );
      })}
      <circle cx="200" cy="230" r="68" fill="#e7a33c" opacity="0.1" />

      {/* ── Figure arms raised ── */}
      {/* Left arm */}
      <path
        d="M168,260 Q145,235 130,210"
        stroke="#d26a4c"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      {/* Right arm */}
      <path
        d="M232,260 Q255,235 270,210"
        stroke="#d26a4c"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      {/* Body */}
      <rect x="168" y="258" width="64" height="70" rx="14" fill="#d26a4c" opacity="0.9" />
      {/* Legs */}
      <rect x="172" y="326" width="24" height="60" rx="10" fill="#11211c" />
      <rect x="204" y="326" width="24" height="60" rx="10" fill="#11221d" />

      {/* ── Head ── */}
      <circle cx="200" cy="235" r="36" fill="#d26a4c" />
      {/* Simple face highlight */}
      <circle cx="188" cy="228" r="4" fill="rgba(255,255,255,0.25)" />
      <circle cx="212" cy="228" r="4" fill="rgba(255,255,255,0.25)" />

      {/* ── Graduation cap ── */}
      <polygon points="200,193 168,208 232,208" fill="#0c4a39" />
      {/* Cap top square board */}
      <rect x="178" y="185" width="44" height="10" rx="2" fill="#0c4a39" />
      {/* Tassel */}
      <line x1="228" y1="208" x2="228" y2="226" stroke="#e7a33c" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="228" cy="229" r="4" fill="#e7a33c" />

      {/* ── Diploma scroll ── */}
      <g transform="translate(118,410)">
        <rect x="0" y="0" width="164" height="62" rx="10" fill="#fbf8f1" stroke="#e4d8c1" strokeWidth="1.5" />
        <line x1="16" y1="18" x2="148" y2="18" stroke="#0c4a39" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="16" y1="28" x2="132" y2="28" stroke="#44514a" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        <line x1="16" y1="38" x2="110" y2="38" stroke="#44514a" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
        {/* Seal */}
        <circle cx="148" cy="50" r="11" fill="#d26a4c" />
        <path d="M142.5,50 L146,54 L153.5,45" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* ── Confetti / stars ── */}
      <circle cx="115" cy="180" r="7" fill="#e7a33c" opacity="0.8" />
      <circle cx="90" cy="250" r="5" fill="#d26a4c" opacity="0.65" />
      <circle cx="310" cy="175" r="6" fill="#e7a33c" opacity="0.75" />
      <circle cx="330" cy="260" r="4" fill="#1f9069" opacity="0.5" />
      <circle cx="135" cy="340" r="4" fill="#1f9069" opacity="0.4" />
      <circle cx="285" cy="350" r="5" fill="#d26a4c" opacity="0.45" />
      {/* Star shapes (4-point cross) */}
      <path d="M345,195 L350,200 L345,205 L340,200Z" fill="#e7a33c" opacity="0.6" />
      <path d="M68,310 L73,315 L68,320 L63,315Z" fill="#e7a33c" opacity="0.55" />
    </svg>
  );
}
