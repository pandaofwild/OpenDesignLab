# 완료 카테고리 상세 기록: 모던 / 미니멀

이 파일은 `docs/style-sample-web-review-log.md`에서 분리된 완료 카테고리의 스타일별 상세 기록이다. 진행 원칙, 상태 값, 전체 순회 큐는 본 로그 파일을 본다.

## 01. minimalism

Status: `verified`

### 현재 샘플 진단

- 현재 샘플은 깔끔한 SaaS landing + dashboard mockup 구조다.
- 장점: muted palette, 넓은 좌측 hero, 얇은 border, 낮은 shadow, 적은 CTA.
- 약점: 작은 dashboard 카드와 metric tiles가 많아 `SaaS Style`과 헷갈릴 수 있다.
- 약점: moodboard의 warm white studio table, paper/cotton/stone, thin-rule editorial grid가 샘플 표면에 충분히 번역되지 않았다.
- 약점: Apple식 product-first composition보다 B2B dashboard proof가 더 먼저 읽힌다.

### 레퍼런스에서 가져올 웹 UI 문법

- Linear: muted product surface, almost invisible separators, tiny navigation, calm issue rows.
- Apple: large blank space, product object as hero, copy restraint, one strong focal surface.
- Stripe: exact section rhythm, hairline dividers, restrained proof modules, controlled accent.

### 샘플 목표

- Generic SaaS dashboard를 줄이고, 하나의 큰 product canvas와 thin-rule material index를 중심으로 재구성한다.
- 고유 마커: `MINIMAL PRODUCT CANVAS`, `negative-space product stage`, `thin-rule material index`.
- 화면에서 제목을 읽지 않아도 minimalism으로 보이도록 넓은 빈 공간, 한 개의 중심 제품 표면, 얇은 구분선, tactile neutral swatches를 노출한다.

### 검증 계획

- `npm run check:style-distinction`가 minimalism 고유 마커를 요구하도록 먼저 실패시킨다.
- 구현 후 `npm run check:style-distinction`, `npm run lint`, minimalism desktop/mobile browser QA를 실행한다.
- 결과 스크린샷: `output/playwright/per-style-review/minimalism/after/`.

### 구현 결과

- 기존 SaaS dashboard proof를 제거하고 하나의 큰 product canvas 중심으로 재구성했다.
- `MINIMAL PRODUCT CANVAS`, `negative-space product stage`, `thin-rule material index`를 실제 샘플 화면에 노출했다.
- moodboard의 paper, stone, cotton, graphite 재료감을 material index로 번역했다.
- Linear/Apple/Stripe에서 가져온 문법은 작은 navigation, 큰 여백, 제품 중심 hero, 얇은 rule, 제한된 copy로 반영했다.
- 같은 category 안에서 `modernism`의 강한 기능적 그리드/primary accent, `swiss-design`의 typographic grid, `high-end-minimal`의 luxury product crop과 구분되도록 dashboard/metric 밀도를 낮췄다.

### 검증 결과

- RED: `npm run check:style-distinction` 실패 확인. 이유: minimalism marker 3개 누락.
- GREEN: `npm run check:style-distinction` 통과.
- `npm run lint` 통과.
- `npm run build` 통과. Next.js static pages `580/580`.
- `npm run check:data` 통과. 88 styles, 10 categories.
- `npm run check:style-refs` 통과. 88 styles covered.
- Browser QA: `/en/styles/minimalism` desktop/mobile에서 marker 3개와 horizontal overflow `0` 확인.
- Before screenshots: `output/playwright/per-style-review/minimalism/before/`.
- After screenshots: `output/playwright/per-style-review/minimalism/after/`.

### 남은 의심점

- 없음. 다음 패스는 `modernism`만 따로 리뷰하고 구현한다.

## 02. modernism

Status: `verified`

### 현재 샘플 진단

- 현재 샘플은 검정 구조선, primary red/blue/yellow, 비대칭 그리드가 보여서 기본 방향은 맞다.
- 약점: 샘플이 단일 제품 카드와 작은 방문/컬렉션 리스트에 머물러 실제 웹 샘플보다 포스터형 카드에 가깝다.
- 약점: Bauhaus-Archiv와 MoMA에서 보이는 프로그램/전시/컬렉션의 기관형 정보 구조가 충분히 반영되지 않았다.
- 약점: Vitra의 제품 카테고리 그리드, AIM의 현대적 번호/인덱스 실험이 화면 구조로 드러나지 않는다.
- 약점: `minimalism`과 비교하면 색과 굵은 선은 다르지만, 더 큰 시스템성과 기능적 모듈 논리가 필요하다.

### 레퍼런스에서 가져올 웹 UI 문법

- Bauhaus-Archiv: 방문, 참여, 발견, 연구 같은 큰 섹션을 프로그램 카드로 나누는 기관형 정보 구조.
- MoMA: 방문/전시/아트/스토어로 나뉘는 직접적인 대형 내비게이션과 이벤트/컬렉션 모듈.
- Vitra: 제품 카테고리 목록, 오브젝트 중심 사진, product/furniture taxonomy.
- AIM: 숫자 인덱스, 실험/갤러리 구조, modernist graphic composition의 현대적 재해석.

### 샘플 목표

- 단일 상품 카드가 아니라 `functional program grid`를 중심으로 한 웹 샘플로 만든다.
- 고유 마커: `MODERNIST PROGRAM GRID`, `function-led object index`, `primary geometry modules`.
- 화면에서 제목을 읽지 않아도 rational grid, primary accent, numbered modules, architecture/object taxonomy가 보이게 한다.
- Swiss Design의 신문/정보 객관성, International Style의 중립 시스템, Minimalism의 빈 여백과 다르게 더 적극적인 구조선과 색면을 사용한다.

### 검증 계획

- `npm run check:style-distinction`가 modernism 고유 마커 3개를 요구하도록 먼저 실패시킨다.
- 구현 후 `npm run check:style-distinction`, `npm run lint`, `npm run build`, modernism desktop/mobile browser QA를 실행한다.
- 결과 스크린샷: `output/playwright/per-style-review/modernism/after/`.

### 구현 결과

- 기존 단일 제품 카드 중심 샘플을 기관형 `MODERNIST PROGRAM GRID`로 재구성했다.
- Bauhaus-Archiv/MoMA에서 가져온 방문, 오브젝트, 실험, 연구 섹션 구조를 상단 프로그램 모듈로 반영했다.
- Vitra식 object taxonomy를 `function-led object index`로 반영하고, 제품/건축/학교 아카이브를 한 화면에 묶었다.
- AIM의 현대적 번호 인덱스와 실험형 구성은 번호 코드, 압축된 그리드, `primary geometry modules`로 번역했다.
- `minimalism`과 달리 빈 여백보다 굵은 구조선, 원색 기능 블록, 프로그램 밀도를 전면에 두었다.

### 검증 결과

- RED: `npm run check:style-distinction` 실패 확인. 이유: modernism marker 3개 누락.
- GREEN: `npm run check:style-distinction` 통과.
- `npm run lint` 통과.
- `npm run build` 통과. Next.js static pages `580/580`.
- `npm run check:data` 통과. 88 styles, 10 categories.
- `npm run check:style-refs` 통과. 88 styles covered.
- Browser QA: `/en/styles/modernism` desktop/mobile에서 marker 3개와 horizontal overflow `0` 확인.
- Before screenshots: `output/playwright/per-style-review/modernism/before/`.
- After screenshots: `output/playwright/per-style-review/modernism/after/`.

### 남은 의심점

- 없음. 다음 패스는 `swiss-design`만 따로 리뷰하고 구현한다.

## 03. swiss-design

Status: `verified`

### 현재 샘플 진단

- 현재 샘플은 기사/출발 정보 레이아웃과 red marker가 있어 Swiss 방향은 이미 있다.
- 약점: 중앙 샘플이 하나의 뉴스 카드처럼 보이며, baseline grid와 column guide가 샘플 안에서 충분히 구조화되어 보이지 않는다.
- 약점: SWI의 다국어/섹션형 공공 뉴스 구조와 SBB의 timetable/ticket purchase 문법이 동시에 보이기에는 departures rail이 작다.
- 약점: Web Design Lookbook이 말하는 grid first/type leads 특성이 마커 수준으로 드러나지 않는다.
- 약점: `modernism`과 비교하면 red accent와 굵은 선은 다르지만, Swiss 특유의 objective typography와 measured rhythm이 더 분명해야 한다.

### 레퍼런스에서 가져올 웹 UI 문법

- SWI swissinfo.ch: 다국어 선택, 섹션 navigation, Top Stories, newsletter, topic blocks처럼 정보가 공공 서비스 구조로 나뉜다.
- SBB: timetable/ticket purchase, language selection, help/contact 같은 즉시 목적형 정보 rail.
- Web Design Lookbook: grid first, type leads, modular systems, neutral base with measured red accent.

### 샘플 목표

- 기사 카드 하나가 아니라 `SWISS BASELINE GRID`가 보이는 정보 시스템 샘플로 만든다.
- 고유 마커: `SWISS BASELINE GRID`, `multilingual public-service nav`, `timetable information rail`.
- 헤드라인, 섹션, 시간표, 언어, 기사 row가 같은 column/baseline 규칙 안에 정렬되어야 한다.
- `modernism`보다 원색 기하학을 줄이고, `international-style`보다 red signal과 typography-led editorial rhythm을 더 강하게 둔다.

### 검증 계획

- `npm run check:style-distinction`가 swiss-design 고유 마커 3개를 요구하도록 먼저 실패시킨다.
- 구현 후 `npm run check:style-distinction`, `npm run lint`, `npm run build`, swiss-design desktop/mobile browser QA를 실행한다.
- 결과 스크린샷: `output/playwright/per-style-review/swiss-design/after/`.

### 구현 결과

- 기존 기사 카드 중심 샘플을 `SWISS BASELINE GRID`가 보이는 공공 정보 시스템으로 재구성했다.
- SWI swissinfo.ch의 다국어 선택과 섹션형 public-service navigation을 상단 utility/nav와 numbered section column으로 반영했다.
- SBB의 즉시 목적형 timetable 문법을 오른쪽 `timetable information rail`로 키워서 기사 row와 다른 기능 레이어로 보이게 했다.
- Web Design Lookbook의 grid first/type leads 원칙을 baseline overlay, column guide, objective headline rhythm, measured red signal로 번역했다.
- `modernism`보다 primary geometry와 오브젝트 taxonomy를 줄이고, `international-style`보다 red signal과 editorial information density를 명확히 두었다.

### 검증 결과

- RED: `npm run check:style-distinction` 실패 확인. 이유: swiss-design marker 3개 누락.
- GREEN: `npm run check:style-distinction` 통과.
- `npm run lint` 통과.
- `npm run build` 통과. Next.js static pages `580/580`.
- `npm run check:data` 통과. 88 styles, 10 categories.
- `npm run check:style-refs` 통과. 88 styles covered.
- Browser QA: `/en/styles/swiss-design` desktop/mobile에서 marker 3개와 horizontal overflow `0` 확인.
- Before screenshots: `output/playwright/per-style-review/swiss-design/before/`.
- After screenshots: `output/playwright/per-style-review/swiss-design/after/`.

### 남은 의심점

- 없음. 다음 패스는 `international-style`만 따로 리뷰하고 구현한다.

## 04. international-style

Status: `verified`

### 현재 샘플 진단

- 현재 샘플은 neutral grid, blue accent, component list를 갖고 있어 방향은 맞다.
- 약점: IBM Carbon 데모 화면처럼 보이는 단일 design-system landing에 머물러, International Style의 보편적 운영/시장/문서 시스템성이 약하다.
- 약점: moodboard의 transport-blue wayfinding, steel/acrylic standard panels, map-like grid가 실제 UI 재료감으로 충분히 번역되지 않았다.
- 약점: MoMA식 기관형 information architecture가 hero 이후의 cross-content modules로 보이지 않는다.
- 약점: `swiss-design`과 비교하면 red signal은 없지만, 둘 다 typography grid 카드로 읽힐 수 있어 global system matrix와 표준 컴포넌트 rail이 더 필요하다.

### 레퍼런스에서 가져올 웹 UI 문법

- IBM Design Language: Switch sites, Foundations, Implementation, Practices, typography/color/2x grid/iconography 같은 대형 design-system navigation.
- IBM Layout overview: essential content strategy, simple structure, systematic logic, alignment to an underlying grid, repeated measurements and proportions.
- MoMA: Visit, exhibitions/events, art/collection, store, membership처럼 서로 다른 목적의 기관 정보를 동일한 navigation shell 안에 묶는 구조.

### 샘플 목표

- 단일 Carbon-style 카드가 아니라 `GLOBAL SYSTEM PORTAL`이 보이는 국제 표준 운영 샘플로 만든다.
- 고유 마커: `GLOBAL SYSTEM PORTAL`, `2x component rail`, `cross-market content matrix`.
- global locale/status, product standards, market readiness, institution content modules가 같은 중립 grid 안에서 반복되어야 한다.
- `swiss-design`보다 red editorial signal과 포스터 리듬을 줄이고, `modernism`보다 primary geometry를 줄이며, `scandinavian`/`japandi`처럼 생활감 있는 소재와 곡선을 피한다.

### 검증 계획

- `npm run check:style-distinction`가 international-style 고유 마커 3개를 요구하도록 먼저 실패시킨다.
- 구현 후 `npm run check:style-distinction`, `npm run lint`, `npm run build`, `npm run check:data`, `npm run check:style-refs`, international-style desktop/mobile browser QA를 실행한다.
- 결과 스크린샷: `output/playwright/per-style-review/international-style/after/`.

### 구현 결과

- 기존 Carbon-style landing을 `GLOBAL SYSTEM PORTAL`이 보이는 국제 표준 운영 포털로 재구성했다.
- IBM Design Language의 switch sites, foundations/implementation/practices, 2x grid 문법을 상단 system shell과 `2x component rail`로 번역했다.
- IBM Layout overview의 systematic logic, repeated measurements, grid alignment를 market table, component rail, module cards의 반복 규칙으로 반영했다.
- MoMA의 visit/events/collection/member 같은 기관형 information architecture를 하단 content module strip으로 반영했다.
- moodboard의 transport-blue, steel/acrylic, map-like grid는 blue action strip, grid overlay, material cells, neutral panel system으로 번역했다.
- `swiss-design`과 달리 red editorial signal과 poster rhythm을 제거하고, 시장/locale/status 중심 `cross-market content matrix`를 전면에 두었다.

### 검증 결과

- RED: `npm run check:style-distinction` 실패 확인. 이유: international-style marker 3개 누락.
- GREEN: `npm run check:style-distinction` 통과.
- `npm run lint` 통과.
- `npm run build` 통과. Next.js static pages `580/580`.
- `npm run check:data` 통과. 88 styles, 10 categories.
- `npm run check:style-refs` 통과. 88 styles covered.
- Browser QA: `/en/styles/international-style` desktop/mobile에서 marker 3개와 horizontal overflow `0` 확인.
- Browser QA: `/en/styles` desktop/mobile에서 International Style card 존재와 horizontal overflow `0` 확인.
- Before screenshots: `output/playwright/per-style-review/international-style/before/`.
- After screenshots: `output/playwright/per-style-review/international-style/after/`.

### 남은 의심점

- 없음. 다음 패스는 `scandinavian`만 따로 리뷰하고 구현한다.

## 05. scandinavian

Status: `verified`

### 현재 샘플 진단

- 현재 샘플은 밝은 room hero, product cards, oak/sage palette를 갖고 있어 Scandinavian 방향은 이미 강하다.
- 약점: hero 이미지와 제품 카드 3개 중심이라, IKEA/Nordic Nest식 room-by-room category navigation과 실용적인 shopping hierarchy가 약하다.
- 약점: Muuto식 product family/category taxonomy가 화면에 드러나지 않아 단순 홈 스타일링 카드처럼 보일 수 있다.
- 약점: moodboard의 birch/linen/wool/ceramic/material chips가 UI 컴포넌트의 표면, category shelf, utility controls로 충분히 번역되지 않았다.
- 약점: `japandi`와 비교하면 더 밝고 커머스적이지만, 첫 화면 구조가 여전히 조용한 인테리어 editorial처럼 읽힐 수 있다.

### 레퍼런스에서 가져올 웹 UI 문법

- IKEA: room/story cards, small-space ideas, designer stories처럼 생활 장면과 실용 팁을 카드형으로 이어가는 친근한 홈 탐색.
- Muuto: seating, sofas, tables, storage, lighting, accessories, product families처럼 제품 taxonomy가 상세하게 나뉘는 구조.
- Nordic Nest: shop by category, offers, new arrivals, room categories, Scandinavian design icons처럼 쇼핑 목적과 lifestyle discovery가 함께 있는 구조.

### 샘플 목표

- 단일 lifestyle hero가 아니라 `NORDIC ROOM SHOP`이 보이는 밝은 홈 커머스 샘플로 만든다.
- 고유 마커: `NORDIC ROOM SHOP`, `room-by-room category shelf`, `soft utility product cards`.
- room cards, category icons, product family rows, offer badge, practical price/action hierarchy가 같은 화면에 보여야 한다.
- `japandi`보다 밝고 빠른 쇼핑 흐름, `warm-minimal`보다 실용적이고 commerce-heavy한 카드 밀도, `international-style`보다 소재감과 생활 이미지가 강해야 한다.

### 검증 계획

- `npm run check:style-distinction`가 scandinavian 고유 마커 3개를 요구하도록 먼저 실패시킨다.
- 구현 후 `npm run check:style-distinction`, `npm run lint`, `npm run build`, `npm run check:data`, `npm run check:style-refs`, scandinavian desktop/mobile browser QA를 실행한다.
- 결과 스크린샷: `output/playwright/per-style-review/scandinavian/after/`.

### 구현 결과

- 기존 room hero + product cards 구성을 `NORDIC ROOM SHOP`이 보이는 밝은 홈 커머스 화면으로 재조직했다.
- IKEA의 room/story cards와 small-space ideas 문법을 hero badge, room CTA, practical offer badge로 반영했다.
- Muuto의 seating/tables/lighting/storage/product family taxonomy를 product families rail로 반영했다.
- Nordic Nest의 shop by category, new arrivals, room shopping hierarchy를 `room-by-room category shelf`와 offer/product card grid로 번역했다.
- moodboard의 birch, linen, wool, ceramic material signal은 rounded shelf chips, soft product surfaces, material color beads로 옮겼다.
- `japandi`보다 빠른 쇼핑 흐름과 밝은 room/card density를 강화하고, `warm-minimal`보다 제품/가격/action 중심의 실용 커머스 구조를 전면에 두었다.

### 검증 결과

- RED: `npm run check:style-distinction` 실패 확인. 이유: scandinavian marker 3개 누락.
- GREEN: `npm run check:style-distinction` 통과.
- `npm run lint` 통과.
- `npm run build` 통과. Next.js static pages `580/580`.
- `npm run check:data` 통과. 88 styles, 10 categories.
- `npm run check:style-refs` 통과. 88 styles covered.
- Browser QA: `/en/styles/scandinavian` desktop/mobile에서 marker 3개와 horizontal overflow `0` 확인.
- Browser QA: `/en/styles` desktop/mobile에서 Scandinavian card와 `NORDIC ROOM SHOP` marker, horizontal overflow `0` 확인.
- Before screenshots: `output/playwright/per-style-review/scandinavian/before/`.
- After screenshots: `output/playwright/per-style-review/scandinavian/after/`.

### 남은 의심점

- 없음. 다음 패스는 `japandi`만 따로 리뷰하고 구현한다.

## 06. japandi

Status: `verified`

### 현재 샘플 진단

- 현재 샘플은 muted wood, rice-paper panel, shoji light, material study가 있어 Japandi 방향은 강하다.
- 약점: Karimoku Case/Norm Architects에서 보이는 case-study project meta, creator/artisan context, image index 구조가 약하다.
- 약점: 긴 이미지 블록과 조용한 material panel은 있지만, `scandinavian`과 비교해 쇼핑이 아니고 느린 공간 기록이라는 차이가 더 명확해야 한다.
- 약점: `warm-minimal`의 interior studio 카드와 구분하려면 상담/CTA보다 장소, 연도, 재료, case index가 더 전면에 있어야 한다.
- 약점: moodboard의 shoji paper, ash wood, ceramic, woven textile이 단순 palette가 아니라 UI의 index/sequence/field note로 번역되어야 한다.

### 레퍼런스에서 가져올 웹 UI 문법

- Karimoku Case: About/Cases/Collection/Artisans/Creators, 다국어 nav, creators bio/Q&A처럼 제작자와 재료 배경을 느리게 읽게 하는 구조.
- Norm Azabu Residence: location, photography, category, year 같은 project meta와 긴 서술, 이미지 index 01-30의 case-study archive 문법.
- Norm Soft Minimal: human-centric restraint, tactility, natural light, soft-minimal storytelling.

### 샘플 목표

- 단일 interior hero가 아니라 `LOW HORIZONTAL RESIDENCE`가 보이는 조용한 case-study 웹 샘플로 만든다.
- 고유 마커: `LOW HORIZONTAL RESIDENCE`, `shoji material index`, `slow case-study sequence`.
- 장소/연도/분야 project meta, 낮은 수평 공간 패널, shoji/wood/ceramic material index, 이미지 sequence가 같이 보여야 한다.
- `scandinavian`보다 제품/가격/카테고리를 줄이고, `warm-minimal`보다 스튜디오 CTA를 줄이며, `wabi-sabi`보다 더 polished하고 refined한 재료감을 유지한다.

### 검증 계획

- `npm run check:style-distinction`가 japandi 고유 마커 3개를 요구하도록 먼저 실패시킨다.
- 구현 후 `npm run check:style-distinction`, `npm run lint`, `npm run build`, `npm run check:data`, `npm run check:style-refs`, japandi desktop/mobile browser QA를 실행한다.
- 결과 스크린샷: `output/playwright/per-style-review/japandi/after/`.

### 구현 결과

- 기존 quiet interior landing을 `LOW HORIZONTAL RESIDENCE`가 보이는 case-study sample로 재구성했다.
- Karimoku Case의 Cases/Collection/Artisans/Creators 구조와 제작자/재료 맥락을 nav와 creator note로 반영했다.
- Norm Azabu Residence의 location/category/year project meta와 image index 문법을 meta grid와 `slow case-study sequence`로 번역했다.
- Norm Soft Minimal의 human-centric restraint와 tactility는 낮은 대비, 작은 CTA, `shoji material index`, soft image fields로 반영했다.
- moodboard의 shoji paper, ash wood, ceramic, moss ink는 material index와 sequence thumbnail의 표면 처리로 옮겼다.
- `scandinavian`과 달리 가격/장바구니/room shopping을 제거하고, `warm-minimal`과 달리 상담 CTA보다 장소/연도/재료/sequence를 전면에 두었다.

### 검증 결과

- RED: `npm run check:style-distinction` 실패 확인. 이유: japandi marker 3개 누락.
- GREEN: `npm run check:style-distinction` 통과.
- `npm run lint` 통과.
- `npm run build` 통과. Next.js static pages `580/580`.
- `npm run check:data` 통과. 88 styles, 10 categories.
- `npm run check:style-refs` 통과. 88 styles covered.
- Browser QA: `/en/styles/japandi` desktop/mobile에서 marker 3개와 horizontal overflow `0` 확인.
- Browser QA: `/en/styles` desktop/mobile에서 Japandi card와 `LOW HORIZONTAL RESIDENCE` marker, horizontal overflow `0` 확인.
- Before screenshots: `output/playwright/per-style-review/japandi/before/`.
- After screenshots: `output/playwright/per-style-review/japandi/after/`.

### 남은 의심점

- 없음. 다음 패스는 `warm-minimal`만 따로 리뷰하고 구현한다.

## 07. warm-minimal

Status: `verified`

### 현재 샘플 진단

- 현재 샘플은 cream/taupe warmth, terracotta CTA, soft project cards가 있어 Warm Minimal 방향은 이미 강하다.
- 약점: 고유한 studio portfolio flow가 marker 수준으로 고정되어 있지 않아 `soft-minimal`의 상담 서비스 화면과 일부 겹칠 수 있다.
- 약점: QUQU의 Selected Works 01-16와 consultation form 문법, Vellum의 WORK portfolio nav가 더 구조적으로 보여야 한다.
- 약점: moodboard의 linen, terracotta, brass, clay material signal이 project stack과 CTA 주변 표면 처리로 더 번역될 필요가 있다.
- 약점: `japandi`와 비교하면 따뜻하고 CTA가 있지만, 장소/재료 case-study가 아니라 스튜디오 포트폴리오라는 차이를 더 전면화해야 한다.

### 레퍼런스에서 가져올 웹 UI 문법

- QUQU Design Studio: Studio/Portfolio/Contact/PL-EN nav, Selected Works 01-16, room project cards, consultation form.
- Vellum Studio: HOME/WORK/CONTACT/ABOUT nav, residential project list, warm tranquil statement, newsletter/contact module.
- Norm Soft Minimal: tactile neutrals, slower reading rhythm, human-centered restraint.

### 샘플 목표

- 단일 따뜻한 interior card가 아니라 `WARM STUDIO PORTFOLIO`가 보이는 스튜디오 포트폴리오 샘플로 만든다.
- 고유 마커: `WARM STUDIO PORTFOLIO`, `terracotta consultation CTA`, `linen project stack`.
- selected works, project list, rounded image card, consultation CTA, linen/brass/clay material cues가 같이 보여야 한다.
- `soft-minimal`보다 색 온도와 terracotta CTA를 강하게, `japandi`보다 문의/포트폴리오 흐름을 강하게, `scandinavian`보다 제품/가격 밀도를 낮게 둔다.

### 검증 계획

- `npm run check:style-distinction`가 warm-minimal 고유 마커 3개를 요구하도록 먼저 실패시킨다.
- 구현 후 `npm run check:style-distinction`, `npm run lint`, `npm run build`, `npm run check:data`, `npm run check:style-refs`, warm-minimal desktop/mobile browser QA를 실행한다.
- 결과 스크린샷: `output/playwright/per-style-review/warm-minimal/after/`.

### 구현 결과

- 기존 warm interior card를 `WARM STUDIO PORTFOLIO`가 보이는 스튜디오 포트폴리오 샘플로 보강했다.
- QUQU Design Studio의 Selected Works 01-16과 consultation flow를 hero badge와 `terracotta consultation CTA`로 반영했다.
- Vellum Studio의 WORK 중심 주거 프로젝트 list 문법을 `linen project stack`과 둥근 project rows로 번역했다.
- Norm Soft Minimal의 tactile neutral rhythm은 cream/taupe surface, soft image crop, 작은 material strip으로 유지했다.
- moodboard의 linen, brass, clay, terracotta signal은 CTA, project stack, warm material beads로 옮겼다.
- `soft-minimal`보다 terracotta와 portfolio/project 흐름을 강하게, `japandi`보다 상담/스튜디오 전환을 강하게 두었다.

### 검증 결과

- RED: `npm run check:style-distinction` 실패 확인. 이유: warm-minimal marker 3개 누락.
- GREEN: `npm run check:style-distinction` 통과.
- `npm run lint` 통과.
- `npm run build` 통과. Next.js static pages `580/580`.
- `npm run check:data` 통과. 88 styles, 10 categories.
- `npm run check:style-refs` 통과. 88 styles covered.
- Browser QA: `/en/styles/warm-minimal` desktop/mobile에서 marker 3개와 horizontal overflow `0` 확인.
- Browser QA: `/en/styles` desktop/mobile에서 Warm Minimal card와 `WARM STUDIO PORTFOLIO` marker, horizontal overflow `0` 확인.
- Before screenshots: `output/playwright/per-style-review/warm-minimal/before/`.
- After screenshots: `output/playwright/per-style-review/warm-minimal/after/`.

### 남은 의심점

- 없음. 다음 패스는 `soft-minimal`만 따로 리뷰하고 구현한다.

## 08. soft-minimal

Status: `verified`

### 현재 샘플 진단

- 현재 샘플은 low-contrast hero, rounded consultation card, service rail이 있어 Soft Minimal 방향은 강하다.
- 약점: `warm-minimal`과 비교해 더 조용한 서비스 flow라는 marker가 명시적으로 고정되어 있지 않다.
- 약점: Norm Soft Minimal의 human-centered essay/index와 Vellum의 calm service/contact rhythm이 상담 flow 구조로 더 드러나야 한다.
- 약점: Toogood의 sculptural off-white rhythm은 표면과 카드 형태로만 희미하게 보이며, product/furniture 느낌으로 흐르지 않게 서비스 맥락을 강화해야 한다.
- 약점: moodboard의 frosted vellum, translucent cards, pill controls, tactile samples가 실제 UI state rail로 번역되어야 한다.

### 레퍼런스에서 가져올 웹 UI 문법

- Norm Soft Minimal: human-centric restraint, tactile imagery, slow essay and index rhythm.
- Vellum Studio: calm HOME/WORK/CONTACT/ABOUT nav, warm residential statement, quiet contact/newsletter module.
- Toogood: softened editorial minimalism, sculptural off-white product rhythm, restrained object storytelling.

### 샘플 목표

- 단일 rounded landing이 아니라 `SOFT SERVICE FLOW`가 보이는 저압 상담/서비스 샘플로 만든다.
- 고유 마커: `SOFT SERVICE FLOW`, `frosted consultation card`, `low-contrast session rail`.
- consultation card, package/session rows, soft metric, muted CTA가 낮은 대비 안에서도 명확하게 읽혀야 한다.
- `warm-minimal`보다 terracotta와 portfolio 흐름을 줄이고, `japandi`보다 case-study/wood index를 줄이며, `high-end-minimal`보다 훨씬 친근하고 rounded service UI로 둔다.

### 검증 계획

- `npm run check:style-distinction`가 soft-minimal 고유 마커 3개를 요구하도록 먼저 실패시킨다.
- 구현 후 `npm run check:style-distinction`, `npm run lint`, `npm run build`, `npm run check:data`, `npm run check:style-refs`, soft-minimal desktop/mobile browser QA를 실행한다.
- 결과 스크린샷: `output/playwright/per-style-review/soft-minimal/after/`.

### 구현 결과

- 기존 rounded consultation landing을 `SOFT SERVICE FLOW`가 보이는 저압 상담/서비스 샘플로 고정했다.
- Norm Soft Minimal의 human-centered restraint와 slow essay rhythm은 낮은 대비 제목, 짧은 설명, muted CTA로 반영했다.
- Vellum Studio의 quiet contact/service pacing은 `frosted consultation card`와 calm package rows로 번역했다.
- Toogood의 sculptural off-white restraint는 frosted image surface와 pill-shaped session UI로 제한적으로 반영했다.
- moodboard의 frosted vellum, translucent cards, pill controls는 `low-contrast session rail`과 rounded service cards로 옮겼다.
- `warm-minimal`과 달리 terracotta/portfolio 열기를 줄이고, `high-end-minimal`보다 훨씬 친근한 상담 UI 밀도를 유지했다.

### 검증 결과

- RED: `npm run check:style-distinction` 실패 확인. 이유: soft-minimal marker 3개 누락.
- GREEN: `npm run check:style-distinction` 통과.
- `npm run lint` 통과.
- `npm run build` 통과. Next.js static pages `580/580`.
- `npm run check:data` 통과. 88 styles, 10 categories.
- `npm run check:style-refs` 통과. 88 styles covered.
- Browser QA: `/en/styles/soft-minimal` desktop/mobile에서 marker 3개와 horizontal overflow `0` 확인.
- Browser QA: `/en/styles` desktop/mobile에서 Soft Minimal card와 `SOFT SERVICE FLOW` marker, horizontal overflow `0` 확인.
- Before screenshots: `output/playwright/per-style-review/soft-minimal/before/`.
- After screenshots: `output/playwright/per-style-review/soft-minimal/after/`.

### 남은 의심점

- 없음. 다음 패스는 `high-end-minimal`만 따로 리뷰하고 구현한다.

## 09. high-end-minimal

Status: `verified`

### 현재 샘플 진단

- 현재 샘플은 product crop, black/ivory hierarchy, reserved CTA가 있어 high-end minimal 방향은 강하다.
- 약점: Aesop의 category/product taxonomy와 Jil Sander의 엄격한 luxury commerce nav가 marker 수준으로 드러나지 않는다.
- 약점: moodboard의 crop marks, black stone, marble, brushed metal, satin material signals가 product detail rail로 더 명확해야 한다.
- 약점: `minimalism`과 비교해 단순 여백이 아니라 구매 가능한 luxury detail page라는 차이를 더 전면화해야 한다.
- 약점: `luxury` category와 겹치지 않게 장식적 고급감보다 exact spacing과 severe product crop을 강조해야 한다.

### 레퍼런스에서 가져올 웹 UI 문법

- Aesop: product category taxonomy, disciplined product storytelling, refined spacing, muted material color, controlled interaction detail.
- Jil Sander: ready-to-wear/accessories mega navigation, severe neutral composition, quiet product commerce hierarchy.
- Toteme: image-led restraint, exact spacing, black-and-cream editorial commerce modules.

### 샘플 목표

- 단일 제품 hero가 아니라 `QUIET COMMERCE FRAME`이 보이는 럭셔리 상품 상세 샘플로 만든다.
- 고유 마커: `QUIET COMMERCE FRAME`, `severe product crop`, `material provenance rail`.
- product crop, edition/price/reserve, material provenance, restrained taxonomy가 정교한 비례 안에 보여야 한다.
- `minimalism`보다 구매/상품 정보가 분명하고, `soft-minimal`보다 둥근 서비스 UI를 줄이며, `luxury`보다 장식보다 절제/여백/정확성을 우선한다.

### 검증 계획

- `npm run check:style-distinction`가 high-end-minimal 고유 마커 3개를 요구하도록 먼저 실패시킨다.
- 구현 후 `npm run check:style-distinction`, `npm run lint`, `npm run build`, `npm run check:data`, `npm run check:style-refs`, high-end-minimal desktop/mobile browser QA를 실행한다.
- 결과 스크린샷: `output/playwright/per-style-review/high-end-minimal/after/`.

### 구현 결과

- 기존 product hero를 `QUIET COMMERCE FRAME`이 보이는 luxury product detail sample로 고정했다.
- Aesop의 product taxonomy와 restrained interaction detail은 edition, price, reserve, material detail의 조용한 hierarchy로 반영했다.
- Jil Sander의 severe neutral commerce structure는 `severe product crop`, strict nav, small labels, black reserve CTA로 번역했다.
- Toteme의 image-led restraint와 exact spacing은 large image/detail split과 thin pager로 유지했다.
- moodboard의 crop marks, stone, marble, brushed metal signal은 `material provenance rail`과 product crop 주변의 fine label로 옮겼다.
- `minimalism`과 달리 구매/가격/예약 정보가 분명하고, `soft-minimal`과 달리 rounded service card를 쓰지 않는 restrained luxury commerce로 유지했다.

### 검증 결과

- RED: `npm run check:style-distinction` 실패 확인. 이유: high-end-minimal marker 3개 누락.
- GREEN: `npm run check:style-distinction` 통과.
- `npm run lint` 통과.
- `npm run build` 통과. Next.js static pages `580/580`.
- `npm run check:data` 통과. 88 styles, 10 categories.
- `npm run check:style-refs` 통과. 88 styles covered.
- Browser QA: `/en/styles/high-end-minimal` desktop/mobile에서 marker 3개와 horizontal overflow `0` 확인.
- Before screenshots: `output/playwright/per-style-review/high-end-minimal/before/`.
- After screenshots: `output/playwright/per-style-review/high-end-minimal/after/`.

### 남은 의심점

- 없음. 모던 / 미니멀 category 9개 스타일의 필터 QA까지 완료했다.

## 모던 / 미니멀 category QA

Status: `verified`

### 구분 결과

- `minimalism`: blank product canvas, negative-space stage, thin material index.
- `modernism`: primary-color functional program grid, numbered object taxonomy.
- `swiss-design`: red signal, public information baseline grid, timetable/news rail.
- `international-style`: blue global system portal, cross-market matrix, 2x component rail.
- `scandinavian`: bright room-commerce shelf, product family rail, soft utility cards.
- `japandi`: low horizontal residence case study, shoji material index, slow image sequence.
- `warm-minimal`: warm studio portfolio, terracotta consultation CTA, linen project stack.
- `soft-minimal`: low-contrast service flow, frosted consultation card, rounded session rail.
- `high-end-minimal`: severe product crop, quiet commerce frame, material provenance rail.

### category 검증 결과

- Browser QA: `/en/styles?category=%EB%AA%A8%EB%8D%98+%2F+%EB%AF%B8%EB%8B%88%EB%A9%80` desktop/mobile에서 9개 card만 표시됨.
- Browser QA: category filter desktop/mobile에서 9개 style marker 모두 존재, horizontal overflow `0`.
- Category screenshots: `output/playwright/category-review/modern-minimal/desktop-filtered.png`, `output/playwright/category-review/modern-minimal/mobile-filtered.png`.
- 다음 category는 `강렬 / 실험`이며 첫 style은 `brutalism`이다.
