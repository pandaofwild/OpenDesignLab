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
    <article className="group flex h-full flex-col">
      <div
        className={cn(
          "overflow-hidden bg-[#D9D6D0] p-2",
          compact ? "aspect-[16/10]" : "aspect-[4/3]",
        )}
      >
        <div className="h-full bg-[#E4E2DD] p-2 transition duration-500 ease-out group-hover:scale-[1.03]">
          <WireframeThumbnail layout={layout} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 pt-4">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge>{layout.category}</Badge>
            <Badge className={cn("border", complexityTone(layout.complexity))}>
              {formatComplexity(layout.complexity)}
            </Badge>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#1E1E1E] transition group-hover:text-[#FF89A9]">
              {layout.nameKo}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#444444]">{layout.nameEn}</p>
          </div>
          <p
            className={cn(
              "text-sm leading-6 text-[#1E1E1E]/68",
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
                className="bg-[#F8A348]/25 px-2 py-1 text-xs font-bold uppercase tracking-[0.1em] text-[#1E1E1E]/70"
              >
                {purpose}
              </span>
            ))}
          </div>
          <Link
            href={`/web-layouts/${layout.slug}`}
            className="raw-button inline-flex h-10 items-center justify-center border border-[#1E1E1E] bg-[#1E1E1E] px-4 text-sm font-bold uppercase tracking-[0.1em] text-[#E4E2DD] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E]"
          >
            상세 보기
          </Link>
        </div>
      </div>
    </article>
  );
}
