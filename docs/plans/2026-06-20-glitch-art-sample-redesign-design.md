# 글리치 아트 샘플 재설계 (B + C)

- 날짜: 2026-06-20
- 대상: `glitch-art` 디자인 스타일 샘플 프리뷰
- 목표: 정적인 현재 샘플을 (B) 풀스크린 글리치 콜라주 레이아웃 + (C) 인터랙티브 글리치 생성기로 격상

## 배경 / 현재 상태

- 글리치 컴포넌트는 `src/components/design-style/DesignStyleSampleRenderer.tsx`의
  `GlitchArtInterface`(현재 ~L1908, 서버 컴포넌트)와 헬퍼 `GlitchHeading`(현재 ~L1894)에 있다.
- 슬러그 디스패치는 같은 파일 하단(현재 ~L7357) `if (style.slug === "glitch-art") return <GlitchArtInterface {...props} />;`.
- 렌더러는 **서버 컴포넌트**(`"use client"` 없음). 세 곳에서 소비:
  - `src/app/styles/[slug]/page.tsx:154` — full(detail)
  - `src/components/design-style/DesignStyleCard.tsx:31` — compact
  - `src/components/design-style/DesignStyleCoreScreen.tsx:580` — compact (이 파일은 client)
- 기존 인프라:
  - `@keyframes st-glitch` 및 `[data-st-effect="glitch"]` 규칙 (globals.css ~L1166)
  - `@media (prefers-reduced-motion: reduce)` 블록 (globals.css ~L1196)
- 프리미티브: `PhotoSurface`, `GeneratedStyleImageSurface`(slug `"glitch-art"` → `/generated/design-styles/glitch-art.webp`), `SampleNav`, `GlyphIcon`, `GRAIN_URI`, `cn`.
- 레퍼런스: `public/references/glitch-art/` (patatap-com, thehtml-review, www-cyberpunk-net).
- 팔레트: `glitch-art` 전용 팔레트가 `designStyles.ts`에 이미 존재(accent/accent2/accent3 = cyan/magenta/lime 계열).

## 설계

### B — 풀스크린 글리치 콜라주 레이아웃

단순 2컬럼을 레이어드 z-스택으로 교체:

1. **배경 손상 비디오 플레인** — `GeneratedStyleImageSurface slug="glitch-art"`를 베이스로,
   RGB 채널 분리(같은 이미지를 cyan/magenta 두 레이어로 `mix-blend-screen` + 좌우 오프셋),
   가로 슬라이스 변위(datamosh) 띠, 마크로블록 깨짐 오버레이.
2. **전경 HUD 진단 패널**(흩뿌림 배치):
   - 좌상단: `NET ART ERROR SURFACE` 라벨 + 라이브 readout(checksum drift / codec fault / buffer tear, 값이 미세하게 떨림)
   - 우측: 비트레이트 웨이브폼 바(높이 다른 막대들), bad-sector 진행률 바
   - 하단: 흐르는 hex 덤프 / ASCII rupture 스트림(가로 마퀴 느낌, reduced-motion이면 정지)
3. **대형 타이틀** `SIGNAL DAMAGE`:
   - `GlitchHeading`을 강화 — RGB 채널 스플릿이 애니메이션으로 살아 움직이고, 주기적 슬라이스 변위.
4. **라이브 효과 레이어**: 스캔라인 드리프트, 화면 플리커, 주기적 블록 손상. 모두 CSS keyframes.

compact(카드)에서는 패널 수를 줄이고 텍스트 잘림 방지, 핵심 비주얼(채널 스플릿 타이틀 + 손상 플레인)만 유지.

### C — 인터랙티브 글리치 생성기

`GlitchArtInterface`를 **새 클라이언트 컴포넌트 파일**로 분리:
`src/components/design-style/GlitchArtInterface.tsx` (상단 `"use client"`).

- **마우스/포인터 추적**: 컨테이너 위 포인터 위치(0~1 정규화)를 `onPointerMove`로 받아
  CSS 변수 `--glitch-intensity`(0~1)에 반영. 채널 오프셋·블록 변위·스캔라인 굵기가 강도에 비례.
- **"CORRUPT" 버튼**: 클릭 시 `--glitch-burst`를 1로 올려 ~800ms 강렬한 데이터모싱 버스트,
  타이머로 0 복귀(`useRef`로 timeout 정리).
- **유휴 앰비언트**: 인터랙션 없을 때도 잔잔한 자동 글리치(기본 intensity ~0.18).
- **compact 모드**: 포인터 핸들러/버튼 **없음**, 앰비언트 정적/저강도만 → 카드 그리드 가볍게,
  스크린샷 안정.
- **prefers-reduced-motion**: `useReducedMotion`성 처리 대신 CSS `@media`로 애니메이션 정지
  + 인라인 강도 변수는 그대로 두되 keyframes만 무효화(기존 패턴 따름).

### 아키텍처 결정

1. **클라이언트 분리**: 7000줄짜리 서버 렌더러는 그대로. 글리치만 별도 `"use client"` 파일.
   서버 렌더러가 이 client 컴포넌트를 import해서 디스패치(`<GlitchArtInterface {...props} />`).
   RSC 표준: 서버→클라이언트 렌더 OK, `style`(DesignStyle plain data)는 직렬화 가능.
2. **공유 프리미티브 재사용**: `SampleFrame` 마크업 패턴(또는 동등한 래퍼 + `sampleVariables`)을
   새 파일에서 재현해야 함 — 현재 `SampleFrame`/`sampleVariables`/`GRAIN_URI`는 렌더러 파일
   내부 비-export. 해결책: 이 헬퍼들(`sampleVariables`, `GRAIN_URI`, `SampleFrame`,
   `GeneratedStyleImageSurface`, `cn` 사용)을 **export**하거나, 작은 공용 모듈로 추출.
   → 결정: 최소 변경으로 `sampleVariables`, `GRAIN_URI`, `GeneratedStyleImageSurface`,
   `PhotoSurface`를 렌더러에서 `export`하고 새 파일에서 import. (`SampleFrame`은 새 파일에서
   동일 클래스의 래퍼 `<div>`로 직접 구현 — props 결합도 낮춤.)
3. **CSS**: 신규 keyframes(채널 스플릿, 슬라이스 변위, 스캔라인 드리프트, 마퀴, 버스트)는
   globals.css 기존 글리치 섹션 근처에 추가. 클래스 네임스페이스 `glitch-sample-*` /
   `data-glitch-*` 속성으로 스코프. 강도/버스트는 인라인 CSS 변수.
4. **점진적 향상**: SSR이 풍부한 정적 프레임을 먼저 렌더 → 하이드레이션 후 포인터/버튼 활성.
   스크린샷·Playwright는 정적 프레임에서도 리치하게 캡처됨.
5. **접근성**: 모든 장식 레이어 `aria-hidden`, 버튼은 실제 `<button type="button">`,
   reduced-motion 존중.

### JSX 함정 주의 (기존 메모 기준)

- 리터럴 `//`는 `{"//"}`로 감쌀 것 (`react/jsx-no-comment-textnodes`).
- JSX `{/* ... */}` 주석을 단어 "global"로 시작하지 말 것.

## 검증

- `next dev --webpack`(이 환경은 Turbopack 미지원)으로 기동.
- Playwright로 `/styles/glitch-art`(full) + 카드 그리드(compact) 양쪽 스크린샷 확인.
- 포인터 이동 시 강도 변화, CORRUPT 버튼 버스트, reduced-motion 정지 동작 확인.
- `npm run lint` 통과.

## 작업 분담

- Opus: 본 설계 + 구현 plan 작성, 코드 리뷰/검증.
- Sonnet 서브에이전트: plan에 따른 코드 작성.
