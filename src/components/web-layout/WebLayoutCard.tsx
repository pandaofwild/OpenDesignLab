"use client";

import type { WebLayout } from "@/data/webLayouts";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/useLocale";
import { Badge } from "@/components/ui/badge";
import { WireframeThumbnail } from "@/components/web-layout/WireframeThumbnail";
import { layoutForLocale } from "@/lib/localizedContent";
import { cn, complexityTone, formatComplexity } from "@/lib/utils";

type WebLayoutCardProps = {
  layout: WebLayout;
  compact?: boolean;
};

export function WebLayoutCard({ layout, compact = false }: WebLayoutCardProps) {
  const locale = useLocale();
  const localizedLayout = layoutForLocale(layout, locale);

  return (
    <article className="group flex h-full flex-col border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.70)] p-3 transition hover:border-[var(--specimen-ink)]">
      <div
        className={cn(
          "overflow-hidden border border-[var(--specimen-line-soft)] bg-[rgb(234_230_220_/_0.58)] p-2",
          compact ? "aspect-[16/10]" : "aspect-[4/3]",
        )}
      >
        <div className="h-full bg-[var(--specimen-paper)] p-2 transition duration-500 ease-out group-hover:scale-[1.015]">
          <WireframeThumbnail layout={localizedLayout} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 pt-4">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge>{localizedLayout.category}</Badge>
            <Badge className={cn("border", complexityTone(layout.complexity))}>
              {formatComplexity(layout.complexity, locale)}
            </Badge>
          </div>
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-[var(--specimen-ink)] transition group-hover:text-[var(--specimen-signal)]">
              {localizedLayout.nameKo}
            </h2>
            {localizedLayout.nameEn !== localizedLayout.nameKo ? (
              <p className="mt-1 text-sm font-medium text-[var(--specimen-ink-55)]">
                {localizedLayout.nameEn}
              </p>
            ) : null}
          </div>
          <p
            className={cn(
              "text-sm leading-6 text-[var(--specimen-ink-55)]",
              compact ? "line-clamp-2" : "line-clamp-3",
            )}
          >
            {localizedLayout.summary}
          </p>
        </div>
        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {localizedLayout.bestFor.slice(0, 3).map((purpose) => (
              <span
                key={purpose}
                className="border border-[var(--specimen-line-soft)] bg-transparent px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--specimen-ink-55)]"
              >
                {purpose}
              </span>
            ))}
          </div>
          <LocalizedLink
            href={`/layouts/${layout.slug}`}
            className="specimen-button specimen-button-md specimen-button-primary"
          >
            {locale === "ko" ? "상세 보기" : "View details"}
          </LocalizedLink>
        </div>
      </div>
    </article>
  );
}
