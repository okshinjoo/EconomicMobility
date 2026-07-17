import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
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
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  if (!getCourse(course)) notFound();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* content column stacks above the fixed footer (curtain reveal) */}
      <div className="relative z-10 bg-paper">
      <CoursePageView courseId={course} frame="main" />
      </div>

      <CurtainFooter>
        <Footer />
      </CurtainFooter>
    </div>
  );
}
