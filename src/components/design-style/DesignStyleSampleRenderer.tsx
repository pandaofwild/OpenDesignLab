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

const GENERATED_STYLE_IMAGES = {
  "anti-design": "/generated/design-styles/anti-design.webp",
  "art-deco": "/generated/design-styles/art-deco.webp",
  "avant-garde": "/generated/design-styles/avant-garde.webp",
  baroque: "/generated/design-styles/baroque.webp",
  brutalism: "/generated/design-styles/brutalism.webp",
  classic: "/generated/design-styles/classic.webp",
  deconstructivism: "/generated/design-styles/deconstructivism.webp",
  "glitch-art": "/generated/design-styles/glitch-art.webp",
  "high-end-minimal": "/generated/design-styles/high-end-minimal.webp",
  japandi: "/generated/design-styles/japandi.webp",
  luxury: "/generated/design-styles/luxury.webp",
  maximalism: "/generated/design-styles/maximalism.webp",
  "new-brutalism": "/generated/design-styles/new-brutalism.webp",
  neoclassic: "/generated/design-styles/neoclassic.webp",
  "old-money": "/generated/design-styles/old-money.webp",
  postmodernism: "/generated/design-styles/postmodernism.webp",
  rococo: "/generated/design-styles/rococo.webp",
  scandinavian: "/generated/design-styles/scandinavian.webp",
  "soft-minimal": "/generated/design-styles/soft-minimal.webp",
  "warm-minimal": "/generated/design-styles/warm-minimal.webp",
} as const;

type GeneratedStyleImageSlug = keyof typeof GENERATED_STYLE_IMAGES;

function GeneratedStyleImageSurface({
  children,
  className,
  overlay = "warm",
  position = "center",
  slug,
  style,
}: {
  children?: ReactNode;
  className?: string;
  overlay?: "dark" | "none" | "soft" | "warm";
  position?: string;
  slug: GeneratedStyleImageSlug;
  style?: CSSProperties;
}) {
  const overlayImage = {
    dark: "linear-gradient(180deg, rgb(var(--st-text-rgb) / 0.02), rgb(var(--st-text-rgb) / 0.22))",
    none: "linear-gradient(transparent, transparent)",
    soft: "linear-gradient(180deg, rgb(var(--st-surface-rgb) / 0.2), rgb(var(--st-surface-rgb) / 0.04))",
    warm: "linear-gradient(180deg, rgb(var(--st-base-rgb) / 0.02), rgb(var(--st-text-rgb) / 0.16))",
  }[overlay];

  return (
    <div
      className={cn("relative overflow-hidden bg-[var(--sample-surface)]", className)}
      style={{
        backgroundImage: `${overlayImage}, url('${GENERATED_STYLE_IMAGES[slug]}')`,
        backgroundPosition: position,
        backgroundSize: "cover",
        ...style,
      }}
    >
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
  const products: Array<[string, string, string]> = [
    ["Oak lounge chair", "$420", "38% 56%"],
    ["Paper shade lamp", "$148", "66% 38%"],
    ["Ceramic set", "$76", "82% 58%"],
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
          <GeneratedStyleImageSurface className="rounded-[var(--st-radius)]" overlay="warm" position="42% 56%" slug="scandinavian" style={{ boxShadow: "var(--st-shadow)" }}>
            <div className="flex h-full flex-col justify-between p-4">
              <span className="self-start rounded-[var(--st-radius-pill)] bg-[rgb(var(--st-base-rgb)/0.86)] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--sample-text)] backdrop-blur-[1px]">
                Spring home edit
              </span>
              <div className="max-w-[20ch]">
                <h3
                  className={cn("rounded-[var(--st-radius)] bg-[rgb(var(--st-base-rgb)/0.72)] p-2 font-display leading-[1.0] text-[var(--sample-text)] backdrop-blur-[1px]", compact ? "text-2xl" : "text-3xl md:text-[2.6rem]")}
                  style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
                >
                  Bright rooms, useful objects.
                </h3>
                <span className={cn("mt-3 inline-flex h-8 items-center gap-1.5 rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-4 text-[11px] font-medium text-[var(--sample-base)]", compact ? "hidden" : "")}>
                  Shop the edit <IconArrow size={12} />
                </span>
              </div>
            </div>
          </GeneratedStyleImageSurface>

          <div className="grid min-h-0 min-w-0 grid-cols-3 gap-2.5">
            {products.map(([name, price, position], index) => (
              <div className="flex min-w-0 flex-col" key={name}>
                <GeneratedStyleImageSurface className="flex-1 rounded-[var(--st-radius)]" overlay="soft" position={position} slug="scandinavian">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-3 h-7 rounded-[var(--st-radius-pill)] bg-[rgb(var(--st-base-rgb)/0.72)]"
                    style={{ boxShadow: "0 10px 24px rgb(var(--st-text-rgb) / 0.10)" }}
                  />
                  {index === 0 ? (
                    <span aria-hidden="true" className="absolute bottom-7 left-1/2 h-14 w-12 -translate-x-1/2 rounded-t-[9999px] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.74)]" />
                  ) : index === 1 ? (
                    <span aria-hidden="true" className="absolute bottom-8 left-1/2 h-16 w-10 -translate-x-1/2 rounded-t-[9999px] bg-[rgb(var(--st-accent-3-rgb)/0.42)]" />
                  ) : (
                    <span aria-hidden="true" className="absolute bottom-8 left-1/2 h-11 w-14 -translate-x-1/2 rounded-[9999px] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.74)]" />
                  )}
                  <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-[rgb(var(--st-base-rgb)/0.86)] text-[var(--sample-text)]">
                    <IconBag size={12} />
                  </span>
                  {index === 0 ? (
                    <span className="absolute left-2 top-2 rounded-[var(--st-radius-pill)] bg-[var(--sample-accent)] px-2 py-0.5 text-[9px] font-bold text-[var(--sample-text)]">New</span>
                  ) : null}
                </GeneratedStyleImageSurface>
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

          <div className="grid min-h-0 grid-cols-[1.16fr_0.84fr] gap-3">
            <div className="relative min-h-0 overflow-hidden border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2">
              <GeneratedStyleImageSurface className="h-full min-h-0" overlay="soft" position="38% 56%" slug="japandi">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-2 left-2 w-[30%] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-base-rgb)/0.78)] backdrop-blur-[1px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent 0 calc(50% - 1px), var(--sample-border-soft) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)), linear-gradient(0deg, transparent 0 calc(33.333% - 1px), var(--sample-border-soft) calc(33.333% - 1px) calc(33.333% + 1px), transparent calc(33.333% + 1px) calc(66.666% - 1px), var(--sample-border-soft) calc(66.666% - 1px) calc(66.666% + 1px), transparent calc(66.666% + 1px))",
                  }}
                />
                <span aria-hidden="true" className="absolute bottom-8 left-[34%] h-2 w-[44%] bg-[var(--sample-accent)]/42" />
                <span aria-hidden="true" className="absolute bottom-5 left-[38%] h-5 w-[36%] border-t border-[var(--sample-border-soft)] bg-[var(--sample-base)]/72" />
                <span className="absolute bottom-2.5 left-2.5 text-[9px] uppercase tracking-[0.14em] text-[var(--sample-text)]">
                  <span className="bg-[rgb(var(--st-base-rgb)/0.72)] px-1.5 py-0.5 backdrop-blur-[1px]">Azabu Residence · Tokyo</span>
                </span>
              </GeneratedStyleImageSurface>
            </div>

            <div className="grid min-h-0 grid-rows-[1fr_0.92fr] gap-3">
              <div
                className="relative overflow-hidden border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.58)]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent 0 calc(25% - 1px), var(--sample-border-soft) calc(25% - 1px) calc(25% + 1px), transparent calc(25% + 1px) calc(50% - 1px), var(--sample-border-soft) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px) calc(75% - 1px), var(--sample-border-soft) calc(75% - 1px) calc(75% + 1px), transparent calc(75% + 1px)), linear-gradient(0deg, transparent 0 calc(50% - 1px), var(--sample-border-soft) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px))",
                }}
              >
                <span aria-hidden="true" className="absolute bottom-5 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-[var(--sample-accent-3)]/36" />
                <span aria-hidden="true" className="absolute bottom-4 left-[calc(50%-1.75rem)] h-1.5 w-14 bg-[var(--sample-accent)]/38" />
                <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.18em] text-[var(--sample-muted)]">Shoji light</span>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-2 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-base-rgb)/0.54)] p-2">
                <div className="flex h-full w-5 flex-col gap-1">
                  {["var(--sample-accent)", "var(--sample-accent-2)", "var(--sample-accent-3)", "var(--sample-surface)"].map((color) => (
                    <span className="flex-1" key={color} style={{ backgroundColor: color }} />
                  ))}
                </div>
                <div className="relative min-h-0 overflow-hidden">
                  <GeneratedStyleImageSurface className="h-full min-h-0" overlay="soft" position="78% 72%" slug="japandi" />
                  <span className="absolute bottom-2 left-2 bg-[rgb(var(--st-base-rgb)/0.72)] px-1.5 py-0.5 text-[9px] text-[var(--sample-text)] backdrop-blur-[1px]">
                    Material study
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function WarmMinimalStudio({ className, compact = false, style }: Props) {
  const works: Array<[string, string, string]> = [
    ["Linnea Apartment", "Residential · 2025", "30% 58%"],
    ["Material board", "Studio · 2025", "64% 42%"],
    ["Terracotta edit", "Objects · 2024", "78% 60%"],
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
          <GeneratedStyleImageSurface className="rounded-[var(--st-radius)]" overlay="warm" position="40% 58%" slug="warm-minimal" style={{ boxShadow: "var(--st-shadow)" }}>
            <div className="flex h-full flex-col justify-between p-4">
              <span className="self-start bg-[rgb(var(--st-base-rgb)/0.74)] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--sample-text)]/70 backdrop-blur-[1px]">Selected works · 2025</span>
              <div>
                <h3
                  className={cn("w-fit rounded-[var(--st-radius)] bg-[rgb(var(--st-base-rgb)/0.70)] p-2 font-display leading-[1.02] text-[var(--sample-text)] backdrop-blur-[1px]", compact ? "text-2xl" : "text-3xl md:text-[2.7rem]")}
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
          </GeneratedStyleImageSurface>

          <div className="grid min-w-0 grid-rows-3 gap-2.5">
            {works.map(([name, meta, position], index) => (
              <div
                className="grid grid-cols-[3.6rem_1fr_auto] items-center gap-3 overflow-hidden rounded-[var(--st-radius)] bg-[var(--sample-surface)] p-2"
                key={name}
                style={{
                  borderRadius: index === 0 ? "9999px 22px 22px 9999px" : "var(--st-radius)",
                  boxShadow: "var(--st-shadow)",
                }}
              >
                <GeneratedStyleImageSurface
                  className="aspect-square"
                  overlay="soft"
                  position={position}
                  slug="warm-minimal"
                  style={{
                    borderRadius: index === 0 ? "50%" : index === 1 ? "9999px 9999px 14px 14px" : "38% 62% 44% 56%",
                  }}
                />
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
            <GeneratedStyleImageSurface
              className="rounded-[calc(var(--st-radius)+2px)]"
              overlay="soft"
              position="58% 54%"
              slug="soft-minimal"
              style={{ borderRadius: "28px", boxShadow: "var(--st-shadow)" }}
            >
              <div className="absolute left-3 top-3 max-w-[52%] rounded-[26px] bg-[rgb(var(--st-base-rgb)/0.78)] p-3 text-[var(--sample-text)] backdrop-blur-[1px]">
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--sample-muted)]">Session pace</p>
                <p className="mt-1 text-[12px] leading-5">One clear question at a time.</p>
              </div>
              <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-[var(--sample-text)]">
                <span className="rounded-[var(--st-radius-pill)] bg-[rgb(var(--st-base-rgb)/0.82)] px-2.5 py-1 font-medium backdrop-blur-[1px]">Calm by design</span>
                <span className="rounded-[var(--st-radius-pill)] bg-[rgb(var(--st-base-rgb)/0.82)] px-2.5 py-1 backdrop-blur-[1px]">4.9 / 5</span>
              </span>
            </GeneratedStyleImageSurface>
            <div className="grid gap-2">
              {services.map(([service, meta], index) => (
                <div className="grid grid-cols-[auto_1fr_auto] items-center rounded-[var(--st-radius-pill)] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-3 py-2" key={service} style={{ boxShadow: "var(--st-shadow)" }}>
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
            <GeneratedStyleImageSurface className="min-h-0" overlay="soft" position="44% 58%" slug="high-end-minimal">
              <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.24em] text-[var(--sample-text)]/55">Editorial</span>
              <span className="absolute right-3 top-3 text-[9px] uppercase tracking-[0.24em] text-[var(--sample-text)]/45">FW / 04</span>
            </GeneratedStyleImageSurface>
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
            <GeneratedStyleImageSurface className="h-24 border-2 border-[var(--sample-border)]" overlay="soft" position="50% 52%" slug="brutalism" style={{ filter: "grayscale(1) contrast(1.08)" }}>
              <span className="absolute bottom-1.5 left-1.5 bg-[var(--sample-base)] px-1.5 py-0.5 text-[8px] font-bold uppercase text-[var(--sample-text)]">
                image_04.gif
              </span>
            </GeneratedStyleImageSurface>
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
          <span className="font-display text-sm font-black tracking-tight">RAW COMPONENT KIT</span>
          <nav className={cn("ml-3 items-center gap-3 text-[11px] font-black", compact ? "hidden" : "flex")}>
            <span>native form controls</span>
            <span>pricing table</span>
            <span>Buttons</span>
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
              A component kit where buttons, tables, inputs and native form controls stay loud and obvious.
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
            {/* component sheet */}
            <GeneratedStyleImageSurface className={cn("min-h-0 bg-[var(--sample-accent-3)]", box)} overlay="none" position="50% 50%" slug="new-brutalism" style={{ boxShadow: "6px 6px 0 var(--sample-border)" }}>
              <div className="absolute inset-x-2 top-2 flex items-center justify-between gap-2">
                <span className={cn("bg-[var(--sample-surface)] px-2 py-1 text-[9px] font-black uppercase", box)}>
                  native form controls
                </span>
                <span className={cn("bg-[var(--sample-accent)] px-2 py-1 text-[9px] font-black", box)}>v2</span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 grid gap-1.5 text-[9px] font-black">
                <label className={cn("flex items-center justify-between bg-[var(--sample-surface)] px-2 py-1", box)}>
                  <span>checkbox</span>
                  <span className="grid h-4 w-4 place-items-center border-2 border-[var(--sample-border)] bg-[var(--sample-accent)]">✓</span>
                </label>
                <div className={cn("flex items-center justify-between bg-white px-2 py-1", box)}>
                  <span>select</span>
                  <span>Default ▾</span>
                </div>
              </div>
            </GeneratedStyleImageSurface>

            {/* pricing table + raw controls */}
            <div className={cn("grid grid-cols-2 gap-3", compact ? "hidden" : "")}>
              <div className={cn("bg-[var(--sample-accent)] p-3", box)} style={{ boxShadow: "5px 5px 0 var(--sample-border)" }}>
                <p className="text-[10px] font-black uppercase">pricing table</p>
                <div className="mt-2 grid gap-1 text-[9px] font-black">
                  {["Free $0", "Team $19", "Pro $49"].map((row) => (
                    <span className={cn("flex justify-between bg-[var(--sample-surface)] px-2 py-1", box)} key={row}>
                      <span>{row.split(" ")[0]}</span>
                      <span>{row.split(" ")[1]}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className={cn("flex flex-col justify-between bg-[var(--sample-accent-2)] p-3", box)} style={{ boxShadow: "5px 5px 0 var(--sample-border)" }}>
                <p className="text-[10px] font-black uppercase">button stack</p>
                <button className={cn("w-full bg-[var(--sample-text)] px-2 py-1 text-left text-[10px] font-black uppercase text-[var(--sample-base)]", box)} type="button">Submit form</button>
                <button className={cn("w-full bg-[var(--sample-surface)] px-2 py-1 text-left text-[10px] font-black uppercase", box)} type="button">Cancel</button>
                <p className="flex items-center gap-1 text-[10px] font-black">
                  <IconStar size={9} /> obvious states
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
        <div className={cn("relative grid min-h-0 flex-1 auto-rows-fr gap-1.5 overflow-hidden border-x-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-1.5", compact ? "grid-cols-3" : "grid-cols-4")}>
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 h-full w-full text-[var(--sample-accent)]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={compact ? 2 : 2.5} viewBox="0 0 420 280">
            <path d="M22 236 C 80 186 130 264 196 202 S 320 184 392 110" />
            <path d="M300 24 344 58 396 44" />
            <path d="M42 44 76 20 118 30" />
          </svg>
          <span aria-hidden="true" className="pointer-events-none absolute -left-8 top-20 z-10 h-24 w-36 rotate-[-18deg] bg-[var(--sample-accent-2)] opacity-80" style={{ clipPath: "polygon(12% 0, 100% 18%, 78% 100%, 0 74%)" }} />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-10 right-8 z-10 h-20 w-20 rounded-full bg-[var(--sample-accent-3)] opacity-80 mix-blend-multiply" />
          {/* big quote block */}
          <div
            className="relative z-30 col-span-2 row-span-2 flex flex-col justify-between border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2.5 text-[var(--sample-accent)]"
            style={{ clipPath: "polygon(0 9%, 93% 0, 100% 82%, 68% 100%, 4% 92%)", transform: "rotate(-1.5deg)" }}
          >
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
          <div
            className="relative z-30 border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-2 text-[10px]"
            style={{ clipPath: "polygon(6% 0, 100% 0, 92% 100%, 0 82%)", transform: "rotate(2deg)" }}
          >
            <span className="text-[8px] uppercase text-[var(--sample-muted)]">link</span>
            <p className="mt-1 break-all underline" style={{ color: "#0000EE" }}>↗ thehtml.review</p>
          </div>
          {/* anti-design media block */}
          <GeneratedStyleImageSurface
            className="relative z-30 row-span-2 border-2 border-[var(--sample-accent-3)]"
            overlay="none"
            position="50% 52%"
            slug="anti-design"
            style={{ clipPath: "polygon(14% 0, 100% 8%, 88% 100%, 0 88%)", filter: "contrast(1.08) saturate(1.05)", transform: "rotate(-2deg)" }}
          />
          {/* select block (raw UI) */}
          <div className={cn("relative z-30 border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-2 text-[9px]", compact ? "hidden" : "")}>
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
          <div
            className="relative z-30 grid place-items-center border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] text-lg font-black text-[var(--sample-surface)]"
            style={{ borderRadius: "50% 42% 58% 36%", transform: "rotate(9deg)" }}
          >
            ?
          </div>
          {/* cyan outline block */}
          <div
            className="relative z-30 border-2 border-[var(--sample-accent-2)] bg-[var(--sample-base)] p-2 text-[9px] text-[var(--sample-text)]"
            style={{ clipPath: "polygon(0 0, 88% 10%, 100% 100%, 14% 86%)", transform: "rotate(-4deg)" }}
          >
            <span className="uppercase" style={{ color: "#0000EE" }}>block 04</span>
            <p className="mt-1 leading-tight">untitled.gif</p>
          </div>
          {/* green note block */}
          <div
            className={cn("relative z-30 border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] p-2 text-[9px] font-bold text-[var(--sample-surface)]", compact ? "hidden" : "")}
            style={{ clipPath: "polygon(4% 18%, 100% 0, 94% 84%, 36% 100%, 0 72%)", transform: "rotate(3deg)" }}
          >
            <span className="uppercase">note</span>
            <p className="mt-1 leading-tight">connect anything →</p>
          </div>
          {/* dotted image block */}
          <div
            className={cn("relative z-30 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]", compact ? "hidden" : "")}
            style={{ backgroundImage: "radial-gradient(circle at 6px 6px, var(--sample-accent-2) 0 2px, transparent 3px)", backgroundSize: "12px 12px", borderRadius: "44% 56% 42% 58%", transform: "rotate(-8deg)" }}
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

/** Bold repeating prints used to fill maximalist tiles. */
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

function MaximalistPatternMarket({ className, compact = false, style }: Props) {
  const products: Array<[string, string, CSSProperties]> = [
    ["Garden Set", "$188", MAXI_FLORAL],
    ["Silk Scarf", "$64", MAXI_STRIPE],
    ["Market Tote", "$92", {
      backgroundColor: "var(--sample-accent-2)",
      backgroundImage:
        "radial-gradient(circle at 18px 14px, var(--sample-accent-3) 0 7px, transparent 8px)," +
        "radial-gradient(circle at 40px 34px, var(--sample-accent) 0 8px, transparent 9px)," +
        "linear-gradient(135deg, transparent 0 48%, rgb(var(--st-surface-rgb) / 0.35) 48% 56%, transparent 56% 100%)",
      backgroundSize: "56px 56px",
    }],
  ];
  const collectionBadges = ["Prints", "Resort", "Objects"];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="absolute inset-0 opacity-[0.42]" style={{ backgroundImage: "radial-gradient(circle at 20px 18px, var(--sample-accent) 0 5px, transparent 6px), radial-gradient(circle at 48px 46px, var(--sample-accent-2) 0 6px, transparent 7px)", backgroundSize: "72px 72px" }} />
      <span aria-hidden="true" className="absolute -right-12 top-8 h-36 w-36 rounded-full border-[24px] border-[var(--sample-accent-3)] opacity-90" />
      <span aria-hidden="true" className="absolute -bottom-10 left-6 h-36 w-56 rotate-[-8deg]" style={MAXI_STRIPE} />

      <div className="relative z-10 flex h-full flex-col gap-3">
        <div className="flex items-center gap-2 border-2 border-[var(--sample-surface)] bg-[var(--sample-base)]/86 px-2 py-1.5 text-[9px] font-black uppercase text-[var(--sample-surface)]" style={{ boxShadow: "4px 4px 0 var(--sample-accent)" }}>
          <span className="grid h-6 w-6 place-items-center border-2 border-[var(--sample-surface)] bg-[var(--sample-accent)] text-[var(--sample-surface)]">
            <IconStar size={10} />
          </span>
          <span className="font-display text-sm leading-none" style={{ fontFamily: "var(--st-font-display)" }}>Pattern Market</span>
          <nav className={cn("ml-2 items-center gap-3", compact ? "hidden" : "flex")}>
            <span>New</span>
            <span>Prints</span>
            <span>Stories</span>
          </nav>
          <span className="ml-auto bg-[var(--sample-accent-3)] px-2 py-1 text-[var(--sample-base)]">Bag 04</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3", compact ? "grid-cols-[1.05fr_0.95fr]" : "grid-cols-1 md:grid-cols-[1.15fr_0.85fr] md:gap-4")}>
          <GeneratedStyleImageSurface
            className="relative min-h-0 border-[3px] border-[var(--sample-surface)]"
            overlay="none"
            position="50% 52%"
            slug="maximalism"
            style={{ boxShadow: "7px 7px 0 rgb(0 0 0 / 0.32)" }}
          >
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgb(var(--st-text-rgb) / 0.05), rgb(var(--st-text-rgb) / 0.32))" }} />
            <div className="absolute left-3 top-3 max-w-[58%] border-2 border-[var(--sample-surface)] bg-[var(--sample-base)]/88 p-2 text-[var(--sample-surface)]" style={{ boxShadow: "4px 4px 0 var(--sample-accent-2)" }}>
              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[var(--sample-accent-3)]">New collection</p>
              <h3
                className={cn("mt-1 font-display uppercase leading-[0.84]", compact ? "text-2xl" : "text-4xl md:text-5xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                More is a system
              </h3>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="bg-[var(--sample-accent)] px-3 py-1.5 text-[10px] font-black uppercase text-[var(--sample-surface)]">Shop the edit</span>
              <span className={cn("border-2 border-[var(--sample-surface)] bg-[var(--sample-accent-3)] px-2 py-1 text-[9px] font-black uppercase text-[var(--sample-base)]", compact ? "hidden" : "")}>42 looks</span>
            </div>
            <IconStar className="absolute right-3 top-4 text-[var(--sample-accent-3)]" size={compact ? 18 : 24} />
          </GeneratedStyleImageSurface>

          <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-2.5">
            <div className="border-[3px] border-[var(--sample-surface)] bg-[var(--sample-accent-3)] p-2 text-[var(--sample-base)]" style={{ boxShadow: "4px 4px 0 rgb(0 0 0 / 0.28)" }}>
              <p className="text-[8px] font-black uppercase tracking-[0.14em]">Campaign rule</p>
              <p className={cn("mt-1 font-display font-black uppercase leading-[0.9]", compact ? "text-lg" : "text-2xl")} style={{ fontFamily: "var(--st-font-display)" }}>
                Pattern first, product clear.
              </p>
            </div>

            <div className="grid min-h-0 grid-cols-3 gap-2">
              {products.map(([name, price, pattern], index) => (
                <div className={cn("flex min-w-0 flex-col border-2 border-[var(--sample-surface)] bg-[var(--sample-base)] p-1.5 text-[var(--sample-surface)]", compact && index === 2 ? "hidden" : "")} key={name} style={{ boxShadow: "3px 3px 0 var(--sample-accent)" }}>
                  <span className="block flex-1 min-h-[56px] border-2 border-[var(--sample-surface)]" style={pattern} />
                  <p className="mt-1.5 truncate text-[9px] font-black uppercase leading-tight">{name}</p>
                  <p className="text-[8px] font-bold text-[var(--sample-accent-3)]">{price}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {collectionBadges.map((label, index) => (
                <span
                  className={cn("grid min-h-10 place-items-center border-2 border-[var(--sample-surface)] px-1.5 text-center text-[8px] font-black uppercase text-[var(--sample-surface)]", compact && index === 2 ? "hidden" : "")}
                  key={label}
                  style={{ backgroundColor: index === 0 ? "var(--sample-accent)" : index === 1 ? "var(--sample-accent-2)" : "var(--sample-base)", boxShadow: "2px 2px 0 rgb(0 0 0 / 0.25)" }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.1] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "120px 120px" }}
      />
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
  const faultRows: Array<[string, string, string]> = [
    ["checksum drift", "0x4F2A", style.palette.accent],
    ["codec fault", "H264-B", style.palette.accent2],
    ["buffer tear", "12ms", style.palette.accent3],
  ];
  const macroBlocks = Array.from({ length: 18 }, (_, index) => index);

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span aria-hidden="true" className="absolute inset-0 opacity-45" style={{ backgroundImage: "linear-gradient(90deg, rgb(var(--st-accent-rgb) / 0.18) 0 1px, transparent 1px), linear-gradient(180deg, rgb(var(--st-accent-2-rgb) / 0.14) 0 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgb(0 0 0 / 0.62) 2px 3px)" }} />

      <div className="relative flex h-full flex-col font-mono">
        <div className="flex items-center gap-3 border-b border-[var(--sample-border)] pb-2 text-[10px] text-[var(--sample-muted)]">
          <span className="font-bold uppercase tracking-[0em] text-[var(--sample-text)]">
            SIGNAL DAMAGE
          </span>
          <nav className={cn("items-center gap-3 uppercase", compact ? "hidden" : "flex")}>
            <span>checksum drift</span>
            <span>macroblock map</span>
            <span>codec fault</span>
          </nav>
          <span className="ml-auto border border-[var(--sample-accent)] px-2.5 py-1 font-bold uppercase text-[var(--sample-accent)]">capture 03</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[0.95fr_1.05fr]" : "grid-cols-1 md:grid-cols-[0.94fr_1.06fr] md:gap-4")}>
          <div className="flex min-w-0 flex-col justify-center">
            <span className="w-max border border-[var(--sample-accent-2)] px-2 py-0.5 text-[9px] uppercase tracking-[0em] text-[var(--sample-accent-2)]">
              frame dropped / 00:13:42
            </span>
            <h3
              className={cn("mt-3 font-display uppercase leading-[0.82]", compact ? "text-3xl" : "text-6xl md:text-[4.25rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0em" }}
            >
              <GlitchHeading text="SIGNAL" />
              <br />
              <GlitchHeading text="DAMAGE" />
            </h3>
            <p className={cn("text-[var(--sample-muted)]", compact ? "mt-2 line-clamp-2 text-[10px] leading-4" : "mt-4 max-w-[34ch] text-[12px] leading-5")}>
              Corrupted signal analysis for broken video frames, dropped packets, and decoded image residue.
            </p>
            <div className={cn("mt-5 grid gap-1.5", compact ? "hidden" : "")}>
              {faultRows.map(([label, value, color]) => (
                <div className="flex items-center justify-between border border-[var(--sample-border)] bg-[var(--sample-surface)] px-2.5 py-1.5 text-[9px] uppercase" key={label}>
                  <span style={{ color }}>{label}</span>
                  <span className="font-bold text-[var(--sample-text)]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-0 overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)]">
            <span aria-hidden="true" className="absolute left-0 top-[22%] h-2.5 w-3/4 translate-x-[-18px] bg-[var(--sample-accent)] opacity-60 mix-blend-screen" />
            <span aria-hidden="true" className="absolute right-0 top-[38%] h-1.5 w-1/2 translate-x-3 bg-[var(--sample-accent-2)] opacity-60 mix-blend-screen" />
            <span aria-hidden="true" className="absolute left-[16%] top-[64%] h-5 w-[64%] bg-[var(--sample-accent-3)] opacity-35 mix-blend-screen" />
            <div className="relative grid h-full grid-cols-6 grid-rows-3 gap-1 p-3">
              {macroBlocks.map((item) => (
                <span
                  aria-hidden="true"
                  className={cn("border border-[var(--sample-border)]", item % 5 === 0 ? "bg-[var(--sample-accent)]" : item % 4 === 0 ? "bg-[var(--sample-accent-2)]" : "bg-[rgb(var(--st-text-rgb)/0.09)]")}
                  key={item}
                  style={{
                    opacity: item % 5 === 0 ? 0.55 : item % 4 === 0 ? 0.42 : 0.8,
                    transform: `translate(${item % 3 === 0 ? -3 : item % 3 === 1 ? 2 : 0}px, ${item % 4 === 0 ? 3 : 0}px)`,
                  }}
                />
              ))}
            </div>
            <div className="absolute bottom-3 left-3 right-3 border border-[var(--sample-accent)] bg-[rgb(var(--st-base-rgb)/0.82)] p-2 text-[9px] uppercase text-[var(--sample-text)]">
              <div className="flex items-center justify-between">
                <span className="text-[var(--sample-accent)]">macroblock map</span>
                <span className="text-[var(--sample-accent-2)]">bad sectors 18</span>
              </div>
              <div className="mt-1 h-1.5 bg-[rgb(var(--st-text-rgb)/0.12)]">
                <span className="block h-full w-[61%] bg-[var(--sample-accent-3)]" />
              </div>
              <p className="mt-1 text-[8px] text-[var(--sample-muted)]">luma plane misread / chroma channel late</p>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgb(0 0 0 / 0.5) 2px 3px)" }}
            />
          </div>
        </div>
      </div>

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
      <GeneratedStyleImageSurface className="absolute inset-0" overlay="soft" position="50% 45%" slug="deconstructivism" style={{ filter: "contrast(1.08)" }} />
      <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgb(var(--st-base-rgb) / 0.08) 0%, rgb(var(--st-base-rgb) / 0.32) 45%, rgb(var(--st-base-rgb) / 0.82) 100%)" }} />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundImage: "linear-gradient(120deg, rgb(var(--st-text-rgb) / 0.22) 0%, rgb(var(--st-accent-3-rgb) / 0.34) 100%)", clipPath: "polygon(40% 40%, 100% 64%, 100% 100%, 18% 100%)" }} />
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
            <GeneratedStyleImageSurface className="h-full w-full" overlay="soft" position="50% 48%" slug="deconstructivism">
              <span className="absolute bottom-1.5 left-2 bg-[var(--sample-base)]/75 px-1.5 py-0.5 text-[8px] font-bold uppercase text-[var(--sample-text)]">Phaeno · Wolfsburg</span>
            </GeneratedStyleImageSurface>
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
            <GeneratedStyleImageSurface className="h-full w-full" overlay="dark" position="48% 46%" slug="avant-garde" />
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

function PostmodernArchivePortal({ className, compact = false, style }: Props) {
  const modules: Array<[string, string, CSSProperties]> = [
    ["ironic object index", "edition 04", { backgroundColor: "var(--sample-surface)", backgroundImage: "radial-gradient(circle at 72% 30%, var(--sample-accent-3) 0 11px, transparent 12px), linear-gradient(90deg, var(--sample-accent) 0 14px, transparent 14px 100%)" }],
    ["culture collage", "essay room", { backgroundColor: "var(--sample-accent-2)", backgroundImage: "linear-gradient(135deg, rgb(var(--st-surface-rgb) / 0.7) 0 24%, transparent 24% 100%), repeating-linear-gradient(90deg, transparent 0 8px, rgb(var(--st-surface-rgb) / 0.45) 8px 10px)" }],
    ["pop object shelf", "shop note", { backgroundColor: "var(--sample-base)", backgroundImage: "linear-gradient(90deg, transparent 0 46%, var(--sample-accent-3) 46% 56%, transparent 56% 100%), radial-gradient(circle at 18% 72%, var(--sample-accent-2) 0 9px, transparent 10px)" }],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span aria-hidden="true" className="absolute inset-0 opacity-[0.24]" style={{ backgroundImage: "linear-gradient(90deg, var(--sample-border-soft) 1px, transparent 1px), linear-gradient(0deg, var(--sample-border-soft) 1px, transparent 1px)", backgroundSize: "54px 54px" }} />
      <span aria-hidden="true" className="absolute -left-8 bottom-6 h-36 w-36 rounded-full border-[18px] border-[var(--sample-accent-2)] opacity-80" />
      <span aria-hidden="true" className="absolute right-5 top-14 h-28 w-5 rotate-[21deg] bg-[var(--sample-accent)]" />
      <span aria-hidden="true" className="absolute left-[46%] top-4 h-8 w-8 rotate-45 border border-[var(--sample-border)] bg-[var(--sample-accent-3)]" />
      <span aria-hidden="true" className="absolute left-[8%] top-[28%] h-28 w-16 border border-[var(--sample-border)] bg-[var(--sample-surface)]" style={{ clipPath: "polygon(18% 0, 82% 0, 82% 12%, 70% 12%, 70% 100%, 30% 100%, 30% 12%, 18% 12%)" }} />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-3 text-xs font-black uppercase">
          <span className="border border-[var(--sample-border)] bg-[var(--sample-surface)] px-2.5 py-1 font-serif">CLASSICAL QUOTE</span>
          <nav className={cn("items-center gap-3 text-[10px]", compact ? "hidden" : "flex")}>
            <span>culture collage</span>
            <span style={{ color: "var(--sample-accent)" }}>Objects</span>
            <span>Essays</span>
          </nav>
          <span className="ml-auto grid h-6 w-6 place-items-center border border-[var(--sample-border)] bg-[var(--sample-accent)] text-[10px]">04</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1.08fr_0.92fr]" : "grid-cols-1 md:grid-cols-[1.08fr_0.92fr] md:gap-4")}>
          <div
            className="relative flex min-w-0 flex-col justify-between overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3.5"
            style={{
              backgroundImage: `linear-gradient(180deg, rgb(var(--st-surface-rgb) / 0.54), rgb(var(--st-surface-rgb) / 0.24)), url('${GENERATED_STYLE_IMAGES.postmodernism}')`,
              backgroundPosition: "50% 52%",
              backgroundSize: "cover",
              boxShadow: "9px 11px 0 rgb(var(--st-accent-2-rgb) / 0.32)",
            }}
          >
            <span className="w-fit border border-[var(--sample-border)] bg-[var(--sample-accent)] px-2.5 py-0.5 text-[10px] font-black uppercase">ironic object index</span>
            <h3
              className={cn("max-w-[10ch] font-serif leading-[0.86]", compact ? "text-3xl" : "text-5xl md:text-[3.4rem]")}
              style={{ textShadow: "0 2px 14px rgb(255 253 246 / 0.78)" }}
            >
              Past forms
              <br />
              misbehave.
            </h3>
            <div className={cn("flex items-end justify-between gap-3", compact ? "hidden" : "")}>
              <p className="max-w-[12rem] border border-[var(--sample-border)] bg-[var(--sample-surface)] px-2.5 py-2 text-[10px] font-bold leading-4">
                A museum label, a shop shelf, and a pop joke share the same page.
              </p>
              <span className="h-8 w-8 border border-[var(--sample-border)] bg-[var(--sample-accent-3)]" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
            </div>
          </div>

          <div className="grid min-h-0 grid-rows-[auto_1fr] gap-2.5">
            <div className="border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3" style={{ boxShadow: "6px 7px 0 rgb(var(--st-accent-rgb) / 0.26)" }}>
              <p className="text-[9px] font-black uppercase tracking-[0.14em]" style={{ color: "var(--sample-accent)" }}>Notes on style</p>
              <p className={cn("mt-1 font-serif text-[18px] font-bold leading-[0.95]", compact ? "line-clamp-2" : "")}>Quotation becomes navigation.</p>
            </div>

            <div className="grid min-h-0 grid-cols-1 gap-2">
              {modules.map(([name, meta, pattern], index) => (
                <div className={cn("grid min-h-0 grid-cols-[64px_minmax(0,1fr)] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-1.5", compact && index === 2 ? "hidden" : "")} style={{ boxShadow: "4px 5px 0 rgb(var(--st-accent-3-rgb) / 0.34)" }} key={name}>
                  <span className="block min-h-[42px] border border-[var(--sample-border)]" style={pattern} />
                  <span className="flex min-w-0 flex-col justify-between pl-2">
                    <span className="truncate text-[10px] font-black uppercase leading-tight">{name}</span>
                    <span className="text-[8px] font-bold uppercase" style={{ color: "var(--sample-accent)" }}>{meta}</span>
                  </span>
                </div>
              ))}
            </div>
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

const MID_CENTURY_MODERN_IMAGE = "url('/generated/design-styles/mid-century-modern.webp')";

function MidCenturyModernStudio({ className, compact = false, style }: Props) {
  const collection: Array<[string, string, string]> = [
    ["Lounge shell", "1956", "molded plywood"],
    ["Platform bench", "1947", "walnut slats"],
    ["Textile field", "1961", "woven color"],
  ];
  const textileBlocks = ["var(--sample-accent)", "var(--sample-accent-2)", "var(--sample-accent-3)", "var(--sample-primary)"];

  if (compact) {
    return (
      <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
        <div
          className="absolute inset-x-0 top-0 h-[112px] overflow-hidden bg-[var(--sample-base)] p-2"
          style={{
            backgroundImage: `linear-gradient(180deg, rgb(var(--st-base-rgb) / 0.05), rgb(var(--st-text-rgb) / 0.12)), ${MID_CENTURY_MODERN_IMAGE}`,
            backgroundPosition: "center 55%",
            backgroundSize: "cover",
          }}
        >
          <div className="flex items-center gap-2 border-b border-[rgb(var(--st-border-rgb)/0.52)] bg-[rgb(var(--st-surface-rgb)/0.72)] px-1.5 py-1 text-[9px] font-black uppercase backdrop-blur-[1px]">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--sample-accent-3)]" />
            <span>Case House</span>
            <span className="ml-auto rounded-full border border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-0.5 text-[8px]">1954</span>
          </div>
        </div>
      </SampleFrame>
    );
  }

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 18px, rgb(var(--st-border-rgb) / 0.18) 18px 19px), repeating-linear-gradient(0deg, transparent 0 18px, rgb(var(--st-border-rgb) / 0.12) 18px 19px)" }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-3 border-b border-[var(--sample-border)] pb-2 text-[10px] font-bold uppercase">
          <span className="flex items-center gap-2 font-display text-sm" style={{ fontFamily: "var(--st-font-display)" }}>
            <span className="h-3 w-3 rounded-full bg-[var(--sample-accent-3)]" />
            Case House
          </span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Seating</span>
            <span>Objects</span>
            <span>Textiles</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-1 text-[var(--sample-text)]">1954 index</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1.18fr_0.82fr]" : "grid-cols-1 md:grid-cols-[1.18fr_0.82fr] md:gap-5")}>
          <div
            className="relative min-h-0 overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgb(var(--st-base-rgb) / 0), rgb(var(--st-text-rgb) / 0.18)), ${MID_CENTURY_MODERN_IMAGE}`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute left-4 top-4 max-w-[13ch] bg-[rgb(var(--st-surface-rgb)/0.72)] px-2 py-1 backdrop-blur-[1px]">
              <p className="text-[10px] font-bold uppercase text-[var(--sample-accent)]">Furniture as graphic form</p>
            </div>
          </div>

          <div className="grid min-h-0 grid-rows-[auto_auto_1fr] gap-2.5">
            <div className="border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3">
              <p className="text-[10px] font-bold uppercase text-[var(--sample-accent)]">Living catalog</p>
              <h3
                className={cn("mt-1 font-display leading-[0.95]", compact ? "text-lg" : "text-2xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0em" }}
              >
                Walnut,
                <br />
                glass, textile.
              </h3>
            </div>

            <div className="grid gap-1.5">
              {collection.map(([name, year, detail], index) => (
                <div className={cn("grid grid-cols-[auto_1fr] items-center gap-2 border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.76)] px-2 py-1.5", compact && index === 2 ? "hidden" : "")} key={name}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--sample-accent-3)] text-[9px] font-black text-[var(--sample-text)]">{year.slice(2)}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-[10px] font-bold uppercase">{name}</span>
                    <span className="block truncate text-[9px] text-[var(--sample-muted)]">{detail}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className={cn("relative min-h-0 overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-base)]", compact ? "hidden" : "")}>
              <div className="grid h-full grid-cols-4 grid-rows-3">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span
                    aria-hidden="true"
                    className="border-r border-b border-[rgb(var(--st-border-rgb)/0.28)]"
                    key={index}
                    style={{ backgroundColor: textileBlocks[index % textileBlocks.length] }}
                  />
                ))}
              </div>
              <span aria-hidden="true" className="absolute inset-0 opacity-30 mix-blend-multiply" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent 0 6px, rgb(var(--st-text-rgb) / 0.22) 6px 7px)" }} />
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

const NOTCH = "polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px))";

function FuturismVelocity({ className, compact = false, style }: Props) {
  const specs: Array<[string, string]> = [
    ["Apogee", "418km"],
    ["Mach", "3.4"],
    ["Burn", "T+08:12"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[#05070d] text-white", className)} compact={compact} style={style}>
      <span aria-hidden="true" className="absolute inset-0 opacity-35" style={{ backgroundImage: "linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px), linear-gradient(0deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      <span aria-hidden="true" className="absolute -right-16 top-10 h-28 w-[70%] -skew-x-[22deg] border-y border-[var(--sample-accent)] bg-[rgb(var(--st-accent-rgb)/0.12)]" />
      <span aria-hidden="true" className="absolute bottom-10 left-6 h-px w-[72%] bg-[var(--sample-accent-2)]" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-3 border-b border-white/20 pb-2 text-[10px] font-bold uppercase tracking-[0.12em]">
          <span className="font-display text-base italic tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>ORBITAL</span>
          <nav className={cn("items-center gap-3 text-white/58", compact ? "hidden" : "flex")}>
            <span>Mission</span>
            <span>Vehicle</span>
            <span>Telemetry</span>
          </nav>
          <span className="ml-auto bg-[var(--sample-accent)] px-2.5 py-1 text-white" style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}>Launch window</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-4 pt-3", compact ? "grid-cols-[0.98fr_1.02fr]" : "grid-cols-1 md:grid-cols-[0.9fr_1.1fr] md:gap-5")}>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--sample-accent)]">Mach corridor / flight 09</p>
            <h3
              className={cn("mt-2 font-display italic uppercase leading-[0.82]", compact ? "text-4xl" : "text-6xl md:text-[4.25rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Beyond
              <br />
              <span className="text-[var(--sample-accent)]">orbit.</span>
            </h3>
            <div className="mt-4 flex gap-5">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--sample-muted)]">{label}</p>
                  <p className="font-display text-base font-black" style={{ fontFamily: "var(--st-font-display)" }}>{value}</p>
                </div>
              ))}
            </div>
            <span className={cn("mt-4 inline-flex w-fit items-center gap-1.5 border border-white/35 bg-white px-4 py-2 text-[11px] font-bold uppercase text-[#05070d]", compact ? "hidden" : "")} style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}>
              Mission brief <IconArrow size={12} />
            </span>
          </div>

          <div className="relative min-h-0 overflow-hidden border border-white/25 bg-black/30" style={{ clipPath: NOTCH }}>
            <span aria-hidden="true" className="absolute left-[18%] top-[16%] h-40 w-40 rounded-full border border-[var(--sample-accent-2)]" />
            <span aria-hidden="true" className="absolute left-[33%] top-[30%] h-14 w-14 rounded-full bg-[var(--sample-accent)] shadow-[0_0_42px_var(--sample-accent)]" />
            <span aria-hidden="true" className="absolute left-[20%] top-[45%] h-px w-[70%] rotate-[-18deg] bg-white/70" />
            <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2">
              {["payload", "stage", "reentry"].map((item, index) => (
                <span className="border border-white/20 bg-white/10 px-2 py-1 text-[8px] font-bold uppercase text-white/75" key={item}>
                  0{index + 1} {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function CyberpunkCity({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(65% 80% at 88% 6%, rgb(var(--st-accent-2-rgb) / 0.42), transparent 58%), radial-gradient(60% 60% at 8% 92%, rgb(var(--st-accent-rgb) / 0.32), transparent 55%)" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] opacity-45" style={{ backgroundImage: "linear-gradient(180deg, transparent 0%, rgb(var(--st-accent-rgb) / 0.22) 100%)", clipPath: "polygon(0 32%, 12% 28%, 12% 0, 24% 0, 24% 46%, 36% 46%, 36% 12%, 50% 12%, 50% 58%, 65% 58%, 65% 22%, 78% 22%, 78% 62%, 100% 62%, 100% 100%, 0 100%)" }} />
      <div className="relative flex h-full flex-col font-mono text-[var(--sample-text)]">
        <div className="flex items-center gap-3 border-b border-[var(--sample-border)] pb-2 text-[10px]">
          <span className="font-bold text-[var(--sample-accent)]">BRAINDANCE<span className="text-[var(--sample-accent-2)]">{"//"}</span>MARKET</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Night market</span>
            <span>Ripper lane</span>
            <span>Street ops</span>
          </nav>
          <span className="ml-auto bg-[var(--sample-accent-3)] px-2.5 py-1 font-bold text-black" style={{ clipPath: NOTCH }}>city protocol</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1.1fr_0.9fr]" : "grid-cols-1 md:grid-cols-[1.12fr_0.88fr]")}>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[9px] text-[var(--sample-accent-3)]">{"// status: online / black-market deck"}</p>
            <h3
              className={cn("mt-2 font-display uppercase leading-[0.82]", compact ? "text-4xl" : "text-6xl md:text-[4.2rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              <span className="text-[var(--sample-text)]">Night</span>
              <br />
              <span className="text-[var(--sample-accent)]" style={{ textShadow: "0 0 18px rgb(var(--st-accent-rgb) / 0.85)" }}>Market.</span>
            </h3>
            <p className={cn("mt-3 max-w-[26ch] text-[10px] leading-4 text-[var(--sample-muted)]", compact ? "hidden" : "")}>
              {">"} contraband decks, optic mods, back-alley firmware, Ripper lane installs.
            </p>
            <span className={cn("mt-4 inline-flex w-fit items-center gap-1.5 border border-[var(--sample-accent-2)] px-4 py-2 text-[11px] font-bold uppercase text-[var(--sample-accent-2)]", compact ? "hidden" : "")} style={{ clipPath: NOTCH, boxShadow: "0 0 12px rgb(var(--st-accent-2-rgb) / 0.5)" }}>
              enter alley <IconArrow size={12} />
            </span>
          </div>

          <div className="relative min-h-0 overflow-hidden border border-[var(--sample-accent)]" style={{ clipPath: NOTCH, boxShadow: "0 0 16px rgb(var(--st-accent-rgb) / 0.3)" }}>
            <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgb(var(--st-accent-rgb) / 0.16), transparent 42%), linear-gradient(90deg, transparent 0 18%, rgb(var(--st-accent-2-rgb) / 0.28) 18% 20%, transparent 20% 52%, rgb(var(--st-accent-rgb) / 0.24) 52% 54%, transparent 54%)" }} />
            <div className="absolute left-4 top-4 w-24 border border-[var(--sample-accent-2)] bg-black/45 p-2 text-[8px] text-[var(--sample-accent-2)]" style={{ boxShadow: "0 0 12px rgb(var(--st-accent-2-rgb) / 0.42)" }}>
              RIPPER DOC
              <br />
              booth: B-13
            </div>
            <div className="absolute right-4 top-8 grid gap-1 text-right text-[8px] uppercase">
              <span className="bg-[var(--sample-accent-3)] px-2 py-1 font-bold text-black">open late</span>
              <span className="border border-[var(--sample-accent)] bg-black/50 px-2 py-1 text-[var(--sample-accent)]">no warrants</span>
            </div>
            <div className="absolute bottom-2 left-2 right-2 grid gap-1.5">
              {["optic shard", "reflex patch", "drone ghost"].map((item) => (
                <div className="flex items-center justify-between border border-[var(--sample-accent)] bg-[rgb(var(--st-base-rgb)/0.78)] px-2 py-1 text-[9px]" key={item}>
                  <span className="text-[var(--sample-accent)]">{item}</span>
                  <span className="font-bold">cr. 4200</span>
                </div>
              ))}
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
        <div className="flex items-center gap-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em]">
          <span className="font-display text-sm" style={{ fontFamily: "var(--st-font-display)" }}>RED ROOM</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Stills</span>
            <span>Evidence</span>
            <span>Archive</span>
          </nav>
          <span className="ml-auto text-[var(--sample-accent)]">case file 07</span>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[2px] border border-[var(--sample-border)]">
          <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(46% 52% at 78% 18%, rgb(var(--st-accent-rgb) / 0.62), transparent 62%), radial-gradient(55% 55% at 20% 88%, rgb(var(--st-accent-2-rgb) / 0.4), transparent 60%), linear-gradient(180deg, #050509 0%, var(--sample-base) 100%)" }} />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(105deg, transparent 0 7px, rgb(255 255 255 / 0.42) 7px 8px)" }} />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 80px 20px rgb(0 0 0 / 0.7)" }} />
          <div className="absolute right-3 top-3 border border-[var(--sample-accent)] bg-black/50 px-2 py-1 text-right text-[8px] uppercase text-[var(--sample-accent)]">
            rain index
            <br />
            92 / heavy
          </div>
          <div className="absolute inset-x-3 bottom-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--sample-accent)]">evidence still / 02</p>
            <h3
              className={cn("font-display uppercase leading-[0.86]", compact ? "text-3xl" : "text-5xl md:text-[3.4rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", textShadow: "0 2px 16px rgb(0 0 0 / 0.8)" }}
            >
              Someone left the light on.
            </h3>
            <p className={cn("mt-1 text-[10px] text-[var(--sample-muted)]", compact ? "hidden" : "")}>low key / sodium red / wet pavement</p>
          </div>
        </div>

        <div className={cn("mt-2 grid grid-cols-4 gap-1.5", compact ? "hidden" : "")}>
          {["witness", "motel", "signal", "rain"].map((label, index) => (
            <div className="relative h-9 overflow-hidden rounded-[2px] border border-[var(--sample-border)]" key={label}>
              <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: index % 2 === 0 ? "linear-gradient(130deg, #06070d, rgb(var(--st-accent-rgb) / 0.38))" : "linear-gradient(130deg, #050509, rgb(var(--st-accent-2-rgb) / 0.32))" }} />
              <span className="absolute bottom-0.5 left-1 text-[7px] font-bold uppercase text-[var(--sample-text)]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function TechwearSystem({ className, compact = false, style }: Props) {
  const codes = compact
    ? ["SH-01", "VNT-7", "MTRX", "WR-3", "DRP-2", "LYR-4"]
    : ["SH-01", "VNT-7", "MTRX", "WR-3", "DRP-2", "LYR-4", "KNEE", "PKT-8", "TAPE", "ZIP-R", "LOAD", "VENT"];
  const scenes: PhotoScene[] = ["portrait", "studio", "interior", "material"];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col font-mono text-[var(--sample-text)]">
        <div className="flex items-center gap-3 pb-2 text-[10px] font-bold uppercase tracking-[0.04em]">
          <span className="font-display text-base" style={{ fontFamily: "var(--st-font-display)" }}>SHELL SYSTEM</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>garment matrix</span>
            <span>spec</span>
            <span>fit</span>
          </nav>
          <span className="ml-auto flex items-center gap-3 text-[var(--sample-muted)]">
            <span className={compact ? "hidden" : ""}>storm proof</span>
            <span className="text-[var(--sample-accent)]">drop 04</span>
          </span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-1.5", compact ? "grid-cols-3 grid-rows-2" : "grid-cols-6 grid-rows-2")}>
          {codes.map((code, index) => (
            <div className="flex min-w-0 flex-col" key={code}>
              <div className="relative flex-1 overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)]">
                <PhotoSurface className="h-full w-full" grain={false} scene={scenes[index % scenes.length]} />
                {index === 2 ? <span className="absolute right-1 top-1 bg-[var(--sample-accent)] px-1 text-[7px] font-bold text-[var(--sample-base)]">SEAM</span> : null}
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
    ["Build", "42s", "var(--sample-accent)"],
    ["p95", "84ms", "var(--sample-accent-2)"],
    ["Edge", "18", "var(--sample-accent-3)"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col text-[var(--sample-text)]">
        <div className="flex items-center gap-3 pb-2 text-[10px] font-medium">
          <span className="font-display text-sm font-bold tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>CONTROL PLANE</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>deploy graph</span>
            <span>edge regions</span>
            <span>incidents</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius)] bg-[var(--sample-accent)] px-2.5 py-1 font-semibold text-[var(--sample-base)]">Live</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-2.5", compact ? "grid-cols-[0.8fr_1.2fr]" : "grid-cols-1 md:grid-cols-[0.82fr_1.18fr]")}>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--sample-accent)]">global infrastructure</p>
            <h3
              className={cn("mt-2 font-display leading-[0.96] tracking-tight", compact ? "text-2xl" : "text-4xl md:text-[2.7rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Ship closer to every user.
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
                <span>deploy graph · 24h</span>
                <span className="text-[var(--sample-accent)]">● live</span>
              </div>
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
              {([["iad1", "42ms", "var(--sample-accent)"], ["fra1", "58ms", "var(--sample-accent)"], ["sin1", "120ms", "var(--sample-accent-3)"]] as Array<[string, string, string]>).map(([region, ms, color]) => (
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
  const fields = ["MODEL CANVAS", "latent queue", "scene synthesis", "world model"];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: "radial-gradient(70% 80% at 60% 30%, rgb(var(--st-accent-2-rgb) / 0.55), transparent 60%), radial-gradient(60% 70% at 18% 85%, rgb(var(--st-accent-rgb) / 0.45), transparent 60%), radial-gradient(50% 60% at 90% 95%, rgb(var(--st-accent-3-rgb) / 0.4), transparent 55%), linear-gradient(160deg, color-mix(in srgb, var(--sample-surface) 80%, #000) 0%, var(--sample-base) 100%)" }}
      />
      <span aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(58deg, transparent 0 5px, rgb(var(--st-accent-3-rgb) / 0.35) 5px 6px, transparent 6px 14px)", maskImage: "radial-gradient(50% 50% at 60% 55%, #000, transparent 75%)", WebkitMaskImage: "radial-gradient(50% 50% at 60% 55%, #000, transparent 75%)" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN_URI, backgroundSize: "120px 120px" }} />

      <div className="relative flex h-full flex-col text-[var(--sample-text)]">
        <div className="flex items-center gap-3 text-[10px] font-medium">
          <span className="font-display text-sm font-bold tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>MODEL CANVAS</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-text)]/75", compact ? "hidden" : "flex")}>
            <span>Generate</span>
            <span>Refine</span>
            <span>Render</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius)] bg-[var(--sample-text)] px-3 py-1 font-semibold text-[var(--sample-base)]">Prompt</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3
              className={cn("font-display leading-[0.98] tracking-tight", compact ? "text-2xl" : "text-4xl md:text-[3rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Shape a
              <br />
              synthetic scene.
            </h3>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-4 py-1.5 text-[11px] font-bold text-[var(--sample-base)]">
              Run model <IconArrow size={12} />
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
      <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(50% 60% at 75% 15%, rgb(var(--st-accent-rgb) / 0.4), transparent 60%), radial-gradient(50% 60% at 15% 90%, rgb(var(--st-accent-2-rgb) / 0.4), transparent 60%)" }} />
      <span aria-hidden="true" className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(90deg, rgb(255 255 255 / 0.12) 1px, transparent 1px), linear-gradient(0deg, rgb(255 255 255 / 0.12) 1px, transparent 1px)", backgroundSize: "34px 34px" }} />
      <div className="relative flex h-full flex-col text-[var(--sample-text)]">
        <div className="flex items-center gap-3 pb-2 text-[10px] font-medium uppercase tracking-[0.12em]">
          <span className="font-display text-sm font-bold tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>LIGHT FIELD</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>depth layer</span>
            <span>volume</span>
            <span>capture</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius-pill)] border border-white/30 bg-white/10 px-3 py-1 backdrop-blur">Calibrate</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 items-center gap-3 pt-2", compact ? "grid-cols-[1fr_0.85fr]" : "grid-cols-1 md:grid-cols-[1.05fr_0.95fr]")}>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sample-accent)]">Holographic UI</p>
            <h3
              className={cn("mt-2 font-display uppercase leading-[0.86]", compact ? "text-4xl" : "text-6xl md:text-[4rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", backgroundImage: IRIDESCENT, backgroundSize: "200% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
            >
              prism stack,
              <br />
              real depth.
            </h3>
            <span className={cn("mt-4 inline-flex w-fit items-center gap-1.5 rounded-[var(--st-radius-pill)] border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-bold backdrop-blur", compact ? "hidden" : "")} style={{ boxShadow: "0 0 20px rgb(var(--st-accent-rgb) / 0.4)" }}>
              Focus plane <IconArrow size={12} />
            </span>
          </div>

          <div className="relative min-h-0">
            <div className="absolute inset-x-2 top-2 rounded-[12px] border border-white/25 bg-white/10 p-3 backdrop-blur-md" style={{ boxShadow: "0 8px 30px rgb(var(--st-accent-2-rgb) / 0.3), inset 0 1px 0 rgb(255 255 255 / 0.3)" }}>
              <div className="h-1.5 w-12 rounded-full" style={{ backgroundImage: IRIDESCENT }} />
              <p className="mt-2 font-display text-base font-bold" style={{ fontFamily: "var(--st-font-display)" }}>Volumetric layer</p>
              <p className="text-[9px] text-[var(--sample-muted)]">refraction / realtime / 62%</p>
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
    backgroundImage: "linear-gradient(180deg, #ffffff 0%, #b9c0cc 18%, #727b90 34%, #ffffff 48%, #9da7b8 64%, #f8fbff 78%, #6f788a 100%)",
    WebkitBackgroundClip: "text" as const,
    backgroundClip: "text" as const,
    color: "transparent",
  };
  const chromeSurface = "linear-gradient(135deg, #ffffff 0%, #dce2eb 13%, #80899a 25%, #f9fbff 38%, #a5adbc 52%, #ffffff 64%, #697180 77%, #eef2f8 100%)";
  const blueLens = "radial-gradient(circle at 34% 26%, #ffffff 0%, #8ee7ff 18%, #4a63ff 46%, #12172a 78%)";

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(45% 55% at 78% 18%, rgb(var(--st-accent-2-rgb) / 0.22), transparent 65%), radial-gradient(42% 45% at 18% 86%, #ffffff99, transparent 62%), linear-gradient(135deg, #f8faff 0%, var(--sample-base) 44%, #aab2bf 100%)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: "linear-gradient(90deg, rgb(var(--st-text-rgb) / 0.12) 1px, transparent 1px), linear-gradient(180deg, rgb(var(--st-text-rgb) / 0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative flex h-full flex-col text-[var(--sample-text)]">
        <div className="flex items-center gap-3 border-b border-[var(--sample-border)] pb-2 text-[10px] font-bold uppercase tracking-[0em]">
          <span className="font-display text-sm tracking-[0em]" style={{ fontFamily: "var(--st-font-display)" }}>Y2K CHROME</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>molded chrome shell</span>
            <span>specular flash</span>
            <span>blue lens</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] px-3 py-1 text-[var(--sample-text)]" style={{ backgroundImage: chromeSurface }}>2003 kit</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 items-center gap-3 pt-3", compact ? "grid-cols-[0.92fr_1fr]" : "grid-cols-1 md:grid-cols-[0.95fr_1.05fr]")}>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0em] text-[var(--sample-accent-2)]">silver plastic / flash era</p>
            <h3
              className={cn("mt-2 font-display uppercase leading-[0.84]", compact ? "text-3xl" : "text-6xl md:text-[4.1rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0em", ...chromeText }}
            >
              Chrome
              <br />
              signal.
            </h3>
            <div className={cn("mt-4 grid gap-1.5 text-[10px] font-bold uppercase", compact ? "hidden" : "max-w-[12rem]")}>
              <span className="rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] bg-white/55 px-3 py-1">mini disc nav</span>
              <span className="rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] px-3 py-1" style={{ backgroundImage: chromeSurface }}>portable tech skin</span>
            </div>
          </div>

          <div className="relative grid min-h-0 place-items-center">
            <div
              className="relative aspect-[1.22/1] w-[92%] max-w-[13rem] rounded-[2rem] border border-white/80 p-3"
              style={{
                backgroundImage: chromeSurface,
                boxShadow: "0 18px 36px rgb(var(--st-text-rgb) / 0.28), inset 0 2px 4px #ffffff, inset 0 -8px 18px rgb(var(--st-text-rgb) / 0.22)",
              }}
            >
              <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-2">
                <div className="rounded-[1.15rem] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" style={{ boxShadow: "inset 0 1px 0 #ffffff" }}>
                  <div className="h-11 rounded-[0.8rem] border border-[var(--sample-border)]" style={{ backgroundImage: blueLens }} />
                  <div className="mt-2 grid grid-cols-3 gap-1">
                    {[0, 1, 2].map((item) => (
                      <span key={item} className="h-2 rounded-full border border-[var(--sample-border)] bg-white/55" />
                    ))}
                  </div>
                </div>
                <div className="relative rounded-[1.35rem] border border-[var(--sample-border)] bg-white/45 p-2">
                  <div className="absolute right-2 top-2 h-4 w-4 rounded-full" style={{ backgroundImage: blueLens, boxShadow: "0 0 12px rgb(var(--st-accent-2-rgb) / 0.75)" }} />
                  <div className="absolute bottom-2 left-2 aspect-square w-[58%] rounded-full border border-[var(--sample-border)]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 0 12%, #9da7b8 13% 24%, #f7faff 25% 42%, #6b7484 43% 56%, #ffffff 57% 76%, #8993a5 77% 100%)" }} />
                  <div className="ml-auto mt-8 h-12 w-[52%] rounded-[1rem] border border-[var(--sample-border)]" style={{ backgroundImage: chromeSurface }} />
                </div>
              </div>
              <span aria-hidden="true" className="absolute left-7 top-5 h-5 w-5 rotate-45 bg-white" style={{ clipPath: "polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%)", filter: "drop-shadow(0 0 10px #fff)" }} />
              <span aria-hidden="true" className="absolute right-10 top-9 h-3 w-3 rotate-45 bg-white" style={{ clipPath: "polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%)", filter: "drop-shadow(0 0 8px #fff)" }} />
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-1 text-[9px] font-bold uppercase">molded chrome shell</span>
            </div>
            <span className="absolute bottom-2 right-2 rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] bg-white/75 px-2 py-0.5 text-[9px] font-bold uppercase">specular flash</span>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function MetaverseWorld({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(60% 70% at 30% 25%, rgb(var(--st-accent-rgb) / 0.6), transparent 60%), radial-gradient(55% 65% at 82% 35%, rgb(var(--st-accent-2-rgb) / 0.55), transparent 60%), radial-gradient(60% 60% at 70% 100%, rgb(var(--st-accent-3-rgb) / 0.5), transparent 60%), linear-gradient(180deg, var(--sample-surface), var(--sample-base))" }} />
      <span aria-hidden="true" className="absolute bottom-0 left-[6%] h-[62%] w-[26%]" style={{ backgroundImage: "radial-gradient(50% 40% at 50% 22%, rgb(var(--st-accent-rgb) / 0.9), transparent 60%), linear-gradient(180deg, color-mix(in srgb, var(--sample-accent) 70%, #000) 0%, transparent 85%)", clipPath: "polygon(30% 0, 70% 0, 80% 100%, 20% 100%)" }} />
      <span aria-hidden="true" className="absolute bottom-0 right-[8%] h-[70%] w-[28%]" style={{ backgroundImage: "radial-gradient(50% 40% at 50% 20%, rgb(var(--st-accent-2-rgb) / 0.9), transparent 60%), linear-gradient(180deg, color-mix(in srgb, var(--sample-accent-2) 70%, #000) 0%, transparent 85%)", clipPath: "polygon(28% 0, 72% 0, 82% 100%, 18% 100%)" }} />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 -50px 60px -20px rgb(var(--st-base-rgb) / 0.9), inset 0 40px 50px -20px rgb(var(--st-base-rgb) / 0.7)" }} />

      <div className="relative flex h-full flex-col text-[var(--sample-text)]">
        <div className="flex items-center gap-3 text-[10px] font-semibold">
          <span className="flex items-center gap-1.5 font-display text-sm tracking-tight" style={{ fontFamily: "var(--st-font-display)" }}>
            <span className="h-3.5 w-3.5 rounded-[5px] bg-[var(--sample-accent)]" /> SPATIAL LOBBY
          </span>
          <nav className={cn("items-center gap-3 text-[var(--sample-text)]/80", compact ? "hidden" : "flex")}>
            <span>avatar mesh</span>
            <span>world shard</span>
            <span>rooms</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius-pill)] border border-white/40 px-3 py-1">Sign in</span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
          <h3
            className={cn("font-display leading-[0.9] tracking-tight", compact ? "text-3xl" : "text-5xl md:text-[3.8rem]")}
            style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", textShadow: "0 2px 20px rgb(var(--st-base-rgb) / 0.8)" }}
          >
            Pick a room.
            <br />
            Bring a body.
          </h3>
          <div className="mt-5 flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-[var(--st-radius-pill)] bg-[var(--sample-accent)] px-4 py-2 text-[11px] font-bold text-white" style={{ boxShadow: "0 0 18px rgb(var(--st-accent-rgb) / 0.6)" }}>
              Enter lobby
            </span>
            <span className={cn("inline-flex items-center rounded-[var(--st-radius-pill)] border border-white/40 px-4 py-2 text-[11px] font-bold", compact ? "hidden" : "")}>
              Mint avatar
            </span>
          </div>
          <p className={cn("mt-3 text-[9px] uppercase tracking-[0.14em] text-[var(--sample-text)]/70", compact ? "hidden" : "")}>36 friends online / 12 live worlds</p>
        </div>
      </div>
    </SampleFrame>
  );
}

function LuxuryClassicBottomStrip({ compact = false, items }: { compact?: boolean; items: Array<[string, string]> }) {
  return (
    <div className={cn("grid border-t border-[var(--sample-border-soft)]", compact ? "grid-cols-3 text-[8px]" : "grid-cols-3 text-[10px]")}>
      {items.map(([label, value]) => (
        <div className="min-w-0 border-r border-[var(--sample-border-soft)] px-3 py-2 last:border-r-0" key={label}>
          <p className="truncate uppercase tracking-[0.18em] text-[var(--sample-muted)]">{label}</p>
          <p className="mt-1 truncate font-medium text-[var(--sample-text)]">{value}</p>
        </div>
      ))}
    </div>
  );
}

function ClassicHeritageCommerce({ className, compact = false, style }: Props) {
  const products = ["Blazer", "Oxford", "Leather", "Archive"];

  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Heritage Co." compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />, <IconBag key="bag" size={compact ? 11 : 13} />]} links={["Wardrobe", "Journal", "Stores"]} sub="Since 1887" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.8fr_1.2fr]" : "grid-cols-[0.72fr_1.28fr]")}>
          <div className="flex min-h-0 flex-col justify-between border-r border-[var(--sample-border-soft)] pr-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">Permanent collection</p>
              <h3 className={cn("mt-3 font-display font-normal leading-[0.92]", compact ? "text-3xl" : "text-5xl md:text-7xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Classic
              </h3>
              <p className="mt-3 line-clamp-3 text-xs leading-5 text-[var(--sample-muted)]">Balanced serif type, navy tailoring, leather detail, and archive paced commerce.</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Editorial", "Shop"].map((item) => (
                <span className="border border-[var(--sample-border-soft)] px-2 py-2 text-[9px] uppercase tracking-[0.14em]" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid min-h-0 grid-rows-[1fr_auto] gap-2">
            <GeneratedStyleImageSurface className="min-h-0 border border-[var(--sample-border-soft)]" overlay="soft" position="center" slug="classic">
              <span className="absolute left-4 top-4 h-8 w-px bg-[var(--sample-accent)]" />
              <span className="absolute bottom-4 left-4 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.82)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--sample-text)]">Archive 01</span>
            </GeneratedStyleImageSurface>
            <div className="grid grid-cols-4 gap-2">
              {products.map((product, index) => (
                <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2" key={product}>
                  <span className="block h-8 bg-[var(--sample-accent-2)]" style={{ opacity: 0.45 + index * 0.1 }} />
                  <span className="mt-2 block truncate text-[9px] uppercase tracking-[0.12em] text-[var(--sample-muted)]">{product}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <LuxuryClassicBottomStrip compact={compact} items={[["Material", "Wool"], ["Fit", "Balanced"], ["Tone", "Timeless"]]} />
      </div>
    </SampleFrame>
  );
}

function NeoclassicHotelHome({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav align="center" brand="Maison Palace" compact={compact} links={["Suites", "Dining", "Reserve"]} sub="Paris" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[1fr_0.78fr]" : "grid-cols-[1.2fr_0.8fr]")}>
          <GeneratedStyleImageSurface className="relative min-h-0 border border-[var(--sample-border-soft)]" overlay="soft" position="center" slug="neoclassic">
            <div className="absolute inset-x-8 top-7 flex justify-between">
              {[1, 2, 3, 4].map((item) => (
                <span className="h-24 w-5 border-x border-[var(--sample-accent)] bg-[rgb(var(--st-surface-rgb)_/_0.38)]" key={item} />
              ))}
            </div>
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.9)] text-[9px] uppercase tracking-[0.16em]">
              {["Arrival", "Nights", "Guests"].map((item) => (
                <span className="border-r border-[var(--sample-border-soft)] px-3 py-2 last:border-r-0" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </GeneratedStyleImageSurface>
          <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">Grand reservation</p>
              <h3 className={cn("mt-2 font-display font-normal leading-[0.95]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Neoclassic
              </h3>
            </div>
            <div className="grid gap-2">
              {["Marble lobby", "Suite ritual", "Private dining"].map((item, index) => (
                <div className="grid grid-cols-[auto_1fr] items-center gap-3 border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2" key={item}>
                  <span className="grid h-9 w-9 place-items-center border border-[var(--sample-accent)] text-[10px] text-[var(--sample-accent)]">0{index + 1}</span>
                  <span className="truncate text-[10px] uppercase tracking-[0.14em]">{item}</span>
                </div>
              ))}
            </div>
            <span className="h-9 border border-[var(--sample-accent)] bg-[var(--sample-accent)] text-center text-[10px] uppercase leading-9 tracking-[0.18em] text-[var(--sample-base)]">Reserve</span>
          </div>
        </div>
        <LuxuryClassicBottomStrip compact={compact} items={[["Order", "Symmetry"], ["Surface", "Marble"], ["Mood", "Stately"]]} />
      </div>
    </SampleFrame>
  );
}

function LuxuryEditorialProduct({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr] gap-4">
        <SampleNav brand="Atelier" compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />, <IconUser key="user" size={compact ? 11 : 13} />, <IconBag key="bag" size={compact ? 11 : 13} />]} links={["Women", "Objects", "Stories"]} sub="Edition 04" />
        <div className={cn("grid min-h-0 gap-4", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-[0.72fr_1.28fr]")}>
          <div className="flex min-h-0 flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--sample-muted)]">New object</p>
              <h3 className={cn("mt-4 font-display font-light uppercase leading-[0.95]", compact ? "text-3xl" : "text-5xl md:text-6xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0.04em" }}>
                Luxury
              </h3>
              <p className="mt-5 line-clamp-3 max-w-[16rem] text-xs leading-5 text-[var(--sample-muted)]">A quiet commerce page built from material close-up, slender rules, and nearly silent CTA hierarchy.</p>
            </div>
            <div className="grid gap-2 border-y border-[var(--sample-border-soft)] py-3">
              {["Leather", "Silk", "Brass"].map((item) => (
                <span className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em]" key={item}>
                  {item}
                  <span className="h-px w-10 bg-[var(--sample-accent)]" />
                </span>
              ))}
            </div>
          </div>
          <div className="grid min-h-0 grid-cols-[1fr_0.42fr] gap-3">
            <GeneratedStyleImageSurface className="min-h-0 border border-[var(--sample-border-soft)]" overlay="soft" position="center" slug="luxury" />
            <div className="grid min-h-0 grid-rows-3 gap-2">
              {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color, index) => (
                <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2" key={color}>
                  <span className="block h-full" style={{ background: `linear-gradient(135deg, ${color}, var(--sample-surface))`, opacity: 0.9 }} />
                  <span className="mt-1 block text-[8px] uppercase tracking-[0.16em] text-[var(--sample-muted)]">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function OldMoneyClubShop({ className, compact = false, style }: Props) {
  const wardrobe = ["Knit", "Blazer", "Loafer", "Case"];

  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Club Reserve" compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />, <IconBag key="bag" size={compact ? 11 : 13} />]} links={["Wardrobe", "House", "Journal"]} sub="Members" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[1.15fr_0.85fr]" : "grid-cols-[1.25fr_0.75fr]")}>
          <GeneratedStyleImageSurface className="min-h-0 border border-[var(--sample-border-soft)]" overlay="warm" position="center" slug="old-money">
            <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.75)] font-serif text-sm">CR</span>
            <span className="absolute bottom-4 left-4 right-4 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.82)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Field wardrobe</span>
          </GeneratedStyleImageSurface>
          <div className="grid min-h-0 grid-rows-[auto_1fr] gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">Quiet heritage</p>
              <h3 className={cn("mt-2 font-display font-normal leading-[0.96]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Old Money
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {wardrobe.map((item) => (
                <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2" key={item}>
                  <span className="block aspect-square bg-[var(--sample-accent-2)]" />
                  <span className="mt-2 block text-[9px] uppercase tracking-[0.12em] text-[var(--sample-muted)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <LuxuryClassicBottomStrip compact={compact} items={[["Signal", "Restraint"], ["Texture", "Cashmere"], ["Place", "Club"]]} />
      </div>
    </SampleFrame>
  );
}

function ArtDecoHotelPortal({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0_48%,rgb(var(--st-accent-rgb)_/_0.22)_48%_52%,transparent_52%)]" />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav align="center" brand="Deco House" bordered={false} compact={compact} links={["Rooms", "Bar", "Events"]} sub="Evening" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[1fr_0.72fr]" : "grid-cols-[1.25fr_0.75fr]")}>
          <GeneratedStyleImageSurface className="min-h-0 border border-[var(--sample-accent)]" overlay="dark" position="center" slug="art-deco">
            <span className="absolute left-1/2 top-9 h-36 w-36 -translate-x-1/2 rounded-t-full border border-[var(--sample-accent)]" />
            <span className="absolute left-1/2 top-16 h-24 w-24 -translate-x-1/2 rounded-t-full border border-[var(--sample-accent)]" />
            <span className="absolute bottom-4 left-4 right-4 border border-[var(--sample-accent)] bg-[rgb(0_0_0_/_0.58)] px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-[var(--sample-primary)]">Night rooms</span>
          </GeneratedStyleImageSurface>
          <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-2">
            <h3 className={cn("font-display font-normal uppercase leading-[0.9] text-[var(--sample-primary)]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0.08em" }}>
              Art Deco
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div className="relative overflow-hidden border border-[var(--sample-accent)] bg-[var(--sample-surface)]" key={item}>
                  <span className="absolute inset-x-4 top-2 h-10 rounded-t-full border border-[var(--sample-accent)]" />
                  <span className="absolute bottom-2 left-2 right-2 h-2 bg-[var(--sample-accent)]" />
                </div>
              ))}
            </div>
            <span className="h-9 border border-[var(--sample-accent)] text-center text-[10px] uppercase leading-9 tracking-[0.22em] text-[var(--sample-primary)]">Reserve table</span>
          </div>
        </div>
        <LuxuryClassicBottomStrip compact={compact} items={[["Geometry", "Fan"], ["Metal", "Brass"], ["Mood", "Glamour"]]} />
      </div>
    </SampleFrame>
  );
}

function ArtNouveauBotanicalShop({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Flora Atelier" compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />, <IconBag key="bag" size={compact ? 11 : 13} />]} links={["Perfume", "Botanicals", "Journal"]} sub="Seasonal" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.85fr_1.15fr]" : "grid-cols-[0.78fr_1.22fr]")}>
          <div className="flex min-h-0 flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--sample-muted)]">Botanical line</p>
              <h3 className={cn("mt-3 font-display font-normal leading-[0.96]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Art Nouveau
              </h3>
            </div>
            <div className="space-y-2">
              {["Vine frame", "Glass bottle", "Pressed bloom"].map((item) => (
                <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-3 py-2 text-[9px] uppercase tracking-[0.14em]" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <PhotoSurface className="min-h-0 border border-[var(--sample-border-soft)]" scene="material">
            <span className="absolute left-[12%] top-[8%] h-[72%] w-[76%] rounded-[48%_52%_40%_60%] border border-[var(--sample-accent)]" />
            <span className="absolute left-[23%] top-[17%] h-[54%] w-[54%] rounded-[58%_42%_64%_36%] border border-[var(--sample-accent)]" />
            <span className="absolute left-[52%] top-[11%] h-[68%] w-[30%] border border-[var(--sample-accent)] bg-[rgb(var(--st-surface-rgb)_/_0.7)]" style={{ borderRadius: "44% 44% 18px 18px" }} />
            <span className="absolute bottom-[18%] left-[18%] h-16 w-28 rounded-[60%_40%_52%_48%] bg-[var(--sample-accent-2)] opacity-70" />
            <span className="absolute bottom-4 left-4 right-4 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.86)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Botanical perfume</span>
          </PhotoSurface>
        </div>
        <LuxuryClassicBottomStrip compact={compact} items={[["Line", "Organic"], ["Object", "Perfume"], ["Motif", "Vine"]]} />
      </div>
    </SampleFrame>
  );
}

function BaroqueGalleryCommerce({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(78% 64% at 28% 20%, rgb(var(--st-accent-rgb) / 0.34), transparent 58%), radial-gradient(60% 70% at 82% 72%, rgb(var(--st-accent-2-rgb) / 0.44), transparent 62%), linear-gradient(135deg, rgb(0 0 0 / 0.58), transparent 42%, rgb(0 0 0 / 0.38))",
        }}
      />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav align="left" brand="Caravaggio Hall" bordered={false} compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />]} links={["Paintings", "Rooms", "Patron"]} sub="Candle salon" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.78fr_1.22fr]" : "grid-cols-[0.68fr_1.32fr]")}>
          <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">Candle drama</p>
              <h3 className={cn("mt-2 font-display font-normal leading-[0.92] text-[var(--sample-primary)]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0.01em" }}>
                Baroque
              </h3>
            </div>
            <div className="grid gap-2">
              {[
                ["01", "Velvet salon"],
                ["02", "Gilded portrait"],
                ["03", "Candle service"],
              ].map(([index, item]) => (
                <div className="grid grid-cols-[auto_1fr] items-center gap-3 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.76)] px-3 py-2 text-[9px] uppercase tracking-[0.15em]" key={item}>
                  <span className="font-serif text-sm text-[var(--sample-accent)]">{index}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <span className="h-9 border border-[var(--sample-accent)] bg-[var(--sample-accent-2)] text-center text-[10px] uppercase leading-9 tracking-[0.2em] text-[var(--sample-primary)]">Private view</span>
          </div>
          <div
            className="relative min-h-0 border border-[var(--sample-accent)] bg-[var(--sample-surface)] p-2"
            style={{ boxShadow: "inset 0 0 0 7px rgb(var(--st-accent-rgb) / 0.18), 0 14px 30px rgb(0 0 0 / 0.28)" }}
          >
            <span className="pointer-events-none absolute inset-4 border border-[var(--sample-accent)] opacity-80" />
            <span className="pointer-events-none absolute left-1/2 top-0 h-5 w-28 -translate-x-1/2 bg-[var(--sample-surface)]" style={{ clipPath: "polygon(12% 0, 88% 0, 100% 100%, 0 100%)" }} />
            <span className="pointer-events-none absolute bottom-0 left-1/2 h-5 w-28 -translate-x-1/2 bg-[var(--sample-surface)]" style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 12% 100%)" }} />
            <GeneratedStyleImageSurface className="h-full min-h-0 border border-[var(--sample-border-soft)]" overlay="dark" position="center 18%" slug="baroque">
              <span
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(36% 56% at 44% 38%, transparent 0 42%, rgb(var(--st-base-rgb) / 0.1) 62%, rgb(var(--st-base-rgb) / 0.72) 100%), linear-gradient(90deg, rgb(var(--st-accent-2-rgb) / 0.42), transparent 32%, transparent 68%, rgb(var(--st-base-rgb) / 0.72))",
                }}
              />
              <span className={cn("absolute left-[10%] top-[9%] h-[70%] w-[74%] border border-[var(--sample-accent)] opacity-75", compact ? "opacity-45" : "")} />
              <span className={cn("absolute left-[16%] top-[15%] h-[58%] w-[62%] border border-[var(--sample-accent)] opacity-60", compact ? "hidden" : "")} />
              <span className={cn("absolute left-5 top-5 border border-[var(--sample-accent)] bg-[rgb(var(--st-base-rgb)_/_0.82)] px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-[var(--sample-primary)]", compact ? "hidden" : "")}>
                Velvet house
              </span>
              <span className={cn("absolute border border-[var(--sample-accent)] bg-[rgb(var(--st-base-rgb)_/_0.88)] uppercase text-[var(--sample-primary)]", compact ? "bottom-2 left-2 right-2 px-2 py-1 text-[8px] tracking-[0.14em]" : "bottom-4 left-4 right-4 px-3 py-2 text-[10px] tracking-[0.18em]")}>
                Chiaroscuro atelier
              </span>
            </GeneratedStyleImageSurface>
          </div>
        </div>
        <LuxuryClassicBottomStrip compact={compact} items={[["Light", "Candle"], ["Surface", "Velvet"], ["Gesture", "Theatre"]]} />
      </div>
    </SampleFrame>
  );
}

function RococoSalonMarket({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Salon Pastel" compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />, <IconBag key="bag" size={compact ? 11 : 13} />]} links={["Tea", "Beauty", "Gifts"]} sub="Rococo edit" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[1.05fr_0.95fr]" : "grid-cols-[1.18fr_0.82fr]")}>
          <GeneratedStyleImageSurface className="min-h-0 border border-[var(--sample-border-soft)]" overlay="soft" position="center" slug="rococo">
            <span className="absolute left-5 top-5 h-16 w-24 rounded-[50%_50%_18px_18px] border border-[var(--sample-accent-3)]" />
            <span className="absolute bottom-5 right-5 h-16 w-24 rounded-[18px_18px_50%_50%] border border-[var(--sample-accent-3)]" />
          </GeneratedStyleImageSurface>
          <div className="grid min-h-0 grid-rows-[auto_1fr] gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">Shell salon</p>
              <h3 className={cn("mt-2 font-display font-normal leading-[0.96]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Rococo
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Porcelain", "Pearl", "Ribbon", "Cream"].map((item, index) => (
                <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2" key={item}>
                  <span className="block aspect-square rounded-[48%_52%_40%_60%]" style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3, style.palette.surface][index] }} />
                  <span className="mt-2 block text-[8px] uppercase tracking-[0.14em] text-[var(--sample-muted)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <LuxuryClassicBottomStrip compact={compact} items={[["Curve", "Shell"], ["Color", "Pastel"], ["Mood", "Delicate"]]} />
      </div>
    </SampleFrame>
  );
}

function GothicCathedralArchive({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0_24%,rgb(var(--st-accent-2-rgb)_/_0.12)_24%_25%,transparent_25%_49%,rgb(var(--st-accent-rgb)_/_0.16)_49%_51%,transparent_51%_74%,rgb(var(--st-accent-2-rgb)_/_0.12)_74%_75%,transparent_75%)]" />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Stone Archive" bordered={false} compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />]} links={["Vault", "Glass", "Shop"]} sub="Gothic" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.82fr_1.18fr]" : "grid-cols-[0.72fr_1.28fr]")}>
          <div className="flex min-h-0 flex-col justify-between border-r border-[var(--sample-border-soft)] pr-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">Cathedral index</p>
              <h3 className={cn("mt-3 font-display font-normal leading-[0.9] text-[var(--sample-primary)]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Gothic
              </h3>
            </div>
            <div className="grid gap-2">
              {["Pointed arch", "Stained glass", "Stone ribs"].map((item) => (
                <span className="border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.72)] px-3 py-2 text-[9px] uppercase tracking-[0.16em]" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <PhotoSurface className="min-h-0 border border-[var(--sample-border-soft)]" scene="studio" style={{ backgroundColor: "var(--sample-surface)" }}>
            <div className="absolute inset-5 grid grid-cols-3 gap-3">
              {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color, index) => (
                <div className="relative overflow-hidden border border-[var(--sample-border-soft)] bg-[rgb(0_0_0_/_0.22)]" key={color} style={{ clipPath: "polygon(50% 0, 100% 32%, 100% 100%, 0 100%, 0 32%)" }}>
                  <span className="absolute inset-x-1 top-8 h-px bg-[var(--sample-border-soft)]" />
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--sample-border-soft)]" />
                  <span className="absolute inset-2 opacity-80" style={{ background: `linear-gradient(150deg, ${color}, transparent 72%)` }} />
                  <span className="absolute bottom-2 left-2 text-[8px] uppercase tracking-[0.12em] text-[var(--sample-primary)]">0{index + 1}</span>
                </div>
              ))}
            </div>
            <span className="absolute bottom-4 left-4 right-4 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-base-rgb)_/_0.86)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--sample-primary)]">Vaulted collection</span>
          </PhotoSurface>
        </div>
        <LuxuryClassicBottomStrip compact={compact} items={[["Form", "Arch"], ["Light", "Glass"], ["Tone", "Sacred"]]} />
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

function NaturalHandmadeBottomStrip({ compact = false, items }: { compact?: boolean; items: Array<[string, string]> }) {
  return (
    <div className={cn("grid border-t border-[var(--sample-border-soft)]", compact ? "grid-cols-3 text-[8px]" : "grid-cols-3 text-[10px]")}>
      {items.map(([label, value], index) => (
        <div className={cn("px-3 py-2", index > 0 ? "border-l border-[var(--sample-border-soft)]" : "")} key={label}>
          <span className="block uppercase tracking-[0.18em] text-[var(--sample-muted)]">{label}</span>
          <span className="mt-1 block font-semibold text-[var(--sample-text)]">{value}</span>
        </div>
      ))}
    </div>
  );
}

function OrganicDesignApothecary({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <span className="absolute left-[-12%] top-[14%] h-56 w-56 rounded-[52%_48%_42%_58%] bg-[var(--sample-accent)] opacity-25 blur-2xl" />
      <span className="absolute bottom-[-16%] right-[-8%] h-64 w-64 rounded-[42%_58%_60%_40%] bg-[var(--sample-accent-2)] opacity-28 blur-2xl" />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Root Form" compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />]} links={["Extracts", "Rituals", "Journal"]} sub="Organic lab" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-[0.78fr_1.22fr]")}>
          <div className="flex min-h-0 flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--sample-muted)]">Natural forms</p>
              <h3 className={cn("mt-3 font-display font-semibold leading-[0.94]", compact ? "text-2xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Organic Design
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color, index) => (
                <span
                  className="aspect-square border border-[var(--sample-border-soft)]"
                  key={color}
                  style={{ backgroundColor: color, borderRadius: ["58% 42% 48% 52%", "44% 56% 62% 38%", "62% 38% 44% 56%"][index] }}
                />
              ))}
            </div>
          </div>
          <PhotoSurface className="min-h-0 border border-[var(--sample-border-soft)]" scene="material">
            <span className="absolute left-[14%] top-[13%] h-[56%] w-[42%] rounded-[58%_42%_48%_52%] bg-[rgb(var(--st-accent-rgb)_/_0.62)]" />
            <span className="absolute right-[14%] top-[20%] h-[44%] w-[28%] rounded-[42%_58%_60%_40%] bg-[rgb(var(--st-accent-2-rgb)_/_0.68)]" />
            <span className="absolute bottom-5 left-5 right-5 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.82)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Root extract collection</span>
          </PhotoSurface>
        </div>
        <NaturalHandmadeBottomStrip compact={compact} items={[["Shape", "Biomorphic"], ["Tone", "Earth"], ["Use", "Wellness"]]} />
      </div>
    </SampleFrame>
  );
}

function NaturalMarketShelf({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Plain Goods" compact={compact} icons={[<IconBag key="bag" size={compact ? 11 : 13} />]} links={["Pantry", "Home", "Notes"]} sub="Daily market" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[1fr_0.82fr]" : "grid-cols-[1.18fr_0.82fr]")}>
          <PhotoSurface className="min-h-0 border border-[var(--sample-border-soft)]" grain scene="studio">
            <div className="absolute inset-4 grid grid-cols-3 gap-2">
              {[style.palette.surface, style.palette.accent, style.palette.accent2, style.palette.accent3, style.palette.base, style.palette.border].map((color, index) => (
                <span className="border border-[var(--sample-border-soft)]" key={`${color}-${index}`} style={{ backgroundColor: color }} />
              ))}
            </div>
            <span className="absolute bottom-4 left-4 bg-[rgb(var(--st-surface-rgb)_/_0.84)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Undyed cotton / oat / clay</span>
          </PhotoSurface>
          <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--sample-muted)]">Material first</p>
              <h3 className={cn("mt-3 font-display font-semibold uppercase leading-[0.9]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Natural
              </h3>
            </div>
            <div className="grid gap-2">
              {["Linen tote", "Raw honey", "Stone soap"].map((item) => (
                <div className="flex items-center justify-between border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-3 py-2 text-[9px] uppercase tracking-[0.14em]" key={item}>
                  <span>{item}</span>
                  <span className="h-2 w-8 bg-[var(--sample-accent)]" />
                </div>
              ))}
            </div>
            <span className="h-9 border border-[var(--sample-border)] text-center text-[10px] uppercase leading-9 tracking-[0.18em]">Shop shelf</span>
          </div>
        </div>
        <NaturalHandmadeBottomStrip compact={compact} items={[["Color", "Undyed"], ["Surface", "Plain"], ["Mood", "Trust"]]} />
      </div>
    </SampleFrame>
  );
}

function BotanicalGlasshouse({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Glasshouse" compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />, <IconBag key="bag" size={compact ? 11 : 13} />]} links={["Plants", "Seeds", "Care"]} sub="Botanical" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.84fr_1.16fr]" : "grid-cols-[0.72fr_1.28fr]")}>
          <div className="grid min-h-0 grid-rows-[auto_1fr] gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">Living catalog</p>
              <h3 className={cn("mt-2 font-display font-semibold leading-[0.92]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Botanical
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Fern", "Moss", "Stem", "Bloom"].map((item, index) => (
                <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2" key={item}>
                  <span className="block aspect-square rounded-[58%_42%_58%_42%]" style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3, style.palette.base][index] }} />
                  <span className="mt-2 block text-[8px] uppercase tracking-[0.14em] text-[var(--sample-muted)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <PhotoSurface className="min-h-0 border border-[var(--sample-border-soft)]" scene="interior">
            <span className="absolute bottom-[18%] left-1/2 h-[62%] w-px -translate-x-1/2 bg-[var(--sample-border)]" />
            {[0, 1, 2, 3, 4].map((item) => (
              <span
                className="absolute h-16 w-24 rounded-[64%_36%_64%_36%] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-accent-rgb)_/_0.5)]"
                key={item}
                style={{
                  left: `${18 + item * 12}%`,
                  top: `${18 + (item % 2) * 16}%`,
                  transform: `rotate(${item % 2 ? -18 : 16}deg)`,
                }}
              />
            ))}
            <span className="absolute bottom-4 left-4 right-4 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.86)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Seasonal plant care</span>
          </PhotoSurface>
        </div>
        <NaturalHandmadeBottomStrip compact={compact} items={[["Motif", "Leaf"], ["Product", "Plant"], ["Rhythm", "Alive"]]} />
      </div>
    </SampleFrame>
  );
}

function EcoImpactSystem({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Refill Works" compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />]} links={["Impact", "Refill", "Report"]} sub="Eco system" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[1.08fr_0.92fr]" : "grid-cols-[1.18fr_0.82fr]")}>
          <div className="grid min-h-0 grid-rows-[auto_1fr] gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">Measured impact</p>
              <h3 className={cn("mt-2 font-display font-bold uppercase leading-[0.9]", compact ? "text-2xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Eco Design
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["CO2", "42%"],
                ["Reuse", "88"],
                ["Water", "19L"],
              ].map(([label, value]) => (
                <div className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-3" key={label}>
                  <span className="block text-[8px] uppercase tracking-[0.16em] text-[var(--sample-muted)]">{label}</span>
                  <span className="mt-3 block font-display text-2xl font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-0 border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-3">
            <div className="grid h-full grid-rows-[1fr_auto] gap-3">
              <div className="relative grid place-items-center">
                <span className="h-32 w-32 rounded-full border-[14px] border-[var(--sample-accent)]" />
                <span className="absolute h-20 w-20 rounded-full border-[10px] border-[var(--sample-accent-2)]" />
                <span className="absolute text-[10px] font-bold uppercase tracking-[0.18em]">Refill loop</span>
              </div>
              <span className="border border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--sample-text)]">Read impact report</span>
            </div>
          </div>
        </div>
        <NaturalHandmadeBottomStrip compact={compact} items={[["Signal", "Impact"], ["Tone", "Clear"], ["Action", "Refill"]]} />
      </div>
    </SampleFrame>
  );
}

function RusticLodgeCommerce({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 34px, rgb(var(--st-text-rgb) / 0.12) 34px 36px)" }} />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Timber House" compact={compact} icons={[<IconBag key="bag" size={compact ? 11 : 13} />]} links={["Cabins", "Pantry", "Fire"]} sub="Rustic" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-[0.78fr_1.22fr]")}>
          <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-3">
            <h3 className={cn("font-display font-bold uppercase leading-[0.9]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
              Rustic
            </h3>
            <div className="grid gap-2">
              {["Rough pine", "Cast iron", "Clay mug"].map((item) => (
                <span className="border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.72)] px-3 py-2 text-[9px] uppercase tracking-[0.16em]" key={item}>{item}</span>
              ))}
            </div>
            <span className="h-9 bg-[var(--sample-accent)] text-center text-[10px] font-bold uppercase leading-9 tracking-[0.18em] text-[var(--sample-base)]">Book cabin</span>
          </div>
          <PhotoSurface className="min-h-0 border border-[var(--sample-border)]" scene="material">
            <div className="absolute inset-4 grid grid-rows-4 gap-2">
              {[style.palette.accent, style.palette.accent2, style.palette.accent3, style.palette.surface].map((color, index) => (
                <span className="border border-[var(--sample-border)]" key={color} style={{ backgroundColor: color, transform: `translateX(${index % 2 ? 12 : -4}px)` }} />
              ))}
            </div>
            <span className="absolute bottom-4 left-4 right-4 border border-[var(--sample-border)] bg-[rgb(var(--st-base-rgb)_/_0.84)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Firewood delivery</span>
          </PhotoSurface>
        </div>
        <NaturalHandmadeBottomStrip compact={compact} items={[["Material", "Wood"], ["Color", "Clay"], ["Mood", "Lodge"]]} />
      </div>
    </SampleFrame>
  );
}

function KinfolkSlowJournal({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Quiet Table" compact={compact} links={["Essays", "Homes", "Meals"]} sub="Issue 04" />
        <div className={cn("grid min-h-0 gap-4", compact ? "grid-cols-[1.2fr_0.8fr]" : "grid-cols-[1.28fr_0.72fr]")}>
          <div className="grid min-h-0 grid-rows-[1fr_auto] gap-3">
            <PhotoSurface className="min-h-0 border border-[var(--sample-border-soft)]" grain scene="interior">
              <span className="absolute bottom-4 left-4 max-w-[14rem] bg-[rgb(var(--st-surface-rgb)_/_0.78)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Sunlit table story</span>
            </PhotoSurface>
            <div className="grid grid-cols-3 gap-2">
              {["Home", "Food", "Ritual"].map((item) => (
                <span className="border-t border-[var(--sample-border-soft)] pt-2 text-[9px] uppercase tracking-[0.16em] text-[var(--sample-muted)]" key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="flex min-h-0 flex-col justify-between border-l border-[var(--sample-border-soft)] pl-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">Slow living</p>
              <h3 className={cn("mt-3 font-display font-semibold uppercase leading-[0.9]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Kinfolk
              </h3>
            </div>
            <p className={cn("text-[11px] leading-5 text-[var(--sample-muted)]", compact ? "line-clamp-3" : "")}>Editorial spacing, quiet photography, and a domestic rhythm.</p>
          </div>
        </div>
        <NaturalHandmadeBottomStrip compact={compact} items={[["Pace", "Slow"], ["Light", "Window"], ["Voice", "Editorial"]]} />
      </div>
    </SampleFrame>
  );
}

function HandmadePatchMarket({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Hand Shop" compact={compact} icons={[<IconBag key="bag" size={compact ? 11 : 13} />]} links={["Patch", "Soap", "Paper"]} sub="Small batch" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-[0.72fr_1.28fr]")}>
          <div className="flex min-h-0 flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--sample-muted)]">Made by hand</p>
              <h3 className={cn("mt-3 font-display font-bold uppercase leading-[0.86]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Handmade
              </h3>
            </div>
            <span className="w-fit rotate-[-2deg] border border-dashed border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em]">one of one</span>
          </div>
          <div className="relative min-h-0 border border-dashed border-[var(--sample-border)] bg-[var(--sample-surface)] p-3">
            <div className="grid h-full grid-cols-3 grid-rows-2 gap-2">
              {[style.palette.accent, style.palette.accent2, style.palette.accent3, style.palette.base, style.palette.surface, style.palette.mutedText].map((color, index) => (
                <span
                  className="border border-[var(--sample-border-soft)]"
                  key={`${color}-${index}`}
                  style={{
                    backgroundColor: color,
                    borderStyle: index % 2 ? "dashed" : "solid",
                    transform: `rotate(${[-2, 1, -1, 2, -3, 1][index]}deg)`,
                  }}
                />
              ))}
            </div>
            <span className="absolute bottom-4 left-4 right-4 border border-dashed border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.86)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Stamped paper label</span>
          </div>
        </div>
        <NaturalHandmadeBottomStrip compact={compact} items={[["Edge", "Uneven"], ["Mark", "Stamped"], ["Batch", "Small"]]} />
      </div>
    </SampleFrame>
  );
}

function CraftWorkshopLedger({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Kiln Ledger" compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />]} links={["Clay", "Process", "Shop"]} sub="Craft" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[1fr_0.86fr]" : "grid-cols-[1.16fr_0.84fr]")}>
          <div className="grid min-h-0 grid-rows-[auto_1fr] gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">Process catalog</p>
              <h3 className={cn("mt-2 font-display font-bold uppercase leading-[0.9]", compact ? "text-3xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                Craft
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["01", "Form"],
                ["02", "Fire"],
                ["03", "Glaze"],
              ].map(([step, label]) => (
                <div className="border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3" key={label}>
                  <span className="text-[9px] uppercase tracking-[0.16em] text-[var(--sample-muted)]">{step}</span>
                  <span className="mt-8 block text-[10px] font-bold uppercase tracking-[0.14em]">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <PhotoSurface className="min-h-0 border border-[var(--sample-border-soft)]" scene="product">
            <span className="absolute left-[24%] top-[20%] h-[46%] w-[44%] rounded-[48%_52%_18px_18px] border border-[var(--sample-border)] bg-[rgb(var(--st-accent-rgb)_/_0.58)]" />
            <span className="absolute bottom-[20%] left-[18%] h-8 w-[56%] bg-[var(--sample-accent-2)]" />
            <span className="absolute bottom-4 left-4 right-4 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.84)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Thrown stoneware</span>
          </PhotoSurface>
        </div>
        <NaturalHandmadeBottomStrip compact={compact} items={[["Material", "Clay"], ["Method", "Kiln"], ["Proof", "Process"]]} />
      </div>
    </SampleFrame>
  );
}

function WabiSabiTeaGallery({ className, compact = false, style }: Props) {
  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Stone Tea" bordered={false} compact={compact} links={["Bowls", "Room", "Notes"]} sub="Wabi-Sabi" />
        <div className={cn("grid min-h-0 gap-4", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-[0.72fr_1.28fr]")}>
          <div className="flex min-h-0 flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">Quiet imperfection</p>
              <h3 className={cn("mt-3 font-serif font-normal uppercase leading-[0.9]", compact ? "text-2xl" : "text-5xl")} style={{ letterSpacing: "0em" }}>
                Wabi-Sabi
              </h3>
            </div>
            <p className={cn("text-[11px] leading-5 text-[var(--sample-muted)]", compact ? "line-clamp-2" : "")}>Asymmetry, repaired surfaces, and a low, calm hierarchy.</p>
          </div>
          <div className="relative min-h-0 border border-dashed border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-5">
            <span className="absolute left-[22%] top-[18%] h-[58%] w-[48%] rounded-[44%_56%_52%_48%] bg-[var(--sample-accent)] opacity-75" />
            <span className="absolute left-[34%] top-[22%] h-[48%] w-px rotate-[15deg] bg-[var(--sample-border)]" />
            <span className="absolute left-[44%] top-[30%] h-[32%] w-px rotate-[-18deg] bg-[var(--sample-border)]" />
            <span className="absolute bottom-5 left-5 right-5 border-t border-[var(--sample-border-soft)] pt-3 text-[10px] uppercase tracking-[0.18em] text-[var(--sample-muted)]">Repaired ceramic bowl</span>
          </div>
        </div>
        <NaturalHandmadeBottomStrip compact={compact} items={[["Surface", "Patina"], ["Form", "Asymmetry"], ["Pace", "Quiet"]]} />
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
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--sample-muted)]">soft app</p>
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

function KitschNoveltyDrop({ compact = false, style }: Props) {
  const products = [
    ["olive vase", "$28", style.palette.accent],
    ["market tote", "$34", style.palette.accent2],
    ["sticker book", "$12", style.palette.accent3],
  ] as const;
  const countdown = compact ? ["02", "14"] : ["02", "14", "39"];

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(var(--st-accent-rgb) / 0.14) 0 18px, transparent 18px 36px), repeating-linear-gradient(0deg, rgb(var(--st-accent-2-rgb) / 0.12) 0 16px, transparent 16px 32px)",
        }}
      />
      <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-[var(--sample-accent-2)] opacity-50" />
      <div className="absolute right-7 top-9 h-24 w-5 rotate-12 bg-[var(--sample-accent-3)] opacity-80" />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Clash Cart" compact={compact} icons={[<IconBag key="bag" size={compact ? 11 : 13} />]} links={["Drop", "Home", "Sale"]} sub="novelty market" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.82fr_1.18fr]" : "grid-cols-[0.72fr_1.28fr]")}>
          <section className="flex min-h-0 flex-col justify-between border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-3 shadow-[5px_5px_0_var(--sample-accent-3)]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--sample-accent)]">ODD SHOP DROP</p>
              <h3 className={cn("mt-2 font-display font-black uppercase leading-[0.8]", compact ? "text-2xl" : "text-[3.6rem]")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                LIMITED ODDITIES
              </h3>
              <div className="mt-3 grid grid-cols-3 gap-1 text-center text-[9px] font-black uppercase tracking-[0.1em]">
                {countdown.map((item) => (
                  <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-2" key={item}>{item}</span>
                ))}
              </div>
              <p className="mt-2 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--sample-muted)]">drop countdown</p>
            </div>
            <div className="space-y-2">
              <div className="-rotate-2 border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--sample-base)] shadow-[4px_4px_0_var(--sample-border)]">
                sticker price bursts
              </div>
              <div className="border-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-3 py-2 text-[9px] font-black uppercase tracking-[0.12em]">
                giftable product finder
              </div>
            </div>
          </section>
          <section className="grid min-h-0 grid-rows-[auto_1fr] gap-2">
            <div className="-rotate-1 border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-3 py-2 text-[9px] font-black uppercase tracking-[0.12em] shadow-[3px_3px_0_var(--sample-border)]">
              pattern clash rail / clashing pattern strips
            </div>
            <div className="grid min-h-0 grid-cols-3 gap-2">
              {products.map(([label, price, color], index) => (
                <article className="relative flex min-h-0 flex-col justify-between border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2 shadow-[3px_3px_0_var(--sample-border)]" key={label} style={{ transform: `rotate(${[-2, 2, -1][index]}deg)` }}>
                  <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] text-[8px] font-black">NEW</span>
                  <span className="grid min-h-24 place-items-center border-2 border-[var(--sample-border)] bg-[var(--sample-base)]">
                    <span className="h-16 w-14 rounded-[42%_42%_14px_14px] border-2 border-[var(--sample-border)]" style={{ backgroundColor: color }} />
                  </span>
                  <span className="mt-2 text-[9px] font-black uppercase tracking-[0.1em]">{label}</span>
                  <span className="mt-1 w-fit bg-[var(--sample-text)] px-2 py-1 text-[9px] font-black text-[var(--sample-base)]">{price}</span>
                </article>
              ))}
            </div>
          </section>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[9px] font-black uppercase tracking-[0.12em]">
          {["drop countdown", "pattern clash rail", "giftable product finder"].map((label) => (
            <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2" key={label}>{label}</span>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function KawaiiCharacterClub({ compact = false, style }: Props) {
  const moods = [
    [style.palette.accent, "happy"],
    [style.palette.accent2, "sleepy"],
    [style.palette.accent3, "snack"],
  ] as const;

  return (
    <SampleFrame compact={compact} style={style}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,var(--sample-accent-3)_0_4%,transparent_4%),radial-gradient(circle_at_84%_18%,var(--sample-accent-2)_0_5%,transparent_5%),radial-gradient(circle_at_56%_82%,var(--sample-accent)_0_3%,transparent_3%)] opacity-60" />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav align="center" brand="Friend Cloud" compact={compact} icons={[<IconStar key="star" size={compact ? 11 : 13} />]} links={["Friends", "Shop", "Diary"]} sub="character world" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.92fr_1.08fr]" : "grid-cols-[0.86fr_1.14fr]")}>
          <section className="flex min-h-0 flex-col justify-between rounded-[30px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-4 shadow-[4px_4px_0_var(--sample-accent)]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--sample-accent)]">CHARACTER CLUB</p>
              <h3 className={cn("mt-2 font-display font-black uppercase leading-[0.88]", compact ? "text-2xl" : "text-4xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                FRIEND CLUB DASHBOARD
              </h3>
            </div>
            <div className="relative mx-auto mt-3 h-32 w-32 rounded-[34px] border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)]">
              <span className="absolute -left-4 top-6 h-10 w-10 rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)]" />
              <span className="absolute -right-4 top-6 h-10 w-10 rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)]" />
              <span className="absolute left-9 top-12 h-2 w-2 rounded-full bg-[var(--sample-text)]" />
              <span className="absolute right-9 top-12 h-2 w-2 rounded-full bg-[var(--sample-text)]" />
              <span className="absolute bottom-9 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full bg-[var(--sample-text)]" />
              <span className="absolute -bottom-3 left-1/2 rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-3 py-1 text-[8px] font-black uppercase text-white">heart badges</span>
            </div>
          </section>
          <section className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-3">
            <div className="rounded-[24px] border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-3">
              <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.12em]">
                <span>character mood ring</span>
                <span>stamp rewards</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {moods.map(([color, label]) => (
                  <span className="rounded-full border-2 border-[var(--sample-border)] px-2 py-2 text-center text-[8px] font-black uppercase" key={label} style={{ backgroundColor: color }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {moods.map(([color, label], index) => (
                <div className="rounded-[22px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2 text-center" key={label}>
                  <span className="relative mx-auto block h-12 w-12 rounded-full border-2 border-[var(--sample-border)]" style={{ backgroundColor: color }}>
                    <span className="absolute left-3 top-4 h-1.5 w-1.5 rounded-full bg-[var(--sample-text)]" />
                    <span className="absolute right-3 top-4 h-1.5 w-1.5 rounded-full bg-[var(--sample-text)]" />
                  </span>
                  <span className="mt-2 block text-[9px] font-black uppercase tracking-[0.12em]">mascot tiles</span>
                  {index === 1 ? <span className="mt-1 block rounded-full bg-[var(--sample-accent)] px-2 py-1 text-[8px] font-black text-white">heart badges</span> : null}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {["shop tiny treats", "plush checkout", "friendship stamps"].map((label) => (
                <span className="block rounded-full border-2 border-[var(--sample-border)] bg-white px-3 py-2 text-[9px] font-black uppercase tracking-[0.12em]" key={label}>{label}</span>
              ))}
            </div>
          </section>
        </div>
        <div className="h-4 rounded-full border-2 border-[var(--sample-border)] bg-[linear-gradient(90deg,var(--sample-accent),var(--sample-accent-2),var(--sample-accent-3))]" />
      </div>
    </SampleFrame>
  );
}

function DopamineRewardLoop({ compact = false, style }: Props) {
  const rewards = [
    ["move", "18", style.palette.accent],
    ["learn", "24", style.palette.accent2],
    ["treat", "31", style.palette.accent3],
  ] as const;

  return (
    <SampleFrame compact={compact} style={style}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,var(--sample-accent)_0_8%,transparent_9%),radial-gradient(circle_at_88%_18%,var(--sample-accent-2)_0_10%,transparent_11%),radial-gradient(circle_at_78%_86%,var(--sample-accent-3)_0_12%,transparent_13%)] opacity-35" />
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Color Sprint" compact={compact} icons={[<IconArrow key="arrow" size={compact ? 11 : 13} />]} links={["Start", "Streak", "Store"]} sub="reward UX" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.82fr_1.18fr]" : "grid-cols-[0.76fr_1.24fr]")}>
          <section className="flex min-h-0 flex-col justify-between rounded-[28px] bg-[var(--sample-primary)] p-4 text-[var(--sample-base)] shadow-[0_18px_36px_rgb(var(--st-primary-rgb)_/_0.22)]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--sample-accent-3)]">COLOR REWARD LOOP</p>
              <h3 className={cn("mt-3 font-display font-black uppercase leading-[0.82]", compact ? "text-2xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                STREAK ENERGY ENGINE
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {rewards.map(([label, value, color]) => (
                <span className="rounded-[18px] bg-[rgb(255_255_255_/_0.14)] p-2 text-[9px] font-black uppercase tracking-[0.1em]" key={label}>
                  {label}<strong className="mt-2 block text-2xl" style={{ color }}>{value}</strong>
                </span>
              ))}
            </div>
          </section>
          <section className="grid min-h-0 grid-rows-[auto_1fr] gap-3 rounded-[28px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-4">
            <div>
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.14em]">
                <span>reward meter</span>
                <span>82%</span>
              </div>
              <div className="mt-2 h-4 overflow-hidden rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-base)]">
                <span className="block h-full w-[82%] rounded-full bg-[linear-gradient(90deg,var(--sample-accent),var(--sample-accent-2),var(--sample-accent-3))]" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color, index) => (
                <div className="rounded-[20px] border-2 border-[var(--sample-border)] p-3" key={color} style={{ backgroundColor: color }}>
                  <span className="block text-[9px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)]">{index === 1 ? "color pulse cards" : "dopamine spectrum"}</span>
                  <span className="mt-8 block text-2xl font-black">{index + 1}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {["reward ladder", "habit orbit", "streak boost", "daily prize"].map((label) => (
            <span className="rounded-full border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-3 py-2 text-center text-[9px] font-black uppercase tracking-[0.12em]" key={label}>{label}</span>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function PopArtObjectArchive({ compact = false, style }: Props) {
  const halftone = "radial-gradient(circle, var(--sample-text) 0 12%, transparent 13%)";
  const editions = [style.palette.accent, style.palette.accent2, style.palette.accent3, style.palette.surface] as const;

  return (
    <SampleFrame compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Edition Wall" compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />]} links={["Works", "Store", "Visit"]} sub="archive shop" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.78fr_1.22fr]" : "grid-cols-[0.64fr_1.36fr]")}>
          <section className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent)] p-4 text-[var(--sample-base)]">
            <p className="text-[10px] font-black uppercase tracking-[0.15em]">POP OBJECT ARCHIVE</p>
            <h3 className={cn("mt-3 font-display font-black uppercase leading-[0.78]", compact ? "text-3xl" : "text-6xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
              SERIAL POP WALL
            </h3>
            <p className="mt-4 border-t-[3px] border-[var(--sample-border)] pt-3 text-[9px] font-black uppercase tracking-[0.12em]">museum shop wall</p>
          </section>
          <section className="grid min-h-0 grid-cols-[1fr_0.72fr] gap-3">
            <div className="grid grid-cols-2 gap-2">
              {editions.map((color, index) => (
                <div className="relative border-[3px] border-[var(--sample-border)] p-3" key={`${color}-${index}`} style={{ backgroundColor: color }}>
                  <span className="absolute inset-3 rounded-full border-[3px] border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.72)]" />
                  <span className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-[var(--sample-accent-3)]" style={{ backgroundImage: halftone, backgroundSize: "8px 8px" }} />
                  <span className="relative z-10 text-[9px] font-black uppercase tracking-[0.12em]">repeated object</span>
                  <span className="relative z-10 mt-14 block text-[8px] font-black uppercase tracking-[0.1em]">object edition grid</span>
                </div>
              ))}
            </div>
            <div className="grid min-h-0 grid-rows-[1fr_auto] gap-2 border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-3">
              <div className="min-h-0 bg-[var(--sample-accent-3)]" style={{ backgroundImage: halftone, backgroundSize: compact ? "10px 10px" : "14px 14px" }} />
              <span className="mt-2 block text-[9px] font-black uppercase tracking-[0.12em]">halftone block</span>
            </div>
          </section>
        </div>
        <div className="grid grid-cols-3 border-[3px] border-[var(--sample-border)] text-[9px] font-black uppercase tracking-[0.12em]">
          {["halftone caption rail", "museum shop wall", "object edition grid"].map((label) => (
            <span className="border-r-[3px] border-[var(--sample-border)] px-3 py-2 last:border-r-0" key={label}>{label}</span>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function ComicIssueDrop({ compact = false, style }: Props) {
  return (
    <SampleFrame compact={compact} style={style}>
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, var(--sample-text) 0 10%, transparent 11%)", backgroundSize: "13px 13px" }} />
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Issue Shelf" compact={compact} icons={[<IconSearch key="search" size={compact ? 11 : 13} />]} links={["Issues", "Cast", "Read"]} sub="comic store" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.92fr_1.08fr]" : "grid-cols-[0.84fr_1.16fr]")}>
          <section className="flex min-h-0 flex-col justify-between border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-3 shadow-[5px_5px_0_var(--sample-accent-3)]">
            <div className="border-[3px] border-[var(--sample-border)] bg-[linear-gradient(135deg,var(--sample-accent)_0_48%,var(--sample-accent-2)_48%_100%)] p-3 text-[var(--sample-base)]">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)]">ISSUE DROP</p>
              <h3 className={cn("mt-2 font-display font-black uppercase leading-[0.82] text-[var(--sample-base)]", compact ? "text-2xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                COVER READER SHELF
              </h3>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[9px] font-black uppercase tracking-[0.12em]">
              <span className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-2">creator credit line</span>
              <span className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] px-2 py-2">episode metadata</span>
            </div>
          </section>
          <section className="grid min-h-0 grid-cols-2 grid-rows-[1fr_0.76fr] gap-2">
            <div className="relative col-span-2 border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-2)] p-3">
              <span className="absolute right-4 top-4 rounded-[55%] border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] px-3 py-2 text-[9px] font-black uppercase tracking-[0.1em]">speech balloon</span>
              <span className="absolute bottom-3 left-3 text-[9px] font-black uppercase tracking-[0.12em]">panel preview</span>
            </div>
            <div className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent)] p-3 text-[var(--sample-base)]">
              <span className="block text-[9px] font-black uppercase tracking-[0.12em]">series queue</span>
              <span className="mt-7 block text-3xl font-black">08</span>
            </div>
            <div className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] p-3">
              <span className="block text-[9px] font-black uppercase tracking-[0.12em]">episode metadata</span>
              <span className="mt-7 block text-3xl font-black">7.12</span>
            </div>
          </section>
        </div>
        <div className="grid grid-cols-4 gap-2 text-[9px] font-black uppercase tracking-[0.12em]">
          {["cover shelf", "panel preview", "credit line", "series queue"].map((label) => (
            <span className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-2" key={label}>{label}</span>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function ToyPlaysetBuilder({ compact = false, style }: Props) {
  const blocks = [
    [style.palette.accent, "wide"],
    [style.palette.accent2, "tall"],
    [style.palette.accent3, "wide"],
    [style.palette.surface, "square"],
  ] as const;

  return (
    <SampleFrame compact={compact} style={style}>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(90deg,var(--sample-accent)_0_33%,var(--sample-accent-2)_33%_66%,var(--sample-accent-3)_66%)] opacity-18" />
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Playset Works" compact={compact} icons={[<IconBag key="bag" size={compact ? 11 : 13} />]} links={["Age", "Theme", "Parts"]} sub="toy commerce" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-[0.78fr_1.22fr]")}>
          <section className="flex min-h-0 flex-col justify-between rounded-[20px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-4 shadow-[0_10px_0_rgb(var(--st-text-rgb)_/_0.08)]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--sample-accent)]">PLAYSET BUILDER</p>
              <h3 className={cn("mt-3 font-display font-black uppercase leading-[0.86]", compact ? "text-2xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                MODULAR PLAYSET SHOP
              </h3>
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[var(--sample-muted)]">age range selector</p>
            <div className="grid grid-cols-3 gap-2">
              {["3+", "6+", "9+"].map((label) => (
                <span className="rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-3 py-2 text-center text-[10px] font-black" key={label}>{label}</span>
              ))}
            </div>
          </section>
          <section className="rounded-[24px] border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-4">
            <div className="grid h-full grid-cols-4 grid-rows-3 gap-2 rounded-[18px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-3">
              <span className="col-span-4 text-[9px] font-black uppercase tracking-[0.12em]">assembly tray</span>
              {blocks.map(([color, shape], index) => (
                <span
                  className={cn("relative rounded-[12px] border-2 border-[var(--sample-border)]", shape === "wide" ? "col-span-2" : "", shape === "tall" ? "row-span-2" : "")}
                  key={`${color}-${index}`}
                  style={{ backgroundColor: color }}
                >
                  <span className="absolute left-2 top-2 h-3 w-3 rounded-full border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.5)]" />
                  <span className="absolute right-2 top-2 h-3 w-3 rounded-full border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.5)]" />
                </span>
              ))}
              <span className="col-span-4 text-[9px] font-black uppercase tracking-[0.12em]">block parts</span>
            </div>
          </section>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[9px] font-black uppercase tracking-[0.12em]">
          <span className="rounded-full bg-[var(--sample-accent-3)] px-3 py-2 text-center">instruction rail</span>
          <span className="rounded-full bg-[var(--sample-surface)] px-3 py-2 text-center">build pattern chooser</span>
        </div>
      </div>
    </SampleFrame>
  );
}

function PlayfulOnboardFlow({ compact = false, style }: Props) {
  const tasks = [
    ["choose goal", style.palette.accent],
    ["try prompt", style.palette.accent2],
    ["tiny win", style.palette.accent3],
    ["share note", style.palette.surface],
  ] as const;

  return (
    <SampleFrame compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Guide Garden" bordered={false} compact={compact} icons={[<IconArrow key="arrow" size={compact ? 11 : 13} />]} links={["Plan", "Learn", "Done"]} sub="playful UX" />
        <div className={cn("grid min-h-0 gap-4", compact ? "grid-cols-[0.88fr_1.12fr]" : "grid-cols-[0.72fr_1.28fr]")}>
          <section className="flex min-h-0 flex-col justify-between rounded-[26px] bg-[var(--sample-accent-3)] p-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--sample-text)]">PLAYFUL ONBOARD</p>
              <h3 className={cn("mt-3 font-display font-bold leading-[0.9]", compact ? "text-2xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                GUIDED JOY FLOW
              </h3>
            </div>
            <div className="relative h-20 rounded-[22px] bg-[var(--sample-surface)]">
              <span className="absolute bottom-4 left-5 h-9 w-9 rounded-full bg-[var(--sample-accent)]" />
              <span className="absolute bottom-7 left-9 h-3 w-3 rounded-full bg-[var(--sample-text)]" />
              <span className="absolute bottom-9 left-16 rounded-full bg-[rgb(var(--st-base-rgb)_/_0.72)] px-3 py-1 text-[8px] font-black uppercase tracking-[0.1em]">mascot walkthrough</span>
              <span className="absolute bottom-4 left-16 rounded-full border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-3 py-1 text-[9px] font-black uppercase">mascot helper</span>
            </div>
          </section>
          <section className="grid min-h-0 grid-rows-[auto_1fr] gap-3">
            <div className="flex items-center justify-between rounded-full border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em]">
              <span>gentle task cards</span>
              <span className="text-[var(--sample-accent)]">3/4</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {tasks.map(([label, color]) => (
                <div className="rounded-[24px] border border-[var(--sample-border-soft)] p-4 shadow-[0_10px_22px_rgb(var(--st-text-rgb)_/_0.07)]" key={label} style={{ backgroundColor: color }}>
                  <span className="block h-8 w-8 rounded-full bg-[rgb(var(--st-surface-rgb)_/_0.62)]" />
                  <span className="mt-5 block text-[10px] font-black uppercase tracking-[0.12em]">{label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-center gap-3">
          <div className="h-3 overflow-hidden rounded-full bg-[var(--sample-surface)]">
            <span className="block h-full w-[76%] rounded-full bg-[linear-gradient(90deg,var(--sample-accent),var(--sample-accent-2),var(--sample-accent-3))]" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.12em]">task completion stack / soft progress path</span>
        </div>
      </div>
    </SampleFrame>
  );
}

function PastelSoftEdit({ compact = false, style }: Props) {
  const rows = [
    ["01", "skin tint planner", style.palette.accent],
    ["02", "shade story", style.palette.accent2],
    ["03", "editorial product shelf", style.palette.accent3],
  ] as const;

  return (
    <SampleFrame compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
        <SampleNav brand="Tint Journal" bordered={false} compact={compact} icons={[<IconBag key="bag" size={compact ? 11 : 13} />]} links={["Skin", "Color", "Journal"]} sub="pastel beauty" />
        <div className={cn("grid min-h-0 gap-5", compact ? "grid-cols-[1fr_0.9fr]" : "grid-cols-[1.12fr_0.88fr]")}>
          <section className="flex min-h-0 flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--sample-muted)]">SOFT EDIT</p>
              <h3 className={cn("mt-3 font-serif font-medium leading-[0.92]", compact ? "text-2xl" : "text-5xl")} style={{ letterSpacing: "0em" }}>
                PASTEL BEAUTY EDIT
              </h3>
            </div>
            <div className="space-y-2">
              {rows.map(([num, label, color]) => (
                <div className="grid grid-cols-[48px_1fr_auto] items-center gap-3 rounded-full border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-3 py-2" key={label}>
                  <span className="grid h-8 place-items-center rounded-full text-[9px] font-semibold" style={{ backgroundColor: color }}>{num}</span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--sample-muted)]">{label}</span>
                  <span className="h-2 w-8 rounded-full bg-[var(--sample-accent-2)]" />
                </div>
              ))}
              <p className="text-[9px] uppercase tracking-[0.18em] text-[var(--sample-muted)]">airy product rows / low-contrast set</p>
            </div>
          </section>
          <section className="relative min-h-0 rounded-[34px] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-5 shadow-[0_18px_44px_rgb(var(--st-text-rgb)_/_0.05)]">
            <span className="absolute left-[15%] top-[18%] h-[58%] w-[24%] rounded-[999px] bg-[var(--sample-accent)] shadow-[0_24px_36px_rgb(var(--st-accent-rgb)_/_0.16)]" />
            <span className="absolute left-[39%] top-[28%] h-[48%] w-[24%] rounded-[999px] bg-[var(--sample-accent-2)] shadow-[0_24px_36px_rgb(var(--st-accent-2-rgb)_/_0.14)]" />
            <span className="absolute right-[13%] top-[20%] h-[56%] w-[24%] rounded-[999px] bg-[var(--sample-accent-3)] shadow-[0_24px_36px_rgb(var(--st-accent-3-rgb)_/_0.14)]" />
            <span className="absolute bottom-5 left-5 right-5 rounded-full bg-[var(--sample-base)] px-4 py-3 text-[10px] uppercase tracking-[0.14em] text-[var(--sample-muted)]">editorial product shelf</span>
          </section>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[style.palette.accent, style.palette.accent2, style.palette.accent3, style.palette.surface].map((color) => (
            <span className="h-3 rounded-full border border-[var(--sample-border-soft)]" key={color} style={{ backgroundColor: color }} />
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function BubbleFlowCapsules({ compact = false, style }: Props) {
  const cans = [
    [style.palette.accent, "lime"],
    [style.palette.accent2, "berry"],
    [style.palette.accent3, "melon"],
  ] as const;

  return (
    <SampleFrame compact={compact} style={style}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgb(var(--st-accent-rgb)_/_0.34)_0_9%,transparent_10%),radial-gradient(circle_at_82%_70%,rgb(var(--st-accent-2-rgb)_/_0.32)_0_12%,transparent_13%)]" />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav align="center" brand="Sip Capsule" compact={compact} icons={[<IconStar key="star" size={compact ? 11 : 13} />]} links={["Flavors", "Drops", "Find"]} sub="bubble drink" />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-[0.72fr_1.28fr]")}>
          <section className="flex min-h-0 flex-col justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--sample-primary)]">BUBBLE FLOW</p>
              <h3 className={cn("mt-3 font-display font-black uppercase leading-[0.86]", compact ? "text-2xl" : "text-5xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>
                EFFERVESCENT FLAVOR LAB
              </h3>
            </div>
            <div className="rounded-full border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2">
              <div className="h-6 overflow-hidden rounded-full bg-[var(--sample-base)]">
                <span className="block h-full w-[68%] rounded-full bg-[linear-gradient(90deg,var(--sample-accent),var(--sample-accent-2))]" />
              </div>
              <span className="mt-2 block text-center text-[9px] font-black uppercase tracking-[0.12em]">liquid progress</span>
            </div>
          </section>
          <section className="grid min-h-0 grid-cols-3 gap-2">
            {cans.map(([color, label], index) => (
              <div className="relative flex min-h-0 flex-col justify-end overflow-hidden rounded-[999px] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-3" key={color}>
                <span className="absolute left-1/2 top-[16%] h-16 w-16 -translate-x-1/2 rounded-full opacity-85" style={{ backgroundColor: color }} />
                <span className="absolute left-1/2 top-[46%] h-10 w-10 -translate-x-1/2 rounded-full bg-[rgb(var(--st-surface-rgb)_/_0.68)]" />
                <span className="relative z-10 text-center text-[9px] font-black uppercase tracking-[0.12em]">inflated capsules</span>
                <span className="relative z-10 mt-2 text-center text-2xl font-black">0{index + 1}</span>
                <span className="relative z-10 text-center text-[8px] font-black uppercase tracking-[0.1em]">{label}</span>
              </div>
            ))}
          </section>
        </div>
        <div className="grid grid-cols-4 gap-2 text-[9px] font-black uppercase tracking-[0.12em]">
          {["flavor carousel", "nutrition bubbles", "can shelf", "liquid progress"].map((item) => (
            <span className="rounded-full border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.72)] px-2 py-2 text-center" key={item}>{item}</span>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function StreetwearDropEditorial({ compact = false, style }: Props) {
  const products = [
    ["shell parka", "S-XL", style.palette.accent],
    ["graphic tee", "M-XXL", style.palette.accent2],
    ["camp cap", "OS", style.palette.accent3],
  ] as const;
  const sizes = ["S", "M", "L", "XL"];

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0 47%, var(--sample-accent) 47% 49%, transparent 49%), repeating-linear-gradient(0deg, rgb(var(--st-text-rgb) / 0.1) 0 1px, transparent 1px 18px)",
        }}
      />
      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav
          brand="Block Supply"
          compact={compact}
          icons={[<IconBag key="bag" size={compact ? 11 : 13} />]}
          links={["New", "Lookbook", "Archive"]}
          sub="streetwear drop"
        />
        <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.78fr_1.22fr]" : "grid-cols-[0.66fr_1.34fr]")}>
          <section className="flex min-h-0 min-w-0 flex-col justify-between border-[4px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-4 shadow-[6px_6px_0_var(--sample-accent)]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--sample-accent)]">DROP LEDGER</p>
              <h3 className={cn("mt-3 font-display font-black uppercase leading-[0.78]", compact ? "text-4xl" : "text-6xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.04em" }}>
                DROP 06
              </h3>
              <p className="mt-3 border-t-[3px] border-[var(--sample-border)] pt-3 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--sample-muted)]">streetwear product wall</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-black uppercase tracking-[0.12em]">
              {["10", "00", "14"].map((item) => (
                <span className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] px-2 py-2 text-[var(--sample-base)]" key={item}>{item}</span>
              ))}
              <span className="col-span-3 border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-2 text-[var(--sample-text)]">release clock</span>
            </div>
          </section>
          <section className="grid min-h-0 min-w-0 grid-rows-[1fr_auto] gap-3">
            <div className="grid min-h-0 grid-cols-3 gap-2">
              {products.map(([label, run, color], index) => (
                <article className="relative flex min-h-0 flex-col justify-between border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" key={label}>
                  <span className="absolute right-2 top-2 bg-[var(--sample-text)] px-2 py-1 text-[8px] font-black uppercase text-[var(--sample-base)]">#{index + 1}</span>
                  <span className="grid min-h-24 place-items-center bg-[var(--sample-base)]">
                    <span className="h-20 w-12 border-[3px] border-[var(--sample-border)]" style={{ backgroundColor: color, clipPath: "polygon(18% 0, 82% 0, 100% 22%, 88% 100%, 12% 100%, 0 22%)" }} />
                  </span>
                  <span className="mt-2 text-[8px] font-black uppercase tracking-[0.08em]">{label}</span>
                  <span className="mt-1 text-[8px] font-black uppercase tracking-[0.1em] text-[var(--sample-muted)]">{run}</span>
                </article>
              ))}
            </div>
            <div className="grid grid-cols-[1fr_0.7fr] gap-2">
              <div className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-2)] p-3 text-[var(--sample-text)]">
                <p className="text-[9px] font-black uppercase tracking-[0.14em]">lookbook strip</p>
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {[style.palette.surface, style.palette.accent, style.palette.accent3, style.palette.primary].map((color, index) => (
                    <span className="h-10 border-2 border-[var(--sample-border)]" key={`${color}-${index}`} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] p-3">
                <p className="text-[9px] font-black uppercase tracking-[0.14em]">size run matrix</p>
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {sizes.map((size, index) => (
                    <span className={cn("grid h-8 place-items-center border-2 border-[var(--sample-border)] text-[9px] font-black", index === 2 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-surface)]")} key={size}>
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="grid grid-cols-4 gap-2 text-[9px] font-black uppercase tracking-[0.12em]">
          {["drop ledger", "release clock", "lookbook strip", "size run matrix"].map((label) => (
            <span className="min-w-0 truncate border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-2 text-center" key={label}>{label}</span>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function GraffitiWallArchive({ compact = false, style }: Props) {
  const cans = [
    [style.palette.accent, "oxide"],
    [style.palette.accent2, "chrome"],
    [style.palette.accent3, "signal"],
    [style.palette.primary, "marker"],
  ] as const;
  const tags = ["AERO-17", "KAPS", "YARD-04", "CREW-9"];
  const drips = [10, 28, 74] as const;
  const pins = [
    ["left-[18%] top-[62%]", "yard"],
    ["left-[48%] top-[34%]", "wall"],
    ["left-[73%] top-[53%]", "tunnel"],
  ] as const;

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className="absolute inset-0 opacity-65"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgb(var(--st-text-rgb) / 0.11) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, transparent 0 38px, rgb(var(--st-text-rgb) / 0.1) 38px 40px, transparent 40px 76px)",
        }}
      />
      <div className="absolute -left-12 top-10 h-36 w-36 rotate-[-18deg] rounded-full bg-[var(--sample-accent)] opacity-70 blur-[1px]" />
      <div className="absolute -right-10 bottom-12 h-32 w-32 rotate-[10deg] rounded-full bg-[var(--sample-accent-2)] opacity-55 blur-[2px]" />
      <div className="relative grid h-full min-w-0 grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav
          brand="Wall Index"
          compact={compact}
          icons={[<IconSearch key="search" size={compact ? 11 : 13} />]}
          links={["Walls", "Caps", "Crews"]}
          sub="graffiti wall scanner"
        />
        <div className={cn("grid min-h-0 min-w-0 gap-3", compact ? "grid-cols-[1fr_0.95fr]" : "grid-rows-[1.08fr_0.92fr] sm:grid-cols-[1.05fr_0.95fr] sm:grid-rows-none")}>
          <section
            className="relative min-h-0 min-w-0 overflow-hidden border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] shadow-[5px_5px_0_var(--sample-text)]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(var(--st-surface-rgb) / 0.52), rgb(var(--st-surface-rgb) / 0.32)), url('/generated/design-styles/graffiti-wall-texture.webp')",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, transparent 0 44%, rgb(var(--st-surface-rgb) / 0.72) 44% 56%, transparent 56%), repeating-linear-gradient(12deg, rgb(var(--st-text-rgb) / 0.08) 0 2px, transparent 2px 13px)",
              }}
            />
            {drips.map((left, index) => (
              <span
                aria-hidden="true"
                className="absolute top-0 w-2 rounded-b-full bg-[var(--sample-accent-3)]"
                key={left}
                style={{ height: `${44 + index * 22}px`, left: `${left}%` }}
              />
            ))}
            <div className="relative flex h-full min-h-0 flex-col justify-between p-3">
              <div className="flex items-start justify-between gap-2">
                <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-text)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)]">
                  WALL TAG INDEX
                </span>
                <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)]">
                  scan 142
                </span>
              </div>
              <div className="min-w-0">
                <h3
                  className={cn("whitespace-nowrap font-display font-black uppercase leading-[0.74] text-[var(--sample-accent)]", compact ? "text-[2.45rem]" : "text-[3.8rem] sm:text-[5.8rem]")}
                  style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.06em", textShadow: "4px 4px 0 var(--sample-text), 7px 7px 0 var(--sample-accent-2)" }}
                >
                  TAGS
                </h3>
                <div className="mt-1 flex flex-wrap gap-1">
                  {["chrome fill", "fat cap", "wet wall"].map((label) => (
                    <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.1em]" key={label}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-end gap-2">
                <div className="min-w-0 border-2 border-[var(--sample-border)] bg-[rgb(var(--st-base-rgb)_/_0.86)] p-2">
                  <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-muted)]">graffiti wall scanner</p>
                  <span className="mt-2 block h-2 bg-[var(--sample-text)]">
                    <span className="block h-full w-[67%] bg-[var(--sample-accent-3)]" />
                  </span>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-2)] text-[10px] font-black uppercase text-[var(--sample-text)]">
                  cap
                </span>
              </div>
            </div>
          </section>

          <section className="grid min-h-0 min-w-0 grid-rows-[0.9fr_1.1fr] gap-3">
            <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] p-2">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-[7px] font-black uppercase leading-[1.05] tracking-[0.1em] sm:text-[8px] sm:tracking-[0.14em]">spray color rack</p>
                <span className="bg-[var(--sample-text)] px-2 py-1 text-[8px] font-black uppercase text-[var(--sample-base)]">400ml</span>
              </div>
              <div className="grid h-[calc(100%-1.45rem)] min-h-0 grid-cols-4 gap-1.5">
                {cans.map(([color, label], index) => (
                  <div className="relative flex min-h-0 flex-col justify-end overflow-hidden border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]" key={label}>
                    <span className="absolute left-1/2 top-1 h-[72%] w-[62%] -translate-x-1/2 border-2 border-[var(--sample-border)]" style={{ backgroundColor: color }} />
                    <span className="relative z-10 border-t-2 border-[var(--sample-border)] bg-[var(--sample-text)] py-1 text-center text-[7px] font-black uppercase tracking-[0.08em] text-[var(--sample-base)]">
                      {index + 1}
                    </span>
                    <span className="relative z-10 truncate bg-[var(--sample-base)] px-1 py-1 text-center text-[7px] font-black uppercase">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid min-h-0 min-w-0 grid-cols-[0.92fr_1.08fr] gap-3">
              <div className="min-h-0 min-w-0 overflow-hidden border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-2">
                <p className="mb-1.5 text-[7px] font-black uppercase leading-[1.05] tracking-[0.1em] sm:mb-2 sm:text-[8px] sm:tracking-[0.14em]">crew tag archive</p>
                <div className="grid gap-1">
                  {tags.map((tag, index) => (
                    <span className={cn("flex min-w-0 items-center justify-between border-2 border-[var(--sample-border)] px-1.5 py-1 text-[8px] font-black uppercase", index === 1 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-base)]")} key={tag}>
                      <span className="truncate">{tag}</span>
                      <span className="shrink-0 text-[7px]">{34 + index * 7}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative min-h-0 min-w-0 overflow-hidden border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] p-2 text-[var(--sample-base)]">
                <p className="relative z-10 text-[7px] font-black uppercase leading-[1.05] tracking-[0.1em] sm:text-[8px] sm:tracking-[0.14em]">mural route map</p>
                <span className="absolute left-3 top-1/2 h-[3px] w-[72%] rotate-[-18deg] bg-[var(--sample-accent-3)]" />
                <span className="absolute bottom-5 right-4 h-[3px] w-[55%] rotate-[28deg] bg-[var(--sample-accent)]" />
                {pins.map(([position, label]) => (
                  <span className={cn("absolute grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--sample-base)] bg-[var(--sample-accent)] text-[6px] font-black uppercase text-[var(--sample-text)]", position)} key={label}>
                    {label.slice(0, 2)}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="grid grid-cols-4 gap-2 text-[8px] font-black uppercase tracking-[0.1em]">
          {["wall index", "spray rack", "crew archive", "route map"].map((label) => (
            <span className="min-w-0 truncate border-2 border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.82)] px-2 py-2 text-center" key={label}>{label}</span>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function HipHopMixtapeConsole({ compact = false, style }: Props) {
  const tracks = [
    ["01", "Intro heat", "2:14"],
    ["02", "City verse", "3:08"],
    ["03", "Low end", "2:57"],
    ["04", "Outro cuts", "1:46"],
  ] as const;
  const pads = [
    style.palette.accent,
    style.palette.accent2,
    style.palette.accent3,
    style.palette.primary,
    style.palette.surface,
    style.palette.base,
  ];
  const bars = [58, 24, 82, 43, 68, 31, 76, 49, 91, 35, 64, 52] as const;

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(var(--st-text-rgb) / 0.9), rgb(var(--st-text-rgb) / 0.42)), url('/generated/design-styles/hiphop-mixtape-console.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 opacity-35" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 19px, rgb(var(--st-surface-rgb) / 0.14) 19px 20px)" }} />
      <div className="relative grid h-full min-w-0 grid-rows-[auto_1fr_auto] gap-3 text-[var(--sample-base)]">
        <SampleNav
          brand="Verse Radio"
          bordered={false}
          compact={compact}
          icons={[<IconSearch key="search" size={compact ? 11 : 13} />]}
          links={["Tracks", "Videos", "Lyrics"]}
          sub="release waveform"
        />
        <div className={cn("grid min-h-0 min-w-0 gap-3", compact ? "grid-cols-[1fr_0.94fr]" : "grid-rows-[1.02fr_0.98fr] sm:grid-cols-[1.04fr_0.96fr] sm:grid-rows-none")}>
          <section className="relative min-h-0 min-w-0 overflow-hidden border-[3px] border-[var(--sample-base)] bg-[rgb(var(--st-text-rgb)_/_0.68)] p-3 shadow-[5px_5px_0_var(--sample-accent)]">
            <div className="absolute right-3 top-3 border-2 border-[var(--sample-base)] bg-[var(--sample-accent-3)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)]">
              live 88
            </div>
            <div className="flex h-full min-h-0 flex-col justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--sample-accent-3)]">TRACKLIST INDEX</p>
                <h3
                  className={cn("mt-3 whitespace-nowrap font-display font-black uppercase leading-[0.72] text-[var(--sample-base)]", compact ? "text-[2.6rem]" : "text-[4rem] sm:text-[6rem]")}
                  style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.06em", textShadow: "4px 4px 0 var(--sample-accent), 8px 8px 0 var(--sample-text)" }}
                >
                  BARS
                </h3>
                <div className="mt-3 flex items-end gap-1 border-2 border-[var(--sample-base)] bg-[rgb(var(--st-text-rgb)_/_0.72)] p-2">
                  {bars.map((height, index) => (
                    <span className="flex-1 bg-[var(--sample-accent-3)]" key={`${height}-${index}`} style={{ height: `${Math.max(10, Math.round(height / 2))}px` }} />
                  ))}
                </div>
                <p className="mt-1 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)]">release waveform</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="border-2 border-[var(--sample-base)] bg-[var(--sample-accent)] p-2 text-[var(--sample-text)]">
                  <p className="text-[8px] font-black uppercase tracking-[0.12em]">artist card stack</p>
                  <div className="mt-2 grid grid-cols-3 gap-1">
                    {[style.palette.accent2, style.palette.accent3, style.palette.base].map((color, index) => (
                      <span className="h-8 border-2 border-[var(--sample-text)]" key={`${color}-${index}`} style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
                <div className="border-2 border-[var(--sample-base)] bg-[rgb(var(--st-surface-rgb)_/_0.88)] p-2 text-[var(--sample-text)]">
                  <p className="text-[8px] font-black uppercase tracking-[0.12em]">lyric annotation rail</p>
                  <span className="mt-2 block h-2 w-[88%] bg-[var(--sample-accent-3)]" />
                  <span className="mt-1 block h-2 w-[58%] bg-[var(--sample-text)]" />
                </div>
              </div>
            </div>
          </section>

          <section className="grid min-h-0 min-w-0 grid-rows-[0.9fr_1.1fr] gap-3">
            <div className="grid min-h-0 min-w-0 grid-cols-[1fr_0.76fr] gap-3">
              <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-base)] bg-[rgb(var(--st-surface-rgb)_/_0.92)] p-2 text-[var(--sample-text)]">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-[8px] font-black uppercase tracking-[0.12em]">tracklist index</p>
                  <span className="bg-[var(--sample-text)] px-2 py-1 text-[7px] font-black uppercase text-[var(--sample-base)]">side a</span>
                </div>
                <div className="grid gap-1">
                  {tracks.map(([num, title, time], index) => (
                    <span className={cn("grid grid-cols-[auto_1fr_auto] gap-2 border-2 border-[var(--sample-text)] px-1.5 py-1 text-[8px] font-black uppercase", index === 1 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-base)]")} key={title}>
                      <span>{num}</span>
                      <span className="min-w-0 truncate">{title}</span>
                      <span>{time}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-base)] bg-[var(--sample-text)] p-2">
                <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-3)]">beat grid mixer</p>
                <div className="mt-2 grid h-[calc(100%-1.35rem)] min-h-0 grid-cols-3 gap-1.5">
                  {pads.map((color, index) => (
                    <span className="border-2 border-[var(--sample-base)]" key={`${color}-${index}`} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid min-h-0 min-w-0 grid-cols-[0.86fr_1.14fr] gap-3">
              <div className="relative min-h-0 min-w-0 overflow-hidden border-[3px] border-[var(--sample-base)] bg-[var(--sample-accent-2)] p-2 text-[var(--sample-base)]">
                <p className="relative z-10 text-[8px] font-black uppercase tracking-[0.12em]">artist card stack</p>
                <div className="absolute bottom-3 left-3 h-14 w-14 rounded-full border-[3px] border-[var(--sample-base)] bg-[var(--sample-text)]" />
                <div className="absolute bottom-6 right-4 h-20 w-12 border-[3px] border-[var(--sample-base)] bg-[var(--sample-accent)]" />
                <span className="absolute left-3 top-9 bg-[var(--sample-base)] px-2 py-1 text-[7px] font-black uppercase text-[var(--sample-text)]">artist 24</span>
              </div>
              <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-base)] bg-[rgb(var(--st-text-rgb)_/_0.72)] p-2">
                <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-3)]">lyric annotation rail</p>
                <div className="mt-2 grid gap-1.5">
                  {["bar highlight", "context card", "reader note"].map((label, index) => (
                    <span className={cn("grid grid-cols-[auto_1fr] items-center gap-2 border-2 border-[var(--sample-base)] px-2 py-1 text-[8px] font-black uppercase", index === 0 ? "bg-[var(--sample-accent-3)] text-[var(--sample-text)]" : "bg-[rgb(var(--st-surface-rgb)_/_0.92)] text-[var(--sample-text)]")} key={label}>
                      <span>{index + 1}</span>
                      <span className="min-w-0 truncate">{label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="grid grid-cols-4 gap-2 text-[8px] font-black uppercase tracking-[0.1em] text-[var(--sample-base)]">
          {["tracklist", "beat grid", "artist cards", "lyric rail"].map((label) => (
            <span className="min-w-0 truncate border-2 border-[var(--sample-base)] bg-[rgb(var(--st-text-rgb)_/_0.72)] px-2 py-2 text-center" key={label}>{label}</span>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function SkateCultureSpotBoard({ compact = false, style }: Props) {
  const deckColors = [style.palette.accent, style.palette.accent2, style.palette.accent3, style.palette.primary];
  const clips = ["roll in", "ledge", "kickflip", "manual"];
  const checklist = [
    ["curb wax", "ok"],
    ["rail line", "dry"],
    ["deck wall", "new"],
    ["spot light", "4pm"],
  ] as const;
  const stickers = ["shop", "crew", "vx", "spot"];

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 62%, rgb(var(--st-surface-rgb) / 0.58) 0 0.5%, transparent 16%), radial-gradient(circle at 72% 28%, rgb(var(--st-text-rgb) / 0.2) 0 0.5%, transparent 18%), linear-gradient(128deg, var(--sample-surface) 0 48%, color-mix(in srgb, var(--sample-accent-2) 44%, var(--sample-base)) 48% 54%, var(--sample-base) 54% 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgb(var(--st-text-rgb) / 0.12) 0 1px, transparent 1px 17px), repeating-linear-gradient(90deg, transparent 0 31px, rgb(var(--st-text-rgb) / 0.1) 31px 32px)",
        }}
      />
      <div className="absolute -left-16 bottom-4 h-36 w-64 rotate-[-16deg] rounded-[50%] border-[10px] border-[var(--sample-text)] opacity-35" />
      <div className="relative grid h-full min-w-0 grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav
          brand="Spot Ledger"
          compact={compact}
          icons={[<IconSearch key="search" size={compact ? 11 : 13} />]}
          links={["Clips", "Decks", "Spots"]}
          sub="clip sequence rail"
        />
        <div className={cn("grid min-h-0 min-w-0 gap-3", compact ? "grid-cols-[1fr_0.94fr]" : "grid-rows-[1fr_0.95fr] sm:grid-cols-[1.08fr_0.92fr] sm:grid-rows-none")}>
          <section className="relative min-h-0 min-w-0 overflow-hidden border-[3px] border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.82)] p-3 shadow-[5px_5px_0_var(--sample-accent)]">
            <span className="absolute -right-10 top-8 h-28 w-28 rounded-full border-[12px] border-[var(--sample-accent-3)] opacity-70" />
            <span className="absolute bottom-5 left-5 h-2 w-[72%] rotate-[-12deg] bg-[var(--sample-accent)]" />
            <div className="relative flex h-full min-h-0 flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-text)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)]">
                  SPOT CHECKLIST
                </span>
                <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-1 text-[8px] font-black uppercase text-[var(--sample-text)]">
                  session 05
                </span>
              </div>
              <div>
                <h3
                  className={cn("whitespace-nowrap font-display font-black uppercase leading-[0.72] text-[var(--sample-text)]", compact ? "text-[2.35rem]" : "text-[3.9rem] sm:text-[5.8rem]")}
                  style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.06em", textShadow: "4px 4px 0 var(--sample-accent-3), 7px 7px 0 var(--sample-accent)" }}
                >
                  SPOT
                </h3>
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {clips.map((clip, index) => (
                    <span className={cn("border-2 border-[var(--sample-border)] px-1 py-1 text-center text-[7px] font-black uppercase", index === 2 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-base)]")} key={clip}>
                      {clip}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-end gap-2">
                <div className="border-2 border-[var(--sample-border)] bg-[rgb(var(--st-base-rgb)_/_0.78)] p-2">
                  <p className="text-[8px] font-black uppercase tracking-[0.12em]">trick line map</p>
                  <div className="relative mt-2 h-12 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]">
                    <span className="absolute left-3 top-7 h-[3px] w-[72%] rotate-[-14deg] bg-[var(--sample-text)]" />
                    <span className="absolute left-[22%] top-3 h-4 w-4 rounded-full bg-[var(--sample-accent)]" />
                    <span className="absolute left-[55%] top-5 h-4 w-4 rounded-full bg-[var(--sample-accent-3)]" />
                    <span className="absolute right-4 top-2 h-4 w-4 rounded-full bg-[var(--sample-accent-2)]" />
                  </div>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-full border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] text-[8px] font-black uppercase text-[var(--sample-base)]">
                  fisheye
                </span>
              </div>
            </div>
          </section>

          <section className="grid min-h-0 min-w-0 grid-rows-[0.92fr_1.08fr] gap-3">
            <div className="grid min-h-0 min-w-0 grid-cols-[1fr_0.78fr] gap-3">
              <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] p-2">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-[8px] font-black uppercase tracking-[0.12em]">deck wall grid</p>
                  <span className="bg-[var(--sample-text)] px-2 py-1 text-[7px] font-black uppercase text-[var(--sample-base)]">8.25</span>
                </div>
                <div className="grid h-[calc(100%-1.35rem)] min-h-0 grid-cols-4 gap-1.5">
                  {deckColors.map((color, index) => (
                    <span className="relative overflow-hidden rounded-[999px] border-2 border-[var(--sample-border)]" key={`${color}-${index}`} style={{ backgroundColor: color }}>
                      <span className="absolute inset-x-1 top-2 h-1 rounded-full bg-[var(--sample-base)] opacity-75" />
                      <span className="absolute inset-x-1 bottom-2 h-1 rounded-full bg-[var(--sample-text)] opacity-65" />
                    </span>
                  ))}
                </div>
              </div>
              <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] p-2 text-[var(--sample-base)]">
                <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-3)]">sticker slap index</p>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {stickers.map((label, index) => (
                    <span className={cn("rotate-[-4deg] border-2 border-[var(--sample-base)] px-1 py-2 text-center text-[7px] font-black uppercase", index % 2 ? "bg-[var(--sample-accent-3)] text-[var(--sample-text)]" : "bg-[var(--sample-base)] text-[var(--sample-text)]")} key={label}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid min-h-0 min-w-0 grid-cols-[0.88fr_1.12fr] gap-3">
              <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.88)] p-2">
                <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em]">spot checklist</p>
                <div className="grid gap-1">
                  {checklist.map(([label, value], index) => (
                    <span className={cn("grid grid-cols-[1fr_auto] gap-2 border-2 border-[var(--sample-border)] px-1.5 py-1 text-[8px] font-black uppercase", index === 2 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-base)]")} key={label}>
                      <span className="min-w-0 truncate">{label}</span>
                      <span>{value}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-2)] p-2">
                <p className="text-[8px] font-black uppercase tracking-[0.12em]">clip sequence rail</p>
                <div className="mt-2 grid h-[calc(100%-1.35rem)] min-h-0 grid-cols-4 gap-1.5">
                  {clips.map((clip, index) => (
                    <span className="relative overflow-hidden border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]" key={clip}>
                      <span className="absolute inset-x-2 bottom-2 h-1 bg-[var(--sample-text)]" />
                      <span className="absolute left-1/2 top-[28%] h-7 w-5 -translate-x-1/2 rounded-t-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent)]" />
                      <span className="absolute left-1 top-1 bg-[var(--sample-text)] px-1 text-[6px] font-black uppercase text-[var(--sample-base)]">{index + 1}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="grid grid-cols-4 gap-2 text-[8px] font-black uppercase tracking-[0.1em]">
          {["spot list", "deck wall", "trick map", "clip rail"].map((label) => (
            <span className="min-w-0 truncate border-2 border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.82)] px-2 py-2 text-center" key={label}>{label}</span>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function PunkZineDispatch({ compact = false, style }: Props) {
  const issues = [
    ["A", "no venue"],
    ["B", "new 7in"],
    ["C", "riot note"],
    ["D", "tour van"],
  ] as const;
  const flyers = ["basement", "matinee", "all ages", "benefit"];
  const patches = ["diy", "loud", "anti", "raw", "zine", "mail"];

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className="relative h-full min-w-0"
        style={{
          "--sample-accent": "#ef2b23",
          "--sample-accent-2": "#f3eee2",
          "--sample-accent-3": "#d8ff2f",
          "--sample-base": "#f7f1e6",
          "--sample-border": "#111111",
          "--sample-border-soft": "#11111133",
          "--sample-muted": "#4b4138",
          "--sample-surface": "#fffaf0",
          "--sample-text": "#111111",
        } as SampleVariables}
      >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "repeating-linear-gradient(2deg, rgb(var(--st-text-rgb) / 0.1) 0 1px, transparent 1px 10px), repeating-linear-gradient(92deg, transparent 0 16px, rgb(var(--st-text-rgb) / 0.08) 16px 17px), linear-gradient(135deg, var(--sample-base), var(--sample-surface))",
        }}
      />
      <div className="absolute -left-10 top-16 h-32 w-56 rotate-[-8deg] border-[6px] border-[var(--sample-text)] bg-[var(--sample-accent)] opacity-80" />
      <div className="absolute -right-8 bottom-10 h-40 w-40 rotate-[13deg] border-[5px] border-[var(--sample-text)] bg-[var(--sample-accent-3)] opacity-75" />
      <div className="relative grid h-full min-w-0 grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav
          brand="Riot Press"
          bordered={false}
          compact={compact}
          icons={[<IconSearch key="search" size={compact ? 11 : 13} />]}
          links={["Zine", "Shows"]}
          sub="photocopy noise field"
        />
        <div className={cn("grid min-h-0 min-w-0 gap-3", compact ? "grid-cols-[1fr_0.94fr]" : "grid-rows-[1.05fr_0.95fr] sm:grid-cols-[1.06fr_0.94fr] sm:grid-rows-none")}>
          <section className="relative min-h-0 min-w-0 overflow-hidden border-[4px] border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.88)] p-3 shadow-[6px_6px_0_var(--sample-text)]">
            <div className="absolute inset-0 opacity-45" style={{ backgroundImage: GRAIN_URI, backgroundSize: "90px 90px" }} />
            <span className="absolute right-4 top-12 h-20 w-20 rotate-[12deg] border-[4px] border-[var(--sample-border)] bg-[var(--sample-accent-3)]" />
            <span className="absolute bottom-4 left-8 h-4 w-[82%] rotate-[-7deg] bg-[var(--sample-accent)]" />
            <div className="relative flex h-full min-h-0 flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <span className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)]">
                  ZINE DISPATCH
                </span>
                <span className="rotate-[4deg] border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-1 text-[8px] font-black uppercase text-[var(--sample-text)]">
                  issue 13
                </span>
              </div>
              <div>
                <p className="mb-2 text-[8px] font-black uppercase tracking-[0.14em]">ransom headline stack</p>
                <h3
                  className={cn("flex flex-wrap items-center gap-1 font-display font-black uppercase leading-[0.82] text-[var(--sample-text)]", compact ? "text-[2.1rem]" : "text-[3.5rem] sm:text-[5.3rem]")}
                  style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.05em" }}
                >
                  <span className="rotate-[-3deg] bg-[var(--sample-text)] px-2 text-[var(--sample-base)]">NO</span>
                  <span className="rotate-[2deg] bg-[var(--sample-accent)] px-2">RULES</span>
                </h3>
                <div className="mt-3 grid grid-cols-4 gap-1">
                  {flyers.map((flyer, index) => (
                    <span className={cn("border-[3px] border-[var(--sample-border)] px-1 py-1 text-center text-[7px] font-black uppercase", index === 2 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-base)]")} key={flyer}>
                      {flyer}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-end gap-2">
                <div className="border-[3px] border-[var(--sample-border)] bg-[rgb(var(--st-base-rgb)_/_0.86)] p-2">
                  <p className="text-[8px] font-black uppercase tracking-[0.12em]">photocopy noise field</p>
                  <div className="mt-2 grid grid-cols-6 gap-1">
                    {[0, 1, 2, 3, 4, 5].map((item) => (
                      <span className={cn("h-5 border-2 border-[var(--sample-border)]", item % 2 ? "bg-[var(--sample-text)]" : "bg-[var(--sample-base)]")} key={item} />
                    ))}
                  </div>
                </div>
                <span className="grid h-12 w-12 rotate-[-8deg] place-items-center border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] text-[8px] font-black uppercase text-[var(--sample-base)]">
                  xerox
                </span>
              </div>
            </div>
          </section>

          <section className="grid min-h-0 min-w-0 grid-rows-[0.9fr_1.1fr] gap-3">
            <div className="grid min-h-0 min-w-0 grid-cols-[0.94fr_1.06fr] gap-3">
              <div className="min-h-0 min-w-0 border-[4px] border-[var(--sample-border)] bg-[var(--sample-base)] p-2">
                <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em]">gig flyer rail</p>
                <div className="grid h-[calc(100%-1.35rem)] min-h-0 grid-cols-2 gap-1.5">
                  {flyers.map((flyer, index) => (
                    <span className={cn("relative border-[3px] border-[var(--sample-border)] p-1 text-[7px] font-black uppercase", index === 1 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-surface)]")} key={flyer}>
                      <span className="block rotate-[-3deg] bg-[var(--sample-text)] px-1 py-0.5 text-[var(--sample-base)]">{flyer}</span>
                      <span className="absolute bottom-1 left-1 right-1 h-1 bg-[var(--sample-accent)]" />
                    </span>
                  ))}
                </div>
              </div>
              <div className="min-h-0 min-w-0 border-[4px] border-[var(--sample-border)] bg-[var(--sample-text)] p-2 text-[var(--sample-base)]">
                <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-3)]">patch badge grid</p>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {patches.map((patch, index) => (
                    <span className={cn("rounded-full border-2 border-[var(--sample-base)] px-1 py-2 text-center text-[7px] font-black uppercase", index % 2 ? "bg-[var(--sample-accent)] text-[var(--sample-text)]" : "bg-[var(--sample-base)] text-[var(--sample-text)]")} key={patch}>
                      {patch}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid min-h-0 min-w-0 grid-cols-[0.88fr_1.12fr] gap-3">
              <div className="min-h-0 min-w-0 border-[4px] border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.9)] p-2">
                <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em]">release ledger</p>
                <div className="grid gap-1">
                  {issues.map(([issue, label], index) => (
                    <span className={cn("grid grid-cols-[auto_1fr] gap-2 border-[3px] border-[var(--sample-border)] px-1.5 py-1 text-[8px] font-black uppercase", index === 2 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-base)]")} key={label}>
                      <span>{issue}</span>
                      <span className="min-w-0 truncate">{label}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative min-h-0 min-w-0 overflow-hidden border-[4px] border-[var(--sample-border)] bg-[var(--sample-accent)] p-2">
                <p className="relative z-10 text-[8px] font-black uppercase tracking-[0.12em]">ransom headline stack</p>
                <div className="absolute left-4 top-9 rotate-[-8deg] bg-[var(--sample-base)] px-2 py-1 text-[10px] font-black uppercase">basement</div>
                <div className="absolute right-4 top-16 rotate-[6deg] bg-[var(--sample-text)] px-2 py-1 text-[10px] font-black uppercase text-[var(--sample-base)]">flyer</div>
                <div className="absolute bottom-4 left-5 right-5 h-8 rotate-[-3deg] border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)]" />
              </div>
            </div>
          </section>
        </div>
        <div className="grid grid-cols-4 gap-2 text-[8px] font-black uppercase tracking-[0.1em]">
          {["zine dispatch", "gig rail", "patch grid", "xerox field"].map((label) => (
            <span className="min-w-0 truncate border-[3px] border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.84)] px-2 py-2 text-center" key={label}>{label}</span>
          ))}
        </div>
      </div>
      </div>
    </SampleFrame>
  );
}

function GrungeTapeArchive({ compact = false, style }: Props) {
  const tapes = ["side a", "live 91", "demo", "room mic"];
  const photos = ["amp", "set", "floor"];
  const log = [
    ["01", "wet cable"],
    ["02", "basement"],
    ["03", "broken mic"],
    ["04", "late van"],
  ] as const;

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className="relative h-full min-w-0"
        style={{
          "--sample-accent": "#8a5f3b",
          "--sample-accent-2": "#5d6b5a",
          "--sample-accent-3": "#87929d",
          "--sample-base": "#d8d0c3",
          "--sample-border": "#1c1a17",
          "--sample-border-soft": "#1c1a1733",
          "--sample-muted": "#5a524a",
          "--sample-surface": "#ece4d7",
          "--sample-text": "#191714",
        } as SampleVariables}
      >
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(70% 80% at 8% 8%, rgb(93 107 90 / 0.32), transparent 58%), radial-gradient(80% 75% at 92% 104%, rgb(138 95 59 / 0.36), transparent 55%), linear-gradient(135deg, var(--sample-base), var(--sample-surface))",
          }}
        />
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: GRAIN_URI, backgroundSize: "115px 115px" }} />
        <div
          className="absolute -right-10 top-16 h-40 w-48 rotate-[8deg] border-[3px] border-[var(--sample-border)] opacity-35"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 14px, rgb(28 26 23 / 0.58) 14px 17px), repeating-linear-gradient(90deg, transparent 0 20px, rgb(93 107 90 / 0.72) 20px 24px), linear-gradient(135deg, rgb(135 146 157 / 0.9), rgb(216 208 195 / 0.92))",
          }}
        />
        <div className="absolute bottom-4 left-2 top-14 z-20 grid w-9 place-items-center border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] text-[7px] font-black uppercase tracking-[0.18em] text-[var(--sample-base)] [writing-mode:vertical-rl]">
          torn archive spine
        </div>
        <div className="relative grid h-full min-w-0 grid-rows-[auto_1fr_auto] gap-3">
          <SampleNav
            brand="Basement Archive"
            bordered={false}
            className="pl-12"
            compact={compact}
            icons={[<IconSearch key="search" size={compact ? 11 : 13} />]}
            links={["Archive", "Shows"]}
            sub="flannel texture board"
          />
          <div className={cn("grid min-h-0 min-w-0 gap-3 pl-12", compact ? "grid-cols-[0.82fr_1.18fr]" : "grid-rows-none sm:grid-cols-[0.78fr_1.22fr]")}>
            <section className="relative min-h-0 min-w-0 rotate-[-1deg] overflow-hidden border-[3px] border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.84)] p-3 shadow-[7px_7px_0_rgb(28_26_23_/_0.5)]">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: GRAIN_URI, backgroundSize: "70px 70px" }} />
              <span className="absolute -right-8 top-10 h-24 w-32 rotate-[9deg] border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] opacity-75" />
              <span className="absolute bottom-8 left-4 h-5 w-[78%] rotate-[-4deg] bg-[var(--sample-accent)] opacity-80" />
              <div className="relative flex h-full min-h-0 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <span className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)]">
                    DISTORTED ARCHIVE
                  </span>
                  <span className="rotate-[3deg] border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] px-2 py-1 text-[8px] font-black uppercase text-[var(--sample-text)]">
                    seattle 91
                  </span>
                </div>
                <div>
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.14em]">torn photo stack</p>
                  <h3
                    className={cn("font-display font-black uppercase leading-[0.86] text-[var(--sample-text)]", compact ? "text-[2.3rem]" : "text-[3.7rem] sm:text-[5.1rem]")}
                    style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}
                  >
                    DUST
                    <span className="block text-[var(--sample-accent)]">TAPE</span>
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <span
                      className={cn("relative h-16 overflow-hidden border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] p-1", index === 1 ? "rotate-[2deg]" : "rotate-[-2deg]")}
                      key={photo}
                    >
                      <span className="block h-full bg-[var(--sample-text)] opacity-80" />
                      <span className="absolute bottom-1 left-1 right-1 bg-[var(--sample-base)] px-1 text-[7px] font-black uppercase text-[var(--sample-text)]">{photo}</span>
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid min-h-0 min-w-0 rotate-[1deg] grid-cols-[0.9fr_1.1fr] grid-rows-none gap-3">
              <div className="grid min-h-0 min-w-0 grid-cols-[1.05fr_0.95fr] gap-3">
                <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] p-2 text-[var(--sample-base)]">
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-3)]">cassette setlist rail</p>
                  <div className="grid h-[calc(100%-1.35rem)] min-h-0 gap-1">
                    {tapes.map((tape, index) => (
                      <span className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-2 border-[var(--sample-base)] bg-[rgb(216_208_195_/_0.12)] px-1.5 py-1 text-[7px] font-black uppercase" key={tape}>
                        <span>{index + 1}</span>
                        <span className="min-w-0 truncate">{tape}</span>
                        <span className="h-3 w-3 rounded-full border border-[var(--sample-base)]" />
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="min-h-0 min-w-0 border-[3px] border-[var(--sample-border)] p-2"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgb(93 107 90 / 0.88) 0 13px, rgb(28 26 23 / 0.82) 13px 17px, rgb(216 208 195 / 0.72) 17px 31px), repeating-linear-gradient(90deg, transparent 0 16px, rgb(138 95 59 / 0.72) 16px 20px)",
                  }}
                >
                  <p className="bg-[var(--sample-base)] px-1.5 py-1 text-[8px] font-black uppercase tracking-[0.12em]">flannel texture board</p>
                </div>
              </div>

              <div className="grid min-h-0 min-w-0 grid-rows-[0.92fr_1.08fr] gap-3">
                <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] p-2">
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em]">basement gig log</p>
                  <div className="grid gap-1">
                    {log.map(([code, label], index) => (
                      <span className={cn("grid grid-cols-[auto_1fr] gap-2 border-2 border-[var(--sample-border)] px-1.5 py-1 text-[7px] font-black uppercase", index === 1 ? "bg-[var(--sample-accent-2)] text-[var(--sample-base)]" : "bg-[var(--sample-surface)]")} key={label}>
                        <span>{code}</span>
                        <span className="min-w-0 truncate">{label}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-0 min-w-0 overflow-hidden border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] p-2">
                  <p className="relative z-10 text-[8px] font-black uppercase tracking-[0.12em]">tape sleeve index</p>
                  <span className="absolute left-4 top-10 h-16 w-28 rotate-[-7deg] border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)]" />
                  <span className="absolute right-4 top-16 h-12 w-24 rotate-[5deg] border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)]" />
                  <span className="absolute bottom-4 left-6 right-5 h-8 rotate-[-2deg] bg-[var(--sample-text)] opacity-80" />
                </div>
              </div>
            </section>
          </div>
          <div className="ml-12 grid grid-cols-[1.2fr_0.8fr_1fr] gap-2 text-[8px] font-black uppercase tracking-[0.1em]">
            {["archive", "photo stack", "setlist rail", "gig log"].map((label) => (
              <span className="min-w-0 truncate border-[3px] border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.82)] px-2 py-2 text-center" key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function IndieSleazeFlashFeed({ compact = false, style }: Props) {
  const photos = ["bathroom", "taxi", "door", "mirror", "dj", "coat"];
  const stamps = ["guest", "2am", "vip", "back"];
  const tracks = [
    ["01", "bloghaus"],
    ["02", "camera flash"],
    ["03", "black denim"],
    ["04", "afterparty"],
  ] as const;
  const tags = ["liquid liner", "skinny scarf", "silver chain", "patent boot"];

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className="relative h-full min-w-0"
        style={{
          "--sample-accent": "#ff2f92",
          "--sample-accent-2": "#13c9ff",
          "--sample-accent-3": "#d8ff3e",
          "--sample-base": "#f4f0e8",
          "--sample-border": "#0b0b0b",
          "--sample-border-soft": "#0b0b0b33",
          "--sample-muted": "#5f5b66",
          "--sample-surface": "#ffffff",
          "--sample-text": "#0b0b0b",
        } as SampleVariables}
      >
        <div className="absolute inset-0 bg-[var(--sample-text)]" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(42% 38% at 22% 20%, rgb(255 255 255 / 0.92), transparent 45%), radial-gradient(50% 52% at 90% 8%, rgb(19 201 255 / 0.32), transparent 52%), radial-gradient(60% 62% at 18% 104%, rgb(255 47 146 / 0.38), transparent 58%)",
          }}
        />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: GRAIN_URI, backgroundSize: "86px 86px" }} />
        <div className="absolute inset-y-16 left-2 z-20 grid w-12 grid-rows-6 gap-1 border-[3px] border-[var(--sample-base)] bg-[var(--sample-text)] p-1">
          {photos.map((photo) => (
            <span className="grid place-items-center overflow-hidden border border-[var(--sample-base)] bg-[radial-gradient(circle_at_28%_22%,white_0_8%,rgb(255_47_146)_9%_22%,rgb(9_9_9)_23%_100%)] text-[0]" key={`strip-${photo}`}>
              {photo}
            </span>
          ))}
        </div>
        <div className="relative grid h-full min-w-0 grid-rows-[auto_1fr_auto] gap-3 text-[var(--sample-base)]">
          <div
            style={{
              "--sample-muted": "#b8b1c3",
              "--sample-text": "#f4f0e8",
            } as SampleVariables}
          >
            <SampleNav
              brand="Flash Trash"
              bordered={false}
              compact={compact}
              icons={[<IconSearch key="search" size={compact ? 11 : 13} />]}
              links={["Photos", "Fits"]}
              sub="club stamp rail"
            />
          </div>
          <div className={cn("grid min-h-0 min-w-0 gap-3 pl-14", compact ? "grid-cols-[1.2fr_0.8fr]" : "grid-rows-none sm:grid-cols-[1.36fr_0.64fr]")}>
            <section className="relative min-h-0 min-w-0 overflow-hidden border-[3px] border-[var(--sample-base)] bg-[rgb(255_255_255_/_0.94)] p-3 text-[var(--sample-text)] shadow-[8px_8px_0_var(--sample-accent)]">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: GRAIN_URI, backgroundSize: "72px 72px" }} />
              <span className="absolute right-5 top-8 h-24 w-20 rotate-[8deg] border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-2)]" />
              <span className="absolute bottom-7 left-7 h-6 w-[76%] rotate-[-4deg] bg-[var(--sample-accent)] opacity-85" />
              <div className="relative flex h-full min-h-0 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <span className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)]">
                    FLASH PHOTO INDEX
                  </span>
                  <span className="rotate-[-5deg] border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-1 text-[8px] font-black uppercase text-[var(--sample-text)]">
                    2007 cam
                  </span>
                </div>
                <div>
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.14em]">disposable camera grid</p>
                  <h3
                    className={cn("font-display font-black uppercase leading-[0.84] text-[var(--sample-text)]", compact ? "text-[2rem]" : "text-[3.35rem] sm:text-[4.75rem]")}
                    style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}
                  >
                    FLASH
                    <span className="block text-[var(--sample-accent)]">FEED</span>
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {photos.map((photo, index) => (
                    <span className={cn("relative h-14 overflow-hidden border-[3px] border-[var(--sample-border)] bg-[var(--sample-text)] p-1", index % 2 ? "rotate-[2deg]" : "rotate-[-2deg]")} key={photo}>
                      <span className="block h-full bg-[radial-gradient(circle_at_28%_20%,white_0_8%,rgb(19_201_255_/_0.72)_9%_22%,rgb(10_10_10)_23%_100%)]" />
                      <span className="absolute bottom-1 left-1 right-1 bg-[var(--sample-surface)] px-1 text-[6px] font-black uppercase text-[var(--sample-text)]">{photo}</span>
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid min-h-0 min-w-0 grid-rows-[auto_1fr] gap-3">
              <div className="grid min-h-0 min-w-0 grid-rows-[0.9fr_1.1fr] gap-3">
                <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-base)] bg-[rgb(255_47_146_/_0.94)] p-2 text-[var(--sample-text)]">
                  <p className="mb-2 bg-[var(--sample-text)] px-1.5 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-base)]">club stamp rail</p>
                  <div className="grid h-[calc(100%-1.45rem)] min-h-0 grid-cols-2 gap-1.5">
                    {stamps.map((stamp, index) => (
                      <span className={cn("grid place-items-center border-2 border-[var(--sample-border)] px-1 text-center text-[7px] font-black uppercase", index === 2 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-surface)]")} key={stamp}>
                        {stamp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-base)] bg-[rgb(255_255_255_/_0.95)] p-2 text-[var(--sample-text)]">
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em]">bloghaus playlist deck</p>
                  <div className="grid gap-1">
                    {tracks.map(([code, track], index) => (
                      <span className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-2 border-2 border-[var(--sample-border)] px-1.5 py-1 text-[7px] font-black uppercase", index === 1 ? "bg-[var(--sample-accent-2)]" : "bg-[var(--sample-base)]")} key={track}>
                        <span>{code}</span>
                        <span className="min-w-0 truncate">{track}</span>
                        <span className="h-2 w-5 bg-[var(--sample-text)]" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid min-h-0 min-w-0 grid-rows-[1.08fr_0.92fr] gap-3">
                <div className="relative min-h-0 min-w-0 overflow-hidden border-[3px] border-[var(--sample-base)] bg-[var(--sample-text)] p-2">
                  <p className="relative z-10 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-3)]">mirror flash stack</p>
                  <span className="absolute left-4 top-9 h-20 w-24 rotate-[-6deg] border-[3px] border-[var(--sample-base)] bg-[radial-gradient(circle_at_30%_18%,white_0_9%,rgb(216_255_62)_10%_22%,rgb(22_22_22)_23%_100%)]" />
                  <span className="absolute right-5 top-16 h-16 w-28 rotate-[5deg] border-[3px] border-[var(--sample-base)] bg-[radial-gradient(circle_at_24%_18%,white_0_8%,rgb(255_47_146)_9%_22%,rgb(8_8_8)_23%_100%)]" />
                  <span className="absolute bottom-4 left-6 right-6 h-7 rotate-[-2deg] bg-[var(--sample-accent-2)]" />
                </div>
                <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-base)] bg-[rgb(244_240_232_/_0.95)] p-2 text-[var(--sample-text)]">
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em]">messy outfit tags</p>
                  <div className="grid gap-1">
                    {tags.map((tag, index) => (
                      <span className={cn("min-w-0 truncate border-2 border-[var(--sample-border)] px-1.5 py-1 text-[7px] font-black uppercase", index === 0 ? "bg-[var(--sample-accent)]" : index === 2 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-surface)]")} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="ml-14 grid grid-cols-[0.8fr_1.2fr_0.8fr_1fr] gap-2 text-[8px] font-black uppercase tracking-[0.1em] text-[var(--sample-text)]">
            {["flash index", "camera grid", "club stamp", "outfit tags"].map((label) => (
              <span className="min-w-0 truncate border-[3px] border-[var(--sample-base)] bg-[rgb(255_255_255_/_0.9)] px-2 py-2 text-center" key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function RaveStagePulse({ compact = false, style }: Props) {
  const lineup = [
    ["23:00", "phase one"],
    ["00:30", "acid room"],
    ["02:00", "laser live"],
    ["04:15", "closing b2b"],
  ] as const;
  const meters = [78, 94, 62, 88, 71];
  const wristbands = ["entry", "stage a", "locker", "after"];
  const zones = ["main", "warehouse", "bass", "chill"];

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className="relative h-full min-w-0"
        style={{
          "--sample-accent": "#c8ff19",
          "--sample-accent-2": "#11d9ff",
          "--sample-accent-3": "#ff7a1a",
          "--sample-base": "#08090d",
          "--sample-border": "#f4f7ff",
          "--sample-border-soft": "#f4f7ff33",
          "--sample-muted": "#9aa0b5",
          "--sample-surface": "#141722",
          "--sample-text": "#f4f7ff",
        } as SampleVariables}
      >
        <div className="absolute inset-0 bg-[var(--sample-base)]" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(54% 42% at 50% 12%, rgb(200 255 25 / 0.36), transparent 58%), radial-gradient(40% 48% at 92% 92%, rgb(17 217 255 / 0.28), transparent 62%), radial-gradient(36% 46% at 8% 78%, rgb(255 122 26 / 0.26), transparent 58%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(118deg, transparent 0 27%, rgb(17 217 255 / 0.52) 28%, transparent 29% 55%, rgb(200 255 25 / 0.48) 56%, transparent 57%), linear-gradient(72deg, transparent 0 42%, rgb(255 122 26 / 0.36) 43%, transparent 44%)",
          }}
        />
        <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-4 gap-1 border-[3px] border-[var(--sample-border)] bg-[rgb(8_9_13_/_0.86)] p-1 text-[7px] font-black uppercase text-[var(--sample-text)]">
          {lineup.map(([time, act], index) => (
            <span className={cn("grid grid-cols-[auto_1fr] gap-1 border-2 border-[var(--sample-border)] px-1 py-1", index === 2 ? "bg-[var(--sample-accent)] text-[var(--sample-base)]" : "bg-[var(--sample-surface)]")} key={`ticker-${act}`}>
              <span>{time}</span>
              <span className="min-w-0 truncate">{act}</span>
            </span>
          ))}
        </div>
        <div className="absolute inset-0 opacity-18" style={{ backgroundImage: GRAIN_URI, backgroundSize: "92px 92px" }} />
        <div className="relative grid h-full min-w-0 grid-rows-[auto_1fr_auto] gap-3 text-[var(--sample-text)]">
          <SampleNav
            brand="Pulse Floor"
            bordered={false}
            compact={compact}
            icons={[<IconSearch key="search" size={compact ? 11 : 13} />]}
            links={["Lineup", "Tickets"]}
            sub="warehouse light tunnel"
          />
          <div className={cn("grid min-h-0 min-w-0 gap-3 pb-12", compact ? "grid-rows-[1.18fr_0.82fr]" : "grid-rows-[1.34fr_0.66fr]")}>
            <section className="relative min-h-0 min-w-0 overflow-hidden border-[3px] border-[var(--sample-border)] bg-[rgb(12_14_22_/_0.94)] p-3 shadow-[8px_8px_0_var(--sample-accent-3)]">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgb(244 247 255 / 0.08) 1px, transparent 1px), linear-gradient(0deg, rgb(244 247 255 / 0.08) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <span className="absolute left-1/2 top-16 h-36 w-36 -translate-x-1/2 rounded-full border-[3px] border-[var(--sample-accent)] opacity-55" />
              <span className="absolute bottom-8 left-8 h-2 w-[78%] rotate-[-9deg] bg-[var(--sample-accent-2)] shadow-[0_0_18px_var(--sample-accent-2)]" />
              <span className="absolute right-10 top-10 h-2 w-[62%] rotate-[17deg] bg-[var(--sample-accent)] shadow-[0_0_18px_var(--sample-accent)]" />
              <div className="relative flex h-full min-h-0 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <span className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)]">
                    LASER STAGE MAP
                  </span>
                  <span className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] px-2 py-1 text-[8px] font-black uppercase text-[var(--sample-accent-2)]">
                    148 bpm
                  </span>
                </div>
                <div>
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-accent-2)]">warehouse light tunnel</p>
                  <h3
                    className={cn("font-display font-black uppercase leading-[0.82] text-[var(--sample-text)]", compact ? "text-[2.05rem]" : "text-[3.3rem] sm:text-[4.85rem]")}
                    style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}
                  >
                    RAVE
                    <span className="block text-[var(--sample-accent)]">PULSE</span>
                  </h3>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {zones.map((zone, index) => (
                    <span className={cn("relative h-14 overflow-hidden border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-1 text-[7px] font-black uppercase", index === 1 ? "text-[var(--sample-accent)]" : index === 2 ? "text-[var(--sample-accent-2)]" : "text-[var(--sample-text)]")} key={zone}>
                      <span className="absolute inset-x-2 bottom-2 h-1 bg-current shadow-[0_0_12px_currentColor]" />
                      <span className="relative z-10">{zone}</span>
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid min-h-0 min-w-0 grid-cols-[1fr_0.82fr_1.05fr] gap-3">
              <div className="grid min-h-0 min-w-0 grid-rows-[1fr] gap-3">
                <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-border)] bg-[rgb(20_23_34_/_0.95)] p-2">
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent)]">bpm lineup grid</p>
                  <div className="grid gap-1">
                    {lineup.map(([time, act], index) => (
                      <span className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-2 border-2 border-[var(--sample-border)] px-1.5 py-1 text-[7px] font-black uppercase", index === 2 ? "bg-[var(--sample-accent)] text-[var(--sample-base)]" : "bg-[var(--sample-base)] text-[var(--sample-text)]")} key={act}>
                        <span>{time}</span>
                        <span className="min-w-0 truncate">{act}</span>
                        <span>{142 + index * 3}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] p-2 text-[var(--sample-base)]">
                  <p className="mb-2 bg-[var(--sample-base)] px-1.5 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-3)]">ticket wristband rail</p>
                  <div className="grid h-[calc(100%-1.45rem)] min-h-0 gap-1">
                    {wristbands.map((band, index) => (
                      <span className={cn("grid grid-cols-[1fr_auto] items-center gap-2 border-2 border-[var(--sample-base)] px-1.5 py-1 text-[7px] font-black uppercase", index === 1 ? "bg-[var(--sample-accent)]" : "bg-[var(--sample-text)]")} key={band}>
                        <span className="min-w-0 truncate">{band}</span>
                        <span className="h-2 w-6 bg-[var(--sample-base)]" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid min-h-0 min-w-0 grid-cols-2 gap-3">
                <div className="min-h-0 min-w-0 border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] p-2">
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-2)]">sound system meters</p>
                  <div className="grid h-24 grid-cols-5 items-end gap-1.5">
                    {meters.map((meter, index) => (
                      <span className="flex h-full items-end border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]" key={meter}>
                        <span
                          className={cn("block w-full", index % 2 ? "bg-[var(--sample-accent-2)]" : "bg-[var(--sample-accent)]")}
                          style={{ height: `${meter}%` }}
                        />
                      </span>
                    ))}
                  </div>
                  <div className="mt-1 grid grid-cols-5 gap-1.5">
                    {meters.map((meter, index) => (
                      <span className="text-center text-[6px] font-black uppercase text-[var(--sample-muted)]" key={`${meter}-${index}`}>
                        {index + 1}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-0 min-w-0 overflow-hidden border-[3px] border-[var(--sample-border)] bg-[rgb(20_23_34_/_0.96)] p-2">
                  <p className="relative z-10 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent)]">stage route scanner</p>
                  <span className="absolute left-5 top-10 h-24 w-24 rotate-45 border-[3px] border-[var(--sample-accent-2)] shadow-[0_0_20px_var(--sample-accent-2)]" />
                  <span className="absolute right-5 top-12 h-20 w-20 rounded-full border-[3px] border-[var(--sample-accent)] shadow-[0_0_20px_var(--sample-accent)]" />
                  <span className="absolute bottom-5 left-6 right-6 h-8 skew-x-[-18deg] bg-[var(--sample-accent-3)]" />
                </div>
              </div>
            </section>
          </div>
          <div className="grid grid-cols-4 gap-2 text-[8px] font-black uppercase tracking-[0.1em] text-[var(--sample-base)]">
            {["laser map", "bpm grid", "wristband", "sound meters"].map((label) => (
              <span className="min-w-0 truncate border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent)] px-2 py-2 text-center" key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function LoFiLoopDesk({ compact = false, style }: Props) {
  const pads = ["kick", "hiss", "rain", "keys", "dust", "room", "tape", "soft"];
  const queue = [
    ["07:12", "window loop"],
    ["12:44", "late study"],
    ["18:03", "warm tape"],
    ["23:18", "night bus"],
  ] as const;
  const waves = [22, 44, 30, 68, 38, 56, 26, 48, 34, 60, 28, 42];

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className="relative h-full min-w-0 overflow-hidden"
        style={{
          "--sample-accent": "#b17a45",
          "--sample-accent-2": "#7f8f64",
          "--sample-accent-3": "#6f9099",
          "--sample-base": "#e9dfc7",
          "--sample-border": "#29231d",
          "--sample-border-soft": "#29231d33",
          "--sample-muted": "#75685a",
          "--sample-surface": "#f7edd7",
          "--sample-text": "#201b16",
        } as SampleVariables}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(70% 54% at 18% 18%, rgb(127 143 100 / 0.34), transparent 58%), radial-gradient(74% 70% at 94% 96%, rgb(177 122 69 / 0.26), transparent 58%), linear-gradient(135deg, var(--sample-base), var(--sample-surface))",
          }}
        />
        <div className="absolute inset-0 opacity-24" style={{ backgroundImage: GRAIN_URI, backgroundSize: "96px 96px" }} />
        <div className={cn("relative h-full min-w-0", compact ? "grid grid-cols-[0.64fr_1.36fr] gap-2 p-2" : "grid grid-cols-[0.58fr_1.42fr] gap-2 p-2 sm:gap-4 sm:p-3")}>
          <aside className="grid min-h-0 grid-rows-[auto_1fr_auto] border-[3px] border-[var(--sample-border)] bg-[rgb(247_237_215_/_0.92)] shadow-[6px_6px_0_rgb(41_35_29_/_0.18)]">
            <div className={cn("grid grid-cols-[1fr_auto_auto] items-center gap-1 border-b-[3px] border-[var(--sample-border)] font-black uppercase", compact ? "px-1.5 py-1 text-[7px] tracking-[0.08em]" : "px-1.5 py-1 text-[7px] tracking-[0.08em] sm:px-2 sm:py-1.5 sm:text-[8px] sm:tracking-[0.12em]")}>
              <span className={compact ? "" : "sm:hidden"}>LOFI</span>
              <span className={compact ? "hidden" : "hidden sm:inline"}>LO-FI LOOP DESK</span>
              <span className="h-2 w-2 rounded-full bg-[var(--sample-accent-2)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--sample-accent)]" />
            </div>
            <div className="relative min-h-0 overflow-hidden p-3">
              <div className={cn("absolute aspect-square rounded-full border-[10px] border-[var(--sample-text)] bg-[radial-gradient(circle,var(--sample-accent-3)_0_19%,var(--sample-surface)_20%_34%,var(--sample-text)_35%_39%,var(--sample-accent)_40%_100%)] opacity-95", compact ? "inset-x-5 top-8" : "inset-x-6 top-8")} />
              <div className={cn("absolute border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)]", compact ? "bottom-4 left-2 right-2 p-1.5" : "bottom-5 left-4 right-4 p-2")}>
                <p className="mb-1 text-[8px] font-black uppercase tracking-[0.12em]">cassette progress rail</p>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
                  <span className="h-5 w-5 rounded-full border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)]" />
                  <span className="h-2 bg-[linear-gradient(90deg,var(--sample-accent)_0_58%,rgb(41_35_29_/_0.2)_58%_100%)]" />
                  <span className="h-5 w-5 rounded-full border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-2)]" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1 border-t-[3px] border-[var(--sample-border)] p-2 text-[7px] font-black uppercase">
              {["tape", "radio", "crate", "sleep"].map((item) => (
                <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-1 py-1 text-center" key={item}>{item}</span>
              ))}
            </div>
          </aside>

          <main className={cn("relative min-h-0 overflow-hidden border-[3px] border-[var(--sample-border)] bg-[rgb(244_236_217_/_0.88)]", compact ? "p-2" : "p-2 sm:p-3")}>
            <div
              className={cn("absolute overflow-hidden border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] bg-cover bg-center opacity-60", compact ? "inset-2" : "inset-2 sm:inset-3")}
              style={{ backgroundImage: "url('/generated/lofi-listening-room.png')" }}
            />
            <div className={cn("absolute bg-[linear-gradient(90deg,rgb(244_236_217_/_0.86)_0_42%,rgb(244_236_217_/_0.28)_42%_100%)]", compact ? "inset-2" : "inset-2 sm:inset-3")} />
            <div className={cn("absolute z-10 rotate-[4deg] border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)]", compact ? "right-2 top-2 max-w-[4.8rem] p-1" : "right-2 top-2 max-w-[4.8rem] p-1 sm:right-6 sm:top-6 sm:max-w-none sm:p-2")}>
              <p className={cn("font-black uppercase", compact ? "text-[6px] tracking-[0.08em]" : "text-[6px] tracking-[0.08em] sm:text-[8px] sm:tracking-[0.12em]")}>paper note texture</p>
              <p className={cn("max-w-[8rem] text-[8px] font-black uppercase leading-snug text-[var(--sample-muted)]", compact ? "hidden" : "hidden sm:mt-2 sm:block")}>rain hiss / low pass / repeat until 2am</p>
            </div>
            <div className={cn("relative z-10 grid h-full min-h-0 grid-rows-[auto_1fr_auto]", compact ? "gap-2" : "gap-3")}>
              <header className={cn("grid grid-cols-[1fr_auto] items-start", compact ? "gap-1" : "gap-3")}>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[var(--sample-muted)]">bedroom radio queue</p>
                  <h3
                    className={cn("font-display font-black uppercase leading-[0.83] text-[var(--sample-text)]", compact ? "text-[1.16rem]" : "text-[1.35rem] sm:text-[3rem] lg:text-[4.6rem]")}
                    style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}
                  >
                    SOFT
                    <span className="block text-[var(--sample-accent)]">LOOP</span>
                  </h3>
                </div>
                <span className={cn("border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-2)] px-2 py-1 text-[8px] font-black uppercase text-[var(--sample-surface)]", compact ? "hidden" : "hidden sm:inline-block")}>64 bpm</span>
              </header>

              <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-1" : "grid-cols-[1fr_0.82fr]")}>
                <section className="grid min-h-0 grid-rows-[auto_1fr] border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-2">
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em]">dusty sampler pads</p>
                  <div className="grid min-h-0 grid-cols-4 gap-1.5">
                    {pads.map((pad, index) => (
                      <span className={cn("grid place-items-center border-2 border-[var(--sample-border)] px-1 text-center text-[7px] font-black uppercase", index === 2 ? "bg-[var(--sample-accent-3)] text-[var(--sample-surface)]" : index === 5 ? "bg-[var(--sample-accent)] text-[var(--sample-surface)]" : "bg-[var(--sample-base)]")} key={pad}>
                        {pad}
                      </span>
                    ))}
                  </div>
                </section>
                <section className="grid min-h-0 grid-rows-[auto_1fr] border-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] p-2">
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em]">bedroom radio queue</p>
                  <div className="grid gap-1">
                    {queue.map(([time, track], index) => (
                      <span className={cn("grid grid-cols-[auto_1fr] gap-2 border-2 border-[var(--sample-border)] px-1.5 py-1 text-[7px] font-black uppercase", index === 2 ? "bg-[var(--sample-accent-2)] text-[var(--sample-surface)]" : "bg-[var(--sample-surface)]")} key={track}>
                        <span>{time}</span>
                        <span className="min-w-0 truncate">{track}</span>
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <footer className="lofi-os-mixer grid grid-cols-[auto_1fr_auto] items-center gap-3 border-[3px] border-[var(--sample-border)] bg-[rgb(247_237_215_/_0.95)] p-2">
                <span className="h-7 w-7 rounded-full border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)]" />
                <span className="grid h-8 grid-cols-12 items-end gap-1">
                  {waves.map((height, index) => (
                    <span className="block bg-[var(--sample-accent-2)]" style={{ height: `${Math.max(18, height)}%` }} key={`lofi-wave-${height}-${index}`} />
                  ))}
                </span>
                <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-2 py-1 text-[7px] font-black uppercase text-[var(--sample-surface)]">rec</span>
              </footer>
            </div>
          </main>
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
    return <PostmodernArchivePortal {...props} />;
  }

  if (style.slug === "classic") {
    return <ClassicHeritageCommerce {...props} />;
  }

  if (style.slug === "neoclassic") {
    return <NeoclassicHotelHome {...props} />;
  }

  if (style.slug === "luxury") {
    return <LuxuryEditorialProduct {...props} />;
  }

  if (style.slug === "old-money") {
    return <OldMoneyClubShop {...props} />;
  }

  if (style.slug === "art-deco") {
    return <ArtDecoHotelPortal {...props} />;
  }

  if (style.slug === "art-nouveau") {
    return <ArtNouveauBotanicalShop {...props} />;
  }

  if (style.slug === "baroque") {
    return <BaroqueGalleryCommerce {...props} />;
  }

  if (style.slug === "rococo") {
    return <RococoSalonMarket {...props} />;
  }

  if (style.slug === "gothic") {
    return <GothicCathedralArchive {...props} />;
  }

  if (style.slug === "organic-design") {
    return <OrganicDesignApothecary {...props} />;
  }

  if (style.slug === "natural") {
    return <NaturalMarketShelf {...props} />;
  }

  if (style.slug === "botanical") {
    return <BotanicalGlasshouse {...props} />;
  }

  if (style.slug === "eco-design") {
    return <EcoImpactSystem {...props} />;
  }

  if (style.slug === "rustic") {
    return <RusticLodgeCommerce {...props} />;
  }

  if (style.slug === "kinfolk") {
    return <KinfolkSlowJournal {...props} />;
  }

  if (style.slug === "handmade") {
    return <HandmadePatchMarket {...props} />;
  }

  if (style.slug === "craft") {
    return <CraftWorkshopLedger {...props} />;
  }

  if (style.slug === "wabi-sabi") {
    return <WabiSabiTeaGallery {...props} />;
  }

  if (style.slug === "kitsch") {
    return <KitschNoveltyDrop {...props} />;
  }

  if (style.slug === "kawaii") {
    return <KawaiiCharacterClub {...props} />;
  }

  if (style.slug === "dopamine-design") {
    return <DopamineRewardLoop {...props} />;
  }

  if (style.slug === "pop-art") {
    return <PopArtObjectArchive {...props} />;
  }

  if (style.slug === "comic-book-style") {
    return <ComicIssueDrop {...props} />;
  }

  if (style.slug === "toy-design") {
    return <ToyPlaysetBuilder {...props} />;
  }

  if (style.slug === "playful-design") {
    return <PlayfulOnboardFlow {...props} />;
  }

  if (style.slug === "pastel-style") {
    return <PastelSoftEdit {...props} />;
  }

  if (style.slug === "bubble-design") {
    return <BubbleFlowCapsules {...props} />;
  }

  if (style.slug === "streetwear") {
    return <StreetwearDropEditorial {...props} />;
  }

  if (style.slug === "graffiti") {
    return <GraffitiWallArchive {...props} />;
  }

  if (style.slug === "hiphop-style") {
    return <HipHopMixtapeConsole {...props} />;
  }

  if (style.slug === "skate-culture") {
    return <SkateCultureSpotBoard {...props} />;
  }

  if (style.slug === "punk") {
    return <PunkZineDispatch {...props} />;
  }

  if (style.slug === "grunge") {
    return <GrungeTapeArchive {...props} />;
  }

  if (style.slug === "indie-sleaze") {
    return <IndieSleazeFlashFeed {...props} />;
  }

  if (style.slug === "rave-style") {
    return <RaveStagePulse {...props} />;
  }

  if (style.slug === "lo-fi") {
    return <LoFiLoopDesk {...props} />;
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
