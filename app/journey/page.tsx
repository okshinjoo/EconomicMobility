import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicMark from "@/components/TopicMark";
import JourneyIndex, {
  type JourneyCardData,
  type IndexStep,
} from "@/components/JourneyIndex";
import { journeys, journeyByTopic } from "@/lib/journeys";

export const metadata: Metadata = {
  title: "Your Path | Empower — Economic Mobility Project",
  description:
    "Pick a money goal and follow a guided path: ordered milestones, the right guides at the right time, and a clear next step — no account needed.",
};

export default function JourneyIndexPage() {
  const items: JourneyCardData[] = journeys.map((j) => {
    const steps: IndexStep[] = [];
    const stageSizes: number[] = [];
    for (const s of j.stages) {
      let size = 0;
      for (const slug of s.articleSlugs) {
        steps.push({ kind: "article", key: slug });
        size++;
      }
      if (s.tool) {
        steps.push({ kind: "tool", key: s.tool.href });
        size++;
      }
      if (s.courseId) {
        steps.push({ kind: "course", key: s.courseId });
        size++;
      }
      if (s.challengeId) {
        steps.push({ kind: "challenge", key: s.challengeId });
        size++;
      }
      if (s.topicQuiz) {
        steps.push({ kind: "quiz", key: s.topicQuiz });
        size++;
      }
      stageSizes.push(size);
    }
    return {
      id: j.id,
      title: j.title,
      promise: j.promise,
      color: j.color,
      stageCount: j.stages.length,
      guideCount: j.stages.reduce((n, s) => n + s.articleSlugs.length, 0),
      steps,
      milestones: j.stages.map((s) => s.milestone),
      stageSizes,
      quizTopics: Object.entries(journeyByTopic)
        .filter(([, jid]) => jid === j.id)
        .map(([topic]) => topic),
    };
  });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero — C: editorial maximal */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <TopicMark
          id="budgeting"
          color="#fbf8f1"
          className="pointer-events-none absolute -right-16 -top-12 h-[26rem] w-[26rem] opacity-[0.07]"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            Your path
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
            Don&apos;t browse.{" "}
            <span className="italic text-amber">Follow a path.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-cream/75">
            Pick the goal, and we&apos;ll walk you there: ordered milestones,
            the right guide at the right moment, a calculator when it&apos;s
            time to run your numbers, and a clear next step every time you come
            back. Progress saves on this device — no account needed.
          </p>
          <p className="mt-4 text-sm text-cream/60">
            Not sure which goal?{" "}
            <Link
              href="/quiz"
              className="font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              Take the 3-minute quiz
            </Link>{" "}
            and we&apos;ll point you at one.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <JourneyIndex items={items} />
          <p className="mt-10 text-sm text-stone">
            Every path is built from the same free library — a path just puts
            it in the right order. Prefer to wander? Head to{" "}
            <Link
              href="/learn"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              the library
            </Link>{" "}
            or{" "}
            <Link
              href="/life"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              start from a life moment
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
