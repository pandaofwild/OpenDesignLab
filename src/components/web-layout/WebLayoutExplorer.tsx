"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { webLayouts } from "@/data/webLayouts";
import { WebLayoutCard } from "@/components/web-layout/WebLayoutCard";
import { WebLayoutFilters } from "@/components/web-layout/WebLayoutFilters";

export function WebLayoutExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [purpose, setPurpose] = useState("");
  const [complexity, setComplexity] = useState("");

  const filteredLayouts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return webLayouts.filter((layout) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          layout.nameKo,
          layout.nameEn,
          layout.summary,
          layout.category,
          ...layout.bestFor,
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
  }, [category, complexity, purpose, query]);

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

      <div className="flex flex-col gap-3 border-y border-[#1E1E1E]/20 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="raw-label text-[#1E1E1E]/62">
          {filteredLayouts.length}개 레이아웃 표시 중
        </p>
        <Link
          className="inline-flex h-11 items-center justify-center border border-[#1E1E1E] bg-transparent px-4 text-sm font-bold uppercase tracking-[0.1em] text-[#1E1E1E] transition hover:bg-[#1E1E1E] hover:text-[#E4E2DD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E]"
          href="/web-layouts/compare"
        >
          레이아웃 비교하기
        </Link>
      </div>

      {filteredLayouts.length > 0 ? (
        <div className="grid gap-x-4 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {filteredLayouts.map((layout) => (
            <WebLayoutCard key={layout.slug} layout={layout} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-[#1E1E1E]/35 bg-[#D9D6D0] p-12 text-center">
          <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-[-0.05em] text-[#1E1E1E]">
            조건에 맞는 레이아웃이 없습니다.
          </h2>
          <p className="mt-4 text-sm text-[#1E1E1E]/65">
            검색어를 줄이거나 필터를 초기화해 다시 탐색하세요.
          </p>
        </div>
      )}
    </div>
  );
}
