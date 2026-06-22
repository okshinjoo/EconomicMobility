import Link from "next/link";
import { categoryByBase, hrefFor } from "@/lib/toolsRegistry";

/** Pill nav across the calculators in a category. `current` is the active slug. */
export default function CalcSwitcher({
  base,
  current,
}: {
  base: string;
  current: string;
}) {
  const cat = categoryByBase(base);
  if (!cat) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {cat.items.map((item) => {
        const active = item.slug === current;
        if (item.status === "soon") {
          return (
            <span
              key={item.slug}
              className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-sand bg-cream/50 px-4 py-2 text-sm font-semibold text-stone/60"
            >
              {item.title}
              <span className="rounded-full bg-amber/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-deep">
                Soon
              </span>
            </span>
          );
        }
        return (
          <Link
            key={item.slug}
            href={hrefFor(cat, item)}
            aria-current={active ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              active
                ? "border-ink bg-ink text-cream"
                : "border-sand bg-cream text-ink hover:border-ink/30"
            }`}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
