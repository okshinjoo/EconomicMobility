"use client";

// DEV-ONLY harness: renders the signed-in account view (dashboard + settings
// tabs) with a stubbed Supabase client and a fake session, so signed-in UI
// can be inspected and iterated without authenticating. The route that mounts
// this 404s in production (see app/dev/account-preview/page.tsx).

import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { ProfileEditor } from "@/components/AccountPanel";
import type { TopicPath, BadgeSource } from "@/components/WelcomeBack";

const mockSupabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        maybeSingle: async () => ({
          data: {
            display_name: "Shinjoo",
            role: "student",
            show_tag: true,
            goals: ["credit", "invest"],
            flairs: ["first-gen", "spreadsheet-lover"],
          },
          error: null,
        }),
      }),
    }),
    upsert: async () => ({ error: null }),
  }),
  auth: {
    updateUser: async () => ({ data: {}, error: null }),
    signOut: async () => ({ error: null }),
  },
} as unknown as SupabaseClient;

const mockSession = {
  user: {
    id: "00000000-0000-0000-0000-00000000dev0",
    email: "dev-preview@example.com",
    email_confirmed_at: new Date().toISOString(),
  },
} as Session;

export default function DevAccountHarness({
  paths,
  badgeSources,
}: {
  paths: TopicPath[];
  badgeSources: BadgeSource[];
}) {
  return (
    <ProfileEditor
      supabase={mockSupabase}
      session={mockSession}
      syncedKeys={0}
      paths={paths}
      badgeSources={badgeSources}
      fromAuthRedirect={false}
    />
  );
}
