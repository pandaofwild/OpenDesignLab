import type { Metadata } from "next";
import { BrandSheetScreen } from "@/components/specimen/BrandSheetScreen";
import { defaultLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Brand Sheet",
  description: "OpenDesignLab SPECIMEN brand direction.",
};

export default function BrandPage() {
  return <BrandPageContent locale={defaultLocale} />;
}

export function BrandPageContent({ locale }: { locale: Locale }) {
  return (
    <main className="min-h-screen bg-background px-3 py-4 text-[var(--specimen-ink)] lg:px-5">
      <BrandSheetScreen locale={locale} />
    </main>
  );
}
