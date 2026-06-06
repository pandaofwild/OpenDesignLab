"use client";

import { useMemo, useState } from "react";
import { webLayouts, type WebLayout } from "@/data/webLayouts";
import { useLocale } from "@/components/i18n/useLocale";
import { Button } from "@/components/ui/button";
import { LayoutStagePreview } from "@/components/web-layout/LayoutStagePreview";
import { layoutForLocale } from "@/lib/localizedContent";
import { cn } from "@/lib/utils";

const defaultSelection = webLayouts.slice(0, 3).map((layout) => layout.slug);

export function WebLayoutCompare() {
  const locale = useLocale();
  const [selectedSlugs, setSelectedSlugs] = useState(defaultSelection);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedLayouts = useMemo(
    () =>
      selectedSlugs
        .map((slug) => webLayouts.find((layout) => layout.slug === slug))
        .filter((layout): layout is WebLayout => Boolean(layout)),
    [selectedSlugs],
  );

  const boundedActiveIndex = selectedLayouts.length
    ? Math.min(activeIndex, selectedLayouts.length - 1)
    : 0;
  const activeLayout = selectedLayouts[boundedActiveIndex];

  function toggleLayout(slug: string) {
    if (selectedSlugs.includes(slug)) {
      const next = selectedSlugs.filter((item) => item !== slug);
      setSelectedSlugs(next);
      setActiveIndex((index) => Math.min(index, Math.max(next.length - 1, 0)));
      return;
    }

    if (selectedSlugs.length >= 3) {
      return;
    }

    const next = [...selectedSlugs, slug];
    setSelectedSlugs(next);
    setActiveIndex(next.length - 1);
  }

  function clearSelection() {
    setSelectedSlugs([]);
    setActiveIndex(0);
  }

  function showPreviousLayout() {
    setActiveIndex((current) =>
      current === 0 ? Math.max(selectedLayouts.length - 1, 0) : current - 1,
    );
  }

  function showNextLayout() {
    setActiveIndex((current) =>
      current >= selectedLayouts.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div className="space-y-5">
      {selectedLayouts.length === 0 ? (
        <div className="specimen-surface p-12 text-center">
          <p className="raw-label text-[var(--specimen-signal)]">
            {locale === "ko" ? "비교 대기" : "Comparison queue"}
          </p>
          <h2 className="raw-display mx-auto mt-4 max-w-3xl text-5xl leading-none text-[var(--specimen-ink)]">
            {locale === "ko" ? "비교할 레이아웃을 선택하세요." : "Select layouts to compare"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--specimen-ink-55)]">
            {locale === "ko"
              ? "목록에서 최대 3개의 레이아웃을 선택하면 큰 프리뷰가 표시됩니다."
              : "Pick up to 3 layouts to show a large preview."}
          </p>
        </div>
      ) : activeLayout ? (
        <section
          aria-label={locale === "ko" ? "레이아웃 비교 결과" : "Layout comparison result"}
          className="specimen-sheet relative h-[calc(100vh-300px)] min-h-[470px] max-h-[760px] overflow-hidden md:h-[calc(100vh-230px)] md:min-h-[560px]"
          data-testid="layout-stage"
        >
          <LayoutStagePreview
            detailHref={`/layouts/${activeLayout.slug}`}
            indexLabel={`${boundedActiveIndex + 1} / ${selectedLayouts.length}`}
            layout={activeLayout}
          />

          <button
            aria-label={locale === "ko" ? "이전 레이아웃 보기" : "Previous layout"}
            className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-[var(--specimen-ink)] bg-[rgb(251_250_246_/_0.9)] text-[var(--specimen-ink)] transition hover:bg-[var(--specimen-ink)] hover:text-[var(--specimen-paper)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--specimen-ink)] disabled:opacity-35 md:left-6 md:h-14 md:w-14"
            disabled={selectedLayouts.length <= 1}
            onClick={showPreviousLayout}
            type="button"
          >
            <ArrowLeftIcon />
          </button>
          <button
            aria-label={locale === "ko" ? "다음 레이아웃 보기" : "Next layout"}
            className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-[var(--specimen-ink)] bg-[rgb(251_250_246_/_0.9)] text-[var(--specimen-ink)] transition hover:bg-[var(--specimen-ink)] hover:text-[var(--specimen-paper)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--specimen-ink)] disabled:opacity-35 md:right-6 md:h-14 md:w-14"
            disabled={selectedLayouts.length <= 1}
            onClick={showNextLayout}
            type="button"
          >
            <ArrowRightIcon />
          </button>

          <div className="absolute left-1/2 top-4 z-20 hidden -translate-x-1/2 gap-2 border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.88)] px-3 py-2 md:flex">
            {selectedLayouts.map((layout, index) => (
              <button
                aria-label={
                  locale === "ko"
                    ? `${layout.nameKo} 프리뷰 보기`
                    : `Show ${layout.nameEn} preview`
                }
                className={cn(
                  "h-2.5 transition-all",
                  index === boundedActiveIndex
                    ? "w-8 bg-[var(--specimen-signal)]"
                    : "w-2.5 bg-[rgb(24_22_15_/_0.22)] hover:bg-[var(--specimen-ink)]",
                )}
                key={layout.slug}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>

        </section>
      ) : null}

      <section className="specimen-surface p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="raw-label flex items-center gap-2 text-[var(--specimen-ink)]">
              <span className="specimen-bullet" aria-hidden="true" />
              {locale === "ko" ? "비교할 레이아웃 선택" : "Select layouts"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--specimen-ink-55)]">
              {locale === "ko"
                ? `최대 3개까지 고른 뒤, 위 큰 프리뷰를 좌우 화살표로 넘겨 비교합니다. 현재 ${selectedLayouts.length}개 선택됨.`
                : `Pick up to 3 layouts, then use the arrows above to compare. ${selectedLayouts.length} selected.`}
            </p>
          </div>
          <Button onClick={clearSelection} variant="secondary">
            {locale === "ko" ? "선택 해제" : "Clear"}
          </Button>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {webLayouts.map((layout) => {
            const checked = selectedSlugs.includes(layout.slug);
            const disabled = !checked && selectedSlugs.length >= 3;
            const localizedLayout = layoutForLocale(layout, locale);

            return (
              <label
                className={cn(
                  "flex min-w-[240px] cursor-pointer items-center gap-3 border p-3 transition",
                  checked
                    ? "border-[var(--specimen-ink)] bg-[var(--specimen-ink)] text-[var(--specimen-paper)]"
                    : "border-[var(--specimen-line)] bg-[var(--specimen-card)] text-[var(--specimen-ink)] hover:border-[var(--specimen-ink)]",
                  disabled ? "cursor-not-allowed opacity-50" : "",
                )}
                key={layout.slug}
              >
                <input
                  checked={checked}
                  className="h-4 w-4 accent-[var(--specimen-signal)]"
                  disabled={disabled}
                  onChange={() => toggleLayout(layout.slug)}
                  type="checkbox"
                />
                <span>
                  <span className="block text-sm font-semibold">{localizedLayout.nameKo}</span>
                  <span className={cn("block text-xs", checked ? "text-[rgb(242_239_232_/_0.7)]" : "text-[var(--specimen-ink-55)]")}>
                    {localizedLayout.nameEn}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 6 9 12l6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}
