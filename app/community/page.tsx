import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicMark from "@/components/TopicMark";
import ScrollDrift from "@/components/ScrollDrift";
import HeadlineRise from "@/components/HeadlineRise";
import CommunityFeed from "@/components/CommunityFeed";
import { communityPosts, getMemberIndex } from "@/lib/communityFeed";

export const metadata: Metadata = {
  title: "Community | Empower — Economic Mobility Project",
  description:
    "Wins, questions, and honest money conversations from Empower readers. Reading is open to everyone; posting takes a free account, and everything is reviewed before it appears.",
};

export default function CommunityPage() {
  // Cred scores + earned achievement flairs, computed from published
  // content at build time.
  const authorMeta: Record<string, { cred: number; earned: string[] }> = {};
  for (const m of getMemberIndex())
    authorMeta[m.name] = { cred: m.cred, earned: m.earnedFlairs };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main id="main-content" tabIndex={-1}>
      {/* Hero — C: editorial maximal on a forest field */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <ScrollDrift>
          <TopicMark
            id="money-safety"
            color="#fbf8f1"
            className="pointer-events-none absolute -right-16 -top-12 h-[24rem] w-[24rem] opacity-[0.07]"
          />
        </ScrollDrift>
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            The community
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
            {/* Letter-by-letter blur-lift on the amber phrase only (owner
                call, July 16) — no word-mask, so no descender clipping. */}
            Learning out loud,{" "}
            <span className="italic text-amber">
              <HeadlineRise chars>together.</HeadlineRise>
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-cream/80">
            Rooms for every conversation: say hello, share a win, ask the
            question you&apos;ve been sitting on. Read it all without an
            account; posting takes a free one, so every post has a real name
            behind it (a first name is plenty). Everything is reviewed by a
            human before it appears for everyone, so it stays kind and useful.
          </p>
        </div>
      </section>

      {/* Rail + feed (CommunityFeed owns the CGF-style left rail) */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <CommunityFeed posts={communityPosts} authorMeta={authorMeta} />
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
