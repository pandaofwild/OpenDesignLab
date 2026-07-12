import { BrandSheetScreen } from "@/components/specimen/BrandSheetScreen";
import { type Locale } from "@/lib/i18n";

export function BrandPageContent({ locale }: { locale: Locale }) {
  return (
    <main className="min-h-screen bg-background px-3 py-4 text-[var(--specimen-ink)] lg:px-5">
      <BrandSheetScreen locale={locale} />
    </main>
  );
}
