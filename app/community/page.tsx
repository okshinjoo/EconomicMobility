import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicMark from "@/components/TopicMark";
import CommunityFeed from "@/components/CommunityFeed";
import { communityPosts } from "@/lib/communityFeed";

export const metadata: Metadata = {
  title: "Community | Empower — Economic Mobility Project",
  description:
    "Wins, questions, and honest money conversations from Empower readers. No account needed — posts and comments are reviewed before they appear.",
};

export default function CommunityPage() {
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
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl">
            Learning out loud,{" "}
            <span className="italic text-amber">together.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-cream/80">
            Wins, questions, and honest money conversations from people
            figuring it out — no account, no real name required. Everything is
            reviewed by a human before it appears for everyone, so it stays
            kind and useful.
          </p>
        </div>
      </section>

      {/* Feed + sidebar */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:py-16">
          <CommunityFeed posts={communityPosts} />

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="card-ink rounded-2xl bg-cream p-6">
              <h2 className="font-display text-lg font-semibold text-ink">
                House rules
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-stone">
                <li>Be kind. No shaming anyone&apos;s situation.</li>
                <li>No selling, promoting, or &ldquo;DM me&rdquo; offers.</li>
                <li>
                  No personal details — yours or anyone else&apos;s.
                </li>
                <li>
                  Experiences are welcome; individualized financial advice is
                  not.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-forest p-6 text-cream shadow-[7px_7px_0_#e7a33c]">
              <h2 className="font-display text-lg font-semibold">
                Have a question instead?
              </h2>
              <p className="mt-2 text-sm leading-6 text-cream/75">
                The Ask box is fully anonymous, and good questions get complete
                plain-English answers on the site.
              </p>
              <Link
                href="/ask#ask"
                className="mt-4 inline-flex items-center rounded-md bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-cream"
              >
                Ask a question
              </Link>
            </div>

            <div className="card-ink rounded-2xl bg-cream p-6 lg:-rotate-[0.5deg]">
              <h2 className="font-display text-lg font-semibold text-ink">
                New here?
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone">
                The{" "}
                <Link
                  href="/quiz"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  2-minute quiz
                </Link>{" "}
                finds your starting point, and the{" "}
                <Link
                  href="/learn"
                  className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                >
                  library
                </Link>{" "}
                has 151 plain-English guides when a thread sparks something.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
