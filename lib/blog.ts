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
    slug: "the-lipstick-effect",
    title: "The Lipstick Effect: Small Comforts in a Locked-Out Economy",
    dek: "When the house feels impossible, the $9 treat feels like the only vote you get.",
    date: "2026-07-07",
    tag: "Real talk",
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "In 2001, with the economy sinking, Estée Lauder's chairman Leonard Lauder noticed something odd: lipstick sales were climbing. People who had stopped buying coats and handbags were still buying a $10 tube of confidence. He called it the lipstick index, and economists have argued about the data ever since. But the feeling underneath it never needed proving. When the big things go wrong, small nice things start doing a job they were never designed for.",
      },
      {
        type: "p",
        text: "Twenty-five years later the lipstick is an iced coffee, a phone case, a $12 candle, a skin serum someone on your feed swears by. The product changed. The purchase didn't. It's still the cheapest available unit of feeling okay.",
      },
      { type: "h2", text: "Why small purchases feel so good right now" },
      {
        type: "p",
        text: "Psychologists have a few names for the pieces of this. Retail therapy is real in the narrow sense: buying something produces a short, measurable lift in mood and, more importantly, a feeling of control. You chose it. You could afford it. It arrived. In a week where rent went up and the news was bad and your manager was worse, that tiny completed transaction might be the only loop that closed.",
      },
      {
        type: "p",
        text: "Now add the context. For a lot of people under 35, the traditional milestones have drifted out of reach on any realistic timeline. A starter home costs six figures more than it did a few years ago. Retirement math assumes decades of contributions that gig work makes lumpy. When the finish line moves that far away, the rational-feeling response is to stop running toward it and enjoy the water station. Why agonize over a $9 treat when skipping it for ten years still wouldn't make a down payment? That logic is seductive precisely because it's partly true.",
      },
      { type: "h2", text: "Advertising figured this out before we did" },
      {
        type: "p",
        text: "Marketing used to sell products. Now it sells permission. \"You deserve this.\" \"Little luxuries.\" \"Treat yourself\" went from a sitcom joke to an entire retail category. The genius of it is that the pitch agrees with your feelings: things ARE hard, you DO work a lot, and this candle IS only $12. Every claim is true. The sleight of hand is what's missing: no single purchase is the problem, and no single purchase was ever going to be the comfort, either.",
      },
      {
        type: "p",
        text: "The delivery system got an upgrade too. The ad finds you at 11pm, already sad, already holding the device the checkout lives in. The card is saved. The friction is gone. Comfort is two taps away and the receipt goes somewhere you'll never look.",
      },
      { type: "h2", text: "The honest math, without the lecture" },
      {
        type: "p",
        text: "Here's what this blog won't do: tell you the lattes are why you don't own a house. They aren't. That lecture is both mathematically weak and emotionally useless, and the people who give it usually got their down payment from somewhere they don't mention.",
      },
      {
        type: "p",
        text: "But drift is real. Small comfort spending is designed to be invisible, and invisible spending compounds: a few hundred dollars a month of it is real money, the kind that funds an [emergency cushion](/learn/budgeting/building-a-savings-habit) or a [jar with your actual goal on it](/tools/budget/jars). The problem was never the lipstick. It's that nobody decided anything.",
      },
      { type: "h2", text: "Keep the comfort, take back the choice" },
      {
        type: "list",
        items: [
          "**Put joy in the budget on purpose.** A named amount for small pleasures, spent guilt-free, beats an unnamed leak you feel bad about. [Needs vs. wants](/learn/budgeting/needs-vs-wants) is the guilt-free version of this conversation.",
          "**Make the invisible visible once.** [Track a month of spending](/learn/budgeting/tracking-your-spending), just to see what comfort currently costs. No judging, just data.",
          "**Give the future a jar too.** The reason the treat wins every time is that it's the only goal in the room. A [savings jar](/tools/budget/jars) with a name on it argues back.",
          "**Notice the 11pm ads.** You can't unsee the pattern once you look for it: the pitch always arrives when you're tired, sad, or scrolling. That's not a coincidence; that's the targeting working.",
        ],
      },
      {
        type: "p",
        text: "Buy the lipstick when you choose to. Just don't let a marketing department convince you it's the only future you can afford. It isn't, and [the first $500](/learn/budgeting/building-a-savings-habit) is closer than the ads want you to believe.",
      },
    ],
  },
  {
    slug: "the-sale-rack-is-lying",
    title: "The Sale Rack Is Lying to You (Politely)",
    dek: "How 'saving 40%' became the most expensive habit in America.",
    date: "2026-07-07",
    tag: "Watch out",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Nobody spends money quite like someone who thinks they're saving it. The sale rack, the strikethrough price, the countdown timer on the checkout page: these aren't information. They're a mood, manufactured to move your hand.",
      },
      { type: "h2", text: "The anchor does the work" },
      {
        type: "p",
        text: "The crossed-out $80 next to the $48 price is called an anchor, and it works even when you know about it. Your brain evaluates the $48 relative to the $80, not relative to whether you wanted the thing at all. Some 'original' prices barely existed; plenty of items are manufactured for the outlet or born for the sale, with the anchor printed on the tag from day one.",
      },
      { type: "h2", text: "Urgency is a costume" },
      {
        type: "p",
        text: "Only 3 left. Sale ends tonight. Someone in Dallas just bought this. Scarcity triggers a real instinct that served your ancestors well around actual scarce food, and serves a shoe website even better. The tell: real scarcity doesn't need a countdown clock, and the same clock is usually running again tomorrow.",
      },
      { type: "h2", text: "You don't save money by spending it" },
      {
        type: "p",
        text: "The receipt says you saved $32. Your account says you spent $48. Only one of those numbers is real. The question that survives every discount is the same boring one: would you have bought this at this price with no sale sticker anywhere in sight? If yes, congratulations, genuinely. If no, the discount was the product.",
      },
      {
        type: "list",
        items: [
          "**The 24-hour rule.** If it's still worth it tomorrow, it was worth it. Real sales survive a day; manufactured urgency doesn't.",
          "**Shop from a list, browse from curiosity, and know which one you're doing.** Both are fine. Confusing them is where the money goes.",
          "**Unsubscribe as self-defense.** The 40%-off email exists to create wants on a schedule. Your inbox doesn't have to be a billboard.",
          "**Count it where it lives.** A [month of honest tracking](/learn/budgeting/tracking-your-spending) shows what 'saving' has been costing you.",
        ],
      },
      {
        type: "p",
        text: "None of this means never buy things on sale. It means the sale is a price, not a reason. The reason has to be yours.",
      },
    ],
  },
  {
    slug: "why-tapping-doesnt-hurt",
    title: "Why Tapping Your Phone Doesn't Feel Like Spending",
    dek: "Cash had a built-in ouch. We engineered it away, and the receipts show it.",
    date: "2026-07-07",
    tag: "Noticed",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Handing over cash hurts a little. Researchers call it the pain of paying: watching physical money leave your hand registers, faintly, in the same brain regions as actual discomfort. That tiny ouch was never a bug. It was your built-in spending brake.",
      },
      {
        type: "p",
        text: "Then we spent thirty years engineering the ouch away. Cards hurt less than cash. Saved cards hurt less than swiped ones. One-click hurts less than checkout. Tap-to-pay barely registers as an event, and the watch is faster than the phone. Every step was sold as convenience, and every step was also, quietly, anesthesia.",
      },
      { type: "h2", text: "Frictionless is a business model" },
      {
        type: "p",
        text: "Companies A/B-test checkout flows the way pit crews shave seconds, because the math is simple: every removed step recovers abandoned purchases, and abandoned purchases are usually the ones you'd have talked yourself out of. The purchases friction used to filter were disproportionately the regrettable ones. That's exactly why the friction had to go.",
      },
      {
        type: "p",
        text: "Subscriptions run the same play across time: pay once invisibly, forever. And the pay-later buttons at checkout split even the number into pieces too small to flinch at. (We wrote about [why every app suddenly wants to lend you money](/blog/why-every-app-wants-to-lend-you-money); this is the same war on your flinch, different front.)",
      },
      { type: "h2", text: "Reinstalling the ouch, gently" },
      {
        type: "list",
        items: [
          "**Make the money visible again.** Check your balance before you tap, not after. Ten seconds restores most of what the tap removed.",
          "**Use a weekly cash experiment.** One week of paying cash for everyday stuff is the cheapest psychology course available. Most people report it feels weirdly expensive. That's the accurate feeling.",
          "**Turn on purchase notifications.** The buzz after each charge is an artificial ouch, and it works. Your bank buries this setting; [our banking guide](/learn/budgeting/avoiding-bank-fees) covers the account hygiene around it.",
          "**Review one statement a month, out loud if you have to.** [Tracking](/learn/budgeting/tracking-your-spending) is just the ouch, relocated to where it can't be engineered away.",
        ],
      },
      {
        type: "p",
        text: "Convenience is genuinely good. Pay however you like. Just know that an entire industry works on making spending feel like nothing, and the feeling of nothing is not the same as it costing nothing.",
      },
    ],
  },
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
