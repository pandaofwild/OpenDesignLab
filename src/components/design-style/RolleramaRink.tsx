"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const RINK_IMAGE = "/generated/design-styles/seventies-retro.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-text)]" as const;

/* 70s supergraphic discipline: the style IS the layout — rainbow arch rings,
   fat rounded display type, earth-tone stripe bands, arch-topped frames, pill
   badges. Brown 2px borders + hard offset shadows come from the style tokens. */

type SessionId = "matinee" | "disco" | "sunday";

type Session = {
  readonly id: SessionId;
  readonly label: string;
  readonly time: string;
  readonly crowd: string;
  readonly price: string;
  readonly spinning: string;
  readonly note: string;
  readonly color: string;
};

const SESSIONS: readonly Session[] = [
  { id: "matinee", label: "Matinee Skate", time: "2–5 PM", crowd: "all ages", price: "$3.00", spinning: "bubblegum pop · motown", note: "floor waxed at 1 PM", color: "var(--sample-accent-2)" },
  { id: "disco", label: "Disco Night", time: "8–12 PM", crowd: "18 & over", price: "$5.00", spinning: "funk · soul · boogie", note: "DJ Marv on the decks", color: "var(--sample-accent)" },
  { id: "sunday", label: "Sunday Jam", time: "1–4 PM", crowd: "families", price: "$4.00", spinning: "soul · roller boogie", note: "beginners welcome", color: "var(--sample-accent-3)" },
];

const STRIPE_COLORS = ["var(--sample-accent)", "var(--sample-accent-2)", "var(--sample-accent-3)"] as const;

export function RolleramaRink({ compact = false }: { readonly compact?: boolean }) {
  const [selectedId, setSelectedId] = useState<SessionId>("disco");
  const selected = SESSIONS.find((session) => session.id === selectedId) ?? SESSIONS[1];

  return (
    <div className="relative flex h-full min-h-0 flex-col text-[var(--sample-text)]">
      {/* decorative supergraphics — clipped so they never add scroll width */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" data-part="rainbow arch">
        {/* concentric rainbow arch rising off the top-left corner */}
        <span
          className={cn("absolute rounded-full opacity-45", compact ? "-left-14 -top-16 h-36 w-36" : "-left-20 -top-24 h-56 w-56")}
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle, transparent 0 12px, var(--sample-accent) 12px 17px, transparent 17px 29px, var(--sample-accent-2) 29px 34px, transparent 34px 46px, var(--sample-accent-3) 46px 51px)",
          }}
        />
      </div>

      <div className="relative flex h-full min-h-0 flex-col gap-2">
        {/* ── masthead ── */}
        <header className="flex min-w-0 items-end gap-2 border-b-2 border-[var(--sample-border)] pb-1.5">
          <div className="min-w-0">
            <h1
              className={cn("font-display font-black uppercase leading-[0.82]", compact ? "text-[1.05rem]" : "text-[1.6rem] md:text-[1.9rem]")}
              style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.02em" }}
            >
              ROLLERAMA
            </h1>
            <p className="relative mt-0.5 whitespace-nowrap text-[7.5px] font-black uppercase tracking-[0.22em] text-[var(--sample-text)]">roller disco · est. 1974</p>
          </div>
          <nav className={cn("ml-auto items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.06em]", compact ? "hidden" : "hidden sm:flex")}>
            {["Sessions", "Skate Hire", "Snack Bar", "Parties"].map((tab, index) => (
              <span className={cn("rounded-[var(--st-radius-pill)] px-2 py-0.5", index === 0 ? "bg-[var(--sample-text)] text-[var(--sample-base)]" : "text-[var(--sample-muted)]")} key={tab}>{tab}</span>
            ))}
          </nav>
          <span className={cn("ml-auto shrink-0 whitespace-nowrap rounded-[var(--st-radius-pill)] border-2 border-[var(--sample-border)] px-2 py-0.5 text-[8px] font-black uppercase sm:ml-0", compact && "hidden")}>&rsquo;76 season</span>
        </header>

        {/* ── main: supergraphic hero + arch rink window ── */}
        <main className={cn("grid min-h-0 flex-1 gap-2", compact ? "grid-cols-[1.05fr_0.95fr]" : "grid-cols-[1.1fr_0.9fr] md:gap-3")}>
          {/* hero + session board */}
          <section className="relative flex min-w-0 flex-col">
            <span className={cn("w-fit rounded-[var(--st-radius-pill)] px-2 py-[3px] text-[7px] font-black uppercase tracking-[0.12em] text-[var(--sample-surface)]", compact && "text-[6px]")} style={{ background: "var(--sample-accent-3)" }}>
              friday night special
            </span>
            <h2
              className={cn("font-display font-black uppercase leading-[0.86]", compact ? "mt-1 text-[1.05rem]" : "mt-1.5 text-[1.5rem] md:text-[2.3rem]")}
              style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.02em" }}
            >
              Roll into
              <br />
              <span className="text-[var(--sample-accent)]">the groove.</span>
            </h2>
            <p className={cn("mt-1.5 text-[9px] font-bold leading-[1.35] text-[var(--sample-muted)]", compact ? "hidden" : "hidden md:block")}>
              Live organ, DJ Marv, and the smoothest maple floor in the county.
            </p>

            <div className={cn("mt-2 flex flex-wrap items-center gap-1.5", compact && "hidden")}>
              <span className="rounded-[var(--st-radius-pill)] bg-[var(--sample-accent)] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.06em] text-[var(--sample-surface)]" style={{ boxShadow: "3px 4px 0 var(--sample-border)" }}>
                Book {selected.label}
              </span>
              <span className="rounded-[var(--st-radius-pill)] border-2 border-[var(--sample-border)] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.06em]">Floor map</span>
            </div>

            {/* session board */}
            <div aria-label="session board" className={cn("flex min-h-0 flex-1 flex-col justify-end", compact ? "mt-1 gap-1" : "mt-2 gap-1.5")}>
              {(compact ? SESSIONS.slice(0, 2) : SESSIONS).map((session) => {
                const active = session.id === selectedId;
                return (
                  <button
                    aria-pressed={active}
                    className={cn(
                      "flex min-w-0 items-center gap-1.5 rounded-[14px] border-2 px-2 text-left transition-colors",
                      FOCUS,
                      compact ? "py-0.5" : "py-1.5",
                      active ? "border-[var(--sample-border)] bg-[var(--sample-surface)]" : "border-[rgb(var(--st-text-rgb)/0.22)] bg-transparent",
                    )}
                    key={session.id}
                    onClick={() => setSelectedId(session.id)}
                    style={active ? { boxShadow: "3px 4px 0 rgb(var(--st-text-rgb) / 0.28)" } : undefined}
                    type="button"
                  >
                    <span className={cn("shrink-0 rounded-full border-2 border-[var(--sample-border)]", compact ? "h-2.5 w-2.5" : "h-3 w-3")} style={{ background: session.color }} />
                    <span className="min-w-0 flex-1">
                      <span className={cn("block truncate font-black leading-tight", compact ? "text-[8px]" : "text-[9.5px]")}>{session.label}</span>
                      <span className={cn("block truncate font-bold uppercase tracking-[0.06em] text-[var(--sample-muted)]", compact ? "text-[6px]" : "text-[7px]")}>
                        {session.time} · {session.crowd}
                      </span>
                    </span>
                    <span className={cn("shrink-0 font-display font-black", compact ? "text-[8px]" : "hidden text-[10px] sm:inline")} style={{ fontFamily: "var(--st-font-display)", color: active ? "var(--sample-accent)" : "var(--sample-muted)" }}>
                      {session.price}
                    </span>
                  </button>
                );
              })}
              {/* selected-session readout */}
              <div className={cn("flex min-w-0 items-center gap-1.5 rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-2.5 text-[var(--sample-base)]", compact ? "py-0.5 text-[6.5px]" : "py-1.5 text-[7.5px]")}>
                <span className="shrink-0 font-black uppercase tracking-[0.1em]" style={{ color: "var(--sample-base)" }}>spinning</span>
                <span className="min-w-0 truncate font-bold">{selected.spinning}</span>
                <span className={cn("ml-auto shrink-0 truncate font-bold uppercase tracking-[0.04em] opacity-80", compact ? "hidden" : "hidden md:inline")}>{selected.note}</span>
              </div>
            </div>
          </section>

          {/* arch rink window + skate hire */}
          <aside className="flex min-w-0 flex-col gap-2">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-t-[999px] rounded-b-[18px] border-2 border-[var(--sample-border)]">
              <span aria-hidden="true" className="absolute inset-0 bg-cover" style={{ backgroundImage: `url('${RINK_IMAGE}')`, backgroundPosition: "48% 68%" }} />
              <span className={cn("absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[var(--st-radius-pill)] bg-[var(--sample-base)] px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.1em] shadow-[0_2px_0_rgb(var(--st-text-rgb)/0.25)]", compact ? "top-2" : "top-3")}>
                open tonight
              </span>
              <span className={cn("absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[var(--st-radius-pill)] border-2 border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.92)] px-2 py-0.5 font-black uppercase tracking-[0.06em]", compact ? "text-[6px]" : "text-[7px]")}>
                <span className={cn(compact ? "hidden" : "hidden sm:inline")}>maple floor · </span>waxed daily
              </span>
            </div>

            {/* skate hire strip */}
            <div aria-label="skate hire" className={cn("rounded-[16px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2", compact && "hidden")}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="whitespace-nowrap text-[8px] font-black uppercase tracking-[0.1em] text-[var(--sample-accent)]">skate hire</p>
                <p className="whitespace-nowrap text-[8px] font-black">$2.50</p>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {["5", "6", "7", "8", "9", "10"].map((size, index) => (
                  <span
                    className={cn("grid h-4.5 w-4.5 min-w-[18px] place-items-center rounded-full border-2 px-1 text-[7px] font-black", index === 3 ? "border-[var(--sample-border)] bg-[var(--sample-base)]" : "border-[rgb(var(--st-text-rgb)/0.22)] text-[var(--sample-muted)]")}
                    key={size}
                  >
                    {size}
                  </span>
                ))}
              </div>
              <p className="mt-1 truncate text-[6.5px] font-bold uppercase tracking-[0.06em] text-[var(--sample-muted)]">tan suede · orange wheels</p>
            </div>
          </aside>
        </main>

        {/* ── stripe band + ticker ── */}
        <footer className={cn("shrink-0", compact ? "pt-0.5" : "pt-1")}>
          <div aria-hidden="true" className="flex overflow-hidden rounded-[var(--st-radius-pill)]">
            {STRIPE_COLORS.map((color) => (
              <span className={cn("flex-1", compact ? "h-1" : "h-1.5")} key={color} style={{ background: color }} />
            ))}
          </div>
          <p className={cn("mt-1 truncate text-[7px] font-black uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "hidden" : "")}>
            ★ tonight: funk · soul · disco ★ snack bar till late ★ couples skate 10 PM ★ organ matinee saturday
          </p>
        </footer>
      </div>
    </div>
  );
}
