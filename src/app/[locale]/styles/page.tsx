export { metadata } from "../../styles/page";

import { notFound } from "next/navigation";
import { DesignStylesPageContent } from "../../styles/page";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedDesignStylesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <DesignStylesPageContent locale={locale} />;
}
