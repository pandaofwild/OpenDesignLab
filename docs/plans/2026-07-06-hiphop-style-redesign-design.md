# 설계 — 힙합 스타일 샘플 재설계 (Black & Gold Album Studio)

대상 스타일: `hiphop-style` (No.65, 스트리트 / 서브컬처)

## 문제 정의

현재 `HipHopMixtapeConsole`은 representativeTraits(트랙리스트/비트그리드/아티스트
카드/가사 레일/웨이브폼)를 모두 담고 있으나, **전용 팔레트도 `styleTokenOverrides`도
없다**(파생 기본값으로 렌더). 그래서 "한눈에 힙합"이라는 정체성이 약하고 인접 스타일
(graffiti 원시 벽 / grunge 낡은 테이프)과 시각적으로 뚜렷이 구분되지 않는다.

목표: 10년차 웹디자이너 기준으로, **한눈에 봐도 힙합 음악문화 웹샘플**임이 즉시 읽히게
재설계한다. spec의 `tokenIntent`(블랙 스튜디오 베이스, 골드 액센트, 시그널 레드, 일렉트릭
블루)와 `representativeTraits`를 그대로 존중한다.

## 방향: Black & Gold Album Studio (앨범 드롭)

Mass Appeal 계열의 프리미엄 음악문화 편집 톤. 블랙 스튜디오 베이스에 골드 포일 액센트,
크롬/골드 디스플레이 타입. 대형 앨범 커버 히어로 + 트랙리스트 중심 커머스 구성.
graffiti(원시 벽)·grunge(디스트레스 테이프)와 가장 뚜렷하게 차별화된다.

`avoidTraits` 준수: graffiti wall scanner / streetwear drop / skate collage / punk flyer 금지.

## 팔레트 (신규 `palettes["hiphop-style"]`)

| token | 값 | 역할 |
| --- | --- | --- |
| base | `#0D0B08` | 블랙 스튜디오 |
| surface | `#1C1712` | 웜 차콜 카드 |
| text | `#F3EAD8` | 웜 페이퍼 |
| mutedText | `#A2937A` | 에이지드 골드-그레이 |
| primary | `#E9B93A` | 골드(브랜드 메인) |
| accent | `#E4322B` | 시그널 레드 |
| accent2 | `#2F6BFF` | 일렉트릭 블루 |
| accent3 | `#F2C94C` | 브라이트 골드 포일 |
| border | `#2A2118` | 딥 브라운 헤어라인 |

## 토큰 (신규 `styleTokenOverrides["hiphop-style"]`)

- typography: `displayFont: '"Bricolage Grotesque", sans-serif'`(로드된 유일 헤비 디스플레이),
  `weightDisplay: 800`, `weightBody: 500`, `tracking: "-0.03em"`, `headingScale: 1.3`.
  ※ 로드되지 않은 폰트(예: Anton/Bebas)를 지정하면 조용히 폴백되므로 쓰지 않는다.
  임팩트는 웨이트 + 대문자 + 타이트 트래킹 + 골드 그라디언트 텍스트로 만든다.
- shape: `radius: "2px"`, `radiusPill: "2px"`, `borderWidth: "2px"`, `borderStyle: "solid"`.
- space: `density: "normal"`, `gap: "0.7rem"`.
- decoration: `shadow: "0 18px 40px rgb(0 0 0 / 0.55)"`, `effect: "grain"`.
- layout: `heroVariant: "split"`, `navStyle: "boxed"`, `alignment: "left"`.

## 레이아웃 (컴포넌트 `HipHopAlbumStudio`, 기존 `HipHopMixtapeConsole` 대체)

`SampleFrame` + 배경 `GeneratedStyleImageSurface slug="hiphop-style" overlay="dark"`(블랙에
골드 조명이 스며드는 스튜디오 사진) 위에 구성:

1. **상단 바**: 브랜드 `VERSE` + **PARENTAL ADVISORY** 블랙/화이트 스티커 +
   tour·검색 아이콘. (`SampleNav` 사용, bordered=false)
2. **히어로(좌)**: 대형 앨범 커버 블록 + 골드 포일 앨범명 `THE COME UP`(골드 그라디언트
   텍스트 + 크롬 그림자), 바이닐 디스크 원형 모티프, `NEW ALBUM` 골드 태그.
3. **트랙리스트 인덱스(SIDE A)**: 4행(넘버/제목/러닝타임), 액티브 행 골드 하이라이트.
4. **릴리즈 웨이브폼**: 블랙 패널 위 골드 바 스트립.
5. **비트그리드 믹서**: 3×2 골드/레드/블루 패드.
6. **아티스트 카드 스택 + 가사 주석 레일**: Genius식 옐로/골드 하이라이트 주석.
7. **하단 커머스**: merch 가격(예: `$38`) + tour dates 행.

compact(카드 그리드)에서는 히어로 + 트랙리스트 + 웨이브폼 축약본으로 밀도 유지,
horizontal overflow 0.

## 이미지 (codex image gen)

`scripts/gen-style-image.mjs`의 `PROMPTS`에 `"hiphop-style"` 항목 추가 후
`node scripts/gen-style-image.mjs hiphop-style` 실행 → `public/generated/design-styles/hiphop-style.webp`.
프롬프트 방향: "블랙 & 골드 힙합 레코딩 스튜디오 정물 — 바이닐 레코드, 골드 체인,
콘덴서 스튜디오 마이크, 무디한 골드 림 라이트, 딥 블랙 배경. No text/letters/logos/people/UI."
(생성 전 `docs/style-moodboard-imagegen-guidelines.md` 준수.)

## 검증

1. `npx next dev --webpack` Ready 확인.
2. Playwright: `/en/styles/hiphop-style` full 스크린샷 + `/en/styles` 카드 그리드 compact 확인.
3. `npm run lint` + 타입 통과. 기존 다른 스타일 회귀 없음.
4. 리뷰로그 No.65 verified 처리 + `node scripts/check-street-subculture.mjs` 통과.
