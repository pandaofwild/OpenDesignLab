"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DISPLAY: CSSProperties = { fontFamily: "var(--st-font-display)" };

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent-2)]" as const;

/* Baroque, read as the theatre it invented rather than as another dark museum
   page. Photography-free: the whole style is built from Baroque form language —
   a gilded proscenium whose scrollwork frames the page (ornament as structure),
   tenebrist light falling from one source above the stage into near-black,
   crimson velvet swags, volutes and a cartouche, and a horseshoe of boxes whose
   curve is the point. Gilt and crimson lake on an almost black ground. */

/* One warm source above the stage, everything else swallowed: tenebrism, not a
   flat maroon wash. */
const TENEBRISM =
  "radial-gradient(116% 88% at 34% -12%, rgb(235 201 111 / 0.3) 0%, rgb(199 148 48 / 0.1) 24%, rgb(10 7 5 / 0.6) 56%, rgb(10 7 5 / 0.97) 100%), radial-gradient(80% 60% at 92% 108%, rgb(140 21 36 / 0.32), transparent 62%)" as const;

type Tier = {
  readonly boxes: number;
  readonly id: string;
  readonly label: string;
  readonly name: string;
  readonly note: string;
  readonly price: string;
  readonly remaining: string;
  readonly rx: number;
  readonly ry: number;
};

/* Palchi ordered outward from the stage, as a Venetian opera house lists them. */
const TIERS: readonly Tier[] = [
  { boxes: 9, id: "primo", label: "I", name: "Palco I ordine", note: "Six seats, antechamber, own key", price: "€ 180", remaining: "4 left", rx: 30, ry: 46 },
  { boxes: 11, id: "secondo", label: "II", name: "Palco II ordine", note: "Six seats, the ambassadors' tier", price: "€ 145", remaining: "7 left", rx: 39, ry: 60 },
  { boxes: 13, id: "terzo", label: "III", name: "Palco III ordine", note: "Four seats, closest to the ceiling", price: "€ 95", remaining: "2 left", rx: 48, ry: 74 },
  { boxes: 15, id: "loggione", label: "IV", name: "Loggione", note: "Standing, sold at the door", price: "€ 24", remaining: "sold at door", rx: 57, ry: 88 },
];

const CAST: ReadonlyArray<readonly [string, string, string]> = [
  ["Orlando", "Vittoria Manfredi", "contralto"],
  ["Alcina", "Chiara Bellandi", "soprano"],
  ["Angelica", "Rosalba Vieri", "soprano"],
  ["Ruggiero", "Elia Sartori", "mezzosoprano"],
  ["Astolfo", "Domenico Ravel", "basso"],
];

const ARIAS: ReadonlyArray<readonly [string, string, string]> = [
  ["Atto I", "Nel profondo cieco mondo", "Orlando"],
  ["Atto II", "Sol da te, mio dolce amore", "Ruggiero"],
  ["Atto III", "Anderò, chiamerò dal profondo", "Orlando"],
];

const REPERTORY: ReadonlyArray<readonly [string, string, string]> = [
  ["Vivaldi", "Orlando furioso", "feb"],
  ["Monteverdi", "L'incoronazione", "mar"],
  ["Handel", "Rinaldo", "apr"],
  ["Purcell", "Dido and Aeneas", "mag"],
  ["Scarlatti", "Il Mitridate", "giu"],
];

/* An acanthus volute — the curl that makes a corner read as Baroque rather
   than as a rectangle with a bevel. */
function ScrollCorner({ className }: { readonly className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 100 100">
      <path d="M2 98C2 46 46 2 98 2" stroke="var(--sample-primary)" strokeWidth="2" />
      <path d="M2 74C22 72 33 60 31 46c-2-11-15-14-20-6-4 7 3 14 10 11" stroke="var(--sample-accent-2)" strokeWidth="1.6" />
      <path d="M74 2c-2 20-14 31-28 29-11-2-14-15-6-20 7-4 14 3 11 10" stroke="var(--sample-accent-2)" strokeWidth="1.6" />
      <path d="M14 92c14-6 24-16 30-30" stroke="var(--sample-primary)" strokeOpacity="0.55" strokeWidth="1.2" />
    </svg>
  );
}

/* The proscenium valance: crimson velvet with a scalloped hem and a gilt
   fringe, drawn rather than photographed. */
function Valance({ className }: { readonly className?: string }) {
  const scallops = Array.from({ length: 10 }, (_scallop, index) => {
    const x = index * 40;
    return `C${x + 10} 21 ${x + 30} 21 ${x + 40} 8`;
  }).join("");

  return (
    <svg aria-hidden="true" className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 400 22">
      <path d={`M0 0V8${scallops}V0Z`} fill="var(--sample-accent)" />
      <path d={`M0 8${scallops}`} stroke="var(--sample-primary)" strokeWidth="1.2" />
      {Array.from({ length: 10 }, (_fringe, index) => (
        <circle cx={index * 40 + 20} cy="15.5" fill="var(--sample-accent-2)" key={index} r="1.6" />
      ))}
    </svg>
  );
}

/* The house seen from above: a horseshoe of boxes wrapped round the stage.
   Boxes sit on the balcony fronts and turn to face the proscenium. */
function HousePlan({ activeId, compact }: { readonly activeId: string; readonly compact: boolean }) {
  return (
    <svg aria-hidden="true" className="h-full w-full" fill="none" viewBox="0 0 200 128">
      {/* palcoscenico */}
      <rect fill="rgb(140 21 36 / 0.6)" height="17" stroke="var(--sample-primary)" strokeWidth="1" width="72" x="64" y="1" />
      <text fill="var(--sample-primary)" fontSize="6" letterSpacing="1.4" textAnchor="middle" x="100" y="12">
        PALCOSCENICO
      </text>
      {/* platea */}
      <path
        d="M74 18a26 30 0 0 0 52 0"
        fill="rgb(199 148 48 / 0.07)"
        stroke="rgb(123 92 45 / 0.7)"
        strokeWidth="0.8"
      />
      <text fill="var(--sample-muted)" fontSize="5" letterSpacing="1.2" textAnchor="middle" x="100" y="33">
        PLATEA
      </text>
      {TIERS.map((tier) => {
        const active = tier.id === activeId;
        const boxes = Array.from({ length: tier.boxes }, (_box, index) => {
          const angle = (Math.PI * index) / (tier.boxes - 1);
          // Node and the browser do not agree on the last bit of cos/atan2, so
          // the raw values hydrate as different attribute strings. Fix the
          // precision and both sides render the same plan.
          const x = Number((100 - tier.rx * Math.cos(angle)).toFixed(2));
          const y = Number((18 + tier.ry * Math.sin(angle)).toFixed(2));
          const degrees = ((Math.atan2(tier.ry * Math.cos(angle), tier.rx * Math.sin(angle)) * 180) / Math.PI).toFixed(1);
          return (
            <rect
              fill={active ? "var(--sample-primary)" : "rgb(25 16 9 / 0.95)"}
              height="4.4"
              key={index}
              stroke={active ? "var(--sample-accent-2)" : "rgb(123 92 45 / 0.85)"}
              strokeWidth="0.7"
              transform={`rotate(${degrees} ${x} ${y})`}
              width="7"
              x={Number((x - 3.5).toFixed(2))}
              y={Number((y - 2.2).toFixed(2))}
            />
          );
        });
        return (
          <g key={tier.id} opacity={active ? 1 : 0.72}>
            {/* balcony front */}
            <path
              d={`M${100 - tier.rx} 18A${tier.rx} ${tier.ry} 0 0 1 ${100 + tier.rx} 18`}
              stroke={active ? "var(--sample-accent-2)" : "rgb(123 92 45 / 0.55)"}
              strokeWidth={active ? 1 : 0.7}
            />
            {boxes}
            {compact ? null : (
              <text
                fill={active ? "var(--sample-accent-2)" : "var(--sample-muted)"}
                fontSize="5"
                textAnchor="middle"
                x="100"
                y={18 + tier.ry - 2.5}
              >
                {tier.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* Rule — S-scroll — rule. The Baroque divider is never a plain line. */
function ScrollDivider({ className }: { readonly className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 200 14">
      <path d="M0 7h74M126 7h74" stroke="var(--sample-border)" strokeWidth="1" />
      <path d="M74 7c6-7 14-7 20 0s14 7 20 0" stroke="var(--sample-primary)" strokeWidth="1.4" />
      <path d="M94 7a6 6 0 1 0 12 0 6 6 0 1 0-12 0" stroke="var(--sample-accent-2)" strokeWidth="1" />
    </svg>
  );
}

export function TeatroSanCassiano({ compact = false }: { readonly compact?: boolean }) {
  const [tierId, setTierId] = useState<string>("secondo");
  const selectedTier = TIERS.find((tier) => tier.id === tierId) ?? TIERS[0];

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden text-[var(--sample-text)]" style={DISPLAY}>
      <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: TENEBRISM }} />

      {/* ── gilded proscenium: the ornament IS the page frame ── */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 border border-[var(--sample-border)]" />
      <ScrollCorner className={cn("pointer-events-none absolute left-0 top-0", compact ? "h-6 w-6" : "h-10 w-10")} />
      <ScrollCorner className={cn("pointer-events-none absolute right-0 top-0 -scale-x-100", compact ? "h-6 w-6" : "h-10 w-10")} />
      <ScrollCorner className={cn("pointer-events-none absolute bottom-0 left-0 -scale-y-100", compact ? "h-6 w-6" : "h-10 w-10")} />
      <ScrollCorner className={cn("pointer-events-none absolute bottom-0 right-0 -scale-100", compact ? "h-6 w-6" : "h-10 w-10")} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-[5px] border border-[rgb(var(--st-border-rgb)/0.55)]" />
      {/* crimson velvet valance across the proscenium */}
      <Valance className={cn("pointer-events-none absolute inset-x-0 top-0 w-full", compact ? "h-3" : "h-5")} />

      <div className={cn("relative flex h-full min-h-0 flex-col", compact ? "px-2.5 pb-2 pt-3.5" : "px-5 pb-3.5 pt-6")}>
        {/* ── cartouche masthead ── */}
        <header aria-label="gilded proscenium" className="shrink-0 text-center">
          <div className="flex items-center justify-center gap-2">
            <span aria-hidden="true" className={cn("h-px flex-1 bg-[var(--sample-border)]", compact ? "max-w-[2rem]" : "")} />
            <span
              className={cn("relative whitespace-nowrap uppercase leading-none text-[var(--sample-primary)]", compact ? "px-2 text-[0.62rem] tracking-[0.16em]" : "px-4 text-[0.95rem] tracking-[0.28em]")}
              style={{ textShadow: "0 0 18px rgb(235 201 111 / 0.35)" }}
            >
              Teatro San Cassiano
            </span>
            <span aria-hidden="true" className={cn("h-px flex-1 bg-[var(--sample-border)]", compact ? "max-w-[2rem]" : "")} />
          </div>
          <p className={cn("italic text-[var(--sample-muted)]", compact ? "mt-px text-[5.5px]" : "mt-1 text-[8px]")}>
            Venezia &middot; primo teatro d&rsquo;opera pubblico &middot; MDCXXXVII
          </p>
        </header>

        <div className={cn("grid min-h-0 flex-1", compact ? "grid-cols-[1fr_0.92fr] gap-2.5 pt-2" : "grid-cols-1 gap-4 pt-3 md:grid-cols-[1.02fr_0.98fr] md:gap-6")}>
          {/* ── the affiche: what is given tonight ── */}
          <section className="flex min-h-0 min-w-0 flex-col">
            <p className={cn("uppercase text-[var(--sample-accent-2)]", compact ? "text-[5.5px] tracking-[0.18em]" : "text-[8px] tracking-[0.26em]")}>
              questa sera &middot; dramma per musica in tre atti
            </p>
            <h2
              className={cn("mt-1 leading-[0.98] text-[var(--sample-text)]", compact ? "text-[0.92rem]" : "text-[1.6rem] md:text-[2rem]")}
              style={{ textShadow: "0 2px 26px rgb(235 201 111 / 0.22)" }}
            >
              Orlando furioso
            </h2>
            <p className={cn("italic text-[var(--sample-muted)]", compact ? "text-[6px]" : "mt-0.5 text-[10px]")}>
              Antonio Vivaldi &middot; RV 728 &middot; libretto di Grazio Braccioli
            </p>
            <ScrollDivider className={cn("w-full text-[var(--sample-primary)]", compact ? "my-1 h-2" : "my-2.5 h-3.5")} />

            <div aria-label="cast table" className="min-h-0 flex-1">
              <div className={cn("flex items-baseline justify-between border-b border-[var(--sample-border)] pb-0.5 uppercase text-[var(--sample-muted)]", compact ? "text-[5px] tracking-[0.12em]" : "text-[7px] tracking-[0.2em]")}>
                <span>Personaggi</span>
                <span>Interpreti</span>
              </div>
              {(compact ? CAST.slice(0, 4) : CAST).map(([role, singer, voice]) => (
                <div
                  className={cn("grid grid-cols-[auto_1fr_auto] items-baseline gap-2 border-b border-[rgb(var(--st-border-rgb)/0.28)]", compact ? "py-[3px]" : "py-1.5")}
                  key={role}
                >
                  <span className={cn("shrink-0 truncate italic text-[var(--sample-primary)]", compact ? "text-[6.5px]" : "text-[10px]")}>{role}</span>
                  <span className={cn("min-w-0 truncate text-right text-[var(--sample-text)]", compact ? "text-[6.5px]" : "text-[10px]")}>{singer}</span>
                  <span className={cn("shrink-0 whitespace-nowrap uppercase text-[var(--sample-muted)]", compact ? "hidden" : "w-[7.5rem] text-right text-[7.5px] tracking-[0.14em]")}>
                    {voice}
                  </span>
                </div>
              ))}
              <p className={cn("italic text-[var(--sample-muted)]", compact ? "hidden" : "mt-2 text-[8px]")}>
                al cembalo e direzione &mdash; Bernardo Cassetti &middot; orchestra su strumenti originali
              </p>
            </div>

            {/* arie principali — the numbers the house comes for */}
            <div className={cn("shrink-0", compact ? "hidden" : "mt-2 border-t border-[var(--sample-border)] pt-1.5")}>
              <p className="text-[7px] uppercase tracking-[0.2em] text-[var(--sample-muted)]">Arie principali</p>
              {ARIAS.map(([act, incipit, role]) => (
                <div className="mt-1 flex items-baseline gap-2" key={incipit}>
                  <span className="w-[3.2rem] shrink-0 whitespace-nowrap text-[7px] uppercase tracking-[0.12em] text-[var(--sample-accent-2)]">{act}</span>
                  <span className="min-w-0 flex-1 truncate text-[9px] italic text-[var(--sample-text)]">&ldquo;{incipit}&rdquo;</span>
                  <span className="shrink-0 whitespace-nowrap text-[7.5px] text-[var(--sample-muted)]">{role}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── the house: a horseshoe of boxes, drawn as the real plan ── */}
          <section aria-label="box tier plan" className="flex min-h-0 min-w-0 flex-col">
            <div className={cn("relative flex min-h-0 flex-1 flex-col border border-[rgb(var(--st-border-rgb)/0.55)]", compact ? "min-h-[4.5rem] p-1" : "min-h-[7.5rem] p-1.5")}>
              <p className={cn("shrink-0 truncate text-center uppercase text-[var(--sample-muted)]", compact ? "text-[4.5px] tracking-[0.1em]" : "text-[6.5px] tracking-[0.22em]")}>
                La sala &middot; pianta dei palchi
              </p>
              <div className="min-h-0 flex-1">
                <HousePlan activeId={tierId} compact={compact} />
              </div>
            </div>

            <div aria-label="tier prices" className={cn("shrink-0", compact ? "mt-1" : "mt-2")}>
              {(compact ? TIERS.slice(0, 3) : TIERS).map((tier) => {
                const active = tier.id === tierId;
                return (
                  <button
                    aria-pressed={active}
                    className={cn(
                      "flex w-full min-w-0 items-center gap-2 border-t border-[rgb(var(--st-border-rgb)/0.35)] text-left transition-colors last:border-b",
                      FOCUS,
                      compact ? "py-[3px]" : "py-1.5",
                      active ? "bg-[rgb(140_21_36_/_0.35)]" : "",
                    )}
                    key={tier.id}
                    onClick={() => setTierId(tier.id)}
                    type="button"
                  >
                    <span
                      className={cn("grid shrink-0 place-items-center border text-[var(--sample-primary)]", compact ? "h-3 w-3 text-[5px]" : "h-4 w-4 text-[7px]")}
                      style={{ borderColor: active ? "var(--sample-accent-2)" : "var(--sample-border)" }}
                    >
                      {tier.label}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block truncate text-[var(--sample-text)]", compact ? "text-[6.5px]" : "text-[10px]")}>{tier.name}</span>
                      <span className={cn("block truncate italic text-[var(--sample-muted)]", compact ? "hidden" : "text-[7.5px]")}>{tier.note}</span>
                    </span>
                    <span className={cn("shrink-0 whitespace-nowrap tabular-nums text-[var(--sample-primary)]", compact ? "text-[6px]" : "text-[10px]")}>{tier.price}</span>
                  </button>
                );
              })}
            </div>

            <div className={cn("flex shrink-0 items-center gap-2", compact ? "mt-1" : "mt-2")}>
              <span
                className={cn("flex flex-1 items-center justify-center whitespace-nowrap border border-[var(--sample-primary)] uppercase text-[var(--sample-text)]", compact ? "h-5 text-[5.5px] tracking-[0.12em]" : "h-8 text-[9px] tracking-[0.2em]")}
                style={{ backgroundColor: "var(--sample-accent)", boxShadow: "var(--st-shadow)" }}
              >
                Riservare un palco
              </span>
              <span className={cn("shrink-0 whitespace-nowrap italic text-[var(--sample-muted)]", compact ? "text-[5px]" : "text-[8px]")}>
                {selectedTier.remaining}
              </span>
            </div>
          </section>
        </div>

        {/* ── stagione: the repertory strip ── */}
        <footer aria-label="repertory" className={cn("shrink-0 border-t border-[var(--sample-border)]", compact ? "mt-1 pt-1" : "mt-3 pt-2")}>
          <div className="flex items-baseline justify-between gap-2">
            {REPERTORY.map(([composer, work, month], index) => (
              <span
                className={cn("min-w-0 flex-1 truncate", index > 2 ? "hidden md:block" : "", compact && index > 2 ? "hidden" : "")}
                key={composer}
              >
                <span className={cn("block truncate uppercase text-[var(--sample-primary)]", compact ? "text-[5px] tracking-[0.1em]" : "text-[7px] tracking-[0.18em]")}>
                  {composer}
                </span>
                <span className={cn("block truncate italic text-[var(--sample-muted)]", compact ? "text-[5px]" : "text-[8px]")}>
                  {work} &middot; {month}
                </span>
              </span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
