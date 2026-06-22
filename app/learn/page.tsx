import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { topics } from "@/lib/topics";
import { guideCount, learnContent } from "@/lib/learnContent";
import { getTopicRoadmap } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Learn | Empower — Economic Mobility Project",
  description:
    "Free, plain-English guides on credit, budgeting, taxes, college, investing, home ownership, scams, and insurance. No jargon, no paywall.",
};

export default function LearnHub() {
  const totalGuides = topics.reduce((sum, t) => sum + guideCount(t.id), 0);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero */}
      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center lg:pt-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">The Library</span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Learn money, your way.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone">
            Nine core topics, each built as a clear path from the absolute basics
            to the stuff that takes you further. Start anywhere — or let the quiz
            pick for you.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-stone">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-forest" />
              {totalGuides} free guides
            </span>
            <span className="text-sand">·</span>
            <span>{topics.length} topics</span>
            <span className="text-sand">·</span>
            <span>No sign-up, no paywall</span>
          </div>

          <div className="mt-8">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-amber-deep hover:text-cream"
            >
              Not sure where to start? Take the quiz
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Topic grid */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => {
              const content = learnContent[topic.id];
              const first = getTopicRoadmap(topic.id)[0]?.articles[0];
              return (
                <Link
                  key={topic.id}
                  href={topic.href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-cream transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-xl"
                >
                  <div className="relative aspect-[5/3] overflow-hidden bg-sand">
                    <Image
                      src={topic.image}
                      alt=""
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 left-3 flex h-14 w-14 items-center justify-center rounded-full border border-sand bg-cream shadow-md">
                      <Image
                        src={`/images/illustrations/${topic.id}.png`}
                        alt=""
                        unoptimized
                        width={48}
                        height={48}
                        className="h-10 w-10 object-contain"
                      />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="font-display text-lg font-semibold text-ink">
                        {topic.title}
                      </h2>
                      <span className="flex-shrink-0 text-xs font-medium text-stone">
                        {guideCount(topic.id)} guides
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-stone">
                      {content.subhead}
                    </p>
                    {first && (
                      <p className="mt-3 flex-1 text-xs leading-5 text-stone">
                        <span className="font-semibold text-ink">Start with: </span>
                        {first.title}
                      </p>
                    )}
                    <span
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                      style={{ color: topic.color }}
                    >
                      Explore the path
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
