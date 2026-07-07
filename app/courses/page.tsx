import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseGrid, { type CourseCardData } from "@/components/CourseGrid";
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

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            Courses
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            One goal at a time.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone">
            Each module is a short, ordered reading path built around one real
            goal — sharper focus than the nine big topics. Read the guides,
            drill the flashcards, pass the final, earn the badge. Your progress
            saves on this device, no account needed.
          </p>
          <p className="mt-4 text-sm text-stone">
            Prefer to wander? The full{" "}
            <Link
              href="/learn"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
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
