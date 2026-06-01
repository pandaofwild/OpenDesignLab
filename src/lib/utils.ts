export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatComplexity(complexity: "easy" | "medium" | "hard") {
  const labels = {
    easy: "쉬움",
    medium: "보통",
    hard: "어려움",
  };

  return labels[complexity];
}

export function complexityTone(complexity: "easy" | "medium" | "hard") {
  const tones = {
    easy: "border-emerald-200 bg-emerald-50 text-emerald-700",
    medium: "border-amber-200 bg-amber-50 text-amber-700",
    hard: "border-rose-200 bg-rose-50 text-rose-700",
  };

  return tones[complexity];
}
