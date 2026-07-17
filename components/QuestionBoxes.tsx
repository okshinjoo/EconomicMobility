import Link from "next/link";
import Reveal from "@/components/Reveal";

/**
 * SAVED TEMPLATE (July 2026): the Base44-style numbered question boxes that
 * briefly lived on the homepage question band. The owner polled readers, the
 * original serif rows won, and the homepage reverted — but she liked this
 * pattern enough to keep it for OTHER surfaces (it reads best on light
 * backgrounds, as a short "pick your entry point" list of 3–6 items).
 *
 * Not mounted anywhere yet. Candidate homes, per the owner brainstorm:
 * /start-here FAQ, /ask "most-asked questions" above the form, a topic hub's
 * "questions this topic answers" intro, quiz-results starting steps.
 *
 * Colors are the Base44-extracted palette (deliberate, owner-directed copy):
 * ink #1A1A1A boxes on #F5F2EB, amber #E69A37 numeral chip that floods on
 * hover. The trailing arrow is part of the copied design (owner exception
 * to the no-arrows rule).
 */
export interface QuestionBoxItem {
  q: string;
  href: string;
  /** Optional right-side label; defaults to "Read the guide". */
  action?: string;
}

export default function QuestionBoxes({
  items,
  reveal = true,
}: {
  items: QuestionBoxItem[];
  /** Set false inside surfaces that already animate their children. */
  reveal?: boolean;
}) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => {
        const row = (
          <Link
            href={item.href}
            className="group flex items-center gap-4 rounded-lg border-2 border-[#1A1A1A] bg-[#F5F2EB] px-5 py-3.5 text-[#1A1A1A] transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E69A37]/10 font-display text-xl font-bold leading-none text-[#E69A37] transition-colors group-hover:bg-[#E69A37] group-hover:text-[#1A1A1A]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 font-display text-base font-medium leading-snug sm:text-lg">
              {item.q}
            </span>
            <span className="hidden shrink-0 text-sm text-[#616161] transition-colors group-hover:text-[#E69A37] sm:block">
              {item.action ?? "Read the guide"} &rarr;
            </span>
          </Link>
        );
        return (
          <li key={item.href}>
            {reveal ? <Reveal delay={i * 80}>{row}</Reveal> : row}
          </li>
        );
      })}
    </ul>
  );
}
