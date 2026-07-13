import Link from "next/link";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import StudentTracker from "@/components/StudentTracker";

export const metadata: Metadata = {
  title: "Student Tracker | Empower — Economic Mobility Project",
  description:
    "Track your courses, units, grades, and to-dos — with money math for your track: college credits banked in high school, the 60-unit transfer mark, or your degree target.",
};

export default function StudentTrackerPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">

      {/* Hero — compact, light */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 pb-10 pt-12">
          <nav className="text-sm font-medium text-stone">
            <Link
              href="/students"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              For Students
            </Link>{" "}
            / Tracker
          </nav>
          <h1 className="mt-4 font-display text-[2.4rem] font-bold leading-[1.07] tracking-tight text-ink sm:text-5xl">
            Every unit,{" "}
            <span className="relative whitespace-nowrap text-forest">
              counted.
              <svg
                aria-hidden="true"
                viewBox="0 0 300 18"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-amber"
                preserveAspectRatio="none"
              >
                <path
                  d="M3,13 C60,4 120,4 160,9 C210,15 260,8 297,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone">
            Your courses, units, grades, and the little tasks between them —
            with the money math for <em>your</em> track. In high school:
            the college credits you&apos;re banking early. At community
            college: the 60-unit transfer mark and the dollars you never pay
            twice. At university: your degree target and the terms left on
            the bill.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <StudentTracker />
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
