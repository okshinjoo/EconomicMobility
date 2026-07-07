import type { Article } from "./types";

export const moneySafetyArticles: Article[] = [
  {
    slug: "how-to-spot-a-scam",
    order: 10,
    topicId: "money-safety",
    title: "How to Spot a Scam Before It Costs You",
    dek: "There are thousands of scams, but they almost all wave the same handful of red flags. Learn the instinct, not a list.",
    level: "Beginner",
    readMinutes: 5,
    takeaways: [
      "Scams change shape, but the warning signs stay the same.",
      "Pressure, secrecy, and weird payment methods are the giveaways.",
      "Real institutions don't rush you or punish you for double-checking.",
      "When in doubt, hang up and call the official number yourself.",
    ],
    body: [
      {
        type: "p",
        text: "You will get scam attempts: a text about a package, a call about your 'suspended' account, a job that pays too well, a stranger who's suddenly very interested in you. Scammers send millions of these and only need a few people to bite, so getting one says nothing about you. And you don't have to memorize every scam in the world. Almost all of them lean on the same small set of tricks, and once you can feel those tricks coming, you can spot a brand-new scam you've never seen before.",
      },
      {
        type: "h2",
        text: "The red flags that show up again and again",
      },
      {
        type: "p",
        text: "When two or more of these stack up in the same message or call, treat it as a scam until you've proven otherwise, not the other way around.",
      },
      {
        type: "list",
        items: [
          "**It came out of nowhere.** You didn't sign up, apply, or reach out, but suddenly someone's contacting you about money.",
          "**It's urgent.** 'Your account will be closed,' 'you'll be arrested,' 'the deal expires in an hour.' Panic is the point; it stops you from thinking.",
          "**They want a strange way to pay.** Gift cards, wire transfers, crypto, or a payment app like Zelle or Cash App. Scammers favor these because they're fast and nearly impossible to reverse.",
          "**They tell you to keep it secret.** 'Don't tell anyone,' 'don't talk to your family,' 'this is just between us.' Real businesses never need you isolated.",
          "**They want you to 'verify' your info.** Your password, a code they texted you, your full Social Security number, your bank login. They're fishing.",
          "**It's too good to be true.** A prize you didn't enter, a job that pays a fortune for nothing, an investment that 'can't lose.'",
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
        text: "Whoever is contacting you, you can always stop and reach them a different way, one you find yourself. Don't trust the number that called you or the link in the text. Hang up, look up the official number (on the back of your card, on the real website, on a past bill), and call that.",
      },
      {
        type: "steps",
        items: [
          "Pause. Notice the pressure and the urgency. That feeling is the scam working.",
          "Don't click the link, don't pay, don't read out a code.",
          "Find the company's real contact info on your own, not from the message.",
          "Reach out through that channel and ask whether the problem is real. A genuine one will still be there in ten minutes.",
        ],
      },
      {
        type: "tip",
        text: "Scammers are good at faking caller ID and email addresses; the name on your screen can say 'Your Bank' or even a real agency. Never treat what appears on your phone as proof. Verify through a channel you chose.",
      },
      {
        type: "p",
        text: "You don't need to be suspicious of the whole world. You need one calm habit: when money and urgency show up together, slow down and check it yourself. To see how these flags look in the wild, start with [Phishing, Smishing, and Fake Texts](/learn/money-safety/phishing-scams). And if a scam has already gotten past you, [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed) walks through the response, step by step.",
      },
    ],
    related: ["phishing-scams", "security-tune-up", "if-youve-been-scammed"],
    quiz: [
      {
        question: "Why do scammers make everything feel so urgent?",
        options: [
          "Panic stops you from thinking things through",
          "Their offers really do expire quickly",
          "They're required to give you a deadline",
        ],
        answer: 0,
        explain:
          "Urgency is the point: 'you'll be arrested' or 'the deal expires in an hour' is designed to rush you past your own judgment. Real institutions let you take your time.",
      },
      {
        question: "Which payment request is a classic scam giveaway?",
        options: [
          "Paying with a credit card",
          "Paying by gift cards, wire transfer, or crypto",
          "Paying through your bank's official website",
        ],
        answer: 1,
        explain:
          "Scammers favor gift cards, wires, crypto, and payment apps because they're fast and nearly impossible to reverse. Strange payment methods are one of the biggest red flags.",
      },
      {
        question: "You get a worrying call that seems to be from your bank. What's the one move that beats almost every scam?",
        options: [
          "Ask the caller questions to verify they're real",
          "Call back the number that just called you",
          "Hang up and call the official number you look up yourself",
        ],
        answer: 2,
        explain:
          "Caller ID can be faked, so don't trust the number that called or the link in a text. Find the real contact info on your own (like the back of your card) and check through that channel.",
      },
    ],
  },

  {
    slug: "phishing-scams",
    order: 20,
    topicId: "money-safety",
    title: "Phishing, Smishing, and Fake Texts",
    dek: "The fake bank email, the 'your package is held' text, the call from 'fraud prevention', and the one rule that beats all of them.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "Phishing is a fake message designed to make you click or hand over a secret.",
      "It comes by email, text (smishing), and phone, pretending to be someone you trust.",
      "Look for mismatched links and requests for codes or passwords.",
      "Never click. Go to the real app or site yourself, or call the number on your card.",
    ],
    body: [
      {
        type: "p",
        text: "Phishing is a fake message pretending to be someone you trust: your bank, the IRS, a delivery company, a job, even a friend. It's built to get you to do one of two things: click a link that steals your login, or hand over a password or security code directly. By text it's sometimes called 'smishing'; by phone, 'vishing.' Different channels, same trick. These messages have gotten good, with clean logos and real-sounding language, so 'it looks official' proves nothing. You need a habit instead.",
      },
      {
        type: "h2",
        text: "What these messages tend to look like",
      },
      {
        type: "list",
        items: [
          "**'Suspicious activity on your account. Click to verify.'** The link goes to a fake login page that captures whatever you type.",
          "**'Your package couldn't be delivered. Update your details here.'** You weren't even expecting a package, but you click anyway.",
          "**'This is your bank's fraud department. Read me the code we just texted you.'** That code is the key to *your* account, and they're trying to get in.",
          "**'You owe back taxes. Pay now or face arrest.'** Real agencies don't operate by surprise text or threatening call.",
        ],
      },
      {
        type: "h2",
        text: "The tells",
      },
      {
        type: "p",
        text: "The [universal red flags](/learn/money-safety/how-to-spot-a-scam) all apply here: urgency, threats, strange payment demands. Phishing adds a few tells of its own.",
      },
      {
        type: "list",
        items: [
          "The link doesn't match. Hover over it or long-press it, and the real address is some random site, not your bank's.",
          "It asks for something no real company requests by message: your full password, a one-time code, your full SSN, your card's PIN.",
          "Small weirdness: odd grammar, a greeting with no name, an email address that's almost-but-not-quite right.",
        ],
      },
      {
        type: "key",
        text: "A real bank or company will never ask for your full password or for a one-time code they sent you. Those codes exist to keep people *out* of your account. If someone asks you to share one, they're the person trying to get in.",
      },
      {
        type: "h2",
        text: "The golden rule",
      },
      {
        type: "p",
        text: "Don't click the link. Don't call the number in the message. Instead, reach the company the way you normally would: open their official app, type their website address yourself, or call the number printed on the back of your card. If the alert was real, you'll see it there. If it wasn't, you dodged a scam and lost nothing.",
      },
      {
        type: "tip",
        text: "Got a suspicious text? Don't reply, not even 'STOP.' A reply tells the scammer a real person is on the line. Delete it, and on most phones you can forward spam texts to 7726 (SPAM) to report them.",
      },
      {
        type: "p",
        text: "You don't have to figure out whether each message is fake. You have to refuse to act *inside* it. Go to the source yourself, every time, and phishing stops working on you. If you already clicked a link or shared a code, [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed) covers the cleanup, starting with your passwords.",
      },
    ],
    related: ["how-to-spot-a-scam", "family-emergency-scams", "if-youve-been-scammed"],
  },

  {
    slug: "payment-app-safety",
    order: 30,
    topicId: "money-safety",
    title: "Using Venmo, Cash App, and Zelle Safely",
    dek: "These apps move money like cash: fast, easy, and almost impossible to claw back. That's exactly why scammers love them.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "Sending money on these apps is usually instant and irreversible. Treat it like handing over cash.",
      "There's typically no buyer or seller protection, so don't pay strangers for goods.",
      "Learn the common scams: the 'accidental payment,' fake support, and fake screenshots.",
      "Lock down your account with a strong password, two-factor, and an app lock.",
    ],
    body: [
      {
        type: "p",
        text: "Splitting rent, paying back a friend for lunch, sending a few dollars to a cousin: payment apps like Venmo, Cash App, and Zelle make it effortless. That same effortlessness makes them a scammer's favorite tool, because the money moves like cash. Fast, and gone.",
      },
      {
        type: "key",
        text: "The one rule that matters most: sending money on these apps is usually *instant and irreversible*. Treat it like handing someone cash on the street, and only send to people you actually know and trust.",
      },
      {
        type: "p",
        text: "That rule is most of the story. When you send a payment, there's usually no undo, no chargeback, no bank that swoops in to reverse it. If the money goes to the wrong person, or the wrong person tricks you into sending it, it's usually gone for good. Banks and credit cards have protections that these apps mostly don't.",
      },
      {
        type: "h2",
        text: "Why you shouldn't pay strangers for stuff",
      },
      {
        type: "p",
        text: "On a credit card, if you pay for something and it never arrives, you can dispute the charge. On these apps there's typically no buyer or seller protection at all. So when someone selling concert tickets or a phone online insists you pay by Venmo or Zelle, that alone should stop you. The classic version: you send the money, and the 'seller' and the item both vanish. Use these apps for people you know, not strangers selling things.",
      },
      {
        type: "h2",
        text: "Scams to recognize on sight",
      },
      {
        type: "list",
        items: [
          "**The 'oops, wrong person' trick.** A stranger sends you money, then messages saying it was an accident and begs you to send it back. Their original payment was often stolen or fraudulent and will be reversed, but the money *you* send is real and gone. Don't send it back; report it in the app.",
          "**Fake 'bank' or 'support' contacts.** Someone calls, texts, or messages claiming to be your bank or the app's support team, warning of 'suspicious activity' and walking you through 'protecting' your account, which really means moving money to them. Real support will never ask you to send them a payment.",
          "**Fake payment screenshots.** A 'buyer' shows you a screenshot 'proving' they paid, then asks you to ship the item or send change. A screenshot is not money. Trust only what actually lands in your own account.",
        ],
      },
      {
        type: "h2",
        text: "Lock down your account",
      },
      {
        type: "p",
        text: "Because the money moves so fast, account security matters more here than almost anywhere else. A few minutes of setup protects you:",
      },
      {
        type: "steps",
        items: [
          "Use a **strong, unique password** for the app, not one you reuse anywhere else.",
          "Turn on **two-factor authentication**, so a login also needs a code only you can get.",
          "Set an **app lock** (a PIN, fingerprint, or face scan) so no one who grabs your phone can send money.",
          "**Double-check the name and handle** before you hit send. One wrong username and the cash is gone.",
        ],
      },
      {
        type: "tip",
        text: "Pressure to move money fast, whether to 'lock in a deal,' 'fix' your account, or 'return' a payment, is the same urgency play behind almost every fraud. [How to Spot a Scam](/learn/money-safety/how-to-spot-a-scam) covers the full set of red flags.",
      },
      {
        type: "p",
        text: "Payment apps are genuinely useful; the point is to respect what they are. They move money like cash, so guard them like cash. And if a payment has already gone out to a scammer, act fast: [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed) has the checklist, starting with a call to your bank.",
      },
    ],
    related: ["how-to-spot-a-scam", "security-tune-up", "if-youve-been-scammed"],
  },

  {
    slug: "family-emergency-scams",
    order: 35,
    topicId: "money-safety",
    title: "The 'It's Me, I'm in Trouble' Call",
    dek: "A panicked voice, a plea for money, and a request to keep it secret. The family-emergency scam is old, and it has new tools.",
    level: "Beginner",
    readMinutes: 4,
    takeaways: [
      "The scam: someone poses as a relative in urgent trouble and needs money fast.",
      "Voice-cloning tools mean a familiar voice on the phone is no longer proof of anything.",
      "Hang up and call the person back at the number you already have for them.",
      "A family safe word settles 'is this really you?' in two seconds.",
    ],
    body: [
      {
        type: "p",
        text: "The phone rings late. It's your grandson, or your niece, or your little brother, and something is wrong: a car crash, a night in jail, a stolen wallet in another country. The connection is bad, they're crying, and they need money right now. One more thing: please don't tell anyone. They're too embarrassed.",
      },
      {
        type: "p",
        text: "This is one of the oldest scams on the phone, and it keeps working because it aims at love instead of greed. When someone you care about is in trouble, you don't cross-examine them. You help. Scammers know that, and they build the whole performance around it.",
      },
      {
        type: "h2",
        text: "How it usually plays out",
      },
      {
        type: "list",
        items: [
          "The caller claims to be a relative in immediate trouble: an arrest, an accident, a hospital, a mugging while traveling.",
          "Often a second voice takes over, playing a 'lawyer,' 'police officer,' or 'doctor' who calmly explains exactly how to send the money.",
          "The payment method is always hard to reverse: gift cards, a wire transfer, crypto, a payment app, sometimes even a courier sent to your door for cash.",
          "And there is always a reason to keep it quiet. Don't call Mom. Don't tell Grandpa. Let's handle this between us.",
        ],
      },
      {
        type: "h2",
        text: "Why the voice can sound so real",
      },
      {
        type: "p",
        text: "The classic version leaned on panic and a fuzzy connection: 'Grandma? It's me,' and your own brain filled in the name. The newer version doesn't need your help. Voice-cloning software can imitate a specific person's voice from a short recording, and short recordings of most of us are easy to find: social media videos, voicemail greetings, clips from a livestream. You don't need to understand the technology to draw the right conclusion. A familiar voice on the phone is no longer proof of who's calling.",
      },
      {
        type: "h2",
        text: "Urgency plus secrecy is the tell",
      },
      {
        type: "p",
        text: "Strip away the story and every version of this scam runs on the same two ingredients: you must act *now*, and you must tell *no one*. Real emergencies almost never require secrecy. Real hospitals bill you; they don't demand gift cards tonight. Real lawyers and police don't take payment through a cash courier. Those are the same red flags behind nearly every fraud, and [How to Spot a Scam](/learn/money-safety/how-to-spot-a-scam) covers the full set.",
      },
      {
        type: "key",
        text: "The instruction 'don't tell anyone' is the one to break first. Isolation is the scam's engine. The moment you loop in another family member, it usually falls apart.",
      },
      {
        type: "h2",
        text: "The verify move",
      },
      {
        type: "steps",
        items: [
          "Slow it down. Say you need a few minutes and will call right back. A real relative in real trouble will understand.",
          "Hang up and call the person at the number you already have for them, not the number that just called you.",
          "No answer? Call another family member who'd know where they are, even though the caller said not to. Especially because the caller said not to.",
          "Still unsure? Ask a question only the real person could answer, or use your family's safe word.",
        ],
      },
      {
        type: "h2",
        text: "Set up a safe word this week",
      },
      {
        type: "p",
        text: "Pick a word or short phrase your family would never say by accident (an inside joke, an old pet's name, a dish from home) and agree that anyone calling about an emergency and money has to say it. Share it in person or in a private conversation, not in a public post. It costs nothing, takes five minutes at dinner, and it beats the most convincing cloned voice ever made.",
      },
      {
        type: "p",
        text: "If money already went out, don't sit with the shame; these calls are engineered to beat smart, loving people. Contact your bank or the gift card company right away, then work through [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed) step by step.",
      },
    ],
    related: ["how-to-spot-a-scam", "payment-app-safety", "if-youve-been-scammed"],
  },

  {
    slug: "fake-check-scams",
    order: 40,
    topicId: "money-safety",
    title: "Fake Checks and Overpayment Scams",
    dek: "They send you a real-looking check, ask you to send part of it back, and leave you owing the bank everything when it bounces.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "A check showing as 'available' in your account has not actually cleared yet.",
      "Scammers exploit that gap: deposit our check, send some back, then it bounces.",
      "When the check bounces, the bank takes back every dollar, from you.",
      "Never send money back from a check someone else sent you.",
    ],
    body: [
      {
        type: "p",
        text: "This scam fools careful, honest people because it abuses something true about how banks work. Someone sends you a check (for a job, a sale, a 'prize,' a 'mystery shopper' gig) and it's for *more* than expected. They ask you to deposit it and send the extra back, or forward part of it to a 'vendor.' Your bank shows the money in your account, so it feels real. Days later the check turns out to be fake, the bank pulls the funds back, and the money you already sent is gone. From your pocket, not theirs.",
      },
      {
        type: "h2",
        text: "Why the bank 'showing' the money fools everyone",
      },
      {
        type: "p",
        text: "By law, banks usually make deposited funds *available* within a day or two. But available is not the same as cleared. Clearing means the check actually went back to the sender's bank and the money truly moved, which can take many more days. During that gap, the money looks like yours; if the check is fake, it never existed. When it finally bounces, the bank reverses the deposit and you're responsible for whatever you spent or sent.",
      },
      {
        type: "key",
        text: "Money showing up in your account does *not* mean a check has cleared. A check can bounce days or even weeks after the funds appear, and you're on the hook for every dollar you moved in the meantime.",
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
          "Never send money back from a check someone sent you. That single rule defeats the entire scam.",
          "If you must rely on a check, wait until it has *truly* cleared. Ask your bank to confirm, and remember that 'available' is not 'cleared.'",
          "Treat any 'overpayment' as a giant red flag. Honest people don't overpay and ask you to refund the difference.",
          "Be extra wary of jobs or deals where step one is depositing a check and step two is sending money out.",
        ],
      },
      {
        type: "tip",
        text: "A legitimate employer doesn't pay you and then ask you to buy your own work gear by sending money to someone else. If a 'job' starts with a check you have to split up, it's the scam.",
      },
      {
        type: "p",
        text: "The whole trick depends on you moving money before the truth catches up. Take that away, by never refunding or forwarding funds from a check that landed in your lap, and there's nothing left for the scammer to steal. If you've already sent money, call your bank immediately, then follow the steps in [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed).",
      },
    ],
    related: ["job-scams", "how-to-spot-a-scam", "if-youve-been-scammed"],
    quiz: [
      {
        question: "Your bank shows a deposited check's money as 'available.' What does that actually mean?",
        options: [
          "The check has cleared and the money is safely yours",
          "The money looks usable, but the check can still bounce days or weeks later",
          "The bank has verified the check is real",
        ],
        answer: 1,
        explain:
          "Banks usually make funds available within a day or two, but clearing takes much longer. If the check turns out to be fake, the bank reverses the deposit.",
      },
      {
        question: "A buyer 'accidentally' pays you too much and asks you to send back the difference. What's going on?",
        options: [
          "A common mistake you should politely fix",
          "A fake-check scam: their check will bounce after you've sent real money",
          "A sign the buyer is careless but harmless",
        ],
        answer: 1,
        explain:
          "Honest people don't overpay and ask for a refund of the difference. Any setup where someone gives you money and needs some sent back fast is the scam.",
      },
      {
        question: "The fake check bounces after you've already sent money on. Who eats the loss?",
        options: [
          "The bank, since it made the funds available",
          "The scammer, once the bank traces the check",
          "You, for every dollar you spent or sent",
        ],
        answer: 2,
        explain:
          "When the check bounces, the bank pulls the deposit back and you're responsible for whatever you moved in the meantime. That's why the one rule is to never send money back from a check someone sent you.",
      },
    ],
  },

  {
    slug: "job-scams",
    order: 45,
    topicId: "money-safety",
    title: "Fake Job Offers and Employment Scams",
    dek: "When you need work, a fast offer feels like luck finally turning. Here's how to tell a real job from a scam wearing one.",
    level: "Intermediate",
    readMinutes: 4,
    takeaways: [
      "A real employer never needs you to pay money, or move money, to start a job.",
      "An instant offer with no real interview is a warning sign, not good luck.",
      "'Deposit this check and buy your equipment' is a fake-check scam in a work outfit.",
      "A few minutes verifying the company through its official channels beats every fake.",
    ],
    body: [
      {
        type: "p",
        text: "Job scams are cruel in a specific way: they target people at the exact moment they need money and good news. And they don't only live in shady corners of the internet. Scammers post fake listings on real job boards, copy the names and logos of real companies, and sometimes impersonate real recruiters. The listing can look completely legitimate. The tells show up in how the 'job' behaves.",
      },
      {
        type: "h2",
        text: "The offer that comes too easily",
      },
      {
        type: "p",
        text: "The bait is usually a remote job with vague duties and surprisingly good pay: data entry, package handling, 'personal assistant,' payments processing. The 'interview' happens entirely by text or on a chat app, lasts a few minutes, and ends with an offer on the spot. That speed is the point. Real hiring is slow because the company is checking you out. A scammer skips all that, because the job was never real; you are the product, and they want you committed before you think too hard.",
      },
      {
        type: "h2",
        text: "The equipment con",
      },
      {
        type: "p",
        text: "Once you're 'hired,' the money requests begin. Sometimes you're asked to pay upfront for training, software, a starter kit, or a background check. Sometimes it's more elaborate: the company sends you a check to buy a laptop and equipment from their 'approved vendor,' who is the scammer. The check is counterfeit, the vendor payment you sent is real, and when the check bounces the bank takes the money back from you. [Fake Checks and Overpayment Scams](/learn/money-safety/fake-check-scams) explains exactly how that mechanism works and why the bank showing the funds proves nothing.",
      },
      {
        type: "key",
        text: "Employers pay you. You never have to send money, buy gift cards, or forward funds to anyone to start a job. Any 'job' where money flows from you outward, in any form, is a scam.",
      },
      {
        type: "h2",
        text: "Reshipping jobs: the one that can get you in real trouble",
      },
      {
        type: "p",
        text: "One version deserves a gentle, serious warning. A 'logistics coordinator' or 'package inspection' job asks you to receive packages at home, check the contents, and reship them to another address. The merchandise was bought with stolen credit cards, and the job exists to hide the trail behind your name and address. People who take these jobs are victims too, but they can still end up with police at the door, packages seized, and their information sitting in the middle of a fraud investigation. Some are never paid at all. If a job is mostly receiving and resending packages or money, walk away, no matter how kind the 'manager' seems.",
      },
      {
        type: "h2",
        text: "How to verify a company before you say yes",
      },
      {
        type: "steps",
        items: [
          "Find the company's official website yourself (don't use links from the message) and check whether the job is posted on its own careers page.",
          "Look at the email addresses. Real recruiters write from the company's domain, not from Gmail or a lookalike domain with an extra letter.",
          "Search the company name plus the word 'scam,' and search the recruiter's name. Impersonated companies often post warnings.",
          "Ask for a phone or video interview with a real person. A legitimate employer will have one; a scammer will make excuses.",
          "If an offer came out of nowhere for a job you never applied to, treat it as a scam until proven otherwise.",
        ],
      },
      {
        type: "p",
        text: "None of this means good remote jobs don't exist. They do, and real ones survive scrutiny: the posting matches the company's site, the people are reachable, and nobody ever asks you for money. If you've already paid or deposited a check, call your bank now, then follow [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed). The pressure and secrecy you felt along the way were the [standard red flags](/learn/money-safety/how-to-spot-a-scam) all along.",
      },
    ],
    related: ["fake-check-scams", "how-to-spot-a-scam", "if-youve-been-scammed"],
  },

  {
    slug: "romance-scams",
    order: 50,
    topicId: "money-safety",
    title: "Romance and 'Investment' Scams",
    dek: "They take weeks or months to build real trust, then ask for money or 'guaranteed' crypto. Here's how to see it coming.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "These scams play a long game, building genuine-feeling trust before any ask.",
      "Never send money or crypto to someone you haven't met in person.",
      "Refusing to video-chat or meet up is one of the biggest red flags there is.",
      "Talk it through with someone you trust before you send anything.",
    ],
    body: [
      {
        type: "p",
        text: "First, the most important thing: if this scam has touched you or someone you love, it is not a sign of being foolish. These operations are run by organized crews who do this full-time, and they are engineered to fool smart, careful people. The whole strategy is patience. They invest weeks or months building something that feels like a real relationship before money ever comes up. That's why it works, and why there's no shame in having believed it.",
      },
      {
        type: "h2",
        text: "How it usually unfolds",
      },
      {
        type: "p",
        text: "It might start on a dating app, on social media, or even with a 'wrong number' text that turns warm and friendly. The person is attentive, charming, easy to talk to. They build a bond through daily messages and deep conversations, sometimes declaring 'love' fast. Then, once the trust is real, the ask arrives. It comes in two main flavors:",
      },
      {
        type: "list",
        items: [
          "**The emergency.** A sudden crisis (a medical bill, a stuck shipment, travel to finally meet you, a frozen account) and they need a little help, urgently.",
          "**The 'opportunity.'** They've been making great money on a crypto or investment platform and want to share it with you. They walk you through it, your 'balance' grows, and you're encouraged to put in more. This patient version is sometimes called *pig butchering*: fattening trust before the slaughter. The platform is fake, and the money is gone.",
        ],
      },
      {
        type: "key",
        text: "Never send money, gift cards, or crypto to someone you have not met in person, no matter how real the connection feels. And if someone always has an excuse not to video-chat or meet up, treat that as the scam revealing itself.",
      },
      {
        type: "h2",
        text: "The red flags, gently",
      },
      {
        type: "list",
        items: [
          "They won't video-call, and somehow can never meet in person. The camera's always broken; the trip always falls through.",
          "The relationship moves fast emotionally, but the person stays strangely hard to pin down.",
          "Money enters the picture: an emergency, a can't-lose investment, a fee to 'unlock' your winnings.",
          "They steer you toward crypto or a special app, and discourage you from talking to family or friends about it.",
        ],
      },
      {
        type: "h2",
        text: "The protection that works",
      },
      {
        type: "p",
        text: "Isolation is the scammer's most important tool, so the antidote is simple: before you send anyone money, say it out loud to someone you trust. A friend, a sibling, a parent. Scams that feel airtight inside your own head often fall apart the moment you describe them to another person, because they can see the pattern you're too close to notice.",
      },
      {
        type: "tip",
        text: "An 'investment' that's guaranteed to win does not exist. Anyone promising no risk and big returns is describing a fantasy, and usually a fraud. Genuine investing comes with real risk, and no honest person hides it.",
      },
      {
        type: "p",
        text: "If you've already sent money, go straight to [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed), and please skip the self-blame. You were targeted by professionals. What matters now is acting quickly, not feeling embarrassed.",
      },
    ],
    related: ["investment-fraud", "how-to-spot-a-scam", "if-youve-been-scammed"],
  },

  {
    slug: "investment-fraud",
    order: 55,
    topicId: "money-safety",
    title: "Investment Fraud: The Classic Cons",
    dek: "Ponzi schemes, hyped stocks, and slick fake platforms all sell the same impossible product: a sure win. Two free lookups expose most of them.",
    level: "Intermediate",
    readMinutes: 4,
    takeaways: [
      "A Ponzi scheme pays 'returns' out of new investors' deposits, until the new money stops.",
      "Affinity fraud spreads through trusted communities, which is why smart people get caught.",
      "Check anyone selling investments on FINRA BrokerCheck and the SEC's IAPD. Both are free.",
      "Guaranteed high returns don't exist. That promise is the fraud identifying itself.",
    ],
    body: [
      {
        type: "p",
        text: "Investment fraud has a costume department. One decade it wears a stock certificate, the next a crypto app, but underneath it's a small set of cons that have run for a century. Learn the handful of classics and you'll recognize the next reinvention on sight, whatever it's wearing.",
      },
      {
        type: "h2",
        text: "The Ponzi scheme",
      },
      {
        type: "p",
        text: "A Ponzi scheme doesn't invest your money in anything. The operator takes deposits from new investors and uses them to pay 'returns' to earlier investors, keeping a cut along the way. From the inside it looks wonderful: your statements show steady gains, month after month, and people who ask for a withdrawal actually get paid, which makes the whole thing feel verified. It runs until recruiting slows or too many people want out at once, and then it collapses, because there was never anything underneath. The 'profits' were just other people's deposits changing hands. The tell is smoothness: real markets bounce around, so an investment that only ever goes up, in tidy identical increments, is a story someone is writing, not a market.",
      },
      {
        type: "h2",
        text: "Affinity fraud: when it comes through your community",
      },
      {
        type: "p",
        text: "Many of the worst investment frauds don't arrive through strangers. They spread through a church, a mosque, an immigrant community, a campus group, a hometown network, carried by people who genuinely believe in the opportunity because someone they trust brought it to them. Scammers seek out tight-knit communities on purpose: earn one respected person's trust and everyone else's follows. The early participants even get paid, Ponzi-style, so they vouch for it honestly.",
      },
      {
        type: "p",
        text: "If this has touched your family or your community, be gentle with yourself and the people involved. Trusting your community is not a character flaw; it's the thing these criminals deliberately abuse. It also creates a second harm: victims often stay quiet to avoid embarrassing the group or the person who invited them. Reporting it protects the next family, and the person who recruited you was usually a victim too.",
      },
      {
        type: "h2",
        text: "Pump-and-dump and the social media stock tip",
      },
      {
        type: "p",
        text: "This one is built for the group-chat era. Promoters quietly buy a cheap, thinly traded stock or token, then flood social media with hype: screenshots of gains, whispers of big news, urgency to get in before it moons. The buying pushes the price up, the promoters sell everything near the top, and the price collapses on the people who arrived last. If a stranger, an influencer, or even a friend forwarding a tip is excited for *you* to buy something *they already own*, notice whose exit you're funding. The polished online personalities that push these plays have their own tells, which we've written up in [how to spot a fake financial guru](/blog/how-to-spot-a-fake-financial-guru).",
      },
      {
        type: "h2",
        text: "Fake trading platforms",
      },
      {
        type: "p",
        text: "Some frauds skip the market entirely and build a stage set: a professional-looking app or website where your 'balance' grows impressively. None of it is real; the numbers are typed in by the scammer. The trap springs when you try to withdraw and suddenly owe 'taxes' or 'fees' to unlock your own money. Those payments vanish too. This is the machinery behind the long-game romance version covered in [Romance and 'Investment' Scams](/learn/money-safety/romance-scams), and the rule is the same everywhere: a number on a screen is not money until it's back in your own bank account.",
      },
      {
        type: "h2",
        text: "The two free checks that expose most of it",
      },
      {
        type: "p",
        text: "In the U.S., people who sell investments or give investment advice for a living are generally required to be registered, and their records are public. Before you hand anyone money, run the two official lookups. Both are free and take minutes:",
      },
      {
        type: "list",
        items: [
          "**FINRA BrokerCheck** (brokercheck.finra.org): look up any broker or brokerage firm to see licenses, employment history, and customer complaints.",
          "**The SEC's Investment Adviser Public Disclosure database** (adviserinfo.sec.gov): the same kind of record for investment advisers and their firms.",
        ],
      },
      {
        type: "p",
        text: "If the person pitching you isn't in either system, or bristles when you say you want to check, that's your answer. Registration doesn't guarantee honesty, but *unregistered plus persuasive* is the classic fraud profile.",
      },
      {
        type: "key",
        text: "There is no such thing as a guaranteed high return. Real investing always involves risk, and anyone who promises big gains with none is describing a fraud. The [universal red flags](/learn/money-safety/how-to-spot-a-scam) (pressure, secrecy, too good to be true) apply to investments exactly as they do everywhere else.",
      },
      {
        type: "p",
        text: "If you've already put money in, stop adding more, keep every message and statement, and report it to the SEC and FTC. [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed) walks through the order of operations, and none of it requires feeling ashamed first.",
      },
    ],
    related: ["romance-scams", "how-to-spot-a-scam", "if-youve-been-scammed"],
  },

  {
    slug: "immigrant-scams",
    order: 60,
    topicId: "money-safety",
    title: "Scams That Target Immigrant Families",
    dek: "Notario fraud, fake 'Immigration' calls, and 'pay me and I'll fix your status' schemes, plus where to find real, qualified help.",
    level: "Intermediate",
    readMinutes: 6,
    takeaways: [
      "In the U.S., a 'notary public' is not a lawyer and can't give immigration advice.",
      "Government agencies don't call demanding gift cards or threatening deportation.",
      "No honest person can guarantee a visa or green card for a fee.",
      "Only a licensed attorney or a DOJ accredited representative can give immigration legal advice.",
    ],
    body: [
      {
        type: "p",
        text: "Some scams specifically target immigrant families, exploiting hope, fear, language barriers, and confusion about how the U.S. system works. You deserve to know about them clearly, without fear-mongering, because most of them fall apart the moment you know the rules. (One note up front: this is general education, not legal advice. For your specific situation, talk to a qualified professional. Below, we'll point you to the legitimate, low-cost ones.)",
      },
      {
        type: "h2",
        text: "Notario fraud",
      },
      {
        type: "p",
        text: "This one runs on a real translation mix-up. In many Latin American countries, a *notario público* is a highly trained legal professional who can give legal advice. In the United States, a *notary public* is something completely different: a person authorized to witness signatures, nothing more. A U.S. notary is **not** a lawyer and **cannot** legally give immigration advice or represent you. Scammers exploit exactly this confusion, advertising as 'notarios' and charging families for immigration 'help' they aren't qualified to give. Often they file the wrong paperwork and do real damage to people's cases.",
      },
      {
        type: "key",
        text: "In the U.S., a *notary public* is not a lawyer and cannot give immigration advice. If someone offers immigration help as a 'notario,' that alone is a warning sign. Stop and find qualified help instead.",
      },
      {
        type: "h2",
        text: "Fake calls from 'Immigration,' 'USCIS,' the IRS, or police",
      },
      {
        type: "p",
        text: "You may get a call from someone claiming to be from USCIS, 'Immigration,' the IRS, or the police, saying there's a problem with your case or your taxes and that you'll be arrested or deported unless you pay right now, by gift card or wire transfer. It can be terrifying, and that fear is the entire point. It's a scam. Real government business arrives through official mail and proper channels, not a panicked phone call with a deadline of 'in the next hour' and a demand for gift cards. These are the same pressure tactics behind every fraud; [How to Spot a Scam](/learn/money-safety/how-to-spot-a-scam) walks through the full list.",
      },
      {
        type: "tip",
        text: "If a call like this scares you, hang up. Don't pay, don't give information, and don't trust the number on your screen; scammers fake those easily. If you're worried it might be real, contact the agency through its *official* website or phone number, which you look up yourself.",
      },
      {
        type: "h2",
        text: "'Pay me and I'll fix your status' schemes",
      },
      {
        type: "p",
        text: "Be deeply wary of anyone who *guarantees* an outcome (a visa, a green card, a work permit) in exchange for a fee. No one can promise the government's decision; immigration cases depend on the law and the facts, not on who you pay. Watch, too, for people who charge you for government forms that are actually free, or who ask you to sign documents you don't understand or can't read. A genuine helper explains things, never rushes you, and never sells a guarantee.",
      },
      {
        type: "h2",
        text: "Where the real help is",
      },
      {
        type: "p",
        text: "Legitimate, often low-cost or free help genuinely exists. The key is making sure the person is actually authorized to give immigration legal advice.",
      },
      {
        type: "list",
        items: [
          "**A licensed immigration attorney**: a real lawyer, whose good standing you can verify.",
          "**A DOJ accredited representative**: a non-lawyer specifically authorized by the U.S. Department of Justice to give immigration advice at a recognized nonprofit organization.",
          "**Nonprofit legal-aid organizations**: many offer immigration help for free or on a sliding scale. They're a trustworthy place to start.",
        ],
      },
      {
        type: "steps",
        items: [
          "Before paying anyone, ask: are you a licensed attorney or a DOJ accredited representative? A real one will answer plainly.",
          "Never pay someone who guarantees a result or pressures you to decide fast.",
          "Never sign documents you can't read or don't understand. Ask for a translation and time to review.",
          "Keep copies of everything you file and every receipt you're given.",
        ],
      },
      {
        type: "key",
        text: "Only a licensed attorney or a DOJ accredited representative can legally give you immigration advice, and no honest one will ever guarantee an outcome for a fee. When in doubt, walk away and find a nonprofit legal-aid organization.",
      },
      {
        type: "p",
        text: "Knowing these few rules (a notary isn't a lawyer, the government won't demand gift cards, no one can guarantee a case) takes away almost everything these scammers rely on. If someone has already taken your money, [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed) covers reporting and next steps. And when you do need real help, qualified, affordable people are out there to give it.",
      },
    ],
    related: ["protecting-your-documents", "how-to-spot-a-scam", "filing-with-itin"],
  },

  {
    slug: "protecting-your-documents",
    order: 70,
    topicId: "money-safety",
    title: "Guarding Your SSN and Important Documents",
    dek: "Your Social Security number and key documents are the keys to your identity. Here's who genuinely needs them, and who's just asking.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Your SSN, immigration papers, and passport are the keys to your whole identity.",
      "Few people actually need your SSN, and it's okay to ask why.",
      "Store physical documents safely and shred sensitive mail.",
      "Be careful entering personal info on public Wi-Fi.",
    ],
    body: [
      {
        type: "p",
        text: "Your Social Security number, your immigration documents, your passport, your bank details: these are the master keys to your identity. With them, someone can open accounts, take out loans, or impersonate you. Without them, most identity theft can't get started. So a big part of protecting your money is being a little careful with these documents and a little choosy about who you hand them to.",
      },
      {
        type: "h2",
        text: "Who needs your SSN (and who doesn't)",
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
        text: "When someone asks for your SSN, it's completely fair to ask back: 'Why do you need it, and what happens if I don't give it?' An honest organization can answer. Often you'll find they can use something else, or don't need it at all.",
      },
      {
        type: "h2",
        text: "Keeping the physical stuff safe",
      },
      {
        type: "list",
        items: [
          "Store your Social Security card, passport, birth certificate, and immigration documents somewhere secure at home, not in your wallet, bag, or glovebox.",
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
        text: "If your number leaks through a data breach, a lost card, or a scam, don't panic, but do act. The two moves that matter most are freezing your credit at all three bureaus and watching your accounts and credit reports for misuse. [Protecting Yourself From Identity Theft](/learn/money-safety/identity-theft) walks through both, plus what to do if someone has already used your identity.",
      },
    ],
    related: ["identity-theft", "credit-freeze", "immigrant-scams"],
  },

  {
    slug: "identity-theft",
    order: 80,
    topicId: "money-safety",
    title: "Protecting Yourself From Identity Theft",
    dek: "When someone uses your name, your number, or your credit as if it were theirs, and the free tools that lock them out.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Identity theft is someone using your personal info to take money or credit.",
      "A free credit freeze is the single strongest defense you have.",
      "You can check your credit reports for free and catch problems early.",
      "If it happens, IdentityTheft.gov gives you a free recovery plan.",
    ],
    body: [
      {
        type: "p",
        text: "Identity theft is when someone gets hold of your personal information (your name, Social Security number, birth date, bank or card numbers) and uses it as if they were you. They might open a credit card in your name, take out a loan, file a tax return to grab your refund, or drain an account. The scary part is you often don't find out until the damage is done. The reassuring part: the strongest protections are free, and you can set most of them up in an afternoon.",
      },
      {
        type: "h2",
        text: "How it happens",
      },
      {
        type: "p",
        text: "Your info gets out in ordinary ways: a company you used got hacked, a [phishing text](/learn/money-safety/phishing-scams) tricked you, mail got stolen, or you typed something into a fake website. You rarely did anything 'wrong.' That's exactly why you protect yourself *before* there's a problem.",
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
          "**Freeze your credit at all three bureaus.** A freeze locks your credit file so no one, including a thief, can open new credit in your name. It's free, it doesn't hurt your score, and you can lift it whenever you need credit. [Credit Freezes and Fraud Alerts](/learn/credit/credit-freeze) covers how to set one up.",
          "**Check your credit reports for free.** Go to *AnnualCreditReport.com*, the official free site, and look your reports over for accounts you don't recognize.",
          "**Use strong, unique passwords and two-factor authentication.** A different password for every important account (a password manager makes this painless), plus a second step like a code, means one leaked password doesn't unlock your whole life.",
          "**Guard your Social Security number and paperwork.** [Guarding Your SSN and Important Documents](/learn/money-safety/protecting-your-documents) covers who genuinely needs your number and how to store the rest.",
        ],
      },
      {
        type: "key",
        text: "If you do one thing after reading this, freeze your credit at all three bureaus. It quietly blocks the most expensive kind of identity theft (someone opening new accounts in your name) and costs you nothing.",
      },
      {
        type: "h2",
        text: "If it happens to you",
      },
      {
        type: "p",
        text: "Don't panic, and don't waste time being embarrassed. Go to *IdentityTheft.gov*, the Federal Trade Commission's free site. You tell it what happened, and it builds you a step-by-step recovery plan: the letters to send, who to call, what to dispute. Act quickly; the sooner you report fraudulent accounts, the easier they are to wipe off your record. And if the theft started with a payment you were tricked into sending, [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed) covers that side.",
      },
      {
        type: "p",
        text: "Identity theft can feel like a violation, but it's a problem with a known fix. Lock your credit down now, keep half an eye on your reports, and you've taken away most of a thief's power before they ever try.",
      },
    ],
    related: ["credit-freeze", "protecting-your-documents", "if-youve-been-scammed"],
  },

  {
    slug: "if-youve-been-scammed",
    order: 90,
    topicId: "money-safety",
    title: "What to Do If You've Been Scammed",
    dek: "A calm, shame-free, step-by-step plan for the first hours and days. Acting fast matters far more than feeling embarrassed.",
    level: "Intermediate",
    readMinutes: 5,
    takeaways: [
      "Being scammed is not a personal failing, and speed matters more than shame.",
      "Contact your bank or card company immediately; fast action can sometimes reverse a transfer.",
      "Report it to the FTC, the FBI's IC3, and local police, and freeze your credit if your identity is involved.",
      "Watch out for 'recovery' scams that promise to get your money back for a fee.",
    ],
    body: [
      {
        type: "p",
        text: "If you've just realized you were scammed, take a breath. The wave of embarrassment you might be feeling is normal. It's also the thing that makes people freeze up and lose precious time, so set it aside for now. You were targeted by people who do this professionally. What you do in the next hour matters far more than how you feel about it, and there's a clear order to work through.",
      },
      {
        type: "key",
        text: "Being scammed is not a character flaw; these schemes are built to fool sharp, careful people. The most useful thing you can do right now is act quickly, not beat yourself up.",
      },
      {
        type: "h2",
        text: "Do these in order",
      },
      {
        type: "steps",
        items: [
          "**Stop all contact and send no more money.** No 'one last payment' to fix things. That's the scam continuing.",
          "**Call your bank or card company immediately.** Tell them exactly what happened. With some transfers, fast action can flag, hold, or even reverse the payment, but the window is short, so call right away.",
          "**Change your passwords and turn on two-factor authentication,** starting with email and banking. If you reused a password anywhere, change it there too.",
          "**Freeze your credit at all three bureaus** if any personal information was exposed, so no one can open new accounts in your name. [Credit Freezes and Fraud Alerts](/learn/credit/credit-freeze) shows you how.",
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
          "**The FTC at *ReportFraud.ftc.gov*.** The federal government's central place to report fraud. If your identity was stolen specifically, use **_IdentityTheft.gov_**, which also builds you a free recovery plan.",
          "**The FBI's IC3 at *IC3.gov*.** For scams that happened online: a fake website, an online romance or investment scam, email fraud.",
          "**Your local police.** File a report. It may not recover your money, but creditors, banks, and the credit bureaus often want a police report number before they'll clear fraudulent accounts.",
        ],
      },
      {
        type: "h2",
        text: "Beware the second scam",
      },
      {
        type: "p",
        text: "There's a cruel twist to watch for. After you've been scammed, you may be contacted by someone promising to *recover* your lost money, for a fee or for some information up front. This is almost always a second scam, sometimes run by the very same people, who know you're hurting and hopeful. Real authorities don't charge you to get your money back.",
      },
      {
        type: "tip",
        text: "Nobody legitimate asks for an upfront fee to recover money you lost. If someone reaches out offering to get your funds back for a payment, that's the recovery scam. Hang up.",
      },
      {
        type: "p",
        text: "Write down everything while it's fresh: dates, names, numbers, what was said, what you sent. It helps your bank and the agencies, and it helps you see clearly. If your Social Security number or documents were exposed, [Protecting Yourself From Identity Theft](/learn/money-safety/identity-theft) covers the longer-term watch. Then be kind to yourself. You faced it and you acted, and that was the hard part.",
      },
    ],
    related: ["identity-theft", "how-to-spot-a-scam", "credit-freeze"],
  },

  {
    slug: "security-tune-up",
    order: 15,
    topicId: "money-safety",
    title: "The One-Afternoon Money Security Tune-Up",
    dek: "Six moves, one afternoon, and most of the common attacks on your money stop working. No subscription required.",
    level: "Beginner",
    readMinutes: 3,
    takeaways: [
      "Most money security is set-it-once: freezes, two-factor, and app settings keep working quietly for years.",
      "Freezing your credit at all three bureaus is free and blocks most identity theft cold.",
      "A family safe word beats any technology against fake emergency calls.",
      "Reading the response plan before you need it is what saves money when something slips through.",
    ],
    body: [
      {
        type: "p",
        text: "Money security sounds like a lifestyle change, but most of it is a handful of settings you flip once. Set aside one afternoon, work down this list in order, and the most common attacks on your accounts stop working. Each step links to the guide with the details, so you can do the whole thing today.",
      },
      {
        type: "p",
        text: "Nothing on the list costs money, and none of it requires an identity-protection subscription. The steps run in priority order, so even if you only finish the first three, you've closed the biggest doors. One caveat before you start: if something already feels wrong right now, say charges you don't recognize or mail about accounts you never opened, skip straight to [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed) and come back to the tune-up after the fire is out.",
      },
      {
        type: "h2",
        text: "The checklist",
      },
      {
        type: "steps",
        items: [
          "**Freeze your credit at all three bureaus.** It's free, reversible, and blocks anyone from opening credit in your name. [Credit Freezes and Fraud Alerts](/learn/credit/credit-freeze) has the how, and the thaw for when you need it.",
          "**Turn on two-factor authentication for every money app**, plus the email account they all reset passwords through. While you're in a security-settings mood, [Guarding Your SSN and Important Documents](/learn/money-safety/protecting-your-documents) covers what to shred, where to store the rest, and what never to text.",
          "**Lock down your payment apps.** [Using Venmo, Cash App, and Zelle Safely](/learn/money-safety/payment-app-safety) walks through the privacy settings and the one habit that prevents most losses: treating every send like handing over cash.",
          "**Learn the red flags once.** [How to Spot a Scam Before It Costs You](/learn/money-safety/how-to-spot-a-scam) teaches the pressure-secrecy-strange-payment pattern that nearly every scam reuses, so you don't have to memorize a thousand variations.",
          "**Set a family safe word.** Two minutes at dinner, and a faked 'it's me, I'm in trouble, send money' call loses its power. [The 'It's Me, I'm in Trouble' Call](/learn/money-safety/family-emergency-scams) explains why this works even against cloned voices.",
          "**Read the response plan before you need it.** [What to Do If You've Been Scammed](/learn/money-safety/if-youve-been-scammed) is far more useful read calmly in advance than searched for mid-panic.",
        ],
      },
      {
        type: "p",
        text: "That's the whole tune-up. It won't make you scam-proof; nothing does. What it changes is the math: an attacker now needs your active cooperation instead of just a leaked password or a stolen number, and the red-flag habit from step four makes that cooperation hard to get. While you have the laptop open, run your phone and computer software updates too, since plenty of attacks lean on holes the updates already patched.",
      },
      {
        type: "h2",
        text: "If you want to go deeper",
      },
      {
        type: "p",
        text: "The afternoon list handles prevention. For a fuller sweep, [Protecting Yourself From Identity Theft](/learn/money-safety/identity-theft) covers the warning signs to watch for over time, and [The Credit Check-Up challenge](/challenges/credit-checkup) turns pulling and reviewing your actual credit reports into a guided checklist.",
      },
      {
        type: "p",
        text: "Then put a repeat on the calendar for a year from now. The settings mostly keep working on their own; the annual pass is for the new apps you've added and the reports you haven't looked at since.",
      },
    ],
    related: ["how-to-spot-a-scam", "payment-app-safety", "if-youve-been-scammed"],
  },
];
