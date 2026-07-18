// Interview Practice (July 17, 2026, owner: "more advice/tools for jobs…
// interview prep"). The course flip-deck pointed at interview questions:
// front is the question, back is the shape of a strong answer. Student-
// native page — the layout provides StudentHeader; links stay in-frame.

import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Flashcards from "@/components/Flashcards";
import HeroRecede from "@/components/HeroRecede";
import { interviewCards, INTERVIEW_ACCENT } from "@/lib/interviewDeck";

export const metadata: Metadata = {
  title: "Interview Practice | Empower — Economic Mobility Project",
  description:
    `${interviewCards.length} questions interviewers actually ask, as flip cards: see the question, say your answer out loud, flip for what a strong answer contains. Free, no signup.`,
};

export default function InterviewPracticePage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="relative overflow-hidden border-b-2 border-ink bg-forest text-cream">
        <HeroRecede className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <nav className="text-sm font-medium text-cream/60">
            <Link
              href="/students/careers"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-cream"
            >
              Careers kit
            </Link>{" "}
            / Interview Practice
          </nav>
          <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.07] tracking-tight sm:text-5xl">
            Practice the questions{" "}
            <span className="italic text-amber">before they're asked.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            {interviewCards.length} questions that show up in nearly every first-job
            interview. Read one, answer it out loud — actually out loud —
            then flip the card to compare your answer's shape against a
            strong one. Mark the ones you own; drill the rest.
          </p>
        </HeroRecede>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <Flashcards
            cards={interviewCards}
            accent={INTERVIEW_ACCENT}
            deckId="interview-practice"
            frontLabel="Question"
            clearedNote="Every question, answered out loud and owned. Walk in like you've done this before — because now you have."
          />
          <p className="mt-8 text-sm leading-6 text-stone">
            Want the answers built out in full?{" "}
            <Link
              href="/students/learn/college/interview-questions-answers"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              The five questions every interview asks
            </Link>{" "}
            teaches the core five in depth, and{" "}
            <Link
              href="/students/learn/college/ace-your-first-interview"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              the first-interview guide
            </Link>{" "}
            covers the day itself: what to wear, when to arrive, the
            thank-you message. Ready for a live one? The{" "}
            <Link
              href="/students/careers/mock-interview"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              AI mock interview
            </Link>{" "}
            talks back.
          </p>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
