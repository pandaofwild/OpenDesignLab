export type DesignStylePalette = {
  base: string;
  surface: string;
  text: string;
  mutedText: string;
  primary: string;
  accent: string;
  accent2: string;
  accent3: string;
  border: string;
};

export type DesignStyleSampleType =
  | "minimal-editorial"
  | "brutalist-poster"
  | "retro-commerce"
  | "cyber-dashboard"
  | "luxury-product"
  | "organic-brand"
  | "kawaii-app"
  | "street-campaign"
  | "magazine-layout"
  | "saas-landing";

export type StyleDensity = "airy" | "normal" | "tight";
export type StyleEffect = "none" | "glitch" | "scanline" | "grain" | "glow" | "gradient";

export type StyleTokens = {
  color: {
    base: string; surface: string; text: string; muted: string;
    primary: string; accent: string; accent2: string; accent3: string; border: string;
  };
  typography: {
    displayFont: string;
    bodyFont: string;
    weightDisplay: number;
    weightBody: number;
    tracking: string;
    headingScale: number;
  };
  shape: {
    radius: string;
    radiusPill: string;
    borderWidth: string;
    borderStyle: "solid" | "dashed" | "double";
  };
  space: {
    density: StyleDensity;
    gap: string;
    padScale: number;
  };
  decoration: {
    shadow: string;
    effect: StyleEffect;
  };
  layout: {
    heroVariant: "left" | "center" | "split";
    navStyle: "minimal" | "boxed" | "underline";
    alignment: "left" | "center";
  };
};

export type StyleReferenceSource = {
  title: string;
  url: string;
  note: string;
};

export type StyleResearchBrief = {
  referenceSites: StyleReferenceSource[];
  referenceGalleries: StyleReferenceSource[];
  representativeTraits: string[];
  avoidTraits: string[];
  tokenIntent: string;
};

export type DesignStyle = {
  slug: string;
  nameKo: string;
  nameEn: string;
  category: string;
  summary: string;
  description: string;
  visualFeatures: string[];
  colorPalette: string[];
  typography: string[];
  layoutTraits: string[];
  useCases: string[];
  goodFor: string[];
  cautions: string[];
  tags: string[];
  related: string[];
  palette: DesignStylePalette;
  imagePrompt: string;
  research?: StyleResearchBrief;
  sampleType: DesignStyleSampleType;
  tokens: StyleTokens;
};

type CategoryProfile = {
  caution: string;
  colorNotes: string[];
  goodFor: string[];
  layout: string[];
  sampleType: DesignStyleSampleType;
  typography: string[];
  useCases: string[];
  visual: string[];
};

type DesignStyleSeed = {
  category: string;
  nameEn: string;
  nameKo: string;
  palette: DesignStylePalette;
  sampleType?: DesignStyleSampleType;
  slug: string;
  tags: string[];
  tone: string;
};

type DesignStyleSeedTuple = [
  slug: string,
  nameKo: string,
  nameEn: string,
  category: string,
  tone: string,
  tags: string[],
  sampleType: DesignStyleSampleType,
];

type StyleContentOverride = Partial<Pick<
  DesignStyle,
  | "summary"
  | "description"
  | "visualFeatures"
  | "colorPalette"
  | "typography"
  | "layoutTraits"
  | "useCases"
  | "goodFor"
  | "cautions"
  | "imagePrompt"
  | "research"
>>;

const promptSuffix =
  "clean composition, high-quality design reference image, no logo, no watermark, suitable for a design encyclopedia card";

const categoryProfiles: Record<string, CategoryProfile> = {
  "모던 / 미니멀": {
    caution: "표현을 줄이는 만큼 브랜드만의 기억점이 사라지지 않도록 한두 개의 강한 시각 신호를 남겨야 합니다.",
    colorNotes: ["절제된 중성 배경", "낮은 채도의 보조색", "검정 또는 짙은 회색 본문", "작은 면적의 따뜻한 포인트"],
    goodFor: ["브랜드 소개", "스튜디오 포트폴리오", "문서형 서비스", "프리미엄 랜딩페이지"],
    layout: ["넓은 여백", "명확한 단일 컬럼", "얇은 경계선", "적은 수의 CTA"],
    sampleType: "minimal-editorial",
    typography: ["정제된 산세리프 제목", "작은 메타 라벨", "읽기 쉬운 본문 행간"],
    useCases: ["회사 소개", "제품 철학 페이지", "포트폴리오", "콘텐츠 허브"],
    visual: ["불필요한 장식을 덜어낸 화면", "정돈된 여백", "명료한 정보 위계", "섬세한 표면 대비"],
  },
  "강렬 / 실험": {
    caution: "의도적인 불편함과 혼란이 탐색 실패로 이어지지 않도록 핵심 CTA와 정보 경로는 분명하게 고정해야 합니다.",
    colorNotes: ["고대비 배경", "강한 원색 포인트", "검정과 흰색의 직접 대비", "충돌감 있는 보조색"],
    goodFor: ["브랜드 캠페인", "패션 룩북", "전시 홍보", "실험적 포트폴리오"],
    layout: ["비대칭 그리드", "큰 타이포 블록", "겹친 섹션", "강한 경계선"],
    sampleType: "brutalist-poster",
    typography: ["무거운 디스플레이 타입", "압축된 대문자 라벨", "의도적으로 큰 제목"],
    useCases: ["캠페인 첫 화면", "포스터형 랜딩", "아티스트 페이지", "행사 소개"],
    visual: ["거친 대비", "실험적 배치", "강한 타이포그래피", "의도적인 긴장감"],
  },
  "레트로 / 빈티지": {
    caution: "복고 표현이 단순한 장식으로 보이지 않게 실제 콘텐츠 구조와 상호작용은 현대적인 기준으로 유지해야 합니다.",
    colorNotes: ["오래된 인쇄물 같은 배경", "바랜 원색", "따뜻한 노랑과 갈색", "필름감 있는 포인트"],
    goodFor: ["브랜드 굿즈", "음악 이벤트", "식음료 브랜드", "콘텐츠 캠페인"],
    layout: ["포스터식 히어로", "상품 카드 그리드", "굵은 배지", "반복되는 장식 라벨"],
    sampleType: "retro-commerce",
    typography: ["둥글거나 기하학적인 제목", "빈티지 포스터 라벨", "두꺼운 가격/숫자"],
    useCases: ["상품 컬렉션", "이벤트 랜딩", "레코드샵", "레트로 브랜드 페이지"],
    visual: ["시대감 있는 색감", "인쇄물 질감", "장식적 라벨", "선명한 상품 신호"],
  },
  "미래 / 디지털": {
    caution: "네온과 광택 효과가 많아질수록 정보 대비와 피로도가 나빠질 수 있으므로 본문 영역은 충분히 안정적으로 둬야 합니다.",
    colorNotes: ["어두운 베이스", "시안과 마젠타", "발광하는 라인", "차가운 보조색"],
    goodFor: ["AI 서비스", "게임", "개발자 도구", "테크 콘퍼런스"],
    layout: ["어두운 대시보드", "겹친 패널", "데이터 카드", "광택 있는 경계선"],
    sampleType: "cyber-dashboard",
    typography: ["각진 디스플레이 타입", "모노스페이스 메타", "고대비 숫자"],
    useCases: ["대시보드", "AI 제품 랜딩", "게임 이벤트", "테크 쇼케이스"],
    visual: ["디지털 광원", "네온 경계선", "깊은 어둠", "미래적 패널"],
  },
  "럭셔리 / 클래식": {
    caution: "고급스러운 분위기를 위해 장식을 늘리기보다 재료감, 간격, 타이포 대비를 절제해서 사용해야 합니다.",
    colorNotes: ["아이보리와 잉크색", "골드 포인트", "짙은 와인 또는 네이비", "낮은 채도의 보조색"],
    goodFor: ["하이엔드 커머스", "호텔", "뷰티 브랜드", "프리미엄 포트폴리오"],
    layout: ["중앙 정렬 히어로", "제품 중심 섹션", "섬세한 경계선", "큰 이미지 영역"],
    sampleType: "luxury-product",
    typography: ["세리프풍 제목", "자간이 넓은 라벨", "작은 본문 텍스트"],
    useCases: ["상품 상세", "호텔 소개", "프리미엄 브랜드", "브랜드 스토리"],
    visual: ["정제된 장식성", "고전적 비례", "소재감 있는 표면", "차분한 고급감"],
  },
  "자연 / 수공예": {
    caution: "자연스러운 분위기를 만들더라도 버튼, 폼, 가격 같은 기능 정보는 충분히 선명하게 보여야 합니다.",
    colorNotes: ["식물성 그린", "흙빛 베이지", "점토색 포인트", "부드러운 분홍 또는 크림"],
    goodFor: ["웰니스", "로컬 브랜드", "수공예 제품", "친환경 서비스"],
    layout: ["느슨한 카드 묶음", "비정형 색 면", "넓은 행간", "사진 중심 블록"],
    sampleType: "organic-brand",
    typography: ["부드러운 산세리프", "손맛 있는 라벨", "편안한 본문 리듬"],
    useCases: ["브랜드 소개", "제품 컬렉션", "워크숍 페이지", "웰니스 랜딩"],
    visual: ["자연 질감", "부드러운 색 면", "수작업 감성", "여유로운 리듬"],
  },
  "귀여움 / 캐주얼": {
    caution: "귀여운 요소가 많아질수록 정보의 신뢰도가 낮아질 수 있으므로 구매, 가입, 저장 같은 핵심 행동은 단정하게 유지합니다.",
    colorNotes: ["밝은 파스텔", "강한 캔디 컬러", "흰 표면", "경쾌한 보조색"],
    goodFor: ["캐주얼 앱", "이벤트", "키즈 브랜드", "팬 커뮤니티"],
    layout: ["반복 카드", "큰 배지", "둥근 시각 요소", "짧은 CTA"],
    sampleType: "kawaii-app",
    typography: ["둥근 제목", "짧은 라벨", "명랑한 버튼 텍스트"],
    useCases: ["모바일 앱", "프로모션", "굿즈 페이지", "커뮤니티 이벤트"],
    visual: ["밝은 에너지", "친근한 형태", "가벼운 움직임", "색상 대비"],
  },
  "스트리트 / 서브컬처": {
    caution: "거친 질감과 강한 색을 쓰더라도 브랜드명, 일정, 구매 같은 핵심 정보가 배경에 묻히지 않아야 합니다.",
    colorNotes: ["검정과 거친 종이색", "형광색 포인트", "강한 빨강", "스티커 같은 보조색"],
    goodFor: ["패션", "음악", "스케이트 문화", "서브컬처 이벤트"],
    layout: ["겹친 포스터", "스티커식 카드", "굵은 테두리", "의도적인 밀도"],
    sampleType: "street-campaign",
    typography: ["압축된 굵은 제목", "붙인 듯한 라벨", "거친 메타 텍스트"],
    useCases: ["룩북", "콘서트 페이지", "드롭 캠페인", "커뮤니티 페이지"],
    visual: ["거리감 있는 질감", "스티커 레이어", "강한 충돌감", "날것의 그래픽"],
  },
  "편집 / 타이포그래피": {
    caution: "타이포그래피가 주인공이어도 사용자가 빠르게 훑을 수 있도록 목차, 카드, 메타 정보를 체계적으로 배치해야 합니다.",
    colorNotes: ["종이색 배경", "검정 본문", "편집 포인트 컬러", "사진 또는 콜라주 보조색"],
    goodFor: ["매거진", "뉴스레터", "아카이브", "전시 소개"],
    layout: ["엄격한 그리드", "큰 제목", "다단 본문", "인용과 이미지 블록"],
    sampleType: "magazine-layout",
    typography: ["큰 헤드라인", "섬세한 본문", "번호와 캡션"],
    useCases: ["기사 상세", "매거진 홈", "리포트", "콘텐츠 아카이브"],
    visual: ["글 중심 화면", "편집적 리듬", "그리드 질서", "강한 제목 위계"],
  },
  "UI / 웹": {
    caution: "트렌디한 UI 효과가 기능을 가리지 않도록 상태, 포커스, 비활성, 오류 표현을 함께 설계해야 합니다.",
    colorNotes: ["제품형 중성 배경", "명확한 브랜드 포인트", "상태 색상", "높은 대비의 텍스트"],
    goodFor: ["SaaS", "웹 앱", "대시보드", "스타트업 랜딩"],
    layout: ["컴포넌트 카드", "기능 섹션", "반응형 그리드", "명확한 CTA"],
    sampleType: "saas-landing",
    typography: ["실용적인 산세리프", "숫자와 상태 라벨", "명확한 버튼 텍스트"],
    useCases: ["제품 랜딩", "관리 도구", "앱 소개", "기능 비교"],
    visual: ["사용성 중심", "선명한 컴포넌트", "상태 표현", "반복 가능한 시스템"],
  },
};

const categoryTokenDefaults: Record<string, StyleTokens> = {
  "모던 / 미니멀": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 600, weightBody: 400, tracking: "-0.02em", headingScale: 1.0 },
    shape: { radius: "2px", radiusPill: "2px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1rem", padScale: 1.2 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "left", navStyle: "minimal", alignment: "left" },
  },
  "강렬 / 실험": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 800, weightBody: 500, tracking: "-0.05em", headingScale: 1.25 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "3px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.5rem", padScale: 0.9 },
    decoration: { shadow: "6px 6px 0 var(--st-primary)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "레트로 / 빈티지": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 700, weightBody: 400, tracking: "-0.01em", headingScale: 1.1 },
    shape: { radius: "4px", radiusPill: "4px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "3px 3px 0 var(--st-primary)", effect: "grain" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "center" },
  },
  "미래 / 디지털": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"SFMono-Regular", monospace', weightDisplay: 700, weightBody: 400, tracking: "0em", headingScale: 1.1 },
    shape: { radius: "4px", radiusPill: "4px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "0 0 18px rgb(var(--st-accent-rgb) / 0.5)", effect: "glow" },
    layout: { heroVariant: "center", navStyle: "underline", alignment: "left" },
  },
  "럭셔리 / 클래식": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Georgia", "Times New Roman", serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 400, weightBody: 300, tracking: "0.08em", headingScale: 0.9 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.5rem", padScale: 1.5 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "center", navStyle: "minimal", alignment: "center" },
  },
  "자연 / 수공예": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Satoshi", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 600, weightBody: 400, tracking: "0.01em", headingScale: 1.0 },
    shape: { radius: "8px", radiusPill: "8px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.25rem", padScale: 1.3 },
    decoration: { shadow: "none", effect: "grain" },
    layout: { heroVariant: "left", navStyle: "minimal", alignment: "left" },
  },
  "귀여움 / 캐주얼": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 700, weightBody: 400, tracking: "-0.01em", headingScale: 1.05 },
    shape: { radius: "20px", radiusPill: "9999px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "4px 4px 0 var(--st-accent)", effect: "none" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "center" },
  },
  "스트리트 / 서브컬처": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 900, weightBody: 500, tracking: "-0.04em", headingScale: 1.3 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "3px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.5rem", padScale: 0.85 },
    decoration: { shadow: "4px 4px 0 var(--st-accent)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "편집 / 타이포그래피": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 700, weightBody: 400, tracking: "-0.03em", headingScale: 1.15 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "left", navStyle: "underline", alignment: "left" },
  },
  "UI / 웹": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Satoshi", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 700, weightBody: 400, tracking: "-0.01em", headingScale: 1.0 },
    shape: { radius: "8px", radiusPill: "8px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "0 2px 8px rgba(0,0,0,0.12)", effect: "none" },
    layout: { heroVariant: "center", navStyle: "minimal", alignment: "left" },
  },
};

const palettes: Record<string, DesignStylePalette> = {
  minimalism: {
    base: "#F7F7F4",
    surface: "#FFFFFF",
    text: "#151515",
    mutedText: "#72716C",
    primary: "#151515",
    accent: "#8E9AAF",
    accent2: "#E1DDD4",
    accent3: "#C9D2C5",
    border: "#D8D5CD",
  },
  modernism: {
    base: "#F2EFE6",
    surface: "#FFFFFF",
    text: "#111111",
    mutedText: "#626057",
    primary: "#111111",
    accent: "#D72F24",
    accent2: "#1E5AA8",
    accent3: "#E2B51E",
    border: "#111111",
  },
  "swiss-design": {
    base: "#F6F6F2",
    surface: "#FFFFFF",
    text: "#111111",
    mutedText: "#5D5D58",
    primary: "#111111",
    accent: "#E1261C",
    accent2: "#D7D7D2",
    accent3: "#6A6F75",
    border: "#111111",
  },
  "international-style": {
    base: "#F5F6F7",
    surface: "#FFFFFF",
    text: "#16191D",
    mutedText: "#68707A",
    primary: "#16191D",
    accent: "#0F62FE",
    accent2: "#DDE3EA",
    accent3: "#8D97A5",
    border: "#C8D0DA",
  },
  scandinavian: {
    base: "#F7F3EA",
    surface: "#FFFCF5",
    text: "#243027",
    mutedText: "#727466",
    primary: "#243027",
    accent: "#9EB7A5",
    accent2: "#D9B983",
    accent3: "#D86F45",
    border: "#D8D2C3",
  },
  japandi: {
    base: "#EFE8DC",
    surface: "#F8F3EA",
    text: "#2A2822",
    mutedText: "#746B5F",
    primary: "#2A2822",
    accent: "#8B6F4E",
    accent2: "#C7B79D",
    accent3: "#6F7A5E",
    border: "#B8AA96",
  },
  "warm-minimal": {
    base: "#F6EFE5",
    surface: "#FFF9F0",
    text: "#2A211B",
    mutedText: "#7A6B5F",
    primary: "#2A211B",
    accent: "#C87A4A",
    accent2: "#E6C8A8",
    accent3: "#9A7B5D",
    border: "#DED1C1",
  },
  "soft-minimal": {
    base: "#F5F1EC",
    surface: "#FFFDF8",
    text: "#2B2824",
    mutedText: "#82796F",
    primary: "#2B2824",
    accent: "#B8A898",
    accent2: "#E6DED4",
    accent3: "#D8C5B2",
    border: "#D7CDC1",
  },
  "high-end-minimal": {
    base: "#F3F0EA",
    surface: "#FFFDF8",
    text: "#11110F",
    mutedText: "#6F6A61",
    primary: "#11110F",
    accent: "#7E6A4F",
    accent2: "#D3C5B0",
    accent3: "#23201B",
    border: "#BFB7AA",
  },
  brutalism: {
    base: "#F0EEE6",
    surface: "#FFFFFF",
    text: "#0A0A0A",
    mutedText: "#55504A",
    primary: "#0A0A0A",
    accent: "#FF3B1F",
    accent2: "#F4D230",
    accent3: "#2E67FF",
    border: "#0A0A0A",
  },
  "new-brutalism": {
    base: "#FFE76A",
    surface: "#FFF8D6",
    text: "#101010",
    mutedText: "#4B4238",
    primary: "#101010",
    accent: "#FF5C39",
    accent2: "#52D273",
    accent3: "#6C5CFF",
    border: "#101010",
  },
  "anti-design": {
    base: "#F5ED3F",
    surface: "#FF6EDE",
    text: "#111111",
    mutedText: "#31251F",
    primary: "#111111",
    accent: "#00E0FF",
    accent2: "#FF3B30",
    accent3: "#F5F1EF",
    border: "#111111",
  },
  maximalism: {
    base: "#241336",
    surface: "#FFF0B8",
    text: "#FFF0B8",
    mutedText: "#D8B7DA",
    primary: "#FFF0B8",
    accent: "#FF4D88",
    accent2: "#00B894",
    accent3: "#F7C948",
    border: "#FFF0B8",
  },
  "glitch-art": {
    base: "#05050B",
    surface: "#11112A",
    text: "#F5FBFF",
    mutedText: "#8BA2B8",
    primary: "#F5FBFF",
    accent: "#00F0FF",
    accent2: "#FF2BD6",
    accent3: "#B6FF00",
    border: "#00F0FF",
  },
  deconstructivism: {
    base: "#E8E4DA",
    surface: "#FDFBF4",
    text: "#111111",
    mutedText: "#5E5A54",
    primary: "#111111",
    accent: "#E43D30",
    accent2: "#1E57A8",
    accent3: "#B6B0A6",
    border: "#111111",
  },
  "avant-garde": {
    base: "#F8F5EF",
    surface: "#101010",
    text: "#101010",
    mutedText: "#64605A",
    primary: "#101010",
    accent: "#D71920",
    accent2: "#2256A7",
    accent3: "#F2C438",
    border: "#101010",
  },
  postmodernism: {
    base: "#F8E64D",
    surface: "#FFFFFF",
    text: "#141414",
    mutedText: "#5F4D78",
    primary: "#141414",
    accent: "#FF4FA3",
    accent2: "#22C7A9",
    accent3: "#5B5BD6",
    border: "#141414",
  },
  retro: {
    base: "#F8D992",
    surface: "#FFF3D6",
    text: "#3A1F13",
    mutedText: "#8B5231",
    primary: "#3A1F13",
    accent: "#D94A2B",
    accent2: "#2A7A78",
    accent3: "#F2A541",
    border: "#3A1F13",
  },
  vintage: {
    base: "#EEE0C4",
    surface: "#FFF7E5",
    text: "#2C2418",
    mutedText: "#76664D",
    primary: "#2C2418",
    accent: "#8C3F2B",
    accent2: "#B98E45",
    accent3: "#345A4A",
    border: "#5A432B",
  },
  "seventies-retro": {
    base: "#F4C05E",
    surface: "#FFE6A8",
    text: "#3C1D12",
    mutedText: "#7D4A25",
    primary: "#3C1D12",
    accent: "#D75B27",
    accent2: "#6E8B3D",
    accent3: "#B5527C",
    border: "#3C1D12",
  },
  "eighties-retro": {
    base: "#0B1024",
    surface: "#151B3D",
    text: "#F5F0FF",
    mutedText: "#9B9BC9",
    primary: "#F5F0FF",
    accent: "#FF2BD6",
    accent2: "#22E6FF",
    accent3: "#F9E900",
    border: "#22E6FF",
  },
  "nineties-graphic": {
    base: "#00A7A5",
    surface: "#FFF1A8",
    text: "#111111",
    mutedText: "#3F3F3F",
    primary: "#111111",
    accent: "#FF4D29",
    accent2: "#7129FF",
    accent3: "#E7FF2E",
    border: "#111111",
  },
  y2k: {
    base: "#E9F6FF",
    surface: "#FFFFFF",
    text: "#18233D",
    mutedText: "#65718D",
    primary: "#18233D",
    accent: "#71D5FF",
    accent2: "#FF8EE7",
    accent3: "#B8FF5C",
    border: "#8AA7C7",
  },
  "retro-futurism": {
    base: "#F6E7B8",
    surface: "#FFF5D6",
    text: "#17314A",
    mutedText: "#6D735E",
    primary: "#17314A",
    accent: "#F05B2F",
    accent2: "#2DB7B1",
    accent3: "#F2C84B",
    border: "#17314A",
  },
  cyberpunk: {
    base: "#080A14",
    surface: "#111628",
    text: "#F5F7FF",
    mutedText: "#A4A9C7",
    primary: "#F5F7FF",
    accent: "#00E5FF",
    accent2: "#FF3BF4",
    accent3: "#B7FF3C",
    border: "#6DEBFF",
  },
  luxury: {
    base: "#F4EFE5",
    surface: "#FFF9EE",
    text: "#1D1A16",
    mutedText: "#746B5C",
    primary: "#17130F",
    accent: "#A77A2D",
    accent2: "#D8B66A",
    accent3: "#4D1F24",
    border: "#2B241A",
  },
  "organic-design": {
    base: "#E8E5D8",
    surface: "#F7F2E4",
    text: "#263126",
    mutedText: "#68715E",
    primary: "#263126",
    accent: "#6F8B52",
    accent2: "#C89B63",
    accent3: "#D7A6A0",
    border: "#3A4536",
  },
  kawaii: {
    base: "#FFF4F8",
    surface: "#FFFFFF",
    text: "#262132",
    mutedText: "#7A7288",
    primary: "#262132",
    accent: "#FF6FAE",
    accent2: "#70D6FF",
    accent3: "#FFE66D",
    border: "#262132",
  },
  streetwear: {
    base: "#EDE9DC",
    surface: "#F8F3E5",
    text: "#111111",
    mutedText: "#5E5A51",
    primary: "#111111",
    accent: "#F23827",
    accent2: "#C7FF00",
    accent3: "#2D5BFF",
    border: "#111111",
  },
  "editorial-design": {
    base: "#F3F2EF",
    surface: "#FFFFFF",
    text: "#111111",
    mutedText: "#686868",
    primary: "#111111",
    accent: "#E7382F",
    accent2: "#246BFE",
    accent3: "#F2D44E",
    border: "#111111",
  },
  glassmorphism: {
    base: "#EAF1F4",
    surface: "#F8FCFF",
    text: "#102027",
    mutedText: "#60757D",
    primary: "#102027",
    accent: "#14B8A6",
    accent2: "#38BDF8",
    accent3: "#A78BFA",
    border: "#17333D",
  },
};

const paletteBank: DesignStylePalette[] = [
  palettes.minimalism,
  palettes.brutalism,
  palettes.cyberpunk,
  palettes.luxury,
  palettes["organic-design"],
  palettes.kawaii,
  palettes.streetwear,
  palettes["editorial-design"],
  palettes.glassmorphism,
  {
    base: "#F5E7D1",
    surface: "#FFF3DD",
    text: "#2A1F19",
    mutedText: "#7A6251",
    primary: "#2A1F19",
    accent: "#D35B2A",
    accent2: "#F2B84B",
    accent3: "#2C7A7B",
    border: "#2A1F19",
  },
  {
    base: "#ECE6F2",
    surface: "#FBF8FF",
    text: "#211B2F",
    mutedText: "#71657F",
    primary: "#211B2F",
    accent: "#8F4DFF",
    accent2: "#FF7AB6",
    accent3: "#54D6C7",
    border: "#211B2F",
  },
  {
    base: "#111111",
    surface: "#1E1E1E",
    text: "#F6F1E8",
    mutedText: "#BDB4A4",
    primary: "#F6F1E8",
    accent: "#F7D44A",
    accent2: "#F05A28",
    accent3: "#7BE0AD",
    border: "#F6F1E8",
  },
];

const styleSeedTuples: DesignStyleSeedTuple[] = [
  ["minimalism", "미니멀리즘", "Minimalism", "모던 / 미니멀", "가장 적은 요소로 정보의 본질을 드러내는 절제된 디자인", ["minimal", "clean", "essential"], "minimal-editorial"],
  ["modernism", "모더니즘", "Modernism", "모던 / 미니멀", "기능과 합리성을 우선하는 현대적 조형 언어", ["modern", "functional", "rational"], "minimal-editorial"],
  ["swiss-design", "스위스 디자인", "Swiss Design", "모던 / 미니멀", "그리드와 타이포그래피 질서를 통해 높은 가독성을 만드는 디자인", ["swiss", "grid", "typography"], "magazine-layout"],
  ["international-style", "인터내셔널 스타일", "International Style", "모던 / 미니멀", "지역성보다 보편성과 명확성을 강조하는 국제적 시각 체계", ["international", "system", "neutral"], "minimal-editorial"],
  ["scandinavian", "스칸디나비안", "Scandinavian", "모던 / 미니멀", "밝은 중성색과 생활감 있는 온기를 결합한 북유럽식 미니멀", ["scandinavian", "warm", "lifestyle"], "organic-brand"],
  ["japandi", "재팬디", "Japandi", "모던 / 미니멀", "일본식 여백과 북유럽의 실용성을 합친 차분한 스타일", ["japandi", "calm", "wood"], "minimal-editorial"],
  ["warm-minimal", "웜 미니멀", "Warm Minimal", "모던 / 미니멀", "부드러운 중성색과 여백으로 친근한 고급감을 만드는 미니멀", ["warm", "minimal", "soft"], "minimal-editorial"],
  ["soft-minimal", "소프트 미니멀", "Soft Minimal", "모던 / 미니멀", "낮은 대비와 둥근 리듬으로 긴장을 줄인 미니멀 스타일", ["soft", "gentle", "minimal"], "minimal-editorial"],
  ["high-end-minimal", "하이엔드 미니멀", "High-End Minimal", "모던 / 미니멀", "고급 소재감과 정교한 간격으로 프리미엄 인상을 만드는 미니멀", ["premium", "minimal", "luxury"], "luxury-product"],

  ["brutalism", "브루탈리즘", "Brutalism", "강렬 / 실험", "거친 구조와 강한 타이포그래피로 날것의 에너지를 보여주는 디자인", ["brutalist", "raw", "poster"], "brutalist-poster"],
  ["new-brutalism", "뉴 브루탈리즘", "New Brutalism", "강렬 / 실험", "웹 UI의 기본 요소를 과감하고 직접적으로 드러내는 디지털 브루탈리즘", ["new-brutalism", "web", "raw"], "brutalist-poster"],
  ["anti-design", "안티디자인", "Anti-Design", "강렬 / 실험", "관습적 미감과 균형을 일부러 비틀어 강한 인상을 만드는 스타일", ["anti-design", "experimental", "chaotic"], "brutalist-poster"],
  ["maximalism", "맥시멀리즘", "Maximalism", "강렬 / 실험", "색, 패턴, 이미지, 타이포를 풍부하게 쌓아 몰입감을 만드는 스타일", ["maximal", "dense", "expressive"], "street-campaign"],
  ["glitch-art", "글리치 아트", "Glitch Art", "강렬 / 실험", "디지털 오류와 왜곡을 시각 언어로 활용하는 실험적 스타일", ["glitch", "digital", "distortion"], "cyber-dashboard"],
  ["deconstructivism", "디컨스트럭티비즘", "Deconstructivism", "강렬 / 실험", "구조를 해체하고 재조합해 긴장감 있는 화면을 만드는 디자인", ["deconstructive", "fragmented", "experimental"], "brutalist-poster"],
  ["avant-garde", "아방가르드", "Avant-Garde", "강렬 / 실험", "기존 질서보다 새로운 조형 실험을 앞세우는 전위적 스타일", ["avant-garde", "art", "experimental"], "magazine-layout"],
  ["postmodernism", "포스트모더니즘", "Postmodernism", "강렬 / 실험", "다양한 시대와 기호를 섞어 규칙을 유연하게 비트는 스타일", ["postmodern", "mixed", "ironic"], "retro-commerce"],

  ["retro", "레트로", "Retro", "레트로 / 빈티지", "과거의 색감과 그래픽 언어를 현대적으로 다시 쓰는 스타일", ["retro", "nostalgia", "color"], "retro-commerce"],
  ["vintage", "빈티지", "Vintage", "레트로 / 빈티지", "오래된 인쇄물과 물성에서 오는 시간감을 활용하는 디자인", ["vintage", "print", "aged"], "retro-commerce"],
  ["seventies-retro", "70년대 레트로", "70s Retro", "레트로 / 빈티지", "따뜻한 오렌지와 곡선 타이포로 70년대 감성을 재현하는 스타일", ["70s", "warm", "groovy"], "retro-commerce"],
  ["eighties-retro", "80년대 레트로", "80s Retro", "레트로 / 빈티지", "네온, 그리드, 신스웨이브 색으로 80년대 분위기를 만드는 스타일", ["80s", "neon", "synth"], "cyber-dashboard"],
  ["nineties-graphic", "90년대 그래픽", "90s Graphic", "레트로 / 빈티지", "강한 패턴과 초기 디지털 그래픽 감각을 활용하는 스타일", ["90s", "graphic", "pattern"], "street-campaign"],
  ["y2k", "Y2K", "Y2K", "레트로 / 빈티지", "크롬, 젤리색, 미래 낙관주의를 섞은 2000년대 초반 감성", ["y2k", "chrome", "bubble"], "cyber-dashboard"],
  ["retro-futurism", "레트로 퓨처리즘", "Retro Futurism", "레트로 / 빈티지", "과거가 상상한 미래를 현대적 화면으로 재해석하는 스타일", ["retro-future", "space", "optimistic"], "retro-commerce"],
  ["mid-century-modern", "미드센추리 모던", "Mid-Century Modern", "레트로 / 빈티지", "기하학과 따뜻한 색으로 세련된 20세기 중반 감각을 만드는 스타일", ["mid-century", "geometric", "warm"], "minimal-editorial"],
  ["bauhaus", "바우하우스", "Bauhaus", "레트로 / 빈티지", "기본 도형과 원색, 기능주의를 결합한 조형 중심 디자인", ["bauhaus", "geometry", "primary"], "magazine-layout"],

  ["futurism", "퓨처리즘", "Futurism", "미래 / 디지털", "속도감과 기술 낙관주의를 시각화하는 미래지향적 스타일", ["future", "speed", "tech"], "cyber-dashboard"],
  ["cyberpunk", "사이버펑크", "Cyberpunk", "미래 / 디지털", "어두운 도시, 네온, 디지털 반항성을 결합한 강한 테크 스타일", ["cyberpunk", "neon", "dark"], "cyber-dashboard"],
  ["neon-noir", "네온 누아르", "Neon Noir", "미래 / 디지털", "느와르의 어둠과 네온 광원을 결합한 분위기 중심 스타일", ["neon", "noir", "dark"], "cyber-dashboard"],
  ["techwear", "테크웨어", "Techwear", "미래 / 디지털", "기능성 의류와 산업적 디테일을 웹 그래픽으로 옮긴 스타일", ["techwear", "utility", "dark"], "cyber-dashboard"],
  ["high-tech", "하이테크", "High-Tech", "미래 / 디지털", "정밀한 패널과 데이터 시각화로 첨단 이미지를 만드는 스타일", ["high-tech", "interface", "data"], "saas-landing"],
  ["ai-aesthetic", "AI 에스테틱", "AI Aesthetic", "미래 / 디지털", "생성형 이미지, 빛나는 그라데이션, 계산적 패턴을 결합한 스타일", ["ai", "generated", "gradient"], "saas-landing"],
  ["hologram-style", "홀로그램 스타일", "Hologram Style", "미래 / 디지털", "반투명 빛과 분광 색으로 입체적 디지털 감각을 만드는 스타일", ["hologram", "iridescent", "future"], "cyber-dashboard"],
  ["chromecore", "크롬코어", "Chromecore", "미래 / 디지털", "금속성 광택과 반사 질감을 중심으로 한 미래적 스타일", ["chrome", "metal", "gloss"], "luxury-product"],
  ["metaverse-style", "메타버스 스타일", "Metaverse Style", "미래 / 디지털", "가상 공간, 아바타, 3D 인터페이스 감각을 보여주는 스타일", ["metaverse", "virtual", "3d"], "cyber-dashboard"],

  ["classic", "클래식", "Classic", "럭셔리 / 클래식", "균형 잡힌 비례와 전통적 타이포그래피로 안정감을 주는 스타일", ["classic", "balanced", "timeless"], "luxury-product"],
  ["neoclassic", "네오클래식", "Neoclassic", "럭셔리 / 클래식", "고전적 장식과 현대적 여백을 절충한 우아한 스타일", ["neoclassic", "elegant", "modern"], "luxury-product"],
  ["luxury", "럭셔리", "Luxury", "럭셔리 / 클래식", "절제된 소재감과 고급 색감으로 프리미엄 이미지를 만드는 스타일", ["luxury", "premium", "gold"], "luxury-product"],
  ["old-money", "올드머니", "Old Money", "럭셔리 / 클래식", "과시보다 전통과 품질을 강조하는 조용한 고급 스타일", ["old-money", "heritage", "quiet"], "luxury-product"],
  ["art-deco", "아르데코", "Art Deco", "럭셔리 / 클래식", "기하학 장식과 금속 포인트로 화려한 질서를 만드는 스타일", ["art-deco", "geometry", "gold"], "luxury-product"],
  ["art-nouveau", "아르누보", "Art Nouveau", "럭셔리 / 클래식", "식물적 곡선과 장식적 선으로 우아한 흐름을 만드는 스타일", ["art-nouveau", "ornamental", "curve"], "organic-brand"],
  ["baroque", "바로크", "Baroque", "럭셔리 / 클래식", "극적인 장식과 명암으로 풍부한 감정을 만드는 고전 스타일", ["baroque", "dramatic", "ornate"], "luxury-product"],
  ["rococo", "로코코", "Rococo", "럭셔리 / 클래식", "부드러운 장식과 밝은 색으로 섬세하고 화려한 분위기를 만드는 스타일", ["rococo", "delicate", "ornate"], "luxury-product"],
  ["gothic", "고딕", "Gothic", "럭셔리 / 클래식", "뾰족한 구조와 어두운 분위기로 장중함을 만드는 스타일", ["gothic", "dark", "dramatic"], "street-campaign"],

  ["organic-design", "오가닉 디자인", "Organic Design", "자연 / 수공예", "자연 형태와 유기적 색감으로 편안한 인상을 만드는 디자인", ["organic", "natural", "soft"], "organic-brand"],
  ["natural", "내추럴", "Natural", "자연 / 수공예", "꾸미지 않은 색과 소재감으로 신뢰와 편안함을 만드는 스타일", ["natural", "plain", "calm"], "organic-brand"],
  ["botanical", "보태니컬", "Botanical", "자연 / 수공예", "식물 모티프와 그린 팔레트를 중심으로 한 생기 있는 스타일", ["botanical", "green", "plant"], "organic-brand"],
  ["eco-design", "에코 디자인", "Eco Design", "자연 / 수공예", "지속가능성과 친환경 메시지를 명확히 전달하는 디자인", ["eco", "sustainable", "green"], "organic-brand"],
  ["rustic", "러스틱", "Rustic", "자연 / 수공예", "거친 나무와 흙빛 질감으로 소박한 온기를 만드는 스타일", ["rustic", "wood", "earth"], "organic-brand"],
  ["kinfolk", "킨포크", "Kinfolk", "자연 / 수공예", "느린 생활, 자연광, 절제된 구성을 강조하는 라이프스타일 스타일", ["kinfolk", "lifestyle", "slow"], "minimal-editorial"],
  ["handmade", "핸드메이드", "Handmade", "자연 / 수공예", "손으로 만든 흔적과 작은 불균형을 매력으로 쓰는 스타일", ["handmade", "craft", "human"], "organic-brand"],
  ["craft", "크래프트", "Craft", "자연 / 수공예", "재료와 제작 과정을 전면에 드러내는 수공예 중심 스타일", ["craft", "material", "maker"], "organic-brand"],
  ["wabi-sabi", "와비사비", "Wabi-Sabi", "자연 / 수공예", "불완전함과 시간의 흔적을 아름다움으로 받아들이는 스타일", ["wabi-sabi", "imperfect", "quiet"], "minimal-editorial"],

  ["kitsch", "키치", "Kitsch", "귀여움 / 캐주얼", "과장되고 통속적인 요소를 즐겁게 활용하는 스타일", ["kitsch", "fun", "bold"], "kawaii-app"],
  ["kawaii", "카와이", "Kawaii", "귀여움 / 캐주얼", "작고 둥근 형태와 밝은 색으로 귀여움을 극대화하는 스타일", ["kawaii", "cute", "pastel"], "kawaii-app"],
  ["dopamine-design", "도파민 디자인", "Dopamine Design", "귀여움 / 캐주얼", "강한 색과 즉각적 즐거움으로 긍정적 반응을 만드는 스타일", ["dopamine", "bright", "joy"], "kawaii-app"],
  ["pop-art", "팝아트", "Pop Art", "귀여움 / 캐주얼", "대중문화 이미지와 선명한 색을 그래픽하게 활용하는 스타일", ["pop-art", "bold", "comic"], "street-campaign"],
  ["comic-book-style", "코믹북 스타일", "Comic Book Style", "귀여움 / 캐주얼", "말풍선, 굵은 선, 컷 구성을 활용한 만화적 스타일", ["comic", "panel", "bold"], "kawaii-app"],
  ["toy-design", "토이 디자인", "Toy Design", "귀여움 / 캐주얼", "장난감 같은 형태와 촉감 있는 색으로 즐거움을 만드는 스타일", ["toy", "play", "soft"], "kawaii-app"],
  ["playful-design", "플레이풀 디자인", "Playful Design", "귀여움 / 캐주얼", "가벼운 상호작용과 유쾌한 형태로 접근성을 높이는 스타일", ["playful", "friendly", "motion"], "kawaii-app"],
  ["pastel-style", "파스텔 스타일", "Pastel Style", "귀여움 / 캐주얼", "낮은 채도의 밝은 색으로 부드럽고 친근한 화면을 만드는 스타일", ["pastel", "soft", "friendly"], "kawaii-app"],
  ["bubble-design", "버블 디자인", "Bubble Design", "귀여움 / 캐주얼", "둥근 볼륨과 말랑한 색 면으로 가벼운 즐거움을 주는 스타일", ["bubble", "round", "soft"], "kawaii-app"],

  ["streetwear", "스트리트웨어", "Streetwear", "스트리트 / 서브컬처", "패션 드롭과 거리 문화를 웹 그래픽으로 옮긴 스타일", ["streetwear", "drop", "fashion"], "street-campaign"],
  ["graffiti", "그래피티", "Graffiti", "스트리트 / 서브컬처", "스프레이, 태그, 벽면 질감을 활용하는 거리 그래픽 스타일", ["graffiti", "spray", "tag"], "street-campaign"],
  ["hiphop-style", "힙합 스타일", "Hip-Hop Style", "스트리트 / 서브컬처", "리듬, 자신감, 강한 그래픽 언어를 보여주는 음악 문화 스타일", ["hiphop", "music", "bold"], "street-campaign"],
  ["skate-culture", "스케이트 문화", "Skate Culture", "스트리트 / 서브컬처", "스티커, 보드 그래픽, 거친 촬영감을 활용하는 스타일", ["skate", "sticker", "youth"], "street-campaign"],
  ["punk", "펑크", "Punk", "스트리트 / 서브컬처", "저항적 메시지와 찢긴 그래픽을 앞세우는 반항적 스타일", ["punk", "rebellious", "raw"], "street-campaign"],
  ["grunge", "그런지", "Grunge", "스트리트 / 서브컬처", "낡고 거친 질감, 흐릿한 이미지, 어두운 색을 활용하는 스타일", ["grunge", "dirty", "texture"], "street-campaign"],
  ["indie-sleaze", "인디 슬리즈", "Indie Sleaze", "스트리트 / 서브컬처", "플래시 사진과 지저분한 클럽 감성을 섞은 서브컬처 스타일", ["indie", "sleaze", "flash"], "street-campaign"],
  ["rave-style", "레이브 스타일", "Rave Style", "스트리트 / 서브컬처", "강한 형광색과 음악 이벤트 에너지를 보여주는 스타일", ["rave", "neon", "music"], "cyber-dashboard"],
  ["lo-fi", "로우파이", "Lo-Fi", "스트리트 / 서브컬처", "낮은 해상도와 아날로그 노이즈를 편안한 분위기로 쓰는 스타일", ["lo-fi", "analog", "calm"], "retro-commerce"],

  ["typography-focused", "타이포그래피 중심", "Typography Focused", "편집 / 타이포그래피", "글자의 크기, 무게, 리듬을 핵심 시각 요소로 삼는 스타일", ["typography", "type", "text"], "magazine-layout"],
  ["editorial-design", "에디토리얼 디자인", "Editorial Design", "편집 / 타이포그래피", "기사, 이미지, 인용을 편집물처럼 조직하는 스타일", ["editorial", "magazine", "grid"], "magazine-layout"],
  ["magazine-style", "매거진 스타일", "Magazine Style", "편집 / 타이포그래피", "커버, 기사, 목차의 리듬을 웹 화면으로 옮긴 스타일", ["magazine", "cover", "article"], "magazine-layout"],
  ["posterism", "포스터리즘", "Posterism", "편집 / 타이포그래피", "한 장의 포스터처럼 강한 메시지와 시각 집중을 만드는 스타일", ["poster", "campaign", "bold"], "brutalist-poster"],
  ["grid-system", "그리드 시스템", "Grid System", "편집 / 타이포그래피", "정보를 엄격한 칸과 비례로 정렬하는 구조 중심 스타일", ["grid", "system", "layout"], "magazine-layout"],
  ["collage", "콜라주", "Collage", "편집 / 타이포그래피", "사진, 종이, 타이포 조각을 겹쳐 새로운 맥락을 만드는 스타일", ["collage", "mixed", "paper"], "magazine-layout"],
  ["photomontage", "포토몽타주", "Photomontage", "편집 / 타이포그래피", "서로 다른 이미지를 결합해 강한 메시지를 만드는 편집 스타일", ["photomontage", "photo", "editorial"], "magazine-layout"],
  ["experimental-type", "실험 타이포", "Experimental Type", "편집 / 타이포그래피", "글자의 형태 자체를 실험해 이미지처럼 쓰는 스타일", ["experimental-type", "type", "art"], "brutalist-poster"],
  ["newspaper-style", "신문 스타일", "Newspaper Style", "편집 / 타이포그래피", "다단 편집과 헤드라인 구조를 활용하는 뉴스형 스타일", ["newspaper", "columns", "news"], "magazine-layout"],

  ["flat-design", "플랫 디자인", "Flat Design", "UI / 웹", "입체 효과를 줄이고 명확한 색 면과 아이콘으로 구성하는 UI 스타일", ["flat", "ui", "simple"], "saas-landing"],
  ["material-design", "머티리얼 디자인", "Material Design", "UI / 웹", "표면, 그림자, 상태 변화를 체계화한 제품형 UI 스타일", ["material", "ui", "system"], "saas-landing"],
  ["neumorphism", "뉴모피즘", "Neumorphism", "UI / 웹", "부드러운 안팎 그림자로 눌린 표면감을 만드는 UI 스타일", ["neumorphism", "soft-ui", "surface"], "saas-landing"],
  ["glassmorphism", "글래스모피즘", "Glassmorphism", "UI / 웹", "반투명 유리 패널과 흐림 효과를 중심으로 한 UI 스타일", ["glass", "translucent", "ui"], "saas-landing"],
  ["claymorphism", "클레이모피즘", "Claymorphism", "UI / 웹", "말랑한 3D 카드와 밝은 색으로 친근한 제품 UI를 만드는 스타일", ["clay", "3d", "soft"], "kawaii-app"],
  ["dark-mode-design", "다크모드 디자인", "Dark Mode Design", "UI / 웹", "어두운 배경에서 정보 대비와 피로도를 관리하는 UI 스타일", ["dark-mode", "ui", "contrast"], "cyber-dashboard"],
  ["saas-style", "SaaS 스타일", "SaaS Style", "UI / 웹", "기능, 신뢰, 전환을 명확히 보여주는 제품형 웹 스타일", ["saas", "product", "landing"], "saas-landing"],
  ["startup-landing-page", "스타트업 랜딩페이지", "Startup Landing Page", "UI / 웹", "빠른 가치 전달과 CTA 반복으로 전환을 유도하는 웹 스타일", ["startup", "landing", "conversion"], "saas-landing"],
];

const styleSeeds: DesignStyleSeed[] = styleSeedTuples.map(([slug, nameKo, nameEn, category, tone, tags, sampleType]) => ({
  category,
  nameEn,
  nameKo,
  palette: palettes[slug] ?? paletteBank[Math.abs(hashSlug(slug)) % paletteBank.length],
  sampleType,
  slug,
  tags,
  tone,
}));

const styleContentOverrides: Record<string, StyleContentOverride> = {
  minimalism: {
    summary: "미니멀리즘은 장식을 덜어내고 여백, 얇은 선, 정밀한 타이포 위계로 제품과 메시지를 선명하게 보이게 하는 디자인입니다.",
    description:
      "미니멀리즘은 화면을 비우는 스타일이 아니라 필요한 정보만 남겨 사용자가 곧바로 구조를 읽게 만드는 방식입니다. Linear의 조용한 제품 표면, Apple의 제품 중심 여백, Stripe의 정밀한 그리드처럼 낮은 채도의 배경과 얇은 구분선, 짧은 문장, 정확한 타이포 비례를 사용합니다. 강한 장식이나 과한 그림자 대신 간격, 정렬, 대비가 브랜드의 신뢰감을 만듭니다.",
    visualFeatures: [
      "넓은 빈 공간과 낮은 채도 표면으로 핵심 콘텐츠 주변의 시각 소음을 줄입니다.",
      "검정에 가까운 본문색, 부드러운 회색 보조 텍스트, 얇은 경계선으로 구조를 만듭니다.",
      "이미지나 제품 프레임은 크게 쓰되 주변 장식은 최소화해 초점을 분명히 합니다.",
      "색은 CTA나 상태 표시처럼 필요한 순간에만 작은 면적으로 사용합니다.",
    ],
    colorPalette: [
      "오프화이트 배경과 순백 표면을 기본으로 사용해 조용한 계층을 만듭니다.",
      "텍스트는 거의 검정에 가까운 중성색으로 고정해 가독성을 확보합니다.",
      "보조색은 푸른 회색, 따뜻한 회색, 세이지 계열처럼 낮은 채도로 제한합니다.",
      "경계선은 본문색보다 훨씬 약하게 두어 선은 보이지만 화면이 무거워지지 않게 합니다.",
    ],
    typography: [
      "중립적인 산세리프를 사용하고 제목도 과도하게 압축하거나 장식하지 않습니다.",
      "제목, 메타, 본문 사이의 크기 차이는 분명하지만 자간은 0에 가깝게 유지합니다.",
      "짧은 문장과 넉넉한 행간으로 사용자가 빠르게 훑을 수 있게 합니다.",
    ],
    layoutTraits: [
      "좌측 정렬과 넓은 내부 여백으로 읽는 순서를 단순하게 만듭니다.",
      "얇은 분할선, 작은 메타 라벨, 명확한 콘텐츠 블록으로 정보 구조를 표현합니다.",
      "카드나 패널은 평평하게 두고 그림자 대신 간격과 경계선으로 구분합니다.",
      "CTA는 한두 개만 남기고 주변 텍스트와 충분히 떨어뜨립니다.",
    ],
    useCases: ["SaaS 랜딩", "제품 소개", "프리미엄 포트폴리오", "문서형 서비스"],
    goodFor: ["복잡한 제품을 선명하게 설명해야 하는 B2B 서비스", "사진이나 제품 자체가 주인공인 브랜드", "신뢰와 정밀함이 중요한 도구형 웹앱", "불필요한 마케팅 장식을 줄이고 싶은 랜딩페이지"],
    cautions: [
      "요소를 줄이는 것만으로는 대표성이 생기지 않으므로 간격, 선, 타이포 비례를 끝까지 조정해야 합니다.",
      "색을 너무 없애면 상태와 행동이 약해지므로 CTA와 현재 위치에는 작은 강조색을 남겨야 합니다.",
      "모바일에서는 넓은 여백이 정보 부족처럼 보이지 않도록 첫 화면의 메시지 밀도를 확인해야 합니다.",
    ],
    imagePrompt:
      "A calm minimal web design reference image with generous white space, precise sans-serif typography, thin dividers, neutral off-white surfaces, one restrained cool gray accent, product-first composition, no decorative clutter, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Linear", url: "https://linear.app", note: "Muted palette, spacious layout, sharp typography, and restrained product surfaces define modern SaaS minimalism." },
        { title: "Apple", url: "https://www.apple.com", note: "Generous white space, product-first composition, neutral color, and very low visual noise anchor premium minimalism." },
        { title: "Stripe", url: "https://stripe.com", note: "Precise grid rhythm, restrained copy density, thin dividers, and controlled accent use show minimalism for complex B2B content." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Web Design Inspiration Minimalist", url: "https://www.pinterest.com/web_design_mini_blog/web-design-inspiration-minimalist/", note: "Moodboard reference for white space, neutral palettes, thin rules, sparse product imagery, and quiet composition patterns." },
        { title: "Awwwards - Minimalist Websites", url: "https://www.awwwards.com/websites/minimalist-websites/", note: "Award-gallery reference for high-quality minimal web execution, interaction restraint, layout proportion, and typographic detail." },
        { title: "Dribbble - Minimalist Website", url: "https://dribbble.com/tags/minimalist-website", note: "UI reference for minimal cards, interface hierarchy, button restraint, muted surfaces, and component-level visual vocabulary." },
      ],
      representativeTraits: [
        "Generous negative space",
        "Neutral, low-saturation surfaces",
        "Sharp sans-serif hierarchy",
        "Thin structural dividers",
        "Product-first composition",
      ],
      avoidTraits: [
        "Decorative gradients used as the main identity",
        "Heavy shadows or raised cards",
        "Overly warm Japandi color treatment",
      ],
      tokenIntent:
        "Use flat off-white surfaces, near-black text, soft dividers, no shadow, nearly zero tracking, airy spacing, and a small cool gray accent so the style reads as precise web minimalism rather than warm lifestyle minimalism.",
    },
  },
  modernism: {
    summary: "모더니즘은 기능이 형태를 이끈다는 원칙을 바탕으로 비대칭 그리드, 산세리프 타이포, 원색 기하학으로 정보를 조직하는 디자인입니다.",
    description:
      "모더니즘은 장식을 줄이는 데서 끝나는 미니멀리즘과 달리, 기능주의적 구조 자체를 화면의 주인공으로 드러냅니다. Bauhaus-Archiv의 역사적 그래픽 언어, MoMA의 기관형 정보 위계, Vitra의 제품 카테고리 구조, AIM의 현대적 모더니스트 웹 표현처럼 강한 그리드와 명확한 모듈, 검정 선, 빨강·파랑·노랑의 제한된 색면을 사용합니다. 웹에서는 히어로, 내비게이션, 콘텐츠 카드가 모두 같은 모듈 체계 안에서 움직이는 느낌이 중요합니다.",
    visualFeatures: [
      "비대칭 그리드와 굵은 구조선으로 화면의 질서를 먼저 드러냅니다.",
      "빨강, 파랑, 노랑 같은 제한된 원색을 기능적 표식과 기하학 블록에 사용합니다.",
      "산세리프 제목과 작은 메타 정보가 포스터처럼 맞물려 정보 위계를 만듭니다.",
      "사진이나 제품 영역은 장식 프레임보다 명확한 모듈과 번호 체계 안에 배치합니다.",
    ],
    colorPalette: [
      "따뜻한 종이색 배경과 흰 표면을 기본으로 두어 역사적 인쇄물 감각을 남깁니다.",
      "검정 텍스트와 검정 경계선으로 모듈 구조를 분명하게 만듭니다.",
      "빨강은 주요 동작과 방향성을, 파랑은 정보 블록을, 노랑은 보조 강조를 맡깁니다.",
      "색면은 넓게 번지기보다 기능이 있는 사각형, 상태, 번호, 배지에 제한합니다.",
    ],
    typography: [
      "기하학적 산세리프 제목을 큰 크기로 쓰되 정렬과 행간을 엄격하게 통제합니다.",
      "메타 라벨, 번호, 분류명은 작고 선명하게 배치해 시스템성을 만듭니다.",
      "자간은 약간 타이트하게 두지만 Swiss 스타일처럼 완전히 차갑게 만들지는 않습니다.",
    ],
    layoutTraits: [
      "12컬럼 느낌의 모듈 그리드와 비대칭 칸 분할을 사용합니다.",
      "내비게이션, 히어로, 콘텐츠 카드가 같은 경계선 체계로 연결됩니다.",
      "기하학 색면은 배경 장식이 아니라 카드 상태, 섹션 구분, 진행 정보에 붙습니다.",
      "여백은 충분히 두되 빈 화면보다 기능적 구성 밀도가 느껴져야 합니다.",
    ],
    useCases: ["문화기관 웹사이트", "건축/제품 포트폴리오", "디자인 스튜디오", "전시 랜딩"],
    goodFor: ["역사적 디자인 문법을 현대 웹에 적용하려는 브랜드", "제품 카테고리와 아카이브를 강한 구조로 보여줘야 하는 사이트", "문화·교육·건축 콘텐츠처럼 정보와 이미지가 함께 중요한 서비스", "미니멀보다 더 그래픽한 첫인상이 필요한 랜딩페이지"],
    cautions: [
      "Bauhaus 전용 스타일처럼 보이지 않게 역사적 인용보다 기능적 웹 구조를 우선해야 합니다.",
      "원색 블록이 많아지면 장식처럼 보이므로 각 색면에 역할을 부여해야 합니다.",
      "Swiss Design과 겹치지 않도록 완전한 중립성보다 실험적 비대칭과 기하학 신호를 남겨야 합니다.",
    ],
    imagePrompt:
      "A modernist web design reference image with asymmetric modular grid, geometric sans-serif typography, black structural lines, restrained red blue yellow blocks, functional navigation, product and archive modules, Bauhaus and New Typography influence, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Bauhaus-Archiv / Museum für Gestaltung", url: "https://www.bauhaus.de/en/", note: "Historical design institution reference for functional typography, modular information, black structure, and modernist graphic discipline." },
        { title: "MoMA", url: "https://www.moma.org/", note: "Museum reference for modernist institutional hierarchy, large type, direct navigation, and rational event/content modules." },
        { title: "Vitra", url: "https://www.vitra.com/en-us/home", note: "Product and furniture reference for modernist object culture, functional categories, clear grids, and disciplined product storytelling." },
        { title: "AIM - AI Modernism of Kharkiv", url: "https://aim.obys.agency/", note: "Contemporary web reference for explicit modernist graphics, strong typography, geometric composition, and structured digital storytelling." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Modernism", url: "https://kr.pinterest.com/pinewatt/modernism/", note: "Moodboard reference for modernist graphic layouts, geometric marks, primary color accents, asymmetric grids, and poster-like structure." },
        { title: "Awwwards - Modern Websites", url: "https://www.awwwards.com/websites/modern/", note: "Gallery reference for contemporary modern web execution, including architecture, cultural, and modernist-coded digital projects." },
        { title: "Dribbble - Modernist", url: "https://dribbble.com/tags/modernist", note: "UI and graphic reference for modernist interface modules, geometric symbols, strict grids, and high-contrast typography." },
      ],
      representativeTraits: [
        "Asymmetric modular grid",
        "Functional sans-serif hierarchy",
        "Black structural rules",
        "Primary geometric color blocks",
        "Numbered information modules",
      ],
      avoidTraits: [
        "Quiet SaaS minimalism",
        "Pure Swiss neutrality",
        "Decorative retro Bauhaus pastiche",
      ],
      tokenIntent:
        "Use a warm paper base, black text and borders, sharp corners, moderate density, tight geometric typography, and red blue yellow accents so the style reads as functional modernist web structure rather than generic modern minimalism.",
    },
  },
  "swiss-design": {
    summary: "스위스 디자인은 엄격한 그리드와 객관적인 산세리프 타이포그래피로 정보를 가장 빠르고 명확하게 읽히게 만드는 디자인입니다.",
    description:
      "스위스 디자인은 장식보다 질서와 가독성을 우선합니다. SWI swissinfo.ch의 다국어 뉴스 구조, SBB의 공공 교통 정보 체계, Swiss grid 레퍼런스처럼 큰 제목, 작은 번호, 빨간 포인트, 정확한 칼럼 폭이 화면을 지배합니다. 모더니즘보다 색면 장식은 줄이고, 인터내셔널 스타일보다 포스터 같은 타이포 긴장감을 더 강하게 남깁니다.",
    visualFeatures: [
      "명확한 칼럼과 기준선으로 콘텐츠의 위치와 크기를 결정합니다.",
      "빨간색은 방향, 현재 위치, 핵심 CTA처럼 기능적 신호에만 사용합니다.",
      "큰 제목과 작은 메타 정보가 같은 그리드 위에서 강한 대비를 만듭니다.",
      "사진, 데이터, 링크가 모두 동일한 모듈 규칙 안에서 정렬됩니다.",
    ],
    colorPalette: [
      "흰색과 거의 검정에 가까운 텍스트를 기본으로 사용합니다.",
      "스위스 레드는 작은 면적이지만 즉시 눈에 띄는 시스템 색으로 둡니다.",
      "보조 회색은 선, 캡션, 비활성 영역에만 제한합니다.",
      "색보다 위치, 크기, 간격이 위계를 만드는 팔레트입니다.",
    ],
    typography: ["중립 산세리프를 크게 쓰고 행간과 기준선을 엄격히 맞춥니다.", "번호와 섹션 라벨은 작은 크기로 두되 매우 선명하게 둡니다.", "자간은 과하게 좁히지 않고 정보 판독성을 우선합니다."],
    layoutTraits: ["12컬럼에 가까운 포스터식 그리드를 사용합니다.", "비대칭 배치라도 기준선과 마진은 일관되게 유지합니다.", "카드보다 정보 행과 표식이 더 강하게 보입니다.", "모바일에서도 번호, 제목, 링크의 순서를 잃지 않습니다."],
    useCases: ["뉴스/매거진", "공공 정보 서비스", "교통/지도 서비스", "디자인 아카이브"],
    goodFor: ["많은 정보를 빠르게 훑어야 하는 콘텐츠", "공공성과 신뢰가 중요한 서비스", "타이포그래피가 브랜드 자산인 사이트", "섹션과 상태를 명확히 구분해야 하는 웹앱"],
    cautions: ["너무 중립적으로 만들면 인터내셔널 스타일과 구분되지 않습니다.", "빨간 포인트가 많아지면 시스템성이 약해지므로 한 화면에 역할을 제한해야 합니다.", "그리드가 너무 촘촘하면 모바일에서 뉴스 표처럼 답답해질 수 있습니다."],
    imagePrompt:
      "A Swiss design web reference image with strict asymmetric grid, large sans-serif typography, small numbered labels, white background, black rules, one red system accent, editorial information modules, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "SWI swissinfo.ch", url: "https://www.swissinfo.ch", note: "Swiss editorial reference for strict news hierarchy, multilingual content modules, objective typography, and restrained public-service layout." },
        { title: "SBB", url: "https://www.sbb.ch", note: "Swiss transport reference for functional navigation, red system accent, timetable-like structure, and highly legible information design." },
        { title: "Web Design Lookbook - Swiss Design", url: "https://webdesignlookbook.webflow.io/", note: "Style study reference for Swiss grid principles, type-led hierarchy, structured margins, and clarity-first digital layouts." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Swiss Grids", url: "https://www.pinterest.com/tonyxj/swiss-grids/", note: "Moodboard reference for poster grids, asymmetric columns, type blocks, red markers, and modular Swiss-style spacing." },
        { title: "Awwwards - Switzerland Websites", url: "https://www.awwwards.com/websites/Switzerland/", note: "Gallery reference for Swiss web executions, local agencies, clean grid systems, and restrained precision in digital interfaces." },
        { title: "Dribbble - Swiss Grid", url: "https://dribbble.com/tags/swiss-grid", note: "UI and poster reference for grid-driven cards, baseline rhythm, numbered layouts, and strict typographic composition." },
      ],
      representativeTraits: ["Strict asymmetric grid", "Objective typography", "Red system marker", "Numbered modules", "High information clarity"],
      avoidTraits: ["Warm lifestyle minimalism", "Decorative Bauhaus color blocks", "Soft card-heavy UI"],
      tokenIntent:
        "Use a white base, black type, sharp two-pixel rules, red as a small system marker, tight modular spacing, and left-aligned typography so the style reads as Swiss information design.",
    },
  },
  "international-style": {
    summary: "인터내셔널 스타일은 지역색과 장식을 줄이고, 어디서나 이해되는 중립적 그리드와 일관된 컴포넌트로 정보를 전달하는 디자인입니다.",
    description:
      "인터내셔널 스타일은 Swiss Design에서 출발한 객관성과 보편성을 더 글로벌한 제품/기관 시스템으로 확장합니다. IBM Design Language의 2x Grid와 기업형 컴포넌트, MoMA의 기관형 정보 구조처럼 색은 절제하고, 동일한 규칙의 패널과 데이터 행으로 화면을 구성합니다. Swiss보다 포스터성이 약하고, Modernism보다 색면 실험이 적습니다.",
    visualFeatures: ["중립 배경과 얇은 회색 선으로 글로벌 제품 시스템처럼 보입니다.", "반복 가능한 패널, 표, 상태 행이 같은 규칙으로 정렬됩니다.", "파란색은 브랜드/행동/상태를 표시하는 단일 시스템 색으로 작동합니다.", "국제적 문서와 대시보드처럼 정보의 객관성을 강조합니다."],
    colorPalette: ["차가운 흰색과 밝은 회색 표면을 사용합니다.", "텍스트는 검정에 가까운 중립색으로 유지합니다.", "파랑은 CTA와 현재 상태에만 사용합니다.", "보조 회색은 패널, 선, 보조 텍스트를 구분합니다."],
    typography: ["Helvetica 계열처럼 중립적이고 실용적인 산세리프 위계를 씁니다.", "제목보다 레이블, 표, 본문 시스템의 일관성을 강조합니다.", "자간은 0에 가깝게 두어 다국어 환경에서도 안정적으로 보이게 합니다."],
    layoutTraits: ["기업형 포털처럼 반복 가능한 패널 구조를 사용합니다.", "그리드와 표가 화면의 기본 단위가 됩니다.", "CTA는 강하지만 장식적이지 않은 단일 색 버튼으로 둡니다.", "데이터와 설명이 같은 높이와 간격으로 반복됩니다."],
    useCases: ["B2B 제품 사이트", "디자인 시스템 문서", "기관 포털", "글로벌 서비스 소개"],
    goodFor: ["언어와 시장을 넘나드는 기업/기관", "규칙과 신뢰를 먼저 보여줘야 하는 제품", "디자인 시스템과 문서를 함께 보여주는 사이트", "중립적이지만 전문적인 랜딩페이지"],
    cautions: ["너무 무색무취하면 일반 SaaS처럼 보일 수 있습니다.", "Swiss처럼 빨간 포스터 신호를 쓰면 스타일 경계가 흐려집니다.", "컴포넌트가 반복되더라도 첫 화면에는 명확한 브랜드 신호가 필요합니다."],
    imagePrompt:
      "An International Typographic Style web system with neutral corporate grid, modular panels, blue system accent, data rows, precise sans-serif hierarchy, global institutional clarity, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "IBM Design Language", url: "https://www.ibm.com/design/language/", note: "Global corporate system reference for neutral typography, repeatable components, modular grids, and international product communication." },
        { title: "IBM Design Language - Layout", url: "https://www.ibm.com/design/language/layout/overview/", note: "Layout reference for precise grid behavior, consistent alignment, engineered hierarchy, and corporate-scale design rules." },
        { title: "MoMA", url: "https://www.moma.org/", note: "Institutional reference for universal information structure, objective navigation, and cross-content modules across art, events, and visits." },
      ],
      referenceGalleries: [
        { title: "Pinterest - International Typographic Style", url: "https://id.pinterest.com/4340m/international-typographic-style/", note: "Moodboard reference for objective grids, Helvetica-like typography, asymmetric alignment, and universal information hierarchy." },
        { title: "Awwwards - Business & Corporate Websites", url: "https://www.awwwards.com/websites/business-corporate/", note: "Gallery reference for corporate-scale web systems, rational content architecture, neutral tone, and product/institution clarity." },
        { title: "Dribbble - International Typographic Style", url: "https://dribbble.com/search/international%20typographic%20style", note: "UI and graphic reference for typographic systems, neutral components, grid-based presentation, and corporate information modules." },
      ],
      representativeTraits: ["Neutral global grid", "Corporate component system", "Blue system accent", "Data and document modules", "Objective hierarchy"],
      avoidTraits: ["Poster-like Swiss red", "Warm domestic palette", "Expressive geometric modernism"],
      tokenIntent:
        "Use cool neutral surfaces, subtle borders, a single blue accent, sharp components, normal density, and predictable grid rhythm so the style reads as international corporate information design.",
    },
  },
  scandinavian: {
    summary: "스칸디나비안 디자인은 밝은 배경, 생활감 있는 제품 사진, 부드러운 색, 실용적인 카드 구조로 편안한 북유럽식 웹 경험을 만드는 디자인입니다.",
    description:
      "스칸디나비안은 미니멀하지만 차갑지 않습니다. IKEA의 접근성 있는 홈 커머스, Muuto의 현대적 북유럽 제품 표현, Nordic Nest의 생활 카테고리처럼 밝은 표면과 넓은 여백 위에 제품, 방, 소재가 친근하게 놓입니다. Japandi보다 더 밝고 생활적이며, Warm Minimal보다 더 실용적인 커머스 구조를 가집니다.",
    visualFeatures: ["밝은 크림색 배경과 부드러운 그린/우드 톤이 생활감을 만듭니다.", "제품 카드, 방 카테고리, 추천 모듈처럼 실제 쇼핑 구조가 잘 어울립니다.", "사진 또는 제품 영역은 둥근 모서리와 충분한 여백으로 편안하게 보입니다.", "작은 할인/신상품 배지가 UI의 실용성을 더합니다."],
    colorPalette: ["크림과 밝은 흰색 표면을 기본으로 사용합니다.", "세이지 그린과 밝은 우드 색을 주요 감성색으로 둡니다.", "오렌지/코랄은 생활감 있는 작은 강조에만 씁니다.", "경계선은 부드럽고 낮은 대비로 유지합니다."],
    typography: ["친근한 산세리프를 중간 굵기로 사용합니다.", "제목은 큰 편이지만 지나치게 차갑거나 압축되지 않습니다.", "제품명, 가격, 카테고리 텍스트는 읽기 쉽게 작고 명확하게 둡니다."],
    layoutTraits: ["생활형 커머스처럼 히어로, 카테고리, 제품 카드가 이어집니다.", "그리드는 정돈되어 있지만 카드 간 간격이 넉넉합니다.", "둥근 형태와 부드러운 색면을 사용해 실용성과 온기를 같이 줍니다.", "모바일에서도 제품 카드가 실제 쇼핑 화면처럼 보이도록 합니다."],
    useCases: ["홈 리빙 커머스", "라이프스타일 브랜드", "가구 쇼룸", "웰니스 제품"],
    goodFor: ["제품을 친근하게 보여줘야 하는 커머스", "밝고 신뢰감 있는 홈 브랜드", "복잡하지 않은 카테고리 탐색", "생활 사진과 제품 카드가 많은 사이트"],
    cautions: ["너무 베이지로만 가면 Warm Minimal과 겹칩니다.", "사진 없는 추상 카드만 쓰면 북유럽 생활감이 사라집니다.", "귀여운 파스텔이 강하면 Kawaii나 Pastel 쪽으로 흐를 수 있습니다."],
    imagePrompt:
      "A Scandinavian web commerce reference image with bright cream background, soft sage and oak accents, practical furniture product cards, cozy home categories, friendly sans-serif typography, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "IKEA", url: "https://www.ikea.com", note: "Mass-market Scandinavian reference for friendly product navigation, bright surfaces, practical room modules, and approachable home commerce." },
        { title: "Muuto", url: "https://www.muuto.com", note: "Contemporary Scandinavian brand reference for soft color, furniture-led storytelling, generous product cards, and warm minimal composition." },
        { title: "Nordic Nest", url: "https://www.nordicnest.com/", note: "Scandinavian commerce reference for lifestyle categories, pale backgrounds, cozy product density, and practical shopping hierarchy." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Scandinavian Website Design", url: "https://www.pinterest.com/search/pins/?q=scandinavian%20website%20design", note: "Moodboard/search reference for light interiors, pale wood, home-product layouts, soft neutrals, and cozy-but-ordered web composition." },
        { title: "Awwwards - Minimal Websites", url: "https://www.awwwards.com/websites/minimal/", note: "Closest gallery reference for refined Scandinavian-adjacent minimal web execution, bright layouts, product calm, and restrained interaction." },
        { title: "Dribbble - Scandinavian", url: "https://dribbble.com/tags/scandinavian", note: "UI and brand reference for Nordic furniture cards, soft product palettes, clean ecommerce modules, and lifestyle interface details." },
      ],
      representativeTraits: ["Bright home commerce", "Soft Nordic palette", "Practical product cards", "Cozy lifestyle modules", "Friendly rounded edges"],
      avoidTraits: ["Sterile Swiss grid", "Dark luxury restraint", "Japanese shadow-heavy calm"],
      tokenIntent:
        "Use bright cream surfaces, soft sage and oak accents, rounded cards, gentle shadows, normal spacing, and product-card layout so the style reads as Scandinavian home commerce.",
    },
  },
  japandi: {
    summary: "재팬디는 일본식 고요함과 북유럽의 실용성을 결합해 목재, 낮은 대비, 정적인 여백으로 차분한 웹 공간을 만드는 디자인입니다.",
    description:
      "재팬디는 밝은 북유럽 커머스보다 더 조용하고, Warm Minimal보다 더 건축적입니다. Karimoku Case, Norm Architects의 Azabu Residence와 Soft Minimal처럼 목재, 종이빛 표면, muted green, 긴 호흡의 이미지 블록을 사용합니다. 웹에서는 제품이나 공간을 빠르게 팔기보다, 재료와 장면을 천천히 읽게 하는 구조가 중요합니다.",
    visualFeatures: ["낮은 대비의 베이지와 목재색이 화면의 기본 온도를 만듭니다.", "큰 이미지/공간 패널과 작은 설명 텍스트가 느린 리듬을 만듭니다.", "경계선과 카드 그림자는 최소화하고 재료감 있는 색면으로 구분합니다.", "라벨, 가격, CTA는 작고 조용하지만 명확하게 배치합니다."],
    colorPalette: ["쌀빛 베이지와 따뜻한 흰색을 기본으로 둡니다.", "목재 갈색과 muted green을 핵심 재료색으로 사용합니다.", "검정 대신 부드러운 먹색 텍스트를 씁니다.", "테두리는 진하지 않게 두어 공간감이 끊기지 않게 합니다."],
    typography: ["가늘고 차분한 산세리프 또는 세리프 느낌의 보조 리듬이 어울립니다.", "제목은 크게 쓰되 공격적인 압축 없이 낮은 목소리로 둡니다.", "본문은 짧은 문장과 넓은 행간으로 공간처럼 읽히게 합니다."],
    layoutTraits: ["큰 공간 이미지, 재료 카드, 예약/문의 CTA가 느리게 이어집니다.", "비대칭이 있더라도 긴 여백과 낮은 대비로 안정감을 줍니다.", "제품 카드보다 룸/재료/철학 블록이 더 강하게 보입니다.", "모바일에서는 이미지-설명-CTA 순서를 명확히 유지합니다."],
    useCases: ["가구 브랜드", "인테리어 스튜디오", "숙박/스테이", "웰니스 공간"],
    goodFor: ["자연 소재와 공간감을 강조하는 브랜드", "프리미엄이지만 과시하지 않는 제품", "느린 탐색과 문의 전환이 중요한 사이트", "건축/인테리어 포트폴리오"],
    cautions: ["너무 밝고 카드형이면 Scandinavian과 겹칩니다.", "색을 너무 따뜻하게 밀면 Warm Minimal과 구분이 약해집니다.", "장면이 없으면 단순 베이지 미니멀로 보일 수 있습니다."],
    imagePrompt:
      "A Japandi web design reference image with quiet wood-toned interiors, rice paper neutrals, muted green accent, large calm spatial panels, soft minimal furniture modules, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Karimoku Case - Creators", url: "https://www.karimoku-case.com/creators/", note: "Japandi reference for Japanese craft plus Scandinavian restraint, natural materials, quiet furniture presentation, and calm editorial spacing." },
        { title: "Norm Architects - Azabu Residence", url: "https://normcph.com/project/azabu-residence/", note: "Project reference for muted palette, tactile materials, wood warmth, and Japanese-Danish spatial calm in a web editorial format." },
        { title: "Norm Architects - Soft Minimal", url: "https://normcph.com/project/soft-minimal-2/", note: "Concept reference for human-centric restraint, tactility, natural light, and soft-minimal web storytelling that overlaps with Japandi." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Japandi Website Design", url: "https://www.pinterest.com/search/pins/?q=japandi%20website%20design", note: "Moodboard/search reference for wood, rice-paper neutrals, interior whitespace, low contrast, and quiet Japanese-Scandinavian layouts." },
        { title: "Awwwards - Architecture Websites", url: "https://www.awwwards.com/websites/architecture/", note: "Closest gallery reference for architectural calm, image-led spaces, restrained motion, and premium interior/architecture web presentation." },
        { title: "Dribbble - Japandi", url: "https://dribbble.com/search/japandi", note: "UI reference for Japandi furniture landings, interior cards, muted e-commerce flows, and calm booking/product layouts." },
      ],
      representativeTraits: ["Wood and rice-paper neutrals", "Quiet spatial panels", "Low contrast hierarchy", "Tactile material cards", "Slow editorial rhythm"],
      avoidTraits: ["Bright Scandinavian commerce", "Terracotta-heavy warm minimal", "Hard Swiss structure"],
      tokenIntent:
        "Use muted wood, rice-paper neutrals, soft ink text, low borders, calm spacing, and image-led interior modules so the style reads as Japandi spatial calm.",
    },
  },
  "warm-minimal": {
    summary: "웜 미니멀은 미니멀한 구조 위에 크림, 테라코타, 리넨 같은 따뜻한 색과 질감을 더해 부드럽고 초대하는 웹 경험을 만드는 디자인입니다.",
    description:
      "웜 미니멀은 차가운 미니멀리즘을 피하고, 감정이 있는 절제를 만듭니다. QUQU Design Studio와 Vellum Studio처럼 크림 배경, 부드러운 실내 사진, 테라코타 포인트, 여유로운 프로젝트 카드가 핵심입니다. Japandi보다 더 부드럽고 감성적이며, Scandinavian보다 커머스보다는 스튜디오/포트폴리오의 초대감에 가깝습니다.",
    visualFeatures: ["크림, 타우프, 테라코타 계열이 첫인상을 따뜻하게 만듭니다.", "큰 둥근 이미지나 프로젝트 카드가 실제 스튜디오 웹처럼 보입니다.", "그림자는 거의 없지만 레이어 사이에 부드러운 색 차이를 둡니다.", "CTA와 배지는 검정 대신 따뜻한 브라운/테라코타로 처리합니다."],
    colorPalette: ["크림과 웜 화이트를 기본 배경으로 사용합니다.", "테라코타는 CTA와 주요 상태에 제한적으로 씁니다.", "리넨 베이지와 따뜻한 브라운을 보조 표면에 둡니다.", "텍스트는 검정보다 부드러운 짙은 브라운에 가깝게 둡니다."],
    typography: ["부드러운 산세리프를 중간 굵기로 사용합니다.", "제목은 크지만 모서리와 행간이 편안하게 느껴져야 합니다.", "본문은 짧고 감성적인 문장으로 프로젝트 분위기를 설명합니다."],
    layoutTraits: ["스튜디오 포트폴리오처럼 히어로, 프로젝트 카드, 상담 CTA가 이어집니다.", "카드는 둥글고 넉넉하지만 과한 그림자 없이 색 차이로 구분합니다.", "색상 블록보다 이미지/텍스처/여백의 리듬이 중요합니다.", "모바일에서는 상담 CTA가 분명하게 보여야 합니다."],
    useCases: ["인테리어 스튜디오", "웰니스 브랜드", "프리미엄 로컬 브랜드", "크리에이티브 포트폴리오"],
    goodFor: ["부드러운 고급감과 접근성을 같이 원하는 브랜드", "공간/라이프스타일 사진이 많은 사이트", "상담 전환이 중요한 스튜디오", "차갑지 않은 미니멀 랜딩페이지"],
    cautions: ["베이지 톤만 반복하면 개성이 약해집니다.", "둥근 카드와 그림자가 많아지면 일반 라이프스타일 UI처럼 보입니다.", "Japandi와 구분하려면 목재보다 리넨/테라코타/스튜디오 카드를 강조해야 합니다."],
    imagePrompt:
      "A warm minimal web design reference image with cream and taupe surfaces, terracotta accents, soft interior studio cards, linen texture feeling, rounded consultation CTA, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "QUQU Design Studio", url: "https://ququstudio.com/en/", note: "Warm minimalist studio reference for cream surfaces, soft interior imagery, quiet navigation, and selected-work portfolio rhythm." },
        { title: "Vellum Studio", url: "https://www.vellum.studio/", note: "Interior studio reference for tranquil warm minimalism, tactile residential imagery, soft brutalist restraint, and calm editorial pacing." },
        { title: "Norm Architects - Soft Minimal", url: "https://normcph.com/project/soft-minimal-2/", note: "Soft-minimal reference for warm neutrals, tactile material language, slower reading rhythm, and human-centered restraint." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Warm Minimal Website Design", url: "https://www.pinterest.com/search/pins/?q=warm%20minimal%20website%20design", note: "Moodboard/search reference for cream, taupe, terracotta, soft shadows, natural texture, and welcoming minimal web layouts." },
        { title: "Awwwards - Minimal Collection", url: "https://www.awwwards.com/awwwards/collections/minimal/", note: "Closest gallery reference for quiet minimal sites, soft portfolio pacing, restrained modules, and polished warm-minimal execution cues." },
        { title: "Dribbble - Minimal Page", url: "https://dribbble.com/search/minimal-page", note: "UI reference for warm minimal product pages, soft conversion modules, spacious hero sections, and gently layered neutral components." },
      ],
      representativeTraits: ["Cream and taupe warmth", "Terracotta CTA", "Soft project cards", "Linen-like texture", "Welcoming studio rhythm"],
      avoidTraits: ["Cool SaaS minimalism", "Nordic product-commerce density", "Japanese wood-heavy stillness"],
      tokenIntent:
        "Use cream surfaces, terracotta accents, warm brown text, rounded cards, airy spacing, and soft studio modules so the style reads as warm minimal rather than generic beige minimalism.",
    },
  },
  "soft-minimal": {
    summary: "소프트 미니멀은 절제된 구조에 낮은 대비, 둥근 표면, 촉감 있는 중성색을 더해 긴장 없는 서비스형 웹 화면을 만드는 스타일입니다.",
    description:
      "소프트 미니멀은 Warm Minimal보다 색 온도가 더 조용하고, Japandi보다 제품/서비스 UI에 가깝습니다. Norm Architects, Vellum Studio, Toogood처럼 부드러운 크림 표면, 작은 라벨, 둥근 상담 카드, 여유 있는 텍스트 블록을 사용해 사용자가 천천히 읽고 결정하게 만듭니다.",
    visualFeatures: ["크림과 그레이지 톤이 낮은 대비의 첫인상을 만듭니다.", "둥근 카드와 얇은 선이 실제 서비스 랜딩처럼 작동합니다.", "이미지 대신 부드러운 표면 블록과 상담/패키지 모듈이 중심이 됩니다."],
    colorPalette: ["오프화이트와 그레이지를 기본으로 둡니다.", "따뜻한 베이지를 보조 표면에 쓰고 강한 색은 피합니다.", "텍스트는 검정보다 부드러운 차콜에 가깝게 둡니다."],
    typography: ["중간 굵기의 산세리프로 차분한 제목을 만듭니다.", "본문은 넓은 행간과 짧은 문장으로 압박을 줄입니다.", "라벨은 작고 단정하게 두어 과한 장식을 피합니다."],
    layoutTraits: ["서비스 소개, 패키지 카드, 예약 CTA가 자연스럽게 이어집니다.", "카드 간 간격이 넓고 경계는 낮은 대비로 둡니다.", "모바일에서는 하나의 상담 흐름처럼 세로로 읽히게 합니다."],
    useCases: ["웰니스 서비스", "컨설팅 스튜디오", "프리미엄 로컬 브랜드", "라이프스타일 예약 페이지"],
    goodFor: ["차분하지만 친근한 첫인상", "긴 설명을 부담 없이 읽혀야 하는 서비스", "상담/예약 전환이 중요한 사이트", "차가운 미니멀을 피해야 하는 브랜드"],
    cautions: ["색 대비를 너무 낮추면 정보 위계가 사라집니다.", "Warm Minimal과 겹치지 않게 테라코타보다 그레이지를 우선합니다.", "실제 카드와 CTA가 없으면 단순 배경색 샘플처럼 보일 수 있습니다."],
    imagePrompt:
      "A soft minimal service website reference image with cream and greige surfaces, rounded consultation cards, low contrast typography, tactile neutral blocks, calm booking CTA, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Norm Architects - Soft Minimal", url: "https://normcph.com/project/soft-minimal-2/", note: "Concept reference for gentle restraint, tactile neutrals, soft light, and human-centered minimal composition." },
        { title: "Vellum Studio", url: "https://www.vellum.studio/", note: "Interior studio reference for low-contrast warm surfaces, calm portfolio pacing, and quiet service-oriented modules." },
        { title: "Toogood", url: "https://www.toogood.com/", note: "Design studio reference for softened editorial minimalism, sculptural product rhythm, and restrained off-white brand storytelling." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Soft Minimal Website Design", url: "https://www.pinterest.com/search/pins/?q=soft%20minimal%20website%20design", note: "Moodboard reference for cream neutrals, gentle shadows, rounded editorial cards, and low-pressure web service layouts." },
        { title: "Awwwards - Minimal Collection", url: "https://www.awwwards.com/awwwards/collections/minimal/", note: "Closest gallery reference for polished minimal sites that use soft pacing, subtle surface separation, and restrained typography." },
        { title: "Dribbble - Soft Minimal Website", url: "https://dribbble.com/search/soft%20minimal%20website", note: "UI reference for soft forms, neutral cards, approachable service blocks, and gentle conversion components." },
      ],
      representativeTraits: ["Low-contrast neutrals", "Rounded service cards", "Gentle consultation CTA", "Soft editorial pacing", "Tactile calm"],
      avoidTraits: ["Cold SaaS minimalism", "Terracotta-heavy warm minimal", "Hard Swiss precision"],
      tokenIntent:
        "Use low-contrast cream surfaces, rounded cards, soft borders, airy spacing, and gentle service modules so the style reads as soft minimal.",
    },
  },
  "high-end-minimal": {
    summary: "하이엔드 미니멀은 큰 여백, 정교한 상품 프레이밍, 절제된 명암으로 고급 제품의 품질을 조용히 강조하는 스타일입니다.",
    description:
      "하이엔드 미니멀은 단순히 비어 있는 화면이 아니라, 제품 이미지와 구매 흐름을 매우 엄격하게 정렬하는 럭셔리 커머스 언어입니다. Aesop, Jil Sander, Toteme처럼 좁은 팔레트, 정확한 상품 카드, 얇은 라인, 낮은 목소리의 CTA가 핵심입니다.",
    visualFeatures: ["큰 제품 프레임과 넓은 여백이 화면의 중심이 됩니다.", "명도 차이가 작은 베이지/블랙 팔레트가 프리미엄 인상을 만듭니다.", "가격, 옵션, CTA는 작지만 매우 정확한 위치에 놓입니다."],
    colorPalette: ["웜 화이트와 크림을 기본 표면으로 둡니다.", "차콜과 블랙을 텍스트와 CTA에 제한적으로 씁니다.", "금속성 베이지나 토프를 소재감 포인트로 사용합니다."],
    typography: ["얇거나 중간 굵기의 산세리프를 정교하게 배치합니다.", "제목은 크게 쓰되 과시하지 않고 안정적인 행간을 유지합니다.", "상품 정보는 작은 크기로도 또렷하게 읽히게 합니다."],
    layoutTraits: ["상품 히어로, 세부 옵션, 룩북 카드가 조용히 이어집니다.", "그리드는 매우 정렬되어 있고 장식보다 비례가 중요합니다.", "모바일에서는 제품 이미지와 구매 CTA가 먼저 보여야 합니다."],
    useCases: ["럭셔리 제품", "패션 커머스", "뷰티 브랜드", "프리미엄 편집숍"],
    goodFor: ["제품의 소재와 품질을 강조하는 페이지", "적은 카피로 신뢰감을 줘야 하는 브랜드", "고급 사진이 있는 커머스", "차분한 구매 전환"],
    cautions: ["사진 품질이 낮으면 고급감이 바로 무너집니다.", "색을 너무 많이 쓰면 High-End Minimal이 아니라 일반 커머스가 됩니다.", "여백만 늘리면 정보가 부족한 화면처럼 보일 수 있습니다."],
    imagePrompt:
      "A high-end minimal luxury ecommerce website reference image with cream surface, precise product hero, black restrained typography, premium material swatches, quiet checkout CTA, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Aesop", url: "https://www.aesop.com", note: "Premium retail reference for disciplined product storytelling, refined spacing, muted material color, and controlled interaction detail." },
        { title: "Jil Sander", url: "https://www.jilsander.com", note: "Fashion reference for austere luxury minimalism, precise product grids, quiet typography, and severe neutral composition." },
        { title: "Toteme", url: "https://www.toteme.com", note: "Luxury fashion reference for image-led restraint, exact spacing, black-and-cream hierarchy, and editorial commerce modules." },
      ],
      referenceGalleries: [
        { title: "Pinterest - High End Minimal Website Design", url: "https://www.pinterest.com/search/pins/?q=high%20end%20minimal%20website%20design", note: "Moodboard reference for luxury whitespace, refined serif and sans typography, premium product framing, and controlled neutral palettes." },
        { title: "Awwwards - Luxury Websites", url: "https://www.awwwards.com/websites/luxury/", note: "Award-gallery reference for high-end web execution, premium imagery, restrained motion, and careful editorial pacing." },
        { title: "Dribbble - Luxury Minimal Website", url: "https://dribbble.com/search/luxury%20minimal%20website", note: "UI reference for refined product detail pages, elegant navigation, premium cards, and spare conversion layouts." },
      ],
      representativeTraits: ["Luxury product framing", "Exact spacing", "Quiet commerce CTA", "Neutral material palette", "Restrained hierarchy"],
      avoidTraits: ["Generic SaaS minimalism", "Decorative luxury excess", "Soft rounded wellness cards"],
      tokenIntent:
        "Use precise luxury spacing, warm neutrals, fine borders, restrained black CTAs, and product-first modules so the style reads as high-end minimal.",
    },
  },
  brutalism: {
    summary: "브루탈리즘은 거친 HTML 구조, 두꺼운 선, 노골적인 정보 배치를 통해 가공되지 않은 웹의 힘을 드러내는 스타일입니다.",
    description:
      "브루탈리즘은 예쁜 포스터 효과가 아니라 실제 웹 구조의 날것을 전면에 보이는 방식입니다. Brutalist Websites, Balenciaga, Secession처럼 표 형태의 목록, 큰 경계선, 기본 컨트롤처럼 보이는 버튼, 강한 흑백 대비가 화면의 주된 언어가 됩니다.",
    visualFeatures: ["굵은 테두리와 표 구조가 화면을 강하게 나눕니다.", "색은 적지만 액센트가 들어갈 때는 매우 직접적으로 보입니다.", "버튼과 링크가 장식 없이 기능처럼 드러납니다."],
    colorPalette: ["흰색, 검정, 오래된 종이색을 기본으로 둡니다.", "빨강, 노랑, 파랑은 표식처럼 제한적으로 씁니다.", "회색은 설명과 상태 정보에만 사용합니다."],
    typography: ["두껍고 큰 제목을 사용하지만 글자 간격은 벌리지 않습니다.", "본문과 표 라벨은 시스템 산세리프처럼 직접적이어야 합니다.", "정제된 세리프나 부드러운 스크립트는 피합니다."],
    layoutTraits: ["목록, 표, 색인, 경고 박스가 웹 페이지의 실제 구조처럼 보입니다.", "카드보다 행과 칸을 우선하고 경계선을 숨기지 않습니다.", "모바일에서도 두꺼운 구획과 큰 링크가 유지됩니다."],
    useCases: ["문화 기관", "실험적 포트폴리오", "패션 캠페인", "아카이브 인덱스"],
    goodFor: ["강한 태도와 비상업적 이미지를 보여줄 때", "정보 구조 자체를 시각 언어로 쓰는 사이트", "브랜드가 일부러 거칠고 직접적으로 보여야 할 때", "포스터보다 실제 인덱스형 웹이 필요한 경우"],
    cautions: ["텍스트가 많을수록 정렬 규칙이 없으면 그냥 깨진 화면처럼 보입니다.", "너무 귀여운 색과 그림자를 쓰면 New Brutalism으로 넘어갑니다.", "접근성과 클릭 가능성이 불분명해지지 않게 해야 합니다."],
    imagePrompt:
      "A brutalist web index reference image with raw black borders, table rows, default-like buttons, stark white and paper background, red warning accent, plain navigation, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Brutalist Websites", url: "https://brutalistwebsites.com", note: "Reference archive for raw HTML structure, default-looking controls, hard borders, and deliberately plain web composition." },
        { title: "Balenciaga", url: "https://www.balenciaga.com", note: "Fashion reference for sparse commerce, severe monochrome hierarchy, blunt navigation, and anti-polished luxury minimalism." },
        { title: "Secession", url: "https://www.secession.at", note: "Cultural reference for table-like structure, strict columns, plain surfaces, and brutalist institutional web rhythm." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Brutalist Website Design", url: "https://www.pinterest.com/search/pins/?q=brutalist%20website%20design", note: "Moodboard reference for raw typography, stark black-white layouts, exposed boxes, and intentionally severe web surfaces." },
        { title: "Awwwards - Brutalism Collection", url: "https://www.awwwards.com/awwwards/collections/brutalism/", note: "Gallery reference for award-level brutalist executions, including hard grids, exposed UI, oversized type, and rough interaction cues." },
        { title: "Dribbble - Brutalist Website", url: "https://dribbble.com/tags/brutalist_website", note: "UI reference for brutalist cards, thick borders, raw navigation, stark CTAs, and component-level layout tension." },
      ],
      representativeTraits: ["Raw web index", "Thick borders", "Default-like controls", "Hard monochrome structure", "Direct information rows"],
      avoidTraits: ["Playful neo-brutalist shadows", "Polished luxury whitespace", "Decorative poster-only layout"],
      tokenIntent:
        "Use monochrome surfaces, thick borders, raw table rows, no radius, and blunt CTAs so the style reads as real web brutalism.",
    },
  },
  "new-brutalism": {
    summary: "뉴 브루탈리즘은 브루탈리즘의 두꺼운 선과 직접성을 앱 UI에 맞게 밝은 색, 오프셋 그림자, 큰 버튼으로 재해석한 스타일입니다.",
    description:
      "뉴 브루탈리즘은 raw HTML보다 더 제품 UI적이고 장난스럽습니다. Gumroad, Neo Brutalism UI, Figma 커뮤니티 사례처럼 두꺼운 카드, 원색 배경, 눌리는 버튼, 큰 가격/상태 블록이 실제 앱 화면처럼 보이게 해야 합니다.",
    visualFeatures: ["두꺼운 검정 선과 단색 그림자가 가장 강한 신호입니다.", "카드, 입력창, 버튼이 모두 물리적인 블록처럼 보입니다.", "밝은 노랑, 초록, 보라 같은 색이 UI 상태를 명확히 나눕니다."],
    colorPalette: ["밝은 노랑 또는 크림을 기본 배경으로 둡니다.", "검정은 모든 테두리와 텍스트의 기준입니다.", "원색 액센트를 버튼, 알림, 가격 카드에 씁니다."],
    typography: ["굵은 제목과 두꺼운 버튼 텍스트를 사용합니다.", "본문도 약간 무겁게 두어 블록감이 유지되게 합니다.", "글자 간격보다 면과 선의 힘으로 개성을 만듭니다."],
    layoutTraits: ["대시보드, 가격 카드, 폼, 체크리스트가 실제 제품처럼 구성됩니다.", "각 모듈은 독립적인 박스처럼 명확하게 분리됩니다.", "모바일에서도 큰 터치 타깃과 그림자가 남아야 합니다."],
    useCases: ["크리에이터 플랫폼", "SaaS 대시보드", "교육 앱", "가격/구독 페이지"],
    goodFor: ["친근하지만 강한 제품 UI", "복잡하지 않은 앱 기능 소개", "크리에이터/개발자 대상 서비스", "명확한 CTA가 필요한 랜딩"],
    cautions: ["그림자와 색을 너무 많이 겹치면 가독성이 떨어집니다.", "일반 브루탈리즘보다 더 앱 구조가 보여야 합니다.", "모서리와 두께 규칙이 흔들리면 유치해 보일 수 있습니다."],
    imagePrompt:
      "A neo brutalist product dashboard website reference image with thick black borders, yellow background, offset shadows, bright app cards, chunky buttons, pricing widgets, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Gumroad", url: "https://gumroad.com", note: "Product reference for playful digital brutalism, thick outline cards, blunt commerce hierarchy, and saturated accent blocks." },
        { title: "Neo Brutalism UI", url: "https://neobrutalism.dev/", note: "Component reference for offset shadows, heavy borders, direct controls, high-contrast panels, and web-native neo-brutalist rules." },
        { title: "Figma Community - Neubrutalism", url: "https://www.figma.com/community/tag/neubrutalism/files", note: "Design-resource reference for component-level neo-brutalist cards, buttons, forms, and dashboard surfaces." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Neo Brutalism Web Design", url: "https://www.pinterest.com/search/pins/?q=neo%20brutalism%20web%20design", note: "Moodboard reference for chunky outlines, playful shadows, saturated panels, and intentionally simple app interfaces." },
        { title: "Awwwards - Brutalism Collection", url: "https://www.awwwards.com/awwwards/collections/brutalism/", note: "Gallery reference for brutalist and neo-brutalist web executions, hard-edged modules, and expressive web-native structures." },
        { title: "Dribbble - Neo Brutalism", url: "https://dribbble.com/tags/neo-brutalism", note: "UI reference for neo-brutalist dashboards, cards, buttons, pricing blocks, and high-contrast product surfaces." },
      ],
      representativeTraits: ["Chunky app UI", "Offset shadows", "Bright panels", "Thick black controls", "Direct product modules"],
      avoidTraits: ["Raw archival brutalism", "Anti-design disorder", "Soft rounded minimalism"],
      tokenIntent:
        "Use bright panels, thick black outlines, block shadows, compact spacing, and app-like cards so the style reads as neo brutalism.",
    },
  },
  "anti-design": {
    summary: "안티디자인은 균형, 정렬, 세련됨을 일부러 비틀어 불편하지만 기억에 남는 실험적 웹 경험을 만드는 스타일입니다.",
    description:
      "안티디자인은 실수처럼 보이는 것이 아니라, 관습을 깨는 의도적인 연출입니다. Superbad, The HTML Review, Are.na처럼 엇나간 배치, 충돌하는 색, 비정형 링크, 불균형한 텍스트 블록을 사용하되 클릭과 읽기는 유지해야 합니다.",
    visualFeatures: ["정렬이 일부러 흔들리고 모듈 크기가 불균형합니다.", "충돌하는 색과 배경이 관습적인 미감을 방해합니다.", "링크와 라벨은 낯설지만 실제 웹 요소처럼 작동합니다."],
    colorPalette: ["형광 노랑, 핑크, 사이언처럼 충돌하는 색을 씁니다.", "검정 테두리로 최소한의 구조를 붙잡습니다.", "중성색은 숨을 쉴 수 있는 작은 영역에만 둡니다."],
    typography: ["제목과 라벨 크기를 일부러 어긋나게 배치합니다.", "본문은 완전히 깨뜨리지 않고 읽을 수 있는 기준선을 유지합니다.", "다양한 굵기보다 위치와 색 충돌로 긴장을 만듭니다."],
    layoutTraits: ["랜딩, 링크 허브, 아트 프로젝트, 독립 출판 페이지에 어울립니다.", "요소가 겹치거나 튀어나오되 주요 CTA는 남아야 합니다.", "모바일에서는 혼란보다 의도적 순서를 우선합니다."],
    useCases: ["아트 프로젝트", "독립 출판", "실험적 캠페인", "문화 이벤트"],
    goodFor: ["기억에 남는 첫인상이 필요한 프로젝트", "상업적 세련됨을 거부하는 브랜드", "짧고 강한 메시지를 던지는 캠페인", "디자인 관습 자체를 주제로 삼는 페이지"],
    cautions: ["진짜 오류처럼 보이면 신뢰가 떨어집니다.", "접근성 대비와 클릭 영역은 끝까지 확인해야 합니다.", "장기 사용 제품 UI에는 피로도가 큽니다."],
    imagePrompt:
      "An anti-design website reference image with intentionally awkward layout, clashing yellow cyan pink surfaces, misaligned link blocks, raw black borders, readable chaos, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Superbad", url: "https://www.superbad.com", note: "Historical web reference for intentionally awkward composition, early-web friction, clashing visuals, and anti-polished navigation." },
        { title: "The HTML Review", url: "https://thehtml.review/", note: "Independent web reference for strange editorial systems, raw HTML feeling, unexpected layouts, and handcrafted anti-design energy." },
        { title: "Are.na", url: "https://www.are.na/", note: "Cultural platform reference for rough knowledge boards, dense links, plain interface elements, and anti-slick publishing rhythm." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Anti Design Website", url: "https://www.pinterest.com/search/pins/?q=anti%20design%20website", note: "Moodboard reference for clashing layouts, deliberate imbalance, uncomfortable type scale, and anti-commercial web composition." },
        { title: "Awwwards - Experimental Websites", url: "https://www.awwwards.com/websites/experimental/", note: "Gallery reference for unconventional web systems, broken expectations, experimental navigation, and intentionally unstable visual rhythm." },
        { title: "Dribbble - Anti Design Website", url: "https://dribbble.com/search/anti%20design%20website", note: "UI reference for anti-design posters, chaotic cards, distorted hierarchy, and deliberately awkward digital surfaces." },
      ],
      representativeTraits: ["Intentional imbalance", "Clashing colors", "Misaligned links", "Readable chaos", "Anti-commercial attitude"],
      avoidTraits: ["Random broken UI", "Cute neo-brutalist order", "Polished gallery minimalism"],
      tokenIntent:
        "Use clashing colors, uneven modules, raw borders, compact spacing, and intentionally awkward hierarchy while keeping key controls readable.",
    },
  },
  maximalism: {
    summary: "맥시멀리즘은 색, 패턴, 이미지, 장식 모티프를 풍부하게 쌓아 브랜드 세계관을 한 화면에 밀도 있게 보여주는 스타일입니다.",
    description:
      "맥시멀리즘은 단순히 많은 요소를 넣는 방식이 아니라, 반복 패턴과 강한 색으로 몰입형 브랜드 무대를 만드는 방식입니다. FARM Rio, Versace, Liberty London처럼 제품 카드, 캠페인 배너, 장식 패턴, 배지가 동시에 보이지만 중심 행동은 분명해야 합니다.",
    visualFeatures: ["패턴과 색면이 화면의 빈 공간을 적극적으로 채웁니다.", "상품/이미지/라벨이 여러 층으로 겹쳐 브랜드 세계관을 만듭니다.", "장식적이지만 가격, 컬렉션, CTA 같은 정보가 살아 있어야 합니다."],
    colorPalette: ["짙은 보라나 버건디 같은 깊은 배경을 사용할 수 있습니다.", "핑크, 그린, 골드처럼 강한 액센트를 함께 씁니다.", "패턴이 많을수록 텍스트 대비를 의식적으로 확보합니다."],
    typography: ["굵은 제목과 장식적 라벨을 함께 사용합니다.", "본문은 짧게 유지해 장식 밀도에 묻히지 않게 합니다.", "가격과 CTA는 고대비 박스로 분명하게 처리합니다."],
    layoutTraits: ["캠페인 히어로, 패턴 영역, 상품 카드, 배지가 한 화면에 공존합니다.", "대칭보다 풍부한 레이어와 시선 이동을 우선합니다.", "모바일에서는 레이어 수를 줄이고 핵심 카드부터 보여줍니다."],
    useCases: ["패션 캠페인", "패턴 브랜드", "라이프스타일 편집숍", "한정 컬렉션"],
    goodFor: ["브랜드 세계관이 강한 커머스", "시각 자산이 풍부한 캠페인", "고객이 둘러보는 재미를 느껴야 하는 페이지", "평범한 제품 목록을 무대로 바꾸고 싶을 때"],
    cautions: ["정보 위계 없이 쌓으면 혼잡한 화면이 됩니다.", "모든 색을 같은 비중으로 쓰면 CTA가 사라집니다.", "성능과 이미지 로딩도 함께 고려해야 합니다."],
    imagePrompt:
      "A maximalist fashion campaign website reference image with layered textile patterns, saturated jewel colors, product cards, ornate badges, dense but readable ecommerce hierarchy, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "FARM Rio", url: "https://farmrio.com/", note: "Fashion maximalism reference for saturated prints, joyful pattern density, tropical color, and expressive product storytelling." },
        { title: "Versace", url: "https://www.versace.com", note: "Luxury reference for gold, pattern, iconic motifs, high-contrast product drama, and unapologetically decorative surfaces." },
        { title: "Liberty London", url: "https://www.libertylondon.com", note: "Retail reference for textile pattern density, floral maximalism, heritage color, and layered commerce modules." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Maximalist Website Design", url: "https://www.pinterest.com/search/pins/?q=maximalist%20website%20design", note: "Moodboard reference for saturated color, layered pattern, dense composition, eclectic type, and decorative web scenes." },
        { title: "Awwwards - Colorful Websites", url: "https://www.awwwards.com/websites/colorful/", note: "Closest gallery reference for award-level maximal color, bold visual systems, ornamental motion, and dense campaign pages." },
        { title: "Dribbble - Maximalism", url: "https://dribbble.com/tags/maximalism", note: "UI reference for pattern-rich landing pages, expressive product cards, layered hero modules, and decorative component systems." },
      ],
      representativeTraits: ["Layered pattern", "Saturated campaign color", "Dense product world", "Decorative badges", "Clear high-contrast CTA"],
      avoidTraits: ["Random clutter", "Muted vintage catalog", "Single-color dopamine UI"],
      tokenIntent:
        "Use saturated palettes, patterned blocks, compact spacing, strong borders, and layered commerce modules so the style reads as maximalist.",
    },
  },
  "glitch-art": {
    summary: "글리치 아트는 디지털 오류, RGB 분리, 스캔라인, 깨진 데이터 패널을 시각 언어로 삼는 실험적 웹 스타일입니다.",
    description:
      "글리치 아트는 사이버펑크와 가깝지만 더 오류 자체에 집중합니다. Cyberpunk 2077, Patatap, 실험적 웹 레퍼런스처럼 화면이 깨지는 듯한 선, 모노스페이스 정보 패널, 노이즈가 있는 상태 카드가 실제 인터페이스처럼 구성되어야 합니다.",
    visualFeatures: ["RGB 분리와 스캔라인이 디지털 손상을 암시합니다.", "패널은 터미널이나 진단 화면처럼 보입니다.", "밝은 사이언, 마젠타, 라임이 어두운 배경에서 충돌합니다."],
    colorPalette: ["거의 검정에 가까운 배경을 사용합니다.", "사이언과 마젠타를 핵심 오류 색으로 씁니다.", "라임은 경고나 상태값에 제한적으로 둡니다."],
    typography: ["모노스페이스 폰트와 짧은 상태 라벨이 잘 맞습니다.", "제목은 굵고 각진 느낌으로 처리합니다.", "긴 문단보다 코드, 수치, 로그 같은 짧은 단위를 씁니다."],
    layoutTraits: ["진단 대시보드, 미디어 콘솔, 이벤트 티저 화면에 어울립니다.", "패널과 차트가 실제로 작동하는 인터페이스처럼 보여야 합니다.", "모바일에서는 노이즈보다 정보 패널의 가독성을 우선합니다."],
    useCases: ["게임/음악 캠페인", "디지털 아트 전시", "테크 이벤트", "미디어 실험"],
    goodFor: ["불안정한 디지털 감각이 필요한 브랜드", "짧고 강한 인터랙션 티저", "사이버 장르와 연결되는 콘텐츠", "데이터/사운드/영상 기반 프로젝트"],
    cautions: ["글리치 효과가 과하면 텍스트를 읽기 어렵습니다.", "Cyberpunk와 구분하려면 도시/네온보다 오류 패널을 강조합니다.", "광과민 사용자를 위한 과한 점멸은 피해야 합니다."],
    imagePrompt:
      "A glitch art web interface reference image with dark diagnostic panels, RGB split typography, scanline texture, cyan magenta lime accents, corrupted data widgets, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Cyberpunk 2077 Official", url: "https://www.cyberpunk.net", note: "Commercial reference for error-like overlays, neon distortion, aggressive digital panels, and high-energy sci-fi interface rhythm." },
        { title: "Patatap", url: "https://patatap.com", note: "Interactive reference for audiovisual pulses, reactive digital marks, simple controls, and playful glitch-adjacent feedback." },
        { title: "The HTML Review", url: "https://thehtml.review/", note: "Experimental web reference for raw publishing, unexpected visual breaks, and non-standard digital composition." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Glitch Website Design", url: "https://www.pinterest.com/search/pins/?q=glitch%20website%20design", note: "Moodboard reference for RGB splits, broken scanlines, noisy panels, digital corruption, and distorted typography." },
        { title: "Awwwards - Experimental Websites", url: "https://www.awwwards.com/websites/experimental/", note: "Gallery reference for interactive experimental sites, digital distortion, non-linear motion, and unconventional interface effects." },
        { title: "Dribbble - Glitch Website", url: "https://dribbble.com/search/glitch%20website", note: "UI reference for glitch dashboards, corrupted type treatments, scanline overlays, and cyber interface modules." },
      ],
      representativeTraits: ["RGB split", "Scanline panels", "Corrupted widgets", "Dark diagnostic UI", "Digital error energy"],
      avoidTraits: ["Clean cyberpunk marketing", "Decorative neon only", "Unreadable distortion"],
      tokenIntent:
        "Use dark panels, mono typography, dashed borders, glitch shadows, compact spacing, and high-contrast cyan/magenta accents.",
    },
  },
  deconstructivism: {
    summary: "디컨스트럭티비즘은 안정적인 그리드를 해체하고 비껴난 면, 잘린 이미지, 각진 구조를 재조합해 긴장감 있는 웹 화면을 만듭니다.",
    description:
      "디컨스트럭티비즘은 무작위 회전이 아니라 건축적인 구조 해체에 가깝습니다. MoMA의 Deconstructivist Architecture, Coop Himmelb(l)au, Zaha Hadid Architects처럼 조각난 패널, 대각선 구획, 프로젝트 인덱스, 불완전한 정렬이 한 화면에서 공간적 긴장을 만들어야 합니다.",
    visualFeatures: ["카드와 이미지가 직각 그리드에서 일부 벗어납니다.", "대각선, 잘린 면, 겹친 선이 구조 해체를 보여줍니다.", "흑백 구조 위에 빨강이나 파랑이 방향성을 만듭니다."],
    colorPalette: ["콘크리트에 가까운 베이지/회색을 기본으로 둡니다.", "검정 선으로 구조를 잡고 빨강/파랑으로 긴장을 줍니다.", "색보다 면의 분할과 각도가 중요합니다."],
    typography: ["굵은 산세리프를 건축 도면처럼 배치합니다.", "짧은 프로젝트명과 번호가 구조감을 만듭니다.", "본문은 작은 캡션처럼 기능적으로 두는 편이 좋습니다."],
    layoutTraits: ["전시, 건축, 포트폴리오 페이지에 특히 어울립니다.", "비대칭과 겹침을 쓰되 페이지 탐색 순서는 유지합니다.", "모바일에서는 각진 레이어를 줄이고 프로젝트 카드 순서를 명확히 합니다."],
    useCases: ["건축 포트폴리오", "전시 웹사이트", "실험적 브랜드", "프로젝트 아카이브"],
    goodFor: ["공간적 긴장감이 필요한 시각 작업", "정적인 그리드에서 벗어나야 하는 포트폴리오", "이미지와 도면이 많은 사이트", "실험적이지만 지적인 인상이 필요한 브랜드"],
    cautions: ["모든 요소를 비틀면 읽기 흐름이 사라집니다.", "Anti-Design과 구분하려면 구조적 의도를 보여야 합니다.", "모바일에서 겹침이 텍스트를 가리지 않는지 확인해야 합니다."],
    imagePrompt:
      "A deconstructivist architecture website reference image with fractured grid, angular panels, concrete neutrals, black structural lines, red and blue accents, project index modules, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "MoMA - Deconstructivist Architecture", url: "https://www.moma.org/calendar/exhibitions/1813", note: "Historical reference for fragmented structure, broken geometry, spatial tension, and deconstructivist visual principles." },
        { title: "Coop Himmelb(l)au", url: "https://www.coop-himmelblau.at", note: "Architecture reference for angular fragments, asymmetric space, sharp structural overlays, and engineered visual disruption." },
        { title: "Zaha Hadid Architects", url: "https://www.zaha-hadid.com/?lang=en-US", note: "Architecture reference for dynamic deconstructive forms, sharp spatial movement, and complex project-driven visual structure." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Deconstructivism Website Design", url: "https://www.pinterest.com/search/pins/?q=deconstructivism%20website%20design", note: "Moodboard reference for broken grids, sliced panels, tilted forms, architectural fragments, and tense editorial composition." },
        { title: "Awwwards - Experimental Websites", url: "https://www.awwwards.com/websites/experimental/", note: "Gallery reference for unconventional structures, fragmented navigation, dynamic composition, and architecture-adjacent web work." },
        { title: "Dribbble - Deconstructivism Web Design", url: "https://dribbble.com/search/deconstructivism%20web%20design", note: "UI reference for angular cards, displaced content blocks, skewed editorial layouts, and fractured hero systems." },
      ],
      representativeTraits: ["Fractured architecture grid", "Angular panels", "Structural tension", "Project index rhythm", "Controlled displacement"],
      avoidTraits: ["Random anti-design chaos", "Flat brutalist table", "Pure poster collage"],
      tokenIntent:
        "Use concrete neutrals, hard borders, angular spacing, no radius, and displaced project modules so the style reads as deconstructivist.",
    },
  },
  "avant-garde": {
    summary: "아방가르드는 기존 웹 관습보다 실험적 타이포그래피와 전위적 구성을 앞세워 문화적 긴장과 새로움을 보여주는 스타일입니다.",
    description:
      "아방가르드는 장식적 과잉보다 새로운 시각 질서를 제안하는 쪽에 가깝습니다. Serpentine Galleries, Triple Canopy, Walker Art Center처럼 전시/출판/프로그램 정보가 비정형 타이포그래피와 강한 여백, 과감한 색면 안에서 읽히도록 구성합니다.",
    visualFeatures: ["대담한 타이포그래피와 비정형 배치가 첫인상을 만듭니다.", "문화 기관처럼 프로그램, 에세이, 전시 모듈이 함께 보입니다.", "강한 원색 면이 개념적 포스터처럼 작동합니다."],
    colorPalette: ["아이보리와 검정 구조를 기본으로 둡니다.", "빨강, 파랑, 노랑을 작지만 선명하게 씁니다.", "색은 장식보다 섹션의 개념을 나누는 역할을 합니다."],
    typography: ["제목은 크게 쓰되 실험적인 줄바꿈과 블록 배치가 중요합니다.", "본문은 에디토리얼처럼 안정적인 읽기 폭을 유지합니다.", "번호, 날짜, 프로그램 라벨이 강한 그래픽 요소가 됩니다."],
    layoutTraits: ["전시 히어로, 프로그램 리스트, 에세이 카드가 함께 구성됩니다.", "정렬은 고정된 격자보다 전위적 리듬을 따릅니다.", "모바일에서는 실험적 배치보다 콘텐츠 순서를 우선합니다."],
    useCases: ["미술관", "문화 프로그램", "독립 매거진", "실험적 브랜드 소개"],
    goodFor: ["기존 형식과 다른 인상을 줘야 하는 문화 프로젝트", "텍스트와 이미지가 모두 중요한 전시/출판 사이트", "예술적 권위와 새로움을 같이 보여줄 때", "단순한 포스터보다 실제 프로그램 웹이 필요할 때"],
    cautions: ["난해함이 탐색 실패로 이어지지 않게 해야 합니다.", "Postmodernism보다 더 개념적이고 덜 장난스럽게 유지합니다.", "실험적 제목이 본문을 가리거나 밀어내지 않게 합니다."],
    imagePrompt:
      "An avant-garde cultural website reference image with experimental typography, exhibition program modules, ivory black red blue yellow palette, asymmetric editorial structure, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Serpentine Galleries", url: "https://www.serpentinegalleries.org", note: "Art institution reference for experimental editorial hierarchy, cultural programming, unexpected rhythm, and contemporary exhibition pages." },
        { title: "Triple Canopy", url: "https://canopycanopycanopy.com/", note: "Publishing reference for conceptual editorial systems, unusual reading pace, art-critical typography, and non-commercial structure." },
        { title: "Walker Art Center", url: "https://walkerart.org", note: "Museum reference for bold cultural navigation, flexible editorial modules, and progressive institutional visual language." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Avant Garde Website Design", url: "https://www.pinterest.com/search/pins/?q=avant%20garde%20website%20design", note: "Moodboard reference for experimental typography, art-poster composition, asymmetry, and cultural web layouts." },
        { title: "Awwwards - Experimental Websites", url: "https://www.awwwards.com/websites/experimental/", note: "Gallery reference for forward-looking web work, unusual navigation, expressive typography, and conceptual interaction systems." },
        { title: "Dribbble - Avant Garde Website", url: "https://dribbble.com/search/avant%20garde%20website", note: "UI reference for avant-garde landing pages, editorial experiments, angular typography, and gallery-style modules." },
      ],
      representativeTraits: ["Experimental typography", "Cultural program modules", "Conceptual asymmetry", "Primary color accents", "Editorial tension"],
      avoidTraits: ["Memphis playfulness", "Random anti-design disorder", "Corporate Swiss neutrality"],
      tokenIntent:
        "Use strong cultural typography, primary accents, angular editorial modules, and controlled asymmetry so the style reads as avant-garde.",
    },
  },
  postmodernism: {
    summary: "포스트모더니즘은 Memphis식 패턴, 아이러니한 색 조합, 유희적인 형태를 섞어 규칙을 즐겁게 비트는 스타일입니다.",
    description:
      "포스트모더니즘은 장난스럽지만 의도적인 혼합입니다. Memphis Milano, Vitra, Design Museum 사례처럼 기하학 패턴, 색면, 둥근/각진 형태, 상품 카드가 서로 다른 시대의 언어를 섞으며 하나의 웹 포털처럼 보여야 합니다.",
    visualFeatures: ["Memphis 패턴과 기하학 조각이 강한 식별자가 됩니다.", "카드와 배지는 일부러 서로 다른 형태를 사용합니다.", "색은 밝고 충돌하지만 화면은 유쾌한 질서를 유지합니다."],
    colorPalette: ["노랑, 핑크, 민트, 보라 같은 밝은 색을 조합합니다.", "흰색 표면으로 정보 영역을 분리합니다.", "검정 선을 사용해 장난스러운 모양을 묶습니다."],
    typography: ["굵은 제목과 작은 제품 라벨을 대비시킵니다.", "세리프보다 그래픽한 산세리프가 잘 맞습니다.", "번호와 가격 같은 기능 텍스트를 장식처럼 활용합니다."],
    layoutTraits: ["상품/전시/브랜드 포털처럼 여러 카드가 한 화면에 배치됩니다.", "도형 장식이 카드 주변을 리듬감 있게 감쌉니다.", "모바일에서는 패턴을 줄이고 카드 순서를 명확히 합니다."],
    useCases: ["디자인 숍", "전시 굿즈", "문화 브랜드", "컬러풀 제품 랜딩"],
    goodFor: ["밝고 아이러니한 브랜드 태도", "상품 자체가 그래픽한 커머스", "디자인 역사나 오브젝트를 소개하는 페이지", "엄격함보다 즐거운 혼합이 중요한 프로젝트"],
    cautions: ["Maximalism보다 패턴의 언어가 더 명확해야 합니다.", "Anti-Design처럼 무질서하게 보이면 포스트모던의 유희가 약해집니다.", "텍스트 대비를 반드시 확보해야 합니다."],
    imagePrompt:
      "A postmodern Memphis-style website reference image with yellow background, geometric pattern pieces, playful product cards, pink mint purple accents, black outline structure, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Memphis Milano", url: "https://www.memphis-milano.com", note: "Primary postmodern reference for Memphis forms, bright geometric surfaces, ironic color, and playful product presentation." },
        { title: "Vitra - The Memphis Group", url: "https://www.vitra.com/en-us/magazine/details/the-memphis-group", note: "Design-history reference for postmodern pattern, anti-functional color, expressive furniture, and cultural context." },
        { title: "Design Museum - Memphis: Plastic Field", url: "https://designmuseum.org/exhibitions/memphis-plastic-field", note: "Museum reference for postmodern exhibition framing, graphic motifs, playful material, and Memphis visual vocabulary." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Postmodern Memphis Website Design", url: "https://www.pinterest.com/search/pins/?q=postmodern%20website%20design%20memphis", note: "Moodboard reference for Memphis patterns, playful geometry, ironic type, and colorful postmodern web composition." },
        { title: "Awwwards - Colorful Websites", url: "https://www.awwwards.com/websites/colorful/", note: "Closest gallery reference for postmodern-adjacent color, expressive geometry, layered campaign pages, and playful digital rhythm." },
        { title: "Dribbble - Postmodern Website", url: "https://dribbble.com/search/postmodern%20website", note: "UI reference for Memphis cards, mismatched shapes, colorful product modules, and ironic interface treatments." },
      ],
      representativeTraits: ["Memphis geometry", "Playful mixed forms", "Ironic color", "Product portal", "Graphic black outlines"],
      avoidTraits: ["Generic colorful UI", "Dense maximalist fashion pattern", "Raw brutalist severity"],
      tokenIntent:
        "Use bright Memphis colors, geometric cards, hard outlines, playful shapes, and product modules so the style reads as postmodernism.",
    },
  },
  retro: {
    summary: "레트로는 특정 시대의 색, 배지, 둥근 그래픽, 아날로그 미디어 감각을 현대 웹 커머스나 콘텐츠 화면으로 다시 구성하는 스타일입니다.",
    description:
      "레트로는 과거를 그대로 복사하기보다 현재 웹 구조 안에 향수를 얹는 방식입니다. Poolside FM, Radiooooo, Web Design Museum처럼 둥근 배지, 따뜻한 색, 음악/상품 카드, 오래된 인터페이스 느낌이 실제 탐색 경험으로 이어져야 합니다.",
    visualFeatures: ["둥근 배지와 굵은 색면이 향수를 만듭니다.", "상품 카드나 미디어 카드가 아날로그 포스터처럼 보입니다.", "따뜻한 오렌지, 청록, 크림 조합이 첫인상을 잡습니다."],
    colorPalette: ["크림과 머스터드를 기본으로 둡니다.", "레드 오렌지와 청록을 대표 포인트로 씁니다.", "갈색 텍스트로 인쇄물 같은 온도를 만듭니다."],
    typography: ["둥글고 굵은 제목이 레트로 분위기를 만듭니다.", "짧은 라벨과 배지 텍스트가 잘 어울립니다.", "본문은 현대적인 가독성을 유지해야 합니다."],
    layoutTraits: ["미디어 플레이어, 컬렉션 카드, 상품 배지가 한 화면에 배치됩니다.", "곡선과 원형 요소를 사용하되 탐색 구조는 단순하게 둡니다.", "모바일에서는 큰 배지와 주요 카드가 먼저 보여야 합니다."],
    useCases: ["음악 서비스", "카페/식음료", "굿즈 커머스", "브랜드 캠페인"],
    goodFor: ["친근한 향수를 주고 싶은 브랜드", "문화/음악/식음료 콘텐츠", "과거 감성을 현대적으로 판매하는 커머스", "밝고 쉽게 접근되는 이벤트 페이지"],
    cautions: ["70s, 80s, 90s처럼 특정 시대 스타일과 구분해야 합니다.", "낡은 UI를 그대로 쓰면 사용성이 떨어집니다.", "향수 요소보다 실제 콘텐츠 카드가 중심이어야 합니다."],
    imagePrompt:
      "A retro ecommerce website reference image with warm cream and mustard background, rounded badges, teal and red accents, analog media cards, nostalgic product modules, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Poolside FM", url: "https://poolside.fm", note: "Retro web reference for nostalgia, playful media interface, warm color, and intentionally analog browsing cues." },
        { title: "Radiooooo", url: "https://radiooooo.com", note: "Music experience reference for time-travel navigation, nostalgic color, map-like interaction, and retro audio discovery." },
        { title: "Web Design Museum", url: "https://www.webdesignmuseum.org/", note: "Archive reference for historical web aesthetics, period UI patterns, typography, palettes, and layout conventions." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Retro Website Design", url: "https://www.pinterest.com/search/pins/?q=retro%20website%20design", note: "Moodboard reference for nostalgic palettes, rounded badges, vintage-inspired web graphics, and playful commerce layouts." },
        { title: "Awwwards - Retro Websites", url: "https://www.awwwards.com/websites/retro/", note: "Gallery reference for modern retro web executions, nostalgic imagery, period color, and contemporary interaction polish." },
        { title: "Dribbble - Retro Website", url: "https://dribbble.com/search/retro%20website", note: "UI reference for retro landing pages, badge systems, diner-style cards, and nostalgic product screens." },
      ],
      representativeTraits: ["Warm nostalgic palette", "Rounded badges", "Analog media cards", "Simple commerce modules", "Friendly retro rhythm"],
      avoidTraits: ["Specific 70s/80s/90s overcoding", "Aged vintage paper", "Y2K gloss"],
      tokenIntent:
        "Use warm retro colors, rounded badges, medium borders, product/media cards, and friendly spacing so the style reads as general retro.",
    },
  },
  vintage: {
    summary: "빈티지는 오래된 인쇄물, 헤리티지 배지, 종이 질감, 클래식 카탈로그 구조를 활용해 시간의 깊이를 보여주는 스타일입니다.",
    description:
      "빈티지는 레트로보다 더 오래되고 물성 있는 쪽입니다. Filson, Levi's, Web Design Museum처럼 헤리티지 제품 카드, 카탈로그 표, 잉크색 텍스트, 배지형 인증 요소가 실제 쇼핑/아카이브 화면으로 구성되어야 합니다.",
    visualFeatures: ["종이색 배경과 잉크 같은 텍스트가 오래된 느낌을 만듭니다.", "헤리티지 배지와 카탈로그 행이 브랜드 신뢰를 줍니다.", "사진 영역은 인쇄물처럼 단정한 프레임 안에 놓입니다."],
    colorPalette: ["베이지, 크림, 브라운을 기본으로 둡니다.", "딥 레드와 올리브 그린을 오래된 인쇄 포인트로 씁니다.", "새하얀 흰색보다 바랜 종이색이 잘 맞습니다."],
    typography: ["세리프 또는 세리프 느낌의 제목이 어울립니다.", "카탈로그 번호, 연도, 원산지 같은 작은 정보가 중요합니다.", "본문은 오래된 안내문처럼 안정적으로 읽혀야 합니다."],
    layoutTraits: ["상품 카탈로그, 헤리티지 설명, 아카이브 리스트가 잘 맞습니다.", "장식보다 배지와 라벨이 브랜드의 시간감을 만듭니다.", "모바일에서는 카탈로그 표를 카드형으로 바꿔 읽기 쉽게 둡니다."],
    useCases: ["헤리티지 브랜드", "빈티지 숍", "아카이브 페이지", "클래식 제품 커머스"],
    goodFor: ["브랜드의 역사와 신뢰를 강조할 때", "제품 원산지와 재료 설명이 중요한 커머스", "아카이브 분위기의 콘텐츠", "새 제품을 오래된 가치로 보이게 할 때"],
    cautions: ["낡은 질감만 넣으면 실제 웹 구조가 약해집니다.", "Retro보다 더 차분하고 인쇄물에 가까워야 합니다.", "색 대비가 낮아져 읽기 어려워지지 않게 합니다."],
    imagePrompt:
      "A vintage heritage catalog website reference image with aged paper background, ink brown serif headings, product archive rows, heritage badges, muted red olive accents, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Filson", url: "https://www.filson.com", note: "Heritage retail reference for rugged catalog rhythm, aged neutrals, serif accents, and practical vintage product storytelling." },
        { title: "Levi's", url: "https://www.levi.com", note: "Heritage apparel reference for archival denim tone, classic commerce modules, and vintage Americana brand cues." },
        { title: "Web Design Museum", url: "https://www.webdesignmuseum.org/", note: "Archive reference for older web layouts, historic graphics, period typography, and document-like page structure." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Vintage Website Design", url: "https://www.pinterest.com/search/pins/?q=vintage%20website%20design", note: "Moodboard reference for paper texture, muted ink, heritage badges, classic catalog grids, and aged color systems." },
        { title: "Awwwards - Retro Websites", url: "https://www.awwwards.com/websites/retro/", note: "Closest gallery reference for vintage and retro web executions, heritage color, editorial pacing, and archival atmosphere." },
        { title: "Dribbble - Vintage Website", url: "https://dribbble.com/search/vintage%20website", note: "UI reference for vintage catalogs, badges, serif headings, paper-like cards, and heritage product pages." },
      ],
      representativeTraits: ["Aged paper", "Heritage catalog", "Muted ink palette", "Archive rows", "Vintage badges"],
      avoidTraits: ["Bright general retro", "70s psychedelic warmth", "Luxury minimal polish"],
      tokenIntent:
        "Use aged neutrals, serif display type, paper-like grain, catalog rows, and muted heritage accents so the style reads as vintage.",
    },
  },
  "seventies-retro": {
    summary: "70년대 레트로는 따뜻한 오렌지, 아보카도 그린, 둥근 곡선, 그루비한 배지를 사용해 편안하고 낙관적인 웹 무드를 만듭니다.",
    description:
      "70년대 레트로는 일반 Retro보다 시대 신호가 더 분명해야 합니다. Houseplant, Rolling Stone, Web Design Museum 같은 레퍼런스처럼 둥근 프로모션 카드, 물결형 섹션, 따뜻한 제품/이벤트 배지가 실제 브랜드 랜딩으로 작동해야 합니다.",
    visualFeatures: ["오렌지와 머스터드가 화면의 기본 온도를 만듭니다.", "곡선, 물결, 둥근 배지가 70년대 감각을 드러냅니다.", "상품이나 이벤트 카드가 느긋한 라이프스타일처럼 보입니다."],
    colorPalette: ["머스터드, 오렌지, 크림을 넓게 사용합니다.", "아보카도 그린과 먼지 낀 핑크를 보조색으로 둡니다.", "텍스트는 짙은 브라운으로 인쇄물 같은 안정감을 줍니다."],
    typography: ["둥글고 굵은 제목이 잘 어울립니다.", "라벨과 버튼은 부드러운 알약 형태와 맞춥니다.", "본문은 너무 복고적이지 않게 읽기 쉬운 산세리프를 유지합니다."],
    layoutTraits: ["히어로, 컬렉션, 이벤트/상품 카드가 느긋하게 이어집니다.", "직선 그리드 안에 곡선 배지를 섞어 시대감을 냅니다.", "모바일에서는 큰 곡선 장식보다 카드 내용을 우선합니다."],
    useCases: ["라이프스타일 브랜드", "음악/이벤트", "식음료", "굿즈 커머스"],
    goodFor: ["따뜻하고 즐거운 브랜드 첫인상", "음악/카페/홈 제품 캠페인", "너무 세련된 느낌보다 인간적인 분위기", "계절 프로모션"],
    cautions: ["Retro와 구분하려면 70s 색과 곡선을 분명히 해야 합니다.", "패턴이 과하면 Maximalism으로 흐릅니다.", "곡선 장식이 CTA를 가리지 않게 해야 합니다."],
    imagePrompt:
      "A 1970s retro lifestyle website reference image with mustard and orange background, avocado green accents, groovy rounded badges, wavy product cards, warm campaign layout, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Houseplant", url: "https://www.houseplant.com", note: "Lifestyle commerce reference for warm 70s color, rounded typography, product character, and relaxed editorial modules." },
        { title: "Rolling Stone", url: "https://www.rollingstone.com", note: "Media reference for 70s cultural heritage, strong editorial identity, music nostalgia, and bold magazine hierarchy." },
        { title: "Web Design Museum", url: "https://www.webdesignmuseum.org/", note: "Archive reference for period web interpretation, old interface rhythm, nostalgic graphics, and historical color cues." },
      ],
      referenceGalleries: [
        { title: "Pinterest - 70s Retro Website Design", url: "https://www.pinterest.com/search/pins/?q=70s%20retro%20website%20design", note: "Moodboard reference for groovy curves, warm orange and avocado palettes, psychedelic patterns, and relaxed retro layouts." },
        { title: "Awwwards - Retro Websites", url: "https://www.awwwards.com/websites/retro/", note: "Gallery reference for contemporary retro sites that reinterpret 70s color, soft shapes, and nostalgic campaign structure." },
        { title: "Dribbble - 70s Website Design", url: "https://dribbble.com/search/70s%20website%20design", note: "UI reference for 70s landing pages, groovy badges, wavy modules, and warm product cards." },
      ],
      representativeTraits: ["Warm orange palette", "Groovy curves", "Rounded promo cards", "Lifestyle nostalgia", "Relaxed campaign rhythm"],
      avoidTraits: ["Generic retro badges", "80s neon grid", "Vintage paper archive"],
      tokenIntent:
        "Use warm 70s colors, rounded shapes, soft badges, normal spacing, and lifestyle commerce cards so the style reads as seventies retro.",
    },
  },
  "eighties-retro": {
    summary: "80년대 레트로는 어두운 배경, 네온 컬러, 신스웨이브 그리드, 아케이드식 패널을 사용해 전자적인 향수를 만듭니다.",
    description:
      "80년대 레트로는 밝은 Retro보다 더 야간적이고 전자적입니다. Poolside FM, Cyberpunk 2077, Windows 93처럼 네온 경계, 미디어 콘솔, 아케이드 버튼, 수평 그리드가 실제 인터페이스 안에서 보여야 합니다.",
    visualFeatures: ["짙은 남색 배경 위에 핑크와 사이언 네온이 떠오릅니다.", "그리드, 콘솔, 미디어 패널이 신스웨이브 분위기를 만듭니다.", "버튼과 상태값은 아케이드 UI처럼 명확합니다."],
    colorPalette: ["다크 네이비와 보라빛 배경을 사용합니다.", "마젠타, 사이언, 전기 노랑을 고대비 포인트로 씁니다.", "흰색 텍스트를 과하게 쓰지 않고 핵심 정보에 집중합니다."],
    typography: ["모노스페이스나 각진 산세리프가 잘 맞습니다.", "제목은 크게 쓰되 네온 효과보다 가독성을 우선합니다.", "라벨은 짧고 콘솔처럼 기능적으로 둡니다."],
    layoutTraits: ["미디어 콘솔, 이벤트 티켓, 게임/음악 패널에 어울립니다.", "어두운 화면 안에서 카드 경계를 빛으로 나눕니다.", "모바일에서는 네온 장식보다 컨트롤 크기를 우선합니다."],
    useCases: ["음악 이벤트", "게임 캠페인", "아케이드 바", "레트로 테크 제품"],
    goodFor: ["밤, 음악, 전자적 에너지를 강조할 때", "신스웨이브나 아케이드 코드가 필요한 브랜드", "짧고 강한 이벤트 랜딩", "다크 테마 기반 프로모션"],
    cautions: ["Cyberpunk와 구분하려면 도시/디스토피아보다 80s 미디어 콘솔을 강조합니다.", "네온 대비가 과하면 눈이 피로합니다.", "텍스트가 어두운 배경에서 흐려지지 않게 합니다."],
    imagePrompt:
      "An 1980s retro synthwave website reference image with dark navy stage, neon magenta cyan grid, arcade control panels, media console widgets, electric yellow accents, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Poolside FM", url: "https://poolside.fm", note: "Interface reference for 80s media nostalgia, lo-fi desktop cues, bright controls, and playful analog-digital interaction." },
        { title: "Cyberpunk 2077 Official", url: "https://www.cyberpunk.net", note: "Commercial reference for neon futurist palettes, dark interface panels, sci-fi campaign hierarchy, and high-contrast digital drama." },
        { title: "Windows 93", url: "https://windows93.net", note: "Desktop-web reference for retro OS windows, pixel-era controls, playful app framing, and 80s/90s digital nostalgia." },
      ],
      referenceGalleries: [
        { title: "Pinterest - 80s Retro Website Design", url: "https://www.pinterest.com/search/pins/?q=80s%20retro%20website%20design", note: "Moodboard reference for neon grids, synthwave gradients, VHS graphics, and arcade-style web surfaces." },
        { title: "Awwwards - Retro Websites", url: "https://www.awwwards.com/websites/retro/", note: "Gallery reference for retro-futurist and 80s-inspired sites, neon motion, dark stages, and nostalgic interaction cues." },
        { title: "Dribbble - Synthwave Website", url: "https://dribbble.com/search/synthwave%20website", note: "UI reference for synthwave dashboards, neon panels, arcade buttons, and dark retro digital layouts." },
      ],
      representativeTraits: ["Neon synth grid", "Dark media console", "Arcade controls", "Magenta cyan contrast", "Electric event energy"],
      avoidTraits: ["General warm retro", "Glitch corruption", "Y2K glossy plastic"],
      tokenIntent:
        "Use dark backgrounds, neon accents, mono labels, glow shadows, and console panels so the style reads as eighties retro.",
    },
  },
  "nineties-graphic": {
    summary: "90년대 그래픽은 초기 웹, 데스크톱 창, 스티커 같은 그래픽, 강한 패턴을 섞어 활기 있는 디지털 향수를 만듭니다.",
    description:
      "90년대 그래픽은 Y2K보다 덜 광택 있고 더 거칠고 그래픽합니다. Space Jam 1996, Windows 93, Web Design Museum처럼 창 프레임, 굵은 스티커, 패턴 배경, 이미지 중심 네비게이션이 실제 웹 페이지처럼 보여야 합니다.",
    visualFeatures: ["창 프레임과 스티커형 라벨이 초기 웹 느낌을 만듭니다.", "청록, 보라, 형광 노랑 같은 색이 강하게 충돌합니다.", "패턴과 작은 그래픽 조각이 배경과 카드에 섞입니다."],
    colorPalette: ["청록과 노랑을 넓은 배경/표면에 사용합니다.", "보라, 오렌지, 형광 라임을 스티커 포인트로 씁니다.", "검정 선으로 요소를 명확히 묶습니다."],
    typography: ["굵고 압축되지 않은 산세리프가 잘 맞습니다.", "작은 윈도우 타이틀과 버튼 라벨이 시대감을 줍니다.", "본문은 짧고 그래픽 블록 안에 배치합니다."],
    layoutTraits: ["데스크톱 창, 메뉴 바, 스티커 카드, 링크 그리드가 함께 보입니다.", "비정형적이지만 실제 클릭 가능한 화면처럼 구성합니다.", "모바일에서는 창을 겹치기보다 세로 카드로 정리합니다."],
    useCases: ["문화 캠페인", "음악/패션 드롭", "청소년 브랜드", "레트로 디지털 이벤트"],
    goodFor: ["밝고 거친 디지털 향수", "초기 웹/데스크톱 감성을 쓰는 브랜드", "스티커와 패턴 자산이 많은 캠페인", "Y2K보다 더 그래픽하고 덜 광택 있는 분위기"],
    cautions: ["Space Jam식 초기 웹을 그대로 복제하면 사용성이 떨어집니다.", "Y2K와 구분하려면 크롬 광택보다 창/스티커/패턴을 강조합니다.", "패턴이 텍스트를 방해하지 않게 합니다."],
    imagePrompt:
      "A 1990s graphic website reference image with teal background, desktop window cards, sticker labels, loud patterns, purple orange neon accents, early web navigation, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Space Jam 1996", url: "https://www.spacejam.com/1996/", note: "Historic web reference for 90s graphics, tiled backgrounds, image-heavy navigation, and early-web composition." },
        { title: "Windows 93", url: "https://windows93.net", note: "Retro desktop reference for playful window chrome, pixel controls, chaotic app surfaces, and 90s computing nostalgia." },
        { title: "Web Design Museum", url: "https://www.webdesignmuseum.org/", note: "Archive reference for historical 90s web layouts, visual tropes, browser-era UI, and graphic density." },
      ],
      referenceGalleries: [
        { title: "Pinterest - 90s Graphic Website Design", url: "https://www.pinterest.com/search/pins/?q=90s%20graphic%20website%20design", note: "Moodboard reference for loud patterns, early digital graphics, sticker-like elements, and zine-style web layouts." },
        { title: "Awwwards - Retro Websites", url: "https://www.awwwards.com/websites/retro/", note: "Gallery reference for modern retro sites that reinterpret 90s web energy, collage density, and graphic nostalgia." },
        { title: "Dribbble - 90s Website Design", url: "https://dribbble.com/search/90s%20website%20design", note: "UI reference for 90s landing pages, desktop windows, bold stickers, and high-energy graphic modules." },
      ],
      representativeTraits: ["Desktop window cards", "Sticker graphics", "Loud pattern", "Early web navigation", "Teal-purple energy"],
      avoidTraits: ["Y2K chrome gloss", "80s neon synth grid", "Vintage paper catalog"],
      tokenIntent:
        "Use loud 90s colors, thick window borders, sticker labels, compact cards, and patterned blocks so the style reads as nineties graphic.",
    },
  },
  y2k: {
    summary: "Y2K는 크롬 광택, 젤리 같은 색, 버블 패널, 초기 인터넷의 미래 낙관주의를 결합한 2000년대 초반 웹 스타일입니다.",
    description:
      "Y2K는 90년대 그래픽보다 더 매끈하고 미래적인 광택이 중요합니다. Web Design Museum의 Y2K 아카이브, Blingee, Windows 93처럼 반짝이는 버튼, 둥근 포털 카드, 파스텔 사이버 색, 장식적 위젯이 실제 웹 포털로 구성되어야 합니다.",
    visualFeatures: ["버블형 패널과 글로시한 표면이 핵심 신호입니다.", "파스텔 블루, 핑크, 라임이 밝은 미래감을 만듭니다.", "포털, 프로필, 위젯 같은 작은 모듈이 화면을 채웁니다."],
    colorPalette: ["아이스 블루와 흰색을 밝은 기본으로 둡니다.", "핑크와 라임을 장식/상태 포인트로 씁니다.", "테두리는 회청색으로 살짝 기술적인 느낌을 줍니다."],
    typography: ["굵고 둥근 제목이 잘 어울립니다.", "작은 위젯 라벨과 버튼 텍스트는 또렷해야 합니다.", "긴 본문보다 짧은 포털 메뉴와 상태 텍스트가 효과적입니다."],
    layoutTraits: ["포털 대시보드, 프로필 카드, 위젯, 배너가 함께 보입니다.", "카드는 둥글고 반짝이는 표면처럼 처리합니다.", "모바일에서는 위젯을 2열 이하로 줄여 가독성을 지킵니다."],
    useCases: ["음악/패션 캠페인", "커뮤니티 포털", "레트로 테크 브랜드", "Z세대 이벤트"],
    goodFor: ["초기 인터넷과 미래 낙관주의를 함께 보여줄 때", "밝고 장식적인 디지털 브랜드", "작은 위젯이 많은 랜딩", "Y2K 패션/음악/콘텐츠 캠페인"],
    cautions: ["90s Graphic과 구분하려면 스티커보다 광택/버블/포털을 강조합니다.", "반짝임이 과하면 주요 정보가 묻힙니다.", "낮은 대비의 파스텔 텍스트는 피해야 합니다."],
    imagePrompt:
      "A Y2K web portal reference image with glossy bubble panels, ice blue background, pink and lime accents, chrome-like buttons, early 2000s widgets, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Web Design Museum - Y2K Aesthetic", url: "https://www.webdesignmuseum.org/exhibitions/y2k-aesthetic-in-web-design", note: "Archive reference for early-2000s web design, chrome effects, optimistic digital color, and period interface conventions." },
        { title: "Blingee", url: "https://www.blingee.com", note: "Living web reference for glitter graphics, decorative internet nostalgia, shiny surfaces, and participatory Y2K visual culture." },
        { title: "Windows 93", url: "https://windows93.net", note: "Retro desktop reference for playful legacy UI, pixel controls, layered windows, and early web nostalgia." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Y2K Website Design Inspiration", url: "https://www.pinterest.com/ideas/y2k-website-design-inspiration/893524089634/", note: "Moodboard reference for chrome, gradients, bubble type, glitter, plastic surfaces, and early-2000s web optimism." },
        { title: "Awwwards - Y2K Websites", url: "https://www.awwwards.com/websites/y2k/", note: "Gallery reference for contemporary Y2K web executions, glossy gradients, nostalgic interfaces, and cyber-pop visual systems." },
        { title: "Dribbble - Y2K Website", url: "https://dribbble.com/search/y2k%20website", note: "UI reference for Y2K landing pages, shiny cards, bubble navigation, chrome-like widgets, and playful web portals." },
      ],
      representativeTraits: ["Glossy bubble panels", "Early web portal", "Pastel cyber color", "Chrome buttons", "Widget density"],
      avoidTraits: ["90s sticker windows", "80s neon darkness", "General retro warmth"],
      tokenIntent:
        "Use glossy rounded panels, pastel cyber accents, gradient effect, medium spacing, and widget-like portal cards so the style reads as Y2K.",
    },
  },
  "retro-futurism": {
    summary: "레트로 퓨처리즘은 과거가 상상한 미래를 Space Age 여행 광고, 원자/별burst 모티프, 낙관적인 기술 색감으로 재구성하는 스타일입니다.",
    description:
      "레트로 퓨처리즘은 미래 콘솔을 어둡게 그리는 것보다, 1950-60년대 사람들이 꿈꾼 밝은 미래를 현대 웹으로 옮기는 쪽에 가깝습니다. NASA JPL의 Visions of the Future, Googie/Atomic Age, Paleofuture 아카이브처럼 행성 여행 포스터, 부메랑 형태, 원자 궤도, 별burst, 티켓형 일정표가 한 화면에서 실제 랜딩 페이지처럼 작동해야 합니다.",
    visualFeatures: ["Space Age 여행 포스터처럼 큰 목적지 패널과 짧은 광고 문구가 중심이 됩니다.", "별burst, 원자 궤도, 부메랑, 플라잉소서 같은 미드센추리 미래 모티프가 식별자가 됩니다.", "코랄, 터쿼이즈, 크림, 골드, 네이비가 낙관적인 과거 미래 팔레트를 만듭니다."],
    colorPalette: ["크림과 옅은 골드를 밝은 포스터 배경처럼 사용합니다.", "코랄 오렌지와 터쿼이즈를 목적지, CTA, 궤도 표시색으로 씁니다.", "네이비는 밤하늘보다 인쇄 잉크와 정보 구조를 잡는 색으로 제한합니다."],
    typography: ["굵고 둥근 미드센추리 산세리프 느낌의 제목이 잘 맞습니다.", "시간표와 좌석 정보는 모노스페이스보다 여행 티켓 라벨처럼 짧고 단정하게 둡니다.", "큰 포스터 헤드라인과 작은 일정표 라벨의 대비가 중요합니다."],
    layoutTraits: ["행성 여행 랜딩, 엑스포/전시 페이지, 미래형 제품 티저에 어울립니다.", "상단은 여행 광고, 하단/측면은 실제 예약 카드와 목적지 리스트로 구성합니다.", "모바일에서는 포스터, 목적지 카드, 출발 CTA 순서가 명확해야 합니다."],
    useCases: ["테크 캠페인", "전시 랜딩", "게임/엔터테인먼트", "미래형 제품 티저"],
    goodFor: ["미래적이지만 따뜻하고 낙관적인 브랜드", "우주/교통/기술 은유가 필요한 랜딩", "아카이브와 현대 서비스를 연결하는 프로젝트", "레트로와 미래를 함께 보여줘야 하는 캠페인"],
    cautions: ["Cyberpunk처럼 어둡고 디스토피아적으로 가면 방향이 달라집니다.", "일반 Retro와 구분하려면 원자/우주/미래 교통 모티프가 보여야 합니다.", "장식적 행성만 있으면 실제 웹 화면처럼 보이지 않으므로 예약/목적지/CTA 모듈이 필요합니다."],
    imagePrompt:
      "A retro futurism space travel website reference image with cream poster background, coral and turquoise Space Age palette, atomic starburst motifs, boomerang shapes, planet travel cards, ticket-style schedule modules, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "NASA JPL - Visions of the Future", url: "https://www.jpl.nasa.gov/galleries/visions-of-the-future/", note: "Official space-tourism poster reference for retro-future travel advertising, WPA-inspired composition, optimistic destinations, and scientific imagination." },
        { title: "Retro Futurism", url: "https://retro-futurism.com/", note: "Archive reference for past visions of the future, space-age graphics, optimistic technology motifs, and period futurist imagery." },
        { title: "Paleofuture", url: "https://paleofuture.com/", note: "Cultural archive reference for historical future speculation, mid-century technology imagery, and optimistic space-age narrative." },
        { title: "Web Design Museum", url: "https://www.webdesignmuseum.org/", note: "Archive reference for historical digital aesthetics, period UI systems, and older web interpretations of future-facing design." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Retro Futurism Website Design", url: "https://www.pinterest.com/search/pins/?q=retro%20futurism%20website%20design", note: "Moodboard reference for space-age curves, chrome panels, pastel planets, vintage technology, and optimistic future nostalgia." },
        { title: "Awwwards - Retro Websites", url: "https://www.awwwards.com/websites/retro/", note: "Closest gallery reference for retro-futurist web execution, nostalgic future visuals, playful motion, and modern polish." },
        { title: "Dribbble - Retro Futurism Website", url: "https://dribbble.com/search/retro%20futurism%20website", note: "UI reference for space-age landing pages, rocket dashboards, rounded control panels, and future-nostalgia product screens." },
      ],
      representativeTraits: ["Space Age travel poster", "Atomic starburst motifs", "Boomerang geometry", "Optimistic coral-turquoise palette", "Ticket-style destination CTA"],
      avoidTraits: ["Cyberpunk dystopia", "Generic retro badges", "Y2K plastic gloss"],
      tokenIntent:
        "Use bright cream poster surfaces, coral and turquoise accents, navy ink, rounded ticket cards, atomic motifs, boomerang geometry, and travel-bureau modules so the style reads as retro futurism instead of dark sci-fi.",
    },
  },
};

function hashSlug(slug: string) {
  return slug.split("").reduce((hash, char) => hash + char.charCodeAt(0), 0);
}

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

const styleTokenOverrides: Record<string, DeepPartial<Omit<StyleTokens, "color">>> = {
  // Representative styles — more will be added in Task 5
  "minimalism": {
    typography: { weightDisplay: 500, weightBody: 400, tracking: "0em", headingScale: 0.96 },
    shape: { radius: "2px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.5rem", padScale: 1.45 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "left", navStyle: "minimal", alignment: "left" },
  },
  "modernism": {
    typography: { weightDisplay: 700, weightBody: 500, tracking: "-0.02em", headingScale: 1.12 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.85rem", padScale: 1.05 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "split", navStyle: "underline", alignment: "left" },
  },
  "warm-minimal": {
    typography: { weightDisplay: 500, weightBody: 400, tracking: "0em", headingScale: 0.94 },
    shape: { radius: "18px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.45rem", padScale: 1.5 },
    decoration: { shadow: "0 18px 44px rgb(var(--st-text-rgb) / 0.08)", effect: "none" },
    layout: { heroVariant: "left", navStyle: "minimal", alignment: "left" },
  },
  "international-style": {
    typography: { weightDisplay: 600, weightBody: 400, tracking: "0em", headingScale: 0.98 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "split", navStyle: "underline", alignment: "left" },
  },
  "scandinavian": {
    typography: { weightDisplay: 600, weightBody: 400, tracking: "0em", headingScale: 0.98 },
    shape: { radius: "14px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.25rem", padScale: 1.28 },
    decoration: { shadow: "0 12px 28px rgb(var(--st-text-rgb) / 0.08)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "japandi": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 400, weightBody: 400, tracking: "0em", headingScale: 0.9 },
    shape: { radius: "6px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.7rem", padScale: 1.55 },
    decoration: { shadow: "none", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "soft-minimal": {
    typography: { weightDisplay: 500, weightBody: 400, tracking: "0em", headingScale: 0.92 },
    shape: { radius: "20px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.5rem", padScale: 1.45 },
    decoration: { shadow: "0 18px 40px rgb(var(--st-text-rgb) / 0.06)", effect: "none" },
    layout: { heroVariant: "left", navStyle: "minimal", alignment: "left" },
  },
  "high-end-minimal": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 400, weightBody: 300, tracking: "0em", headingScale: 0.88 },
    shape: { radius: "0px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "2rem", padScale: 1.75 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "brutalism": {
    typography: { weightDisplay: 900, weightBody: 600, tracking: "0em", headingScale: 1.22 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "4px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.55rem", padScale: 0.82 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "left", navStyle: "underline", alignment: "left" },
  },
  "new-brutalism": {
    typography: { weightDisplay: 900, weightBody: 650, tracking: "0em", headingScale: 1.18 },
    shape: { radius: "6px", radiusPill: "6px", borderWidth: "4px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.55rem", padScale: 0.88 },
    decoration: { shadow: "8px 8px 0 var(--st-accent)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "anti-design": {
    typography: { weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.14 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "3px", borderStyle: "dashed" },
    space: { density: "tight", gap: "0.45rem", padScale: 0.78 },
    decoration: { shadow: "5px -5px 0 var(--st-accent-2)", effect: "grain" },
    layout: { heroVariant: "left", navStyle: "boxed", alignment: "left" },
  },
  "maximalism": {
    typography: { weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.12 },
    shape: { radius: "4px", radiusPill: "4px", borderWidth: "2px", borderStyle: "double" },
    space: { density: "tight", gap: "0.55rem", padScale: 0.92 },
    decoration: { shadow: "4px 4px 0 var(--st-accent), -4px -4px 0 var(--st-accent-2)", effect: "grain" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "left" },
  },
  "glitch-art": {
    typography: { displayFont: '"SFMono-Regular", monospace', bodyFont: '"SFMono-Regular", monospace', weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.16 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "2px", borderStyle: "dashed" },
    space: { density: "tight", gap: "0.45rem", padScale: 0.82 },
    decoration: { shadow: "3px 0 0 var(--st-accent), -3px 0 0 var(--st-accent-2)", effect: "glitch" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  deconstructivism: {
    typography: { weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.1 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.8rem", padScale: 0.95 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "split", navStyle: "underline", alignment: "left" },
  },
  "avant-garde": {
    typography: { weightDisplay: 800, weightBody: 450, tracking: "0em", headingScale: 1.12 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "1rem", padScale: 1.0 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "left", navStyle: "underline", alignment: "left" },
  },
  postmodernism: {
    typography: { weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.05 },
    shape: { radius: "10px", radiusPill: "9999px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.8rem", padScale: 1.0 },
    decoration: { shadow: "5px 5px 0 var(--st-accent-2)", effect: "none" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "left" },
  },
  retro: {
    typography: { weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.02 },
    shape: { radius: "24px", radiusPill: "9999px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "1rem", padScale: 1.05 },
    decoration: { shadow: "4px 4px 0 var(--st-accent-2)", effect: "none" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "center" },
  },
  vintage: {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 600, weightBody: 400, tracking: "0em", headingScale: 0.96 },
    shape: { radius: "2px", radiusPill: "2px", borderWidth: "1px", borderStyle: "double" },
    space: { density: "airy", gap: "1.25rem", padScale: 1.2 },
    decoration: { shadow: "none", effect: "grain" },
    layout: { heroVariant: "left", navStyle: "underline", alignment: "left" },
  },
  "seventies-retro": {
    typography: { weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.04 },
    shape: { radius: "28px", radiusPill: "9999px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "1rem", padScale: 1.08 },
    decoration: { shadow: "4px 6px 0 var(--st-accent-3)", effect: "none" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "center" },
  },
  "eighties-retro": {
    typography: { displayFont: '"SFMono-Regular", monospace', bodyFont: '"SFMono-Regular", monospace', weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.08 },
    shape: { radius: "4px", radiusPill: "4px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.85rem", padScale: 0.98 },
    decoration: { shadow: "0 0 22px rgb(var(--st-accent-rgb) / 0.45)", effect: "glow" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "nineties-graphic": {
    typography: { weightDisplay: 900, weightBody: 600, tracking: "0em", headingScale: 1.1 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "3px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.6rem", padScale: 0.9 },
    decoration: { shadow: "5px 5px 0 var(--st-accent-3)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "y2k": {
    typography: { weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.08 },
    shape: { radius: "18px", radiusPill: "9999px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.8rem", padScale: 1.0 },
    decoration: { shadow: "0 14px 26px rgb(var(--st-accent-rgb) / 0.24)", effect: "gradient" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "left" },
  },
  "retro-futurism": {
    typography: { displayFont: '"Trebuchet MS", "Arial", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.04 },
    shape: { radius: "22px", radiusPill: "9999px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "1rem", padScale: 1.1 },
    decoration: { shadow: "6px 6px 0 var(--st-accent-3)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "cyberpunk": {
    typography: { bodyFont: '"SFMono-Regular", monospace', tracking: "0.02em" },
    shape: { radius: "2px", borderWidth: "1px" },
    decoration: { shadow: "0 0 24px rgb(var(--st-accent-rgb) / 0.6)", effect: "glow" },
  },
  "neon-noir": {
    typography: { bodyFont: '"SFMono-Regular", monospace', weightDisplay: 700, tracking: "0.04em", headingScale: 1.08 },
    shape: { radius: "2px", radiusPill: "2px", borderWidth: "1px" },
    space: { density: "tight", gap: "0.55rem", padScale: 0.9 },
    decoration: { shadow: "0 0 28px rgb(var(--st-accent-rgb) / 0.7)", effect: "scanline" },
  },
  "kawaii": {
    shape: { radius: "20px", radiusPill: "9999px", borderWidth: "2px" },
    decoration: { shadow: "4px 4px 0 var(--st-accent)", effect: "none" },
  },
  "luxury": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 300, weightBody: 300, tracking: "0.12em", headingScale: 0.85 },
    shape: { radius: "0px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "2rem", padScale: 1.8 },
    decoration: { shadow: "none", effect: "none" },
  },
  "old-money": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 400, weightBody: 300, tracking: "0.06em", headingScale: 0.92 },
    shape: { radius: "2px", radiusPill: "2px", borderWidth: "1px" },
    space: { density: "airy", gap: "1.8rem", padScale: 1.65 },
    decoration: { shadow: "0 14px 36px rgb(var(--st-text-rgb) / 0.10)", effect: "none" },
  },
  "organic-design": {
    shape: { radius: "12px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.25rem", padScale: 1.3 },
    decoration: { shadow: "none", effect: "grain" },
  },
  "wabi-sabi": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 400, tracking: "0.02em", headingScale: 0.9 },
    shape: { radius: "6px", radiusPill: "12px", borderWidth: "1px", borderStyle: "dashed" },
    space: { density: "airy", gap: "1.6rem", padScale: 1.55 },
    decoration: { shadow: "none", effect: "grain" },
  },
  "streetwear": {
    typography: { weightDisplay: 900, tracking: "-0.04em", headingScale: 1.2 },
    shape: { radius: "0px", borderWidth: "4px" },
    space: { density: "tight", gap: "0.4rem", padScale: 0.8 },
    decoration: { shadow: "5px 5px 0 var(--st-accent)", effect: "none" },
  },
  "dopamine-design": {
    typography: { weightDisplay: 800, weightBody: 500, tracking: "-0.03em", headingScale: 1.18 },
    shape: { radius: "24px", radiusPill: "9999px", borderWidth: "2px" },
    space: { density: "normal", gap: "0.8rem", padScale: 1.05 },
    decoration: { shadow: "5px 5px 0 var(--st-accent-2)", effect: "gradient" },
  },
  "graffiti": {
    typography: { weightDisplay: 900, weightBody: 600, tracking: "-0.05em", headingScale: 1.28 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "3px", borderStyle: "dashed" },
    space: { density: "tight", gap: "0.45rem", padScale: 0.85 },
    decoration: { shadow: "6px 4px 0 var(--st-accent)", effect: "grain" },
  },
  "editorial-design": {
    typography: { weightDisplay: 800, tracking: "-0.04em", headingScale: 1.2 },
    shape: { radius: "0px", borderWidth: "2px" },
    space: { density: "normal", gap: "1rem", padScale: 1.0 },
    decoration: { shadow: "none", effect: "none" },
  },
  "posterism": {
    typography: { weightDisplay: 900, weightBody: 500, tracking: "-0.06em", headingScale: 1.35 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "3px" },
    space: { density: "tight", gap: "0.5rem", padScale: 0.82 },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "center" },
  },
  "glassmorphism": {
    typography: { weightDisplay: 500, tracking: "-0.01em" },
    shape: { radius: "16px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "1rem", padScale: 1.1 },
    decoration: { shadow: "0 8px 32px rgba(0,0,0,0.18)", effect: "none" },
  },
  "neumorphism": {
    typography: { weightDisplay: 600, weightBody: 400, tracking: "-0.02em", headingScale: 0.98 },
    shape: { radius: "24px", radiusPill: "9999px", borderWidth: "1px" },
    space: { density: "normal", gap: "1rem", padScale: 1.2 },
    decoration: { shadow: "12px 12px 24px rgb(var(--st-text-rgb) / 0.12), -12px -12px 24px rgb(var(--st-surface-rgb) / 0.9)", effect: "none" },
  },
  "swiss-design": {
    typography: { weightDisplay: 700, weightBody: 400, tracking: "0em", headingScale: 1.02 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.65rem", padScale: 0.95 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "left", navStyle: "underline", alignment: "left" },
  },
};

export const tunedStyleTokenSlugs = Object.keys(styleTokenOverrides).sort();

function mergeTokens(
  base: StyleTokens,
  over?: DeepPartial<Omit<StyleTokens, "color">>,
): Omit<StyleTokens, "color"> {
  return {
    typography: { ...base.typography, ...over?.typography },
    shape: { ...base.shape, ...over?.shape },
    space: { ...base.space, ...over?.space },
    decoration: { ...base.decoration, ...over?.decoration },
    layout: { ...base.layout, ...over?.layout },
  };
}

function buildStyle(seed: DesignStyleSeed, index: number): DesignStyle {
  const profile = categoryProfiles[seed.category];
  const categoryPeers = styleSeeds.filter((style) => style.category === seed.category);
  const peerIndex = categoryPeers.findIndex((style) => style.slug === seed.slug);
  const related = [
    categoryPeers[(peerIndex + 1) % categoryPeers.length]?.slug,
    categoryPeers[(peerIndex + 2) % categoryPeers.length]?.slug,
    styleSeeds[(index + 11) % styleSeeds.length]?.slug,
  ].filter((slug): slug is string => Boolean(slug) && slug !== seed.slug);

  const baseTokens = categoryTokenDefaults[seed.category];
  const colorTokens = {
    base: seed.palette.base,
    surface: seed.palette.surface,
    text: seed.palette.text,
    muted: seed.palette.mutedText,
    primary: seed.palette.primary,
    accent: seed.palette.accent,
    accent2: seed.palette.accent2,
    accent3: seed.palette.accent3,
    border: seed.palette.border,
  };
  const mergedNonColor = mergeTokens(baseTokens, styleTokenOverrides[seed.slug]);
  const tokens: StyleTokens = { ...mergedNonColor, color: colorTokens };
  const contentOverride = styleContentOverrides[seed.slug];

  const generatedStyle: DesignStyle = {
    slug: seed.slug,
    nameKo: seed.nameKo,
    nameEn: seed.nameEn,
    category: seed.category,
    summary: `${seed.nameKo}은 ${seed.tone}입니다.`,
    description: `${seed.nameKo}은 ${seed.tone}입니다. ${seed.category} 범주 안에서 ${profile.visual[0]}과 ${profile.visual[1]}을 중심으로 화면의 첫인상을 만듭니다. 웹페이지에서는 ${profile.layout[0]}, ${profile.layout[1]}, ${profile.layout[2]}를 조합해 사용자가 분위기와 정보 구조를 동시에 이해하도록 돕습니다. ${profile.caution}`,
    visualFeatures: [
      `${profile.visual[0]}을 핵심 신호로 사용합니다.`,
      `${profile.visual[1]}과 ${profile.visual[2]}을 함께 배치합니다.`,
      `${seed.nameKo} 특유의 ${seed.tags[0]} 분위기를 명확히 드러냅니다.`,
      `${profile.visual[3]}을 통해 카드와 상세 페이지의 차이를 만듭니다.`,
    ],
    colorPalette: [
      `${profile.colorNotes[0]}을 기본 배경으로 사용합니다.`,
      `${profile.colorNotes[1]}을 보조 표면에 배치합니다.`,
      `${profile.colorNotes[2]}으로 본문 대비를 확보합니다.`,
      `${profile.colorNotes[3]}은 CTA와 강조 정보에만 제한적으로 사용합니다.`,
    ],
    typography: [
      profile.typography[0],
      profile.typography[1],
      profile.typography[2],
    ],
    layoutTraits: [
      profile.layout[0],
      profile.layout[1],
      profile.layout[2],
      profile.layout[3],
    ],
    useCases: [...profile.useCases],
    goodFor: [...profile.goodFor],
    cautions: [
      profile.caution,
      "선택한 스타일이 콘텐츠의 실제 목적보다 앞서지 않도록 핵심 정보 위계를 먼저 고정해야 합니다.",
      "모바일에서는 장식 요소를 줄이고 제목, 본문, CTA의 가독성을 우선 확인해야 합니다.",
    ],
    tags: [...new Set([...seed.tags, seed.category.split(" / ")[0], seed.sampleType ?? profile.sampleType])],
    related: related.slice(0, 3),
    palette: seed.palette,
    imagePrompt: `A square editorial poster representing ${seed.nameEn} design style, ${seed.tone}, ${profile.visual.join(", ")}, ${promptSuffix}`,
    sampleType: seed.sampleType ?? profile.sampleType,
    tokens,
  };

  return {
    ...generatedStyle,
    ...contentOverride,
  };
}

export const defaultDesignStyleSlug = "brutalism";

export const designStyles: DesignStyle[] = styleSeeds.map(buildStyle);

export const designStyleCategories = [...new Set(designStyles.map((style) => style.category))];

export const designStyleTags = [...new Set(designStyles.flatMap((style) => style.tags))].sort();

export function getDesignStyleBySlug(slug: string) {
  return designStyles.find((style) => style.slug === slug);
}

export function getRelatedDesignStyles(slugs: string[]) {
  return slugs
    .map((slug) => getDesignStyleBySlug(slug))
    .filter((style): style is DesignStyle => Boolean(style));
}
