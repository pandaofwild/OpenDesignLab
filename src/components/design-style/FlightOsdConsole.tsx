"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const SCENE_IMAGE = "/generated/design-styles/hud.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent)]" as const;

/* Cold-optic discipline: one ice blue, one pale cyan, one amber — every
   overlay is a thin monoline stroke with a soft glow, never a filled card. */
const BLUE_GLOW = "0 0 8px rgb(79 169 255 / 0.55)";
const LINE = "rgb(79 169 255 / 0.75)";
const LINE_DIM = "rgb(79 169 255 / 0.35)";

const MONO: CSSProperties = { fontFamily: '"SFMono-Regular", "Consolas", monospace' };

type WaypointId = "wp3" | "home";

type Waypoint = {
  readonly id: WaypointId;
  readonly label: string;
  readonly distance: string;
  readonly eta: string;
  readonly targetAltitude: string;
  readonly action: string;
  readonly position: { readonly left: string; readonly top: string };
};

const WAYPOINTS: readonly Waypoint[] = [
  { id: "wp3", label: "WP 3", distance: "210 M", eta: "00:48", targetAltitude: "132 M", action: "SURVEY PASS", position: { left: "64%", top: "38%" } },
  { id: "home", label: "HOME", distance: "320 M", eta: "01:12", targetAltitude: "090 M", action: "RTH READY", position: { left: "22%", top: "56%" } },
];

function CornerBracket({ position }: { readonly position: "tl" | "tr" | "bl" | "br" }) {
  const base = "pointer-events-none absolute h-4 w-4 sm:h-5 sm:w-5";
  const map = {
    tl: cn(base, "left-1.5 top-1.5 border-l border-t"),
    tr: cn(base, "right-1.5 top-1.5 border-r border-t"),
    bl: cn(base, "bottom-1.5 left-1.5 border-b border-l"),
    br: cn(base, "bottom-1.5 right-1.5 border-b border-r"),
  } as const;
  return <span aria-hidden="true" className={map[position]} style={{ borderColor: LINE, boxShadow: "none" }} />;
}

/* Center symbology: reticle ring + ladder rungs with end numerals. */
function PitchLadder({ compact }: { readonly compact: boolean }) {
  const rungs: readonly (readonly [string, number, boolean])[] = compact
    ? [["5", 44, false], ["0", 72, true], ["-5", 44, false]]
    : [["10", 56, false], ["5", 76, false], ["0", 130, true], ["-5", 76, false], ["-10", 56, false]];
  return (
    <div aria-label="pitch ladder" className={cn("pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", compact ? "" : "")} role="img">
      <div className={cn("flex flex-col items-center", compact ? "gap-2" : "gap-3.5")}>
        {rungs.map(([label, width, horizon], index) => (
          <div className="flex items-center gap-1.5" key={index} style={{ color: LINE, ...MONO }}>
            <span className={cn("text-right tabular-nums", compact ? "w-3 text-[5px]" : "w-4 text-[7px]")} style={{ textShadow: BLUE_GLOW }}>{label}</span>
            {horizon ? (
              <span className="relative flex items-center" style={{ width }}>
                <span className="h-px flex-1" style={{ backgroundColor: LINE, boxShadow: BLUE_GLOW }} />
                {/* reticle */}
                <span className={cn("mx-1 rounded-full border", compact ? "h-3 w-3" : "h-5 w-5")} style={{ borderColor: LINE, boxShadow: `inset ${BLUE_GLOW}, ${BLUE_GLOW}` }}>
                  <span className="mx-auto mt-[45%] block h-[2px] w-[2px] rounded-full" style={{ backgroundColor: LINE }} />
                </span>
                <span className="h-px flex-1" style={{ backgroundColor: LINE, boxShadow: BLUE_GLOW }} />
              </span>
            ) : (
              <span className="flex items-center gap-4" style={{ width }}>
                <span className="h-px flex-1" style={{ backgroundColor: label.startsWith("-") ? "transparent" : LINE, borderTop: label.startsWith("-") ? `1px dashed ${LINE_DIM}` : undefined, boxShadow: label.startsWith("-") ? undefined : BLUE_GLOW }} />
                <span className="h-px flex-1" style={{ backgroundColor: label.startsWith("-") ? "transparent" : LINE, borderTop: label.startsWith("-") ? `1px dashed ${LINE_DIM}` : undefined, boxShadow: label.startsWith("-") ? undefined : BLUE_GLOW }} />
              </span>
            )}
            <span className={cn("tabular-nums", compact ? "w-3 text-[5px]" : "w-4 text-[7px]")} style={{ textShadow: BLUE_GLOW }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* roll arc: calibrated bank ticks share the same optical center as the ladder. */
function RollArc({ compact }: { readonly compact: boolean }) {
  const ticks = [-30, -15, 0, 15, 30];
  return (
    <div aria-label="roll arc" className={cn("pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2", compact ? "-translate-y-[42px]" : "-translate-y-[88px]")} role="img" style={{ color: LINE }}>
      <div className={cn("relative", compact ? "h-6 w-20" : "h-10 w-36")}>
        {ticks.map((angle) => (
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 h-1.5 w-px origin-bottom"
            key={angle}
            style={{ backgroundColor: angle === 0 ? LINE : LINE_DIM, transform: `translateX(-50%) rotate(${angle}deg) translateY(${compact ? -28 : -48}px)`, boxShadow: angle === 0 ? BLUE_GLOW : undefined }}
          />
        ))}
        <span aria-hidden="true" className="absolute left-1/2 top-0 -translate-x-1/2 border-x-[3px] border-t-[5px] border-x-transparent" style={{ borderTopColor: LINE, filter: `drop-shadow(${BLUE_GLOW})` }} />
      </div>
    </div>
  );
}

/* flight path vector: operational velocity cue, deliberately distinct from the aiming reticle. */
function FlightPathVector({ compact }: { readonly compact: boolean }) {
  return (
    <div aria-label="flight path vector" className={cn("pointer-events-none absolute left-1/2 top-1/2 z-10", compact ? "translate-x-5 translate-y-3" : "translate-x-9 translate-y-5")} role="img" style={{ color: LINE }}>
      <span className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border", compact ? "h-2.5 w-2.5" : "h-4 w-4")} style={{ borderColor: LINE, boxShadow: BLUE_GLOW }} />
      <span className={cn("absolute right-full top-1/2 h-px -translate-y-1/2", compact ? "w-2" : "w-3")} style={{ backgroundColor: LINE, boxShadow: BLUE_GLOW }} />
      <span className={cn("absolute left-full top-1/2 h-px -translate-y-1/2", compact ? "w-2" : "w-3")} style={{ backgroundColor: LINE, boxShadow: BLUE_GLOW }} />
      <span className={cn("absolute left-1/2 top-full w-px -translate-x-1/2", compact ? "h-2" : "h-3")} style={{ backgroundColor: LINE, boxShadow: BLUE_GLOW }} />
    </div>
  );
}

/* guidance line: selected scene marker resolves toward the shared flight center. */
function GuidanceLine({ waypoint, compact }: { readonly waypoint: Waypoint; readonly compact: boolean }) {
  const home = waypoint.id === "home";
  return (
    <span
      aria-hidden="true"
      className="hud-guidance pointer-events-none absolute z-[9] h-px origin-left"
      style={{
        left: waypoint.position.left,
        top: waypoint.position.top,
        width: compact ? (home ? "30%" : "18%") : home ? "31%" : "17%",
        backgroundImage: `linear-gradient(90deg, ${LINE}, ${LINE_DIM}, transparent)`,
        boxShadow: BLUE_GLOW,
        transform: `rotate(${home ? -12 : 148}deg)`,
      }}
    />
  );
}

function HeadingTape({ compact }: { readonly compact: boolean }) {
  const marks = ["01", "·", "02", "·", "03", "·", "N", "·", "05", "·", "06", "·", "07"];
  return (
    <div aria-label="heading tape" className="pointer-events-none absolute left-1/2 top-2 flex -translate-x-1/2 flex-col items-center" role="img" style={{ color: LINE, ...MONO }}>
      <div className={cn("flex items-baseline", compact ? "gap-1 text-[4.5px]" : "gap-1.5 text-[6.5px]")}>
        {marks.map((mark, index) => (
          <span className={mark === "·" ? "opacity-40" : "opacity-80"} key={index} style={{ textShadow: BLUE_GLOW }}>{mark}</span>
        ))}
      </div>
      <span aria-hidden="true" className="mt-0.5 h-1 w-px" style={{ backgroundColor: LINE }} />
      <span className={cn("mt-0.5 border px-1.5 py-px font-bold tabular-nums", compact ? "text-[5.5px]" : "text-[8px]")} style={{ borderColor: LINE, textShadow: BLUE_GLOW, boxShadow: "inset 0 0 8px rgb(79 169 255 / 0.12)" }}>
        042°
      </span>
    </div>
  );
}

type DataTapeProps = {
  readonly side: "left" | "right";
  readonly label: string;
  readonly value: number;
  readonly step: number;
  readonly unit: string;
  readonly compact: boolean;
};

function DataTape({ side, label, value, step, unit, compact }: DataTapeProps) {
  const marks = compact ? [-1, 0, 1] : [-2, -1, 0, 1, 2];
  return (
    <div
      aria-label={`${label} data tape`}
      className={cn("pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center", side === "left" ? "left-2" : "right-2 flex-row-reverse")}
      role="img"
      style={{ color: LINE, ...MONO }}
    >
      <span className={cn("flex flex-col", compact ? "gap-1" : "gap-1.5")}>
        {marks.map((offset) => (
          <span className="flex items-center gap-1" key={offset}>
            <span className={cn("tabular-nums", compact ? "w-5 text-[4px]" : "w-7 text-[5.5px]", side === "right" && "text-right")} style={{ opacity: offset === 0 ? 1 : 0.5, textShadow: offset === 0 ? BLUE_GLOW : undefined }}>
              {(value + offset * step).toFixed(label === "SPD" ? 1 : 0)}
            </span>
            <span className="h-px" style={{ width: offset === 0 ? 10 : Math.abs(offset) === 2 ? 4 : 7, backgroundColor: offset === 0 ? LINE : LINE_DIM }} />
          </span>
        ))}
      </span>
      <span aria-hidden="true" className={cn("mx-1 border-y-[3px] border-y-transparent", side === "left" ? "border-r-[5px]" : "border-l-[5px]")} style={side === "left" ? { borderRightColor: LINE } : { borderLeftColor: LINE }} />
      <span className={cn("flex flex-col", side === "left" ? "items-start" : "items-end")}>
        <span className={cn("border px-1 py-px font-bold tabular-nums", compact ? "text-[5.5px]" : "text-[8px]")} style={{ borderColor: LINE, textShadow: BLUE_GLOW, boxShadow: "inset 0 0 8px rgb(79 169 255 / 0.12)" }}>
          {label === "SPD" ? value.toFixed(1) : value.toFixed(0)}
        </span>
        <span className={cn("uppercase opacity-70", compact ? "text-[4px] tracking-[0.08em]" : "text-[5.5px] tracking-[0.14em]")}>{label} {unit}</span>
      </span>
    </div>
  );
}

type FlightOsdConsoleProps = {
  readonly compact?: boolean;
};

export function FlightOsdConsole({ compact = false }: FlightOsdConsoleProps) {
  const [waypointId, setWaypointId] = useState<WaypointId>("wp3");
  const waypoint = WAYPOINTS.find((entry) => entry.id === waypointId) ?? WAYPOINTS[0];

  return (
    <div
      className={cn(
        "hud-osd relative grid min-w-0 text-[var(--sample-text)]",
        compact
          ? "h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-1.5"
          : "min-h-[720px] grid-rows-[auto_minmax(0,1fr)] gap-2 md:h-full md:min-h-0",
      )}
      style={MONO}
    >
      {/* ── thin GCS app chrome ── */}
      <header className="relative z-10 flex min-w-0 items-center gap-2">
        <span className={cn("shrink-0 whitespace-nowrap font-bold uppercase leading-none text-[var(--sample-text)]", compact ? "text-[9px] tracking-[0.14em]" : "text-[12px] tracking-[0.2em]")} style={{ textShadow: BLUE_GLOW }}>
          KESTREL GCS
        </span>
        <nav className={compact ? "hidden" : "hidden min-w-0 items-center gap-1 overflow-hidden sm:flex"}>
          {(["Flight OSD", "Missions", "Replay", "Fleet"] as const).map((item) => (
            <span
              className={cn(
                "whitespace-nowrap border px-2 py-0.5 text-[6.5px] font-bold uppercase tracking-[0.14em]",
                item === "Flight OSD"
                  ? "border-[var(--sample-accent)] text-[var(--sample-accent)]"
                  : "border-transparent text-[var(--sample-muted)]",
              )}
              key={item}
              style={item === "Flight OSD" ? { boxShadow: "inset 0 0 10px rgb(79 169 255 / 0.12)" } : undefined}
            >
              {item}
            </span>
          ))}
        </nav>
        <span className="ml-auto flex shrink-0 items-center gap-2">
          <span className={cn("whitespace-nowrap uppercase tabular-nums text-[var(--sample-accent-2)]", compact ? "hidden" : "hidden text-[7px] tracking-[0.14em] sm:inline")}>Link LQ 98%</span>
          <span
            className={cn("flex shrink-0 items-center whitespace-nowrap border border-[var(--sample-accent)] font-bold uppercase text-[var(--sample-accent)]", compact ? "gap-1 px-1.5 py-0.5 text-[6px] tracking-[0.1em]" : "gap-1.5 px-2 py-0.5 text-[7px] tracking-[0.16em]")}
            style={{ boxShadow: "inset 0 0 10px rgb(79 169 255 / 0.12)", textShadow: BLUE_GLOW }}
          >
            <span aria-hidden="true" className={cn("hud-blink rounded-full bg-[var(--sample-accent)]", compact ? "h-1 w-1" : "h-1.5 w-1.5")} style={{ boxShadow: BLUE_GLOW }} />
            Armed
          </span>
        </span>
      </header>

      {/* ── first-person OSD viewport: the scene carries every instrument ── */}
      <section aria-label="Flight OSD viewport" className="relative z-10 min-h-0 min-w-0 overflow-hidden rounded-[2px] border border-[var(--sample-border)]">
        <span aria-hidden="true" className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('${SCENE_IMAGE}')`, backgroundPosition: "center 38%" }} />
        {/* phosphor optic cast + vignette, kept light so the scene stays legible */}
        <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(120% 100% at 50% 50%, transparent 58%, rgb(4 8 10 / 0.55) 100%)", backgroundColor: "rgb(79 169 255 / 0.04)" }} />

        <CornerBracket position="tl" />
        <CornerBracket position="tr" />
        <CornerBracket position="bl" />
        <CornerBracket position="br" />

        {/* top-left mission cluster */}
        <div className={cn("absolute z-10", compact ? "left-3 top-3" : "left-4 top-4")} style={{ color: LINE }}>
          <p className={cn("font-bold uppercase", compact ? "text-[6px] tracking-[0.16em]" : "text-[8px] tracking-[0.22em]")} style={{ textShadow: BLUE_GLOW }}>FLIGHT OSD</p>
          <p className={cn("mt-0.5 uppercase opacity-75", compact ? "text-[4.5px] tracking-[0.1em]" : "text-[6px] tracking-[0.14em]")}>MSN SURVEY-7 · T+04:12</p>
        </div>

        {/* top-right nav cluster */}
        <div className={cn("absolute z-10 text-right", compact ? "right-3 top-8" : "right-4 top-11")} style={{ color: LINE }}>
          <p className={cn("uppercase tabular-nums", compact ? "text-[4.5px] tracking-[0.1em]" : "text-[6px] tracking-[0.14em]")}>
            <span className="text-[var(--sample-accent-2)]" style={{ textShadow: "0 0 8px rgb(143 233 255 / 0.5)" }}>GPS 14</span>
            <span className="opacity-60"> · SAT LOCK</span>
          </p>
          <p className={cn("mt-0.5 flex items-center justify-end gap-1 uppercase tabular-nums", compact ? "text-[4.5px] tracking-[0.1em]" : "text-[6px] tracking-[0.14em]")}>
            <span aria-hidden="true" className="inline-block" style={{ transform: "rotate(-134deg)", textShadow: BLUE_GLOW }}>➤</span>
            <span style={{ textShadow: BLUE_GLOW }}>HOME 320 M</span>
          </p>
        </div>

        <HeadingTape compact={compact} />
        <DataTape compact={compact} label="SPD" side="left" step={1.5} unit="M/S" value={14.2} />
        <DataTape compact={compact} label="ALT" side="right" step={10} unit="M" value={122} />

        <RollArc compact={compact} />
        <PitchLadder compact={compact} />
        <FlightPathVector compact={compact} />
        <GuidanceLine compact={compact} waypoint={waypoint} />

        <span aria-hidden="true" className="hud-scanline pointer-events-none absolute inset-x-0 top-0 z-[8] h-px opacity-20" style={{ backgroundImage: `linear-gradient(90deg, transparent, ${LINE}, transparent)`, boxShadow: BLUE_GLOW }} />

        {/* waypoint markers pinned to the scene */}
        {WAYPOINTS.map((entry) => {
          const active = entry.id === waypointId;
          return (
            <button
              aria-label={`waypoint ${entry.label}`}
              aria-pressed={active}
              className={cn(FOCUS, "absolute z-20 -translate-x-1/2 -translate-y-1/2")}
              key={entry.id}
              onClick={() => setWaypointId(entry.id)}
              style={{ left: entry.position.left, top: entry.position.top }}
              type="button"
            >
              <span
                className={cn("flex flex-col items-center", compact ? "gap-0.5" : "gap-1")}
                style={{ color: active ? LINE : LINE_DIM, ...MONO }}
              >
                <span
                  className={cn("block border", compact ? "h-3 w-3" : "h-5 w-5")}
                  style={{ borderColor: "currentcolor", boxShadow: active ? `inset 0 0 8px rgb(79 169 255 / 0.2), ${BLUE_GLOW}` : undefined, borderStyle: active ? "solid" : "dashed" }}
                />
                <span className={cn("whitespace-nowrap font-bold uppercase tabular-nums", compact ? "text-[4.5px] tracking-[0.1em]" : "text-[6px] tracking-[0.14em]")} style={active ? { textShadow: BLUE_GLOW } : undefined}>
                  {entry.label}
                </span>
              </span>
            </button>
          );
        })}

        {/* bottom-left battery cluster */}
        <div aria-label="battery cells" className={cn("absolute z-10", compact ? "bottom-3 left-3" : "bottom-4 left-4")} role="img" style={{ color: LINE }}>
          <p className={cn("uppercase tabular-nums", compact ? "text-[4.5px] tracking-[0.1em]" : "text-[6px] tracking-[0.16em]")} style={{ textShadow: BLUE_GLOW }}>
            BAT 4S 15.4 V · 3.85 V/CELL
          </p>
          <span aria-hidden="true" className={cn("mt-1 flex", compact ? "gap-0.5" : "gap-1")}>
            {[92, 88, 84, 62].map((level, index) => (
              <span className={cn("overflow-hidden border", level < 70 && "hud-caution", compact ? "h-1.5 w-4" : "h-2 w-6")} key={index} style={{ borderColor: level < 70 ? "rgb(255 177 59 / 0.8)" : LINE }}>
                <span className="block h-full" style={{ width: `${level}%`, backgroundColor: level < 70 ? "rgb(255 177 59 / 0.75)" : "rgb(79 169 255 / 0.6)" }} />
              </span>
            ))}
          </span>
        </div>

        {/* telemetry rail: every field follows the selected waypoint. */}
        <div aria-label="telemetry rail" className={cn("absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center border-y uppercase", compact ? "max-w-[58%] gap-1 px-1.5 py-0.5 text-[4px] tracking-[0.06em]" : "gap-3 px-3 py-1 text-[5.5px] tracking-[0.12em]")} style={{ borderColor: LINE_DIM, color: LINE, backgroundColor: "rgb(4 8 10 / 0.42)", backdropFilter: "blur(2px)" }}>
          <span className="font-bold" style={{ textShadow: BLUE_GLOW }}>{waypoint.label}</span>
          <span className="tabular-nums">{waypoint.distance}</span>
          <span className={compact ? "hidden" : "tabular-nums"}>ETA {waypoint.eta}</span>
          <span className={compact ? "hidden" : "tabular-nums"}>TGT {waypoint.targetAltitude}</span>
          <span className="truncate text-[var(--sample-accent-2)]">{waypoint.action}</span>
          <span className={compact ? "hidden" : "whitespace-nowrap text-[var(--sample-accent-3)]"} style={{ textShadow: "0 0 8px rgb(255 177 59 / 0.55)" }}>WIND 9 M/S</span>
        </div>
      </section>
    </div>
  );
}
