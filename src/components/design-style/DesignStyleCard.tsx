"use client";

import type { DesignStyle } from "@/data/designStyles";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/useLocale";
import { cn } from "@/lib/utils";
import { ColorPaletteGrid } from "@/components/design-style/ColorPaletteGrid";
import { DesignStyleSampleRenderer } from "@/components/design-style/DesignStyleSampleRenderer";
import { designStyleForLocale } from "@/lib/localizedContent";

type Props = {
  isSelected: boolean;
  onSelect: (slug: string) => void;
  style: DesignStyle;
};

export function DesignStyleCard({ isSelected, onSelect, style }: Props) {
  const locale = useLocale();
  const localizedStyle = designStyleForLocale(style, locale);

  return (
    <article
      className={cn(
        "group flex h-full min-w-0 flex-col border p-2 transition",
        isSelected
          ? "border-[var(--specimen-ink)] bg-[var(--specimen-ink)] text-[var(--specimen-paper)]"
          : "border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] text-[var(--specimen-ink)] hover:border-[var(--specimen-ink)]",
      )}
    >
      <div className="aspect-[4/3] min-h-[220px] min-w-0 overflow-hidden border border-[var(--specimen-line-soft)] bg-[rgb(234_230_220_/_0.58)]">
        <DesignStyleSampleRenderer compact style={localizedStyle} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-3 pt-4">
        <div>
          <p className={cn("raw-label", isSelected ? "text-[var(--specimen-signal)]" : "text-[var(--specimen-ink-55)]")}>
            {localizedStyle.category}
          </p>
          <h2
            className={cn(
              "mt-2 font-mono text-sm font-bold uppercase tracking-[0.15em] transition group-hover:text-[var(--specimen-signal)]",
              isSelected ? "text-[var(--specimen-paper)]" : "text-[var(--specimen-ink)]",
            )}
          >
            {localizedStyle.nameKo}
          </h2>
          {localizedStyle.nameEn !== localizedStyle.nameKo ? (
            <p className={cn("mt-1 text-sm font-medium", isSelected ? "text-[rgb(242_239_232_/_0.62)]" : "text-[var(--specimen-ink-55)]")}>
              {localizedStyle.nameEn}
            </p>
          ) : null}
          <p className={cn("mt-3 line-clamp-2 text-sm leading-6", isSelected ? "text-[rgb(242_239_232_/_0.72)]" : "text-[rgb(24_22_15_/_0.68)]")}>
            {localizedStyle.summary}
          </p>
        </div>

        <ColorPaletteGrid compact palette={style.palette} />

        <div className="mt-auto flex flex-wrap gap-1.5">
          {style.tags.slice(0, 4).map((tag) => (
            <span
              className={cn(
                "max-w-full break-all border px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em]",
                isSelected
                  ? "border-[rgb(242_239_232_/_0.18)] bg-transparent text-[rgb(242_239_232_/_0.70)]"
                  : "border-[var(--specimen-line-soft)] bg-transparent text-[var(--specimen-ink-55)]",
              )}
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            className={cn(
              "specimen-button specimen-button-md w-full",
              isSelected
                ? "border-[var(--specimen-paper)] bg-[var(--specimen-paper)] text-[var(--specimen-ink)] hover:bg-[var(--specimen-paper)] hover:text-[var(--specimen-ink)]"
                : "specimen-button-primary",
            )}
            onClick={() => onSelect(style.slug)}
            type="button"
          >
            {isSelected
              ? locale === "ko" ? "적용됨" : "Applied"
              : locale === "ko" ? "적용" : "Apply"}
          </button>
          <LocalizedLink
            className={cn(
              "specimen-button specimen-button-md w-full",
              isSelected
                ? "border-[rgb(242_239_232_/_0.30)] text-[var(--specimen-paper)] hover:bg-[var(--specimen-paper)] hover:text-[var(--specimen-ink)]"
                : "specimen-button-secondary",
            )}
            href={`/styles/${style.slug}`}
          >
            {locale === "ko" ? "자세히" : "Details"}
          </LocalizedLink>
        </div>
      </div>
    </article>
  );
}
