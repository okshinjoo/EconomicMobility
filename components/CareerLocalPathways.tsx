"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  ArrowSquareOut,
  Buildings,
  Certificate,
  Crosshair,
  HandCoins,
  MapPin,
} from "@phosphor-icons/react";
import { CAREER_STATE_OPTIONS } from "@/components/CareerLocalPay";
import {
  readCareerStatePreference,
  saveCareerStatePreference,
  subscribeCareerStatePreference,
} from "@/lib/careerStatePreference";
import { trackCareerEvent } from "@/lib/careerAnalytics";

interface LicenseRecord {
  id: string;
  title: string;
  description: string;
  jurisdiction: "Federal" | "State";
  requirements: { label: string; value: string }[];
  agency: string;
  phone: string;
  email: string;
  url: string;
  updated: string;
}

interface InstitutionRecord {
  unitId: string;
  school: string;
  city: string;
  zip: string;
  website: string;
  level: string;
  latitude: number | null;
  longitude: number | null;
}

interface ProgramOffering {
  unitId: string;
  totalCompletions: number;
  programs: {
    cip: string;
    title: string;
    awards: string[];
    completions: number;
  }[];
}

interface SponsorRecord {
  id: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  latitude: number | null;
  longitude: number | null;
  occupations: string[];
  sponsorType: string[];
  employerStructure: string;
  instructionMethod: string;
  nationalProgram: boolean;
  email: string;
  phone: string;
  website: string;
  updated: string;
  profileUrl: string;
}

interface StatePathwayData {
  generatedAt: string;
  state: string;
  stateName: string;
  licenses: Record<string, LicenseRecord>;
  institutions: Record<string, InstitutionRecord>;
  sponsors: Record<string, SponsorRecord>;
  careers: Record<
    string,
    { licenses: string[]; programs: ProgramOffering[]; sponsors: string[] }
  >;
}

interface ApprenticeshipRoutes {
  careers: Record<string, { code: string; title: string }[]>;
}

type Coordinates = { latitude: number; longitude: number };

const statePromises = new Map<string, Promise<StatePathwayData>>();
let routesPromise: Promise<ApprenticeshipRoutes> | null = null;

function loadStatePathways(state: string) {
  let promise = statePromises.get(state);
  if (!promise) {
    promise = fetch(`/data/career-pathways/${state}.json`).then((response) => {
      if (!response.ok) throw new Error("State pathways could not be loaded.");
      return response.json() as Promise<StatePathwayData>;
    });
    statePromises.set(state, promise);
  }
  return promise;
}

function loadApprenticeshipRoutes() {
  routesPromise ??= fetch("/data/career-pathways/apprenticeship-routes.json").then(
    (response) => {
      if (!response.ok) throw new Error("Apprenticeship routes could not be loaded.");
      return response.json() as Promise<ApprenticeshipRoutes>;
    }
  );
  return routesPromise;
}

function milesBetween(origin: Coordinates, destination: Coordinates) {
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDistance = radians(destination.latitude - origin.latitude);
  const longitudeDistance = radians(destination.longitude - origin.longitude);
  const a =
    Math.sin(latitudeDistance / 2) ** 2 +
    Math.cos(radians(origin.latitude)) *
      Math.cos(radians(destination.latitude)) *
      Math.sin(longitudeDistance / 2) ** 2;
  return 3959 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function distanceFrom(origin: Coordinates | null, item: InstitutionRecord | SponsorRecord) {
  if (origin == null || item.latitude == null || item.longitude == null) return null;
  return milesBetween(origin, { latitude: item.latitude, longitude: item.longitude });
}

function distanceLabel(distance: number | null) {
  if (distance == null) return "";
  return `${Math.max(1, Math.round(distance)).toLocaleString()} mi away`;
}

function formattedDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function formattedPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10
    ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    : value;
}

function SourceLink({
  href,
  children,
  pathwayType,
}: {
  href: string;
  children: React.ReactNode;
  pathwayType?: "license" | "program" | "apprenticeship";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => pathwayType && trackCareerEvent("Career pathway opened", { pathway_type: pathwayType })}
      className="inline-flex items-center gap-1 font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
    >
      {children}
      <ArrowSquareOut className="h-3.5 w-3.5" weight="bold" />
    </a>
  );
}

export default function CareerLocalPathways({
  careerId,
  careerTitle,
  onetSoc,
}: {
  careerId: string;
  careerTitle: string;
  onetSoc: string;
}) {
  const state = useSyncExternalStore(
    subscribeCareerStatePreference,
    readCareerStatePreference,
    () => ""
  );
  const [loaded, setLoaded] = useState<{
    state: string;
    data: StatePathwayData | null;
    routes: { code: string; title: string }[];
    failed: boolean;
  } | null>(null);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [locationStatus, setLocationStatus] = useState<"idle" | "finding" | "ready" | "failed">(
    "idle"
  );
  const [licenseLimit, setLicenseLimit] = useState(5);
  const [programLimit, setProgramLimit] = useState(6);
  const [sponsorLimit, setSponsorLimit] = useState(6);

  useEffect(() => {
    if (!state) return;

    let active = true;
    Promise.all([loadStatePathways(state), loadApprenticeshipRoutes()])
      .then(([data, routeData]) => {
        if (active) {
          setLoaded({
            state,
            data,
            routes: routeData.careers[careerId] ?? [],
            failed: false,
          });
        }
      })
      .catch(() => {
        statePromises.delete(state);
        routesPromise = null;
        if (active) setLoaded({ state, data: null, routes: [], failed: true });
      });
    return () => {
      active = false;
    };
  }, [careerId, state]);

  const stateName =
    CAREER_STATE_OPTIONS.find(([code]) => code === state)?.[1] ?? "your state";
  const isLoading = Boolean(state) && loaded?.state !== state;
  const current = loaded?.state === state ? loaded : null;
  const entry = current?.data?.careers[careerId];
  const licenses = entry?.licenses
    .map((id) => current?.data?.licenses[id])
    .filter((item): item is LicenseRecord => Boolean(item)) ?? [];

  const programs = useMemo(() => {
    const items = (entry?.programs ?? [])
      .map((offering) => {
        const institution = current?.data?.institutions[offering.unitId];
        return institution ? { ...offering, institution } : null;
      })
      .filter(
        (item): item is ProgramOffering & { institution: InstitutionRecord } => Boolean(item)
      );
    if (!location) return items;
    return [...items].sort((a, b) => {
      const aDistance = distanceFrom(location, a.institution) ?? Number.POSITIVE_INFINITY;
      const bDistance = distanceFrom(location, b.institution) ?? Number.POSITIVE_INFINITY;
      return aDistance - bDistance || b.totalCompletions - a.totalCompletions;
    });
  }, [current?.data?.institutions, entry?.programs, location]);

  const sponsors = useMemo(() => {
    const items = (entry?.sponsors ?? [])
      .map((id) => current?.data?.sponsors[id])
      .filter((item): item is SponsorRecord => Boolean(item));
    if (!location) return items;
    return [...items].sort((a, b) => {
      const aDistance = distanceFrom(location, a) ?? Number.POSITIVE_INFINITY;
      const bDistance = distanceFrom(location, b) ?? Number.POSITIVE_INFINITY;
      return aDistance - bDistance || a.name.localeCompare(b.name);
    });
  }, [current?.data?.sponsors, entry?.sponsors, location]);

  const findLocation = () => {
    if (!("geolocation" in navigator)) {
      setLocationStatus("failed");
      return;
    }
    setLocationStatus("finding");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationStatus("ready");
      },
      () => setLocationStatus("failed"),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 30 * 60 * 1000 }
    );
  };

  return (
    <div className="mt-8 border-t-2 border-ink/15 pt-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">
            Your local path
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-ink">
            Licenses, public programs, and paid apprenticeships
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-stone">
            Choose a state for the rules and programs that actually apply where you live.
          </p>
        </div>
        <label className="flex min-w-60 items-center gap-2 rounded-lg border-2 border-ink/20 bg-cream px-3 focus-within:border-ink">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone">
            State
          </span>
          <select
            value={state}
            onChange={(event) => saveCareerStatePreference(event.target.value)}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm font-semibold text-ink focus:outline-none"
          >
            <option value="">Choose a state</option>
            {CAREER_STATE_OPTIONS.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!state && (
        <p className="mt-6 border-l-4 border-amber pl-4 text-sm leading-6 text-ink/75">
          Start with your state. We will load only that state’s records.
        </p>
      )}

      {state && (
        <div className="mt-7 min-h-28" aria-live="polite">
          {isLoading ? (
            <p className="text-sm font-medium text-stone">
              Loading official pathways for {stateName}…
            </p>
          ) : current?.failed ? (
            <div className="border-l-4 border-terracotta pl-4">
              <p className="text-sm font-bold text-ink">The local records could not be loaded.</p>
              <p className="mt-1 text-sm leading-6 text-stone">
                You can still use the federal source links below while we retry on your next visit.
              </p>
            </div>
          ) : current?.data ? (
            <>
              {(programs.length > 0 || sponsors.length > 0) && (
                <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-b-2 border-ink/10 pb-5">
                  <button
                    type="button"
                    onClick={findLocation}
                    disabled={locationStatus === "finding"}
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-ink bg-cream px-3 py-2 text-sm font-bold text-ink transition-colors hover:bg-amber disabled:cursor-wait disabled:opacity-60"
                  >
                    <Crosshair className="h-4 w-4" weight="bold" />
                    {locationStatus === "finding"
                      ? "Finding you…"
                      : locationStatus === "ready"
                        ? "Nearest first"
                        : "Sort by distance"}
                  </button>
                  <p className="text-[13px] leading-5 text-stone">
                    {locationStatus === "ready"
                      ? "Distance is approximate. Your location stays in this browser."
                      : locationStatus === "failed"
                        ? "Location was unavailable; statewide results remain below."
                        : "Optional—your location is used only to sort these results."}
                  </p>
                </div>
              )}

              <section className="grid grid-cols-1 gap-5 border-b-2 border-ink/15 pb-8 lg:grid-cols-[14rem_1fr]">
                <div>
                  <h4 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
                    <Certificate className="h-5 w-5 text-terracotta" weight="bold" />
                    Licensing
                  </h4>
                  <p className="mt-2 text-[13px] leading-5 text-stone">
                    Active state and federal records matched to {careerTitle}.
                  </p>
                </div>
                <div>
                  {licenses.length > 0 ? (
                    <div className="divide-y-2 divide-ink/10 border-y-2 border-ink/15">
                      {licenses.slice(0, licenseLimit).map((license) => (
                        <details key={license.id} className="group py-4">
                          <summary className="cursor-pointer list-none pr-5 text-sm font-bold text-ink marker:hidden">
                            <span className="mr-2 text-forest group-open:text-terracotta">＋</span>
                            {license.title}
                            <span className="ml-2 text-[11px] uppercase tracking-[0.12em] text-stone">
                              {license.jurisdiction}
                            </span>
                          </summary>
                          <div className="mt-3 pl-6">
                            {license.description && (
                              <p className="max-w-3xl text-sm leading-6 text-ink/80">
                                {license.description}
                              </p>
                            )}
                            {license.requirements.length > 0 && (
                              <dl className="mt-4 grid grid-cols-1 gap-x-7 gap-y-3 sm:grid-cols-2">
                                {license.requirements.map((requirement) => (
                                  <div key={`${license.id}-${requirement.label}`}>
                                    <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-stone">
                                      {requirement.label}
                                    </dt>
                                    <dd className="mt-0.5 text-sm font-semibold text-ink/80">
                                      {requirement.value}
                                    </dd>
                                  </div>
                                ))}
                              </dl>
                            )}
                            <p className="mt-4 text-[13px] leading-5 text-stone">
                              {license.agency && <>{license.agency}. </>}
                              {license.updated && <>Record updated {formattedDate(license.updated)}. </>}
                              {license.url && <SourceLink href={license.url} pathwayType="license">Verify with the issuing agency</SourceLink>}
                            </p>
                            {(license.phone || license.email) && (
                              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-semibold text-stone">
                                {license.phone && (
                                  <a className="hover:text-forest hover:underline" href={`tel:${license.phone}`}>
                                    {formattedPhone(license.phone)}
                                  </a>
                                )}
                                {license.email && (
                                  <a className="hover:text-forest hover:underline" href={`mailto:${license.email}`}>
                                    Email the issuing agency
                                  </a>
                                )}
                              </p>
                            )}
                          </div>
                        </details>
                      ))}
                    </div>
                  ) : (
                    <p className="border-l-4 border-amber pl-4 text-sm leading-6 text-stone">
                      No active matching record appears in the October 2024 CareerOneStop export. That does not rule out a local license, registration, or employer requirement.
                    </p>
                  )}
                  {licenseLimit < licenses.length && (
                    <button
                      type="button"
                      onClick={() => setLicenseLimit((count) => count + 5)}
                      className="mt-4 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                    >
                      Show more licenses ({licenses.length - licenseLimit} remaining)
                    </button>
                  )}
                  <p className="mt-4 text-[12px] leading-5 text-stone">
                    CareerOneStop notes that state submissions can be incomplete. Always confirm fees, reciprocity, and current rules with the agency. {" "}
                    <SourceLink href={`https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=${encodeURIComponent(careerTitle)}`} pathwayType="license">
                      CareerOneStop License Finder
                    </SourceLink>
                  </p>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-5 border-b-2 border-ink/15 py-8 lg:grid-cols-[14rem_1fr]">
                <div>
                  <h4 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
                    <Buildings className="h-5 w-5 text-terracotta" weight="bold" />
                    Public training
                  </h4>
                  <p className="mt-2 text-[13px] leading-5 text-stone">
                    Public colleges and technical schools that reported recent completions in a matching program.
                  </p>
                </div>
                <div>
                  {programs.length > 0 ? (
                    <ol className="divide-y-2 divide-ink/10 border-y-2 border-ink/15">
                      {programs.slice(0, programLimit).map(({ institution, ...offering }) => {
                        const distance = distanceFrom(location, institution);
                        return (
                          <li key={institution.unitId} className="py-4">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
                              <h5 className="font-display text-lg font-bold text-ink">
                                {institution.website ? (
                                  <a
                                    href={institution.website}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => trackCareerEvent("Career pathway opened", { pathway_type: "program" })}
                                    className="underline decoration-amber decoration-2 underline-offset-4 hover:text-forest"
                                  >
                                    {institution.school}
                                  </a>
                                ) : (
                                  institution.school
                                )}
                              </h5>
                              <span className="shrink-0 text-[12px] font-bold text-forest">
                                {distanceLabel(distance)}
                              </span>
                            </div>
                            <p className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold text-stone">
                              <MapPin className="h-3.5 w-3.5" weight="fill" />
                              {institution.city}, {state} {institution.zip} · {institution.level}
                            </p>
                            <div className="mt-3 space-y-2">
                              {offering.programs.slice(0, 3).map((program) => (
                                <div key={program.cip}>
                                  <p className="text-sm font-bold text-ink/85">{program.title}</p>
                                  <p className="text-[12px] leading-5 text-stone">
                                    {program.awards.join(" · ")} · {program.completions.toLocaleString()} completion{program.completions === 1 ? "" : "s"} in 2023–24
                                  </p>
                                </div>
                              ))}
                              {offering.programs.length > 3 && (
                                <p className="text-[12px] font-semibold text-stone">
                                  +{offering.programs.length - 3} more matching program{offering.programs.length - 3 === 1 ? "" : "s"}
                                </p>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <p className="border-l-4 border-amber pl-4 text-sm leading-6 text-stone">
                      No public institution in {stateName} reported a matching completion in 2023–24. Private, employer-run, new, and non-completion programs are not represented here.
                    </p>
                  )}
                  {programLimit < programs.length && (
                    <button
                      type="button"
                      onClick={() => setProgramLimit((count) => count + 6)}
                      className="mt-4 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                    >
                      Show more programs ({programs.length - programLimit} remaining)
                    </button>
                  )}
                  <p className="mt-4 text-[12px] leading-5 text-stone">
                    Program matches use the July 2024 O*NET CIP crosswalk and 2023–24 NCES completions. A reported completion shows the program operated; it does not guarantee current admission. {" "}
                    <SourceLink href="https://nces.ed.gov/ipeds/use-the-data" pathwayType="program">NCES IPEDS</SourceLink>
                  </p>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-5 pt-8 lg:grid-cols-[14rem_1fr]">
                <div>
                  <h4 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
                    <HandCoins className="h-5 w-5 text-terracotta" weight="bold" />
                    Apprenticeships
                  </h4>
                  <p className="mt-2 text-[13px] leading-5 text-stone">
                    Registered sponsors connected to this occupation—not a promise that each is hiring today.
                  </p>
                </div>
                <div>
                  {current.routes.length > 0 && (
                    <div className="mb-5 border-l-4 border-forest pl-4">
                      <p className="text-sm font-bold text-forest">
                        This career has a federal Registered Apprenticeship pathway.
                      </p>
                      <p className="mt-1 text-[13px] leading-5 text-stone">
                        Approved titles include {current.routes.slice(0, 5).map((route) => route.title).join(", ")}
                        {current.routes.length > 5 ? `, and ${current.routes.length - 5} more` : ""}.
                      </p>
                    </div>
                  )}
                  {sponsors.length > 0 ? (
                    <ol className="divide-y-2 divide-ink/10 border-y-2 border-ink/15">
                      {sponsors.slice(0, sponsorLimit).map((sponsor) => {
                        const distance = distanceFrom(location, sponsor);
                        return (
                          <li key={sponsor.id} className="py-4">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
                              <h5 className="font-display text-lg font-bold text-ink">
                                <a
                                  href={sponsor.profileUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={() => trackCareerEvent("Career pathway opened", { pathway_type: "apprenticeship" })}
                                  className="underline decoration-amber decoration-2 underline-offset-4 hover:text-forest"
                                >
                                  {sponsor.name}
                                </a>
                              </h5>
                              <span className="shrink-0 text-[12px] font-bold text-forest">
                                {distanceLabel(distance)}
                              </span>
                            </div>
                            <p className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold text-stone">
                              <MapPin className="h-3.5 w-3.5" weight="fill" />
                              {sponsor.city || stateName}{sponsor.zip ? `, ${state} ${sponsor.zip}` : `, ${state}`}
                              {sponsor.employerStructure ? ` · ${sponsor.employerStructure}` : ""}
                            </p>
                            {sponsor.occupations.length > 0 && (
                              <p className="mt-2 text-[13px] leading-5 text-ink/75">
                                Registered for: {sponsor.occupations.slice(0, 4).join(", ")}
                                {sponsor.occupations.length > 4 ? `, and ${sponsor.occupations.length - 4} more` : ""}.
                              </p>
                            )}
                            {(sponsor.email || sponsor.phone || sponsor.website) && (
                              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-semibold text-stone">
                                {sponsor.email && <a className="hover:text-forest hover:underline" href={`mailto:${sponsor.email}`}>Email sponsor</a>}
                                {sponsor.phone && <a className="hover:text-forest hover:underline" href={`tel:${sponsor.phone}`}>{sponsor.phone}</a>}
                                {sponsor.website && <SourceLink href={sponsor.website} pathwayType="apprenticeship">Sponsor website</SourceLink>}
                                {sponsor.updated && <span>Record updated {formattedDate(sponsor.updated)}</span>}
                              </p>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <p className="border-l-4 border-amber pl-4 text-sm leading-6 text-stone">
                      No matching registered sponsor appears in {stateName}’s current Partner Finder records. A sponsor may serve the state from elsewhere, and openings change frequently.
                    </p>
                  )}
                  {sponsorLimit < sponsors.length && (
                    <button
                      type="button"
                      onClick={() => setSponsorLimit((count) => count + 6)}
                      className="mt-4 text-sm font-bold text-forest underline decoration-amber decoration-2 underline-offset-4 hover:text-ink"
                    >
                      Show more sponsors ({sponsors.length - sponsorLimit} remaining)
                    </button>
                  )}
                  <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] leading-5 text-stone">
                    <SourceLink href="https://www.apprenticeship.gov/partner-finder/listings" pathwayType="apprenticeship">
                      Apprenticeship.gov Partner Finder
                    </SourceLink>
                    <SourceLink href="https://www.apprenticeship.gov/apprenticeship-job-finder" pathwayType="apprenticeship">
                      Search current openings
                    </SourceLink>
                    {onetSoc && (
                      <SourceLink href={`https://www.apprenticeship.gov/apprenticeship-occupations/listings?occupationCode=${encodeURIComponent(onetSoc)}`} pathwayType="apprenticeship">
                        Federal occupation standards
                      </SourceLink>
                    )}
                  </p>
                </div>
              </section>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
