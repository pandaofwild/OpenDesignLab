"use client";

import { Fragment, useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DISPLAY: CSSProperties = { fontFamily: "var(--st-font-display)" };

const FRIEZE_IMAGE = "/generated/design-styles/art-nouveau-frieze.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-primary)]" as const;

/* Art Nouveau, taken to Guimard's Métro rather than to another botanical shop.
   Laid out as an affiche: one lithographic frieze runs full-bleed as the
   masthead and the title band lies across it, feathering out at both ends so
   the ornament carries on behind the type. Ornament and structure are the
   same object, which is the period's own rule.

   The ornament is printed rather than drawn because every drawn version
   failed — SVG iron stems read as thin squiggles, and a whiplash rendered as
   a stroked path read as a wave, too heavy and too even for the period. The
   working modules below stay drawn. Muted poster ink on cream: dusty sage,
   soft gold, dusty rose, faded teal, never at full saturation. */

type Station = {
  readonly correspondances: readonly string[];
  readonly entrance: string;
  readonly first: string;
  readonly id: string;
  readonly last: string;
  readonly name: string;
  readonly opened: string;
};

const STATIONS: readonly Station[] = [
  { correspondances: ["C"], entrance: "Édicule à marquise", first: "5h28", id: "maillot", last: "0h42", name: "Porte Maillot", opened: "1900" },
  { correspondances: ["2", "6"], entrance: "Entourage à écusson", first: "5h31", id: "etoile", last: "0h39", name: "Étoile", opened: "1900" },
  { correspondances: ["8", "12"], entrance: "Entourage à cartouche", first: "5h36", id: "concorde", last: "0h35", name: "Concorde", opened: "1900" },
  { correspondances: ["7"], entrance: "Édicule Guimard", first: "5h39", id: "palais", last: "0h32", name: "Palais-Royal", opened: "1900" },
  { correspondances: ["4", "7", "11"], entrance: "Entourage à écusson", first: "5h42", id: "chatelet", last: "0h29", name: "Châtelet", opened: "1900" },
  { correspondances: ["5", "8"], entrance: "Édicule à marquise", first: "5h46", id: "bastille", last: "0h25", name: "Bastille", opened: "1900" },
  { correspondances: ["2", "6", "9"], entrance: "Entourage à cartouche", first: "5h50", id: "nation", last: "0h21", name: "Nation", opened: "1900" },
];

const FARES: ReadonlyArray<readonly [string, string, string]> = [
  ["Billet simple", "2e classe", "15 c."],
  ["Carnet de dix", "2e classe", "1,25 F"],
  ["Aller-retour", "1re classe", "40 c."],
];

const DEPARTURES: ReadonlyArray<readonly [string, string, string]> = [
  ["Porte de Vincennes", "M.1 — 8 voitures", "2 min"],
  ["Porte Maillot", "M.1 — 8 voitures", "4 min"],
  ["Porte de Vincennes", "M.1 — 6 voitures", "9 min"],
];

const LIGNES: ReadonlyArray<readonly [string, string, string]> = [
  ["1", "Maillot — Vincennes", "1900"],
  ["2", "Étoile — Nation", "1903"],
  ["3", "Villiers — Père-Lachaise", "1904"],
  ["4", "Châtelet — Orléans", "1908"],
];

/* The transom over the entrance: a low, wide leaded panel. The radiating fan
   this replaced was mechanical and left an awkward boss at the springing
   point; a real transom is a shallow arch, a few large cells of glass, and one
   lead line that curves across them. Geometry is literal so the panel is
   identical on both sides of hydration. */
const TRANSOM_PANEL = "M3 47V22Q150 3 297 22V47Z";
const TRANSOM_MULLIONS = [
  { top: 15.9, x: 62 },
  { top: 12.9, x: 121 },
  { top: 12.9, x: 179 },
  { top: 15.9, x: 238 },
];
const TRANSOM_CELLS: ReadonlyArray<readonly [number, number, string]> = [
  [3, 59, "rgb(var(--st-accent-3-rgb) / 0.42)"],
  [62, 59, "rgb(var(--st-accent-rgb) / 0.36)"],
  [121, 58, "rgb(var(--st-accent-2-rgb) / 0.32)"],
  [179, 59, "rgb(var(--st-accent-rgb) / 0.36)"],
  [238, 59, "rgb(var(--st-accent-3-rgb) / 0.42)"],
];

function LeadedTransom({ className }: { readonly className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" preserveAspectRatio="none" viewBox="0 0 300 50">
      <defs>
        <clipPath id="an-transom">
          <path d={TRANSOM_PANEL} />
        </clipPath>
      </defs>
      <g clipPath="url(#an-transom)">
        {TRANSOM_CELLS.map(([x, width, fill]) => (
          <rect fill={fill} height="46" key={x} width={width} x={x} y="2" />
        ))}
        {/* the one lead line that curves, crossing the cells */}
        <path
          d="M3 40C42 40 56 23 100 23C144 23 156 41 200 41C232 41 252 30 297 28"
          stroke="var(--sample-primary)"
          strokeOpacity="0.75"
          strokeWidth="1.6"
        />
      </g>
      {TRANSOM_MULLIONS.map(({ top, x }) => (
        <path d={`M${x} ${top}V47`} key={x} stroke="var(--sample-border)" strokeWidth="1.1" />
      ))}
      <path d={TRANSOM_PANEL} stroke="var(--sample-primary)" strokeWidth="1.8" />
      <path d="M3 47H297" stroke="var(--sample-primary)" strokeWidth="2.4" />
    </svg>
  );
}

export function MetropolitainLine({ compact = false }: { readonly compact?: boolean }) {
  const [stationId, setStationId] = useState<string>("palais");
  const selected = STATIONS.find((station) => station.id === stationId) ?? STATIONS[0];

  return (
    <div className="flex h-full min-h-0 flex-col text-[var(--sample-text)]" style={DISPLAY}>
      {/* ── affiche head: the frieze is the masthead, the type sits inside it ── */}
      <header aria-label="whiplash frieze" className={cn("relative shrink-0 overflow-hidden border-y-2 border-[var(--sample-primary)]", compact ? "h-[4.5rem]" : "h-[9rem] md:h-[10rem]")}>
        <span
          aria-hidden="true"
          className="absolute inset-0 block"
          style={{
            backgroundImage: `url('${FRIEZE_IMAGE}')`,
            // Hold the blooms, the sweeping stems and the coiled croziers in frame.
            backgroundPosition: "center 50%",
            backgroundSize: "cover",
          }}
        />
        {/* the title band lies across the ornament and feathers out at both
            ends, so the frieze runs on behind it */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          <div
            className={cn("w-full text-center", compact ? "px-3 py-1" : "px-4 py-2.5 md:px-10")}
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(var(--st-base-rgb) / 0) 0%, rgb(var(--st-base-rgb) / 0.97) 15%, rgb(var(--st-base-rgb) / 0.97) 85%, rgb(var(--st-base-rgb) / 0) 100%)",
            }}
          >
            <p className={cn("truncate uppercase text-[var(--sample-muted)]", compact ? "text-[4.5px] tracking-[0.16em]" : "text-[7px] tracking-[0.26em]")}>
              Compagnie du chemin de fer de Paris
            </p>
            <h2
              className={cn("truncate uppercase leading-none text-[var(--sample-primary)]", compact ? "mt-0.5 text-[0.7rem] tracking-[0.14em]" : "mt-1.5 text-[0.95rem] tracking-[0.1em] md:text-[1.5rem] md:tracking-[0.28em]")}
            >
              MÉTROPOLITAIN
            </h2>
            <span aria-hidden="true" className={cn("mx-auto flex items-center justify-center", compact ? "my-0.5 gap-1" : "my-1.5 gap-2")}>
              <span className={cn("block bg-[var(--sample-primary)]", compact ? "h-px w-6" : "h-[1.5px] w-16")} />
              <span className={cn("block rotate-45 bg-[var(--sample-accent)]", compact ? "h-1 w-1" : "h-1.5 w-1.5")} />
              <span className={cn("block bg-[var(--sample-primary)]", compact ? "h-px w-6" : "h-[1.5px] w-16")} />
            </span>
            <p className={cn("truncate italic text-[var(--sample-text)]", compact ? "text-[5px]" : "text-[9px]")}>
              ligne n&deg; 1<span className="hidden md:inline"> &middot; Porte Maillot &mdash; Porte de Vincennes</span>{" "}
              &middot; MCM
            </p>
          </div>
        </div>
      </header>

      {/* ── station index: the stops the frieze used to carry ── */}
      <nav aria-label="station index" className={cn("flex shrink-0 items-center justify-between gap-1 border-b border-[var(--sample-border)]", compact ? "py-0.5" : "py-1.5")}>
        {STATIONS.map((station, index) => {
          const active = station.id === stationId;
          return (
            <Fragment key={station.id}>
              {index > 0 ? (
                <span aria-hidden="true" className={cn("shrink-0 rotate-45 border border-[var(--sample-accent-3)]", compact ? "h-[3px] w-[3px]" : "h-1 w-1", !compact && index > 4 ? "hidden md:block" : "")} />
              ) : null}
              <button
                aria-pressed={active}
                className={cn(
                  "min-w-0 truncate uppercase transition-colors",
                  FOCUS,
                  !compact && index > 4 ? "hidden md:block" : "",
                  compact ? "text-[4.5px] tracking-[0.06em]" : "text-[7px] tracking-[0.14em]",
                  active ? "text-[var(--sample-primary)] underline decoration-[var(--sample-accent)] decoration-2 underline-offset-4" : "text-[var(--sample-muted)] hover:text-[var(--sample-text)]",
                )}
                onClick={() => setStationId(station.id)}
                title={station.name}
                type="button"
              >
                {station.name}
              </button>
            </Fragment>
          );
        })}
      </nav>

      <div className={cn("grid min-h-0 flex-1", compact ? "grid-cols-[1.1fr_0.9fr] gap-2 pt-1" : "grid-cols-1 gap-4 pt-3 md:grid-cols-[1.06fr_0.94fr] md:gap-6")}>
        {/* ── station record ── */}
        <section aria-label="station record" className="flex min-h-0 min-w-0 flex-col overflow-hidden">
          <div className="flex items-baseline justify-between gap-2 border-b border-[var(--sample-border)] pb-1">
            <span className={cn("truncate uppercase tracking-[0.2em] text-[var(--sample-muted)]", compact ? "text-[5px]" : "text-[7px]")}>Station</span>
            <span className={cn("shrink-0 italic text-[var(--sample-muted)]", compact ? "text-[5px]" : "text-[7.5px]")}>ouverte en {selected.opened}</span>
          </div>
          <h3 className={cn("mt-1 truncate leading-tight text-[var(--sample-text)]", compact ? "text-[0.8rem]" : "text-[1.35rem]")}>{selected.name}</h3>

          <div className={cn("flex items-center gap-1.5", compact ? "mt-1" : "mt-2")}>
            <span className={cn("shrink-0 uppercase tracking-[0.14em] text-[var(--sample-muted)]", compact ? "text-[5px]" : "text-[7px]")}>Correspondances</span>
            {selected.correspondances.map((line) => (
              <span
                className={cn("grid shrink-0 place-items-center rounded-full text-[var(--sample-surface)]", compact ? "h-3 w-3 text-[5px]" : "h-4 w-4 text-[7.5px]")}
                key={line}
                style={{ backgroundColor: "var(--sample-accent-2)" }}
              >
                {line}
              </span>
            ))}
          </div>

          <dl className={cn("grid grid-cols-2", compact ? "mt-1 gap-1" : "mt-3 gap-2")}>
            {(compact
              ? ([["Premier train", selected.first], ["Dernier train", selected.last]] as const)
              : ([["Premier train", selected.first], ["Dernier train", selected.last], ["Accès", selected.entrance], ["Ligne", "n° 1 — Maillot / Vincennes"]] as const)
            ).map(([label, value]) => (
              <div className="min-w-0 border-l-2 border-[var(--sample-accent-3)] pl-2" key={label}>
                <dt className={cn("truncate uppercase tracking-[0.12em] text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "text-[6.5px]")}>{label}</dt>
                <dd className={cn("truncate text-[var(--sample-text)]", compact ? "text-[6px]" : "text-[9.5px]")}>{value}</dd>
              </div>
            ))}
          </dl>

          <div className={cn("min-h-0 flex-1", compact ? "hidden" : "mt-3")}>
            <p className="text-[7px] uppercase tracking-[0.2em] text-[var(--sample-muted)]">Prochains départs</p>
            {DEPARTURES.map(([direction, rame, wait]) => (
              <div className="mt-1 flex items-baseline gap-2 border-b border-[rgb(var(--st-border-rgb)/0.4)] pb-1" key={`${direction}-${rame}`}>
                <span className="min-w-0 flex-1 truncate text-[9.5px] text-[var(--sample-text)]">Direction {direction}</span>
                <span className="shrink-0 whitespace-nowrap text-[7px] italic text-[var(--sample-muted)]">rame {rame}</span>
                <span className="w-12 shrink-0 whitespace-nowrap text-right text-[9.5px] tabular-nums text-[var(--sample-primary)]">{wait}</span>
              </div>
            ))}
          </div>

          <p className={cn("italic leading-snug text-[var(--sample-muted)]", compact ? "hidden" : "pt-2 text-[8px]")}>
            Fonte moulée, verre soufflé et lanternes d&rsquo;ambre &mdash; dessin de M. Guimard, exécuté par les fonderies du Val d&rsquo;Osne.
          </p>
        </section>

        {/* ── billets: leaded glass cells ── */}
        <section aria-label="billets" className="flex min-h-0 min-w-0 flex-col">
          <p className={cn("shrink-0 uppercase tracking-[0.2em] text-[var(--sample-muted)]", compact ? "text-[5px]" : "text-[7px]")}>Billets</p>
          <LeadedTransom className={cn("mt-1 w-full shrink-0", compact ? "h-4" : "h-11")} />
          <div className="min-h-0 flex-1 overflow-hidden">
            {(compact ? FARES.slice(0, 1) : FARES).map(([name, klass, price]) => (
              <div
                className={cn("flex min-w-0 items-baseline gap-2 border-b border-[rgb(var(--st-border-rgb)/0.45)]", compact ? "py-[3px]" : "py-1.5")}
                key={name}
              >
                <span className="min-w-0 flex-1">
                  <span className={cn("block truncate leading-tight text-[var(--sample-text)]", compact ? "text-[6px]" : "text-[9.5px]")}>{name}</span>
                  <span className={cn("block truncate italic leading-tight text-[var(--sample-muted)]", compact ? "hidden" : "text-[7px]")}>{klass}</span>
                </span>
                <span className={cn("shrink-0 whitespace-nowrap tabular-nums text-[var(--sample-primary)]", compact ? "text-[6.5px]" : "text-[10px]")}>{price}</span>
              </div>
            ))}
          </div>
          <p className={cn("shrink-0 truncate italic text-[var(--sample-muted)]", compact ? "hidden" : "mt-1.5 text-[7.5px]")}>
            Guichet ouvert 6h&ndash;0h30 &middot; distributeur au pied de l&rsquo;escalier
          </p>
          <span
            className={cn("mt-1.5 flex shrink-0 items-center justify-center whitespace-nowrap uppercase text-[var(--sample-surface)]", compact ? "h-5 text-[5.5px] tracking-[0.1em]" : "h-8 text-[9px] tracking-[0.18em]")}
            style={{ backgroundColor: "var(--sample-primary)", borderRadius: "9999px" }}
          >
            Prendre un billet
          </span>
        </section>
      </div>

      {/* ── ligne index ── */}
      <footer aria-label="ligne index" className={cn("shrink-0 border-t border-[var(--sample-border)]", compact ? "mt-1 pt-1" : "mt-2.5 pt-2")}>
        <div className="flex items-center justify-between gap-2">
          {LIGNES.map(([number, route, year], index) => (
            <span className={cn("flex min-w-0 flex-1 items-center gap-1.5", compact && index > 2 ? "hidden" : "")} key={number}>
              <span
                className={cn("grid shrink-0 place-items-center rounded-full text-[var(--sample-surface)]", compact ? "h-3 w-3 text-[5px]" : "h-4 w-4 text-[7.5px]")}
                style={{ backgroundColor: index === 0 ? "var(--sample-primary)" : "var(--sample-accent-3)" }}
              >
                {number}
              </span>
              <span className="min-w-0">
                <span className={cn("block truncate text-[var(--sample-text)]", compact ? "text-[5.5px]" : "text-[8px]")}>{route}</span>
                <span className={cn("block truncate italic text-[var(--sample-muted)]", compact ? "hidden" : "text-[7px]")}>{year}</span>
              </span>
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
