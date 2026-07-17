import AccountOverlayShell from "@/components/AccountOverlayShell";
import AccountPanel from "@/components/AccountPanel";
import { topics } from "@/lib/topics";
import { getTopicRoadmap } from "@/lib/articles";
import { canopyTotals } from "@/lib/skillTree";
import { courses } from "@/lib/courses";
import { challenges } from "@/lib/challenges";
import type { TopicPath, BadgeSource } from "@/components/WelcomeBack";

// Intercepted /account: any in-app account link opens the profile as an
// overlay above the page you were on (X / Esc / scrim = router.back()).
// Direct visits and auth-email redirects still get the full page.
export default function AccountModal() {
  const paths: TopicPath[] = topics.map((t) => ({
    id: t.id,
    short: t.short,
    href: t.href,
    color: t.color,
    articles: getTopicRoadmap(t.id)
      .flatMap((group) => group.articles)
      .map((a) => ({ slug: a.slug, title: a.title, level: a.level })),
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
    <AccountOverlayShell>
      <AccountPanel
        paths={paths}
        badgeSources={badgeSources}
        canopyTotals={canopyTotals()}
        overlay
      />
    </AccountOverlayShell>
  );
}
