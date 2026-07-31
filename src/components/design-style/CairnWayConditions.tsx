"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DISPLAY: CSSProperties = { fontFamily: "var(--st-font-display)" };

const TERRAIN_IMAGE = "/generated/design-styles/natural.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-primary)]" as const;

/* Natural, re-aimed at what the style's own references actually are —
   Patagonia, REI, Mountain Hardwear, which are terrain and weather, not
   fabric. Of the four styles in this category natural is the only one about a
   place rather than a material (rustic) or the maker's hand (handmade) or a
   species (botanical), so the subject here is open country and the condition
   it is in today.

   The form follows the style too: organic means soft edges and generous space,
   so nothing here sits in a hard ruled grid, and one documentary photograph
   carries the page with the type quiet underneath it. */

type Section = {
  readonly ascent: string;
  readonly exposure: string;
  readonly id: string;
  readonly km: string;
  readonly name: string;
  readonly surface: string;
  readonly time: string;
  readonly water: string;
};

const SECTIONS: readonly Section[] = [
  { ascent: "310 m", exposure: "Sheltered, birch scrub", id: "glen", km: "14.2 km", name: "Glen to Falls", surface: "Packed gravel, firm", time: "4 h", water: "Bridged" },
  { ascent: "640 m", exposure: "Open above 400 m", id: "moor", km: "17.8 km", name: "The Long Moor", surface: "Peat and stone pitching", time: "6 h", water: "Two burns, unbridged" },
  { ascent: "880 m", exposure: "Fully exposed ridge", id: "ridge", km: "12.6 km", name: "Cairn Ridge", surface: "Boulder field, no path", time: "7 h", water: "None on the ridge" },
  { ascent: "120 m", exposure: "Sheltered, forestry", id: "forest", km: "16.4 km", name: "Forest Track", surface: "Forestry road, firm", time: "4 h", water: "Piped, drinkable" },
  { ascent: "240 m", exposure: "Coastal, wind-scoured", id: "shore", km: "13.1 km", name: "Shore Path", surface: "Sand and shingle", time: "4 h", water: "Tidal, check tables" },
];

type Condition = { readonly note: string; readonly state: "caution" | "ok" | "watch"; readonly what: string };

const CONDITIONS: Record<string, readonly Condition[]> = {
  forest: [
    { note: "Firm throughout", state: "ok", what: "Ground" },
    { note: "Felling on the east spur, diversion signed", state: "watch", what: "Access" },
    { note: "Clear", state: "ok", what: "Visibility" },
  ],
  glen: [
    { note: "Firm, some standing water at the ford", state: "ok", what: "Ground" },
    { note: "Bridge in place, passable", state: "ok", what: "Burns" },
    { note: "Clear to the tree line", state: "ok", what: "Visibility" },
  ],
  moor: [
    { note: "Soft, waterlogged above the shieling", state: "watch", what: "Ground" },
    { note: "Both burns high after rain, do not cross alone", state: "caution", what: "Burns" },
    { note: "200 m in low cloud", state: "watch", what: "Visibility" },
  ],
  ridge: [
    { note: "Wet rock, slippery on the slabs", state: "caution", what: "Ground" },
    { note: "Gusting 70 km/h on the summit ridge", state: "caution", what: "Wind" },
    { note: "50 m, navigation needed", state: "caution", what: "Visibility" },
  ],
  shore: [
    { note: "Shingle, slow going at the north end", state: "watch", what: "Ground" },
    { note: "Crossing passable 2 h either side of low water", state: "watch", what: "Tide" },
    { note: "Clear, wind from the west", state: "ok", what: "Visibility" },
  ],
};

const STATE_COLOUR: Record<Condition["state"], string> = {
  caution: "var(--sample-accent)",
  ok: "var(--sample-primary)",
  watch: "var(--sample-accent-2)",
};

export function CairnWayConditions({ compact = false }: { readonly compact?: boolean }) {
  const [sectionId, setSectionId] = useState<string>("moor");
  const selected = SECTIONS.find((section) => section.id === sectionId) ?? SECTIONS[0];
  const conditions = CONDITIONS[selected.id];

  return (
    <div className="flex h-full min-h-0 flex-col text-[var(--sample-text)]" style={DISPLAY}>
      {/* ── masthead ── */}
      <header className={cn("flex shrink-0 items-baseline justify-between gap-3", compact ? "pb-1" : "pb-2")}>
        <div className="min-w-0">
          <h2 className={cn("truncate leading-none", compact ? "text-[0.68rem]" : "text-[1.05rem]")}>The Cairn Way</h2>
          <p className={cn("truncate text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "mt-0.5 text-[8px]")}>
            A 74 km upland path &middot; conditions reported by wardens, updated this morning
          </p>
        </div>
        <span className={cn("shrink-0 whitespace-nowrap text-[var(--sample-muted)]", compact ? "hidden" : "text-[7.5px] md:inline")}>
          Reported 06:40
        </span>
      </header>

      {/* ── the country itself, carrying the page ── */}
      <figure className={cn("relative m-0 min-h-0 flex-1 overflow-hidden", compact ? "min-h-[4rem] rounded-xl" : "min-h-[8rem] rounded-[20px]")}>
        <span
          aria-hidden="true"
          className="absolute inset-0 block"
          style={{ backgroundImage: `url('${TERRAIN_IMAGE}')`, backgroundPosition: "center 58%", backgroundSize: "cover" }}
        />
        <figcaption
          className={cn("absolute bottom-0 left-0 truncate rounded-tr-[14px] text-[var(--sample-surface)]", compact ? "px-1.5 py-0.5 text-[4.5px]" : "px-3 py-1.5 text-[8px]")}
          style={{ backgroundColor: "rgb(35 42 34 / 0.72)" }}
        >
          {selected.name}{" "}&middot; looking to the cairn from the shieling
        </figcaption>
      </figure>

      {/* ── the five sections ── */}
      <nav aria-label="section index" className={cn("flex shrink-0 flex-wrap gap-1", compact ? "py-1" : "py-2.5")}>
        {SECTIONS.map((section, index) => {
          const active = section.id === sectionId;
          return (
            <button
              aria-pressed={active}
              className={cn(
                "min-w-0 truncate rounded-full border transition-colors",
                FOCUS,
                compact ? "px-1.5 py-0.5 text-[4.5px]" : "px-3 py-1 text-[8px]",
                index > 3 && !compact ? "hidden md:block" : "",
                active
                  ? "border-transparent text-[var(--sample-surface)]"
                  : "border-[var(--sample-border)] text-[var(--sample-muted)] hover:text-[var(--sample-text)]",
              )}
              key={section.id}
              onClick={() => setSectionId(section.id)}
              style={active ? { backgroundColor: "var(--sample-primary)" } : undefined}
              title={section.name}
              type="button"
            >
              {section.name}
            </button>
          );
        })}
      </nav>

      <div className={cn("grid shrink-0", compact ? "grid-cols-[1fr_1fr] gap-2" : "grid-cols-1 gap-4 md:grid-cols-[1fr_1.05fr] md:gap-6")}>
        {/* ── what the section is ── */}
        <section aria-label="section record" className="min-w-0 overflow-hidden">
          <h3 className={cn("truncate leading-tight", compact ? "text-[0.7rem]" : "text-[1.1rem]")}>{selected.name}</h3>
          <p className={cn("truncate text-[var(--sample-muted)]", compact ? "text-[5px]" : "text-[8.5px]")}>
            {selected.km} &middot; {selected.ascent} of ascent &middot; allow {selected.time}
          </p>
          <dl className={cn("grid grid-cols-2", compact ? "mt-1 gap-x-2 gap-y-0.5" : "mt-2.5 gap-x-4 gap-y-2")}>
            {([["Surface", selected.surface], ["Exposure", selected.exposure], ["Water", selected.water], ["Ascent", selected.ascent]] as const).map(([label, value]) => (
              <div className="min-w-0" key={label}>
                <dt className={cn("truncate uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "text-[4px]" : "text-[6px]")}>{label}</dt>
                <dd className={cn("truncate", compact ? "text-[5.5px]" : "text-[8.5px]")}>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── and what state it is in today ── */}
        <section aria-label="ground conditions" className="flex min-w-0 flex-col overflow-hidden">
          <p className={cn("truncate uppercase tracking-[0.14em] text-[var(--sample-muted)]", compact ? "text-[4px]" : "text-[6.5px]")}>
            Conditions today
          </p>
          <div className={cn(compact ? "mt-0.5" : "mt-1.5")}>
            {conditions.map((condition) => (
              <div className={cn("flex items-baseline gap-2", compact ? "py-[2px]" : "py-1")} key={condition.what}>
                <span
                  aria-hidden="true"
                  className={cn("shrink-0 translate-y-[-1px] rounded-full", compact ? "h-1 w-1" : "h-1.5 w-1.5")}
                  style={{ backgroundColor: STATE_COLOUR[condition.state] }}
                />
                <span className={cn("w-[3.4rem] shrink-0 truncate text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "text-[7px]")}>{condition.what}</span>
                <span className={cn("min-w-0 flex-1 truncate", compact ? "text-[5.5px]" : "text-[8.5px]")}>{condition.note}</span>
              </div>
            ))}
          </div>
          <span
            className={cn("mt-1.5 flex shrink-0 items-center justify-center whitespace-nowrap rounded-full text-[var(--sample-surface)]", compact ? "h-4 text-[4.5px]" : "h-8 text-[9px]")}
            style={{ backgroundColor: "var(--sample-primary)" }}
          >
            Plan this section
          </span>
        </section>
      </div>

      <footer className={cn("shrink-0 truncate text-[var(--sample-muted)]", compact ? "pt-1 text-[4.5px]" : "pt-2 text-[7.5px]")}>
        Access is by right of responsible passage &middot; camp high, leave the ground as you found it
      </footer>
    </div>
  );
}
