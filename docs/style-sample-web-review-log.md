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
| 54 | 귀여움 / 캐주얼 | kitsch | kawaii-app | verified | ban.do/Lisa Says Gah/Lazy Oaf식 '노벨티 부티크 스토어프론트' 재설계: 마퀴+Clash Cart 내비, 히어로(실사 크롭+★ODD SHOP DROP 뱃지·LIMITED ODDITIES 헤드라인·SHOP THE DROP) | giftable product finder(for/vibe/budget 칩·find my oddity·18 matches) 분할, odd object cards 상품 월(스마일머그·체커토트·디스코볼·하트선글라스 실사 + 선버스트 sticker price bursts·NEW/HOT·컬러웨이 도트), clashing pattern strips/pattern clash rail(checker/dots/wavy/flame/gingham/zigzag CSS 프린트 스와치), drop countdown 바. 두꺼운 검정 테두리·하드 오프셋 그림자·남발 회전(촌스러움) 전부 제거하고 화이트 카드·헤어라인·정제 타입으로 규율, 시그니처는 선버스트 스티커+프린트 스와치 한 곳에 집중. 스토어프론트 골격으로 이웃 kawaii(수집 그리드)·dopamine(원형 대시보드)·bubble(수직 쇼)과 구조 차별화. 필수(ODD SHOP DROP/sticker price bursts/clashing pattern strips)+경험 마커(LIMITED ODDITIES/pattern clash rail/giftable product finder/drop countdown) 전부 충족. KitschPriceBurst 모듈 스코프 헬퍼로 lint 통과, 히어로 오버레이는 GeneratedStyleImageSurface children(z-10)로 전달해 surface gotcha 회피. full/compact QA(overflow 0)·lint·**check:cute-casual 카테고리 전체 통과(9/9)** |
| 55 | 귀여움 / 캐주얼 | kawaii | kawaii-app | verified | Sanrio/Pusheen식 'CHARACTER CLUB' 멤버십 대시보드 재설계: 멤버 배너(hi, mochi member!·하트 카운트·character mood ring) + mascot tiles 수집 그리드(실제 kawaii 이미지·collected/new 상태·4/6 수집) + heart badges 진행 + stamp rewards 카드 + shop tiny treats 라인. 수집-그리드 멤버십 골격으로 이웃 kitsch(테두리 노벨티 샵)·dopamine-design(원형 리워드 대시보드)와 구조 차별화. kawaii 필수(CHARACTER CLUB/mascot tiles/heart badges)+경험 마커(FRIEND CLUB DASHBOARD/character mood ring/stamp rewards/shop tiny treats) 전부 충족, Heart→KawaiiHeart 모듈 스코프 승격으로 lint 통과, full/compact QA(overflow 0)·kawaii 자체 assertion 통과. (카테고리 전체 check:cute-casual은 미구현 kitsch 형제 때문에 여전히 실패 — kawaii 자체는 통과) |
| 56 | 귀여움 / 캐주얼 | dopamine-design | kawaii-app | verified | 게임화 습관/스트릭 대시보드 재설계(Duolingo/Happy Socks 에너지): 무지개 conic COLOR REWARD LOOP + 궤도형 habit orbit 버블 + reward meter(XP) + color pulse cards + reward ladder(티어) + dopamine spectrum 바. 최대 채도 팔레트, 원형-진행 대시보드 골격으로 이웃 kawaii(이미지 카드)·pop-art(에디션 그리드)와 구조 차별화. dopamine 필수+경험 마커 전부 충족, full/compact QA(overflow 0)·lint 통과. (카테고리 전체 check:cute-casual은 kawaii 등 미완성 형제 스타일 때문에 여전히 실패 — dopamine 자체 assertion은 통과) |
| 57 | 귀여움 / 캐주얼 | pop-art | street-campaign | verified | Warhol/Haring/Guggenheim-Pop식 '시리얼 팝 월' 뮤지엄 에디션샵 재설계: 갤러리 마스트헤드(EDITION WALL·POP OBJECT ARCHIVE·museum shop wall) + object edition grid(Warhol Flowers식 반복 오브젝트 SVG를 컬러 순열로 4x2 배열 + Ben-Day halftone block 타일) + SERIAL POP WALL 잉크 플래카드 + museum shop 에디션 레일(flowers serigraph ed.250 $95·ben-day tote $38·soup can mug $24·pop pin ed.500 $12) + halftone caption rail(Ben-Day 도트+SHOP EDITIONS). 기존 프로토타입의 플랫 색블록+placeholder 라벨 제거, PopArtFlower SVG 헬퍼로 실크스크린 반복 오브젝트 구현. 볼드 플랫 컬러는 팝아트 본질로서 시리얼 월 한 곳에 집중, 레일·캡션은 화이트/헤어라인으로 규율. 갤러리-월 지배형 골격으로 이웃 kawaii(상품 수집 그리드)·kitsch(노벨티 스토어)·comic(패널 커버 셸프)과 구조 차별화. 필수(POP OBJECT ARCHIVE/halftone block/repeated object)+경험 마커(SERIAL POP WALL/museum shop wall/halftone caption rail/object edition grid) 전부 충족, full/compact QA(overflow 0)·lint·check:cute-casual(9/9) 통과 |
| 58 | 귀여움 / 캐주얼 | comic-book-style | kawaii-app | queued | panels, speech blocks, action hierarchy |
| 59 | 귀여움 / 캐주얼 | toy-design | kawaii-app | verified | LEGO/Play-Doh/Fisher-Price식 '모듈러 플레이셋 빌드 컨피규레이터' 재설계: 헤더(playset works·PLAYSET BUILDER·age range selector 3+/6+/9+ 청키 탭) + assembly tray 빌드 캔버스(페그보드 위 실제 플라스틱 브릭 디오라마 — 스터드/광택/그림자 브릭으로 지은 집(문·창문·박공지붕)+나무+조립 대기 loose 브릭+지붕에 끼워지는 브릭+스터드 베이스플레이트, 하늘 해·구름으로 박스아트 신, MODULAR PLAYSET SHOP 플래카드·pcs 스테퍼) + block parts 빈(2×2/1×4/2×3/1×2 브릭·수량) + build pattern chooser(house/rocket/car) + instruction rail(base/walls/roof/done 스텝+add set $39). 기존 프로토타입의 플랫 색블록 4개(촌스러움) 제거, ToyBrick SVG-free 글로시 브릭 헬퍼로 실물 조립 구현(초기 계단식 막대 스택은 '기이한 스택'으로 읽혀 한눈에 알아보는 집 디오라마로 교체). 컨피규레이터-워크스페이스 골격으로 모든 이웃(스토어/그리드/대시보드/쇼케이스/에디토리얼/앱/갤러리월)과 구조 차별화. 필수(PLAYSET BUILDER/block parts/assembly tray)+경험 마커(MODULAR PLAYSET SHOP/age range selector/instruction rail/build pattern chooser) 전부 충족, full/compact QA(overflow 0)·lint·check:cute-casual(9/9) 통과. **→ 귀여움/캐주얼 9개 스타일 전부 verified** |
| 60 | 귀여움 / 캐주얼 | playful-design | kawaii-app | verified | Duolingo/Headspace/Mailchimp식 '가이드 조이 플로우' 친근한 온보딩 앱 재설계: 앱 헤더(🌱 guide garden·day 3 +40xp) + 마스코트 코치 카드(PLAYFUL ONBOARD·guided joy flow·스프라우트 캐릭터 SVG·speech bubble mascot walkthrough) + soft progress path 4노드 스텝퍼(done/active/todo) + gentle task cards/task completion stack 세로 체크리스트(pick focus·meet guide·2-min step·reminder, done/resume/+15xp 상태) + continue CTA. 기존 프로토타입의 클립아트 원형 마스코트·플랫 색블록 4개(촌스러움) 제거, PlayfulMascot SVG 헬퍼로 캐릭터 정성 렌더+정제된 소프트 팔레트(coral/mint/butter/periwinkle)·화이트 카드. 세로 앱 온보딩 피드 골격으로 이웃 kawaii(수집 그리드)·pastel(에디토리얼 이미지 밴드)·dopamine(원형 대시보드)·kitsch(노벨티 스토어)와 구조 차별화. 필수(PLAYFUL ONBOARD/mascot helper/gentle task cards)+경험 마커(GUIDED JOY FLOW/mascot walkthrough/task completion stack/soft progress path) 전부 충족, task stack justify-between으로 여백 균형, full/compact QA(overflow 0)·lint·check:cute-casual(9/9) 통과 |
| 61 | 귀여움 / 캐주얼 | pastel-style | kawaii-app | verified | Glossier/Bubble Skincare/Starface식 '파스텔 뷰티 에디토리얼' 재설계: 에디토리얼 마스트헤드(SOFT EDIT·Tint Journal·no.07 skin-tint season) + 와이드 저대비 히어로(파스텔 뷰티 실사 + PASTEL BEAUTY EDIT 세리프 마스트헤드) + shade story 스와치 레일(porcelain/blush/peach/mauve/lilac/mint·언더톤) + editorial product shelf 상품 4장(tint serum/cushion tube/cloud jar/cream pot 실사 크롭·shade·price) + airy product rows·low-contrast set 캡션 + skin tint planner 바(언더톤/피니시 칩·matched 06·find my tint). codex image gen으로 파스텔 뷰티 플랫레이 실사 신규 생성(scripts PROMPTS pastel-style 추가, GENERATED_STYLE_IMAGES 등록). 기존 프로토타입의 플랫 파스텔 알약 블록·추상 01/02/03 필·제네릭 스와치 스트립(촌스러움) 전부 제거, 이미지 지배형 풀폭 에디토리얼 밴드 골격으로 이웃 kitsch(밀도높은 노벨티 스토어)·kawaii(수집 그리드)·bubble(수직 캔 쇼)과 구조 차별화. 히어로 오버레이는 GeneratedStyleImageSurface children(z-10)로 전달. 필수(SOFT EDIT/airy product rows/low-contrast set)+경험 마커(PASTEL BEAUTY EDIT/shade story/skin tint planner/editorial product shelf) 전부 충족, full/compact QA(overflow 0)·lint·check:data·check:cute-casual(9/9) 통과 |
| 62 | 귀여움 / 캐주얼 | bubble-design | kawaii-app | verified | poppi/bubly식 '이펄베슨트 플레이버 랩' 재설계: 중앙 글로시 캔 히어로 + 궤도형 nutrition bubbles + 하단 flavor carousel(선택 링·dots)·liquid progress·can shelf 라인업. CSS 글로시 3D 캔/버블(사진 대신, bubble-design 본질). 세로 제품 쇼케이스 구성으로 이웃 playful(카드 그리드)·pastel(에어리 필 패널)과 구조 차별화. bubble 필수+경험 마커 전부 충족(BUBBLE FLOW/inflated capsules/liquid progress/EFFERVESCENT FLAVOR LAB/flavor carousel/nutrition bubbles/can shelf), full/compact QA(overflow 0)·lint 통과. (카테고리 전체 check:cute-casual은 kawaii/dopamine 등 미완성 형제 스타일 때문에 여전히 실패 — bubble 자체 assertion은 통과) |
| 63 | 스트리트 / 서브컬처 | streetwear | street-campaign | verified | 프리미엄 드롭 커머스 페이지 재설계(Supreme/Kith/Stussy식): 실제 리테일 컴포넌트 — 가먼트 사진 상품 월(가격·컬러웨이 도트·NEW/1of1/SOLD OUT 상태), 카운트다운 release clock, DROP LEDGER 스케줄, size run matrix(재고 셀), lookbook strip. 부티크 랙 히어로(codex image gen) 크롭을 상품 타일로 사용. 갤러리 화이트+레드 톤·리테일 상품-그리드 골격으로 이웃 graffiti(이미지 문서화)·기타 스트리트와 구조·톤 차별화. 5 trait 마커 유지, full/compact QA(overflow 0)·lint·check 통과 |
| 64 | 스트리트 / 서브컬처 | graffiti | street-campaign | verified | WALLDEX 스트리트아트 문서화 UI. 캐노니컬 5 trait 라벨(Graffiti wall scanner/Wall tag index/Spray color rack/Mural route map/Crew tag archive) 반영, check 마커 통과. full/compact QA·lint 통과 |
| 65 | 스트리트 / 서브컬처 | hiphop-style | street-campaign | verified | Black & Gold Album Studio 리디자인: 전용 팔레트+토큰, 스튜디오 히어로 이미지, 5 trait 전부. full/compact QA·lint·street-subculture 마커 통과 |
| 66 | 스트리트 / 서브컬처 | skate-culture | street-campaign | verified | 스팟 클립 플레이어 페이지 재설계(Berrics/Thrasher식): 실제 미디어-UI 컴포넌트 — 트랜스포트 컨트롤+스크러버 비디오 플레이어, 트릭 챕터 라인, 관련 클립 레일(실사 썸네일), SPOT CHECKLIST·덱 셋업·스티커 슬랩 사이드바. 콘크리트 그레이 톤+미디어-플레이어 골격으로 앞뒤 hiphop-style(다크 앨범 스틸)·punk(본페이퍼 신문)와 구조·톤 차별화. 페이키 스팟 히어로(codex image gen), 5 trait 마커 유지, full/compact QA(overflow 0)·lint·check 통과 |
| 67 | 스트리트 / 서브컬처 | punk | street-campaign | verified | 제록스 팬진 1면 재설계: 전용 종이 팔레트(잉크/블러드레드/애시드라임)+토큰 오버라이드, 랜섬노트 헤드라인, 배틀재킷 하프톤 히어로(codex image gen), 실제 멀티컬럼 신문 골격(리드/레코드리뷰/공연·패치·메일오더 사이드바). 앞뒤 skate(모듈그리드)·grunge(이미지분할)와 구조 차별화. 5 trait 마커 유지, full/compact QA(overflow 0)·lint·check 통과 |
| 68 | 스트리트 / 서브컬처 | grunge | street-campaign | queued | distressed texture, muted dirt, rough band archive |
| 69 | 스트리트 / 서브컬처 | indie-sleaze | street-campaign | verified | 실제 플래시 파티 사진 히어로(codex image gen) 추가: 중앙 FLASH FEED·디스포저블 카메라 그리드·미러 플래시 스택을 실제 사진 크롭으로 교체. 네온 팔레트·5 trait·구조 마커 유지, full/compact QA·lint·check 통과 |
| 70 | 스트리트 / 서브컬처 | rave-style | cyber-dashboard | verified | 웨어하우스 스테이지 타임테이블 재설계: Resident-Advisor식 시간×스테이지 매트릭스(4 스테이지·8 타임슬롯, 네온 set-block+bpm), 레이저 웨어하우스 히어로 밴드(codex image gen)·사운드 미터·티켓 티어·on-air 타일. 앞뒤 indie-sleaze(이미지 히어로 분할)·lo-fi(이미지+플로팅 글래스)와 구조 차별화(UI 매트릭스 지배형). 5 trait 마커 유지, 구조 마커 갱신, full/compact QA(overflow 0)·lint·check 통과 |
| 71 | 스트리트 / 서브컬처 | lo-fi | retro-commerce | verified | 이미지 지배형 '스터디 세션' 재설계: 아늑한 리스닝룸 사진 전면 노출 + 플로팅 글래스 UI(샘플러/큐) + 하단 lofi-os-mixer 플레이어 바. 패널-그리드 스타일들과 구조 차별화. full/compact QA·lint·check 통과 |
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

`모던 / 미니멀`, `강렬 / 실험`, `레트로 / 빈티지` 세 카테고리 모두 category QA까지 verified다(각 아카이브 파일 참고). 남은 미해결 category QA는 없다.

### 강렬 / 실험 category QA

Status: `verified` (2026-07-07) — 상세는 `docs/review-log-archive/intense-experimental.md`.

- desktop/mobile 모두 8개 card만 표시, 각 style marker 렌더, horizontal overflow `0`.
- Screenshots: `output/playwright/category-review/intense-experimental/`.

### 레트로 / 빈티지 category QA

Status: `verified` (2026-07-07) — 상세는 `docs/review-log-archive/retro-vintage.md`.

- desktop/mobile 모두 9개 card만 표시, 각 style marker 렌더, horizontal overflow `0`.
- Screenshots: `output/playwright/category-review/retro-vintage/`.

## 진행 중 카테고리: 미래 / 디지털

다음 스타일: No. 27, `futurism`. 스타일별 상세 기록은 아래에 작성한다.
