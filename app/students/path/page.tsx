// The Your Path tab's own landing (July 17, 2026, owner: "the for students
// page subtabs should each have their own landing pages"). One page for
// everything that remembers where you are: the college journey, the
// course, the tracker, My Plan, and the skill tree. Student-native —
// layout provides StudentHeader; everything links in-frame.

import Link from "next/link";
import type { Metadata } from "next";
import {
  BookOpen,
  ClipboardText as ClipboardList,
  Compass,
  MapTrifold as Map,
  Sparkle as Sparkles,
} from "@phosphor-icons/react/dist/ssr";
import Footer from "@/components/Footer";
import HeroRecede from "@/components/HeroRecede";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Your Path | Empower — Economic Mobility Project",
  description:
    "Everything that remembers where you are: the pay-for-college path, the focused course, the student tracker, My Plan, and the skill tree. Progress saves on your device; an account is optional.",
};

const DOORS = [
  {
    href: "/students/journey/college",
    icon: Map,
    color: "text-amber",
    title: "Pay for college: the path",
    desc: "Ordered milestones from FAFSA to signing day, checking themselves off as you go.",
    lead: true,
  },
  {
    href: "/students/courses/paying-for-college",
    icon: BookOpen,
    color: "text-terracotta",
    title: "Paying for College (course)",
    desc: "The focused module: lessons, flashcards, a badge at the end.",
  },
  {
    href: "/students/tracker",
    icon: ClipboardList,
    color: "text-forest",
    title: "Student Tracker",
    desc: "Units, grades, GPA, and to-dos — for high school, community college, and university.",
  },
  {
    href: "/students/plan",
    icon: Compass,
    color: "text-forest",
    title: "My Plan",
    desc: "Five questions, one personal plan built from real guides and real deadlines.",
  },
  {
    href: "/students/skills",
    icon: Sparkles,
    color: "text-amber",
    title: "Your Skill Tree",
    desc: "Every guide, tool, and course on one map that lights up as you finish things.",
  },
];

export default function StudentPathPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="relative overflow-hidden border-b-2 border-ink bg-forest text-cream">
        <HeroRecede className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber">
            For Students · Your Path
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.07] tracking-tight sm:text-5xl">
            One step at a time,{" "}
            <span className="italic text-amber">remembered.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            These are the tools that keep track of where you are: paths with
            ordered milestones, a course with a badge at the end, a tracker
            for the semester, and a plan built around your answers. Progress
            saves on this device automatically; an account only adds syncing.
          </p>
        </HeroRecede>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOORS.map((d, i) => (
              <Reveal key={d.href} delay={i * 60} className="h-full">
                <Link
                  href={d.href}
                  className={
                    d.lead
                      ? "card-ink-lg group flex h-full flex-col rounded-2xl bg-forest p-6 text-cream transition-transform duration-200 hover:-translate-y-1"
                      : "card-ink group flex h-full flex-col rounded-2xl bg-cream p-6 transition-transform duration-200 hover:-translate-y-1"
                  }
                >
                  <d.icon className={`h-6 w-6 ${d.color}`} weight="bold" />
                  <h2
                    className={`mt-3 font-display text-xl font-bold leading-snug group-hover:underline group-hover:decoration-amber group-hover:decoration-2 group-hover:underline-offset-4 ${
                      d.lead ? "" : "text-ink"
                    }`}
                  >
                    {d.title}
                  </h2>
                  <p
                    className={`mt-1.5 flex-1 text-sm leading-6 ${
                      d.lead ? "text-cream/75" : "text-stone"
                    }`}
                  >
                    {d.desc}
                  </p>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={300} className="h-full">
              <div className="flex h-full flex-col justify-center rounded-2xl border-2 border-dashed border-ink/25 bg-paper-deep p-6">
                <p className="text-sm font-semibold leading-6 text-stone">
                  Not sure where to start?{" "}
                  <Link
                    href="/students/quiz"
                    className="text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                  >
                    The 2-minute quiz
                  </Link>{" "}
                  points you at a starting place, or browse{" "}
                  <Link
                    href="/students/journey"
                    className="text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                  >
                    all guided paths
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/students/courses"
                    className="text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                  >
                    all courses
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer frame="student" />
    </div>
  );
}
