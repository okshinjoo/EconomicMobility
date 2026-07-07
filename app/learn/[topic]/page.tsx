import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Clock,
  BarChart3,
  Wrench,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { topics, getTopic, type TopicId } from "@/lib/topics";
import { learnContent, guideCount, LEARN_UPDATED } from "@/lib/learnContent";
import { getTopicRoadmap } from "@/lib/articles";
import { ReadBadge, TopicProgress } from "@/components/ReadBadge";
import TopicMark from "@/components/TopicMark";

function isTopicId(value: string): value is TopicId {
  return topics.some((t) => t.id === value);
}

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  if (!isTopicId(topic)) return { title: "Not Found | Empower" };
  const content = learnContent[topic];
  return {
    title: `${getTopic(topic).title} | Empower — Economic Mobility Project`,
    description: content.subhead,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  if (!isTopicId(topic)) notFound();

  const meta = getTopic(topic);
  const content = learnContent[topic];
  const accent = meta.color;
  const roadmap = getTopicRoadmap(topic);
  const hasArticles = roadmap.length > 0;

  const allInOrder = roadmap.flatMap((g) => g.articles);
  const featured = allInOrder[0];
  const numberOf = new Map(allInOrder.map((a, i) => [a.slug, i + 1]));

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero — clean editorial, with the topic illustration */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-8">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-stone">
            <Link href="/learn" className="transition-colors hover:text-ink">
              Learn
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-ink">{meta.title}</span>
          </nav>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
                {content.headline}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-stone">
                {content.subhead}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-stone">
                <span className="inline-flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4" style={{ color: accent }} />
                  {content.level}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" style={{ color: accent }} />
                  {guideCount(topic)} guides
                </span>
                <span>{LEARN_UPDATED}</span>
              </div>
            </div>
            <div className="relative order-first aspect-[5/4] overflow-hidden rounded-3xl border border-sand bg-sand lg:order-last">
              <Image
                src={meta.image}
                alt=""
                fill
                unoptimized
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 flex h-16 w-16 items-center justify-center rounded-full border border-sand bg-cream shadow-md">
                <TopicMark id={meta.id} className="h-9 w-9" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro lead */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 pt-4">
          <div
            className="max-w-3xl space-y-4 border-l-2 pl-6 text-lg leading-8 text-ink/85"
            style={{ borderColor: accent }}
          >
            {content.intro.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {hasArticles ? (
        <>
          {/* Featured "Start here" article */}
          {featured && (
            <section className="bg-paper">
              <div className="mx-auto max-w-5xl px-6 pt-12">
                <Link
                  href={`/learn/${topic}/${featured.slug}`}
                  className="group grid gap-6 rounded-3xl border p-7 transition-all duration-200 hover:shadow-lg sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center"
                  style={{ borderColor: `${accent}40`, background: `${accent}0d` }}
                >
                  <div>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                      style={{ background: accent, color: "#fbf8f1" }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Start here
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-base leading-7 text-stone">
                      {featured.dek}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <span
                        className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all group-hover:gap-3"
                        style={{ background: accent, color: "#fbf8f1" }}
                      >
                        Start reading
                        <ArrowRight className="h-4 w-4" />
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-stone">
                        <Clock className="h-4 w-4" />
                        {featured.readMinutes} min read
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* The full path — card grid by level */}
          <section className="bg-paper">
            <div className="mx-auto max-w-5xl px-6 py-14">
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                The full path
              </h2>
              <p className="mt-1.5 text-sm text-stone">
                {allInOrder.length} guides, building from the basics up — read in
                any order.
                <TopicProgress
                  slugs={allInOrder.map((a) => a.slug)}
                  accent={accent}
                />
              </p>

              <div className="mt-9 space-y-12">
                {roadmap.map((group) => {
                  const rest = group.articles.filter(
                    (a) => a.slug !== featured?.slug
                  );
                  if (rest.length === 0) return null;
                  return (
                    <div key={group.level}>
                      <div className="flex items-center gap-3">
                        <span
                          className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                          style={{ background: `${accent}1a`, color: accent }}
                        >
                          {group.label}
                        </span>
                        <span className="h-px flex-1 bg-sand" />
                        <span className="text-xs font-medium text-stone">
                          {group.articles.length} guide
                          {group.articles.length > 1 ? "s" : ""}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {rest.map((art) => (
                          <Link
                            key={art.slug}
                            href={`/learn/${topic}/${art.slug}`}
                            className="group flex flex-col rounded-2xl border border-sand bg-cream p-5 transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-md"
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className="font-display text-sm font-bold tabular-nums"
                                style={{ color: accent }}
                              >
                                {String(numberOf.get(art.slug)).padStart(2, "0")}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <ReadBadge slug={art.slug} accent={accent} />
                                <span className="text-[11px] font-semibold text-stone">
                                  {art.readMinutes} min
                                </span>
                              </span>
                            </div>
                            <h3 className="mt-3 font-semibold leading-snug text-ink">
                              {art.title}
                            </h3>
                            <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                              {art.dek}
                            </p>
                            <span
                              className="mt-4 text-sm font-semibold underline decoration-2 underline-offset-4"
                              style={{ color: accent, textDecorationColor: `${accent}55` }}
                            >
                              Read
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Fallback: topic has no articles yet (roadmap from learnContent.path) */
        <section className="bg-paper">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Coming soon
            </h2>
            <div className="mt-8 space-y-10">
              {(content.path ?? []).map((group) => (
                <div key={group.level}>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                    style={{ background: `${accent}1a`, color: accent }}
                  >
                    {group.level}
                  </span>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item.title}
                        className="rounded-2xl border border-sand bg-cream/60 p-5"
                      >
                        <span className="rounded-full bg-amber/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-deep">
                          Coming soon
                        </span>
                        <h3 className="mt-3 font-semibold text-ink">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-stone">
                          {item.blurb}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related tool */}
      {content.tool && (
        <section className="bg-paper pb-4">
          <div className="mx-auto max-w-5xl px-6">
            <Link
              href={content.tool.href}
              className="group flex items-center gap-4 rounded-2xl border border-sand bg-cream p-6 transition-all hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-md"
            >
              <span
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${accent}1A`, color: accent }}
              >
                <Wrench className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone">
                  Put it into practice
                </p>
                <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">
                  {content.tool.label}
                </h3>
              </div>
              <ArrowRight className="h-5 w-5 text-stone transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      )}

      {/* Test your knowledge */}
      <section className="bg-paper py-14">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-forest p-8 text-cream sm:flex-row sm:items-center sm:p-10">
            <div className="max-w-lg">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber">
                <Sparkles className="h-4 w-4" />
                Test your knowledge
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                See how much you already know
              </h2>
              <p className="mt-2 text-base leading-7 text-cream/75">
                The 2-minute quiz checks where you stand on{" "}
                {meta.title.toLowerCase()} and points you to exactly what to read
                first.
              </p>
            </div>
            <Link
              href="/quiz"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-cream"
            >
              Take the quiz
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related topics */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Keep going
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {content.related.map((relId) => {
              const rel = getTopic(relId);
              return (
                <Link
                  key={relId}
                  href={rel.href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-sand bg-cream transition-all duration-200 hover:-translate-y-1 hover:border-ink/20 hover:shadow-lg"
                >
                  <div className="relative aspect-[5/3] overflow-hidden bg-sand">
                    <Image
                      src={rel.image}
                      alt=""
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-full border border-sand bg-cream shadow-md">
                      <TopicMark id={rel.id} className="h-7 w-7" />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold text-ink">
                      {rel.title}
                    </h3>
                    <span
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold"
                      style={{ color: rel.color }}
                    >
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-base font-semibold text-forest transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all topics
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
