import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicMark from "@/components/TopicMark";
import JourneyPath, { type PathStage } from "@/components/JourneyPath";
import { journeys, getJourney } from "@/lib/journeys";
import { getArticleBySlug } from "@/lib/articles";
import { getTopic } from "@/lib/topics";
import { getCourse } from "@/lib/courses";
import { challenges } from "@/lib/challenges";

export function generateStaticParams() {
  return journeys.map((j) => ({ goal: j.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ goal: string }>;
}): Promise<Metadata> {
  const { goal } = await params;
  const j = getJourney(goal);
  if (!j) return { title: "Not Found | Empower" };
  return {
    title: `${j.title} — a guided path | Empower`,
    description: j.promise,
  };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ goal: string }>;
}) {
  const { goal } = await params;
  const journey = getJourney(goal);
  if (!journey) notFound();

  const topic = getTopic(journey.topic);

  // Resolve every stage item server-side so the client gets titles, not slugs.
  const stages: PathStage[] = journey.stages.map((s) => {
    const items: PathStage["items"] = [];
    for (const slug of s.articleSlugs) {
      const a = getArticleBySlug(slug);
      if (!a) continue;
      items.push({
        kind: "article",
        href: `/learn/${a.topicId}/${a.slug}`,
        title: a.title,
        meta: `${a.readMinutes} min read`,
        key: a.slug,
      });
    }
    if (s.tool)
      items.push({
        kind: "tool",
        href: s.tool.href,
        title: s.tool.label,
        meta: "Try it with your own numbers",
        key: s.tool.href,
      });
    if (s.courseId) {
      const c = getCourse(s.courseId);
      if (c)
        items.push({
          kind: "course",
          href: `/courses/${c.id}`,
          title: `Course: ${c.title}`,
          meta: `${c.articleSlugs.length} guides · flashcards · final + badge`,
          key: c.id,
        });
    }
    if (s.challengeId) {
      const ch = challenges.find((c) => c.id === s.challengeId);
      if (ch)
        items.push({
          kind: "challenge",
          href: `/challenges/${ch.id}`,
          title: `Challenge: ${ch.title}`,
          meta: "Do it, don't just read it",
          key: ch.id,
        });
    }
    if (s.topicQuiz)
      items.push({
        kind: "quiz",
        href: `/learn/${s.topicQuiz}/quiz`,
        title: "Checkpoint: 5-question quiz",
        meta: "Prove it to yourself",
        key: s.topicQuiz,
      });
    return { id: s.id, milestone: s.milestone, why: s.why, items };
  });

  const guideCount = journey.stages.reduce(
    (n, s) => n + s.articleSlugs.length,
    0
  );

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero — C voice on the journey's field */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <TopicMark
          id={journey.topic}
          color="#fbf8f1"
          className="pointer-events-none absolute -right-16 -top-10 h-[24rem] w-[24rem] opacity-[0.07]"
        />
        <div className="relative mx-auto max-w-4xl px-6 py-14 lg:py-20">
          <Link
            href="/journey"
            className="text-sm font-semibold text-cream/70 underline decoration-amber decoration-2 underline-offset-4 hover:text-cream"
          >
            ← All paths
          </Link>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-amber">
            A guided path
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            {journey.title}
            <span className="italic text-amber">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75 sm:text-xl">
            {journey.promise}
          </p>
          <p className="mt-4 text-sm text-cream/60">
            {journey.stages.length} milestones · {guideCount} guides · your
            progress saves on this device, no account needed.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
          <JourneyPath stages={stages} color={journey.color} />

          <div className="mt-14 rounded-2xl border border-sand bg-cream p-6 sm:p-7">
            <p className="font-display text-lg font-semibold text-ink">
              Want the wider view?
            </p>
            <p className="mt-1.5 text-sm leading-6 text-stone">
              This path is the guided lane through{" "}
              <Link
                href={topic.href}
                className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
              >
                {topic.title}
              </Link>
              . The full library is always there when you want to wander — and
              if this isn&apos;t the right goal,{" "}
              <Link
                href="/journey"
                className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
              >
                pick a different path
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
