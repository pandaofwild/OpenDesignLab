"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

const HERO_IMAGE = "/generated/design-styles/maximalism.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent-3)]" as const;

type PrintId = "vine" | "tigre" | "peony" | "cartouche";
type LeadId = "vine" | "tigre" | "peony";

type Print = {
  readonly id: PrintId;
  readonly name: string;
  readonly shortName: string;
  readonly price: string;
  readonly swatch: CSSProperties;
  readonly dots: readonly string[];
};

type Pairing = {
  readonly role: string;
  readonly value: string;
  readonly swatch: CSSProperties;
};

type LeadPairing = {
  readonly verdict: string;
  readonly items: readonly Pairing[];
};

const VINE_PATTERN: CSSProperties = {
  backgroundColor: "#2A1640",
  backgroundImage:
    "repeating-linear-gradient(55deg, transparent 0 8px, rgb(var(--st-accent-2-rgb) / 0.3) 8px 9px)," +
    "repeating-linear-gradient(-55deg, transparent 0 8px, rgb(var(--st-accent-2-rgb) / 0.3) 8px 9px)," +
    "radial-gradient(ellipse 3px 2px at 7px 6px, rgb(var(--st-accent-2-rgb) / 0.4) 0 60%, transparent 70%)," +
    "radial-gradient(ellipse 3px 2px at 15px 16px, rgb(var(--st-accent-2-rgb) / 0.4) 0 60%, transparent 70%)," +
    "radial-gradient(circle at 20px 4px, rgb(var(--st-accent-rgb) / 0.3) 0 1.2px, transparent 2px)",
  backgroundSize: "22px 22px",
};

const TIGRE_PATTERN: CSSProperties = {
  backgroundColor: "#1A1023",
  backgroundImage:
    "repeating-linear-gradient(115deg, transparent 0 6px, rgb(var(--st-accent-3-rgb) / 0.6) 6px 9px, transparent 9px 15px)," +
    "repeating-linear-gradient(115deg, transparent 0 3px, rgb(8 4 12 / 0.55) 3px 4px, transparent 4px 15px)",
};

const PEONY_PATTERN: CSSProperties = {
  backgroundColor: "#1C0F2B",
  backgroundImage:
    "radial-gradient(circle at 35% 40%, rgb(var(--st-accent-rgb) / 0.5) 0 2.5px, rgb(var(--st-accent-rgb) / 0.22) 2.5px 5px, transparent 5.5px)," +
    "radial-gradient(circle at 75% 78%, rgb(var(--st-accent-rgb) / 0.42) 0 2px, rgb(var(--st-accent-rgb) / 0.18) 2px 4.2px, transparent 4.8px)," +
    "radial-gradient(circle at 35% 40%, rgb(var(--st-accent-3-rgb) / 0.35) 0 1px, transparent 1.4px)," +
    "radial-gradient(circle at 75% 78%, rgb(var(--st-accent-3-rgb) / 0.35) 0 1px, transparent 1.4px)," +
    "repeating-linear-gradient(35deg, transparent 0 10px, rgb(var(--st-accent-2-rgb) / 0.16) 10px 11px)",
  backgroundSize: "30px 30px",
};

const CARTOUCHE_PATTERN: CSSProperties = {
  backgroundColor: "#0B4A3C",
  backgroundImage:
    "repeating-linear-gradient(45deg, transparent 0 8px, rgb(var(--st-text-rgb) / 0.22) 8px 9px)," +
    "repeating-linear-gradient(-45deg, transparent 0 8px, rgb(var(--st-text-rgb) / 0.22) 8px 9px)," +
    "radial-gradient(circle at 0 0, rgb(var(--st-accent-3-rgb) / 0.4) 0 1.2px, transparent 1.8px)," +
    "radial-gradient(circle at 16px 16px, rgb(var(--st-accent-3-rgb) / 0.4) 0 1.2px, transparent 1.8px)",
  backgroundSize: "16px 16px",
};

const SHEEN = "linear-gradient(100deg, rgb(255 255 255 / 0.16), transparent 40%), linear-gradient(0deg, rgb(0 0 0 / 0.28), rgb(0 0 0 / 0.12))";

function fabricSwatch(backgroundColor: string, weave?: string): CSSProperties {
  return {
    backgroundColor,
    backgroundImage: weave ? `${weave}, ${SHEEN}` : SHEEN,
  };
}

const PRINTS: readonly Print[] = [
  { id: "vine", name: "Artemis Vine", shortName: "Artemis", price: "£68 / roll", swatch: VINE_PATTERN, dots: ["#5B2A6E", "#0E8F6E", "#FF4D88"] },
  { id: "tigre", name: "Tigre", shortName: "Tigre", price: "£74 / roll", swatch: TIGRE_PATTERN, dots: ["#1A1023", "#F7C948", "#5B2A6E"] },
  { id: "peony", name: "Peony Noir", shortName: "Peony", price: "£72 / roll", swatch: PEONY_PATTERN, dots: ["#3A2058", "#FF4D88", "#0E8F6E"] },
  { id: "cartouche", name: "Cartouche", shortName: "Cartouche", price: "£66 / roll", swatch: CARTOUCHE_PATTERN, dots: ["#0E3B32", "#F7C948", "#E8D9A8"] },
];

const PAIRINGS: Record<LeadId, LeadPairing> = {
  vine: {
    verdict: "“Vine on velvet — calmed by bottle green, lifted by gold fringe.”",
    items: [
      { role: "Velvet", value: "Bottle emerald", swatch: fabricSwatch("rgb(var(--st-accent-2-rgb) / 0.8)") },
      { role: "Trim", value: "Gold fringe", swatch: fabricSwatch("rgb(var(--st-accent-3-rgb) / 0.8)", "repeating-linear-gradient(90deg, transparent 0 2px, rgb(var(--st-base-rgb) / 0.42) 2px 3px)") },
      { role: "Shade", value: "Pleated peony", swatch: fabricSwatch("rgb(var(--st-accent-rgb) / 0.7)", "repeating-linear-gradient(90deg, transparent 0 3px, rgb(var(--st-base-rgb) / 0.26) 3px 4px)") },
    ],
  },
  tigre: {
    verdict: "“Tiger against plum velvet — the clash that behaves.”",
    items: [
      { role: "Velvet", value: "Deep plum", swatch: fabricSwatch("#3A2058") },
      { role: "Trim", value: "Black piping", swatch: fabricSwatch("#140D1C") },
      { role: "Shade", value: "Ivory pleat", swatch: fabricSwatch("rgb(var(--st-text-rgb) / 0.86)", "repeating-linear-gradient(90deg, transparent 0 3px, rgb(var(--st-base-rgb) / 0.22) 3px 4px)") },
    ],
  },
  peony: {
    verdict: "“Peonies want moss and old gold. Trust the house.”",
    items: [
      { role: "Velvet", value: "Moss green", swatch: fabricSwatch("#2F4A2C") },
      { role: "Trim", value: "Antique gold", swatch: fabricSwatch("rgb(var(--st-accent-3-rgb) / 0.7)") },
      { role: "Shade", value: "Striped noir", swatch: fabricSwatch("#1A1023", "repeating-linear-gradient(90deg, transparent 0 3px, rgb(var(--st-accent-3-rgb) / 0.28) 3px 4px)") },
    ],
  },
};

const LEAD_PRINTS: readonly Print[] = PRINTS.filter((print) => print.id !== "cartouche");

const NAV_ITEMS = ["Wallpapers", "Velvets", "Lighting", "Archive", "Journal"] as const;

const PRODUCTS = [
  { name: "Serpente lamp", price: "£340", position: "16% 30%", chip: true },
  { name: "Paradiso cushion", price: "£95", position: "72% 55%", chip: true },
  { name: "Gilt frame set, six", price: "£210", position: "62% 18%", chip: false },
] as const;

type MaximalistSalonWallProps = {
  readonly compact?: boolean;
};

export function MaximalistSalonWall({ compact = false }: MaximalistSalonWallProps) {
  const [leadId, setLeadId] = useState<LeadId>("vine");
  const activePairing = PAIRINGS[leadId];

  return (
    <div className={compact ? "relative grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-1.5" : "relative grid min-h-[720px] grid-rows-[auto_minmax(0,1fr)_auto] gap-3 md:h-full md:min-h-0"}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(120% 100% at 50% 0%, transparent 46%, rgb(10 4 20 / 0.5) 100%)" }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "repeating-linear-gradient(58deg, transparent 0 22px, rgb(var(--st-accent-3-rgb) / 0.5) 22px 23px), repeating-linear-gradient(-58deg, transparent 0 22px, rgb(var(--st-accent-2-rgb) / 0.5) 22px 23px)" }} />

      <header className={compact ? "relative z-10 flex min-w-0 items-baseline gap-2 border-b border-[rgb(var(--st-accent-3-rgb)/0.45)] pb-1" : "relative z-10 flex min-w-0 items-baseline gap-2 border-b border-[rgb(var(--st-accent-3-rgb)/0.45)] pb-2"}>
        <div className="min-w-0 shrink-0">
          <p className={compact ? "text-[9px] leading-none tracking-[0.2em] text-[var(--sample-text)]" : "text-sm leading-none tracking-[0.2em] text-[var(--sample-text)]"} style={{ fontFamily: "var(--st-font-display)" }}>PAVONE HOUSE</p>
          <p className={compact ? "hidden" : "mt-1 whitespace-nowrap text-[7px] tracking-[0.14em] text-[var(--sample-muted)]"}>WALLPAPER · VELVET · LIGHTING<span className="hidden lg:inline"> — EST. MMXIX</span></p>
        </div>
        <nav className={compact ? "hidden" : "flex min-w-0 items-center gap-1.5 overflow-hidden"}>
          {NAV_ITEMS.map((item) => (
            <span className={`whitespace-nowrap text-[9px] uppercase tracking-[0.16em] ${item === "Wallpapers" ? "border-b border-[var(--sample-accent-3)] pb-0.5 text-[var(--sample-text)]" : "text-[var(--sample-muted)]"}`} key={item}>{item}</span>
          ))}
        </nav>
        <div className={compact ? "ml-auto flex shrink-0 items-center gap-2" : "ml-auto flex shrink-0 items-center gap-2.5"}>
          <span className={compact ? "whitespace-nowrap rounded-full border border-[rgb(var(--st-accent-3-rgb)/0.55)] px-2 py-0.5 text-[6px] uppercase tracking-[0.14em] text-[var(--sample-text)]" : "whitespace-nowrap rounded-full border border-[rgb(var(--st-accent-3-rgb)/0.55)] px-2.5 py-1 text-[8px] uppercase tracking-[0.14em] text-[var(--sample-text)]"}>Basket (3)</span>
        </div>
      </header>

      <div className={compact ? "relative z-10 grid min-h-0 grid-cols-[3fr_2fr] gap-1.5" : "relative z-10 grid min-h-0 grid-cols-1 gap-3 md:grid-cols-12"}>
        <section className={compact ? "relative min-h-0 overflow-hidden rounded-[6px] border border-[var(--sample-border)] bg-cover" : "relative min-h-[240px] overflow-hidden rounded-[6px] border border-[var(--sample-border)] bg-cover md:col-span-7 md:min-h-0"} style={{ backgroundImage: `linear-gradient(180deg, rgb(12 5 22 / 0.05), rgb(12 5 22 / 0.28)), url('${HERO_IMAGE}')`, backgroundPosition: "42% 45%", boxShadow: compact ? undefined : "0 18px 40px rgb(10 4 20 / 0.4)" }}>
          <span aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-[4px] border border-[rgb(var(--st-primary-rgb)/0.16)]" />
          <div className={compact ? "absolute bottom-1.5 left-1.5 rounded-[3px] border border-[rgb(var(--st-accent-3-rgb)/0.5)] bg-[rgb(var(--st-base-rgb)/0.78)] px-1.5 py-1 backdrop-blur-[2px]" : "absolute bottom-3 left-3 rounded-[4px] border border-[rgb(var(--st-accent-3-rgb)/0.5)] bg-[rgb(var(--st-base-rgb)/0.78)] px-3 py-2 backdrop-blur-[2px]"}>
            <p className={compact ? "text-[5px] uppercase tracking-[0.2em] text-[var(--sample-accent-3)]" : "text-[7px] uppercase tracking-[0.22em] text-[var(--sample-accent-3)]"}>THE EMERALD STUDY</p>
            <p className={compact ? "mt-0.5 text-[6px] leading-tight text-[var(--sample-text)]" : "mt-1 text-[9px] leading-tight text-[var(--sample-text)]"}>Wallpapered in <span style={{ fontFamily: "var(--st-font-display)", fontStyle: "italic" }}>Artemis Vine</span> № 48 — new for autumn</p>
          </div>
          <div className={compact ? "hidden" : "absolute right-3 top-3 rounded-full border border-[rgb(var(--st-accent-3-rgb)/0.6)] px-2.5 py-1.5 text-center"}>
            <p className="text-[6.5px] uppercase tracking-[0.2em] text-[var(--sample-accent-3)]">HAND-PRINTED</p>
            <p className="text-[6.5px] uppercase tracking-[0.2em] text-[var(--sample-accent-3)]">IN ENGLAND</p>
          </div>
        </section>

        <div className={compact ? "grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] gap-1.5" : "grid min-h-0 min-w-0 gap-3 md:col-span-5 md:grid-rows-[auto_auto_minmax(0,1fr)]"}>
          <section className={compact ? "min-w-0 rounded-[6px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" : "min-w-0 rounded-[6px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-4"}>
            <p className={compact ? "text-[5.5px] uppercase tracking-[0.2em] text-[var(--sample-accent-3)]" : "text-[8px] uppercase tracking-[0.24em] text-[var(--sample-accent-3)]"}>AUTUMN PRINT SALON — № 48</p>
            <h2 className={compact ? "mt-1 text-[13px] leading-[1.05] text-[var(--sample-text)]" : "mt-1.5 text-[26px] leading-[1.05] text-[var(--sample-text)] md:text-[30px]"} style={{ fontFamily: "var(--st-font-display)" }}><em>More</em> is the house style.</h2>
            <p className={compact ? "hidden" : "mt-2 max-w-[34ch] text-[9.5px] leading-snug text-[var(--sample-muted)]"}>Forty-eight new prints, velvets and trims, layered the Pavone way.</p>
            <div className={compact ? "mt-1.5 flex min-w-0 items-center gap-2" : "mt-3 flex flex-wrap min-w-0 items-center gap-x-3 gap-y-1.5"}>
              <button className={`${FOCUS} w-fit whitespace-nowrap rounded-[4px] bg-[var(--sample-accent-3)] font-semibold uppercase text-[var(--sample-base)] transition-[filter] hover:brightness-105 ${compact ? "px-2 py-1 text-[6.5px] tracking-[0.14em]" : "px-3.5 py-2 text-[9px] tracking-[0.18em]"}`} type="button">{compact ? "ENTER THE SALON" : "Enter the print salon"}</button>
              <button className={compact ? "hidden" : `${FOCUS} w-fit text-[9px] text-[var(--sample-text)] underline decoration-[rgb(var(--st-accent-3-rgb)/0.6)] underline-offset-4`} type="button">Book a pattern consult</button>
            </div>
          </section>

          <section aria-label="Pattern clash console" className={compact ? "min-h-0 min-w-0 rounded-[6px] border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.6)] p-2" : "min-w-0 rounded-[6px] border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.6)] p-3"}>
            <div className="flex min-w-0 items-baseline justify-between gap-2">
              <p className={compact ? "whitespace-nowrap text-[5.5px] uppercase tracking-[0.16em] text-[var(--sample-accent-3)]" : "whitespace-nowrap text-[7.5px] uppercase tracking-[0.2em] text-[var(--sample-accent-3)]"}>PATTERN CLASH CONSOLE</p>
              <span className={compact ? "hidden" : "hidden whitespace-nowrap text-[7px] text-[var(--sample-muted)] lg:inline"}>House pairing service</span>
            </div>
            <div className={compact ? "mt-1 grid grid-cols-3 gap-1" : "mt-2 grid grid-cols-3 gap-1.5"}>
              {LEAD_PRINTS.map((print) => {
                const selected = leadId === print.id;
                return (
                  <button aria-pressed={selected} className={`${FOCUS} flex min-w-0 items-center gap-1.5 rounded-[4px] border px-1 py-1 transition-colors ${selected ? "border-[var(--sample-accent-3)] bg-[var(--sample-base)]" : "border-[var(--sample-border)] hover:border-[rgb(var(--st-accent-3-rgb)/0.6)]"}`} key={print.id} onClick={() => setLeadId(print.id as LeadId)} type="button">
                    <span aria-hidden="true" className={compact ? "h-5 w-5 shrink-0 rounded-[3px] border border-[rgb(var(--st-primary-rgb)/0.14)]" : "h-6 w-6 shrink-0 rounded-[3px] border border-[rgb(var(--st-primary-rgb)/0.14)]"} style={print.swatch} />
                    <span className={compact ? "min-w-0 whitespace-nowrap text-[6px] text-[var(--sample-text)]" : "min-w-0 whitespace-nowrap text-[8px] text-[var(--sample-text)]"}>{print.shortName}</span>
                  </button>
                );
              })}
            </div>
            <div className={compact ? "hidden" : "mt-2 grid grid-cols-3 gap-1.5"}>
              {activePairing.items.map((pairing) => (
                <div className="rounded-[4px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-1.5" key={pairing.role}>
                  <span aria-hidden="true" className="block h-5 rounded-[3px] border border-[rgb(var(--st-primary-rgb)/0.14)]" style={pairing.swatch} />
                  <p className="mt-1 text-[6.5px] uppercase tracking-[0.1em] text-[var(--sample-muted)]">{pairing.role}</p>
                  <p className="truncate text-[8px] text-[var(--sample-text)]">{pairing.value}</p>
                </div>
              ))}
            </div>
            <p className={compact ? "mt-1 mb-0.5 text-[6.5px] italic leading-normal text-[var(--sample-muted)]" : "mt-2 text-[9px] italic leading-tight text-[var(--sample-muted)]"} style={{ fontFamily: "var(--st-font-display)" }}>{activePairing.verdict}</p>
          </section>

          <section aria-label="Print index" className={compact ? "hidden" : "grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] rounded-[6px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3"}>
            <div className="flex min-w-0 items-baseline justify-between gap-2">
              <p className="whitespace-nowrap text-[7.5px] uppercase tracking-[0.2em] text-[var(--sample-accent-3)]">PRINT INDEX — 48 OF 214</p>
              <span className="whitespace-nowrap text-[7px] text-[var(--sample-muted)]">View all</span>
            </div>
            <div className="mt-2 grid min-h-0 grid-cols-4 gap-2">
              {PRINTS.map((print) => (
                <div className="flex min-w-0 flex-col" key={print.id}>
                  <span aria-hidden="true" className="block min-h-[52px] flex-1 rounded-[4px] border border-[rgb(var(--st-primary-rgb)/0.12)]" style={print.swatch} />
                  <p className="mt-1 truncate text-[8px] text-[var(--sample-text)]">{print.name}</p>
                  <p className="text-[7px] text-[var(--sample-muted)]">{print.price}</p>
                  <div className="mt-1 flex gap-1">
                    {print.dots.map((dot, index) => (
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full border border-[rgb(var(--st-primary-rgb)/0.2)]" key={index} style={{ backgroundColor: dot }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className={compact ? "hidden" : "relative z-10 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 border-t border-[rgb(var(--st-accent-3-rgb)/0.35)] pt-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"}>
        {PRODUCTS.map((product) => (
          <article className="flex items-center gap-2.5 rounded-[6px] border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.55)] p-2" key={product.name}>
            <span aria-hidden="true" className="h-11 w-11 shrink-0 overflow-hidden rounded-[4px] bg-cover" style={{ backgroundImage: `url('${HERO_IMAGE}')`, backgroundSize: "340%", backgroundPosition: product.position }} />
            <div className="min-w-0">
              <p className="truncate text-[9px] text-[var(--sample-text)]">{product.name}</p>
              <p className="text-[8px] text-[var(--sample-accent-3)]">{product.price}</p>
              {product.chip ? <span className="mt-0.5 inline-block rounded-full border border-[rgb(var(--st-accent-3-rgb)/0.5)] px-1 text-[6px] uppercase tracking-[0.08em] text-[var(--sample-muted)]">House print</span> : null}
            </div>
          </article>
        ))}
        <div className="hidden min-w-0 flex-col justify-center text-right md:flex">
          <p className="min-w-0 truncate text-[7px] leading-snug text-[var(--sample-muted)]">THE JOURNAL — “On clashing chintz” · “A defence of gold trim”</p>
          <p className="mt-1 min-w-0 truncate text-[6.5px] uppercase tracking-[0.14em] text-[var(--sample-accent-3)]">WORLD OF INTERIORS · AD · ELLE DECORATION</p>
        </div>
      </footer>
    </div>
  );
}
