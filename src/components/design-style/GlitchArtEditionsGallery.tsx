"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
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

/* ── UNSTABLE MEDIA — digital editions gallery for unstable moving image ──
 * Concept: a Feral-File-style platform selling glitch/datamosh video works.
 * The corruption lives in the artwork and its viewer; the platform chrome
 * stays quiet — dark panels, mono type, hairline dividers, real commerce UI
 * (player transport, collect panel, file integrity manifest, activity feed).
 * ---------------------------------------------------------------------- */

const ARTWORK_SRC = "/generated/design-styles/glitch-art.webp";
const DURATION = 461; // 07:41

const HAIRLINE = "border-[rgb(var(--st-text-rgb)/0.13)]";
const HAIRLINE_SOFT = "border-[rgb(var(--st-text-rgb)/0.07)]";

function formatClock(total: number) {
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function PlayIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg aria-hidden="true" fill="currentColor" height={9} viewBox="0 0 10 12" width={8}>
      <path d="M0 0h3.4v12H0zM6.6 0H10v12H6.6z" />
    </svg>
  ) : (
    <svg aria-hidden="true" fill="currentColor" height={9} viewBox="0 0 10 12" width={8}>
      <path d="M0 0l10 6-10 6z" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg aria-hidden="true" fill="none" height={10} stroke="currentColor" strokeWidth={1.4} viewBox="0 0 12 12" width={10}>
      <path d="M1 4V1h3M8 1h3v3M11 8v3H8M4 11H1V8" />
    </svg>
  );
}

const MANIFEST_ROWS: Array<[string, string, boolean]> = [
  ["checksum · sha-256", "9f2c 71aa … e4 1d", true],
  ["codec", "H.264 · 8-bit 4:2:0", false],
  ["container", "MP4 · 412 MB", false],
  ["resolution", "1920 × 1080 · 24 fps", false],
  ["artifact state", "macroblock residue preserved", true],
];

const ACTIVITY_ROWS: Array<[string, string, string]> = [
  ["ed. #13", "collected — voidcast_", "4 min"],
  ["ed. #12", "offer $2,150 — anon", "1 hr"],
  ["ed. #11", "collected — n_ull", "3 hr"],
];

const RELATED_WORKS = [
  {
    artist: "Jun Okabe",
    edition: "ed. 23/50",
    filter: "hue-rotate(38deg) saturate(1.3)",
    medium: "generative WebGL",
    position: "16% 34%",
    price: "$980",
    title: "Buffer Hymn",
  },
  {
    artist: "L. Marchetti",
    edition: "ed. 8/25",
    filter: "hue-rotate(-42deg) saturate(1.15)",
    medium: "corrupted JPEG seq.",
    position: "82% 58%",
    price: "$3,100",
    title: "Chroma Debt",
  },
  {
    artist: "N1L",
    edition: "ed. 41/60",
    filter: "saturate(0.4) contrast(1.15)",
    medium: "CRT capture · 4:3",
    position: "44% 82%",
    price: "$640",
    title: "Refresh Rate",
  },
];

const TICKER =
  "EXH 07 — SIGNAL LOSS · curated by R. Aldous · 12 works · 9 artists · closes in 04d 11h 22m — next: EXH 08 — PACKET GARDEN · opens 02 AUG · ";

export function GlitchArtEditionsGallery({ className, compact = false, style }: Props) {
  const [drift, setDrift] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(156);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setPlayhead((t) => (t + 1) % DURATION), 1000);
    return () => clearInterval(id);
  }, [playing]);

  const onStageMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    setDrift(Math.min(1, Math.abs(x - 0.5) * 2.4));
  }, []);

  const onStageLeave = useCallback(() => setDrift(0), []);

  const onSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    setPlayhead(Math.round(ratio * DURATION));
  }, []);

  const progress = playhead / DURATION;
  const buffered = Math.min(1, progress + 0.22);

  const artworkLayer: CSSProperties = {
    backgroundImage: `url('${ARTWORK_SRC}')`,
    backgroundPosition: "50% 42%",
    backgroundSize: "cover",
  };

  const playerBar = (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 z-10 flex items-center gap-2.5 border-t bg-[rgb(var(--st-base-rgb)/0.87)] backdrop-blur-sm",
        HAIRLINE,
        compact ? "px-2 py-1.5" : "px-2.5 py-2",
      )}
    >
      <button
        aria-label={playing ? "Pause artwork playback" : "Play artwork"}
        className="flex h-5 w-5 shrink-0 items-center justify-center border border-[rgb(var(--st-text-rgb)/0.22)] text-[var(--sample-text)] transition-colors hover:border-[var(--sample-accent)] hover:text-[var(--sample-accent)]"
        onClick={() => setPlaying((p) => !p)}
        type="button"
      >
        <PlayIcon paused={playing} />
      </button>
      <span className="shrink-0 text-[8px] tabular-nums text-[var(--sample-muted)]">
        <span className="text-[var(--sample-text)]">{formatClock(playhead)}</span> / {formatClock(DURATION)}
      </span>
      <div
        aria-label="Seek"
        className="relative h-5 min-w-0 flex-1 cursor-pointer"
        onClick={onSeek}
        role="presentation"
      >
        <span className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 bg-[rgb(var(--st-text-rgb)/0.13)]" />
        <span
          className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-[rgb(var(--st-text-rgb)/0.26)]"
          style={{ width: `${buffered * 100}%` }}
        />
        <span
          className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-[var(--sample-accent)]"
          style={{ width: `${progress * 100}%` }}
        />
        <span
          className="absolute top-1/2 h-[9px] w-[3px] -translate-y-1/2 bg-[var(--sample-accent)]"
          style={{ left: `calc(${progress * 100}% - 1px)` }}
        />
      </div>
      {!compact && (
        <span className="shrink-0 border border-[rgb(var(--st-text-rgb)/0.22)] px-1 py-px text-[7px] font-bold text-[var(--sample-muted)]">
          1080P
        </span>
      )}
      <span aria-hidden="true" className="shrink-0 text-[var(--sample-muted)]">
        <FullscreenIcon />
      </span>
    </div>
  );

  const stage = (
    <figure
      className={cn("relative min-h-0 flex-1 overflow-hidden border bg-black", HAIRLINE)}
      onPointerLeave={compact ? undefined : onStageLeave}
      onPointerMove={compact ? undefined : onStageMove}
    >
      <span aria-hidden="true" className="absolute inset-0" style={artworkLayer} />
      {/* rgb channel drift — the one loud move, on the artwork only */}
      <span
        aria-hidden="true"
        className="gg-drift-c absolute inset-0 mix-blend-screen"
        style={{
          ...artworkLayer,
          filter: "saturate(2.6) hue-rotate(140deg)",
          opacity: 0.4,
          transform: "translateX(calc(var(--gg-drift, 0) * 7px))",
        }}
      />
      <span
        aria-hidden="true"
        className="gg-drift-m absolute inset-0 mix-blend-screen"
        style={{
          ...artworkLayer,
          filter: "saturate(2.6) hue-rotate(305deg)",
          opacity: 0.32,
          transform: "translateX(calc(var(--gg-drift, 0) * -5px))",
        }}
      />
      {/* displaced scan rows — flash briefly while playing */}
      <span
        aria-hidden="true"
        className="gg-slice absolute left-0 h-[5px] w-[72%] opacity-0"
        style={{ ...artworkLayer, backgroundPosition: "38% 42%", top: "31%" }}
      />
      <span
        aria-hidden="true"
        className="gg-slice-2 absolute right-0 h-[3px] w-[54%] opacity-0"
        style={{ ...artworkLayer, backgroundPosition: "64% 40%", top: "58%" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgb(0 0 0 / 0.65) 2px 3px)" }}
      />
      {!compact && (
        <div className="absolute inset-x-2 top-2 z-10 flex items-start justify-between gap-2 text-[7px] uppercase">
          <span className={cn("border bg-[rgb(var(--st-base-rgb)/0.72)] px-1.5 py-0.5 text-[var(--sample-muted)]", HAIRLINE)}>
            EXH 07 · work 04 / 12
          </span>
          <span className={cn("flex items-center gap-1 border bg-[rgb(var(--st-base-rgb)/0.72)] px-1.5 py-0.5 text-[var(--sample-muted)]", HAIRLINE)}>
            <span aria-hidden="true" className="h-1 w-1 bg-[var(--sample-accent)]" />
            signal fx — rgb channel drift
          </span>
        </div>
      )}
      {playerBar}
    </figure>
  );

  const caption = (
    <div className="flex items-baseline justify-between gap-3 pt-2">
      <div className="min-w-0">
        <p className={cn("truncate font-bold text-[var(--sample-text)]", compact ? "text-[11px]" : "text-[12px]")}>
          Dropped Frames <span className="font-normal text-[var(--sample-muted)]">(2025)</span>
        </p>
        <p className="truncate text-[8px] uppercase text-[var(--sample-muted)]">
          Ada Vetra · single-channel video · datamosh — macroblock residue · 07:41
        </p>
      </div>
      {compact && (
        <span className="shrink-0 text-[9px] tabular-nums text-[var(--sample-accent)]">ed. 14/50 · $2,400</span>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "glitch-gallery st-border relative h-full overflow-hidden bg-[var(--sample-base)] font-mono text-[var(--sample-text)]",
        compact ? "min-h-[210px] p-3" : "st-pad min-h-[540px]",
        className,
      )}
      data-playing={playing ? "on" : "off"}
      style={{ ...sampleVariables(style), "--gg-drift": drift.toFixed(3) } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "130px 130px" }}
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* platform header */}
        <header className={cn("flex items-center gap-4 border-b", HAIRLINE, compact ? "pb-2" : "pb-2.5")}>
          <span className="gg-wordmark shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--sample-text)]">
            UNSTABLE MEDIA
          </span>
          {!compact && (
            <nav aria-label="Gallery sections" className="flex items-center gap-3 text-[9px] uppercase text-[var(--sample-muted)]">
              <span className="border-b border-[var(--sample-accent)] pb-px text-[var(--sample-text)]">Exhibitions</span>
              <span>Artists</span>
              <span>Editions</span>
              <span>Journal</span>
            </nav>
          )}
          <span
            className={cn(
              "ml-auto flex shrink-0 items-center gap-1.5 border px-2 py-1 text-[8px] uppercase text-[var(--sample-muted)]",
              HAIRLINE,
            )}
          >
            <span aria-hidden="true" className="gg-live h-1.5 w-1.5 rounded-full bg-[var(--sample-accent-2)]" />
            {compact ? "EXH 07 live" : "EXH 07 — Signal Loss · live now"}
          </span>
        </header>

        {compact ? (
          <>
            <div className="flex min-h-0 flex-1 flex-col pt-2.5">{stage}</div>
            {caption}
            <div className="mt-2 flex items-center gap-2">
              <span className="flex-1 cursor-pointer border border-[var(--sample-accent)] py-1 text-center text-[9px] font-bold uppercase text-[var(--sample-accent)] transition-colors hover:bg-[rgb(var(--st-accent-rgb)/0.12)]">
                Collect this edition
              </span>
              <span className="shrink-0 text-[7px] uppercase text-[var(--sample-muted)]">
                sha-256 verified <span className="text-[var(--sample-accent-3)]">✓</span>
              </span>
            </div>
          </>
        ) : (
          <>
            {/* viewing room: artwork viewer + commerce rail */}
            <div className="grid min-h-0 flex-1 grid-cols-[1.55fr_1fr] gap-4 pt-3">
              <div className="flex min-w-0 flex-col">
                {stage}
                {caption}
              </div>

              <div className="flex min-w-0 flex-col gap-2.5">
                <section className={cn("border bg-[rgb(var(--st-surface-rgb)/0.55)] p-3", HAIRLINE)}>
                  <div className="flex items-baseline justify-between text-[8px] uppercase text-[var(--sample-muted)]">
                    <span>edition 14 of 50</span>
                    <span className="text-[var(--sample-accent-3)]">36 available</span>
                  </div>
                  <p className="mt-1.5 text-xl font-bold tabular-nums leading-none text-[var(--sample-text)]">
                    $2,400{" "}
                    <span className="text-[8px] font-normal uppercase text-[var(--sample-muted)]">
                      usd · incl. preservation files
                    </span>
                  </p>
                  <span className="mt-2.5 block w-full cursor-pointer border border-[var(--sample-accent)] py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--sample-accent)] transition-colors hover:bg-[rgb(var(--st-accent-rgb)/0.12)]">
                    Collect this edition
                  </span>
                  <p className="mt-1.5 text-center text-[8px] text-[var(--sample-muted)] underline decoration-dotted underline-offset-2">
                    or place an offer
                  </p>
                </section>

                <section className={cn("border p-3", HAIRLINE)}>
                  <h4 className="text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--sample-muted)]">
                    file integrity manifest
                  </h4>
                  <dl className="mt-1">
                    {MANIFEST_ROWS.map(([label, value, verified]) => (
                      <div
                        className={cn("flex items-baseline justify-between gap-2 border-b py-[5px] text-[9px] last:border-b-0", HAIRLINE_SOFT)}
                        key={label}
                      >
                        <dt className="shrink-0 text-[var(--sample-muted)]">{label}</dt>
                        <dd className={cn("truncate tabular-nums", verified ? "text-[var(--sample-accent-3)]" : "text-[var(--sample-text)]")}>
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>

                <section className={cn("flex min-h-0 flex-1 flex-col border p-3", HAIRLINE)}>
                  <h4 className="text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--sample-muted)]">
                    edition activity
                  </h4>
                  <ul className="mt-1">
                    {ACTIVITY_ROWS.map(([edition, event, when]) => (
                      <li
                        className={cn("flex items-baseline justify-between gap-2 border-b py-[5px] text-[9px] last:border-b-0", HAIRLINE_SOFT)}
                        key={edition}
                      >
                        <span className="min-w-0 truncate">
                          <span className="text-[var(--sample-accent)]">{edition}</span>{" "}
                          <span className="text-[var(--sample-text)]">{event}</span>
                        </span>
                        <span className="shrink-0 text-[var(--sample-muted)]">{when}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            {/* rest of the exhibition */}
            <div className={cn("mt-3 border-t pt-2.5", HAIRLINE)}>
              <div className="flex items-baseline justify-between text-[8px] uppercase">
                <span className="text-[var(--sample-muted)]">more from EXH 07 — Signal Loss</span>
                <span className="text-[var(--sample-accent)]">all 12 works →</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2.5">
                {RELATED_WORKS.map((work) => (
                  <article className={cn("min-w-0 border bg-[rgb(var(--st-surface-rgb)/0.4)]", HAIRLINE)} key={work.title}>
                    <GeneratedStyleImageSurface
                      className="h-14 w-full"
                      overlay="none"
                      position={work.position}
                      slug="glitch-art"
                      style={{ filter: work.filter }}
                    />
                    <div className="p-2">
                      <p className="truncate text-[10px] font-bold text-[var(--sample-text)]">{work.title}</p>
                      <p className="truncate text-[7px] uppercase text-[var(--sample-muted)]">
                        {work.artist} · {work.medium}
                      </p>
                      <div className="mt-1 flex items-baseline justify-between text-[8px]">
                        <span className="text-[var(--sample-muted)]">{work.edition}</span>
                        <span className="tabular-nums text-[var(--sample-accent)]">{work.price}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* exhibition ticker */}
            <div className={cn("mt-2.5 h-5 overflow-hidden border-t", HAIRLINE)}>
              <span className="gg-ticker inline-block whitespace-nowrap pt-[5px] text-[8px] uppercase tracking-[0.1em] text-[var(--sample-muted)]">
                {TICKER}
                {TICKER}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
