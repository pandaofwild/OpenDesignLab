# openlayout

**한국어** | [English](./README.en.md)

웹사이트 레이아웃과 디자인 형식을 분리해서 고르고, 비교하고, 실제 웹페이지형 프리뷰로 확인하는 Web Layout Library입니다.

openlayout은 디자인을 시작하기 전에 페이지 구조와 시각 언어를 빠르게 고를 수 있도록 만든 레이아웃/스타일 사전입니다. 96개의 레이아웃, 88개의 디자인 형식, 10개의 스타일 카테고리, 웹페이지형 샘플 렌더러를 제공하며, 각 항목은 추천 용도, 장단점, 반응형 동작, 접근성 체크포인트, 색상표, Tailwind 구현 힌트를 함께 보여줍니다.

| 항목 | 값 |
| --- | --- |
| Repository | https://github.com/pandaofwild/openlayout |
| 마지막 검토일 | 2026-06-03 |

## 대상 사용자

- 웹사이트 구조를 빠르게 비교해야 하는 디자이너
- 랜딩페이지, 대시보드, 문서, 커머스 화면의 기본 골격을 찾는 프론트엔드 개발자
- 반응형 동작과 접근성 관점까지 함께 확인하고 싶은 팀

## 주요 기능

- **Layout explorer**: 검색어, 카테고리, 사용 목적, 복잡도로 레이아웃을 필터링합니다.
- **Full-stage preview**: 상세 페이지와 비교 페이지에서 레이아웃을 실제 웹페이지 배경처럼 크게 확인합니다.
- **Floating detail panel**: 기본 화면에는 작은 요약 박스만 두고, 클릭하면 구조 설명과 장단점이 패널로 떠오릅니다.
- **Compare view**: 최대 3개의 레이아웃을 선택해 추천 용도, 모바일 대응, 밀도, 난이도를 나란히 비교합니다.
- **Design Style Library**: 88개의 디자인 형식을 카테고리, 태그, 검색어로 탐색하고 상세 페이지에서 색상표와 웹페이지형 샘플을 확인합니다.
- **Style application**: `/styles`에서 선택한 디자인 형식이 `/layouts`와 `/layouts/compare`의 프리뷰 톤에 적용되고 localStorage에 유지됩니다.
- **Studio copy**: `/studio`에서 선택한 Style x Layout 조합의 프롬프트와 self-contained HTML/CSS 코드를 복사할 수 있습니다.
- **Component dictionary**: `/components`에서 같은 스타일 토큰이 주요 UI 컴포넌트에 어떻게 적용되는지 확인할 수 있습니다.
- **Prompt palette**: 프롬프트를 섞어 커스텀 색상표를 생성하고 현재 레이아웃 프리뷰에 바로 적용합니다.
- **Image generation admin**: `OPENAI_API_KEY`가 있는 로컬 환경에서 스타일별 참조 이미지를 생성해 `public/generated/design-styles`에 저장할 수 있습니다.
- **SVG controls**: 비교 화살표와 설명/닫기/상세 아이콘은 inline SVG로 관리합니다.
- **Implementation hints**: previewType별 Tailwind 코드 예시와 구현 팁을 제공합니다.
- **Project skills**: `skills/layout-recommender/SKILL.md`와 `skills/design-style-recommender/SKILL.md`가 목적별 레이아웃/스타일 추천 방식을 안내합니다.

## 바이브 코딩에 도움되는 점

- 시작 전에 페이지 목적을 말하면 레이아웃 후보를 빠르게 좁힐 수 있습니다. 예: "SaaS 대시보드 랜딩", "브랜드 캠페인", "문서형 지식 베이스".
- 각 레이아웃은 추천 용도, 피해야 할 상황, 반응형 동작, 접근성 체크포인트를 함께 갖고 있어 프롬프트에 넣을 설계 조건을 바로 뽑아낼 수 있습니다.
- 비교 페이지의 큰 프리뷰와 플로팅 설명 패널을 보면서 "이 구조로 가자", "이건 모바일에서 약하다" 같은 결정을 짧은 피드백으로 반복하기 좋습니다.
- `previewType`은 구현 방향의 압축어처럼 쓸 수 있습니다. 예: `hero`, `card-grid`, `dashboard`, `docs`, `comparison`.
- `DesignStyle`은 시각 방향의 압축어처럼 쓸 수 있습니다. 예: `brutalism`, `cyberpunk`, `luxury`, `organic-design`, `saas-style`.
- 새 화면을 만들 때는 먼저 레이아웃 사전에서 구조를 고르고, 그 다음 디자인 형식에서 색상/타이포/분위기를 고른 뒤, 컴포넌트와 카피를 코딩 에이전트에게 맡기는 흐름이 가장 안정적입니다.

## 빠른 시작

요구 사항:

- Node.js 22 이상
- npm

의존성 설치:

```bash
npm install
```

개발 서버 실행:

```bash
npm run dev
```

브라우저에서 열기:

```text
http://localhost:3000/layouts
```

루트 경로(`/`)는 `/layouts`로 리다이렉트됩니다.

## 주요 라우트

| Route | 내용 |
| --- | --- |
| `/layouts` | 레이아웃 검색, 필터, 카드 목록 |
| `/layouts/[slug]` | 구조 설명, 장단점, 반응형 동작, 접근성 노트, 라이브 프리뷰, 코드 예시 |
| `/layouts/compare` | 최대 3개 레이아웃 비교와 큰 구조 미리보기 |
| `/studio` | 디자인 스타일과 레이아웃을 조합해 실제 웹 프리뷰를 보고 코드/프롬프트를 복사 |
| `/styles` | 디자인 형식 검색, 카테고리/태그 필터, 색상표, 웹페이지형 스타일 샘플 |
| `/styles/[slug]` | 디자인 형식 상세 설명, 색상표, 타이포/레이아웃 특징, 관련 스타일 |
| `/styles/generate` | OpenAI Image API 기반 로컬 참조 이미지 생성 관리자 |
| `/components` | 디자인 스타일 토큰을 버튼, 카드, 내비게이션, 입력 필드, 배지에 적용해 비교 |

## 이미지 생성 환경 변수

`/styles/generate`와 `/api/design-style-images`는 로컬 관리자 기능입니다.

```bash
OPENAI_API_KEY=sk-...
OPENAI_IMAGE_MODEL=gpt-image-1.5
```

- `OPENAI_API_KEY`는 필수입니다.
- `OPENAI_IMAGE_MODEL`은 선택값이며 기본값은 `gpt-image-1.5`입니다.
- 생성 결과는 `public/generated/design-styles/{slug}.webp`에 저장됩니다.
- Vercel 같은 읽기 전용 배포 환경에서는 Blob/S3 같은 외부 저장소로 바꾸는 것이 안전합니다.

## 오픈소스 사용

이 프로젝트는 MIT 라이선스로 배포됩니다. 자세한 조건은 `LICENSE`를 확인하세요.

- 기여 방법: `CONTRIBUTING.md`
- 보안 제보: `SECURITY.md`
- 로컬 환경 변수 예시: `.env.example`
- CI: `.github/workflows/ci.yml`

## 품질 확인

변경 사항을 배포하거나 업로드하기 전에 확인합니다.

```bash
npm run lint
npm run build
```

## 기술 스택

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

레이아웃 카탈로그는 정적 데이터 기반입니다. 별도 데이터베이스나 외부 API가 필요하지 않습니다.

## 프로젝트 구조

```text
src/app/layouts/page.tsx              # Explorer page
src/app/layouts/[slug]/page.tsx       # Layout detail page
src/app/layouts/compare/page.tsx      # Compare page shell
src/app/styles/page.tsx            # Design style library page
src/app/styles/[slug]/page.tsx     # Design style detail page
src/app/styles/generate/page.tsx   # Local image generation admin
src/app/api/design-style-images/route.ts  # OpenAI Image API route
src/data/webLayouts.ts                    # Layout catalog and generated metadata
src/data/designStyles.ts                  # 88 design styles and generated metadata
src/components/web-layout/                # Explorer, cards, previews, compare UI
src/components/design-style/              # Style cards, filters, samples, generator UI
src/components/style-preset/              # Global selected style provider
src/components/ui/                        # Small shared UI primitives
skills/layout-recommender/SKILL.md        # Purpose-based layout recommendation skill
skills/design-style-recommender/SKILL.md  # Brand-tone-based style recommendation skill
```

주요 컴포넌트:

| File | 역할 |
| --- | --- |
| `WebLayoutExplorer.tsx` | 레이아웃 목록의 검색과 필터 상태 |
| `WebLayoutFilters.tsx` | 검색어, 카테고리, 목적, 복잡도 필터 UI |
| `WebLayoutCard.tsx` | 레이아웃 카드와 썸네일 |
| `LayoutStagePreview.tsx` | 전체 배경형 프리뷰, 플로팅 요약, 클릭형 설명 패널 |
| `LayoutPreview.tsx` | 뷰포트 전환이 필요한 브라우저형 프리뷰 유틸 |
| `LayoutPreviewRenderer.tsx` | previewType별 큰 라이브 프리뷰 템플릿 |
| `WireframeThumbnail.tsx` | 카드와 비교 화면에 쓰이는 구조 썸네일 |
| `LayoutCodeExample.tsx` | 복사 가능한 Tailwind 구현 예시 |
| `WebLayoutCompare.tsx` | 비교 페이지 선택, SVG 화살표 탐색, 큰 프리뷰 표시 |
| `DesignStyleLibrary.tsx` | 디자인 형식 목록의 검색, 필터, 적용 상태 |
| `DesignStyleCard.tsx` | 디자인 형식 카드, 색상표, 웹페이지형 샘플, 적용 버튼 |
| `DesignStyleSampleRenderer.tsx` | sampleType별 10개 웹페이지형 스타일 샘플 |
| `StylePresetProvider.tsx` | 선택된 디자인 형식과 커스텀 팔레트 localStorage 유지 |
| `DesignStyleImageGenerator.tsx` | 스타일 참조 이미지 생성 관리자 UI |

## 프로젝트 스킬

`skills/layout-recommender/SKILL.md`는 코딩 에이전트가 사용 목적에 맞는 레이아웃을 추천할 때 읽는 내부 스킬입니다.

`skills/design-style-recommender/SKILL.md`는 브랜드 톤, 업종, 감정, 타이포그래피, 색상 방향에 맞는 디자인 형식을 추천할 때 읽는 내부 스킬입니다.

추천 요청 예시:

```text
이 서비스는 B2B SaaS 온보딩 페이지야. 신뢰와 기능 설명이 중요하고 모바일도 챙겨야 해. 어떤 레이아웃이 좋아?
```

스킬은 `src/data/webLayouts.ts`의 카테고리, `bestFor`, `notGoodFor`, `tags`, `previewType`을 먼저 확인하고 1순위 후보, 대안, 피해야 할 구조를 짧게 제안하도록 설계되어 있습니다.

디자인 스타일 추천 요청 예시:

```text
프리미엄 뷰티 브랜드 랜딩인데 너무 화려하진 않고 고급스럽게 보여야 해. 어떤 디자인 형식이 좋아?
```

디자인 스타일 스킬은 `src/data/designStyles.ts`의 `category`, `tags`, `goodFor`, `useCases`, `palette`, `sampleType`을 기준으로 1순위 스타일, 대안, 피해야 할 스타일을 제안합니다.

## 레이아웃 추가

레이아웃 데이터는 `src/data/webLayouts.ts`에서 관리합니다.

1. `layoutSeeds`에 새 항목을 추가합니다.
2. `nameKo`, `nameEn`, `category`, `summary`, `previewType`, `complexity`를 입력합니다.
3. 기본값을 바꿔야 할 때만 `bestFor`, `notGoodFor`, `tags`를 추가합니다.
4. `slug`, 긴 설명, 장단점, 반응형 노트, 접근성 노트, 구현 팁, 관련 레이아웃은 데이터 빌더가 생성하도록 둡니다.

새 카테고리를 추가할 때는 `categoryGuides`에도 설명과 기본값을 추가해야 합니다.

## 디자인 형식 추가

디자인 형식 데이터는 `src/data/designStyles.ts`에서 관리합니다.

1. `styleSeedTuples`에 새 항목을 추가합니다.
2. `slug`, `nameKo`, `nameEn`, `category`, `tone`, `tags`, `sampleType`을 입력합니다.
3. 필요하면 `palettes`에 해당 slug의 9색 팔레트를 추가합니다.
4. 새 범주가 필요하면 `categoryProfiles`에 시각 특징, 색상 노트, 타이포그래피, 레이아웃 경향을 추가합니다.
5. 기존 10개 샘플 렌더러로 표현이 부족할 때만 `DesignStyleSampleType`과 `DesignStyleSampleRenderer.tsx`를 확장합니다.

## Preview Type 추가

기존 템플릿으로 구조가 충분히 드러나지 않을 때 새 previewType을 추가합니다.

1. `src/data/webLayouts.ts`의 `PreviewType` union을 확장합니다.
2. `previewGuides`에 구조 설명, 반응형 동작, 구현 팁을 추가합니다.
3. `src/components/web-layout/LayoutPreviewRenderer.tsx`에 라이브 프리뷰 렌더러를 추가합니다.
4. `src/components/web-layout/WireframeThumbnail.tsx`에 썸네일 다이어그램을 추가합니다.
5. 기존 예시와 구현 방식이 다르면 `src/components/web-layout/LayoutCodeExample.tsx`에 Tailwind 예시를 추가합니다.

## 작성 및 설계 노트

- 레이아웃 이름과 요약은 실용적으로 씁니다. 상세 페이지를 열지 않아도 언제 쓰는 구조인지 알 수 있어야 합니다.
- `Header`, `Main`, `Sidebar`, `CTA`, `TOC`, `Product`처럼 구체적인 구조 라벨을 우선합니다.
- 상세 페이지는 장점만이 아니라 한계와 트레이드오프도 설명합니다.
- 비교 페이지의 긴 설명은 기본적으로 접어 두어 구조 그림을 먼저 훑을 수 있게 합니다.
