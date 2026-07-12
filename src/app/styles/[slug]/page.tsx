import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { designStyles, getDesignStyleBySlug } from "@/data/designStyles";
import { defaultLocale } from "@/lib/i18n";
import { DesignStyleDetailPageContent } from "./page-content";

export function generateStaticParams() {
  return designStyles.map((style) => ({ slug: style.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const style = getDesignStyleBySlug(slug);

  if (!style) {
    return {
      title: "디자인 형식 없음",
    };
  }

  return {
    description: style.summary,
    title: `${style.nameKo} | Design Style Lab`,
  };
}

export default async function DesignStyleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const style = getDesignStyleBySlug(slug);

  if (!style) {
    notFound();
  }

  return <DesignStyleDetailPageContent locale={defaultLocale} style={style} />;
}
