"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DISPLAY: CSSProperties = { fontFamily: "var(--st-font-display)" };

const FIBRE_IMAGE = "/generated/design-styles/natural.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-primary)]" as const;

/* Natural, taken to the thing that actually distinguishes it now. A beige
   lifestyle shelf is not a claim about anything; what a natural material house
   is really selling is verifiable origin, and without that data the whole
   position collapses into greenwashing. So the page is a material record with
   its provenance chain — field, retting, spinning, weaving, finishing, each
   with a place and a date.

   The colour rule follows from the subject: undyed means the colour IS the
   fibre, so the palette is the greyed straw, hemp and camel of the fibres
   themselves, and the only hue on the page is the green of the flax field. */

type Material = {
  readonly certification: string;
  readonly fibre: string;
  readonly id: string;
  readonly lot: string;
  readonly name: string;
  readonly swatch: string;
  readonly weave: string;
  readonly weight: string;
  readonly width: string;
};

const MATERIALS: readonly Material[] = [
  { certification: "Oeko-Tex 100, class I", fibre: "Flax, long line", id: "flax", lot: "Lot LN-214", name: "Undyed line linen", swatch: "var(--sample-accent-3)", weave: "Plain, 24 × 22", weight: "245 g/m²", width: "150 cm" },
  { certification: "Oeko-Tex 100, class II", fibre: "Flax tow", id: "tow", lot: "Lot TW-088", name: "Tow linen, coarse", swatch: "var(--sample-accent)", weave: "Plain, 18 × 16", weight: "310 g/m²", width: "140 cm" },
  { certification: "GOTS 6.0, in conversion", fibre: "Cotton, unbleached", id: "cotton", lot: "Lot CT-431", name: "Raw cotton calico", swatch: "var(--sample-surface)", weave: "Plain, 30 × 28", weight: "170 g/m²", width: "160 cm" },
  { certification: "Oeko-Tex 100, class II", fibre: "Hemp, dew retted", id: "hemp", lot: "Lot HP-052", name: "Hemp canvas", swatch: "var(--sample-accent-2)", weave: "Twill, 2 / 1", weight: "420 g/m²", width: "135 cm" },
];

/* Field to finished cloth. The point of the module is that every step has a
   place and a date you could check. */
const CHAIN: Record<string, ReadonlyArray<readonly [string, string, string]>> = {
  cotton: [["Grown", "Gujarat, IN", "2025"], ["Ginned", "Rajkot, IN", "Oct 2025"], ["Spun", "Coimbatore, IN", "Nov 2025"], ["Woven", "Erode, IN", "Jan 2026"], ["Finished", "Loom state, none", "—"]],
  flax: [["Grown", "Normandy, FR", "2024"], ["Dew retted", "In field, 21 days", "Aug 2024"], ["Scutched", "Kortrijk, BE", "Nov 2024"], ["Wet spun", "Żyrardów, PL", "Feb 2025"], ["Woven", "Kaunas, LT", "May 2025"]],
  hemp: [["Grown", "Champagne, FR", "2024"], ["Dew retted", "In field, 28 days", "Sep 2024"], ["Decorticated", "Troyes, FR", "Dec 2024"], ["Spun", "Ningbo, CN", "Mar 2025"], ["Woven", "Ningbo, CN", "Apr 2025"]],
  tow: [["Grown", "Normandy, FR", "2024"], ["Dew retted", "In field, 21 days", "Aug 2024"], ["Hackled", "Kortrijk, BE", "Dec 2024"], ["Dry spun", "Kaunas, LT", "Mar 2025"], ["Woven", "Kaunas, LT", "Jun 2025"]],
};

export function FlaxProvenance({ compact = false }: { readonly compact?: boolean }) {
  const [materialId, setMaterialId] = useState<string>("flax");
  const selected = MATERIALS.find((material) => material.id === materialId) ?? MATERIALS[0];
  const chain = CHAIN[selected.id];

  return (
    <div className="flex h-full min-h-0 flex-col text-[var(--sample-text)]" style={DISPLAY}>
      {/* ── masthead ── */}
      <header className={cn("flex shrink-0 items-baseline justify-between gap-3 border-b border-[var(--sample-border)]", compact ? "pb-1" : "pb-2")}>
        <div className="min-w-0">
          <h2 className={cn("truncate uppercase leading-none", compact ? "text-[0.62rem] tracking-[0.18em]" : "text-[0.95rem] tracking-[0.28em]")}>
            Undyed
          </h2>
          <p className={cn("truncate text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "mt-1 text-[8px]")}>
            Material index &middot; nothing here is dyed, so the colour is the fibre
          </p>
        </div>
        <span className={cn("shrink-0 whitespace-nowrap uppercase tracking-[0.16em] text-[var(--sample-muted)]", compact ? "hidden" : "text-[7px] md:inline")}>
          {selected.lot}
        </span>
      </header>

      {/* ── swatch rail: the four fibres, in their own colours ── */}
      <nav aria-label="material index" className={cn("shrink-0 gap-1", compact ? "flex py-1" : "grid grid-cols-2 py-2 md:flex")}>
        {MATERIALS.map((material) => {
          const active = material.id === materialId;
          return (
            <button
              aria-pressed={active}
              className={cn(
                "flex min-w-0 flex-1 items-center gap-1.5 border px-1.5 text-left transition-colors",
                FOCUS,
                compact ? "py-0.5" : "py-1",
                active ? "border-[var(--sample-primary)] bg-[var(--sample-surface)]" : "border-[var(--sample-border)]",
              )}
              key={material.id}
              onClick={() => setMaterialId(material.id)}
              title={material.name}
              type="button"
            >
              <span
                aria-hidden="true"
                className={cn("shrink-0 border border-[rgb(var(--st-text-rgb)/0.25)]", compact ? "h-2.5 w-2.5" : "h-4 w-4")}
                style={{ backgroundColor: material.swatch }}
              />
              <span className={cn("min-w-0 truncate uppercase tracking-[0.08em]", compact ? "text-[4.5px]" : "text-[7px]", active ? "text-[var(--sample-primary)]" : "text-[var(--sample-muted)]")}>
                {material.fibre}
              </span>
            </button>
          );
        })}
      </nav>

      <div className={cn("grid min-h-0 flex-1", compact ? "grid-cols-[1fr_1.05fr] gap-2" : "grid-cols-1 gap-3 md:grid-cols-[1.05fr_1fr] md:gap-5")}>
        {/* ── the fibre itself ── */}
        <figure className="relative m-0 min-h-0 min-w-0 overflow-hidden border border-[var(--sample-border)]">
          <span
            aria-hidden="true"
            className="absolute inset-0 block"
            style={{ backgroundImage: `url('${FIBRE_IMAGE}')`, backgroundPosition: "center 46%", backgroundSize: "cover" }}
          />
          <figcaption className={cn("absolute inset-x-0 bottom-0 truncate uppercase tracking-[0.14em]", compact ? "px-1 py-0.5 text-[4px]" : "px-2 py-1 text-[6px]")} style={{ backgroundColor: "rgb(var(--st-base-rgb) / 0.86)" }}>
            Undyed cloth, loom state, three weights
          </figcaption>
        </figure>

        {/* ── material record ── */}
        <section aria-label="material record" className="flex min-h-0 min-w-0 flex-col overflow-hidden">
          <h3 className={cn("truncate leading-tight", compact ? "text-[0.72rem]" : "text-[1.15rem]")}>{selected.name}</h3>
          <p className={cn("truncate text-[var(--sample-primary)]", compact ? "text-[5px]" : "text-[8.5px]")}>{selected.certification}</p>

          <dl className={cn("grid grid-cols-2", compact ? "mt-1 gap-x-2 gap-y-0.5" : "mt-2 gap-x-4 gap-y-1.5")}>
            {([["Weave", selected.weave], ["Weight", selected.weight], ["Width", selected.width], ["Fibre", selected.fibre]] as const).map(([label, value]) => (
              <div className="min-w-0 border-t border-[var(--sample-border)] pt-0.5" key={label}>
                <dt className={cn("truncate uppercase tracking-[0.12em] text-[var(--sample-muted)]", compact ? "text-[4px]" : "text-[6px]")}>{label}</dt>
                <dd className={cn("truncate", compact ? "text-[5.5px]" : "text-[8.5px]")}>{value}</dd>
              </div>
            ))}
          </dl>

          {/* ── provenance chain ── */}
          <div aria-label="provenance chain" className={cn("min-h-0 flex-1 overflow-hidden", compact ? "mt-1.5" : "mt-3")}>
            <p className={cn("truncate uppercase tracking-[0.16em] text-[var(--sample-muted)]", compact ? "text-[4px]" : "text-[6.5px]")}>
              Provenance &mdash; every step, where and when
            </p>
            <ol className="relative mt-1">
              {/* the run of the chain, behind the stops */}
              <span
                aria-hidden="true"
                className={cn("absolute w-px bg-[var(--sample-border)]", compact ? "bottom-2 left-[2px] top-2" : "bottom-2.5 left-[3px] top-2.5")}
              />
              {(compact ? chain.slice(0, 3) : chain).map(([step, place, when]) => (
                <li className={cn("relative flex items-baseline gap-2", compact ? "py-[1px]" : "py-[3px]")} key={step}>
                  <span
                    aria-hidden="true"
                    className={cn("shrink-0 translate-y-[-1px] rounded-full ring-2 ring-[var(--sample-base)]", compact ? "h-1 w-1" : "h-1.5 w-1.5")}
                    style={{ backgroundColor: "var(--sample-primary)" }}
                  />
                  <span className={cn("w-[4.6rem] shrink-0 truncate uppercase tracking-[0.08em] text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "text-[6.5px]")}>{step}</span>
                  <span className={cn("min-w-0 flex-1 truncate", compact ? "text-[5.5px]" : "text-[8.5px]")}>{place}</span>
                  <span className={cn("shrink-0 whitespace-nowrap tabular-nums text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "text-[7.5px]")}>{when}</span>
                </li>
              ))}
            </ol>
          </div>

          <span
            className={cn("mt-1.5 flex shrink-0 items-center justify-center whitespace-nowrap uppercase text-[var(--sample-surface)]", compact ? "h-4 text-[4.5px] tracking-[0.08em]" : "h-7 text-[8px] tracking-[0.16em]")}
            style={{ backgroundColor: "var(--sample-primary)" }}
          >
            Request a cutting
          </span>
        </section>
      </div>

      <footer className={cn("shrink-0 truncate border-t border-[var(--sample-border)] text-[var(--sample-muted)]", compact ? "mt-1 pt-1 text-[4.5px]" : "mt-2 pt-1.5 text-[7.5px]")}>
        Sold by the metre from the piece &middot; every lot traceable to the field it grew in
      </footer>
    </div>
  );
}
