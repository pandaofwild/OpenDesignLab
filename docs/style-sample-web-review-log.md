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
| 11 | 강렬 / 실험 | new-brutalism | brutalist-poster | verified | LOUD LAUNDRY kiosk — machine status grid, cycle builder form, wash rates table |
| 12 | 강렬 / 실험 | anti-design | magazine-layout | verified | broken convention, off-grid navigation, deliberate awkwardness |
| 13 | 강렬 / 실험 | maximalism | street-campaign | verified | PAVONE HOUSE interiors atelier — salon-wall hero, interactive pattern clash console, print index swatches, product shelf |
| 14 | 강렬 / 실험 | glitch-art | cyber-dashboard | verified | UNSTABLE MEDIA editions gallery — artwork viewer with rgb channel drift, file integrity manifest (sha-256), edition activity feed |
| 15 | 강렬 / 실험 | deconstructivism | brutalist-poster | verified | structural fault, fracture section index, displaced project axis |
| 16 | 강렬 / 실험 | avant-garde | magazine-layout | verified | manifesto program, critical lecture rail, art-into-life agenda |
| 17 | 강렬 / 실험 | postmodernism | retro-commerce | verified | PALLADIO & POP auction house — live sale ticker, featured lot bid module, browse-by-era chips |
| 18 | 레트로 / 빈티지 | retro | retro-commerce | verified | retro broadcast shop, time-travel media dial, analog merch queue |
| 19 | 레트로 / 빈티지 | vintage | retro-commerce | verified | paper catalog, repair ticket ledger, patina material register |
| 20 | 레트로 / 빈티지 | seventies-retro | retro-commerce | verified | **정석적 '70s 라이프스타일 커머스' 폐기 → 'THE GROOVY KITCHEN' 70s 커뮤니티 쿡북 리더로 전면 재설계**(Concept originality 원칙 첫 적용): Houseplant식 홈굿즈 커머스(GROOVY LANDING·wavy campaign shelf·corduroy product rhythm)를 버리고 레시피/인덱스카드 에디토리얼로 재구성. codex로 70s 부엌 퐁뒤 실사(하베스트 골드·아보카도 세라믹·우드패널·Kodachrome 톤) 신규 생성해 GENERATED_STYLE_IMAGES 등록. 골격: 그루비 마스트헤드(THE GROOVY KITCHEN·70s community cookbook·챕터탭 Starters/Mains/Fondue/Sweets·no.7·그루비 sunrise 링) + 아치형 히어로 레시피 카드(퐁뒤 실사 위 Cheddar Fondue Night·★4·serves 6/45 min/easy 칩·fondue night 뱃지) + recipe card index(Avocado Ambrosia/Harvest Pot Roast/Orange Bundt/Deviled Eggs·컬러 이니셜 뱃지·카테고리·시간·별점) + ingredient checklist(체크박스 5종)+numbered method(3스텝)+harvest-gold pantry 스와치(골드/아보카도/오렌지/로즈). 팔레트는 기존 70s 온기 유지(머스터드 베이스·브라운 텍스트). 레시피 에디토리얼 골격이라 이웃 전부(방송숍/종이카탈로그/신스콘솔/데스크탑진/flight deck/디자인스튜디오/워크숍그리드)와 구조 차별화. 함수명 SeventiesGroovyLanding→SeventiesRecipeCookbook(라우팅+check-style-distinction 맵 갱신), family 마커 갱신(The Groovy Kitchen/recipe card index/harvest-gold pantry), representativeTraits/tokenIntent를 쿡북 컨셉으로 갱신. 장식 sunburst는 inset-0 overflow-hidden 래퍼로 감싸 scrollWidth 오버플로우 제거. full/compact QA(overflow 0)·lint·check:style-distinction(70s 통과) 통과 |
| 21 | 레트로 / 빈티지 | eighties-retro | cyber-dashboard | verified | **정석적 synthwave 미디어 콘솔 폐기 → 'NEON NIGHTS VIDEO' 80s VHS 호러 비디오 렌탈점으로 전면 재설계**(Concept originality): 다크 네온 정체성(네이비+마젠타/시안/옐로)은 유지하되 신스웨이브 플레이어(SYNTH CONSOLE·VHS mix queue·arcade control strip)를 버리고 Be Kind Rewind식 심야 렌탈점 리테일로 재구성. 소유자 요청대로 80s 호러 소재. codex로 심야 네온 렌탈점 통로 실사(VHS 선반·네온 사인·CRT 정지화면·블러드레드 반사) 신규 생성해 GENERATED_STYLE_IMAGES 등록. 골격: 네온 스토어프론트 헤더(NEON NIGHTS VIDEO 마젠타 글로우·VHS horror·open till 2am·New/Horror/Members·● OPEN) + STAFF PICK 피처 패널(렌탈점 실사 위 The Midnight Tape·slasher 1986 98min·★4·rent $2, 하단 스크림만으로 이미지 드러냄) + new-release wall(VHS 테이프 케이스 6종 — Neon Slasher/Grave Shift/Prom Night Terror/Static Screams/Cassette from Hell/Chrome Nightmare, 장르 컬러 상단밴드·rental 상태 IN/OUT/DUE 글로우 도트) + rental desk(Neon Nights Video Club 멤버십 카드·Member 0286·since '86 + your rentals due date + be kind rewind·late fee $1/day) + 장르 네온 칩(Horror/Slasher/Sci-Fi/Cult/B-Movie) + 네온 퍼스펙티브 그리드/스캔라인. 비디오 렌탈 리테일 골격이라 이웃(방송숍/종이카탈로그/쿡북/데스크탑진/flight deck/스튜디오/워크숍)과 구조 차별화, Cyberpunk 도시/디스토피아와도 구분. 함수명 EightiesSynthConsole→EightiesVideoRental(라우팅+check-style-distinction 맵), family 마커 갱신(Neon Nights Video/new-release wall/be kind rewind), representativeTraits/tokenIntent 갱신(avoidTraits에 Cyberpunk city dystopia 추가). 장식은 inset-0 overflow-hidden 래퍼로 클리핑. full/compact QA(overflow 0)·lint·check:style-distinction(80s 통과) 통과 |
| 22 | 레트로 / 빈티지 | nineties-graphic | street-campaign | verified | **정석적 GeoCities '데스크탑 진' 폐기 → 'MEGA MEDIA' 90s 인터랙티브 멀티미디어 백과 CD-ROM으로 전면 재설계**(Concept originality·강한 시대성 요청): 초기웹 브라우저 창(DESKTOP ZINE·sticker link grid·halftone scrap wall)을 버리고 Encarta/Living Books식 CD-ROM 앱으로 재구성. 소유자 요청대로 친근한 주제(귀여운 동물/펫 백과). codex로 친근한 골든리트리버 강아지 실사 신규 생성해 GENERATED_STYLE_IMAGES 등록. 골격: 아이코닉 틸(Win95) 데스크탑 위 회색 3D 베벨 멀티미디어 창 — WordArt 레인보우 로고(Mega Media·skew·블랙 아웃라인) 타이틀바(min/max/close 베벨) + 메뉴 스트립(File/Edit/Go/Bookmark/Help 액셀러레이터 밑줄) + clip-art topic explorer 레일(Pets active/Farm/Ocean/Birds/Bugs/Music·SVG 글리프 베벨 버튼) + media viewer(sunken 스크린에 강아지 실사·QUICKTIME MOVIE 라벨·트랜스포트 바 ▶/스크러버/0:42·2:10) + article 패널(GOLDEN RETRIEVER·article 1 of 214·블루 밑줄 하이퍼텍스트 dog/retrieve/pet·See also 칩) + DID YOU KNOW 팩트박스 + CD-ROM 상태바(CD-ROM DRIVE D:·오디오 ◄◄▶►►·TRACK 03·NOW LOADING 세그먼트 게이지·8MB RAM). Win95 raised/sunken 베벨 헬퍼로 정통 크롬 구현. 미디어-뷰어 멀티미디어 앱 골격이라 이웃(방송숍/쿡북/VHS렌탈/우주 flight deck/스튜디오)·현재 웹 진과 구조 차별, y2k 광택 크롬과도 질감 구분(무광 회색 베벨). 함수명 NinetiesGraphicZine→NinetiesMultimediaCdRom(라우팅+check-style-distinction 맵), family 마커 갱신(Mega Media/topic explorer/now loading), representativeTraits/tokenIntent 갱신. 장식은 inset-0 overflow-hidden 래퍼로 클리핑. full/compact QA(overflow 0)·lint·check:style-distinction(90s 통과) 통과 |
| 23 | 레트로 / 빈티지 | y2k | cyber-dashboard | verified | GLOSS PORTAL, bubble widget stack, sparkle guestbook rail |
| 24 | 레트로 / 빈티지 | retro-futurism | retro-commerce | verified | FLIGHT DECK, destination poster rail, chrome capsule timetable |
| 25 | 레트로 / 빈티지 | mid-century-modern | minimal-editorial | verified | MIDCENTURY STUDIO, walnut slat product rail, Girard textile swatch wall |
| 26 | 레트로 / 빈티지 | bauhaus | magazine-layout | verified | BAUHAUS SCHOOL, workshop method grid, circle square triangle lab |
| 27 | 미래 / 디지털 | futurism | cyber-dashboard | verified | ORBITAL TRANSIT 마하 회랑 운행 콘솔 — 실버 포드 히어로+MACH velocity 타이포 웨지, Mach corridor map(회랑 선택 인터랙션), Launch window board, live telemetry 스트립 |
| 28 | 미래 / 디지털 | cyberpunk | cyber-dashboard | verified | LUCKY CHROME CLINIC 나이트마켓 리퍼독 터미널 — 네온 골목 실사+사인 스택, implant menu(선택→원장 연동), black-market deck flash, install queue, humanity 게이지, city protocol 해저드 스트립 |
| 29 | 미래 / 디지털 | neon-noir | cyber-dashboard | queued | cinematic dark, noir contrast, restrained neon |
| 30 | 미래 / 디지털 | techwear | cyber-dashboard | queued | modular gear, tactical panels, fabric/strap logic |
| 31 | 미래 / 디지털 | high-tech | saas-landing | queued | precision instrumentation, engineering surfaces |
| 32 | 미래 / 디지털 | ai-aesthetic | saas-landing | verified | MODEL CANVAS generative studio — world-model preview with denoise sweep, prompt bar with style presets, latent queue job states, model index |
| 33 | 미래 / 디지털 | hologram-style | cyber-dashboard | queued | translucent spectral layers, prism depth, not chrome |
| 34 | 미래 / 디지털 | chromecore | luxury-product | verified | CHROMEWORKS faceplate shop — chrome-type nameplate, shells standing on a chrome rail (carousel), fitment rail with stock states, order bar |
| 35 | 미래 / 디지털 | metaverse-style | cyber-dashboard | queued | spatial avatar/world UI, virtual economy, 3D scene logic |
| 36 | 럭셔리 / 클래식 | classic | luxury-product | queued | symmetrical heritage, serif restraint, traditional trust |
| 37 | 럭셔리 / 클래식 | neoclassic | luxury-product | queued | columns, museum spacing, disciplined ornament |
| 38 | 럭셔리 / 클래식 | luxury | luxury-product | queued | premium product reveal, rich material, controlled opulence |
| 39 | 럭셔리 / 클래식 | old-money | luxury-product | queued | understated heritage, club tone, quiet affluence |
| 40 | 럭셔리 / 클래식 | art-deco | luxury-product | verified | MERIDIAN LINE liner booking — S.S. Aurelia hero, sailings board with reserve/waitlist, stateroom class fare cards, grand salon strip |
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
| 54 | 귀여움 / 캐주얼 | kitsch | kawaii-app | verified | ban.do/Lisa Says Gah/Lazy Oaf식 '노벨티 부티크 스토어프론트' 재설계: 마퀴+Clash Cart 내비, 히어로(실사 크롭+★ODD SHOP DROP 뱃지·LIMITED ODDITIES 헤드라인·SHOP THE DROP) · giftable product finder(for/vibe/budget 칩·find my oddity·18 matches) 분할, odd object cards 상품 월(스마일머그·체커토트·디스코볼·하트선글라스 실사 + 선버스트 sticker price bursts·NEW/HOT·컬러웨이 도트), clashing pattern strips/pattern clash rail(checker/dots/wavy/flame/gingham/zigzag CSS 프린트 스와치), drop countdown 바. 두꺼운 검정 테두리·하드 오프셋 그림자·남발 회전(촌스러움) 전부 제거하고 화이트 카드·헤어라인·정제 타입으로 규율, 시그니처는 선버스트 스티커+프린트 스와치 한 곳에 집중. 스토어프론트 골격으로 이웃 kawaii(수집 그리드)·dopamine(원형 대시보드)·bubble(수직 쇼)과 구조 차별화. 필수(ODD SHOP DROP/sticker price bursts/clashing pattern strips)+경험 마커(LIMITED ODDITIES/pattern clash rail/giftable product finder/drop countdown) 전부 충족. KitschPriceBurst 모듈 스코프 헬퍼로 lint 통과, 히어로 오버레이는 GeneratedStyleImageSurface children(z-10)로 전달해 surface gotcha 회피. full/compact QA(overflow 0)·lint·**check:cute-casual 카테고리 전체 통과(9/9)** |
| 55 | 귀여움 / 캐주얼 | kawaii | kawaii-app | verified | Sanrio/Pusheen식 'CHARACTER CLUB' 멤버십 대시보드 재설계: 멤버 배너(hi, mochi member!·하트 카운트·character mood ring) + mascot tiles 수집 그리드(실제 kawaii 이미지·collected/new 상태·4/6 수집) + heart badges 진행 + stamp rewards 카드 + shop tiny treats 라인. 수집-그리드 멤버십 골격으로 이웃 kitsch(테두리 노벨티 샵)·dopamine-design(원형 리워드 대시보드)와 구조 차별화. kawaii 필수(CHARACTER CLUB/mascot tiles/heart badges)+경험 마커(FRIEND CLUB DASHBOARD/character mood ring/stamp rewards/shop tiny treats) 전부 충족, Heart→KawaiiHeart 모듈 스코프 승격으로 lint 통과, full/compact QA(overflow 0)·kawaii 자체 assertion 통과. (카테고리 전체 check:cute-casual은 미구현 kitsch 형제 때문에 여전히 실패 — kawaii 자체는 통과) |
| 56 | 귀여움 / 캐주얼 | dopamine-design | kawaii-app | verified | 게임화 습관/스트릭 대시보드 재설계(Duolingo/Happy Socks 에너지): 무지개 conic COLOR REWARD LOOP + 궤도형 habit orbit 버블 + reward meter(XP) + color pulse cards + reward ladder(티어) + dopamine spectrum 바. 최대 채도 팔레트, 원형-진행 대시보드 골격으로 이웃 kawaii(이미지 카드)·pop-art(에디션 그리드)와 구조 차별화. dopamine 필수+경험 마커 전부 충족, full/compact QA(overflow 0)·lint 통과. (카테고리 전체 check:cute-casual은 kawaii 등 미완성 형제 스타일 때문에 여전히 실패 — dopamine 자체 assertion은 통과) |
| 57 | 귀여움 / 캐주얼 | pop-art | street-campaign | verified | Warhol/Haring/Guggenheim-Pop식 '시리얼 팝 월' 뮤지엄 에디션샵 재설계: 갤러리 마스트헤드(EDITION WALL·POP OBJECT ARCHIVE·museum shop wall) + object edition grid(Warhol Flowers식 반복 오브젝트 SVG를 컬러 순열로 4x2 배열 + Ben-Day halftone block 타일) + SERIAL POP WALL 잉크 플래카드 + museum shop 에디션 레일(flowers serigraph ed.250 $95·ben-day tote $38·soup can mug $24·pop pin ed.500 $12) + halftone caption rail(Ben-Day 도트+SHOP EDITIONS). 기존 프로토타입의 플랫 색블록+placeholder 라벨 제거, PopArtFlower SVG 헬퍼로 실크스크린 반복 오브젝트 구현. 볼드 플랫 컬러는 팝아트 본질로서 시리얼 월 한 곳에 집중, 레일·캡션은 화이트/헤어라인으로 규율. 갤러리-월 지배형 골격으로 이웃 kawaii(상품 수집 그리드)·kitsch(노벨티 스토어)·comic(패널 커버 셸프)과 구조 차별화. 필수(POP OBJECT ARCHIVE/halftone block/repeated object)+경험 마커(SERIAL POP WALL/museum shop wall/halftone caption rail/object edition grid) 전부 충족, full/compact QA(overflow 0)·lint·check:cute-casual(9/9) 통과 |
| 58 | 귀여움 / 캐주얼 | comic-book-style | kawaii-app | verified | Marvel/DC/Webtoons식 '코믹 이슈 리더 페이지' 재설계: 마스트헤드(ISSUE SHELF·ISSUE DROP·vol.4 #042) + 불규칙 코믹 페이지(잉크 패널 스플래시 커버 — codex 생성 실버에이지 로켓 SF 커버 아트 + ★ISSUE DROP 버스트·speech balloon(꼬리 포함)·ROCKET CITY 타이틀 배너 오버레이 + 3개 시퀀셜 panel preview(MEANWHILE/VROOOM/LOOK UP 캡션)) + 리더 레일(COVER READER SHELF=series queue 미니 커버 #041~043·episode metadata #042 22pp ★4.8·creator credit line) + 리더 컨트롤(prev·진행바 p.8/22·read issue). Ben-Day 도트 배경·잉크 패널 거터로 코믹 정체성, 초기 안전거부(슈퍼히어로)→인물 없는 로켓 SF 커버로 우회. 기존 프로토타입의 플랫 색블록+placeholder 라벨 제거. 불규칙 서사형 코믹-페이지 골격으로 이웃 pop-art(균일 시리얼 실크스크린 그리드)와 구조 차별화. 히어로 오버레이는 GeneratedStyleImageSurface를 absolute inset-0 span으로 감싸 surface gotcha 회피. 필수(ISSUE DROP/speech balloon/episode metadata)+경험 마커(COVER READER SHELF/panel preview/creator credit line/series queue) 전부 충족, full/compact QA(overflow 0)·lint·check:data·check:cute-casual(9/9) 통과 |
| 59 | 귀여움 / 캐주얼 | toy-design | kawaii-app | verified | LEGO/Play-Doh/Fisher-Price식 '모듈러 플레이셋 빌드 컨피규레이터' 재설계: 헤더(playset works·PLAYSET BUILDER·age range selector 3+/6+/9+ 청키 탭) + assembly tray 빌드 캔버스(페그보드 위 실제 플라스틱 브릭 디오라마 — 스터드/광택/그림자 브릭으로 지은 집(문·창문·박공지붕)+나무+조립 대기 loose 브릭+지붕에 끼워지는 브릭+스터드 베이스플레이트, 하늘 해·구름으로 박스아트 신, MODULAR PLAYSET SHOP 플래카드·pcs 스테퍼) + block parts 빈(2×2/1×4/2×3/1×2 브릭·수량) + build pattern chooser(house/rocket/car) + instruction rail(base/walls/roof/done 스텝+add set $39). 기존 프로토타입의 플랫 색블록 4개(촌스러움) 제거, ToyBrick SVG-free 글로시 브릭 헬퍼로 실물 조립 구현(초기 계단식 막대 스택은 '기이한 스택'으로 읽혀 한눈에 알아보는 집 디오라마로 교체). 컨피규레이터-워크스페이스 골격으로 모든 이웃(스토어/그리드/대시보드/쇼케이스/에디토리얼/앱/갤러리월)과 구조 차별화. 필수(PLAYSET BUILDER/block parts/assembly tray)+경험 마커(MODULAR PLAYSET SHOP/age range selector/instruction rail/build pattern chooser) 전부 충족, full/compact QA(overflow 0)·lint·check:cute-casual(9/9) 통과. **→ 귀여움/캐주얼 9개 스타일 전부 verified** |
| 60 | 귀여움 / 캐주얼 | playful-design | kawaii-app | verified | Duolingo/Headspace/Mailchimp식 '가이드 조이 플로우' 친근한 온보딩 앱 재설계: 앱 헤더(🌱 guide garden·day 3 +40xp) + 마스코트 코치 카드(PLAYFUL ONBOARD·guided joy flow·스프라우트 캐릭터 SVG·speech bubble mascot walkthrough) + soft progress path 4노드 스텝퍼(done/active/todo) + gentle task cards/task completion stack 세로 체크리스트(pick focus·meet guide·2-min step·reminder, done/resume/+15xp 상태) + continue CTA. 기존 프로토타입의 클립아트 원형 마스코트·플랫 색블록 4개(촌스러움) 제거, PlayfulMascot SVG 헬퍼로 캐릭터 정성 렌더+정제된 소프트 팔레트(coral/mint/butter/periwinkle)·화이트 카드. 세로 앱 온보딩 피드 골격으로 이웃 kawaii(수집 그리드)·pastel(에디토리얼 이미지 밴드)·dopamine(원형 대시보드)·kitsch(노벨티 스토어)와 구조 차별화. 필수(PLAYFUL ONBOARD/mascot helper/gentle task cards)+경험 마커(GUIDED JOY FLOW/mascot walkthrough/task completion stack/soft progress path) 전부 충족, task stack justify-between으로 여백 균형, full/compact QA(overflow 0)·lint·check:cute-casual(9/9) 통과 |
| 61 | 귀여움 / 캐주얼 | pastel-style | kawaii-app | verified | Glossier/Bubble Skincare/Starface식 '파스텔 뷰티 에디토리얼' 재설계: 에디토리얼 마스트헤드(SOFT EDIT·Tint Journal·no.07 skin-tint season) + 와이드 저대비 히어로(파스텔 뷰티 실사 + PASTEL BEAUTY EDIT 세리프 마스트헤드) + shade story 스와치 레일(porcelain/blush/peach/mauve/lilac/mint·언더톤) + editorial product shelf 상품 4장(tint serum/cushion tube/cloud jar/cream pot 실사 크롭·shade·price) + airy product rows·low-contrast set 캡션 + skin tint planner 바(언더톤/피니시 칩·matched 06·find my tint). codex image gen으로 파스텔 뷰티 플랫레이 실사 신규 생성(scripts PROMPTS pastel-style 추가, GENERATED_STYLE_IMAGES 등록). 기존 프로토타입의 플랫 파스텔 알약 블록·추상 01/02/03 필·제네릭 스와치 스트립(촌스러움) 전부 제거, 이미지 지배형 풀폭 에디토리얼 밴드 골격으로 이웃 kitsch(밀도높은 노벨티 스토어)·kawaii(수집 그리드)·bubble(수직 캔 쇼)과 구조 차별화. 히어로 오버레이는 GeneratedStyleImageSurface children(z-10)로 전달. 필수(SOFT EDIT/airy product rows/low-contrast set)+경험 마커(PASTEL BEAUTY EDIT/shade story/skin tint planner/editorial product shelf) 전부 충족, full/compact QA(overflow 0)·lint·check:data·check:cute-casual(9/9) 통과 |
| 62 | 귀여움 / 캐주얼 | bubble-design | kawaii-app | verified | **뻔한 음료 브랜드 폐기 → 'AQUA DESK' Frutiger Aero / Mac OS X Aqua 데스크탑으로 전면 재설계**(개성/특징성 강화 요청): 소유자 지시대로 소다 브랜드(Pop Fizz·EFFERVESCENT FLAVOR LAB·flavor carousel·can shelf)를 전부 버리고, 가상 물방울 OS의 실제 데스크탑 UI로 재구성. codex로 Frutiger Aero wallpaper 실사(글로시 매크로 물표면·공기방울·이슬·하늘블루→아쿠아 그라디언트·스파클) 신규 생성해 기존 소다 캔 이미지 교체, 데스크탑 배경으로 드러냄. 골격: 반투명 글래스 **메뉴바**(물방울 젤 글리프·BUBBLE FLOW OS명·File/Edit/View/Window·아쿠아 wifi 아크/젤 배터리/9:41) + 떠 있는 글래스 창들(핀스트라이프 타이틀바·캔디 신호등 젤 버튼·Favorites 사이드바+window shelf 파일 리스트=Aqua Reef/Bubble Stream/Splash Kit… gel 아이콘·kind·size) + 원형 **droplet widget**(물방울 SVG·21°·Aqua Bay, 글로스 하이라이트) + **liquid progress** 젤 볼륨 슬라이더(핀스트라이프 액체 채움 72%·젤 노브) + 반사형 아쿠아 **glass dock**(inflated capsules=글로시 젤 아이콘 6개·확대·running-indicator 도트). representativeTraits 5개(Inflated capsules/Liquid progress/Circular product modules/Sparkling surface/Floating flavor cards)를 아쿠아 형태로 전부 실모듈 보존. OS/윈도우 UI 골격이라 이웃 전부(앱 온보딩·에디토리얼·노벨티 스토어·수집 그리드·원형 대시보드·컨피규레이터)와 구조 완전 차별화. wallpaper는 GeneratedStyleImageSurface overlay="none"을 absolute inset-0 span으로 감싸 surface gotcha 회피. check-cute-casual 마커 갱신(소유자 승인): 필수 유지(BUBBLE FLOW/inflated capsules/liquid progress) + experience 교체(AQUA DESKTOP/glass dock/droplet widget/window shelf), forbidden prototype copy를 Pop Fizz·sparkling drinks·소다 마커로 갱신해 회귀 차단. 함수명 BubbleFlowCapsules 유지. full/compact QA(overflow 0)·lint·check:cute-casual(9/9) 통과(compact 썸네일은 aspect-[16/7] 공통 크롭으로 상단 메뉴바+글래스 창+물 wallpaper만으로도 아쿠아 OS 즉시 인식) |
| 63 | 스트리트 / 서브컬처 | streetwear | street-campaign | verified | 프리미엄 드롭 커머스 페이지 재설계(Supreme/Kith/Stussy식): 실제 리테일 컴포넌트 — 가먼트 사진 상품 월(가격·컬러웨이 도트·NEW/1of1/SOLD OUT 상태), 카운트다운 release clock, DROP LEDGER 스케줄, size run matrix(재고 셀), lookbook strip. 부티크 랙 히어로(codex image gen) 크롭을 상품 타일로 사용. 갤러리 화이트+레드 톤·리테일 상품-그리드 골격으로 이웃 graffiti(이미지 문서화)·기타 스트리트와 구조·톤 차별화. 5 trait 마커 유지, full/compact QA(overflow 0)·lint·check 통과 |
| 64 | 스트리트 / 서브컬처 | graffiti | street-campaign | verified | WALLDEX 스트리트아트 문서화 UI. 캐노니컬 5 trait 라벨(Graffiti wall scanner/Wall tag index/Spray color rack/Mural route map/Crew tag archive) 반영, check 마커 통과. full/compact QA·lint 통과 |
| 65 | 스트리트 / 서브컬처 | hiphop-style | street-campaign | verified | Black & Gold Album Studio 리디자인: 전용 팔레트+토큰, 스튜디오 히어로 이미지, 5 trait 전부. full/compact QA·lint·street-subculture 마커 통과 |
| 66 | 스트리트 / 서브컬처 | skate-culture | street-campaign | verified | 스팟 클립 플레이어 페이지 재설계(Berrics/Thrasher식): 실제 미디어-UI 컴포넌트 — 트랜스포트 컨트롤+스크러버 비디오 플레이어, 트릭 챕터 라인, 관련 클립 레일(실사 썸네일), SPOT CHECKLIST·덱 셋업·스티커 슬랩 사이드바. 콘크리트 그레이 톤+미디어-플레이어 골격으로 앞뒤 hiphop-style(다크 앨범 스틸)·punk(본페이퍼 신문)와 구조·톤 차별화. 페이키 스팟 히어로(codex image gen), 5 trait 마커 유지, full/compact QA(overflow 0)·lint·check 통과 |
| 67 | 스트리트 / 서브컬처 | punk | street-campaign | verified | 제록스 팬진 1면 재설계: 전용 종이 팔레트(잉크/블러드레드/애시드라임)+토큰 오버라이드, 랜섬노트 헤드라인, 배틀재킷 하프톤 히어로(codex image gen), 실제 멀티컬럼 신문 골격(리드/레코드리뷰/공연·패치·메일오더 사이드바). 앞뒤 skate(모듈그리드)·grunge(이미지분할)와 구조 차별화. 5 trait 마커 유지, full/compact QA(overflow 0)·lint·check 통과 |
| 68 | 스트리트 / 서브컬처 | grunge | street-campaign | queued | distressed texture, muted dirt, rough band archive |
| 69 | 스트리트 / 서브컬처 | indie-sleaze | street-campaign | verified | 실제 플래시 파티 사진 히어로(codex image gen) 추가: 중앙 FLASH FEED·디스포저블 카메라 그리드·미러 플래시 스택을 실제 사진 크롭으로 교체. 네온 팔레트·5 trait·구조 마커 유지, full/compact QA·lint·check 통과 |
| 70 | 스트리트 / 서브컬처 | rave-style | cyber-dashboard | verified | 웨어하우스 스테이지 타임테이블 재설계: Resident-Advisor식 시간×스테이지 매트릭스(4 스테이지·8 타임슬롯, 네온 set-block+bpm), 레이저 웨어하우스 히어로 밴드(codex image gen)·사운드 미터·티켓 티어·on-air 타일. 앞뒤 indie-sleaze(이미지 히어로 분할)·lo-fi(이미지+플로팅 글래스)와 구조 차별화(UI 매트릭스 지배형). 5 trait 마커 유지, 구조 마커 갱신, full/compact QA(overflow 0)·lint·check 통과 |
| 71 | 스트리트 / 서브컬처 | lo-fi | retro-commerce | verified | "실질적인" 라디오 스테이션 UI로 컴포넌트 리얼리즘 보강: 색깔 스와치였던 샘플러 패드를 실라벨(kick/snare/hat 등)+활성 상태 패드 그리드로, 장식용 노브 2개를 실제 prev/play-pause/next 트랜스포트 버튼으로, 프로그레스바+웨이브폼 혼재를 재생/미재생 구간이 구분된 진짜 웨이브폼 스크러버(경과/전체 시간 표시)로, 큐 리스트에 트랙 길이·활성 트랙 하이라이트 추가. 리스닝룸 사진+ON AIR 라이브 인디케이터 유지, 5 trait 마커 유지, full/compact QA(overflow 0)·lint·check 통과 |
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

## 27. futurism (미래 / 디지털)

### 현재 판정

- status: `reviewing` → 재설계 착수.
- 현재 샘플(`FuturismVelocity`): 추상 스큐 도형("carbon telemetry spine" 장식 막대), placeholder 칩("01 capsule / 02 vector / 03 return"), 빈 화이트 패널 위 헤어라인 두 줄로 기체를 흉내 — 소유자 금지 패턴(클립아트 기하 도형 + 빈 app-UI 사각형) 그대로. 전면 재설계 대상.
- moodboard 신호(`futurism-realistic-v2.webp`): 은색/화이트 베이스, 유선형 초고속 포드(하이퍼루프/초음속 기체), 강한 수평 모션블러, 일렉트릭 블루 스트릭, 카본파이버·브러시드 알루미늄 스와치, 블랙 패널 UI 카드. **우주 로켓이 아니라 지표-대기권 초고속 이동체 미학.**
- 토큰: base `#ECEFF4`(실버), surface 화이트, text 근블랙, accent 레드 `#FF2D2D`, accent2 블루 `#1E5BFF` — 무드보드와 일치(라이트 실버 + 다크 패널).
- 인접 구분: retro-futurism(크림 포스터 여행국·capsule timetable·과거가 상상한 미래)과는 라이브 운영 콘솔 + 실버/블루 스피드로 구분. cyberpunk(다크 네온 시장)·high-tech(딥네이비 control plane)와는 라이트 실버 베이스로 구분. art-deco(sailings board)와는 예약 커머스가 아닌 미션 운영 상태판이라는 점으로 구분.

### referenceSites에서 가져올 웹 문법

- SpaceX: 블랙 필드 미션 패널, 대형 수치 타이포(속도/고도), 미션 단계 스트립, GO/HOLD 상태 언어.
- Boom Supersonic: 라이트 에디토리얼 위 velocity 수치("Mach 1.7"), 도시쌍 노선 스토리(NYC→LDN 3.5h), 유선형 기체 렌더의 여백 사용.
- NASA Artemis: launch window 개념, 미션 타임라인, 궤도 다이어그램의 시민-과학 신뢰 톤.

### 목표

- 컨셉: **"ORBITAL TRANSIT" — 초음속 포드 트랜짓 라인의 라이브 운행 콘솔**. 정석적 'SpaceX 클론 로켓 랜딩'을 피하고, 마하 회랑을 달리는 포드 노선의 출발 상황판이라는 구체적 성격 부여.
- 고유 마커 3개: `ORBITAL`(워드마크), `Mach corridor`(회랑 노선도 모듈), `Launch window`(출발 창 보드 모듈) — check-future-digital 계획 마커와 일치.
- 정보 구조: 마스트헤드(워드마크·nav·시스템 상태 GO) → 히어로 밴드(codex 생성 포드 실사 + velocity 타이포 + 궤도 아크) → Mach corridor 노선도(도시쌍 아크·마하 세그먼트·회랑 상태) + Launch window 보드(창 ID·T-카운트다운·독·GO/HOLD/BOARDING) → 라이브 텔레메트리 스트립(속도/고도/G 미터).
- 시각 처리: 라이트 실버 페이지 위 다크 미션 패널(civic-science confidence), 대각 velocity 컷, 이탤릭 대형 수치 타이포, 레드/블루 상태 액센트. representativeTraits 5개 전부 실모듈로 존치.

### 검증 계획

- RED: 기존 마커(ORBITAL VELOCITY/aerodynamic launch window/carbon telemetry spine) 제거 확인, check-style-distinction 맵 갱신 전 실패 확인.
- GREEN: 새 마커 3개 렌더, check:future-digital 전체 통과(futurism 마커 해소), check:style-distinction 통과.
- browser QA: full(`/ko/styles/futurism`)·compact(`/ko/styles`) Playwright 스크린샷, 가로 overflow 0, 프레임 내부 우측 클리핑 0.

### 구현 및 검증 결과

- status: `verified` (2026-07-17).
- 변경 요약: `FuturismVelocity` 프로토타입 삭제 → 위임 래퍼 `FuturismMachCorridor` + 분리 컴포넌트 `OrbitalTransitConsole.tsx`(use client, 회랑 선택 useState). codex로 futurism 포드 실사 신규 생성(`public/generated/design-styles/futurism.webp` — 실버 티어드롭 포드·수평 모션블러·블루 스트릭·레드 테일·카본 가이드웨이). 골격: 스피드틱+이탤릭 ORBITAL TRANSIT 마스트헤드(UTC 칩·SYSTEM GO) → 포드 히어로(LIVE 칩·다크 corridor arc 패널(부스트-글라이드 아크 SVG·APO 고도)·전방 기울기 velocity 웨지에 MACH 수치 타이포) → Mach corridor map(4개 회랑 행: 마하 프로파일 스파크·M수치·transit·OPEN/WX ADV/HOLD 칩, aria-pressed 선택) + Launch window board(5행 출발 매트릭스: T-마이너스 카운트다운·독·BOARDING/GO/HOLD, 활성 회랑 행 하이라이트) → 다크 live telemetry 스트립(Velocity/G-load 미터 바·NEXT WINDOW 레드 칩). 회랑 클릭 시 히어로 MACH/노선/LIVE 포드/NEXT WINDOW 연동 갱신 확인. 장식: CUT 평행사변형 클립을 모든 칩에 통일 적용(aerodynamic diagonal cuts), ot-streak 히어로 스피드 스트릭(프레임 안 200%로 제한)·ot-live 펄스(reduced-motion 대응).
- representativeTraits: Orbital mission framing(corridor arc 패널)·Launch-window modules(보드)·Velocity typography(MACH 웨지)·Aerodynamic diagonal cuts(CUT 칩)·Dark civic-science confidence(다크 arc/telemetry 패널) 전부 실모듈.
- RED/GREEN: 구 마커(ORBITAL VELOCITY/carbon telemetry spine)는 check-future-digital retired 리스트로 회귀 차단, 신 마커(ORBITAL/Mach corridor/Launch window) GREEN. check-style-distinction 맵 갱신(FuturismMachCorridor + delegatedSampleSources 등록, 마커 ORBITAL TRANSIT/Mach corridor map/Launch window board/Live telemetry).
- browser QA: full 데스크톱(694px 프레임)·모바일(284px 프레임)·compact 모두 page overflow 0 + 프레임 내부 우측 클리핑 0. 모바일에서 nav/UTC/arc 패널 숨김, 워드마크·MACH 축소, telemetry 미터는 프레임 캡(~700px) 기준 2개 고정. Screenshots: `futurism-orbital-full-final2.png`, `futurism-orbital-mobile.png`, `futurism-orbital-compact.png`.
- 명령: `npm run lint`·`check:future-digital`(카테고리 마커 첫 전체 통과)·`check:style-distinction`·`check:data` 통과.
- 남은 의심점: 없음.
- 다음 style: No. 28 `cyberpunk`.

## 28. cyberpunk (미래 / 디지털)

### 현재 판정

- status: `reviewing` → 재설계 착수.
- 현재 샘플(`CyberpunkCity`): "Night Market." 헤드라인 + "enter alley" CTA 랜딩 프로토타입. 우측 패널이 추상 스트라이프 장식 + 떠 있는 라벨 칩("RIPPER DOC booth: B-13", "open late/no warrants")으로, 실제 커머스/터미널 UI가 아님. 소유자 금지 패턴(빈 패널 + 장식 스탠드인).
- moodboard 신호(`cyberpunk-realistic-v2.webp`): 블랙/차콜 위 네온 마젠타·애시드 그린·시안, **밀도 높은 다크 패널 레이아웃**, 젖은 아스팔트 밤골목, 해저드 스트라이프(옐로/블랙·레드/블랙), 회로기판·케이블 하드웨어, 글리치 스트립. 스카이라인 포스터가 아니라 "언더그라운드 테크 상거래" 보드.
- 토큰: base `#080A14`, surface `#111628`, accent 시안 `#00E5FF`, accent2 마젠타 `#FF3BF4`, accent3 애시드 `#B7FF3C`, border 시안. tokenIntent: 클립 코너, night-market signage, ripperdoc 라벨, back-alley commerce.
- 인접 구분: neon-noir(절제된 시네마틱 글로우·단일 광원)와는 밀도·해저드·상거래 라벨로, glitch-art(미디어 손상 갤러리)와는 도시 상거래 문법으로, eighties-retro(신스 네온 렌탈점)와는 다크 디스토피아 톤으로 구분. futurism(라이트 실버 운행 콘솔)과 정반대 명도.

### referenceSites에서 가져올 웹 문법

- Cyberpunk 2077: 옐로 해저드 UI, 클립 코너 패널, 밀도 높은 캠페인 정보 블록, 용병 상거래 언어.
- Razer/ROG: 블랙 표면 위 네온 액센트 제품 스테이징, 하드웨어 스펙 라벨, 공격적 리테일 위계.
- Dribbble cyberpunk: black-market 대시보드, 네온 스트리트 라벨, 사이버네틱 숍 모듈.

### 목표

- 컨셉: **"RIPPER LANE 13" — 나이트마켓 뒷골목 리퍼독 클리닉의 임플란트 주문 터미널**. 정석적 '사이버펑크 게임 랜딩'을 피하고, 크롬 임플란트를 고르고 설치 슬롯을 잡는 뒷골목 시술소 커머스로 구체화. 에디(€$) 가격·휴머니티 코스트 게이지·"no warrants" 톤으로 장르 문법을 UI로 번역.
- 고유 마커: `BRAINDANCE`(시술 항목)·`black-market deck`(덱 플래시 섹션)·`city protocol`(면책 스트립) + `Night market`·`Ripper lane`(주소/지구 라벨) — check-future-digital·check-style-distinction 요구와 일치.
- 정보 구조: 네온 사인 마스트헤드(클리닉 명·OPEN 24H·지구 라벨) → 좌측 골목 실사 컬럼(codex 생성, 네온 사인 오버레이 스택) + 우측 터미널 컬럼(implant menu 선택 카드: optics/neural port/subdermal/BRAINDANCE rig·에디 가격·humanity cost, black-market deck flash 리스팅: escrow·trust, install queue 슬롯) → 주문 바(합계 에디·humanity 게이지·tonight 슬롯) → 해저드 면책 스트립(cash only·no warrants·city protocol waived).
- 시각 처리: 블랙 패널 + 시안/마젠타 네온 글로우, 애시드 해저드 스트라이프, 클립 코너, 밀도 높은 프로토콜 마이크로라벨. 네온 사인 플리커는 저속·저강도(광과민 주의).

### 검증 계획

- RED: 구 프로토타입 문자열("enter alley"·"booth: B-13") 제거, 함수 라우팅 갱신 전 distinction 실패 확인.
- GREEN: 마커 5종 렌더, check:future-digital·check:style-distinction(cyberpunkBody 하드코딩 assertion 포함) 통과, glitch 마커 미포함 유지.
- browser QA: full/모바일/compact Playwright, 가로 overflow 0, 프레임 내부 클리핑 0.

### 구현 및 검증 결과

- status: `verified` (2026-07-18).
- 변경 요약: `CyberpunkCity` 프로토타입 삭제 → 위임 래퍼 `CyberpunkNightMarket` + 분리 컴포넌트 `NightMarketClinic.tsx`(use client, 임플란트/슬롯 선택 useState). codex로 세로형 네온 골목 실사 신규 생성(`public/generated/design-styles/cyberpunk.webp` — 빈 네온 패널 마젠타/시안/애시드·젖은 아스팔트·스팀·해저드 바리케이드·시안 발광 출입구). 골격: 네온 사인 마스트헤드(Lucky Chrome Clinic 시안 글로우+cp-flicker 저강도 플리커·Ripper lane 13·Night market district·NO WARRANTS ASKED·OPEN 24H) → 좌 골목 실사 컬럼(Implants/Braindance/Deck flash 네온 사인 스택·lane cam 라벨) + 우 터미널(Implant menu 2×2 선택 카드: spec·출처·grade 틱 5단·stock·€$가격·hum −%·설치시간, black-market deck flash 리스팅: jailbroken·serial scrubbed·escrow·trust ★, Install queue 슬롯 4종: taken 취소선·선택 글로우) → Checkout ledger(선택 임플란트·chair·슬롯·humanity 게이지 바·€$합계·Book the chair 마젠타 CTA) → 해저드 스트립(cash only · city protocol waived …). 클립 코너(CLIP) 실루엣을 전 패널·칩에 통일. 임플란트/슬롯 클릭 연동(원장·humanity·가격) 확인, taken 슬롯 disabled 확인.
- representativeTraits: Night market signage(사인 스택+주소)·Black-market interface panels(deck flash+클립 다크 패널)·Ripperdoc commerce(implant menu+chair 예약)·Neon hazard contrast(애시드 해저드 스트립+네온 글로우)·Dense city protocol labels(lic #·lane cam·protocol 풋터 마이크로라벨) 전부 실모듈.
- 마커: 필수(BRAINDANCE/black-market deck/city protocol/Night market/Ripper lane) 전부 소스+렌더 충족, family 마커 신설(Lucky Chrome Clinic/Implant menu/Install queue/Checkout ledger), cyberpunkBody 하드코딩 assertion 함수명 `CyberpunkNightMarket`로 갱신, glitch 마커 미포함 유지. 미사용 NOTCH 상수 제거.
- browser QA: full 데스크톱(694px)·모바일(284px: 골목 배너 스택 전환·타이틀 축소·보조 칩/trust/anesthesia 숨김·슬롯 flex-wrap)·compact 모두 page overflow 0 + 내부 클리핑 0. cp-flicker는 opacity 0.72 하한 저속(광과민 대응, reduced-motion 시 정지). Screenshots: `cyberpunk-clinic-full-final2.png`, `cyberpunk-clinic-mobile-v2.png`, `cyberpunk-clinic-compact.png`.
- 명령: `npm run lint`·`check:future-digital`·`check:style-distinction`·`check:data` 통과.
- 남은 의심점: 없음.
- 다음 style: No. 29 `neon-noir`.
