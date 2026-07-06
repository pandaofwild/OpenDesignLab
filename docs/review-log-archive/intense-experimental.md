# 완료 카테고리 상세 기록: 강렬 / 실험

이 파일은 `docs/style-sample-web-review-log.md`에서 분리된 완료 카테고리의 스타일별 상세 기록이다. 진행 원칙, 상태 값, 전체 순회 큐는 본 로그 파일을 본다.

주의: 이 카테고리는 스타일별 검증은 완료됐지만, 카테고리 필터 화면에 대한 category QA 기록이 없다. 본 로그 파일의 "미해결 category QA" 섹션을 본다.

## 10. brutalism

Status: `verified`

### 현재 진단

- Before screenshots: `output/playwright/per-style-review/brutalism/before/desktop.png`, `output/playwright/per-style-review/brutalism/before/mobile.png`.
- 기존 샘플은 underlined links, table, email input을 갖고 있지만 첫 화면 마커가 약하고 작은 포스터 카드처럼 읽힌다.
- `new-brutalism`과 분리하려면 두꺼운 그림자/장난감 컴포넌트가 아니라 실제 문서형 웹, 기본 폼, raw directory, 기관 링크맵이 보여야 한다.

### referenceSites에서 가져올 웹 문법

- Brutalist Websites: 거친 사이트들을 긴 이미지/텍스트 목록으로 나열하는 archive rhythm, 편안함보다 raw exposure를 앞세우는 태도.
- Brutalist Web Design: 읽을 수 있는 콘텐츠, underlined hyperlinks, 버튼처럼 보이는 버튼, 스크롤 가능한 문서, 필요한 장식만 남기는 원칙.
- Secession: 기관형 메뉴, 티켓/언어/뉴스/전시/아카이브가 한 화면에 빽빽하게 이어지는 plain link map과 전시 일정 리스트.

### 목표

- 샘플 고유 마커: `RAW WEB INDEX`, `default submit queue`, `institutional link map`.
- 정보 구조: masthead -> raw link map -> directory table -> default submit form -> status footer.
- 시각 처리: monochrome, link blue/visited purple, red warning strip, no radius, no shadow, table rows, exposed image proof.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/brutalism` desktop/mobile marker presence, horizontal overflow `0`.
- `/en/styles` card에서 `RAW WEB INDEX` marker 확인.

### 구현 결과

- Hero sample을 `RAW WEB INDEX` masthead, 기관형 link map, directory table, proof scan, `default submit queue` form, raw status rows로 재구성했다.
- `new-brutalism`과 헷갈리는 thick shadow, rounded app card, saturated toy UI를 피하고, link blue/visited purple/red status/monochrome table row 중심으로 분리했다.
- Next.js Server Component 경계 오류를 확인해 event handler 없는 정적 HTML form으로 조정했다.

### 검증 결과

- RED: `npm run check:style-distinction`가 `RAW WEB INDEX`, `default submit queue`, `institutional link map` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/brutalism` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`.
- Browser QA: `/en/styles` desktop card에서 `Brutalism`, `RAW WEB INDEX` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/brutalism/after/desktop.png`, `output/playwright/per-style-review/brutalism/after/mobile.png`, `output/playwright/per-style-review/brutalism/after/styles-list.png`.
- Final commands: `npm run check:data`, `npm run check:style-refs`, `npm run check:style-distinction`, `npm run lint`, `npm run build` 모두 통과.
- 다음 style은 `new-brutalism`이다.

## 11. new-brutalism

Status: `verified`

### 현재 진단

- Before screenshots: `output/playwright/per-style-review/new-brutalism/before/desktop.png`, `output/playwright/per-style-review/new-brutalism/before/mobile.png`.
- 기존 샘플은 thick border, hard shadow, component controls는 좋지만 제품 판매 흐름보다 UI kit demo에 가깝다.
- `brutalism`과 분리하려면 raw HTML directory가 아니라 Gumroad식 creator storefront, 가격/구매 CTA, checkout controls, app component grammar가 보여야 한다.

### referenceSites에서 가져올 웹 문법

- Gumroad: creator commerce hero, start selling CTA, marketplace/search, product category chips, creator income/proof 흐름.
- Neubrutalism Guide: 3px border, 5px hard shadow, zero radius, flat categorical colors, bold type, productized anti-design dialect.
- Neo Brutalism UI: login, form, alert, OTP, buttons, toggle, component docs처럼 실제 앱 컴포넌트가 한 화면에 모이는 구조.

### 목표

- 샘플 고유 마커: `CREATOR STOREFRONT KIT`, `thick-border checkout`, `hard-shadow toggle stack`.
- 정보 구조: product nav -> creator sales hero -> storefront product card -> checkout/pricing box -> toggles/status controls.
- 시각 처리: off-white base, black 3px borders, zero-blur offset shadows, flat yellow/coral/blue panels, oversized controls.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/new-brutalism` desktop/mobile marker presence, horizontal overflow `0`.
- `/en/styles` card에서 `CREATOR STOREFRONT KIT` marker 확인.

### 구현 결과

- 기존 UI kit demo를 `CREATOR STOREFRONT KIT` 중심의 creator commerce sample로 재구성했다.
- Gumroad식 selling CTA/product card 흐름, `thick-border checkout`, `hard-shadow toggle stack`, pricing/native control labels를 한 화면에 배치했다.
- `brutalism`과 달리 raw directory/table보다 productized app UI, flat color panels, 3px outlines, hard offset shadows를 전면에 두었다.

### 검증 결과

- RED: `npm run check:style-distinction`가 `CREATOR STOREFRONT KIT`, `thick-border checkout`, `hard-shadow toggle stack` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/new-brutalism` desktop/mobile에서 `CREATOR STOREFRONT KIT`, `RAW COMPONENT KIT`, `native form controls`, `pricing table`, `thick-border checkout`, `hard-shadow toggle stack` 모두 존재, horizontal overflow `0`.
- Browser QA: `/en/styles` desktop card에서 `New Brutalism`, `CREATOR STOREFRONT KIT` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/new-brutalism/after/desktop.png`, `output/playwright/per-style-review/new-brutalism/after/mobile.png`, `output/playwright/per-style-review/new-brutalism/after/styles-list.png`.
- Final commands: `npm run check:data`, `npm run check:style-refs`, `npm run check:style-distinction`, `npm run lint`, `npm run build` 모두 통과.
- 다음 style은 `anti-design`이다.

## 12. anti-design

Status: `verified`

### 현재 진단

- Before screenshots: `output/playwright/per-style-review/anti-design/before/desktop.png`, `output/playwright/per-style-review/anti-design/before/mobile.png`.
- 기존 샘플은 hand-drawn gesture, irregular panel, raw UI는 강하지만 프로젝트 포트폴리오 구조가 약해 단순 콜라주처럼 보일 위험이 있다.
- `new-brutalism`과 달리 정돈된 앱 UI가 아니어야 하고, `maximalism`과 달리 dense product world가 아니라 의도적으로 어긋난 creative portfolio shell이어야 한다.

### referenceSites에서 가져올 웹 문법

- Bryantcodes: 프로젝트 중심 포트폴리오, case title, client/design/meta, wild prototype story, contact flow.
- Superbad: 이미지 중심의 낯선 링크 구조, awkward navigation, anti-polished browsing.
- The HTML Review: issue/archive/list가 이상한 순서로 펼쳐지는 handcrafted web journal rhythm.

### 목표

- 샘플 고유 마커: `OFF-GRID PORTFOLIO`, `wrong-way project rail`, `scribble navigation path`.
- 정보 구조: title bar -> off-grid portfolio hero -> project cards/meta -> wrong-way nav rail -> contact/footer.
- 시각 처리: white canvas, dark irregular hero, neon scribble path, skewed cards, readable weirdness, no cute component order.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/anti-design` desktop/mobile marker presence, horizontal overflow `0`.
- `/en/styles` card에서 `OFF-GRID PORTFOLIO` marker 확인.

### 구현 결과

- 기존 collage board를 `OFF-GRID PORTFOLIO` title bar, `scribble navigation path`, case intro, project card, `wrong-way project rail`, crooked portfolio footer로 보강했다.
- `new-brutalism`의 정돈된 app component grammar와 분리되도록 rounded/product UI 대신 skewed project cards, neon scribble, irregular dark hero, awkward route labels를 유지했다.
- 모바일에서 큰 헤드라인이 잘리는 문제를 줄이기 위해 anti-design의 크롭 감각은 유지하되 font scale을 낮췄다.

### 검증 결과

- RED: `npm run check:style-distinction`가 `OFF-GRID PORTFOLIO`, `wrong-way project rail`, `scribble navigation path` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/anti-design` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`.
- Browser QA: `/en/styles` desktop card에서 `Anti-Design`, `OFF-GRID PORTFOLIO` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/anti-design/after/desktop.png`, `output/playwright/per-style-review/anti-design/after/mobile.png`, `output/playwright/per-style-review/anti-design/after/styles-list.png`.
- Final commands: `npm run check:data`, `npm run check:style-refs`, `npm run check:style-distinction`, `npm run lint`, `npm run build` 모두 통과.
- 다음 style은 `maximalism`이다.

## 13. maximalism

Status: `verified`

### 현재 진단

- Before screenshots: `output/playwright/per-style-review/maximalism/before/desktop.png`, `output/playwright/per-style-review/maximalism/before/mobile.png`.
- 기존 샘플은 패턴 밀도, 상품 카드, 배지, CTA가 이미 강하지만, fabric/category navigation과 campaign-commerce 층위가 자동 검증 기준으로는 약하다.
- `anti-design`처럼 어긋난 포트폴리오가 아니라, 풍부하지만 큐레이션된 product world로 읽혀야 한다.

### referenceSites에서 가져올 웹 문법

- FARM Rio: 프로모션 바, collection/drop hierarchy, product grid, product price, Shop the edit CTA.
- Meow Wolf: 장소/티켓/이벤트가 촘촘하게 쌓이는 experience-led navigation과 dense worldbuilding.
- Liberty London: fabric, pattern, room, usage category가 깊게 갈라지는 ornamental commerce navigation.

### 목표

- 샘플 고유 마커: `PATTERN MARKET`, `campaign tile stack`, `ornamental category wall`.
- 정보 구조: promo/nav -> layered campaign hero -> product cards -> dense category wall -> CTA.
- 시각 처리: saturated jewel palette, textile pattern density, ribbons/badges, compact commerce modules, clear high-contrast action.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/maximalism` desktop/mobile marker presence, horizontal overflow `0`.
- `/en/styles` card에서 `PATTERN MARKET` marker 확인.

### 구현 결과

- 기존 dense campaign composition에 `PATTERN MARKET`, `campaign tile stack`, `ornamental category wall`을 추가해 product-world 구조를 더 명확히 했다.
- FARM Rio식 collection/product/price/CTA, Meow Wolf식 dense worldbuilding, Liberty식 fabric/pattern category wall 문법을 샘플에 번역했다.
- `anti-design`처럼 일부러 어긋난 포트폴리오가 아니라, 포화된 패턴과 상품 탐색이 큐레이션된 커머스 화면으로 읽히게 했다.

### 검증 결과

- RED: `npm run check:style-distinction`가 `PATTERN MARKET`, `campaign tile stack`, `ornamental category wall` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/maximalism` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`.
- Browser QA: `/en/styles` desktop card에서 `Maximalism`, `PATTERN MARKET` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/maximalism/after/desktop.png`, `output/playwright/per-style-review/maximalism/after/mobile.png`, `output/playwright/per-style-review/maximalism/after/styles-list.png`.
- Final commands: `npm run check:data`, `npm run check:style-refs`, `npm run check:style-distinction`, `npm run lint`, `npm run build` 모두 통과.
- 다음 style은 `glitch-art`이다.

## 14. glitch-art

Status: `verified`

### 현재 진단

- Before screenshots: `output/playwright/per-style-review/glitch-art/before/desktop.png`, `output/playwright/per-style-review/glitch-art/before/mobile.png`.
- 기존 샘플은 `SIGNAL DAMAGE`, checksum, macroblock, codec fault가 이미 강하지만 JODI식 net-art/code-as-surface 신호가 약하다.
- `cyberpunk`/`high-tech`와 분리하려면 도시 네온이나 polished HUD가 아니라 browser/code artifact, ASCII rupture, codec forensics가 화면 구조에 보여야 한다.
- 현재 moodboard는 diagnostic panels, RGB acetate, macroblocks, scanline material이 잘 보여 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- Net-Art.org JODI: browser art, ASCII noise, JavaScript, 인터넷 자체를 재료로 쓰는 설명 구조.
- JODI: 거대한 ASCII/code surface, 기계적 기호와 링크가 화면 대부분을 차지하는 raw browser artifact.
- 404.zero: dark generative art index, releases/software/installations가 짧은 항목으로 쌓이는 audiovisual archive.

### 목표

- 샘플 고유 마커: `NET ART ERROR SURFACE`, `ASCII rupture feed`, `codec forensics rail`.
- 정보 구조: net-art error masthead -> signal headline -> ASCII rupture feed -> macroblock panel -> codec forensics rail.
- 시각 처리: dark diagnostic surface, RGB channel drift, scanlines, code fragments, macroblocks, checksum/codec logs.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/glitch-art` desktop/mobile marker presence, horizontal overflow `0`.
- `/en/styles` card에서 `NET ART ERROR SURFACE` marker 확인.

### 구현 및 검증 결과

- `GlitchArtInterface`를 JODI식 browser/code artifact가 보이는 net-art error surface로 보강했다.
- 기존 `SIGNAL DAMAGE` headline과 macroblock grid는 유지하되, `NET ART ERROR SURFACE` masthead, `ASCII rupture feed`, `codec forensics rail`을 실제 화면 구조에 추가했다.
- RED: `npm run check:style-distinction`가 `NET ART ERROR SURFACE`, `ASCII rupture feed`, `codec forensics rail` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/glitch-art` desktop/mobile에서 `NET ART ERROR SURFACE`, `SIGNAL DAMAGE`, `ASCII rupture feed`, `macroblock map`, `codec forensics rail` 모두 존재, horizontal overflow `0`.
- Browser QA: `/en/styles` desktop card에서 `Glitch Art`, `NET ART ERROR SURFACE` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/glitch-art/after/desktop.png`, `output/playwright/per-style-review/glitch-art/after/mobile.png`, `output/playwright/per-style-review/glitch-art/after/styles-list.png`.
- Final commands: `npm run check:data`, `npm run check:style-refs`, `npm run check:style-distinction`, `npm run lint`, `npm run build` 모두 통과.
- 다음 style은 `deconstructivism`이다.

## 15. deconstructivism

Status: `verified`

### 현재 진단

- Before screenshots: `output/playwright/per-style-review/deconstructivism/before/desktop.png`, `output/playwright/per-style-review/deconstructivism/before/mobile.png`.
- 기존 샘플은 ZHA식 건축 포트폴리오 이미지는 있으나, `deconstructivism`의 핵심인 apparent instability, displaced structural grid, fractured-yet-designed archive가 화면 구조에서 충분히 검증되지 않는다.
- `anti-design`과 구분하려면 의도적 엉킴이 아니라 설계된 구조 결함, 도면 좌표, 프로젝트 필터, 전시/아카이브 문법이 보여야 한다.
- `avant-garde`와 구분하려면 문화 선언문/타이포 포스터보다 건축 프로젝트 인덱스, 절단면, 도면형 구성선, built/not-broken 긴장이 우선되어야 한다.
- 현재 moodboard는 fractured layout proofs, tracing-paper overlays, concrete samples, red-blue construction tension이 잘 보여 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- MoMA Deconstructivist Architecture: 전시 기록, publication, installation images, artists가 묶인 archive/exhibition detail 구조.
- MoMA press release: twisted volumes, warped planes, clashed lines, apparent instability but structurally sound라는 핵심 원리.
- Zaha Hadid Architects: archive search, category filters, budget/location/date/size/status 필터, 프로젝트 규모 수치와 Enter Archive 리듬.
- Coop Himmelb(l)au: categories, project status filter, project cards with location/year/view project, 반복 quote/news stack.

### 목표

- 샘플 고유 마커: `STRUCTURAL FAULT`, `fracture section index`, `displaced project axis`.
- 정보 구조: archive/filter masthead -> fractured hero blueprint -> displaced project axis -> MoMA-style exhibition notes -> Coop-style project status index.
- 시각 처리: concrete paper surface, black construction lines, clipped architectural image slabs, red collision marker, blueprint-blue axis, offset project modules.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/deconstructivism` desktop/mobile marker presence, horizontal overflow `0`.
- `/en/styles` card에서 `STRUCTURAL FAULT` marker 확인.

### 구현 및 검증 결과

- `DeconstructiveExhibition`을 건축 아카이브/전시 기록 웹 샘플로 재구성했다.
- ZHA식 archive/filter bank, MoMA식 exhibition record, Coop Himmelb(l)au식 project status list를 `STRUCTURAL FAULT` 도면 표면 안에 결합했다.
- `anti-design`과 겹치지 않도록 무작위 혼란 대신 built-not-broken 구조 결함, 도면 좌표선, red-blue construction axis를 사용했다.
- `avant-garde`와 겹치지 않도록 선언문/문화 포스터보다 프로젝트 인덱스, clipped architecture slab, archive filter/status 문법을 전면에 두었다.
- 긴 단일 단어 스타일명(`Deconstructivism`)이 detail hero에서 강제 줄바꿈되지 않도록 long display name 크기 보정도 함께 적용했다.
- RED: `npm run check:style-distinction`가 `STRUCTURAL FAULT`, `fracture section index`, `displaced project axis` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/deconstructivism` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title line count `1`.
- Browser QA: `/en/styles` desktop card에서 `Deconstructivism`, `STRUCTURAL FAULT` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/deconstructivism/after/desktop.png`, `output/playwright/per-style-review/deconstructivism/after/mobile.png`, `output/playwright/per-style-review/deconstructivism/after/styles-list.png`.
- Final commands: `npm run check:data`, `npm run check:style-refs`, `npm run check:style-distinction`, `npm run lint`, `npm run build` 모두 통과.
- 다음 style은 `avant-garde`이다.

## 16. avant-garde

Status: `verified`

### 현재 진단

- Before screenshots: `output/playwright/per-style-review/avant-garde/before/desktop.png`, `output/playwright/per-style-review/avant-garde/before/mobile.png`.
- 기존 샘플은 constructivist image hero와 what&apos;s-on rail이 강하지만, 아직 `posterism`처럼 하나의 선언형 포스터가 중심으로 읽힐 수 있다.
- `postmodernism`과 구분하려면 역사/상품/아이러니 리믹스가 아니라 전통에 맞서는 문화 프로그램, 비평 실천, 전시/이벤트/작가 모듈이 보여야 한다.
- `brutalism`과 구분하려면 raw web table이나 default UI가 아니라 의도적으로 구성된 manifesto typography, primary color block, program agenda가 보여야 한다.
- 현재 moodboard는 constructivist planes, abstract manifesto blocks, program modules, photomontage fragments가 충분해 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- National Galleries of Scotland Avant-garde: 전통에 맞서는 실험/혁신, social agenda를 가진 문화 실천이라는 정의.
- MoMA A Revolutionary Impulse: painting, drawing, sculpture, prints, book/graphic design, film, photography, architecture가 교차하는 전시 구조와 events/artists rail.
- MoMA Liubov Popova: Art into Life, 생산/기술/유틸리티 디자인으로 이어지는 선언적 실천.
- Walker Art Center Critical Graphic Design Practice: graphic design이 자체 자원으로 의미를 만들고, 비평/연구/조직을 디자인 실천으로 삼는 논리.

### 목표

- 샘플 고유 마커: `MANIFESTO PROGRAM`, `critical lecture rail`, `art-into-life agenda`.
- 정보 구조: museum/program masthead -> manifesto hero -> events/lecture rail -> art-into-life agenda -> artist/discourse index.
- 시각 처리: constructivist red/black/blue/yellow planes, photomontage slab, manifesto type, cultural program cards, critical note blocks.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/avant-garde` desktop/mobile marker presence, horizontal overflow `0`.
- `/en/styles` card에서 `MANIFESTO PROGRAM` marker 확인.

### 구현 및 검증 결과

- `AvantGardeEditorial`을 단일 포스터형 이미지 중심에서 문화기관 프로그램 웹 샘플로 재구성했다.
- `MANIFESTO PROGRAM` masthead, `critical lecture rail`, `art-into-life agenda`, artists/events/essays index를 실제 화면 구조에 배치했다.
- National Galleries의 avant-garde 정의를 반영해 전통에 맞서는 실험/혁신의 cultural practice로 보이게 했다.
- MoMA Russian avant-garde 전시의 painting, graphic design, film, photography, architecture 교차성과 events/artists rail을 프로그램 구조로 번역했다.
- Popova의 Art into Life와 Walker의 critical graphic design practice는 하단 agenda와 lecture rail에 반영했다.
- `posterism`과 겹치지 않도록 하나의 포스터 메시지보다 전시/강연/비평/작가 rail을 중심으로 두었다.
- RED: `npm run check:style-distinction`가 `MANIFESTO PROGRAM`, `critical lecture rail`, `art-into-life agenda` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/avant-garde` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title line count `1`.
- Browser QA: `/en/styles` desktop card에서 `Avant-Garde`, `MANIFESTO PROGRAM` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/avant-garde/after/desktop.png`, `output/playwright/per-style-review/avant-garde/after/mobile.png`, `output/playwright/per-style-review/avant-garde/after/styles-list.png`.
- Final commands: `npm run check:data`, `npm run check:style-refs`, `npm run check:style-distinction`, `npm run lint`, `npm run build` 모두 통과.
- 다음 style은 `postmodernism`이다.

## 17. postmodernism

Status: `verified`

### 현재 진단

- Before screenshots: `output/playwright/per-style-review/postmodernism/before/desktop.png`, `output/playwright/per-style-review/postmodernism/before/mobile.png`.
- 기존 샘플은 `CLASSICAL QUOTE`, culture collage, ironic object index가 보이지만, MoMA식 works index와 Memphis/Vitra식 anti-functional object shop 문법이 아직 얕다.
- `new-brutalism`과 구분하려면 컴포넌트 kit, native form controls, pricing table이 아니라 역사 인용, 오브젝트 아카이브, 아이러니한 상품/전시 포털이 보여야 한다.
- `maximalism`과 구분하려면 패턴 과잉이 아니라 mixed-era cultural portal, quote module, curated object shelf가 중심이어야 한다.
- `avant-garde`와 구분하려면 사회적 선언/문화 프로그램보다 historical remix, popular culture, kitsch/elegance, object commerce가 우선되어야 한다.
- 현재 moodboard는 classical column fragments, Memphis accent shapes, object cards, terrazzo/laminate samples가 충분해 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- MoMA Postmodernism: 작품 6개가 있는 Art terms/Works index 구조, Michael Graves, Aldo Rossi, Warhol, Koons처럼 건축/사진/대중문화 오브젝트가 함께 놓이는 혼합성.
- Vitra Design Museum Memphis: functionalism dogma를 벗어나려는 그룹, garish colours, wild patterns, popular culture, advertising aesthetics, kitsch and elegance.
- Memphis Milano: category/filter/shop처럼 오브젝트를 분류하고, icon product와 designer attribution을 전면에 두는 product archive 문법.

### 목표

- 샘플 고유 마커: `CLASSICAL QUOTE`, `mixed-era object index`, `Memphis anti-functional shop`.
- 정보 구조: quote masthead -> mixed-era hero -> MoMA-style works/object index -> Memphis anti-functional shop shelf -> culture collage note.
- 시각 처리: classical column/serif quotation, Memphis accent geometry, mismatched cards, object shelf, pop-art commerce label, warm cream museum base.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/postmodernism` desktop/mobile marker presence, horizontal overflow `0`.
- `/en/styles` card에서 `CLASSICAL QUOTE` marker 확인.

### 구현 및 검증 결과

- `PostmodernArchivePortal`을 classical quote hero 중심에서 mixed-era cultural commerce portal로 보강했다.
- MoMA식 works/object index를 `mixed-era object index` 모듈로 번역하고, Graves/Warhol/Koons처럼 건축, 대중문화, 오브젝트가 함께 보이게 했다.
- Vitra Design Museum의 Memphis 해석을 반영해 `Memphis anti-functional shop` shelf를 추가하고 Beverly sideboard, Super lamp, Bel-Air chair 같은 object-commerce 리듬을 넣었다.
- 기존 postmodern marker인 `CLASSICAL QUOTE`, `culture collage`, `ironic object index`는 유지하면서 new-brutalist component kit나 pricing table과 겹치지 않게 했다.
- `maximalism`과 겹치지 않도록 패턴 밀도보다 quote, works index, shop shelf, kitsch/elegance footer를 중심으로 뒀다.
- RED: `npm run check:style-distinction`가 `mixed-era object index`, `Memphis anti-functional shop` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/postmodernism` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title line count `1`.
- Browser QA: `/en/styles` desktop card에서 `Postmodernism`, `CLASSICAL QUOTE` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/postmodernism/after/desktop.png`, `output/playwright/per-style-review/postmodernism/after/mobile.png`, `output/playwright/per-style-review/postmodernism/after/styles-list.png`.
- Final commands: `npm run check:data`, `npm run check:style-refs`, `npm run check:style-distinction`, `npm run lint`, `npm run build` 모두 통과.
- 다음 style은 `retro`이다.

