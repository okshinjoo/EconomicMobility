const repository = "okshinjoo/EconomicMobility";
const commitSha = process.env.SCHOLARSHIP_PROMOTION_COMMIT_SHA?.trim();
const scholarshipId = process.env.SCHOLARSHIP_PROMOTION_PUBLIC_ID?.trim();
const productionUrl = (process.env.SCHOLARSHIP_PRODUCTION_URL || "https://economicmobilityproject.org").replace(/\/$/, "");
const token = process.env.GITHUB_TOKEN?.trim();
if (!commitSha || !scholarshipId) throw new Error("The commit SHA and public scholarship ID are required.");

const headers = {
  accept: "application/vnd.github+json",
  "user-agent": "Empower-Scholarship-Publisher",
  ...(token ? { authorization: `Bearer ${token}` } : {}),
};
const deadline = Date.now() + 12 * 60 * 1000;
let deployed = false;
while (Date.now() < deadline) {
  const response = await fetch(`https://api.github.com/repos/${repository}/commits/${commitSha}/status`, { headers });
  if (!response.ok) throw new Error(`Could not read deployment status (${response.status}).`);
  const status = await response.json();
  if (status.state === "failure" || status.state === "error") throw new Error("The production deployment failed.");
  if (status.state === "success") {
    deployed = true;
    break;
  }
  await new Promise((resolve) => setTimeout(resolve, 15_000));
}
if (!deployed) throw new Error("Timed out waiting for the production deployment.");

const response = await fetch(`${productionUrl}/api/scholarship-catalog?id=${encodeURIComponent(scholarshipId)}&release=${commitSha}`, {
  headers: { "cache-control": "no-cache" },
});
if (!response.ok) throw new Error(`The live catalog verification endpoint returned ${response.status}.`);
const catalog = await response.json();
if (catalog.scholarship?.id !== scholarshipId || !catalog.scholarship?.geo || !Array.isArray(catalog.scholarship?.eligibility)) {
  throw new Error("The deployed Finder does not contain the fully classified scholarship record.");
}
console.log(`${scholarshipId}: live in the ${catalog.count}-award production catalog.`);
