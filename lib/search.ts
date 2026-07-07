// Builds the lightweight search index for the site-wide search (⌘K).
//
// This runs on the SERVER (it's called by the server Header component and the
// result is passed to the client SearchDialog as a prop). It deliberately maps
// articles down to title/dek/href only — full article bodies never reach the
// client bundle.

import { allArticles } from "./articles";
import { topics, getTopic } from "./topics";
import { toolCategories, hrefFor } from "./toolsRegistry";
import { glossary } from "./glossary";
import { blogPosts } from "./blog";

export type SearchKind = "Article" | "Calculator" | "Topic" | "Term" | "Page";

export interface SearchItem {
  kind: SearchKind;
  title: string;
  subtitle: string;
  href: string;
  /** Group label shown in the results list. */
  group: string;
  /** Extra searchable text (aliases, topic name) not shown. */
  keywords?: string;
}

// A few important non-article destinations.
const PAGES: SearchItem[] = [
  { kind: "Page", title: "Take the Quiz", subtitle: "Find your starting point in about 2 minutes.", href: "/quiz", group: "Pages" },
  { kind: "Page", title: "Free Templates", subtitle: "Downloadable budget, debt, and savings spreadsheets.", href: "/tools/templates", group: "Pages", keywords: "spreadsheet excel download worksheet tracker" },
  { kind: "Page", title: "Resources", subtitle: "Trusted outside help, plus a finder for your state.", href: "/resources", group: "Pages", keywords: "benefits state help 211" },
  { kind: "Page", title: "Ask a Question", subtitle: "Ask anything about money, anonymously.", href: "/ask", group: "Pages", keywords: "ask faq community questions" },
  { kind: "Page", title: "Glossary", subtitle: "Every money word, in plain English.", href: "/glossary", group: "Pages", keywords: "definitions terms" },
  { kind: "Page", title: "Start Here", subtitle: "A quick tour of the site for newcomers.", href: "/start-here", group: "Pages" },
  { kind: "Page", title: "All Calculators", subtitle: "Every free calculator in one place.", href: "/tools", group: "Pages", keywords: "tools" },
  { kind: "Page", title: "Browse All Topics", subtitle: "The full library of guides.", href: "/learn", group: "Pages" },
  { kind: "Page", title: "Courses", subtitle: "Focused learning modules with flashcards and finals.", href: "/courses", group: "Pages", keywords: "modules badges flashcards" },
  { kind: "Page", title: "Community", subtitle: "Wins, questions, and honest conversations.", href: "/community", group: "Pages", keywords: "feed posts comments" },
  { kind: "Page", title: "Challenges", subtitle: "Join a group challenge, earn the badge.", href: "/challenges", group: "Pages", keywords: "no-spend reset credit checkup" },
  { kind: "Page", title: "Blog", subtitle: "Fun, honest reads on day-to-day money.", href: "/blog", group: "Pages", keywords: "posts articles editorial" },
  { kind: "Page", title: "Life Moments", subtitle: "First job, moving out, graduating: start from your moment.", href: "/life", group: "Pages", keywords: "first job apartment college graduate scammed tight" },
  { kind: "Page", title: "Letter Generator", subtitle: "Credit dispute and debt validation letters, free.", href: "/tools/letters", group: "Pages", keywords: "dispute letter debt validation collector template" },
];

const blogItems: SearchItem[] = blogPosts.map((p) => ({
  kind: "Page" as const,
  title: p.title,
  subtitle: p.dek,
  href: `/blog/${p.slug}`,
  group: "Blog",
  keywords: p.tag,
}));

/** Assemble the full searchable index. */
export function getSearchItems(): SearchItem[] {
  const topicItems: SearchItem[] = topics.map((t) => ({
    kind: "Topic",
    title: t.title,
    subtitle: t.description,
    href: t.href,
    group: "Topics",
  }));

  const articleItems: SearchItem[] = allArticles.map((a) => {
    const topicTitle = getTopic(a.topicId).title;
    return {
      kind: "Article",
      title: a.title,
      subtitle: a.dek,
      href: `/learn/${a.topicId}/${a.slug}`,
      group: topicTitle,
      keywords: topicTitle,
    };
  });

  const toolItems: SearchItem[] = toolCategories.flatMap((cat) =>
    cat.items
      .filter((item) => item.status === "live")
      .map((item) => ({
        kind: "Calculator" as const,
        title: item.title,
        subtitle: item.short,
        href: hrefFor(cat, item),
        group: "Calculators",
        keywords: `${cat.label} calculator tool`,
      }))
  );

  const termItems: SearchItem[] = glossary.map((g) => ({
    kind: "Term",
    title: g.term,
    subtitle: g.definition,
    href: `/glossary#${g.slug}`,
    group: "Glossary",
    keywords: (g.aliases ?? []).join(" "),
  }));

  return [...topicItems, ...toolItems, ...articleItems, ...blogItems, ...termItems, ...PAGES];
}
