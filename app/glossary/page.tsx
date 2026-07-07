import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ticker from "@/components/Ticker";
import { glossary } from "@/lib/glossary";
import { getTopic } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Glossary | Empower — Economic Mobility Project",
  description:
    "Plain-English definitions of common money terms — credit, taxes, investing, financial aid, and more. No jargon.",
};

export default function GlossaryPage() {
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

  // A rotating sample of real terms for the marquee strip.
  const tickerItems = sorted
    .filter((_, i) => i % 4 === 0)
    .map((t) => ({ label: t.term, href: `#${t.slug}` }));

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

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
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl">
            Money words,{" "}
            <span className="italic text-forest">in plain English.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">
            Every term we use across the site, defined simply. No jargon, no
            assumptions — just clear answers.
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

      {/* Terms — editorial A–Z with giant letters */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 pb-24 pt-14">
          <div className="space-y-14">
            {letters.map((letter) => {
              const terms = groups.get(letter)!;
              return (
                <div
                  key={letter}
                  id={`letter-${letter}`}
                  className="grid scroll-mt-24 gap-x-12 gap-y-2 border-t-2 border-ink/10 pt-8 first:border-t-0 first:pt-0 lg:grid-cols-[140px_1fr]"
                >
                  <div className="flex items-baseline gap-4 lg:block">
                    <span
                      aria-hidden="true"
                      className="select-none font-display text-7xl font-bold leading-none text-sand sm:text-8xl"
                    >
                      {letter}
                    </span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-stone lg:mt-3">
                      {terms.length} term{terms.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <dl className="grid gap-x-10 sm:grid-cols-2">
                    {terms.map((term) => {
                      const rel = term.related ? getTopic(term.related) : null;
                      return (
                        <div
                          key={term.slug}
                          id={term.slug}
                          className="scroll-mt-24 border-b border-sand py-5"
                        >
                          <dt className="font-display text-lg font-semibold text-ink">
                            {term.term}
                          </dt>
                          {term.aliases && term.aliases.length > 0 && (
                            <p className="mt-0.5 text-xs italic text-stone">
                              also: {term.aliases.join(", ")}
                            </p>
                          )}
                          <dd className="mt-2 text-[15px] leading-7 text-ink/80">
                            {term.definition}
                          </dd>
                          {rel && (
                            <Link
                              href={rel.href}
                              className="mt-3 inline-block text-sm font-semibold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-75"
                              style={{
                                color: rel.color,
                                textDecorationColor: `${rel.color}55`,
                              }}
                            >
                              Learn more about {rel.title}
                            </Link>
                          )}
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

      <Footer />
    </div>
  );
}
