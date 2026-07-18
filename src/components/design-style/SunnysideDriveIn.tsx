"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DINER_IMAGE = "/generated/design-styles/retro.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-text)]" as const;

const MONO: CSSProperties = { fontFamily: '"Courier New", "SFMono-Regular", monospace' };

/* 50s roadside-print discipline: the retro graphic language carries the page —
   starburst badge, dotted-leader menu board, guest-check ticket, checkerboard
   band, cherry red / teal / cream on chrome-and-vinyl photography. */

type ItemId = "burger" | "malt" | "dog" | "split";

type MenuItem = {
  readonly id: ItemId;
  readonly name: string;
  readonly price: number;
  readonly note: string;
  readonly stall: string;
};

const MENU: readonly MenuItem[] = [
  { id: "burger", name: "Double Deluxe Burger", price: 1.25, note: "two patties · toasted bun", stall: "stall 07" },
  { id: "malt", name: "Cherry Malt", price: 0.45, note: "hand-spun · whipped top", stall: "stall 03" },
  { id: "dog", name: "Chili Dog", price: 0.85, note: "house chili · diced onion", stall: "stall 11" },
  { id: "split", name: "Banana Split", price: 0.6, note: "three scoops · hot fudge", stall: "stall 05" },
];

const FRIES_PRICE = 0.3;

const usd = (value: number) => `$${value.toFixed(2)}`;

/* 16-point starburst badge polygon */
const STAR_POINTS = Array.from({ length: 32 }, (_, index) => {
  const radius = index % 2 === 0 ? 50 : 37;
  const angle = (Math.PI * index) / 16;
  return `${(50 + radius * Math.sin(angle)).toFixed(2)},${(50 - radius * Math.cos(angle)).toFixed(2)}`;
}).join(" ");

function Starburst({ compact }: { readonly compact: boolean }) {
  return (
    <span className={cn("relative grid shrink-0 place-items-center", compact ? "h-9 w-9" : "h-11 w-11 md:h-12 md:w-12")}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        <polygon fill="var(--sample-accent)" points={STAR_POINTS} />
      </svg>
      <span className={cn("relative text-center font-black uppercase leading-[1.05] text-[var(--sample-surface)]", compact ? "text-[5px]" : "text-[6px]")}>
        est.
        <br />
        1959
      </span>
    </span>
  );
}

export function SunnysideDriveIn({ compact = false }: { readonly compact?: boolean }) {
  const [selectedId, setSelectedId] = useState<ItemId>("burger");
  const selected = MENU.find((item) => item.id === selectedId) ?? MENU[0];

  return (
    <div className="relative flex h-full min-h-0 flex-col text-[var(--sample-text)]">
      {/* halftone print grain */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--sample-text) 0 1px, transparent 1.4px)", backgroundSize: "10px 10px" }}
      />

      <div className="relative flex h-full min-h-0 flex-col gap-2">
        {/* ── masthead ── */}
        <header className="flex min-w-0 items-center gap-2 border-b-2 border-[var(--sample-border)] pb-1.5">
          <Starburst compact={compact} />
          <div className="min-w-0">
            <h1
              className={cn("font-display font-black uppercase leading-[0.85]", compact ? "text-[1.05rem]" : "text-[1.5rem] md:text-[1.8rem]")}
              style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.015em" }}
            >
              SUNNYSIDE
            </h1>
            <p className="mt-0.5 whitespace-nowrap text-[7px] font-black uppercase tracking-[0.2em] text-[var(--sample-accent)]">
              drive-in restaurant<span className={cn(compact ? "hidden" : "hidden sm:inline")}> · car hop service</span>
            </p>
          </div>
          <nav className={cn("ml-auto items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.05em]", compact ? "hidden" : "hidden sm:flex")}>
            {["Menu", "Shakes", "Car Hop", "Jukebox"].map((tab, index) => (
              <span className={cn("rounded-[var(--st-radius-pill)] px-2 py-0.5", index === 0 ? "bg-[var(--sample-accent)] text-[var(--sample-surface)]" : "text-[var(--sample-muted)]")} key={tab}>{tab}</span>
            ))}
          </nav>
          <span className={cn("ml-auto shrink-0 whitespace-nowrap rounded-[var(--st-radius-pill)] border-2 border-[var(--sample-accent-2)] px-2 py-0.5 text-[8px] font-black uppercase text-[var(--sample-accent-2)] sm:ml-0", compact ? "hidden" : "hidden sm:inline-block")}>
            open till midnight
          </span>
        </header>

        {/* ── main: slogan + diner photo | menu board + guest check ── */}
        <main className={cn("grid min-h-0 flex-1 gap-2", compact ? "grid-cols-[1fr_0.95fr]" : "grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1.15fr)] sm:grid-cols-[1fr_0.95fr] sm:grid-rows-1 md:gap-3")}>

          {/* slogan + photo */}
          <section className="flex min-w-0 flex-col">
            <p className={cn("font-black uppercase tracking-[0.14em] text-[var(--sample-accent-2)]", compact ? "text-[6px]" : "text-[8px]")}>
              curb service<span className={cn(compact ? "hidden" : "hidden sm:inline")}> daily</span> · 11 am – midnight
            </p>
            <h2
              className={cn("font-display font-black uppercase leading-[0.87]", compact ? "mt-1 text-[1.05rem]" : "mt-1.5 text-[1.35rem] md:text-[1.9rem]")}
              style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.015em" }}
            >
              Burgers, malts
              <br />
              <span className="text-[var(--sample-accent)]">&amp; chrome.</span>
            </h2>
            <div className={cn("relative mt-2 min-h-0 flex-1 overflow-hidden rounded-[18px] border-2 border-[var(--sample-border)]", compact && "rounded-[12px]")}>
              <span aria-hidden="true" className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('${DINER_IMAGE}')`, backgroundPosition: "36% 62%" }} />
              <span className={cn("absolute left-2 top-2 whitespace-nowrap rounded-[var(--st-radius-pill)] bg-[var(--sample-accent-2)] px-2 py-0.5 font-black uppercase tracking-[0.08em] text-[var(--sample-surface)]", compact ? "text-[6px]" : "text-[7px]")}>
                air conditioned
              </span>
              <span className={cn("absolute bottom-2 right-2 whitespace-nowrap rounded-[var(--st-radius-pill)] bg-[rgb(var(--st-surface-rgb)/0.92)] px-2 py-0.5 font-black uppercase tracking-[0.06em]", compact ? "hidden" : "text-[7px]")}>
                cherry pie today
              </span>
            </div>
          </section>

          {/* menu board + guest check */}
          <aside className="flex min-w-0 flex-col gap-2">
            <div aria-label="menu board" className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[16px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]">
              <div className="flex items-center justify-between gap-2 border-b-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-2 py-1">
                <p className={cn("whitespace-nowrap font-black uppercase tracking-[0.12em] text-[var(--sample-surface)]", compact ? "text-[7px]" : "text-[8.5px]")}>today&rsquo;s menu</p>
                <p className={cn("whitespace-nowrap font-black uppercase tracking-[0.08em] text-[var(--sample-surface)] opacity-90", compact ? "hidden" : "hidden text-[7px] lg:block")}>car hop it!</p>
              </div>
              <div className={cn("flex min-h-0 flex-1 flex-col justify-center", compact ? "gap-1 p-1.5" : "gap-1.5 p-2.5")}>
                {(compact ? MENU.slice(0, 3) : MENU).map((item) => {
                  const active = item.id === selectedId;
                  return (
                    <button
                      aria-pressed={active}
                      className={cn(
                        "group flex min-w-0 items-baseline gap-1.5 rounded-[8px] px-1.5 text-left",
                        FOCUS,
                        compact ? "py-0.5" : "py-1",
                        active ? "bg-[var(--sample-accent)] text-[var(--sample-surface)]" : "text-[var(--sample-text)]",
                      )}
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      type="button"
                    >
                      <span className={cn("min-w-0 shrink truncate font-black", compact ? "text-[8px]" : "text-[9.5px]")}>{item.name}</span>
                      <span aria-hidden="true" className={cn("min-w-3 flex-1 border-b-2 border-dotted", active ? "border-[rgb(var(--st-surface-rgb)/0.6)]" : "border-[rgb(var(--st-text-rgb)/0.4)]")} />
                      <span className={cn("shrink-0 font-black tabular-nums", compact ? "text-[8px]" : "text-[9.5px]")}>{usd(item.price)}</span>
                    </button>
                  );
                })}
                <p className={cn("mt-0.5 truncate px-1.5 font-bold uppercase tracking-[0.06em] text-[var(--sample-muted)]", compact ? "hidden" : "text-[6.5px]")}>
                  every plate with crinkle fries + {usd(FRIES_PRICE)}
                </p>
              </div>
            </div>

            {/* guest-check ticket */}
            <div aria-label="car hop ticket" className={cn("rounded-[10px] border-2 border-dashed border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1.5", compact ? "hidden" : "hidden md:block")} style={MONO}>
              <div className="flex items-baseline justify-between gap-2 text-[7.5px] font-bold uppercase">
                <span className="whitespace-nowrap">guest check</span>
                <span className="whitespace-nowrap">no. 0114</span>
              </div>
              <div className="mt-1 space-y-0.5 text-[8px]">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="min-w-0 truncate">{selected.name}</span>
                  <span className="shrink-0 tabular-nums">{usd(selected.price)}</span>
                </div>
                <div className="flex items-baseline justify-between gap-2 text-[var(--sample-muted)]">
                  <span className="min-w-0 truncate">crinkle fries</span>
                  <span className="shrink-0 tabular-nums">{usd(FRIES_PRICE)}</span>
                </div>
              </div>
              <div className="mt-1 flex items-baseline justify-between gap-2 border-t-2 border-dashed border-[var(--sample-border)] pt-1 text-[8.5px] font-bold">
                <span>TOTAL</span>
                <span className="tabular-nums text-[var(--sample-accent)]">{usd(selected.price + FRIES_PRICE)}</span>
              </div>
              <p className="mt-1 truncate text-[7px] uppercase text-[var(--sample-accent-2)]">tray out to {selected.stall} · flash headlights for service</p>
            </div>

            {/* condensed readout when the ticket is hidden */}
            <div className={cn("items-baseline gap-1.5 rounded-[8px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-[7.5px] font-bold", compact ? "hidden" : "flex md:hidden")} style={MONO}>
              <span className="min-w-0 truncate">{selected.name} + fries</span>
              <span className="ml-auto shrink-0 tabular-nums text-[var(--sample-accent)]">{usd(selected.price + FRIES_PRICE)}</span>
            </div>
          </aside>
        </main>

        {/* ── checkerboard band + ticker ── */}
        <footer className={cn("shrink-0", compact ? "pt-0.5" : "pt-1")}>
          <span
            aria-hidden="true"
            className={cn("block w-full rounded-[2px]", compact ? "h-1.5" : "h-2")}
            data-part="checkerboard"
            style={{ backgroundImage: "repeating-conic-gradient(var(--sample-text) 0% 25%, var(--sample-surface) 0% 50%)", backgroundSize: compact ? "6px 6px" : "8px 8px" }}
          />
          <p className={cn("mt-1 truncate text-[7px] font-black uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "hidden" : "")}>
            ★ root beer floats ★ jukebox 45s changed weekly ★ milkshakes hand-spun since 1959
          </p>
        </footer>
      </div>
    </div>
  );
}
