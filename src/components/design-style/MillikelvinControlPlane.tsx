"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const CHAMBER_IMAGE = "/generated/design-styles/high-tech.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent)]" as const;

const MONO: CSSProperties = { fontFamily: '"SFMono-Regular", "Consolas", monospace' };

/* Precision discipline: mint = live/healthy, blue = data, amber = caution.
   Values are tabular mono; panels are hairline-bordered graphite, never filled
   accent blocks. */

type QubitId = "q07" | "q52" | "q114";

type Qubit = {
  readonly id: QubitId;
  readonly label: string;
  readonly t1: string;
  readonly t2: string;
  readonly gate1q: string;
  readonly gate2q: string;
  readonly readout: string;
  readonly note: string;
  readonly caution: boolean;
  readonly nodeIndex: number;
};

const QUBITS: readonly Qubit[] = [
  { id: "q07", label: "Q07", t1: "312 µs", t2: "187 µs", gate1q: "99.97 %", gate2q: "99.41 %", readout: "98.9 %", note: "calibrated · 02:10 ago", caution: false, nodeIndex: 2 },
  { id: "q52", label: "Q52", t1: "268 µs", t2: "141 µs", gate1q: "99.94 %", gate2q: "99.18 %", readout: "98.2 %", note: "recalibration queued", caution: true, nodeIndex: 13 },
  { id: "q114", label: "Q114", t1: "344 µs", t2: "209 µs", gate1q: "99.98 %", gate2q: "99.52 %", readout: "99.1 %", note: "calibrated · 00:32 ago", caution: false, nodeIndex: 30 },
];

/* Dilution-refrigerator stages, warm shield down to the mixing-chamber plate. */
const STAGES: readonly (readonly [string, string, string, boolean])[] = [
  ["shield", "300 K", "11%", false],
  ["stage 1", "46 K", "26%", false],
  ["stage 2", "4.1 K", "41%", false],
  ["still", "812 mK", "56%", false],
  ["cold plate", "108 mK", "71%", false],
  ["mxc", "12.9 mK", "86%", true],
];

/* Heavy-hex-flavored lattice: 4 offset rows × 8 columns. Tier drives node
   color — 0 mint (best), 1 blue (nominal), 2 amber (review). */
const NODE_TIERS: readonly number[] = [
  0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 2, 0, 0, 1, 0,
  0, 0, 1, 0, 0, 1, 0, 0,
  1, 0, 0, 0, 2, 0, 0, 0,
];

function nodePosition(index: number): { readonly left: number; readonly top: number } {
  const row = Math.floor(index / 8);
  const col = index % 8;
  return { left: 5 + col * 12 + (row % 2 === 1 ? 6 : 0), top: 14 + row * 22 };
}

const TIER_COLOR = ["var(--sample-accent)", "var(--sample-accent-2)", "var(--sample-accent-3)"] as const;

function LatticeLines() {
  const segments: string[] = [];
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      const a = nodePosition(row * 8 + col);
      const b = nodePosition(row * 8 + col + 1);
      segments.push(`M ${a.left} ${a.top} L ${b.left} ${b.top}`);
    }
  }
  for (const col of [1, 4, 6]) {
    for (let row = 0; row < 3; row += 1) {
      const a = nodePosition(row * 8 + col);
      const b = nodePosition((row + 1) * 8 + col);
      segments.push(`M ${a.left} ${a.top} L ${b.left} ${b.top}`);
    }
  }
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
      <path d={segments.join(" ")} fill="none" stroke="var(--sample-border)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function StatusDot({ color, pulse = false }: { readonly color: string; readonly pulse?: boolean }) {
  return (
    <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
      {pulse ? <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" style={{ backgroundColor: color }} /> : null}
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
    </span>
  );
}

function ReadoutRows({ compact, qubit }: { readonly compact: boolean; readonly qubit: Qubit }) {
  const rows: readonly (readonly [string, string, boolean])[] = [
    ["T1 relaxation", qubit.t1, false],
    ["T2 coherence", qubit.t2, false],
    ["1Q gate", qubit.gate1q, false],
    ["2Q gate", qubit.gate2q, qubit.caution],
    ["readout assign.", qubit.readout, false],
  ];
  return (
    <div className={cn(compact ? "text-[8px]" : "text-[10px]")}>
      {rows.map(([label, value, caution]) => (
        <div className="flex items-baseline justify-between border-b border-[var(--sample-border-soft)] py-1 last:border-b-0" key={label}>
          <span className="text-[var(--sample-muted)]">{label}</span>
          <span className="tabular-nums" style={{ ...MONO, color: caution ? "var(--sample-accent-3)" : "var(--sample-text)" }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export function MillikelvinControlPlane({ compact = false }: { readonly compact?: boolean }) {
  const [selectedId, setSelectedId] = useState<QubitId>("q07");
  const selected = QUBITS.find((qubit) => qubit.id === selectedId) ?? QUBITS[0];

  const trendBars = [72, 78, 74, 82, 80, 86, 58, 84, 88, 86, 90, 94];

  return (
    <div className="flex h-full flex-col text-[var(--sample-text)]">
      {/* app chrome */}
      <div className={cn("flex items-center gap-3 border-b border-[var(--sample-border)] pb-2", compact ? "text-[8px]" : "text-[10px]")}>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className={cn("font-display font-bold tracking-[0.14em]", compact ? "text-[11px]" : "text-sm")} style={{ fontFamily: "var(--st-font-display)" }}>
            MILLIKELVIN
          </span>
          <span aria-label="QUANTUM CONTROL PLANE" className="whitespace-nowrap text-[7px] uppercase tracking-[0.22em] text-[var(--sample-muted)]">
            <span aria-hidden="true" className={cn(compact ? "hidden" : "hidden sm:inline")}>QUANTUM </span>
            <span aria-hidden="true">CONTROL PLANE</span>
          </span>
        </div>
        <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "hidden sm:flex")}>
          <span className="text-[var(--sample-text)]">Systems</span>
          <span>Jobs</span>
          <span>Calibration</span>
          <span>Access</span>
        </nav>
        <span className="ml-auto flex items-center gap-1.5 rounded-[3px] border border-[var(--sample-border)] px-2 py-1" style={MONO}>
          <StatusDot color="var(--sample-accent)" pulse />
          <span className="whitespace-nowrap tabular-nums">QPU-133 · online</span>
        </span>
      </div>

      {/* main: cryostat rail · lattice · calibration */}
      <div className={cn("grid min-h-0 flex-1 gap-2.5 pt-2.5", compact ? "grid-cols-[0.42fr_0.58fr]" : "grid-cols-[0.38fr_0.62fr] md:grid-cols-[0.30fr_0.44fr_0.26fr]")}>
        {/* cryostat rail — chamber camera with stage ladder */}
        <div aria-label="cryostat rail" className="relative min-h-0 overflow-hidden rounded-[4px] border border-[var(--sample-border)]" role="img">
          <span aria-hidden="true" className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('${CHAMBER_IMAGE}')`, backgroundPosition: "62% center" }} />
          <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(90deg, rgb(4 9 14 / 0.78) 0%, rgb(4 9 14 / 0.30) 44%, transparent 70%)" }} />
          <div className={cn("absolute left-2 top-2 flex items-center gap-1.5 uppercase tracking-[0.16em] text-[var(--sample-muted)]", compact ? "text-[6px]" : "text-[8px]")}>
            <StatusDot color="var(--sample-accent)" />
            <span className="whitespace-nowrap">
              cryostat<span className={cn(compact ? "hidden" : "hidden sm:inline")}> · unit A</span>
            </span>
          </div>
          {/* stage ladder */}
          <span aria-hidden="true" className={cn("absolute bottom-7 top-7", compact ? "left-2.5 w-px" : "left-3 w-px")} style={{ backgroundColor: "color-mix(in srgb, var(--sample-border) 80%, transparent)" }} />
          {STAGES.map(([name, temp, top, base]) => (
            <div className={cn("absolute flex -translate-y-1/2 items-center whitespace-nowrap", compact ? "left-1.5 gap-1" : "left-2 gap-1.5")} key={name} style={{ top, textShadow: "0 1px 3px rgb(0 0 0 / 0.85)" }}>
              <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full border", base ? "" : "bg-[var(--sample-base)]")} style={{ borderColor: base ? "var(--sample-accent)" : "var(--sample-muted)", backgroundColor: base ? "var(--sample-accent)" : undefined, textShadow: "none" }} />
              <span className={cn("leading-none tabular-nums", compact ? "text-[7px]" : "text-[9px]")} style={{ ...MONO, color: base ? "var(--sample-accent)" : "var(--sample-text)" }}>
                {temp}
              </span>
              <span className={cn("uppercase leading-none tracking-[0.1em]", compact ? "hidden" : "hidden text-[6px] sm:inline")} style={{ color: "color-mix(in srgb, var(--sample-muted) 80%, #fff)" }}>{name}</span>
            </div>
          ))}
          <div className={cn("absolute bottom-2 left-2 flex items-center gap-1.5 whitespace-nowrap rounded-[3px] border border-[var(--sample-border)] bg-[rgb(4_9_14_/_0.72)] px-1.5 py-1", compact ? "text-[6px]" : "text-[8px]")} style={MONO}>
            <span className="tabular-nums">
              QPU-133<span className={cn(compact ? "hidden" : "hidden sm:inline")}> · 133 transmons</span>
            </span>
          </div>
        </div>

        {/* headline + qubit lattice */}
        <div className="flex min-h-0 min-w-0 flex-col">
          <p className={cn("whitespace-nowrap font-semibold uppercase tracking-[0.14em] text-[var(--sample-accent)]", compact ? "text-[7px]" : "text-[8px]")}>unit A · shot window open</p>
          <h3
            className={cn("mt-1.5 font-display leading-[1.02] tracking-tight", compact ? "text-lg" : "text-xl md:text-[1.5rem]")}
            style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
          >
            Circuits at 12.9&nbsp;millikelvin.
          </h3>
          <p className={cn("mt-1.5 line-clamp-2 max-w-[44ch] text-[10px] leading-4 text-[var(--sample-muted)]", compact ? "hidden" : "hidden md:block")}>
            Calibration, queueing and readout for 133 transmons — scheduled like compute.
          </p>

          <div aria-label="qubit lattice" className={cn("relative mt-2 min-h-0 flex-1 rounded-[4px] border border-[var(--sample-border)] bg-[var(--sample-surface)]", compact ? "p-1.5" : "p-2")}>
            <div className={cn("flex items-center justify-between gap-2 uppercase tracking-[0.12em] text-[var(--sample-muted)]", compact ? "text-[6px]" : "text-[8px]")}>
              <span className="whitespace-nowrap">qubit lattice · heavy-hex</span>
              <span className={cn("whitespace-nowrap tabular-nums", compact ? "hidden" : "hidden sm:inline")} style={MONO}>133 physical</span>
            </div>
            <div className="relative mt-1 h-[calc(100%-1.4rem)] min-h-[72px]">
              <LatticeLines />
              {NODE_TIERS.map((tier, index) => {
                const target = QUBITS.find((qubit) => qubit.nodeIndex === index);
                const { left, top } = nodePosition(index);
                if (target) {
                  const active = target.id === selectedId;
                  return (
                    <button
                      aria-label={`select qubit ${target.label}`}
                      aria-pressed={active}
                      className={cn("absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full", FOCUS, compact ? "h-4 w-4" : "h-5 w-5")}
                      key={index}
                      onClick={() => setSelectedId(target.id)}
                      style={{ left: `${left}%`, top: `${top}%` }}
                      type="button"
                    >
                      <span
                        className={cn("rounded-full transition-all", compact ? "h-2 w-2" : "h-2.5 w-2.5")}
                        style={{
                          backgroundColor: TIER_COLOR[tier],
                          boxShadow: active ? "0 0 0 2px var(--sample-surface), 0 0 0 3.5px var(--sample-accent)" : "none",
                        }}
                      />
                      <span
                        className={cn(
                          "absolute left-1/2 -translate-x-1/2 whitespace-nowrap leading-none",
                          index >= 24 ? (compact ? "bottom-4 text-[6px]" : "bottom-5 text-[7px]") : compact ? "top-4 text-[6px]" : "top-5 text-[7px]",
                        )}
                        style={{ ...MONO, color: active ? "var(--sample-accent)" : "var(--sample-muted)" }}
                      >
                        {target.label}
                      </span>
                    </button>
                  );
                }
                return (
                  <span
                    aria-hidden="true"
                    className={cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-75", compact ? "h-1 w-1" : "h-1.5 w-1.5")}
                    key={index}
                    style={{ left: `${left}%`, top: `${top}%`, backgroundColor: TIER_COLOR[tier] }}
                  />
                );
              })}
            </div>
          </div>

          {/* condensed readout when the calibration column is hidden */}
          <div className={cn("mt-2 flex-col gap-1 rounded-[3px] border border-[var(--sample-border)] px-2 py-1.5", compact ? "hidden" : "flex md:hidden text-[9px]")} style={MONO}>
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--sample-accent)" }}>{selected.label}</span>
              <span className={cn("ml-auto min-w-0 truncate", selected.caution ? "" : "text-[var(--sample-muted)]")} style={{ color: selected.caution ? "var(--sample-accent-3)" : undefined }}>{selected.note}</span>
            </div>
            <span className="whitespace-nowrap tabular-nums text-[var(--sample-muted)]">T1 {selected.t1} · 2Q {selected.gate2q}</span>
          </div>
        </div>

        {/* calibration readout + job queue */}
        <div className={cn("min-h-0 flex-col gap-2", compact ? "hidden" : "hidden md:flex")}>
          <div aria-label="calibration readout" className="rounded-[4px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2">
            <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.12em] text-[var(--sample-muted)]">
              <span>calibration · {selected.label}</span>
              <span style={{ color: selected.caution ? "var(--sample-accent-3)" : "var(--sample-accent)" }}>{selected.caution ? "review" : "pass"}</span>
            </div>
            <div className="mt-1">
              <ReadoutRows compact={compact} qubit={selected} />
            </div>
            <p className="mt-1.5 text-[8px] text-[var(--sample-muted)]" style={MONO}>{selected.note}</p>
          </div>

          <div className="rounded-[4px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2">
            <div className="flex items-baseline justify-between gap-2 text-[8px] uppercase tracking-[0.12em] text-[var(--sample-muted)]">
              <span className="truncate">gate fidelity</span>
              <span className="shrink-0 whitespace-nowrap tabular-nums" style={{ ...MONO, color: "var(--sample-text)" }}>{selected.gate2q}</span>
            </div>
            <div className="mt-1.5 flex h-7 items-end gap-[3px]">
              {trendBars.map((height, index) => (
                <span
                  className="flex-1 rounded-t-[1px]"
                  key={index}
                  style={{
                    height: `${height}%`,
                    backgroundColor:
                      index === 6
                        ? "var(--sample-accent-3)"
                        : index === trendBars.length - 1
                          ? "var(--sample-accent)"
                          : "color-mix(in srgb, var(--sample-accent-2) 45%, transparent)",
                  }}
                />
              ))}
            </div>
          </div>

          <div aria-label="job queue" className="min-h-0 flex-1 rounded-[4px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2">
            <p className="text-[8px] uppercase tracking-[0.12em] text-[var(--sample-muted)]">job queue · 7 waiting</p>
            <div className="mt-1 text-[9px]">
              {([
                ["vqe-h2-ansatz", "depth 42 · 4,096 shots", "running", "var(--sample-accent)", true],
                ["qaoa-maxcut-18", "depth 26 · 2,048 shots", "queued", "var(--sample-accent-2)", false],
                ["rb-xeb-sweep", "depth 12 · 1,024 shots", "done", "var(--sample-muted)", false],
              ] as const).map(([name, meta, state, color, pulse]) => (
                <div className="flex items-center gap-1.5 border-b border-[var(--sample-border-soft)] py-1 last:border-b-0" key={name}>
                  <StatusDot color={color} pulse={pulse} />
                  <span className="min-w-0 flex-col leading-tight">
                    <span className="block truncate" style={MONO}>{name}</span>
                    <span className="block truncate text-[7px] tabular-nums text-[var(--sample-muted)]" style={MONO}>{meta}</span>
                  </span>
                  <span className="ml-auto text-[7px] uppercase tracking-[0.1em]" style={{ ...MONO, color }}>{state}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* telemetry strip */}
      <div className={cn("mt-2.5 border-t border-[var(--sample-border)] pt-2", compact ? "hidden" : "grid grid-cols-2 gap-2 text-[9px] sm:grid-cols-4")} style={MONO}>
        {([
          ["mxc plate", "12.9 mK · stable", "var(--sample-accent)"],
          ["fridge cycle", "day 41", "var(--sample-text)"],
          ["queue depth", "7 jobs · 18 min", "var(--sample-text)"],
          ["1Q error floor", "3.1e-4", "var(--sample-accent-2)"],
        ] as const).map(([label, value, color]) => (
          <div className="flex min-w-0 flex-col gap-0.5" key={label}>
            <span className={cn("whitespace-nowrap uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "text-[6px]" : "text-[7px]")}>{label}</span>
            <span className="truncate tabular-nums" style={{ color }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
