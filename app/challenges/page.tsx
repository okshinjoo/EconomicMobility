import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChallengeGrid, { type ChallengeCardData } from "@/components/ChallengeGrid";
import { challenges } from "@/lib/challenges";

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

      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
            Challenges
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Doing beats knowing.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone">
            Guides teach; challenges make you actually do the thing. Join with
            one click (no account — progress saves on this device), work through
            real steps at your own pace, swap notes with everyone else in the
            challenge thread, and earn the badge at the end.
          </p>
          <p className="mt-4 text-sm text-stone">
            Every challenge has an official thread on the{" "}
            <Link
              href="/community"
              className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
            >
              community feed
            </Link>{" "}
            — that&apos;s where the group part happens.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <ChallengeGrid items={items} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
