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
  {
    slug: "so-you-want-a-side-hustle",
    title: "So You Want a Side Hustle",
    dek: "Skip the LLC, the logo, and the personal brand. The first weekend is smaller than the internet says.",
    date: "2026-07-07",
    tag: "Real talk",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "The internet has a starter pack waiting for you: form an LLC, buy the domain, design a logo, set up the business Instagram, film a few reels about your entrepreneurial journey. Notice what's missing from that list. A customer.",
      },
      {
        type: "p",
        text: "The first weekend of a real side hustle is smaller, cheaper, and less photogenic than any of that. You need three things: one skill somebody will pay for, one channel where those somebodies can find you, and a price you won't resent. Everything else is decoration, and most of it can wait a year.",
      },
      { type: "h2", text: "One skill, one channel, one price" },
      {
        type: "p",
        text: "The skill is something you can do right now at a level worth paying for. Tutoring the class you aced. Editing photos. Assembling furniture. Running social media for the restaurant down the street. Not the thing you'd love to be paid for after six months of courses; that's a worthwhile project, but it's a different one.",
      },
      {
        type: "p",
        text: "The channel is wherever your first three customers already are: a group chat, a campus job board, the neighborhood app, a paper flyer at the laundromat. Pick one and post. A website persuades nobody who wasn't already persuaded, while a text that says \"she's good, use her\" does everything a personal brand was supposed to do, for free.",
      },
      {
        type: "p",
        text: "The price is the one you can say out loud and still feel fine about on the third job. Underpricing feels humble and safe, and it's the quiet killer of side hustles, because resentment compounds faster than revenue. If the number makes you slightly nervous, you're probably close.",
      },
      {
        type: "p",
        text: "And the LLC? You don't need it to start. The moment someone pays you, you're a sole proprietor by default, which is the legal system's way of saying: congratulations, you already have a business, paperwork pending.",
      },
      { type: "h2", text: "You're allowed to stay small" },
      {
        type: "p",
        text: "Hustle culture has one setting: scale. Every side gig is supposed to become an agency, then a course, then a personal brand with a podcast. But a side hustle is a tool, not an identity. A few hundred extra dollars a month aimed at a specific goal (the emergency fund, the flight home, the security deposit) is a complete success story even if it never gets a logo. You're also allowed to stop when the goal is met. Tools go back in the drawer.",
      },
      { type: "h2", text: "The tax part nobody mentions" },
      {
        type: "p",
        text: "When an employer pays you, taxes come out before the money lands. When a client pays you, nothing comes out. That doesn't mean you owe nothing; it means you're now your own withholding department. Self-employment income carries income tax plus both halves of Social Security and Medicare, and the bill arrives at tax time whether or not you saved for it.",
      },
      {
        type: "p",
        text: "The move is unglamorous: park a slice of every payment in a separate account before you spend a dollar of it, and leave it there. How big a slice, and how quarterly payments work, is covered in the [gig and 1099 taxes guide](/learn/taxes/gig-1099-taxes). The fuller honest math of side income, including when a hustle isn't worth your hourly rate, lives in [side hustles, honestly](/learn/budgeting/side-hustles-honestly).",
      },
      {
        type: "p",
        text: "So skip the logo this weekend. Text three people, do one job, get paid once, put a slice away for the IRS. That's a real business, day one. The Instagram can wait until there's a business worth photographing.",
      },
    ],
  },
  {
    slug: "cash-stuffing-is-back",
    title: "Cash Stuffing Is Back, and It Was Never Wrong",
    dek: "TikTok rediscovered a budgeting method older than the checking account. It went viral for a reason.",
    date: "2026-07-07",
    tag: "Noticed",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Somewhere on TikTok right now, a pair of hands with immaculate nails is dealing crisp twenties into pastel laminated envelopes labeled GAS, GROCERIES, and FUN. The video has a few million views. The method is older than the creator's grandmother.",
      },
      {
        type: "p",
        text: "Cash stuffing is the envelope system: withdraw your spending money in cash at the start of the month, divide it into envelopes by category, and when an envelope is empty, that category is done spending. No app, no spreadsheet, no gray area. Depression-era households ran on it, and so did plenty of immigrant kitchens with an envelope taped inside a cabinet door.",
      },
      { type: "h2", text: "Why an old method went viral" },
      {
        type: "p",
        text: "Because it fixes the exact thing modern payment tech broke. Tapping a phone doesn't feel like spending; we've written about [why the tap doesn't hurt](/blog/why-tapping-doesnt-hurt), and cash stuffing is the same insight run in reverse. Handing over physical bills stings a little, and watching an envelope get thinner is a budget you can feel in your fingers. The method makes money physical again, in an economy that spent thirty years making it abstract.",
      },
      {
        type: "p",
        text: "It also gets the hard part of budgeting right: the decision happens once, at the start of the month, when you're calm. The envelope enforces it later, when you're tired at a checkout. Every budgeting method that works does some version of this; cash does it with zero interface.",
      },
      { type: "h2", text: "Where it falls apart" },
      {
        type: "p",
        text: "Rent doesn't want an envelope. Neither does the phone bill, the streaming stack, or anything on autopay; the biggest lines in your budget are digital whether you like it or not. Cash also earns nothing sitting in a binder, and unlike a bank balance, it isn't FDIC-insured against fire, theft, or a roommate's bad month. A binder holding a month of spending money is a real loss risk that a debit card simply isn't. And there's a practical ceiling: some landlords and most of the internet won't take bills at all.",
      },
      { type: "h2", text: "The hybrid most people land on" },
      {
        type: "p",
        text: "Keep the fixed, boring bills digital and on autopay. Then take the categories where you actually overspend (food, fun, the mall) and give them hard limits: paper envelopes if the physical sting helps you, digital ones if it doesn't. Our [savings jars](/tools/budget/jars) tool is the envelope idea without the binder: named amounts, visible balances, an obvious moment when a jar runs dry.",
      },
      {
        type: "p",
        text: "Cash stuffing is one member of a bigger family, and the [budgeting methods guide](/learn/budgeting/budgeting-methods) lines envelopes up against 50/30/20 and zero-based budgeting so you can pick by personality rather than by trend.",
      },
      {
        type: "p",
        text: "The kids with the laminated envelopes aren't being naive. They noticed that the frictionless economy was engineered to be easy to spend in, and they added the friction back by hand. You don't need the pastel binder. You need the part where the money is visible and the limit is real, and however you get that is correct.",
      },
    ],
  },
  {
    slug: "grandmas-money-rules-fact-checked",
    title: "Grandma's Money Rules, Fact-Checked",
    dek: "Five classic sayings, one loving audit. The wisdom holds up better than you'd think.",
    date: "2026-07-07",
    tag: "Real talk",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Every family has them: the money rules that arrive with dinner, delivered by a grandmother who survived things you've only read about. Save your money. Don't trust banks, or trust nothing but banks, depending on the grandmother. Buy land. Before dismissing any of it as outdated, it's worth remembering what these rules are: survival wisdom, compressed for transport across generations. They kept families fed through depressions, migrations, and currency collapses. They don't need replacing. Some of them need a version update.",
      },
      { type: "h2", text: "\"Save 10% of everything.\" Verdict: directionally great" },
      {
        type: "p",
        text: "The number matters less than the reflex, and the reflex is the whole game: some slice of every dollar that arrives never gets spent. Ten percent is a fine default. What grandma couldn't have told you is where the slice should go first, because that depends on things her era didn't have, like employer 401(k) matches and 20%-interest credit cards. The modern sequencing lives in the [money order of operations](/learn/budgeting/money-order-of-operations); her instinct sits at the top of it, unchanged.",
      },
      { type: "h2", text: "\"Cash is king.\" Verdict: half-true now" },
      {
        type: "p",
        text: "In her day, cash was privacy, discipline, and proof all at once. The discipline part still works: physical money hurts a little to spend, which is [exactly the point](/blog/why-tapping-doesnt-hurt). But cash earns no interest, isn't insured in a coffee can, and can't pay rent through a portal. Cash remains a useful tool for the categories where you overspend. As a kingdom, it has been downsized to a duchy.",
      },
      { type: "h2", text: "\"We don't talk about money.\" Verdict: this one has to go" },
      {
        type: "p",
        text: "The rule made sense when it was written; talking about money once invited envy, gossip, and sometimes real danger. But silence has a compounding cost. Families that never discuss salaries, debt, or how anything got paid for end up re-learning every lesson from scratch, one generation at a time. Nobody finds out that the aunt negotiated her salary, that the down payment came with help, that the uncle's business nearly failed twice. The information that would change your decisions stays locked inside the people who love you most. There's a whole guide on [breaking that silence gently](/learn/budgeting/talking-about-money-with-family), because the first conversation is the hard one.",
      },
      { type: "h2", text: "\"Buy land. A house is always a good investment.\" Verdict: it depends" },
      {
        type: "p",
        text: "For grandma's generation this was often true, and for families locked out of every other wealth-building tool it was sometimes the only one available, which is why she says it with such force. It's still sometimes right. But \"always\" can't survive the math of a specific case: prices, rates, how long you'll stay, and what renting costs instead all decide the answer. The honest comparison lives in [renting vs. buying](/learn/home-ownership/renting-vs-buying). Respect the rule by running the numbers, not by obeying it.",
      },
      { type: "h2", text: "\"A penny saved is a penny earned.\" Verdict: she undersold it" },
      {
        type: "p",
        text: "A penny you earn gets taxed before you ever touch it. A penny you don't spend already made it through. Depending on [your tax bracket](/learn/taxes/tax-brackets-explained), a dollar saved can be worth noticeably more than a dollar of new income, because saving happens after taxes and earning happens before them. She was handing you a tax strategy disguised as a proverb.",
      },
      {
        type: "p",
        text: "Final tally: one keeper, one half-keeper, one retirement, one \"run the numbers,\" and one that was more right than she knew. Not bad for advice built without spreadsheets. The rules were never really the point, anyway. The point is that someone who had less than you found a way through, compressed what worked into a sentence, and handed it to you for free. The least you can do is keep the good parts updated.",
      },
    ],
  },
  {
    slug: "the-group-dinner-problem",
    title: "The Group Dinner Problem",
    dek: "Splitting a bill is easy. Splitting it fairly, with people you love, on different budgets: that's the hard part.",
    date: "2026-07-07",
    tag: "Noticed",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "The bill arrives and the table performs its little ritual. Someone says split it evenly. Someone quietly recalculates what they ordered. Someone had two cocktails and the lobster and is enthusiastically in favor of even splitting. And someone, at every table, is doing math about their week.",
      },
      {
        type: "p",
        text: "Friendship has economics, and nobody hands you the syllabus. The group dinner is the entry-level course. The advanced curriculum is the bachelorette weekend, the group trip \"somewhere cheap\" that ends up costing $900, and wedding season, which functions as an annual surprise tax on being loved.",
      },
      { type: "h2", text: "The even split is a policy, not a kindness" },
      {
        type: "p",
        text: "Splitting evenly feels smooth and generous, and across one dinner the difference is noise. Across a whole social calendar, the water-and-appetizer friend is quietly subsidizing the friend who orders like a senator, and both of them would be embarrassed to say so. The other direction has its own villain: the $4.50 Venmo request, itemized with the warmth of a utility company. Somewhere between \"everything is communal\" and \"I have invoiced you for your fries\" is where friendship actually lives, and every group has to find the spot for itself.",
      },
      {
        type: "p",
        text: "(However you settle up, it's worth knowing the mechanics of the apps doing the settling. [Payment-app safety](/learn/money-safety/payment-app-safety) covers why those balances aren't bank accounts, and what to check before money moves.)",
      },
      { type: "h2", text: "The subsidy nobody mentions" },
      {
        type: "p",
        text: "Some friends' rent is quietly covered. Some are on the family phone plan, drive an old family car, and know an emergency would be caught. None of that is a character flaw; it's luck, and it's often invisible even to the person who has it. But it means that when they say a weekend is \"only\" $200, they're describing their reality accurately. Yours may cost the same on paper and twice as much in practice, because [what a life costs](/learn/budgeting/cost-of-living) depends enormously on who's helping to pay for it. Two friends at the same table, earning the same wage, can be living in different economies.",
      },
      { type: "h2", text: "Saying the number out loud" },
      {
        type: "list",
        items: [
          "**Name your budget while the plan is still soft.** \"I can do about $30 for this\" said in the group-chat phase is planning information. Said when the check arrives, it's an incident.",
          "**Suggest the cheaper plan yourself.** The taco spot instead of the tasting menu, the picnic instead of the rooftop. Watch how fast everyone agrees. Half the table was waiting for permission.",
          "**Itemize big bills without apology.** The apps take thirty seconds. Being precise about money is how you protect a friendship from resentment, not evidence that you lack chill.",
          "**Treat weddings and trips as budget events.** They're knowable months ahead. A named amount you save toward turns an ambush into a plan, and turns \"I can't this time\" into an answer you can give early instead of late.",
        ],
      },
      {
        type: "p",
        text: "None of this is stinginess; it's maintenance. Money silence doesn't protect friendships, it slowly bills them. The friends worth keeping would rather have you at the cheap table all year than watch you disappear after the expensive one.",
      },
    ],
  },
  {
    slug: "why-everyone-online-seems-rich",
    title: "Why Everyone Online Seems Rich",
    dek: "Your feed shows purchases, never balances. That changes the math of comparison.",
    date: "2026-07-07",
    tag: "Watch out",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Scroll for five minutes and take inventory: the apartment tour, the airport lounge, the unboxing, the \"little treat\" haul, the friend from high school on a boat. Everyone seems to be doing fine. Better than fine. Everyone except, somehow, you.",
      },
      {
        type: "p",
        text: "We've written about [fake financial gurus](/blog/how-to-spot-a-fake-financial-guru), the ones renting Lamborghinis to sell you a course. This is about something trickier: regular people, your actual peers, who aren't selling anything. They're not lying, exactly. The feed is doing the lying for them.",
      },
      { type: "h2", text: "The feed shows purchases, not balances" },
      {
        type: "p",
        text: "A camera can capture a dinner, an outfit, a trip, a car. It cannot capture a checking account, a card balance, a student loan, or the specific dread of the 27th of the month. So the visible layer of everyone's life is their spending, and the invisible layer is what the spending did to them. A financed haul photographs identically to a paid-off one. The friend on the boat might be wealthy, might be one of nine people splitting a rental, might be twelve payments into a personal loan. The photo is the same photo.",
      },
      { type: "h2", text: "The geometry of the comparison" },
      {
        type: "p",
        text: "The mismatch is structural. You experience your own finances in full: every balance, every debt, every anxious 1am math session. You experience everyone else's finances as a highlight reel of their best purchases. So the comparison is never fair; you're weighing your complete financial reality against a hundred people's single best moment each. Even a feed made entirely of people who are struggling will look rich, the same way a hundred people's vacation photos make it look like everyone is always on vacation.",
      },
      { type: "h2", text: "The platforms take a cut of the feeling" },
      {
        type: "p",
        text: "Feeling behind is profitable. The moment the feed convinces you everyone else is ahead, you're a prime audience for the ad two posts later, which is happy to sell you the thing that closes the gap. Buy it and your haul joins someone else's feed, and the loop feeds itself. None of this requires anyone to lie. It only requires everyone to post their best day, and an algorithm to stack a thousand best days into your worst hour.",
      },
      { type: "h2", text: "The only balance sheet you can see" },
      {
        type: "p",
        text: "There is exactly one financial reality you get full access to: your own. What you own minus what you owe is one honest number that no filter touches. Our [net worth tool](/tools/budget/net-worth) does the arithmetic in a few minutes, and it quietly relocates your attention from other people's purchases, which you can't verify, to your own position, which you can improve.",
      },
      {
        type: "p",
        text: "That number might be small or negative; early ones usually are, and notice that nobody posts theirs either. But it's real, it's yours, and watching it move beats watching strangers spend. The feed will keep performing wealth. You get to build the kind that doesn't need an audience.",
      },
    ],
  },
  {
    slug: "spacex-ipo-what-actually-happened",
    title: "SpaceX Went Public. Here's What Your Feed Left Out.",
    dek: "The biggest IPO in history is a free masterclass in how IPOs treat regular buyers.",
    date: "2026-07-07",
    tag: "Noticed",
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "On June 12, SpaceX started trading on the Nasdaq under SPCX, and for one afternoon every group chat in America became an investment committee. Largest IPO ever: $86 billion raised, a $1.77 trillion valuation at pricing. The rocket company was finally buyable, and the fear of missing the next Apple did what it always does.",
      },
      {
        type: "p",
        text: "This post isn't a buy or a don't-buy. It's the part your feed skipped: what mechanically happened that day, because it's the single best live lesson in [how IPOs actually work](/learn/investing/what-is-an-ipo) that anyone will get for years.",
      },
      { type: "h2", text: "Who got $135, and who got $161" },
      {
        type: "p",
        text: "The offering price was $135 a share. That price went almost entirely to institutions: banks, funds, and clients of the underwriters. When trading opened to everyone else, the first public trades printed around $150, and the day closed at $161, a 19% pop. If you bought on IPO day, you didn't buy the IPO. You bought from someone who did, at their markup. That gap between the offering price and your price has a whole [guide of its own](/learn/investing/opening-vs-offering-price), and June 12 was the textbook running in real time.",
      },
      { type: "h2", text: "The float and the calendar" },
      {
        type: "p",
        text: "Only about 5% of the company actually traded. Insiders agreed not to sell for 366 days, other early investors for 180. Which means the supply of SpaceX shares is scheduled to grow substantially, on dates anyone can look up, while first-day demand got one afternoon of maximum hype. Prices are set by supply and demand; one of those two is on a public calendar. Also worth knowing: buying SPCX gets you almost no say in anything, since one person retains 82% of the voting power through super-voting shares.",
      },
      { type: "h2", text: "The boring plot twist" },
      {
        type: "p",
        text: "If SpaceX earns its way into the big stock indexes, the index funds most retirement accounts hold will buy it automatically, at whatever the fair-ish market price is then, and you'll own your slice without lifting a finger or paying the hype tax. That's not a thrilling sentence. It wasn't designed to be. [Index funds](/learn/investing/index-funds-explained) never are.",
      },
      {
        type: "p",
        text: "Rooting for the rockets costs nothing. If you also want to own a piece, know which price you're actually being offered, who's selling in six months, and whether a single exciting stock belongs in [the plan you already have](/learn/investing/risk-and-diversification). Excitement is free. Concentration isn't.",
      },
    ],
  },
  {
    slug: "the-parlay-is-not-a-plan",
    title: "The Parlay Is Not a Plan",
    dek: "Sports betting apps turned gambling into a hobby with a login. The math didn't change.",
    date: "2026-07-07",
    tag: "Real talk",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Somewhere tonight a 23-year-old will turn $20 into $1,400 on a five-leg parlay, post the slip, and become the most famous person in his group chat for a week. The app will make sure everyone sees it. What the app won't post is the other four hundred slips that died on leg three.",
      },
      {
        type: "p",
        text: "No lecture coming. Betting is legal, it's everywhere sports are, and pretending people will simply stop is how financial advice gets ignored. But the apps work hard to blur one line, and it's worth redrawing: betting is entertainment with a price, and the parlay is the most expensively priced item on the menu.",
      },
      { type: "h2", text: "Why the parlay specifically" },
      {
        type: "p",
        text: "Each leg of a parlay carries the sportsbook's edge, and multiplying legs multiplies the edge against you. That's why the payouts look so spectacular: they're priced like lottery tickets because they hit like lottery tickets. Sportsbooks promote parlays relentlessly and boost them with flashy odds for the same reason grocery stores put candy at the register. It's their highest-margin shelf.",
      },
      { type: "h2", text: "The app is not on your side" },
      {
        type: "p",
        text: "Free bets that only pay out as more betting. Streaks, missions, and daily rewards borrowed straight from mobile games. Deposit matches when you've been quiet too long. If a stock brokerage marketed like this, regulators would be circling; the design goal is the same one from [the tap-to-pay story](/blog/why-tapping-doesnt-hurt): make the money leaving feel like nothing.",
      },
      { type: "h2", text: "Price it like a hobby, because it is one" },
      {
        type: "list",
        items: [
          "**Give it a budget line with a number.** Entertainment money, decided in daylight, spent without guilt. When it's gone, the season's fun budget is gone. [Needs vs. wants](/learn/budgeting/needs-vs-wants) is the honest frame.",
          "**Never the rent, never the credit card.** Betting borrowed money is the one bright line. If deposits are landing on a card, that's the signal to stop and [talk to someone](/learn/budgeting/managing-financial-stress).",
          "**Keep the investing money in a different building.** The brain that wants a parlay is not the brain that builds wealth. [Boring wins that race](/learn/investing/saving-vs-investing), every decade, on purpose.",
          "**If it stops feeling optional, take it seriously.** The National Problem Gambling Helpline is 1-800-GAMBLER, free and confidential. Using it is a money move, not a confession.",
        ],
      },
      {
        type: "p",
        text: "Enjoy the games. Sweat a small slip with friends if that's your fun. Just keep the score honest: the app is a business, the parlay is its best product, and you are the margin.",
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
