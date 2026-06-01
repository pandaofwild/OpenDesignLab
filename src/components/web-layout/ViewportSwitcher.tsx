import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PreviewViewport = "desktop" | "tablet" | "mobile";

type ViewportSwitcherProps = {
  value: PreviewViewport;
  onChange: (viewport: PreviewViewport) => void;
};

const viewportOptions: Array<{ value: PreviewViewport; label: string }> = [
  { value: "desktop", label: "Desktop" },
  { value: "tablet", label: "Tablet" },
  { value: "mobile", label: "Mobile" },
];

export function ViewportSwitcher({ value, onChange }: ViewportSwitcherProps) {
  return (
    <div
      aria-label="프리뷰 뷰포트"
      className="inline-flex rounded-md border border-zinc-200 bg-zinc-100 p-1"
      role="group"
    >
      {viewportOptions.map((option) => (
        <Button
          key={option.value}
          aria-pressed={value === option.value}
          className={cn(
            "border-transparent",
            value === option.value
              ? "bg-white text-zinc-950 shadow-sm hover:bg-white"
              : "bg-transparent text-zinc-600 hover:bg-zinc-50",
          )}
          onClick={() => onChange(option.value)}
          size="sm"
          variant="ghost"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
