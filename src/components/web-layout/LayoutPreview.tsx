"use client";

import { useState } from "react";
import type { WebLayout } from "@/data/webLayouts";
import { useLocale } from "@/components/i18n/useLocale";
import { Button } from "@/components/ui/button";
import { LayoutPreviewRenderer } from "@/components/web-layout/LayoutPreviewRenderer";
import {
  type PreviewViewport,
  ViewportSwitcher,
} from "@/components/web-layout/ViewportSwitcher";
import { layoutForLocale } from "@/lib/localizedContent";
import { cn } from "@/lib/utils";

type LayoutPreviewProps = {
  layout: WebLayout;
};

const viewportSizes: Record<
  PreviewViewport,
  { width: number; height: number; label: string }
> = {
  desktop: { width: 960, height: 620, label: "960px" },
  tablet: { width: 720, height: 660, label: "720px" },
  mobile: { width: 390, height: 720, label: "390px" },
};

export function LayoutPreview({ layout }: LayoutPreviewProps) {
  const locale = useLocale();
  const localizedLayout = layoutForLocale(layout, locale);
  const [viewport, setViewport] = useState<PreviewViewport>("desktop");
  const [showGrid, setShowGrid] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [denseContent, setDenseContent] = useState(false);
  const size = viewportSizes[viewport];

  return (
    <section
      aria-labelledby="live-preview-title"
      className="specimen-surface min-w-0 p-4"
    >
      <div className="flex flex-col gap-4 border-b border-[var(--specimen-line)] pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2
            className="raw-label text-[var(--specimen-ink)]"
            id="live-preview-title"
          >
            {locale === "ko" ? "실제 라이브 프리뷰" : "Live preview"}
          </h2>
          <p className="mt-1 text-sm text-[var(--specimen-ink-55)]">
            {locale === "ko"
              ? `${localizedLayout.previewType} 템플릿, 현재 ${size.label}`
              : `${localizedLayout.previewType} template, ${size.label}`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ViewportSwitcher value={viewport} onChange={setViewport} />
          <ToggleButton checked={showGrid} onChange={setShowGrid}>
            Show grid
          </ToggleButton>
          <ToggleButton checked={showLabels} onChange={setShowLabels}>
            Show labels
          </ToggleButton>
          <ToggleButton checked={denseContent} onChange={setDenseContent}>
            Dense content
          </ToggleButton>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto pb-2">
        <div
          className="mx-auto overflow-hidden border border-[var(--specimen-line)] bg-[var(--specimen-card)] transition-[width] duration-300"
          style={{ width: size.width, maxWidth: "100%" }}
        >
          <div className="flex h-10 items-center gap-2 border-b border-[var(--specimen-line)] bg-[var(--specimen-card)] px-3">
            <span className="h-2.5 w-2.5 bg-[var(--specimen-signal)]" />
            <span className="h-2.5 w-2.5 bg-[var(--specimen-ink)]" />
            <span className="h-2.5 w-2.5 bg-[var(--specimen-ink-55)]" />
            <div className="ml-3 flex h-6 flex-1 items-center border border-[var(--specimen-line-soft)] bg-[var(--specimen-paper)] px-3 font-mono text-[11px] font-medium text-[var(--specimen-ink-55)]">
              web-layouts.local/{layout.slug}
            </div>
          </div>
          <div
            className={cn(
              "specimen-grid-bg relative overflow-hidden p-3",
              viewport === "mobile" ? "p-2" : "",
            )}
            style={{ height: size.height }}
          >
            {showGrid ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(216 67 27 / 0.16) 1px, transparent 1px), linear-gradient(90deg, rgb(216 67 27 / 0.16) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            ) : null}
            <div className="relative z-10">
              <LayoutPreviewRenderer
                denseContent={denseContent}
                layout={localizedLayout}
                locale={locale}
                showLabels={showLabels}
                viewport={viewport}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ToggleButtonProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
};

function ToggleButton({ checked, onChange, children }: ToggleButtonProps) {
  return (
    <Button
      aria-pressed={checked}
      className={cn(
        "gap-2",
        checked
          ? "border-[var(--specimen-ink)] bg-[var(--specimen-ink)] text-[var(--specimen-paper)]"
          : "",
      )}
      onClick={() => onChange(!checked)}
      size="sm"
      variant="secondary"
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-2.5 w-2.5",
          checked ? "bg-[var(--specimen-signal)]" : "bg-[rgb(24_22_15_/_0.24)]",
        )}
      />
      {children}
    </Button>
  );
}
