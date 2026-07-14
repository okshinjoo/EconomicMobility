import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { getTopic, type TopicId } from "@/lib/topics";
import { learnContent, guideCount, LEARN_UPDATED } from "@/lib/learnContent";
import { getTopicRoadmap } from "@/lib/articles";
import { getTopicSections } from "@/lib/topicSections";
import { ROADMAP_SET } from "@/lib/roadmaps";
import ReadOrderedGrid, { HideWhenRead } from "@/components/ReadOrderedGrid";
import { ReadBadge, TopicProgress } from "@/components/ReadBadge";
import TopicMark from "@/components/TopicMark";
import { frameHref, type Frame } from "@/lib/frame";

/**
 * The whole topic hub below the header, shared by /learn/[topic] and its
 * /students mirror (July 2026 full-containment pass). `frame` routes every
 * internal href through frameHref.
 */
export default function TopicPageView({
  topic,
  frame,
}: {
  topic: TopicId;
  frame: Frame;
}) {
  const href = (h: string) => frameHref(h, frame);
  const meta = getTopic(topic);
  const content = learnContent[topic];
  const accent = meta.color;
  const roadmap = getTopicRoadmap(topic);
  // Theme sections (lib/topicSections.ts) beat the level roadmap when the
  // topic defines them — same grid, editorial groups (owner ask, July 2026:
  // "some are more about admissions, some are more about finances").
  const sections = getTopicSections(topic);
  const groups = sections
    ? sections.map((s) => ({
        key: s.id,
        label: s.title,
        blurb: s.blurb as string | undefined,
        articles: s.articles,
      }))
    : roadmap.map((g) => ({
        key: g.level,
        label: g.label,
        blurb: undefined as string | undefined,
        articles: g.articles,
      }));
  const hasArticles = groups.length > 0;

  const allInOrder = groups.flatMap((g) => g.articles);
  const featured = allInOrder[0];
  const numberOf = new Map(allInOrder.map((a, i) => [a.slug, i + 1]));
  // The Start-here banner demotes into its group's grid once read - but only
  // when that group has other cards for it to join (else it stays put).
  const featuredCanDemote =
    (groups.find((g) => g.articles.some((a) => a.slug === featured?.slug))
      ?.articles.length ?? 0) > 1;

  return (
    <>

      {/* Hero — clean editorial with a ghost topic mark bleeding off the corner */}
      <section className="relative overflow-hidden bg-paper">
        <TopicMark
          id={meta.id}
          color={accent}
          className="pointer-events-none absolute -bottom-24 -left-24 h-[24rem] w-[24rem] opacity-[0.06]"
        />
        <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-8">
          <nav className="flex items-center gap-1.5 text-sm font-medium text-stone">
            <Link href={href("/learn")} className="transition-colors hover:text-ink">
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
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-bold text-ink/70">
                <span>{content.level}</span>
                <span className="text-stone/40">·</span>
                <span>{guideCount(topic)} guides</span>
                <span className="text-stone/40">·</span>
                <span className="font-medium text-stone">{LEARN_UPDATED}</span>
              </div>
            </div>
            <div className="card-ink relative order-first aspect-[5/4] overflow-hidden rounded-2xl bg-sand lg:order-last lg:rotate-[0.5deg]">
              <Image
                src={meta.image}
                alt=""
                fill
                unoptimized
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <span className="absolute bottom-4 left-4 flex h-16 w-16 items-center justify-center rounded-xl border-2 border-ink bg-cream">
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
          {/* Featured "Start here" article — B voice with a solid accent edge */}
          {featured && (
            <MaybeHideWhenRead
              slug={featured.slug}
              active={featuredCanDemote}
            >
            <section className="bg-paper">
              <div className="mx-auto max-w-5xl px-6 pt-12">
                <Link
                  href={href(`/learn/${topic}/${featured.slug}`)}
                  className="card-ink-lg group relative block overflow-hidden rounded-2xl bg-cream p-7 pl-10 transition-transform duration-200 hover:-translate-y-1 sm:p-9 sm:pl-12"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-3"
                    style={{ background: accent }}
                  />
                  <span
                    className="inline-block -rotate-2 rounded-md border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-[3px_3px_0_#11211c]"
                    style={{ background: accent, color: "#fbf8f1" }}
                  >
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
                      className="btn-ink inline-flex items-center rounded-md px-6 py-3 text-sm font-bold"
                      style={{ background: accent, color: "#fbf8f1" }}
                    >
                      Start reading
                    </span>
                    <span className="text-sm font-bold text-stone">
                      {featured.readMinutes} min read
                    </span>
                  </div>
                </Link>
              </div>
            </section>
            </MaybeHideWhenRead>
          )}

          {/* The full path — card grid by level */}
          <section className="bg-paper">
            <div className="mx-auto max-w-5xl px-6 py-14">
              {(() => {
                const topicRoadmapArticle = allInOrder.find(
                  (a) => ROADMAP_SET.has(a.slug) && a.slug !== featured?.slug
                );
                if (!topicRoadmapArticle) return null;
                return (
                  <HideWhenRead slug={topicRoadmapArticle.slug}>
                  <Link
                    href={href(`/learn/${topic}/${topicRoadmapArticle.slug}`)}
                    className="card-ink mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-6 py-4 transition-transform duration-200 hover:-translate-y-0.5 lg:-rotate-[0.3deg]"
                    style={{ background: `${accent}14` }}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="-rotate-2 rounded-md border-2 border-ink px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-cream shadow-[2px_2px_0_#11211c]"
                        style={{ background: accent }}
                      >
                        Roadmap
                      </span>
                      <span className="font-display text-lg font-semibold text-ink">
                        {topicRoadmapArticle.title}
                      </span>
                    </span>
                    <span className="text-sm font-semibold" style={{ color: accent }}>
                      The whole path, one page
                    </span>
                  </Link>
                  </HideWhenRead>
                );
              })()}
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {sections ? "The full library" : "The full path"}
              </h2>
              <p className="mt-1.5 text-sm text-stone">
                {allInOrder.length} guides,{" "}
                {sections
                  ? "grouped by what you're working on. Read in any order."
                  : "building from the basics up. Read in any order."}
                <TopicProgress
                  slugs={allInOrder.map((a) => a.slug)}
                  accent={accent}
                />
              </p>

              <div className="mt-9 space-y-12">
                {groups.map((group) => {
                  const rest = group.articles.filter(
                    (a) => a.slug !== featured?.slug
                  );
                  if (rest.length === 0) return null;
                  // Featured rides along hidden; it surfaces (at the bottom,
                  // read-chipped) once the banner above has bowed out.
                  const gridArticles = featuredCanDemote
                    ? group.articles
                    : rest;
                  return (
                    <div key={group.key}>
                      <div className="flex items-center gap-3">
                        <span
                          className="rounded-md border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-[2px_2px_0_#11211c]"
                          style={{ background: accent, color: "#fbf8f1" }}
                        >
                          {group.label}
                        </span>
                        <span className="h-px flex-1 bg-sand" />
                        <span className="text-xs font-medium text-stone">
                          {group.articles.length} guide
                          {group.articles.length > 1 ? "s" : ""}
                        </span>
                      </div>
                      {group.blurb && (
                        <p className="mt-2 text-sm leading-6 text-stone">
                          {group.blurb}
                        </p>
                      )}

                      <ReadOrderedGrid
                        className="mt-5 grid gap-4 sm:grid-cols-2"
                        items={gridArticles.map((art) => ({
                          slug: art.slug,
                          onlyWhenRead: art.slug === featured?.slug,
                          node: (
                          <Link
                            key={art.slug}
                            href={href(`/learn/${topic}/${art.slug}`)}
                            className="group flex h-full flex-col rounded-2xl border border-sand bg-cream p-5 transition-all duration-200 hover:-translate-y-1 hover:border-ink/15 hover:shadow-md"
                          >
                            <div className="flex items-center justify-between">
                              <span
                                className="font-display text-sm font-bold tabular-nums"
                                style={{ color: accent }}
                              >
                                {String(numberOf.get(art.slug)).padStart(2, "0")}
                              </span>
                              <span className="flex items-center gap-1.5">
                                {ROADMAP_SET.has(art.slug) && (
                                  <span
                                    className="rounded-md border-2 border-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cream"
                                    style={{ background: accent }}
                                  >
                                    Roadmap
                                  </span>
                                )}
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
                          ),
                        }))}
                      />
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
                    className="rounded-md border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-[2px_2px_0_#11211c]"
                    style={{ background: accent, color: "#fbf8f1" }}
                  >
                    {group.level}
                  </span>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item.title}
                        className="rounded-2xl border border-sand bg-cream/60 p-5"
                      >
                        <span className="rounded-md bg-amber/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-deep">
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
              href={href(content.tool.href)}
              className="card-ink group flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-cream p-6 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone">
                  Put it into practice
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                  {content.tool.label}
                </h3>
              </div>
              <span
                className="text-sm font-semibold underline decoration-2 underline-offset-4"
                style={{ color: accent, textDecorationColor: `${accent}55` }}
              >
                Open the tool
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Test your knowledge */}
      <section className="bg-paper py-14">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border-2 border-ink bg-forest p-8 text-cream shadow-[7px_7px_0_#e7a33c] sm:flex-row sm:items-center sm:p-10">
            <div className="max-w-lg">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber">
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
              href={href("/quiz")}
              className="inline-flex flex-shrink-0 items-center rounded-md bg-amber px-7 py-3.5 text-base font-bold text-ink transition-colors hover:bg-cream"
            >
              Take the quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Related topics — B-voice cards, one tilted */}
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Keep going
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {content.related.map((relId, i) => {
              const rel = getTopic(relId);
              return (
                <Link
                  key={relId}
                  href={href(rel.href)}
                  className={`card-ink group flex flex-col overflow-hidden rounded-2xl bg-cream transition-transform duration-200 hover:-translate-y-1 ${
                    i === 1 ? "lg:rotate-[0.5deg]" : ""
                  }`}
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
                      className="mt-2 inline-block text-sm font-semibold underline decoration-2 underline-offset-4"
                      style={{ color: rel.color, textDecorationColor: `${rel.color}55` }}
                    >
                      Explore
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10">
            <Link
              href={href("/learn")}
              className="text-base font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-ink"
            >
              Back to all topics
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}

/** Applies HideWhenRead only when the demote behavior is active. */
function MaybeHideWhenRead({
  slug,
  active,
  children,
}: {
  slug: string;
  active: boolean;
  children: React.ReactNode;
}) {
  if (!active) return <>{children}</>;
  return <HideWhenRead slug={slug}>{children}</HideWhenRead>;
}
