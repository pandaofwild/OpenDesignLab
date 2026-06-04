import type { CSSProperties, ReactNode } from "react";
import type { DesignStyle } from "@/data/designStyles";
import { styleTokenVars } from "@/components/style-preset/styleTokenVars";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  compact?: boolean;
  style: DesignStyle;
};

type SampleVariables = CSSProperties & Record<`--sample-${string}`, string> & Record<`--st-${string}`, string>;

function withAlpha(color: string, alpha: string) {
  return /^#[\da-f]{6}$/i.test(color) ? `${color}${alpha}` : color;
}

function sampleVariables(style: DesignStyle): SampleVariables {
  const { palette } = style;

  return {
    "--sample-accent": palette.accent,
    "--sample-accent-2": palette.accent2,
    "--sample-accent-3": palette.accent3,
    "--sample-base": palette.base,
    "--sample-border": palette.border,
    "--sample-border-soft": withAlpha(palette.border, "33"),
    "--sample-muted": palette.mutedText,
    "--sample-primary": palette.primary,
    "--sample-surface": palette.surface,
    "--sample-text": palette.text,
    ...styleTokenVars(style),
  };
}

function SampleFrame({
  children,
  className,
  compact,
  style,
}: Props & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "st-border relative h-full min-h-[250px] overflow-hidden bg-[var(--sample-base)] text-[var(--sample-text)]",
        compact ? "min-h-[210px] p-3" : "st-pad min-h-[540px]",
        className,
      )}
      style={sampleVariables(style)}
    >
      {children}
    </div>
  );
}

function MiniNav({ compact = false }: { compact?: boolean }) {
  return (
    <div className="st-gap flex items-center justify-between">
      <span
        className="st-display uppercase"
        style={{ "--st-display-size": compact ? "0.5625rem" : "0.75rem" } as CSSProperties}
      >
        Studio
      </span>
      <div className="flex gap-2">
        <span className="h-2 w-8 bg-[var(--sample-text)]" />
        <span className="h-2 w-5 bg-[var(--sample-accent)]" />
      </div>
    </div>
  );
}

function AccentOrb({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute rounded-full blur-2xl", className)}
    />
  );
}

function MinimalEditorial({ compact = false, style }: Props) {
  return (
    <SampleFrame compact={compact} style={style}>
      <MiniNav compact={compact} />
      <div className={cn("grid h-[calc(100%-2rem)] gap-4", compact ? "mt-5 grid-cols-[1.2fr_0.8fr]" : "mt-8 grid-cols-1 md:mt-12 md:grid-cols-[1.25fr_0.75fr]")}>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--sample-muted)]">
              {style.category}
            </p>
            <h3
              className={cn("mt-3 break-words font-display font-bold uppercase tracking-[-0.05em]", compact ? "text-5xl leading-[0.78]" : "text-5xl leading-[0.8] md:text-8xl md:leading-[0.75]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              {style.nameEn}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <span className="h-1 bg-[var(--sample-accent)]" />
            <span className="h-1 bg-[var(--sample-border)]" />
          </div>
        </div>
        <div className={cn("flex flex-col justify-between border-[var(--sample-border-soft)]", compact ? "border-l pl-4" : "border-t pt-4 md:border-l md:border-t-0 md:pl-4 md:pt-0")}>
          <div className="aspect-[3/4] bg-[var(--sample-surface)] p-3" style={{ borderRadius: "var(--st-radius)" }}>
            <div className="h-full border border-[var(--sample-border-soft)] bg-[var(--sample-accent-2)]/40" />
          </div>
          <p className="line-clamp-3 text-xs leading-5 text-[var(--sample-muted)]" style={{ fontFamily: "var(--st-font-body)" }}>
            {style.summary}
          </p>
        </div>
      </div>
    </SampleFrame>
  );
}

function MinimalismProductSystem({ className, compact = false, style }: Props) {
  const metrics = [
    ["MRR", "$48.2k", "+8%"],
    ["Active", "1,284", "94%"],
    ["Tasks", "32", "12 due"],
  ];
  const workItems = [
    ["Launch page", "Ready"],
    ["Billing flow", "Review"],
    ["Docs update", "Live"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-[var(--sample-border-soft)] pb-4">
          <div className="flex items-center gap-3">
            <span className="h-6 w-6 border border-[var(--sample-border-soft)] bg-[var(--sample-surface)]" />
            <div>
              <p className="text-xs font-semibold text-[var(--sample-text)]">Northstar</p>
              <p className="text-[10px] text-[var(--sample-muted)]">Product workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-[var(--sample-muted)]">
            <span>Overview</span>
            <span>Projects</span>
            <span className={compact ? "hidden" : ""}>Billing</span>
            <span className="h-2 w-2 rounded-full bg-[var(--sample-accent)]" />
          </div>
        </div>

        <div className={cn("grid flex-1 gap-5", compact ? "grid-cols-[0.72fr_1fr] pt-4" : "grid-cols-1 pt-6 md:grid-cols-[0.95fr_1.05fr] md:pt-8")}>
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <p className="text-xs text-[var(--sample-muted)]">Design system / {style.nameEn}</p>
              <h3
                className={cn("mt-4 max-w-full break-words font-display leading-[1]", compact ? "text-2xl" : "text-4xl md:text-5xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                Calm product pages for focused teams.
              </h3>
            </div>
            <p className={cn("max-w-sm text-[var(--sample-muted)]", compact ? "hidden" : "mt-8 text-sm leading-6")}>
              {style.summary}
            </p>
            <div className={cn("mt-5 flex gap-2", compact ? "hidden" : "flex")}>
              <span className="inline-flex h-9 items-center border border-[var(--sample-text)] bg-[var(--sample-text)] px-4 text-xs font-medium text-[var(--sample-base)]">
                Start project
              </span>
              <span className="inline-flex h-9 items-center border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-4 text-xs font-medium text-[var(--sample-text)]">
                View docs
              </span>
            </div>
          </div>

          <div className="grid min-h-0">
            <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-4">
              <div className="flex items-center justify-between border-b border-[var(--sample-border-soft)] pb-3">
                <div>
                  <p className="text-xs font-semibold text-[var(--sample-text)]">Workspace overview</p>
                  <p className="mt-1 text-[10px] text-[var(--sample-muted)]">June release</p>
                </div>
                <span className="border border-[var(--sample-border-soft)] px-2 py-1 text-[10px] text-[var(--sample-muted)]">On track</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4">
                {metrics.map(([label, value, meta]) => (
                  <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-base)] p-2" key={label}>
                    <p className="text-[10px] text-[var(--sample-muted)]">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-[var(--sample-text)]">{value}</p>
                    <p className="mt-1 text-[10px] text-[var(--sample-muted)]">{meta}</p>
                  </div>
                ))}
              </div>

              <div className={cn("grid gap-3 pt-4", compact ? "hidden" : "grid-cols-1 sm:grid-cols-[0.82fr_1fr]")}>
                <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-base)] p-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-[var(--sample-muted)]">Progress</p>
                      <p className="mt-2 text-2xl font-semibold text-[var(--sample-text)]">72%</p>
                    </div>
                    <span className="h-10 w-10 border border-[var(--sample-border-soft)] bg-[var(--sample-accent)]" />
                  </div>
                  <div className="mt-4 h-1.5 bg-[var(--sample-border)]">
                    <span className="block h-full w-[72%] bg-[var(--sample-text)]" />
                  </div>
                </div>

                <div className="border border-[var(--sample-border-soft)]">
                  {workItems.map(([label, status]) => (
                    <div className="flex items-center justify-between border-b border-[var(--sample-border-soft)] px-3 py-2 last:border-b-0" key={label}>
                      <span className="text-[11px] text-[var(--sample-text)]">{label}</span>
                      <span className="text-[10px] text-[var(--sample-muted)]">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function ModernismFunctionalGrid({ className, compact = false, style }: Props) {
  const modules = [
    ["01", "Archive"],
    ["02", "Objects"],
    ["03", "Program"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="grid grid-cols-[auto_1fr_auto] items-center border-b-2 border-[var(--sample-border)]">
          <div className="border-r-2 border-[var(--sample-border)] bg-[var(--sample-text)] px-3 py-2 text-[10px] font-bold text-[var(--sample-base)]">
            M28
          </div>
          <div className="flex items-center gap-4 px-3 text-[10px] font-semibold text-[var(--sample-text)]">
            <span>Research</span>
            <span>Objects</span>
            <span className={compact ? "hidden" : ""}>Program</span>
          </div>
          <div className="grid h-full w-16 grid-cols-3 border-l-2 border-[var(--sample-border)]">
            {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color) => (
              <span key={color} style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>

        <div className={cn("grid min-h-0", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-1 md:grid-cols-[0.82fr_1.18fr]")}>
          <div className="flex min-w-0 flex-col justify-between border-r-2 border-[var(--sample-border)] p-4">
            <div>
              <p className="text-[10px] font-semibold uppercase text-[var(--sample-muted)]">Form follows function</p>
              <h3
                className={cn("mt-4 font-display leading-[0.94]", compact ? "text-3xl" : "text-4xl md:text-6xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                Function shapes form.
              </h3>
            </div>
            <div className={cn("mt-4 grid gap-2", compact ? "grid-cols-1" : "grid-cols-2")}>
              <span className="h-12 bg-[var(--sample-accent)]" />
              <span className="h-12 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]" />
            </div>
          </div>

          <div className="grid min-h-0 grid-rows-[auto_1fr_auto] bg-[var(--sample-surface)]">
            <div className="grid grid-cols-3 border-b-2 border-[var(--sample-border)]">
              {modules.map(([number, label], index) => (
                <div className="border-r-2 border-[var(--sample-border)] p-3 last:border-r-0" key={label}>
                  <p className="text-[10px] font-bold text-[var(--sample-muted)]">{number}</p>
                  <p className="mt-2 text-xs font-semibold text-[var(--sample-text)]">{label}</p>
                  <span
                    className="mt-3 block h-2"
                    style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3][index] }}
                  />
                </div>
              ))}
            </div>

            <div className={cn("grid gap-3 p-4", compact ? "grid-cols-1" : "grid-cols-[1fr_0.72fr]")}>
              <div className="grid grid-rows-[1fr_auto] border-2 border-[var(--sample-border)]">
                <div className="grid grid-cols-[0.65fr_1fr]">
                  <div className="border-r-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)]" />
                  <div className="grid grid-rows-[1fr_1fr]">
                    <span className="border-b-2 border-[var(--sample-border)] bg-[var(--sample-base)]" />
                    <span className="bg-[var(--sample-accent-3)]" />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t-2 border-[var(--sample-border)] px-3 py-2">
                  <span className="text-xs font-semibold text-[var(--sample-text)]">Object index</span>
                  <span className="text-[10px] text-[var(--sample-muted)]">1920-1960</span>
                </div>
              </div>

              <div className={cn("space-y-2", compact ? "hidden" : "block")}>
                {["Visit", "Collection", "Lecture"].map((label, index) => (
                  <div className="grid grid-cols-[2rem_1fr] border-2 border-[var(--sample-border)]" key={label}>
                    <span className="grid place-items-center border-r-2 border-[var(--sample-border)] bg-[var(--sample-text)] text-[10px] font-bold text-[var(--sample-base)]">
                      {index + 1}
                    </span>
                    <span className="px-3 py-2 text-xs font-semibold text-[var(--sample-text)]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] border-t-2 border-[var(--sample-border)]">
              <p className="line-clamp-1 px-3 py-2 text-[10px] text-[var(--sample-muted)]">{style.summary}</p>
              <span className="border-l-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)] px-3 py-2 text-[10px] font-bold text-white">
                System
              </span>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function SwissInformationGrid({ className, compact = false, style }: Props) {
  const rows = compact ? ["N", "C", "D"] : ["Politics", "Culture", "Economy"];
  const headline = compact ? ["Public", "Briefing"] : ["Clear", "public", "information"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] border-b-2 border-[var(--sample-border)]">
          <span className="bg-[var(--sample-accent)] px-3 py-2 text-[10px] font-bold text-white">CH</span>
          <div className="flex min-w-0 items-center gap-3 px-3 text-[10px] font-bold text-[var(--sample-text)]">
            <span>World</span>
            <span>Briefing</span>
            <span className={compact ? "hidden" : ""}>Archive</span>
          </div>
          <span className="border-l-2 border-[var(--sample-border)] px-3 py-2 text-[10px] font-bold">06.04</span>
        </div>
        <div className={cn("grid min-h-0", compact ? "grid-cols-[1.1fr_0.9fr]" : "grid-cols-1 md:grid-cols-[1.05fr_0.95fr]")}>
          <div className={cn("flex min-w-0 flex-col justify-between p-4", compact ? "border-r-2 border-[var(--sample-border)]" : "border-b-2 border-[var(--sample-border)] md:border-b-0 md:border-r-2")}>
            <div>
              <p className="text-[10px] font-bold uppercase text-[var(--sample-muted)]">Grid first / Type leads</p>
              <h3
                className={cn("mt-4 font-display leading-[0.86]", compact ? "text-3xl" : "text-5xl md:text-7xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                {headline.map((line) => (
                  <span className="block" key={line}>
                    {line}
                  </span>
                ))}
              </h3>
            </div>
            <div className={cn("mt-4 grid grid-cols-[auto_1fr] border-y-2 border-[var(--sample-border)] text-[10px]", compact ? "hidden" : "")}>
              <span className="border-r-2 border-[var(--sample-border)] px-2 py-2 font-bold text-[var(--sample-accent)]">01</span>
              <span className="px-2 py-2 text-[var(--sample-muted)]">Multilingual editorial system</span>
            </div>
          </div>
          <div className="grid min-h-0 min-w-0 grid-rows-[auto_1fr_auto]">
            <div className="grid grid-cols-3 border-b-2 border-[var(--sample-border)]">
              {rows.map((row, index) => (
                <div className="min-w-0 border-r-2 border-[var(--sample-border)] p-2 last:border-r-0" key={row}>
                  <p className="text-[10px] font-bold text-[var(--sample-muted)]">0{index + 2}</p>
                  <p className="mt-2 truncate text-[11px] font-bold text-[var(--sample-text)]">{row}</p>
                </div>
              ))}
            </div>
            <div className={cn("grid gap-3", compact ? "grid-cols-[0.58fr_1fr] p-3" : "grid-cols-[0.72fr_1fr] p-4")}>
              <div className="min-h-16 bg-[var(--sample-accent)]" />
              <div className="space-y-2">
                {[84, 64, 92, 52].map((width) => (
                  <span className="block h-2 bg-[var(--sample-text)]" key={width} style={{ width: `${width}%` }} />
                ))}
                <div className={cn("grid grid-cols-2 gap-2", compact ? "mt-3" : "mt-5")}>
                  <span className={cn("border-2 border-[var(--sample-border)]", compact ? "h-8" : "h-12")} />
                  <span className={cn("bg-[var(--sample-accent-2)]", compact ? "h-8" : "h-12")} />
                </div>
              </div>
            </div>
            <div className={cn("truncate border-t-2 border-[var(--sample-border)] px-3 py-2 text-[10px] font-bold text-[var(--sample-muted)]", compact ? "hidden" : "")}>
              {style.nameEn} / legibility index
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function InternationalSystemPortal({ className, compact = false, style }: Props) {
  const panels = ["Standards", "Grid", "Language"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)]">
        <div className="flex items-center justify-between border-b border-[var(--sample-border-soft)] px-4 py-3">
          <div>
            <p className="text-xs font-semibold text-[var(--sample-text)]">Global System</p>
            <p className="text-[10px] text-[var(--sample-muted)]">Design language portal</p>
          </div>
          <span className="bg-[var(--sample-accent)] px-3 py-1 text-[10px] font-semibold text-white">Docs</span>
        </div>
        <div className={cn("grid min-h-0 gap-4 p-4", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[0.92fr_1.08fr]")}>
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase text-[var(--sample-muted)]">Universal clarity</p>
              <h3
                className={cn("mt-4 font-display leading-[1]", compact ? "text-3xl" : "text-5xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                One system for every market.
              </h3>
            </div>
            <div className={cn("mt-5 grid gap-2", compact ? "hidden" : "grid-cols-2")}>
              <span className="border border-[var(--sample-border-soft)] bg-[var(--sample-base)] px-3 py-2 text-xs">View guidelines</span>
              <span className="bg-[var(--sample-text)] px-3 py-2 text-xs text-[var(--sample-base)]">Use template</span>
            </div>
          </div>
          <div className="grid min-h-0 min-w-0 grid-rows-[auto_1fr] gap-3">
            <div className="grid grid-cols-3 gap-2">
              {panels.map((panel, index) => (
                <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-base)] p-2" key={panel}>
                  <p className="text-[10px] text-[var(--sample-muted)]">0{index + 1}</p>
                  <p className="mt-2 text-xs font-semibold">{panel}</p>
                </div>
              ))}
            </div>
            <div className="border border-[var(--sample-border-soft)]">
              {["Layout grid", "Typography", "Components", "Data states"].map((item, index) => (
                <div className="grid grid-cols-[2.5rem_1fr_auto] border-b border-[var(--sample-border-soft)] last:border-b-0" key={item}>
                  <span className="border-r border-[var(--sample-border-soft)] px-2 py-2 text-[10px] text-[var(--sample-muted)]">{index + 1}</span>
                  <span className="px-3 py-2 text-xs font-medium">{item}</span>
                  <span className="px-3 py-2 text-[10px] text-[var(--sample-accent)]">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function ScandinavianCommerceHome({ className, compact = false, style }: Props) {
  const products = ["Lounge", "Lighting", "Textiles"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between pb-4">
          <div>
            <p className="text-xs font-semibold">Nord Room</p>
            <p className="text-[10px] text-[var(--sample-muted)]">Home essentials</p>
          </div>
          <span className="rounded-full bg-[var(--sample-accent)] px-3 py-1 text-[10px] font-semibold text-[var(--sample-text)]">Shop</span>
        </div>
        <div className={cn("grid min-w-0 gap-4", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[0.85fr_1.15fr]")}>
          <div className="flex flex-col justify-between rounded-[var(--st-radius)] bg-[var(--sample-surface)] p-4" style={{ boxShadow: "var(--st-shadow)" }}>
            <div>
              <p className="text-[10px] uppercase text-[var(--sample-muted)]">Spring home edit</p>
              <h3
                className={cn("mt-3 font-display leading-[1]", compact ? "text-2xl" : "text-4xl md:text-5xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                Bright rooms, useful objects.
              </h3>
            </div>
            <div className={cn("mt-4 grid grid-cols-2 gap-2", compact ? "hidden" : "")}>
              <span className="rounded-full bg-[var(--sample-accent-2)] px-3 py-2 text-xs">New arrivals</span>
              <span className="rounded-full border border-[var(--sample-border-soft)] px-3 py-2 text-xs">Room ideas</span>
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-3 gap-2">
            {products.map((product, index) => (
              <div className="flex min-w-0 flex-col justify-between rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-3" key={product}>
                <span
                  className="block aspect-square rounded-[calc(var(--st-radius)-4px)]"
                  style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3][index] }}
                />
                <div className="mt-3">
                  <p className="truncate text-xs font-semibold">{product}</p>
                  <p className="mt-1 text-[10px] text-[var(--sample-muted)]">From ${[84, 126, 48][index]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function JapandiSpatialLanding({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between pb-4 text-[10px] text-[var(--sample-muted)]">
          <span>Karuma House</span>
          <span>Materials / Stay / Journal</span>
        </div>
        <div className={cn("grid gap-5", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-1 md:grid-cols-[0.82fr_1.18fr]")}>
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.08em] text-[var(--sample-muted)]">Quiet materials</p>
              <h3
                className={cn("mt-4 font-display leading-[1.05]", compact ? "text-2xl" : "text-4xl md:text-5xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                Slow rooms for everyday rituals.
              </h3>
            </div>
            <div className={cn("mt-5 grid gap-2", compact ? "hidden" : "grid-cols-3")}>
              {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color) => (
                <span className="h-10" key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-[1fr_0.62fr] gap-3">
            <div className="bg-[var(--sample-surface)] p-3">
              <div className="h-full bg-[linear-gradient(160deg,var(--sample-accent-2),var(--sample-surface)_45%,var(--sample-accent))]" />
            </div>
            <div className="grid grid-rows-[1fr_auto] gap-3">
              <div className="bg-[var(--sample-accent-3)]/80" />
              <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-3">
                <p className="text-xs font-semibold">Azabu</p>
                <p className="mt-2 line-clamp-3 text-[10px] leading-4 text-[var(--sample-muted)]">{style.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function WarmMinimalStudio({ className, compact = false, style }: Props) {
  const works = ["Hallway", "Bedroom", "Dining"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between pb-4">
          <div>
            <p className="text-xs font-semibold">Atelier Warm</p>
            <p className="text-[10px] text-[var(--sample-muted)]">Interior consultation</p>
          </div>
          <span className="rounded-full bg-[var(--sample-accent)] px-3 py-1 text-[10px] font-semibold text-[var(--sample-surface)]">Book</span>
        </div>
        <div className={cn("grid min-w-0 gap-4", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[0.92fr_1.08fr]")}>
          <div className="min-w-0 rounded-[var(--st-radius)] bg-[var(--sample-surface)] p-4" style={{ boxShadow: "var(--st-shadow)" }}>
            <p className="text-[10px] uppercase text-[var(--sample-muted)]">Selected works</p>
            <h3
              className={cn("mt-4 font-display leading-[1]", compact ? "text-3xl" : "text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Soft rooms, clear decisions.
            </h3>
            <p className={cn("mt-4 text-sm leading-6 text-[var(--sample-muted)]", compact ? "hidden" : "")}>{style.summary}</p>
          </div>
          <div className="grid min-w-0 grid-rows-3 gap-2">
            {works.map((work, index) => (
              <div className="grid grid-cols-[4.5rem_1fr_auto] items-center rounded-[var(--st-radius)] bg-[var(--sample-surface)] p-2" key={work}>
                <span
                  className="h-12 rounded-[calc(var(--st-radius)-6px)]"
                  style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3][index] }}
                />
                <span className="px-3 text-xs font-semibold">{work}</span>
                <span className="pr-2 text-[10px] text-[var(--sample-muted)]">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function SoftMinimalService({ className, compact = false, style }: Props) {
  const services = compact ? ["Audit", "Plan", "Launch"] : ["Mindful audit", "Care plan", "Quiet launch"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between pb-4 text-[10px] text-[var(--sample-muted)]">
          <span className="font-semibold text-[var(--sample-text)]">Soft Office</span>
          <span>Journal / Services / Book</span>
        </div>
        <div className={cn("grid min-h-0 gap-4", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[0.9fr_1.1fr]")}>
          <div className="flex min-w-0 flex-col justify-between rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-4" style={{ boxShadow: "var(--st-shadow)" }}>
            <div>
              <p className="text-[10px] font-medium text-[var(--sample-muted)]">Consultation studio</p>
              <h3
                className={cn("mt-4 max-w-full break-words font-display leading-[1.05]", compact ? "text-2xl" : "text-4xl md:text-5xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                Gentle pages for careful decisions.
              </h3>
            </div>
            <div className={cn("mt-5 flex flex-wrap gap-2", compact ? "hidden" : "")}>
              <span className="rounded-full bg-[var(--sample-text)] px-4 py-2 text-xs text-[var(--sample-base)]">Book a call</span>
              <span className="rounded-full border border-[var(--sample-border-soft)] px-4 py-2 text-xs">View packages</span>
            </div>
          </div>
          <div className="grid min-h-0 grid-rows-[auto_1fr] gap-3">
            <div className="grid grid-cols-3 gap-2">
              {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color) => (
                <span className="h-8 rounded-full" key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
            <div className="grid gap-2">
              {services.map((service, index) => (
                <div className="grid grid-cols-[auto_1fr_auto] items-center rounded-[var(--st-radius)] bg-[var(--sample-surface)] px-3 py-2" key={service}>
                  <span className="mr-3 h-7 w-7 rounded-full bg-[var(--sample-accent-2)]" />
                  <span className="truncate text-xs font-medium text-[var(--sample-text)]">{service}</span>
                  <span className="text-[10px] text-[var(--sample-muted)]">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function HighEndMinimalProduct({ className, compact = false, style }: Props) {
  const details = [
    ["Material", "wool silk / brushed taupe"],
    ["Made in", "small atelier, Kyoto"],
    ["Delivery", "reserved dispatch"],
  ];
  const swatches = [style.palette.surface, style.palette.accent2, style.palette.accent];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between border-b border-[var(--sample-border-soft)] pb-3 text-[10px] text-[var(--sample-muted)]">
          <span className="text-[var(--sample-text)]">Atelier product page</span>
          <span>Objects / Service / Bag 01</span>
        </div>
        <div className={cn("grid min-h-0 gap-5 pt-5", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-1 sm:grid-cols-[0.95fr_1.05fr]")}>
          <div className="grid min-h-0 grid-rows-[1fr_auto] gap-3">
            <div className="grid min-h-0 place-items-center overflow-hidden border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-4">
              <div className="relative aspect-[4/5] w-[62%] max-w-[15rem] border border-[var(--sample-border-soft)] bg-[linear-gradient(160deg,var(--sample-accent-2),var(--sample-surface)_44%,var(--sample-base))]">
                <span className="absolute bottom-5 left-1/2 h-24 w-[42%] -translate-x-1/2 border border-[var(--sample-border-soft)] bg-[var(--sample-base)] opacity-80" />
                <span className="absolute left-1/2 top-8 h-7 w-[34%] -translate-x-1/2 border border-[var(--sample-border-soft)]" />
              </div>
            </div>
            <div className={cn("grid grid-cols-3 gap-2", compact ? "hidden" : "")}>
              {swatches.map((color, index) => (
                <span className="h-8 border border-[var(--sample-border-soft)]" key={`${color}-${index}`} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <div className={cn("flex min-w-0 flex-col justify-between", compact ? "border-l border-[var(--sample-border-soft)] pl-4" : "border-t border-[var(--sample-border-soft)] pt-4 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0")}>
            <div className="max-w-[26rem]">
              <p className="text-[10px] text-[var(--sample-muted)]">Edition 04 / Objet 219</p>
              <h3
                className={cn("mt-4 max-w-full break-words font-display leading-[1.04]", compact ? "text-2xl" : "text-4xl md:text-5xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                One object, three decisions.
              </h3>
              <p className={cn("mt-4 text-xs leading-5 text-[var(--sample-muted)]", compact ? "hidden" : "line-clamp-2")}>
                Quiet retail framing based on material, proportion, and a single decisive purchase action.
              </p>
            </div>
            <div className="mt-4 grid gap-3">
              <div className={cn("grid border-t border-[var(--sample-border-soft)] text-[10px]", compact ? "hidden" : "")}>
                {details.map(([label, value]) => (
                  <div className="grid grid-cols-[5.5rem_1fr] border-b border-[var(--sample-border-soft)] py-2" key={label}>
                    <span className="text-[var(--sample-muted)]">{label}</span>
                    <span className="text-[var(--sample-text)]">{value}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center border border-[var(--sample-text)] bg-[var(--sample-text)] text-[var(--sample-base)]">
                <span className="px-3 py-3 text-xs">Reserve object</span>
                <span className="border-l border-[var(--sample-base)] px-3 py-3 text-xs">$680</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function RawBrutalistIndex({ className, compact = false, style }: Props) {
  const rows = compact
    ? [
        ["01", "notice.txt", "text"],
        ["02", "tickets.html", "form"],
        ["03", "press/", "dir"],
      ]
    : [
        ["01", "notice.txt", "plain text"],
        ["02", "tickets.html", "default form"],
        ["03", "press/index.html", "directory"],
        ["04", "manifesto.pdf", "download"],
        ["05", "server-log.txt", "raw log"],
      ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] font-mono text-[var(--sample-text)]">
        <div className="border-b-2 border-[var(--sample-border)] p-3">
          <div className="flex items-start justify-between gap-3 text-[10px]">
            <span>/public/index.html</span>
            <span>no framework / no cards</span>
          </div>
          <h3
            className={cn("mt-3 break-words font-display leading-[0.9]", compact ? "text-3xl" : "text-5xl md:text-6xl")}
            style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
          >
            Plain files, real links.
          </h3>
        </div>
        <div className={cn("grid min-h-0", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1.08fr_0.92fr]")}>
          <div className={cn("min-w-0", compact ? "" : "md:border-r-2 md:border-[var(--sample-border)]")}>
            <table className="h-full w-full table-fixed border-collapse text-[10px]">
              <thead>
                <tr className="border-b-2 border-[var(--sample-border)] bg-[var(--sample-base)] text-left">
                  <th className="w-10 px-2 py-2 font-bold">no</th>
                  <th className="px-2 py-2 font-bold">href</th>
                  <th className={cn("px-2 py-2 font-bold", compact ? "hidden" : "table-cell")}>type</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([number, file, type]) => (
                  <tr className="border-b border-[var(--sample-border)] last:border-b-0" key={file}>
                    <td className="px-2 py-2 align-top">{number}</td>
                    <td className="truncate px-2 py-2 align-top">
                      <span className="underline" style={{ color: number === "04" ? "#551A8B" : "#0000EE" }}>
                        {file}
                      </span>
                    </td>
                    <td className={cn("truncate px-2 py-2 align-top", compact ? "hidden" : "table-cell")}>{type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={cn("grid content-start gap-3 p-3", compact ? "hidden" : "")}>
            <label className="grid gap-1 text-[10px] font-bold">
              Find record
              <input className="w-full border-2 border-[var(--sample-border)] bg-white px-2 py-1 font-normal text-[10px] text-[var(--sample-text)]" defaultValue="raw form widget" />
            </label>
            <button className="w-max border-2 border-[var(--sample-border)] bg-[#E9E9E9] px-3 py-1 text-[10px] text-[var(--sample-text)]" type="button">
              submit query
            </button>
            <pre className="overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-base)] p-2 text-[9px] leading-4">
              GET /archive{"\n"}200 text/html{"\n"}back button works
            </pre>
          </div>
        </div>
        <p className={cn("border-t-2 border-[var(--sample-border)] px-3 py-2 text-[10px] text-[var(--sample-muted)]", compact ? "hidden" : "")}>
          Buttons look like buttons. Links are underlined. Content is the material.
        </p>
      </div>
    </SampleFrame>
  );
}

function NeoBrutalistApp({ className, compact = false, style }: Props) {
  const metrics = [
    ["Revenue", "$8,420", style.palette.accent],
    ["Orders", "147", style.palette.accent2],
    ["Payout", "Fri 09", style.palette.accent3],
  ];
  const checklist = ["Landing live", "Checkout tested", "Email queued"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: "linear-gradient(var(--sample-border) 1px, transparent 1px), linear-gradient(90deg, var(--sample-border) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />
      <div className="relative grid h-full grid-rows-[auto_1fr]">
        <div className="mb-4 grid grid-cols-[1fr_auto_auto] items-center border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] text-xs font-black" style={{ boxShadow: "5px 5px 0 var(--sample-border)" }}>
          <span className="truncate px-3 py-2">Component kit for loud products.</span>
          <span className={cn("border-l-[3px] border-[var(--sample-border)] px-3 py-2", compact ? "hidden" : "")}>cmd+k</span>
          <span className="border-l-[3px] border-[var(--sample-border)] bg-[var(--sample-accent)] px-3 py-2">Ship</span>
        </div>
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1.05fr_0.95fr]")}>
          <div className="grid min-h-0 content-between border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-4" style={{ boxShadow: "7px 7px 0 var(--sample-border)" }}>
            <p className="w-max border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-2)] px-2 py-1 text-[10px] font-black">creator product</p>
            <h3
              className={cn("mt-3 break-words font-display leading-[0.95]", compact ? "text-3xl" : "text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Launch the loud template.
            </h3>
            <div className={cn("mt-4 grid grid-cols-[1fr_auto] border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] text-xs font-black", compact ? "hidden" : "")}>
              <span className="px-3 py-2">landing-kit.zip</span>
              <span className="border-l-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-3 py-2">$29</span>
            </div>
          </div>
          <div className="grid min-w-0 gap-2">
            <div className="grid grid-cols-3 gap-2">
              {metrics.map(([metric, value, color]) => (
                <div className="min-w-0 border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" key={metric} style={{ boxShadow: "4px 4px 0 var(--sample-border)" }}>
                  <span className="block truncate text-[9px] font-black">{metric}</span>
                  <span className="mt-2 block truncate px-1 py-1 text-[10px] font-black" style={{ backgroundColor: color }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div className={cn("grid gap-2 border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-3 text-xs font-black", compact ? "hidden" : "")} style={{ boxShadow: "4px 4px 0 var(--sample-border)" }}>
              {checklist.map((item, index) => (
                <div className="grid grid-cols-[1.5rem_1fr] items-center" key={item}>
                  <span className="grid aspect-square place-items-center border-2 border-[var(--sample-border)]" style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3][index] }}>
                    x
                  </span>
                  <span className="truncate pl-2">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function AntiDesignLanding({ className, compact = false, style }: Props) {
  const links = ["wrong shop", "index?", "pay wall", "about now"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(90deg, var(--sample-accent-3) 0 1px, transparent 1px), linear-gradient(0deg, var(--sample-accent) 0 1px, transparent 1px)", backgroundSize: "29px 17px" }} />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto]">
        <div className="flex items-start justify-between">
          <span className="rotate-[-2deg] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-xs font-black">This page refuses polish.</span>
          <span className="translate-y-3 rotate-[4deg] border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-2 py-1 text-[10px] font-black">menu?</span>
        </div>
        <div className={cn("grid min-h-0 gap-2", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-1 md:grid-cols-[0.82fr_1.18fr]")}>
          <div className="rotate-[-3deg] self-center border-4 border-[var(--sample-border)] bg-[var(--sample-accent-2)] p-3">
            <h3
              className={cn("break-words font-display leading-[0.9]", compact ? "text-3xl" : "text-5xl md:text-6xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Useful friction, visible links.
            </h3>
          </div>
          <div className="grid content-center gap-2">
            {links.map((link, index) => (
              <span
                className={cn("block border-2 border-[var(--sample-border)] px-3 py-2 text-xs font-black", index === 1 ? "translate-x-4 bg-[var(--sample-accent)]" : index === 2 ? "-translate-x-2 bg-[var(--sample-surface)]" : "bg-[var(--sample-accent-3)]")}
                key={link}
              >
                {link}
              </span>
            ))}
          </div>
        </div>
        <p className={cn("w-3/4 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-[10px]", compact ? "hidden" : "")}>
          Still clickable. Still intentional.
        </p>
      </div>
    </SampleFrame>
  );
}

function MaximalistPatternMarket({ className, compact = false, style }: Props) {
  const items = ["Silk scarf", "Bloom coat", "Gold tote"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12px 12px, var(--sample-accent) 0 4px, transparent 5px), linear-gradient(135deg, transparent 0 42%, var(--sample-accent-2) 42% 58%, transparent 58%), radial-gradient(circle at 85% 18%, var(--sample-accent-3) 0 18px, transparent 19px)",
          backgroundSize: "32px 32px, 44px 44px, 100% 100%",
        }}
      />
      <div className="relative grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between pb-3">
          <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-1 text-xs font-bold text-[var(--sample-border)]">Pattern market</span>
          <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-3 py-1 text-[10px] font-bold text-[var(--sample-border)]">Cart 03</span>
        </div>
        <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1fr_0.9fr]")}>
          <div className="relative overflow-hidden border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-3 text-[var(--sample-border)]">
            <span className="absolute right-3 top-3 rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-1 text-[10px] font-bold">drop 18</span>
            <h3
              className={cn("break-words font-display leading-[0.95]", compact ? "text-3xl" : "text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Pattern is the product.
            </h3>
            <div className={cn("mt-4 grid grid-cols-3 gap-2", compact ? "hidden" : "")}>
              {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color, index) => (
                <span className="h-9 border-2 border-[var(--sample-border)]" key={`${color}-${index}`} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {items.map((item, index) => (
              <div className="flex min-w-0 flex-col justify-between border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2 text-[var(--sample-border)]" key={item}>
                <span
                  className="block aspect-square border border-[var(--sample-border)]"
                  style={{
                    backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3][index],
                    backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55) 0 14%, transparent 15%), linear-gradient(45deg, transparent 0 46%, rgba(0,0,0,0.25) 47% 53%, transparent 54%)",
                  }}
                />
                <span className="mt-2 truncate text-xs font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function GlitchArtInterface({ className, compact = false, style }: Props) {
  const nodes = [
    ["Signal", "72%"],
    ["Noise", "42%"],
    ["Error", "91%"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 8px, var(--sample-accent) 9px 10px), linear-gradient(90deg, transparent, var(--sample-accent-2), transparent)" }} />
      <div className="relative grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between border border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2 font-mono text-[10px]">
          <span>SYS://GLITCH</span>
          <span className="text-[var(--sample-accent-2)]">REC 00:17</span>
        </div>
        <div className={cn("grid min-h-0 gap-3 pt-3", compact ? "grid-cols-[0.8fr_1.2fr]" : "grid-cols-1 md:grid-cols-[0.82fr_1.18fr]")}>
          <div className="grid gap-2">
            {nodes.map(([node, value]) => (
              <div className="border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3 font-mono" key={node}>
                <p className="text-[10px] text-[var(--sample-muted)]">{node}</p>
                <div className="mt-2 h-2 bg-[var(--sample-accent-2)]" style={{ width: value }} />
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)] p-4" style={{ boxShadow: "var(--st-shadow)" }}>
            <span aria-hidden="true" className="absolute left-3 top-5 font-display text-4xl leading-none text-[var(--sample-accent)] opacity-60 md:text-6xl">
              signal
            </span>
            <span aria-hidden="true" className="absolute left-5 top-4 font-display text-4xl leading-none text-[var(--sample-accent-2)] opacity-60 md:text-6xl">
              signal
            </span>
            <h3
              className={cn("relative break-words font-display leading-[0.95] text-[var(--sample-text)]", compact ? "text-3xl" : "text-5xl md:text-6xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              signal failed beautifully.
            </h3>
            <div className={cn("absolute bottom-4 left-4 right-4 grid grid-cols-5 gap-1", compact ? "hidden" : "")}>
              {[48, 72, 38, 91, 56].map((height, index) => (
                <span className="block bg-[var(--sample-accent)]" key={height + index} style={{ height: `${height / 5}px` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function DeconstructiveExhibition({ className, compact = false, style }: Props) {
  const projects = ["Folded hall", "Cut section", "Open void"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between border-b-2 border-[var(--sample-border)] pb-2 text-[10px] font-bold">
          <span>Architecture exhibition</span>
          <span>Projects / 12</span>
        </div>
        <div className={cn("relative grid min-h-0 gap-3 pt-4", compact ? "grid-cols-[1fr_0.85fr]" : "grid-cols-1 md:grid-cols-[1fr_0.9fr]")}>
          <div className="relative overflow-hidden border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-4">
            <div className="absolute -right-4 top-7 h-20 w-28 skew-x-[-18deg] bg-[var(--sample-accent)]" />
            <div className="absolute bottom-8 left-4 h-20 w-24 bg-[var(--sample-accent-2)]" style={{ clipPath: "polygon(0 16%, 100% 0, 74% 100%, 18% 76%)" }} />
            <div className="absolute bottom-2 right-12 h-24 w-10 rotate-[24deg] bg-[var(--sample-accent-3)]" />
            <h3
              className={cn("relative break-words font-display leading-[0.95]", compact ? "text-3xl" : "text-5xl md:text-6xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Broken grid, built intent.
            </h3>
          </div>
          <div className="grid gap-2">
            {projects.map((project, index) => (
              <div className={cn("border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2", index === 1 ? "translate-x-3" : "")} key={project}>
                <p className="text-[10px] text-[var(--sample-muted)]">0{index + 1}</p>
                <p className="mt-1 text-xs font-bold">{project}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function AvantGardeEditorial({ className, compact = false, style }: Props) {
  const program = ["Talk / 19:30", "Film / black box", "Essay / reading room"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="grid grid-cols-[auto_1fr_auto] items-center border-b-2 border-[var(--sample-border)] pb-2 text-[10px] font-bold">
          <span>AG</span>
          <span className="px-3 text-[var(--sample-muted)]">Program / Publishing</span>
          <span>2026</span>
        </div>
        <div className={cn("grid min-h-0 gap-4 pt-4", compact ? "grid-cols-[1fr_0.8fr]" : "grid-cols-1 md:grid-cols-[1.05fr_0.95fr]")}>
          <div className="flex min-w-0 flex-col justify-between">
            <h3
              className={cn("break-words font-display leading-[0.9]", compact ? "text-3xl" : "text-5xl md:text-7xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Culture should disturb the grid.
            </h3>
            <div className={cn("mt-4 grid grid-cols-[6rem_1fr] items-end gap-3", compact ? "hidden" : "")}>
              <span className="h-12 bg-[var(--sample-accent)]" />
              <p className="max-w-[14rem] text-xs leading-5 text-[var(--sample-muted)]">A cultural program page with poster tension, dates, modules, and readable asymmetry.</p>
            </div>
          </div>
          <div className="grid gap-2">
            {program.map((item, index) => (
              <div className="grid grid-cols-[2rem_1fr] border-2 border-[var(--sample-border)]" key={item}>
                <span className="grid place-items-center bg-[var(--sample-text)] text-[10px] text-[var(--sample-base)]">0{index + 1}</span>
                <span className="px-3 py-2 text-xs font-bold">{item}</span>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2">
              {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color) => (
                <span className="h-8" key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function PostmodernMemphisPortal({ className, compact = false, style }: Props) {
  const shapes = ["Chair", "Lamp", "Vase"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, var(--sample-accent) 0 5px, transparent 6px), linear-gradient(135deg, transparent 0 48%, var(--sample-accent-3) 48% 52%, transparent 52%)",
          backgroundSize: "42px 42px, 28px 28px",
        }}
      />
      <div className="relative grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between pb-3">
          <span className="rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-1 text-xs font-black">Memphis portal</span>
          <span className="h-8 w-8 rounded-full bg-[var(--sample-accent-2)]" />
        </div>
        <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[0.9fr_1.1fr]")}>
          <div className="rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-4" style={{ boxShadow: "var(--st-shadow)" }}>
            <span className="inline-block rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-3 py-1 text-[10px] font-black">$240 / object</span>
            <h3
              className={cn("mt-3 break-words font-display leading-[0.95]", compact ? "text-3xl" : "text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Rules are props.
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {shapes.map((shape, index) => (
              <div className="min-w-0 rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" key={shape}>
                <span className={cn("block aspect-square", index === 0 ? "rounded-full" : index === 1 ? "skew-x-[-12deg]" : "")} style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3][index] }} />
                <p className="mt-2 truncate text-xs font-black">{shape}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function RetroDinerShop({ className, compact = false, style }: Props) {
  const products = ["Soda", "Vinyl", "Tote"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between pb-3">
          <span className="rounded-full bg-[var(--sample-text)] px-3 py-1 text-xs font-bold text-[var(--sample-base)]">Retro radio mart</span>
          <span className="rounded-full border-2 border-[var(--sample-border)] px-3 py-1 text-[10px] font-bold">ON AIR</span>
        </div>
        <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[0.9fr_1.1fr]")}>
          <div className="relative overflow-hidden rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)] p-4">
            <div className={cn("absolute right-4 top-4 grid aspect-square w-20 place-items-center rounded-full border-4 border-[var(--sample-border)] bg-[var(--sample-surface)]", compact ? "hidden" : "")}>
              <span className="aspect-square w-7 rounded-full bg-[var(--sample-text)]" />
            </div>
            <h3
              className={cn("break-words font-display leading-[0.95]", compact ? "text-3xl" : "text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Tune in, shop later.
            </h3>
            <div className={cn("mt-4 grid grid-cols-[1fr_auto] items-center rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-3 py-2 text-xs font-bold", compact ? "hidden" : "")}>
              <span>FM 74.5 summer shelf</span>
              <span>play</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {products.map((product, index) => (
              <div className="rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" key={product}>
                <span className="block aspect-square rounded-full" style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3][index] }} />
                <p className="mt-2 truncate text-xs font-bold">{product}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function VintagePaperCatalog({ className, compact = false, style }: Props) {
  const rows = compact ? ["Jacket", "Boot", "Tin"] : ["Wax jacket", "Field boot", "Tool tin", "Archive bag"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--sample-border) 0 1px, transparent 1px)", backgroundSize: "11px 11px" }} />
      <div className="relative grid h-full grid-rows-[auto_1fr] border border-[var(--sample-border)] bg-[var(--sample-surface)]">
        <div className="flex items-center justify-between border-b border-[var(--sample-border)] px-3 py-2 text-[10px]">
          <span>Heritage catalog / mail order</span>
          <span>Est. 1912</span>
        </div>
        <div className={cn("grid min-h-0", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-1 md:grid-cols-[0.8fr_1.2fr]")}>
          <div className="border-r border-[var(--sample-border)] p-4">
            <h3
              className={cn("break-words font-display leading-[1.02]", compact ? "text-2xl" : "text-4xl md:text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Archival goods, ordered by hand.
            </h3>
            <span className={cn("mt-5 grid h-14 w-20 rotate-[-8deg] place-items-center rounded-full border border-[var(--sample-border)] text-[10px]", compact ? "hidden" : "")}>
              INSPECTED
            </span>
          </div>
          <div className="grid">
            {rows.map((row, index) => (
              <div className="grid grid-cols-[2rem_1fr_auto] border-b border-[var(--sample-border)] px-2 py-2 last:border-b-0" key={row}>
                <span className="text-[10px] text-[var(--sample-muted)]">0{index + 1}</span>
                <span className="truncate text-xs font-semibold">{row}</span>
                <span className="text-[10px] text-[var(--sample-muted)]">${[48, 92, 18, 64][index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function SeventiesGroovyLanding({ className, compact = false, style }: Props) {
  const cards = ["Listen", "Shop", "Gather"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="absolute left-0 right-0 top-12 h-16 rounded-[0_0_50%_50%] bg-[var(--sample-accent)] opacity-70" />
      <div className="relative grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between pb-4">
          <span className="rounded-full bg-[var(--sample-text)] px-3 py-1 text-xs font-bold text-[var(--sample-base)]">Groove house</span>
          <span className="rounded-full bg-[var(--sample-accent-2)] px-3 py-1 text-[10px] font-bold">RSVP</span>
        </div>
        <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1fr_0.95fr]")}>
          <div className="rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-4" style={{ boxShadow: "var(--st-shadow)" }}>
            <h3
              className={cn("break-words font-display leading-[0.98]", compact ? "text-3xl" : "text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Warm curves for easy days.
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {cards.map((card, index) => (
              <div className="rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" key={card}>
                <span className="block h-12 rounded-full" style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3][index] }} />
                <p className="mt-2 truncate text-xs font-bold">{card}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function EightiesSynthConsole({ className, compact = false, style }: Props) {
  const tracks = ["FM", "VHS", "Arcade"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-30" style={{ backgroundImage: "linear-gradient(var(--sample-accent-2) 1px, transparent 1px), linear-gradient(90deg, var(--sample-accent-2) 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <div className="relative grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between border border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2 font-mono text-[10px]">
          <span>SYNTH://88</span>
          <span className="text-[var(--sample-accent)]">ON AIR</span>
        </div>
        <div className={cn("grid gap-3 pt-3", compact ? "grid-cols-[1fr_0.8fr]" : "grid-cols-1 md:grid-cols-[1fr_0.9fr]")}>
          <div className="border border-[var(--sample-border)] bg-[var(--sample-surface)] p-4" style={{ boxShadow: "var(--st-shadow)" }}>
            <h3
              className={cn("break-words font-display leading-[0.95]", compact ? "text-3xl" : "text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Neon signal, midnight grid.
            </h3>
          </div>
          <div className="grid gap-2">
            {tracks.map((track, index) => (
              <div className="border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2 font-mono text-xs" key={track}>
                <span>{track}</span>
                <span className="mt-2 block h-2" style={{ width: `${[80, 54, 92][index]}%`, backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3][index] }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function NinetiesGraphicZine({ className, compact = false, style }: Props) {
  const windows = ["Drop", "Links", "Guestbook"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(45deg, var(--sample-accent-3) 25%, transparent 25%), linear-gradient(-45deg, var(--sample-accent-3) 25%, transparent 25%)", backgroundSize: "24px 24px" }} />
      <div className="relative grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2 text-[10px] font-black">
          <span>browser window</span>
          <span>[x]</span>
        </div>
        <div className={cn("grid gap-2 pt-3", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1fr_0.9fr]")}>
          <div className="border-4 border-[var(--sample-border)] bg-[var(--sample-surface)] p-3" style={{ boxShadow: "var(--st-shadow)" }}>
            <h3
              className={cn("break-words font-display leading-[0.9]", compact ? "text-3xl" : "text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Web stickers and loud links.
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {windows.map((window, index) => (
              <span className="border-4 border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2 text-xs font-black" key={window} style={{ backgroundColor: index === 1 ? style.palette.accent3 : style.palette.surface }}>
                {window}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function Y2KGlossPortal({ className, compact = false, style }: Props) {
  const widgets = ["Profile", "Chat", "Hits"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <div className="flex items-center justify-between rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2 text-[10px] font-bold" style={{ boxShadow: "var(--st-shadow)" }}>
          <span>Crystal portal</span>
          <span>login</span>
        </div>
        <div className={cn("grid min-h-0 gap-3 pt-4", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[0.92fr_1.08fr]")}>
          <div className="rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[linear-gradient(145deg,var(--sample-surface),var(--sample-accent)_42%,var(--sample-accent-2))] p-4" style={{ boxShadow: "var(--st-shadow)" }}>
            <h3
              className={cn("break-words font-display leading-[0.98]", compact ? "text-3xl" : "text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Glossy widgets for web dreams.
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {widgets.map((widget, index) => (
              <div className="rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" key={widget}>
                <span className="block h-10 rounded-full" style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3][index] }} />
                <p className="mt-2 truncate text-[10px] font-bold">{widget}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function RetroFuturismFlightDeck({ className, compact = false, style }: Props) {
  const destinations = compact ? ["Moon", "Mars", "Titan"] : ["Lunar resort", "Mars canyons", "Titan seas"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 14px 14px, var(--sample-accent-3) 0 2px, transparent 3px)", backgroundSize: "30px 30px" }} />
      <div
        aria-hidden="true"
        className="absolute right-[-3rem] top-12 h-28 w-56 rotate-[-14deg] rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-[-2.5rem] h-20 w-44 rotate-[18deg] rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent)]"
      />

      <div className="relative grid h-full grid-rows-[auto_1fr] gap-3">
        <div className="flex items-center justify-between rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2 text-[10px] font-bold text-[var(--sample-text)]" style={{ boxShadow: "var(--st-shadow)" }}>
          <span>Worlds Fair Travel Bureau</span>
          <span>1962 / 2084</span>
        </div>

        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[1.05fr_0.95fr]" : "grid-cols-1 md:grid-cols-[1.06fr_0.94fr]")}>
          <div className="relative min-w-0 overflow-hidden rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-4" style={{ boxShadow: "var(--st-shadow)" }}>
            <span
              aria-hidden="true"
              className="absolute right-5 top-5 h-16 w-16 bg-[var(--sample-accent-3)]"
              style={{ clipPath: "polygon(50% 0, 58% 36%, 100% 50%, 58% 64%, 50% 100%, 42% 64%, 0 50%, 42% 36%)" }}
            />
            <span aria-hidden="true" className="absolute bottom-5 right-7 h-20 w-20 rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)]" />
            <span aria-hidden="true" className="absolute bottom-9 right-3 h-8 w-32 rotate-[-16deg] rounded-full border-2 border-[var(--sample-border)]" />
            <p className="relative w-max rounded-full bg-[var(--sample-accent)] px-3 py-1 text-[10px] font-bold uppercase text-[var(--sample-surface)]">
              Grand tour
            </p>
            <h3
              className={cn("relative mt-4 max-w-[12rem] break-words font-display leading-[0.9] text-[var(--sample-text)]", compact ? "text-3xl" : "text-5xl md:text-6xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Tomorrow looked like a holiday.
            </h3>
            <div className={cn("relative mt-5 flex flex-wrap gap-2", compact ? "hidden" : "")}>
              <span className="rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-3 py-1 text-xs font-bold text-[var(--sample-text)]">Moon deck</span>
              <span className="rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-1 text-xs font-bold text-[var(--sample-text)]">Depart 08:40</span>
            </div>
          </div>

          <div className="grid min-w-0 grid-rows-[auto_1fr] gap-2">
            <div className="rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)] p-3 text-[var(--sample-text)]">
              <p className="text-[10px] font-bold uppercase">Ticket window</p>
              <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-3">
                <div>
                  <p className="text-2xl font-black leading-none">3 stops</p>
                  <p className="mt-1 text-[10px] font-bold opacity-75">atomic route pass</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] text-xs font-black">GO</span>
              </div>
            </div>
            <div className="grid gap-2">
              {destinations.map((destination, index) => (
                <div className="grid grid-cols-[auto_1fr_auto] items-center rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2 text-[var(--sample-text)]" key={destination}>
                  <span
                    className="mr-3 h-6 w-6 rounded-full border-2 border-[var(--sample-border)]"
                    style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3][index] }}
                  />
                  <span className="truncate text-xs font-bold">{destination}</span>
                  <span className="text-[10px] font-bold">0{index + 1}</span>
                </div>
              ))}
              <div className={cn("rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-text)] px-3 py-2 text-center text-[10px] font-bold text-[var(--sample-base)]", compact ? "hidden" : "")}>
                Reserve a seat to the future
              </div>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function BrutalistPoster({ compact = false, style }: Props) {
  return (
    <SampleFrame compact={compact} className="bg-[var(--sample-base)]" style={style}>
      <AccentOrb className="left-[-20%] top-[-12%] h-44 w-44 bg-[var(--sample-accent)] opacity-70" />
      <AccentOrb className="bottom-[-20%] right-[-10%] h-40 w-40 bg-[var(--sample-accent-2)] opacity-70" />
      <div className="relative flex h-full flex-col justify-between">
        <MiniNav compact={compact} />
        <div>
          <p className="mb-3 w-max bg-[var(--sample-accent)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--sample-base)]">
            Raw format
          </p>
          <h3
            className={cn("break-words font-display font-bold uppercase tracking-[-0.05em]", compact ? "text-6xl leading-[0.75]" : "text-5xl leading-[0.78] md:text-9xl md:leading-[0.7]")}
            style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
          >
            {style.nameEn}
          </h3>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-end gap-4 border-t-2 border-[var(--sample-border)] pt-3">
          <p className="line-clamp-2 text-xs font-medium leading-5 text-[var(--sample-muted)]" style={{ fontFamily: "var(--st-font-body)" }}>
            {style.summary}
          </p>
          <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-[var(--sample-border)] text-lg font-bold">
            →
          </span>
        </div>
      </div>
    </SampleFrame>
  );
}

function RetroCommerce({ compact = false, style }: Props) {
  return (
    <SampleFrame compact={compact} style={style}>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--sample-border-soft)_1px,transparent_1px),linear-gradient(var(--sample-border-soft)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
      <div className="relative">
        <MiniNav compact={compact} />
        <div
          className={cn("mt-5 rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)] px-5 py-3 text-center font-display font-bold uppercase tracking-[-0.04em]", compact ? "text-3xl" : "text-4xl md:text-6xl")}
          style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
        >
          New Drop
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color, index) => (
            <div className="border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" key={color} style={{ borderRadius: "var(--st-radius)" }}>
              <span className="block aspect-square rounded-full" style={{ backgroundColor: color }} />
              <span className="mt-2 block h-2 bg-[var(--sample-text)]" />
              <span className="mt-1 block h-2 w-2/3 bg-[var(--sample-muted)]" />
              <span className="mt-2 block text-[10px] font-bold">0{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function CyberDashboard({ compact = false, style }: Props) {
  return (
    <SampleFrame compact={compact} className="bg-[var(--sample-base)] text-[var(--sample-text)]" style={style}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,var(--sample-accent)_0,transparent_28%),radial-gradient(circle_at_90%_20%,var(--sample-accent-2)_0,transparent_24%)] opacity-25" />
      <div className="relative grid h-full grid-rows-[auto_1fr] gap-4">
        <MiniNav compact={compact} />
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-3">
          <div className="space-y-3">
            {[68, 42, 86].map((width, index) => (
              <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)]/60 p-3" key={width}>
                <p className="text-[9px] uppercase tracking-[0.22em] text-[var(--sample-muted)]">Node 0{index + 1}</p>
                <div className="mt-3 h-2 bg-[var(--sample-border-soft)]">
                  <span className="block h-full bg-[var(--sample-accent)]" style={{ width: `${width}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden border border-[var(--sample-border-soft)] bg-[var(--sample-surface)]/45 p-4" style={{ borderRadius: "var(--st-radius)", boxShadow: "var(--st-shadow)" }}>
            <h3
              className={cn("break-words font-display font-bold uppercase leading-none tracking-[-0.04em]", compact ? "text-4xl" : "text-4xl md:text-7xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              {style.nameEn}
            </h3>
            <div className="absolute bottom-4 left-4 right-4 flex items-end gap-2">
              {[32, 72, 48, 88, 60].map((height) => (
                <span className="flex-1 bg-[var(--sample-accent-2)]" key={height} style={{ height: `${height}px` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function LuxuryProduct({ compact = false, style }: Props) {
  return (
    <SampleFrame compact={compact} style={style}>
      <div className="grid h-full grid-cols-[0.78fr_1.22fr] gap-5">
        <div className="flex flex-col justify-between border-r border-[var(--sample-border-soft)] pr-4">
          <MiniNav compact={compact} />
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--sample-muted)]">Atelier edition</p>
            <h3
              className={cn("mt-3 break-words font-display font-bold uppercase tracking-[-0.04em]", compact ? "text-4xl leading-[0.86]" : "text-4xl leading-[0.86] md:text-7xl md:leading-[0.78]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              {style.nameEn}
            </h3>
          </div>
          <span className="h-px w-full bg-[var(--sample-accent)]" />
        </div>
        <div className="grid place-items-center bg-[var(--sample-surface)]">
          <div className="aspect-[3/4] w-2/3 border border-[var(--sample-border-soft)] bg-[linear-gradient(145deg,var(--sample-accent-2),var(--sample-surface)_55%,var(--sample-accent-3))]" style={{ borderRadius: "var(--st-radius)", boxShadow: "var(--st-shadow)" }} />
        </div>
      </div>
    </SampleFrame>
  );
}

function OrganicBrand({ compact = false, style }: Props) {
  return (
    <SampleFrame compact={compact} style={style}>
      <div className="absolute left-[-8%] top-[18%] h-44 w-44 rounded-[48%_52%_40%_60%] bg-[var(--sample-accent-2)] opacity-40 blur-xl" />
      <div className="absolute bottom-[-14%] right-[-10%] h-52 w-52 rounded-[60%_40%_58%_42%] bg-[var(--sample-accent)] opacity-35 blur-xl" />
      <div className="relative h-full">
        <MiniNav compact={compact} />
        <div className={cn("mt-8 grid gap-4", compact ? "grid-cols-[1fr_0.75fr]" : "grid-cols-[1fr_0.9fr]")}>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sample-muted)]">Natural system</p>
            <h3
              className={cn("mt-3 break-words font-display font-bold uppercase tracking-[-0.04em]", compact ? "text-5xl leading-[0.82]" : "text-5xl leading-[0.82] md:text-8xl md:leading-[0.78]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              {style.nameEn}
            </h3>
          </div>
          <div className="space-y-2">
            {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color) => (
              <div className="rounded-[48%_52%_44%_56%] border border-[var(--sample-border-soft)] p-3" key={color}>
                <span className="block h-9 rounded-[54%_46%_56%_44%]" style={{ backgroundColor: color }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function KawaiiApp({ compact = false, style }: Props) {
  return (
    <SampleFrame compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr] gap-4">
        <MiniNav compact={compact} />
        <div className="rounded-[28px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-4" style={{ borderRadius: "var(--st-radius)", boxShadow: "var(--st-shadow)" }}>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--sample-accent)] text-lg font-bold text-[var(--sample-base)]">★</span>
            <div>
              <h3
                className={cn("break-words font-display font-bold uppercase leading-none tracking-[-0.04em]", compact ? "text-3xl" : "text-3xl md:text-5xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                {style.nameEn}
              </h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--sample-muted)]">daily app</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color) => (
              <span className="aspect-square rounded-[22px] border-2 border-[var(--sample-border)]" key={color} style={{ backgroundColor: color }} />
            ))}
          </div>
          <div className="mt-4 h-8 rounded-full bg-[var(--sample-primary)]" />
        </div>
      </div>
    </SampleFrame>
  );
}

function StreetCampaign({ compact = false, style }: Props) {
  return (
    <SampleFrame compact={compact} style={style}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0_45%,var(--sample-accent)_45%_53%,transparent_53%)] opacity-35" />
      <div className="relative h-full">
        <MiniNav compact={compact} />
        <div className="mt-5 rotate-[-3deg] border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] p-3 text-[var(--sample-base)]" style={{ borderRadius: "var(--st-radius)" }}>
          <h3
            className={cn("break-words font-display font-bold uppercase tracking-[-0.05em]", compact ? "text-5xl leading-[0.78]" : "text-5xl leading-[0.78] md:text-8xl md:leading-[0.72]")}
            style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
          >
            {style.nameEn}
          </h3>
        </div>
        <div className="mt-[-6px] grid rotate-[2deg] grid-cols-2 gap-2">
          <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em]">drop</span>
          <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em]">now</span>
        </div>
      </div>
    </SampleFrame>
  );
}

function MagazineLayout({ compact = false, style }: Props) {
  return (
    <SampleFrame compact={compact} style={style}>
      <div className="grid h-full grid-cols-[0.85fr_1.15fr] gap-4">
        <div className="border-r border-[var(--sample-border-soft)] pr-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--sample-muted)]">Issue 06</p>
          <h3
            className={cn("mt-3 break-words font-display font-bold uppercase tracking-[-0.05em]", compact ? "text-5xl leading-[0.78]" : "text-5xl leading-[0.78] md:text-8xl md:leading-[0.72]")}
            style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
          >
            {style.nameEn}
          </h3>
        </div>
        <div className="grid grid-rows-[1fr_auto] gap-3">
          <div className="grid grid-cols-2 gap-2">
            <span className="bg-[var(--sample-accent)]" />
            <span className="bg-[var(--sample-accent-2)]" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <span className="h-2 bg-[var(--sample-text)] opacity-55" key={item} />
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function SaasLanding({ compact = false, style }: Props) {
  return (
    <SampleFrame compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
        <MiniNav compact={compact} />
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sample-accent)]">Product system</p>
            <h3
              className={cn("mt-3 break-words font-display font-bold uppercase tracking-[-0.05em]", compact ? "text-5xl leading-[0.82]" : "text-5xl leading-[0.82] md:text-8xl md:leading-[0.78]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              {style.nameEn}
            </h3>
            <div className="mt-5 h-9 w-32 bg-[var(--sample-primary)]" style={{ borderRadius: "var(--st-radius)" }} />
          </div>
          <div className="space-y-2">
            {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color, index) => (
              <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-3" key={color} style={{ borderRadius: "var(--st-radius)", boxShadow: "var(--st-shadow)" }}>
                <span className="block h-2 w-1/2" style={{ backgroundColor: color }} />
                <span className="mt-3 block text-2xl font-bold">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="h-3 bg-[var(--sample-accent)]" />
          <span className="h-3 bg-[var(--sample-accent-2)]" />
          <span className="h-3 bg-[var(--sample-accent-3)]" />
        </div>
      </div>
    </SampleFrame>
  );
}

export function DesignStyleSampleRenderer({ compact = false, style, className }: Props) {
  const props = { className, compact, style };

  if (style.slug === "minimalism") {
    return <MinimalismProductSystem {...props} />;
  }

  if (style.slug === "modernism") {
    return <ModernismFunctionalGrid {...props} />;
  }

  if (style.slug === "swiss-design") {
    return <SwissInformationGrid {...props} />;
  }

  if (style.slug === "international-style") {
    return <InternationalSystemPortal {...props} />;
  }

  if (style.slug === "scandinavian") {
    return <ScandinavianCommerceHome {...props} />;
  }

  if (style.slug === "japandi") {
    return <JapandiSpatialLanding {...props} />;
  }

  if (style.slug === "warm-minimal") {
    return <WarmMinimalStudio {...props} />;
  }

  if (style.slug === "soft-minimal") {
    return <SoftMinimalService {...props} />;
  }

  if (style.slug === "high-end-minimal") {
    return <HighEndMinimalProduct {...props} />;
  }

  if (style.slug === "brutalism") {
    return <RawBrutalistIndex {...props} />;
  }

  if (style.slug === "new-brutalism") {
    return <NeoBrutalistApp {...props} />;
  }

  if (style.slug === "anti-design") {
    return <AntiDesignLanding {...props} />;
  }

  if (style.slug === "maximalism") {
    return <MaximalistPatternMarket {...props} />;
  }

  if (style.slug === "glitch-art") {
    return <GlitchArtInterface {...props} />;
  }

  if (style.slug === "deconstructivism") {
    return <DeconstructiveExhibition {...props} />;
  }

  if (style.slug === "avant-garde") {
    return <AvantGardeEditorial {...props} />;
  }

  if (style.slug === "postmodernism") {
    return <PostmodernMemphisPortal {...props} />;
  }

  if (style.slug === "retro") {
    return <RetroDinerShop {...props} />;
  }

  if (style.slug === "vintage") {
    return <VintagePaperCatalog {...props} />;
  }

  if (style.slug === "seventies-retro") {
    return <SeventiesGroovyLanding {...props} />;
  }

  if (style.slug === "eighties-retro") {
    return <EightiesSynthConsole {...props} />;
  }

  if (style.slug === "nineties-graphic") {
    return <NinetiesGraphicZine {...props} />;
  }

  if (style.slug === "y2k") {
    return <Y2KGlossPortal {...props} />;
  }

  if (style.slug === "retro-futurism") {
    return <RetroFuturismFlightDeck {...props} />;
  }

  switch (style.sampleType) {
    case "brutalist-poster":
      return <BrutalistPoster {...props} />;
    case "retro-commerce":
      return <RetroCommerce {...props} />;
    case "cyber-dashboard":
      return <CyberDashboard {...props} />;
    case "luxury-product":
      return <LuxuryProduct {...props} />;
    case "organic-brand":
      return <OrganicBrand {...props} />;
    case "kawaii-app":
      return <KawaiiApp {...props} />;
    case "street-campaign":
      return <StreetCampaign {...props} />;
    case "magazine-layout":
      return <MagazineLayout {...props} />;
    case "saas-landing":
      return <SaasLanding {...props} />;
    case "minimal-editorial":
    default:
      return <MinimalEditorial {...props} />;
  }
}
