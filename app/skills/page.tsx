// The Skill Tree (July 16, 2026, owner ask: "a way to see how much progress
// you made and where you can be heading next"). Nine topic branches, every
// node derived live from the existing trackers — nothing new stored, works
// signed-out, syncs with accounts automatically. See lib/skillTree.ts.

import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import HeadlineRise from "@/components/HeadlineRise";
import ScrollDissolve from "@/components/ScrollDissolve";
import SkillTree from "@/components/SkillTree";
import { buildSkillTree } from "@/lib/skillTree";

export const metadata: Metadata = {
  title: "Your Skill Tree | Empower — Economic Mobility Project",
  description:
    "Every money skill on one map: nine branches of guides, checkpoint quizzes, courses, and tools that light up as you learn — and always show your next step.",
};

export default function SkillsPage() {
  const data = buildSkillTree();
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />


      {/* content column stacks above the fixed footer (curtain reveal) */}

      <div className="relative z-10 bg-paper">

      {/* Hero — forest field, sitewide letter-reveal accent */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <div className="relative mx-auto max-w-6xl px-6 py-14 lg:py-20">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber">
            Your progress
          </span>
          <h1 className="mt-4 max-w-4xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.98] tracking-tight sm:text-6xl">
            {/* OYLA study: words dissolve upward as the hero scrolls away —
                scrubbed to scroll, the exit twin of the letter entrance. */}
            <ScrollDissolve>
              Watch your money skills{" "}
              <span className="italic text-amber">
                <HeadlineRise chars>grow.</HeadlineRise>
              </span>
            </ScrollDissolve>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/75">
            Nine branches — every guide, checkpoint quiz, course, and tool on
            the site. Each one lights up as you finish it, and every branch
            always shows the next step. Nothing is ever locked; the tree just
            remembers where you&apos;ve been.
          </p>
          <p className="mt-4 text-sm font-semibold text-cream/60">
            Progress saves on this device automatically — an account syncs it
            across devices, but is never required.
          </p>
        </div>
      </section>

      {/* The tree */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <SkillTree data={data} />
        </div>
      </section>

      {/* Where this connects */}
      <section className="border-t-2 border-ink bg-paper-deep">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-12 gap-y-4 px-6 py-10">
          <p className="max-w-2xl text-base leading-7 text-stone">
            The tree shows <span className="font-semibold text-ink">what</span>{" "}
            you&apos;ve learned. For a step-by-step order built around one
            goal, follow a{" "}
            <Link
              href="/journey"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              guided path
            </Link>{" "}
            — or let{" "}
            <Link
              href="/plan"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              My Plan
            </Link>{" "}
            build the order for you.
          </p>
        </div>
      </section>

      </div>


      <CurtainFooter>

        <Footer />

      </CurtainFooter>
    </div>
  );
}
