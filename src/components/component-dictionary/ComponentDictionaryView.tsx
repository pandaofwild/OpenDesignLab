"use client";

import { ComponentPreviewRenderer } from "@/components/component-dictionary/ComponentPreviewRenderer";
import { SpecimenCoreFrame, SpecimenTinyChip } from "@/components/specimen/SpecimenCoreFrame";
import {
  includesQuery,
  useCatalogUrlState,
} from "@/components/specimen/useCatalogUrlState";
import { styleTokenVars } from "@/components/style-preset/styleTokenVars";
import { componentSpecs, type ComponentSpec } from "@/data/componentSpecs";
import { designStyles } from "@/data/designStyles";
import type { Locale } from "@/lib/i18n";
import { componentSpecForLocale } from "@/lib/localizedContent";

export function ComponentDictionaryView({ locale }: { locale: Locale }) {
  const { q, searchParams, setParam, setQuery } = useCatalogUrlState();
  const requestedStyle = searchParams.get("style") ?? "brutalism";
  const style =
    designStyles.find((item) => item.slug === requestedStyle) ??
    designStyles.find((item) => item.slug === "brutalism") ??
    designStyles[0];
  const styleOptions = [style, ...designStyles.filter((item) => item.slug !== style.slug)].slice(0, 7);
  const visibleComponents = componentSpecs
    .map((component) => componentSpecForLocale(component, locale))
    .filter((component) =>
      includesQuery(
        [component.nameKo, component.nameEn, component.type, component.summary, component.slug],
        q,
      ),
    );

  return (
    <SpecimenCoreFrame
      active="components"
      appliedLabel={style.nameEn.toUpperCase()}
      label="Component dictionary"
      onSearchChange={setQuery}
      searchPlaceholder={locale === "ko" ? "컴포넌트 검색..." : "search components..."}
      searchValue={q}
    >
      <section
        className="style-preset-root min-h-[calc(100dvh-96px)] p-4 md:p-6"
        data-st-density={style.tokens.space.density}
        data-st-effect={style.tokens.decoration.effect}
        data-style-preset={style.slug}
        style={styleTokenVars(style)}
      >
        <div className="border-t border-[var(--specimen-ink)] pt-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="raw-display text-5xl leading-none md:text-[4.5rem]">
                  Components
                </h1>
                <p className="raw-label text-[var(--specimen-ink-55)]">
                  Token dictionary · {visibleComponents.length} / {componentSpecs.length} primitives
                </p>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--specimen-ink-55)]">
                {locale === "ko"
                  ? "스타일이 적용되는 순간 primitive가 다시 렌더링됩니다. 왼쪽 스펙은 중립적으로 유지되고, 오른쪽 프리뷰는 스타일 토큰을 상속합니다."
                  : "Every primitive re-renders the moment a style is applied. The spec on the left stays neutral, while the preview on the right inherits the style tokens."}
              </p>
            </div>
            <div className="inline-flex h-8 items-center gap-2 border border-[var(--specimen-ink)] px-3">
              <span className="h-2 w-2 bg-[var(--specimen-signal)]" />
              <span className="raw-label text-[var(--specimen-ink)]">
                Rendered in · {style.nameEn}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {styleOptions.map((option) => (
              <SpecimenTinyChip
                active={option.slug === style.slug}
                key={option.slug}
                onClick={() => setParam("style", option.slug)}
              >
                {locale === "ko" ? option.nameKo : option.nameEn}
              </SpecimenTinyChip>
            ))}
          </div>

          <div className="mt-6 overflow-hidden border border-[var(--specimen-line)]">
            <div className="hidden grid-cols-[48px_minmax(200px,252px)_minmax(0,1fr)] border-b border-[var(--specimen-ink)] bg-[rgb(251_250_246_/_0.58)] md:grid">
              <TableHead>Idx</TableHead>
              <TableHead>Primitive · tokens</TableHead>
              <TableHead>Live preview</TableHead>
            </div>
            {visibleComponents.length ? (
              visibleComponents.map((component, index) => (
                <ComponentRow
                  component={component}
                  index={index}
                  key={component.slug}
                />
              ))
            ) : (
              <div className="p-6">
                <p className="raw-label text-[var(--specimen-ink-55)]">No matching components</p>
                <button
                  className="mt-4 h-9 border border-[var(--specimen-ink)] px-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em]"
                  onClick={() => setParam("q", null)}
                  type="button"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </SpecimenCoreFrame>
  );
}

function ComponentRow({ component, index }: { component: ComponentSpec; index: number }) {
  return (
    <div className="grid min-h-[124px] grid-cols-[48px_minmax(0,1fr)] border-b border-[var(--specimen-line)] last:border-b-0 md:grid-cols-[48px_minmax(200px,252px)_minmax(0,1fr)]">
      <div className="border-r border-[var(--specimen-line)] p-3 font-mono text-[13px] text-[var(--specimen-ink-55)]">
        C{String(index + 1).padStart(2, "0")}
      </div>
      <div className="p-3 md:border-r md:border-[var(--specimen-line)]">
        <h2 className="text-base font-bold leading-tight text-[var(--specimen-ink)]">{component.nameEn}</h2>
        <p className="text-[12px] text-[var(--specimen-ink-55)]">{component.nameKo}</p>
        <dl className="mt-4 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 font-mono text-[11px]">
          {tokensFor(component).map(([label, value]) => (
            <div className="contents" key={label}>
              <dt className="text-[var(--specimen-ink-55)]">{label}</dt>
              <dd className="text-right text-[var(--specimen-ink)]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="col-span-2 flex min-w-0 items-center border-t border-[var(--specimen-line)] p-4 md:col-span-1 md:border-t-0">
        <ComponentPreviewRenderer component={component} />
      </div>
    </div>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-r border-[var(--specimen-line)] px-3 py-2.5 raw-label text-[var(--specimen-ink-55)] last:border-r-0">
      {children}
    </div>
  );
}

function tokensFor(component: ComponentSpec) {
  if (component.type === "button") {
    return [
      ["padding", "10/16"],
      ["border", "2px solid"],
      ["shadow", "4px 4px 0"],
      ["radius", "0"],
    ];
  }

  if (component.type === "card") {
    return [
      ["surface", "#FFFFFF"],
      ["border", "2px solid"],
      ["shadow", "6px 6px 0"],
      ["radius", "0"],
    ];
  }

  if (component.type === "nav") {
    return [
      ["height", "52px"],
      ["border-b", "2px solid"],
      ["type", "mono"],
      ["gap", "14px"],
    ];
  }

  if (component.type === "input") {
    return [
      ["height", "44px"],
      ["border", "2px solid"],
      ["focus", "shadow 4/4"],
      ["radius", "0"],
    ];
  }

  return [
    ["case", "uppercase"],
    ["border", "2px solid"],
    ["tone", "accent"],
    ["radius", "0"],
  ];
}
