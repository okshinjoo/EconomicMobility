// Generated from the completed 2026-08-05 Scholarship Finder QC audit.
// The audit evidence remains canonical under ../Scholarship QC Audit 2026-08-05.
// Records that failed or were resolved to withholding remain preserved in the
// source catalog. Owner-approved exceptions and final policy resolutions are
// published only when the evidence documents a qualifying no-cost route.

import {
  SCHOLARSHIP_AMOUNT_FLOOR_EXCEPTION_COUNT,
  scholarshipAmountFloorExceptionIds,
  scholarshipAmountFloorSourceOverrides,
} from "./scholarshipAmountFloorExceptions.generated";
import { scholarshipAutomatedPromotedIds } from "./scholarshipPromotions.generated";

export const SCHOLARSHIP_AUDIT_DATE = "2026-08-05";
export const SCHOLARSHIP_AUDIT_TOTAL = 1_635;
export const SCHOLARSHIP_AUDIT_PASSED = 644;
export const SCHOLARSHIP_AUDIT_REMOVAL = 409;
export const SCHOLARSHIP_AUDIT_MANUAL_REVIEW = 578;
export const SCHOLARSHIP_MANUAL_RESOLVED_PUBLISHED = 4;
export const SCHOLARSHIP_OWNER_APPROVED_POLICY_PUBLISHED = 22;
export const SCHOLARSHIP_FINAL_POLICY_RESOLVED_PUBLISHED = 2;
export const SCHOLARSHIP_COVERAGE_AUDIT_PUBLISHED = 38;
export const SCHOLARSHIP_COVERAGE_REVIEW_RESOLVED_PUBLISHED = 17;
export const SCHOLARSHIP_MODERATOR_PROMOTED_PUBLISHED = 2 + scholarshipAutomatedPromotedIds.length;
export const SCHOLARSHIP_MANUAL_REVIEW_WITHHELD = 43;
export const SCHOLARSHIP_NO_REGIONALS_POST_AUDIT_REMOVED = 2;
export const SCHOLARSHIP_PUBLIC_TOTAL =
  SCHOLARSHIP_AUDIT_PASSED +
  SCHOLARSHIP_AMOUNT_FLOOR_EXCEPTION_COUNT +
  SCHOLARSHIP_MANUAL_RESOLVED_PUBLISHED +
  SCHOLARSHIP_OWNER_APPROVED_POLICY_PUBLISHED +
  SCHOLARSHIP_FINAL_POLICY_RESOLVED_PUBLISHED +
  SCHOLARSHIP_COVERAGE_AUDIT_PUBLISHED +
  SCHOLARSHIP_COVERAGE_REVIEW_RESOLVED_PUBLISHED +
  SCHOLARSHIP_MODERATOR_PROMOTED_PUBLISHED -
  SCHOLARSHIP_NO_REGIONALS_POST_AUDIT_REMOVED;

const passedIdText = "jkc-transfer jkc-college gates questbridge coca-cola dell horatio-alger dream-us-national dream-us-opportunity hsf ron-brown apia american-indian-college-fund cameron-impact amazon-future-engineer elks-mvs vfw-voice equitable-excellence ge-reagan dream-award regeneron-sts soroptimist-live-your-dream rankin-scholar-grant patsy-mink-education-award davis-putter sme-education aws-welding taco-bell-live-mas hhf-youth-awards cafe-bustelo kasf oca-gold-mountain aises cobell-undergrad league-foundation out-to-innovate aahd-krause lime-pathways foster-love-fellowship burger-king-scholars carson-scholars legion-oratorical afsa-essay optimist-essay davidson-fellows coolidge-scholarship hagan-scholarship smart-dod gmis-stem acs-catalyst nurse-corps aicpa-legacy acfe-ritchie-jennings aiga-worldstudio schoolhouse-connection frs-rural sallie-mae-bridging esperanza-fund ushli-andrade pride-foundation dream-project-va marine-corps-scholarship fisher-house-military-children tillman-scholars amvets-national jack-and-jill islamic-scholarship-fund aief-undergrad first-nations-ag chick-fil-a-community mcdonalds-hacer princess-grace-awards sodexo-stop-hunger regions-riding-forward dennys-hungry-for-education ahla-academic texas-grant terry-foundation florida-bright-futures take-stock-in-children excelsior-ny nys-tap pa-state-grant illinois-map golden-apple-scholars ocog-ohio ohio-governors-merit choose-ohio-first next-nc golden-leaf-nc samsung-legion path-to-pro stacey-milbern uhf-health-care-scholars haz-la-u nm-cancer-survivor nm-cancer-sibling exploravision ncwit-collegiate awg-geoscience hyundai-women-stem point-community-college gamma-mu pfund traub-dicker-rainbow live-out-loud apiqwtc phcc-foundation nawic-founders agc-foundation women-in-hvacr horatio-alger-cte durastak-syngenta naba-national nahj ija-aaja-pacific-islander nfb-scholarship sertoma-hearing anne-ford-ncld rubys-rainbow wa-college-bound or-opportunity-grant or-promise-grant az-promise-program nm-opportunity-scholarship ak-performance-scholarship hi-promise-scholarship mt-honor-scholarship wy-hathaway-scholarship ca-cal-grant tn-tsaa la-tops ms-help ar-academic-challenge ok-promise dc-tuition-assistance-grant nh-governors-scholarship in-21st-century-scholars sd-opportunity-scholarship roothbert-fund-scholarship cofem-mexican-american-dream-scholarship aicpa-two-year-transfer wisp-doris-buffett-grant cybercorps-scholarship-for-service asce-scholarships nih-undergraduate-scholarship-program actuarial-foundation-stem-stars barry-goldwater-scholarship pama-national-scholarships aea-educational-foundation-scholarships pma-educational-foundation-scholarship iec-foundation-scholarship pba-minerva-beauty-scholarship appa-deed-lineworker-scholarship sigma-gamma-rho-nef-scholarships fossi-hbcu-stem-scholars henaac-gmis-scholars aaia-native-scholarship udall-undergraduate-scholarship adc-shaheen-media-scholarship oar-postsecondary-scholarship peo-star-scholarship ncld-allegra-ford-thomas-scholarship paf-scholarship-for-survivors pfef-children-of-incarcerated-scholarship kroger-scholars teamsters-hoffa-scholarship ufcw-charity-foundation-scholarship union-plus-scholarship seiu-1199-joseph-tauber-scholarship knights-of-columbus-scholarships girl-scouts-gold-award-scholarship 4-h-youth-in-action-scholarship becu-foundation-scholarship army-rotc-scholarship navy-marine-rotc-scholarship air-force-space-force-rotc-scholarship coast-guard-cspi fry-scholarship amvets-ladies-auxiliary-scholarship tx-charles-butt-scholarship fl-minority-teacher-education-scholarship r-gene-richter-scholarship nrf-foundation-next-generation-scholarship pmi-founders-scholarship larry-b-sawyer-student-scholarship hsmai-mike-dimond-scholarship appraisal-institute-education-trust-scholarship cas-trust-scholarship jfk-profile-in-courage-essay-contest poetry-out-loud glenn-miller-scholarship-competition unico-alessio-southern-italy-scholarship oca-joe-loanne-chiu-scholarship vausa-fallen-heroes-scholarship nfia-partner-donor-scholarship naahp-haitian-american-leadership-scholarship gbhem-umc-scholarship pcusa-undergraduate-scholarship abhms-baptist-scholarship sharda-hindu-scholarship isna-scholarship vertex-foundation-scd-tdt-scholarship acb-scholarship-program scholastic-tourette-scholarship abbvie-immunology-scholarship boomer-esiason-academic-scholarship 180-medical-scholarship noaa-hollings-scholarship awwa-woodard-curran-scholarship imagine-america-asep imagine-america-high-school-scholarship perry-second-chances-scholarship texas-national-guard-state-tuition-assistance nsa-scholarship-foundation obama-chesky-voyager-scholarship gloria-barron-prize diller-teen-tikkun-olam-awards stamps-scholars horatio-alger-state-scholarships nmcrs-education-assistance nmfa-spouse-scholarship fallen-patriots-scholarship sowf-college-scholarship fashion-scholarship-fund-case-study apf-brehm-undergraduate-psychology-scholarship prsa-foundation-geoffrey-curtis-scholarship apa-foundation-scholarship-in-planning abfse-national-scholarship chick-fil-a-team-member-scholarship kfc-foundation-reach-scholarship publix-carol-jenkins-barnett-scholarship pizza-hut-foundation-scholarship babe-ruth-league-college-scholarship pga-works-lundgren-scholars nff-national-scholar-athlete-award pr-beca-legislativa cnmi-eap-base-grant texas-foster-tuition-waiver florida-foster-tuition-exemption ioof-wirz-scholarship bgca-youth-of-the-year-scholarships sar-knight-essay-contest jci-senate-foundation-scholarship helm-leadership-fellows-scholarship aist-steel-intern-scholarship isc2-undergraduate-scholarship ncwit-aspirations-collegiate-award awg-minority-scholarship nspe-steinman-scholarship choose-aerospace-skillpointe-scholarship nalp-foundation-scholarship alpha-sigma-lambda-scholarship chime-scholars-foundation point-foundation-access-scholarship california-lgbtq-foundation-scholarship pflag-new-orleans-scholarship oar-schwallie-family-scholarship incight-scholarship nbcuniversal-tony-coelho-media-scholarship hemophilia-federation-of-america-scholarship abbvie-cf-scholarship microsoft-disability-scholarship mpower-global-citizen-scholarship lois-britt-memorial-pork-industry-scholarship dst-oleta-lawanda-crain-scholarship momeni-foundation-scholarships kappa-alpha-psi-foundation-achievement-scholarship laef-general-youth-scholarship dow-jones-news-fund nppf-student-scholarships bea-scholarships your-future-is-now-scholarship aiga-worldstudio-dxd-scholarships penguin-random-house-creative-writing-awards wings-over-america-scholarship tall-clubs-international-scholarship bri-myimpact-challenge elie-wiesel-prize-in-ethics us-senate-youth-program ascp-foundation-ring-empowerment-scholarship aotf-lands-banks-memorial-scholarship arthritis-champion-scholarship nsa-krishnan-yegneswaran-scholarship rareis-scholarship-fund nccf-survivor-scholarship nccf-legacy-scholarship lls-blood-cancer-survivors-scholarship asa-norman-beery-memorial-scholarship spencer-educational-foundation-undergraduate-scholarship aierf-college-scholarship ncrf-a-to-z-scholarship asid-foundation-polsky-award aaf-sean-finnegan-memorial-scholarship aaf-mosaic-scholarship home-depot-orange-scholars dav-scholarships-for-student-volunteers coast-guard-foundation-scholarship navy-league-foundation-scholarship iaff-mcclennan-scholarship nm-legislative-lottery-scholarship sc-life-scholarship al-collegecounts-scholarship ms-help-grant wv-promise-scholarship naehcy-scholars-program pitzer-family-education-foundation naacp-empowering-better-tomorrow venus-morris-griffin-scholarship peyton-tuthill-hearts-of-hope-scholarship hep-camp-association-scholarship florida-farmworker-student-scholarship amet-scholarship-program larry-b-sanchez-memorial-scholarship gabriel-gomez-sandoval-farmworker-memorial-scholarship herren-project-go-purple-scholarship jed-student-voice-of-mental-health-awards ron-howell-caregiver-scholarship vertex-foundation-healthy-families-scholarship gabriela-blanco-sibling-scholarship agnes-mccarthy-family-caregiving-scholarship ala-children-of-warriors-scholarship toyota-motor-north-america-scholarship natf-navigate-your-future-scholarship nd-alliance-neurodiversity-scholarship agc-workforce-development-scholarship aci-foundation-scholarship zonta-young-women-in-leadership-award critical-language-scholarship nsli-y-scholarship breakthrough-junior-challenge wisconsin-academic-excellence-scholarship south-dakota-build-dakota-scholarship oklahoma-tuition-aid-grant south-carolina-palmetto-fellows-scholarship fred-scheigert-scholarship afb-scholars-program cochlear-scholarships optimist-ccdhh-scholarship aer-ferrell-scholarship help-america-hear-scholarship american-indian-services-scholarship truman-d-picard-scholarship unity-cook-scholarships student-veterans-of-america-scholarships afcea-war-veterans-scholarship ala-non-traditional-student-scholarship pva-educational-scholarship-program finlandia-foundation-national-scholarship tennessee-hope-scholarship missouri-bright-flight montana-stem-healthcare-scholarship north-dakota-scholarship alaska-education-grant delaware-scholarship-incentive-program south-carolina-hope-scholarship stephen-phillips-memorial-scholarship-fund southwest-airlines-community-scholarship synchrony-scholarship-autistic-students-of-color pepsico-foundation-nextstep-scholarship new-york-life-golden-futures-scholarship firehouse-subs-public-safety-scholarship ahla-american-express-scholarship isna-musa-dakri-scholarship isna-amana-mutual-funds-scholarship elca-rossing-physics-scholarship cma-education-foundation-maritime-scholarship arema-educational-foundation-scholarship league-of-railway-women-scholarships nrc-scholarship-program aptf-scholarship-program comto-national-scholarship-program wts-foundation-scholarships university-of-the-aftermarket-foundation-scholarship izaak-walton-league-national-conservation-scholarship gca-awards-for-summer-environmental-studies asla-council-of-fellows-scholarship owaa-bodie-mcdowell-scholarship distinguished-young-women abwa-sbmef-national-scholarship ams-freshman-undergraduate-scholarship aag-darrel-hess-community-college-geography-scholarship actfl-future-teacher-scholarship-program jw-pepper-music-education-scholarship aslta-nathie-marbury-scholarship dga-student-spotlight-awards natas-national-scholarships cbc-spouses-visual-arts-scholarship ruth-lilly-poetry-fellowships naacp-ldf-herbert-lehman-scholarship hacu-coca-cola-first-generation-scholarship kao-kalia-yang-scholarship chia-family-foundation-scholarship whataburger-feeding-student-success-scholarship costco-employee-scholarship cox-jim-kennedy-scholarship-fund discount-tire-bruce-t-halle-scholarship fred-lena-meijer-scholarship elks-emergency-educational-grants national-space-club-keynote-scholarship national-exchange-club-youth-of-the-year mississippi-eminent-scholars-grant arkansas-governors-distinguished-scholarship texas-armed-services-scholarship-program oklahoma-rising-scholars-award louisiana-tops-tech-award kansas-education-opportunity-scholarship kansas-state-scholarship disabledperson-national-scholarship latin-grammy-cultural-foundation-scholarships van-hipp-heroes-scholarship-fund culvers-foundation-scholarship sc-guard-college-assistance tennessee-future-teacher-scholarship oklahoma-inspired-to-teach teaching-fellows-for-maryland phi-kappa-phi-study-abroad-grant ashrae-undergraduate-engineering-scholarships aiche-mcketta-undergraduate-scholarship asnt-engineering-undergraduate-scholarship asabe-foundation-engineering-scholarship acec-research-institute-scholarships ite-university-scholars-program aisc-scholarships aeg-foundation-scholarships project-sleep-narcolepsy-scholarship hydrocephalus-association-scholarship acpa-randall-larossa-scholarship amputee-coalition-skoski-scholarship minnesota-surviving-children-spouses-benefit bnsf-college-scholarship-program american-airlines-education-foundation-scholarship dominion-energy-educational-equity-scholarship entergy-community-power-scholarship entergy-power-your-future-scholarship aiec-thomas-moore-scholarship florida-ease-grant oklahoma-tuition-equalization-grant arrl-foundation-scholarship-program able-flight-scholarships leroy-homer-flight-scholarship sousa-foundation-hawkins-scholarship akc-humane-fund-spurling-scholarship fellows-smacna association-concrete-precast-undergraduate association-carriers-truckload nuca association-industry-industry-tire-tire supplyhouse-to-track-trades association-contractors-diving-international gas-propane dewalt-trade norfolk-on-southern-track-trades nation-skilled cpa-pennsylvania educational-vscpa njcpa cpa-nc accounting-cpa-washington cpas-educational-georgia-society cpas-educational-england-new-society cpa-ohio future-nacs first-generation-tiaa council-executive-leadership charities-nbaa aaae-aviation-women aapg-camp-field seg association-black-geoscientists affairs-aiche-committee-minority bird-frances-gca-habitat-m ihs forgiveness-loan-minnesota-nurse illinois-nursing boren doodle-google ayn-rand-atlas-shrugged-essay child-kevin educational-joe-pugliese courter-hemophilia-pfizer-soozie gravis-myasthenia-ucb dollars-scholars-um-umhef brethren-care-church-health achievement-coptic-educational-merit-undergraduates 4-h-opportunity-texas 4-h-illinois-state 4-h-iowa nfaa-pro bowl4life-johnny-pba-petraglia california-daniel-fire-terry brands-dependent-fellowes-gen-next corporation-employee-global-waters carolina-children-north-veterans-wartime dependents-military-survivors-virginia benefits-jersey-new-survivor-tuition children-michigan-tuition-veterans 29-dependent-exemption-louisiana-state orphan-virginia-war-west child-disabled-exemption-fee-indiana deceased-dependents-disabled-illinois-mia dependents-kentucky-tuition-veterans-waiver enforcement-firemen-law-mississippi-officers assistance-colorado-dependent-tuition armed-dependent-forces-idaho-officer indigenous-kansas-state-status-tuition fee-foster-nevada-waiver-youth educational-gratuity-pennsylvania-postsecondary california-planning diversity-equity-inclusion-laf-landdesign iida-j-john-legacy-nelson architects-design-diversity-ia-iida competition-design-nkba brand-licensing-nrf avmf-technician-veterinary-zoetis feeding-ift-tomorrow-undergraduate academic-funeral-service application-general-horticulture perennial-plant 1-diabetes-fishman-marc-type administrators-black-forum-public marshall-nabcj-thurgood ecology-tmcf-wildlife creary-drs-family-ludlow-ruth army-association-corps-nurse uspaacc against-artistic-grain american-fish-native-society-wildlife american-native-scholars-vocal fort-future-leaders agri-agriculture-american-american-daughters hourglass-rock-trades-women ostem ar-arkansas-governor-higher-s ar-arkansas-governor-s-scholars la-challenge-go-louisiana-ycp ca-act-alan-pattee oh-adoption-ohio oh-officers-ohio-safety in-children-guard-indiana-indiana in-children-indiana-officers-public in-fee-heart-indiana-purple il-dependent-displaced-energy-illinois mi-incentive-michigan mi-educator-future-mi-stipend ia-blue-d-robert mo-advanced-incentive-placement mo-child-employee-officer-or mo-s-survivors-veteran-wartime in-child-heart-indiana-or nd-scholars corps-dakota hagen-harvey children-deceased-first-responders mt-orphans-war mt-finalist-merit-semi wy-assistance-educational-plan-wyng co-american-colorado-indian-tribes az-academic-all-arizona-team officers-peace-slain heart-purple fighters-fire-officers-peace nm-mexico-new-scholars tx-first-texas ok-donna-george-nigh-oklahoma ok-baccalaureate-oklahoma-regional ok-act-independent-living-oklahoma la-challenge-go-louisiana-youth ca-california-dependents-enforcement-law wa-opportunity-washington tx-leadership-scholars-texas academic-excellence-nys nj-center-jersey-new-trade nj-care-foster-jersey-new ct-chesla-undergraduate ct-children-connecticut-dependent-duty ma-massachusetts-public-service ma-abigail-adams-john ma-certificate-koplik-mastery-stanley ma-paul-tsongas ma-adopted-assistance-child-dcf masstransfer ma-paraprofessional-preparation-teacher ma-demand-massachusetts ma-childhood-early-educators ma-valedictorian higher-nh-orphans-veterans action-ccsnh-children-combatants ccsnh-children-fallen-firefighters ccsnh-children-disabled-nh ccsnh-children-foster nh-ccsnh-hampshire-high-new ccsnh-nh-scholars ccsnh-competition-skillsusa-winners va-transfer-two-virginia-year md-2-2-maryland-transfer md-assistance-maryland-shortage-workforce md-collins-honor-iii-leadership fl-benacquisto-florida al-alabama-assistance-educational-firefighter ms-mississippi-niss tn-helping-heroes-tennessee tn-mcwherter-ned-scholars-tennessee tn-hope-nontraditional-tennessee mo-advanced-incentive-missouri-placement mo-child-employee-missouri-officer mo-missouri-s-survivors-veteran ks-hero-kansas-s ks-kansas-nursing-service ks-kansas-service-teacher ne-attracting-excellence-nebraska-teaching ne-aetp-forgivable-loan-nebraska ca-completion-success ks-adult-kansas-learner ok-oklahoma-ready-regents-workforce al-alabama-alabama-engage in-daniels-early-graduation-mitch c-carl-charitable-trust cla-opportunity ellevation families-frontline ibtta invictus-verus hola-microsoft association-chairs-hydropower-legacy culinary-nicole-reed-v booster-parent-usa pega-scholars america-essential-visionaries america-educators-veteran snc-stem tacp bay-buccaneers-football-is foods-scholars-us health-mental-scholars-voya chubb-worldwide frist-patricia leaders-pedro-young-zamora legacy-swine-uspce dairy-shrine cooperative-english-glenn-leadership competition-gcsaa-scholars christian-legacy-sun-vanna angels-s-thai-u graphics-print aatcc-textile-undergraduate archie-gus-spe academic-assp academic-bcsp-qualified aas-environmental-health-neha american-art-auxiliary-contest";

const unresolvedPassedIds = new Set([
  "oca-gold-mountain",
  "aises",
  "foster-love-fellowship",
  "henaac-gmis-scholars",
  "aiga-worldstudio-dxd-scholarships",
  "ncwit-aspirations-collegiate-award",
  "ms-help-grant",
]);

export const scholarshipAuditPassedIds = new Set(
  passedIdText
    .split(/\s+/)
    .filter(Boolean)
    .filter((id) => !unresolvedPassedIds.has(id)),
);

const scholarshipManualResolvedPublishedIds = new Set([
  "oca-gold-mountain",
  "oca-gold-mountain-college-senior",
  "aises",
  "foster-love-fellowship",
]);

export const scholarshipOwnerApprovedPolicyIds = new Set([
  // Verified programs whose legitimate individual benefits can be below $500.
  "wa-college-grant",
  "nv-millennium-scholarship",
  "co-college-opportunity-fund",
  "al-asap",
  "ky-kees",
  "nj-tag",
  "mn-state-grant",
  "in-frank-obannon",
  "ks-comprehensive-grant",
  "caca-national-essay-contest",
  "ca-dependents-enforcement-law-personnel",
  "il-dependents-exonerees-illinois-their",
  "mn-care-child-minnesota-postsecondary",

  // Verified service-conditioned aid published with repayment warnings.
  "ms-excellence-in-teaching-program",
  "ne-attracting-excellence-teaching-to",
  "ne-attracting-excellence-teaching-teaching",
  "ma-s-teachers-tomorrow",
  "ma-aspiring-incentive-teachers",
  "vt-benefit-health-rural-transformation",
  "vt-benefit-trades-vermont",
  "me-educators-maine",
  "md-agent-maryland-officer-police",
]);

export const scholarshipFinalPolicyResolvedIds = new Set([
  "nhs-scholarship",
  "larrie-londin-memorial-scholarship",
]);

// Independently discovered and verified during the 2026-08-06 coverage audit.
// Evidence and classification notes are preserved in
// ../Scholarship Coverage Audit 2026-08-06/CANDIDATE-REVIEW-QUEUE.md.
export const scholarshipCoverageAuditPublishedIds = new Set([
  "dc-rec-for-all-play-it-forward",
  "wy-wygeo-undergraduate",
  "ak-atia-foundation-student",
  "ak-state-fair-scholarship",
  "il-chemical-education-foundation-undergraduate",
  "me-legislative-memorial",
  "ky-ovr-coca-cola-blind",
  "md-bpw-foundation",
  "ma-families-in-broadcasting",
  "nv-nsea-loretta-harper",
  "nv-nsea-brian-lee-dodea",
  "nj-njrea-allen-hickman",
  "nj-njrea-fred-aug",
  "nj-njrea-krichling-cte",
  "ny-nysir-bambino",
  "ny-nysir-paul-jensen",
  "ny-nysir-goncalves-humanitarian",
  "ok-careertech-casey-cundiff",
  "ok-careertech-washington-dubose",
  "pa-pasfaa-student",
  "or-cosa-scholarships",
  "sc-counties-scholarship",
  "sd-county-government-scholarship",
  "ut-cte-scholarships-awards",
  "wi-ems-association-foundation",
  "wv-water-environment-association",
  "feae-richard-jensen",
  "feae-ray-young",
  "feae-corteva-undergraduate",
  "feae-undergraduate-student",
  "feae-seedling-student",
  "nfa-first-generation-flute",
  "iso-us-journey-spotlight",
  "american-water-impact",
  "bim-scholarship",
  "cme-group-foundation-scholars",
  "dunkin-philadelphia-regional",
  "nh-lodging-restaurant-foundation",
]);

// Borderline coverage-audit leads resolved against current official sources
// on 2026-08-06. Variable awards are described as variable; no minimum award
// is inferred where the sponsor does not publish one.
export const scholarshipCoverageReviewResolvedPublishedIds = new Set([
  "va-brown-board-education",
  "auid-undergraduate",
  "wv-ruth-eden-bailey",
  "mo-futurebuilders-student",
  "nv-nsea-chuck-fletcher",
  "mn-mssa-undergraduate",
  "mn-mssa-children-families-impact",
  "mn-mssa-diversity",
  "id-latino-scholarship-foundation",
  "ar-association-counties",
  "il-township-officials",
  "oh-gas-association",
  "de-joseph-pyle-award",
  "aorn-foundation-academic",
  "id-isba-scholarship-trust",
  "uncf-toyota-scholars",
  "maldef-law-school",
]);

// Scholarships promoted through the private evidence gate after the original
// audit and coverage passes were completed.
export const scholarshipModeratorPromotedIds = new Set([
  "dri-foundation-scholarship",
  "maude-alexander-hadden-scholarship",
  ...scholarshipAutomatedPromotedIds,
]);

// No-regionals rule applied 2026-08-07 (the owner's standing July 2026 rule:
// city promise programs and metro/county singles stay out; the geo
// classification queue surfaced these two already-published violations):
// de-joseph-pyle-award is Wilmington/New Castle County only, and
// dunkin-philadelphia-regional is a Philadelphia-metro county list.
// Entries stay preserved in the catalog like every other removal.
export const scholarshipNoRegionalsPostAuditRemovals = new Set([
  "de-joseph-pyle-award",
  "dunkin-philadelphia-regional",
]);

export const scholarshipPublishedIds = new Set(
  [
    ...scholarshipAuditPassedIds,
    ...scholarshipAmountFloorExceptionIds,
    ...scholarshipManualResolvedPublishedIds,
    ...scholarshipOwnerApprovedPolicyIds,
    ...scholarshipFinalPolicyResolvedIds,
    ...scholarshipCoverageAuditPublishedIds,
    ...scholarshipCoverageReviewResolvedPublishedIds,
    ...scholarshipModeratorPromotedIds,
  ].filter((id) => !scholarshipNoRegionalsPostAuditRemovals.has(id)),
);

export const scholarshipAuditSourceOverrides: Readonly<Record<string, string>> = {
  "nhs-scholarship": "https://www.nationalhonorsociety.org/the-nhs-scholarship/",
  "larrie-londin-memorial-scholarship": "https://pas.org/larrie-londin-memorial-scholarship/",
  "wa-college-grant": "https://wsac.wa.gov/wcg-awards",
  "nv-millennium-scholarship": "https://www.nevadatreasurer.gov/GGMS/GGMS_Info/",
  "co-college-opportunity-fund": "https://data.highered.colorado.gov/college-opportunity-fund-cof-stipend",
  "al-asap": "https://www.ache.edu/index.php/alabama-student-assistance-program-asap/",
  "ky-kees": "https://www.kheaa.com/web/scholarships-grants.faces",
  "nj-tag": "https://www.hesaa.org/Pages/TAG.aspx",
  "mn-state-grant": "https://ohe.mn.gov/grant-scholarship/minnesota-state-grant",
  "in-frank-obannon": "https://www.in.gov/che/state-financial-aid/state-financial-aid-by-program/frank-obannon-grant/",
  "ks-comprehensive-grant": "https://kansasregents.gov/scholarships_and_grants",
  "caca-national-essay-contest": "https://www.cacanational.org/programs/education/essay-contest",
  "ca-dependents-enforcement-law-personnel": "https://www.csac.ca.gov/faforfirst",
  "il-dependents-exonerees-illinois-their": "https://www.isac.org/isac-gift-assistance-programs/grant-program-for-exonerees.html",
  "mn-care-child-minnesota-postsecondary": "https://ohe.mn.gov/grant-scholarship/postsecondary-child-care-grant",
  "ms-excellence-in-teaching-program": "https://www.metp.msstate.edu/",
  "ne-attracting-excellence-teaching-to": "https://ccpe.nebraska.gov/attracting-excellence-teaching-program",
  "ne-attracting-excellence-teaching-teaching": "https://ccpe.nebraska.gov/aetp-student-teaching",
  "ma-s-teachers-tomorrow": "https://www.mass.edu/osfa/programs/tmwteachers.asp",
  "ma-aspiring-incentive-teachers": "https://www.mass.edu/osfa/programs/aspiringteachers.asp",
  "vt-benefit-health-rural-transformation": "https://www.vsac.org/ruralhealth",
  "vt-benefit-trades-vermont": "https://www.vsac.org/pursue-career-skilled-trades-tuition-free",
  "me-educators-maine": "https://www.famemaine.com/affording-education/pay-for-school/borrowing-student-loans/student-loan-programs/educators-for-maine-program/",
  "md-agent-maryland-officer-police": "https://mhec.maryland.gov/preparing/Pages/Maryland-Police-Officer-Scholarship-Program.aspx",
  "gates": "https://www.thegatesscholarship.org/scholarship/",
  "questbridge": "https://www.questbridge.org/apply-to-college/programs/national-college-match/the-match-scholarship",
  "coca-cola": "https://www.coca-colascholarsfoundation.org/apply/",
  "dell": "https://www.dellscholars.org/students/",
  "horatio-alger": "https://horatioalger.org/scholarships-and-services/undergraduate-scholarships/",
  "dream-us-national": "https://www.thedream.us/scholarships/national-scholarship/",
  "dream-us-opportunity": "https://www.thedream.us/scholarships/opportunity-scholarship/",
  "hsf": "https://www.hsf.net/scholarship/",
  "ron-brown": "https://ronbrown.org/ron-brown-scholarship/",
  "apia": "https://apiascholars.org/scholarships/",
  "american-indian-college-fund": "https://collegefund.org/students/scholarships/college-students/",
  "cameron-impact": "https://www.bryancameroneducationfoundation.org/scholarship",
  "elks-mvs": "https://www.elks.org/scholars/scholarships/mvs.cfm",
  "equitable-excellence": "https://scholarshipamerica.org/scholarship/equitableexcellence/",
  "ge-reagan": "https://www.reaganfoundation.org/education/ge-reagan-foundation-scholarship",
  "soroptimist-live-your-dream": "https://www.soroptimist.org/our-work/live-your-dream-awards/apply-for-the-live-your-dream-awards.html",
  "hhf-youth-awards": "https://hispanicheritage.org/youth-awards/",
  "aises": "https://aises.org/scholarships/",
  "league-foundation": "https://www.leaguefoundation.org/index.php/application/how-to-apply",
  "aahd-krause": "https://aahd.us/initiatives/scholarship/",
  "smart-dod": "https://www.smartscholarship.org/smart/en?id=smart_index",
  "acs-catalyst": "https://www.acs.org/funding/scholarships-fellowships/catalyst-scholarship.html",
  "acfe-ritchie-jennings": "https://www.acfe.com/about-the-acfe/acfe-foundation/scholarship",
  "frs-rural": "https://www.frs.org/programs/youth-programs/scholarships",
  "pride-foundation": "https://pridefoundation.org/find-funding/scholarships/",
  "jack-and-jill": "https://opportunities.uncf.org/s/program-landing-page?id=a2iVJ00000hzzaTYAQ",
  "terry-foundation": "https://terryfoundation.org/apply/",
  "florida-bright-futures": "https://www.floridastudentfinancialaidsg.org/SAPBFMAIN/SAPBFMAIN",
  "take-stock-in-children": "https://www.takestockinchildren.org/programs/",
  "ocog-ohio": "https://www.lsc.ohio.gov/assets/organizations/legislative-service-commission/files/ohio-college-opportunity-grant-qanda.pdf",
  "choose-ohio-first": "https://dam.assets.ohio.gov/image/upload/v1782156301/highered.ohio.gov/cof/FA_26-27_FINAL.pdf",
  "golden-leaf-nc": "https://scholars.goldenleaf.org/applicants/colleges-universities/",
  "hyundai-women-stem": "https://www.tun.com/blog/the-hyundai-women-in-stem-scholarship-contest-official-rules/",
  "ija-aaja-pacific-islander": "https://www.aaja.org/news-and-resources/scholarships-internships/",
  "anne-ford-ncld": "https://ncld.org/scholarships-awards/anne-ford-scholarship/",
  "ar-academic-challenge": "https://sams.adhe.edu/Scholarship/Details/ACST",
  "nh-governors-scholarship": "https://gc.nh.gov/rules/state_agencies/csp100-700.html",
  "in-21st-century-scholars": "https://learnmoreindiana.org/scholars/enrollment-eligibility/",
  "sd-opportunity-scholarship": "https://tdx.sdbor.edu/TDClient/33/Portal/KB/Category/35/South-Dakota-Opportunity-Scholarship",
  "wisp-doris-buffett-grant": "https://wispinc.org/first-time-eligibility/",
  "cybercorps-scholarship-for-service": "https://sfs.opm.gov/Student/Information",
  "actuarial-foundation-stem-stars": "https://actuarialfoundation.org/scholarships/stem-stars/",
  "fossi-hbcu-stem-scholars": "https://futureofstemscholars.org/FOSSI/apply",
  "adc-shaheen-media-scholarship": "https://adc.org/2026-jack-shaheen-scholarship/",
  "pfef-children-of-incarcerated-scholarship": "https://pfefscholarships.org/programs/",
  "teamsters-hoffa-scholarship": "https://www.jrhmsf.org/",
  "girl-scouts-gold-award-scholarship": "https://www.girlscouts.org/en/members/for-girl-scouts/badges-journeys-awards/highest-awards/gold-award/gold-award-scholarship.html",
  "4-h-youth-in-action-scholarship": "https://4-h.org/programs/4-h-youth-in-action-program/",
  "navy-marine-rotc-scholarship": "https://www.netc.navy.mil/Commands/Naval-Service-Training-Command/NROTC/Prospective-Midshipmen/Scholarship-and-Non-Scholarship-Options/Four-Year-National-Scholarship/",
  "fl-minority-teacher-education-scholarship": "https://www.ffmt.org/index.cfm?e=inner4&itemcategory=93711",
  "r-gene-richter-scholarship": "https://www.richterfoundation.org/copy-of-mentoring",
  "appraisal-institute-education-trust-scholarship": "https://aierf.org/aierf-college-scholarship/",
  "poetry-out-loud": "https://poetryoutloud.org/about-poetry-out-loud/",
  "nsa-scholarship-foundation": "https://nsacct.org/nsaf-scholarships/",
  "horatio-alger-state-scholarships": "https://scholars.horatioalger.org/scholarships/",
  "nmcrs-education-assistance": "https://www.nmcrs.org/get-help/financial-assistance/education-assistance",
  "nmfa-spouse-scholarship": "https://www.militaryfamily.org/state-of-the-military-family-programs/spouses-scholarships/",
  "fallen-patriots-scholarship": "https://fallenpatriots.org/frequently-asked-questions/",
  "abfse-national-scholarship": "https://www.abfse.org/html/scholarships.html",
  "chick-fil-a-team-member-scholarship": "https://www.chick-fil-a.com/remarkable-futures-scholarships/types-of-scholarships",
  "pga-works-lundgren-scholars": "https://www.pgareach.org/pgaworks",
  "nff-national-scholar-athlete-award": "https://footballfoundation.org/sports/2018/7/31/nff-national-scholar-athlete-awards.aspx?id=39",
  "pr-beca-legislativa": "https://senado.pr.gov/senado-de-puerto-rico-relanza-las-becas-legislativas-te-queremos-preparado-para-reconocer-a-la-generacin-de-excelencia-2026",
  "cnmi-eap-base-grant": "https://www.cnmischolarship.net/default.asp?secID=5",
  "ioof-wirz-scholarship": "https://odd-fellows.org/programs/education-foundation/charles-j-christine-wirz-scholarship",
  "jci-senate-foundation-scholarship": "https://usjcisenate.org/index.php/scholarship-program",
  "chime-scholars-foundation": "https://www.chime.com/about-us/chime-scholars-foundation/students/",
  "abbvie-cf-scholarship": "https://www.abbviecfcommitment.com/cfscholarship",
  "microsoft-disability-scholarship": "https://scholarshipamerica.org/scholarship/microsoft-disability/",
  "dst-oleta-lawanda-crain-scholarship": "https://deltafoundation.net/scholarship-opportunities-available-now-at-dref/",
  "momeni-foundation-scholarships": "https://momenifoundation.org/applications/",
  "naehcy-scholars-program": "https://naehcy.org/scholars/scholarship-applicants/",
  "pitzer-family-education-foundation": "https://pfefscholarships.org/programs/",
  "venus-morris-griffin-scholarship": "https://www.venusmorrisgriffin.com/apply",
  "laef-general-youth-scholarship": "https://lusoamericanfinancial.org/foundation/scholarships-grants/scholarships-grants-eligibility-requirements/",
  "dow-jones-news-fund": "https://dowjonesnewsfund.org/college-student-program/",
  "wings-over-america-scholarship": "https://woasf.org/app",
  "aotf-lands-banks-memorial-scholarship": "https://www.aotf.org/educational-scholarships/",
  "lls-blood-cancer-survivors-scholarship": "https://bloodcancerunited.org/financial-assistance/scholarship-blood-cancer-survivors",
  "asid-foundation-polsky-award": "https://launch.asid.org/foundation/initiatives",
  "coast-guard-foundation-scholarship": "https://coastguardfoundation.org/education/coast-guard-children",
  "nm-legislative-lottery-scholarship": "https://www.reachhighernm.com/faqs/",
  "herren-project-go-purple-scholarship": "https://herrenproject.org/student-scholarship-application/",
  "vertex-foundation-healthy-families-scholarship": "https://scholarshipamerica.org/scholarship/vertexfoundation/",
  "toyota-motor-north-america-scholarship": "https://learnmore.scholarsapply.org/toyotamle/",
  "ala-children-of-warriors-scholarship": "https://www.legion-aux.org/Scholarships/Children-of-Warriors-National-Presidents--Scholarship",
  "natf-navigate-your-future-scholarship": "https://nata.aero/national-air-transportation-foundation/scholarships/navigate-your-future-scholarship/",
  "nd-alliance-neurodiversity-scholarship": "https://thendalliance.org/scholarships/faq/",
  "zonta-young-women-in-leadership-award": "https://www.zonta.org/Web/Programs/Education/Zonta_Young_Women_in_Leadership_Award.aspx",
  "north-dakota-scholarship": "https://www.nd.gov/dpi/familiescommunity/students/north-dakota-scholarship",
  "delaware-scholarship-incentive-program": "https://education.delaware.gov/?page_id=14584",
  "stephen-phillips-memorial-scholarship-fund": "https://phillips-scholarship.org/apply/new-applicants/",
  "firehouse-subs-public-safety-scholarship": "https://scholarshipamerica.org/scholarship/firehousesubsfoundation/",
  "cbc-spouses-visual-arts-scholarship": "https://cbcfinc.academicworks.com/opportunities/2705",
  "mississippi-eminent-scholars-grant": "https://www.msfinancialaid.org/programs/mesg-mississippi-eminent-scholars-grant/",
  "asabe-foundation-engineering-scholarship": "https://asabe.org/Donate-to-the-ASABE-Foundation/Foundation-Scholarships",
  "ite-university-scholars-program": "https://www.ite.org/membership/university-scholars-program/",
  "aci-foundation-scholarship": "https://www.acifoundation.org/scholarships/undergrad-scholarship.aspx",
  "critical-language-scholarship": "https://clscholarship.org/apply",
  "nsli-y-scholarship": "https://www.nsliforyouth.org/how-to-apply/apply/",
  "breakthrough-junior-challenge": "https://breakthroughjuniorchallenge.org/enter",
  "south-dakota-build-dakota-scholarship": "https://www.builddakotascholarships.com/apply/",
  "oklahoma-tuition-aid-grant": "https://www.okcollegestart.org/Financial_Aid_Planning/Oklahoma_Grants/Oklahoma_Tuition_Aid_Grant.aspx",
  "south-carolina-palmetto-fellows-scholarship": "https://che.sc.gov/sites/che/files/Documents/Counselors%20Page/PFS_Info_Packet_Student_2027.pdf",
  "tennessee-hope-scholarship": "https://www.collegefortn.org/tennessee-hope-scholarship-3/",
  "isna-musa-dakri-scholarship": "https://isna.net/scholarships/",
  "isna-amana-mutual-funds-scholarship": "https://isna.net/scholarships/",
  "elca-rossing-physics-scholarship": "https://www.elca.org/resources/financial-information/grants-and-scholarships/elca-scholarships",
  "arema-educational-foundation-scholarship": "https://www.aremafoundation.org/AREMA_DONOR/AREMA_DONOR/Foundation/Educational_Foundation_Scholarships.aspx",
  "league-of-railway-women-scholarships": "https://www.railwaywomen.org/future-of-railroading-scholarship",
  "aptf-scholarship-program": "https://www.aptfd.org/for-scholarship-seekers/public-transportation-scholarships/apply-to-the-scholarship-program/",
  "comto-national-scholarship-program": "https://comto.org/about/programs/national-scholarship-program",
  "university-of-the-aftermarket-foundation-scholarship": "https://automotivescholarships.com/scholarships/university-of-the-aftermarket",
  "asla-council-of-fellows-scholarship": "https://www.lafoundation.org/what-we-do/scholarships/student-scholarships/awards-available/asla-council-of-fellows-scholarships",
  "ams-freshman-undergraduate-scholarship": "https://www.ametsoc.org/ams/information-for/students/ams-scholarships-and-fellowships/ams-first-year-undergraduate-scholarship/",
  "jw-pepper-music-education-scholarship": "https://blogs.jwpepper.com/announcing-the-j-w-pepper-150th-anniversary-scholarships/",
  "cox-jim-kennedy-scholarship-fund": "https://www.coxenterprises.com/news/meet-the-2026-jim-kennedy-scholarship-fund-recipients",
  "discount-tire-bruce-t-halle-scholarship": "https://www.discounttirefamily.com/dt-family/us/en/benefits/all-employees/educational-assistance/bruce-t-halle-scholarship.html",
  "national-exchange-club-youth-of-the-year": "https://www.nationalexchangeclub.org/about/recognition/",
  "texas-armed-services-scholarship-program": "https://www.highered.texas.gov/texas-armed-services-scholarship-accepting-appointments-for-2026-27-academic-year/",
  "oklahoma-rising-scholars-award": "https://www.okcollegestart.org/Financial_Aid_Planning/Scholarships/Academic_Scholarships/Academic_Scholars_Program.aspx",
  "louisiana-tops-tech-award": "https://mylosfa.la.gov/tops/tops-tech/",
  "kansas-education-opportunity-scholarship": "https://www.kansasregents.gov/resources/PDF/Students/Student_Financial_Aid/Ed_Opp_26-27.pdf",
  "kansas-state-scholarship": "https://www.kansasregents.gov/resources/PDF/Students/Student_Financial_Aid/KSS_26-27.pdf",
  "disabledperson-national-scholarship": "https://www.disabledperson.com/scholarships/40",
  "latin-grammy-cultural-foundation-scholarships": "https://www.latingrammyculturalfoundation.org/scholarships/",
  "culvers-foundation-scholarship": "https://scholarshipamerica.org/scholarship/culvers/",
  "teaching-fellows-for-maryland": "https://mhec.maryland.gov/preparing/pages/teachingfellowsmdscholarship.aspx",
  "aisc-scholarships": "https://www.aisc.org/university-programs/scholarships-grants/scholarships/aisc-scholarships-for-juniors-seniors-and-master-s-level-graduate-students/",
  "amputee-coalition-skoski-scholarship": "https://support.amputee-coalition.org/acton/form/46456/000a:d-000f/1/46456:p-001a/B1/-/-/index.htm",
  "project-sleep-narcolepsy-scholarship": "https://project-sleep.com/2026-jack-julie-narcolepsy-scholarship/",
  "hydrocephalus-association-scholarship": "https://www.hydroassoc.org/Scholarship/",
  "american-airlines-education-foundation-scholarship": "https://www.aa.com/web/i18n/customer-service/about-us/let-good-take-flight/american-airlines-education-foundation-scholarship.html",
  "entergy-community-power-scholarship": "https://www.entergy.com/blog/entergy-arkansas-awards-community-power-scholarships-to-six-outstanding-students",
  "entergy-power-your-future-scholarship": "https://learnmore.scholarsapply.org/poweryourfuture/",
  "florida-ease-grant": "https://www.floridastudentfinancialaidsg.org/PDF/factsheets/EASE.pdf",
  "oklahoma-tuition-equalization-grant": "https://secure.okcollegestart.org/Financial_Aid_Planning/Oklahoma_Grants/Oklahoma_Tuition_Equalization_Grant.aspx",
  "able-flight-scholarships": "https://ableflight.siu.edu/",
  "leroy-homer-flight-scholarship": "https://leroywhomerjr.org/scholarships/faq/",
  "association-concrete-precast-undergraduate": "https://precast.org/foundation/students-programs/scholarships/",
  "nation-skilled": "https://skilled-nation.org/apply/skilled-scholarships",
  "accounting-cpa-washington": "https://www.wscpa.org/about/foundation",
  "aaae-aviation-women": "https://aaae.org/foundation",
  "aapg-camp-field": "https://www.aapg.org/news-and-media/explorer/future-geoscientists-invited-apply-for-field-camp-scholarships/",
  "ihs": "https://www.ihs.gov/scholarship/apply/",
  "boren": "https://www.borenawards.org/",
  "gravis-myasthenia-ucb": "https://www.ucbmgscholarship.com/program-details",
  "carolina-children-north-veterans-wartime": "https://www.milvets.nc.gov/benefits-services/scholarships",
  "orphan-virginia-war-west": "https://veterans.wv.gov/benefits/Pages/Education-Benefits.aspx",
  "creary-drs-family-ludlow-ruth": "https://nmf.smapply.io/prog/nmf_scholarships_2026_cycle_2/",
  "uspaacc": "https://celebrasianconference.com/scholarships",
  "wy-assistance-educational-plan-wyng": "https://veteranseducation.wyo.gov/state-tuition-assistance/Welcome-page",
  "supplyhouse-to-track-trades": "https://blog.supplyhouse.com/track-to-the-trades-scholarship-2026/",
  "dewalt-trade": "https://dewalt.mediaroom.com/2025-11-05-Calling-All-Future-Pros-DEWALT-R-Trades-Scholarship-Now-Accepting-Applications",
  "bird-frances-gca-habitat-m": "https://www.gcamerica.org/scholarships/details/peacock-scholarship",
  "illinois-nursing": "https://www.isac.org/students/during-college/types-of-financial-aid/scholarships/nursing-education-scholarship-program.html",
  "ayn-rand-atlas-shrugged-essay": "https://aynrand.org/students/essay-contests",
  "child-kevin": "https://www.bleeding.org/community-resources/financial-assistance/scholarships/kevin-child-scholarship",
  "courter-hemophilia-pfizer-soozie": "https://www.hemophiliavillage.com/scholarship-program",
  "assistance-colorado-dependent-tuition": "https://data.highered.colorado.gov/state-aid-available",
  "indigenous-kansas-state-status-tuition": "https://kansasregents.gov/students/residency_faq",
  "fee-foster-nevada-waiver-youth": "https://nshe.nevada.edu/system-administration/departments/asa/students/fostering-success/financial-aid-toolkit/",
  "educational-gratuity-pennsylvania-postsecondary": "https://www.pa.gov/agencies/dmva/pennsylvania-veterans/pa-vetconnect/state-veterans-programs/financial-assistance/educational-gratuity-program",
  "perennial-plant": "https://www.perennialplantfoundation.org/",
  "ecology-tmcf-wildlife": "https://tmcf.org/scholarships/open-scholarships/",
  "ca-act-alan-pattee": "https://www.calstate.edu/apply/paying-for-college/csu-costs/tuition-and-fees/fee-waivers/Pages/mandatory-fee-waivers.aspx",
  "oh-officers-ohio-safety": "https://dam.assets.ohio.gov/image/upload/highered.ohio.gov/sgs/guidance-memos/FA25-004.pdf",
  "mo-child-employee-officer-or": "https://dhewd.mo.gov/ppc/grants/public-service-officer",
  "corps-dakota": "https://tdx.sdbor.edu/TDClient/33/Portal/KB/PrintArticle?ID=438",
  "children-deceased-first-responders": "https://sdbor.edu/cost-aid/reduced-tuition-programs/legacy/",
  "officers-peace-slain": "https://www.azleg.gov/ars/15/01808.htm",
  "heart-purple": "https://www.azleg.gov/ars/15/01808.htm",
  "ok-baccalaureate-oklahoma-regional": "https://secure.okcollegestart.org/Financial_Aid_Planning/Scholarships/Academic_Scholarships/Regional_University_Baccalaureate_Scholarship.aspx",
  "ca-california-dependents-enforcement-law": "https://www.csac.ca.gov/faforfirst",
  "wa-opportunity-washington": "https://waopportunityscholarship.org/applicants/baccalaureate/",
  "ct-children-connecticut-dependent-duty": "https://www.cga.ct.gov/current/pub/chap_185b.htm#sec_10a-99",
  "fl-benacquisto-florida": "https://www.floridastudentfinancialaidsg.org/PDF/factsheets/BSP.pdf",
  "ks-hero-kansas-s": "https://www.kansasregents.gov/resources/PDF/Students/Student_Financial_Aid/Heros_2026-2027.pdf",
  "ks-kansas-nursing-service": "https://kansasregents.gov/resources/PDF/Students/Student_Financial_Aid/NSS_2026-2027.2.pdf",
  "ks-kansas-service-teacher": "https://kansasregents.gov/resources/PDF/Students/Student_Financial_Aid/KTS_26-27.pdf",
  "christian-legacy-sun-vanna": "https://bold.org/scholarships/vanna-christian-sun-legacy-scholarship/",
  "academic-assp": "https://foundation.assp.org/academic-scholarships/",
  "pma-educational-foundation-scholarship": "https://www.pma.org/pma-foundation/educational-scholarships/",
  "udall-undergraduate-scholarship": "https://www.udall.gov/ourprograms/scholarship/scholarship",
  "nrf-foundation-next-generation-scholarship": "https://nrffoundation.org/campus/scholarships/next-generation/how-to-apply",
  "pcusa-undergraduate-scholarship": "https://pcusa.org/resource/scholarships-undergraduates",
  "scholastic-tourette-scholarship": "https://scholasticsupport.org/applicant-page",
};

type ScholarshipAuditOverride = Partial<{
  name: string;
  amount: string;
  deadline: string;
  deadlineMonth: number | null;
  who: string;
  stages: readonly ("high-school" | "college" | "transfer")[];
  openToUndocumented: boolean;
  tags: readonly string[];
  officialUrl: string;
}>;

// Corrections are added here batch by batch only when the audit evidence
// supplies an unambiguous replacement value. Exact 2026 cycle details below
// are deliberately time-stamped so they remain honest without implying that a
// closed deadline or an open window automatically carries into the next cycle.
export const scholarshipAuditRecordOverrides: Readonly<
  Record<string, ScholarshipAuditOverride>
> = {
  "nhs-scholarship": {
    amount: "$3,200–$25,000; 600 nonrenewable awards totaling $2 million",
    deadline: "September 3–November 20, 2026; application opens September 3",
    deadlineMonth: null,
    who: "High school seniors who are active NHS members in good standing and plan to attend an accredited U.S. college, university, military institute, or trade school. NHS policy says schools should provide funding or exemptions when a member cannot pay local dues or other required expenses.",
  },
  "larrie-londin-memorial-scholarship": {
    amount: "$500 for drummers age 17 and under; $1,000 for ages 18–24",
    deadline: "2026 cycle closed; next application window is spring 2027",
    deadlineMonth: null,
    who: "Drummers age 24 or younger pursuing drumset study; applicants age 18–24 must use the award for an accredited, structured music education program. PAS membership is not required.",
    stages: ["high-school", "college"],
    tags: ["arts", "music", "percussion", "drumset"],
  },
  "wa-college-grant": {
    amount: "Varies by income, institution, program, and enrollment; full awards can cover public tuition, while some 2026–27 awards are below $500",
    deadline: "2025–26 and 2026–27 applications are open through FAFSA or WASFA",
    deadlineMonth: null,
    who: "Washington residents with financial need—including eligible undocumented students—pursuing an eligible college, career-training, or apprenticeship program without a prior bachelor's degree; the school or apprenticeship sponsor determines the award.",
  },
  "nv-millennium-scholarship": {
    amount: "Up to $10,000 total; $40–$80 per credit depending on the institution, so some semester payments may be below $500",
    deadline: "No separate application; qualifying graduates acknowledge the award after school nomination",
    deadlineMonth: null,
    who: "Nevada high school graduates who meet the required curriculum and either a 3.25 GPA or qualifying ACT/SAT score; recipients must acknowledge the award and meet enrollment and 2.75 continuing-GPA rules.",
  },
  "co-college-opportunity-fund": {
    amount: "$116 per credit at public colleges and $58 per credit at participating private colleges for 2026–27; smaller course loads can receive less than $500",
    deadline: "Create a COF account and authorize the stipend through your school each term",
    deadlineMonth: null,
    who: "Colorado residents—including students eligible under ASSET—who create a COF account and authorize eligible credits each term; a 145-credit lifetime limit applies, with added Pell and Colorado-high-school rules at private colleges.",
  },
  "al-asap": {
    deadline: "No separate state deadline; file the FAFSA as early as possible",
    deadlineMonth: null,
  },
  "ky-kees": {
    amount: "$187–$500 per year based on high-school GPA, plus $36–$500 test-score awards and other eligible supplements",
    deadline: "No separate application; qualifying awards are earned automatically in high school",
    deadlineMonth: null,
    who: "Eligible Kentucky high school students earn KEES automatically by completing the required curriculum with at least a 2.75 GPA or through qualifying test and supplemental awards; residency, citizenship, college-use, renewal, and term-limit rules apply.",
  },
  "nj-tag": {
    amount: "Varies by need, school, and enrollment; 2026–27 full- and part-time schedules include some awards below $500",
    deadline: "New fall applicants: September 15, 2026; other applicant groups have different state deadlines",
    deadlineMonth: null,
    who: "Eligible New Jersey residents, including qualifying Dreamers, attending an approved New Jersey institution; applicants must file FAFSA or the NJ Alternative Application and complete any NJFAMS tasks by their category-specific deadlines.",
  },
  "mn-state-grant": {
    amount: "$100 minimum per year; the final award varies with financial need, college cost, and enrollment",
    deadline: "Apply by the 30th day of the academic term",
    deadlineMonth: null,
    who: "Minnesota residents without a prior bachelor's degree who enroll in at least three credits at an eligible school and file FAFSA or the Minnesota Alternative State Financial Aid Application; awards are prorated by enrollment.",
  },
  "in-frank-obannon": {
    amount: "2026–27 awards can begin at $400; maximums depend on institution type and completed credits and reach $10,600 at private colleges",
    deadline: "2026–27 FAFSA deadline was April 15, 2026",
    deadlineMonth: null,
    who: "Eligible Indiana residents with financial need pursuing an approved certificate, associate, or bachelor's program at a participating Indiana institution; award schedules depend on SAI, institution type, and credit completion.",
  },
  "ks-comprehensive-grant": {
    amount: "$100–$4,000 per year at public colleges; $200–$10,000 at private colleges",
    deadline: "No separate application or statewide deadline; participating schools award limited funds from FAFSA data",
    deadlineMonth: null,
    who: "Kansas residents with financial need attending a participating Kansas public or private college; list the school on the FAFSA, and the institution determines awards while funds remain.",
  },
  "caca-national-essay-contest": {
    deadline: "2026 registration closed February 28; the in-person contest was March 14",
    deadlineMonth: null,
    who: "Students in grades 9–12 who register through a participating C.A.C.A. lodge or designated site and write the essay there in person; 2026 prizes included three $700–$1,500 awards and ten $100 merit awards.",
  },
  "ca-dependents-enforcement-law-personnel": {
    amount: "Matches the applicable current Cal Grant amount or remaining unmet need, can be as low as $100, and may continue for up to four years",
    deadline: "Application timing varies; confirm the current filing period with CSAC",
    deadlineMonth: null,
  },
  "il-dependents-exonerees-illinois-their": {
    deadline: "2026–27 application open; first-come, first-served while funds remain",
    deadlineMonth: null,
    who: "Illinois exonerees with a gubernatorial innocence pardon or court certificate of innocence, and their designated dependents, pursuing high-school-equivalency, undergraduate, graduate, or certificate study; reapply annually, and funding is not guaranteed for every qualified applicant.",
    stages: ["high-school", "college"],
  },
  "mn-care-child-minnesota-postsecondary": {
    deadline: "Open with no universal deadline; submit the provider-completed packet to your campus financial aid office",
    deadlineMonth: null,
    who: "Minnesota undergraduate or graduate students enrolled at least one credit who have an eligible child and out-of-pocket child-care costs; complete FAFSA or the Minnesota Dream Act application and have the provider complete its section.",
  },
  "ms-excellence-in-teaching-program": {
    deadline: "MSU applications become available October 1; Ole Miss's next deadline is not yet posted",
    deadlineMonth: null,
    who: "Repayment warning: recipients sign annual loan documents, and not completing five years of Mississippi public-school teaching can require repayment with 3% interest. Open to qualifying incoming students and some transfers in approved education majors at Mississippi State or Ole Miss.",
    stages: ["high-school", "college", "transfer"],
    tags: ["full-ride", "teacher-pipeline", "mississippi", "service commitment", "repayment risk"],
  },
  "ne-attracting-excellence-teaching-to": {
    amount: "$3,000 forgivable loan per year for up to five consecutive years",
    deadline: "2026 application closed June 1; applications opened April 15",
    deadlineMonth: null,
    who: "Repayment warning: this is a forgivable loan with a contract; students must complete certification and qualifying full-time teaching in Nebraska or repay the unforgiven balance. Open to eligible undergraduate and graduate teacher-education students.",
    tags: ["nebraska", "teacher", "forgivable loan", "service commitment", "repayment risk"],
  },
  "ne-attracting-excellence-teaching-teaching": {
    amount: "$3,000 one-time forgivable loan during the student-teaching semester",
    deadline: "2026 application closed June 1; applications opened April 15",
    deadlineMonth: null,
    who: "Repayment warning: this is a forgivable loan with a contract; students must complete their program, earn certification, and complete qualifying full-time Nebraska teaching or repay the unforgiven balance. Open to eligible undergraduate and graduate student teachers.",
    tags: ["nebraska", "teacher", "forgivable loan", "service commitment", "repayment risk"],
  },
  "ma-s-teachers-tomorrow": {
    deadline: "Annual MASSAid application; the next exact deadline is not yet posted",
    deadlineMonth: null,
    who: "Repayment warning: recipients sign a promissory note, and each funded year requires one year of Massachusetts public-school teaching; unmet service converts the scholarship to a loan. For eligible full-time undergraduate or post-baccalaureate students in approved public-university teacher-licensure programs.",
    tags: ["teacher-pipeline", "massachusetts", "service commitment", "repayment risk"],
  },
  "ma-aspiring-incentive-teachers": {
    amount: "Resident tuition only for the third and fourth college years; fees are not included",
    deadline: "Institution-specific; contact the public college's financial aid office",
    deadlineMonth: null,
    who: "Repayment warning: recipients owe one year of Massachusetts public-school teaching for each waiver year; unmet service triggers prorated repayment with interest. For eligible juniors and seniors in shortage-field teacher preparation with a 3.0+ GPA.",
    stages: ["college"],
    tags: ["teacher-pipeline", "tuition waiver", "massachusetts", "service commitment", "repayment risk"],
  },
  "vt-benefit-health-rural-transformation": {
    deadline: "2026 deadline passed June 12; awards were considered while funds remained",
    deadlineMonth: null,
    who: "Repayment warning: recipients must complete five years of qualifying rural Vermont healthcare work, regardless of years funded; unmet service can require full or prorated repayment. Eligible half-time undergraduate and graduate students in approved health fields must maintain a 2.5+ GPA.",
    tags: ["healthcare", "rural", "vermont", "service commitment", "repayment risk"],
  },
  "vt-benefit-trades-vermont": {
    amount: "Full tuition plus initial licensing and exam fees, up to $23,000; books, supplies, and other fees are excluded",
    deadline: "February 11, 2026 priority deadline; applications accepted while funds remain",
    deadlineMonth: null,
    who: "Repayment warning: recipients must complete the program and licensure and work full time in Vermont for one year per funded year; unmet conditions require repayment. For students with financial need in eligible certificate or non-degree trade programs.",
    tags: ["trades", "workforce", "vermont", "service commitment", "repayment risk"],
  },
  "me-educators-maine": {
    name: "Educators for Maine Forgivable Loan Program",
    deadline: "2026 application closed May 1; the cycle opened February 1",
    deadlineMonth: null,
    who: "Repayment warning: this is a competitive forgivable loan, and recipients who do not complete qualifying Maine education service must repay the balance with interest. Open to eligible Maine high school seniors, undergraduate, graduate, and post-baccalaureate students preparing for teaching or child-care careers.",
    tags: ["forgivable loan", "teaching", "childcare", "maine", "service commitment", "repayment risk"],
  },
  "md-agent-maryland-officer-police": {
    deadline: "Open through October 15, 2026",
    deadlineMonth: null,
    who: "Repayment warning: recipients sign a promissory note and must complete at least five years of qualifying Maryland service within eight years after graduation. Open to eligible full- or part-time undergraduate and graduate students pursuing a Maryland police-officer or probation-agent career.",
    stages: ["college"],
    tags: ["maryland", "law enforcement", "service commitment", "repayment risk"],
  },
  "ron-brown": {
    deadline: "Typically December",
    deadlineMonth: 12,
  },
  apia: {
    who: "Students from all backgrounds pursuing an associate or bachelor's degree at an accredited U.S. institution; financial need is prioritized.",
  },
  "american-indian-college-fund": {
    amount: "$2,000–$3,000 average; varies by scholarship",
  },
  "cameron-impact": {
    deadline: "Typically May, or earlier when 3,000 eligible applications are received",
    deadlineMonth: 5,
  },
  "amazon-future-engineer": {
    amount: "Up to $40,000 ($10,000 per year, adjusted to unmet need)",
  },
  "equitable-excellence": {
    amount: "$20,000 total ($5,000 per year for four years)",
  },
  "ge-reagan": {
    amount: "Up to $40,000 ($10,000 per year, renewable for up to four years)",
    who: "High school seniors demonstrating leadership, integrity, drive, citizenship, and strong academics.",
  },
  "dream-award": {
    amount: "Up to $10,000, renewable for up to three additional years",
  },
  "patsy-mink-education-award": {
    who: "Low-income mothers with minor children, age 17 or older, enrolled full time in a progressive U.S. vocational, associate, bachelor's, master's, or doctoral program.",
  },
  "sme-education": {
    who: "High school seniors and current college students pursuing associate or bachelor's degrees in manufacturing-related technical fields; one free application covers 60+ scholarship programs.",
  },
  "taco-bell-live-mas": {
    who: "U.S. residents ages 16 to 26 pursuing an accredited post-secondary program, including trade school; apply with either a short passion video or a 250–500 word essay.",
    tags: ["video or essay", "trades"],
  },
  "cafe-bustelo": {
    who: "First-generation undergraduates of any background enrolled full time at a four-year HACU-member school with a 2.5+ GPA and financial aid; the essay asks about Latin culture.",
    tags: ["first-generation", "Latin culture essay"],
  },
  kasf: {
    who: "Students of Korean heritage studying full time in the U.S., including high school, undergraduate, graduate, and professional students, regardless of citizenship status.",
  },
  "cobell-undergrad": {
    who: "Enrolled members of federally recognized tribes or Alaska Native Corporations pursuing an associate or bachelor's degree; full-time enrollment is standard, with part-time considered case by case.",
  },
  "league-foundation": {
    amount: "$2,000–$3,000 based on the latest published awards",
    who: "Graduating high school seniors with a 3.0+ GPA who support and demonstrate commitment to the LGBTQ+ community and plan to attend an accredited U.S. college.",
    tags: ["LGBTQ community"],
  },
  "out-to-innovate": {
    who: "LGBTQ+ students and active allies who have completed at least two years of college, have a declared STEM or STEM-teaching major, and hold a 2.75+ GPA.",
  },
  "aahd-krause": {
    who: "Undergraduate students at sophomore level or beyond and graduate students with a disability studying a field related to health and disability.",
  },
  "burger-king-scholars": {
    who: "High school seniors, plus eligible Burger King employees and their family members, pursuing college or post-secondary vocational or technical education.",
    stages: ["high-school", "college"],
  },
  "coolidge-scholarship": {
    deadline: "Deadline not yet announced; application opens in late summer or early fall",
    deadlineMonth: null,
  },
  "hagan-scholarship": {
    who: "High school seniors with a 3.5+ GPA, parents' adjusted gross household income of $125,000 or less, and at least 240 hours of work; open regardless of nationality or citizenship.",
  },
  "smart-dod": {
    who: "U.S. citizen STEM students pursuing bachelor's, master's, combined BS/MS, or doctoral degrees who are willing to work at a Department of Defense facility after graduation. Covers tuition, stipend, internships, and employment.",
  },
  "gmis-stem": {
    who: "Undergraduate and graduate students in STEM or health fields at accredited U.S. institutions; merit awards generally require a 3.0+ GPA, while some non-merit donor awards accept 2.5+.",
    tags: ["STEM", "health", "leadership", "community service"],
  },
  "acs-catalyst": {
    who: "High school seniors and undergraduates who are U.S. citizens or permanent residents, demonstrate financial need, and plan to study chemistry, biochemistry, chemical engineering, chemical or science education, environmental or forensic chemistry/science, materials, or another chemistry-based science.",
  },
  "nurse-corps": {
    who: "U.S. citizens, nationals, or permanent residents in eligible diploma, associate, bachelor's, bridge, graduate RN/APRN, or post-graduate nursing programs who commit to serving at a critical-shortage facility; preference goes to applicants with greatest financial need.",
  },
  "aicpa-legacy": {
    who: "Accounting students committed to the CPA path, including undergraduate and graduate students, first-generation students with financial need, and students transferring from two-year to four-year programs.",
  },
  "acfe-ritchie-jennings": {
    who: "Undergraduate and graduate students studying accounting, business, finance, or criminal justice with an interest in anti-fraud careers; undergraduates must take at least nine semester hours and graduate students at least six. Open internationally.",
  },
  "aiga-worldstudio": {
    amount: "$2,500–$3,000, with one or two top awards up to $5,000",
    who: "Incoming and current undergraduate and graduate students in art and design fields at accredited U.S. schools who demonstrate financial need, academic strength, creative work, and community commitment.",
  },
  "frs-rural": {
    amount: "$500–$9,500, depending on the named award",
    who: "Students in the service area of an NTCA rural broadband member company, including graduating seniors, a non-traditional undergraduate pathway, and a named first-year law-school award; one application covers the portfolio.",
  },
  "sallie-mae-bridging": {
    who: "High school seniors who are U.S. citizens or lawful permanent residents, have a 2.75+ GPA and financial need, and plan full-time undergraduate or eligible vocational-technical study.",
  },
  "esperanza-fund": {
    who: "Immigrant students born abroad or with two foreign-born parents who earned a high school diploma or GED in D.C., Maryland, or Virginia within the past three years, have not started college, and will attend a qualifying college or university in D.C., Maryland, or Virginia. No immigration-status requirement.",
  },
  "ushli-andrade": {
    who: "High school seniors and college freshmen, sophomores, or juniors through age 25 who are enrolled full time at a two- or four-year U.S. institution and demonstrate financial need and leadership; non-citizens are eligible.",
    tags: ["leadership", "financial need", "immigrants"],
  },
  "pride-foundation": {
    amount: "About $8,533 on average based on 2026 awards",
    who: "LGBTQ+ and questioning students of any age in Alaska, Idaho, Montana, Oregon, or Washington pursuing community college, bachelor's, certificate, trade, graduate, or professional education; one application covers 50+ funds, with no citizenship check.",
  },
  "marine-corps-scholarship": {
    amount: "$2,500, $5,000, $7,500, or $10,000 a year, based on need, GPA, and available funding",
  },
  "fisher-house-military-children": {
    deadline: "Typically February; applications open in December",
    deadlineMonth: 2,
  },
  "tillman-scholars": {
    who: "Service members, veterans, and military spouses pursuing full-time bachelor's, master's, or professional degrees at accredited U.S. colleges and universities; associate degrees and certificate programs are not eligible.",
  },
  "amvets-national": {
    who: "Graduating 12th-grade children or grandchildren of veterans, active-duty, Guard, or Reserve members who will enter an eligible bachelor's program at an accredited four-year college and demonstrate financial need.",
    stages: ["high-school"],
  },
  "jack-and-jill": {
    amount: "Up to $2,500 in the freshman year, renewable through senior year",
  },
  "islamic-scholarship-fund": {
    who: "Muslim undergraduate juniors and seniors, master's students, doctoral students, and law students at accredited U.S. universities who study policy, law, media, or related fields and meet the program's citizenship or immigration-status requirements.",
  },
  "first-nations-ag": {
    who: "Full-time or part-time undergraduate and graduate students who are affiliated with a U.S. tribe and study agriculture or food systems with a 2.75+ GPA.",
  },
  "chick-fil-a-community": {
    who: "Residents of the United States, Puerto Rico, or Canada planning or pursuing undergraduate, graduate, or vocational-technical study, evaluated on academics, community service, leadership, and financial need; Chick-fil-A employees are not eligible.",
    openToUndocumented: false,
  },
  "mcdonalds-hacer": {
    who: "High school seniors under 21 who are legal U.S. residents, U.S. citizens, or DREAMER/DACA recipients, carry at least a 2.8 GPA, and will attend an eligible school full time; selection considers academics, financial need, community involvement, and personal qualities.",
    tags: ["community service", "financial need", "large award"],
  },
  "princess-grace-awards": {
    who: "Emerging U.S.-based artists in theater, dance, choreography, and film who are nominated by a university, nonprofit, or prior award winner; undergraduate and graduate artists are eligible, and noncitizens need permanent U.S. work authorization.",
  },
  "sodexo-stop-hunger": {
    deadline: "Typically October 20",
    deadlineMonth: 10,
  },
  "dennys-hungry-for-education": {
    who: "U.S. citizens or permanent residents enrolled in both the spring and fall award-year terms as undergraduate or graduate students at a two- or four-year HACU-member institution, with a 2.5+ GPA and a 500-word community-building essay.",
  },
  "ahla-academic": {
    who: "Incoming freshmen, undergraduate associate and bachelor's students, and graduate students pursuing hospitality management or related fields; one application covers nine academic scholarship funds.",
  },
  "texas-grant": {
    amount: "Up to $5,399 per semester at Texas public universities and health-related institutions for FY 2027",
    deadline: "Varies by institution; many use January 15 as a priority date",
    deadlineMonth: null,
  },
  "terry-foundation": {
    who: "U.S. citizens or permanent residents who are Texas residents, graduated from a Texas high school without a gap year, demonstrate FAFSA-based financial need and leadership, and enter one of 11 affiliated public universities; recipients live on campus the first year and are nominated and interviewed through the university.",
  },
  "florida-bright-futures": {
    who: "Florida high school graduates entering eligible undergraduate degree or certificate programs who meet the requirements for Academic, Medallion, Gold Seal CAPE, or Gold Seal Vocational awards, including the applicable GPA, coursework, test, and service, paid-work, or combined-hour benchmarks.",
  },
  "excelsior-ny": {
    who: "New York residents meeting the 12-month residency and citizenship, eligible-noncitizen, or DREAM Act pathway who attend SUNY or CUNY, maintain continuous enrollment and a 30-credit annual pace, and agree to live and work in New York after the award; failure to meet that post-award obligation can convert aid to a no-interest loan.",
  },
  "nys-tap": {
    deadline: "Typically June 30",
    deadlineMonth: 6,
    who: "New York residents who meet the applicable income, residency-pathway, program, and academic-standing rules for undergraduate degree study, part-time attendance, approved non-degree workforce credentials, or certain below-half-time enrollment.",
  },
  "pa-state-grant": {
    amount: "Up to a conditional $6,000 for 2026–27",
    deadline: "Typically May 1; August 1 for specified community-college, open-admission, trade, technical, nursing, and two-year programs",
    deadlineMonth: null,
  },
  "golden-apple-scholars": {
    amount: "Up to $2,500 annually in years one and two and $5,000 in later years, plus paid professional development; up to $23,000 total assistance",
    who: "Illinois high school seniors, freshmen or sophomores at partner universities, and community-college students with a 2.5+ GPA pursuing bachelor's-level teacher preparation who complete required institutes and commit to teach five years in an Illinois school of need.",
  },
  "ohio-governors-merit": {
    deadline: "Typically May 15 for nominated students to accept",
    deadlineMonth: 5,
    who: "Top-performing Ohio high school graduates—including public, chartered nonpublic, homeschool, and dropout-recovery pathways—entering an eligible in-state college, meeting renewal standards, and making a nonbinding good-faith commitment to live in Ohio for three years after graduation.",
  },
  "next-nc": {
    deadline: "June 1 for UNC System schools; August 15 for community colleges, then while funds remain",
    deadlineMonth: null,
    who: "North Carolina residents attending an NC community college or UNC System university with household adjusted gross income of $80,000 or less, an eligible Student Aid Index and Pell profile, at least six credits of enrollment, and satisfactory academic progress.",
  },
  "golden-leaf-nc": {
    who: "Students from qualifying rural North Carolina counties with a 2.5+ GPA and Student Aid Index of 15,000 or less; the college/university pathway requires full-time enrollment, while separate community-college and transfer pathways have their own rules and application dates.",
  },
  "samsung-legion": {
    deadline: "Day 1 of the applicant's Boys State or Girls State session",
    deadlineMonth: null,
    officialUrl: "https://www.legion.org/get-involved/scholarships/samsung-american-legion-scholarship",
  },
  "path-to-pro": {
    deadline: "Quarterly: March 31, June 30, September 30, and December 31",
    deadlineMonth: null,
    who: "High school seniors, graduates, or GED holders entering or recently enrolled in an accredited skilled-trades program such as HVAC, electrical, plumbing, carpentry, or construction management; administered by SKILLED Nation.",
  },
  "stacey-milbern": {
    who: "High school seniors, graduates, and current undergraduates with an identified disability and a 3.0+ GPA studying at least half time nationwide; only the first 700 completed applications are considered, and renewal duration varies for full-time and half-time recipients.",
  },
  "uhf-health-care-scholars": {
    who: "Full- or part-time undergraduate, graduate, and credential students nationwide in the final year of an eligible clinical health program, enrolled when awards are made in November 2026 and completing by August 31, 2027, with financial need.",
  },
  "haz-la-u": {
    who: "High school seniors in U.S. states and territories with a 3.0+ unweighted GPA, evaluated on academic excellence, community service, and leadership; the published eligibility list does not impose a Hispanic or Latino ancestry requirement.",
    tags: ["community service", "leadership", "corporate"],
  },
  "nm-cancer-survivor": {
    amount: "$5,000, renewable once for up to $10,000 total (up to 25 awards)",
    who: "Childhood cancer survivors age 25 or under who are U.S. citizens or permanent residents entering full-time undergraduate study, with medical verification and financial need; renewal requires continued eligibility.",
  },
  "nm-cancer-sibling": {
    amount: "$5,000, renewable once for up to $10,000 total (up to 25 awards)",
    who: "Siblings age 25 or under of a child who is in treatment for, survived, or died from childhood cancer, who are U.S. citizens or permanent residents entering full-time undergraduate study and submit the required affidavit and financial-need information; awards are distributed geographically and renewal requires continued eligibility.",
  },
  exploravision: {
    deadline: "Typically February",
    deadlineMonth: 2,
  },
  "ncwit-collegiate": {
    deadline: "Typically January 27; nominations close around November 18",
    deadlineMonth: 1,
    who: "Undergraduate and graduate students in computing or engineering who join NCWIT's free Aspirations in Computing community; the current official eligibility list does not impose a women or nonbinary identity requirement.",
    tags: ["STEM", "computing", "engineering"],
  },
  "awg-geoscience": {
    who: "Incoming freshmen and current full-time undergraduate women from underserved communities studying geoscience at a U.S. college or university with a 3.0+ GPA; recommendations are required and recipients receive sponsored AWG membership.",
  },
  "hyundai-women-stem": {
    deadline: "Typically June 30",
    deadlineMonth: 6,
    who: "Female U.S. high school seniors and college undergraduates age 18 or older who are legal residents pursuing STEM and submit original work without AI assistance.",
  },
  "point-community-college": {
    who: "LGBTQ+ and ally students with a 2.5+ GPA enrolled at least half time for a full academic year at a not-for-profit community college, earning an associate degree or planning to transfer; online-only programs are excluded and prior Point awards are limited by program rules.",
  },
  "gamma-mu": {
    deadline: "March 1–31",
    deadlineMonth: 3,
    who: "U.S. citizens under 35 who have completed high school and study at least half time from undergraduate through graduate level; most awards serve gay men, while two named awards are open to the broader LGBTQ+ community.",
  },
  pfund: {
    deadline: "Early March; the official page currently conflicts between March 1 and March 3, 2027",
    deadlineMonth: 3,
    who: "LGBTQ+ students age 17 or older who are from or currently studying in Iowa, Minnesota, North Dakota, South Dakota, Wisconsin, or the Native Nations therein, across GED, certificate, trade, apprenticeship, undergraduate, graduate, and Ph.D. study.",
  },
  "traub-dicker-rainbow": {
    deadline: "Typically spring",
    deadlineMonth: null,
    who: "Lesbian graduating high school seniors, undergraduates, and graduate students pursuing U.S. study; a universal application and recommendation are required, and the $4,000 award is paid once.",
  },
  "live-out-loud": {
    deadline: "Typically January 19",
    deadlineMonth: 1,
    who: "LGBTQ+ New York State high school seniors with financial need entering college, university, vocational, certificate, or licensing programs; two recommendations, an interview, and attendance verification are required.",
  },
  apiqwtc: {
    deadline: "Typically February 1",
    deadlineMonth: 2,
    who: "Asian and Pacific Islander lesbian, bisexual, or queer women and transgender or nonbinary students entering or enrolled in undergraduate, graduate, degree, or certificate programs at U.S. nonprofit institutions; official transcripts, recommendations, and proof of enrollment are required, and recipients from the prior five years are ineligible.",
  },
  "phcc-foundation": {
    amount: "$1,500–$10,000 depending on the 2026 award",
    deadline: "Typically May 1",
    deadlineMonth: 5,
    who: "Legal U.S. residents studying full time in approved plumbing, heating, cooling, or related majors; apprentice applicants must meet employment rules, and recommendations are required.",
  },
  "nawic-founders": {
    deadline: "Typically February 6–March 6",
    deadlineMonth: 3,
    who: "Full- or part-time students in U.S. construction-related degree or trades programs; degree applicants need a 3.0+ GPA, graduate study is excluded, and awards begin at $2,000.",
  },
  "agc-foundation": {
    deadline: "Typically July 1–November 1",
    deadlineMonth: 11,
    who: "U.S. citizens or permanent residents in ABET- or ACCE-accredited construction programs; awards are paid by semester, and applicants provide a recommendation and complete a finalist interview before award decisions.",
  },
  "women-in-hvacr": {
    deadline: "Typically June 1; later applications roll into the following year's cycle",
    deadlineMonth: 6,
    who: "Women with a 3.0+ GPA pursuing either technical/trade HVACR training or a four-year bachelor's pathway; the application requires an essay, transcript, and proof of attendance.",
  },
  "horatio-alger-cte": {
    deadline: "Opens in March; awards are selected on a rolling basis",
    deadlineMonth: null,
    who: "U.S. citizens under 35 with household income of $100,000 or less who complete high school by July 1, have overcome adversity, and enter an eligible certificate or associate program at a nonprofit community college or trade school; prerequisite-only courses are excluded.",
  },
  "durastak-syngenta": {
    deadline: "Typically March 23–June 15",
    deadlineMonth: 6,
    who: "U.S. residents age 18 or older enrolled or planning full-time enrollment in STEM or agriculture at a school in Illinois, Indiana, Iowa, Kansas, Michigan, Minnesota, Missouri, Nebraska, North Dakota, Ohio, South Dakota, or Wisconsin; awards are judged rather than drawn.",
    officialUrl: "https://www.syngenta-us.com/seeds/corn-traits/durastak-scholarship",
  },
  "naba-national": {
    who: "Full-time U.S. citizens or permanent residents enrolled during the current academic year at a U.S. two- or four-year college in accounting, finance, technology, or business; eligibility is open regardless of race, and the required student membership is available at no cost through the scholarship page.",
    tags: ["accounting", "finance", "technology", "business"],
  },
  nahj: {
    who: "High school seniors, undergraduates, and graduate students pursuing journalism at colleges in the U.S. or Puerto Rico; applications require recommendations, transcripts, essays, work samples, and award-specific materials. The official page currently conflicts between a 2.8 and 3.0 GPA floor.",
    amount: "$2,000–$6,000, although the Ruben Salazar General Fund award may provide a sponsored national-conference package instead of cash",
  },
  "ija-aaja-pacific-islander": {
    deadline: "Typically June 28",
    deadlineMonth: 6,
    who: "Pacific Islander students and early-career journalists committed to covering Indigenous Pacific peoples; applicants may receive no more than two awards, usable for tuition, internship support, professional development, or qualifying student-loan repayment for working journalists.",
  },
  "nfb-scholarship": {
    deadline: "January 1–March 31",
    deadlineMonth: 3,
    who: "Legally blind undergraduate and graduate students residing in the U.S., D.C., or Puerto Rico pursuing full-time post-secondary study, with a part-time exception for applicants working full time; merit and full National Convention attendance are required.",
  },
  "sertoma-hearing": {
    amount: "$1,000",
    deadline: "November 1–March 31",
    deadlineMonth: 3,
    who: "U.S. citizens with at least 40dB bilateral hearing loss pursuing a full-time bachelor's degree with a 3.2+ GPA; graduate, associate, community-college, vocational, and technical programs are excluded.",
  },
  "anne-ford-ncld": {
    who: "Graduating high school seniors with a documented qualifying learning disability entering a full-time bachelor's program, evaluated partly on financial need; the application includes FAFSA/EFC information, a recommendation, three personal responses, rolling review, and a finalist interview.",
  },
  "rubys-rainbow": {
    deadline: "Typically April; applications reopen January 1",
    deadlineMonth: 4,
    who: "Adults with Down syndrome who will be 18 by August 1 and enroll at a U.S.-based college, vocational, trade, certificate, or life-skills program; proof of enrollment and tuition, medical confirmation, recommendations, photo permissions, and eligible-expense documentation are required.",
  },
  "wa-college-bound": {
    name: "College Bound",
    deadline: "Annual FAFSA or WASFA filing; most eligible students are enrolled automatically",
    deadlineMonth: null,
    who: "Most eligible Washington students are enrolled automatically and access funds through annual FAFSA or WASFA filings after high school; requirements include high school completion, a 2.0 GPA for four-year colleges, college enrollment within one year, annual income and residency eligibility, a participating school, no felony conviction, and satisfactory progress.",
  },
  "or-opportunity-grant": {
    deadline: "Tentatively May 15 for 2026–27; funding is first come",
    deadlineMonth: 5,
    who: "Oregon undergraduates, including eligible DACA and undocumented students, with a Student Aid Index of 8,000 or less pursuing an eligible program before earning a first bachelor's degree; awards are first come, exclude summer, may be prorated for part-time study, and can depend on fall enrollment.",
  },
  "or-promise-grant": {
    amount: "$2,280–$4,716 for 2026–27 as a last-dollar grant capped at average tuition for 12 credits; it may not cover all community-college costs",
    deadline: "Varies by graduation date; renewals are due June 1",
    deadlineMonth: null,
    who: "Recent Oregon high school graduates with a 2.0+ GPA or GED test scores of at least 145, twelve months of residency, and a qualifying first-college start term; recipients enroll in at least six credits, remain within 90 credits, and meet the applicable Student Aid Index cap.",
  },
  "az-promise-program": {
    who: "First-time Arizona high school graduates who enroll on campus in a degree program at an Arizona public university in the fall immediately after graduation, qualify for Pell under the current English rules, renew FAFSA and Pell eligibility annually, remain continuously full time, and maintain satisfactory progress for up to eight semesters.",
    stages: ["high-school"],
  },
  "nm-opportunity-scholarship": {
    who: "New Mexico residents, regardless of immigration status, pursuing a first eligible certificate or degree at one of 29 public institutions with at least six credits; there is no separate scholarship application, returning adults and summer study can qualify, and first-degree credit limits apply. A 2.5 GPA is not a universal entry rule.",
  },
  "ak-performance-scholarship": {
    amount: "Up to $7,000, $5,250, or $3,500 per year by level; up to $28,000 lifetime",
    deadline: "Typically June 30 priority deadline",
    deadlineMonth: 6,
    who: "Alaska high school graduates completing the required curriculum and GPA or test-score route who file FAFSA or the alternative application annually, attend an eligible Alaska institution at least half time, and use up to eight disbursements within eight years.",
  },
  "hi-promise-scholarship": {
    amount: "Up to 95% of tuition; the 2024–25 average award was about $2,933, not a guaranteed amount",
    who: "Hawai'i residents or resident-tuition students pursuing a first eligible degree or certificate at a UH community college with at least six credits, a 2.0 GPA and satisfactory progress; FAFSA filers are considered automatically, with March 1 as a priority date and awards contingent on funding.",
    tags: ["hawaii", "community-college", "promise-program", "financial need"],
  },
  "mt-honor-scholarship": {
    deadline: "December 1–March 15",
    deadlineMonth: 3,
    amount: "Full tuition waiver averaging about $5,000 per year; mandatory and class fees are excluded",
    who: "Montana high school seniors with a 3.4+ GPA, three years at an accredited school, the rigorous core or IB curriculum, and qualifying ACT/SAT results by February who are accepted at an eligible campus and submit supporting documents; renewal requires full-time study, a 3.4 college GPA, credit milestones, and available funding.",
  },
  "wy-hathaway-scholarship": {
    amount: "Merit levels pay $840, $1,260, or $1,680 per full-time semester for up to eight semesters; need-based supplements are separate",
    who: "Wyoming graduates entering eligible certificates, community colleges, or the University of Wyoming who meet their tier's curriculum and score rules, maintain the required 2.25 or 2.5 GPA, continuous enrollment and satisfactory progress, remain within semester limits, and follow the current on-the-job-training rules.",
  },
  "ca-cal-grant": {
    amount: "Varies by Cal Grant A, B, or C and annual state budget; current tuition, access, and career-technical components exceed $500",
    deadline: "March 2 priority deadline; September 2 for California community-college applicants",
    deadlineMonth: null,
    who: "Eligible California high school, community-college, transfer, career-technical, and undergraduate students—including qualifying undocumented students filing CADAA—who meet the applicable GPA, income/assets, need, timing, institution, and Cal Grant A, B, or C pathway rules.",
  },
  "tn-tsaa": {
    deadline: "Typically April 1 FAFSA deadline",
    deadlineMonth: 4,
    who: "Tennessee undergraduates with a Student Aid Index of 5,000 or less who enroll at least half time, list an eligible Tennessee institution first, have no prior bachelor's degree or disqualifying repayment/default issue, maintain satisfactory progress, and remain within term limits; returning students receive priority and awards depend on available funds.",
  },
  "la-tops": {
    deadline: "July 1 full-funding deadline tied to graduation timing",
    deadlineMonth: 7,
    who: "Qualifying Louisiana residents who meet the distinct academic, testing, institution, enrollment, and renewal rules for TOPS Opportunity, Performance, Honors, Excellence, or TOPS Tech; each level has its own thresholds, payment schedule, and supplements.",
  },
  "ms-help": {
    deadline: "October 1–March 31; documents due April 30",
    deadlineMonth: 3,
    who: "Mississippi students entering a first certificate, associate, or bachelor's program who file FAFSA and MAAPP, meet ACT 20, income/Pell, residency-document, approved-program, and continuous full-time rules, and maintain the renewal GPA for up to eight semesters.",
    officialUrl: "https://www.msfinancialaid.org/programs/help-higher-ed-legislative-plan/",
  },
  "ar-academic-challenge": {
    deadline: "Typically July 1",
    deadlineMonth: 7,
    who: "Traditional and nontraditional Arkansas certificate, associate, and bachelor's students meeting the current Diploma of Merit, GPA, or test pathway and FAFSA/enrollment rules; current year schedules include separate two-year and PLUS aid, with renewal requirements and limited graduate use for early completers.",
  },
  "ok-promise": {
    deadline: "December 31 of senior year and before graduation; younger students are encouraged to apply by June 30",
    deadlineMonth: null,
    who: "Oklahoma students applying in grades 8–12 before graduation who meet the current household-size income bands or special income pathway, complete the required curriculum and conduct standards, file FAFSA annually, pass the $100,000 second-income test, and follow postsecondary eligibility limits.",
  },
  "dc-tuition-assistance-grant": {
    deadline: "February 2–August 21",
    deadlineMonth: 8,
    who: "D.C. residents domiciled for at least 12 months who file FAFSA and required documents, earned their qualifying credential within 15 years, and pursue a first degree at least half time within applicable income and six-year limits; lifetime caps are $75,000 for public institutions and $18,750 for eligible private colleges and HBCUs.",
  },
  "nh-governors-scholarship": {
    deadline: "Institution-administered financial-aid consideration",
    deadlineMonth: null,
    who: "Eligible New Hampshire students pursuing a first certificate or undergraduate degree through continuous full-time enrollment, including qualifying special-residency routes; institutions select recipients and apply credential-recency, conduct, GPA-renewal, transfer, and program-length limits.",
  },
  "in-21st-century-scholars": {
    deadline: "October 1–June 30 of eighth grade; eligible students may be enrolled automatically",
    deadlineMonth: 6,
    who: "Eligible Indiana seventh- and eighth-graders—including qualifying Free and Reduced Price Lunch students automatically enrolled unless they opt out—who meet current income, citizenship, school, or foster-care rules, complete ScholarTrack/parent-account steps, the Scholar Pledge and success activities, file FAFSA, and satisfy renewal requirements.",
  },
  "sd-opportunity-scholarship": {
    deadline: "June 1 preferred; September 1 fall deadline; separate November 1 and January 15 spring deadlines",
    deadlineMonth: 9,
    who: "South Dakota high school graduates who complete the required curriculum and meet a qualifying ACT/SAT and GPA pathway, apply to an eligible South Dakota institution, and maintain the program's credit-load, 3.0 college GPA, and continuous-enrollment requirements.",
  },
  "roothbert-fund-scholarship": {
    deadline: "November 1–February 1",
    deadlineMonth: 2,
    who: "U.S. undergraduate and graduate students motivated by spiritual or ethical values, with preference for graduate students and undergraduates who have completed at least one year; applicants submit transcripts, essays, and recommendations and complete an interview, retreat, and fellowship programming if selected.",
    tags: ["undocumented", "no-citizenship-required", "values-based", "graduate-students"],
  },
  "cofem-mexican-american-dream-scholarship": {
    deadline: "August 1–October 1 in the latest published cycle",
    deadlineMonth: 10,
    who: "First-generation students of Mexican descent—including AB 540, DACA, and undocumented students—who live in California and attend an accredited community college or four-year institution in the program's eligible service area.",
  },
  "aicpa-two-year-transfer": {
    deadline: "Typically March 15",
    deadlineMonth: 3,
    who: "Community-college students with financial need and a 3.0+ GPA who plan to transfer into an accredited full-year accounting or accounting-related bachelor's program, intend to become CPAs, meet the citizenship or permanent-residency rule, provide two references, and join the free AICPA Student Affiliate program.",
  },
  "wisp-doris-buffett-grant": {
    amount: "$1,000–$2,500 per semester or quarter",
    deadline: "August 1–October 1 and January 1–March 1",
    deadlineMonth: null,
    who: "U.S. citizens or permanent residents who are survivors of intimate-partner abuse, have been separated from the abuser for one to ten years, demonstrate critical financial need, and are admitted to an eligible undergraduate, graduate, certificate, or vocational program with the required recommendations and financial and academic documents.",
    tags: ["survivors", "women", "community college", "vocational", "need-based", "graduate-students"],
  },
  "cybercorps-scholarship-for-service": {
    amount: "Full tuition and required fees, plus a $27,000 undergraduate or $37,000 graduate annual stipend and up to $6,000 in professional-development support",
    deadline: "Varies by participating institution",
    deadlineMonth: null,
    who: "Eligible U.S. citizens or lawful permanent residents enrolled in a participating institution's cybersecurity program who can satisfy federal employment and security requirements, complete the required internship, and serve in an approved government cybersecurity role for a period equal to their scholarship support.",
    tags: ["cybersecurity", "computer-science", "engineering", "federal", "graduate-students", "service-obligation"],
  },
  "asce-scholarships": {
    deadline: "Typically January 15",
    deadlineMonth: 1,
    who: "Undergraduate civil-engineering students with at least one term remaining and an active free ASCE Student membership who submit the required essay, budget, recommendations, transcript, and résumé.",
  },
  "nih-undergraduate-scholarship-program": {
    deadline: "Typically March; references and financial certification are due later",
    deadlineMonth: 3,
    who: "U.S. citizens or permanent residents with exceptional financial need who attend an accredited four-year institution full time, hold a 3.3+ GPA or rank in the top five percent, pursue eligible biomedical, behavioral, or social-science research, pass a background check, and complete a ten-week NIH summer internship plus one year of full-time NIH service for each year funded.",
    tags: ["biology", "biomedical", "public-health", "stem", "service-obligation"],
  },
  "actuarial-foundation-stem-stars": {
    deadline: "Typically February 27",
    deadlineMonth: 2,
    who: "High school students entering college who demonstrate strong mathematics ability and interest in an actuarial career; recipients also receive mentoring, networking, internship and job-shadowing support, and a free summer workshop.",
  },
  "barry-goldwater-scholarship": {
    deadline: "Typically January 30 national nomination deadline; campus deadlines are earlier",
    deadlineMonth: 1,
    who: "Institution-nominated U.S. citizens, nationals, or permanent residents who are college sophomores or juniors, hold a 3.0+ GPA, will enroll full time during the award year, and intend a research career in mathematics, natural sciences, or engineering; the annual application typically opens in September.",
  },
  "pama-national-scholarships": {
    deadline: "Typically March 2",
    deadlineMonth: 3,
    who: "Legal U.S. residents enrolled in or recently graduated from an FAA-approved Part 147 aviation-maintenance school who hold the required free PAMA student membership and submit a transcript, recommendation, and essay; relatives of PAMA directors are ineligible.",
  },
  "aea-educational-foundation-scholarships": {
    amount: "$1,000–$6,000 across multiple named awards",
    deadline: "Typically April 1; the next cycle is expected to open in October",
    deadlineMonth: 4,
    who: "Eligible high school, college, and aviation-training students applying to the portfolio's distinct avionics, maintenance, aviation-management, pilot-training, member/dependent, and employee-development awards.",
  },
  "pma-educational-foundation-scholarship": {
    deadline: "October 5–January 31 in the published 2026–27 cycle",
    deadlineMonth: 1,
    who: "High school seniors, post-secondary students, apprentices, and trade students with a 2.0+ GPA pursuing eligible manufacturing, engineering, machining, robotics, automation, welding, metalforming, or related technical training and submitting the required application materials.",
  },
  "iec-foundation-scholarship": {
    deadline: "January 4–February 4; references due February 12 in the published 2027 cycle",
    deadlineMonth: 2,
    who: "Students pursuing college or a state-accredited apprenticeship, including eligible IEC members and their immediate family members, who complete the application and reference requirements.",
  },
  "pba-minerva-beauty-scholarship": {
    amount: "One $2,000 scholarship for a student in an eligible beauty licensure program",
    deadline: "Typically October 15",
    deadlineMonth: 10,
    who: "U.S. citizens age 18 or older who are enrolled in a U.S. licensure program for cosmetology, barbering, esthetics, nail technology, massage therapy, or another eligible beauty profession.",
  },
  "appa-deed-lineworker-scholarship": {
    deadline: "December 1–February 15 and August 1–October 15",
    deadlineMonth: null,
    who: "Students pursuing lineworker or other public-power technical education who are sponsored by a DEED member utility, will not graduate within 12 months, and attend an eligible vocational school, lineworker school, or college; awards are paid directly to the school.",
  },
  "sigma-gamma-rho-nef-scholarships": {
    deadline: "Varies; the next cycle has not been announced",
    deadlineMonth: null,
    who: "Graduating high school seniors and undergraduate or graduate students of any background with a 2.5+ GPA who demonstrate financial need and community involvement; awards are one-time, paid to the institution, and scheduled for disbursement by December 31.",
    tags: ["black", "sorority", "foundation", "financial-need", "graduate-students"],
  },
  "fossi-hbcu-stem-scholars": {
    deadline: "Typically January 15",
    deadlineMonth: 1,
    who: "U.S. citizens or permanent residents who are high school seniors with a 3.0+ GPA, demonstrate financial need, and commit to an approved STEM major at an HBCU while meeting the program's continuation requirements.",
    tags: ["hbcu", "stem", "foundation", "financial-need"],
  },
  "aaia-native-scholarship": {
    deadline: "Varies; the next application period is expected in early 2027",
    deadlineMonth: null,
    who: "Citizens of a Native Nation who attend an accredited institution full time, hold a 2.5+ GPA, and demonstrate commitment to serving Native Nations; undergraduate and graduate students may apply.",
    tags: ["native-american", "tribal", "financial-need", "foundation", "graduate-students"],
  },
  "udall-undergraduate-scholarship": {
    deadline: "Typically March 4; campus deadlines are earlier",
    deadlineMonth: 3,
    who: "Faculty-representative-nominated U.S. citizens, nationals, or permanent residents who are sophomores or juniors pursuing a first bachelor's degree and meet the distinct Native citizenship or descendant rules for the Tribal public-policy or Native health-care track.",
  },
  "adc-shaheen-media-scholarship": {
    amount: "$5,000",
    deadline: "Typically April 12",
    deadlineMonth: 4,
    who: "Arab American undergraduate juniors, seniors, and graduate students with a 3.5+ GPA majoring in Journalism, Television, Radio, Film, or Media Studies.",
  },
  "oar-postsecondary-scholarship": {
    deadline: "Typically April 20",
    deadlineMonth: 4,
    who: "Students on the autism spectrum who apply to one of the program's three scholarship tracks and will attend an eligible two- or four-year college, trade school, vocational program, or life-skills program full time during both fall and spring.",
  },
  "peo-star-scholarship": {
    deadline: "Chapter recommendations close October 15; students apply within 30 days of receiving their link",
    deadlineMonth: null,
    who: "Women in their final year of high school with a 3.0+ unweighted GPA who are U.S. or Canadian citizens or permanent residents, plan full- or part-time postsecondary study, complete a local interview, and receive a P.E.O. chapter recommendation.",
  },
  "ncld-allegra-ford-thomas-scholarship": {
    deadline: "Typically May 10",
    deadlineMonth: 5,
    who: "Graduating high school seniors with a documented learning disability—not ADHD alone—who plan to attend a two-year college, vocational program, or specialized disability program and submit disability documentation, FAFSA/EFC information, a recommendation, and three personal responses.",
    tags: ["disability", "learning-disability", "community-college", "vocational"],
  },
  "paf-scholarship-for-survivors": {
    amount: "$3,000 per year; up to $12,000 over four undergraduate years or $6,000 over two graduate/doctoral years",
    deadline: "Typically March 5",
    deadlineMonth: 3,
    who: "U.S. undergraduate students under age 25 treated for cancer or another serious chronic disease within the past five years, and eligible graduate or doctoral students treated within ten years; continuation requires full-time study, a 2.75+ GPA, and 20 community-service hours annually.",
    tags: ["chronic-illness", "cancer-survivors", "disability", "undergraduate", "graduate-students"],
  },
  "pfef-children-of-incarcerated-scholarship": {
    amount: "$1,000 initial award, with renewable support for up to three additional years",
    deadline: "Rolling",
    deadlineMonth: null,
    who: "Children of incarcerated or paroled parents who enroll full time in an eligible college, trade school, or certification program, qualify for a Pell Grant, submit their FAFSA Student Aid Report, and are not attending an online-only program.",
  },
  "kroger-scholars": {
    deadline: "March 5–April 16 in the published 2026–27 cycle",
    deadlineMonth: 4,
    who: "Eligible natural, adopted, or stepchildren age 25 or younger of qualifying Kroger associates in participating divisions who meet service, hours, and dependency rules; Harris Teeter families and specified vice-president or board-member families are excluded, and awards support full-time undergraduate study for one year with reapplication allowed.",
  },
  "teamsters-hoffa-scholarship": {
    deadline: "Typically March 2; the next cycle opens in November",
    deadlineMonth: 3,
    who: "Sons, daughters, or financial dependents—not spouses—of Teamsters members in good standing; vocational study must relate to a Teamster-represented industry.",
  },
  "ufcw-charity-foundation-scholarship": {
    deadline: "Typically May 10 online; mailed materials due May 24",
    deadlineMonth: 5,
    who: "Active UFCW members with qualifying membership since the prior January 1, or their unmarried dependents under age 20 as of the mailed-material deadline; selection considers academics, community involvement, and a labor-focused essay.",
  },
  "union-plus-scholarship": {
    deadline: "January 31 in the published 2027 cycle",
    deadlineMonth: 1,
    who: "Current or retired members of participating unions, their spouses, or dependent children who satisfy the one-year membership minimum by May 31; undergraduate, graduate, law, medical, community-college, trade, and technical study is eligible, and recipients may reapply for this nonrenewable award.",
    tags: ["union", "afl-cio", "labor", "family", "graduate-students", "trade-school"],
  },
  "seiu-1199-joseph-tauber-scholarship": {
    deadline: "Varies by annual request and application cycle",
    deadlineMonth: null,
    who: "Full-time undergraduate dependents younger than 23 whose parent is an eligible 1199SEIU member and who appear on the member's health-benefits card, apply for federal and state aid, and meet the program's need rules; awards are taxable wages to the member and require annual reapplication.",
  },
  "knights-of-columbus-scholarships": {
    amount: "$1,500 per year, renewable for up to four undergraduate years",
    deadline: "Varies; confirm on the official application",
    deadlineMonth: null,
    who: "Knights of Columbus members in good standing, or their sons or daughters, who are entering first-year students at a Catholic four-year college or university in the United States.",
  },
  "girl-scouts-gold-award-scholarship": {
    deadline: "March 13–April 14 in the published 2026 cycle",
    deadlineMonth: 4,
    who: "Gold Award Girl Scouts whose award was approved by the current senior-year cutoff or during senior year after the prior-cycle cutoff; the national program selects one $5,000 recipient per council.",
  },
  "4-h-youth-in-action-scholarship": {
    amount: "Four $5,000 awards",
    deadline: "The next application opens in January 2027",
    deadlineMonth: null,
    who: "4-H members who use their skills to create lasting community impact and plan a two-year, four-year, trade, or other advanced-learning pathway; winners also complete a year of media and professional development and serve as program spokespeople.",
  },
  "becu-foundation-scholarship": {
    deadline: "Typically December 1–January 31",
    deadlineMonth: 1,
    who: "Graduating high school seniors and current undergraduates who are BECU members and primary account holders on accounts separate from a parent or guardian; renewal requires continuous full-time enrollment and satisfactory academic progress.",
  },
  "army-rotc-scholarship": {
    deadline: "Start by March 4; final board documents due March 8 in the published 2027 cycle",
    deadlineMonth: 3,
    who: "Eligible high school and college students who train to commission as Army officers and accept an eight-year military obligation whose active-duty and reserve components depend on the award path; most four-year recipients serve four active years plus four years in the Individual Ready Reserve.",
  },
  "navy-marine-rotc-scholarship": {
    amount: "Full tuition and fees or up to $11,500 per year for room and board, plus a $750 textbook stipend and monthly class-year allowances",
    deadline: "Varies; confirm on the official program page",
    deadlineMonth: null,
    who: "High school applicants who qualify for the Navy, Marine, or Navy Nurse option and accept the program's training and commissioning requirements; minimum active-duty service is generally five years for Navy Option and four years for Marine or Nurse Option.",
  },
  "air-force-space-force-rotc-scholarship": {
    amount: "Full or capped tuition determined at award, plus $900 per year for books and $300–$500 per month based on college year",
    deadline: "September 15 and December 11 initial-application deadlines in the published 2026 cycle",
    deadlineMonth: null,
    who: "High school applicants with a 3.3+ unweighted GPA and a qualifying SAT 1310, ACT 28, or CLT 93 score who pass fitness and interview requirements, train to commission into the Air Force or Space Force, and accept a career-field-dependent active-duty obligation.",
  },
  "coast-guard-cspi": {
    deadline: "Contact a Coast Guard recruiter for the current deadline",
    deadlineMonth: null,
    who: "College juniors and seniors at qualifying Minority Serving Institutions, normally near a Coast Guard unit or recruiting office, who enlist under a four-year contract, complete Coast Guard training and duties while in school, and serve three years as active-duty officers after Officer Candidate School.",
  },
  "fry-scholarship": {
    amount: "Full public in-state tuition and fees, or up to $30,908.34 at private or foreign schools for 2026–27, plus eligible housing, books, testing, tutoring, and other approved benefits for up to 36 months",
    deadline: "No annual deadline; the benefit is available continuously",
    deadlineMonth: null,
    who: "Eligible children and surviving spouses of service members who died in the line of duty on or after September 11, 2001; undergraduate and graduate degrees and approved non-college training may qualify, with detailed child, spouse, age, and benefit-election rules on the official VA page.",
    tags: ["veterans", "survivor-benefit", "federal", "full-tuition", "graduate-students", "non-college-training"],
  },
  "amvets-ladies-auxiliary-scholarship": {
    deadline: "Typically July 1",
    deadlineMonth: 7,
    who: "AMVETS Ladies Auxiliary members and their children or grandchildren who are at least second-year undergraduates and provide the qualifying member's current membership card; this record represents the Auxiliary's National Scholarship rather than its separate high-school, career-start, or trade awards.",
  },
  "tx-charles-butt-scholarship": {
    amount: "Up to $8,000–$10,000 per year depending on the partner program, for up to four years",
    deadline: "Varies by partner university",
    deadlineMonth: null,
    who: "Undergraduate, master's, and post-baccalaureate students in eligible teacher-certification programs at partner Texas universities who commit to teaching in a Title I or majority-economically-disadvantaged Texas public school or a priority subject; Texas residents receive preference.",
    tags: ["teacher-pipeline", "shortage-subject", "bilingual-education", "special-education", "texas", "graduate-students"],
  },
  "fl-minority-teacher-education-scholarship": {
    deadline: "Varies; fall and spring application opening dates are to be announced",
    deadlineMonth: null,
    who: "Eligible minority full-time juniors, seniors, and graduate students in Florida teacher-education programs who have at least 60 credits or an associate degree and have not completed an education bachelor's or more than 18 upper-division education credits; recipients owe one year of Florida public-school teaching per funded year or may face full repayment at 8% annual interest.",
    tags: ["teacher-pipeline", "minority-serving", "florida", "diversity", "graduate-students", "service-obligation"],
  },
  "r-gene-richter-scholarship": {
    deadline: "Fall 2026–January 22, 2027",
    deadlineMonth: 1,
    who: "Full-time undergraduate seniors pursuing supply management, supply chain, or procurement who are U.S. or Canadian citizens or green-card holders, will attend the 2027 ISM conference, and pledge to use the award for educational expenses.",
  },
  "nrf-foundation-next-generation-scholarship": {
    deadline: "Typically May 26; selected semifinalists have a later task deadline",
    deadlineMonth: 5,
    who: "Current or future college juniors and seniors with a 3.0+ GPA, retail work or internship experience, and U.S. citizenship or qualifying legal residency; awards are announced the following January and paid to the institution.",
  },
  "pmi-founders-scholarship": {
    deadline: "Typically May 10",
    deadlineMonth: 5,
    who: "Undergraduate and graduate students pursuing project management or a related field who submit PMI's unified scholarship application and are matched to eligible awards.",
    tags: ["project-management", "business", "management", "graduate-students"],
  },
  "larry-b-sawyer-student-scholarship": {
    deadline: "Typically April 15",
    deadlineMonth: 4,
    who: "Undergraduate and graduate students enrolled in or recently completing internal-audit coursework with a 3.0+ GPA who are sitting for or plan to take the CIA exam and, where applicable, hold IIA student membership.",
    tags: ["accounting", "internal-audit", "finance", "business", "graduate-students"],
  },
  "hsmai-mike-dimond-scholarship": {
    deadline: "Typically April 30 at 11:59 a.m. Pacific",
    deadlineMonth: 4,
    who: "Undergraduate or graduate hospitality students with a demonstrated interest in hotel sales, marketing, or revenue management; HSMAI membership is preferred, not required, and the award includes conference registration and an industry mentor.",
  },
  "appraisal-institute-education-trust-scholarship": {
    name: "AIERF College Scholarship",
    amount: "$1,500",
    deadline: "Typically April 1",
    deadlineMonth: 4,
    who: "College sophomores, juniors, seniors, and graduate students concentrating in real-estate appraisal, land economics, or a related real-estate field.",
    tags: ["real-estate", "appraisal", "finance", "graduate-students"],
  },
  "cas-trust-scholarship": {
    deadline: "Typically January 31",
    deadlineMonth: 1,
    who: "Full-time college students who have sat for at least one actuarial exam by March 31 and belong to the free CAS Student Central program.",
  },
  "jfk-profile-in-courage-essay-contest": {
    deadline: "Typically January 12",
    deadlineMonth: 1,
    who: "U.S. high school students in grades 9–12 who submit an essay about an eligible elected official's act of political courage, follow the contest's citation rules, and name a nominating teacher.",
  },
  "poetry-out-loud": {
    amount: "$20,000 national champion; $10,000 second place; $5,000 third place; additional $1,000 national awards",
    deadline: "Varies by school, organization, and state",
    deadlineMonth: null,
    who: "High school students who participate through a registered school, organization, or state coordinator and advance through local and state recitation rounds to the national competition; smaller state-level awards are separate from the qualifying national prizes listed here.",
  },
  "glenn-miller-scholarship-competition": {
    deadline: "Typically April 20 at 5:00 p.m.",
    deadlineMonth: 4,
    who: "High school seniors and college freshmen pursuing music who submit an audition recording and, if selected, can travel to Clarinda, Iowa at their own expense.",
  },
  "unico-alessio-southern-italy-scholarship": {
    deadline: "March 15, 2027 for the published 2027–28 cycle",
    deadlineMonth: 3,
    who: "U.S. citizens in their first three college years with a 2.7+ GPA who enroll full time in a campus-based U.S. degree and have at least one parent from a named Southern Italian region; UNICO membership is not required.",
  },
  "oca-joe-loanne-chiu-scholarship": {
    deadline: "Typically May 22",
    deadlineMonth: 5,
    who: "U.S. citizens or permanent residents who are current high school seniors entering their first undergraduate year and are first-generation college students, meaning their parents or guardians did not complete a bachelor's degree; no Asian American, Pacific Islander, or Chinese identity requirement is stated.",
    tags: ["first-generation", "oca", "high-school-seniors"],
  },
  "nfia-partner-donor-scholarship": {
    amount: "$1,000–$2,000 annually, with possible renewal for up to four years",
    deadline: "Typically August 15",
    deadlineMonth: 8,
    who: "College-bound and current college, university, or technical-school students in the program's U.S., Indian-citizen, and nonresident-Indian applicant categories, selected through academics, leadership, essays, recommendations, and—for designated awards—financial need.",
  },
  "naahp-haitian-american-leadership-scholarship": {
    deadline: "Varies; the official page does not publish the next exact deadline",
    deadlineMonth: null,
    who: "Part-time or full-time undergraduate and graduate students with a 3.2+ GPA at accredited two- or four-year institutions who have Haitian lineage or a documented connection and satisfy the nationwide qualifying citizenship, residency, visa, or TPS rules.",
    stages: ["college"],
    tags: ["haitian", "haitian-american", "caribbean", "heritage", "naahp", "graduate-students"],
  },
  "gbhem-umc-scholarship": {
    amount: "$500–$1,200 average award",
    deadline: "Typically January 7–March 6",
    deadlineMonth: 3,
    who: "Incoming college first-year through graduate students at accredited U.S. institutions who have been active full members of a United Methodist Church for at least one year and hold a 2.5+ GPA.",
    tags: ["methodist", "denominational", "need-based", "merit-based", "graduate-students"],
  },
  "pcusa-undergraduate-scholarship": {
    deadline: "Typically the second Monday in May",
    deadlineMonth: 5,
  },
  "abhms-baptist-scholarship": {
    deadline: "January 15–April 15 in the published 2027 cycle",
    deadlineMonth: 4,
    who: "Active members of an American Baptist Churches USA congregation who attend an accredited U.S. or Puerto Rico institution full or part time as undergraduate, graduate, seminary, or community-college students.",
    tags: ["baptist", "denominational", "need-based", "american-baptist", "graduate-students", "part-time"],
  },
  "sharda-hindu-scholarship": {
    deadline: "Varies; the current program page does not publish an exact deadline",
    deadlineMonth: null,
    who: "Hindu U.S. citizens or permanent residents graduating from a U.S. high school and entering college that year, selected for academic merit, leadership, community service, cultural engagement, essays, and references.",
  },
  "isna-scholarship": {
    name: "ISNA Scholarships",
    amount: "$2,000 per current named scholarship",
    deadline: "Varies; confirm the current cycle on the official page",
    deadlineMonth: null,
    who: "Muslim U.S. citizens or permanent residents admitted to begin college as freshmen in the applicable fall term; each named scholarship category has additional award-specific criteria.",
    stages: ["high-school"],
  },
  "vertex-foundation-scd-tdt-scholarship": {
    deadline: "Typically May 6",
    deadlineMonth: 5,
    who: "Part-time or full-time undergraduate and graduate students in the United States or Canada who live with sickle cell disease or transfusion-dependent beta thalassemia, or are immediate family members, and attend an eligible institution.",
    tags: ["sickle-cell-disease", "thalassemia", "chronic-illness", "blood-disorder", "graduate-students", "part-time"],
  },
  "acb-scholarship-program": {
    deadline: "November 1, 2026–February 14, 2027",
    deadlineMonth: 2,
    who: "Legally blind students pursuing full-time or qualifying part-time undergraduate, graduate, technical-college, or other post-secondary education in the United States.",
    tags: ["blind", "low-vision", "disability", "visual-impairment", "graduate-students", "technical-college"],
  },
  "abbvie-immunology-scholarship": {
    amount: "$10,000 for associate-degree students or $20,000 for bachelor's and graduate students, renewable for up to three additional years",
    who: "Full-time U.S. citizens or permanent residents living with an eligible inflammatory disease who attend an accredited U.S. associate, bachelor's, master's, doctoral, or vocational-technical program.",
    tags: ["crohns-disease", "ulcerative-colitis", "autoimmune", "chronic-illness", "graduate-students", "vocational"],
  },
  "boomer-esiason-academic-scholarship": {
    amount: "$10,000 general academic award; lifetime receipt capped at $30,000 for a four-year degree or $45,000 for graduate study",
    deadline: "Typically April 10",
    deadlineMonth: 4,
    who: "U.S. citizens or permanent residents with a confirmed cystic-fibrosis diagnosis who are enrolled in or accepted to an undergraduate or graduate program and are evaluated on academics, character, leadership, service, financial need, documentation, and a semifinalist interview.",
    tags: ["cystic-fibrosis", "chronic-illness", "disability", "graduate-students"],
  },
  "180-medical-scholarship": {
    deadline: "January 1–June 1 annually",
    deadlineMonth: 6,
    who: "Legal U.S. residents under a physician's care for spina bifida, spinal-cord injury, transverse myelitis, neurogenic bladder, bladder exstrophy, or an ostomy who attend a full-time two-year, four-year, or graduate program; medical school is excluded.",
    tags: ["spina-bifida", "spinal-cord-injury", "disability", "chronic-condition", "graduate-students"],
  },
  "noaa-hollings-scholarship": {
    amount: "Up to $40,000 in total academic support plus a paid ten-week NOAA summer internship",
    deadline: "September 1, 2026–January 31, 2027",
    deadlineMonth: 1,
  },
  "imagine-america-asep": {
    who: "Adult learners age 19 or older with a high school diploma or GED who are U.S. citizens or permanent residents, demonstrate financial need, have not received a prior Imagine America award, enroll at a participating career college, and complete the required assessment and financial-planning video.",
  },
  "perry-second-chances-scholarship": {
    amount: "$10,000",
    who: "U.S. citizens who are formerly incarcerated women or girls, or daughters of incarcerated women, enrolled in or accepted to an accredited undergraduate, graduate, or vocational program; currently incarcerated applicants and students in their final program semester are ineligible.",
    tags: ["reentry", "formerly-incarcerated", "women", "vocational", "second-chance", "graduate-students"],
  },
  "texas-national-guard-state-tuition-assistance": {
    amount: "Up to 12 credit hours of eligible tuition and mandatory fees; current planning estimates are $3,734–$5,366, with actual awards based on need, charges, and funding",
    deadline: "Varies by semester; late applications may be accepted when announced",
    deadlineMonth: null,
    who: "Actively drilling, in-good-standing members of a qualifying Texas Army National Guard, Texas Air National Guard, or Texas State Guard component and rank who attend an eligible nonprofit Texas institution in a certificate, associate, bachelor's, graduate, or professional program.",
    tags: ["military", "national-guard", "texas", "tuition-assistance", "graduate-students", "professional-program"],
  },
  "nsa-scholarship-foundation": {
    amount: "$1,000–$2,500 for current general awards; named awards include fixed $500 and $1,000–$2,000 scholarships",
    who: "Undergraduate and graduate accounting majors at accredited U.S. two- or four-year colleges who meet the applicable general or named-award criteria; financial need applies only to designated awards such as the Arizona need scholarship.",
    tags: ["accounting", "business", "merit", "undergraduate", "graduate-students"],
  },
  "obama-chesky-voyager-scholarship": {
    amount: "Up to $50,000 in last-dollar aid, a $10,000 Summer Voyage stipend and Airbnb credits, plus up to $20,000 in later travel credits",
    deadline: "Typically March 17",
    deadlineMonth: 3,
    who: "College sophomores or rising juniors—including eligible two-year students transferring—who plan full-time junior-year study at an accredited four-year U.S. institution and demonstrate commitment to public service.",
  },
  "gloria-barron-prize": {
    deadline: "March 15 pre-application; invited full applications due April 15",
    deadlineMonth: 4,
    who: "Young people ages 8–18 residing in the United States or Canada who lead a public-service or environmental initiative with measurable impact; up to two co-applicants may apply together and split one $10,000 award.",
  },
  "stamps-scholars": {
    who: "Top undergraduate applicants—and students in select Georgia Tech and Penn Vet graduate programs—who follow each partner institution's application, deadline, eligibility, and benefit rules; most partners require no separate scholarship application, but some do.",
    tags: ["merit", "full-ride", "partner-colleges", "leadership", "graduate-students"],
  },
  "horatio-alger-state-scholarships": {
    deadline: "Separate junior and senior application windows run from December into February or March",
    deadlineMonth: null,
    who: "U.S. high school juniors and seniors who have faced significant financial and personal adversity and plan to pursue a bachelor's degree; one unified application considers students for applicable State and National awards, which remain distinct programs.",
  },
  "nmcrs-education-assistance": {
    deadline: "February 16–April 17, 2026",
    deadlineMonth: 4,
    who: "Eligible spouses and unmarried dependent children under age 23 of active-duty, retired, medically retired, or deceased Sailors and Marines; scholarships support undergraduate or master's study, while eligible active-duty enlisted commissioning-program participants may apply only for interest-free loans.",
    stages: ["college", "transfer"],
    tags: ["military", "navy", "marine-corps", "spouse", "need-based", "graduate-students"],
  },
  "nmfa-spouse-scholarship": {
    deadline: "October 1–September 30 scholarship year; applications are reviewed quarterly",
    deadlineMonth: null,
    who: "Military spouses with a valid Uniformed Services ID whose spouse served after September 11, 2001, including spouses of active-duty, Guard/Reserve, retired, wounded, or fallen members; funds may support degrees, licensure, certification, continuing education, clinical supervision, and eligible business expenses.",
    stages: ["college", "transfer"],
    tags: ["military", "spouse", "need-based", "quarterly", "career", "licensure", "certification"],
  },
  "fallen-patriots-scholarship": {
    amount: "Discretionary gap funding for tuition, fees, books, and living expenses after other aid; lifetime assistance is capped at $75,000 or $100,000 depending on federal-benefit eligibility",
    who: "Children whose U.S. military parent died from a service-connected, line-of-duty cause; assistance is coordinated with VA and other benefits, limited to five academic years, and must be used by age 34.",
    stages: ["high-school", "college", "transfer"],
  },
  "sowf-college-scholarship": {
    deadline: "Ongoing support for registered eligible families; no public application deadline",
    deadlineMonth: null,
    who: "Children of specified fallen U.S. Special Operations personnel, all Medal of Honor recipients, and active-duty Special Operations personnel who lose a spouse; the program works directly with registered eligible families.",
    stages: ["high-school", "college", "transfer"],
  },
  "fashion-scholarship-fund-case-study": {
    amount: "At least $10,000",
    deadline: "October 12, 2026 at 11:59 a.m. Eastern",
    deadlineMonth: 10,
    who: "Eligible full-time sophomores, juniors, and seniors at four-year U.S. colleges who complete the annual case study in design, merchandising, marketing, analytics, or supply chain; students at nonmember schools and F-1 students may compete under the current rules.",
  },
  "apf-brehm-undergraduate-psychology-scholarship": {
    deadline: "July 10, 2026",
    deadlineMonth: 7,
    who: "Declared undergraduate psychology majors with at least a 3.50 cumulative GPA and financial need who are enrolled for both Fall 2026 and Spring 2027.",
  },
  "prsa-foundation-geoffrey-curtis-scholarship": {
    deadline: "April 30, 2026",
    deadlineMonth: 4,
    who: "First-generation rising juniors or seniors majoring in public relations, journalism, or communications who have at least a 3.0 GPA and attend an accredited four-year institution full time.",
  },
  "apa-foundation-scholarship-in-planning": {
    deadline: "February 25–May 15, 2026",
    deadlineMonth: 5,
    who: "Undergraduate or graduate planning students at U.S. institutions who are U.S. citizens or permanent residents and hold free APA student membership; applicants need two recommendations and may not have previously received an APA Foundation-administered scholarship or fellowship.",
    tags: ["urban planning", "regional planning", "public policy", "graduate-students", "free-membership"],
  },
  "abfse-national-scholarship": {
    deadline: "March 1 and September 1",
    deadlineMonth: null,
    who: "Students—including F-1 and DACA students—who have completed at least one term in an ABFSE-accredited funeral service or mortuary science program; at least one term must remain after the award date to receive a full award.",
    stages: ["college", "transfer"],
    openToUndocumented: true,
    tags: ["funeral service", "mortuary science", "vocational", "daca", "international-students"],
  },
  "chick-fil-a-team-member-scholarship": {
    amount: "$1,000, $2,500, or $25,000",
    deadline: "2027 applications open in fall 2026; exact dates not yet posted",
    deadlineMonth: null,
    who: "Eligible Chick-fil-A restaurant Team Members in the United States, Canada, and Puerto Rico, with no minimum tenure or hours requirement; recipients may attend accredited two- or four-year, online, or vocational-technical institutions full- or part-time.",
    stages: ["high-school", "college", "transfer"],
  },
  "kfc-foundation-reach-scholarship": {
    deadline: "Next application window not yet posted",
    deadlineMonth: null,
    who: "Employees of participating KFC U.S. restaurants who meet the applicable 2.5 GPA requirement for $5,000 awards or 3.5 GPA requirement for $10,000 and $20,000 awards and remain employed when accepting the award; trade, college, and graduate study qualify.",
    stages: ["high-school", "college", "transfer"],
    tags: ["kfc", "fast-food", "reach", "employer", "graduate-students"],
  },
  "publix-carol-jenkins-barnett-scholarship": {
    amount: "$5,000 (two awards)",
    deadline: "December 1, 2026",
    deadlineMonth: 12,
    who: "Active Publix associates in good standing who have at least a 2.5 GPA and 150 community-service hours and will begin an accredited university, college, or technical degree or certificate program in fall 2027.",
    stages: ["high-school", "college", "transfer"],
  },
  "pizza-hut-foundation-scholarship": {
    deadline: "August 31, 2026 at 4:00 p.m. Central",
    deadlineMonth: 8,
    who: "Legal U.S. residents ages 17–26 with at least a 2.5 GPA who will pursue postsecondary education and complete a 14-week mentorship program; Pizza Hut employment is not required.",
    stages: ["high-school", "college", "transfer"],
    tags: ["pizza-hut-foundation", "postsecondary", "mentorship"],
  },
  "babe-ruth-league-college-scholarship": {
    deadline: "June 30",
    deadlineMonth: 6,
    who: "Former Cal Ripken Baseball, Babe Ruth Baseball, or Babe Ruth Softball league players applying for the national Babe Ruth League college scholarship; the separate Irby Luquette Southwest-region award uses the same form but is not this record.",
  },
  "pga-works-lundgren-scholars": {
    deadline: "February 6, 2026",
    deadlineMonth: 2,
    who: "Eligible high school seniors and undergraduates pursuing PGA Golf Management degrees at any of the 17 participating universities; all eligible applicants may apply, with intentional focus on historically underrepresented backgrounds, and financial need is not considered.",
  },
  "nff-national-scholar-athlete-award": {
    deadline: "School nomination only; no public deadline posted, with finalists selected in October",
    deadlineMonth: null,
    who: "College football seniors, graduated players, and eligible graduate transfers with at least a 3.2 undergraduate GPA who are selected as their school's sole nominee; the $18,000 award is for postgraduate study.",
    tags: ["football", "postgraduate", "leadership", "academics", "school-nomination", "graduate-transfer"],
  },
  "pr-beca-legislativa": {
    deadline: "July 15, 2026",
    deadlineMonth: 7,
    who: "Puerto Rico public high school seniors with a 4.00 GPA who are identified through public-school academic records and then complete the Senate platform; College Board or equivalent exam scores may be used for municipal ranking or tie-breaking.",
  },
  "cnmi-eap-base-grant": {
    amount: "Up to $3,300–$4,200 per year, depending on class standing and applicable base, priority-field, bachelor's, and GPA-incentive components",
    deadline: "May 1–July 1 annually; mid-year applications October 1–December 15",
    deadlineMonth: null,
    who: "U.S. citizens with three years of CNMI residency who meet voter-registration rules and enroll full time in eligible postsecondary study through the CNMI Scholarship Office.",
  },
  "texas-foster-tuition-waiver": {
    name: "Texas State College Tuition and Fee Waiver",
    deadline: "Obtain DFPS verification and enroll by the 27th birthday; no competitive deadline",
    deadlineMonth: null,
    who: "Eligible Texas foster and former foster youth, youth adopted from DFPS care, and certain youth leaving conservatorship who obtain DFPS verification and enroll at a Texas state-supported institution or in eligible dual-credit study.",
    stages: ["college", "transfer"],
    tags: ["foster-youth", "texas", "tuition-waiver", "state"],
  },
  "florida-foster-tuition-exemption": {
    name: "Florida Postsecondary Tuition and Fee Exemption",
    deadline: "Obtain an agency-issued exemption form; no competitive deadline",
    deadlineMonth: null,
    who: "Students who qualify through Florida's dependency, foster-care, adoption, or guardianship pathways and obtain an exemption form through DCF, a community-based care agency, or another qualifying agency; the benefit is usable through age 28.",
    stages: ["college", "transfer"],
    tags: ["foster-youth", "florida", "tuition-exemption", "state", "workforce-programs"],
  },
  "ioof-wirz-scholarship": {
    deadline: "May 15",
    deadlineMonth: 5,
    who: "Students who have completed at least one college or university grading period; Odd Fellows affiliation is not required, but the application must receive a Lodge endorsement.",
  },
  "bgca-youth-of-the-year-scholarships": {
    amount: "$2,500 state, $20,000 regional, and $50,000 national awards",
    deadline: "Candidates advance through local Clubs on varying timelines; no universal student deadline",
    deadlineMonth: null,
    who: "Boys & Girls Club teens ages 14–18 who are nominated locally and advance through state, regional or military, and national Youth of the Year selection; Panda Cares scholarships are separate programs.",
    tags: ["leadership", "boys-and-girls-clubs", "club-nomination", "community-service"],
  },
  "sar-knight-essay-contest": {
    amount: "National awards of $6,000, $3,000, $2,000, $500, and $500; chapter and state prizes vary",
    deadline: "Varies by local chapter or state",
    deadlineMonth: null,
    who: "U.S. citizens or legal residents in grades 9–12 at public, private, parochial, or home schools who enter through a participating SAR chapter or an approved state/contact-at-large route; SAR family membership is not required.",
    tags: ["essay", "history", "high-school", "citizens-or-legal-residents", "chapter-entry"],
  },
  "jci-senate-foundation-scholarship": {
    amount: "$1,000 for vocational or trade study; $1,500 or $2,000 for college or university study",
    deadline: "Next cycle begins September 2026; applications route through each student's state",
    deadlineMonth: null,
    who: "Graduating U.S. high school seniors entering college, university, or vocational or trade study who submit through their state's JCI Senate scholarship route.",
  },
  "helm-leadership-fellows-scholarship": {
    deadline: "March 15",
    deadlineMonth: 3,
    who: "Incoming college students from high school or community college who are active members of a Christian Church (Disciples of Christ) or United Church of Christ congregation and commit to the full four-year leadership program, annual retreats or cohort meetings, and a third-year global experience.",
    tags: ["faith", "leadership", "disciples-of-christ", "united-church-of-christ", "four-year-program"],
  },
  "aist-steel-intern-scholarship": {
    amount: "Standard awards of $4,500 or $7,500 and Premier awards of $7,200 or $12,000, with the tier determined by the applicant's country classification",
    deadline: "October 5, 2026",
    deadlineMonth: 10,
    who: "Eligible North American engineering, computer or data science, environmental science, and industrial-safety students, including seniors entering their first graduate-school year; payment requires an approved paid steel-industry internship, satisfactory performance, and at least a 2.5 GPA.",
    stages: ["college", "transfer"],
    tags: ["stem", "steel-industry", "paid-internship", "graduate-students", "engineering"],
  },
  "isc2-undergraduate-scholarship": {
    amount: "$5,000",
    deadline: "March 15, 2026; applications will reopen in 2027",
    deadlineMonth: 3,
    who: "Undergraduate cybersecurity or information-assurance students with at least a 2.5 GPA; applicants may be citizens of any country and study internationally or in the United States, online or on campus, through a shared associate-through-doctoral application.",
    stages: ["college", "transfer"],
    tags: ["stem", "cybersecurity", "global", "online-study"],
  },
  "awg-minority-scholarship": {
    name: "Geoscience IDEA Scholarship",
    amount: "Three $2,500 awards and one $500 Rising Potential award",
    deadline: "Official AWG sources conflict between May 30 and June 30; confirm on the official page",
    deadlineMonth: 6,
    who: "High school seniors entering and undergraduates attending eligible U.S. geoscience programs; applicants do not need paid AWG membership, and recipients receive a sponsored one-year membership.",
    tags: ["stem", "geoscience", "undergraduate", "sponsored-membership"],
  },
  "choose-aerospace-skillpointe-scholarship": {
    name: "Choose Aerospace SKILLED Nation Scholarship",
    deadline: "2027 application opens November 1, 2026",
    deadlineMonth: 11,
    who: "Students planning to attend or currently enrolled in aviation technical postsecondary programs; priority may be given to ATEC-member institutions, but FAA Part 147 enrollment is not universally required.",
    tags: ["trades", "aviation", "aviation-maintenance", "technical-programs"],
  },
  "nalp-foundation-scholarship": {
    amount: "$1,000–$5,000",
    deadline: "Applications reopen in fall 2026",
    deadlineMonth: null,
    who: "Undergraduate, certificate, and graduate students in eligible landscape, horticulture, and landscape-architecture programs in the United States and Canada; no paid NALP membership or event attendance is required.",
    stages: ["college", "transfer"],
    tags: ["trades", "landscape", "horticulture", "graduate-students", "canada"],
  },
  "alpha-sigma-lambda-scholarship": {
    deadline: "April 24, 2026 national deadline; campus deadlines are earlier",
    deadlineMonth: 4,
    who: "Adult undergraduate and post-baccalaureate students with at least a 3.5 GPA and master's students with at least a 3.8 GPA at institutions with active Alpha Sigma Lambda chapters; applications go through a chapter counselor, but individual membership is not required.",
    stages: ["college", "transfer"],
    tags: ["adult-learners", "graduate-students", "post-baccalaureate", "chapter-school"],
  },
  "chime-scholars-foundation": {
    amount: "Up to $5,000 per year, renewable to a $20,000 total maximum",
    deadline: "March 31, 2026",
    deadlineMonth: 3,
    who: "Pell-eligible students with at least $2,500 in unmet need and a 2.5 GPA pursuing an undergraduate, associate, trade, vocational, technical, or certificate pathway; applicants may be any age but may not already hold a bachelor's degree or pursue graduate study.",
    stages: ["college", "transfer"],
    tags: ["adult-learners", "parents", "low-income", "pell-eligible", "trade-school", "certificate"],
  },
  "point-foundation-access-scholarship": {
    amount: "$1,500 for one academic term",
    deadline: "March 12, 2026",
    deadlineMonth: 3,
    who: "First-generation or low-income LGBTQ+ undergraduate, graduate, and professional students enrolled at least half-time with at least a 2.0 GPA; this is distinct from Point's Flagship and Community College programs.",
    stages: ["college", "transfer"],
    tags: ["lgbtq", "first-generation", "low-income", "graduate-students", "professional-program"],
  },
  "pflag-new-orleans-scholarship": {
    deadline: "February 1, 2026; transcripts and recommendations due January 30",
    deadlineMonth: 2,
    who: "Self-identified LGBTQ+ Louisiana residents age 17 or older who are applying to or attending an accredited postsecondary institution.",
    stages: ["high-school", "college", "transfer"],
  },
  "incight-scholarship": {
    who: "Oregon, Washington, or California residents with a documented disability entering community college, university, vocational school, or graduate study who agree to complete 30 community-service hours or volunteer at one INCIGHT event; financial need is not a factor.",
    stages: ["high-school", "college", "transfer"],
    tags: ["disability", "community-service", "graduate-students"],
  },
  "nbcuniversal-tony-coelho-media-scholarship": {
    name: "Tony Coelho Media Scholarship",
    who: "High school seniors, undergraduate students, and graduate students with any disability who are pursuing media, communications, or entertainment careers; U.S. citizenship is not required.",
    stages: ["high-school", "college", "transfer"],
    tags: ["disability", "media", "communications", "entertainment", "graduate-students"],
  },
  "abbvie-cf-scholarship": {
    amount: "$3,000 for each of 40 scholars; two top recipients receive an additional $22,000 based on 70% judges' scores and 30% public voting",
    who: "Undergraduate, graduate, and vocational students living with cystic fibrosis.",
    stages: ["college", "transfer"],
    tags: ["disability", "cystic-fibrosis", "graduate-students", "vocational"],
  },
  "microsoft-disability-scholarship": {
    amount: "$5,000, renewable for up to three additional years or until a bachelor's degree is earned (up to $20,000 total; up to eleven awards)",
    deadline: "2026 cycle closed; current administrator no longer displays the exact deadline",
    deadlineMonth: null,
    who: "Current high school seniors with financial need pursuing an eligible major (engineering, computer science, computer information systems, law, or business); per the administering organization's current rules, a disability is not a stated requirement despite the program's name — confirm on the official page.",
  },
  "mpower-global-citizen-scholarship": {
    deadline: "December 31, 2026 at 11:59 p.m. Eastern",
    deadlineMonth: 12,
    who: "International students with a study-authorizing visa, DACA recipients, and permanent residents enrolled full time at MPOWER-supported U.S. or Canadian institutions; U.S. citizens studying in the U.S. and Canadian citizens studying in Canada are ineligible.",
    stages: ["college", "transfer"],
    openToUndocumented: true,
    tags: ["immigrants", "international-students", "daca", "permanent-residents", "canada", "graduate-students"],
  },
  "dst-oleta-lawanda-crain-scholarship": {
    deadline: "March 31, 2026",
    deadlineMonth: 3,
  },
  "momeni-foundation-scholarships": {
    deadline: "June 30",
    deadlineMonth: 6,
    who: "Students of Iranian descent applying through either the U.S. high-school Scholastic Achievement application or the worldwide Financial Assistance application, which includes full-time undergraduate, graduate, doctoral, medical, and other college study.",
    stages: ["high-school", "college", "transfer"],
    tags: ["heritage", "iranian", "international-students", "graduate-students", "doctoral-students", "medical-students"],
  },
  "dow-jones-news-fund": {
    who: "Undergraduate and graduate students who earn a paid pre-professional journalism internship through the data, business, digital-media, or editing tracks; the program includes training and a $1,500 tuition scholarship.",
    stages: ["college", "transfer"],
    tags: ["journalism", "graduate-students", "paid-internship"],
  },
  "nppf-student-scholarships": {
    who: "Undergraduate and graduate photojournalism students at U.S. colleges working in still photography, multimedia, or television news video.",
    stages: ["college", "transfer"],
    tags: ["journalism", "photojournalism", "graduate-students"],
  },
  "bea-scholarships": {
    who: "Junior, senior, graduate, and eligible two-year transfer students studying broadcasting or electronic media at Broadcast Education Association member institutions.",
    stages: ["college", "transfer"],
    tags: ["journalism", "broadcasting", "electronic-media", "graduate-students"],
  },
  "your-future-is-now-scholarship": {
    deadline: "May 8, 2026",
    deadlineMonth: 5,
  },
  "wings-over-america-scholarship": {
    amount: "$5,000",
    who: "Dependent children, grandchildren, and spouses of qualifying active-duty, retired, or deceased Navy aviation personnel pursuing eligible trade-school, community-college, or four-year study.",
    stages: ["high-school", "college", "transfer"],
  },
  "bri-myimpact-challenge": {
    amount: "$500–$10,000, including $500–$2,000 state-fair awards and $1,500–$10,000 national awards",
  },
  "elie-wiesel-prize-in-ethics": {
    amount: "$1,500–$12,500",
    deadline: "January 20, 2026",
    deadlineMonth: 1,
    who: "Full-time undergraduate juniors and seniors at accredited U.S. four-year colleges who submit an original essay on an ethical question; graduate and two-year students are not eligible.",
  },
  "ascp-foundation-ring-empowerment-scholarship": {
    who: "High school students, current students, field-changing students, and working professionals entering eligible accredited medical laboratory science, histotechnology, or cytotechnology programs; ASCP student membership is free.",
    stages: ["high-school", "college", "transfer"],
    tags: ["healthcare", "medical-laboratory-science", "histotechnology", "cytotechnology", "career-change", "free-membership"],
  },
  "aotf-lands-banks-memorial-scholarship": {
    who: "Occupational therapy assistant students who have completed at least one year of an accredited program and post-baccalaureate professional occupational-therapy students, with preference for underrepresented students in OT.",
    stages: ["college", "transfer"],
    tags: ["healthcare", "occupational-therapy", "post-baccalaureate"],
  },
  "arthritis-champion-scholarship": {
    amount: "$5,000; prior recipients may reapply, but renewal is not guaranteed",
    who: "Undergraduate, graduate, medical, master's, and doctoral students with a doctor-diagnosed form of arthritis or rheumatic disease who are involved with the Arthritis Foundation or related advocacy.",
    stages: ["college", "transfer"],
    tags: ["health-condition", "arthritis", "graduate-students", "medical-students", "doctoral-students"],
  },
  "rareis-scholarship-fund": {
    who: "Undergraduate and graduate students age 17 or older who are diagnosed with any rare disease, regardless of current treatment status.",
    stages: ["high-school", "college", "transfer"],
    tags: ["health-condition", "rare-disease", "graduate-students"],
  },
  "nccf-survivor-scholarship": {
    who: "Cancer survivors and current patients ages 18–35, plus limited 17-year-old college entrants, who are pursuing undergraduate or graduate higher education.",
    stages: ["high-school", "college", "transfer"],
    tags: ["health-condition", "cancer", "graduate-students"],
  },
  "nccf-legacy-scholarship": {
    who: "Students ages 18–35, plus limited 17-year-old college entrants, who lost a parent or guardian to cancer and are pursuing undergraduate or graduate higher education.",
    stages: ["high-school", "college", "transfer"],
    tags: ["health-condition", "cancer", "bereavement", "graduate-students"],
  },
  "lls-blood-cancer-survivors-scholarship": {
    name: "Blood Cancer United Scholarship for Blood Cancer Survivors",
    amount: "$7,500",
  },
  "asa-norman-beery-memorial-scholarship": {
    who: "First-generation undergraduate and graduate students in statistics, biostatistics, or statistics-heavy programs; undergraduates are preferred but graduate students are not excluded, and ASA membership is not required.",
    stages: ["college", "transfer"],
    tags: ["business", "first-gen", "statistics", "graduate-students"],
  },
  "spencer-educational-foundation-undergraduate-scholarship": {
    amount: "Most awards are $7,500, with limited $5,000 and $10,000 scholarships",
    who: "Undergraduates pursuing risk-management and insurance careers; an RMI major is preferred but not required, and the current official eligibility section does not publish a universal 3.3 GPA minimum.",
  },
  "aierf-college-scholarship": {
    who: "Undergraduate, graduate, and doctoral students majoring in or pursuing real estate, appraisal, or land economics, with awards paid directly to the school.",
    stages: ["college", "transfer"],
    tags: ["business", "real-estate", "appraisal", "graduate-students", "doctoral-students"],
  },
  "ncrf-a-to-z-scholarship": {
    deadline: "2026 cycle opened August 1; confirm the current closing date on the official page",
    deadlineMonth: null,
  },
  "asid-foundation-polsky-award": {
    who: "Undergraduate and graduate interior-design students who completed a research project related to wellness and design; ASID membership is not required.",
    stages: ["college", "transfer"],
    tags: ["arts", "interior-design", "graduate-students"],
  },
  "aaf-sean-finnegan-memorial-scholarship": {
    deadline: "March 11, 2026",
    deadlineMonth: 3,
  },
  "aaf-mosaic-scholarship": {
    deadline: "March 11, 2026",
    deadlineMonth: 3,
  },
  "home-depot-orange-scholars": {
    amount: "$2,500 in the United States and Canada; $1,000 in Mexico",
    deadline: "November 1, 2025–January 20, 2026",
    deadlineMonth: 1,
    who: "Children of eligible Home Depot associates in the United States, Canada, or Mexico who are high school seniors or current college freshmen through juniors entering full-time undergraduate or trade study.",
    stages: ["high-school", "college", "transfer"],
    tags: ["employer", "employee-dependent", "trade-school", "canada", "mexico"],
  },
  "dav-scholarships-for-student-volunteers": {
    deadline: "February 28, 2027",
    deadlineMonth: 2,
  },
  "coast-guard-foundation-scholarship": {
    amount: "$2,500 or $5,000 per year",
  },
  "navy-league-foundation-scholarship": {
    amount: "$1,000–$10,000",
    who: "High school seniors entering postsecondary study in the award-cycle fall who meet an applicable Navy League military-family or personal Naval Sea Cadet Corps eligibility route; Sea Cadet affiliation must belong to the applicant, not an ancestor.",
    stages: ["high-school"],
  },
  "iaff-mcclennan-scholarship": {
    who: "Children of firefighters killed in the line of duty; the current official page does not require the parent to have belonged to a union.",
  },
  "sc-life-scholarship": {
    who: "South Carolina residents attending eligible in-state colleges; at four-year institutions, class-of-2023-and-later graduates must meet two of three benchmarks—a 3.0 GPA, 22 ACT or 1100 SAT, or top-30% class rank—while two-year and technical-college entry uses the 3.0 GPA rule.",
  },
  "al-collegecounts-scholarship": {
    deadline: "December 1, 2026–February 28, 2027",
    deadlineMonth: 2,
    stages: ["high-school", "college"],
  },
  "wv-promise-scholarship": {
    amount: "The lesser of $5,500 per year or eligible tuition and mandatory fees",
    deadline: "March 1; the next cycle opens October 1, with a possible late spring-start route",
    deadlineMonth: 3,
    who: "West Virginia high school graduates meeting the GPA and ACT or SAT benchmarks who generally enter an eligible West Virginia public or independent institution as full-time first-year students; separate renewal rules apply.",
  },
  "naehcy-scholars-program": {
    amount: "$3,000",
    deadline: "July 31, 2026",
    deadlineMonth: 7,
    who: "Students under age 23 as of July 31, 2026 who experienced qualifying homelessness while in school within the prior six years and are pursuing postsecondary education.",
    stages: ["high-school", "college", "transfer"],
  },
  "pitzer-family-education-foundation": {
    deadline: "Year-round submissions; awards are ordinarily made annually and may be first-come when funds are available",
    deadlineMonth: null,
    who: "Full-time Pell-eligible students whose parent or guardian is currently incarcerated or paroled and who attend an in-person college, trade-school, or certification program; parolees themselves are not eligible through this scholarship.",
    stages: ["college", "transfer"],
  },
  "naacp-empowering-better-tomorrow": {
    deadline: "April 13–May 22, 2026",
    deadlineMonth: 5,
    who: "People who completed an incarceration sentence or were recently convicted but not yet sentenced and will attend a public four-year, two-year, or trade institution after first obtaining available federal, state, and other grants and loans.",
  },
  "venus-morris-griffin-scholarship": {
    deadline: "May 7, 2026",
    deadlineMonth: 5,
    who: "High school seniors whose biological parent is currently incarcerated; recipients must provide proof of acceptance and an institutional invoice, and the tuition-only award is paid directly to the school.",
  },
  "peyton-tuthill-hearts-of-hope-scholarship": {
    deadline: "January 1–June 1 annually",
    deadlineMonth: 6,
    who: "Students ages 17–25 who lost a parent or sibling to homicide and have completed at least one year of grief counseling or currently participate in a recognized counseling or support program while pursuing U.S. college or vocational study.",
    stages: ["high-school", "college", "transfer"],
  },
  "hep-camp-association-scholarship": {
    amount: "$1,000–$2,000",
    deadline: "Current intake is closed and unavailable; confirm the next cycle on the official page",
    deadlineMonth: null,
    who: "College students who earned a high school equivalency through a federally funded HEP program within the prior three years; HEP graduates who are enrolled in CAMP are not eligible.",
  },
  "florida-farmworker-student-scholarship": {
    deadline: "April 1 state application; FAFSA processing due May 15",
    deadlineMonth: 4,
    who: "Eligible Florida farmworkers or their children who enroll for at least 12 credits per term at a participating Florida public institution; no more than 50 students may receive awards.",
  },
  "amet-scholarship-program": {
    deadline: "March 15, 2026",
    deadlineMonth: 3,
    who: "Texas graduating seniors or early graduates with a current Migrant Education Program Certificate of Eligibility, plus continuing-college applicants who previously received an AMET scholarship.",
  },
  "larry-b-sanchez-memorial-scholarship": {
    deadline: "January 10, 2026",
    deadlineMonth: 1,
    who: "First-time applicants who—or whose parent, guardian, or spouse—worked in agriculture during the prior 12 months in Oregon or Klickitat or Yakima County, Washington; previous scholarship recipients are ineligible.",
  },
  "gabriel-gomez-sandoval-farmworker-memorial-scholarship": {
    deadline: "Next application opens in spring 2027; exact deadline not yet posted",
    deadlineMonth: null,
    who: "Farmworkers or their children when the worker was employed by a California farm labor contractor within the prior 12 months; larger awards support agriculture-related fields.",
  },
  "herren-project-go-purple-scholarship": {
    name: "Herren Project Student Scholarship",
    deadline: "April 24, 2026 at 5:00 p.m. Eastern",
    deadlineMonth: 4,
  },
  "jed-student-voice-of-mental-health-awards": {
    deadline: "February 20, 2026",
    deadlineMonth: 2,
    amount: "$3,000 plus a trip to New York City and ongoing JED collaboration opportunities",
  },
  "ron-howell-caregiver-scholarship": {
    deadline: "June 1 annually",
    deadlineMonth: 6,
    who: "High school seniors, undergraduates, and graduate students who are the primary unpaid caregiver for a family member with a chronic disability or medical condition requiring in-home care; medical and nursing students and paid caregivers are ineligible.",
    stages: ["high-school", "college", "transfer"],
    tags: ["caregivers", "graduate-students"],
  },
  "vertex-foundation-healthy-families-scholarship": {
    who: "High school seniors, undergraduates, and graduate students with cystic fibrosis, or their siblings, caregivers, children, or spouses; awards are not renewable, although recipients may reapply.",
    stages: ["high-school", "college", "transfer"],
    tags: ["caregivers", "health-condition", "cystic-fibrosis", "graduate-students"],
  },
  "gabriela-blanco-sibling-scholarship": {
    deadline: "January 15–March 31, 2027",
    deadlineMonth: 3,
    who: "High school seniors, undergraduates, and graduate students who lived in the same household as a sibling during the sibling's childhood-cancer diagnosis or treatment; the sibling may be a current patient, survivor, or deceased, and previous recipients are ineligible.",
    stages: ["high-school", "college", "transfer"],
    tags: ["caregivers", "cancer", "graduate-students"],
  },
  "agnes-mccarthy-family-caregiving-scholarship": {
    deadline: "April 15 annually",
    deadlineMonth: 4,
    who: "High school seniors who live with and help care for a parent, sibling, or grandparent with a qualifying mental-health condition; vocational, job-training, and online-learning paths are eligible.",
  },
  "ala-children-of-warriors-scholarship": {
    name: "Children of Warriors National Presidents' Scholarship",
    deadline: "March 1 annually at 11:59 p.m. Eastern; applications reopen each September",
    deadlineMonth: 3,
    who: "High school seniors who are direct descendants of a veteran from a Legion-eligible era, with 50 verified volunteer hours, service documentation, transcripts, two recommendations, and the current essay; the undergraduate-only award is nonrenewable and does not require Legion Family membership.",
  },
  "toyota-motor-north-america-scholarship": {
    name: "Toyota Scholarship Program",
    who: "Undergraduate and graduate students affiliated with a listed Toyota partner organization in one of fourteen eligible states, Washington, D.C., or Puerto Rico; applicants need a signed partner-verification form and proof of financial need.",
    stages: ["high-school", "college", "transfer"],
    tags: ["general", "graduate-students", "partner-organization"],
  },
  "natf-navigate-your-future-scholarship": {
    deadline: "Last Friday in June annually",
    deadlineMonth: 6,
    who: "Graduating seniors accepted to full-time undergraduate study who plan a career in general aviation; the award supports one year of study.",
  },
  "nd-alliance-neurodiversity-scholarship": {
    amount: "$2,500 for full-time four-year enrollment; $1,000 for community, technical, or part-time study",
    deadline: "January 15 annually at 11:59 p.m. Pacific; applications generally reopen November 1",
    deadlineMonth: 1,
    who: "Neurodivergent students ages 16–26 enrolled full- or part-time at a nonprofit U.S. college or certificate program; professional documentation of the learning challenge is required only at disbursement.",
  },
  "agc-workforce-development-scholarship": {
    deadline: "June 1, 2026; next cycle opens March 1, 2027",
    deadlineMonth: 6,
    who: "U.S. citizens and documented permanent residents studying full- or part-time in an approved construction-related associate, certificate, technical, or registered-apprenticeship program, including programs under the named accreditation systems or approved by the foundation.",
  },
  "aci-foundation-scholarship": {
    name: "ACI Foundation Fellowships and Scholarships",
    amount: "$5,000 scholarships and $10,000 fellowships",
    deadline: "November 1, 2026",
    deadlineMonth: 11,
    who: "Full-time undergraduate and graduate students in concrete-related degree programs; one endorsement must come from an ACI member, but applicants do not need to join ACI.",
    stages: ["college", "transfer"],
    tags: ["stem", "trades", "graduate-students"],
  },
  "zonta-young-women-in-leadership-award": {
    amount: "$5,000 international award",
    who: "High school or college students ages 16–19 on April 1 who demonstrate leadership and volunteer service; local deadlines vary, and applicants without a nearby club may apply through a district or e-club.",
    stages: ["high-school", "college"],
  },
  "critical-language-scholarship": {
    deadline: "Applications reopen in fall 2026; exact 2027 deadline not yet published",
    deadlineMonth: null,
    who: "U.S. citizens or nationals age 18 or older who are enrolled in a U.S. degree-granting undergraduate, graduate, or professional program; undergraduates must complete one full college year before the summer program.",
    stages: ["college", "transfer"],
    tags: ["study-abroad", "graduate-students", "professional-students"],
  },
  "nsli-y-scholarship": {
    deadline: "2026–27 abroad deadline was November 12, 2025; Fall 2026 Virtual NSLI-Y deadline was June 8, 2026",
    deadlineMonth: null,
    who: "Eligible U.S. high school students seeking summer, academic-year, or virtual critical-language study; major program costs are covered, but passports, required medical exams or immunizations, excess baggage, and ordinary pocket money are not.",
  },
  "breakthrough-junior-challenge": {
    deadline: "September 15, 2026; peer reviews due September 30, 2026",
    deadlineMonth: 9,
    who: "Eligible entrants ages 13–18 who submit an original two-minute video explaining a science or mathematics concept and complete the required peer reviews; eligibility is age-based rather than limited to formal high-school enrollment.",
  },
  "wisconsin-academic-excellence-scholarship": {
    deadline: "School nominations ran February 18–March 13, 2026",
    deadlineMonth: 3,
    who: "Wisconsin seniors nominated as the highest-GPA students in their high school who enroll full-time at a participating Wisconsin institution by September 30; support is limited to eight semesters, or up to four years.",
  },
  "south-dakota-build-dakota-scholarship": {
    deadline: "January 1–March 31, 2027",
    deadlineMonth: 3,
    who: "Students entering high-need workforce programs at South Dakota technical colleges; recipients must work full-time in their field in South Dakota for at least three years after completion and submit a separate application for each technical college.",
  },
  "oklahoma-tuition-aid-grant": {
    amount: "$760–$3,000 per year, varying by institution and enrollment level",
    deadline: "No single deadline; file the FAFSA early because institutional allocations are limited",
    deadlineMonth: null,
    who: "Oklahoma residents with financial need at eligible colleges and career-technology centers, including less-than-half-time students; awards vary by institution and enrollment level and may not exceed 75% of tuition and fees.",
  },
  "south-carolina-palmetto-fellows-scholarship": {
    deadline: "May 1 or July 15, depending on the nomination route",
    deadlineMonth: 7,
    who: "South Carolina seniors entering eligible two- or four-year in-state institutions; class-of-2027 ranked-school criteria use a 1200 SAT or 25 ACT, alternative criteria use a 1400 SAT or 31 ACT, and later-year enhancements cover approved mathematics, science, education, and accounting pathways.",
  },
  "fred-scheigert-scholarship": {
    deadline: "January 1–February 15 annually",
    deadlineMonth: 2,
    who: "Full-time undergraduate, graduate, trade, or vocational students with low vision who maintain at least a 3.2 GPA; finalists complete a phone interview and awardees participate in the ACB convention under the reimbursement policy.",
    stages: ["college", "transfer"],
    tags: ["disability", "graduate-students", "trade-school"],
  },
  "afb-scholars-program": {
    deadline: "January 6–February 17, 2026",
    deadlineMonth: 2,
    who: "Blind and low-vision students in eligible community-college, four-year, graduate, and other postsecondary pathways; recipients complete mentorship, conference participation, and annual narrative requirements.",
    stages: ["high-school", "college", "transfer"],
    tags: ["disability", "graduate-students"],
  },
  "cochlear-scholarships": {
    deadline: "September 30, 2026 at 11:59 p.m. Mountain",
    deadlineMonth: 9,
    who: "Students who have graduated high school and are accepted to or enrolled in an accredited bachelor's or graduate program, subject to the specific Cochlear Nucleus, Baha, or Osia device requirement and a 3.0 GPA.",
    stages: ["high-school", "college", "transfer"],
    tags: ["disability", "graduate-students"],
  },
  "optimist-ccdhh-scholarship": {
    deadline: "Local student deadlines vary; district submissions were due June 15, 2026",
    deadlineMonth: null,
    who: "Deaf and hard-of-hearing students through grade 12 who enter through a participating local Optimist Club and compete by speech or sign language; applicants need a qualifying recent audiogram or cochlear-implant programming report.",
  },
  "aer-ferrell-scholarship": {
    amount: "Two $1,000 awards annually",
    deadline: "May 1, 2026",
    deadlineMonth: 5,
    who: "U.S. and international students preparing for qualifying careers in rehabilitation, education, or related services for blind and low-vision people.",
  },
  "help-america-hear-scholarship": {
    deadline: "Current page still labels the 2025–26 cycle open but publishes no current deadline; confirm directly",
    deadlineMonth: null,
    who: "High school seniors with hearing loss; the current official eligibility language does not require applicants to already use hearing aids or a cochlear implant, and official pages conflict on the number of recipients.",
  },
  "american-indian-services-scholarship": {
    deadline: "May 1–July 1 for fall; September 1–November 1 for winter and spring",
    deadlineMonth: null,
    who: "Applicants pursuing a first bachelor's degree who meet the program's tribal-heritage rules, enroll for at least six credits, complete the FAFSA, and maintain at least a 2.25 cumulative GPA after the first college term; graduate study is ineligible.",
  },
  "truman-d-picard-scholarship": {
    amount: "$2,000, $3,000, or $4,000 depending on field and study level",
    deadline: "March 20, 2026 at 5:00 p.m. Pacific",
    deadlineMonth: 3,
    who: "Native high school seniors, undergraduate students, and graduate students pursuing qualifying natural-resources, forestry, or fire-management fields.",
    stages: ["high-school", "college", "transfer"],
    tags: ["native", "graduate-students"],
  },
  "unity-cook-scholarships": {
    amount: "Two Golda Cook awards and one J.R. Cook award, each $2,000",
    deadline: "May 1, 2026 at 5:00 p.m. Phoenix/MST",
    deadlineMonth: 5,
    who: "Full-time undergraduate and graduate students who are enrolled members or descendants of a recognized tribe and active in their community; recipients may provide an acceptance video instead of attending the conference.",
    stages: ["college", "transfer"],
    tags: ["native", "graduate-students"],
  },
  "student-veterans-of-america-scholarships": {
    amount: "$10,000 for each current portfolio scholarship",
    deadline: "March 31–May 1, 2026",
    deadlineMonth: 5,
    who: "Eligible undergraduate and graduate student veterans applying to the current corporate-partner scholarship portfolio; participation in an SVA chapter is not required by the current programs.",
    stages: ["college", "transfer"],
    tags: ["veterans", "graduate-students"],
  },
  "afcea-war-veterans-scholarship": {
    deadline: "May 1, 2026 supporting-material deadline",
    deadlineMonth: 5,
    who: "Qualifying U.S.-citizen active-duty uniformed-service members, veterans, Reservists, and National Guard personnel with at least a 3.0 GPA who attend a four-year U.S. institution and pursue an AFCEA-aligned C4I STEM major.",
  },
  "ala-non-traditional-student-scholarship": {
    deadline: "March 1 annually at 11:59 p.m. Eastern",
    deadlineMonth: 3,
    who: "Qualifying veterans and military spouses returning to school or starting later in life may apply without membership; eligible paid Legion Family members also have a route. Part-time undergraduate, graduate, and doctoral students are eligible.",
    stages: ["college", "transfer"],
    tags: ["veterans", "military-spouse", "graduate-students", "doctoral-students"],
  },
  "pva-educational-scholarship-program": {
    deadline: "2026 cycle is closed; the current page does not publish a recurring May deadline",
    deadlineMonth: null,
    who: "Eligible PVA members, their spouses, and their unmarried dependent children under age 24 enrolled at an accredited U.S. institution; PVA membership is free for eligible veterans.",
  },
  "finlandia-foundation-national-scholarship": {
    deadline: "February 1, 2026 at 11:59 p.m. Pacific",
    deadlineMonth: 2,
    who: "Full-time undergraduate and graduate students who are U.S. or Finnish citizens and meet the academic requirements; Finnish heritage is not required, although Finnish-culture study may receive special consideration.",
    stages: ["college", "transfer"],
    tags: ["heritage", "graduate-students"],
  },
  "tennessee-hope-scholarship": {
    amount: "Up to $3,200 at two-year institutions, $4,500 for four-year freshmen and sophomores, and $5,700 for juniors and seniors",
    deadline: "FAFSA term deadlines: September 1, March 1, and May 1",
    deadlineMonth: null,
    who: "Tennessee graduates who meet a 3.0 high-school GPA, 21 ACT, or 1060 SAT route and enroll at an eligible Tennessee institution within the program's entry window.",
  },
  "missouri-bright-flight": {
    deadline: "No application; qualifying score must be earned by the June test date immediately after graduation",
    deadlineMonth: 6,
    who: "Missouri-resident U.S. citizens or permanent residents who earn a qualifying ACT or SAT score and enroll full-time at a participating Missouri institution; estimated 2026 awards are $1,000 or $3,000 depending on score tier and legislative funding.",
  },
  "montana-stem-healthcare-scholarship": {
    name: "Montana STEM/Healthcare Scholarship",
    amount: "$1,000 first year, $1,500 second and third years, and $2,000 fourth year",
    deadline: "December 1, 2026–March 15, 2027",
    deadlineMonth: 3,
    who: "Montana seniors with a 3.25 high-school GPA, four years of college-prep math, and three years of college-prep science who enter an eligible Montana STEM or healthcare program full-time in the fall immediately after graduation.",
  },
  "north-dakota-scholarship": {
    deadline: "January 5–June 5, 2026",
    deadlineMonth: 6,
    who: "Beginning with 2025 graduates, North Dakota students must demonstrate essential skills plus two Choice Ready components—Post-Secondary Ready, Workforce Ready, or Military Ready; awards cover up to eight terms and may support registered apprenticeships.",
  },
  "alaska-education-grant": {
    deadline: "FAFSA priority deadline is June 30 annually",
    deadlineMonth: 6,
    who: "U.S. citizens or permanent residents who lived in Alaska for at least 365 days before filing, hold a diploma or GED, and enroll at least half-time in an eligible Alaska program; highest need and early FAFSA filing are prioritized until funds run out.",
  },
  "delaware-scholarship-incentive-program": {
    deadline: "December 1, 2025–May 15, 2026 at 4:30 p.m.",
    deadlineMonth: 5,
    who: "Delaware undergraduate students with financial need (FAFSA required) attending in-state or an approved out-of-state program unavailable at Delaware public institutions, and graduate students in an out-of-state program unavailable at the University of Delaware or Delaware State; certificate, diploma, non-degree, continuing-education, independent-study, and individualized-major programs are excluded.",
    stages: ["college", "transfer"],
    tags: ["state-program", "graduate-students"],
  },
  "south-carolina-hope-scholarship": {
    amount: "$2,500 plus a $300 book allowance for the freshman year only",
    deadline: "No separate application; the eligible institution determines the award",
    deadlineMonth: null,
    who: "South Carolina residents who are U.S. citizens or eligible noncitizens, earn a 3.0 high-school GPA, and enter an eligible institution without qualifying for LIFE or Palmetto Fellows; support is limited to two freshman-year semesters.",
  },
  "stephen-phillips-memorial-scholarship-fund": {
    amount: "$3,000–$17,000 per year, renewable",
    deadline: "April 2, 2026 at noon for early response; May 1, 2026 at noon for regular applications",
    deadlineMonth: 5,
    who: "New England residents seeking a first bachelor's degree at a four-year U.S. college who generally have at least a 3.0 GPA, a Student Aid Index of 13,000 or less, and strong service and work histories; published lawful-presence or U.S.-tax-filing routes cover qualifying noncitizens.",
  },
  "southwest-airlines-community-scholarship": {
    deadline: "January 12–February 17, 2026",
    deadlineMonth: 2,
    who: "Applicants age 24 or younger with at least a 3.5 unweighted GPA who pursue a first postsecondary credential full-time and demonstrate airline-career interest and service; Southwest employees, their dependents, and company officers are excluded.",
  },
  "synchrony-scholarship-autistic-students-of-color": {
    deadline: "April 20, 2026 at 11:59 p.m. Eastern",
    deadlineMonth: 4,
    who: "Students from OAR's listed racial and ethnic groups with an established autism diagnosis who will attend an eligible postsecondary program in both fall 2026 and spring 2027; applicants may submit to only one OAR scholarship program.",
  },
  "pepsico-foundation-nextstep-scholarship": {
    amount: "Up to $12,500, renewable for one additional year",
    deadline: "Current page does not publish an exact deadline; do not infer March from prior cycles",
    deadlineMonth: null,
    who: "Community-college students at named partner campuses in California, Colorado, Florida, Illinois, New York, or Texas who had 45 credits by January 2026, at least a 2.75 GPA, a fall 2026 transfer plan, projected spring 2028 bachelor's completion, an eligible major, and indefinite U.S. work authorization.",
  },
  "new-york-life-golden-futures-scholarship": {
    deadline: "February 9–May 31, 2026",
    deadlineMonth: 5,
    who: "Legally resident U.S. high school juniors and seniors who complete the free financial-literacy modules: 25 modules qualifies for $10,000 consideration, while 50 qualifies for either a $10,000 or $20,000 award; seniors plan full-time undergraduate or vocational study and junior awards are deferred.",
  },
  "firehouse-subs-public-safety-scholarship": {
    name: "Firehouse Subs Public Safety Foundation Scholarship Program",
    deadline: "April 15, 2026 at 3:00 p.m. Central or the first 500 applications",
    deadlineMonth: 4,
    who: "Students with financial need entering firefighter, law-enforcement, paramedic, or EMT programs; community applicants need no employer affiliation, while Firehouse Subs employees must meet a six-month employment rule.",
  },
  "ahla-american-express-scholarship": {
    amount: "$2,000 full-time or $1,000 part-time for bachelor's study; $1,000 full-time or $500 part-time for associate study",
    deadline: "March 23, 2026",
    deadlineMonth: 3,
    who: "Applicants who either work at least 20 hours weekly at an AHLA member hotel and have at least 12 months of hotel experience, or are a qualified employee's dependent with their own prior hospitality-industry employment.",
  },
  "isna-musa-dakri-scholarship": {
    who: "U.S.-citizen or permanent-resident students entering college as freshmen in fall 2026 who hold an admission letter, will be enrolled at disbursement, demonstrate need, and are active in Muslim community-development work.",
    stages: ["high-school"],
  },
  "isna-amana-mutual-funds-scholarship": {
    amount: "$2,000",
    who: "U.S.-citizen or permanent-resident students entering college as freshmen who hold an admission letter, will be enrolled at disbursement, meet ISNA's need criteria, and are active in Muslim community-development work; current public rules do not impose a specific major or 3.5 GPA.",
    stages: ["high-school"],
  },
  "elca-rossing-physics-scholarship": {
    deadline: "Current deadline is to be determined",
    deadlineMonth: null,
    who: "Current college sophomores and juniors majoring in physics at an ELCA-related institution who completed at least one physics course there.",
  },
  "cma-education-foundation-maritime-scholarship": {
    deadline: "Current portfolio deadlines include February 10 and March 22, depending on the award",
    deadlineMonth: null,
    who: "High school, undergraduate, and graduate students—and some working maritime professionals—using the applicable portfolio route at a U.S. maritime academy, college or university with a maritime program, or qualifying U.S. high-school program; current awards include a $20,000 Jim Lawrence award and $2,500 SUNY Maritime Castrol award.",
    stages: ["high-school", "college", "transfer"],
    tags: ["trades", "maritime", "graduate-students"],
  },
  "arema-educational-foundation-scholarship": {
    amount: "$1,000, $2,500, or $5,000 in the latest official history; final amounts may change",
    deadline: "December 12, 2025 for the 2026 awards",
    deadlineMonth: 12,
    who: "Undergraduate and graduate students pursuing railway-related engineering and transportation fields; applicants need complimentary AREMA student membership.",
    stages: ["college", "transfer"],
    tags: ["stem", "rail", "graduate-students"],
  },
  "league-of-railway-women-scholarships": {
    deadline: "June 26, 2026",
    deadlineMonth: 6,
    who: "Undergraduate and graduate applicants using one of three routes: Future of Railroading accepts any gender and field, Connie Sumara is for women with at least 12 months of rail employment, and Sue Black requires financial need.",
    stages: ["college", "transfer"],
    tags: ["women", "rail", "graduate-students"],
  },
  "nrc-scholarship-program": {
    amount: "$5,000–$15,000",
    deadline: "August 14, 2026",
    deadlineMonth: 8,
    who: "Full-time employees of NRC member companies and their children or grandchildren who pursue eligible college or trade-school study.",
  },
  "aptf-scholarship-program": {
    deadline: "March 6–June 5, 2026",
    deadlineMonth: 6,
    who: "Undergraduate and advanced-degree students preparing for public-transportation careers; only returning applicants need sponsorship from an APTA member organization.",
    stages: ["college", "transfer"],
    tags: ["trades", "public-transportation", "graduate-students"],
  },
  "comto-national-scholarship-program": {
    deadline: "March 31, 2026",
    deadlineMonth: 3,
    who: "Undergraduate and graduate students pursuing transportation careers through COMTO's national portfolio, which is separate from local chapter scholarships.",
    stages: ["college", "transfer"],
    tags: ["heritage", "transportation", "graduate-students"],
  },
  "wts-foundation-scholarships": {
    amount: "$2,500–$10,000, depending on scholarship level",
    deadline: "Apply through a WTS chapter; student deadlines and additional requirements vary by chapter",
    deadlineMonth: null,
    who: "Applicants pursuing transportation-related study at high-school, trade, community-college, undergraduate, graduate, or doctoral levels; membership is not required and students apply through a WTS chapter first.",
    stages: ["high-school", "college", "transfer"],
    tags: ["women", "transportation", "trade-school", "graduate-students", "doctoral-students"],
  },
  "university-of-the-aftermarket-foundation-scholarship": {
    amount: "$1,000–$5,000 for UAF and donor awards",
    deadline: "September 16, 2026–March 31, 2027",
    deadlineMonth: 3,
    who: "Graduating high-school seniors and postsecondary students entering eligible automotive, collision, and diesel programs; the common application considers students for UAF's own awards and may separately match them to partner awards.",
    stages: ["high-school", "college", "transfer"],
  },
  "izaak-walton-league-national-conservation-scholarship": {
    amount: "Two category-specific national awards of up to $2,500",
    deadline: "January 1–May 15 annually",
    deadlineMonth: 5,
    who: "Rising college juniors and seniors in conservation-related fields who either previously received an IWLA chapter or division scholarship or qualify as a current member or member's child or grandchild; the national award includes a one-year student membership.",
  },
  "gca-awards-for-summer-environmental-studies": {
    deadline: "February 5 annually",
    deadlineMonth: 2,
    who: "Undergraduates funding summer environmental-studies programs; applicants may submit only one GCA scholarship application per year and can be considered for several related awards through the common form.",
  },
  "asla-council-of-fellows-scholarship": {
    amount: "$5,000",
    deadline: "February 1 annually",
    deadlineMonth: 2,
    who: "Upper-year undergraduates in LAAB-accredited professional landscape-architecture programs, with priority for financial need or underrepresented groups; MLA and other graduate students are ineligible, and the official page conflicts on the award count.",
  },
  "owaa-bodie-mcdowell-scholarship": {
    deadline: "January 1–March 30 annually",
    deadlineMonth: 3,
    who: "Undergraduate and graduate students preparing for outdoor-communications careers in writing, photography, film, or related media.",
    stages: ["college", "transfer"],
    tags: ["environment", "arts", "graduate-students"],
  },
  "distinguished-young-women": {
    amount: "Individual cash awards vary by local, state, and national program; more than $2.1 million is awarded annually",
    deadline: "Deadlines vary by local and state program; the 2026 national finals are complete",
    deadlineMonth: null,
  },
  "abwa-sbmef-national-scholarship": {
    deadline: "May 15, 2026; only the first 30 completed applicants per national scholarship advanced to review",
    deadlineMonth: 5,
    who: "Undergraduate and graduate women applying through the Stephen Bufton Memorial Education Fund; ABWA membership is not required.",
    stages: ["college", "transfer"],
    tags: ["women", "graduate-students"],
  },
  "ams-freshman-undergraduate-scholarship": {
    name: "AMS First-Year Undergraduate Scholarship",
    deadline: "February 6, 2026",
    deadlineMonth: 2,
    who: "High school seniors entering college to study qualifying atmospheric, oceanic, or hydrologic sciences; marine biology is excluded, and the second $2,500 payment requires successful first-year completion.",
  },
  "aag-darrel-hess-community-college-geography-scholarship": {
    deadline: "November 15, 2026 at midnight Eastern",
    deadlineMonth: 11,
    who: "Community-college geography students planning to transfer as geography majors to a four-year university; the official page conflicts on the number of awards.",
  },
  "actfl-future-teacher-scholarship-program": {
    amount: "$1,500 annually for eligible undergraduates; $500 annually for two years for graduate students",
    deadline: "Next application period opens in March; closing date not yet published",
    deadlineMonth: null,
    who: "High school seniors, undergraduates, and graduate students committed to becoming K–12 world-language teachers, with membership and mentoring included.",
    stages: ["high-school", "college", "transfer"],
    tags: ["education", "graduate-students"],
  },
  "jw-pepper-music-education-scholarship": {
    amount: "Three $10,000 awards",
    deadline: "February 3, 2026",
    deadlineMonth: 2,
    who: "High school seniors entering college as music-education majors; the former one-award-per-state structure is not the current program.",
  },
  "aslta-nathie-marbury-scholarship": {
    amount: "Two $1,000 awards",
    deadline: "High-school and college application windows are separate; confirm the current route on the official page",
    deadlineMonth: null,
    who: "High school and college students in ASL, Deaf Studies, Deaf Education, or interpreting who participate through an active ASL Honor Society campus chapter; no applicant-paid membership charge was identified.",
  },
  "dga-student-spotlight-awards": {
    deadline: "November 1, 2025–April 1, 2026",
    deadlineMonth: 4,
    who: "Undergraduate, graduate, and eligible recent-graduate film directors from marginalized communities who completed a qualifying short film at a U.S. college or technical school.",
    stages: ["college", "transfer"],
    tags: ["arts", "graduate-students", "recent-graduates"],
  },
  "natas-national-scholarships": {
    amount: "Three named national scholarships of $10,000 each",
    deadline: "March 2, 2026; the official page's “Now Open” heading is stale",
    deadlineMonth: 3,
  },
  "cbc-spouses-visual-arts-scholarship": {
    deadline: "January 5–March 27, 2026",
    deadlineMonth: 3,
    who: "Black high school seniors, undergraduates, graduate students, and doctoral students pursuing qualifying visual-arts careers, including painting, photography, graphic design, and fashion.",
    stages: ["high-school", "college", "transfer"],
    tags: ["arts", "heritage", "graduate-students", "doctoral-students"],
  },
  "ruth-lilly-poetry-fellowships": {
    amount: "Five fellowships of $27,000 each",
    deadline: "January 15–March 2, 2026 at 5:00 p.m. Central",
    deadlineMonth: 3,
    who: "Poets ages 21–31 who are U.S. citizens or current U.S. residents; college enrollment is not required and there is no application fee.",
  },
  "naacp-ldf-herbert-lehman-scholarship": {
    amount: "Generally $3,000 per year for up to four undergraduate years, or $15,000 per year for up to three law-school years",
    deadline: "April 1, 2026 for undergraduates; May 1, 2026 for law students",
    deadlineMonth: 5,
    who: "U.S. citizens pursuing full-time four-year undergraduate or accredited full-time law study who meet the program's need and holistic-selection criteria; the current official rules do not state a race restriction.",
    stages: ["college", "transfer"],
    tags: ["need-based", "law-school", "graduate-students"],
  },
  "hacu-coca-cola-first-generation-scholarship": {
    amount: "Seventeen $5,000 awards in the 2026 cycle",
    deadline: "May 15, 2026",
    deadlineMonth: 5,
  },
  "kao-kalia-yang-scholarship": {
    deadline: "April 20, 2026",
    deadlineMonth: 4,
    who: "Low-income Hmong American high school seniors nationwide who are U.S. citizens or permanent residents.",
  },
  "chia-family-foundation-scholarship": {
    amount: "$5,000–$15,000 per year",
    who: "Chinese American undergraduates, including eligible DACA recipients, who completed at least one year at one of the program's listed top-fifty private nonprofit liberal-arts colleges.",
  },
  "whataburger-feeding-student-success-scholarship": {
    amount: "$5,000 each; $600,000 awarded in the 2026 cycle",
    deadline: "January 1–February 13, 2026",
    deadlineMonth: 2,
  },
  "costco-employee-scholarship": {
    deadline: "December 1, 2025–February 6, 2026 at 11:59 p.m. Pacific",
    deadlineMonth: 2,
    who: "Permanent full-time, part-time, and limited-part-time Costco employees residing in the United States or Puerto Rico who pursue a first degree at a nonprofit school; awards are up to $2,500 annually and $10,000 total.",
  },
  "cox-jim-kennedy-scholarship-fund": {
    amount: "$10,000 per year, renewable for up to four years",
    deadline: "2026 recipients have been announced; confirm the next cycle on the official page",
    deadlineMonth: null,
  },
  "discount-tire-bruce-t-halle-scholarship": {
    amount: "$5,000 per year at four-year universities; $2,000 per year at two-year community colleges or vocational schools",
    deadline: "March 15 for new applicants; April 15 for renewals",
    deadlineMonth: 3,
    who: "Dependents ages 17–24 of qualifying full-time Discount Tire employees who are U.S. citizens, enroll full-time for at least 12 credits, and attend an eligible four-year, two-year, or vocational school.",
  },
  "fred-lena-meijer-scholarship": {
    amount: "$5,000 or $10,000; part-time employee-student awards may be adjusted",
    deadline: "December 1, 2025–March 1, 2026",
    deadlineMonth: 3,
    who: "Eligible current or former Meijer team members and qualifying dependents pursuing undergraduate college, university, vocational, technical, or specialized training; part-time employee-students may qualify, FAFSA and financial need apply, and graduate programs are excluded.",
  },
  "elks-emergency-educational-grants": {
    deadline: "Request materials by May 1; completed applications must be received by December 31, 2026",
    deadlineMonth: 12,
    who: "Unmarried students under age 24 with financial need who are children of deceased or totally disabled Elks members and enroll full-time in undergraduate study for at least 12 semester hours.",
    stages: ["college", "transfer"],
  },
  "national-space-club-keynote-scholarship": {
    amount: "$50,000",
    deadline: "October 30, 2026",
    deadlineMonth: 10,
    who: "A student pursuing a STEM career who can complete the January finalist audition and deliver the keynote address at the March 2027 Goddard Memorial Dinner if selected.",
  },
  "national-exchange-club-youth-of-the-year": {
    deadline: "Local and district deadlines vary; students must qualify through those levels before the national round",
    deadlineMonth: null,
    who: "Students nominated and advanced by local and district Exchange Clubs for academic and leadership excellence or through the A.C.E. adversity track; students cannot directly enter the national round.",
  },
  "mississippi-eminent-scholars-grant": {
    deadline: "September 15 application deadline; supporting documents due October 15",
    deadlineMonth: 9,
    who: "Mississippi residents who meet the 3.5 GPA and ACT, accepted-superscore, or National Merit route and enter an eligible certificate, associate, or bachelor's program; a limited 12–18-credit current-college entry route also exists.",
  },
  "arkansas-governors-distinguished-scholarship": {
    amount: "Up to $10,000 per year for tuition, mandatory fees, room, and board",
    who: "Graduating Arkansas seniors who meet the current 32 ACT or 1410 SAT and 3.5 GPA route or National Merit route, complete the FAFSA, and follow the credit-load and annual-renewal rules; up to two unused semesters may support an immediately following graduate program.",
  },
  "texas-armed-services-scholarship-program": {
    deadline: "Governor applications closed June 30; 2026–27 legislative appointments are due September 30",
    deadlineMonth: 9,
    who: "Texas undergraduate and graduate students nominated through an eligible appointment route who commit to ROTC, the Texas Guard, or qualifying maritime service under the program rules.",
    stages: ["high-school", "college", "transfer"],
    tags: ["state-program", "military", "graduate-students"],
  },
  "oklahoma-rising-scholars-award": {
    amount: "$12,500–$24,000 for 2026 automatic awards by institution type, plus a public-school tuition waiver; institutional nominees receive lower annual amounts",
    deadline: "No current August deadline is published",
    deadlineMonth: null,
    who: "Oklahoma Academic Scholars qualifying through automatic or institutional-nominee routes; award structure varies by institution, and graduate or professional use may be available.",
    stages: ["high-school", "college", "transfer"],
    tags: ["state-program", "graduate-students", "professional-students"],
  },
  "louisiana-tops-tech-award": {
    amount: "Institution-specific award based on 2016–17 tuition levels unless changed by legislation",
    deadline: "February 1 priority deadline; final deadline is July 1 after the first anniversary of graduation",
    deadlineMonth: 2,
  },
  "kansas-education-opportunity-scholarship": {
    amount: "Up to $925 per semester and $1,850 per year, subject to appropriated funds",
    deadline: "May 1",
    deadlineMonth: 5,
    who: "Kansas students pursuing a first undergraduate degree full-time who meet FAFSA need and the first-generation or qualifying teacher or paraprofessional-dependent route.",
  },
  "kansas-state-scholarship": {
    deadline: "July 1 for 2026–27",
    deadlineMonth: 7,
    who: "Kansas seniors designated from roughly the top half of Kansas Scholars Curriculum completers who demonstrate financial need; recipients reapply annually, enroll full-time, and maintain a 3.0 college GPA.",
  },
  "disabledperson-national-scholarship": {
    deadline: "Latest cycle closed March 31, 2026; no next dated competition is posted",
    deadlineMonth: null,
    who: "U.S.-citizen undergraduate and graduate students with disabilities at accredited U.S. two- or four-year institutions; proof through Disability Student Services is required, and disability-caused part-time enrollment is allowed at six or more credits.",
    stages: ["college", "transfer"],
    tags: ["disability", "graduate-students"],
  },
  "latin-grammy-cultural-foundation-scholarships": {
    amount: "$7,500–$275,000 across the current portfolio",
    deadline: "2026 applications are closed; the redesigned official page does not publish the next deadline",
    deadlineMonth: null,
  },
  "van-hipp-heroes-scholarship-fund": {
    deadline: "July 1",
    deadlineMonth: 7,
    who: "National Guard soldiers and airmen wounded during an operational or training mission supporting Operation Enduring Freedom, Operation Iraqi Freedom, or Operation New Dawn.",
  },
  "culvers-foundation-scholarship": {
    amount: "$1,000, $5,000, or $10,000",
    deadline: "April 1, 2026",
    deadlineMonth: 4,
    who: "Culver's team members with at least six months and 400 hours worked who pursue an eligible certificate, undergraduate degree, or graduate degree.",
    stages: ["high-school", "college", "transfer"],
    tags: ["employer", "graduate-students"],
  },
  "sc-guard-college-assistance": {
    amount: "$1,000–$4,000 by enrollment level for 2026–27, subject to funding, cost of attendance, and a $25,000 lifetime limit",
    deadline: "Fall 2026 closed August 1; spring window is November 20–December 15",
    deadlineMonth: 12,
  },
  "tennessee-future-teacher-scholarship": {
    deadline: "Term deadlines: September 1, March 1, and May 1",
    deadlineMonth: null,
    who: "Tennessee college juniors, seniors, or post-baccalaureate students admitted to an approved educator-preparation program, enrolled at least half-time, and willing to sign a promissory note; the loan-scholarship must be repaid unless the recipient completes two consecutive years of qualifying Tennessee public-school teaching.",
  },
  "oklahoma-inspired-to-teach": {
    amount: "$5,500 in earned-credit scholarship payments, plus later employment incentives for up to $25,500 total",
    deadline: "Applications are coordinated through participating campuses; no single statewide deadline",
    deadlineMonth: null,
    who: "Oklahoma students with at least a 2.5 GPA in an accredited teacher-education program; scholarship payments follow earned-credit bands and are limited to one per academic year, while leaving the program stops future payments but current official guidance does not require repayment of prior scholarship payments.",
  },
  "teaching-fellows-for-maryland": {
    amount: "Full resident tuition, mandatory fees, and room and board at public institutions; participating private nonprofits use a separate published formula",
    deadline: "October 15, 2026; MHEC pages currently display conflicting close-date labels",
    deadlineMonth: 10,
    who: "Full- or part-time undergraduate and graduate students in approved Maryland teacher-certification programs; Maryland residency and GPA, GRE, or SAT submissions are not required, and recipients sign the applicable high-needs teaching commitment.",
    stages: ["high-school", "college", "transfer"],
    tags: ["state-program", "education", "graduate-students", "part-time-students"],
  },
  "ashrae-undergraduate-engineering-scholarships": {
    deadline: "April 1",
    deadlineMonth: 4,
    who: "Engineering undergraduates in qualifying HVAC, refrigeration, or related programs through an ASHRAE-affiliated, ABET, Washington Accord, or Sydney Accord eligibility route.",
  },
  "aiche-mcketta-undergraduate-scholarship": {
    deadline: "June 15",
    deadlineMonth: 6,
    who: "Chemical-engineering students entering their third or final year who are nominated through an AIChE student chapter; each chapter may nominate one applicant.",
  },
  "asnt-engineering-undergraduate-scholarship": {
    deadline: "Current cycle is closed; the next application opens August 31, 2026",
    deadlineMonth: null,
  },
  "asabe-foundation-engineering-scholarship": {
    deadline: "March 15, 2026",
    deadlineMonth: 3,
    who: "Agricultural and biological engineering undergraduates with a completed year, financial need, department-head endorsement, and current ASABE student membership, which was free for the 2026 cycle.",
  },
  "acec-research-institute-scholarships": {
    amount: "$2,000–$15,000 across 2026 awards",
    deadline: "Next cycle opens in fall 2026",
    deadlineMonth: null,
    who: "Undergraduate and graduate engineering and land-surveying students applying to the ACEC Research Institute portfolio.",
    stages: ["college", "transfer"],
    tags: ["stem", "graduate-students"],
  },
  "ite-university-scholars-program": {
    deadline: "March 15",
    deadlineMonth: 3,
    who: "U.S. citizens or permanent residents with at least a 3.0 GPA who enter transportation-engineering study and attend a university with an ITE student chapter; high-school seniors and community-college transfers are eligible.",
  },
  "aisc-scholarships": {
    deadline: "May 1, 2026",
    deadlineMonth: 5,
    who: "U.S.-citizen or permanent-resident juniors, seniors, and master's students in civil, architectural, construction, materials, or metallurgical engineering and related structural-steel fields.",
    stages: ["college", "transfer"],
    tags: ["stem", "graduate-students"],
  },
  "aeg-foundation-scholarships": {
    deadline: "January 15 each year",
    deadlineMonth: 1,
    who: "Undergraduate, graduate, and post-baccalaureate students applying to the AEG Foundation's portfolio of environmental- and engineering-geology scholarships; named awards have distinct geographic, field-project, and other criteria.",
    stages: ["college", "transfer"],
    tags: ["stem", "graduate-students"],
  },
  "project-sleep-narcolepsy-scholarship": {
    deadline: "April 1, 2026 at 11:59 p.m. Pacific",
    deadlineMonth: 4,
    who: "High-school seniors living with narcolepsy or idiopathic hypersomnia who will begin at a four-year U.S. college or university.",
  },
  "hydrocephalus-association-scholarship": {
    deadline: "April 15, 2026 at 11:59 p.m. Eastern",
    deadlineMonth: 4,
    who: "People with hydrocephalus entering or attending an eligible college, postgraduate program, trade school, business school, or other qualifying nontraditional education program.",
    stages: ["high-school", "college", "transfer"],
    tags: ["health-condition", "graduate-students"],
  },
  "acpa-randall-larossa-scholarship": {
    deadline: "January 9, 2026; the 2027 cycle opens October 12, 2026",
    deadlineMonth: 1,
    who: "Full-time undergraduate students with a cleft or other congenital craniofacial difference, at least a 2.5 unweighted GPA, and no prior ACPA college-scholarship award; postgraduate students are ineligible.",
  },
  "amputee-coalition-skoski-scholarship": {
    deadline: "The public scholarship page says applications are closed; the official form remains live without a published deadline",
    deadlineMonth: null,
    who: "Full-time undergraduate freshmen through seniors with a congenital limb difference or amputation; current official sources do not publish the former under-23 or Amputee Coalition registration requirements.",
    stages: ["college"],
  },
  "minnesota-surviving-children-spouses-benefit": {
    amount: "Tuition at Minnesota public institutions plus $750 per fiscal year",
    who: "A surviving spouse or natural, adopted, or stepchild of an eligible deceased veteran, attending a Minnesota public institution until earning a bachelor's degree.",
  },
  "bnsf-college-scholarship-program": {
    amount: "$2,500; one selected National Merit Scholar receives $5,000",
    deadline: "February 27, 2026 at 3 p.m. Central",
    deadlineMonth: 2,
    who: "High-school seniors who are dependent children or stepchildren of eligible BNSF employees, generally with two years of active full-time service; an official SAT or ACT score is required by the deadline.",
  },
  "american-airlines-education-foundation-scholarship": {
    deadline: "April 17, 2026 at 3 p.m. Central",
    deadlineMonth: 4,
    who: "Dependent children of American Airlines Group team members who had at least one year of employment by January 8, 2026 and remain employed when awards are announced; the nonrenewable award supports eligible undergraduate and trade study worldwide, and students may reapply annually.",
  },
  "dominion-energy-educational-equity-scholarship": {
    amount: "$5,000 for two-year study or $10,000 for four-year study, renewable",
    deadline: "March 12",
    deadlineMonth: 3,
    who: "Students in Dominion Energy's service footprint pursuing eligible two-year, four-year, or vocational study; renewal requires continued eligibility and at least a 2.5 GPA.",
  },
  "entergy-community-power-scholarship": {
    deadline: "The 2026 cycle is complete; the migrated application page does not publish next-cycle dates",
    deadlineMonth: null,
    who: "Children of Entergy employees across the company's service area; thirty-three students received the $5,000 award in 2026.",
  },
  "entergy-power-your-future-scholarship": {
    deadline: "Current application page is closed and does not publish the next deadline",
    deadlineMonth: null,
    who: "Students in eligible technology programs at Entergy's designated four-year HBCUs and other universities or designated two-year vocational and process-technology schools; four-year students must enroll full time, two-year students may enroll part or full time, and Entergy employees and immediate family are ineligible.",
    stages: ["high-school", "college", "transfer"],
  },
  "aiec-thomas-moore-scholarship": {
    deadline: "December 31, 2025",
    deadlineMonth: 12,
    who: "Illinois high-school seniors applying through their local electric cooperative for fifteen member-child awards, one employee- or director-child award, or one lineworker-training award; five member-child awards are reserved for Illinois community colleges.",
  },
  "florida-ease-grant": {
    amount: "$3,500 for the current award year, subject to annual legislative funding",
    deadline: "Application procedures and deadlines vary by participating institution",
    deadlineMonth: null,
    who: "Florida residents taking at least twelve credits per term at eligible private nonprofit Florida colleges; theology and divinity study and summer enrollment are not funded.",
  },
  "oklahoma-tuition-equalization-grant": {
    deadline: "Participating institutions select recipients and set operational timing",
    deadlineMonth: null,
    who: "Full-time Oklahoma residents with family income of $50,000 or less, sufficient unmet need, and enrollment at an eligible private nonprofit college; receipt is limited to five consecutive years beginning with the first award.",
  },
  "arrl-foundation-scholarship-program": {
    deadline: "2026 cycle closed December 30, 2025 at noon Eastern",
    deadlineMonth: 12,
    who: "Students with an active amateur-radio license applying once to the ARRL Foundation portfolio; ARRL membership is not universally required, and individual awards add distinct geographic, academic, or recommendation criteria.",
    stages: ["high-school", "college", "transfer"],
    tags: ["general", "graduate-students"],
  },
  "able-flight-scholarships": {
    amount: "Fully funded Sport Pilot training",
    deadline: "Applications are accepted year-round; October 31 determines the following May cohort",
    deadlineMonth: 10,
    who: "People with qualifying physical disabilities who can participate without interruption in Sport Pilot training at Southern Illinois University in Carbondale, generally from mid-May into July.",
  },
  "leroy-homer-flight-scholarship": {
    amount: "Approximately 45–65 flight hours plus specified materials and tests",
    deadline: "October 31 through January 31 each year",
    deadlineMonth: 1,
    who: "Students ages 16–23 who do not already hold a private-pilot certificate and are not enrolled in a university flight program; applicants must complete or commit to private-pilot ground school and obtain test authorization before an award is granted.",
  },
  "sousa-foundation-hawkins-scholarship": {
    deadline: "September 6–November 22, 2026",
    deadlineMonth: 11,
    who: "College students working toward a degree in instrumental band music education; one $1,000 award is available for the coming year.",
  },
  "akc-humane-fund-spurling-scholarship": {
    deadline: "July 1, 2026",
    deadlineMonth: 7,
    who: "Full-time students in programs that advance canine well-being; tuition-only awards are paid directly to the accredited institution.",
  },
  "fellows-smacna": {
    deadline: "February 28, 2026",
    deadlineMonth: 2,
    who: "Members of the SMACNA extended family entering any undergraduate course of study; this four-year College of Fellows award is separate from other endowed SMACNA scholarships.",
  },
  "association-concrete-precast-undergraduate": {
    deadline: "March 13, 2026",
    deadlineMonth: 3,
    who: "Undergraduate students pursuing building, construction, manufacturing, or precast-concrete-related study who obtain a recommendation from an NPCA member; the graduate scholarship is a separate program.",
  },
  "association-carriers-truckload": {
    deadline: "February 3–March 20, 2026",
    deadlineMonth: 3,
    who: "Full-time students with at least a 3.0 GPA pursuing an initial degree at a U.S. or Canadian school who have a qualifying relationship to a TCA member company; awards are not automatically renewable, but eligible recipients may reapply.",
  },
  "nuca": {
    amount: "$500 per year for two years to $8,000 across four award types",
    deadline: "June 5, 2026",
    deadlineMonth: 6,
    who: "High-school-senior employees of NUCA members, dependents of member-company employees, and dependents of chapter executive directors applying to one of four awards with different totals and payment schedules.",
  },
  "association-industry-industry-tire-tire": {
    amount: "Eight $2,500 awards",
    deadline: "March 31, 2026",
    deadlineMonth: 3,
    who: "Students pursuing eligible tire-industry technical or business careers who identify an affiliated TIA member individual or company in good standing.",
  },
  "supplyhouse-to-track-trades": {
    amount: "Thirty $2,500 awards",
    deadline: "July 10–November 10, 2026",
    deadlineMonth: 11,
    who: "Trade-school students, high-school seniors, apprentices, and early-career tradespeople pursuing plumbing, HVAC, electrical, or closely related fields; the official Bold.org application requires a free profile.",
  },
  "association-contractors-diving-international": {
    amount: "Two $6,000 awards",
    deadline: "June 15, 2026",
    deadlineMonth: 6,
    who: "Students nominated and endorsed by an ADCI voting-member company in good standing for at least one year; prior ADCI scholarship recipients may not apply again.",
  },
  "gas-propane": {
    deadline: "December 15–February 15 each year",
    deadlineMonth: 2,
    who: "Unmarried students under age 24 whose parent works full time in a directly propane-related role for a qualifying NPGA, PERC, or state-association member; employees themselves and other relatives are ineligible.",
  },
  "dewalt-trade": {
    amount: "Forty $5,000 awards",
    deadline: "November 4, 2025–February 28, 2026, or earlier if 1,000 applications are received",
    deadlineMonth: 2,
  },
  "norfolk-on-southern-track-trades": {
    deadline: "May 6–September 1, 2026",
    deadlineMonth: 9,
    who: "New, current, and career-changing students pursuing rail-related skilled trades in Norfolk Southern's service states; Norfolk Southern employees and their families are ineligible.",
  },
  "nation-skilled": {
    deadline: "June 30, 2026",
    deadlineMonth: 6,
    who: "U.S. citizens or permanent legal residents age 17 or older pursuing skilled-trade training; the general SKILLED Nation award is one of several programs reached through a universal application, and funds are routed through the school or training provider.",
  },
  "cpa-pennsylvania": {
    amount: "$1,000 and up, varying by scholarship category",
    deadline: "Next applications open January 2027; closing dates are not yet published",
    deadlineMonth: null,
    who: "Pennsylvania high-school, undergraduate, graduate or 150-credit, and CPA Exam candidates applying to the foundation's distinct scholarship categories.",
    stages: ["high-school", "college", "transfer"],
    tags: ["accounting", "cpa", "pennsylvania", "business", "graduate-students"],
  },
  "educational-vscpa": {
    deadline: "January 1–April 1 each year",
    deadlineMonth: 4,
    who: "Virginia undergraduate, graduate, and doctoral students pursuing CPA licensure; required VSCPA student membership is free.",
    tags: ["accounting", "cpa", "virginia", "business", "veterans", "first-generation", "graduate-students"],
  },
  "njcpa": {
    deadline: "High-school and college tracks have separate deadlines; the next cycle is expected in fall 2026",
    deadlineMonth: null,
    who: "New Jersey high-school seniors and qualifying college accounting students, including college seniors entering eligible graduate programs; amounts and deadlines differ by track.",
    tags: ["accounting", "cpa", "new jersey", "business", "graduate-students"],
  },
  "cpa-nc": {
    deadline: "August 15–October 24, 2026",
    deadlineMonth: 10,
    who: "North Carolina community-college, undergraduate, and graduate accounting students; award values depend on educational level and required student membership is free.",
  },
  "accounting-cpa-washington": {
    deadline: "Pathway-specific deadlines; the next cycle is expected in fall 2026",
    deadlineMonth: null,
    who: "Washington high-school, community-college, undergraduate, fifth-year, and master's accounting students applying through the foundation's distinct pathways.",
    tags: ["accounting", "cpa", "washington", "business", "graduate-students"],
  },
  "cpas-educational-georgia-society": {
    deadline: "March 15 each year",
    deadlineMonth: 3,
    who: "Georgia rising-junior, senior, and graduate accounting or business students; named awards may add financial-need or institution requirements.",
  },
  "cpas-educational-england-new-society": {
    name: "New England Society of CPAs Educational Foundation Scholarship",
    deadline: "January 30, 2026",
    deadlineMonth: 1,
    who: "High-school, undergraduate, and graduate accounting students across New England.",
    tags: ["accounting", "cpa", "new england", "business", "graduate-students"],
  },
  "cpa-ohio": {
    amount: "$2,000 and up",
    deadline: "Opens September 2026; closes December 31, 2026",
    deadlineMonth: 12,
    who: "Ohio undergraduate and graduate accounting students planning to become CPAs; required student affiliation is free.",
    tags: ["accounting", "cpa", "ohio", "business", "graduate-students"],
  },
  "future-nacs": {
    deadline: "May 15, 2026",
    deadlineMonth: 5,
    who: "Employees and children or legal dependents of employees at NACS retail-member companies; the employee must remain actively employed throughout the award period.",
  },
  "first-generation-tiaa": {
    deadline: "Current cycle is closed; the official page no longer displays the deadline",
    deadlineMonth: null,
    who: "U.S.-citizen undergraduates who are first-generation under TIAA's four-year-degree definition; awards are nonrenewable, although eligible students may reapply.",
  },
  "council-executive-leadership": {
    deadline: "January 22–March 1, 2026",
    deadlineMonth: 3,
    who: "Undergraduate and graduate students of all backgrounds who meet individual scholarship criteria and demonstrate commitment to inclusion.",
    tags: ["business", "corporate leadership pipeline", "graduate-students"],
  },
  "charities-nbaa": {
    amount: "$1,000–$8,000 for cash awards, plus variable-value training awards",
    deadline: "Varies by named scholarship",
    deadlineMonth: null,
    who: "Students pursuing business-aviation careers through NBAA's portfolio of cash and training awards; use the live directory for each award's eligibility and deadline.",
  },
  "aaae-aviation-women": {
    amount: "Nine $5,000 awards",
    deadline: "March 13, 2026; the next cycle returns in December",
    deadlineMonth: 3,
    who: "Full-time women at junior standing or above, including graduate students, in qualifying aviation programs with at least a 3.0 GPA; membership is not required.",
    tags: ["aviation", "airport management", "women in aviation", "graduate-students"],
  },
  "aapg-camp-field": {
    amount: "Sixty-seven $3,000 awards for summer 2026",
    deadline: "February 1, 2026",
    deadlineMonth: 2,
    who: "Undergraduate geoscience students attending accredited field camp through the program that replaced the former L. Austin Weeks Undergraduate Grant.",
  },
  "seg": {
    deadline: "November 1–March 1 each year",
    deadlineMonth: 3,
    who: "High-school seniors and undergraduate or graduate students worldwide pursuing applied geophysics; renewal applicants must show SEG engagement, but first-time applicants are not universally required to purchase membership.",
    stages: ["high-school", "college", "transfer"],
    tags: ["geoscience", "geophysics", "exploration geophysics", "graduate-students", "international-students"],
  },
  "association-black-geoscientists": {
    deadline: "July 3, 2026",
    deadlineMonth: 7,
    who: "U.S.-citizen or permanent-resident undergraduate and graduate geoscience students; a 3.5 GPA is described as most competitive, not as a hard minimum.",
    tags: ["geoscience", "geology", "black geoscientists", "diversity", "graduate-students"],
  },
  "affairs-aiche-committee-minority": {
    deadline: "June 15, 2026",
    deadlineMonth: 6,
    who: "Underrepresented students applying through one of two distinct chemical-engineering scholarship tracks; required undergraduate AIChE student membership is free.",
  },
  "bird-frances-gca-habitat-m": {
    deadline: "January 15 each year",
    deadlineMonth: 1,
    who: "College seniors, eligible second-semester juniors applying for senior year, and graduate students researching seasonal habitat for threatened or endangered native birds.",
    tags: ["wildlife", "conservation", "ornithology", "birds", "graduate-students"],
  },
  "ihs": {
    who: "American Indian and Alaska Native undergraduate and graduate students applying to Preparatory, Pre-Graduate, or Health Professions tracks; Health Professions recipients generally owe one year of service per year of support after a two-year minimum, while the other tracks do not carry that service commitment.",
  },
  "forgiveness-loan-minnesota-nurse": {
    deadline: "November 1, 2026–January 6, 2027",
    deadlineMonth: 1,
    who: "RNs and LPNs, including qualifying nursing students, who provide at least 30 direct-care hours per week for 45 weeks per year in an eligible Minnesota setting and complete two to four years of service for loan repayment.",
  },
  "illinois-nursing": {
    deadline: "May 31, 2026",
    deadlineMonth: 5,
    who: "Illinois residents in certificate, associate, bachelor's, or graduate nursing programs who complete qualifying Illinois nursing or nurse-education service for time equivalent to the supported education, or repay with seven-percent annual interest.",
    tags: ["nursing", "illinois", "graduate-students"],
  },
  "boren": {
    deadline: "January 27, 2027; campus deadlines may be earlier",
    deadlineMonth: 1,
    who: "U.S.-citizen undergraduates studying a critical language abroad in a national-security-relevant region who will complete at least one year of qualifying federal service after graduation; graduate students use the separate Boren Fellowship.",
  },
  "doodle-google": {
    deadline: "2026 entry window closed December 17, 2025",
    deadlineMonth: 12,
    who: "U.S. citizens or permanent legal residents in grades K–12 within the program's official U.S. geographic scope who submit an original doodle based on the year's theme.",
  },
  "ayn-rand-atlas-shrugged-essay": {
    deadline: "Next contest is coming soon; no current deadline is published",
    deadlineMonth: null,
  },
  "child-kevin": {
    deadline: "June 5 each year when a new cycle is published",
    deadlineMonth: 6,
    who: "U.S. residents diagnosed with hemophilia A or B who are high-school seniors or current vocational, undergraduate, or graduate students.",
    tags: ["disability", "health-condition", "bleeding-disorder", "hemophilia", "graduate-students"],
  },
  "educational-joe-pugliese": {
    deadline: "Current cycle is closed; the next exact deadline is not yet published",
    deadlineMonth: null,
    who: "Active patients at federally funded Hemophilia Treatment Centers with inherited bleeding or thrombotic disorders, from high-school seniors through returning adults and post-undergraduate or advanced-degree students.",
    tags: ["disability", "health-condition", "bleeding-disorder", "hemophilia", "graduate-students"],
  },
  "courter-hemophilia-pfizer-soozie": {
    amount: "$2,500–$5,000 across eleven awards for 2026–27",
    who: "Continental U.S. residents diagnosed with hemophilia A or B who are high-school seniors or vocational, undergraduate, or graduate students.",
    tags: ["disability", "health-condition", "bleeding-disorder", "hemophilia", "graduate-students"],
  },
  "gravis-myasthenia-ucb": {
    deadline: "2026 cycle closed February 15; the 2027 cycle opens in fall 2026",
    deadlineMonth: null,
  },
  "dollars-scholars-um-umhef": {
    amount: "$2,000 through the core church and UMHEF match; up to $4,000 only when additional matching funds are available",
    deadline: "March 20, 2026",
    deadlineMonth: 3,
    who: "Qualifying Methodist-church members applying specifically to UM Dollars for Scholars; undergraduate, graduate, and Doctor of Ministry students are eligible, and separate named endowed funds are not part of this record.",
    tags: ["religious", "methodist", "ame", "ame zion", "cme", "national", "denominational", "graduate-students"],
  },
  "brethren-care-church-health": {
    deadline: "May 22, 2026",
    deadlineMonth: 5,
    who: "Church of the Brethren members in qualifying health-profession programs who have already completed two years of relevant college study or hold a qualifying four-year degree.",
  },
  "achievement-coptic-educational-merit-undergraduates": {
    deadline: "May 1, 2026",
    deadlineMonth: 5,
  },
  "4-h-opportunity-texas": {
    deadline: "Opens November 1, 2026; deadline February 15, 2027",
    deadlineMonth: 2,
    who: "Active Texas 4-H members pursuing a bachelor's degree or technical certification who select one scholarship category and, if chosen, attend required interviews and recognition events.",
  },
  "4-h-illinois-state": {
    name: "Illinois 4-H Foundation Scholarships",
    amount: "$1,250 across ten focus areas",
    who: "Eligible, actively enrolled Illinois 4-H members judged on merit and demonstrated 4-H excellence across ten current focus areas.",
  },
  "4-h-iowa": {
    deadline: "Opens December 1, 2026; deadline February 1, 2027",
    deadlineMonth: 2,
    who: "Iowa 4-H members and alumni applying to the statewide foundation portfolio; separately listed county scholarships are not part of this record.",
  },
  "nfaa-pro": {
    amount: "Two $1,000 awards, one male and one female",
    deadline: "Opens February 1; deadline May 31",
    deadlineMonth: 5,
  },
  "bowl4life-johnny-pba-petraglia": {
    deadline: "July 1–July 31, 2026 at 11:59 p.m. Eastern; submitted by email",
    deadlineMonth: 7,
  },
  "california-daniel-fire-terry": {
    deadline: "September 1, 2026",
    deadlineMonth: 9,
    who: "Natural or legally adopted children under age 27 of California firefighters who died in the line of duty and whose name appears or is approved for the California Firefighters Memorial Wall.",
  },
  "brands-dependent-fellowes-gen-next": {
    deadline: "Next cycle is expected to reopen in January; the closing deadline is not yet published",
    deadlineMonth: null,
  },
  "corporation-employee-global-waters": {
    deadline: "Current cycle is closed; monitor the official page for the next opening and deadline",
    deadlineMonth: null,
  },
  "carolina-children-north-veterans-wartime": {
    amount: "Class-dependent tuition and required-fee support, with an allowance for qualifying students, for up to eight semesters",
    deadline: "Special 2026 window ran May 6–June 8; recheck the next cycle",
    deadlineMonth: null,
  },
  "dependents-military-survivors-virginia": {
    deadline: "Semester-specific target dates and enrollment-update windows are published on the official page",
    deadlineMonth: null,
    who: "Qualifying spouses and children ages 16–29 of Virginia veterans who meet the program's death, MIA/POW, or disability rules; Tier 1 and Tier 2 determine stipend eligibility in addition to the tuition and mandatory-fee waiver.",
  },
  "benefits-jersey-new-survivor-tuition": {
    deadline: "October 1 for fall starters; March 1 for spring starters",
    deadlineMonth: null,
    who: "Children and surviving spouses of qualifying New Jersey police, fire, law-enforcement, rescue-squad, or civil-defense members killed in the line of duty; this record does not include a separate veteran-dependent program.",
    tags: ["first responders", "deceased public employee", "new jersey", "state waiver"],
  },
  "children-michigan-tuition-veterans": {
    deadline: "June 30, 2027 for 2026–27",
    deadlineMonth: 6,
    who: "Natural or adopted children ages 16–26 of qualifying Michigan veterans who enroll at least half time, maintain a 2.25 GPA, and file the FAFSA annually.",
  },
  "29-dependent-exemption-louisiana-state": {
    amount: "In-state tuition exemption at Louisiana public colleges and universities",
    deadline: "Apply through the parish veterans-service office for category-specific certification",
    deadlineMonth: null,
    who: "Qualifying children and surviving spouses of deceased veterans and children of qualifying disabled living veterans; category-specific service and residency rules apply, including the current one-year residency rule for living veterans.",
  },
  "orphan-virginia-war-west": {
    deadline: "Eligibility is certified through the West Virginia Department of Veterans Assistance and the school",
    deadlineMonth: null,
  },
  "child-disabled-exemption-fee-indiana": {
    deadline: "Apply under the program's annual process and file the FAFSA each year",
    deadlineMonth: null,
    who: "Children of qualifying Indiana disabled veterans who meet the applicable service-period, discharge, residency, and veteran-status rules; eligible private nonprofit colleges participate, and graduate or professional use is priced at the undergraduate resident rate.",
    tags: ["veterans dependents", "disabled veteran", "indiana", "state waiver", "graduate-students"],
  },
  "deceased-dependents-disabled-illinois-mia": {
    who: "Qualifying spouses, natural or adopted children, stepchildren, and certain minors under court-ordered guardianship of eligible Illinois veterans, subject to current relationship and residency rules and a 12-year benefit-use period.",
  },
  "dependents-kentucky-tuition-veterans-waiver": {
    amount: "Tuition waiver only at eligible Kentucky public institutions; fees and other costs are excluded",
    deadline: "Apply after admission; KDVA advises allowing about 30 days for processing",
    deadlineMonth: null,
    who: "Children, stepchildren, spouses, and qualifying unremarried surviving spouses of Kentucky veterans who meet the program's category-specific death, disability, service, and residency conditions.",
  },
  "enforcement-firemen-law-mississippi-officers": {
    deadline: "Opens October 1; deadline September 15",
    deadlineMonth: 9,
    who: "Eligible dependent children and spouses of qualifying Mississippi law-enforcement officers or firefighters who enroll full time in a first bachelor's program, reapply annually, and maintain at least a 2.5 GPA.",
  },
  "assistance-colorado-dependent-tuition": {
    deadline: "Opens March 1; deadline June 30",
    deadlineMonth: 6,
  },
  "armed-dependent-forces-idaho-officer": {
    deadline: "Contact the Idaho State Board of Education for the application process",
    deadlineMonth: null,
  },
  "indigenous-kansas-state-status-tuition": {
    name: "Kansas FY 2027 In-State Tuition Status for Indigenous Students",
    deadline: "Tuition-status provision subject to annual appropriations; follow institutional residency guidance",
    deadlineMonth: null,
  },
  "fee-foster-nevada-waiver-youth": {
    deadline: "Apply through the institution before the term; deadlines vary by campus",
    deadlineMonth: null,
    who: "Students who meet Nevada's foster-care and education criteria, are under 26 on the first day of the term, and file the FAFSA annually; the waiver covers fall and spring base registration fees and limited lower-division lab fees, not summer.",
  },
  "educational-gratuity-pennsylvania-postsecondary": {
    name: "Pennsylvania Educational Gratuity Program (Veterans)",
    amount: "Up to $500 per term based on remaining financial need, for up to four academic years",
    deadline: "Apply through the Pennsylvania Department of Military and Veterans Affairs process",
    deadlineMonth: null,
  },
  "california-planning": {
    deadline: "May 1, 2026",
    deadlineMonth: 5,
    who: "Continuing undergraduate juniors entering their final year and graduate students in eligible California urban- and regional-planning programs.",
    tags: ["urban-planning", "state-level", "california", "graduate-students"],
  },
  "diversity-equity-inclusion-laf-landdesign": {
    deadline: "February 1",
    deadlineMonth: 2,
  },
  "iida-j-john-legacy-nelson": {
    deadline: "Opens August 4; deadline October 2, 2026",
    deadlineMonth: 10,
  },
  "architects-design-diversity-ia-iida": {
    deadline: "Next cycle dates are not yet published",
    deadlineMonth: null,
    who: "Eligible undergraduate and graduate interior-design or architecture students worldwide applying to the current award tiers.",
    tags: ["interior-design", "architecture", "diversity", "national", "graduate-students", "international-students"],
  },
  "competition-design-nkba": {
    deadline: "June 5, 2026",
    deadlineMonth: 6,
    who: "Free NKBA student members enrolled in an educational institution who meet the experience and submission rules; winners also receive the published KBIS travel package.",
  },
  "brand-licensing-nrf": {
    deadline: "Prior cycle is closed; no 2027 Student Program scholarship dates are published",
    deadlineMonth: null,
  },
  "avmf-technician-veterinary-zoetis": {
    deadline: "October 1–November 15 when the next cycle opens",
    deadlineMonth: 11,
    who: "Full-time veterinary-technician or animal-health-technology students in good standing entering the second year of a two-year program or third year of a four-year program at an eligible accredited U.S. or Puerto Rico school.",
  },
  "feeding-ift-tomorrow-undergraduate": {
    amount: "Up to $5,000 across multiple undergraduate awards",
    deadline: "Latest cycle ran January 12–March 2; next cycle is expected January 2027",
    deadlineMonth: null,
  },
  "academic-funeral-service": {
    deadline: "Annual windows: February 15–April 1 and September 15–November 1",
    deadlineMonth: null,
    who: "Full- or part-time students already attending classes in an eligible accredited funeral-service or mortuary-science program; accepted students who have not begun are ineligible, and awards are nonrenewable.",
  },
  "application-general-horticulture": {
    deadline: "January 15",
    deadlineMonth: 1,
    who: "Eligible horticulture students with at least a 2.5 GPA; the outside-Florida condition applies to undergraduates, while graduate eligibility follows the separately published pathway.",
    tags: ["horticulture", "graduate-students"],
  },
  "perennial-plant": {
    deadline: "March 31, 2026",
    deadlineMonth: 3,
    who: "Eligible undergraduate, graduate, and specified recent graduates in horticulture or related fields; recheck the first-party application before treating the next cycle as open.",
    tags: ["horticulture", "graduate-students"],
  },
  "1-diabetes-fishman-marc-type": {
    deadline: "August 15, 2026",
    deadlineMonth: 8,
    who: "Undergraduate and graduate or professional students with type 1 diabetes in RN, NP, ARNP, or physician-assistant programs; the 2026 source does not list dietetics, PT/OT, or MD/DO pathways.",
    tags: ["health-condition", "type-1-diabetes", "nursing", "healthcare", "field-specific", "situational-audit-add", "graduate-students"],
  },
  "administrators-black-forum-public": {
    deadline: "Next application window is not yet published",
    deadlineMonth: null,
  },
  "marshall-nabcj-thurgood": {
    amount: "$3,500 for 2026",
    deadline: "April 15, 2026",
    deadlineMonth: 4,
  },
  "ecology-tmcf-wildlife": {
    deadline: "April 24, 2026; do not treat a successor cycle as open until republished",
    deadlineMonth: null,
  },
  "creary-drs-family-ludlow-ruth": {
    deadline: "May 17, 2026",
    deadlineMonth: 5,
  },
  "army-association-corps-nurse": {
    amount: "$3,000",
    deadline: "March 31",
    deadlineMonth: 3,
    who: "Eligible U.S.-citizen students in accredited nursing, nurse-anesthesia, graduate-certificate, or qualifying nursing-related healthcare pathways with the required Army-service relationship and no current Army-component education funding.",
    tags: ["veteran", "nursing", "health", "national", "graduate-students"],
  },
  "uspaacc": {
    deadline: "March 2, 2026",
    deadlineMonth: 3,
    who: "U.S.-citizen or permanent-resident high-school seniors entering full-time postsecondary study with at least a 3.3 GPA; Asian or Pacific Islander heritage is not required.",
    tags: ["business", "chamber-of-commerce"],
  },
  "against-artistic-grain": {
    deadline: "May 31",
    deadlineMonth: 5,
    who: "Applicants with at least 25% qualifying Asian, Native Hawaiian, or Pacific Islander ancestry pursuing eligible vocational, associate, bachelor's, or master's arts and communications pathways.",
    tags: ["asian", "aapi", "native-hawaiian", "pacific-islander", "arts", "journalism", "graduate-students"],
  },
  "american-fish-native-society-wildlife": {
    deadline: "August 14, 2026",
    deadlineMonth: 8,
    who: "U.S.-citizen enrolled tribal members or qualifying descendants documented through BIA Form 4432, from incoming freshmen through doctoral students in eligible natural-resource fields.",
    tags: ["native-american", "indigenous", "environment", "natural-resources", "wildlife", "graduate-students"],
  },
  "american-native-scholars-vocal": {
    deadline: "March 1–May 1, 2026; next cycle expected in early 2027",
    deadlineMonth: null,
  },
  "fort-future-leaders": {
    amount: "$1,000; five recipients are currently named",
    deadline: "No current first-party application window is published",
    deadlineMonth: null,
  },
  "agri-agriculture-american-american-daughters": {
    deadline: "January 1–March 1",
    deadlineMonth: 3,
  },
  "hourglass-rock-trades-women": {
    amount: "Two $2,500 awards",
    deadline: "April 10, 2026",
    deadlineMonth: 4,
  },
  "ostem": {
    amount: "$2,500–$5,000 across the current named awards",
    deadline: "April 15–May 18, 2026",
    deadlineMonth: 5,
    who: "Registered oSTEM members, including LGBTQ+ students and allies, pursuing STEM study in the United States, Canada, or United Kingdom; free registration satisfies the program requirement.",
    tags: ["lgbtq", "stem", "graduate-students", "international-students"],
  },
  "ar-arkansas-governor-higher-s": {
    deadline: "July 1 for fall; January 10 for spring",
    deadlineMonth: null,
    who: "Arkansas students admitted to an eligible Comprehensive Transition Program; support is capped at four continuously enrolled semesters and remains subject to funding and cost-of-attendance limits.",
  },
  "ar-arkansas-governor-s-scholars": {
    deadline: "July 1 each year",
    deadlineMonth: 7,
    who: "Qualifying Arkansas seniors through the Diploma of Distinction, associate-degree, county-high-score, or EAD route; limited graduate-school use of remaining senior-year semesters is permitted.",
    tags: ["arkansas", "merit scholarship", "graduate-students"],
  },
  "la-challenge-go-louisiana-ycp": {
    deadline: "Apply through the FAFSA and participating institution; LOSFA publishes no central deadline",
    deadlineMonth: null,
    who: "Louisiana Youth ChalleNGe completers in qualifying high-demand-job programs who meet annual FAFSA, citizenship, conviction, enrollment, 24-hour pace, and 2.50 GPA rules.",
  },
  "ca-act-alan-pattee": {
    name: "Alan Pattee Scholarship Act Tuition and Fee Waiver",
    amount: "Systemwide tuition and qualifying mandatory fees, varying by campus and system",
    who: "Qualifying dependents of California public-safety personnel who died in the line of duty; eligible public-agency dependents may use the waiver for graduate or professional study, while contractor-dependent rules are narrower. Disability cases belong to the separate LEPD program.",
    tags: ["california", "law enforcement families", "first responder families", "tuition waiver", "graduate-students"],
  },
  "oh-adoption-ohio": {
    who: "Qualifying Ohio adoptees pursuing undergraduate study full or part time at eligible public, nonprofit, degree-granting career, or exempt private institutions through the direct ODHE application.",
  },
  "oh-officers-ohio-safety": {
    amount: "Public tuition and fees or an annually recalculated private-institution benefit",
    who: "Current Ohio residents who are qualifying children, spouses, or former spouses of eligible safety officers or specified military members killed in qualifying service; War Orphans recipients are excluded.",
  },
  "in-children-guard-indiana-indiana": {
    deadline: "Apply at least 30 days before the semester",
    deadlineMonth: null,
    who: "Qualifying biological or adopted children and spouses of Indiana National Guard members who meet adoption-age, spouse-at-death, resident-tuition, and MDI documentation rules; benefits supplement other grants and use the undergraduate resident credit-hour cap.",
  },
  "in-children-indiana-officers-public": {
    deadline: "Ongoing ScholarTrack application plus annual FAFSA",
    deadlineMonth: null,
    who: "Children and spouses of qualifying Indiana public-safety officers, with disability limited to specified catastrophic 1977 Fund injuries or permanently and totally disabled state police; children must first apply by age 32 and meet adoption, residency, SAP, and other program rules.",
  },
  "in-fee-heart-indiana-purple": {
    deadline: "One-time ongoing ScholarTrack application plus annual FAFSA",
    deadlineMonth: null,
    who: "Indiana veterans themselves who qualify through a Purple Heart or enemy-action wound and non-dishonorable separation; the benefit has 124-credit and eight-year limits, an undergraduate-rate cap, federal-aid conditions, and SAP requirements.",
  },
  "il-dependent-displaced-energy-illinois": {
    deadline: "October 1, 2026 for full year; March 1, 2027 for second term and summer; June 15, 2027 for summer only",
    deadlineMonth: null,
    who: "Undergraduate and graduate dependents of qualifying displaced Illinois energy workers who file the FAFSA annually and apply through the ISAC Student Portal; the benefit is limited to one calendar year.",
    tags: ["illinois", "state-program", "graduate-students"],
  },
  "mi-incentive-michigan": {
    deadline: "Complete TIP identification and file the FAFSA annually",
    deadlineMonth: null,
    amount: "Phase I tuition support under current rate and credit limits; Phase II offers an alternative $400 per term",
    who: "TIP-identified Michigan students who meet annual FAFSA and institutional rules; Phase I is limited to 80 semester or 120 term credits, and Phase II must be completed within 30 months.",
  },
  "mi-educator-future-mi-stipend": {
    amount: "Up to $9,600 per qualifying student-teaching semester, subject to funding; two-award lifetime maximum",
    deadline: "Fall opened May 1, 2026; spring opens November 1, 2026; summer opens April 1, 2027",
    deadlineMonth: null,
    who: "Eligible Michigan educator-preparation students who submit a separate application for each qualifying student-teaching semester.",
  },
  "ia-blue-d-robert": {
    deadline: "May 31; current cycle is closed",
    deadlineMonth: 5,
    who: "Eligible Iowa students submitting the required two reference letters and 500-word essay.",
  },
  "mo-advanced-incentive-placement": {
    deadline: "June 1, 2027",
    deadlineMonth: 6,
    who: "Eligible Missouri students paid through their postsecondary institution after submitting the required AP score report and school certification.",
  },
  "mo-child-employee-officer-or": {
    who: "Qualifying children under 24, spouses, and disabled public-service officers or employees; full-time enrollment is normally twelve credits, with a six-credit disability exception, and summer funding is unavailable.",
  },
  "mo-s-survivors-veteran-wartime": {
    deadline: "Initial and renewal applicants follow separate official processes; no summer awards",
    deadlineMonth: null,
    who: "Qualifying Missouri wartime-veteran survivors, including documented combat-pay or hazardous-duty routes; children must be under 25, and the 25-recipient cap, funding waitlist, and priority order apply.",
  },
  "in-child-heart-indiana-or": {
    amount: "100% for qualifying pre-July 2011 parental enlistment, or 20% plus the VA disability percentage for later enlistment, subject to program limits",
    deadline: "One-time ScholarTrack application plus annual FAFSA",
    deadlineMonth: null,
    who: "Qualifying children who first apply by age 33 and use the benefit within eight years; graduate and professional study is eligible at the undergraduate rate, while private-college eligibility requires high-school graduation on or after January 1, 2023.",
    tags: ["indiana", "veterans dependents", "tuition waiver", "graduate-students"],
  },
  "nd-scholars": {
    deadline: "Automatic process based on junior-year testing from July 1 through June 30; no application",
    deadlineMonth: null,
    who: "North Dakota students considered automatically from qualifying junior-year scores; funding is limited to roughly thirty new awards, a score of 30 does not guarantee selection, and out-of-state enrollment is not reinstated.",
  },
  "corps-dakota": {
    deadline: "Current cycle closed; next window is November 1–December 15, 2026",
    deadlineMonth: 12,
    who: "Eligible students who sign the promissory note and complete the required post-graduation South Dakota employment; failure to meet the commitment can trigger repayment.",
  },
  "hagen-harvey": {
    amount: "Board-set awards meeting the published annual minimums",
    deadline: "Latest cycle closed February 28, 2026; next cycle is not posted",
    deadlineMonth: null,
    who: "Eligible students maintaining at least twelve credits and a 2.5 GPA, subject to the active-military timing exception and Board-controlled award count.",
  },
  "children-deceased-first-responders": {
    deadline: "Submit the paper form and death certificate through the institution",
    deadlineMonth: null,
    who: "Children of covered South Dakota first responders whose death resulted directly from official-duty injuries before the child turned 21.",
  },
  "mt-orphans-war": {
    deadline: "Third week of the term",
    deadlineMonth: null,
    who: "Children of qualifying Montana veterans killed in action or who died from a combat-related injury, disease, or disability; fees are not waived and other tuition waivers cannot be combined.",
  },
  "mt-finalist-merit-semi": {
    deadline: "Automatic spring notification; contact the institution by mid-April if not notified",
    deadlineMonth: null,
    who: "Montana students receiving a National Merit Semi-Finalist Scholarship who enter within nine months, meet satisfactory standards, and use the nontransferable benefit for no more than two consecutive semesters.",
  },
  "wy-assistance-educational-plan-wyng": {
    deadline: "Spring December 1–February 1; summer April 1–June 1; fall August 1–October 1, 2026",
    deadlineMonth: null,
    who: "Eligible Wyoming National Guard members pursuing up to two education goals through certificate, undergraduate, graduate, or professional study, reapplying each term within the ten-year limit; dependent transfers require six completed years plus four additional years, and withdrawal or failed service commitments can trigger repayment.",
    tags: ["wyoming", "national guard", "state-program", "graduate-students"],
  },
  "co-american-colorado-indian-tribes": {
    amount: "Institution-specific difference between in-state and nonresident tuition",
    deadline: "Documentation timing varies by institution",
    deadlineMonth: null,
    who: "Qualifying Indigenous undergraduate, graduate, and professional students receiving Colorado in-state tuition classification rather than a full-tuition scholarship.",
    tags: ["colorado", "native american", "in-state tuition", "graduate-students"],
  },
  "az-academic-all-arizona-team": {
    amount: "Fall and spring resident tuition at ASU, NAU, or the University of Arizona for up to 60 credits or 10 consecutive undergraduate semesters",
    deadline: "Annual fall campus nomination and Phi Theta Kappa application",
    deadlineMonth: null,
    who: "Arizona-resident community-college students with at least a 3.5 GPA who are nominated by their campus; each campus may nominate two students, and recipients must enroll in at least six credits and meet annual renewal rules.",
  },
  "officers-peace-slain": {
    amount: "Tuition waiver at an Arizona public university or community college; up to 64 community-college credits and a combined credit total equal to the student's initially declared bachelor's program",
    deadline: "Obtain the required service verification and apply through the public institution",
    deadlineMonth: null,
    who: "Qualifying children age 30 or younger and non-remarried spouses of covered Arizona public-safety, National Guard, or U.S. Armed Forces members killed in the line of duty, with verification from the applicable state authority.",
  },
  "heart-purple": {
    amount: "Tuition waiver at an Arizona public university or community college; fees are not included by the controlling statute",
    deadline: "Obtain the required service verification and apply through the public institution",
    deadlineMonth: null,
    who: "Qualifying Arizona National Guard members who received a Purple Heart or were medically discharged for a service-related injury, and qualifying non-Guard Purple Heart recipients with the required Arizona connection and at least a 50% VA disability rating; the non-Guard path excludes class 1–5 felony convictions.",
    stages: ["college", "transfer"],
  },
  "fighters-fire-officers-peace": {
    deadline: "Request the application beginning July 1; complete packet due September 1, 2026",
    deadlineMonth: 9,
    who: "New Mexico-resident spouses and children who were age 21 or younger when their New Mexico-resident firefighter or peace-officer parent died in the line of duty; new applicants email the completed packet and renewals use the separate intake request.",
  },
  "nm-mexico-new-scholars": {
    amount: "Tuition, books, and fees for one academic year, renewable for up to four awards or bachelor's completion",
    deadline: "Apply through the eligible institution's financial-aid office; dates vary by school",
    deadlineMonth: null,
    who: "New Mexico residents who graduated in the top 5% of their class or earned at least a 25 ACT or 1140 SAT, meet the $60,000 family-income cap, and enroll full time as an undergraduate at an eligible New Mexico public or private nonprofit institution before age 21.",
  },
  "tx-first-texas": {
    amount: "One or two semesters, each equal to the then-current maximum TEXAS Grant award",
    deadline: "District verification required; benefit expires after the first academic year following high-school graduation",
    deadlineMonth: null,
    who: "Texas residents earning a Texas First Diploma who enroll at a Texas public college or university; graduation one semester early provides one semester of eligibility, while graduation at least two semesters early provides two.",
  },
  "ok-donna-george-nigh-oklahoma": {
    amount: "$1,000 one-time, nonrenewable award",
    deadline: "Institution nomination before the spring semester; contact the college or university",
    deadlineMonth: null,
    who: "Full-time Oklahoma-resident undergraduates pursuing a public-service career; each participating institution's president may submit one nominee annually.",
  },
  "ok-baccalaureate-oklahoma-regional": {
    amount: "$3,500 per year plus a resident tuition waiver, for up to eight semesters or bachelor's completion",
    deadline: "Apply directly to a participating university; deadlines vary by institution",
    deadlineMonth: null,
    who: "Oklahoma residents with at least a 30 ACT or National Merit Semifinalist or Commended status attending one of the 11 participating regional universities; the award is not portable between institutions.",
  },
  "ok-act-independent-living-oklahoma": {
    deadline: "Contact the institution or Oklahoma State Regents for application instructions",
    deadlineMonth: null,
    who: "Oklahoma residents who spent at least nine months in DHS foster custody between ages 16 and 18, completed an Oklahoma high-school diploma or GED within the prior three years, and enroll by age 26 at an eligible public institution or CareerTech program.",
  },
  "la-challenge-go-louisiana-youth": {
    deadline: "File the FAFSA and work through the participating institution; no standalone central deadline is posted",
    deadlineMonth: null,
    who: "Louisiana Youth ChalleNGe completers with a Louisiana high-school-equivalency diploma who enroll full time in an eligible three- to five-star program and meet the criminal-record, annual FAFSA, 24-hour pace, and 2.5 GPA renewal rules.",
  },
  "ca-california-dependents-enforcement-law": {
    amount: "Award matching the applicable Cal Grant amount for up to four years",
    deadline: "File the annual FAFSA or California Dream Act Application and a separate LEPD application",
    deadlineMonth: null,
    who: "Qualifying spouses and dependents of California law-enforcement officers or firefighters killed or permanently disabled in the line of duty who meet the program's income, need, and postsecondary eligibility rules.",
  },
  "wa-opportunity-washington": {
    name: "Washington State Opportunity Scholarship — Baccalaureate Scholarship",
    deadline: "January 14–February 26, 2026; current cycle closed",
    deadlineMonth: 2,
  },
  "tx-leadership-scholars-texas": {
    amount: "Institution-set need-based scholarship plus mentoring, leadership development, and other student support",
    deadline: "Fall 2026 cycle closed; high-school recommendations were due February 19, 2026",
    deadlineMonth: 2,
    who: "Eligible Texas public-high-school seniors who obtain the application through school staff, demonstrate financial need and leadership, and enroll full time at a participating public university; the initial award is not transferable.",
  },
  "academic-excellence-nys": {
    deadline: "Counselor nomination; deadline varies by high school",
    deadlineMonth: null,
    who: "New York high-school seniors nominated by their school from Regents performance who attend an eligible New York college full time and complete the FAFSA plus TAP or DREAM Act payment application each year.",
  },
  "nj-center-jersey-new-trade": {
    amount: "Tuition, fees, room, and board under HESAA's cost-of-attendance and other-aid formula",
    deadline: "Apply through NJFAMS by the applicable annual state-aid deadline",
    deadlineMonth: null,
  },
  "nj-care-foster-jersey-new": {
    amount: "Up to $5,000 per academic year, plus a separate tuition-and-approved-fee waiver at New Jersey public institutions",
    deadline: "Complete the annual NJFAMS and Embrella process by the published cycle dates",
    deadlineMonth: null,
  },
  "ct-chesla-undergraduate": {
    deadline: "2026 cycle closed; reopens March 1, 2027 for 2027–28",
    deadlineMonth: null,
  },
  "ct-children-connecticut-dependent-duty": {
    amount: "Statutory tuition waiver at an eligible Connecticut public institution, reduced by qualifying employer reimbursement",
    deadline: "Submit required documentation through the public institution",
    deadlineMonth: null,
  },
  "ma-massachusetts-public-service": {
    amount: "Full annual tuition at a Massachusetts public institution, or the UMass Amherst full-time annual tuition amount at an eligible independent institution",
    deadline: "May 1, 2027",
    deadlineMonth: 5,
    who: "Full-time Massachusetts undergraduate students who are qualifying children or widowed spouses of covered public-safety officers killed in service, or qualifying children of Massachusetts-credited POW/MIA or deceased veterans; annual financial-aid and renewal applications apply.",
  },
  "ma-abigail-adams-john": {
    amount: "Institution-set tuition credit for up to eight semesters",
    deadline: "Automatic eligibility notice, followed by annual FAFSA and institution certification",
    deadlineMonth: null,
  },
  "ma-certificate-koplik-mastery-stanley": {
    name: "Stanley Z. Koplik Certificate of Mastery Tuition Credit (Massachusetts)",
    deadline: "Apply through the high-school coordinator, then complete the institution and annual FAFSA process",
    deadlineMonth: null,
    who: "Massachusetts students who earn the Stanley Z. Koplik Certificate through the required MCAS and additional achievement criteria and maintain at least a 3.3 college GPA.",
  },
  "ma-paul-tsongas": {
    deadline: "Apply through a participating state university; deadlines vary by institution",
    deadlineMonth: null,
    who: "Qualifying Massachusetts high-school seniors entering a participating state university; each institution may make five new awards, and recipients file the FAFSA and maintain a 3.3 GPA for renewal.",
  },
  "ma-adopted-assistance-child-dcf": {
    who: "Massachusetts students age 24 or younger who were adopted through DCF, have no prior bachelor's degree, file the FAFSA, and pursue eligible undergraduate public-institution study; graduate and medical programs are excluded and funding is subject to appropriation.",
  },
  "masstransfer": {
    name: "MassTransfer Tuition Credit Program",
    amount: "Campus-specific tuition credit for up to two years after transfer",
    deadline: "Complete the mapped MassTransfer and receiving-institution process",
    deadlineMonth: null,
    who: "Students completing a mapped MassTransfer A2B associate pathway at a Massachusetts community college with at least a 3.0 GPA who transfer to a participating public bachelor's program within one year.",
  },
  "ma-paraprofessional-preparation-teacher": {
    who: "Massachusetts public-school paraprofessionals with at least two years of employment who have no bachelor's degree, remain employed as a paraprofessional, and pursue an eligible undergraduate teacher-preparation pathway.",
  },
  "ma-demand-massachusetts": {
    who: "Massachusetts undergraduate and graduate students in a currently approved in-demand program; part-time and graduate recipients enroll in at least six credits, and awards may be modified if appropriations are insufficient.",
    tags: ["workforce", "scholarship", "massachusetts", "graduate-students"],
  },
  "ma-childhood-early-educators": {
    amount: "$350–$750 per credit, up to $3,150–$6,750 per semester depending on institution type",
    deadline: "2026–27 application opened April 1, 2026 through the MASSAid Student Portal",
    deadlineMonth: null,
    who: "Current or prospective Massachusetts early-childhood or out-of-school-time educators pursuing an eligible certificate, associate, bachelor's, or master's program and meeting the employment or one-year employment-transition rules.",
    tags: ["early-childhood", "workforce", "scholarship", "massachusetts", "graduate-students"],
  },
  "ma-valedictorian": {
    amount: "100% tuition waiver at an eligible Massachusetts public institution; fees are not included",
    deadline: "Apply through the institution; requirements and deadlines vary by campus",
    deadlineMonth: null,
    who: "Massachusetts high-school valedictorians who meet the one-year state-residency rule, file the FAFSA annually, and enter an eligible public degree program.",
  },
  "higher-nh-orphans-veterans": {
    amount: "Free tuition at New Hampshire public institutions plus up to $2,500 per year for other higher-education costs",
    deadline: "September 1",
    deadlineMonth: 9,
    who: "Qualifying New Hampshire residents ages 16–25 whose veteran parent died on active duty or from a service-connected cause; benefits are limited to four years.",
  },
  "action-ccsnh-children-combatants": {
    deadline: "Apply through the CCSNH institution",
    deadlineMonth: null,
    who: "Children of qualifying New Hampshire-domiciled combatants whose missing-in-action status arose during the Southeast Asian conflict and remains in effect while the student receives free tuition.",
  },
  "ccsnh-children-fallen-firefighters": {
    deadline: "Apply through the CCSNH institution with required proof",
    deadlineMonth: null,
    who: "New Hampshire residents under age 25 whose firefighter or police-officer parent died in an RSA 281-A-compensable line-of-duty event.",
  },
  "ccsnh-children-disabled-nh": {
    deadline: "Complete the CCSNH board and institution process, including FAFSA cooperation",
    deadlineMonth: null,
    who: "Biological, adopted, or qualifying stepchildren of eligible New Hampshire veterans with a 100% permanent and total VA disability and an other-than-dishonorable discharge; state domicile/residence rules apply through the semester the student turns 27.",
  },
  "ccsnh-children-foster": {
    deadline: "Apply annually through DCYF and the public institution",
    deadlineMonth: null,
    who: "Qualifying students under age 26 from current New Hampshire foster-care, former custody, guardianship, or interstate-placement categories; awards are capped at up to 35 recipients in each of CCSNH and USNH annually.",
  },
  "nh-ccsnh-hampshire-high-new": {
    amount: "Tuition for up to 32 credits across one fall, spring, and summer year; fees are excluded",
    deadline: "Apply through AwardSpring before the semester begins",
    deadlineMonth: null,
    who: "New Hampshire-resident valedictorians who matriculate at CCSNH within 15 months of high-school graduation.",
  },
  "ccsnh-nh-scholars": {
    deadline: "Apply through AwardSpring; reviewed before the semester",
    deadlineMonth: null,
    amount: "$500; each CCSNH college awards up to 12 scholarships across high schools in its region",
    who: "Recent New Hampshire Scholars curriculum completers, with regional priority and final discretion held by the CCSNH college president.",
  },
  "ccsnh-competition-skillsusa-winners": {
    amount: "$5,000 tuition-only scholarship; fees, books, and supplies are excluded",
    deadline: "Awarded from verified SkillsUSA competition results for use in the academic year after graduation",
    deadlineMonth: null,
    who: "Documented in-state or out-of-state first-place SkillsUSA high-school winners from competitions with at least five competitors who enter a related CCSNH field after graduation.",
  },
  "va-transfer-two-virginia-year": {
    deadline: "Apply by the receiving four-year institution's financial-aid deadline",
    deadlineMonth: null,
    who: "Virginia residents with an associate degree and at least a 3.0 GPA from a Virginia public two-year college who transfer full time in the immediately following fall or spring to a participating four-year institution and have an SAI of 15,000 or less.",
  },
  "md-2-2-maryland-transfer": {
    deadline: "January 15–October 15, 2026; supporting documents due in November or February as applicable",
    deadlineMonth: null,
    who: "Eligible Maryland associate-degree students who meet the current degree-completion, 2.5-GPA, SAI, and transfer-timing rules and enter full-time bachelor's study at a participating Maryland institution.",
  },
  "md-assistance-maryland-shortage-workforce": {
    deadline: "January 15–October 15, 2026",
    deadlineMonth: null,
    who: "Maryland undergraduate and graduate students in a currently eligible workforce-shortage major or service area, including qualifying low-credit enrollment patterns.",
    tags: ["state-maryland", "occupation-specific", "workforce-shortage", "graduate-students"],
  },
  "md-collins-honor-iii-leadership": {
    deadline: "2025–26 cycle closed April 1, 2026; apply through the current MHEC process",
    deadlineMonth: null,
    who: "Eligible undergraduate and graduate ROTC students at Bowie State, Coppin State, Morgan State, or UMES; recipients must meet the program's enrollment and in-state-tuition rules.",
    tags: ["state-maryland", "hbcu", "rotc", "graduate-students"],
  },
  "fl-benacquisto-florida": {
    amount: "Participating institution's in-state cost of attendance minus Bright Futures and National Merit awards",
    deadline: "No initial application; qualifying National Merit Scholars coordinate with the participating institution",
    deadlineMonth: null,
    who: "Qualifying National Merit Scholars entering full-time baccalaureate study who meet current Florida residency or high-school exceptions and the participating-college sponsorship rules.",
  },
  "al-alabama-assistance-educational-firefighter": {
    deadline: "Initial and renewal forms are available; no fixed deadline is published",
    deadlineMonth: null,
    who: "Qualifying dependents and eligible spouses of Alabama police officers, firefighters, or rescue-squad members killed or totally disabled in the line of duty, subject to the program's age and remarriage rules for undergraduate public-institution study.",
  },
  "ms-mississippi-niss": {
    deadline: "October 1–March 1 each year; 2026–27 cycle closed",
    deadlineMonth: 3,
    who: "Current-year Mississippi graduating seniors with financial need who meet the academic rules, enter a first associate or bachelor's program full time, and submit the required automotive-industry essay; typically one or two recipients are selected.",
  },
  "tn-helping-heroes-tennessee": {
    amount: "$500 per term at 6–11 credits or $1,000 at 12 or more credits",
    deadline: "September 1 for fall; March 1 for spring; May 1 for summer; apply annually",
    deadlineMonth: null,
    who: "Qualifying honorably discharged veterans or current/former Tennessee National Guard and Reserve members without a bachelor's degree who submit the required DD-214 and meet the service-medal rules.",
  },
  "tn-mcwherter-ned-scholars-tennessee": {
    amount: "$6,000 per year through equal term installments, half state-funded and half institution-matched",
    deadline: "March 1 during the final high-school year; limited funding prioritizes renewals",
    deadlineMonth: 3,
  },
  "tn-hope-nontraditional-tennessee": {
    amount: "Up to $2,250 per full-time term in years one and two or $2,850 in years three and four, limited to program-of-study courses",
    deadline: "September 1 for fall; March 1 for spring; May 1 for summer",
    deadlineMonth: null,
  },
  "mo-advanced-incentive-missouri-placement": {
    deadline: "June 1, 2027",
    deadlineMonth: 6,
    who: "Missouri public-high-school graduates with two qualifying AP scores whose postsecondary institution certifies Access Missouri or A+ eligibility and who attach the College Board score report.",
  },
  "mo-child-employee-missouri-officer": {
    deadline: "No fixed deadline; earliest complete applications receive limited-funding priority and summer is excluded",
    deadlineMonth: null,
    who: "Qualifying natural, adopted, or stepchildren, spouses, and permanently and totally disabled Missouri public-safety officers or employees; full-time enrollment is normally required, with a six-credit disability accommodation.",
  },
  "mo-missouri-s-survivors-veteran": {
    amount: "Tuition benchmark plus up to $2,000 per semester for room and board and up to $500 per semester for books",
    deadline: "Initial applications have no deadline; renewals receive priority by May 1; no summer awards",
    deadlineMonth: null,
    who: "Qualifying Missouri wartime-veteran survivors enrolled at least half time at a participating public institution; the program is capped at 25 recipients and follows a funding priority order.",
  },
  "ks-hero-kansas-s": {
    deadline: "July 1 for summer; September 1 for fall; February 1 for spring; first-come limited funding",
    deadlineMonth: null,
  },
  "ks-kansas-nursing-service": {
    amount: "$2,000–$6,250 per year based on nursing program, credits, and sponsorship",
    deadline: "June 1; 2026–27 cycle closed",
    deadlineMonth: 6,
    who: "Eligible LPN or RN students enrolled in at least six credits who sign a promissory note and complete one year of Kansas nursing service per award year; unmet service can trigger repayment at 5% interest.",
  },
  "ks-kansas-service-teacher": {
    amount: "$1,373–$6,860 per year based on enrollment from 3 to 12 or more credits",
    deadline: "June 1, 2026; current cycle closed",
    deadlineMonth: 6,
    who: "Eligible Kansas bachelor's, master's, and licensed-teacher endorsement students in hard-to-fill disciplines or underserved areas who sign a promissory note and complete one year of service per award year; unmet service can trigger 5% interest.",
    tags: ["state", "education", "teaching", "kansas", "graduate-students"],
  },
  "ne-attracting-excellence-nebraska-teaching": {
    deadline: "April 15–June 1, 2026; current cycle closed",
    deadlineMonth: null,
    who: "Nebraska undergraduate or graduate initial-certification students receiving a forgivable loan that requires full-time Nebraska teaching; forgiveness begins after two years of qualifying service.",
  },
  "ne-aetp-forgivable-loan-nebraska": {
    deadline: "April 15–June 1, 2026; current cycle closed",
    deadlineMonth: null,
    who: "Nebraska undergraduate or graduate initial-certification students in their student-teaching term who accept a forgivable loan requiring full-time Nebraska teaching service.",
    tags: ["state", "education", "teaching", "forgivable-loan", "nebraska", "graduate-students"],
  },
  "ca-completion-success": {
    deadline: "File the FAFSA or California Dream Act Application by the applicable Cal Grant deadline; eligible colleges award automatically",
    deadlineMonth: null,
    who: "Cal Grant B or C recipients at California Community Colleges who enroll in at least 12 units, maintain a 2.0 GPA, and successfully complete their units each term.",
  },
  "ks-adult-kansas-learner": {
    amount: "$1,500–$3,000 per semester for 6–12 or more credits in fall and spring",
    deadline: "2026–27 cycle closed; 2027–28 opens in early January 2027",
    deadlineMonth: null,
    who: "Kansas residents age 25 or older pursuing an eligible bachelor's degree who accept a two-year Kansas work or residency obligation; failure can trigger repayment at 5% interest.",
  },
  "ok-oklahoma-ready-regents-workforce": {
    amount: "$3,000 at a two-year institution, $5,000 at a regional university, or $7,000 at a research university",
    deadline: "Apply by the published deadline; selections occur in spring for payment the following fall",
    deadlineMonth: null,
    who: "Oklahoma public-system undergraduates in qualifying high-demand programs who submit the required career portfolio, support letter, and transcript; a six-credit hardship exception is available.",
  },
  "al-alabama-alabama-engage": {
    amount: "Up to $1,500 per term for associate students or $3,000 for bachelor's students; 6–11 credits pay $125 or $250 per credit",
    deadline: "September 15 fall; January 15 winter; February 15 spring; June 15 summer",
    deadlineMonth: null,
    who: "Alabama adults age 25 or older returning after at least 24 months of nonattendance to complete a first eligible associate or bachelor's degree; religious degrees are excluded.",
  },
  "in-daniels-early-graduation-mitch": {
    deadline: "August 31, 2026; 2027–28 application opens November 1, 2026",
    deadlineMonth: null,
    who: "Indiana students who meet the two-semester settlement and public-school-attendance rules, graduate at least one year early without grade-12 enrollment, and enter an eligible institution full time the following fall.",
  },
  "c-carl-charitable-trust": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Full-time undergraduate, graduate, or postgraduate students in eligible arts or medical fields who submit the required financial documents; up to two nonrenewable awards are made and prior applicants may reapply.",
  },
  "cla-opportunity": {
    amount: "$15,000 one-time award",
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Full-time undergraduate or graduate students in eligible business and technology fields with at least a 2.5 GPA and demonstrated need; specified CLA affiliates and family members are excluded.",
  },
  "ellevation": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "High-school seniors with signed verification of prior K–12 English Learner enrollment who enter full-time undergraduate or trade study; awards are one-time and employee children and past recipients are excluded.",
  },
  "families-frontline": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Children age 26 or younger of qualifying employees who died from COVID-19 contracted while working at a licensed medical facility; full- and part-time undergraduates may reapply for up to four awards.",
  },
  "ibtta": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Full-time domestic or international undergraduate and graduate students in transportation-related fields; undergraduates need at least 24 completed credits and a 2.5 GPA, and family exclusions and one-time terms apply.",
  },
  "invictus-verus": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Currently enrolled part- or full-time undergraduates in eligible business and professional fields with demonstrated financial need; prior applicants may reapply.",
  },
  "hola-microsoft": {
    amount: "One-time $2,500, $5,000, or $10,000 award",
    deadline: "2026 cycle closed; next-cycle information is tentative",
    deadlineMonth: null,
    who: "Eligible U.S.-based Hispanic or Latinx high-school seniors entering full-time study in approved majors with at least a 3.0 GPA; specified Microsoft employee-family applicants are excluded.",
  },
  "association-chairs-hydropower-legacy": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Current college sophomores, juniors, or seniors entering full-time junior-, senior-, or graduate-level study in a hydropower-related field; one award is made and prior applicants may reapply.",
  },
  "culinary-nicole-reed-v": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "U.S. residents age 25 or younger entering full-time undergraduate culinary study; one award is made and past recipients are ineligible.",
  },
  "booster-parent-usa": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "High-school seniors or graduates from the prior year associated with a Parent Booster USA member organization who supply its ID, are not yet in higher education, and enter full-time undergraduate study; up to 25 awards are available.",
  },
  "pega-scholars": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Qualifying technology students in Australia, Brazil, Canada, India, Poland, Singapore, the Netherlands, the United Kingdom, or the United States who remain continuously enrolled part or full time; past recipients and employee families are excluded.",
  },
  "america-essential-visionaries": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "U.S. residents with at least a 2.5 GPA entering part- or full-time undergraduate or vocational study in nursing or eligible K–12-focused helping professions; awards may renew.",
  },
  "america-educators-veteran": {
    amount: "$1,000–$10,000 based on certification pathway, institution type, and enrollment intensity",
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Honorably discharged veterans who are high-school or GED graduates entering eligible certificate, undergraduate, or master's educator pathways part or full time with at least a 2.0 GPA; doctoral study is excluded.",
    tags: ["veterans", "education", "scholarship america", "graduate-students"],
  },
  "snc-stem": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "U.S. citizens entering U.S.-based part- or full-time nonmedical STEM study with demonstrated need; five awards are made and prior applicants may reapply.",
  },
  "tacp": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Qualifying TACP service members, veterans, children, and spouses entering vocational, undergraduate, or graduate study part or full time; up to four awards are made and prior applicants may reapply.",
  },
  "bay-buccaneers-football-is": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Female high-school seniors participating in football who enter a four-year program full time and demonstrate need; up to four one-time awards are made and past recipients are ineligible.",
  },
  "foods-scholars-us": {
    amount: "$20,000; up to 20 awards",
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Eligible students age 18 or older entering full-time undergraduate hospitality or related study who demonstrate need and participate in required development programming; specified US Foods employee families are excluded.",
  },
  "health-mental-scholars-voya": {
    deadline: "2026 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Eligible SUNY mental-health students with at least a 2.5 GPA and demonstrated need; up to five nonrenewable awards are made, applicants may reapply, and specified Voya employees and children are excluded.",
  },
  "chubb-worldwide": {
    amount: "$2,500–$6,000",
    deadline: "2026 cycle closed; next-cycle information is tentative",
    deadlineMonth: null,
    who: "Children age 25 or younger of full-time Chubb employees with at least two years of service who enter or continue full-time undergraduate study.",
  },
  "frist-patricia": {
    deadline: "2026–27 cycle closed; next dates not yet posted",
    deadlineMonth: null,
    who: "Dependent children age 26 or younger of qualifying HCA Healthcare employees who meet tenure and executive-family rules and enter an eligible nonprofit school full time; preference and renewal rules apply.",
  },
  "leaders-pedro-young-zamora": {
    deadline: "2026 cycle closed; reopens March 1, 2027",
    deadlineMonth: null,
    who: "Current or incoming undergraduates age 27 or younger enrolling at a U.S. community college or four-year institution and doing documented health or social-justice change-making work.",
    stages: ["college"],
  },
  "legacy-swine-uspce": {
    deadline: "2026 cycle closed; next cycle opens in early fall 2026",
    deadlineMonth: null,
    who: "U.S.-citizen third- or fourth-year undergraduates and graduate or veterinary students pursuing swine-industry careers; two undergraduate and one graduate award require the official essay, recommendations, and supporting materials.",
  },
  "dairy-shrine": {
    amount: "$1,500–$3,000 across the current named 2026 awards",
    deadline: "March 1–April 15; 2026 cycle closed",
    deadlineMonth: null,
    who: "Eligible certificate, two-year, and four-year dairy-focused undergraduates, plus qualifying graduate students through the Kildee award.",
    tags: ["agriculture", "dairy", "livestock", "graduate-students"],
  },
  "cooperative-english-glenn-leadership": {
    amount: "$14,000 scholarship awarded each year; not described as a renewable annual installment",
    deadline: "May 10, 2026 deadline passed",
    deadlineMonth: 5,
    who: "Full-time U.S.-citizen students pursuing a first bachelor's degree who have completed at least one semester or one year of college credit and previously attended NRECA's Youth Tour; family exclusions apply.",
  },
  "competition-gcsaa-scholars": {
    deadline: "March 1–May 1; 2026 cycle closed",
    deadlineMonth: null,
    who: "Free GCSAA student members in eligible golf or turfgrass programs with at least 24 credits completed; graduating seniors are excluded and required reports and essays apply.",
  },
  "christian-legacy-sun-vanna": {
    amount: "$10,100 first place, $7,560 second place, and $2,540 third place",
    deadline: "May 10, 2026; cycle closed and no future cycle is posted",
    deadlineMonth: 5,
  },
  "angels-s-thai-u": {
    amount: "$5,000 for community college or trade school or $10,000 for university, disbursed over the degree based on need and enrollment",
    deadline: "June 12, 2026; cycle closed",
    deadlineMonth: 6,
  },
  "graphics-print": {
    deadline: "May 1, 2026 cycle closed; reopens November 1, 2026",
    deadlineMonth: null,
    who: "High-school seniors, full-time undergraduates, working professionals in part-time or online graphic-communications study, and qualifying graduate-fellowship applicants.",
    tags: ["printing", "graphic-communications", "packaging", "national", "professional-association", "graduate-students"],
  },
  "aatcc-textile-undergraduate": {
    amount: "$500–at least $5,000 across current named undergraduate textile scholarships",
    deadline: "Current cycle closed; next cycle November 1, 2026–February 28, 2027",
    deadlineMonth: null,
  },
  "archie-gus-spe": {
    deadline: "April 15; 2026 cycle closed",
    deadlineMonth: 4,
    who: "Outstanding incoming or first-year undergraduate petroleum-engineering students; SPE student membership was free for 2026 and must be rechecked when 2027 dues return.",
  },
  "academic-assp": {
    amount: "At least $1,000 per individual academic scholarship; cycle-specific amounts vary",
    deadline: "October 15, 2025–February 15, 2026; current cycle closed",
    deadlineMonth: null,
  },
  "academic-bcsp-qualified": {
    deadline: "August 1–September 25, 2026",
    deadlineMonth: null,
    who: "Juniors, seniors, and master's students in good standing at a U.S.-based BCSP Qualified Academic Program; the public rules do not currently state the former full-time or 3.25-GPA requirements.",
  },
  "aas-environmental-health-neha": {
    deadline: "2026 cycle closed; check back in fall 2026 for the 2027 cycle",
    deadlineMonth: null,
  },
  "american-art-auxiliary-contest": {
    amount: "2D national prizes: $15,000 first; $7,500 second; $3,500 third; $1,500 fourth–fifth; $1,000 sixth–seventh; $500 eighth–nineteenth",
    deadline: "March 31; 2025–26 cycle closed",
    deadlineMonth: 3,
    who: "Students in grades 9–12 submitting original patriotic-themed 2D artwork through a local VFW Auxiliary; the separate 3D contest is not included in this record.",
  },
};

export function applyScholarshipAuditCuration<
  T extends {
    id: string;
    officialUrl: string;
  },
>(records: readonly T[]): T[] {
  const catalogIds = new Set(records.map((record) => record.id));
  const missingPassedIds = [...scholarshipPublishedIds].filter(
    (id) => !catalogIds.has(id),
  );
  if (missingPassedIds.length > 0) {
    throw new Error(
      `Audit pass list references missing scholarship IDs: ${missingPassedIds.join(", ")}`,
    );
  }

  const curated = records
    .filter((record) => scholarshipPublishedIds.has(record.id))
    .map((record) => {
      const override = scholarshipAuditRecordOverrides[record.id] ?? {};
      const officialUrl =
        scholarshipAuditSourceOverrides[record.id] ??
        scholarshipAmountFloorSourceOverrides[record.id] ??
        override.officialUrl ??
        record.officialUrl;
      return { ...record, ...override, officialUrl } as T;
    });

  if (curated.length !== SCHOLARSHIP_PUBLIC_TOTAL) {
    throw new Error(
      `Expected ${SCHOLARSHIP_PUBLIC_TOTAL} published scholarships; received ${curated.length}.`,
    );
  }

  return curated;
}
