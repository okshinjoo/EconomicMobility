import type { Article } from "./types";

export const moneySafetyArticles: Article[] = [
  {
    slug: "how-to-spot-a-scam",
    order: 10,
    topicId: "money-safety",
    title: "How to Spot a Scam Before It Costs You",
    dek: "There are thousands of scams, but they almost all wave the same handful of red flags. Learn the instinct, not a list.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Scams change shape, but the warning signs stay the same.",
      "Pressure, secrecy, and weird payment methods are the giveaways.",
      "Real institutions don't rush you or punish you for double-checking.",
      "When in doubt, hang up and call the official number yourself.",
    ],
    body: [
      {
        type: "p",
        text: "You will get scam attempts. A text about a package, a call about your 'suspended' account, a job that pays too well, a stranger who's suddenly very interested in you. It's not because you're naive — it's because scammers send millions of these and only need a few people to bite. The good news: you don't have to memorize every scam in the world. Almost all of them lean on the same small set of tricks, and once you can feel those tricks coming, you can spot a brand-new scam you've never seen before.",
      },
      {
        type: "h2",
        text: "The red flags that show up again and again",
      },
      {
        type: "p",
        text: "When two or more of these stack up in the same message or call, treat it as a scam until you've proven otherwise — not the other way around.",
      },
      {
        type: "list",
        items: [
          "**It came out of nowhere.** You didn't sign up, apply, or reach out, but suddenly someone's contacting you about money.",
          "**It's urgent — act NOW.** 'Your account will be closed,' 'you'll be arrested,' 'the deal expires in an hour.' Panic is the point; it stops you from thinking.",
          "**They want a strange way to pay.** Gift cards, wire transfers, crypto, or a payment app like Zelle or Cash App. These are favorites because they're fast and almost impossible to reverse.",
          "**They tell you to keep it secret.** 'Don't tell anyone,' 'don't talk to your family,' 'this is just between us.' Real businesses never need you isolated.",
          "**They want you to 'verify' your info.** Your password, a code they texted you, your full Social Security number, your bank login. They're fishing.",
          "**It's too good to be true.** A prize you didn't enter, a job that pays a fortune for nothing, an investment that 'can't lose.' If it sounds unreal, it is.",
        ],
      },
      {
        type: "key",
        text: "Real institutions don't pressure you. Your bank, the government, and any honest company will let you hang up, take your time, and call them back. Anyone who *won't* let you do that is telling you everything you need to know.",
      },
      {
        type: "h2",
        text: "The one move that beats almost every scam",
      },
      {
        type: "p",
        text: "Whoever is contacting you, you can always stop and reach them a *different* way — one you find yourself. Don't trust the number that called you or the link in the text. Hang up, look up the official number (on the back of your card, on the real website, on a past bill), and call that.",
      },
      {
        type: "steps",
        items: [
          "Pause. Notice the pressure and the urgency — that feeling is the scam working.",
          "Don't click the link, don't pay, don't read out a code.",
          "Find the company's real contact info on your own, not from the message.",
          "Reach out through that and ask, 'Is this real?' A genuine problem will still be there in ten minutes.",
        ],
      },
      {
        type: "tip",
        text: "Scammers are great at faking caller ID and email addresses — the name on your screen can say 'Your Bank' or even a real agency. Never let what *appears* on your phone be your proof. Verify through a channel you chose.",
      },
      {
        type: "p",
        text: "You don't need to be suspicious of the whole world. You just need one calm habit: when money and urgency show up together, slow down and check it yourself. That single pause is what protects you.",
      },
    ],
    related: ["phishing-scams", "if-youve-been-scammed", "identity-theft"],
  },

  {
    slug: "identity-theft",
    order: 20,
    topicId: "money-safety",
    title: "Protecting Yourself From Identity Theft",
    dek: "When someone uses your name, your number, or your credit as if it were theirs — and the free tools that lock them out.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Identity theft is someone using your personal info to take money or credit.",
      "A free credit freeze is the single strongest defense you have.",
      "You can check your credit reports for free and catch problems early.",
      "If it happens, IdentityTheft.gov gives you a free recovery plan.",
    ],
    body: [
      {
        type: "p",
        text: "Identity theft is when someone gets hold of your personal information — your name, Social Security number, birth date, bank or card numbers — and uses it as if they were you. They might open a credit card in your name, take out a loan, file a tax return to grab your refund, or drain an account. The scary part is you often don't find out until the damage is done. The reassuring part: the strongest protections are free, and you can set most of them up in an afternoon.",
      },
      {
        type: "h2",
        text: "How it happens",
      },
      {
        type: "p",
        text: "Your info gets out in ordinary ways — a company you used got hacked, a phishing text tricked you, mail got stolen, or you typed something into a fake website. You rarely did anything 'wrong.' That's exactly why you protect yourself *before* there's a problem.",
      },
      {
        type: "h2",
        text: "Warning signs to watch for",
      },
      {
        type: "list",
        items: [
          "Bills, charges, or accounts you don't recognize.",
          "You get denied for credit you should easily qualify for.",
          "The IRS says a tax return was already filed in your name.",
          "Mail you expected (statements, cards) stops showing up, or strange mail starts.",
          "A debt collector calls about a debt that isn't yours.",
        ],
      },
      {
        type: "h2",
        text: "Your defenses, strongest first",
      },
      {
        type: "list",
        items: [
          "**Freeze your credit at all three bureaus.** A freeze locks your credit file so no one — including a thief — can open new credit in your name. It's free, it doesn't hurt your score, and you unfreeze it anytime you actually need credit. This is the big one.",
          "**Check your credit reports for free.** Go to *AnnualCreditReport.com* — the official free site — and look your reports over for accounts you don't recognize.",
          "**Use strong, unique passwords and two-factor authentication.** A different password for every important account (a password manager makes this painless), plus a second step like a code, means one leaked password doesn't unlock your whole life.",
          "**Guard your Social Security number.** Don't carry your card, don't read your number aloud in public, and ask 'why do you need it?' before handing it over.",
        ],
      },
      {
        type: "key",
        text: "If you do one thing after reading this, freeze your credit at all three bureaus. It quietly blocks the most expensive kind of identity theft — someone opening new accounts in your name — and costs you nothing.",
      },
      {
        type: "h2",
        text: "If it happens to you",
      },
      {
        type: "p",
        text: "Don't panic, and don't waste time being embarrassed. Go to *IdentityTheft.gov*, the Federal Trade Commission's free site. You tell it what happened, and it builds you a step-by-step recovery plan — the letters to send, who to call, what to dispute. Act quickly: the sooner you report fraudulent accounts, the easier they are to wipe off your record.",
      },
      {
        type: "p",
        text: "Identity theft can feel like a violation, but it's a problem with a known fix. Lock your credit down now, keep half an eye on your reports, and you've taken away most of a thief's power before they ever try.",
      },
    ],
    related: ["credit-freeze", "protecting-your-documents", "if-youve-been-scammed"],
  },

  {
    slug: "phishing-scams",
    order: 30,
    topicId: "money-safety",
    title: "Phishing, Smishing, and Fake Texts",
    dek: "The fake bank email, the 'your package is held' text, the call from 'fraud prevention' — and the one rule that beats all of them.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Phishing is a fake message designed to make you click or hand over a secret.",
      "It comes by email, text (smishing), and phone — pretending to be someone you trust.",
      "Look for mismatched links, urgency, and requests for codes or passwords.",
      "Never click — go to the real app or site yourself, or call the number on your card.",
    ],
    body: [
      {
        type: "p",
        text: "Phishing is a fake message pretending to be someone you trust — your bank, the IRS, a delivery company, a job, even a friend — built to get you to do one of two things: click a link that steals your login, or hand over a password or security code directly. By text it's sometimes called 'smishing'; by phone, 'vishing.' Different channels, same trick. These messages are getting good — clean logos, real-sounding language — so you can't rely on 'it looks official.' You need a habit instead.",
      },
      {
        type: "h2",
        text: "What these messages tend to look like",
      },
      {
        type: "list",
        items: [
          "**'Suspicious activity on your account — click to verify.'** The link goes to a fake login page that captures whatever you type.",
          "**'Your package couldn't be delivered. Update your details here.'** You weren't even expecting a package, but you click anyway.",
          "**'This is your bank's fraud department. Read me the code we just texted you.'** That code is the key to *your* account — and they're trying to get in.",
          "**'You owe back taxes / a fee — pay now or face arrest.'** Real agencies don't operate by surprise text or threatening call.",
        ],
      },
      {
        type: "h2",
        text: "The tells",
      },
      {
        type: "list",
        items: [
          "The link doesn't match — hover or long-press it and the real address is some random site, not your bank's.",
          "Urgency and threats: act now, your account closes, you'll be charged, you'll be arrested.",
          "It asks for something no real company asks for by message: your full password, a one-time code, your full SSN, your card's PIN.",
          "Small weirdness — odd grammar, a greeting with no name, an email address that's almost-but-not-quite right.",
        ],
      },
      {
        type: "key",
        text: "A real bank or company will never ask you for your full password or for a one-time code they sent you. Those codes exist to keep people *out* of your account — if someone asks you to share one, they're the person trying to get in.",
      },
      {
        type: "h2",
        text: "The golden rule",
      },
      {
        type: "p",
        text: "Don't click the link. Don't call the number in the message. Instead, reach the company the way you normally would — open their official app, type their website address yourself, or call the number printed on the back of your card. If the alert was real, you'll see it there. If it wasn't, you just dodged a scam and lost nothing.",
      },
      {
        type: "tip",
        text: "Got a suspicious text? Don't reply — not even 'STOP.' Any reply tells the scammer a real person is on the line. Just delete it, and on most phones you can forward spam texts to 7726 (SPAM) to report them.",
      },
      {
        type: "p",
        text: "You don't have to figure out whether each message is fake. You just have to refuse to act *inside* it. Go to the source yourself, every time, and phishing simply stops working on you.",
      },
    ],
    related: ["how-to-spot-a-scam", "identity-theft", "if-youve-been-scammed"],
  },

  {
    slug: "fake-check-scams",
    order: 10,
    topicId: "money-safety",
    title: "Fake Checks and Overpayment Scams",
    dek: "They send you a real-looking check, ask you to send part of it back, and leave you owing the bank everything when it bounces.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "A check showing as 'available' in your account has not actually cleared yet.",
      "Scammers exploit that gap: deposit our check, send some back, then it bounces.",
      "When the check bounces, the bank takes back every dollar — from you.",
      "Never send money back from a check someone else sent you.",
    ],
    body: [
      {
        type: "p",
        text: "This scam fools careful, honest people because it abuses something true about how banks work. Someone sends you a check — for a job, a sale, a 'prize,' a 'mystery shopper' gig — and it's for *more* than expected. They ask you to deposit it and send the extra back, or forward part of it to a 'vendor.' Your bank shows the money in your account, so it feels real. Days later the check turns out to be fake, the bank yanks the funds back, and the money you already sent is gone — from your pocket.",
      },
      {
        type: "h2",
        text: "Why the bank 'showing' the money fools everyone",
      },
      {
        type: "p",
        text: "By law, banks usually make deposited funds *available* within a day or two — but available is not the same as cleared. Clearing means the check actually went back to the sender's bank and the money truly moved, which can take many more days. During that gap, the money looks like yours, but if the check is fake, it never existed. When it finally bounces, the bank reverses the deposit and you're responsible for whatever you spent or sent.",
      },
      {
        type: "key",
        text: "Money showing up in your account does *not* mean a check has cleared. A check can bounce days or even weeks after the funds appear — and you're on the hook for every dollar you moved in the meantime.",
      },
      {
        type: "h2",
        text: "How to recognize it",
      },
      {
        type: "list",
        items: [
          "You're paid by check for a job and then asked to buy 'supplies' or 'equipment' and send money on.",
          "A buyer for something you're selling online 'accidentally' sends too much and asks for the difference back.",
          "A 'mystery shopper' role wants you to deposit a check and wire-test part of it.",
          "Any setup where someone gives you money and then needs some of it returned, fast, by wire, gift card, crypto, or payment app.",
        ],
      },
      {
        type: "h2",
        text: "The rules that keep you safe",
      },
      {
        type: "steps",
        items: [
          "Never send money back from a check someone sent you. That single rule defeats this entire scam.",
          "If you must rely on a check, wait until it has *truly* cleared — ask your bank to confirm, and know that 'available' is not 'cleared.'",
          "Treat any 'overpayment' as a giant red flag. Honest people don't overpay and ask you to refund the difference.",
          "Be extra wary of jobs or deals where step one is depositing a check and step two is sending money out.",
        ],
      },
      {
        type: "tip",
        text: "A legitimate employer doesn't pay you and then ask you to buy your own work gear by sending money to someone else. If a 'job' starts with a check you have to split up, it's not a job — it's the scam.",
      },
      {
        type: "p",
        text: "The whole trick depends on you moving money before the truth catches up. Take that away — never refund or forward funds from a check that landed in your lap — and there's nothing left for the scammer to steal.",
      },
    ],
    related: ["how-to-spot-a-scam", "if-youve-been-scammed", "avoiding-debt-scams"],
  },

  {
    slug: "romance-scams",
    order: 20,
    topicId: "money-safety",
    title: "Romance and 'Investment' Scams",
    dek: "They take weeks or months to build real trust — then ask for money or 'guaranteed' crypto. Here's how to see it coming.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "These scams play a long game, building genuine-feeling trust before any ask.",
      "Never send money or crypto to someone you haven't met in person.",
      "Refusing to video-chat or meet up is one of the biggest red flags there is.",
      "Talk it through with someone you trust before you send anything.",
    ],
    body: [
      {
        type: "p",
        text: "First, the most important thing: if this scam has touched you or someone you love, it is not a sign of being foolish. These are run by organized crews who do this full-time, and they are *engineered* to fool smart, careful, lonely-or-not people. The whole strategy is patience — they invest weeks or months building something that feels like a real relationship before money ever comes up. That's exactly why it works, and why there's no shame in having believed it.",
      },
      {
        type: "h2",
        text: "How it usually unfolds",
      },
      {
        type: "p",
        text: "It might start on a dating app, on social media, or even with a 'wrong number' text that turns warm and friendly. The person is attentive, charming, easy to talk to. They build a bond — daily messages, deep conversations, sometimes 'love' fast. Then, once the trust is real, the ask arrives. It comes in two main flavors:",
      },
      {
        type: "list",
        items: [
          "**The emergency.** A sudden crisis — a medical bill, a stuck shipment, travel to finally meet you, a frozen account — and they just need a little help, urgently.",
          "**The 'opportunity.'** They've been making great money on a crypto or investment platform and want to share it with you. They walk you through it, your 'balance' grows, and you're encouraged to put in more. (This patient version is sometimes called *pig butchering* — fattening trust before the slaughter.) The platform is fake, and the money is gone.",
        ],
      },
      {
        type: "key",
        text: "Never send money, gift cards, or crypto to someone you have not met in person — no matter how real the connection feels. And if someone always has an excuse not to video-chat or meet up, treat that as the scam revealing itself.",
      },
      {
        type: "h2",
        text: "The red flags, gently",
      },
      {
        type: "list",
        items: [
          "They won't video-call, and somehow can never meet in person — the camera's always broken, the trip always falls through.",
          "The relationship moves fast emotionally but the person stays strangely hard to actually pin down.",
          "Money enters the picture — an emergency, a can't-lose investment, a fee to 'unlock' your winnings.",
          "They steer you toward crypto or a special app, and discourage you from talking to family or friends about it.",
        ],
      },
      {
        type: "h2",
        text: "The protection that actually works",
      },
      {
        type: "p",
        text: "Isolation is the scammer's most important tool, so the antidote is simple: before you send anyone money, say it out loud to someone you trust. A friend, a sibling, a parent. Scams that feel airtight inside your own head often fall apart the moment you describe them to another person — because they can see the pattern you're too close to notice.",
      },
      {
        type: "tip",
        text: "A real 'investment' that's guaranteed to win does not exist. Anyone promising no risk and big returns is describing a fantasy — and usually a fraud. Genuine investing comes with real risk, and no honest person hides it.",
      },
      {
        type: "p",
        text: "If you've already sent money, see *What to Do If You've Been Scammed* — and please skip the self-blame. You were targeted by professionals. What matters now is acting quickly, not feeling embarrassed.",
      },
    ],
    related: ["how-to-spot-a-scam", "if-youve-been-scammed", "fake-check-scams"],
  },

  {
    slug: "protecting-your-documents",
    order: 40,
    topicId: "money-safety",
    title: "Guarding Your SSN and Important Documents",
    dek: "Your Social Security number and key documents are the keys to your identity. Here's who actually needs them — and who's just asking.",
    level: "Beginner",
    readMinutes: 6,
    takeaways: [
      "Your SSN, immigration papers, and passport are the keys to your whole identity.",
      "Few people actually need your SSN — it's okay to ask why.",
      "Store physical documents safely and shred sensitive mail.",
      "Be careful entering personal info on public Wi-Fi.",
    ],
    body: [
      {
        type: "p",
        text: "Your Social Security number, your immigration documents, your passport, your bank details — these are the master keys to your identity. With them, someone can open accounts, take out loans, or impersonate you. Without them, most identity theft simply can't get started. So a big part of protecting your money is just being a little careful with these documents and a little choosy about who you hand them to.",
      },
      {
        type: "h2",
        text: "Who actually needs your SSN — and who doesn't",
      },
      {
        type: "p",
        text: "Plenty of places ask for your Social Security number out of habit, but only some genuinely need it. You're allowed to push back on the rest.",
      },
      {
        type: "list",
        items: [
          "**Legitimate need:** your employer (for tax reporting), your bank when opening an account, and official tax forms. These are tied to the IRS and the law.",
          "**Often asking just because:** doctors' offices, gyms, stores, landlords, and 'verification' callers. Many of these will take a different ID, or don't truly need your number at all.",
        ],
      },
      {
        type: "tip",
        text: "When someone asks for your SSN, it's completely fair to ask back: 'Why do you need it, and what happens if I don't give it?' An honest organization can answer. Often you'll find they can use something else, or don't really need it.",
      },
      {
        type: "h2",
        text: "Keeping the physical stuff safe",
      },
      {
        type: "list",
        items: [
          "Store your Social Security card, passport, birth certificate, and immigration documents somewhere secure at home — not in your wallet, bag, or glovebox.",
          "Don't carry your Social Security card around day to day. If it's lost or stolen, replacing it is a headache and a risk.",
          "Shred mail with account numbers, your SSN, or other personal details before you throw it out. 'Dumpster diving' for documents is a real way thieves get your info.",
          "Keep a private list (somewhere secure) of your important account and document numbers, so you know exactly what to report if something goes missing.",
        ],
      },
      {
        type: "h2",
        text: "Being careful online and on public Wi-Fi",
      },
      {
        type: "p",
        text: "Free Wi-Fi at a cafe, airport, or library is convenient, but it's a shared, often unsecured space. Avoid logging into your bank or entering your SSN or card numbers while you're on it. Wait until you're on your own cellular data or a trusted home network, where your connection is harder to snoop on.",
      },
      {
        type: "key",
        text: "Treat your Social Security number like a key to your house: you don't hand it to everyone who asks, you don't leave it lying around, and you give it only to people who genuinely need to get in.",
      },
      {
        type: "h2",
        text: "If your SSN or documents are exposed",
      },
      {
        type: "p",
        text: "If your number leaks — through a data breach, a lost card, or a scam — don't panic, but do act. Freeze your credit at all three bureaus so no one can open new accounts in your name, keep an eye on your free credit reports at *AnnualCreditReport.com*, and if anyone actually misuses your identity, go to *IdentityTheft.gov* for a free recovery plan. Being careful up front means that even a leak doesn't have to become a disaster.",
      },
    ],
    related: ["identity-theft", "credit-freeze", "immigrant-scams"],
  },

  {
    slug: "if-youve-been-scammed",
    order: 30,
    topicId: "money-safety",
    title: "What to Do If You've Been Scammed",
    dek: "A calm, shame-free, step-by-step plan for the first hours and days. Acting fast matters far more than feeling embarrassed.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "Being scammed is not a personal failing — speed matters more than shame.",
      "Contact your bank or card company immediately; fast action can sometimes reverse a transfer.",
      "Report it to the FTC, the FBI's IC3, and local police, and freeze your credit if your identity is involved.",
      "Watch out for 'recovery' scams that promise to get your money back for a fee.",
    ],
    body: [
      {
        type: "p",
        text: "If you've just realized you were scammed, take a breath. The wave of embarrassment you might be feeling is normal — and it's also the thing that makes people freeze up and lose precious time. So let's set it aside. You were targeted by people who do this professionally. What you do in the next hour matters far more than how you feel about it, and there's a clear order to work through.",
      },
      {
        type: "key",
        text: "Being scammed is not a character flaw — these things are built to fool sharp, careful people. The most useful thing you can do right now is act quickly, not beat yourself up.",
      },
      {
        type: "h2",
        text: "Do these in order",
      },
      {
        type: "steps",
        items: [
          "**Stop all contact and send no more money.** No 'one last payment' to fix things — that's the scam continuing.",
          "**Call your bank or card company immediately.** Tell them exactly what happened. With some transfers, fast action can flag, hold, or even reverse the payment — but the window is short, so call right away.",
          "**Change your passwords and turn on two-factor authentication,** starting with email and banking. If you reused a password anywhere, change it there too.",
          "**Freeze your credit at all three bureaus** if any personal information was exposed, so no one can open new accounts in your name.",
          "**Report it** (details below) so there's an official record and the right agencies can act.",
        ],
      },
      {
        type: "h2",
        text: "Where to report",
      },
      {
        type: "list",
        items: [
          "**The FTC at *ReportFraud.ftc.gov*** — the federal government's central place to report fraud. If your identity was stolen specifically, use **_IdentityTheft.gov_**, which also builds you a free recovery plan.",
          "**The FBI's IC3 at *IC3.gov*** — for scams that happened online (a fake website, an online romance or investment scam, email fraud).",
          "**Your local police** — file a report. It may not recover your money, but creditors, banks, and the bureaus often want a police report number to clear fraudulent accounts.",
        ],
      },
      {
        type: "h2",
        text: "Beware the second scam",
      },
      {
        type: "p",
        text: "Here's a cruel twist to watch for. After you've been scammed, you may be contacted by someone promising to *recover* your lost money — for a fee, or for some information up front. This is almost always a second scam, sometimes run by the very same people, who know you're hurting and hopeful. Real authorities don't charge you to get your money back.",
      },
      {
        type: "tip",
        text: "Nobody legitimate asks for an upfront fee to recover money you lost. If someone reaches out offering to get your funds back for a payment, that's the recovery scam — hang up.",
      },
      {
        type: "p",
        text: "Write down everything while it's fresh — dates, names, numbers, what was said, what you sent. It helps your bank and the agencies, and it helps you see clearly. Then be kind to yourself. You did the brave, hard thing: you faced it and you acted.",
      },
    ],
    related: ["identity-theft", "how-to-spot-a-scam", "credit-freeze"],
  },

  {
    slug: "immigrant-scams",
    order: 40,
    topicId: "money-safety",
    title: "Scams That Target Immigrant Families",
    dek: "Notario fraud, fake 'Immigration' calls, and 'pay me and I'll fix your status' schemes — and where to find real, qualified help.",
    level: "Intermediate",
    readMinutes: 7,
    takeaways: [
      "In the U.S., a 'notary public' is not a lawyer and can't give immigration advice.",
      "Government agencies don't call demanding gift cards or threatening deportation.",
      "No honest person can guarantee a visa or green card for a fee.",
      "Only a licensed attorney or a DOJ accredited representative can give immigration legal advice.",
    ],
    body: [
      {
        type: "p",
        text: "Some scams specifically target immigrant families — exploiting hope, fear, language barriers, and confusion about how the U.S. system works. You deserve to know about them clearly, without fear-mongering, because most of them fall apart the moment you know the rules. (One note up front: this is general education, not legal advice. For your specific situation, talk to a qualified professional — and below we'll point you to the legitimate, low-cost ones.)",
      },
      {
        type: "h2",
        text: "Notario fraud",
      },
      {
        type: "p",
        text: "This one runs on a real translation mix-up. In many Latin American countries, a *notario público* is a highly trained legal professional who can give legal advice. In the United States, a *notary public* is something completely different — just someone authorized to witness signatures. A U.S. notary is **not** a lawyer and **cannot** legally give immigration advice or represent you. Scammers exploit exactly this confusion, advertising as 'notarios' and charging families for immigration 'help' they aren't qualified to give — often filing the wrong paperwork and doing real damage to people's cases.",
      },
      {
        type: "key",
        text: "In the U.S., a *notary public* is not a lawyer and cannot give immigration advice. If someone offers immigration help as a 'notario,' that alone is a warning sign — stop and find qualified help instead.",
      },
      {
        type: "h2",
        text: "Fake calls from 'Immigration,' 'USCIS,' the IRS, or police",
      },
      {
        type: "p",
        text: "You may get a call from someone claiming to be from USCIS, 'Immigration,' the IRS, or the police, saying there's a problem with your case or your taxes — and that you'll be arrested or deported unless you pay *right now*, by gift card or wire transfer. It can be terrifying, and that fear is the entire point. But it's a scam.",
      },
      {
        type: "list",
        items: [
          "Government agencies do **not** call out of the blue demanding immediate payment by gift card, wire transfer, crypto, or a payment app.",
          "They do **not** threaten you with arrest or deportation over the phone to scare a payment out of you.",
          "Real government business arrives through official mail and proper channels — not a panicked phone call with a deadline of 'in the next hour.'",
        ],
      },
      {
        type: "tip",
        text: "If a call like this scares you, hang up. Don't pay, don't give information, and don't trust the number on your screen — scammers fake those easily. If you're worried it might be real, contact the agency through its *official* website or phone number, which you look up yourself.",
      },
      {
        type: "h2",
        text: "'Pay me and I'll fix your status' schemes",
      },
      {
        type: "p",
        text: "Be deeply wary of anyone who *guarantees* an outcome — a visa, a green card, a work permit — in exchange for a fee. No one can promise the government's decision; immigration cases depend on the law and the facts, not on who you pay. Also watch for people who charge you for government forms that are actually free, or who ask you to sign documents you don't understand or can't read. A genuine helper explains things, never rushes you, and never sells a guarantee.",
      },
      {
        type: "h2",
        text: "Where the real help is",
      },
      {
        type: "p",
        text: "Here's the empowering part: legitimate, often low-cost or free help genuinely exists. The key is making sure the person is actually authorized to give immigration legal advice.",
      },
      {
        type: "list",
        items: [
          "**A licensed immigration attorney** — a real lawyer, who you can verify is in good standing.",
          "**A 'DOJ accredited representative'** — a non-lawyer specifically authorized by the U.S. Department of Justice to give immigration advice at a recognized nonprofit organization.",
          "**Nonprofit legal-aid organizations** — many offer immigration help for free or on a sliding scale. They're a trustworthy place to start.",
        ],
      },
      {
        type: "steps",
        items: [
          "Before paying anyone, ask: are you a licensed attorney or a DOJ accredited representative? A real one will answer plainly.",
          "Never pay someone who guarantees a result or pressures you to decide fast.",
          "Never sign documents you can't read or don't understand — ask for a translation and time to review.",
          "Keep copies of everything you file and every receipt you're given.",
        ],
      },
      {
        type: "key",
        text: "Only a licensed attorney or a DOJ accredited representative can legally give you immigration advice — and no honest one will ever guarantee an outcome for a fee. When in doubt, walk away and find a nonprofit legal-aid organization.",
      },
      {
        type: "p",
        text: "You're not powerless here. Knowing these few rules — a notary isn't a lawyer, the government won't demand gift cards, and no one can guarantee a case — takes away almost everything these scammers rely on. And when you do need real help, qualified, affordable people are out there to give it.",
      },
    ],
    related: ["protecting-your-documents", "how-to-spot-a-scam", "filing-with-itin"],
  },
];
