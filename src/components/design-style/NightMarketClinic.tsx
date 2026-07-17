"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const ALLEY_IMAGE = "/generated/design-styles/cyberpunk.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent)]" as const;

/* Clipped corner — the genre's panel silhouette. One cut, top-right. */
const CLIP = "polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 0 100%)";
const CLIP_SM = "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)";

const HAZARD =
  "repeating-linear-gradient(-45deg, rgb(183 255 60 / 0.85) 0 8px, transparent 8px 16px)";

const CYAN_GLOW = "0 0 10px rgb(0 229 255 / 0.55)";
const MAGENTA_GLOW = "0 0 10px rgb(255 59 244 / 0.6)";

type ImplantId = "optic" | "neural" | "subdermal" | "bd-rig";
type SlotId = "23:20" | "23:40" | "00:15" | "00:50";

type Implant = {
  readonly id: ImplantId;
  readonly name: string;
  readonly spec: string;
  readonly source: string;
  readonly grade: number;
  readonly stock: number;
  readonly price: number;
  readonly humanity: number;
  readonly install: string;
  readonly tag?: string;
};

const IMPLANTS: readonly Implant[] = [
  { id: "optic", name: "Optic suite Mk.3", spec: "lowlight · zoom ×8 · rec", source: "corpo salvage · wiped", grade: 4, stock: 3, price: 1400, humanity: 4, install: "40 min", tag: "New" },
  { id: "neural", name: "Neural port rev.7", spec: "wetlink · dual bus", source: "factory second · sealed", grade: 3, stock: 6, price: 900, humanity: 2, install: "25 min" },
  { id: "subdermal", name: "Subdermal plate", spec: "torso · kevlar weave", source: "milspec pull · dented", grade: 5, stock: 1, price: 2100, humanity: 6, install: "70 min", tag: "Hot" },
  { id: "bd-rig", name: "BRAINDANCE rig tune", spec: "playback only · legal-ish", source: "house service · same chair", grade: 2, stock: 8, price: 650, humanity: 0, install: "15 min" },
];

const SLOTS: readonly { readonly id: SlotId; readonly taken?: boolean }[] = [
  { id: "23:20", taken: true },
  { id: "23:40" },
  { id: "00:15" },
  { id: "00:50" },
];

const eddies = (value: number) => `€$${value.toLocaleString("en-US")}`;

type NightMarketClinicProps = {
  readonly compact?: boolean;
};

export function NightMarketClinic({ compact = false }: NightMarketClinicProps) {
  const [implantId, setImplantId] = useState<ImplantId>("optic");
  const [slotId, setSlotId] = useState<SlotId>("23:40");
  const implant = IMPLANTS.find((entry) => entry.id === implantId) ?? IMPLANTS[0];
  const humanityLeft = 100 - implant.humanity;

  return (
    <div
      className={cn(
        "cyberpunk-clinic relative grid min-w-0 font-mono",
        compact
          ? "h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-1.5"
          : "min-h-[720px] grid-rows-[auto_minmax(0,1fr)_auto_auto] gap-2.5 md:h-full md:min-h-0",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(55% 45% at 12% 0%, rgb(255 59 244 / 0.12), transparent 60%), radial-gradient(50% 40% at 92% 8%, rgb(0 229 255 / 0.1), transparent 62%)",
        }}
      />

      {/* ── band 1 · neon storefront sign ── */}
      <header className="relative z-10 flex min-w-0 items-center gap-2">
        <div className="min-w-0">
          <p
            className={cn("cp-flicker whitespace-nowrap font-black uppercase leading-none text-[var(--sample-text)]", compact ? "text-[10px] tracking-[0.08em]" : "text-[12px] tracking-[0.08em] sm:text-[16px] sm:tracking-[0.12em]")}
            style={{ fontFamily: "var(--st-font-display)", textShadow: "0 0 6px rgb(0 229 255 / 0.9), 0 0 18px rgb(0 229 255 / 0.5)" }}
          >
            Lucky Chrome Clinic
          </p>
          <p className={cn("truncate uppercase text-[var(--sample-muted)]", compact ? "mt-0.5 text-[5px] tracking-[0.12em]" : "mt-1 text-[7px] tracking-[0.2em]")}>
            Ripper lane 13 · Night market district · lic #NM-88
          </p>
        </div>
        <span className={cn("ml-auto flex shrink-0 items-center gap-2", compact ? "gap-1" : "")}>
          <span
            className={cn("whitespace-nowrap border border-[var(--sample-accent-2)] font-bold uppercase text-[var(--sample-accent-2)]", compact ? "hidden" : "hidden px-2 py-1 text-[7px] tracking-[0.14em] sm:inline-block")}
            style={{ clipPath: CLIP_SM, textShadow: MAGENTA_GLOW, boxShadow: "inset 0 0 10px rgb(255 59 244 / 0.14)" }}
          >
            No warrants asked
          </span>
          <span
            className={cn("flex shrink-0 items-center whitespace-nowrap border border-[var(--sample-accent-3)] font-bold uppercase text-[var(--sample-accent-3)]", compact ? "gap-1 px-1.5 py-0.5 text-[6px] tracking-[0.08em]" : "gap-1.5 px-2 py-1 text-[7px] tracking-[0.14em]")}
            style={{ clipPath: CLIP_SM, boxShadow: "inset 0 0 10px rgb(183 255 60 / 0.14)" }}
          >
            <span aria-hidden="true" className={cn("cp-open rounded-full bg-[var(--sample-accent-3)]", compact ? "h-1 w-1" : "h-1.5 w-1.5")} style={{ boxShadow: "0 0 6px rgb(183 255 60 / 0.9)" }} />
            Open 24h
          </span>
        </span>
      </header>

      {/* ── band 2 · alley cam + implant terminal ── */}
      <div className={cn("relative z-10 grid min-h-0 min-w-0", compact ? "grid-cols-[0.62fr_1.38fr] gap-1.5" : "grid-cols-1 gap-2.5 md:grid-cols-[0.72fr_1.28fr]")}>
        {/* alley image column with stacked neon signage */}
        <section
          aria-label="Alley signage"
          className={cn("relative min-h-0 min-w-0 overflow-hidden border border-[rgb(109_235_255_/_0.4)]", compact ? "" : "h-36 md:h-auto")}
          style={{ clipPath: CLIP }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: `url('${ALLEY_IMAGE}')`, backgroundPosition: "center 68%" }}
          />
          <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgb(8 10 20 / 0.3), transparent 30%, transparent 62%, rgb(8 10 20 / 0.72))" }} />
          <div className={cn("absolute bottom-2 left-2 z-10 grid", compact ? "gap-1" : "gap-1.5")}>
            {([
              ["Implants", "var(--sample-accent)", CYAN_GLOW],
              ["Braindance", "var(--sample-accent-2)", MAGENTA_GLOW],
              ["Deck flash", "var(--sample-accent-3)", "0 0 10px rgb(183 255 60 / 0.6)"],
            ] as const).map(([label, color, glow]) => (
              <span
                className={cn("w-fit whitespace-nowrap border bg-[rgb(8_10_20_/_0.78)] font-bold uppercase", compact ? "px-1.5 py-0.5 text-[5px] tracking-[0.14em]" : "px-2 py-1 text-[7.5px] tracking-[0.22em]")}
                key={label}
                style={{ borderColor: color, color, clipPath: CLIP_SM, textShadow: glow, boxShadow: `inset 0 0 12px ${color === "var(--sample-accent)" ? "rgb(0 229 255 / 0.16)" : color === "var(--sample-accent-2)" ? "rgb(255 59 244 / 0.16)" : "rgb(183 255 60 / 0.16)"}` }}
              >
                {label}
              </span>
            ))}
          </div>
          <span className={cn("absolute right-2 top-2 z-10 whitespace-nowrap bg-[rgb(8_10_20_/_0.7)] px-1.5 py-0.5 uppercase text-[var(--sample-muted)]", compact ? "text-[4.5px] tracking-[0.1em]" : "text-[6px] tracking-[0.16em]")}>
            lane cam 03 · live
          </span>
        </section>

        {/* terminal column */}
        <div className={cn("grid min-h-0 min-w-0", compact ? "grid-rows-[minmax(0,1fr)_auto] gap-1.5" : "grid-rows-[minmax(0,1fr)_auto_auto] gap-2")}>
          {/* implant menu */}
          <section
            aria-label="Implant menu"
            className="flex min-h-0 min-w-0 flex-col border border-[rgb(109_235_255_/_0.34)] bg-[var(--sample-surface)] p-2"
            style={{ clipPath: CLIP }}
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className={cn("whitespace-nowrap font-black uppercase text-[var(--sample-text)]", compact ? "text-[6px] tracking-[0.14em]" : "text-[8.5px] tracking-[0.2em]")} style={{ textShadow: "0 0 8px rgb(0 229 255 / 0.4)" }}>
                Implant menu
              </h3>
              <p className={cn("whitespace-nowrap uppercase text-[var(--sample-muted)]", compact ? "text-[4.5px] tracking-[0.08em]" : "hidden text-[6.5px] tracking-[0.12em] sm:block")}>chair 2 free · sterile-ish</p>
            </div>
            <div className={cn("mt-1.5 grid min-h-0 min-w-0 flex-1", compact ? "grid-cols-1 gap-1" : "grid-cols-1 gap-1.5 sm:grid-cols-2 sm:grid-rows-[1fr_1fr]")}>
              {(compact ? IMPLANTS.slice(0, 3) : IMPLANTS).map((entry) => {
                const active = entry.id === implantId;
                return (
                  <button
                    aria-label={`Implant ${entry.name}`}
                    aria-pressed={active}
                    className={cn(
                      FOCUS,
                      "flex min-w-0 flex-col justify-between border bg-[rgb(8_10_20_/_0.6)] text-left transition-colors",
                      compact ? "px-1.5 py-1" : "px-2 py-1.5",
                      active
                        ? "border-[var(--sample-accent)]"
                        : "border-[rgb(109_235_255_/_0.18)] hover:border-[rgb(109_235_255_/_0.45)]",
                    )}
                    key={entry.id}
                    onClick={() => setImplantId(entry.id)}
                    style={active ? { clipPath: CLIP_SM, boxShadow: "inset 0 0 14px rgb(0 229 255 / 0.16), 0 0 10px rgb(0 229 255 / 0.22)" } : { clipPath: CLIP_SM }}
                    type="button"
                  >
                    <span className="block min-w-0">
                      <span className="flex min-w-0 items-center gap-1">
                        <span className={cn("min-w-0 truncate font-bold uppercase", compact ? "text-[6px] tracking-[0.04em]" : "text-[8px] tracking-[0.08em]", active ? "text-[var(--sample-accent)]" : "text-[var(--sample-text)]")}>
                          {entry.name}
                        </span>
                        {entry.tag ? (
                          <span className={cn("shrink-0 bg-[var(--sample-accent-2)] px-1 font-bold uppercase text-black", compact ? "text-[4px]" : "text-[5.5px] tracking-[0.06em]")}>{entry.tag}</span>
                        ) : null}
                      </span>
                      <span className={cn("mt-0.5 block truncate uppercase text-[var(--sample-muted)]", compact ? "text-[4.5px] tracking-[0.04em]" : "text-[6px] tracking-[0.08em]")}>{entry.spec}</span>
                      <span className={cn("block truncate uppercase text-[var(--sample-muted)]", compact ? "hidden" : "mt-0.5 text-[6px] tracking-[0.08em]")}>{entry.source}</span>
                    </span>
                    <span className={cn("min-w-0 items-center gap-1.5", compact ? "hidden" : "mt-1 flex")}>
                      <span className="whitespace-nowrap text-[5.5px] uppercase tracking-[0.1em] text-[var(--sample-muted)]">grade</span>
                      <span aria-hidden="true" className="flex items-center gap-[2px]">
                        {[1, 2, 3, 4, 5].map((tick) => (
                          <span
                            className="h-1 w-2"
                            key={tick}
                            style={{
                              backgroundColor: tick <= entry.grade ? (active ? "var(--sample-accent)" : "rgb(109 235 255 / 0.55)") : "rgb(255 255 255 / 0.1)",
                              boxShadow: tick <= entry.grade && active ? "0 0 5px rgb(0 229 255 / 0.6)" : undefined,
                            }}
                          />
                        ))}
                      </span>
                      <span className="ml-auto whitespace-nowrap text-[5.5px] uppercase tabular-nums tracking-[0.08em] text-[var(--sample-muted)]">stock {entry.stock}</span>
                    </span>
                    <span className={cn("flex min-w-0 items-center gap-1.5", compact ? "mt-0.5 text-[5px]" : "mt-1 text-[7px]")}>
                      <span className="font-black tabular-nums text-[var(--sample-accent-3)]">{eddies(entry.price)}</span>
                      <span className="uppercase tabular-nums text-[var(--sample-accent-2)]">hum −{entry.humanity}%</span>
                      <span className={cn("ml-auto uppercase tabular-nums text-[var(--sample-muted)]", compact ? "hidden" : "")}>{entry.install}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* black-market deck flash listing */}
          <section
            aria-label="black-market deck flash"
            className={compact ? "hidden" : "flex min-w-0 items-center gap-2 border border-[rgb(255_59_244_/_0.34)] bg-[var(--sample-surface)] px-2 py-1.5"}
            style={{ clipPath: CLIP }}
          >
            <span className="shrink-0 whitespace-nowrap text-[7px] font-black uppercase tracking-[0.16em] text-[var(--sample-accent-2)]" style={{ textShadow: MAGENTA_GLOW }}>
              Black-market deck flash
            </span>
            <span className="min-w-0 truncate text-[6.5px] uppercase tracking-[0.06em] text-[var(--sample-muted)]">
              Milspec deck · jailbroken · serial scrubbed · escrow held
            </span>
            <span className="ml-auto hidden shrink-0 whitespace-nowrap text-[6.5px] uppercase text-[var(--sample-accent)] sm:inline">trust ★★★★☆</span>
            <span className="shrink-0 whitespace-nowrap text-[8px] font-black tabular-nums text-[var(--sample-accent-3)]">{eddies(3800)}</span>
          </section>

          {/* install queue */}
          <section
            aria-label="Install queue"
            className={compact ? "hidden" : "flex min-w-0 items-center gap-2 border border-[rgb(109_235_255_/_0.24)] bg-[var(--sample-surface)] px-2 py-1.5"}
            style={{ clipPath: CLIP }}
          >
            <span className="shrink-0 whitespace-nowrap text-[7px] font-black uppercase tracking-[0.16em] text-[var(--sample-text)]">Install queue</span>
            <span className="shrink-0 whitespace-nowrap text-[6px] uppercase tracking-[0.1em] text-[var(--sample-muted)]">tonight</span>
            <span className="flex min-w-0 flex-wrap items-center gap-1">
              {SLOTS.map((slot) => {
                const active = slot.id === slotId;
                return (
                  <button
                    aria-label={`Install slot ${slot.id}${slot.taken ? ", taken" : ""}`}
                    aria-pressed={active}
                    className={cn(
                      FOCUS,
                      "shrink-0 whitespace-nowrap border px-1.5 py-0.5 text-[7px] font-bold tabular-nums transition-colors",
                      slot.taken
                        ? "cursor-not-allowed border-[rgb(164_169_199_/_0.24)] text-[var(--sample-muted)] line-through"
                        : active
                          ? "border-[var(--sample-accent)] text-[var(--sample-accent)]"
                          : "border-[rgb(109_235_255_/_0.24)] text-[var(--sample-text)] hover:border-[rgb(109_235_255_/_0.5)]",
                    )}
                    disabled={slot.taken}
                    key={slot.id}
                    onClick={() => setSlotId(slot.id)}
                    style={active && !slot.taken ? { clipPath: CLIP_SM, boxShadow: "0 0 8px rgb(0 229 255 / 0.35)" } : { clipPath: CLIP_SM }}
                    type="button"
                  >
                    {slot.id}
                  </button>
                );
              })}
            </span>
            <span className="ml-auto hidden shrink-0 whitespace-nowrap text-[6px] uppercase tracking-[0.1em] text-[var(--sample-muted)] sm:inline">anesthesia +{eddies(40)}</span>
          </section>
        </div>
      </div>

      {/* ── band 3 · checkout ledger ── */}
      <section
        aria-label="Checkout ledger"
        className={
          compact
            ? "hidden"
            : "relative z-10 flex min-w-0 items-center gap-2.5 border border-[rgb(109_235_255_/_0.4)] bg-[rgb(8_10_20_/_0.9)] px-2.5 py-2"
        }
        style={{ clipPath: CLIP, boxShadow: "inset 0 0 22px rgb(0 229 255 / 0.08)" }}
      >
        <span className="min-w-0 truncate text-[7.5px] font-bold uppercase tracking-[0.1em] text-[var(--sample-text)]">
          {implant.name} · chair 2 · {slotId}
        </span>
        <span className="hidden min-w-0 items-center gap-1.5 sm:flex">
          <span className="whitespace-nowrap text-[6px] uppercase tracking-[0.12em] text-[var(--sample-muted)]">humanity</span>
          <span aria-hidden="true" className="h-1.5 w-20 overflow-hidden border border-[rgb(109_235_255_/_0.3)] bg-[rgb(255_255_255_/_0.06)]">
            <span className="block h-full transition-[width]" style={{ width: `${humanityLeft}%`, backgroundImage: "linear-gradient(90deg, var(--sample-accent), var(--sample-accent-2))" }} />
          </span>
          <span className="whitespace-nowrap text-[7px] font-bold tabular-nums text-[var(--sample-accent-2)]">{humanityLeft}%</span>
        </span>
        <span className="ml-auto shrink-0 whitespace-nowrap text-[10px] font-black tabular-nums text-[var(--sample-accent-3)]" style={{ textShadow: "0 0 10px rgb(183 255 60 / 0.5)" }}>
          {eddies(implant.price)}
        </span>
        <button
          className={cn(FOCUS, "shrink-0 whitespace-nowrap border border-[var(--sample-accent-2)] bg-[var(--sample-accent-2)] px-3 py-1 text-[7.5px] font-black uppercase tracking-[0.14em] text-black transition-[filter] hover:brightness-110")}
          style={{ clipPath: CLIP_SM, boxShadow: "0 0 14px rgb(255 59 244 / 0.45)" }}
          type="button"
        >
          Book the chair
        </button>
      </section>

      {/* ── band 4 · hazard protocol strip ── */}
      <footer className="relative z-10 flex min-w-0 items-center gap-2 overflow-hidden">
        <span aria-hidden="true" className={cn("shrink-0", compact ? "h-1.5 w-8" : "h-2 w-12")} style={{ backgroundImage: HAZARD }} />
        <p className={cn("min-w-0 truncate uppercase text-[var(--sample-muted)]", compact ? "text-[4.5px] tracking-[0.1em]" : "text-[6px] tracking-[0.16em]")}>
          cash only · serials scrubbed · city protocol waived · district fee incl. · no refunds after boot
        </p>
        <span aria-hidden="true" className={cn("ml-auto shrink-0", compact ? "h-1.5 w-8" : "h-2 w-12")} style={{ backgroundImage: HAZARD }} />
      </footer>
    </div>
  );
}
