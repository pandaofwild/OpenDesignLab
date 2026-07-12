"use client";

import { useMemo } from "react";
import { ColorPaletteGrid } from "@/components/design-style/ColorPaletteGrid";
import { DesignStyleSampleRenderer } from "@/components/design-style/DesignStyleSampleRenderer";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/useLocale";
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
import {
  designStyleCategories,
  designStyles,
  type DesignStyle,
  type StyleDensity,
  type StyleEffect,
} from "@/data/designStyles";
import { designStyleForLocale, styleCategoryLabel } from "@/lib/localizedContent";
import { cn } from "@/lib/utils";
import { useStylePreset } from "@/components/style-preset/StylePresetProvider";

const densityOptions: StyleDensity[] = ["airy", "normal", "tight"];
const effectOptions: StyleEffect[] = ["none", "grain", "scanline", "glow", "gradient", "glitch"];
const gridColumnOptions = ["1", "2", "3"] as const;

type StyleGridColumns = (typeof gridColumnOptions)[number];

const gridColumnClass: Record<StyleGridColumns, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
};

const densityLabel: Record<StyleDensity, string> = {
  airy: "Airy",
  normal: "Normal",
  tight: "Tight",
};

const effectLabel: Record<StyleEffect, string> = {
  none: "None",
  grain: "Grain",
  scanline: "Scanline",
  glow: "Glow",
  gradient: "Gradient",
  glitch: "Glitch",
};

const densityLabelKo: Record<StyleDensity, string> = {
  airy: "여유",
  normal: "보통",
  tight: "촘촘",
};

const effectLabelKo: Record<StyleEffect, string> = {
  none: "없음",
  grain: "그레인",
  scanline: "스캔라인",
  glow: "글로우",
  gradient: "그라데이션",
  glitch: "글리치",
};

export function DesignStyleCoreScreen() {
  const locale = useLocale();
  const { activePreset, customPreset, selectedSlug, setSelectedSlug } = useStylePreset();
  const { q, searchParams, setParam, setQuery } = useCatalogUrlState();
  const activeCategory = searchParams.get("category") ?? "all";
  const activeDensity = searchParams.get("density") ?? "all";
  const activeEffect = searchParams.get("effect") ?? "all";
  const sort = searchParams.get("sort") ?? "category";
  const view = searchParams.get("view") === "list" ? "list" : "grid";
  const gridColumns = normalizeGridColumns(searchParams.get("columns"));
  const catalogStateQuery = searchParams.toString();

  const categoryCounts = designStyleCategories.map((category) => ({
    category,
    count: designStyles.filter((style) => style.category === category).length,
  }));

  const filteredStyles = useMemo(() => {
    const filtered = designStyles.filter((style) => {
      const localizedStyle = designStyleForLocale(style, locale);
      const matchesCategory = activeCategory === "all" || style.category === activeCategory;
      const matchesDensity = activeDensity === "all" || style.tokens.space.density === activeDensity;
      const matchesEffect = activeEffect === "all" || style.tokens.decoration.effect === activeEffect;
      const matchesSearch = includesQuery(
        [
          style.nameKo,
          style.nameEn,
          style.category,
          style.summary,
          style.sampleType,
          style.tokens.space.density,
          style.tokens.decoration.effect,
          localizedStyle.nameKo,
          localizedStyle.nameEn,
          localizedStyle.category,
          localizedStyle.summary,
          ...style.tags,
        ],
        q,
      );

      return matchesCategory && matchesDensity && matchesEffect && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (sort === "name") {
        return designStyleForLocale(a, locale).nameKo.localeCompare(designStyleForLocale(b, locale).nameKo);
      }

      if (sort === "density") {
        return a.tokens.space.density.localeCompare(b.tokens.space.density) || a.nameEn.localeCompare(b.nameEn);
      }

      return styleCategoryLabel(a.category, locale).localeCompare(styleCategoryLabel(b.category, locale)) ||
        a.nameEn.localeCompare(b.nameEn);
    });
  }, [activeCategory, activeDensity, activeEffect, locale, q, sort]);

  const visibleStyles = filteredStyles;
  const activeFilterCount = [
    Boolean(q),
    activeCategory !== "all",
    activeDensity !== "all",
    activeEffect !== "all",
  ].filter(Boolean).length;
  const sortLabel =
    sort === "name"
      ? locale === "ko"
        ? "이름순"
        : "Name"
      : sort === "density"
        ? locale === "ko"
          ? "밀도순"
          : "Density"
        : locale === "ko"
          ? "카테고리순"
          : "Category";
  const mobileFilterSummary = [
    q ? `${locale === "ko" ? "검색" : "Search"} ${q}` : null,
    activeCategory !== "all" ? styleCategoryLabel(activeCategory, locale) : null,
    activeDensity !== "all" ? densityDisplayLabel(activeDensity as StyleDensity, locale) : null,
    activeEffect !== "all" ? effectDisplayLabel(activeEffect as StyleEffect, locale) : null,
  ].filter(Boolean).join(" / ");
  const hasFilters =
    Boolean(q) ||
    activeCategory !== "all" ||
    activeDensity !== "all" ||
    activeEffect !== "all" ||
    sort !== "category" ||
    view !== "grid" ||
    gridColumns !== "2";

  function resetFilters() {
    setParam("q", null, {
      clear: ["category", "density", "effect", "sort", "view", "columns"],
    });
  }

  return (
    <SpecimenCoreFrame
      active="styles"
      appliedLabel={activePreset.nameEn.toUpperCase()}
      label="Design Style Lab"
      onSearchChange={setQuery}
      searchPlaceholder={locale === "ko" ? "스타일 검색..." : "search styles..."}
      searchValue={q}
    >
      <div className="grid min-h-[calc(100dvh-96px)] min-w-0 lg:grid-cols-[276px_minmax(0,1fr)]">
        <aside className="specimen-scrollbar min-w-0 border-b border-[var(--specimen-line)] p-3 lg:sticky lg:top-4 lg:max-h-[calc(100dvh-32px)] lg:overflow-auto lg:border-b-0 lg:border-r lg:p-5">
          <StyleMobileFilters
            activeCategory={activeCategory}
            activeDensity={activeDensity}
            activeEffect={activeEffect}
            activeFilterCount={activeFilterCount}
            categoryCounts={categoryCounts}
            categoryHref={(category) => styleCategoryFilterHref(category, activeCategory, searchParams)}
            filterSummary={mobileFilterSummary}
            hasFilters={hasFilters}
            locale={locale}
            onDensityChange={(density) => setParam("density", density)}
            onEffectChange={(effect) => setParam("effect", effect)}
            onReset={resetFilters}
          />

          <div className="hidden space-y-6 lg:block">
            <SpecimenSideSection title={locale === "ko" ? "카테고리" : "Category"}>
              <div className="space-y-2.5">
                <SpecimenOptionRow
                  active={activeCategory === "all"}
                  count={designStyles.length}
                  href={styleCategoryFilterHref(null, activeCategory, searchParams)}
                  label={locale === "ko" ? "전체 스타일" : "All styles"}
                />
                {categoryCounts.map(({ category, count }) => (
                  <SpecimenOptionRow
                    active={activeCategory === category}
                    count={count}
                    href={styleCategoryFilterHref(category, activeCategory, searchParams)}
                    key={category}
                    label={styleCategoryLabel(category, locale)}
                  />
                ))}
              </div>
            </SpecimenSideSection>

            <SpecimenSideSection title={locale === "ko" ? "밀도" : "Density"}>
              <div className="space-y-2">
                {densityOptions.map((density) => (
                  <button
                    aria-pressed={activeDensity === density}
                    className={cn(
                      "specimen-filter-row",
                      activeDensity === density
                        ? "is-active font-bold"
                        : "",
                    )}
                    key={density}
                    onClick={() => setParam("density", activeDensity === density ? null : density)}
                    type="button"
                  >
                    <span className="font-mono text-base leading-none">{densityDots(density)}</span>
                    <span>{densityDisplayLabel(density, locale)}</span>
                  </button>
                ))}
              </div>
            </SpecimenSideSection>

            <SpecimenSideSection title={locale === "ko" ? "효과" : "Effect"}>
              <div className="flex flex-wrap gap-2">
                {effectOptions.map((effect) => (
                  <SpecimenTinyChip
                    active={activeEffect === effect}
                    key={effect}
                    onClick={() => setParam("effect", activeEffect === effect ? null : effect)}
                  >
                    {effectDisplayLabel(effect, locale)}
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
                  Design Styles
                </h1>
                <p className="raw-label text-[var(--specimen-ink-55)]">
                  {String(filteredStyles.length).padStart(3, "0")} shown /{" "}
                  {String(designStyles.length).padStart(3, "0")} styles
                </p>
              </div>
              <div className="flex flex-col gap-2 lg:items-end">
                <div className="flex flex-wrap gap-1.5 raw-label text-[var(--specimen-ink-55)]">
                  <SpecimenTinyChip active={sort === "category"} onClick={() => setParam("sort", "category")}>
                    {locale === "ko" ? "카테고리순" : "Sort category"}
                  </SpecimenTinyChip>
                  <SpecimenTinyChip active={sort === "name"} onClick={() => setParam("sort", "name")}>
                    {locale === "ko" ? "이름순" : "Name"}
                  </SpecimenTinyChip>
                  <SpecimenTinyChip active={sort === "density"} onClick={() => setParam("sort", "density")}>
                    {locale === "ko" ? "밀도순" : "Density"}
                  </SpecimenTinyChip>
                  <SpecimenTinyChip active={view === "grid"} onClick={() => setParam("view", null)}>
                    {locale === "ko" ? "그리드" : "Grid"}
                  </SpecimenTinyChip>
                  <SpecimenTinyChip active={view === "list"} onClick={() => setParam("view", "list")}>
                    {locale === "ko" ? "리스트" : "List"}
                  </SpecimenTinyChip>
                </div>
                {view === "grid" ? (
                  <div className="flex flex-wrap items-center gap-1.5 raw-label text-[var(--specimen-ink-55)]">
                    <span className="mr-1 text-[var(--specimen-ink-55)]">
                      {locale === "ko" ? "열" : "Columns"}
                    </span>
                    {gridColumnOptions.map((column) => (
                      <SpecimenTinyChip
                        active={gridColumns === column}
                        key={column}
                        onClick={() => setParam("columns", column === "2" ? null : column)}
                      >
                        {gridColumnControlLabel(column)}
                      </SpecimenTinyChip>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <StyleMetric
                label={locale === "ko" ? "라이브러리" : "Library"}
                mono
                note={locale === "ko" ? "등록 스타일" : "styles"}
                value={String(designStyles.length).padStart(3, "0")}
              />
              <StyleMetric
                label={locale === "ko" ? "현재 보기" : "Shown"}
                mono
                note={activeFilterCount ? (locale === "ko" ? "필터 적용" : "filtered") : locale === "ko" ? "전체 범위" : "full range"}
                value={String(filteredStyles.length).padStart(3, "0")}
              />
              <StyleMetric
                label={locale === "ko" ? "정렬" : "Order"}
                note={view === "grid" ? gridColumnMetricLabel(gridColumns, locale) : locale === "ko" ? "리스트 보기" : "list view"}
                value={sortLabel}
              />
            </div>

            {visibleStyles.length ? (
              view === "grid" ? (
                <div className={cn("mt-5 grid gap-4", gridColumnClass[gridColumns])}>
                  {visibleStyles.map((style, index) => (
                    <CoreStyleCard
                      index={index}
                      isSelected={!customPreset && selectedSlug === style.slug}
                      key={style.slug}
                      onSelect={setSelectedSlug}
                      style={style}
                      styleDetailHref={withCatalogState(`/styles/${style.slug}`, catalogStateQuery)}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-6 overflow-hidden border border-[var(--specimen-line)]">
                  {visibleStyles.map((style, index) => (
                    <CoreStyleRow
                      index={index}
                      isSelected={!customPreset && selectedSlug === style.slug}
                      key={style.slug}
                      onSelect={setSelectedSlug}
                      style={style}
                      styleDetailHref={withCatalogState(`/styles/${style.slug}`, catalogStateQuery)}
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="mt-6 border border-[var(--specimen-line)] p-6">
                <p className="raw-label text-[var(--specimen-ink-55)]">No matching styles</p>
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

function StyleMetric({
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

function StyleMobileFilters({
  activeCategory,
  activeDensity,
  activeEffect,
  activeFilterCount,
  categoryCounts,
  categoryHref,
  filterSummary,
  hasFilters,
  locale,
  onDensityChange,
  onEffectChange,
  onReset,
}: {
  activeCategory: string;
  activeDensity: string;
  activeEffect: string;
  activeFilterCount: number;
  categoryCounts: Array<{ category: string; count: number }>;
  categoryHref: (category: string | null) => string;
  filterSummary: string;
  hasFilters: boolean;
  locale: "en" | "ko";
  onDensityChange: (density: StyleDensity | null) => void;
  onEffectChange: (effect: StyleEffect | null) => void;
  onReset: () => void;
}) {
  const stateText = activeFilterCount
    ? locale === "ko"
      ? `${activeFilterCount}개 적용`
      : `${activeFilterCount} active`
    : locale === "ko"
      ? "전체 보기"
      : "All";
  const summaryText = filterSummary || (locale === "ko" ? "전체 스타일" : "All styles");

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
            <LocalizedLink
              aria-pressed={activeCategory === "all"}
              className={styleMobileFilterChipClass(activeCategory === "all")}
              href={categoryHref(null)}
            >
              <span>{locale === "ko" ? "전체" : "All"}</span>
              <span className="font-mono opacity-70">{designStyles.length}</span>
            </LocalizedLink>
            {categoryCounts.map(({ category, count }) => (
              <LocalizedLink
                aria-pressed={activeCategory === category}
                className={styleMobileFilterChipClass(activeCategory === category)}
                href={categoryHref(category)}
                key={category}
              >
                <span>{styleCategoryLabel(category, locale)}</span>
                <span className="font-mono opacity-70">{count}</span>
              </LocalizedLink>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <p className="raw-label text-[var(--specimen-ink-55)]">
            {locale === "ko" ? "밀도" : "Density"}
          </p>
          <div className="specimen-scrollbar -mx-1 flex min-w-0 max-w-full gap-1.5 overflow-x-auto px-1 pb-1">
            {densityOptions.map((density) => (
              <button
                aria-pressed={activeDensity === density}
                className={styleMobileFilterChipClass(activeDensity === density)}
                key={density}
                onClick={() => onDensityChange(activeDensity === density ? null : density)}
                type="button"
              >
                {densityDisplayLabel(density, locale)}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <p className="raw-label text-[var(--specimen-ink-55)]">
            {locale === "ko" ? "효과" : "Effect"}
          </p>
          <div className="specimen-scrollbar -mx-1 flex min-w-0 max-w-full gap-1.5 overflow-x-auto px-1 pb-1">
            {effectOptions.map((effect) => (
              <button
                aria-pressed={activeEffect === effect}
                className={styleMobileFilterChipClass(activeEffect === effect)}
                key={effect}
                onClick={() => onEffectChange(activeEffect === effect ? null : effect)}
                type="button"
              >
                {effectDisplayLabel(effect, locale)}
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

function styleMobileFilterChipClass(active: boolean) {
  return cn(
    "specimen-button specimen-button-tiny shrink-0 gap-2 whitespace-nowrap px-2.5",
    active ? "specimen-button-primary" : "specimen-button-secondary",
  );
}

function CoreStyleCard({
  index,
  isSelected,
  onSelect,
  style,
  styleDetailHref,
}: {
  index: number;
  isSelected: boolean;
  onSelect: (slug: string) => void;
  style: DesignStyle;
  styleDetailHref: string;
}) {
  const locale = useLocale();
  const localizedStyle = designStyleForLocale(style, locale);

  return (
    <article
      className={cn(
        "group border bg-[rgb(251_250_246_/_0.58)] transition",
        isSelected
          ? "border-[var(--specimen-ink)]"
          : "border-[var(--specimen-line)] hover:border-[var(--specimen-ink)]",
      )}
    >
      <div className="border-b border-[var(--specimen-line)] p-2">
        <div className="relative aspect-[16/7] overflow-hidden border border-[var(--specimen-line-soft)] bg-[var(--specimen-card)]">
          <DesignStyleSampleRenderer compact style={localizedStyle} />
          <LocalizedLink
            aria-label={locale === "ko" ? `${localizedStyle.nameKo} 자세히 보기` : `View ${localizedStyle.nameEn} details`}
            className="absolute inset-0 z-20 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--specimen-ink)]"
            href={styleDetailHref}
          >
            <span className="sr-only">{locale === "ko" ? "자세히 보기" : "View details"}</span>
          </LocalizedLink>
        </div>
      </div>
      <div className="space-y-3 p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--specimen-ink-55)]">
            S-{String(index + 11).padStart(3, "0")} / {String(designStyles.length).padStart(3, "0")}
          </p>
          <p className="raw-label text-[var(--specimen-ink-55)]">{localizedStyle.category}</p>
        </div>
        <div>
          <h2 className="text-base font-bold leading-tight text-[var(--specimen-ink)]">{localizedStyle.nameKo}</h2>
          {localizedStyle.nameEn !== localizedStyle.nameKo ? (
            <p className="mt-0.5 text-[12px] text-[var(--specimen-ink-55)]">{localizedStyle.nameEn}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <SpecimenTinyChip>{densityDisplayLabel(style.tokens.space.density, locale)}</SpecimenTinyChip>
          <SpecimenTinyChip>{effectDisplayLabel(style.tokens.decoration.effect, locale)}</SpecimenTinyChip>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            className={cn(
              "specimen-button specimen-button-sm",
              isSelected
                ? "is-active"
                : "specimen-button-secondary",
            )}
            onClick={() => onSelect(style.slug)}
            type="button"
          >
            {isSelected ? "Applied" : "Apply"}
          </button>
          <div className="flex gap-1.5">
            <LocalizedLink className="specimen-button specimen-button-sm specimen-button-quiet" href={styleDetailHref}>
              Detail
            </LocalizedLink>
            <LocalizedLink className="specimen-button specimen-button-sm specimen-button-quiet" href={`/studio?style=${style.slug}`}>
              Studio
            </LocalizedLink>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--specimen-line)] px-2 py-1.5">
        <ColorPaletteGrid compact palette={style.palette} />
      </div>
    </article>
  );
}

function CoreStyleRow({
  index,
  isSelected,
  onSelect,
  style,
  styleDetailHref,
}: {
  index: number;
  isSelected: boolean;
  onSelect: (slug: string) => void;
  style: DesignStyle;
  styleDetailHref: string;
}) {
  const locale = useLocale();
  const localizedStyle = designStyleForLocale(style, locale);

  return (
    <div className="grid grid-cols-[48px_minmax(0,1fr)] border-b border-[var(--specimen-line)] last:border-b-0 md:grid-cols-[56px_minmax(0,1.2fr)_minmax(120px,0.7fr)_148px]">
      <div className="row-span-2 border-r border-[var(--specimen-line)] p-3 font-mono text-[11px] text-[var(--specimen-ink-55)] md:row-span-1">
        {String(index + 1).padStart(3, "0")}
      </div>
      <div className="min-w-0 p-3 md:border-r md:border-[var(--specimen-line)]">
        <h2 className="truncate text-sm font-bold text-[var(--specimen-ink)]">{localizedStyle.nameKo}</h2>
        <p className="mt-1 truncate text-[12px] text-[var(--specimen-ink-55)]">{localizedStyle.summary}</p>
      </div>
      <div className="border-t border-[var(--specimen-line)] p-3 md:border-r md:border-t-0">
        <p className="raw-label truncate text-[var(--specimen-ink-55)]">{localizedStyle.category}</p>
        <p className="mt-2 text-[12px] text-[var(--specimen-ink-55)]">
          {densityDisplayLabel(style.tokens.space.density, locale)} · {effectDisplayLabel(style.tokens.decoration.effect, locale)}
        </p>
      </div>
      <div className="col-span-2 flex flex-wrap items-center gap-3 border-t border-[var(--specimen-line)] p-3 md:col-span-1 md:border-t-0">
        <button
          className={cn(
            "specimen-button specimen-button-tiny",
            isSelected ? "is-active" : "specimen-button-secondary",
          )}
          onClick={() => onSelect(style.slug)}
          type="button"
        >
          {isSelected ? "Applied" : "Apply"}
        </button>
        <LocalizedLink
          className="specimen-button specimen-button-tiny specimen-button-quiet"
          href={styleDetailHref}
        >
          Open
        </LocalizedLink>
        <LocalizedLink
          className="specimen-button specimen-button-tiny specimen-button-quiet"
          href={`/studio?style=${style.slug}`}
        >
          Use
        </LocalizedLink>
      </div>
    </div>
  );
}

function densityDots(density: StyleDensity) {
  if (density === "airy") return ". . .";
  if (density === "tight") return "...";
  return ".. .";
}

function densityDisplayLabel(density: StyleDensity, locale: "en" | "ko") {
  return locale === "ko" ? densityLabelKo[density] : densityLabel[density];
}

function effectDisplayLabel(effect: StyleEffect, locale: "en" | "ko") {
  return locale === "ko" ? effectLabelKo[effect] : effectLabel[effect];
}

function normalizeGridColumns(value: string | null): StyleGridColumns {
  return gridColumnOptions.includes(value as StyleGridColumns) ? value as StyleGridColumns : "2";
}

function gridColumnControlLabel(columns: StyleGridColumns) {
  return columns;
}

function gridColumnMetricLabel(columns: StyleGridColumns, locale: "en" | "ko") {
  return locale === "ko" ? `${columns}열 보기` : `${columns} columns`;
}

function withCatalogState(path: string, query: string) {
  return query ? `${path}?${query}` : path;
}

function styleCategoryFilterHref(
  category: string | null,
  activeCategory: string,
  searchParams: { toString(): string },
) {
  const next = new URLSearchParams(searchParams.toString());

  if (!category || activeCategory === category) {
    next.delete("category");
  } else {
    next.set("category", category);
  }

  const query = next.toString();
  return query ? `/styles?${query}` : "/styles";
}
