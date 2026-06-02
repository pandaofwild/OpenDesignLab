"use client";

import { webLayoutCategories, webLayoutPurposes } from "@/data/webLayouts";
import { Button } from "@/components/ui/button";

type WebLayoutFiltersProps = {
  query: string;
  category: string;
  purpose: string;
  complexity: string;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPurposeChange: (value: string) => void;
  onComplexityChange: (value: string) => void;
  onReset: () => void;
};

export function WebLayoutFilters({
  query,
  category,
  purpose,
  complexity,
  onQueryChange,
  onCategoryChange,
  onPurposeChange,
  onComplexityChange,
  onReset,
}: WebLayoutFiltersProps) {
  return (
    <section
      aria-label="레이아웃 필터"
      className="bg-[#D9D6D0] p-4"
    >
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr_0.7fr_auto] lg:items-end">
        <Field label="검색" htmlFor="layout-query">
          <input
            className="raw-field h-11 w-full px-3 text-sm font-medium outline-none transition"
            id="layout-query"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="레이아웃명, 목적, 태그 검색"
            type="search"
            value={query}
          />
        </Field>

        <Field label="카테고리" htmlFor="layout-category">
          <select
            className="raw-field h-11 w-full px-3 text-sm font-medium outline-none transition"
            id="layout-category"
            onChange={(event) => onCategoryChange(event.target.value)}
            value={category}
          >
            <option value="">전체 카테고리</option>
            {webLayoutCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field label="사용 목적" htmlFor="layout-purpose">
          <select
            className="raw-field h-11 w-full px-3 text-sm font-medium outline-none transition"
            id="layout-purpose"
            onChange={(event) => onPurposeChange(event.target.value)}
            value={purpose}
          >
            <option value="">전체 목적</option>
            {webLayoutPurposes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field label="복잡도" htmlFor="layout-complexity">
          <select
            className="raw-field h-11 w-full px-3 text-sm font-medium outline-none transition"
            id="layout-complexity"
            onChange={(event) => onComplexityChange(event.target.value)}
            value={complexity}
          >
            <option value="">전체</option>
            <option value="easy">쉬움</option>
            <option value="medium">보통</option>
            <option value="hard">어려움</option>
          </select>
        </Field>

        <Button className="w-full lg:w-auto" onClick={onReset} variant="secondary">
          초기화
        </Button>
      </div>
    </section>
  );
}

function Field({
  children,
  htmlFor,
  label,
}: {
  children: React.ReactNode;
  htmlFor: string;
  label: string;
}) {
  return (
    <div>
      <label className="raw-label mb-2 block text-[#1E1E1E]/70" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}
