export { metadata } from "../../../layouts/compare/page";

import { notFound } from "next/navigation";
import { ComparePageContent } from "../../../layouts/compare/page";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <ComparePageContent locale={locale} />;
}
