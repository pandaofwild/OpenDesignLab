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
  brutalism: {
    base: "#E4E2DD",
    surface: "#F0EEE8",
    text: "#1E1E1E",
    mutedText: "#6D6962",
    primary: "#1E1E1E",
    accent: "#DB4A2B",
    accent2: "#F8A348",
    accent3: "#FF89A9",
    border: "#1E1E1E",
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
  "brutalism": {
    typography: { weightDisplay: 900, tracking: "-0.05em" },
    shape: { radius: "0px", borderWidth: "4px" },
    decoration: { shadow: "6px 6px 0 var(--st-primary)", effect: "none" },
  },
  "new-brutalism": {
    typography: { weightDisplay: 900, weightBody: 600, tracking: "-0.06em", headingScale: 1.32 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "5px" },
    space: { density: "tight", gap: "0.35rem", padScale: 0.78 },
    decoration: { shadow: "8px 8px 0 var(--st-accent)", effect: "none" },
  },
  "glitch-art": {
    typography: { bodyFont: '"SFMono-Regular", monospace', weightDisplay: 800, tracking: "0.02em", headingScale: 1.22 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "2px", borderStyle: "dashed" },
    space: { density: "tight", gap: "0.45rem", padScale: 0.82 },
    decoration: { shadow: "3px 0 0 var(--st-accent), -3px 0 0 var(--st-accent-2)", effect: "glitch" },
  },
  "cyberpunk": {
    typography: { bodyFont: '"SFMono-Regular", monospace', tracking: "0.02em" },
    shape: { radius: "2px", borderWidth: "1px" },
    decoration: { shadow: "0 0 24px rgb(var(--st-accent-rgb) / 0.6)", effect: "glow" },
  },
  "retro-futurism": {
    typography: { bodyFont: '"SFMono-Regular", monospace', weightDisplay: 800, tracking: "0.03em", headingScale: 1.12 },
    shape: { radius: "14px", radiusPill: "9999px", borderWidth: "2px" },
    space: { density: "normal", gap: "0.9rem", padScale: 1.08 },
    decoration: { shadow: "0 0 22px rgb(var(--st-accent-rgb) / 0.45)", effect: "gradient" },
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
  "y2k": {
    typography: { weightDisplay: 800, tracking: "-0.02em", headingScale: 1.15 },
    shape: { radius: "12px", borderWidth: "2px" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "3px 3px 0 var(--st-accent)", effect: "gradient" },
  },
  "maximalism": {
    typography: { weightDisplay: 800, tracking: "-0.03em", headingScale: 1.2 },
    shape: { radius: "4px", borderWidth: "2px" },
    space: { density: "tight", gap: "0.5rem", padScale: 0.9 },
    decoration: { shadow: "4px 4px 0 var(--st-accent), -4px -4px 0 var(--st-accent-2)", effect: "grain" },
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
