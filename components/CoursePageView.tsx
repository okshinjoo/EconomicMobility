import Link from "next/link";
import { notFound } from "next/navigation";
import Flashcards from "@/components/Flashcards";
import CourseQuiz from "@/components/CourseQuiz";
import { ReadBadge } from "@/components/ReadBadge";
import { getCourse, getCourseArticles, getCourseFlashcards } from "@/lib/courses";
import { frameHref, type Frame } from "@/lib/frame";

/**
 * The whole course page below the header, shared by /courses/[course] and
 * its /students mirror (July 2026 full-containment pass).
 */
export default function CoursePageView({
  courseId,
  frame,
}: {
  courseId: string;
  frame: Frame;
}) {
  const href = (h: string) => frameHref(h, frame);
  const found = getCourse(courseId);
  if (!found) notFound();

  const articles = getCourseArticles(found);
  const cards = getCourseFlashcards(found);
  const accent = found.color;
  // The hero kicker is amber — except on the gold course color, where amber
  // would melt into the field; cream keeps it readable there.
  const kickerClass =
    accent.toLowerCase() === "#c9842a" ? "text-cream/85" : "text-amber";
  const articleRefs = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    href: href(`/learn/${a.topicId}/${a.slug}`),
  }));
  const totalMinutes = articles.reduce((sum, a) => sum + a.readMinutes, 0);

  return (
    <>

      {/* Hero — A: a solid field of the course's own color */}
      <section className="text-cream" style={{ backgroundColor: accent }}>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
          <nav className="text-sm text-cream/70">
            <Link
              href={href("/courses")}
              className="hover:text-cream hover:underline"
            >
              Courses
            </Link>{" "}
            <span aria-hidden>›</span>{" "}
            <span className="font-medium text-cream">{found.title}</span>
          </nav>
          <span
            className={`mt-8 block text-sm font-bold uppercase tracking-[0.25em] ${kickerClass}`}
          >
            Learning module
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[1.02] tracking-tight sm:text-6xl">
            {found.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg font-semibold text-cream/90">
            {found.goal}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-cream/75">
            {found.description}
          </p>
          <p className="mt-6 text-sm font-medium text-cream/70">
            {articles.length} guides · about {totalMinutes} minutes of reading
            · {cards.length} flashcards · {found.finalQuiz.length}-question
            final
          </p>
        </div>
      </section>

      {/* Reading path */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-14">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            The reading path
          </h2>
          <p className="mt-1.5 text-sm text-stone">
            In order — each guide builds on the one before it.
          </p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a, i) => (
              <li key={a.slug}>
                <Link
                  href={href(`/learn/${a.topicId}/${a.slug}`)}
                  className="card-ink group flex h-full flex-col rounded-2xl bg-cream p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display text-sm font-bold tabular-nums"
                      style={{ color: accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ReadBadge slug={a.slug} accent={accent} />
                      <span className="text-[11px] font-semibold text-stone">
                        {a.readMinutes} min
                      </span>
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug text-ink">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-6 text-stone">
                    {a.dek}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Flashcards — tinted in the course's own color */}
      <section
        className="border-y-2 border-ink"
        style={{ background: `${accent}0d` }}
      >
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Flashcards
              </h2>
              <p className="mt-3 text-base leading-7 text-stone">
                Every definition you&apos;ll meet in this module&apos;s guides,
                pulled straight from the{" "}
                <Link
                  href={href("/glossary")}
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  glossary
                </Link>
                . Flip through before the final — if a term feels fuzzy, the
                guide it came from is one click back up the page.
              </p>
            </div>
            <Flashcards cards={cards} accent={accent} deckId={found.id} />
          </div>
        </div>
      </section>

      {/* Final quiz */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-12 lg:py-14">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            The final
          </h2>
          <p className="mt-1.5 mb-6 text-sm text-stone">
            Pass it and the {found.title} badge is yours.
          </p>
          <div className="card-ink-lg overflow-hidden rounded-2xl empty:hidden">
            <CourseQuiz
              courseId={found.id}
              courseTitle={found.title}
              questions={found.finalQuiz}
              accent={accent}
              articles={articleRefs}
            />
          </div>
        </div>
      </section>

    </>
  );
}
