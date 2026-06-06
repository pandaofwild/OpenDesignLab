import type { Metadata } from "next";
import { Suspense } from "react";
import { LayoutCoreScreen } from "@/components/web-layout/LayoutCoreScreen";
import { defaultLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Layout Library",
  description: "OpenDesignLab에서 웹사이트 구조를 고르고 프리뷰와 프롬프트로 조합합니다.",
};

export default function WebLayoutsPage() {
  return <WebLayoutsPageContent locale={defaultLocale} />;
}

export function WebLayoutsPageContent({ locale }: { locale: Locale }) {
  return (
    <main className="min-h-screen bg-background px-3 py-4 text-[var(--specimen-ink)] lg:px-5">
      <Suspense fallback={null}>
        <LayoutCoreScreen locale={locale} />
      </Suspense>
    </main>
  );
}
