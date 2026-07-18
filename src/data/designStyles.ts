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

export type StyleMoodboard = {
  alt: string;
  caption: string;
  directionKeywords: string[];
  generatedWith: "imagegen";
  imageSrc: string;
  prompt: string;
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
  moodboard?: StyleMoodboard;
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
    base: "#F7F7F7",
    surface: "#FFFFFF",
    text: "#000000",
    mutedText: "#4A4A4A",
    primary: "#000000",
    accent: "#0000EE",
    accent2: "#FF0000",
    accent3: "#551A8B",
    border: "#000000",
  },
  "new-brutalism": {
    base: "#FFFDF5",
    surface: "#FFFFFF",
    text: "#000000",
    mutedText: "#3A342C",
    primary: "#000000",
    accent: "#FFD23F",
    accent2: "#FF6B6B",
    accent3: "#74B9FF",
    border: "#000000",
  },
  "anti-design": {
    base: "#F7F7F2",
    surface: "#07051F",
    text: "#111111",
    mutedText: "#514E49",
    primary: "#111111",
    accent: "#00FF19",
    accent2: "#00E9FF",
    accent3: "#FF27CE",
    border: "#111111",
  },
  maximalism: {
    base: "#241336",
    surface: "#2F1A45",
    text: "#FFF0B8",
    mutedText: "#D8B7DA",
    primary: "#FFF0B8",
    accent: "#FF4D88",
    accent2: "#00B894",
    accent3: "#F7C948",
    border: "#53356F",
  },
  "glitch-art": {
    base: "#02030A",
    surface: "#101422",
    text: "#EAFBFF",
    mutedText: "#7D95A8",
    primary: "#EAFBFF",
    accent: "#19F7FF",
    accent2: "#FF2A8A",
    accent3: "#C8FF2D",
    border: "#55F5FF",
  },
  deconstructivism: {
    base: "#E7E0D2",
    surface: "#F7F1E4",
    text: "#111315",
    mutedText: "#625D56",
    primary: "#111315",
    accent: "#C7322B",
    accent2: "#1F4A8A",
    accent3: "#B8B1A7",
    border: "#111315",
  },
  "avant-garde": {
    base: "#F5F0E4",
    surface: "#101010",
    text: "#101010",
    mutedText: "#5F5A52",
    primary: "#101010",
    accent: "#D0181F",
    accent2: "#2452A7",
    accent3: "#F2C641",
    border: "#101010",
  },
  postmodernism: {
    base: "#F4EBDD",
    surface: "#FFFDF5",
    text: "#171414",
    mutedText: "#61564D",
    primary: "#171414",
    accent: "#E13E2F",
    accent2: "#2357C7",
    accent3: "#F2D23C",
    border: "#171414",
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
  bauhaus: {
    base: "#F1ECE0",
    surface: "#FFFFFF",
    text: "#1A1A1A",
    mutedText: "#5A554B",
    primary: "#1A1A1A",
    accent: "#D62828",
    accent2: "#1D4ED8",
    accent3: "#F4C20D",
    border: "#1A1A1A",
  },
  "mid-century-modern": {
    base: "#E7D8BD",
    surface: "#F8EEDB",
    text: "#2B241A",
    mutedText: "#76664D",
    primary: "#5A321F",
    accent: "#C9653A",
    accent2: "#2F776B",
    accent3: "#D4A33A",
    border: "#3A2A1D",
  },
  futurism: {
    base: "#ECEFF4",
    surface: "#FFFFFF",
    text: "#0A0E1A",
    mutedText: "#5B6378",
    primary: "#0A0E1A",
    accent: "#FF2D2D",
    accent2: "#1E5BFF",
    accent3: "#0AB39C",
    border: "#0A0E1A",
  },
  "neon-noir": {
    base: "#0A0A10",
    surface: "#14141F",
    text: "#ECE9F5",
    mutedText: "#8E8AA6",
    primary: "#ECE9F5",
    accent: "#FF2E63",
    accent2: "#5B6CFF",
    accent3: "#FF8FB1",
    border: "#2A2A3C",
  },
  hud: {
    base: "#040810",
    surface: "#0A1220",
    text: "#D9EEFF",
    mutedText: "#5F7F9F",
    primary: "#D9EEFF",
    accent: "#4FA9FF",
    accent2: "#8FE9FF",
    accent3: "#FFB13B",
    border: "#1E3A5A",
  },
  "high-tech": {
    base: "#0A0F15",
    surface: "#121A24",
    text: "#E6EDF3",
    mutedText: "#8B98A8",
    primary: "#E6EDF3",
    accent: "#2DE2A6",
    accent2: "#4C8DFF",
    accent3: "#FFB020",
    border: "#22303F",
  },
  "ai-aesthetic": {
    base: "#F4EFFC",
    surface: "#FFFFFF",
    text: "#2E2740",
    mutedText: "#8D85AC",
    primary: "#2E2740",
    accent: "#8C6FEE",
    accent2: "#F28FC4",
    accent3: "#3FBBD1",
    border: "#E3D8F6",
  },
  "hologram-style": {
    base: "#F4F7F7",
    surface: "#FFFFFF",
    text: "#263543",
    mutedText: "#71838C",
    primary: "#173C4A",
    accent: "#3AC6DE",
    accent2: "#8B74D9",
    accent3: "#D89B4A",
    border: "#C8D8DC",
  },
  chromecore: {
    base: "#CDD2DA",
    surface: "#E9ECF1",
    text: "#16181D",
    mutedText: "#5A6373",
    primary: "#16181D",
    accent: "#7E8AA3",
    accent2: "#4A63FF",
    accent3: "#AEB6C4",
    border: "#16181D",
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
  classic: {
    base: "#F3EFE5",
    surface: "#FFFDF5",
    text: "#161616",
    mutedText: "#706A5D",
    primary: "#10213F",
    accent: "#7C1F2A",
    accent2: "#C7A66A",
    accent3: "#D8D1C4",
    border: "#232019",
  },
  neoclassic: {
    base: "#EEE7DA",
    surface: "#FFF9EE",
    text: "#24211D",
    mutedText: "#71695B",
    primary: "#312820",
    accent: "#B79B68",
    accent2: "#D8D0BF",
    accent3: "#6E7A68",
    border: "#AFA089",
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
  "old-money": {
    base: "#EDE7D9",
    surface: "#FBF5E8",
    text: "#18251B",
    mutedText: "#65705D",
    primary: "#18251B",
    accent: "#39533B",
    accent2: "#C1A06D",
    accent3: "#6D1F2A",
    border: "#2D3B2B",
  },
  "art-deco": {
    base: "#080806",
    surface: "#14120E",
    text: "#F7E7BD",
    mutedText: "#B9A473",
    primary: "#F7E7BD",
    accent: "#D8A94B",
    accent2: "#0E6B56",
    accent3: "#7A2330",
    border: "#D8A94B",
  },
  "art-nouveau": {
    base: "#E8E2CE",
    surface: "#F9F1DA",
    text: "#253021",
    mutedText: "#6A745E",
    primary: "#253021",
    accent: "#5F7F4F",
    accent2: "#D3A75E",
    accent3: "#9B5867",
    border: "#58694C",
  },
  baroque: {
    base: "#1F0E12",
    surface: "#32151B",
    text: "#F3DDB7",
    mutedText: "#C49B82",
    primary: "#F3DDB7",
    accent: "#B9773B",
    accent2: "#7C1828",
    accent3: "#3F2016",
    border: "#8E6042",
  },
  rococo: {
    base: "#F4E9E8",
    surface: "#FFF8F3",
    text: "#3B2C2E",
    mutedText: "#8A7476",
    primary: "#3B2C2E",
    accent: "#D4A7B4",
    accent2: "#B7D0D4",
    accent3: "#C8A45A",
    border: "#D8C4BA",
  },
  gothic: {
    base: "#0D0F12",
    surface: "#171A1F",
    text: "#ECE5D0",
    mutedText: "#A4A3A0",
    primary: "#ECE5D0",
    accent: "#7D1128",
    accent2: "#1E4A70",
    accent3: "#C0A35A",
    border: "#8D806A",
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
  natural: {
    base: "#E9E1D0",
    surface: "#F7F1E4",
    text: "#2B271F",
    mutedText: "#746C5C",
    primary: "#2B271F",
    accent: "#A9874A",
    accent2: "#C8B792",
    accent3: "#6F7A5C",
    border: "#5C5140",
  },
  botanical: {
    base: "#E7EAD7",
    surface: "#F6F2DF",
    text: "#1F3425",
    mutedText: "#66705F",
    primary: "#1F3425",
    accent: "#527A45",
    accent2: "#B7C96E",
    accent3: "#D29A8F",
    border: "#365039",
  },
  "eco-design": {
    base: "#EEF0D8",
    surface: "#FAF8E7",
    text: "#152118",
    mutedText: "#5E6859",
    primary: "#152118",
    accent: "#4F8E3F",
    accent2: "#D8F36A",
    accent3: "#7DB7B2",
    border: "#263B2B",
  },
  rustic: {
    base: "#DCC6A4",
    surface: "#F0E0C6",
    text: "#2A1B12",
    mutedText: "#765D48",
    primary: "#2A1B12",
    accent: "#7A3F22",
    accent2: "#B56A38",
    accent3: "#556744",
    border: "#3E2819",
  },
  kinfolk: {
    base: "#EDE6D8",
    surface: "#F8F2E7",
    text: "#22201B",
    mutedText: "#777064",
    primary: "#22201B",
    accent: "#A98B4C",
    accent2: "#D9D0B8",
    accent3: "#6D755D",
    border: "#BBB09B",
  },
  handmade: {
    base: "#F0E0C8",
    surface: "#FFF1D6",
    text: "#262018",
    mutedText: "#7A6853",
    primary: "#262018",
    accent: "#C45A34",
    accent2: "#3F6F8F",
    accent3: "#E2B64E",
    border: "#3A2B1D",
  },
  craft: {
    base: "#E7DDCB",
    surface: "#F7EEDC",
    text: "#1F1B17",
    mutedText: "#6F6558",
    primary: "#1F1B17",
    accent: "#9E6A3B",
    accent2: "#2D5963",
    accent3: "#C8A15A",
    border: "#2C241B",
  },
  "wabi-sabi": {
    base: "#D8D4C8",
    surface: "#ECE8DA",
    text: "#1F211D",
    mutedText: "#6B6B62",
    primary: "#1F211D",
    accent: "#B6A37D",
    accent2: "#6E7568",
    accent3: "#9B6044",
    border: "#777267",
  },
  kitsch: {
    base: "#FFF0D8",
    surface: "#FFFDF2",
    text: "#261A22",
    mutedText: "#775666",
    primary: "#E33B88",
    accent: "#FF5E2C",
    accent2: "#8B5CF6",
    accent3: "#FFE44D",
    border: "#261A22",
  },
  kawaii: {
    base: "#FFF4F8",
    surface: "#FFFFFF",
    text: "#2A2135",
    mutedText: "#786F87",
    primary: "#FF5FA2",
    accent: "#FF7AB8",
    accent2: "#8EDAFF",
    accent3: "#FFE66B",
    border: "#2A2135",
  },
  "dopamine-design": {
    base: "#FFF7D6",
    surface: "#FFFFFF",
    text: "#152214",
    mutedText: "#5F6A44",
    primary: "#1F7A36",
    accent: "#FF3B7F",
    accent2: "#2DDB6F",
    accent3: "#FFD22E",
    border: "#162316",
  },
  "pop-art": {
    base: "#FFF2C2",
    surface: "#FFFFFF",
    text: "#101010",
    mutedText: "#5A4E3B",
    primary: "#101010",
    accent: "#F21D2F",
    accent2: "#155BFF",
    accent3: "#FFD400",
    border: "#101010",
  },
  "comic-book-style": {
    base: "#F6EDCE",
    surface: "#FFFDF2",
    text: "#111111",
    mutedText: "#615946",
    primary: "#111111",
    accent: "#E3202D",
    accent2: "#1F69FF",
    accent3: "#FFD13B",
    border: "#111111",
  },
  "toy-design": {
    base: "#E8F6FF",
    surface: "#FFFFFF",
    text: "#182432",
    mutedText: "#627184",
    primary: "#182432",
    accent: "#EF2F32",
    accent2: "#0FAF5A",
    accent3: "#FFD23A",
    border: "#182432",
  },
  "playful-design": {
    base: "#F8F4FF",
    surface: "#FFFFFF",
    text: "#221F33",
    mutedText: "#69627D",
    primary: "#4A3AFF",
    accent: "#FF7A1A",
    accent2: "#36C48F",
    accent3: "#F7D84A",
    border: "#221F33",
  },
  "pastel-style": {
    base: "#F7EAF1",
    surface: "#FFFDFC",
    text: "#332B2F",
    mutedText: "#8A7881",
    primary: "#8E5A6A",
    accent: "#F8B7C9",
    accent2: "#B9D9F2",
    accent3: "#DCE8B8",
    border: "#D8C6CE",
  },
  "bubble-design": {
    base: "#E8FBFF",
    surface: "#FFFFFF",
    text: "#122E3A",
    mutedText: "#5B7480",
    primary: "#14A5B8",
    accent: "#70D9FF",
    accent2: "#FF8BD1",
    accent3: "#B8F05C",
    border: "#2B6A78",
  },
  graffiti: {
    base: "#E4E2DC",
    surface: "#F2F0EA",
    text: "#141414",
    mutedText: "#5C5A54",
    primary: "#141414",
    accent: "#F0257C",
    accent2: "#1F6BFF",
    accent3: "#FFCE1F",
    border: "#141414",
  },
  "hiphop-style": {
    base: "#0D0B08",
    surface: "#1C1712",
    text: "#F3EAD8",
    mutedText: "#A2937A",
    primary: "#E9B93A",
    accent: "#E4322B",
    accent2: "#2F6BFF",
    accent3: "#F2C94C",
    border: "#2A2118",
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
  grunge: {
    // Distressed music archive: warm charcoal base, aged-paper text,
    // oxidized rust + muted moss + faded denim. Low saturation, worn.
    base: "#16130E",
    surface: "#231E16",
    text: "#D9D1BF",
    mutedText: "#8A8271",
    primary: "#C7BEA8",
    accent: "#A8482D",
    accent2: "#5E6B53",
    accent3: "#4C5D6E",
    border: "#3A3327",
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
  ["anti-design", "안티디자인", "Anti-Design", "강렬 / 실험", "관습적 미감과 균형을 일부러 비틀어 강한 인상을 만드는 스타일", ["anti-design", "creative-tech", "off-grid"], "magazine-layout"],
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
  ["bauhaus", "바우하우스", "Bauhaus", "레트로 / 빈티지", "circle square triangle lab과 workshop method grid로 기본 도형, 원색, 기능주의 교육 문법을 화면화하는 디자인", ["bauhaus", "geometry", "primary"], "magazine-layout"],

  ["futurism", "퓨처리즘", "Futurism", "미래 / 디지털", "속도감과 기술 낙관주의를 시각화하는 미래지향적 스타일", ["future", "speed", "tech"], "cyber-dashboard"],
  ["cyberpunk", "사이버펑크", "Cyberpunk", "미래 / 디지털", "어두운 도시, 네온, 디지털 반항성을 결합한 강한 테크 스타일", ["cyberpunk", "neon", "dark"], "cyber-dashboard"],
  ["neon-noir", "네온 누아르", "Neon Noir", "미래 / 디지털", "느와르의 어둠과 네온 광원을 결합한 분위기 중심 스타일", ["neon", "noir", "dark"], "cyber-dashboard"],
  ["hud", "HUD", "HUD", "미래 / 디지털", "시야 위에 계기 그래픽을 겹쳐 그리는 헤드업 디스플레이(FUI) 스타일", ["hud", "fui", "overlay"], "cyber-dashboard"],
  ["high-tech", "하이테크", "High-Tech", "미래 / 디지털", "정밀한 패널과 데이터 시각화로 첨단 이미지를 만드는 스타일", ["high-tech", "interface", "data"], "saas-landing"],
  ["ai-aesthetic", "AI 에스테틱", "AI Aesthetic", "미래 / 디지털", "생성형 이미지, 빛나는 그라데이션, 계산적 패턴을 결합한 스타일", ["ai", "generated", "gradient"], "saas-landing"],
  ["hologram-style", "홀로그램 스타일", "Hologram Style", "미래 / 디지털", "반투명 빛과 분광 색으로 입체적 디지털 감각을 만드는 스타일", ["hologram", "iridescent", "future"], "cyber-dashboard"],
  ["chromecore", "크롬코어", "Chromecore", "미래 / 디지털", "금속성 광택과 반사 질감을 중심으로 한 미래적 스타일", ["chrome", "metal", "gloss"], "luxury-product"],
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

const futureDigitalResearch: Partial<Record<string, StyleResearchBrief>> = {
  futurism: {
    referenceSites: [
      { title: "SpaceX", url: "https://www.spacex.com", note: "Operational aerospace reference for black fields, launch imagery, technical confidence, and stark future-facing product hierarchy." },
      { title: "Boom Supersonic", url: "https://boomsupersonic.com", note: "Speed and supersonic aviation reference for velocity language, aerodynamic form, and optimistic engineering storytelling." },
      { title: "NASA Artemis", url: "https://www.nasa.gov/humans-in-space/artemis/", note: "Official space-program reference for mission timelines, launch windows, orbital diagrams, and civic-science futurism." },
    ],
    referenceGalleries: [
      { title: "Awwwards - Sci-Fi Websites", url: "https://www.awwwards.com/websites/sci-fi/", note: "Gallery reference for contemporary sci-fi web execution, launch scenes, technical modules, and future-product pacing." },
      { title: "Dribbble - Futuristic Website", url: "https://dribbble.com/search/futuristic-website", note: "UI reference for speed lines, mission readouts, launch dashboards, and sharp future-tech layouts." },
      { title: "Pinterest - Futurism Website Design", url: "https://www.pinterest.com/search/pins/?q=Futurism%20website%20design", note: "Moodboard reference for orbital diagrams, aerodynamic silhouettes, dark space surfaces, and luminous mission UI." },
    ],
    representativeTraits: ["Orbital mission framing", "Launch-window modules", "Velocity typography", "Aerodynamic diagonal cuts", "Dark civic-science confidence"],
    avoidTraits: ["Generic blue tech dashboard", "Cyberpunk dystopia", "Toy rocket illustration", "Unreadable speed-line clutter"],
    tokenIntent:
      "Use bright silver speed surfaces with dark mission panels, near-black mission text, red/blue launch accents, forward-leaning diagonal cuts, a mach-corridor route map, launch-window boards, and live telemetry strips so the style reads as optimistic velocity futurism.",
  },
  cyberpunk: {
    referenceSites: [
      { title: "Cyberpunk 2077 Official", url: "https://www.cyberpunk.net", note: "Genre-defining commercial reference for yellow hazard UI, neon city atmosphere, mercenary commerce, and dense sci-fi campaign panels." },
      { title: "Razer", url: "https://www.razer.com", note: "Gaming hardware reference for black surfaces, electric green accents, RGB product framing, and aggressive cyber retail hierarchy." },
      { title: "Republic of Gamers", url: "https://rog.asus.com", note: "Gaming-tech reference for angular neon panels, hardware telemetry, dark product staging, and high-contrast interface language." },
    ],
    referenceGalleries: [
      { title: "Awwwards - Sci-Fi Websites", url: "https://www.awwwards.com/websites/sci-fi/", note: "Gallery reference for cyberpunk-adjacent dark storytelling, animated panels, neon contrast, and immersive sci-fi web craft." },
      { title: "Dribbble - Cyberpunk Website", url: "https://dribbble.com/search/cyberpunk-website", note: "UI reference for black-market dashboards, neon street labels, cybernetic shops, and dense sci-fi interface modules." },
      { title: "Pinterest - Cyberpunk Website Design", url: "https://www.pinterest.com/search/pins/?q=Cyberpunk%20website%20design", note: "Moodboard reference for dystopian city color, neon signage, hacked terminal surfaces, and cyber commerce pages." },
    ],
    representativeTraits: ["Night market signage", "Black-market interface panels", "Ripperdoc commerce", "Neon hazard contrast", "Dense city protocol labels"],
    avoidTraits: ["Clean SaaS polish", "Soft AI gradients", "Retro synthwave nostalgia", "Pure glitch/error art without city culture"],
    tokenIntent:
      "Use black panels, cyan and magenta neon, hazard yellow accents, clipped corners, night-market signage, ripperdoc labels, and back-alley commerce widgets so the style reads as cyberpunk rather than glitch art.",
  },
  "neon-noir": {
    referenceSites: [
      { title: "Exo Ape", url: "https://exo-ape.com", note: "Cinematic agency reference for dark image-led pacing, dramatic contrast, restrained glow, and moody portfolio rhythm." },
      { title: "Locomotive", url: "https://locomotive.ca", note: "Dark digital-studio reference for immersive storytelling, heavy contrast, cinematic transitions, and polished atmospheric UI." },
      { title: "Refik Anadol", url: "https://refikanadol.com", note: "Media-art reference for luminous data atmospheres, gallery darkness, single-source glow, and immersive digital abstraction." },
    ],
    referenceGalleries: [
      { title: "Awwwards - Dark Websites", url: "https://www.awwwards.com/websites/dark/", note: "Gallery reference for moody low-key websites, cinematic hero sections, subtle glow, and atmospheric dark interfaces." },
      { title: "Dribbble - Neon Noir", url: "https://dribbble.com/search/neon-noir", note: "UI reference for noir poster framing, red-blue lighting, rain-soaked overlays, and case-file style cards." },
      { title: "Pinterest - Neon Noir Website Design", url: "https://www.pinterest.com/search/pins/?q=Neon%20Noir%20website%20design", note: "Moodboard reference for night streets, neon reflections, film still layouts, and red room visual motifs." },
    ],
    representativeTraits: ["Rain-lit case files", "Red room focal light", "Low-key cinematic framing", "Noir typography", "Single-source glow"],
    avoidTraits: ["Full cyberpunk clutter", "Generic dark agency hero", "Bright synthwave grid", "Flat black cards without atmosphere"],
    tokenIntent:
      "Use near-black backgrounds, red and blue neon accents, rain streaks, cinematic still frames, case-file modules, and restrained glow so the style reads as neon noir.",
  },
  hud: {
    referenceSites: [
      { title: "HUDS+GUIS", url: "https://www.hudsandguis.com", note: "Canonical FUI archive for heads-up display graphics, fictional interface reels, instrument overlays, and screen-graphic craft across film and games." },
      { title: "Territory Studio", url: "https://territorystudio.com", note: "Screen-graphics studio reference for cinematic HUD overlays, thin-stroke instrument geometry, and diegetic interface worldbuilding." },
      { title: "Perception", url: "https://www.experienceperception.com", note: "FUI studio reference for hero HUD sequences, reticle and target-lock language, and future-vision interface prototyping." },
    ],
    referenceGalleries: [
      { title: "Behance - FUI", url: "https://www.behance.net/search/projects/fui", note: "Gallery reference for fictional UI boards, HUD overlay studies, instrument cluster compositions, and phosphor-glow screen graphics." },
      { title: "Awwwards - Sci-Fi Websites", url: "https://www.awwwards.com/websites/sci-fi/", note: "Web-gallery reference for comparing cinematic scene-led sci-fi layouts while rejecting card dashboards, cyberpunk commerce, and decorative hologram clutter." },
      { title: "Dribbble - HUD Interface", url: "https://dribbble.com/search/hud-interface", note: "UI reference for reticles, data tapes, corner brackets, radar rings, and first-person overlay layouts." },
      { title: "Pinterest - HUD Interface Design", url: "https://www.pinterest.com/search/pins/?q=HUD%20interface%20design", note: "Moodboard reference for cockpit symbology, AR windshield overlays, monoline instrument graphics, and glowing scale rulers." },
    ],
    representativeTraits: ["First-person overlay framing", "Corner-anchored instrument clusters", "Pitch ladder and reticle symbology", "Data tapes and scale rulers", "Ice-blue monochrome glow"],
    avoidTraits: ["Card-based dashboard layout", "Cyberpunk city commerce", "Glassmorphism blur panels", "Decorative sci-fi clutter without instrument logic"],
    tokenIntent:
      "Use a first-person scene with corner-anchored ice-blue instrument overlays, a center reticle and pitch ladder, heading and altitude tapes, thin-stroke mono geometry, and amber caution states so the style reads as a heads-up display rather than a dashboard.",
  },
  "high-tech": {
    referenceSites: [
      { title: "Vercel", url: "https://vercel.com", note: "Developer-platform reference for dark control-plane surfaces, deployment language, precise typography, and productized infrastructure UI." },
      { title: "Linear", url: "https://linear.app", note: "Precision software reference for crisp panels, controlled gradients, system status, and high-end engineering-product pacing." },
      { title: "Grafana", url: "https://grafana.com", note: "Observability reference for dashboards, live metrics, graph panels, incident status, and dense technical data visualization." },
    ],
    referenceGalleries: [
      { title: "Awwwards - SaaS Websites", url: "https://www.awwwards.com/websites/saas/", note: "Gallery reference for high-tech SaaS landing pages, dashboard storytelling, product proof sections, and enterprise-grade interface polish." },
      { title: "Dribbble - Dark Dashboard", url: "https://dribbble.com/search/dashboard-dark", note: "UI reference for deploy graphs, KPI cards, telemetry panels, edge-region maps, and control-plane interaction patterns." },
      { title: "Pinterest - High-Tech Website Design", url: "https://www.pinterest.com/search/pins/?q=High-Tech%20website%20design", note: "Moodboard reference for dark product systems, data grids, technical blue-green accents, and advanced software surfaces." },
    ],
    representativeTraits: ["Quantum control plane", "Cryostat stage rail", "Qubit lattice map", "Calibration telemetry", "Precise engineering copy"],
    avoidTraits: ["Cyberpunk fantasy", "Generic KPI dashboard", "Marketing-only gradient hero", "Unlabeled data decoration"],
    tokenIntent:
      "Use dark graphite product surfaces, mint live accents, blue data accents, restrained amber caution, tabular mono telemetry, hairline panel borders, and crisp typography so the style reads as precision high-tech infrastructure.",
  },
  "ai-aesthetic": {
    referenceSites: [
      { title: "OpenAI", url: "https://openai.com", note: "AI-product reference for restrained model framing, quiet technical copy, generated media examples, and calm future-facing brand surfaces." },
      { title: "Runway", url: "https://runwayml.com", note: "Generative media reference for creator tooling, model canvases, dark gradients, motion-ready thumbnails, and AI studio language." },
      { title: "Luma AI", url: "https://lumalabs.ai", note: "Generative 3D/video reference for luminous scene previews, spatial AI outputs, soft gradients, and world-model visual cues." },
    ],
    referenceGalleries: [
      { title: "Awwwards - AI Websites", url: "https://www.awwwards.com/websites/ai/", note: "Gallery reference for AI-product web aesthetics, prompt-first flows, generated imagery, luminous gradients, and model storytelling." },
      { title: "Dribbble - AI Gradient", url: "https://dribbble.com/search/ai-gradient", note: "UI reference for model canvases, prompt bars, latent queues, generated thumbnails, and soft glowing mesh gradients." },
      { title: "Pinterest - AI Aesthetic Website Design", url: "https://www.pinterest.com/search/pins/?q=AI%20Aesthetic%20website%20design", note: "Moodboard reference for neural gradients, synthetic scenes, AI product pages, and abstract model visualization." },
    ],
    representativeTraits: ["Model canvas", "Latent queue", "World-model preview", "Prompt bar", "Synthetic gradient scene"],
    avoidTraits: ["Generic purple SaaS", "Cyberpunk terminal noise", "Unexplainable abstract blobs", "Static image without product workflow"],
    tokenIntent:
      "Use dark model-canvas surfaces, luminous violet/cyan gradients, prompt controls, generated thumbnails, latent queue modules, and synthetic scene previews so the style reads as AI product design.",
  },
  "hologram-style": {
    referenceSites: [
      { title: "Apple Vision Pro", url: "https://www.apple.com/apple-vision-pro/", note: "Spatial-computing reference for legible depth hierarchy, precise optical anchoring, and restrained translucent surfaces that remain readable in a bright environment." },
      { title: "Magic Leap", url: "https://www.magicleap.com", note: "Mixed-reality reference for registering labels and controls to a spatial subject instead of arranging generic floating cards." },
      { title: "Looking Glass Factory", url: "https://lookingglassfactory.com", note: "Light-field display reference for a genuinely volumetric central object, visible depth separation, and multiple view planes." },
    ],
    referenceGalleries: [
      { title: "Awwwards - 3D Websites", url: "https://www.awwwards.com/websites/3d/", note: "Compare depth-rich web execution, but retain only examples where a scientific or anatomical volume has clear spatial hierarchy and controls." },
      { title: "Dribbble - Holographic", url: "https://dribbble.com/search/holographic", note: "Component reference for spectral edge light, slice controls, orientation aids, and spatial measurements; reject flat glass cards and decorative rainbow gradients." },
      { title: "Pinterest - Hologram Style Website Design", url: "https://www.pinterest.com/search/pins/?q=Hologram%20Style%20website%20design", note: "Moodboard reference for clinical optics, translucent scan layers, and scientific volumes distinct from chromecore hardware or HUD reticles." },
    ],
    representativeTraits: ["Clinical volume chamber", "Four-plane light field", "Tissue-mode segmentation", "Slice and depth controls", "Spatial measurement labels"],
    avoidTraits: ["Generic frosted glass cards", "Dark cyberpunk command center", "Chrome hardware spectacle", "Decorative rainbow gradients without depth logic"],
    tokenIntent:
      "Use pearl clinical surfaces, restrained cyan/violet spectral edges, pale amber measurement focus, hairline optics, four explicit depth planes, and real scan controls so holography reads as volumetric light rather than flat glass blur.",
  },
  chromecore: {
    referenceSites: [
      { title: "Aesthetics Wiki - Chromecore", url: "https://aesthetics.fandom.com/wiki/Chromecore", note: "Trend definition reference for Y2K Chromecore, metallic gray texture, molded curves, silver plastic hardware, and late-90s/2000s product optimism." },
      { title: "Web Design Museum - Y2K Aesthetic in Web Design", url: "https://www.webdesignmuseum.org/exhibitions/y2k-aesthetic-in-web-design", note: "Historical web reference for shiny turn-of-millennium interfaces, Flash-era chrome surfaces, translucent modules, and early digital futurism." },
      { title: "AD Middle East - Chrome Decor Trend", url: "https://www.admiddleeast.com/story/nail-the-chrome-decor-trend-2025", note: "Current design reference for high-shine metallics, space-age finishes, liquid metal fashion influence, and reflective chrome as a tactile accent." },
    ],
    referenceGalleries: [
      { title: "Awwwards - 3D Websites", url: "https://www.awwwards.com/websites/3d/", note: "Supplementary gallery reference for reflective 3D objects, metallic hero treatments, and modern chrome execution that can support the Y2K Chromecore direction." },
      { title: "Goodmoods - Chromecore Moodboard", url: "https://www.goodmoods.com/fr/moodboards/chromecore", note: "Moodboard reference for mirror surfaces, liquefied metal, brushed finishes, chrome furniture, and reflective silver objects." },
      { title: "Dribbble - Chrome Type", url: "https://dribbble.com/search/chrome-type", note: "UI reference for liquid-metal lettering, mirrored title treatments, specular highlights, and metallic visual identity systems." },
      { title: "Pinterest - Chrome Y2K Design", url: "https://www.pinterest.com/search/pins/?q=chrome%20y2k%20design", note: "Moodboard reference for Y2K chrome type, silver gradients, molded gadget shells, reflective buttons, and early-2000s metallic graphics." },
    ],
    representativeTraits: ["Y2K chrome type", "Molded silver hardware", "Specular star flashes", "Rounded gadget shells", "Blue lens accents"],
    avoidTraits: ["Generic luxury CGI", "Flat silver cards", "Holographic rainbow plastic", "Dark WebGL sculpture without Y2K hardware cues"],
    tokenIntent:
      "Use Y2K chrome lettering, molded silver device shells, bright specular flashes, gray-white metal gradients, blue lens accents, and early-2000s interface modules so the style reads as Chromecore instead of generic metallic luxury.",
  },
};

const luxuryClassicResearch: Record<string, StyleResearchBrief> = {
  classic: {
    referenceSites: [
      { title: "Ralph Lauren", url: "https://www.ralphlauren.com", note: "Heritage fashion reference for classic American proportions, serif restraint, navy cream contrast, and archive-led commerce." },
      { title: "Brooks Brothers", url: "https://www.brooksbrothers.com", note: "Classic wardrobe reference for traditional menswear grids, conservative product hierarchy, and balanced catalog pacing." },
      { title: "Hermes", url: "https://www.hermes.com/us/en/", note: "Luxury heritage reference for quiet navigation, material-led product framing, and restrained editorial storytelling." },
      { title: "Burberry", url: "https://www.burberry.com", note: "British heritage reference for classic outerwear, campaign imagery, refined commerce modules, and subdued brand rhythm." },
      { title: "Smythson", url: "https://www.smythson.com", note: "Stationery and leather goods reference for heritage product detail, small luxury objects, and formal serif-adjacent pacing." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Classic Website Design", url: "https://www.pinterest.com/search/pins/?q=classic%20website%20design", note: "Moodboard reference for balanced serif layouts, heritage product cards, ivory surfaces, and timeless editorial web composition." },
      { title: "Awwwards - Luxury Websites", url: "https://www.awwwards.com/websites/luxury/", note: "Gallery reference for premium web craft, restrained interaction, refined spacing, and high-end product storytelling." },
      { title: "Dribbble - Classic Website Design", url: "https://dribbble.com/search/classic%20website%20design", note: "UI reference for formal landing pages, heritage catalogs, serif hierarchy, and classic commerce modules." },
    ],
    representativeTraits: ["Balanced serif hierarchy", "Heritage product rhythm", "Ivory and navy restraint", "Archive catalog modules", "Material credibility"],
    avoidTraits: ["Overly ornate palace styling", "Generic luxury gold overload", "Modern SaaS minimalism", "Streetwear campaign density"],
    tokenIntent: "Use ivory surfaces, navy and oxblood accents, serif display type, thin rules, and symmetrical catalog modules so Classic reads as timeless commerce rather than ornate luxury.",
  },
  neoclassic: {
    referenceSites: [
      { title: "Ritz Paris", url: "https://www.ritzparis.com", note: "Palace hotel reference for grand symmetry, cream interiors, reservation flow, and refined hospitality hierarchy." },
      { title: "Hotel de Crillon", url: "https://www.rosewoodhotels.com/en/hotel-de-crillon", note: "Neoclassical Paris hotel reference for marble, column rhythm, quiet luxury booking modules, and formal imagery." },
      { title: "Le Meurice", url: "https://www.dorchestercollection.com/paris/le-meurice", note: "Paris palace reference for classical interiors, Louis-style detailing, editorial hospitality pacing, and refined CTA structure." },
      { title: "Le Bristol Paris", url: "https://www.oetkercollection.com/hotels/le-bristol-paris/", note: "Luxury hotel reference for restrained palatial tone, suite cards, garden imagery, and stately service storytelling." },
      { title: "Chateau de Versailles", url: "https://en.chateauversailles.fr/", note: "Cultural architecture reference for symmetry, classical order, gilded restraint, and formal spatial hierarchy." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Neoclassical Interior Website", url: "https://www.pinterest.com/search/pins/?q=neoclassical%20interior%20website%20design", note: "Moodboard reference for marble portals, column spacing, hotel pages, and modern classical interior web direction." },
      { title: "Awwwards - Hotel Websites", url: "https://www.awwwards.com/websites/hotel/", note: "Gallery reference for luxury hospitality interactions, reservation flows, room cards, and high-end editorial pacing." },
      { title: "Dribbble - Neoclassical Website", url: "https://dribbble.com/search/neoclassical%20website", note: "UI reference for neoclassical landing pages, column motifs, formal booking strips, and elegant serif hierarchy." },
    ],
    representativeTraits: ["Column rhythm", "Marble symmetry", "Palace hotel booking strip", "Champagne accent", "Formal center alignment"],
    avoidTraits: ["Baroque darkness", "Rococo pastel playfulness", "Generic real estate template", "Excessive gold ornament"],
    tokenIntent: "Use marble ivory, champagne accents, centered serif type, symmetrical cards, and hotel reservation modules so Neoclassic reads as modern classical hospitality.",
  },
  luxury: {
    referenceSites: [
      { title: "Loewe", url: "https://www.loewe.com", note: "Luxury fashion reference for craft-led imagery, muted surfaces, refined product framing, and spare editorial commerce." },
      { title: "Bottega Veneta", url: "https://www.bottegaveneta.com", note: "Quiet luxury reference for material close-ups, low-copy product hierarchy, leather texture, and restrained navigation." },
      { title: "Celine", url: "https://www.celine.com", note: "Fashion reference for high-end image pacing, black and cream contrast, serif-adjacent restraint, and minimal commerce structure." },
      { title: "Chanel", url: "https://www.chanel.com", note: "Luxury house reference for black white hierarchy, product storytelling, editorial modules, and tightly controlled brand rhythm." },
      { title: "Dior", url: "https://www.dior.com", note: "Couture and beauty reference for polished imagery, refined product detail, campaign sections, and elevated shopping flow." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Luxury Website Design", url: "https://www.pinterest.com/search/pins/?q=luxury%20website%20design", note: "Moodboard reference for premium product pages, fashion imagery, cream black palettes, and restrained luxury layouts." },
      { title: "Awwwards - Luxury Websites", url: "https://www.awwwards.com/websites/luxury/", note: "Gallery reference for high-end web execution, premium imagery, elegant motion, and carefully paced landing pages." },
      { title: "Dribbble - Luxury Website", url: "https://dribbble.com/search/luxury%20website", note: "UI reference for luxury ecommerce cards, refined product detail pages, spare CTAs, and sophisticated editorial grids." },
    ],
    representativeTraits: ["Material close-up", "Low-copy commerce", "Cream black restraint", "Polished product cards", "Silent CTA hierarchy"],
    avoidTraits: ["Generic gold badge luxury", "Busy magazine collage", "Casual lifestyle warmth", "Baroque ornament"],
    tokenIntent: "Use warm ivory, black ink, antique gold, thin rules, and spacious product imagery so Luxury reads as high-end ecommerce rather than decorative premium styling.",
  },
  "old-money": {
    referenceSites: [
      { title: "Loro Piana", url: "https://us.loropiana.com", note: "Quiet luxury reference for cashmere texture, understated product storytelling, neutral palette, and soft heritage pacing." },
      { title: "Brunello Cucinelli", url: "https://shop.brunellocucinelli.com", note: "Heritage luxury reference for humanistic editorial sections, muted wardrobe cards, and refined material presentation." },
      { title: "Ralph Lauren", url: "https://www.ralphlauren.com", note: "Old-money reference for club lifestyle imagery, equestrian and country cues, navy cream palette, and heritage commerce." },
      { title: "Drake's", url: "https://www.drakes.com", note: "Classic menswear reference for relaxed tailoring, editorial lookbook rhythm, and understated product grids." },
      { title: "The Rake", url: "https://therake.com", note: "Classic menswear editorial reference for heritage tone, gentleman wardrobe language, and magazine-commerce crossover." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Old Money Website Design", url: "https://www.pinterest.com/search/pins/?q=old%20money%20website%20design", note: "Moodboard reference for club palettes, quiet luxury wardrobes, heritage interiors, and understated editorial layouts." },
      { title: "Awwwards - Fashion Websites", url: "https://www.awwwards.com/websites/fashion/", note: "Gallery reference for polished fashion web execution, lookbook flow, and premium apparel storytelling." },
      { title: "Dribbble - Old Money Website", url: "https://dribbble.com/search/old%20money%20website", note: "UI reference for old-money landing pages, country club cues, classic fashion cards, and restrained navigation." },
    ],
    representativeTraits: ["Club lifestyle cues", "Cashmere and leather texture", "Forest green and navy", "Crest-like restraint", "Wardrobe cards"],
    avoidTraits: ["Flashy gold luxury", "Streetwear drop language", "Generic preppy cartoon", "Overly polished tech minimalism"],
    tokenIntent: "Use cream, forest green, navy, camel, leather accents, serif display, and calm product cards so Old Money reads as understated heritage.",
  },
  "art-deco": {
    referenceSites: [
      { title: "Claridge's", url: "https://www.claridges.co.uk", note: "Luxury hotel reference for Art Deco glamour, black gold contrast, grand hospitality hierarchy, and refined evening atmosphere." },
      { title: "The Savoy London", url: "https://www.thesavoylondon.com", note: "Historic hotel reference for Deco-era elegance, polished room cards, theatre-like hospitality pacing, and formal navigation." },
      { title: "The Carlyle", url: "https://www.rosewoodhotels.com/en/the-carlyle-new-york", note: "New York hotel reference for Art Deco heritage, jazz lounge mood, luxury room modules, and dark polished composition." },
      { title: "Radio City Music Hall", url: "https://www.msg.com/radio-city-music-hall", note: "Architecture and entertainment reference for Deco vertical rhythm, stage glamour, marquee energy, and geometric spectacle." },
      { title: "Empire State Building", url: "https://www.esbnyc.com", note: "Art Deco landmark reference for stepped geometry, vertical hierarchy, metallic accents, and iconic architectural order." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Art Deco Website Design", url: "https://www.pinterest.com/search/pins/?q=art%20deco%20website%20design", note: "Moodboard reference for fan motifs, gold linework, black backgrounds, geometric borders, and Deco hospitality pages." },
      { title: "Awwwards - Luxury Websites", url: "https://www.awwwards.com/websites/luxury/", note: "Gallery reference for high-end dark luxury sites, polished motion, premium hospitality layouts, and sophisticated visual systems." },
      { title: "Dribbble - Art Deco Website", url: "https://dribbble.com/search/art%20deco%20website", note: "UI reference for Art Deco landing pages, geometric frames, fan patterns, and glamorous hotel or bar interfaces." },
    ],
    representativeTraits: ["Fan geometry", "Stepped vertical rhythm", "Black and brass contrast", "Evening hospitality", "Marquee-like modules"],
    avoidTraits: ["Random gold clutter", "Baroque scrollwork", "Cyber neon nightlife", "Flat retro poster styling"],
    tokenIntent: "Use black lacquer, brass, emerald, double borders, fan arcs, and symmetrical ocean-liner booking modules so Art Deco reads as polished geometric glamour.",
  },
  "art-nouveau": {
    referenceSites: [
      { title: "Mucha Foundation", url: "https://www.muchafoundation.org", note: "Primary visual reference for flowing ornamental line, floral framing, elegant figures, and Art Nouveau poster rhythm." },
      { title: "Horta Museum", url: "https://www.hortamuseum.be/en", note: "Architecture reference for organic ironwork, whiplash curves, interior structure, and decorative spatial flow." },
      { title: "Casa Batllo", url: "https://www.casabatllo.es/en/", note: "Gaudi architecture reference for organic facade rhythm, curved surfaces, color, and immersive decorative storytelling." },
      { title: "V&A - Introduction to Art Nouveau", url: "https://www.vam.ac.uk/articles/an-introduction-to-art-nouveau", note: "Museum reference for plant forms, sinuous lines, glass, metalwork, and the style's decorative vocabulary." },
      { title: "The Met - Art Nouveau", url: "https://www.metmuseum.org/toah/hd/artn/hd_artn.htm", note: "Historical reference for Art Nouveau objects, botanical ornament, material craft, and international decorative language." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Art Nouveau Website Design", url: "https://www.pinterest.com/search/pins/?q=art%20nouveau%20website%20design", note: "Moodboard reference for vine frames, botanical landing pages, perfume packaging, and organic line-based web composition." },
      { title: "Awwwards - Illustration Websites", url: "https://www.awwwards.com/websites/illustration/", note: "Gallery reference for illustrated web craft, ornamental interaction, organic imagery, and polished decorative storytelling." },
      { title: "Dribbble - Art Nouveau Website", url: "https://dribbble.com/search/art%20nouveau%20website", note: "UI reference for Art Nouveau cards, botanical frames, curved product panels, and decorative landing pages." },
    ],
    representativeTraits: ["Whiplash line", "Botanical frame", "Perfume or poster object", "Warm green gold palette", "Organic internal shapes"],
    avoidTraits: ["Generic organic minimalism", "Rococo shell pastel", "Baroque gold heaviness", "Flat botanical clipart"],
    tokenIntent: "Use botanical greens, warm gold, serif type, vine-like internal frames, and curved product modules so Art Nouveau reads as plant-led ornament rather than generic nature style.",
  },
  baroque: {
    referenceSites: [
      { title: "Chateau de Versailles", url: "https://en.chateauversailles.fr/", note: "Palace reference for dramatic interiors, gilded frames, ceremonial hierarchy, and dense classical storytelling." },
      { title: "Louvre", url: "https://www.louvre.fr/en", note: "Museum reference for Baroque painting context, gallery pacing, dark image-led pages, and high-cultural content structure." },
      { title: "Kunsthistorisches Museum Wien", url: "https://www.khm.at/en/", note: "Museum reference for old master imagery, dark gallery atmosphere, gilded heritage, and dramatic art presentation." },
      { title: "Rijksmuseum", url: "https://www.rijksmuseum.nl/en", note: "Art museum reference for Rembrandt-era image drama, collection cards, editorial labels, and museum commerce structure." },
      { title: "Museo del Prado", url: "https://www.museodelprado.es/en", note: "Museum reference for Spanish Baroque collection tone, deep imagery, cultural navigation, and formal exhibition hierarchy." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Baroque Website Design", url: "https://www.pinterest.com/search/pins/?q=baroque%20website%20design", note: "Moodboard reference for candlelit palettes, ornate frames, dramatic contrast, and gallery-like web compositions." },
      { title: "Awwwards - Art Websites", url: "https://www.awwwards.com/websites/art-culture/", note: "Gallery reference for art and culture sites, exhibition pacing, dramatic imagery, and immersive cultural landing pages." },
      { title: "Dribbble - Baroque Website", url: "https://dribbble.com/search/baroque%20website", note: "UI reference for Baroque-inspired landing pages, dark gold interfaces, ornate cards, and theatrical product pages." },
    ],
    representativeTraits: ["Chiaroscuro", "Gilded frame", "Deep wine and black", "Museum gallery rhythm", "Theatrical CTA"],
    avoidTraits: ["Deco fan geometry", "Rococo lightness", "Fantasy castle UI", "Unreadable ornament density"],
    tokenIntent: "Use deep shadows, wine, antique gold, serif display, framed hero imagery, and dramatic museum modules so Baroque reads as theatrical luxury.",
  },
  rococo: {
    referenceSites: [
      { title: "Wallace Collection", url: "https://www.wallacecollection.org", note: "Collection reference for Rococo interiors, porcelain, gilt, pastel rooms, and refined decorative object presentation." },
      { title: "The Frick Collection", url: "https://www.frick.org", note: "Museum reference for intimate salon rhythm, decorative arts, calm collection cards, and refined interior storytelling." },
      { title: "Getty Collection", url: "https://www.getty.edu/art/collection/", note: "Collection reference for French decorative arts, porcelain, furniture, object detail, and museum-grade visual hierarchy." },
      { title: "The Met - Rococo", url: "https://www.metmuseum.org/toah/hd/roco/hd_roco.htm", note: "Historical reference for Rococo lightness, asymmetry, shell ornament, pastel palette, and intimate decorative style." },
      { title: "V&A - Rococo", url: "https://www.vam.ac.uk/articles/rococo", note: "Museum reference for shell curves, delicate ornament, pale color, and the ornamental language of Rococo design." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Rococo Website Design", url: "https://www.pinterest.com/search/pins/?q=rococo%20website%20design", note: "Moodboard reference for pastel salon pages, shell ornaments, porcelain cards, beauty products, and light decorative layouts." },
      { title: "Awwwards - Luxury Websites", url: "https://www.awwwards.com/websites/luxury/", note: "Gallery reference for polished premium web pacing, delicate product sections, and refined lifestyle landing pages." },
      { title: "Dribbble - Rococo Website", url: "https://dribbble.com/search/rococo%20website", note: "UI reference for Rococo-inspired beauty pages, pastel cards, ornamental panels, and elegant product grids." },
    ],
    representativeTraits: ["Pastel salon", "Shell curve", "Porcelain product cards", "Light asymmetry", "Delicate gold"],
    avoidTraits: ["Baroque heavy darkness", "Kawaii pastel childishness", "Minimal beige flatness", "Art Nouveau vine line"],
    tokenIntent: "Use porcelain cream, blush, pale blue, delicate gold, serif type, and shell-like internal cards so Rococo reads as light ornamental luxury.",
  },
  gothic: {
    referenceSites: [
      { title: "Westminster Abbey", url: "https://www.westminster-abbey.org", note: "Gothic architecture reference for pointed arches, stone rhythm, sacred verticality, and historic visitor page hierarchy." },
      { title: "Notre-Dame de Paris", url: "https://www.notredamedeparis.fr/en/", note: "Cathedral reference for Gothic facade language, restoration storytelling, vertical navigation, and stained-glass atmosphere." },
      { title: "Cologne Cathedral", url: "https://www.koelner-dom.de/en", note: "Cathedral reference for spires, dark stone, sacred scale, visitor information, and vertical architectural rhythm." },
      { title: "The Met - Gothic Art", url: "https://www.metmuseum.org/toah/hd/mgot/hd_mgot.htm", note: "Historical reference for Gothic art, pointed forms, religious objects, stained glass, and medieval visual language." },
      { title: "V&A - Gothic Style", url: "https://www.vam.ac.uk/articles/gothic-style", note: "Museum reference for Gothic arches, tracery, stonework, manuscript detail, and decorative structural vocabulary." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Gothic Website Design", url: "https://www.pinterest.com/search/pins/?q=gothic%20website%20design", note: "Moodboard reference for dark cathedral pages, pointed arch motifs, stained glass palettes, and sacred editorial layouts." },
      { title: "Awwwards - Dark Websites", url: "https://www.awwwards.com/websites/dark/", note: "Gallery reference for polished dark web execution, strong contrast, dramatic imagery, and immersive atmospheric pages." },
      { title: "Dribbble - Gothic Website", url: "https://dribbble.com/search/gothic%20website", note: "UI reference for Gothic landing pages, pointed-arch cards, dark fashion pages, and stained-glass interface motifs." },
    ],
    representativeTraits: ["Pointed arch", "Stone verticality", "Stained glass color", "Dark sacred mood", "Vaulted modules"],
    avoidTraits: ["Halloween novelty", "Cyberpunk dark neon", "Baroque candle palace", "Generic black fashion page"],
    tokenIntent: "Use charcoal stone, wine, blue glass, aged gold, serif type, sharp arches, and vertical modules so Gothic reads as cathedral structure rather than generic dark style.",
  },
};

const styleContentOverrides: Record<string, StyleContentOverride> = {
  "high-tech": {
    summary: "하이테크는 실존 첨단 인프라를 다크 그래파이트 위 정밀 계측 UI로 운영하는 스타일 — 장식이 아니라 값·단위·상태가 첨단 이미지를 만듭니다.",
    description:
      "MILLIKELVIN 샘플은 퀀텀 컴퓨팅 클라우드의 QPU 관제 플레인으로 하이테크의 핵심을 보여줍니다. 골드 희석냉동기 실사 위에 겹친 cryostat 스테이지 래더(300 K→12.9 mK), fidelity 컬러로 읽는 qubit lattice, 선택 큐빗과 연동되는 calibration readout과 job queue가 실제 운영 도구처럼 작동합니다. 민트는 live·정상, 블루는 데이터, 앰버는 주의 상태에만 제한하고 모든 수치는 탭형 모노스페이스로 정렬해 '정밀한 소프트웨어 운영'이라는 인상을 만듭니다.",
    visualFeatures: [
      "다크 그래파이트 패널과 헤어라인 보더가 계측 장비의 정밀함을 만듭니다.",
      "실존 장비(희석냉동기) 스키매틱과 실사가 첨단 도메인을 즉시 설명합니다.",
      "fidelity 컬러 노드의 qubit lattice가 시스템 상태를 한눈에 보여줍니다.",
      "탭형 모노스페이스 수치와 단위가 모든 값에 붙어 데이터 신뢰를 만듭니다.",
    ],
    colorPalette: ["다크 그래파이트 베이스", "민트 라이브 상태", "블루 데이터 강조", "앰버 주의 신호", "쿨 그레이 메타"],
    typography: ["크리스프 산세리프 헤드라인", "탭형 모노스페이스 판독값", "값보다 약한 대문자 트래킹 라벨"],
    layoutTraits: [
      "얇은 앱 크롬 아래 3열 관제 그리드",
      "실사 배경 위 세로 cryostat 스테이지 래더",
      "중앙 헤드라인과 qubit lattice 맵",
      "선택 상태와 연동되는 calibration·queue 컬럼",
    ],
    useCases: ["개발자 플랫폼", "인프라 관제 콘솔", "연구 장비 모니터링", "엔터프라이즈 옵저버빌리티"],
    goodFor: ["첨단 기술력이 곧 브랜드인 제품의 관제 화면", "고밀도 텔레메트리를 신뢰감 있게 보여야 하는 콘솔", "정밀 계측·상태 데이터가 주인공인 인터페이스"],
    cautions: [
      "라벨 없는 그래프와 장식용 수치를 늘리지 말고 모든 값에 단위와 상태 목적을 부여해야 합니다.",
      "민트·앰버 강조가 넓은 면적을 채우면 사이버펑크로 미끄러지므로 상태 신호에만 제한해야 합니다.",
      "모바일에서는 보조 컬럼을 먼저 접고 시그니처 계기(cryostat 래더·lattice·선택 판독값)는 남겨야 합니다.",
    ],
    imagePrompt:
      "A dramatic vertical photograph of a gold-plated dilution refrigerator chandelier of a superconducting quantum computer in a dark precision laboratory, polished gold discs and neat coaxial cable looms, near-black graphite background, cold blue rim light, no text, no logo, no watermark, no people",
  },
  hud: {
    summary: "HUD는 실제 장면 위에 비행 계기와 경로 정보를 직접 겹쳐, 시선을 떼지 않고 상태와 목표를 읽게 만드는 헤드업 디스플레이(FUI) 스타일입니다.",
    description:
      "HUD는 카드형 대시보드가 아니라 카메라나 시야 장면 자체를 주 화면으로 사용합니다. KESTREL GCS 샘플처럼 중앙의 pitch ladder·flight-path vector·레티클, 양쪽 속도·고도 테이프, 모서리 임무 상태, 장면에 고정된 waypoint가 하나의 계기 체계로 작동해야 합니다. 아이스 블루 모노라인은 정상 계기, 앰버는 실제 주의 상태에만 제한해 정보 밀도가 높아도 시선 경로가 흐트러지지 않게 합니다.",
    visualFeatures: [
      "첫인칭 장면 위에 얇은 아이스 블루 계기선을 직접 겹쳐 표시합니다.",
      "중앙 pitch ladder, roll arc, flight-path vector가 같은 광학 중심을 공유합니다.",
      "속도·고도 데이터 테이프와 waypoint 유도선이 실제 운항 상태를 설명합니다.",
      "앰버는 배터리와 풍속 같은 주의 신호에만 작은 면적으로 사용합니다.",
    ],
    colorPalette: ["근흑색 광학 프레임", "아이스 블루 주 계기", "페일 시안 보조 텔레메트리", "앰버 주의 상태"],
    typography: ["좁은 모노스페이스 라벨", "탭형 숫자 판독값", "값보다 어두운 단위와 상태 메타"],
    layoutTraits: [
      "풀블리드 장면 위 중앙 비행 계기",
      "좌우에 고정된 속도·고도 데이터 테이프",
      "네 모서리에 분산된 임무·링크·배터리 상태",
      "선택 waypoint와 연동되는 하단 telemetry rail",
    ],
    useCases: ["드론 관제", "차량·항공 AR", "시뮬레이션", "실시간 임무 모니터링"],
    goodFor: ["장면을 보면서 동시에 상태를 판단해야 하는 관제 화면", "공간 좌표와 목표물의 관계가 중요한 인터페이스", "비행·주행·시뮬레이션용 실시간 시각화"],
    cautions: [
      "장식용 원과 선을 무작위로 늘리지 말고 모든 계기에 값·단위·상태 목적을 부여해야 합니다.",
      "글로우가 장면을 덮지 않도록 활성 계기 주변에만 좁게 사용해야 합니다.",
      "모바일에서는 눈금 수를 먼저 줄이고 현재값·중앙 계기·선택 목표는 남겨야 합니다.",
    ],
    imagePrompt:
      "A cinematic realistic first-person survey-drone view over a coastal harbor at blue hour, cold graphite and ice-blue atmosphere, open central field for flight symbology, tiny amber shoreline lights, no UI baked into the image, no text, no logo, no watermark",
  },
  "hologram-style": {
    summary: "홀로그램 스타일은 한 장의 반투명 카드가 아니라, 스캔 단면과 재구성 볼륨·측정 좌표가 서로 다른 깊이에 놓이는 광학 인터페이스입니다.",
    description:
      "LUMA VOLUME은 밝은 임상 연구실의 해부학 볼륨 뷰어로 홀로그램의 핵심을 보여줍니다. 후면 좌표 그리드, coronal slice, 중앙 해부학 볼륨, 전면 공간 측정의 네 평면이 분리되고 Tissue·Vessel·Bone 모드와 slice control이 실제 시각 상태를 바꿉니다. 펄 화이트 바탕 위 시안과 바이올렛은 깊이 경계에만, 페일 앰버는 측정 초점에만 써서 글래스모피즘이나 메타버스식 네온 패널과 구분합니다.",
    visualFeatures: [
      "후면 그리드, coronal slice, 재구성 볼륨, 측정 레이어가 네 깊이 평면으로 분리됩니다.",
      "Tissue·Vessel·Bone 모드가 조직 강조와 스캔 시리즈·측정값을 함께 바꿉니다.",
      "slice control, orientation cube, spatial measurement가 실제 의료 영상 도구처럼 작동합니다.",
      "펄 화이트 환경에서 시안·바이올렛 분광 가장자리와 작은 페일 앰버 측정광만 사용합니다.",
    ],
    colorPalette: ["펄 화이트 임상 표면", "절제된 시안 광학선", "바이올렛 깊이 경계", "페일 앰버 측정 초점", "쿨 그레이 좌표선"],
    typography: ["좁고 정밀한 대문자 메타", "탭형 수치와 단위", "판독값보다 약한 임상 라벨"],
    layoutTraits: ["중앙 해부학 볼륨 중심의 진단 챔버", "좌측 스캔 메타와 우측 모드·슬라이스 제어", "하단 reconstruction sequence", "장면에 고정된 orientation과 측정 좌표"],
    useCases: ["의료 영상", "과학 볼류메트릭 데이터", "공간 시뮬레이션", "3D 검사"],
    goodFor: ["단면과 전체 볼륨을 동시에 비교하는 진단 도구", "깊이별 데이터 관계를 조작해야 하는 과학 인터페이스", "3D 모델의 방향과 치수를 판독하는 검사 화면"],
    cautions: ["반투명 카드만 겹치면 글래스모피즘으로 보이므로 깊이 평면마다 정보 역할을 부여해야 합니다.", "분광색을 넓은 무지개 면으로 쓰지 말고 물체 가장자리와 활성 단면에 제한해야 합니다.", "해부학 이미지는 비고어 임상 시각화로 유지하고 장식적 SF 인체로 과장하지 않아야 합니다."],
    imagePrompt: "Bright pearl-white clinical research laboratory, one central translucent non-gory human torso anatomical reconstruction from medical scan slices, visible coronal slice separation and genuine volumetric depth, restrained cyan and violet spectral edges, one pale amber measurement highlight, precision optical imaging, quiet clean atmosphere, no readable text, no gore, no dark cyberpunk, no floating glass dashboard, no chrome hardware, landscape 16:10",
  },
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
    summary: "브루탈리즘은 장식된 카드 UI보다 raw content, 실제 링크, 기본 폼, 표 구조를 드러내 웹의 재료 자체를 보여주는 스타일입니다.",
    description:
      "브루탈리즘은 예쁜 포스터 효과가 아니라 실제 웹 구조의 날것을 전면에 보이는 방식입니다. Brutalist Websites, Brutalist Web Design, Secession처럼 underlined link, 기본 버튼처럼 보이는 버튼, 스크롤 가능한 콘텐츠, 표/디렉터리형 정보 구조가 핵심입니다.",
    visualFeatures: ["밑줄 링크와 기본 폼 컨트롤이 기능을 숨기지 않습니다.", "표, 파일 목록, 디렉터리 구조가 화면의 주된 골격이 됩니다.", "색은 링크 블루, 방문 링크 퍼플, 경고 레드처럼 웹 기본 신호에 가깝게 씁니다."],
    colorPalette: ["흰색과 검정이 가장 중요한 구조색입니다.", "링크 블루와 방문 링크 퍼플을 기능 신호로 둡니다.", "빨강은 경고나 서버 상태처럼 제한적으로 사용합니다."],
    typography: ["제목은 크고 무겁지만 장식적 포스터보다 문서 제목처럼 보여야 합니다.", "본문과 표 라벨은 모노 또는 시스템 폰트처럼 직접적이어야 합니다.", "정제된 세리프나 부드러운 스크립트는 피합니다."],
    layoutTraits: ["목록, 표, 색인, 기본 폼이 실제 HTML 문서처럼 보입니다.", "카드와 그림자보다 행, 칸, 밑줄 링크를 우선합니다.", "모바일에서도 링크와 버튼이 명확히 클릭 가능한 요소처럼 남아야 합니다."],
    useCases: ["문화 기관", "실험적 포트폴리오", "패션 캠페인", "아카이브 인덱스"],
    goodFor: ["강한 태도와 비상업적 이미지를 보여줄 때", "정보 구조 자체를 시각 언어로 쓰는 사이트", "브랜드가 일부러 거칠고 직접적으로 보여야 할 때", "포스터보다 실제 인덱스형 웹이 필요한 경우"],
    cautions: ["텍스트가 많을수록 정렬 규칙이 없으면 그냥 깨진 화면처럼 보입니다.", "너무 귀여운 색과 그림자를 쓰면 New Brutalism으로 넘어갑니다.", "접근성과 클릭 가능성이 불분명해지지 않게 해야 합니다."],
    imagePrompt:
      "A brutalist web index reference image with raw black borders, table rows, default-like buttons, stark white and paper background, red warning accent, plain navigation, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Brutalist Websites", url: "https://brutalistwebsites.com", note: "Reference archive for raw HTML structure, default-looking controls, hard borders, and deliberately plain web composition." },
        { title: "Brutalist Web Design", url: "https://brutalist-web.design/", note: "Guideline reference for readable raw content, underlined links, button-like buttons, normal scrolling, and performance-first web construction." },
        { title: "Secession", url: "https://www.secession.at", note: "Cultural reference for table-like structure, strict columns, plain surfaces, and brutalist institutional web rhythm." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Brutalist Website Design", url: "https://www.pinterest.com/search/pins/?q=brutalist%20website%20design", note: "Moodboard reference for raw typography, stark black-white layouts, exposed boxes, and intentionally severe web surfaces." },
        { title: "Awwwards - Brutalism Collection", url: "https://www.awwwards.com/awwwards/collections/brutalism/", note: "Gallery reference for award-level brutalist executions, including hard grids, exposed UI, oversized type, and rough interaction cues." },
        { title: "Dribbble - Brutalist Website", url: "https://dribbble.com/tags/brutalist_website", note: "UI reference for brutalist cards, thick borders, raw navigation, stark CTAs, and component-level layout tension." },
      ],
      representativeTraits: ["Raw web index", "Underlined links", "Default-like controls", "Hard monochrome structure", "Direct information rows"],
      avoidTraits: ["Playful neo-brutalist shadows", "Polished luxury whitespace", "Decorative poster-only layout"],
      tokenIntent:
        "Use monochrome surfaces, raw table rows, underlined links, default-like form controls, no radius, and no shadows so the style reads as real web brutalism.",
    },
  },
  "new-brutalism": {
    summary: "뉴 브루탈리즘은 브루탈리즘의 두꺼운 선과 직접성을 앱 UI에 맞게 밝은 색, 오프셋 그림자, 큰 버튼으로 재해석한 스타일입니다.",
    description:
      "뉴 브루탈리즘은 raw HTML보다 더 제품 UI적이고 장난스럽습니다. Gumroad, Neubrutalism Guide, Neo Brutalism UI, BrutxUI처럼 3px 안팎의 검은 테두리, zero-blur 오프셋 그림자, 납작한 고채도 색, 폼/카드/대시보드 컴포넌트가 실제 앱 화면처럼 보이게 해야 합니다.",
    visualFeatures: ["두꺼운 검정 선과 단색 그림자가 가장 강한 신호입니다.", "카드, 입력창, 버튼이 모두 물리적인 블록처럼 보입니다.", "밝은 노랑, 초록, 보라 같은 색이 UI 상태를 명확히 나눕니다."],
    colorPalette: ["밝은 노랑 또는 크림을 기본 배경으로 둡니다.", "검정은 모든 테두리와 텍스트의 기준입니다.", "원색 액센트를 버튼, 알림, 가격 카드에 씁니다."],
    typography: ["굵은 제목과 두꺼운 버튼 텍스트를 사용합니다.", "본문도 약간 무겁게 두어 블록감이 유지되게 합니다.", "글자 간격보다 면과 선의 힘으로 개성을 만듭니다."],
    layoutTraits: ["셀프 키오스크 상태보드와 컨트롤 패널처럼 구성됩니다 — 머신 타일, 코스 폼, 요금표가 실제 앱처럼 놓입니다.", "각 모듈은 독립적인 박스처럼 명확하게 분리됩니다.", "모바일에서도 큰 터치 타깃과 그림자가 남아야 합니다."],
    useCases: ["크리에이터 플랫폼", "SaaS 대시보드", "교육 앱", "가격/구독 페이지"],
    goodFor: ["친근하지만 강한 제품 UI", "복잡하지 않은 앱 기능 소개", "크리에이터/개발자 대상 서비스", "명확한 CTA가 필요한 랜딩"],
    cautions: ["그림자와 색을 너무 많이 겹치면 가독성이 떨어집니다.", "일반 브루탈리즘보다 더 앱 구조가 보여야 합니다.", "모서리와 두께 규칙이 흔들리면 유치해 보일 수 있습니다."],
    imagePrompt:
      "A neo brutalist product dashboard website reference image with thick black borders, yellow background, offset shadows, bright app cards, chunky buttons, pricing widgets, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Gumroad", url: "https://gumroad.com", note: "Product reference for playful digital brutalism, thick outline cards, blunt commerce hierarchy, and saturated accent blocks." },
        { title: "Neubrutalism Guide", url: "https://neubrutalism.com/", note: "Design-language reference for flat fills, thick outlines, hard shadows, square corners, and commercial product UI token systems." },
        { title: "Neo Brutalism UI", url: "https://neobrutalism.dev/", note: "Component reference for offset shadows, heavy borders, direct controls, high-contrast panels, and web-native neo-brutalist rules." },
        { title: "BrutxUI", url: "https://www.brutxui.site/docs", note: "Component-library reference for neo-brutalist SaaS, dashboard, form, pricing, and utility interfaces with configurable borders and hard shadows." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Neo Brutalism Web Design", url: "https://www.pinterest.com/search/pins/?q=neo%20brutalism%20web%20design", note: "Moodboard reference for chunky outlines, playful shadows, saturated panels, and intentionally simple app interfaces." },
        { title: "Awwwards - Brutalism Collection", url: "https://www.awwwards.com/awwwards/collections/brutalism/", note: "Gallery reference for brutalist and neo-brutalist web executions, hard-edged modules, and expressive web-native structures." },
        { title: "Dribbble - Neo Brutalism", url: "https://dribbble.com/tags/neo-brutalism", note: "UI reference for neo-brutalist dashboards, cards, buttons, pricing blocks, and high-contrast product surfaces." },
      ],
      representativeTraits: ["Raw component kit", "Native form controls", "Pricing table", "Offset shadows", "Thick black buttons"],
      avoidTraits: ["Postmodern cultural collage", "Classical quotation", "Raw archival brutalism", "Anti-design disorder", "Soft rounded minimalism"],
      tokenIntent:
        "Use bright panels, thick black outlines, block shadows, compact spacing, native form controls, pricing tables, obvious buttons, and app-like modules so the style reads as neo brutalism rather than postmodernism.",
    },
  },
  "anti-design": {
    summary: "안티디자인은 균형, 정렬, 세련됨을 일부러 비틀어 불편하지만 기억에 남는 실험적 웹 경험을 만드는 스타일입니다.",
    description:
      "안티디자인은 실수처럼 보이는 것이 아니라, 관습을 깨는 의도적인 연출입니다. Bryantcodes와 Dribbble의 anti-design 샷처럼 포트폴리오, 프로젝트 카드, 앱 화면 같은 실제 웹 구조 위에 거대한 그래픽 제스처, 비정형 패널, 의도적인 크롭과 오프그리드 배치를 얹어야 합니다.",
    visualFeatures: ["거대한 손그림 제스처와 낙서 같은 선이 구조 위를 가로지릅니다.", "포트폴리오/프로젝트 카드처럼 실제 콘텐츠 단위가 남아 있습니다.", "패널 모양과 위치는 이상하지만 읽기 순서는 의도적으로 유지됩니다."],
    colorPalette: ["하얀 캔버스나 거의 비어 있는 배경을 기본으로 둘 수 있습니다.", "라임, 사이언, 마젠타 같은 날것의 그래픽 색을 크게 씁니다.", "검정 또는 짙은 남색 패널이 시선을 잡아줍니다."],
    typography: ["큰 제목은 정돈된 산세리프를 쓰되 과감하게 잘리거나 겹칠 수 있습니다.", "프로젝트명, 메타, 연락처 같은 정보는 작은 UI 라벨로 남깁니다.", "타입 자체보다 배치, 크롭, 제스처가 불안정함을 만듭니다."],
    layoutTraits: ["크리에이티브 개발자 포트폴리오, 실험적 스튜디오, 프로젝트 쇼케이스에 어울립니다.", "장식은 과격해도 실제 프로젝트 카드와 연락 동선은 보이게 둡니다.", "모바일에서는 그래픽 제스처를 줄이고 핵심 패널을 먼저 보여줍니다."],
    useCases: ["크리에이티브 포트폴리오", "실험적 스튜디오", "아트 프로젝트", "인터랙티브 캠페인"],
    goodFor: ["기억에 남는 첫인상이 필요한 포트폴리오", "실험적 개발/디자인 역량을 보여주는 사이트", "정돈된 기업 이미지보다 강한 개성을 앞세우는 브랜드", "프로젝트 쇼케이스를 하나의 경험으로 만들고 싶을 때"],
    cautions: ["랜덤한 깨짐으로 보이면 anti-design이 아니라 미완성처럼 보입니다.", "그래픽 제스처가 텍스트와 CTA를 덮지 않게 조절해야 합니다.", "과한 모션이나 점멸은 접근성 문제가 생길 수 있습니다."],
    imagePrompt:
      "An anti-design creative developer portfolio website reference image with white canvas, huge hand-drawn neon green cyan magenta gestures, irregular dark hero panel, off-grid project cards, readable content, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Bryantcodes", url: "https://bryantcodes.art/", note: "Creative developer portfolio reference for massive hand-drawn neon gestures, irregular dark focal forms, experimental web craft, and project-led storytelling." },
        { title: "Superbad", url: "https://www.superbad.com", note: "Historical web reference for intentionally awkward composition, early-web friction, clashing visuals, and anti-polished navigation." },
        { title: "The HTML Review", url: "https://thehtml.review/", note: "Independent web reference for strange editorial systems, raw HTML feeling, unexpected layouts, and handcrafted anti-design energy." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Anti Design Website", url: "https://www.pinterest.com/search/pins/?q=anti%20design%20website", note: "Moodboard reference for clashing layouts, deliberate imbalance, uncomfortable type scale, and anti-commercial web composition." },
        { title: "Awwwards - Experimental Websites", url: "https://www.awwwards.com/websites/experimental/", note: "Gallery reference for unconventional web systems, broken expectations, experimental navigation, and intentionally unstable visual rhythm." },
        { title: "Dribbble - Anti Design", url: "https://dribbble.com/tags/anti-design", note: "UI reference for anti-design portfolios, experimental app shots, scribbled overlays, off-grid cards, and weird but intentional digital surfaces." },
      ],
      representativeTraits: ["Hand-drawn gestures", "Experimental portfolio shell", "Irregular hero panel", "Off-grid project cards", "Readable weirdness"],
      avoidTraits: ["Random broken UI", "Cute neo-brutalist order", "Generic neon link hub"],
      tokenIntent:
        "Use a mostly white canvas, huge graphic gestures, irregular dark panels, small project metadata, and off-grid composition while keeping the portfolio structure readable.",
    },
  },
  maximalism: {
    summary: "맥시멀리즘은 '더 많은 것이 더 좋다'는 태도로 색, 패턴, 장식, 이미지를 겹겹이 쌓되, 반복과 위계로 과잉을 통제해 몰입감을 만드는 스타일입니다.",
    description:
      "맥시멀리즘은 미니멀리즘의 절제 대신 풍요를 선택하는 언어입니다. 핵심은 무작정 채우는 것이 아니라 통제된 과잉 — 패턴 위에 패턴을 겹치고 시대와 모티프를 절충적으로 섞으면서도, 반복 리듬과 명확한 초점으로 시선을 이끕니다. House of Hackney, FARM Rio, Meow Wolf처럼 화면이 가득 차 있어도 중심 행동은 분명해야 합니다.",
    visualFeatures: ["패턴 위에 패턴을 겹치는 클래시를 두려움 없이 쓰되, 반복 리듬으로 통제합니다.", "이미지, 장식 프레임, 라벨이 여러 층으로 쌓여 밀도 자체가 스타일이 됩니다.", "장식 사이에서도 가격, 컬렉션, CTA 같은 정보 위계는 살아 있어야 합니다."],
    colorPalette: ["짙은 플럼, 보틀 그린, 버건디 같은 주얼톤을 바탕색으로 씁니다.", "골드·황동 액센트가 헤어라인과 장식에서 리듬을 만듭니다.", "패턴이 많을수록 텍스트 대비를 의식적으로 확보합니다."],
    typography: ["장식적 세리프 디스플레이와 절제된 라벨을 대비시켜 씁니다.", "본문은 짧게 유지해 장식 밀도에 묻히지 않게 합니다.", "CTA는 하나만 강하게 — 골드처럼 확실한 고대비로 처리합니다."],
    layoutTraits: ["살롱월처럼 밀집된 콜라주 구성이지만 초점 모듈은 분명합니다.", "대칭보다 풍부한 레이어와 시선 이동을 우선합니다.", "모바일에서는 레이어 수를 줄이고 핵심 모듈부터 보여줍니다."],
    useCases: ["패턴·인테리어 하우스", "패션 캠페인", "라이프스타일 편집숍", "한정 컬렉션"],
    goodFor: ["브랜드 세계관이 강한 커머스", "시각 자산이 풍부한 캠페인", "고객이 둘러보는 재미를 느껴야 하는 페이지", "평범한 제품 목록을 무대로 바꾸고 싶을 때"],
    cautions: ["정보 위계 없이 쌓으면 혼잡한 화면이 됩니다.", "모든 색을 같은 비중으로 쓰면 CTA가 사라집니다.", "성능과 이미지 로딩도 함께 고려해야 합니다."],
    imagePrompt:
      "A maximalist pattern-house website reference image with layered botanical wallpaper, jewel-tone velvet, gilt frames, ornate badges, dense but readable commerce hierarchy, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "House of Hackney", url: "https://www.houseofhackney.com/", note: "Interiors maximalism reference for pattern-on-pattern wallpaper, jewel palettes, ornate serif branding, and dense yet controlled commerce." },
        { title: "FARM Rio", url: "https://farmrio.com/", note: "Fashion maximalism reference for saturated prints, joyful pattern density, tropical color, and expressive product storytelling." },
        { title: "Meow Wolf", url: "https://meowwolf.com/", note: "Immersive arts reference for maximal color, layered worlds, dense visual storytelling, and experience-led web composition." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Maximalist Website Design", url: "https://www.pinterest.com/search/pins/?q=maximalist%20website%20design", note: "Moodboard reference for saturated color, layered pattern, dense composition, eclectic type, and decorative web scenes." },
        { title: "Awwwards - Colorful Websites", url: "https://www.awwwards.com/websites/colorful/", note: "Closest gallery reference for award-level maximal color, bold visual systems, ornamental motion, and dense campaign pages." },
        { title: "Dribbble - Maximalism", url: "https://dribbble.com/tags/maximalism", note: "UI reference for pattern-rich landing pages, expressive product cards, layered hero modules, and decorative component systems." },
      ],
      representativeTraits: ["Layered pattern", "Saturated jewel color", "Dense product world", "Decorative badges", "Clear high-contrast CTA"],
      avoidTraits: ["Random clutter", "Muted vintage catalog", "Single-color dopamine UI"],
      tokenIntent:
        "Use deep jewel palettes, layered pattern surfaces, dense commerce modules, hairline gilt dividers, and one gold high-contrast CTA so the style reads as contemporary maximalism.",
    },
  },
  "glitch-art": {
    summary: "글리치 아트는 오류처럼 보이는 장식이 아니라 압축, 신호, 하드웨어와 소프트웨어 제약이 남긴 흔적을 화면 구조로 번역하는 디지털 실험 스타일입니다.",
    description:
      "글리치 아트는 사이버펑크식 네온 장식보다 매체의 결함이 드러나는 순간에 집중합니다. Rosa Menkman의 글리치 연구, APRJA의 압축 아티팩트 논의, GLI.TC/H 커뮤니티 자료를 기준으로 보면 글리치는 무작위 노이즈가 아니라 파일 포맷, 코덱, 신호 처리, 디스플레이 장치가 만든 규칙적인 흔적입니다. 웹에서는 RGB 분리, 매크로블록, 스캔라인, 체크섬 로그, 손상된 패널을 실제 진단 인터페이스처럼 배치해야 스타일이 설득력을 얻습니다.",
    visualFeatures: ["RGB 채널 분리와 프레임 밀림으로 신호가 어긋난 순간을 보여줍니다.", "압축 매크로블록, 픽셀 정렬 붕괴, 스캔라인이 화면의 물성을 드러냅니다.", "터미널 로그, 체크섬, 버퍼 상태 같은 UI 텍스트가 오류의 원인을 암시합니다.", "밝은 사이언, 마젠타, 애시드 라임이 어두운 패널 위에서 충돌합니다."],
    colorPalette: ["검정에 가까운 남청색 배경을 사용해 디스플레이 내부처럼 보이게 합니다.", "사이언은 신호와 경계선, 마젠타는 채널 손상과 경고에 씁니다.", "라임은 상태값이나 검출 포인트에만 제한적으로 사용합니다.", "표면색은 완전한 검정보다 약간 푸른 회색으로 둬 패널 층위를 만듭니다."],
    typography: ["모노스페이스 폰트로 로그, 패킷, 상태값을 기술 문서처럼 보이게 합니다.", "제목은 굵고 짧게 쓰며 RGB 잔상과 클립 효과로 손상을 줍니다.", "긴 문단보다 코드, 수치, 시간 코드, 오류 메시지 같은 단위를 우선합니다.", "한글 설명은 작은 캡션으로 두고 주요 시각 신호는 짧은 영문 로그로 보조합니다."],
    layoutTraits: ["진단 콘솔, 미디어 플레이어, 실시간 신호 분석 화면처럼 패널을 구성합니다.", "패널은 흐트러져도 정보의 시작점과 CTA 위치는 고정합니다.", "노이즈는 배경층에 두고 본문 텍스트 위에는 직접 얹지 않습니다.", "모바일에서는 효과 밀도를 낮추고 로그, 상태 카드, 주요 제목 순서로 단순화합니다."],
    useCases: ["디지털 아트 전시", "실험 음악 캠페인", "게임 티저", "미디어 연구 아카이브"],
    goodFor: ["오류와 불안정성을 주제로 삼는 전시", "데이터, 영상, 사운드 기반 프로젝트", "짧고 강한 인터랙션이 필요한 티저", "완성된 제품보다 실험 과정과 시스템을 보여줘야 하는 브랜드"],
    cautions: ["글리치가 필터처럼만 보이면 단순 사이버 장식으로 흐릅니다.", "광과민 사용자를 위해 빠른 점멸과 반복 플래시는 피해야 합니다.", "왜곡 효과가 본문 위계를 깨지 않도록 정보 패널은 충분히 읽혀야 합니다.", "Cyberpunk와 구분하려면 도시, 네온, 금속보다 파일 손상과 신호 오류를 우선합니다."],
    imagePrompt:
      "A glitch art web interface reference image with dark diagnostic panels, compression macroblocks, RGB split typography, scanline texture, checksum logs, cyan magenta lime accents, corrupted data widgets, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Rosa Menkman - The Glitch Moment(um)", url: "https://networkcultures.org/_uploads/NN%234_RosaMenkman.pdf", note: "Primary theory reference for glitch as technical, cultural, critical, and aesthetic practice beyond surface decoration." },
        { title: "APRJA - Calculated Error", url: "https://aprja.net//article/view/115426", note: "Research reference for compression artefacts, macroblocks, and the idea that glitches are shaped by computational systems rather than pure randomness." },
        { title: "GLI.TC/H - Beyond Resolution", url: "https://beyondresolution.info/GLI-TC-H", note: "Community reference for glitch artists, theorists, coders, workshops, screenings, and open research around glitch culture." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Glitch Website Design", url: "https://www.pinterest.com/search/pins/?q=glitch%20website%20design", note: "Moodboard reference for RGB splits, broken scanlines, noisy panels, digital corruption, and distorted typography." },
        { title: "Awwwards - Experimental Websites", url: "https://www.awwwards.com/websites/experimental/", note: "Gallery reference for interactive experimental sites, digital distortion, non-linear motion, and unconventional interface effects." },
        { title: "Dribbble - Glitch Website", url: "https://dribbble.com/search/glitch%20website", note: "UI reference for glitch dashboards, corrupted type treatments, scanline overlays, and cyber interface modules." },
      ],
      representativeTraits: ["Compression macroblocks", "RGB channel drift", "Checksum logs", "Scanline damage", "Dark diagnostic panels"],
      avoidTraits: ["Decorative cyber neon", "Random noise filter", "Unreadable flash effects", "Generic game HUD"],
      tokenIntent:
        "Use dark diagnostic surfaces, mono typography, dashed borders, glitch shadows, compact spacing, and cyan magenta channel contrast so the style reads as system damage.",
    },
  },
  deconstructivism: {
    summary: "디컨스트럭티비즘은 그리드를 무작위로 비트는 것이 아니라 안정, 조화, 통일성이라는 구조의 전제를 흔들어 긴장감 있는 화면을 만드는 스타일입니다.",
    description:
      "디컨스트럭티비즘은 1988년 MoMA의 Deconstructivist Architecture 전시와 Mark Wigley의 설명처럼 붕괴처럼 보이지만 실제로는 구조적으로 통제된 불안정성에서 힘을 얻습니다. 웹에서는 카드와 이미지가 단순히 기울어지는 수준을 넘어, 대각선 축, 절단면, 노출된 구조선, 프로젝트 인덱스가 서로 밀고 당기며 화면의 내부 구조를 보여줘야 합니다.",
    visualFeatures: ["카드, 이미지, 선이 정렬축에서 벗어나도 전체 읽기 흐름은 유지됩니다.", "대각선 겹침, 절단된 면, 드러난 구조선이 건축적 긴장을 만듭니다.", "전통적인 사각형이 뒤틀리거나 벌어져 내부 구조가 보이는 듯 구성됩니다.", "콘크리트 중성색 위에 산화 빨강과 블루프린트 파랑을 방향 신호로 사용합니다."],
    colorPalette: ["콘크리트와 도면지를 닮은 베이지, 회색 배경을 기본으로 둡니다.", "검정 또는 짙은 먹색 선으로 구조와 경계선을 고정합니다.", "빨강은 절단면, 충돌 지점, 선택 상태에만 사용합니다.", "파랑은 설계도, 프로젝트 분류, 보조 축을 표시하는 색으로 사용합니다."],
    typography: ["굵은 산세리프 제목을 건축 도면의 라벨처럼 배치합니다.", "번호, 좌표, 프로젝트 코드가 시각적 구조를 만드는 핵심 요소입니다.", "본문은 작은 캡션처럼 기능적으로 유지해 형태 실험을 받쳐줍니다.", "제목은 커도 기울임보다 절단, 분할, 배치 변화로 긴장을 만듭니다."],
    layoutTraits: ["프로젝트 인덱스, 전시 개요, 도면형 히어로가 한 화면에서 서로 어긋납니다.", "비대칭과 겹침을 쓰되 탐색 순서는 명확하게 유지합니다.", "여백은 편안함보다 구조 사이의 압력과 균열을 보여주는 용도로 씁니다.", "모바일에서는 대각선 레이어를 줄이고 카드 순서를 명확히 합니다."],
    useCases: ["건축 포트폴리오", "전시 웹사이트", "실험적 브랜드", "프로젝트 아카이브"],
    goodFor: ["공간적 긴장감이 필요한 시각 작업", "정적인 그리드에서 벗어나야 하는 포트폴리오", "도면, 이미지, 텍스트 인덱스를 함께 다루는 사이트", "실험적이지만 지적인 인상이 필요한 브랜드"],
    cautions: ["모든 요소를 비틀면 구조 해체가 아니라 혼란으로 보입니다.", "Anti-Design과 구분하려면 해체된 구조에도 설계 의도가 보여야 합니다.", "겹침이 텍스트를 가리거나 포커스 이동을 방해하지 않게 해야 합니다.", "장식적 사선보다 정보 구조의 변형을 먼저 설계해야 합니다."],
    imagePrompt:
      "A deconstructivist architecture website reference image with apparent structural instability, fractured grid, angular panels, exposed black construction lines, concrete neutrals, red and blueprint blue accents, project index modules, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "MoMA - Deconstructivist Architecture", url: "https://www.moma.org/calendar/exhibitions/1813", note: "Historical reference for fragmented structure, broken geometry, spatial tension, and deconstructivist visual principles." },
        { title: "MoMA Press Release - Deconstructivist Architecture", url: "https://www.moma.org/momaorg/shared/pdfs/docs/press_archives/6559/releases/MOMA_1988_0062_63.pdf", note: "Primary reference for apparent instability, structural soundness, displaced forms, and challenges to harmony, unity, and stability." },
        { title: "Coop Himmelb(l)au", url: "https://www.coop-himmelblau.at", note: "Architecture reference for angular fragments, asymmetric space, sharp structural overlays, and engineered visual disruption." },
        { title: "Zaha Hadid Architects", url: "https://www.zaha-hadid.com/?lang=en-US", note: "Architecture reference for dynamic deconstructive forms, sharp spatial movement, and complex project-driven visual structure." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Deconstructivism Website Design", url: "https://www.pinterest.com/search/pins/?q=deconstructivism%20website%20design", note: "Moodboard reference for broken grids, sliced panels, tilted forms, architectural fragments, and tense editorial composition." },
        { title: "Awwwards - Experimental Websites", url: "https://www.awwwards.com/websites/experimental/", note: "Gallery reference for unconventional structures, fragmented navigation, dynamic composition, and architecture-adjacent web work." },
        { title: "Dribbble - Deconstructivism Web Design", url: "https://dribbble.com/search/deconstructivism%20web%20design", note: "UI reference for angular cards, displaced content blocks, skewed editorial layouts, and fractured hero systems." },
      ],
      representativeTraits: ["Apparent instability", "Displaced structural grid", "Angular fragments", "Exposed construction lines", "Project index tension"],
      avoidTraits: ["Random rotation", "Anti-design chaos", "Flat brutalist table", "Decorative diagonal stripes"],
      tokenIntent:
        "Use concrete neutrals, hard black borders, angular spacing, no radius, displaced project modules, and red blue structural accents so the style reads as deconstructivist.",
    },
  },
  "avant-garde": {
    summary: "아방가르드는 단순히 특이한 화면이 아니라 전통에 맞서는 실험, 혁신, 사회적 긴장을 타이포그래피와 구성으로 드러내는 문화형 스타일입니다.",
    description:
      "아방가르드는 National Galleries of Scotland의 정의처럼 전통을 실험과 혁신으로 도전하는 문화적 실천입니다. MoMA의 러시아 아방가르드 자료가 보여주듯 회화, 그래픽 디자인, 영화, 사진, 건축, 시가 서로 교차했고, Popova와 Constructivist 그래픽처럼 굵은 글자, 비대칭 블록, 생산과 기술의 언어가 시각 질서를 만들었습니다. 웹에서는 전시, 프로그램, 에세이, 선언문이 포스터처럼 긴장감 있게 읽혀야 합니다.",
    visualFeatures: ["대담한 타이포그래피와 비정형 배치가 첫 화면의 선언문 역할을 합니다.", "프로그램, 에세이, 전시 모듈이 문화 기관의 실제 정보 구조처럼 함께 보입니다.", "빨강, 파랑, 노랑 색면은 장식이 아니라 섹션과 개념을 분리하는 장치입니다.", "콜라주, 포토몽타주, 구성주의식 블록이 텍스트와 이미지 사이의 긴장을 만듭니다."],
    colorPalette: ["아이보리와 검정으로 읽기 가능한 출판물 기반 구조를 만듭니다.", "빨강은 선언, 충돌, 선택 상태에 사용합니다.", "파랑은 프로그램 분류와 보조 축을 만들고 노랑은 주목점에 제한합니다.", "원색을 넓게 쓰기보다 개념 단위가 보이는 명확한 색면으로 사용합니다."],
    typography: ["제목은 크게 쓰되 의미 있는 줄바꿈과 블록 배치를 설계합니다.", "본문은 에디토리얼처럼 안정적인 읽기 폭과 행간을 유지합니다.", "번호, 날짜, 프로그램 라벨, 작가명이 강한 그래픽 요소가 됩니다.", "타입은 장식이 아니라 사고의 구조와 문화적 태도를 드러내야 합니다."],
    layoutTraits: ["전시 히어로, 프로그램 리스트, 에세이 카드, 선언문 블록이 한 화면에서 교차합니다.", "정렬은 고정된 격자보다 전위적 리듬을 따르되 정보 묶음은 분명합니다.", "이미지보다 텍스트와 색면만으로도 긴장감 있는 첫 화면을 만들 수 있어야 합니다.", "모바일에서는 실험적 배치보다 콘텐츠 순서와 터치 가능한 모듈을 우선합니다."],
    useCases: ["미술관", "문화 프로그램", "독립 매거진", "실험적 브랜드 소개"],
    goodFor: ["기존 형식에 도전하는 문화 프로젝트", "텍스트와 이미지가 모두 중요한 전시와 출판 사이트", "예술적 권위와 새로움을 같이 보여줄 때", "단순한 포스터보다 실제 프로그램 웹이 필요할 때"],
    cautions: ["난해함이 탐색 실패로 이어지지 않게 해야 합니다.", "Postmodernism보다 더 개념적이고 덜 장난스럽게 유지합니다.", "실험적 제목이 본문을 가리거나 밀어내지 않게 합니다.", "색면과 타입 실험이 실제 일정, 장소, CTA를 숨기지 않게 합니다."],
    imagePrompt:
      "An avant-garde cultural website reference image with manifesto typography, exhibition program modules, Constructivist block composition, ivory black red blue yellow palette, asymmetric editorial structure, collage and photomontage cues, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "National Galleries of Scotland - Avant-garde", url: "https://www.nationalgalleries.org/art-and-artists/glossary-terms/avant-garde", note: "Definition reference for avant-garde as cultural practice that challenges tradition through experimentation and innovation." },
        { title: "MoMA - A Revolutionary Impulse", url: "https://www.moma.org/calendar/exhibitions/1668?locale=en", note: "Historical reference for Russian avant-garde across graphic design, film, photography, architecture, poetry, Constructivism, and photomontage." },
        { title: "MoMA - Liubov Popova", url: "https://www.moma.org/calendar/exhibitions/328", note: "Graphic reference for asymmetrical bold lettering, block-like Constructivist typography, Art into Life, and fusion of art and technology." },
        { title: "Walker Art Center - Critical Graphic Design Practice", url: "https://www.walkerart.org/reader/the-center-for-sensibility-towards-critical-graphic-design-practice/", note: "Contemporary design reference for typography and color as autonomous elements in experimental cultural design practice." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Avant Garde Website Design", url: "https://www.pinterest.com/search/pins/?q=avant%20garde%20website%20design", note: "Moodboard reference for experimental typography, art-poster composition, asymmetry, and cultural web layouts." },
        { title: "Awwwards - Experimental Websites", url: "https://www.awwwards.com/websites/experimental/", note: "Gallery reference for forward-looking web work, unusual navigation, expressive typography, and conceptual interaction systems." },
        { title: "Dribbble - Avant Garde Website", url: "https://dribbble.com/search/avant%20garde%20website", note: "UI reference for avant-garde landing pages, editorial experiments, angular typography, and gallery-style modules." },
      ],
      representativeTraits: ["Manifesto typography", "Cultural program modules", "Constructivist blocks", "Primary color accents", "Editorial social tension"],
      avoidTraits: ["Memphis playfulness", "Random anti-design disorder", "Corporate Swiss neutrality", "Poster-only layout without real content"],
      tokenIntent:
        "Use manifesto typography, primary accents, angular editorial modules, and controlled asymmetry so the style reads as avant-garde cultural design rather than generic weirdness.",
    },
  },
  postmodernism: {
    summary: "포스트모더니즘은 하나의 규칙보다 역사적 인용, 대중문화, 아이러니한 색과 형태를 의도적으로 섞는 스타일입니다.",
    description:
      "포스트모더니즘은 장난스러운 Memphis 패턴만을 뜻하지 않습니다. 고전적 형태, 팝 문화, 디자인 사료, 상품 카드, 충돌하는 색과 타입을 한 화면에 의도적으로 배치하면서도 실제 탐색 가능한 웹 구조를 유지해야 합니다.",
    visualFeatures: ["고전적 오브젝트, 사진, 세리프 인용문, 팝 상품 라벨이 서로 다른 시대의 언어를 섞습니다.", "Memphis 패턴은 강한 악센트로 쓰되 전체 정체성을 독점하지 않습니다.", "문화 아카이브, 오브젝트 인덱스, 숍 노트가 한 화면에 아이러니한 질서를 만듭니다."],
    colorPalette: ["크림과 검정 구조 위에 코발트, 레드, 노랑, 민트 같은 충돌색을 얹습니다.", "밝은 색만으로 채우기보다 사진과 중립 표면을 함께 둡니다.", "색면은 장식이 아니라 카드와 정보 구역을 나누는 장치로 씁니다."],
    typography: ["굵은 산세리프 제목과 작은 아카이브 라벨을 대비시킵니다.", "필요하면 세리프 문장을 섞어 역사적 인용감을 만듭니다.", "번호, 에디션, 섹션명 같은 기능 텍스트를 그래픽 리듬으로 활용합니다."],
    layoutTraits: ["경매 카탈로그 스프레드처럼 구성합니다 — 세리프 서문, 대표 롯, 다음 롯 인덱스가 한 화면에 놓입니다.", "고전 인용 블록, 문화 콜라주, 오브젝트 인덱스를 중심으로 배치합니다.", "모바일에서는 장식보다 카드 순서와 텍스트 대비를 우선합니다."],
    useCases: ["디자인 아카이브", "전시 웹", "컬처 커머스", "브랜드 에디토리얼"],
    goodFor: ["디자인 역사와 현대 상품을 함께 보여주는 프로젝트", "엄격한 모더니즘보다 혼합과 해석이 중요한 브랜드", "문화 기관, 오브젝트 숍, 전시 캠페인", "유머와 지적 레퍼런스를 함께 쓰는 웹 경험"],
    cautions: ["Memphis만 반복하면 포스트모더니즘이 아니라 Memphis 리바이벌처럼 보입니다.", "Maximalism처럼 패턴 과잉으로 흐르지 않게 해야 합니다.", "Anti-Design처럼 무질서해지면 의도적인 혼합이 사라집니다.", "텍스트 대비와 실제 탐색 구조를 반드시 유지해야 합니다."],
    imagePrompt:
      "A sophisticated postmodern editorial commerce website reference image with classical column fragments, archival photo panels, terrazzo plinths, mismatched cards, black outline modules, cobalt blue, tomato red, acid yellow, muted pink, pale mint, warm cream base, cultural and ironic mood, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "MoMA - Postmodernism", url: "https://www.moma.org/collection/terms/postmodernism", note: "Broad design-history reference for postmodern mixing of historical styles, popular culture, irony, and ornament." },
        { title: "Vitra - The Memphis Group", url: "https://www.vitra.com/en-us/magazine/details/the-memphis-group", note: "Design-history reference for Memphis as one postmodern branch, with expressive furniture, pattern, color, and cultural context." },
        { title: "Memphis Milano", url: "https://www.memphis-milano.com", note: "Visual reference for Memphis forms, bright geometric surfaces, ironic color, and playful product presentation as an accent language." },
      ],
      referenceGalleries: [
        { title: "Awwwards - Colorful Websites", url: "https://www.awwwards.com/websites/colorful/", note: "Gallery reference for expressive color, layered campaign pages, and postmodern-adjacent digital rhythm." },
        { title: "Dribbble - Postmodern Website", url: "https://dribbble.com/search/postmodern%20website", note: "UI reference for mismatched cards, editorial commerce modules, ironic type, and colorful interface treatments." },
        { title: "Pinterest - Postmodern Graphic Design", url: "https://www.pinterest.com/search/pins/?q=postmodern%20graphic%20design", note: "Moodboard reference for mixed historical forms, geometry, collage, and postmodern graphic composition." },
      ],
      representativeTraits: ["Classical quotation", "Culture collage", "Ironic object index", "Mixed cultural forms", "Editorial commerce"],
      avoidTraits: ["Neo-brutalist component kit", "Native form controls", "Memphis-only revival", "Generic colorful UI", "Raw brutalist severity"],
      tokenIntent:
        "Use classical quotation, culture collage, ironic lot indexes, selective Memphis geometry, auction catalogue labels, and live-sale commerce modules so the style reads as broader postmodernism rather than neo-brutalist UI.",
    },
  },
  classic: {
    summary: "클래식은 균형 잡힌 세리프 위계, 헤리티지 상품 이미지, 아이보리 표면과 얇은 선으로 시간이 지나도 안정적인 웹 인상을 만드는 스타일입니다.",
    description:
      "클래식은 장식을 많이 붙이는 것이 아니라 비례와 절제를 오래 유지하는 방식입니다. Ralph Lauren, Brooks Brothers, Hermes, Burberry, Smythson처럼 헤리티지 제품, 아카이브형 라벨, 네이비와 아이보리 대비, 단정한 상품 그리드가 실제 커머스 흐름 안에서 작동해야 합니다.",
    visualFeatures: ["세리프 제목과 작은 대문자 라벨이 안정적인 첫인상을 만듭니다.", "네이비, 옥스블러드, 가죽색, 아이보리 표면으로 헤리티지 톤을 만듭니다.", "상품 카드와 아카이브 모듈은 균형 잡힌 그리드 안에서 반복됩니다."],
    layoutTraits: ["큰 히어로 이미지와 작은 상품 카탈로그가 함께 보입니다.", "상단 내비게이션, 히어로, 하단 정보 스트립이 같은 선 체계를 공유합니다.", "모바일에서는 제품 이미지, 컬렉션명, 핵심 카드를 우선합니다."],
    imagePrompt:
      "A classic heritage commerce website reference image with ivory paper, navy tailoring, leather objects, balanced serif hierarchy, archive product cards, oxblood and muted gold accents, no logo, no watermark",
    research: luxuryClassicResearch.classic,
  },
  neoclassic: {
    summary: "네오클래식은 고전 건축의 대칭, 기둥, 대리석 질감을 현대적인 호텔 예약 화면과 결합하는 우아한 웹 스타일입니다.",
    description:
      "네오클래식은 Versailles식 웅장함을 그대로 복제하기보다 현대 호텔 웹처럼 절제된 예약 흐름과 결합해야 설득력이 생깁니다. Ritz Paris, Hotel de Crillon, Le Meurice, Le Bristol Paris처럼 대리석, 기둥 리듬, 중앙 정렬, 샴페인 골드가 조용한 고급감을 만듭니다.",
    visualFeatures: ["기둥과 대리석 이미지가 구조적 중심 신호가 됩니다.", "예약 바, 객실 카드, 서비스 리스트는 대칭 축을 따라 정렬됩니다.", "샴페인 골드와 석재색이 과하지 않은 고전성을 만듭니다."],
    layoutTraits: ["중앙 정렬 내비게이션과 큰 건축 히어로가 잘 맞습니다.", "호텔 예약 스트립, 객실 카드, 다이닝 카드가 실제 전환 흐름을 만듭니다.", "모바일에서는 기둥 장식을 줄이고 예약 행동을 우선합니다."],
    imagePrompt:
      "A neoclassical luxury hotel website reference image with marble columns, symmetrical suite booking strip, champagne gold accents, refined serif type, modern hospitality cards, no logo, no watermark",
    research: luxuryClassicResearch.neoclassic,
  },
  luxury: {
    summary: "럭셔리는 소재감 있는 이미지, 넓은 여백, 낮은 목소리의 CTA, 얇은 선으로 프리미엄 상품을 조용히 돋보이게 하는 스타일입니다.",
    description:
      "럭셔리는 골드 장식을 크게 넣는 방식보다 제품 사진과 간격을 정확히 조율하는 방식에 가깝습니다. Loewe, Bottega Veneta, Celine, Chanel, Dior처럼 가죽, 실크, 유리 같은 물성이 화면의 주인공이 되고 내비게이션과 카피는 매우 작고 조용해야 합니다.",
    visualFeatures: ["큰 소재 클로즈업과 작은 제품 카드가 화면의 밀도를 조절합니다.", "크림, 블랙, 버건디, 골드 포인트를 아주 제한적으로 사용합니다.", "CTA는 선명하지만 주변보다 과하게 떠 보이지 않습니다."],
    layoutTraits: ["좌측 정보와 우측 대형 이미지가 조용한 split 구조를 만듭니다.", "상품 카드, 소재 스와치, 상세 링크가 같은 간격으로 반복됩니다.", "모바일에서는 이미지가 먼저 보이되 구매 행동은 바로 이어져야 합니다."],
    imagePrompt:
      "A restrained luxury fashion ecommerce website reference image with cream studio surface, leather product close-up, silk fabric, black ink typography, antique gold detail, sparse product cards, no logo, no watermark",
    research: luxuryClassicResearch.luxury,
  },
  "old-money": {
    summary: "올드머니는 과시보다 전통, 소재, 장소성을 강조하며 클럽 라이프스타일과 조용한 워드로브를 웹 화면으로 옮기는 스타일입니다.",
    description:
      "올드머니는 화려한 럭셔리보다 더 낮은 톤이어야 합니다. Loro Piana, Brunello Cucinelli, Ralph Lauren, Drake's, The Rake처럼 캐시미어, 테일러링, 가죽, 잔디와 도서관 같은 장소 신호가 작고 단정한 상품 흐름과 함께 보여야 합니다.",
    visualFeatures: ["크림, 포레스트 그린, 네이비, 카멜이 차분한 헤리티지 분위기를 만듭니다.", "클럽, 테라스, 라이브러리 같은 장소성이 상품보다 조용히 뒤를 받칩니다.", "크레스트나 모노그램은 작게만 써야 과시로 흐르지 않습니다."],
    layoutTraits: ["큰 라이프스타일 히어로와 작은 워드로브 카드가 잘 맞습니다.", "정보 스트립은 소재, 장소, 시즌처럼 낮은 톤의 메타 정보로 구성합니다.", "모바일에서는 장식보다 상품과 컬렉션 흐름을 먼저 보이게 합니다."],
    imagePrompt:
      "An old-money wardrobe website reference image with country club terrace, cashmere knitwear, navy blazer, loafers, leather luggage, forest green cream camel palette, no logo, no watermark",
    research: luxuryClassicResearch["old-money"],
  },
  "art-deco": {
    summary: "아르데코는 팬 모양 기하학, 스텝 구조, 검정과 금속색 대비로 호텔, 바, 극장 같은 화려한 질서를 만드는 스타일입니다.",
    description:
      "아르데코는 금색을 많이 쓰는 스타일이 아니라 기하학적 질서가 먼저 보여야 합니다. Claridge's, The Savoy, The Carlyle, Radio City Music Hall, Empire State Building처럼 팬 아치, 수직 리듬, 블랙 라커, 브라스, 에메랄드 포인트가 실제 호텔/바 예약 화면과 결합될 때 스타일이 분명해집니다.",
    visualFeatures: ["팬 아치와 계단형 라인이 대표 신호가 됩니다.", "검정, 브라스, 에메랄드, 버건디가 저녁의 고급감을 만듭니다.", "카드와 CTA는 장식보다 기하학적 질서에 맞춰 배치합니다."],
    layoutTraits: ["세로 포스터 패널과 예약 컬럼의 비대칭 분할, 마퀴형 스케줄 보드가 잘 맞습니다.", "기하학 장식은 배경이 아니라 예약, 룸 카드, 바 카드의 구조에 붙습니다.", "모바일에서는 팬 장식을 단순화하고 CTA 대비를 우선합니다."],
    imagePrompt:
      "An Art Deco hotel and cocktail bar website reference image with black lacquer, brass fan geometry, emerald accents, stepped room cards, symmetrical luxury navigation, no logo, no watermark",
    research: luxuryClassicResearch["art-deco"],
  },
  "art-nouveau": {
    summary: "아르누보는 식물적 곡선, 유리와 금속 공예, 장식적 선을 향수나 문화 페이지처럼 흐르는 웹 구조로 만드는 스타일입니다.",
    description:
      "아르누보는 단순한 꽃 장식이 아니라 선의 흐름이 레이아웃을 이끄는 스타일입니다. Mucha Foundation, Horta Museum, Casa Batllo, V&A, The Met 레퍼런스처럼 덩굴형 프레임, 유기적 내부 카드, 보태니컬 색, 공예적 소재가 실제 제품/전시 화면 안에서 보여야 합니다.",
    visualFeatures: ["덩굴 같은 곡선과 비대칭 유기형 프레임이 핵심 신호입니다.", "세이지 그린, 금빛 베이지, 말린 꽃색이 장식성과 자연성을 연결합니다.", "향수병, 포스터, 식물 표본 같은 오브젝트가 잘 어울립니다."],
    layoutTraits: ["좌측 설명과 우측 유기형 제품 히어로가 잘 맞습니다.", "곡선은 내부 요소에서 쓰고 전체 프레임은 읽기 쉽게 유지합니다.", "모바일에서는 곡선 장식을 배경화하고 제품 정보 순서를 유지합니다."],
    imagePrompt:
      "An Art Nouveau botanical perfume website reference image with flowing vine frames, glass bottle, warm green and gold palette, organic line ornament, elegant serif typography, no logo, no watermark",
    research: luxuryClassicResearch["art-nouveau"],
  },
  baroque: {
    summary: "바로크는 극적인 명암, 깊은 색, 금박 프레임, 무대 같은 히어로로 감정 밀도가 높은 럭셔리 웹을 만드는 스타일입니다.",
    description:
      "바로크는 장식이 많다는 뜻보다 빛과 장면의 극적 통제가 중요합니다. Versailles, Louvre, Kunsthistorisches Museum, Rijksmuseum, Prado처럼 어두운 갤러리, 금박 프레임, 벨벳, 회화적 이미지가 실제 전시나 프라이빗 뷰 예약 화면으로 구성되어야 합니다.",
    visualFeatures: ["키아로스쿠로처럼 밝고 어두운 영역의 대비가 스타일을 만듭니다.", "와인, 검정, 앤틱 골드, 벨벳 질감이 깊은 분위기를 만듭니다.", "프레임과 장식은 히어로 이미지 주변에서 통제해서 사용합니다."],
    layoutTraits: ["중앙의 큰 이미지와 우측 전시/상품 리스트가 무대처럼 작동합니다.", "하단 정보는 조도, 소재, 장식처럼 분위기 단서로 구성합니다.", "모바일에서는 어두운 배경에서도 텍스트 대비를 높게 유지합니다."],
    imagePrompt:
      "A Baroque luxury museum website reference image with candlelit chiaroscuro, deep wine velvet, antique gold frame, dark gallery hero, dramatic editorial cards, no logo, no watermark",
    research: luxuryClassicResearch.baroque,
  },
  rococo: {
    summary: "로코코는 밝은 파스텔, 조개형 곡선, 도자기와 살롱 이미지를 섬세한 상품/뷰티 웹 구조로 옮기는 스타일입니다.",
    description:
      "로코코는 바로크보다 가볍고 섬세해야 합니다. Wallace Collection, Frick, Getty, The Met, V&A처럼 셸 장식, 도자기, 파스텔 살롱, 비대칭 장식이 상품 카드와 부드러운 히어로 안에서 정리될 때 과하지 않고 고급스럽게 보입니다.",
    visualFeatures: ["조개형 곡선과 밝은 비대칭 장식이 대표 신호입니다.", "블러시, 파우더 블루, 민트, 샴페인 골드가 가벼운 장식성을 만듭니다.", "도자기, 티, 뷰티 오브젝트처럼 작은 상품이 잘 맞습니다."],
    layoutTraits: ["큰 살롱 히어로와 작은 2열 상품 카드가 잘 맞습니다.", "곡선 장식은 내부 상품 썸네일과 배지에 집중합니다.", "모바일에서는 파스텔 대비가 약해지지 않도록 텍스트와 CTA를 선명하게 둡니다."],
    imagePrompt:
      "A Rococo salon beauty website reference image with porcelain cream, blush pink, powder blue, shell curves, gilt mirror, delicate product cards, no logo, no watermark",
    research: luxuryClassicResearch.rococo,
  },
  gothic: {
    summary: "고딕은 뾰족한 아치, 스테인드글라스, 석재의 수직 리듬, 어두운 색으로 장중하고 구조적인 웹 화면을 만드는 스타일입니다.",
    description:
      "고딕은 단순히 검은 배경을 쓰는 것이 아니라 건축적 수직성과 빛의 구조가 보여야 합니다. Westminster Abbey, Notre-Dame, Cologne Cathedral, The Met, V&A처럼 포인티드 아치, 리브 구조, 스테인드글라스 색, 오래된 석재 질감이 실제 아카이브나 패션/문화 페이지의 모듈로 번역되어야 합니다.",
    visualFeatures: ["뾰족한 아치와 높은 세로 분할이 핵심 형태입니다.", "와인, 딥 블루, 낡은 금색이 스테인드글라스처럼 어두운 배경 위에 뜹니다.", "장식은 성당 구조처럼 수직적이고 반복적이어야 합니다."],
    layoutTraits: ["좌측 인덱스와 우측 아치형 비주얼 모듈이 잘 맞습니다.", "스테인드글라스 색은 카드 내부에만 제한적으로 사용합니다.", "모바일에서는 아치 장식을 줄이고 제목, 이미지, 링크 순서를 명확히 합니다."],
    imagePrompt:
      "A Gothic cathedral archive website reference image with pointed arch modules, stained glass wine and deep blue accents, charcoal stone surface, sacred vertical rhythm, no logo, no watermark",
    research: luxuryClassicResearch.gothic,
  },
  retro: {
    summary: "레트로는 특정 시대의 색, 배지, 둥근 그래픽, 아날로그 미디어 감각을 현대 웹 커머스나 콘텐츠 화면으로 다시 구성하는 스타일입니다.",
    description:
      "레트로는 과거를 그대로 복사하기보다 현재 웹 구조 안에 향수를 얹는 방식입니다. Poolside FM, Radiooooo, Web Design Museum처럼 둥근 배지, 따뜻한 색, 음악/상품 카드, 오래된 인터페이스 느낌이 실제 탐색 경험으로 이어져야 합니다.",
    visualFeatures: ["둥근 배지와 굵은 색면이 향수를 만듭니다.", "상품 카드나 미디어 카드가 아날로그 포스터처럼 보입니다.", "따뜻한 오렌지, 청록, 크림 조합이 첫인상을 잡습니다."],
    colorPalette: ["크림과 머스터드를 기본으로 둡니다.", "레드 오렌지와 청록을 대표 포인트로 씁니다.", "갈색 텍스트로 인쇄물 같은 온도를 만듭니다."],
    typography: ["둥글고 굵은 제목이 레트로 분위기를 만듭니다.", "짧은 라벨과 배지 텍스트가 잘 어울립니다.", "본문은 현대적인 가독성을 유지해야 합니다."],
    layoutTraits: ["방송형 랜딩, 시대 선택 다이얼, 상품 큐가 한 화면에서 연결됩니다.", "곡선과 원형 요소를 사용하되 탐색 구조는 단순하게 둡니다.", "모바일에서는 큰 방송 배지, 다이얼, 상품 큐가 먼저 보여야 합니다."],
    useCases: ["음악 서비스", "카페/식음료", "굿즈 커머스", "브랜드 캠페인"],
    goodFor: ["친근한 향수를 주고 싶은 브랜드", "문화/음악/식음료 콘텐츠", "과거 감성을 현대적으로 판매하는 커머스", "밝고 쉽게 접근되는 이벤트 페이지"],
    cautions: ["70s, 80s, 90s처럼 특정 시대 스타일과 구분해야 합니다.", "낡은 UI를 그대로 쓰면 사용성이 떨어집니다.", "향수 요소보다 실제 콘텐츠 카드가 중심이어야 합니다."],
    imagePrompt:
      "A retro ecommerce website reference image with warm cream and mustard background, rounded badges, teal and red accents, analog media cards, nostalgic product modules, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Poolside FM", url: "https://poolside.fm", note: "Retro web reference for nostalgia, playful broadcast media interface, warm color, and intentionally analog browsing cues." },
        { title: "Radiooooo", url: "https://radiooooo.com", note: "Music experience reference for time-travel decade navigation, nostalgic color, map-like interaction, and retro audio discovery." },
        { title: "Web Design Museum", url: "https://www.webdesignmuseum.org/", note: "Archive reference for historical web aesthetics, period UI patterns, typography, palettes, and layout conventions." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Retro Website Design", url: "https://www.pinterest.com/search/pins/?q=retro%20website%20design", note: "Moodboard reference for nostalgic palettes, rounded badges, vintage-inspired web graphics, and playful commerce layouts." },
        { title: "Awwwards - Retro Websites", url: "https://www.awwwards.com/websites/retro/", note: "Gallery reference for modern retro web executions, nostalgic imagery, period color, and contemporary interaction polish." },
        { title: "Dribbble - Retro Website", url: "https://dribbble.com/search/retro%20website", note: "UI reference for retro landing pages, badge systems, diner-style cards, and nostalgic product screens." },
      ],
      representativeTraits: ["Warm nostalgic palette", "Broadcast shop header", "Time-travel media dial", "Analog merch queue", "Friendly retro rhythm"],
      avoidTraits: ["Specific 70s/80s/90s overcoding", "Aged vintage paper", "Y2K gloss"],
      tokenIntent:
        "Use warm retro colors, rounded badges, medium borders, broadcast media cards, decade dials, analog product queues, and friendly spacing so the style reads as general retro.",
    },
  },
  vintage: {
    summary: "빈티지는 오래된 인쇄물, 헤리티지 배지, 종이 질감, 클래식 카탈로그 구조를 활용해 시간의 깊이를 보여주는 스타일입니다.",
    description:
      "빈티지는 레트로보다 더 오래되고 물성 있는 쪽입니다. Filson, Levi's, Web Design Museum처럼 헤리티지 제품 카드, 카탈로그 표, 잉크색 텍스트, 배지형 인증 요소가 실제 쇼핑/아카이브 화면으로 구성되어야 합니다.",
    visualFeatures: ["종이색 배경과 잉크 같은 텍스트가 오래된 느낌을 만듭니다.", "헤리티지 배지와 카탈로그 행이 브랜드 신뢰를 줍니다.", "사진 영역은 인쇄물처럼 단정한 프레임 안에 놓입니다."],
    colorPalette: ["베이지, 크림, 브라운을 기본으로 둡니다.", "딥 레드와 올리브 그린을 오래된 인쇄 포인트로 씁니다.", "새하얀 흰색보다 바랜 종이색이 잘 맞습니다."],
    typography: ["세리프 또는 세리프 느낌의 제목이 어울립니다.", "카탈로그 번호, 연도, 원산지 같은 작은 정보가 중요합니다.", "본문은 오래된 안내문처럼 안정적으로 읽혀야 합니다."],
    layoutTraits: ["상품 카탈로그, 수선 티켓, 소재 등록부, 아카이브 리스트가 잘 맞습니다.", "장식보다 배지와 라벨, 표 행 구조가 브랜드의 시간감을 만듭니다.", "모바일에서는 카탈로그 표와 수선 기록을 세로 카드형으로 바꿔 읽기 쉽게 둡니다."],
    useCases: ["헤리티지 브랜드", "빈티지 숍", "아카이브 페이지", "클래식 제품 커머스"],
    goodFor: ["브랜드의 역사와 신뢰를 강조할 때", "제품 원산지와 재료 설명이 중요한 커머스", "아카이브 분위기의 콘텐츠", "새 제품을 오래된 가치로 보이게 할 때"],
    cautions: ["낡은 질감만 넣으면 실제 웹 구조가 약해집니다.", "Retro보다 더 차분하고 인쇄물에 가까워야 합니다.", "색 대비가 낮아져 읽기 어려워지지 않게 합니다."],
    imagePrompt:
      "A vintage heritage catalog website reference image with aged paper background, ink brown serif headings, product archive rows, heritage badges, muted red olive accents, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Filson", url: "https://www.filson.com", note: "Heritage retail reference for rugged category navigation, materials such as Tin Cloth and Rugged Twill, repairs/guarantee support, aged neutrals, and practical vintage product storytelling." },
        { title: "Levi's", url: "https://www.levi.com", note: "Heritage apparel reference for archival denim tone, 501 history, mended product stories, classic commerce modules, and vintage Americana brand cues." },
        { title: "Web Design Museum", url: "https://www.webdesignmuseum.org/", note: "Archive reference for older web layouts, historic graphics, period typography, and document-like page structure." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Vintage Website Design", url: "https://www.pinterest.com/search/pins/?q=vintage%20website%20design", note: "Moodboard reference for paper texture, muted ink, heritage badges, classic catalog grids, and aged color systems." },
        { title: "Awwwards - Retro Websites", url: "https://www.awwwards.com/websites/retro/", note: "Closest gallery reference for vintage and retro web executions, heritage color, editorial pacing, and archival atmosphere." },
        { title: "Dribbble - Vintage Website", url: "https://dribbble.com/search/vintage%20website", note: "UI reference for vintage catalogs, badges, serif headings, paper-like cards, and heritage product pages." },
      ],
      representativeTraits: ["Aged paper", "Heritage catalog", "Muted ink palette", "Repair ticket ledger", "Patina material register"],
      avoidTraits: ["Bright general retro", "70s psychedelic warmth", "Luxury minimal polish"],
      tokenIntent:
        "Use aged neutrals, serif display type, paper-like grain, heritage catalog rows, repair ticket ledgers, patina material registers, and muted ink accents so the style reads as vintage.",
    },
  },
  "seventies-retro": {
    summary: "70년대 레트로는 따뜻한 오렌지, 아보카도 그린, 둥근 곡선, 그루비한 배지를 사용해 편안하고 낙관적인 웹 무드를 만듭니다.",
    description:
      "70년대 레트로는 일반 Retro보다 시대 신호가 더 분명해야 합니다. Houseplant, Rolling Stone, Web Design Museum 같은 레퍼런스처럼 둥근 프로모션 카드, 물결형 섹션, 따뜻한 제품/이벤트 배지가 실제 브랜드 랜딩으로 작동해야 합니다.",
    visualFeatures: ["오렌지와 머스터드가 화면의 기본 온도를 만듭니다.", "수퍼그래픽 레인보우 아치와 스트라이프 밴드가 장식이 아니라 골격으로 쓰입니다.", "둥근 팻 타이포와 필 배지, 아치형 프레임이 70년대 감각을 즉시 드러냅니다."],
    colorPalette: ["머스터드, 오렌지, 크림을 넓게 사용합니다.", "아보카도 그린과 먼지 낀 핑크를 보조색으로 둡니다.", "텍스트는 짙은 브라운으로 인쇄물 같은 안정감을 줍니다."],
    typography: ["둥글고 굵은 제목이 잘 어울립니다.", "라벨과 버튼은 부드러운 알약 형태와 맞춥니다.", "본문은 너무 복고적이지 않게 읽기 쉬운 산세리프를 유지합니다."],
    layoutTraits: ["수퍼그래픽 아치 히어로와 아치형 실사 창이 화면의 첫인상을 만듭니다.", "세션 보드·필 CTA·스트라이프 밴드가 포스터 리듬으로 이어집니다.", "모바일에서는 큰 곡선 장식보다 헤드라인, 세션 보드, 아치 창을 우선합니다."],
    useCases: ["라이프스타일 브랜드", "음악/이벤트", "식음료", "굿즈 커머스"],
    goodFor: ["따뜻하고 즐거운 브랜드 첫인상", "음악/카페/홈 제품 캠페인", "너무 세련된 느낌보다 인간적인 분위기", "계절 프로모션"],
    cautions: ["Retro와 구분하려면 70s 색과 곡선을 분명히 해야 합니다.", "패턴이 과하면 Maximalism으로 흐릅니다.", "곡선 장식이 CTA를 가리지 않게 해야 합니다."],
    imagePrompt:
      "A 1970s retro lifestyle website reference image with mustard and orange background, avocado green accents, groovy rounded badges, wavy product cards, warm campaign layout, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "Houseplant", url: "https://www.houseplant.com", note: "Lifestyle commerce reference for warm 70s color, rounded typography, product character, collection navigation, product carousel rhythm, and relaxed story modules." },
        { title: "Rolling Stone", url: "https://www.rollingstone.com", note: "Media reference for 70s cultural heritage, strong editorial identity, music nostalgia, and bold magazine-style hierarchy." },
        { title: "Web Design Museum", url: "https://www.webdesignmuseum.org/", note: "Archive reference for period web interpretation, old interface rhythm, nostalgic graphics, and historical color cues." },
      ],
      referenceGalleries: [
        { title: "Pinterest - 70s Retro Website Design", url: "https://www.pinterest.com/search/pins/?q=70s%20retro%20website%20design", note: "Moodboard reference for groovy curves, warm orange and avocado palettes, psychedelic patterns, and relaxed retro layouts." },
        { title: "Awwwards - Retro Websites", url: "https://www.awwwards.com/websites/retro/", note: "Gallery reference for contemporary retro sites that reinterpret 70s color, soft shapes, and nostalgic campaign structure." },
        { title: "Dribbble - 70s Website Design", url: "https://dribbble.com/search/70s%20website%20design", note: "UI reference for 70s landing pages, groovy badges, wavy modules, and warm product cards." },
      ],
      representativeTraits: ["Supergraphic rainbow arch", "Groovy rounded type", "Warm harvest palette", "Arch-topped photo frame", "Session board & pill badges"],
      avoidTraits: ["Generic retro badges", "80s neon grid", "Vintage paper archive"],
      tokenIntent:
        "Use warm harvest-gold, avocado-green, burnt-orange and dusty-rose 70s colors, supergraphic rainbow arch rings, fat rounded display type, arch-topped photo frames, pill badges, stripe bands, and brown 2px borders with hard offset shadows so the 70s graphic language itself is the layout, not a decoration on a neutral card UI.",
    },
  },
  "eighties-retro": {
    summary: "80년대 레트로는 어두운 배경, 네온 컬러, 신스웨이브 그리드, 아케이드식 패널을 사용해 전자적인 향수를 만듭니다.",
    description:
      "80년대 레트로는 밝은 Retro보다 더 야간적이고 전자적입니다. Poolside FM, Cyberpunk 2077, Windows 93처럼 네온 경계, 미디어 콘솔, 아케이드 버튼, 수평 그리드가 실제 인터페이스 안에서 보여야 합니다.",
    visualFeatures: ["짙은 남색 배경 위에 핑크와 사이언 네온이 떠오릅니다.", "그리드, 콘솔, 미디어 패널이 신스웨이브 분위기를 만듭니다.", "버튼과 상태값은 아케이드 UI처럼 명확합니다."],
    colorPalette: ["다크 네이비와 보라빛 배경을 사용합니다.", "마젠타, 사이언, 전기 노랑을 고대비 포인트로 씁니다.", "흰색 텍스트를 과하게 쓰지 않고 핵심 정보에 집중합니다."],
    typography: ["모노스페이스나 각진 산세리프가 잘 맞습니다.", "제목은 크게 쓰되 네온 효과보다 가독성을 우선합니다.", "라벨은 짧고 콘솔처럼 기능적으로 둡니다."],
    layoutTraits: ["미디어 콘솔, VHS mix queue, 아케이드 컨트롤 스트립이 한 화면에서 보입니다.", "어두운 화면 안에서 카드 경계를 네온과 검은 플라스틱 패널로 나눕니다.", "모바일에서는 네온 장식보다 콘솔 라벨, 큐 목록, 컨트롤 크기를 우선합니다."],
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
      representativeTraits: ["Neon store signage", "VHS new-release wall", "Rental membership card", "Genre neon chips", "Dark navy + neon glow"],
      avoidTraits: ["General warm retro", "Glitch corruption", "Y2K glossy plastic", "Cyberpunk city dystopia"],
      tokenIntent:
        "Use a neon video-rental storefront sign, a VHS new-release wall of horror tape cases with rental states, a rental membership card, a be-kind-rewind reminder, genre neon chips, a dark navy stage and magenta/cyan/yellow glow so the style reads as eighties retro rather than warm retro, 90s graphic, Y2K gloss, or cyberpunk city.",
    },
  },
  "nineties-graphic": {
    summary: "90년대 그래픽은 초기 웹, 데스크톱 창, 스티커 같은 그래픽, 강한 패턴을 섞어 활기 있는 디지털 향수를 만듭니다.",
    description:
      "90년대 그래픽은 Y2K보다 덜 광택 있고 더 거칠고 그래픽합니다. Space Jam 1996, Windows 93, Web Design Museum처럼 창 프레임, 굵은 스티커, 패턴 배경, 이미지 중심 네비게이션이 실제 웹 페이지처럼 보여야 합니다.",
    visualFeatures: ["창 프레임과 스티커형 라벨이 초기 웹 느낌을 만듭니다.", "청록, 보라, 형광 노랑 같은 색이 강하게 충돌합니다.", "하프톤, 체크보드, 찢어진 종이 조각이 실제 링크와 콘텐츠 영역을 만듭니다."],
    colorPalette: ["청록과 노랑을 넓은 배경/표면에 사용합니다.", "보라, 오렌지, 형광 라임을 스티커 포인트로 씁니다.", "검정 선으로 요소를 명확히 묶습니다."],
    typography: ["굵고 압축되지 않은 산세리프가 잘 맞습니다.", "작은 윈도우 타이틀과 버튼 라벨이 시대감을 줍니다.", "본문은 짧고 그래픽 블록 안에 배치합니다."],
    layoutTraits: ["DESKTOP ZINE 창, sticker link grid, halftone scrap wall이 함께 보입니다.", "비정형적이지만 실제 클릭 가능한 초기 웹 캠페인 화면처럼 구성합니다.", "모바일에서는 창을 겹치기보다 핵심 포스터, 링크 격자, 방문자 푸터 순서로 정리합니다."],
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
      representativeTraits: ["Bevelled multimedia chrome", "WordArt title", "Clip-art topic explorer", "Media viewer with transport", "Memphis pop accents"],
      avoidTraits: ["Y2K chrome gloss", "80s neon synth grid", "Vintage paper catalog"],
      tokenIntent:
        "Use a grey bevelled multimedia CD-ROM window on a teal desktop, a WordArt title, a clip-art topic explorer, a media viewer with a QuickTime-style transport, hypertext article links, a NOW LOADING gauge, and saturated teal/violet/orange/acid Memphis accents so the style reads as nineties graphic rather than 80s neon or Y2K chrome.",
    },
  },
  y2k: {
    summary: "Y2K는 크롬 광택, 젤리 같은 색, 버블 패널, 초기 인터넷의 미래 낙관주의를 결합한 2000년대 초반 웹 스타일입니다.",
    description:
      "Y2K는 90년대 그래픽보다 더 매끈하고 미래적인 광택이 중요합니다. Web Design Museum의 Y2K 아카이브, Blingee, Windows 93처럼 반짝이는 버튼, 둥근 포털 카드, 파스텔 사이버 색, 장식적 위젯이 실제 웹 포털로 구성되어야 합니다.",
    visualFeatures: ["버블형 패널과 글로시한 표면이 핵심 신호입니다.", "파스텔 블루, 핑크, 라임이 밝은 미래감을 만듭니다.", "포털, 프로필, 위젯, 게스트북 같은 작은 모듈이 화면을 채웁니다."],
    colorPalette: ["아이스 블루와 흰색을 밝은 기본으로 둡니다.", "핑크와 라임을 장식/상태 포인트로 씁니다.", "테두리는 회청색으로 살짝 기술적인 느낌을 줍니다."],
    typography: ["굵고 둥근 제목이 잘 어울립니다.", "작은 위젯 라벨과 버튼 텍스트는 또렷해야 합니다.", "긴 본문보다 짧은 포털 메뉴와 상태 텍스트가 효과적입니다."],
    layoutTraits: ["GLOSS PORTAL 헤더, bubble widget stack, sparkle guestbook rail이 함께 보입니다.", "카드는 둥글고 반짝이는 젤리/캡슐 표면처럼 처리합니다.", "모바일에서는 포털 히어로, 위젯 스택, 젤리 캡슐 도크 순서가 명확해야 합니다."],
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
      representativeTraits: ["GLOSS PORTAL header", "Bubble widget stack", "Sparkle guestbook rail", "Jelly capsule dock", "Pastel cyber gloss"],
      avoidTraits: ["90s sticker windows", "80s neon darkness", "Chromecore hardware stage"],
      tokenIntent:
        "Use a GLOSS PORTAL header, bubble widget stack, sparkle guestbook rail, jelly capsule dock, translucent gloss, pastel cyber accents, glitter-profile cues, and rounded early-web portal cards so the style reads as Y2K rather than 90s Graphic or Chromecore.",
    },
  },
  "retro-futurism": {
    summary: "레트로 퓨처리즘은 과거가 상상한 미래를 Space Age 여행 광고, 원자/별burst 모티프, 낙관적인 기술 색감으로 재구성하는 스타일입니다.",
    description:
      "레트로 퓨처리즘은 미래 콘솔을 어둡게 그리는 것보다, 1950-60년대 사람들이 꿈꾼 밝은 미래를 현대 웹으로 옮기는 쪽에 가깝습니다. NASA JPL의 Visions of the Future, Googie/Atomic Age, Paleofuture 아카이브처럼 행성 여행 포스터, 부메랑 형태, 원자 궤도, 별burst, 티켓형 일정표가 한 화면에서 실제 랜딩 페이지처럼 작동해야 합니다.",
    visualFeatures: ["FLIGHT DECK처럼 Space Age 여행 포스터와 실제 예약 화면이 결합된 구조가 중심이 됩니다.", "destination poster rail, 별burst, 원자 궤도, 부메랑, 플라잉소서 같은 과거 미래 모티프가 식별자가 됩니다.", "chrome capsule timetable과 코랄, 터쿼이즈, 크림, 골드, 네이비가 낙관적인 여행 웹 팔레트를 만듭니다."],
    colorPalette: ["크림과 옅은 골드를 밝은 포스터 배경처럼 사용합니다.", "코랄 오렌지와 터쿼이즈를 목적지, CTA, 궤도 표시색으로 씁니다.", "네이비는 밤하늘보다 인쇄 잉크와 정보 구조를 잡는 색으로 제한합니다."],
    typography: ["굵고 둥근 미드센추리 산세리프 느낌의 제목이 잘 맞습니다.", "시간표와 좌석 정보는 모노스페이스보다 여행 티켓 라벨처럼 짧고 단정하게 둡니다.", "큰 포스터 헤드라인과 작은 일정표 라벨의 대비가 중요합니다."],
    layoutTraits: ["행성 여행 랜딩, 엑스포/전시 페이지, 미래형 제품 티저에 어울립니다.", "상단은 travel bureau header와 FLIGHT DECK 포스터, 측면은 destination poster rail과 chrome capsule timetable로 구성합니다.", "모바일에서는 포스터, 목적지 카드, 출발 CTA 순서가 명확해야 합니다."],
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
      representativeTraits: ["FLIGHT DECK poster landing", "Destination poster rail", "Chrome capsule timetable", "Atomic starburst motifs", "Optimistic coral-turquoise palette"],
      avoidTraits: ["Cyberpunk dystopia", "Generic retro badges", "Y2K plastic gloss"],
      tokenIntent:
        "Use a FLIGHT DECK poster landing, destination poster rail, chrome capsule timetable, bright cream poster surfaces, coral and turquoise accents, navy ink, atomic motifs, boomerang geometry, and travel-bureau modules so the style reads as retro futurism instead of dark sci-fi, Y2K gloss, or live futurist telemetry.",
    },
  },
  "mid-century-modern": {
    summary: "미드센추리 모던은 월넛 목재, 성형 합판 곡선, 얇은 금속선, 유리 표면, 그래픽 직물 색을 조합해 생활감 있는 20세기 중반 모던을 만드는 스타일입니다.",
    description:
      "미드센추리 모던은 막연한 빈티지 감성이 아니라 실제 가구와 인테리어 물성에서 출발해야 합니다. Eames Lounge Chair의 성형 합판과 가죽 쿠션, Nelson Platform Bench의 직선 목재 슬랫, Noguchi Coffee Table의 유기적인 유리와 목재 다리, Alexander Girard의 색과 패턴처럼 기능적인 구조와 따뜻한 장식이 함께 보여야 웹 화면에서도 스타일이 분명해집니다.",
    visualFeatures: [
      "MONO HOUSE listening room은 월넛 오디오 콘솔, 성형 합판 체어, 유리 테이블을 하나의 실제 라운지 장면으로 보여줍니다.",
      "SIDE A / SIDE B receiver는 큰 공간 이미지와 주파수 눈금, 튜닝 니들, 재생 컨트롤을 비대칭으로 맞물립니다.",
      "Walnut source rail은 반복되는 목재 슬랫 위에서 FM, PHONO, TAPE 소스를 고르는 실제 컨트롤입니다.",
      "Girard acoustic cloth는 직물 색과 패턴을 작은 선택 버튼과 스피커 그릴 표면으로 제한해 보여줍니다.",
    ],
    colorPalette: [
      "크림과 오래된 종이색을 배경으로 두고 화면을 따뜻하게 시작합니다.",
      "월넛 브라운을 주요 구조색으로 사용해 목재 물성을 만듭니다.",
      "토마토 오렌지, 딥 틸, 머스터드는 직물, 시계, 작은 CTA에만 씁니다.",
      "검정 대신 짙은 에스프레소 브라운을 텍스트와 선에 사용하면 더 자연스럽습니다.",
    ],
    typography: [
      "제목은 둥근 산세리프 계열이 잘 맞지만 과한 70년대 곡선체는 피합니다.",
      "메뉴와 제품 라벨은 짧고 단정하게 두어 가구 카탈로그처럼 보이게 합니다.",
      "본문은 장식보다 읽기 편한 비례를 우선하고 자간은 0에 가깝게 유지합니다.",
    ],
    layoutTraits: [
      "전체 화면은 약 3:2의 SIDE A 이미지와 SIDE B 리시버가 맞물리는 비대칭 레코드 재킷 구성을 사용합니다.",
      "주파수 눈금, 소스 선택, 재생 상태, 진행 표시가 실제 하이파이 리시버의 정보 위계를 만듭니다.",
      "하단에는 Walnut source rail, Girard acoustic cloth, Session queue를 밀도 있게 묶어 프로그램과 재료 정보를 연결합니다.",
      "compact에서는 내부 2열을 유지하고 좁은 상세 화면에서는 SIDE A 다음 SIDE B 순서로 쌓아 이미지와 컨트롤을 모두 보존합니다.",
    ],
    useCases: ["하이엔드 하이파이 리스닝 클럽", "음악 아카이브와 레코드 프로그램", "오디오와 가구 브랜드 경험", "레트로 호스피탈리티 예약"],
    goodFor: ["따뜻하지만 세련된 제품 이미지를 만들 때", "생활감 있는 모던 인테리어를 보여줄 때", "가구, 조명, 오브젝트 카탈로그", "레트로 감성을 쓰되 과장된 노스탤지어를 피하고 싶을 때"],
    cautions: [
      "70s Retro처럼 굵은 곡선과 주황색만 키우면 시대가 뒤로 밀려 보입니다.",
      "Bauhaus처럼 원색 도형만 앞세우면 생활감보다 그래픽 실험으로 읽힙니다.",
      "목재, 유리, 직물 중 최소 두 가지 물성이 보여야 단순한 빈티지 카드가 되지 않습니다.",
    ],
    imagePrompt:
      "A sophisticated early-1960s hi-fi listening lounge with a walnut speaker console, turntable and reel-to-reel deck, molded plywood lounge chair, organic glass table, cream walls, dark olive upholstery, burnt orange and muted teal acoustic textile accents, warm architectural light, no people, no text, no logo, no watermark",
    research: {
      referenceSites: [
        { title: "MoMA - Eames Lounge Chair and Ottoman", url: "https://www.moma.org/collection/works/3325", note: "Furniture reference for the molded plywood lounge chair anchoring the MONO HOUSE listening room beside the audio console." },
        { title: "Herman Miller - Nelson Platform Bench", url: "https://www.hermanmiller.com/products/seating/benches/nelson-platform-bench/", note: "Audio-furniture reference for the rectilinear wood slats and simple legs translated into the Walnut source rail." },
        { title: "MoMA - Noguchi Coffee Table", url: "https://www.moma.org/collection/works/86474", note: "Listening-room reference for the organic glass table that lightens the MONO HOUSE furniture and equipment arrangement." },
        { title: "Vitra Design Museum - Alexander Girard", url: "https://www.design-museum.de/en/exhibitions/detailpages/alexander-girard-a-designers-universe.html", note: "Acoustic-surface reference for the restrained textile color and pattern used in speaker cloth and source controls." },
      ],
      referenceGalleries: [
        { title: "Pinterest - Mid-Century Modern Website Design", url: "https://www.pinterest.com/search/pins/?q=Mid-Century%20Modern%20website%20design", note: "Moodboard reference for warm listening-room scenes, walnut audio furniture, acoustic textiles, and record-program presentation." },
        { title: "Awwwards - Retro Websites", url: "https://www.awwwards.com/websites/retro/", note: "Gallery reference for contemporary listening-room interfaces, restrained motion, immersive equipment imagery, and polished audio controls." },
        { title: "Dribbble - Mid-Century Modern Website Design", url: "https://dribbble.com/search/Mid-Century%20Modern%20website%20design", note: "UI reference for receiver scales, source selectors, session queues, and compact audio-furniture modules in warm mid-century palettes." },
      ],
      representativeTraits: ["MONO HOUSE listening room", "SIDE A / SIDE B receiver", "Walnut source rail", "Girard acoustic cloth", "Session queue"],
      avoidTraits: ["General sepia vintage", "70s groovy overload", "Bauhaus primary-color poster"],
      tokenIntent:
        "Use a MONO HOUSE listening room, SIDE A / SIDE B receiver, Walnut source rail, Girard acoustic cloth, Session queue, cream paper surfaces, espresso text, walnut audio furniture, dark olive, burnt orange, muted mustard, brushed brass, thin borders, restrained radius, and real equipment controls so the style reads as Mid-Century Modern rather than 1970s groovy commerce, retro-futurist travel posters or capsule UI, Bauhaus primary geometry, or quiet Japandi interiors.",
    },
  },
};

const cuteCasualResearch: Partial<Record<string, StyleResearchBrief>> = {
  kitsch: {
    referenceSites: [
      { title: "ban.do", url: "https://www.bando.com/", note: "Novelty retail reference for loud lifestyle objects, playful category density, sale banners, expressive product photography, and intentionally cheerful merch language." },
      { title: "Lazy Oaf", url: "https://www.lazyoaf.com/", note: "Oddball fashion reference for quirky graphics, subcultural humor, clashing product attitude, and boutique pages that feel intentionally offbeat." },
      { title: "Lisa Says Gah", url: "https://lisasaysgah.com/", note: "Pattern-heavy boutique reference for playful fashion curation, expressive product cards, and a colorful shop voice that stays commercially usable." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Kitsch Website Design", url: "https://www.pinterest.com/search/pins/?q=Kitsch%20website%20design", note: "Moodboard reference for novelty shop layouts, clashy patterns, sticker pricing, odd product groupings, and deliberately excessive visual humor." },
      { title: "Awwwards - Colorful Websites", url: "https://www.awwwards.com/websites/colorful/", note: "Gallery reference for polished colorful web pages that keep maximal color, commerce hierarchy, and interaction quality under control." },
      { title: "Dribbble - Kitsch Website", url: "https://dribbble.com/search/kitsch%20website", note: "UI reference for kitsch ecommerce cards, novelty stickers, cheerful packaging motifs, and controlled visual clutter in web components." },
    ],
    representativeTraits: ["Novelty shop drops", "Sticker price bursts", "Clashing pattern strips", "Odd object cards", "Boutique humor"],
    avoidTraits: ["Clean dopamine reward system", "Mascot-led kawaii dashboard", "Soft beauty pastel", "Generic colorful ecommerce"],
    tokenIntent:
      "Use warm cream, hot orange, magenta, violet, yellow, thick borders, offset stickers, pattern strips, and compact novelty product cards so kitsch reads as deliberate quirky retail rather than generic cute color.",
  },
  kawaii: {
    referenceSites: [
      { title: "Sanrio", url: "https://www.sanrio.com/", note: "Character-first retail reference for mascot worlds, soft pink surfaces, rounded product rhythm, stickers, and immediately legible cuteness." },
      { title: "Pusheen", url: "https://pusheen.com/", note: "Mascot content reference for simple cute navigation, comics and quizzes, soft character framing, and approachable community content." },
      { title: "tokidoki", url: "https://www.tokidoki.it/", note: "Collectibles reference for candy color, character universes, blind-box retail modules, and dense but friendly cute product cards." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Kawaii Japanese Websites", url: "https://www.pinterest.com/wixcom/kawaii-japanese-websites/", note: "Moodboard reference for mascot-led pages, pink rounded UI, sticker details, cute shop modules, and Japanese kawaii web pacing." },
      { title: "Awwwards - Colorful Websites", url: "https://www.awwwards.com/websites/colorful/", note: "Gallery reference for professional colorful websites that preserve polish while using cheerful palettes and playful content." },
      { title: "Dribbble - Kawaii Website", url: "https://dribbble.com/tags/kawaii-website", note: "UI reference for kawaii dashboards, rounded buttons, character cards, heart badges, and soft app-like composition." },
    ],
    representativeTraits: ["Mascot tiles", "Heart badges", "Sticker navigation", "Rounded room modules", "Soft character community"],
    avoidTraits: ["Kitsch novelty clutter", "Pastel beauty editorial", "Dopamine color rewards", "Comic-book panels"],
    tokenIntent:
      "Use white and blush surfaces, pink primary actions, sky and yellow accents, large radius, soft shadows, mascot tiles, and sticker-like badges so kawaii reads as a character-world interface.",
  },
  "dopamine-design": {
    referenceSites: [
      { title: "Happy Socks", url: "https://www.happysocks.com/us", note: "Color-commerce reference for high-saturation product grids, repeated pattern impact, joyful browsing, and bright reward-like retail rhythm." },
      { title: "BAGGU", url: "https://www.baggu.com/", note: "Clean colorful commerce reference for strong object color, reusable product systems, simple nav, and visual joy without messy kitsch clutter." },
      { title: "Duolingo", url: "https://www.duolingo.com/", note: "Product UX reference for bright mascot feedback, gamified progress, confident CTAs, and cheerful reward loops that remain usable." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Dopamine Design Website Design", url: "https://www.pinterest.com/search/pins/?q=Dopamine%20Design%20website%20design", note: "Moodboard reference for color therapy, high-saturation layouts, upbeat CTA fields, and clean happy interface systems." },
      { title: "Awwwards - Colorful Websites", url: "https://www.awwwards.com/websites/colorful/", note: "Gallery reference for professional colorful execution, motion pacing, and bright designs that retain strong information hierarchy." },
      { title: "Dribbble - Dopamine Design Website", url: "https://dribbble.com/search/dopamine%20design%20website", note: "UI reference for reward meters, bright modules, color-block progress, and upbeat product dashboards." },
    ],
    representativeTraits: ["Reward meter", "High-saturation modules", "Clean color hits", "Progress feedback", "Joyful conversion path"],
    avoidTraits: ["Retro kitsch irony", "Mascot collectible shop", "Soft pastel beauty page", "Random color clutter"],
    tokenIntent:
      "Use bright yellow base, green primary, hot pink rewards, crisp white surfaces, rounded modules, progress meters, and clean high-saturation rhythm so dopamine design reads as joyful product UX.",
  },
  "pop-art": {
    referenceSites: [
      { title: "The Andy Warhol Museum", url: "https://www.warhol.org/", note: "Pop art archive reference for consumer imagery, celebrity/product repetition, museum storytelling, and bold object-centered exhibition pages." },
      { title: "Keith Haring Foundation", url: "https://www.haring.com/", note: "Graphic art reference for flat iconic figures, thick black contour, public-art archive rhythm, and simple high-contrast visual language." },
      { title: "Guggenheim Pop", url: "https://www.guggenheim.org/exhibition/guggenheim-pop", note: "Exhibition reference for pop-art historical framing, event metadata, poster-like hierarchy, and art-object archive modules." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Pop Art Website Design", url: "https://www.pinterest.com/search/pins/?q=Pop%20Art%20website%20design", note: "Moodboard reference for halftone fields, repeated objects, primary color posters, and archive-style web pages." },
      { title: "Awwwards - Art and Culture Websites", url: "https://www.awwwards.com/websites/art-culture/", note: "Gallery reference for museum-grade web craft, exhibition pacing, art-object storytelling, and polished editorial layouts." },
      { title: "Dribbble - Pop Art Website", url: "https://dribbble.com/search/pop%20art%20website", note: "UI reference for pop-art poster cards, product-object repetition, strong ink outlines, and color-block composition." },
    ],
    representativeTraits: ["Halftone block", "Repeated object", "Primary color archive", "Bold museum poster", "Consumer iconography"],
    avoidTraits: ["Sequential comic panels", "Speech balloons", "Mascot cuteness", "Toy builder UI"],
    tokenIntent:
      "Use primary red, blue, yellow, black ink borders, flat poster fields, halftone blocks, and repeated object modules so pop art reads as an art archive rather than a comic storefront.",
  },
  "comic-book-style": {
    referenceSites: [
      { title: "Marvel Comics", url: "https://www.marvel.com/comics", note: "Comic catalog reference for issue grids, cover-led cards, character franchise navigation, and dense release metadata." },
      { title: "DC Comics", url: "https://www.dc.com/comics", note: "Comic catalog reference for searchable issue lists, hero-driven cards, publisher metadata, and high-contrast entertainment hierarchy." },
      { title: "WEBTOON", url: "https://www.webtoons.com/en", note: "Digital comics reference for vertical episode browsing, genre tabs, colorful thumbnails, and mobile-first serial reading rhythm." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Comic Book Style Website Design", url: "https://www.pinterest.com/search/pins/?q=Comic%20Book%20Style%20website%20design", note: "Moodboard reference for panel grids, speech balloons, ink borders, episode cards, and comic storefront layouts." },
      { title: "Awwwards - Entertainment Websites", url: "https://www.awwwards.com/websites/entertainment/", note: "Gallery reference for entertainment pages with strong media cards, story-driven navigation, and campaign-quality polish." },
      { title: "Dribbble - Comic Book Website", url: "https://dribbble.com/search/comic%20book%20website", note: "UI reference for comic issue cards, panel-based sections, balloon labels, and bold sequential reading surfaces." },
    ],
    representativeTraits: ["Issue grid", "Speech balloon", "Episode metadata", "Heavy ink borders", "Sequential panels"],
    avoidTraits: ["Warhol-style archive poster", "Soft mascot app", "Dopamine rewards", "Pastel beauty ecommerce"],
    tokenIntent:
      "Use heavy black ink, cream paper, red blue yellow action colors, square panels, speech balloons, cover cards, and episode metadata so comic-book style reads as sequential media.",
  },
  "toy-design": {
    referenceSites: [
      { title: "LEGO", url: "https://www.lego.com/en-us", note: "Toy commerce reference for modular brick logic, age and theme filters, primary colors, product cards, and buildable system language." },
      { title: "Play-Doh / Hasbro", url: "https://play.hasbro.com/en-us/brand/play-doh", note: "Toy brand reference for soft clay visuals, kid-safe activities, bright material color, and approachable family-facing pages." },
      { title: "Fisher-Price / Mattel", url: "https://shop.mattel.com/pages/fisher-price", note: "Preschool toy reference for age-based browsing, chunky product navigation, developmental cues, and friendly toy catalog polish." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Toy Design Website Design", url: "https://www.pinterest.com/search/pins/?q=Toy%20Design%20website%20design", note: "Moodboard reference for blocky modules, toy catalogs, playset layouts, age tabs, bright packaging, and kid-friendly commerce pages." },
      { title: "Awwwards - Colorful Websites", url: "https://www.awwwards.com/websites/colorful/", note: "Gallery reference for colorful professional sites that balance playful graphics with product usability and clean hierarchy." },
      { title: "Dribbble - Toy Website", url: "https://dribbble.com/search/toy%20website", note: "UI reference for toy product cards, chunky controls, playset builders, and bright modular interface components." },
    ],
    representativeTraits: ["Block parts", "Assembly tray", "Age tabs", "Chunky controls", "Modular playset"],
    avoidTraits: ["Liquid bubble capsules", "Soft beauty pastel", "Mascot collectible shop", "Comic panels"],
    tokenIntent:
      "Use bright primary toy colors, blue base, chunky borders, modular block parts, age filters, and an assembly tray so toy design reads as physical play construction.",
  },
  "playful-design": {
    referenceSites: [
      { title: "Duolingo", url: "https://www.duolingo.com/", note: "Playful product reference for onboarding confidence, friendly mascot cues, lesson progress, and clear action hierarchy." },
      { title: "Mailchimp", url: "https://mailchimp.com/", note: "Business tool reference for friendly illustration, approachable SaaS copy, warm utility, and playful brand personality without childishness." },
      { title: "Headspace", url: "https://www.headspace.com/", note: "Wellness app reference for warm character illustration, calm playful surfaces, human-centered flows, and friendly task framing." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Playful Design Website Design", url: "https://www.pinterest.com/search/pins/?q=Playful%20Design%20website%20design", note: "Moodboard reference for friendly product flows, soft illustrations, approachable task cards, and optimistic onboarding pages." },
      { title: "Awwwards - Playful Websites", url: "https://www.awwwards.com/websites/playful/", note: "Gallery reference for polished playful websites with interaction, personality, strong hierarchy, and professional craft." },
      { title: "Dribbble - Playful Website", url: "https://dribbble.com/search/playful%20website", note: "UI reference for playful SaaS/product cards, friendly helper states, warm illustration, and lightweight motion cues." },
    ],
    representativeTraits: ["Friendly onboarding", "Mascot helper", "Gentle task cards", "Success states", "Approachable product flow"],
    avoidTraits: ["Kawaii character shop", "Toy playset builder", "Bubble product capsules", "Loud kitsch retail"],
    tokenIntent:
      "Use light lavender, orange and green accents, friendly rounded controls, clear onboarding cards, helper illustrations, and success states so playful design reads as product UX rather than childish decoration.",
  },
  "pastel-style": {
    referenceSites: [
      { title: "Glossier", url: "https://www.glossier.com/", note: "Soft beauty ecommerce reference for airy whitespace, pale pink neutrals, editorial product rows, and low-contrast polish." },
      { title: "Starface Hydro-Stars", url: "https://starface.world/products/hydro-stars-refill", note: "Cute skincare product reference for pastel/yellow product framing, clean detail-page hierarchy, and friendly beauty language." },
      { title: "Bubble Skincare", url: "https://www.bubbleskincare.com/", note: "Youth skincare reference for gentle color, rounded product architecture, soft surfaces, and approachable clean commerce." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Pastel Style Website Design", url: "https://www.pinterest.com/search/pins/?q=Pastel%20Style%20website%20design", note: "Moodboard reference for soft beauty layouts, low-contrast surfaces, airy cards, pale product photography, and gentle editorial rhythm." },
      { title: "Awwwards - Beauty Websites", url: "https://www.awwwards.com/websites/beauty/", note: "Gallery reference for professional beauty and skincare sites with refined spacing, subtle color, and polished ecommerce details." },
      { title: "Dribbble - Pastel Website", url: "https://dribbble.com/search/pastel%20website", note: "UI reference for pastel product pages, soft cards, low-contrast palettes, and elegant rounded component systems." },
    ],
    representativeTraits: ["Airy product rows", "Low-contrast set", "Soft beauty editorial", "Pale product modules", "Gentle whitespace"],
    avoidTraits: ["Mascot-heavy kawaii", "Saturated dopamine modules", "Inflated bubble UI", "Kitsch novelty clutter"],
    tokenIntent:
      "Use blush base, white surfaces, muted mauve text, pale blue and sage accents, airy spacing, subtle borders, and soft editorial product rows so pastel style reads as refined beauty rather than cute mascot design.",
  },
  "bubble-design": {
    referenceSites: [
      { title: "Bubble Skincare", url: "https://www.bubbleskincare.com/", note: "Rounded skincare reference for capsule product architecture, soft bubble-adjacent naming, and friendly but clean product modules." },
      { title: "poppi", url: "https://drinkpoppi.com/", note: "Sparkling soda reference for circular product sections, can-forward color, bubbly motion cues, and lively liquid commerce rhythm." },
      { title: "bubly", url: "https://www.bubly.com/", note: "Sparkling-water reference for simple bubble identity, round flavor language, light color, and buoyant brand surface." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Bubble Design Website Design", url: "https://www.pinterest.com/search/pins/?q=Bubble%20Design%20website%20design", note: "Moodboard reference for inflated capsules, liquid product modules, circular cards, buoyant UI, and sparkling brand pages." },
      { title: "Awwwards - Colorful Websites", url: "https://www.awwwards.com/websites/colorful/", note: "Gallery reference for polished colorful sites with rounded modules, motion, strong product staging, and professional hierarchy." },
      { title: "Dribbble - Bubble Website", url: "https://dribbble.com/search/bubble%20website", note: "UI reference for bubble-shaped cards, circular navigation, inflated panels, and soft liquid progress patterns." },
    ],
    representativeTraits: ["Inflated capsules", "Liquid progress", "Circular product modules", "Sparkling surface", "Floating flavor cards"],
    avoidTraits: ["LEGO block parts", "Flat pastel editorial", "Kawaii sticker dashboard", "Comic issue panels"],
    tokenIntent:
      "Use aqua base, white surfaces, cyan, pink, and lime accents, large inflated radii, circular product modules, and liquid progress shapes so bubble design reads as buoyant product UI.",
  },
};

const streetSubcultureResearch: Partial<Record<string, StyleResearchBrief>> = {
  streetwear: {
    referenceSites: [
      { title: "Supreme", url: "https://supreme.com/", note: "Official streetwear drop reference for direct release navigation, scarce product rhythm, box-logo restraint, and blunt commerce hierarchy." },
      { title: "Palace Skateboards", url: "https://palaceskateboards.com/", note: "Official skate-streetwear reference for range drops, web shop links, brand-world pages, and loud graphic capsule energy." },
      { title: "Stüssy", url: "https://www.stussy.com/", note: "Official streetwear reference for new arrivals, archive/chapter links, compact shop categories, and surf-skate heritage commerce." },
      { title: "BAPE US", url: "https://us.bape.com/", note: "Official streetwear reference for camo collections, large product grids, bold new-arrival modules, and strong category merchandising." },
      { title: "Kith", url: "https://kith.com/", note: "Official streetwear retail reference for collection programs, editorial capsules, detailed megamenu hierarchy, and polished product-wall commerce." },
    ],
    referenceGalleries: [
      { title: "Dribbble - Streetwear", url: "https://dribbble.com/tags/streetwear", note: "UI and campaign reference for product-drop cards, oversized typographic treatments, lookbook panels, and streetwear ecommerce composition." },
      { title: "Pinterest - Supreme / Streetwear", url: "https://www.pinterest.com/ideas/supreme-clothing-streetwear/930480009757/", note: "Moodboard reference for box-logo minimalism, drop posters, sticker-like product labels, and streetwear outfit/product wall pacing." },
      { title: "Awwwards - Fashion Websites", url: "https://www.awwwards.com/websites/fashion/", note: "Gallery reference for professional fashion commerce, lookbook transitions, product-grid polish, and campaign-grade streetwear layouts." },
    ],
    representativeTraits: ["Drop ledger", "Size run matrix", "Lookbook strip", "Release clock", "Streetwear product wall"],
    avoidTraits: ["Generic rotated street poster", "Graffiti spray wall", "Punk torn flyer", "Luxury fashion softness"],
    tokenIntent:
      "Use bone paper, black ink, warning red, acid green, royal blue, hard square modules, dense product grids, drop timers, SKU labels, and lookbook strips so streetwear reads as a real drop-commerce page.",
  },
  graffiti: {
    referenceSites: [
      { title: "Montana Cans - Spray Cans", url: "https://www.montana-cans.com/Products/SPRAY-CANS/", note: "Official spray-paint product reference for can-heavy merchandising, graffiti-specific tools, high-pressure labeling, color range density, and utility-first product grids." },
      { title: "MOLOTOW - Spray Cans", url: "https://brand.molotow.com/en/products/spray-cans/", note: "Official graffiti materials reference for bold product ranges, mural language, over-275-color rack logic, and spray-can storytelling tied to walls and pieces." },
      { title: "Bombing Science", url: "https://www.bombingscience.com/", note: "Graffiti culture and supply reference for pictures plus commerce, article feeds, tool categories, writer-support messaging, and street-scene archive rhythm." },
      { title: "Streetpins", url: "https://streetpins.com/", note: "Graffiti photo community reference for ranked uploads, tag/photo metrics, city indexes, weekly archive posts, and wall documentation UI." },
      { title: "Street Art Cities", url: "https://streetartcities.com/about", note: "Street-art mapping reference for city artwork indexes, hunter/community roles, verified artist counts, and map-led public wall discovery." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Graffiti Website Design", url: "https://www.pinterest.com/search/pins/?q=graffiti%20website%20design", note: "Moodboard reference for spray-wall texture, handstyle lettering, layered stickers, tag clusters, brick/concrete surfaces, and noisy color overlays." },
      { title: "Awwwards - Culture Websites", url: "https://www.awwwards.com/websites/culture/", note: "Professional culture-site gallery for translating raw street visuals into polished navigation, responsive hierarchy, and editorial-grade interaction surfaces." },
      { title: "Dribbble - Graffiti Website", url: "https://dribbble.com/search/graffiti%20website", note: "UI reference for graffiti-themed layouts, paint palettes, marker-style labels, archive panels, and compact visual systems that still read as product UI." },
    ],
    representativeTraits: ["Graffiti wall scanner", "Wall tag index", "Spray color rack", "Crew tag archive", "Mural route map"],
    avoidTraits: ["Streetwear product drop", "Fashion SKU cards", "Punk ransom-note collage", "Generic tilted campaign poster"],
    tokenIntent:
      "Use concrete and brick wall texture, black marker ink, chrome/signal-white contrast, toxic green and hot paint accents, spray-can rack modules, tag indexes, drip overlays, and route-map pins so graffiti reads as a real wall archive and material system.",
  },
  "hiphop-style": {
    referenceSites: [
      { title: "XXL Magazine", url: "https://www.xxlmag.com/", note: "Hip-hop magazine reference for bold news hierarchy, Freshman-list energy, album/video modules, artist-first editorial cards, and loud music-culture pacing." },
      { title: "HipHopDX", url: "https://hiphopdx.com/", note: "Hip-hop news reference for dense release feeds, review/news segmentation, video and artist modules, and high-contrast music-publisher navigation." },
      { title: "Genius", url: "https://genius.com/", note: "Lyrics and annotation reference for line-level commentary, yellow highlight language, knowledge-card rails, and reader interaction around bars and verses." },
      { title: "Lyrical Lemonade", url: "https://www.lyricallemonade.com/", note: "Music-video and culture reference for video-led grids, saturated youth-culture art direction, artist tiles, and mixtape-style content rhythm." },
      { title: "Mass Appeal", url: "https://www.massappeal.com/", note: "Hip-hop creative studio reference for premium black-and-gold editorial tone, artist documentary language, cultural storytelling, and polished campaign surfaces." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Hip Hop Website Design", url: "https://www.pinterest.com/search/pins/?q=hip%20hop%20website%20design", note: "Moodboard reference for mixtape covers, speaker stacks, tracklist panels, lyric posters, waveform stickers, and music-campaign color contrast." },
      { title: "Awwwards - Music & Sound Websites", url: "https://www.awwwards.com/websites/music-sound/", note: "Professional music-site gallery for audio-player layouts, immersive artist pages, video grids, editorial transitions, and responsive music storytelling." },
      { title: "Dribbble - Hip Hop Website", url: "https://dribbble.com/search/hip%20hop%20website", note: "UI reference for music dashboards, player cards, artist promo pages, playlist grids, and bold type systems adapted to hip-hop culture." },
    ],
    representativeTraits: ["Tracklist index", "Beat grid mixer", "Artist card stack", "Lyric annotation rail", "Release waveform"],
    avoidTraits: ["Graffiti wall scanner", "Streetwear product drop", "Skate sticker collage", "Punk torn protest flyer"],
    tokenIntent:
      "Use black studio base, warm paper and gold accents, signal red, electric blue, dense tracklist modules, waveform strips, artist cards, lyric annotation rails, and mixer pads so hip-hop style reads as a real music-culture interface.",
  },
  "skate-culture": {
    referenceSites: [
      { title: "The Berrics", url: "https://theberrics.com/", note: "Skate media reference for clip-led home modules, canteen shop links, park-shot rhythm, and skateboarding video culture presented as a living feed." },
      { title: "Nike SB", url: "https://www.nikesb.com/", note: "Skateboarding brand reference for team/vault/skateshop navigation, video-first stories, city skate sessions, and polished skate editorial systems." },
      { title: "Independent Trucks", url: "https://independenttrucks.com/", note: "Skate hardware reference for truck-category grids, parts merchandising, rider credibility, and no-nonsense hardgoods commerce hierarchy." },
      { title: "Santa Cruz Skateboards", url: "https://santacruzskateboards.com/skate", note: "Deck and hardgoods reference for pro deck walls, team/reissue/VX categories, bold board graphics, and dense skateboard product indexing." },
      { title: "Skatepark of Tampa", url: "https://skateparkoftampa.com/", note: "Skate shop and event reference for shoes/decks/wheels/trucks category blocks, contest modules, skater shopping paths, and park-culture credibility." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Skate Website Design", url: "https://www.pinterest.com/search/pins/?q=skate%20website%20design", note: "Moodboard reference for deck walls, sticker slaps, skate shop menus, contest posters, fisheye frames, and worn concrete color systems." },
      { title: "Awwwards - Sports Websites", url: "https://www.awwwards.com/websites/sports/", note: "Professional sports-site gallery for turning motion, athlete stories, category navigation, and retail paths into responsive polished interfaces." },
      { title: "Dribbble - Skateboard Website", url: "https://dribbble.com/search/skateboard%20website", note: "UI reference for skate shop layouts, product deck grids, event cards, mobile category bars, and sticker-style labels without generic street posters." },
    ],
    representativeTraits: ["Spot checklist", "Deck wall grid", "Trick line map", "Clip sequence rail", "Sticker slap index"],
    avoidTraits: ["Streetwear product drop", "Graffiti wall scanner", "Hip-hop waveform console", "Punk protest flyer"],
    tokenIntent:
      "Use weathered concrete, black grip, safety orange, washed teal, deck wood, sticker labels, clip strips, deck-wall product grids, route lines, and spot checklists so skate culture reads as a skate shop and park-session interface.",
  },
  punk: {
    referenceSites: [
      { title: "Punknews.org", url: "https://www.punknews.org/", note: "Punk news and community reference for dense headlines, label premieres, review feeds, small-format culture posts, and rough bulletin-board rhythm." },
      { title: "Fat Wreck Chords", url: "https://fatwreck.com/", note: "Punk label/store reference for release announcements, merch rows, catalog browsing, touring snippets, and irreverent label voice." },
      { title: "Epitaph Records", url: "https://www.epitaph.com/", note: "Punk and alternative label reference for artist/release grids, video/news modules, record-store hierarchy, and high-contrast promotional pages." },
      { title: "Dischord Records", url: "https://dischord.com/", note: "DIY punk label reference for stripped-down catalog structure, practical record information, low-polish authenticity, and archive-first navigation." },
      { title: "Maximum Rocknroll", url: "https://www.maximumrocknroll.com/about/", note: "Punk zine reference for underground scene voice, fanzine legacy, reviews, columns, radio, and photocopied editorial texture." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Punk Zine Website Design", url: "https://www.pinterest.com/search/pins/?q=punk%20zine%20website%20design", note: "Moodboard reference for ransom typography, photocopy texture, torn flyers, gig posters, badge grids, and black-white-red zine composition." },
      { title: "Awwwards - Music & Sound Websites", url: "https://www.awwwards.com/websites/music-sound/", note: "Professional music-site gallery for adapting raw label/flyer language into responsive pages with usable navigation and release hierarchy." },
      { title: "Dribbble - Punk Zine Website", url: "https://dribbble.com/search/punk%20zine%20website", note: "UI reference for punk zine layouts, collage editorial cards, distressed type blocks, release lists, and flyer-inspired web components." },
    ],
    representativeTraits: ["Zine dispatch", "Ransom headline stack", "Gig flyer rail", "Patch badge grid", "Photocopy noise field"],
    avoidTraits: ["Skate spot checklist", "Hip-hop waveform console", "Graffiti wall scanner", "Streetwear product drop"],
    tokenIntent:
      "Use xerox white, black ink, hazard red, acid yellow, torn-paper panels, ransom headline stacks, gig flyer rails, patch badges, release ledgers, and photocopy noise so punk reads as DIY zine and label culture rather than generic street graphics.",
  },
  grunge: {
    referenceSites: [
      { title: "Nirvana Official", url: "https://www.nirvana.com/", note: "Official grunge band reference for dark archive/store/discography pages, damaged album memory, sparse navigation, and worn music-culture hierarchy." },
      { title: "Sub Pop", url: "https://www.subpop.com/", note: "Seattle label reference for records, artists, news, catalog modules, indie label commerce, and grunge heritage without punk flyer aggression." },
      { title: "Soundgarden Official", url: "https://www.soundgardenworld.com/", note: "Official band archive reference for dark album, video, tour, and merch modules with heavy grunge legacy and restrained editorial structure." },
      { title: "Pearl Jam Official", url: "https://pearljam.com/", note: "Official band reference for tour/archive/community/shop organization, grounded music navigation, and sober alternative-rock page rhythm." },
      { title: "Mudhoney - Sub Pop", url: "https://www.subpop.com/artists/mudhoney", note: "Artist catalog page reference for Seattle grunge bio, discography, label archive, and low-polish historical content structure." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Grunge Website Design", url: "https://www.pinterest.com/search/pins/?q=grunge%20website%20design", note: "Moodboard reference for torn photos, dirty paper, cassette tape labels, flannel plaid, faded denim, and low-saturation distressed website layouts." },
      { title: "Awwwards - Music & Sound Websites", url: "https://www.awwwards.com/websites/music-sound/", note: "Professional music-site gallery for translating band archives, tour pages, release modules, and merch paths into responsive production interfaces." },
      { title: "Dribbble - Grunge Website", url: "https://dribbble.com/search/grunge%20website", note: "UI reference for grunge-inspired editorial cards, damaged image stacks, distressed type blocks, cassette motifs, and rough music landing pages." },
    ],
    representativeTraits: ["Distorted archive", "Torn photo stack", "Cassette setlist rail", "Flannel texture board", "Basement gig log"],
    avoidTraits: ["Punk ransom flyer", "Skate spot checklist", "Hip-hop waveform console", "Graffiti wall scanner"],
    tokenIntent:
      "Use charcoal, dirty paper, faded denim, rust, muted moss, torn photo panels, cassette setlist rails, flannel plaid, basement gig logs, and degraded photocopy grain so grunge reads as a distressed music archive rather than punk zine or skate shop.",
  },
  "indie-sleaze": {
    referenceSites: [
      { title: "The Cobrasnake", url: "https://www.thecobrasnake.com/", note: "Party photography archive reference for harsh flash portraits, nightlife grids, messy candid crops, celebrity-afterparty energy, and early-2000s blog culture." },
      { title: "CARI - Indie Sleaze", url: "https://cari.institute/aesthetics/indie-sleaze", note: "Aesthetic research reference for the era's flash photography, American Apparel energy, Tumblr/MySpace surfaces, skinny silhouettes, and bloghaus-adjacent visual cues." },
      { title: "Dazed", url: "https://www.dazeddigital.com/", note: "Fashion and youth-culture reference for reviving indie sleaze through club styling, editorial flash, grainy nightlife, and rebellious image-led layouts." },
      { title: "Nylon", url: "https://www.nylon.com/", note: "Pop-fashion media reference for trend-led outfit language, celebrity street style, glossy-black editorial cards, and accessible indie-sleaze styling cues." },
      { title: "Vogue", url: "https://www.vogue.com/", note: "Fashion editorial reference for translating the trend into professional styling hierarchy, trend notes, runway/street-style imagery, and polished article layouts." },
      { title: "ASOS", url: "https://www.asos.com/", note: "Retail reference for making indie-sleaze styling practical through outfit tags, product rails, black-and-white campaign modules, and trend shopping paths." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Indie Sleaze Website Design", url: "https://www.pinterest.com/search/pins/?q=indie%20sleaze%20website%20design", note: "Moodboard reference for flash photos, sticker overlays, black mini-dress styling, cigarette-smoke grain, club stamps, and messy 2000s web layouts." },
      { title: "Awwwards - Fashion & Beauty Websites", url: "https://www.awwwards.com/websites/fashion-beauty/", note: "Professional gallery for adapting trend photography, fashion editorial structure, campaign navigation, and shopping modules into high-quality responsive pages." },
      { title: "Dribbble - Indie Sleaze Website", url: "https://dribbble.com/search/indie%20sleaze%20website", note: "UI reference for nightlife photo feeds, sticker-like labels, hot-pink/cyan accents, playlist cards, and fashion-culture landing compositions." },
    ],
    representativeTraits: ["Flash photo index", "Disposable camera grid", "Club stamp rail", "Bloghaus playlist deck", "Messy outfit tags"],
    avoidTraits: ["Grunge tape archive", "Rave laser stage", "Punk ransom flyer", "Streetwear product drop"],
    tokenIntent:
      "Use flash-white photo cards, black party backgrounds, hot-pink stickers, cyan link accents, disposable camera frames, club stamp rails, bloghaus playlist decks, and messy outfit tags so indie sleaze reads as 2000s nightlife fashion media rather than grunge music archive or rave stage graphics.",
  },
  "rave-style": {
    referenceSites: [
      { title: "Resident Advisor", url: "https://ra.co/", note: "Electronic music event reference for dense club listings, artist/date filters, ticket paths, location metadata, and underground nightlife utility." },
      { title: "Boiler Room", url: "https://boilerroom.tv/", note: "Live electronic music media reference for session cards, dark video grids, artist context, broadcast energy, and club-culture editorial modules." },
      { title: "Tomorrowland", url: "https://www.tomorrowland.com/", note: "Festival reference for large-scale stage worlds, lineups, tickets, immersive event branding, bright spectacle, and multi-day navigation systems." },
      { title: "Ultra Music Festival", url: "https://ultramusicfestival.com/", note: "Electronic festival reference for lineup hierarchy, ticket CTAs, stage visuals, schedule blocks, and high-energy neon festival promotion." },
      { title: "Amsterdam Dance Event", url: "https://www.amsterdam-dance-event.nl/", note: "Electronic music conference and festival reference for program grids, venue maps, artist sessions, ticket passes, and citywide nightlife structure." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Rave Festival Website Design", url: "https://www.pinterest.com/search/pins/?q=rave%20festival%20website%20design", note: "Moodboard reference for laser grids, wristbands, neon lineups, warehouse flyers, sound-system graphics, and festival-stage poster systems." },
      { title: "Awwwards - Events Websites", url: "https://www.awwwards.com/websites/events/", note: "Professional event-site gallery for schedule grids, ticket flows, venue modules, animated stage visuals, and responsive festival storytelling." },
      { title: "Dribbble - Rave Festival Website", url: "https://dribbble.com/search/rave%20festival%20website", note: "UI reference for BPM dashboards, neon event cards, stage maps, ticket badges, artist lineup blocks, and nightclub landing pages." },
    ],
    representativeTraits: ["Laser stage map", "BPM lineup grid", "Ticket wristband rail", "Sound system meters", "Warehouse light tunnel"],
    avoidTraits: ["Indie sleaze flash feed", "Cyberpunk city dashboard", "Grunge tape archive", "Streetwear product drop"],
    tokenIntent:
      "Use black event surfaces, acid green, cyan laser beams, safety orange ticket accents, magenta light trails, BPM lineup grids, wristband rails, sound-system meters, warehouse tunnel depth, and stage-map geometry so rave style reads as electronic event infrastructure rather than cyberpunk UI or indie party photography.",
  },
  "lo-fi": {
    referenceSites: [
      { title: "Lofi Girl", url: "https://lofigirl.com/", note: "Lo-fi music brand reference for calm streaming identity, study-beat culture, illustrated listening worlds, shop/community paths, and soft always-on ambience." },
      { title: "Chillhop Music", url: "https://chillhop.com/", note: "Lo-fi and chill beats label reference for seasonal compilations, cozy release cards, playlist navigation, merch modules, and warm analog listening surfaces." },
      { title: "Bandcamp", url: "https://bandcamp.com/", note: "Independent music marketplace reference for album pages, track lists, purchase modules, community discovery, and low-polish artist-first music browsing." },
      { title: "NTS Radio", url: "https://www.nts.live/", note: "Independent radio reference for show archives, schedule rows, muted player controls, editorial curation, and listening-history interface patterns." },
      { title: "SoundCloud", url: "https://soundcloud.com/", note: "Music platform reference for waveform players, queue cards, creator profiles, comments, and casual playlist discovery across lo-fi communities." },
    ],
    referenceGalleries: [
      { title: "Pinterest - Lo-fi Music Website Design", url: "https://www.pinterest.com/search/pins/?q=lofi%20music%20website%20design", note: "Moodboard reference for cassette decks, dusty sampler pads, paper notes, cozy room players, muted browns, tape labels, and analog music UI." },
      { title: "Awwwards - Music & Sound Websites", url: "https://www.awwwards.com/websites/music-sound/", note: "Professional music-site gallery for translating listening experiences, release cards, player controls, and artist/label navigation into polished responsive interfaces." },
      { title: "Dribbble - Lo-fi Music Website", url: "https://dribbble.com/search/lofi%20music%20website", note: "UI reference for relaxed music players, tape textures, waveform cards, warm desktop widgets, album queues, and quiet beat-making dashboards." },
    ],
    representativeTraits: ["Lo-fi loop desk", "Dusty sampler pads", "Cassette progress rail", "Bedroom radio queue", "Paper note texture"],
    avoidTraits: ["Rave laser stage", "Indie sleaze flash feed", "Grunge tape archive", "Retro diner commerce"],
    tokenIntent:
      "Use warm paper, faded olive, tape brown, muted denim, cream borders, cassette progress rails, dusty sampler pads, quiet waveform cards, bedroom radio queues, and paper note texture so lo-fi reads as a calm listening and beat-making desk rather than retro shop, grunge archive, or rave interface.",
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
    typography: { weightDisplay: 900, weightBody: 550, tracking: "0em", headingScale: 1.2 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.55rem", padScale: 0.82 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "left", navStyle: "underline", alignment: "left" },
  },
  "new-brutalism": {
    typography: { weightDisplay: 900, weightBody: 650, tracking: "0em", headingScale: 1.18 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "3px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.55rem", padScale: 0.88 },
    decoration: { shadow: "6px 6px 0 var(--st-border)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "anti-design": {
    typography: { weightDisplay: 900, weightBody: 550, tracking: "0em", headingScale: 1.18 },
    shape: { radius: "20px", radiusPill: "999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.5rem", padScale: 0.8 },
    decoration: { shadow: "10px 10px 0 var(--st-accent-2)", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "maximalism": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 600, weightBody: 400, tracking: "0.01em", headingScale: 1.14 },
    shape: { radius: "6px", radiusPill: "999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.6rem", padScale: 0.95 },
    decoration: { shadow: "0 24px 48px rgb(10 4 20 / 0.45)", effect: "grain" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "left" },
  },
  "glitch-art": {
    typography: { displayFont: '"SFMono-Regular", Consolas, monospace', bodyFont: '"SFMono-Regular", Consolas, monospace', weightDisplay: 900, weightBody: 500, tracking: "0em", headingScale: 1.2 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "1px", borderStyle: "dashed" },
    space: { density: "tight", gap: "0.42rem", padScale: 0.8 },
    decoration: { shadow: "4px 0 0 var(--st-accent), -4px 0 0 var(--st-accent-2), 0 0 20px rgb(var(--st-accent-rgb) / 0.32)", effect: "glitch" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  grunge: {
    // Worn condensed display, aged serif body, heavy photocopy grain. Loose,
    // low-polish music archive — not punk's high-contrast ransom aggression.
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Georgia", "Times New Roman", serif', weightDisplay: 800, weightBody: 400, tracking: "-0.02em", headingScale: 1.26 },
    shape: { radius: "1px", radiusPill: "1px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.7rem", padScale: 0.95 },
    decoration: { shadow: "0 16px 34px rgb(0 0 0 / 0.5)", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "underline", alignment: "left" },
  },
  "hiphop-style": {
    typography: { displayFont: '"Bricolage Grotesque", sans-serif', bodyFont: '"Hanken Grotesk", sans-serif', weightDisplay: 800, weightBody: 500, tracking: "-0.03em", headingScale: 1.3 },
    shape: { radius: "2px", radiusPill: "2px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.7rem", padScale: 1 },
    decoration: { shadow: "0 18px 40px rgb(0 0 0 / 0.55)", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  deconstructivism: {
    typography: { weightDisplay: 900, weightBody: 500, tracking: "0em", headingScale: 1.18 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.62rem", padScale: 0.9 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "split", navStyle: "underline", alignment: "left" },
  },
  "avant-garde": {
    typography: { weightDisplay: 900, weightBody: 450, tracking: "0em", headingScale: 1.16 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.78rem", padScale: 0.98 },
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
  "mid-century-modern": {
    typography: { displayFont: '"Gill Sans", "Avenir Next", "Trebuchet MS", sans-serif', bodyFont: '"Avenir Next", "Trebuchet MS", sans-serif', weightDisplay: 700, weightBody: 500, tracking: "0em", headingScale: 0.98 },
    shape: { radius: "10px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.85rem", padScale: 1.0 },
    decoration: { shadow: "none", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "underline", alignment: "left" },
  },
  "cyberpunk": {
    typography: { bodyFont: '"SFMono-Regular", monospace', tracking: "0.02em" },
    shape: { radius: "2px", borderWidth: "1px" },
    decoration: { shadow: "0 0 24px rgb(var(--st-accent-rgb) / 0.6)", effect: "glow" },
  },
  hud: {
    typography: { displayFont: '"SFMono-Regular", "Consolas", monospace', bodyFont: '"SFMono-Regular", "Consolas", monospace', weightDisplay: 600, tracking: "0.08em", headingScale: 0.96 },
    shape: { radius: "2px", radiusPill: "2px", borderWidth: "1px" },
    space: { density: "tight", gap: "0.6rem", padScale: 0.9 },
    decoration: { shadow: "0 0 18px rgb(var(--st-accent-rgb) / 0.5)", effect: "glow" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "left" },
  },
  "neon-noir": {
    typography: { bodyFont: '"SFMono-Regular", monospace', weightDisplay: 700, tracking: "0.04em", headingScale: 1.08 },
    shape: { radius: "2px", radiusPill: "2px", borderWidth: "1px" },
    space: { density: "tight", gap: "0.55rem", padScale: 0.9 },
    decoration: { shadow: "0 0 28px rgb(var(--st-accent-rgb) / 0.7)", effect: "scanline" },
  },
  "ai-aesthetic": {
    typography: { weightDisplay: 600, tracking: "-0.01em", headingScale: 1.04 },
    shape: { radius: "14px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "0.85rem", padScale: 1.05 },
    decoration: { shadow: "0 16px 36px rgb(var(--st-accent-rgb) / 0.18)", effect: "gradient" },
    layout: { heroVariant: "center", navStyle: "underline", alignment: "left" },
  },
  chromecore: {
    typography: { weightDisplay: 800, tracking: "-0.02em", headingScale: 1.12 },
    shape: { radius: "16px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    decoration: { shadow: "0 14px 30px rgb(var(--st-text-rgb) / 0.22), inset 0 1px 0 rgb(255 255 255 / 0.9)" },
  },
  kitsch: {
    typography: { displayFont: '"Trebuchet MS", "Arial", sans-serif', weightDisplay: 900, weightBody: 600, tracking: "0em", headingScale: 1.18 },
    shape: { radius: "12px", radiusPill: "9999px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.55rem", padScale: 0.9 },
    decoration: { shadow: "5px 5px 0 var(--st-accent-3)", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  kawaii: {
    typography: { displayFont: '"Trebuchet MS", "Arial", sans-serif', weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.06 },
    shape: { radius: "24px", radiusPill: "9999px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.82rem", padScale: 1.06 },
    decoration: { shadow: "4px 4px 0 var(--st-accent)", effect: "none" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "center" },
  },
  "dopamine-design": {
    typography: { displayFont: '"Trebuchet MS", "Arial", sans-serif', weightDisplay: 850, weightBody: 600, tracking: "0em", headingScale: 1.14 },
    shape: { radius: "22px", radiusPill: "9999px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.72rem", padScale: 1.0 },
    decoration: { shadow: "0 14px 28px rgb(var(--st-accent-rgb) / 0.18)", effect: "gradient" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "pop-art": {
    typography: { displayFont: '"Arial Black", Impact, sans-serif', weightDisplay: 900, weightBody: 650, tracking: "0em", headingScale: 1.24 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "3px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.5rem", padScale: 0.88 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "left", navStyle: "boxed", alignment: "left" },
  },
  "comic-book-style": {
    typography: { displayFont: '"Arial Black", Impact, sans-serif', weightDisplay: 900, weightBody: 650, tracking: "0em", headingScale: 1.18 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "3px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.5rem", padScale: 0.86 },
    decoration: { shadow: "5px 5px 0 var(--st-accent-3)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "toy-design": {
    typography: { displayFont: '"Trebuchet MS", "Arial", sans-serif', weightDisplay: 850, weightBody: 600, tracking: "0em", headingScale: 1.06 },
    shape: { radius: "14px", radiusPill: "9999px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.7rem", padScale: 0.96 },
    decoration: { shadow: "0 10px 0 rgb(var(--st-text-rgb) / 0.08)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "playful-design": {
    typography: { displayFont: '"Trebuchet MS", "Arial", sans-serif', weightDisplay: 760, weightBody: 500, tracking: "0em", headingScale: 1.0 },
    shape: { radius: "18px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.9rem", padScale: 1.06 },
    decoration: { shadow: "0 16px 34px rgb(var(--st-text-rgb) / 0.09)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "pastel-style": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 500, weightBody: 350, tracking: "0em", headingScale: 0.94 },
    shape: { radius: "24px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.35rem", padScale: 1.35 },
    decoration: { shadow: "0 18px 44px rgb(var(--st-text-rgb) / 0.05)", effect: "none" },
    layout: { heroVariant: "left", navStyle: "minimal", alignment: "left" },
  },
  "bubble-design": {
    typography: { displayFont: '"Trebuchet MS", "Arial", sans-serif', weightDisplay: 820, weightBody: 500, tracking: "0em", headingScale: 1.08 },
    shape: { radius: "28px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.85rem", padScale: 1.08 },
    decoration: { shadow: "0 18px 40px rgb(var(--st-accent-rgb) / 0.16)", effect: "gradient" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "center" },
  },
  "classic": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 400, weightBody: 300, tracking: "0.02em", headingScale: 0.9 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.45rem", padScale: 1.45 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "neoclassic": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 400, weightBody: 300, tracking: "0.03em", headingScale: 0.88 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.6rem", padScale: 1.6 },
    decoration: { shadow: "0 18px 40px rgb(var(--st-text-rgb) / 0.08)", effect: "none" },
    layout: { heroVariant: "center", navStyle: "minimal", alignment: "center" },
  },
  "luxury": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 300, weightBody: 300, tracking: "0.06em", headingScale: 0.84 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "2rem", padScale: 1.8 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "old-money": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 400, weightBody: 300, tracking: "0.03em", headingScale: 0.9 },
    shape: { radius: "2px", radiusPill: "2px", borderWidth: "1px" },
    space: { density: "airy", gap: "1.8rem", padScale: 1.65 },
    decoration: { shadow: "0 14px 36px rgb(var(--st-text-rgb) / 0.10)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "art-deco": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 500, weightBody: 400, tracking: "0.08em", headingScale: 0.92 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "1px", borderStyle: "double" },
    space: { density: "normal", gap: "0.85rem", padScale: 1.08 },
    decoration: { shadow: "0 18px 42px rgb(0 0 0 / 0.28)", effect: "none" },
    layout: { heroVariant: "center", navStyle: "underline", alignment: "center" },
  },
  "art-nouveau": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 400, weightBody: 350, tracking: "0.01em", headingScale: 0.94 },
    shape: { radius: "18px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.35rem", padScale: 1.35 },
    decoration: { shadow: "0 16px 34px rgb(var(--st-text-rgb) / 0.08)", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "baroque": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 500, weightBody: 350, tracking: "0.02em", headingScale: 0.94 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "1px", borderStyle: "double" },
    space: { density: "normal", gap: "0.9rem", padScale: 1.05 },
    decoration: { shadow: "0 18px 52px rgb(0 0 0 / 0.38)", effect: "grain" },
    layout: { heroVariant: "center", navStyle: "minimal", alignment: "center" },
  },
  "rococo": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 400, weightBody: 300, tracking: "0.02em", headingScale: 0.9 },
    shape: { radius: "22px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.25rem", padScale: 1.25 },
    decoration: { shadow: "0 16px 36px rgb(var(--st-text-rgb) / 0.07)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "gothic": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 600, weightBody: 350, tracking: "0.03em", headingScale: 0.96 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.85rem", padScale: 1.0 },
    decoration: { shadow: "0 20px 54px rgb(0 0 0 / 0.42)", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "underline", alignment: "left" },
  },
  "organic-design": {
    typography: { displayFont: '"Satoshi", sans-serif', weightDisplay: 650, weightBody: 400, tracking: "0em", headingScale: 0.98 },
    shape: { radius: "18px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.25rem", padScale: 1.3 },
    decoration: { shadow: "none", effect: "grain" },
  },
  natural: {
    typography: { displayFont: '"Satoshi", sans-serif', weightDisplay: 650, weightBody: 400, tracking: "0em", headingScale: 0.95 },
    shape: { radius: "2px", radiusPill: "2px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.35rem", padScale: 1.28 },
    decoration: { shadow: "none", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  botanical: {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 500, weightBody: 350, tracking: "0em", headingScale: 0.96 },
    shape: { radius: "14px", radiusPill: "9999px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.2rem", padScale: 1.22 },
    decoration: { shadow: "0 12px 30px rgb(var(--st-text-rgb) / 0.06)", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "eco-design": {
    typography: { displayFont: '"Satoshi", sans-serif', weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.02 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.9rem", padScale: 1.05 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "split", navStyle: "underline", alignment: "left" },
  },
  rustic: {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 700, weightBody: 450, tracking: "0em", headingScale: 1.02 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.9rem", padScale: 1.05 },
    decoration: { shadow: "5px 5px 0 var(--st-accent-2)", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  kinfolk: {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 400, weightBody: 300, tracking: "0em", headingScale: 0.88 },
    shape: { radius: "0px", radiusPill: "0px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.55rem", padScale: 1.55 },
    decoration: { shadow: "none", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  handmade: {
    typography: { displayFont: '"Satoshi", sans-serif', weightDisplay: 800, weightBody: 500, tracking: "0em", headingScale: 1.08 },
    shape: { radius: "3px", radiusPill: "3px", borderWidth: "1px", borderStyle: "dashed" },
    space: { density: "normal", gap: "0.85rem", padScale: 1.0 },
    decoration: { shadow: "4px 4px 0 var(--st-accent-3)", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  craft: {
    typography: { displayFont: '"Satoshi", sans-serif', weightDisplay: 760, weightBody: 430, tracking: "0em", headingScale: 0.98 },
    shape: { radius: "1px", radiusPill: "1px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.95rem", padScale: 1.08 },
    decoration: { shadow: "3px 3px 0 var(--st-accent-3)", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "wabi-sabi": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 400, weightBody: 300, tracking: "0em", headingScale: 0.88 },
    shape: { radius: "6px", radiusPill: "12px", borderWidth: "1px", borderStyle: "dashed" },
    space: { density: "airy", gap: "1.6rem", padScale: 1.55 },
    decoration: { shadow: "none", effect: "grain" },
    layout: { heroVariant: "split", navStyle: "minimal", alignment: "left" },
  },
  "streetwear": {
    typography: { weightDisplay: 900, tracking: "-0.04em", headingScale: 1.2 },
    shape: { radius: "0px", borderWidth: "4px" },
    space: { density: "tight", gap: "0.4rem", padScale: 0.8 },
    decoration: { shadow: "5px 5px 0 var(--st-accent)", effect: "none" },
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

const styleMoodboards: Partial<Record<string, StyleMoodboard>> = {
  minimalism: {
    alt: "Minimalism moodboard with warm white research prints, architectural photo crops, paper swatches, neutral color chips, tape, cotton fabric, and stone.",
    caption: "Quiet reduction: use real research artifacts, generous blank space, tactile neutral materials, and precise crop rhythm so the page feels intentional instead of empty.",
    directionKeywords: ["real research board", "large negative space", "thin-rule hierarchy", "neutral tactile materials", "quiet architectural crops"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/minimalism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Minimalism in web design. The board should look like a real designer's research board photographed from above on a warm white studio table. Include sparse printed website layout references with large blank space, thin-rule editorial grids, off-white paper samples, matte packaging blanks, neutral color chips, one small natural stone object, a folded cotton fabric swatch, and cropped architectural or product photography fragments. Use tape corners, slight paper curl, varied paper thickness, pin marks, soft shadows, subtle dust, and uneven crop edges. Palette: warm white, ivory, stone, greige, graphite, muted olive. No readable text, no logos, no brand names, no fake interface text, no floating cards, no decorative clutter, no sterile AI mockup look.",
  },
  modernism: {
    alt: "Modernism moodboard with taped grid studies, modernist architecture crops, primary color cards, metal samples, ruler, pen, and industrial product fragments.",
    caption: "Functional geometry: combine rational printed layouts, primary accent blocks, modernist architecture, and industrial materials so the style reads as system-led and useful.",
    directionKeywords: ["real research board", "functional geometry", "primary color accents", "modernist architecture", "industrial material logic"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/modernism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Modernism in web design. The board should look like a real designer's research board photographed from above on an ivory studio table. Include printed rational grid-based website layouts, cropped modernist architecture photographs, industrial product photography fragments, modular paper blocks, primary-color swatches, black rule-line studies, thin alignment strips, metal and glass material samples, and clean composition studies. Use tape corners, slight paper curl, pin marks, varied paper thickness, subtle dust, and measured spacing. Palette: ivory, black, neutral grey, primary red, cobalt blue, warm yellow, brushed steel. No readable text, no logos, no brand names, no fake labels, no floating cards, no decorative collage chaos, no retro poster typography.",
  },
  "swiss-design": {
    alt: "Swiss Design moodboard with taped modular print grids, red signal bars, grayscale architecture crops, ruler edges, crop marks, and baseline studies.",
    caption: "Typographic order without decoration: let real print proofs, grid overlays, red signal marks, and measured spacing carry the visual language.",
    directionKeywords: ["real print proofs", "baseline structure", "modular columns", "red signal bars", "institutional clarity"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/swiss-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Swiss Design in web design. The board should look like a real designer's print layout research board photographed from above on a bright white archive table. Include printed modular website grids, baseline grid overlays on translucent paper, strict column studies, grayscale architecture and museum-page crop references, red signal bars, abstract black typographic blocks with no readable text, thin rule systems, ruler edges, crop marks, paper strips, and neutral print samples. Use tape, pin marks, subtle paper curl, slight hand placement misalignment, dust, and varied paper thickness. Palette: white, black, light grey, medium grey, signal red, muted photo grey. No readable text, no logos, no brand names, no fake labels, no playful decoration, no messy collage.",
  },
  "international-style": {
    alt: "International Style moodboard with universal information panels, blue wayfinding modules, airport architecture crops, map-like grids, acrylic, glass, and steel samples.",
    caption: "Universal clarity: standardize the page with neutral information modules, transport-blue hierarchy, objective spacing, and durable public-system materials.",
    directionKeywords: ["real standards board", "universal information system", "transport blue", "standardized modules", "public-system materials"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/international-style-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for International Style in web design. The board should look like a real designer's standards manual review board photographed from above on a cool grey-white design office table. Include printed universal information system references, neutral website layout modules, wayfinding-style panels without readable text, abstract icon placeholder cards, transport-blue strips, black and grey information bars, stainless steel swatches, frosted acrylic samples, glass edge samples, adhesive tabs, map-like grid fragments without labels, and standardized component spacing studies. Use tape corners, pin holes, paper curl, subtle dust, varied paper thickness, and soft realistic shadows. Palette: white, pale grey, charcoal, transport blue, steel, frosted acrylic, small amber accent. No readable text, no logos, no brand names, no national flags, no decorative motifs.",
  },
  scandinavian: {
    alt: "Scandinavian moodboard with birch wood, linen, wool, ceramic, Nordic interior photo crops, product cards, soft blue and sage chips, and taped paper modules.",
    caption: "Nordic practicality: pair useful product-commerce references with light wood, textiles, ceramics, and soft functional color so the interface feels livable.",
    directionKeywords: ["real lifestyle board", "bright Nordic utility", "light wood warmth", "home product commerce", "soft functional color"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/scandinavian-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Scandinavian style in web design. The board should look like a real designer's research board photographed from above on a pale birch wood studio table, with soft northern daylight and light linen at one edge. Include printed home-product website references, cropped Nordic interior photographs, simple ecommerce product card studies without text, light wood samples, wool and linen fabric swatches, ceramic object, pale blue and sage color chips, rounded paper modules, soft utility control studies, and natural lifestyle image fragments. Use tape corners, paper curl, pin marks, varied paper thickness, textile fibers, soft shadows, and subtle dust. Palette: warm white, birch wood, oatmeal, pale blue, sage green, soft grey, charcoal accent. No readable text, no logos, no brand names, no luxury glamour, no childish stickers, no sterile UI-only composition.",
  },
  japandi: {
    alt: "Japandi moodboard with low horizontal web references, shoji-like paper panels, ceramic bowls, ash wood, woven textiles, stone chips, and black ink accents.",
    caption: "Quiet utility: combine low geometry, tactile natural materials, paper-like transparency, and muted contrast so the interface feels calm and grounded.",
    directionKeywords: ["real tactile board", "low horizontal rhythm", "translucent paper panels", "ash wood and ceramic", "muted quiet utility"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/japandi-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Japandi in web design. The board should look like a real designer's research board photographed from above on a low warm-grey plaster studio table. Include printed low-horizontal website layout references, shoji-inspired translucent paper panels, muted interior photography crops, ash wood samples, hand-thrown ceramic object, woven textile swatches, stone grey color chips, soft beige paper strips, small black ink accent cards, quiet product detail studies without text, and tactile material fragments. Use tape corners, pin marks, paper curl, uneven crop edges, varied paper thickness, subtle dust, and natural shadows. Palette: warm grey, rice paper, ash wood, clay beige, charcoal, muted moss, stone. No readable text, no logos, no brand names, no overt Japanese motifs, no bright Scandinavian blue, no decorative clutter, no sterile UI-only composition.",
  },
  "warm-minimal": {
    alt: "Warm Minimal moodboard with cream landing page references, beige packaging blanks, terracotta chips, brass samples, clay objects, warm product crops, and taped papers.",
    caption: "Warm restraint: use cream space, soft product hierarchy, tactile neutral materials, and small terracotta or brass accents to feel premium but approachable.",
    directionKeywords: ["real brand board", "warm neutral field", "soft product hierarchy", "terracotta brass accents", "approachable premium"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/warm-minimal-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Warm Minimal in web design. The board should look like a real designer's research board photographed from above on a cream plaster studio table. Include printed premium brand landing page references, soft product hierarchy layout crops, warm neutral content modules without text, cream paper samples, beige packaging blanks, terracotta color chips, brushed brass detail samples, clay object, soft editorial product photography fragments, warm plaster texture swatches, and rounded paper forms. Use tape corners, pin marks, subtle paper curl, uneven crop edges, varied paper thickness, soft dust, and tactile material overlap. Palette: cream, oat, sand, warm grey, terracotta, muted brass, soft charcoal. No readable text, no logos, no brand names, no old-money styling, no rustic craft clutter, no pink pastel cuteness, no sterile UI-only composition.",
  },
  "soft-minimal": {
    alt: "Soft Minimal moodboard with low-contrast web references, rounded paper cards, pill controls, frosted vellum, acetate, soft textiles, and pale grey-blue chips.",
    caption: "Low-tension minimalism: reduce contrast, round the rhythm, and combine frosted surfaces with soft material samples so the interface feels calm and reassuring.",
    directionKeywords: ["real soft UI board", "low contrast panels", "rounded gentle rhythm", "frosted vellum layers", "reassuring surfaces"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/soft-minimal-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Soft Minimal in web design. The board should look like a real designer's research board photographed from above on a pale mist-grey studio surface. Include printed low-contrast website references, rounded content card studies without text, pill-shaped control studies, frosted vellum paper layers, translucent acetate samples, pale blue-grey product blanks, soft lavender-grey color chips, gentle shadow tests on paper, matte fabric swatches, rounded paper cutouts, and calm editorial photography fragments. Use tape corners, pin marks, slight paper curl, subtle dust, varied paper thickness, and soft physical overlap. Palette: mist grey, soft white, cloud blue, pale lavender grey, muted taupe, graphite, translucent white. No readable text, no logos, no brand names, no candy palette, no childish sticker motifs, no strong black outlines, no warm terracotta branding.",
  },
  "high-end-minimal": {
    alt: "High-End Minimal moodboard with luxury product page references, black and ivory packaging, marble, black stone, brushed metal, glass, satin, and exact crop marks.",
    caption: "Luxury by subtraction: rely on gallery spacing, premium surfaces, disciplined black-ivory contrast, and precise product crop rhythm instead of decoration.",
    directionKeywords: ["real luxury board", "gallery spacing", "premium material restraint", "black ivory contrast", "quiet commerce"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/high-end-minimal-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for High-End Minimal in web design. The board should look like a real designer's research board photographed from above on an off-white gallery table. Include printed luxury product detail page references without text, large whitespace layout crops, black and ivory packaging blanks, black stone and pale marble samples, brushed champagne metal edge pieces, clear glass object, satin textile crop, exact crop marks on paper, monochrome color chips, fine paper samples, and restrained product photography fragments. Use precise tape placement, pin marks, slight paper curl, subtle dust, varied paper thickness, soft shadows, and disciplined spacing. Palette: ivory, black, cool white, stone grey, champagne metal, deep charcoal, pale marble. No readable text, no logos, no brand names, no ornate luxury decoration, no gold overload, no lifestyle scene, no fashion model, no sterile UI-only composition.",
  },
  brutalism: {
    alt: "Brutalism moodboard with raw website index proofs, default controls, table rows, concrete, photocopied paper, link-blue strips, and red warning tabs.",
    caption: "Raw web evidence: expose default controls, document rows, concrete texture, photocopied proofs, and stark link signals before any decoration.",
    directionKeywords: ["real raw web board", "default controls", "photocopied proof texture", "link blue warning red", "concrete monochrome"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/brutalism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Brutalism in web design. The board should look like a real designer's research board photographed from above on a raw concrete studio table. Include printed raw website index references, stark black-and-white layout proofs, default form control studies, table row fragments, underlined link-blue strips, red warning tabs, photocopied paper blocks, exposed grid notes without readable text, rough masking tape, matte black card stock, grey board samples, metal ruler edge, and rough folded paper. Use hard physical shadows, tape corners, pin marks, scuffed paper edges, slight paper curl, varied paper thickness, subtle dust, and imperfect crop alignment. Palette: concrete grey, white, black, photocopy grey, link blue, warning red, dull metal. No readable text, no brand names, no logos, no watermarks, no fake UI gibberish, no cute decoration, no glossy app mockups, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "new-brutalism": {
    alt: "New Brutalism moodboard with chunky product UI proofs, thick black outlines, flat color panels, hard offset shadows, sliders, toggles, and paper mockups.",
    caption: "Chunky product directness: make the UI feel physical with thick outlines, flat color cards, hard shadows, and obvious control shapes.",
    directionKeywords: ["real product UI board", "thick black outlines", "flat color panels", "hard offset shadows", "oversized controls"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/new-brutalism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for New Brutalism in web design. The board should look like a real designer's research board photographed from above on a white laminate studio table. Include printed chunky product UI references, thick black outline card studies, flat color paper panels, hard offset shadow tests made from layered paper, oversized toggle and slider studies, abstract pricing-card layout blocks with no currency symbols, large form field studies with empty rectangles only, bright sticky color chips, matte plastic samples, black tape, fluorescent acrylic pieces, and rough paper mockups. Use tape corners, pin marks, slight paper curl, varied paper thickness, hard crisp shadows, small alignment imperfections, and visible cut edges. Palette: white, black, butter yellow, acid green, hot pink, electric blue, flat red, matte plastic. Absolutely no readable text, no letters, no numbers, no currency symbols, no icons, no brand names, no logos, no watermarks, no fake UI gibberish, no glossy glassmorphism, no soft gradients, no delicate luxury styling, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "anti-design": {
    alt: "Anti-Design moodboard with off-grid portfolio proofs, awkward crops, torn paper, acetate overlays, neon marker gestures, rough tape, and clashing chips.",
    caption: "Intentional disorder: break alignment with torn scraps, awkward crops, acetate, and neon gestures while keeping the board curated enough to guide a page.",
    directionKeywords: ["real experimental board", "off-grid portfolio shell", "awkward crop logic", "neon marker gestures", "torn acetate layers"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/anti-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Anti-Design in web design. The board should look like a real designer's experimental research board photographed from above on a white studio table. Include printed off-grid portfolio page references without readable text, awkwardly cropped hero panels, intentionally misaligned card layouts, torn paper scraps, acetate overlays, neon marker gesture swatches, rough tape, photocopied image fragments, clashing color chips, irregular black paper shapes, skewed layout proofs, and small registration marks drawn as abstract symbols only. The board should feel intentionally wrong but still curated and useful for a design team. Use tape corners, pin marks, folded paper, ripped edges, uneven crop edges, varied paper thickness, subtle dust, and real shadows. Palette: white, black, acidic lime, neon pink, cobalt, dirty grey, off-red. Absolutely no readable text, no letters, no numbers, no brand names, no logos, no watermarks, no fake UI gibberish, no pretty balanced grid, no decorative poster filler, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  maximalism: {
    alt: "Maximalism moodboard with gilt frame corners, tiger and botanical wallpaper samples layered pattern-on-pattern, emerald and plum velvet swatches, gold fringe trim, jewel color chips, ornate badge silhouettes, and dense layout proofs.",
    caption: "Controlled abundance: layer pattern on pattern over deep jewel grounds, let gilt ornament set the rhythm, and keep one clear focal hierarchy.",
    directionKeywords: ["pattern-on-pattern layering", "deep jewel grounds", "gilt ornament rhythm", "interiors-and-fashion mix", "deliberate focal hierarchy"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/maximalism-realistic-v3.webp",
    prompt:
      "Create a realistic editorial moodboard for Maximalism in web design. The board should look like a real designer's research board photographed from above on a charcoal studio table. It is pattern-house research for a maximalist web project spanning interiors and fashion: include printed dense website layout references without readable text, a salon-wall arrangement study made of small ornate gilt frame corners, botanical and tiger-stripe wallpaper samples layered pattern-on-pattern, saturated velvet and silk swatches in emerald and plum, gold fringe and braided trim pieces, jewel-tone color chips, ornate abstract badge silhouettes with no letters, layered product-card studies, a folded floral chintz fragment, and abundant overlapping paper cutouts arranged with one clear focal cluster. The visual language should communicate controlled abundance: pattern on pattern, deep jewel grounds, gilded ornament, and dense layering that still reads with deliberate rhythm and hierarchy. It should feel useful for designing a maximalist interiors-and-fashion web experience, not like kitsch novelty clutter, not like a postmodern classical quotation board, and not like a pastel rococo palace. Use real-world imperfections: tape corners, pin marks, slight paper curl, varied paper thickness, fabric texture, soft shadows, subtle dust. Palette: deep plum, bottle emerald, burgundy, peony pink, antique gold, cobalt, ivory, black. Absolutely no readable text, no letters, no numbers, no brand names, no logos, no watermarks, no fake UI gibberish, no human faces, no floating cards, no minimal blank space. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "glitch-art": {
    alt: "Glitch Art moodboard with diagnostic interface proofs, corrupted image cells, RGB acetate layers, scanline strips, macroblocks, and anti-static material.",
    caption: "System damage, not neon scenery: build the interface from compression artifacts, channel drift, diagnostic panels, and physical signal-loss samples.",
    directionKeywords: ["real media damage board", "RGB channel drift", "compression macroblocks", "scanline acetate", "dark diagnostic panels"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/glitch-art-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Glitch Art in web design. The board should look like a real designer's media-damage research board photographed from above on a dark graphite studio table. Include printed diagnostic interface references without readable text, corrupted image-cell studies, RGB channel-offset transparent film layers, compression macroblock samples, scanline acetate strips, waveform-like abstract blocks with no labels, dark UI panel fragments, distorted photo crops, signal-loss color chips, translucent red green blue overlays, matte black paper, and small electronic material fragments such as cable sheathing or anti-static plastic. Use tape corners, pin marks, paper curl, acetate reflections, dust, varied paper thickness, physical overlap, and real shadows. Palette: black, graphite, cyan, magenta, acid green, deep blue, signal red, static grey. Absolutely no readable text, no letters, no numbers, no brand names, no logos, no watermarks, no cyberpunk city, no neon skyline, no fake data labels, no floating holograms, no decorative poster filler. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  deconstructivism: {
    alt: "Deconstructivism moodboard with fractured web proofs, angular architecture crops, tracing-paper construction lines, concrete samples, blue blocks, and red markers.",
    caption: "Controlled instability: fracture the grid with architectural crops, skewed modules, tracing overlays, and red-blue construction tension.",
    directionKeywords: ["real architectural board", "fractured layout proofs", "displaced structural grid", "tracing-paper overlays", "red-blue construction tension"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/deconstructivism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Deconstructivism in web design. The board should look like a real designer's architectural research board photographed from above on a pale concrete studio table. Include printed fractured website layout references without readable text, displaced structural grid studies, angular paper fragments, exposed construction-line overlays on tracing paper, concrete texture samples, blueprint-colored blocks with no labels, red collision marker strips, cut architectural photo crops, skewed navigation module studies, torn vellum, graphite pencil marks, steel ruler edge, and pinned geometry scraps. The board should feel engineered and unstable, not random. Use tape corners, pin marks, paper curl, torn edges, varied paper thickness, translucent overlay shadows, dust, and real material texture. Palette: pale concrete, white, black, blueprint blue, red marker, graphite, steel grey. Absolutely no readable text, no letters, no numbers, no brand names, no logos, no watermarks, no fake UI gibberish, no chaotic craft collage, no decorative poster filler, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "avant-garde": {
    alt: "Avant-Garde moodboard with experimental web proofs, constructivist red and black planes, photomontage fragments, diagonal studies, and program modules.",
    caption: "Cultural provocation: use disciplined asymmetry, constructivist planes, abstract manifesto blocks, and program modules to push the page forward.",
    directionKeywords: ["real cultural program board", "constructivist planes", "disciplined asymmetry", "abstract manifesto blocks", "photomontage fragments"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/avant-garde-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Avant-Garde in web design. The board should look like a real designer's cultural-program research board photographed from above on an ivory archive table. Include printed experimental website layout references without readable text, constructivist red black ivory blue and yellow paper planes, abstract manifesto-scale type blocks represented only as unreadable black rectangles, photomontage fragments, museum and event page layout crops with no labels, diagonal composition studies, program-card modules with empty bars, bold geometric cut paper, transparent grid overlays, red tape strips, and archival paper samples. The board should feel provocative, cultural, and disciplined rather than decorative. Use tape corners, pin marks, paper curl, rough crop edges, varied paper thickness, dust, overlap, and real shadows. Palette: ivory, black, constructivist red, cobalt, warm yellow, photo grey. Absolutely no readable text, no letters, no numbers, no brand names, no logos, no watermarks, no fake UI gibberish, no propaganda symbols, no national flags, no decorative poster filler, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  postmodernism: {
    alt: "Postmodernism moodboard with mixed-era web proofs, classical column fragments, terrazzo, laminate, Memphis color chips, product cards, and archival scraps.",
    caption: "Historical remix: combine classical quotation, Memphis accents, object culture, and modern web modules without losing the page structure.",
    directionKeywords: ["real cultural commerce board", "mixed-era object index", "classical quotation", "terrazzo laminate samples", "Memphis accent shapes"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/postmodernism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Postmodernism in web design. The board should look like a real designer's cultural-commerce research board photographed from above on a warm neutral studio table. Include printed mixed-era website layout references without readable text, classical column and arch photo fragments, terrazzo and laminate samples, Memphis-inspired color chips and abstract shapes, mismatched product-card studies, playful navigation module crops, archival photo scraps, sculptural object fragments, patterned paper, irregular color cards, and layout studies that combine historical quotation with contemporary web components. The board should feel witty and mixed, not chaotic. Use tape corners, pin marks, slight paper curl, varied paper thickness, imperfect crop edges, material texture, subtle dust, and real shadows. Palette: ivory, black, dusty pink, teal, mustard, terracotta, lavender, terrazzo grey. Absolutely no readable text, no letters, no numbers, no brand names, no logos, no watermarks, no fake UI gibberish, no palace luxury styling, no flat Memphis poster only, no plain minimal composition, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  retro: {
    alt: "Retro moodboard with nostalgic ecommerce proofs, faded color-block cards, halftone paper, analog product crops, cassette-shaped blanks, and warm chips.",
    caption: "Nostalgic commerce: use faded product modules, analog ephemera, halftone grain, and warm color blocks so the style feels familiar but still usable online.",
    directionKeywords: ["real nostalgic campaign board", "faded commerce modules", "halftone paper texture", "analog product crops", "warm retro color blocking"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/retro-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Retro in web design. The board should look like a real designer's nostalgic web campaign research board photographed from above on a warm off-white studio table. Include printed retro ecommerce and landing page layout references without readable text, faded color-block product card studies, vintage advertising crop fragments with no people or brand marks, old magazine paper samples, halftone print texture swatches, rounded badge silhouettes with no letters, warm color chips, striped paper tabs, analog interior and product photo crops, cassette-label shaped blank paper with no text, and small physical objects like plain aged tape, blank translucent plastic strips, and paper ephemera. The visual language should feel nostalgic, colorful, and commercially useful, not like a generic vintage poster. Use tape corners, pin marks, slight paper curl, uneven crop edges, faded ink grain, varied paper thickness, subtle dust, and real shadows. Palette: cream, faded red, mustard, teal, chocolate brown, soft orange, dusty blue, warm black. Absolutely no readable text, no letters, no numbers, no currency, no labels, no license plates, no ruler markings, no people, no faces, no brand names, no logos, no watermarks, no fake UI gibberish, no floating cards, no sterile UI kit, no overly clean AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  vintage: {
    alt: "Vintage moodboard with aged editorial proofs, foxed paper, sepia archive crops, letterpress texture, cloth fragments, tarnished brass, and wood samples.",
    caption: "Patina-led interface mood: build from aged print matter, archive crops, foxed edges, cloth, brass, and dark wood instead of simple retro color blocking.",
    directionKeywords: ["real archive board", "aged print patina", "foxed paper edges", "sepia editorial crops", "tarnished material samples"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/vintage-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Vintage in web design. The board should look like a real designer's aged print and archive research board photographed from above on a worn wooden studio table. Include printed vintage editorial and shop layout references without readable text, aged book paper samples, foxed paper edges, sepia photo crops with no people or labels, letterpress texture swatches with abstract blocks only, faded packaging blanks, cloth-bound cover fragments, tarnished brass and dark wood material samples, muted color chips, torn deckled paper, old receipt-shaped blank slips with no writing, and taped archival fragments. The visual language should communicate time, patina, print tactility, and quiet nostalgia for web pages, not generic retro color blocking. Use tape corners, pin marks, paper curl, stains, scuffed ink, uneven crop edges, varied paper thickness, dust, and soft realistic shadows. Palette: aged ivory, sepia, tobacco brown, faded burgundy, olive drab, charcoal ink, tarnished brass, warm grey. Absolutely no readable text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no fresh glossy poster look, no bright 80s neon, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "seventies-retro": {
    alt: "70s Retro moodboard with warm landing page proofs, rounded product cards, wavy stripes, corduroy, woven textiles, walnut, amber plastic, and sunburst shapes.",
    caption: "Groovy warmth: combine rounded commerce modules, wavy paper rhythm, corduroy texture, walnut, and amber plastic for an approachable 70s web tone.",
    directionKeywords: ["real groovy campaign board", "rounded commerce rhythm", "wavy stripe papers", "corduroy walnut amber", "warm 70s palette"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/seventies-retro-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for 70s Retro in web design. The board should look like a real designer's warm groovy web campaign research board photographed from above on a tan cork studio table. Include printed 1970s-inspired landing page and ecommerce layout references without readable text, rounded product-card studies, wavy stripe paper samples, sunburst and circle cut-paper shapes, warm textile swatches, corduroy and woven fabric samples, amber translucent plastic, walnut veneer sample, retro interior photo crops with no people or labels, curved badge silhouettes with no letters, and saturated warm color chips. The visual language should communicate soft curves, warmth, analog lifestyle, and groovy commercial rhythm for web pages, not generic vintage distress or 80s neon. Use tape corners, pin marks, slight paper curl, uneven crop edges, textile fibers, faded print grain, varied paper thickness, subtle dust, and real shadows. Palette: burnt orange, mustard, avocado, cream, walnut brown, rust red, muted teal, amber. Absolutely no readable text, no letters, no numbers, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no disco typography, no neon grid, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "eighties-retro": {
    alt: "80s Retro moodboard with synth-era web proofs, neon grid studies, magenta and cyan acetate, chrome chips, black plastic, VHS blanks, and pixel swatches.",
    caption: "Synth-era interface energy: use neon grid perspective, glossy black plastic, chrome chips, acetate, and dark product modules without turning into cyberpunk scenery.",
    directionKeywords: ["real synth interface board", "neon grid perspective", "magenta cyan acetate", "glossy black plastic", "chrome retro tech"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/eighties-retro-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for 80s Retro in web design. The board should look like a real designer's synth-era web interface research board photographed from above on a dark matte studio table. Include printed 1980s-inspired landing page and dashboard layout references without readable text, neon grid paper studies, chrome gradient color chips, magenta and cyan acetate overlays, black glossy plastic samples, VHS-case shaped blank cards with no labels, arcade button color chips without icons, pixel pattern swatches, sunset stripe paper, dark product-card studies, geometric triangle and circle cutouts, and retro tech photo crops with no logos or labels. The visual language should communicate neon contrast, synthetic optimism, grid perspective, and glossy analog electronics for web pages, not cyberpunk city scenery or modern glassmorphism. Use tape corners, pin marks, paper curl, acetate reflections, glossy plastic highlights, dust, varied paper thickness, and real shadows. Palette: black, deep purple, hot magenta, cyan, electric blue, violet, chrome silver, small neon orange. Absolutely no readable text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no skyline, no car poster, no floating holograms, no sterile UI kit. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "nineties-graphic": {
    alt: "90s Graphic moodboard with zine-like web proofs, checkerboards, halftone textures, grunge paper, bright chips, plastic folder scraps, and torn arrows.",
    caption: "Loud early-digital collage: layer halftone, checkerboard, photocopy grain, saturated chips, torn shapes, and rough product tiles without slipping into Y2K chrome.",
    directionKeywords: ["real 90s graphic board", "zine-like web proofs", "checkerboard halftone", "early desktop blanks", "loud saturated collage"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/nineties-graphic-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for 90s Graphic in web design. The board should look like a real designer's 1990s graphic web campaign research board photographed from above on a light grey studio table. Include printed 1990s-inspired website and zine-like layout references without readable text, bold pattern swatches, checkerboard fragments, halftone abstract texture crops with no people, abstract sticker silhouettes with no letters, grunge paper textures, early desktop-window-inspired blank rectangles with no title bars and no control icons, saturated color chips, photocopied collage pieces, transparent plastic folder scraps, torn paper arrows with no symbols, and rough product tile studies with empty bars only. The visual language should communicate loud graphic layering, early digital energy, print collage, and youth-culture pattern for web pages, not 80s neon or Y2K chrome. Use tape corners, pin marks, paper curl, torn edges, ink grain, scuffed plastic, varied paper thickness, subtle dust, and real shadows. Palette: black, white, acid green, violet, orange, cyan, red, photocopy grey. Absolutely no readable text, no letters, no numbers, no title bars, no window controls, no labels, no brand names, no logos, no watermarks, no people, no faces, no eyes, no fake UI gibberish, no 80s grid horizon, no shiny chrome bubbles, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  y2k: {
    alt: "Y2K moodboard with glossy interface proofs, rounded capsule cards, chrome swatches, jelly plastic, iridescent film, acrylic bubbles, and pastel acetate.",
    caption: "Early-2000s gloss: combine chrome, jelly plastic, capsule UI, pearly surfaces, and holographic chips so the page feels playful and future-optimistic.",
    directionKeywords: ["real Y2K interface board", "chrome jelly plastic", "capsule card studies", "pearlescent tech optimism", "holographic pastel layers"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/y2k-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Y2K in web design. The board should look like a real designer's early-2000s digital optimism research board photographed from above on a glossy pale silver studio table. Include printed Y2K-inspired web landing page and interface layout references without readable text, rounded capsule card studies, chrome gradient swatches, translucent jelly plastic pieces, iridescent film, bubble-like acrylic shapes, frosted blue and pink acetate overlays, glossy product crop fragments with no logos, pixel-sparkle pattern samples, pearl and holographic color chips, blank disc-shaped inserts with no markings, and soft futuristic button studies with empty bars only. The visual language should communicate playful tech optimism, glossy surfaces, translucent layers, chrome, and bubble UI for web pages, not 80s neon grid or modern glassmorphism SaaS. Use tape corners, pin marks, paper curl, reflective highlights, acetate reflections, varied paper thickness, subtle dust, and real shadows. Palette: pearl white, chrome silver, icy blue, bubblegum pink, aqua, lavender, holographic green, soft black. Absolutely no readable text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no cyberpunk skyline, no black neon grid, no floating holograms, no sterile app mockup. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "retro-futurism": {
    alt: "Retro Futurism moodboard with space-age web proofs, capsule interfaces, vintage spacecraft crops, chrome, aluminum, starfield paper, acrylic domes, and orbit shapes.",
    caption: "Past-imagined future: use space-age architecture, analog tech crops, capsule modules, chrome, orbit shapes, and optimistic color to make future nostalgia useful.",
    directionKeywords: ["real space-age board", "capsule interface studies", "past future optimism", "chrome aluminum acrylic", "orbit-line composition"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/retro-futurism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Retro Futurism in web design. The board should look like a real designer's space-age web campaign research board photographed from above on a pale blue-grey studio table. Include printed retro-futurist landing page and product layout references without readable text, space-age architecture crops, curved capsule interface studies, vintage spacecraft and control-panel photo fragments with no labels, starfield paper samples, chrome and brushed aluminum swatches, orange and teal color chips, orbit-line cut paper shapes with no symbols, domed acrylic samples, raygun-era product silhouettes as blank shapes, and optimistic future poster crops with no text. The visual language should communicate the future imagined from the past, space-age optimism, aerodynamic forms, and analog technology for web pages, not pure sci-fi movie poster or modern cyberpunk. Use tape corners, pin marks, slight paper curl, glossy highlights, metal reflections, uneven crop edges, varied paper thickness, subtle dust, and real shadows. Palette: pale blue-grey, cream, chrome, tomato orange, teal, navy, warm yellow, black. Absolutely no readable text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no cyberpunk city, no dark neon grid, no floating holograms, no sterile UI kit. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "mid-century-modern": {
    alt: "Mid-Century Modern moodboard with walnut product-page proofs, modular grids, geometric paper, woven and boucle swatches, brass, warm interiors, and muted chips.",
    caption: "Warm modern product rhythm: combine walnut, woven texture, organic geometry, brass, restrained pattern, and clean modular commerce layouts.",
    directionKeywords: ["real mid-century product board", "walnut warm interiors", "organic geometric modules", "woven boucle texture", "restrained commerce grid"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/mid-century-modern-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Mid-Century Modern in web design. The board should look like a real designer's mid-century product and interiors web research board photographed from above on a warm walnut studio table. Include printed mid-century-inspired landing page and product grid references without readable text, clean modular layout studies, geometric circle and rectangle paper shapes, walnut veneer samples, woven and boucle fabric swatches, muted color chips, brass detail samples, warm architectural and interior photo crops with no people or labels, simple furniture product-card studies with empty bars, textured paper, and restrained pattern fragments. The visual language should communicate elegant 1950s and 1960s modernity, organic geometry, warm materials, and practical product presentation for web pages, not generic 70s groovy retro or Bauhaus primary geometry. Use tape corners, pin marks, slight paper curl, paper grain, fabric fibers, soft natural shadows, varied paper thickness, subtle dust, and real surface texture. Palette: walnut brown, cream, olive, mustard, burnt orange, muted teal, charcoal, brass. Absolutely no readable text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no disco patterns, no neon, no floating cards, no sterile UI kit. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  bauhaus: {
    alt: "Bauhaus moodboard with functional web proofs, primary-color geometry, circle triangle square modules, strict grids, black rules, workshop crops, and paper swatches.",
    caption: "Functional geometry: let primary shapes, strict grids, black rules, workshop material, and disciplined composition exercises drive the web layout language.",
    directionKeywords: ["real design-school board", "primary geometry", "circle triangle square modules", "functional grid proofs", "disciplined experimentation"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/bauhaus-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Bauhaus in web design. The board should look like a real designer's functional geometry and design-school research board photographed from above on a clean off-white studio table. Include printed Bauhaus-inspired website layout references without readable text, primary-color geometric composition studies, circle triangle square cut-paper modules, strict grid layout proofs, black rule-line studies, functional product-card studies with empty bars only, matte paper swatches, red blue yellow color chips, grey board samples, transparent grid overlays, simple furniture and workshop photo crops with no people or labels, and pinned composition exercises. The visual language should communicate basic geometry, functional clarity, primary color, and disciplined experimentation for web pages, not Swiss corporate typography or playful Memphis postmodernism. Use tape corners, pin marks, slight paper curl, crop marks without numbers, varied paper thickness, subtle dust, measured spacing, and real shadows. Palette: off-white, black, primary red, cobalt blue, warm yellow, neutral grey, small natural wood accent. Absolutely no readable text, no letters, no numbers, no labels, no ruler, no measuring tape, no measurement markings, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no national flags, no decorative poster filler, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  futurism: {
    alt: "Futurism moodboard with speed-focused web proofs, aerodynamic product crops, motion-blur fragments, blue acetate, aluminum, carbon fiber, and capsule UI studies.",
    caption: "Forward-motion optimism: build from aerodynamic crops, speed-line studies, aluminum, carbon fiber, cool blue acetate, and precise capsule interface modules.",
    directionKeywords: ["real speed tech board", "aerodynamic web references", "motion-blur fragments", "aluminum carbon fiber", "cool blue precision"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/futurism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Futurism in web design. The board should look like a real designer's speed-and-technology research board photographed from above on a cool white aluminum studio table. Include printed futuristic landing page and dashboard layout references without readable text, aerodynamic product photo crops with no logos, motion-blur abstract image fragments, speed-line paper studies, translucent blue acetate overlays, brushed aluminum and carbon fiber swatches, white polymer samples, electric blue and silver color chips, curved capsule interface studies with empty bars only, and small physical objects like blank metallic discs and clear acrylic strips. The visual language should communicate speed, technical optimism, precision, and forward motion for web pages, not retro futurism or cyberpunk city darkness. Use tape corners, pin marks, slight paper curl, metal reflections, acetate highlights, varied paper thickness, subtle dust, and real shadows. Palette: cool white, aluminum silver, electric blue, icy cyan, graphite, black, small signal orange. Absolutely no readable text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no city skyline, no neon noir mood, no floating holograms, no sterile pure UI kit. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  cyberpunk: {
    alt: "Cyberpunk moodboard with dark urban web proofs, wet asphalt crops, neon magenta and acid green acetate, circuit samples, black rubber, and hardware fragments.",
    caption: "Underground digital tension: combine dark dense panels, wet city texture, neon acetate, circuit material, black hardware, and glitch crops without becoming a skyline poster.",
    directionKeywords: ["real dark urban tech board", "wet asphalt reflections", "neon magenta acid green", "dense abstract panels", "black hardware fragments"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/cyberpunk-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Cyberpunk in web design. The board should look like a real designer's dark urban tech research board photographed from above on a scratched black metal studio table. Include printed cyberpunk landing page and dashboard layout references made only of empty rectangles, solid bars, blocks, and image crops, with no micro text at all. Include cropped night-city texture photos with no signs or logos, wet asphalt and rain-on-glass photo fragments, neon magenta and acid green acetate strips, circuit-board material samples with no markings, black rubber and dark acrylic swatches, warning-color chips, glitch media damage crops with no labels, dense panel layout studies with abstract blocks only, cable sheathing, transparent tape, and small black hardware fragments. The visual language should communicate underground tech, neon tension, dense digital systems, and dark rebellion for web pages, not generic sci-fi spaceship or clean high-tech SaaS. Use tape corners, pin marks, paper curl, wet-look reflections, scuffed surfaces, dust, varied paper thickness, and real shadows. Palette: black, charcoal, neon magenta, acid green, cyan, toxic yellow, dirty violet, small warning red. Absolutely no readable text, no tiny text, no fake text, no letters, no numbers, no signs, no labels, no brand names, no logos, no watermarks, no people, no faces, no city skyline poster, no futuristic spaceship, no floating holograms, no clean corporate interface. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "neon-noir": {
    alt: "Neon Noir moodboard with nocturnal web proofs, rain-streaked glass, noir light fragments, magenta and cyan reflections, smoky vellum, mirror acrylic, and dark panels.",
    caption: "Cinematic shadow: use noir lighting, wet glass, neon reflection, smoky translucent layers, and dark editorial panels instead of dense cyberpunk hardware.",
    directionKeywords: ["real nocturnal light board", "rain-streaked glass", "noir neon reflections", "smoky translucent layers", "cinematic dark panels"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/neon-noir-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Neon Noir in web design. The board should look like a real designer's nocturnal light-and-shadow research board photographed from above on a black glass studio table. Include printed neon-noir landing page and editorial layout references without readable text, moody black content panels with empty bars only, rain-streaked window photo crops with no signs, noir alley light fragments with no people, magenta and cyan neon reflection strips, smoky translucent vellum, dark glossy paper, black leather-like swatches, mirror acrylic fragments, deep violet and red color chips, cinematic crop studies, and small physical objects like a blank black film slide frame and clear glass shard. The visual language should communicate noir atmosphere, low-key lighting, neon reflections, suspense, and cinematic contrast for web pages, not dense cyberpunk hardware or clean high-tech dashboards. Use tape corners, pin marks, slight paper curl, glass reflections, soft haze, dust, varied paper thickness, and real shadows. Palette: black, deep charcoal, neon magenta, cyan, violet, blood red, smoke grey, wet glass. Absolutely no readable text, no tiny text, no letters, no numbers, no labels, no signs, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no city skyline poster, no circuit-board clutter, no floating holograms. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  hud: {
    alt: "HUD moodboard with first-person overlay proofs, ice-blue line diagrams on acetate, reticle and bracket cutouts, scale-ruler strips, dark glass, and a night cockpit photo fragment.",
    caption: "Instrument overlay: anchor thin monoline clusters to the corners of a first-person scene — reticles, pitch ladders, data tapes, ice blue on near-black — instead of stacking dashboard cards.",
    directionKeywords: ["real instrument research board", "ice blue acetate diagrams", "reticle and bracket cutouts", "scale ruler strips", "night cockpit glow fragment"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/hud-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for HUD heads-up display design in web design. The board should look like a real designer's instrument-overlay research board photographed from above on a matte black instrument bench. Include printed first-person overlay layout references made only of thin ruled lines, empty corner brackets and unlabeled bars with no readable text, transparent acetate sheets silk-printed with ice-blue monoline diagrams such as reticles, arc gauges and horizon ladders without numbers, a cropped night cockpit or windshield photo fragment glowing cold blue with no readable instruments, dark smoked glass panel samples, a brushed aluminum bezel fragment, translucent blue and amber acetate color chips, fine grid film strips, paper cutouts of crosshair and bracket shapes, and a thin metal calibration ruler with plain ticks and no digits. The visual language should communicate first-person overlay graphics, thin monoline instrument geometry, cold luminous glow discipline, and corner-anchored composition for web pages, not cyberpunk neon city clutter, not techwear fabric, not a generic dark dashboard of cards. Use tape corners, pin marks, paper curl, acetate reflections, subtle dust, varied paper thickness, and real shadows. Palette: near-black, graphite, ice blue, electric cyan, pale glacier blue, amber, smoked glass grey. Absolutely no readable text, no tiny text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no city skyline poster, no floating holograms. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "high-tech": {
    alt: "High-Tech moodboard with precision dashboard proofs, abstract data panels, technical grids, sensor crops, dark glass, brushed titanium, circuits, and status chips.",
    caption: "Engineered control: use unlabeled data blocks, sensor details, dark glass, titanium, circuit texture, and cool status color to project advanced systems confidence.",
    directionKeywords: ["real precision systems board", "abstract data panels", "sensor equipment crops", "dark glass titanium", "status blue green"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/high-tech-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for High-Tech in web design. The board should look like a real designer's precision interface and advanced systems research board photographed from above on a matte graphite engineering table. Include printed high-tech dashboard and SaaS interface layout references made only of empty rectangles, abstract bars, unlabeled circles, unlabeled graphs, and image crops, with no micro text at all. Include technical grid overlays with no numbers, sensor-array photo crops with no labels, laboratory equipment detail crops with no logos, micro-pattern paper samples, dark glass, brushed titanium, circuit texture with no markings, cool blue and green status color chips, modular card studies with empty bars only, and transparent alignment sheets. The visual language should communicate precision, advanced instrumentation, data confidence, and engineered control for web pages, not cyberpunk grit or neon noir atmosphere. Use tape corners, pin marks, slight paper curl, acetate reflections, metal sheen, dust, varied paper thickness, and real shadows. Palette: graphite, black, titanium grey, cool white, electric blue, status green, cyan, small amber. Absolutely no readable text, no tiny text, no fake text, no letters, no numbers, no data labels, no axis labels, no tick labels, no brand names, no logos, no watermarks, no people, no faces, no city scenery, no glowing fantasy holograms, no messy collage. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "ai-aesthetic": {
    alt: "AI Aesthetic moodboard with generative web proofs, luminous gradients, abstract pattern printouts, mesh fields, vellum layers, frosted acrylic, and pearly chips.",
    caption: "Computational softness: combine generative pattern crops, luminous mesh gradients, translucent vellum, frosted acrylic, and rounded modules without robot cliches.",
    directionKeywords: ["real generative system board", "luminous gradient studies", "abstract neural patterns", "frosted acrylic vellum", "soft intelligent automation"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/ai-aesthetic-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for AI Aesthetic in web design. The board should look like a real designer's generative visual-system research board photographed from above on a soft white studio table. Include printed AI-inspired landing page and product layout references without readable text, luminous gradient studies, algorithmic pattern printouts with no code or symbols, generated abstract image crops, soft mesh color fields, neural-network-like line studies drawn as abstract dots and curves with no labels, translucent vellum layers, frosted acrylic, iridescent film, glassy color chips, pearly paper samples, and rounded interface module studies with empty bars only. The visual language should communicate computational softness, generative patterns, luminous gradients, and intelligent automation for web pages, not Y2K chrome or hologram spectacle. Use tape corners, pin marks, slight paper curl, soft reflections, translucent overlaps, varied paper thickness, subtle dust, and real shadows. Palette: white, pearl, lavender, icy blue, soft cyan, warm pink, pale violet, graphite accent. Absolutely no readable text, no tiny text, no code, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no robot character, no floating holograms, no cyberpunk darkness. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "hologram-style": {
    alt: "Pure holographic material moodboard with iridescent foil sheets, diffraction film, a glass prism casting a thin rainbow caustic, dichroic glass chips, layered clear acetate stacks, and spectral-gradient layout crops on a pearl-white table.",
    caption: "Pure hologram optics: build the language from real diffraction — iridescent foil, spectral prism light, dichroic cyan-violet shifts, and translucent layered depth — rather than chrome mirrors, pastel renders, or frosted glass cards.",
    directionKeywords: ["holographic foil and diffraction film", "prism spectral caustic", "dichroic cyan violet shift", "layered translucent depth", "pearl studio materials"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/hologram-style-realistic-v3.webp",
    prompt:
      "Create a realistic editorial moodboard for Hologram Style in web design, photographed directly from above on a pearl-white studio table. The board is a curated designer research board about holographic light itself: several sheets of transparent diffraction-grating film and iridescent holographic foil catching real cyan-violet-magenta spectral reflections, a small glass prism casting one thin genuine rainbow caustic across the paper, dichroic glass chips shifting between cyan and violet, a neat stack of clear layered acetate films spaced to show depth between layers, one lenticular sheet fragment, printed website layout crops with soft spectral gradient edges and blank text bars only, pearl and cool-grey paper samples, and a strip of color chips in pearl white, icy cyan, violet, cool grey, and one small pale amber chip. Communicate translucent depth, spectral diffraction, and light-field layering as a web design language — clearly distinct from mirror-chrome metal surfaces, pastel diffusion-render softness, dark neon cyberpunk, and frosted glassmorphism cards. Use real-world imperfections: slight film curl, soft natural shadows, subtle grain, tape corners, pin marks, uneven crop edges, and varied material thickness; every object rests physically on the table with real refraction and thin spectral glints. Palette: pearl white, icy cyan, violet, soft magenta glint, cool grey, one small pale amber accent. No readable text, no letters, no numbers, no labels, no brand names, no logos, no watermark, no fake UI gibberish, no people, no floating objects, no full rainbow spectacle covering the frame, no glitter chaos, no chrome dominance. Landscape 16:10, high-resolution realistic top-down editorial photography.",
  },
  chromecore: {
    alt: "Chromecore moodboard with reflective product-page proofs, chrome detail crops, polished metal swatches, liquid-metal fragments, black card, steel strips, and chrome discs.",
    caption: "Polished metal tension: make reflection, mirror surfaces, liquid-metal crops, black contrast, and cold blue accents carry the futuristic product language.",
    directionKeywords: ["real reflective metal board", "mirror-polished chrome", "liquid metal product crops", "black cold contrast", "futuristic luxury surface"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/chromecore-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Chromecore in web design. The board should look like a real designer's reflective metal and futuristic product research board photographed from above on a dark neutral studio table. Include printed chromecore landing page and luxury product layout references without readable text, chrome product-detail crop fragments with no logos, mirror-polished metal swatches, liquid metal abstract photo crops, reflective silver paper, black glossy card stock, rounded chrome button studies with empty bars only, cold blue and black color chips, brushed steel strips, clear acrylic spacers, distorted reflection studies, and small physical objects like blank chrome discs and smooth metal capsules. The visual language should communicate metallic gloss, reflection, futuristic luxury, and polished surface tension for web pages, not Y2K jelly plastic or hologram rainbow film. Use tape corners, pin marks, slight paper curl, mirror reflections, metal highlights, soft dust, varied paper thickness, and real shadows. Palette: chrome silver, black, cold white, graphite, icy blue, gunmetal, small cobalt accent. Absolutely no readable text, no tiny text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no colorful hologram dominance, no cyberpunk city, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  classic: {
    alt: "Classic moodboard with balanced editorial web proofs, classical architecture crops, ivory papers, marble samples, dark wood, muted chips, brass strips, and black ribbon.",
    caption: "Timeless proportion: combine balanced grids, archival architecture, serif-like black blocks, fine papers, marble, dark wood, and restrained brass for stable brand clarity.",
    directionKeywords: ["real timeless editorial board", "balanced classical proportion", "ivory paper grain", "marble dark wood", "restrained brass detail"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/classic-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Classic in web design. The board should look like a real designer's timeless editorial and brand research board photographed from above on a warm ivory studio table. Include printed classic website layout references without readable text, balanced editorial grid studies, traditional serif typography represented only as black unreadable blocks, cream and ivory paper samples, symmetrical product-page modules with empty bars only, cropped classical architecture details with no people or labels, marble paper samples, dark wood swatches, muted color chips, thin gold rule strips, archival photography fragments, and small physical objects like a blank brass paperweight and black ribbon. The visual language should communicate proportion, trust, permanence, balanced hierarchy, and timeless brand clarity for web pages, not ornate baroque drama or minimal modern luxury. Use tape corners, pin marks, slight paper curl, fine paper grain, soft shadows, varied paper thickness, subtle dust, and real material texture. Palette: ivory, cream, black, charcoal, muted navy, warm grey, dark wood, restrained brass. Absolutely no readable text, no tiny text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no excessive ornament, no fashion model, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  neoclassic: {
    alt: "Neoclassic moodboard with modern classical web proofs, column and arch crops, plaster relief, pale marble, fluted strips, vellum, cream packaging, and soft gold rules.",
    caption: "Classical restraint with modern air: pair columns, plaster, fluting, marble, vellum, and generous white space so ornament stays refined and current.",
    directionKeywords: ["real modern classical board", "pale stone restraint", "fluted plaster details", "modern whitespace", "soft gold rules"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/neoclassic-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Neoclassic in web design. The board should look like a real designer's modern classical brand research board photographed from above on a pale stone studio table. Include printed neoclassical website and luxury landing page layout references without readable text, spacious modern grid studies, cropped classical columns and arch details with no people or labels, plaster relief fragments, pale marble samples, fluted paper strips, modern cream packaging blanks, thin black serif-like title blocks with no letters, soft gold rule samples, vellum overlays, muted color chips, and product detail crops arranged with generous whitespace. The visual language should communicate classical restraint, modern spacing, elegant symmetry, and refined ornament for web pages, not ornate baroque richness or plain high-end minimalism. Use tape corners, pin marks, slight paper curl, marble texture, plaster dust, vellum shadows, varied paper thickness, and real shadows. Palette: stone white, ivory, pale marble, soft gold, charcoal, muted taupe, powder grey, black accent. Absolutely no readable text, no tiny text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fake UI gibberish, no excessive gilding, no palace scene, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  luxury: {
    alt: "Luxury moodboard with premium product web proofs, black and ivory packaging, satin, marble, polished stone, champagne metal, jewelry crops, and glossy black card.",
    caption: "Material-led exclusivity: let black lacquer, ivory paper, satin, marble, champagne metal, jewelry-like crops, and disciplined spacing carry the premium product story.",
    directionKeywords: ["real premium product board", "black ivory packaging", "champagne metal stone", "satin glossy surfaces", "disciplined product commerce"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/luxury-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Luxury in web design. The board should look like a real designer's premium product and brand research board photographed from above on a black lacquer studio table. Include printed luxury ecommerce and product-detail layout references without readable text, gallery-like product crop studies, black and ivory packaging blanks, glossy black card stock, fine cream paper, champagne metal and brushed gold swatches, polished stone and marble samples, satin or silk fabric crop, perfume-bottle and jewelry-detail photo fragments with no logos, restrained monochrome color chips, thin metallic rule strips, and product-card modules with empty bars only. The visual language should communicate premium material, disciplined spacing, sensual surface quality, and controlled exclusivity for web pages, not old-money heritage or ornate classic decoration. Use tape corners, pin marks, slight paper curl, mirror reflections, satin highlights, varied paper thickness, subtle dust, and real shadows. Palette: black, ivory, champagne gold, deep charcoal, pearl, marble grey, warm metal, soft beige. Absolutely no readable text, no tiny text, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fashion model, no fake UI gibberish, no excessive ornament, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "old-money": {
    alt: "Old Money moodboard with quiet heritage web proofs, private library and estate crops, tweed, wool, green leather, walnut, brass patina, tortoiseshell, and stationery blanks.",
    caption: "Quiet inherited quality: build from heritage architecture, library interiors, tweed, leather, walnut, brass patina, stationery, and restrained commerce modules.",
    directionKeywords: ["real quiet heritage board", "private library atmosphere", "tweed wool leather", "walnut brass patina", "restrained old-money palette"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/old-money-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Old Money in web design. The board should look like a real designer's quiet heritage and private-club brand research board photographed from above on a dark walnut studio table. Include printed old-money website and editorial commerce layout references without readable text, restrained product and archive page studies, heritage architecture and library interior photo crops with no people or labels, tweed and wool fabric swatches, dark green leather-like sample, cream stationery blanks, engraved-border paper samples with no letters, tortoiseshell and horn-like material chips, brass and walnut samples, muted color chips, black ribbon, and classic product-card modules with empty bars only. The visual language should communicate inherited quality, restraint, tradition, and quiet confidence for web pages, not flashy luxury or ornate palace decoration. Use tape corners, pin marks, slight paper curl, fabric fibers, wood grain, brass patina, varied paper thickness, subtle dust, and warm realistic shadows. Palette: dark walnut, cream, oxblood, forest green, navy, camel, brass, charcoal. Absolutely no readable text, no tiny text, no monograms, no crests, no letters, no numbers, no labels, no brand names, no logos, no watermarks, no people, no faces, no fashion model, no fake UI gibberish, no gold overload, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "art-deco": {
    alt: "Art Deco moodboard with symmetrical web proofs, stepped geometric borders, fan patterns, black lacquer, ivory card, champagne foil, brass, marble, and emerald chips.",
    caption: "Geometric glamour: use stepped symmetry, fan motifs, black lacquer, marble, champagne metal, and vertical rhythm for polished hospitality or event commerce.",
    directionKeywords: ["real luxury geometry board", "stepped symmetry", "fan sunburst patterns", "black lacquer brass", "hospitality web glamour"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/art-deco-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Art Deco in web design. The board should look like a real designer's luxury geometry and hospitality web research board photographed from above on a deep black lacquer studio table. Include printed Art Deco-inspired website layout references without readable text, symmetrical hero layout studies, stepped geometric border studies, fan and sunburst pattern paper samples, black and ivory card stock, champagne-gold foil strips, polished brass swatches, dark marble fragments, glossy product photography crops with no logos, cream color chips, and small physical objects like a blank brass ruler and faceted black glass tile. The visual language should communicate geometric glamour, vertical rhythm, polished hospitality, and premium event-commerce hierarchy for web pages, not old-money heritage, baroque ornament, or generic luxury minimalism. Use real-world imperfections: slight paper curl, tape corners, pin marks, soft reflections, subtle dust, uneven crop edges, varied paper thickness, lacquer shine, and real shadows. Palette: black, ivory, champagne gold, deep emerald, warm cream, dark marble grey, polished brass. No readable text, no tiny text, no letters, no numbers, no logos, no brand names, no watermarks, no fake interface text, no floating cards, no decorative clutter, no sterile AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "art-nouveau": {
    alt: "Art Nouveau moodboard with flowing web proofs, botanical linework samples, curved borders, stained-glass chips, pressed flowers, pearlescent card, bronze, and amber glass.",
    caption: "Organic ornament: guide pages with flowing asymmetry, botanical curves, stained-glass color, pearlescent paper, and warm bronze rather than stepped Deco geometry.",
    directionKeywords: ["real organic ornament board", "flowing asymmetry", "botanical linework", "stained glass chips", "warm bronze details"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/art-nouveau-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Art Nouveau in web design. The board should look like a real designer's organic ornamental brand and editorial web research board photographed from above on a warm ivory studio table. Include printed Art Nouveau-inspired website layout references without readable text, flowing asymmetric hero layout studies, botanical linework paper samples with no letters, curved border studies, stained-glass color chips, cream and sage papers, pressed flower fragments, pearlescent card stock, bronze and aged brass swatches, cropped architectural ironwork photos with no people or labels, and small physical objects like a blank curved brass bookmark and translucent amber glass tile. The visual language should communicate flowing botanical geometry, elegant asymmetry, hand-crafted ornament, and soft cultural-event storytelling for web pages, not Art Deco stepped geometry, baroque excess, or rustic craft branding. Use real-world imperfections: slight paper curl, tape corners, pin marks, uneven crop edges, paper fibers, pressed-petal texture, soft natural shadows, varied paper thickness, subtle dust, and real table texture. Palette: ivory, sage green, muted teal, amber glass, dusty rose, warm bronze, soft black. No readable text, no tiny text, no letters, no numbers, no logos, no brand names, no watermarks, no fake interface text, no floating cards, no decorative clutter, no sterile AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  baroque: {
    alt: "Baroque moodboard with dramatic web proofs, heavy frame studies, scrollwork papers, burgundy velvet, gilded edges, marble, brocade, and chiaroscuro crops.",
    caption: "Theatrical richness: combine deep shadow, gilded frame logic, velvet, marble, brocade, and dramatic hero crops for ornate cultural storytelling.",
    directionKeywords: ["real dramatic ornament board", "gilded frame logic", "burgundy velvet", "chiaroscuro hierarchy", "rich cultural venue"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/baroque-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Baroque in web design. The board should look like a real designer's dramatic ornamental web and cultural-venue research board photographed from above on a dark burgundy velvet-covered studio table. Include printed baroque-inspired website layout references without readable text, dramatic editorial hero crop studies, heavy frame and scrollwork paper samples, deep red and black color chips, gilded edge samples, embossed cream paper, marble fragments, velvet and brocade fabric swatches, chiaroscuro photography crops with no people or labels, ornate but blank button and card shape studies, and small physical objects like a blank aged-gold frame corner and dark wax-like seal with no symbols. The visual language should communicate theatrical depth, rich ornament, dramatic hierarchy, and cultural luxury storytelling for web pages, not Art Deco geometry, Rococo pastel lightness, or restrained classic branding. Use real-world imperfections: slight paper curl, tape corners, pin marks, soft velvet lint, gilded edge wear, uneven crop edges, varied paper thickness, subtle dust, and strong but realistic directional shadows. Palette: deep burgundy, black, antique gold, ivory, dark walnut, marble grey, oxblood, shadow brown. No readable text, no tiny text, no letters, no numbers, no logos, no brand names, no watermarks, no fake interface text, no floating cards, no decorative clutter, no sterile AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  rococo: {
    alt: "Rococo moodboard with airy boutique web proofs, curved frame samples, shell cutouts, pastel chips, pearl card, silk ribbon, porcelain, pale gold, and floral crops.",
    caption: "Light ornament: use pastel curves, shell-like frames, pearl surfaces, ribbon, porcelain, and delicate product rhythm without becoming childish or heavy.",
    directionKeywords: ["real light ornament board", "pastel boutique rhythm", "curved shell frames", "pearl silk porcelain", "delicate commerce"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/rococo-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Rococo in web design. The board should look like a real designer's light ornamental boutique and beauty web research board photographed from above on a pale blush studio table. Include printed rococo-inspired website layout references without readable text, airy product landing page studies, curved frame paper samples, shell and scroll motif cutouts with no letters, pastel color chips, pearl card stock, cream deckled paper, silk ribbon, porcelain-like white material sample, soft gilded edge strips, delicate floral photography fragments with no labels, and small physical objects like a blank cameo-shaped card, pearl buttons, and a pale gold frame corner. The visual language should communicate playful refinement, pastel ornament, delicate curves, and light boutique commerce for web pages, not heavy Baroque drama, Art Nouveau botanical linework, or childish kawaii styling. Use real-world imperfections: slight paper curl, tape corners, pin marks, ribbon fibers, pearl sheen, uneven crop edges, subtle dust, varied paper thickness, and soft natural shadows. Palette: blush pink, cream, pearl white, powder blue, pale mint, soft gold, warm ivory, muted mauve. No readable text, no tiny text, no letters, no numbers, no logos, no brand names, no watermarks, no fake interface text, no floating cards, no decorative clutter, no sterile AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  gothic: {
    alt: "Gothic moodboard with dark vertical web proofs, pointed-arch cutouts, cathedral stone crops, black and bone papers, crimson chips, smoked glass, oxidized metal, and parchment.",
    caption: "Vertical shadow: shape pages with pointed arches, stone texture, bone-on-black contrast, crimson accents, smoked glass, and solemn editorial hierarchy.",
    directionKeywords: ["real dark architecture board", "pointed arch layouts", "cathedral stone ironwork", "bone black crimson", "vertical editorial drama"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/gothic-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Gothic in web design. The board should look like a real designer's dark architectural editorial and music-culture web research board photographed from above on a charcoal stone studio table. Include printed gothic-inspired website layout references without readable text, tall vertical hero studies, pointed-arch layout cutouts, blackletter-like typography represented only as unreadable black blocks, cathedral stone and ironwork photo crops with no people or labels, black and bone paper samples, dark red color chips, smoked glass, oxidized metal swatches, rough parchment fragments, lace-like black textile, and small physical objects like a blank black wax seal, iron ring, and narrow stone tile. The visual language should communicate vertical drama, shadow, medieval architecture, solemn contrast, and dark editorial hierarchy for web pages, not cyberpunk neon, grunge dirt, or ornate Baroque theater. Use real-world imperfections: slight paper curl, tape corners, pin marks, rough paper fibers, stone dust, uneven crop edges, varied paper thickness, subtle dust, and moody realistic shadows. Palette: black, charcoal, bone white, dark crimson, oxidized silver, stone grey, parchment beige. No readable text, no tiny text, no letters, no numbers, no logos, no brand names, no watermarks, no fake interface text, no floating cards, no decorative clutter, no sterile AI mockup look. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "organic-design": {
    alt: "Organic Design moodboard with flowing blank web proofs, recycled papers, cork, linen, raw cotton, pebble, clay, botanical crops, earth chips, and natural form cutouts.",
    caption: "Living-form warmth: use curved asymmetry, tactile natural samples, cork, clay, linen, and relaxed content rhythm to avoid generic beige minimalism.",
    directionKeywords: ["real organic form board", "flowing asymmetry", "tactile natural materials", "wellness commerce warmth", "earth green palette"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/organic-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Organic Design in web design. Photograph a real designer's organic form and wellness web research board from above on a warm clay studio table. Include printed website layout references made only of blank blocks, empty rounded bars, abstract image areas, and flowing shapes with absolutely no text marks. Include flowing asymmetrical content rhythm studies, rounded natural form cutouts, recycled paper samples, cork, linen, raw cotton, pebble and clay material swatches, botanical photography crops with no labels, muted green and earth color chips, soft product-card studies with empty bars only, and small physical objects like a smooth stone and unmarked seed pod. The visual language should communicate living forms, tactile natural materials, relaxed hierarchy, and wellness-commerce warmth for web pages, not rustic farmhouse, botanical illustration, or generic beige minimalism. Use tape corners, pin marks, slight paper curl, uneven crop edges, textile fibers, subtle dust, varied paper thickness, and soft natural shadows. Palette: warm clay, oat, moss green, sage, raw cotton, cork brown, stone grey, charcoal accent. Absolutely no readable text, no micro text, no fake text, no text-like marks, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no fake UI gibberish, no floating cards, no decorative clutter. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  natural: {
    alt: "Natural moodboard with blank lifestyle web proofs, landscape crops, uncoated cream paper, raw linen, pale wood, leaf shadows, river stone, sand texture, and green-blue chips.",
    caption: "Open-air calm: use landscape fragments, pale wood, linen, stone, sand, and breathable grids so the page feels natural without becoming botanical or rustic.",
    directionKeywords: ["real nature lifestyle board", "open air hierarchy", "leaf shadow studies", "pale wood linen", "soft green blue"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/natural-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Natural style in web design. Photograph a real designer's nature-led lifestyle and brand web research board from above on a light stone studio table. Include printed website layout references made only of blank image blocks and empty bars, landscape photography fragments with no labels, uncoated cream paper, raw linen, pale wood veneer, leaf shadow studies, river-stone and sand-texture samples, muted green and sky color chips, breathable editorial grid studies, simple product modules with no text, and small physical objects like a smooth twig, unmarked seed packet blank, and stone. The visual language should communicate open air, quiet natural light, simple ecology, and relaxed lifestyle hierarchy for web pages, not dense botanical pattern, eco campaign signage, or rustic farmhouse texture. Use tape corners, pin marks, slight paper curl, soft outdoor-like shadows, uneven crop edges, paper grain, varied paper thickness, subtle dust, and tactile surface texture. Palette: cream, pale stone, leaf green, soft sky blue, sand beige, warm wood, moss, charcoal accent. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  botanical: {
    alt: "Botanical moodboard with blank plant-commerce web proofs, leaf and stem crops, pressed plants, tracing paper, herbarium grid studies, glassine blanks, terracotta, and green chips.",
    caption: "Plant specificity: build from leaf structure, pressed samples, glassine layers, herbarium-like blank grids, and chlorophyll greens instead of broad nature imagery.",
    directionKeywords: ["real plant research board", "pressed botanical samples", "herbarium grid rhythm", "glassine layers", "chlorophyll green"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/botanical-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Botanical style in web design. Photograph a real designer's plant-focused editorial commerce research board from above on a soft white greenhouse worktable. Include printed botanical website layout references made only of blank cards and empty bars, close-up leaf and stem photography fragments with no labels, pressed plant samples, translucent tracing paper overlays, herbarium-like grid studies without any text, deep green and chlorophyll color chips, uncoated cream paper, glassine envelope blanks, linen swatches, pale terracotta, and small physical objects like unmarked plant tags turned blank-side up and a small clay pot shard. The visual language should communicate plant specificity, layered leaves, fresh growth, and curated botanical shopping or editorial structure for web pages, not broad natural landscape, eco campaign signage, or rustic craft texture. Use tape corners, pin marks, slight paper curl, leaf shadows, paper fibers, varied paper thickness, subtle dust, real plant texture, and soft natural greenhouse light. Palette: cream, chlorophyll green, deep leaf green, sage, pale terracotta, glassine white, soil brown, soft black. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "eco-design": {
    alt: "Eco Design moodboard with blank sustainable web proofs, recycled paper, corrugated cardboard, molded pulp, hemp, cork, bioplastic, circular diagram studies, and green earth chips.",
    caption: "Practical sustainability: use recycled fibers, molded pulp, cork, bioplastic, and unlabeled circular-system studies so the interface feels responsible and concrete.",
    directionKeywords: ["real sustainability board", "recycled material system", "molded pulp cork", "circular diagram shapes", "trustworthy eco hierarchy"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/eco-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Eco Design in web design. Photograph a real designer's sustainable product and climate-conscious web research board from above on a recycled kraft-paper studio surface. Include printed eco website layout references made only of blank blocks and empty bars, sustainability dashboard-like modules with no text or numbers, recycled paper samples, corrugated cardboard, molded pulp, hemp fabric, cork, bioplastic translucent swatches, repair-label shapes turned blank, green and earth color chips, circular-system diagram studies made of unlabeled arrows and shapes, nature and product-material photo crops with no labels, and small physical objects like blank compostable packaging tabs. The visual language should communicate responsible systems, circular material thinking, practical sustainability, and trustworthy product hierarchy for web pages, not generic nature lifestyle, rustic nostalgia, or activist poster typography. Use tape corners, pin marks, slight paper curl, rough fiber texture, cardboard edges, subtle dust, varied paper thickness, and soft realistic shadows. Palette: kraft brown, recycled cream, forest green, algae green, muted blue, cardboard tan, charcoal, off white. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no certifications, no watermarks, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  rustic: {
    alt: "Rustic moodboard with blank local-brand web proofs, weathered wood, burlap, linen, kraft, torn cream paper, clay, leather, twine, ceramic shard, and faded earth chips.",
    caption: "Honest local warmth: combine weathered wood, torn fiber, burlap, clay, leather, and rough product grids for approachable hospitality or food commerce.",
    directionKeywords: ["real rustic material board", "weathered wood grain", "burlap linen kraft", "rough local commerce", "warm earth palette"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/rustic-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Rustic style in web design. Photograph a real designer's rustic local-brand and hospitality web research board from above on a weathered wood studio table. Include printed rustic website layout references made only of blank image blocks and empty bars, rough product grid studies, reclaimed wood samples, burlap and linen swatches, kraft paper, torn cream paper, clay and leather fragments, warm brown and faded green color chips, countryside interior and handmade product photo crops with no labels, rough border studies, and small physical objects like a blank wooden tag, twine, and an unmarked ceramic shard. The visual language should communicate honest material warmth, rough edges, local craft, and approachable hospitality or food-commerce hierarchy for web pages, not polished organic wellness, modern eco systems, or vintage poster nostalgia. Use tape corners, pin marks, slight paper curl, torn edges, wood grain, fabric fibers, scuffs, varied paper thickness, subtle dust, and warm realistic shadows. Palette: weathered wood, kraft brown, cream, clay, faded olive, charcoal, leather tan, warm grey. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  kinfolk: {
    alt: "Kinfolk moodboard with blank slow-lifestyle web proofs, magazine grids, soft interior crops, matte cream paper, oatmeal chips, linen, pale wood, ceramic, and blank stationery.",
    caption: "Slow editorial living: use natural light, matte neutrals, linen, pale wood, ceramics, and generous magazine rhythm for quiet lifestyle commerce.",
    directionKeywords: ["real slow lifestyle board", "soft natural light", "quiet magazine grids", "linen ceramic wood", "oatmeal neutrals"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/kinfolk-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Kinfolk style in web design. Photograph a real designer's slow-lifestyle editorial web research board from above on an off-white linen-covered studio table. Include printed Kinfolk-inspired website layout references made only of blank image blocks and empty bars, quiet magazine-style grid studies, soft natural-light interior and table-scene photo crops with no people or labels, matte cream paper, oatmeal and beige color chips, linen and cotton fabric swatches, pale wood, ceramic fragments, negative-space product layout studies, blank stationery cards, and small physical objects like an unmarked ceramic cup, folded linen napkin, and smooth pebble. The visual language should communicate slow living, editorial calm, soft natural light, and curated lifestyle commerce for web pages, not rustic roughness, minimal luxury, or generic Scandinavian product design. Use tape corners, pin marks, slight paper curl, fabric fibers, soft shadows, uneven crop edges, varied paper thickness, subtle dust, and quiet material texture. Palette: oatmeal, warm white, cream, beige, pale wood, soft grey, muted olive, charcoal accent. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  handmade: {
    alt: "Handmade moodboard with blank maker-shop web proofs, torn papers, deckled stationery, cotton thread, linen, canvas, clay, stitched samples, buttons, spool, and muted chips.",
    caption: "Human touch: let torn fibers, small irregularities, thread, stitch texture, clay, and imperfect product grids make the shop feel personal and small-batch.",
    directionKeywords: ["real handmade shop board", "irregular product grids", "torn deckled paper", "thread stitch texture", "small batch warmth"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/handmade-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Handmade style in web design. Photograph a real designer's handmade shop and maker-portfolio web research board from above on a warm neutral craft table. Include printed handmade ecommerce layout references made only of blank blocks and empty bars, product-grid studies with irregular crop edges, hand-torn paper, deckled stationery, cotton thread, linen and canvas swatches, clay and ceramic fragments, hand-stitched sample, pencil sketch marks as abstract non-letter lines, muted color chips, craft process photo crops with no people, no hands, and no labels, plus small physical objects like a blank wooden button, spool with no label, and unmarked clay bead. The visual language should communicate human touch, small-batch production, imperfect alignment, tactile materials, and approachable maker commerce for web pages, not polished craft-brand luxury, rustic hospitality, or childish DIY decoration. Use tape corners, pin marks, slight paper curl, torn fibers, stitch texture, pencil smudges, uneven crop edges, varied paper thickness, subtle dust, and real shadows. Palette: warm cream, raw canvas, clay, muted coral, olive, soft brown, charcoal, off white. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  craft: {
    alt: "Craft moodboard with blank artisan web proofs, process grids, handmade paper, leather, wood, clay, brass, woven textile, canvas, tool crops, rivets, thread, and wood offcut.",
    caption: "Material process: use durable workshop surfaces, leather, wood, clay, brass, woven samples, and unlabeled process grids for practical artisan storytelling.",
    directionKeywords: ["real artisan process board", "workbench material studies", "leather wood clay brass", "durable product story", "tool detail crops"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/craft-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Craft style in web design. Photograph a real designer's material-process and artisan web research board from above on a workbench surface. Include printed craft brand website layout references made only of blank image areas and empty bars, process-step grid studies with no text or numbers, heavy handmade paper, leather, wood, clay, brass, woven textile and canvas swatches, tool-detail photography crops with no brand marks, material test strips, earthy color chips, modular product-card studies with empty bars only, and small physical objects like an unmarked awl handle, blank brass rivets, thread, and a small wood offcut. The visual language should communicate material knowledge, maker process, durable craft, and practical product storytelling for web pages, not soft handmade charm, rustic hospitality, or eco-system diagrams. Use tape corners, pin marks, slight paper curl, scuffed edges, sawdust, fiber texture, leather grain, varied paper thickness, subtle dust, and real workshop shadows. Palette: walnut, raw canvas, leather tan, clay, brass, charcoal, cream, muted green. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "wabi-sabi": {
    alt: "Wabi-Sabi moodboard with blank quiet web proofs, low horizontal studies, irregular paper, cracked ceramic, weathered wood, stone, linen, ash paper, and muted earth chips.",
    caption: "Time-worn restraint: use cracks, torn fibers, patina, ash neutrals, asymmetry, and soft shadow to guide a quiet page without becoming polished Japandi.",
    directionKeywords: ["real imperfect quiet board", "low horizontal rhythm", "cracked ceramic patina", "torn ash paper", "muted asymmetry"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/wabi-sabi-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Wabi-Sabi in web design. Photograph a real designer's imperfect quietness and contemplative web research board from above on a muted grey plaster studio table. Include printed wabi-sabi website layout references made only of blank image fields and empty bars, low horizontal composition studies, irregular handmade paper, torn deckled edges, cracked ceramic fragments, weathered wood, stone, linen, ash paper, muted earth color chips, soft shadow photography fragments with no people or labels, quiet product-detail modules with empty bars only, and small physical objects like an unmarked repaired ceramic shard, smooth stone, and folded raw cloth. The visual language should communicate imperfection, patina, silence, asymmetry, and time-worn restraint for web pages, not Japandi polish, rustic warmth, or minimal luxury precision. Use tape corners, pin marks, slight paper curl, torn fibers, cracks, stains, uneven crop edges, varied paper thickness, subtle dust, and soft natural shadows. Palette: ash grey, rice paper, clay beige, weathered wood, charcoal, stone, faded olive, warm off white. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  kitsch: {
    alt: "Kitsch moodboard with blank novelty-commerce web proofs, mismatched cards, loud patterns, plastic flowers, candy acrylic, shiny vinyl, souvenir shapes, charms, and clashing chips.",
    caption: "Joyful bad taste: use mismatched novelty objects, glossy plastic, loud patterns, and clashing chips so the page feels knowingly excessive rather than cute.",
    directionKeywords: ["real novelty board", "intentional bad taste", "clashing candy palette", "glossy plastic souvenirs", "mismatched commerce cards"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/kitsch-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Kitsch in web design. Photograph a real designer's kitsch campaign and novelty-commerce research board from above on a glossy white studio table. Include printed kitsch website layout references made only of blank image blocks and empty bars, mismatched product-card studies, loud pattern paper, fake souvenir shapes with no text, plastic floral fragments, candy-colored acrylic chips, shiny vinyl swatches, clashing color chips, retro novelty photo crops with no labels or people, wavy badge silhouettes with no letters, and small physical objects like blank novelty magnets, plastic charms, and a tiny unmarked ceramic figurine. The visual language should communicate joyful bad taste, intentional excess, novelty, and playful commerce hierarchy for web pages, not clean kawaii softness, pop-art comic graphics, or maximalist luxury density. Use tape corners, pin marks, slight paper curl, glossy reflections, uneven crop edges, plastic scuffs, varied paper thickness, subtle dust, and real shadows. Palette: candy red, banana yellow, turquoise, bubblegum pink, white, lime, glossy black, lavender. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  kawaii: {
    alt: "Kawaii moodboard with blank rounded app proofs, pastel chips, soft foam, silicone, puffy blank shapes, plush fabric, translucent plastic, rounded charms, and tiny product crops.",
    caption: "Small-scale cuteness: rely on pastel softness, plush fibers, puffy blank shapes, and rounded controls without drifting into kitsch clutter or toy blocks.",
    directionKeywords: ["real cute app board", "soft rounded controls", "pastel plush silicone", "small scale cuteness", "gentle friendly hierarchy"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/kawaii-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Kawaii in web design. Photograph a real designer's cute mobile app and soft commerce research board from above on a clean pastel pink studio table. Include printed kawaii website and app layout references made only of blank rounded cards and empty pill bars, small rounded UI control studies, pastel color chips, soft foam and silicone swatches, puffy sticker-like blank shapes with no icons or faces, rounded paper cutouts, soft plush fabric samples, translucent candy-colored plastic, tiny product photography crops with no labels, and small physical objects like blank star beads, smooth capsules, and rounded charms with no characters. The visual language should communicate small-scale cuteness, soft rounded forms, gentle friendliness, and approachable app hierarchy for web pages, not chaotic kitsch, dopamine color shock, or toy-store 3D plastic. Use tape corners, pin marks, slight paper curl, soft shadows, rounded cut edges, plush fibers, varied paper thickness, subtle dust, and real surface texture. Palette: pastel pink, cream, baby blue, butter yellow, mint, lavender, soft coral, warm grey. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no faces, no characters, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "dopamine-design": {
    alt: "Dopamine Design moodboard with blank color-block web proofs, oversized CTA shapes, glossy acrylic, neon strips, saturated chips, candy plastic, and high-contrast crops.",
    caption: "Instant color joy: use saturated blocks, glossy acrylic, neon paper, and oversized blank action shapes to make hierarchy energetic without becoming pastel or kitsch.",
    directionKeywords: ["real saturated color board", "oversized action shapes", "glossy acrylic neon", "instant joy hierarchy", "high contrast palette"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/dopamine-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Dopamine Design in web design. Photograph a real designer's high-energy color and conversion web research board from above on a bright white studio table. Include printed dopamine-style landing page references made only of blank blocks and empty bars, bold color-block layout studies, oversized CTA shape studies with no text, glossy acrylic swatches, neon paper strips, saturated gradient chips, candy plastic samples, playful product photography fragments with no labels or people, high-contrast pattern crops, rounded badge silhouettes with no letters, and small physical objects like unmarked colorful clips and translucent blocks. The visual language should communicate instant joy, saturated color, energetic hierarchy, and positive action for web pages, not soft kawaii pastels, chaotic kitsch clutter, or flat pop-art comic language. Use tape corners, pin marks, slight paper curl, glossy reflections, crisp shadows, uneven crop edges, varied paper thickness, subtle dust, and real surface texture. Palette: hot pink, electric orange, lemon yellow, cobalt blue, lime green, violet, white, glossy black. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "pop-art": {
    alt: "Pop Art moodboard with blank campaign web proofs, halftone papers, bold comic crop studies, primary chips, thick black outlines, glossy ink, and speech-bubble blanks.",
    caption: "Mass-culture punch: combine halftone print texture, primary blocks, thick outlines, and product-poster crops for bold campaign clarity.",
    directionKeywords: ["real pop print board", "halftone product energy", "primary color blocks", "thick outline cards", "campaign commerce clarity"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/pop-art-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Pop Art in web design. Photograph a real designer's pop-art campaign and product web research board from above on a white studio table. Include printed pop-art website layout references made only of blank blocks and empty bars, halftone dot paper samples, bold comic-panel crop studies with no text, primary color chips, thick black outline card studies, glossy ink swatches, flat product photo fragments with no logos or labels, speech-bubble-shaped blanks with no letters, offset print registration color strips without symbols, and small physical objects like blank enamel color tiles and a black marker cap. The visual language should communicate mass culture, punchy graphic contrast, halftone print energy, and campaign-commerce clarity for web pages, not kitsch novelty clutter, comic-book storytelling panels, or dopamine gradient UI. Use tape corners, pin marks, slight paper curl, printed ink texture, uneven crop edges, varied paper thickness, subtle dust, and crisp studio shadows. Palette: white, black, primary red, cobalt blue, lemon yellow, hot pink, cyan, flat cream. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "comic-book-style": {
    alt: "Comic Book Style moodboard with blank panel web proofs, sequential grids, speech balloon blanks, thick outlines, halftone papers, burst shapes, and ink swatches.",
    caption: "Sequential energy: use panel grids, blank speech shapes, thick ink outlines, burst forms, and halftone papers to guide story-driven navigation.",
    directionKeywords: ["real comic layout board", "sequential panel rhythm", "blank speech balloons", "bold ink outline", "campaign storytelling"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/comic-book-style-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Comic Book Style in web design. Photograph a real designer's comic-book interface and story-commerce research board from above on a clean white drafting table. Include printed comic-inspired website layout references made only of blank panels and empty bars, sequential panel grid studies with no text, speech balloon and caption box blanks with no letters, thick black outline samples, halftone papers, action-burst paper shapes with no symbols, inked line texture swatches, red yellow blue color chips, cropped comic-style illustration fragments without characters, faces, or words, and small physical objects like black tape, blank bristol board, and colored ink swatches. The visual language should communicate panel rhythm, bold outline, sequential storytelling, and energetic campaign navigation for web pages, not pop-art product posters, kitsch novelty objects, or childish toy design. Use tape corners, pin marks, slight paper curl, ink texture, uneven crop edges, varied paper thickness, subtle dust, and crisp shadows. Palette: white, black, primary red, yellow, cobalt blue, cyan, cream paper, small magenta accent. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no faces, no characters, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "toy-design": {
    alt: "Toy Design moodboard with blank rounded ecommerce proofs, chunky product grids, soft 3D cutouts, matte plastic, rubber, foam, toy blocks, beads, and capsules.",
    caption: "Tactile play: make commerce feel chunky and safe with molded plastic, foam, rubber, wooden beads, blocks, and large rounded product modules.",
    directionKeywords: ["real toy product board", "chunky rounded commerce", "matte plastic foam", "safe playful objects", "primary pastel mix"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/toy-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Toy Design in web design. Photograph a real designer's tactile toy-product and playful ecommerce research board from above on a pale blue studio table. Include printed toy-inspired website layout references made only of blank rounded cards and empty bars, chunky product grid studies, soft 3D shape paper cutouts, matte plastic samples, rubber and foam swatches, primary and pastel color chips, toy-block photography fragments with no labels or characters, molded packaging blanks, simple interaction control studies with no icons, and small physical objects like unmarked building blocks, smooth wooden beads, rounded plastic capsules, and a blank toy tag. The visual language should communicate tactile play, chunky proportions, safe rounded forms, and product-commerce joy for web pages, not kawaii plush softness, kitsch novelty clutter, or claymorphism UI-only cards. Use tape corners, pin marks, slight paper curl, molded plastic highlights, foam texture, soft shadows, varied paper thickness, subtle dust, and real surface texture. Palette: sky blue, butter yellow, tomato red, mint, soft pink, cream, warm wood, graphite accent. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no faces, no characters, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "playful-design": {
    alt: "Playful Design moodboard with blank friendly web proofs, interaction state studies, motion-arc strips, rounded cards, sticker-like blanks, foam, rubber, and colorful tokens.",
    caption: "Friendly interaction: use motion arcs, blank controls, rounded forms, paper tabs, and light color to signal play through behavior rather than toy objects.",
    directionKeywords: ["real interaction board", "motion arc studies", "friendly blank controls", "clear user flow", "light playful palette"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/playful-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Playful Design in web design. Photograph a real designer's playful interaction and friendly web research board from above on a warm white studio table. Include printed playful website layout references made only of blank blocks and empty bars, interactive state studies with no icons or text, bouncing path and motion-arc paper strips, rounded cards, modular color chips, soft sticker-like blank shapes, paper tabs, lightweight illustration crops with no characters or letters, foam and rubber swatches, cheerful product detail fragments with no labels, and small physical objects like colorful blank push pins, curved paper sliders, and smooth tokens. The visual language should communicate approachable interaction, light motion, friendly surprise, and clear user flow for web pages, not kawaii cuteness, toy product styling, or dopamine color overload. Use tape corners, pin marks, slight paper curl, cut-paper edges, soft shadows, varied paper thickness, subtle dust, and real surface texture. Palette: warm white, coral, sky blue, leaf green, sunny yellow, lavender, soft black, light grey. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no faces, no characters, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "pastel-style": {
    alt: "Pastel Style moodboard with blank soft brand web proofs, low-contrast content studies, pastel paper, vellum, frosted acrylic, cotton, felt, pale gradients, and translucent tiles.",
    caption: "Gentle color harmony: keep the page low-pressure with matte pastel papers, vellum, frosted acrylic, cotton, and pale gradients rather than character cuteness.",
    directionKeywords: ["real pastel brand board", "low contrast hierarchy", "vellum frosted acrylic", "soft color harmony", "gentle product rhythm"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/pastel-style-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Pastel Style in web design. Photograph a real designer's soft pastel brand and app research board from above on a pale cream studio table. Include printed pastel website layout references made only of blank cards and empty bars, low-contrast content studies, soft color-chip rows, translucent vellum overlays, matte pastel papers, frosted acrylic, cotton and felt swatches, gentle product photography crops with no labels or people, rounded form studies, pale gradient samples, and small physical objects like unmarked pastel clips, blank tags, and soft translucent tiles. The visual language should communicate softness, approachable calm, gentle color harmony, and low-pressure product hierarchy for web pages, not kawaii cuteness, soft minimal restraint, or dopamine saturation. Use tape corners, pin marks, slight paper curl, vellum shadows, frosted reflections, soft material fibers, varied paper thickness, subtle dust, and calm natural shadows. Palette: powder pink, baby blue, mint, pale lavender, butter cream, peach, soft grey, warm white. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no faces, no characters, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  "bubble-design": {
    alt: "Bubble Design moodboard with blank inflated interface proofs, circular studies, blob cutouts, translucent gel, glossy plastic, silicone, reflection crops, domes, and gel beads.",
    caption: "Buoyant volume: use glossy gel, domes, pearl highlights, round modules, and inflated blank controls so the style reads as bubbly rather than merely pastel.",
    directionKeywords: ["real bubbly interface board", "inflated rounded cards", "translucent gel reflections", "aqua pearl palette", "buoyant soft depth"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/bubble-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Bubble Design in web design. Photograph a real designer's bubbly rounded interface and casual product web research board from above on a glossy pale aqua studio table. Include printed bubble-style website layout references made only of blank inflated cards and empty rounded bars, circular module studies, soft blob paper cutouts, translucent gel samples, glossy plastic and silicone swatches, soap-bubble reflection photo crops with no labels, round color chips, inflated button shape studies with no icons or text, soft shadow tests, and small physical objects like clear acrylic domes, smooth round tokens, and unmarked gel beads. The visual language should communicate buoyant volume, soft rounded depth, light reflections, and casual friendly UI structure for web pages, not pastel flat softness, toy-product blocks, or glassmorphism panels. Use tape corners, pin marks, slight paper curl, glossy highlights, gel reflections, soft shadows, varied paper thickness, subtle dust, and real surface texture. Palette: aqua, milky white, bubblegum pink, soft lavender, clear blue, mint, pearl, graphite accent. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no watermarks, no faces, no characters, no fake UI gibberish, no floating cards. Landscape 16:10 composition, high-resolution editorial photography, realistic top-down flat lay.",
  },
  streetwear: {
    alt: "Streetwear moodboard with blank fashion-drop web proofs, black garment swatches, nylon, denim, hang tags, reflective tape, sneaker crops, and safety-color chips.",
    caption: "Drop-commerce attitude: use apparel material, blank hang tags, black product grids, reflective tape, and sharp accent chips rather than spray-wall graphics.",
    directionKeywords: ["real fashion drop board", "black garment material", "limited ecommerce rhythm", "reflective tape accents", "urban product hierarchy"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/streetwear-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Streetwear in web design. Photograph a real designer's fashion drop and streetwear ecommerce research board from above on a black rubberized studio table. Include printed streetwear product-drop website layouts made only of blank image blocks and empty bars, drop-calendar card studies with no text or numbers, black garment fabric swatches, nylon, denim, blank hang tags, sticker-shaped blanks, bold color chips, sneaker-detail photo crops with no logos, packaging tissue, reflective tape, and small physical objects like unmarked zipper pulls and blank woven labels. The visual language should communicate limited drops, urban fashion commerce, bold product hierarchy, and tactile apparel material, not graffiti wall art, punk photocopy, or skate sticker clutter. Use tape corners, pin marks, paper curl, fabric fibers, rubber texture, varied paper thickness, subtle dust, and real shadows. Palette: black, concrete grey, white, safety orange, cobalt, acid green, denim blue, silver. Absolutely no readable text, no micro text, no letters, no numbers, no labels, no logos, no brand names, no faces, no people, no fake UI gibberish, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  graffiti: {
    alt: "Graffiti moodboard with blank street campaign proofs, spray textures, wall crops, layered sticker blanks, paint swatches, stencil shapes, spray caps, and concrete chips.",
    caption: "Wall energy: make spray texture, overspray, concrete, sticker layers, and stencil blanks carry the campaign mood without readable tags or apparel cues.",
    directionKeywords: ["real spray wall board", "overspray texture", "layered sticker blanks", "concrete campaign surface", "neon street palette"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/graffiti-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Graffiti in web design. Photograph a real designer's graffiti culture and street campaign research board from above on a paint-splattered concrete studio surface. Include printed graffiti-inspired website layout references made only of blank blocks and empty bars, spray-paint texture samples, wall fragment photo crops with no readable tags, layered sticker blanks, drippy paint swatches, rough paper masks, neon and black color chips, stencil shape studies with no letters, marker stroke samples as abstract marks only, and small physical objects like unmarked spray caps, masking tape, and paint chips. The visual language should communicate wall energy, spray texture, layered urban surface, and raw campaign hierarchy for web pages, not streetwear product drops, punk xerox protest, or grunge dirt. Use tape corners, pin marks, paper curl, overspray, scuffed concrete, varied paper thickness, subtle dust, and real shadows. Palette: concrete grey, black, white, spray red, acid green, cobalt, chrome silver, hot pink. Absolutely no readable text, no tags, no letters, no numbers, no labels, no logos, no brand names, no faces, no people, no fake UI gibberish, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "hiphop-style": {
    alt: "Hip-Hop Style moodboard with blank artist-commerce web proofs, album grid studies, stage-light crops, gold and chrome swatches, vinyl texture, speaker mesh, and metal rings.",
    caption: "Music confidence: use vinyl, speaker mesh, stage light, gold, chrome, and bold blank album grids for rhythm and artist-commerce presence.",
    directionKeywords: ["real music culture board", "album grid rhythm", "gold chrome material", "stage light crops", "bold artist commerce"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/hiphop-style-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Hip-Hop Style in web design. Photograph a real designer's music culture and artist-commerce research board from above on a dark studio table with brushed metal and black paper. Include printed hip-hop website layout references made only of blank blocks and empty bars, album-cover grid studies without text, stage-light photo crops with no performers or labels, gold and chrome material swatches, black vinyl texture, speaker mesh, chain-like metal sample, bold red and gold color chips, high-contrast poster crop studies with no letters, and small physical objects like a blank vinyl center label, unmarked cassette shell, and metal rings. The visual language should communicate rhythm, confidence, music commerce, and bold cultural presence for web pages, not graffiti walls, streetwear product drops, or rave neon events. Use tape corners, pin marks, paper curl, metallic highlights, vinyl dust, varied paper thickness, subtle scratches, and real shadows. Palette: black, gold, chrome, deep red, cream, charcoal, royal blue, warm white. Absolutely no readable text, no micro text, no letters, no numbers, no labels, no logos, no brand names, no people, no faces, no fake UI gibberish, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "skate-culture": {
    alt: "Skate Culture moodboard with blank skate-shop web proofs, sticker blanks, deck cutouts, grip tape, wheel chips, scuffed concrete crops, checker strips, and bearing parts.",
    caption: "Board-surface movement: use grip tape, plywood, sticker blanks, wheel color, checker strips, and scuffed concrete for youth-commerce rhythm.",
    directionKeywords: ["real skate shop board", "deck shape studies", "grip tape texture", "sticker sheet blanks", "scuffed youth commerce"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/skate-culture-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Skate Culture in web design. Photograph a real designer's skate shop and youth-culture web research board from above on a scratched plywood ramp-like studio surface. Include printed skate website layout references made only of blank blocks and empty bars, sticker-sheet blanks, deck-shape paper cutouts, grip tape samples, wheel urethane color chips, scuffed concrete and asphalt photo crops with no labels, board graphic crop studies with no words or logos, bold product grid studies, checker strips, and small physical objects like unmarked wheel, bearing, blank deck tag, and torn tape. The visual language should communicate movement, stickers, board material, youth energy, and drop-commerce rhythm for web pages, not streetwear apparel, graffiti walls, or punk zine protest. Use tape corners, pin marks, paper curl, scratched plywood, grip texture, scuffed edges, varied paper thickness, subtle dust, and real shadows. Palette: plywood tan, black, white, asphalt grey, deck red, cobalt, urethane yellow, mint. Absolutely no readable text, no micro text, no letters, no numbers, no logos, no brand names, no people, no faces, no fake UI gibberish, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  punk: {
    alt: "Punk moodboard with blank zine web proofs, torn xerox paper, cutout shapes, safety pins, black tape, ripped poster fragments, staples, and red-black chips.",
    caption: "Zine urgency: use torn photocopy grain, staples, black tape, safety pins, and red-black contrast for aggressive campaign hierarchy.",
    directionKeywords: ["real punk zine board", "torn xerox paper", "safety pins staples", "red black urgency", "anti establishment campaign"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/punk-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Punk in web design. Photograph a real designer's punk zine and anti-establishment campaign web research board from above on a dirty off-white photocopy table. Include printed punk website layout references made only of blank blocks and empty bars, torn black-and-white xerox paper, ransom-note-like cutout shapes with absolutely no letters, safety pin and black tape samples, ripped poster fragments with no readable marks, red and black color chips, stapled paper studies, rough collage composition studies, photocopy noise swatches, and small physical objects like blank pins, staples, torn tape, and a scuffed metal ring. The visual language should communicate rebellion, zine roughness, torn urgency, and aggressive campaign hierarchy for web pages, not graffiti spray walls, grunge music texture, or polished anti-design art. Use tape corners, pin marks, staples, paper curl, ripped fibers, photocopy grain, scuffs, varied paper thickness, subtle dust, and hard shadows. Palette: black, off white, blood red, dirty grey, safety yellow, metal silver. Absolutely no readable text, no micro text, no fake text, no letters, no numbers, no labels, no logos, no brand names, no people, no faces, no fake UI gibberish, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  grunge: {
    alt: "Grunge moodboard with blank distressed music web proofs, smudged charcoal paper, faded plaid, torn dark paper, scratched film, cassette case, rusted washer, and muted chips.",
    caption: "Analog decay: use stains, scratched film, faded plaid, dark torn paper, and worn music artifacts for loose editorial texture rather than punk contrast.",
    directionKeywords: ["real distressed music board", "analog decay texture", "scratched film cassette", "faded plaid stains", "moody loose hierarchy"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/grunge-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Grunge in web design. Photograph a real designer's distressed music and underground editorial web research board from above on a dark stained wood studio table. Include printed grunge website layout references made only of blank blocks and empty bars, distressed photo crop studies with no people or labels, smudged charcoal paper, faded plaid fabric, torn dark paper, scratched film strips with no frames of faces, muted brown and grey color chips, photocopy noise, weathered tape, dirty texture swatches, and small physical objects like a blank cassette case, rusted washer, and scuffed black card. The visual language should communicate worn texture, analog decay, moody music culture, and loose editorial hierarchy for web pages, not punk protest contrast, graffiti spray color, or lo-fi cozy calm. Use tape corners, pin marks, paper curl, stains, scratches, torn edges, varied paper thickness, subtle dust, and heavy realistic shadows. Palette: dirty black, charcoal, faded brown, olive grey, rust, cream, muted burgundy, dust grey. Absolutely no readable text, no micro text, no letters, no numbers, no labels, no logos, no brand names, no people, no faces, no fake UI gibberish, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "indie-sleaze": {
    alt: "Indie Sleaze moodboard with blank nightlife web proofs, harsh flash crops, glossy club textures, smudged black paper, silver foil, leopard fabric, wristband blanks, and hot pink chips.",
    caption: "Flash nightlife mess: combine harsh glare, glossy smudges, leopard or sequin texture, foil, wristband blanks, and cramped grids without grunge decay.",
    directionKeywords: ["real flash nightlife board", "glossy club texture", "smudged black foil", "hot pink dirty palette", "ironic culture grid"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/indie-sleaze-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Indie Sleaze in web design. Photograph a real designer's flash-photo nightlife and messy culture web research board from above on a scratched black laminate table. Include printed indie-sleaze website layout references made only of blank blocks and empty bars, harsh flash photography fragments with no people, faces, or labels, glossy club-floor texture crops, smudged black paper, silver foil, disposable-camera-like blank photo borders, leopard or sequin fabric swatches, neon pink and dirty black color chips, compact editorial grid studies, and small physical objects like an unmarked wristband blank, clear plastic card, black cable loop, and scuffed compact mirror. The visual language should communicate flash glare, nightlife mess, ironic glamour, and cramped editorial culture for web pages, not grunge decay, rave event neon, or luxury fashion polish. Use tape corners, pin marks, paper curl, fingerprint smudges, glossy reflections, uneven crop edges, varied paper thickness, dust, and hard flash-like shadows. Palette: black, dirty white, flash silver, hot pink, leopard tan, acid green, denim blue, wine red. Absolutely no readable text, no micro text, no letters, no numbers, no labels, no logos, no brand names, no people, no faces, no fake UI gibberish, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "rave-style": {
    alt: "Rave Style moodboard with blank electronic-event web proofs, fluorescent strips, UV acrylic, laser crops, mesh, reflective vinyl, wristband blanks, and acid color chips.",
    caption: "Dark-room energy: use fluorescent wayfinding, UV acrylic, laser crops, reflective vinyl, and rhythmic blank ticketing modules without cyberpunk scenery.",
    directionKeywords: ["real rave event board", "fluorescent ticketing rhythm", "laser dark-room light", "UV acrylic chips", "acid neon palette"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/rave-style-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Rave Style in web design. Photograph a real designer's electronic music event and nightlife web research board from above on a matte black studio table under colored edge light. Include printed rave event website layout references made only of blank blocks and empty bars, event lineup module studies with no text or numbers, fluorescent paper strips, UV-reactive acrylic chips, laser-light photo crops with no people or labels, mesh fabric, reflective vinyl, glow-stick-like translucent objects with no markings, acid color chips, waveform-like abstract shapes with no labels, and small physical objects like blank wristband strips and unmarked plastic tokens. The visual language should communicate high-energy electronic events, fluorescent wayfinding, dark-room light, and rhythmic ticketing hierarchy for web pages, not cyberpunk city, indie-sleaze flash mess, or graffiti street texture. Use tape corners, pin marks, paper curl, neon reflections, dark surface dust, varied paper thickness, and real shadows. Palette: black, acid green, laser violet, hot pink, cyan, electric blue, white, reflective silver. Absolutely no readable text, no micro text, no letters, no numbers, no labels, no logos, no brand names, no people, no faces, no fake UI gibberish, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "lo-fi": {
    alt: "Lo-Fi moodboard with blank analog web proofs, low-resolution crops, cassette texture, faded paper, grain fragments, scanline cards, cardboard, sticky notes, and dusty muted chips.",
    caption: "Cozy low fidelity: use faded paper, cassette shells, scanline texture, film grain, warm cardboard, and muted modules instead of grunge decay or rave darkness.",
    directionKeywords: ["real analog calm board", "low resolution crops", "cassette scanline texture", "warm muted palette", "relaxed content hierarchy"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/lo-fi-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Lo-Fi in web design. Photograph a real designer's analog calm and low-resolution web research board from above on a warm grey desk. Include printed lo-fi website layout references made only of blank blocks and empty bars, low-resolution image crop studies with no people or labels, cassette and tape texture samples with no writing, faded paper, muted color chips, soft grain photo fragments, CRT scanline texture cards with no symbols, notebook paper turned blank-side up, warm cardboard, matte plastic, relaxed playlist-like module studies without text, and small physical objects like an unmarked cassette shell, pencil stub, blank sticky notes, and a soft cloth swatch. The visual language should communicate analog warmth, low-fidelity texture, gentle nostalgia, and relaxed content hierarchy for web pages, not grunge decay, retro-commerce posters, or rave neon darkness. Use tape corners, pin marks, paper curl, dust, film grain, faded edges, varied paper thickness, soft shadows, and real desk texture. Palette: warm grey, faded beige, dusty blue, muted peach, olive, off white, graphite, tape brown. Absolutely no readable text, no micro text, no letters, no numbers, no labels, no logos, no brand names, no people, no faces, no fake UI gibberish, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "typography-focused": {
    alt: "Typography Focused moodboard with blank type-scale web proofs, black hierarchy blocks, baseline strips, column cards, crop marks, neutral chips, and studio paper tools.",
    caption: "Type hierarchy first: use scale blocks, baseline rhythm, column measures, and black-on-ivory contrast so structure comes from typography rather than imagery.",
    directionKeywords: ["real type hierarchy board", "scale contrast blocks", "baseline rhythm", "column measure studies", "black ivory typography"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/typography-focused-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Typography Focused web design. Photograph a real designer's type-scale and hierarchy research board from above on a clean white typography studio table. Include printed website layout references made only of large and small black unreadable rectangles, type-scale rhythm studies with no letters, baseline strips, font-weight block samples represented as abstract bars, column measure cards, black and ivory paper, crop marks without numbers, neutral color chips, layout spacing studies, and small physical objects like a metal ruler, blank pencil, and paper tabs. The visual language should communicate typographic hierarchy, scale contrast, rhythm, and reading structure for web pages, not Swiss institutional grids, magazine photography, or poster campaign drama. Use tape corners, pin marks, slight paper curl, paper grain, measured alignment, varied paper thickness, subtle dust, and real shadows. Palette: white, ivory, black, graphite, warm grey, muted red accent. Absolutely no readable text, no fake text, no letterforms, no numbers, no labels, no logos, no brand names, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "editorial-design": {
    alt: "Editorial Design moodboard with blank article web proofs, feature spread studies, pull-quote blocks, photo essay crops, column overlays, magazine paper, and muted chips.",
    caption: "Longform pacing: combine image-text rhythm, blank pull-quote blocks, column overlays, and quiet paper stock for credible article hierarchy.",
    directionKeywords: ["real article layout board", "longform image rhythm", "blank pull quote blocks", "publishing credibility", "warm paper table"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/editorial-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Editorial Design in web design. Photograph a real designer's article-layout and publishing web research board from above on a warm off-white paper table. Include printed editorial website references made only of blank image blocks and unreadable bars, feature article spread studies, pull-quote blocks represented as empty rectangles, caption strips with no letters, photo essay crop fragments with no people or labels, column grid overlays with no numbers, cream and black paper samples, muted accent chips, magazine paper swatches, binder clips, blank note tabs, and transparent acetate grid sheets with no markings. Do not include rulers or measuring tools. The visual language should communicate article pacing, image-text rhythm, longform hierarchy, and publishing credibility for web pages, not magazine cover spectacle, newspaper density, or pure typography specimens. Use tape corners, pin marks, paper curl, crop edges, varied paper thickness, paper grain, subtle dust, and real shadows. Palette: warm white, cream, black, graphite, muted blue, faded red, newsprint grey. Absolutely no readable text, no fake text, no letterforms, no numbers, no measurement marks, no labels, no logos, no brand names, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "magazine-style": {
    alt: "Magazine Style moodboard with blank cover web proofs, contents grids, glossy paper, feature crops, spine strips, issue color chips, binder clips, and page tabs.",
    caption: "Issue browsing: use cover impact, contents grids, glossy paper, spine strips, and modular image rhythm so the page feels like a digital magazine system.",
    directionKeywords: ["real magazine issue board", "cover impact blocks", "contents grid studies", "glossy matte papers", "editorial browsing rhythm"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/magazine-style-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Magazine Style in web design. Photograph a real designer's magazine cover and contents-page web research board from above on a bright editorial studio table. Include printed magazine-style website layouts made only of blank image blocks, solid rectangles, and empty bars. Include cover composition studies with large blank masthead blocks but no letters, contents-grid studies made only of rectangles, feature-photo crops with no people or labels, glossy and matte magazine paper swatches, color chips for issue systems, spine-like paper strips with no text, image-cropping guides with no numbers, binder clips, blank bookmarks, and transparent page tabs. The visual language should communicate issue structure, cover impact, editorial image rhythm, and content browsing for web pages, not newspaper columns, longform editorial calm, or posterism single-message drama. Use tape corners, pin marks, paper curl, glossy highlights, crop edges, varied paper thickness, subtle dust, and real shadows. Palette: white, black, glossy red, cobalt, cream, photo grey, yellow accent. Absolutely no readable text, no micro text, no fake text, no text-like marks, no letterforms, no numbers, no labels, no logos, no brand names, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  posterism: {
    alt: "Posterism moodboard with blank campaign landing proofs, huge headline blocks, oversized color fields, thick borders, folded poster paper, wheatpaste texture, and tape rolls.",
    caption: "One-shot impact: build from large blank fields, direct composition, poster folds, paste texture, and signal color rather than browsing systems.",
    directionKeywords: ["real poster campaign board", "single message scale", "oversized color fields", "folded poster paper", "direct landing hierarchy"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/posterism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Posterism in web design. Photograph a real designer's poster-like campaign landing page research board from above on a stark white studio table. Include printed posterism web layouts made only of huge blank headline blocks, large image fields, and empty bars, single-message hero studies with no text, oversized color fields, bold crop studies, thick border samples, folded poster paper, wheatpaste texture, red black and yellow chips, dramatic diagonal composition studies, and small physical objects like blank poster tabs, tape rolls, and paper weights. The visual language should communicate one-shot impact, campaign focus, scale, and direct visual hierarchy for web pages, not magazine browsing, punk zine texture, or typography specimen systems. Use tape corners, pin marks, paper curl, folded poster edges, paste texture, varied paper thickness, subtle dust, and crisp shadows. Palette: white, black, signal red, poster yellow, cobalt, cream, graphite. Absolutely no readable text, no fake text, no letterforms, no numbers, no labels, no logos, no brand names, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "grid-system": {
    alt: "Grid System moodboard with blank modular web proofs, column grid sheets, acetate overlays, square paper blocks, black rule samples, acrylic squares, and pale blue grid tint.",
    caption: "Modular order: use blank grid sheets, acetate overlays, repeated modules, rule samples, and alignment tabs for structure without typographic personality.",
    directionKeywords: ["real modular grid board", "blank column systems", "acetate grid overlays", "repeatable proportions", "information order"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/grid-system-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Grid System in web design. Photograph a real designer's layout system and modular web research board from above on a white drafting table. Include printed grid-system website references made only of blank modules and empty bars, column grid sheets with no numbers or tick marks, modular spacing studies, transparent acetate overlays with plain blue grid lines only, baseline strips without marks, square and rectangle paper blocks, black rule samples, neutral chips, alignment tabs, crop guides with no labels, frosted acrylic squares, and blank metal paper weights. Do not include rulers, measuring tools, numbers, or measurement marks. The visual language should communicate structure, repeatability, modular proportion, and information order for web pages, not Swiss red typographic identity, magazine image rhythm, or typography-scale drama. Use tape corners, pin marks, slight paper curl, precise alignment, paper grain, varied paper thickness, subtle dust, and real shadows. Palette: white, black, light grey, graphite, pale blue grid tint, small red accent. Absolutely no readable text, no fake text, no letterforms, no numbers, no measurement marks, no labels, no logos, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  collage: {
    alt: "Collage moodboard with blank mixed-paper web proofs, torn photo fragments, overlapping papers, cut shapes, tape, acetate scraps, fabric texture, and rough edge studies.",
    caption: "Layered mixed media: use torn edges, overlapping paper, tape, fabric and acetate scraps, and irregular grids for discovery without becoming photomontage.",
    directionKeywords: ["real paper collage board", "mixed media layers", "torn photo fragments", "irregular discovery grid", "visible tape edges"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/collage-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Collage in web design. Photograph a real designer's mixed-paper collage and editorial web research board from above on a neutral grey studio table. Include printed collage-style website layouts made only of blank image blocks and empty bars, torn photo fragments with no people or labels, overlapping colored papers, cut paper shapes, tape samples, transparent acetate scraps, fabric and newsprint-like texture without text, irregular grid studies, muted and bright color chips, rough edge studies, and small physical objects like scissors closed, blank paper tabs, and masking tape. The visual language should communicate layered paper composition, mixed media, context switching, and editorial discovery for web pages, not photomontage surreal image collision, punk zine anger, or maximalist decoration. Use tape corners, pin marks, paper curl, torn fibers, uneven crop edges, varied paper thickness, subtle dust, and real shadows. Palette: paper white, graphite, muted red, cobalt, kraft, pale yellow, dusty blue, black. Absolutely no readable text, no fake text, no letterforms, no numbers, no labels, no logos, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  photomontage: {
    alt: "Photomontage moodboard with blank campaign web proofs, cut photographic fragments, architecture and object crops, sharp masks, acetate overlays, photo papers, and color chips.",
    caption: "Photographic collision: use hard image cuts, mask shapes, contact-sheet crops, acetate overlays, and campaign fragments instead of paper-craft collage.",
    directionKeywords: ["real photographic montage board", "sharp image collision", "mask overlay sheets", "campaign storytelling", "photo paper contrast"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/photomontage-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Photomontage in web design. Photograph a real designer's photographic composite and campaign research board from above on a dark neutral studio table. Include printed website layouts made only of blank image fields and empty bars, cut photographic fragments of architecture, objects, sky, water, product details, and shadows with no people, no faces, no labels, no typography, no letters, and no symbols. Include sharp mask shapes, photo contact-sheet crops with blank borders, transparent overlay sheets, black tape, blank photo corners, high-contrast matte and glossy photo papers, red and pale blue color chips, and composite studies where images collide visually through cropping and layering. The visual language should communicate photographic collision, montage editing, constructed meaning, and campaign storytelling for web pages, not paper collage craft, magazine browsing, punk zine texture, or experimental typography. Use tape corners, pin marks, paper curl, cut photo edges, acetate reflections, varied paper thickness, subtle dust, and real shadows. Palette: black, white, photo grey, deep red, pale blue, cream, graphite. Absolutely no readable text, no micro text, no fake text, no letterforms, no alphabet shapes, no numbers, no labels, no logos, no people, no faces, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "experimental-type": {
    alt: "Experimental Type moodboard with abstract non-letter web proofs, warped black forms, sliced curves, ink textures, distortion sheets, motion-blur crops, and bright accent chips.",
    caption: "Type-like energy without words: use warped forms, sliced curves, distortion sheets, and ink rhythm so the page feels expressive but not readable.",
    directionKeywords: ["real abstract type board", "non alphabet forms", "warped visual rhythm", "ink distortion sheets", "expressive hierarchy"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/experimental-type-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Experimental Type in web design. Photograph a real designer's abstract form and expressive hierarchy web research board from above on a matte black and white studio surface. Include printed experimental web layouts made only of non-alphabet abstract shapes, blank bars, and image blocks. Include warped black paper forms, stretched geometric blocks, sliced curves, ink texture swatches, transparent distortion sheets, motion-blur abstract form crops, high-contrast paper samples, bright accent chips, and blank paper tabs. The forms should suggest visual rhythm and type-like energy without becoming any real letter, word, symbol, or number. The visual language should communicate expressive visual rhythm, form experimentation, and type-as-material thinking for web pages, not normal typography hierarchy, poster campaign scale, or anti-design chaos. Use tape corners, pin marks, paper curl, cut edges, acetate reflections, varied paper thickness, subtle dust, and real shadows. Palette: black, white, graphite, electric blue, hot red, acid yellow, pale grey. Absolutely no readable text, no micro text, no fake text, no real letters, no alphabet, no letter-like marks, no words, no numbers, no labels, no logos, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "newspaper-style": {
    alt: "Newspaper Style moodboard with blank news web proofs, empty columns, headline bars, folded newsprint samples, monochrome photo crops, rule lines, archive cards, and ink chips.",
    caption: "Dense news cadence: use multi-column modules, headline bars, newsprint grain, rule lines, and archive blanks for authority without magazine glamour.",
    directionKeywords: ["real news layout board", "dense column hierarchy", "folded newsprint grain", "monochrome archive rhythm", "information heavy web"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/newspaper-style-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Newspaper Style in web design. Photograph a real designer's news layout and information-heavy web research board from above on a pale newsprint studio table. Include printed newspaper-style website layouts made only of blank headline bars, empty columns, and image boxes, multi-column page studies with no letters or numbers, folded newsprint paper samples without text, monochrome photo crops with no people or labels, rule-line samples, section-grid blocks, muted ink and paper color chips, archive-card blanks, and small physical objects like blank clipping tabs, paper weights, and folded paper corners. The visual language should communicate dense but readable information hierarchy, news cadence, monochrome authority, and archive browsing for web pages, not magazine cover glamour, editorial longform spaciousness, or typography specimen work. Use tape corners, pin marks, paper curl, folded newsprint edges, ink grain, varied paper thickness, subtle dust, and real shadows. Palette: newsprint grey, off white, black, ink blue, faded red, warm beige, graphite. Absolutely no readable text, no fake text, no letterforms, no numbers, no labels, no logos, no brand names, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "flat-design": {
    alt: "Flat Design moodboard with blank flat-interface proofs, colored rectangles, matte paper chips, icon placeholder tiles, card grids, button shapes, and acrylic squares.",
    caption: "Two-dimensional clarity: use solid color fields, matte surfaces, simple modules, and icon-like placeholders without shadows or soft depth.",
    directionKeywords: ["real flat interface board", "solid color modules", "matte paper system", "two dimensional clarity", "simple UI hierarchy"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/flat-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Flat Design in web design. Photograph a real designer's flat interface and icon-system research board from above on a clean white studio table. Include printed flat-design website layouts made only of blank colored rectangles, empty bars, and simple shape modules, flat color chips, matte paper swatches, icon placeholder tiles with no symbols or letters, simple card-grid studies, solid button-shape samples with no text, color-block product fragments, and small physical objects like blank colored cards, matte acrylic squares, and paper tabs. The visual language should communicate two-dimensional clarity, simple color systems, direct UI hierarchy, and icon-like structure for web pages, not material shadows, neumorphic depth, or startup gradient marketing. Use tape corners, pin marks, slight paper curl, clean cut edges, matte paper texture, varied paper thickness, subtle dust, and soft shadows. Palette: white, black, cobalt, coral, mint, yellow, light grey, navy. Absolutely no readable text, no fake text, no letters, no numbers, no labels, no logos, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "material-design": {
    alt: "Material Design moodboard with blank component proofs, layered paper surfaces, elevation stacks, ripple circles, color-role chips, acrylic samples, and spacing cards.",
    caption: "Surface discipline: use layered paper, elevation shadows, state circles, and component spacing to express product consistency rather than flat color.",
    directionKeywords: ["real material system board", "layered elevation surfaces", "state component studies", "product UI consistency", "soft physical shadows"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/material-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Material Design in web design. Photograph a real designer's surface-elevation and component-system research board from above on a neutral light grey studio table. Include printed material-design website and app layouts made only of blank cards, empty bars, and unlabeled state blocks, layered paper surfaces casting real shadows, elevation-stack studies, ripple-state paper circles with no icons, color role chips, matte paper and acrylic samples, component spacing cards, motion-sequence strips without numbers, and small physical objects like stacked blank cards and translucent dividers. The visual language should communicate surfaces, elevation, states, motion discipline, and product UI consistency for web pages, not flat color-only design, glass transparency, or neumorphic embossing. Use tape corners, pin marks, slight paper curl, soft physical shadows, layered paper thickness, subtle dust, and clean studio texture. Palette: white, light grey, indigo, teal, amber, coral, graphite, soft shadow grey. Absolutely no readable text, no fake text, no letters, no numbers, no labels, no logos, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  neumorphism: {
    alt: "Neumorphism moodboard with blank soft UI proofs, raised and inset paper buttons, tone-on-tone chips, pill controls, molded paper, foam, bevel studies, and rounded tokens.",
    caption: "Pressed soft surfaces: rely on low-contrast embossing, inset controls, molded paper, foam, and double shadows instead of colorful 3D clay.",
    directionKeywords: ["real soft embossed board", "raised inset controls", "tone on tone depth", "gentle double shadows", "low contrast UI"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/neumorphism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Neumorphism in web design. Photograph a real designer's soft-embossed interface research board from above on a pale warm grey studio surface. Include printed neumorphic web and app layouts made only of blank rounded cards and empty bars, raised and inset paper button studies, soft shadow tests, tone-on-tone color chips, pill controls with no icons or text, molded paper samples, matte foam swatches, subtle bevel studies, tactile white and grey cards, and small physical objects like rounded blank tokens and embossed paper tiles. The visual language should communicate pressed surfaces, soft depth, low-contrast tactile controls, and calm product UI for web pages, not flat design, material elevation, or claymorphism 3D colors. Use tape corners, pin marks, slight paper curl, gentle double shadows, soft edges, varied paper thickness, subtle dust, and real surface texture. Palette: pale grey, warm white, cloud blue, soft taupe, muted lavender, graphite accent. Absolutely no readable text, no fake text, no letters, no numbers, no labels, no logos, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  glassmorphism: {
    alt: "Glassmorphism moodboard with blank translucent panel proofs, frosted acrylic, glass samples, blurred color fields, vellum, transparent card studies, and acrylic blocks.",
    caption: "Layered translucency: use frosted acrylic, glass edges, blur fields, vellum, and refraction to express depth without hologram spectacle.",
    directionKeywords: ["real translucent interface board", "frosted acrylic sheets", "blurred color fields", "glass refraction depth", "layered transparent panels"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/glassmorphism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Glassmorphism in web design. Photograph a real designer's translucent glass interface research board from above on a cool dark-to-light gradient studio surface. Include printed glassmorphism web layouts made only of blank translucent panels and empty bars, frosted acrylic sheets, clear glass samples, blurred color-field photo crops with no labels, layered vellum, transparent rounded card studies, soft glow color chips, depth shadow tests, refraction samples, and small physical objects like clear acrylic blocks, glass tiles, and unmarked translucent discs. The visual language should communicate layered transparency, blur, depth, and luminous interface surfaces for web pages, not hologram rainbow film, bubble gel volume, or material paper elevation. Use tape corners, pin marks, paper curl, glass reflections, frosted edges, varied paper thickness, subtle dust, and real shadows. Palette: frosted white, icy blue, violet, soft cyan, pale pink, graphite, clear glass. Absolutely no readable text, no fake text, no letters, no numbers, no labels, no logos, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  claymorphism: {
    alt: "Claymorphism moodboard with blank soft 3D app proofs, extruded shapes, pastel clay blobs, polymer clay, puffy modules, foam blocks, beads, and rounded tokens.",
    caption: "Soft 3D tactility: use polymer clay, puffy cards, rounded tokens, and pastel extrusion so depth feels playful rather than embossed or glassy.",
    directionKeywords: ["real soft 3D board", "pastel clay objects", "puffy rounded cards", "friendly tactile depth", "casual app commerce"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/claymorphism-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Claymorphism in web design. Photograph a real designer's soft 3D clay interface and casual app research board from above on a warm cream studio table. Include printed claymorphism web layouts made only of blank rounded 3D cards and empty bars, soft extruded paper shapes, pastel clay blobs, matte polymer clay samples, pill control studies with no icons or text, puffy product-module studies, soft shadow tests, bright friendly color chips, rounded toy-like object crops with no labels or characters, and small physical objects like unmarked clay beads, squishy foam blocks, and smooth rounded tokens. The visual language should communicate soft 3D depth, friendly tactility, inflated cards, and casual app commerce for web pages, not neumorphic monochrome embossing, toy product photography, or bubble gel reflections. Use tape corners, pin marks, slight paper curl, clay texture, soft shadows, rounded edges, varied paper thickness, subtle dust, and real surface texture. Palette: cream, peach, lavender, mint, butter yellow, coral, sky blue, soft graphite. Absolutely no readable text, no fake text, no letters, no numbers, no labels, no logos, no faces, no characters, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "dark-mode-design": {
    alt: "Dark Mode Design moodboard with blank dark UI proofs, contrast cards, graphite papers, status chips, dark glass, matte plastic, focus-ring studies, and black acrylic tiles.",
    caption: "Readable dark control: use graphite surfaces, status accents, focus-ring shapes, matte black materials, and contrast studies rather than neon genre styling.",
    directionKeywords: ["real dark UI board", "readable graphite surfaces", "status accent chips", "focus ring studies", "reduced glare product control"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/dark-mode-design-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Dark Mode Design in web design. Photograph a real designer's dark interface accessibility and product dashboard research board from above on a matte charcoal studio table. Include printed dark-mode web layouts made only of blank dark panels, empty bars, and unlabeled status blocks, contrast test cards without numbers, OLED-black and graphite paper samples, muted color chips for status states, blue and green accent strips, dark glass and matte plastic swatches, focus-ring shape studies with no icons or text, night product crop fragments with no labels, and small physical objects like black acrylic tiles and unmarked toggle tokens. The visual language should communicate readable dark surfaces, state clarity, reduced glare, and product UI control for web pages, not cyberpunk neon, rave nightlife, or high-tech instrument panels. Use tape corners, pin marks, slight paper curl, dark surface dust, soft edge highlights, varied paper thickness, and real shadows. Palette: black, charcoal, graphite, cool white, muted blue, status green, warning amber, soft violet. Absolutely no readable text, no fake text, no letters, no numbers, no labels, no logos, no watermarks, no people, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "saas-style": {
    alt: "SaaS Style moodboard with blank product web proofs, dashboard cards, unlabeled charts, abstract table rows, component sheets, pricing shapes, status chips, and dividers.",
    caption: "Operational product clarity: use tables, charts, sidebars, status chips, and component sheets for B2B trust rather than marketing hero flow.",
    directionKeywords: ["real B2B product board", "dashboard component system", "abstract table rows", "status chips", "operational clarity"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/saas-style-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for SaaS Style in web design. Photograph a real designer's B2B product interface and operations web research board from above on a clean light grey office table. Include printed SaaS website and dashboard layouts made only of blank cards, empty bars, unlabeled charts, and abstract table rows with no text or numbers, component library sheets, pricing-card shapes with no currency symbols, status color chips, neutral UI paper samples, sidebar and navigation studies, feature-comparison blocks without labels, matte screen-like acrylic, and small physical objects like blank sticky tabs, clear dividers, and unmarked toggle tokens. The visual language should communicate product trust, operational clarity, repeatable components, and conversion support for web pages, not startup hero marketing, high-tech dashboards, or dark mode surfaces. Use tape corners, pin marks, slight paper curl, clean shadows, varied paper thickness, subtle dust, and real office texture. Palette: white, light grey, navy, cobalt, teal, status green, amber, graphite. Absolutely no readable text, no fake text, no letters, no numbers, no currency, no labels, no logos, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
  "startup-landing-page": {
    alt: "Startup Landing Page moodboard with blank conversion web proofs, hero blocks, CTA bars, feature sections, testimonial shapes, funnel studies, gradient papers, and progress tokens.",
    caption: "Conversion storytelling: use hero blocks, feature sequences, funnel shapes, optimistic gradients, and progress tokens rather than operations dashboards.",
    directionKeywords: ["real startup landing board", "hero CTA flow", "conversion funnel studies", "optimistic product story", "marketing sequence"],
    generatedWith: "imagegen",
    imageSrc: "/generated/moodboards/startup-landing-page-realistic-v2.webp",
    prompt:
      "Create a realistic editorial moodboard for Startup Landing Page style in web design. Photograph a real designer's startup conversion landing page and growth-story research board from above on a bright white studio table. Include printed startup landing layouts made only of blank hero blocks, empty CTA bars, feature sections, testimonial-card shapes with no text, pricing or plan cards with no currency symbols, funnel flow studies with no labels, pitch-deck color chips, optimistic product screenshot placeholders, soft gradient paper samples, clean illustration-shape cutouts with no icons, and small physical objects like blank sticky tabs, clear acrylic arrows, and colored progress tokens. The visual language should communicate fast value communication, conversion flow, founder-product optimism, and marketing page sequencing for web pages, not B2B SaaS operations dashboard, flat design system, or material component library. Use tape corners, pin marks, slight paper curl, clean shadows, varied paper thickness, subtle dust, and real studio texture. Palette: white, navy, bright blue, mint, coral, sunny yellow, pale violet, graphite. Absolutely no readable text, no fake text, no letters, no numbers, no currency, no labels, no logos, no watermarks, no floating cards. Landscape 16:10 realistic top-down editorial photography.",
  },
};

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
  const research = futureDigitalResearch[seed.slug] ?? cuteCasualResearch[seed.slug] ?? streetSubcultureResearch[seed.slug];
  const hasCuratedResearch = Boolean(cuteCasualResearch[seed.slug] ?? streetSubcultureResearch[seed.slug]);
  const generatedTags = [
    ...seed.tags,
    seed.category.split(" / ")[0],
    ...(hasCuratedResearch ? [] : [seed.sampleType ?? profile.sampleType]),
  ];

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
    tags: [...new Set(generatedTags)],
    related: related.slice(0, 3),
    palette: seed.palette,
    imagePrompt: `A square editorial poster representing ${seed.nameEn} design style, ${seed.tone}, ${profile.visual.join(", ")}, ${promptSuffix}`,
    moodboard: styleMoodboards[seed.slug],
    research,
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
