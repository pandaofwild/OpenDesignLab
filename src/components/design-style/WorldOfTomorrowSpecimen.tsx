"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const POSTER_IMAGE = "/generated/design-styles/retro-futurism.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent)]" as const;

const DISPLAY: CSSProperties = { fontFamily: "var(--st-font-display)" };

/* Retro-futurism specimen: instead of a product site, the Space Age visual
   vocabulary itself is the layout — a poster masthead, an exhibit viewer that
   enlarges a selected motif, a motif index of crafted atomic-age glyphs, and a
   named Space Age palette strip. Cream poster base, coral/teal/mustard, navy ink. */

type MotifId = "atomic" | "starburst" | "boomerang" | "saucer" | "rocket";

type Motif = {
  readonly id: MotifId;
  readonly name: string;
  readonly descriptor: string;
  readonly plate: string;
};

const MOTIFS: readonly Motif[] = [
  { id: "atomic", name: "Atomic Orbit", descriptor: "Electrons circling a nucleus — the age of the atom.", plate: "01" },
  { id: "starburst", name: "Starburst", descriptor: "Radiating rays of the optimistic tomorrow-sun.", plate: "02" },
  { id: "boomerang", name: "Boomerang", descriptor: "Googie parabola of mid-century motion.", plate: "03" },
  { id: "saucer", name: "Flying Saucer", descriptor: "The friendly visitor from the space age.", plate: "04" },
  { id: "rocket", name: "Rocket", descriptor: "Finned silver ship bound for the planets.", plate: "05" },
];

const STARBURST_POINTS = Array.from({ length: 24 }, (_, index) => {
  const radius = index % 2 === 0 ? 48 : 18;
  const angle = (Math.PI * index) / 12;
  return `${(50 + radius * Math.sin(angle)).toFixed(1)},${(50 - radius * Math.cos(angle)).toFixed(1)}`;
}).join(" ");

function MotifGlyph({ id, className, tone = "screen" }: { readonly id: MotifId; readonly className?: string; readonly tone?: "screen" | "chip" }) {
  const line = tone === "screen" ? "var(--sample-accent-2)" : "var(--sample-text)";
  const hot = "var(--sample-accent)";
  const gold = "var(--sample-accent-3)";
  const pale = tone === "screen" ? "var(--sample-surface)" : "var(--sample-surface)";

  if (id === "atomic") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 100 100">
        <g fill="none" stroke={line} strokeWidth="2.4">
          <ellipse cx="50" cy="50" rx="46" ry="17" />
          <ellipse cx="50" cy="50" rx="46" ry="17" transform="rotate(60 50 50)" />
          <ellipse cx="50" cy="50" rx="46" ry="17" transform="rotate(120 50 50)" />
        </g>
        <circle cx="96" cy="50" r="3.6" fill={gold} />
        <circle cx="27" cy="90" r="3.6" fill={gold} />
        <circle cx="27" cy="10" r="3.6" fill={gold} />
        <circle cx="50" cy="50" r="8" fill={hot} />
      </svg>
    );
  }
  if (id === "starburst") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 100 100">
        <polygon points={STARBURST_POINTS} fill={gold} stroke={line} strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="10" fill={hot} />
        <circle cx="50" cy="50" r="4" fill={pale} />
      </svg>
    );
  }
  if (id === "boomerang") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 100 100">
        <path
          d="M14 30 Q20 22 30 26 L54 40 Q62 45 70 40 L86 30 Q92 27 90 35 Q84 58 60 70 Q52 74 44 70 Q22 58 12 38 Q10 30 14 30 Z"
          fill={line}
          stroke={tone === "screen" ? "var(--sample-surface)" : "var(--sample-text)"}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="52" r="4.5" fill={gold} />
      </svg>
    );
  }
  if (id === "saucer") {
    return (
      <svg aria-hidden="true" className={className} viewBox="0 0 100 100">
        <ellipse cx="50" cy="62" rx="45" ry="13" fill={line} stroke={tone === "screen" ? "var(--sample-surface)" : "var(--sample-text)"} strokeWidth="1.6" />
        <path d="M28 58 A24 20 0 0 1 72 58 Z" fill={pale} stroke={tone === "screen" ? "var(--sample-surface)" : "var(--sample-text)"} strokeWidth="1.6" />
        <circle cx="50" cy="44" r="5.5" fill={hot} />
        <circle cx="34" cy="66" r="3" fill={gold} />
        <circle cx="50" cy="68" r="3" fill={gold} />
        <circle cx="66" cy="66" r="3" fill={gold} />
      </svg>
    );
  }
  // rocket
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 100 100">
      <path d="M50 6 Q64 26 64 58 L36 58 Q36 26 50 6 Z" fill={pale} stroke={tone === "screen" ? "var(--sample-surface)" : "var(--sample-text)"} strokeWidth="1.8" />
      <path d="M36 52 L20 76 L36 68 Z" fill={hot} />
      <path d="M64 52 L80 76 L64 68 Z" fill={hot} />
      <circle cx="50" cy="30" r="5" fill={line} />
      <circle cx="50" cy="46" r="3.5" fill={gold} />
      <path d="M42 62 Q50 92 58 62 Z" fill={gold} opacity="0.9" />
    </svg>
  );
}

const PALETTE: readonly (readonly [string, string])[] = [
  ["Cream", "var(--sample-base)"],
  ["Coral", "var(--sample-accent)"],
  ["Turquoise", "var(--sample-accent-2)"],
  ["Mustard", "var(--sample-accent-3)"],
  ["Navy", "var(--sample-text)"],
];

export function WorldOfTomorrowSpecimen({ compact = false }: { readonly compact?: boolean }) {
  const [selectedId, setSelectedId] = useState<MotifId>("atomic");
  const selected = MOTIFS.find((motif) => motif.id === selectedId) ?? MOTIFS[0];

  return (
    <div className="relative flex h-full min-h-0 flex-col text-[var(--sample-text)]">
      {/* faint orbit-ring backdrop */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -right-16 -top-20 h-56 w-56 rounded-full border border-[rgb(var(--st-accent-2-rgb)/0.35)]" />
        <span className="absolute -right-6 -top-10 h-40 w-40 rounded-full border border-[rgb(var(--st-accent-2-rgb)/0.28)]" />
      </span>

      <div className="relative flex h-full min-h-0 flex-col gap-2">
        {/* ── poster masthead ── */}
        <header aria-label="WORLD OF TOMORROW" className="flex min-w-0 items-center gap-2 border-b-2 border-[var(--sample-border)] pb-1.5">
          <MotifGlyph className={cn("shrink-0", compact ? "h-7 w-7" : "h-9 w-9")} id="starburst" tone="chip" />
          <div className="min-w-0">
            <h1
              className={cn("font-display font-black uppercase leading-[0.85] tracking-[0.02em]", compact ? "text-[1.05rem]" : "text-[1.5rem] md:text-[1.85rem]")}
              style={DISPLAY}
            >
              World of Tomorrow
            </h1>
            <p className={cn("font-black uppercase tracking-[0.2em] text-[var(--sample-accent)]", compact ? "text-[5.5px]" : "text-[7px]")}>
              a retro-futurist specimen
            </p>
          </div>
          <span className={cn("ml-auto shrink-0 whitespace-nowrap rounded-[999px] bg-[var(--sample-text)] px-2 py-0.5 font-black uppercase tracking-[0.1em] text-[var(--sample-base)]", compact ? "text-[6px]" : "text-[8px]")}>
            1958 &rarr; 2001
          </span>
        </header>

        {/* ── main: exhibit viewer | poster plate ── */}
        <main className={cn("grid min-h-0 flex-1 gap-2", compact ? "grid-cols-[1.25fr_0.75fr]" : "grid-cols-1 grid-rows-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:grid-cols-[1.4fr_0.6fr] sm:grid-rows-1 md:gap-3")}>
          {/* exhibit viewer */}
          <section
            aria-label="exhibit viewer"
            className="relative min-h-0 overflow-hidden rounded-[16px] border-2 border-[var(--sample-border)]"
            style={{ backgroundColor: "var(--sample-text)" }}
          >
            {/* starfield + orbit rings */}
            <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 14px 12px, rgb(255 255 255 / 0.5) 0 1px, transparent 1.4px)", backgroundSize: "30px 26px", opacity: 0.4 }} />
            <span aria-hidden="true" className="absolute left-1/2 top-[46%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(var(--st-accent-2-rgb)/0.55)]" />
            <span aria-hidden="true" className="absolute left-1/2 top-[46%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rotate-[58deg] rounded-full border border-[rgb(var(--st-accent-3-rgb)/0.4)]" style={{ transform: "translate(-50%,-50%) scaleY(0.4) rotate(20deg)" }} />
            <span className={cn("absolute left-2 top-2 rounded-[999px] px-1.5 py-0.5 font-black uppercase tracking-[0.12em] text-[var(--sample-text)]", compact ? "text-[5.5px]" : "text-[7px]")} style={{ backgroundColor: "var(--sample-accent-3)" }}>
              now exhibiting
            </span>

            {/* the enlarged motif */}
            <span className="absolute inset-x-0 top-[6%] flex justify-center" style={{ height: "56%" }}>
              <MotifGlyph className="h-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]" id={selected.id} tone="screen" />
            </span>

            {/* caption bar */}
            <div className="absolute inset-x-0 bottom-0 border-t border-[rgb(var(--st-accent-2-rgb)/0.4)] bg-[rgb(var(--st-text-rgb)/0.72)] px-2.5 py-1.5" style={{ backdropFilter: "blur(2px)" }}>
              <div className="flex items-baseline justify-between gap-2">
                <p className={cn("min-w-0 truncate font-display font-black uppercase leading-none text-[var(--sample-surface)]", compact ? "text-[13px]" : "text-[17px] md:text-[20px]")} style={DISPLAY}>
                  {selected.name}
                </p>
                <p className={cn("shrink-0 font-black uppercase tracking-[0.1em]", compact ? "text-[6px]" : "text-[7.5px]")} style={{ color: "var(--sample-accent-3)" }}>plate {selected.plate}</p>
              </div>
              <p className={cn("mt-0.5 line-clamp-2 font-medium leading-tight", compact ? "hidden" : "text-[8.5px]")} style={{ color: "rgb(var(--st-surface-rgb) / 0.82)" }}>
                {selected.descriptor}
              </p>
            </div>
          </section>

          {/* poster plate */}
          <section className="relative min-h-0 overflow-hidden rounded-[16px] border-2 border-[var(--sample-border)]">
            <span aria-hidden="true" className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('${POSTER_IMAGE}')`, backgroundPosition: "50% 28%" }} />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundImage: "linear-gradient(180deg, transparent, rgb(23 49 74 / 0.62))" }} />
            <span className={cn("absolute bottom-2 left-2 right-2 truncate rounded-[6px] border border-[rgb(var(--st-surface-rgb)/0.5)] bg-[rgb(var(--st-text-rgb)/0.55)] px-2 py-1 font-black uppercase tracking-[0.12em] text-[var(--sample-surface)]", compact ? "text-[6px]" : "text-[7.5px]")}>
              world of tomorrow &middot; pavilion plate
            </span>
          </section>
        </main>

        {/* ── motif index ── */}
        <section aria-label="motif index" className="shrink-0">
          <div className={cn("mb-1 flex items-baseline justify-between", compact ? "hidden" : "")}>
            <p className="text-[7.5px] font-black uppercase tracking-[0.16em] text-[var(--sample-muted)]">motif index</p>
            <p className="text-[7.5px] font-medium uppercase tracking-[0.1em] text-[var(--sample-muted)]">select to exhibit</p>
          </div>
          <div className={cn("grid gap-1.5", compact ? "grid-cols-3" : "grid-cols-5")}>
            {(compact ? MOTIFS.slice(0, 3) : MOTIFS).map((motif) => {
              const active = motif.id === selectedId;
              return (
                <button
                  aria-label={motif.id === "atomic" ? "atomic orbit" : motif.name}
                  aria-pressed={active}
                  className={cn(
                    "group flex min-w-0 flex-col items-center gap-1 rounded-[10px] border-2 px-1 py-1.5 transition-colors",
                    FOCUS,
                    active ? "border-[var(--sample-border)] bg-[var(--sample-surface)]" : "border-[rgb(var(--st-border-rgb)/0.4)] bg-[rgb(var(--st-surface-rgb)/0.5)]",
                  )}
                  key={motif.id}
                  onClick={() => setSelectedId(motif.id)}
                  style={active ? { boxShadow: "3px 3px 0 var(--sample-accent-3)" } : undefined}
                  type="button"
                >
                  <MotifGlyph className={cn(compact ? "h-6 w-6" : "h-7 w-7")} id={motif.id} tone="chip" />
                  <span className={cn("w-full truncate text-center font-black uppercase leading-none tracking-[0.03em]", active ? "text-[var(--sample-text)]" : "text-[var(--sample-muted)]", compact ? "text-[6px]" : "text-[7px]")}>
                    {motif.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Space Age palette specimen ── */}
        <footer className={cn("flex shrink-0 items-center gap-2 border-t-2 border-[var(--sample-border)] pt-1.5", compact ? "hidden" : "")}>
          <span className="shrink-0 whitespace-nowrap text-[7px] font-black uppercase tracking-[0.14em] text-[var(--sample-muted)]">Space Age palette</span>
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            {PALETTE.map(([name, color]) => (
              <span className="flex min-w-0 items-center gap-1" key={name}>
                <span className="h-3 w-3 shrink-0 rounded-full border border-[var(--sample-border)]" style={{ backgroundColor: color }} />
                <span className="hidden truncate text-[7px] font-bold uppercase tracking-[0.06em] text-[var(--sample-muted)] lg:inline">{name}</span>
              </span>
            ))}
          </div>
          <span className="ml-auto shrink-0 whitespace-nowrap rounded-[999px] border-2 border-[var(--sample-border)] px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.1em]">est. 1958</span>
        </footer>
      </div>
    </div>
  );
}
