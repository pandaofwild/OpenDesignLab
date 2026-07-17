"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const CANVAS_IMAGE = "/generated/design-styles/ai-aesthetic.webp";

const FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sample-accent-3)]" as const;

type StyleId = "cinematic" | "photoreal" | "illustration" | "concept";

type StylePreset = {
  readonly id: StyleId;
  readonly label: string;
  readonly scene: string;
  readonly steps: string;
};

const STYLE_PRESETS: readonly StylePreset[] = [
  { id: "cinematic", label: "Cinematic", scene: "Scene 07 · Atrium bloom", steps: "1024 × 1024 · 32 STEPS" },
  { id: "photoreal", label: "Photoreal", scene: "Scene 07 · Atrium bloom (photoreal pass)", steps: "1536 × 1024 · 44 STEPS" },
  { id: "illustration", label: "Illustration", scene: "Scene 07 · Atrium bloom (line pass)", steps: "1024 × 1024 · 24 STEPS" },
  { id: "concept", label: "Concept", scene: "Scene 07 · Atrium bloom (concept pass)", steps: "1024 × 1024 · 28 STEPS" },
] as const;

type QueueStatus = "rendering" | "queued" | "done";

type QueueItem = {
  readonly name: string;
  readonly status: QueueStatus;
  readonly progress?: number;
  readonly position: string;
};

const QUEUE: readonly QueueItem[] = [
  { name: "Atrium bloom", status: "rendering", progress: 64, position: "30% 35%" },
  { name: "Coral spire dusk", status: "queued", position: "70% 20%" },
  { name: "Glass forest", status: "done", position: "50% 70%" },
  { name: "Nebula garden", status: "queued", position: "85% 60%" },
];

const STATUS_LABEL: Record<QueueStatus, string> = {
  rendering: "Rendering",
  queued: "Queued",
  done: "Done",
};

function statusColor(status: QueueStatus): CSSProperties {
  if (status === "rendering") return { color: "var(--sample-accent)" };
  if (status === "done") return { color: "var(--sample-accent-2)" };
  return { color: "var(--sample-muted)" };
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" height={10} viewBox="0 0 12 12" width={10}>
      <path d="M6 0.5 L7.2 4.6 L11.5 6 L7.2 7.4 L6 11.5 L4.8 7.4 L0.5 6 L4.8 4.6 Z" fill="currentColor" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" height={10} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} viewBox="0 0 12 12" width={10}>
      <path d="M1 6h9M6.5 2 10 6l-3.5 4" />
    </svg>
  );
}

type LatentStudioPanelProps = {
  readonly compact?: boolean;
};

export function LatentStudioPanel({ compact = false }: LatentStudioPanelProps) {
  const [styleId, setStyleId] = useState<StyleId>("cinematic");
  const activeStyle = STYLE_PRESETS.find((preset) => preset.id === styleId) ?? STYLE_PRESETS[0];
  const visibleQueue = compact ? QUEUE.slice(0, 2) : QUEUE;

  return (
    <div className={cn("latent-studio relative grid", compact ? "h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-1.5" : "min-h-[720px] grid-rows-[auto_minmax(0,1fr)_auto] gap-3 md:h-full md:min-h-0")}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(120% 90% at 15% 0%, rgb(var(--st-accent-rgb) / 0.14), transparent 55%), radial-gradient(100% 80% at 100% 100%, rgb(var(--st-accent-3-rgb) / 0.1), transparent 55%)" }} />

      <header className={compact ? "relative z-10 flex min-w-0 items-baseline gap-2 border-b border-[rgb(var(--st-accent-rgb)/0.3)] pb-1" : "relative z-10 flex min-w-0 items-baseline gap-2.5 border-b border-[rgb(var(--st-accent-rgb)/0.3)] pb-2"}>
        <div className="min-w-0 shrink-0">
          <p className={compact ? "text-[9px] leading-none tracking-[0.16em] text-[var(--sample-text)]" : "text-sm leading-none tracking-[0.16em] text-[var(--sample-text)]"} style={{ fontFamily: "var(--st-font-display)" }}>MODEL CANVAS</p>
          <p className={compact ? "hidden" : "mt-1 whitespace-nowrap text-[7px] tracking-[0.14em] text-[var(--sample-muted)]"}>TEXT · IMAGE · VIDEO MODELS</p>
        </div>
        <nav className={compact ? "hidden" : "flex min-w-0 items-center gap-2.5 overflow-hidden"}>
          <span className="whitespace-nowrap border-b border-[var(--sample-accent)] pb-0.5 text-[9px] uppercase tracking-[0.14em] text-[var(--sample-text)]">Canvas</span>
          <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.14em] text-[var(--sample-muted)]">Gallery</span>
          <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.14em] text-[var(--sample-muted)]">Models</span>
        </nav>
        <div className={compact ? "ml-auto flex shrink-0 items-center gap-1.5" : "ml-auto flex shrink-0 items-center gap-2"}>
          <span className={compact ? "hidden" : "whitespace-nowrap rounded-full border border-[rgb(var(--st-accent-rgb)/0.5)] px-2.5 py-1 text-[8px] uppercase tracking-[0.12em] text-[var(--sample-accent)]"}>Nova-3</span>
          <button className={`${FOCUS} whitespace-nowrap rounded-full bg-[var(--sample-accent)] font-semibold text-[var(--sample-base)] ${compact ? "px-2 py-0.5 text-[6px] uppercase tracking-[0.1em]" : "px-3 py-1 text-[8px] uppercase tracking-[0.14em]"}`} type="button">Generate</button>
        </div>
      </header>

      <div className={compact ? "relative z-10 grid min-h-0 grid-rows-[minmax(0,1.3fr)_auto] gap-1.5" : "relative z-10 grid min-h-0 grid-rows-[minmax(0,1.35fr)_auto] gap-3"}>
        <section
          aria-label="World-model preview"
          className={compact ? "relative min-h-0 overflow-hidden rounded-[14px] border border-[rgb(var(--st-accent-rgb)/0.3)] bg-cover" : "relative min-h-[220px] overflow-hidden rounded-[14px] border border-[rgb(var(--st-accent-rgb)/0.3)] bg-cover md:min-h-0"}
          style={{
            backgroundImage: `linear-gradient(180deg, rgb(8 6 20 / 0.05), rgb(8 6 20 / 0.32)), url('${CANVAS_IMAGE}')`,
            backgroundPosition: "50% 42%",
            boxShadow: compact ? undefined : "0 0 46px rgb(var(--st-accent-rgb) / 0.28)",
          }}
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 rounded-[10px] border border-[rgb(var(--st-primary-rgb)/0.14)]" />
          <span
            aria-hidden="true"
            className={compact ? "hidden" : "latent-scan pointer-events-none absolute inset-x-0 top-0 h-8 opacity-70"}
            style={{ backgroundImage: "linear-gradient(180deg, rgb(var(--st-accent-3-rgb) / 0.55), transparent)" }}
          />
          <div className={compact ? "absolute left-1.5 top-1.5 rounded-full border border-[rgb(var(--st-accent-rgb)/0.5)] bg-[rgb(var(--st-base-rgb)/0.7)] px-1.5 py-0.5" : "absolute left-3 top-3 rounded-full border border-[rgb(var(--st-accent-rgb)/0.5)] bg-[rgb(var(--st-base-rgb)/0.7)] px-2.5 py-1 backdrop-blur-[2px]"}>
            <p className={compact ? "text-[5px] uppercase tracking-[0.12em] text-[var(--sample-accent-3)]" : "text-[7px] uppercase tracking-[0.14em] text-[var(--sample-accent-3)]"}>SEED 88213</p>
          </div>
          <div className={compact ? "hidden" : "absolute right-3 top-3 rounded-full border border-[rgb(var(--st-accent-rgb)/0.5)] bg-[rgb(var(--st-base-rgb)/0.7)] px-2.5 py-1 backdrop-blur-[2px]"}>
            <p className="text-[7px] uppercase tracking-[0.14em] text-[var(--sample-accent-3)]">{activeStyle.steps}</p>
          </div>
          <div className={compact ? "absolute bottom-1.5 left-1.5 rounded-[8px] border border-[rgb(var(--st-accent-rgb)/0.4)] bg-[rgb(var(--st-base-rgb)/0.78)] px-1.5 py-1 backdrop-blur-[2px]" : "absolute bottom-3 left-3 rounded-[10px] border border-[rgb(var(--st-accent-rgb)/0.4)] bg-[rgb(var(--st-base-rgb)/0.78)] px-3 py-2 backdrop-blur-[2px]"}>
            <p className={compact ? "text-[5px] uppercase tracking-[0.14em] text-[var(--sample-accent)]" : "text-[7px] uppercase tracking-[0.16em] text-[var(--sample-accent)]"}>WORLD MODEL PREVIEW</p>
            <p className={compact ? "mt-0.5 text-[6px] leading-tight text-[var(--sample-text)]" : "mt-1 text-[9px] leading-tight text-[var(--sample-text)]"}>{activeStyle.scene}</p>
          </div>
        </section>

        <div className={compact ? "grid min-h-0 min-w-0 grid-cols-[1.3fr_1fr] gap-1.5" : "grid min-h-0 min-w-0 grid-cols-1 gap-3 md:grid-cols-[1.5fr_1fr]"}>
          <section aria-label="Prompt bar" className={compact ? "min-w-0 rounded-[14px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" : "min-w-0 rounded-[14px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3"}>
            <div className={compact ? "flex min-w-0 items-center gap-1.5 rounded-full border border-[rgb(var(--st-accent-rgb)/0.35)] bg-[var(--sample-base)] px-2 py-1" : "flex min-w-0 items-center gap-2 rounded-full border border-[rgb(var(--st-accent-rgb)/0.35)] bg-[var(--sample-base)] px-3 py-1.5"}>
              <SparkIcon className={compact ? "shrink-0 text-[var(--sample-accent)]" : "shrink-0 text-[var(--sample-accent)]"} />
              <p className={compact ? "min-w-0 flex-1 truncate text-[6px] text-[var(--sample-muted)]" : "min-w-0 flex-1 truncate text-[9px] text-[var(--sample-muted)]"}>bioluminescent atrium, volumetric fog, cinematic light, 8k</p>
              <button aria-label="Run prompt" className={`${FOCUS} flex shrink-0 items-center justify-center rounded-full bg-[var(--sample-accent)] text-[var(--sample-base)] ${compact ? "h-4 w-4" : "h-5 w-5"}`} type="button">
                <SendIcon />
              </button>
            </div>
            <div className={compact ? "mt-1.5 hidden" : "mt-2.5 flex min-w-0 flex-wrap gap-1.5"}>
              {STYLE_PRESETS.map((preset) => {
                const selected = preset.id === styleId;
                return (
                  <button
                    aria-pressed={selected}
                    className={`${FOCUS} whitespace-nowrap rounded-full border px-2.5 py-1 text-[8px] uppercase tracking-[0.08em] transition-colors ${selected ? "border-[var(--sample-accent)] bg-[rgb(var(--st-accent-rgb)/0.16)] text-[var(--sample-text)]" : "border-[var(--sample-border)] text-[var(--sample-muted)] hover:border-[rgb(var(--st-accent-rgb)/0.5)]"}`}
                    key={preset.id}
                    onClick={() => setStyleId(preset.id)}
                    type="button"
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section aria-label="Latent queue" className={compact ? "min-h-0 min-w-0 rounded-[14px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" : "min-h-0 min-w-0 rounded-[14px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3"}>
            <div className="flex min-w-0 items-baseline justify-between gap-2">
              <p className={compact ? "whitespace-nowrap text-[5.5px] uppercase tracking-[0.14em] text-[var(--sample-accent)]" : "whitespace-nowrap text-[7.5px] uppercase tracking-[0.16em] text-[var(--sample-accent)]"}>LATENT QUEUE</p>
              <span className={compact ? "hidden" : "hidden whitespace-nowrap text-[7px] text-[var(--sample-muted)] lg:inline"}>4 active</span>
            </div>
            <div className={compact ? "mt-1 space-y-1" : "mt-2 space-y-1.5"}>
              {visibleQueue.map((item) => (
                <div className="flex min-w-0 items-center gap-1.5" key={item.name}>
                  <span aria-hidden="true" className={compact ? "h-4 w-4 shrink-0 overflow-hidden rounded-[4px] border border-[rgb(var(--st-primary-rgb)/0.14)] bg-cover" : "h-5 w-5 shrink-0 overflow-hidden rounded-[5px] border border-[rgb(var(--st-primary-rgb)/0.14)] bg-cover"} style={{ backgroundImage: `url('${CANVAS_IMAGE}')`, backgroundSize: "280%", backgroundPosition: item.position }} />
                  <div className="min-w-0 flex-1">
                    <p className={compact ? "truncate text-[6px] text-[var(--sample-text)]" : "truncate text-[8px] text-[var(--sample-text)]"}>{item.name}</p>
                    {item.status === "rendering" ? (
                      <div className={compact ? "mt-0.5 h-0.5 rounded-full bg-[var(--sample-border)]" : "mt-1 h-1 rounded-full bg-[var(--sample-border)]"}>
                        <span className="block h-full rounded-full bg-[var(--sample-accent)]" style={{ width: `${item.progress}%` }} />
                      </div>
                    ) : null}
                  </div>
                  <span className={compact ? "shrink-0 text-[5px] uppercase tracking-[0.06em]" : "shrink-0 text-[7px] uppercase tracking-[0.08em]"} style={statusColor(item.status)}>
                    {item.status === "rendering" ? `${item.progress}%` : STATUS_LABEL[item.status]}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className={compact ? "hidden" : "relative z-10 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-3 border-t border-[rgb(var(--st-accent-rgb)/0.3)] pt-3"}>
        {(
          [
            ["NOVA-3", "12B · Photoreal"],
            ["ARIA-XL", "Illustration · fast"],
            ["SCENECRAFT", "Video · beta"],
          ] as const
        ).map(([name, spec]) => (
          <div className="min-w-0 rounded-[10px] border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.55)] px-2.5 py-1.5" key={name}>
            <p className="truncate text-[8px] font-semibold text-[var(--sample-text)]">{name}</p>
            <p className="truncate text-[7px] text-[var(--sample-muted)]">{spec}</p>
          </div>
        ))}
        <div className="hidden min-w-0 flex-col justify-center text-right md:flex">
          <p className="min-w-0 truncate text-[7px] uppercase tracking-[0.1em] text-[var(--sample-accent)]">System status</p>
          <p className="mt-1 min-w-0 truncate text-[7px] text-[var(--sample-muted)]">COMPUTE 82% · QUEUE 4 · LATENCY 1.8S/STEP</p>
        </div>
      </footer>
    </div>
  );
}
