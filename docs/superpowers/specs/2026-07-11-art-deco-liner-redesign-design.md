# Art Deco 샘플 리디자인 — "MERIDIAN LINE" 대서양 횡단 오션라이너 예약

날짜: 2026-07-11
상태: 승인됨 (owner 확인: 오션라이너 콘셉트 + 포스터 세로판/예약 컬럼 골격)

## 배경 / 문제

현재 `ArtDecoHotelPortal` 샘플(Deco House, 호텔/바 예약)의 문제:

1. **빈 플레이스홀더 카드**: 우측 4개 카드가 아치 선 + 금색 바만 있는 빈 사각형 —
   금지된 "placeholder app UI rectangles" 그 자체. 실제 UI 모듈 부재.
2. **자기 라벨링**: 헤드라인이 스타일 이름 그대로 "ART DECO". 실존 사이트로 읽히지 않음.
3. **정석적 콘셉트**: "Deco 호텔/바"는 referenceSites(Claridge's, Savoy, Carlyle)를
   그대로 복제한 가장 정석적 매핑 — concept originality 지침 위반 (bubble→소다 패턴).
4. **레이아웃 중복**: nav + 좌이미지/우텍스트 + `LuxuryClassicBottomStrip` 뼈대가
   바로크·로코코 등 럭셔리 계열과 사실상 동일.

단, 팔레트(블랙 라커 #080806 / 브라스 #D8A94B / 샴페인 #F7E7BD / 에메랄드 #0E6B56)와
기존 생성 이미지 품질은 문제가 아님. 콘셉트·구조·모듈 실재성이 문제.

## 콘셉트

1930년대 대서양 횡단 정기선사 **MERIDIAN LINE**의 항차 예약 사이트.
기함 **S.S. AURELIA**, 항로 **NEW YORK — CHERBOURG**.

- Cassandre의 노르망디호 포스터(수직으로 솟은 뱃머리, 선버스트, 스텝 기하학)가
  아르데코 그래픽의 아이콘이라 인식성이 극대화되면서도, 호텔/바(정석)를 회피.
- 스타일 어휘가 전부 자연스럽게 유도됨: 팬 기하학(선버스트), 스텝 리듬(선체 데크/셋백),
  블랙+브라스 대비(야간 항해), 이브닝 호스피탈리티(그랜드 살롱 만찬).
- 검토한 대안: 데코 무비 팰리스(Radio City 계열이라 다소 예상 가능),
  마천루 전망대 티켓팅(콘텐츠 모듈 다양성 부족), 재즈 레코드 레이블(데코 인식성 약함).

## 레이아웃 스켈레톤 — 포스터 세로판 + 예약 컬럼 (카테고리 내 유일)

```
┌────────────┬──────────────────────────────────┐
│            │ MERIDIAN LINE — 마퀴형 브랜드바        │
│  포스터     ├──────────────────────────────────┤
│  세로판     │ SAILINGS BOARD — 출항 스케줄 3행       │
│ (~40%)    │  날짜 · 선박 · 항로 · 요금 · RESERVE    │
│            ├──────────────────────────────────┤
│ 생성 이미지  │ STATEROOM CLASSES — 선실 등급 카드 3장 │
│ +수직 타이포 │  First / Cabin / Tourist 실요금·데크   │
│ +선버스트   ├──────────────────────────────────┤
│ +스텝 프레임 │ GRAND SALON — 저녁 만찬 좌석 스트립     │
└────────────┴──────────────────────────────────┘
```

- 좌측 세로 포스터판이 지배하는 poster-dominant split.
- 하단 `LuxuryClassicBottomStrip` 제거 — 바로크·로코코와의 뼈대 중복 해소.
- 컴팩트: 포스터판 폭 축소, 스케줄 2행 · 선실 카드 2장으로 압축, 그랜드 살롱 스트립 유지.

## representativeTraits → 실제 모듈 매핑 (5종 전부 유지)

| trait | 모듈 |
|---|---|
| Fan geometry | 포스터판 선버스트 + RESERVE CTA 팬 오너먼트 |
| Stepped vertical rhythm | 선실 카드 상단 셋백(계단형) 실루엣 + 포스터 수직 타이포 |
| Black and brass contrast | 블랙 라커 바탕 + 브라스 헤어라인/보더 (기존 팔레트 무변경) |
| Evening hospitality | GRAND SALON 만찬 스트립 (first seating 7:00 / second 9:00) |
| Marquee-like modules | SAILINGS BOARD — 브라스 헤어라인 출항 스케줄 행 |

모든 모듈은 실제 값(출항 날짜, 요금 $385 등급별, 데크명, 좌석 상태)을 가진 진짜 UI.
빈 사각형·추상 도형 스탠드인 금지.

## 이미지 전략

**새 생성 이미지 사용** (기존 art-deco.webp는 바 인테리어라 소재 불일치 → 교체).

- `scripts/gen-style-image.mjs`의 PROMPTS에 art-deco 엔트리 추가.
- 프롬프트 방향: Cassandre풍 아르데코 여행 포스터 일러스트, 오션라이너 뱃머리 정면 앙각,
  거대한 검은 선체, 브라스/샴페인 선버스트 하늘, 스텝 클라우드, no logo, no text, no watermark.
- 실행: `OPENAI_BASE_URL=http://127.0.0.1:18632/v1 node scripts/gen-style-image.mjs art-deco`
  → `public/generated/design-styles/art-deco.webp` 교체.
- 포스터판에서 이미지를 가리지 않고 드러냄 (`[[generated-style-image-surface-gotcha]]` 준수:
  GeneratedStyleImageSurface 자식은 h-full/w-full 계열, 무거운 스크림 금지).

## 코드/데이터 변경 범위

- `src/components/design-style/DesignStyleSampleRenderer.tsx`:
  `ArtDecoHotelPortal`(~line 4186) → `ArtDecoLinerBooking` 리네임 + 전면 재작성,
  라우팅 분기(`style.slug === "art-deco"`) 갱신.
- `scripts/check-style-distinction.mjs`:
  - styleSampleFunctions 맵: `"art-deco": "ArtDecoLinerBooking"`.
  - requiredFamilyMarkers에 art-deco 추가: "MERIDIAN LINE", "sailings board",
    "stateroom classes", "grand salon" (본문 카피에 실재하는 문자열).
- `src/data/designStyles.ts`:
  - 팔레트·representativeTraits·referenceSites 무변경.
  - layoutTraits[0]과 tokenIntent의 "호텔 모듈" 프레이밍만 라이너 예약 프레이밍으로 소폭 갱신.
- `docs/style-sample-web-review-log.md` 40행(art-deco) 갱신.

## 검증 (완료 조건)

1. Playwright(MCP) full + compact 렌더 확인, 가로 오버플로 0.
2. `npm run lint` 통과.
3. `node scripts/check-style-distinction.mjs`: art-deco 관련 에러 0건 (타 스타일 기존 실패는 별건).
4. 리뷰 로그 `verified` 갱신, main 커밋 + 푸시.

## 명시적 비범위

- 타 스타일의 기존 check 실패 및 duplicate-key 콘솔 에러.
- art-deco 무드보드(`/generated/moodboards/art-deco-realistic-v2.webp`)·referenceSites 데이터 변경.
- 브라우저 패널 스크린샷 타임아웃 이슈 (Playwright로 우회).
