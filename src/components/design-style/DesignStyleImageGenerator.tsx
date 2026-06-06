"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/components/i18n/useLocale";
import { designStyles } from "@/data/designStyles";
import { designStyleForLocale } from "@/lib/localizedContent";

type GenerationResult = {
  cacheBust?: number;
  error?: string;
  model?: string;
  path?: string;
  prompt?: string;
  revisedPrompt?: string | null;
  style?: {
    nameEn: string;
    nameKo: string;
    slug: string;
  };
};

export function DesignStyleImageGenerator() {
  const locale = useLocale();
  const [slug, setSlug] = useState("minimalism");
  const [prompt, setPrompt] = useState("");
  const [quality, setQuality] = useState("medium");
  const [size, setSize] = useState("1024x1024");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const selectedStyle = useMemo(
    () => designStyles.find((style) => style.slug === slug) ?? designStyles[0],
    [slug],
  );
  const localizedStyle = designStyleForLocale(selectedStyle, locale);

  async function generateImage() {
    setIsGenerating(true);
    setResult(null);

    try {
      const response = await fetch("/api/design-style-images", {
        body: JSON.stringify({ prompt, quality, size, slug }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const payload = (await response.json()) as GenerationResult;

      setResult(
        response.ok
          ? { ...payload, cacheBust: Date.now() }
          : {
              error:
                payload.error ??
                (locale === "ko" ? "이미지 생성에 실패했습니다." : "Image generation failed."),
            },
      );
    } catch (error) {
      setResult({
        error:
          error instanceof Error
            ? error.message
            : locale === "ko"
              ? "이미지 생성에 실패했습니다."
              : "Image generation failed.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="specimen-surface p-5">
        <div className="grid gap-4">
          <label className="block">
            <span className="raw-label text-[var(--specimen-ink-55)]">
              {locale === "ko" ? "디자인 형식" : "Design style"}
            </span>
            <select
              className="raw-field mt-2 h-11 w-full px-3 text-sm outline-none"
              onChange={(event) => setSlug(event.target.value)}
              value={slug}
            >
              {designStyles.map((style) => {
                const item = designStyleForLocale(style, locale);
                const label = item.nameEn === item.nameKo ? item.nameKo : `${item.nameKo} / ${item.nameEn}`;

                return (
                  <option key={style.slug} value={style.slug}>
                    {label}
                  </option>
                );
              })}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="raw-label text-[var(--specimen-ink-55)]">
                {locale === "ko" ? "품질" : "Quality"}
              </span>
              <select
                className="raw-field mt-2 h-11 w-full px-3 text-sm outline-none"
                onChange={(event) => setQuality(event.target.value)}
                value={quality}
              >
                {["auto", "low", "medium", "high"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="raw-label text-[var(--specimen-ink-55)]">
                {locale === "ko" ? "크기" : "Size"}
              </span>
              <select
                className="raw-field mt-2 h-11 w-full px-3 text-sm outline-none"
                onChange={(event) => setSize(event.target.value)}
                value={size}
              >
                {["1024x1024", "1536x1024", "1024x1536", "auto"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="raw-label text-[var(--specimen-ink-55)]">
              {locale === "ko" ? "추가 프롬프트" : "Additional prompt"}
            </span>
            <textarea
              className="raw-field mt-2 min-h-36 w-full resize-y p-3 text-sm leading-6 outline-none"
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="예: ecommerce hero image, no visible text, premium lighting"
              value={prompt}
            />
          </label>

          <button
            className="specimen-button specimen-button-md specimen-button-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isGenerating}
            onClick={generateImage}
            type="button"
          >
            {isGenerating
              ? locale === "ko" ? "생성 중" : "Generating"
              : locale === "ko" ? "이미지 생성" : "Generate image"}
          </button>
        </div>
      </section>

      <section className="border border-[var(--specimen-ink)] bg-[var(--specimen-ink)] p-5 text-[var(--specimen-paper)]">
        <p className="raw-label text-[rgb(242_239_232_/_0.7)]">Image prompt</p>
        <h2 className="raw-display mt-3 text-5xl leading-[0.84]">
          {localizedStyle.nameKo}
        </h2>
        <p className="mt-4 text-sm leading-6 text-[rgb(242_239_232_/_0.68)]">{selectedStyle?.imagePrompt}</p>

        {result?.error ? (
          <div className="mt-6 border border-[var(--specimen-signal)] bg-[rgb(216_67_27_/_0.12)] p-4 text-sm leading-6 text-[rgb(255_198_182)]">
            {result.error}
          </div>
        ) : null}

        {result?.path ? (
          <div className="mt-6">
            <Image
              alt={`${result.style?.nameEn ?? localizedStyle.nameKo} generated reference`}
              className="aspect-square w-full border border-[rgb(242_239_232_/_0.2)] object-cover"
              height={1024}
              src={`${result.path}?v=${result.cacheBust ?? 0}`}
              unoptimized
              width={1024}
            />
            <p className="mt-3 font-mono text-xs text-[rgb(242_239_232_/_0.6)]">{result.path}</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
