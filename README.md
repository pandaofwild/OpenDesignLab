# openlayout

웹사이트 레이아웃을 찾고, 비교하고, 실제 와이어프레임으로 확인하는 Web Layout Library입니다.

openlayout은 디자인을 시작하기 전에 페이지 구조를 빠르게 고를 수 있도록 만든 레이아웃 사전입니다. 96개의 레이아웃, 12개의 카테고리, 16개의 프리뷰 템플릿을 제공하며, 각 레이아웃은 추천 용도, 장단점, 반응형 동작, 접근성 체크포인트, Tailwind 구현 힌트를 함께 보여줍니다.

| 항목 | 값 |
| --- | --- |
| Repository | https://github.com/pandaofwild/openlayout |
| 마지막 검토일 | 2026-06-01 |

## 대상 사용자

- 웹사이트 구조를 빠르게 비교해야 하는 디자이너
- 랜딩페이지, 대시보드, 문서, 커머스 화면의 기본 골격을 찾는 프론트엔드 개발자
- 반응형 동작과 접근성 관점까지 함께 확인하고 싶은 팀

## 주요 기능

- **Layout explorer**: 검색어, 카테고리, 사용 목적, 복잡도로 레이아웃을 필터링합니다.
- **Live preview**: 상세 페이지에서 데스크톱, 태블릿, 모바일 크기를 전환하며 와이어프레임을 확인합니다.
- **Preview controls**: grid, label, dense content 토글로 구조와 콘텐츠 내구성을 점검합니다.
- **Compare view**: 최대 3개의 레이아웃을 선택해 추천 용도, 모바일 대응, 밀도, 난이도를 나란히 비교합니다.
- **Large structure viewer**: 비교 페이지에서 이전/다음 버튼으로 선택한 레이아웃 구조를 크게 확인합니다.
- **Implementation hints**: previewType별 Tailwind 코드 예시와 구현 팁을 제공합니다.

## 빠른 시작

요구 사항:

- Node.js
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
http://localhost:3000/web-layouts
```

루트 경로(`/`)는 `/web-layouts`로 리다이렉트됩니다.

## 주요 라우트

| Route | 내용 |
| --- | --- |
| `/web-layouts` | 레이아웃 검색, 필터, 카드 목록 |
| `/web-layouts/[slug]` | 구조 설명, 장단점, 반응형 동작, 접근성 노트, 라이브 프리뷰, 코드 예시 |
| `/web-layouts/compare` | 최대 3개 레이아웃 비교와 큰 구조 미리보기 |

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
src/app/web-layouts/page.tsx              # Explorer page
src/app/web-layouts/[slug]/page.tsx       # Layout detail page
src/app/web-layouts/compare/page.tsx      # Compare page shell
src/data/webLayouts.ts                    # Layout catalog and generated metadata
src/components/web-layout/                # Explorer, cards, previews, compare UI
src/components/ui/                        # Small shared UI primitives
```

주요 컴포넌트:

| File | 역할 |
| --- | --- |
| `WebLayoutExplorer.tsx` | 레이아웃 목록의 검색과 필터 상태 |
| `WebLayoutFilters.tsx` | 검색어, 카테고리, 목적, 복잡도 필터 UI |
| `WebLayoutCard.tsx` | 레이아웃 카드와 썸네일 |
| `LayoutPreview.tsx` | 브라우저 형태의 프리뷰 프레임과 뷰포트 컨트롤 |
| `LayoutPreviewRenderer.tsx` | previewType별 큰 라이브 프리뷰 템플릿 |
| `WireframeThumbnail.tsx` | 카드와 비교 화면에 쓰이는 구조 썸네일 |
| `LayoutCodeExample.tsx` | 복사 가능한 Tailwind 구현 예시 |
| `WebLayoutCompare.tsx` | 비교 페이지 선택, 접힌 설명, 구조 탐색 |

## 레이아웃 추가

레이아웃 데이터는 `src/data/webLayouts.ts`에서 관리합니다.

1. `layoutSeeds`에 새 항목을 추가합니다.
2. `nameKo`, `nameEn`, `category`, `summary`, `previewType`, `complexity`를 입력합니다.
3. 기본값을 바꿔야 할 때만 `bestFor`, `notGoodFor`, `tags`를 추가합니다.
4. `slug`, 긴 설명, 장단점, 반응형 노트, 접근성 노트, 구현 팁, 관련 레이아웃은 데이터 빌더가 생성하도록 둡니다.

새 카테고리를 추가할 때는 `categoryGuides`에도 설명과 기본값을 추가해야 합니다.

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
