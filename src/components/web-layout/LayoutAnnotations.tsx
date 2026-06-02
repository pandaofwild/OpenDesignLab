import { cn } from "@/lib/utils";

type AnnotatedRegionProps = {
  label: string;
  showLabel: boolean;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export function AnnotatedRegion({
  label,
  showLabel,
  children,
  className,
  ...props
}: AnnotatedRegionProps) {
  return (
    <section
      aria-label={label}
      className={cn(
        "relative overflow-hidden border border-[#1E1E1E]/14 bg-[#F0EEE8]/78",
        className,
      )}
      {...props}
    >
      {showLabel ? (
        <span className="absolute left-2 top-2 z-10 border border-[#1E1E1E]/20 bg-[#E4E2DD]/90 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#1E1E1E]/70 shadow-sm">
          {label}
        </span>
      ) : null}
      {children}
    </section>
  );
}
