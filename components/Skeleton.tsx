// Skeleton loaders (July 16, 2026, owner ask). The signed-in dashboard's
// cards read localStorage post-mount, so they used to render nothing for a
// beat and pop in one by one. These pulse placeholders hold each card's
// shape while it loads, so the page assembles instead of popping. House-
// toned (ink-tint blocks on cream), aria-hidden (screen readers meet the
// real content, same as before), and reduced-motion safe: the global rule
// stops the pulse but the blocks still read as placeholders. Use ONLY for
// loading states that always resolve to visible content — a card that may
// legitimately hide (e.g. MomentsCard) must not flash a skeleton first.

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block animate-pulse rounded-md bg-ink/[0.08] ${className}`}
    />
  );
}

/** A card-shaped placeholder matching the dashboard card chrome. */
export function SkeletonCard({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`rounded-2xl border-2 border-ink/10 bg-cream p-5 ${className}`}
    >
      <Skeleton className="h-4 w-40" />
      <div className="mt-4 space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={i === lines - 1 ? "h-3 w-2/3" : "h-3 w-full"}
          />
        ))}
      </div>
    </div>
  );
}
