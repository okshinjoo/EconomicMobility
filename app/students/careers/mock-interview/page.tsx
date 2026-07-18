// AI mock interview page (July 17, 2026 — see components/MockInterview.tsx
// and app/api/interview/route.ts). Student-native; layout provides
// StudentHeader.

import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import MockInterview from "@/components/MockInterview";
import HeroRecede from "@/components/HeroRecede";

export const metadata: Metadata = {
  title: "AI Mock Interview | Empower — Economic Mobility Project",
  description:
    "Practice a first-job interview with an AI interviewer: pick the job and how tough the interviewer is, answer real questions, and get honest coaching feedback at the end. Free, nothing saved.",
};

export default function MockInterviewPage() {
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
            / Mock Interview
          </nav>
          <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.07] tracking-tight sm:text-5xl">
            Interview a hundred times{" "}
            <span className="italic text-amber">before the one that counts.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            Pick the job, pick how tough the interviewer is, and practice a
            real five-question interview in chat. When you finish (or bail
            out — allowed), you get honest coaching on what worked and what
            to sharpen. Nothing is saved, so bombing one costs nothing.
          </p>
        </HeroRecede>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <MockInterview />
          <p className="mt-8 text-sm leading-6 text-stone">
            Warm up first with the{" "}
            <Link
              href="/students/careers/interview-practice"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              Interview Practice deck
            </Link>{" "}
            (no AI, just flip cards), or build your five core answers with{" "}
            <Link
              href="/students/learn/college/interview-questions-answers"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              the questions guide
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
