export { metadata } from "../../components/page";

import { notFound } from "next/navigation";
import { ComponentsPageContent } from "../../components/page-content";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedComponentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <ComponentsPageContent locale={locale} />;
}
