import { cn } from "@/lib/utils";

type AnnotatedRegionProps = {
  label: string;
  showLabel: boolean;
  children: React.ReactNode;
  className?: string;
};

export function AnnotatedRegion({
  label,
  showLabel,
  children,
  className,
}: AnnotatedRegionProps) {
  return (
    <section
      aria-label={label}
      className={cn(
        "relative overflow-hidden rounded-md border border-zinc-200/80 bg-white/78",
        className,
      )}
    >
      {showLabel ? (
        <span className="absolute left-2 top-2 z-10 rounded-sm border border-zinc-200 bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-normal text-zinc-600 shadow-sm">
          {label}
        </span>
      ) : null}
      {children}
    </section>
  );
}
