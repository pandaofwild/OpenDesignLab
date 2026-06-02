"use client";

import { useMemo, useState } from "react";
import { webLayouts, type WebLayout } from "@/data/webLayouts";
import { Button } from "@/components/ui/button";
import { LayoutStagePreview } from "@/components/web-layout/LayoutStagePreview";
import { cn } from "@/lib/utils";

const defaultSelection = webLayouts.slice(0, 3).map((layout) => layout.slug);

export function WebLayoutCompare() {
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
        <div className="border border-dashed border-[#1E1E1E]/35 bg-[#D9D6D0] p-12 text-center">
          <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-[-0.05em] text-[#1E1E1E]">
            비교할 레이아웃을 선택하세요.
          </h2>
          <p className="mt-4 text-sm text-[#1E1E1E]/65">
            목록에서 최대 3개의 레이아웃을 선택하면 큰 프리뷰가 표시됩니다.
          </p>
        </div>
      ) : activeLayout ? (
        <section
          aria-label="레이아웃 비교 결과"
          className="relative h-[calc(100vh-300px)] min-h-[470px] max-h-[760px] overflow-hidden bg-[#D9D6D0] ring-1 ring-[#1E1E1E]/20 md:h-[calc(100vh-230px)] md:min-h-[560px]"
          data-testid="layout-stage"
        >
          <LayoutStagePreview
            detailHref={`/web-layouts/${activeLayout.slug}`}
            indexLabel={`${boundedActiveIndex + 1} / ${selectedLayouts.length}`}
            layout={activeLayout}
          />

          <button
            aria-label="이전 레이아웃 보기"
            className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#1E1E1E] bg-[#E4E2DD]/92 text-[#1E1E1E] shadow-lg transition hover:scale-105 hover:bg-[#FF89A9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E] md:left-6 md:h-14 md:w-14"
            disabled={selectedLayouts.length <= 1}
            onClick={showPreviousLayout}
            type="button"
          >
            <ArrowLeftIcon />
          </button>
          <button
            aria-label="다음 레이아웃 보기"
            className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#1E1E1E] bg-[#E4E2DD]/92 text-[#1E1E1E] shadow-lg transition hover:scale-105 hover:bg-[#FF89A9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E] md:right-6 md:h-14 md:w-14"
            disabled={selectedLayouts.length <= 1}
            onClick={showNextLayout}
            type="button"
          >
            <ArrowRightIcon />
          </button>

          <div className="absolute left-1/2 top-4 z-20 hidden -translate-x-1/2 gap-2 rounded-full border border-[#1E1E1E]/20 bg-[#1E1E1E]/72 px-3 py-2 backdrop-blur md:flex">
            {selectedLayouts.map((layout, index) => (
              <button
                aria-label={`${layout.nameKo} 프리뷰 보기`}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === boundedActiveIndex
                    ? "w-8 bg-[#F8A348]"
                    : "w-2.5 bg-[#E4E2DD]/40 hover:bg-[#E4E2DD]/70",
                )}
                key={layout.slug}
                onClick={() => setActiveIndex(index)}
                type="button"
              />
            ))}
          </div>

        </section>
      ) : null}

      <section className="bg-[#D9D6D0] p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="raw-label text-[#1E1E1E]">
              비교할 레이아웃 선택
            </h2>
            <p className="mt-2 text-sm text-[#1E1E1E]/65">
              최대 3개까지 고른 뒤, 위 큰 프리뷰를 좌우 화살표로 넘겨 비교합니다.
              현재 {selectedLayouts.length}개 선택됨.
            </p>
          </div>
          <Button onClick={clearSelection} variant="secondary">
            선택 해제
          </Button>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {webLayouts.map((layout) => {
            const checked = selectedSlugs.includes(layout.slug);
            const disabled = !checked && selectedSlugs.length >= 3;

            return (
              <label
                className={cn(
                  "flex min-w-[240px] cursor-pointer items-center gap-3 border p-3 transition",
                  checked
                    ? "border-[#1E1E1E] bg-[#1E1E1E] text-[#E4E2DD]"
                    : "border-[#1E1E1E]/25 bg-[#E4E2DD] text-[#1E1E1E] hover:border-[#1E1E1E]",
                  disabled ? "cursor-not-allowed opacity-50" : "",
                )}
                key={layout.slug}
              >
                <input
                  checked={checked}
                  className="h-4 w-4"
                  disabled={disabled}
                  onChange={() => toggleLayout(layout.slug)}
                  type="checkbox"
                />
                <span>
                  <span className="block text-sm font-semibold">{layout.nameKo}</span>
                  <span className={cn("block text-xs", checked ? "text-[#E4E2DD]/70" : "text-[#1E1E1E]/55")}>
                    {layout.nameEn}
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
