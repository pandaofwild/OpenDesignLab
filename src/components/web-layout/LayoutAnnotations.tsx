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
        "relative overflow-hidden border border-[var(--specimen-line-soft)] bg-[rgb(251_250_246_/_0.62)]",
        className,
      )}
      {...props}
    >
      {showLabel ? (
        <span className="absolute left-2 top-2 z-10 border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.9)] px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--specimen-ink-55)]">
          {label}
        </span>
      ) : null}
      {children}
    </section>
  );
}
