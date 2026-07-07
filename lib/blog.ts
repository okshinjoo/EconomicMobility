// The blog: owner-written editorial posts about day-to-day money life — the
// fun, timely, opinionated reads that don't belong in the Learn curriculum
// (spotting fake gurus, app trends, cultural money stuff). Same voice rules
// as articles (lib/articles), same block format, rendered by ArticleBody.
// Add a post here and it appears on /blog (newest first) and in site search.

import type { ArticleBlock } from "./articles/types";

export interface BlogPost {
  slug: string;
  title: string;
  dek: string;
  /** ISO date; posts sort newest first. */
  date: string;
  /** Short editorial tag shown as the kicker, e.g. "Watch out" or "Noticed". */
  tag: string;
  readMinutes: number;
  body: ArticleBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-spot-a-fake-financial-guru",
    title: "How to Spot a Fake Financial Guru",
    dek: "The rented Lamborghini is a clue. Here are the others.",
    date: "2026-07-07",
    tag: "Watch out",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Somewhere on your feed right now, a guy in front of a whiteboard is explaining that the reason you're not rich is that nobody taught you \"the system.\" He learned it, he escaped the 9-to-5, and for $497 (today only), he'll teach you too. He seems confident. The comments are glowing. And something about it feels a little off.",
      },
      {
        type: "p",
        text: "Trust that feeling. Financial gurus are one of the oldest cons around, and social media just gave them better production value. Here's how to tell teachers from salesmen.",
      },
      { type: "h2", text: "The income is the course" },
      {
        type: "p",
        text: "Ask one question about any money influencer: how does this person actually make money? For a lot of them, the honest answer is \"by selling courses about making money.\" The trading isn't profitable; the course about trading is. If someone's wealth depends on convincing you they're wealthy, everything they show you is marketing.",
      },
      { type: "h2", text: "The props are usually rented" },
      {
        type: "p",
        text: "Exotic cars, mansion backdrops, and airport-lounge selfies can all be rented by the hour, and there are agencies that exist for exactly this. Real wealth is boring to look at. It's an index fund quietly compounding, not a Lamborghini with a licensing deal.",
      },
      { type: "h2", text: "The red flags, all in one place" },
      {
        type: "list",
        items: [
          "**Guaranteed returns.** Nobody can promise you 2% a day, 10% a month, or \"risk-free\" anything. Markets don't work that way, and it's illegal to claim they do.",
          "**Urgency.** Price goes up at midnight, only three spots left, this window is closing. Real education doesn't expire; pressure is there so you won't think.",
          "**Secrets the banks don't want you to know.** There are no secrets. The boring stuff (spend less than you earn, invest early, avoid high-interest debt) is free and it works.",
          "**A move from public to private.** Follow-up in the DMs, a private Telegram or WhatsApp group, a \"mentorship circle.\" Scammers move you off-platform to work you over away from the comment section.",
          "**Flexing as proof.** Screenshots of trading profits are as easy to fake as anything else on the internet. A photo of cash on a bed is not an audited return.",
        ],
      },
      { type: "h2", text: "What real help looks like" },
      {
        type: "p",
        text: "Real financial educators explain things you can verify, name their sources, tell you what could go wrong, and don't need your money for the advice to work. Fiduciary advisors are legally bound to act in your interest, and free nonprofit help (HUD housing counselors, VITA tax prep, NFCC credit counselors) exists for most of the big stuff.",
      },
      {
        type: "p",
        text: "And if someone's pitch has already moved from inspiration to investment opportunity, that's not a guru anymore. That's the setup for a scam, and we have a whole guide on [how those work](/learn/money-safety/how-to-spot-a-scam), plus one on the [\"investment\" version specifically](/learn/money-safety/romance-scams).",
      },
      {
        type: "key",
        text: "The test that never fails: real teachers make money when their advice works for them. Fake gurus make money when their advice sells to you.",
      },
    ],
  },
  {
    slug: "why-every-app-wants-to-lend-you-money",
    title: "Why Every App Suddenly Wants to Lend You Money",
    dek: "Your food delivery app is offering you a loan. That's not generosity.",
    date: "2026-07-07",
    tag: "Noticed",
    readMinutes: 3,
    body: [
      {
        type: "p",
        text: "Order sneakers: four easy payments. Book a flight: pay later. Get groceries delivered: split it into installments. Even your paycheck has apps circling it, offering to advance you a piece a few days early for a \"small fee\" or an \"optional tip.\"",
      },
      {
        type: "p",
        text: "None of this appeared because tech companies got generous. Lending you money, even in tiny slices, is one of the most profitable things an app can do. It's worth understanding the machine before you're inside it.",
      },
      { type: "h2", text: "The business model is the missed payment" },
      {
        type: "p",
        text: "Buy-now-pay-later services earn fees from stores because installments make people buy more, and buy bigger. But a chunk of the profit comes from the people who slip: late fees, reactivation fees, interest on longer plans. The product is designed to feel free right up until it isn't. We break down the fine print in [our BNPL guide](/learn/credit/buy-now-pay-later).",
      },
      { type: "h2", text: "Paycheck advances are payday loans in a hoodie" },
      {
        type: "p",
        text: "Cash-advance apps market themselves as friendly. But do the math on a $100 advance with a $5 fee repaid in a week, and you're looking at triple-digit annualized cost, which is payday-lender territory with better branding. The \"optional tips\" are engineered guilt, and they add up the same way. The [payday lending guide](/learn/government-aid/payday-loans-and-predatory-lending) covers the whole family tree.",
      },
      { type: "h2", text: "The real cost is the normalization" },
      {
        type: "p",
        text: "The deepest trick isn't any single fee. It's making borrowing feel like a default setting: every checkout pre-loaded with installments, every balance a few taps from an advance. Once owing small amounts everywhere feels normal, a budget gets very hard to see clearly.",
      },
      {
        type: "p",
        text: "You don't have to boycott any of it. Just name it what it is (a loan), count it where it belongs (in your [budget](/tools/budget), not around it), and let the four easy payments stay easy by being rare.",
      },
      {
        type: "tip",
        text: "One rule that keeps all of this simple: if you wouldn't buy it with this week's money, four slices of it over six weeks doesn't change the answer.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function sortedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
