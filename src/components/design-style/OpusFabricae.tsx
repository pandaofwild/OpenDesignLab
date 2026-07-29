"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DISPLAY: CSSProperties = { fontFamily: "var(--st-font-display)" };

const LANCET_IMAGE = "/generated/design-styles/gothic.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent-2)]" as const;

/* Gothic, read from its own structural logic rather than as a dark page. The
   pointed arch, the rib vault and the flying buttress exist to free the wall
   for light, so the glass has to be the brightest thing here and the stone has
   to be stone — cool limestone, not black. The vehicle is the cathedral's
   works office rather than a visitor page or a shop: the fabric that pays for
   the glazing, bay by bay.

   Verticality is the layout: a lancet-proportioned photograph holds the left
   edge and the working modules are a bay elevation of pointed arches. The
   arches are drawn because they are structure; nothing fussy is drawn. */

type Bay = {
  readonly ferramenta: string;
  readonly glazier: string;
  readonly id: string;
  readonly lights: string;
  readonly numeral: string;
  readonly panels: string;
  readonly raised: string;
  readonly status: "awaiting" | "glazed" | "lodge";
  readonly subject: string;
};

const BAYS: readonly Bay[] = [
  { ferramenta: "Original iron, 1194", glazier: "Atelier de Bourges", id: "jesse", lights: "3 lights", numeral: "I", panels: "24 panels", raised: "£ 1,240", status: "glazed", subject: "The Tree of Jesse" },
  { ferramenta: "Original iron, 1194", glazier: "Atelier de Bourges", id: "samaritan", lights: "3 lights", numeral: "II", panels: "30 panels", raised: "£ 1,105", status: "glazed", subject: "The Good Samaritan" },
  { ferramenta: "Recast, 1873", glazier: "Lodge of the Fabric", id: "passion", lights: "5 lights", numeral: "III", panels: "42 panels", raised: "£ 860", status: "lodge", subject: "The Passion" },
  { ferramenta: "Original iron, 1210", glazier: "Lodge of the Fabric", id: "eustace", lights: "3 lights", numeral: "IV", panels: "26 panels", raised: "£ 640", status: "lodge", subject: "Saint Eustace" },
  { ferramenta: "Recast, 1901", glazier: "Atelier de Bourges", id: "zodiac", lights: "4 lights", numeral: "V", panels: "36 panels", raised: "£ 415", status: "lodge", subject: "The Zodiac and the Labours" },
  { ferramenta: "Missing", glazier: "Not yet let", id: "prodigal", lights: "3 lights", numeral: "VI", panels: "28 panels", raised: "£ 120", status: "awaiting", subject: "The Prodigal Son" },
  { ferramenta: "Missing", glazier: "Not yet let", id: "judgement", lights: "5 lights", numeral: "VII", panels: "48 panels", raised: "£ 60", status: "awaiting", subject: "The Last Judgement" },
];

const STATUS_LABEL: Record<Bay["status"], string> = {
  awaiting: "Awaiting a benefactor",
  glazed: "Glazed and set",
  lodge: "In the lodge",
};

const STATUS_GLASS: Record<Bay["status"], string> = {
  awaiting: "var(--sample-muted)",
  glazed: "var(--sample-primary)",
  lodge: "var(--sample-accent-2)",
};

/* Glazing raised so far, as a fraction of the bay — the fill level in the
   elevation below. */
const STATUS_FILL: Record<Bay["status"], number> = { awaiting: 0.16, glazed: 1, lodge: 0.58 };

const ROLL: ReadonlyArray<readonly [string, string]> = [
  ["Stone", "412 tons, Caen"],
  ["Lead", "9 tons, cames"],
  ["Glass", "1,140 pieces"],
  ["Raised", "£ 4,440 of 7,000"],
];

/* One bay of the elevation: a two-centred pointed arch, filled from the sill
   to the level the fabric has paid for. Geometry is literal so the elevation
   hydrates identically. */
const BAY_WIDTH = 36;
const BAY_GAP = 8;
const BAY_BASE = 210;
const BAY_SPRING = 60;
const BAY_APEX = 28.8;

function bayPath(index: number) {
  const x = 8 + index * (BAY_WIDTH + BAY_GAP);
  const half = x + BAY_WIDTH / 2;
  const right = x + BAY_WIDTH;
  return `M${x} ${BAY_BASE}V${BAY_SPRING}A${BAY_WIDTH} ${BAY_WIDTH} 0 0 1 ${half} ${BAY_APEX}A${BAY_WIDTH} ${BAY_WIDTH} 0 0 1 ${right} ${BAY_SPRING}V${BAY_BASE}Z`;
}

function BayElevation({ activeId, compact, onSelect }: { readonly activeId: string; readonly compact: boolean; readonly onSelect: (id: string) => void }) {
  return (
    <svg className="h-full w-full" fill="none" preserveAspectRatio="xMidYMax meet" viewBox="0 22 316 200">
      <defs>
        {BAYS.map((bay, index) => (
          <clipPath id={`bay-${bay.id}`} key={bay.id}>
            <path d={bayPath(index)} />
          </clipPath>
        ))}
      </defs>
      {BAYS.map((bay, index) => {
        const active = bay.id === activeId;
        const x = 8 + index * (BAY_WIDTH + BAY_GAP);
        const fill = STATUS_FILL[bay.status];
        const top = BAY_BASE - (BAY_BASE - BAY_APEX) * fill;
        return (
          <g key={bay.id}>
            <g clipPath={`url(#bay-${bay.id})`}>
              <rect fill="var(--sample-surface)" height="220" width={BAY_WIDTH} x={x} y="0" />
              <rect fill={STATUS_GLASS[bay.status]} height={BAY_BASE - top} opacity={active ? 0.92 : 0.62} width={BAY_WIDTH} x={x} y={top} />
              {/* saddle bars, the horizontal irons a glazier sets panels against */}
              {[80, 112, 144, 176].map((y) => (
                <rect fill="var(--sample-base)" height="1.1" key={y} opacity="0.55" width={BAY_WIDTH} x={x} y={y} />
              ))}
              <rect fill="var(--sample-base)" height="220" opacity="0.5" width="1.1" x={x + BAY_WIDTH / 2 - 0.55} y="0" />
            </g>
            {/* trefoil in the arch head */}
            <g opacity={active ? 1 : 0.6}>
              <circle cx={x + BAY_WIDTH / 2} cy="43" fill="none" r="4.4" stroke="var(--sample-border)" strokeWidth="1" />
              <circle cx={x + BAY_WIDTH / 2 - 5} cy="50" fill="none" r="3.6" stroke="var(--sample-border)" strokeWidth="1" />
              <circle cx={x + BAY_WIDTH / 2 + 5} cy="50" fill="none" r="3.6" stroke="var(--sample-border)" strokeWidth="1" />
            </g>
            <path
              d={bayPath(index)}
              stroke={active ? "var(--sample-accent-2)" : "var(--sample-border)"}
              strokeWidth={active ? 2 : 1.2}
            />
            {compact ? null : (
              <text fill={active ? "var(--sample-accent-2)" : "var(--sample-muted)"} fontSize="7" textAnchor="middle" x={x + BAY_WIDTH / 2} y="220">
                {bay.numeral}
              </text>
            )}
            <path
              className={cn("cursor-pointer", FOCUS)}
              d={bayPath(index)}
              fill="transparent"
              onClick={() => onSelect(bay.id)}
              role="button"
              tabIndex={0}
            />
          </g>
        );
      })}
      {/* the sill the bays stand on */}
      <path d={`M4 ${BAY_BASE}H312`} stroke="var(--sample-border)" strokeWidth="2" />
    </svg>
  );
}

export function OpusFabricae({ compact = false }: { readonly compact?: boolean }) {
  const [bayId, setBayId] = useState<string>("passion");
  const selected = BAYS.find((bay) => bay.id === bayId) ?? BAYS[0];

  return (
    <div className={cn("grid h-full min-h-0 text-[var(--sample-text)]", compact ? "grid-cols-[0.3fr_0.7fr] gap-2" : "grid-cols-[0.32fr_0.68fr] gap-4")} style={DISPLAY}>
      {/* ── the light itself: a lancet-proportioned window, arched at the head ── */}
      <figure className="relative m-0 min-h-0 min-w-0 overflow-hidden bg-[var(--sample-surface)]" style={{ clipPath: "polygon(0 100%, 0 22%, 50% 0, 100% 22%, 100% 100%)" }}>
        <span
          aria-hidden="true"
          className="absolute inset-0 block"
          style={{ backgroundImage: `url('${LANCET_IMAGE}')`, backgroundPosition: "center 42%", backgroundSize: "cover" }}
        />
        <figcaption className={cn("absolute inset-x-0 bottom-0 truncate text-center uppercase text-[var(--sample-text)]", compact ? "py-0.5 text-[4.5px] tracking-[0.1em]" : "py-1 text-[6.5px] tracking-[0.18em]")} style={{ backgroundColor: "rgb(var(--st-base-rgb) / 0.82)" }}>
          Bay III &middot; south choir
        </figcaption>
      </figure>

      <div className="flex min-h-0 min-w-0 flex-col">
        {/* ── masthead ── */}
        <header className="shrink-0 border-b-2 border-[var(--sample-border)] pb-1">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className={cn("truncate uppercase leading-none", compact ? "text-[0.62rem] tracking-[0.16em]" : "text-[0.95rem] tracking-[0.26em]")}>
              Opus Fabricae
            </h2>
            <span className={cn("shrink-0 whitespace-nowrap uppercase tracking-[0.16em] text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "text-[7px]")}>
              Anno MCCXX
            </span>
          </div>
          <p className={cn("truncate italic text-[var(--sample-muted)]", compact ? "text-[5px]" : "mt-0.5 text-[8px]")}>
            The fabric of the cathedral church &mdash; glazing of the choir, bay by bay
          </p>
        </header>

        {/* ── bay elevation ── */}
        <section aria-label="bay elevation" className={cn("min-h-0 flex-1", compact ? "pt-1" : "pt-2")}>
          <BayElevation activeId={bayId} compact={compact} onSelect={setBayId} />
        </section>

        <div className={cn("grid shrink-0 border-t border-[var(--sample-border)]", compact ? "grid-cols-[1.2fr_0.8fr] gap-2 pt-1" : "grid-cols-1 gap-4 pt-2 md:grid-cols-[1.15fr_0.85fr]")}>
          {/* ── bay record ── */}
          <section aria-label="bay record" className="min-w-0 overflow-hidden">
            <div className="flex items-baseline justify-between gap-2">
              <span className={cn("shrink-0 uppercase tracking-[0.2em] text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "text-[7px]")}>Bay {selected.numeral}</span>
              <span
                className={cn("shrink-0 truncate whitespace-nowrap uppercase tracking-[0.12em]", compact ? "text-[4.5px]" : "text-[7px]")}
                style={{ color: STATUS_GLASS[selected.status] }}
              >
                {STATUS_LABEL[selected.status]}
              </span>
            </div>
            <h3 className={cn("truncate leading-tight", compact ? "text-[0.72rem]" : "mt-0.5 text-[1.15rem]")}>{selected.subject}</h3>
            <dl className={cn("grid grid-cols-2", compact ? "mt-1 gap-x-2 gap-y-0.5" : "mt-2 gap-x-4 gap-y-1")}>
              {([["Glazier", selected.glazier], ["Extent", `${selected.lights} · ${selected.panels}`], ["Ferramenta", selected.ferramenta], ["Raised", selected.raised]] as const).map(([label, value]) => (
                <div className="min-w-0 border-l-2 border-[rgb(var(--st-border-rgb)/0.55)] pl-1.5" key={label}>
                  <dt className={cn("truncate uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "text-[6.5px]")}>{label}</dt>
                  <dd className={cn("truncate", compact ? "text-[5.5px]" : "text-[8.5px]")}>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── fabric roll ── */}
          <aside aria-label="fabric roll" className={cn("min-w-0 overflow-hidden md:border-l md:border-[rgb(var(--st-border-rgb)/0.4)] md:pl-4", compact ? "" : "")}>
            <p className={cn("truncate uppercase tracking-[0.2em] text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "text-[7px]")}>Fabric roll</p>
            {(compact ? ROLL.slice(0, 2) : ROLL).map(([label, value]) => (
              <div className={cn("flex items-baseline justify-between gap-2 border-b border-[rgb(var(--st-border-rgb)/0.35)]", compact ? "py-[1px]" : "py-1")} key={label}>
                <span className={cn("shrink-0 whitespace-nowrap uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "text-[6.5px]")}>{label}</span>
                <span className={cn("min-w-0 truncate text-right", compact ? "text-[5.5px]" : "text-[8.5px]")}>{value}</span>
              </div>
            ))}
            <span
              className={cn("mt-1.5 flex items-center justify-center whitespace-nowrap uppercase text-[var(--sample-text)]", compact ? "h-4 text-[4.5px] tracking-[0.1em]" : "h-7 text-[8px] tracking-[0.18em]")}
              style={{ backgroundColor: "var(--sample-accent)" }}
            >
              Endow a light
            </span>
          </aside>
        </div>
      </div>
    </div>
  );
}
