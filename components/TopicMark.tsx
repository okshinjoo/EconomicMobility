import { getTopic, type TopicId } from "@/lib/topics";

/**
 * Hand-drawn geometric mark for each topic — same design family as the tools
 * band's data doodles. Bold strokes so they stay legible at small sizes
 * (which is where the old illustration PNGs failed). Renders in the topic's
 * accent color unless overridden.
 */
export default function TopicMark({
  id,
  color,
  className = "h-9 w-9",
}: {
  id: TopicId;
  color?: string;
  className?: string;
}) {
  const c = color ?? getTopic(id).color;
  const stroke = {
    stroke: c,
    strokeWidth: 3.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };

  switch (id) {
    case "credit":
      // A score gauge with its needle up in the good zone.
      return (
        <svg viewBox="0 0 48 48" aria-hidden className={className}>
          <path d="M9.5 33 A17 17 0 1 1 38.5 33" {...stroke} />
          <path d="M24 31 L33 18" {...stroke} strokeWidth={4} />
          <circle cx="24" cy="31" r="3.5" fill={c} />
        </svg>
      );
    case "budgeting":
      // A pie with one slice accounted for.
      return (
        <svg viewBox="0 0 48 48" aria-hidden className={className}>
          <circle cx="24" cy="26" r="16" {...stroke} />
          <path d="M24 26 V10 A16 16 0 0 1 38 18 Z" fill={c} />
        </svg>
      );
    case "taxes":
      // A big honest percent sign.
      return (
        <svg viewBox="0 0 48 48" aria-hidden className={className}>
          <path d="M34 12 L14 36" {...stroke} strokeWidth={4} />
          <circle cx="15.5" cy="15.5" r="5.5" {...stroke} />
          <circle cx="32.5" cy="32.5" r="5.5" {...stroke} />
        </svg>
      );
    case "college":
      // Mortarboard and tassel.
      return (
        <svg viewBox="0 0 48 48" aria-hidden className={className}>
          <path d="M24 10 L43 18.5 L24 27 L5 18.5 Z" fill={c} />
          <path d="M14.5 24 v7 q9.5 6 19 0 v-7" {...stroke} />
          <path d="M40 20.5 v9" {...stroke} />
          <circle cx="40" cy="32.5" r="2.5" fill={c} />
        </svg>
      );
    case "investing":
      // The long game, going up and to the right.
      return (
        <svg viewBox="0 0 48 48" aria-hidden className={className}>
          <path d="M7 37 L17 27 L25 31 L39 13" {...stroke} strokeWidth={4} />
          <path d="M31.5 12 H40 V20.5" {...stroke} strokeWidth={4} />
        </svg>
      );
    case "home-ownership":
      // A house with the door you own the key to.
      return (
        <svg viewBox="0 0 48 48" aria-hidden className={className}>
          <path d="M7 24 L24 9 L41 24" {...stroke} />
          <path d="M12 22.5 V38 H36 V22.5" {...stroke} />
          <path d="M21 38 v-9 h6 v9" {...stroke} />
        </svg>
      );
    case "government-aid":
      // A life ring — the safety net, drawn literally.
      return (
        <svg viewBox="0 0 48 48" aria-hidden className={className}>
          <circle cx="24" cy="24" r="16.5" {...stroke} />
          <circle cx="24" cy="24" r="7" {...stroke} />
          <path d="M29 19 L35.5 12.5 M29 29 L35.5 35.5 M19 29 L12.5 35.5 M19 19 L12.5 12.5" {...stroke} strokeWidth={3} />
        </svg>
      );
    case "money-safety":
      // Shield with a check: guarded and verified.
      return (
        <svg viewBox="0 0 48 48" aria-hidden className={className}>
          <path d="M24 7 L39 12.5 V23 C39 32.5 32.5 38.5 24 42 C15.5 38.5 9 32.5 9 23 V12.5 Z" {...stroke} />
          <path d="M17.5 24 L22.5 29 L31 19.5" {...stroke} strokeWidth={4} />
        </svg>
      );
    default:
      // Insurance: the umbrella, obviously.
      return (
        <svg viewBox="0 0 48 48" aria-hidden className={className}>
          <path d="M7 24 A17 17 0 0 1 41 24 Z" fill={c} />
          <path d="M24 24 V35 a4.5 4.5 0 0 0 9 0" {...stroke} />
          <path d="M24 6.5 V10" {...stroke} />
        </svg>
      );
  }
}
