import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccountPanel from "@/components/AccountPanel";
import { topics } from "@/lib/topics";
import { getTopicRoadmap } from "@/lib/articles";
import { courses } from "@/lib/courses";
import { challenges } from "@/lib/challenges";
import type { TopicPath, BadgeSource } from "@/components/WelcomeBack";

export const metadata: Metadata = {
  title: "Your Account | Empower — Economic Mobility Project",
  description:
    "Create a free account to sync your reading, quiz results, calculators, and badges across devices. Optional, always — nothing on Empower requires signing up.",
};

export default function AccountPage() {
  // Same server-derived data the homepage WelcomeBack strip uses: per-topic
  // reading paths for progress/next-step, and badge metadata for the case.
  const paths: TopicPath[] = topics.map((t) => ({
    id: t.id,
    short: t.short,
    href: t.href,
    color: t.color,
    articles: getTopicRoadmap(t.id)
      .flatMap((group) => group.articles)
      .map((a) => ({ slug: a.slug, title: a.title })),
  }));
  const badgeSources: BadgeSource[] = [
    ...courses.map((c) => ({
      id: c.id,
      title: c.title,
      color: c.color,
      kind: "course" as const,
    })),
    ...challenges.map((c) => ({
      id: c.id,
      title: c.title,
      color: c.color,
      kind: "challenge" as const,
    })),
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      {/* The panel owns its full layout per auth state: signed OUT it
          renders the split-screen on paper; signed IN the dark app-frame
          dashboard (owner-picked Kinetik clone). */}
      <AccountPanel paths={paths} badgeSources={badgeSources} />

      <Footer />
    </div>
  );
}
