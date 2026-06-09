"use client";

import { useMemo } from "react";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import {
  SpecimenCoreFrame,
  SpecimenOptionRow,
  SpecimenSideSection,
  SpecimenTinyChip,
} from "@/components/specimen/SpecimenCoreFrame";
import {
  includesQuery,
  useCatalogUrlState,
} from "@/components/specimen/useCatalogUrlState";
import { WireframeThumbnail } from "@/components/web-layout/WireframeThumbnail";
import {
  webLayoutCategories,
  webLayoutPurposes,
  webLayouts,
  type WebLayout,
} from "@/data/webLayouts";
import type { Locale } from "@/lib/i18n";
import {
  layoutCategoryLabel,
  layoutForLocale,
  phraseLabel,
  previewTypeLabel,
} from "@/lib/localizedContent";
import { cn, formatComplexity } from "@/lib/utils";

const complexityRank: Record<WebLayout["complexity"], number> = {
  easy: 0,
  medium: 1,
  hard: 2,
};

export function LayoutCoreScreen({ locale }: { locale: Locale }) {
  const { q, searchParams, setParam, setQuery } = useCatalogUrlState();
  const activeCategory = searchParams.get("category") ?? "all";
  const activeComplexity = searchParams.get("complexity") ?? "all";
  const activePurpose = searchParams.get("purpose") ?? "all";
  const sort = searchParams.get("sort") ?? "complexity";
  const view = searchParams.get("view") === "list" ? "list" : "grid";

  const categoryCounts = webLayoutCategories.slice(0, 7).map((category) => ({
    category,
    count: webLayouts.filter((layout) => layout.category === category).length,
  }));

  const filteredLayouts = useMemo(() => {
    const filtered = webLayouts.filter((layout) => {
      const localizedLayout = layoutForLocale(layout, locale);
      const matchesCategory = activeCategory === "all" || layout.category === activeCategory;
      const matchesComplexity = activeComplexity === "all" || layout.complexity === activeComplexity;
      const matchesPurpose = activePurpose === "all" || layout.bestFor.includes(activePurpose);
      const matchesSearch = includesQuery(
        [
          layout.nameKo,
          layout.nameEn,
          layout.category,
          layout.summary,
          layout.previewType,
          localizedLayout.nameKo,
          localizedLayout.nameEn,
          localizedLayout.category,
          localizedLayout.summary,
          previewTypeLabel(layout.previewType, locale),
          ...layout.bestFor.map((item) => phraseLabel(item, locale)),
          ...layout.tags,
        ],
        q,
      );

      return matchesCategory && matchesComplexity && matchesPurpose && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (sort === "name") {
        return layoutForLocale(a, locale).nameKo.localeCompare(layoutForLocale(b, locale).nameKo);
      }

      if (sort === "category") {
        return layoutCategoryLabel(a.category, locale).localeCompare(layoutCategoryLabel(b.category, locale));
      }

      return complexityRank[a.complexity] - complexityRank[b.complexity] || a.nameEn.localeCompare(b.nameEn);
    });
  }, [activeCategory, activeComplexity, activePurpose, locale, q, sort]);

  const visibleLayouts = filteredLayouts;
  const activeFilterCount = [
    Boolean(q),
    activeCategory !== "all",
    activeComplexity !== "all",
    activePurpose !== "all",
  ].filter(Boolean).length;
  const sortLabel =
    sort === "name"
      ? locale === "ko"
        ? "이름순"
        : "Name"
      : sort === "category"
        ? locale === "ko"
          ? "카테고리순"
          : "Category"
        : locale === "ko"
          ? "복잡도순"
          : "Complexity";
  const mobileFilterSummary = [
    q ? `${locale === "ko" ? "검색" : "Search"} ${q}` : null,
    activeCategory !== "all" ? layoutCategoryLabel(activeCategory as WebLayout["category"], locale) : null,
    activeComplexity !== "all" ? formatComplexity(activeComplexity as WebLayout["complexity"], locale) : null,
    activePurpose !== "all" ? phraseLabel(activePurpose, locale) : null,
  ].filter(Boolean).join(" / ");
  const hasFilters =
    Boolean(q) ||
    activeCategory !== "all" ||
    activeComplexity !== "all" ||
    activePurpose !== "all" ||
    sort !== "complexity" ||
    view !== "grid";

  function resetFilters() {
    setParam("q", null, {
      clear: ["category", "complexity", "purpose", "sort", "view"],
    });
  }

  return (
    <SpecimenCoreFrame
      active="layouts"
      appliedLabel="BRUTALISM"
      label="Layout Explorer"
      onSearchChange={setQuery}
      searchPlaceholder={locale === "ko" ? "레이아웃 검색..." : "search layouts..."}
      searchValue={q}
    >
      <div className="grid min-h-[calc(100dvh-96px)] min-w-0 lg:grid-cols-[276px_minmax(0,1fr)]">
        <aside className="specimen-scrollbar min-w-0 border-b border-[var(--specimen-line)] p-3 lg:sticky lg:top-4 lg:max-h-[calc(100dvh-32px)] lg:overflow-auto lg:border-b-0 lg:border-r lg:p-5">
          <LayoutMobileFilters
            activeCategory={activeCategory}
            activeComplexity={activeComplexity}
            activeFilterCount={activeFilterCount}
            activePurpose={activePurpose}
            categoryCounts={categoryCounts}
            filterSummary={mobileFilterSummary}
            hasFilters={hasFilters}
            locale={locale}
            onCategoryChange={(category) => setParam("category", category)}
            onComplexityChange={(complexity) => setParam("complexity", complexity)}
            onPurposeChange={(purpose) => setParam("purpose", purpose)}
            onReset={resetFilters}
          />

          <div className="hidden space-y-6 lg:block">
            <SpecimenSideSection title={locale === "ko" ? "카테고리" : "Category"}>
              <div className="space-y-2.5">
                <SpecimenOptionRow
                  active={activeCategory === "all"}
                  count={webLayouts.length}
                  label={locale === "ko" ? "전체 구조" : "All structures"}
                  onClick={() => setParam("category", null)}
                />
                {categoryCounts.map(({ category, count }) => (
                  <SpecimenOptionRow
                    active={activeCategory === category}
                    count={count}
                    key={category}
                    label={layoutCategoryLabel(category, locale)}
                    onClick={() => setParam("category", activeCategory === category ? null : category)}
                  />
                ))}
              </div>
            </SpecimenSideSection>

            <SpecimenSideSection title={locale === "ko" ? "복잡도" : "Complexity"}>
              <div className="space-y-2">
                {(["easy", "medium", "hard"] as const).map((complexity) => (
                  <button
                    aria-pressed={activeComplexity === complexity}
                    className={cn(
                      "specimen-filter-row",
                      activeComplexity === complexity
                        ? "is-active font-bold"
                        : "",
                    )}
                    key={complexity}
                    onClick={() => setParam("complexity", activeComplexity === complexity ? null : complexity)}
                    type="button"
                  >
                    <span className="font-mono text-base leading-none">...</span>
                    <span>{formatComplexity(complexity, locale)}</span>
                  </button>
                ))}
              </div>
            </SpecimenSideSection>

            <SpecimenSideSection title={locale === "ko" ? "목적" : "Purpose"}>
              <div className="flex flex-wrap gap-2">
                {webLayoutPurposes.slice(0, 7).map((purpose) => (
                  <SpecimenTinyChip
                    active={activePurpose === purpose}
                    key={purpose}
                    onClick={() => setParam("purpose", activePurpose === purpose ? null : purpose)}
                  >
                    {phraseLabel(purpose, locale)}
                  </SpecimenTinyChip>
                ))}
              </div>
            </SpecimenSideSection>

            {hasFilters ? (
              <button
                className="specimen-button specimen-button-sm specimen-button-quiet"
                onClick={resetFilters}
                type="button"
              >
                {locale === "ko" ? "필터 초기화" : "Reset filters"}
              </button>
            ) : null}
          </div>
        </aside>

        <section className="min-w-0 p-4 md:p-5 lg:p-6">
          <div className="border-t border-[var(--specimen-ink)] pt-6 lg:pt-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="raw-display text-5xl leading-none md:text-[4.5rem]">
                  Layouts
                </h1>
                <p className="raw-label text-[var(--specimen-ink-55)]">
                  {String(filteredLayouts.length).padStart(3, "0")} shown /{" "}
                  {String(webLayouts.length).padStart(3, "0")} structures
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 raw-label text-[var(--specimen-ink-55)]">
                <SpecimenTinyChip active={sort === "complexity"} onClick={() => setParam("sort", "complexity")}>
                  {locale === "ko" ? "복잡도순" : "Sort complexity"}
                </SpecimenTinyChip>
                <SpecimenTinyChip active={sort === "name"} onClick={() => setParam("sort", "name")}>
                  {locale === "ko" ? "이름순" : "Name"}
                </SpecimenTinyChip>
                <SpecimenTinyChip active={sort === "category"} onClick={() => setParam("sort", "category")}>
                  {locale === "ko" ? "카테고리순" : "Category"}
                </SpecimenTinyChip>
                <SpecimenTinyChip active={view === "grid"} onClick={() => setParam("view", null)}>
                  {locale === "ko" ? "그리드" : "Grid"}
                </SpecimenTinyChip>
                <SpecimenTinyChip active={view === "list"} onClick={() => setParam("view", "list")}>
                  {locale === "ko" ? "리스트" : "List"}
                </SpecimenTinyChip>
              </div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <LayoutMetric
                label={locale === "ko" ? "라이브러리" : "Library"}
                mono
                note={locale === "ko" ? "등록 구조" : "structures"}
                value={String(webLayouts.length).padStart(3, "0")}
              />
              <LayoutMetric
                label={locale === "ko" ? "현재 보기" : "Shown"}
                mono
                note={activeFilterCount ? (locale === "ko" ? "필터 적용" : "filtered") : locale === "ko" ? "전체 범위" : "full range"}
                value={String(filteredLayouts.length).padStart(3, "0")}
              />
              <LayoutMetric
                label={locale === "ko" ? "정렬" : "Order"}
                note={view === "grid" ? (locale === "ko" ? "그리드 보기" : "grid view") : locale === "ko" ? "리스트 보기" : "list view"}
                value={sortLabel}
              />
            </div>

            {visibleLayouts.length ? (
              view === "grid" ? (
                <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                  {visibleLayouts.map((layout, index) => (
                    <CoreLayoutCard index={index} key={layout.slug} layout={layout} locale={locale} />
                  ))}
                </div>
              ) : (
                <div className="mt-6 overflow-hidden border border-[var(--specimen-line)]">
                  {visibleLayouts.map((layout, index) => (
                    <CoreLayoutRow index={index} key={layout.slug} layout={layout} locale={locale} />
                  ))}
                </div>
              )
            ) : (
              <div className="mt-6 border border-[var(--specimen-line)] p-6">
                <p className="raw-label text-[var(--specimen-ink-55)]">No matching layouts</p>
                <button
                  className="specimen-button specimen-button-sm specimen-button-secondary mt-4"
                  onClick={resetFilters}
                  type="button"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </SpecimenCoreFrame>
  );
}

function LayoutMetric({
  label,
  mono = false,
  note,
  value,
}: {
  label: string;
  mono?: boolean;
  note: string;
  value: string;
}) {
  return (
    <div className="border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.54)] p-3">
      <p className="raw-label text-[var(--specimen-ink-55)]">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p
          className={cn(
            "truncate text-[1.55rem] font-bold leading-none text-[var(--specimen-ink)]",
            mono ? "font-mono" : "",
          )}
        >
          {value}
        </p>
        <p className="pb-0.5 text-right text-[11px] font-medium text-[var(--specimen-ink-55)]">
          {note}
        </p>
      </div>
    </div>
  );
}

function LayoutMobileFilters({
  activeCategory,
  activeComplexity,
  activeFilterCount,
  activePurpose,
  categoryCounts,
  filterSummary,
  hasFilters,
  locale,
  onCategoryChange,
  onComplexityChange,
  onPurposeChange,
  onReset,
}: {
  activeCategory: string;
  activeComplexity: string;
  activeFilterCount: number;
  activePurpose: string;
  categoryCounts: Array<{ category: WebLayout["category"]; count: number }>;
  filterSummary: string;
  hasFilters: boolean;
  locale: Locale;
  onCategoryChange: (category: WebLayout["category"] | null) => void;
  onComplexityChange: (complexity: WebLayout["complexity"] | null) => void;
  onPurposeChange: (purpose: string | null) => void;
  onReset: () => void;
}) {
  const stateText = activeFilterCount
    ? locale === "ko"
      ? `${activeFilterCount}개 적용`
      : `${activeFilterCount} active`
    : locale === "ko"
      ? "전체 보기"
      : "All";
  const summaryText = filterSummary || (locale === "ko" ? "전체 구조" : "All structures");

  return (
    <details className="group w-full min-w-0 max-w-full overflow-hidden lg:hidden">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] px-3 py-2 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">
          <span className="raw-label block text-[var(--specimen-ink)]">
            {locale === "ko" ? "필터" : "Filters"}
          </span>
          <span className="mt-1 block truncate text-xs font-medium text-[var(--specimen-ink-55)]">
            {summaryText}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="raw-label text-[var(--specimen-ink-55)]">{stateText}</span>
          <span className="font-mono text-lg leading-none text-[var(--specimen-ink)] transition group-open:rotate-45">
            +
          </span>
        </span>
      </summary>

      <div className="mt-2 w-full min-w-0 max-w-full space-y-4 overflow-hidden border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.54)] p-3">
        <section className="space-y-2">
          <p className="raw-label text-[var(--specimen-ink-55)]">
            {locale === "ko" ? "카테고리" : "Category"}
          </p>
          <div className="specimen-scrollbar -mx-1 flex min-w-0 max-w-full gap-1.5 overflow-x-auto px-1 pb-1">
            <button
              aria-pressed={activeCategory === "all"}
              className={mobileFilterChipClass(activeCategory === "all")}
              onClick={() => onCategoryChange(null)}
              type="button"
            >
              <span>{locale === "ko" ? "전체" : "All"}</span>
              <span className="font-mono opacity-70">{webLayouts.length}</span>
            </button>
            {categoryCounts.map(({ category, count }) => (
              <button
                aria-pressed={activeCategory === category}
                className={mobileFilterChipClass(activeCategory === category)}
                key={category}
                onClick={() => onCategoryChange(activeCategory === category ? null : category)}
                type="button"
              >
                <span>{layoutCategoryLabel(category, locale)}</span>
                <span className="font-mono opacity-70">{count}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <p className="raw-label text-[var(--specimen-ink-55)]">
            {locale === "ko" ? "복잡도" : "Complexity"}
          </p>
          <div className="specimen-scrollbar -mx-1 flex min-w-0 max-w-full gap-1.5 overflow-x-auto px-1 pb-1">
            {(["easy", "medium", "hard"] as const).map((complexity) => (
              <button
                aria-pressed={activeComplexity === complexity}
                className={mobileFilterChipClass(activeComplexity === complexity)}
                key={complexity}
                onClick={() => onComplexityChange(activeComplexity === complexity ? null : complexity)}
                type="button"
              >
                {formatComplexity(complexity, locale)}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <p className="raw-label text-[var(--specimen-ink-55)]">
            {locale === "ko" ? "목적" : "Purpose"}
          </p>
          <div className="specimen-scrollbar -mx-1 flex min-w-0 max-w-full gap-1.5 overflow-x-auto px-1 pb-1">
            {webLayoutPurposes.slice(0, 7).map((purpose) => (
              <button
                aria-pressed={activePurpose === purpose}
                className={mobileFilterChipClass(activePurpose === purpose)}
                key={purpose}
                onClick={() => onPurposeChange(activePurpose === purpose ? null : purpose)}
                type="button"
              >
                {phraseLabel(purpose, locale)}
              </button>
            ))}
          </div>
        </section>

        {hasFilters ? (
          <button
            className="specimen-button specimen-button-sm specimen-button-quiet w-full"
            onClick={onReset}
            type="button"
          >
            {locale === "ko" ? "필터 초기화" : "Reset filters"}
          </button>
        ) : null}
      </div>
    </details>
  );
}

function mobileFilterChipClass(active: boolean) {
  return cn(
    "specimen-button specimen-button-tiny shrink-0 gap-2 whitespace-nowrap px-2.5",
    active ? "specimen-button-primary" : "specimen-button-secondary",
  );
}

function CoreLayoutCard({
  index,
  layout,
  locale,
}: {
  index: number;
  layout: WebLayout;
  locale: Locale;
}) {
  const localizedLayout = layoutForLocale(layout, locale);

  return (
    <article className="group flex h-full flex-col border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.58)] transition hover:border-[var(--specimen-ink)]">
      <div className="border-b border-[var(--specimen-line)] p-2">
        <div className="aspect-[16/10] overflow-hidden border border-[var(--specimen-line-soft)] bg-[var(--specimen-card)] p-1.5">
          <WireframeThumbnail layout={localizedLayout} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[11px] font-bold tracking-[0.14em] text-[var(--specimen-ink-55)]">
            {String(index + 1).padStart(3, "0")} / {String(webLayouts.length).padStart(3, "0")}
          </p>
          <span className="font-mono text-sm leading-none text-[var(--specimen-ink-55)]">
            {layout.complexity === "easy" ? "." : layout.complexity === "medium" ? ".." : "..."}
          </span>
        </div>
        <div>
          <h2 className="text-[15px] font-bold leading-tight text-[var(--specimen-ink)]">{localizedLayout.nameKo}</h2>
          {localizedLayout.nameEn !== localizedLayout.nameKo ? (
            <p className="mt-0.5 text-[12px] text-[var(--specimen-ink-55)]">{localizedLayout.nameEn}</p>
          ) : null}
        </div>
        <p className="line-clamp-2 text-[12px] leading-5 text-[var(--specimen-ink-55)]">
          {localizedLayout.summary}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          <SpecimenTinyChip>{localizedLayout.category}</SpecimenTinyChip>
          <SpecimenTinyChip>{formatComplexity(layout.complexity, locale)}</SpecimenTinyChip>
          <SpecimenTinyChip>{previewTypeLabel(layout.previewType, locale)}</SpecimenTinyChip>
        </div>
        <div className="grid grid-cols-2 gap-1.5 border-t border-[var(--specimen-line)] pt-3">
          <LocalizedLink
            className="specimen-button specimen-button-sm specimen-button-secondary w-full"
            href={`/layouts/${layout.slug}`}
          >
            {locale === "ko" ? "상세" : "Detail"}
          </LocalizedLink>
          <LocalizedLink
            className="specimen-button specimen-button-sm specimen-button-primary w-full"
            href={`/studio?layout=${layout.slug}`}
          >
            {locale === "ko" ? "사용" : "Use"}
          </LocalizedLink>
        </div>
      </div>
    </article>
  );
}

function CoreLayoutRow({
  index,
  layout,
  locale,
}: {
  index: number;
  layout: WebLayout;
  locale: Locale;
}) {
  const localizedLayout = layoutForLocale(layout, locale);

  return (
    <div className="grid grid-cols-[48px_minmax(0,1fr)] border-b border-[var(--specimen-line)] last:border-b-0 md:grid-cols-[56px_minmax(0,1.25fr)_minmax(160px,0.7fr)_176px]">
      <div className="row-span-2 border-r border-[var(--specimen-line)] p-3 font-mono text-[11px] text-[var(--specimen-ink-55)] md:row-span-1">
        {String(index + 1).padStart(3, "0")}
      </div>
      <div className="min-w-0 p-3 md:border-r md:border-[var(--specimen-line)]">
        <h2 className="truncate text-sm font-bold text-[var(--specimen-ink)]">{localizedLayout.nameKo}</h2>
        <p className="mt-1 truncate text-[12px] text-[var(--specimen-ink-55)]">{localizedLayout.summary}</p>
      </div>
      <div className="border-t border-[var(--specimen-line)] p-3 md:border-r md:border-t-0">
        <p className="raw-label truncate text-[var(--specimen-ink-55)]">{localizedLayout.category}</p>
        <p className="mt-2 text-[12px] text-[var(--specimen-ink-55)]">
          {formatComplexity(layout.complexity, locale)} / {previewTypeLabel(layout.previewType, locale)}
        </p>
      </div>
      <div className="col-span-2 flex flex-wrap items-center gap-1.5 border-t border-[var(--specimen-line)] p-3 md:col-span-1 md:justify-end md:border-t-0">
        <LocalizedLink
          className="specimen-button specimen-button-tiny specimen-button-secondary"
          href={`/layouts/${layout.slug}`}
        >
          {locale === "ko" ? "상세" : "Open"}
        </LocalizedLink>
        <LocalizedLink
          className="specimen-button specimen-button-tiny specimen-button-primary"
          href={`/studio?layout=${layout.slug}`}
        >
          {locale === "ko" ? "사용" : "Use"}
        </LocalizedLink>
      </div>
    </div>
  );
}
