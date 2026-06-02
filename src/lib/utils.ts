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
    easy: "border-[#1E1E1E]/35 bg-[#E4E2DD] text-[#1E1E1E]",
    medium: "border-[#F8A348] bg-[#F8A348]/35 text-[#1E1E1E]",
    hard: "border-[#DB4A2B] bg-[#DB4A2B]/18 text-[#1E1E1E]",
  };

  return tones[complexity];
}
