"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/i18n/useLocale";
import { useStylePreset, stylePresets } from "@/components/style-preset/StylePresetProvider";
import { designStyleForLocale, styleCategoryLabel } from "@/lib/localizedContent";
import { cn } from "@/lib/utils";

const paletteLabels = [
  ["base", "Base"],
  ["surface", "Surface"],
  ["text", "Text"],
  ["primary", "Primary"],
  ["accent", "Accent"],
  ["accent2", "Accent 2"],
  ["accent3", "Accent 3"],
] as const;

export function StylePresetPanel() {
  const locale = useLocale();
  const {
    activePreset,
    customPreset,
    generateCustomPreset,
    palette,
    prompt,
    resetCustomPreset,
    selectedSlug,
    setPrompt,
    setSelectedSlug,
  } = useStylePreset();
  const categories = useMemo(
    () => [...new Set(stylePresets.map((preset) => preset.category))],
    [],
  );
  const [activeCategory, setActiveCategory] = useState(
    categories.includes(activePreset.category) ? activePreset.category : categories[0],
  );
  const visiblePresets = stylePresets.filter((preset) => preset.category === activeCategory);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
      <section className="specimen-surface min-w-0 p-4 md:p-5">
        <div className="flex flex-col gap-3 border-b border-[var(--specimen-line)] pb-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="raw-label flex items-center gap-2 text-[var(--specimen-signal)]">
              <span className="specimen-bullet" aria-hidden="true" />
              {locale === "ko" ? "디자인 형식 카테고리" : "Design format categories"}
            </p>
            <h3 className="raw-display mt-2 text-4xl leading-[0.84] text-[var(--specimen-ink)] md:text-5xl">
              Visual format
            </h3>
          </div>
          <div className="raw-label text-right text-[var(--specimen-ink-55)]">
            {styleCategoryLabel(activePreset.category, locale)}
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                className={cn(
                  "shrink-0 border px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] transition",
                  active
                    ? "border-[var(--specimen-ink)] bg-[var(--specimen-ink)] text-[var(--specimen-paper)]"
                    : "border-[var(--specimen-line)] bg-[var(--specimen-card)] text-[var(--specimen-ink)] hover:border-[var(--specimen-ink)]",
                )}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {styleCategoryLabel(category, locale)}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {visiblePresets.map((preset) => {
            const active = !customPreset && selectedSlug === preset.slug;
            const localizedPreset = designStyleForLocale(preset, locale);

            return (
              <button
                className={cn(
                  "group min-w-0 border p-3 text-left transition",
                  active
                    ? "border-[var(--specimen-ink)] bg-[var(--specimen-ink)] text-[var(--specimen-paper)]"
                    : "border-[var(--specimen-line)] bg-[var(--specimen-card)] text-[var(--specimen-ink)] hover:border-[var(--specimen-ink)]",
                )}
                key={preset.slug}
                onClick={() => {
                  setActiveCategory(preset.category);
                  setSelectedSlug(preset.slug);
                }}
                type="button"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold uppercase tracking-[0.12em]">
                      {localizedPreset.nameKo}
                    </p>
                    <p className={cn("mt-1 text-xs", active ? "text-[rgb(242_239_232_/_0.62)]" : "text-[var(--specimen-ink-55)]")}>
                      {localizedPreset.nameEn}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    {[preset.palette.accent, preset.palette.accent2, preset.palette.accent3].map((color) => (
                      <span
                        className="h-4 w-4 border border-current/20"
                        key={`${preset.slug}-${color}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <p className={cn("mt-3 line-clamp-2 text-xs leading-5", active ? "text-[rgb(242_239_232_/_0.72)]" : "text-[var(--specimen-ink-55)]")}>
                  {localizedPreset.summary}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <aside className="min-w-0 border border-[var(--specimen-ink)] bg-[var(--specimen-ink)] p-4 text-[var(--specimen-paper)] md:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="raw-label text-[rgb(242_239_232_/_0.68)]">Prompt mix</p>
            <h3 className="raw-display mt-2 text-4xl leading-[0.84]">
              Palette
            </h3>
          </div>
          {customPreset ? (
            <button
              className="border border-[rgb(242_239_232_/_0.25)] px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--specimen-paper)] transition hover:bg-[var(--specimen-paper)] hover:text-[var(--specimen-ink)]"
              onClick={resetCustomPreset}
              type="button"
            >
              {locale === "ko" ? "초기화" : "Reset"}
            </button>
          ) : null}
        </div>

        <textarea
          className="mt-5 min-h-32 w-full resize-y border border-[rgb(242_239_232_/_0.2)] bg-[rgb(242_239_232_/_0.08)] p-3 text-sm leading-6 text-[var(--specimen-paper)] outline-none transition placeholder:text-[rgb(242_239_232_/_0.35)] focus:border-[var(--specimen-paper)]"
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={
            locale === "ko"
              ? "예: 고급 한옥 호텔, 따뜻한 미니멀, 짙은 먹색과 금색 포인트"
              : "Example: premium hotel, warm minimal, deep ink and gold accents"
          }
          value={prompt}
        />
        <button
          className="raw-button mt-3 inline-flex h-11 w-full items-center justify-center gap-2 border border-[var(--specimen-paper)] bg-[var(--specimen-paper)] px-4 text-sm font-bold uppercase tracking-[0.1em] text-[var(--specimen-ink)] transition"
          onClick={generateCustomPreset}
          type="button"
        >
          <SparkIcon />
          {locale === "ko" ? "팔레트 생성" : "Generate palette"}
        </button>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {paletteLabels.map(([key, label]) => {
            const color = palette[key];

            return (
              <div className="border border-[rgb(242_239_232_/_0.16)] bg-[rgb(242_239_232_/_0.08)] p-2" key={key}>
                <span
                  className="block h-12 border border-[rgb(242_239_232_/_0.18)]"
                  style={{ backgroundColor: color }}
                />
                <span className="mt-2 block text-[10px] font-bold uppercase tracking-[0.12em] text-[rgb(242_239_232_/_0.48)]">
                  {label}
                </span>
                <span className="mt-1 block font-mono text-xs text-[rgb(242_239_232_/_0.82)]">{color}</span>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

function SparkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3 9.8 9.8 3 12l6.8 2.2L12 21l2.2-6.8L21 12l-6.8-2.2L12 3Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
