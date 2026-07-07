// The community feed's curated content. Same moderation model as the Ask box
// (lib/communityQuestions.ts): visitors submit posts and comments, they land
// in the project inbox, and the good ones get added HERE by hand. Nothing
// user-written appears for everyone until it's added to this file.
//
// Honesty rule: no invented members. Posts and comments are authored by the
// team (author "Empower Team") or are real submissions you've approved —
// attribute those to the name the writer gave (first name is plenty).

import type { TopicId } from "./topics";

export interface CommunityComment {
  id: string;
  author: string;
  /** ISO date, e.g. "2026-07-06" */
  date: string;
  text: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  /** Team posts get a small badge so member posts stand apart. */
  team?: boolean;
  date: string;
  title: string;
  /** Paragraphs. Inline [label](/path) links are NOT parsed here — plain text. */
  body: string[];
  topicId?: TopicId;
  link?: { label: string; href: string };
  comments: CommunityComment[];
}

export const communityPosts: CommunityPost[] = [
  {
    id: "welcome",
    author: "Empower Team",
    team: true,
    date: "2026-07-07",
    title: "Welcome — here's what this space is for",
    body: [
      "Money is easier when nobody's figuring it out alone. This feed is where Empower readers swap wins, questions, and honest experiences: the first paycheck, the credit score that finally moved, the FAFSA that made no sense until it did.",
      "Ground rules, kept short: be kind, no shaming anyone's situation or starting point, no selling anything, and no sharing anyone's personal details (including your own account numbers — please). This is a place to learn out loud.",
      "Comments are reviewed before they appear for everyone, usually within a day or two. You never need an account or a real name.",
    ],
    comments: [],
  },
  {
    id: "win-of-the-week",
    author: "Empower Team",
    team: true,
    date: "2026-07-07",
    title: "What's your money win this week?",
    body: [
      "Any size counts. Packed lunch three days in a row, set up autopay so a bill stops sneaking up on you, checked your credit report for the first time, asked a question you'd been sitting on. Small wins are how every big one starts.",
      "Drop yours in the comments. We'll add our favorites to this thread.",
    ],
    comments: [
      {
        id: "win-team-1",
        author: "Empower Team",
        date: "2026-07-07",
        text: "We'll go first: this week we finally updated every guide on the site to the new 2026 numbers, so what you read here matches what the IRS actually does. Felt great to close that tab.",
      },
    ],
  },
  {
    id: "question-you-never-asked",
    author: "Empower Team",
    team: true,
    date: "2026-07-07",
    title: "The money question you never felt you could ask",
    body: [
      "Most of us carry one around for years: something everyone else seems to already understand, so asking feels embarrassing. What's yours? Odds are a dozen other people reading this have the same one.",
      "Ask it in the comments, or completely anonymously through the Ask box — the best ones get full plain-English answers on the site.",
    ],
    link: { label: "Ask anonymously instead", href: "/blog#ask" },
    comments: [],
  },
  {
    id: "from-the-ask-box-credit",
    author: "Empower Team",
    team: true,
    date: "2026-07-07",
    title: "From the Ask box: \"I have no credit history at all. What's the fastest honest way to start?\"",
    topicId: "credit",
    body: [
      "A reader sent this in, and it's one of the most common questions we get. The short version of our answer: start with a secured card or a credit-builder loan, then let two boring habits do the work — pay in full on time, keep the balance low. There's no legitimate fast-track, and anyone charging a fee to \"boost\" your score is selling you something you can do free.",
      "The full answer, and more like it, live on the Ask page. Have a follow-up? That's what the comments are for.",
    ],
    link: { label: "Read the full answer", href: "/blog#ask-no-credit-history" },
    comments: [],
  },
];
