import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CurtainFooter from "@/components/CurtainFooter";
import ChallengeGrid, { type ChallengeCardData } from "@/components/ChallengeGrid";
import { challenges } from "@/lib/challenges";
import HeroRecede from "@/components/HeroRecede";

export const metadata: Metadata = {
  title: "Challenges | Empower — Economic Mobility Project",
  description:
    "Self-paced money challenges you can join in one click: real action steps, a shared community thread, and a badge when you finish.",
};

export default function ChallengesPage() {
  const items: ChallengeCardData[] = challenges.map((c) => ({
    id: c.id,
    title: c.title,
    tagline: c.tagline,
    pace: c.pace,
    color: c.color,
    stepCount: c.steps.length,
  }));

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />


      {/* content column stacks above the fixed footer (curtain reveal) */}

      <div className="relative z-10 bg-paper">

      {/* Hero — soft terracotta tint (the solid field read as abrasive) */}
      <section className="border-b-2 border-ink" style={{ background: "#f0d0c0" }}>
        <HeroRecede className="mx-auto max-w-7xl px-6 py-14 lg:py-20">
          <span className="inline-block -rotate-1 rounded-lg border-2 border-ink bg-cream px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-[3px_3px_0_#11211c]">
            Challenges
          </span>
          <h1 className="mt-5 max-w-2xl font-display text-[2.6rem] font-semibold leading-[1.07] sm:leading-[1.02] tracking-tight text-ink sm:text-6xl">
            Doing{" "}
            <span className="italic" style={{ color: "#b7593f" }}>
              beats
            </span>{" "}
            knowing.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/75">
            Guides teach; challenges make you actually do the thing. Join with
            one click (no account; progress saves on this device), work through
            real steps at your own pace, swap notes with everyone else in the
            challenge thread, and earn the badge at the end.
          </p>
          <p className="mt-4 text-sm text-ink/70">
            Every challenge has an official thread on the{" "}
            <Link
              href="/community"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              community feed
            </Link>
            , where the group part happens.
          </p>
        </HeroRecede>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <ChallengeGrid items={items} />
        </div>
      </section>

      </div>


      <CurtainFooter>

        <Footer />

      </CurtainFooter>
    </div>
  );
}
