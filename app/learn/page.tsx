import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicMark from "@/components/TopicMark";
import Reveal from "@/components/Reveal";
import { TopicBar, ReadBadge } from "@/components/ReadBadge";
import ReadOrderedGrid from "@/components/ReadOrderedGrid";
import { topics } from "@/lib/topics";
import { guideCount, learnContent } from "@/lib/learnContent";
import { getTopicRoadmap, getArticleBySlug } from "@/lib/articles";
import { ROADMAP_SLUGS } from "@/lib/roadmaps";
import { glossary } from "@/lib/glossary";
import TermOfTheDay from "@/components/TermOfTheDay";

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

      {/* Hero — C: editorial maximal on a forest field, launcher tiles on top */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <TopicMark
          id="budgeting"
          color="#fbf8f1"
          className="pointer-events-none absolute -bottom-24 -left-20 h-[26rem] w-[26rem] opacity-[0.07]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
              The Library
            </span>
            <h1 className="mt-5 font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
              Learn money,
              <br />
              <span className="italic text-amber">your way.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-cream/75">
              Nine core topics, each built as a clear path from the absolute
              basics to the stuff that takes you further. Start anywhere — or
              let the quiz pick for you.
            </p>
            {/* Separators live INSIDE the nowrap pairs so a wrap never
                strands a lone "·" at a line edge on small screens. */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-semibold text-cream/70">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                <BookOpen className="h-4 w-4 text-amber" />
                {totalGuides} free guides
              </span>
              <span className="inline-flex items-center gap-3 whitespace-nowrap">
                <span className="hidden text-cream/30 sm:inline">·</span>
                {topics.length} topics
              </span>
              <span className="inline-flex items-center gap-3 whitespace-nowrap">
                <span className="hidden text-cream/30 sm:inline">·</span>
                No sign-up, no paywall
              </span>
            </div>
            <div className="mt-8">
              <Link
                href="/quiz"
                className="btn-ink inline-flex items-center justify-center gap-2 rounded-md bg-amber px-7 py-3.5 text-base font-bold text-ink"
              >
                Not sure where to start? Take the quiz
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Topic launcher: nine marks on cream/pastel tiles, floating on the field */}
          <div className="grid grid-cols-3 gap-3">
            {topics.map((t, i) => (
              <Reveal key={t.id} delay={i * 50}>
                <Link
                  href={t.href}
                  className="group flex flex-col items-center gap-2 rounded-2xl px-3 py-5 text-center transition-transform duration-200 hover:-translate-y-1"
                  style={{
                    background: `color-mix(in srgb, ${t.color} 13%, #fbf8f1)`,
                  }}
                >
                  <TopicMark
                    id={t.id}
                    className="h-9 w-9 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="text-xs font-bold leading-tight text-ink">
                    {t.short}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap articles: the "what order do I do this in" pathfinders */}
      {(() => {
        const roadmaps = ROADMAP_SLUGS
          .map((slug) => getArticleBySlug(slug))
          .filter((a): a is NonNullable<ReturnType<typeof getArticleBySlug>> => Boolean(a));
        if (roadmaps.length === 0) return null;
        return (
          <section id="roadmaps" className="scroll-mt-20 border-y-2 border-ink bg-amber">
            <div className="mx-auto max-w-7xl px-6 py-10">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <span className="inline-block -rotate-1 rounded-lg border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
                    Roadmaps
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
                    Not sure what order to do things in?
                  </h2>
                </div>
                <p className="max-w-sm text-sm font-medium leading-6 text-ink/70">
                  These guides don&apos;t teach a topic. They hand you the map
                  and point at the next step.
                </p>
              </div>
              <ReadOrderedGrid
                className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                items={roadmaps.map((a, i) => ({
                  slug: a.slug,
                  node: (
                  <Reveal key={a.slug} delay={(i % 3) * 60} className="h-full">
                    <Link
                      href={`/learn/${a.topicId}/${a.slug}`}
                      className={`card-ink flex h-full items-center gap-3 rounded-xl bg-cream px-4 py-3.5 transition-transform duration-200 hover:-translate-y-0.5 ${
                        i % 3 === 1 ? "lg:rotate-[0.3deg]" : ""
                      }`}
                    >
                      <TopicMark id={a.topicId} className="h-7 w-7 shrink-0" />
                      <span className="flex-1 text-sm font-bold leading-snug text-ink">
                        {a.title}
                      </span>
                      <ReadBadge slug={a.slug} accent="#11211c" />
                    </Link>
                  </Reveal>
                  ),
                }))}
              />
            </div>
          </section>
        );
      })()}

      {/* Topic grid */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, i) => {
              const content = learnContent[topic.id];
              const roadmap = getTopicRoadmap(topic.id);
              const first = roadmap[0]?.articles[0];
              const slugs = roadmap.flatMap((g) => g.articles.map((a) => a.slug));
              return (
                <Reveal key={topic.id} delay={(i % 3) * 70}>
                  <Link
                    href={topic.href}
                    className={`card-ink group flex h-full flex-col overflow-hidden rounded-2xl bg-cream transition-transform duration-200 hover:-translate-y-1 ${
                      i === 1
                        ? "lg:rotate-[0.5deg]"
                        : i === 6
                          ? "lg:-rotate-[0.5deg]"
                          : ""
                    }`}
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
                        <TopicMark id={topic.id} className="h-8 w-8" />
                      </span>
                    </div>

                    {/* Topic-colored hairline ties photo to content */}
                    <div className="h-1 w-full" style={{ background: topic.color }} />

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
                      <TopicBar slugs={slugs} color={topic.color} />
                      <span
                        className="mt-4 text-sm font-semibold underline decoration-2 underline-offset-4"
                        style={{ color: topic.color, textDecorationColor: `${topic.color}55` }}
                      >
                        Explore the path
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Glossary band — A voice: the "every word, in plain English" promise */}
      <section className="bg-forest text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_24rem] lg:py-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber">
              The glossary
            </span>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {glossary.length} money words,{" "}
              <span className="italic text-amber">zero jargon.</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-cream/75">
              Every term the guides use is defined in plain English — and
              inside any guide, the first mention of a term shows its
              definition right where you&apos;re reading. Hit a word you
              don&apos;t know anywhere else? Look it up in seconds.
            </p>
            <Link
              href="/glossary"
              className="mt-5 inline-block font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              Open the glossary
            </Link>
          </div>
          <TermOfTheDay />
        </div>
      </section>

      <Footer />
    </div>
  );
}
