"use client";

import { designStyleCategories, designStyleTags } from "@/data/designStyles";
import { useLocale } from "@/components/i18n/useLocale";
import { styleCategoryLabel } from "@/lib/localizedContent";

type Props = {
  category: string;
  onCategoryChange: (category: string) => void;
  onQueryChange: (query: string) => void;
  onReset: () => void;
  onTagChange: (tag: string) => void;
  query: string;
  tag: string;
};

export function DesignStyleFilters({
  category,
  onCategoryChange,
  onQueryChange,
  onReset,
  onTagChange,
  query,
  tag,
}: Props) {
  const locale = useLocale();

  return (
    <section className="border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] p-4">
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr_auto]">
        <label className="block">
          <span className="raw-label text-[var(--specimen-ink-55)]">
            {locale === "ko" ? "검색" : "Search"}
          </span>
          <input
            className="raw-field mt-2 h-11 w-full px-3 text-sm outline-none transition"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={
              locale === "ko"
                ? "스타일명, 분위기, 업종 검색"
                : "Search by style, mood, or industry"
            }
            value={query}
          />
        </label>
        <label className="block">
          <span className="raw-label text-[var(--specimen-ink-55)]">
            {locale === "ko" ? "카테고리" : "Category"}
          </span>
          <select
            className="raw-field mt-2 h-11 w-full px-3 text-sm outline-none transition"
            onChange={(event) => onCategoryChange(event.target.value)}
            value={category}
          >
            <option value="">{locale === "ko" ? "전체 카테고리" : "All categories"}</option>
            {designStyleCategories.map((item) => (
              <option key={item} value={item}>
                {styleCategoryLabel(item, locale)}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="raw-label text-[var(--specimen-ink-55)]">
            {locale === "ko" ? "태그" : "Tag"}
          </span>
          <select
            className="raw-field mt-2 h-11 w-full px-3 text-sm outline-none transition"
            onChange={(event) => onTagChange(event.target.value)}
            value={tag}
          >
            <option value="">{locale === "ko" ? "전체 태그" : "All tags"}</option>
            {designStyleTags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <button
          className="h-11 self-end border border-[var(--specimen-line)] px-4 font-mono text-xs font-bold uppercase tracking-[0.14em] transition hover:border-[var(--specimen-ink)] hover:bg-[var(--specimen-ink)] hover:text-[var(--specimen-paper)]"
          onClick={onReset}
          type="button"
        >
          {locale === "ko" ? "초기화" : "Reset"}
        </button>
      </div>
    </section>
  );
}
