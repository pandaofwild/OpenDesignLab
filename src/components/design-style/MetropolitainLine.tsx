"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DISPLAY: CSSProperties = { fontFamily: "var(--st-font-display)" };

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-primary)]" as const;

/* Art Nouveau, taken to Guimard's Métro rather than to another botanical shop.
   Photography-free. The style's own rule — ornament integrated into the
   structural form — is applied literally: the coup de fouet is not decoration
   laid over a layout, it IS the layout. The line the reader follows across the
   page is the whiplash, and the stations are its anchor points. Cast-iron
   peacock patina, amber lamp glass, aubergine and sage over parchment. */

type Station = {
  readonly correspondances: readonly string[];
  readonly entrance: string;
  readonly first: string;
  readonly id: string;
  readonly last: string;
  readonly name: string;
  readonly opened: string;
  readonly x: number;
  readonly y: number;
};

/* A coup de fouet is not a sine wave: it is asymmetric, and it changes speed —
   tight snapping rises against long lazy falls. The path is written by hand for
   that reason, and the station anchors are its on-curve endpoints. */
const WHIPLASH =
  "M16 94C34 94 40 30 58 30C84 30 96 88 132 88C160 88 164 22 186 22C214 22 218 80 252 80C296 80 300 28 330 28C352 28 360 64 384 64";

const STATIONS: readonly Station[] = [
  { correspondances: ["C"], entrance: "Édicule à marquise", first: "5h28", id: "maillot", last: "0h42", name: "Porte Maillot", opened: "1900", x: 16, y: 94 },
  { correspondances: ["2", "6"], entrance: "Entourage à écusson", first: "5h31", id: "etoile", last: "0h39", name: "Étoile", opened: "1900", x: 58, y: 30 },
  { correspondances: ["8", "12"], entrance: "Entourage à cartouche", first: "5h36", id: "concorde", last: "0h35", name: "Concorde", opened: "1900", x: 132, y: 88 },
  { correspondances: ["7"], entrance: "Édicule Guimard", first: "5h39", id: "palais", last: "0h32", name: "Palais-Royal", opened: "1900", x: 186, y: 22 },
  { correspondances: ["4", "7", "11"], entrance: "Entourage à écusson", first: "5h42", id: "chatelet", last: "0h29", name: "Châtelet", opened: "1900", x: 252, y: 80 },
  { correspondances: ["5", "8"], entrance: "Édicule à marquise", first: "5h46", id: "bastille", last: "0h25", name: "Bastille", opened: "1900", x: 330, y: 28 },
  { correspondances: ["2", "6", "9"], entrance: "Entourage à cartouche", first: "5h50", id: "nation", last: "0h21", name: "Nation", opened: "1900", x: 384, y: 64 },
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

/* Guimard's cast-iron stem: it rises, throws off a leaf, curls back on itself
   as a fern frond and ends in an amber lamp. Mirrored to flank the cartouche. */
function IronStem({ className }: { readonly className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 64 60">
      <path d="M62 58C44 55 33 44 32 30 31 17 39 7 50 7" stroke="var(--sample-primary)" strokeLinecap="round" strokeWidth="2.4" />
      <path d="M46 44C36 41 30 33 28 24" stroke="var(--sample-accent-3)" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M44 52C33 52 24 46 19 37c-3-6 0-13 7-11 4 1 4 8 0 8" stroke="var(--sample-accent-3)" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M28 24c-5-3-6-9-3-13" stroke="var(--sample-accent-2)" strokeLinecap="round" strokeWidth="1.2" />
      <circle cx="50" cy="7" fill="var(--sample-accent)" r="5.5" stroke="var(--sample-primary)" strokeWidth="1.4" />
      <circle cx="48.4" cy="5.4" fill="var(--sample-surface)" r="1.4" opacity="0.85" />
    </svg>
  );
}

/* The station transom: a fan of leaded glass over the entrance. Wedge points
   are literal so the panel is identical on both sides of hydration. */
function LeadedTransom({ className }: { readonly className?: string }) {
  const points = ["4 54", "12.8 35.6", "38 20.1", "75.6 9.7", "120 6", "164.4 9.7", "202 20.1", "227.2 35.6", "236 54"];
  const glass = [
    "rgb(201 138 46 / 0.34)",
    "rgb(18 84 92 / 0.26)",
    "rgb(91 48 74 / 0.28)",
    "rgb(140 160 107 / 0.34)",
    "rgb(140 160 107 / 0.34)",
    "rgb(91 48 74 / 0.28)",
    "rgb(18 84 92 / 0.26)",
    "rgb(201 138 46 / 0.34)",
  ];

  return (
    <svg aria-hidden="true" className={className} fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 240 58">
      {glass.map((fill, index) => (
        <path
          d={`M120 54L${points[index]}A116 48 0 0 1 ${points[index + 1]}Z`}
          fill={fill}
          key={points[index]}
          stroke="var(--sample-primary)"
          strokeWidth="1.2"
        />
      ))}
      {/* came ribs and the flower at the springing point */}
      <path d="M4 54A116 48 0 0 1 236 54" stroke="var(--sample-primary)" strokeWidth="2" />
      <path d="M40 54A80 33 0 0 1 200 54" stroke="var(--sample-accent-3)" strokeWidth="1.1" />
      <circle cx="120" cy="54" fill="var(--sample-accent)" r="5.5" stroke="var(--sample-primary)" strokeWidth="1.3" />
      <path d="M120 48c-5-4-5-11 0-13 5 2 5 9 0 13" fill="var(--sample-accent-3)" opacity="0.9" />
    </svg>
  );
}

export function MetropolitainLine({ compact = false }: { readonly compact?: boolean }) {
  const [stationId, setStationId] = useState<string>("palais");
  const selected = STATIONS.find((station) => station.id === stationId) ?? STATIONS[0];

  return (
    <div className="flex h-full min-h-0 flex-col text-[var(--sample-text)]" style={DISPLAY}>
      {/* ── Guimard edicule masthead ── */}
      <header aria-label="Guimard edicule masthead" className="flex shrink-0 items-end justify-center gap-1">
        <IronStem className={cn("shrink-0", compact ? "h-7 w-7" : "h-9 w-9 md:h-12 md:w-12")} />
        <div className={cn("min-w-0 text-center", compact ? "pb-0.5" : "pb-1.5")}>
          <p
            className={cn(
              "truncate uppercase leading-none text-[var(--sample-primary)]",
              compact ? "text-[0.66rem] tracking-[0.14em]" : "text-[0.8rem] tracking-[0.12em] md:text-[1.05rem] md:tracking-[0.24em]",
            )}
          >
            MÉTROPOLITAIN
          </p>
          <p className={cn("truncate italic text-[var(--sample-muted)]", compact ? "text-[5.5px]" : "mt-1 text-[8px]")}>
            <span className="hidden md:inline">Compagnie du chemin de fer de Paris &middot; </span>ligne n&deg; 1 &middot; MCM
          </p>
        </div>
        <IronStem className={cn("shrink-0 -scale-x-100", compact ? "h-7 w-7" : "h-9 w-9 md:h-12 md:w-12")} />
      </header>

      {/* ── the coup de fouet: the line is the ornament and the navigation ── */}
      <section aria-label="whiplash line" className={cn("relative min-h-0 shrink-0", compact ? "mt-1 h-[3.6rem]" : "mt-2 h-[7rem]")}>
        <svg className="h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 120">
          {/* the sinuous stem, doubled with a thin patina highlight */}
          <path d={WHIPLASH} stroke="var(--sample-primary)" strokeLinecap="round" strokeWidth="5" />
          <path d={WHIPLASH} stroke="var(--sample-accent-3)" strokeLinecap="round" strokeOpacity="0.5" strokeWidth="1.4" />
          {/* it bends back on itself at the terminus — the whip crack */}
          <path
            d="M386 66c14 6 22 18 16 30-5 10-20 9-22-2-1-8 8-12 12-5"
            stroke="var(--sample-primary)"
            strokeLinecap="round"
            strokeWidth="2.6"
          />
          {/* leaves thrown off the stem where it turns */}
          <path d="M95 59c-11-5-16-17-13-28" stroke="var(--sample-accent-3)" strokeLinecap="round" strokeWidth="1.6" />
          <path d="M219 51c12-4 18-16 16-27" stroke="var(--sample-accent-3)" strokeLinecap="round" strokeWidth="1.6" />
          <path d="M291 54c-10 5-14 16-11 26" stroke="var(--sample-accent-2)" strokeLinecap="round" strokeWidth="1.4" />
        </svg>
        {/* station anchors sit exactly on the curve */}
        {STATIONS.map((station) => {
          const active = station.id === stationId;
          return (
            <button
              aria-pressed={active}
              className={cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all", FOCUS, compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5")}
              key={station.id}
              onClick={() => setStationId(station.id)}
              style={{
                backgroundColor: active ? "var(--sample-accent)" : "var(--sample-surface)",
                borderColor: "var(--sample-primary)",
                borderWidth: active ? 2.5 : 2,
                boxShadow: active ? "0 0 0 4px rgb(201 138 46 / 0.28)" : undefined,
                left: `${(station.x / 400) * 100}%`,
                top: `${(station.y / 120) * 100}%`,
              }}
              title={station.name}
              type="button"
            />
          );
        })}
        {/* station names, set above or below according to which way the line turns */}
        {STATIONS.map((station) => (
          <span
            className={cn(
              "absolute -translate-x-1/2 whitespace-nowrap uppercase text-[var(--sample-muted)]",
              compact ? "text-[4.5px] tracking-[0.06em]" : "text-[6.5px] tracking-[0.14em]",
              station.id === stationId ? "text-[var(--sample-primary)]" : "",
            )}
            key={station.id}
            style={{
              left: `${(station.x / 400) * 100}%`,
              top: station.y > 60 ? `${(station.y / 120) * 100 + 9}%` : `${(station.y / 120) * 100 - 16}%`,
            }}
          >
            {station.name}
          </span>
        ))}
      </section>

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
          <LeadedTransom className={cn("mt-1 w-full shrink-0", compact ? "h-5" : "h-14")} />
          <div className="min-h-0 flex-1 overflow-hidden">
            {(compact ? FARES.slice(0, 2) : FARES).map(([name, klass, price]) => (
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
