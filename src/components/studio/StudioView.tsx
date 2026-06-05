"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { designStyles } from "@/data/designStyles";
import { webLayouts } from "@/data/webLayouts";
import { styleTokenVars } from "@/components/style-preset/styleTokenVars";
import { LayoutPreviewRenderer } from "@/components/web-layout/LayoutPreviewRenderer";
import { exportDesignCode } from "@/lib/exportCode";
import { exportDesignPrompt } from "@/lib/exportPrompt";
import type { PreviewViewport } from "@/components/web-layout/ViewportSwitcher";

const DEFAULT_STYLE = "brutalism";
const DEFAULT_LAYOUT = "hero-focused-layout";

function StudioViewInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [copied, setCopied] = useState<"code" | "prompt" | null>(null);

  const requestedStyleSlug = params.get("style") ?? DEFAULT_STYLE;
  const requestedLayoutSlug = params.get("layout") ?? DEFAULT_LAYOUT;
  const viewport = (params.get("vp") === "mobile" ? "mobile" : "desktop") as PreviewViewport;

  const selectedStyle = useMemo(
    () =>
      designStyles.find((s) => s.slug === requestedStyleSlug) ??
      designStyles.find((s) => s.slug === DEFAULT_STYLE) ??
      designStyles[0],
    [requestedStyleSlug],
  );

  const selectedLayout = useMemo(
    () =>
      webLayouts.find((l) => l.slug === requestedLayoutSlug) ??
      webLayouts.find((l) => l.slug === DEFAULT_LAYOUT) ??
      webLayouts[0],
    [requestedLayoutSlug],
  );

  const selectedStyleSlug = selectedStyle.slug;
  const selectedLayoutSlug = selectedLayout.slug;

  useEffect(() => {
    const next = new URLSearchParams(params.toString());
    let changed = false;

    if (next.get("style") !== selectedStyleSlug) {
      next.set("style", selectedStyleSlug);
      changed = true;
    }

    if (next.get("layout") !== selectedLayoutSlug) {
      next.set("layout", selectedLayoutSlug);
      changed = true;
    }

    if (next.get("vp") !== viewport) {
      next.set("vp", viewport);
      changed = true;
    }

    if (changed) router.replace(`/studio?${next.toString()}`);
  }, [params, router, selectedLayoutSlug, selectedStyleSlug, viewport]);

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    next.set(key, value);
    router.replace(`/studio?${next.toString()}`);
  }

  const tokenVars = useMemo(() => styleTokenVars(selectedStyle), [selectedStyle]);

  async function copyPrompt() {
    await navigator.clipboard.writeText(exportDesignPrompt(selectedStyle, selectedLayout));
    setCopied("prompt");
    window.setTimeout(() => setCopied(null), 1400);
  }

  async function copyCode() {
    await navigator.clipboard.writeText(exportDesignCode(selectedStyle, selectedLayout));
    setCopied("code");
    window.setTimeout(() => setCopied(null), 1400);
  }

  return (
    <main className="min-h-screen bg-background pt-20 text-[#1E1E1E]">
      <div className="mx-auto max-w-[1720px] px-5 py-8 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#DB4A2B]">Studio</p>
          <h1 className="mt-2 font-display text-4xl font-bold uppercase leading-none tracking-[-0.05em]">
            Style × Layout
          </h1>
          <p className="mt-3 text-sm text-[#1E1E1E]/62">
            스타일과 레이아웃을 골라 조합된 웹을 미리 봅니다.
          </p>
        </div>

        <div className="grid min-w-0 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">

          {/* Left: Controls */}
          <aside className="min-w-0 space-y-6">

            {/* Style picker */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1E1E1E]/50">Design Style</p>
              <select
                className="mt-2 h-11 w-full border border-[#1E1E1E]/25 bg-background px-3 text-sm outline-none focus:border-[#1E1E1E]"
                onChange={(e) => update("style", e.target.value)}
                value={selectedStyleSlug}
              >
                {designStyles.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.nameKo} ({s.nameEn})
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-[#1E1E1E]/50">{selectedStyle.category}</p>
            </div>

            {/* Layout picker */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1E1E1E]/50">Layout</p>
              <select
                className="mt-2 h-11 w-full border border-[#1E1E1E]/25 bg-background px-3 text-sm outline-none focus:border-[#1E1E1E]"
                onChange={(e) => update("layout", e.target.value)}
                value={selectedLayoutSlug}
              >
                {webLayouts.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {l.nameKo} ({l.nameEn})
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-[#1E1E1E]/50">{selectedLayout.category}</p>
            </div>

            {/* Viewport toggle */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1E1E1E]/50">Viewport</p>
              <div className="mt-2 flex gap-2">
                {(["desktop", "mobile"] as const).map((vp) => (
                  <button
                    className={`h-9 flex-1 border text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${
                      viewport === vp
                        ? "border-[#1E1E1E] bg-[#1E1E1E] text-[#E4E2DD]"
                        : "border-[#1E1E1E]/25 text-[#1E1E1E]/62"
                    }`}
                    key={vp}
                    onClick={() => update("vp", vp)}
                    type="button"
                  >
                    {vp === "desktop" ? "데스크탑" : "모바일"}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected style token preview */}
            <div className="space-y-3 border border-[#1E1E1E]/14 p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1E1E1E]/50">Style Tokens</p>
              <div className="grid grid-cols-5 gap-1">
                {[
                  selectedStyle.tokens.color.base,
                  selectedStyle.tokens.color.surface,
                  selectedStyle.tokens.color.primary,
                  selectedStyle.tokens.color.accent,
                  selectedStyle.tokens.color.accent2,
                ].map((hex, i) => (
                  <div key={i} className="h-8 border border-[#1E1E1E]/10" style={{ backgroundColor: hex }} title={hex} />
                ))}
              </div>
              <p className="text-[11px] text-[#1E1E1E]/50">
                {selectedStyle.tokens.typography.displayFont.split(",")[0].replace(/"/g, "")} ·{" "}
                {selectedStyle.tokens.shape.radius} radius ·{" "}
                {selectedStyle.tokens.space.density}
              </p>
            </div>

            {/* Copy buttons */}
            <div className="space-y-2">
              <button
                className="h-10 w-full border border-[#1E1E1E]/25 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E1E1E]/70 transition-colors hover:border-[#1E1E1E] hover:text-[#1E1E1E]"
                onClick={copyCode}
                type="button"
              >
                {copied === "code" ? "코드 복사됨" : "코드 복사"}
              </button>
              <button
                className="h-10 w-full border border-[#1E1E1E]/25 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E1E1E]/70 transition-colors hover:border-[#1E1E1E] hover:text-[#1E1E1E]"
                onClick={copyPrompt}
                type="button"
              >
                {copied === "prompt" ? "프롬프트 복사됨" : "프롬프트 복사"}
              </button>
            </div>

          </aside>

          {/* Right: Live preview */}
          <div className="min-h-[600px] min-w-0">
            <div
              className="style-preset-root relative min-w-0 max-w-full overflow-hidden"
              data-st-density={selectedStyle.tokens.space.density}
              data-st-effect={selectedStyle.tokens.decoration.effect}
              data-style-preset={selectedStyle.slug}
              style={tokenVars}
            >
              <LayoutPreviewRenderer
                denseContent={false}
                layout={selectedLayout}
                showLabels={false}
                viewport={viewport}
              />
            </div>
            <p className="mt-3 text-[11px] tracking-[0.1em] text-[#1E1E1E]/45">
              {selectedStyle.nameKo} × {selectedLayout.nameKo} · URL로 공유 가능
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}

export function StudioView() {
  return (
    <Suspense>
      <StudioViewInner />
    </Suspense>
  );
}
