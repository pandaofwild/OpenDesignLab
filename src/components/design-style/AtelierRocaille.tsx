"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DISPLAY: CSSProperties = { fontFamily: "var(--st-font-display)" };

const PANEL_IMAGE = "/generated/design-styles/rococo.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-primary)]" as const;

/* Rococo, taken to the workshop that actually made it rather than to another
   pastel gift shop. Two rules from the period do the work here.

   Asymmetry is the rule — the 18th century called it contraste, and no half of
   a rocaille design matches the other. So the page is a wall of deliberately
   unequal panel fields, not a grid of equal cards.

   And the ornament is carved, not drawn: a photographed boiserie panel carries
   the rocaille, because a stroked SVG scroll would read as a squiggle. Ivory
   limewood and water gilding, with the pastels as the recessed fields. */

type Panel = {
  readonly carver: string;
  readonly field: string;
  readonly gilder: string;
  readonly id: string;
  readonly motif: string;
  readonly name: string;
  readonly place: string;
  readonly stage: number;
  readonly timber: string;
};

const PANELS: readonly Panel[] = [
  { carver: "J.-B. Herpin", field: "Rose de Chine", gilder: "Vve Lemoine", id: "trumeau", motif: "Coquille et palmes", name: "Trumeau de glace", place: "pier, north wall", stage: 4, timber: "Limewood, 1741" },
  { carver: "J.-B. Herpin", field: "Vert d'eau", gilder: "Vve Lemoine", id: "dessus", motif: "Cartouche et roseaux", name: "Dessus-de-porte", place: "over the salon door", stage: 3, timber: "Limewood, 1741" },
  { carver: "C. Rouvier", field: "Bleu de ciel", gilder: "Atelier Doré", id: "allege", motif: "Rinceaux contrariés", name: "Allège de croisée", place: "under the window", stage: 2, timber: "Oak, 1742" },
  { carver: "C. Rouvier", field: "Ivoire", gilder: "Not yet let", id: "embrasure", motif: "Agrafe et fleurette", name: "Embrasure", place: "window reveal", stage: 1, timber: "Oak, 1742" },
  { carver: "Not yet let", field: "Ivoire", gilder: "Not yet let", id: "lambris", motif: "Feuille d'acanthe", name: "Lambris d'appui", place: "dado, south wall", stage: 0, timber: "Oak, to be cut" },
];

/* The carved elements on a given field, and how far each has got. */
const ORNAMENTS: Record<string, ReadonlyArray<readonly [string, string, string]>> = {
  allege: [["Rinceaux contrariés", "× 2", "sculpté"], ["Agrafe centrale", "× 1", "apprêt"], ["Roseaux", "× 4", "à sculpter"], ["Filet mouluré", "× 1", "sculpté"]],
  dessus: [["Cartouche", "× 1", "sculpté"], ["Roseaux croisés", "× 2", "sculpté"], ["Coquille au fronton", "× 1", "assiette"], ["Fleurette pendante", "× 3", "à sculpter"]],
  embrasure: [["Agrafe", "× 2", "dessin"], ["Fleurette", "× 6", "à sculpter"], ["Filet", "× 2", "à sculpter"], ["Coin rentrant", "× 4", "dessin"]],
  lambris: [["Feuille d’acanthe", "× 8", "dessin"], ["Panneau uni", "× 3", "à débiter"], ["Plinthe", "× 1", "à débiter"], ["Bord chantourné", "× 3", "dessin"]],
  trumeau: [["Coquille au fronton", "× 1", "brunissage"], ["Palmes affrontées", "× 2", "dorure"], ["Rinceau montant", "× 1", "dorure"], ["Fleurette pendante", "× 5", "assiette"]],
};

/* What the fabric is quoted for each field, in livres tournois. */
const DEVIS: Record<string, string> = {
  allege: "218 livres · 19 journées",
  dessus: "340 livres · 26 journées",
  embrasure: "96 livres · 11 journées",
  lambris: "412 livres · 34 journées",
  trumeau: "525 livres · 41 journées",
};

/* Water gilding, in the order a gilder actually works. */
const STAGES: readonly string[] = ["Dessin", "Sculpture", "Apprêt", "Assiette", "Dorure", "Brunissage"];

const FIELD_TINT: Record<string, string> = {
  "Bleu de ciel": "rgb(var(--st-accent-3-rgb) / 0.34)",
  Ivoire: "rgb(var(--st-surface-rgb) / 1)",
  "Rose de Chine": "rgb(var(--st-accent-rgb) / 0.32)",
  "Vert d'eau": "rgb(var(--st-accent-2-rgb) / 0.36)",
};

/* A moulded boiserie field: the gilt bead, the recess, and a shouldered head
   that never quite squares off. */
function PanelField({ children, className, tint }: { readonly children: React.ReactNode; readonly className?: string; readonly tint?: string }) {
  return (
    <section
      className={cn("relative min-h-0 min-w-0 overflow-hidden border border-[var(--sample-primary)]", className)}
      style={{
        backgroundColor: "var(--sample-surface)",
        backgroundImage: tint ? `linear-gradient(${tint}, ${tint})` : undefined,
        borderRadius: "14px 4px 4px 4px",
      }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-[3px] border border-[rgb(var(--st-border-rgb)/0.85)]" style={{ borderRadius: "11px 3px 3px 3px" }} />
      <div className="relative h-full min-h-0">{children}</div>
    </section>
  );
}

export function AtelierRocaille({ compact = false }: { readonly compact?: boolean }) {
  const [panelId, setPanelId] = useState<string>("dessus");
  const selected = PANELS.find((panel) => panel.id === panelId) ?? PANELS[0];

  return (
    <div className="flex h-full min-h-0 flex-col text-[var(--sample-text)]" style={DISPLAY}>
      {/* ── cartouche masthead, set off the centre on purpose ── */}
      <header className={cn("flex shrink-0 items-end gap-3", compact ? "pb-1" : "pb-2")}>
        <div className="min-w-0">
          <p className={cn("truncate uppercase text-[var(--sample-muted)]", compact ? "text-[4.5px] tracking-[0.16em]" : "text-[7px] tracking-[0.26em]")}>
            Sculpteur &amp; doreur du roi &middot; rue Saint-Honor&eacute;
          </p>
          <h2 className={cn("truncate leading-none text-[var(--sample-primary)]", compact ? "mt-0.5 text-[0.68rem] tracking-[0.1em]" : "mt-1 text-[0.88rem] tracking-[0.08em] md:text-[1.1rem] md:tracking-[0.16em]")}>
            Atelier de la Rocaille
          </h2>
        </div>
        <span aria-hidden="true" className={cn("mb-1 hidden flex-1 items-center gap-1.5 md:flex")}>
          <span className="block h-px flex-1 bg-[var(--sample-primary)]" />
          <span className="block h-1.5 w-1.5 rotate-45 bg-[var(--sample-primary)]" />
          <span className="block h-px w-8 bg-[var(--sample-primary)]" />
        </span>
        <span className={cn("shrink-0 whitespace-nowrap italic text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "hidden text-[8px] md:inline")}>
          Salon de compagnie &middot; MDCCXLI
        </span>
      </header>

      {/* ── panel index: the fields of one room ── */}
      <nav aria-label="rocaille motif" className={cn("flex shrink-0 items-center gap-1 border-y border-[var(--sample-primary)]", compact ? "py-0.5" : "py-1")}>
        {PANELS.map((panel, index) => {
          const active = panel.id === panelId;
          return (
            <button
              aria-pressed={active}
              className={cn(
                "min-w-0 flex-1 truncate px-1 uppercase transition-colors",
                FOCUS,
                compact ? "text-[4.5px] tracking-[0.06em]" : "text-[7px] tracking-[0.12em]",
                index > 2 && !compact ? "hidden md:block" : "",
                active ? "text-[var(--sample-primary)]" : "text-[var(--sample-muted)] hover:text-[var(--sample-text)]",
              )}
              key={panel.id}
              onClick={() => setPanelId(panel.id)}
              title={panel.name}
              type="button"
            >
              {panel.name}
            </button>
          );
        })}
      </nav>

      {/* ── the wall: three fields, deliberately unequal ── */}
      <div className={cn("grid min-h-0 flex-1", compact ? "grid-cols-[0.78fr_1.22fr] gap-1.5 pt-1.5" : "grid-cols-[0.86fr_1.5fr] gap-2.5 pt-2.5 md:grid-cols-[0.86fr_1.5fr_0.72fr]")}>
        {/* carved panel */}
        <PanelField>
          <span
            aria-hidden="true"
            className="absolute inset-0 block"
            style={{ backgroundImage: `url('${PANEL_IMAGE}')`, backgroundPosition: "58% 40%", backgroundSize: "cover" }}
          />
          <span className={cn("absolute inset-x-0 bottom-0 truncate text-center uppercase", compact ? "py-0.5 text-[4px] tracking-[0.08em]" : "py-1 text-[6px] tracking-[0.16em]")} style={{ backgroundColor: "rgb(var(--st-surface-rgb) / 0.88)" }}>
            Panneau sculpt&eacute; &middot; &eacute;chelle 1:1
          </span>
        </PanelField>

        {/* commission record */}
        <PanelField className={compact ? "" : "mb-5"} tint={FIELD_TINT[selected.field]}>
          <div className={cn("flex h-full min-h-0 flex-col", compact ? "p-1.5" : "p-2 md:p-3")}>
            <div className="flex items-baseline justify-between gap-2">
              <span className={cn("shrink-0 uppercase tracking-[0.18em] text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "text-[6.5px]")}>Commission</span>
              <span className={cn("shrink-0 truncate italic text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "text-[7px]")}>{selected.place}</span>
            </div>
            <h3 className={cn("truncate leading-tight", compact ? "text-[0.7rem]" : "mt-0.5 text-[1.05rem]")}>{selected.name}</h3>
            <p className={cn("truncate italic text-[var(--sample-primary)]", compact ? "text-[5px]" : "text-[9px]")}>{selected.motif}</p>

            <dl className={cn("grid grid-cols-2", compact ? "mt-1 gap-x-2 gap-y-0.5" : "mt-2.5 gap-x-4 gap-y-1.5")}>
              {([["Sculpteur", selected.carver], ["Doreur", selected.gilder], ["Bois", selected.timber], ["Fond", selected.field]] as const).map(([label, value]) => (
                <div className="min-w-0" key={label}>
                  <dt className={cn("truncate uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "text-[4px]" : "text-[6px]")}>{label}</dt>
                  <dd className={cn("truncate", compact ? "text-[5.5px]" : "text-[8.5px]")}>{value}</dd>
                </div>
              ))}
            </dl>

            <div className={cn("flex min-h-0 flex-1 flex-col overflow-hidden", compact ? "mt-1" : "mt-3 border-t border-[rgb(var(--st-border-rgb)/0.7)] pt-2")}>
              <p className={cn("truncate uppercase tracking-[0.18em] text-[var(--sample-muted)]", compact ? "hidden" : "text-[6.5px]")}>Ornements &agrave; sculpter</p>
              {(compact ? ORNAMENTS[selected.id].slice(0, 2) : ORNAMENTS[selected.id]).map(([name, count, state]) => (
                <div className={cn("flex items-baseline gap-2 border-b border-[rgb(var(--st-border-rgb)/0.5)]", compact ? "py-[1px]" : "py-1")} key={name}>
                  <span className={cn("min-w-0 flex-1 truncate", compact ? "text-[5.5px]" : "text-[8.5px]")}>{name}</span>
                  <span className={cn("shrink-0 whitespace-nowrap tabular-nums text-[var(--sample-muted)]", compact ? "text-[5px]" : "hidden text-[7.5px] md:inline")}>{count}</span>
                  <span className={cn("w-[4.5rem] shrink-0 truncate text-right italic text-[var(--sample-primary)]", compact ? "hidden" : "text-[7.5px]")}>{state}</span>
                </div>
              ))}
              <div className={cn("flex items-baseline justify-between gap-2", compact ? "hidden" : "mt-auto pt-2")}>
                <span className="shrink-0 uppercase tracking-[0.16em] text-[6.5px] text-[var(--sample-muted)]">Devis</span>
                <span className="min-w-0 truncate text-right text-[8.5px]">
                  {DEVIS[selected.id]}
                </span>
              </div>
            </div>

            <span
              className={cn("mt-2 flex shrink-0 items-center justify-center whitespace-nowrap uppercase text-[var(--sample-surface)]", compact ? "h-4 text-[4.5px] tracking-[0.08em]" : "h-7 text-[8px] tracking-[0.16em]")}
              style={{ backgroundColor: "var(--sample-primary)", borderRadius: "9999px" }}
            >
              Commander ce panneau
            </span>
          </div>
        </PanelField>

        {/* gilding rail */}
        <PanelField className={compact ? "hidden" : "mt-7 hidden md:block"}>
          <div className="flex h-full min-h-0 flex-col p-3">
            <p className="shrink-0 truncate uppercase tracking-[0.18em] text-[6.5px] text-[var(--sample-muted)]">Dorure</p>
            <div className="mt-1.5 min-h-0 flex-1">
              {STAGES.map((stage, index) => {
                const done = index <= selected.stage;
                return (
                  <div className="flex items-center gap-1.5 py-[3px]" key={stage}>
                    <span
                      className="block h-1.5 w-1.5 shrink-0 rotate-45"
                      style={{ backgroundColor: done ? "var(--sample-primary)" : "transparent", outline: `1px solid ${done ? "var(--sample-primary)" : "var(--sample-border)"}` }}
                    />
                    <span className={cn("min-w-0 flex-1 truncate text-[8px]", done ? "text-[var(--sample-text)]" : "text-[var(--sample-muted)]")}>{stage}</span>
                  </div>
                );
              })}
            </div>
            <p className="shrink-0 text-[7px] italic leading-snug text-[var(--sample-muted)]">
              Or fin &agrave; l&rsquo;eau, brunissage &agrave; la pierre d&rsquo;agate.
            </p>
          </div>
        </PanelField>
      </div>

      {/* ── the atelier's own line ── */}
      <footer className={cn("shrink-0 truncate text-center italic text-[var(--sample-muted)]", compact ? "pt-1 text-[4.5px]" : "pt-2 text-[7.5px]")}>
        Contraste &mdash; nul c&ocirc;t&eacute; ne r&eacute;p&egrave;te l&rsquo;autre &middot; devis sur demande
      </footer>
    </div>
  );
}
