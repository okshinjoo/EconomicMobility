import Link from "next/link";
import Ticker from "@/components/Ticker";
import TermOfTheDay from "@/components/TermOfTheDay";
import { glossary } from "@/lib/glossary";
import { getTopic } from "@/lib/topics";
import { frameHref, type Frame } from "@/lib/frame";


/**
 * The whole glossary below the header, shared by /glossary and its
 * /students mirror (July 2026 full-containment pass).
 */
export default function GlossaryPageView({ frame }: { frame: Frame }) {
  const href = (h: string) => frameHref(h, frame);
  // Group alphabetically by first letter of the display term.
  const sorted = [...glossary].sort((a, b) =>
    a.term.toLowerCase().localeCompare(b.term.toLowerCase())
  );
  const groups = new Map<string, typeof glossary>();
  for (const term of sorted) {
    const letter = term.term[0].toUpperCase();
    const key = /[A-Z]/.test(letter) ? letter : "#";
    const list = groups.get(key) ?? [];
    list.push(term);
    groups.set(key, list);
  }
  const letters = [...groups.keys()];

  // A rotating sample of real terms for the marquee strip (the glossary is
  // 400+ terms now; every 7th keeps the marquee a strip, not a wall).
  const tickerItems = sorted
    .filter((_, i) => i % 7 === 0)
    .map((t) => ({ label: t.term, href: `#${t.slug}` }));

  return (
    <>

      {/* Hero — A: solid amber field with a ghost glyph */}
      <section className="relative overflow-hidden bg-amber text-ink">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-24 select-none font-display text-[24rem] font-bold italic leading-none text-ink opacity-[0.06]"
        >
          Aa
        </span>
        <div className="relative mx-auto max-w-5xl px-6 pb-14 pt-14 lg:pt-16">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-ink/60">
            Glossary
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
            Money words,{" "}
            <span className="italic text-forest">in plain English.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">
            Every term we use across the site, defined simply, without assuming
            what you already know.
          </p>

          <p className="mt-8 text-sm font-bold text-ink/70">
            {glossary.length} terms · jump to a letter
          </p>
          {/* Letter index — B: ink-bordered chips on the field */}
          <div className="mt-3 flex flex-wrap gap-2">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink bg-cream text-sm font-bold text-ink shadow-[3px_3px_0_#11211c] transition-transform duration-150 hover:-translate-y-0.5"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Term marquee — real glossary entries, each links to its definition */}
      <Ticker items={tickerItems} />

      {/* Term of the day — rotates daily, same for everyone */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 pt-10">
          <TermOfTheDay frame={frame} />
        </div>
      </section>

      {/* Terms — editorial A–Z with giant letters */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-10 lg:grid lg:grid-cols-[2.75rem_1fr] lg:gap-10">
          {/* Sticky A–Z rail (desktop) — the hero chips scroll away; this doesn't */}
          <nav aria-label="Jump to a letter" className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-1">
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-sand bg-cream text-xs font-bold text-stone transition-colors hover:border-ink hover:bg-amber hover:text-ink"
                >
                  {letter}
                </a>
              ))}
            </div>
          </nav>

          <div className="space-y-8">
            {letters.map((letter) => {
              const terms = groups.get(letter)!;
              return (
                <div
                  key={letter}
                  id={`letter-${letter}`}
                  className="grid scroll-mt-24 gap-x-10 gap-y-1 border-t-2 border-ink/10 pt-5 first:border-t-0 first:pt-0 lg:grid-cols-[80px_1fr]"
                >
                  <div className="flex items-baseline gap-3 lg:block">
                    <span
                      aria-hidden="true"
                      className="select-none font-display text-4xl font-bold leading-none text-sand sm:text-5xl"
                    >
                      {letter}
                    </span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-stone lg:mt-2">
                      {terms.length} term{terms.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <dl className="grid gap-x-8 sm:grid-cols-2">
                    {terms.map((term) => {
                      const rel = term.related ? getTopic(term.related) : null;
                      return (
                        <div
                          key={term.slug}
                          id={term.slug}
                          className="scroll-mt-24 border-b border-sand py-3"
                        >
                          <dt className="font-display text-base font-semibold text-ink">
                            <span
                              aria-hidden="true"
                              className="mr-2 inline-block h-2.5 w-2.5 -rotate-3 rounded-[3px] align-baseline"
                              style={{ background: rel?.color ?? "#c9bfa9" }}
                            />
                            {term.term}
                            {term.aliases && term.aliases.length > 0 && (
                              <span className="ml-2 text-xs font-normal italic text-stone">
                                also: {term.aliases.join(", ")}
                              </span>
                            )}
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-ink/80">
                            {term.definition}
                            {term.article && (
                              <>
                                {" "}
                                <Link
                                  href={href(term.article)}
                                  className="whitespace-nowrap text-xs font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                                >
                                  Read the full guide
                                </Link>
                              </>
                            )}
                            {rel && (
                              <>
                                {" "}
                                <Link
                                  href={href(rel.href)}
                                  className="whitespace-nowrap text-xs font-semibold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-75"
                                  style={{
                                    color: rel.color,
                                    textDecorationColor: `${rel.color}55`,
                                  }}
                                >
                                  More on {rel.title}
                                </Link>
                              </>
                            )}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
