import Link from "next/link";
import type { WebLayout } from "@/data/webLayouts";
import { Badge } from "@/components/ui/badge";
import { LayoutPreviewRenderer } from "@/components/web-layout/LayoutPreviewRenderer";
import { cn, complexityTone, formatComplexity } from "@/lib/utils";

type LayoutStagePreviewProps = {
  layout: WebLayout;
  className?: string;
  detailHref?: string;
  detailLabel?: string;
  indexLabel?: string;
  showMetrics?: boolean;
};

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

export function LayoutStagePreview({
  layout,
  className,
  detailHref,
  detailLabel = "상세 보기",
  indexLabel,
  showMetrics = true,
}: LayoutStagePreviewProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f172a_0%,#18181b_48%,#064e3b_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:42px_42px] opacity-50" />

      {indexLabel ? (
        <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-zinc-950/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur md:right-6 md:top-6">
          <span>{indexLabel}</span>
          <span className="hidden h-1 w-1 rounded-full bg-white/45 sm:block" />
          <span className="hidden sm:inline">{layout.previewType}</span>
        </div>
      ) : null}

      <div className="absolute inset-x-3 top-14 bottom-32 md:inset-x-8 md:top-16 md:bottom-36">
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-white/20 bg-zinc-100 shadow-2xl">
          <div className="flex h-8 shrink-0 items-center gap-2 border-b border-zinc-200 bg-white px-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <div className="ml-2 flex h-5 flex-1 items-center overflow-hidden rounded-md bg-zinc-100 px-3 text-[10px] font-medium text-zinc-500">
              openlayout.local/{layout.slug}
            </div>
          </div>
          <div className="relative flex-1 overflow-hidden bg-[linear-gradient(180deg,#fafafa,#e4e4e7)] p-2 md:p-3">
            <div className="h-full overflow-hidden md:hidden">
              <LayoutPreviewRenderer
                denseContent
                layout={layout}
                showLabels={false}
                viewport="mobile"
              />
            </div>
            <div className="hidden h-full overflow-hidden md:block">
              <LayoutPreviewRenderer
                denseContent
                layout={layout}
                showLabels={false}
                viewport="desktop"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
      <div className="absolute inset-x-3 bottom-3 z-20 rounded-lg border border-white/20 bg-zinc-950/82 p-4 text-white shadow-2xl backdrop-blur-md md:inset-x-8 md:bottom-6 md:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <Badge className="border-white/15 bg-white/12 text-white">
                {layout.category}
              </Badge>
              <Badge className={cn("border", complexityTone(layout.complexity))}>
                {formatComplexity(layout.complexity)}
              </Badge>
            </div>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <h2 className="truncate text-2xl font-bold tracking-normal text-white md:text-3xl">
                  {layout.nameKo}
                </h2>
                <p className="truncate text-sm font-medium text-white/55">
                  {layout.nameEn}
                </p>
              </div>
              {detailHref ? (
                <Link
                  className="inline-flex h-9 shrink-0 items-center justify-center rounded-md border border-white/25 bg-white px-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  href={detailHref}
                >
                  {detailLabel}
                </Link>
              ) : null}
            </div>
            <p className="mt-3 line-clamp-1 max-w-3xl text-sm leading-6 text-white/72">
              {layout.summary}
            </p>
          </div>
          {showMetrics ? (
            <div className="hidden grid-cols-2 gap-2 sm:grid sm:grid-cols-4 lg:grid-cols-2">
              <Metric label="추천" value={layout.bestFor[0]} />
              <Metric label="모바일" value={mobileFitFor(layout)} />
              <Metric label="밀도" value={densityFor(layout)} />
              <Metric label="난이도" value={formatComplexity(layout.complexity)} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/12 bg-white/10 p-3">
      <p className="text-[11px] font-bold uppercase tracking-normal text-white/48">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
