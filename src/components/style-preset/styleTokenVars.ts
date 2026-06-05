import type { CSSProperties } from "react";
import type { DesignStyle } from "@/data/designStyles";

function hexToRgb(hex: string): string {
  const normalized = hex.replace("#", "");
  const full = normalized.length === 3
    ? normalized.split("").map((c) => c + c).join("")
    : normalized;
  const value = Number.parseInt(full, 16);
  if (Number.isNaN(value)) return "30 30 30";
  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
}

export function styleTokenVars(style: DesignStyle): CSSProperties {
  const { color, typography, shape, space, decoration, layout } = style.tokens;
  return {
    // Color tokens
    "--st-base": color.base,
    "--st-surface": color.surface,
    "--st-text": color.text,
    "--st-muted": color.muted,
    "--st-primary": color.primary,
    "--st-accent": color.accent,
    "--st-accent-2": color.accent2,
    "--st-accent-3": color.accent3,
    "--st-border": color.border,
    // Color RGB (for rgb(var(--st-accent-rgb) / 0.5) usage)
    "--st-base-rgb": hexToRgb(color.base),
    "--st-surface-rgb": hexToRgb(color.surface),
    "--st-text-rgb": hexToRgb(color.text),
    "--st-primary-rgb": hexToRgb(color.primary),
    "--st-accent-rgb": hexToRgb(color.accent),
    "--st-accent-2-rgb": hexToRgb(color.accent2),
    "--st-accent-3-rgb": hexToRgb(color.accent3),
    "--st-border-rgb": hexToRgb(color.border),
    // Typography tokens
    "--st-font-display": typography.displayFont,
    "--st-font-body": typography.bodyFont,
    "--st-weight-display": String(typography.weightDisplay),
    "--st-weight-body": String(typography.weightBody),
    "--st-tracking": typography.tracking,
    "--st-heading-scale": String(typography.headingScale),
    // Shape tokens
    "--st-radius": shape.radius,
    "--st-radius-pill": shape.radiusPill,
    "--st-border-width": shape.borderWidth,
    "--st-border-style": shape.borderStyle,
    // Space tokens
    "--st-gap": space.gap,
    "--st-pad-scale": String(space.padScale),
    // Decoration token
    "--st-shadow": decoration.shadow,
    // Layout tokens
    "--st-hero-variant": layout.heroVariant,
    "--st-nav-style": layout.navStyle,
    "--st-alignment": layout.alignment,
  } as CSSProperties;
}
