import Link from "next/link";
import ScrollDrift from "@/components/ScrollDrift";
import HeroRecede from "@/components/HeroRecede";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { ReadBadge } from "@/components/ReadBadge";
import ReadOrderedGrid from "@/components/ReadOrderedGrid";
import TopicMark from "@/components/TopicMark";
import { topics, getTopic } from "@/lib/topics";
import { guideCount, learnContent } from "@/lib/learnContent";
import { getTopicRoadmap, getArticleBySlug } from "@/lib/articles";
import { ROADMAP_SLUGS } from "@/lib/roadmaps";
import { glossary } from "@/lib/glossary";
import TermOfTheDay from "@/components/TermOfTheDay";
import { frameHref, type Frame } from "@/lib/frame";
import HeadlineRise from "@/components/HeadlineRise";


// The four guides we'd hand someone first, whatever their situation —
// same canon as the homepage question strip.
const START_HERE_SLUGS = [
  "your-first-paycheck",
  "build-credit-from-zero",
  "fafsa-step-by-step",
  "filing-taxes-first-time",
];

const FEATURED_ROADMAP = "money-order-of-operations";

/**
 * The whole learn hub below the header, shared by /learn and its /students
 * mirror (July 2026 full-containment pass). `frame` routes every internal
 * href through frameHref.
 */
export default function LearnHubView({ frame }: { frame: Frame }) {
  const href = (h: string) => frameHref(h, frame);
  const totalGuides = topics.reduce((sum, t) => sum + guideCount(t.id), 0);

  const starters = START_HERE_SLUGS.map((slug) => getArticleBySlug(slug))
    .filter((a): a is NonNullable<ReturnType<typeof getArticleBySlug>> =>
      Boolean(a)
    );

  const featuredRoadmap = getArticleBySlug(FEATURED_ROADMAP) ?? null;
  const otherRoadmaps = ROADMAP_SLUGS.filter((s) => s !== FEATURED_ROADMAP)
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is NonNullable<ReturnType<typeof getArticleBySlug>> =>
      Boolean(a)
    );

  return (
    <>

      {/* Hero — light editorial (Base44 learn-page structure, our skin) */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-forest text-cream">
        {/* ONE ghost per hero: the static budgeting whisper that predated
            the living treatment sat in this same corner and doubled up with
            the drifting mark (owner caught it July 17) — removed. */}
        <ScrollDrift range={62} driftX={-26} rotate={5}>
          <TopicMark
            id="taxes"
            color="#fbf8f1"
            className="pointer-events-none absolute -right-14 -top-10 h-[24rem] w-[24rem] opacity-[0.16]"
          />
        </ScrollDrift>
        <HeroRecede className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-12 pt-14 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber">
            The Library
          </span>
          <h1 className="mt-4 font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[1.05] tracking-tight sm:text-6xl">
            Learn money,{" "}
            <span className="relative whitespace-nowrap text-amber">
              {/* Letter-by-letter blur-lift (owner call, July 16). */}
              <HeadlineRise chars>your way.</HeadlineRise>
              <svg
                aria-hidden="true"
                viewBox="0 0 300 18"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-amber"
                preserveAspectRatio="none"
              >
                <path
                  d="M3,13 C60,4 120,4 160,9 C210,15 260,8 297,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            Nine core topics, each built as a clear path from the absolute
            basics to the stuff that takes you further. Start anywhere, or
            let the quiz pick for you.
          </p>
          <p className="mt-4 text-sm font-semibold text-cream/70">
            {totalGuides} free guides · {topics.length} topics · No sign-up,
            no paywall
          </p>
          <p className="mt-4 text-sm font-semibold text-cream">
            Not sure where to start?{" "}
            <Link
              href={href("/quiz")}
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              Take the 2-minute quiz
            </Link>
            .
          </p>
          </div>

          {/* Sticker-tile topic launcher — the old hero's beloved 3x3, back
              in miniature. A couple of tiles sit slightly crooked on
              purpose. */}
          <div className="grid w-full max-w-sm grid-cols-3 gap-2.5 lg:w-auto">
            {topics.map((t, i) => (
              <Reveal key={t.id} delay={i * 45}>
                <Link
                  href={href(t.href)}
                  className={`group flex flex-col items-center gap-1.5 rounded-xl px-3 py-3.5 text-center transition-transform duration-200 hover:-translate-y-1 ${
                    i === 2 ? "rotate-[1.2deg]" : i === 6 ? "-rotate-[1.2deg]" : ""
                  }`}
                  style={{
                    background: `color-mix(in srgb, ${t.color} 14%, #fbf8f1)`,
                  }}
                >
                  <TopicMark
                    id={t.id}
                    className="h-7 w-7 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="text-[11px] font-bold leading-tight text-ink">
                    {t.short}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </HeroRecede>
      </section>

      {/* The full library — horizontal topic rows, photos alternating sides */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            The full library
          </span>
          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {topics.map((topic, i) => {
              const content = learnContent[topic.id];
              const first = getTopicRoadmap(topic.id)[0]?.articles[0];
              const photoRight = i % 2 === 1;
              return (
                <Reveal key={topic.id} delay={(i % 2) * 70}>
                  <div
                    className={`card-ink group relative flex h-full items-stretch gap-4 overflow-hidden rounded-xl p-4 transition-transform duration-200 hover:-translate-y-0.5 ${
                      photoRight ? "flex-row-reverse" : ""
                    }`}
                    style={{
                      background: `color-mix(in srgb, ${topic.color} 12%, #fbf8f1)`,
                    }}
                  >
                    <div className="relative hidden w-28 shrink-0 overflow-hidden rounded-lg bg-sand sm:block">
                      <Image
                        src={topic.image}
                        alt=""
                        fill
                        unoptimized
                        sizes="112px"
                        className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="flex min-w-0 items-center gap-2.5">
                          <TopicMark
                            id={topic.id}
                            className="h-6 w-6 shrink-0 self-center transition-transform duration-200 group-hover:scale-110"
                          />
                        <h2 className="font-display text-lg font-bold leading-snug text-ink">
                          <Link
                            href={href(topic.href)}
                            className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4"
                            style={{ textDecorationColor: topic.color }}
                          >
                            {topic.title}
                          </Link>
                        </h2>
                        </span>
                        <span
                          aria-hidden
                          className="shrink-0 font-display text-xl font-bold text-ink/15"
                        >
                          {guideCount(topic.id)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-stone">
                        {content.subhead}
                      </p>
                      {first && (
                        <p className="mt-2 text-xs font-semibold">
                          <span className="text-ink/60">Start with: </span>
                          <Link
                            href={href(`/learn/${topic.id}/${first.slug}`)}
                            className="relative z-10 underline decoration-2 underline-offset-4 hover:text-ink"
                            style={{
                              color: topic.color,
                              textDecorationColor: `${topic.color}55`,
                            }}
                          >
                            {first.title}
                          </Link>
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Start here — the four guides we'd hand you first */}
      {starters.length > 0 && (
        <section className="border-y-2 border-ink bg-amber">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <span className="inline-block -rotate-1 rounded-lg border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
              Start here
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Four guides we&apos;d hand you first
            </h2>
            <p className="mt-2 text-base font-medium leading-7 text-ink/75">
              Whatever your situation, one of these is probably the right
              first read.
            </p>
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {starters.map((a, i) => {
                const topic = getTopic(a.topicId);
                return (
                  <Reveal key={a.slug} delay={i * 70} className="h-full">
                    <Link
                      href={href(`/learn/${a.topicId}/${a.slug}`)}
                      className={`card-ink group flex h-full flex-col overflow-hidden rounded-xl bg-cream transition-transform duration-200 hover:-translate-y-1 ${
                        i === 1
                          ? "lg:rotate-[0.5deg]"
                          : i === 3
                            ? "lg:-rotate-[0.5deg]"
                            : ""
                      }`}
                    >
                      <div className="relative aspect-[16/9] overflow-hidden bg-sand">
                        <Image
                          src={topic.image}
                          alt=""
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.04]"
                        />
                        <span className="absolute bottom-2.5 left-2.5 flex h-11 w-11 items-center justify-center rounded-full border border-sand bg-cream shadow-md">
                          <TopicMark id={a.topicId} className="h-6 w-6" />
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <span
                          className="text-[11px] font-bold uppercase tracking-wide"
                          style={{ color: topic.color }}
                        >
                          {topic.short}
                        </span>
                        <h3 className="mt-1.5 flex-1 font-display text-base font-bold leading-snug text-ink group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                          {a.title}
                        </h3>
                        <span className="mt-3 text-xs font-medium text-stone">
                          {a.readMinutes} min read
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Roadmaps — featured banner + the rest as simple rows */}
      <section id="roadmaps" className="scroll-mt-20 bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Roadmaps
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Not sure what order to do things in?
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-7 text-stone">
            These guides don&apos;t teach a topic. They hand you the map and
            point at the next step.
          </p>

          {featuredRoadmap && (
            <Reveal>
              <Link
                href={href(`/learn/${featuredRoadmap.topicId}/${featuredRoadmap.slug}`)}
                className="mt-7 block rounded-2xl border-2 border-ink bg-forest p-7 text-cream shadow-[6px_6px_0_#e7a33c] transition-transform duration-200 hover:-translate-y-1 sm:p-8"
              >
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
                  Featured roadmap
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                  {featuredRoadmap.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-cream/75">
                  {featuredRoadmap.dek}
                </p>
              </Link>
            </Reveal>
          )}

          <ReadOrderedGrid
            className="mt-4 grid gap-3 sm:grid-cols-2"
            items={otherRoadmaps.map((a, i) => ({
              slug: a.slug,
              node: (
                <Reveal key={a.slug} delay={(i % 2) * 60} className="h-full">
                  <Link
                    href={href(`/learn/${a.topicId}/${a.slug}`)}
                    className="card-ink flex h-full items-center gap-3 rounded-xl px-4 py-3.5 transition-transform duration-200 hover:-translate-y-0.5"
                    style={{
                      background: `color-mix(in srgb, ${getTopic(a.topicId).color} 10%, #fbf8f1)`,
                    }}
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
              Every term the guides use is defined in plain English, and
              inside any guide, the first mention of a term shows its
              definition right where you&apos;re reading. Hit a word you
              don&apos;t know anywhere else? Look it up in seconds.
            </p>
            <Link
              href={href("/glossary")}
              className="mt-5 inline-block font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              Open the glossary
            </Link>
          </div>
          <TermOfTheDay frame={frame} />
        </div>
      </section>

    </>
  );
}
