# Postmodernism 샘플 리디자인 — "PALLADIO & POP" 경매 하우스

날짜: 2026-07-11
상태: 승인됨 (owner 확인: 콘셉트 + 골격 + 하우스 이름)

## 배경 / 문제

현재 `PostmodernArchivePortal` 샘플은 스타일 정의와 충돌한다:

1. 균일한 검정 외곽선 박스 + 하드 오프셋 그림자 + 원색 구성이 자기 자신의
   avoidTraits 1번 "Neo-brutalist component kit"로 읽힌다. 관련 스타일로 나란히
   노출되는 New Brutalism 샘플과 형제처럼 보인다.
2. 우측 오브젝트 카드(Graves bridge 등)가 48px 색면 스와치 — 실물 콘텐츠가 아닌
   플레이스홀더. "Memphis anti-functional shop"도 이미지·가격 없는 텍스트 그리드.
3. "ironic object index", "culture collage" 같은 스타일 특성 이름이 UI 카피로
   그대로 쓰여 사이트가 아니라 스타일 해설 패널처럼 읽힌다.
4. 레이아웃 골격(좌 이미지 히어로 + 우 인용/리스트 레일 + 하단 풀폭 바)이 바로 위
   avant-garde(KUNSTHALLE)와 사실상 동일 — 레이아웃 다양성 지침 위반.
5. 컴팩트 카드에서 헤드라인 "misbehave."가 museum label 박스와 겹침 (렌더 확인됨).
6. 콘셉트 "미술관/아카이브 포털"이 가장 정석적인 매핑 — concept originality 지침 위반.

## 콘셉트

가상의 경매 하우스 **PALLADIO & POP**의 라이브 디자인 세일 페이지.
카피: `Design Sale No.44 — The Quotation Sale`.

- 이름 자체가 고전(Palladio) × 팝의 충돌 = 스타일 선언.
- 아이러니는 라벨이 아니라 **롯 구성**으로 표현: 로마 흉상(after the antique) 옆에
  Warhol 실크스크린, 그 옆에 Memphis Carlton 선반이 같은 카탈로그에 놓인다.
- 모든 카피는 실제 경매 사이트 문법: lot 번호, 추정가(est.), 현재가, 입찰 단위,
  낙찰 결과, paddle 번호. 스타일 해설형 메타 라벨 전면 금지.

검토한 대안: 포스트모던 부동산 리스팅(Chippendale Estates), 포스트모던
리조트/테마파크(Pleasure Dome). 경매가 culture collage를 사이트의 본업으로 만들어
가장 자연스럽고, kitsch/dopamine과의 톤 겹침(리조트 안)도 없어 채택.
호텔 콘셉트는 neoclassic/art-deco가 이미 사용 중이라 제외.

## 레이아웃 스켈레톤 — 3열 비대칭 카탈로그 스프레드

avant-garde(좌 히어로 + 우 레일)와 구조적으로 구분되는, 카테고리 내 유일 골격:

```
┌ 헤더: PALLADIO & POP (세리프) · sales/departments/results · paddle No.204 ┐
├ 라이브 티커 바(코발트, 풀폭): ● LIVE — Lot 12 of 48 · current $4,200 ... ─┤
│ ┌ 세리프 에세이 ┐ ┌── FEATURED LOT (중앙 지배) ──┐ ┌ upcoming lots ─────┐ │
│ │ 카탈로그 서문  │ │ 생성 이미지 풀블리드          │ │ Lot 13 썸네일+est   │ │
│ │ 드롭캡 인용문  │ │ LOT 12 · Graves kettle       │ │ Lot 14 썸네일+est   │ │
│ │ 세일 정보     │ │ est / current / [BID]+입찰단위 │ │ Lot 15 썸네일+est   │ │
│ └─────────────┘ └────────────────────────────┘ └───────────────────┘ │
├ 푸터: browse by era 칩(Antiquity/Pop/Memphis/Now) + 직전 낙찰 결과 ───────┤
```

컴팩트: 에세이 컬럼 숨김, 티커 + featured lot + upcoming 2건.
기존 컴팩트 겹침 버그는 구조 변경으로 자연 해소 — 렌더로 재확인 필수.

## representativeTraits → 실제 모듈 매핑 (5종 모두 유지)

| trait | 모듈 |
|---|---|
| Classical quotation | 세리프 드롭캡 카탈로그 에세이 + "Roman bust (after the antique)" 롯 |
| Culture collage | 시대가 뒤섞인 lot 리스트 + "browse by era" 칩 |
| Ironic object index | upcoming lots 리스트(진짜 경매 인덱스) |
| Mixed cultural forms | 세리프 롯 타이틀 vs 산세리프 가격/데이터 타이포 충돌 |
| Editorial commerce | 추정가·현재가·입찰 버튼·낙찰 결과 |

## 스타일링 — 네오 브루탈리즘 탈피

- 균일 검정 외곽선/하드 오프셋 그림자 제거.
- 크림 종이 바탕 + 헤어라인 디바이더(인쇄 카탈로그 감각).
- 카드마다 다른 표면 처리(mismatched): featured lot = 이미지 풀블리드,
  에세이 = 맨 종이, 티커 = 코발트 색면, 낙찰 결과 = 토마토 레드 포인트.
- 볼드는 한 곳: 라이브 티커 코발트 바 + 거대 세리프 롯 타이틀.
- 팔레트 유지: 크림/검정 + 코발트 #2357C7, 토마토 #E13E2F, 옐로 #F2D23C.

## 이미지 전략

- 기존 `public/generated/design-styles/postmodernism.webp`를 featured lot 히어로로 재사용
  (경매 정물 사진처럼 읽힘).
- upcoming lot 썸네일: 같은 이미지를 `background-position` 크롭을 달리해 서로 다른
  오브젝트 부위를 노출 — 플레이스홀더 색면 문제 해결.
- 크롭이 어색하면 그때 codex로 경매 롯 정물 1장 추가 생성
  (`scripts/gen-style-image.mjs`, endpoint 127.0.0.1:18632).

## 코드/데이터 변경 범위

- `src/components/design-style/DesignStyleSampleRenderer.tsx`:
  `PostmodernArchivePortal` → `PostmodernAuctionHouse` 리네임 + 전면 재작성,
  라우팅 분기(`style.slug === "postmodernism"`) 갱신.
  장식 요소는 `inset-0 overflow-hidden` 래퍼 안에 유지(Chromium scrollWidth 이슈).
- `scripts/check-style-distinction.mjs`: 함수명 맵 + postmodernism 마커를 새 카피로
  교체(예: "PALLADIO & POP", "live bid", "browse by era"), NeoBrutalistApp의
  postmodern 금지 마커와 postmodern의 new-brutalism 금지 마커 로직 유지.
- `src/data/designStyles.ts`: representativeTraits 5종 유지. `tokenIntent`와
  `layoutTraits`의 "문화 포털" 문구를 경매 카탈로그 프레이밍으로 갱신.
- `docs/style-sample-web-review-log.md`: postmodernism 행의 마커/상태 갱신.

## 검증 (완료 조건)

1. Playwright(MCP)로 full(스타일 상세) + compact(목록 카드) 렌더 스크린샷 확인,
   가로 오버플로 0.
2. `npx eslint` 통과.
3. `npm run check:style-distinction` 통과 (단, 다른 카테고리의 기존 실패는 무관 —
   postmodernism 관련 assert만 책임).
4. 리뷰 로그 `verified` 갱신, main에 커밋 + 푸시.

## 명시적 비범위

- 다른 스타일 샘플의 duplicate-key 콘솔 에러(distortion rail 등) — 별건.
- 무드보드 이미지/imagePrompt 교체 — 스타일 설명 데이터는 그대로.
