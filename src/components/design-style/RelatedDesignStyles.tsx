"use client";

import { getRelatedDesignStyles } from "@/data/designStyles";
import { useLocale } from "@/components/i18n/useLocale";
import { useStylePreset } from "@/components/style-preset/StylePresetProvider";
import { DesignStyleCard } from "@/components/design-style/DesignStyleCard";

export function RelatedDesignStyles({ slugs }: { slugs: string[] }) {
  const locale = useLocale();
  const { customPreset, selectedSlug, setSelectedSlug } = useStylePreset();
  const styles = getRelatedDesignStyles(slugs);

  if (styles.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="raw-label flex items-center gap-2 text-[var(--specimen-signal)]">
          <span className="specimen-bullet" aria-hidden="true" />
          {locale === "ko" ? "연결된 스타일" : "Adjacent styles"}
        </p>
        <h2 className="raw-display mt-3 text-5xl leading-[0.86] text-[var(--specimen-ink)] md:text-6xl">
          {locale === "ko" ? "관련 디자인 형식" : "Related styles"}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--specimen-ink-55)]">
          {locale === "ko"
            ? "같은 범주와 샘플 유형을 기준으로 함께 비교하기 좋은 디자인 형식입니다."
            : "Design styles worth comparing based on category and sample type."}
        </p>
      </div>
      <div className="grid gap-x-4 gap-y-12 md:grid-cols-3">
        {styles.map((style) => (
          <DesignStyleCard
            isSelected={!customPreset && selectedSlug === style.slug}
            key={style.slug}
            onSelect={setSelectedSlug}
            style={style}
          />
        ))}
      </div>
    </section>
  );
}
