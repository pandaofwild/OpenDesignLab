import Link from "next/link";
import type { WebLayout } from "@/data/webLayouts";
import { Badge } from "@/components/ui/badge";
import { WireframeThumbnail } from "@/components/web-layout/WireframeThumbnail";
import { cn, complexityTone, formatComplexity } from "@/lib/utils";

type WebLayoutCardProps = {
  layout: WebLayout;
  compact?: boolean;
};

export function WebLayoutCard({ layout, compact = false }: WebLayoutCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
      <div className="border-b border-zinc-200 bg-zinc-50 p-3">
        <div className="h-28 rounded-md border border-zinc-200 bg-white p-2">
          <WireframeThumbnail previewType={layout.previewType} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge>{layout.category}</Badge>
            <Badge className={cn("border", complexityTone(layout.complexity))}>
              {formatComplexity(layout.complexity)}
            </Badge>
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-normal text-zinc-950">
              {layout.nameKo}
            </h2>
            <p className="text-sm font-medium text-zinc-500">{layout.nameEn}</p>
          </div>
          <p
            className={cn(
              "text-sm leading-6 text-zinc-600",
              compact ? "line-clamp-2" : "line-clamp-3",
            )}
          >
            {layout.summary}
          </p>
        </div>
        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {layout.bestFor.slice(0, 3).map((purpose) => (
              <span
                key={purpose}
                className="rounded-sm bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600"
              >
                {purpose}
              </span>
            ))}
          </div>
          <Link
            href={`/web-layouts/${layout.slug}`}
            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-950 bg-zinc-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          >
            상세 보기
          </Link>
        </div>
      </div>
    </article>
  );
}
