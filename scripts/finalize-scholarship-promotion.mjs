import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const write = process.argv.includes("--write");
const encoded = process.argv.find((argument) => argument.startsWith("--packet-base64="))?.slice(16)
  || process.env.SCHOLARSHIP_PROMOTION_PACKET_BASE64;
const commitSha = process.env.SCHOLARSHIP_PROMOTION_COMMIT_SHA?.trim();
if (!encoded || !commitSha) throw new Error("The promotion packet and deployed commit SHA are required.");

const packet = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
const inventory = JSON.parse(await readFile(new URL("../data/scholarship-monitor-inventory.json", import.meta.url), "utf8"));
const publicRecord = inventory.records.find((record) => record.scholarshipId === packet.catalogRecord?.id);
if (!publicRecord || publicRecord.publicationStatus !== "published") throw new Error("The published monitor record is missing from the generated inventory.");

if (!write) {
  console.log(`${publicRecord.scholarshipId}: production monitor transfer is ready.`);
  process.exit(0);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) throw new Error("Supabase production credentials are required.");
const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
const { data, error } = await admin.rpc("finalize_scholarship_promotion", {
  p_candidate_id: packet.sourceCandidateId,
  p_public_record: publicRecord,
  p_commit_sha: commitSha,
});
if (error) throw error;
if (data?.publishedId !== publicRecord.scholarshipId || data?.candidateId !== packet.sourceCandidateId) {
  throw new Error("The production monitor transfer returned an unexpected result.");
}
console.log(JSON.stringify(data));
