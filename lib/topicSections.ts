// Theme sections for topic hubs (July 2026, owner ask: "some are more
// about admissions, some are more about finances — organize them that
// way"). A topic listed here renders its hub grid grouped by these
// sections instead of the Start-here/Go-deeper/Advanced levels; topics
// absent from the registry keep the level roadmap. SERVER-ONLY (resolves
// against the article registry) — TopicPageView is a server component.
//
// Rules: every slug must belong to the topic (unknown slugs are skipped
// silently, duplicates keep their first home), and any topic article NOT
// named here still renders, in an automatic "More guides" section at the
// bottom — new articles can never vanish by being forgotten. Section
// order is editorial: the first section's first slug becomes the hub's
// "Start here" banner, so lead with the article a first visit needs.

import { getTopicArticles } from "@/lib/articles";
import type { Article } from "@/lib/articles/types";
import type { TopicId } from "@/lib/topics";

export interface TopicSectionDef {
  id: string;
  title: string;
  /** One line under the section chip — what this group is for. */
  blurb: string;
  slugs: string[];
}

const TOPIC_SECTIONS: Partial<Record<TopicId, TopicSectionDef[]>> = {
  college: [
    {
      id: "aid",
      title: "Paying for it",
      blurb:
        "FAFSA to award letter to appeal — the forms and plays that decide your price.",
      slugs: [
        "fafsa-step-by-step",
        "college-money-roadmap",
        "grants-loans-scholarships",
        "fafsa-mistakes",
        "fafsa-verification",
        "css-profile-explained",
        "reading-aid-award-letter",
        "understanding-unmet-need",
        "appealing-financial-aid",
        "finding-scholarships",
        "scholarship-displacement",
        "undocumented-daca-aid",
        "work-study-explained",
      ],
    },
    {
      id: "admissions",
      title: "Choosing schools & getting in",
      blurb:
        "Where you apply is a money decision: how schools admit, who pays better, what the labels promise.",
      slugs: [
        "how-colleges-read-applications",
        "early-decision-explained",
        "need-blind-colleges",
        "schools-with-generous-aid",
        "private-vs-public-aid",
        "in-state-vs-out-of-state",
        "religious-colleges-and-money",
        "community-college-path",
      ],
    },
    {
      id: "loans",
      title: "Student loans",
      blurb: "Before you sign, while you owe, and the day repayment starts.",
      slugs: [
        "student-loans-before-you-sign",
        "federal-vs-private-loans",
        "subsidized-vs-unsubsidized",
        "minimizing-college-debt",
        "repaying-student-loans",
      ],
    },
    {
      id: "enrolled",
      title: "While you're enrolled",
      blurb:
        "The rules and rescues that protect your money once classes start.",
      slugs: [
        "keep-your-aid-sap",
        "emergency-aid-on-campus",
        "cutting-textbook-costs",
        "dropping-a-class-money",
      ],
    },
    {
      id: "big-moves",
      title: "Big moves",
      blurb:
        "Transferring, taking a break, graduating — the checkpoints where the money shifts.",
      slugs: [
        "community-college-transfer-money",
        "taking-a-break-from-college",
        "graduation-money-checklist",
      ],
    },
  ],
};

export interface TopicSection {
  id: string;
  title: string;
  blurb: string;
  articles: Article[];
}

/** The topic's theme sections resolved to real articles, or null when the
 *  topic isn't in the registry (hub falls back to the level roadmap). */
export function getTopicSections(topic: TopicId): TopicSection[] | null {
  const defs = TOPIC_SECTIONS[topic];
  if (!defs) return null;
  const bySlug = new Map(getTopicArticles(topic).map((a) => [a.slug, a]));
  const placed = new Set<string>();
  const sections: TopicSection[] = [];
  for (const def of defs) {
    const articles: Article[] = [];
    for (const slug of def.slugs) {
      const art = bySlug.get(slug);
      if (!art || placed.has(slug)) continue;
      placed.add(slug);
      articles.push(art);
    }
    if (articles.length > 0) {
      sections.push({ id: def.id, title: def.title, blurb: def.blurb, articles });
    }
  }
  const leftovers = getTopicArticles(topic).filter((a) => !placed.has(a.slug));
  if (leftovers.length > 0) {
    sections.push({
      id: "more",
      title: "More guides",
      blurb: "The newest additions, waiting for a shelf.",
      articles: leftovers,
    });
  }
  return sections;
}
