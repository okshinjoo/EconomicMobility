// Student-frame mirror of every course (July 2026 full-containment pass):
// reading-path cards, flashcard glossary link, and final-quiz review links
// all stay inside the microsite. Canonical points at the main course page;
// the students layout provides StudentHeader.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import CoursePageView from "@/components/CoursePageView";
import { courses, getCourse } from "@/lib/courses";

export function generateStaticParams() {
  return courses.map((c) => ({ course: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string }>;
}): Promise<Metadata> {
  const { course } = await params;
  const found = getCourse(course);
  if (!found) return { title: "Not Found | Empower" };
  return {
    title: `${found.title} | Empower Courses`,
    description: found.goal,
    alternates: { canonical: `/courses/${course}` },
  };
}

export default async function StudentCoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  if (!getCourse(course)) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <CoursePageView courseId={course} frame="student" />
      <Footer />
    </div>
  );
}
