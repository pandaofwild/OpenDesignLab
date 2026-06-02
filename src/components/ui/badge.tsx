import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-[#1E1E1E]/35 bg-[#E4E2DD]/70 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1E1E1E]",
        className,
      )}
    >
      {children}
    </span>
  );
}
