import { type ReactNode } from "react";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import {
  GLOSSARY_PATTERN,
  slugForSurface,
  getGlossaryTerm,
} from "@/lib/glossary";
import { makeHeadingIder } from "@/lib/articles/headings";
import type { ArticleBlock } from "@/lib/articles/types";
import GlossaryTerm from "@/components/GlossaryTerm";

// Inline parse: [text](/internal-path) links and **bold**/*italic* first,
// then auto-link the FIRST occurrence of each glossary term in the remaining
// text (tracked via the shared `used` set so a term links once per article,
// not once per paragraph).
function renderInline(
  text: string,
  used: Set<string>,
  keyPrefix: string
): ReactNode[] {
  const nodes: ReactNode[] = [];
  // [label](/path) (internal links only) | **bold** | *italic*;
  // bold/italic inner content can't contain an asterisk.
  const tokenRe = /\[([^\]]+)\]\((\/[^)\s]*)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = tokenRe.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(
        ...linkTerms(text.slice(last, m.index), used, `${keyPrefix}-t${i}`)
      );
    }
    if (m[1] !== undefined) {
      nodes.push(
        <Link
          key={`${keyPrefix}-a${i}`}
          href={m[2]}
          className="font-medium text-forest underline decoration-2 underline-offset-[3px] transition-colors hover:text-ink"
          style={{ textDecorationColor: "var(--article-accent, var(--color-amber))" }}
        >
          {m[1]}
        </Link>
      );
    } else if (m[3] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-s${i}`}>{m[3]}</strong>);
    } else {
      nodes.push(<em key={`${keyPrefix}-e${i}`}>{m[4]}</em>);
    }
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) {
    nodes.push(...linkTerms(text.slice(last), used, `${keyPrefix}-t${i}`));
  }
  return nodes;
}

function linkTerms(
  text: string,
  used: Set<string>,
  keyPrefix: string
): ReactNode[] {
  const re = new RegExp(GLOSSARY_PATTERN, "gi");
  const nodes: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    const surface = m[1];
    const slug = slugForSurface(surface);
    if (!slug || used.has(slug)) continue;
    used.add(slug);
    if (m.index > last) nodes.push(text.slice(last, m.index));
    nodes.push(
      <GlossaryTerm
        key={`${keyPrefix}-g${i}`}
        slug={slug}
        term={surface}
        definition={getGlossaryTerm(slug)?.definition ?? ""}
        articleHref={getGlossaryTerm(slug)?.article}
      />
    );
    last = m.index + surface.length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function Tip({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 rounded-r-xl border-l-[3px] border-amber bg-amber/[0.08] py-4 pl-5 pr-5">
      <span className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-amber-deep">
        <Lightbulb className="h-3.5 w-3.5" />
        Tip
      </span>
      <div className="text-[1.05rem] leading-7 text-ink">{children}</div>
    </div>
  );
}

function PullQuote({
  children,
  accent,
}: {
  children: ReactNode;
  accent: string;
}) {
  return (
    <blockquote
      className="my-10 border-l-[3px] pl-6"
      style={{ borderColor: accent }}
    >
      <p className="font-display text-[1.6rem] font-medium leading-[1.35] tracking-tight text-ink sm:text-[1.8rem]">
        {children}
      </p>
    </blockquote>
  );
}

export default function ArticleBody({
  blocks,
  accent = "var(--color-forest)",
}: {
  blocks: ArticleBlock[];
  accent?: string;
}) {
  const used = new Set<string>();
  const ider = makeHeadingIder();
  const firstParagraph = blocks.findIndex((b) => b.type === "p");

  return (
    <div className="article-body">
      {blocks.map((block, i) => {
        const key = `b${i}`;
        switch (block.type) {
          case "h2":
            return (
              <div key={key} className="mt-14">
                <span
                  className="block h-1 w-12 rounded-full"
                  style={{ background: accent }}
                />
                <h2
                  id={ider(block.text ?? "")}
                  className="mt-4 scroll-mt-28 font-display text-[1.7rem] font-bold tracking-tight text-ink sm:text-[2rem]"
                >
                  {renderInline(block.text ?? "", used, key)}
                </h2>
              </div>
            );
          case "h3":
            return (
              <h3
                key={key}
                className="mt-9 font-display text-xl font-bold text-ink"
              >
                {renderInline(block.text ?? "", used, key)}
              </h3>
            );
          case "p":
            return (
              <p
                key={key}
                className={`mt-6 text-[1.1875rem] leading-[1.75] text-ink ${
                  i === firstParagraph ? "article-dropcap" : ""
                }`}
              >
                {renderInline(block.text ?? "", used, key)}
              </p>
            );
          case "list":
            return (
              <ul key={key} className="mt-6 space-y-3">
                {(block.items ?? []).map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[1.1875rem] leading-[1.7] text-ink"
                  >
                    <span
                      className="mt-[0.7rem] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: accent }}
                    />
                    <span>{renderInline(item, used, `${key}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={key} className="mt-6 space-y-4">
                {(block.items ?? []).map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-4 text-[1.1875rem] leading-[1.7] text-ink"
                  >
                    <span
                      className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-cream"
                      style={{ background: accent }}
                    >
                      {j + 1}
                    </span>
                    <span>{renderInline(item, used, `${key}-${j}`)}</span>
                  </li>
                ))}
              </ol>
            );
          case "tip":
            return (
              <Tip key={key}>{renderInline(block.text ?? "", used, key)}</Tip>
            );
          case "key":
            return (
              <PullQuote key={key} accent={accent}>
                {renderInline(block.text ?? "", used, key)}
              </PullQuote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
