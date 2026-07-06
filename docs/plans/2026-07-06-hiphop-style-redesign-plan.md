# 구현 Plan — 힙합 스타일 샘플 재설계 (Black & Gold Album Studio)

설계 문서: `docs/plans/2026-07-06-hiphop-style-redesign-design.md`

> 작성자(Opus)가 검토·검증한다. Codex 서브에이전트가 아래 단계를 순서대로 구현한다.
> 환경: Windows, Next.js 16(Turbopack 미지원 → `next dev --webpack`), Tailwind v4.
> **반드시** 코드 작성 전 `AGENTS.md` 지시대로 `node_modules/next/dist/docs/`의 관련
> 가이드를 확인할 것. 기존 다른 스타일 샘플/데이터에 회귀를 내지 말 것.

## 단계 1 — 팔레트 추가

파일: `src/data/designStyles.ts`, `const palettes` 레코드 (graffiti/grunge가 있는 구역).

`"hiphop-style"` 키를 추가한다(기존 `graffiti`/`grunge` 항목과 동일한 형태):

```ts
"hiphop-style": {
  base: "#0D0B08",
  surface: "#1C1712",
  text: "#F3EAD8",
  mutedText: "#A2937A",
  primary: "#E9B93A",
  accent: "#E4322B",
  accent2: "#2F6BFF",
  accent3: "#F2C94C",
  border: "#2A2118",
},
```

## 단계 2 — 토큰 오버라이드 추가

파일: `src/data/designStyles.ts`, `const styleTokenOverrides` 레코드
(grunge 토큰 오버라이드가 있는 구역).

```ts
"hiphop-style": {
  typography: { displayFont: '"Bricolage Grotesque", sans-serif', bodyFont: '"Hanken Grotesk", sans-serif', weightDisplay: 800, weightBody: 500, tracking: "-0.03em", headingScale: 1.3 },
  shape: { radius: "2px", radiusPill: "2px", borderWidth: "2px", borderStyle: "solid" },
  space: { density: "normal", gap: "0.7rem", padScale: 1 },
  decoration: { shadow: "0 18px 40px rgb(0 0 0 / 0.55)", effect: "grain" },
  layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
},
```

- `DeepPartial<Omit<StyleTokens, "color">>` 타입에 맞게 필드명을 기존 항목과 정확히 일치시킬 것.
  불확실하면 인접한 `grunge` 오버라이드 필드 구조를 그대로 참고한다.

## 단계 3 — GENERATED_STYLE_IMAGES 엔트리 추가

파일: `src/components/design-style/DesignStyleSampleRenderer.tsx` (~L170 맵).

알파벳 위치(`high-end-minimal` 근처)에 추가:

```ts
"hiphop-style": "/generated/design-styles/hiphop-style.webp",
```

이로써 `GeneratedStyleImageSlug`에 `"hiphop-style"`가 포함되어
`<GeneratedStyleImageSurface slug="hiphop-style" .../>` 사용이 타입 통과된다.

## 단계 4 — 컴포넌트 재작성

파일: `src/components/design-style/DesignStyleSampleRenderer.tsx`.

- 기존 `function HipHopMixtapeConsole(...)` (약 L6127–L6260)을 **`HipHopAlbumStudio`로
  재작성**한다(이름 변경). 디스패치(`if (style.slug === "hiphop-style")`, ~L7497)도
  `return <HipHopAlbumStudio {...props} />;`로 갱신한다.
- 배경은 하드코딩 `backgroundImage url(...hiphop-mixtape-console.webp)` 대신
  `<GeneratedStyleImageSurface slug="hiphop-style" overlay="dark" className="absolute inset-0" />`
  를 `absolute inset-0`로 깐다.
- 설계 문서의 레이아웃 1~7을 구현한다. 기존 컴포넌트의 트랙리스트/웨이브폼/비트패드/
  아티스트 카드/가사 레일 구조와 클래스 관용구(`SampleFrame`, `SampleNav`, `cn`,
  `border-[3px] border-[var(--sample-base)]`, `shadow-[Npx_Npx_0_var(--sample-accent)]` 등)를
  최대한 재사용하되, 다음을 강화한다:
  - **골드 포일 앨범명**: 골드 그라디언트 텍스트(`background-clip: text` 또는 인라인
    gradient span) + 크롬/블랙 텍스트 그림자로 대형 히어로 타이틀.
  - **PARENTAL ADVISORY 스티커**: 블랙 바탕 화이트 텍스트 사각 스티커, 상단 바에 배치.
  - **바이닐 디스크 모티프**: 원형(라디얼 그라디언트 홈) 장식, `aria-hidden`.
  - **NEW ALBUM 골드 태그**, **SIDE A 트랙리스트 액티브 골드 하이라이트**,
    **골드 웨이브폼 바**, **merch 가격 + tour dates 커머스 행**.
- compact 분기: 히어로 + 트랙리스트 + 웨이브폼 축약, `min-h`/`overflow-hidden` 유지,
  horizontal overflow 0. 기존 compact 관용구 따를 것.
- 장식 레이어 전부 `aria-hidden="true"`. 텍스트 노드/주석 함정(`react/jsx-no-comment-textnodes`) 주의.
- 새 커스텀 CSS 클래스에 의존하지 말 것(graffiti처럼 유틸리티 + 인라인으로 self-contained).
  골드 그라디언트 텍스트/그림자는 인라인 `style`로 처리.

## 단계 5 — 정합성 확인 (Codex 자체 점검)

- `HipHopMixtapeConsole` 잔재가 남지 않았는지 grep(정의·호출 모두 제거/치환).
- `hiphop-mixtape-console.webp` 참조가 코드에서 완전히 사라졌는지 확인
  (기존 webp 파일 자체는 건드리지 않는다).
- `npm run lint` 통과, 타입 에러 없음.

## 완료 조건 (Opus 리뷰 체크리스트)

- [ ] 전용 팔레트·토큰으로 블랙&골드 정체성이 즉시 읽힘.
- [ ] full/compact 양쪽 깨짐 없이 리치하게 렌더, horizontal overflow 0.
- [ ] representativeTraits(트랙리스트/비트그리드/아티스트카드/가사레일/웨이브폼) 전부 존재.
- [ ] `GeneratedStyleImageSurface slug="hiphop-style"` 정상, 이미지 로드.
- [ ] lint/타입 통과, 다른 스타일 회귀 없음.
