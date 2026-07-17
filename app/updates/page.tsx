// Site notes (July 17, 2026) — the real, dated changelog. The strongest
// "a person runs this" signal a site can send: visible upkeep with honest
// ship dates. Content lives in lib/siteNotes.ts (append on ship).

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import HeroRecede from "@/components/HeroRecede";
import Reveal from "@/components/Reveal";
import { siteNotes } from "@/lib/siteNotes";

export const metadata: Metadata = {
  title: "Site Notes | Empower — Economic Mobility Project",
  description:
    "What's new around here: real features with their real ship dates. The site grows most weeks; this is the honest record.",
};

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main className="relative z-10 bg-paper">
        {/* Hero */}
        <section className="relative overflow-hidden bg-paper-deep">
          <HeroRecede className="mx-auto max-w-3xl px-6 py-14 lg:py-20">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Site notes
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              What&apos;s new around here.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-stone">
              This site grows most weeks. These are the notes: real features,
              real ship dates, written down when they happened. If something
              here would help you, it&apos;s already live.
            </p>
          </HeroRecede>
        </section>

        {/* The notes */}
        <section className="border-t-2 border-ink bg-paper">
          <div className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
            <ol className="space-y-10">
              {siteNotes.map((note, i) => (
                <Reveal key={`${note.date}-${note.title}`} delay={(i % 3) * 80}>
                  <li className="border-b border-sand pb-10 last:border-b-0 last:pb-0">
                    <p className="font-display text-sm font-semibold italic text-terracotta">
                      {note.date}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-ink">
                      {note.title}
                    </h2>
                    <p className="mt-3 text-base leading-7 text-stone">
                      {note.body}
                    </p>
                    {note.href && (
                      <p className="mt-3">
                        <Link
                          href={note.href}
                          className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
                        >
                          {note.hrefLabel ?? "Have a look"}
                        </Link>
                      </p>
                    )}
                  </li>
                </Reveal>
              ))}
            </ol>

            <p className="mt-12 text-sm leading-6 text-stone">
              Want something that isn&apos;t here yet?{" "}
              <Link
                href="/contact"
                className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
              >
                Tell us
              </Link>{" "}
              — reader asks have shaped most of what&apos;s on this list.
            </p>
          </div>
        </section>
      </main>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
