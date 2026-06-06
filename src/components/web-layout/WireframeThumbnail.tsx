import type { WebLayout } from "@/data/webLayouts";
import { LayoutPreviewRenderer } from "@/components/web-layout/LayoutPreviewRenderer";
import { cn } from "@/lib/utils";

type WireframeThumbnailProps = {
  layout: WebLayout;
  className?: string;
};

export function WireframeThumbnail({ layout, className }: WireframeThumbnailProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "specimen-grid-bg relative h-full w-full overflow-hidden text-[var(--specimen-ink)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-2 w-[760px] origin-top -translate-x-1/2 scale-[0.28] sm:scale-[0.32] md:scale-[0.28] lg:scale-[0.3] xl:scale-[0.31]">
        <LayoutPreviewRenderer
          denseContent={false}
          layout={layout}
          showLabels={false}
          viewport="desktop"
        />
      </div>
    </div>
  );
}
