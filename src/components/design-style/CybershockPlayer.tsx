"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DESKTOP_IMAGE = "/generated/design-styles/y2k.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent-2)]" as const;

/* Y2K chrome discipline: the turn-of-millennium software-skin language IS the
   layout — brushed-chrome bevels, an LCD readout, a spectrum visualizer, and
   pill transport buttons over a holographic desktop. Metallic silver-blue with
   ice/pink/lime cyber glow keeps it Y2K, not chromecore hardware. */

const CHROME_FACE = "linear-gradient(180deg,#fdfeff 0%,#dce7f4 42%,#aebfd6 100%)";
const CHROME_RAIL = "linear-gradient(180deg,#eaf1fb,#b9c9e0 55%,#8fa3c0)";
const CHROME_INSET = "inset 0 1px 0 #fff, inset 0 -1px 0 rgb(24 35 61 / 0.28), 0 1px 2px rgb(24 35 61 / 0.25)";
const LCD_BG = "linear-gradient(180deg,#0c1730,#122448)";

const TITLE: CSSProperties = { fontFamily: "var(--st-font-display)" };

type TrackId = "chrome" | "bug" | "holo" | "dialup" | "kandy";

type Track = {
  readonly id: TrackId;
  readonly title: string;
  readonly artist: string;
  readonly time: string;
  readonly kbps: string;
  readonly bars: readonly number[];
};

const TRACKS: readonly Track[] = [
  { id: "chrome", title: "Chrome Hearts", artist: "Neptune 2000", time: "3:42", kbps: "192", bars: [40, 72, 55, 88, 63, 95, 48, 80, 60, 90, 52, 76, 44, 84] },
  { id: "bug", title: "Millennium Bug", artist: "DJ Firewall", time: "4:15", kbps: "160", bars: [64, 44, 92, 58, 70, 40, 86, 52, 96, 60, 48, 82, 56, 74] },
  { id: "holo", title: "Holo Dreams", artist: "Cybelle", time: "3:08", kbps: "192", bars: [30, 52, 66, 48, 78, 62, 90, 70, 84, 56, 68, 46, 60, 38] },
  { id: "dialup", title: "Dial-Up Angel", artist: "Modem Kids", time: "5:01", kbps: "128", bars: [88, 60, 74, 96, 52, 80, 44, 68, 90, 56, 78, 50, 84, 62] },
  { id: "kandy", title: "Y2Kandy", artist: "Bubblewrap", time: "2:55", kbps: "224", bars: [50, 84, 62, 40, 92, 58, 76, 48, 88, 66, 54, 96, 46, 80] },
];

const BAR_COLORS = ["var(--sample-accent)", "var(--sample-accent-2)", "var(--sample-accent-3)"] as const;

function WinButton({ glyph }: { readonly glyph: string }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-3 w-3 place-items-center rounded-[2px] text-[6px] font-black leading-none text-[var(--sample-text)]"
      style={{ backgroundImage: CHROME_FACE, boxShadow: CHROME_INSET }}
    >
      {glyph}
    </span>
  );
}

function TransportButton({ glyph, active = false, big = false, compact }: { readonly glyph: string; readonly active?: boolean; readonly big?: boolean; readonly compact: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn("grid place-items-center rounded-full font-black leading-none", big ? (compact ? "h-6 w-6 text-[10px]" : "h-7 w-7 text-[12px]") : compact ? "h-5 w-5 text-[8px]" : "h-6 w-6 text-[10px]")}
      style={{
        backgroundImage: active ? "linear-gradient(180deg,#fff,var(--sample-accent-2))" : CHROME_FACE,
        color: active ? "#fff" : "var(--sample-text)",
        boxShadow: active ? "inset 0 1px 0 #fff, 0 0 10px var(--sample-accent-2), 0 1px 2px rgb(24 35 61 / 0.3)" : CHROME_INSET,
      }}
    >
      {glyph}
    </span>
  );
}

export function CybershockPlayer({ compact = false }: { readonly compact?: boolean }) {
  const [selectedId, setSelectedId] = useState<TrackId>("chrome");
  const selectedIndex = Math.max(0, TRACKS.findIndex((track) => track.id === selectedId));
  const selected = TRACKS[selectedIndex] ?? TRACKS[0];

  return (
    <div className={cn("relative flex h-full min-h-0 flex-col", compact ? "p-1" : "p-2")}>
      {/* holographic desktop */}
      <span aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${DESKTOP_IMAGE}')` }} />
      <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 12px 12px, rgb(255 255 255 / 0.5) 0 1px, transparent 1.6px)", backgroundSize: "26px 26px", opacity: 0.35 }} />

      {/* chrome application window */}
      <div
        className="relative m-auto flex w-full min-h-0 flex-col overflow-hidden rounded-[10px]"
        style={{ backgroundImage: CHROME_RAIL, boxShadow: "inset 0 1px 0 #fff, inset 0 0 0 1px rgb(255 255 255 / 0.6), 0 12px 30px rgb(24 35 61 / 0.4)", border: "1px solid var(--sample-border)", height: "100%" }}
      >
        {/* title bar */}
        <div
          className="flex items-center gap-1.5 border-b border-[var(--sample-border)] px-1.5 py-1"
          style={{ backgroundImage: "linear-gradient(180deg,#eaf3ff,#8fb4e8 55%,#5f86c4)" }}
        >
          <span aria-hidden="true" className="grid h-4 w-4 shrink-0 place-items-center rounded-full" style={{ backgroundImage: "radial-gradient(circle at 35% 30%, #fff, var(--sample-accent) 55%, var(--sample-accent-2))", boxShadow: "inset 0 1px 0 #fff, 0 0 6px var(--sample-accent-2)" }}>
            <span className="block h-1.5 w-1.5 rounded-full bg-white/80" />
          </span>
          <span
            className={cn("font-display font-black uppercase leading-none tracking-[0.08em]", compact ? "text-[10px]" : "text-[13px]")}
            style={{ ...TITLE, color: "#f5faff", textShadow: "0 1px 0 #4b6ea6, 0 0 6px rgb(113 213 255 / 0.9)" }}
          >
            CYBERSHOCK
          </span>
          <span className={cn("whitespace-nowrap rounded-[3px] bg-white/25 px-1 py-0.5 text-[6px] font-black uppercase tracking-[0.1em] text-white", compact ? "hidden" : "hidden sm:inline-block")}>v2.0 skin</span>
          <span className="ml-auto flex items-center gap-1">
            <WinButton glyph="_" />
            <WinButton glyph="□" />
            <WinButton glyph="×" />
          </span>
        </div>

        {/* body */}
        <div className={cn("flex min-h-0 flex-1 flex-col", compact ? "gap-1.5 p-1.5" : "gap-2 p-2")}>
          {/* LCD now-playing + spectrum visualizer */}
          <div aria-label="now playing" className="rounded-[6px] p-1.5" style={{ backgroundImage: LCD_BG, boxShadow: "inset 0 0 0 1px rgb(113 213 255 / 0.4), inset 0 2px 8px rgb(0 0 0 / 0.6)" }}>
            <div className="flex items-baseline gap-2">
              <span className={cn("shrink-0 font-black tabular-nums", compact ? "text-[7px]" : "text-[8px]")} style={{ color: "var(--sample-accent-3)", textShadow: "0 0 6px var(--sample-accent-3)" }}>
                {String(selectedIndex + 1).padStart(2, "0")}.
              </span>
              <span className={cn("min-w-0 flex-1 truncate font-black uppercase tracking-[0.04em]", compact ? "text-[9px]" : "text-[11px]")} style={{ color: "var(--sample-accent)", textShadow: "0 0 8px var(--sample-accent)" }}>
                {selected.title}
              </span>
              <span className={cn("shrink-0 tabular-nums", compact ? "text-[7px]" : "text-[8px]")} style={{ color: "var(--sample-accent-2)", textShadow: "0 0 6px var(--sample-accent-2)" }}>
                {selected.time}
              </span>
            </div>
            <div className={cn("mt-0.5 flex items-center gap-2", compact ? "text-[6px]" : "text-[7px]")}>
              <span className="min-w-0 truncate font-bold uppercase tracking-[0.1em]" style={{ color: "rgb(179 210 245 / 0.85)" }}>{selected.artist}</span>
              <span className="ml-auto shrink-0 tabular-nums font-bold" style={{ color: "rgb(113 213 255 / 0.8)" }}>{selected.kbps} kbps · 44 khz · stereo</span>
            </div>
            {/* spectrum visualizer */}
            <div aria-label="spectrum visualizer" className={cn("mt-1 flex items-end gap-[2px]", compact ? "h-5" : "h-7")} role="img">
              {selected.bars.map((height, index) => (
                <span
                  key={index}
                  className="min-w-0 flex-1 rounded-t-[1px]"
                  style={{ height: `${height}%`, backgroundColor: BAR_COLORS[index % 3], boxShadow: `0 0 5px ${BAR_COLORS[index % 3]}` }}
                />
              ))}
            </div>
          </div>

          {/* transport controls */}
          <div aria-label="transport controls" className="flex items-center gap-2 rounded-[6px] px-2 py-1" style={{ backgroundImage: CHROME_FACE, boxShadow: CHROME_INSET }}>
            <div className="flex items-center gap-1">
              <TransportButton compact={compact} glyph="◄◄" />
              <TransportButton active big compact={compact} glyph="►" />
              <TransportButton compact={compact} glyph="■" />
              <TransportButton compact={compact} glyph="►►" />
              <TransportButton compact={compact} glyph="⏏" />
            </div>
            <div className="ml-1 flex min-w-0 flex-1 items-center gap-1.5">
              <span className={cn("shrink-0 font-black uppercase tracking-[0.08em] text-[var(--sample-text)]", compact ? "text-[6px]" : "text-[7px]")}>vol</span>
              <span className="relative h-1.5 min-w-0 flex-1 rounded-full" style={{ backgroundImage: "linear-gradient(180deg,#9fb3cc,#c9d8ec)", boxShadow: "inset 0 1px 2px rgb(24 35 61 / 0.35)" }}>
                <span className="absolute inset-y-0 left-0 w-[72%] rounded-full" style={{ backgroundImage: "linear-gradient(90deg,var(--sample-accent),var(--sample-accent-2))" }} />
                <span className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full" style={{ left: "68%", backgroundImage: CHROME_FACE, boxShadow: CHROME_INSET }} />
              </span>
            </div>
          </div>

          {/* playlist + equalizer/skin */}
          <div className={cn("grid min-h-0 flex-1 gap-2", compact ? "grid-cols-[1fr]" : "grid-cols-1 sm:grid-cols-[1.35fr_0.65fr]")}>
            {/* playlist */}
            <div aria-label="playlist" className="flex min-h-0 flex-col overflow-hidden rounded-[6px]" style={{ backgroundImage: LCD_BG, boxShadow: "inset 0 0 0 1px rgb(113 213 255 / 0.3)" }}>
              <div className="flex items-center justify-between border-b border-[rgb(113_213_255_/_0.28)] px-1.5 py-0.5">
                <span className={cn("font-black uppercase tracking-[0.14em]", compact ? "text-[6px]" : "text-[7px]")} style={{ color: "var(--sample-accent)" }}>playlist</span>
                <span className={cn("tabular-nums font-bold", compact ? "text-[6px]" : "text-[7px]")} style={{ color: "rgb(179 210 245 / 0.7)" }}>track {selectedIndex + 1} of {TRACKS.length}</span>
              </div>
              <div className="min-h-0 flex-1">
                {(compact ? TRACKS.slice(0, 3) : TRACKS).map((track, index) => {
                  const active = track.id === selectedId;
                  return (
                    <button
                      aria-pressed={active}
                      className={cn("flex w-full min-w-0 items-baseline gap-1.5 px-1.5 text-left", FOCUS, compact ? "py-0.5" : "py-[3px]")}
                      key={track.id}
                      onClick={() => setSelectedId(track.id)}
                      style={active ? { backgroundImage: "linear-gradient(90deg, rgb(113 213 255 / 0.28), rgb(255 142 231 / 0.2))" } : undefined}
                      type="button"
                    >
                      <span className={cn("shrink-0 tabular-nums font-bold", compact ? "text-[6.5px]" : "text-[7.5px]")} style={{ color: active ? "var(--sample-accent-3)" : "rgb(179 210 245 / 0.6)" }}>{index + 1}.</span>
                      <span className={cn("min-w-0 flex-1 truncate font-bold uppercase tracking-[0.03em]", compact ? "text-[7px]" : "text-[8.5px]")} style={{ color: active ? "var(--sample-accent)" : "rgb(214 230 248 / 0.92)", textShadow: active ? "0 0 6px var(--sample-accent)" : undefined }}>
                        {track.title}
                        <span className={cn("font-medium normal-case", compact ? "hidden" : "")} style={{ color: "rgb(179 210 245 / 0.6)" }}> — {track.artist}</span>
                      </span>
                      <span className={cn("shrink-0 tabular-nums", compact ? "text-[6.5px]" : "text-[7.5px]")} style={{ color: "rgb(179 210 245 / 0.7)" }}>{track.time}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* equalizer + skin swatches */}
            <div className={cn("min-h-0 flex-col gap-2", compact ? "hidden" : "hidden sm:flex")}>
              <div className="flex flex-1 flex-col rounded-[6px] p-1.5" style={{ backgroundImage: CHROME_FACE, boxShadow: CHROME_INSET }}>
                <span className="text-[7px] font-black uppercase tracking-[0.1em] text-[var(--sample-text)]">equalizer</span>
                <div className="mt-1 flex flex-1 items-end justify-between gap-1">
                  {[62, 80, 48, 90, 56, 72, 40].map((level, index) => (
                    <span key={index} className="relative flex h-full w-full flex-col justify-end">
                      <span className="w-full rounded-t-[2px]" style={{ height: `${level}%`, backgroundImage: `linear-gradient(180deg, var(--sample-accent-2), var(--sample-accent))` }} />
                      <span className="mt-[1px] h-[3px] w-full rounded-full" style={{ backgroundImage: CHROME_FACE, boxShadow: CHROME_INSET }} />
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[6px] p-1.5" style={{ backgroundImage: CHROME_FACE, boxShadow: CHROME_INSET }}>
                <span className="text-[7px] font-black uppercase tracking-[0.1em] text-[var(--sample-text)]">skins</span>
                <div className="mt-1 flex gap-1">
                  {["var(--sample-accent)", "var(--sample-accent-2)", "var(--sample-accent-3)", "#cfe0f4"].map((color, index) => (
                    <span key={index} className="h-4 w-4 rounded-full border border-white" style={{ backgroundImage: `radial-gradient(circle at 35% 30%, #fff, ${color})`, boxShadow: index === 0 ? "0 0 0 1.5px var(--sample-accent-2), 0 0 8px var(--sample-accent-2)" : "inset 0 1px 0 #fff, 0 1px 2px rgb(24 35 61 / 0.25)" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* status bar */}
        <div className="flex items-center gap-2 border-t border-[var(--sample-border)] px-2 py-0.5" style={{ backgroundImage: CHROME_RAIL }}>
          <span className={cn("font-bold uppercase tracking-[0.08em] text-[var(--sample-text)]", compact ? "text-[6px]" : "text-[7px]")}>▶ playing</span>
          <span className={cn("tabular-nums text-[var(--sample-muted)]", compact ? "hidden" : "text-[7px]")}>{selected.kbps} kbps · 44 khz · stereo · buffered 100%</span>
          <span className={cn("ml-auto shrink-0 whitespace-nowrap rounded-[3px] px-1.5 py-0.5 font-black uppercase tracking-[0.08em] text-white", compact ? "text-[6px]" : "text-[7px]")} style={{ backgroundImage: "linear-gradient(180deg,var(--sample-accent-3),#7fbf2e)", boxShadow: "inset 0 1px 0 #fff" }}>online 27</span>
        </div>
      </div>
    </div>
  );
}
