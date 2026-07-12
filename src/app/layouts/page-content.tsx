import { Suspense } from "react";
import { LayoutCoreScreen } from "@/components/web-layout/LayoutCoreScreen";
import { type Locale } from "@/lib/i18n";

export function WebLayoutsPageContent({ locale }: { locale: Locale }) {
  return (
    <main className="min-h-screen bg-background px-3 py-4 text-[var(--specimen-ink)] lg:px-5">
      <Suspense fallback={null}>
        <LayoutCoreScreen locale={locale} />
      </Suspense>
    </main>
  );
}
