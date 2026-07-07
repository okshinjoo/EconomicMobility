import Link from "next/link";
import { ChevronDown } from "lucide-react";
import MobileNav from "@/components/MobileNav";
import SearchDialog from "@/components/SearchDialog";
import { nav, type NavEntry } from "@/lib/nav";
import { getSearchItems } from "@/lib/search";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-forest/95 text-cream backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber font-display text-lg font-bold text-ink">
            E
          </span>
          <span className="leading-tight">
            <span className="font-display text-xl font-semibold tracking-tight">
              <span className="text-amber">EMP</span>ower
            </span>
            {/* Subtitle needs one line; below xl it would stack and swell the header. */}
            <span className="hidden whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/50 xl:block">
              Economic Mobility Project
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {nav.map((entry) =>
            entry.items ? (
              <NavMenu key={entry.href} entry={entry} />
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                className="rounded-full px-3 py-2 text-cream/80 transition-colors hover:text-amber"
              >
                {entry.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <SearchDialog items={getSearchItems()} />
          <Link
            href="/quiz"
            className="hidden whitespace-nowrap rounded-md bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-200 hover:bg-cream lg:inline-block"
          >
            Take the Quiz
          </Link>
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}

function NavMenu({ entry }: { entry: NavEntry }) {
  return (
    <div className="group relative">
      <Link
        href={entry.href}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-cream/80 transition-colors hover:text-amber group-focus-within:text-amber"
      >
        {entry.label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
      </Link>

      {/* pt-3 bridges the gap so hover isn't lost between trigger and panel */}
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div
          className={`rounded-2xl border border-ink-600 bg-ink p-2 shadow-2xl ${
            entry.columns === 2 ? "w-[31rem]" : "w-72"
          }`}
        >
          <div
            className={entry.columns === 2 ? "grid grid-cols-2 gap-1" : "space-y-0.5"}
          >
            {entry.items!.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-ink-700"
              >
                {item.icon && (
                  <span
                    className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${item.color}1f`, color: item.color }}
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-cream">
                    {item.label}
                  </span>
                  {item.desc && (
                    <span className="mt-0.5 block text-xs leading-snug text-cream/55">
                      {item.desc}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>

          {entry.footer && (
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 border-t border-ink-600 px-3 pb-1 pt-2">
              {entry.footer.map((f) => (
                <Link
                  key={f.href}
                  href={f.href}
                  className="text-xs font-semibold text-amber transition-colors hover:text-cream"
                >
                  {f.label} →
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
