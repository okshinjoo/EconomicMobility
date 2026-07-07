import Link from "next/link";

/**
 * Slow horizontal marquee of real reader questions — an alive, zine-like
 * strip between sections. Content is duplicated once so the CSS loop is
 * seamless; hover pauses it and the global reduced-motion rule stops it.
 */
export default function Ticker({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item.href} className="flex items-center">
          <Link
            href={item.href}
            tabIndex={ariaHidden ? -1 : undefined}
            className="whitespace-nowrap px-6 font-display text-lg font-medium text-cream transition-colors hover:text-amber"
          >
            {item.label}
          </Link>
          <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 shrink-0 text-amber">
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
    <div className="ticker overflow-hidden border-y-2 border-ink bg-forest py-3.5">
      <div className="ticker-track flex">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
