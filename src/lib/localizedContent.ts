import type { ComponentSpec } from "@/data/componentSpecs";
import type { DesignStyle, DesignStyleSampleType } from "@/data/designStyles";
import type { WebLayout } from "@/data/webLayouts";
import type { Locale } from "@/lib/i18n";

const layoutCategoryEn: Record<string, string> = {
  "기본 웹 레이아웃": "Core Web Layouts",
  "랜딩페이지 레이아웃": "Landing Page Layouts",
  "비주얼 중심 레이아웃": "Visual First Layouts",
  "그리드 기반 레이아웃": "Grid Based Layouts",
  "내비게이션 중심 레이아웃": "Navigation Led Layouts",
  "콘텐츠 중심 레이아웃": "Content Led Layouts",
  "커머스 레이아웃": "Commerce Layouts",
  "SaaS / 서비스 웹 레이아웃": "SaaS and Service Layouts",
  "포트폴리오 레이아웃": "Portfolio Layouts",
  "실험적 / 트렌디한 레이아웃": "Experimental Layouts",
  "모바일 웹 / 앱형 레이아웃": "Mobile and App Like Layouts",
  "정보 구조별 레이아웃": "Information Architecture Layouts",
};

const styleCategoryEn: Record<string, string> = {
  "모던 / 미니멀": "Modern and Minimal",
  "강렬 / 실험": "Bold and Experimental",
  "레트로 / 빈티지": "Retro and Vintage",
  "미래 / 디지털": "Future and Digital",
  "럭셔리 / 클래식": "Luxury and Classic",
  "자연 / 수공예": "Natural and Handmade",
  "귀여움 / 캐주얼": "Cute and Casual",
  "스트리트 / 서브컬처": "Street and Subculture",
  "편집 / 타이포그래피": "Editorial and Typography",
  "UI / 웹": "UI and Web",
};

const phraseEn: Record<string, string> = {
  "개인 포트폴리오": "Personal portfolio",
  "갤러리": "Gallery",
  "검색 결과": "Search results",
  "관리 도구": "Admin tools",
  "뉴스": "News",
  "랜딩페이지": "Landing page",
  "리드 수집": "Lead capture",
  "마켓플레이스": "Marketplace",
  "모바일 웹": "Mobile web",
  "문서": "Documentation",
  "문서형 페이지": "Documentation page",
  "브랜드 캠페인": "Brand campaign",
  "블로그": "Blog",
  "비교 페이지": "Comparison page",
  "상품 비교": "Product comparison",
  "서비스 소개": "Service overview",
  "설명 페이지": "Explainer page",
  "소개 페이지": "About page",
  "스튜디오 사이트": "Studio site",
  "신규 서비스 랜딩": "New service launch",
  "실험적 포트폴리오": "Experimental portfolio",
  "앱 소개": "App introduction",
  "앱형 서비스": "App like service",
  "업무 도구": "Work tool",
  "온라인 쇼핑몰": "Online store",
  "웹 앱": "Web app",
  "위저드": "Wizard flow",
  "위치 기반 서비스": "Location based service",
  "인터랙티브 쇼케이스": "Interactive showcase",
  "자료실": "Resource library",
  "제품 쇼케이스": "Product showcase",
  "지식 베이스": "Knowledge base",
  "카탈로그": "Catalog",
  "캠페인": "Campaign",
  "케이스스터디": "Case study",
  "콘텐츠 허브": "Content hub",
  "포트폴리오": "Portfolio",
  "프로모션": "Promotion",
  "회사 소개": "Company profile",
  "API 서비스": "API service",
  "SaaS": "SaaS",
  "강한 몰입형 캠페인": "Highly immersive campaigns",
  "강한 비주얼 캠페인": "Visual heavy campaigns",
  "고령층 대상 서비스": "Services for older audiences",
  "극단적으로 단순한 원페이지": "Extremely simple one page sites",
  "깊은 문서 탐색": "Deep documentation browsing",
  "넓은 표 비교": "Wide table comparison",
  "단일 메시지 중심 페이지": "Single message pages",
  "단일 상품 구매 흐름": "Single product purchase flows",
  "문서형 지식 베이스": "Documentation style knowledge bases",
  "복잡한 다중 메뉴 서비스": "Complex multi menu services",
  "복잡한 업무 대시보드": "Complex operational dashboards",
  "복잡한 편집 도구": "Complex editing tools",
  "빠른 비교가 필요한 목록": "Lists that need fast comparison",
  "상품 대량 탐색": "Large product browsing",
  "선형 설득 흐름": "Linear persuasion flows",
  "순수 문서 페이지": "Pure documentation pages",
  "스토리 중심 브랜드 에세이": "Story driven brand essays",
  "시각 실험 자체가 목적인 페이지": "Pages built mainly for visual experiments",
  "업무 반복 사용 화면": "High frequency work screens",
  "이미지 중심 포트폴리오": "Image led portfolios",
  "정해진 구조 없이 변하는 피드": "Unstructured dynamic feeds",
  "짧은 이벤트 페이지": "Short event pages",
  "텍스트가 많은 문서": "Text heavy documents",
  "한 번에 읽히는 짧은 랜딩페이지": "Short landing pages read in one pass",
};

const previewTypeEn: Record<string, string> = {
  "single-column": "single column",
  "two-column": "two column",
  "three-column": "three column",
  hero: "hero focused",
  "split-screen": "split screen",
  "card-grid": "card grid",
  "bento-grid": "bento grid",
  dashboard: "dashboard",
  editorial: "editorial",
  "ecommerce-product": "commerce product",
  docs: "documentation",
  feed: "feed",
  "map-list": "map and list",
  comparison: "comparison",
  timeline: "timeline",
  "scroll-story": "scroll story",
};

const componentSummaryEn: Record<string, string> = {
  button: "A clickable control for primary and secondary actions.",
  card: "A repeatable container that makes content easy to scan and compare.",
  nav: "A navigation pattern that shows movement and current structure.",
  input: "A basic control for search, forms, and typed input.",
  badge: "A compact label for status, category, or short metadata.",
};

const styleProfileEn: Record<
  DesignStyleSampleType,
  {
    visual: string[];
    typography: string[];
    layout: string[];
    useCases: string[];
    goodFor: string[];
    cautions: string[];
  }
> = {
  "minimal-editorial": {
    visual: ["Restrained surfaces", "Generous whitespace", "Clear hierarchy"],
    typography: ["Clean display type", "Measured body rhythm", "Low contrast labels"],
    layout: ["Simple section flow", "Wide breathing room", "Quiet emphasis"],
    useCases: ["Product pages", "Editorial landing pages", "Portfolio pages"],
    goodFor: ["SaaS", "Studios", "Premium services"],
    cautions: ["Avoid hiding key actions behind subtle styling."],
  },
  "brutalist-poster": {
    visual: ["Hard borders", "High contrast blocks", "Poster like scale"],
    typography: ["Heavy display type", "Compressed labels", "Direct hierarchy"],
    layout: ["Boxed sections", "Sharp grid breaks", "Aggressive calls to action"],
    useCases: ["Campaign pages", "Launch pages", "Experimental portfolios"],
    goodFor: ["Creative studios", "Fashion", "Events"],
    cautions: ["Balance intensity with readability on mobile."],
  },
  "retro-commerce": {
    visual: ["Warm surfaces", "Nostalgic color accents", "Tactile product framing"],
    typography: ["Friendly display type", "Classic commerce labels", "Readable body copy"],
    layout: ["Catalog grids", "Promotional strips", "Product focused cards"],
    useCases: ["Stores", "Product catalogs", "Brand campaigns"],
    goodFor: ["Retail", "Food", "Lifestyle products"],
    cautions: ["Keep retro details from feeling like decoration only."],
  },
  "cyber-dashboard": {
    visual: ["Digital contrast", "Glow accents", "Dense status surfaces"],
    typography: ["Technical labels", "Sharp display type", "Compact data text"],
    layout: ["Dashboard panels", "Metric clusters", "Command style navigation"],
    useCases: ["Dashboards", "AI tools", "Security products"],
    goodFor: ["Developer tools", "Fintech", "Data products"],
    cautions: ["Use contrast carefully so dense panels stay readable."],
  },
  "luxury-product": {
    visual: ["Polished surfaces", "Deep contrast", "Premium product focus"],
    typography: ["Elegant display type", "Small refined labels", "Measured body copy"],
    layout: ["Product hero scenes", "Editorial grids", "Reserved spacing"],
    useCases: ["Product pages", "Brand stories", "Lookbooks"],
    goodFor: ["Luxury retail", "Beauty", "Hospitality"],
    cautions: ["Avoid overusing dramatic spacing in task heavy flows."],
  },
  "organic-brand": {
    visual: ["Soft natural colors", "Handmade texture", "Calm surfaces"],
    typography: ["Warm display type", "Readable body copy", "Human labels"],
    layout: ["Layered story blocks", "Soft image groups", "Gentle calls to action"],
    useCases: ["Brand sites", "Wellness pages", "Food and craft stories"],
    goodFor: ["Wellness", "Craft", "Sustainable brands"],
    cautions: ["Keep forms and controls crisp enough for accessibility."],
  },
  "kawaii-app": {
    visual: ["Playful color", "Soft shapes", "Friendly feedback"],
    typography: ["Rounded display type", "Simple labels", "High clarity microcopy"],
    layout: ["App like panels", "Compact cards", "Visible progress states"],
    useCases: ["Mobile apps", "Community pages", "Consumer tools"],
    goodFor: ["Education", "Entertainment", "Consumer services"],
    cautions: ["Do not let playful styling reduce perceived reliability."],
  },
  "street-campaign": {
    visual: ["Raw contrast", "Sticker like accents", "Energetic overlays"],
    typography: ["Bold display type", "Short labels", "Campaign style emphasis"],
    layout: ["Stacked promos", "Editorial cuts", "High impact visual zones"],
    useCases: ["Campaigns", "Drops", "Cultural landing pages"],
    goodFor: ["Streetwear", "Music", "Events"],
    cautions: ["Check that motion and contrast do not overpower content."],
  },
  "magazine-layout": {
    visual: ["Editorial rhythm", "Rule lines", "Image and text balance"],
    typography: ["Magazine scale headlines", "Readable columns", "Precise captions"],
    layout: ["Article systems", "Feature grids", "Content index blocks"],
    useCases: ["Articles", "Reports", "Case studies"],
    goodFor: ["Media", "Publishing", "Thought leadership"],
    cautions: ["Avoid overly long line lengths in wide layouts."],
  },
  "saas-landing": {
    visual: ["Clean product surfaces", "Soft contrast", "Trust oriented highlights"],
    typography: ["Clear product headlines", "Readable support copy", "Direct labels"],
    layout: ["Hero to proof flow", "Feature grids", "Pricing or CTA sections"],
    useCases: ["SaaS landing pages", "Product tours", "Feature pages"],
    goodFor: ["B2B SaaS", "Productivity tools", "Platform products"],
    cautions: ["Keep proof, pricing, and calls to action concrete."],
  },
};

export function layoutCategoryLabel(category: string, locale: Locale) {
  return locale === "ko" ? category : layoutCategoryEn[category] ?? category;
}

export function styleCategoryLabel(category: string, locale: Locale) {
  return locale === "ko" ? category : styleCategoryEn[category] ?? category;
}

export function phraseLabel(value: string, locale: Locale) {
  return locale === "ko" ? value : phraseEn[value] ?? value;
}

export function previewTypeLabel(value: string, locale: Locale) {
  return locale === "ko" ? value : previewTypeEn[value] ?? value;
}

export function layoutForLocale(layout: WebLayout, locale: Locale): WebLayout {
  if (locale === "ko") {
    return layout;
  }

  const preview = previewTypeLabel(layout.previewType, locale);
  const category = layoutCategoryLabel(layout.category, locale);

  return {
    ...layout,
    nameKo: layout.nameEn,
    nameEn: layout.nameEn,
    category,
    summary: `${layout.nameEn} is a ${preview} pattern for ${layout.bestFor
      .slice(0, 2)
      .map((item) => phraseLabel(item, locale).toLowerCase())
      .join(" and ")}.`,
    description: `Use this layout when the page needs a clear ${preview} structure. It separates primary content, supporting context, and action areas before visual styling is applied.`,
    structure: [
      `Start with a ${preview} frame so the page hierarchy is obvious.`,
      "Separate primary content, supporting context, navigation, and calls to action.",
      "Define spacing, grid behavior, and section order before applying a design style.",
    ],
    bestFor: layout.bestFor.map((item) => phraseLabel(item, locale)),
    notGoodFor: layout.notGoodFor.map((item) => phraseLabel(item, locale)),
    pros: [
      "Makes the main information architecture easy to explain.",
      "Keeps preview, prompt, and implementation constraints aligned.",
      "Works well as a reusable starting point for design.md generation.",
    ],
    cons: [
      "Needs real content to validate density and rhythm.",
      "May require extra tuning for unusual navigation or data heavy screens.",
      "Visual style can change the perceived hierarchy if tokens are too strong.",
    ],
    responsiveBehavior: [
      "Collapse supporting columns below the primary content on smaller screens.",
      "Keep reading order and action order consistent across desktop and mobile.",
      "Test dense content states before finalizing section spacing.",
    ],
    accessibilityNotes: [
      "Preserve semantic landmarks for header, nav, main content, and footer.",
      "Keep focus order aligned with the visual reading order.",
      "Check contrast after applying a style preset palette.",
    ],
    implementationTips: [
      "Name each region by role before writing component markup.",
      "Use stable grid and spacing tokens so the layout survives style changes.",
      "Copy the layout constraints into the prompt before asking an agent to implement it.",
    ],
  };
}

export function designStyleForLocale(style: DesignStyle, locale: Locale): DesignStyle {
  if (locale === "ko") {
    return style;
  }

  const profile = styleProfileEn[style.sampleType];
  const category = styleCategoryLabel(style.category, locale);
  const research = style.research;
  const referenceNames = research?.referenceSites
    .slice(0, 3)
    .map((source) => source.title)
    .join(", ");
  const representativeTraits = research?.representativeTraits ?? profile.visual;

  return {
    ...style,
    nameKo: style.nameEn,
    nameEn: style.nameEn,
    category,
    summary: research
      ? `${style.nameEn} uses ${representativeTraits.slice(0, 3).join(", ").toLowerCase()} to create a ${category.toLowerCase()} web direction.`
      : `${style.nameEn} turns layout previews into a ${category.toLowerCase()} direction with reusable color, type, spacing, and decoration tokens.`,
    description: research
      ? `${style.nameEn} is grounded in references such as ${referenceNames}. ${research.tokenIntent}`
      : `Use ${style.nameEn} as a visual language layer that can be combined with any layout in OpenDesignLab. The style keeps the structural preview intact while changing hierarchy, mood, color, type, and surface treatment.`,
    visualFeatures: representativeTraits,
    colorPalette: [
      "Base, surface, text, and accent colors are stored as reusable tokens.",
      "The palette is designed to be applied consistently across layout previews.",
      "Accent colors should be reserved for hierarchy, status, and calls to action.",
    ],
    typography: profile.typography,
    layoutTraits: profile.layout,
    useCases: profile.useCases,
    goodFor: profile.goodFor,
    cautions: research
      ? research.avoidTraits.map((trait) => `Avoid ${trait.toLowerCase()} because it weakens the style distinction.`)
      : profile.cautions,
  };
}

export function componentSpecForLocale(spec: ComponentSpec, locale: Locale): ComponentSpec {
  if (locale === "ko") {
    return spec;
  }

  return {
    ...spec,
    nameKo: spec.nameEn,
    nameEn: spec.nameEn,
    summary: componentSummaryEn[spec.slug] ?? spec.summary,
  };
}
