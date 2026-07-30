"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DISPLAY: CSSProperties = { fontFamily: "var(--st-font-display)" };

const PLATE_IMAGE = "/generated/design-styles/neoclassic.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-primary)]" as const;

/* Neoclassicism was a revolt against Baroque and Rococo, so a champagne-gold
   palace hotel puts it back in the building it rejected. Winckelmann asked for
   noble simplicity and calm grandeur; the movement chose line over colour,
   straight over curved, and — after Pompeii — archaeological accuracy over
   invention.

   So the vehicle is the measured survey rather than luxury hospitality, and
   the layout is a ruled plate: equal fields on hairline rules, everything on
   one baseline. Where Rococo is contraste and never repeats itself, this is
   order, and every field answers to the same measure. The ornament is drawn,
   because here the drawing IS the style. */

type Order = {
  readonly diameters: number;
  readonly entablature: string;
  readonly flutes: number;
  readonly id: string;
  readonly intercolumniation: string;
  readonly name: string;
  readonly numeral: string;
  readonly site: string;
  readonly surveyed: string;
};

/* Column height in lower diameters, after Vitruvius as the eighteenth century
   read him — the whole point of the plate is that the five differ. */
const ORDERS: readonly Order[] = [
  { diameters: 7, entablature: "Plain architrave, no frieze", flutes: 0, id: "tuscan", intercolumniation: "Araeostyle, 4 D.", name: "Tuscan", numeral: "I", site: "Cori, Latium", surveyed: "Campaign of 1762" },
  { diameters: 8, entablature: "Triglyph and metope", flutes: 20, id: "doric", intercolumniation: "Systyle, 2 D.", name: "Doric", numeral: "II", site: "Paestum", surveyed: "Campaign of 1763" },
  { diameters: 9, entablature: "Dentilled cornice", flutes: 24, id: "ionic", intercolumniation: "Eustyle, 2¼ D.", name: "Ionic", numeral: "III", site: "Ilissus, Athens", surveyed: "Campaign of 1764" },
  { diameters: 10, entablature: "Modillion cornice", flutes: 24, id: "corinthian", intercolumniation: "Pycnostyle, 1½ D.", name: "Corinthian", numeral: "IV", site: "Tivoli", surveyed: "Campaign of 1765" },
  { diameters: 10, entablature: "Modillion and dentil", flutes: 24, id: "composite", intercolumniation: "Eustyle, 2¼ D.", name: "Composite", numeral: "V", site: "Arch of Titus, Rome", surveyed: "Campaign of 1766" },
];

/* What the survey tabulates: each member reduced to modules, one module being
   half a lower diameter. */
const PARTS: Record<string, ReadonlyArray<readonly [string, string]>> = {
  composite: [["Cornice", "1¼ M."], ["Frieze", "1½ M."], ["Architrave", "1¼ M."], ["Capital", "2⅓ M."], ["Shaft", "16⅔ M."], ["Base and plinth", "1 M."]],
  corinthian: [["Cornice", "1¼ M."], ["Frieze", "1½ M."], ["Architrave", "1¼ M."], ["Capital", "2⅓ M."], ["Shaft", "16⅔ M."], ["Base and plinth", "1 M."]],
  doric: [["Cornice", "1 M."], ["Frieze", "1½ M."], ["Architrave", "1 M."], ["Capital", "1 M."], ["Shaft", "14 M."], ["Base and plinth", "1 M."]],
  ionic: [["Cornice", "1¼ M."], ["Frieze", "1¼ M."], ["Architrave", "1¼ M."], ["Capital", "1⅔ M."], ["Shaft", "15⅓ M."], ["Base and plinth", "1 M."]],
  tuscan: [["Cornice", "1 M."], ["Frieze", "1 M."], ["Architrave", "1 M."], ["Capital", "1 M."], ["Shaft", "12 M."], ["Base and plinth", "1 M."]],
};

/* One lower diameter, in drawing units. Everything on the plate is measured
   from it, which is what a module means. */
const MODULE = 21;
const BASELINE = 292;
const AXIS = 58;

function OrderElevation({ activeId, compact }: { readonly activeId: string; readonly compact: boolean }) {
  const order = ORDERS.find((entry) => entry.id === activeId) ?? ORDERS[0];
  const columnHeight = order.diameters * MODULE;
  const entablatureHeight = Math.round(columnHeight / 4);
  const plinth = 14;
  const shaftTop = BASELINE - plinth - columnHeight;
  const capitalHeight = order.id === "corinthian" || order.id === "composite" ? 17 : 12;
  const shaftBottom = BASELINE - plinth - 16;
  const half = MODULE / 2;
  const topHalf = half * 0.84;
  const flutes = order.flutes === 0 ? 0 : 7;

  return (
    <svg className="h-full w-full" fill="none" preserveAspectRatio="xMidYMax meet" viewBox="0 0 116 300">
      {/* entablature: architrave, frieze, cornice, the cornice projecting */}
      <rect height={entablatureHeight * 0.34} stroke="var(--sample-text)" strokeWidth="1" width={MODULE * 2.5} x={AXIS - MODULE * 1.25} y={shaftTop - entablatureHeight} />
      <rect height={entablatureHeight * 0.34} stroke="var(--sample-text)" strokeWidth="1" width={MODULE * 2.2} x={AXIS - MODULE * 1.1} y={shaftTop - entablatureHeight * 0.66} />
      <rect height={entablatureHeight * 0.32} stroke="var(--sample-text)" strokeWidth="1" width={MODULE * 2} x={AXIS - MODULE} y={shaftTop - entablatureHeight * 0.32} />

      {/* capital */}
      <rect height="5" stroke="var(--sample-text)" strokeWidth="1" width={MODULE * 1.6} x={AXIS - MODULE * 0.8} y={shaftTop} />
      {order.id === "ionic" || order.id === "composite" || order.id === "corinthian" ? (
        <>
          <circle cx={AXIS - MODULE * 0.5} cy={shaftTop + 9} r="3" stroke="var(--sample-text)" strokeWidth="0.8" />
          <circle cx={AXIS + MODULE * 0.5} cy={shaftTop + 9} r="3" stroke="var(--sample-text)" strokeWidth="0.8" />
        </>
      ) : null}
      <path d={`M${AXIS - MODULE * 0.62} ${shaftTop + capitalHeight - 3}H${AXIS + MODULE * 0.62}`} stroke="var(--sample-border)" strokeWidth="0.6" />
      <path
        d={`M${AXIS - MODULE * 0.8} ${shaftTop + 5}L${AXIS - topHalf} ${shaftTop + capitalHeight}H${AXIS + topHalf}L${AXIS + MODULE * 0.8} ${shaftTop + 5}Z`}
        stroke="var(--sample-text)"
        strokeWidth="1"
      />

      {/* shaft, tapered — straight lines, never an entasis curve */}
      <path
        d={`M${AXIS - topHalf} ${shaftTop + capitalHeight}L${AXIS - half} ${shaftBottom}H${AXIS + half}L${AXIS + topHalf} ${shaftTop + capitalHeight}Z`}
        stroke="var(--sample-text)"
        strokeWidth="1"
      />
      {Array.from({ length: flutes }, (_flute, index) => {
        const t = (index + 1) / (flutes + 1);
        return (
          <path
            d={`M${(AXIS - topHalf + 2 * topHalf * t).toFixed(2)} ${shaftTop + capitalHeight}L${(AXIS - half + 2 * half * t).toFixed(2)} ${shaftBottom}`}
            key={index}
            stroke="var(--sample-border)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* base and plinth */}
      <rect height="8" stroke="var(--sample-text)" strokeWidth="1" width={MODULE * 1.3} x={AXIS - MODULE * 0.65} y={shaftBottom} />
      <rect height={plinth} stroke="var(--sample-text)" strokeWidth="1" width={MODULE * 1.7} x={AXIS - MODULE * 0.85} y={BASELINE - plinth} />

      {/* the measure: a dimension line divided into modules */}
      <path d={`M104 ${shaftTop - entablatureHeight}V${BASELINE}`} stroke="var(--sample-primary)" strokeWidth="0.7" />
      {Array.from({ length: order.diameters + 1 }, (_tick, index) => {
        const y = BASELINE - plinth - index * MODULE;
        return <path d={`M100 ${y}H108`} key={index} stroke="var(--sample-primary)" strokeWidth={index % 5 === 0 ? 1 : 0.5} />;
      })}
      <path d={`M96 ${shaftTop - entablatureHeight}H112M96 ${BASELINE}H112`} stroke="var(--sample-primary)" strokeWidth="1" />
      {compact ? null : (
        <text fill="var(--sample-primary)" fontSize="7" textAnchor="middle" transform={`rotate(-90 100 ${(shaftTop + BASELINE) / 2})`} x="100" y={(shaftTop + BASELINE) / 2}>
          {order.diameters} D.
        </text>
      )}

      {/* module rules across the shaft — this is a measurement, not a picture */}
      {Array.from({ length: order.diameters - 1 }, (_rule, index) => {
        const y = BASELINE - plinth - (index + 1) * MODULE;
        if (y < shaftTop + capitalHeight) return null;
        const t = (BASELINE - plinth - 16 - y) / (BASELINE - plinth - 16 - (shaftTop + capitalHeight));
        const w = half + (topHalf - half) * t;
        return <path d={`M${(AXIS - w).toFixed(2)} ${y}H${(AXIS + w).toFixed(2)}`} key={index} stroke="var(--sample-border)" strokeWidth="0.4" />;
      })}

      {/* ground line */}
      <path d={`M8 ${BASELINE}H92`} stroke="var(--sample-text)" strokeWidth="1" />
    </svg>
  );
}

export function SocietasAntiquaria({ compact = false }: { readonly compact?: boolean }) {
  const [orderId, setOrderId] = useState<string>("ionic");
  const selected = ORDERS.find((order) => order.id === orderId) ?? ORDERS[0];

  return (
    <div className="flex h-full min-h-0 flex-col text-[var(--sample-text)]" style={DISPLAY}>
      {/* ── masthead, ruled ── */}
      <header className="shrink-0">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className={cn("truncate uppercase leading-none", compact ? "text-[0.6rem] tracking-[0.16em]" : "text-[0.78rem] tracking-[0.14em] md:text-[0.92rem] md:tracking-[0.3em]")}>
            Societas Antiquaria
          </h2>
          <span className={cn("shrink-0 whitespace-nowrap uppercase tracking-[0.18em] text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "hidden text-[7px] md:inline")}>
            Plate {selected.numeral} &middot; MDCCLXIV
          </span>
        </div>
        <p className={cn("truncate italic text-[var(--sample-muted)]", compact ? "text-[4.5px]" : "mt-0.5 text-[8px]")}>
          Plates of the measured antique &mdash; drawn on the spot, reduced to the module
        </p>
        <span aria-hidden="true" className={cn("block bg-[var(--sample-text)]", compact ? "mt-1 h-px" : "mt-1.5 h-[1.5px]")} />
        <span aria-hidden="true" className="mt-[2px] block h-px bg-[var(--sample-text)]" />
      </header>

      {/* ── order index ── */}
      <nav aria-label="order index" className={cn("flex shrink-0 items-stretch border-b border-[var(--sample-border)]", compact ? "mt-1" : "mt-2")}>
        {ORDERS.map((order, index) => {
          const active = order.id === orderId;
          return (
            <button
              aria-pressed={active}
              className={cn(
                "min-w-0 flex-1 truncate border-r border-[var(--sample-border)] uppercase transition-colors last:border-r-0",
                FOCUS,
                compact ? "py-0.5 text-[4.5px] tracking-[0.08em]" : "py-1.5 text-[7px] tracking-[0.16em]",
                index > 3 && !compact ? "hidden md:block" : "",
                active ? "bg-[var(--sample-primary)] text-[var(--sample-surface)]" : "text-[var(--sample-muted)] hover:text-[var(--sample-text)]",
              )}
              key={order.id}
              onClick={() => setOrderId(order.id)}
              title={order.name}
              type="button"
            >
              {order.numeral}. {order.name}
            </button>
          );
        })}
      </nav>

      {/* ── the plate: engraving, measured elevation, record ── */}
      <div className={cn("grid min-h-0 flex-1", compact ? "grid-cols-[0.62fr_0.62fr_1fr] gap-1.5 pt-1.5" : "grid-cols-[0.9fr_1fr] gap-3 pt-3 md:grid-cols-[0.72fr_0.66fr_1.1fr]")}>
        <figure className="relative m-0 min-h-0 min-w-0 overflow-hidden border border-[var(--sample-text)] bg-[var(--sample-surface)]">
          <span
            aria-hidden="true"
            className="absolute inset-0 block"
            style={{ backgroundImage: `url('${PLATE_IMAGE}')`, backgroundPosition: "center 38%", backgroundSize: "cover" }}
          />
          <figcaption className={cn("absolute inset-x-0 bottom-0 truncate text-center uppercase", compact ? "py-0.5 text-[4px] tracking-[0.08em]" : "py-1 text-[6px] tracking-[0.16em]")} style={{ backgroundColor: "rgb(var(--st-surface-rgb) / 0.9)" }}>
            Engraved from the survey
          </figcaption>
        </figure>

        <section aria-label="measured elevation" className="min-h-0 min-w-0 border border-[var(--sample-border)] bg-[var(--sample-surface)] p-1">
          <OrderElevation activeId={orderId} compact={compact} />
        </section>

        <section aria-label="survey record" className={cn("flex min-h-0 min-w-0 flex-col overflow-hidden", compact ? "" : "col-span-2 md:col-span-1")}>
          <h3 className={cn("truncate leading-tight", compact ? "text-[0.72rem]" : "text-[1rem] md:text-[1.2rem]")}>
            The {selected.name} Order
          </h3>
          <p className={cn("truncate italic text-[var(--sample-accent)]", compact ? "text-[5px]" : "text-[9px]")}>
            {selected.site} &middot; {selected.surveyed}
          </p>

          <dl className={cn("grid grid-cols-2", compact ? "mt-1 gap-x-2 gap-y-0.5" : "mt-2.5 gap-x-4 gap-y-1.5")}>
            {([
              ["Height", `${selected.diameters} diameters`],
              ["Flutes", selected.flutes === 0 ? "None, shaft plain" : `${selected.flutes} to the shaft`],
              ["Entablature", selected.entablature],
              ["Intercolumn.", selected.intercolumniation],
            ] as const).map(([label, value]) => (
              <div className="min-w-0 border-t border-[var(--sample-border)] pt-0.5" key={label}>
                <dt className={cn("truncate uppercase tracking-[0.12em] text-[var(--sample-muted)]", compact ? "text-[4px]" : "text-[6px]")}>{label}</dt>
                <dd className={cn("truncate", compact ? "text-[5.5px]" : "text-[8.5px]")}>{value}</dd>
              </div>
            ))}
          </dl>

          <div className={cn("min-h-0 flex-1 overflow-hidden", compact ? "mt-1" : "mt-3")}>
            <p className={cn("truncate uppercase tracking-[0.16em] text-[var(--sample-muted)]", compact ? "hidden" : "text-[6.5px]")}>
              The parts, in modules
            </p>
            {PARTS[selected.id].map(([part, modules]) => (
              <div className={cn("flex items-baseline gap-2 border-b border-[rgb(var(--st-border-rgb)/0.55)]", compact ? "py-[1px]" : "py-[3px]")} key={part}>
                <span className={cn("min-w-0 flex-1 truncate", compact ? "text-[5.5px]" : "text-[8.5px]")}>{part}</span>
                <span className={cn("shrink-0 whitespace-nowrap tabular-nums text-[var(--sample-primary)]", compact ? "text-[5px]" : "text-[8px]")}>{modules}</span>
              </div>
            ))}
          </div>

          <div className={cn("flex items-center gap-2", compact ? "pt-1" : "pt-2")}>
            <span
              className={cn("flex flex-1 items-center justify-center whitespace-nowrap border border-[var(--sample-primary)] uppercase text-[var(--sample-surface)]", compact ? "h-4 text-[4.5px] tracking-[0.08em]" : "h-7 text-[8px] tracking-[0.18em]")}
              style={{ backgroundColor: "var(--sample-primary)" }}
            >
              Subscribe to the plates
            </span>
          </div>
        </section>
      </div>

      {/* ── scale of modules ── */}
      <footer aria-label="scale of modules" className={cn("flex shrink-0 items-center gap-2 border-t border-[var(--sample-text)]", compact ? "mt-1 pt-1" : "mt-2 pt-1.5")}>
        <span className={cn("shrink-0 whitespace-nowrap uppercase tracking-[0.16em] text-[var(--sample-muted)]", compact ? "text-[4px]" : "text-[6.5px]")}>Scale of modules</span>
        <svg aria-hidden="true" className={cn("min-w-0 flex-1", compact ? "h-2" : "h-3")} fill="none" preserveAspectRatio="none" viewBox="0 0 240 12">
          <path d="M0 9H240" stroke="var(--sample-text)" strokeWidth="1" />
          {Array.from({ length: 13 }, (_tick, index) => (
            <path d={`M${index * 20} ${index % 2 === 0 ? 2 : 5}V9`} key={index} stroke="var(--sample-text)" strokeWidth={index % 2 === 0 ? 1 : 0.6} />
          ))}
          {Array.from({ length: 6 }, (_fill, index) => (
            <rect fill="var(--sample-accent-3)" height="3.5" key={index} width="20" x={index * 40} y="5.5" />
          ))}
        </svg>
        <span className={cn("shrink-0 whitespace-nowrap italic text-[var(--sample-muted)]", compact ? "hidden" : "text-[7px]")}>12 modules to the diameter</span>
      </footer>
    </div>
  );
}
