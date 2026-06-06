import type { Metadata } from "next";
import { Suspense } from "react";
import { DesignStyleCoreScreen } from "@/components/design-style/DesignStyleCoreScreen";
import { defaultLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Design Style Lab",
  description: "OpenDesignLab에서 레이아웃 예시에 적용할 디자인 형식과 색상표를 고릅니다.",
};

export default function DesignStylesPage() {
  return <DesignStylesPageContent locale={defaultLocale} />;
}

export function DesignStylesPageContent({ locale }: { locale: Locale }) {
  void locale;

  return (
    <main className="min-h-screen bg-background px-3 py-4 text-[var(--specimen-ink)] lg:px-5">
      <Suspense fallback={null}>
        <DesignStyleCoreScreen />
      </Suspense>
    </main>
  );
}
