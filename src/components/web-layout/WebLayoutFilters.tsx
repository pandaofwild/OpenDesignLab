"use client";

import { webLayoutCategories, webLayoutPurposes } from "@/data/webLayouts";
import { useLocale } from "@/components/i18n/useLocale";
import { Button } from "@/components/ui/button";
import { layoutCategoryLabel, phraseLabel } from "@/lib/localizedContent";
import { formatComplexity } from "@/lib/utils";

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
  const locale = useLocale();

  return (
    <section
      aria-label={locale === "ko" ? "레이아웃 필터" : "Layout filters"}
      className="border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] p-4"
    >
      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr_0.7fr_auto] lg:items-end">
        <Field label={locale === "ko" ? "검색" : "Search"} htmlFor="layout-query">
          <input
            className="raw-field h-11 w-full px-3 text-sm font-medium outline-none transition"
            id="layout-query"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={
              locale === "ko"
                ? "레이아웃명, 목적, 태그 검색"
                : "Search by layout, purpose, or tag"
            }
            type="search"
            value={query}
          />
        </Field>

        <Field label={locale === "ko" ? "카테고리" : "Category"} htmlFor="layout-category">
          <select
            className="raw-field h-11 w-full px-3 text-sm font-medium outline-none transition"
            id="layout-category"
            onChange={(event) => onCategoryChange(event.target.value)}
            value={category}
          >
            <option value="">{locale === "ko" ? "전체 카테고리" : "All categories"}</option>
            {webLayoutCategories.map((item) => (
              <option key={item} value={item}>
                {layoutCategoryLabel(item, locale)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={locale === "ko" ? "사용 목적" : "Purpose"} htmlFor="layout-purpose">
          <select
            className="raw-field h-11 w-full px-3 text-sm font-medium outline-none transition"
            id="layout-purpose"
            onChange={(event) => onPurposeChange(event.target.value)}
            value={purpose}
          >
            <option value="">{locale === "ko" ? "전체 목적" : "All purposes"}</option>
            {webLayoutPurposes.map((item) => (
              <option key={item} value={item}>
                {phraseLabel(item, locale)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={locale === "ko" ? "복잡도" : "Complexity"} htmlFor="layout-complexity">
          <select
            className="raw-field h-11 w-full px-3 text-sm font-medium outline-none transition"
            id="layout-complexity"
            onChange={(event) => onComplexityChange(event.target.value)}
            value={complexity}
          >
            <option value="">{locale === "ko" ? "전체" : "All"}</option>
            <option value="easy">{formatComplexity("easy", locale)}</option>
            <option value="medium">{formatComplexity("medium", locale)}</option>
            <option value="hard">{formatComplexity("hard", locale)}</option>
          </select>
        </Field>

        <Button className="w-full lg:w-auto" onClick={onReset} variant="secondary">
          {locale === "ko" ? "초기화" : "Reset"}
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
      <label className="raw-label mb-2 block text-[var(--specimen-ink-55)]" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}
