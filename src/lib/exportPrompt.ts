import type { DesignStyle } from "@/data/designStyles";
import type { WebLayout } from "@/data/webLayouts";

function formatName(primary: string, secondary: string) {
  return primary === secondary ? primary : `${primary} (${secondary})`;
}

export function exportDesignPrompt(style: DesignStyle, layout: WebLayout) {
  const tokens = style.tokens;

  return [
    `Create a high-quality webpage design reference for ${formatName(style.nameKo, style.nameEn)} using a ${layout.nameKo}.`,
    `Visual style: ${style.summary}`,
    `Layout structure: ${layout.summary}`,
    `Preview type: ${layout.previewType}.`,
    `Color system: base ${tokens.color.base}, surface ${tokens.color.surface}, text ${tokens.color.text}, primary ${tokens.color.primary}, accent ${tokens.color.accent}.`,
    `Typography: display font ${tokens.typography.displayFont}, body font ${tokens.typography.bodyFont}, display weight ${tokens.typography.weightDisplay}, tracking ${tokens.typography.tracking}.`,
    `Shape and spacing: radius ${tokens.shape.radius}, border ${tokens.shape.borderWidth} ${tokens.shape.borderStyle}, density ${tokens.space.density}, gap ${tokens.space.gap}.`,
    `Decoration: shadow ${tokens.decoration.shadow}, effect ${tokens.decoration.effect}.`,
    `Use cases: ${style.useCases.join(", ")}.`,
    `Avoid: ${style.cautions.join(", ")}.`,
    "Return a polished webpage composition, no logo, no watermark, production-ready visual hierarchy.",
  ].join("\n");
}

export function exportLayoutPrompt(layout: WebLayout) {
  return [
    `Create a production-ready webpage using a ${formatName(layout.nameKo, layout.nameEn)}.`,
    `Layout summary: ${layout.summary}`,
    `Preview type: ${layout.previewType}.`,
    `Structure: ${layout.structure.join(", ")}.`,
    `Responsive behavior: ${layout.responsiveBehavior.join(", ")}.`,
    `Best for: ${layout.bestFor.join(", ")}.`,
    `Avoid: ${layout.notGoodFor.join(", ")}.`,
    "Keep the hierarchy clear, responsive, accessible, and suitable for a design dictionary reference.",
  ].join("\n");
}
