"use client";

import { getLayoutsBySlugs } from "@/data/webLayouts";
import { useLocale } from "@/components/i18n/useLocale";
import { WebLayoutCard } from "@/components/web-layout/WebLayoutCard";

type RelatedLayoutsProps = {
  slugs: string[];
};

export function RelatedLayouts({ slugs }: RelatedLayoutsProps) {
  const locale = useLocale();
  const layouts = getLayoutsBySlugs(slugs);

  if (layouts.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-layouts-title" className="space-y-4">
      <div>
        <p className="raw-label flex items-center gap-2 text-[var(--specimen-signal)]">
          <span className="specimen-bullet" aria-hidden="true" />
          {locale === "ko" ? "연결된 구조" : "Adjacent structures"}
        </p>
        <h2
          className="raw-display mt-3 text-5xl leading-[0.86] text-[var(--specimen-ink)] md:text-6xl"
          id="related-layouts-title"
        >
          {locale === "ko" ? "비슷한 레이아웃 추천" : "Related layouts"}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--specimen-ink-55)]">
          {locale === "ko"
            ? "같은 previewType, 카테고리, 구현 난이도를 기준으로 가까운 구조를 추천합니다."
            : "Explore nearby structures based on preview type, category, and implementation level."}
        </p>
      </div>
      <div className="grid gap-x-4 gap-y-16 md:grid-cols-3">
        {layouts.map((layout) => (
          <WebLayoutCard compact key={layout.slug} layout={layout} />
        ))}
      </div>
    </section>
  );
}
