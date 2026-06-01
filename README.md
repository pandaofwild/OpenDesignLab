# openlayout

다양한 레이아웃 미리보기를 함께 보기 위한 Web Layout Library입니다.

웹사이트 설계에 활용할 수 있는 레이아웃 구조 사전입니다. Next.js App Router, TypeScript, Tailwind CSS로 구성되어 있고, 각 레이아웃 상세 페이지에서 실제 와이어프레임 프리뷰를 데스크톱/태블릿/모바일 보기로 전환하며 확인할 수 있습니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000/web-layouts`를 엽니다.

품질 확인:

```bash
npm run lint
npm run build
```

## 주요 라우트

- `/web-layouts`: 검색, 카테고리, 사용 목적, 복잡도 필터가 있는 레이아웃 목록
- `/web-layouts/[slug]`: 구조 설명, 장단점, 반응형 동작, 접근성 체크포인트, 라이브 프리뷰, 코드 예시
- `/web-layouts/compare`: 최대 3개 레이아웃 비교

## 데이터 추가 방법

레이아웃 데이터는 `src/data/webLayouts.ts`에서 관리합니다.

1. `layoutSeeds` 배열에 항목을 추가합니다.
2. `nameKo`, `nameEn`, `category`, `summary`, `previewType`, `complexity`를 입력합니다.
3. 필요하면 `bestFor`, `notGoodFor`, `tags`를 별도로 지정합니다.
4. `slug`, 상세 설명, 장단점, 반응형 설명, 접근성 노트, 관련 레이아웃은 데이터 빌더가 자동 생성합니다.

카테고리를 새로 추가하려면 `categoryGuides`에도 같은 이름의 설명과 기본 목적 값을 추가해야 합니다.

## 새 previewType 추가 방법

1. `src/data/webLayouts.ts`의 `PreviewType` union에 새 값을 추가합니다.
2. `previewGuides`에 구조 설명, 반응형 동작, 구현 팁을 추가합니다.
3. `src/components/web-layout/LayoutPreviewRenderer.tsx`에 대표 프리뷰 템플릿을 추가합니다.
4. `src/components/web-layout/WireframeThumbnail.tsx`에 목록 카드용 작은 썸네일을 추가합니다.
5. 필요하면 `src/components/web-layout/LayoutCodeExample.tsx`에 해당 유형의 Tailwind 예시 코드를 추가합니다.

## 컴포넌트 구조

- `src/components/web-layout/WebLayoutExplorer.tsx`: 목록 검색과 필터 상태
- `src/components/web-layout/WebLayoutFilters.tsx`: 목록 필터 UI
- `src/components/web-layout/WebLayoutCard.tsx`: 카드와 썸네일
- `src/components/web-layout/LayoutPreview.tsx`: fake browser bar, viewport 전환, grid/label/dense 토글
- `src/components/web-layout/LayoutPreviewRenderer.tsx`: `previewType`별 대표 프리뷰 템플릿
- `src/components/web-layout/LayoutCodeExample.tsx`: 복사 가능한 코드 예시
- `src/components/web-layout/WebLayoutCompare.tsx`: 비교 페이지 인터랙션
