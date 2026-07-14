import Link from "next/link";
import { ClipboardList } from "lucide-react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import StudentTracker from "@/components/StudentTracker";

export const metadata: Metadata = {
  title: "Student Tracker | Empower — Economic Mobility Project",
  description:
    "Track your courses, units, grades, and to-dos, with money math for your track: college credits banked in high school, the 60-unit transfer mark, or your degree target.",
};

export default function StudentTrackerPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">

      {/* Hero — forest field: the scoreboard wears the brand color */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-forest text-cream">
        <ClipboardList
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-8 h-80 w-80 opacity-[0.08]"
          strokeWidth={1}
        />
        <div className="relative mx-auto max-w-5xl px-6 pb-12 pt-12">
          <nav className="text-sm font-medium text-cream/70">
            <Link
              href="/students"
              className="underline decoration-amber decoration-2 underline-offset-4 hover:text-cream"
            >
              For Students
            </Link>{" "}
            / Tracker
          </nav>
          <span className="mt-5 inline-block -rotate-1 rounded-md border-2 border-ink bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-[3px_3px_0_#11211c]">
            Three tracks · HS · CC · University
          </span>
          <h1 className="mt-4 font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight sm:text-6xl">
            Every unit, <span className="italic text-amber">counted.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/80">
            Your courses, units, grades, and the little tasks between them,
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
