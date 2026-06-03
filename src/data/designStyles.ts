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
    shape: { radius: "2px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1rem", padScale: 1.2 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "left", navStyle: "minimal", alignment: "left" },
  },
  "강렬 / 실험": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 800, weightBody: 500, tracking: "-0.05em", headingScale: 1.25 },
    shape: { radius: "0px", borderWidth: "3px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.5rem", padScale: 0.9 },
    decoration: { shadow: "6px 6px 0 var(--st-primary)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "레트로 / 빈티지": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 700, weightBody: 400, tracking: "-0.01em", headingScale: 1.1 },
    shape: { radius: "4px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "3px 3px 0 var(--st-primary)", effect: "grain" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "center" },
  },
  "미래 / 디지털": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"SFMono-Regular", monospace', weightDisplay: 700, weightBody: 400, tracking: "0em", headingScale: 1.1 },
    shape: { radius: "4px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "0 0 18px rgb(var(--st-accent-rgb) / 0.5)", effect: "glow" },
    layout: { heroVariant: "center", navStyle: "underline", alignment: "left" },
  },
  "럭셔리 / 클래식": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Georgia", "Times New Roman", serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 400, weightBody: 300, tracking: "0.08em", headingScale: 0.9 },
    shape: { radius: "0px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.5rem", padScale: 1.5 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "center", navStyle: "minimal", alignment: "center" },
  },
  "자연 / 수공예": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Satoshi", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 600, weightBody: 400, tracking: "0.01em", headingScale: 1.0 },
    shape: { radius: "8px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "1.25rem", padScale: 1.3 },
    decoration: { shadow: "none", effect: "grain" },
    layout: { heroVariant: "left", navStyle: "minimal", alignment: "left" },
  },
  "귀여움 / 캐주얼": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 700, weightBody: 400, tracking: "-0.01em", headingScale: 1.05 },
    shape: { radius: "9999px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "4px 4px 0 var(--st-accent)", effect: "none" },
    layout: { heroVariant: "center", navStyle: "boxed", alignment: "center" },
  },
  "스트리트 / 서브컬처": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 900, weightBody: 500, tracking: "-0.04em", headingScale: 1.3 },
    shape: { radius: "0px", borderWidth: "3px", borderStyle: "solid" },
    space: { density: "tight", gap: "0.5rem", padScale: 0.85 },
    decoration: { shadow: "4px 4px 0 var(--st-accent)", effect: "none" },
    layout: { heroVariant: "split", navStyle: "boxed", alignment: "left" },
  },
  "편집 / 타이포그래피": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Clash Display", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 700, weightBody: 400, tracking: "-0.03em", headingScale: 1.15 },
    shape: { radius: "0px", borderWidth: "2px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "none", effect: "none" },
    layout: { heroVariant: "left", navStyle: "underline", alignment: "left" },
  },
  "UI / 웹": {
    color: { base: "", surface: "", text: "", muted: "", primary: "", accent: "", accent2: "", accent3: "", border: "" },
    typography: { displayFont: '"Satoshi", sans-serif', bodyFont: '"Satoshi", sans-serif', weightDisplay: 700, weightBody: 400, tracking: "-0.01em", headingScale: 1.0 },
    shape: { radius: "8px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "normal", gap: "0.75rem", padScale: 1.0 },
    decoration: { shadow: "0 2px 8px rgba(0,0,0,0.12)", effect: "none" },
    layout: { heroVariant: "center", navStyle: "minimal", alignment: "left" },
  },
};

const palettes: Record<string, DesignStylePalette> = {
  minimalism: {
    base: "#F4F1EA",
    surface: "#FFFFFF",
    text: "#202020",
    mutedText: "#6C675F",
    primary: "#202020",
    accent: "#A87854",
    accent2: "#D8C7AA",
    accent3: "#9DB0A5",
    border: "#302B25",
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

function hashSlug(slug: string) {
  return slug.split("").reduce((hash, char) => hash + char.charCodeAt(0), 0);
}

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

const styleTokenOverrides: Record<string, DeepPartial<Omit<StyleTokens, "color">>> = {
  // Representative styles — more will be added in Task 5
  "minimalism": {
    shape: { radius: "0px", borderWidth: "1px" },
    decoration: { shadow: "none", effect: "none" },
  },
  "brutalism": {
    typography: { weightDisplay: 900, tracking: "-0.05em" },
    shape: { radius: "0px", borderWidth: "4px" },
    decoration: { shadow: "6px 6px 0 var(--st-primary)", effect: "none" },
  },
  "cyberpunk": {
    typography: { bodyFont: '"SFMono-Regular", monospace', tracking: "0.02em" },
    shape: { radius: "2px", borderWidth: "1px" },
    decoration: { shadow: "0 0 24px rgb(var(--st-accent-rgb) / 0.6)", effect: "glow" },
  },
  "kawaii": {
    shape: { radius: "9999px", borderWidth: "2px" },
    decoration: { shadow: "4px 4px 0 var(--st-accent)", effect: "none" },
  },
  "luxury": {
    typography: { displayFont: '"Georgia", "Times New Roman", serif', weightDisplay: 300, weightBody: 300, tracking: "0.12em", headingScale: 0.85 },
    shape: { radius: "0px", borderWidth: "1px", borderStyle: "solid" },
    space: { density: "airy", gap: "2rem", padScale: 1.8 },
    decoration: { shadow: "none", effect: "none" },
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

  return {
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
