import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { glossary } from "@/lib/glossary";
import { getTopic } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Glossary | Empower — Economic Mobility Project",
  description:
    "Plain-English definitions of common money terms — credit, taxes, investing, financial aid, and more. No jargon.",
};

// The accent that colors the A–Z letter headings.
const ACCENT = "#0f5c46";

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

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero band */}
      <section className="bg-paper">
        <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
            Glossary
          </span>

          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl">
            Money words, in plain English.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone">
            Every term we use across the site, defined simply. No jargon, no
            assumptions — just clear answers.
          </p>

          <p className="mt-7 text-sm font-medium text-stone">
            {glossary.length} terms · jump to a letter
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-sand bg-cream text-sm font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-cream"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms — responsive card grid, grouped A–Z */}
      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 pb-24 pt-12">
          {letters.map((letter) => (
            <div
              key={letter}
              id={`letter-${letter}`}
              className="scroll-mt-24 pt-10 first:pt-0"
            >
              <div className="flex items-center gap-4">
                <h2
                  className="font-display text-3xl font-bold"
                  style={{ color: ACCENT }}
                >
                  {letter}
                </h2>
                <span className="h-px flex-1 bg-sand" />
                <span className="text-xs font-medium text-stone">
                  {groups.get(letter)!.length} term
                  {groups.get(letter)!.length > 1 ? "s" : ""}
                </span>
              </div>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {groups.get(letter)!.map((term) => {
                  const rel = term.related ? getTopic(term.related) : null;
                  return (
                    <div
                      key={term.slug}
                      id={term.slug}
                      className="scroll-mt-24 flex flex-col rounded-2xl border border-sand bg-cream p-5 transition-shadow hover:shadow"
                    >
                      <dt className="font-display text-lg font-semibold text-ink">
                        {term.term}
                      </dt>
                      {term.aliases && term.aliases.length > 0 && (
                        <p className="mt-0.5 text-xs italic text-stone">
                          also: {term.aliases.join(", ")}
                        </p>
                      )}
                      <dd className="mt-2 flex-1 text-base leading-7 text-ink/80">
                        {term.definition}
                      </dd>
                      {rel && (
                        <Link
                          href={rel.href}
                          className="group mt-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors"
                          style={{ background: `${rel.color}1a`, color: rel.color }}
                        >
                          Learn more about {rel.title}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
