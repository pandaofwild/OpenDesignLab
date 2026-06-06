"use client";

import { useLocale } from "@/components/i18n/useLocale";
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
  const locale = useLocale();

  return (
    <div
      aria-label={locale === "ko" ? "프리뷰 뷰포트" : "Preview viewport"}
      className="inline-flex border border-[var(--specimen-line)] bg-[rgb(251_250_246_/_0.72)] p-1"
      role="group"
    >
      {viewportOptions.map((option) => (
        <Button
          key={option.value}
          aria-pressed={value === option.value}
          className={cn(
            "border-transparent",
            value === option.value
              ? "bg-[var(--specimen-ink)] text-[var(--specimen-paper)] hover:bg-[var(--specimen-ink)]"
              : "bg-transparent text-[var(--specimen-ink-55)] hover:bg-[var(--specimen-card)]",
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
