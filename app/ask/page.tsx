import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AskQuestion from "@/components/AskQuestion";
import { communityQuestions } from "@/lib/communityQuestions";
import { getTopic } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Ask Empower — Real Money Questions, Answered",
  description:
    "Ask any money question anonymously, with no account and no judgment. We answer the most useful ones here, in plain English.",
};

export default function AskPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main>
        {/* Hero — C: editorial maximal on a forest field */}
        <section className="relative overflow-hidden bg-forest text-cream">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-6 select-none font-display text-[22rem] font-bold italic leading-none text-cream opacity-[0.07]"
          >
            Q.
          </span>
          <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-14 lg:pt-20">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
              Ask Empower
            </span>
            <h1 className="mt-5 font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Real answers to{" "}
              <span className="italic text-amber">real questions.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75">
              No question is too basic, and you never have to give your name.
              Ask anything about money. The most common and useful questions
              get answered right here, in plain English.
            </p>
          </div>
        </section>

        {/* Ask box — B: the composer as a touchable object over the field */}
        <section id="ask" className="scroll-mt-24 bg-paper">
          <div className="relative mx-auto -mt-10 max-w-3xl px-6 pb-16">
            <AskQuestion />
          </div>
        </section>

        {/* Answered questions — the advice column */}
        <section className="bg-paper-deep">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">
                The answer column
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Questions we&apos;ve answered
              </h2>
              <p className="mt-2 text-base text-stone">
                Real questions from people like you.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {communityQuestions.map((qa, qi) => {
                const topic = qa.topic ? getTopic(qa.topic) : null;
                return (
                  <article
                    key={qa.id}
                    id={`ask-${qa.id}`}
                    className={`card-ink scroll-mt-24 rounded-2xl bg-cream p-6 sm:p-8 ${
                      qi % 3 === 1 ? "lg:rotate-[0.35deg]" : qi % 3 === 2 ? "lg:-rotate-[0.35deg]" : ""
                    }`}
                  >
                    {topic && (
                      <Link
                        href={topic.href}
                        className="inline-block -rotate-1 rounded-md border-2 border-ink px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-cream shadow-[2px_2px_0_#11211c] transition-transform hover:-translate-y-0.5"
                        style={{ background: topic.color }}
                      >
                        {topic.title}
                      </Link>
                    )}
                    <div className="mt-4 flex gap-4">
                      <span
                        aria-hidden="true"
                        className="select-none font-display text-3xl font-bold italic leading-none text-terracotta"
                      >
                        Q.
                      </span>
                      <h3 className="font-display text-2xl font-semibold leading-snug text-ink">
                        {qa.question}
                      </h3>
                    </div>
                    <div className="mt-5 flex gap-4">
                      <span
                        aria-hidden="true"
                        className="select-none font-display text-3xl font-bold italic leading-none text-forest"
                      >
                        A.
                      </span>
                      <div className="space-y-3 text-base leading-7 text-ink/85">
                        {qa.answer.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                        {qa.link && (
                          <p>
                            <Link
                              href={qa.link.href}
                              className="text-sm font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
                            >
                              {qa.link.label}
                            </Link>
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Guides CTA — A: amber field */}
        <section className="bg-amber text-ink">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Want the full picture?
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-ink/75">
              The Learn library has over 100 plain-English guides on credit,
              budgeting, taxes, college, investing, scams, and more.
            </p>
            <Link
              href="/learn"
              className="btn-ink mt-8 inline-flex items-center justify-center rounded-md bg-cream px-7 py-3.5 text-base font-bold text-ink"
            >
              Explore the guides
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
