// The Guides tab's own landing (July 17, 2026, owner: "the for students
// page subtabs should each have their own landing pages"). Curates the
// library through the student lens: college money first, the student
// shelf, then all nine topics. Student-native — layout provides
// StudentHeader; everything links in-frame.

import Link from "next/link";
import type { Metadata } from "next";
import { ArrowsLeftRight as ArrowRightLeft, FileText, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import Footer from "@/components/Footer";
import HeroRecede from "@/components/HeroRecede";
import Reveal from "@/components/Reveal";
import TopicMark from "@/components/TopicMark";
import { topics } from "@/lib/topics";
import { getTopicArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Guides for Students | Empower — Economic Mobility Project",
  description:
    "The whole guide library through the student lens: college money first (aid, FAFSA, transfer), the beyond-tuition essentials, and all nine money topics. Free, plain-English, no signup.",
};

export default function StudentGuidesPage() {
  const collegeCount = getTopicArticles("college").length;
  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="relative overflow-hidden border-b-2 border-ink bg-forest text-cream">
        <HeroRecede className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber">
            For Students · Guides
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.07] tracking-tight sm:text-5xl">
            The library,{" "}
            <span className="italic text-amber">in student terms.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            Every guide on the site is free and written in plain English.
            This page sorts them the way a student actually needs them:
            college money first, then the rest of the money world.
          </p>
        </HeroRecede>
      </section>

      {/* College money — the front door */}
      <section className="border-b-2 border-ink bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Start here
          </span>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              href="/students/learn/college"
              className="card-ink-lg group flex h-full flex-col rounded-2xl bg-forest p-6 text-cream transition-transform duration-200 hover:-translate-y-1"
            >
              <GraduationCap className="h-6 w-6 text-amber" weight="bold" />
              <h2 className="mt-3 font-display text-xl font-bold leading-snug group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                College &amp; aid guides
              </h2>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-cream/75">
                All {collegeCount}: aid and admissions, loans and repayment,
                transfer, staying afloat once you&apos;re in.
              </p>
            </Link>
            <Link
              href="/students/learn/college/fafsa-step-by-step"
              className="card-ink group flex h-full flex-col rounded-2xl bg-cream p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <FileText className="h-6 w-6 text-forest" weight="bold" />
              <h2 className="mt-3 font-display text-xl font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                FAFSA, Step by Step
              </h2>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                The one form that unlocks most college aid, walked through
                screen by screen.
              </p>
            </Link>
            <Link
              href="/students/learn/college/community-college-transfer-money"
              className="card-ink group flex h-full flex-col rounded-2xl bg-cream p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <ArrowRightLeft className="h-6 w-6 text-terracotta" weight="bold" />
              <h2 className="mt-3 font-display text-xl font-bold leading-snug text-ink group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4">
                The transfer money guide
              </h2>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                Community college to a four-year degree with every unit and
                every dollar making the trip.
              </p>
            </Link>
          </div>
          <p className="mt-5 text-sm font-semibold text-stone">
            Money beyond tuition — paychecks, first cards, taxes — lives on{" "}
            <Link
              href="/students#shelf"
              className="text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              the student shelf
            </Link>
            , and every term is in{" "}
            <Link
              href="/students/glossary"
              className="text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              the glossary
            </Link>
            .
          </p>
        </div>
      </section>

      {/* All nine topics */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            All nine money topics
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
            The rest of the money world, same plain English.
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {topics.map((t, i) => (
              <Reveal key={t.id} delay={i * 50}>
                <Link
                  href={`/students/learn/${t.id}`}
                  className="group flex h-full items-center gap-3 rounded-xl border-2 border-ink/10 bg-cream p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:border-ink/30"
                >
                  <TopicMark
                    id={t.id}
                    color={t.color}
                    className="h-8 w-8 shrink-0 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-base font-bold leading-tight text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4" style={{ textDecorationColor: t.color }}>
                      {t.short}
                    </span>
                    <span className="block text-xs text-stone">
                      {getTopicArticles(t.id).length} guides
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
