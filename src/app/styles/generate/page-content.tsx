import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { DesignStyleImageGenerator } from "@/components/design-style/DesignStyleImageGenerator";
import { type Locale } from "@/lib/i18n";

export function DesignStyleGeneratePageContent({ locale }: { locale: Locale }) {
  return (
    <main className="min-h-screen bg-background pt-28 text-[var(--specimen-ink)]">
      <div className="mx-auto max-w-[1720px] px-5 py-8 lg:px-8">
        <LocalizedLink className="raw-label inline-flex items-center gap-2 text-[var(--specimen-signal)] underline-offset-4 hover:underline" href="/styles">
          <span className="specimen-bullet" aria-hidden="true" />
          {locale === "ko" ? "디자인 형식 목록" : "Design style list"}
        </LocalizedLink>
        <header className="specimen-sheet mt-8 max-w-5xl p-5 lg:p-7">
          <p className="raw-label flex items-center gap-2 text-[var(--specimen-signal)]">
            <span className="specimen-bullet" aria-hidden="true" />
            Local admin
          </p>
          <h1 className="raw-display mt-4 text-6xl leading-[0.8] md:text-8xl">
            Generate
            <br />
            Style Images
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--specimen-ink-55)] sm:text-lg sm:leading-8">
            {locale === "ko"
              ? "`OPENAI_API_KEY`가 설정된 로컬 환경에서 스타일별 참조 이미지를 생성하고 `public/generated/design-styles`에 저장합니다."
              : "Generate reference images for each design style in a local environment with `OPENAI_API_KEY`, then save them to `public/generated/design-styles`."}
          </p>
        </header>
        <section className="mt-10">
          <DesignStyleImageGenerator />
        </section>
      </div>
    </main>
  );
}
