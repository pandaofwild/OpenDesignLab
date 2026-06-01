"use client";

import { useState } from "react";
import type { WebLayout } from "@/data/webLayouts";
import { Button } from "@/components/ui/button";
import { LayoutPreviewRenderer } from "@/components/web-layout/LayoutPreviewRenderer";
import {
  type PreviewViewport,
  ViewportSwitcher,
} from "@/components/web-layout/ViewportSwitcher";
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
  const [viewport, setViewport] = useState<PreviewViewport>("desktop");
  const [showGrid, setShowGrid] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [denseContent, setDenseContent] = useState(false);
  const size = viewportSizes[viewport];

  return (
    <section
      aria-labelledby="live-preview-title"
      className="min-w-0 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2
            className="text-base font-semibold tracking-normal text-zinc-950"
            id="live-preview-title"
          >
            실제 라이브 프리뷰
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {layout.previewType} 템플릿, 현재 {size.label}
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
          className="mx-auto overflow-hidden rounded-lg border border-zinc-300 bg-zinc-100 shadow-xl transition-[width] duration-300"
          style={{ width: size.width, maxWidth: "100%" }}
        >
          <div className="flex h-10 items-center gap-2 border-b border-zinc-200 bg-white px-3">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-zinc-100 px-3 text-[11px] font-medium text-zinc-500">
              web-layouts.local/{layout.slug}
            </div>
          </div>
          <div
            className={cn(
              "relative overflow-hidden bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.12),transparent_26%),linear-gradient(180deg,#fafafa,#f4f4f5)] p-3",
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
                    "linear-gradient(rgba(14,165,233,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.18) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            ) : null}
            <div className="relative z-10">
              <LayoutPreviewRenderer
                denseContent={denseContent}
                layout={layout}
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
          ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
          : "",
      )}
      onClick={() => onChange(!checked)}
      size="sm"
      variant="secondary"
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-2.5 w-2.5 rounded-full",
          checked ? "bg-emerald-500" : "bg-zinc-300",
        )}
      />
      {children}
    </Button>
  );
}
