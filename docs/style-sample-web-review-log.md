# OpenDesignLab Style Sample Web Review Log

이 문서는 78개 디자인 스타일 샘플 웹을 한 번에 묶어 처리하지 않고, 하나씩 프로급 웹 샘플로 점검하고 개선하기 위한 작업대장이다.

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
| 1 | 모던 / 미니멀 | minimalism | minimal-editorial | verified | blank-space ratio, product-first composition, thin-rule material index |
| 2 | 모던 / 미니멀 | modernism | minimal-editorial | verified | rational grid, primary accents, functional geometry |
| 3 | 모던 / 미니멀 | swiss-design | magazine-layout | verified | baseline grid, red signal bars, objective typography |
| 4 | 모던 / 미니멀 | international-style | minimal-editorial | verified | universal signage modules, neutral information system |
| 5 | 모던 / 미니멀 | scandinavian | organic-brand | verified | bright Nordic product commerce, light wood, practical warmth |
| 6 | 모던 / 미니멀 | japandi | minimal-editorial | verified | low horizontal rhythm, muted wood, ceramic quietness |
| 7 | 모던 / 미니멀 | warm-minimal | minimal-editorial | verified | Atelier Sol 인테리어 스튜디오(사진 제로 재작업) — 타이포 히어로·아치 니치 3연작(석고 리넨위브/새벽빛+낮은 태양/점토 원형창, 전부 CSS)·linen project stack(아치 글리프)·terracotta CTA·material palette rail |
| 8 | 모던 / 미니멀 | soft-minimal | minimal-editorial | verified | low contrast, gentle rounded UI, frosted paper softness |
| 9 | 모던 / 미니멀 | high-end-minimal | luxury-product | verified | gallery spacing, severe product crop, quiet luxury commerce |
| 10 | 강렬 / 실험 | brutalism | brutalist-poster | verified | exposed structure, raw blocks, hard poster energy |
| 11 | 강렬 / 실험 | new-brutalism | brutalist-poster | verified | LOUD LAUNDRY kiosk — machine status grid, cycle builder form, wash rates table |
| 12 | 강렬 / 실험 | anti-design | magazine-layout | verified | broken convention, off-grid navigation, deliberate awkwardness |
| 13 | 강렬 / 실험 | maximalism | street-campaign | verified | PAVONE HOUSE interiors atelier — salon-wall hero, interactive pattern clash console, print index swatches, product shelf |
| 14 | 강렬 / 실험 | glitch-art | cyber-dashboard | verified | UNSTABLE MEDIA editions gallery — artwork viewer with rgb channel drift, file integrity manifest (sha-256), edition activity feed |
| 15 | 강렬 / 실험 | deconstructivism | brutalist-poster | verified | structural fault, fracture section index, displaced project axis |
| 16 | 강렬 / 실험 | avant-garde | magazine-layout | verified | manifesto program, critical lecture rail, art-into-life agenda |
| 17 | 강렬 / 실험 | postmodernism | retro-commerce | verified | PALLADIO & POP auction house — live sale ticker, featured lot bid module, browse-by-era chips |
| 18 | 레트로 / 빈티지 | retro | retro-commerce | verified | SUNNYSIDE 1959 드라이브인 다이너(재작업) — 스타버스트 배지·다이너 실사 창·도티드 리더 menu board(선택 연동)·게스트 체크 car hop ticket·체커보드 밴드, 스타일 가시성 우선 |
| 19 | 레트로 / 빈티지 | vintage | retro-commerce | verified | HOLLOWAY'S APOTHECARY 1874 약제상 포뮬러리(완전 재작업) — 왁스 실 마스트헤드·약제상 실사 창·formulary 인덱스(선택 연동)·조각 apothecary label 카드·materia medica 등록부·이중 괘선, 스타일 가시성 우선 |
| 20 | 레트로 / 빈티지 | seventies-retro | retro-commerce | verified | ROLLERAMA '76 롤러 디스코 랜딩(재작업) — 수퍼그래픽 레인보우 아치·팻 라운드 타이포·아치형 링크 실사 창·session board(선택 연동)·skate hire·스트라이프 밴드, 스타일 가시성 우선 |
| 21 | 레트로 / 빈티지 | eighties-retro | cyber-dashboard | verified | **정석적 synthwave 미디어 콘솔 폐기 → 'NEON NIGHTS VIDEO' 80s VHS 호러 비디오 렌탈점으로 전면 재설계**(Concept originality): 다크 네온 정체성(네이비+마젠타/시안/옐로)은 유지하되 신스웨이브 플레이어(SYNTH CONSOLE·VHS mix queue·arcade control strip)를 버리고 Be Kind Rewind식 심야 렌탈점 리테일로 재구성. 소유자 요청대로 80s 호러 소재. codex로 심야 네온 렌탈점 통로 실사(VHS 선반·네온 사인·CRT 정지화면·블러드레드 반사) 신규 생성해 GENERATED_STYLE_IMAGES 등록. 골격: 네온 스토어프론트 헤더(NEON NIGHTS VIDEO 마젠타 글로우·VHS horror·open till 2am·New/Horror/Members·● OPEN) + STAFF PICK 피처 패널(렌탈점 실사 위 The Midnight Tape·slasher 1986 98min·★4·rent $2, 하단 스크림만으로 이미지 드러냄) + new-release wall(VHS 테이프 케이스 6종 — Neon Slasher/Grave Shift/Prom Night Terror/Static Screams/Cassette from Hell/Chrome Nightmare, 장르 컬러 상단밴드·rental 상태 IN/OUT/DUE 글로우 도트) + rental desk(Neon Nights Video Club 멤버십 카드·Member 0286·since '86 + your rentals due date + be kind rewind·late fee $1/day) + 장르 네온 칩(Horror/Slasher/Sci-Fi/Cult/B-Movie) + 네온 퍼스펙티브 그리드/스캔라인. 비디오 렌탈 리테일 골격이라 이웃(방송숍/종이카탈로그/쿡북/데스크탑진/flight deck/스튜디오/워크숍)과 구조 차별화, Cyberpunk 도시/디스토피아와도 구분. 함수명 EightiesSynthConsole→EightiesVideoRental(라우팅+check-style-distinction 맵), family 마커 갱신(Neon Nights Video/new-release wall/be kind rewind), representativeTraits/tokenIntent 갱신(avoidTraits에 Cyberpunk city dystopia 추가). 장식은 inset-0 overflow-hidden 래퍼로 클리핑. full/compact QA(overflow 0)·lint·check:style-distinction(80s 통과) 통과 |
| 22 | 레트로 / 빈티지 | y2k | retro-commerce | verified | CYBERSHOCK 크롬 미디어 플레이어 스킨(재디자인) — 홀로그래픽 데스크톱 위 크롬 윈도우, LCD now playing·spectrum visualizer·transport controls·playlist(선택 연동), OS 윈도우 스킨 골격 |
| 23 | 레트로 / 빈티지 | retro-futurism | retro-commerce | verified | WORLD OF TOMORROW 모티프 스페시멘(재디자인) — 포스터 마스트헤드·exhibit viewer(선택 모티프 확대)·motif index(원자궤도/스타버스트/부메랑/소서/로켓)·Space Age 팔레트 스트립, 특정 사이트 아닌 스타일 어휘 전시 |
| 24 | 레트로 / 빈티지 | retro-futurism | retro-commerce | verified | FLIGHT DECK, destination poster rail, chrome capsule timetable |
| 25 | 레트로 / 빈티지 | mid-century-modern | minimal-editorial | verified | ATOMIC 미드센추리 리빙 저널(재작업) — 케이스 스터디 하우스 실사 에디토리얼, 번호 핀 가구 주석·the pieces 사이드바(선택 연동)·pull quote, 인테리어 에디토리얼 골격 |
| 26 | 레트로 / 빈티지 | bauhaus | magazine-layout | verified | BAUHAUS SCHOOL, workshop method grid, circle square triangle lab |
| 27 | 미래 / 디지털 | futurism | cyber-dashboard | verified | ORBITAL TRANSIT 마하 회랑 운행 콘솔 — 실버 포드 히어로+MACH velocity 타이포 웨지, Mach corridor map(회랑 선택 인터랙션), Launch window board, live telemetry 스트립 |
| 28 | 미래 / 디지털 | cyberpunk | cyber-dashboard | verified | LUCKY CHROME CLINIC 나이트마켓 리퍼독 터미널 — 네온 골목 실사+사인 스택, implant menu(선택→원장 연동), black-market deck flash, install queue, humanity 게이지, city protocol 해저드 스트립 |
| 29 | 미래 / 디지털 | neon-noir | cyber-dashboard | verified | RED ROOM 심야 탐정 케이스 데스크 — 붉은 네온 비창 실사 풀블리드 스틸, case file 레일(선택→히어로 캡션 연동), rain index 위젯, 절제된 단일광원 누아르 |
| 30 | 미래 / 디지털 | hud | cyber-dashboard | verified | KESTREL GCS 시네마틱 드론 관제 HUD — first-person scene, pitch ladder·roll arc·flight-path vector, calibrated data tapes, waypoint guidance+telemetry rail, ice-blue phosphor·amber caution |
| 31 | 미래 / 디지털 | high-tech | saas-landing | verified | MILLIKELVIN quantum control plane — 골드 cryostat rail 실사+스테이지 래더(300 K→12.9 mK), qubit lattice(큐빗 선택→calibration readout 연동), gate fidelity 트렌드, job queue, 모노 텔레메트리 스트립 |
| 32 | 미래 / 디지털 | ai-aesthetic | saas-landing | verified | MODEL CANVAS generative studio — world-model preview with denoise sweep, prompt bar with style presets, latent queue job states, model index |
| 33 | 미래 / 디지털 | hologram-style | cyber-dashboard | verified | LUMA VOLUME clinical anatomy viewer — four-plane volume chamber, tissue modes, slice control, orientation cube, scan series, pearl/cyan/violet clinical optics |
| 34 | 미래 / 디지털 | chromecore | luxury-product | verified | CHROMEWORKS faceplate shop — chrome-type nameplate, shells standing on a chrome rail (carousel), fitment rail with stock states, order bar |
| 35 | 럭셔리 / 클래식 | classic | luxury-product | verified | CLARENDON HOUSE 클래식 총서 표제지 — 사진 0장, 중심축 대칭 타이틀 페이지 + thick-thin 이중괘 + 플러런, cloth spine shelf(두께·높이 가변 책등 선택), volume record(드롭캡·점선 리더), standing order, colophon |
| 36 | 럭셔리 / 클래식 | neoclassic | luxury-product | queued | columns, museum spacing, disciplined ornament |
| 37 | 럭셔리 / 클래식 | luxury | luxury-product | queued | premium product reveal, rich material, controlled opulence |
| 39 | 럭셔리 / 클래식 | art-deco | luxury-product | verified | MERIDIAN LINE liner booking — S.S. Aurelia hero, sailings board with reserve/waitlist, stateroom class fare cards, grand salon strip |
| 40 | 럭셔리 / 클래식 | art-nouveau | organic-brand | verified | MÉTROPOLITAIN 기마르 파리 메트로 — 리소그래프 프리즈 아피시 헤드(타이틀 밴드가 장식 위에 걸침), 팔레트 전면 교체(Mucha/Tiffany 보라–주황–초록 삼색조), 손으로 그린 비대칭 coup de fouet가 레이아웃 축이자 역 선택 UI, 주철 줄기 마스트헤드, 납선 유리 트랜섬, 역 기록·다음 열차·요금·노선 색인 |
| 41 | 럭셔리 / 클래식 | baroque | luxury-product | verified | TEATRO SAN CASSIANO 바로크 오페라 극장 — 사진 0장, 팔레트 전면 교체(진짜 near-black + 진짜 금박 + 크림슨 레이크), 금박 스크롤워크 프로시니엄, 크림슨 발랑스, 말굽형 palchi 평면도(등급 선택), 배역표·아리아·레퍼토리 |
| 42 | 럭셔리 / 클래식 | rococo | luxury-product | verified | ATELIER DE LA ROCAILLE 보아즈리 조각·금박 공방 — 팔레트 교체(로지 파스텔 → 아이보리+물금박), 로카유 패널 실사, 크기가 다른 패널 필드(contraste), 오너먼트 스케줄·도르 공정 |
| 43 | 럭셔리 / 클래식 | gothic | street-campaign | verified | OPUS FABRICAE 대성당 조영국(fabric) — 팔레트 전면 교체(니어블랙 → 차가운 슬레이트 석재 + 샤르트르 유리), 랜싯 비례 실사 + 뾰족아치 7베이 입면(등급별 유리 충전, 선택 연동), bay record·fabric roll |
| 44 | 자연 / 수공예 | natural | organic-brand | queued | landscape material, earth palette, broad outdoor calm |
| 45 | 자연 / 수공예 | botanical | organic-brand | queued | leaf detail, herbarium structure, plant-specific grid |
| 46 | 자연 / 수공예 | rustic | organic-brand | queued | rough local material, weathered wood, hospitality warmth |
| 47 | 자연 / 수공예 | kinfolk | minimal-editorial | queued | slow lifestyle editorial, linen, natural-light commerce |
| 48 | 자연 / 수공예 | handmade | organic-brand | queued | small-batch irregularity, thread, torn paper, maker shop |
| 49 | 귀여움 / 캐주얼 | kitsch | kawaii-app | verified | ban.do/Lisa Says Gah/Lazy Oaf식 '노벨티 부티크 스토어프론트' 재설계: 마퀴+Clash Cart 내비, 히어로(실사 크롭+★ODD SHOP DROP 뱃지·LIMITED ODDITIES 헤드라인·SHOP THE DROP) · giftable product finder(for/vibe/budget 칩·find my oddity·18 matches) 분할, odd object cards 상품 월(스마일머그·체커토트·디스코볼·하트선글라스 실사 + 선버스트 sticker price bursts·NEW/HOT·컬러웨이 도트), clashing pattern strips/pattern clash rail(checker/dots/wavy/flame/gingham/zigzag CSS 프린트 스와치), drop countdown 바. 두꺼운 검정 테두리·하드 오프셋 그림자·남발 회전(촌스러움) 전부 제거하고 화이트 카드·헤어라인·정제 타입으로 규율, 시그니처는 선버스트 스티커+프린트 스와치 한 곳에 집중. 스토어프론트 골격으로 이웃 kawaii(수집 그리드)·dopamine(원형 대시보드)·bubble(수직 쇼)과 구조 차별화. 필수(ODD SHOP DROP/sticker price bursts/clashing pattern strips)+경험 마커(LIMITED ODDITIES/pattern clash rail/giftable product finder/drop countdown) 전부 충족. KitschPriceBurst 모듈 스코프 헬퍼로 lint 통과, 히어로 오버레이는 GeneratedStyleImageSurface children(z-10)로 전달해 surface gotcha 회피. full/compact QA(overflow 0)·lint·**check:cute-casual 카테고리 전체 통과(9/9)** |
| 50 | 귀여움 / 캐주얼 | kawaii | kawaii-app | verified | Sanrio/Pusheen식 'CHARACTER CLUB' 멤버십 대시보드 재설계: 멤버 배너(hi, mochi member!·하트 카운트·character mood ring) + mascot tiles 수집 그리드(실제 kawaii 이미지·collected/new 상태·4/6 수집) + heart badges 진행 + stamp rewards 카드 + shop tiny treats 라인. 수집-그리드 멤버십 골격으로 이웃 kitsch(테두리 노벨티 샵)·dopamine-design(원형 리워드 대시보드)와 구조 차별화. kawaii 필수(CHARACTER CLUB/mascot tiles/heart badges)+경험 마커(FRIEND CLUB DASHBOARD/character mood ring/stamp rewards/shop tiny treats) 전부 충족, Heart→KawaiiHeart 모듈 스코프 승격으로 lint 통과, full/compact QA(overflow 0)·kawaii 자체 assertion 통과. (카테고리 전체 check:cute-casual은 미구현 kitsch 형제 때문에 여전히 실패 — kawaii 자체는 통과) |
| 51 | 귀여움 / 캐주얼 | dopamine-design | kawaii-app | verified | 게임화 습관/스트릭 대시보드 재설계(Duolingo/Happy Socks 에너지): 무지개 conic COLOR REWARD LOOP + 궤도형 habit orbit 버블 + reward meter(XP) + color pulse cards + reward ladder(티어) + dopamine spectrum 바. 최대 채도 팔레트, 원형-진행 대시보드 골격으로 이웃 kawaii(이미지 카드)·pop-art(에디션 그리드)와 구조 차별화. dopamine 필수+경험 마커 전부 충족, full/compact QA(overflow 0)·lint 통과. (카테고리 전체 check:cute-casual은 kawaii 등 미완성 형제 스타일 때문에 여전히 실패 — dopamine 자체 assertion은 통과) |
| 52 | 귀여움 / 캐주얼 | pop-art | street-campaign | verified | Warhol/Haring/Guggenheim-Pop식 '시리얼 팝 월' 뮤지엄 에디션샵 재설계: 갤러리 마스트헤드(EDITION WALL·POP OBJECT ARCHIVE·museum shop wall) + object edition grid(Warhol Flowers식 반복 오브젝트 SVG를 컬러 순열로 4x2 배열 + Ben-Day halftone block 타일) + SERIAL POP WALL 잉크 플래카드 + museum shop 에디션 레일(flowers serigraph ed.250 $95·ben-day tote $38·soup can mug $24·pop pin ed.500 $12) + halftone caption rail(Ben-Day 도트+SHOP EDITIONS). 기존 프로토타입의 플랫 색블록+placeholder 라벨 제거, PopArtFlower SVG 헬퍼로 실크스크린 반복 오브젝트 구현. 볼드 플랫 컬러는 팝아트 본질로서 시리얼 월 한 곳에 집중, 레일·캡션은 화이트/헤어라인으로 규율. 갤러리-월 지배형 골격으로 이웃 kawaii(상품 수집 그리드)·kitsch(노벨티 스토어)·comic(패널 커버 셸프)과 구조 차별화. 필수(POP OBJECT ARCHIVE/halftone block/repeated object)+경험 마커(SERIAL POP WALL/museum shop wall/halftone caption rail/object edition grid) 전부 충족, full/compact QA(overflow 0)·lint·check:cute-casual(9/9) 통과 |
| 53 | 귀여움 / 캐주얼 | comic-book-style | kawaii-app | verified | Marvel/DC/Webtoons식 '코믹 이슈 리더 페이지' 재설계: 마스트헤드(ISSUE SHELF·ISSUE DROP·vol.4 #042) + 불규칙 코믹 페이지(잉크 패널 스플래시 커버 — codex 생성 실버에이지 로켓 SF 커버 아트 + ★ISSUE DROP 버스트·speech balloon(꼬리 포함)·ROCKET CITY 타이틀 배너 오버레이 + 3개 시퀀셜 panel preview(MEANWHILE/VROOOM/LOOK UP 캡션)) + 리더 레일(COVER READER SHELF=series queue 미니 커버 #041~043·episode metadata #042 22pp ★4.8·creator credit line) + 리더 컨트롤(prev·진행바 p.8/22·read issue). Ben-Day 도트 배경·잉크 패널 거터로 코믹 정체성, 초기 안전거부(슈퍼히어로)→인물 없는 로켓 SF 커버로 우회. 기존 프로토타입의 플랫 색블록+placeholder 라벨 제거. 불규칙 서사형 코믹-페이지 골격으로 이웃 pop-art(균일 시리얼 실크스크린 그리드)와 구조 차별화. 히어로 오버레이는 GeneratedStyleImageSurface를 absolute inset-0 span으로 감싸 surface gotcha 회피. 필수(ISSUE DROP/speech balloon/episode metadata)+경험 마커(COVER READER SHELF/panel preview/creator credit line/series queue) 전부 충족, full/compact QA(overflow 0)·lint·check:data·check:cute-casual(9/9) 통과 |
| 54 | 귀여움 / 캐주얼 | toy-design | kawaii-app | verified | LEGO/Play-Doh/Fisher-Price식 '모듈러 플레이셋 빌드 컨피규레이터' 재설계: 헤더(playset works·PLAYSET BUILDER·age range selector 3+/6+/9+ 청키 탭) + assembly tray 빌드 캔버스(페그보드 위 실제 플라스틱 브릭 디오라마 — 스터드/광택/그림자 브릭으로 지은 집(문·창문·박공지붕)+나무+조립 대기 loose 브릭+지붕에 끼워지는 브릭+스터드 베이스플레이트, 하늘 해·구름으로 박스아트 신, MODULAR PLAYSET SHOP 플래카드·pcs 스테퍼) + block parts 빈(2×2/1×4/2×3/1×2 브릭·수량) + build pattern chooser(house/rocket/car) + instruction rail(base/walls/roof/done 스텝+add set $39). 기존 프로토타입의 플랫 색블록 4개(촌스러움) 제거, ToyBrick SVG-free 글로시 브릭 헬퍼로 실물 조립 구현(초기 계단식 막대 스택은 '기이한 스택'으로 읽혀 한눈에 알아보는 집 디오라마로 교체). 컨피규레이터-워크스페이스 골격으로 모든 이웃(스토어/그리드/대시보드/쇼케이스/에디토리얼/앱/갤러리월)과 구조 차별화. 필수(PLAYSET BUILDER/block parts/assembly tray)+경험 마커(MODULAR PLAYSET SHOP/age range selector/instruction rail/build pattern chooser) 전부 충족, full/compact QA(overflow 0)·lint·check:cute-casual(9/9) 통과. **→ 귀여움/캐주얼 9개 스타일 전부 verified** |
| 55 | 귀여움 / 캐주얼 | playful-design | kawaii-app | verified | Duolingo/Headspace/Mailchimp식 '가이드 조이 플로우' 친근한 온보딩 앱 재설계: 앱 헤더(🌱 guide garden·day 3 +40xp) + 마스코트 코치 카드(PLAYFUL ONBOARD·guided joy flow·스프라우트 캐릭터 SVG·speech bubble mascot walkthrough) + soft progress path 4노드 스텝퍼(done/active/todo) + gentle task cards/task completion stack 세로 체크리스트(pick focus·meet guide·2-min step·reminder, done/resume/+15xp 상태) + continue CTA. 기존 프로토타입의 클립아트 원형 마스코트·플랫 색블록 4개(촌스러움) 제거, PlayfulMascot SVG 헬퍼로 캐릭터 정성 렌더+정제된 소프트 팔레트(coral/mint/butter/periwinkle)·화이트 카드. 세로 앱 온보딩 피드 골격으로 이웃 kawaii(수집 그리드)·pastel(에디토리얼 이미지 밴드)·dopamine(원형 대시보드)·kitsch(노벨티 스토어)와 구조 차별화. 필수(PLAYFUL ONBOARD/mascot helper/gentle task cards)+경험 마커(GUIDED JOY FLOW/mascot walkthrough/task completion stack/soft progress path) 전부 충족, task stack justify-between으로 여백 균형, full/compact QA(overflow 0)·lint·check:cute-casual(9/9) 통과 |
| 56 | 귀여움 / 캐주얼 | pastel-style | kawaii-app | verified | Glossier/Bubble Skincare/Starface식 '파스텔 뷰티 에디토리얼' 재설계: 에디토리얼 마스트헤드(SOFT EDIT·Tint Journal·no.07 skin-tint season) + 와이드 저대비 히어로(파스텔 뷰티 실사 + PASTEL BEAUTY EDIT 세리프 마스트헤드) + shade story 스와치 레일(porcelain/blush/peach/mauve/lilac/mint·언더톤) + editorial product shelf 상품 4장(tint serum/cushion tube/cloud jar/cream pot 실사 크롭·shade·price) + airy product rows·low-contrast set 캡션 + skin tint planner 바(언더톤/피니시 칩·matched 06·find my tint). codex image gen으로 파스텔 뷰티 플랫레이 실사 신규 생성(scripts PROMPTS pastel-style 추가, GENERATED_STYLE_IMAGES 등록). 기존 프로토타입의 플랫 파스텔 알약 블록·추상 01/02/03 필·제네릭 스와치 스트립(촌스러움) 전부 제거, 이미지 지배형 풀폭 에디토리얼 밴드 골격으로 이웃 kitsch(밀도높은 노벨티 스토어)·kawaii(수집 그리드)·bubble(수직 캔 쇼)과 구조 차별화. 히어로 오버레이는 GeneratedStyleImageSurface children(z-10)로 전달. 필수(SOFT EDIT/airy product rows/low-contrast set)+경험 마커(PASTEL BEAUTY EDIT/shade story/skin tint planner/editorial product shelf) 전부 충족, full/compact QA(overflow 0)·lint·check:data·check:cute-casual(9/9) 통과 |
| 57 | 귀여움 / 캐주얼 | bubble-design | kawaii-app | verified | **뻔한 음료 브랜드 폐기 → 'AQUA DESK' Frutiger Aero / Mac OS X Aqua 데스크탑으로 전면 재설계**(개성/특징성 강화 요청): 소유자 지시대로 소다 브랜드(Pop Fizz·EFFERVESCENT FLAVOR LAB·flavor carousel·can shelf)를 전부 버리고, 가상 물방울 OS의 실제 데스크탑 UI로 재구성. codex로 Frutiger Aero wallpaper 실사(글로시 매크로 물표면·공기방울·이슬·하늘블루→아쿠아 그라디언트·스파클) 신규 생성해 기존 소다 캔 이미지 교체, 데스크탑 배경으로 드러냄. 골격: 반투명 글래스 **메뉴바**(물방울 젤 글리프·BUBBLE FLOW OS명·File/Edit/View/Window·아쿠아 wifi 아크/젤 배터리/9:41) + 떠 있는 글래스 창들(핀스트라이프 타이틀바·캔디 신호등 젤 버튼·Favorites 사이드바+window shelf 파일 리스트=Aqua Reef/Bubble Stream/Splash Kit… gel 아이콘·kind·size) + 원형 **droplet widget**(물방울 SVG·21°·Aqua Bay, 글로스 하이라이트) + **liquid progress** 젤 볼륨 슬라이더(핀스트라이프 액체 채움 72%·젤 노브) + 반사형 아쿠아 **glass dock**(inflated capsules=글로시 젤 아이콘 6개·확대·running-indicator 도트). representativeTraits 5개(Inflated capsules/Liquid progress/Circular product modules/Sparkling surface/Floating flavor cards)를 아쿠아 형태로 전부 실모듈 보존. OS/윈도우 UI 골격이라 이웃 전부(앱 온보딩·에디토리얼·노벨티 스토어·수집 그리드·원형 대시보드·컨피규레이터)와 구조 완전 차별화. wallpaper는 GeneratedStyleImageSurface overlay="none"을 absolute inset-0 span으로 감싸 surface gotcha 회피. check-cute-casual 마커 갱신(소유자 승인): 필수 유지(BUBBLE FLOW/inflated capsules/liquid progress) + experience 교체(AQUA DESKTOP/glass dock/droplet widget/window shelf), forbidden prototype copy를 Pop Fizz·sparkling drinks·소다 마커로 갱신해 회귀 차단. 함수명 BubbleFlowCapsules 유지. full/compact QA(overflow 0)·lint·check:cute-casual(9/9) 통과(compact 썸네일은 aspect-[16/7] 공통 크롭으로 상단 메뉴바+글래스 창+물 wallpaper만으로도 아쿠아 OS 즉시 인식) |
| 58 | 스트리트 / 서브컬처 | graffiti | street-campaign | verified | WALLDEX 스트리트아트 문서화 UI. 캐노니컬 5 trait 라벨(Graffiti wall scanner/Wall tag index/Spray color rack/Mural route map/Crew tag archive) 반영, check 마커 통과. full/compact QA·lint 통과 |
| 59 | 스트리트 / 서브컬처 | hiphop-style | street-campaign | verified | Black & Gold Album Studio 리디자인: 전용 팔레트+토큰, 스튜디오 히어로 이미지, 5 trait 전부. full/compact QA·lint·street-subculture 마커 통과 |
| 60 | 스트리트 / 서브컬처 | punk | street-campaign | verified | 제록스 팬진 1면 재설계: 전용 종이 팔레트(잉크/블러드레드/애시드라임)+토큰 오버라이드, 랜섬노트 헤드라인, 배틀재킷 하프톤 히어로(codex image gen), 실제 멀티컬럼 신문 골격(리드/레코드리뷰/공연·패치·메일오더 사이드바). 앞뒤 skate(모듈그리드)·grunge(이미지분할)와 구조 차별화. 5 trait 마커 유지, full/compact QA(overflow 0)·lint·check 통과 |
| 61 | 스트리트 / 서브컬처 | grunge | street-campaign | queued | distressed texture, muted dirt, rough band archive |
| 62 | 스트리트 / 서브컬처 | indie-sleaze | street-campaign | verified | 실제 플래시 파티 사진 히어로(codex image gen) 추가: 중앙 FLASH FEED·디스포저블 카메라 그리드·미러 플래시 스택을 실제 사진 크롭으로 교체. 네온 팔레트·5 trait·구조 마커 유지, full/compact QA·lint·check 통과 |
| 63 | 스트리트 / 서브컬처 | rave-style | cyber-dashboard | verified | 웨어하우스 스테이지 타임테이블 재설계: Resident-Advisor식 시간×스테이지 매트릭스(4 스테이지·8 타임슬롯, 네온 set-block+bpm), 레이저 웨어하우스 히어로 밴드(codex image gen)·사운드 미터·티켓 티어·on-air 타일. 앞뒤 indie-sleaze(이미지 히어로 분할)·lo-fi(이미지+플로팅 글래스)와 구조 차별화(UI 매트릭스 지배형). 5 trait 마커 유지, 구조 마커 갱신, full/compact QA(overflow 0)·lint·check 통과 |
| 64 | 스트리트 / 서브컬처 | lo-fi | retro-commerce | verified | "실질적인" 라디오 스테이션 UI로 컴포넌트 리얼리즘 보강: 색깔 스와치였던 샘플러 패드를 실라벨(kick/snare/hat 등)+활성 상태 패드 그리드로, 장식용 노브 2개를 실제 prev/play-pause/next 트랜스포트 버튼으로, 프로그레스바+웨이브폼 혼재를 재생/미재생 구간이 구분된 진짜 웨이브폼 스크러버(경과/전체 시간 표시)로, 큐 리스트에 트랙 길이·활성 트랙 하이라이트 추가. 리스닝룸 사진+ON AIR 라이브 인디케이터 유지, 5 trait 마커 유지, full/compact QA(overflow 0)·lint·check 통과 |
| 65 | 편집 / 타이포그래피 | typography-focused | magazine-layout | queued | type scale specimen, baseline rhythm, font pairing shelf |
| 66 | 편집 / 타이포그래피 | editorial-design | magazine-layout | queued | longform article desk, pull quote, photo essay stack |
| 67 | 편집 / 타이포그래피 | magazine-style | magazine-layout | queued | issue browser, cover wall, department navigation |
| 68 | 편집 / 타이포그래피 | posterism | brutalist-poster | queued | single-message poster wall, campaign impact |
| 69 | 편집 / 타이포그래피 | grid-system | magazine-layout | queued | column ruler, module matrix, layout method |
| 70 | 편집 / 타이포그래피 | collage | magazine-layout | queued | cut paper desk, tape layers, mixed media |
| 71 | 편집 / 타이포그래피 | photomontage | magazine-layout | queued | photo collision, masks, campaign narrative |
| 72 | 편집 / 타이포그래피 | experimental-type | brutalist-poster | queued | glyph mutation, variable forms, type as material |
| 73 | 편집 / 타이포그래피 | newspaper-style | magazine-layout | queued | masthead, headline stack, dense columns |
| 74 | UI / 웹 | flat-design | saas-landing | queued | solid fill modules, no-depth buttons, simple icon logic |
| 75 | UI / 웹 | material-design | saas-landing | queued | elevation stack, state layers, component physics |
| 76 | UI / 웹 | neumorphism | saas-landing | queued | inset controls, double shadow, tone-on-tone tactile UI |
| 77 | UI / 웹 | glassmorphism | saas-landing | queued | frosted cards, blur depth, translucent layering |
| 78 | UI / 웹 | claymorphism | kawaii-app | queued | puffy 3D modules, pastel extrusion, playful app commerce |

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

## 7. warm-minimal — 사진 제로 재작업 (2026-07-20, 소유자 지시)

- 소유자 지시: "이미지 사용을 최대한 줄인 채로 Warm Minimal 분위기를 레이아웃·UI·디자인 형식으로 내라. 하위 모델은 /codex:setup." 기계적 구현은 Codex(codex exec, 함수 단위 정확 치환)에 위임하고 설계·검증은 리드가 수행.
- 변경 요약: `WarmMinimalStudio`(Atelier Warm — 실사 히어로 + 썸네일 3장) → "Atelier Sol"로 재구축, **사진 요소 0장**. 골격: 좌측 정렬 콰이어트 nav(Atelier Sol · INTERIORS · Projects/Contact) → 타이포 히어로(WARM STUDIO PORTFOLIO 키커·2줄 헤드라인 "Rooms that keep / the morning light."·terracotta consultation CTA 필) + **아치 니치 3연작**(CSS 전용: 석고+리넨 위브 아치 / 새벽빛 그라디언트+낮은 태양+수평선 아치 / 점토+원형 창 아치, 높이 리듬 78%/100%/62%) → linen project stack(썸네일 대신 재질색 미니 아치 글리프, 1행 active) → material palette rail(plaster/linen/clay/terracotta 명명 스와치 + Warsaw 스튜디오 메타).
- 스타일 가시성: 크림 표면·아치 조형·리넨 위브 텍스처·테라코타 한 점이 골격 그 자체 — 사진 없이 한눈에 웜 미니멀([[style-visibility-over-vehicle]] 적용). 팔레트·토큰·distinction family 마커 3종(WARM STUDIO PORTFOLIO/terracotta consultation CTA/linen project stack)·함수명 유지로 체크 스크립트 무변경.
- Codex 위임 검증: 치환 결과를 리드가 직접 대조(함수 경계·라우팅·`slug="warm-minimal"` 사용 0건 확인), codex 자체 검증(lint·distinction)도 통과. 이후 리드가 폴리시 3건 수행 — 헤드라인 고아 단어(nbsp+1.9rem로 2줄 고정), 모바일 단일 컬럼 스택(sm 미만, 아치 트리오 min-h-[9rem]), nav 크런치(PL·EN 아이콘 제거·sub "Interiors"·2링크)로 브랜드 트렁케이션 해소.
- browser QA: 1280 full(614×540)·375 모바일(284)·compact 카드 모두 page overflow 0·비의도 클리핑 0, brand/sub scrollWidth 검사 통과. 사진 요소 0 확인. 콘솔 error는 기존 3건(distortion rail 등, 타 스타일 소관)뿐.
- 데이터: description/visualFeatures/layoutTraits를 사진 전제 → 조형 전제로 갱신, representativeTraits "Soft project cards"→"Arch niche composition". 구분표 warm-minimal 행 갱신(photography-free arch/material forms). `GENERATED_STYLE_IMAGES` 맵 항목과 webp 자산은 잔존하나 샘플에서 미사용(무해).
- 명령: `check:data`(78)·`check:style-distinction`(78)·`check:style-refs`(78)·`npm run lint`·`next build` 통과.
- screenshots: `wm-full-final.jpeg`, `wm-mobile-v3.jpeg`, `wm-compact-v1.jpeg`.
- 남은 의심점: 없음.

## 스타일 제거 기록

### streetwear · skate-culture — 완전 제거 (2026-07-19, 소유자 지시)

- 소유자 지시: "Skate Culture와 Streetwear를 없애줘." 대체 스타일 없이 완전 삭제.
- 스트리트 / 서브컬처 카테고리 9개 → 7개(graffiti, hiphop-style, punk, grunge, indie-sleaze, rave-style, lo-fi)로 축소. 전체 스타일 수 87 → 85.
- 제거 범위: `src/data/designStyles.ts`(palettes/paletteBank 인라인 대체·styleSeedTuples·streetSubcultureResearch·styleTokenOverrides·styleMoodboards 6곳), `DesignStyleSampleRenderer.tsx`(GENERATED_STYLE_IMAGES 2건·`StreetwearDropEditorial`/`SkateCultureSpotBoard` 함수 전체·라우팅 2건·PunkZineDispatch 잔여 주석 정리), `scripts/check-street-subculture.mjs`(6개 배열/맵)·`check-style-distinction.mjs`(2곳)·`check-data.mjs`(최소 카운트 가드 87→85)·`gen-style-image.mjs`(PROMPTS 2건)·`style-references.json`(JSON 블록 2건), 이미지 자산 4개(`public/generated/moodboards/{streetwear,skate-culture}-realistic-v2.webp`, `public/generated/design-styles/{streetwear,skate-culture}.webp`) 삭제.
- 인접 스타일 cross-reference 정리: `docs/style-category-distinction-table.md`에서 두 행 삭제, old-money·graffiti의 "겹치기 쉬운 스타일" 컬럼에서 죽은 참조 제거.
- 전체 순회 큐 표를 85행으로 재넘버링(1-85 연속). 기존 아카이브 범위(01-09/10-17/18-26)는 제거된 두 스타일(구 번호 63·66)보다 앞이라 영향 없음.
- 부수 발견: `check-street-subculture.mjs`의 lo-fi `requiredStructureMarkers`가 `"aspect-square rounded-full"`을 기대했으나 실제 마크업은 이미 `rounded-[2px]`로 리디자인되어 있던 기존 drift(이번 제거와 무관, stash로 사전 존재 확인) — 체크 문자열을 실제 마크업에 맞게 수정.
- 검증: `check:data`(85 styles/10 categories)·`check:street-subculture`(7/7)·`check:style-distinction`(85)·`check:style-refs`(85)·`check:future-digital`(8)·`check:cute-casual`(9)·`npm run lint`·`next build` 전부 통과.
- 남은 의심점: 없음.
- 커밋: `8db6dcf`.

### dark-mode-design · saas-style · startup-landing-page — 완전 제거 (2026-07-19, 소유자 지시)

- 소유자 지시: "다크 모드 디자인, Saas 스타일, 스타트업 랜딩 페이지도 없애줘." 대체 스타일 없이 완전 삭제. 세 스타일 모두 `queued`(미착수) 상태였음.
- UI / 웹 카테고리 8개 → 5개(flat-design, material-design, neumorphism, glassmorphism, claymorphism)로 축소. 전체 스타일 수 85 → 82.
- 제거 범위: `src/data/designStyles.ts`(styleSeedTuples 3행·styleMoodboards 3블록 — 이 세 스타일은 palette/research/tokenOverrides 전용 항목이 없어 6곳 중 2곳만 해당), `DesignStyleSampleRenderer.tsx`(`DarkModeOpsConsole`/`SaasStyleOperationsHome`/`StartupLandingStory` 래퍼 함수 3개·라우팅 3건 삭제, 공유 컴포넌트 `UiWebDistinctionSample` 내부의 이제-도달불가능한 `"dark"`/`"saas"` 분기와 기본(`"startup"`) 분기까지 함께 제거하고 `UiWebLayout` 유니언 타입을 5개로 축소, 함수 끝은 `return null;`로 안전 폴백), `check-style-distinction.mjs`(categorySlugOrder·styleSampleFunctions·requiredFamilyMarkers 3곳)·`check-data.mjs`(최소 카운트 가드 85→82)·`style-references.json`(JSON 블록 3건, 파일 끝 trailing comma 정리), 이미지 자산 3개(`public/generated/moodboards/{dark-mode-design,saas-style,startup-landing-page}-realistic-v2.webp`, design-styles 폴더에는 애초에 히어로 이미지 없음) 삭제.
- 인접 스타일 cross-reference 정리: `docs/style-category-distinction-table.md`에서 세 행 삭제, flat-design·glassmorphism(같은 UI/웹 섹션)과 international-style·neon-noir·high-tech·ai-aesthetic·gothic(다른 카테고리 5곳)의 "겹치기 쉬운 스타일" 컬럼에서 죽은 참조 제거.
- 전체 순회 큐 표를 82행으로 재넘버링(1-82 연속).
- 부수 확인: 이번 정리로 `MarkerRail` 중복 React key 경고(`feature proof grid`, `funnel sequence`) 두 건이 함께 사라짐 — `saas-style`/`startup-landing-page`가 삭제된 dead 분기에서 `config.subMarker`/`config.tertiaryMarker` 값이 같은 분기 안의 하드코딩 리터럴과 우연히 같아 발생하던 실제 버그였음(세션 내내 "무관한 기존 경고"로 지나쳤던 것의 진짜 원인). `distortion rail`·`soft 3D modules`·`no-depth buttons` 등 나머지 중복 key 경고는 여전히 남은 다른 스타일(claymorphism 등) 소관이라 미해결 상태 유지, 이번 작업 범위 밖.
- 검증: `check:data`(82 styles/10 categories)·`check:style-distinction`(82)·`check:style-refs`(82)·`check:street-subculture`(7/7)·`check:future-digital`(8)·`check:cute-casual`(9)·`npm run lint`·`next build` 전부 통과.
- 남은 의심점: 없음.
- 커밋: `066ee6d`.

### organic-design · eco-design · craft · wabi-sabi — 완전 제거 (2026-07-19, 소유자 지시)

- 소유자 지시: "에코디자인, 오가닉 디자인, 와비사비, 크래프트도 없애줘." 대체 스타일 없이 완전 삭제. 네 스타일 모두 `queued`(미착수) 상태였음.
- 자연 / 수공예 카테고리 9개 → 5개(natural, botanical, rustic, kinfolk, handmade)로 축소. 전체 스타일 수 82 → 78.
- 제거 범위: `src/data/designStyles.ts`(palettes — organic-design은 paletteBank 참조를 값 인라인으로 대체 후 키 삭제, 나머지 세 개는 paletteBank 미참조라 바로 삭제·styleSeedTuples 4행·styleTokenOverrides 4블록·styleMoodboards 4블록 — 이 네 스타일은 research override 전용 항목이 없어 4곳 중 3곳만 해당), `DesignStyleSampleRenderer.tsx`(GENERATED_STYLE_IMAGES 3건 — eco-design은 애초에 히어로 이미지 없음, `OrganicDesignApothecary`/`EcoImpactSystem`/`CraftWorkshopLedger`/`WabiSabiTeaGallery` 함수 전체 삭제·라우팅 4건 삭제, 공유 헬퍼 `NaturalHandmadeBottomStrip`은 남은 5개 스타일이 계속 쓰므로 보존), `check-style-distinction.mjs`(categorySlugOrder·styleSampleFunctions 2곳 — requiredFamilyMarkers 항목은 원래 없었음)·`check-data.mjs`(최소 카운트 가드 82→78)·`gen-style-image.mjs`(PROMPTS 3건 — eco-design은 프롬프트도 없었음)·`style-references.json`(JSON 블록 4건), 이미지 자산 7개(`public/generated/design-styles/{organic-design,craft,wabi-sabi}.webp` + `public/generated/moodboards/{organic-design,eco-design,craft,wabi-sabi}-realistic-v2.webp`) 삭제.
- 인접 스타일 cross-reference 정리: `docs/style-category-distinction-table.md`에서 네 행 삭제, natural·rustic·kinfolk·handmade(같은 섹션)와 japandi(다른 카테고리)의 "겹치기 쉬운 스타일" 컬럼에서 죽은 참조를 남은 스타일로 교체/제거.
- 전체 순회 큐 표를 78행으로 재넘버링(1-78 연속).
- 검증: `check:data`(78 styles/10 categories)·`check:style-distinction`(78)·`check:style-refs`(78)·`check:street-subculture`(7/7)·`check:future-digital`(8)·`check:cute-casual`(9)·`npm run lint`·`next build` 전부 통과.
- 남은 의심점: 없음.

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

## 29. neon-noir (미래 / 디지털)

### 현재 판정

- status: `reviewing` → 재설계 착수.
- 현재 샘플(`NeonNoirCinema`): RED ROOM 워드마크·rain index 칩·헤드라인은 있으나 "스틸"이 그라디언트+사선 패턴 가짜 이미지이고, 하단 4타일(witness/motel/signal/rain)이 그라디언트 위 라벨뿐인 placeholder. 시네마틱 실사 없이 분위기를 흉내만 냄.
- moodboard 신호(`neon-noir-realistic-v2.webp`): 칠흑 배경, 레드/마젠타/블루바이올렛 네온이 반사된 젖은 밤거리, 비 맺힌 유리 매크로, 붉은 블라인드 광선이 드는 방(red room focal light), 연기, 필름 스틸 프레이밍, **이미지+절제된 바 몇 개**뿐인 레이아웃. 밀도가 아니라 절제.
- 토큰: base `#0A0A10`, surface `#14141F`, accent `#FF2E63`(레드핑크), accent2 `#5B6CFF`(블루바이올렛), accent3 `#FF8FB1`. representativeTraits: Rain-lit case files/Red room focal light/Low-key cinematic framing/Noir typography/Single-source glow.
- 인접 구분: cyberpunk(방금 구축한 네온 클러터·해저드·상거래 밀도)와 정반대 — 단일 광원, 넓은 암부, 시네마 에디토리얼 페이싱. avoidTraits 명시: Full cyberpunk clutter/Generic dark agency hero. glitch-art(신호 손상)·eighties-retro(신스 옵티미즘)와도 톤 구분.

### referenceSites에서 가져올 웹 문법

- Exo Ape: 이미지 지배 히어로, 드라마틱 명암, 절제된 타이포 오버레이, 무디한 포트폴리오 리듬.
- Locomotive: 몰입형 다크 스토리텔링, 시네마틱 전환 페이싱, 최소한의 크롬.
- Dribbble neon-noir: 케이스파일 카드, 레드-블루 라이팅, 필름 스틸 프레임, red room 모티프.

### 목표

- 컨셉: **"RED ROOM" — 심야 사립탐정 사무소의 케이스 데스크**. 정석적 '다크 에이전시 히어로'를 피하고, 열려 있는 사건 파일을 넘겨보는 야간 데스크로 구체화. 시네마 문법(스틸 프레임·슬러그라인·프레임 카운터)을 UI로 번역.
- 고유 마커: `RED ROOM`(워드마크)·`rain index`(기상 위젯)·`case file`(도시에 캡션/레일) — check-future-digital 요구와 일치.
- 정보 구조: 콰이어트 마스트헤드(RED ROOM·Cases/Stills/Archive·night desk 라벨) → 풀블리드 시네마틱 스틸(codex 생성: 비 맺힌 창 너머 붉은 네온·블라인드 광선·단일 광원) 위 필름 캡션(case file 번호·노아르 헤드라인·슬러그라인)+rain index 위젯+still 프레임 카운터 → 하단 case file 레일(3건 도시에: 번호·제목·status open/cold/closed·last entry, 선택 시 히어로 캡션·카운터 연동).
- 시각 처리: 근흑 배경 위 이미지가 주인공, 레드/블루 액센트는 글로우 한 곳씩만, 와이드 레터스페이싱 노아르 타이포, 헤어라인 룰. 밀도 대신 암부와 여백. 비 스트릭은 이미지 실사에 맡기고 UI 장식은 최소.

### 검증 계획

- RED: 구 placeholder 타일(witness/motel/signal/rain 그라디언트) 제거 확인, distinction 맵 갱신.
- GREEN: 마커 3종 렌더, check:future-digital·check:style-distinction 통과.
- browser QA: full/모바일/compact Playwright, 가로 overflow 0, 내부 클리핑 0, 케이스 선택 연동 확인.

### 구현 및 검증 결과

- status: `verified` (2026-07-18).
- 변경 요약: `NeonNoirCinema` 프로토타입(그라디언트 가짜 스틸 + witness/motel/signal/rain placeholder 타일) 삭제 → 위임 래퍼 `NeonNoirCaseDesk` + 분리 컴포넌트 `RedRoomCaseDesk.tsx`(use client, 케이스 선택 useState). codex로 누아르 실사 신규 생성(`public/generated/design-styles/neon-noir.webp` — 비 맺힌 창 너머 붉은 네온 단일 광원·블라인드 광선·로터리 전화기 실루엣·담배 연기·블루바이올렛 보조 반사). 골격: 콰이어트 마스트헤드(RED ROOM 와이드 트래킹+레드 글로우·Cases/Stills/Archive·night desk · open till 4·03:12 AM) → 풀블리드 시네마틱 스틸(하단 42%만 스크림, 이미지가 페이지의 주인공) 위 case file 칩·rain index 위젯(블루 바 그래프·92/heavy)·필름 캡션(still 카운터+슬러그라인·노아르 헤드라인·40mm 크레딧 라인)·surveillance still 레코딩 펄스(nn-rec, reduced-motion 대응) → Case file rail(3건 도시에: Case 07 The Marlow Job OPEN/Case 04 Glass Harbor COLD/Case 11 Vesper Motel CLOSED, 레드 좌측 룰 활성 표시). 케이스 클릭 시 히어로 헤드라인·슬러그·스틸 카운터·case file 칩 연동 갱신 확인.
- representativeTraits: Rain-lit case files(케이스 레일+비창 스틸)·Red room focal light(붉은 단일 광원 실사)·Low-key cinematic framing(풀블리드 스틸+암부)·Noir typography(와이드 트래킹 워드마크+대형 헤드라인)·Single-source glow(레드 글로우 한 곳 집중) 전부 실모듈. avoidTraits 준수 — cyberpunk 클러터 없음, 위젯 2개·레일 1개로 절제.
- 마커: 필수(RED ROOM/rain index/case file) 소스+렌더 충족(워드마크 리터럴 대문자로 수정), family 마커 신설(RED ROOM/Case file rail/rain index/night desk).
- browser QA: full 데스크톱(694px)·모바일(284px: nav/night desk/surveillance 태그 숨김·워드마크 축소·케이스 레일 세로 스택)·compact 모두 page overflow 0 + 내부 클리핑 0. Screenshots: `neon-noir-redroom-full-final2.png`, `neon-noir-redroom-mobile-v2.png`, `neon-noir-redroom-compact.png`.
- 명령: `npm run lint`·`check:future-digital`·`check:style-distinction`·`check:data` 통과.
- 남은 의심점: 없음.
- 다음 style: No. 30 `hud` (구 techwear — 스타일 자체 교체).

## 30. hud (미래 / 디지털) — 구 techwear 스타일 교체

### 현재 판정

- status: `reviewing` → **스타일 자체 교체(소유자 지시: "테크웨어를 hud로 아예 바꿔버리고 싶어")**.
- 기존 techwear는 스타일 로우·팔레트·리서치·무드보드·style-references.json·체크 2종·구분표에서 제거하고 `hud`(헤드업 디스플레이/FUI)로 대체. 기존 `TechwearSystem` 샘플(SHELL SYSTEM 가먼트 그리드 프로토타입)도 삭제.
- 새 정체성: first-person overlay framing — 장면 위에 계기(레티클·pitch ladder·데이터 테이프·코너 클러스터)를 얇은 모노라인+아이스 블루 글로우로 겹쳐 그리는 FUI. 카드 대시보드가 아니라 "장면 위 오버레이"가 골격.
- 팔레트 신설: base `#04080A`, accent 아이스 블루 `#4FA9FF`, accent2 페일 시안 `#8FE9FF`, accent3 앰버 코션 `#FFB13B`. 토큰 오버라이드(모노 폰트·radius 2px·glow) 추가.
- 인접 구분: high-tech(카드형 control plane 대시보드)와는 오버레이-온-신 심볼로지로, hologram-style(프리즘 깊이)과는 단색 콜드 블루 규율로, cyberpunk(도시 상거래)와는 계기 로직으로 구분.

### referenceSites에서 가져올 웹 문법

- HUDS+GUIS: FUI 아카이브 — 계기 오버레이·스크린 그래픽 문법의 정본.
- Territory Studio / Perception: 시네마틱 HUD 시퀀스, 얇은 스트로크 계기 기하, 레티클/타겟록 언어.

### 목표

- 컨셉: **"KESTREL GCS" — 웹 기반 드론 그라운드 컨트롤 스테이션의 라이브 FPV Flight OSD**. 정석적 '전투기 조종석 HUD'를 피하고, 실존 장르(Betaflight OSD/GCS)의 첫인칭 오버레이로 구체화.
- 고유 마커: `FLIGHT OSD`·`pitch ladder`·`battery cell`(check-future-digital), family `KESTREL GCS`/`FLIGHT OSD`/`pitch ladder`/`waypoint`(check-style-distinction).
- 정보 구조: 얇은 GCS 앱 크롬(KESTREL GCS·Flight OSD/Missions/Replay/Fleet·LINK LQ·ARMED 블링크) → 풀블리드 FPV 뷰포트(codex 항공 실사) 위 오버레이 — 코너 브래킷, FLIGHT OSD 미션 클러스터(MSN·T+타이머), heading tape(042° 박스), 좌/우 speed·alt 데이터 테이프, 중앙 레티클+pitch ladder(±10 눈금·수평선), 장면에 핀된 waypoint 마커 2종(WP 3/HOME, 클릭 선택→우하단 readout 연동), 좌하단 battery cells(4셀 바·앰버 저전압), 하단 상태줄(ARMED·GPS HOLD·WIND 앰버) — 전부 얇은 모노라인+아이스 블루 글로우(소유자 지시로 그린→블루 전환), 채운 카드 금지.

### 검증 계획

- RED: techwear 마커(SHELL SYSTEM/garment matrix)를 retired 리스트로 회귀 차단, techwear 슬러그 라우팅/체크 제거 확인.
- GREEN: hud 마커 렌더, check:data·check:future-digital·check:style-distinction 통과, /ko/styles/hud 라우팅 + 목록에서 techwear 카드 소멸 확인.
- browser QA: full/모바일/compact overflow 0, waypoint 선택 연동. 이미지 2장(FPV 배경·무드보드) 생성 후 최종 시각 QA.

### 최종 검증 (2026-07-18)

- status: `verified`.
- 시네마틱 실전 관제형으로 보강: 중앙 pitch ladder·roll arc·flight-path vector, 좌우 숫자형 speed/alt data tape, 선택 waypoint guidance line, 선택값 연동 telemetry rail(distance/ETA/target altitude/action), 배터리 앰버 caution과 절제된 scanline을 실제 DOM 계기로 구현.
- waypoint QA: `WP 3`(210 M/ETA 00:48/TGT 132 M/SURVEY PASS)에서 `HOME`(320 M/ETA 01:12/TGT 090 M/RTH READY)으로 클릭 시 `aria-pressed`, marker, guidance, telemetry가 함께 전환됨.
- image QA: 새 `public/generated/design-styles/hud.webp`(1536×1024)와 `public/generated/moodboards/hud-realistic-v2.webp`(1536×960) 생성·직접 검사. 장면에는 baked-in UI가 없고, 무드보드는 읽을 수 있는 문구·로고 없이 실제 아세테이트/광학 유리/금속 계기 리서치 보드로 판정.
- browser QA: `/ko/styles/hud` 1280×900 full과 375×812 mobile, `/ko/styles` compact에서 page overflow `0`; compact에서도 KESTREL GCS·현재값·중앙 계기·waypoint·battery caution 유지. `prefers-reduced-motion`에서 HUD animation-name `none` 확인.
- console: 깨끗하게 재시작한 HUD 상세 페이지는 error 0. 목록 페이지의 기존 중복 React key 경고(`distortion rail`, `soft 3D modules`, `feature proof grid`, `funnel sequence`, `no-depth buttons`)는 다른 스타일 데이터에서 발생하며 HUD 범위 밖으로 분리.
- screenshots: `.playwright-cli/page-2026-07-18T06-37-48-836Z.png`(full), `.playwright-cli/page-2026-07-18T06-38-32-557Z.png`(mobile), `.playwright-cli/element-2026-07-18T06-42-27-324Z.png`(compact).

## 33. hologram-style (미래 / 디지털)

### 최종 검증 (2026-07-18)

- status: `verified`.
- 컨셉: **LUMA VOLUME · Clinical Anatomy Viewer**. 기존 `LIGHT FIELD` 프리즘 카드 히어로를 제거하고 밝은 임상 연구실의 볼류메트릭 진단 챔버로 재구축. 후면 grid plane → coronal slice → anatomical volume → 전면 spatial measurement의 네 깊이 평면을 실제 DOM 구조와 3D transform으로 분리.
- 상호작용 QA: Tissue(AX T2/Soft tissue/42.8 mm) → Vessel(CE-MRA/Vascular tree/18.4 mm) → Bone(CT B70/Cortical bone/31.6 mm) 전환 시 `aria-pressed`, series, focus, measurement가 함께 갱신. slice control을 72%로 이동했을 때 출력값·Depth·coronal clip이 함께 갱신. 키보드 Tab으로 slider 도달, `:focus-visible` 2px solid outline 확인.
- 이미지 QA: built-in ImageGen으로 `public/generated/design-styles/hologram-style.webp`와 `public/generated/moodboards/hologram-style-realistic-v2.webp` 생성 후 원본 해상도 직접 검사. 주제 이미지는 비고어 중앙 해부 볼륨·분리 스캔 평면·밝은 연구실, 무드보드는 실제 종이·스캔 필름·아크릴 광학 재료의 top-down 연구 보드이며 로고·워터마크·크롬 지배·어두운 메타버스 인상 없음.
- browser QA: production build 기준 `/ko/styles/hologram-style` 1280×900 full과 375×812 mobile, `/ko/styles` compact desktop/mobile 모두 page overflow `0`. mobile chamber 447px·잘린 control 0. compact는 lazy image 로드 후 anatomical volume이 선명하고 orientation cube가 card 경계 안에 완전히 노출됨.
- reduced-motion: `prefers-reduced-motion: reduce`에서 reconstruction sweep과 volume image의 `animation-name` 모두 `none`.
- console: production 상세·목록 페이지 error 0. 최초 dev QA의 HMR WebSocket 오류는 같은 checkout의 기존 중복 dev 서버 lock에서 발생했으며, 해당 프로세스를 종료하고 production 서버로 재검증해 애플리케이션 오류가 아님을 분리 확인.
- screenshots: `.playwright-cli/page-2026-07-18T08-43-13-472Z.png`(full), `.playwright-cli/page-2026-07-18T08-52-21-556Z.png`(mobile), `.playwright-cli/element-2026-07-18T08-50-18-346Z.png`(compact).
- 자동 검증: `check:data` 87 styles/10 categories, `check:future-digital` 8 styles, `check:style-distinction` 87 styles, `check:style-refs` 87 styles, TypeScript, ESLint, `next build` 577 static pages 통과.

### 무드보드 교체 (2026-07-18, 소유자 피드백)

- 소유자 판정: v2 무드보드(임상 스캔 필름·MRI/X-ray 크롭)는 샘플 컨셉(LUMA VOLUME)을 보여줄 뿐 홀로그램 스타일 자체를 보여주지 못함 — "순수하게 홀로그램 스타일을 보여줄 수 있는 무드보드" 요구.
- `public/generated/moodboards/hologram-style-realistic-v3.webp` 신규 생성: 홀로포일·회절 필름 시트, 프리즘의 실제 무지개 코스틱 1줄, 다이크로익 글래스 칩(시안↔바이올렛), 레이어드 클리어 아세테이트 스택, 렌티큘러 조각, 분광 그라디언트 레이아웃 크롭, 팔레트 칩(펄/시안/바이올렛/그레이/페일 앰버 1점). 임상·해부 소재 완전 제거, 읽히는 텍스트·로고 없음.
- `designStyles.ts` moodboard 항목(alt/caption/directionKeywords/imageSrc/prompt) v3로 갱신. 스타일 레코드 팔레트와 일치 확인.
- 검증: `check:data`·`npm run lint`·`next build` 통과. `/ko/styles/hologram-style` 데스크톱 1280·모바일 375 모두 overflow 0, v3 이미지 로드 확인.

## 31. high-tech (미래 / 디지털)

### 현재 판정

- status: `reviewing`.
- 현재 `HighTechDashboard`는 avoidTraits의 "Generic KPI dashboard" 그 자체 — KPI 카드 3개(Build/p95/Edge)·미니 라인그래프·리전 테이블 3행의 전형적 템플릿. 실이미지 없음, 정보 밀도 낮음, "CONTROL PLANE" 워드마크 외 정체성 없음.
- 소유자 지시: "제대로 하이테크라는걸 알 수 있는 샘플 앱 — 꼭 실무가 아니더라도 하이테크 이미지가 전해지도록. 무드보드도 필요 시 교체."
- 무드보드(v2) 판정: 유지. 다크 대시보드 인쇄물·정밀 기계 크롭·서킷 텍스처·티타늄 스와치·블루/그린 칩으로 하이테크 정체성을 이미 잘 전달함.
- 인접 구분: hud(장면 위 오버레이 계기)와는 카드·패널 기반 product control plane으로, saas-style(밝은 B2B 운영 홈)과는 다크 정밀 인프라 콘솔로, cyber-dashboard 일반형과는 실존 장비(희석냉동기) 스키매틱으로 구분. "precise software ops, not fantasy" 유지.

### referenceSites에서 가져올 웹 문법

- Vercel: 다크 control-plane 표면, productized infrastructure 언어, 정밀 타이포.
- Linear: 크리스프 패널, 절제된 그라디언트, 시스템 상태 표시의 페이싱.
- Grafana: 라이브 메트릭·그래프 패널·고밀도 텔레메트리 문법.

### 목표

- 컨셉: **"MILLIKELVIN" — 퀀텀 컴퓨팅 클라우드의 QPU 관제 플레인**. 정석적 'SaaS 배포 대시보드'를 버리고, 실존 장르(IBM Quantum/IonQ 클라우드 콘솔)의 극저온 양자 인프라 콘솔로 구체화. 희석냉동기(cryostat) 스테이지 래더가 시그니처.
- 고유 마커: check-future-digital `CONTROL PLANE`·`qubit lattice`·`cryostat`·`gate fidelity`(구 `deploy graph`/`edge regions`는 retired로 이동), check-style-distinction family `MILLIKELVIN`/`CONTROL PLANE`/`qubit lattice`/`cryostat rail`.
- 정보 구조: 얇은 앱 크롬(MILLIKELVIN·Systems/Jobs/Calibration·QPU online) → 3열 — (A) codex 실사 골드 크라이오스탯 샹들리에를 배경으로 한 세로 **cryostat rail**(300 K→50 K→4 K→Still 800 mK→MXC 13 mK 스테이지 래더, 하단 QPU mounted), (B) 정밀 헤드라인 + **qubit lattice** 맵(fidelity 컬러 노드, 선택 가능 큐빗 3개), (C) 선택 큐빗 연동 **calibration readout**(T1/T2/1Q/2Q/readout)·gate fidelity 바·job queue(running/queued/complete) → 하단 상태 스트립(MXC 온도·fridge cycle·queue).
- 시각 처리: 다크 그래파이트(#0A0F15) 위 민트(#2DE2A6) live·블루(#4C8DFF) data·앰버(#FFB020) caution, 모노스페이스 탭형 수치, 헤어라인 보더, 채운 원색 블록 금지.
- representativeTraits 갱신: Quantum control plane / Cryostat stage rail / Qubit lattice map / Calibration telemetry / Precise engineering copy. referenceSites·style-references.json은 변경 없음(하이테크 web 문법 정본 유지).

### 검증 계획

- RED: 구 마커(deploy graph/edge regions)를 retired 리스트로 회귀 차단. 신 마커 GREEN: check:data·check:future-digital·check:style-distinction(HighTechQuantumConsole 위임 등록) 통과.
- browser QA: full 데스크톱·375 모바일·compact 목록 overflow 0, 큐빗 선택 → lattice 하이라이트·readout 연동 확인, reduced-motion 대응.
- 이미지: codex로 `public/generated/design-styles/high-tech.webp`(골드 크라이오스탯 샹들리에, 세로 크롭 내성 중앙 구도) 생성 후 직접 검사.

### 구현 및 검증 결과 (2026-07-18)

- status: `verified`.
- 변경 요약: `HighTechDashboard`(generic KPI 대시보드) 삭제 → 위임 래퍼 `HighTechQuantumConsole` + 분리 컴포넌트 `MillikelvinControlPlane.tsx`(use client, 큐빗 선택 useState). codex로 골드 희석냉동기 샹들리에 실사(`public/generated/design-styles/high-tech.webp`, 864×1821 세로) 신규 생성. 골격: 얇은 앱 크롬(MILLIKELVIN 워드마크+QUANTUM CONTROL PLANE 서브·Systems/Jobs/Calibration/Access·QPU-133 online 펄스) → 3열 — (A) 실사 배경 세로 cryostat rail(6단 스테이지 래더 300 K→12.9 mK, MXC 민트 강조, QPU 칩), (B) 민트 키커+정밀 헤드라인 "Circuits at 12.9 millikelvin." + qubit lattice(오프셋 4×8 heavy-hex 노드, fidelity 3색, Q07/Q52/Q114 선택 버튼), (C) calibration readout(T1/T2/1Q/2Q/readout, caution 앰버)+gate fidelity 트렌드 바+job queue(running/queued/done) → 하단 모노 텔레메트리 스트립 4셀.
- 인터랙션 QA: Q52 클릭 시 `aria-pressed` 전환, lattice 링 하이라이트, readout이 review 상태(2Q 99.18 %·recalibration queued·헤더 REVIEW)로 연동 갱신 확인. FOCUS 링(focus-visible) 적용, 펄스 dot은 `motion-reduce:animate-none`.
- RED/GREEN: 구 마커(deploy graph/edge regions) retired 리스트 회귀 차단 통과. 신 마커 — future-digital(CONTROL PLANE/qubit lattice/cryostat/gate fidelity), distinction family(MILLIKELVIN/QUANTUM CONTROL PLANE(aria-label)/qubit lattice/cryostat rail/job queue) — 전부 GREEN. `HighTechQuantumConsole` 위임 등록(마커는 컴포넌트 파일이 보유, 래퍼 클린).
- browser QA: `/ko/styles/high-tech` 1280(히어로 프레임 614×540)·375(284×540) 모두 page overflow 0 + 프레임/부모 경계 클리핑 0(스크립트 검사). 모바일은 스테이지명·133 physical·QPU 상세·nav를 숨기고 온도 래더+lattice+축약 readout 유지. compact 카드(444px·모바일 308px)는 크롬+rail+헤드라인+lattice로 압축, 클리핑 0.
- console: 상세 페이지 error 0. 목록 페이지의 중복 React key 경고 5건(distortion rail 등)은 기존 문서화된 타 스타일 데이터 이슈로 high-tech 범위 밖.
- 데이터: representativeTraits/tokenIntent 갱신, styleContentOverrides["high-tech"] 신설(요약·설명·특징·팔레트·타이포·레이아웃·주의점·imagePrompt), 구분표 high-tech 행 갱신. referenceSites·style-references.json 무변경. 무드보드 v2 유지(하이테크 정체성 이미 충족 판정).
- 명령: `check:data`(87)·`check:future-digital`(8)·`check:style-distinction`(87)·`check:style-refs`(87)·`npm run lint`·`next build` 통과.
- screenshots: `hightech-full-final.jpeg`(데스크톱), `hightech-mobile-v2.jpeg`(모바일), `hightech-compact-v2.jpeg`(compact 카드).
- 남은 의심점: 없음.
- 다음 style: No. 36 `classic` (럭셔리 / 클래식 카테고리 시작).

## 20. seventies-retro — 재작업 (소유자 피드백)

### 현재 판정

- status: `reviewing` (verified 롤백).
- 소유자 판정: "THE GROOVY KITCHEN" 쿡북 리더는 "그냥 특정 목적의 사이트일 뿐" — 레시피 유틸리티라는 목적이 지배하고 70s 그래픽 스타일 자체가 전해지지 않음. "다시 그냥 그 스타일을 보여줄 수 있는 걸로" 지시.
- 원인 분석: 본문이 중립적 크림 카드 UI(인덱스 리스트·체크리스트·메서드)라 70s 신호가 팔레트·모서리 링 장식에만 실림. 수퍼그래픽·라운드 팻 타이포 같은 시대 조형이 골격이 아니라 장식에 머묾.
- 방향: 컨셉의 기발함보다 **스타일 가시성 우선**. 모든 표면이 70s 그래픽 언어(수퍼그래픽 레인보우 아치·Cooper Black풍 라운드 팻 타이포·어스톤 스트라이프·아치 프레임·필 배지)로 채워지는 화면.

### 목표

- 컨셉: **"ROLLERAMA '76" — 70s 롤러 디스코 링크의 세션 예약 랜딩**. 이벤트/장소 랜딩은 70s 포스터 그래픽이 가장 자연스럽게 사는 장르 — 스타일이 화면의 주인공.
- 고유 마커(check-style-distinction): `ROLLERAMA` / `session board` / `skate hire` / `rainbow arch`. 구 마커(The Groovy Kitchen/recipe card index/harvest-gold pantry) 교체.
- 정보 구조: 팻 라운드 마스트헤드(ROLLERAMA·필 nav·'76 season 배지) → 수퍼그래픽 히어로(코너 레인보우 아치 링 + "Roll into the groove." 대형 헤드라인 + CTA 필) + 아치형(rounded-t-full) 링크 실사 창 → **session board**(Matinee/Disco Night/Sunday Jam 선택 → spinning·floor·요금 연동) → **skate hire** 스트립(사이즈 칩·요금) → 하단 티커 스트립.
- 시각 처리: harvest gold 바탕, burnt orange·avocado·dusty rose 스트라이프, 브라운 2px 보더 + 하드 오프셋 섀도(토큰), 아치·필 형태 전면 사용.
- 이미지: codex로 `public/generated/design-styles/seventies-retro.webp` 교체 — 1976 롤러링크 인테리어(메이플 플로어·수퍼그래픽 벽·스웨이드 스케이트, Kodachrome 톤).

### 검증 계획

- RED/GREEN: distinction 구 마커 제거·신 마커 GREEN, `SeventiesRollerDisco` 위임 등록. check:data·check:style-distinction·lint·build 통과.
- browser QA: full·모바일·compact overflow 0, 세션 선택 연동(aria-pressed) 확인.

### 구현 및 검증 결과 (2026-07-18)

- status: `verified`.
- 변경 요약: `SeventiesRecipeCookbook` 삭제 → 위임 래퍼 `SeventiesRollerDisco` + 분리 컴포넌트 `RolleramaRink.tsx`(use client, 세션 선택 useState). codex로 롤러링크 실사 교체(`public/generated/design-styles/seventies-retro.webp` — 수퍼그래픽 웨이브 벽화·메이플 플로어·오렌지 샤그 카펫·스웨이드 스케이트, Kodachrome 톤). 골격: 팻 라운드 마스트헤드(ROLLERAMA·필 nav·'76 season) → 코너 레인보우 아치 링 수퍼그래픽 + 2톤 대형 헤드라인("Roll into / the groove.") + CTA 필(선택 세션 라벨 연동) → session board(3세션, 선택→spinning readout·CTA 연동) | 아치형(rounded-t-full) 링크 실사 창 + skate hire(사이즈 칩·요금) → 스트라이프 밴드 + 티커.
- 스타일 가시성: 수퍼그래픽 아치·팻 라운드 타이포·어스톤 스트라이프·아치 프레임·필 배지·브라운 2px 보더+하드 오프셋 섀도가 장식이 아닌 골격 — 한눈에 70s로 읽힘(소유자 지시 반영: 목적성보다 스타일 우선).
- 인터랙션 QA: Matinee 클릭 시 `aria-pressed` 전환, spinning readout("bubblegum pop · motown")·CTA("Book Matinee Skate") 연동 갱신 확인.
- RED/GREEN: distinction 구 마커(The Groovy Kitchen/recipe card index/harvest-gold pantry) 제거, 신 마커(ROLLERAMA/session board/skate hire/rainbow arch) GREEN. 래퍼 식별자 충돌(RolleramaRink ⊃ Rollerama)은 마커를 대문자 리터럴로 통일해 해소.
- browser QA: 1280 full(614×540)·375 모바일(284×540)·compact 카드(데스크톱) 모두 page overflow 0, 비의도 클리핑 0(의도된 아치 블리드만 overflow-hidden 내부). 모바일은 세션 가격·note·maple 라벨 축약, compact는 세션 2개+readout으로 압축(푸터 스트라이프 프레임 내 확인).
- 데이터: representativeTraits(Supergraphic rainbow arch 등)/tokenIntent/visualFeatures/layoutTraits 갱신, 구분표 행 ROLLERAMA로 갱신. 무드보드 v2 유지(코듀로이·월넛·웨이비 스트라이프 — 스타일 자체를 이미 표현).
- 명령: `check:data`(87)·`check:style-distinction`(87)·`npm run lint`·`next build` 통과.
- screenshots: `seventies-full-final.jpeg`, `seventies-mobile-v2.jpeg`, `seventies-compact-v2.jpeg`.
- 남은 의심점: 없음.

## 18. retro — 재작업 (소유자 지시: "레트로로 가자")

### 현재 판정

- status: `reviewing` (verified 롤백).
- 현재 `RetroDinerShop`(실제 내용은 RETRO BROADCAST SHOP)은 seventies 쿡북과 동일 패턴 — 방송 굿즈 숍이라는 목적성 모듈(머치 큐·디케이드 다이얼 칩·아카이브 카드)이 본문이고, 레트로는 도트 그리드 배경·오프셋 섀도 장식에 머묾. PhotoSurface 플레이스홀더만 있고 실이미지 없음.
- 적용 원칙: [[style-visibility-over-vehicle]] — 스타일 조형이 골격이어야 함.
- 인접 구분 유지: seventies-retro(70s 수퍼그래픽 롤러 디스코)와는 50s-60s 아메리칸 다이너 인쇄 문법으로, vintage(빛바랜 종이 아카이브)와는 밝고 명랑한 톤으로, mid-century-modern(가구 모더니티)과는 상업 인쇄물 감성으로 구분.

### 목표

- 컨셉: **"SUNNYSIDE DRIVE-IN" — 1959 아메리칸 드라이브인 다이너 랜딩**. 레트로 인쇄 그래픽(도티드 리더 메뉴, 스타버스트 배지, 체커보드, 크롬·레드 비닐)이 자연스럽게 화면의 주인공이 되는 장르.
- 고유 마커(check-style-distinction): `SUNNYSIDE` / `menu board` / `car hop ticket` / `checkerboard`. 구 마커(RETRO BROADCAST SHOP/time-travel media dial/analog merch queue) 교체.
- 정보 구조: 스타버스트 배지+팻 워드마크 마스트헤드(필 nav·open till midnight) → 헤드라인("Burgers, malts, chrome.") + 다이너 실사 창(AIR CONDITIONED 배지) | **menu board**(도티드 리더 4품목, 선택 인터랙션) → **car hop ticket**(게스트 체크 스텁 — 선택 품목·사이드·합계·스톨 연동) → 체커보드 밴드 + 티커.
- 팔레트: 기존 유지(크림 #F8D992·레드 #D94A2B·틸 #2A7A78·앰버 #F2A541·브라운 #3A1F13) — 그대로 50s 다이너.
- 이미지: codex로 `public/generated/design-styles/retro.webp` 신규 — 1950s 다이너 인테리어(크롬 카운터·레드 비닐 스툴·체커 플로어·틸 벽, 텍스트 없음).

### 검증 계획

- RED/GREEN: distinction 구 마커 제거·신 마커 GREEN, `RetroDriveIn` 위임 등록. check:data·check:style-distinction·lint·build 통과.
- browser QA: full·모바일·compact overflow 0, 메뉴 선택 → 티켓 연동(aria-pressed) 확인.

### 구현 및 검증 결과 (2026-07-18)

- status: `verified`.
- 변경 요약: `RetroDinerShop`(방송 굿즈 숍) 삭제 → 위임 래퍼 `RetroDriveIn` + 분리 컴포넌트 `SunnysideDriveIn.tsx`(use client, 메뉴 선택 useState). codex로 1950s 다이너 실사(`public/generated/design-styles/retro.webp` — 크롬 카운터·레드 비닐 스툴·체커 플로어·틸 벽·체리파이) 신규 생성. 골격: 스타버스트 배지(SVG 16포인트)+팻 워드마크 SUNNYSIDE 마스트헤드(필 nav·open till midnight) → 슬로건("Burgers, malts & chrome.")+다이너 실사 창(AIR CONDITIONED 배지) | menu board(도티드 리더 4품목, 선택 버튼) + car hop ticket(게스트 체크 스텁, 대시 보더, Courier 모노) → 체커보드 밴드(repeating-conic-gradient) + 티커.
- 스타일 가시성: 스타버스트·도티드 리더 메뉴판·게스트 체크 스텁·체커보드·크롬/비닐 실사가 장식이 아닌 골격 — 한눈에 50s 아메리칸 다이너 레트로로 읽힘([[style-visibility-over-vehicle]] 원칙 적용).
- 인터랙션 QA: Cherry Malt 클릭 시 `aria-pressed` 전환, 티켓이 품목·합계($0.45+fries $0.30=$0.75)·스톨(stall 03)로 함께 갱신 확인.
- RED/GREEN: distinction 구 마커(RETRO BROADCAST SHOP/time-travel media dial/analog merch queue) 제거, 신 마커(SUNNYSIDE/menu board/car hop ticket/checkerboard) GREEN. 위임 래퍼 등록(마커는 컴포넌트 파일 보유). 워드마크 대문자 리터럴로 통일해 마커 충족.
- browser QA: 1280 full(614×540)·375 모바일(284×540)·compact 카드 모두 page overflow 0, 비의도 클리핑 0. 모바일은 단일 컬럼 스택(grid-rows 배분)으로 메뉴판 항목명 온전 노출, open-till 배지·car-hop-it 라벨은 좁은 폭에서 숨김. compact는 메뉴 3품목+체커보드로 압축.
- 데이터: representativeTraits/tokenIntent/summary/description/visualFeatures/layoutTraits 갱신, 구분표 retro 행 SUNNYSIDE로 갱신. 무드보드 v2 유지(빛바랜 커머스·하프톤·아날로그 소재 — 레트로 커머스 톤 표현).
- console: 상세 페이지 error 0. 목록 페이지 중복 key 경고 5건(distortion rail 등)은 기존 타 스타일 데이터 이슈로 retro 범위 밖.
- 명령: `check:data`(87)·`check:style-distinction`(87)·`npm run lint`·`next build`(577 pages) 통과.
- screenshots: `retro-full-final.jpeg`, `retro-mobile-v2.jpeg`, `retro-compact-v1.jpeg`.
- 남은 의심점: 없음.

## 19. vintage — 완전 재작업 (소유자 지시: "빈티지 아예 새로 잡아줘")

### 현재 판정

- status: `reviewing` (verified 롤백).
- 현재 `VintagePaperCatalog`(Archive supply 헤리티지 의류 카탈로그)는 정석적 빈티지 vehicle — 상품 행·소재 등록부·수선 원장이 중립 표 UI이고, PhotoSurface 플레이스홀더만 있어 실이미지 없음. retro(다이너)·seventies(포스터) 재작업과 톤이 겹치는 커머스 표.
- 적용 원칙: [[style-visibility-over-vehicle]] — 빈티지 조형이 골격이어야 함.
- 인접 구분: retro(밝은 50s 다이너)·seventies(70s 수퍼그래픽)와는 차분한 아이보리/잉크·장식 세리프·이중 괘선 인쇄물로, rustic(거친 로컬 소재 hospitality)와는 라벨/괘선 인쇄 아카이브로, luxury/minimal과는 낮은 대비 종이 물성으로 구분.

### 목표

- 컨셉: **"HOLLOWAY'S APOTHECARY — Est. 1874" 빈티지 약제상 포뮬러리**. 정석적 헤리티지 의류 카탈로그를 버리고, 장식 세리프·이중 괘선·왁스 실·아포세카리 라벨이 자연스럽게 화면의 주인공이 되는 formulary/register 골격(커머스 표가 아닌 조제 아카이브).
- 고유 마커(check-style-distinction): `HOLLOWAY'S APOTHECARY` / `formulary` / `apothecary label` / `materia medica`. 구 마커(PAPER CATALOG/repair ticket ledger/patina material register) 교체.
- 정보 구조: 장식 세리프 마스트헤드(모르타르 딩뱃·EST. 1874·purveyors of tonics & remedies) → 약제상 실사 창(amber 병 선반, DISPENSARY 왁스 실) | **formulary** 인덱스(토닉/레미디 4종, 라틴명·조제 연도, 선택 인터랙션) → 선택 연동 **apothecary label** 카드(이중 괘선·℞·directions·dose) + **materia medica** 소재 3종 등록부 → 하단 guarantee 스트립.
- 팔레트: 기존 유지(aged cream #EEE0C4·ink #2C2418·faded burgundy #8C3F2B·tarnished brass #B98E45·olive-teal #345A4A·wood #5A432B). 토큰 유지(Georgia serif·double border·grain).
- 이미지: codex로 `public/generated/design-styles/vintage.webp` 신규 — 빈티지 약제상 인테리어(amber/green 유리병·다크 우드 선반·황동 저울·모르타르, 읽히는 라벨 없음).

### 검증 계획

- RED/GREEN: distinction 구 마커 제거·신 마커 GREEN, `VintageApothecary` 위임 등록. check:data·check:style-distinction·lint·build 통과.
- browser QA: full·모바일·compact overflow 0, 레미디 선택 → 라벨 카드 연동(aria-pressed) 확인.

### 구현 및 검증 결과 (2026-07-18)

- status: `verified`.
- 변경 요약: `VintagePaperCatalog`(Archive supply 헤리티지 카탈로그) 삭제 → 위임 래퍼 `VintageApothecary` + 분리 컴포넌트 `HollowayApothecary.tsx`(use client, 레미디 선택 useState). codex로 빈티지 약제상 실사(`public/generated/design-styles/vintage.webp` — amber/cobalt/green 병·다크 우드 선반·황동 저울·모르타르·양피지, 읽히는 라벨 없음) 신규 생성. 골격: 왁스 실+모르타르 딩뱃 마스트헤드(장식 세리프 Holloway's Apothecary·EST. 1874·purveyors of tonics & remedies) → 약제상 실사 창(DISPENSARY 왁스 실) | formulary 인덱스(4레미디, 라틴 학명·조제 연도, 선택 버튼) → 선택 연동 apothecary label 카드(이중 괘선·℞·directions·dose·use 태그) + materia medica 등록부(herb/mineral/tincture 스와치) → guarantee 스트립.
- 스타일 가시성: 바랜 아이보리·잉크 세리프·이중 괘선·왁스 실·조각 아포세카리 라벨이 장식이 아닌 골격 — 한눈에 19세기 약제상 빈티지 인쇄물로 읽힘([[style-visibility-over-vehicle]] 원칙 적용, 정석적 헤리티지 의류 카탈로그 폐기).
- 인터랙션 QA: Oil of Eucalyptus 클릭 시 `aria-pressed` 전환, 라벨 카드가 이름·directions(Five drops in hot steam)·No. 052·use("for the chest")로 함께 갱신 확인.
- RED/GREEN: distinction 구 마커(PAPER CATALOG/repair ticket ledger/patina material register) 제거, 신 마커(HOLLOWAY'S APOTHECARY/formulary/apothecary label/materia medica) GREEN. 위임 래퍼 등록(마커는 컴포넌트 파일이 aria-label로 보유, 래퍼 클린).
- browser QA: 1280 full(614×540)·375 모바일(284×540)·compact 카드 모두 page overflow 0, 비의도 클리핑 0. 모바일은 단일 컬럼 스택(grid-rows 배분)으로 실사 창→formulary→라벨→축약 materia 순 노출, materia 등록부·guarantee 스트립·부제는 좁은 폭에서 숨김. compact는 formulary 3레미디+라벨 헤더로 압축.
- 데이터: representativeTraits/tokenIntent/summary/description/visualFeatures/typography/layoutTraits 갱신, 구분표 vintage 행 HOLLOWAY'S APOTHECARY로 갱신. 무드보드 v2 유지(빛바랜 인쇄물·foxed 종이·황동/우드 소재 — 빈티지 물성 표현).
- console: 상세 페이지 error 0. 목록 페이지 중복 key 경고 5건(distortion rail 등)은 기존 타 스타일 데이터 이슈로 vintage 범위 밖.
- 명령: `check:data`(87)·`check:style-distinction`(87)·`npm run lint`·`next build`(577 pages) 통과.
- screenshots: `vintage-full-v1.jpeg`, `vintage-mobile-v1.jpeg`, `vintage-compact-v1.jpeg`.
- 남은 의심점: 없음.

## 22. y2k — 재디자인 (소유자 지시: "앞뒤와 다른 레이아웃, 제대로 y2k로 보이게")

### 현재 판정

- status: `reviewing` (verified 롤백).
- 현재 `Y2KGlossPortal`(GLOSS PORTAL)은 파스텔 Frutiger-Aero 젤리 포털 — 헤더+2열 히어로/위젯+푸터의 랜딩 골격. 부드러운 파스텔 gloss라 진짜 1999–2001 크롬-사이버 Y2K보다 약하고, bubble-design AQUA DESK와 톤 겹침.
- 소유자 지시 2가지: (1) 앞(No.21 eighties-retro=SYNTH CONSOLE 다크 미디어 콘솔)·뒤(No.23 retro-futurism=FLIGHT DECK 포스터 랜딩)와 다른 레이아웃, (2) 제대로 y2k로 보이는 디자인.
- 방향: 랜딩/포털이 아닌 **OS 애플리케이션 윈도우 스킨** 골격(레이아웃 다양성 원칙 — 이웃에 없는 window-chrome UI). 크롬 베벨·메탈릭 그라디언트·LCD·스펙트럼 비주얼라이저로 불명확한 크롬-사이버 Y2K를 전면화. [[style-visibility-over-vehicle]] 적용.

### 목표

- 컨셉: **"CYBERSHOCK" — Y2K 크롬 MP3/미디어 플레이어 스킨**(WinAmp/초기 WMP 시대). 홀로그래픽 데스크톱 위에 크롬 베벨 애플리케이션 윈도우.
- 고유 마커(check-style-distinction): `CYBERSHOCK` / `now playing` / `spectrum visualizer` / `transport controls`. 구 마커(GLOSS PORTAL/bubble widget stack/sparkle guestbook rail) 교체.
- 정보 구조: 크롬 타이틀바(베벨 + CYBERSHOCK + 픽셀 min/max/close) → 크롬 LCD `now playing`(트랙/아티스트/타임 + `spectrum visualizer` 바) → `transport controls` 클러스터(prev/play/stop/next/eject 베벨 버튼) → playlist(트랙 선택 → LCD·비주얼라이저 연동) + equalizer/skin 미니 패널 → 상태바(bitrate/khz/stereo·online).
- 팔레트: 기존 유지(ice blue #71D5FF·pink #FF8EE7·lime #B8FF5C·화청 border #8AA7C7·ink #18233D) — 메탈릭 실버/블루 베벨 + 파스텔 사이버 글로우로 크롬코어(하드웨어)와 구분.
- 이미지: codex로 `public/generated/design-styles/y2k.webp` 신규 — 홀로그래픽/이리데센트 파스텔 데스크톱 월페이퍼(추상, 하드웨어·텍스트 없음).

### 검증 계획

- RED/GREEN: distinction 구 마커 제거·신 마커 GREEN, `Y2KMediaPlayer` 위임 등록. check:data·check:style-distinction·lint·build 통과.
- browser QA: full·모바일·compact overflow 0, 트랙 선택 → now playing 연동(aria-pressed) 확인.

### 구현 및 검증 결과 (2026-07-18)

- status: `verified`.
- 변경 요약: `Y2KGlossPortal`(GLOSS PORTAL 파스텔 젤리 포털) 삭제 → 위임 래퍼 `Y2KMediaPlayer` + 분리 컴포넌트 `CybershockPlayer.tsx`(use client, 트랙 선택 useState). codex로 Y2K 홀로그래픽 데스크톱 월페이퍼(`public/generated/design-styles/y2k.webp` — 이리데센트 리퀴드 크롬 스월·파스텔 아이스블루/핑크/라임·버블·렌즈플레어, 텍스트/하드웨어 없음) 신규 생성. 골격(OS 윈도우 스킨): 크롬 타이틀바(베벨 + CYBERSHOCK 크롬 워드마크 + 픽셀 min/max/close) → 크롬 LCD `now playing`(트랙/아티스트/타임/kbps + `spectrum visualizer` 14바) → `transport controls`(prev/play/stop/next/eject 베벨 버튼 + vol 슬라이더) → playlist(5트랙 선택) + equalizer/skins 미니 패널 → 상태바(kbps·khz·stereo·online 27). 얇은 홀로그래픽 데스크톱이 윈도우 주위로 비침.
- 스타일 가시성: 브러시드 크롬 베벨·LCD 사이버글로우·스펙트럼 비주얼라이저·픽셀 윈도우 버튼이 장식이 아닌 골격 — 한눈에 1999–2001 크롬 사이버 Y2K 소프트웨어 스킨으로 읽힘([[style-visibility-over-vehicle]] 적용, 파스텔 Frutiger-Aero 포털 폐기).
- 레이아웃 차별: 앞(eighties-retro=다크 신스 콘솔)·뒤(retro-futurism=포스터 랜딩)와 다른 OS 애플리케이션 윈도우 스킨 골격. 크롬코어(미러 하드웨어)·bubble-design(아쿠아 데스크톱)과는 소프트웨어 스킨 윈도우+파스텔 사이버 글로우로 구분.
- 인터랙션 QA: Dial-Up Angel 클릭 시 `aria-pressed` 전환, LCD가 제목·128 kbps·5:01·"track 4 of 5"로 함께 갱신, 스펙트럼 바 패턴도 트랙별로 전환 확인.
- RED/GREEN: distinction 구 마커(GLOSS PORTAL/bubble widget stack/sparkle guestbook rail) 제거, 신 마커(CYBERSHOCK/now playing/spectrum visualizer/transport controls) GREEN. 위임 래퍼 등록(마커는 컴포넌트 파일이 워드마크 리터럴·aria-label로 보유, 래퍼 클린).
- browser QA: 1280 full(614×540)·375 모바일(284×540)·compact 카드 모두 page overflow 0, 비의도 클리핑 0. 모바일은 EQ/skins 숨김·플레이리스트 풀폭, v2.0 skin 칩·online 배지 nowrap 정리. compact는 타이틀/LCD/비주얼라이저/transport/상태바로 압축.
- console: 상세 페이지 error 0. 목록 페이지 중복 key 경고(distortion rail 등, HMR로 반복 표기)는 기존 타 스타일 데이터 이슈로 y2k 범위 밖.
- 명령: `check:data`(87)·`check:style-distinction`(87)·`npm run lint`·`next build`(577 pages) 통과.
- screenshots: `y2k-full-v2.jpeg`, `y2k-mobile-v2.jpeg`, `y2k-compact-v1.jpeg`.
- 남은 의심점: 없음.

## 23. retro-futurism — 재디자인 (소유자 지시: "레이아웃 바꾸고, 특정 사이트가 아니라 레트로 퓨처리즘을 알아보기 쉽게")

### 현재 판정

- status: `reviewing` (verified 롤백).
- 현재 `RetroFuturismFlightDeck`(Worlds Fair Travel Bureau / FLIGHT DECK)은 여행 예약 사이트 vehicle — 2열 랜딩(포스터 히어로 + destination rail + chrome capsule timetable)에 장식용 알약/궤도 도형이 콘텐츠를 대신함. 실이미지 없음.
- 소유자 지시: (1) 레이아웃 자체 교체, (2) 특정 사이트 표현이 아니라 레트로 퓨처리즘을 한눈에 알아보게 하는 구성, (3) 필요시 무드보드·팔레트 교체.
- 방향: 예약 플로우가 아닌 **스타일 스페시멘/전시(exhibit)** 골격 — Space Age 모티프 어휘(원자 궤도·스타버스트·부메랑·플라잉소서·레이건)를 크래프티드 SVG로 전시하고, 선택 시 중앙 뷰어에 크게 표시. [[style-visibility-over-vehicle]] 적용.

### 목표

- 컨셉: **"WORLD OF TOMORROW" — 레트로 퓨처리즘 모티프 스페시멘/전시 포스터**(특정 사이트가 아니라 스타일 어휘 전시).
- 고유 마커(check-style-distinction): `WORLD OF TOMORROW` / `exhibit viewer` / `motif index` / `atomic orbit`. 구 마커(FLIGHT DECK/destination poster rail/chrome capsule timetable) 교체.
- 정보 구조: 스타버스트 마크 + WORLD OF TOMORROW 포스터 마스트헤드(retro-futurist specimen · 1958→2001) → `exhibit viewer`(네이비 스타필드 스크린에 선택 모티프 대형 SVG + 궤도 링 + plate 캡션) | 새 포스터 일러스트 플레이트(레트로 퓨처리즘 실일러스트) → `motif index`(5모티프 선택 rail, `atomic orbit` 포함, 선택 → 뷰어 연동) → Space Age 팔레트 스페시멘 스트립(크림/코랄/틸/머스터드/네이비 명명 칩).
- 팔레트: 기존 유지(크림 #F6E7B8·코랄 #F05B2F·틸 #2DB7B1·머스터드 #F2C84B·네이비 #17314A) — 이미 강한 Space Age 팔레트라 유지, 스페시멘 스트립으로 오히려 명시.
- 무드보드: 기존 v2 유지(space-age 캡슐·크롬·궤도·스타필드 — 스타일 어휘 이미 표현).
- 이미지: codex로 `public/generated/design-styles/retro-futurism.webp` 신규 — 플랫 미드센추리 Space Age 여행 포스터 일러스트(구지 로켓·돔 미래도시·모노레일·원자 스타버스트·궤도, 텍스트 없음, 사진 아님).

### 검증 계획

- RED/GREEN: distinction 구 마커 제거·신 마커 GREEN, `RetroFuturismSpecimen` 위임 등록. check:data·check:style-distinction·lint·build 통과.
- browser QA: full·모바일·compact overflow 0, 모티프 선택 → exhibit viewer 연동(aria-pressed) 확인.

### 구현 및 검증 결과 (2026-07-19)

- status: `verified`.
- 변경 요약: `RetroFuturismFlightDeck`(Worlds Fair Travel Bureau 예약 사이트) 삭제 → 위임 래퍼 `RetroFuturismSpecimen` + 분리 컴포넌트 `WorldOfTomorrowSpecimen.tsx`(use client, 모티프 선택 useState). codex로 플랫 미드센추리 Space Age 포스터 일러스트(`public/generated/design-styles/retro-futurism.webp` — 구지 로켓·돔 미래도시·모노레일·원자 스타버스트·플라잉소서·궤도, 사진 아님) 신규 생성. 골격(스타일 스페시멘): 스타버스트 마크 + WORLD OF TOMORROW 포스터 마스트헤드(a retro-futurist specimen · 1958→2001) → exhibit viewer(네이비 스타필드 스크린에 선택 모티프 대형 크래프티드 SVG + 궤도 링 + name/descriptor/plate 캡션) | 포스터 일러스트 플레이트 → motif index(원자궤도·스타버스트·부메랑·플라잉소서·로켓 5글리프 선택 rail) → Space Age 팔레트 스페시멘 스트립(크림/코랄/터쿼이즈/머스터드/네이비 명명 칩).
- 소유자 지시 반영: (1) 레이아웃 교체 — 예약 랜딩 → 스페시멘/전시 골격, (2) 특정 사이트가 아니라 Space Age 모티프 어휘 자체를 전시해 한눈에 레트로 퓨처리즘으로 읽힘([[style-visibility-over-vehicle]] 적용), (3) 팔레트는 이미 강한 Space Age라 유지하되 명명 스트립으로 명시, 무드보드 v2 유지(space-age 어휘 이미 표현).
- 인터랙션 QA: Rocket 클릭 시 `aria-pressed` 전환, exhibit viewer가 이름(Rocket)·plate 05·descriptor로 함께 갱신 확인.
- RED/GREEN: distinction 구 마커(FLIGHT DECK/destination poster rail/chrome capsule timetable) 제거, 신 마커(WORLD OF TOMORROW/exhibit viewer/motif index/atomic orbit) GREEN. 위임 래퍼 등록(마커는 컴포넌트 파일이 워드마크 aria-label·aria-label로 보유, 래퍼 클린).
- browser QA: 1280 full(614×540)·375 모바일(284×540)·compact 카드 모두 page overflow 0, 비의도 클리핑 0. 모바일은 exhibit viewer→poster plate 세로 스택(grid-rows), motif index 5칩·팔레트 칩(이름 lg↑에서만) 유지. compact는 exhibit viewer + motif 3글리프로 압축.
- console: 상세 페이지 error 0. 목록 페이지 중복 key 경고(distortion rail 등, HMR로 반복 표기)는 기존 타 스타일 데이터 이슈로 retro-futurism 범위 밖.
- 명령: `check:data`(87)·`check:style-distinction`(87)·`npm run lint`·`next build`(577 pages) 통과.
- screenshots: `rf-full-v1.jpeg`, `rf-mobile-v1.jpeg`, `rf-compact-v1.jpeg`.
- 남은 의심점: 없음.

## 24. mid-century-modern — 재작업 (소유자 지시: "다시 잡아줘" → 미드센추리 인테리어 에디토리얼 선택)

### 현재 판정

- status: `reviewing` (verified 롤백).
- 현재 `MidCenturyListeningRoom`(MONO HOUSE 회원제 청음실 콘솔)은 잘 만들어졌으나 "특정 사이트(청음실 예약 콘솔)" vehicle. 소유자 질문 결과 **미드센추리 인테리어 에디토리얼** 방향 선택.
- 방향: 하이파이 콘솔 대시보드가 아니라 **매거진/에디토리얼 스프레드** 골격 — 케이스 스터디 하우스 실내 실사 + 기사 칼럼 + pull quote + "이 집의 가구" 사이드바(아이코닉 MCM 가구 선택 연동). 최근 스타일들(diner/apothecary/media-player/specimen)과 레이아웃 중복 회피.

### 목표

- 컨셉: **"ATOMIC — a mid-century living journal" 인테리어 에디토리얼 피처**. 특정 실서비스가 아니라 미드센추리 홈 그 자체를 다루는 잡지 스프레드.
- 고유 마커(check-style-distinction): `ATOMIC` / `mid-century living` / `HOUSE STUDY` / `the pieces` / `Eames Lounge Chair`. 구 마커(MONO HOUSE/SIDE A/SIDE B/Walnut source rail/Girard acoustic cloth/Session queue) 교체.
- 정보 구조: ATOMIC 마스트헤드(a mid-century living journal · No.06 · INTERIORS) → 대형 MCM 실내 실사 피처(HOUSE STUDY 06 kicker + 헤드라인 + 크레딧, 선택 가구 위치에 넘버 핀 주석) + 기사 칼럼(에디토리얼 산문 + pull quote + byline) | `the pieces` 사이드바(Eames Lounge Chair·Noguchi Table·Nelson Bench·Girard Textile·Sputnik Lamp 선택 → 디자이너/연도/소재 디테일 연동) → 소재 크레딧 스트립.
- 팔레트: 기존 유지(크림 #E7D8BD·월넛 #5A321F·버ント오렌지 #C9653A·틸 #2F776B·머스터드 #D4A33A·에스프레소 #2B241A). 무드보드 v2 유지(월넛·우븐·브라스 소재 보드).
- 이미지: codex로 `public/generated/design-styles/mid-century-modern.webp` 교체 — 넓은 케이스 스터디 하우스 거실(임스 라운지·노구치 테이블·풀높이 유리·거라드 텍스타일·월넛), 텍스트 없음.

### 검증 계획

- RED/GREEN: distinction 구 마커 제거·신 마커 GREEN, `MidCenturyModernStudio` 위임 대상 `AtomicInteriorsJournal.tsx`로 교체, 구 `MidCenturyListeningRoom.tsx` 삭제. check:data·check:style-distinction·lint·build 통과.
- browser QA: full·모바일·compact overflow 0, 가구 선택 → 디테일·핀 연동(aria-pressed) 확인.

### 구현 및 검증 결과 (2026-07-19)

- status: `verified`.
- 변경 요약: `MidCenturyListeningRoom.tsx`(MONO HOUSE 청음실 콘솔) 삭제 → 위임 래퍼 `MidCenturyModernStudio` 대상을 신규 `AtomicInteriorsJournal.tsx`(use client, 가구 선택 useState)로 교체. codex로 케이스 스터디 하우스 거실 실사(`public/generated/design-styles/mid-century-modern.webp` 교체 — 임스 라운지·노구치 글래스 테이블·월넛 크레덴자·거라드 텍스타일·풀높이 유리·브라스 램프) 재생성. 골격(매거진 에디토리얼): ATOMIC 마스트헤드(a mid-century living journal · INTERIORS · No.06) → HOUSE STUDY 06 kicker + 헤드라인 + 번호 핀 주석 실내 실사(선택 가구 캡션: 디자이너·연도·소재) + 기사 칼럼·pull quote·byline | `the pieces` 사이드바(Eames/Noguchi/Nelson/Girard/Brass 5가구 선택 rail) → 크레딧 스트립(Photography/Styling/Materials).
- 소유자 지시 반영: "다시 잡아줘" → 방향 질문 결과 **미드센추리 인테리어 에디토리얼** 선택. 하이파이 콘솔 대시보드 → 잡지 스프레드로 레이아웃 교체, 아이코닉 가구 실사+이름으로 스타일 즉시 인식([[style-visibility-over-vehicle]] 적용). 팔레트·무드보드는 이미 강한 MCM이라 유지.
- 인터랙션 QA: Girard Textile 클릭 시 `aria-pressed` 전환, 실사 핀 4 하이라이트, 캡션이 Alexander Girard·1959·Handwoven wool로 함께 갱신 확인.
- RED/GREEN: distinction 구 마커(MONO HOUSE/SIDE A/SIDE B/Walnut source rail/Girard acoustic cloth/Session queue) 제거, 신 마커(ATOMIC/mid-century living/HOUSE STUDY/the pieces/Eames Lounge Chair) GREEN. 위임 대상 파일 교체·구 파일 삭제, 래퍼 클린.
- browser QA: 1280 full(614×540)·375 모바일(284×540)·compact 카드 모두 page overflow 0, 비의도 클리핑 0. 모바일은 실사 피처→the pieces→크레딧 세로 스택(기사/pull quote는 md↑에서만), compact는 the pieces 4가구로 압축.
- console: 상세 페이지 error 0. 목록 페이지 중복 key 경고(distortion rail 등, HMR로 반복 표기)는 기존 타 스타일 데이터 이슈로 MCM 범위 밖.
- 명령: `check:data`(87)·`check:style-distinction`(87)·`npm run lint`·`next build`(577 pages) 통과.
- screenshots: `mcm-full-v1.jpeg`, `mcm-mobile-v1.jpeg`, `mcm-compact-v1.jpeg`.
- 남은 의심점: 없음.

## 25. classic — 재디자인 (소유자 지시: "제대로 다시 리디자인, 사진은 가능하면 적게, 클래식을 제대로 보여줄 것")

### 현재 판정

- status: `queued` → `reviewing`.
- 현재 `ClassicHeritageCommerce`(Heritage Co. — 헤리티지 패션 커머스)는 referenceSites(Ralph Lauren/Brooks Brothers/Burberry)를 가장 문자 그대로 옮긴 **정석적 vehicle**. 좌측 컬럼은 라벨 2개(EDITORIAL/SHOP)뿐이라 사실상 비어 있고, 하단 상품 카드 4개는 이미지 대신 `bg-accent-2` 색면 + 라벨(BLAZER/OXFORD/LEATHER/ARCHIVE)이라 AGENTS.md의 "플레이스홀더 색면 금지" 위반.
- 인접 style과의 구분 조건: neoclassic(호텔 예약·기둥/대리석), luxury(제품 리빌·소재 실사), old-money(클럽 숍) 모두 **사진 주도 커머스**. classic이 같은 골격을 쓰면 구분이 색상 차이로만 남음.
- 방향: 사진을 빼고 **책 타이포그래피 자체를 레이아웃 골격으로** 삼는다. 클래식의 정체성(비례·대칭·세리프 위계·괘선·항구성)은 인쇄된 표제지에 가장 순수하게 남아 있음. [[style-visibility-over-vehicle]] 적용.

### referenceSites에서 가져올 웹 문법

- Ralph Lauren / Brooks Brothers: 중앙 정렬 마스트헤드 + 얇은 괘선으로 나눈 섹션 밴드, 스몰캡 라벨.
- Hermes / Smythson: 조용한 내비게이션, 소재·제법을 값으로 명시하는 제품 레코드(스펙 테이블).
- Burberry: 헤리티지 상품이 **동일 리듬으로 반복**되는 카탈로그 열(→ 책등 서가로 치환).
- Awwwards Luxury: 절제된 CTA 1개 + 보조 링크 1개, 넓은 여백.

### 목표

- 컨셉: **"CLARENDON HOUSE" — 클래식 총서를 내는 출판사의 표제지형 웹 페이지**(패션 숍이 아님). 사진 0장.
- 고유 마커(check-style-distinction): `Clarendon House` / `THE PERMANENT EDITION` / `cloth spine shelf` / `volume record` / `standing order` / `colophon`.
- 정보 구조: 중앙 마스트헤드(Est. MDCCCXXXIV | CLARENDON HOUSE | London·Oxford) + thick-thin 이중괘 + 카탈로그 nav → 표제지 히어로(THE PERMANENT EDITION · SERIES XI / "Books bound to be kept." / 플러런 오너먼트 / CTA 1+1) → `cloth spine shelf`(11권, 판형 두께·높이 가변, 금박 밴드·번호 패널, 선택 인터랙션) → `volume record`(드롭캡 + 점선 리더 스펙 테이블) | `standing order`(3플랜 라디오 + 등록 CTA) → `colophon`(조판·용지·제본 표기).
- 레이아웃 차별: 기존 샘플에 없는 **엄격한 좌우 대칭 수직 스택(표제지 축)**. 이미지 주도/비대칭 스플릿/OS UI 계열과 골격이 겹치지 않음.
- 팔레트·무드보드: 기존 유지(아이보리 #F3EFE5·네이비 #10213F·옥스블러드 #7C1F2A·금 #C7A66A). 이미 정확한 클래식 팔레트라 색은 건드리지 않고 **형태로만** 재설계.

### 검증 계획

- RED/GREEN: `ClassicHeritageCommerce` → `ClassicPermanentLibrary` 위임 래퍼 + `ClarendonHouseLibrary.tsx`, 신규 마커 6개 GREEN(래퍼는 마커 미보유). check:data·check:style-distinction·lint·tsc·build 통과.
- browser QA: 1440 full / 390 모바일 / compact 카드 — page overflow 0 + **샘플 내부 scrollWidth 초과 0**, 책등 선택 → volume record 연동 확인.

### 구현 및 검증 결과 (2026-07-29)

- status: `verified`.
- 변경 요약: 인라인 `ClassicHeritageCommerce` 삭제 → 위임 래퍼 `ClassicPermanentLibrary` + 신규 `ClarendonHouseLibrary.tsx`(use client, 책등 선택·플랜 선택 useState 2개). `GeneratedStyleImageSurface` 제거로 **사진 0장**, 클래식 신호를 전부 인쇄 문법으로 구성: 중심축 대칭, thick-thin 이중괘(`DoubleRule`), 괘선-마름모-괘선 플러런(`Fleuron`), 스몰캡 레터스페이싱, 드롭캡(`first-letter:`), 점선 리더(dotted border), 로마숫자 권번호, 콜로폰.
- 색면 플레이스홀더 제거: 상품 카드 4개(`bg-accent-2` 색면) → 실제 서가. 책등 11권은 분량(extent)에 따라 `flexGrow`로 **두께가 다르고**, 높이도 80~100%로 달라지며, `CLOTH_SHADING` 그라디언트로 클로스 곡률 음영을 넣어 납작한 색블록으로 읽히지 않게 함. 금박 헤드/풋 밴드 2줄 + 번호 패널.
- representativeTraits 모듈 매핑: Balanced serif hierarchy→표제지 히어로, Heritage product rhythm→cloth spine shelf, Ivory and navy restraint→팔레트 운용, Archive catalog modules→volume record + Series XI 권번호, Material credibility→binding/extent/colophon.
- 인터랙션 QA: Middlemarch 책등 클릭 시 `aria-pressed` 전환·책등 상승, volume record가 VOLUME XXXVI / £32 / 912 pp. / Oxblood cloth / 1891로 함께 갱신 확인. standing order 플랜 라디오 3종 동작.
- RED/GREEN: 구 함수명 `ClassicHeritageCommerce` 제거, `styleSampleFunctions.classic` → `ClassicPermanentLibrary`, `delegatedSampleSources`에 `ClarendonHouseLibrary.tsx` 등록, `requiredFamilyMarkers.classic` 6개 신설 GREEN(래퍼 클린).
- browser QA: 1440 full(702×540)·390 모바일(330×540)·compact 카드(503×218) 모두 page overflow 0, **샘플 내부 가로 overflow 0**. 1차 측정에서 모바일 내부 56px 넘침(히어로 CTA 가로 배치·nav 5항목·하단 2열) 발견 → md 미만에서 CTA 세로 스택 / nav 3항목 / 하단 1열(standing order는 md↑) 로 수정 후 0. compact는 이중괘+표제지+서가 9권(제목 숨김, 금박 패널만)으로 압축, contentH 198 < boxH 218.
- console: 상세 페이지 error 0.
- 명령: `check:data`(78)·`check:style-distinction`(78)·`npm run lint`·`tsc --noEmit` 통과.
- screenshots: `classic-before.jpeg`, `classic-final-full.jpeg`, `classic-final-mobile.jpeg`, `classic-compact.jpeg`, `classic-selected.jpeg`.
- 남은 의심점: `scripts/style-references.json`의 classic > galleries > Awwwards note가 한글 인코딩 깨짐(mojibake) 상태로 라이브 페이지에 노출됨. 이번 샘플 재설계 범위 밖이라 손대지 않음 — 별도 정리 필요.
- 다음 style: No. 36 `neoclassic`.

### 후속 (2026-07-29, 소유자 지시: "책을 좀더 촘촘하게 쌓아줘")

- 서가 밀도 상향: 11권 → **17권**(No. XXVIII–XLIV), 책등 간격 `gap-[2px]` → `gap-0`으로 완전 밀착. 실제 서가처럼 책끼리 맞닿고, 두께는 여전히 분량 기반(0.70~1.95)이라 폭이 23~60px로 제각각.
- 추가 권: On Liberty, Frankenstein, Walden, Don Quixote, The Aeneid, Jane Eyre. 클로스 색이 인접해서 겹치지 않도록 navy/olive/cream/oxblood/ink/ochre 순서를 배열에서 직접 조정.
- 얇은 책등 대응: 권번호 패널을 `border`+`px-1` → `w-full outline` + 두께별 5~6px로 바꿔 좁은 책등에서 넘치지 않게 함. 풋 워드마크(CLARENDON)는 두께 1.45 이상 + md↑에서만 노출(좁은 폭에서 "CLARE…" 잘림 제거).
- 좁은 폭은 책을 얇게 만들지 않고 **권수를 줄이는** 방식: `index >= 11`은 md 미만에서 숨김 → 모바일 11권(권당 ~30px), 데스크톱 17권. compact 카드는 13권.
- 재검증: 1440 full(17권)·390 모바일(11권)·compact 카드(13권) 모두 page overflow 0 / 샘플 내부 가로 overflow 0. `check:data`·`check:style-distinction`·`lint`·`tsc --noEmit`·`next build`(550 pages) 통과.
- 정정: 이전 기록의 "style-references.json classic Awwwards note 인코딩 깨짐"은 **오탐**이었다. JSON은 정상 UTF-8 한글이고 라이브 페이지에도 정상 렌더링되며, 터미널 출력 인코딩 아티팩트였다. 남은 의심점 없음.

## 26. baroque — 재디자인 (소유자 지시: "이미지 줄이고 컬러팔레트도 바로크에 맞게, 지금은 바로크 같지 않다")

### 현재 판정

- status: `queued` → `reviewing`. 소유자 판단: "바로크하고는 다른 것 같다".
- 현재 `BaroqueGalleryCommerce`(Caravaggio Hall)의 실제 문제 두 가지.
  1. **팔레트가 바로크가 아니다.** base `#1F0E12` / surface `#32151B`로 진짜 검정이 없고, accent `#B9773B`는 금색이 아니라 탁한 주황갈색. 여기에 accent/accent2 라디얼 그라디언트를 화면 전체에 깔아서 명도 대비가 사라진 **균일한 마룬 뭉개짐**이 됨. 테네브리즘은 넓은 암부를 단일 광원이 뚫는 것인데, 암부도 광원도 없음.
  2. **바로크 조형 언어가 하나도 없다.** 장식이 전부 직사각형(중첩 사각 테두리 3겹). 바로크 장식은 스크롤워크·볼류트·아칸서스·카르투슈 같은 **곡선**이고 구도는 대각·비대칭인데, 화면은 축 정렬 사각형뿐. 좌측 "01 VELVET SALON / 02 GILDED PORTRAIT / 03 CANDLE SERVICE"는 값 없는 라벨 행.
  3. 이미지 1장이 우측을 지배하는데 오버레이·사각 프레임에 덮여 사진의 이점도 없음.
- 웹 리서치 확인: 테네브리즘 = large areas of near-total darkness pierced by a sharp focused light source. 팔레트 예시 `#050304 / #2b1b15 / #8b5c2c / #d6a542 / #f7e8be`(니어블랙–엄버–브론즈–진짜 금–아이보리). 금 = 신적인 빛, 크림슨 = 수난/열정. 장식은 flowing acanthus, volutes, nested cartouches.
- 인접 style 구분: neoclassic(밝은 대칭), luxury(소재 실사), art-deco(기하 대칭), rococo(파스텔 경쾌), gothic(수직 첨두). baroque는 **암부+단일광원+곡선 장식+의식적 위계**로 분리.

### 목표

- 컨셉: **"TEATRO SAN CASSIANO"**(1637 베네치아, 최초의 공공 오페라 극장) — 미술관이라는 정석 경로 대신 **바로크가 직접 만들어낸 극장**. 사진 0장.
- 팔레트 전면 교체: base `#0A0705`(니어블랙) / surface `#191009`(엄버) / text `#F3E4C1`(촛불 아이보리) / muted `#A5875C` / primary `#C79430`(앤틱 골드) / accent `#8C1524`(크림슨 레이크) / accent2 `#EBC96F`(빛받은 금박) / accent3 `#2C3B31`(흐린 베르디그리) / border `#7B5C2D`.
- 고유 마커: `Teatro San Cassiano` / `questa sera` / `gilded proscenium` / `cast table` / `box tier plan` / `repertory`.
- 정보 구조: 크림슨 발랑스(스캘럽 헴+금박 프린지) + 금박 카르투슈 마스트헤드 → 오늘의 아피셰(제목·작곡가·리브레토) + S-스크롤 디바이더 + `cast table`(배역/가수/성종) + 아리아 목록 | `box tier plan`(말굽형 palchi 평면도 SVG, 등급 선택 연동) + 등급별 가격 행 + 크림슨 예약 CTA → `repertory` 시즌 스트립.
- 조형: 페이지 테두리가 장식 자체(4모서리 아칸서스 볼류트), 테네브리즘은 좌상단 34%에서 떨어지는 단일 광원 + 우하단 크림슨 반사.

### 검증 계획

- RED/GREEN: `BaroqueGalleryCommerce` → `BaroqueOperaHouse` 위임 래퍼 + `TeatroSanCassiano.tsx`, 마커 6개 GREEN. check:data·check:style-distinction·check:style-refs·lint·tsc·build 통과.
- browser QA: 1440 full / 390 모바일 / compact 카드 — page overflow 0 + 샘플 내부 가로 overflow 0, 등급 선택 → 평면도·가격·잔여 연동, console error 0.

### 구현 및 검증 결과 (2026-07-29)

- status: `verified`.
- 변경 요약: 인라인 `BaroqueGalleryCommerce` 삭제 → 위임 래퍼 `BaroqueOperaHouse` + 신규 `TeatroSanCassiano.tsx`(use client, 등급 선택 useState). `GeneratedStyleImageSurface` 제거로 **사진 0장**.
- 팔레트: 위 목표대로 9색 전부 교체. 색상표 스와치가 니어블랙/엄버/아이보리/금 · 크림슨/빛받은금/베르디그리/브론즈로 바뀌어 팔레트만 봐도 바로크로 읽힘. 토큰도 weightDisplay 500→600, headingScale 0.94→1.02, shadow를 `0 22px 64px rgb(0 0 0 / 0.72)`로 강화.
- 곡선 장식 도입: `ScrollCorner`(아칸서스 볼류트 SVG, 4모서리 미러), `ScrollDivider`(괘선–S스크롤–원형 모티프), `Valance`(스캘럽 10개 + 금박 프린지 원). 전부 SVG path로 직접 그림.
- `HousePlan`: 말굽형 극장 평면도 SVG. 무대(팔코셰니코) → 플라테아 → 4개 등급(palchi I~III + loggione)이 타원 호 위에 놓이고 각 박스는 무대를 향해 접선 회전. 등급 선택 시 해당 호와 박스가 금박으로 전환.
- 하이드레이션 이슈: Node와 Chrome의 `Math.cos/atan2` 최하위 비트 차이로 SVG 좌표 문자열이 갈려 hydration mismatch 발생 → 좌표를 `toFixed`로 고정해 해소(console error 0 확인).
- 인터랙션 QA: Loggione 클릭 시 `aria-pressed` 전환, 평면도 최외곽 열 금박 전환, 가격 행 하이라이트, 잔여 표기가 "sold at door"로 갱신 확인.
- 데이터: representativeTraits를 Museum gallery rhythm 중심에서 Tenebrist single light / Gilded scrollwork frame / Curved ornament as structure 중심으로 교체. avoidTraits에 "Muddy maroon wash with no true black", "Rectangular borders standing in for ornament" 추가(이번에 실제로 걸린 실패 모드). 한국어 summary/description/visualFeatures/layoutTraits/imagePrompt도 테네브리즘·곡선 장식 기준으로 재작성. referenceSites(미술관 5곳)는 바로크 회화가 실제로 걸린 곳이라 유지.
- browser QA: 1440 full(702×540)·390 모바일(330×540)·compact 카드(505×248) 모두 page overflow 0, 샘플 내부 가로/세로 overflow 0, console error 0.
- 명령: `check:data`(78)·`check:style-distinction`(78)·`check:style-refs`(78)·`npm run lint`·`tsc --noEmit`·`next build`(550 pages) 통과.
- screenshots: `baroque-before.jpeg`, `baroque-v4.jpeg`, `baroque-tier.jpeg`, `baroque-mobile.jpeg`, `baroque-compact.jpeg`, `baroque-palette.jpeg`.
- 남은 의심점: 무드보드 `baroque-realistic-v2.webp`는 버건디 벨벳 기조라 새 팔레트의 니어블랙/베르디그리와 완전히 일치하지는 않음. 방향은 어긋나지 않아 이번 패스에서는 교체하지 않음.

## 27. art-nouveau — 재디자인 (소유자 지시: "아르누보를 수정하자")

### 현재 판정

- status: `queued` → `reviewing`.
- 현재 `ArtNouveauBotanicalShop`(Flora Atelier)은 baroque보다 상태가 나빴다.
  1. **아르누보의 1번 서명인 채찍선이 한 줄도 없다.** 화면 어디에도 되꺾이는 곡선이 없고, 우측은 타원 2개와 블롭 1개.
  2. **우측 히어로가 `PhotoSurface scene="material"` 그라디언트 플레이스홀더.** 베이지→골드 그라데이션 위에 클립아트 도형을 얹은 것이라 이미지의 이점이 전혀 없음.
  3. **좌측은 값 없는 빈 라벨 3개**(VINE FRAME / GLASS BOTTLE / PRESSED BLOOM).
  4. **팔레트가 올리브 카키**(base `#E8E2CE`, accent `#5F7F4F`)라 `natural`/`botanical`과 구분되지 않고 "generic eco"로 읽힘.
  5. 레이아웃이 좌측 텍스트 / 우측 이미지 split — 라이브러리에서 가장 흔한 골격.
- 웹 리서치 확인: coup de fouet은 "long sinuous curve that bends back on itself like an unfurling fern frond", 비대칭이며 완급이 변한다. 더 결정적인 원칙은 **"Art Nouveau designers integrated the ornament into the structural form"** — Horta는 철골을 드러낸 채 그 위에 식물 스크롤을 입혔고, Guimard의 1900년 메트로 입구는 주철 줄기가 곧 구조. 팔레트는 Mucha·Tiffany의 **보라–주황–초록 삼색조**(peacock `#0f4c5c`, burnished gold `#d8b26e`, plum `#5b304a`, parchment `#f4efe6`).
- 참고: 소유자가 제시한 `bergside/awesome-design-skills`는 이번 작업에 쓰지 않음. 67개 슬러그 중 art-nouveau·ornamental·botanical 계열이 없고, 내용도 TypeUI CLI용 스타일 철학 문서라 장식/SVG 자원이 아님.

### 목표

- 컨셉: **"MÉTROPOLITAIN"** — 보태니컬 향수샵이라는 정석 경로 대신 **기마르의 파리 메트로(1900)**. 사진 0장.
- 팔레트 전면 교체: base `#F1E8D6`(양피지) / surface `#FBF4E4` / text `#22302E` / muted `#7C7059` / primary `#12545C`(공작 청록 주철 파티나) / accent `#C98A2E`(호박 램프 유리) / accent2 `#5B304A`(오베르진) / accent3 `#8CA06B`(세이지 줄기) / border `#A98B57`.
- 고유 마커: `MÉTROPOLITAIN` / `Guimard edicule masthead` / `whiplash line` / `station record` / `billets` / `ligne index`.
- 핵심 원칙 적용: 채찍선을 장식으로 얹지 않고 **레이아웃 축 자체**로 쓴다. 독자가 따라가는 선이 곧 노선이고, 역 노드가 그 선의 on-curve 앵커이자 선택 UI다.

### 검증 계획

- RED/GREEN: `ArtNouveauBotanicalShop` → `ArtNouveauMetropolitain` 위임 래퍼 + `MetropolitainLine.tsx`, 마커 6개 GREEN. check:data·check:style-distinction·check:style-refs·lint·tsc·build 통과.
- browser QA: 1440 full / 390 모바일 / compact 카드 — page overflow 0 + 샘플 내부 overflow 0, 역 선택 연동, console error 0.

### 구현 및 검증 결과 (2026-07-29)

- status: `verified`.
- 변경 요약: 인라인 `ArtNouveauBotanicalShop` 삭제 → 위임 래퍼 `ArtNouveauMetropolitain` + 신규 `MetropolitainLine.tsx`(use client, 역 선택 useState). `PhotoSurface`(그라디언트 플레이스홀더) 제거. 최초 구현은 사진 0장이었으나 후속 지시로 마스트헤드와 장식 밴드를 실사·리소그래프 이미지로 교체(29번 참조).
- 채찍선: 1차 구현은 역을 등간격으로 놓고 수평 탄젠트 큐빅으로 이었더니 **규칙적인 사인파**가 나와 "물결 장식"으로 읽혔다. 등간격·등진폭을 버리고 path를 손으로 작성해 완급을 비대칭으로 바꿈(타이트한 상승 vs 느린 하강, 진폭 22~94 가변). 종점 Nation에서 자기 자신에게로 되감기는 고사리 순 컬을 추가해 whip crack을 명시. 역 노드는 이 path의 on-curve 끝점 좌표와 일치.
- 장식=구조: `IronStem`(주철 줄기가 올라가며 잎을 던지고 되감겨 호박 램프로 끝남, 좌우 미러) 마스트헤드, `LeadedTransom`(8분할 부채꼴 납선 유리 트랜섬, 호박/청록/오베르진/세이지 교대), 채찍선에서 갈라져 나오는 잎 3개.
- 콘텐츠 밀도: 빈 라벨 3개 → `station record`(역명·개통연도·환승 노선 에나멜 디스크·첫차/막차·출입구 형식) + `프로chains départs` 3행 + `billets` 3요금 + `ligne index` 4노선.
- 인터랙션 QA: Châtelet 노드 클릭 시 `aria-pressed` 전환, 노드 호박 채움+링, 역 기록이 Châtelet / 환승 4·7·11 / 5h42 / 0h29 / Entourage à écusson으로 갱신 확인.
- compact 수정: 1차에서 요금 행 위로 CTA가 겹치고 역명이 잘림 → compact에서 dl 2항목·요금 2행·트랜섬 h-5로 축소, 두 컬럼에 `overflow-hidden` 추가. 모바일에서는 브랜드명이 "METROPOL…"로 잘려 md 미만 트래킹/크기 축소 + 부제 앞부분 md↑ 노출로 해소.
- browser QA: 1440 full(702×540)·390 모바일(330×540)·compact 카드(505×218) 모두 page overflow 0, 샘플 내부 가로 overflow 0, 상세 페이지 console error 0. 목록 페이지의 중복 key 경고 3건은 `distortion rail`·`soft 3D modules`·`no-depth buttons` — experimental-type/claymorphism/flat-design의 기존 데이터 이슈로 art-nouveau 범위 밖.
- 부수 수정: impeccable 프로젝트 설치 이후 `npm run lint`가 벤더 스킬 파일에서 경고 414건(오류 0)을 뱉었다. `eslint.config.mjs` globalIgnores에 `.claude/skills/**`, `.agents/skills/**`, `.github/skills/**` 추가해 프로젝트 소스만 검사하도록 복구.
- 명령: `check:data`(78)·`check:style-distinction`(78)·`check:style-refs`(78)·`npm run lint`(경고 0)·`tsc --noEmit`·`next build`(550 pages) 통과.
- screenshots: `nouveau-before.jpeg`, `nouveau-final.jpeg`, `nouveau-selected.jpeg`, `nouveau-mobile.jpeg`, `nouveau-compact.jpeg`.
- 남은 의심점: 무드보드 `art-nouveau-realistic-v2.webp`는 세이지/앰버 기조라 새 팔레트의 공작 청록·오베르진과 완전히 일치하지는 않음. baroque와 같은 사유로 이번 패스에서는 교체하지 않음.

## 28. baroque / art-nouveau 무드보드 재생성 (소유자 지시: "무드보드도 새 팔레트로 다시 생성해줘")

- 26·27번에서 남겨둔 의심점 해소. 두 무드보드 모두 재설계 이전 팔레트(baroque=버건디 벨벳, art-nouveau=세이지/앰버) 기조라 샘플·색상표와 어긋나 있었다.
- 신규 스크립트 `scripts/gen-moodboard.mjs`. `gen-style-image.mjs`와 같은 `/responses` + `image_generation` 방식이되 출력이 `public/generated/moodboards/`이고 형제 파일에 맞춰 16:10 1600×1001로 리사이즈한다. `PROMPTS`를 export하고 CLI를 main-module 가드로 감싸서 데이터 갱신 스크립트가 프롬프트를 그대로 재사용할 수 있게 했다.
- **엔드포인트 함정 3개 기록:** (1) 프록시 포트가 문서의 18632가 아니라 **10100**이었다 — opencodex 프록시라 `ocx status`로 확인해야 하고, 낡은 포트로는 curl이 000으로 죽는다. (2) `store: false` 없으면 400 `"Store must be set to false"`. (3) `stream: true` 없으면 400 `"Stream must be set to true"` — 응답이 SSE라 `response.output_item.done` / `response.completed`에서 base64를 꺼내는 파서가 필요하다. `AGENTS.md`의 엔드포인트 문단도 포트 하드코딩 대신 `ocx status`로 확인하도록 고쳤다.
- baroque 결과: 니어블랙 래커 위 좌상단 단일 강한 광원(테네브리즘이 사진 조명 조건 자체가 됨), 아칸서스 스크롤워크 판화, 타원 카르투슈 스터디, 금박 프레임 모서리 파편, 크림슨 벨벳+금 브로케이드, 베르디그리 벨벳, 금박·월넛·대리석 샘플, 그리고 샘플의 `box tier plan`과 맞물리는 말굽형 객석 평면도. 수용 체크리스트 통과.
- art-nouveau 결과: 양피지 위 주철 채찍선 장식 파편, 납선 앰버/피콕 스테인드글라스, **한 줄의 사인 곡선이 페이지를 조직하는** 레이아웃 프루프(샘플의 원칙과 동일), 자기 자신에게로 감기는 줄기 잉크 드로잉, 실제로 말려 있는 고사리 순(crozier), 세이지·오베르진 칩, 공작 깃털. 수용 체크리스트 통과.
- 데이터: 두 `StyleMoodboard` 레코드의 `alt`·`caption`·`directionKeywords`·`imageSrc`·`prompt`를 전부 교체(`/generated/moodboards/{baroque,art-nouveau}.webp`). 구 `*-realistic-v2.webp`는 참조가 끊긴 채 남겨둠(`anti-design`도 두 형식이 공존하는 기존 관행).
- `docs/style-category-distinction-table.md`의 baroque·art-nouveau 행이 재설계 이전 방향(gallery commerce / perfume card, green gold)을 그대로 담고 있어 새 정체성·마커로 갱신.
- 명령: `check:data`(78)·`check:style-distinction`(78)·`check:style-refs`(78)·`lint`·`tsc --noEmit`·`build`(550 pages) 통과. 두 상세 페이지에서 무드보드 이미지·디렉션 키워드·프롬프트 렌더 확인, 390 모바일 page overflow 0.
- 남은 의심점: 없음.

## 29. art-nouveau — 벡터 장식을 이미지로, 팔레트를 무하 톤으로 (소유자 지시: "상단은 이미지를 써도 될 것 같다" → "그 위에 요상한 벡터를 이미지로 바꿔줘, 색상이 너무 강하고 아르누보 같지 않아")

### 현재 판정

- 27번 구현의 두 가지 실패가 실제 렌더에서 드러났다.
  1. **마스트헤드의 `IronStem` SVG**가 기마르 철제 구조물이 아니라 **가느다란 곡선 두 개의 낙서**로 보였고 상단 띠가 거의 빈 양피지였다.
  2. **채찍선을 stroke path로 그린 것**이 아르누보의 선이 아니라 **굵고 채도 높은 물결무늬**로 읽혔다. 주변에 흩뿌린 잎 스트로크도 정체불명의 색 조각으로 보였다.
- 팔레트도 과했다. 무하·티파니의 보라–주황–초록 삼색조는 맞지만 **포스터 잉크 채도**여야 하는데 피콕 `#12545C` / 앰버 `#C98A2E` / 오베르진 `#5B304A`는 풀채도라 시대감이 사라졌다.

### 조치

- **팔레트 전면 완화**(색상표까지 반영): base `#F0E9DA` / surface `#FAF5E9` / text `#3B3A31`(부드러운 갈색 먹) / muted `#8A8071` / primary `#4F6B62`(무딘 청록) / accent `#C0A15E`(무딘 올리브골드) / accent2 `#A88490`(더스티 로즈) / accent3 `#A9B08C`(연한 세이지) / border `#BCA985`. primary는 CTA 채움색이라 대비 확보를 위해 `#5E7E76`보다 한 단계 어둡게 잡았다.
- **마스트헤드**: `IronStem` 삭제 → 실사 밴드. `scripts/gen-style-image.mjs`에 `art-nouveau` 프롬프트 추가, 블루아워 기마르 입구 생성(공작 청록 파티나 줄기 → 호박 꽃봉오리 램프, 채찍선 난간, **글자 없는 빈 명판**). 크롭은 브라우저에서 12/20/28% 비교 후 `center 12%` 채택 — 램프와 감기는 줄기가 한눈에 들어온다.
- **채찍선 → 리소그래프 프리즈**: `art-nouveau-frieze` 프롬프트 신규 생성. 1900년 파리 컬러 리소그래프풍 장식 띠 — 아이리스·백합 줄기가 되꺾이는 채찍 곡선, 말린 고사리 순 2개, 평평한 저채도 잉크와 석판 그레인, 사진 아님·인물 없음. 크롭은 40/50/58% 비교 후 `center 50%`(꽃·줄기·고사리 모두 프레임 안).
- **역 선택 인터랙션 보존**: 선 위의 점이 사라졌으므로 프리즈 아래에 `station index`(역명 7개 + 마름모 구분자, 선택 시 앰버 밑줄) 행을 추가. `station record` 연동은 그대로.
- 마커 갱신: `whiplash line` → `whiplash frieze`, `station index` 추가.

### 검증 결과 (2026-07-30)

- status: `verified`.
- 인터랙션 QA: Bastille 클릭 시 `aria-pressed` 전환, 인덱스 밑줄 이동, 역 기록이 Bastille / 환승 5·8 / 5h46 / 0h25 / Édicule à marquise로 갱신 확인.
- browser QA: 1440 full(702×540)·390 모바일(330×540)·compact 카드(505×218) 모두 page overflow 0, 샘플 내부 overflow 0, 상세 페이지 console error 0. compact는 이미지 밴드가 공간을 쓰므로 요금 행을 1개로 줄여 CTA 겹침 해소.
- 명령: `check:data`(78)·`check:style-distinction`(78)·`check:style-refs`(78)·`lint`·`tsc --noEmit`·`build`(550 pages) 통과.
- 배운 것: 아르누보에서 **채찍선을 stroke path로 그리면 물결무늬가 된다.** 이 스타일의 선은 굵기가 변하고 잎·꽃이 붙은 판화 선이라, 직접 그릴 바에는 리소그래프 이미지를 쓰는 편이 훨씬 설득력 있다. 같은 이유로 기마르 철물도 SVG로는 재현되지 않았다.
- 남은 의심점: 모바일(330px 폭)에서는 마스트헤드 밴드가 낮아 램프가 상단 가장자리에 걸친다. 철제 곡선과 워드마크는 읽히므로 유지.

## 30. art-nouveau — 상단 실사 제거, 아피시 구성으로 재배치 (소유자 지시: "맨 위 상단 이미지도 빼고 레이아웃을 짜줘")

- 배경: 29번에서 상단에 기마르 실사 밴드, 그 아래에 리소그래프 프리즈를 두었더니 **이미지 밴드 두 개가 쌓인 형태**가 됐다. 게다가 블루아워 실사는 채도·명도가 강해서, 같은 패스에서 무하 톤으로 낮춘 크림 팔레트와 정면으로 부딪혔다.
- 조치: 기마르 실사를 빼고 **프리즈 하나를 마스트헤드로** 승격. 레이아웃을 아피시(affiche) 구성으로 재배치했다.
  - 프리즈가 full-bleed로 상단을 차지하고(9~10rem), **타이틀 밴드가 그 장식 위에 가로로 걸친다.** 밴드는 좌우 15%/85%에서 크림 0.97 → 0으로 페더되어 양 끝에서 프리즈가 그대로 이어져 보인다. 아르누보 포스터에서 제목판이 장식을 끊고 지나가는 방식.
  - 밴드 안: 상호(스몰캡) → MÉTROPOLITAIN → 괘선–마름모–괘선 → 노선 부제. 별도 마스트헤드 행과 부제 행이 사라져 약 120px이 아래 2열 콘텐츠로 넘어갔고, 이전의 빈 공간이 해소됐다.
  - 1차 시도의 방사형 크림 베일은 너무 빨리 사라져 타입이 씻겨 보였다 → 전폭 수평 페이드 밴드로 교체. 괘선 장식도 accent 1px에서는 보이지 않아 primary 1.5px + accent 마름모로 강화.
- 정리: 미사용이 된 `public/generated/design-styles/art-nouveau.webp`(기마르 실사)와 `GENERATED_STYLE_IMAGES`의 해당 항목 삭제. 필요하면 git 히스토리에서 복원 가능.
- 마커: `Guimard edicule masthead` 제거(해당 요소 없음), `MÉTROPOLITAIN`/`whiplash frieze`/`station index`/`station record`/`billets`/`ligne index` 유지. 워드마크를 HTML 엔티티로 쓰면 마커 매칭이 깨져 리터럴 `MÉTROPOLITAIN`으로 되돌렸다.
- 좁은 폭 대응: 390px에서 타이틀이 잘려 md 미만 크기·트래킹 축소, 부제는 노선 구간을 md↑에서만 노출, station index는 md 미만에서 5개 역만 표시(7개를 다 넣으면 전부 말줄임이 된다).
- 검증(2026-07-30): 1440 full·390 모바일·compact 카드 모두 page overflow 0, 샘플 내부 overflow 0, 상세 페이지 console error 0. 역 선택 QA: Concorde 클릭 → `station record` 제목이 Concorde로 갱신 확인. `check:data`(78)·`check:style-distinction`(78)·`check:style-refs`(78)·`lint`·`tsc --noEmit`·`build`(550 pages) 통과.
- 남은 의심점: 없음.

## 31. art-nouveau — 납선 유리 트랜섬 정리 (소유자 지시: "이것도 좀 깔끔하게 바꿔줘")

- 문제: `LeadedTransom`의 방사형 부채꼴이 어수선했다. (1) 납선이 중심에서 뻗는 직선이라 기계적이고 아르누보의 곡선 납선이 아니며, (2) 스프링잉 포인트의 원+꽃잎이 정체불명의 덩어리로 보였고, (3) 반원 비례라 컬럼 폭 대비 좌우에 빈 공간이 남았다.
- 교체: 실제 출입구 트랜섬처럼 **낮고 넓은 납선 패널**로 재작성. 얕은 아치(300×50 viewBox, apex y=12.5), 큰 유리 셀 5개, 수직 멀리언 4개, 그리고 **셀들을 가로지르는 곡선 납선 하나**. 중앙 덩어리는 삭제하고 하단에 굵은 베이스 레일을 넣었다.
- 색은 팔레트 변수 기반 3색(sage/gold/rose)만 낮은 알파로 대칭 배치해 이전의 탁한 파스텔 8색보다 정돈됐다. 멀리언 좌표는 아치 베지어에서 계산한 리터럴이라 하이드레이션 불일치가 없다.
- 컨테이너 높이 h-14 → h-11(compact h-5 → h-4), `preserveAspectRatio="none"`으로 컬럼 폭을 꽉 채우게 해 좌우 빈 공간 제거.
- 부수 수정: 아피시 헤드 부제에서 `</span>` 뒤 공백이 JSX에 먹혀 "Vincennes· MCM"으로 붙어 있었다. `{" "}`로 명시해 해결(DOM 텍스트로 확인).
- 검증(2026-07-30): 1440 full·390 모바일·compact 카드 모두 page overflow 0, 샘플 내부 overflow 0, console error 0. `check:data`(78)·`check:style-distinction`(78)·`lint`·`tsc --noEmit`·`build`(550 pages) 통과.
- 남은 의심점: 없음.

## 32. gothic — 재디자인 (소유자 지시: "Gothic도 수정 들어가자")

### 현재 판정

- 현재 `GothicCathedralArchive`(Stone Archive)는 앞선 스타일들과 정확히 같은 실패를 반복하고 있었다.
  1. **뾰족아치가 없다.** `clipPath: polygon(50% 0, 100% 32%, ...)`로 만든 **오각형 도형 3개에 그라디언트**를 채웠을 뿐이고, 트레이서리·리브·수직 체계가 전무하다.
  2. 좌측은 값 없는 빈 라벨 3개(POINTED ARCH / STAINED GLASS / STONE RIBS).
  3. 배경이 `PhotoSurface scene="studio"` 플레이스홀더.
  4. 팔레트가 자기 `avoidTraits`에 적힌 **"Generic black fashion page"** 그대로(base `#0D0F12`).
- 웹 리서치의 결정적 문장: **"The entire Gothic structural system — pointed arches, ribbed vaults, flying buttresses — exists ultimately to free the wall for light."** 즉 어두운 화면에 탁한 색면을 얹는 것은 고딕의 정반대다. 수직 상승은 초월의 상징이므로 verticality도 장식이 아니라 구조다.

### 목표

- 컨셉: **"OPUS FABRICAE"** — 방문자 안내 페이지도 상점도 아닌 **대성당 조영국(fabric, 건축기금·작업소)**. 유리를 베이 단위로 시공·모금하는 실무 화면.
- 팔레트 전면 교체: base `#22262E`(차가운 슬레이트) / surface `#2E333D` / text `#E9E7DF`(석회암) / muted `#9BA0AA` / primary `#2C6BA8`(코발트 유리) / accent `#A8202F`(루비) / accent2 `#D8B453`(금) / accent3 `#2F7A5E`(에메랄드) / border `#6E7480`. 바로크가 따뜻한 니어블랙+금박을 쓰므로 고딕은 **차갑고 한 단계 밝은 석재**로 분리한다.
- 고유 마커: `Opus Fabricae` / `bay elevation` / `bay record` / `fabric roll` / `Ferramenta`.
- 골격: **수직성 자체가 레이아웃**. 좌측을 랜싯 비례 실사가 전면 높이로 차지하고(머리를 뾰족아치로 클립), 우측 작업 모듈은 뾰족아치 7베이 입면이다.

### 구현 및 검증 결과 (2026-07-30)

- status: `verified`.
- 변경 요약: 인라인 `GothicCathedralArchive` 삭제 → 위임 래퍼 `GothicGlazingFabric` + 신규 `OpusFabricae.tsx`(use client, 베이 선택 useState). `PhotoSurface` 제거.
- 이미지: `scripts/gen-style-image.mjs`에 `gothic` 프롬프트와 **세로 사이즈 옵션(`SIZES`)** 추가 후 1024×1536 생성. 결과는 실제 애프스 — 코발트·루비 랜싯이 화면에서 가장 밝고, 차가운 석회암과 리브볼트 스프링잉, 석재에 떨어진 색광까지. "벽을 열어 빛을 들인다"는 판정 기준을 그대로 만족.
- `BayElevation`: 두 중심 뾰족아치 7개를 리터럴 좌표로 그리고, 각 베이를 모금 상태(glazed / in the lodge / awaiting)에 따라 유리색으로 **아래에서부터 채운다**. 새들바(가로 철물)와 중앙 멀리언, 아치 머리의 트레포일 포함. 선택 시 금색 윤곽 + `bay record` 연동.
- 조형 원칙: **아치는 구조라서 그렸고, 잔장식은 그리지 않았다.** 앞선 아르누보에서 얻은 교훈(선 장식을 벡터로 그리면 실패)을 구조/장식으로 나눠 적용.
- 튜닝 2회: (1) viewBox 상단 33%가 빈 공간이라 아치가 화면을 못 채움 → 랜싯을 크게 높이고(BAY_BASE 122→210) viewBox를 내용에 맞춤. (2) 2열 dl에 점선 리더를 쓰니 "Lodge of the Fab…"가 잘림 → 라벨-값 세로 스택 + 좌측 굵은 괘선으로 교체(점선 리더는 classic의 서명이므로 중복도 해소).
- 데이터: representativeTraits를 "Dark sacred mood" 중심에서 "Wall dissolved for light" 중심으로 교체, avoidTraits에 이번에 실제로 걸린 실패 모드("Dull colour blocks standing in for glass", "Near-black ground with no stone in it") 추가. 한국어 summary/description/visualFeatures/layoutTraits/imagePrompt도 빛·구조 기준으로 재작성. `docs/style-category-distinction-table.md`의 gothic 행도 갱신.
- 인터랙션 QA: Bay VII 클릭 시 `bay record`가 The Last Judgement / Awaiting a benefactor / Not yet let / Missing / £ 60으로 갱신 확인.
- browser QA: 1440 full(702×540)·390 모바일(330×540)·compact 카드(505×218) 모두 page overflow 0, 샘플 내부 overflow 0, 상세 페이지 console error 0. 잘린 dd 0건(DOM 측정).
- 명령: `check:data`(78)·`check:style-distinction`(78)·`check:style-refs`(78)·`lint`·`tsc --noEmit`·`build`(550 pages) 통과.
- 남은 의심점: 무드보드 `gothic-realistic-v2.webp`는 이전의 어두운 기조라 새 팔레트와 완전히 일치하지 않는다. baroque·art-nouveau와 같은 사유로 이번 패스에서는 두었다.

## 33. rococo — 재디자인 (소유자 지시: "로코코를 다시 스타일 잡자")

### 현재 판정

- 현재 `RococoSalonMarket`(Salon Pastel · Tea/Beauty/Gifts)은 같은 실패 계열. 생성 이미지 1장 옆에 **팔레트 색으로 채운 블롭 4개**("Porcelain / Pearl / Ribbon / Cream")가 상품 카드 행세를 하고, 그 외에는 큰 "Rococo" 제목뿐이다. 로카유도 비대칭도 없다.
- 팔레트도 문제. base `#F4E9E8` + accent `#D4A7B4`는 장밋빛 파스텔이라 `pastel-style`·`kawaii`와 구분되지 않는다. 실제 로코코 실내의 주조색은 **아이보리와 금**이고, 파스텔은 몰딩 안쪽으로 들어간 패널 바탕이다.
- 웹 리서치 확인: rococo는 rocaille(조개로 덮인 인공 동굴 장식)에서 온 말이고, **"asymmetrical design was the rule"** — 당대 용어로 contraste, 좌우 어느 쪽도 반대쪽을 되풀이하지 않는다. 표면은 boiserie(조개·바위 형태·C/S 스크롤을 새긴 목재 패널). 색은 light pastels, ivory white, gold.

### 목표

- 컨셉: **"ATELIER DE LA ROCAILLE"** — 파스텔 선물가게라는 정석 경로 대신 **그 장식을 실제로 만든 조각·금박 공방**. 한 방의 패널을 하나씩 주문·조각·금박하는 실무 화면.
- 팔레트 교체: base `#EDE7DA`(아이보리 보아즈리) / surface `#F8F4E9` / text `#4A3B33` / muted `#948270` / primary `#B08A3E`(물금박) / accent `#C98A9B`(로즈) / accent2 `#9FB6AE`(베르 도) / accent3 `#8C93B8`(블뢰) / border `#C9BBA3`.
- 고유 마커: `Atelier de la Rocaille` / `rocaille motif` / `Commission` / `Dorure` / `Contraste`.
- 골격: **비대칭이 규칙이므로 의도적으로 크기가 다른 패널 필드**. 같은 크기 카드 그리드를 쓰지 않는다.

### 구현 및 검증 결과 (2026-07-30)

- status: `verified`.
- 변경 요약: 인라인 `RococoSalonMarket` 삭제 → 위임 래퍼 `RococoBoiserieAtelier` + 신규 `AtelierRocaille.tsx`(use client, 패널 선택 useState).
- 이미지: `gen-style-image.mjs`에 `rococo` 세로 프롬프트 추가 후 생성. 결과는 교과서적 보아즈리 — 크레스트의 금박 조개, 엉킨 C·S 스크롤, 잎 장식과 늘어진 꽃, **한쪽에만 장식이 있는 의도적 비대칭**, 크라클뤼르가 있는 로즈 필드. 사진이 로카유를 담당하고 벡터로는 그리지 않았다(아르누보 교훈).
- `PanelField`: 금박 비드 + 안쪽 몰딩 + 한쪽만 둥근 어깨(`borderRadius: 14px 4px 4px 4px`)로 보아즈리 필드를 만들고, 세 필드의 위아래를 `mb-5`/`mt-7`로 엇물려 contraste를 눈에 보이게 했다.
- 콘텐츠: 패널 인덱스(트뤼모·드쉬드포르트·알레주·앙브라쥐르·랑브리) → `Commission` 기록(조각가·금박공·목재·바탕) → 오너먼트 스케줄(부재별 수량과 공정) → 견적(리브르·공수) → `Dorure` 공정 레일(Dessin→Brunissage 6단계, 선택 패널의 진행 위치 표시).
- 튜닝 3회: (1) 가운데 필드가 크게 비어 오너먼트 스케줄과 견적 행 추가. (2) 패널 바탕이 풀채도라 무거워 `rgb(var(--st-*-rgb) / 0.3~0.36)` 워시로 변경. (3) 390px에서 브랜드명·탭·오너먼트명이 모두 잘려, md 미만에서 날짜 숨김·탭 3개·수량 열 숨김·패딩 축소·타이틀 축소로 해소(잘림 0건 DOM 측정).
- 데이터: representativeTraits를 "Pastel salon" 중심에서 "Contraste — no half repeats the other" 중심으로 교체, avoidTraits에 "Candy pastel palette shared with pastel-style", "Symmetrical grids of equal cards" 추가. 한국어 설명과 imagePrompt도 비대칭·보아즈리 기준으로 재작성. 구분표 rococo 행 갱신.
- browser QA: 1440 full(702×540)·390 모바일(330×540)·compact 카드(505×218) 모두 page overflow 0, 샘플 내부 overflow 0, console error 0.
- 명령: `check:data`(77)·`check:style-distinction`(77)·`check:style-refs`(77)·`lint`·`tsc --noEmit`·`build`(547 pages) 통과.
- 남은 의심점: 무드보드 `rococo-realistic-v2.webp`는 이전 로지 파스텔 기조라 새 팔레트와 어긋난다. baroque·art-nouveau·gothic과 함께 재생성 대상으로 남겨 둔다.
