"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Download, Check } from "lucide-react";

// Letter templates follow the CFPB's sample-letter structure. Everything runs
// in the browser: nothing typed here is sent or stored anywhere.

type LetterKind = "dispute" | "validation";

interface Fields {
  name: string;
  address: string;
  cityStateZip: string;
  recipient: string;
  recipientAddress: string;
  account: string;
  item: string;
  reason: string;
}

const EMPTY: Fields = {
  name: "",
  address: "",
  cityStateZip: "",
  recipient: "",
  recipientAddress: "",
  account: "",
  item: "",
  reason: "",
};

const KINDS: {
  id: LetterKind;
  label: string;
  blurb: string;
  recipientLabel: string;
  itemLabel: string;
  reasonLabel: string;
  reasonPlaceholder: string;
}[] = [
  {
    id: "dispute",
    label: "Credit report dispute",
    blurb:
      "Send to a credit bureau (Equifax, Experian, or TransUnion) to challenge an error on your report. They must investigate, usually within 30 days.",
    recipientLabel: "Credit bureau name",
    itemLabel: "The item you're disputing",
    reasonLabel: "Why it's wrong",
    reasonPlaceholder:
      "e.g. This account does not belong to me / This payment was made on time on March 3, 2026 / This balance is incorrect",
  },
  {
    id: "validation",
    label: "Debt validation request",
    blurb:
      "Send to a debt collector within 30 days of their first contact. They must prove the debt is real and yours before collecting further.",
    recipientLabel: "Collection agency name",
    itemLabel: "The debt they contacted you about",
    reasonLabel: "Anything to add (optional)",
    reasonPlaceholder:
      "e.g. I have no record of this debt / Please also provide the name of the original creditor",
  },
];

function buildLetter(kind: LetterKind, f: Fields, dateStr: string): string {
  const from = [f.name, f.address, f.cityStateZip].filter(Boolean).join("\n");
  const to = [f.recipient, f.recipientAddress].filter(Boolean).join("\n");
  const account = f.account ? `Re: Account/reference number ${f.account}` : "Re: Account in question";

  if (kind === "dispute") {
    return `${from}

${dateStr}

${to}

${account}

To whom it may concern:

I am writing to dispute the following information on my credit report:

${f.item || "[describe the item: account name, number, and what appears on the report]"}

This item is inaccurate. ${f.reason || "[explain briefly why it is wrong]"}

Under the Fair Credit Reporting Act, I request that you investigate this item and correct or delete it. Please send me written confirmation of the results of your investigation, along with a free updated copy of my credit report if any change is made.

I have enclosed copies (not originals) of documents supporting my dispute.

Sincerely,

${f.name || "[your name]"}

Enclosures: [list any documents you're including]`;
  }

  return `${from}

${dateStr}

${to}

${account}

To whom it may concern:

I received a communication from your company regarding the debt referenced above. Under the Fair Debt Collection Practices Act, I am requesting validation of this debt.

Please provide:
1. The amount claimed, itemized, including any fees or interest added.
2. The name and address of the original creditor.
3. Documentation showing that I am the person responsible for this debt.
4. Proof that your company is licensed to collect debts in my state, if required.

${f.reason ? f.reason + "\n\n" : ""}Until this debt is validated, please cease collection activity as required by law. Please communicate with me about this matter in writing only.

This letter is not an acknowledgment that I owe this debt.

Sincerely,

${f.name || "[your name]"}`;
}

export default function LetterGenerator() {
  const [kind, setKind] = useState<LetterKind>("dispute");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [copied, setCopied] = useState(false);

  const meta = KINDS.find((k) => k.id === kind)!;
  const dateStr = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    []
  );
  const letter = buildLetter(kind, fields, dateStr);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; the textarea below is selectable.
    }
  };

  const download = () => {
    const blob = new Blob([letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${kind === "dispute" ? "credit-dispute" : "debt-validation"}-letter.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputCls =
    "w-full rounded-lg border-2 border-sand bg-paper px-4 py-2.5 text-[0.95rem] text-ink placeholder:text-stone/50 focus:border-amber focus:outline-none";

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 lg:grid-cols-[0.95fr_1.05fr]">
      {/* Form */}
      <div>
        {/* Letter type */}
        <div className="flex flex-wrap gap-3">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setKind(k.id)}
              className={`rounded-md px-5 py-2.5 text-sm font-bold transition-colors ${
                kind === k.id
                  ? "card-ink bg-amber text-ink"
                  : "border-2 border-sand bg-cream text-stone hover:border-ink/30"
              }`}
            >
              {k.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm leading-6 text-stone">{meta.blurb}</p>

        <div className="card-ink mt-6 space-y-4 rounded-2xl bg-cream p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wide text-stone">Your name</label>
              <input className={inputCls} value={fields.name} onChange={set("name")} placeholder="First Last" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wide text-stone">Street address</label>
              <input className={inputCls} value={fields.address} onChange={set("address")} placeholder="123 Main St, Apt 4" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wide text-stone">City, state, ZIP</label>
              <input className={inputCls} value={fields.cityStateZip} onChange={set("cityStateZip")} placeholder="Queens, NY 11101" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wide text-stone">{meta.recipientLabel}</label>
              <input className={inputCls} value={fields.recipient} onChange={set("recipient")} placeholder={kind === "dispute" ? "Equifax / Experian / TransUnion" : "Agency name from their letter"} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wide text-stone">Their mailing address</label>
              <input className={inputCls} value={fields.recipientAddress} onChange={set("recipientAddress")} placeholder="From their letter or website" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wide text-stone">Account / reference number</label>
              <input className={inputCls} value={fields.account} onChange={set("account")} placeholder="As shown on the report or letter" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wide text-stone">{meta.itemLabel}</label>
              <input className={inputCls} value={fields.item} onChange={set("item")} placeholder={kind === "dispute" ? "e.g. Capital One account ending 4321, reported late for March 2026" : "e.g. Alleged Midland account, $840"} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wide text-stone">{meta.reasonLabel}</label>
              <textarea rows={3} className={inputCls} value={fields.reason} onChange={set("reason")} placeholder={meta.reasonPlaceholder} />
            </div>
          </div>
          <p className="text-xs leading-5 text-stone">
            Nothing you type here leaves your browser. Print and send by
            certified mail with a return receipt, and keep a copy.
          </p>
        </div>
      </div>

      {/* Output */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-lg font-semibold text-ink">Your letter</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copy}
              className="btn-ink inline-flex items-center gap-1.5 rounded-md bg-amber px-4 py-2 text-sm font-bold text-ink"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              type="button"
              onClick={download}
              className="inline-flex items-center gap-1.5 rounded-md border-2 border-ink bg-cream px-4 py-2 text-sm font-bold text-ink transition-colors hover:bg-paper-deep"
            >
              <Download className="h-4 w-4" />
              .txt
            </button>
          </div>
        </div>
        <textarea
          readOnly
          value={letter}
          rows={26}
          className="card-ink mt-3 w-full rounded-2xl bg-cream p-5 font-mono text-[0.8rem] leading-6 text-ink focus:outline-none"
        />
        <p className="mt-3 text-sm leading-6 text-stone">
          How the process works, step by step:{" "}
          <Link
            href="/learn/credit/disputing-credit-errors"
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Disputing an Error on Your Credit Report
          </Link>{" "}
          and{" "}
          <Link
            href="/learn/government-aid/debt-collector-rights"
            className="font-semibold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
          >
            Your Rights When a Debt Collector Calls
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
