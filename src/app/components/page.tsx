import type { Metadata } from "next";
import { Suspense } from "react";
import { ComponentDictionaryView } from "@/components/component-dictionary/ComponentDictionaryView";
import { defaultLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Components",
  description: "Preview UI components with design style tokens.",
};

export default function ComponentsPage() {
  return <ComponentsPageContent locale={defaultLocale} />;
}

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
