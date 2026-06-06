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

/* ------------------------------------------------------------------ *
 * Shared sample primitives
 * Goal: make token-driven previews read like real, photographed web
 * pages instead of flat wireframe blocks.
 * ------------------------------------------------------------------ */

const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Layered gradients tuned to read as lit photography. Colours are pulled
 * from the active style palette (via --sample-* vars) so the "photo" stays
 * on-brand; the realism comes from light fall-off, soft shadow and grain.
 */
const PHOTO_SCENES = {
  interior:
    "radial-gradient(120% 85% at 28% 6%, color-mix(in srgb, var(--sample-surface) 55%, #ffffff) 0%, transparent 52%)," +
    "radial-gradient(150% 120% at 88% 116%, color-mix(in srgb, var(--sample-accent-2) 62%, #000000 22%) 0%, transparent 58%)," +
    "linear-gradient(165deg, color-mix(in srgb, var(--sample-accent-2) 52%, var(--sample-surface)) 0%, var(--sample-surface) 46%, color-mix(in srgb, var(--sample-base) 80%, var(--sample-accent-2)) 100%)",
  product:
    "radial-gradient(68% 58% at 50% 34%, color-mix(in srgb, var(--sample-surface) 45%, #ffffff) 0%, transparent 62%)," +
    "radial-gradient(130% 90% at 50% 128%, color-mix(in srgb, var(--sample-accent-2) 58%, #000000 26%) 0%, transparent 54%)," +
    "linear-gradient(180deg, color-mix(in srgb, var(--sample-surface) 88%, #ffffff) 0%, color-mix(in srgb, var(--sample-surface) 62%, var(--sample-accent-2)) 100%)",
  portrait:
    "radial-gradient(95% 68% at 62% 14%, color-mix(in srgb, var(--sample-surface) 50%, #ffffff) 0%, transparent 48%)," +
    "linear-gradient(180deg, color-mix(in srgb, var(--sample-accent-2) 42%, var(--sample-surface)) 0%, color-mix(in srgb, var(--sample-accent-2) 60%, var(--sample-text) 38%) 100%)",
  material:
    "linear-gradient(122deg, color-mix(in srgb, var(--sample-surface) 72%, #ffffff) 0%, var(--sample-accent-2) 40%, color-mix(in srgb, var(--sample-accent) 46%, var(--sample-accent-2)) 100%)",
  studio:
    "radial-gradient(80% 70% at 50% 22%, color-mix(in srgb, var(--sample-surface) 40%, #ffffff) 0%, transparent 60%)," +
    "linear-gradient(180deg, var(--sample-surface) 0%, color-mix(in srgb, var(--sample-surface) 64%, var(--sample-accent-2)) 70%, color-mix(in srgb, var(--sample-accent-2) 70%, #000000 14%) 100%)",
  // Crisp editorial fashion shot: a soft-edged figure/garment mass on a clean,
  // high-key studio backdrop. Used clean (no grain) for a luxury feel.
  couture:
    "radial-gradient(38% 66% at 52% 78%, color-mix(in srgb, var(--sample-text) 82%, var(--sample-accent-2)) 0%, color-mix(in srgb, var(--sample-text) 38%, transparent) 46%, transparent 72%)," +
    "radial-gradient(120% 60% at 50% 6%, color-mix(in srgb, var(--sample-surface) 30%, #ffffff) 0%, transparent 58%)," +
    "linear-gradient(180deg, color-mix(in srgb, var(--sample-surface) 90%, #ffffff) 0%, var(--sample-surface) 52%, color-mix(in srgb, var(--sample-surface) 72%, var(--sample-accent-2)) 100%)",
  // Clean high-key seamless studio backdrop — a base for vector illustrations.
  seamless:
    "radial-gradient(90% 55% at 50% 100%, color-mix(in srgb, var(--sample-accent-2) 40%, transparent) 0%, transparent 60%)," +
    "linear-gradient(180deg, color-mix(in srgb, var(--sample-surface) 94%, #ffffff) 0%, var(--sample-surface) 48%, color-mix(in srgb, var(--sample-surface) 80%, var(--sample-accent-2)) 100%)",
} as const;

type PhotoScene = keyof typeof PHOTO_SCENES;

function PhotoSurface({
  scene = "interior",
  className,
  grain = true,
  children,
  style,
}: {
  scene?: PhotoScene;
  className?: string;
  grain?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-[var(--sample-surface)]", className)}
      style={{ backgroundImage: PHOTO_SCENES[scene], ...style }}
    >
      {grain ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
          style={{ backgroundImage: GRAIN_URI, backgroundSize: "150px 150px" }}
        />
      ) : null}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.28), inset 0 -52px 64px -42px rgb(0 0 0 / 0.32)" }}
      />
      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
    </div>
  );
}

function GlyphIcon({ children, size = 14, className }: { children: ReactNode; size?: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      width={size}
    >
      {children}
    </svg>
  );
}

const IconSearch = ({ size, className }: { size?: number; className?: string }) => (
  <GlyphIcon className={className} size={size}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.35-4.35" />
  </GlyphIcon>
);
const IconBag = ({ size, className }: { size?: number; className?: string }) => (
  <GlyphIcon className={className} size={size}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </GlyphIcon>
);
const IconUser = ({ size, className }: { size?: number; className?: string }) => (
  <GlyphIcon className={className} size={size}>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
  </GlyphIcon>
);
const IconGlobe = ({ size, className }: { size?: number; className?: string }) => (
  <GlyphIcon className={className} size={size}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" />
  </GlyphIcon>
);
const IconArrow = ({ size, className }: { size?: number; className?: string }) => (
  <GlyphIcon className={className} size={size}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </GlyphIcon>
);
const IconStar = ({ size, className }: { size?: number; className?: string }) => (
  <svg aria-hidden="true" className={className} fill="currentColor" height={size ?? 12} viewBox="0 0 24 24" width={size ?? 12}>
    <path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4Z" />
  </svg>
);

type NavProps = {
  brand: ReactNode;
  sub?: string;
  links: string[];
  icons?: ReactNode[];
  align?: "left" | "center";
  compact?: boolean;
  bordered?: boolean;
  className?: string;
};

/** Realistic top navigation with brand, links and optional utility icons. */
function SampleNav({ brand, sub, links, icons = [], align = "left", compact = false, bordered = true, className }: NavProps) {
  const visibleLinks = compact ? links.slice(0, align === "center" ? 2 : 3) : links;
  const brandBlock = (
    <div className="flex min-w-0 flex-col leading-tight">
      <span
        className="truncate font-semibold text-[var(--sample-text)]"
        style={{ fontFamily: "var(--st-font-display)", fontSize: compact ? "0.72rem" : "0.95rem", letterSpacing: "var(--st-tracking)" }}
      >
        {brand}
      </span>
      {sub ? <span className="truncate text-[9px] uppercase tracking-[0.18em] text-[var(--sample-muted)]">{sub}</span> : null}
    </div>
  );
  const linkBlock = (
    <nav
      className="flex items-center gap-4 text-[var(--sample-muted)]"
      style={{ fontSize: compact ? "0.6rem" : "0.72rem", gap: compact ? "0.7rem" : undefined }}
    >
      {visibleLinks.map((label) => (
        <span className="whitespace-nowrap transition-colors hover:text-[var(--sample-text)]" key={label}>
          {label}
        </span>
      ))}
    </nav>
  );
  const iconBlock = icons.length ? (
    <div className="flex items-center gap-3 text-[var(--sample-text)]">{icons.map((icon, index) => <span key={index}>{icon}</span>)}</div>
  ) : null;

  const padding = compact ? "pb-2.5" : "pb-3.5";
  const border = bordered ? "border-b border-[var(--sample-border-soft)]" : "";

  if (align === "center") {
    return (
      <header className={cn("grid grid-cols-[1fr_auto_1fr] items-center gap-3", border, padding, className)}>
        {brandBlock}
        {linkBlock}
        <div className="flex items-center justify-end gap-3 text-[var(--sample-text)]">{iconBlock}</div>
      </header>
    );
  }

  return (
    <header className={cn("flex items-center gap-4", border, padding, className)}>
      {brandBlock}
      <div className="ml-auto flex items-center gap-5">
        {linkBlock}
        {iconBlock}
      </div>
    </header>
  );
}

/**
 * Layered gradient stack that reads as a real, softly-lit photograph of
 * draped wool-silk: diagonal folds catching light, a lit corner and a
 * shadowed corner for depth. Toned with palette vars (duotone), then
 * blurred + grained so it looks photographic rather than like flat shapes.
 */
const PHOTO_FIGURE =
  // soft fold ridges and valleys raking diagonally across the cloth
  "repeating-linear-gradient(57deg," +
  " transparent 0px," +
  " color-mix(in srgb, var(--sample-text) 22%, transparent) 22px," +
  " transparent 46px," +
  " color-mix(in srgb, #ffffff 26%, transparent) 70px," +
  " transparent 96px)," +
  // secondary finer folds for irregularity
  "repeating-linear-gradient(54deg," +
  " transparent 0px," +
  " color-mix(in srgb, var(--sample-text) 12%, transparent) 9px," +
  " transparent 26px)," +
  // lit corner (upper left)
  "radial-gradient(115% 95% at 22% 12%, color-mix(in srgb, #ffffff 52%, var(--sample-surface)) 0%, transparent 56%)," +
  // shadowed corner (lower right)
  "radial-gradient(120% 100% at 88% 96%, color-mix(in srgb, var(--sample-text) 64%, var(--sample-accent-2)) 0%, transparent 58%)," +
  // base duotone body of the fabric
  "linear-gradient(125deg," +
  " color-mix(in srgb, var(--sample-surface) 90%, #ffffff) 0%," +
  " color-mix(in srgb, var(--sample-text) 28%, var(--sample-accent-2)) 54%," +
  " color-mix(in srgb, var(--sample-surface) 78%, var(--sample-accent-2)) 100%)";

function DuotoneEditorial({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={cn("relative overflow-hidden bg-[var(--sample-surface)]", className)}>
      {/* photographic tonal field, softened so folds read as cloth not stripes */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: PHOTO_FIGURE, filter: "blur(1.1px) contrast(1.06)" }}
      />
      {/* fine film grain */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "88px 88px" }}
      />
      {/* vignette + top sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 70px 12px rgb(0 0 0 / 0.2), inset 0 1px 0 rgb(255 255 255 / 0.3)" }}
      />
      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
    </div>
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
    ["Active users", "1,284", "+8.2%"],
    ["Cycle time", "2.4d", "-12%"],
    ["Shipped", "32", "this week"],
  ];
  const sidebar = ["Inbox", "My issues", "Projects", "Cycles", "Roadmap"];
  const workItems = [
    ["Launch marketing page", "In review", "var(--sample-accent)"],
    ["Billing flow polish", "In progress", "var(--sample-accent-3)"],
    ["Docs IA refresh", "Done", "var(--sample-muted)"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        <SampleNav
          brand="Northstar"
          compact={compact}
          icons={[
            <span className="text-[var(--sample-muted)]" key="login" style={{ fontSize: compact ? "0.6rem" : "0.72rem" }}>
              Log in
            </span>,
            <span
              className="inline-flex items-center rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-3 py-1.5 font-medium text-[var(--sample-base)]"
              key="cta"
              style={{ fontSize: compact ? "0.58rem" : "0.7rem" }}
            >
              Get started
            </span>,
          ]}
          links={["Product", "Customers", "Pricing", "Docs", "Changelog"]}
        />

        <div className={cn("grid flex-1 gap-6", compact ? "grid-cols-1 pt-4" : "grid-cols-1 pt-7 md:grid-cols-[0.82fr_1.18fr] md:gap-8 md:pt-9")}>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--sample-accent)]">Built for focused teams</p>
            <h3
              className={cn("mt-4 max-w-[14ch] font-display leading-[1.02] tracking-tight [text-wrap:balance]", compact ? "text-[1.6rem]" : "text-[2rem] md:text-[2.7rem] md:leading-[1.0]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              The workspace that stays out of your way.
            </h3>
            <p className={cn("max-w-md text-[var(--sample-muted)]", compact ? "mt-3 line-clamp-2 text-[11px] leading-5" : "mt-5 text-sm leading-6")}>
              Plan, build and ship without the noise. Northstar keeps every team aligned around one calm, fast surface.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex h-9 items-center rounded-[var(--st-radius)] bg-[var(--sample-text)] px-4 text-xs font-medium text-[var(--sample-base)]">
                Start for free
              </span>
              <span className="inline-flex h-9 items-center gap-1.5 rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-4 text-xs font-medium text-[var(--sample-text)]">
                Book a demo <IconArrow size={13} />
              </span>
            </div>
            <div className={cn("mt-8 items-center gap-4 text-[10px] uppercase tracking-[0.14em] text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
              <span>Trusted by</span>
              <span className="flex gap-3 font-semibold text-[var(--sample-text)]/70">
                <span>Vela</span>
                <span>Northwind</span>
                <span>Kessler</span>
              </span>
            </div>
          </div>

          <div className="grid min-h-0">
            <div
              className="overflow-hidden rounded-[calc(var(--st-radius)+4px)] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)]"
              style={{ boxShadow: "0 30px 60px -32px rgb(var(--st-text-rgb) / 0.35), 0 8px 18px -12px rgb(var(--st-text-rgb) / 0.2)" }}
            >
              <div className="flex items-center gap-2 border-b border-[var(--sample-border-soft)] bg-[var(--sample-base)] px-3 py-2">
                <span className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--sample-border)]" />
                  <span className="h-2 w-2 rounded-full bg-[var(--sample-border)]" />
                  <span className="h-2 w-2 rounded-full bg-[var(--sample-border)]" />
                </span>
                <span className="mx-auto rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-6 py-0.5 text-[9px] text-[var(--sample-muted)]">
                  northstar.app/projects
                </span>
              </div>
              <div className={cn("grid", compact ? "grid-cols-[1fr]" : "grid-cols-[5.5rem_1fr]")}>
                <div className={cn("flex-col gap-1 border-r border-[var(--sample-border-soft)] bg-[var(--sample-base)] p-3", compact ? "hidden" : "flex")}>
                  <span className="mb-1 h-4 w-4 rounded-[var(--st-radius)] bg-[var(--sample-accent)]" />
                  {sidebar.map((item, index) => (
                    <span
                      className={cn("rounded-[var(--st-radius)] px-2 py-1 text-[10px]", index === 2 ? "bg-[var(--sample-surface)] font-medium text-[var(--sample-text)]" : "text-[var(--sample-muted)]")}
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="min-w-0 p-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[var(--sample-text)]">Projects overview</p>
                      <p className="mt-0.5 text-[10px] text-[var(--sample-muted)]">June release · 3 active cycles</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-[var(--st-radius-pill)] border border-[var(--sample-border-soft)] px-2.5 py-1 text-[10px] text-[var(--sample-muted)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-accent-3)]" /> On track
                    </span>
                  </div>

                  <div className="mt-3.5 grid grid-cols-3 gap-2">
                    {metrics.map(([label, value, meta]) => (
                      <div className="rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[var(--sample-base)] p-2.5" key={label}>
                        <p className="truncate text-[9px] uppercase tracking-[0.08em] text-[var(--sample-muted)]">{label}</p>
                        <p className="mt-1.5 text-base font-semibold text-[var(--sample-text)]">{value}</p>
                        <p className="mt-0.5 text-[9px] text-[var(--sample-accent)]">{meta}</p>
                      </div>
                    ))}
                  </div>

                  <div className={cn("mt-3 rounded-[var(--st-radius)] border border-[var(--sample-border-soft)]", compact ? "hidden" : "block")}>
                    {workItems.map(([label, status, dot]) => (
                      <div className="flex items-center gap-2.5 border-b border-[var(--sample-border-soft)] px-3 py-2 last:border-b-0" key={label}>
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dot }} />
                        <span className="flex-1 truncate text-[11px] text-[var(--sample-text)]">{label}</span>
                        <span className="text-[10px] text-[var(--sample-muted)]">{status}</span>
                      </div>
                    ))}
                  </div>

                  <div className={cn("mt-3 rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[var(--sample-base)] p-3", compact ? "hidden" : "block")}>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-medium text-[var(--sample-text)]">Velocity</p>
                      <p className="text-[9px] text-[var(--sample-muted)]">Last 12 weeks</p>
                    </div>
                    <div className="mt-3 flex h-12 items-end gap-1.5">
                      {[38, 52, 44, 61, 55, 73, 66, 81, 70, 88, 79, 94].map((height, index) => (
                        <span
                          className="flex-1 rounded-t-[2px]"
                          key={index}
                          style={{ height: `${height}%`, backgroundColor: index >= 10 ? "var(--sample-accent)" : "color-mix(in srgb, var(--sample-accent) 30%, var(--sample-surface))" }}
                        />
                      ))}
                    </div>
                  </div>
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
                <PhotoSurface className="min-h-0" scene="product">
                  <span className="absolute left-2.5 top-2.5 bg-[var(--sample-accent)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white">
                    New
                  </span>
                  <span className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between text-[10px] font-semibold text-[var(--sample-text)]">
                    <span>Lounge Chair 670</span>
                    <span className="bg-[var(--sample-base)]/70 px-1.5 py-0.5">€2,480</span>
                  </span>
                </PhotoSurface>
                <div className="flex items-center justify-between border-t-2 border-[var(--sample-border)] px-3 py-2">
                  <span className="text-xs font-semibold text-[var(--sample-text)]">Object index</span>
                  <span className="text-[10px] text-[var(--sample-muted)]">1920—1960</span>
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
  const sections = compact ? ["World", "Home", "Economy"] : ["World", "Switzerland", "Economy", "Culture", "Science"];
  const stories = [
    ["12:40", "Economy", "Federal rail network reports record punctuality"],
    ["11:05", "Culture", "Type archive opens its modernist poster vault"],
    ["09:30", "Science", "Alpine research station extends climate study"],
  ];
  const departures = [
    ["Zürich HB", "08:42", "on time"],
    ["Basel SBB", "08:51", "+2 min"],
    ["Genève", "09:04", "on time"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_auto_1fr] border border-[var(--sample-border)] bg-[var(--sample-surface)]">
        {/* utility bar */}
        <div className="flex items-center justify-between border-b border-[var(--sample-border-soft)] px-3 py-1.5 text-[9px] font-medium text-[var(--sample-muted)]">
          <span>Wednesday 04 June · Zürich 18°</span>
          <span className="flex items-center gap-2">
            <span className="font-bold text-[var(--sample-text)]">DE</span>
            <span>FR</span>
            <span>IT</span>
            <span>EN</span>
            <IconSearch className="text-[var(--sample-text)]" size={11} />
          </span>
        </div>
        {/* masthead nav */}
        <div className="flex items-center gap-3 border-b border-[var(--sample-border)] px-3 py-2">
          <span className="bg-[var(--sample-accent)] px-1.5 py-1 text-[11px] font-black leading-none text-white">CH</span>
          <span
            className="font-display text-[13px] font-bold tracking-tight text-[var(--sample-text)]"
            style={{ fontFamily: "var(--st-font-display)", letterSpacing: "var(--st-tracking)" }}
          >
            Bulletin
          </span>
          <nav className="ml-auto flex items-center gap-3 text-[10px] font-bold text-[var(--sample-text)]">
            {sections.map((section, index) => (
              <span className={cn("border-b-2 pb-0.5", index === 0 ? "border-[var(--sample-accent)]" : "border-transparent")} key={section}>
                {section}
              </span>
            ))}
          </nav>
        </div>

        <div className={cn("grid min-h-0", compact ? "grid-cols-[1.15fr_0.85fr]" : "grid-cols-1 md:grid-cols-[1.25fr_0.75fr]")}>
          {/* lead column */}
          <div className={cn("flex min-w-0 flex-col p-3.5", compact ? "border-r border-[var(--sample-border)]" : "border-b border-[var(--sample-border)] md:border-b-0 md:border-r")}>
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em]">
              <span className="bg-[var(--sample-accent)] px-1.5 py-0.5 text-white">Top story</span>
              <span className="text-[var(--sample-muted)]">Economy · 4 min read</span>
            </div>
            <h3
              className={cn("mt-3 font-display leading-[0.92]", compact ? "text-2xl" : "text-[2rem] md:text-[2.7rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Clear public information for every region.
            </h3>
            <PhotoSurface className={cn("mt-3 w-full flex-1", compact ? "min-h-[64px]" : "min-h-[110px]")} scene="interior">
              <span className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between text-[9px] text-[var(--sample-text)]">
                <span className="bg-[var(--sample-base)]/70 px-1.5 py-0.5 font-medium">Bern · federal transit hub</span>
                <span className="bg-[var(--sample-base)]/70 px-1.5 py-0.5">© Bulletin</span>
              </span>
            </PhotoSurface>
            <p className={cn("text-[11px] leading-5 text-[var(--sample-muted)]", compact ? "mt-2 line-clamp-2" : "mt-3 line-clamp-2")}>
              A multilingual editorial system delivers the same clear grid, typography and timetable data to readers in four languages.
            </p>
          </div>

          {/* news + departures rail */}
          <div className="grid min-h-0 min-w-0 grid-rows-[auto_auto] divide-y divide-[var(--sample-border-soft)]">
            <div>
              {stories.map(([time, cat, title]) => (
                <div className="border-b border-[var(--sample-border-soft)] px-3 py-2 last:border-b-0" key={title}>
                  <p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.08em]">
                    <span className="text-[var(--sample-accent)]">{time}</span>
                    <span className="text-[var(--sample-muted)]">{cat}</span>
                  </p>
                  <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-4 text-[var(--sample-text)]">{title}</p>
                </div>
              ))}
            </div>
            <div className={cn("bg-[var(--sample-base)] p-3", compact ? "hidden" : "block")}>
              <p className="mb-2 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--sample-text)]">
                <span>Departures</span>
                <span className="text-[var(--sample-muted)]">live</span>
              </p>
              <div className="space-y-1">
                {departures.map(([place, time, status]) => (
                  <div className="flex items-center justify-between text-[10px]" key={place}>
                    <span className="font-medium text-[var(--sample-text)]">{place}</span>
                    <span className="flex items-center gap-2">
                      <span className="tabular-nums font-bold text-[var(--sample-text)]">{time}</span>
                      <span className={cn("text-[9px]", status === "on time" ? "text-[var(--sample-muted)]" : "text-[var(--sample-accent)]")}>{status}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function InternationalSystemPortal({ className, compact = false, style }: Props) {
  const swatches = [
    ["Blue 60", style.palette.accent],
    ["Gray 100", style.palette.text],
    ["Cyan 40", style.palette.accent2],
    ["Green 50", style.palette.accent3],
  ];
  const items = ["Layout grid", "Typography", "Components", "Data viz", "Motion"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        <SampleNav
          brand="Carbon"
          compact={compact}
          icons={[<IconSearch key="s" size={14} />, <IconArrow key="a" size={14} />]}
          links={["Foundations", "Components", "Patterns", "Resources"]}
          sub="Design language"
        />

        <div className={cn("grid flex-1 gap-5", compact ? "grid-cols-1 pt-4" : "grid-cols-1 pt-6 md:grid-cols-[0.94fr_1.06fr] md:gap-6")}>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sample-accent)]">Open design system</p>
            <h3
              className={cn("mt-3 max-w-[15ch] font-display leading-[1.0] [text-wrap:balance]", compact ? "text-[1.7rem]" : "text-[2rem] md:text-[2.9rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              One system for every market.
            </h3>
            <p className={cn("max-w-md text-[var(--sample-muted)]", compact ? "mt-3 line-clamp-2 text-[11px] leading-5" : "mt-4 text-sm leading-6")}>
              A neutral, grid-based language that keeps products consistent across regions, teams and platforms.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex h-9 items-center bg-[var(--sample-accent)] px-4 text-xs font-medium text-white">Get started</span>
              <span className="inline-flex h-9 items-center gap-1.5 border border-[var(--sample-border)] px-4 text-xs font-medium text-[var(--sample-text)]">
                View guidelines <IconArrow size={13} />
              </span>
            </div>
          </div>

          <div className="grid min-h-0 min-w-0 grid-rows-[auto_auto_1fr] gap-3">
            <div className="grid grid-cols-4">
              {swatches.map(([name, color], index) => (
                <div className={cn("flex flex-col justify-end p-2", index === 0 ? "" : "border-l border-[var(--sample-base)]")} key={name} style={{ backgroundColor: color, minHeight: compact ? 44 : 64 }}>
                  <span className="text-[9px] font-medium" style={{ color: index === 2 || index === 3 ? "var(--sample-text)" : "#ffffff" }}>{name}</span>
                </div>
              ))}
            </div>
            <div className="flex items-end justify-between border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--sample-text)]">Type scale</span>
              <span className="text-right text-[9px] leading-tight text-[var(--sample-muted)]">
                Plex Sans<br />16 / 24 · 1.5 scale
              </span>
            </div>
            <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)]">
              {items.map((item, index) => (
                <div className={cn("grid grid-cols-[2rem_1fr_auto] items-center border-b border-[var(--sample-border-soft)] last:border-b-0", compact && index > 2 ? "hidden" : "")} key={item}>
                  <span className="border-r border-[var(--sample-border-soft)] px-2 py-1.5 text-[10px] tabular-nums text-[var(--sample-muted)]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="px-3 py-1.5 text-[11px] font-medium text-[var(--sample-text)]">{item}</span>
                  <span className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--sample-accent)]">Stable</span>
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
  const products: Array<[string, string, PhotoScene]> = [
    ["Pebble lounge chair", "$420", "product"],
    ["Linen floor cushion", "$96", "material"],
    ["Paper shade lamp", "$148", "studio"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        <SampleNav
          brand="Nord Room"
          compact={compact}
          icons={[<IconSearch key="s" size={14} />, <IconUser key="u" size={14} />, <IconBag key="b" size={14} />]}
          links={["Furniture", "Lighting", "Designers", "Stories"]}
        />

        <div className={cn("grid flex-1 gap-3", compact ? "grid-rows-[1.1fr_0.9fr] pt-3" : "grid-rows-[1.25fr_1fr] pt-4")}>
          {/* hero */}
          <PhotoSurface className="rounded-[var(--st-radius)]" scene="interior" style={{ boxShadow: "var(--st-shadow)" }}>
            <div className="flex h-full flex-col justify-between p-4">
              <span className="self-start rounded-[var(--st-radius-pill)] bg-[var(--sample-base)]/85 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--sample-text)]">
                Spring home edit
              </span>
              <div className="max-w-[20ch]">
                <h3
                  className={cn("font-display leading-[1.0] text-[var(--sample-text)]", compact ? "text-2xl" : "text-3xl md:text-[2.6rem]")}
                  style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
                >
                  Bright rooms, useful objects.
                </h3>
                <span className={cn("mt-3 inline-flex h-8 items-center gap-1.5 rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-4 text-[11px] font-medium text-[var(--sample-base)]", compact ? "hidden" : "")}>
                  Shop the edit <IconArrow size={12} />
                </span>
              </div>
            </div>
          </PhotoSurface>

          {/* product row */}
          <div className="grid min-h-0 min-w-0 grid-cols-3 gap-2.5">
            {products.map(([name, price, scene], index) => (
              <div className="flex min-w-0 flex-col" key={name}>
                <PhotoSurface className="flex-1 rounded-[var(--st-radius)]" scene={scene}>
                  <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-[var(--sample-base)]/85 text-[var(--sample-text)]">
                    <IconBag size={12} />
                  </span>
                  {index === 0 ? (
                    <span className="absolute left-2 top-2 rounded-[var(--st-radius-pill)] bg-[var(--sample-accent)] px-2 py-0.5 text-[9px] font-bold text-[var(--sample-text)]">New</span>
                  ) : null}
                </PhotoSurface>
                <div className="mt-2">
                  <p className="truncate text-[11px] font-semibold text-[var(--sample-text)]">{name}</p>
                  <p className="mt-0.5 text-[10px] text-[var(--sample-muted)]">{price}</p>
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
      <div className="flex h-full flex-col">
        <SampleNav
          align="center"
          brand="KARUMA"
          compact={compact}
          icons={[<IconGlobe key="g" size={14} />]}
          links={["Cases", "Collection", "Journal", "Contact"]}
        />

        <div className={cn("grid flex-1 gap-5", compact ? "grid-cols-[0.82fr_1.18fr] pt-4" : "grid-cols-1 md:grid-cols-[0.78fr_1.22fr] md:gap-7 md:pt-7")}>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--sample-muted)]">Quiet materials</p>
            <h3
              className={cn("mt-4 font-display leading-[1.12]", compact ? "text-[1.65rem]" : "text-[2rem] md:text-[2.7rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Slow rooms for everyday rituals.
            </h3>
            <p className={cn("text-[var(--sample-muted)]", compact ? "mt-3 line-clamp-3 text-[11px] leading-5" : "mt-5 text-[13px] leading-6")} style={{ fontFamily: "var(--st-font-body)" }}>
              A residence in Azabu where wood, paper light and muted green are arranged for a calmer daily rhythm.
            </p>
            <span className={cn("mt-6 inline-flex w-fit items-center gap-2 border-b border-[var(--sample-text)] pb-1 text-[11px] uppercase tracking-[0.14em] text-[var(--sample-text)]", compact ? "hidden" : "")}>
              View project <IconArrow size={13} />
            </span>
          </div>

          <div className="grid min-h-0 grid-cols-[1.4fr_1fr] grid-rows-2 gap-2.5">
            <PhotoSurface className="row-span-2" scene="interior">
              <span className="absolute bottom-2.5 left-2.5 text-[9px] uppercase tracking-[0.14em] text-[var(--sample-text)]">
                <span className="bg-[var(--sample-base)]/70 px-1.5 py-0.5">Azabu Residence · Tokyo</span>
              </span>
            </PhotoSurface>
            <PhotoSurface scene="material" />
            <PhotoSurface scene="portrait">
              <span className="absolute bottom-2 left-2 text-[9px] text-[var(--sample-text)]">
                <span className="bg-[var(--sample-base)]/70 px-1.5 py-0.5">Norm Studio</span>
              </span>
            </PhotoSurface>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function WarmMinimalStudio({ className, compact = false, style }: Props) {
  const works: Array<[string, string, PhotoScene]> = [
    ["Linnea Apartment", "Residential · 2025", "interior"],
    ["Atelier Söder", "Workspace · 2024", "material"],
    ["Villa Marsh", "Renovation · 2024", "studio"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        <SampleNav
          align="center"
          brand="Atelier Warm"
          compact={compact}
          icons={[<span className="text-[10px] tracking-[0.1em] text-[var(--sample-muted)]" key="lang">PL · EN</span>]}
          links={["Studio", "Portfolio", "Contact"]}
          sub="Interior studio"
        />

        <div className={cn("grid flex-1 gap-4", compact ? "grid-cols-[1.1fr_0.9fr] pt-4" : "grid-cols-1 md:grid-cols-[1.1fr_0.9fr] md:gap-6 md:pt-6")}>
          <PhotoSurface className="rounded-[var(--st-radius)]" scene="interior" style={{ boxShadow: "var(--st-shadow)" }}>
            <div className="flex h-full flex-col justify-between p-4">
              <span className="self-start text-[10px] uppercase tracking-[0.2em] text-[var(--sample-text)]/70">Selected works · 2025</span>
              <div>
                <h3
                  className={cn("font-display leading-[1.02] text-[var(--sample-text)]", compact ? "text-2xl" : "text-3xl md:text-[2.7rem]")}
                  style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
                >
                  Soft rooms,
                  <br />
                  clear decisions.
                </h3>
                <span className={cn("mt-4 inline-flex h-8 items-center gap-1.5 rounded-[var(--st-radius-pill)] bg-[var(--sample-accent)] px-4 text-[11px] font-medium text-[var(--sample-text)]", compact ? "hidden" : "")}>
                  Book a consultation <IconArrow size={12} />
                </span>
              </div>
            </div>
          </PhotoSurface>

          <div className="grid min-w-0 grid-rows-3 gap-2.5">
            {works.map(([name, meta, scene], index) => (
              <div
                className="grid grid-cols-[3.6rem_1fr_auto] items-center gap-3 overflow-hidden rounded-[var(--st-radius)] bg-[var(--sample-surface)] p-2"
                key={name}
                style={{ boxShadow: "var(--st-shadow)" }}
              >
                <PhotoSurface className="aspect-square rounded-[calc(var(--st-radius)-8px)]" grain={false} scene={scene} />
                <span className="min-w-0">
                  <span className="block truncate text-xs font-semibold text-[var(--sample-text)]">{name}</span>
                  <span className="block truncate text-[10px] text-[var(--sample-muted)]">{meta}</span>
                </span>
                <span className="pr-1 text-[10px] tabular-nums text-[var(--sample-muted)]">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function SoftMinimalService({ className, compact = false, style }: Props) {
  const services: Array<[string, string]> = [
    ["Mindful audit", "45 min"],
    ["Care plan", "ongoing"],
    ["Quiet launch", "2 weeks"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        <SampleNav
          brand="Soft Office"
          compact={compact}
          icons={[<span className="inline-flex h-7 items-center rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-3 text-[10px] font-medium text-[var(--sample-base)]" key="cta">Book a call</span>]}
          links={["Journal", "Services", "About"]}
        />

        <div className={cn("grid flex-1 gap-4", compact ? "grid-cols-1 pt-4" : "grid-cols-1 md:grid-cols-[1.02fr_0.98fr] md:gap-6 md:pt-6")}>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--sample-muted)]">Consultation studio</p>
            <h3
              className={cn("mt-4 max-w-[16ch] font-display leading-[1.08] [text-wrap:balance]", compact ? "text-2xl" : "text-[2rem] md:text-[2.7rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Gentle pages for careful decisions.
            </h3>
            <p className={cn("max-w-md text-[var(--sample-muted)]", compact ? "mt-3 line-clamp-2 text-[11px] leading-5" : "mt-4 text-[13px] leading-6")} style={{ fontFamily: "var(--st-font-body)" }}>
              Low-pressure sessions that help you decide calmly. No noise, no rush — just a clear next step.
            </p>
            <div className={cn("mt-6 flex flex-wrap gap-2", compact ? "hidden" : "")}>
              <span className="inline-flex h-9 items-center rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-4 text-xs text-[var(--sample-base)]">Book a call</span>
              <span className="inline-flex h-9 items-center rounded-[var(--st-radius-pill)] border border-[var(--sample-border-soft)] px-4 text-xs text-[var(--sample-text)]">View packages</span>
            </div>
          </div>

          <div className="grid min-h-0 grid-rows-[1.1fr_auto] gap-3">
            <PhotoSurface className="rounded-[calc(var(--st-radius)+2px)]" grain={false} scene="studio" style={{ boxShadow: "var(--st-shadow)" }}>
              <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-[var(--sample-text)]">
                <span className="rounded-[var(--st-radius-pill)] bg-[var(--sample-base)]/80 px-2.5 py-1 font-medium">Calm by design</span>
                <span className="rounded-[var(--st-radius-pill)] bg-[var(--sample-base)]/80 px-2.5 py-1">Ø 4.9 / 5</span>
              </span>
            </PhotoSurface>
            <div className="grid gap-2">
              {services.map(([service, meta], index) => (
                <div className="grid grid-cols-[auto_1fr_auto] items-center rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-3 py-2" key={service} style={{ boxShadow: "var(--st-shadow)" }}>
                  <span className="mr-3 grid h-7 w-7 place-items-center rounded-full bg-[var(--sample-accent-2)] text-[9px] font-bold text-[var(--sample-text)]">0{index + 1}</span>
                  <span className="truncate text-xs font-medium text-[var(--sample-text)]">{service}</span>
                  <span className="text-[10px] text-[var(--sample-muted)]">{meta}</span>
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
    ["Material", "Wool-silk"],
    ["Atelier", "Kyoto"],
    ["Delivery", "Reserved"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        <SampleNav
          align="center"
          bordered={false}
          brand="ATELIER"
          compact={compact}
          icons={[<IconSearch key="s" size={13} />, <IconBag key="b" size={13} />]}
          links={["New", "Atelier"]}
        />

        <div className={cn("grid min-h-0 flex-1", compact ? "grid-cols-[1.1fr_0.9fr] gap-5 pt-4" : "grid-cols-1 sm:grid-cols-[1.18fr_0.82fr] sm:gap-12 sm:pt-8")}>
          {/* editorial photograph + restrained pager */}
          <div className="grid min-h-0 grid-rows-[1fr_auto] gap-3">
            <DuotoneEditorial className="min-h-0">
              <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.24em] text-[var(--sample-text)]/55">Editorial</span>
              <span className="absolute right-3 top-3 text-[9px] uppercase tracking-[0.24em] text-[var(--sample-text)]/45">FW / 04</span>
            </DuotoneEditorial>
            <div className={cn("flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-[var(--sample-muted)]", compact ? "hidden" : "")}>
              <span className="text-[var(--sample-text)]">01</span>
              <span className="mx-3 h-px flex-1 bg-[var(--sample-border)]" />
              <span>03</span>
            </div>
          </div>

          {/* product detail — generous whitespace, hairline rules */}
          <div className={cn("flex min-w-0 flex-col justify-center", compact ? "border-l border-[var(--sample-border-soft)] pl-4" : "border-t border-[var(--sample-border-soft)] pt-6 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0")}>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--sample-muted)]">Edition 04</p>
            <h3
              className={cn("mt-5 max-w-[12ch] font-display leading-[1.14]", compact ? "text-[1.7rem]" : "text-[2rem] md:text-[2.7rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              The Camel Wool Coat
            </h3>
            <p className={cn("text-[var(--sample-muted)]", compact ? "mt-3 line-clamp-2 text-[11px] leading-5" : "mt-6 max-w-[30ch] text-[13px] leading-7")} style={{ fontFamily: "var(--st-font-body)" }}>
              Cut from a single bolt of wool-silk, finished by hand.
            </p>

            <div className={cn("mt-8 flex gap-8 text-[10px]", compact ? "hidden" : "")}>
              {details.map(([label, value]) => (
                <div key={label}>
                  <p className="uppercase tracking-[0.16em] text-[var(--sample-muted)]">{label}</p>
                  <p className="mt-1.5 text-[var(--sample-text)]" style={{ fontFamily: "var(--st-font-body)" }}>{value}</p>
                </div>
              ))}
            </div>

            <div className={cn("flex items-baseline justify-between", compact ? "mt-5" : "mt-10")}>
              <span className="font-display text-lg text-[var(--sample-text)]" style={{ fontFamily: "var(--st-font-display)" }}>$680</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--sample-muted)]">Incl. duties</span>
            </div>
            <div className="mt-3 flex items-center justify-center border border-[var(--sample-text)] py-3 text-[10px] uppercase tracking-[0.28em] text-[var(--sample-text)]">
              Reserve
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function RawBrutalistIndex({ className, compact = false, style }: Props) {
  const entries: Array<[string, string, string, boolean]> = [
    ["01", "Concrete & Type", "06.2026", false],
    ["02", "Default Aesthetics", "06.2026", false],
    ["03", "Raw HTML, Forever", "05.2026", false],
    ["04", "The Material Web", "05.2026", true],
    ["05", "No Framework Needed", "04.2026", false],
  ];
  const visited = "#551A8B";
  const link = "#0000EE";

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_auto_1fr_auto] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] font-mono text-[var(--sample-text)]">
        {/* masthead */}
        <div className="flex items-center justify-between border-b border-[var(--sample-border)] px-3 py-1 text-[9px] uppercase">
          <span>Est. 1898 — Vienna</span>
          <span>Issue 04 / 06.2026</span>
        </div>
        {/* title + nav */}
        <div className="border-b-2 border-[var(--sample-border)] px-3 py-2.5">
          <h3
            className={cn("font-display uppercase leading-[0.86]", compact ? "text-2xl" : "text-4xl md:text-5xl")}
            style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
          >
            The Brutalist Review
          </h3>
          <nav className="mt-2 flex flex-wrap items-center gap-3 text-[10px]">
            {["Index", "Works", "Exhibitions", "About"].map((item) => (
              <span className="underline" key={item} style={{ color: link }}>{item}</span>
            ))}
            <span className="underline" style={{ color: visited }}>Shop ↗</span>
          </nav>
        </div>
        {/* index table + sidebar */}
        <div className={cn("grid min-h-0", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1.1fr_0.9fr]")}>
          <div className={cn("min-w-0", compact ? "" : "md:border-r-2 md:border-[var(--sample-border)]")}>
            <table className="w-full table-fixed border-collapse text-[10px]">
              <thead>
                <tr className="border-b-2 border-[var(--sample-border)] bg-[var(--sample-base)] text-left">
                  <th className="w-8 px-2 py-1.5 font-bold">no</th>
                  <th className="px-2 py-1.5 font-bold">title</th>
                  <th className={cn("w-16 px-2 py-1.5 font-bold", compact ? "hidden" : "table-cell")}>date</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(([number, title, date, isVisited]) => (
                  <tr className="border-b border-[var(--sample-border)]/40 last:border-b-0" key={title}>
                    <td className="px-2 py-1.5 align-top text-[var(--sample-muted)]">{number}</td>
                    <td className="truncate px-2 py-1.5 align-top">
                      <span className="underline" style={{ color: isVisited ? visited : link }}>{title}</span>
                    </td>
                    <td className={cn("px-2 py-1.5 align-top text-[var(--sample-muted)]", compact ? "hidden" : "table-cell")}>{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={cn("grid content-start gap-2.5 p-3", compact ? "hidden" : "")}>
            <p className="text-[10px] leading-4">Essays on the raw web. No framework, no cards — content is the material.</p>
            <label className="grid gap-1 text-[10px] font-bold">
              Subscribe by e-mail
              <input className="w-full border-2 border-[var(--sample-border)] bg-white px-2 py-1 text-[10px] font-normal text-[var(--sample-text)]" defaultValue="you@mail.com" />
            </label>
            <button className="w-max border-2 border-[var(--sample-border)] bg-[#E9E9E9] px-3 py-1 text-[10px] text-[var(--sample-text)]" type="button">
              Subscribe
            </button>
          </div>
        </div>
        {/* footer */}
        <p className={cn("border-t-2 border-[var(--sample-border)] px-3 py-1.5 text-[9px] text-[var(--sample-muted)]", compact ? "hidden" : "")}>
          Buttons look like buttons. Links are underlined. Content is the material.
        </p>
      </div>
    </SampleFrame>
  );
}

function NeoBrutalistApp({ className, compact = false, style }: Props) {
  const box = "border-[3px] border-[var(--sample-border)]";
  const hardShadow = { boxShadow: "5px 5px 0 var(--sample-border)" };

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* grid paper */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: "linear-gradient(var(--sample-border) 1px, transparent 1px), linear-gradient(90deg, var(--sample-border) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
      />

      <div className="relative flex h-full flex-col">
        {/* boxed top nav */}
        <div className="flex items-center gap-2">
          <span className={cn("grid h-7 w-7 place-items-center bg-[var(--sample-accent-3)] font-display text-sm font-black", box)}>N</span>
          <span className="font-display text-sm font-black tracking-tight">BRUTAL/UI</span>
          <nav className={cn("ml-3 items-center gap-3 text-[11px] font-black", compact ? "hidden" : "flex")}>
            <span>Docs</span>
            <span>Components</span>
            <span>Templates</span>
          </nav>
          <div className="ml-auto flex items-center gap-2 text-[10px] font-black">
            <span className={cn("items-center gap-1.5 bg-[var(--sample-surface)] px-2 py-1", box, compact ? "hidden" : "flex")}>
              <IconSearch size={11} /> Search
            </span>
            <span className={cn("flex items-center gap-1 bg-[var(--sample-surface)] px-2 py-1", box)}>
              <IconStar size={10} /> 5.1k
            </span>
            <span className={cn("bg-[var(--sample-text)] px-2.5 py-1 text-[var(--sample-base)]", box)}>Get started</span>
          </div>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-4", compact ? "grid-cols-[1.05fr_0.95fr] pt-4" : "grid-cols-1 md:grid-cols-[1.04fr_0.96fr] md:gap-6 md:pt-7")}>
          {/* hero */}
          <div className="flex min-w-0 flex-col justify-center">
            <span className={cn("w-max bg-[var(--sample-accent-2)] px-2 py-1 text-[10px] font-black uppercase", box)} style={hardShadow}>
              v2.0 — now with charts
            </span>
            <h3
              className={cn("mt-4 max-w-[9ch] font-display uppercase leading-[1.04]", compact ? "text-[1.6rem]" : "text-[2rem] md:text-[2.5rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Build{" "}
              <span className="relative inline-block">
                <IconStar className="absolute -left-2.5 -top-1.5 text-[var(--sample-text)]" size={compact ? 9 : 12} />
                <span className={cn("bg-[var(--sample-accent)] px-1.5 py-0.5", box)} style={{ boxShadow: "4px 4px 0 var(--sample-border)" }}>
                  bolder
                </span>
                <IconStar className="absolute -bottom-1.5 -right-2 text-[var(--sample-text)]" size={compact ? 8 : 10} />
              </span>{" "}
              web UI.
            </h3>
            <p className={cn("font-bold text-[var(--sample-muted)]", compact ? "mt-3 line-clamp-2 text-[11px] leading-5" : "mt-5 max-w-sm text-[13px] leading-6")}>
              A component kit with thick borders, hard offset shadows and zero subtlety.
            </p>
            <div className={cn("mt-6 flex flex-wrap gap-2.5", compact ? "hidden" : "flex")}>
              <span className={cn("inline-flex items-center gap-1.5 bg-[var(--sample-text)] px-4 py-2 text-xs font-black text-[var(--sample-base)]", box)} style={hardShadow}>
                Read the docs <IconArrow size={13} />
              </span>
              <span className={cn("inline-flex items-center bg-[var(--sample-surface)] px-4 py-2 text-xs font-black", box)} style={hardShadow}>
                Components
              </span>
            </div>
          </div>

          {/* floating component cards */}
          <div className="grid min-h-0 grid-rows-[auto_auto] gap-3">
            {/* login card */}
            <div className={cn("bg-[var(--sample-accent-3)] p-3", box)} style={{ boxShadow: "6px 6px 0 var(--sample-border)" }}>
              <p className="text-xs font-black">Log in to your account</p>
              <div className={cn("mt-2.5 flex items-center bg-[var(--sample-surface)] px-2 py-1.5 text-[10px] font-bold text-[var(--sample-muted)]", box)}>
                you@studio.com
              </div>
              <div className={cn("mt-2 grid grid-cols-[1fr_auto]", box)}>
                <span className="bg-[var(--sample-surface)] px-2 py-1.5 text-[10px] font-bold text-[var(--sample-muted)]">••••••••</span>
                <span className="border-l-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] px-3 py-1.5 text-[10px] font-black text-[var(--sample-base)]">Login</span>
              </div>
            </div>

            {/* OTP + stat row */}
            <div className={cn("grid grid-cols-2 gap-3", compact ? "hidden" : "")}>
              <div className={cn("bg-[var(--sample-accent)] p-3", box)} style={{ boxShadow: "5px 5px 0 var(--sample-border)" }}>
                <p className="text-[10px] font-black uppercase">Verify code</p>
                <div className="mt-2 flex gap-1.5">
                  {["4", "8", "", ""].map((digit, index) => (
                    <span className={cn("grid h-7 w-6 place-items-center bg-[var(--sample-surface)] text-xs font-black", box)} key={index}>
                      {digit}
                    </span>
                  ))}
                </div>
              </div>
              <div className={cn("flex flex-col justify-between bg-[var(--sample-accent-2)] p-3", box)} style={{ boxShadow: "5px 5px 0 var(--sample-border)" }}>
                <p className="text-[10px] font-black uppercase">Revenue</p>
                <p className="font-display text-2xl font-black leading-none">$8,420</p>
                <p className="flex items-center gap-1 text-[10px] font-black">
                  <IconStar size={9} /> +12% this week
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function AntiDesignLanding({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col font-mono text-[var(--sample-text)]">
        {/* raw OS window title bar */}
        <div className="flex items-center gap-2 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-[10px] text-[var(--sample-base)]">
          <span className="flex gap-1">
            <span className="h-2.5 w-2.5 border border-[var(--sample-base)] bg-[var(--sample-accent)]" />
            <span className="h-2.5 w-2.5 border border-[var(--sample-base)] bg-[var(--sample-accent-2)]" />
            <span className="h-2.5 w-2.5 border border-[var(--sample-base)] bg-[var(--sample-accent-3)]" />
          </span>
          <span className="truncate">are-na.txt — channel: anti-design ▾</span>
          <span className="ml-auto whitespace-nowrap">1,204 connections</span>
        </div>
        {/* marquee */}
        <div className="overflow-hidden whitespace-nowrap border-x-2 border-b-2 border-[var(--sample-border)] bg-[var(--sample-accent)] py-0.5 text-[9px] font-bold uppercase text-[var(--sample-surface)]">
          ★ new blocks added ★ raw html forever ★ connect anything to anything ★ no design is the design ★&nbsp;
        </div>

        {/* dense knowledge board */}
        <div className={cn("grid min-h-0 flex-1 auto-rows-fr gap-1.5 border-x-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-1.5", compact ? "grid-cols-3" : "grid-cols-4")}>
          {/* big quote block */}
          <div className="col-span-2 row-span-2 flex flex-col justify-between border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2.5 text-[var(--sample-accent)]">
            <span className="text-[9px] uppercase text-[var(--sample-accent-2)]">text block · 3h ago</span>
            <p
              className={cn("font-display lowercase leading-[0.92]", compact ? "text-xl" : "text-3xl md:text-[2.4rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)" }}
            >
              form follows nothing.
            </p>
            <span className="text-[9px] text-[var(--sample-base)]/70">↳ connected by 14 people</span>
          </div>
          {/* link block */}
          <div className="border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-2 text-[10px]">
            <span className="text-[8px] uppercase text-[var(--sample-muted)]">link</span>
            <p className="mt-1 break-all underline" style={{ color: "#0000EE" }}>↗ thehtml.review</p>
          </div>
          {/* neon image block */}
          <div
            className="row-span-2 border-2 border-[var(--sample-accent-3)]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, var(--sample-accent-3) 0 6px, var(--sample-surface) 6px 12px)" }}
          />
          {/* select block (raw UI) */}
          <div className={cn("border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-2 text-[9px]", compact ? "hidden" : "")}>
            <span className="uppercase text-[var(--sample-muted)]">sort</span>
            <div className="mt-1 flex items-center justify-between border border-[var(--sample-border)] bg-white px-1.5 py-0.5">
              <span>recent</span>
              <span>▾</span>
            </div>
            <label className="mt-1.5 flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 border border-[var(--sample-border)] bg-[var(--sample-accent-2)]" /> raw
            </label>
          </div>
          {/* magenta block */}
          <div className="grid place-items-center border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] text-lg font-black text-[var(--sample-surface)]">?</div>
          {/* cyan outline block */}
          <div className="border-2 border-[var(--sample-accent-2)] bg-[var(--sample-base)] p-2 text-[9px] text-[var(--sample-text)]">
            <span className="uppercase" style={{ color: "#0000EE" }}>block 04</span>
            <p className="mt-1 leading-tight">untitled.gif</p>
          </div>
          {/* green note block */}
          <div className={cn("border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] p-2 text-[9px] font-bold text-[var(--sample-surface)]", compact ? "hidden" : "")}>
            <span className="uppercase">note</span>
            <p className="mt-1 leading-tight">connect anything →</p>
          </div>
          {/* dotted image block */}
          <div
            className={cn("border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]", compact ? "hidden" : "")}
            style={{ backgroundImage: "radial-gradient(circle at 6px 6px, var(--sample-accent-2) 0 2px, transparent 3px)", backgroundSize: "12px 12px" }}
          />
        </div>

        {/* raw footer */}
        <div className="flex items-center justify-between border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-[9px] text-[var(--sample-base)]">
          <span>visitors: 000847</span>
          <span className="underline" style={{ color: "#FF27CE" }}>+ add block</span>
        </div>
      </div>
    </SampleFrame>
  );
}

/** Bold repeating prints used to fill maximalist tiles (palette-adaptive). */
const MAXI_FLORAL: CSSProperties = {
  backgroundColor: "var(--sample-accent)",
  backgroundImage:
    "radial-gradient(circle at 12px 12px, var(--sample-accent-3) 0 6px, transparent 7px)," +
    "radial-gradient(circle at 36px 30px, var(--sample-base) 0 5px, transparent 6px)," +
    "radial-gradient(circle at 30px 6px, var(--sample-accent-2) 0 4px, transparent 5px)," +
    "radial-gradient(circle at 6px 40px, var(--sample-surface) 0 3px, transparent 4px)",
  backgroundSize: "48px 48px",
};
const MAXI_STRIPE: CSSProperties = {
  backgroundColor: "var(--sample-accent-3)",
  backgroundImage: "repeating-linear-gradient(45deg, var(--sample-base) 0 7px, transparent 7px 18px)",
};

/** Risograph-style duotone fills used for maximalist photo clippings. */
const RISO_PINK: CSSProperties = {
  backgroundImage:
    "radial-gradient(46% 50% at 58% 30%, color-mix(in srgb, var(--sample-accent) 60%, #ffffff) 0%, transparent 52%)," +
    "radial-gradient(60% 60% at 38% 96%, color-mix(in srgb, var(--sample-base) 92%, #000000) 0%, transparent 60%)," +
    "linear-gradient(155deg, var(--sample-accent) 0%, color-mix(in srgb, var(--sample-base) 70%, var(--sample-accent)) 100%)",
};
const RISO_TEAL: CSSProperties = {
  backgroundImage:
    "radial-gradient(48% 52% at 40% 28%, color-mix(in srgb, var(--sample-accent-2) 55%, #ffffff) 0%, transparent 52%)," +
    "radial-gradient(60% 58% at 64% 98%, color-mix(in srgb, var(--sample-base) 90%, #000000) 0%, transparent 58%)," +
    "linear-gradient(150deg, var(--sample-accent-2) 0%, color-mix(in srgb, var(--sample-base) 65%, var(--sample-accent-2)) 100%)",
};
const RISO_GOLD: CSSProperties = {
  backgroundImage:
    "radial-gradient(50% 50% at 50% 26%, color-mix(in srgb, var(--sample-accent-3) 62%, #ffffff) 0%, transparent 54%)," +
    "radial-gradient(60% 60% at 46% 100%, color-mix(in srgb, var(--sample-base) 88%, #000000) 0%, transparent 60%)," +
    "linear-gradient(160deg, var(--sample-accent-3) 0%, color-mix(in srgb, var(--sample-base) 60%, var(--sample-accent-3)) 100%)",
};

function CutoutPhoto({
  className,
  duotone,
  rotate,
  children,
}: {
  className?: string;
  duotone: CSSProperties;
  rotate: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn("absolute overflow-hidden border-[3px] border-[var(--sample-surface)]", className)}
      style={{ transform: rotate, boxShadow: "4px 5px 0 rgb(0 0 0 / 0.35)" }}
    >
      <span aria-hidden="true" className="absolute inset-0" style={duotone} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "70px 70px" }}
      />
      {children}
    </div>
  );
}

function MaximalistPatternMarket({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="absolute inset-0">
        {/* sunburst rays, upper-right */}
        <div
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-56 w-56 opacity-30"
          style={{ backgroundImage: "repeating-conic-gradient(from 0deg at 50% 50%, var(--sample-accent-3) 0deg 9deg, transparent 9deg 18deg)" }}
        />
        {/* torn color patches */}
        <div className="absolute -left-6 top-1/3 h-24 w-44 -rotate-6" style={MAXI_STRIPE} />
        <div className="absolute right-6 top-2 h-16 w-24 rotate-[8deg]" style={MAXI_FLORAL} />
        <div className="absolute bottom-2 left-1/3 h-14 w-40 rotate-3 bg-[var(--sample-accent-2)] opacity-80" />

        {/* repeated zine text, faint */}
        <div className={cn("absolute left-1 top-10 -rotate-90 origin-top-left whitespace-nowrap text-[10px] font-black uppercase tracking-[0.3em] text-[var(--sample-surface)] opacity-25", compact ? "hidden" : "")}>
          show your shine · show your shine · show your shine
        </div>

        {/* photo cutouts (riso duotone clippings) */}
        <CutoutPhoto className="left-[39%] top-[4%] z-20 h-[48%] w-[27%]" duotone={RISO_PINK} rotate="rotate(3.5deg)">
          <span className="absolute left-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-[var(--sample-base)] text-[var(--sample-surface)]">
            <IconStar size={8} />
          </span>
          <span className="absolute bottom-1.5 left-1.5 bg-[var(--sample-base)] px-1.5 py-0.5 text-[7px] font-black uppercase text-[var(--sample-surface)]">New York · 06</span>
        </CutoutPhoto>
        <CutoutPhoto className="bottom-[3%] left-[33%] z-20 h-[33%] w-[25%]" duotone={RISO_GOLD} rotate="rotate(-3.5deg)" />
        <CutoutPhoto className={cn("right-[3%] top-[34%] z-20 h-[26%] w-[20%]", compact ? "hidden" : "")} duotone={RISO_TEAL} rotate="rotate(4deg)" />

        {/* magazine browser card */}
        <div className="absolute left-[2%] top-[5%] z-30 w-[50%] -rotate-[1.5deg] border-[3px] border-[var(--sample-base)] bg-[var(--sample-surface)] text-[var(--sample-base)]" style={{ boxShadow: "5px 6px 0 rgb(0 0 0 / 0.35)" }}>
          <div className="flex items-center gap-1.5 border-b-2 border-[var(--sample-base)] px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-accent)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-accent-3)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-accent-2)]" />
            <span className="ml-1 truncate rounded-sm bg-[var(--sample-base)]/10 px-2 text-[8px] font-bold text-[var(--sample-base)]/60">blogsite.com</span>
          </div>
          <div className="p-3">
            <p className="text-[8px] font-black uppercase tracking-[0.2em]">Magazine</p>
            <h3
              className={cn("font-display font-black uppercase leading-[0.86]", compact ? "text-2xl" : "text-4xl md:text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", letterSpacing: "var(--st-tracking)" }}
            >
              More is more
            </h3>
            <div className={cn("mt-2 space-y-1", compact ? "hidden" : "")}>
              {[100, 92, 96, 70].map((w) => (
                <span className="block h-1 bg-[var(--sample-base)]/22" key={w} style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* top-right grunge type */}
        <div className={cn("absolute right-[1%] top-[2%] z-30 w-[33%] text-right", compact ? "hidden" : "")}>
          <div className="absolute -right-2 -top-1 h-20 w-full -rotate-2 bg-[var(--sample-base)]" style={{ clipPath: "polygon(4% 6%, 98% 0, 96% 94%, 0 100%)" }} />
          <p className="relative font-display text-xl font-black uppercase italic leading-[0.92] text-[var(--sample-surface)]" style={{ fontFamily: "var(--st-font-display)" }}>
            I&apos;ll stop
            <br />
            the whole
            <br />
            <span className="text-[var(--sample-accent-3)]">world</span>
          </p>
          <IconStar className="absolute -left-1 top-8 text-[var(--sample-accent-3)]" size={14} />
        </div>

        {/* big bottom display */}
        <div className="absolute bottom-[3%] right-[1%] z-30 -rotate-3 text-right">
          <p
            className={cn("font-display font-black uppercase leading-[0.78] text-[var(--sample-accent)]", compact ? "text-2xl" : "text-4xl md:text-[3.4rem]")}
            style={{ fontFamily: "var(--st-font-display)", textShadow: "3px 3px 0 var(--sample-accent-2), -1px -1px 0 var(--sample-base)" }}
          >
            World
            <br />
            is ours
          </p>
        </div>

        {/* calendar sticker */}
        <div className={cn("absolute bottom-[5%] left-[2%] z-30 w-[19%] -rotate-[5deg] bg-[var(--sample-accent-3)] p-1.5 text-[var(--sample-base)]", compact ? "hidden" : "")} style={{ boxShadow: "3px 3px 0 rgb(0 0 0 / 0.3)" }}>
          <p className="text-[8px] font-black uppercase">June 2024</p>
          <div className="mt-1 grid grid-cols-7 gap-[1px]">
            {Array.from({ length: 21 }).map((_, index) => (
              <span className="aspect-square bg-[var(--sample-base)]/15 text-center text-[5px] font-bold leading-[1.4]" key={index}>
                {index + 1}
              </span>
            ))}
          </div>
          <p className="mt-1 text-[6px] font-black uppercase leading-tight">View full calendar · post modern child</p>
        </div>

        {/* hand-drawn scribbles */}
        <svg aria-hidden="true" className={cn("absolute bottom-[26%] right-[4%] z-40 w-[24%] text-[var(--sample-accent-3)]", compact ? "hidden" : "")} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={2.5} viewBox="0 0 120 12">
          <path d="M2 8 Q 12 1 22 7 T 42 7 T 62 7 T 82 7 T 102 7 T 118 6" />
        </svg>
        <svg aria-hidden="true" className={cn("absolute left-[55%] top-[58%] z-40 w-12 -rotate-12 text-[var(--sample-accent)]", compact ? "hidden" : "")} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} viewBox="0 0 48 30">
          <path d="M4 6 C 18 0 30 0 44 8 M44 8 38 3 M44 8 39 15" />
        </svg>

        {/* scattered doodles + stamp */}
        <IconStar className="absolute left-[30%] top-[2%] z-40 text-[var(--sample-accent)]" size={16} />
        <IconStar className={cn("absolute right-[24%] bottom-[30%] z-40 text-[var(--sample-accent-3)]", compact ? "hidden" : "")} size={12} />
        <div className={cn("absolute bottom-[2%] left-[26%] z-40 grid h-10 w-10 rotate-[8deg] place-items-center rounded-full border-2 border-[var(--sample-surface)] text-center text-[6px] font-black uppercase leading-[1.05] text-[var(--sample-surface)]", compact ? "hidden" : "")}>
          © Maxima
          <br />
          Square™
        </div>

        {/* grain */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 opacity-[0.1] mix-blend-overlay"
          style={{ backgroundImage: GRAIN_URI, backgroundSize: "120px 120px" }}
        />
      </div>
    </SampleFrame>
  );
}

function GlitchHeading({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span aria-hidden="true" className="absolute inset-0 translate-x-[2px] text-[var(--sample-accent)] mix-blend-screen" style={{ clipPath: "inset(0 0 52% 0)" }}>
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0 -translate-x-[2px] text-[var(--sample-accent-2)] mix-blend-screen" style={{ clipPath: "inset(50% 0 0 0)" }}>
        {text}
      </span>
      <span className="relative text-[var(--sample-text)]">{text}</span>
    </span>
  );
}

function GlitchArtInterface({ className, compact = false, style }: Props) {
  const news: Array<[string, string, string]> = [
    ["Patch 2.1", "Phantom Liberty goes live tonight", style.palette.accent],
    ["Media", "New 4K gameplay trailer dropped", style.palette.accent2],
    ["Community", "Photo-mode contest winners", style.palette.accent3],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        {/* nav */}
        <div className="flex items-center gap-3 border-b border-[var(--sample-border)] pb-2 font-mono text-[10px] text-[var(--sample-muted)]">
          <span className="font-bold tracking-tight text-[var(--sample-text)]">
            SIGNAL<span className="text-[var(--sample-accent)]">{"//"}</span>DECAY
          </span>
          <nav className={cn("items-center gap-3 uppercase", compact ? "hidden" : "flex")}>
            <span>Game</span>
            <span>News</span>
            <span>Media</span>
            <span>Store</span>
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            <IconSearch className="text-[var(--sample-text)]" size={13} />
            <span className="border border-[var(--sample-accent)] bg-[var(--sample-accent)] px-2.5 py-1 font-bold text-[var(--sample-base)]" style={{ boxShadow: "0 0 10px rgb(var(--st-accent-rgb) / 0.5)" }}>
              PRE-ORDER
            </span>
          </div>
        </div>

        {/* hero */}
        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1.04fr_0.96fr]" : "grid-cols-1 md:grid-cols-[1.06fr_0.94fr] md:gap-5")}>
          <div className="flex min-w-0 flex-col justify-center">
            <span className="flex w-max items-center gap-1.5 border border-[var(--sample-accent)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--sample-accent)]">
              ▸ Out now · next-gen
            </span>
            <h3
              className={cn("mt-3 font-display uppercase leading-[0.84]", compact ? "text-4xl" : "text-6xl md:text-[4.6rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              <GlitchHeading text="SIGNAL" />
              <br />
              <GlitchHeading text="DECAY" />
            </h3>
            <p className={cn("text-[var(--sample-muted)]", compact ? "mt-2 line-clamp-2 text-[11px] leading-5" : "mt-4 max-w-sm text-[13px] leading-6")}>
              A neon-noir action RPG. Jack in, glitch out, and rewrite the night city grid.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <span className="border border-[var(--sample-accent)] bg-[var(--sample-accent)] px-4 py-2 font-mono text-[11px] font-bold uppercase text-[var(--sample-base)]" style={{ boxShadow: "0 0 12px rgb(var(--st-accent-rgb) / 0.5)" }}>
                Pre-order
              </span>
              <span className="flex items-center gap-1.5 border border-[var(--sample-border)] px-4 py-2 font-mono text-[11px] font-bold uppercase text-[var(--sample-text)]">
                ▶ Watch trailer
              </span>
            </div>
            <div className={cn("mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "hidden" : "")}>
              <span>PC</span>
              <span className="text-[var(--sample-accent)]">▪</span>
              <span>PS5</span>
              <span className="text-[var(--sample-accent)]">▪</span>
              <span>Xbox Series X</span>
            </div>
          </div>

          {/* key-art media */}
          <div className="relative min-h-0 overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)]">
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(60% 80% at 70% 16%, rgb(var(--st-accent-rgb) / 0.55), transparent 55%)," +
                  "radial-gradient(55% 65% at 22% 92%, rgb(var(--st-accent-2-rgb) / 0.5), transparent 60%)," +
                  "linear-gradient(155deg, var(--sample-surface) 0%, var(--sample-base) 100%)",
              }}
            />
            <span aria-hidden="true" className="absolute left-0 top-[26%] h-3 w-3/4 bg-[var(--sample-accent)] opacity-50 mix-blend-screen" />
            <span aria-hidden="true" className="absolute right-0 top-[33%] h-1.5 w-1/2 translate-x-2 bg-[var(--sample-accent-2)] opacity-50 mix-blend-screen" />
            {/* HUD corner brackets */}
            <span aria-hidden="true" className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-[var(--sample-accent)]" />
            <span aria-hidden="true" className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-[var(--sample-accent)]" />

            <div className="relative flex h-full flex-col justify-between p-3 font-mono">
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-[var(--sample-accent-3)]">KEY ART // 04</span>
                <span className="flex items-center gap-1 text-[var(--sample-accent-2)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--sample-accent-2)]" /> REC
                </span>
              </div>
              <span className="mx-auto grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--sample-text)] text-sm text-[var(--sample-text)]" style={{ boxShadow: "0 0 14px rgb(var(--st-accent-rgb) / 0.4)" }}>
                ▶
              </span>
              <div className="flex items-center justify-between text-[9px] text-[var(--sample-muted)]">
                <span>SYS 87%</span>
                <span className="tracking-[0.2em] text-[var(--sample-accent)]">▓▓▓▓▓░░</span>
              </div>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgb(0 0 0 / 0.5) 2px 3px)" }}
            />
          </div>
        </div>

        {/* news modules */}
        <div className={cn("grid grid-cols-3 gap-2 pt-3", compact ? "hidden" : "")}>
          {news.map(([label, title, color]) => (
            <div className="overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)]" key={title}>
              <div className="relative h-7 overflow-hidden" style={{ backgroundImage: `linear-gradient(120deg, ${color}, var(--sample-base))` }}>
                <span aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgb(0 0 0 / 0.5) 2px 3px)" }} />
              </div>
              <div className="p-2 font-mono">
                <p className="text-[8px] font-bold uppercase tracking-[0.1em]" style={{ color }}>{label}</p>
                <p className="mt-1 line-clamp-2 text-[10px] leading-tight text-[var(--sample-text)]">{title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* faint full-frame scanlines + grain */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.05] mix-blend-screen"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "130px 130px" }}
      />
    </SampleFrame>
  );
}

function DeconstructiveExhibition({ className, compact = false, style }: Props) {
  const projects: Array<[string, string]> = [
    ["Heydar Cultural Centre", "Baku · 2012"],
    ["Phaeno Science Centre", "Wolfsburg · 2005"],
    ["MAXXI Museum", "Rome · 2009"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* dramatic angular architecture backdrop */}
      <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, color-mix(in srgb, var(--sample-accent-2) 55%, #ffffff) 0%, color-mix(in srgb, var(--sample-accent-2) 18%, var(--sample-base)) 42%, var(--sample-base) 100%)" }} />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3" style={{ backgroundImage: "linear-gradient(150deg, color-mix(in srgb, var(--sample-accent-3) 80%, #ffffff) 0%, var(--sample-accent-3) 50%, color-mix(in srgb, var(--sample-accent-3) 60%, #000000 22%) 100%)", clipPath: "polygon(0 38%, 62% 8%, 100% 30%, 100% 100%, 0 100%)" }} />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundImage: "linear-gradient(120deg, color-mix(in srgb, var(--sample-base) 70%, #000000 16%) 0%, color-mix(in srgb, var(--sample-accent-3) 70%, #000000 10%) 100%)", clipPath: "polygon(40% 40%, 100% 64%, 100% 100%, 18% 100%)" }} />
      {/* facet fault-lines + accent slivers */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-[var(--sample-border)] opacity-40" fill="none" preserveAspectRatio="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 500 360">
        <path d="M0 150 500 96 M210 360 300 110 M300 110 500 188 M120 360 250 150" />
      </svg>
      <span aria-hidden="true" className="absolute right-[-4%] top-[30%] h-28 w-2 rotate-[28deg] bg-[var(--sample-accent)]" />
      <span aria-hidden="true" className="absolute left-[30%] top-[44%] h-20 w-1.5 -rotate-[24deg] bg-[var(--sample-accent-2)]" />

      <div className="relative flex h-full flex-col">
        {/* nav */}
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.04em] text-[var(--sample-text)]">
          <span className="font-display text-sm tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>ZAHA — ATELIER</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-text)]/70", compact ? "hidden" : "flex")}>
            <span>Projects</span>
            <span>Studio</span>
            <span>News</span>
          </nav>
          <span className="ml-auto flex items-center gap-1">Menu <span className="text-base leading-none">≡</span></span>
        </div>

        {/* floating fragmented panels */}
        <div className="relative flex-1">
          {/* studio intro */}
          <div className="absolute left-0 top-3 z-20 w-[52%] -rotate-1 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-3" style={{ boxShadow: "5px 6px 0 rgb(17 19 21 / 0.25)" }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--sample-accent)]">Studio</p>
            <h3
              className={cn("mt-1.5 font-display uppercase leading-[0.86]", compact ? "text-2xl" : "text-4xl md:text-[2.9rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Structure in motion.
            </h3>
            <p className={cn("mt-2 text-[10px] leading-4 text-[var(--sample-muted)]", compact ? "hidden" : "")}>
              We work at all scales — fragmenting the grid to find new spatial tension. 950 projects, 44 nations.
            </p>
          </div>

          {/* featured project image (skewed clipping) */}
          <div className="absolute right-0 top-2 z-10 h-[46%] w-[42%] rotate-[2deg] border-2 border-[var(--sample-border)]" style={{ clipPath: "polygon(8% 0, 100% 6%, 92% 100%, 0 90%)", boxShadow: "5px 6px 0 rgb(17 19 21 / 0.25)" }}>
            <PhotoSurface className="h-full w-full" scene="interior">
              <span className="absolute bottom-1.5 left-2 bg-[var(--sample-base)]/75 px-1.5 py-0.5 text-[8px] font-bold uppercase text-[var(--sample-text)]">Phaeno · Wolfsburg</span>
            </PhotoSurface>
          </div>

          {/* selected projects list */}
          <div className="absolute bottom-1 right-1 z-30 w-[50%] rotate-[1deg] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]" style={{ boxShadow: "5px 6px 0 rgb(17 19 21 / 0.25)" }}>
            <p className="border-b-2 border-[var(--sample-border)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em]">Selected projects</p>
            {projects.map(([name, meta], index) => (
              <div className={cn("flex items-center justify-between gap-2 border-b border-[var(--sample-border)]/30 px-2.5 py-1.5 last:border-b-0", compact && index === 2 ? "hidden" : "")} key={name}>
                <span className="flex min-w-0 items-center gap-2">
                  <span className="text-[9px] tabular-nums text-[var(--sample-accent)]">0{index + 1}</span>
                  <span className="truncate text-[10px] font-bold">{name}</span>
                </span>
                <span className="shrink-0 text-[8px] uppercase text-[var(--sample-muted)]">{meta}</span>
              </div>
            ))}
          </div>

          {/* enter archive bar */}
          <div className={cn("absolute bottom-1 left-0 z-30 flex w-[44%] items-center justify-between border-2 border-[var(--sample-border)] bg-[var(--sample-text)] px-3 py-2 text-[10px] font-bold uppercase text-[var(--sample-base)]", compact ? "hidden" : "")}>
            <span>Enter the archive</span>
            <IconArrow size={13} />
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function AvantGardeEditorial({ className, compact = false, style }: Props) {
  const program: Array<[string, string, string]> = [
    ["Now", "Christine Sun Kim — All Day", style.palette.accent],
    ["May 02", "Sound & Score: live assembly", style.palette.accent2],
    ["May 18", "Reading room / new essays", style.palette.accent3],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        {/* museum nav */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b-2 border-[var(--sample-border)] pb-2 text-[10px] font-bold uppercase tracking-[0.04em]">
          <nav className={cn("items-center gap-3", compact ? "hidden" : "flex")}>
            <span>What&apos;s On</span>
            <span>Visit</span>
            <span>Art</span>
          </nav>
          <span className="font-display text-base tracking-tight" style={{ fontFamily: "var(--st-font-display)", justifySelf: compact ? "start" : "center" }}>KUNSTHALLE</span>
          <span className="flex items-center justify-end gap-2">
            <span className="rounded-[var(--st-radius-pill)] border-2 border-[var(--sample-border)] px-2.5 py-0.5">Tickets</span>
            <span className="text-base leading-none">≡</span>
          </span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1.25fr_0.75fr]" : "grid-cols-1 md:grid-cols-[1.3fr_0.7fr] md:gap-4")}>
          {/* exhibition hero image */}
          <div className="relative min-h-0 overflow-hidden border-2 border-[var(--sample-border)]">
            <PhotoSurface className="h-full w-full" scene="portrait" />
            {/* constructivist accents */}
            <span aria-hidden="true" className="absolute -right-6 top-6 h-3 w-40 rotate-[32deg] bg-[var(--sample-accent)]" />
            <span aria-hidden="true" className="absolute left-3 top-3 h-6 w-6 rounded-full bg-[var(--sample-accent-3)]" />
            <div className="absolute inset-0 flex flex-col justify-between p-3">
              <span className="w-fit bg-[var(--sample-text)] px-2 py-0.5 text-[9px] font-bold uppercase text-[var(--sample-base)]">Exhibition</span>
              <h3
                className={cn("font-display uppercase leading-[0.8] text-[var(--sample-base)]", compact ? "text-3xl" : "text-5xl md:text-[3.6rem]")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", textShadow: "0 2px 14px rgb(0 0 0 / 0.5)" }}
              >
                No center,
                <br />
                only action.
              </h3>
              <div className="flex items-end justify-between text-[9px] font-bold uppercase text-[var(--sample-base)]">
                <span className="bg-[var(--sample-text)]/55 px-1.5 py-0.5">Mar 28 — Aug 30</span>
                <span className="bg-[var(--sample-text)]/55 px-1.5 py-0.5">Hall 02</span>
              </div>
            </div>
          </div>

          {/* what's on rail */}
          <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-2">
            <p className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.1em]">
              What&apos;s on <span className="text-[var(--sample-accent)]">2026</span>
            </p>
            <div className="grid content-start gap-1.5">
              {program.map(([date, title, color], index) => (
                <div className={cn("border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-2", compact && index === 2 ? "hidden" : "")} key={title}>
                  <p className="flex items-center gap-1.5 text-[8px] font-bold uppercase">
                    <span className="h-2 w-2" style={{ backgroundColor: color }} />
                    <span className="text-[var(--sample-muted)]">{date}</span>
                  </p>
                  <p className="mt-1 line-clamp-2 text-[10px] font-bold leading-tight">{title}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2 text-[10px] font-bold uppercase text-[var(--sample-base)]">
              <span>Plan your visit</span>
              <IconArrow size={13} />
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function PostmodernMemphisPortal({ className, compact = false, style }: Props) {
  const objects: Array<[string, string, CSSProperties]> = [
    ["Carlton Shelf", "$1,240", { backgroundColor: "var(--sample-surface)", backgroundImage: "radial-gradient(circle at 8px 8px, var(--sample-accent) 0 4px, transparent 5px), radial-gradient(circle at 22px 20px, var(--sample-accent-2) 0 3px, transparent 4px), radial-gradient(circle at 14px 26px, var(--sample-accent-3) 0 4px, transparent 5px)", backgroundSize: "30px 30px" }],
    ["Tahiti Lamp", "$680", { backgroundColor: "var(--sample-accent)", backgroundImage: "repeating-linear-gradient(45deg, var(--sample-surface) 0 5px, transparent 5px 12px)" }],
    ["Kristall Table", "$540", { backgroundColor: "var(--sample-accent-2)", backgroundImage: "repeating-linear-gradient(0deg, var(--sample-accent-3) 0 3px, transparent 3px 12px), repeating-linear-gradient(90deg, var(--sample-accent-3) 0 3px, transparent 3px 12px)" }],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* memphis background motifs */}
      <span aria-hidden="true" className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(circle at 14px 14px, var(--sample-accent-3) 0 3px, transparent 4px)", backgroundSize: "46px 46px" }} />
      <svg aria-hidden="true" className="absolute right-2 top-12 w-24 text-[var(--sample-accent)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={4} viewBox="0 0 120 16">
        <path d="M2 8 Q 12 0 22 8 T 42 8 T 62 8 T 82 8 T 102 8 T 118 8" />
      </svg>
      <span aria-hidden="true" className="absolute bottom-3 left-2 h-10 w-10 rounded-full bg-[var(--sample-accent-2)]" style={{ clipPath: "inset(0 0 50% 0)" }} />
      <span aria-hidden="true" className="absolute left-[44%] top-2 h-6 w-6 rotate-45 bg-[var(--sample-accent-3)]" />

      <div className="relative flex h-full flex-col">
        {/* nav */}
        <div className="flex items-center gap-3 text-xs font-black uppercase">
          <span className="rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2.5 py-1">Memphis Milano</span>
          <nav className={cn("items-center gap-3 text-[10px]", compact ? "hidden" : "flex")}>
            <span>Objects</span>
            <span style={{ color: "var(--sample-accent)" }}>Exhibition</span>
            <span>Shop</span>
          </nav>
          <span className="ml-auto h-6 w-6 rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent)]" />
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[0.95fr_1.05fr]" : "grid-cols-1 md:grid-cols-[0.92fr_1.08fr] md:gap-4")}>
          {/* hero card */}
          <div className="relative flex min-w-0 flex-col justify-between rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-3.5" style={{ boxShadow: "6px 6px 0 var(--sample-accent-3)" }}>
            <span className="w-fit rounded-[var(--st-radius-pill)] border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-2.5 py-0.5 text-[10px] font-black uppercase">On view · 2026</span>
            <h3
              className={cn("font-display uppercase leading-[0.88]", compact ? "text-3xl" : "text-5xl md:text-[3.6rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Rules are
              <br />
              props.
            </h3>
            <div className={cn("flex items-center gap-2", compact ? "hidden" : "")}>
              <span className="rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-3 py-1.5 text-[11px] font-black text-[var(--sample-surface)]">Plan a visit</span>
              <span className="h-3 w-3 rounded-full bg-[var(--sample-accent-2)]" />
              <span className="h-3 w-3 bg-[var(--sample-accent-3)]" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
            </div>
          </div>

          {/* object cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {objects.map(([name, price, pattern]) => (
              <div className="flex min-w-0 flex-col rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-1.5" style={{ boxShadow: "3px 3px 0 var(--sample-border)" }} key={name}>
                <span className="block flex-1 rounded-[calc(var(--st-radius)-2px)] border-2 border-[var(--sample-border)]" style={pattern} />
                <p className="mt-1.5 truncate text-[10px] font-black uppercase leading-tight">{name}</p>
                <p className="text-[9px] font-bold" style={{ color: "var(--sample-accent)" }}>{price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function RetroDinerShop({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("grid place-items-center bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* retro application window */}
      <div className="w-full overflow-hidden rounded-[6px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] text-[var(--sample-text)]" style={{ boxShadow: "6px 6px 0 rgb(58 31 19 / 0.3)" }}>
        {/* title bar */}
        <div className="flex items-center gap-2 border-b-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)] px-2 py-1 text-[10px] font-bold text-[var(--sample-surface)]">
          <span className="flex gap-1">
            <span className="grid h-3 w-3 place-items-center border border-[var(--sample-surface)] text-[7px] leading-none">×</span>
            <span className="h-3 w-3 border border-[var(--sample-surface)]" />
          </span>
          <span className="truncate">Poolside FM — Leisure Enhancer</span>
          <span className="ml-auto">v3.0.2</span>
        </div>

        <div className="grid grid-cols-[0.85fr_1.15fr]">
          {/* tinted photo */}
          <div className="border-r-2 border-[var(--sample-border)]">
            <PhotoSurface className="h-full min-h-[120px]" scene="interior">
              <span className="absolute bottom-1.5 left-1.5 bg-[var(--sample-surface)]/80 px-1.5 py-0.5 text-[8px] font-bold uppercase text-[var(--sample-text)]">Summer, 86′</span>
            </PhotoSurface>
          </div>
          {/* info */}
          <div className="flex flex-col justify-between p-3">
            <div>
              <div className="flex items-start justify-between">
                <h3
                  className={cn("font-display leading-[0.86]", compact ? "text-3xl" : "text-4xl md:text-[3.2rem]")}
                  style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
                >
                  POOLSIDE
                </h3>
                {/* sun-rays mark */}
                <span aria-hidden="true" className="relative mt-1 h-6 w-6 shrink-0 overflow-hidden">
                  <span className="absolute inset-0 rounded-full" style={{ backgroundImage: "repeating-conic-gradient(var(--sample-accent) 0 14deg, transparent 14deg 28deg)" }} />
                </span>
              </div>
              <p className="mt-1 text-[10px] font-bold">PFM Leisure Enhancer · Version 3.0.2</p>
              <p className={cn("mt-1 text-[9px] italic leading-4 text-[var(--sample-muted)]", compact ? "hidden" : "")}>
                Marty Bell, Lewis King, Bas Strien, Alyssa Ordillano, Emily Nabnian, Jamiel Rahi
              </p>
            </div>
            {/* progress loader */}
            <div className="mt-3">
              <p className="flex items-center justify-between text-[9px] font-bold">
                <span>Applying Vacation-SPF 30…</span>
                <span>30%</span>
              </p>
              <div className="mt-1 flex gap-[2px] border border-[var(--sample-border)] bg-[var(--sample-base)] p-[2px]">
                {Array.from({ length: 18 }).map((_, index) => (
                  <span className="h-2 flex-1" key={index} style={{ backgroundColor: index < 6 ? "var(--sample-accent-2)" : "transparent" }} />
                ))}
              </div>
            </div>
            {/* player controls */}
            <div className={cn("mt-2.5 flex items-center gap-2 border-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-2 py-1 text-[10px] font-bold", compact ? "hidden" : "")}>
              <span>◀◀</span>
              <span className="grid h-4 w-4 place-items-center bg-[var(--sample-accent)] text-[8px] text-[var(--sample-surface)]">▶</span>
              <span>▶▶</span>
              <span className="ml-1 truncate">FM 74.5 — Summer Madness</span>
              <span className="ml-auto">3:24</span>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function VintagePaperCatalog({ className, compact = false, style }: Props) {
  const goods: Array<[string, string, string, PhotoScene]> = [
    ["Tin Cloth Jacket", "Waxed cotton", "$425", "material"],
    ["Field Boot", "Full-grain", "$320", "studio"],
    ["Rugged Twill Bag", "Bridle leather", "$295", "product"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* aged paper grain */}
      <span aria-hidden="true" className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--sample-border) 0 1px, transparent 1px)", backgroundSize: "11px 11px" }} />
      <div className="relative flex h-full flex-col border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]">
        {/* masthead */}
        <div className="border-b-2 border-[var(--sample-border)] px-3 py-2 text-center">
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--sample-muted)]">Outfitters since 1897</p>
          <h3
            className={cn("font-display uppercase leading-none tracking-tight", compact ? "text-2xl" : "text-3xl md:text-[2.4rem]")}
            style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)" }}
          >
            Filson &amp; Co.
          </h3>
          <nav className={cn("mt-1 items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Men</span>
            <span>Women</span>
            <span>Bags</span>
            <span>Heritage</span>
            <span>Catalog</span>
          </nav>
        </div>

        {/* product grid */}
        <div className="grid flex-1 grid-cols-3">
          {goods.map(([name, sub, price, scene], index) => (
            <div className={cn("flex min-w-0 flex-col p-2", index < 2 ? "border-r-2 border-[var(--sample-border)]" : "")} key={name}>
              <div className="relative flex-1 border border-[var(--sample-border)]">
                <PhotoSurface className="h-full min-h-[80px] w-full" scene={scene} />
                {index === 0 ? <span className="absolute left-1 top-1 bg-[var(--sample-accent)] px-1 py-0.5 text-[7px] font-bold uppercase text-[var(--sample-surface)]">New</span> : null}
              </div>
              <p className="mt-1.5 truncate font-display text-[11px] font-bold leading-tight" style={{ fontFamily: "var(--st-font-display)" }}>{name}</p>
              <p className={cn("truncate text-[8px] uppercase tracking-[0.06em] text-[var(--sample-muted)]", compact ? "hidden" : "")}>{sub}</p>
              <p className="text-[10px] font-bold text-[var(--sample-accent)]">{price}</p>
            </div>
          ))}
        </div>

        {/* guarantee band */}
        <div className={cn("flex items-center justify-between border-t-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.08em]", compact ? "hidden" : "")}>
          <span>Free shipping over $150</span>
          <span className="grid h-6 w-16 -rotate-3 place-items-center rounded-full border border-[var(--sample-border)] text-[8px]">Inspected ✓</span>
          <span>Lifetime guarantee</span>
        </div>
      </div>
    </SampleFrame>
  );
}

function SeventiesGroovyLanding({ className, compact = false, style }: Props) {
  const goods: Array<[string, string, PhotoScene]> = [
    ["Bubble Vase", "$48", "material"],
    ["Shag Rug", "$120", "interior"],
    ["Disco Lamp", "$86", "studio"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* groovy arches */}
      <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full" style={{ backgroundImage: "repeating-radial-gradient(circle, var(--sample-accent) 0 8px, var(--sample-accent-3) 8px 16px)" }} />
      <div className="relative flex h-full flex-col">
        {/* nav */}
        <div className="flex items-center gap-3">
          <span className="rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-3 py-1 font-display text-sm font-black text-[var(--sample-base)]" style={{ fontFamily: "var(--st-font-display)" }}>
            Houseplant
          </span>
          <nav className={cn("items-center gap-3 text-[11px] font-bold uppercase", compact ? "hidden" : "flex")}>
            <span>Shop</span>
            <span>Stories</span>
            <span>About</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius-pill)] bg-[var(--sample-accent-2)] px-3 py-1 text-[10px] font-bold uppercase text-[var(--sample-surface)]">Cart · 2</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1fr_0.9fr]" : "grid-cols-1 md:grid-cols-[1.05fr_0.95fr] md:gap-4")}>
          {/* hero */}
          <div className="relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-3.5" style={{ boxShadow: "var(--st-shadow)" }}>
            <span className="w-fit rounded-[var(--st-radius-pill)] bg-[var(--sample-accent)] px-2.5 py-0.5 text-[10px] font-black uppercase text-[var(--sample-surface)]">New season</span>
            <h3
              className={cn("font-display leading-[0.92]", compact ? "text-3xl" : "text-5xl md:text-[3.3rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Warm curves
              <br />
              for easy days.
            </h3>
            <span className={cn("inline-flex w-fit items-center gap-1.5 rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-4 py-2 text-[11px] font-bold text-[var(--sample-base)]", compact ? "hidden" : "")}>
              Shop the collection <IconArrow size={12} />
            </span>
          </div>

          {/* product cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {goods.map(([name, price, scene]) => (
              <div className="flex min-w-0 flex-col overflow-hidden rounded-[var(--st-radius)] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-1.5" key={name}>
                <PhotoSurface className="aspect-square w-full rounded-[var(--st-radius-pill)]" grain={false} scene={scene} />
                <p className="mt-1.5 truncate text-[11px] font-bold">{name}</p>
                <p className="text-[10px] font-bold text-[var(--sample-accent)]">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function EightiesSynthConsole({ className, compact = false, style }: Props) {
  const tracks: Array<[string, string, string]> = [
    ["01", "Midnight Drive", "var(--sample-accent)"],
    ["02", "Neon Tokyo", "var(--sample-accent-2)"],
    ["03", "Chrome Sunset", "var(--sample-accent-3)"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* retro sun */}
      <span aria-hidden="true" className="absolute left-1/2 top-3 h-24 w-24 -translate-x-1/2 overflow-hidden rounded-full" style={{ backgroundImage: "linear-gradient(180deg, var(--sample-accent) 0%, var(--sample-accent-3) 100%)" }}>
        <span className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundImage: "repeating-linear-gradient(0deg, var(--sample-base) 0 3px, transparent 3px 8px)" }} />
      </span>
      {/* neon grid floor */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 opacity-60"
        style={{
          backgroundImage: "linear-gradient(var(--sample-accent-2) 1px, transparent 1px), linear-gradient(90deg, var(--sample-accent-2) 1px, transparent 1px)",
          backgroundSize: "26px 22px",
          maskImage: "linear-gradient(transparent, #000 60%)",
          WebkitMaskImage: "linear-gradient(transparent, #000 60%)",
        }}
      />

      <div className="relative flex h-full flex-col font-mono">
        {/* nav */}
        <div className="flex items-center gap-3 border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.7)] px-3 py-1.5 text-[10px]" style={{ boxShadow: "0 0 10px rgb(var(--st-accent-2-rgb) / 0.4)" }}>
          <span className="font-bold text-[var(--sample-accent-2)]">SYNTH://88</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Mixes</span>
            <span>Shop</span>
            <span>Live</span>
          </nav>
          <span className="ml-auto flex items-center gap-1 text-[var(--sample-accent)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--sample-accent)]" /> ON AIR
          </span>
        </div>

        <div className={cn("grid min-h-0 flex-1 items-center gap-3 pt-3", compact ? "grid-cols-[1fr_0.82fr]" : "grid-cols-1 md:grid-cols-[1.1fr_0.9fr]")}>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--sample-accent-3)]">Vol. 88 · synthwave</p>
            <h3
              className={cn("mt-2 font-display uppercase leading-[0.84]", compact ? "text-3xl" : "text-5xl md:text-[3.6rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", color: "var(--sample-text)", textShadow: "0 0 8px rgb(var(--st-accent-rgb) / 0.9), 2px 2px 0 var(--sample-accent-2)" }}
            >
              Midnight
              <br />
              drive.
            </h3>
            <span className={cn("mt-4 inline-flex items-center gap-1.5 border border-[var(--sample-accent-2)] bg-[rgb(var(--st-accent-2-rgb)/0.12)] px-4 py-1.5 text-[11px] font-bold uppercase text-[var(--sample-accent-2)]", compact ? "hidden" : "")} style={{ boxShadow: "0 0 12px rgb(var(--st-accent-2-rgb) / 0.5)" }}>
              ▶ Play mix
            </span>
          </div>

          {/* now playing / EQ */}
          <div className="grid gap-1.5 border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.7)] p-2.5" style={{ boxShadow: "0 0 12px rgb(var(--st-accent-2-rgb) / 0.3)" }}>
            {tracks.map(([num, name, color], index) => (
              <div className="flex items-center gap-2 text-[10px]" key={name}>
                <span className="text-[var(--sample-muted)]">{num}</span>
                <span className="w-16 shrink-0 truncate text-[var(--sample-text)]">{name}</span>
                <span className="flex h-3 flex-1 items-end gap-[2px]">
                  {[60, 90, 40, 100, 70, 85, 50].map((h, barIndex) => (
                    <span key={barIndex} className="flex-1" style={{ height: `${index === 0 ? h : h * 0.6}%`, backgroundColor: color, opacity: index === 0 ? 1 : 0.5 }} />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function NinetiesGraphicZine({ className, compact = false, style }: Props) {
  const planets: Array<[string, string, string, string]> = [
    ["Home", "var(--sample-accent)", "left-[6%] top-[14%]", ""],
    ["Tunes", "var(--sample-accent-2)", "right-[8%] top-[10%]", ""],
    ["Store", "var(--sample-accent-3)", "left-[10%] bottom-[18%]", ""],
    ["Links", "var(--sample-accent)", "right-[6%] bottom-[20%]", ""],
  ];

  return (
    <SampleFrame className={cn("grid place-items-center bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* browser window */}
      <div className="flex h-full w-full flex-col border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)]" style={{ boxShadow: "5px 5px 0 var(--sample-border)" }}>
        {/* title bar */}
        <div className="flex items-center justify-between bg-[var(--sample-accent-2)] px-2 py-1 text-[10px] font-black text-white">
          <span className="truncate">★ Netscape — THE SPACE ZONE ★</span>
          <span className="flex gap-0.5">
            <span className="grid h-3 w-3 place-items-center border border-white text-[7px] leading-none">_</span>
            <span className="grid h-3 w-3 place-items-center border border-white text-[7px] leading-none">×</span>
          </span>
        </div>
        {/* marquee */}
        <div className="overflow-hidden whitespace-nowrap border-b-2 border-[var(--sample-border)] bg-[var(--sample-accent)] py-0.5 text-[9px] font-black uppercase text-white">
          ★ under construction ★ sign my guestbook ★ best viewed in 800×600 ★ you are visitor 000847 ★&nbsp;
        </div>

        {/* starfield + planet nav */}
        <div className="relative flex-1 overflow-hidden bg-[#0a0a1f]">
          <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 10px 10px, #ffffff 0 1px, transparent 1px), radial-gradient(circle at 30px 24px, #ffffff 0 1px, transparent 1px)", backgroundSize: "40px 36px, 52px 48px" }} />
          {/* central logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h3
              className={cn("font-display uppercase leading-[0.82]", compact ? "text-2xl" : "text-4xl md:text-5xl")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", color: "var(--sample-accent-3)", textShadow: "2px 2px 0 var(--sample-accent), -2px -1px 0 var(--sample-accent-2)" }}
            >
              Space
              <br />
              Zone
            </h3>
          </div>
          {/* planet links */}
          {planets.map(([label, color, pos, textColor]) => (
            <span className={cn("absolute flex flex-col items-center gap-0.5", pos)} key={label}>
              <span className="h-6 w-6 rounded-full border border-white" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
              <span className={cn("text-[8px] font-black uppercase underline", textColor || "text-white")}>{label}</span>
            </span>
          ))}
        </div>

        {/* footer hit counter */}
        <div className={cn("flex items-center justify-between border-t-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-[9px] font-black", compact ? "hidden" : "")}>
          <span className="flex items-center gap-1">
            visitors:
            <span className="flex gap-px">
              {["0", "0", "0", "8", "4", "7"].map((digit, index) => (
                <span className="bg-[var(--sample-text)] px-1 text-[var(--sample-accent-3)]" key={index}>{digit}</span>
              ))}
            </span>
          </span>
          <span className="underline" style={{ color: "#0000EE" }}>join the webring →</span>
        </div>
      </div>
    </SampleFrame>
  );
}

function Y2KGlossPortal({ className, compact = false, style }: Props) {
  const apps: Array<[string, string]> = [
    ["P", "var(--sample-accent-2)"],
    ["M", "var(--sample-accent-3)"],
    ["★", "var(--sample-accent)"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* frosted gradient blobs */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(40% 50% at 18% 22%, rgb(var(--st-accent-2-rgb) / 0.55), transparent 60%), radial-gradient(45% 55% at 86% 30%, rgb(var(--st-accent-rgb) / 0.5), transparent 60%), radial-gradient(50% 50% at 60% 100%, rgb(var(--st-accent-3-rgb) / 0.4), transparent 60%)" }}
      />
      <div className="relative flex h-full flex-col">
        {/* glossy logo bar */}
        <div className="flex items-center justify-between">
          <span
            className="rounded-[var(--st-radius-pill)] border border-white px-3 py-1 font-display text-sm font-black text-[var(--sample-accent-2)]"
            style={{ fontFamily: "var(--st-font-display)", backgroundImage: "linear-gradient(180deg, #ffffff 0%, var(--sample-base) 100%)", boxShadow: "0 2px 6px rgb(var(--st-text-rgb) / 0.18), inset 0 1px 0 #ffffff" }}
          >
            ✦ Crystal™
          </span>
          <span className="rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] bg-white/70 px-3 py-1 text-[10px] font-bold text-[var(--sample-text)]">login ▾</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 items-center gap-3 pt-3", compact ? "grid-cols-[1fr_0.85fr]" : "grid-cols-1 md:grid-cols-[1.05fr_0.95fr] md:gap-5")}>
          <div className="min-w-0">
            <h3
              className={cn("font-display leading-[0.9] text-[var(--sample-text)]", compact ? "text-3xl" : "text-5xl md:text-[3.4rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Thank u!
              <br />
              See u soon!
            </h3>
            <p className={cn("mt-3 max-w-[20ch] text-[11px] leading-5 text-[var(--sample-muted)]", compact ? "hidden" : "")}>
              The crystal portal is getting a shiny new makeover. ✦ Drop your email and sparkle on.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-[var(--st-radius-pill)] border border-white px-4 py-2 text-[11px] font-black text-[var(--sample-text)]"
                style={{ backgroundImage: "linear-gradient(180deg, #ffffff 0%, var(--sample-accent) 100%)", boxShadow: "0 3px 8px rgb(var(--st-accent-rgb) / 0.5), inset 0 1px 0 #ffffff" }}
              >
                Notify me <IconStar size={11} />
              </span>
              <span className={cn("flex gap-1.5", compact ? "hidden" : "")}>
                {apps.map(([glyph, color]) => (
                  <span
                    key={glyph}
                    className="grid h-7 w-7 place-items-center rounded-[8px] border border-white text-[11px] font-black text-white"
                    style={{ backgroundImage: `linear-gradient(180deg, #ffffff66 0%, ${color} 60%)`, boxShadow: "inset 0 1px 0 #ffffff, 0 2px 4px rgb(var(--st-text-rgb) / 0.2)" }}
                  >
                    {glyph}
                  </span>
                ))}
              </span>
            </div>
          </div>

          {/* glossy image card */}
          <div
            className="relative aspect-square w-full max-w-[10rem] justify-self-center overflow-hidden rounded-[18px] border-2 border-white"
            style={{ boxShadow: "0 8px 20px rgb(var(--st-text-rgb) / 0.25), inset 0 2px 0 #ffffff" }}
          >
            <PhotoSurface className="h-full w-full" grain={false} scene="material" />
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2" style={{ backgroundImage: "linear-gradient(180deg, rgb(255 255 255 / 0.55), transparent)" }} />
            <IconStar className="absolute left-2 top-2 text-white" size={14} />
            <IconStar className="absolute bottom-6 right-3 text-white" size={10} />
            <span className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1">
              {[0, 1, 2, 3].map((dot) => (
                <span key={dot} className={cn("h-1.5 w-1.5 rounded-full border border-white", dot === 0 ? "bg-white" : "bg-white/40")} />
              ))}
            </span>
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

function BauhausSchool({ className, compact = false, style }: Props) {
  const workshops: Array<[string, string]> = [
    ["Typography", "var(--sample-accent)"],
    ["Weaving", "var(--sample-accent-2)"],
    ["Metal", "var(--sample-accent-3)"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        {/* nav */}
        <div className="flex items-center gap-3 border-b-[3px] border-[var(--sample-border)] pb-2 text-[10px] font-bold uppercase tracking-[0.06em]">
          <span className="font-display text-base tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>Bauhaus</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Ausstellung</span>
            <span>Werkstatt</span>
            <span>Archiv</span>
          </nav>
          <span className="ml-auto">1919—1933</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1.15fr_0.85fr]" : "grid-cols-1 md:grid-cols-[1.18fr_0.82fr]")}>
          {/* geometric poster */}
          <div className="relative grid grid-cols-2 grid-rows-2 overflow-hidden border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)]">
            {/* cells with primary shapes */}
            <div className="relative border-b-[3px] border-r-[3px] border-[var(--sample-border)]">
              <span className="absolute inset-2 rounded-full bg-[var(--sample-accent-2)]" />
            </div>
            <div className="relative border-b-[3px] border-[var(--sample-border)] bg-[var(--sample-accent)]" />
            <div className="relative border-r-[3px] border-[var(--sample-border)]">
              <span className="absolute bottom-2 left-2 right-2 top-3 bg-[var(--sample-accent-3)]" style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} />
            </div>
            <div className="relative">
              <span className="absolute inset-x-3 top-1/2 h-[3px] -translate-y-1/2 bg-[var(--sample-border)]" />
              <span className="absolute left-1/2 top-3 bottom-3 w-[3px] -translate-x-1/2 bg-[var(--sample-border)]" />
            </div>
            {/* headline overlay */}
            <h3
              className={cn("pointer-events-none absolute bottom-1 left-1 font-display uppercase leading-[0.8] text-[var(--sample-text)]", compact ? "text-2xl" : "text-4xl md:text-[3.1rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", mixBlendMode: "multiply" }}
            >
              Form &amp;
              <br />
              function
            </h3>
            <span className="absolute right-1.5 top-1.5 bg-[var(--sample-border)] px-1.5 py-0.5 text-[8px] font-bold uppercase text-[var(--sample-surface)]">Ausstellung ’23</span>
          </div>

          {/* program rail */}
          <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-2">
            <div className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] p-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.1em]">Exhibition</p>
              <p className="font-display text-lg font-black leading-none" style={{ fontFamily: "var(--st-font-display)" }}>Weimar 2026</p>
            </div>
            <div className="grid content-start gap-1.5">
              {workshops.map(([name, color], index) => (
                <div className={cn("flex items-center gap-2 border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-1.5", compact && index === 2 ? "hidden" : "")} key={name}>
                  <span className={cn("h-5 w-5 shrink-0", index === 0 ? "rounded-full" : "")} style={{ backgroundColor: color, clipPath: index === 2 ? "polygon(0 100%, 50% 0, 100% 100%)" : undefined }} />
                  <span className="truncate text-[11px] font-bold uppercase">{name}</span>
                </div>
              ))}
            </div>
            <div className={cn("flex items-center justify-between border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] px-3 py-2 text-[10px] font-bold uppercase text-[var(--sample-base)]", compact ? "hidden" : "")}>
              <span>Plan a visit</span>
              <IconArrow size={13} />
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function MidCenturyModernStudio({ className, compact = false, style }: Props) {
  const goods: Array<[string, string, PhotoScene]> = [
    ["Lounge Chair", "$1,890", "product"],
    ["Sideboard", "$2,400", "interior"],
    ["Arc Lamp", "$640", "studio"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* atomic starburst */}
      <span
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-32 w-32 opacity-40"
        style={{ backgroundImage: "repeating-conic-gradient(from 0deg at 50% 50%, var(--sample-accent) 0deg 4deg, transparent 4deg 18deg)" }}
      />
      <div className="relative flex h-full flex-col">
        {/* nav */}
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.04em]">
          <span className="font-display text-sm tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>Atelier ’56</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Furniture</span>
            <span>Story</span>
            <span>Shop</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius-pill)] bg-[var(--sample-accent)] px-3 py-1 text-[10px] text-[var(--sample-surface)]">Cart · 1</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1fr_0.95fr]" : "grid-cols-1 md:grid-cols-[1.02fr_0.98fr] md:gap-4")}>
          {/* hero */}
          <div className="relative flex min-w-0 flex-col justify-between rounded-[var(--st-radius)] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3.5" style={{ boxShadow: "var(--st-shadow)" }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--sample-accent)]">Modern living</p>
            <h3
              className={cn("font-display leading-[0.94]", compact ? "text-3xl" : "text-5xl md:text-[3.2rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Designed for
              <br />
              modern living.
            </h3>
            <div className={cn("flex items-center gap-2", compact ? "hidden" : "")}>
              <span className="rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-4 py-2 text-[11px] font-bold text-[var(--sample-base)]">Shop seating</span>
              {/* boomerang shape */}
              <span className="h-3 w-8 rounded-full bg-[var(--sample-accent-2)]" style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%, 70% 100%, 50% 40%, 30% 100%)" }} />
            </div>
          </div>

          {/* product cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {goods.map(([name, price, scene]) => (
              <div className="flex min-w-0 flex-col overflow-hidden rounded-[var(--st-radius)] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-1.5" style={{ boxShadow: "var(--st-shadow)" }} key={name}>
                <PhotoSurface className="aspect-[3/4] w-full rounded-[calc(var(--st-radius)-2px)]" grain={false} scene={scene} />
                <p className="mt-1.5 truncate text-[11px] font-bold leading-tight">{name}</p>
                <p className="text-[10px] font-bold text-[var(--sample-accent)]">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

const NOTCH = "polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px))";

function FuturismVelocity({ className, compact = false, style }: Props) {
  const specs: Array<[string, string]> = [
    ["0–100", "2.1s"],
    ["Range", "640km"],
    ["Top", "410km/h"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* speed lines */}
      <span aria-hidden="true" className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "repeating-linear-gradient(115deg, var(--sample-text) 0 1px, transparent 1px 18px)" }} />
      <span aria-hidden="true" className="absolute -right-10 top-0 h-full w-1/2 -skew-x-[18deg] bg-[var(--sample-accent)] opacity-10" />
      <div className="relative flex h-full flex-col">
        {/* nav */}
        <div className="flex items-center gap-3 border-b border-[var(--sample-border)] pb-2 text-[10px] font-bold uppercase tracking-[0.08em]">
          <span className="font-display text-base italic tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>VELOCE</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Models</span>
            <span>Tech</span>
            <span>Reserve</span>
          </nav>
          <span className="ml-auto bg-[var(--sample-accent)] px-2.5 py-1 text-[var(--sample-surface)]" style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}>Configure</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1fr_0.9fr]" : "grid-cols-1 md:grid-cols-[1.05fr_0.95fr] md:gap-5")}>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sample-accent)]">/ next-gen aero</p>
            <h3
              className={cn("mt-2 font-display italic uppercase leading-[0.82]", compact ? "text-4xl" : "text-6xl md:text-[4.4rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Forward.
              <br />
              <span className="text-[var(--sample-accent)]">Faster.</span>
            </h3>
            <div className="mt-4 flex gap-5">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--sample-muted)]">{label}</p>
                  <p className="font-display text-base font-black" style={{ fontFamily: "var(--st-font-display)" }}>{value}</p>
                </div>
              ))}
            </div>
            <span className={cn("mt-4 inline-flex w-fit items-center gap-1.5 bg-[var(--sample-text)] px-4 py-2 text-[11px] font-bold uppercase text-[var(--sample-base)]", compact ? "hidden" : "")} style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}>
              Reserve now <IconArrow size={12} />
            </span>
          </div>

          {/* craft image */}
          <div className="relative min-h-0 overflow-hidden border border-[var(--sample-border)]" style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}>
            <PhotoSurface className="h-full w-full" scene="studio" />
            <span className="absolute -left-6 top-1/2 h-2 w-1/2 -translate-y-1/2 bg-[var(--sample-accent)]" />
            <span className="absolute bottom-2 right-2 bg-[var(--sample-text)] px-1.5 py-0.5 text-[8px] font-bold uppercase text-[var(--sample-base)]">Model V — 2026</span>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function CyberpunkCity({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* neon city glow */}
      <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(60% 70% at 80% 10%, rgb(var(--st-accent-2-rgb) / 0.35), transparent 55%), radial-gradient(50% 60% at 12% 95%, rgb(var(--st-accent-rgb) / 0.3), transparent 55%)" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgb(0 0 0 / 0.5) 2px 3px)" }} />
      <div className="relative flex h-full flex-col font-mono text-[var(--sample-text)]">
        {/* nav */}
        <div className="flex items-center gap-3 border-b border-[var(--sample-border)] pb-2 text-[10px]">
          <span className="font-bold text-[var(--sample-accent)]">KIROSHI<span className="text-[var(--sample-accent-2)]">{"//"}</span>OPTICS</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Shop</span>
            <span>Implants</span>
            <span>Ops</span>
          </nav>
          <span className="ml-auto bg-[var(--sample-accent)] px-2.5 py-1 font-bold text-[var(--sample-base)]" style={{ clipPath: NOTCH }}>BUY_NOW</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1.1fr_0.9fr]" : "grid-cols-1 md:grid-cols-[1.12fr_0.88fr]")}>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[9px] text-[var(--sample-accent-3)]">{"// status: online · night_city"}</p>
            <h3
              className={cn("mt-2 font-display uppercase leading-[0.82]", compact ? "text-4xl" : "text-6xl md:text-[4.2rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              <GlitchHeading text="JACK" />
              <br />
              <GlitchHeading text="IN." />
            </h3>
            <p className={cn("mt-3 max-w-[26ch] text-[10px] leading-4 text-[var(--sample-muted)]", compact ? "hidden" : "")}>
              {">"} chrome optics &amp; reflex boosters. street-grade, ripperdoc-approved.
            </p>
            <span className={cn("mt-4 inline-flex w-fit items-center gap-1.5 border border-[var(--sample-accent-2)] px-4 py-2 text-[11px] font-bold uppercase text-[var(--sample-accent-2)]", compact ? "hidden" : "")} style={{ clipPath: NOTCH, boxShadow: "0 0 12px rgb(var(--st-accent-2-rgb) / 0.5)" }}>
              ▶ enter store
            </span>
          </div>

          {/* product panel */}
          <div className="relative min-h-0 overflow-hidden border border-[var(--sample-accent)]" style={{ clipPath: NOTCH, boxShadow: "0 0 16px rgb(var(--st-accent-rgb) / 0.3)" }}>
            <PhotoSurface className="h-full w-full" scene="portrait" />
            <span aria-hidden="true" className="absolute left-0 top-[28%] h-3 w-2/3 bg-[var(--sample-accent)] opacity-50 mix-blend-screen" />
            <div className="absolute inset-x-2 bottom-2 flex items-center justify-between border border-[var(--sample-accent)] bg-[rgb(var(--st-base-rgb)/0.7)] px-2 py-1 text-[9px]">
              <span className="text-[var(--sample-accent)]">MANTIS_v3</span>
              <span className="font-bold">¥4,200</span>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function NeonNoirCinema({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col text-[var(--sample-text)]">
        {/* nav */}
        <div className="flex items-center gap-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em]">
          <span className="font-display text-sm" style={{ fontFamily: "var(--st-font-display)" }}>NOIR</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Films</span>
            <span>Stills</span>
            <span>Studio</span>
          </nav>
          <span className="ml-auto text-[var(--sample-accent)]">● now showing</span>
        </div>

        {/* cinematic still */}
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[2px] border border-[var(--sample-border)]">
          <PhotoSurface className="h-full w-full" scene="portrait" />
          {/* rain streaks */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(105deg, transparent 0 6px, rgb(255 255 255 / 0.4) 6px 7px)" }} />
          {/* vignette */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 80px 20px rgb(0 0 0 / 0.7)" }} />
          {/* neon sign */}
          <span
            className={cn("absolute right-3 top-3 font-display italic leading-none text-[var(--sample-accent)]", compact ? "text-2xl" : "text-4xl")}
            style={{ fontFamily: "var(--st-font-display)", textShadow: "0 0 6px var(--sample-accent), 0 0 18px var(--sample-accent)" }}
          >
            OPEN
          </span>
          <div className="absolute inset-x-3 bottom-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--sample-accent)]">Feature · 02</p>
            <h3
              className={cn("font-display uppercase leading-[0.86]", compact ? "text-3xl" : "text-5xl md:text-[3.4rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", textShadow: "0 2px 16px rgb(0 0 0 / 0.8)" }}
            >
              City of rain.
            </h3>
            <p className={cn("mt-1 text-[10px] text-[var(--sample-muted)]", compact ? "hidden" : "")}>A neo-noir short · 14 min · 2026</p>
          </div>
        </div>

        {/* film strip */}
        <div className={cn("mt-2 grid grid-cols-4 gap-1.5", compact ? "hidden" : "")}>
          {["scene", "002", "noir", "rain"].map((label, index) => (
            <div className="relative h-9 overflow-hidden rounded-[2px] border border-[var(--sample-border)]" key={label}>
              <PhotoSurface className="h-full w-full" grain={false} scene={index % 2 === 0 ? "interior" : "material"} />
              <span className="absolute bottom-0.5 left-1 text-[7px] font-bold uppercase text-[var(--sample-text)]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function TechwearSystem({ className, compact = false, style }: Props) {
  // ACRONYM-style dense catalog grid: model photos + raw monospace product codes.
  const codes = compact
    ? ["J120-GTPL", "SP62A-M", "J1?I-E", "P60-E", "J23-E", "SK28-E"]
    : ["J120-GTPL", "SP38-M", "SP62A-M", "LA14-M", "J1?I-E", "SK28-E", "P60-E", "J17K-KI", "J23-E", "P60TS-M", "SM1-AK", "CP6-GT"];
  const scenes: PhotoScene[] = ["portrait", "studio", "interior", "material"];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col font-mono text-[var(--sample-text)]">
        {/* raw nav */}
        <div className="flex items-center gap-3 pb-2 text-[10px] font-bold uppercase tracking-[0.04em]">
          <span className="font-display text-base" style={{ fontFamily: "var(--st-font-display)" }}>ACRONYM®</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Sort</span>
            <span>Img</span>
            <span>Txt</span>
            <span>Search</span>
          </nav>
          <span className="ml-auto flex items-center gap-3 text-[var(--sample-muted)]">
            <span className={compact ? "hidden" : ""}>Login</span>
            <span className="text-[var(--sample-text)]">Cart (0)</span>
          </span>
        </div>

        {/* dense product grid */}
        <div className={cn("grid min-h-0 flex-1 gap-1.5", compact ? "grid-cols-3 grid-rows-2" : "grid-cols-6 grid-rows-2")}>
          {codes.map((code, index) => (
            <div className="flex min-w-0 flex-col" key={code}>
              <div className="relative flex-1 overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)]">
                <PhotoSurface className="h-full w-full" grain={false} scene={scenes[index % scenes.length]} />
                {index === 4 ? <span className="absolute right-1 top-1 bg-[var(--sample-accent)] px-1 text-[7px] font-bold text-[var(--sample-base)]">NEW</span> : null}
              </div>
              <span className="mt-0.5 truncate text-[8px] uppercase text-[var(--sample-muted)]">{code}</span>
            </div>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function HighTechDashboard({ className, compact = false, style }: Props) {
  const kpis: Array<[string, string, string]> = [
    ["Uptime", "99.98%", "var(--sample-accent)"],
    ["p95", "84ms", "var(--sample-accent-2)"],
    ["Reqs/s", "12.4k", "var(--sample-accent-3)"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col text-[var(--sample-text)]">
        {/* nav */}
        <div className="flex items-center gap-3 pb-2 text-[10px] font-medium">
          <span className="font-display text-sm font-bold tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>Hyperscale</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Product</span>
            <span>Docs</span>
            <span>Pricing</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius)] bg-[var(--sample-accent)] px-2.5 py-1 font-semibold text-[var(--sample-base)]">Start free</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-2.5", compact ? "grid-cols-[0.8fr_1.2fr]" : "grid-cols-1 md:grid-cols-[0.82fr_1.18fr]")}>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--sample-accent)]">Observability</p>
            <h3
              className={cn("mt-2 font-display leading-[0.96] tracking-tight", compact ? "text-2xl" : "text-4xl md:text-[2.7rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Metrics at scale.
            </h3>
            <p className={cn("mt-3 max-w-[24ch] text-[11px] leading-5 text-[var(--sample-muted)]", compact ? "hidden" : "")}>
              Real-time telemetry for every service, region and request.
            </p>
          </div>

          {/* dashboard panel */}
          <div className="grid min-h-0 grid-rows-[auto_auto_1fr] gap-2 rounded-[6px] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2.5">
            <div className="grid grid-cols-3 gap-2">
              {kpis.map(([label, value, color]) => (
                <div className="rounded-[4px] border border-[var(--sample-border)] bg-[var(--sample-base)] p-2" key={label}>
                  <p className="text-[8px] uppercase tracking-[0.08em] text-[var(--sample-muted)]">{label}</p>
                  <p className="mt-1 font-display text-sm font-bold" style={{ fontFamily: "var(--st-font-display)", color }}>{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-[4px] border border-[var(--sample-border)] bg-[var(--sample-base)] p-2">
              <div className="flex items-center justify-between text-[8px] text-[var(--sample-muted)]">
                <span>Latency · 24h</span>
                <span className="text-[var(--sample-accent)]">● live</span>
              </div>
              {/* area chart */}
              <svg className="mt-1.5 h-12 w-full" preserveAspectRatio="none" viewBox="0 0 200 48">
                <defs>
                  <linearGradient id="htFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--sample-accent)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--sample-accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 40 L20 34 L40 36 L60 26 L80 30 L100 18 L120 22 L140 12 L160 20 L180 8 L200 14 L200 48 L0 48 Z" fill="url(#htFill)" />
                <path d="M0 40 L20 34 L40 36 L60 26 L80 30 L100 18 L120 22 L140 12 L160 20 L180 8 L200 14" fill="none" stroke="var(--sample-accent)" strokeWidth="1.5" />
              </svg>
              <div className={cn("mt-1.5 flex h-8 items-end gap-1", compact ? "hidden" : "")}>
                {[40, 65, 52, 78, 60, 88, 70, 95, 62, 80, 72, 90].map((h, index) => (
                  <span key={index} className="flex-1 rounded-t-[1px]" style={{ height: `${h}%`, backgroundColor: index >= 10 ? "var(--sample-accent-2)" : "color-mix(in srgb, var(--sample-accent-2) 35%, transparent)" }} />
                ))}
              </div>
            </div>
            <div className={cn("rounded-[4px] border border-[var(--sample-border)] bg-[var(--sample-base)] p-2", compact ? "hidden" : "")}>
              {([["us-east-1", "42ms", "var(--sample-accent)"], ["eu-west-2", "58ms", "var(--sample-accent)"], ["ap-south-1", "120ms", "var(--sample-accent-3)"]] as Array<[string, string, string]>).map(([region, ms, color]) => (
                <div className="flex items-center gap-2 border-b border-[var(--sample-border)] py-1 text-[9px] last:border-b-0" key={region}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-[var(--sample-text)]">{region}</span>
                  <span className="ml-auto tabular-nums text-[var(--sample-muted)]">{ms}</span>
                  <span className="text-[var(--sample-muted)]">healthy</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function AiAestheticStudio({ className, compact = false, style }: Props) {
  const fields = ["AI Characters", "Media & Film", "Robotics", "World Models"];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* full-bleed atmospheric render */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(70% 80% at 60% 30%, rgb(var(--st-accent-2-rgb) / 0.55), transparent 60%), radial-gradient(60% 70% at 18% 85%, rgb(var(--st-accent-rgb) / 0.45), transparent 60%), radial-gradient(50% 60% at 90% 95%, rgb(var(--st-accent-3-rgb) / 0.4), transparent 55%), linear-gradient(160deg, color-mix(in srgb, var(--sample-surface) 80%, #000) 0%, var(--sample-base) 100%)" }}
      />
      {/* faint generative streaks */}
      <span aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(58deg, transparent 0 5px, rgb(var(--st-accent-3-rgb) / 0.35) 5px 6px, transparent 6px 14px)", maskImage: "radial-gradient(50% 50% at 60% 55%, #000, transparent 75%)", WebkitMaskImage: "radial-gradient(50% 50% at 60% 55%, #000, transparent 75%)" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN_URI, backgroundSize: "120px 120px" }} />

      <div className="relative flex h-full flex-col text-[var(--sample-text)]">
        {/* nav */}
        <div className="flex items-center gap-3 text-[10px] font-medium">
          <span className="font-display text-sm font-bold tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>runway</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-text)]/75", compact ? "hidden" : "flex")}>
            <span>Research</span>
            <span>Product</span>
            <span>Company</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius)] bg-[var(--sample-text)] px-3 py-1 font-semibold text-[var(--sample-base)]">Try Runway</span>
        </div>

        {/* headline bottom-left + fields */}
        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={cn("font-display leading-[0.98] tracking-tight", compact ? "text-2xl" : "text-4xl md:text-[3rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Building AI to
              <br />
              simulate the world.
            </h3>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-4 py-1.5 text-[11px] font-bold text-[var(--sample-base)]">
              Get started <IconArrow size={12} />
            </span>
          </div>
          <div className={cn("shrink-0 space-y-1 text-right text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--sample-text)]/70", compact ? "hidden" : "")}>
            {fields.map((field) => (
              <p key={field}>{field}</p>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

const IRIDESCENT = "linear-gradient(110deg, var(--sample-accent), var(--sample-accent-2), var(--sample-accent-3), var(--sample-accent))";

function HologramInterface({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* spectral glow */}
      <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(50% 60% at 75% 15%, rgb(var(--st-accent-rgb) / 0.4), transparent 60%), radial-gradient(50% 60% at 15% 90%, rgb(var(--st-accent-2-rgb) / 0.4), transparent 60%)" }} />
      <div className="relative flex h-full flex-col text-[var(--sample-text)]">
        {/* nav */}
        <div className="flex items-center gap-3 pb-2 text-[10px] font-medium uppercase tracking-[0.12em]">
          <span className="font-display text-sm font-bold tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>PRISM</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Studio</span>
            <span>Lab</span>
            <span>Specs</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius-pill)] border border-white/30 bg-white/10 px-3 py-1 backdrop-blur">Launch</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 items-center gap-3 pt-2", compact ? "grid-cols-[1fr_0.85fr]" : "grid-cols-1 md:grid-cols-[1.05fr_0.95fr]")}>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sample-accent)]">Holographic UI</p>
            <h3
              className={cn("mt-2 font-display uppercase leading-[0.86]", compact ? "text-4xl" : "text-6xl md:text-[4rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", backgroundImage: IRIDESCENT, backgroundSize: "200% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
            >
              Light as
              <br />
              data.
            </h3>
            <span className={cn("mt-4 inline-flex w-fit items-center gap-1.5 rounded-[var(--st-radius-pill)] border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-bold backdrop-blur", compact ? "hidden" : "")} style={{ boxShadow: "0 0 20px rgb(var(--st-accent-rgb) / 0.4)" }}>
              Enter prism <IconArrow size={12} />
            </span>
          </div>

          {/* floating glass panels */}
          <div className="relative min-h-0">
            <div className="absolute inset-x-2 top-2 rounded-[12px] border border-white/25 bg-white/10 p-3 backdrop-blur-md" style={{ boxShadow: "0 8px 30px rgb(var(--st-accent-2-rgb) / 0.3), inset 0 1px 0 rgb(255 255 255 / 0.3)" }}>
              <div className="h-1.5 w-12 rounded-full" style={{ backgroundImage: IRIDESCENT }} />
              <p className="mt-2 font-display text-base font-bold" style={{ fontFamily: "var(--st-font-display)" }}>Spectrum v4</p>
              <p className="text-[9px] text-[var(--sample-muted)]">refraction · realtime</p>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-6 rounded-[6px] border border-white/20" style={{ backgroundImage: IRIDESCENT, opacity: 0.5 + i * 0.2 }} />
                ))}
              </div>
            </div>
            <div className={cn("absolute -bottom-1 right-0 w-2/3 translate-y-2 rounded-[10px] border border-white/20 bg-white/10 p-2 backdrop-blur-md", compact ? "hidden" : "")} style={{ boxShadow: "0 8px 24px rgb(var(--st-accent-rgb) / 0.3)" }}>
              <div className="flex items-center justify-between text-[9px]">
                <span>opacity</span>
                <span className="text-[var(--sample-accent)]">62%</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-white/15">
                <span className="block h-full w-[62%] rounded-full" style={{ backgroundImage: IRIDESCENT }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function ChromecoreStudio({ className, compact = false, style }: Props) {
  const chromeText = {
    backgroundImage: "linear-gradient(180deg, #ffffff 0%, var(--sample-accent-3) 30%, var(--sample-accent) 52%, #ffffff 70%, var(--sample-accent-3) 100%)",
    WebkitBackgroundClip: "text" as const,
    backgroundClip: "text" as const,
    color: "transparent",
  };
  const chromeSurface = "linear-gradient(135deg, #ffffff 0%, var(--sample-accent-3) 30%, var(--sample-accent) 55%, #ffffff 80%, var(--sample-accent) 100%)";

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col text-[var(--sample-text)]">
        {/* nav */}
        <div className="flex items-center gap-3 border-b border-[var(--sample-border)] pb-2 text-[10px] font-bold uppercase tracking-[0.1em]">
          <span className="font-display text-sm tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>CHROME°</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Objects</span>
            <span>Finish</span>
            <span>Studio</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] px-3 py-1 text-[var(--sample-text)]" style={{ backgroundImage: chromeSurface }}>Shop</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 items-center gap-3 pt-3", compact ? "grid-cols-[1fr_0.9fr]" : "grid-cols-1 md:grid-cols-[1.05fr_0.95fr]")}>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sample-accent-2)]">Liquid metal</p>
            <h3
              className={cn("mt-2 font-display uppercase leading-[0.82]", compact ? "text-4xl" : "text-6xl md:text-[4.2rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", ...chromeText }}
            >
              Liquid
              <br />
              metal.
            </h3>
            <span className={cn("mt-4 inline-flex w-fit items-center gap-1.5 rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] px-4 py-2 text-[11px] font-bold uppercase text-[var(--sample-text)]", compact ? "hidden" : "")} style={{ backgroundImage: chromeSurface, boxShadow: "inset 0 1px 0 #ffffff, 0 4px 10px rgb(var(--st-text-rgb) / 0.2)" }}>
              Configure finish
            </span>
          </div>

          {/* chrome blob */}
          <div className="relative grid min-h-0 place-items-center">
            <span
              className="aspect-square w-[78%] max-w-[10rem] rounded-full border border-white"
              style={{ backgroundImage: "radial-gradient(circle at 32% 28%, #ffffff 0%, var(--sample-accent-3) 26%, var(--sample-accent) 52%, #2b2f3a 78%, var(--sample-accent-3) 100%)", boxShadow: "0 14px 30px rgb(var(--st-text-rgb) / 0.35), inset 0 2px 6px #ffffff" }}
            />
            <span className="absolute bottom-1 rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-0.5 text-[9px] font-bold uppercase">Orb 001 · mirror</span>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function MetaverseWorld({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      {/* full-bleed avatar / virtual-world scene */}
      <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(60% 70% at 30% 25%, rgb(var(--st-accent-rgb) / 0.6), transparent 60%), radial-gradient(55% 65% at 82% 35%, rgb(var(--st-accent-2-rgb) / 0.55), transparent 60%), radial-gradient(60% 60% at 70% 100%, rgb(var(--st-accent-3-rgb) / 0.5), transparent 60%), linear-gradient(180deg, var(--sample-surface), var(--sample-base))" }} />
      {/* avatar silhouettes */}
      <span aria-hidden="true" className="absolute bottom-0 left-[6%] h-[62%] w-[26%]" style={{ backgroundImage: "radial-gradient(50% 40% at 50% 22%, rgb(var(--st-accent-rgb) / 0.9), transparent 60%), linear-gradient(180deg, color-mix(in srgb, var(--sample-accent) 70%, #000) 0%, transparent 85%)", clipPath: "polygon(30% 0, 70% 0, 80% 100%, 20% 100%)" }} />
      <span aria-hidden="true" className="absolute bottom-0 right-[8%] h-[70%] w-[28%]" style={{ backgroundImage: "radial-gradient(50% 40% at 50% 20%, rgb(var(--st-accent-2-rgb) / 0.9), transparent 60%), linear-gradient(180deg, color-mix(in srgb, var(--sample-accent-2) 70%, #000) 0%, transparent 85%)", clipPath: "polygon(28% 0, 72% 0, 82% 100%, 18% 100%)" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 -50px 60px -20px rgb(var(--st-base-rgb) / 0.9), inset 0 40px 50px -20px rgb(var(--st-base-rgb) / 0.7)" }} />

      <div className="relative flex h-full flex-col text-[var(--sample-text)]">
        {/* nav */}
        <div className="flex items-center gap-3 text-[10px] font-semibold">
          <span className="flex items-center gap-1.5 font-display text-sm tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>
            <span className="h-3.5 w-3.5 rounded-[5px] bg-[var(--sample-accent)]" /> Decentral
          </span>
          <nav className={cn("items-center gap-3 text-[var(--sample-text)]/80", compact ? "hidden" : "flex")}>
            <span>Explore</span>
            <span>Marketplace</span>
            <span>Create</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius-pill)] border border-white/40 px-3 py-1">Sign in</span>
        </div>

        {/* centered hero */}
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
          <h3
            className={cn("font-display leading-[0.9] tracking-tight", compact ? "text-3xl" : "text-5xl md:text-[3.8rem]")}
            style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", textShadow: "0 2px 20px rgb(var(--st-base-rgb) / 0.8)" }}
          >
            Close the feed.
            <br />
            Come hang out.
          </h3>
          <div className="mt-5 flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-[var(--st-radius-pill)] bg-[var(--sample-accent)] px-4 py-2 text-[11px] font-bold text-white" style={{ boxShadow: "0 0 18px rgb(var(--st-accent-rgb) / 0.6)" }}>
              ▶ Download
            </span>
            <span className={cn("inline-flex items-center rounded-[var(--st-radius-pill)] border border-white/40 px-4 py-2 text-[11px] font-bold", compact ? "hidden" : "")}>
              Get started
            </span>
          </div>
          <p className={cn("mt-3 text-[9px] uppercase tracking-[0.14em] text-[var(--sample-text)]/70", compact ? "hidden" : "")}>✓ Total downloads · +437K</p>
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

  if (style.slug === "bauhaus") {
    return <BauhausSchool {...props} />;
  }

  if (style.slug === "mid-century-modern") {
    return <MidCenturyModernStudio {...props} />;
  }

  if (style.slug === "futurism") {
    return <FuturismVelocity {...props} />;
  }

  if (style.slug === "cyberpunk") {
    return <CyberpunkCity {...props} />;
  }

  if (style.slug === "neon-noir") {
    return <NeonNoirCinema {...props} />;
  }

  if (style.slug === "techwear") {
    return <TechwearSystem {...props} />;
  }

  if (style.slug === "high-tech") {
    return <HighTechDashboard {...props} />;
  }

  if (style.slug === "ai-aesthetic") {
    return <AiAestheticStudio {...props} />;
  }

  if (style.slug === "hologram-style") {
    return <HologramInterface {...props} />;
  }

  if (style.slug === "chromecore") {
    return <ChromecoreStudio {...props} />;
  }

  if (style.slug === "metaverse-style") {
    return <MetaverseWorld {...props} />;
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
