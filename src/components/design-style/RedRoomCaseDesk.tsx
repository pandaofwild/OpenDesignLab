"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const STILL_IMAGE = "/generated/design-styles/neon-noir.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent)]" as const;

type CaseId = "07" | "04" | "11";
type CaseStatus = "open" | "cold" | "closed";

type CaseFile = {
  readonly id: CaseId;
  readonly title: string;
  readonly status: CaseStatus;
  readonly headline: string;
  readonly slug: string;
  readonly still: string;
  readonly lastEntry: string;
};

const CASES: readonly CaseFile[] = [
  {
    id: "07",
    title: "The Marlow Job",
    status: "open",
    headline: "Someone left the light on.",
    slug: "night 3 · Belltown stakeout",
    still: "still 02 / 24",
    lastEntry: "last entry 03:12",
  },
  {
    id: "04",
    title: "Glass Harbor",
    status: "cold",
    headline: "The rain kept the secrets.",
    slug: "pier 19 · last seen 02:40",
    still: "still 11 / 18",
    lastEntry: "last entry apr 02",
  },
  {
    id: "11",
    title: "Vesper Motel",
    status: "closed",
    headline: "Room 6 never checked out.",
    slug: "route 9 · closed may 12",
    still: "still 24 / 24",
    lastEntry: "filed · archived",
  },
];

const STATUS_STYLE: Record<CaseStatus, { readonly label: string; readonly className: string }> = {
  open: { label: "Open", className: "border-[var(--sample-accent)] text-[var(--sample-accent)]" },
  cold: { label: "Cold", className: "border-[var(--sample-accent-2)] text-[var(--sample-accent-2)]" },
  closed: { label: "Closed", className: "border-[rgb(142_138_166_/_0.5)] text-[var(--sample-muted)]" },
};

type RedRoomCaseDeskProps = {
  readonly compact?: boolean;
};

export function RedRoomCaseDesk({ compact = false }: RedRoomCaseDeskProps) {
  const [caseId, setCaseId] = useState<CaseId>("07");
  const activeCase = CASES.find((entry) => entry.id === caseId) ?? CASES[0];

  return (
    <div
      className={cn(
        "redroom-desk relative grid min-w-0 text-[var(--sample-text)]",
        compact
          ? "h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-1.5"
          : "min-h-[720px] grid-rows-[auto_minmax(0,1fr)_auto] gap-2.5 md:h-full md:min-h-0",
      )}
    >
      {/* ── quiet masthead ── */}
      <header className="relative z-10 flex min-w-0 items-baseline gap-3">
        <span
          className={cn("shrink-0 whitespace-nowrap font-bold uppercase leading-none", compact ? "text-[10px] tracking-[0.22em]" : "text-[12px] tracking-[0.22em] sm:text-[15px] sm:tracking-[0.34em]")}
          style={{ fontFamily: "var(--st-font-display)", textShadow: "0 0 14px rgb(255 46 99 / 0.45)" }}
        >
          RED ROOM
        </span>
        <nav className={compact ? "hidden" : "hidden min-w-0 items-baseline gap-3 overflow-hidden sm:flex"}>
          {(["Cases", "Stills", "Archive"] as const).map((item) => (
            <span
              className={cn(
                "whitespace-nowrap text-[7.5px] uppercase tracking-[0.24em]",
                item === "Cases" ? "text-[var(--sample-text)] underline decoration-[var(--sample-accent)] underline-offset-4" : "text-[var(--sample-muted)]",
              )}
              key={item}
            >
              {item}
            </span>
          ))}
        </nav>
        <span className={cn("ml-auto flex shrink-0 items-baseline", compact ? "gap-1.5" : "gap-2.5")}>
          <span className={cn("whitespace-nowrap uppercase text-[var(--sample-muted)]", compact ? "hidden" : "hidden text-[7px] tracking-[0.2em] sm:inline")}>night desk · open till 4</span>
          <span className={cn("whitespace-nowrap font-bold tabular-nums text-[var(--sample-accent)]", compact ? "text-[7px] tracking-[0.1em]" : "text-[8px] tracking-[0.08em] sm:text-[9px] sm:tracking-[0.14em]")}>03:12 AM</span>
        </span>
      </header>

      {/* ── cinematic still: the image is the page ── */}
      <section
        aria-label="Case still"
        className="relative z-10 min-h-0 min-w-0 overflow-hidden rounded-[2px] border border-[var(--sample-border)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url('${STILL_IMAGE}')`, backgroundPosition: "center 42%" }}
        />
        {/* legibility scrim only where the caption sits — never smother the still */}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[42%]" style={{ backgroundImage: "linear-gradient(180deg, transparent, rgb(5 5 9 / 0.82))" }} />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 90px 18px rgb(0 0 0 / 0.55)" }} />

        <span className={cn("absolute left-2.5 top-2.5 z-10 whitespace-nowrap border border-[rgb(255_46_99_/_0.55)] bg-black/45 font-bold uppercase text-[var(--sample-accent)]", compact ? "px-1.5 py-0.5 text-[5.5px] tracking-[0.18em]" : "px-2 py-1 text-[7px] tracking-[0.26em]")}>
          case file {activeCase.id}
        </span>

        <div className={cn("absolute right-2.5 top-2.5 z-10 border border-[rgb(91_108_255_/_0.45)] bg-black/45 text-right", compact ? "px-1.5 py-1" : "px-2 py-1.5")}>
          <p className={cn("whitespace-nowrap uppercase text-[var(--sample-muted)]", compact ? "text-[4.5px] tracking-[0.16em]" : "text-[6px] tracking-[0.22em]")}>rain index</p>
          <p className={cn("mt-0.5 flex items-center justify-end gap-1 whitespace-nowrap font-bold tabular-nums text-[var(--sample-accent-2)]", compact ? "text-[6px]" : "text-[8px] tracking-[0.08em]")}>
            <span aria-hidden="true" className="flex items-end gap-[2px]">
              {[3, 5, 7, 9, 5].map((height, index) => (
                <span className="w-[2px] bg-[var(--sample-accent-2)]" key={index} style={{ height, opacity: index < 4 ? 0.9 : 0.3 }} />
              ))}
            </span>
            92 / heavy
          </p>
        </div>

        <div className={cn("absolute inset-x-0 bottom-0 z-10", compact ? "px-2.5 pb-2" : "px-4 pb-3.5")}>
          <p className={cn("uppercase text-[var(--sample-accent)]", compact ? "text-[5px] tracking-[0.2em]" : "text-[7px] tracking-[0.3em]")}>
            {activeCase.still} · {activeCase.slug}
          </p>
          <h3
            className={cn("mt-1 max-w-[24ch] leading-[0.95]", compact ? "text-[17px]" : "text-[30px] sm:text-[38px]")}
            style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", textShadow: "0 2px 22px rgb(0 0 0 / 0.9)" }}
          >
            {activeCase.headline}
          </h3>
          <p className={cn("mt-1 uppercase text-[var(--sample-muted)]", compact ? "hidden" : "text-[6.5px] tracking-[0.2em]")}>
            40mm · sodium red · wet pavement · no flash
          </p>
        </div>

        <span className={cn("absolute bottom-2.5 right-2.5 z-10 items-center gap-1.5 whitespace-nowrap uppercase text-[var(--sample-muted)]", compact ? "hidden" : "hidden text-[6px] tracking-[0.2em] sm:flex")}>
          <span aria-hidden="true" className="nn-rec h-1.5 w-1.5 rounded-full bg-[var(--sample-accent)]" style={{ boxShadow: "0 0 8px rgb(255 46 99 / 0.9)" }} />
          surveillance still
        </span>
      </section>

      {/* ── case file rail ── */}
      <section aria-label="Case file rail" className={cn("relative z-10 grid min-w-0", compact ? "grid-cols-3 gap-1" : "grid-cols-1 gap-1.5 sm:grid-cols-3")}>
        {CASES.map((entry) => {
          const active = entry.id === caseId;
          const status = STATUS_STYLE[entry.status];
          return (
            <button
              aria-label={`Case file ${entry.id}, ${entry.title}`}
              aria-pressed={active}
              className={cn(
                FOCUS,
                "min-w-0 border-l-2 bg-[var(--sample-surface)] text-left transition-colors",
                compact ? "px-1.5 py-1" : "px-2.5 py-2",
                active
                  ? "border-l-[var(--sample-accent)]"
                  : "border-l-[rgb(42_42_60_/_0.9)] hover:border-l-[rgb(255_46_99_/_0.5)]",
              )}
              key={entry.id}
              onClick={() => setCaseId(entry.id)}
              style={active ? { boxShadow: "inset 0 0 26px rgb(255 46 99 / 0.08)" } : undefined}
              type="button"
            >
              <span className="flex min-w-0 items-baseline gap-1.5">
                <span className={cn("shrink-0 font-bold tabular-nums", compact ? "text-[6px] tracking-[0.1em]" : "text-[8px] tracking-[0.16em]", active ? "text-[var(--sample-accent)]" : "text-[var(--sample-muted)]")}>
                  Case {entry.id}
                </span>
                <span className={cn("ml-auto shrink-0 whitespace-nowrap border px-1 py-px uppercase", compact ? "text-[4px] tracking-[0.08em]" : "text-[5.5px] tracking-[0.14em]", status.className)}>
                  {status.label}
                </span>
              </span>
              <span className={cn("mt-0.5 block truncate", compact ? "text-[6.5px]" : "text-[10px]", "text-[var(--sample-text)]")} style={{ fontFamily: "var(--st-font-display)" }}>
                {entry.title}
              </span>
              <span className={cn("mt-0.5 block truncate uppercase text-[var(--sample-muted)]", compact ? "hidden" : "text-[6px] tracking-[0.16em]")}>
                {entry.lastEntry}
              </span>
            </button>
          );
        })}
      </section>
    </div>
  );
}
