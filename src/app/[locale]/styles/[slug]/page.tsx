import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";
import { designStyles, getDesignStyleBySlug } from "@/data/designStyles";
import { DesignStyleDetailPageContent } from "../../../styles/[slug]/page";
import { isLocale } from "@/lib/i18n";
import { designStyleForLocale } from "@/lib/localizedContent";

type LocalizedStyleDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: LocalizedStyleDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const style = getDesignStyleBySlug(slug);

  if (!style || !isLocale(locale)) {
    return {
      title: "Design style not found",
    };
  }

  const localizedStyle = designStyleForLocale(style, locale);

  return {
    description: localizedStyle.summary,
    title: `${localizedStyle.nameKo} | Design Style Lab`,
  };
}

export default async function LocalizedDesignStyleDetailPage({
  params,
}: LocalizedStyleDetailPageProps) {
  const { locale, slug } = await params;
  const style = getDesignStyleBySlug(slug);

  if (!style || !isLocale(locale)) {
    notFound();
  }

  return <DesignStyleDetailPageContent locale={locale} style={style} />;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    designStyles.map((style) => ({
      locale,
      slug: style.slug,
    })),
  );
}
