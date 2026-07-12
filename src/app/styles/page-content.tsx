import { Suspense } from "react";
import { DesignStyleCoreScreen } from "@/components/design-style/DesignStyleCoreScreen";
import { type Locale } from "@/lib/i18n";

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
