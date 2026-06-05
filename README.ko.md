# OpenDesignLab

**한국어** | [English](./README.md)

OpenDesignLab은 AI 기반 프론트엔드 작업을 위한 오픈 디자인 스펙 랩입니다.

레이아웃 구조, 시각 스타일, 색상 팔레트, 컴포넌트 패턴을 조합해 실제 웹페이지형 프리뷰, 프롬프트, 구현용 스니펫으로 바꿉니다. 장기 목표는 이 선택들을 프로젝트별 `design.md` 파일로 변환해 Codex 같은 코딩 에이전트가 일관된 디자인 규칙을 따르도록 돕는 것입니다.

| 항목 | 값 |
| --- | --- |
| Repository | https://github.com/pandaofwild/OpenDesignLab |
| 현재 카탈로그 | 96개 레이아웃, 88개 디자인 스타일, 10개 스타일 카테고리 |
| 출력물 | 프리뷰, 프롬프트, HTML/CSS 스니펫, 스타일 토큰 |
| 로드맵 | 프로젝트별 `design.md` 생성 |
| 마지막 검토일 | 2026-06-05 |

![OpenDesignLab style cards](docs/assets/opendesignlab-style-cards.jpg)

## 왜 만들었나

AI 코딩은 디자인 방향이 명확할수록 더 안정적으로 작동합니다. "모던하고 깔끔하게 만들어줘" 같은 요청은 레이아웃, 위계, 색상, 컴포넌트, 접근성 기준이 매번 흔들리기 쉽습니다.

OpenDesignLab은 디자인 의도를 확인 가능한 선택지로 바꿉니다.

- 코드를 쓰기 전에 페이지 구조를 고릅니다.
- 컴포넌트를 스타일링하기 전에 시각 언어를 정합니다.
- UI 생성 전에 팔레트와 토큰 동작을 조율합니다.
- 결정한 내용을 프롬프트와 코드 스니펫으로 내보냅니다.
- 최종적으로 코딩 에이전트가 읽을 수 있는 프로젝트 단위 `design.md`로 확장합니다.

## 대상 사용자

- 웹사이트 구조를 빠르게 비교해야 하는 디자이너
- 페이지와 컴포넌트의 안정적인 출발점이 필요한 프론트엔드 개발자
- AI 코딩 전에 레이아웃, 스타일, 접근성, 컴포넌트 규칙을 명확히 하고 싶은 사용자
- 구현 전에 디자인 결정을 공유 언어로 정리하고 싶은 팀

## 조합할 수 있는 것

| 영역 | 제공하는 것 |
| --- | --- |
| Layouts | 랜딩페이지, 대시보드, 문서, 커머스, 갤러리, 모바일 플로우, 실험적 페이지를 위한 96개 구조 |
| Design styles | 팔레트, 타이포그래피 노트, 샘플 프리뷰, 사용 사례, 주의점을 포함한 88개 시각 방향 |
| Components | 버튼, 카드, 내비게이션, 입력 필드, 배지에 대한 토큰 기반 프리뷰 |
| Palettes | 프롬프트 기반 팔레트 생성과 레이아웃 프리뷰 적용 |
| Studio | Style x Layout 조합을 미리 보고 프롬프트나 HTML/CSS를 복사하는 작업 공간 |

## 주요 화면

### Layout Explorer

![OpenDesignLab layout explorer](docs/assets/opendesignlab-layouts.jpg)

## 주요 기능

- **Layout explorer**: 검색어, 카테고리, 사용 목적, 복잡도로 레이아웃을 필터링합니다.
- **Full-stage preview**: 상세 페이지와 비교 페이지에서 레이아웃을 실제 웹페이지 배경처럼 크게 확인합니다.
- **Design Style Lab**: 88개의 디자인 형식을 카테고리, 태그, 검색어로 탐색하고 색상표와 웹페이지형 샘플을 확인합니다.
- **Style application**: `/styles`에서 선택한 디자인 형식을 `/layouts`와 `/layouts/compare` 프리뷰에 적용하고 localStorage에 유지합니다.
- **Studio copy**: `/studio`에서 선택한 Style x Layout 조합의 프롬프트와 self-contained HTML/CSS 코드를 복사할 수 있습니다.
- **Component dictionary**: 같은 스타일 토큰이 버튼, 카드, 내비게이션, 입력 필드, 배지에 어떻게 적용되는지 확인할 수 있습니다.
- **Prompt palette**: 프롬프트로 커스텀 색상표를 생성하고 현재 레이아웃 프리뷰에 바로 적용합니다.
- **Image generation admin**: OpenAI Image API로 스타일별 참조 이미지를 로컬에서 생성합니다.
- **Project skills**: 내부 추천 스킬이 목적, 톤, 제약 조건에 맞는 레이아웃과 스타일 선택을 돕습니다.

## AI 코딩 워크플로우

1. `hero`, `card-grid`, `dashboard`, `docs`, `comparison` 같은 페이지 목적에 맞는 레이아웃을 고릅니다.
2. `brutalism`, `cyberpunk`, `luxury`, `organic-design`, `saas-style` 같은 디자인 스타일을 고릅니다.
3. 구조와 스타일이 함께 적용된 화면을 미리 봅니다.
4. 프롬프트나 HTML/CSS 스니펫을 코딩 워크플로우로 가져갑니다.
5. 선택한 규칙을 향후 `design.md` 파일의 기반으로 사용합니다.

## 로드맵

- 선택한 레이아웃, 스타일, 팔레트, 컴포넌트 규칙으로 프로젝트 단위 `design.md`를 생성합니다.
- 버튼, 폼, 카드, 내비게이션, 페이지 섹션이 하나의 디자인 계약을 공유하도록 컴포넌트 스펙을 강화합니다.
- 각 레이아웃과 스타일 조합의 접근성 및 반응형 검사를 개선합니다.
- AI 코딩 에이전트, 디자인 핸드오프, 프론트엔드 스캐폴딩을 위한 export 형식을 늘립니다.

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
src/app/studio/page.tsx               # Style x Layout studio
src/app/components/page.tsx           # Component dictionary
src/app/styles/page.tsx            # Design style library page
src/app/styles/[slug]/page.tsx     # Design style detail page
src/app/styles/generate/page.tsx   # Local image generation admin
src/app/api/design-style-images/route.ts  # OpenAI Image API route
src/data/webLayouts.ts                    # Layout catalog and generated metadata
src/data/designStyles.ts                  # 88 design styles and generated metadata
src/data/componentSpecs.ts                # Tokenized component dictionary specs
src/components/web-layout/                # Explorer, cards, previews, compare UI
src/components/design-style/              # Style cards, filters, samples, generator UI
src/components/component-dictionary/      # Component token previews and picker UI
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
