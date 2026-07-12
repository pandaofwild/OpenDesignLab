"use client";

import { useState } from "react";

const SOURCES = [
  { id: "fm", label: "FM 88.3", needle: "18%" },
  { id: "phono", label: "PHONO", needle: "52%" },
  { id: "tape", label: "TAPE", needle: "82%" },
] as const;

const SESSIONS = [
  { time: "18:07", title: "Quark / first pressing", host: "Mika Sato · vinyl", seats: "6 seats", state: "ON AIR" },
  { time: "19:35", title: "Pacific synthesis", host: "Theo Park · reel-to-reel", seats: "2 seats", state: "NEXT" },
  { time: "21:10", title: "Midnight bossa archive", host: "Inez Cole · selector set", seats: "0 seats", state: "SOLD OUT" },
] as const;

const CLOTHS = [
  { id: "teal", label: "Teal weave", color: "var(--sample-accent)", texture: "repeating-linear-gradient(90deg, transparent 0 2px, rgb(var(--st-base-rgb) / 0.22) 2px 3px)" },
  { id: "ochre", label: "Ochre grid", color: "var(--sample-accent-2)", texture: "repeating-linear-gradient(0deg, transparent 0 3px, rgb(var(--st-text-rgb) / 0.18) 3px 4px)" },
  { id: "rust", label: "Rust check", color: "var(--sample-accent-3)", texture: "repeating-linear-gradient(45deg, transparent 0 3px, rgb(var(--st-base-rgb) / 0.2) 3px 4px)" },
  { id: "ivory", label: "Ivory stripe", color: "var(--sample-primary)", texture: "repeating-linear-gradient(135deg, transparent 0 4px, rgb(var(--st-border-rgb) / 0.28) 4px 5px)" },
] as const;

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent)]" as const;

type MidCenturyListeningRoomProps = {
  readonly compact?: boolean;
};

export function MidCenturyListeningRoom({ compact = false }: MidCenturyListeningRoomProps) {
  const [activeSourceId, setActiveSourceId] = useState<(typeof SOURCES)[number]["id"]>("phono");
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeClothId, setActiveClothId] = useState<(typeof CLOTHS)[number]["id"]>("teal");
  const [isSeatReserved, setIsSeatReserved] = useState(false);
  const activeSource = SOURCES.find((source) => source.id === activeSourceId) ?? SOURCES[1];
  const activeCloth = CLOTHS.find((cloth) => cloth.id === activeClothId) ?? CLOTHS[0];

  return (
    <div className={compact ? "relative grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-1" : "relative grid min-h-[720px] grid-rows-[auto_minmax(0,1fr)_auto] gap-3 md:h-full md:min-h-0"}>
      <header className={compact ? "flex items-center gap-1 border-b border-[var(--sample-border)] pb-1 uppercase" : "flex items-center gap-2 border-b border-[var(--sample-border)] pb-2 uppercase"}>
        <div className="min-w-0">
          <p className={compact ? "font-display text-[9px] leading-none tracking-[0.18em]" : "font-display text-sm leading-none tracking-[0.22em]"} style={{ fontFamily: "var(--st-font-display)" }}>MONO HOUSE</p>
          <p className={compact ? "mt-0.5 text-[6px] tracking-[0.16em] text-[var(--sample-muted)]" : "mt-1 text-[8px] tracking-[0.2em] text-[var(--sample-muted)]"}>LISTENING ROOM NO. 06</p>
        </div>
        <span className={compact ? "ml-auto border-l border-[var(--sample-border)] pl-2 text-[6px] tracking-[0.14em]" : "ml-auto border-l border-[var(--sample-border)] pl-3 text-[9px] tracking-[0.18em]"}>{isPlaying ? "ON AIR" : "PAUSED"}</span>
        <span className={compact ? "hidden" : "text-[9px] tracking-[0.18em] text-[var(--sample-muted)]"}>MEMBERS / 24</span>
        <button aria-label="Seat reservation" aria-pressed={isSeatReserved} className={`${FOCUS} border border-[var(--sample-border)] bg-[var(--sample-surface)] transition-colors hover:border-[var(--sample-accent)] active:bg-[var(--sample-border-soft)] ${compact ? "hidden" : "px-3 py-1.5"}`} onClick={() => setIsSeatReserved((reserved) => !reserved)} type="button">
          <span className={compact ? "text-[6px] leading-none uppercase tracking-[0.1em]" : "text-[8px] leading-none uppercase tracking-[0.16em]"}>{isSeatReserved ? "SEAT HELD" : "RESERVE A SEAT"}</span>
        </button>
      </header>

      <div className={compact ? "grid min-h-0 grid-cols-[3fr_2fr] gap-1.5" : "grid min-h-0 grid-cols-1 gap-3 md:grid-cols-[3fr_2fr]"}>
        <section className={compact ? "grid min-h-0 grid-rows-[auto_1fr]" : "grid min-h-[260px] grid-rows-[auto_1fr]"}>
          <h2 className={compact ? "pb-1 text-[6px] uppercase tracking-[0.18em] text-[var(--sample-muted)]" : "pb-1.5 text-[8px] uppercase tracking-[0.24em] text-[var(--sample-muted)]"}>SIDE A / LISTENING FLOOR</h2>
          <div className="relative min-h-0 overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)] bg-cover bg-center" style={{ backgroundImage: "linear-gradient(180deg, rgb(var(--st-base-rgb) / 0.06), rgb(var(--st-base-rgb) / 0.2)), url('/generated/design-styles/mid-century-modern.webp')" }}>
            <div className={compact ? "absolute left-1.5 top-1.5 bg-[var(--sample-primary)] px-1.5 py-1 text-[var(--sample-base)]" : "absolute left-3 top-3 bg-[var(--sample-primary)] px-3 py-2 text-[var(--sample-base)]"}>
              <p className={compact ? "text-[5px] uppercase tracking-[0.16em]" : "text-[7px] uppercase tracking-[0.2em]"}>NOW PLAYING · MH-006</p>
              <p className={compact ? "mt-0.5 font-display text-[8px] leading-none" : "mt-1 font-display text-sm leading-none"} style={{ fontFamily: "var(--st-font-display)" }}>Jun Fukamachi / Quark</p>
            </div>
            <span className={compact ? "absolute bottom-1.5 right-1.5 border-t border-[var(--sample-primary)] pt-0.5 text-[5px] uppercase tracking-[0.1em] text-[var(--sample-primary)]" : "absolute bottom-3 right-3 border-t border-[var(--sample-primary)] pt-1 text-[7px] uppercase tracking-[0.16em] text-[var(--sample-primary)]"}>Noguchi glass table · 1948</span>
          </div>
        </section>

        <section className={compact ? "grid min-h-0 grid-rows-[auto_1fr]" : "grid min-h-[260px] grid-rows-[auto_1fr]"}>
          <h2 className={compact ? "pb-1 text-[6px] uppercase tracking-[0.18em] text-[var(--sample-muted)]" : "pb-1.5 text-[8px] uppercase tracking-[0.24em] text-[var(--sample-muted)]"}>SIDE B / CONTROL RECEIVER</h2>
          <div className={compact ? "grid min-h-0 grid-rows-[auto_auto_auto_minmax(0,1fr)] overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)] p-1" : "grid min-h-0 grid-rows-[auto_auto_1fr] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3"} style={{ backgroundImage: "linear-gradient(100deg, rgb(var(--st-text-rgb) / 0.04), transparent 32%, rgb(var(--st-text-rgb) / 0.08) 52%, transparent 74%)" }}>
            <div>
              <div className={compact ? "hidden" : "flex justify-between text-[7px] text-[var(--sample-muted)]"}>{[88, 92, 96, 100, 104, 108].map((frequency) => <span key={frequency}>{frequency}</span>)}</div>
              <div className={compact ? "relative mt-0.5 h-2 border-y border-[var(--sample-border)]" : "relative mt-1 h-3 border-y border-[var(--sample-border)]"} style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 9%, rgb(var(--st-border-rgb) / 0.48) 9% 9.5%)" }}>
                <span aria-hidden="true" className="absolute inset-y-[-2px] w-px bg-[var(--sample-accent)]" style={{ left: activeSource.needle }} />
              </div>
            </div>
            <div className={compact ? "mt-0.5" : "mt-2"}>
              <p className={compact ? "mb-0.5 text-[5px] uppercase leading-none tracking-[0.06em] text-[var(--sample-muted)]" : "sr-only"}>Walnut source rail</p>
              <div className={compact ? "grid grid-cols-3 gap-0.5" : "grid grid-cols-3 gap-1"}>
                {SOURCES.map((source) => (
                  <button aria-pressed={activeSourceId === source.id} className={`${FOCUS} border transition-colors hover:border-[var(--sample-accent)] active:bg-[var(--sample-border-soft)] ${activeSourceId === source.id ? "border-[var(--sample-accent)] bg-[var(--sample-base)] text-[var(--sample-accent)]" : "border-[var(--sample-border)] text-[var(--sample-muted)]"} ${compact ? "min-h-6 min-w-6 px-0.5 py-0.5" : "px-1 py-1"}`} key={source.id} onClick={() => setActiveSourceId(source.id)} style={{ fontSize: 0 }} type="button"><span className={compact ? "text-[5px] leading-none uppercase" : "text-[7px] leading-none uppercase tracking-[0.08em]"}>{source.label}</span></button>
                ))}
              </div>
            </div>
            <div className={compact ? "mt-0.5 grid min-h-0 grid-cols-[1fr_auto] gap-1 border-t border-[var(--sample-border)] pt-0.5" : "mt-3 grid min-h-0 grid-cols-[1fr_auto] gap-3 border-t border-[var(--sample-border)] pt-3"}>
              <div className="min-w-0">
                <p className={compact ? "text-[5px] uppercase tracking-[0.1em] text-[var(--sample-muted)]" : "text-[7px] uppercase tracking-[0.16em] text-[var(--sample-muted)]"}>SOURCE / {activeSource.label}</p>
                <p className={compact ? "truncate text-[7px]" : "mt-1 truncate font-display text-xs"} style={{ fontFamily: "var(--st-font-display)" }}>Jun Fukamachi / Quark</p>
                <div className={compact ? "hidden" : "mt-2 flex items-center gap-2 text-[7px] text-[var(--sample-muted)]"}>
                  <span>03:42</span><span aria-label="Track progress" aria-valuemax={486} aria-valuemin={0} aria-valuenow={222} className="h-px flex-1 bg-[var(--sample-border)]" role="progressbar"><span className="block h-px w-[46%] bg-[var(--sample-accent)]" /></span><span>08:06</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="flex items-center">
                  <button aria-label="Previous track" className={compact ? "hidden" : "grid h-7 w-7 cursor-not-allowed place-items-center opacity-40"} disabled type="button"><svg aria-hidden="true" fill="currentColor" height={compact ? 7 : 11} viewBox="0 0 12 12" width={compact ? 7 : 11}><path d="M2 2h1v8H2zm2 4 6-4v8z" /></svg></button>
                  <button aria-label="Playback" aria-pressed={isPlaying} className={`${FOCUS} grid place-items-center border border-[var(--sample-border)] hover:border-[var(--sample-accent)] active:bg-[var(--sample-border-soft)] ${compact ? "h-6 w-6" : "h-8 w-8"}`} onClick={() => setIsPlaying((playing) => !playing)} type="button">
                    {isPlaying ? <svg aria-hidden="true" fill="currentColor" height={compact ? 7 : 11} viewBox="0 0 12 12" width={compact ? 7 : 11}><path d="M2.5 2h2.2v8H2.5zm4.8 0h2.2v8H7.3z" /></svg> : <svg aria-hidden="true" fill="currentColor" height={compact ? 7 : 11} viewBox="0 0 12 12" width={compact ? 7 : 11}><path d="m3 2 7 4-7 4z" /></svg>}
                  </button>
                  <button aria-label="Next track" className={compact ? "hidden" : "grid h-7 w-7 cursor-not-allowed place-items-center opacity-40"} disabled type="button"><svg aria-hidden="true" fill="currentColor" height={compact ? 7 : 11} viewBox="0 0 12 12" width={compact ? 7 : 11}><path d="m2 2 6 4-6 4zm7 0h1v8H9z" /></svg></button>
                </div>
                <span className={compact ? "hidden" : "text-[7px] tracking-[0.12em] text-[var(--sample-muted)]"}>VOLUME / 62</span>
              </div>
            </div>
            <div className={compact ? "grid min-h-0 grid-cols-[auto_1fr] gap-1 overflow-hidden border-t border-[var(--sample-border)] pt-0.5" : "hidden"}>
              <div className="min-w-0">
                <p className="mb-0.5 text-[5px] uppercase leading-none tracking-[0.06em] text-[var(--sample-muted)]">Girard acoustic cloth</p>
                <div className="flex gap-0.5">
                  {CLOTHS.map((cloth) => (
                    <button aria-label={`Select ${cloth.label}`} aria-pressed={activeClothId === cloth.id} className={`${FOCUS} h-6 w-6 border transition-transform hover:-translate-y-0.5 active:translate-y-0 ${activeClothId === cloth.id ? "outline outline-1 -outline-offset-2 outline-[var(--sample-text)]" : "border-[var(--sample-border)]"}`} key={cloth.id} onClick={() => setActiveClothId(cloth.id)} style={{ backgroundColor: cloth.color, backgroundImage: cloth.texture }} type="button" />
                  ))}
                </div>
              </div>
              <div className="min-w-0 overflow-hidden">
                <p className="mb-0.5 text-[5px] uppercase leading-none tracking-[0.06em] text-[var(--sample-muted)]">Session queue</p>
                <div className="divide-y divide-[var(--sample-border)]">
                  {SESSIONS.slice(0, 2).map((session) => (
                    <div className="grid grid-cols-[auto_auto] justify-between gap-1 py-0.5 text-[5px] leading-none" key={session.time}>
                      <span className="text-[var(--sample-accent)]">{session.time}</span>
                      <span className="text-right text-[var(--sample-accent)]">{session.state}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={compact ? "hidden" : "grid grid-cols-1 gap-3 md:grid-cols-[0.82fr_1.18fr]"}>
        <div className="grid grid-rows-2 gap-3">
          <section className={compact ? "border border-[var(--sample-border)] px-1.5 py-1" : "border border-[var(--sample-border)] p-3"}>
            <h3 className={compact ? "text-[5px] uppercase tracking-[0.08em]" : "text-[8px] uppercase tracking-[0.18em]"}>Walnut source rail</h3>
            <div className={compact ? "mt-1 grid grid-cols-3 gap-px border-y border-[var(--sample-border)]" : "mt-3 grid h-12 grid-cols-3 gap-px border-y border-[var(--sample-border)]"} style={{ backgroundColor: "var(--sample-accent-3)", backgroundImage: "repeating-linear-gradient(90deg, transparent 0 7px, rgb(var(--st-base-rgb) / 0.48) 7px 9px)" }}>
              {SOURCES.map((source) => (
                <button aria-pressed={activeSourceId === source.id} className={`${FOCUS} border-x border-[var(--sample-border)] transition-colors hover:bg-[rgb(var(--st-base-rgb)/0.28)] active:bg-[var(--sample-border-soft)] ${activeSourceId === source.id ? "bg-[var(--sample-base)] text-[var(--sample-accent)] outline outline-1 -outline-offset-2 outline-[var(--sample-accent)]" : "bg-transparent text-[var(--sample-primary)]"} ${compact ? "min-h-6 min-w-6 px-0.5 py-0.5" : "px-2 py-1"}`} key={source.id} onClick={() => setActiveSourceId(source.id)} style={{ fontSize: 0 }} type="button"><span className={compact ? "text-[5px] leading-none uppercase" : "text-[7px] leading-none uppercase tracking-[0.1em]"}>{source.label}</span></button>
              ))}
            </div>
          </section>
          <section className={compact ? "grid grid-cols-[1fr_auto] items-center border border-[var(--sample-border)] px-1.5 py-1" : "border border-[var(--sample-border)] p-3"}>
            <div>
              <h3 className={compact ? "text-[5px] uppercase tracking-[0.08em]" : "text-[8px] uppercase tracking-[0.18em]"}>Girard acoustic cloth</h3>
              <div className={compact ? "mt-1 flex gap-0.5" : "mt-3 flex gap-1.5"}>
                {CLOTHS.map((cloth) => (
                  <button aria-label={`Select ${cloth.label}`} aria-pressed={activeClothId === cloth.id} className={`${FOCUS} border transition-transform hover:-translate-y-0.5 active:translate-y-0 ${activeClothId === cloth.id ? "outline outline-1 outline-offset-1 outline-[var(--sample-text)]" : "border-[var(--sample-border)]"} ${compact ? "h-6 w-6" : "h-8 flex-1"}`} key={cloth.id} onClick={() => setActiveClothId(cloth.id)} style={{ backgroundColor: cloth.color, backgroundImage: cloth.texture }} type="button" />
                ))}
              </div>
            </div>
            <span aria-hidden="true" className={compact ? "ml-1 h-6 w-5 border border-[var(--sample-border)]" : "mt-2 block h-7 border border-[var(--sample-border)]"} style={{ backgroundColor: activeCloth.color, backgroundImage: activeCloth.texture }} />
          </section>
        </div>
        <section className={compact ? "border border-[var(--sample-border)] px-1.5 py-1" : "border border-[var(--sample-border)] p-3"}>
          <h3 className={compact ? "mb-0.5 text-[5px] uppercase tracking-[0.08em]" : "mb-2 text-[8px] uppercase tracking-[0.18em]"}>Session queue</h3>
          <div className="divide-y divide-[var(--sample-border)]">
            {SESSIONS.map((session, index) => (
              <div className={`${compact ? "grid-cols-[auto_1fr_auto] gap-1 py-0.5 text-[5px]" : "grid-cols-[auto_1fr_auto_auto] gap-3 py-1.5 text-[8px]"} ${compact && index === 2 ? "hidden" : "grid"}`} key={session.time}>
                <span className="text-[var(--sample-accent)]">{session.time}</span>
                <span className="min-w-0"><span className="block truncate uppercase">{session.title}</span><span className={compact ? "hidden" : "block truncate text-[var(--sample-muted)]"}>{session.host}</span></span>
                <span className={compact ? "hidden" : "text-[var(--sample-muted)]"}>{session.seats}</span>
                <span className="text-right text-[var(--sample-accent)]">{session.state}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
