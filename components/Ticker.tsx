import Link from "next/link";

/**
 * Slow horizontal marquee of real reader questions — an alive, zine-like
 * strip between sections. Content is duplicated once so the CSS loop is
 * seamless; hover pauses it and the global reduced-motion rule stops it.
 */
export default function Ticker({
  items,
  tone = "forest",
}: {
  items: { label: string; href: string }[];
  /** forest = cream text on green (questions); amber = ink text on yellow
   *  (value props). */
  tone?: "forest" | "amber";
}) {
  const amber = tone === "amber";
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item.href}-${i}`} className="flex items-center">
          <Link prefetch={false}
            href={item.href}
            tabIndex={ariaHidden ? -1 : undefined}
            className={`whitespace-nowrap px-6 font-display text-lg font-medium transition-colors ${
              amber
                ? "text-ink hover:text-forest"
                : "text-cream hover:text-amber"
            }`}
          >
            {item.label}
          </Link>
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className={`h-4 w-4 shrink-0 ${amber ? "text-terracotta" : "text-amber"}`}
          >
            <path
              d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
              fill="currentColor"
            />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`ticker overflow-hidden border-y-2 border-ink py-3.5 ${
        amber ? "bg-amber" : "bg-forest"
      }`}
    >
      <div className="ticker-track flex">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
