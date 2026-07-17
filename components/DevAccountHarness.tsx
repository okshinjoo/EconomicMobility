"use client";

// DEV-ONLY harness: renders the signed-in account view (dashboard + settings
// tabs) with a stubbed Supabase client and a fake session, so signed-in UI
// can be inspected and iterated without authenticating. The route that mounts
// this 404s in production (see app/dev/account-preview/page.tsx).

import { useSearchParams } from "next/navigation";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { ProfileEditor } from "@/components/AccountPanel";
import type { CanopyTotals } from "@/components/SkillTreeMini";
import type { TopicPath, BadgeSource } from "@/components/WelcomeBack";

// ?fresh=1 renders a BRAND-NEW member (empty profile) so the first-sign-in
// welcome + finish-your-profile chip can be previewed; default is the filled
// demo profile used for dashboard styling work.
function makeMockSupabase(fresh: boolean): SupabaseClient {
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({
            data: fresh
              ? null
              : {
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
}

const mockSession = {
  user: {
    id: "00000000-0000-0000-0000-00000000dev0",
    email: "dev-preview@example.com",
    email_confirmed_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
} as Session;

export default function DevAccountHarness({
  paths,
  badgeSources,
  canopyTotals,
}: {
  paths: TopicPath[];
  badgeSources: BadgeSource[];
  canopyTotals?: CanopyTotals;
}) {
  const fresh = useSearchParams().get("fresh") === "1";
  return (
    <ProfileEditor
      supabase={makeMockSupabase(fresh)}
      session={mockSession}
      syncedKeys={0}
      paths={paths}
      badgeSources={badgeSources}
      canopyTotals={canopyTotals}
      fromAuthRedirect={false}
    />
  );
}
