"use client";

import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/useLocale";
import { useStylePreset } from "@/components/style-preset/StylePresetProvider";
import { designStyleForLocale } from "@/lib/localizedContent";

export function AppliedStyleStrip() {
  const locale = useLocale();
  const { activePreset, palette } = useStylePreset();
  const localizedPreset = designStyleForLocale(activePreset, locale);

  return (
    <section className="specimen-surface p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="raw-label flex items-center gap-2 text-[var(--specimen-signal)]">
            <span className="specimen-bullet" aria-hidden="true" />
            {locale === "ko" ? "적용 중인 디자인 형식" : "Applied design format"}
          </p>
          <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
            <h3 className="raw-display text-4xl leading-[0.84] text-[var(--specimen-ink)]">
              {localizedPreset.nameKo}
            </h3>
            {localizedPreset.nameEn !== localizedPreset.nameKo ? (
              <p className="text-sm font-medium text-[var(--specimen-ink-55)]">{localizedPreset.nameEn}</p>
            ) : null}
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--specimen-ink-55)]">
            {localizedPreset.summary}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex gap-1.5">
            {[palette.base, palette.surface, palette.text, palette.accent, palette.accent2, palette.accent3].map(
              (color) => (
                <span
                  className="h-8 w-8 border border-[var(--specimen-line)]"
                  key={`${activePreset.slug}-${color}`}
                  style={{ backgroundColor: color }}
                />
              ),
            )}
          </div>
          <LocalizedLink
            className="raw-button inline-flex h-10 items-center border border-[var(--specimen-ink)] bg-[var(--specimen-ink)] px-4 text-xs font-bold uppercase tracking-[0.1em] text-[var(--specimen-paper)] transition"
            href="/styles"
          >
            {locale === "ko" ? "형식 바꾸기" : "Change style"}
          </LocalizedLink>
        </div>
      </div>
    </section>
  );
}
