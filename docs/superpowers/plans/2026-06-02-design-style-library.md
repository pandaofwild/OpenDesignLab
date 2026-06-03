# Design Style Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a separate Design Style Library where every style from the pasted prompt has its own searchable card, detail page, palette, usage guidance, image prompt, and actual webpage-like sample.

**Architecture:** Keep `/web-layouts` focused on layout structure and make `/design-styles` the source of truth for visual formats. Design styles are data-driven TypeScript records, rendered by reusable category, card, detail, and sample components. The selected design style is persisted through the existing client provider and applied to layout previews through CSS variables.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS v4, local TypeScript data, client-side search/filter state, server-rendered detail pages, optional OpenAI image generation API in a later milestone.

---

## Current Baseline

- [x] Repository root: `F:\coding\design_pan`
- [x] Existing layout library: `src/app/web-layouts/page.tsx`
- [x] Existing layout detail pages: `src/app/web-layouts/[slug]/page.tsx`
- [x] Existing layout preview renderer: `src/components/web-layout/LayoutPreviewRenderer.tsx`
- [x] Temporary design-style prototype exists in the working tree:
  - `src/app/design-styles/page.tsx`
  - `src/components/style-preset/StylePresetProvider.tsx`
  - `src/components/style-preset/StylePresetPanel.tsx`
  - `src/components/style-preset/AppliedStyleStrip.tsx`
  - `src/data/stylePresets.ts`
  - `src/lib/paletteGenerator.ts`
- [ ] Convert the temporary prototype into a full 88-style design library.
- [ ] Commit only after each milestone passes `npm run lint` and `npm run build`.

## Product Shape

### User Flow

1. User opens `/design-styles`.
2. User searches or filters design styles by category/tag.
3. User opens `/design-styles/[slug]`.
4. User sees a real webpage-like style sample, palette, typography notes, layout traits, use cases, cautions, related styles, and image prompt.
5. User selects a design style.
6. User opens `/web-layouts` or `/web-layouts/compare`.
7. Layout examples are rendered with the selected style.

### Route Map

- `/design-styles`
  - Full design style library with search, filters, style cards, palette swatches, and sample thumbnails.
- `/design-styles/[slug]`
  - Detail page for one style with full explanation and real sample page.
- `/web-layouts`
  - Layout structure library. Shows a compact "Applied design format" strip and a link back to `/design-styles`.
- `/web-layouts/compare`
  - Existing compare flow, using the selected style variables.
- `/admin/generate-design-images`
  - Later milestone. Local development admin page for image generation.
- `/api/generate-design-image`
  - Later milestone. Server-only OpenAI image generation route.

---

## Data Model

### Final Type

Create `src/data/designStyles.ts` and use this type:

```ts
export type DesignStylePalette = {
  base: string;
  surface: string;
  text: string;
  mutedText: string;
  primary: string;
  accent: string;
  accent2: string;
  accent3: string;
  border: string;
};

export type DesignStyleSampleType =
  | "minimal-editorial"
  | "brutalist-poster"
  | "retro-commerce"
  | "cyber-dashboard"
  | "luxury-product"
  | "organic-brand"
  | "kawaii-app"
  | "street-campaign"
  | "magazine-layout"
  | "saas-landing";

export type DesignStyle = {
  slug: string;
  nameKo: string;
  nameEn: string;
  category: string;
  summary: string;
  description: string;
  visualFeatures: string[];
  colorPalette: string[];
  typography: string[];
  layoutTraits: string[];
  useCases: string[];
  goodFor: string[];
  cautions: string[];
  tags: string[];
  related: string[];
  palette: DesignStylePalette;
  imagePrompt: string;
  sampleType: DesignStyleSampleType;
};
```

### Required 88 Styles

#### 모던 / 미니멀

- [x] 미니멀리즘
- [x] 모더니즘
- [x] 스위스 디자인
- [x] 인터내셔널 스타일
- [x] 스칸디나비안
- [x] 재팬디
- [x] 웜 미니멀
- [x] 소프트 미니멀
- [x] 하이엔드 미니멀

#### 강렬 / 실험

- [x] 브루탈리즘
- [x] 뉴 브루탈리즘
- [x] 안티디자인
- [x] 맥시멀리즘
- [x] 글리치 아트
- [x] 디컨스트럭티비즘
- [x] 아방가르드
- [x] 포스트모더니즘

#### 레트로 / 빈티지

- [x] 레트로
- [x] 빈티지
- [x] 70년대 레트로
- [x] 80년대 레트로
- [x] 90년대 그래픽
- [x] Y2K
- [x] 레트로 퓨처리즘
- [x] 미드센추리 모던
- [x] 바우하우스

#### 미래 / 디지털

- [x] 퓨처리즘
- [x] 사이버펑크
- [x] 네온 누아르
- [x] 테크웨어
- [x] 하이테크
- [x] AI 에스테틱
- [x] 홀로그램 스타일
- [x] 크롬코어
- [x] 메타버스 스타일

#### 럭셔리 / 클래식

- [x] 클래식
- [x] 네오클래식
- [x] 럭셔리
- [x] 올드머니
- [x] 아르데코
- [x] 아르누보
- [x] 바로크
- [x] 로코코
- [x] 고딕

#### 자연 / 수공예

- [x] 오가닉 디자인
- [x] 내추럴
- [x] 보태니컬
- [x] 에코 디자인
- [x] 러스틱
- [x] 킨포크
- [x] 핸드메이드
- [x] 크래프트
- [x] 와비사비

#### 귀여움 / 캐주얼

- [x] 키치
- [x] 카와이
- [x] 도파민 디자인
- [x] 팝아트
- [x] 코믹북 스타일
- [x] 토이 디자인
- [x] 플레이풀 디자인
- [x] 파스텔 스타일
- [x] 버블 디자인

#### 스트리트 / 서브컬처

- [x] 스트리트웨어
- [x] 그래피티
- [x] 힙합 스타일
- [x] 스케이트 문화
- [x] 펑크
- [x] 그런지
- [x] 인디 슬리즈
- [x] 레이브 스타일
- [x] 로우파이

#### 편집 / 타이포그래피

- [x] 타이포그래피 중심
- [x] 에디토리얼 디자인
- [x] 매거진 스타일
- [x] 포스터리즘
- [x] 그리드 시스템
- [x] 콜라주
- [x] 포토몽타주
- [x] 실험 타이포
- [x] 신문 스타일

#### UI / 웹

- [x] 플랫 디자인
- [x] 머티리얼 디자인
- [x] 뉴모피즘
- [x] 글래스모피즘
- [x] 클레이모피즘
- [x] 다크모드 디자인
- [x] SaaS 스타일
- [x] 스타트업 랜딩페이지

---

## File Structure

### Data

- Create: `src/data/designStyles.ts`
  - Full `DesignStyle` type.
  - Full 88-style `designStyles` array.
  - `designStyleCategories`, `designStyleTags`, `getDesignStyleBySlug`, `getRelatedDesignStyles`.
- Retire: `src/data/stylePresets.ts`
  - Replace imports with `src/data/designStyles.ts`.
  - Delete after all imports are migrated.

### State And Palette

- Modify: `src/components/style-preset/StylePresetProvider.tsx`
  - Rename context concepts from `StylePreset` to `DesignStyle`.
  - Persist selected design style slug and custom prompt palette.
  - Continue writing CSS variables on `.style-preset-root`.
- Modify: `src/lib/paletteGenerator.ts`
  - Rename imports to use `DesignStyle`.
  - Keep deterministic local prompt palette generation.

### Design Style Pages

- Modify: `src/app/design-styles/page.tsx`
  - Use `DesignStyleLibrary` client component.
- Create: `src/app/design-styles/[slug]/page.tsx`
  - Server-render detail page.
  - Implement `generateStaticParams`.
  - Implement `generateMetadata`.
- Create: `src/components/design-style/DesignStyleLibrary.tsx`
  - Client search/filter/list state.
- Create: `src/components/design-style/DesignStyleFilters.tsx`
  - Search, category, tag filters.
- Create: `src/components/design-style/DesignStyleCard.tsx`
  - Card view for each style.
- Create: `src/components/design-style/DesignStyleSampleRenderer.tsx`
  - Render actual webpage-like style sample based on `sampleType`.
- Create: `src/components/design-style/DesignStyleDetailSection.tsx`
  - Reusable detail sections.
- Create: `src/components/design-style/ColorPaletteGrid.tsx`
  - Palette swatches.
- Create: `src/components/design-style/RelatedDesignStyles.tsx`
  - Related style cards.

### Layout Library Integration

- Modify: `src/components/style-preset/AppliedStyleStrip.tsx`
  - Point to selected `DesignStyle`.
  - Link to `/design-styles`.
- Modify: `src/components/web-layout/LayoutPreviewRenderer.tsx`
  - Continue using CSS variables.
  - No layout data changes required.
- Modify: `src/app/web-layouts/page.tsx`
  - Keep layout-first content.
  - Keep compact applied design format strip only.

### Later Image Generation Milestone

- Create: `src/app/api/generate-design-image/route.ts`
- Create: `src/app/admin/generate-design-images/page.tsx`
- Create: `src/components/design-style/AdminImageGenerator.tsx`
- Create: `src/lib/openai-image.ts`
- Add generated output path: `public/generated/design-styles/{slug}.webp`
- Modify: `README.md`
  - Add environment variables and generation workflow.

---

## Milestone Checklist

- [x] **M0: Plan Document**
  - [x] Create this plan.
  - [x] Keep this document updated after each completed task.

- [x] **M1: Data Foundation**
  - [x] Create final `DesignStyle` type.
  - [x] Add all 88 styles.
  - [x] Add category/tag helpers.
  - [x] Add related-style links.
  - [x] Replace temporary `stylePresets` imports.

- [x] **M2: Design Style Listing Page**
  - [x] Build search/filter UI.
  - [x] Build category navigation.
  - [x] Build style cards with palette and sample thumbnail.
  - [x] Verify mobile layout.

- [x] **M3: Design Style Detail Pages**
  - [x] Add `/design-styles/[slug]`.
  - [x] Add metadata and static params.
  - [x] Add detail sections.
  - [x] Add related styles.

- [x] **M4: Webpage-Like Style Samples**
  - [x] Implement 10 sample renderers.
  - [x] Map all 88 styles to sample renderers.
  - [x] Verify at least one style per category visually.

- [x] **M5: Layout Library Integration**
  - [x] Select design style from `/design-styles`.
  - [x] Apply selected style to `/web-layouts`.
  - [x] Apply selected style to `/web-layouts/compare`.
  - [x] Confirm localStorage persistence.

- [x] **M6: Image Generation**
  - [x] Add server API route.
  - [x] Add admin page.
  - [x] Save generated images under `public/generated/design-styles`.
  - [x] Add clear API error handling.

- [x] **M7: Docs, QA, Release**
  - [x] Update README.
  - [x] Run `npm run lint`.
  - [x] Run `npm run build`.
  - [x] Capture visual checks for `/design-styles`, `/design-styles/[slug]`, `/web-layouts`.
  - [x] Commit.
  - [x] Tag next version.
  - [x] Push to GitHub.

---

## Task 1: Data Foundation

**Files:**
- Create: `src/data/designStyles.ts`
- Modify: `src/components/style-preset/StylePresetProvider.tsx`
- Modify: `src/components/style-preset/StylePresetPanel.tsx`
- Modify: `src/components/style-preset/AppliedStyleStrip.tsx`
- Modify: `src/lib/paletteGenerator.ts`
- Delete after migration: `src/data/stylePresets.ts`

- [x] **Step 1: Create final data file**

Create `src/data/designStyles.ts` with the final `DesignStyle` type, helper functions, and the 88-style array.

Required exports:

```ts
export type DesignStylePalette = {
  base: string;
  surface: string;
  text: string;
  mutedText: string;
  primary: string;
  accent: string;
  accent2: string;
  accent3: string;
  border: string;
};

export type DesignStyleSampleType =
  | "minimal-editorial"
  | "brutalist-poster"
  | "retro-commerce"
  | "cyber-dashboard"
  | "luxury-product"
  | "organic-brand"
  | "kawaii-app"
  | "street-campaign"
  | "magazine-layout"
  | "saas-landing";

export type DesignStyle = {
  slug: string;
  nameKo: string;
  nameEn: string;
  category: string;
  summary: string;
  description: string;
  visualFeatures: string[];
  colorPalette: string[];
  typography: string[];
  layoutTraits: string[];
  useCases: string[];
  goodFor: string[];
  cautions: string[];
  tags: string[];
  related: string[];
  palette: DesignStylePalette;
  imagePrompt: string;
  sampleType: DesignStyleSampleType;
};

export const defaultDesignStyleSlug = "brutalism";
export const designStyles: DesignStyle[] = [];
export const designStyleCategories = [...new Set(designStyles.map((style) => style.category))];
export const designStyleTags = [...new Set(designStyles.flatMap((style) => style.tags))].sort();

export function getDesignStyleBySlug(slug: string) {
  return designStyles.find((style) => style.slug === slug);
}

export function getRelatedDesignStyles(slugs: string[]) {
  return slugs
    .map((slug) => getDesignStyleBySlug(slug))
    .filter((style): style is DesignStyle => Boolean(style));
}
```

- [x] **Step 2: Fill all 88 styles**

Add the 88 styles listed in the "Required 88 Styles" checklist. Each item must have:

- `summary`: one sentence.
- `description`: 3-5 Korean sentences.
- `visualFeatures`: 4 items.
- `colorPalette`: 4 items.
- `typography`: 3 items.
- `layoutTraits`: 4 items.
- `useCases`: 4 items.
- `goodFor`: 4 items.
- `cautions`: 3 items.
- `tags`: 4-6 items.
- `related`: 3 slugs.
- `palette`: 9 hex colors.
- `imagePrompt`: English prompt ending with `clean composition, high-quality design reference image, no logo, no watermark, suitable for a design encyclopedia card`.
- `sampleType`: one of the 10 renderer types.

- [x] **Step 3: Verify 88 count**

Run:

```powershell
@'
const { designStyles } = require("./.next/server/app/design-styles/page.js");
console.log(designStyles.length);
'@ | node -
```

If this command is awkward because the app build output is not available, use this TypeScript-safe check instead after `npm run build`:

```powershell
npm run build
```

Expected:

```text
✓ Compiled successfully
```

- [x] **Step 4: Replace imports**

Replace imports from:

```ts
import { stylePresets } from "@/data/stylePresets";
```

with:

```ts
import { designStyles } from "@/data/designStyles";
```

Replace `StylePreset` type names with `DesignStyle` type names where the code now handles full design styles.

- [x] **Step 5: Run lint**

Run:

```powershell
npm run lint
```

Expected:

```text
> design_pan@... lint
> eslint
```

with exit code `0`.

---

## Task 2: Listing Page

**Files:**
- Modify: `src/app/design-styles/page.tsx`
- Create: `src/components/design-style/DesignStyleLibrary.tsx`
- Create: `src/components/design-style/DesignStyleFilters.tsx`
- Create: `src/components/design-style/DesignStyleCard.tsx`
- Create: `src/components/design-style/ColorPaletteGrid.tsx`

- [x] **Step 1: Create `ColorPaletteGrid`**

`src/components/design-style/ColorPaletteGrid.tsx`:

```tsx
import type { DesignStylePalette } from "@/data/designStyles";

const paletteEntries: Array<[keyof DesignStylePalette, string]> = [
  ["base", "Base"],
  ["surface", "Surface"],
  ["text", "Text"],
  ["primary", "Primary"],
  ["accent", "Accent"],
  ["accent2", "Accent 2"],
  ["accent3", "Accent 3"],
  ["border", "Border"],
];

export function ColorPaletteGrid({ palette }: { palette: DesignStylePalette }) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {paletteEntries.map(([key, label]) => (
        <span
          aria-label={`${label} ${palette[key]}`}
          className="h-8 border border-[#1E1E1E]/18"
          key={key}
          style={{ backgroundColor: palette[key] }}
          title={`${label}: ${palette[key]}`}
        />
      ))}
    </div>
  );
}
```

- [x] **Step 2: Create card component**

`src/components/design-style/DesignStyleCard.tsx`:

```tsx
import Link from "next/link";
import type { DesignStyle } from "@/data/designStyles";
import { ColorPaletteGrid } from "@/components/design-style/ColorPaletteGrid";
import { DesignStyleSampleRenderer } from "@/components/design-style/DesignStyleSampleRenderer";

export function DesignStyleCard({ style }: { style: DesignStyle }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="aspect-[4/3] overflow-hidden bg-[#D9D6D0] p-2">
        <DesignStyleSampleRenderer compact style={style} />
      </div>
      <div className="flex flex-1 flex-col gap-4 pt-4">
        <div>
          <p className="raw-label text-[#DB4A2B]">{style.category}</p>
          <h2 className="mt-2 text-sm font-bold uppercase tracking-[0.15em] text-[#1E1E1E] transition group-hover:text-[#DB4A2B]">
            {style.nameKo}
          </h2>
          <p className="mt-1 text-sm font-medium text-[#444444]">{style.nameEn}</p>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#1E1E1E]/68">
            {style.summary}
          </p>
        </div>
        <ColorPaletteGrid palette={style.palette} />
        <div className="mt-auto flex flex-wrap gap-1.5">
          {style.tags.slice(0, 4).map((tag) => (
            <span
              className="bg-[#F8A348]/25 px-2 py-1 text-xs font-bold uppercase tracking-[0.1em] text-[#1E1E1E]/70"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          className="raw-button inline-flex h-10 items-center justify-center border border-[#1E1E1E] bg-[#1E1E1E] px-4 text-sm font-bold uppercase tracking-[0.1em] text-[#E4E2DD] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E1E1E]"
          href={`/design-styles/${style.slug}`}
        >
          자세히 보기
        </Link>
      </div>
    </article>
  );
}
```

- [x] **Step 3: Create filter component**

`src/components/design-style/DesignStyleFilters.tsx`:

```tsx
"use client";

import { designStyleCategories, designStyleTags } from "@/data/designStyles";

type Props = {
  category: string;
  onCategoryChange: (category: string) => void;
  onQueryChange: (query: string) => void;
  onReset: () => void;
  onTagChange: (tag: string) => void;
  query: string;
  tag: string;
};

export function DesignStyleFilters({
  category,
  onCategoryChange,
  onQueryChange,
  onReset,
  onTagChange,
  query,
  tag,
}: Props) {
  return (
    <section className="bg-[#D9D6D0] p-4">
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr_auto]">
        <label className="block">
          <span className="text-xs font-bold text-[#1E1E1E]/62">검색</span>
          <input
            className="mt-2 h-11 w-full border border-[#1E1E1E]/25 bg-[#E4E2DD] px-3 text-sm outline-none focus:border-[#1E1E1E]"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="스타일명, 분위기, 업종 검색"
            value={query}
          />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-[#1E1E1E]/62">카테고리</span>
          <select
            className="mt-2 h-11 w-full border border-[#1E1E1E]/25 bg-[#E4E2DD] px-3 text-sm outline-none focus:border-[#1E1E1E]"
            onChange={(event) => onCategoryChange(event.target.value)}
            value={category}
          >
            <option value="">전체 카테고리</option>
            {designStyleCategories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-bold text-[#1E1E1E]/62">태그</span>
          <select
            className="mt-2 h-11 w-full border border-[#1E1E1E]/25 bg-[#E4E2DD] px-3 text-sm outline-none focus:border-[#1E1E1E]"
            onChange={(event) => onTagChange(event.target.value)}
            value={tag}
          >
            <option value="">전체 태그</option>
            {designStyleTags.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <button
          className="h-11 self-end border border-[#1E1E1E]/25 px-4 text-sm font-bold"
          onClick={onReset}
          type="button"
        >
          초기화
        </button>
      </div>
    </section>
  );
}
```

- [x] **Step 4: Create library component**

`src/components/design-style/DesignStyleLibrary.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";
import { designStyles } from "@/data/designStyles";
import { DesignStyleCard } from "@/components/design-style/DesignStyleCard";
import { DesignStyleFilters } from "@/components/design-style/DesignStyleFilters";

export function DesignStyleLibrary() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");

  const filteredStyles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return designStyles.filter((style) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          style.nameKo,
          style.nameEn,
          style.summary,
          style.description,
          style.category,
          ...style.tags,
          ...style.goodFor,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesCategory = category === "" || style.category === category;
      const matchesTag = tag === "" || style.tags.includes(tag);

      return matchesQuery && matchesCategory && matchesTag;
    });
  }, [category, query, tag]);

  function resetFilters() {
    setQuery("");
    setCategory("");
    setTag("");
  }

  return (
    <div className="space-y-10">
      <DesignStyleFilters
        category={category}
        onCategoryChange={setCategory}
        onQueryChange={setQuery}
        onReset={resetFilters}
        onTagChange={setTag}
        query={query}
        tag={tag}
      />
      <div className="flex items-center justify-between border-y border-[#1E1E1E]/20 py-4">
        <p className="raw-label text-[#1E1E1E]/62">
          {filteredStyles.length}개 디자인 형식 표시 중
        </p>
      </div>
      <div className="grid gap-x-4 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
        {filteredStyles.map((style) => (
          <DesignStyleCard key={style.slug} style={style} />
        ))}
      </div>
    </div>
  );
}
```

- [x] **Step 5: Wire page**

Modify `src/app/design-styles/page.tsx` to import and render:

```tsx
import { DesignStyleLibrary } from "@/components/design-style/DesignStyleLibrary";

// inside page body
<DesignStyleLibrary />
```

- [x] **Step 6: Verify listing**

Run:

```powershell
npm run lint
npm run build
```

Expected: both commands exit with code `0`.

---

## Task 3: Detail Pages

**Files:**
- Create: `src/app/design-styles/[slug]/page.tsx`
- Create: `src/components/design-style/DesignStyleDetailSection.tsx`
- Create: `src/components/design-style/RelatedDesignStyles.tsx`
- Modify: `src/components/design-style/DesignStyleSampleRenderer.tsx`

- [x] **Step 1: Create detail section component**

`src/components/design-style/DesignStyleDetailSection.tsx`:

```tsx
import type { ReactNode } from "react";

export function DesignStyleDetailSection({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="border border-[#1E1E1E]/18 bg-[#F0EEE8] p-5">
      <h2 className="raw-label text-[#DB4A2B]">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-[#1E1E1E]/70">{children}</div>
    </section>
  );
}
```

- [x] **Step 2: Create related component**

`src/components/design-style/RelatedDesignStyles.tsx`:

```tsx
import { getRelatedDesignStyles } from "@/data/designStyles";
import { DesignStyleCard } from "@/components/design-style/DesignStyleCard";

export function RelatedDesignStyles({ slugs }: { slugs: string[] }) {
  const styles = getRelatedDesignStyles(slugs);

  if (styles.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="font-display text-4xl font-bold uppercase leading-[0.86] tracking-[-0.05em] text-[#1E1E1E]">
        Related styles
      </h2>
      <div className="grid gap-x-4 gap-y-12 md:grid-cols-3">
        {styles.map((style) => (
          <DesignStyleCard key={style.slug} style={style} />
        ))}
      </div>
    </section>
  );
}
```

- [x] **Step 3: Create detail page**

`src/app/design-styles/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { designStyles, getDesignStyleBySlug } from "@/data/designStyles";
import { ColorPaletteGrid } from "@/components/design-style/ColorPaletteGrid";
import { DesignStyleDetailSection } from "@/components/design-style/DesignStyleDetailSection";
import { DesignStyleSampleRenderer } from "@/components/design-style/DesignStyleSampleRenderer";
import { RelatedDesignStyles } from "@/components/design-style/RelatedDesignStyles";

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
    title: style.nameKo,
    description: style.summary,
  };
}

export default async function DesignStyleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const style = getDesignStyleBySlug(slug);

  if (!style) notFound();

  return (
    <main className="min-h-screen bg-background pt-28 text-[#1E1E1E]">
      <div className="mx-auto max-w-[1720px] px-5 py-8 lg:px-8">
        <Link className="raw-label text-[#DB4A2B]" href="/design-styles">
          목록으로 돌아가기
        </Link>
        <header className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <div>
            <p className="raw-label text-[#DB4A2B]">{style.category}</p>
            <h1 className="mt-4 font-display text-6xl font-bold uppercase leading-[0.8] tracking-[-0.05em] md:text-8xl">
              {style.nameKo}
            </h1>
            <p className="mt-3 text-lg font-medium text-[#1E1E1E]/58">{style.nameEn}</p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#1E1E1E]/72">
              {style.summary}
            </p>
          </div>
          <DesignStyleSampleRenderer style={style} />
        </header>

        <section className="mt-10 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <DesignStyleDetailSection title="상세 설명">
            <p>{style.description}</p>
          </DesignStyleDetailSection>
          <DesignStyleDetailSection title="색상표">
            <ColorPaletteGrid palette={style.palette} />
          </DesignStyleDetailSection>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ListBlock items={style.visualFeatures} title="시각적 특징" />
          <ListBlock items={style.typography} title="타이포그래피" />
          <ListBlock items={style.layoutTraits} title="레이아웃 경향" />
          <ListBlock items={style.goodFor} title="어울리는 업종" />
          <ListBlock items={style.useCases} title="어울리는 페이지" />
          <ListBlock items={style.cautions} title="사용 시 주의점" />
        </section>

        <DesignStyleDetailSection title="이미지 생성 프롬프트">
          <pre className="whitespace-pre-wrap bg-[#1E1E1E] p-4 font-mono text-xs leading-6 text-[#F8A348]">
            {style.imagePrompt}
          </pre>
        </DesignStyleDetailSection>

        <div className="mt-16">
          <RelatedDesignStyles slugs={style.related} />
        </div>
      </div>
    </main>
  );
}

function ListBlock({ items, title }: { items: string[]; title: string }) {
  return (
    <DesignStyleDetailSection title={title}>
      <ul className="space-y-2">
        {items.map((item) => (
          <li className="border-t border-[#1E1E1E]/14 pt-2" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </DesignStyleDetailSection>
  );
}
```

- [x] **Step 4: Verify detail routes**

Run:

```powershell
npm run build
```

Expected route output includes:

```text
├ ● /design-styles/[slug]
```

---

## Task 4: Webpage-Like Sample Renderer

**Files:**
- Create: `src/components/design-style/DesignStyleSampleRenderer.tsx`

- [x] **Step 1: Create renderer shell**

`src/components/design-style/DesignStyleSampleRenderer.tsx`:

```tsx
import type { DesignStyle } from "@/data/designStyles";
import { cn } from "@/lib/utils";

type Props = {
  compact?: boolean;
  style: DesignStyle;
};

export function DesignStyleSampleRenderer({ compact = false, style }: Props) {
  const vars = {
    "--sample-base": style.palette.base,
    "--sample-surface": style.palette.surface,
    "--sample-text": style.palette.text,
    "--sample-muted": style.palette.mutedText,
    "--sample-primary": style.palette.primary,
    "--sample-accent": style.palette.accent,
    "--sample-accent-2": style.palette.accent2,
    "--sample-accent-3": style.palette.accent3,
    "--sample-border": style.palette.border,
  } as React.CSSProperties;

  return (
    <div
      className={cn("relative overflow-hidden border border-[#1E1E1E]/18", compact ? "h-full p-2" : "min-h-[420px] p-4")}
      style={vars}
    >
      <SampleByType compact={compact} style={style} />
    </div>
  );
}

function SampleByType({ compact, style }: Props) {
  if (style.sampleType === "cyber-dashboard") return <CyberDashboard compact={compact} style={style} />;
  if (style.sampleType === "luxury-product") return <LuxuryProduct compact={compact} style={style} />;
  if (style.sampleType === "organic-brand") return <OrganicBrand compact={compact} style={style} />;
  if (style.sampleType === "kawaii-app") return <KawaiiApp compact={compact} style={style} />;
  if (style.sampleType === "street-campaign") return <StreetCampaign compact={compact} style={style} />;
  if (style.sampleType === "retro-commerce") return <RetroCommerce compact={compact} style={style} />;
  if (style.sampleType === "magazine-layout") return <MagazineLayout compact={compact} style={style} />;
  if (style.sampleType === "saas-landing") return <SaasLanding compact={compact} style={style} />;
  if (style.sampleType === "minimal-editorial") return <MinimalEditorial compact={compact} style={style} />;
  return <BrutalistPoster compact={compact} style={style} />;
}
```

- [x] **Step 2: Add all 10 sample functions**

Implement these functions in the same file:

- `MinimalEditorial`
- `BrutalistPoster`
- `RetroCommerce`
- `CyberDashboard`
- `LuxuryProduct`
- `OrganicBrand`
- `KawaiiApp`
- `StreetCampaign`
- `MagazineLayout`
- `SaasLanding`

Each sample must:

- Use `style.palette` through CSS variables.
- Show a header.
- Show a large style-specific title.
- Show at least one actual content/product/dashboard/editorial section.
- Avoid generic blank wireframes.
- Fit inside compact card thumbnails.

- [x] **Step 3: Visual test one style per category**

Use Chrome screenshot or the in-app browser for these URLs:

```text
http://127.0.0.1:3001/design-styles/minimalism
http://127.0.0.1:3001/design-styles/brutalism
http://127.0.0.1:3001/design-styles/y2k
http://127.0.0.1:3001/design-styles/cyberpunk
http://127.0.0.1:3001/design-styles/luxury
http://127.0.0.1:3001/design-styles/organic-design
http://127.0.0.1:3001/design-styles/kawaii
http://127.0.0.1:3001/design-styles/streetwear
http://127.0.0.1:3001/design-styles/editorial-design
http://127.0.0.1:3001/design-styles/glassmorphism
```

Expected:

- Each page has a visibly different style.
- No sample is a plain box-only wireframe.
- Text does not overflow at 390px mobile width.

---

## Task 5: Layout Library Integration

**Files:**
- Modify: `src/components/style-preset/StylePresetProvider.tsx`
- Modify: `src/components/style-preset/AppliedStyleStrip.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/web-layout/LayoutPreviewRenderer.tsx`

- [x] **Step 1: Use selected `DesignStyle` for CSS variables**

Provider must write:

```css
--style-base
--style-surface
--style-text
--style-muted
--style-primary
--style-accent
--style-accent-2
--style-accent-3
--style-border
```

- [x] **Step 2: Confirm localStorage persistence**

Manual test:

1. Open `/design-styles`.
2. Select `사이버펑크`.
3. Reload the page.
4. Open `/web-layouts`.

Expected:

- Applied style strip shows `사이버펑크`.
- Layout preview cards use dark neon colors.

- [x] **Step 3: Confirm compare page**

Manual test:

1. Open `/web-layouts/compare`.
2. Confirm active preview uses selected style colors.
3. Use left/right arrows.

Expected:

- All compared layouts keep the same selected design style.
- Arrows and floating summary still fit on mobile.

---

## Task 6: Image Generation Milestone

**Files:**
- Create: `src/lib/openai-image.ts`
- Create: `src/app/api/generate-design-image/route.ts`
- Create: `src/app/admin/generate-design-images/page.tsx`
- Create: `src/components/design-style/AdminImageGenerator.tsx`
- Modify: `README.md`

- [x] **Step 1: Add server-only OpenAI helper**

`src/lib/openai-image.ts` must:

- Read `process.env.OPENAI_API_KEY`.
- Read `process.env.OPENAI_IMAGE_MODEL || "gpt-image-2"`.
- Read `process.env.IMAGE_OUTPUT_FORMAT || "webp"`.
- Read `process.env.IMAGE_QUALITY || "medium"`.
- Return a clear error when key is missing.
- Never expose API key to client components.

- [x] **Step 2: Add API route**

`src/app/api/generate-design-image/route.ts` must accept:

```json
{
  "slug": "minimalism",
  "force": false
}
```

Expected response:

```json
{
  "ok": true,
  "path": "/generated/design-styles/minimalism.webp",
  "skipped": false
}
```

- [x] **Step 3: Add admin page**

Admin page buttons:

- `누락 이미지 생성`
- `선택 이미지 재생성`
- `전체 재생성`

The page must show:

- slug
- style name
- current image path
- generation status
- error message

- [x] **Step 4: README environment section**

Add:

```text
OPENAI_API_KEY=
OPENAI_IMAGE_MODEL=gpt-image-2
IMAGE_OUTPUT_FORMAT=webp
IMAGE_QUALITY=medium
```

---

## Verification Checklist

- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [x] `/design-styles` loads.
- [x] `/design-styles/minimalism` loads.
- [x] `/design-styles/cyberpunk` loads.
- [x] `/design-styles/luxury` loads.
- [x] `/web-layouts` still loads.
- [x] `/web-layouts/compare` still loads.
- [x] Mobile width 390px has no horizontal page overflow.
- [x] Design style cards look like real style samples, not plain wireframes.
- [x] Layout preview cards still look like real webpages.
- [x] Search filters update instantly.
- [x] Category filters update instantly.
- [x] Selected style persists after reload.
- [x] README explains how to add a new design style.
- [x] README explains image generation environment variables.

---

## Progress Log

- [x] 2026-06-02: User clarified the goal is all styles from the pasted prompt, each as part of a Design Style Library.
- [x] 2026-06-02: Created this implementation plan.
- [x] M1 complete.
- [x] 2026-06-02: M1 data foundation complete: `designStyles` has 88 unique styles, `npm run lint` passed, and `npm run build` passed.
- [x] M2 complete.
- [x] 2026-06-02: M2 listing page complete: added filters, library cards, palette grid, 10 style sample renderers, `npm run lint` passed, and `npm run build` passed.
- [x] M3 complete.
- [x] 2026-06-02: M3 detail pages complete: `/design-styles/[slug]` statically builds 88 routes, key detail URLs return 200, mobile viewport is `width=device-width`, and 390px `scrollWidth` equals `clientWidth`.
- [x] M4 complete.
- [x] 2026-06-02: M4 sample verification complete: captured a 10-style contact sheet for one representative per category under `.next/codex-screens/style-categories/category-contact-sheet.png`.
- [x] M5 complete.
- [x] 2026-06-02: M5 integration complete: applying `cyberpunk` from `/design-styles` stores `selectedSlug`, `/web-layouts` and `/web-layouts/compare` both hydrate to `data-style-preset="cyberpunk"` with accent `#00E5FF`.
- [x] M6 complete.
- [x] 2026-06-02: M6 image generation complete: added `/api/design-style-images`, `/design-styles/generate`, local save path, and verified missing `OPENAI_API_KEY` returns 503 with a clear error.
- [x] M7 complete.
- [x] 2026-06-02: M7 release complete: README and project skill updated, `npm run lint` and `npm run build` pass on `0.1.4`, visual checks captured, and release is prepared for GitHub tag `v0.1.4`.
- [x] 2026-06-03: LayoutPreviewRenderer rewritten to use `--style-*` CSS variables directly (removing hardcoded hex colors), fixing pseudo-element color override bugs in globals.css. All Task 5 verification steps confirmed complete. Plan document fully checked off.
