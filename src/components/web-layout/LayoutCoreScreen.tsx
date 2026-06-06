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

  const visibleLayouts = filteredLayouts.slice(0, view === "list" ? 32 : 24);
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
      <div className="grid min-h-[calc(100dvh-96px)] lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="space-y-7 border-b border-[var(--specimen-line)] p-4 lg:border-b-0 lg:border-r">
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
                    "flex w-full items-center gap-2.5 text-left text-[13px]",
                    activeComplexity === complexity
                      ? "font-bold text-[var(--specimen-ink)]"
                      : "text-[var(--specimen-ink-55)]",
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
              className="h-8 border border-[var(--specimen-line)] px-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--specimen-ink-55)] hover:border-[var(--specimen-ink)] hover:text-[var(--specimen-ink)]"
              onClick={resetFilters}
              type="button"
            >
              Reset filters
            </button>
          ) : null}
        </aside>

        <section className="min-w-0 p-4 md:p-6">
          <div className="border-t border-[var(--specimen-ink)] pt-7">
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
                  Sort complexity
                </SpecimenTinyChip>
                <SpecimenTinyChip active={sort === "name"} onClick={() => setParam("sort", "name")}>
                  Name
                </SpecimenTinyChip>
                <SpecimenTinyChip active={sort === "category"} onClick={() => setParam("sort", "category")}>
                  Category
                </SpecimenTinyChip>
                <SpecimenTinyChip active={view === "grid"} onClick={() => setParam("view", null)}>
                  Grid
                </SpecimenTinyChip>
                <SpecimenTinyChip active={view === "list"} onClick={() => setParam("view", "list")}>
                  List
                </SpecimenTinyChip>
              </div>
            </div>

            {visibleLayouts.length ? (
              view === "grid" ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                  className="mt-4 h-9 border border-[var(--specimen-ink)] px-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em]"
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
    <article className="group border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.58)] transition hover:border-[var(--specimen-ink)]">
      <div className="border-b border-[var(--specimen-line)] p-2">
        <div className="relative aspect-[5/3] overflow-hidden border border-[var(--specimen-line-soft)] bg-[var(--specimen-card)] p-1.5">
          <WireframeThumbnail layout={localizedLayout} />
          <LocalizedLink
            className="absolute right-3 top-3 bg-[var(--specimen-ink)] px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--specimen-paper)]"
            href={`/studio?layout=${layout.slug}`}
          >
            Use
          </LocalizedLink>
        </div>
      </div>
      <div className="space-y-2.5 p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-[11px] font-bold tracking-[0.14em] text-[var(--specimen-ink-55)]">
            {String(index + 12).padStart(3, "0")} / {String(webLayouts.length).padStart(3, "0")}
          </p>
          <span className="font-mono text-base leading-none">...</span>
        </div>
        <div>
          <h2 className="text-[15px] font-bold leading-tight text-[var(--specimen-ink)]">{localizedLayout.nameKo}</h2>
          {localizedLayout.nameEn !== localizedLayout.nameKo ? (
            <p className="mt-0.5 text-[12px] text-[var(--specimen-ink-55)]">{localizedLayout.nameEn}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <SpecimenTinyChip>{localizedLayout.category}</SpecimenTinyChip>
          <LocalizedLink
            className="inline-flex border border-[var(--specimen-line)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--specimen-signal)] hover:border-[var(--specimen-signal)]"
            href={`/layouts/${layout.slug}`}
          >
            Detail
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
    <div className="grid grid-cols-[48px_minmax(0,1fr)] border-b border-[var(--specimen-line)] last:border-b-0 md:grid-cols-[56px_minmax(0,1.3fr)_minmax(120px,0.7fr)_120px]">
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
          {formatComplexity(layout.complexity, locale)}
        </p>
      </div>
      <div className="col-span-2 flex items-center gap-3 border-t border-[var(--specimen-line)] p-3 md:col-span-1 md:border-t-0">
        <LocalizedLink
          className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--specimen-signal)]"
          href={`/layouts/${layout.slug}`}
        >
          Open
        </LocalizedLink>
        <LocalizedLink
          className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--specimen-ink)]"
          href={`/studio?layout=${layout.slug}`}
        >
          Use
        </LocalizedLink>
      </div>
    </div>
  );
}
