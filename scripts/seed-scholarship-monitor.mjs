import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const write = process.argv.includes("--write");
const inventory = JSON.parse(
  await readFile(new URL("../data/scholarship-monitor-inventory.json", import.meta.url), "utf8"),
);

if (
  !Array.isArray(inventory.records) ||
  inventory.records.length !== inventory.publishedCount + (inventory.withheldCount ?? 0)
) {
  throw new Error("Invalid scholarship monitoring inventory.");
}

if (!write) {
  console.log(
    `Dry run: ${inventory.records.length} curated scholarships and their official sources are ready to seed.`,
  );
  console.log("Re-run with --write only after docs/scholarship-monitor-schema.sql is applied.");
} else {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for --write.");
  }

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  for (let index = 0; index < inventory.records.length; index += 100) {
    const chunk = inventory.records.slice(index, index + 100);
    const inventoryRows = chunk.map((record) => ({
      scholarship_id: record.scholarshipId,
      name: record.name,
      official_url: record.officialUrl,
      source_domain: record.sourceDomain,
      publication_status: record.publicationStatus,
      catalog_fingerprint: record.catalogFingerprint,
      catalog_verified_label: record.catalogVerifiedLabel,
      geo_scope: record.geo?.scope ?? null,
      geo_states: record.geo?.states ?? [],
      geo_verification_status: record.geoVerificationStatus,
      geo_evidence: record.geoEvidence || null,
      geo_source_url: record.geoSourceUrl || record.officialUrl,
    }));
    const { error: inventoryError } = await admin
      .from("scholarship_monitor_inventory")
      .upsert(inventoryRows, { onConflict: "scholarship_id" });
    if (inventoryError) throw inventoryError;

    const sourceRows = chunk.map((record) => ({
      scholarship_id: record.scholarshipId,
      source_kind: "official",
      url: record.officialUrl,
      source_domain: record.sourceDomain,
    }));
    const { error: sourceError } = await admin
      .from("scholarship_monitor_sources")
      .upsert(sourceRows, { onConflict: "scholarship_id,source_kind,url", ignoreDuplicates: true });
    if (sourceError) throw sourceError;

    const domains = [...new Set(chunk.map((record) => record.sourceDomain))].map((domain) => ({ domain }));
    const { error: domainError } = await admin
      .from("scholarship_monitor_domains")
      .upsert(domains, { onConflict: "domain", ignoreDuplicates: true });
    if (domainError) throw domainError;
  }

  const { count, error: countError } = await admin
    .from("scholarship_monitor_inventory")
    .select("scholarship_id", { count: "exact", head: true })
    .eq("publication_status", "published");
  if (countError) throw countError;

  console.log(
    `Seed complete: database reports ${count ?? "unknown"} published scholarship inventory rows.`,
  );
  if (count !== inventory.publishedCount) {
    console.warn(
      `Expected ${inventory.publishedCount}; existing non-catalog rows were retained for manual review rather than deleted.`,
    );
  }
}
