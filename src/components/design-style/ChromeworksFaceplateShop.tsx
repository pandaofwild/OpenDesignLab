"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const SHELL_IMAGE = "/generated/design-styles/chromecore.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent-2)]" as const;

/* Molded-chrome material language — the gradients are kept from the previous
   Chromecore build because they are the style's actual substance. */
const CHROME_TEXT: CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, #ffffff 0%, #b9c0cc 18%, #727b90 34%, #ffffff 48%, #9da7b8 64%, #f8fbff 78%, #6f788a 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};
/* Controls get anodised metal, not mirror chrome: a multi-band 135° mirror
   crammed into a 20px pill reads as WordArt rather than hardware, so the
   control surface keeps a single soft horizon flip and stays in the lights. */
const CHROME_SURFACE =
  "linear-gradient(180deg, #ffffff 0%, #f3f6fb 44%, #dae1eb 54%, #eaeff6 82%, #dce3ed 100%)";
const RAIL_SURFACE =
  "linear-gradient(180deg, #fdfeff 0%, #e6ebf3 38%, #c2cbd8 56%, #e9eef5 78%, #d2d9e4 100%)";
const BLUE_LENS = "radial-gradient(circle at 34% 26%, #ffffff 0%, #8ee7ff 18%, #4a63ff 46%, #12172a 78%)";
const STAR_CLIP = "polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%)";

type PlateId = "mirror" | "brushed" | "gunmetal" | "pearl" | "cobalt";
type FitId = "3310" | "3510" | "6800" | "7650" | "8310";

type Plate = {
  readonly id: PlateId;
  readonly name: string;
  readonly code: string;
  readonly position: string;
  readonly price: string;
};

type Fit = {
  readonly id: FitId;
  readonly label: string;
  readonly stock: number;
  readonly ships: string;
};

const PLATES: readonly Plate[] = [
  { id: "mirror", name: "Mirror", code: "CW-101", position: "5% 50%", price: "¥4,800" },
  { id: "brushed", name: "Brushed", code: "CW-204", position: "27% 50%", price: "¥3,900" },
  { id: "gunmetal", name: "Gunmetal", code: "CW-330", position: "50% 50%", price: "¥4,200" },
  { id: "pearl", name: "Pearl", code: "CW-418", position: "73% 50%", price: "¥3,600" },
  { id: "cobalt", name: "Cobalt", code: "CW-520", position: "95% 50%", price: "¥4,400" },
];

const FITS: readonly Fit[] = [
  { id: "3310", label: "3310", stock: 42, ships: "Ships Tue" },
  { id: "3510", label: "3510", stock: 17, ships: "Ships Tue" },
  { id: "6800", label: "6800", stock: 6, ships: "Ships Fri" },
  { id: "7650", label: "7650", stock: 0, ships: "Back-order" },
  { id: "8310", label: "8310", stock: 23, ships: "Ships Wed" },
];

const NAV_ITEMS = ["Faceplates", "Finishes", "Fitment", "Trade-in"] as const;

function Shell({
  active,
  compact,
  plate,
}: {
  readonly active: boolean;
  readonly compact: boolean;
  readonly plate: Plate;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block shrink-0 overflow-hidden border border-[var(--sample-border)] bg-cover transition-[height,width]",
        compact
          ? active
            ? "h-[64px] w-[37px] rounded-[10px]"
            : "h-[48px] w-[28px] rounded-[8px]"
          : active
            ? "h-[168px] w-[97px] rounded-[24px]"
            : "h-[126px] w-[73px] rounded-[18px]",
      )}
      style={{
        backgroundImage: `url('${SHELL_IMAGE}')`,
        backgroundSize: "620% auto",
        backgroundPosition: plate.position,
        boxShadow: active
          ? "0 16px 28px rgb(22 24 29 / 0.36), inset 0 1px 0 rgb(255 255 255 / 0.95)"
          : "0 7px 14px rgb(22 24 29 / 0.24), inset 0 1px 0 rgb(255 255 255 / 0.75)",
      }}
    >
      {/* blue lens accent */}
      <span
        className={cn(
          "absolute left-1/2 -translate-x-1/2 rounded-full border border-[rgb(22_24_29_/_0.55)]",
          compact ? "top-1 h-1.5 w-1.5" : active ? "top-2 h-3 w-3" : "top-1.5 h-2 w-2",
        )}
        style={{ backgroundImage: BLUE_LENS, boxShadow: "0 0 8px rgb(74 99 255 / 0.65)" }}
      />
      {/* specular star flash */}
      <span
        className={cn("absolute bg-white", compact ? "right-1 top-2.5 h-1.5 w-1.5" : active ? "right-2 top-5 h-3 w-3" : "right-1.5 top-4 h-2 w-2")}
        style={{ clipPath: STAR_CLIP, filter: "drop-shadow(0 0 6px #fff)" }}
      />
      {active ? (
        <span
          aria-hidden="true"
          className="cw-glint pointer-events-none absolute inset-y-0 w-1/2 opacity-80"
          style={{ backgroundImage: "linear-gradient(100deg, transparent, rgb(255 255 255 / 0.9), transparent)" }}
        />
      ) : null}
    </span>
  );
}

function ArrowIcon({ direction }: { readonly direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" fill="none" height={9} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 8 10" width={7}>
      <path d={direction === "left" ? "M6 1 2 5l4 4" : "M2 1l4 4-4 4"} />
    </svg>
  );
}

type ChromeworksFaceplateShopProps = {
  readonly compact?: boolean;
};

export function ChromeworksFaceplateShop({ compact = false }: ChromeworksFaceplateShopProps) {
  const [plateId, setPlateId] = useState<PlateId>("gunmetal");
  const [fitId, setFitId] = useState<FitId>("3310");
  const activeIndex = PLATES.findIndex((plate) => plate.id === plateId);
  const activePlate = PLATES[activeIndex] ?? PLATES[0];
  const activeFit = FITS.find((fit) => fit.id === fitId) ?? FITS[0];
  const soldOut = activeFit.stock === 0;

  function step(delta: number) {
    const next = (activeIndex + delta + PLATES.length) % PLATES.length;
    setPlateId(PLATES[next].id);
  }

  return (
    <div
      className={cn(
        "chromeworks relative grid min-w-0",
        compact
          ? "h-full min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-1"
          : "min-h-[720px] grid-rows-[auto_minmax(0,1fr)_auto_auto] gap-2.5 md:h-full md:min-h-0",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 70% at 18% 0%, rgb(255 255 255 / 0.8), transparent 62%), radial-gradient(50% 60% at 94% 100%, rgb(var(--st-accent-2-rgb) / 0.16), transparent 64%)",
        }}
      />

      {/* ── band 1 · black nameplate carrying the Y2K chrome type ── */}
      <header className="relative z-10 flex min-w-0 items-center gap-2">
        <div
          className={cn(
            "flex min-w-0 shrink-0 items-center rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] bg-[var(--sample-text)]",
            compact ? "px-2 py-1" : "px-3.5 py-1.5",
          )}
          style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.35), 0 6px 14px rgb(22 24 29 / 0.24)" }}
        >
          <span
            className={cn("whitespace-nowrap font-black leading-none", compact ? "text-[10px] tracking-[0.04em]" : "text-[17px] tracking-[0.02em]")}
            style={{ fontFamily: "var(--st-font-display)", ...CHROME_TEXT }}
          >
            CHROMEWORKS
          </span>
        </div>
        <nav className={compact ? "hidden" : "flex min-w-0 items-center gap-1.5 overflow-hidden"}>
          {NAV_ITEMS.map((item) => (
            <span
              className={cn(
                "whitespace-nowrap rounded-[var(--st-radius-pill)] border px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.08em]",
                item === "Faceplates"
                  ? "border-[var(--sample-border)] text-[var(--sample-text)]"
                  : "border-[rgb(22_24_29_/_0.28)] text-[var(--sample-muted)]",
              )}
              key={item}
              style={item === "Faceplates" ? { backgroundImage: CHROME_SURFACE } : undefined}
            >
              {item}
            </span>
          ))}
        </nav>
        <span
          className={cn(
            "ml-auto shrink-0 whitespace-nowrap rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] font-bold uppercase text-[var(--sample-text)]",
            compact ? "px-1.5 py-0.5 text-[6px] tracking-[0.06em]" : "px-3 py-1 text-[8px] tracking-[0.1em]",
          )}
          style={{ backgroundImage: CHROME_SURFACE }}
        >
          Basket (2)
        </span>
      </header>

      {/* ── band 2 · the dominant horizontal axis: shells standing on a chrome rail ── */}
      <section
        aria-label="Faceplate carousel"
        className={cn(
          "relative z-10 grid min-h-0 min-w-0 items-center overflow-hidden rounded-[var(--st-radius)] border border-[var(--sample-border)]",
          compact ? "px-1" : "px-3",
        )}
        style={{
          backgroundImage: "linear-gradient(180deg, #ffffff 0%, var(--sample-surface) 48%, #bcc4d1 100%)",
          boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.9), inset 0 -10px 24px rgb(22 24 29 / 0.14)",
        }}
      >
        <button
          aria-label="Previous faceplate"
          className={cn(
            FOCUS,
            "absolute left-1 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-[var(--sample-border)] text-[var(--sample-text)] transition-[filter] hover:brightness-110",
            compact ? "hidden" : "h-6 w-6",
          )}
          onClick={() => step(-1)}
          style={{ backgroundImage: CHROME_SURFACE, boxShadow: "inset 0 1px 0 #fff, 0 4px 10px rgb(22 24 29 / 0.24)" }}
          type="button"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          aria-label="Next faceplate"
          className={cn(
            FOCUS,
            "absolute right-1 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-[var(--sample-border)] text-[var(--sample-text)] transition-[filter] hover:brightness-110",
            compact ? "hidden" : "h-6 w-6",
          )}
          onClick={() => step(1)}
          style={{ backgroundImage: CHROME_SURFACE, boxShadow: "inset 0 1px 0 #fff, 0 4px 10px rgb(22 24 29 / 0.24)" }}
          type="button"
        >
          <ArrowIcon direction="right" />
        </button>

        {/* Shells stand on the rail: every button is bottom-aligned and its name
            plate has a fixed height, so the rail can sit exactly at their feet. */}
        <div className={cn("relative flex min-w-0 items-end justify-center", compact ? "gap-1.5" : "gap-4")}>
          <span
            aria-hidden="true"
            className={cn("absolute inset-x-0 z-0 rounded-full border-y border-[rgb(22_24_29_/_0.5)]", compact ? "h-[5px]" : "h-[9px]")}
            style={{ backgroundImage: RAIL_SURFACE, bottom: compact ? 8 : 9 }}
          />
          {PLATES.map((plate) => {
            const active = plate.id === plateId;
            return (
              <button
                aria-label={`${plate.name} faceplate, ${plate.code}`}
                aria-pressed={active}
                className={cn(FOCUS, "relative z-10 flex shrink-0 flex-col items-center rounded-[10px]")}
                key={plate.id}
                onClick={() => setPlateId(plate.id)}
                type="button"
              >
                <Shell active={active} compact={compact} plate={plate} />
                <span
                  className={cn(
                    "mt-1 flex items-center whitespace-nowrap rounded-[var(--st-radius-pill)] border font-bold uppercase",
                    compact ? "h-[9px] px-1 text-[5px] tracking-[0.04em]" : "h-[15px] px-2 text-[7px] tracking-[0.08em]",
                    active ? "border-[var(--sample-border)] text-[var(--sample-text)]" : "border-transparent text-[var(--sample-muted)]",
                  )}
                  style={active ? { backgroundImage: CHROME_SURFACE } : undefined}
                >
                  {plate.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className={cn("absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-1", compact ? "bottom-0.5" : "bottom-1.5")}>
          {PLATES.map((plate) => (
            <span
              aria-hidden="true"
              className={cn("rounded-full border border-[rgb(22_24_29_/_0.4)]", compact ? "h-1 w-1" : "h-1.5 w-1.5")}
              key={plate.id}
              style={{ backgroundImage: plate.id === plateId ? BLUE_LENS : "linear-gradient(180deg, #fff, #a8b0be)" }}
            />
          ))}
        </div>
      </section>

      {/* ── band 3 · fitment rail ── */}
      <section
        aria-label="Fitment rail"
        className={cn(
          "relative z-10 flex min-w-0 items-center rounded-[var(--st-radius)] border border-[var(--sample-border)] bg-[var(--sample-surface)]",
          compact ? "gap-1 px-1.5 py-1" : "gap-2.5 px-3 py-2",
        )}
        style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.9)" }}
      >
        <span className={cn("shrink-0 whitespace-nowrap font-bold uppercase text-[var(--sample-muted)]", compact ? "text-[5px] tracking-[0.08em]" : "text-[7.5px] tracking-[0.14em]")}>
          Fits
        </span>
        <div className={cn("flex min-w-0 items-center", compact ? "gap-1" : "gap-1.5")}>
          {FITS.map((fit) => {
            const active = fit.id === fitId;
            return (
              <button
                aria-label={`Fits handset ${fit.label}`}
                aria-pressed={active}
                className={cn(
                  FOCUS,
                  "shrink-0 whitespace-nowrap rounded-[var(--st-radius-pill)] border font-bold tabular-nums transition-[filter] hover:brightness-105",
                  compact ? "px-1.5 py-0.5 text-[5.5px]" : "px-2.5 py-1 text-[8px]",
                  active
                    ? "border-[var(--sample-accent-2)] text-[var(--sample-text)]"
                    : "border-[rgb(22_24_29_/_0.32)] text-[var(--sample-muted)]",
                )}
                key={fit.id}
                onClick={() => setFitId(fit.id)}
                style={
                  active
                    ? { backgroundImage: CHROME_SURFACE, boxShadow: "0 0 0 2px rgb(74 99 255 / 0.3), inset 0 1px 0 #fff" }
                    : undefined
                }
                type="button"
              >
                {fit.label}
              </button>
            );
          })}
        </div>
        <span
          className={cn(
            "ml-auto min-w-0 shrink-0 truncate font-bold uppercase",
            compact ? "text-[5.5px] tracking-[0.04em]" : "text-[8px] tracking-[0.1em]",
            soldOut ? "text-[var(--sample-accent-2)]" : "text-[var(--sample-text)]",
          )}
        >
          {soldOut ? "Back-order" : `In stock ${activeFit.stock}`}
        </span>
      </section>

      {/* ── band 4 · order bar ── */}
      <section
        aria-label="Order bar"
        className={
          compact
            ? "hidden"
            : "relative z-10 flex min-w-0 items-center gap-3 rounded-[var(--st-radius)] border border-[var(--sample-border)] bg-[var(--sample-text)] px-3 py-2"
        }
        style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.3)" }}
      >
        <span className="min-w-0 shrink-0 whitespace-nowrap text-[7.5px] font-bold uppercase tracking-[0.12em] text-[var(--sample-accent-3)]">
          {activePlate.code} · {activePlate.name} chrome
        </span>
        <span className="hidden min-w-0 shrink-0 whitespace-nowrap text-[7.5px] font-bold uppercase tracking-[0.12em] text-[var(--sample-accent-3)] lg:inline">
          Handset {activeFit.label} · {activeFit.ships}
        </span>
        <span className="ml-auto shrink-0 whitespace-nowrap text-[9px] font-black tabular-nums text-[var(--sample-surface)]">
          {activePlate.price}
        </span>
        <button
          className={cn(
            FOCUS,
            "shrink-0 whitespace-nowrap rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] px-3 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)] transition-[filter] hover:brightness-110",
          )}
          style={{ backgroundImage: CHROME_SURFACE, boxShadow: "inset 0 1px 0 #fff" }}
          type="button"
        >
          {soldOut ? "Notify me" : "Snap it on"}
        </button>
      </section>
    </div>
  );
}
