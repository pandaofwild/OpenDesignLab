import { cn } from "@/lib/utils";

type WireframeThumbnailProps = {
  previewType: string;
  className?: string;
};

function Block({ className }: { className?: string }) {
  return <span className={cn("block rounded-sm bg-zinc-300", className)} />;
}

export function WireframeThumbnail({
  previewType,
  className,
}: WireframeThumbnailProps) {
  if (previewType === "dashboard") {
    return (
      <div className={cn("grid h-full grid-cols-[24%_1fr] gap-1.5", className)}>
        <Block className="h-full bg-zinc-800" />
        <div className="grid grid-rows-[18%_1fr] gap-1.5">
          <div className="grid grid-cols-3 gap-1.5">
            <Block className="bg-emerald-300" />
            <Block className="bg-sky-300" />
            <Block className="bg-amber-300" />
          </div>
          <Block className="bg-zinc-200" />
        </div>
      </div>
    );
  }

  if (previewType === "bento-grid") {
    return (
      <div className={cn("grid h-full grid-cols-4 grid-rows-3 gap-1.5", className)}>
        <Block className="col-span-2 row-span-2 bg-zinc-800" />
        <Block className="col-span-2 bg-emerald-300" />
        <Block className="bg-sky-300" />
        <Block className="bg-amber-300" />
        <Block className="col-span-2 bg-zinc-300" />
        <Block className="col-span-2 bg-rose-300" />
      </div>
    );
  }

  if (previewType === "comparison") {
    return (
      <div className={cn("grid h-full grid-rows-4 gap-1.5", className)}>
        <Block className="bg-zinc-800" />
        <div className="grid grid-cols-3 gap-1.5">
          <Block className="bg-emerald-300" />
          <Block className="bg-sky-300" />
          <Block className="bg-amber-300" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <Block />
          <Block />
          <Block />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <Block />
          <Block />
          <Block />
        </div>
      </div>
    );
  }

  if (previewType === "timeline") {
    return (
      <div className={cn("relative h-full px-3 py-2", className)}>
        <span className="absolute bottom-2 left-5 top-2 w-px bg-zinc-300" />
        {[0, 1, 2].map((item) => (
          <div key={item} className="relative mb-2 ml-5 flex gap-2">
            <span className="absolute -left-[19px] top-1 h-2 w-2 rounded-full bg-zinc-800" />
            <Block className="h-3 flex-1" />
          </div>
        ))}
      </div>
    );
  }

  if (previewType === "split-screen") {
    return (
      <div className={cn("grid h-full grid-cols-2 gap-1.5", className)}>
        <Block className="bg-zinc-800" />
        <div className="grid grid-rows-3 gap-1.5">
          <Block className="bg-emerald-300" />
          <Block />
          <Block className="bg-amber-300" />
        </div>
      </div>
    );
  }

  if (previewType === "docs" || previewType === "three-column") {
    return (
      <div className={cn("grid h-full grid-cols-[22%_1fr_22%] gap-1.5", className)}>
        <Block className="bg-zinc-300" />
        <Block className="bg-zinc-800" />
        <Block className="bg-emerald-300" />
      </div>
    );
  }

  if (previewType === "two-column" || previewType === "map-list") {
    return (
      <div className={cn("grid h-full grid-cols-[1fr_38%] gap-1.5", className)}>
        <Block className="bg-zinc-800" />
        <div className="grid gap-1.5">
          <Block />
          <Block className="bg-emerald-300" />
          <Block />
        </div>
      </div>
    );
  }

  if (previewType === "card-grid" || previewType === "feed") {
    return (
      <div className={cn("grid h-full grid-cols-3 gap-1.5", className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Block
            key={index}
            className={cn(
              index === 0 ? "bg-zinc-800" : "",
              index === 2 ? "bg-emerald-300" : "",
              index === 4 ? "bg-amber-300" : "",
            )}
          />
        ))}
      </div>
    );
  }

  if (previewType === "scroll-story") {
    return (
      <div className={cn("grid h-full grid-cols-[42%_1fr] gap-1.5", className)}>
        <Block className="bg-zinc-800" />
        <div className="grid grid-rows-4 gap-1.5">
          <Block />
          <Block className="bg-emerald-300" />
          <Block />
          <Block className="bg-amber-300" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("grid h-full grid-rows-[22%_1fr_18%] gap-1.5", className)}>
      <Block className="bg-zinc-800" />
      <Block className="bg-emerald-300" />
      <Block />
    </div>
  );
}
