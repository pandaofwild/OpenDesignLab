"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const SHELF_IMAGE = "/generated/design-styles/vintage.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent)]" as const;

const SERIF: CSSProperties = { fontFamily: "var(--st-font-display)" };

/* Vintage print discipline: aged ivory paper, ink-brown serif, double rules,
   a wax-seal badge and an engraved apothecary label carry the page — the
   period print language is the layout, not a texture on a neutral catalog. */

type RemedyId = "camphor" | "iron" | "eucalyptus" | "valerian";

type Remedy = {
  readonly id: RemedyId;
  readonly name: string;
  readonly latin: string;
  readonly since: string;
  readonly directions: string;
  readonly dose: string;
  readonly use: string;
  readonly no: string;
};

const REMEDIES: readonly Remedy[] = [
  { id: "camphor", name: "Camphor Tonic", latin: "Cinnamomum camphora", since: "1874", directions: "Fifteen drops in water", dose: "thrice daily", use: "restorative", no: "No. 014" },
  { id: "iron", name: "Iron Bitters", latin: "Ferrum phosphoricum", since: "1881", directions: "One teaspoon after meals", dose: "morning & night", use: "for vigour", no: "No. 037" },
  { id: "eucalyptus", name: "Oil of Eucalyptus", latin: "Eucalyptus globulus", since: "1889", directions: "Five drops in hot steam", dose: "as needed", use: "for the chest", no: "No. 052" },
  { id: "valerian", name: "Valerian Cordial", latin: "Valeriana officinalis", since: "1892", directions: "Two drachms at bedtime", dose: "nightly", use: "for repose", no: "No. 068" },
];

/* materia medica register — fixed material swatches (herb / mineral / resin) */
const MATERIA: readonly (readonly [string, string, string])[] = [
  ["Dried herb", "leaf & flower", "var(--sample-accent-3)"],
  ["Mineral salt", "ground fine", "var(--sample-accent-2)"],
  ["Tincture", "spirit drawn", "var(--sample-accent)"],
];

/* small mortar-and-pestle dingbat */
function MortarMark({ className }: { readonly className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path d="M8 5.5 14.5 12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      <path d="M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      <path d="M6 12a6 6 0 0 0 12 0" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 19h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  );
}

function WaxSeal({ compact }: { readonly compact: boolean }) {
  return (
    <span className={cn("grid shrink-0 place-items-center rounded-full text-center leading-[1.05] text-[var(--sample-surface)]", compact ? "h-8 w-8" : "h-10 w-10")} style={{ backgroundColor: "var(--sample-accent)", boxShadow: "inset 0 0 0 1.5px rgb(255 255 255 / 0.35), inset 0 0 0 3px var(--sample-accent)" }}>
      <MortarMark className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
    </span>
  );
}

function DoubleRule({ className }: { readonly className?: string }) {
  return (
    <span aria-hidden="true" className={cn("block border-y border-[var(--sample-border)]", className)} style={{ height: "3px", borderTopWidth: "1px", borderBottomWidth: "1px" }} />
  );
}

export function HollowayApothecary({ compact = false }: { readonly compact?: boolean }) {
  const [selectedId, setSelectedId] = useState<RemedyId>("camphor");
  const selected = REMEDIES.find((remedy) => remedy.id === selectedId) ?? REMEDIES[0];

  return (
    <div className="relative flex h-full min-h-0 flex-col text-[var(--sample-text)]">
      {/* paper grain */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--sample-text) 0 1px, transparent 1.3px)", backgroundSize: "11px 11px" }}
      />

      <div className="relative flex h-full min-h-0 flex-col gap-2">
        {/* ── masthead ── */}
        <header aria-label="HOLLOWAY'S APOTHECARY" className="flex min-w-0 items-center gap-2 border-b-2 border-double border-[var(--sample-border)] pb-1.5">
          <WaxSeal compact={compact} />
          <div className="min-w-0 text-center sm:text-left">
            <p className={cn("font-black uppercase tracking-[0.24em] text-[var(--sample-accent)]", compact ? "text-[5.5px]" : "text-[6.5px]")}>established 1874</p>
            <h1 className={cn("font-display leading-[0.95]", compact ? "text-[1.05rem]" : "text-[1.4rem] md:text-[1.75rem]")} style={{ ...SERIF, fontWeight: 600 }}>
              Holloway&rsquo;s Apothecary
            </h1>
          </div>
          <p className={cn("ml-auto max-w-[16ch] shrink-0 text-right font-medium italic leading-tight text-[var(--sample-muted)]", compact ? "hidden" : "hidden md:block md:text-[8px]")} style={SERIF}>
            purveyors of tonics &amp; remedies
          </p>
        </header>

        {/* ── main: dispensary photo | formulary + label + materia ── */}
        <main className={cn("grid min-h-0 flex-1 gap-2", compact ? "grid-cols-[0.92fr_1.08fr]" : "grid-cols-1 grid-rows-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:grid-cols-[0.92fr_1.08fr] sm:grid-rows-1 md:gap-3")}>
          {/* dispensary photo */}
          <section className="relative min-h-0 overflow-hidden border-2 border-double border-[var(--sample-border)]">
            <span aria-hidden="true" className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('${SHELF_IMAGE}')`, backgroundPosition: "58% center" }} />
            <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, transparent 40%, rgb(44 36 24 / 0.55))" }} />
            <span className="absolute right-2 top-2 flex flex-col items-center">
              <WaxSeal compact={compact} />
              <span className={cn("mt-1 whitespace-nowrap font-black uppercase tracking-[0.14em] text-[var(--sample-surface)]", compact ? "text-[5.5px]" : "text-[6.5px]")}>dispensary</span>
            </span>
            <div className="absolute inset-x-2 bottom-2">
              <p className={cn("font-display italic leading-tight text-[var(--sample-surface)]", compact ? "text-[10px]" : "text-[12px] md:text-[15px]")} style={SERIF}>
                Compounded on the premises
              </p>
              <p className={cn("mt-0.5 font-medium uppercase tracking-[0.14em] text-[rgb(255_247_229_/_0.82)]", compact ? "text-[5.5px]" : "text-[6.5px]")}>
                cabinet no. 4 · established shelf stock
              </p>
            </div>
          </section>

          {/* formulary + label + materia */}
          <aside className="flex min-h-0 min-w-0 flex-col gap-2">
            {/* formulary index */}
            <div aria-label="formulary" className="min-w-0 border-2 border-double border-[var(--sample-border)] bg-[var(--sample-surface)]">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--sample-border)] px-2 py-1">
                <p className={cn("whitespace-nowrap font-black uppercase tracking-[0.16em] text-[var(--sample-accent)]", compact ? "text-[7px]" : "text-[8px]")} style={SERIF}>Formulary</p>
                <p className={cn("whitespace-nowrap font-medium italic text-[var(--sample-muted)]", compact ? "hidden" : "text-[7px]")} style={SERIF}>index of remedies</p>
              </div>
              <div>
                {(compact ? REMEDIES.slice(0, 3) : REMEDIES).map((remedy, index) => {
                  const active = remedy.id === selectedId;
                  return (
                    <button
                      aria-pressed={active}
                      className={cn(
                        "flex w-full min-w-0 items-baseline gap-2 px-2 text-left",
                        FOCUS,
                        index < (compact ? 2 : REMEDIES.length - 1) ? "border-b border-[var(--sample-border)]" : "",
                        compact ? "py-0.5" : "py-1",
                        active ? "bg-[var(--sample-accent)] text-[var(--sample-surface)]" : "text-[var(--sample-text)]",
                      )}
                      key={remedy.id}
                      onClick={() => setSelectedId(remedy.id)}
                      type="button"
                    >
                      <span className={cn("shrink-0 tabular-nums", active ? "text-[rgb(255_247_229_/_0.7)]" : "text-[var(--sample-muted)]", compact ? "text-[7px]" : "text-[8px]")} style={SERIF}>{remedy.since}</span>
                      <span className="min-w-0 flex-1">
                        <span className={cn("block truncate font-display font-semibold leading-tight", compact ? "text-[9px]" : "text-[10.5px]")} style={SERIF}>{remedy.name}</span>
                        <span className={cn("block truncate italic leading-tight", active ? "text-[rgb(255_247_229_/_0.75)]" : "text-[var(--sample-muted)]", compact ? "hidden" : "text-[7.5px]")} style={SERIF}>{remedy.latin}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* apothecary label card — the signature engraved object */}
            <div aria-label="apothecary label" className="min-w-0 border-2 border-double border-[var(--sample-border)] bg-[var(--sample-base)] px-2.5 py-2 text-center" style={{ boxShadow: "0 0 0 3px var(--sample-surface) inset" }}>
              <div className="flex items-center justify-center gap-1.5">
                <span aria-hidden="true" className="h-px w-4 bg-[var(--sample-border)]" />
                <span className={cn("whitespace-nowrap font-black uppercase tracking-[0.2em] text-[var(--sample-muted)]", compact ? "text-[5.5px]" : "text-[6.5px]")} style={SERIF}>Holloway &amp; Son · {selected.no}</span>
                <span aria-hidden="true" className="h-px w-4 bg-[var(--sample-border)]" />
              </div>
              <p className={cn("mt-0.5 font-display leading-tight", compact ? "text-[13px]" : "text-[16px] md:text-[20px]")} style={{ ...SERIF, fontWeight: 600 }}>
                <span className="italic text-[var(--sample-accent)]">&#8478;</span> {selected.name}
              </p>
              <p className={cn("italic text-[var(--sample-muted)]", compact ? "text-[7px]" : "text-[8.5px]")} style={SERIF}>{selected.latin}</p>
              <DoubleRule className="mx-auto my-1 w-3/4" />
              <p className={cn("font-black uppercase tracking-[0.18em] text-[var(--sample-muted)]", compact ? "text-[5.5px]" : "text-[6.5px]")}>Directions</p>
              <p className={cn("font-display leading-snug", compact ? "text-[8.5px]" : "text-[10px]")} style={SERIF}>{selected.directions}</p>
              <p className={cn("font-semibold uppercase tracking-[0.08em] text-[var(--sample-accent)]", compact ? "text-[7px]" : "text-[8px]")} style={SERIF}>{selected.dose}</p>
              <span className={cn("mt-1 inline-block border border-[var(--sample-border)] px-1.5 py-0.5 font-black uppercase tracking-[0.14em] text-[var(--sample-accent-3)]", compact ? "text-[5.5px]" : "text-[6.5px]")}>{selected.use}</span>
            </div>

            {/* materia medica register */}
            <div aria-label="materia medica" className={cn("min-w-0 border-2 border-double border-[var(--sample-border)] bg-[var(--sample-surface)]", compact ? "hidden" : "hidden md:block")}>
              <p className="border-b border-[var(--sample-border)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--sample-accent)]" style={SERIF}>Materia Medica</p>
              <div className="grid grid-cols-3">
                {MATERIA.map(([name, note, color], index) => (
                  <span className={cn("min-w-0 px-2 py-1.5", index < MATERIA.length - 1 ? "border-r border-[var(--sample-border)]" : "")} key={name}>
                    <span className="mb-1 block h-2.5 w-full border border-[var(--sample-border)]" style={{ backgroundColor: color }} />
                    <span className="block truncate font-display text-[8px] font-semibold leading-tight" style={SERIF}>{name}</span>
                    <span className="block truncate text-[6.5px] italic text-[var(--sample-muted)]" style={SERIF}>{note}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* condensed materia line when the register is hidden */}
            <p className={cn("truncate border-2 border-double border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-center font-display text-[8px] italic text-[var(--sample-muted)]", compact ? "hidden" : "md:hidden")} style={SERIF}>
              herb · mineral · tincture — drawn to order
            </p>
          </aside>
        </main>

        {/* ── guarantee strip ── */}
        <footer className={cn("grid shrink-0 grid-cols-3 border-t-2 border-double border-[var(--sample-border)] text-center", compact ? "hidden" : "")}>
          {["Compounded by hand", "Sealed & dated", "By appointment"].map((label, index) => (
            <span className={cn("px-2 py-1 font-display text-[7.5px] font-medium italic text-[var(--sample-muted)]", index < 2 ? "border-r border-[var(--sample-border)]" : "")} key={label} style={SERIF}>
              {label}
            </span>
          ))}
        </footer>
      </div>
    </div>
  );
}
