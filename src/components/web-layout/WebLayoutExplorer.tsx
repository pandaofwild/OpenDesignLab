"use client";

import { useMemo, useState } from "react";
import { webLayouts } from "@/data/webLayouts";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { useLocale } from "@/components/i18n/useLocale";
import { WebLayoutCard } from "@/components/web-layout/WebLayoutCard";
import { WebLayoutFilters } from "@/components/web-layout/WebLayoutFilters";
import { layoutForLocale } from "@/lib/localizedContent";

export function WebLayoutExplorer() {
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [purpose, setPurpose] = useState("");
  const [complexity, setComplexity] = useState("");

  const filteredLayouts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return webLayouts.filter((layout) => {
      const localizedLayout = layoutForLocale(layout, locale);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          localizedLayout.nameKo,
          localizedLayout.nameEn,
          localizedLayout.summary,
          localizedLayout.category,
          ...localizedLayout.bestFor,
          ...layout.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = category === "" || layout.category === category;
      const matchesPurpose = purpose === "" || layout.bestFor.includes(purpose);
      const matchesComplexity =
        complexity === "" || layout.complexity === complexity;

      return (
        matchesQuery && matchesCategory && matchesPurpose && matchesComplexity
      );
    });
  }, [category, complexity, locale, purpose, query]);

  function resetFilters() {
    setQuery("");
    setCategory("");
    setPurpose("");
    setComplexity("");
  }

  return (
    <div className="space-y-10">
      <WebLayoutFilters
        category={category}
        complexity={complexity}
        onCategoryChange={setCategory}
        onComplexityChange={setComplexity}
        onPurposeChange={setPurpose}
        onQueryChange={setQuery}
        onReset={resetFilters}
        purpose={purpose}
        query={query}
      />

      <div className="specimen-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="raw-label flex items-center gap-2 text-[var(--specimen-ink-55)]">
          <span className="specimen-bullet" aria-hidden="true" />
          {locale === "ko"
            ? `${filteredLayouts.length}개 레이아웃 표시 중`
            : `${filteredLayouts.length} layouts shown`}
        </p>
        <LocalizedLink
          className="specimen-button specimen-button-md specimen-button-secondary"
          href="/layouts/compare"
        >
          {locale === "ko" ? "레이아웃 비교하기" : "Compare layouts"}
        </LocalizedLink>
      </div>

      {filteredLayouts.length > 0 ? (
        <div className="grid gap-x-4 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {filteredLayouts.map((layout) => (
            <WebLayoutCard key={layout.slug} layout={layout} />
          ))}
        </div>
      ) : (
        <div className="specimen-surface p-12 text-center">
          <h2 className="raw-display text-4xl leading-none text-[var(--specimen-ink)]">
            {locale === "ko" ? "조건에 맞는 레이아웃이 없습니다." : "No matching layouts"}
          </h2>
          <p className="mt-4 text-sm text-[var(--specimen-ink-55)]">
            {locale === "ko"
              ? "검색어를 줄이거나 필터를 초기화해 다시 탐색하세요."
              : "Try a broader search or reset the filters."}
          </p>
        </div>
      )}
    </div>
  );
}
