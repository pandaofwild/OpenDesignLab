# New Brutalism 샘플 리디자인 — "LOUD LAUNDRY" 코인런드리 키오스크

날짜: 2026-07-11
상태: 승인됨 (owner 확인: 콘셉트 + 골격 + 이미지 미사용 + START 볼드 포인트)

## 배경 / 문제

현재 `NeoBrutalistApp` 샘플(GUMSTAND, Gumroad형 크리에이터 스토어프런트)의 문제:

1. **콘셉트가 교과서 그 자체**: Gumroad는 이 스타일 데이터의 referenceSites 1번.
   레퍼런스 사이트를 그대로 클론한 가장 정석적("정석적") 매핑 — concept originality 지침 위반.
2. **가드레일 표류 (현재 check 실패 중)**: `check:style-distinction`이 옛 마커
   ("hard-shadow toggle stack", "RAW COMPONENT KIT", "native form controls", "pricing table")를
   요구하나 현재 GUMSTAND 본문에 없음. 이전 리디자인 때 가드레일 미갱신.
3. **representativeTraits 미충족**: "Native form controls"와 "Pricing table"이 실제 모듈로
   존재하지 않음 (상품 카드 3장 + 페이아웃 스트립뿐).
4. 리뷰 로그 11행 스테일 ("native web controls, thick borders, raw app UI").

단, 스타일링(3px 검정 테두리, zero-blur 오프셋 섀도, 고채도 상태색)은 이 스타일의
정체성이므로 **유지·강화** — postmodernism 건과 달리 비주얼 언어는 문제가 아님.

## 콘셉트

동네 코인런드리 **LOUD LAUNDRY**의 24시간 셀프 키오스크/상태보드 화면.
"세탁기 = 물리적 블록"이라는 소재-스타일 일치가 핵심.

- 카피는 전부 실제 런드리 문법: 머신 번호(W1–W4, D1–D2), 남은 분, `wash $4.50 / dry $2.25`,
  `heavy +$1.00`, "CARD OK / NO COINS". SaaS 카피 전면 제거.
- 검토한 대안: 네오뱅크 앱(BLUNT BANK — neobrutalism.dev 데모들이 대시보드라 반복감),
  공구 대여소(TOOL LIBRARY — 상대적으로 평범). 코인런드리 채택.
- AGENTS.md의 함정("a gym for brutalism") 회피 확인.

## 레이아웃 스켈레톤 — 키오스크 상태보드 + 컨트롤 패널 (카테고리 내 유일)

```
┌ 헤더: LOUD LAUNDRY ★ 24H · Elm St. corner ── [CARD OK] [NO COINS] ┐
│ ┌── MACHINE STATUS (좌, 지배) ──┐  ┌── CYCLE BUILDER (우 패널) ──┐│
│ │ W1 FREE / W2 32MIN / W3 FREE  │  │ machine  [W3 ▾]            ││
│ │ D1 8MIN / D2 FREE / W4 OUT    │  │ temp  (●)hot ( )warm ( )cold││
│ │ (상태색 타일 + 하드 섀도)       │  │ extras [x]softener [ ]turbo ││
│ │                               │  │ total $5.50  ┏ START ┓     ││
├ WASH RATES 표: normal $4.50 / heavy +$1.00 / express +$2.00 ─────┤
└ 하단: "leave the machine how you found it" + loyalty punch 07/10 ┘
```

- 머신 타일 상태: FREE = 초록면, 카운트다운 = 노랑면 + 큰 분 숫자, OUT OF ORDER = 사선 해칭.
- 컴팩트: 헤더 + 머신 타일 4개(2×2) + 미니 cycle 패널(합계 + START 유지). rates 표는 숨김.

## representativeTraits → 실제 모듈 매핑 (5종 유지, 미충족 2종 복구)

| trait | 모듈 |
|---|---|
| Raw component kit | 머신 타일·배지·토글의 컴포넌트 킷식 반복 |
| Native form controls | cycle builder의 select(▾)·radio·checkbox — 네이티브 룩 span으로 재현 |
| Pricing table | WASH RATES 요금표 (복구) |
| Offset shadows | 타일·패널의 zero-blur 하드 섀도 |
| Thick black buttons | 거대 START 버튼 (볼드 포인트) |

폼 컨트롤을 실제 `<select>/<input>`이 아닌 span으로 재현하는 이유: 컴팩트 카드가
링크로 감싸일 수 있어 인터랙티브 요소 중첩(invalid HTML/hydration) 리스크 회피.

## 이미지 전략

생성 이미지 **사용 안 함**. 플랫 그래픽이 이 스타일의 정체성이고 머신 그리드가
시그니처 비주얼. 기존 `new-brutalism.webp`는 GUMSTAND용 컴포넌트 콜라주라 소재 불일치.
(`GENERATED_STYLE_IMAGES` 맵 엔트리는 그대로 두고 이 샘플에서 참조만 제거.)

## 코드/데이터 변경 범위

- `src/components/design-style/DesignStyleSampleRenderer.tsx`:
  `NeoBrutalistApp`(~line 1534) → `NeoBrutalistLaundromat` 리네임 + 전면 재작성,
  라우팅 분기(`style.slug === "new-brutalism"`) 갱신.
- `scripts/check-style-distinction.mjs`:
  - functionBody 호출·slug 맵·requiredFamilyMarkers·assert 문구를 새 함수명/마커로 교체.
  - 새 마커: "LOUD LAUNDRY", "machine status", "cycle builder", "wash rates" (본문 카피에 실재).
  - postmodern 본문 금지 마커 목록(현재 "RAW COMPONENT KIT" 등)도 새 마커로 동기화.
  - 이 갱신으로 현재 실패 중인 NeoBrutalistApp 관련 assert가 해소됨 (가드레일 표류 수리).
- `src/data/designStyles.ts`: representativeTraits/tokenIntent 유지(여전히 정확).
  layoutTraits 1항만 "셀프 키오스크 상태보드 + 컨트롤 패널" 프레이밍으로 갱신.
- `docs/style-sample-web-review-log.md` 11행 갱신.

## 검증 (완료 조건)

1. Playwright(MCP) full + compact 렌더 확인, 가로 오버플로 0.
2. `npx eslint` 대상 파일 통과.
3. `npm run check:style-distinction`: NeoBrutalist/LAUNDRY 관련 에러 0건
   (glitch-art/hiphop 기존 실패만 잔존 — 별건).
4. 리뷰 로그 `verified` 갱신, main 커밋 + 푸시.

## 명시적 비범위

- glitch-art/hiphop-style의 기존 check 실패 및 duplicate-key 콘솔 에러.
- new-brutalism 무드보드/imagePrompt/referenceSites 데이터 변경.
