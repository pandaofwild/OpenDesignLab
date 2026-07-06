"use client";

import { useState, useRef, useCallback, useEffect, type CSSProperties } from "react";
import type { DesignStyle } from "@/data/designStyles";
import { cn } from "@/lib/utils";
import {
  sampleVariables,
  GRAIN_URI,
  GeneratedStyleImageSurface,
} from "./DesignStyleSampleRenderer";

type Props = {
  className?: string;
  compact?: boolean;
  style: DesignStyle;
};

/* ── GlitchHeading: animated RGB-channel-split title ────────────────── */
function GlitchHeading({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span
        aria-hidden="true"
        className="glitch-sample-ch-cyan absolute inset-0 text-[var(--sample-accent)] mix-blend-screen"
        style={{ clipPath: "inset(0 0 52% 0)" }}
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="glitch-sample-ch-magenta absolute inset-0 text-[var(--sample-accent-2)] mix-blend-screen"
        style={{ clipPath: "inset(50% 0 0 0)" }}
      >
        {text}
      </span>
      <span className="relative text-[var(--sample-text)]">{text}</span>
    </span>
  );
}

/* ── WaveformBars: simulated bitrate readout ─────────────────────────── */
const BAR_HEIGHTS = [28, 48, 36, 62, 44, 70, 32, 55, 40, 66, 38, 50, 42, 60, 34];

function WaveformBars({ compact }: { compact: boolean }) {
  const count = compact ? 8 : 15;
  return (
    <div aria-hidden="true" className="flex items-end gap-[2px]" style={{ height: compact ? 24 : 36 }}>
      {BAR_HEIGHTS.slice(0, count).map((h, i) => (
        <span
          className="glitch-sample-bar inline-block w-[3px] shrink-0"
          key={i}
          style={{
            height: `${h}%`,
            background: i % 3 === 0 ? "var(--sample-accent)" : i % 3 === 1 ? "var(--sample-accent-2)" : "var(--sample-accent-3)",
            opacity: 0.75 + (i % 4) * 0.06,
          }}
        />
      ))}
    </div>
  );
}

/* ── HexMarquee: scrolling hex/ASCII stream ──────────────────────────── */
const HEX_STREAM =
  "4E45 5420 4152 5420 4552 524F 5220 5355 5246 4143 4520 2F2F 2062 7566 6665 7220 7465 6172 202F 2F20 6368 726F 6D61 2070 6163 6B65 7420 6C6F 7374 202F 2F20 636F 6465 6320 6661 756C 7420 202F 2F20 6C75 6D61 2070 6C61 6E65 206D 6973 7265 6164";

function HexMarquee({ compact }: { compact: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "glitch-sample-marquee-track relative overflow-hidden border-t border-[var(--sample-border)] font-mono text-[7px] uppercase text-[var(--sample-accent)]",
        compact ? "h-4" : "h-5",
      )}
    >
      <span className="glitch-sample-marquee-inner absolute whitespace-nowrap leading-[1.5]">
        {HEX_STREAM} {"//"} {HEX_STREAM}
      </span>
    </div>
  );
}

/* ── MacroBlocks: corrupted video grid ──────────────────────────────── */
const MACRO_COUNT = 18;
const MACRO_BLOCKS = Array.from({ length: MACRO_COUNT }, (_, i) => i);

function MacroBlockGrid() {
  return (
    <div className="relative grid h-full grid-cols-6 grid-rows-3 gap-1 p-2">
      {MACRO_BLOCKS.map((item) => (
        <span
          aria-hidden="true"
          className={cn(
            "glitch-sample-block border border-[var(--sample-border)]",
            item % 5 === 0
              ? "bg-[var(--sample-accent)]"
              : item % 4 === 0
                ? "bg-[var(--sample-accent-2)]"
                : "bg-[rgb(var(--st-text-rgb)/0.09)]",
          )}
          key={item}
          style={{
            opacity: item % 5 === 0 ? 0.55 : item % 4 === 0 ? 0.42 : 0.8,
            transform: `translate(calc(var(--glitch-intensity) * ${item % 3 === 0 ? -5 : item % 3 === 1 ? 4 : 1}px), ${item % 4 === 0 ? 3 : 0}px)`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────── */
export function GlitchArtInterface({ className, compact = false, style }: Props) {
  const [intensity, setIntensity] = useState(0);
  const [burst, setBurst] = useState(false);
  const burstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (burstTimer.current) clearTimeout(burstTimer.current);
    };
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (compact) return;
      const r = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      setIntensity(Math.min(1, Math.hypot(x - 0.5, y - 0.5) * 2));
    },
    [compact],
  );

  const onPointerLeave = useCallback(() => {
    if (!compact) setIntensity(0);
  }, [compact]);

  const triggerCorrupt = useCallback(() => {
    setBurst(true);
    if (burstTimer.current) clearTimeout(burstTimer.current);
    burstTimer.current = setTimeout(() => setBurst(false), 800);
  }, []);

  const frameStyle: CSSProperties = {
    ...sampleVariables(style),
    "--glitch-intensity": String(burst ? 1 : 0.18 + intensity * 0.82),
    "--glitch-burst": burst ? "1" : "0",
  } as CSSProperties;

  const faultRows: Array<[string, string, string]> = [
    ["checksum drift", "0x4F2A", style.palette.accent],
    ["codec fault", "H264-B", style.palette.accent2],
    ["buffer tear", "12ms", style.palette.accent3],
  ];

  return (
    <div
      className={cn(
        "glitch-sample st-border relative h-full overflow-hidden bg-[var(--sample-base)] font-mono text-[var(--sample-text)]",
        compact ? "min-h-[210px] p-3" : "st-pad min-h-[540px]",
        className,
      )}
      data-glitch-burst={burst ? "on" : "off"}
      onPointerLeave={compact ? undefined : onPointerLeave}
      onPointerMove={compact ? undefined : onPointerMove}
      style={frameStyle}
    >
      {/* ── Layer 0: base image + channel-split overlays ── */}
      <GeneratedStyleImageSurface
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        overlay="dark"
        slug="glitch-art"
      />
      {/* cyan channel offset */}
      <span
        aria-hidden="true"
        className="glitch-sample-rgb-cyan pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage: `url('/generated/design-styles/glitch-art.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
          filter: "saturate(3) hue-rotate(150deg)",
          transform: "translateX(calc(var(--glitch-intensity) * 7px))",
        }}
      />
      {/* magenta channel offset */}
      <span
        aria-hidden="true"
        className="glitch-sample-rgb-magenta pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage: `url('/generated/design-styles/glitch-art.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.45,
          filter: "saturate(3) hue-rotate(300deg)",
          transform: "translateX(calc(var(--glitch-intensity) * -5px))",
        }}
      />
      {/* dark tint to keep text legible */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgb(var(--st-base-rgb) / 0.72)" }}
      />

      {/* ── Layer 1: scanline overlay ── */}
      <span
        aria-hidden="true"
        className="glitch-sample-scan pointer-events-none absolute inset-0 z-10 opacity-25"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgb(0 0 0 / 0.7) 2px 3px)" }}
      />

      {/* ── Layer 2: grid noise ── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(var(--st-accent-rgb) / 0.18) 0 1px, transparent 1px), linear-gradient(180deg, rgb(var(--st-accent-2-rgb) / 0.14) 0 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* ── Layer 3: horizontal slice glitch bands ── */}
      <span
        aria-hidden="true"
        className="glitch-sample-slice pointer-events-none absolute left-0 z-10 h-2 w-3/4 bg-[var(--sample-accent)] opacity-50 mix-blend-screen"
        style={{ top: "22%", transform: "translateX(calc(var(--glitch-intensity) * -22px))" }}
      />
      <span
        aria-hidden="true"
        className="glitch-sample-slice-2 pointer-events-none absolute right-0 z-10 h-1.5 w-1/2 bg-[var(--sample-accent-2)] opacity-50 mix-blend-screen"
        style={{ top: "48%", transform: "translateX(calc(var(--glitch-intensity) * 18px))" }}
      />
      <span
        aria-hidden="true"
        className="glitch-sample-slice-3 pointer-events-none absolute left-[10%] z-10 h-5 w-[60%] bg-[var(--sample-accent-3)] opacity-30 mix-blend-screen"
        style={{ top: "72%", transform: "translateX(calc(var(--glitch-intensity) * -12px))" }}
      />

      {/* ── Layer 4: grain ── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.08] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "120px 120px" }}
      />

      {/* ── Flicker overlay ── */}
      <span
        aria-hidden="true"
        className="glitch-sample-flicker pointer-events-none absolute inset-0 z-10 bg-[var(--sample-accent)] opacity-[0.02] mix-blend-screen"
      />

      {/* ── Foreground content ── */}
      <div className="relative z-20 flex h-full flex-col">
        {/* Header bar */}
        <div className="flex items-center gap-3 border-b border-[var(--sample-border)] pb-2 text-[10px] text-[var(--sample-muted)]">
          <span className="font-bold uppercase tracking-[0em] text-[var(--sample-text)]">
            NET ART ERROR SURFACE
          </span>
          <nav className={cn("items-center gap-3 uppercase", compact ? "hidden" : "flex")}>
            <span>SIGNAL DAMAGE</span>
            <span>checksum drift</span>
            <span>macroblock map</span>
          </nav>
          {!compact && (
            <button
              className="glitch-sample-burst-btn ml-auto border border-[var(--sample-accent)] bg-[rgb(var(--st-base-rgb)/0.6)] px-2.5 py-1 text-[9px] font-bold uppercase text-[var(--sample-accent)] transition-opacity hover:opacity-80 active:opacity-60"
              onClick={triggerCorrupt}
              type="button"
            >
              ▚ CORRUPT SIGNAL
            </button>
          )}
          {compact && (
            <span className="ml-auto border border-[var(--sample-accent)] px-2.5 py-1 font-bold uppercase text-[var(--sample-accent)]">
              capture 03
            </span>
          )}
        </div>

        {/* Main grid */}
        <div
          className={cn(
            "grid min-h-0 flex-1 gap-3 pt-3",
            compact
              ? "grid-cols-[0.95fr_1.05fr]"
              : "grid-cols-1 md:grid-cols-[0.94fr_1.06fr] md:gap-4",
          )}
        >
          {/* Left: title + HUD readout */}
          <div className="flex min-w-0 flex-col justify-center">
            <span className="w-max border border-[var(--sample-accent-2)] px-2 py-0.5 text-[9px] uppercase tracking-[0em] text-[var(--sample-accent-2)]">
              frame dropped {"//"} 00:13:42
            </span>
            <h3
              className={cn(
                "mt-3 font-display uppercase leading-[0.82]",
                compact ? "text-3xl" : "text-6xl md:text-[4.25rem]",
              )}
              style={{
                fontFamily: "var(--st-font-display)",
                fontWeight: "var(--st-weight-display)",
                letterSpacing: "0em",
              }}
            >
              <GlitchHeading text="SIGNAL" />
              <br />
              <GlitchHeading text="DAMAGE" />
            </h3>

            {!compact && (
              <p className="mt-4 max-w-[34ch] text-[12px] leading-5 text-[var(--sample-muted)]">
                Corrupted signal analysis for broken video frames, dropped packets, and decoded image residue.
              </p>
            )}

            {/* Fault readout rows */}
            <div
              className={cn(
                "mt-4 grid gap-1.5",
                compact ? "hidden" : "",
              )}
            >
              {faultRows.map(([label, value, color]) => (
                <div
                  className="flex items-center justify-between border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.6)] px-2.5 py-1.5 text-[9px] uppercase"
                  key={label}
                >
                  <span style={{ color }}>{label}</span>
                  <span className="font-bold text-[var(--sample-text)]">{value}</span>
                </div>
              ))}
            </div>

            {/* Waveform (compact only) */}
            {compact && (
              <div className="mt-2">
                <WaveformBars compact={compact} />
              </div>
            )}
          </div>

          {/* Right: macroblock panel */}
          <div className="relative min-h-0 overflow-hidden border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.55)]">
            <MacroBlockGrid />

            {/* Waveform in full mode */}
            {!compact && (
              <div className="absolute right-3 top-3">
                <WaveformBars compact={false} />
              </div>
            )}

            {/* Bottom status bar */}
            <div className="absolute bottom-2 left-2 right-2 border border-[var(--sample-accent)] bg-[rgb(var(--st-base-rgb)/0.82)] p-2 text-[9px] text-[var(--sample-text)]">
              <div className="flex items-center justify-between">
                <span className="text-[var(--sample-accent)]">macroblock map</span>
                <span className="text-[var(--sample-accent-2)]">bad sectors 18</span>
              </div>
              <div className="mt-1 h-1.5 bg-[rgb(var(--st-text-rgb)/0.12)]">
                <span className="block h-full w-[61%] bg-[var(--sample-accent-3)]" />
              </div>
              {!compact && (
                <p className="mt-1 text-[8px] text-[var(--sample-muted)]">
                  codec forensics rail {"//"} luma plane misread {"//"} chroma channel late
                </p>
              )}
            </div>

            {/* Scanline on panel */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgb(0 0 0 / 0.5) 2px 3px)" }}
            />
          </div>
        </div>

        {/* Footer: hex/ASCII marquee stream */}
        <div className="mt-3">
          <HexMarquee compact={compact} />
        </div>
      </div>
    </div>
  );
}
