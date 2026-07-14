import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allArticles } from "@/lib/articles";
import AskQuestion from "@/components/AskQuestion";
import AskAnswers from "@/components/AskAnswers";
import { communityQuestions } from "@/lib/communityQuestions";
import ScrollDrift from "@/components/ScrollDrift";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Ask Empower: Real Money Questions, Answered",
  description:
    "Ask any money question anonymously, with no account and no judgment. We answer the most useful ones here, in plain English.",
};

export default function AskPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <JsonLd
        data={faqSchema(
          communityQuestions.map((qa) => ({
            question: qa.question,
            answer: qa.answer,
          }))
        )}
      />
      <Header />

      <main>
        {/* Hero — C: editorial maximal on a forest field */}
        <section className="relative overflow-hidden bg-forest text-cream">
          <ScrollDrift>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -right-6 select-none font-display text-[22rem] font-bold italic leading-none text-cream opacity-[0.07]"
            >
              Q.
            </span>
          </ScrollDrift>
          <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-14 lg:pt-20">
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
              Ask Empower
            </span>
            <h1 className="mt-5 font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
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

            <AskAnswers items={communityQuestions} />
          </div>
        </section>

        {/* Guides CTA — A: amber field */}
        <section className="bg-amber text-ink">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Want the full picture?
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-ink/75">
              The Learn library has {Math.floor(allArticles.length / 50) * 50}+
              plain-English guides on credit, budgeting, taxes, college,
              investing, scams, and more.
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
