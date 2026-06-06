"use client";

import { useMemo, useState } from "react";
import { designStyles } from "@/data/designStyles";
import { useLocale } from "@/components/i18n/useLocale";
import { useStylePreset } from "@/components/style-preset/StylePresetProvider";
import { DesignStyleCard } from "@/components/design-style/DesignStyleCard";
import { DesignStyleFilters } from "@/components/design-style/DesignStyleFilters";
import { designStyleForLocale } from "@/lib/localizedContent";

export function DesignStyleLibrary() {
  const locale = useLocale();
  const { customPreset, selectedSlug, setSelectedSlug } = useStylePreset();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");

  const filteredStyles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return designStyles.filter((style) => {
      const localizedStyle = designStyleForLocale(style, locale);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          localizedStyle.nameKo,
          localizedStyle.nameEn,
          localizedStyle.summary,
          localizedStyle.description,
          localizedStyle.category,
          ...style.tags,
          ...localizedStyle.goodFor,
          ...localizedStyle.useCases,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = category === "" || style.category === category;
      const matchesTag = tag === "" || style.tags.includes(tag);

      return matchesQuery && matchesCategory && matchesTag;
    });
  }, [category, locale, query, tag]);

  function resetFilters() {
    setQuery("");
    setCategory("");
    setTag("");
  }

  return (
    <div className="space-y-10">
      <DesignStyleFilters
        category={category}
        onCategoryChange={setCategory}
        onQueryChange={setQuery}
        onReset={resetFilters}
        onTagChange={setTag}
        query={query}
        tag={tag}
      />
      <div className="specimen-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="raw-label flex items-center gap-2 text-[var(--specimen-ink-55)]">
          <span className="specimen-bullet" aria-hidden="true" />
          {locale === "ko"
            ? `${filteredStyles.length}개 디자인 형식 표시 중`
            : `${filteredStyles.length} design styles shown`}
        </p>
        <p className="text-sm font-medium text-[var(--specimen-ink-55)]">
          {customPreset
            ? locale === "ko"
              ? "프롬프트 팔레트가 적용 중입니다."
              : "Prompt palette is applied."
            : locale === "ko"
              ? `${selectedSlug} 적용 중`
              : `${selectedSlug} applied`}
        </p>
      </div>
      {filteredStyles.length > 0 ? (
        <div className="grid gap-x-4 gap-y-14 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredStyles.map((style) => (
            <DesignStyleCard
              isSelected={!customPreset && selectedSlug === style.slug}
              key={style.slug}
              onSelect={setSelectedSlug}
              style={style}
            />
          ))}
        </div>
      ) : (
        <div className="specimen-surface p-8">
          <p className="raw-display text-5xl leading-none text-[var(--specimen-ink)]">
            No style
          </p>
          <p className="mt-4 text-sm leading-6 text-[var(--specimen-ink-55)]">
            {locale === "ko"
              ? "조건에 맞는 디자인 형식이 없습니다. 검색어나 필터를 초기화해 다시 확인하세요."
              : "No design styles match those filters. Try resetting the search."}
          </p>
        </div>
      )}
    </div>
  );
}
