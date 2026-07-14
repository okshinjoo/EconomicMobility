import Link from "next/link";
import { categoryByBase, hrefFor } from "@/lib/toolsRegistry";
import SaveToolButton from "@/components/SaveToolButton";

/** Tab nav across the calculators in a category. `current` is the active slug. */
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
    <div className="flex flex-wrap items-center gap-2">
      {cat.items.map((item) => {
        const active = item.slug === current;
        if (item.status === "soon") {
          return (
            <span
              key={item.slug}
              className="inline-flex cursor-default items-center gap-1.5 rounded-md border-2 border-sand/70 bg-cream/50 px-4 py-2 text-sm font-semibold text-stone/60"
            >
              {item.title}
              <span className="rounded-sm bg-amber/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-deep">
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
            className={`rounded-md border-2 px-4 py-2 text-sm transition-colors ${
              active
                ? "border-ink bg-amber font-bold text-ink shadow-[3px_3px_0_#11211c]"
                : "border-sand bg-cream font-semibold text-ink hover:border-ink/40"
            }`}
          >
            {item.title}
          </Link>
        );
      })}
      {/* save-this-tool toggle — writes to the profile's saved-tools set */}
      <span className="ml-auto">
        <SaveToolButton slug={current} />
      </span>
    </div>
  );
}
