import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicMark from "@/components/TopicMark";
import CommunityFeed from "@/components/CommunityFeed";
import { communityPosts, getMemberIndex } from "@/lib/communityFeed";

export const metadata: Metadata = {
  title: "Community | Empower — Economic Mobility Project",
  description:
    "Wins, questions, and honest money conversations from Empower readers. No account needed — posts and comments are reviewed before they appear.",
};

export default function CommunityPage() {
  // Cred scores, computed from published content at build time.
  const credByAuthor: Record<string, number> = {};
  for (const m of getMemberIndex()) credByAuthor[m.name] = m.cred;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* Hero — C: editorial maximal on a forest field */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <TopicMark
          id="money-safety"
          color="#fbf8f1"
          className="pointer-events-none absolute -right-16 -top-12 h-[24rem] w-[24rem] opacity-[0.07]"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-amber">
            The community
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-[2.6rem] font-medium leading-[1.07] sm:leading-[0.95] tracking-tight sm:text-7xl">
            Learning out loud,{" "}
            <span className="italic text-amber">together.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-cream/80">
            Rooms for every conversation: say hello, share a win, ask the
            question you&apos;ve been sitting on. No account, no real name
            required — and everything is reviewed by a human before it appears
            for everyone, so it stays kind and useful.
          </p>
        </div>
      </section>

      {/* Rail + feed (CommunityFeed owns the CGF-style left rail) */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <CommunityFeed posts={communityPosts} credByAuthor={credByAuthor} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
