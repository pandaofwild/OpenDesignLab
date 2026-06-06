export { metadata } from "../../layouts/page";

import { notFound } from "next/navigation";
import { WebLayoutsPageContent } from "../../layouts/page";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedWebLayoutsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <WebLayoutsPageContent locale={locale} />;
}
