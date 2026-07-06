import { Fragment } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { DesignStyle } from "@/data/designStyles";
import { styleTokenVars } from "@/components/style-preset/styleTokenVars";
import { cn } from "@/lib/utils";
import { GlitchArtInterface } from "./GlitchArtInterface";

type Props = {
  className?: string;
  compact?: boolean;
  style: DesignStyle;
};

type SampleVariables = CSSProperties & Record<`--sample-${string}`, string> & Record<`--st-${string}`, string>;

function withAlpha(color: string, alpha: string) {
  return /^#[\da-f]{6}$/i.test(color) ? `${color}${alpha}` : color;
}

export function sampleVariables(style: DesignStyle): SampleVariables {
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

export const GRAIN_URI =
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

export type PhotoScene = keyof typeof PHOTO_SCENES;

export function PhotoSurface({
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
  botanical: "/generated/design-styles/botanical.webp",
  brutalism: "/generated/design-styles/brutalism.webp",
  classic: "/generated/design-styles/classic.webp",
  craft: "/generated/design-styles/craft.webp",
  deconstructivism: "/generated/design-styles/deconstructivism.webp",
  "glitch-art": "/generated/design-styles/glitch-art.webp",
  graffiti: "/generated/design-styles/graffiti.webp",
  grunge: "/generated/design-styles/grunge.webp",
  handmade: "/generated/design-styles/handmade.webp",
  "hiphop-style": "/generated/design-styles/hiphop-style.webp",
  "high-end-minimal": "/generated/design-styles/high-end-minimal.webp",
  "indie-sleaze": "/generated/design-styles/indie-sleaze.webp",
  japandi: "/generated/design-styles/japandi.webp",
  kawaii: "/generated/design-styles/kawaii.webp",
  kitsch: "/generated/design-styles/kitsch.webp",
  luxury: "/generated/design-styles/luxury.webp",
  maximalism: "/generated/design-styles/maximalism.webp",
  natural: "/generated/design-styles/natural.webp",
  "new-brutalism": "/generated/design-styles/new-brutalism.webp",
  neoclassic: "/generated/design-styles/neoclassic.webp",
  "old-money": "/generated/design-styles/old-money.webp",
  "organic-design": "/generated/design-styles/organic-design.webp",
  "pastel-style": "/generated/design-styles/pastel-style.webp",
  postmodernism: "/generated/design-styles/postmodernism.webp",
  punk: "/generated/design-styles/punk.webp",
  "rave-style": "/generated/design-styles/rave-style.webp",
  rococo: "/generated/design-styles/rococo.webp",
  scandinavian: "/generated/design-styles/scandinavian.webp",
  "skate-culture": "/generated/design-styles/skate-culture.webp",
  "soft-minimal": "/generated/design-styles/soft-minimal.webp",
  streetwear: "/generated/design-styles/streetwear.webp",
  "wabi-sabi": "/generated/design-styles/wabi-sabi.webp",
  "warm-minimal": "/generated/design-styles/warm-minimal.webp",
} as const;

export type GeneratedStyleImageSlug = keyof typeof GENERATED_STYLE_IMAGES;

export function GeneratedStyleImageSurface({
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
  const materialIndex = [
    ["Paper", "warm white", "var(--sample-surface)"],
    ["Stone", "greige", "var(--sample-accent-2)"],
    ["Cotton", "soft fold", "var(--sample-accent-3)"],
    ["Graphite", "rule", "var(--sample-text)"],
  ];
  const productNotes = [
    ["01", "Product image sits alone"],
    ["02", "Copy stays under 60 words"],
    ["03", "Rules replace heavy cards"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        <SampleNav
          brand="Atelier"
          compact={compact}
          icons={[
            <span className="text-[var(--sample-muted)]" key="login" style={{ fontSize: compact ? "0.6rem" : "0.72rem" }}>
              Archive
            </span>,
            <span
              className="inline-flex items-center rounded-[var(--st-radius-pill)] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-3 py-1.5 font-medium text-[var(--sample-text)]"
              key="cta"
              style={{ fontSize: compact ? "0.58rem" : "0.7rem" }}
            >
              View object
            </span>,
          ]}
          links={["Objects", "Materials", "Notes", "Journal"]}
        />

        <div className={cn("grid flex-1 gap-6", compact ? "grid-cols-1 pt-4" : "grid-cols-1 pt-8 md:grid-cols-[0.74fr_1.26fr] md:gap-10 md:pt-10")}>
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sample-accent)]">MINIMAL PRODUCT CANVAS</p>
              <h3
                className={cn("mt-5 max-w-[13ch] font-display leading-[0.94] [text-wrap:balance]", compact ? "text-[1.65rem]" : "text-[2.25rem] md:text-[3.4rem]")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                Essential objects, precisely spaced.
              </h3>
              <p className={cn("max-w-[28rem] text-[var(--sample-muted)]", compact ? "mt-3 line-clamp-2 text-[11px] leading-5" : "mt-6 text-sm leading-7")}>
                A quiet product page where blank space, thin rules, and neutral material cues make every object feel deliberate.
              </p>
            </div>

            <div className={cn("border-t border-[var(--sample-border-soft)]", compact ? "mt-5 pt-3" : "mt-10 pt-4")}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--sample-muted)]">thin-rule material index</p>
              <div className="mt-3 grid grid-cols-4 gap-px bg-[var(--sample-border-soft)]">
                {materialIndex.map(([label, meta, color]) => (
                  <div className="min-w-0 bg-[var(--sample-base)] p-2" key={label}>
                    <span className="block h-2.5 border border-[var(--sample-border-soft)]" style={{ backgroundColor: color }} />
                    <span className="mt-2 block truncate text-[9px] font-medium text-[var(--sample-text)]">{label}</span>
                    <span className="mt-0.5 block truncate text-[8px] uppercase tracking-[0.12em] text-[var(--sample-muted)]">{meta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid min-h-0">
            <div className="grid min-h-0 grid-rows-[1fr_auto] overflow-hidden border border-[var(--sample-border-soft)] bg-[var(--sample-surface)]">
              <div className={cn("relative min-h-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--sample-border-soft)_55%,transparent)_1px,transparent_1px),linear-gradient(180deg,color-mix(in_srgb,var(--sample-border-soft)_45%,transparent)_1px,transparent_1px)] bg-[length:3.75rem_3.75rem]", compact ? "p-4" : "p-6 md:p-8")}>
                <div className="flex items-center justify-between border-b border-[var(--sample-border-soft)] pb-3 text-[9px] uppercase tracking-[0.16em] text-[var(--sample-muted)]">
                  <span>negative-space product stage</span>
                  <span>01 / 04</span>
                </div>
                <div className={cn("grid h-full min-h-0 place-items-center", compact ? "py-5" : "py-8")}>
                  <div className="relative aspect-[5/3] w-[78%] max-w-[25rem] bg-[var(--sample-base)]">
                    <div className="absolute inset-[13%] border border-[var(--sample-border-soft)] bg-[color-mix(in_srgb,var(--sample-surface)_70%,var(--sample-accent-2))]" />
                    <div className="absolute left-[20%] top-[18%] h-[46%] w-[34%] bg-[var(--sample-surface)] shadow-[0_24px_50px_-40px_rgb(21_21_21_/_0.45)]" />
                    <div className="absolute bottom-[18%] right-[18%] h-px w-[38%] bg-[var(--sample-text)]" />
                    <div className="absolute bottom-[25%] right-[18%] h-px w-[28%] bg-[var(--sample-border)]" />
                    <span className="absolute -bottom-5 left-0 text-[8px] uppercase tracking-[0.16em] text-[var(--sample-muted)]">matte object proof</span>
                  </div>
                </div>
              </div>

              <div className={cn("grid border-t border-[var(--sample-border-soft)] bg-[var(--sample-base)]", compact ? "grid-cols-1" : "grid-cols-3")}>
                {productNotes.map(([index, label]) => (
                  <div className="flex min-w-0 items-center gap-3 border-r border-[var(--sample-border-soft)] px-3 py-3 last:border-r-0" key={index}>
                    <span className="font-mono text-[10px] text-[var(--sample-muted)]">{index}</span>
                    <span className="truncate text-[10px] font-medium text-[var(--sample-text)]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={cn("items-center justify-between border-t border-[var(--sample-border-soft)] text-[10px] uppercase tracking-[0.16em] text-[var(--sample-muted)]", compact ? "hidden" : "md:col-span-2 md:flex md:pt-4")}>
            <span>Neutral surface study</span>
            <span className="inline-flex items-center gap-2 text-[var(--sample-text)]">
              Open composition <IconArrow size={12} />
            </span>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function ModernismFunctionalGrid({ className, compact = false, style }: Props) {
  const programs = [
    ["01", "Visit", "Temporary archive"],
    ["02", "Objects", "Chair / lamp / module"],
    ["03", "Experiment", "Kharkiv study"],
    ["04", "Research", "Collection room"],
  ];
  const objectIndex = [
    ["A", "Chair", "1928", style.palette.accent],
    ["B", "Lamp", "1932", style.palette.accent2],
    ["C", "Wall", "1956", style.palette.accent3],
  ];
  const geometryBlocks = [
    ["col-span-2", style.palette.accent],
    ["", style.palette.accent2],
    ["", style.palette.surface],
    ["col-span-2", style.palette.accent3],
    ["", style.palette.text],
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

        <div className={cn("grid min-h-0", compact ? "grid-cols-[0.86fr_1.14fr]" : "grid-cols-1 md:grid-cols-[0.72fr_1.28fr]")}>
          <div className="flex min-w-0 flex-col justify-between border-r-2 border-[var(--sample-border)] p-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--sample-muted)]">MODERNIST PROGRAM GRID</p>
              <h3
                className={cn("mt-4 font-display leading-[0.9]", compact ? "text-[1.7rem]" : "text-4xl md:text-6xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                Function builds the page.
              </h3>
              <p className={cn("mt-4 max-w-[17rem] text-[var(--sample-muted)]", compact ? "line-clamp-2 text-[10px] leading-4" : "text-xs leading-5")}>
                Institution, object, and experiment are arranged as one rational web system.
              </p>
            </div>
            <div className={cn("mt-4", compact ? "hidden" : "block")}>
              <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--sample-muted)]">primary geometry modules</p>
              <div className="grid grid-cols-3 gap-2">
                {geometryBlocks.map(([span, color], index) => (
                  <span
                    className={cn("h-10 border-2 border-[var(--sample-border)]", span)}
                    key={index}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid min-h-0 grid-rows-[auto_1fr_auto] bg-[var(--sample-surface)]">
            <div className="grid grid-cols-4 border-b-2 border-[var(--sample-border)]">
              {programs.map(([number, label, meta], index) => (
                <div className="border-r-2 border-[var(--sample-border)] p-3 last:border-r-0" key={label}>
                  <p className="text-[10px] font-bold text-[var(--sample-muted)]">{number}</p>
                  <p className="mt-2 text-xs font-semibold text-[var(--sample-text)]">{label}</p>
                  <p className={cn("mt-1 text-[9px] leading-3 text-[var(--sample-muted)]", compact ? "hidden" : "block")}>{meta}</p>
                  <span
                    className="mt-3 block h-2"
                    style={{ backgroundColor: [style.palette.accent, style.palette.accent2, style.palette.accent3, style.palette.text][index] }}
                  />
                </div>
              ))}
            </div>

            <div className={cn("grid min-h-0 gap-3 p-4", compact ? "grid-cols-1" : "grid-cols-[1.08fr_0.92fr]")}>
              <div className="grid min-h-0 grid-rows-[1fr_auto] border-2 border-[var(--sample-border)]">
                <div className="relative min-h-0 overflow-hidden bg-[var(--sample-base)]">
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-5">
                    <span className="col-span-2 row-span-5 border-r-2 border-[var(--sample-border)] bg-[var(--sample-surface)]" />
                    <span className="col-span-4 row-span-2 border-b-2 border-[var(--sample-border)] bg-[var(--sample-accent)]" />
                    <span className="col-span-2 row-span-3 border-r-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)]" />
                    <span className="col-span-2 row-span-3 bg-[var(--sample-accent-3)]" />
                  </div>
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--sample-base)]">
                    <span>Architecture crop</span>
                    <span>1910-1930</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-[1fr_auto] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]">
                    <span className="px-3 py-2 text-[10px] font-bold text-[var(--sample-text)]">Industrial product fragment</span>
                    <span className="border-l-2 border-[var(--sample-border)] bg-[var(--sample-text)] px-3 py-2 text-[10px] font-bold text-[var(--sample-base)]">M</span>
                  </div>
                </div>
                <div className="grid grid-cols-[1fr_auto] border-t-2 border-[var(--sample-border)]">
                  <span className="px-3 py-2 text-xs font-semibold text-[var(--sample-text)]">function-led object index</span>
                  <span className="border-l-2 border-[var(--sample-border)] px-3 py-2 text-[10px] text-[var(--sample-muted)]">archive / product / school</span>
                </div>
              </div>

              <div className={cn("grid content-start gap-2", compact ? "hidden" : "block")}>
                {objectIndex.map(([code, label, year, color]) => (
                  <div className="grid grid-cols-[2rem_1fr_3.25rem] border-2 border-[var(--sample-border)]" key={label}>
                    <span className="grid place-items-center border-r-2 border-[var(--sample-border)] text-[10px] font-bold text-[var(--sample-base)]" style={{ backgroundColor: color }}>
                      {code}
                    </span>
                    <span className="px-3 py-2 text-xs font-semibold text-[var(--sample-text)]">{label}</span>
                    <span className="border-l-2 border-[var(--sample-border)] px-2 py-2 text-[10px] font-bold text-[var(--sample-muted)]">{year}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 border-2 border-[var(--sample-border)]">
                  <span className="h-12 bg-[var(--sample-accent)]" />
                  <span className="h-12 border-x-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)]" />
                  <span className="h-12 bg-[var(--sample-accent-3)]" />
                </div>
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
  const languages = ["DE", "FR", "IT", "EN"];
  const stories = [
    ["12:40", "Economy", "Federal rail network reports record punctuality"],
    ["11:05", "Culture", "Type archive opens its poster vault"],
    ["09:30", "Science", "Alpine research station extends climate study"],
  ];
  const departures = [
    ["Zürich HB", "08:42", "platform 7"],
    ["Basel SBB", "08:51", "+2 min"],
    ["Genève", "09:04", "platform 3"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_auto_1fr] border border-[var(--sample-border)] bg-[var(--sample-surface)]">
        <div className="grid grid-cols-[1fr_auto] border-b border-[var(--sample-border-soft)] text-[9px] font-medium text-[var(--sample-muted)]">
          <span className="px-3 py-1.5">multilingual public-service nav · Wednesday 04 June · Zürich 18°</span>
          <span className="flex items-center border-l border-[var(--sample-border-soft)]">
            {languages.map((language, index) => (
              <span className={cn("border-r border-[var(--sample-border-soft)] px-2 py-1.5 last:border-r-0", index === 0 ? "bg-[var(--sample-text)] font-bold text-[var(--sample-base)]" : "")} key={language}>
                {language}
              </span>
            ))}
            <IconSearch className="mx-2 text-[var(--sample-text)]" size={11} />
          </span>
        </div>

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

        <div className={cn("grid min-h-0", compact ? "grid-cols-[1.05fr_0.95fr]" : "grid-cols-1 md:grid-cols-[1.15fr_0.85fr]")}>
          <div
            className={cn("grid min-w-0 grid-rows-[auto_1fr_auto] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sample-border-soft)_70%,transparent)_1px,transparent_1px)] bg-[length:100%_18px]", compact ? "border-r border-[var(--sample-border)]" : "border-b border-[var(--sample-border)] md:border-b-0 md:border-r")}
          >
            <div className="grid grid-cols-[4.5rem_1fr] border-b border-[var(--sample-border-soft)] text-[9px] font-bold uppercase tracking-[0.1em]">
              <span className="bg-[var(--sample-accent)] px-2 py-2 text-white">SWISS BASELINE GRID</span>
              <span className="px-3 py-2 text-[var(--sample-muted)]">grid first / type leads / signal red only</span>
            </div>

            <div className={cn("grid min-h-0", compact ? "grid-cols-[1fr]" : "grid-cols-[0.34fr_0.66fr]")}>
              <div className={cn("border-r border-[var(--sample-border-soft)] p-3", compact ? "hidden" : "block")}>
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--sample-muted)]">Sections</p>
                <div className="mt-3 space-y-2">
                  {sections.slice(0, 4).map((section, index) => (
                    <div className="grid grid-cols-[1.5rem_1fr] items-center border-b border-[var(--sample-border-soft)] pb-1 text-[10px]" key={section}>
                      <span className={cn("font-bold tabular-nums", index === 0 ? "text-[var(--sample-accent)]" : "text-[var(--sample-muted)]")}>{String(index + 1).padStart(2, "0")}</span>
                      <span className="font-semibold text-[var(--sample-text)]">{section}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3">
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em]">
                  <span className="bg-[var(--sample-accent)] px-1.5 py-0.5 text-white">Top story</span>
                  <span className="text-[var(--sample-muted)]">Economy · 4 min read</span>
                </div>
                <h3
                  className={cn("mt-3 font-display leading-[0.9]", compact ? "text-[1.65rem]" : "text-[2.15rem] md:text-[3rem]")}
                  style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
                >
                  Clear public information for every region.
                </h3>
                <p className={cn("mt-3 text-[11px] leading-5 text-[var(--sample-muted)]", compact ? "line-clamp-2" : "line-clamp-3")}>
                  A multilingual editorial system keeps sections, topic rows, and timetable data on one measured baseline.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 border-t border-[var(--sample-border-soft)]">
              {["Topic", "Region", "Time", "Link"].map((label, index) => (
                <span className={cn("border-r border-[var(--sample-border-soft)] px-2 py-2 text-[9px] font-bold uppercase tracking-[0.1em] last:border-r-0", index === 0 ? "text-[var(--sample-accent)]" : "text-[var(--sample-muted)]")} key={label}>
                  {label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-[1fr_auto] border-t border-[var(--sample-border-soft)] text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--sample-muted)]">
              <span className="px-3 py-2">objective typography / numbered rows</span>
              <span className="border-l border-[var(--sample-border-soft)] px-3 py-2 text-[var(--sample-accent)]">read more</span>
            </div>
          </div>

          <div className="grid min-h-0 min-w-0 grid-rows-[1fr_auto] bg-[var(--sample-base)]">
            <div className="grid min-h-0 content-start divide-y divide-[var(--sample-border-soft)] border-b border-[var(--sample-border)]">
              {stories.map(([time, cat, title], index) => (
                <div className="grid grid-cols-[2.6rem_1fr] px-3 py-2" key={title}>
                  <span className={cn("font-mono text-[10px] font-bold tabular-nums", index === 0 ? "text-[var(--sample-accent)]" : "text-[var(--sample-muted)]")}>{time}</span>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--sample-muted)]">{cat}</p>
                    <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-4 text-[var(--sample-text)]">{title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={cn("p-3", compact ? "hidden" : "block")}>
              <p className="mb-2 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--sample-text)]">
                <span>timetable information rail</span>
                <span className="text-[var(--sample-muted)]">live</span>
              </p>
              <div className="grid border border-[var(--sample-border)]">
                {departures.map(([place, time, status]) => (
                  <div className="grid grid-cols-[1fr_3rem_3.5rem] border-b border-[var(--sample-border-soft)] text-[10px] last:border-b-0" key={place}>
                    <span className="px-2 py-1.5 font-medium text-[var(--sample-text)]">{place}</span>
                    <span className="border-l border-[var(--sample-border-soft)] px-2 py-1.5 text-right font-mono font-bold tabular-nums text-[var(--sample-text)]">{time}</span>
                    <span className={cn("border-l border-[var(--sample-border-soft)] px-2 py-1.5 text-right text-[9px]", status.includes("+") ? "text-[var(--sample-accent)]" : "text-[var(--sample-muted)]")}>{status}</span>
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
  const standards = [
    ["01", "Foundations", "2x component rail"],
    ["02", "Implementation", "Code kits"],
    ["03", "Practices", "AI + access"],
    ["04", "Resources", "Tokens"],
  ];
  const markets = [
    ["EU", "12 locales", "Ready"],
    ["NA", "8 locales", "Pilot"],
    ["APAC", "16 locales", "Review"],
    ["LATAM", "6 locales", "Ready"],
  ];
  const channels = [
    ["Visit", "Hours, maps, access"],
    ["Events", "Calendar modules"],
    ["Collection", "Indexed records"],
    ["Member", "Account services"],
  ];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.46]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(var(--st-border-rgb) / 0.24) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--st-border-rgb) / 0.22) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative flex h-full flex-col">
        <div className="grid grid-cols-[1fr_auto] border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.9)] text-[var(--sample-text)]">
          <div className="min-w-0 border-r border-[var(--sample-border)]">
            <div className="flex items-center gap-2 border-b border-[var(--sample-border)] px-3 py-2">
              <span className="h-3 w-3 bg-[var(--sample-accent)]" />
              <span className="truncate text-[10px] font-bold uppercase">GLOBAL SYSTEM PORTAL</span>
              <span className={cn("text-[9px] text-[var(--sample-muted)]", compact ? "hidden" : "")}>standards release 2026.06</span>
            </div>
            <div className={cn("grid text-[9px] text-[var(--sample-muted)]", compact ? "grid-cols-2" : "grid-cols-4")}>
              {["Foundations", "Implementation", "Practices", "Community"].map((item, index) => (
                <span className={cn("border-r border-[var(--sample-border-soft)] px-3 py-1.5 last:border-r-0", compact && index > 1 ? "hidden" : "")} key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid min-w-[72px] grid-cols-2 text-center text-[9px] font-semibold">
            <span className="border-b border-r border-[var(--sample-border)] px-2 py-2">EN</span>
            <span className="border-b border-[var(--sample-border)] px-2 py-2">JP</span>
            <span className="border-r border-[var(--sample-border)] px-2 py-2">DE</span>
            <span className="bg-[var(--sample-accent)] px-2 py-2 text-white">KR</span>
          </div>
        </div>

        <div className={cn("grid flex-1 min-h-0 gap-3", compact ? "grid-rows-[auto_1fr] pt-3" : "grid-cols-[0.82fr_1.18fr] pt-5")}>
          <section className="flex min-w-0 flex-col justify-between border border-[var(--sample-border)] bg-[var(--sample-surface)]">
            <div className="border-b border-[var(--sample-border)] p-4">
              <p className="text-[10px] font-semibold uppercase text-[var(--sample-accent)]">Neutral global grid</p>
              <h3
                className={cn("mt-3 max-w-[13ch] font-display leading-[0.98]", compact ? "text-[1.55rem]" : "text-[2.45rem]")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0" }}
              >
                One interface, many markets.
              </h3>
              <p className={cn("mt-3 text-[var(--sample-muted)]", compact ? "line-clamp-2 text-[10px] leading-4" : "text-[12px] leading-5")}>
                A standardized product and institution shell for services that must read clearly across language, region and team boundaries.
              </p>
            </div>
            <div className="grid grid-cols-3 border-b border-[var(--sample-border)] text-[9px]">
              {["steel", "acrylic", "transport blue"].map((material, index) => (
                <span
                  className={cn("border-r border-[var(--sample-border-soft)] px-3 py-2 last:border-r-0", index === 2 ? "bg-[var(--sample-accent)] text-white" : "text-[var(--sample-muted)]")}
                  key={material}
                >
                  {material}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-3 p-3">
              <span className="inline-flex h-8 items-center justify-center bg-[var(--sample-accent)] px-3 text-[10px] font-semibold text-white">Open standards</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[var(--sample-text)]">
                Search <IconSearch size={12} />
              </span>
            </div>
          </section>

          <section className={cn("grid min-h-0 min-w-0 gap-3", compact ? "grid-rows-[1fr_auto]" : "grid-cols-[1.05fr_0.95fr]")}>
            <div className="grid min-h-0 grid-rows-[auto_1fr] border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.92)]">
              <div className="flex items-center justify-between border-b border-[var(--sample-border)] px-3 py-2">
                <span className="text-[10px] font-bold uppercase">cross-market content matrix</span>
                <span className="h-2 w-10 bg-[var(--sample-accent)]" />
              </div>
              <div className="min-h-0 overflow-hidden">
                <div className="grid grid-cols-[2.5rem_1fr_3.5rem] border-b border-[var(--sample-border-soft)] bg-[rgb(var(--st-accent-2-rgb)/0.28)] text-[9px] font-semibold text-[var(--sample-muted)]">
                  <span className="px-2 py-2">Zone</span>
                  <span className="border-l border-[var(--sample-border-soft)] px-2 py-2">Locale pack</span>
                  <span className="border-l border-[var(--sample-border-soft)] px-2 py-2 text-right">State</span>
                </div>
                {markets.map(([zone, locale, state], index) => (
                  <div className={cn("grid grid-cols-[2.5rem_1fr_3.5rem] border-b border-[var(--sample-border-soft)] text-[10px] last:border-b-0", compact && index > 2 ? "hidden" : "")} key={zone}>
                    <span className="px-2 py-2 font-bold">{zone}</span>
                    <span className="border-l border-[var(--sample-border-soft)] px-2 py-2 text-[var(--sample-muted)]">{locale}</span>
                    <span className={cn("border-l border-[var(--sample-border-soft)] px-2 py-2 text-right font-semibold", state === "Ready" ? "text-[var(--sample-accent)]" : "text-[var(--sample-text)]")}>
                      {state}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid min-h-0 grid-rows-[auto_1fr] border border-[var(--sample-border)] bg-[var(--sample-surface)]">
              <div className="flex items-center justify-between border-b border-[var(--sample-border)] px-3 py-2">
                <span className="text-[10px] font-bold uppercase">2x component rail</span>
                <span className="text-[9px] text-[var(--sample-muted)]">8 / 16 / 32</span>
              </div>
              <div className="min-h-0 overflow-hidden">
                {standards.map(([num, name, note], index) => (
                  <div className={cn("grid grid-cols-[2rem_1fr] border-b border-[var(--sample-border-soft)] last:border-b-0", compact && index > 2 ? "hidden" : "")} key={name}>
                    <span className="border-r border-[var(--sample-border-soft)] px-2 py-2 text-[9px] tabular-nums text-[var(--sample-muted)]">{num}</span>
                    <span className="min-w-0 px-2 py-2">
                      <span className="block truncate text-[10px] font-semibold">{name}</span>
                      <span className="block truncate text-[9px] text-[var(--sample-muted)]">{note}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className={cn("mt-3 grid gap-2", compact ? "grid-cols-2" : "grid-cols-4")}>
          {channels.map(([name, note], index) => (
            <div className={cn("border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.86)] p-2", compact && index > 1 ? "hidden" : "")} key={name}>
              <span className="block text-[9px] font-bold uppercase text-[var(--sample-text)]">{name}</span>
              <span className="mt-1 block truncate text-[9px] text-[var(--sample-muted)]">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function ScandinavianCommerceHome({ className, compact = false, style }: Props) {
  const rooms = ["Living", "Dining", "Hallway", "Bedroom"];
  const products: Array<[string, string, string, string]> = [
    ["Oak lounge chair", "$420", "38% 56%", "Seating"],
    ["Paper shade lamp", "$148", "66% 38%", "Lighting"],
    ["Wool storage bench", "$260", "78% 60%", "Storage"],
    ["Ceramic breakfast set", "$76", "82% 58%", "Table"],
  ];
  const families = ["Seating", "Tables", "Lighting", "Storage", "Textiles"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        <SampleNav
          brand="NORDIC ROOM SHOP"
          compact={compact}
          icons={[<IconSearch key="s" size={14} />, <IconUser key="u" size={14} />, <IconBag key="b" size={14} />]}
          links={["Rooms", "Furniture", "Lighting", "Offers"]}
        />

        <div className={cn("grid flex-1 min-h-0 gap-3 pt-3", compact ? "grid-rows-[0.95fr_1.05fr]" : "grid-cols-[1.05fr_0.95fr]")}>
          <section className="grid min-h-0 grid-rows-[1fr_auto] gap-3">
            <GeneratedStyleImageSurface className="rounded-[var(--st-radius)]" overlay="warm" position="42% 56%" slug="scandinavian" style={{ boxShadow: "var(--st-shadow)" }}>
              <div className="flex h-full flex-col justify-between p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-[var(--st-radius-pill)] bg-[rgb(var(--st-base-rgb)/0.88)] px-2.5 py-1 text-[9px] font-semibold uppercase text-[var(--sample-text)] backdrop-blur-[1px]">
                    Small-space ideas
                  </span>
                  <span className="rounded-[var(--st-radius-pill)] bg-[var(--sample-accent-3)] px-2 py-1 text-[9px] font-bold text-[var(--sample-text)]">20% off oak</span>
                </div>
                <div className="max-w-[19ch] rounded-[var(--st-radius)] bg-[rgb(var(--st-base-rgb)/0.74)] p-3 text-[var(--sample-text)] backdrop-blur-[1px]">
                  <p className="mb-1 text-[9px] font-semibold uppercase text-[var(--sample-muted)]">NORDIC ROOM SHOP</p>
                  <h3
                    className={cn("font-display leading-[1.0]", compact ? "text-[1.55rem]" : "text-[2.45rem]")}
                    style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0" }}
                  >
                    Bright rooms, useful objects.
                  </h3>
                  <span className={cn("mt-3 inline-flex h-8 items-center gap-1.5 rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-4 text-[11px] font-medium text-[var(--sample-base)]", compact ? "hidden" : "")}>
                    Shop the room <IconArrow size={12} />
                  </span>
                </div>
              </div>
            </GeneratedStyleImageSurface>

            <div className="rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.76)] p-2">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase text-[var(--sample-text)]">room-by-room category shelf</span>
                <span className={cn("text-[9px] text-[var(--sample-muted)]", compact ? "hidden" : "")}>ideas by space</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {rooms.map((room, index) => (
                  <span className="grid min-w-0 gap-1 rounded-[calc(var(--st-radius)*0.75)] bg-[var(--sample-base)] p-2 text-center text-[9px] font-semibold text-[var(--sample-text)]" key={room}>
                    <span
                      aria-hidden="true"
                      className="mx-auto h-6 w-full rounded-[calc(var(--st-radius)*0.7)] border border-[var(--sample-border-soft)]"
                      style={{
                        background:
                          index === 0
                            ? "linear-gradient(180deg, rgb(var(--st-accent-2-rgb)/0.34), rgb(var(--st-base-rgb)/0.78))"
                            : index === 1
                              ? "linear-gradient(90deg, rgb(var(--st-accent-rgb)/0.24), rgb(var(--st-surface-rgb)/0.9))"
                              : index === 2
                                ? "linear-gradient(180deg, rgb(var(--st-accent-3-rgb)/0.42), rgb(var(--st-base-rgb)/0.78))"
                                : "linear-gradient(135deg, rgb(var(--st-accent-2-rgb)/0.2), rgb(var(--st-accent-3-rgb)/0.34))",
                      }}
                    />
                    <span className="truncate">{room}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="grid min-h-0 min-w-0 grid-rows-[auto_1fr_auto] gap-3">
            <div className="rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.8)] p-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase text-[var(--sample-text)]">Product families</span>
                <span className="rounded-[var(--st-radius-pill)] bg-[var(--sample-accent)] px-2 py-1 text-[9px] font-bold text-[var(--sample-text)]">new arrivals</span>
              </div>
              <div className="mt-2 flex gap-1.5 overflow-hidden">
                {families.map((family, index) => (
                  <span className={cn("shrink-0 rounded-[var(--st-radius-pill)] border border-[var(--sample-border-soft)] bg-[var(--sample-base)] px-2.5 py-1 text-[9px] text-[var(--sample-muted)]", compact && index > 3 ? "hidden" : "")} key={family}>
                    {family}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid min-h-0 grid-cols-2 gap-2">
              {products.map(([name, price, position, type], index) => (
                <div className={cn("grid min-w-0 grid-rows-[1fr_auto] rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.72)] p-1.5", compact && index > 1 ? "hidden" : "")} key={name}>
                  <GeneratedStyleImageSurface className="min-h-0 rounded-[calc(var(--st-radius)*0.8)]" overlay="soft" position={position} slug="scandinavian">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-3 h-6 rounded-[var(--st-radius-pill)] bg-[rgb(var(--st-base-rgb)/0.72)]"
                      style={{ boxShadow: "0 10px 24px rgb(var(--st-text-rgb) / 0.10)" }}
                    />
                    {index === 0 ? (
                      <span aria-hidden="true" className="absolute bottom-7 left-1/2 h-12 w-11 -translate-x-1/2 rounded-t-[9999px] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.74)]" />
                    ) : index === 1 ? (
                      <span aria-hidden="true" className="absolute bottom-8 left-1/2 h-14 w-9 -translate-x-1/2 rounded-t-[9999px] bg-[rgb(var(--st-accent-3-rgb)/0.42)]" />
                    ) : index === 2 ? (
                      <span aria-hidden="true" className="absolute bottom-7 left-1/2 h-10 w-14 -translate-x-1/2 rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-accent-2-rgb)/0.34)]" />
                    ) : (
                      <span aria-hidden="true" className="absolute bottom-8 left-1/2 h-9 w-12 -translate-x-1/2 rounded-[9999px] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.74)]" />
                    )}
                    <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-[rgb(var(--st-base-rgb)/0.86)] text-[var(--sample-text)]">
                      <IconBag size={12} />
                    </span>
                  </GeneratedStyleImageSurface>
                  <div className="px-1 pb-1 pt-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate text-[9px] font-semibold text-[var(--sample-muted)]">{type}</span>
                      <span className="text-[9px] font-bold text-[var(--sample-accent-3)]">{price}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[10px] font-semibold text-[var(--sample-text)]">{name}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[var(--sample-base)] p-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase text-[var(--sample-text)]">soft utility product cards</span>
                <span className="text-[9px] text-[var(--sample-muted)]">linen · wool · birch · ceramic</span>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {["var(--sample-surface)", "var(--sample-accent)", "var(--sample-accent-2)", "var(--sample-accent-3)"].map((color) => (
                  <span className="h-3 rounded-full" key={color} style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </SampleFrame>
  );
}

function JapandiSpatialLanding({ className, compact = false, style }: Props) {
  const meta = [
    ["Location", "Tokyo"],
    ["Category", "Residential"],
    ["Year", "2021"],
    ["Study", "Wood + paper"],
  ];
  const materials = [
    ["Rice paper", "diffuse light"],
    ["Ash wood", "quiet grain"],
    ["Ceramic", "hand-thrown"],
    ["Moss ink", "soft accent"],
  ];
  const sequence = ["01 Entry garden", "02 Low dining", "03 Paper light", "04 Object shelf"];

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div className="flex h-full flex-col">
        <SampleNav
          align="center"
          brand="KARUMA CASE"
          compact={compact}
          icons={[<IconGlobe key="g" size={14} />]}
          links={["Cases", "Collection", "Artisans", "Creators"]}
        />

        <div className="grid min-h-0 flex-1 grid-rows-[auto_1fr_auto] gap-3 pt-4">
          <div className={cn("grid gap-4", compact ? "grid-cols-[0.9fr_1.1fr]" : "grid-cols-[0.72fr_1.28fr]")}>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase text-[var(--sample-muted)]">LOW HORIZONTAL RESIDENCE</p>
              <h3
                className={cn("mt-3 font-display leading-[1.08]", compact ? "text-[1.45rem]" : "text-[2.35rem]")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0" }}
              >
                Slow rooms for everyday rituals.
              </h3>
              <p className={cn("mt-3 text-[var(--sample-muted)]", compact ? "line-clamp-2 text-[10px] leading-4" : "text-[12px] leading-5")} style={{ fontFamily: "var(--st-font-body)" }}>
                A quiet case-study page where wood, paper light and muted green are arranged as a slow record of place and material.
              </p>
              <div className={cn("mt-4 grid grid-cols-2 gap-1.5", compact ? "hidden" : "")}>
                {meta.map(([label, value]) => (
                  <div className="border-t border-[var(--sample-border-soft)] pt-1.5" key={label}>
                    <span className="block text-[9px] text-[var(--sample-muted)]">{label}</span>
                    <span className="block truncate text-[10px] font-semibold text-[var(--sample-text)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[7rem] overflow-hidden border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2">
              <GeneratedStyleImageSurface className="h-full min-h-0" overlay="soft" position="38% 56%" slug="japandi">
                <span aria-hidden="true" className="absolute inset-y-3 left-3 w-[24%] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-base-rgb)/0.76)] backdrop-blur-[1px]" />
                <span aria-hidden="true" className="absolute bottom-8 left-[34%] h-2 w-[44%] bg-[var(--sample-accent)]/42" />
                <span aria-hidden="true" className="absolute bottom-5 left-[38%] h-5 w-[36%] border-t border-[var(--sample-border-soft)] bg-[var(--sample-base)]/72" />
                <span className="absolute bottom-2.5 left-2.5 bg-[rgb(var(--st-base-rgb)/0.72)] px-1.5 py-0.5 text-[9px] text-[var(--sample-text)] backdrop-blur-[1px]">Azabu Residence · Tokyo</span>
              </GeneratedStyleImageSurface>
            </div>
          </div>

          <div className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.82fr_1.18fr]" : "grid-cols-[0.76fr_1.24fr]")}>
            <div className="grid min-h-0 grid-rows-[auto_1fr] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-base-rgb)/0.5)] p-2">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9px] font-semibold text-[var(--sample-text)]">shoji material index</span>
                <span className="h-2 w-7 bg-[var(--sample-accent-3)]/70" />
              </div>
              <div className="grid min-h-0 gap-1.5">
                {materials.map(([name, note], index) => (
                  <div className={cn("grid grid-cols-[1.2rem_1fr] items-center gap-2", compact && index > 2 ? "hidden" : "")} key={name}>
                    <span
                      aria-hidden="true"
                      className="h-5 border border-[var(--sample-border-soft)]"
                      style={{
                        backgroundColor:
                          index === 0
                            ? "var(--sample-base)"
                            : index === 1
                              ? "var(--sample-accent)"
                              : index === 2
                                ? "var(--sample-surface)"
                                : "var(--sample-accent-3)",
                      }}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-[10px] font-semibold text-[var(--sample-text)]">{name}</span>
                      <span className={cn("block truncate text-[9px] text-[var(--sample-muted)]", compact ? "hidden" : "")}>{note}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid min-h-0 grid-rows-[auto_1fr] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9px] font-semibold text-[var(--sample-text)]">slow case-study sequence</span>
                <span className={cn("text-[9px] text-[var(--sample-muted)]", compact ? "hidden" : "")}>image index 01-04</span>
              </div>
              <div className="grid min-h-0 grid-cols-4 gap-1.5">
                {sequence.map((item, index) => (
                  <div className="relative overflow-hidden bg-[var(--sample-base)]" key={item}>
                    <GeneratedStyleImageSurface className="h-full min-h-[3.8rem]" overlay="soft" position={index % 2 === 0 ? "34% 56%" : "76% 64%"} slug="japandi" />
                    <span className="absolute left-1.5 top-1.5 bg-[rgb(var(--st-base-rgb)/0.7)] px-1 text-[8px] text-[var(--sample-text)] backdrop-blur-[1px]">{item.slice(0, 2)}</span>
                    <span className={cn("absolute inset-x-1.5 bottom-1.5 truncate bg-[rgb(var(--st-base-rgb)/0.68)] px-1 py-0.5 text-[8px] text-[var(--sample-text)] backdrop-blur-[1px]", compact && index > 1 ? "hidden" : "")}>{item.slice(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={cn("grid gap-2", compact ? "hidden" : "grid-cols-[1fr_auto]")}>
            <p className="border-t border-[var(--sample-border-soft)] pt-2 text-[10px] leading-4 text-[var(--sample-muted)]">
              Creator notes stay quiet: architecture, furniture and object details are indexed as material observations before any commercial action.
            </p>
            <span className="self-start border-b border-[var(--sample-text)] pb-1 text-[10px] font-semibold text-[var(--sample-text)]">
              View case <IconArrow className="inline" size={11} />
            </span>
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
              <span className="self-start bg-[rgb(var(--st-base-rgb)/0.74)] px-2 py-1 text-[10px] uppercase text-[var(--sample-text)]/70 backdrop-blur-[1px]">WARM STUDIO PORTFOLIO · selected works 01-16</span>
              <div>
                <h3
                  className={cn("w-fit rounded-[var(--st-radius)] bg-[rgb(var(--st-base-rgb)/0.70)] p-2 font-display leading-[1.02] text-[var(--sample-text)] backdrop-blur-[1px]", compact ? "text-2xl" : "text-3xl md:text-[2.7rem]")}
                  style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0" }}
                >
                  Soft rooms,
                  <br />
                  clear decisions.
                </h3>
                <span className={cn("mt-4 inline-flex h-8 items-center gap-1.5 rounded-[var(--st-radius-pill)] bg-[var(--sample-accent)] px-4 text-[11px] font-medium text-[var(--sample-text)]", compact ? "hidden" : "")}>
                  terracotta consultation CTA <IconArrow size={12} />
                </span>
              </div>
            </div>
          </GeneratedStyleImageSurface>

          <div className="grid min-w-0 grid-rows-[auto_1fr_auto] gap-2.5">
            <div className="flex items-center justify-between rounded-[var(--st-radius)] bg-[rgb(var(--st-surface-rgb)/0.72)] px-3 py-2" style={{ boxShadow: "var(--st-shadow)" }}>
              <span className="text-[10px] font-semibold text-[var(--sample-text)]">linen project stack</span>
              <span className="text-[9px] text-[var(--sample-muted)]">studio / portfolio / contact</span>
            </div>
            <div className="grid min-h-0 grid-rows-3 gap-2.5">
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
            <div className={cn("grid grid-cols-4 gap-1.5", compact ? "hidden" : "")}>
              {["var(--sample-base)", "var(--sample-surface)", "var(--sample-accent)", "var(--sample-accent-2)"].map((color) => (
                <span className="h-4 rounded-[var(--st-radius-pill)]" key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
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
            <p className="text-[10px] font-medium uppercase text-[var(--sample-muted)]">SOFT SERVICE FLOW</p>
            <h3
              className={cn("mt-4 max-w-[16ch] font-display leading-[1.08] [text-wrap:balance]", compact ? "text-2xl" : "text-[2rem] md:text-[2.7rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0" }}
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
                <p className="text-[9px] font-medium uppercase text-[var(--sample-muted)]">frosted consultation card</p>
                <p className="mt-1 text-[12px] leading-5">One clear question at a time.</p>
              </div>
              <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-[var(--sample-text)]">
                <span className="rounded-[var(--st-radius-pill)] bg-[rgb(var(--st-base-rgb)/0.82)] px-2.5 py-1 font-medium backdrop-blur-[1px]">Calm by design</span>
                <span className="rounded-[var(--st-radius-pill)] bg-[rgb(var(--st-base-rgb)/0.82)] px-2.5 py-1 backdrop-blur-[1px]">4.9 / 5</span>
              </span>
            </GeneratedStyleImageSurface>
            <div className="grid gap-2">
              <div className="flex items-center justify-between px-2 text-[9px] text-[var(--sample-muted)]">
                <span className="font-semibold text-[var(--sample-text)]">low-contrast session rail</span>
                <span>soft package states</span>
              </div>
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
              <span className="absolute left-3 top-3 text-[9px] uppercase text-[var(--sample-text)]/55">severe product crop</span>
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
            <p className="text-[9px] uppercase text-[var(--sample-muted)]">QUIET COMMERCE FRAME · Edition 04</p>
            <h3
              className={cn("mt-5 max-w-[12ch] font-display leading-[1.14]", compact ? "text-[1.7rem]" : "text-[2rem] md:text-[2.7rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0" }}
            >
              The Camel Wool Coat
            </h3>
            <p className={cn("text-[var(--sample-muted)]", compact ? "mt-3 line-clamp-2 text-[11px] leading-5" : "mt-6 max-w-[30ch] text-[13px] leading-7")} style={{ fontFamily: "var(--st-font-body)" }}>
              Cut from a single bolt of wool-silk, finished by hand.
            </p>

            <div className={cn("mt-8", compact ? "hidden" : "")}>
              <p className="mb-3 text-[9px] uppercase text-[var(--sample-muted)]">material provenance rail</p>
              <div className="flex gap-8 text-[10px]">
                {details.map(([label, value]) => (
                  <div key={label}>
                    <p className="uppercase tracking-[0.16em] text-[var(--sample-muted)]">{label}</p>
                    <p className="mt-1.5 text-[var(--sample-text)]" style={{ fontFamily: "var(--st-font-body)" }}>{value}</p>
                  </div>
                ))}
              </div>
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
  const directoryRows: Array<[string, string, string, string, boolean]> = [
    ["0001", "/exhibitions/current", "Concrete hall index", "open", false],
    ["0002", "/archive/plain-html", "Default controls study", "archived", true],
    ["0003", "/calendar/now", "June programme table", "today", false],
    ["0004", "/tickets/counter", "No-app ticket queue", "slow", false],
    ["0005", "/press/raw-images", "Photocopy proof folder", "jpg", false],
    ["0006", "/shop/poster-forms", "Order form and receipt", "form", true],
  ];
  const linkMap = ["visit", "tickets", "exhibitions", "archive", "press", "library", "contact", "shop"];
  const statusRows: Array<[string, string]> = [
    ["css", "minimal"],
    ["radius", "0"],
    ["shadow", "none"],
    ["weight", "raw"],
  ];
  const visited = "#551A8B";
  const link = "#0000EE";

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div
        className="grid h-full grid-rows-[auto_auto_1fr_auto] overflow-hidden border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] font-mono text-[var(--sample-text)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.035) 0, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 18px)",
        }}
      >
        <div className="grid grid-cols-[1fr_auto] items-center border-b border-[var(--sample-border)] bg-[var(--sample-base)] px-2.5 py-1 text-[8px] uppercase leading-none">
          <span className="font-bold">RAW WEB INDEX</span>
          <span className={cn("text-right", compact ? "hidden" : "")}>plain document / 06.2026</span>
        </div>
        <div className="border-b-2 border-[var(--sample-border)] bg-white px-2.5 py-2">
          <h3
            className={cn("max-w-[14ch] font-display uppercase leading-[0.78]", compact ? "text-[1.55rem]" : "text-[2.85rem] md:text-[3.7rem]")}
            style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0" }}
          >
            Brutalist Sites List
          </h3>
          <nav className={cn("mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[9px] leading-4", compact ? "max-h-8 overflow-hidden" : "")} aria-label="institutional link map">
            {linkMap.map((item, index) => (
              <span className="underline" key={item} style={{ color: index === 3 || index === 7 ? visited : link }}>
                {item}
              </span>
            ))}
            <span className="font-bold text-[var(--sample-text)]">institutional link map</span>
          </nav>
        </div>
        <div className={cn("grid min-h-0", compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-[1.34fr_0.66fr]")}>
          <div className={cn("grid min-w-0 grid-rows-[auto_1fr]", compact ? "" : "md:border-r-2 md:border-[var(--sample-border)]")}>
            <div className="grid grid-cols-[auto_1fr_auto] items-center border-b border-[var(--sample-border)] bg-[#f0f0f0] text-[8px] uppercase">
              <span className="border-r border-[var(--sample-border)] px-2 py-1 font-bold">directory</span>
              <span className="px-2 py-1">click blue text only</span>
              <span className={cn("border-l border-[var(--sample-border)] px-2 py-1 text-[#ff0000]", compact ? "hidden" : "")}>server 200</span>
            </div>
            <table className="w-full table-fixed border-collapse bg-white text-[9px] leading-4">
              <thead>
                <tr className="border-b-2 border-[var(--sample-border)] bg-[var(--sample-base)] text-left">
                  <th className="w-10 px-1.5 py-1 font-bold">id</th>
                  <th className="px-1.5 py-1 font-bold">url</th>
                  <th className={cn("px-1.5 py-1 font-bold", compact ? "hidden" : "table-cell")}>record</th>
                  <th className="w-12 px-1.5 py-1 font-bold">state</th>
                </tr>
              </thead>
              <tbody>
                {directoryRows.map(([number, url, title, state, isVisited]) => (
                  <tr className="border-b border-[var(--sample-border)]/50 last:border-b-0" key={url}>
                    <td className="px-1.5 py-1 align-top text-[var(--sample-muted)]">{number}</td>
                    <td className="truncate px-1.5 py-1 align-top">
                      <span className="underline" style={{ color: isVisited ? visited : link }}>{url}</span>
                    </td>
                    <td className={cn("truncate px-1.5 py-1 align-top text-[var(--sample-muted)]", compact ? "hidden" : "table-cell")}>{title}</td>
                    <td className="px-1.5 py-1 align-top text-[var(--sample-text)]">{state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={cn("grid min-h-0 grid-rows-[auto_auto_1fr] bg-white", compact ? "hidden" : "")}>
            <GeneratedStyleImageSurface className="h-[84px] border-b-2 border-[var(--sample-border)]" overlay="soft" position="50% 52%" slug="brutalism" style={{ filter: "grayscale(1) contrast(1.18)" }}>
              <span className="absolute bottom-1 left-1 border border-[var(--sample-border)] bg-white px-1 py-0.5 text-[7px] font-bold uppercase text-[var(--sample-text)]">
                proof_scan_04.jpg
              </span>
            </GeneratedStyleImageSurface>
            <form className="grid gap-1.5 border-b-2 border-[var(--sample-border)] p-2 text-[8px]">
              <p className="font-bold">default submit queue</p>
              <label className="grid gap-0.5">
                email
                <input className="w-full border-2 border-[var(--sample-border)] bg-white px-1 py-0.5 text-[8px] text-[var(--sample-text)]" defaultValue="mail@example.org" />
              </label>
              <label className="grid gap-0.5">
                topic
                <select className="w-full border-2 border-[var(--sample-border)] bg-white px-1 py-0.5 text-[8px] text-[var(--sample-text)]" defaultValue="visit">
                  <option value="visit">visit request</option>
                  <option value="archive">archive notice</option>
                </select>
              </label>
              <label className="flex items-center gap-1">
                <input className="h-3 w-3 accent-black" defaultChecked type="checkbox" />
                no newsletter design
              </label>
              <button className="w-full border-2 border-[var(--sample-border)] bg-[#e5e5e5] px-2 py-1 text-left text-[8px] font-bold text-[var(--sample-text)]" type="button">
                Submit form
              </button>
            </form>
            <div className="grid content-start gap-1 p-2 text-[8px]">
              {statusRows.map(([label, value]) => (
                <div className="grid grid-cols-[3.5rem_1fr] border-b border-[var(--sample-border)]/40 pb-0.5" key={label}>
                  <span className="font-bold uppercase">{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className={cn("border-t-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-2.5 py-1 text-[8px] text-[var(--sample-muted)]", compact ? "truncate" : "")}>
          Links are underlined. Buttons look like buttons. No playful shadows.
        </p>
      </div>
    </SampleFrame>
  );
}

function NeoBrutalistApp({ className, compact = false, style }: Props) {
  const box = "border-[3px] border-[var(--sample-border)]";
  const box2 = "border-2 border-[var(--sample-border)]";
  const hardShadow = { boxShadow: "6px 6px 0 var(--sample-border)" };
  const smallShadow = { boxShadow: "4px 4px 0 var(--sample-border)" };
  const products: Array<{ name: string; meta: string; price: string; tone: "yellow" | "blue" | "coral" }> = [
    { name: "Brush Pack 04", meta: "47 stamps · instant files", price: "$19", tone: "yellow" },
    { name: "Creator Template", meta: "Notion OS · 1 license", price: "$8", tone: "blue" },
    { name: "Mini Course", meta: "6 lessons · 2h video", price: "$31", tone: "coral" },
  ];
  const payouts: Array<[string, string]> = [
    ["Stripe", "ON"],
    ["Instant payout", "ON"],
  ];
  const toneBg = (tone: string) =>
    tone === "yellow" ? "bg-[var(--sample-accent)]" : tone === "blue" ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-accent-2)]";

  return (
    <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(var(--sample-border) 1px, transparent 1px), linear-gradient(90deg, var(--sample-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative flex h-full min-h-0 flex-col gap-4">
        {/* storefront header */}
        <header className="flex items-center gap-2">
          <span className={cn("grid h-7 w-7 place-items-center bg-[var(--sample-accent-3)] font-display text-sm font-black", box)} style={smallShadow}>
            N
          </span>
          <span className="font-display text-sm font-black" style={{ letterSpacing: "-0.01em" }}>
            GUMSTAND
          </span>
          <nav className={cn("ml-2 items-center gap-3 text-[10px] font-black uppercase", compact ? "hidden" : "flex")}>
            <span>Products</span>
            <span>Pricing</span>
            <span>Pages</span>
          </nav>
          <div className="ml-auto flex items-center gap-2 text-[10px] font-black">
            <span className={cn("items-center gap-1 bg-[var(--sample-accent)] px-2 py-1", box, compact ? "hidden" : "flex")}>
              <IconStar size={10} /> $2.1k
            </span>
            <span className={cn("bg-[var(--sample-text)] px-2.5 py-1 text-[var(--sample-base)]", box)} style={smallShadow}>
              Start selling
            </span>
          </div>
        </header>

        {/* hero + featured product */}
        <div className={cn("grid min-h-0 gap-4", compact ? "grid-cols-[1.05fr_0.95fr]" : "grid-cols-1 md:grid-cols-[1.1fr_0.9fr] md:gap-6")}>
          <div className="grid min-w-0 content-start gap-3">
            <span className={cn("w-max bg-[var(--sample-accent-2)] px-2 py-1 text-[9px] font-black uppercase", box)} style={smallShadow}>
              ◆ creator drop live
            </span>
            <h3
              className={cn("font-display uppercase leading-[0.95]", compact ? "text-[1.5rem]" : "text-[2.1rem] md:text-[2.75rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0" }}
            >
              Go from zero
              <br />
              to your first{" "}
              <span className={cn("inline-block bg-[var(--sample-accent)] px-2", box)} style={smallShadow}>
                $1K
              </span>
              .
            </h3>
            <p className={cn("font-bold text-[var(--sample-muted)]", compact ? "line-clamp-2 text-[10px] leading-4" : "max-w-sm text-[13px] leading-6")}>
              A loud little storefront for digital goods — checkout, pricing and instant payouts, all one tap away.
            </p>
            <div className={cn("flex-wrap gap-2", compact ? "hidden" : "flex")}>
              <span className={cn("inline-flex items-center gap-1.5 bg-[var(--sample-text)] px-4 py-2 text-xs font-black text-[var(--sample-base)]", box)} style={smallShadow}>
                Start selling <IconArrow size={13} />
              </span>
              <span className={cn("inline-flex items-center bg-[var(--sample-surface)] px-3 py-2 text-xs font-black", box)} style={smallShadow}>
                See demo
              </span>
            </div>
            <div className={cn("items-center gap-3 text-[10px] font-black", compact ? "hidden" : "flex")}>
              <span className="flex items-center gap-1">
                <IconStar size={11} /> 4.9 / 5
              </span>
              <span className="text-[var(--sample-muted)]">1,204 creators paid out</span>
            </div>
          </div>

          <div className={cn("grid content-start gap-2.5 bg-[var(--sample-accent)] p-3", box)} style={hardShadow}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase">Featured drop</span>
              <span className={cn("bg-[var(--sample-surface)] px-2 py-0.5 text-[8px] font-black", box)}>#04</span>
            </div>
            <GeneratedStyleImageSurface className={cn("aspect-[16/10] w-full bg-[var(--sample-surface)]", box)} overlay="none" position="50% 50%" slug="new-brutalism" />
            <div className="flex items-end justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] font-black">Brush Pack No.4</p>
                <p className="truncate text-[9px] font-bold text-[var(--sample-muted)]">47 stamps · instant files</p>
              </div>
              <span className={cn("bg-[var(--sample-surface)] px-2 py-0.5 text-[11px] font-black", box)}>$19</span>
            </div>
            <button type="button" className={cn("flex items-center justify-center gap-1.5 bg-[var(--sample-text)] px-3 py-2 text-[10px] font-black uppercase text-[var(--sample-base)]", box)} style={smallShadow}>
              <IconBag size={12} /> Add to cart — $19
            </button>
          </div>
        </div>

        {/* product grid (full only) */}
        <div className={cn("grid-cols-3 gap-3", compact ? "hidden" : "grid")}>
          {products.map((product) => (
            <div className={cn("grid content-between gap-2 p-2.5", box, toneBg(product.tone))} key={product.name} style={smallShadow}>
              <div className="flex items-center justify-between">
                <span className={cn("grid h-6 w-6 place-items-center bg-[var(--sample-surface)] text-[10px] font-black", box2)}>★</span>
                <span className={cn("bg-[var(--sample-surface)] px-1.5 py-0.5 text-[10px] font-black", box2)}>{product.price}</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-black">{product.name}</p>
                <p className="truncate text-[8px] font-bold text-[var(--sample-muted)]">{product.meta}</p>
              </div>
              <button type="button" className={cn("bg-[var(--sample-text)] px-2 py-1 text-[9px] font-black uppercase text-[var(--sample-base)]", box2)}>
                Add +
              </button>
            </div>
          ))}
        </div>

        {/* payout strip (full only) */}
        <div className={cn("items-center justify-between gap-2 bg-[var(--sample-surface)] px-3 py-2 text-[9px] font-black", box, compact ? "hidden" : "flex")} style={smallShadow}>
          <span className="uppercase">instant payouts</span>
          <div className="flex items-center gap-2">
            {payouts.map(([label, value]) => (
              <span className="flex items-center gap-1" key={label}>
                {label}
                <span className={cn("grid h-4 w-8 place-items-center bg-[var(--sample-accent-3)]", box2)}>{value}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function AntiDesignLanding({ className, compact = false, style }: Props) {
  const projectRail: Array<[string, string]> = [
    ["01", "Typeforce jelly glyph"],
    ["02", "Handshake desktop flip"],
    ["03", "HTML issue crawl"],
  ];

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
          <span className="truncate">OFF-GRID PORTFOLIO / channel: anti-design</span>
          <span className="ml-auto whitespace-nowrap">1,204 connections</span>
        </div>
        {/* marquee */}
        <div className="overflow-hidden whitespace-nowrap border-x-2 border-b-2 border-[var(--sample-border)] bg-[var(--sample-accent)] py-0.5 text-[9px] font-bold text-[var(--sample-surface)]">
          scribble navigation path to case / not / contact / maybe / archive / no order / still readable /&nbsp;
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
            <span className="text-[9px] uppercase text-[var(--sample-accent-2)]">case intro / project shell</span>
            <p
              className={cn("font-display lowercase leading-[0.95]", compact ? "text-lg" : "text-2xl md:text-[2.25rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)" }}
            >
              portfolio follows nothing.
            </p>
            <span className="text-[9px] text-[var(--sample-base)]/70">lead: creative dev / no polished grid</span>
          </div>
          {/* link block */}
          <div
            className="relative z-30 border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-2 text-[10px]"
            style={{ clipPath: "polygon(6% 0, 100% 0, 92% 100%, 0 82%)", transform: "rotate(2deg)" }}
          >
            <span className="text-[8px] uppercase text-[var(--sample-muted)]">project 01</span>
            <p className="mt-1 break-all underline" style={{ color: "#0000EE" }}>interactive glyph launch</p>
            <p className="mt-1 text-[8px] leading-tight">client / designer / weird prototype</p>
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
            <span className="text-[var(--sample-muted)]">wrong-way project rail</span>
            <div className="mt-1 grid gap-1">
              {projectRail.map(([number, title]) => (
                <div className="flex items-center justify-between border border-[var(--sample-border)] bg-white px-1.5 py-0.5" key={title}>
                  <span>{number}</span>
                  <span className="truncate pl-2">{title}</span>
                </div>
              ))}
            </div>
            <label className="mt-1.5 flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 border border-[var(--sample-border)] bg-[var(--sample-accent-2)]" /> deliberately off route
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
            <span className="uppercase">contact</span>
            <p className="mt-1 leading-tight">hello / but not centered</p>
          </div>
          {/* dotted image block */}
          <div
            className={cn("relative z-30 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]", compact ? "hidden" : "")}
            style={{ backgroundImage: "radial-gradient(circle at 6px 6px, var(--sample-accent-2) 0 2px, transparent 3px)", backgroundSize: "12px 12px", borderRadius: "44% 56% 42% 58%", transform: "rotate(-8deg)" }}
          />
        </div>

        {/* raw footer */}
        <div className="flex items-center justify-between border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-[9px] text-[var(--sample-base)]">
          <span>portfolio route: crooked</span>
          <span className="underline" style={{ color: "#FF27CE" }}>+ add project</span>
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
  const categoryWall: Array<[string, string]> = [
    ["Floral", "52"],
    ["Paisley", "18"],
    ["Jungle", "34"],
    ["Silk", "09"],
    ["Home", "27"],
    ["Drops", "06"],
  ];

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
          <span className="font-display text-sm leading-none" style={{ fontFamily: "var(--st-font-display)" }}>PATTERN MARKET</span>
          <nav className={cn("ml-2 items-center gap-3", compact ? "hidden" : "flex")}>
            <span>New</span>
            <span>Prints</span>
            <span>Stories</span>
            <span>Fabric map</span>
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
              <p className="text-[8px] font-black tracking-[0.14em]">campaign tile stack</p>
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

            <div className={cn("grid gap-1.5 border-2 border-[var(--sample-surface)] bg-[var(--sample-base)] p-1.5 text-[var(--sample-surface)]", compact ? "grid-cols-2" : "grid-cols-3")} style={{ boxShadow: "2px 2px 0 rgb(0 0 0 / 0.25)" }}>
              <p className={cn("col-span-full text-[8px] font-black", compact ? "hidden" : "")}>ornamental category wall</p>
              {categoryWall.map(([label, count], index) => (
                <span
                  className="grid min-h-7 grid-cols-[1fr_auto] items-center gap-1 border-2 border-[var(--sample-surface)] px-1.5 text-[7px] font-black uppercase"
                  key={label}
                  style={{
                    backgroundColor: index % 3 === 0 ? "var(--sample-accent)" : index % 3 === 1 ? "var(--sample-accent-2)" : "var(--sample-accent-3)",
                    color: index % 3 === 2 ? "var(--sample-base)" : "var(--sample-surface)",
                  }}
                >
                  <span className="truncate">{label}</span>
                  <span>{count}</span>
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

function DeconstructiveExhibition({ className, compact = false, style }: Props) {
  const filters = compact ? ["Built", "Archive", "1980-89"] : ["Architecture", "Cultural", "Built", "1980-89", "Asia", "Competition"];
  const projects: Array<[string, string, string]> = [
    ["MOCAPE", "Shenzhen · 2007-16", "realized"],
    ["The Peak", "Hong Kong · 1982", "archive"],
    ["Rooftop Remodeling", "Vienna · 1985", "study"],
  ];
  const faultNotes = compact ? ["warped plane", "clashed lines"] : ["twisted volumes", "warped planes", "clashed lines", "structurally sound"];
  const sectionRows: Array<[string, string]> = [
    ["01", "Exhibition record"],
    ["02", "Installation image"],
    ["03", "Publication model"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <GeneratedStyleImageSurface className="absolute inset-0 opacity-28" overlay="soft" position="50% 45%" slug="deconstructivism" style={{ filter: "grayscale(1) contrast(1.18)" }} />
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(var(--st-text-rgb) / 0.1) 1px, transparent 1px), linear-gradient(180deg, rgb(var(--st-text-rgb) / 0.08) 1px, transparent 1px), linear-gradient(180deg, rgb(var(--st-base-rgb) / 0.9), rgb(var(--st-base-rgb) / 0.76))",
          backgroundSize: "52px 52px, 52px 52px, auto",
        }}
      />
      <span aria-hidden="true" className="absolute left-[-10%] top-[24%] h-[46%] w-[72%] border-2 border-[var(--sample-border)] bg-[rgb(var(--st-accent-3-rgb)/0.42)]" style={{ clipPath: "polygon(0 18%, 83% 0, 100% 100%, 22% 88%)" }} />
      <span aria-hidden="true" className="absolute bottom-[-8%] right-[-6%] h-[46%] w-[60%] bg-[rgb(var(--st-accent-2-rgb)/0.18)]" style={{ clipPath: "polygon(18% 0, 100% 34%, 72% 100%, 0 72%)" }} />
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-[var(--sample-border)] opacity-70" fill="none" preserveAspectRatio="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 500 360">
        <path d="M0 214 500 86 M82 360 286 24 M278 0 354 360 M0 114 214 360 M312 78 500 246" />
        <path d="M45 318 192 118 334 144 470 32" strokeDasharray="6 7" />
      </svg>
      <span aria-hidden="true" className="absolute right-[9%] top-[18%] h-28 w-2 rotate-[32deg] bg-[var(--sample-accent)]" />
      <span aria-hidden="true" className="absolute left-[34%] top-[48%] h-24 w-1.5 -rotate-[28deg] bg-[var(--sample-accent-2)]" />

      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-2">
        <header className="flex min-w-0 items-start gap-2 text-[9px] font-bold text-[var(--sample-text)]">
          <div className="min-w-0 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1">
            <span className="block truncate font-display text-[12px] leading-none" style={{ fontFamily: "var(--st-font-display)" }}>ARCHIVE / 1988</span>
            <span className="block truncate text-[7px] text-[var(--sample-muted)]">apparent instability, structurally sound</span>
          </div>
          <nav className={cn("min-w-0 flex-1 flex-wrap gap-1", compact ? "hidden" : "flex")}>
            {filters.map((filter) => (
              <span className="border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.72)] px-1.5 py-1 text-[7px]" key={filter}>{filter}</span>
            ))}
          </nav>
          <span className="ml-auto shrink-0 bg-[var(--sample-text)] px-2 py-1 text-[8px] text-[var(--sample-base)]">STRUCTURAL FAULT</span>
        </header>

        <main className="relative min-h-0">
          <section className="absolute left-0 top-[3%] z-20 w-[62%] -rotate-[1.5deg] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-3 sm:w-[53%]" style={{ boxShadow: "6px 7px 0 rgb(17 19 21 / 0.18)", clipPath: "polygon(0 0, 100% 0, 98% 88%, 8% 100%, 0 92%)" }}>
            <p className="text-[8px] font-bold text-[var(--sample-accent)]">fracture section index</p>
            <h3
              className={cn("mt-1 font-display uppercase leading-[0.83]", compact ? "text-[1.45rem]" : "text-[2rem] sm:text-[2.75rem] md:text-[3.35rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Forms under stress.
            </h3>
            <p className={cn("mt-2 text-[10px] leading-4 text-[var(--sample-muted)]", compact ? "hidden" : "")}>
              A built-not-broken archive where flaws are intrinsic to the structure, not random rotation.
            </p>
          </section>

          <section className="absolute right-0 top-[1%] z-10 h-[47%] w-[43%] rotate-[2deg] border-2 border-[var(--sample-border)] bg-[var(--sample-base)]" style={{ clipPath: "polygon(12% 0, 100% 7%, 88% 100%, 0 86%)", boxShadow: "6px 7px 0 rgb(17 19 21 / 0.18)" }}>
            <GeneratedStyleImageSurface className="h-full w-full" overlay="soft" position="50% 48%" slug="deconstructivism">
              <span className="absolute left-2 top-2 bg-[var(--sample-base)]/80 px-1.5 py-0.5 text-[7px] font-bold text-[var(--sample-text)]">model slab A-03</span>
              <span className="absolute bottom-1.5 left-2 bg-[var(--sample-base)]/82 px-1.5 py-0.5 text-[8px] font-bold text-[var(--sample-text)]">Phaeno / Wolfsburg</span>
            </GeneratedStyleImageSurface>
          </section>

          <section className="absolute bottom-[2%] right-[2%] z-30 w-[53%] rotate-[1.2deg] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]" style={{ boxShadow: "6px 7px 0 rgb(17 19 21 / 0.18)" }}>
            <div className="flex items-center justify-between border-b-2 border-[var(--sample-border)] px-2.5 py-1">
              <p className="text-[8px] font-bold">displaced project axis</p>
              <span className="text-[7px] text-[var(--sample-muted)]">filter/status</span>
            </div>
            {projects.map(([name, meta, status], index) => (
              <div className={cn("grid grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-2 border-b border-[var(--sample-border)]/35 px-2.5 py-1.5 last:border-b-0", compact && index === 2 ? "hidden" : "")} key={name}>
                <span className="text-[8px] tabular-nums text-[var(--sample-accent)]">0{index + 1}</span>
                <span className="min-w-0">
                  <span className="block truncate text-[9px] font-black">{name}</span>
                  <span className="block truncate text-[7px] text-[var(--sample-muted)]">{meta}</span>
                </span>
                <span className="shrink-0 border border-[var(--sample-border)] px-1 py-0.5 text-[7px] text-[var(--sample-accent-2)]">{status}</span>
              </div>
            ))}
          </section>

          <aside className={cn("absolute bottom-[3%] left-0 z-30 w-[42%] border-2 border-[var(--sample-border)] bg-[rgb(var(--st-base-rgb)/0.9)]", compact ? "hidden" : "")}>
            {sectionRows.map(([step, label]) => (
              <div className="grid grid-cols-[2rem_1fr] border-b border-[var(--sample-border)]/35 last:border-b-0" key={step}>
                <span className="border-r border-[var(--sample-border)]/35 px-2 py-1.5 text-[8px] font-bold text-[var(--sample-accent)]">{step}</span>
                <span className="truncate px-2 py-1.5 text-[8px] font-bold text-[var(--sample-text)]">{label}</span>
              </div>
            ))}
          </aside>
        </main>

        <footer className="flex min-w-0 items-center gap-1">
          {faultNotes.map((note) => (
            <span className="min-w-0 flex-1 truncate border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.74)] px-1.5 py-1 text-center text-[7px] font-bold text-[var(--sample-text)]" key={note}>{note}</span>
          ))}
        </footer>
      </div>
    </SampleFrame>
  );
}

function AvantGardeEditorial({ className, compact = false, style }: Props) {
  const program: Array<[string, string, string]> = [
    ["Dec 03", "Revolutionary impulse gallery walk", style.palette.accent],
    ["Feb 08", "Scholars respond lecture", style.palette.accent2],
    ["Mar 12", "Publication room / graphic design", style.palette.accent3],
  ];
  const agenda = compact ? ["production", "film", "photomontage"] : ["art-into-life agenda", "production", "film", "photomontage", "book design"];
  const discourse = [
    ["01", "artists"],
    ["02", "events"],
    ["03", "essays"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span aria-hidden="true" className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "linear-gradient(90deg, var(--sample-border-soft) 1px, transparent 1px), linear-gradient(180deg, var(--sample-border-soft) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
      <span aria-hidden="true" className="absolute -left-14 bottom-8 h-10 w-[62%] -rotate-[18deg] bg-[var(--sample-accent)]" />
      <span aria-hidden="true" className="absolute right-[16%] top-8 h-[62%] w-8 rotate-[34deg] bg-[var(--sample-accent-2)]" />
      <span aria-hidden="true" className="absolute right-8 bottom-8 h-12 w-12 rotate-45 bg-[var(--sample-accent-3)]" />

      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-2.5">
        <header className="grid grid-cols-[1fr_auto] items-start gap-2 border-b-2 border-[var(--sample-border)] pb-2 text-[9px] font-bold">
          <div className="min-w-0">
            <span className="block font-display text-[15px] leading-none" style={{ fontFamily: "var(--st-font-display)" }}>KUNSTHALLE</span>
            <span className="block truncate text-[7px] text-[var(--sample-muted)]">artists / events / discourse</span>
          </div>
          <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-[8px] text-[var(--sample-base)]">MANIFESTO PROGRAM</span>
        </header>

        <main className={cn("grid min-h-0 gap-2.5", compact ? "grid-cols-[1.1fr_0.9fr]" : "grid-cols-[1.12fr_0.88fr]")}>
          <section className="relative min-h-0 overflow-hidden border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] text-[var(--sample-base)]">
            <GeneratedStyleImageSurface className="absolute inset-0 opacity-55" overlay="dark" position="48% 46%" slug="avant-garde" />
            <span aria-hidden="true" className="absolute -right-7 top-8 h-4 w-48 rotate-[32deg] bg-[var(--sample-accent)]" />
            <span aria-hidden="true" className="absolute bottom-10 left-[-20px] h-5 w-44 rotate-[-18deg] bg-[var(--sample-accent-2)]" />
            <span aria-hidden="true" className="absolute left-3 top-3 h-7 w-7 rounded-full bg-[var(--sample-accent-3)]" />
            <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] p-3">
              <span className="w-fit bg-[var(--sample-base)] px-2 py-0.5 text-[8px] font-bold text-[var(--sample-text)]">Exhibition / Floor 3</span>
              <h3
                className={cn("self-center font-display uppercase leading-[0.75]", compact ? "text-[2rem]" : "text-[2.08rem] sm:text-[3.45rem]")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", textShadow: "0 2px 16px rgb(0 0 0 / 0.7)" }}
              >
                Break form.
                <br />
                Build public.
              </h3>
              <div className="flex items-end justify-between gap-2 text-[8px] font-bold text-[var(--sample-base)]">
                <span className="bg-[var(--sample-text)]/68 px-1.5 py-0.5">1912-1935 / galleries</span>
                <span className="bg-[var(--sample-text)]/68 px-1.5 py-0.5">poetry / film / type</span>
              </div>
            </div>
          </section>

          <section className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-2">
            <div className="border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-2">
              <p className="text-[8px] font-bold text-[var(--sample-accent)]">critical lecture rail</p>
              <p className={cn("mt-1 font-display uppercase leading-[0.84]", compact ? "text-[1rem]" : "text-[1.35rem]")} style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)" }}>
                Design must argue with its own tools.
              </p>
            </div>
            <div className="grid content-start gap-1.5">
              {program.map(([date, title, color], index) => (
                <div className={cn("grid grid-cols-[2rem_minmax(0,1fr)] border-2 border-[var(--sample-border)] bg-[var(--sample-base)]", compact && index === 2 ? "hidden" : "")} key={title}>
                  <span className="border-r-2 border-[var(--sample-border)] px-1 py-2 text-[7px] font-bold text-[var(--sample-muted)]">{date}</span>
                  <span className="min-w-0 px-2 py-1.5">
                    <span className="block h-1.5 w-7" style={{ backgroundColor: color }} />
                    <span className="mt-1 block truncate text-[9px] font-bold leading-tight">{title}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] text-[var(--sample-base)]">
              {discourse.map(([number, label]) => (
                <span className="border-r border-[var(--sample-base)]/35 px-1.5 py-1.5 text-[7px] font-bold last:border-r-0" key={label}>{number} {label}</span>
              ))}
            </div>
          </section>
        </main>

        <footer className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center border-2 border-[var(--sample-border)] bg-[var(--sample-base)]">
          <span className="border-r-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-2 py-1.5 text-[8px] font-bold text-[var(--sample-base)]">art-into-life agenda</span>
          <div className="flex min-w-0 gap-1 overflow-hidden px-1.5">
            {agenda.map((item) => (
              <span className="truncate border border-[var(--sample-border-soft)] px-1.5 py-0.5 text-[7px] font-bold text-[var(--sample-text)]" key={item}>{item}</span>
            ))}
          </div>
        </footer>
      </div>
    </SampleFrame>
  );
}

function PostmodernArchivePortal({ className, compact = false, style }: Props) {
  const works: Array<[string, string, string]> = [
    ["Graves bridge", "architecture", style.palette.accent],
    ["Warhol box", "popular culture", style.palette.accent2],
    ["Koons object", "ornament", style.palette.accent3],
  ];
  const shelf: Array<[string, string]> = [
    ["Beverly", "sideboard"],
    ["Super", "lamp"],
    ["Bel-Air", "chair"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span aria-hidden="true" className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: "linear-gradient(90deg, var(--sample-border-soft) 1px, transparent 1px), linear-gradient(0deg, var(--sample-border-soft) 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
      <span aria-hidden="true" className="absolute -left-10 bottom-5 h-40 w-40 rounded-full border-[20px] border-[var(--sample-accent-2)] opacity-75" />
      <span aria-hidden="true" className="absolute right-4 top-12 h-28 w-5 rotate-[21deg] bg-[var(--sample-accent)]" />
      <span aria-hidden="true" className="absolute left-[46%] top-4 h-8 w-8 rotate-45 border border-[var(--sample-border)] bg-[var(--sample-accent-3)]" />
      <span aria-hidden="true" className="absolute left-[8%] top-[26%] h-28 w-16 border border-[var(--sample-border)] bg-[var(--sample-surface)]" style={{ clipPath: "polygon(18% 0, 82% 0, 82% 12%, 70% 12%, 70% 100%, 30% 100%, 30% 12%, 18% 12%)" }} />

      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-2.5">
        <header className="flex min-w-0 items-center gap-2 text-[9px] font-black">
          <span className="shrink-0 border border-[var(--sample-border)] bg-[var(--sample-surface)] px-2.5 py-1 font-serif">CLASSICAL QUOTE</span>
          <nav className={cn("min-w-0 flex-1 items-center gap-2 text-[8px]", compact ? "hidden" : "flex")}>
            <span>culture collage</span>
            <span style={{ color: "var(--sample-accent)" }}>works</span>
            <span>shop</span>
          </nav>
          <span className="ml-auto grid h-6 w-6 shrink-0 place-items-center border border-[var(--sample-border)] bg-[var(--sample-accent)] text-[10px]">04</span>
        </header>

        <main className={cn("grid min-h-0 gap-2.5", compact ? "grid-cols-[1.03fr_0.97fr]" : "grid-cols-[1.08fr_0.92fr]")}>
          <div
            className="relative grid min-w-0 grid-rows-[auto_1fr_auto] overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3"
            style={{
              backgroundImage: `linear-gradient(180deg, rgb(var(--st-surface-rgb) / 0.54), rgb(var(--st-surface-rgb) / 0.24)), url('${GENERATED_STYLE_IMAGES.postmodernism}')`,
              backgroundPosition: "50% 52%",
              backgroundSize: "cover",
              boxShadow: compact ? "5px 6px 0 rgb(var(--st-accent-2-rgb) / 0.28)" : "9px 11px 0 rgb(var(--st-accent-2-rgb) / 0.32)",
            }}
          >
            <span className="w-fit border border-[var(--sample-border)] bg-[var(--sample-accent)] px-2 py-0.5 text-[8px] font-black">ironic object index</span>
            <h3
              className={cn("self-center max-w-[10ch] font-serif leading-[0.86]", compact ? "text-[1.65rem]" : "text-[2.85rem] sm:text-[3.4rem]")}
              style={{ textShadow: "0 2px 14px rgb(255 253 246 / 0.78)" }}
            >
              Past forms
              <br />
              misbehave.
            </h3>
            <div className="flex items-end justify-between gap-2">
              <p className={cn("max-w-[12rem] border border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1.5 text-[8px] font-bold leading-3.5", compact ? "line-clamp-2" : "")}>
                Museum label, shop shelf, and pop joke share one page.
              </p>
              <span className="h-7 w-7 shrink-0 border border-[var(--sample-border)] bg-[var(--sample-accent-3)]" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
            </div>
          </div>

          <div className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-2">
            <div className="border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2.5" style={{ boxShadow: "6px 7px 0 rgb(var(--st-accent-rgb) / 0.26)" }}>
              <p className="text-[8px] font-black" style={{ color: "var(--sample-accent)" }}>mixed-era object index</p>
              <p className={cn("mt-1 font-serif font-bold leading-[0.95]", compact ? "line-clamp-2 text-[14px]" : "text-[18px]")}>Quotation becomes navigation.</p>
            </div>

            <div className="grid min-h-0 content-start gap-1.5">
              {works.map(([name, meta, color], index) => (
                <div className={cn("grid min-h-0 grid-cols-[48px_minmax(0,1fr)] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-1.5", compact && index === 2 ? "hidden" : "")} style={{ boxShadow: "4px 5px 0 rgb(var(--st-accent-3-rgb) / 0.34)" }} key={name}>
                  <span className="block min-h-[34px] border border-[var(--sample-border)]" style={{ backgroundColor: color, backgroundImage: "linear-gradient(135deg, rgb(var(--st-surface-rgb) / 0.72) 0 38%, transparent 38% 100%)" }} />
                  <span className="flex min-w-0 flex-col justify-between pl-2">
                    <span className="truncate text-[9px] font-black leading-tight">{name}</span>
                    <span className="text-[7px] font-bold" style={{ color: "var(--sample-accent)" }}>{meta}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="border border-[var(--sample-border)] bg-[var(--sample-base)]">
              <p className="border-b border-[var(--sample-border)] px-2 py-1 text-[8px] font-black text-[var(--sample-accent-2)]">Memphis anti-functional shop</p>
              <div className="grid grid-cols-3">
                {shelf.map(([name, kind], index) => (
                  <span className="min-w-0 border-r border-[var(--sample-border)] px-1.5 py-1.5 text-[7px] font-bold last:border-r-0" key={name}>
                    <span className="block truncate" style={{ color: index === 1 ? "var(--sample-accent)" : "var(--sample-text)" }}>{name}</span>
                    <span className="block truncate text-[var(--sample-muted)]">{kind}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className={cn("grid grid-cols-3 border border-[var(--sample-border)] bg-[var(--sample-surface)] text-[7px] font-black", compact ? "hidden" : "")}>
          <span className="border-r border-[var(--sample-border)] px-2 py-1.5">culture collage</span>
          <span className="border-r border-[var(--sample-border)] px-2 py-1.5">popular culture</span>
          <span className="px-2 py-1.5">kitsch / elegance</span>
        </footer>
      </div>
    </SampleFrame>
  );
}

function RetroDinerShop({ className, compact = false, style }: Props) {
  const decadeStops = ["1960", "1970", "1980", "1990"];
  const merch: Array<[string, string, string, PhotoScene]> = [
    ["Terry visor", "Pool deck", "$28", "product"],
    ["Radio tee", "FM cotton", "$42", "studio"],
    ["Soda tote", "Market run", "$36", "material"],
  ];
  const archiveCards: Array<[string, string]> = [
    ["FM 74.5", "beach mix"],
    ["DINER 12", "lunch set"],
    ["VHS CLUB", "late tape"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--sample-accent) 0 1px, transparent 1.3px), linear-gradient(90deg, rgb(var(--st-accent-2-rgb) / 0.16) 0 1px, transparent 1px)",
          backgroundSize: "12px 12px, 42px 100%",
        }}
      />

      <div className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-[10px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] text-[var(--sample-text)]" style={{ boxShadow: "6px 6px 0 rgb(58 31 19 / 0.25)" }}>
        <header className="flex items-center gap-2 border-b-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)] px-2 py-1.5 text-[9px] font-black text-[var(--sample-surface)]">
          <span className="grid h-4 w-4 place-items-center rounded-full border border-[var(--sample-surface)] text-[7px] leading-none">▶</span>
          <span className="truncate">RETRO BROADCAST SHOP</span>
          <nav className={cn("ml-auto items-center gap-2", compact ? "hidden" : "flex")}>
            <span>Stations</span>
            <span>Decades</span>
            <span>Goods</span>
          </nav>
          <span className="ml-auto rounded-full bg-[var(--sample-accent)] px-2 py-0.5 text-[var(--sample-surface)] md:ml-0">cart 03</span>
        </header>

        <main className={cn("grid min-h-0 flex-1 gap-2 p-2", compact ? "grid-cols-[1fr_0.86fr]" : "grid-cols-1 md:grid-cols-[1.08fr_0.92fr] md:gap-3 md:p-3")}>
          <section className="flex min-w-0 flex-col justify-between overflow-hidden rounded-[8px] border-2 border-[var(--sample-border)] bg-[var(--sample-base)]">
            <div className="relative min-h-0 flex-1">
              <PhotoSurface className="h-full min-h-[92px]" scene="interior">
                <span className="absolute left-2 top-2 rounded-full bg-[var(--sample-surface)]/90 px-2 py-0.5 text-[8px] font-black text-[var(--sample-accent-2)]">FM 74.5</span>
                <span className="absolute bottom-2 right-2 rounded-full bg-[var(--sample-accent)] px-2 py-0.5 text-[8px] font-black text-[var(--sample-surface)]">summer set</span>
              </PhotoSurface>
            </div>
            <div className="border-t-2 border-[var(--sample-border)] p-2">
              <p className="text-[8px] font-black text-[var(--sample-accent-2)]">broadcast landing</p>
              <h3
                className={cn("mt-1 font-display leading-[0.88]", compact ? "text-2xl" : "text-4xl md:text-[3.1rem]")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                Sunny goods,
                <br />
                tuned by era.
              </h3>
              <div className={cn("mt-2 flex items-center gap-1.5 rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-[9px] font-bold", compact ? "hidden" : "")}>
                <span>◀</span>
                <span className="grid h-4 w-4 place-items-center rounded-full bg-[var(--sample-accent-2)] text-[7px] text-[var(--sample-surface)]">▶</span>
                <span className="truncate">pool radio · mixtape 03</span>
                <span className="ml-auto">03:24</span>
              </div>
            </div>
          </section>

          <aside className="grid min-w-0 grid-rows-[auto_1fr_auto] gap-2">
            <section className="rounded-[8px] border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-2">
              <p className="text-[9px] font-black text-[var(--sample-accent-2)]">time-travel media dial</p>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {decadeStops.map((decade, index) => (
                  <span
                    className="grid aspect-square place-items-center rounded-full border-2 border-[var(--sample-border)] text-[8px] font-black"
                    key={decade}
                    style={{ backgroundColor: index === 1 ? "var(--sample-accent)" : "var(--sample-surface)", color: index === 1 ? "var(--sample-surface)" : "var(--sample-text)" }}
                  >
                    {decade}
                  </span>
                ))}
              </div>
              <div className={cn("mt-2 grid grid-cols-3 gap-1 text-[8px] font-bold", compact ? "hidden" : "")}>
                {["BR", "JP", "IT"].map((country) => (
                  <span className="rounded-full border border-[var(--sample-border)] bg-[var(--sample-surface)] px-1.5 py-0.5 text-center" key={country}>
                    {country}
                  </span>
                ))}
              </div>
            </section>

            <section className="min-h-0 overflow-hidden rounded-[8px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]">
              <p className="border-b-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-2 py-1 text-[9px] font-black text-[var(--sample-surface)]">analog merch queue</p>
              <div className="grid h-full min-h-0 gap-0">
                {merch.map(([name, detail, price, scene], index) => (
                  <div className={cn("grid min-h-0 grid-cols-[34px_1fr_auto] items-center gap-1.5 px-2 py-1.5", index < merch.length - 1 ? "border-b border-[var(--sample-border)]" : "")} key={name}>
                    <PhotoSurface className="h-8 w-8 rounded-[6px] border border-[var(--sample-border)]" grain={false} scene={scene} />
                    <span className="min-w-0">
                      <span className="block truncate text-[9px] font-black">{name}</span>
                      <span className={cn("block truncate text-[7px] text-[var(--sample-muted)]", compact ? "hidden" : "")}>{detail}</span>
                    </span>
                    <span className="text-[9px] font-black text-[var(--sample-accent-2)]">{price}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={cn("grid grid-cols-3 gap-1.5", compact ? "hidden" : "")}>
              {archiveCards.map(([station, label]) => (
                <span className="min-w-0 rounded-[6px] border-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-1.5 py-1 text-center" key={station}>
                  <span className="block truncate text-[8px] font-black text-[var(--sample-accent-2)]">{station}</span>
                  <span className="block truncate text-[7px] font-bold text-[var(--sample-muted)]">{label}</span>
                </span>
              ))}
            </section>
          </aside>
        </main>
      </div>
    </SampleFrame>
  );
}

function VintagePaperCatalog({ className, compact = false, style }: Props) {
  const goods: Array<[string, string, string, PhotoScene]> = [
    ["Tin Cloth Cruiser", "oil finish", "1897", "material"],
    ["Rugged Twill Duffel", "brass trim", "1958", "product"],
    ["501 Archive Jean", "patched knee", "1967", "studio"],
  ];
  const materials: Array<[string, string, string]> = [
    ["Tin cloth", "wax bloom", "dark tan"],
    ["Rugged twill", "diagonal weave", "tobacco"],
    ["Selvedge denim", "patched blue", "indigo"],
  ];
  const repairs: Array<[string, string, string]> = [
    ["Darning", "holes reinforced", "visible"],
    ["Binding", "cuffs protected", "matched"],
    ["Hardware", "brass replaced", "closest"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--sample-border) 0 1px, transparent 1.2px), linear-gradient(90deg, rgb(var(--st-text-rgb) / 0.06) 0 1px, transparent 1px)",
          backgroundSize: "13px 13px, 44px 100%",
        }}
      />
      <div className="relative flex h-full min-h-0 flex-col border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] text-[var(--sample-text)]" style={{ boxShadow: "0 0 0 6px rgb(var(--st-surface-rgb) / 0.55) inset" }}>
        <header className="grid grid-cols-[1fr_auto] border-b-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-3 py-2">
          <div className="min-w-0">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--sample-accent)]">PAPER CATALOG</p>
            <h3
              className={cn("font-display uppercase leading-none", compact ? "text-[1.45rem]" : "text-3xl md:text-[2.3rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Archive supply
            </h3>
          </div>
          <div className="grid place-items-center border-l-2 border-[var(--sample-border)] pl-3 text-center">
            <span className="text-[7px] font-black uppercase tracking-[0.16em] text-[var(--sample-muted)]">since</span>
            <span className="font-display text-xl font-black leading-none text-[var(--sample-accent)]" style={{ fontFamily: "var(--st-font-display)" }}>1897</span>
          </div>
        </header>

        <main className={cn("grid min-h-0 flex-1 gap-2 p-2", compact ? "grid-cols-[0.94fr_1.06fr]" : "grid-cols-1 md:grid-cols-[0.9fr_1.1fr] md:p-3")}>
          <section className="grid min-h-0 grid-rows-[1fr_auto] border-2 border-[var(--sample-border)] bg-[var(--sample-base)]">
            <div className="relative min-h-0 border-b-2 border-[var(--sample-border)]">
              <PhotoSurface className="h-full min-h-[94px]" scene="material">
                <span className="absolute left-2 top-2 border border-[var(--sample-border)] bg-[var(--sample-surface)] px-1.5 py-0.5 text-[7px] font-black uppercase text-[var(--sample-accent)]">inspected</span>
                <span className="absolute bottom-2 right-2 -rotate-3 rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-2 py-1 text-[7px] font-black uppercase">field worn</span>
              </PhotoSurface>
            </div>
            <div className="p-2">
              <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-muted)]">heritage catalog rows</p>
              <div className="mt-1.5 grid border-y border-[var(--sample-border)]">
                {goods.map(([name, detail, year], index) => (
                  <div className={cn("grid grid-cols-[1fr_auto] gap-2 py-1.5 text-[9px]", index < goods.length - 1 ? "border-b border-[var(--sample-border)]" : "")} key={name}>
                    <span className="min-w-0">
                      <span className="block truncate font-black">{name}</span>
                      <span className="block truncate text-[7px] uppercase tracking-[0.08em] text-[var(--sample-muted)]">{detail}</span>
                    </span>
                    <span className="font-mono text-[9px] font-bold text-[var(--sample-accent)]">{year}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-2">
            <section className="border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]">
              <p className="border-b-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-2 py-1 text-[8px] font-black tracking-[0.12em] text-[var(--sample-surface)]">patina material register</p>
              <div className="grid grid-cols-3">
                {materials.map(([name, texture, tone], index) => (
                  <span className={cn("min-w-0 p-2 text-[7px]", index < materials.length - 1 ? "border-r border-[var(--sample-border)]" : "")} key={name}>
                    <span className="block truncate font-black text-[var(--sample-text)]">{name}</span>
                    <span className="block truncate uppercase tracking-[0.08em] text-[var(--sample-muted)]">{texture}</span>
                    <span className="mt-1 block h-2 border border-[var(--sample-border)]" style={{ backgroundColor: index === 0 ? "var(--sample-accent-2)" : index === 1 ? "var(--sample-accent-3)" : "var(--sample-accent)" }} />
                    <span className={cn("mt-0.5 block truncate text-[var(--sample-muted)]", compact ? "hidden" : "")}>{tone}</span>
                  </span>
                ))}
              </div>
            </section>

            <section className="min-h-0 overflow-hidden border-2 border-[var(--sample-border)] bg-[var(--sample-base)]">
              <p className="border-b-2 border-[var(--sample-border)] px-2 py-1 text-[8px] font-black tracking-[0.12em] text-[var(--sample-accent)]">repair ticket ledger</p>
              <div className="grid min-h-0">
                {repairs.map(([method, note, mark], index) => (
                  <div className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-2 px-2 py-1.5 text-[8px]", index < repairs.length - 1 ? "border-b border-[var(--sample-border)]" : "")} key={method}>
                    <span className="font-mono text-[var(--sample-muted)]">0{index + 1}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-black">{method}</span>
                      <span className={cn("block truncate text-[7px] text-[var(--sample-muted)]", compact ? "hidden" : "")}>{note}</span>
                    </span>
                    <span className="rounded-full border border-[var(--sample-border)] bg-[var(--sample-surface)] px-1.5 py-0.5 text-[7px] font-black uppercase text-[var(--sample-accent)]">{mark}</span>
                  </div>
                ))}
              </div>
            </section>

            <footer className={cn("grid grid-cols-3 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] text-center text-[7px] font-black uppercase tracking-[0.08em]", compact ? "hidden" : "")}>
              <span className="border-r border-[var(--sample-border)] px-2 py-1.5">lifetime guarantee</span>
              <span className="border-r border-[var(--sample-border)] px-2 py-1.5">visible mending</span>
              <span className="px-2 py-1.5">archive issue</span>
            </footer>
          </aside>
        </main>
      </div>
    </SampleFrame>
  );
}

function SeventiesGroovyLanding({ className, compact = false, style }: Props) {
  const goods: Array<[string, string, string, PhotoScene]> = [
    ["Corduroy chair", "olive channel", "$248", "interior"],
    ["Amber lamp", "glow dome", "$86", "studio"],
    ["Walnut tray", "low table", "$64", "material"],
  ];
  const shelves: Array<[string, string]> = [
    ["room set", "arched sofa edit"],
    ["soundtrack", "weekend soul"],
    ["host guide", "slow dinner"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute -right-12 -top-14 h-44 w-44 rounded-full opacity-85"
        style={{ backgroundImage: "repeating-radial-gradient(circle, var(--sample-accent) 0 9px, var(--sample-accent-3) 9px 18px, var(--sample-accent-2) 18px 27px)" }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-1 left-0 h-16 w-full opacity-40"
        style={{
          backgroundImage: "repeating-linear-gradient(135deg, transparent 0 14px, rgb(var(--st-accent-2-rgb) / 0.55) 14px 24px, transparent 24px 38px)",
        }}
      />

      <div className="relative flex h-full min-h-0 flex-col">
        <header className="flex items-center gap-2">
          <span className="rounded-[var(--st-radius-pill)] bg-[var(--sample-text)] px-3 py-1 font-display text-[12px] font-black text-[var(--sample-base)]" style={{ fontFamily: "var(--st-font-display)" }}>
            GROOVY LANDING
          </span>
          <nav className={cn("items-center gap-2 text-[9px] font-black uppercase tracking-[0.08em] text-[var(--sample-text)]", compact ? "hidden" : "flex")}>
            <span>Rooms</span>
            <span>Objects</span>
            <span>Records</span>
          </nav>
          <span className="ml-auto rounded-[var(--st-radius-pill)] bg-[var(--sample-accent-2)] px-2.5 py-1 text-[9px] font-black uppercase text-[var(--sample-surface)]">cart 02</span>
        </header>

        <main className={cn("grid min-h-0 flex-1 gap-2 pt-2", compact ? "grid-cols-[1.05fr_0.95fr]" : "grid-cols-1 md:grid-cols-[1.06fr_0.94fr] md:gap-3 md:pt-3")}>
          <section className="relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[26px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-3" style={{ boxShadow: "5px 5px 0 rgb(var(--st-text-rgb) / 0.2)" }}>
            <span
              aria-hidden="true"
              className="absolute -right-8 top-7 h-24 w-32 rounded-[55%_45%_50%_50%]"
              style={{ backgroundImage: "linear-gradient(135deg, var(--sample-accent-3), var(--sample-accent-2))" }}
            />
            <span
              aria-hidden="true"
              className="absolute bottom-5 left-0 h-12 w-full"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent 0 8px, rgb(var(--st-accent-rgb) / 0.18) 8px 15px, transparent 15px 23px)",
                borderRadius: "999px",
              }}
            />
            <div className="relative">
              <span className="rounded-[var(--st-radius-pill)] bg-[var(--sample-accent)] px-2.5 py-0.5 text-[8px] font-black text-[var(--sample-surface)]">wavy campaign shelf</span>
              <h3
                className={cn("mt-2 max-w-[8ch] font-display leading-[0.84]", compact ? "text-[1.85rem]" : "text-5xl md:text-[3.4rem]")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
              >
                Weekend
                <br />
                sunroom.
              </h3>
            </div>
            <div className={cn("relative grid grid-cols-3 gap-1.5", compact ? "hidden" : "")}>
              {shelves.map(([label, note]) => (
                <span className="min-w-0 rounded-[18px] border-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-2 py-1.5 text-center" key={label}>
                  <span className="block truncate text-[8px] font-black uppercase text-[var(--sample-accent)]">{label}</span>
                  <span className="block truncate text-[7px] font-bold text-[var(--sample-muted)]">{note}</span>
                </span>
              ))}
            </div>
          </section>

          <aside className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-2">
            <section className="rounded-[22px] border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-2">
              <p className="text-[8px] font-black tracking-[0.12em] text-[var(--sample-accent)]">corduroy product rhythm</p>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {goods.map(([name, detail, price, scene]) => (
                  <article className="min-w-0 overflow-hidden rounded-[999px_999px_18px_18px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-1.5" key={name}>
                    <PhotoSurface className="aspect-[0.84/1] w-full rounded-[999px_999px_16px_16px]" grain={false} scene={scene} />
                    <p className="mt-1 truncate text-[8px] font-black">{name}</p>
                    <p className={cn("truncate text-[7px] text-[var(--sample-muted)]", compact ? "hidden" : "")}>{detail}</p>
                    <p className="text-[8px] font-black text-[var(--sample-accent)]">{price}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="relative min-h-0 overflow-hidden rounded-[22px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)]">
              <PhotoSurface className="h-full min-h-[72px]" scene="interior">
                <span className="absolute left-2 top-2 rounded-[var(--st-radius-pill)] bg-[var(--sample-base)] px-2 py-0.5 text-[8px] font-black uppercase text-[var(--sample-text)]">walnut lounge edit</span>
                <span className="absolute bottom-2 right-2 rounded-[var(--st-radius-pill)] bg-[var(--sample-accent-2)] px-2 py-0.5 text-[8px] font-black text-[var(--sample-surface)]">side A</span>
              </PhotoSurface>
            </section>

            <footer className={cn("grid grid-cols-3 gap-1.5 text-[7px] font-black uppercase tracking-[0.08em]", compact ? "hidden" : "")}>
              <span className="rounded-[var(--st-radius-pill)] border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-1 text-center text-[var(--sample-text)]">corduroy</span>
              <span className="rounded-[var(--st-radius-pill)] border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)] px-2 py-1 text-center text-[var(--sample-surface)]">walnut</span>
              <span className="rounded-[var(--st-radius-pill)] border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-2 py-1 text-center text-[var(--sample-surface)]">amber</span>
            </footer>
          </aside>
        </main>
      </div>
    </SampleFrame>
  );
}

function EightiesSynthConsole({ className, compact = false, style }: Props) {
  const tracks: Array<[string, string, string, string]> = [
    ["A1", "Midnight Drive", "118 BPM", "var(--sample-accent)"],
    ["A2", "Neon Tokyo", "04:12", "var(--sample-accent-2)"],
    ["B1", "Chrome Sunset", "VHS", "var(--sample-accent-3)"],
  ];
  const controls: Array<[string, string, string]> = [
    ["PLAY", "queued", "var(--sample-accent-2)"],
    ["TAPE", "loaded", "var(--sample-accent)"],
    ["COIN", "2 left", "var(--sample-accent-3)"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute -right-8 top-8 h-28 w-28 rounded-full opacity-85 blur-[1px]"
        style={{ backgroundImage: "linear-gradient(180deg, var(--sample-accent) 0%, var(--sample-accent-3) 100%)" }}
      >
        <span className="absolute inset-x-0 bottom-0 h-1/2" style={{ backgroundImage: "repeating-linear-gradient(0deg, var(--sample-base) 0 3px, transparent 3px 9px)" }} />
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-[-18%] bottom-0 h-[48%] origin-bottom skew-x-[-10deg] opacity-55"
        style={{
          backgroundImage: "linear-gradient(var(--sample-accent-2) 1px, transparent 1px), linear-gradient(90deg, var(--sample-accent-2) 1px, transparent 1px), linear-gradient(180deg, transparent, rgb(var(--st-accent-2-rgb) / 0.28))",
          backgroundSize: "30px 22px",
          maskImage: "linear-gradient(transparent, #000 60%)",
          WebkitMaskImage: "linear-gradient(transparent, #000 60%)",
        }}
      />
      <span aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 12px 14px, rgb(var(--st-accent-rgb) / 0.35) 0 1px, transparent 1px)", backgroundSize: "26px 30px" }} />

      <div className="relative flex h-full flex-col gap-2 font-mono">
        <header
          className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border border-[var(--sample-accent-2)] bg-[rgb(var(--st-surface-rgb)/0.78)] px-2.5 py-1.5 text-[9px] text-[var(--sample-text)]"
          style={{ boxShadow: "0 0 14px rgb(var(--st-accent-2-rgb) / 0.45), inset 0 1px 0 rgb(255 255 255 / 0.12)" }}
        >
          <span className="font-black text-[var(--sample-accent-2)]">SYNTH CONSOLE</span>
          <nav className={cn("min-w-0 items-center gap-2 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>mixes</span>
            <span>arcade</span>
            <span>tickets</span>
          </nav>
          <span className="justify-self-end text-[var(--sample-accent)]">88.9 FM</span>
        </header>

        <main className={cn("grid min-h-0 flex-1 gap-2", compact ? "grid-cols-[1fr_0.72fr]" : "grid-cols-1 md:grid-cols-[1.18fr_0.82fr]")}>
          <section
            className="relative min-w-0 overflow-hidden border border-[var(--sample-border)] bg-[#050513] p-2.5"
            style={{
              boxShadow: "0 0 0 1px rgb(var(--st-accent-rgb) / 0.25), inset 0 0 22px rgb(var(--st-accent-2-rgb) / 0.2)",
              backgroundImage: "linear-gradient(135deg, rgb(255 255 255 / 0.06), transparent 30%), linear-gradient(180deg, #0b0925, #04040f)",
            }}
          >
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center gap-2 text-[8px] text-[var(--sample-accent-3)]">
                <span className="h-2 w-2 bg-[var(--sample-accent)] shadow-[0_0_10px_var(--sample-accent)]" />
                <span>night-drive radio deck</span>
                <span className={cn("ml-auto text-[var(--sample-muted)]", compact ? "hidden" : "")}>grid perspective ON</span>
              </div>

              <div className="min-w-0 py-2">
                <p className="mb-1 text-[8px] tracking-[0.16em] text-[var(--sample-accent-2)]">VHS-A / SIDE 88 / LIVE LOOP</p>
                <h3
                  className={cn("font-display uppercase leading-[0.82]", compact ? "text-[1.72rem]" : "text-5xl md:text-[3.45rem]")}
                  style={{
                    fontFamily: "var(--st-font-display)",
                    fontWeight: "var(--st-weight-display)",
                    letterSpacing: "var(--st-tracking)",
                    color: "var(--sample-text)",
                    textShadow: "0 0 9px rgb(var(--st-accent-rgb) / 0.95), 3px 2px 0 var(--sample-accent-2), -2px -1px 0 var(--sample-accent-3)",
                  }}
                >
                  Midnight
                  <br />
                  drive
                </h3>
              </div>

              <div className="grid grid-cols-[1fr_auto] items-end gap-2">
                <div className="grid h-10 grid-cols-12 items-end gap-[2px] border border-[var(--sample-accent-2)] bg-black/35 p-1.5">
                  {[34, 72, 48, 88, 55, 100, 62, 82, 40, 76, 58, 92].map((height, index) => (
                    <span
                      aria-hidden="true"
                      className="w-full"
                      key={index}
                      style={{
                        height: `${height}%`,
                        backgroundColor: index % 3 === 0 ? "var(--sample-accent)" : index % 3 === 1 ? "var(--sample-accent-2)" : "var(--sample-accent-3)",
                        boxShadow: "0 0 8px currentColor",
                      }}
                    />
                  ))}
                </div>
                <span className={cn("border border-[var(--sample-accent)] bg-[rgb(var(--st-accent-rgb)/0.12)] px-2 py-1 text-[8px] font-black text-[var(--sample-accent)]", compact ? "hidden" : "")}>REC 1986</span>
              </div>
            </div>
            <span aria-hidden="true" className="absolute -bottom-10 left-1/2 h-32 w-52 -translate-x-1/2 rounded-t-full border border-[var(--sample-accent-2)] opacity-35" />
          </section>

          <aside className="grid min-h-0 gap-2">
            <section
              className="min-w-0 border border-[var(--sample-accent-2)] bg-[rgb(var(--st-surface-rgb)/0.76)] p-2"
              style={{ boxShadow: "0 0 12px rgb(var(--st-accent-2-rgb) / 0.32)" }}
            >
              <p className="mb-1.5 text-[9px] font-black text-[var(--sample-accent-2)]">VHS mix queue</p>
              <div className="grid gap-1.5">
                {tracks.map(([num, name, meta, color]) => (
                  <div className="grid grid-cols-[1.6rem_1fr_auto] items-center gap-1.5 border border-[rgb(var(--st-border-rgb)/0.9)] bg-black/35 px-1.5 py-1 text-[8px]" key={name}>
                    <span className="font-black" style={{ color }}>{num}</span>
                    <span className="min-w-0 truncate text-[var(--sample-text)]">{name}</span>
                    <span className="text-[var(--sample-muted)]">{meta}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={cn("grid gap-1.5 border border-[var(--sample-border)] bg-black/35 p-2", compact ? "hidden" : "")}>
              <p className="text-[8px] text-[var(--sample-muted)]">black plastic status bay</p>
              <div className="grid grid-cols-3 gap-1">
                <span className="h-8 rounded-[3px] bg-[linear-gradient(180deg,#343449,#07070c)] shadow-[inset_0_2px_0_rgb(255_255_255_/_0.16)]" />
                <span className="h-8 rounded-[3px] bg-[linear-gradient(180deg,#321047,#080713)] shadow-[inset_0_2px_0_rgb(255_255_255_/_0.16)]" />
                <span className="h-8 rounded-[3px] bg-[linear-gradient(180deg,#062c4a,#050712)] shadow-[inset_0_2px_0_rgb(255_255_255_/_0.16)]" />
              </div>
            </section>
          </aside>
        </main>

        <footer className={cn("grid grid-cols-[auto_1fr] items-center gap-2 border border-[var(--sample-accent)] bg-[rgb(var(--st-accent-rgb)/0.1)] p-1.5", compact ? "hidden" : "")}>
          <span className="px-1 text-[8px] font-black text-[var(--sample-accent)]">arcade control strip</span>
          <div className="grid grid-cols-3 gap-1.5">
            {controls.map(([label, state, color]) => (
              <span className="grid min-w-0 grid-cols-[auto_1fr] items-center gap-1 border border-[var(--sample-border)] bg-black/45 px-1.5 py-1 text-[8px]" key={label}>
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
                <span className="min-w-0">
                  <span className="block font-black text-[var(--sample-text)]">{label}</span>
                  <span className="block truncate text-[var(--sample-muted)]">{state}</span>
                </span>
              </span>
            ))}
          </div>
        </footer>
      </div>
    </SampleFrame>
  );
}
function NinetiesGraphicZine({ className, compact = false, style }: Props) {
  const links: Array<[string, string, string]> = [
    ["flyers", "04", "var(--sample-accent-3)"],
    ["mix tape", "11", "var(--sample-accent)"],
    ["guestbook", "88", "var(--sample-accent-2)"],
    ["downloads", "23", "var(--sample-surface)"],
  ];
  const scraps: Array<[string, string, string]> = [
    ["left-[9%] top-[14%] h-12 w-20 rotate-[-8deg]", "var(--sample-accent-3)", "repeating-linear-gradient(45deg, #000 0 4px, transparent 4px 8px)"],
    ["right-[10%] top-[10%] h-16 w-16 rotate-[10deg]", "var(--sample-accent)", "radial-gradient(circle, #000 0 1px, transparent 1px)"],
    ["left-[24%] bottom-[16%] h-14 w-24 rotate-[7deg]", "var(--sample-accent-2)", "linear-gradient(90deg, #000 50%, transparent 50%)"],
    ["right-[21%] bottom-[14%] h-12 w-20 rotate-[-12deg]", "var(--sample-text)", "repeating-linear-gradient(0deg, #fff 0 3px, transparent 3px 7px)"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(45deg, var(--sample-border) 25%, transparent 25%, transparent 75%, var(--sample-border) 75%), linear-gradient(45deg, var(--sample-border) 25%, transparent 25%, transparent 75%, var(--sample-border) 75%)", backgroundPosition: "0 0, 9px 9px", backgroundSize: "18px 18px" }} />
      <span aria-hidden="true" className="absolute -right-8 top-12 h-24 w-24 rotate-12 bg-[var(--sample-accent-3)]" style={{ clipPath: "polygon(15% 0, 100% 0, 88% 100%, 0 80%)" }} />
      <span aria-hidden="true" className="absolute bottom-7 left-6 h-14 w-24 rotate-[-10deg] bg-[var(--sample-accent)]" style={{ clipPath: "polygon(0 20%, 100% 0, 86% 100%, 10% 78%)" }} />

      <div className="relative flex h-full w-full flex-col border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)]" style={{ boxShadow: "6px 6px 0 var(--sample-border)" }}>
        <header className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-2)] px-2 py-1 text-[9px] font-black text-white">
          <span>DESKTOP ZINE</span>
          <span className={cn("min-w-0 truncate text-center", compact ? "hidden" : "")}>zineos://drop-culture/index.html</span>
          <span className="flex gap-0.5">
            <span className="grid h-3 w-3 place-items-center border border-white text-[7px] leading-none">_</span>
            <span className="grid h-3 w-3 place-items-center border border-white text-[7px] leading-none">x</span>
          </span>
        </header>

        <div className="border-b-[3px] border-[var(--sample-border)] bg-[var(--sample-accent)] px-2 py-0.5 text-[8px] font-black text-white">
          <span className="block truncate">new flyers uploaded / guestbook open / best viewed loud</span>
        </div>

        <main className={cn("grid min-h-0 flex-1 gap-2 p-2", compact ? "grid-cols-[1fr_0.74fr]" : "grid-cols-1 md:grid-cols-[1.08fr_0.92fr]")}>
          <section className="relative min-w-0 overflow-hidden border-[3px] border-[var(--sample-border)] bg-white p-2">
            <p className="relative z-10 mb-1 inline-block border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-1.5 py-0.5 text-[8px] font-black text-[var(--sample-border)]">halftone scrap wall</p>
            <div className="relative h-full min-h-[7.75rem] overflow-hidden bg-[var(--sample-text)]">
              <span aria-hidden="true" className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(circle, #ffffff 0 1px, transparent 1.5px)", backgroundSize: "7px 7px" }} />
              {scraps.map(([pos, color, pattern], index) => (
                <span
                  aria-hidden="true"
                  className={cn("absolute border-2 border-[var(--sample-border)]", pos)}
                  key={index}
                  style={{
                    backgroundColor: color,
                    backgroundImage: pattern,
                    backgroundSize: index === 1 ? "8px 8px" : "16px 16px",
                    boxShadow: "3px 3px 0 var(--sample-border)",
                  }}
                />
              ))}
              <div className="absolute left-3 top-1/2 max-w-[9rem] -translate-y-1/2">
                <h3
                  className={cn("font-display uppercase leading-[0.82]", compact ? "text-[1.85rem]" : "text-5xl md:text-[3.35rem]")}
                  style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", color: "var(--sample-accent-3)", textShadow: "3px 3px 0 var(--sample-accent), -2px -2px 0 var(--sample-accent-2)" }}
                >
                  Drop
                  <br />
                  Files
                </h3>
              </div>
              <span className={cn("absolute bottom-2 right-2 border-2 border-[var(--sample-border)] bg-white px-2 py-1 text-[8px] font-black text-[var(--sample-border)]", compact ? "hidden" : "")}>photocopy pack 1997</span>
            </div>
          </section>

          <aside className="grid min-h-0 gap-2">
            <section className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] p-2">
              <p className="mb-1.5 border-2 border-[var(--sample-border)] bg-white px-1.5 py-0.5 text-[8px] font-black text-[var(--sample-border)]">sticker link grid</p>
              <div className="grid grid-cols-2 gap-1.5">
                {links.map(([label, count, color], index) => (
                  <span
                    className="min-w-0 border-2 border-[var(--sample-border)] px-1.5 py-1 text-[8px] font-black text-[var(--sample-border)]"
                    key={label}
                    style={{
                      backgroundColor: color,
                      boxShadow: "3px 3px 0 var(--sample-border)",
                      transform: index % 2 === 0 ? "rotate(-2deg)" : "rotate(2deg)",
                    }}
                  >
                    <span className="block truncate">{label}</span>
                    <span className="block text-[10px]">{count}</span>
                  </span>
                ))}
              </div>
            </section>

            <section className={cn("border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-2", compact ? "hidden" : "")}>
              <p className="mb-1 text-[8px] font-black text-[var(--sample-border)]">browser scraps</p>
              <div className="grid grid-cols-[0.72fr_1fr] gap-1.5">
                <span className="h-8 border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)]" />
                <span className="h-8 border-2 border-[var(--sample-border)] bg-[var(--sample-text)]" style={{ backgroundImage: "repeating-linear-gradient(90deg, #fff 0 4px, transparent 4px 8px)" }} />
                <span className="col-span-2 h-5 border-2 border-[var(--sample-border)] bg-white" />
              </div>
            </section>
          </aside>
        </main>

        <footer className={cn("flex items-center justify-between border-t-[3px] border-[var(--sample-border)] bg-white px-2 py-1 text-[8px] font-black text-[var(--sample-border)]", compact ? "hidden" : "")}>
          <span className="flex items-center gap-1">
            visitors
            <span className="bg-[var(--sample-border)] px-1 text-[var(--sample-accent-3)]">000947</span>
          </span>
          <span className="underline">webring / street scans / site map</span>
        </footer>
      </div>
    </SampleFrame>
  );
}

function Y2KGlossPortal({ className, compact = false, style }: Props) {
  const widgets: Array<[string, string, string]> = [
    ["mood", "sparkly", "var(--sample-accent)"],
    ["mail", "14 new", "var(--sample-accent-2)"],
    ["blinkies", "upload", "var(--sample-accent-3)"],
  ];
  const dock: Array<[string, string]> = [
    ["chat", "var(--sample-accent-2)"],
    ["pics", "var(--sample-accent)"],
    ["music", "var(--sample-accent-3)"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(34% 48% at 16% 16%, rgb(var(--st-accent-2-rgb) / 0.55), transparent 64%), radial-gradient(40% 45% at 86% 22%, rgb(var(--st-accent-rgb) / 0.46), transparent 62%), radial-gradient(46% 52% at 58% 102%, rgb(var(--st-accent-3-rgb) / 0.42), transparent 64%), linear-gradient(135deg, rgb(255 255 255 / 0.88), rgb(var(--st-accent-2-rgb) / 0.16))",
        }}
      />
      <span aria-hidden="true" className="absolute inset-0 opacity-35" style={{ backgroundImage: "radial-gradient(circle at 10px 10px, rgb(255 255 255 / 0.95) 0 1px, transparent 1.6px)", backgroundSize: "22px 22px" }} />

      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-2">
        <header
          className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-[var(--st-radius-pill)] border border-white px-2.5 py-1.5 text-[9px] font-black text-[var(--sample-text)]"
          style={{
            backgroundImage: "linear-gradient(180deg, rgb(255 255 255 / 0.95), rgb(var(--st-accent-2-rgb) / 0.24))",
            boxShadow: "0 5px 16px rgb(var(--st-accent-2-rgb) / 0.28), inset 0 1px 0 #fff",
          }}
        >
          <span
            className="rounded-[var(--st-radius-pill)] border border-white px-2 py-0.5 font-display text-[10px] text-[var(--sample-accent-2)]"
            style={{ fontFamily: "var(--st-font-display)", backgroundImage: "linear-gradient(180deg, #fff, rgb(var(--st-accent-rgb) / 0.2))", boxShadow: "inset 0 1px 0 #fff, 0 2px 7px rgb(var(--st-accent-rgb) / 0.26)" }}
          >
            GLOSS PORTAL
          </span>
          <span className={cn("min-w-0 truncate text-center text-[var(--sample-muted)]", compact ? "hidden" : "")}>profile / glitter / mail / rooms</span>
          <span className="rounded-[var(--st-radius-pill)] border border-white bg-white/70 px-2 py-0.5 text-[8px]">login</span>
        </header>

        <main className={cn("grid min-h-0 gap-2", compact ? "grid-cols-[1fr_0.78fr]" : "grid-cols-1 md:grid-cols-[1.04fr_0.96fr]")}>
          <section
            className="relative min-w-0 overflow-hidden rounded-[22px] border border-white p-3"
            style={{
              backgroundImage: "linear-gradient(160deg, rgb(255 255 255 / 0.8), rgb(var(--st-accent-rgb) / 0.28) 58%, rgb(var(--st-accent-2-rgb) / 0.18))",
              boxShadow: "0 10px 24px rgb(var(--st-text-rgb) / 0.18), inset 0 2px 0 #fff",
            }}
          >
            <span aria-hidden="true" className="absolute -right-7 top-8 h-28 w-28 rounded-full border border-white/70 bg-white/40 blur-[0.5px]" style={{ boxShadow: "inset 0 8px 20px rgb(var(--st-accent-2-rgb) / 0.3), 0 12px 30px rgb(var(--st-accent-rgb) / 0.24)" }} />
            <span aria-hidden="true" className="absolute bottom-4 right-8 h-14 w-28 rounded-[999px] bg-[var(--sample-accent-2)] opacity-70 blur-sm" />
            <div className="relative max-w-[12.5rem]">
              <p className="mb-2 w-max rounded-[var(--st-radius-pill)] border border-white bg-white/80 px-2 py-0.5 text-[8px] font-black text-[var(--sample-accent-2)]">cyberpop profile hub</p>
            <h3
              className={cn("font-display leading-[0.86] text-[var(--sample-text)]", compact ? "text-[2rem]" : "text-5xl md:text-[3.5rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Shiny web
              <br />
              diary
            </h3>
              <p className={cn("mt-2 max-w-[23ch] text-[10px] leading-4 text-[var(--sample-muted)]", compact ? "hidden" : "")}>
                A soft-launch portal for profile charms, blinkie packs, and glossy room updates.
              </p>
            </div>

            <div className={cn("relative mt-3 grid grid-cols-3 gap-1.5", compact ? "hidden" : "")}>
              {dock.map(([label, color]) => (
                <span
                  className="rounded-[var(--st-radius-pill)] border border-white px-2 py-1 text-center text-[8px] font-black text-[var(--sample-text)]"
                  key={label}
                  style={{ backgroundImage: `linear-gradient(180deg, #fff, ${color})`, boxShadow: "inset 0 1px 0 #fff, 0 3px 8px rgb(var(--st-text-rgb) / 0.14)" }}
                >
                  {label}
                </span>
              ))}
            </div>
          </section>

          <aside className="grid min-h-0 gap-2">
            <section
              className="grid gap-1.5 rounded-[20px] border border-white bg-white/58 p-2"
              style={{ boxShadow: "0 8px 20px rgb(var(--st-text-rgb) / 0.14), inset 0 1px 0 #fff", backdropFilter: "blur(8px)" }}
            >
              <p className="text-[8px] font-black text-[var(--sample-accent-2)]">bubble widget stack</p>
              {widgets.map(([label, value, color]) => (
                <div
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-1.5 rounded-[var(--st-radius-pill)] border border-white px-2 py-1 text-[8px] font-black text-[var(--sample-text)]"
                  key={label}
                  style={{ backgroundImage: "linear-gradient(180deg, rgb(255 255 255 / 0.96), rgb(255 255 255 / 0.48))", boxShadow: "inset 0 1px 0 #fff, 0 3px 9px rgb(var(--st-text-rgb) / 0.12)" }}
                >
                  <span className="h-4 w-4 rounded-full border border-white" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
                  <span className="truncate">{label}</span>
                  <span className="text-[var(--sample-muted)]">{value}</span>
                </div>
              ))}
            </section>

            <section className={cn("rounded-[20px] border border-white bg-white/55 p-2", compact ? "hidden" : "")} style={{ boxShadow: "0 8px 20px rgb(var(--st-text-rgb) / 0.13), inset 0 1px 0 #fff" }}>
              <p className="mb-1.5 text-[8px] font-black text-[var(--sample-accent-2)]">sparkle guestbook rail</p>
              <div className="grid grid-cols-4 gap-1">
                {["✦", "♡", "☆", "✧"].map((glyph, index) => (
                  <span
                    key={glyph}
                    className="grid h-7 place-items-center rounded-[9px] border border-white text-[10px] font-black text-white"
                    style={{
                      backgroundImage: `linear-gradient(180deg, #fff8, ${[style.palette.accent, style.palette.accent2, style.palette.accent3, "#b8d3ff"][index]})`,
                      boxShadow: "inset 0 1px 0 #fff, 0 2px 8px rgb(var(--st-accent-rgb) / 0.24)",
                    }}
                  >
                    <IconStar size={10} />
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </main>

        <footer className={cn("grid grid-cols-[1fr_auto] items-center gap-2 rounded-[var(--st-radius-pill)] border border-white bg-white/65 px-2 py-1 text-[8px] font-black text-[var(--sample-text)]", compact ? "hidden" : "")} style={{ boxShadow: "inset 0 1px 0 #fff, 0 5px 14px rgb(var(--st-accent-2-rgb) / 0.2)" }}>
          <span className="truncate">jelly capsule dock / glitter code / profile skin</span>
          <span className="rounded-[var(--st-radius-pill)] bg-[var(--sample-accent-3)] px-2 py-0.5">online 27</span>
        </footer>
      </div>
    </SampleFrame>
  );
}

function RetroFuturismFlightDeck({ className, compact = false, style }: Props) {
  const destinations: Array<[string, string, string]> = compact
    ? [
        ["Moon", "Dome", "var(--sample-accent)"],
        ["Mars", "Canyon", "var(--sample-accent-2)"],
        ["Titan", "Sea", "var(--sample-accent-3)"],
      ]
    : [
        ["Lunar resort", "Sea of Tranquility", "var(--sample-accent)"],
        ["Mars canyons", "Dawn rail tour", "var(--sample-accent-2)"],
        ["Titan seas", "Methane marina", "var(--sample-accent-3)"],
      ];
  const schedule: Array<[string, string]> = [
    ["Gate", "A-12"],
    ["Cabin", "Dome"],
    ["Fuel", "Atom"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18px 18px, rgb(var(--st-accent-3-rgb) / 0.38) 0 1.5px, transparent 2px), linear-gradient(135deg, rgb(var(--st-surface-rgb) / 0.72), rgb(var(--st-base-rgb) / 0.52))",
          backgroundSize: "34px 34px, 100% 100%",
        }}
      />
      <span aria-hidden="true" className="absolute right-[-4.5rem] top-12 h-24 w-72 rotate-[-10deg] rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)]" />
      <span aria-hidden="true" className="absolute bottom-7 left-[-3.5rem] h-20 w-56 rotate-[14deg] rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent)]" />
      <span
        aria-hidden="true"
        className="absolute bottom-12 right-8 h-24 w-24 rounded-full border-2 border-[var(--sample-border)]"
        style={{ boxShadow: "inset 0 0 0 18px rgb(var(--st-accent-3-rgb) / 0.72)" }}
      />

      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <div className="flex min-w-0 items-center justify-between gap-3 rounded-[999px] border-2 border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.9)] px-3 py-2 text-[10px] font-black uppercase text-[var(--sample-text)]" style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.74), 0 10px 24px rgb(var(--st-text-rgb) / 0.12)" }}>
          <span className="truncate">Worlds Fair Travel Bureau</span>
          <span className="shrink-0 rounded-[999px] bg-[var(--sample-accent-3)] px-2 py-0.5">1962 / 2084</span>
        </div>

        <main className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[1.08fr_0.92fr]" : "grid-cols-1 md:grid-cols-[1.08fr_0.92fr]")}>
          <section className="relative min-w-0 overflow-hidden rounded-[18px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-3 text-[var(--sample-text)]" style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.68), 0 12px 28px rgb(var(--st-text-rgb) / 0.14)" }}>
            <span
              aria-hidden="true"
              className="absolute right-5 top-6 h-16 w-16 bg-[var(--sample-accent-3)]"
              style={{ clipPath: "polygon(50% 0, 58% 36%, 100% 50%, 58% 64%, 50% 100%, 42% 64%, 0 50%, 42% 36%)" }}
            />
            <span aria-hidden="true" className="absolute bottom-16 right-8 h-20 w-20 rounded-full border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)]" />
            <span aria-hidden="true" className="absolute bottom-20 right-2 h-8 w-36 rotate-[-16deg] rounded-full border-2 border-[var(--sample-border)]" />
            <span aria-hidden="true" className="absolute bottom-7 right-16 h-10 w-10 rounded-full border-2 border-[var(--sample-border)] bg-[linear-gradient(135deg,#fff8,transparent_60%)]" />
            <p className="relative w-max rounded-[999px] bg-[var(--sample-accent)] px-3 py-1 text-[10px] font-black uppercase text-[var(--sample-surface)]">FLIGHT DECK</p>
            <h3
              className={cn("relative mt-3 max-w-[17rem] font-display font-black leading-[0.88] text-[var(--sample-text)] [overflow-wrap:normal]", compact ? "text-3xl" : "text-5xl md:text-[3.45rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              Future tours depart.
            </h3>
            <div className={cn("relative mt-4 grid gap-2", compact ? "grid-cols-1" : "grid-cols-3")}>
              {destinations.map(([place, route, color]) => (
                <div className="min-w-0 rounded-[10px] border-2 border-[var(--sample-border)] bg-[rgb(var(--st-base-rgb)_/_0.78)] p-2" key={place}>
                  <span className="block h-9 rounded-[999px] border-2 border-[var(--sample-border)]" style={{ backgroundColor: color }} />
                  <span className="mt-2 block truncate text-[10px] font-black uppercase">{place}</span>
                  <span className={cn("block truncate text-[8px] font-bold uppercase text-[var(--sample-muted)]", compact ? "hidden" : "")}>{route}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid min-w-0 grid-rows-[auto_1fr_auto] gap-2">
            <div className="relative overflow-hidden rounded-[18px] border-2 border-[var(--sample-border)] bg-[var(--sample-accent-2)] p-3 text-[var(--sample-text)]" style={{ boxShadow: "inset 0 1px 0 rgb(255 255 255 / 0.52)" }}>
              <span aria-hidden="true" className="absolute right-[-1rem] top-[-1.5rem] h-16 w-24 rounded-full border-2 border-[var(--sample-border)] bg-[rgb(var(--st-base-rgb)_/_0.45)]" />
              <p className="relative text-[10px] font-black uppercase">destination poster rail</p>
              <div className={cn("relative mt-2 grid gap-2", compact ? "grid-cols-1" : "grid-cols-3")}>
                {["Orbit hotel", "Rocket pier", "Moon cafe"].map((item, index) => (
                  <span
                    className="min-w-0 rounded-[8px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-[8px] font-black uppercase text-[var(--sample-text)]"
                    key={item}
                    style={{ transform: compact ? undefined : `translateY(${index % 2 ? 5 : 0}px)` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-0 overflow-hidden rounded-[18px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-3" style={{ boxShadow: "0 12px 28px rgb(var(--st-text-rgb) / 0.12)" }}>
              <span
                aria-hidden="true"
                className="absolute inset-x-3 top-3 h-10 rounded-[999px] border-2 border-[var(--sample-border)]"
                style={{ backgroundImage: "linear-gradient(100deg, rgb(255 255 255 / 0.88), rgb(var(--st-accent-3-rgb) / 0.62), rgb(var(--st-surface-rgb) / 0.72))" }}
              />
              <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-2">
                <div className="grid grid-cols-[1fr_auto] items-center gap-2 rounded-[999px] border-2 border-[var(--sample-border)] bg-[rgb(var(--st-base-rgb)_/_0.82)] px-3 py-2 text-[9px] font-black uppercase">
                  <span className="truncate">chrome capsule timetable</span>
                  <span>08:40</span>
                </div>
                <div className="grid min-h-0 grid-cols-[0.9fr_1.1fr] gap-2">
                  <div className="relative min-h-0 rounded-[12px] border-2 border-[var(--sample-border)] bg-[var(--sample-text)]">
                    <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--sample-accent-3)]" />
                    <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-8 w-28 -translate-x-1/2 -translate-y-1/2 rotate-[-24deg] rounded-full border border-[var(--sample-accent-2)]" />
                    <span aria-hidden="true" className="absolute left-[56%] top-[44%] h-5 w-5 rounded-full bg-[var(--sample-accent)]" />
                  </div>
                  <div className="grid content-start gap-1.5">
                    {schedule.map(([label, value]) => (
                      <div className="grid grid-cols-[1fr_auto] rounded-[8px] border-2 border-[var(--sample-border)] bg-[rgb(var(--st-base-rgb)_/_0.72)] px-2 py-1 text-[9px] font-black uppercase" key={label}>
                        <span className="text-[var(--sample-muted)]">{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[999px] border-2 border-[var(--sample-border)] bg-[var(--sample-text)] px-3 py-2 text-center text-[10px] font-black uppercase text-[var(--sample-base)]">
                  Reserve future passage
                </div>
              </div>
            </div>

            <div className={cn("grid grid-cols-3 gap-2 text-[8px] font-black uppercase text-[var(--sample-text)]", compact ? "hidden" : "")}>
              {["chrome", "aluminum", "acrylic"].map((material, index) => (
                <span className="rounded-[999px] border-2 border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.82)] px-2 py-1 text-center" key={material} style={{ boxShadow: index === 0 ? "inset 0 1px 5px rgb(255 255 255 / 0.92)" : undefined }}>
                  {material}
                </span>
              ))}
            </div>
          </section>
        </main>

        <footer className={cn("grid grid-cols-[1fr_auto] items-center gap-2 rounded-[999px] border-2 border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.82)] px-3 py-2 text-[8px] font-black uppercase", compact ? "hidden" : "")}>
          <span className="truncate">JPL poster logic / paleofuture archive / atomic ticket CTA</span>
          <span className="rounded-[999px] bg-[var(--sample-accent-3)] px-2 py-0.5">Tour open</span>
        </footer>
      </div>
    </SampleFrame>
  );
}

function BauhausSchool({ className, compact = false, style }: Props) {
  const programs: Array<[string, string, string]> = [
    ["Visit", "program", "var(--sample-accent)"],
    ["Join in", "workshop", "var(--sample-accent-3)"],
    ["Discover", "objects", "var(--sample-accent-2)"],
    ["Research", "archive", "var(--sample-primary)"],
  ];
  const shapes = [
    ["Circle", "rounded-full", "var(--sample-accent-2)"],
    ["Square", "", "var(--sample-accent)"],
    ["Triangle", "", "var(--sample-accent-3)"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "linear-gradient(90deg, var(--sample-border) 1px, transparent 1px), linear-gradient(0deg, var(--sample-border) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />
      <div className="relative flex h-full flex-col">
        <div className={cn("flex items-center gap-3 border-b-[3px] border-[var(--sample-border)] pb-2 font-bold uppercase", compact ? "text-[8px]" : "text-[10px]")}>
          <span className={cn("font-display", compact ? "text-[11px]" : "text-base")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>BAUHAUS SCHOOL</span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Visit</span>
            <span>Workshop</span>
            <span>Archive</span>
          </nav>
          <span className="ml-auto">1919 / 1933</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1.08fr_0.92fr]" : "grid-cols-1 md:grid-cols-[1.14fr_0.86fr]")}>
          <section className="relative grid min-h-0 grid-cols-2 grid-rows-[auto_1fr_1fr] overflow-hidden border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)]">
            <div className="col-span-2 flex items-center justify-between border-b-[3px] border-[var(--sample-border)] bg-[var(--sample-base)] px-2 py-1.5">
              <span className="text-[9px] font-black uppercase">circle square triangle lab</span>
              <span className={cn("text-[8px] font-bold uppercase text-[var(--sample-muted)]", compact ? "hidden" : "")}>basic course</span>
            </div>
            <div className="relative border-b-[3px] border-r-[3px] border-[var(--sample-border)]">
              <span className="absolute inset-3 rounded-full bg-[var(--sample-accent-2)]" />
              <span className="absolute bottom-2 left-2 text-[8px] font-black uppercase">Circle</span>
            </div>
            <div className="relative border-b-[3px] border-[var(--sample-border)] bg-[var(--sample-accent)]">
              <span className="absolute right-2 top-2 bg-[var(--sample-border)] px-1.5 py-0.5 text-[8px] font-bold uppercase text-[var(--sample-surface)]">Square</span>
            </div>
            <div className="relative border-r-[3px] border-[var(--sample-border)]">
              <span className="absolute bottom-3 left-3 right-3 top-4 bg-[var(--sample-accent-3)]" style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} />
              <span className="absolute left-2 top-2 text-[8px] font-black uppercase">Triangle</span>
            </div>
            <div className="relative bg-[var(--sample-base)]">
              <span className="absolute inset-x-3 top-1/2 h-[3px] -translate-y-1/2 bg-[var(--sample-border)]" />
              <span className="absolute bottom-3 left-1/2 top-3 w-[3px] -translate-x-1/2 bg-[var(--sample-border)]" />
              <span className="absolute bottom-2 right-2 text-[8px] font-black uppercase">Grid</span>
            </div>
            <h3
              className={cn("pointer-events-none absolute bottom-1 left-1 font-display uppercase leading-[0.82] text-[var(--sample-text)]", compact ? "hidden" : "hidden text-2xl sm:block md:text-[2.8rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)", mixBlendMode: "multiply" }}
            >
              Form
              <br />
              method
            </h3>
          </section>

          <section className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-2">
            <div className="border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent-3)] p-2">
              <p className="text-[9px] font-black uppercase">workshop method grid</p>
              <p className={cn("font-display font-black leading-none", compact ? "text-base" : "text-xl")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em" }}>Visit / Join / Discover</p>
            </div>
            <div className="grid content-start gap-1.5">
              {programs.map(([name, detail, color], index) => (
                <div className={cn("grid grid-cols-[auto_1fr] items-center gap-2 border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-1.5", compact && index === 3 ? "hidden" : "")} key={name}>
                  <span
                    className={cn("h-5 w-5 shrink-0", index === 0 ? "rounded-full" : "")}
                    style={{ backgroundColor: color, clipPath: index === 2 ? "polygon(0 100%, 50% 0, 100% 100%)" : undefined }}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[10px] font-black uppercase">{name}</span>
                    <span className={cn("block truncate text-[8px] font-bold uppercase text-[var(--sample-muted)]", compact ? "hidden" : "")}>{detail}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className={cn("grid grid-cols-3 gap-1.5", compact ? "hidden" : "")}>
              {shapes.map(([label, shapeClass, color], index) => (
                <div className="grid place-items-center border-[3px] border-[var(--sample-border)] bg-[var(--sample-surface)] p-2" key={label}>
                  <span
                    className={cn("block h-7 w-7", shapeClass)}
                    style={{ backgroundColor: color, clipPath: index === 2 ? "polygon(0 100%, 50% 0, 100% 100%)" : undefined }}
                  />
                </div>
              ))}
            </div>
          </section>
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

  return (
    <SampleFrame className={cn("overflow-hidden bg-[var(--sample-base)]", className)} compact={compact} style={style}>
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 18px, rgb(var(--st-border-rgb) / 0.18) 18px 19px), repeating-linear-gradient(0deg, transparent 0 18px, rgb(var(--st-border-rgb) / 0.12) 18px 19px)" }}
      />
      <div className="relative flex h-full flex-col">
        <div className={cn("flex items-center gap-3 border-b border-[var(--sample-border)] pb-2 font-bold uppercase", compact ? "text-[8px]" : "text-[10px]")}>
          <span className={cn("flex items-center gap-2 font-display", compact ? "text-[10px]" : "text-sm")} style={{ fontFamily: "var(--st-font-display)" }}>
            <span className="h-3 w-3 rounded-full bg-[var(--sample-accent-3)]" />
            MIDCENTURY STUDIO
          </span>
          <nav className={cn("items-center gap-3 text-[var(--sample-muted)]", compact ? "hidden" : "flex")}>
            <span>Seating</span>
            <span>Objects</span>
            <span>Textiles</span>
          </nav>
          <span className={cn("ml-auto rounded-[var(--st-radius-pill)] border border-[var(--sample-border)] bg-[var(--sample-surface)] text-[var(--sample-text)]", compact ? "px-1.5 py-0.5 text-[8px]" : "px-3 py-1")}>1954 index</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-3 pt-3", compact ? "grid-cols-[1.08fr_0.92fr]" : "grid-cols-1 md:grid-cols-[1.18fr_0.82fr] md:gap-5")}>
          <div
            className="relative min-h-0 overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)]"
            style={{
              backgroundImage: `linear-gradient(180deg, rgb(var(--st-base-rgb) / 0), rgb(var(--st-text-rgb) / 0.18)), ${MID_CENTURY_MODERN_IMAGE}`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className={cn("absolute left-3 top-3 max-w-[14ch] bg-[rgb(var(--st-surface-rgb)/0.76)] px-2 py-1 backdrop-blur-[1px]", compact ? "hidden" : "")}>
              <p className="text-[10px] font-bold uppercase text-[var(--sample-accent)]">molded plywood lounge hero</p>
            </div>
            <div className="absolute bottom-3 left-3 right-3 grid grid-cols-5 gap-1">
              {[style.palette.surface, style.palette.accent, style.palette.accent2, style.palette.accent3, style.palette.border].map((color) => (
                <span className="h-2 border border-[rgb(var(--st-border-rgb)/0.45)]" key={color} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>

          <div className={cn("grid min-h-0 gap-2.5", compact ? "grid-rows-[auto_1fr_auto]" : "grid-rows-[auto_auto_1fr]")}>
            <div className={cn("border border-[var(--sample-border)] bg-[var(--sample-surface)]", compact ? "p-2" : "p-3")}>
              <p className={cn("font-bold uppercase text-[var(--sample-accent)]", compact ? "text-[8px]" : "text-[10px]")}>walnut slat product rail</p>
              <h3
                className={cn("mt-1 font-display leading-[0.95]", compact ? "text-base" : "text-2xl")}
                style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "0em" }}
              >
                Walnut,
                <br />
                glass, textile.
              </h3>
              <div className={cn("mt-2 grid gap-1", compact ? "hidden" : "")}>
                {[0, 1, 2, 3].map((index) => (
                  <span className="h-1.5 bg-[var(--sample-border)]" key={index} style={{ opacity: 0.85 - index * 0.12 }} />
                ))}
              </div>
            </div>

            <div className="grid gap-1.5">
              {collection.map(([name, year, detail], index) => (
                <div className={cn("grid grid-cols-[auto_1fr] items-center gap-2 border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.76)] px-2 py-1.5", compact && index === 2 ? "hidden" : "")} key={name}>
                  <span className={cn("flex items-center justify-center rounded-full bg-[var(--sample-accent-3)] font-black text-[var(--sample-text)]", compact ? "h-6 w-6 text-[8px]" : "h-8 w-8 text-[9px]")}>{year.slice(2)}</span>
                  <span className="min-w-0">
                    <span className={cn("block truncate font-bold uppercase", compact ? "text-[8px]" : "text-[10px]")}>{name}</span>
                    <span className={cn("block truncate text-[var(--sample-muted)]", compact ? "text-[7px]" : "text-[9px]")}>{detail}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="relative min-h-0 overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-base)]">
              <p className={cn("absolute left-2 top-2 z-10 bg-[rgb(var(--st-base-rgb)/0.78)] px-1.5 py-0.5 font-bold uppercase text-[var(--sample-text)]", compact ? "text-[7px]" : "text-[9px]")}>Girard textile swatch wall</p>
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
  const missionStats: Array<[string, string]> = [
    ["Mach", "3.4"],
    ["Range", "7,800km"],
    ["Window", "T+08"],
  ];

  return (
    <SampleFrame className={cn("overflow-hidden bg-[#eef2f6] text-[#060910]", className)} compact={compact} style={style}>
      <span aria-hidden="true" className="absolute inset-0 opacity-75" style={{ backgroundImage: "linear-gradient(100deg, rgb(255 255 255 / 0.9), transparent 34%), linear-gradient(90deg, rgb(4 11 23 / 0.06) 1px, transparent 1px), linear-gradient(0deg, rgb(4 11 23 / 0.05) 1px, transparent 1px)", backgroundSize: "auto, 48px 48px, 48px 48px" }} />
      <span aria-hidden="true" className="absolute -right-28 top-8 h-36 w-[72%] -skew-x-[24deg] bg-[#0b1220]" style={{ clipPath: "polygon(11% 0, 100% 0, 89% 100%, 0 100%)" }} />
      <span aria-hidden="true" className="absolute bottom-8 left-0 h-12 w-full opacity-70" style={{ backgroundImage: "repeating-linear-gradient(112deg, transparent 0 18px, rgb(20 93 255 / 0.25) 18px 20px)" }} />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-3 border-b border-[#07101f]/20 pb-2 text-[10px] font-bold uppercase tracking-[0.12em]">
          <span className="font-display text-base italic tracking-tight text-[#07101f]" style={{ fontFamily: "var(--st-font-display)" }}>ORBITAL VELOCITY</span>
          <nav className={cn("items-center gap-3 text-[#07101f]/58", compact ? "hidden" : "flex")}>
            <span>Overture</span>
            <span>Artemis</span>
            <span>Flight lab</span>
          </nav>
          <span className="normal-case ml-auto bg-[#145dff] px-2.5 py-1 text-white" style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}>aerodynamic launch window</span>
        </div>

        <div className={cn("grid min-h-0 flex-1 gap-4 pt-3", compact ? "grid-cols-[1fr_1.05fr]" : "grid-cols-1 md:grid-cols-[0.86fr_1.14fr] md:gap-5")}>
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#145dff]">Speed is mission architecture</p>
            <h3
              className={cn("mt-2 font-display italic uppercase leading-[0.84] text-[#07101f]", compact ? "text-[2.15rem]" : "text-[2.35rem] sm:text-6xl md:text-[4.4rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              {compact ? "Fast" : "Forward"}
              <br />
              <span className="text-[#145dff]">flight.</span>
            </h3>
            <div className="mt-4 grid grid-cols-3 gap-1.5">
              {missionStats.map(([label, value]) => (
                <div className="border border-[#07101f]/18 bg-white/70 px-2 py-1.5" key={label}>
                  <p className="text-[8px] uppercase tracking-[0.1em] text-[#07101f]/55">{label}</p>
                  <p className="font-display text-sm font-black text-[#07101f]" style={{ fontFamily: "var(--st-font-display)" }}>{value}</p>
                </div>
              ))}
            </div>
            <span className={cn("mt-4 inline-flex w-fit items-center gap-1.5 border border-[#07101f] bg-[#07101f] px-4 py-2 text-[11px] font-bold uppercase text-white", compact ? "hidden" : "")} style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}>
              mission brief <IconArrow size={12} />
            </span>
          </div>

          <div className="relative min-h-0 overflow-hidden border border-[#07101f]/25 bg-white/80" style={{ clipPath: NOTCH }}>
            <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(118deg, transparent 0 20%, rgb(20 93 255 / 0.16) 20% 21%, transparent 21% 52%, rgb(255 92 28 / 0.16) 52% 53%, transparent 53%), linear-gradient(180deg, rgb(255 255 255 / 0.3), rgb(7 16 31 / 0.06))" }} />
            <span aria-hidden="true" className="absolute left-[10%] top-[28%] h-12 w-[62%] rounded-full bg-[#d8e0ea] shadow-[inset_18px_0_24px_rgb(255_255_255/0.9),inset_-18px_0_24px_rgb(7_16_31/0.28)]" style={{ transform: "skewX(-19deg) rotate(-5deg)" }} />
            <span aria-hidden="true" className="absolute left-[57%] top-[27%] h-14 w-24 rounded-[999px_16px_16px_999px] bg-[#07101f]" style={{ transform: "skewX(-19deg) rotate(-5deg)" }} />
            <span aria-hidden="true" className="absolute left-[9%] top-[46%] h-px w-[82%] -rotate-[8deg] bg-[#145dff]" />
            <span aria-hidden="true" className="absolute left-[15%] top-[55%] h-px w-[76%] -rotate-[8deg] bg-[#07101f]/55" />
            <div className="normal-case absolute right-3 top-3 w-28 border border-[#07101f]/25 bg-[#07101f] p-2 text-[8px] font-bold text-white">
              carbon telemetry spine
              <div className="mt-2 grid gap-1">
                <span className="h-1 bg-[#145dff]" />
                <span className="h-1 w-4/5 bg-white/70" />
                <span className="h-1 w-2/3 bg-[#ff5c1c]" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2">
              {["capsule", "vector", "return"].map((item, index) => (
                <span className="border border-[#07101f]/18 bg-white/72 px-2 py-1 text-[8px] font-bold uppercase text-[#07101f]/72" key={item}>
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
              {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((color) => (
                <span
                  className="h-4 border border-[var(--sample-border-soft)]"
                  key={color}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <GeneratedStyleImageSurface className="min-h-0 border border-[var(--sample-border-soft)]" overlay="soft" slug="organic-design">
            <span className="absolute bottom-5 left-5 right-5 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.82)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Root extract collection</span>
          </GeneratedStyleImageSurface>
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
          <GeneratedStyleImageSurface className="min-h-0 border border-[var(--sample-border-soft)]" overlay="soft" slug="natural">
            <span className="absolute bottom-4 left-4 bg-[rgb(var(--st-surface-rgb)_/_0.84)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Undyed cotton {"//"} oat {"//"} clay</span>
          </GeneratedStyleImageSurface>
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
                <div className="grid min-h-0 grid-rows-[1fr_auto] overflow-hidden border border-[var(--sample-border-soft)]" key={item}>
                  <GeneratedStyleImageSurface
                    className="min-h-[2.5rem]"
                    overlay="soft"
                    position={["30% 40%", "60% 30%", "40% 70%", "70% 50%"][index]}
                    slug="botanical"
                  />
                  <span className="block bg-[var(--sample-surface)] px-1.5 py-1 text-[8px] uppercase tracking-[0.14em] text-[var(--sample-muted)]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <GeneratedStyleImageSurface className="min-h-0 border border-[var(--sample-border-soft)]" overlay="soft" position="center 40%" slug="botanical">
            <span className="absolute bottom-4 left-4 right-4 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.86)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Seasonal plant care</span>
          </GeneratedStyleImageSurface>
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
          <div className="relative min-h-0 border border-dashed border-[var(--sample-border)] overflow-hidden">
            <GeneratedStyleImageSurface className="h-full w-full" overlay="soft" position="center 30%" slug="handmade">
              <span className="absolute bottom-4 left-4 right-4 border border-dashed border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.86)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Stamped paper label</span>
            </GeneratedStyleImageSurface>
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
          <GeneratedStyleImageSurface className="min-h-0 border border-[var(--sample-border-soft)]" overlay="soft" position="center 35%" slug="craft">
            <span className="absolute bottom-4 left-4 right-4 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.84)] px-3 py-2 text-[10px] uppercase tracking-[0.18em]">Thrown stoneware</span>
          </GeneratedStyleImageSurface>
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
          <div className="relative min-h-0 border border-dashed border-[var(--sample-border-soft)] overflow-hidden">
            <GeneratedStyleImageSurface className="h-full w-full" overlay="soft" position="40% 50%" slug="wabi-sabi">
              <span className="absolute bottom-5 left-5 right-5 border-t border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.80)] px-3 pt-3 pb-2 text-[10px] uppercase tracking-[0.18em] text-[var(--sample-muted)]">Repaired ceramic bowl</span>
            </GeneratedStyleImageSurface>
          </div>
        </div>
        <NaturalHandmadeBottomStrip compact={compact} items={[["Surface", "Patina"], ["Form", "Asymmetry"], ["Pace", "Quiet"]]} />
      </div>
    </SampleFrame>
  );
}

type EditorialLayout =
  | "collage"
  | "experimental-type"
  | "grid"
  | "longform"
  | "magazine"
  | "newspaper"
  | "photomontage"
  | "poster"
  | "type-scale";

type EditorialDistinctionConfig = {
  deck: string;
  layout: EditorialLayout;
  marker: string;
  modules: string[];
  subMarker: string;
  tertiaryMarker: string;
  title: string;
};

function MarkerRail({
  compact = false,
  items,
}: {
  compact?: boolean;
  items: string[];
}) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", compact ? "text-[6px]" : "text-[8px]")}>
      {items.map((item) => (
        <span
          className="border border-[var(--sample-border)] bg-[var(--sample-surface)] px-1.5 py-1 font-black uppercase tracking-[0.14em] text-[var(--sample-text)]"
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function EditorialDistinctionSample({
  className,
  compact = false,
  config,
  style,
}: Props & { config: EditorialDistinctionConfig }) {
  const tiny = compact ? "text-[7px]" : "text-[8px] sm:text-[9px]";
  const headline = compact ? "text-[1.35rem]" : "text-[2rem] sm:text-[3.6rem]";
  const barCount = compact ? 7 : 11;
  const bars = Array.from({ length: barCount }, (_, index) => index);

  if (config.layout === "type-scale") {
    return (
      <SampleFrame className={className} compact={compact} style={style}>
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <SampleNav brand="Foundry Index" bordered={false} compact={compact} links={["Specimens", "Pairs", "Licenses"]} sub={config.marker} />
          <main className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.82fr_1.18fr]" : "grid-cols-[0.72fr_1.28fr]")}>
            <section className="grid min-h-0 grid-rows-[auto_1fr] border border-[var(--sample-border)] bg-[var(--sample-surface)] p-3">
              <p className={cn("font-black uppercase tracking-[0.18em] text-[var(--sample-muted)]", tiny)}>{config.subMarker}</p>
              <div className="flex min-h-0 flex-col justify-end">
                <h3 className={cn("font-display font-black leading-[0.75]", compact ? "text-[4.2rem]" : "text-[6.5rem] sm:text-[8.5rem]")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.04em" }}>
                  Aa
                </h3>
                <div className="mt-3 grid gap-1">
                  {bars.map((bar) => (
                    <span
                      className="block h-px bg-[var(--sample-border)]"
                      key={`type-bar-${bar}`}
                      style={{ opacity: bar % 3 === 0 ? 0.9 : 0.26, width: `${100 - (bar % 5) * 9}%` }}
                    />
                  ))}
                </div>
              </div>
            </section>
            <section className="grid min-h-0 grid-rows-[auto_1fr_auto] border border-[var(--sample-border)] bg-[var(--sample-base)] p-3">
              <div>
                <p className={cn("font-black uppercase tracking-[0.18em] text-[var(--sample-accent)]", tiny)}>{config.tertiaryMarker}</p>
                <h3 className={cn("mt-2 max-w-[10ch] font-display font-black uppercase leading-[0.8]", headline)} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.04em" }}>
                  {config.title}
                </h3>
              </div>
              <div className="grid min-h-0 grid-cols-2 gap-2 py-3">
                {config.modules.map((item, index) => (
                  <span className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2 text-[9px] font-bold uppercase leading-tight" key={item}>
                    <span className="block text-[1.4rem] leading-none">{index + 1}</span>
                    {item}
                  </span>
                ))}
              </div>
              <MarkerRail compact={compact} items={[config.marker, "reading scale", "type-led nav"]} />
            </section>
          </main>
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "longform") {
    return (
      <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
        <div className="grid h-full grid-rows-[auto_1fr] gap-3">
          <SampleNav brand="Field Review" bordered compact={compact} links={["Features", "Essays", "Archive"]} sub={config.marker} />
          <main className={cn("grid min-h-0 gap-4", compact ? "grid-cols-[0.7fr_1.3fr]" : "grid-cols-[0.58fr_1.42fr]")}>
            <aside className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-3">
              <p className={cn("font-black uppercase tracking-[0.18em] text-[var(--sample-muted)]", tiny)}>{config.subMarker}</p>
              <div className="border-l border-[var(--sample-border)] pl-3 font-serif text-[var(--sample-text)]">
                <p className={cn("leading-tight", compact ? "line-clamp-5 text-[1rem]" : "text-[1.45rem]")}>{config.deck}</p>
              </div>
              <MarkerRail compact={compact} items={["caption rail", "folio", config.tertiaryMarker]} />
            </aside>
            <section className="grid min-h-0 grid-rows-[1.1fr_auto] gap-3">
              <PhotoSurface className="min-h-0 border border-[var(--sample-border)]" scene="material">
                <div className="absolute bottom-3 left-3 right-3 border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)_/_0.82)] p-2">
                  <p className={cn("font-black uppercase tracking-[0.18em]", tiny)}>{config.marker}</p>
                </div>
              </PhotoSurface>
              <div className="grid grid-cols-3 gap-2">
                {config.modules.map((item, index) => (
                  <span className="min-w-0 border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2 text-[8px] font-bold uppercase leading-tight" key={item}>
                    <span className="mb-2 block h-1 bg-[var(--sample-accent)]" style={{ width: `${48 + index * 14}%` }} />
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </main>
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "magazine") {
    return (
      <SampleFrame className={className} compact={compact} style={style}>
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <header className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-[var(--sample-border)] pb-2">
            <span className={cn("font-black uppercase tracking-[0.18em]", tiny)}>{config.marker}</span>
            <span className="h-px bg-[var(--sample-border-soft)]" />
            <span className={cn("font-black uppercase tracking-[0.18em] text-[var(--sample-accent)]", tiny)}>{config.subMarker}</span>
          </header>
          <main className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.92fr_1.08fr]" : "grid-cols-[0.78fr_1.22fr]")}>
            <section className="relative overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-accent)] p-3 text-[var(--sample-base)]">
              <p className={cn("font-black uppercase tracking-[0.18em]", tiny)}>{config.tertiaryMarker}</p>
              <h3 className={cn("absolute inset-x-3 bottom-3 font-display font-black uppercase leading-[0.78]", compact ? "text-[1.8rem]" : "text-[4.2rem]")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.04em" }}>
                Issue
              </h3>
            </section>
            <section className="grid min-h-0 grid-rows-[auto_1fr] gap-2">
              <h3 className={cn("font-display font-black uppercase leading-[0.9]", headline)} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.035em" }}>
                {config.title}
              </h3>
              <div className="grid min-h-0 grid-cols-2 gap-2">
                {config.modules.map((item, index) => (
                  <span className="grid min-h-0 grid-rows-[1fr_auto] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2" key={item}>
                    <span className={cn(index % 2 ? "bg-[var(--sample-accent-2)]" : "bg-[var(--sample-accent-3)]")} />
                    <span className="mt-2 truncate text-[8px] font-black uppercase tracking-[0.12em]">{item}</span>
                  </span>
                ))}
              </div>
            </section>
          </main>
          <MarkerRail compact={compact} items={["cover wall", "contents grid", "feature cards"]} />
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "poster") {
    return (
      <SampleFrame className={cn("bg-[var(--sample-accent)] text-[var(--sample-base)]", className)} compact={compact} style={style}>
        <div className="relative h-full overflow-hidden border-[3px] border-[var(--sample-border)] bg-[var(--sample-accent)] p-3">
          <span className="absolute -right-8 top-8 h-20 w-44 rotate-[-18deg] bg-[var(--sample-base)] opacity-90" />
          <span className="absolute bottom-16 left-[-20px] h-10 w-52 rotate-[8deg] bg-[var(--sample-accent-2)]" />
          <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto]">
            <p className={cn("font-black uppercase tracking-[0.2em]", tiny)}>{config.subMarker}</p>
            <h3 className={cn("self-center font-display font-black uppercase leading-[0.68]", compact ? "text-[2.7rem]" : "text-[5.8rem] sm:text-[7.6rem]")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.06em" }}>
              {config.marker}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[config.tertiaryMarker, ...config.modules].slice(0, 3).map((item) => (
                <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)]" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "grid") {
    return (
      <SampleFrame className={className} compact={compact} style={style}>
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <SampleNav brand="Layout Manual" bordered compact={compact} links={["Columns", "Ratios", "Rules"]} sub={config.marker} />
          <main className={cn("grid min-h-0 gap-2", compact ? "grid-cols-[auto_1fr]" : "grid-cols-[4.5rem_1fr]")}>
            <aside className="grid min-h-0 grid-rows-12 gap-1 border border-[var(--sample-border)] p-1">
              {bars.map((bar) => (
                <span className="bg-[var(--sample-border-soft)]" key={`ruler-${bar}`} />
              ))}
            </aside>
            <section className="relative grid min-h-0 grid-cols-6 grid-rows-6 gap-1 border border-[var(--sample-border)] bg-[var(--sample-surface)] p-2">
              {Array.from({ length: 36 }, (_, index) => (
                <span className={cn("border border-[var(--sample-border-soft)]", [2, 9, 16, 22, 29].includes(index) ? "bg-[var(--sample-accent)]" : "bg-[var(--sample-base)]")} key={`module-${index}`} />
              ))}
              <span className="absolute left-3 top-3 border border-[var(--sample-border)] bg-[var(--sample-text)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--sample-base)]">{config.subMarker}</span>
              <span className="absolute bottom-3 right-3 border border-[var(--sample-border)] bg-[var(--sample-accent-2)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--sample-text)]">{config.tertiaryMarker}</span>
            </section>
          </main>
          <MarkerRail compact={compact} items={[config.marker, "column ruler", "module matrix"]} />
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "collage" || config.layout === "photomontage") {
    const isPhoto = config.layout === "photomontage";
    return (
      <SampleFrame className={className} compact={compact} style={style}>
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <SampleNav brand={isPhoto ? "Composite Room" : "Paper Desk"} bordered={false} compact={compact} links={["Cuts", "Stacks", "Index"]} sub={config.marker} />
          <main className="relative min-h-0 overflow-hidden border border-[var(--sample-border)] bg-[var(--sample-surface)]">
            {config.modules.map((item, index) => (
              <div
                className={cn(
                  "absolute border border-[var(--sample-border)] p-2 text-[8px] font-black uppercase tracking-[0.12em]",
                  isPhoto ? "bg-[var(--sample-text)] text-[var(--sample-base)]" : "bg-[var(--sample-base)] text-[var(--sample-text)]",
                )}
                key={item}
                style={{
                  height: compact ? `${28 + index * 7}%` : `${24 + index * 8}%`,
                  left: `${8 + index * 16}%`,
                  top: `${12 + (index % 3) * 18}%`,
                  transform: `rotate(${[-7, 4, -2, 9][index % 4]}deg)`,
                  width: compact ? `${34 + (index % 2) * 10}%` : `${28 + (index % 3) * 9}%`,
                }}
              >
                <span className="block h-full bg-[linear-gradient(135deg,var(--sample-accent)_0_28%,transparent_28%_44%,var(--sample-accent-2)_44%_100%)] opacity-70" />
                <span className="absolute left-2 top-2">{item}</span>
              </div>
            ))}
            <span className="absolute left-4 top-4 border border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-1 text-[8px] font-black uppercase">{config.subMarker}</span>
            <span className="absolute bottom-4 right-4 border border-[var(--sample-border)] bg-[var(--sample-base)] px-2 py-1 text-[8px] font-black uppercase">{config.tertiaryMarker}</span>
          </main>
          <MarkerRail compact={compact} items={[config.marker, isPhoto ? "image collision grid" : "tape layer stack", isPhoto ? "mask stack" : "cutout tray"]} />
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "experimental-type") {
    return (
      <SampleFrame className={cn("bg-[var(--sample-text)] text-[var(--sample-base)]", className)} compact={compact} style={style}>
        <div className="relative h-full overflow-hidden p-3">
          <span className="absolute -left-10 top-6 text-[11rem] font-black leading-none text-[var(--sample-accent)] opacity-90 blur-[0.2px]">a</span>
          <span className="absolute right-[-1rem] top-2 rotate-[-12deg] text-[7rem] font-black leading-none text-[var(--sample-accent-2)] opacity-80">R</span>
          <span className="absolute bottom-3 left-[34%] rotate-[9deg] text-[6rem] font-black leading-none text-[var(--sample-accent-3)] opacity-85">g</span>
          <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto]">
            <p className={cn("font-black uppercase tracking-[0.2em]", tiny)}>{config.subMarker}</p>
            <h3 className={cn("self-center font-display font-black uppercase leading-[0.72]", compact ? "text-[2rem]" : "text-[4.6rem]")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.07em" }}>
              {config.marker}
            </h3>
            <MarkerRail compact={compact} items={[config.tertiaryMarker, "variable glyph field", "distortion rail"]} />
          </div>
        </div>
      </SampleFrame>
    );
  }

  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr] gap-2">
        <header className="border-b-[3px] border-[var(--sample-border)] pb-2 text-center">
          <p className={cn("font-black uppercase tracking-[0.22em]", tiny)}>{config.subMarker}</p>
          <h3 className={cn("font-serif font-black uppercase leading-none", compact ? "text-[1.8rem]" : "text-[3rem]")}>{config.marker}</h3>
        </header>
        <main className={cn("grid min-h-0 gap-2", compact ? "grid-cols-[1fr_0.7fr]" : "grid-cols-[1.35fr_0.65fr]")}>
          <section className="grid min-h-0 grid-rows-5 gap-1">
            {config.modules.map((item, index) => (
              <div className="grid grid-cols-[1fr_auto] border-b border-[var(--sample-border)] pb-1 text-[8px] font-black uppercase leading-tight" key={item}>
                <span className="truncate">{item}</span>
                <span className="text-[var(--sample-accent)]">0{index + 1}</span>
              </div>
            ))}
            {bars.slice(0, 3).map((bar) => (
              <span className="border-b border-[var(--sample-border-soft)]" key={`news-extra-${bar}`} />
            ))}
          </section>
          <aside className="grid min-h-0 grid-rows-[auto_1fr_auto] border-l border-[var(--sample-border)] pl-2">
            <p className={cn("font-black uppercase tracking-[0.18em] text-[var(--sample-accent)]", tiny)}>{config.tertiaryMarker}</p>
            <div className="grid gap-1 py-2">
              {bars.slice(0, compact ? 5 : 8).map((bar) => (
                <span className="bg-[var(--sample-border-soft)]" key={`headline-${bar}`} style={{ height: bar % 2 ? "0.45rem" : "0.75rem" }} />
              ))}
            </div>
            <p className="text-[8px] font-black uppercase tracking-[0.12em]">headline stack</p>
          </aside>
        </main>
      </div>
    </SampleFrame>
  );
}

function TypographyFocusedSpecimen(props: Props) {
  return <EditorialDistinctionSample {...props} config={{ deck: "Type scale drives every content decision.", layout: "type-scale", marker: "TYPE SCALE SPECIMEN", modules: ["display proof", "body measure", "mono note", "caption row"], subMarker: "baseline strips", tertiaryMarker: "font pairing shelf", title: "Scale Index" }} />;
}

function EditorialLongformIndex(props: Props) {
  return <EditorialDistinctionSample {...props} config={{ deck: "A measured longform article desk with a pull quote rail and a photo essay stack.", layout: "longform", marker: "LONGFORM EDIT DESK", modules: ["lead image", "caption", "essay card"], subMarker: "pull quote rail", tertiaryMarker: "photo essay stack", title: "Longform" }} />;
}

function MagazineIssueBrowser(props: Props) {
  return <EditorialDistinctionSample {...props} config={{ deck: "Issue browsing uses cover impact before article depth.", layout: "magazine", marker: "ISSUE BROWSER", modules: ["culture", "objects", "profiles", "agenda"], subMarker: "cover wall", tertiaryMarker: "contents grid", title: "Issue Browser" }} />;
}

function PosterismPasteupWall(props: Props) {
  return <EditorialDistinctionSample {...props} config={{ deck: "One message owns the wall.", layout: "poster", marker: "POSTER WALL", modules: ["date block", "venue strip", "CTA stamp"], subMarker: "single-message field", tertiaryMarker: "paste-up rail", title: "Poster" }} />;
}

function GridSystemManual(props: Props) {
  return <EditorialDistinctionSample {...props} config={{ deck: "The page shows its construction rules first.", layout: "grid", marker: "GRID METHOD", modules: ["columns", "ratio", "breakpoint"], subMarker: "column ruler", tertiaryMarker: "module matrix", title: "Grid Manual" }} />;
}

function CollageLayerDesk(props: Props) {
  return <EditorialDistinctionSample {...props} config={{ deck: "Paper scraps, tape and cutouts carry the composition.", layout: "collage", marker: "PAPER COLLAGE DESK", modules: ["scrap one", "scrap two", "paper tab", "tear edge"], subMarker: "tape layer stack", tertiaryMarker: "cutout tray", title: "Collage" }} />;
}

function PhotomontageCampaign(props: Props) {
  return <EditorialDistinctionSample {...props} config={{ deck: "Image collision and masking replace paper craft.", layout: "photomontage", marker: "PHOTO MONTAGE ROOM", modules: ["photo crop", "hard mask", "scene cut", "shadow pass"], subMarker: "image collision grid", tertiaryMarker: "mask stack", title: "Montage" }} />;
}

function ExperimentalTypeLab(props: Props) {
  return <EditorialDistinctionSample {...props} config={{ deck: "Glyph shape becomes the image system.", layout: "experimental-type", marker: "TYPE MUTATION LAB", modules: ["axis", "stretch", "slice"], subMarker: "variable glyph field", tertiaryMarker: "distortion rail", title: "Mutation" }} />;
}

function NewspaperEditionGrid(props: Props) {
  return <EditorialDistinctionSample {...props} config={{ deck: "Dense headlines, sections and urgency drive the edition.", layout: "newspaper", marker: "DAILY EDITION", modules: ["world desk", "opinion", "business", "culture", "sports"], subMarker: "masthead bar", tertiaryMarker: "headline stack", title: "Edition" }} />;
}

type UiWebLayout =
  | "clay"
  | "dark"
  | "flat"
  | "glass"
  | "material"
  | "neumorphic"
  | "saas"
  | "startup";

type UiWebDistinctionConfig = {
  deck: string;
  layout: UiWebLayout;
  marker: string;
  modules: string[];
  subMarker: string;
  tertiaryMarker: string;
};

function UiWebDistinctionSample({
  className,
  compact = false,
  config,
  style,
}: Props & { config: UiWebDistinctionConfig }) {
  const label = compact ? "text-[7px]" : "text-[8px] sm:text-[9px]";
  const modules = config.modules;

  if (config.layout === "flat") {
    return (
      <SampleFrame className={className} compact={compact} style={style}>
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <SampleNav brand="Flat Kit" bordered={false} compact={compact} links={["Forms", "Icons", "Docs"]} sub={config.marker} />
          <main className="grid min-h-0 grid-cols-4 grid-rows-4 gap-2">
            {modules.concat(["status", "CTA", "field", "list"]).map((item, index) => (
              <span
                className={cn("grid place-items-center border-2 border-[var(--sample-border)] p-1 text-center font-black uppercase leading-tight", label, index % 3 === 0 ? "col-span-2 bg-[var(--sample-accent)] text-[var(--sample-base)]" : index % 3 === 1 ? "bg-[var(--sample-accent-2)]" : "bg-[var(--sample-surface)]")}
                key={item}
              >
                {item}
              </span>
            ))}
          </main>
          <MarkerRail compact={compact} items={[config.subMarker, config.tertiaryMarker, "no-depth buttons"]} />
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "material") {
    return (
      <SampleFrame className={cn("bg-[color-mix(in_srgb,var(--sample-base)_86%,var(--sample-accent-2))]", className)} compact={compact} style={style}>
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <SampleNav brand="State Sheet" compact={compact} links={["Components", "Motion", "Tokens"]} sub={config.marker} />
          <main className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[0.82fr_1.18fr]" : "grid-cols-[0.7fr_1.3fr]")}>
            <section className="relative min-h-0 rounded-[18px] bg-[var(--sample-surface)] p-3 shadow-[0_18px_34px_rgb(0_0_0_/_0.16)]">
              <span className="absolute right-4 top-4 h-14 w-14 rounded-full bg-[var(--sample-accent)] opacity-35" />
              <p className={cn("font-black uppercase tracking-[0.18em] text-[var(--sample-muted)]", label)}>{config.subMarker}</p>
              <div className="mt-5 grid gap-2">
                {modules.map((item, index) => (
                  <span className="rounded-[14px] bg-[var(--sample-base)] p-3 text-[9px] font-bold uppercase shadow-[0_10px_18px_rgb(0_0_0_/_0.10)]" key={item}>{item} {index + 1}</span>
                ))}
              </div>
            </section>
            <section className="grid min-h-0 grid-rows-3 gap-3">
              {[config.marker, config.tertiaryMarker, "state layer"].map((item, index) => (
                <span className="rounded-[18px] bg-[var(--sample-surface)] p-3 text-[9px] font-black uppercase tracking-[0.12em] shadow-[0_16px_28px_rgb(0_0_0_/_0.13)]" key={item}>
                  <span className={cn("mr-2 inline-block h-5 w-5 rounded-full align-middle", index === 1 ? "bg-[var(--sample-accent-2)]" : "bg-[var(--sample-accent)]")} />
                  {item}
                </span>
              ))}
            </section>
          </main>
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "neumorphic") {
    const softShadow = "10px 10px 22px rgb(var(--st-text-rgb) / 0.10), -10px -10px 22px rgb(255 255 255 / 0.64)";
    return (
      <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
          <SampleNav brand="Soft UI" bordered={false} compact={compact} links={["Controls", "Audio", "Profile"]} sub={config.marker} />
          <main className="grid min-h-0 grid-cols-[0.95fr_1.05fr] gap-4">
            <section className="rounded-[26px] p-4" style={{ boxShadow: softShadow }}>
              <p className={cn("font-black uppercase tracking-[0.18em] text-[var(--sample-muted)]", label)}>{config.subMarker}</p>
              <div className="mt-4 grid gap-4">
                {modules.map((item) => (
                  <span className="rounded-[999px] px-4 py-3 text-[9px] font-black uppercase" key={item} style={{ boxShadow: "inset 7px 7px 12px rgb(var(--st-text-rgb) / 0.12), inset -7px -7px 12px rgb(255 255 255 / 0.70)" }}>
                    {item}
                  </span>
                ))}
              </div>
            </section>
            <section className="grid min-h-0 place-items-center rounded-[32px] p-5" style={{ boxShadow: softShadow }}>
              <div className="grid h-28 w-28 place-items-center rounded-full text-center text-[8px] font-black uppercase tracking-[0.14em]" style={{ boxShadow: "inset 10px 10px 18px rgb(var(--st-text-rgb) / 0.14), inset -10px -10px 18px rgb(255 255 255 / 0.68)" }}>
                {config.tertiaryMarker}
              </div>
            </section>
          </main>
          <MarkerRail compact={compact} items={[config.marker, "double shadow wells", "pressed surface"]} />
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "glass") {
    return (
      <SampleFrame className={className} compact={compact} style={style}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,var(--sample-accent)_0_18%,transparent_36%),radial-gradient(circle_at_85%_10%,var(--sample-accent-2)_0_18%,transparent_34%),linear-gradient(135deg,var(--sample-text),var(--sample-accent-3))] opacity-90" />
        <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <SampleNav brand="Weather Glass" bordered={false} compact={compact} links={["Map", "Alerts", "Layers"]} sub={config.marker} />
          <main className="grid min-h-0 grid-cols-[1.1fr_0.9fr] gap-3">
            <section className="rounded-[24px] border border-white/40 bg-white/20 p-3 text-white shadow-[0_20px_40px_rgb(0_0_0_/_0.24)] backdrop-blur-xl">
              <p className={cn("font-black uppercase tracking-[0.18em]", label)}>{config.subMarker}</p>
              <div className="mt-5 grid h-[70%] grid-cols-3 gap-2">
                {modules.map((item, index) => (
                  <span className="rounded-[18px] border border-white/35 bg-white/15 p-2 text-[8px] font-black uppercase" key={item}>{index + 1} {item}</span>
                ))}
              </div>
            </section>
            <section className="grid min-h-0 grid-rows-3 gap-2">
              {[config.tertiaryMarker, "blur layer", "refraction"].map((item) => (
                <span className="rounded-[20px] border border-white/35 bg-white/18 p-3 text-[8px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-lg" key={item}>{item}</span>
              ))}
            </section>
          </main>
          <MarkerRail compact={compact} items={[config.marker, "translucent cards", "layered blur"]} />
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "clay") {
    return (
      <SampleFrame className={cn("bg-[var(--sample-base)]", className)} compact={compact} style={style}>
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <SampleNav brand="Clay Tasks" bordered={false} compact={compact} links={["Board", "Shop", "Rewards"]} sub={config.marker} />
          <main className="relative min-h-0 overflow-hidden rounded-[30px] bg-[linear-gradient(145deg,var(--sample-surface),var(--sample-accent-2))] p-4">
            {modules.map((item, index) => (
              <span
                className="absolute grid place-items-center rounded-[32px] bg-[var(--sample-surface)] px-4 py-3 text-center text-[8px] font-black uppercase shadow-[0_18px_24px_rgb(0_0_0_/_0.16),inset_0_2px_0_rgb(255_255_255_/_0.58)]"
                key={item}
                style={{ left: `${9 + index * 21}%`, top: `${14 + (index % 3) * 19}%`, transform: `rotate(${[-5, 3, 7, -2][index % 4]}deg)` }}
              >
                {item}
              </span>
            ))}
            <span className="absolute bottom-4 left-4 rounded-full bg-[var(--sample-accent)] px-4 py-2 text-[8px] font-black uppercase text-[var(--sample-base)]">{config.subMarker}</span>
            <span className="absolute right-4 top-4 h-16 w-16 rounded-full bg-[var(--sample-accent-3)] shadow-[0_18px_28px_rgb(0_0_0_/_0.15)]" />
          </main>
          <MarkerRail compact={compact} items={[config.tertiaryMarker, "soft 3D modules", "puffy task cards"]} />
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "dark") {
    return (
      <SampleFrame className={cn("bg-[var(--sample-text)] text-[var(--sample-base)]", className)} compact={compact} style={style}>
        <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
          <SampleNav brand="Night Console" bordered compact={compact} links={["Contrast", "States", "Logs"]} sub={config.marker} />
          <main className="grid min-h-0 grid-cols-[0.72fr_1.28fr] gap-3">
            <aside className="grid min-h-0 grid-rows-6 gap-2">
              {["AA", "AAA", "hover", "focus", "error", "ok"].map((item, index) => (
                <span className={cn("border border-white/20 p-2 text-[8px] font-black uppercase", index === 3 ? "ring-2 ring-[var(--sample-accent)]" : "")} key={item}>
                  {item}
                </span>
              ))}
            </aside>
            <section className="grid min-h-0 grid-rows-[auto_1fr_auto] border border-white/20 bg-white/5 p-3">
              <p className={cn("font-black uppercase tracking-[0.18em] text-[var(--sample-accent)]", label)}>{config.subMarker}</p>
              <div className="grid content-center gap-2 py-3">
                {modules.map((item, index) => (
                  <span className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border border-white/15 bg-black/20 p-2 text-[8px] font-black uppercase" key={item}>
                    <span className="h-2 w-2 rounded-full bg-[var(--sample-accent)]" />
                    <span>{item}</span>
                    <span>{index + 1}</span>
                  </span>
                ))}
              </div>
              <p className="text-[8px] font-black uppercase tracking-[0.16em]">{config.tertiaryMarker}</p>
            </section>
          </main>
          <MarkerRail compact={compact} items={[config.marker, "contrast ladder", "focus ring audit"]} />
        </div>
      </SampleFrame>
    );
  }

  if (config.layout === "saas") {
    return (
      <SampleFrame className={className} compact={compact} style={style}>
        <div className="grid h-full grid-cols-[0.34fr_0.66fr] gap-3">
          <aside className="grid min-h-0 grid-rows-[auto_1fr_auto] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-3">
            <p className={cn("font-black uppercase tracking-[0.18em] text-[var(--sample-accent)]", label)}>{config.marker}</p>
            <div className="mt-4 grid content-start gap-2">
              {["Pipeline", "Accounts", "Reports", "Settings"].map((item) => (
                <span className="rounded-[var(--st-radius)] bg-[var(--sample-base)] px-2 py-2 text-[8px] font-bold uppercase" key={item}>{item}</span>
              ))}
            </div>
            <span className="rounded-[var(--st-radius)] bg-[var(--sample-text)] px-2 py-2 text-[8px] font-black uppercase text-[var(--sample-base)]">{config.tertiaryMarker}</span>
          </aside>
          <main className="grid min-h-0 grid-rows-[auto_1fr_auto] gap-3">
            <section className="grid grid-cols-3 gap-2">
              {modules.map((item) => (
                <span className="border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] p-2 text-[8px] font-black uppercase" key={item}>{item}</span>
              ))}
            </section>
            <section className="grid min-h-0 grid-cols-3 gap-2">
              {["basic", "growth", "scale"].map((item, index) => (
                <span className={cn("border border-[var(--sample-border-soft)] p-3 text-[8px] font-black uppercase", index === 1 ? "bg-[var(--sample-accent)] text-[var(--sample-base)]" : "bg-[var(--sample-surface)]")} key={item}>{item}</span>
              ))}
            </section>
            <MarkerRail compact={compact} items={[config.subMarker, "feature proof grid", "pricing matrix"]} />
          </main>
        </div>
      </SampleFrame>
    );
  }

  return (
    <SampleFrame className={className} compact={compact} style={style}>
      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <SampleNav brand="Launch Story" bordered={false} compact={compact} links={["Product", "Proof", "Pricing"]} sub={config.marker} />
        <main className={cn("grid min-h-0 gap-3", compact ? "grid-cols-[1.1fr_0.9fr]" : "grid-cols-[1.3fr_0.7fr]")}>
          <section className="flex min-h-0 flex-col justify-center">
            <p className={cn("font-black uppercase tracking-[0.18em] text-[var(--sample-accent)]", label)}>{config.subMarker}</p>
            <h3 className={cn("mt-3 font-display font-black leading-[0.95]", compact ? "text-[1.7rem]" : "text-[3.8rem]")} style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.04em" }}>
              Ship the first useful signal.
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {modules.map((item) => (
                <span className="rounded-[var(--st-radius)] border border-[var(--sample-border-soft)] bg-[var(--sample-surface)] px-3 py-2 text-[8px] font-black uppercase" key={item}>{item}</span>
              ))}
            </div>
          </section>
          <section className="grid min-h-0 grid-rows-4 gap-2">
            {["hero", "proof", "feature", "cta"].map((item, index) => (
              <span className={cn("rounded-[var(--st-radius)] p-3 text-[8px] font-black uppercase", index === 0 ? "bg-[var(--sample-accent)] text-[var(--sample-base)]" : "bg-[var(--sample-surface)]")} key={item}>{item}</span>
            ))}
          </section>
        </main>
        <MarkerRail compact={compact} items={[config.tertiaryMarker, "hero CTA ladder", "funnel sequence"]} />
      </div>
    </SampleFrame>
  );
}

function FlatDesignControlBoard(props: Props) {
  return <UiWebDistinctionSample {...props} config={{ deck: "Flat UI uses solid fills and no ornamental depth.", layout: "flat", marker: "FLAT CONTROL BOARD", modules: ["solid fill modules", "forms", "menu", "tiles"], subMarker: "solid fill modules", tertiaryMarker: "no-depth buttons" }} />;
}

function MaterialDesignStateSheet(props: Props) {
  return <UiWebDistinctionSample {...props} config={{ deck: "Material UI shows surface rules, state layers and elevation.", layout: "material", marker: "MATERIAL STATE SHEET", modules: ["card", "sheet", "dialog"], subMarker: "elevation stack", tertiaryMarker: "ripple state rail" }} />;
}

function NeumorphismSoftPanel(props: Props) {
  return <UiWebDistinctionSample {...props} config={{ deck: "Neumorphism relies on low-contrast pressed controls.", layout: "neumorphic", marker: "SOFT EMBOSS PANEL", modules: ["volume", "timer", "mode"], subMarker: "inset controls", tertiaryMarker: "double shadow wells" }} />;
}

function GlassmorphismDepthDesk(props: Props) {
  return <UiWebDistinctionSample {...props} config={{ deck: "Glassmorphism uses transparent cards over blurred spatial context.", layout: "glass", marker: "FROSTED DEPTH DESK", modules: ["layer", "forecast", "map"], subMarker: "blurred weather map", tertiaryMarker: "translucent cards" }} />;
}

function ClaymorphismAppWorkshop(props: Props) {
  return <UiWebDistinctionSample {...props} config={{ deck: "Claymorphism is puffy, colorful and soft 3D.", layout: "clay", marker: "CLAY APP WORKSHOP", modules: ["puffy task cards", "reward", "profile", "shop"], subMarker: "puffy task cards", tertiaryMarker: "soft 3D modules" }} />;
}

function DarkModeOpsConsole(props: Props) {
  return <UiWebDistinctionSample {...props} config={{ deck: "Dark mode is an accessibility and state clarity system.", layout: "dark", marker: "DARK MODE OPS", modules: ["state log", "active row", "dim row", "alert"], subMarker: "contrast ladder", tertiaryMarker: "focus ring audit" }} />;
}

function SaasStyleOperationsHome(props: Props) {
  return <UiWebDistinctionSample {...props} config={{ deck: "SaaS style balances feature proof, operations and pricing.", layout: "saas", marker: "SAAS OPERATIONS HOME", modules: ["ARR", "activation", "support"], subMarker: "feature proof grid", tertiaryMarker: "pricing matrix" }} />;
}

function StartupLandingStory(props: Props) {
  return <UiWebDistinctionSample {...props} config={{ deck: "Startup landing pages stage a conversion story.", layout: "startup", marker: "STARTUP CONVERSION STORY", modules: ["waitlist", "demo", "proof", "pricing"], subMarker: "hero CTA ladder", tertiaryMarker: "funnel sequence" }} />;
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

function KitschPriceBurst({ price, bg, ink, className }: { price: string; bg: string; ink: string; className?: string }) {
  // A real retail "sale seal" sunburst — the signature kitsch price sticker,
  // spent once per card so it reads as deliberate novelty, not clutter.
  const points: string[] = [];
  const spikes = 11;
  for (let i = 0; i < spikes * 2; i += 1) {
    const radius = i % 2 === 0 ? 49 : 37;
    const angle = (Math.PI / spikes) * i - Math.PI / 2;
    points.push(`${(50 + radius * Math.cos(angle)).toFixed(1)},${(50 + radius * Math.sin(angle)).toFixed(1)}`);
  }
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 100 100">
      <polygon fill={bg} points={points.join(" ")} stroke={ink} strokeLinejoin="round" strokeOpacity={0.18} strokeWidth={2} />
      <text dominantBaseline="central" fill={ink} fontFamily="var(--st-font-display)" fontSize="26" fontWeight="900" textAnchor="middle" x="50" y="52">{price}</text>
    </svg>
  );
}

function KitschNoveltyDrop({ compact = false, style }: Props) {
  // "Novelty boutique storefront": a ban.do / Lisa Says Gah / Lazy Oaf shop —
  // an asymmetric hero + gift-finder split above a wall of odd-object product
  // cards, closed by a drop countdown. Boldness is spent on the sunburst price
  // stickers and the clashing print swatches; everything else stays white,
  // hairline and disciplined. The storefront skeleton keeps it distinct from
  // its neighbours kawaii (collection-grid membership) and dopamine-design
  // (circular reward dashboard).
  const ink = "#2c2442";
  const cardShadow: CSSProperties = { boxShadow: "0 8px 20px -12px rgba(44,36,66,0.42), inset 0 1px 1px rgba(255,255,255,0.7)" };
  const products: Array<{ name: string; price: string; pos: string; size: string; tag?: string; burst: string; dots: string[] }> = [
    { name: "smiley mug", price: "$18", pos: "40% 55%", size: "230%", tag: "new", burst: "var(--sample-accent-3)", dots: ["#ffc93d", "#ff5c35", "#f5308c"] },
    { name: "checker tote", price: "$42", pos: "82% 40%", size: "200%", burst: "var(--sample-surface)", dots: ["#2c2442", "#fbf1df"] },
    { name: "disco bauble", price: "$14", pos: "88% 80%", size: "250%", tag: "hot", burst: "var(--sample-accent)", dots: ["#c9c9d6", "#7c4dff"] },
    { name: "heart shades", price: "$22", pos: "22% 86%", size: "250%", burst: "var(--sample-accent-2)", dots: ["#f7a8c4", "#ff5c35"] },
  ];
  const patterns: Array<{ name: string; style: CSSProperties }> = [
    { name: "checker", style: { background: "conic-gradient(var(--sample-text) 0 25%, #ffffff 0 50%) 0 0 / 8px 8px", backgroundColor: "#ffffff" } },
    { name: "dots", style: { background: "radial-gradient(var(--sample-accent) 32%, transparent 34%) 0 0 / 7px 7px", backgroundColor: "var(--sample-base)" } },
    { name: "wavy", style: { background: "repeating-linear-gradient(45deg, var(--sample-accent-2) 0 3.5px, #ffffff 3.5px 7px)" } },
    { name: "flame", style: { background: "repeating-linear-gradient(-45deg, var(--sample-primary) 0 3.5px, var(--sample-accent-3) 3.5px 7px)" } },
    { name: "gingham", style: { background: "repeating-linear-gradient(0deg, rgba(245,48,140,0.5) 0 3.5px, transparent 3.5px 7px), repeating-linear-gradient(90deg, rgba(245,48,140,0.5) 0 3.5px, transparent 3.5px 7px)", backgroundColor: "#ffffff" } },
    { name: "zigzag", style: { background: "repeating-linear-gradient(135deg, var(--sample-accent-3) 0 3.5px, var(--sample-text) 3.5px 7px)" } },
  ];

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className={cn("absolute inset-0 min-w-0 overflow-hidden text-[var(--sample-text)]", compact ? "p-3" : "p-4 sm:p-5")}
        style={{
          "--sample-accent": "#f5308c",
          "--sample-accent-2": "#7c4dff",
          "--sample-accent-3": "#ffc93d",
          "--sample-base": "#fbf1df",
          "--sample-border": "#2c2442",
          "--sample-border-soft": "rgba(44,36,66,0.11)",
          "--sample-muted": "#9a8fae",
          "--sample-primary": "#ff5c35",
          "--sample-surface": "#ffffff",
          "--sample-text": "#2c2442",
          "--st-base-rgb": "251 241 223",
          "--st-surface-rgb": "255 255 255",
          "--st-text-rgb": "44 36 66",
          "--st-primary-rgb": "255 92 53",
          "--st-accent-rgb": "245 48 140",
          "--st-accent-2-rgb": "124 77 255",
          "--st-accent-3-rgb": "255 201 61",
          "--st-border-rgb": "44 36 66",
          background:
            "radial-gradient(42% 38% at 4% 0%, rgb(124 77 255 / 0.18), transparent 62%), radial-gradient(44% 40% at 100% 8%, rgb(245 48 140 / 0.16), transparent 60%), radial-gradient(52% 46% at 96% 100%, rgb(255 201 61 / 0.2), transparent 62%), linear-gradient(180deg, #fdf6ea, #fbf0dc)",
        } as SampleVariables}
      >
        <div className="relative grid h-full min-h-0 min-w-0 grid-rows-[auto_auto_1fr_auto] gap-2.5">
          {/* ── marquee + nav ── */}
          <div className="min-w-0 space-y-1.5">
            <div className={cn("items-center gap-2 overflow-hidden rounded-full bg-[var(--sample-text)] px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)]", compact ? "hidden" : "flex")}>
              <span className="text-[var(--sample-accent-3)]">★</span>
              <span className="truncate">free ship over $50 · new drop live · 10% off first haul · deliberately odd since forever</span>
            </div>
            <SampleNav brand="Clash Cart" compact={compact} icons={[<IconBag key="bag" size={compact ? 11 : 13} />]} links={["Drop", "Shop", "Sale"]} sub="novelty market" />
          </div>

          {/* ── hero + gift finder split ── */}
          <div className={cn("grid min-w-0 gap-2.5", compact ? "grid-cols-1" : "grid-cols-[1.2fr_0.8fr]")}>
            <GeneratedStyleImageSurface className="relative min-h-[112px] overflow-hidden rounded-[18px] border border-[var(--sample-border-soft)]" overlay="none" position="46% 42%" slug="kitsch" style={{ backgroundSize: "168%", ...cardShadow }}>
              <div className="flex h-full flex-col justify-between p-2.5">
                <span aria-label="ODD SHOP DROP" className="w-max rounded-full bg-[var(--sample-accent-3)] px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.14em] text-[var(--sample-text)] shadow-[0_2px_6px_-2px_rgba(44,36,66,0.4)]">★ ODD SHOP DROP</span>
                <div className="w-max max-w-[94%] rounded-[13px] bg-[rgb(251_241_223/0.94)] px-2.5 py-1.5 backdrop-blur-[2px]" style={{ boxShadow: "0 6px 16px -8px rgba(44,36,66,0.45)" }}>
                  <h3 aria-label="LIMITED ODDITIES" className="font-black uppercase leading-[0.84]" style={{ fontFamily: "var(--st-font-display)", fontSize: compact ? "20px" : "27px", letterSpacing: "-0.01em" }}>
                    LIMITED
                    <br />
                    ODDITIES
                  </h3>
                  <p className="mt-0.5 text-[6.5px] font-black lowercase tracking-[0.04em] text-[var(--sample-muted)]">boutique humor, oddly giftable</p>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[var(--sample-primary)] px-2 py-0.5 text-[7.5px] font-black uppercase tracking-[0.06em] text-white">
                    shop the drop <IconArrow size={9} />
                  </span>
                </div>
              </div>
            </GeneratedStyleImageSurface>

            <div aria-label="giftable product finder" className={cn("flex flex-col rounded-[16px] bg-white p-2", compact && "hidden")} style={cardShadow}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[7.5px] font-black lowercase tracking-[0.06em]">giftable product finder</span>
                <span className="rounded-full bg-[var(--sample-accent-3)] px-1.5 py-0.5 text-[6px] font-black lowercase">quiz</span>
              </div>
              {([["for", "bestie", "desk", "you"], ["vibe", "loud", "cutesy", "weird"], ["budget", "under $25", "$25+"]] as string[][]).map(([label, ...opts]) => (
                <div className="mb-1 flex items-center gap-1" key={label}>
                  <span className="w-8 shrink-0 text-[6.5px] font-black lowercase text-[var(--sample-muted)]">{label}</span>
                  <span className="flex min-w-0 flex-wrap gap-0.5">
                    {opts.map((option, index) => (
                      <span className={cn("rounded-full px-1.5 py-0.5 text-[6.5px] font-black lowercase", index === 0 ? "bg-[var(--sample-primary)] text-white" : "bg-[var(--sample-base)] text-[var(--sample-text)]")} key={option}>{option}</span>
                    ))}
                  </span>
                </div>
              ))}
              <div className="mt-auto flex items-center justify-between rounded-full bg-[var(--sample-text)] px-2 py-1">
                <span className="text-[7px] font-black lowercase text-white">find my oddity</span>
                <span className="text-[7px] font-black lowercase text-[var(--sample-accent-3)]">18 matches</span>
              </div>
            </div>
          </div>

          {/* ── odd object cards + pattern clash rail ── */}
          <section aria-label="odd object cards" className="flex min-h-0 min-w-0 flex-col gap-2.5">
            <div aria-label="sticker price bursts" className="grid min-h-0 flex-1 grid-cols-4 gap-2">
              {products.map(({ name, price, pos, size, tag, burst, dots }) => (
                <div className="relative flex min-h-0 flex-col overflow-hidden rounded-[14px] border border-[var(--sample-border-soft)] bg-white" style={cardShadow} key={name}>
                  <div className="relative min-h-0 flex-1 overflow-hidden">
                    <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position={pos} slug="kitsch" style={{ backgroundSize: size }} />
                    {tag && <span className="absolute left-1 top-1 rounded-full bg-[rgb(255_255_255/0.92)] px-1.5 py-0.5 text-[6px] font-black uppercase tracking-[0.08em]">{tag}</span>}
                    <KitschPriceBurst bg={burst} className="absolute -right-1.5 -top-1.5 h-8 w-8 drop-shadow-[0_2px_3px_rgba(44,36,66,0.28)]" ink={ink} price={price} />
                  </div>
                  <div className="flex items-center justify-between gap-1 px-1.5 py-1">
                    <span className="truncate text-[8px] font-black lowercase">{name}</span>
                    <span className="flex shrink-0 gap-0.5">
                      {dots.map((color, index) => (
                        <span className="h-1.5 w-1.5 rounded-full" key={index} style={{ background: color, boxShadow: "inset 0 0 0 1px rgba(44,36,66,0.16)" }} />
                      ))}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div aria-label="clashing pattern strips" className={cn("rounded-[14px] bg-white px-2 py-1.5", compact && "hidden")} style={cardShadow}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[7.5px] font-black lowercase tracking-[0.06em]">shop by print</span>
                <span className="text-[6.5px] font-black lowercase text-[var(--sample-muted)]">6 prints · mix freely</span>
              </div>
              <div aria-label="pattern clash rail" className="flex items-end justify-between gap-1">
                {patterns.map(({ name, style: patternStyle }) => (
                  <span className="flex min-w-0 flex-col items-center gap-0.5" key={name}>
                    <span className="h-6 w-6 rounded-[8px] ring-1 ring-[var(--sample-border-soft)]" style={patternStyle} />
                    <span className="text-[5.5px] font-black lowercase text-[var(--sample-muted)]">{name}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── drop countdown ── */}
          <div aria-label="drop countdown" className={cn("items-center gap-2 rounded-full bg-[var(--sample-text)] px-3 py-1.5", compact ? "hidden" : "flex")}>
            <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-3)]">drop ends</span>
            <div className="flex gap-1">
              {["02", "14", "39"].map((value, index) => (
                <span className="rounded-md bg-[rgb(255_255_255/0.14)] px-1.5 py-0.5 text-[9px] font-black tabular-nums text-white" key={index}>{value}</span>
              ))}
            </div>
            <span className="ml-auto hidden truncate text-[6.5px] font-black lowercase text-[rgb(255_255_255/0.65)] sm:block">restocks never · odd on purpose</span>
            <span className="rounded-full bg-[var(--sample-primary)] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.06em] text-white">shop all</span>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function KawaiiHeart({ className, filled = true }: { className?: string; filled?: boolean }) {
  return (
    <svg aria-hidden="true" className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M12 21C6.6 16.4 4 13.4 4 10a3.6 3.6 0 0 1 6-2.6A3.6 3.6 0 0 1 20 10c0 3.4-2.6 6.4-8 11Z" />
    </svg>
  );
}

function KawaiiCharacterClub({ compact = false, style }: Props) {
  // "Character club dashboard": a Sanrio / Pusheen membership screen — a mascot
  // collection grid with a member banner, a small character mood ring, heart
  // badges, a stamp-reward card and a tiny-treats shop. The collection-grid
  // membership skeleton keeps it distinct from its neighbours kitsch (bordered
  // novelty shop split) and dopamine-design (circular reward dashboard).
  const softShadow: CSSProperties = { boxShadow: "0 10px 22px -14px rgba(91,74,87,0.42), inset 0 1px 1px rgba(255,255,255,0.85)" };
  const mascots: Array<[string, string, boolean]> = [
    ["bun", "18% 54%", true],
    ["sky", "42% 40%", true],
    ["star", "60% 56%", true],
    ["puff", "80% 46%", false],
    ["milk", "30% 72%", true],
    ["berry", "72% 70%", false],
  ];
  const treats: Array<[string, string, string]> = [
    ["mini plush", "$16", "24% 52%"],
    ["sticker set", "$8", "50% 44%"],
    ["charm", "$12", "66% 60%"],
    ["tote", "$22", "82% 50%"],
  ];
  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className={cn("absolute inset-0 min-w-0 overflow-hidden text-[var(--sample-text)]", compact ? "p-3" : "p-4 sm:p-5")}
        style={{
          "--sample-accent": "#ff9ec4",
          "--sample-accent-2": "#9ecbff",
          "--sample-accent-3": "#ffe08a",
          "--sample-base": "#fff3f8",
          "--sample-border": "#5b4a57",
          "--sample-border-soft": "#5b4a571c",
          "--sample-muted": "#a892a0",
          "--sample-primary": "#ff77b0",
          "--sample-surface": "#ffffff",
          "--sample-text": "#5b4a57",
          "--st-base-rgb": "255 243 248",
          "--st-surface-rgb": "255 255 255",
          "--st-text-rgb": "91 74 87",
          "--st-primary-rgb": "255 119 176",
          "--st-accent-rgb": "255 158 196",
          "--st-accent-2-rgb": "158 203 255",
          "--st-accent-3-rgb": "255 224 138",
          "--st-border-rgb": "91 74 87",
          background:
            "radial-gradient(48% 40% at 10% 6%, rgb(255 158 196 / 0.24), transparent 60%), radial-gradient(44% 40% at 94% 10%, rgb(158 203 255 / 0.22), transparent 60%), radial-gradient(52% 44% at 84% 100%, rgb(255 224 138 / 0.22), transparent 62%), linear-gradient(180deg, #fff7fb, #fff1f6)",
        } as SampleVariables}
      >
        <div className="relative grid h-full min-h-0 min-w-0 grid-rows-[auto_1fr_auto] gap-2.5">
          {/* ── Member banner ── */}
          <header aria-label="FRIEND CLUB DASHBOARD" className="flex items-center gap-2.5 rounded-[20px] bg-white px-2.5 py-2" style={softShadow}>
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-[var(--sample-accent)]">
              <GeneratedStyleImageSurface className="absolute inset-0 h-full w-full" overlay="none" position="42% 46%" slug="kawaii" />
            </span>
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-[var(--sample-accent)] px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.12em] text-white">CHARACTER CLUB</span>
              <p className="mt-0.5 truncate font-black lowercase leading-none" style={{ fontFamily: "var(--st-font-display)", fontSize: compact ? "12px" : "15px" }}>hi, mochi member!</p>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-2.5">
              <span className="flex items-center gap-1 text-[var(--sample-primary)]">
                <KawaiiHeart className="h-3 w-3" />
                <span className="text-[10px] font-black tabular-nums text-[var(--sample-text)]">128</span>
              </span>
              <div aria-label="character mood ring" className="flex flex-col items-center gap-0.5">
                <span className="relative grid h-8 w-8 place-items-center rounded-full" style={{ background: "conic-gradient(from -90deg, #ff9ec4, #ffe08a, #a8ecc9, #9ecbff, #ff9ec4)" }}>
                  <span className="grid h-[1.35rem] w-[1.35rem] place-items-center rounded-full bg-white text-[8px]">
                    <span className="flex items-center gap-[2px]">
                      <span className="h-[3px] w-[3px] rounded-full bg-[var(--sample-text)]" />
                      <span className="h-[3px] w-[3px] rounded-full bg-[var(--sample-text)]" />
                    </span>
                  </span>
                </span>
                {!compact && <span className="text-[6px] font-black lowercase text-[var(--sample-muted)]">mood: happy</span>}
              </div>
            </div>
          </header>

          {/* ── Mascot collection + right rail ── */}
          <div className={cn("grid min-h-0 min-w-0 gap-2.5", compact ? "grid-cols-1" : "sm:grid-cols-[1.34fr_0.66fr]")}>
            <section aria-label="mascot tiles" className="flex min-h-0 min-w-0 flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black lowercase tracking-[0.08em] text-[var(--sample-text)]">mascot tiles · your friends</span>
                <span className="rounded-full bg-[var(--sample-accent-2)] px-2 py-0.5 text-[7px] font-black lowercase text-[var(--sample-text)]">4 / 6 collected</span>
              </div>
              <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-2">
                {mascots.map(([name, pos, got]) => (
                  <div className="relative flex min-h-0 flex-col overflow-hidden rounded-[16px] bg-white p-1" style={softShadow} key={name}>
                    <div className="relative min-h-0 flex-1 overflow-hidden rounded-[12px] bg-[var(--sample-base)]">
                      <span aria-hidden="true" className="absolute inset-0">
                        <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position={pos} slug="kawaii" style={{ backgroundSize: "230%", filter: got ? "none" : "grayscale(0.7) opacity(0.55)" }} />
                      </span>
                      {got ? (
                        <span className="absolute right-1 top-1 text-[var(--sample-primary)]"><KawaiiHeart className="h-3 w-3 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]" /></span>
                      ) : (
                        <span className="absolute right-1 top-1 rounded-full bg-[var(--sample-accent-3)] px-1 text-[6px] font-black lowercase text-[var(--sample-text)]">new</span>
                      )}
                    </div>
                    <span className="truncate px-0.5 pt-0.5 text-center text-[7.5px] font-black lowercase text-[var(--sample-text)]">{name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={cn("flex min-h-0 min-w-0 flex-col gap-2.5", compact && "hidden")}>
              <div aria-label="heart badges" className="rounded-[16px] bg-white p-2.5" style={softShadow}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[8px] font-black lowercase tracking-[0.08em] text-[var(--sample-text)]">heart badges</span>
                  <span className="text-[7px] font-black tabular-nums text-[var(--sample-muted)]">12 / 20</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 text-[var(--sample-accent)]">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <span className={cn("grid aspect-square place-items-center rounded-full", index < 6 ? "bg-[rgb(255_158_196/0.18)]" : "bg-[var(--sample-base)]")} key={index}>
                      <KawaiiHeart className={cn("h-3 w-3", index < 6 ? "text-[var(--sample-primary)]" : "text-[var(--sample-border-soft)]")} filled={index < 6} />
                    </span>
                  ))}
                </div>
              </div>

              <div aria-label="stamp rewards" className="min-h-0 flex-1 rounded-[16px] bg-white p-2.5" style={softShadow}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[8px] font-black lowercase tracking-[0.08em] text-[var(--sample-text)]">stamp rewards</span>
                  <span className="rounded-full bg-[var(--sample-accent-3)] px-1.5 py-0.5 text-[7px] font-black lowercase text-[var(--sample-text)]">3 to go</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <span
                      className={cn("grid aspect-square place-items-center rounded-full text-[8px]", index < 5 ? "bg-[var(--sample-accent)] text-white" : "border-2 border-dashed border-[var(--sample-border-soft)] text-[var(--sample-border-soft)]")}
                      key={index}
                    >
                      {index < 5 ? <KawaiiHeart className="h-2.5 w-2.5" /> : <span className="text-[7px] font-black text-[var(--sample-muted)]">{index + 1}</span>}
                    </span>
                  ))}
                </div>
                <p className="mt-1.5 text-[6.5px] font-black lowercase tracking-[0.04em] text-[var(--sample-muted)]">collect 8 stamps for a tiny treat ♡</p>
              </div>
            </section>
          </div>

          {/* ── Tiny treats shop ── */}
          <div aria-label="shop tiny treats" className={cn(compact && "hidden")}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[8px] font-black lowercase tracking-[0.08em] text-[var(--sample-text)]">shop tiny treats</span>
              <span className="text-[7px] font-black lowercase text-[var(--sample-primary)]">see all →</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {treats.map(([name, price, pos]) => (
                <div className="flex items-center gap-1.5 rounded-[14px] bg-white p-1 pr-2" style={softShadow} key={name}>
                  <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-[10px] bg-[var(--sample-base)]">
                    <GeneratedStyleImageSurface className="absolute inset-0 h-full w-full" overlay="none" position={pos} slug="kawaii" style={{ backgroundSize: "240%" }} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[7.5px] font-black lowercase text-[var(--sample-text)]">{name}</span>
                    <span className="block text-[7.5px] font-black text-[var(--sample-primary)]">{price}</span>
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

function DopamineRewardLoop({ compact = false, style }: Props) {
  // "Habit streak engine": a gamified reward dashboard (Duolingo / Habitica /
  // Happy Socks energy). A big circular reward loop with orbiting habit icons,
  // an XP reward meter, color-pulse habit cards, a reward ladder and a dopamine
  // spectrum. The circular-progress dashboard skeleton keeps it distinct from
  // its neighbours kawaii (image cards) and pop-art (edition grid).
  const softShadow: CSSProperties = { boxShadow: "0 10px 24px -14px rgba(26,20,54,0.5), inset 0 1px 1px rgba(255,255,255,0.7)" };
  const orbit: Array<[string, string, string]> = [
    ["move", "#ff3d81", "left-[38%] top-[-7%]"],
    ["read", "#12d0b8", "right-[-7%] top-[26%]"],
    ["water", "#ffd23e", "right-[6%] bottom-[4%]"],
    ["focus", "#7b5cff", "left-[6%] bottom-[4%]"],
    ["sleep", "#ff7a3d", "left-[-7%] top-[26%]"],
  ];
  const pulse: Array<[string, string, number, string]> = [
    ["morning move", "12", 80, "#ff3d81"],
    ["deep focus", "6", 55, "#7b5cff"],
  ];
  const ladder: Array<[string, string, string]> = [
    ["bronze", "#ff7a3d", "claimed"],
    ["silver", "#12d0b8", "claimed"],
    ["gold", "#ffd23e", "active"],
    ["platinum", "#7b5cff", "locked"],
  ];
  const loopBg =
    "conic-gradient(from -90deg, #ff3d81 0turn, #ffd23e 0.22turn, #12d0b8 0.44turn, #7b5cff 0.66turn, rgb(26 20 54 / 0.09) 0.72turn 1turn)";

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className={cn("absolute inset-0 min-w-0 overflow-hidden text-[var(--sample-text)]", compact ? "p-3" : "p-4 sm:p-5")}
        style={{
          "--sample-accent": "#ff3d81",
          "--sample-accent-2": "#12d0b8",
          "--sample-accent-3": "#ffd23e",
          "--sample-base": "#fdfbff",
          "--sample-border": "#1a1436",
          "--sample-border-soft": "#1a14361f",
          "--sample-muted": "#6b6494",
          "--sample-primary": "#ff3d81",
          "--sample-surface": "#ffffff",
          "--sample-text": "#1a1436",
          "--st-base-rgb": "253 251 255",
          "--st-surface-rgb": "255 255 255",
          "--st-text-rgb": "26 20 54",
          "--st-primary-rgb": "255 61 129",
          "--st-accent-rgb": "255 61 129",
          "--st-accent-2-rgb": "18 208 184",
          "--st-accent-3-rgb": "255 210 62",
          "--st-border-rgb": "26 20 54",
          background:
            "radial-gradient(50% 40% at 12% 6%, rgb(255 61 129 / 0.14), transparent 60%), radial-gradient(46% 44% at 96% 10%, rgb(18 208 184 / 0.14), transparent 60%), radial-gradient(54% 46% at 88% 102%, rgb(123 92 255 / 0.14), transparent 62%), linear-gradient(180deg, #fefcff, #fbf7ff)",
        } as SampleVariables}
      >
        <div className="relative grid h-full min-h-0 min-w-0 grid-rows-[auto_1fr_auto] gap-2.5">
          {/* app bar */}
          <header className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white" style={{ background: "linear-gradient(140deg, var(--sample-accent), #7b5cff)" }}>
                <IconStar size={12} />
              </span>
              <span className="font-black uppercase tracking-[0.02em]" style={{ fontFamily: "var(--st-font-display)", fontSize: compact ? "12px" : "15px" }}>Pulse</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 rounded-full bg-[var(--sample-accent)] px-2 py-0.5 text-[9px] font-black uppercase text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-accent-3)]" /> 12 day streak
              </span>
              <span className="rounded-full bg-[var(--sample-text)] px-2 py-0.5 text-[9px] font-black uppercase text-white">lv 7</span>
            </div>
          </header>

          <div className={cn("grid min-h-0 min-w-0 gap-3", compact ? "grid-cols-[0.95fr_1.05fr]" : "sm:grid-cols-[0.92fr_1.08fr]")}>
            {/* reward loop + habit orbit */}
            <section className="relative grid min-h-0 min-w-0 place-items-center">
              <div className={cn("relative aspect-square", compact ? "w-[86%] max-w-[9rem]" : "w-[82%] max-w-[13rem]")}>
                <div aria-label="COLOR REWARD LOOP" className="absolute inset-0 rounded-full" style={{ background: loopBg }}>
                  <div className="absolute inset-[15%] grid place-items-center rounded-full bg-white text-center" style={softShadow}>
                    <div className="flex flex-col items-center leading-none">
                      <span className={cn("font-black uppercase tracking-[0.08em] text-[var(--sample-muted)]", compact ? "text-[5.5px]" : "text-[7px]")}>STREAK ENERGY ENGINE</span>
                      <span className={cn("font-black tabular-nums text-[var(--sample-text)]", compact ? "text-[1.7rem]" : "text-[2.6rem]")} style={{ fontFamily: "var(--st-font-display)" }}>12</span>
                      <span className={cn("font-black uppercase tracking-[0.14em] text-[var(--sample-primary)]", compact ? "text-[6px]" : "text-[8px]")}>day streak</span>
                    </div>
                  </div>
                </div>
                <div aria-label="habit orbit" className="pointer-events-none absolute inset-0">
                  {orbit.map(([label, color, pos]) => (
                    <span
                      className={cn("absolute grid place-items-center rounded-full text-[6px] font-black uppercase text-white", compact ? "h-7 w-7" : "h-9 w-9", pos)}
                      key={label}
                      style={{ background: `radial-gradient(circle at 34% 28%, rgba(255,255,255,0.9) 0%, ${color} 46%, color-mix(in srgb, ${color} 66%, #1a1436) 100%)`, boxShadow: `0 6px 12px -6px ${color}` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* right rail */}
            <section className="flex min-h-0 min-w-0 flex-col gap-2.5">
              <div aria-label="reward meter" className="rounded-[16px] bg-white p-2.5" style={softShadow}>
                <div className="mb-1.5 flex items-center justify-between text-[8px] font-black uppercase tracking-[0.08em]">
                  <span className="text-[var(--sample-text)]">reward meter · lv 7</span>
                  <span className="tabular-nums text-[var(--sample-muted)]">720 / 1000 xp</span>
                </div>
                <div className="relative h-2.5 overflow-hidden rounded-full bg-[var(--sample-base)]">
                  <span className="absolute inset-y-0 left-0 w-[72%] rounded-full" style={{ background: "linear-gradient(90deg, var(--sample-accent-2), var(--sample-accent))" }} />
                  <span aria-hidden="true" className="absolute left-[30%] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-white/80" />
                  <span aria-hidden="true" className="absolute left-[55%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/70" />
                </div>
              </div>

              <div aria-label="color pulse cards" className="grid min-h-0 flex-1 grid-cols-2 gap-2.5">
                {pulse.map(([name, streak, pct, color]) => (
                  <div className="relative flex min-h-0 flex-col justify-between overflow-hidden rounded-[16px] p-2.5 text-white" key={name} style={{ background: `linear-gradient(150deg, ${color}, color-mix(in srgb, ${color} 66%, #1a1436))` }}>
                    <span aria-hidden="true" className="absolute -right-3 -top-3 h-12 w-12 rounded-full bg-white/20" />
                    <div className="relative">
                      <p className="text-[9px] font-black uppercase leading-tight">{name}</p>
                      <p className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.06em] text-white/80">{streak} day streak</p>
                    </div>
                    <div className="relative mt-2">
                      <div className="h-1.5 overflow-hidden rounded-full bg-black/20">
                        <span className="block h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="mt-1 block text-right text-[7px] font-black tabular-nums">{pct}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div aria-label="reward ladder" className={cn("rounded-[16px] bg-white p-2.5", compact && "hidden")} style={softShadow}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.1em] text-[var(--sample-text)]">reward ladder</span>
                  <span className="text-[7px] font-black uppercase text-[var(--sample-muted)]">4 tiers</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {ladder.map(([tier, color, status]) => (
                    <div className={cn("flex flex-col items-center gap-1 rounded-[10px] px-1 py-1.5", status === "active" ? "bg-[var(--sample-base)]" : "")} key={tier}>
                      <span className="h-4 w-4 rounded-full" style={{ background: status === "locked" ? "rgb(26 20 54 / 0.14)" : color, boxShadow: status === "locked" ? "none" : `0 4px 8px -5px ${color}` }} />
                      <span className="truncate text-[6.5px] font-black uppercase text-[var(--sample-text)]">{tier}</span>
                      <span className={cn("text-[5.5px] font-black uppercase tracking-[0.04em]", status === "active" ? "text-[var(--sample-primary)]" : "text-[var(--sample-muted)]")}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* dopamine spectrum */}
          <div aria-label="dopamine spectrum" className={cn(compact && "hidden")}>
            <div className="mb-1 flex items-center justify-between text-[8px] font-black uppercase tracking-[0.1em]">
              <span className="text-[var(--sample-text)]">dopamine spectrum</span>
              <span className="text-[var(--sample-muted)]">today&apos;s energy · high</span>
            </div>
            <div className="relative h-3 rounded-full" style={{ background: "linear-gradient(90deg, #7b5cff, #12d0b8, #ffd23e, #ff7a3d, #ff3d81)" }}>
              <span aria-hidden="true" className="absolute left-[74%] top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[var(--sample-accent)] shadow-[0_4px_10px_-3px_rgba(26,20,54,0.6)]" />
            </div>
          </div>
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
  // "Pastel beauty editorial": a Glossier / Bubble Skincare / Starface soft-tint
  // magazine — a wide low-contrast product-photo hero above a shade story swatch
  // rail, an editorial product shelf of skin-tint cards, and a skin tint planner.
  // The image-dominant horizontal-band editorial skeleton keeps it distinct from
  // its cute/casual neighbours kitsch (dense novelty storefront), kawaii
  // (collection grid) and bubble-design (vertical can showcase).
  const cardShadow: CSSProperties = { boxShadow: "0 12px 30px -20px rgba(120,92,110,0.5), inset 0 1px 1px rgba(255,255,255,0.8)" };
  const products: Array<{ name: string; shade: string; price: string; pos: string; size: string; dot: string }> = [
    { name: "tint serum", shade: "lilac 02", price: "$32", pos: "18% 44%", size: "260%", dot: "var(--sample-accent-2)" },
    { name: "cushion tube", shade: "blush 04", price: "$24", pos: "44% 26%", size: "250%", dot: "var(--sample-accent)" },
    { name: "cloud jar", shade: "mint 01", price: "$28", pos: "84% 60%", size: "250%", dot: "var(--sample-accent-3)" },
    { name: "cream pot", shade: "peach 03", price: "$22", pos: "40% 66%", size: "250%", dot: "var(--sample-peach)" },
  ];
  const shades: Array<[string, string, string]> = [
    ["porcelain", "cool", "#f6e4e6"],
    ["blush", "neutral", "#f4b8c4"],
    ["peach", "warm", "#f6cbb4"],
    ["mauve", "rosy", "#d9b3c4"],
    ["lilac", "cool", "#c9b8e8"],
    ["mint", "fresh", "#bfe3d0"],
  ];

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className={cn("absolute inset-0 min-w-0 overflow-hidden text-[var(--sample-text)]", compact ? "p-3" : "p-4 sm:p-5")}
        style={{
          "--sample-accent": "#f4b8c4",
          "--sample-accent-2": "#c9b8e8",
          "--sample-accent-3": "#bfe3d0",
          "--sample-peach": "#f6cbb4",
          "--sample-base": "#fdf2f0",
          "--sample-border": "#6f5964",
          "--sample-border-soft": "rgba(111,89,100,0.13)",
          "--sample-muted": "#b09aa4",
          "--sample-primary": "#e39ab0",
          "--sample-surface": "#ffffff",
          "--sample-text": "#6f5964",
          "--st-base-rgb": "253 242 240",
          "--st-surface-rgb": "255 255 255",
          "--st-text-rgb": "111 89 100",
          "--st-primary-rgb": "227 154 176",
          "--st-accent-rgb": "244 184 196",
          "--st-accent-2-rgb": "201 184 232",
          "--st-accent-3-rgb": "191 227 208",
          "--st-border-rgb": "111 89 100",
          background:
            "radial-gradient(50% 40% at 6% 0%, rgb(201 184 232 / 0.2), transparent 62%), radial-gradient(46% 42% at 98% 4%, rgb(244 184 196 / 0.2), transparent 60%), radial-gradient(54% 46% at 92% 100%, rgb(191 227 208 / 0.18), transparent 64%), linear-gradient(180deg, #fef6f4, #fdf1ef)",
        } as SampleVariables}
      >
        <div className="relative grid h-full min-h-0 min-w-0 grid-rows-[auto_auto_1fr_auto] gap-2.5">
          {/* ── editorial masthead ── */}
          <header className="flex items-baseline justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[7px] font-semibold uppercase tracking-[0.28em] text-[var(--sample-muted)]">SOFT EDIT</p>
              <h4 className="font-serif text-[13px] font-medium leading-none text-[var(--sample-text)]" style={{ fontFamily: "var(--st-font-display)" }}>Tint Journal</h4>
            </div>
            <span className="shrink-0 text-[7px] font-semibold uppercase tracking-[0.16em] text-[var(--sample-muted)]">no.07 · skin-tint season</span>
          </header>

          {/* ── wide low-contrast hero ── */}
          <GeneratedStyleImageSurface className="relative min-h-[104px] overflow-hidden rounded-[20px] border border-[var(--sample-border-soft)]" overlay="none" position="50% 40%" slug="pastel-style" style={{ backgroundSize: "cover", ...cardShadow }}>
            <div className="flex h-full flex-col justify-end p-3">
              <div className="w-max max-w-[86%] rounded-[14px] bg-[rgb(255_255_255/0.7)] px-3 py-1.5 backdrop-blur-[3px]">
                <p className="text-[6.5px] font-semibold uppercase tracking-[0.2em] text-[var(--sample-muted)]">the low-contrast set</p>
                <h3 aria-label="PASTEL BEAUTY EDIT" className="font-serif font-medium leading-[0.95] text-[var(--sample-text)]" style={{ fontFamily: "var(--st-font-display)", fontSize: compact ? "17px" : "23px" }}>PASTEL BEAUTY EDIT</h3>
              </div>
            </div>
          </GeneratedStyleImageSurface>

          {/* ── shade story + editorial product shelf ── */}
          <section aria-label="editorial product shelf" className="flex min-h-0 min-w-0 flex-col gap-2">
            <div aria-label="shade story" className="flex items-center gap-2">
              <span className="shrink-0 text-[7.5px] font-semibold lowercase tracking-[0.08em] text-[var(--sample-text)]">shade story</span>
              <div className="flex min-w-0 flex-1 items-center justify-between gap-1">
                {shades.map(([name, undertone, color]) => (
                  <span className="flex min-w-0 items-center gap-1" key={name}>
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-[var(--sample-border-soft)]" style={{ background: color }} />
                    {!compact && <span className="truncate text-[6px] font-semibold lowercase text-[var(--sample-muted)]">{name} · {undertone}</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-4 gap-2">
              {products.map(({ name, shade, price, pos, size, dot }) => (
                <div className="flex min-h-0 flex-col overflow-hidden rounded-[15px] border border-[var(--sample-border-soft)] bg-white" style={cardShadow} key={name}>
                  <div className="relative min-h-0 flex-1 overflow-hidden bg-[var(--sample-base)]">
                    <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position={pos} slug="pastel-style" style={{ backgroundSize: size }} />
                    <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full ring-1 ring-[rgb(255_255_255/0.8)]" style={{ background: dot }} />
                  </div>
                  <div className="px-1.5 py-1">
                    <span className="block truncate text-[8px] font-semibold lowercase text-[var(--sample-text)]">{name}</span>
                    <div className="flex items-center justify-between">
                      <span className="truncate text-[6.5px] font-semibold lowercase text-[var(--sample-muted)]">{shade}</span>
                      <span className="text-[7.5px] font-semibold text-[var(--sample-text)]">{price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[6.5px] font-semibold lowercase tracking-[0.1em] text-[var(--sample-muted)]">airy product rows · low-contrast set</p>
          </section>

          {/* ── skin tint planner ── */}
          <div aria-label="skin tint planner" className={cn("items-center gap-2 rounded-full bg-white px-3 py-1.5", compact ? "hidden" : "flex")} style={cardShadow}>
            <span className="text-[7.5px] font-semibold lowercase tracking-[0.06em] text-[var(--sample-text)]">skin tint planner</span>
            <span className="flex items-center gap-1">
              {["cool", "neutral", "warm"].map((undertone, index) => (
                <span className={cn("rounded-full px-1.5 py-0.5 text-[6.5px] font-semibold lowercase", index === 1 ? "bg-[var(--sample-primary)] text-white" : "bg-[var(--sample-base)] text-[var(--sample-muted)]")} key={undertone}>{undertone}</span>
              ))}
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              {["dewy", "soft"].map((finish) => (
                <span className="rounded-full bg-[var(--sample-base)] px-1.5 py-0.5 text-[6.5px] font-semibold lowercase text-[var(--sample-muted)]" key={finish}>{finish}</span>
              ))}
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="text-[7px] font-semibold lowercase text-[var(--sample-muted)]">matched 06</span>
              <span className="rounded-full bg-[var(--sample-text)] px-2.5 py-1 text-[7.5px] font-semibold lowercase text-white">find my tint</span>
            </span>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function BubbleFlowCapsules({ compact = false, style }: Props) {
  // "Effervescent flavor lab": a poppi / bubly sparkling-drink product page.
  // A centre-stage glossy can with orbiting nutrition bubbles over a flavor
  // carousel and can shelf — a vertical product-showcase skeleton distinct from
  // its neighbours playful-design (card grid) and pastel-style (airy pill panel).
  const glossy = (colorVar: string): CSSProperties => ({
    background: `radial-gradient(circle at 32% 24%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 14%, ${colorVar} 48%, color-mix(in srgb, ${colorVar} 66%, #2a1440) 100%)`,
    boxShadow: `0 12px 22px -10px color-mix(in srgb, ${colorVar} 60%, transparent), inset 0 -8px 14px -8px rgba(30,10,50,0.4), inset 0 8px 14px -6px rgba(255,255,255,0.85)`,
  });
  const softShadow: CSSProperties = {
    boxShadow: "0 8px 18px -10px rgba(30,10,50,0.3), inset 0 1px 1px rgba(255,255,255,0.9)",
  };
  const flavors: Array<{ name: string; color: string; cal: string }> = [
    { name: "wild berry", color: "#ff5f8d", cal: "18" },
    { name: "citrus pop", color: "#ffc93c", cal: "16" },
    { name: "lime mint", color: "#43c98a", cal: "15" },
    { name: "grape fizz", color: "#a06cff", cal: "18" },
    { name: "aqua yuzu", color: "#2fb8c6", cal: "14" },
  ];
  const hero = flavors[0];
  const nutrition: Array<[string, string, string]> = [
    ["prebiotic", "left-[3%] top-[12%]", "#2fb8c6"],
    ["18 cal", "right-[4%] top-[8%]", "#ffc93c"],
    ["5g sugar", "left-[6%] bottom-[14%]", "#ff5f8d"],
    ["vit c", "right-[6%] bottom-[10%]", "#43c98a"],
  ];

  const renderCan = (color: string, name: string, big: boolean) => (
    <div className={cn("relative", big ? (compact ? "h-[3.5rem] w-[1.7rem]" : "h-[9.5rem] w-[4.4rem]") : "h-[3.4rem] w-[1.55rem]")}>
      {/* body */}
      <div
        className={cn("absolute inset-0 overflow-hidden", big ? (compact ? "rounded-[11px]" : "rounded-[18px]") : "rounded-[7px]")}
        style={{ background: `linear-gradient(180deg, color-mix(in srgb, ${color} 74%, #ffffff) 0%, ${color} 44%, color-mix(in srgb, ${color} 70%, #201038) 100%)` }}
      >
        <span aria-hidden="true" className="absolute inset-y-0 left-[16%] w-[14%] bg-white/55 blur-[1px]" />
        <span aria-hidden="true" className="absolute inset-y-0 right-[12%] w-[9%] bg-black/15" />
        {/* label band */}
        <span className="absolute inset-x-0 top-[33%] flex h-[34%] flex-col items-center justify-center bg-white/88">
          <span className={cn("px-0.5 text-center font-black uppercase leading-none", big ? (compact ? "text-[6px] tracking-[0.01em]" : "text-[10px] tracking-[0.02em]") : "text-[0px]")} style={{ color }}>{big ? name : ""}</span>
          {big && <span className={cn("mt-1 rounded-full", compact ? "h-0.5 w-3.5" : "h-1 w-6")} style={{ background: color }} />}
        </span>
      </div>
      {/* top rim + tab */}
      <span aria-hidden="true" className={cn("absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-[linear-gradient(180deg,#eef0f6,#a9adba)]", big ? "-top-[3px] h-[8px] w-[82%]" : "-top-[1.5px] h-[4px] w-[80%]")} />
      {big && <span aria-hidden="true" className="absolute -top-[5px] left-1/2 h-[4px] w-[26%] -translate-x-1/2 rounded-[3px] bg-[#c7cad6]" />}
      {/* bottom shadow */}
      <span aria-hidden="true" className={cn("absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-black/20 blur-[2px]", big ? "-bottom-[6px] h-[8px] w-[74%]" : "-bottom-[3px] h-[4px] w-[72%]")} />
    </div>
  );

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className={cn("absolute inset-0 min-w-0 overflow-hidden text-[var(--sample-text)]", compact ? "p-3" : "p-4 sm:p-5")}
        style={{
          "--sample-accent": "#ff5f8d",
          "--sample-accent-2": "#2fb8c6",
          "--sample-accent-3": "#ffc93c",
          "--sample-base": "#fff3ef",
          "--sample-border": "#33264d",
          "--sample-border-soft": "#33264d1f",
          "--sample-muted": "#8b7fa3",
          "--sample-primary": "#ff5f8d",
          "--sample-surface": "#ffffff",
          "--sample-text": "#33264d",
          "--st-base-rgb": "255 243 239",
          "--st-surface-rgb": "255 255 255",
          "--st-text-rgb": "51 38 77",
          "--st-primary-rgb": "255 95 141",
          "--st-accent-rgb": "255 95 141",
          "--st-accent-2-rgb": "47 184 198",
          "--st-accent-3-rgb": "255 201 60",
          "--st-border-rgb": "51 38 77",
          background:
            "radial-gradient(60% 46% at 18% 8%, rgb(255 95 141 / 0.16), transparent 60%), radial-gradient(56% 50% at 92% 14%, rgb(47 184 198 / 0.16), transparent 60%), radial-gradient(60% 50% at 74% 104%, rgb(255 201 60 / 0.18), transparent 62%), linear-gradient(180deg, #fff8f4, #fff0ef)",
        } as SampleVariables}
      >
        {/* floating background bubbles */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -left-6 top-16 h-24 w-24 rounded-full opacity-40 blur-[1px]" style={glossy("#ff5f8d")} />
          <span className="absolute right-8 top-6 h-14 w-14 rounded-full opacity-40 blur-[1px]" style={glossy("#2fb8c6")} />
          <span className="absolute bottom-24 right-1/3 h-10 w-10 rounded-full opacity-35 blur-[1px]" style={glossy("#ffc93c")} />
        </div>

        <div className="relative grid h-full min-h-0 min-w-0 grid-rows-[auto_1fr_auto] gap-2.5">
          <SampleNav
            align="center"
            bordered={false}
            brand="Pop Fizz"
            compact={compact}
            icons={[<IconStar key="star" size={compact ? 11 : 13} />]}
            links={["Flavors", "Lab", "Shop"]}
            sub="sparkling drinks co."
          />

          {/* ── Hero: centre can + orbiting nutrition bubbles ── */}
          <section aria-label="EFFERVESCENT FLAVOR LAB" className="relative grid min-h-0 min-w-0 place-items-center">
            <div aria-label="nutrition bubbles" className="pointer-events-none absolute inset-0">
              {nutrition.map(([label, pos, color]) => (
                <span
                  className={cn("absolute grid place-items-center rounded-full text-center text-[6.5px] font-black uppercase leading-[1.05] text-white", compact ? "h-9 w-9" : "h-11 w-11", pos)}
                  key={label}
                  style={glossy(color)}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2 text-center">
              <span className={cn("rounded-full bg-white px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-[var(--sample-primary)]", compact && "hidden")} style={softShadow}>
                BUBBLE FLOW
              </span>
              <h3
                className={cn("font-black uppercase leading-[0.86]", compact ? "text-[0.95rem]" : "text-[1.6rem] sm:text-[1.9rem]")}
                style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.01em" }}
              >
                EFFERVESCENT<br />FLAVOR LAB
              </h3>
              <div aria-label="inflated capsules" className="relative mt-0.5">
                {renderCan(hero.color, hero.name, true)}
              </div>
              <span className={cn("rounded-full bg-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.08em] text-[var(--sample-text)]", compact && "hidden")} style={softShadow}>
                {hero.name} · {hero.cal} cal · prebiotic soda
              </span>
            </div>
          </section>

          {/* ── Flavor carousel + can shelf ── */}
          <div className="rounded-[22px] bg-[rgb(255_255_255/0.72)] p-2.5 backdrop-blur-[2px]" style={softShadow}>
            <div className={cn("grid min-w-0 gap-3", compact ? "grid-cols-1" : "grid-cols-[1.2fr_0.8fr]")}>
              <div aria-label="flavor carousel" className="min-w-0">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)]">flavor carousel</span>
                  <span className="text-[7px] font-black uppercase tracking-[0.08em] text-[var(--sample-muted)]">inflated capsules · 5</span>
                </div>
                <div className="flex items-center justify-between gap-1.5">
                  {flavors.map((flavor, index) => (
                    <span className="relative flex flex-col items-center gap-1" key={flavor.name}>
                      <span
                        className={cn("relative rounded-full", index === 0 ? (compact ? "h-8 w-8" : "h-10 w-10") : (compact ? "h-6 w-6" : "h-8 w-8"))}
                        style={glossy(flavor.color)}
                      >
                        {index === 0 && <span aria-hidden="true" className="absolute -inset-1 rounded-full border-2 border-[var(--sample-primary)] opacity-70" />}
                      </span>
                    </span>
                  ))}
                </div>
                <div className="mt-1.5 flex items-center justify-center gap-1">
                  {flavors.map((flavor, index) => (
                    <span className={cn("h-1.5 rounded-full", index === 0 ? "w-4 bg-[var(--sample-primary)]" : "w-1.5 bg-[var(--sample-border-soft)]")} key={flavor.name} />
                  ))}
                </div>
                <div aria-label="liquid progress" className="mt-2 flex items-center gap-2">
                  <span className="shrink-0 text-[7px] font-black uppercase tracking-[0.1em] text-[var(--sample-muted)]">batch 07</span>
                  <span className="relative h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--sample-base)]">
                    <span className="absolute inset-y-0 left-0 w-[72%] rounded-full" style={{ background: "linear-gradient(90deg, var(--sample-accent-2), var(--sample-accent))" }} />
                    <span aria-hidden="true" className="absolute left-[14%] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-white/80" />
                    <span aria-hidden="true" className="absolute left-[40%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/70" />
                    <span aria-hidden="true" className="absolute left-[62%] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-white/80" />
                  </span>
                  <span className="shrink-0 text-[7px] font-black tabular-nums text-[var(--sample-primary)]">72%</span>
                </div>
              </div>

              <div aria-label="can shelf" className={cn("min-w-0", compact && "hidden")}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)]">can shelf</span>
                  <span className="rounded-full bg-[var(--sample-accent-3)] px-1.5 py-0.5 text-[7px] font-black uppercase text-[var(--sample-text)]">12-pack</span>
                </div>
                <div className="flex items-end justify-between gap-1 rounded-[14px] bg-[rgb(255_243_239/0.7)] px-2 pb-1 pt-2">
                  {flavors.map((flavor) => (
                    <div className="flex flex-col items-center gap-0.5" key={flavor.name}>
                      {renderCan(flavor.color, flavor.name, false)}
                    </div>
                  ))}
                </div>
                <div aria-hidden="true" className="mx-1 h-1 rounded-b-full bg-[var(--sample-border-soft)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function StreetwearDropEditorial({ compact = false, style }: Props) {
  // "Weekly drop store": a premium streetwear commerce page (Supreme / Kith /
  // Stussy) built from real retail components — a product wall of garment tiles
  // with prices, colourways and stock states, a release-clock countdown, a drop
  // ledger schedule, a size-run availability matrix and a lookbook strip. The
  // retail product-grid skeleton keeps it distinct from its neighbour graffiti
  // (image-hero documentation) and the other street styles.
  const cOlive = "#6f6a4e";
  const cChar = "#26262b";
  const cBone = "#e2ddd2";
  const cTan = "#b79a68";
  const products: Array<{ name: string; price: string; pos: string; dots: string[]; tag?: string; sold?: boolean }> = [
    { name: "shell parka", price: "£248", pos: "20% 42%", dots: [cOlive, cChar, "#e2231a"], tag: "new" },
    { name: "coach jacket", price: "£185", pos: "38% 44%", dots: [cBone, cChar] },
    { name: "box hoodie", price: "£158", pos: "50% 40%", dots: ["#e2231a", cBone, cOlive], tag: "1 / 1" },
    { name: "cargo pant", price: "£142", pos: "74% 56%", dots: [cTan, cChar] },
    { name: "logo tee", price: "£68", pos: "90% 74%", dots: [cBone, "#e2231a", cChar], tag: "sold out", sold: true },
    { name: "camp cap", price: "£54", pos: "89% 40%", dots: [cOlive, cTan] },
  ];
  const shown = compact ? products.slice(0, 4) : products;
  const ledger: Array<[string, string, string]> = [
    ["shell parka", "£248", "live"],
    ["coach jacket", "£185", "11:00"],
    ["box hoodie", "£158", "11:02"],
    ["logo tee", "£68", "restock"],
  ];
  const matrix: Array<[string, number[]]> = [
    ["parka", [2, 2, 1, 0]],
    ["jacket", [2, 2, 2, 2]],
    ["hoodie", [1, 0, 0, 0]],
    ["tee", [0, 0, 0, 0]],
  ];

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className={cn("absolute inset-0 min-w-0 overflow-hidden bg-[var(--sample-base)] text-[var(--sample-text)]", compact ? "p-3" : "p-4 sm:p-5")}
        style={{
          "--sample-accent": "#e2231a",
          "--sample-accent-2": "#26262b",
          "--sample-accent-3": "#cfc9bd",
          "--sample-base": "#f1f0ec",
          "--sample-border": "#16161a",
          "--sample-border-soft": "#16161a24",
          "--sample-muted": "#767469",
          "--sample-primary": "#e2231a",
          "--sample-surface": "#ffffff",
          "--sample-text": "#16161a",
          "--st-base-rgb": "241 240 236",
          "--st-surface-rgb": "255 255 255",
          "--st-text-rgb": "22 22 26",
          "--st-primary-rgb": "226 35 26",
          "--st-accent-rgb": "226 35 26",
          "--st-accent-2-rgb": "38 38 43",
          "--st-accent-3-rgb": "207 201 189",
          "--st-border-rgb": "22 22 26",
        } as SampleVariables}
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply" style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }} />

        <div className="relative grid h-full min-h-0 min-w-0 grid-rows-[auto_1fr] gap-2.5">
          {/* ── Brand bar ── */}
          <header className="flex items-center justify-between gap-2 border-b border-[var(--sample-border-soft)] pb-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="bg-[var(--sample-accent)] px-1.5 py-0.5 text-[10px] font-black uppercase leading-none tracking-[0.02em] text-white" style={{ fontFamily: "var(--st-font-display)" }}>Block</span>
              <span className="font-black uppercase tracking-[0.03em] text-[var(--sample-text)]" style={{ fontFamily: "var(--st-font-display)", fontSize: compact ? "12px" : "15px" }}>Supply</span>
              <nav className="ml-1 hidden items-center gap-3 text-[9px] font-black uppercase tracking-[0.08em] text-[var(--sample-muted)] sm:flex">
                <span className="text-[var(--sample-text)]">New</span>
                <span>Shop</span>
                <span>Lookbook</span>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1 border border-[var(--sample-border-soft)] px-1.5 py-0.5 text-[8px] font-black uppercase tabular-nums text-[var(--sample-text)] sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-accent)]" /> 02:10:45
              </span>
              <span className="relative text-[var(--sample-text)]">
                <IconBag size={compact ? 12 : 14} />
                <span className="absolute -right-1.5 -top-1 grid h-3 w-3 place-items-center rounded-full bg-[var(--sample-accent)] text-[6px] font-black text-white">3</span>
              </span>
            </div>
          </header>

          <div className={cn("grid min-h-0 min-w-0 gap-2.5", compact ? "grid-cols-1" : "sm:grid-cols-[1.62fr_0.9fr]")}>
            {/* ── Product wall + lookbook ── */}
            <div className="grid min-h-0 min-w-0 grid-rows-[1fr_auto] gap-2">
              <section aria-label="streetwear product wall" className="flex min-h-0 min-w-0 flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="shrink-0 bg-[var(--sample-accent)] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[0.1em] text-white">this week</span>
                    <span className="truncate text-[8px] font-black uppercase tracking-[0.08em] text-[var(--sample-muted)]">streetwear product wall · 24 styles</span>
                  </div>
                  <div className="hidden shrink-0 items-center gap-1 sm:flex">
                    {["all", "tops", "outerwear", "caps"].map((f, index) => (
                      <span className={cn("px-1.5 py-0.5 text-[7px] font-black uppercase tracking-[0.06em]", index === 0 ? "bg-[var(--sample-text)] text-[var(--sample-base)]" : "text-[var(--sample-muted)]")} key={f}>{f}</span>
                    ))}
                  </div>
                </div>
                <div className={cn("grid min-h-0 flex-1 gap-1.5", compact ? "grid-cols-2 grid-rows-2" : "grid-cols-3 grid-rows-2")}>
                  {shown.map((product) => (
                    <article className="relative flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[1px] border border-[var(--sample-border-soft)] bg-white" key={product.name}>
                      <div className="relative min-h-0 flex-1 overflow-hidden bg-[var(--sample-base)]">
                        <span aria-hidden="true" className="absolute inset-0">
                          <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position={product.pos} slug="streetwear" style={{ backgroundSize: "330%", filter: product.sold ? "grayscale(0.55) opacity(0.7)" : "none" }} />
                        </span>
                        {product.tag && (
                          <span className={cn("absolute left-1 top-1 px-1 py-0.5 text-[6px] font-black uppercase tracking-[0.06em]", product.tag === "sold out" ? "bg-[var(--sample-accent-3)] text-[var(--sample-text)]" : product.tag === "new" ? "bg-[var(--sample-accent)] text-white" : "bg-[var(--sample-text)] text-[var(--sample-base)]")}>
                            {product.tag}
                          </span>
                        )}
                        <div className="absolute bottom-1 left-1 flex gap-0.5">
                          {product.dots.map((dot, di) => (
                            <span className="h-1.5 w-1.5 rounded-full border border-[rgb(255_255_255/0.7)]" key={di} style={{ background: dot }} />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-1 px-1.5 py-1">
                        <span className="min-w-0 truncate text-[8px] font-black uppercase tracking-[0.03em] text-[var(--sample-text)]">{product.name}</span>
                        <span className="shrink-0 text-[8px] font-black tabular-nums text-[var(--sample-text)]">{product.price}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <div aria-label="lookbook strip" className={cn(compact && "hidden")}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)]">lookbook strip</span>
                  <span className="text-[7px] font-black uppercase tracking-[0.06em] text-[var(--sample-muted)]">fw · vol.06</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {["8% 28%", "30% 52%", "52% 34%", "70% 60%", "88% 40%"].map((pos, index) => (
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[1px] border border-[var(--sample-border-soft)]" key={pos}>
                      <span aria-hidden="true" className="absolute inset-0">
                        <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position={pos} slug="streetwear" style={{ backgroundSize: "270%" }} />
                      </span>
                      {index === 0 && <span className="absolute bottom-0.5 left-0.5 bg-[var(--sample-text)] px-1 text-[6px] font-black uppercase text-[var(--sample-base)]">01</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Sidebar: release clock, drop ledger, size matrix ── */}
            <div className={cn("flex min-h-0 min-w-0 flex-col gap-2", compact && "hidden")}>
              <div aria-label="release clock" className="border border-[var(--sample-border)] bg-[var(--sample-text)] p-2 text-[var(--sample-base)]">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent)]">drop 06 · this thu</span>
                  <span className="text-[7px] font-bold uppercase tracking-[0.06em] text-[rgb(241_240_236/0.55)]">11:00 est</span>
                </div>
                <div className="mt-1.5 grid grid-cols-4 gap-1 text-center">
                  {[["02", "days"], ["10", "hrs"], ["45", "min"], ["12", "sec"]].map(([n, u]) => (
                    <div key={u}>
                      <span className="block bg-[rgb(241_240_236/0.08)] py-1 text-[15px] font-black leading-none tabular-nums text-white">{n}</span>
                      <span className="mt-0.5 block text-[6px] font-bold uppercase tracking-[0.1em] text-[rgb(241_240_236/0.55)]">{u}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div aria-label="DROP LEDGER" className="border border-[var(--sample-border-soft)] bg-white p-2">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)]">DROP LEDGER</span>
                  <span className="bg-[var(--sample-accent-3)] px-1.5 py-0.5 text-[7px] font-black uppercase text-[var(--sample-text)]">wk 06</span>
                </div>
                <div className="grid gap-1">
                  {ledger.map(([item, price, status]) => (
                    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 border-b border-[var(--sample-border-soft)] pb-1 text-[8px] font-black uppercase" key={item}>
                      <span className="min-w-0 truncate text-[var(--sample-text)]">{item}</span>
                      <span className="tabular-nums text-[var(--sample-muted)]">{price}</span>
                      <span className={cn("px-1 py-0.5 text-[6px] leading-none", status === "live" ? "bg-[var(--sample-accent)] text-white" : status === "restock" ? "bg-[var(--sample-accent-3)] text-[var(--sample-text)]" : "border border-[var(--sample-border-soft)] text-[var(--sample-muted)]")}>{status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div aria-label="size run matrix" className="min-h-0 flex-1 border border-[var(--sample-border-soft)] bg-white p-2">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)]">size run matrix</span>
                  <span className="text-[7px] font-black uppercase text-[var(--sample-muted)]">stock</span>
                </div>
                <div className="grid grid-cols-[1fr_repeat(4,0.85rem)] items-center gap-1">
                  <span />
                  {["s", "m", "l", "xl"].map((s) => (
                    <span className="text-center text-[6px] font-black uppercase text-[var(--sample-muted)]" key={s}>{s}</span>
                  ))}
                  {matrix.map(([item, cells]) => (
                    <Fragment key={item}>
                      <span className="min-w-0 truncate text-[8px] font-black uppercase text-[var(--sample-text)]">{item}</span>
                      {cells.map((v, ci) => (
                        <span
                          className={cn("grid h-3.5 place-items-center rounded-[1px] text-[6px] font-black leading-none", v === 2 ? "bg-[var(--sample-text)] text-white" : v === 1 ? "bg-[var(--sample-accent-3)] text-[var(--sample-text)]" : "border border-[var(--sample-border-soft)] text-[rgb(22_22_26/0.35)]")}
                          key={ci}
                        >
                          {v === 0 ? "×" : ""}
                        </span>
                      ))}
                    </Fragment>
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

function GraffitiWallArchive({ compact = false, style }: Props) {
  const walls = [
    ["Chrome burner", "Berlin · Yard 04", "212", "16% 34%"],
    ["Pink fade piece", "São Paulo · Rooftop", "167", "58% 52%"],
    ["Rail line throwie", "NYC · Freight spur", "134", "88% 68%"],
  ] as const;
  const cities = [
    ["BER", "214"],
    ["NYC", "187"],
    ["SAO", "166"],
    ["LDN", "149"],
  ] as const;
  const sprayRack = [
    [style.palette.accent, "P-3020"],
    [style.palette.accent2, "B-5015"],
    [style.palette.accent3, "Y-1021"],
    ["#C7C9CE", "CHROME"],
    ["#141414", "BLACK"],
  ] as const;

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "140px 140px" }}
      />
      <div className={cn("relative grid h-full min-w-0", compact ? "grid-rows-[auto_1fr] gap-2" : "grid-rows-[auto_1fr_auto] gap-3")}>
        <SampleNav
          brand="WALLDEX"
          compact={compact}
          icons={[<IconSearch key="search" size={compact ? 11 : 13} />, <IconGlobe key="globe" size={compact ? 11 : 13} />]}
          links={["Walls", "Artists", "Cities", "Map"]}
          sub="street art documentation"
        />
        <div className={cn("grid min-h-0 min-w-0 gap-3", compact ? "grid-cols-[1.15fr_0.85fr]" : "grid-rows-[1.15fr_0.85fr] sm:grid-cols-[1.28fr_0.72fr] sm:grid-rows-none")}>
          <section className="relative min-h-0 min-w-0 overflow-hidden rounded-[2px] border-2 border-[var(--sample-border)] shadow-[0_12px_30px_rgb(0_0_0/0.32)]">
            <GeneratedStyleImageSurface className="h-full" overlay="dark" position="center 42%" slug="graffiti">
              <div className="flex h-full min-h-0 flex-col justify-between p-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="rotate-[-2deg] rounded-[2px] border-2 border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)]">
                    Graffiti wall scanner
                  </span>
                  <span className="rotate-[1.5deg] rounded-[2px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em]">
                    verified · 142 photos
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="mb-1 inline-block bg-[var(--sample-text)] px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] text-[var(--sample-base)]">
                    Berlin · legal yard 04
                  </p>
                  <h3
                    className={cn("whitespace-nowrap font-display font-black uppercase leading-[0.78] text-[var(--sample-base)]", compact ? "text-[1.7rem]" : "text-[2.6rem] sm:text-[3.9rem]")}
                    style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.06em", textShadow: "3px 3px 0 var(--sample-text), 6px 6px 0 var(--sample-accent)" }}
                  >
                    FRESH PAINT
                  </h3>
                  <div className={cn("mt-2 flex flex-wrap items-center gap-2", compact && "gap-1.5")}>
                    <span className="rounded-[2px] border-2 border-[var(--sample-border)] bg-[var(--sample-accent)] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] text-[var(--sample-surface)]">
                      Mural route map
                    </span>
                    <span className="border-2 border-[var(--sample-base)] px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] text-[var(--sample-base)]">
                      Crew tag archive · KAPS
                    </span>
                  </div>
                </div>
              </div>
            </GeneratedStyleImageSurface>
          </section>

          <section className={cn("grid min-h-0 min-w-0 grid-rows-[1fr_auto] overflow-hidden", compact ? "gap-2" : "gap-3")}>
            <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[2px] border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-2">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <p className="text-[7px] font-black uppercase leading-[1.05] tracking-[0.1em] sm:text-[8px] sm:tracking-[0.14em]">Wall tag index</p>
                <span className="bg-[var(--sample-accent)] px-1.5 py-0.5 text-[7px] font-black uppercase text-[var(--sample-surface)]">+38</span>
              </div>
              <div className="grid min-h-0 flex-1 content-start gap-1.5">
                {(compact ? walls.slice(0, 2) : walls).map(([title, place, likes, position], index) => (
                  <div className="grid min-w-0 grid-cols-[auto_1fr_auto] items-center gap-2 border-2 border-[var(--sample-border)] bg-[var(--sample-base)] p-1" key={title}>
                    <GeneratedStyleImageSurface
                      className={cn("border border-[var(--sample-border)]", compact ? "h-7 w-9" : "h-9 w-12")}
                      overlay="none"
                      position={position}
                      slug="graffiti"
                      style={{ backgroundSize: "300%" }}
                    />
                    <div className="min-w-0 leading-tight">
                      <p className="truncate text-[8px] font-black uppercase tracking-[0.04em]">{title}</p>
                      <p className="truncate text-[7px] font-bold uppercase tracking-[0.08em] text-[var(--sample-muted)]">{place}</p>
                    </div>
                    <span className={cn("shrink-0 px-1.5 py-0.5 text-[7px] font-black", index === 0 ? "bg-[var(--sample-accent-3)] text-[var(--sample-text)]" : "bg-[var(--sample-text)] text-[var(--sample-base)]")}>
                      ♥ {likes}
                    </span>
                  </div>
                ))}
              </div>
              <div className={cn("mt-1.5 flex flex-wrap items-center gap-1", compact && "hidden")}>
                {cities.map(([city, count]) => (
                  <span className="border-2 border-[var(--sample-border)] bg-[var(--sample-base)] px-1.5 py-0.5 text-[7px] font-black uppercase tracking-[0.08em]" key={city}>
                    {city} <span className="text-[var(--sample-muted)]">{count}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="min-w-0 rounded-[2px] border-2 border-[var(--sample-border)] bg-[var(--sample-text)] p-2 text-[var(--sample-base)]">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <p className="text-[7px] font-black uppercase tracking-[0.14em]">Spray color rack</p>
                <span className="text-[7px] font-black uppercase tracking-[0.1em] text-[var(--sample-accent-3)]">400ml</span>
              </div>
              <div className="grid grid-cols-5 gap-1">
                {sprayRack.map(([color, code]) => (
                  <div className="min-w-0 text-center" key={code}>
                    <span className="block h-5 border-2 border-[var(--sample-base)]" style={{ backgroundColor: color }} />
                    <span className="mt-0.5 block truncate text-[6px] font-black uppercase tracking-[0.04em]">{code}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className={cn("flex min-w-0 items-center justify-between gap-2 border-2 border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)_/_0.85)] px-2.5 py-2 text-[8px] font-black uppercase tracking-[0.1em]", compact && "hidden")}>
          <span className="truncate">12,408 walls · 3,120 writers · 96 cities</span>
          <span className="shrink-0 bg-[var(--sample-accent)] px-2 py-0.5 text-[var(--sample-surface)]">submit a wall ↗</span>
        </div>
      </div>
    </SampleFrame>
  );
}

function HipHopAlbumStudio({ compact = false, style }: Props) {
  const tracks = [
    ["01", "Intro heat", "2:14"],
    ["02", "City verse", "3:08"],
    ["03", "Low end", "2:57"],
    ["04", "Outro cuts", "1:46"],
  ] as const;
  const bars = [52, 78, 34, 90, 46, 68, 28, 82, 40, 72, 30, 88, 44, 64, 36] as const;
  const pads = [
    style.palette.primary,
    style.palette.accent,
    style.palette.accent3,
    style.palette.accent2,
    style.palette.accent3,
    style.palette.primary,
  ];
  const goldFoil: CSSProperties = {
    backgroundImage: "linear-gradient(172deg, var(--sample-accent-3) 0%, var(--sample-primary) 46%, #9a7216 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    filter: "drop-shadow(0 2px 1px rgb(0 0 0 / 0.6))",
  };

  return (
    <SampleFrame className="hiphop-sample" compact={compact} style={style}>
      <div aria-hidden="true" className="absolute inset-0">
        <GeneratedStyleImageSurface className="h-full w-full" overlay="dark" position="center" slug="hiphop-style" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: "linear-gradient(180deg, rgb(0 0 0 / 0.5), rgb(0 0 0 / 0.14) 46%, rgb(0 0 0 / 0.72))" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 3px, rgb(var(--st-base-rgb) / 0.55) 3px 4px)" }}
      />
      <div className="relative grid h-full min-w-0 grid-rows-[auto_1fr_auto] gap-2.5 text-[var(--sample-text)]">
        <div className="flex items-center justify-between gap-2 border-b border-[rgb(var(--st-accent-3-rgb)/0.4)] pb-2">
          <div className="flex min-w-0 items-baseline gap-2">
            <span
              className="font-display font-black uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--st-font-display)", color: "var(--sample-primary)", fontSize: compact ? "13px" : "17px" }}
            >
              VERSE
            </span>
            <span className="hidden text-[8px] font-black uppercase tracking-[0.18em] text-[var(--sample-muted)] sm:inline">records</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="grid place-items-center border-2 border-white bg-black px-1.5 py-0.5 text-center text-[6px] font-black uppercase leading-[1.05] tracking-[0.02em] text-white">
              <span>Parental Advisory</span>
              <span className="text-[5px] tracking-[0.12em] text-[var(--sample-muted)]">Explicit Content</span>
            </span>
            <span className="text-[var(--sample-primary)]" aria-hidden="true">
              <IconSearch size={compact ? 12 : 14} />
            </span>
          </div>
        </div>

        <div className={cn("grid min-h-0 min-w-0 gap-2.5", compact ? "grid-cols-[1.1fr_0.9fr]" : "sm:grid-cols-[1.05fr_0.95fr]")}>
          <section className="relative grid min-h-0 min-w-0 grid-rows-[auto_auto_1fr] gap-2 overflow-hidden border border-[rgb(var(--st-accent-3-rgb)/0.5)] bg-[rgb(var(--st-base-rgb)/0.68)] p-3">
            <span className="w-fit bg-[var(--sample-primary)] px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.16em] text-[var(--sample-base)]">New Album</span>
            <h3
              className={cn("font-display font-black uppercase leading-[0.82]", compact ? "text-[1.9rem]" : "text-[2.6rem] sm:text-[3.4rem]")}
              style={{ ...goldFoil, fontFamily: "var(--st-font-display)", letterSpacing: "-0.03em" }}
            >
              The Come
              <br />
              Up
            </h3>
            <div className="relative min-h-0 min-w-0 overflow-hidden border border-[rgb(var(--st-accent-3-rgb)/0.4)]">
              <div aria-hidden="true" className="absolute inset-0">
                <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position="58% 42%" slug="hiphop-style" />
              </div>
              <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgb(0 0 0 / 0.06), rgb(0 0 0 / 0.74))" }} />
              <div className="absolute inset-x-2 bottom-2 flex items-center gap-2">
                <div
                  aria-hidden="true"
                  className="h-11 w-11 shrink-0 rounded-full border border-[rgb(var(--st-accent-3-rgb)/0.7)]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, var(--sample-primary) 0 15%, #0a0a0a 15% 18%, transparent 18%), repeating-radial-gradient(circle at 50% 50%, #17110a 0 2px, #241a10 2px 4px)",
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div aria-hidden="true" className="flex items-end gap-[3px]">
                    {bars.map((height, index) => (
                      <span
                        className="flex-1"
                        key={`${height}-${index}`}
                        style={{ height: `${Math.max(5, Math.round(height / 4))}px`, backgroundColor: index % 4 === 0 ? "var(--sample-accent)" : "var(--sample-primary)" }}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-text)]">Release waveform</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid min-h-0 min-w-0 grid-rows-[auto_1fr] gap-2.5">
            <div className="min-w-0 border border-[rgb(var(--st-accent-3-rgb)/0.4)] bg-[rgb(var(--st-surface-rgb)/0.82)] p-2">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-primary)]">Tracklist index</p>
                <span className="bg-[var(--sample-primary)] px-1.5 py-0.5 text-[7px] font-black uppercase text-[var(--sample-base)]">Side A</span>
              </div>
              <div className="grid gap-1">
                {tracks.map(([num, title, time], index) => (
                  <span
                    className={cn(
                      "grid grid-cols-[auto_1fr_auto] items-center gap-2 border px-1.5 py-1 text-[8px] font-black uppercase",
                      index === 1
                        ? "border-transparent bg-[var(--sample-primary)] text-[var(--sample-base)]"
                        : "border-[rgb(var(--st-accent-3-rgb)/0.25)] text-[var(--sample-text)]",
                    )}
                    key={title}
                  >
                    <span>{num}</span>
                    <span className="min-w-0 truncate">{title}</span>
                    <span className="tabular-nums">{time}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className={cn("grid min-h-0 min-w-0 gap-2.5", compact ? "hidden" : "grid-cols-[0.92fr_1.08fr]")}>
              <div className="grid min-h-0 min-w-0 grid-rows-[auto_auto] gap-2.5">
                <div className="min-w-0 border border-[rgb(var(--st-accent-3-rgb)/0.4)] bg-[rgb(var(--st-base-rgb)/0.7)] p-2">
                  <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-primary)]">Beat grid mixer</p>
                  <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                    {pads.map((color, index) => (
                      <span className="aspect-square border border-[rgb(var(--st-base-rgb)/0.8)]" key={`${color}-${index}`} style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
                <div className="min-w-0 border border-[rgb(var(--st-accent-3-rgb)/0.4)] bg-[rgb(var(--st-surface-rgb)/0.82)] p-2">
                  <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-primary)]">Artist card stack</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    {["24", "MC", "DJ"].map((tag, index) => (
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[rgb(var(--st-accent-3-rgb)/0.6)] text-[8px] font-black"
                        key={tag}
                        style={{ backgroundColor: index === 0 ? "var(--sample-accent)" : "rgb(var(--st-base-rgb) / 0.7)", color: index === 0 ? "var(--sample-text)" : "var(--sample-primary)" }}
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="min-w-0 flex-1 truncate text-[7px] font-black uppercase tracking-[0.1em] text-[var(--sample-muted)]">feat. roster</span>
                  </div>
                </div>
              </div>
              <div className="min-w-0 border border-[rgb(var(--st-accent-3-rgb)/0.4)] bg-[rgb(var(--st-surface-rgb)/0.82)] p-2">
                <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-primary)]">Lyric annotation rail</p>
                <div className="mt-1.5 grid gap-1">
                  {["bar highlight", "context card", "reader note"].map((label, index) => (
                    <span
                      className={cn(
                        "grid grid-cols-[auto_1fr] items-center gap-2 px-1.5 py-1 text-[8px] font-black uppercase",
                        index === 0 ? "bg-[var(--sample-accent-3)] text-[var(--sample-base)]" : "bg-[rgb(var(--st-base-rgb)/0.55)] text-[var(--sample-text)]",
                      )}
                      key={label}
                    >
                      <span>{index + 1}</span>
                      <span className="min-w-0 truncate">{label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="grid grid-cols-3 gap-2 text-[8px] font-black uppercase tracking-[0.1em]">
          {[["Merch", "$38"], ["Tour", "24 dates"], ["Stream", "now"]].map(([label, value]) => (
            <span
              className="grid min-w-0 grid-cols-[1fr_auto] items-center gap-1 border border-[rgb(var(--st-accent-3-rgb)/0.4)] bg-[rgb(var(--st-base-rgb)/0.6)] px-2 py-1.5"
              key={label}
            >
              <span className="truncate text-[var(--sample-muted)]">{label}</span>
              <span className="text-[var(--sample-primary)]">{value}</span>
            </span>
          ))}
        </div>
      </div>
    </SampleFrame>
  );
}

function SkateCultureSpotBoard({ compact = false, style }: Props) {
  // "Spot clip player": a real skate-video watch page (The Berrics / Thrasher
  // clip page) built from genuine media-UI components — video player with
  // transport controls + scrubber, trick chapter line, related-clip rail, and a
  // spot-info sidebar. Concrete-grey tone and media-player skeleton keep it
  // distinct from its neighbours hiphop-style (dark album still) and punk
  // (bone-paper newsprint).
  const chapters: Array<[string, string]> = [
    ["0:00", "roll-in"],
    ["0:14", "bs 50-50"],
    ["0:41", "kickflip"],
    ["1:12", "manual"],
  ];
  const upNext: Array<[string, string, string]> = [
    ["ledger line", "0:48", "24k"],
    ["rail bump", "1:12", "8.6k"],
    ["gap ollie", "0:32", "51k"],
    ["manny pad", "0:57", "12k"],
  ];
  const conditions: Array<[string, string, boolean]> = [
    ["ledge waxed", "ready", true],
    ["ground dry", "good", true],
    ["security", "low", true],
    ["best light", "4pm", false],
    ["bust factor", "med", false],
  ];
  const setups: Array<[string, string, string]> = [
    ["blank pro", "8.25", "linear-gradient(180deg, var(--sample-accent) 0 32%, #17171b 32% 68%, var(--sample-accent) 68%)"],
    ["shop deck", "8.0", "linear-gradient(180deg, var(--sample-accent-2) 0 46%, #efe9dd 46%)"],
    ["cruiser", "8.5", "linear-gradient(180deg, #2a2a30 0 52%, var(--sample-accent) 52%)"],
    ["street", "8.38", "linear-gradient(180deg, #c39a46 0 40%, #17171b 40%)"],
  ];
  const stickers: Array<[string, Tone2]> = [
    ["shop", "ink"], ["crew", "yellow"], ["vx1000", "paper"], ["spot", "red"], ["wax", "paper"], ["diy", "yellow"],
    ["curb", "ink"], ["local", "red"], ["grip", "paper"], ["session", "yellow"], ["pool", "ink"], ["raw", "paper"],
  ];
  type Tone2 = "ink" | "yellow" | "paper" | "red";
  const stickerTone: Record<Tone2, string> = {
    ink: "bg-[#efe9dd] text-[#17171b] border-[#17171b]",
    yellow: "bg-[var(--sample-accent)] text-[#17171b] border-[#17171b]",
    paper: "bg-[#e9e5da] text-[#17171b] border-[#17171b]",
    red: "bg-[var(--sample-accent-2)] text-[#efe9dd] border-[#17171b]",
  };
  const iconStroke = compact ? 9 : 10;

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className={cn("absolute inset-0 min-w-0 overflow-hidden bg-[var(--sample-base)] text-[var(--sample-text)]", compact ? "p-3" : "p-4 sm:p-5")}
        style={{
          "--sample-accent": "#ffce17",
          "--sample-accent-2": "#e63329",
          "--sample-accent-3": "#2a2a30",
          "--sample-base": "#d6d3ca",
          "--sample-border": "#17171b",
          "--sample-border-soft": "#17171b2e",
          "--sample-muted": "#6a675e",
          "--sample-primary": "#ffce17",
          "--sample-surface": "#ecebe3",
          "--sample-text": "#17171b",
          "--st-base-rgb": "214 211 202",
          "--st-surface-rgb": "236 235 227",
          "--st-text-rgb": "23 23 27",
          "--st-primary-rgb": "255 206 23",
          "--st-accent-rgb": "255 206 23",
          "--st-accent-2-rgb": "230 51 41",
          "--st-accent-3-rgb": "42 42 48",
          "--st-border-rgb": "23 23 27",
        } as SampleVariables}
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-multiply" style={{ backgroundImage: GRAIN_URI, backgroundSize: "118px 118px" }} />

        <div className="relative grid h-full min-h-0 min-w-0 grid-rows-[auto_1fr] gap-2.5">
          {/* ── Site nav ── */}
          <header className="flex items-center justify-between gap-2 border-b border-[var(--sample-border-soft)] pb-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid h-5 w-5 shrink-0 place-items-center bg-[var(--sample-text)] text-[10px] font-black text-[var(--sample-accent)]">S</span>
              <span className="font-black uppercase tracking-[0.04em] text-[var(--sample-text)]" style={{ fontFamily: "var(--st-font-display)", fontSize: compact ? "12px" : "15px" }}>Spot TV</span>
              <nav className="ml-1 hidden items-center gap-3 text-[9px] font-black uppercase tracking-[0.08em] text-[var(--sample-muted)] sm:flex">
                <span className="text-[var(--sample-text)]">Clips</span>
                <span>Spots</span>
                <span>Decks</span>
              </nav>
            </div>
            <div className="flex items-center gap-2 text-[var(--sample-text)]">
              <IconSearch size={compact ? 12 : 13} />
              <span className="bg-[var(--sample-accent)] px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.06em] text-[var(--sample-text)]">post clip</span>
            </div>
          </header>

          <div className={cn("grid min-h-0 min-w-0 gap-2.5", compact ? "grid-cols-1" : "sm:grid-cols-[1.6fr_0.92fr]")}>
            {/* ── Main column: player + meta + clip rail ── */}
            <div className="flex min-h-0 min-w-0 flex-col gap-2">
              {/* video player */}
              <div aria-label="spot clip player" className="relative min-h-0 flex-1 overflow-hidden rounded-[3px] border border-[var(--sample-border)] bg-[#17171b]">
                <span aria-hidden="true" className="absolute inset-0">
                  <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position="50% 56%" slug="skate-culture" />
                </span>
                <span aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgb(23 23 27 / 0.42) 0%, transparent 24%, transparent 52%, rgb(23 23 27 / 0.85) 100%)" }} />
                <div className="absolute inset-x-2 top-2 flex items-start justify-between gap-2">
                  <span className="flex items-center gap-1 bg-[rgb(23_23_27/0.62)] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[0.06em] text-[#efe9dd] backdrop-blur-[2px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-accent-2)]" />
                    spot · marble ledge
                  </span>
                  <span className="border border-[rgb(239_233_221/0.5)] bg-[rgb(23_23_27/0.5)] px-1.5 py-0.5 text-[7px] font-black uppercase tracking-[0.08em] text-[var(--sample-accent)]">fisheye · vx</span>
                </div>
                <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[rgb(239_233_221/0.85)] bg-[rgb(23_23_27/0.4)] backdrop-blur-[2px]">
                  <span className="ml-0.5 h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-[#efe9dd]" />
                </span>
                {/* transport controls */}
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 px-2 py-1.5 text-[#efe9dd]">
                  <span aria-hidden="true" className="h-0 w-0 shrink-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-[#efe9dd]" />
                  <span className="shrink-0 text-[7px] font-black tabular-nums">01:12</span>
                  <div className="relative h-1 min-w-0 flex-1 rounded-full bg-[rgb(239_233_221/0.28)]">
                    <span className="absolute inset-y-0 left-0 w-[62%] rounded-full bg-[rgb(239_233_221/0.4)]" />
                    <span className="absolute inset-y-0 left-0 w-[46%] rounded-full bg-[var(--sample-accent)]" />
                    <span className="absolute left-[46%] top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--sample-accent)] shadow-[0_0_0_2px_rgb(23_23_27/0.55)]" />
                  </div>
                  <span className="shrink-0 text-[7px] font-black tabular-nums text-[rgb(239_233_221/0.6)]">02:14</span>
                  <span className="shrink-0"><GlyphIcon size={iconStroke}><path d="M4 9v6h4l5 4V5L8 9H4Z" /><path d="M16 8.5a4 4 0 0 1 0 7" /></GlyphIcon></span>
                  <span className="shrink-0 border border-[rgb(239_233_221/0.5)] px-1 text-[7px] font-black uppercase leading-tight">hd</span>
                  <span className="shrink-0"><GlyphIcon size={iconStroke}><path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5" /></GlyphIcon></span>
                </div>
              </div>

              {/* title + meta */}
              <div className={cn("flex items-start justify-between gap-2", compact && "hidden")}>
                <div className="min-w-0">
                  <h3 className="truncate font-black uppercase leading-[1.05] text-[var(--sample-text)]" style={{ fontFamily: "var(--st-font-display)", fontSize: compact ? "12px" : "15px", letterSpacing: "-0.01em" }}>Downtown Marble — Line of the Day</h3>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.04em] text-[var(--sample-muted)]">
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[var(--sample-text)] text-[6px] text-[var(--sample-accent)]">TS</span>
                    <span className="truncate text-[var(--sample-text)]">@thrash_sesh</span>
                    <span className="truncate">· 128k views · 2d</span>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-1 border border-[var(--sample-border-soft)] px-1.5 py-1 text-[8px] font-black uppercase text-[var(--sample-text)]">
                  <GlyphIcon size={iconStroke}><path d="M12 20C7 16 4 13 4 9.5A3.5 3.5 0 0 1 10 7a3.5 3.5 0 0 1 6 2.5C16 13 13 16 12 20Z" /></GlyphIcon>
                  4.2k
                </span>
              </div>

              {/* trick chapter line */}
              <div aria-label="trick line map" className={cn("rounded-[3px] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.65)] px-2 py-1.5", compact && "hidden")}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[7px] font-black uppercase tracking-[0.12em] text-[var(--sample-muted)]">trick line map</span>
                  <span className="text-[7px] font-black uppercase text-[var(--sample-accent-2)]">4 tricks · 2:14</span>
                </div>
                <div className="relative">
                  <span aria-hidden="true" className="absolute left-1 right-1 top-[5px] h-[2px] bg-[rgb(23_23_27/0.18)]" />
                  <span aria-hidden="true" className="absolute left-1 top-[5px] h-[2px] w-[46%] bg-[var(--sample-accent)]" />
                  <div className="relative flex justify-between">
                    {chapters.map(([time, name], index) => (
                      <span className="flex flex-col items-center gap-0.5" key={name}>
                        <span className={cn("h-2.5 w-2.5 rounded-full border-2 border-[var(--sample-text)]", index <= 1 ? "bg-[var(--sample-accent)]" : "bg-[var(--sample-base)]")} />
                        <span className="text-[7px] font-black uppercase leading-none text-[var(--sample-text)]">{name}</span>
                        <span className="text-[6px] font-bold tabular-nums text-[var(--sample-muted)]">{time}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* related clips */}
              <div aria-label="clip sequence rail">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[8px] font-black uppercase tracking-[0.1em] text-[var(--sample-text)]">up next</span>
                  <span className="text-[7px] font-black uppercase tracking-[0.08em] text-[var(--sample-muted)]">clip sequence rail</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {upNext.map(([title, dur, views], index) => (
                    <div className="min-w-0" key={title}>
                      <div className="relative aspect-video overflow-hidden rounded-[2px] border border-[var(--sample-border-soft)]">
                        <span aria-hidden="true" className="absolute inset-0">
                          <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position={`${(index * 29) % 100}% ${(index * 43) % 100}%`} slug="skate-culture" style={{ backgroundSize: "195%", filter: "contrast(1.05)" }} />
                        </span>
                        {index === 0 && <span className="absolute left-0.5 top-0.5 bg-[var(--sample-accent)] px-1 text-[6px] font-black uppercase text-[var(--sample-text)]">next</span>}
                        <span className="absolute bottom-0.5 right-0.5 bg-[rgb(23_23_27/0.82)] px-1 text-[6px] font-black tabular-nums text-[#efe9dd]">{dur}</span>
                      </div>
                      <p className="mt-0.5 truncate text-[7px] font-black uppercase text-[var(--sample-text)]">{title}</p>
                      <p className="truncate text-[6px] font-bold uppercase tracking-[0.04em] text-[var(--sample-muted)]">{views} views</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Sidebar: spot info, setups, stickers ── */}
            <div className={cn("flex min-h-0 min-w-0 flex-col gap-2.5", compact && "hidden")}>
              <div aria-label="SPOT CHECKLIST" className="rounded-[3px] border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.7)] p-2">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="bg-[var(--sample-text)] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-base)]">SPOT CHECKLIST</span>
                  <span className="text-[7px] font-black uppercase text-[var(--sample-accent-2)]">diy spot</span>
                </div>
                <div className="grid gap-1">
                  {conditions.map(([label, value, ok]) => (
                    <span className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b border-[var(--sample-border-soft)] pb-1 text-[8px] font-black uppercase" key={label}>
                      <span className={cn("grid h-3.5 w-3.5 place-items-center rounded-[2px] border", ok ? "border-[var(--sample-text)] bg-[var(--sample-accent)] text-[var(--sample-text)]" : "border-[var(--sample-border-soft)] text-[var(--sample-muted)]")}>
                        {ok ? <GlyphIcon size={9}><path d="M4 12l5 5L20 6" /></GlyphIcon> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                      </span>
                      <span className="min-w-0 truncate text-[var(--sample-text)]">{label}</span>
                      <span className={cn("tabular-nums", ok ? "text-[var(--sample-text)]" : "text-[var(--sample-muted)]")}>{value}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div aria-label="deck wall grid" className="rounded-[3px] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.55)] p-2">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-text)]">deck wall grid</span>
                  <span className="text-[7px] font-black uppercase text-[var(--sample-muted)]">setups</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {setups.map(([name, size, art]) => (
                    <div className="flex flex-col items-center gap-1" key={name}>
                      <span className="relative h-14 w-6 overflow-hidden rounded-full border border-[var(--sample-border)]" style={{ background: art }}>
                        <span aria-hidden="true" className="absolute inset-x-[5px] top-2 h-0.5 rounded-full bg-[rgb(23_23_27/0.45)]" />
                        <span aria-hidden="true" className="absolute inset-x-[5px] bottom-2 h-0.5 rounded-full bg-[rgb(23_23_27/0.45)]" />
                      </span>
                      <span className="text-[6px] font-black uppercase tabular-nums text-[var(--sample-muted)]">{size}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div aria-label="sticker slap index" className="relative min-h-0 flex-1 overflow-hidden rounded-[3px] border border-[var(--sample-border-soft)] bg-[#17171b] p-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent)]">sticker slap index</span>
                  <span className="text-[7px] font-black uppercase text-[rgb(239_233_221/0.45)]">12 slaps</span>
                </div>
                <div className="mt-2 flex flex-wrap content-start gap-1.5">
                  {stickers.map(([label, tone], index) => (
                    <span
                      className={cn("border px-1.5 py-1 text-[7px] font-black uppercase leading-none shadow-[1px_1px_0_rgb(0_0_0/0.35)]", stickerTone[tone])}
                      key={label}
                      style={{ transform: `rotate(${[-5, 4, -3, 6, -4, 3, -6, 2, -2, 5, -3, 4][index % 12]}deg)` }}
                    >
                      {label}
                    </span>
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

function PunkZineDispatch({ compact = false, style }: Props) {
  // "Xeroxed fanzine front page": ransom masthead + multi-column newsprint.
  // Structurally distinct from its neighbours — skate-culture (module grid) and
  // grunge (image/photo split) — this is a printed tabloid sheet in real columns.
  const reviews: Array<[string, string, string]> = [
    ["Wire Cutters — 7″", "★★★★☆", "Two chords, one riot. Fuzz mastered straight off the four-track, no apologies."],
    ["Static Youth — LP", "★★★★★", "Basement classic back on splatter wax; side B is blown-speaker gold."],
    ["Dead Signal — demo", "★★★☆☆", "Dubbed tape, hiss and all — the kind you pass hand to hand."],
  ];
  const shows: Array<[string, string, string]> = [
    ["FRI 03", "The Boiler Rm", "all ages · $5"],
    ["SAT 11", "Union Basement", "benefit · pwyc"],
    ["THU 17", "Off Broadway", "matinee · $7"],
    ["SUN 24", "The Annex", "diy · donation"],
  ];
  const patches = ["diy", "loud", "anti", "raw", "riot", "1977"];
  const mailorder: Array<[string, string]> = [
    ["No Future b/w Blank", "$4"],
    ["Static Youth — LP", "$9"],
    ["V/A basement comp", "$6"],
  ];

  const tileVariant = {
    ink: "bg-[var(--sample-text)] text-[var(--sample-base)]",
    paper: "bg-[var(--sample-base)] text-[var(--sample-text)]",
    red: "bg-[var(--sample-accent)] text-[var(--sample-base)]",
    serif: "bg-[var(--sample-base)] text-[var(--sample-text)] italic [font-family:Georgia,serif]",
    mono: "bg-[var(--sample-base)] text-[var(--sample-text)] [font-family:'Courier_New',monospace]",
  } as const;
  const ransomRows: Array<Array<Array<[string, keyof typeof tileVariant]>>> = [
    [[["D", "paper"], ["I", "ink"], ["Y", "red"]]],
    [[["O", "serif"], ["R", "paper"]], [["D", "ink"], ["I", "mono"], ["E", "paper"]]],
  ];
  const rot = [-4, 3, -2, 4, -3, 2];
  let letterIndex = 0;
  const ransomHeadline = (
    <div aria-label="ransom headline stack" className="flex flex-col gap-1.5">
      {ransomRows.map((row, ri) => (
        <div className="flex flex-wrap items-center gap-2" key={ri}>
          {row.map((word, wi) => (
            <span className="inline-flex gap-1" key={wi}>
              {word.map(([ch, variant], ci) => {
                const angle = rot[letterIndex++ % rot.length];
                return (
                  <span
                    className={cn(
                      "inline-flex items-center justify-center border-2 border-[var(--sample-text)] font-black uppercase leading-[0.7] shadow-[2px_2px_0_rgb(var(--st-text-rgb)/0.32)]",
                      compact ? "h-8 w-6 text-[1.3rem]" : "h-12 w-9 text-[1.9rem] sm:h-16 sm:w-12 sm:text-[2.7rem]",
                      tileVariant[variant],
                    )}
                    key={ci}
                    style={{ transform: `rotate(${angle}deg)`, fontFamily: variant === "serif" || variant === "mono" ? undefined : "var(--st-font-display)" }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className={cn("absolute inset-0 min-w-0 overflow-hidden bg-[var(--sample-base)] text-[var(--sample-text)]", compact ? "p-3" : "p-4 sm:p-5")}
        style={{
          "--sample-accent": "#de2818",
          "--sample-accent-2": "#d9d0bd",
          "--sample-accent-3": "#c6ee2b",
          "--sample-base": "#f2ece0",
          "--sample-border": "#141210",
          "--sample-border-soft": "#14121026",
          "--sample-muted": "#574f45",
          "--sample-primary": "#de2818",
          "--sample-surface": "#faf5ea",
          "--sample-text": "#141210",
          "--st-base-rgb": "242 236 224",
          "--st-surface-rgb": "250 245 234",
          "--st-text-rgb": "20 18 16",
          "--st-primary-rgb": "222 40 24",
          "--st-accent-rgb": "222 40 24",
          "--st-accent-2-rgb": "217 208 189",
          "--st-accent-3-rgb": "198 238 43",
          "--st-border-rgb": "20 18 16",
        } as SampleVariables}
      >
        {/* photocopied-paper texture: toner grain + faint copier streaks */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-multiply"
          style={{ backgroundImage: GRAIN_URI, backgroundSize: "130px 130px" }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(91deg, transparent 0 68px, rgb(var(--st-text-rgb) / 0.05) 68px 69px), repeating-linear-gradient(0deg, transparent 0 3px, rgb(var(--st-text-rgb) / 0.022) 3px 4px)",
          }}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 70px 10px rgb(var(--st-text-rgb) / 0.09)" }} />

        <div className="relative grid h-full min-h-0 min-w-0 grid-rows-[auto_auto_1fr_auto] gap-2">
          {/* ── Nameplate ── */}
          <div className="grid grid-cols-[auto_1fr_auto] items-end gap-2 border-b-[3px] border-[var(--sample-text)] pb-2">
            <div className="flex flex-col gap-1">
              <span className="w-max bg-[var(--sample-text)] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[0.18em] text-[var(--sample-base)]">
                ZINE DISPATCH
              </span>
              {!compact && <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[var(--sample-muted)]">riot press · vol. iv</span>}
            </div>
            <div className="min-w-0 text-center">
              <h3
                className={cn("truncate font-black uppercase leading-[0.8] text-[var(--sample-text)]", compact ? "text-[1.5rem]" : "text-[2.3rem] sm:text-[3rem]")}
                style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.03em" }}
              >
                Xerox Riot
              </h3>
              {!compact && <span className="block text-[8px] font-bold uppercase tracking-[0.32em] text-[var(--sample-muted)]">a photocopied punk fanzine</span>}
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="rotate-[-3deg] bg-[var(--sample-accent)] px-1.5 py-0.5 text-[9px] font-black uppercase text-[var(--sample-base)]">free</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--sample-muted)]">no.13</span>
            </div>
          </div>

          {/* ── Dateline rule ── */}
          <div className="flex items-center justify-between gap-2 border-y border-[var(--sample-text)] py-0.5 text-[8px] font-black uppercase tracking-[0.1em] text-[var(--sample-text)]">
            <div className="flex min-w-0 items-center gap-2 overflow-hidden">
              {["scene report", "basement shows", "diy or die", "mailorder open"].map((label, index) => (
                <span className={cn("flex items-center whitespace-nowrap", index > (compact ? 1 : 3) && "hidden")} key={label}>
                  {index > 0 && <span className="mr-2 text-[var(--sample-accent)]">/</span>}
                  {label}
                </span>
              ))}
            </div>
            <span className="whitespace-nowrap text-[var(--sample-muted)]">xerox edition</span>
          </div>

          {/* ── Newsprint columns ── */}
          <div className={cn("grid min-h-0 min-w-0", compact ? "grid-cols-[1.18fr_0.82fr]" : "grid-cols-1 sm:grid-cols-[1.26fr_1fr_0.82fr]")}>
            {/* Column 1 — lead */}
            <div className="flex min-h-0 min-w-0 flex-col gap-2 pr-3">
              <div className="flex items-center justify-between">
                <span className="bg-[var(--sample-text)] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-base)]">lead / no.13</span>
                <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-muted)]">basement report</span>
              </div>
              {ransomHeadline}
              <div className="relative min-h-0 flex-1 overflow-hidden border-2 border-[var(--sample-text)]">
                <GeneratedStyleImageSurface
                  className="h-full w-full"
                  overlay="none"
                  position="50% 28%"
                  slug="punk"
                  style={{ filter: "grayscale(1) contrast(1.32) brightness(1.05)" }}
                />
                <span
                  aria-label="photocopy noise field"
                  className="pointer-events-none absolute inset-0 opacity-50 mix-blend-multiply"
                  style={{ backgroundImage: "radial-gradient(circle, rgb(var(--st-text-rgb) / 0.85) 0 0.6px, transparent 1.1px)", backgroundSize: "4px 4px" }}
                />
                <span className="absolute left-1.5 top-1.5 -rotate-2 bg-[var(--sample-accent)] px-1.5 py-0.5 text-[7px] font-black uppercase tracking-[0.12em] text-[var(--sample-base)]">
                  from the pit
                </span>
                {/* tape corner */}
                <span aria-hidden="true" className="absolute -left-2 -top-1 h-4 w-14 -rotate-[28deg] bg-[rgb(var(--st-text-rgb)/0.18)]" />
              </div>
              <p className={cn("text-[var(--sample-text)]", compact ? "hidden" : "text-[8.5px] leading-[1.32]")} style={{ fontFamily: "var(--st-font-body)" }}>
                Nobody asked permission. Four bands, a PA held together with gaffer tape, and a room that smelled
                like the future. Inside: who is still playing basements, which labels press for cheap, and why the
                matinee always beats the club.
              </p>
            </div>

            {/* Column 2 — reviews (folds away in the compact card) */}
            <div className={cn("flex min-h-0 min-w-0 flex-col gap-2 border-[var(--sample-text)] sm:border-l sm:pl-3 sm:pr-3", compact ? "hidden" : "hidden sm:flex")}>
              <div className="flex items-baseline justify-between border-b-2 border-[var(--sample-text)] pb-1">
                <span className="relative text-[11px] font-black uppercase leading-none tracking-[0.02em]" style={{ fontFamily: "var(--st-font-display)" }}>
                  <span aria-hidden="true" className="absolute -bottom-0.5 left-0 right-0 h-2 -rotate-1 bg-[var(--sample-accent-3)]" />
                  <span className="relative">record reviews</span>
                </span>
                <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-[var(--sample-muted)]">★ = keeps</span>
              </div>
              {reviews.map(([title, rating, body]) => (
                <div className="border-b border-dashed border-[rgb(var(--st-text-rgb)/0.35)] pb-1.5" key={title}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="min-w-0 truncate text-[9px] font-black uppercase tracking-[0.02em]">{title}</span>
                    <span className="shrink-0 text-[9px] font-black tracking-tight text-[var(--sample-accent)]">{rating}</span>
                  </div>
                  <p className="mt-0.5 text-[8px] leading-[1.28] text-[var(--sample-muted)]" style={{ fontFamily: "var(--st-font-body)" }}>{body}</p>
                </div>
              ))}
              <blockquote className="mt-auto border-l-[3px] border-[var(--sample-accent)] bg-[rgb(var(--st-accent-rgb)/0.09)] px-2 py-1.5 text-[10px] font-bold italic leading-[1.2] text-[var(--sample-text)]" style={{ fontFamily: "Georgia, serif" }}>
                “If you can’t find a show, book one.”
              </blockquote>
            </div>

            {/* Column 3 — listings sidebar */}
            <div className="flex min-h-0 min-w-0 flex-col gap-2 border-l border-[var(--sample-text)] pl-3">
              <section aria-label="gig flyer rail" className="min-h-0">
                <div className="mb-1 flex items-center justify-between bg-[var(--sample-text)] px-1.5 py-0.5">
                  <span className="text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)]">upcoming shows</span>
                  <span className="text-[8px] font-black uppercase text-[var(--sample-accent-3)]">/ diy</span>
                </div>
                <ul className="divide-y divide-dashed divide-[rgb(var(--st-text-rgb)/0.32)]">
                  {shows.map(([date, venue, note], index) => (
                    <li className={cn("grid grid-cols-[auto_1fr] items-center gap-2 py-1", compact && index > 2 && "hidden")} key={venue}>
                      <span className="bg-[var(--sample-text)] px-1 py-0.5 text-center text-[8px] font-black uppercase leading-tight text-[var(--sample-base)]">{date}</span>
                      <span className="min-w-0">
                        <span className="block truncate text-[9px] font-black uppercase leading-tight">{venue}</span>
                        <span className="block truncate text-[7.5px] font-semibold uppercase tracking-[0.06em] text-[var(--sample-muted)]">{note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-label="patch badge grid" className={cn(compact && "hidden")}>
                <p className="mb-1 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-muted)]">patches · sew or trade</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {patches.map((patch, index) => (
                    <span
                      className={cn(
                        "relative grid aspect-square place-items-center rounded-full border-2 border-[var(--sample-text)] text-[7px] font-black uppercase leading-none",
                        index === 4 ? "bg-[var(--sample-accent)] text-[var(--sample-base)]" : index === 1 ? "bg-[var(--sample-accent-3)] text-[var(--sample-text)]" : "bg-[var(--sample-surface)] text-[var(--sample-text)]",
                      )}
                      key={patch}
                    >
                      <span aria-hidden="true" className="absolute inset-[3px] rounded-full border border-dashed border-current opacity-45" />
                      <span className="relative">{patch}</span>
                    </span>
                  ))}
                </div>
              </section>

              <section className={cn(compact ? "hidden" : "mt-auto")}>
                <p className="mb-1 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-muted)]">mailorder · ppd</p>
                <ul className="space-y-0.5">
                  {mailorder.map(([item, price]) => (
                    <li className="flex items-baseline justify-between gap-2 border-b border-dotted border-[rgb(var(--st-text-rgb)/0.3)] pb-0.5 text-[8px] font-bold uppercase" key={item}>
                      <span className="min-w-0 truncate" style={{ fontFamily: "var(--st-font-body)" }}>{item}</span>
                      <span className="shrink-0 text-[var(--sample-accent)]">{price}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* ── Folio ── */}
          <div className="flex items-center justify-between gap-2 border-t-2 border-[var(--sample-text)] pt-1 text-[7px] font-black uppercase tracking-[0.14em] text-[var(--sample-muted)]">
            <span className="whitespace-nowrap">p.01 · xerox edition</span>
            <span className="hidden truncate sm:inline">cut · paste · copy · staple · repeat</span>
            <span className="whitespace-nowrap">riot press © diy</span>
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function GrungeTapeArchive({ compact = false, style }: Props) {
  // Irregular torn-paper deckle for the archive photo (top + bottom edges).
  const tornEdge =
    "polygon(0% 3%, 8% 0.5%, 17% 3%, 27% 0.8%, 38% 3.4%, 50% 0.6%, 61% 3%, 72% 0.4%, 83% 3.2%, 92% 0.8%, 100% 3%, 100% 96%, 91% 99.2%, 81% 96.6%, 70% 99.2%, 58% 96.8%, 47% 99.2%, 36% 96.6%, 26% 99%, 16% 96.8%, 7% 99.2%, 0% 96%)";
  // Muted flannel plaid built from crossed low-saturation bands.
  const flannel =
    "repeating-linear-gradient(0deg, rgb(var(--st-accent-rgb) / 0.5) 0 7px, transparent 7px 15px)," +
    "repeating-linear-gradient(0deg, rgb(var(--st-accent-2-rgb) / 0.42) 0 3px, transparent 3px 22px)," +
    "repeating-linear-gradient(90deg, rgb(var(--st-accent-rgb) / 0.5) 0 7px, transparent 7px 15px)," +
    "repeating-linear-gradient(90deg, rgb(var(--st-accent-2-rgb) / 0.42) 0 3px, transparent 3px 22px)," +
    "linear-gradient(0deg, rgb(var(--st-base-rgb) / 0.92), rgb(var(--st-base-rgb) / 0.92))";

  const tracks: Array<[string, string]> = [
    ["a1", "rust in the drain"],
    ["a2", "basement daylight"],
    ["a3", "worn out again"],
  ];
  const gigLog: Array<[string, string, string]> = [
    ["11.14.91", "the vera basement", "sold out"],
    ["12.02.91", "old brewery hall", "42 heads"],
    ["01.19.92", "harbor union rm.", "cancelled"],
  ];

  return (
    <SampleFrame className="grunge-sample" compact={compact} style={style}>
      {/* ── Distressed surface stack ── */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 16% 0%, rgb(var(--st-accent-rgb) / 0.16) 0%, transparent 46%)," +
            "radial-gradient(120% 120% at 100% 100%, rgb(var(--st-accent-3-rgb) / 0.16) 0%, transparent 52%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50 mix-blend-multiply"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 3px, rgb(0 0 0 / 0.2) 3px 4px, transparent 4px 9px)" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI, backgroundSize: "110px 110px" }}
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 90px 22px rgb(0 0 0 / 0.62)" }} />

      {/* ── Left torn archive spine ── */}
      <div
        aria-label="torn archive spine"
        className="absolute bottom-4 left-0 top-4 z-20 grid w-9 place-items-center border border-[var(--sample-border)] bg-[var(--sample-text)] text-[8px] font-black uppercase tracking-[0.3em] text-[var(--sample-base)] [writing-mode:vertical-rl]"
      >
        SB-013
      </div>

      <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-3">
        {/* Masthead */}
        <SampleNav
          brand="Basement Archive"
          bordered
          className="pl-12"
          compact={compact}
          icons={[<IconSearch key="search" size={compact ? 11 : 13} />]}
          links={["Releases", "Archive", "Tapes", "Shows"]}
          sub="seattle · est. 1991"
        />

        {/* Hero */}
        <div className={cn("grid min-h-0 gap-4 pl-12", compact ? "grid-cols-[0.9fr_1.1fr] gap-3" : "grid-cols-1 sm:grid-cols-[1.04fr_0.96fr]")}>
          {/* Torn photo stack */}
          <section aria-label="torn photo stack" className={cn("relative flex flex-col rotate-[-1deg]", compact ? "min-h-[150px]" : "min-h-[210px]")}>
            <span aria-hidden="true" className="absolute inset-0 bg-[rgb(var(--st-primary-rgb)/0.14)]" style={{ clipPath: tornEdge }} />
            <div className="relative w-full flex-1 overflow-hidden" style={{ clipPath: tornEdge }}>
              <GeneratedStyleImageSurface
                className="h-full w-full"
                overlay="none"
                position="70% 60%"
                slug="grunge"
                style={{ filter: "brightness(1.32) contrast(1.04) saturate(1.05)" }}
              />
              {/* rust colour grade — tints the band photo without crushing it */}
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-55 mix-blend-soft-light"
                style={{ background: "linear-gradient(155deg, var(--sample-accent) 0%, transparent 62%)" }}
              />
              {/* legibility vignette (top for the stamp, bottom to ground the
                  panel) — also gives depth if the photo ever fails to load */}
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgb(var(--st-base-rgb) / 0.42) 0%, transparent 24%, transparent 60%, rgb(var(--st-base-rgb) / 0.6) 100%)",
                }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
                style={{ backgroundImage: GRAIN_URI, backgroundSize: "88px 88px" }}
              />
              <span className="absolute left-3 top-3 -rotate-2 border border-[var(--sample-accent)] px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-accent)]">
                DISTORTED ARCHIVE
              </span>
            </div>
            {/* stacked instant photos peeking out */}
            <span aria-hidden="true" className="absolute -bottom-1 right-2 h-14 w-11 rotate-6 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-1 shadow-[3px_3px_0_rgb(0_0_0/0.4)]">
              <span className="block h-9 bg-[rgb(var(--st-text-rgb)/0.55)]" />
            </span>
            <span aria-hidden="true" className="absolute -bottom-2 right-8 h-14 w-11 -rotate-6 border-2 border-[var(--sample-border)] bg-[var(--sample-surface)] p-1 shadow-[3px_3px_0_rgb(0_0_0/0.4)]">
              <span className="block h-9 bg-[rgb(var(--st-text-rgb)/0.4)]" />
            </span>
            {/* tape corner over the torn edge */}
            <span aria-hidden="true" className="absolute -left-1 -top-1 h-5 w-14 -rotate-[24deg] bg-[rgb(var(--st-primary-rgb)/0.3)] shadow-[0_1px_3px_rgb(0_0_0/0.4)]" />
          </section>

          {/* Headline + cassette */}
          <div className="flex min-w-0 flex-col justify-center">
            <span className="w-max -rotate-1 bg-[var(--sample-accent)] px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--sample-base)]">
              worn · out of print
            </span>
            <h3
              className={cn("mt-2 max-w-full uppercase leading-[0.82]", compact ? "text-[1.9rem]" : "text-[3.4rem]")}
              style={{ fontFamily: "var(--st-font-display)", fontWeight: "var(--st-weight-display)", letterSpacing: "var(--st-tracking)" }}
            >
              <span className="relative inline-block max-w-full">
                <span aria-hidden="true" className="absolute left-[3px] top-[3px] text-[var(--sample-accent)] opacity-70 mix-blend-multiply">
                  {style.nameEn}
                </span>
                <span className="relative block truncate text-[var(--sample-text)]">{style.nameEn}</span>
              </span>
            </h3>
            <span
              aria-hidden="true"
              className="mt-2 block h-[3px] w-2/3"
              style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--sample-accent) 0 8px, transparent 8px 13px, var(--sample-accent) 13px 17px, transparent 17px 24px)" }}
            />
            {!compact && (
              <p className="mt-3 max-w-[34ch] text-[11px] leading-5 text-[var(--sample-muted)]" style={{ fontFamily: "var(--st-font-body)" }}>
                Damaged tape reissues and basement-show ledgers — a distressed music catalogue, not a polished shop.
              </p>
            )}

            {/* Cassette */}
            <div aria-label="cassette setlist rail" className="mt-3 border border-[var(--sample-border)] bg-[rgb(var(--st-base-rgb)/0.7)] p-2.5">
              <div className="flex items-center justify-between border-b border-dashed border-[var(--sample-border)] pb-1 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-muted)]">
                <span className="text-[var(--sample-accent-3)]">side a · setlist</span>
                <span>90 min</span>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-3 rounded-[1px] bg-[rgb(0_0_0/0.35)] px-3 py-2">
                  {[0, 1].map((r) => (
                    <span key={r} aria-hidden="true" className="grunge-sample-reel relative grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--sample-muted)]">
                      <span className="absolute h-full w-[2px] bg-[var(--sample-muted)] opacity-70" />
                      <span className="absolute h-full w-[2px] bg-[var(--sample-muted)] opacity-70" style={{ transform: "rotate(60deg)" }} />
                      <span className="absolute h-full w-[2px] bg-[var(--sample-muted)] opacity-70" style={{ transform: "rotate(-60deg)" }} />
                      <span className="relative h-2 w-2 rounded-full bg-[var(--sample-accent)]" />
                    </span>
                  ))}
                </div>
                {!compact && (
                  <ol className="grid flex-1 gap-0.5 text-[9px]">
                    {tracks.map(([no, title]) => (
                      <li key={no} className="flex items-center gap-2 border-b border-dotted border-[var(--sample-border)] pb-0.5">
                        <span className="text-[var(--sample-accent-2)]">{no}</span>
                        <span className="min-w-0 truncate lowercase text-[var(--sample-muted)]">{title}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rail: gig log + flannel swatch */}
        {!compact ? (
          <div className="grid grid-cols-[1.4fr_0.6fr] gap-3 pl-12">
            <div className="border border-[var(--sample-border)] bg-[rgb(var(--st-surface-rgb)/0.5)] p-2.5">
              <div className="flex items-center justify-between border-b border-[var(--sample-border)] pb-1 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-muted)]">
                <span className="text-[var(--sample-text)]">basement gig log</span>
                <span>1991 — 1992</span>
              </div>
              <div className="mt-1.5 grid gap-1">
                {gigLog.map(([date, venue, note]) => (
                  <div key={date} className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b border-dotted border-[var(--sample-border)] pb-1 text-[9px]">
                    <span className="text-[var(--sample-accent-3)]">{date}</span>
                    <span className="min-w-0 truncate lowercase text-[var(--sample-text)]">{venue}</span>
                    <span className="uppercase text-[var(--sample-accent)]">{note}</span>
                  </div>
                ))}
              </div>
            </div>
            <div aria-label="flannel texture board" className="relative overflow-hidden border border-[var(--sample-border)]">
              <span aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: flannel }} />
              <span aria-hidden="true" className="absolute inset-0 opacity-[0.2] mix-blend-overlay" style={{ backgroundImage: GRAIN_URI, backgroundSize: "80px 80px" }} />
              <div className="relative flex h-full flex-col justify-between p-2">
                <span className="text-[8px] font-black uppercase tracking-[0.12em] text-[rgb(var(--st-primary-rgb)/0.92)]">flannel</span>
                <div className="flex gap-1">
                  {[style.palette.accent, style.palette.accent2, style.palette.accent3].map((c) => (
                    <span key={c} className="h-4 w-4 border border-[rgb(0_0_0/0.4)]" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Footer catalog ticker */}
        <div className={cn("grunge-sample-ticker relative overflow-hidden border-t border-[var(--sample-border)] text-[8px] uppercase tracking-[0.1em] text-[var(--sample-muted)]", compact ? "h-4" : "h-5")}>
          <span className="grunge-sample-ticker-inner absolute whitespace-nowrap pt-1">
            sb-013 reissue · limited cassette run · dubbed from worn masters · basement archive vol. iii · out of print · sb-013 reissue · limited cassette run · dubbed from worn masters ·
          </span>
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
        <div className="absolute inset-y-16 left-2 z-20 grid w-12 grid-rows-6 gap-1 border border-[rgb(244_240_232_/_0.55)] bg-[var(--sample-text)] p-1">
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
            <section className="relative min-h-0 min-w-0 overflow-hidden rounded-[2px] border border-[rgb(244_240_232_/_0.5)] bg-[var(--sample-text)] p-3 text-[var(--sample-base)]">
              <div aria-hidden="true" className="absolute inset-0">
                <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position="center 60%" slug="indie-sleaze" />
              </div>
              <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "linear-gradient(180deg, rgb(11 11 11 / 0.28), rgb(11 11 11 / 0.42) 42%, rgb(11 11 11 / 0.72))" }} />
              <div aria-hidden="true" className="absolute inset-0 opacity-20" style={{ backgroundImage: GRAIN_URI, backgroundSize: "72px 72px" }} />
              <div className="relative flex h-full min-h-0 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-full border border-[rgb(244_240_232_/_0.5)] bg-[rgb(11_11_11_/_0.5)] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)] backdrop-blur-[2px]">
                    FLASH PHOTO INDEX
                  </span>
                  <span className="rotate-[-2deg] rounded-[2px] border border-[var(--sample-border)] bg-[var(--sample-accent-3)] px-2 py-1 text-[8px] font-black uppercase text-[var(--sample-text)]">
                    2007 cam
                  </span>
                </div>
                <div>
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.14em]">disposable camera grid</p>
                  <h3
                    className={cn("font-display font-black uppercase leading-[0.84] text-[var(--sample-base)]", compact ? "text-[2rem]" : "text-[3.35rem] sm:text-[4.75rem]")}
                    style={{ fontFamily: "var(--st-font-display)", letterSpacing: "0em", textShadow: "3px 3px 0 rgb(11 11 11 / 0.65)" }}
                  >
                    FLASH
                    <span className="block text-[var(--sample-accent)]">FEED</span>
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {photos.map((photo, index) => (
                    <span className={cn("relative h-14 overflow-hidden rounded-[2px] border border-[rgb(244_240_232_/_0.4)] bg-[var(--sample-text)] p-1", index % 2 ? "rotate-[1.5deg]" : "rotate-[-1.5deg]")} key={photo}>
                      <GeneratedStyleImageSurface
                        className="h-full w-full"
                        overlay="none"
                        position={`${(index * 37) % 100}% ${(index * 53) % 100}%`}
                        slug="indie-sleaze"
                        style={{ backgroundSize: "260%" }}
                      />
                      <span className="absolute bottom-1 left-1 right-1 bg-[var(--sample-surface)] px-1 text-[6px] font-black uppercase text-[var(--sample-text)]">{photo}</span>
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid min-h-0 min-w-0 grid-rows-[auto_1fr] gap-3">
              <div className="grid min-h-0 min-w-0 grid-rows-[0.9fr_1.1fr] gap-3">
                <div className="min-h-0 min-w-0 rounded-[3px] border border-[rgb(11_11_11_/_0.28)] bg-[rgb(255_47_146_/_0.92)] p-2 text-[var(--sample-text)]">
                  <p className="mb-2 rounded-[2px] bg-[var(--sample-text)] px-1.5 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-base)]">club stamp rail</p>
                  <div className="grid h-[calc(100%-1.45rem)] min-h-0 grid-cols-2 gap-1.5">
                    {stamps.map((stamp, index) => (
                      <span className={cn("grid place-items-center rounded-[2px] border border-[var(--sample-border)] px-1 text-center text-[7px] font-black uppercase", index === 2 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-surface)]")} key={stamp}>
                        {stamp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="min-h-0 min-w-0 rounded-[3px] border border-[rgb(11_11_11_/_0.22)] bg-[rgb(255_255_255_/_0.95)] p-2 text-[var(--sample-text)]">
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em]">bloghaus playlist deck</p>
                  <div className="grid gap-1">
                    {tracks.map(([code, track], index) => (
                      <span className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-[2px] border border-[var(--sample-border-soft)] px-1.5 py-1 text-[7px] font-black uppercase", index === 1 ? "bg-[var(--sample-accent-2)]" : "bg-[var(--sample-base)]")} key={track}>
                        <span>{code}</span>
                        <span className="min-w-0 truncate">{track}</span>
                        <span className="h-2 w-5 bg-[var(--sample-text)]" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid min-h-0 min-w-0 grid-rows-[1.08fr_0.92fr] gap-3">
                <div className="relative min-h-0 min-w-0 overflow-hidden rounded-[3px] border border-[rgb(244_240_232_/_0.4)] bg-[var(--sample-text)] p-2">
                  <p className="relative z-10 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-3)]">mirror flash stack</p>
                  <span aria-hidden="true" className="absolute left-4 top-9 h-20 w-24 rotate-[-3deg] overflow-hidden rounded-[2px] border border-[rgb(244_240_232_/_0.55)]">
                    <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position="28% 62%" slug="indie-sleaze" style={{ backgroundSize: "220%" }} />
                  </span>
                  <span aria-hidden="true" className="absolute right-5 top-16 h-16 w-28 rotate-[3deg] overflow-hidden rounded-[2px] border border-[rgb(244_240_232_/_0.55)]">
                    <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position="72% 38%" slug="indie-sleaze" style={{ backgroundSize: "240%" }} />
                  </span>
                  <span aria-hidden="true" className="absolute bottom-3 left-6 right-6 h-1.5 rounded-full bg-[var(--sample-accent-2)] opacity-80" />
                </div>
                <div className="min-h-0 min-w-0 rounded-[3px] border border-[rgb(11_11_11_/_0.22)] bg-[rgb(244_240_232_/_0.95)] p-2 text-[var(--sample-text)]">
                  <p className="mb-2 text-[8px] font-black uppercase tracking-[0.12em]">messy outfit tags</p>
                  <div className="grid gap-1">
                    {tags.map((tag, index) => (
                      <span className={cn("min-w-0 truncate rounded-[2px] border border-[var(--sample-border-soft)] px-1.5 py-1 text-[7px] font-black uppercase", index === 0 ? "bg-[var(--sample-accent)]" : index === 2 ? "bg-[var(--sample-accent-3)]" : "bg-[var(--sample-surface)]")} key={tag}>
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
              <span className="min-w-0 truncate rounded-[2px] border border-[rgb(11_11_11_/_0.25)] bg-[rgb(255_255_255_/_0.9)] px-2 py-2 text-center" key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </SampleFrame>
  );
}

function RaveStagePulse({ compact = false, style }: Props) {
  // "Warehouse stage timetable": a Resident-Advisor / festival-app set schedule
  // built as a real time × stage matrix. Structurally distinct from its
  // neighbours indie-sleaze (image-hero split) and lo-fi (image + floating glass).
  const times = ["22", "23", "00", "01", "02", "03", "04", "05"];
  type Tone = "a" | "b" | "c" | "m";
  const toneColor: Record<Tone, string> = {
    a: "var(--sample-accent)",
    b: "var(--sample-accent-2)",
    c: "var(--sample-accent-3)",
    m: "var(--sample-muted)",
  };
  const toneRgb: Record<Tone, string> = {
    a: "var(--st-accent-rgb)",
    b: "var(--st-accent-2-rgb)",
    c: "var(--st-accent-3-rgb)",
    m: "154 160 181",
  };
  const stages: Array<{ name: string; tone: Tone; sets: Array<{ start: number; span: number; act: string; bpm: number }> }> = [
    { name: "main", tone: "a", sets: [
      { start: 1, span: 2, act: "opening", bpm: 124 },
      { start: 3, span: 3, act: "acid live", bpm: 138 },
      { start: 6, span: 3, act: "closing b2b", bpm: 146 },
    ] },
    { name: "warehouse", tone: "b", sets: [
      { start: 1, span: 3, act: "warm up", bpm: 128 },
      { start: 4, span: 2, act: "peak set", bpm: 140 },
      { start: 6, span: 3, act: "hard techno", bpm: 150 },
    ] },
    { name: "bass", tone: "c", sets: [
      { start: 2, span: 2, act: "dub room", bpm: 140 },
      { start: 4, span: 3, act: "jungle", bpm: 170 },
      { start: 7, span: 2, act: "dnb b2b", bpm: 174 },
    ] },
    { name: "chill", tone: "m", sets: [
      { start: 1, span: 4, act: "ambient", bpm: 90 },
      { start: 5, span: 4, act: "downtempo", bpm: 96 },
    ] },
  ];
  const meters = [72, 90, 58, 84, 66, 94, 60];
  const tickets: Array<[string, string, Tone]> = [
    ["general", "£25", "b"],
    ["stage a", "£40", "a"],
    ["after hours", "£15", "c"],
  ];
  const labelCol = compact ? "grid-cols-[2.4rem_1fr]" : "grid-cols-[3.4rem_1fr]";

  return (
    <SampleFrame compact={compact} style={style}>
      <div
        className={cn("absolute inset-0 min-w-0 overflow-hidden bg-[var(--sample-base)] text-[var(--sample-text)]", compact ? "p-3" : "p-4 sm:p-5")}
        style={{
          "--sample-accent": "#c8ff19",
          "--sample-accent-2": "#11d9ff",
          "--sample-accent-3": "#ff7a1a",
          "--sample-base": "#08090d",
          "--sample-border": "#f4f7ff",
          "--sample-border-soft": "#f4f7ff26",
          "--sample-muted": "#9aa0b5",
          "--sample-primary": "#c8ff19",
          "--sample-surface": "#141722",
          "--sample-text": "#f4f7ff",
          "--st-base-rgb": "8 9 13",
          "--st-surface-rgb": "20 23 34",
          "--st-text-rgb": "244 247 255",
          "--st-primary-rgb": "200 255 25",
          "--st-accent-rgb": "200 255 25",
          "--st-accent-2-rgb": "17 217 255",
          "--st-accent-3-rgb": "255 122 26",
          "--st-border-rgb": "244 247 255",
        } as SampleVariables}
      >
        {/* ambient neon haze + grain */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 44% at 50% -8%, rgb(var(--st-accent-rgb) / 0.16), transparent 60%), radial-gradient(46% 50% at 96% 104%, rgb(var(--st-accent-2-rgb) / 0.12), transparent 60%), radial-gradient(40% 46% at 4% 96%, rgb(var(--st-accent-3-rgb) / 0.1), transparent 58%)",
          }}
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-screen" style={{ backgroundImage: GRAIN_URI, backgroundSize: "104px 104px" }} />

        <div className="relative grid h-full min-h-0 min-w-0 grid-rows-[auto_1fr_auto] gap-2.5">
          {/* ── Event masthead over an atmospheric laser band ── */}
          <header aria-label="warehouse light tunnel" className="relative overflow-hidden rounded-[2px] border border-[var(--sample-border-soft)]">
            <span aria-hidden="true" className="absolute inset-0">
              <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position="50% 42%" slug="rave-style" />
            </span>
            <span aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgb(var(--st-base-rgb) / 0.86) 0%, rgb(var(--st-base-rgb) / 0.42) 46%, rgb(var(--st-base-rgb) / 0.2) 100%)" }} />
            <div className="relative flex items-center justify-between gap-2 px-2.5 py-2">
              <div className="min-w-0">
                <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-[var(--sample-accent)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-accent)] shadow-[0_0_8px_var(--sample-accent)]" />
                  pulse · warehouse
                </span>
                <h3
                  className={cn("truncate font-black uppercase leading-[0.85] text-[var(--sample-text)]", compact ? "text-[1.35rem]" : "text-[1.95rem] sm:text-[2.5rem]")}
                  style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.01em", textShadow: "0 2px 14px rgb(0 0 0 / 0.7)" }}
                >
                  Night Shift
                </h3>
                {!compact && <span className="block text-[8px] font-semibold uppercase tracking-[0.16em] text-[var(--sample-muted)]">fri · dock nine · sold out</span>}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="flex items-center gap-1 border border-[var(--sample-accent-2)] bg-[rgb(var(--st-base-rgb)/0.6)] px-1.5 py-0.5 text-[8px] font-black uppercase text-[var(--sample-accent-2)] backdrop-blur-[2px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-accent-3)] shadow-[0_0_8px_var(--sample-accent-3)]" />
                  148 bpm
                </span>
                <span className="text-[7px] font-black uppercase tracking-[0.16em] text-[var(--sample-muted)]">on air</span>
              </div>
            </div>
          </header>

          {/* ── Stage timetable ── */}
          <section aria-label="LASER STAGE MAP" className="relative flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[2px] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.55)] p-2.5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 bg-[var(--sample-accent)] px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--sample-base)]">LASER STAGE MAP</span>
                <span className="truncate text-[8px] font-black uppercase tracking-[0.12em] text-[var(--sample-muted)]">bpm lineup grid</span>
              </div>
              <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.1em] text-[var(--sample-accent-2)]">4 stages</span>
            </div>

            {/* time ruler */}
            <div className={cn("grid items-center gap-2 pb-1", labelCol)}>
              <span className="text-[7px] font-black uppercase tracking-[0.1em] text-[var(--sample-muted)]">stage</span>
              <div className="grid grid-cols-8">
                {times.map((t) => (
                  <span className="border-l border-[rgb(var(--st-text-rgb)/0.12)] pl-1 text-[7px] font-black uppercase text-[var(--sample-muted)]" key={t}>{t}</span>
                ))}
              </div>
            </div>

            {/* stage rows */}
            <div className="grid min-h-0 flex-1 gap-1.5" style={{ gridTemplateRows: `repeat(${stages.length}, minmax(0, 1fr))` }}>
              {stages.map((stage) => (
                <div className={cn("grid min-h-0 items-stretch gap-2", labelCol)} key={stage.name}>
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: toneColor[stage.tone], boxShadow: `0 0 8px ${toneColor[stage.tone]}` }} />
                    <span className="min-w-0 truncate text-[8px] font-black uppercase leading-none text-[var(--sample-text)]">{stage.name}</span>
                  </div>
                  <div className="relative grid min-h-0 grid-cols-8">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-8">
                      {times.map((t) => (
                        <span className="border-l border-[rgb(var(--st-text-rgb)/0.07)]" key={t} />
                      ))}
                    </div>
                    {stage.sets.map((s) => (
                      <span
                        className="set-block relative z-10 m-[1.5px] flex min-w-0 flex-col justify-center overflow-hidden rounded-[2px] px-1.5 py-0.5 text-[7px] font-black uppercase leading-[1.05]"
                        key={s.act}
                        style={{
                          gridColumn: `${s.start} / span ${s.span}`,
                          background: `rgb(${toneRgb[stage.tone]} / 0.16)`,
                          borderLeft: `2px solid ${toneColor[stage.tone]}`,
                          boxShadow: `0 0 12px rgb(${toneRgb[stage.tone]} / 0.2)`,
                        }}
                      >
                        <span className="min-w-0 truncate text-[var(--sample-text)]">{s.act}</span>
                        <span className="truncate" style={{ color: toneColor[stage.tone] }}>{s.bpm} bpm</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Utility row: meters · wristbands · on-air feed ── */}
          <div className={cn("grid grid-cols-[1fr_1.15fr_0.9fr] gap-2.5", compact && "hidden")}>
            <div aria-label="sound system meters" className="rounded-[2px] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.55)] p-2">
              <p className="mb-1.5 text-[7px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-2)]">sound system meters</p>
              <div className="flex h-12 gap-1">
                {meters.map((m, index) => (
                  <span className="relative h-full flex-1 overflow-hidden rounded-[1px] bg-[rgb(var(--st-text-rgb)/0.08)]" key={`${m}-${index}`}>
                    <span className="absolute inset-x-0 bottom-0 rounded-[1px]" style={{ height: `${m}%`, background: "linear-gradient(0deg, var(--sample-accent-2), var(--sample-accent))", boxShadow: "0 0 8px rgb(var(--st-accent-rgb) / 0.5)" }} />
                    <span className="absolute inset-x-0 h-[1.5px] bg-[var(--sample-text)]" style={{ bottom: `calc(${m}% - 1px)` }} />
                  </span>
                ))}
              </div>
            </div>

            <div aria-label="ticket wristband rail" className="rounded-[2px] border border-[var(--sample-border-soft)] bg-[rgb(var(--st-surface-rgb)/0.55)] p-2">
              <p className="mb-1.5 text-[7px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent)]">ticket wristband rail</p>
              <div className="grid gap-1">
                {tickets.map(([tier, price, tone]) => (
                  <span
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-1.5 rounded-[2px] bg-[rgb(var(--st-base-rgb)/0.55)] px-1.5 py-1 text-[7px] font-black uppercase"
                    key={tier}
                    style={{ borderLeft: `2px solid ${toneColor[tone]}` }}
                  >
                    <span className="h-2 w-5 rounded-full" style={{ background: `rgb(${toneRgb[tone]} / 0.85)` }} />
                    <span className="min-w-0 truncate text-[var(--sample-text)]">{tier}</span>
                    <span style={{ color: toneColor[tone] }}>{price}</span>
                  </span>
                ))}
              </div>
            </div>

            <div aria-label="on air feed" className="relative overflow-hidden rounded-[2px] border border-[var(--sample-border-soft)]">
              <span aria-hidden="true" className="absolute inset-0">
                <GeneratedStyleImageSurface className="h-full w-full" overlay="none" position="34% 58%" slug="rave-style" style={{ filter: "saturate(1.1) contrast(1.05)" }} />
              </span>
              <span aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgb(var(--st-base-rgb) / 0.14), rgb(var(--st-base-rgb) / 0.8))" }} />
              <div className="relative flex h-full flex-col justify-between p-2">
                <span className="flex w-max items-center gap-1 rounded-[1px] bg-[rgb(var(--st-base-rgb)/0.6)] px-1.5 py-0.5 text-[7px] font-black uppercase text-[var(--sample-accent-3)] backdrop-blur-[2px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--sample-accent-3)] shadow-[0_0_8px_var(--sample-accent-3)]" />
                  on air
                </span>
                <div className="flex items-end justify-between gap-2">
                  <span className="text-[8px] font-black uppercase leading-none text-[var(--sample-text)]">main stage</span>
                  <span className="flex h-4 items-end gap-[2px]">
                    {[60, 90, 45, 78, 55].map((h, index) => (
                      <span className="w-[3px] rounded-[1px] bg-[var(--sample-accent-2)]" key={index} style={{ height: `${h}%`, boxShadow: "0 0 6px var(--sample-accent-2)" }} />
                    ))}
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
        <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/generated/lofi-listening-room.png')" }} />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(58% 46% at 24% 40%, rgb(216 182 106 / 0.24), transparent 62%), linear-gradient(180deg, rgb(32 27 22 / 0.34), rgb(32 27 22 / 0.08) 38%, rgb(32 27 22 / 0.62) 78%, rgb(32 27 22 / 0.86))" }}
        />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: GRAIN_URI, backgroundSize: "96px 96px" }} />
        <div className={cn("relative grid h-full min-w-0 grid-rows-[auto_1fr_auto] text-[var(--sample-surface)]", compact ? "gap-1.5 p-2.5" : "gap-2 p-3 sm:p-4")}>
          <div className="flex items-start justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(247_237_215_/_0.5)] bg-[rgb(32_27_22_/_0.55)] px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] backdrop-blur-[2px]">
              <span className="h-2 w-2 rounded-full bg-[var(--sample-accent-2)]" />
              LO-FI LOOP DESK
            </span>
            <span className={cn("rotate-[2deg] rounded-[2px] border border-[rgb(41_35_29_/_0.5)] bg-[var(--sample-base)] text-[var(--sample-text)] shadow-[0_6px_16px_rgb(0_0_0/0.25)]", compact ? "max-w-[5.5rem] p-1.5" : "max-w-[9rem] p-2")}>
              <p className="text-[7px] font-black uppercase tracking-[0.1em] sm:text-[8px]">paper note texture</p>
              <p className={cn("mt-1 text-[7px] font-bold uppercase leading-snug text-[var(--sample-muted)]", compact && "hidden")}>rain hiss / low pass / until 2am</p>
            </span>
          </div>

          <div className="grid min-h-0 min-w-0 grid-cols-[1fr_auto] items-end gap-3">
            <div className="min-w-0">
              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[var(--sample-accent-3)]" style={{ textShadow: "0 1px 3px rgb(0 0 0 / 0.6)" }}>lo-fi radio · 64 bpm</p>
              <h3
                className={cn("font-display font-black uppercase leading-[0.82]", compact ? "text-[2.1rem]" : "text-[3.2rem] sm:text-[4.6rem]")}
                style={{ fontFamily: "var(--st-font-display)", letterSpacing: "-0.01em", textShadow: "0 3px 14px rgb(0 0 0 / 0.6)" }}
              >
                SOFT
                <span className="block text-[var(--sample-accent-2)]">LOOP</span>
              </h3>
            </div>
            <div className={cn("grid w-[9.5rem] gap-2", compact && "hidden")}>
              <div className="rounded-[3px] border border-[rgb(247_237_215_/_0.4)] bg-[rgb(32_27_22_/_0.56)] p-2 backdrop-blur-[2px]">
                <p className="mb-1.5 text-[7px] font-black uppercase tracking-[0.12em]">dusty sampler pads</p>
                <div className="grid grid-cols-4 gap-1">
                  {pads.map((pad, index) => (
                    <span className={cn("aspect-square rounded-[2px] border border-[rgb(247_237_215_/_0.4)]", index === 2 ? "bg-[var(--sample-accent-3)]" : index === 5 ? "bg-[var(--sample-accent)]" : "bg-[rgb(247_237_215_/_0.16)]")} key={pad} />
                  ))}
                </div>
              </div>
              <div className="rounded-[3px] border border-[rgb(247_237_215_/_0.4)] bg-[rgb(32_27_22_/_0.56)] p-2 backdrop-blur-[2px]">
                <p className="mb-1.5 text-[7px] font-black uppercase tracking-[0.12em]">bedroom radio queue</p>
                <div className="grid gap-1">
                  {queue.map(([time, track], index) => (
                    <span className={cn("grid grid-cols-[auto_1fr] gap-1.5 px-1 py-0.5 text-[7px] font-black uppercase", index === 2 ? "bg-[rgb(216_182_106_/_0.34)]" : "")} key={track}>
                      <span className="text-[var(--sample-accent-3)]">{time}</span>
                      <span className="min-w-0 truncate">{track}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lofi-os-mixer grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-[4px] border border-[rgb(247_237_215_/_0.45)] bg-[rgb(32_27_22_/_0.64)] px-2.5 py-2 backdrop-blur-[3px] sm:gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-6 w-6 aspect-square rounded-full border-[3px] border-[var(--sample-surface)] bg-[radial-gradient(circle,var(--sample-accent-3)_0_28%,transparent_30%)]" />
              <span className="h-6 w-6 aspect-square rounded-full border-[3px] border-[var(--sample-surface)] bg-[radial-gradient(circle,var(--sample-accent)_0_28%,transparent_30%)]" />
            </div>
            <div className="min-w-0">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-[7px] font-black uppercase tracking-[0.12em] text-[var(--sample-accent-3)]">cassette progress rail</p>
                <span className="h-1.5 w-24 max-w-[42%] rounded-full bg-[linear-gradient(90deg,var(--sample-accent)_0_58%,rgb(247_237_215_/_0.22)_58%_100%)]" />
              </div>
              <div className="grid h-5 grid-cols-12 items-end gap-1 sm:h-6">
                {waves.map((height, index) => (
                  <span className="block rounded-[1px] bg-[var(--sample-accent-2)]" style={{ height: `${Math.max(18, height)}%` }} key={`lofi-wave-${height}-${index}`} />
                ))}
              </div>
            </div>
            <span className="shrink-0 border border-[var(--sample-surface)] bg-[var(--sample-accent)] px-2 py-1 text-[7px] font-black uppercase text-[var(--sample-surface)]">play</span>
          </div>
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
    return <HipHopAlbumStudio {...props} />;
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

  if (style.slug === "typography-focused") {
    return <TypographyFocusedSpecimen {...props} />;
  }

  if (style.slug === "editorial-design") {
    return <EditorialLongformIndex {...props} />;
  }

  if (style.slug === "magazine-style") {
    return <MagazineIssueBrowser {...props} />;
  }

  if (style.slug === "posterism") {
    return <PosterismPasteupWall {...props} />;
  }

  if (style.slug === "grid-system") {
    return <GridSystemManual {...props} />;
  }

  if (style.slug === "collage") {
    return <CollageLayerDesk {...props} />;
  }

  if (style.slug === "photomontage") {
    return <PhotomontageCampaign {...props} />;
  }

  if (style.slug === "experimental-type") {
    return <ExperimentalTypeLab {...props} />;
  }

  if (style.slug === "newspaper-style") {
    return <NewspaperEditionGrid {...props} />;
  }

  if (style.slug === "flat-design") {
    return <FlatDesignControlBoard {...props} />;
  }

  if (style.slug === "material-design") {
    return <MaterialDesignStateSheet {...props} />;
  }

  if (style.slug === "neumorphism") {
    return <NeumorphismSoftPanel {...props} />;
  }

  if (style.slug === "glassmorphism") {
    return <GlassmorphismDepthDesk {...props} />;
  }

  if (style.slug === "claymorphism") {
    return <ClaymorphismAppWorkshop {...props} />;
  }

  if (style.slug === "dark-mode-design") {
    return <DarkModeOpsConsole {...props} />;
  }

  if (style.slug === "saas-style") {
    return <SaasStyleOperationsHome {...props} />;
  }

  if (style.slug === "startup-landing-page") {
    return <StartupLandingStory {...props} />;
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
