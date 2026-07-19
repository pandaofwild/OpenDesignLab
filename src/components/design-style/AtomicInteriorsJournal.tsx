"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const INTERIOR_IMAGE = "/generated/design-styles/mid-century-modern.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent)]" as const;

const DISPLAY: CSSProperties = { fontFamily: "var(--st-font-display)" };

/* Mid-century interiors editorial: a design-journal spread, not a product site.
   A real Case Study House interior photo carries the style; iconic pieces are
   annotated with numbered pins and named in a sidebar. Cream paper, espresso
   ink, walnut/burnt-orange/teal accents, quiet serif-adjacent hierarchy. */

type PieceId = "eames" | "noguchi" | "nelson" | "girard" | "lamp";

type Piece = {
  readonly id: PieceId;
  readonly name: string;
  readonly designer: string;
  readonly year: string;
  readonly material: string;
  readonly pin: { readonly left: string; readonly top: string };
};

const PIECES: readonly Piece[] = [
  { id: "eames", name: "Eames Lounge Chair", designer: "Charles & Ray Eames", year: "1956", material: "Molded plywood & leather", pin: { left: "19%", top: "60%" } },
  { id: "noguchi", name: "Noguchi Table", designer: "Isamu Noguchi", year: "1948", material: "Glass & walnut", pin: { left: "72%", top: "82%" } },
  { id: "nelson", name: "Nelson Credenza", designer: "George Nelson", year: "1952", material: "Walnut & brass", pin: { left: "77%", top: "58%" } },
  { id: "girard", name: "Girard Textile", designer: "Alexander Girard", year: "1959", material: "Handwoven wool", pin: { left: "74%", top: "23%" } },
  { id: "lamp", name: "Brass Tripod Lamp", designer: "Studio unknown", year: "1955", material: "Brushed brass", pin: { left: "55%", top: "38%" } },
];

export function AtomicInteriorsJournal({ compact = false }: { readonly compact?: boolean }) {
  const [selectedId, setSelectedId] = useState<PieceId>("eames");
  const selectedIndex = Math.max(0, PIECES.findIndex((piece) => piece.id === selectedId));
  const selected = PIECES[selectedIndex] ?? PIECES[0];

  return (
    <div className="relative flex h-full min-h-0 flex-col text-[var(--sample-text)]">
      <div className="flex h-full min-h-0 flex-col gap-2">
        {/* ── masthead ── */}
        <header className="flex min-w-0 items-end gap-2 border-b-2 border-[var(--sample-border)] pb-1.5">
          <div className="min-w-0">
            <h1
              className={cn("font-display font-black uppercase leading-[0.82] tracking-[0.12em]", compact ? "text-[1.15rem]" : "text-[1.7rem] md:text-[2rem]")}
              style={DISPLAY}
            >
              ATOMIC
            </h1>
            <p className={cn("font-medium italic tracking-[0.02em] text-[var(--sample-muted)]", compact ? "text-[6px]" : "text-[8px]")} style={DISPLAY}>
              a mid-century living journal
            </p>
          </div>
          <div className={cn("ml-auto shrink-0 text-right", compact ? "hidden" : "")}>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--sample-accent)]">Interiors</p>
            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[var(--sample-muted)]">No. 06 &middot; Spring 1958</p>
          </div>
        </header>

        {/* ── main: feature | the pieces ── */}
        <main className={cn("grid min-h-0 flex-1 gap-2", compact ? "grid-cols-[1.55fr_0.45fr]" : "grid-cols-1 grid-rows-[minmax(0,1fr)_auto] sm:grid-cols-[1.5fr_0.5fr] sm:grid-rows-1 md:gap-3")}>
          {/* feature: kicker + headline + annotated photo + article */}
          <section className="flex min-h-0 min-w-0 flex-col">
            <div className="flex items-baseline gap-2">
              <span className={cn("shrink-0 font-black uppercase tracking-[0.16em] text-[var(--sample-accent)]", compact ? "text-[6px]" : "text-[8px]")}>HOUSE STUDY 06</span>
              <span className={cn("min-w-0 flex-1 truncate font-medium uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "hidden" : "text-[7px]")}>Palm Canyon &middot; post &amp; beam</span>
            </div>
            <h2
              className={cn("mt-0.5 font-display font-black leading-[0.98] tracking-[-0.01em]", compact ? "text-[0.95rem]" : "text-[1.35rem] md:text-[1.7rem]")}
              style={DISPLAY}
            >
              The house that lets the garden in.
            </h2>

            {/* annotated interior photo */}
            <div className={cn("relative mt-1.5 min-h-0 flex-1 overflow-hidden border-2 border-[var(--sample-border)]", compact ? "" : "")}>
              <span aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${INTERIOR_IMAGE}')` }} />
              {/* numbered pins */}
              {PIECES.map((piece, index) => {
                const active = piece.id === selectedId;
                return (
                  <span
                    aria-hidden="true"
                    className={cn("absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-black tabular-nums transition-all", compact ? "h-3.5 w-3.5 text-[6px]" : "h-4 w-4 text-[7px]")}
                    key={piece.id}
                    style={{
                      left: piece.pin.left,
                      top: piece.pin.top,
                      backgroundColor: active ? "var(--sample-accent)" : "rgb(248 238 219 / 0.86)",
                      color: active ? "var(--sample-surface)" : "var(--sample-text)",
                      borderColor: active ? "var(--sample-surface)" : "var(--sample-border)",
                      boxShadow: active ? "0 0 0 3px rgb(201 101 58 / 0.35)" : "0 1px 3px rgb(43 36 26 / 0.4)",
                      transform: `translate(-50%,-50%) scale(${active ? 1.15 : 1})`,
                    }}
                  >
                    {index + 1}
                  </span>
                );
              })}
              {/* selected-piece caption */}
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-[rgb(var(--st-surface-rgb)/0.5)] bg-[rgb(var(--st-text-rgb)/0.74)] px-2 py-1.5">
                <span className={cn("grid shrink-0 place-items-center rounded-full font-black tabular-nums text-[var(--sample-surface)]", compact ? "h-3.5 w-3.5 text-[6px]" : "h-4 w-4 text-[7px]")} style={{ backgroundColor: "var(--sample-accent)" }}>
                  {selectedIndex + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block truncate font-display font-bold leading-tight text-[var(--sample-surface)]", compact ? "text-[8px]" : "text-[10px]")} style={DISPLAY}>{selected.name}</span>
                  <span className={cn("block truncate leading-tight", compact ? "text-[6px]" : "text-[7.5px]")} style={{ color: "rgb(var(--st-surface-rgb) / 0.78)" }}>{selected.designer} &middot; {selected.year}</span>
                </span>
                <span className={cn("shrink-0 whitespace-nowrap text-right font-medium uppercase tracking-[0.06em]", compact ? "hidden" : "text-[7px] md:inline")} style={{ color: "var(--sample-accent-3)" }}>{selected.material}</span>
              </div>
            </div>

            {/* article + pull quote */}
            <div className={cn("mt-1.5 grid gap-2", compact ? "hidden" : "hidden md:grid md:grid-cols-[1.1fr_0.9fr]")}>
              <p className="text-[8.5px] leading-[1.5] text-[var(--sample-text)]">
                In the hills above the city a post-and-beam frame dissolves the wall between the drawing room and the garden. Walnut, plywood and a single pane of glass do the quiet work of the age.
              </p>
              <blockquote className="border-l-2 border-[var(--sample-accent)] pl-2">
                <p className="font-display text-[10px] font-black italic leading-[1.25]" style={DISPLAY}>&ldquo;Design is a way of living lightly with beautiful, useful things.&rdquo;</p>
                <cite className="mt-1 block text-[7px] font-bold uppercase not-italic tracking-[0.14em] text-[var(--sample-muted)]">Words &mdash; the Atomic editors</cite>
              </blockquote>
            </div>
          </section>

          {/* the pieces sidebar */}
          <aside aria-label="the pieces" className="flex min-h-0 min-w-0 flex-col border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]">
            <div className="border-b-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-2 py-1">
              <p className={cn("font-display font-black uppercase leading-none tracking-[0.12em]", compact ? "text-[8px]" : "text-[10px]")} style={DISPLAY}>The pieces</p>
              <p className={cn("mt-0.5 font-medium uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "hidden" : "text-[6.5px]")}>in this room</p>
            </div>
            <div className="min-h-0 flex-1">
              {(compact ? PIECES.slice(0, 4) : PIECES).map((piece, index) => {
                const active = piece.id === selectedId;
                return (
                  <button
                    aria-pressed={active}
                    className={cn(
                      "flex w-full min-w-0 items-center gap-1.5 border-b border-[var(--sample-border)] px-1.5 text-left transition-colors last:border-b-0",
                      FOCUS,
                      compact ? "py-1" : "py-1.5",
                      active ? "bg-[var(--sample-base)]" : "",
                    )}
                    key={piece.id}
                    onClick={() => setSelectedId(piece.id)}
                    type="button"
                  >
                    <span className={cn("grid shrink-0 place-items-center rounded-full border font-black tabular-nums", compact ? "h-3.5 w-3.5 text-[6px]" : "h-4 w-4 text-[7px]")} style={{ backgroundColor: active ? "var(--sample-accent)" : "transparent", color: active ? "var(--sample-surface)" : "var(--sample-muted)", borderColor: active ? "var(--sample-accent)" : "var(--sample-border)" }}>
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block truncate font-display font-bold leading-tight", active ? "text-[var(--sample-text)]" : "text-[var(--sample-text)]", compact ? "text-[7.5px]" : "text-[9px]")} style={DISPLAY}>{piece.name}</span>
                      <span className={cn("block truncate leading-tight text-[var(--sample-muted)]", compact ? "hidden" : "text-[7px]")}>{piece.designer}</span>
                    </span>
                    <span className={cn("shrink-0 tabular-nums", active ? "text-[var(--sample-accent)]" : "text-[var(--sample-muted)]", compact ? "text-[6px]" : "text-[7.5px]")} style={DISPLAY}>{piece.year}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        </main>

        {/* ── credits strip ── */}
        <footer className={cn("grid shrink-0 grid-cols-3 border-t-2 border-[var(--sample-border)] text-center", compact ? "hidden" : "")}>
          {[["Photography", "Case Study 06"], ["Styling", "walnut & wool"], ["Materials", "plywood · glass · brass"]].map(([label, value], index) => (
            <span className={cn("px-2 py-1", index < 2 ? "border-r border-[var(--sample-border)]" : "")} key={label}>
              <span className="block text-[6.5px] font-black uppercase tracking-[0.14em] text-[var(--sample-muted)]">{label}</span>
              <span className="block truncate text-[7.5px] font-medium text-[var(--sample-text)]">{value}</span>
            </span>
          ))}
        </footer>
      </div>
    </div>
  );
}
