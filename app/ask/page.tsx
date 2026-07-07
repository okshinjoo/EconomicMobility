import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AskQuestion from "@/components/AskQuestion";
import { communityQuestions } from "@/lib/communityQuestions";
import { getTopic } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Ask Empower — Real Money Questions, Answered",
  description:
    "Ask any money question anonymously — no account, no judgment. We answer the most useful ones here, in plain English.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main>
        <section className="bg-paper">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center lg:py-20">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">Ask Empower</span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Real answers to real questions.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone">
              No question is too basic, and you never have to give your name.
              Ask anything about money — we answer the most common and useful
              ones right here, in plain English.
            </p>
          </div>
        </section>

        {/* Ask box */}
        <section id="ask" className="scroll-mt-24 bg-paper">
          <div className="mx-auto max-w-3xl px-6 pb-16">
            <AskQuestion />
          </div>
        </section>

        {/* Answered questions */}
        <section className="bg-paper-deep">
          <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Questions we&apos;ve answered
              </h2>
              <p className="mt-1 text-sm text-stone">
                Real questions from people like you.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {communityQuestions.map((qa) => {
                const topic = qa.topic ? getTopic(qa.topic) : null;
                return (
                  <article
                    key={qa.id}
                    id={`ask-${qa.id}`}
                    className="scroll-mt-24 rounded-2xl border border-sand bg-cream p-6 sm:p-7"
                  >
                    {topic && (
                      <Link
                        href={topic.href}
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide transition-opacity hover:opacity-80"
                        style={{ background: `${topic.color}1a`, color: topic.color }}
                      >
                        {topic.title}
                      </Link>
                    )}
                    <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
                      {qa.question}
                    </h3>
                    <div className="mt-3 space-y-3 text-[15px] leading-7 text-ink/90">
                      {qa.answer.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                    {qa.link && (
                      <Link
                        href={qa.link.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-ink"
                      >
                        {qa.link.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Guides CTA */}
        <section className="bg-paper">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Want the full picture?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-stone">
              The Learn library covers credit, budgeting, taxes, college,
              investing, scams, and more — over 100 guides in plain English.
            </p>
            <Link
              href="/learn"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-amber-deep hover:text-cream"
            >
              Explore the guides
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
