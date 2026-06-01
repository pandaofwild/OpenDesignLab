import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

const variantClasses = {
  primary:
    "border-zinc-950 bg-zinc-950 text-white hover:bg-zinc-800 focus-visible:outline-zinc-950",
  secondary:
    "border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-zinc-700",
  ghost:
    "border-transparent bg-transparent text-zinc-700 hover:bg-zinc-100 focus-visible:outline-zinc-700",
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
        "inline-flex items-center justify-center rounded-md border font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
