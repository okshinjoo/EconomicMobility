import type { CSSProperties } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Clock, Wrench, BookMarked } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleBody from "@/components/ArticleBody";
import ArticleToc from "@/components/ArticleToc";
import ReadingProgress from "@/components/ReadingProgress";
import MarkAsRead from "@/components/MarkAsRead";
import TopicQuizCard from "@/components/TopicQuizCard";
import {
  QuizPromo,
  RoadmapPathCard,
  RelatedArticles,
  type RelatedItem,
} from "@/components/ArticleFollowUps";
import ArticleQuiz from "@/components/ArticleQuiz";
import { getTopic, topics, type TopicId } from "@/lib/topics";
import { learnContent, LEARN_UPDATED } from "@/lib/learnContent";
import { allArticles, getArticle, getArticleBySlug, getRoadmapRefs } from "@/lib/articles";
import { extractHeadings } from "@/lib/articles/headings";
import { articleTools } from "@/lib/articleTools";
import { getTopicQuiz } from "@/lib/topicQuizzes";

function isTopicId(value: string): value is TopicId {
  return topics.some((t) => t.id === value);
}

export function generateStaticParams() {
  return allArticles.map((a) => ({ topic: a.topicId, article: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string; article: string }>;
}): Promise<Metadata> {
  const { topic, article } = await params;
  if (!isTopicId(topic)) return { title: "Not Found | Empower" };
  const found = getArticle(topic, article);
  if (!found) return { title: "Not Found | Empower" };
  return {
    title: `${found.title} | Empower — Economic Mobility Project`,
    description: found.dek,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ topic: string; article: string }>;
}) {
  const { topic, article } = await params;
  if (!isTopicId(topic)) notFound();
  const found = getArticle(topic, article);
  if (!found) notFound();

  const meta = getTopic(topic);
  const accent = meta.color;
  const tool = articleTools[found.slug] ?? learnContent[topic].tool;
  // This topic's roadmap article, for the "part of a path" banner below.
  const roadmapRef = getRoadmapRefs().find(
    (r) => r.topicId === topic && r.slug !== found.slug
  );
  const hasTopicQuiz = Boolean(getTopicQuiz(topic));
  const headings = extractHeadings(found.body);
  const related = (found.related ?? [])
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Amber, not the topic accent — green topics would vanish on the green header. */}
      <ReadingProgress />
      <MarkAsRead slug={found.slug} />
      <Header />

      <article className="bg-paper">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-10 px-6 py-12 xl:grid-cols-[11rem_minmax(0,1fr)]">
          {/* Table of contents — pushed into the left margin on desktop */}
          <aside className="hidden xl:block">
            <div className="sticky top-28">
              <ArticleToc headings={headings} accent={accent} />
            </div>
          </aside>

          {/* Article column, centered in the remaining space */}
          <div className="xl:flex xl:justify-center">
            <div
              id="article-content"
              className="w-full max-w-[44rem]"
              style={{ "--article-accent": accent } as CSSProperties}
            >
              <nav className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-stone">
                <Link href="/learn" className="transition-colors hover:text-ink">
                  Learn
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link
                  href={meta.href}
                  className="transition-colors hover:text-ink"
                >
                  {meta.title}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-ink">{found.title}</span>
              </nav>

              {/* Header */}
              <div className="relative pt-8">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 56 56"
                  className="pointer-events-none absolute right-0 top-6 hidden h-14 w-14 opacity-25 sm:block"
                  style={{ color: accent }}
                >
                  <g fill="currentColor">
                    {[6, 22, 38, 54].map((y) =>
                      [6, 22, 38, 54].map((x) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" />
                      ))
                    )}
                  </g>
                </svg>

                <div className="flex items-center gap-3">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ background: `${accent}1A`, color: accent }}
                  >
                    <meta.icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <Link
                    href={meta.href}
                    className="text-sm font-bold uppercase tracking-[0.1em] transition-opacity hover:opacity-70"
                    style={{ color: accent }}
                  >
                    {meta.title}
                  </Link>
                </div>

                <h1 className="mt-6 font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-[3.1rem]">
                  {found.title}
                </h1>
                <p className="article-lead mt-5 text-xl leading-[1.5] text-ink/75 sm:text-[1.4rem]">
                  {found.dek}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-sand pb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-cream">
                      E
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      Empower Editorial Team
                    </span>
                  </div>
                  <span className="hidden h-4 w-px bg-sand sm:block" />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-stone">
                    <span className="font-semibold" style={{ color: accent }}>
                      {found.level}
                    </span>
                    <span className="text-sand">•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {found.readMinutes} min read
                    </span>
                    <span className="text-sand">•</span>
                    <span>{LEARN_UPDATED}</span>
                  </div>
                </div>
              </div>

              {/* What you'll learn */}
              <div
                className="mt-8 rounded-2xl border-l-4 bg-cream p-6"
                style={{ borderColor: accent }}
              >
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-ink">
                  <BookMarked className="h-4 w-4" style={{ color: accent }} />
                  What you&apos;ll learn
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {found.takeaways.map((t, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-base leading-7 text-ink"
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: accent }}
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body */}
              <div className="pt-2">
                <ArticleBody blocks={found.body} accent={accent} />
                {found.quiz && found.quiz.length > 0 && (
                  <ArticleQuiz
                    slug={found.slug}
                    questions={found.quiz}
                    accent={accent}
                  />
                )}
                <p className="mt-10 border-t border-sand pt-5 text-sm text-stone">
                  Hover or tap a{" "}
                  <span className="font-medium text-forest underline decoration-forest/40 decoration-dotted underline-offset-2">
                    highlighted word
                  </span>{" "}
                  for a quick definition, or browse the full{" "}
                  <Link
                    href="/glossary"
                    className="font-semibold text-forest underline decoration-dotted underline-offset-2 hover:text-amber-deep"
                  >
                    glossary
                  </Link>
                  .
                </p>
              </div>

              {/* Test your knowledge — hides itself once the quiz is taken */}
              <QuizPromo />

              {/* Topic mini quiz — above the other suggestions on purpose */}
              {hasTopicQuiz && (
                <TopicQuizCard
                  topicId={topic}
                  topicShort={meta.short}
                  accent={accent}
                />
              )}

              {/* Tool cross-link */}
              {tool && (
                <Link
                  href={tool.href}
                  className="group flex items-center gap-4 rounded-2xl border border-sand bg-cream p-6 transition-colors hover:border-ink/20"
                >
                  <span
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${accent}1A`, color: accent }}
                  >
                    <Wrench className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone">
                      Try it yourself
                    </p>
                    <h3 className="mt-0.5 font-display text-lg font-semibold text-ink">
                      {tool.label}
                    </h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-stone transition-transform group-hover:translate-x-1" />
                </Link>
              )}

              {/* Roadmap cross-link — hides itself once the roadmap is read */}
              {roadmapRef && (
                <RoadmapPathCard
                  href={roadmapRef.href}
                  title={roadmapRef.title}
                  slug={roadmapRef.slug}
                  accent={accent}
                />
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related articles — already-read guides drop out client-side */}
      {related.length > 0 && (
        <RelatedArticles
          items={related.map((rel): RelatedItem => {
            const relTopic = getTopic(rel.topicId);
            return {
              slug: rel.slug,
              href: `/learn/${rel.topicId}/${rel.slug}`,
              kicker: relTopic.title,
              color: relTopic.color,
              title: rel.title,
            };
          })}
          backHref={meta.href}
          backLabel={`All ${meta.title} guides`}
        />
      )}

      <Footer />
    </div>
  );
}
