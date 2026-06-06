import type { Metadata } from "next";
import { LocalizedLink } from "@/components/i18n/LocalizedLink";
import { WebLayoutCompare } from "@/components/web-layout/WebLayoutCompare";
import { defaultLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "레이아웃 비교",
  description: "최대 3개의 웹 레이아웃을 큰 프리뷰와 좌우 화살표로 비교합니다.",
};

export default function ComparePage() {
  return <ComparePageContent locale={defaultLocale} />;
}

export function ComparePageContent({ locale }: { locale: Locale }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background pt-24 text-[var(--specimen-ink)]">
      <div className="mx-auto max-w-[1720px] px-5 py-6 lg:px-8">
        <LocalizedLink
          className="raw-label inline-flex items-center gap-2 text-[var(--specimen-signal)] underline-offset-4 hover:underline"
          href="/layouts"
        >
          <span className="specimen-bullet" aria-hidden="true" />
          {locale === "ko" ? "목록으로 돌아가기" : "Back to layouts"}
        </LocalizedLink>
        <header className="specimen-sheet mt-5 max-w-4xl p-5 lg:p-7">
          <p className="raw-label text-[var(--specimen-ink-55)]">
            {locale === "ko" ? "레이아웃 비교 규격" : "Layout comparison spec"}
          </p>
          <h1 className="raw-display mt-3 text-6xl leading-[0.8] text-[var(--specimen-ink)] md:text-8xl">
            Compare
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-[var(--specimen-ink-55)]">
            {locale === "ko"
              ? "큰 프리뷰를 좌우로 넘기며 핵심 차이만 빠르게 확인합니다."
              : "Move through large previews and compare the most important structural differences."}
          </p>
        </header>
        <div className="mt-5">
          <WebLayoutCompare />
        </div>
      </div>
    </main>
  );
}
