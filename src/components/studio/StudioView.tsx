"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { defaultDesignStyleSlug, designStyles } from "@/data/designStyles";
import { webLayouts } from "@/data/webLayouts";
import {
  SpecimenCoreFrame,
  SpecimenSideSection,
  SpecimenTinyChip,
} from "@/components/specimen/SpecimenCoreFrame";
import { ColorPaletteGrid } from "@/components/design-style/ColorPaletteGrid";
import { includesQuery } from "@/components/specimen/useCatalogUrlState";
import { styleTokenVars } from "@/components/style-preset/styleTokenVars";
import { LayoutPreviewRenderer } from "@/components/web-layout/LayoutPreviewRenderer";
import { exportDesignCode } from "@/lib/exportCode";
import { exportDesignPrompt } from "@/lib/exportPrompt";
import { localeFromPathname, withLocalePath } from "@/lib/i18n";
import { designStyleForLocale, layoutForLocale } from "@/lib/localizedContent";
import { cn } from "@/lib/utils";
import type { PreviewViewport } from "@/components/web-layout/ViewportSwitcher";

const DEFAULT_STYLE = defaultDesignStyleSlug;
const DEFAULT_LAYOUT = "hero-focused-layout";

function StudioViewInner() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [copied, setCopied] = useState<"code" | "prompt" | null>(null);
  const locale = localeFromPathname(pathname);

  const requestedStyleSlug = params.get("style") ?? DEFAULT_STYLE;
  const requestedLayoutSlug = params.get("layout") ?? DEFAULT_LAYOUT;
  const catalogQuery = params.get("q") ?? "";
  const viewport = (params.get("vp") === "mobile" || params.get("vp") === "tablet"
    ? params.get("vp")
    : "desktop") as PreviewViewport;

  const selectedStyle = useMemo(
    () =>
      designStyles.find((s) => s.slug === requestedStyleSlug) ??
      designStyles.find((s) => s.slug === DEFAULT_STYLE) ??
      designStyles[0],
    [requestedStyleSlug],
  );

  const selectedLayout = useMemo(
    () =>
      webLayouts.find((l) => l.slug === requestedLayoutSlug) ??
      webLayouts.find((l) => l.slug === DEFAULT_LAYOUT) ??
      webLayouts[0],
    [requestedLayoutSlug],
  );

  const localizedStyle = useMemo(
    () => designStyleForLocale(selectedStyle, locale),
    [locale, selectedStyle],
  );
  const localizedLayout = useMemo(
    () => layoutForLocale(selectedLayout, locale),
    [locale, selectedLayout],
  );
  const tokenVars = useMemo(() => styleTokenVars(selectedStyle), [selectedStyle]);
  const visibleStyleOptions = useMemo(
    () =>
      catalogQuery
        ? designStyles
            .filter((style) => {
              const item = designStyleForLocale(style, locale);
              return includesQuery(
                [style.nameKo, style.nameEn, style.category, item.nameKo, item.nameEn, item.category, ...style.tags],
                catalogQuery,
              );
            })
            .slice(0, 5)
        : prioritizeSelected(designStyles, selectedStyle, 3),
    [catalogQuery, locale, selectedStyle],
  );
  const visibleLayoutOptions = useMemo(
    () =>
      catalogQuery
        ? webLayouts
            .filter((layout) => {
              const item = layoutForLocale(layout, locale);
              return includesQuery(
                [
                  layout.nameKo,
                  layout.nameEn,
                  layout.category,
                  layout.summary,
                  item.nameKo,
                  item.nameEn,
                  item.category,
                  item.summary,
                  ...layout.tags,
                ],
                catalogQuery,
              );
            })
            .slice(0, 5)
        : prioritizeSelected(webLayouts, selectedLayout, 3),
    [catalogQuery, locale, selectedLayout],
  );

  useEffect(() => {
    const next = new URLSearchParams(params.toString());
    let changed = false;

    if (next.get("style") !== selectedStyle.slug) {
      next.set("style", selectedStyle.slug);
      changed = true;
    }

    if (next.get("layout") !== selectedLayout.slug) {
      next.set("layout", selectedLayout.slug);
      changed = true;
    }

    if (next.get("vp") !== viewport) {
      next.set("vp", viewport);
      changed = true;
    }

    if (changed) router.replace(`${withLocalePath("/studio", locale)}?${next.toString()}`, { scroll: false });
  }, [locale, params, router, selectedLayout.slug, selectedStyle.slug, viewport]);

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    router.replace(`${withLocalePath("/studio", locale)}?${next.toString()}`, { scroll: false });
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(exportDesignPrompt(localizedStyle, localizedLayout));
    setCopied("prompt");
    window.setTimeout(() => setCopied(null), 1400);
  }

  async function copyCode() {
    await navigator.clipboard.writeText(exportDesignCode(localizedStyle, localizedLayout));
    setCopied("code");
    window.setTimeout(() => setCopied(null), 1400);
  }

  return (
    <main className="min-h-screen bg-background px-3 py-4 text-[var(--specimen-ink)] lg:px-5">
      <SpecimenCoreFrame
        active="studio"
        appliedLabel={localizedStyle.nameEn.toUpperCase()}
        label="Studio · Style × Layout"
        onSearchChange={(value) => update("q", value)}
        searchPlaceholder={locale === "ko" ? "스타일 또는 레이아웃 검색..." : "search style or layout..."}
        searchValue={catalogQuery}
      >
        <div className="grid min-h-[calc(100dvh-96px)] lg:grid-cols-[258px_minmax(0,1fr)_300px]">
          <aside className="space-y-7 border-b border-[var(--specimen-line)] p-4 lg:border-b-0 lg:border-r">
            <SpecimenSideSection title="Style · 087">
              <div className="space-y-2">
                {visibleStyleOptions.length ? visibleStyleOptions.map((style, index) => {
                  const item = designStyleForLocale(style, locale);
                  const active = style.slug === selectedStyle.slug;

                  return (
                    <button
                      className={cn(
                        "grid w-full grid-cols-[34px_1fr_auto] items-center gap-2.5 border p-2.5 text-left transition",
                        active
                          ? "border-[var(--specimen-ink)] bg-[rgb(251_250_246_/_0.78)]"
                          : "border-[var(--specimen-line)] hover:border-[var(--specimen-ink)]",
                      )}
                      key={style.slug}
                      onClick={() => update("style", style.slug)}
                      type="button"
                    >
                      <span className="font-mono text-[11px] text-[var(--specimen-ink-55)]">
                        {String(index + 11).padStart(3, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-bold leading-tight">{item.nameKo}</span>
                        <span className="block truncate text-[11px] text-[var(--specimen-ink-55)]">
                          {item.nameEn}
                        </span>
                      </span>
                      <span className={cn("h-2 w-2", active ? "bg-[var(--specimen-signal)]" : "bg-transparent")} />
                    </button>
                  );
                }) : (
                  <p className="border border-[var(--specimen-line)] p-3 text-[12px] text-[var(--specimen-ink-55)]">
                    {locale === "ko" ? "일치하는 스타일이 없습니다." : "No matching styles."}
                  </p>
                )}
              </div>
            </SpecimenSideSection>

            <SpecimenSideSection title="Layout · 096">
              <div className="space-y-2">
                {visibleLayoutOptions.length ? visibleLayoutOptions.map((layout, index) => {
                  const item = layoutForLocale(layout, locale);
                  const active = layout.slug === selectedLayout.slug;

                  return (
                    <button
                      className={cn(
                        "grid w-full grid-cols-[34px_1fr_auto] items-center gap-2.5 border p-2.5 text-left transition",
                        active
                          ? "border-[var(--specimen-ink)] bg-[rgb(251_250_246_/_0.78)]"
                          : "border-[var(--specimen-line)] hover:border-[var(--specimen-ink)]",
                      )}
                      key={layout.slug}
                      onClick={() => update("layout", layout.slug)}
                      type="button"
                    >
                      <span className="font-mono text-[11px] text-[var(--specimen-ink-55)]">
                        {String(index + 12).padStart(3, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-bold leading-tight">{item.nameKo}</span>
                        <span className="block truncate text-[11px] text-[var(--specimen-ink-55)]">
                          {item.nameEn}
                        </span>
                      </span>
                      <span className={cn("h-2 w-2", active ? "bg-[var(--specimen-signal)]" : "bg-transparent")} />
                    </button>
                  );
                }) : (
                  <p className="border border-[var(--specimen-line)] p-3 text-[12px] text-[var(--specimen-ink-55)]">
                    {locale === "ko" ? "일치하는 레이아웃이 없습니다." : "No matching layouts."}
                  </p>
                )}
              </div>
            </SpecimenSideSection>

            <SpecimenSideSection title="Tokens">
              <dl className="grid grid-cols-[1fr_auto] gap-y-1.5 font-mono text-[11px]">
                <dt className="text-[var(--specimen-ink-55)]">--radius</dt>
                <dd>{selectedStyle.tokens.shape.radius}</dd>
                <dt className="text-[var(--specimen-ink-55)]">--border</dt>
                <dd>
                  {selectedStyle.tokens.shape.borderWidth} {selectedStyle.tokens.shape.borderStyle}
                </dd>
                <dt className="text-[var(--specimen-ink-55)]">--shadow</dt>
                <dd>{selectedStyle.tokens.decoration.shadow}</dd>
              </dl>
            </SpecimenSideSection>
          </aside>

          <section className="min-w-0 border-b border-[var(--specimen-line)] p-4 lg:border-b-0 lg:border-r lg:p-5">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="raw-display text-5xl leading-none md:text-[4.25rem]">Studio</h1>
                <p className="raw-label text-[var(--specimen-ink-55)]">
                  {localizedStyle.nameEn} × {localizedLayout.nameEn}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="raw-label flex items-center gap-2 text-[var(--specimen-ink-55)]">
                  <span className="h-3 w-3 rounded-full border border-[var(--specimen-signal)] p-0.5">
                    <span className="block h-full w-full rounded-full bg-[var(--specimen-signal)]" />
                  </span>
                  Live preview
                </p>
                {(["desktop", "tablet", "mobile"] as const).map((vp) => (
                  <button
                    className={cn(
                      "specimen-button specimen-button-sm",
                      viewport === vp
                        ? "is-active"
                        : "specimen-button-quiet",
                    )}
                    key={vp}
                    onClick={() => update("vp", vp)}
                    type="button"
                  >
                    {vp}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="style-preset-root studio-panel-transition min-h-[560px] overflow-hidden border border-[var(--specimen-line)] bg-[var(--st-base)] p-4"
              data-st-density={selectedStyle.tokens.space.density}
              data-st-effect={selectedStyle.tokens.decoration.effect}
              data-style-preset={selectedStyle.slug}
              key={`${selectedStyle.slug}-${selectedLayout.slug}-${viewport}`}
              style={tokenVars}
            >
              <LayoutPreviewRenderer
                denseContent={false}
                layout={localizedLayout}
                locale={locale}
                showLabels={false}
                viewport={viewport}
              />
            </div>
          </section>

          <aside className="space-y-6 p-4 lg:p-5">
            <SpecimenSideSection title="Export">
              <div className="flex gap-5 border-b border-[var(--specimen-ink)] pb-2.5 raw-label">
                <span className="text-[var(--specimen-ink)]">Prompt</span>
                <span className="text-[var(--specimen-ink-55)]">HTML</span>
                <span className="text-[var(--specimen-ink-55)]">CSS</span>
              </div>
              <pre className="studio-panel-transition mt-3 max-h-[440px] min-h-[360px] overflow-auto whitespace-pre-wrap bg-[var(--specimen-ink)] p-4 font-mono text-[11px] leading-6 text-[rgb(242_239_232_/_0.8)]" key={`prompt-${selectedStyle.slug}-${selectedLayout.slug}`}>
                {exportDesignPrompt(localizedStyle, localizedLayout)}
              </pre>
              <div className="mt-4 grid gap-3">
                <button
                  className="specimen-button specimen-button-md specimen-button-primary w-full"
                  onClick={copyPrompt}
                  type="button"
                >
                  {copied === "prompt" ? "Copied prompt" : "Copy prompt"}
                </button>
                <button
                  className="specimen-button specimen-button-md specimen-button-secondary w-full"
                  onClick={copyCode}
                  type="button"
                >
                  {copied === "code" ? "Copied code" : "Design.md"}
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <SpecimenTinyChip>{selectedStyle.tokens.space.density}</SpecimenTinyChip>
                <SpecimenTinyChip>{selectedLayout.previewType}</SpecimenTinyChip>
              </div>
            </SpecimenSideSection>
            <SpecimenSideSection title="Palette">
              <div className="studio-panel-transition border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.58)] p-2" key={`palette-${selectedStyle.slug}`}>
                <ColorPaletteGrid compact palette={selectedStyle.palette} />
              </div>
            </SpecimenSideSection>
          </aside>
        </div>
      </SpecimenCoreFrame>
    </main>
  );
}

export function StudioView() {
  return (
    <Suspense>
      <StudioViewInner />
    </Suspense>
  );
}

function prioritizeSelected<T extends { slug: string }>(items: T[], selected: T, limit: number) {
  return [selected, ...items.filter((item) => item.slug !== selected.slug)].slice(0, limit);
}
