import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TopicMark from "@/components/TopicMark";
import TopicQuiz, { type TopicQuizItem } from "@/components/TopicQuiz";
import { getTopicQuiz } from "@/lib/topicQuizzes";
import { getArticleBySlug } from "@/lib/articles";
import { getTopic, type TopicId } from "@/lib/topics";
import { frameHref, type Frame } from "@/lib/frame";

/**
 * The topic mini-quiz page below the header, shared by /learn/[topic]/quiz
 * and its /students mirror (July 2026 full-containment pass). Review links
 * resolve server-side and route through frameHref.
 */
export default function TopicQuizPageView({
  topic,
  frame,
}: {
  topic: TopicId;
  frame: Frame;
}) {
  const href = (h: string) => frameHref(h, frame);
  const t = getTopic(topic);
  const questions = getTopicQuiz(topic);
  if (!questions) notFound();

  // Resolve review links server-side so the client gets titles, not slugs.
  const items: TopicQuizItem[] = questions.map((q) => {
    const src = getArticleBySlug(q.sourceSlug);
    return {
      question: q.question,
      options: q.options,
      answer: q.answer,
      explain: q.explain,
      reviewHref: href(src ? `/learn/${src.topicId}/${src.slug}` : t.href),
      reviewTitle: src ? src.title : `the ${t.short} guides`,
    };
  });

  return (
    <main>
      {/* Hero-lite in the topic's accent */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-paper-deep">
        <TopicMark
          id={topic}
          color={t.color}
          className="pointer-events-none absolute -right-10 -top-8 h-56 w-56 opacity-[0.08]"
        />
        <div className="relative mx-auto max-w-3xl px-6 py-12 lg:py-16">
          <nav>
            <Link
              href={href(t.href)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              All {t.short.toLowerCase()} guides
            </Link>
          </nav>
          <span
            className="mt-6 inline-block -rotate-2 rounded-lg border-2 border-ink bg-cream px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-[3px_3px_0_#11211c]"
          >
            Mini quiz
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            How solid is your{" "}
            <span className="italic" style={{ color: t.color }}>
              {t.short.toLowerCase()}
            </span>
            ?
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-stone">
            Five questions pulled from across the guides. Wrong answers
            aren&apos;t a problem here; each one links you straight to the
            guide that covers it.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-10 lg:py-14">
          <TopicQuiz topicId={topic} questions={items} accent={t.color} />

          <p className="mt-8 text-sm leading-6 text-stone">
            Want the questions to feel easy? Read the{" "}
            <Link
              href={href(t.href)}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              {t.short} guides
            </Link>{" "}
            in order and come back.
          </p>
        </div>
      </section>
    </main>
  );
}
