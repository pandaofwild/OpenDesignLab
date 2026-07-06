# OpenDesignLab Style Sample Web Review Log

이 문서는 88개 디자인 스타일 샘플 웹을 한 번에 묶어 처리하지 않고, 하나씩 프로급 웹 샘플로 점검하고 개선하기 위한 작업대장이다.

## 진행 원칙

- 한 번에 하나의 style slug만 구현 변경한다.
- 각 style은 개선 전에 현재 샘플 화면, moodboard 신호, referenceSites의 웹 문법, 같은 category 안의 차이를 먼저 기록한다.
- 샘플 개선은 색상 변경만으로 인정하지 않는다. layout grammar, 정보 밀도, 카드 형태, 타이포 리듬, 장식 원리, 컴포넌트 구조 중 최소 3개 이상이 해당 style 정체성을 보여야 한다.
- 개선 후 desktop/mobile detail page를 확인하고, 가로 overflow와 텍스트 잘림을 검사한다.
- 다음 style로 넘어가기 전에 이 문서에 결과와 남은 의심점을 적는다. 의심점이 없으면 `남은 의심점: 없음`이라고 명시한다.

## 스타일별 기록 템플릿

각 스타일 섹션은 아래 5개 하위 섹션을 사용한다. (01-09번은 초기 7단 템플릿으로 작성되어 형식이 다르다. 아카이브에서 그대로 유지한다.)

1. `### 현재 판정` — status, before screenshots, 현재 샘플 문제, 인접 style과의 구분 조건.
2. `### referenceSites에서 가져올 웹 문법` — 레퍼런스별로 가져올 구조만 기록.
3. `### 목표` — 고유 마커 3개, 정보 구조, 시각 처리.
4. `### 검증 계획` — RED/GREEN 마커 체크, browser QA 대상.
5. `### 구현 및 검증 결과` — 변경 요약, RED/GREEN 결과, browser QA 결과, 명령 통과 여부, screenshots, 남은 의심점, 다음 style.

## 상태 값

- `queued`: 아직 개별 리뷰 전.
- `reviewing`: 레퍼런스/무드보드/현재 샘플을 보는 중.
- `implemented`: 샘플 코드 개선 완료.
- `verified`: check, lint/build, browser QA까지 완료.
- `needs-revisit`: 구현했지만 시각 QA가 약하거나 인접 style과 헷갈릴 위험이 남음.

## 전체 순회 큐

| No. | category | style slug | sampleType | status | 이번 패스에서 확인할 핵심 |
| ---: | --- | --- | --- | --- | --- |
| 01 | 모던 / 미니멀 | minimalism | minimal-editorial | verified | blank-space ratio, product-first composition, thin-rule material index |
| 02 | 모던 / 미니멀 | modernism | minimal-editorial | verified | rational grid, primary accents, functional geometry |
| 03 | 모던 / 미니멀 | swiss-design | magazine-layout | verified | baseline grid, red signal bars, objective typography |
| 04 | 모던 / 미니멀 | international-style | minimal-editorial | verified | universal signage modules, neutral information system |
| 05 | 모던 / 미니멀 | scandinavian | organic-brand | verified | bright Nordic product commerce, light wood, practical warmth |
| 06 | 모던 / 미니멀 | japandi | minimal-editorial | verified | low horizontal rhythm, muted wood, ceramic quietness |
| 07 | 모던 / 미니멀 | warm-minimal | minimal-editorial | verified | cream warmth, approachable premium product hierarchy |
| 08 | 모던 / 미니멀 | soft-minimal | minimal-editorial | verified | low contrast, gentle rounded UI, frosted paper softness |
| 09 | 모던 / 미니멀 | high-end-minimal | luxury-product | verified | gallery spacing, severe product crop, quiet luxury commerce |
| 10 | 강렬 / 실험 | brutalism | brutalist-poster | verified | exposed structure, raw blocks, hard poster energy |
| 11 | 강렬 / 실험 | new-brutalism | brutalist-poster | verified | native web controls, thick borders, raw app UI |
| 12 | 강렬 / 실험 | anti-design | magazine-layout | verified | broken convention, off-grid navigation, deliberate awkwardness |
| 13 | 강렬 / 실험 | maximalism | street-campaign | verified | dense layers, abundant pattern, overloaded discovery |
| 14 | 강렬 / 실험 | glitch-art | cyber-dashboard | verified | net-art error surface, ASCII rupture feed, codec forensics rail |
| 15 | 강렬 / 실험 | deconstructivism | brutalist-poster | verified | structural fault, fracture section index, displaced project axis |
| 16 | 강렬 / 실험 | avant-garde | magazine-layout | verified | manifesto program, critical lecture rail, art-into-life agenda |
| 17 | 강렬 / 실험 | postmodernism | retro-commerce | verified | classical quote, mixed-era object index, Memphis anti-functional shop |
| 18 | 레트로 / 빈티지 | retro | retro-commerce | verified | retro broadcast shop, time-travel media dial, analog merch queue |
| 19 | 레트로 / 빈티지 | vintage | retro-commerce | verified | paper catalog, repair ticket ledger, patina material register |
| 20 | 레트로 / 빈티지 | seventies-retro | retro-commerce | verified | groovy landing, wavy campaign shelf, corduroy product rhythm |
| 21 | 레트로 / 빈티지 | eighties-retro | cyber-dashboard | verified | synth console, VHS mix queue, arcade control strip |
| 22 | 레트로 / 빈티지 | nineties-graphic | street-campaign | verified | DESKTOP ZINE, sticker link grid, halftone scrap wall |
| 23 | 레트로 / 빈티지 | y2k | cyber-dashboard | verified | GLOSS PORTAL, bubble widget stack, sparkle guestbook rail |
| 24 | 레트로 / 빈티지 | retro-futurism | retro-commerce | verified | FLIGHT DECK, destination poster rail, chrome capsule timetable |
| 25 | 레트로 / 빈티지 | mid-century-modern | minimal-editorial | verified | MIDCENTURY STUDIO, walnut slat product rail, Girard textile swatch wall |
| 26 | 레트로 / 빈티지 | bauhaus | magazine-layout | verified | BAUHAUS SCHOOL, workshop method grid, circle square triangle lab |
| 27 | 미래 / 디지털 | futurism | cyber-dashboard | queued | speed, forward motion, aerodynamic information flow |
| 28 | 미래 / 디지털 | cyberpunk | cyber-dashboard | queued | night-market city, commerce, neon worldbuilding |
| 29 | 미래 / 디지털 | neon-noir | cyber-dashboard | queued | cinematic dark, noir contrast, restrained neon |
| 30 | 미래 / 디지털 | techwear | cyber-dashboard | queued | modular gear, tactical panels, fabric/strap logic |
| 31 | 미래 / 디지털 | high-tech | saas-landing | queued | precision instrumentation, engineering surfaces |
| 32 | 미래 / 디지털 | ai-aesthetic | saas-landing | queued | model workspace, generated system artifacts, calm intelligence |
| 33 | 미래 / 디지털 | hologram-style | cyber-dashboard | queued | translucent spectral layers, prism depth, not chrome |
| 34 | 미래 / 디지털 | chromecore | luxury-product | queued | reflective Y2K metal, molded hardware, specular flash |
| 35 | 미래 / 디지털 | metaverse-style | cyber-dashboard | queued | spatial avatar/world UI, virtual economy, 3D scene logic |
| 36 | 럭셔리 / 클래식 | classic | luxury-product | queued | symmetrical heritage, serif restraint, traditional trust |
| 37 | 럭셔리 / 클래식 | neoclassic | luxury-product | queued | columns, museum spacing, disciplined ornament |
| 38 | 럭셔리 / 클래식 | luxury | luxury-product | queued | premium product reveal, rich material, controlled opulence |
| 39 | 럭셔리 / 클래식 | old-money | luxury-product | queued | understated heritage, club tone, quiet affluence |
| 40 | 럭셔리 / 클래식 | art-deco | luxury-product | queued | stepped geometry, metallic rhythm, deco symmetry |
| 41 | 럭셔리 / 클래식 | art-nouveau | organic-brand | queued | flowing botanical line, ornamental frame, organic luxury |
| 42 | 럭셔리 / 클래식 | baroque | luxury-product | queued | dramatic ornament, theatrical depth, heavy composition |
| 43 | 럭셔리 / 클래식 | rococo | luxury-product | queued | pastel shell curves, playful ornament, salon delicacy |
| 44 | 럭셔리 / 클래식 | gothic | street-campaign | queued | vertical stone, pointed arches, dark ecclesiastical rhythm |
| 45 | 자연 / 수공예 | organic-design | organic-brand | queued | biomorphic forms, earthy product system, rounded nature logic |
| 46 | 자연 / 수공예 | natural | organic-brand | queued | landscape material, earth palette, broad outdoor calm |
| 47 | 자연 / 수공예 | botanical | organic-brand | queued | leaf detail, herbarium structure, plant-specific grid |
| 48 | 자연 / 수공예 | eco-design | organic-brand | queued | circular system, recycled materials, trust hierarchy |
| 49 | 자연 / 수공예 | rustic | organic-brand | queued | rough local material, weathered wood, hospitality warmth |
| 50 | 자연 / 수공예 | kinfolk | minimal-editorial | queued | slow lifestyle editorial, linen, natural-light commerce |
| 51 | 자연 / 수공예 | handmade | organic-brand | queued | small-batch irregularity, thread, torn paper, maker shop |
| 52 | 자연 / 수공예 | craft | organic-brand | queued | workshop process, durable material skill, methodical craft |
| 53 | 자연 / 수공예 | wabi-sabi | minimal-editorial | queued | patina, asymmetry, raw surfaces, contemplative spacing |
| 54 | 귀여움 / 캐주얼 | kitsch | kawaii-app | queued | intentionally tacky mix, souvenir color, awkward charm |
| 55 | 귀여움 / 캐주얼 | kawaii | kawaii-app | queued | mascot softness, sticker UI, cute product flow |
| 56 | 귀여움 / 캐주얼 | dopamine-design | kawaii-app | queued | bright reward loops, energetic color therapy |
| 57 | 귀여움 / 캐주얼 | pop-art | street-campaign | queued | comic commercial punch, halftone, bold commodity rhythm |
| 58 | 귀여움 / 캐주얼 | comic-book-style | kawaii-app | queued | panels, speech blocks, action hierarchy |
| 59 | 귀여움 / 캐주얼 | toy-design | kawaii-app | queued | molded plastic, toy shelf, playful product object |
| 60 | 귀여움 / 캐주얼 | playful-design | kawaii-app | queued | friendly motion, asymmetric fun, approachable app UI |
| 61 | 귀여움 / 캐주얼 | pastel-style | kawaii-app | queued | pale soft palette, airy cute restraint, no generic candy overload |
| 62 | 귀여움 / 캐주얼 | bubble-design | kawaii-app | queued | inflated shapes, bubble volume, soft rounded depth |
| 63 | 스트리트 / 서브컬처 | streetwear | street-campaign | queued | drop commerce, label blocks, product wall |
| 64 | 스트리트 / 서브컬처 | graffiti | street-campaign | verified | WALLDEX 스트리트아트 문서화 UI. 캐노니컬 5 trait 라벨(Graffiti wall scanner/Wall tag index/Spray color rack/Mural route map/Crew tag archive) 반영, check 마커 통과. full/compact QA·lint 통과 |
| 65 | 스트리트 / 서브컬처 | hiphop-style | street-campaign | verified | Black & Gold Album Studio 리디자인: 전용 팔레트+토큰, 스튜디오 히어로 이미지, 5 trait 전부. full/compact QA·lint·street-subculture 마커 통과 |
| 66 | 스트리트 / 서브컬처 | skate-culture | street-campaign | queued | deck catalog, spot map, sticker scrape |
| 67 | 스트리트 / 서브컬처 | punk | street-campaign | queued | zine aggression, torn paper, anti-authority UI |
| 68 | 스트리트 / 서브컬처 | grunge | street-campaign | queued | distressed texture, muted dirt, rough band archive |
| 69 | 스트리트 / 서브컬처 | indie-sleaze | street-campaign | verified | 실제 플래시 파티 사진 히어로(codex image gen) 추가: 중앙 FLASH FEED·디스포저블 카메라 그리드·미러 플래시 스택을 실제 사진 크롭으로 교체. 네온 팔레트·5 trait·구조 마커 유지, full/compact QA·lint·check 통과 |
| 70 | 스트리트 / 서브컬처 | rave-style | cyber-dashboard | queued | event energy, laser color, club schedule system |
| 71 | 스트리트 / 서브컬처 | lo-fi | retro-commerce | queued | low-resolution warmth, tape hiss, quiet analog UI |
| 72 | 편집 / 타이포그래피 | typography-focused | magazine-layout | queued | type scale specimen, baseline rhythm, font pairing shelf |
| 73 | 편집 / 타이포그래피 | editorial-design | magazine-layout | queued | longform article desk, pull quote, photo essay stack |
| 74 | 편집 / 타이포그래피 | magazine-style | magazine-layout | queued | issue browser, cover wall, department navigation |
| 75 | 편집 / 타이포그래피 | posterism | brutalist-poster | queued | single-message poster wall, campaign impact |
| 76 | 편집 / 타이포그래피 | grid-system | magazine-layout | queued | column ruler, module matrix, layout method |
| 77 | 편집 / 타이포그래피 | collage | magazine-layout | queued | cut paper desk, tape layers, mixed media |
| 78 | 편집 / 타이포그래피 | photomontage | magazine-layout | queued | photo collision, masks, campaign narrative |
| 79 | 편집 / 타이포그래피 | experimental-type | brutalist-poster | queued | glyph mutation, variable forms, type as material |
| 80 | 편집 / 타이포그래피 | newspaper-style | magazine-layout | queued | masthead, headline stack, dense columns |
| 81 | UI / 웹 | flat-design | saas-landing | queued | solid fill modules, no-depth buttons, simple icon logic |
| 82 | UI / 웹 | material-design | saas-landing | queued | elevation stack, state layers, component physics |
| 83 | UI / 웹 | neumorphism | saas-landing | queued | inset controls, double shadow, tone-on-tone tactile UI |
| 84 | UI / 웹 | glassmorphism | saas-landing | queued | frosted cards, blur depth, translucent layering |
| 85 | UI / 웹 | claymorphism | kawaii-app | queued | puffy 3D modules, pastel extrusion, playful app commerce |
| 86 | UI / 웹 | dark-mode-design | cyber-dashboard | queued | readable dark ops, contrast ladder, focus states |
| 87 | UI / 웹 | saas-style | saas-landing | queued | operations home, product proof grid, pricing matrix |
| 88 | UI / 웹 | startup-landing-page | saas-landing | queued | conversion story, hero CTA ladder, funnel sequence |

## 완료 카테고리 상세 기록 아카이브

완료된 카테고리의 스타일별 상세 기록은 파일 크기 관리를 위해 분리했다. 이 파일에는 진행 중 카테고리의 상세 기록만 남긴다.

| Category | Archive file |
| --- | --- |
| 모던 / 미니멀 (01-09) | `docs/review-log-archive/modern-minimal.md` |
| 강렬 / 실험 (10-17) | `docs/review-log-archive/intense-experimental.md` |
| 레트로 / 빈티지 (18-26) | `docs/review-log-archive/retro-vintage.md` |

카테고리가 완료되면(스타일 전부 verified + category QA verified) 해당 상세 섹션을 새 아카이브 파일로 옮기고 이 표에 행을 추가한다.

## 미해결 category QA

`모던 / 미니멀`은 category QA까지 verified다(아카이브 참고). 아래 두 카테고리는 스타일별 검증은 끝났지만 카테고리 필터 화면 QA 기록이 없으므로, `futurism` 구현을 시작하기 전에 먼저 수행하고 결과를 해당 아카이브 파일에 기록한다.

### 강렬 / 실험 category QA

Status: `queued`

- `/en/styles?category=<강렬/실험 filter>` desktop/mobile에서 8개 card만 표시되는지 확인.
- 8개 style marker 존재와 horizontal overflow `0` 확인.
- Screenshots: `output/playwright/category-review/intense-experimental/`.

### 레트로 / 빈티지 category QA

Status: `queued`

- `/en/styles?category=<레트로/빈티지 filter>` desktop/mobile에서 9개 card만 표시되는지 확인.
- 9개 style marker 존재와 horizontal overflow `0` 확인.
- Screenshots: `output/playwright/category-review/retro-vintage/`.

## 진행 중 카테고리: 미래 / 디지털

다음 스타일: No. 27, `futurism`. 스타일별 상세 기록은 아래에 작성한다.
