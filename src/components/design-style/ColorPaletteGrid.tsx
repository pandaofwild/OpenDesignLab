import type { DesignStylePalette } from "@/data/designStyles";
import { cn } from "@/lib/utils";

const paletteEntries: Array<[keyof DesignStylePalette, string]> = [
  ["base", "Base"],
  ["surface", "Surface"],
  ["text", "Text"],
  ["primary", "Primary"],
  ["accent", "Accent"],
  ["accent2", "Accent 2"],
  ["accent3", "Accent 3"],
  ["border", "Border"],
];

export function ColorPaletteGrid({
  compact = false,
  palette,
}: {
  compact?: boolean;
  palette: DesignStylePalette;
}) {
  return (
    <div className={cn("grid", compact ? "grid-cols-[repeat(8,13px)] gap-1" : "grid-cols-4 gap-1.5")}>
      {paletteEntries.map(([key, label]) => (
        <span
          aria-label={`${label} ${palette[key]}`}
          className={cn(
            "border border-[var(--specimen-line-soft)]",
            compact ? "aspect-square min-w-0" : "h-8",
          )}
          key={key}
          style={{ backgroundColor: palette[key] }}
          title={`${label}: ${palette[key]}`}
        />
      ))}
    </div>
  );
}
