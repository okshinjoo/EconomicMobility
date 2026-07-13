"use client";

// "Add to calendar" buttons for the student money calendar (July 2026):
// generates the .ics on the client and downloads it — the visitor's own
// calendar app handles reminders from then on. No phone numbers, no
// servers, nothing stored.

import { CalendarPlus } from "lucide-react";
import { deadlines, type Deadline } from "@/lib/deadlines";
import { buildDeadlinesIcs } from "@/lib/ics";

function download(items: Deadline[], filename: string) {
  const blob = new Blob([buildDeadlinesIcs(items)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Small per-deadline button. */
export function AddOneToCalendar({ deadlineId }: { deadlineId: string }) {
  const d = deadlines.find((x) => x.id === deadlineId);
  if (!d) return null;
  return (
    <button
      type="button"
      onClick={() => download([d], `empower-${d.id}.ics`)}
      className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-stone transition-colors hover:text-ink"
      title="Downloads a calendar file — open it and your calendar app takes over"
    >
      <CalendarPlus className="h-3.5 w-3.5" />
      Add to calendar
    </button>
  );
}

/** The whole calendar in one file. */
export function AddAllToCalendar() {
  return (
    <button
      type="button"
      onClick={() => download(deadlines, "empower-student-money-calendar.ics")}
      className="btn-ink inline-flex items-center gap-2 rounded-md bg-cream px-5 py-2.5 text-sm font-bold text-ink"
    >
      <CalendarPlus className="h-4 w-4" />
      Add all {deadlines.length} to your calendar
    </button>
  );
}
