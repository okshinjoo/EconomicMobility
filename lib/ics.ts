// iCalendar (.ics) generation for the student money calendar (July 2026):
// "add to calendar" without touching a phone number. Pure client-side —
// each event is a YEARLY-recurring all-day entry with a one-week-before
// alarm, so the visitor's own calendar app does the reminding forever.
// Dates come only from lib/deadlines (the registry rule).

import type { Deadline } from "./deadlines";

const SITE = "https://economicmobilityproject.org";

/** Escape iCalendar text values. */
function esc(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/** Fold lines at 75 octets per RFC 5545 (continuation = CRLF + space). */
function fold(line: string): string {
  const out: string[] = [];
  let rest = line;
  while (rest.length > 73) {
    out.push(rest.slice(0, 73));
    rest = " " + rest.slice(73);
  }
  out.push(rest);
  return out.join("\r\n");
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** The next time this month/day comes around, from today. */
function nextOccurrence(month: number, day: number, from: Date): Date {
  const year =
    month - 1 > from.getMonth() ||
    (month - 1 === from.getMonth() && day >= from.getDate())
      ? from.getFullYear()
      : from.getFullYear() + 1;
  return new Date(year, month - 1, day);
}

/** One VCALENDAR containing the given deadlines as yearly events. */
export function buildDeadlinesIcs(items: Deadline[], now = new Date()): string {
  const stamp =
    now.getUTCFullYear().toString() +
    pad(now.getUTCMonth() + 1) +
    pad(now.getUTCDate()) +
    "T" +
    pad(now.getUTCHours()) +
    pad(now.getUTCMinutes()) +
    pad(now.getUTCSeconds()) +
    "Z";

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Empower — Economic Mobility Project//Student Money Calendar//EN",
    "CALSCALE:GREGORIAN",
  ];

  for (const d of items) {
    const start = nextOccurrence(d.month, d.day, now);
    const date =
      start.getFullYear().toString() +
      pad(start.getMonth() + 1) +
      pad(start.getDate());
    lines.push(
      "BEGIN:VEVENT",
      `UID:${d.id}@economicmobilityproject.org`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${date}`,
      "RRULE:FREQ=YEARLY",
      fold(`SUMMARY:${esc(`${d.title} (Empower)`)}`),
      fold(`DESCRIPTION:${esc(`${d.why}\nThe guide: ${SITE}${d.href}`)}`),
      fold(`URL:${SITE}${d.href}`),
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      fold(`DESCRIPTION:${esc(`Coming up: ${d.title}`)}`),
      "TRIGGER:-P7D",
      "END:VALARM",
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}
