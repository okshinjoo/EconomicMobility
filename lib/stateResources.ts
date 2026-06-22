// Per-state official resource links for the Resources page's "find local help"
// picker. Every URL here was web-researched and verified to resolve to the
// official state agency / resident-facing portal (or the 211.org national
// fallback where a state has no single canonical 211 site). These are live
// government sites that occasionally reorganize — if one breaks, re-verify and
// update it here; never replace a verified link with a guess.
//
// Keyed by the two-letter code used in `US_STATES` (lib/taxData.ts), covering
// all 50 states + DC.

export interface StateLink {
  label: string;
  url: string;
}

export interface StateResource {
  /** Apply for/manage SNAP, Medicaid, and cash assistance. */
  benefits: StateLink;
  /** File an unemployment claim. */
  unemployment: StateLink;
  /** Local help with food, rent, and utilities (211). */
  localHelp: StateLink;
}

const FALLBACK_211: StateLink = {
  label: "211 (local help)",
  url: "https://www.211.org",
};

export const stateResources: Record<string, StateResource> = {
  AL: {
    benefits: { label: "MyDHR Alabama", url: "https://mydhr.alabama.gov/" },
    unemployment: { label: "AL Claimant Portal", url: "https://uiclaimantportal.labor.alabama.gov/" },
    localHelp: { label: "211 Connects Alabama", url: "https://www.211connectsalabama.org/" },
  },
  AK: {
    benefits: { label: "Alaska ARIES Portal", url: "https://aries.alaska.gov/screener/" },
    unemployment: { label: "Alaska UI", url: "https://labor.alaska.gov/unemployment/" },
    localHelp: { label: "Alaska 211", url: "https://alaska211.org/" },
  },
  AZ: {
    benefits: { label: "Health-e-Arizona Plus", url: "https://www.healthearizonaplus.gov/" },
    unemployment: { label: "Arizona UI", url: "https://uibenefits.az.gov/" },
    localHelp: { label: "211 Arizona", url: "https://211arizona.org/" },
  },
  AR: {
    benefits: { label: "Access Arkansas", url: "https://access.arkansas.gov/" },
    unemployment: { label: "Arkansas EZARC", url: "https://www.ezarc.adws.arkansas.gov/" },
    localHelp: { label: "Arkansas 211", url: "https://arkansas211.org/" },
  },
  CA: {
    benefits: { label: "BenefitsCal", url: "https://benefitscal.com/" },
    unemployment: { label: "California EDD", url: "https://edd.ca.gov/en/unemployment/" },
    localHelp: { label: "211 California", url: "https://211ca.org/" },
  },
  CO: {
    benefits: { label: "Colorado PEAK", url: "https://peak.my.site.com/peak/s/peak-landing-page" },
    unemployment: { label: "Colorado MyUI+", url: "https://cdle.colorado.gov/unemployment/file-a-claim" },
    localHelp: { label: "211 Colorado", url: "https://www.211colorado.org/" },
  },
  CT: {
    benefits: { label: "Connecticut DSS", url: "https://portal.ct.gov/dss/how-to-apply" },
    unemployment: { label: "ReEmployCT", url: "https://portal.ct.gov/dol/unemployment-benefits" },
    localHelp: { label: "211 Connecticut", url: "https://www.211ct.org/" },
  },
  DE: {
    benefits: { label: "Delaware ASSIST", url: "https://assist.dhss.delaware.gov/" },
    unemployment: { label: "Delaware UI", url: "https://labor.delaware.gov/divisions/unemployment-insurance/file-an-unemployment-claim/" },
    localHelp: { label: "Delaware 211", url: "https://delaware211.org/" },
  },
  DC: {
    benefits: { label: "District Direct", url: "https://districtdirect.dc.gov/ua/" },
    unemployment: { label: "DC DOES Unemployment", url: "https://unemployment.dc.gov/" },
    localHelp: FALLBACK_211,
  },
  FL: {
    benefits: { label: "MyACCESS Florida", url: "https://myaccess.myflfamilies.com" },
    unemployment: { label: "FL Reemployment Asst.", url: "https://www.floridajobs.org/Reemployment-Assistance-Service-Center/reemployment-assistance/claimants" },
    localHelp: { label: "211 Florida", url: "https://fl211.org" },
  },
  GA: {
    benefits: { label: "Georgia Gateway", url: "https://gateway.ga.gov/access/" },
    unemployment: { label: "GA Dept. of Labor", url: "https://dol.georgia.gov/file-unemployment-insurance-claim" },
    localHelp: { label: "211 Georgia", url: "https://unitedwayga.org/ga211/" },
  },
  HI: {
    benefits: { label: "Hawaii DHS Benefits", url: "https://pais.dhs.hawaii.gov/PAIS/#!/" },
    unemployment: { label: "Hawaii UI", url: "https://labor.hawaii.gov/ui/" },
    localHelp: { label: "Aloha United Way 211", url: "https://auw211.org" },
  },
  ID: {
    benefits: { label: "idalink", url: "https://idalink.idaho.gov" },
    unemployment: { label: "Idaho Claimant Portal", url: "https://www2.labor.idaho.gov/ClaimantPortal/" },
    localHelp: { label: "211 Idaho CareLine", url: "https://healthandwelfare.idaho.gov/services-programs/211" },
  },
  IL: {
    benefits: { label: "Illinois ABE", url: "https://abe.illinois.gov" },
    unemployment: { label: "IDES File a Claim", url: "https://ides.illinois.gov/unemployment/file-a-claim.html" },
    localHelp: { label: "211 Illinois", url: "https://211illinois.org" },
  },
  IN: {
    benefits: { label: "FSSA Benefits Portal", url: "https://fssabenefits.in.gov/bp/" },
    unemployment: { label: "Indiana Uplink (DWD)", url: "https://www.in.gov/dwd/indiana-unemployment/file" },
    localHelp: { label: "Indiana 211", url: "https://www.in.gov/fssa/indiana-211/" },
  },
  IA: {
    benefits: { label: "Iowa HHS Portal", url: "https://hhsservices.iowa.gov" },
    unemployment: { label: "IowaWORKS", url: "https://www.iowaworks.gov" },
    localHelp: { label: "211 Iowa", url: "https://211iowa.org" },
  },
  KS: {
    benefits: { label: "Kansas DCF Portal", url: "https://cssp.kees.ks.gov/apspssp/sspNonMed.portal" },
    unemployment: { label: "Kansas UI", url: "https://www.getkansasbenefits.gov" },
    localHelp: FALLBACK_211,
  },
  KY: {
    benefits: { label: "kynect benefits", url: "https://kynect.ky.gov/benefits/s/?language=en_US" },
    unemployment: { label: "Kentucky UI Portal", url: "https://uiclaimsportal.ky.gov" },
    localHelp: { label: "Kentucky 211", url: "https://kentucky211.org" },
  },
  LA: {
    benefits: { label: "LA CAFÉ Self-Service", url: "https://www.dcfs.la.gov/CAFE" },
    unemployment: { label: "Louisiana HiRE", url: "https://www.louisianaworks.net/hire/" },
    localHelp: { label: "Louisiana 211", url: "https://www.louisiana211.org" },
  },
  ME: {
    benefits: { label: "My Maine Connection", url: "https://www.mymaineconnection.gov" },
    unemployment: { label: "ReEmployME", url: "https://www.maine.gov/unemployment" },
    localHelp: { label: "211 Maine", url: "https://211maine.org" },
  },
  MD: {
    benefits: { label: "myMDTHINK", url: "https://benefits.maryland.gov/home" },
    unemployment: { label: "Maryland BEACON", url: "https://beacon.labor.maryland.gov" },
    localHelp: { label: "211 Maryland", url: "https://211md.org" },
  },
  MA: {
    benefits: { label: "DTA Connect", url: "https://dtaconnect.eohhs.mass.gov" },
    unemployment: { label: "MA Unemployment", url: "https://unemployment.mass.gov/Claimants/_/" },
    localHelp: { label: "Mass 211", url: "https://mass211.org" },
  },
  MI: {
    benefits: { label: "MI Bridges", url: "https://newmibridges.michigan.gov" },
    unemployment: { label: "Michigan UIA", url: "https://www.michigan.gov/uia" },
    localHelp: { label: "Michigan 211", url: "https://mi211.org" },
  },
  MN: {
    benefits: { label: "MNbenefits", url: "https://mnbenefits.mn.gov" },
    unemployment: { label: "MN Unemployment", url: "https://www.uimn.org/applicants/" },
    localHelp: { label: "United Way 211", url: "https://211unitedway.org" },
  },
  MS: {
    benefits: { label: "Mississippi ACCESS", url: "https://www.access.ms.gov" },
    unemployment: { label: "MDES Claims", url: "https://www.mdes.ms.gov/unemployment-claims/" },
    localHelp: FALLBACK_211,
  },
  MO: {
    benefits: { label: "myDSS Food Assistance", url: "https://mydss.mo.gov/food-assistance" },
    unemployment: { label: "Missouri UInteract", url: "https://uinteract.labor.mo.gov" },
    localHelp: { label: "Missouri 211", url: "https://www.211helps.org" },
  },
  MT: {
    benefits: { label: "Montana apply.mt.gov", url: "https://apply.mt.gov" },
    unemployment: { label: "MT UI Claimant Center", url: "https://uiclaimant.mt.gov" },
    localHelp: { label: "Montana 211", url: "https://montana211.org" },
  },
  NE: {
    benefits: { label: "iServe Nebraska", url: "https://iserve.nebraska.gov/" },
    unemployment: { label: "File a UI claim (NDOL)", url: "https://dol.nebraska.gov/uibenefits" },
    localHelp: { label: "Nebraska 211", url: "https://uwm211.org/" },
  },
  NV: {
    benefits: { label: "Access Nevada", url: "https://accessnevada.nv.gov/public/landing-page" },
    unemployment: { label: "Nevada UI (DETR)", url: "https://detr.nv.gov/Page/Unemployment_Insurance_Benefits" },
    localHelp: { label: "Nevada 211", url: "https://www.nevada211.org/" },
  },
  NH: {
    benefits: { label: "NH EASY", url: "https://nheasy.nh.gov/" },
    unemployment: { label: "File for benefits (NHES)", url: "https://www.nhes.nh.gov/individuals/file-unemployment-benefits" },
    localHelp: { label: "211 NH", url: "https://211nh.org/" },
  },
  NJ: {
    benefits: { label: "NJHelps", url: "https://www.njhelps.gov/" },
    unemployment: { label: "NJ Unemployment", url: "https://www.nj.gov/labor/myunemployment/" },
    localHelp: { label: "NJ 211", url: "https://nj211.org/" },
  },
  NM: {
    benefits: { label: "YESNM", url: "https://yes.nm.gov/" },
    unemployment: { label: "NM Workforce Connection", url: "https://www.jobs.dws.nm.gov/" },
    localHelp: FALLBACK_211,
  },
  NY: {
    benefits: { label: "myBenefits", url: "https://mybenefits.ny.gov/" },
    unemployment: { label: "File a UI claim (NYSDOL)", url: "https://dol.ny.gov/how-do-i-file" },
    localHelp: FALLBACK_211,
  },
  NC: {
    benefits: { label: "ePASS", url: "https://epass.nc.gov/" },
    unemployment: { label: "Apply for UI (NC DES)", url: "https://www.des.nc.gov/individuals/apply-ui" },
    localHelp: { label: "NC 211", url: "https://nc211.org/" },
  },
  ND: {
    benefits: { label: "ND Apply for Help", url: "https://www.hhs.nd.gov/applyforhelp" },
    unemployment: { label: "File a claim (Job Service)", url: "https://www.jobsnd.com/unemployment-individuals/file-claim" },
    localHelp: FALLBACK_211,
  },
  OH: {
    benefits: { label: "Ohio Benefits", url: "https://ssp.benefits.ohio.gov/" },
    unemployment: { label: "File for unemployment", url: "https://unemployment.ohio.gov/" },
    localHelp: { label: "Ohio 211", url: "https://ohio211.org/" },
  },
  OK: {
    benefits: { label: "OKDHSLive", url: "https://www.okdhslive.org/" },
    unemployment: { label: "File for unemployment", url: "https://oklahoma.gov/oesc/individuals/unemployment.html" },
    localHelp: FALLBACK_211,
  },
  OR: {
    benefits: { label: "Oregon ONE", url: "https://one.oregon.gov/" },
    unemployment: { label: "File for unemployment", url: "https://unemployment.oregon.gov/" },
    localHelp: { label: "211info (Oregon)", url: "https://www.211info.org/" },
  },
  PA: {
    benefits: { label: "COMPASS", url: "https://www.compass.dhs.pa.gov/" },
    unemployment: { label: "File for unemployment", url: "https://benefits.uc.pa.gov/" },
    localHelp: { label: "PA 211", url: "https://www.pa211.org/" },
  },
  RI: {
    benefits: { label: "Apply for DHS benefits", url: "https://dhs.ri.gov/apply-now" },
    unemployment: { label: "File for unemployment", url: "https://dlt.ri.gov/individuals/unemployment-insurance" },
    localHelp: { label: "United Way RI 211", url: "https://www.unitedwayri.org/get-help/2-1-1/" },
  },
  SC: {
    benefits: { label: "DSS Benefits Portal", url: "https://benefitsportal.dss.sc.gov/" },
    unemployment: { label: "File for unemployment", url: "https://dew.sc.gov/individuals/applying-benefits" },
    localHelp: { label: "SC 211", url: "https://www.sc211.org/" },
  },
  SD: {
    benefits: { label: "DSS Benefits Portal", url: "https://eaportal.sd.gov/" },
    unemployment: { label: "File a claim", url: "https://dlr.sd.gov/ra/individuals/file_claim.aspx" },
    localHelp: { label: "Helpline Center 211", url: "https://www.helplinecenter.org/" },
  },
  TN: {
    benefits: { label: "One DHS Portal", url: "https://onedhs.tn.gov/" },
    unemployment: { label: "File for unemployment", url: "https://www.tn.gov/workforce/unemployment/apply-for-benefits.html" },
    localHelp: FALLBACK_211,
  },
  TX: {
    benefits: { label: "Your Texas Benefits", url: "https://www.yourtexasbenefits.com" },
    unemployment: { label: "File a claim (TWC)", url: "https://www.twc.texas.gov/programs/unemployment-benefits" },
    localHelp: { label: "2-1-1 Texas", url: "https://www.211texas.org" },
  },
  UT: {
    benefits: { label: "Utah myCase", url: "https://jobs.utah.gov/mycase/home" },
    unemployment: { label: "File a claim (UI)", url: "https://jobs.utah.gov/ui/home/initialclaims" },
    localHelp: { label: "211 Utah", url: "https://211utah.org" },
  },
  VT: {
    benefits: { label: "Vermont MyBenefits", url: "https://dcf.vermont.gov/esd/applicants/mybenefits" },
    unemployment: { label: "File a UI claim", url: "https://labor.vermont.gov/unemployment-insurance/initial-application" },
    localHelp: { label: "Vermont 211", url: "https://vermont211.org" },
  },
  VA: {
    benefits: { label: "CommonHelp", url: "https://commonhelp.virginia.gov" },
    unemployment: { label: "File a claim (VEC)", url: "https://www.vec.virginia.gov/unemployment" },
    localHelp: { label: "211 Virginia", url: "https://211virginia.org" },
  },
  WA: {
    benefits: { label: "Washington Connection", url: "https://www.washingtonconnection.org" },
    unemployment: { label: "Unemployment (ESD)", url: "https://esd.wa.gov/get-financial-help/unemployment-benefits" },
    localHelp: { label: "Washington 211", url: "https://wa211.org" },
  },
  WV: {
    benefits: { label: "WV PATH", url: "https://www.wvpath.wv.gov" },
    unemployment: { label: "My Unemployment Claim", url: "https://workforcewv.org/unemployment-insurance-benefits/my-unemployment-claim/" },
    localHelp: { label: "West Virginia 211", url: "https://wv211.org" },
  },
  WI: {
    benefits: { label: "ACCESS Wisconsin", url: "https://access.wi.gov" },
    unemployment: { label: "Apply for benefits", url: "https://dwd.wisconsin.gov/uiben/apply/" },
    localHelp: FALLBACK_211,
  },
  WY: {
    benefits: { label: "Wyoming DFS food/SNAP", url: "https://dfs.wyo.gov/assistance-programs/food-assistance/" },
    unemployment: { label: "WYUI claim portal", url: "https://wyui.wyo.gov" },
    localHelp: { label: "Wyoming 211", url: "https://wyoming211.org" },
  },
};
