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
  {
    slug: "the-boots-theory",
    title: "It's Expensive to Be Broke",
    dek: "Terry Pratchett explained it with a pair of boots. Your bank explains it with a $35 fee.",
    date: "2026-07-07",
    tag: "Real talk",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "In Terry Pratchett's novel Men at Arms, a cynical street cop named Sam Vimes works out why the rich stay rich, and he does it with boots. Good boots cost fifty dollars and last for years and years. Cheap boots cost ten, leak by the second winter, and have to be replaced again and again. So the man who can afford good boots spends less on boots over a decade than the man who can't, and the man who can't still ends up with wet feet. Vimes calls it the \"Boots\" theory of socioeconomic unfairness, and it may be the sharpest economics lecture ever smuggled into a fantasy novel.",
      },
      {
        type: "p",
        text: "Swap the boots for almost anything and the theory holds. Being broke comes with a surcharge, and it gets billed everywhere at once.",
      },
      { type: "h2", text: "The poverty premium, itemized" },
      {
        type: "p",
        text: "The overdraft fee is the purest specimen: a charge of $35 or so for the offense of having the least money, collected at the exact moment you have the least money. The person with a cushion never pays it. The person without one can pay it three times in a week, because the account was already scraping bottom when the charges landed.",
      },
      {
        type: "p",
        text: "The small pack is the boots theory at the grocery store. The big bottle is cheaper per load, per ounce, per everything, but it costs more today, and today is the only budget you have. Buying small is the rational move with $40 in the account, and it also means paying more, permanently, for the same detergent.",
      },
      {
        type: "p",
        text: "Then come the fees for not having a bank at all. Check-cashing storefronts take a slice of every paycheck just to turn it into money you can spend, a toll that people [without bank accounts](/learn/budgeting/unbanked-underbanked) pay over and over for the privilege of being paid. Utilities and landlords demand deposits from exactly the people who can't spare them, having decided, often by credit score, that they're the risky ones. And when the gap between paychecks won't close on its own, the [payday loan](/learn/government-aid/payday-loans-and-predatory-lending) is waiting: the most expensive money in America, priced precisely for people who are out of other options.",
      },
      {
        type: "p",
        text: "The appliances run the original script beat for beat. The used car that costs less up front and more every month it survives. The tires bought one at a time. The cheap fridge that dies in year three and takes a week of groceries with it. None of these are bad decisions. They're the only available decisions, and each one costs more over ten years than what somebody with cash up front would have paid.",
      },
      { type: "h2", text: "The thing you're being charged for is slack" },
      {
        type: "p",
        text: "Line up every item on that list and the pattern is the same. The system charges for having no margin. The fees were never really about boots or detergent or checks; they're the price of having zero dollars between you and a surprise, and it's the one price that people who can afford everything never pay.",
      },
      {
        type: "p",
        text: "Which is why the first few hundred dollars of savings behave nothing like an investment and everything like a fee-cancellation machine. Five hundred dollars of slack earns no interest worth mentioning. What it does instead is quietly delete overdraft fees, absorb the deposit, buy the big bottle, walk past the payday storefront, and turn a dead fridge from a crisis into an errand. No stock has ever returned what the first $500 returns to somebody who had zero, and the [starter fund sprint](/challenges/starter-fund-sprint) exists to get you exactly there. Not wealth. Slack.",
      },
      {
        type: "p",
        text: "Vimes never got a raise in that chapter, but he had the diagnosis right. The boots were never the problem; the being-unable-to-afford-the-good-boots was. Every dollar of slack you build is a fee somebody doesn't get to charge you anymore.",
      },
    ],
  },
  {
    slug: "the-tablet-will-ask-you-a-question",
    title: "The Tablet Will Ask You a Question",
    dek: "Tipping screens turned checkout into a small social experiment. You're allowed to walk in with answers.",
    date: "2026-07-07",
    tag: "Noticed",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "You order an iced coffee. The barista taps the register twice, and then it happens: the tablet swivels on its little stand to face you, the line stacks up behind you, the barista assumes an expression of professional neutrality, and three glowing buttons offer 20%, 25%, and 30% on a transaction that involved no table, no refills, and roughly eleven seconds of interaction. Below them, smaller, a custom option. Below that, smallest of all, a no-tip button styled to feel like a confession.",
      },
      {
        type: "p",
        text: "The flipped iPad is one of the great quiet social experiments of the decade, run millions of times a day. It works, and it's worth understanding exactly how.",
      },
      { type: "h2", text: "The buttons are doing the negotiating" },
      {
        type: "p",
        text: "Those presets are anchors, the same mechanism as the [crossed-out price on the sale rack](/blog/the-sale-rack-is-lying). Before the screen turned, you might have been thinking a dollar in the jar. The screen does not offer a dollar in the jar. It offers 20, 25, 30, and once you're choosing among them, the question has changed from \"do I tip for this?\" to \"which of these three tippers am I?\" Picking the smallest preset now registers as a small failure, which is a remarkable trick, because the smallest preset is often double what the jar used to get.",
      },
      {
        type: "p",
        text: "And the design leans on the one asset a checkout counter has that a website doesn't: a human being, watching, with a line behind you. The guilt is not a side effect of the tip screen. The guilt is the feature. These flows get tested and tuned like everything else you tap, and the version that makes you feel observed is the version that ships. It's the same industry that spent decades [making the payment itself feel like nothing](/blog/why-tapping-doesnt-hurt), now making the tip feel like everything.",
      },
      { type: "h2", text: "Why it's spreading to places tips never lived" },
      {
        type: "p",
        text: "The prompt has marched from coffee counters to bakeries to merch tables to self-checkout kiosks, which is a genuinely avant-garde development: a tip requested for service performed by you, payable to a machine. The economics explain the spread. A tip prompt costs the business nothing to display, and every dollar it extracts is compensation the payroll didn't have to cover. Expect the question anywhere a screen stands between you and a receipt.",
      },
      { type: "h2", text: "Where the money goes" },
      {
        type: "p",
        text: "Honestly: it varies. US federal law says tips belong to workers, and an employer generally can't pocket them. But between the screen and a paycheck sits a lot of plumbing. Some counters pool tips across a shift, some split by hours worked, digital tips can land on payroll weeks later, and at an unstaffed kiosk the line between \"tip\" and \"revenue\" gets blurry in ways nobody prints on the screen. If it matters to you, ask the person at the counter whether the tips reach them. They'll tell you, and their face will tell you first.",
      },
      { type: "h2", text: "Kind rules for the screen age" },
      {
        type: "list",
        items: [
          "**Tip service humans well.** The server, the barber, the delivery driver, the barista who made you an actual thing. Tipped workers' base pay is built assuming the tip arrives; that part of the deal hasn't changed.",
          "**Feel zero guilt at a kiosk.** A machine cannot be stiffed. You bagged the groceries. The service was yours.",
          "**Decide your defaults before the screen does.** A counter-coffee number, a sit-down number, a delivery number, chosen at home, calmly, once. Then the tablet is just displaying options you already priced. A [month of tracking](/learn/budgeting/tracking-your-spending) will show you what your current under-pressure defaults have been costing.",
          "**Custom is a real button.** Using it in front of a line is allowed. Nobody behind you is grading as hard as the screen wants you to think.",
        ],
      },
      {
        type: "p",
        text: "The tablet is going to keep asking; that's fine. The screen gets to pose the question. It doesn't get to write your answer while an audience watches, unless you show up without one.",
      },
    ],
  },
  {
    slug: "everything-is-surge-priced",
    title: "Everything Is Surge-Priced Now",
    dek: "Dynamic pricing escaped the rideshare app. Your best defenses are older than the algorithm.",
    date: "2026-07-07",
    tag: "Noticed",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Surge pricing used to live in one place. It rained, the little map turned red, your ride home cost 2.1x, and you grumbled about it in the group chat. That was the deal: one app, one gimmick, clearly labeled.",
      },
      {
        type: "p",
        text: "The gimmick got out. Concert tickets now climb while you sit in the queue, repriced as \"official platinum\" the moment demand shows up. Delivery fees flex with the dinner rush. Airlines have repriced by the hour since before you were born; they were the prototype. And grocery chains are rolling out electronic shelf labels, which today mostly save an employee a night of sticker-swapping, and which also mean the price of chicken can now change between the parking lot and aisle five. The stores insist they won't use it that way. The point is that the question has become one of restraint rather than capability.",
      },
      { type: "h2", text: "Why companies love it" },
      {
        type: "p",
        text: "A fixed price leaves money on the table, from the seller's point of view. Some customers would have paid more; the tag let them keep the difference. Dynamic pricing is an instrument for finding each buyer's personal maximum and charging exactly that. Economists call the family of techniques price discrimination, a neutral term for a simple ambition: nobody ever pays less than the most they would have agreed to.",
      },
      {
        type: "p",
        text: "What feeds the instrument is data: the time of day, the demand around you, your booking history, your loyalty account, how many times you've opened the app to look at the same flight. Companies mostly insist they price the market, never the person. Maybe so. From your side of the screen, the two are indistinguishable, and there's no receipt line that says what the price would have been for someone else.",
      },
      { type: "h2", text: "Defenses that don't require a spreadsheet" },
      {
        type: "list",
        items: [
          "**Set alerts and let a robot do the watching.** Price alerts on flights and tickets flip the surveillance around: instead of the algorithm studying your urgency, a tool studies the price and calls you when it dips.",
          "**Treat patience as leverage.** Surge pricing is a tax on urgency, and most urgency is optional. The red map fades in twenty minutes. The queue re-opens. If you can wait, you become the one customer the algorithm has no grip on.",
          "**Know your walk-away number before you look.** Decide what the ticket or the flight is worth to you, in advance, based on [what your life actually costs](/learn/budgeting/cost-of-living). The [sale rack](/blog/the-sale-rack-is-lying) uses a fake anchor to pull you up; a real number you chose in daylight anchors you back.",
        ],
      },
      {
        type: "p",
        text: "There's no opting out of dynamic pricing; it's the water now. But the machine has one dependency it can't engineer away: it can only find your maximum if you never decided one. Walk in with a number, and the surge stops being a lever on you and goes back to being weather.",
      },
    ],
  },
  {
    slug: "the-cancel-button-is-hidden",
    title: "The Cancel Button Is Hidden on Purpose",
    dek: "A field guide to dark patterns: the roach motel, the shame button, and the box that checked itself.",
    date: "2026-07-07",
    tag: "Watch out",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Signing up took one tap. The app remembered your card, the trial started instantly, confetti may have been involved. Now try to leave. Suddenly you're on the desktop site, logged in again, hunting through Account, then Membership, then Manage Plan, until you reach the final boss: a phone number, staffed weekdays only, in a time zone that is not yours.",
      },
      {
        type: "p",
        text: "That asymmetry has a name. Designers call these dark patterns: interface choices built to steer you somewhere you wouldn't have gone on purpose. Once you can name them, you see them everywhere.",
      },
      { type: "h2", text: "A short field guide" },
      {
        type: "list",
        items: [
          "**The roach motel.** Easy in, hard out. The effort gap is the strategy: every extra screen on the way out retains some percentage of people who give up and keep paying.",
          "**Confirm-shaming.** The decline button written in first person to humiliate you: \"No thanks, I hate saving money.\" A company that needs you to insult yourself on the way out is telling you something about the offer.",
          "**The pre-checked box.** The protection plan, the newsletter, the second subscription riding quietly along in your cart. Consent, pre-poured.",
          "**The fake countdown.** The timer hits zero, you refresh, it's reborn. We covered its natural habitat in [the sale rack post](/blog/the-sale-rack-is-lying).",
          "**The disappearing cancel path.** Renamed, buried, moved behind a chat agent, or barricaded with three consecutive \"pause instead?\" offers. Each screen peels off a few more people.",
        ],
      },
      { type: "h2", text: "Where the rules stand" },
      {
        type: "p",
        text: "Regulators have spent years pushing a plain principle: canceling should be as easy as signing up. Industry lawyers have spent the same years arguing otherwise, and the rules keep getting written, challenged, and rewritten. Whatever the state of that fight when you read this, don't build your plans on it. Treat the exit as your job to find, and be pleasantly surprised if the law ever hands you a map.",
      },
      { type: "h2", text: "Your side of the counter" },
      {
        type: "list",
        items: [
          "**Calendar the trial before you start it.** The moment you tap \"start free trial,\" set a reminder two days before billing. Future-you gets a decision instead of a charge.",
          "**Screenshot the terms at signup.** Price, renewal date, the page that says how to cancel. Thirty seconds now; evidence later, when the terms have quietly moved.",
          "**Sweep on a schedule.** A statement read plus a cancellation pass, a couple of times a year. The [subscription audit](/challenges/subscription-audit) walks the whole routine step by step.",
          "**Escalate calmly when you're genuinely trapped.** Ask in writing first; the scripts in [negotiating your bills](/learn/budgeting/negotiating-your-bills) work on retention agents too. If you canceled and they keep charging, a dispute with your bank is what disputes are for.",
        ],
      },
      {
        type: "p",
        text: "None of these patterns can beat a person with a calendar reminder and a screenshot. They only need you tired, and they're patient. Here's the tell worth remembering: a company confident you'd choose to stay would never need to hide the door.",
      },
    ],
  },
  {
    slug: "money-dysmorphia",
    title: "Money Dysmorphia: When the Balance and the Feeling Disagree",
    dek: "Some people feel broke with a cushion. Some feel fine while sinking. The fix is the same in both directions.",
    date: "2026-07-07",
    tag: "Real talk",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "Two people check their money on the same Tuesday. One has several months of expenses saved and feels a low hum of dread anyway, recounting the numbers like they might have changed overnight. The other has a card balance growing quietly in an app they haven't opened since spring, and feels basically fine. Both are running on feelings that have stopped talking to the numbers. The internet has taken to calling this money dysmorphia, a label borrowed loosely from body-image language, and whatever you think of the term, the mismatch it points at is real, and it runs in both directions.",
      },
      { type: "h2", text: "Feeling broke with a cushion" },
      {
        type: "p",
        text: "If you grew up without, your settings were calibrated in years when the fear was accurate. Scarcity teaches a nervous system to treat every purchase as a threat and every balance as temporary, and those settings don't expire just because the balance changed. This is the machinery that [money stories you inherited](/learn/budgeting/money-stories-you-inherited) walks through: the alarm isn't stupidity, it's an old guard dog that never got the memo. But it has costs of its own. The dentist visit deferred for no reason, the constant background math, the strange guilt attached to a sandwich. Safety you can't feel doesn't do its full job.",
      },
      { type: "h2", text: "Feeling fine while sinking" },
      {
        type: "p",
        text: "The other direction wears calm as a disguise. The statements stay unopened, the app stays logged out, and the balance is known only \"roughly,\" with error bars that widen every month. This isn't laziness. Looking hurts, so the brain protects you from looking, the same way you'd avoid pressing a bruise; [managing financial stress](/learn/budgeting/managing-financial-stress) covers how honest that avoidance loop is, and how expensive. Because interest doesn't pause while you're not watching. The not-looking has a carrying cost, and it compounds.",
      },
      { type: "h2", text: "Feelings need data, on a schedule" },
      {
        type: "p",
        text: "The fix is identical for both people, which is the giveaway that the problem was never the balance. Feelings don't respond to lectures, including the ones you give yourself. They respond, slowly, to evidence, repeated on a schedule. So build the schedule: once a month, same day, ten minutes, you look at the real numbers. The [net worth tool](/tools/budget/net-worth) is built for exactly this, one honest figure, what you own minus what you owe, tracked over time.",
      },
      {
        type: "p",
        text: "For the anxious, the ritual becomes dated, accumulating proof to argue with the alarm: it was fine in March, fine in April, fine in May. For the avoidant, it means the number can no longer grow in the dark, and the dark was doing most of the damage; the real figure is usually smaller than the one imagination was drafting at 2am. Either way, a feeling that meets the same data twelve times a year eventually starts to update.",
      },
      {
        type: "p",
        text: "Your feelings about money were trained by the years you've lived, and they were doing their best with old information. Give them new information, monthly, in writing. Both versions of you deserve the one where the number and the feeling finally agree.",
      },
    ],
  },
  {
    slug: "lifestyle-creep-never-feels-like-creep",
    title: "Lifestyle Creep Never Feels Like Creep",
    dek: "Every raise you've ever gotten went somewhere. Each destination felt reasonable at the time.",
    date: "2026-07-07",
    tag: "Real talk",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "The raise was real. You saw the offer letter, you did the happy math on the bus, you told your mom. And yet, some months later, the end of the month feels exactly the way it used to feel: same margin, same small suspense before rent. The extra money went somewhere, and an audit would find nothing scandalous. No yacht, no habit. Just a slightly better everything.",
      },
      { type: "h2", text: "Why you can't see it happening" },
      {
        type: "p",
        text: "Each upgrade is defensible on its own. The apartment closer to work saves you an hour a day; that's not indulgence, that's sanity. The better groceries are health. The car that starts every time is reliability. Nobody's budget has a line item called creep, because creep is just twenty reasonable decisions holding hands.",
      },
      {
        type: "p",
        text: "Then the baseline resets. Psychologists call it hedonic adaptation: the nice thing feels luxurious for a few weeks, then becomes the floor, and the floor is invisible by definition. You don't wake up grateful for the dishwasher; you'd only notice its absence. Comfort upgrades convert themselves into necessities on a schedule, and the [small treats scale up right along with everything else](/blog/the-lipstick-effect): the $9 comfort becomes the $16 comfort without a single decision you could point to.",
      },
      {
        type: "p",
        text: "And your friends are creeping in formation. A cohort that earns more together upgrades together, so the dinner spots migrate upmarket, the trips get one notch nicer, and relative to your table, nothing changed at all. Creep is invisible precisely because everyone you calibrate against is creeping at the same rate.",
      },
      { type: "h2", text: "The defense has to happen before the money arrives" },
      {
        type: "p",
        text: "Willpower applied afterward loses this fight on schedule, because afterward the new income already has a lifestyle attached. The move that works is deciding before you and the new number have met. The week the raise lands (and it's worth [asking for one properly](/learn/budgeting/how-to-ask-for-a-raise)), split it on paper: a fixed slice to the future, the rest to your life, guilt-free and pre-forgiven. You never miss money you never metabolized.",
      },
      {
        type: "p",
        text: "The fully automatic version is bumping your [401(k) contribution](/learn/investing/what-is-a-401k) the same week the raise takes effect. The slice comes out before the paycheck hits checking, the baseline never learns it existed, and hedonic adaptation, for once, works for you: you adapt to the new take-home in weeks either way, so you may as well adapt to the version that keeps some.",
      },
      {
        type: "p",
        text: "None of this is austerity. You earned the raise; enjoying most of it is the point of having earned it. The question is only who decides where it goes: you, once, at the moment of maximum leverage, or the slow committee of upgrades that has never once voted no.",
      },
      {
        type: "p",
        text: "Creep only becomes visible in the rearview mirror, usually as a strange question years from now: how do I earn double what I did and still feel the same on the 28th? The answer will be twenty reasonable decisions. Take the next raise and make the first decision yourself.",
      },
    ],
  },
  {
    slug: "negotiating-feels-rude",
    title: "Why Negotiating Feels Rude When You Grew Up Broke",
    dek: "The offer comes in, and your whole body says: take it before they change their minds.",
    date: "2026-07-07",
    tag: "Real talk",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "The offer arrives and it's real: a number bigger than any you've been paid, from people who apparently want you. Somewhere you once read that you're supposed to counter. Your body has a different memo. Say yes now. Say thank you twice. Do not be greedy, do not be difficult, do not give them a single reason to remember they had other candidates.",
      },
      {
        type: "p",
        text: "If that voice sounds familiar, it's worth asking where it trained.",
      },
      { type: "h2", text: "Where the feeling comes from" },
      {
        type: "p",
        text: "Scarcity teaches gratitude-for-anything. When opportunities were rare in your family, treating one as the opening move of a conversation would have felt like taunting luck. Wanting more out loud had a social cost too: in a house where money was tight, asking was a way of being a burden, so you learned to pre-empt the no before anyone had to say it. And nobody modeled the script. Kids of professionals absorb it over dinner, the way you absorb a language: offers are openings, ranges exist, recruiters expect the call. That knowledge is inheritance, cheaper to pass down than money and nearly as valuable. If nobody handed it to you, your silence at offer time isn't a character trait. It's a missing file, and files can be added.",
      },
      { type: "h2", text: "What negotiation actually is" },
      {
        type: "p",
        text: "Not combat. An information exchange. The employer named a number based on what they know; you respond with information they don't have, about the market, your other options, the parts of the offer that matter to you. Companies budget salary as a range and rarely open at the top of it, which means the counter isn't an insult to the offer. It's the second half of a process they started. The recruiter does this every week; you'll do it a few times a decade. They will not faint.",
      },
      {
        type: "p",
        text: "And the first ask is a range, not a demand. \"I'm excited about this. Is there flexibility on the base?\" is a complete negotiation, survivable by every party involved. An offer pulled over one respectful question is vanishingly rare, and a company that would do it was going to be a miserable employer in eleven other ways. Read the whole package first ([here's how to read an offer](/learn/budgeting/reading-a-job-offer), since salary is only one line of it), and when you're ready for actual scripts, [the raise guide](/learn/budgeting/how-to-ask-for-a-raise) has them word for word. Gratitude and negotiation coexist fine. You can be genuinely thrilled and still ask.",
      },
      { type: "h2", text: "The part that isn't about you" },
      {
        type: "p",
        text: "Name the dynamic kindly: the people most likely to negotiate are the ones who could most afford the no. With a cushion and a fallback, countering is a low-stakes chat. When you need the job by next month, it feels like gambling rent on politeness. So the comfortable start higher, then compound that head start with every percentage raise after, while the grateful start low and compound that instead. None of it is your fault, and knowing the deck is stacked is part of playing anyway. The reflex itself is one of the [money stories you inherited](/learn/budgeting/money-stories-you-inherited): gratitude-for-anything kept your family safe once, and it earned its keep. At a salary discussion, it's overserving you.",
      },
      {
        type: "p",
        text: "You don't have to become a shark; nobody's asking for a personality transplant. One calm question, asked once, at the moment the leverage is yours. The people who taught you to be grateful wanted you safe. Being paid in full is the safest thing there is.",
      },
    ],
  },
  {
    slug: "your-credit-score-is-not-a-report-card",
    title: "Your Credit Score Is Not a Report Card",
    dek: "Three digits got promoted into a character grade. They measure something much narrower.",
    date: "2026-07-07",
    tag: "Real talk",
    readMinutes: 4,
    body: [
      {
        type: "p",
        text: "People put credit scores in dating profiles now. \"780+, swipe left if you have debt.\" The number gets confessed in the tone people once reserved for sins, or announced like a GPA at a family dinner. Somewhere along the way, a statistic invented so lenders could price risk got promoted into a grade on your soul, and it's worth demoting it back.",
      },
      { type: "h2", text: "What the number actually is" },
      {
        type: "p",
        text: "A credit score is a prediction: how likely is this borrower to repay as agreed. Its inputs are known, published, and boringly mechanical ([here's the full anatomy](/learn/credit/what-is-a-credit-score)): whether you've paid past bills on time, how much of your available credit you're using, how long you've had accounts, and a few smaller factors. Now notice everything that isn't in there. Your income isn't. Your savings aren't. The years you paid rent on the first of the month, in most cases, aren't. It has no field for the fact that you cover your grandmother's prescriptions or that you've never once missed a shift. It's a narrow instrument answering a narrow question for an audience of lenders, and it was never designed to know you.",
      },
      { type: "h2", text: "How a statistic got moralized" },
      {
        type: "p",
        text: "The vocabulary did half the work. \"Creditworthiness\" sounds like worthiness. \"Good credit\" and \"bad credit\" sound like good person and bad person, and the shame arrives on schedule. The other half is that the score punishes circumstances as if they were choices. A medical emergency, a layoff, a divorce, a childhood with nobody positioned to co-sign or add you to a card: all of it prints the same three digits as recklessness would. A thin file scores like a suspicious one, which means the system dings you for having been broke, not for having been bad. Stack on the folklore, like the stubborn myth that checking your own score hurts it (it doesn't, and [the myths guide](/learn/credit/credit-myths) retires the rest), and people end up afraid to even look at a number that was never a verdict on them.",
      },
      { type: "h2", text: "A situation, not a sentence" },
      {
        type: "p",
        text: "Here's what the moralizers miss: scores are mechanically repairable in a way reputations never were. Because the inputs are known, the [repair path](/learn/credit/repairing-credit) is procedural rather than redemptive. Catch up on what's behind, dispute what's wrong, let utilization drift down, let time pass. No essay, no apology, no character witnesses. The model doesn't hold grudges; it just weights recent history more than old history, so the score re-rates you the moment the data does. A 550 describes a stretch of your life. It has no opinion about you, because it cannot hold opinions. It's arithmetic.",
      },
      {
        type: "p",
        text: "Take the number seriously for what it gates: interest rates, apartments, sometimes a job. That's real, and it's worth the maintenance. Then decline the rest of the assignment. It grades a paper trail, not a person, and anyone who reads it as a soul, up to and including the 780-or-swipe-left crowd, is holding the instrument wrong. A low score is a situation. Situations end.",
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
