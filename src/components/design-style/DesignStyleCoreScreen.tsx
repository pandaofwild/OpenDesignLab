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

export function DesignStyleCoreScreen() {
  const locale = useLocale();
  const { activePreset, customPreset, selectedSlug, setSelectedSlug } = useStylePreset();
  const { q, searchParams, setParam, setQuery } = useCatalogUrlState();
  const activeCategory = searchParams.get("category") ?? "all";
  const activeDensity = searchParams.get("density") ?? "all";
  const activeEffect = searchParams.get("effect") ?? "all";
  const sort = searchParams.get("sort") ?? "category";
  const view = searchParams.get("view") === "list" ? "list" : "grid";

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

  const visibleStyles = filteredStyles.slice(0, view === "list" ? 40 : 24);
  const hasFilters =
    Boolean(q) ||
    activeCategory !== "all" ||
    activeDensity !== "all" ||
    activeEffect !== "all" ||
    sort !== "category" ||
    view !== "grid";

  function resetFilters() {
    setParam("q", null, {
      clear: ["category", "density", "effect", "sort", "view"],
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
      <div className="grid min-h-[calc(100dvh-96px)] lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="space-y-7 border-b border-[var(--specimen-line)] p-4 lg:border-b-0 lg:border-r">
          <SpecimenSideSection title={locale === "ko" ? "카테고리" : "Category"}>
            <div className="space-y-2.5">
              <SpecimenOptionRow
                active={activeCategory === "all"}
                count={designStyles.length}
                label={locale === "ko" ? "전체 스타일" : "All styles"}
                onClick={() => setParam("category", null)}
              />
              {categoryCounts.map(({ category, count }) => (
                <SpecimenOptionRow
                  active={activeCategory === category}
                  count={count}
                  key={category}
                  label={styleCategoryLabel(category, locale)}
                  onClick={() => setParam("category", activeCategory === category ? null : category)}
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
                    "flex w-full items-center gap-2.5 text-left text-[13px]",
                    activeDensity === density
                      ? "font-bold text-[var(--specimen-ink)]"
                      : "text-[var(--specimen-ink-55)]",
                  )}
                  key={density}
                  onClick={() => setParam("density", activeDensity === density ? null : density)}
                  type="button"
                >
                  <span className="font-mono text-base leading-none">{densityDots(density)}</span>
                  <span>{densityLabel[density]}</span>
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
                  {effectLabel[effect]}
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
                  Design Styles
                </h1>
                <p className="raw-label text-[var(--specimen-ink-55)]">
                  {String(filteredStyles.length).padStart(3, "0")} shown /{" "}
                  {String(designStyles.length).padStart(3, "0")} styles
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 raw-label text-[var(--specimen-ink-55)]">
                <SpecimenTinyChip active={sort === "category"} onClick={() => setParam("sort", "category")}>
                  Sort category
                </SpecimenTinyChip>
                <SpecimenTinyChip active={sort === "name"} onClick={() => setParam("sort", "name")}>
                  Name
                </SpecimenTinyChip>
                <SpecimenTinyChip active={sort === "density"} onClick={() => setParam("sort", "density")}>
                  Density
                </SpecimenTinyChip>
                <SpecimenTinyChip active={view === "grid"} onClick={() => setParam("view", null)}>
                  Grid
                </SpecimenTinyChip>
                <SpecimenTinyChip active={view === "list"} onClick={() => setParam("view", "list")}>
                  List
                </SpecimenTinyChip>
              </div>
            </div>

            {visibleStyles.length ? (
              view === "grid" ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {visibleStyles.map((style, index) => (
                    <CoreStyleCard
                      index={index}
                      isSelected={!customPreset && selectedSlug === style.slug}
                      key={style.slug}
                      onSelect={setSelectedSlug}
                      style={style}
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
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="mt-6 border border-[var(--specimen-line)] p-6">
                <p className="raw-label text-[var(--specimen-ink-55)]">No matching styles</p>
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

function CoreStyleCard({
  index,
  isSelected,
  onSelect,
  style,
}: {
  index: number;
  isSelected: boolean;
  onSelect: (slug: string) => void;
  style: DesignStyle;
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
        <ColorPaletteGrid compact palette={style.palette} />
        <div className="mt-2 aspect-[16/7] overflow-hidden border border-[var(--specimen-line-soft)] bg-[var(--specimen-card)]">
          <DesignStyleSampleRenderer compact style={localizedStyle} />
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
          <p className="font-mono text-base font-bold leading-none">Aa</p>
          <h2 className="mt-2 text-base font-bold leading-tight text-[var(--specimen-ink)]">{localizedStyle.nameKo}</h2>
          {localizedStyle.nameEn !== localizedStyle.nameKo ? (
            <p className="mt-0.5 text-[12px] text-[var(--specimen-ink-55)]">{localizedStyle.nameEn}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <SpecimenTinyChip>{densityLabel[style.tokens.space.density]}</SpecimenTinyChip>
          <SpecimenTinyChip>{effectLabel[style.tokens.decoration.effect]}</SpecimenTinyChip>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            className={cn(
              "h-8 border px-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition",
              isSelected
                ? "border-[var(--specimen-ink)] bg-[var(--specimen-ink)] text-[var(--specimen-paper)]"
                : "border-[var(--specimen-ink)] bg-transparent text-[var(--specimen-ink)] hover:bg-[var(--specimen-ink)] hover:text-[var(--specimen-paper)]",
            )}
            onClick={() => onSelect(style.slug)}
            type="button"
          >
            {isSelected ? "Applied" : "Apply"}
          </button>
          <div className="flex gap-2">
            <LocalizedLink
              className="raw-label text-[var(--specimen-signal)] hover:underline"
              href={`/styles/${style.slug}`}
            >
              Detail
            </LocalizedLink>
            <LocalizedLink
              className="raw-label text-[var(--specimen-ink)] hover:underline"
              href={`/studio?style=${style.slug}`}
            >
              Studio
            </LocalizedLink>
          </div>
        </div>
      </div>
    </article>
  );
}

function CoreStyleRow({
  index,
  isSelected,
  onSelect,
  style,
}: {
  index: number;
  isSelected: boolean;
  onSelect: (slug: string) => void;
  style: DesignStyle;
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
          {densityLabel[style.tokens.space.density]} · {effectLabel[style.tokens.decoration.effect]}
        </p>
      </div>
      <div className="col-span-2 flex flex-wrap items-center gap-3 border-t border-[var(--specimen-line)] p-3 md:col-span-1 md:border-t-0">
        <button
          className={cn(
            "font-mono text-[10px] font-bold uppercase tracking-[0.12em]",
            isSelected ? "text-[var(--specimen-ink)]" : "text-[var(--specimen-signal)]",
          )}
          onClick={() => onSelect(style.slug)}
          type="button"
        >
          {isSelected ? "Applied" : "Apply"}
        </button>
        <LocalizedLink
          className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--specimen-signal)]"
          href={`/styles/${style.slug}`}
        >
          Open
        </LocalizedLink>
        <LocalizedLink
          className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--specimen-ink)]"
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
