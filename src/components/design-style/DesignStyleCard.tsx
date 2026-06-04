"use client";

import Link from "next/link";
import type { DesignStyle } from "@/data/designStyles";
import { cn } from "@/lib/utils";
import { ColorPaletteGrid } from "@/components/design-style/ColorPaletteGrid";
import { DesignStyleSampleRenderer } from "@/components/design-style/DesignStyleSampleRenderer";

type Props = {
  isSelected: boolean;
  onSelect: (slug: string) => void;
  style: DesignStyle;
};

export function DesignStyleCard({ isSelected, onSelect, style }: Props) {
  return (
    <article
      className={cn(
        "group flex h-full min-w-0 flex-col border p-2 transition",
        isSelected
          ? "border-[#1E1E1E] bg-[#1E1E1E] text-[#E4E2DD]"
          : "border-[#1E1E1E]/18 bg-[#E4E2DD] text-[#1E1E1E] hover:border-[#1E1E1E]",
      )}
    >
      <div className="aspect-[4/3] min-h-[220px] min-w-0 overflow-hidden bg-[#D9D6D0]">
        <DesignStyleSampleRenderer compact style={style} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-3 pt-4">
        <div>
          <p className={cn("raw-label", isSelected ? "text-[#F8A348]" : "text-[#DB4A2B]")}>
            {style.category}
          </p>
          <h2
            className={cn(
              "mt-2 text-sm font-bold uppercase tracking-[0.15em] transition group-hover:text-[#DB4A2B]",
              isSelected ? "text-[#E4E2DD]" : "text-[#1E1E1E]",
            )}
          >
            {style.nameKo}
          </h2>
          <p className={cn("mt-1 text-sm font-medium", isSelected ? "text-[#E4E2DD]/62" : "text-[#444444]")}>
            {style.nameEn}
          </p>
          <p className={cn("mt-3 line-clamp-2 text-sm leading-6", isSelected ? "text-[#E4E2DD]/72" : "text-[#1E1E1E]/68")}>
            {style.summary}
          </p>
        </div>

        <ColorPaletteGrid compact palette={style.palette} />

        <div className="mt-auto flex flex-wrap gap-1.5">
          {style.tags.slice(0, 4).map((tag) => (
            <span
              className={cn(
                "max-w-full break-all px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em]",
                isSelected
                  ? "bg-[#E4E2DD]/10 text-[#E4E2DD]/70"
                  : "bg-[#F8A348]/25 text-[#1E1E1E]/70",
              )}
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            className={cn(
              "h-10 border px-3 text-xs font-bold uppercase tracking-[0.1em] transition",
              isSelected
                ? "border-[#F8A348] bg-[#F8A348] text-[#1E1E1E]"
                : "border-[#1E1E1E] bg-[#1E1E1E] text-[#E4E2DD] hover:bg-[#DB4A2B]",
            )}
            onClick={() => onSelect(style.slug)}
            type="button"
          >
            {isSelected ? "적용됨" : "적용"}
          </button>
          <Link
            className={cn(
              "inline-flex h-10 items-center justify-center border px-3 text-xs font-bold uppercase tracking-[0.1em] transition",
              isSelected
                ? "border-[#E4E2DD]/30 text-[#E4E2DD] hover:bg-[#E4E2DD] hover:text-[#1E1E1E]"
                : "border-[#1E1E1E]/25 text-[#1E1E1E] hover:border-[#1E1E1E]",
            )}
            href={`/styles/${style.slug}`}
          >
            자세히
          </Link>
        </div>
      </div>
    </article>
  );
}
