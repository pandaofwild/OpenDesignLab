"use client";

import { useMemo, useState } from "react";
import { webLayouts, type WebLayout } from "@/data/webLayouts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WireframeThumbnail } from "@/components/web-layout/WireframeThumbnail";
import { cn, complexityTone, formatComplexity } from "@/lib/utils";

const defaultSelection = webLayouts.slice(0, 3).map((layout) => layout.slug);

function densityFor(layout: WebLayout) {
  if (["dashboard", "docs", "comparison", "feed"].includes(layout.previewType)) {
    return "높음";
  }

  if (["single-column", "hero", "split-screen"].includes(layout.previewType)) {
    return "낮음";
  }

  return "보통";
}

function mobileFitFor(layout: WebLayout) {
  if (layout.previewType === "three-column" || layout.previewType === "dashboard") {
    return "재구성 필요";
  }

  if (layout.previewType === "feed" || layout.previewType === "single-column") {
    return "강함";
  }

  return "규칙 필요";
}

export function WebLayoutCompare() {
  const [selectedSlugs, setSelectedSlugs] = useState(defaultSelection);

  const selectedLayouts = useMemo(
    () =>
      selectedSlugs
        .map((slug) => webLayouts.find((layout) => layout.slug === slug))
        .filter((layout): layout is WebLayout => Boolean(layout)),
    [selectedSlugs],
  );

  function toggleLayout(slug: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, slug];
    });
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">
              비교할 레이아웃 선택
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              최대 3개까지 선택할 수 있습니다. 현재 {selectedLayouts.length}개 선택됨.
            </p>
          </div>
          <Button onClick={() => setSelectedSlugs([])} variant="secondary">
            선택 해제
          </Button>
        </div>
        <div className="mt-5 grid max-h-[360px] gap-2 overflow-auto pr-2 sm:grid-cols-2 lg:grid-cols-3">
          {webLayouts.map((layout) => {
            const checked = selectedSlugs.includes(layout.slug);
            const disabled = !checked && selectedSlugs.length >= 3;

            return (
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-md border p-3 transition",
                  checked
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300",
                  disabled ? "cursor-not-allowed opacity-50" : "",
                )}
                key={layout.slug}
              >
                <input
                  checked={checked}
                  className="h-4 w-4"
                  disabled={disabled}
                  onChange={() => toggleLayout(layout.slug)}
                  type="checkbox"
                />
                <span>
                  <span className="block text-sm font-semibold">{layout.nameKo}</span>
                  <span className={cn("block text-xs", checked ? "text-zinc-300" : "text-zinc-500")}>
                    {layout.nameEn}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </section>

      {selectedLayouts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center">
          <h2 className="text-lg font-semibold text-zinc-950">
            비교할 레이아웃을 선택하세요.
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            목록에서 최대 3개의 레이아웃을 선택하면 비교표가 표시됩니다.
          </p>
        </div>
      ) : (
        <section aria-label="레이아웃 비교 결과" className="space-y-5">
          <div
            className={cn(
              "grid gap-5",
              selectedLayouts.length === 1
                ? "lg:grid-cols-1"
                : selectedLayouts.length === 2
                  ? "lg:grid-cols-2"
                  : "lg:grid-cols-3",
            )}
          >
            {selectedLayouts.map((layout) => (
              <article
                className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
                key={layout.slug}
              >
                <div className="border-b border-zinc-200 bg-zinc-50 p-4">
                  <div className="h-32 rounded-md border border-zinc-200 bg-white p-2">
                    <WireframeThumbnail previewType={layout.previewType} />
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-950">
                      {layout.nameKo}
                    </h2>
                    <p className="text-sm text-zinc-500">{layout.nameEn}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{layout.category}</Badge>
                    <Badge className={complexityTone(layout.complexity)}>
                      {formatComplexity(layout.complexity)}
                    </Badge>
                  </div>
                  <ComparisonRow label="추천 용도" value={layout.bestFor.join(", ")} />
                  <ComparisonRow label="장점" value={layout.pros.slice(0, 2).join(" ")} />
                  <ComparisonRow label="단점" value={layout.cons.slice(0, 2).join(" ")} />
                  <ComparisonRow
                    label="모바일 대응"
                    value={`${mobileFitFor(layout)} - ${layout.responsiveBehavior[0]}`}
                  />
                  <ComparisonRow label="콘텐츠 밀도" value={densityFor(layout)} />
                  <ComparisonRow
                    label="구현 난이도"
                    value={`${formatComplexity(layout.complexity)} / ${layout.previewType}`}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ComparisonRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-normal text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm leading-6 text-zinc-700">{value}</dd>
    </div>
  );
}
