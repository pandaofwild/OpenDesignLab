import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
