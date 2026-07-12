// The community feed's curated content. Same moderation model as the Ask box
// (lib/communityQuestions.ts): visitors submit posts and comments, they land
// in the project inbox, and the good ones get added HERE by hand. Nothing
// user-written appears for everyone until it's added to this file.
//
// Honesty rule: no invented members. Posts and comments are authored by the
// team (author "Empower Team") or are real submissions you've approved —
// attribute those to the name the writer gave (first name is plenty).

import type { TopicId } from "./topics";
import {
  Hand,
  Trophy,
  MessageCircleQuestion,
  PiggyBank,
  CreditCard,
  Flag,
  GraduationCap,
  FileText,
  Landmark,
  TrendingUp,
  Briefcase,
  Users,
  ShieldAlert,
  Wallet,
  Receipt,
  Home,
  type LucideIcon,
} from "lucide-react";

/** The community's channels (Clever-Girl-Finance-style spaces). Every post
 *  lives in exactly one. Adding a channel here adds it to the filter bar and
 *  the composer's picker automatically. */
export type ChannelId =
  | "say-hello"
  | "questions"
  | "students"
  | "financial-aid"
  | "student-loans"
  | "investing"
  | "credit-debt"
  | "budgeting-saving"
  | "banking"
  | "work-income"
  | "taxes"
  | "housing"
  | "family-firstgen"
  | "wins"
  | "scams-safety"
  | "challenges";

export interface Channel {
  id: ChannelId;
  name: string;
  /** One-liner shown in the channel bar tooltip / intro. */
  tagline: string;
  /** Accent for the channel chip (text on a light tint). */
  color: string;
  /** Rail icon (rendered as <channel.icon />, same pattern as topics). */
  icon: LucideIcon;
  /** Sub-channels set this to their parent's id and indent under it. */
  parent?: ChannelId;
}

export const CHANNELS: Channel[] = [
  {
    id: "say-hello",
    icon: Hand,
    name: "Say Hello",
    tagline: "New here? Introduce yourself — everyone starts in this room.",
    color: "#c9842a",
  },
  {
    id: "questions",
    icon: MessageCircleQuestion,
    name: "Ask Anything",
    tagline: "The catch-all room. No question is too basic.",
    color: "#d26a4c",
  },
  {
    id: "students",
    icon: GraduationCap,
    name: "Students",
    tagline: "Money while you're in school — aid, loans, part-time paychecks.",
    color: "#b3762f",
  },
  {
    id: "financial-aid",
    icon: FileText,
    name: "Financial Aid & FAFSA",
    tagline: "Award letters, the FAFSA, and comparing offers line by line.",
    color: "#b3762f",
    parent: "students",
  },
  {
    id: "student-loans",
    icon: Landmark,
    name: "Student Loans",
    tagline: "Before you sign, while you owe, and the payoff after.",
    color: "#b3762f",
    parent: "students",
  },
  {
    id: "investing",
    icon: TrendingUp,
    name: "Investing & Retirement",
    tagline: "401(k)s, Roth IRAs, index funds, and the questions you've been sitting on.",
    color: "#15624b",
  },
  {
    id: "credit-debt",
    icon: CreditCard,
    name: "Credit & Debt",
    tagline: "Building a score, card trouble, collections, and getting out from under.",
    color: "#7a5230",
  },
  {
    id: "budgeting-saving",
    icon: PiggyBank,
    name: "Making Ends Meet",
    tagline: "Stretching the paycheck, cutting bills, and the month math.",
    color: "#0c4a39",
  },
  {
    id: "banking",
    icon: Wallet,
    name: "Banks, Cards & Apps",
    tagline: "Which bank? Which card? Is this app legit? Ask before you sign up.",
    color: "#2f6d80",
  },
  {
    id: "work-income",
    icon: Briefcase,
    name: "Jobs & Side Hustles",
    tagline: "Paychecks, side gigs, raises, and getting paid right.",
    color: "#4b5f8a",
  },
  {
    id: "taxes",
    icon: Receipt,
    name: "Taxes",
    tagline: "First filings, refunds, W-4 confusion, and tax-season panic.",
    color: "#8a6d1f",
  },
  {
    id: "housing",
    icon: Home,
    name: "Rent & Housing",
    tagline: "First apartments, deposits, roommates, and dreaming of keys.",
    color: "#a35d3d",
  },
  {
    id: "family-firstgen",
    icon: Users,
    name: "Family & First-Gen",
    tagline: "Helping family, sending money home, going first.",
    color: "#d26a4c",
  },
  {
    id: "wins",
    icon: Trophy,
    name: "Wins",
    tagline: "Victories of every size, celebrated properly.",
    color: "#15624b",
  },
  {
    id: "scams-safety",
    icon: ShieldAlert,
    name: "Scams & Safety",
    tagline: "Spotted something shady? Warn everyone here.",
    color: "#a33d3d",
  },
  {
    id: "challenges",
    icon: Flag,
    name: "Challenges",
    tagline: "The official threads for every site challenge.",
    color: "#4b5f8a",
  },
];

export function getChannel(id: ChannelId): Channel {
  return CHANNELS.find((c) => c.id === id) ?? CHANNELS[0];
}

/** True when a post in `postChannel` belongs under the `active` filter
 *  (a parent channel includes its sub-channels' posts). */
export function channelMatches(
  postChannel: ChannelId,
  active: ChannelId
): boolean {
  if (postChannel === active) return true;
  return getChannel(postChannel).parent === active;
}

export interface CommunityComment {
  id: string;
  author: string;
  /** ISO date, e.g. "2026-07-06" */
  date: string;
  text: string;
  /** Flair labels the author shared when submitting (copy them from the
   *  review email's member_flairs line when curating). */
  authorFlairs?: string[];
  /** Approved replies, one level deep (curated here like everything else). */
  replies?: CommunityComment[];
}

export interface CommunityPost {
  id: string;
  author: string;
  /** Team posts get a small badge so member posts stand apart. */
  team?: boolean;
  /** Flair labels the author shared when submitting. */
  authorFlairs?: string[];
  date: string;
  title: string;
  /** Paragraphs. Inline [label](/path) links are NOT parsed here; plain text only. */
  body: string[];
  topicId?: TopicId;
  /** Which channel the post lives in. */
  channel: ChannelId;
  /** Pinned posts sort to the top of their channel with a Pinned chip. */
  pinned?: boolean;
  link?: { label: string; href: string };
  comments: CommunityComment[];
}

export const communityPosts: CommunityPost[] = [
  {
    id: "say-hello",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "Start here: introduce yourself",
    channel: "say-hello",
    pinned: true,
    body: [
      "This is the front porch. Before anything else, drop a comment and tell everyone a little about you — whatever you're comfortable sharing.",
      "An easy template: your first name, where you're at in life (student? working? somewhere in between?), the one money thing you're working toward this year, and one thing you've already figured out that the rest of us could learn from.",
      "First names are plenty, no account needed, and intros are reviewed before they appear — so if yours doesn't show up instantly, it's on the way.",
    ],
    link: { label: "Want a member tag next to your name? Set one up", href: "/account" },
    comments: [
      {
        id: "hello-founder",
        author: "Shinjoo",
        authorFlairs: ["First-gen", "Family CFO"],
        date: "2026-07-12",
        text: "I'll go first: I'm Shinjoo, the founder. First-gen college student, kid of immigrants, and the reason this site exists is that learning how money works completely changed my trajectory. This year I'm working on growing this community. The thing I've figured out: the fog lifts faster when you ask the question out loud.",
      },
    ],
  },
  {
    id: "welcome",
    author: "Empower Team",
    team: true,
    date: "2026-07-07",
    title: "Welcome: here's what this space is for",
    channel: "say-hello",
    body: [
      "Money is easier when nobody's figuring it out alone. This feed is where Empower readers swap wins, questions, and honest experiences: the first paycheck, the credit score that finally moved, the FAFSA that made no sense until it did.",
      "Ground rules, kept short: be kind, no shaming anyone's situation or starting point, no selling anything, and no sharing anyone's personal details (yes, that includes your own account numbers). This is a place to learn out loud.",
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
    channel: "wins",
    pinned: true,
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
    channel: "questions",
    pinned: true,
    body: [
      "Most of us carry one around for years: something everyone else seems to already understand, so asking feels embarrassing. What's yours? Odds are a dozen other people reading this have the same one.",
      "Ask it in the comments, or completely anonymously through the Ask box. The best ones get full plain-English answers on the site.",
    ],
    link: { label: "Ask anonymously instead", href: "/ask#ask" },
    comments: [],
  },
  {
    id: "from-the-ask-box-credit",
    author: "Empower Team",
    team: true,
    date: "2026-07-07",
    title: "From the Ask box: \"I have no credit history at all. What's the fastest honest way to start?\"",
    channel: "credit-debt",
    topicId: "credit",
    body: [
      "A reader sent this in, and it's one of the most common questions we get. The short version of our answer: start with a secured card or a credit-builder loan, then let two boring habits do the work. Pay in full on time, keep the balance low. There's no legitimate fast-track, and anyone charging a fee to \"boost\" your score is selling you something you can do free.",
      "The full answer, and more like it, live on the Ask page. Have a follow-up? That's what the comments are for.",
    ],
    link: { label: "Read the full answer", href: "/ask#ask-no-credit-history" },
    comments: [],
  },
  {
    id: "thread-money-reset-week",
    author: "Empower Team",
    team: true,
    date: "2026-07-07",
    title: "Challenge thread: The Money Reset Week",
    channel: "challenges",
    body: [
      "The official thread for everyone doing the Money Reset Week: seven days, one small action a day, ending with a budget built from your real numbers.",
      "Share where you are: what day you're on, the spending surprise you starred, the subscription you finally cancelled. Stuck on a step? Ask here. Finished? Tell us the one change you're keeping.",
    ],
    link: { label: "Join the challenge", href: "/challenges/money-reset-week" },
    comments: [],
  },
  {
    id: "thread-no-spend-weekend",
    author: "Empower Team",
    team: true,
    date: "2026-07-07",
    title: "Challenge thread: The No-Spend Weekend",
    channel: "challenges",
    body: [
      "48 hours, zero optional spending. This is the thread for planning it, surviving it, and reporting back.",
      "The most useful thing you can share: your almost-spent list. The moments you reached for the card without thinking teach everyone (including you) where the leaks are.",
    ],
    link: { label: "Join the challenge", href: "/challenges/no-spend-weekend" },
    comments: [],
  },
  {
    id: "thread-credit-checkup",
    author: "Empower Team",
    team: true,
    date: "2026-07-07",
    title: "Challenge thread: The Credit Check-Up",
    channel: "challenges",
    body: [
      "For everyone working through the Credit Check-Up: pulling all three reports, reading them properly, and locking things down.",
      "Good things to share here: how long it actually took, anything confusing on a report (no account numbers please!), and whether you went freeze or fraud alert. Found and disputed an error? That's a win worth posting.",
    ],
    link: { label: "Join the challenge", href: "/challenges/credit-checkup" },
    comments: [],
  },
  {
    id: "thread-starter-fund",
    author: "Empower Team",
    team: true,
    date: "2026-07-07",
    title: "Challenge thread: The $500 Starter Fund Sprint",
    channel: "challenges",
    body: [
      "The official thread for everyone building their first $500 cushion. Share your starting point (no dollar amounts needed if you'd rather not), what you sold, and the automatic transfer you settled on.",
      "Stuck picking an account, or torn between saving and paying a card down first? Ask here.",
    ],
    link: { label: "Join the challenge", href: "/challenges/starter-fund-sprint" },
    comments: [],
  },
  {
    id: "thread-subscription-audit",
    author: "Empower Team",
    team: true,
    date: "2026-07-07",
    title: "Challenge thread: The Subscription Audit",
    channel: "challenges",
    body: [
      "The afternoon audit thread. Best things to share: your before-and-after monthly total, the weirdest forgotten charge you found, and any retention-call scripts that worked.",
      "House rule reminder: name the service if you like, but keep it factual and kind.",
    ],
    link: { label: "Join the challenge", href: "/challenges/subscription-audit" },
    comments: [],
  },
  {
    id: "students-hub",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "The student corner: what goes where",
    channel: "students",
    pinned: true,
    body: [
      "Home base for money-while-in-school: aid packages, loans, part-time paychecks, textbook math, all of it. Two focused rooms live under this one — Financial Aid & Offers for FAFSA and comparing packages, and Student Loans for everything borrowing.",
      "Not sure where something fits? Post it right here and we'll point you the right way.",
    ],
    link: { label: "The college money guides", href: "/learn/college" },
    comments: [],
  },
  {
    id: "aid-offers-open",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "Comparing aid offers? Bring the confusing line items here",
    channel: "financial-aid",
    pinned: true,
    body: [
      "Award letters are weirdly hard to compare on purpose: one school buries loans inside the \"aid,\" another leaves out costs entirely. If you're weighing offers, this is the room. Ask about any line you don't recognize — school names and dollar amounts optional.",
      "A good place to start: run both letters through the side-by-side tool below, then post whatever still doesn't add up.",
    ],
    link: { label: "Compare two aid offers side by side", href: "/tools/college/compare-offers" },
    comments: [],
  },
  {
    id: "student-loans-open",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "Student loans: ask before you sign",
    channel: "student-loans",
    pinned: true,
    body: [
      "The cheapest loan mistake is the one you never make. Before you sign anything, ask here: federal versus private, subsidized versus not, what a servicer actually does, whether that refinancing ad is too good to be true (usually).",
      "Already borrowed? Repayment questions, forgiveness confusion, and payoff wins of any size belong here too.",
    ],
    link: { label: "Estimate a loan's real monthly cost", href: "/tools/college/student-loan" },
    comments: [],
  },
  {
    id: "investing-open",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "Investing, minus the jargon",
    channel: "investing",
    pinned: true,
    body: [
      "No gatekeeping in this room: index funds, Roth IRAs, the thing your coworker keeps saying about crypto. If you've been nodding along to a term you don't actually understand, this is where you stop nodding and start asking.",
      "One house reminder: experiences and questions are always welcome, but nobody here can tell you what to buy — and anyone who tries is breaking the rules.",
    ],
    link: { label: "Getting started with investing", href: "/learn/investing" },
    comments: [],
  },
  {
    id: "work-income-open",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "First paychecks, side gigs, and getting paid right",
    channel: "work-income",
    pinned: true,
    body: [
      "Why is the check smaller than the offer letter? What do I actually put on a W-4? Is the side gig worth it after gas? Every working-for-money question lives here.",
      "Wins count double in this room: first paycheck, first raise, first invoice that actually got paid.",
    ],
    link: { label: "Your first paycheck, explained", href: "/learn/budgeting/your-first-paycheck" },
    comments: [],
  },
  {
    id: "family-firstgen-open",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "Money and family: the conversations nobody preps you for",
    channel: "family-firstgen",
    pinned: true,
    body: [
      "Helping parents with bills, sending money home, being the first in the family to navigate any of this — it's money and love at the same time, which makes it the hardest kind. This room is for those questions, judgment-free.",
      "Share what worked, ask what you're stuck on, or just say the thing out loud. Plenty of us are the family's unofficial CFO.",
    ],
    link: { label: "Sending money abroad without losing a cut", href: "/learn/budgeting/sending-money-abroad" },
    comments: [],
  },
  {
    id: "scams-open",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "Seen a scam? Post it here",
    channel: "scams-safety",
    pinned: true,
    body: [
      "The fastest scam alarm is each other. A text about a job you never applied for, a \"bank\" asking you to verify anything, an investing guru in your DMs: describe it here so the next person scrolls right past it.",
      "And zero shame if one got you — posting it is the win that protects everyone else.",
    ],
    link: { label: "How to spot a scam", href: "/learn/money-safety/how-to-spot-a-scam" },
    comments: [],
  },
  {
    id: "banking-open",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "Which bank, which card, is this app legit? Ask before you sign up",
    channel: "banking",
    pinned: true,
    body: [
      "The most expensive account is the one you picked because the ad was everywhere. Before you open anything — a checking account, a first credit card, a money app your friend swears by — ask here. Someone has probably already read the fine print.",
      "Good posts for this room: fee surprises, switching-banks stories, and 'is this legit?' screenshots described in words (no personal details).",
    ],
    link: { label: "The bank fees that quietly add up", href: "/learn/budgeting/avoiding-bank-fees" },
    comments: [],
  },
  {
    id: "taxes-open",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "Tax season survival: first filings welcome",
    channel: "taxes",
    pinned: true,
    body: [
      "Nobody teaches this and then suddenly it's April. First time filing? Confused about what a W-4 did to your paycheck? Waiting on a refund that feels wrong? This is the room.",
      "One rule of thumb worth pinning to your wall: if a preparer promises a bigger refund before seeing your documents, walk away.",
    ],
    link: { label: "Filing taxes for the first time", href: "/learn/taxes/filing-taxes-first-time" },
    comments: [],
  },
  {
    id: "housing-open",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "First apartments, deposits, and roommate math",
    channel: "housing",
    pinned: true,
    body: [
      "Rent is most people's biggest bill, and first leases are full of trapdoors: application fees, deposits that never come back, utilities nobody mentioned. Ask here before you sign, vent here after.",
      "Also welcome: roommate cost-splitting systems that actually survived the year.",
    ],
    link: { label: "Renting your first apartment", href: "/learn/home-ownership/renting-your-first-apartment" },
    comments: [],
  },
  {
    id: "ends-meet-open",
    author: "Empower Team",
    team: true,
    date: "2026-07-12",
    title: "The month math: making it stretch",
    channel: "budgeting-saving",
    pinned: true,
    body: [
      "This room is for the real version of budgeting: when the numbers barely reach, which bill to pay first, the grocery strategies that actually work. No judgment about starting points — that's a house rule.",
      "Small systems welcome. The person who figured out how to make the last week of the month not terrible has something to teach all of us.",
    ],
    link: { label: "Where does the money keep going?", href: "/learn/budgeting/tracking-your-spending" },
    comments: [],
  },
];


/* ------------------------- members & community cred ---------------------- */

/** Points earned when a contribution is PUBLISHED (curated into this file).
 *  Honest by construction: the score counts real published content only. */
export const CRED_POINTS = { post: 10, comment: 5, reply: 3 } as const;

export interface MemberContribution {
  postId: string;
  postTitle: string;
  channel: ChannelId;
  date: string;
  /** For comments/replies: the text excerpt. */
  text?: string;
  kind: "post" | "comment" | "reply";
}

export interface MemberSummary {
  name: string;
  slug: string;
  team: boolean;
  /** Latest flairs seen on any published contribution. */
  flairs: string[];
  cred: number;
  counts: { posts: number; comments: number; replies: number };
  /** Earliest contribution date — the public "member since". */
  firstDate: string;
  contributions: MemberContribution[];
}

export function memberSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Everyone with PUBLISHED content, indexed for member pages and cred chips.
 *  Curation note: first names collide — disambiguate when adding ("Maria R.")
 *  since the slug is derived from the display name. */
export function getMemberIndex(): MemberSummary[] {
  const bySlug = new Map<string, MemberSummary>();
  const touch = (
    name: string,
    isTeam: boolean,
    flairs: string[] | undefined,
    contribution: MemberContribution
  ) => {
    const slug = memberSlug(name);
    if (!slug) return;
    let m = bySlug.get(slug);
    if (!m) {
      m = {
        name,
        slug,
        team: isTeam,
        flairs: [],
        cred: 0,
        counts: { posts: 0, comments: 0, replies: 0 },
        firstDate: contribution.date,
        contributions: [],
      };
      bySlug.set(slug, m);
    }
    if (flairs && flairs.length > 0) m.flairs = flairs;
    if (contribution.date < m.firstDate) m.firstDate = contribution.date;
    m.contributions.push(contribution);
    if (contribution.kind === "post") {
      m.counts.posts += 1;
      m.cred += CRED_POINTS.post;
    } else if (contribution.kind === "comment") {
      m.counts.comments += 1;
      m.cred += CRED_POINTS.comment;
    } else {
      m.counts.replies += 1;
      m.cred += CRED_POINTS.reply;
    }
  };

  for (const post of communityPosts) {
    touch(post.author, Boolean(post.team), post.authorFlairs, {
      postId: post.id,
      postTitle: post.title,
      channel: post.channel,
      date: post.date,
      kind: "post",
    });
    for (const c of post.comments) {
      touch(c.author, c.author === "Empower Team", c.authorFlairs, {
        postId: post.id,
        postTitle: post.title,
        channel: post.channel,
        date: c.date,
        text: c.text,
        kind: "comment",
      });
      for (const r of c.replies ?? []) {
        touch(r.author, r.author === "Empower Team", r.authorFlairs, {
          postId: post.id,
          postTitle: post.title,
          channel: post.channel,
          date: r.date,
          text: r.text,
          kind: "reply",
        });
      }
    }
  }
  return [...bySlug.values()].sort((a, b) => b.cred - a.cred);
}

export function getMember(slug: string): MemberSummary | undefined {
  return getMemberIndex().find((m) => m.slug === slug);
}