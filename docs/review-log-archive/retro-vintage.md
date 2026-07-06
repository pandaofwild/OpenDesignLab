# 완료 카테고리 상세 기록: 레트로 / 빈티지

이 파일은 `docs/style-sample-web-review-log.md`에서 분리된 완료 카테고리의 스타일별 상세 기록이다. 진행 원칙, 상태 값, 전체 순회 큐는 본 로그 파일을 본다.

주의: 이 카테고리는 스타일별 검증은 완료됐지만, 카테고리 필터 화면에 대한 category QA 기록이 없다. 본 로그 파일의 "미해결 category QA" 섹션을 본다.

## 18. retro

### 현재 판정

- Status: `verified`.
- Before screenshots: `output/playwright/per-style-review/retro/before/desktop.png`, `output/playwright/per-style-review/retro/before/mobile.png`.
- 기존 샘플은 Poolside FM식 플레이어 창 하나에 의미가 집중되어 있어 실제 웹 랜딩/상점 구조가 약했다.
- `vintage`와 구분하려면 aged paper catalog, serif heritage, patina가 아니라 밝은 방송형 노스탤지어와 상품 큐가 중심이어야 한다.
- `seventies-retro`와 구분하려면 70s wavy/groovy hero가 아니라 decade dial, media player, broad retro commerce가 보여야 한다.
- `eighties-retro`와 구분하려면 dark neon console이 아니라 warm cream/mustard broadcast shop이어야 한다.
- 현재 moodboard는 faded commerce modules, analog product crops, halftone paper, warm color blocking이 충분해 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- Poolsuite/Poolside FM: retro radio/media interface, warm leisure tone, broadcast/player window grammar.
- Radiooooo: country/decade selection에서 오는 time-travel navigation rhythm.
- Web Design Museum: 오래된 웹/앱/소프트웨어를 스크린샷과 카테고리로 보여주는 archive/gallery rhythm.

### 목표

- 샘플 고유 마커: `RETRO BROADCAST SHOP`, `time-travel media dial`, `analog merch queue`.
- 정보 구조: broadcast shop header -> media landing/photo module -> time-travel decade dial -> analog merch queue -> small archive/station cards.
- 시각 처리: warm cream and mustard base, teal broadcast header, rounded controls, halftone/grid paper texture, clean nostalgic commerce cards.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/retro` desktop/mobile marker presence, horizontal overflow `0`, detail title line count `1`.
- `/en/styles` card에서 `Retro`, `RETRO BROADCAST SHOP` marker 확인.

### 구현 및 검증 결과

- `RetroDinerShop`을 단일 플레이어 창에서 broadcast shop 랜딩으로 재구성했다.
- Radiooooo식 decade 선택을 `time-travel media dial`로 번역하고, Poolside식 미디어 감각을 상단 broadcast/player 구조로 유지했다.
- `analog merch queue`를 추가해 실제 커머스/굿즈 화면처럼 보이게 하고, `vintage`의 종이 카탈로그나 `70s Retro`의 groovy card와 구분했다.
- `designStyles.ts`와 `scripts/style-references.json`의 retro 설명을 새 화면 문법에 맞게 보강했다.
- RED: `npm run check:style-distinction`가 `RETRO BROADCAST SHOP`, `time-travel media dial`, `analog merch queue` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/retro` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title line count `1`.
- Browser QA: `/en/styles` desktop card에서 `Retro`, `RETRO BROADCAST SHOP` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/retro/after/desktop.png`, `output/playwright/per-style-review/retro/after/mobile.png`, `output/playwright/per-style-review/retro/after/styles-list.png`.
- 다음 style은 `vintage`이다.

## 19. vintage

### 현재 판정

- Status: `verified`.
- Before screenshots: `output/playwright/per-style-review/vintage/before/desktop.png`, `output/playwright/per-style-review/vintage/before/mobile.png`.
- 기존 샘플은 aged paper catalog 분위기는 있으나, 제품 카드 3개와 보증 띠 중심이라 실제 헤리티지 웹 샘플의 정보 구조가 얕았다.
- `retro`와 구분하려면 밝은 방송/머치 큐가 아니라 aged paper, muted ink, repair record, material patina가 중심이어야 한다.
- `seventies-retro`와 구분하려면 따뜻한 곡선과 라이프스타일 상품 카드보다, 직선적인 카탈로그 행과 수선 기록이 먼저 보여야 한다.
- `rustic`과 구분하려면 거친 lodge/wood commerce가 아니라 종이 아카이브, 수선 티켓, muted ink catalog가 중심이어야 한다.
- 현재 moodboard는 foxed paper, sepia archive crops, letterpress texture, cloth, brass, dark wood가 충분해 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- Filson: category-heavy heritage navigation, Tin Cloth/Rugged Twill 같은 material categories, repairs/guarantee support, Unfailing Goods since 1897.
- Filson Repairs/Restoration: darning, binding, panel replacement, visible repair marks, lifetime guarantee, restoration workshop story.
- Levi Strauss archive: 501 history, mended/reused/patched product story, archival article structure.
- Web Design Museum: old websites/apps/software archive rhythm and document-like gallery structure.

### 목표

- 샘플 고유 마커: `PAPER CATALOG`, `repair ticket ledger`, `patina material register`.
- 정보 구조: paper catalog masthead -> material photo proof -> heritage catalog rows -> patina material register -> repair ticket ledger -> guarantee/archive footer.
- 시각 처리: aged ivory paper, muted ink, brown/olive register chips, serif masthead, table rows, visible mending badge, quiet archive density.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/vintage` desktop/mobile marker presence, horizontal overflow `0`, detail title line count `1`.
- `/en/styles` card에서 `Vintage`, `PAPER CATALOG` marker 확인.

### 구현 및 검증 결과

- `VintagePaperCatalog`을 단순 3상품 카탈로그에서 repair/material/archive를 포함한 heritage catalog sample로 재구성했다.
- Filson의 repair/guarantee 문법을 `repair ticket ledger`로, Tin Cloth/Rugged Twill 같은 소재 문법을 `patina material register`로 번역했다.
- Levi Strauss archive의 patched/reused 501 story 방향을 `501 Archive Jean`, visible mending footer, archive issue cue로 반영했다.
- `retro`의 broadcast shop이나 `70s Retro`의 groovy product card와 겹치지 않도록 직선 표, 세리프 masthead, aged paper texture, muted ink를 중심으로 뒀다.
- `designStyles.ts`와 `scripts/style-references.json`의 vintage 설명을 새 화면 문법에 맞게 보강했다.
- RED: `npm run check:style-distinction`가 `PAPER CATALOG`, `repair ticket ledger`, `patina material register` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/vintage` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title line count `1`.
- Browser QA: `/en/styles` desktop card에서 `Vintage`, `PAPER CATALOG` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/vintage/after/desktop.png`, `output/playwright/per-style-review/vintage/after/mobile.png`, `output/playwright/per-style-review/vintage/after/styles-list.png`.
- 다음 style은 `seventies-retro`이다.

## 20. seventies-retro

### 현재 판정

- Status: `verified`.
- Before screenshots: `output/playwright/per-style-review/seventies-retro/before/desktop.png`, `output/playwright/per-style-review/seventies-retro/before/mobile.png`.
- 기존 샘플은 따뜻한 색, 둥근 카드, Houseplant식 상품 방향은 보였지만, 70s 소재감과 campaign/story 구조가 약했다.
- `retro`와 구분하려면 broadcast shop이나 decade dial이 아니라 wavy shelf, groovy hero, corduroy/walnut/amber 소재 신호가 중심이어야 한다.
- `vintage`와 구분하려면 aged paper catalog와 repair ledger가 아니라 따뜻한 곡선, 아치형 제품 카드, lifestyle commerce가 먼저 보여야 한다.
- `mid-century-modern`과 구분하려면 정제된 furniture catalog보다 더 둥글고 느긋한 70s campaign rhythm이 보여야 한다.
- 현재 moodboard는 wavy stripe, corduroy, walnut, amber plastic, rounded product-card studies가 충분해 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- Houseplant: collection navigation, product carousel rhythm, warm object commerce, story module.
- Rolling Stone: music/culture magazine identity and bold editorial hierarchy for 70s cultural energy.
- Web Design Museum: historical/period interpretation cues and old interface rhythm.

### 목표

- 샘플 고유 마커: `GROOVY LANDING`, `wavy campaign shelf`, `corduroy product rhythm`.
- 정보 구조: groovy landing nav -> wavy hero campaign -> rounded campaign shelf -> corduroy/walnut/amber product rhythm -> lounge/story image -> material chips.
- 시각 처리: mustard/orange base, avocado accent, rounded arch cards, wave pattern, sunburst disk, corduroy/walnut/amber material labels.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/seventies-retro` desktop/mobile marker presence, horizontal overflow `0`, detail title line count `1`.
- `/en/styles` card에서 `70s Retro`, `GROOVY LANDING` marker 확인.

### 구현 및 검증 결과

- `SeventiesGroovyLanding`을 단순 hero + product cards에서 groovy campaign landing으로 재구성했다.
- Houseplant식 collection/product/story 흐름을 `wavy campaign shelf`와 arched product rhythm으로 번역했다.
- moodboard의 corduroy, walnut, amber material signal을 `corduroy product rhythm`과 material chip footer로 화면에 노출했다.
- Rolling Stone식 문화/음악 느낌은 `Records`, `side A`, `weekend soul` 같은 magazine/music labels로 과하지 않게 반영했다.
- `retro`의 broadcast shop, `vintage`의 paper catalog, `80s Retro`의 neon console과 겹치지 않도록 따뜻한 곡선/소재/느긋한 commerce rhythm을 중심으로 뒀다.
- `designStyles.ts`와 `scripts/style-references.json`의 seventies-retro 설명을 새 화면 문법에 맞게 보강했다.
- RED: `npm run check:style-distinction`가 `GROOVY LANDING`, `wavy campaign shelf`, `corduroy product rhythm` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/seventies-retro` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title line count `1`.
- Browser QA: `/en/styles` desktop card에서 `70s Retro`, `GROOVY LANDING` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/seventies-retro/after/desktop.png`, `output/playwright/per-style-review/seventies-retro/after/mobile.png`, `output/playwright/per-style-review/seventies-retro/after/styles-list.png`.
- 다음 style은 `eighties-retro`이다.

## 21. eighties-retro

### 현재 판정

- Status: `verified`.
- Before screenshots: `output/playwright/per-style-review/eighties-retro/before/desktop.png`, `output/playwright/per-style-review/eighties-retro/before/mobile.png`.
- 기존 샘플은 네온 그리드, retro sun, EQ 패널은 있었지만, `80s Retro`만의 웹 구조가 hero + 작은 EQ에 머물러 제목을 가리면 generic dark neon sample로 읽힐 위험이 있었다.
- `seventies-retro`와 구분하려면 따뜻한 곡선/제품 리듬이 아니라 야간 미디어 콘솔, VHS 큐, 아케이드 버튼이 중심이어야 한다.
- `nineties-graphic`과 구분하려면 초기 웹 창/스티커/패턴보다 더 정돈된 synth media deck과 grid perspective가 보여야 한다.
- `y2k`와 구분하려면 glossy bubble/plastic portal이 아니라 검은 플라스틱 status bay와 각진 neon console이 먼저 보여야 한다.
- 현재 moodboard는 neon grid, VHS, glossy black plastic, magenta/cyan acetate, chrome chips가 충분해 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- Poolside/Poolsuite: retro music station, Classic Mac/old device interaction, channel queue, bitmapped nostalgia, playful media controls.
- Cyberpunk 2077 official: dark campaign hierarchy, high-contrast digital modules, product/news/newsletter CTA rhythm. 단, Night City worldbuilding은 `cyberpunk`로 남긴다.
- Windows 93: retro OS/window framing, pixel controls, playful desktop-web interaction. 단, 90s chaotic desktop density는 `nineties-graphic`으로 남긴다.

### 목표

- 샘플 고유 마커: `SYNTH CONSOLE`, `VHS mix queue`, `arcade control strip`.
- 정보 구조: SYNTH CONSOLE nav -> night-drive media deck -> VHS mix queue -> black plastic status bay -> arcade control strip.
- 시각 처리: dark navy/black base, magenta/cyan/yellow neon, skewed grid floor, mono labels, square borders, VHS cassette rows, physical arcade buttons.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/eighties-retro` desktop/mobile marker presence, horizontal overflow `0`, detail title line count `1`.
- `/en/styles` card에서 `80s Retro`, `SYNTH CONSOLE` marker 확인.

### 구현 및 검증 결과

- `EightiesSynthConsole`을 단순 neon hero + EQ 패널에서 synth-era media console web sample로 재구성했다.
- Poolside/Poolsuite의 retro music station/channel interaction을 `VHS mix queue`와 night-drive deck으로 번역했다.
- Cyberpunk 2077식 dark campaign contrast는 빌려오되, 도시/디스토피아가 아니라 neon console과 product/news module 같은 어두운 정보 패널 리듬만 반영했다.
- Windows 93의 retro desktop/window cue는 작은 boxed nav, pixel-like control rows, square border로만 반영하고 90s chaotic window stack은 피했다.
- moodboard의 검은 플라스틱, VHS, neon grid, magenta/cyan acetate를 `black plastic status bay`, skewed grid floor, arcade control strip으로 화면에 노출했다.
- `designStyles.ts`, `scripts/style-references.json`, `style-category-distinction-table.md`의 eighties-retro 설명을 새 화면 문법에 맞게 보강했다.
- RED: `npm run check:style-distinction`가 `SYNTH CONSOLE`, `arcade control strip`, `VHS mix queue` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/eighties-retro` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title line count `1`.
- Browser QA: `/en/styles` desktop card에서 `80s Retro`, `SYNTH CONSOLE` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/eighties-retro/after/desktop.png`, `output/playwright/per-style-review/eighties-retro/after/mobile.png`, `output/playwright/per-style-review/eighties-retro/after/styles-list.png`.
- 다음 style은 `nineties-graphic`이다.

## 22. nineties-graphic

### 현재 판정

- Status: `verified`.
- Before screenshots: `output/playwright/per-style-review/nineties-graphic/before/desktop.png`, `output/playwright/per-style-review/nineties-graphic/before/mobile.png`.
- 기존 샘플은 1996 Space Jam식 별 배경과 행성 링크를 거의 그대로 떠올리게 해서, 레퍼런스를 웹 문법으로 추출하기보다 특정 사이트를 재현하는 쪽에 가까웠다.
- `eighties-retro`와 구분하려면 neon synth grid나 미디어 콘솔이 아니라 밝은 초기 웹 창, 스티커 링크, 하프톤/체커보드 그래픽이 중심이어야 한다.
- `y2k`와 구분하려면 glossy bubble/chrome portal이 아니라 거칠고 납작한 zine window, 찢어진 종이, visitor counter가 먼저 보여야 한다.
- `street-campaign`과 구분하려면 현대 스트리트 포스터/드롭이 아니라 90s browser frame 안의 early-web campaign navigation이어야 한다.
- 현재 moodboard는 checkerboard, halftone, photocopy grain, torn arrows, saturated chips, plastic folder scraps가 충분해 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- Space Jam 1996: image-heavy navigation, odd destination labels, site-map rhythm, early entertainment web composition. 단, 행성/캐릭터/사이트 구조는 그대로 복제하지 않는다.
- Web Design Museum 90s exhibition: 1990s web archive density, old website galleries, historical browser-era UI evidence.
- Netscape Navigator 2.0 / Windows 93: browser/window chrome, pixel-era controls, playful desktop framing. 단, Y2K chrome gloss나 80s neon은 제외한다.

### 목표

- 샘플 고유 마커: `DESKTOP ZINE`, `sticker link grid`, `halftone scrap wall`.
- 정보 구조: DESKTOP ZINE browser frame -> campaign ticker -> halftone scrap wall hero -> sticker link grid -> browser scraps -> visitor/webring footer.
- 시각 처리: teal base, violet title bar, acid yellow sticker panel, orange/violet/cyan scraps, black halftone wall, thick 3px borders, checkerboard background.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/nineties-graphic` desktop/mobile marker presence, horizontal overflow `0`, detail title line count `1`.
- `/en/styles` card에서 `90s Graphic`, `DESKTOP ZINE` marker 확인.

### 구현 및 검증 결과

- `NinetiesGraphicZine`을 Space Jam식 행성 링크 화면에서 90s early-web zine campaign sample로 재구성했다.
- Space Jam의 image-heavy navigation과 사이트맵 리듬은 `sticker link grid`로 번역했고, 특정 행성/영화 사이트 복제는 제거했다.
- Web Design Museum의 90s archive/browser-era 문법은 `DESKTOP ZINE` 창, ticker, visitor counter, webring footer로 반영했다.
- moodboard의 하프톤, 체크보드, 찢어진 종이, 플라스틱 스크랩은 `halftone scrap wall`, checkerboard background, torn sticker shapes로 화면에 노출했다.
- `designStyles.ts`, `scripts/style-references.json`, `style-category-distinction-table.md`의 nineties-graphic 설명을 새 화면 문법에 맞게 보강했다.
- RED: `npm run check:style-distinction`가 `DESKTOP ZINE`, `sticker link grid`, `halftone scrap wall` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/nineties-graphic` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title line count `1`.
- Browser QA: `/en/styles` desktop card에서 `90s Graphic`, `DESKTOP ZINE` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/nineties-graphic/after/desktop.png`, `output/playwright/per-style-review/nineties-graphic/after/mobile.png`, `output/playwright/per-style-review/nineties-graphic/after/styles-list.png`.
- 다음 style은 `y2k`이다.

## 23. y2k

### 현재 판정

- Status: `verified`.
- Before screenshots: `output/playwright/per-style-review/y2k/before/desktop.png`, `output/playwright/per-style-review/y2k/before/mobile.png`.
- 기존 샘플은 glossy/pastel 표면은 있었지만 `Thank u! See u soon!` 중심의 단일 coming-soon 카드라 포털, 프로필, 위젯, 게스트북 같은 Y2K 웹 문법이 약했다.
- `nineties-graphic`과 구분하려면 거친 DESKTOP ZINE, 스티커 링크, 하프톤 벽이 아니라 반짝이고 둥근 포털 위젯과 젤리 캡슐 도크가 중심이어야 한다.
- `chromecore`와 구분하려면 molded silver hardware나 금속 제품 스테이지가 아니라 pastel cyber gloss, profile skin, glitter portal이 중심이어야 한다.
- `retro-futurism`과 구분하려면 space-age travel poster가 아니라 early-2000s profile portal과 bubble widgets가 실제 화면 구조가 되어야 한다.
- 현재 moodboard는 chrome jelly plastic, capsule UI, pearly surfaces, holographic chips, translucent acetate가 충분해 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- Web Design Museum Y2K: translucent, iridescent, playful, shiny surfaces, Flash-era/y2k portal examples.
- Blingee/Glitter Graphics 계열: glitter graphics, stamps, profile customization, guestbook/social sharing culture.
- Windows 93: legacy desktop/window framing and playful app-like web surfaces. 단, 90s chaotic desktop은 `nineties-graphic`으로 남긴다.

### 목표

- 샘플 고유 마커: `GLOSS PORTAL`, `bubble widget stack`, `sparkle guestbook rail`.
- 정보 구조: GLOSS PORTAL header -> cyberpop profile hub -> bubble widget stack -> sparkle guestbook rail -> jelly capsule dock.
- 시각 처리: pearl/ice blue base, bubblegum pink and lime accents, translucent rounded panels, glossy capsule buttons, subtle sparkle texture, soft chrome edge highlights.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/y2k` desktop/mobile marker presence, horizontal overflow `0`, detail title line count `1`.
- `/en/styles` card에서 `Y2K`, `GLOSS PORTAL` marker 확인.

### 구현 및 검증 결과

- `Y2KGlossPortal`을 단일 coming-soon card에서 early-2000s profile portal sample로 재구성했다.
- Web Design Museum의 translucent/iridescent/playful/shiny 문법을 rounded portal frame, pearl surface, bubble widgets로 번역했다.
- Blingee/Glitter Graphics 계열의 profile customization과 stamp/guestbook 문법은 `sparkle guestbook rail`, `profile skin`, `glitter code`로 반영했다.
- Windows 93의 playful app framing은 header/status/dock 구조로만 반영하고, 90s desktop chaos는 피했다.
- moodboard의 젤리 플라스틱, 캡슐 카드, 홀로그래픽 칩, 파스텔 아세테이트를 `bubble widget stack`, `jelly capsule dock`, translucent gloss로 화면에 노출했다.
- `designStyles.ts`, `scripts/style-references.json`, `style-category-distinction-table.md`의 y2k 설명을 새 화면 문법에 맞게 보강했다.
- RED: `npm run check:style-distinction`가 `GLOSS PORTAL`, `bubble widget stack`, `sparkle guestbook rail` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/y2k` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title line count `1`.
- Browser QA: `/en/styles` desktop card에서 `Y2K`, `GLOSS PORTAL` 존재, horizontal overflow `0`.
- Screenshots: `output/playwright/per-style-review/y2k/after/desktop.png`, `output/playwright/per-style-review/y2k/after/mobile.png`, `output/playwright/per-style-review/y2k/after/styles-list.png`.
- 다음 style은 `retro-futurism`이다.

## 24. retro-futurism

### 현재 판정

- Status: `verified`.
- Before screenshots: `output/playwright/per-style-review/retro-futurism/before/desktop.png`, `output/playwright/per-style-review/retro-futurism/before/mobile.png`.
- 기존 샘플은 Space Age travel card와 ticket CTA는 있었지만, `FLIGHT DECK` 자체가 보이지 않았고 JPL식 destination poster gallery, moodboard의 chrome/aluminum/acrylic capsule hardware, 실제 timetable UI가 약했다.
- `y2k`와 구분하려면 jelly gloss, profile portal, bubble widgets가 아니라 cream poster surface, travel bureau, capsule hardware가 중심이어야 한다.
- `eighties-retro`와 구분하려면 dark synth/VHS console이 아니라 밝은 travel poster와 rounded Space Age timetable이어야 한다.
- `futurism`과 구분하려면 live telemetry나 high-speed aerospace dashboard가 아니라 past-imagined space tourism과 optimistic poster CTA가 중심이어야 한다.
- 현재 moodboard는 space-age architecture crops, vintage control panels, chrome/aluminum, acrylic domes, orbit-line shapes가 충분해 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- NASA JPL Visions of the Future: destination poster gallery, travel bureau framing, named planetary stops, science-backed imaginative tourism.
- Paleofuture: past visions archive feed, historical future narrative, blog/archive cadence.
- Web Design Museum: old-web archive navigation and historical digital index structure.
- retro-futurism.com: 현재 password page라 visual grammar source로 사용하지 않는다.

### 목표

- 샘플 고유 마커: `FLIGHT DECK`, `destination poster rail`, `chrome capsule timetable`.
- 정보 구조: travel bureau header -> FLIGHT DECK poster landing -> destination poster rail -> chrome capsule timetable -> reserve passage CTA.
- 시각 처리: cream poster surface, tomato/coral and teal destination chips, navy ink, atomic starburst, orbit-line composition, chrome/aluminum/acrylic material rail.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/retro-futurism` desktop/mobile marker presence, horizontal overflow `0`, detail title line count `1`.
- `/en/styles?q=retro%20futurism` card에서 `Retro Futurism`, `FLIGHT DECK`, `destination poster rail`, `chrome capsule timetable` marker 확인.

### 구현 및 검증 결과

- `RetroFuturismFlightDeck`을 단순 Grand Tour card에서 Space Age travel bureau web sample로 재구성했다.
- JPL의 destination poster gallery와 travel bureau 문법은 `FLIGHT DECK` poster landing, destination cards, reserve passage CTA로 번역했다.
- Paleofuture와 Web Design Museum의 archive/history 문법은 footer source rail과 old-future travel index rhythm으로 반영했다.
- moodboard의 chrome, aluminum, acrylic dome, orbit-line, capsule module 신호를 `chrome capsule timetable`, orbit display, material rail로 화면에 노출했다.
- `designStyles.ts`, `scripts/style-references.json`, `style-category-distinction-table.md`의 retro-futurism 설명을 새 화면 문법에 맞게 보강했다.
- RED: `npm run check:style-distinction`가 `FLIGHT DECK`, `destination poster rail`, `chrome capsule timetable` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/retro-futurism` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title line count `1`.
- Browser QA: `/en/styles?q=retro%20futurism` desktop card에서 `Retro Futurism`과 세 marker 모두 존재, horizontal overflow `0`.
- Final commands: `npm run check:data`, `npm run check:style-refs`, `npm run check:style-distinction`, `npm run lint`, `npm run build` 모두 통과. Next.js static pages `580/580`.
- Screenshots: `output/playwright/per-style-review/retro-futurism/after/desktop.png`, `output/playwright/per-style-review/retro-futurism/after/mobile.png`, `output/playwright/per-style-review/retro-futurism/after/styles-list.png`.
- 다음 style은 `mid-century-modern`이다.

## 25. mid-century-modern

### 현재 판정

- Status: `verified`.
- Before screenshots: `output/playwright/per-style-review/mid-century-modern/before/desktop.png`, `output/playwright/per-style-review/mid-century-modern/before/mobile.png`.
- 기존 detail 샘플은 가구 쇼룸 물성이 이미 있었지만, compact/card 상태는 상단 hero 이미지와 넓은 빈 베이지 영역에 그쳐 목록에서 구분력이 약했다.
- `seventies-retro`와 구분하려면 groovy campaign shelf나 corduroy rhythm이 아니라 가구 쇼룸, 월넛 슬랫, 유리 테이블, textile swatch가 중심이어야 한다.
- `retro-futurism`과 구분하려면 Space Age poster나 capsule timetable이 아니라 실제 furniture product catalog와 material rail이어야 한다.
- `bauhaus`와 구분하려면 primary geometry poster가 아니라 생활감 있는 molded plywood, walnut, textile, object label 구조여야 한다.
- 현재 moodboard는 walnut, interior product proofs, modular commerce grid, woven/boucle swatches, brass, muted chips가 충분해 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- MoMA Eames Lounge Chair: object record, material metadata, molded plywood/leather/cast aluminum object identity.
- Herman Miller Nelson Platform Bench: product overview, spec/resource tabs, slat detail, practical product storytelling.
- MoMA Noguchi Coffee Table: collection record and sculptural glass/wood object framing.
- Vitra Design Museum Alexander Girard: textiles, coordinated interiors, color/pattern archive, design universe framing.

### 목표

- 샘플 고유 마커: `MIDCENTURY STUDIO`, `walnut slat product rail`, `Girard textile swatch wall`.
- 정보 구조: MIDCENTURY STUDIO nav -> molded plywood lounge hero -> walnut slat product rail -> object list -> Girard textile swatch wall.
- 시각 처리: cream paper, walnut/espresso linework, tomato orange, deep teal, mustard textile blocks, furniture photography, thin catalog borders.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/mid-century-modern` desktop/mobile marker presence, horizontal overflow `0`, detail title stable 2-line wrap.
- `/en/styles?q=mid-century%20modern` card에서 `Mid-Century Modern`, `MIDCENTURY STUDIO`, `walnut slat product rail`, `Girard textile swatch wall` marker 확인.

### 구현 및 검증 결과

- `MidCenturyModernStudio`을 detail 전용 이미지 중심 샘플에서 compact/card까지 같은 catalog grammar를 공유하는 furniture showroom sample로 재구성했다.
- MoMA Eames object record는 molded plywood lounge hero와 material metadata로 번역했다.
- Herman Miller Nelson bench의 slat/product flow는 `walnut slat product rail`과 product list로 반영했다.
- Noguchi glass table과 Girard textile archive는 hero image crop, palette chips, `Girard textile swatch wall`로 화면에 노출했다.
- `designStyles.ts`, `scripts/style-references.json`, `style-category-distinction-table.md`의 mid-century-modern 설명을 새 화면 문법에 맞게 보강했다.
- RED: `npm run check:style-distinction`가 `MIDCENTURY STUDIO`, `walnut slat product rail`, `Girard textile swatch wall` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/mid-century-modern` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title은 긴 이름이라 안정적 2-line wrap.
- Browser QA: `/en/styles?q=mid-century%20modern` desktop card에서 `Mid-Century Modern`과 세 marker 모두 존재, horizontal overflow `0`.
- Final commands: `npm run check:data`, `npm run check:style-refs`, `npm run check:style-distinction`, `npm run lint`, `npm run build` 모두 통과. Next.js static pages `580/580`.
- Screenshots: `output/playwright/per-style-review/mid-century-modern/after/desktop.png`, `output/playwright/per-style-review/mid-century-modern/after/mobile.png`, `output/playwright/per-style-review/mid-century-modern/after/styles-list.png`.
- 다음 style은 `bauhaus`이다.

## 26. bauhaus

### 현재 판정

- Status: `verified`.
- Before screenshots: `output/playwright/per-style-review/bauhaus/before/desktop.png`, `output/playwright/per-style-review/bauhaus/before/mobile.png`.
- 기존 샘플은 원색 기하학 포스터처럼 보였지만 실제 학교, 워크숍, 아카이브, 프로그램 탐색 흐름이 약했다.
- `mid-century-modern`과 구분하려면 가구 쇼룸, walnut slat, textile swatch가 아니라 기본 조형 수업과 workshop method가 중심이어야 한다.
- `swiss-design`과 구분하려면 중립적 공공 정보 grid보다 원, 사각형, 삼각형, 원색, 교육 실험의 구조가 더 앞에 보여야 한다.
- `modernism`과 구분하려면 broad rational grid가 아니라 BAUHAUS SCHOOL이라는 institution과 shape lab 맥락이 보여야 한다.
- `posterism`과 구분하려면 한 문장짜리 벽보가 아니라 Visit, Join in, Discover, Research 같은 웹 탐색 모듈이 있어야 한다.
- 현재 moodboard는 primary shape cut-paper, strict grid proofs, black rule-line studies, workshop crops가 충분해 image gen 교체는 필요하지 않다.

### referenceSites에서 가져올 웹 문법

- Bauhaus-Archiv: Visit, Join in, Discover, Research로 이어지는 institution navigation, archive/object modules, functional hierarchy.
- Bauhaus Kooperation: modular archive navigation, black-white-primary contrast, rational cards, institution-scale object grid.
- Harvard Art Museums Bauhaus: archival object sequencing, spare metadata blocks, disciplined reading flow.

### 목표

- 샘플 고유 마커: `BAUHAUS SCHOOL`, `workshop method grid`, `circle square triangle lab`.
- 정보 구조: BAUHAUS SCHOOL header -> circle square triangle lab -> shape exercise grid -> workshop method grid -> Visit/Join in/Discover/Research cards.
- 시각 처리: off-white paper, black rule grid, primary red/blue/yellow, square corners, shape exercises, strict module density.

### 검증 계획

- `npm run check:style-distinction` RED 확인 후 GREEN.
- `/en/styles/bauhaus` desktop/mobile marker presence, horizontal overflow `0`, detail title line count `1`.
- `/en/styles?q=bauhaus` card에서 `Bauhaus`, `BAUHAUS SCHOOL`, `workshop method grid`, `circle square triangle lab` marker 확인.

### 구현 및 검증 결과

- `BauhausSchool`을 단순 geometry poster에서 institution/workshop sample로 재구성했다.
- Bauhaus-Archiv의 institution navigation은 Visit, Join in, Discover, Research 카드로 반영했다.
- Bauhaus Kooperation의 modular archive grammar는 black-rule `workshop method grid`와 shape exercise modules로 반영했다.
- Harvard Art Museums의 object sequencing은 spare metadata와 disciplined reading flow로 반영했다.
- `scripts/style-references.json`, `style-category-distinction-table.md`, `designStyles.ts`의 Bauhaus 설명을 새 화면 문법에 맞게 보강했다.
- RED: `npm run check:style-distinction`가 `BAUHAUS SCHOOL`, `workshop method grid`, `circle square triangle lab` 누락으로 실패함.
- GREEN: `npm run check:style-distinction` 통과.
- Browser QA: `/en/styles/bauhaus` desktop/mobile에서 세 marker 모두 존재, horizontal overflow `0`, detail title line count `1`.
- Browser QA: `/en/styles?q=bauhaus` desktop card에서 `Bauhaus`와 세 marker 모두 존재, horizontal overflow `0`.
- Final commands: `npm run check:data`, `npm run check:style-refs`, `npm run check:style-distinction`, `npm run lint`, `npm run build` 모두 통과. Next.js static pages `580/580`.
- Screenshots: `output/playwright/per-style-review/bauhaus/after/desktop.png`, `output/playwright/per-style-review/bauhaus/after/mobile.png`, `output/playwright/per-style-review/bauhaus/after/styles-list.png`.
- 다음 style은 `futurism`이다.

## 레트로 / 빈티지 category QA

Status: `verified` (2026-07-07)

- `/en/styles?category=레트로 / 빈티지` 필터 화면을 desktop(1280×900)·mobile(375×812)에서 확인.
- Desktop: 헤더 `009 SHOWN / 088 STYLES`, 사이드바 `Retro and Vintage 9` active, 카드 9개만 표시(retro, vintage, seventies-retro, eighties-retro, nineties-graphic, y2k, retro-futurism, mid-century-modern, bauhaus). horizontal overflow `0`.
- Mobile: 동일 9개 카드, horizontal overflow `0`.
- 각 카드가 고유 샘플 마커를 렌더(GROOVY LANDING / SYNTH CONSOLE · MIDNIGHT DRIVE / DESKTOP ZINE / BAUHAUS SCHOOL / MIDCENTURY STUDIO / RETRO BROADCAST SHOP / WORLDS FAIR TRAVEL BUREAU · FLIGHT DECK / ARCHIVE SUPPLY paper catalog / GLOSS PORTAL · Y2K), 잘림 없음.
- Screenshots: `output/playwright/category-review/retro-vintage/retro-vintage-desktop.png`, `.../retro-vintage-mobile.png`.
- 남은 의심점: 없음.
