import { Suspense } from "react";
import { ComponentDictionaryView } from "@/components/component-dictionary/ComponentDictionaryView";
import { type Locale } from "@/lib/i18n";

export function ComponentsPageContent({ locale }: { locale: Locale }) {
  return (
    <main className="min-h-screen bg-background px-3 py-4 text-[var(--specimen-ink)] lg:px-5">
      <div className="mx-auto max-w-[1440px]">
        <Suspense fallback={null}>
          <ComponentDictionaryView locale={locale} />
        </Suspense>
      </div>
    </main>
  );
}
