import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--specimen-ink)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
