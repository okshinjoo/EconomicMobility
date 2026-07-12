import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DevAccountHarness from "@/components/DevAccountHarness";
import { topics } from "@/lib/topics";
import { getTopicRoadmap } from "@/lib/articles";
import { courses } from "@/lib/courses";
import { challenges } from "@/lib/challenges";
import type { TopicPath, BadgeSource } from "@/components/WelcomeBack";

export const metadata: Metadata = {
  title: "Dev: Account Preview",
  robots: { index: false },
};

// DEV-ONLY: the signed-in account view with stubbed auth, for working on
// signed-in UI without a login dance. Hard-404s in production builds.
export default function DevAccountPreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

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
      <section className="bg-paper-deep">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <p className="mb-6 rounded-lg border-2 border-terracotta bg-terracotta/10 px-4 py-2 text-sm font-bold text-terracotta">
            Dev harness — fake session, saves are stubbed. Not reachable in
            production.
          </p>
          <DevAccountHarness paths={paths} badgeSources={badgeSources} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
