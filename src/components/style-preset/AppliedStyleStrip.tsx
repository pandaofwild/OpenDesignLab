"use client";

import Link from "next/link";
import { useStylePreset } from "@/components/style-preset/StylePresetProvider";

export function AppliedStyleStrip() {
  const { activePreset, palette } = useStylePreset();

  return (
    <section className="border-y border-[#1E1E1E]/20 py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <p className="raw-label text-[#DB4A2B]">Applied design format</p>
          <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
            <h3 className="font-display text-4xl font-bold uppercase leading-[0.84] tracking-[-0.05em] text-[#1E1E1E]">
              {activePreset.nameKo}
            </h3>
            <p className="text-sm font-medium text-[#1E1E1E]/58">{activePreset.nameEn}</p>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#1E1E1E]/64">
            {activePreset.summary}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex gap-1.5">
            {[palette.base, palette.surface, palette.text, palette.accent, palette.accent2, palette.accent3].map(
              (color) => (
                <span
                  className="h-8 w-8 border border-[#1E1E1E]/20"
                  key={`${activePreset.slug}-${color}`}
                  style={{ backgroundColor: color }}
                />
              ),
            )}
          </div>
          <Link
            className="inline-flex h-10 items-center border border-[#1E1E1E] bg-[#1E1E1E] px-4 text-xs font-bold uppercase tracking-[0.1em] text-[#E4E2DD] transition hover:bg-[#DB4A2B]"
            href="/styles"
          >
            형식 바꾸기
          </Link>
        </div>
      </div>
    </section>
  );
}
