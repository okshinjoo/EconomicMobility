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
  type LucideIcon,
} from "lucide-react";

/** The community's channels (Clever-Girl-Finance-style spaces). Every post
 *  lives in exactly one. Adding a channel here adds it to the filter bar and
 *  the composer's picker automatically. */
export type ChannelId =
  | "say-hello"
  | "wins"
  | "questions"
  | "students"
  | "financial-aid"
  | "student-loans"
  | "budgeting-saving"
  | "credit-debt"
  | "investing"
  | "work-income"
  | "family-firstgen"
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
    id: "wins",
    icon: Trophy,
    name: "Wins",
    tagline: "Victories of every size, celebrated properly.",
    color: "#15624b",
  },
  {
    id: "questions",
    icon: MessageCircleQuestion,
    name: "Questions",
    tagline: "Ask anything. Nothing is too basic here.",
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
    name: "Financial Aid & Offers",
    tagline: "FAFSA, award letters, and comparing packages line by line.",
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
    id: "budgeting-saving",
    icon: PiggyBank,
    name: "Budgeting & Saving",
    tagline: "Paychecks, plans, and making the leftover grow.",
    color: "#0c4a39",
  },
  {
    id: "credit-debt",
    icon: CreditCard,
    name: "Credit & Debt",
    tagline: "Scores, cards, loans, and getting out from under them.",
    color: "#7a5230",
  },
  {
    id: "investing",
    icon: TrendingUp,
    name: "Investing",
    tagline: "Index funds, IRAs, and the questions you've been sitting on.",
    color: "#15624b",
  },
  {
    id: "work-income",
    icon: Briefcase,
    name: "Work & Income",
    tagline: "Paychecks, side gigs, raises, and getting paid right.",
    color: "#4b5f8a",
  },
  {
    id: "family-firstgen",
    icon: Users,
    name: "Family & First-Gen",
    tagline: "Helping family, sending money home, going first.",
    color: "#d26a4c",
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
];
