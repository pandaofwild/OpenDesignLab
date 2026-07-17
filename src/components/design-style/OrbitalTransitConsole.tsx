"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const POD_IMAGE = "/generated/design-styles/futurism.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent-2)]" as const;

/* Aerodynamic cut: every actionable chip leans forward by the same amount so
   the whole console shares one velocity vector. */
const CUT = "polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)";

type CorridorId = "MC-01" | "MC-02" | "MC-04" | "MC-07";
type CorridorStatus = "open" | "wx" | "hold";
type WindowStatus = "boarding" | "go" | "hold";

type Corridor = {
  readonly id: CorridorId;
  readonly from: string;
  readonly to: string;
  readonly mach: string;
  readonly transit: string;
  readonly apogee: string;
  readonly pod: string;
  readonly status: CorridorStatus;
  readonly profile: readonly number[];
};

type LaunchWindow = {
  readonly id: string;
  readonly corridor: CorridorId;
  readonly countdown: string;
  readonly dock: string;
  readonly status: WindowStatus;
};

const CORRIDORS: readonly Corridor[] = [
  { id: "MC-01", from: "SEL", to: "SFO", mach: "3.1", transit: "82 min", apogee: "21 km", pod: "Pod 7", status: "open", profile: [26, 58, 100, 96, 66, 24] },
  { id: "MC-02", from: "SEL", to: "SYD", mach: "2.8", transit: "96 min", apogee: "19 km", pod: "Pod 3", status: "open", profile: [22, 48, 86, 90, 60, 22] },
  { id: "MC-04", from: "SEL", to: "DXB", mach: "3.0", transit: "88 min", apogee: "20 km", pod: "Pod 12", status: "wx", profile: [24, 52, 92, 94, 64, 24] },
  { id: "MC-07", from: "SEL", to: "LHR", mach: "3.4", transit: "104 min", apogee: "24 km", pod: "Pod 9", status: "hold", profile: [28, 64, 100, 100, 74, 26] },
];

const WINDOWS: readonly LaunchWindow[] = [
  { id: "W-214", corridor: "MC-01", countdown: "T−00:12:40", dock: "D2", status: "boarding" },
  { id: "W-215", corridor: "MC-02", countdown: "T−00:31:05", dock: "D4", status: "go" },
  { id: "W-216", corridor: "MC-01", countdown: "T−01:02:18", dock: "D2", status: "go" },
  { id: "W-217", corridor: "MC-04", countdown: "T−01:26:44", dock: "D1", status: "hold" },
  { id: "W-218", corridor: "MC-07", countdown: "T−02:03:30", dock: "D5", status: "hold" },
];

const CORRIDOR_STATUS: Record<CorridorStatus, { readonly label: string; readonly className: string }> = {
  open: { label: "Open", className: "border-[var(--sample-accent-3)] bg-[var(--sample-accent-3)] text-white" },
  wx: { label: "WX adv", className: "border-[var(--sample-accent-2)] text-[var(--sample-accent-2)]" },
  hold: { label: "Hold", className: "border-[var(--sample-accent)] bg-[var(--sample-accent)] text-white" },
};

const WINDOW_STATUS: Record<WindowStatus, { readonly label: string; readonly className: string }> = {
  boarding: { label: "Boarding", className: "border-[var(--sample-accent-3)] bg-[var(--sample-accent-3)] text-white" },
  go: { label: "Go", className: "border-[var(--sample-accent-3)] text-[var(--sample-accent-3)]" },
  hold: { label: "Hold", className: "border-[var(--sample-accent)] text-[var(--sample-accent)]" },
};

/* The sample frame caps out near 700px, so the strip carries exactly two
   meters — a third clips mid-bar at every breakpoint. */
const TELEMETRY: readonly (readonly [string, string, number])[] = [
  ["Velocity", "3,704 km/h", 86],
  ["G-load", "1.4 g", 35],
];

const NAV_ITEMS = ["Corridors", "Fleet", "Windows", "Ops"] as const;

/* Boost–glide profile of the active corridor: dashed arc, live pod dot at the
   cruise segment, city ticks on the baseline. */
function CorridorArc() {
  return (
    <svg aria-hidden="true" className="mt-1 w-full" fill="none" viewBox="0 0 120 42">
      <line stroke="rgb(255 255 255 / 0.25)" strokeWidth="1" x1="4" x2="116" y1="36" y2="36" />
      <path d="M6 36 Q60 4 114 36" stroke="var(--sample-accent-2)" strokeDasharray="3 3" strokeWidth="1.4" />
      <circle cx="6" cy="36" fill="rgb(255 255 255 / 0.8)" r="1.6" />
      <circle cx="114" cy="36" fill="rgb(255 255 255 / 0.8)" r="1.6" />
      <circle cx="51" cy="20" fill="var(--sample-accent)" r="2.4" style={{ filter: "drop-shadow(0 0 4px var(--sample-accent))" }} />
      <line stroke="rgb(255 255 255 / 0.35)" strokeDasharray="2 2" strokeWidth="0.8" x1="60" x2="60" y1="20" y2="36" />
    </svg>
  );
}

type OrbitalTransitConsoleProps = {
  readonly compact?: boolean;
};

export function OrbitalTransitConsole({ compact = false }: OrbitalTransitConsoleProps) {
  const [corridorId, setCorridorId] = useState<CorridorId>("MC-01");
  const corridor = CORRIDORS.find((entry) => entry.id === corridorId) ?? CORRIDORS[0];
  const nextWindow = WINDOWS.find((entry) => entry.corridor === corridor.id) ?? WINDOWS[0];
  const openCount = CORRIDORS.filter((entry) => entry.status === "open").length;

  return (
    <div
      className={cn(
        "orbital-transit relative grid min-w-0",
        compact
          ? "h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-1.5"
          : "min-h-[720px] grid-rows-[auto_minmax(0,1.05fr)_auto_auto] gap-2.5 md:h-full md:min-h-0",
      )}
    >
      {/* ── band 1 · authority masthead ── */}
      <header className="relative z-10 flex min-w-0 items-center gap-2">
        <span aria-hidden="true" className={cn("flex shrink-0 items-center", compact ? "gap-[2px]" : "gap-[3px]")}>
          <span className={cn("-skew-x-[24deg] bg-[var(--sample-accent-2)]", compact ? "h-2.5 w-[3px]" : "h-3.5 w-1")} />
          <span className={cn("-skew-x-[24deg] bg-[var(--sample-accent-2)]", compact ? "h-2.5 w-[3px]" : "h-3.5 w-1")} />
          <span className={cn("-skew-x-[24deg] bg-[var(--sample-accent)]", compact ? "h-2.5 w-[3px]" : "h-3.5 w-1")} />
        </span>
        <span
          className={cn("shrink-0 whitespace-nowrap font-black italic leading-none text-[var(--sample-text)]", compact ? "text-[10px] tracking-[-0.01em]" : "text-[13px] tracking-[-0.02em] sm:text-[17px]")}
          style={{ fontFamily: "var(--st-font-display)" }}
        >
          ORBITAL TRANSIT
        </span>
        <nav className={compact ? "hidden" : "ml-1 hidden min-w-0 items-center gap-1 overflow-hidden sm:flex"}>
          {NAV_ITEMS.map((item) => (
            <span
              className={cn(
                "whitespace-nowrap border px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.1em]",
                item === "Corridors"
                  ? "border-[var(--sample-border)] bg-[var(--sample-text)] text-white"
                  : "border-transparent text-[var(--sample-muted)]",
              )}
              key={item}
              style={item === "Corridors" ? { clipPath: CUT } : undefined}
            >
              {item}
            </span>
          ))}
        </nav>
        <span className="ml-auto flex shrink-0 items-center gap-2">
          <span className={cn("shrink-0 whitespace-nowrap border border-[rgb(10_14_26_/_0.24)] bg-[var(--sample-surface)] font-bold uppercase tabular-nums text-[var(--sample-muted)]", compact ? "hidden" : "hidden px-2.5 py-1 text-[8px] tracking-[0.1em] md:inline-flex")}>
            UTC 04:12:07
          </span>
          <span
            className={cn(
              "flex shrink-0 items-center whitespace-nowrap border border-[var(--sample-border)] bg-[var(--sample-text)] font-bold uppercase text-white",
              compact ? "gap-1 px-1.5 py-0.5 text-[6px] tracking-[0.08em]" : "gap-1.5 px-2.5 py-1 text-[8px] tracking-[0.12em]",
            )}
            style={{ clipPath: CUT }}
          >
            <span aria-hidden="true" className={cn("ot-live rounded-full bg-[var(--sample-accent-3)]", compact ? "h-1 w-1" : "h-1.5 w-1.5")} />
            System go
          </span>
        </span>
      </header>

      {/* ── band 2 · pod hero: the image carries the speed ── */}
      <section
        aria-label="Corridor hero"
        className="relative z-10 min-h-0 min-w-0 overflow-hidden rounded-[var(--st-radius)] border border-[var(--sample-border)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url('${POD_IMAGE}')`, backgroundPosition: "center 52%" }}
        />
        <span
          aria-hidden="true"
          className="ot-streak pointer-events-none absolute left-0 top-[44%] h-[2px] w-1/3"
          style={{ backgroundImage: "linear-gradient(90deg, transparent, rgb(255 255 255 / 0.95) 40%, rgb(30 91 255 / 0.8) 70%, transparent)" }}
        />

        <span
          className={cn(
            "absolute left-2 top-2 z-10 flex items-center whitespace-nowrap border border-[var(--sample-accent)] bg-[var(--sample-accent)] font-bold uppercase text-white",
            compact ? "gap-1 px-1.5 py-0.5 text-[5.5px] tracking-[0.08em]" : "gap-1.5 px-2.5 py-1 text-[7.5px] tracking-[0.14em]",
          )}
          style={{ clipPath: CUT }}
        >
          <span aria-hidden="true" className={cn("ot-live rounded-full bg-white", compact ? "h-1 w-1" : "h-1.5 w-1.5")} />
          Live · {corridor.pod} in {corridor.id}
        </span>

        <div className={cn("absolute right-2 top-2 z-10 w-40 rounded-[var(--st-radius)] border border-white/20 bg-[rgb(10_14_26_/_0.84)] p-2 text-white", compact ? "hidden" : "hidden sm:block")}>
          <div className="flex items-baseline justify-between">
            <p className="text-[7px] font-bold uppercase tracking-[0.16em] text-white/70">Corridor arc</p>
            <p className="text-[7.5px] font-bold uppercase tracking-[0.08em] text-[var(--sample-accent-2)]">Apo {corridor.apogee}</p>
          </div>
          <CorridorArc />
          <div className="mt-0.5 flex items-center justify-between text-[6.5px] font-bold uppercase tracking-[0.1em] text-white/60">
            <span>{corridor.from}</span>
            <span>Boost · cruise · glide</span>
            <span>{corridor.to}</span>
          </div>
        </div>

        {/* forward-leaning velocity wedge */}
        <div
          className={cn("absolute bottom-0 left-0 z-10 max-w-[86%] bg-white/[0.92]", compact ? "py-1 pl-2 pr-7" : "py-2.5 pl-4 pr-12")}
          style={{ clipPath: "polygon(0 0, calc(100% - 28px) 0, 100% 100%, 0 100%)" }}
        >
          <p className={cn("truncate font-bold uppercase text-[var(--sample-accent-2)]", compact ? "text-[5.5px] tracking-[0.14em]" : "text-[8px] tracking-[0.22em]")}>
            {corridor.from} → {corridor.to} · Mach corridor {corridor.id}
          </p>
          <p
            className={cn("whitespace-nowrap font-black italic leading-[0.9] text-[var(--sample-text)]", compact ? "text-[19px] tracking-[-0.02em]" : "mt-0.5 text-[30px] tracking-[-0.03em] sm:text-[42px]")}
            style={{ fontFamily: "var(--st-font-display)" }}
          >
            MACH {corridor.mach}
          </p>
          <p className={cn("truncate font-bold uppercase text-[var(--sample-muted)]", compact ? "text-[5px] tracking-[0.08em]" : "mt-1 text-[7.5px] tracking-[0.14em]")}>
            {corridor.transit} city-to-city · apogee {corridor.apogee} · {corridor.pod}
          </p>
        </div>
      </section>

      {/* ── band 3 · corridor map + launch window board ── */}
      <div className={compact ? "hidden" : "relative z-10 grid min-w-0 gap-2.5 md:grid-cols-[1.12fr_0.88fr]"}>
        <section
          aria-label="Mach corridor map"
          className="min-w-0 rounded-[var(--st-radius)] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2.5"
        >
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="whitespace-nowrap text-[8.5px] font-black uppercase tracking-[0.18em] text-[var(--sample-text)]">Mach corridor map</h3>
            <p className="whitespace-nowrap text-[7px] font-bold uppercase tracking-[0.1em] text-[var(--sample-muted)]">
              {CORRIDORS.length} corridors · {openCount} open
            </p>
          </div>
          <div className="mt-1.5 grid gap-1">
            {CORRIDORS.map((entry) => {
              const active = entry.id === corridorId;
              const status = CORRIDOR_STATUS[entry.status];
              return (
                <button
                  aria-label={`Corridor ${entry.id}, ${entry.from} to ${entry.to}`}
                  aria-pressed={active}
                  className={cn(
                    FOCUS,
                    "flex min-w-0 items-center gap-2 border py-1 pl-2 pr-1.5 text-left transition-colors",
                    active
                      ? "border-[var(--sample-accent-2)] bg-[#f2f6ff]"
                      : "border-[rgb(10_14_26_/_0.14)] bg-white hover:bg-[#f6f8fb]",
                  )}
                  key={entry.id}
                  onClick={() => setCorridorId(entry.id)}
                  type="button"
                >
                  <span className={cn("w-10 shrink-0 text-[7.5px] font-bold uppercase tabular-nums tracking-[0.06em]", active ? "text-[var(--sample-accent-2)]" : "text-[var(--sample-muted)]")}>
                    {entry.id}
                  </span>
                  <span className="min-w-0 shrink-0 whitespace-nowrap text-[9px] font-black tracking-[0.02em] text-[var(--sample-text)]">
                    {entry.from} → {entry.to}
                  </span>
                  <span aria-hidden="true" className="hidden h-4 flex-1 items-end gap-[2px] px-1 sm:flex">
                    {entry.profile.map((height, index) => (
                      <span
                        className="w-full max-w-[7px] rounded-t-[1px]"
                        key={index}
                        style={{
                          height: `${height}%`,
                          backgroundColor: active && height === 100 ? "var(--sample-accent)" : "var(--sample-accent-2)",
                          opacity: active ? 0.9 : 0.38,
                        }}
                      />
                    ))}
                  </span>
                  <span className="ml-auto shrink-0 text-[8px] font-black tabular-nums text-[var(--sample-text)] sm:ml-0">M {entry.mach}</span>
                  <span className="hidden w-12 shrink-0 text-right text-[7.5px] font-bold tabular-nums text-[var(--sample-muted)] sm:block">{entry.transit}</span>
                  <span
                    className={cn("w-14 shrink-0 whitespace-nowrap border py-0.5 text-center text-[6.5px] font-bold uppercase tracking-[0.08em]", status.className)}
                    style={{ clipPath: CUT }}
                  >
                    {status.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section
          aria-label="Launch window board"
          className="min-w-0 rounded-[var(--st-radius)] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2.5"
        >
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="whitespace-nowrap text-[8.5px] font-black uppercase tracking-[0.18em] text-[var(--sample-text)]">Launch window board</h3>
            <p className="whitespace-nowrap text-[7px] font-bold uppercase tracking-[0.1em] text-[var(--sample-muted)]">Docks D1–D5</p>
          </div>
          <div className="mt-1.5 grid grid-cols-[auto_auto_1fr_auto_auto] items-center gap-x-2 gap-y-0 text-[7px] font-bold uppercase tracking-[0.1em] text-[var(--sample-muted)]">
            <span className="pb-0.5">Window</span>
            <span className="pb-0.5">Corr</span>
            <span className="pb-0.5 text-right">T-minus</span>
            <span className="pb-0.5">Dock</span>
            <span className="pb-0.5 text-center">Status</span>
            {WINDOWS.map((entry) => {
              const matches = entry.corridor === corridorId;
              const status = WINDOW_STATUS[entry.status];
              return (
                <span className={cn("col-span-5 grid grid-cols-subgrid items-center gap-x-2 border-t py-1", matches ? "border-[var(--sample-accent-2)]/40 bg-[#f2f6ff]" : "border-[rgb(10_14_26_/_0.1)]")} key={entry.id}>
                  <span className={cn("text-[8px] font-black tabular-nums normal-case tracking-normal", matches ? "text-[var(--sample-accent-2)]" : "text-[var(--sample-text)]")}>{entry.id}</span>
                  <span className="text-[7.5px] tabular-nums normal-case tracking-normal text-[var(--sample-muted)]">{entry.corridor}</span>
                  <span className="text-right text-[8.5px] font-black tabular-nums normal-case tracking-normal text-[var(--sample-text)]">{entry.countdown}</span>
                  <span className="text-[7.5px] tabular-nums normal-case tracking-normal text-[var(--sample-muted)]">{entry.dock}</span>
                  <span className={cn("whitespace-nowrap border px-1 py-0.5 text-center text-[6.5px] tracking-[0.08em]", status.className)} style={{ clipPath: CUT }}>
                    {status.label}
                  </span>
                </span>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── band 3 (compact) · condensed launch window board ── */}
      <section aria-label="Launch window board" className={compact ? "relative z-10 min-w-0 rounded-[var(--st-radius)] border border-[var(--sample-border)] bg-[var(--sample-surface)] px-1.5 py-1" : "hidden"}>
        <div className="flex items-center justify-between gap-1">
          <span className="whitespace-nowrap text-[5.5px] font-black uppercase tracking-[0.14em] text-[var(--sample-text)]">Launch window board</span>
          <span className="whitespace-nowrap text-[5px] font-bold uppercase tracking-[0.08em] text-[var(--sample-muted)]">{openCount} corridors open</span>
        </div>
        <div className="mt-0.5 grid gap-[2px]">
          {WINDOWS.slice(0, 3).map((entry) => {
            const status = WINDOW_STATUS[entry.status];
            return (
              <div className="flex min-w-0 items-center gap-1.5 border-t border-[rgb(10_14_26_/_0.1)] pt-[2px] text-[5.5px] font-bold tabular-nums" key={entry.id}>
                <span className="text-[var(--sample-text)]">{entry.id}</span>
                <span className="text-[var(--sample-muted)]">{entry.corridor}</span>
                <span className="ml-auto text-[var(--sample-text)]">{entry.countdown}</span>
                <span className={cn("whitespace-nowrap border px-1 text-[5px] uppercase tracking-[0.06em]", status.className)} style={{ clipPath: CUT }}>
                  {status.label}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── band 4 · live telemetry strip ── */}
      <section
        aria-label="Live telemetry"
        className={
          compact
            ? "hidden"
            : "relative z-10 flex min-w-0 items-center gap-3 rounded-[var(--st-radius)] border border-[var(--sample-border)] bg-[var(--sample-text)] px-3 py-2 text-white"
        }
        style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.18)" }}
      >
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[7.5px] font-black uppercase tracking-[0.14em]">
          <span aria-hidden="true" className="ot-live h-1.5 w-1.5 rounded-full bg-[var(--sample-accent-3)]" />
          {corridor.pod} · Live telemetry
        </span>
        <span className="hidden min-w-0 items-center gap-3 overflow-hidden sm:flex">
          {TELEMETRY.map(([label, value, level]) => (
            <span className="flex items-center gap-1.5" key={label}>
              <span className="whitespace-nowrap text-[6.5px] font-bold uppercase tracking-[0.12em] text-white/55">{label}</span>
              <span className="whitespace-nowrap text-[8.5px] font-black tabular-nums">{value}</span>
              <span aria-hidden="true" className="h-1 w-12 overflow-hidden rounded-full bg-white/15">
                <span className="block h-full rounded-full" style={{ width: `${level}%`, backgroundImage: "linear-gradient(90deg, var(--sample-accent-2), var(--sample-accent))" }} />
              </span>
            </span>
          ))}
        </span>
        <span
          className="ml-auto shrink-0 whitespace-nowrap border border-[var(--sample-accent)] bg-[var(--sample-accent)] px-2.5 py-1 text-[7.5px] font-black uppercase tracking-[0.1em] text-white"
          style={{ clipPath: CUT }}
        >
          <span className="hidden sm:inline">Next window&nbsp;</span>
          {nextWindow.id} · {nextWindow.countdown.replace("T−00:", "T−").replace("T−0", "T−")}
        </span>
      </section>
    </div>
  );
}
