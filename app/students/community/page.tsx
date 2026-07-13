import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CommunityFeed from "@/components/CommunityFeed";
import { communityPosts, getMemberIndex } from "@/lib/communityFeed";

export const metadata: Metadata = {
  title: "Students Community | Empower — Economic Mobility Project",
  description:
    "The Students channel: financial aid questions, loan decisions, first paychecks, and transfer plans — asked and answered by people in the same semester you're in.",
};

// The community, opened inside the student microsite: same feed, same
// posts, but it starts on the Students channel and every post permalink
// stays under /students/community so the loop never leaves the frame.
export default function StudentsCommunityPage() {
  const authorMeta: Record<string, { cred: number; earned: string[] }> = {};
  for (const m of getMemberIndex())
    authorMeta[m.name] = { cred: m.cred, earned: m.earnedFlairs };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            The community
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Your people, same semester.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-stone">
            Aid questions, loan decisions, first paychecks, transfer plans.
            You&apos;re starting in the Students rooms — the rail on the left
            has every other conversation when you want it.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <CommunityFeed
            posts={communityPosts}
            authorMeta={authorMeta}
            initialChannel="students"
            postBase="/students/community/post"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
