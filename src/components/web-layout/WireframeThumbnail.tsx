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
        "relative h-full w-full overflow-hidden bg-[#E4E2DD] text-[#1E1E1E]",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-2 w-[760px] origin-top -translate-x-1/2 scale-[0.44] sm:scale-[0.58] md:scale-[0.46] lg:scale-[0.54] xl:scale-[0.6]">
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
