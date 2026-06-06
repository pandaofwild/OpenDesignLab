import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

const variantClasses = {
  primary:
    "border-[var(--specimen-ink)] bg-[var(--specimen-ink)] text-[var(--specimen-paper)] focus-visible:outline-[var(--specimen-ink)]",
  secondary:
    "border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] text-[var(--specimen-ink)] focus-visible:outline-[var(--specimen-ink)]",
  ghost:
    "border-transparent bg-transparent text-[var(--specimen-ink)] hover:text-[var(--specimen-signal)] focus-visible:outline-[var(--specimen-ink)]",
};

const sizeClasses = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
};

export function Button({
  className,
  variant = "secondary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "raw-button inline-flex items-center justify-center border font-bold uppercase tracking-[0.1em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
