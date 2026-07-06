# 자연/수공예 샘플 사진 리얼리즘 개선 (설계)

- 날짜: 2026-06-20
- 대상: `자연/수공예` 카테고리 6개 디자인 스타일 샘플
- 결정: **실제 이미지 생성** 방식 (사용자 선택), 범위 **6개** (사용자 선택)

## 문제 (감사 결과)

88개 스타일을 전수 렌더해 본 결과, 대부분의 카테고리는 실제 AI 생성 장면 이미지
(`GeneratedStyleImageSurface` + `/generated/design-styles/<slug>.webp`)와 제대로 된 nav/타이포로
진짜 웹페이지처럼 보인다. 유독 `자연/수공예` 6개는 제품 이미지 자리에 **납작한 색 블롭/스와치**를
얹어 식물·그릇·재료를 표현해, 추상 와이어프레임처럼 보인다.

| 슬러그 | 컴포넌트 | 현재 문제 |
|---|---|---|
| handmade | `HandmadePatchMarket` (~L4586) | PhotoSurface 없이 팔레트 색 사각형 6개 그리드 |
| wabi-sabi | `WabiSabiTeaGallery` (~L4662) | 플랫 surface 위 납작한 타원 1개 = "그릇" |
| botanical | `BotanicalGlasshouse` (~L4434) | interior PhotoSurface 위 납작한 녹색 타원 5개 = "식물" |
| organic-design | `OrganicDesignApothecary` (~L4359) | material PhotoSurface 위 납작한 블롭들 + 사이드 블롭 스와치 |
| natural | `NaturalMarketShelf` (~L4396) | studio PhotoSurface 위 플랫 색 스와치 그리드 |
| craft | `CraftWorkshopLedger` (~L4624) | product PhotoSurface 위 납작한 블롭 "그릇" + 막대 |

같은 카테고리라도 kinfolk(순수 PhotoSurface 에디토리얼), eco-design(통계 대시보드),
rustic(목재톤 구조)은 양호 → **건드리지 않음**.

근본 원인: 이 6개는 `GENERATED_STYLE_IMAGES`(`DesignStyleSampleRenderer.tsx` ~L162)에 항목이 없어
실제 장면 사진이 없고, 컴포넌트가 그 자리를 납작한 CSS 도형으로 채운다.

## 이미지 시스템 정리 (중요)

프로젝트에는 두 종류의 생성 이미지가 있다:
1. **moodboards** (`/generated/moodboards/<slug>-realistic-v2.webp`) — 디테일 페이지 무드보드 섹션용
   flat-lay 리서치 보드. 6개 모두 이미 존재. `designStyles.ts`의 `StyleMoodboard` 섹션(~L3622)에 데이터.
2. **design-styles** (`/generated/design-styles/<slug>.webp`) — **샘플 컴포넌트의 backdrop**.
   `GeneratedStyleImageSurface`가 사용. 강한 샘플(japandi/scandinavian/warm-minimal 등)은 이걸로
   실제 인테리어/제품 **장면 사진**을 깔아 리얼하게 보인다. 6개는 여기에 없음.

→ 이번 작업은 **(2) design-styles 장면 사진을 6개 생성**하고 샘플을 그걸 쓰도록 바꾸는 것.
무드보드(1)는 건드리지 않는다.

## 생성 메커니즘

- 라우트 `POST /api/design-style-images` (`src/app/api/design-style-images/route.ts`):
  OpenAI 이미지 API(`gpt-image-1.5`) 호출 → `public/generated/design-styles/<slug>.webp` 저장.
- 요구: `OPENAI_API_KEY`(현재 미설정, `.env.local` 필요), `NODE_ENV=development`.
- 프롬프트 = `[style.imagePrompt, customPrompt].join(". ")`. customPrompt로 장면 지향 프롬프트를 보강한다.
- **외부 API 호출 + 비용 발생** → 사용자 키/승인 하에만 진행.

## 설계

### A. 장면 사진 6개 생성 (Opus 담당)

각 슬러그에 대해 **도메인 장면 사진**(flat-lay 무드보드 아님)을 생성. 샘플 이미지 블록에 크롭되어
backdrop으로 들어가므로, 한 장의 일관된 장면이어야 한다.

- botanical → 화사한 식물 가게/온실 진열, 잎·화분의 자연광 장면
- organic-design → 유기적 자연 형태의 아포테카리 제품(오일/추출물) 정물
- natural → 무염색 천연 소재 제품(린넨·라탄·생활용품) 상점 진열
- craft → 물레로 빚은 도자기/스톤웨어 공방 장면
- handmade → 수제 종이·비누·패치 등 소량 생산품 진열
- wabi-sabi → 불완전한 다완/도자 한 점, 고요한 정물

생성 가이드: `docs/style-moodboard-imagegen-guidelines.md`의 리얼리즘/금지 규칙(읽기 텍스트·로고·
워터마크·플로팅 카드 금지)을 따르되, **flat-lay가 아니라 장면 사진**으로. 팔레트는 각 슬러그
`palettes`(designStyles.ts ~L853~)와 일치. 생성 후 acceptance checklist로 시각 검수, 합성 티 나면
프롬프트 수정 후 재생성.

### B. 컴포넌트/데이터 배선 (Sonnet 담당, 긴 코드)

1. `DesignStyleSampleRenderer.tsx`의 `GENERATED_STYLE_IMAGES` 상수(~L162)에 6개 슬러그 추가:
   `"botanical": "/generated/design-styles/botanical.webp"` 등.
   (참고: 이 상수의 key 타입 `GeneratedStyleImageSlug`가 컴포넌트의 `slug` prop을 제약함.)
2. 6개 컴포넌트의 **이미지 블록만** 교체: 납작한 블롭/스와치 → `GeneratedStyleImageSurface`.
   - 강한 샘플 패턴을 그대로 모사: japandi(~L1089), warm-minimal(~L1181), scandinavian(~L921).
     `<GeneratedStyleImageSurface slug="<slug>" overlay="soft|warm" position="...">` 안에
     기존 caption 칩(예: "Seasonal plant care", "Thrown stoneware")을 자식으로 유지.
   - nav/헤드라인/카피/`NaturalHandmadeBottomStrip`/사이드 readout 등 나머지 레이아웃은 보존.
   - 사이드의 블롭 스와치(organic-design 사이드, botanical 4-cell)는 실제 의미가 약하면 제거하거나
     작은 색 칩 수준으로 정리 — 단, 메인 이미지 블록 리얼리즘이 우선.
   - compact/full 양쪽에서 깨지지 않게(텍스트 잘림 방지) 유지.

### 아키텍처/리스크

- design-styles 이미지가 없으면 `GeneratedStyleImageSurface`는 빈 배경이 됨 → **생성(A)을 먼저** 하고
  배선(B)을 해야 검증 가능. 단, 코드(B)는 경로만 참조하므로 생성 전 작성해도 무방(검증만 뒤로).
- `GeneratedStyleImageSlug` 타입에 6개가 추가돼야 컴포넌트가 타입 통과.
- 무드보드 데이터/이미지는 변경 금지(범위 밖).

## 검증 (Opus)

1. `.env.local`에 키 설정 후 `npx next dev --webpack` 재기동.
2. 6개 이미지 생성 + 시각 검수(합성 티/팔레트/도메인 적합성).
3. Playwright로 `/styles/<slug>`(full)와 `/styles` 카드(compact) 6개 확인 — 실제 페이지처럼 보이는지,
   강한 카테고리와 동급 리얼리즘인지.
4. `npm run check:data`, `npm run lint`, `npm run build` 통과. 기존 스타일 회귀 없음.

## 작업 분담

- Opus: 감사, 본 설계 + plan, 프롬프트 작성, 이미지 생성/검수, 코드 리뷰/최종 검증.
- Sonnet 서브에이전트: B(데이터/컴포넌트 배선) 긴 코드 작성.
