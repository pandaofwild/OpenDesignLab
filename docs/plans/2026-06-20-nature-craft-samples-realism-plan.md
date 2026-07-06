# 구현 Plan — 자연/수공예 샘플 사진 리얼리즘 (파트 B)

설계: `docs/plans/2026-06-20-nature-craft-samples-realism-design.md`

> 파트 A(이미지 6장 생성)는 Opus가 완료함. 6장 모두
> `public/generated/design-styles/{botanical,organic-design,natural,craft,handmade,wabi-sabi}.webp`
> 에 존재(1536×1024 webp, 도메인 장면 사진). Sonnet은 아래 파트 B(데이터/컴포넌트 배선)만 구현한다.
>
> 환경: Next.js 16(Turbopack 미지원 → `next dev --webpack`), Tailwind v4. 코드 전 `AGENTS.md` 지시대로
> `node_modules/next/dist/docs/`의 관련 가이드 확인. **커밋 금지**(검토는 Opus).

## 단계 1 — GENERATED_STYLE_IMAGES 상수에 6개 추가

파일: `src/components/design-style/DesignStyleSampleRenderer.tsx`, 상수 `GENERATED_STYLE_IMAGES` (~L162).

기존 항목들과 동일 형식으로 6개 키를 추가(알파벳 위치 적절히):
```ts
botanical: "/generated/design-styles/botanical.webp",
craft: "/generated/design-styles/craft.webp",
handmade: "/generated/design-styles/handmade.webp",
natural: "/generated/design-styles/natural.webp",
"organic-design": "/generated/design-styles/organic-design.webp",
"wabi-sabi": "/generated/design-styles/wabi-sabi.webp",
```
`GeneratedStyleImageSlug` 타입은 이 상수의 key에서 파생되므로 자동 확장된다.

## 단계 2 — 6개 컴포넌트의 이미지 블록을 실제 사진으로 교체

핵심 원칙: **메인 이미지 블록의 납작한 색 블롭/스와치를 제거**하고 그 자리를
`GeneratedStyleImageSurface`로 교체한다. nav/헤드라인/카피/`NaturalHandmadeBottomStrip`/사이드
readout 등 나머지 레이아웃·텍스트는 보존. caption 칩은 이미지 위 자식으로 유지.

참고 패턴(강한 샘플): japandi(~L1089, ~L1138 작은 셀), warm-minimal(~L1181), scandinavian(~L921).
`<GeneratedStyleImageSurface slug="..." overlay="soft" position="...">{caption chips}</GeneratedStyleImageSurface>`

### 2-1. `BotanicalGlasshouse` (~L4434, slug botanical)
- 우측 `<PhotoSurface scene="interior">` 블록 전체 → `<GeneratedStyleImageSurface slug="botanical" overlay="soft" position="center">`로 교체. 내부의 납작한 녹색 타원 5개와 중앙 세로선 **제거**, `Seasonal plant care` 캡션 칩만 자식으로 유지.
- 좌측 4-cell 그리드(Fern/Moss/Stem/Bloom)의 납작한 블롭(`aspect-square rounded-[58%...]`)을 작은 이미지 크롭으로: 각 셀을 `<GeneratedStyleImageSurface slug="botanical" position="<셀마다 다른 위치>" />`로 바꿔 제품 썸네일처럼(라벨 텍스트는 유지). japandi ~L1138 방식 참고.

### 2-2. `OrganicDesignApothecary` (~L4359, slug organic-design)
- 우측 `<PhotoSurface scene="material">` 블록 → `<GeneratedStyleImageSurface slug="organic-design" overlay="soft">`. 내부 납작한 블롭 2개 제거, `Root extract collection` 캡션 유지.
- 좌측 하단 3-cell 블롭 스와치(accent/accent2/accent3 rounded)는 작은 색 칩 수준으로 축소하거나 작은 이미지 크롭으로 교체(과하면 제거 가능). 상단 배경 blur 블롭 2개(L4362-4363)는 장식이라 유지 가능.

### 2-3. `NaturalMarketShelf` (~L4396, slug natural)
- 좌측 `<PhotoSurface scene="studio">` + 내부 3×2 플랫 스와치 그리드(L4403-4407) → `<GeneratedStyleImageSurface slug="natural" overlay="soft">`로 교체, `Undyed cotton / oat / clay` 캡션 유지. 우측 제품 리스트/CTA는 보존.

### 2-4. `CraftWorkshopLedger` (~L4624, slug craft)
- 우측 `<PhotoSurface scene="product">` 블록 → `<GeneratedStyleImageSurface slug="craft" overlay="soft">`. 내부 납작한 블롭 "그릇" + 막대(L4651-4652) 제거, `Thrown stoneware` 캡션 유지. 좌측 01/02/03 프로세스 카드는 보존.

### 2-5. `HandmadePatchMarket` (~L4586, slug handmade)
- 우측 이미지 블록(`<div ... bg-[var(--sample-surface)] p-3>` + 3×2 플랫 색 스와치 그리드 L4602-4614) → `<GeneratedStyleImageSurface slug="handmade" overlay="soft">`로 교체, `Stamped paper label` 캡션 유지. 점선 보더 미감은 래퍼나 캡션에 유지 가능. 좌측 헤드라인/`one of one` 배지는 보존.

### 2-6. `WabiSabiTeaGallery` (~L4662, slug wabi-sabi)
- 우측 이미지 블록(`<div ... bg-[var(--sample-surface)]>` + 납작한 타원 + 사선들 L4677-4681) → `<GeneratedStyleImageSurface slug="wabi-sabi" overlay="soft" position="40% 50%">`로 교체, `Repaired ceramic bowl` 캡션 유지. 점선 보더는 래퍼에 유지 가능. 좌측 텍스트 보존.

## 단계 3 — compact/full 양쪽 점검

- 각 컴포넌트는 compact(카드)와 full(디테일) 모두에서 렌더된다. 이미지 블록 교체 후 텍스트 잘림/오버플로우 없는지, 캡션 칩이 이미지 위에서 읽히는지 확인.
- `position`/`overlay`는 이미지 주제가 잘 보이도록 조정(예: wabi-sabi 그릇이 좌측에 있으니 `position`을 좌측 쪽으로).

## 단계 4 — 검증

1. `npx next dev --webpack`로 기동.
2. Playwright로 `/styles/{botanical,organic-design,natural,craft,handmade,wabi-sabi}`(full)와 `/styles` 카드(compact) 확인. 실제 사진 backdrop이 보이고 깨짐/콘솔 에러 없는지.
3. `npm run check:data`, `npm run lint`, `npx tsc --noEmit`(또는 build) 통과. 기존 스타일 회귀 없음.

## 완료 조건 (Opus 리뷰)
- [ ] 6개 샘플이 실제 사진 backdrop으로 강한 카테고리(japandi 등)와 동급 리얼리즘.
- [ ] 납작한 블롭/스와치 제거됨. 캡션·nav·카피·bottom strip 보존.
- [ ] compact/full 무결, lint/type/check:data 통과, 콘솔 에러 없음.
