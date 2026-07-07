import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseGrid, { type CourseCardData } from "@/components/CourseGrid";
import TopicMark from "@/components/TopicMark";
import { courses, getCourseFlashcards } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses | Empower — Economic Mobility Project",
  description:
    "Focused learning modules: a curated reading path, flashcards for every definition you meet, and a final quiz with a badge at the end.",
};

export default function CoursesPage() {
  const items: CourseCardData[] = courses.map((c) => ({
    id: c.id,
    title: c.title,
    goal: c.goal,
    description: c.description,
    color: c.color,
    articleSlugs: c.articleSlugs,
    cardCount: getCourseFlashcards(c).length,
    quizCount: c.finalQuiz.length,
  }));

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero — C: editorial maximal on a forest field */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <TopicMark
          id="college"
          color="#fbf8f1"
          className="pointer-events-none absolute -right-16 -top-12 h-[26rem] w-[26rem] opacity-[0.07]"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            Courses
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl">
            One goal <span className="italic text-amber">at a time.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-cream/75">
            Each module is a short, ordered reading path built around one real
            goal — sharper focus than the nine big topics. Read the guides,
            drill the flashcards, pass the final, earn the badge. Your progress
            saves on this device, no account needed.
          </p>
          <p className="mt-4 text-sm text-cream/60">
            Prefer to wander? The full{" "}
            <Link
              href="/learn"
              className="font-semibold text-cream underline decoration-amber decoration-2 underline-offset-4 hover:text-amber"
            >
              library
            </Link>{" "}
            is always open.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <CourseGrid items={items} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
