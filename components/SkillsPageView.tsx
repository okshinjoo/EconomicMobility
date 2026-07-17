// The Skill Tree page body, shared by /skills and its /students mirror
// (July 17, 2026 — students are exactly who the tree is for). Pages wrap
// this with their frame's chrome: the main route adds <Header/> and the
// footer curtain; the student mirror renders under StudentHeader with a
// plain student Footer. SkillTree/SkillTreeMap/MasteryQuiz frame their own
// links via useFrame(), so this view only frames the two links it owns.

import Link from "next/link";
import ScrollDrift from "@/components/ScrollDrift";
import TopicMark from "@/components/TopicMark";
import HeadlineRise from "@/components/HeadlineRise";
import ScrollDissolve from "@/components/ScrollDissolve";
import SkillTree from "@/components/SkillTree";
import { buildSkillTree } from "@/lib/skillTree";
import { frameHref, type Frame } from "@/lib/frame";

export default function SkillsPageView({ frame }: { frame: Frame }) {
  const data = buildSkillTree();
  const href = (h: string) => frameHref(h, frame);
  return (
    <>
      {/* Hero — forest field, sitewide letter-reveal accent */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <ScrollDrift range={62} driftX={-28} rotate={5}>
          <TopicMark
            id="investing"
            color="#fbf8f1"
            className="pointer-events-none absolute -right-16 -top-12 h-[24rem] w-[24rem] opacity-[0.16]"
          />
        </ScrollDrift>
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
              href={href("/journey")}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              guided path
            </Link>{" "}
            — or let{" "}
            <Link
              href={href("/plan")}
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              My Plan
            </Link>{" "}
            build the order for you.
          </p>
        </div>
      </section>
    </>
  );
}
