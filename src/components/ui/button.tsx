import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

const variantClasses = {
  primary:
    "border-[#1E1E1E] bg-[#1E1E1E] text-[#E4E2DD] focus-visible:outline-[#1E1E1E]",
  secondary:
    "border-[#1E1E1E]/40 bg-transparent text-[#1E1E1E] focus-visible:outline-[#1E1E1E]",
  ghost:
    "border-transparent bg-transparent text-[#1E1E1E] hover:text-[#DB4A2B] focus-visible:outline-[#1E1E1E]",
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
