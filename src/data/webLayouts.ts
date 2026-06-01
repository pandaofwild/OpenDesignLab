export type WebLayout = {
  slug: string;
  nameKo: string;
  nameEn: string;
  category: string;
  summary: string;
  description: string;
  structure: string[];
  bestFor: string[];
  notGoodFor: string[];
  pros: string[];
  cons: string[];
  responsiveBehavior: string[];
  accessibilityNotes: string[];
  implementationTips: string[];
  complexity: "easy" | "medium" | "hard";
  tags: string[];
  related: string[];
  previewType: string;
};

type PreviewType =
  | "single-column"
  | "two-column"
  | "three-column"
  | "hero"
  | "split-screen"
  | "card-grid"
  | "bento-grid"
  | "dashboard"
  | "editorial"
  | "ecommerce-product"
  | "docs"
  | "feed"
  | "map-list"
  | "comparison"
  | "timeline"
  | "scroll-story";

type LayoutSeed = {
  nameKo: string;
  nameEn: string;
  category: string;
  summary: string;
  previewType: PreviewType;
  complexity: WebLayout["complexity"];
  bestFor?: string[];
  notGoodFor?: string[];
  tags?: string[];
};

const categoryGuides: Record<
  string,
  {
    role: string;
    defaultBestFor: string[];
    defaultNotGoodFor: string[];
    defaultTags: string[];
  }
> = {
  "기본 웹 레이아웃": {
    role: "대부분의 웹사이트 정보 구조를 떠받치는 기본 골격입니다. 콘텐츠 폭, 컬럼 수, 흐름을 명확하게 정해 이후 디자인 결정을 안정적으로 만듭니다.",
    defaultBestFor: ["회사 소개", "서비스 소개", "문서형 페이지"],
    defaultNotGoodFor: ["강한 몰입형 캠페인", "복잡한 업무 대시보드"],
    defaultTags: ["foundation", "structure", "responsive"],
  },
  "랜딩페이지 레이아웃": {
    role: "방문자의 관심을 끌고 설득 흐름을 만들어 전환 행동으로 이어지게 하는 구조입니다. 메시지 순서와 CTA 반복 위치가 성과를 좌우합니다.",
    defaultBestFor: ["랜딩페이지", "프로모션", "리드 수집"],
    defaultNotGoodFor: ["깊은 문서 탐색", "복잡한 다중 메뉴 서비스"],
    defaultTags: ["landing", "conversion", "cta"],
  },
  "비주얼 중심 레이아웃": {
    role: "이미지, 영상, 제품 장면처럼 시각 자료가 핵심 메시지를 전달하도록 설계된 구조입니다. 카피는 짧게, 시각 리듬은 크게 가져갑니다.",
    defaultBestFor: ["브랜드 캠페인", "제품 쇼케이스", "갤러리"],
    defaultNotGoodFor: ["텍스트가 많은 문서", "빠른 비교가 필요한 목록"],
    defaultTags: ["visual", "media", "showcase"],
  },
  "그리드 기반 레이아웃": {
    role: "동일하거나 다양한 크기의 모듈을 질서 있게 배치하는 구조입니다. 반복 콘텐츠를 빠르게 스캔하고 비교하게 만드는 데 강합니다.",
    defaultBestFor: ["카탈로그", "포트폴리오", "콘텐츠 허브"],
    defaultNotGoodFor: ["선형 설득 흐름", "단일 메시지 중심 페이지"],
    defaultTags: ["grid", "cards", "catalog"],
  },
  "내비게이션 중심 레이아웃": {
    role: "사용자가 여러 화면과 정보 묶음을 오가야 할 때 길잡이 역할을 하는 구조입니다. 현재 위치, 다음 이동, 주요 액션이 즉시 보여야 합니다.",
    defaultBestFor: ["웹 앱", "지식 베이스", "관리 도구"],
    defaultNotGoodFor: ["한 번에 읽히는 짧은 랜딩페이지", "극단적으로 단순한 원페이지"],
    defaultTags: ["navigation", "wayfinding", "app"],
  },
  "콘텐츠 중심 레이아웃": {
    role: "읽기, 탐색, 저장, 재방문이 중요한 콘텐츠를 안정적으로 제공하는 구조입니다. 제목, 본문, 메타 정보, 관련 링크의 위계가 중요합니다.",
    defaultBestFor: ["블로그", "뉴스", "문서", "자료실"],
    defaultNotGoodFor: ["강한 비주얼 캠페인", "단일 상품 구매 흐름"],
    defaultTags: ["content", "reading", "archive"],
  },
  "커머스 레이아웃": {
    role: "상품 탐색부터 비교, 상세 확인, 구매 결정까지 이어지는 상거래 흐름에 맞춘 구조입니다. 필터, 가격, 재고, CTA가 명확해야 합니다.",
    defaultBestFor: ["온라인 쇼핑몰", "마켓플레이스", "상품 비교"],
    defaultNotGoodFor: ["스토리 중심 브랜드 에세이", "순수 문서 페이지"],
    defaultTags: ["commerce", "product", "shopping"],
  },
  "SaaS / 서비스 웹 레이아웃": {
    role: "서비스 가치, 기능, 신뢰, 실제 사용 흐름을 함께 보여주는 구조입니다. 제품 화면과 설명이 서로 보강되도록 배치합니다.",
    defaultBestFor: ["SaaS", "업무 도구", "API 서비스"],
    defaultNotGoodFor: ["이미지 중심 포트폴리오", "짧은 이벤트 페이지"],
    defaultTags: ["saas", "product", "workflow"],
  },
  "포트폴리오 레이아웃": {
    role: "작업자의 관점, 결과물, 과정, 역할을 설득력 있게 드러내는 구조입니다. 프로젝트 간 차이를 비교하고 깊이 들어갈 수 있어야 합니다.",
    defaultBestFor: ["개인 포트폴리오", "스튜디오 사이트", "케이스스터디"],
    defaultNotGoodFor: ["상품 대량 탐색", "문서형 지식 베이스"],
    defaultTags: ["portfolio", "case-study", "work"],
  },
  "실험적 / 트렌디한 레이아웃": {
    role: "의도적으로 관습을 비틀어 강한 인상을 만드는 구조입니다. 새로움은 장점이지만 탐색성과 접근성을 함께 설계해야 합니다.",
    defaultBestFor: ["브랜드 캠페인", "인터랙티브 쇼케이스", "실험적 포트폴리오"],
    defaultNotGoodFor: ["고령층 대상 서비스", "업무 반복 사용 화면"],
    defaultTags: ["experimental", "motion", "brand"],
  },
  "모바일 웹 / 앱형 레이아웃": {
    role: "좁은 화면, 엄지 조작, 짧은 세션에 맞춘 구조입니다. 하단 액션, 피드 흐름, 단계 진행 상태가 사용성을 크게 좌우합니다.",
    defaultBestFor: ["모바일 웹", "앱형 서비스", "위치 기반 서비스"],
    defaultNotGoodFor: ["넓은 표 비교", "복잡한 편집 도구"],
    defaultTags: ["mobile", "app", "touch"],
  },
  "정보 구조별 레이아웃": {
    role: "사용자의 시선 흐름과 의사결정 방식을 기준으로 정보를 배열하는 구조입니다. 콘텐츠의 논리와 탐색 목적이 먼저 정리되어야 합니다.",
    defaultBestFor: ["설명 페이지", "비교 페이지", "검색 결과", "위저드"],
    defaultNotGoodFor: ["시각 실험 자체가 목적인 페이지", "정해진 구조 없이 변하는 피드"],
    defaultTags: ["ia", "pattern", "decision"],
  },
};

const previewGuides: Record<
  PreviewType,
  {
    structure: string[];
    responsive: string[];
    tips: string[];
  }
> = {
  "single-column": {
    structure: [
      "상단 헤더 아래에 하나의 본문 흐름을 둡니다.",
      "콘텐츠 폭은 640-860px 범위로 제한해 읽기 길이를 관리합니다.",
      "섹션 간 간격과 제목 크기로 문단 흐름을 구분합니다.",
    ],
    responsive: [
      "모바일에서도 구조 변화가 적어 안정적입니다.",
      "본문 폭은 화면에 맞춰 줄이고 행간을 넉넉하게 유지합니다.",
      "보조 CTA는 본문 사이에 자연스럽게 삽입합니다.",
    ],
    tips: [
      "max-w와 mx-auto를 기본 컨테이너 규칙으로 둡니다.",
      "긴 텍스트는 prose 스타일이나 명확한 heading scale을 적용합니다.",
      "상단 액션은 sticky보다 본문 흐름 안의 반복 CTA가 더 자연스럽습니다.",
    ],
  },
  "two-column": {
    structure: [
      "주 콘텐츠와 보조 콘텐츠를 2개 컬럼으로 나눕니다.",
      "좌우 컬럼의 역할을 명확히 구분해 시선 이동을 줄입니다.",
      "보조 영역에는 요약, 목차, CTA, 관련 정보를 배치합니다.",
    ],
    responsive: [
      "태블릿에서는 컬럼 비율을 줄이고 간격을 좁힙니다.",
      "모바일에서는 주요 콘텐츠를 먼저, 보조 콘텐츠를 뒤로 쌓습니다.",
      "중요한 CTA는 모바일에서 접히지 않도록 상단에도 노출합니다.",
    ],
    tips: [
      "grid-template-columns를 명확한 비율로 선언합니다.",
      "사이드 콘텐츠에는 sticky를 적용하되 모바일에서는 해제합니다.",
      "컬럼 간 시각 무게가 비슷해지지 않도록 우선순위를 조절합니다.",
    ],
  },
  "three-column": {
    structure: [
      "좌측 탐색, 중앙 본문, 우측 보조 패널로 나눕니다.",
      "중앙 컬럼을 가장 넓게 두고 양쪽 컬럼은 기능을 제한합니다.",
      "목차, 필터, 메타 정보처럼 보조 탐색이 많은 화면에 적합합니다.",
    ],
    responsive: [
      "태블릿에서는 우측 패널을 본문 아래나 접힘 영역으로 이동합니다.",
      "모바일에서는 좌측 탐색을 드로어 또는 상단 선택 UI로 바꿉니다.",
      "중앙 콘텐츠의 최소 폭을 먼저 보장해야 합니다.",
    ],
    tips: [
      "grid columns에 minmax를 써서 중앙 영역이 찌그러지지 않게 합니다.",
      "좌우 패널은 aria-label이 있는 nav 또는 aside로 분리합니다.",
      "보조 패널이 많으면 탭이나 아코디언으로 밀도를 조절합니다.",
    ],
  },
  hero: {
    structure: [
      "첫 화면에 핵심 메시지, 짧은 설명, CTA, 대표 시각 요소를 배치합니다.",
      "히어로 아래에는 바로 다음 섹션의 일부가 보이도록 연결감을 둡니다.",
      "보조 증거나 기능은 히어로를 방해하지 않는 낮은 밀도로 둡니다.",
    ],
    responsive: [
      "모바일에서는 카피와 CTA를 먼저 보여주고 시각 요소는 축약합니다.",
      "버튼은 손가락 조작 가능한 높이를 유지합니다.",
      "첫 화면에서 다음 콘텐츠 힌트가 사라지지 않도록 높이를 제한합니다.",
    ],
    tips: [
      "H1은 짧고 명확하게 유지하고 부연 설명은 p 태그로 분리합니다.",
      "CTA 그룹은 flex-wrap을 허용해 작은 화면에서 깨지지 않게 합니다.",
      "비주얼은 aspect-ratio를 고정해 로딩 전후 레이아웃 변화를 줄입니다.",
    ],
  },
  "split-screen": {
    structure: [
      "화면을 좌우 또는 상하 두 영역으로 나누어 메시지와 시각 요소를 대등하게 배치합니다.",
      "두 영역은 명확한 역할 차이를 가져야 하며 서로 같은 정보를 반복하지 않습니다.",
      "경계선, 배경색, 이미지 프레임으로 분할감을 강화합니다.",
    ],
    responsive: [
      "태블릿 이하에서는 두 영역을 세로로 쌓습니다.",
      "시각 영역은 모바일에서 과도하게 길어지지 않도록 비율을 고정합니다.",
      "중요 액션은 텍스트 영역 안에 유지합니다.",
    ],
    tips: [
      "min-h를 쓰되 작은 화면에서는 auto height로 전환합니다.",
      "좌우 영역의 패딩을 독립적으로 조절합니다.",
      "이미지 없이 구현할 때는 CSS 패턴과 그리드 블록으로 시각 밀도를 만듭니다.",
    ],
  },
  "card-grid": {
    structure: [
      "반복 가능한 카드를 행과 열로 배치합니다.",
      "각 카드는 제목, 요약, 메타 정보, 주요 액션의 동일한 순서를 유지합니다.",
      "필터나 정렬이 있다면 그리드 위에 가까이 둡니다.",
    ],
    responsive: [
      "데스크톱은 3-4열, 태블릿은 2열, 모바일은 1열이 기본입니다.",
      "카드 높이가 달라도 행간이 어색하지 않게 align-start를 사용합니다.",
      "터치 화면에서는 카드 안 링크와 버튼 간격을 넉넉히 둡니다.",
    ],
    tips: [
      "repeat(auto-fit, minmax())로 컬럼 수를 유연하게 처리합니다.",
      "카드 내부 정보 순서를 컴포넌트로 고정해 스캔성을 유지합니다.",
      "필터 결과가 없을 때의 빈 상태를 별도로 준비합니다.",
    ],
  },
  "bento-grid": {
    structure: [
      "중요도에 따라 크기가 다른 모듈을 하나의 그리드 안에 배치합니다.",
      "큰 타일은 대표 메시지나 핵심 기능, 작은 타일은 보조 정보를 맡습니다.",
      "전체 그리드의 모서리와 간격을 통일해 산만함을 줄입니다.",
    ],
    responsive: [
      "데스크톱에서는 span 규칙으로 리듬을 만들고 모바일에서는 단일 컬럼으로 정렬합니다.",
      "작은 타일의 텍스트가 모바일에서 지나치게 작아지지 않게 합니다.",
      "중요 타일은 모바일에서도 상단 순서를 유지합니다.",
    ],
    tips: [
      "grid-auto-flow와 col-span/row-span을 제한적으로 사용합니다.",
      "타일마다 다른 UI를 넣더라도 제목, 보조 설명, 액션 위치는 일관되게 둡니다.",
      "데이터가 동적으로 변하면 span 규칙이 깨지지 않도록 fallback을 둡니다.",
    ],
  },
  dashboard: {
    structure: [
      "사이드바 또는 상단바, 핵심 지표, 작업 영역, 보조 패널로 구성합니다.",
      "반복 사용자가 현재 상태와 다음 작업을 빠르게 찾도록 밀도를 조절합니다.",
      "표, 차트, 리스트는 같은 기준선과 카드 규칙을 공유합니다.",
    ],
    responsive: [
      "모바일에서는 사이드바를 접고 핵심 작업 순서대로 세로 배치합니다.",
      "지표 카드는 2열 이하로 줄여 숫자 가독성을 유지합니다.",
      "표는 카드형 리스트나 가로 스크롤 정책을 명확히 선택합니다.",
    ],
    tips: [
      "앱 셸, 데이터 패널, 작업 리스트를 별도 컴포넌트로 나눕니다.",
      "반복 제어 버튼에는 명확한 focus-visible 스타일을 둡니다.",
      "실제 데이터가 길어질 때를 대비해 overflow와 empty state를 설계합니다.",
    ],
  },
  editorial: {
    structure: [
      "큰 제목, 리드 문단, 본문, 인용 또는 보조 박스를 리듬 있게 배치합니다.",
      "콘텐츠 블록마다 폭과 배경을 조금씩 달리해 읽는 흐름을 만듭니다.",
      "이미지 없이도 타이포그래피와 여백이 핵심 시각 요소가 됩니다.",
    ],
    responsive: [
      "모바일에서는 제목 크기를 줄이고 본문 행 길이를 짧게 유지합니다.",
      "보조 박스는 본문 사이에 삽입하되 흐름을 끊지 않습니다.",
      "긴 목록은 접히지 않고 자연스럽게 이어지도록 단일 컬럼을 우선합니다.",
    ],
    tips: [
      "본문 텍스트에는 넉넉한 line-height와 max-width를 적용합니다.",
      "인용, 캡션, 메타 텍스트는 색상보다 크기와 간격으로 구분합니다.",
      "콘텐츠 순서가 SEO와 접근성 순서와 일치하게 유지합니다.",
    ],
  },
  "ecommerce-product": {
    structure: [
      "상품 미디어, 정보, 가격, 옵션, 구매 CTA를 한 화면에서 연결합니다.",
      "신뢰 요소와 배송/반품 정보는 구매 CTA 가까이에 둡니다.",
      "관련 상품이나 추천 영역은 주요 구매 흐름 아래에 배치합니다.",
    ],
    responsive: [
      "모바일에서는 상품 이미지 다음에 가격과 CTA가 바로 이어져야 합니다.",
      "옵션 선택 영역은 터치 가능한 크기와 충분한 간격을 유지합니다.",
      "구매 CTA는 필요하면 하단 고정 바로 보조합니다.",
    ],
    tips: [
      "가격, 할인, 재고 상태는 시각적으로 같은 그룹 안에 둡니다.",
      "상품 미디어는 aspect-ratio와 object-fit 규칙을 고정합니다.",
      "폼 요소에는 label과 aria-describedby를 연결합니다.",
    ],
  },
  docs: {
    structure: [
      "좌측 목차, 중앙 문서, 우측 섹션 목차 또는 보조 정보로 구성합니다.",
      "문서 검색, 버전, 현재 섹션 표시가 탐색성을 높입니다.",
      "코드 예시와 주의 박스는 본문 흐름 속에서 명확히 구분합니다.",
    ],
    responsive: [
      "모바일에서는 목차를 상단 선택 UI나 접힘 영역으로 바꿉니다.",
      "코드 블록은 가로 스크롤을 허용하고 본문 폭을 깨지 않게 합니다.",
      "현재 위치 표시를 상단에 유지하면 긴 문서에서 도움이 됩니다.",
    ],
    tips: [
      "main, nav, aside landmark를 명확히 분리합니다.",
      "heading id와 anchor link를 안정적으로 생성합니다.",
      "코드 블록에는 복사 버튼과 keyboard focus 스타일을 제공합니다.",
    ],
  },
  feed: {
    structure: [
      "카드 또는 게시물 단위를 시간순이나 추천순으로 이어 붙입니다.",
      "상단에는 작성, 검색, 필터처럼 반복 사용 액션을 둡니다.",
      "각 피드 아이템은 작성자, 본문, 메타, 액션 순서를 일관되게 유지합니다.",
    ],
    responsive: [
      "모바일에서는 단일 컬럼이 기본이며 하단 탭이나 상단 필터를 활용합니다.",
      "긴 카드가 연속될 때는 섹션 구분과 간격을 명확히 합니다.",
      "무한 스크롤은 로딩 상태와 키보드 대체 탐색을 함께 고려합니다.",
    ],
    tips: [
      "피드 아이템 컴포넌트는 메타, 본문, 액션 영역으로 분리합니다.",
      "새 항목 로딩에는 skeleton보다 명확한 상태 텍스트가 더 접근성이 좋습니다.",
      "탭 전환은 button으로 구현하고 선택 상태를 aria-pressed로 노출합니다.",
    ],
  },
  "map-list": {
    structure: [
      "지도 또는 공간 캔버스와 결과 리스트를 나란히 배치합니다.",
      "선택된 항목은 지도와 리스트 양쪽에서 같은 상태로 표시합니다.",
      "검색, 필터, 범례를 지도 시야를 가리지 않는 위치에 둡니다.",
    ],
    responsive: [
      "모바일에서는 지도와 리스트를 탭 또는 상하 구조로 전환합니다.",
      "지도 영역 높이를 고정해 스크롤 충돌을 줄입니다.",
      "선택 카드가 작은 화면에서 주요 조작을 가리지 않게 합니다.",
    ],
    tips: [
      "실제 지도 API가 없더라도 상태 연결 구조를 먼저 컴포넌트로 분리합니다.",
      "리스트 항목과 지도 마커는 같은 id를 공유하게 설계합니다.",
      "범례와 필터에는 명확한 텍스트 라벨을 제공합니다.",
    ],
  },
  comparison: {
    structure: [
      "비교 대상과 기준을 행과 열로 명확히 배치합니다.",
      "가장 중요한 차이는 표 위나 첫 열에서 먼저 요약합니다.",
      "동일한 기준을 반복해 판단 피로를 줄입니다.",
    ],
    responsive: [
      "모바일에서는 열 비교를 카드 스택이나 가로 스크롤 표로 전환합니다.",
      "핵심 차이점은 표 밖 요약으로도 제공합니다.",
      "긴 셀 텍스트는 줄바꿈과 높이 확장을 허용합니다.",
    ],
    tips: [
      "table을 사용할 때 scope와 caption을 제공해 스크린 리더 탐색을 돕습니다.",
      "강조 열은 색상만이 아니라 라벨이나 아이콘 텍스트로도 표시합니다.",
      "비교 기준은 데이터 구조로 분리해 순서를 안정화합니다.",
    ],
  },
  timeline: {
    structure: [
      "시간축을 중심으로 이벤트, 단계, 결과를 순서대로 배치합니다.",
      "현재 단계와 완료 단계를 시각적으로 구분합니다.",
      "각 항목에는 시점, 제목, 요약, 관련 액션을 포함합니다.",
    ],
    responsive: [
      "모바일에서는 중앙 축보다 좌측 축이 읽기 쉽습니다.",
      "긴 설명은 접힘 없이 본문 흐름 안에 배치합니다.",
      "단계 상태는 색상과 텍스트를 함께 사용합니다.",
    ],
    tips: [
      "ol/li 구조로 순서를 의미 있게 표현합니다.",
      "시간축 선은 CSS border나 pseudo element로 구현합니다.",
      "현재 단계에는 aria-current를 적용할 수 있습니다.",
    ],
  },
  "scroll-story": {
    structure: [
      "스크롤 진행에 따라 메시지와 장면을 단계적으로 보여줍니다.",
      "각 장면은 하나의 주장, 근거, 시각 블록으로 구성합니다.",
      "고정 영역과 흐르는 영역의 관계를 명확히 설계합니다.",
    ],
    responsive: [
      "모바일에서는 고정 효과를 줄이고 일반 섹션 흐름으로 전환합니다.",
      "스크롤 기반 인터랙션 없이도 모든 정보가 읽혀야 합니다.",
      "장면 전환 사이의 여백을 충분히 둬 오작동처럼 보이지 않게 합니다.",
    ],
    tips: [
      "position: sticky는 데스크톱에서만 제한적으로 사용합니다.",
      "prefers-reduced-motion 환경에서는 전환 효과를 비활성화합니다.",
      "각 장면은 독립 섹션으로 마크업해 SEO와 접근성을 유지합니다.",
    ],
  },
};

const layoutSeeds: LayoutSeed[] = [
  {
    nameKo: "싱글 컬럼 레이아웃",
    nameEn: "Single Column Layout",
    category: "기본 웹 레이아웃",
    summary: "하나의 읽기 흐름에 집중시키는 가장 안정적인 웹 구조입니다.",
    previewType: "single-column",
    complexity: "easy",
    bestFor: ["블로그", "소개 페이지", "문서형 페이지"],
  },
  {
    nameKo: "투 컬럼 레이아웃",
    nameEn: "Two Column Layout",
    category: "기본 웹 레이아웃",
    summary: "본문과 보조 정보를 나누어 비교와 탐색을 동시에 지원합니다.",
    previewType: "two-column",
    complexity: "medium",
  },
  {
    nameKo: "쓰리 컬럼 레이아웃",
    nameEn: "Three Column Layout",
    category: "기본 웹 레이아웃",
    summary: "탐색, 본문, 보조 패널이 함께 필요한 정보량 많은 화면에 맞습니다.",
    previewType: "three-column",
    complexity: "hard",
  },
  {
    nameKo: "고정폭 레이아웃",
    nameEn: "Fixed Width Layout",
    category: "기본 웹 레이아웃",
    summary: "콘텐츠 폭을 일정하게 유지해 예측 가능한 시각 구성을 만듭니다.",
    previewType: "single-column",
    complexity: "easy",
  },
  {
    nameKo: "풀폭 레이아웃",
    nameEn: "Full Width Layout",
    category: "기본 웹 레이아웃",
    summary: "화면 전체 폭을 활용해 넓은 시각적 인상과 섹션 리듬을 만듭니다.",
    previewType: "hero",
    complexity: "medium",
  },
  {
    nameKo: "박스형 레이아웃",
    nameEn: "Boxed Layout",
    category: "기본 웹 레이아웃",
    summary: "콘텐츠를 명확한 프레임 안에 담아 정돈된 인상을 줍니다.",
    previewType: "two-column",
    complexity: "easy",
  },
  {
    nameKo: "반응형 레이아웃",
    nameEn: "Responsive Layout",
    category: "기본 웹 레이아웃",
    summary: "화면 크기에 따라 구조와 밀도가 자연스럽게 바뀌는 기본 전략입니다.",
    previewType: "card-grid",
    complexity: "medium",
  },

  {
    nameKo: "히어로 중심 레이아웃",
    nameEn: "Hero Focused Layout",
    category: "랜딩페이지 레이아웃",
    summary: "첫 화면에서 가치 제안과 CTA를 강하게 전달하는 전환 중심 구조입니다.",
    previewType: "hero",
    complexity: "easy",
    bestFor: ["신규 서비스 랜딩", "캠페인", "앱 소개"],
  },
  {
    nameKo: "세일즈 퍼널 레이아웃",
    nameEn: "Sales Funnel Layout",
    category: "랜딩페이지 레이아웃",
    summary: "문제 인식부터 신뢰와 구매 행동까지 순차적으로 설득합니다.",
    previewType: "scroll-story",
    complexity: "medium",
  },
  {
    nameKo: "AIDA 레이아웃",
    nameEn: "AIDA Layout",
    category: "랜딩페이지 레이아웃",
    summary: "Attention, Interest, Desire, Action 흐름으로 메시지를 배열합니다.",
    previewType: "scroll-story",
    complexity: "medium",
  },
  {
    nameKo: "PAS 레이아웃",
    nameEn: "PAS Layout",
    category: "랜딩페이지 레이아웃",
    summary: "Problem, Agitation, Solution 순서로 문제 해결 욕구를 만듭니다.",
    previewType: "scroll-story",
    complexity: "medium",
  },
  {
    nameKo: "기능 소개형 레이아웃",
    nameEn: "Feature Showcase Layout",
    category: "랜딩페이지 레이아웃",
    summary: "핵심 기능을 모듈 단위로 설명해 제품 이해를 빠르게 돕습니다.",
    previewType: "bento-grid",
    complexity: "medium",
  },
  {
    nameKo: "비교표 중심 레이아웃",
    nameEn: "Comparison Table Layout",
    category: "랜딩페이지 레이아웃",
    summary: "대안 간 차이를 표로 정리해 선택을 쉽게 만듭니다.",
    previewType: "comparison",
    complexity: "medium",
  },
  {
    nameKo: "CTA 반복형 레이아웃",
    nameEn: "Repeated CTA Layout",
    category: "랜딩페이지 레이아웃",
    summary: "주요 섹션마다 행동 버튼을 반복해 전환 기회를 높입니다.",
    previewType: "hero",
    complexity: "easy",
  },
  {
    nameKo: "스토리텔링 레이아웃",
    nameEn: "Storytelling Layout",
    category: "랜딩페이지 레이아웃",
    summary: "상황, 갈등, 해결, 결과를 이야기처럼 연결합니다.",
    previewType: "scroll-story",
    complexity: "hard",
  },

  {
    nameKo: "풀스크린 비주얼 레이아웃",
    nameEn: "Fullscreen Visual Layout",
    category: "비주얼 중심 레이아웃",
    summary: "화면 전체를 하나의 장면처럼 사용해 강한 몰입감을 만듭니다.",
    previewType: "hero",
    complexity: "medium",
  },
  {
    nameKo: "스플릿 스크린 레이아웃",
    nameEn: "Split Screen Layout",
    category: "비주얼 중심 레이아웃",
    summary: "메시지와 시각 요소를 양분해 대비와 균형을 만듭니다.",
    previewType: "split-screen",
    complexity: "medium",
  },
  {
    nameKo: "이미지 그리드 레이아웃",
    nameEn: "Image Grid Layout",
    category: "비주얼 중심 레이아웃",
    summary: "여러 시각 자료를 규칙적인 격자로 정리해 빠르게 훑게 합니다.",
    previewType: "card-grid",
    complexity: "easy",
  },
  {
    nameKo: "메이슨리 레이아웃",
    nameEn: "Masonry Layout",
    category: "비주얼 중심 레이아웃",
    summary: "서로 다른 높이의 콘텐츠를 촘촘하게 쌓아 갤러리 밀도를 높입니다.",
    previewType: "card-grid",
    complexity: "hard",
  },
  {
    nameKo: "콜라주 레이아웃",
    nameEn: "Collage Layout",
    category: "비주얼 중심 레이아웃",
    summary: "겹침과 크기 대비로 자유로운 브랜드 무드를 표현합니다.",
    previewType: "bento-grid",
    complexity: "hard",
  },
  {
    nameKo: "시네마틱 레이아웃",
    nameEn: "Cinematic Layout",
    category: "비주얼 중심 레이아웃",
    summary: "넓은 화면비와 장면 전환 감각으로 영화 같은 몰입감을 줍니다.",
    previewType: "scroll-story",
    complexity: "hard",
  },
  {
    nameKo: "갤러리형 레이아웃",
    nameEn: "Gallery Layout",
    category: "비주얼 중심 레이아웃",
    summary: "작품이나 이미지를 탐색하고 확대해 보는 흐름에 맞춥니다.",
    previewType: "card-grid",
    complexity: "medium",
  },
  {
    nameKo: "쇼케이스 레이아웃",
    nameEn: "Showcase Layout",
    category: "비주얼 중심 레이아웃",
    summary: "대표 결과물이나 제품을 중심에 놓고 보조 정보를 주변에 배치합니다.",
    previewType: "split-screen",
    complexity: "medium",
  },

  {
    nameKo: "카드 그리드 레이아웃",
    nameEn: "Card Grid Layout",
    category: "그리드 기반 레이아웃",
    summary: "동일한 형태의 콘텐츠 카드를 규칙적으로 배치합니다.",
    previewType: "card-grid",
    complexity: "easy",
  },
  {
    nameKo: "12컬럼 그리드",
    nameEn: "12 Column Grid",
    category: "그리드 기반 레이아웃",
    summary: "세밀한 컬럼 시스템으로 다양한 섹션 폭을 일관되게 관리합니다.",
    previewType: "card-grid",
    complexity: "medium",
  },
  {
    nameKo: "모듈러 그리드",
    nameEn: "Modular Grid",
    category: "그리드 기반 레이아웃",
    summary: "행과 열 단위 모듈을 반복해 복잡한 정보를 질서 있게 배치합니다.",
    previewType: "bento-grid",
    complexity: "medium",
  },
  {
    nameKo: "벤토 그리드",
    nameEn: "Bento Grid",
    category: "그리드 기반 레이아웃",
    summary: "크기가 다른 타일로 주요 기능과 보조 정보를 한 화면에 보여줍니다.",
    previewType: "bento-grid",
    complexity: "medium",
  },
  {
    nameKo: "매거진 그리드",
    nameEn: "Magazine Grid",
    category: "그리드 기반 레이아웃",
    summary: "기사 중요도에 따라 카드 크기와 배치를 달리하는 편집형 구조입니다.",
    previewType: "editorial",
    complexity: "hard",
  },
  {
    nameKo: "타일 레이아웃",
    nameEn: "Tile Layout",
    category: "그리드 기반 레이아웃",
    summary: "동일 크기 타일을 촘촘히 배치해 선택지를 빠르게 비교하게 합니다.",
    previewType: "card-grid",
    complexity: "easy",
  },
  {
    nameKo: "비대칭 그리드",
    nameEn: "Asymmetric Grid",
    category: "그리드 기반 레이아웃",
    summary: "균형을 유지하면서도 일부 요소의 크기와 위치를 비틀어 주목도를 만듭니다.",
    previewType: "bento-grid",
    complexity: "hard",
  },

  {
    nameKo: "상단 내비게이션 레이아웃",
    nameEn: "Top Navigation Layout",
    category: "내비게이션 중심 레이아웃",
    summary: "주요 메뉴를 상단에 고정해 가장 익숙한 탐색 흐름을 제공합니다.",
    previewType: "hero",
    complexity: "easy",
  },
  {
    nameKo: "좌측 사이드바 레이아웃",
    nameEn: "Left Sidebar Layout",
    category: "내비게이션 중심 레이아웃",
    summary: "깊은 메뉴 구조나 앱 기능을 좌측 탐색으로 안정적으로 제공합니다.",
    previewType: "docs",
    complexity: "medium",
  },
  {
    nameKo: "하단 탭 레이아웃",
    nameEn: "Bottom Tab Layout",
    category: "내비게이션 중심 레이아웃",
    summary: "모바일 핵심 메뉴를 엄지 영역에 배치해 반복 이동을 쉽게 합니다.",
    previewType: "feed",
    complexity: "medium",
  },
  {
    nameKo: "햄버거 메뉴 레이아웃",
    nameEn: "Hamburger Menu Layout",
    category: "내비게이션 중심 레이아웃",
    summary: "보조 메뉴를 접어 화면을 단순하게 유지합니다.",
    previewType: "single-column",
    complexity: "medium",
  },
  {
    nameKo: "메가메뉴 레이아웃",
    nameEn: "Mega Menu Layout",
    category: "내비게이션 중심 레이아웃",
    summary: "많은 메뉴를 큰 드롭다운 패널 안에서 구조화합니다.",
    previewType: "three-column",
    complexity: "hard",
  },
  {
    nameKo: "스티키 내비게이션",
    nameEn: "Sticky Navigation",
    category: "내비게이션 중심 레이아웃",
    summary: "스크롤 중에도 주요 이동과 CTA가 사라지지 않게 합니다.",
    previewType: "hero",
    complexity: "medium",
  },
  {
    nameKo: "앵커 내비게이션",
    nameEn: "Anchor Navigation",
    category: "내비게이션 중심 레이아웃",
    summary: "긴 페이지의 섹션 이동을 빠르게 돕는 목차형 탐색 구조입니다.",
    previewType: "docs",
    complexity: "medium",
  },
  {
    nameKo: "탭 기반 레이아웃",
    nameEn: "Tab Based Layout",
    category: "내비게이션 중심 레이아웃",
    summary: "동일한 화면 안에서 관련 콘텐츠 묶음을 빠르게 전환합니다.",
    previewType: "dashboard",
    complexity: "medium",
  },

  {
    nameKo: "블로그형 레이아웃",
    nameEn: "Blog Layout",
    category: "콘텐츠 중심 레이아웃",
    summary: "글 목록과 본문 읽기에 최적화된 콘텐츠 발행 구조입니다.",
    previewType: "editorial",
    complexity: "easy",
  },
  {
    nameKo: "뉴스형 레이아웃",
    nameEn: "News Layout",
    category: "콘텐츠 중심 레이아웃",
    summary: "속보, 주요 기사, 카테고리 기사를 우선순위별로 배치합니다.",
    previewType: "editorial",
    complexity: "hard",
  },
  {
    nameKo: "에디토리얼 레이아웃",
    nameEn: "Editorial Layout",
    category: "콘텐츠 중심 레이아웃",
    summary: "타이포그래피와 여백으로 긴 글의 읽기 경험을 설계합니다.",
    previewType: "editorial",
    complexity: "medium",
  },
  {
    nameKo: "문서형 레이아웃",
    nameEn: "Documentation Layout",
    category: "콘텐츠 중심 레이아웃",
    summary: "목차, 본문, 코드 예시가 함께 필요한 지식 문서에 적합합니다.",
    previewType: "docs",
    complexity: "medium",
  },
  {
    nameKo: "FAQ 레이아웃",
    nameEn: "FAQ Layout",
    category: "콘텐츠 중심 레이아웃",
    summary: "질문과 답변을 빠르게 찾고 펼쳐보는 구조입니다.",
    previewType: "single-column",
    complexity: "easy",
  },
  {
    nameKo: "리스트형 레이아웃",
    nameEn: "List Layout",
    category: "콘텐츠 중심 레이아웃",
    summary: "반복 항목을 행 단위로 정렬해 빠른 스캔과 선택을 돕습니다.",
    previewType: "feed",
    complexity: "easy",
  },
  {
    nameKo: "디렉토리형 레이아웃",
    nameEn: "Directory Layout",
    category: "콘텐츠 중심 레이아웃",
    summary: "많은 항목을 필터와 카테고리로 탐색하게 하는 구조입니다.",
    previewType: "card-grid",
    complexity: "medium",
  },
  {
    nameKo: "아카이브 레이아웃",
    nameEn: "Archive Layout",
    category: "콘텐츠 중심 레이아웃",
    summary: "오래된 콘텐츠를 날짜, 주제, 유형별로 찾아볼 수 있게 합니다.",
    previewType: "timeline",
    complexity: "medium",
  },

  {
    nameKo: "상품 그리드 레이아웃",
    nameEn: "Product Grid Layout",
    category: "커머스 레이아웃",
    summary: "여러 상품을 빠르게 탐색하고 비교하는 기본 커머스 구조입니다.",
    previewType: "card-grid",
    complexity: "medium",
  },
  {
    nameKo: "상품 상세 레이아웃",
    nameEn: "Product Detail Layout",
    category: "커머스 레이아웃",
    summary: "상품 정보와 구매 CTA를 한 흐름 안에서 설득합니다.",
    previewType: "ecommerce-product",
    complexity: "medium",
  },
  {
    nameKo: "필터 사이드바 레이아웃",
    nameEn: "Filter Sidebar Layout",
    category: "커머스 레이아웃",
    summary: "상품 목록 옆에 조건 필터를 고정해 대량 탐색을 돕습니다.",
    previewType: "two-column",
    complexity: "medium",
  },
  {
    nameKo: "룩북 레이아웃",
    nameEn: "Lookbook Layout",
    category: "커머스 레이아웃",
    summary: "상품을 스타일 장면으로 보여줘 브랜드 감성과 구매 욕구를 연결합니다.",
    previewType: "split-screen",
    complexity: "hard",
  },
  {
    nameKo: "컬렉션 레이아웃",
    nameEn: "Collection Layout",
    category: "커머스 레이아웃",
    summary: "시즌, 테마, 브랜드별 상품 묶음을 스토리처럼 탐색하게 합니다.",
    previewType: "bento-grid",
    complexity: "medium",
  },
  {
    nameKo: "추천 상품 레이아웃",
    nameEn: "Recommended Products Layout",
    category: "커머스 레이아웃",
    summary: "개인화 또는 맥락 기반 추천을 카드 그룹으로 제시합니다.",
    previewType: "card-grid",
    complexity: "medium",
  },
  {
    nameKo: "장바구니 레이아웃",
    nameEn: "Cart Layout",
    category: "커머스 레이아웃",
    summary: "선택 상품, 가격, 배송, 결제 진입을 명확히 정리합니다.",
    previewType: "two-column",
    complexity: "medium",
  },
  {
    nameKo: "가격 비교 레이아웃",
    nameEn: "Price Comparison Layout",
    category: "커머스 레이아웃",
    summary: "가격과 혜택 차이를 표로 정리해 구매 판단을 빠르게 만듭니다.",
    previewType: "comparison",
    complexity: "medium",
  },

  {
    nameKo: "SaaS 랜딩 레이아웃",
    nameEn: "SaaS Landing Layout",
    category: "SaaS / 서비스 웹 레이아웃",
    summary: "제품 가치, 기능, 신뢰 요소, CTA를 한 흐름으로 연결합니다.",
    previewType: "hero",
    complexity: "medium",
  },
  {
    nameKo: "프로덕트 데모 레이아웃",
    nameEn: "Product Demo Layout",
    category: "SaaS / 서비스 웹 레이아웃",
    summary: "실제 사용 흐름을 미리 보여줘 제품 이해를 빠르게 만듭니다.",
    previewType: "split-screen",
    complexity: "hard",
  },
  {
    nameKo: "대시보드 레이아웃",
    nameEn: "Dashboard Layout",
    category: "SaaS / 서비스 웹 레이아웃",
    summary: "상태, 지표, 작업 리스트를 반복 사용에 맞게 정리합니다.",
    previewType: "dashboard",
    complexity: "hard",
  },
  {
    nameKo: "온보딩 레이아웃",
    nameEn: "Onboarding Layout",
    category: "SaaS / 서비스 웹 레이아웃",
    summary: "새 사용자가 목표 설정과 첫 행동을 순서대로 완료하게 돕습니다.",
    previewType: "timeline",
    complexity: "medium",
  },
  {
    nameKo: "기능 비교 레이아웃",
    nameEn: "Feature Comparison Layout",
    category: "SaaS / 서비스 웹 레이아웃",
    summary: "요금제나 기능 차이를 기준별로 명확하게 비교합니다.",
    previewType: "comparison",
    complexity: "medium",
  },
  {
    nameKo: "케이스스터디 레이아웃",
    nameEn: "Case Study Layout",
    category: "SaaS / 서비스 웹 레이아웃",
    summary: "문제, 적용 과정, 결과 수치를 이야기와 증거로 보여줍니다.",
    previewType: "editorial",
    complexity: "medium",
  },
  {
    nameKo: "데이터 중심 레이아웃",
    nameEn: "Data Centric Layout",
    category: "SaaS / 서비스 웹 레이아웃",
    summary: "차트, 지표, 테이블을 중심으로 분석과 판단을 지원합니다.",
    previewType: "dashboard",
    complexity: "hard",
  },
  {
    nameKo: "API 문서 레이아웃",
    nameEn: "API Documentation Layout",
    category: "SaaS / 서비스 웹 레이아웃",
    summary: "개발자가 개념, 엔드포인트, 예시 코드를 빠르게 찾게 합니다.",
    previewType: "docs",
    complexity: "hard",
  },

  {
    nameKo: "프로젝트 카드형",
    nameEn: "Project Card Portfolio",
    category: "포트폴리오 레이아웃",
    summary: "프로젝트를 카드 단위로 정리해 빠른 훑기와 상세 이동을 지원합니다.",
    previewType: "card-grid",
    complexity: "easy",
  },
  {
    nameKo: "케이스스터디형",
    nameEn: "Case Study Portfolio",
    category: "포트폴리오 레이아웃",
    summary: "작업 배경, 역할, 과정, 결과를 깊이 있게 설명합니다.",
    previewType: "editorial",
    complexity: "medium",
  },
  {
    nameKo: "갤러리형",
    nameEn: "Gallery Portfolio",
    category: "포트폴리오 레이아웃",
    summary: "시각 결과물을 중심으로 빠르게 인상을 전달합니다.",
    previewType: "card-grid",
    complexity: "medium",
  },
  {
    nameKo: "원페이지 포트폴리오",
    nameEn: "One Page Portfolio",
    category: "포트폴리오 레이아웃",
    summary: "소개, 프로젝트, 연락처를 한 페이지 안에서 간결하게 연결합니다.",
    previewType: "single-column",
    complexity: "easy",
  },
  {
    nameKo: "타임라인형",
    nameEn: "Timeline Portfolio",
    category: "포트폴리오 레이아웃",
    summary: "경력과 프로젝트 변화를 시간 흐름으로 보여줍니다.",
    previewType: "timeline",
    complexity: "medium",
  },
  {
    nameKo: "비대칭 포트폴리오",
    nameEn: "Asymmetric Portfolio",
    category: "포트폴리오 레이아웃",
    summary: "불균형한 배치로 개성과 시각적 긴장감을 만듭니다.",
    previewType: "bento-grid",
    complexity: "hard",
  },
  {
    nameKo: "미니멀 포트폴리오",
    nameEn: "Minimal Portfolio",
    category: "포트폴리오 레이아웃",
    summary: "적은 요소와 넓은 여백으로 작업물 자체에 집중시킵니다.",
    previewType: "single-column",
    complexity: "easy",
  },
  {
    nameKo: "인터랙티브 포트폴리오",
    nameEn: "Interactive Portfolio",
    category: "포트폴리오 레이아웃",
    summary: "탐색과 상호작용을 통해 작업자의 개성과 역량을 경험하게 합니다.",
    previewType: "scroll-story",
    complexity: "hard",
  },

  {
    nameKo: "브루탈리스트 레이아웃",
    nameEn: "Brutalist Layout",
    category: "실험적 / 트렌디한 레이아웃",
    summary: "거친 대비와 노출된 구조로 강한 태도를 전달합니다.",
    previewType: "hero",
    complexity: "hard",
  },
  {
    nameKo: "안티 레이아웃",
    nameEn: "Anti Layout",
    category: "실험적 / 트렌디한 레이아웃",
    summary: "전통적인 정렬과 균형을 의도적으로 깨며 주목을 만듭니다.",
    previewType: "split-screen",
    complexity: "hard",
  },
  {
    nameKo: "오버랩 레이아웃",
    nameEn: "Overlap Layout",
    category: "실험적 / 트렌디한 레이아웃",
    summary: "요소를 겹쳐 깊이감과 편집적인 긴장감을 만듭니다.",
    previewType: "bento-grid",
    complexity: "hard",
  },
  {
    nameKo: "스크롤텔링 레이아웃",
    nameEn: "Scrolltelling Layout",
    category: "실험적 / 트렌디한 레이아웃",
    summary: "스크롤 진행에 따라 이야기가 단계적으로 펼쳐집니다.",
    previewType: "scroll-story",
    complexity: "hard",
  },
  {
    nameKo: "패럴랙스 레이아웃",
    nameEn: "Parallax Layout",
    category: "실험적 / 트렌디한 레이아웃",
    summary: "레이어별 이동 속도 차이로 깊이감과 몰입감을 만듭니다.",
    previewType: "scroll-story",
    complexity: "hard",
  },
  {
    nameKo: "가로 스크롤 레이아웃",
    nameEn: "Horizontal Scroll Layout",
    category: "실험적 / 트렌디한 레이아웃",
    summary: "좌우 이동을 통해 전시나 단계형 콘텐츠를 색다르게 보여줍니다.",
    previewType: "card-grid",
    complexity: "hard",
  },
  {
    nameKo: "무한 캔버스 레이아웃",
    nameEn: "Infinite Canvas Layout",
    category: "실험적 / 트렌디한 레이아웃",
    summary: "고정된 페이지 경계 대신 자유로운 공간 탐색 경험을 제공합니다.",
    previewType: "map-list",
    complexity: "hard",
  },
  {
    nameKo: "3D 공간형 레이아웃",
    nameEn: "3D Spatial Layout",
    category: "실험적 / 트렌디한 레이아웃",
    summary: "깊이와 원근감을 활용해 콘텐츠를 공간처럼 배치합니다.",
    previewType: "hero",
    complexity: "hard",
  },
  {
    nameKo: "인터랙티브 맵 레이아웃",
    nameEn: "Interactive Map Layout",
    category: "실험적 / 트렌디한 레이아웃",
    summary: "지도나 공간 캔버스를 중심으로 탐색과 발견을 유도합니다.",
    previewType: "map-list",
    complexity: "hard",
  },
  {
    nameKo: "커서 인터랙션 레이아웃",
    nameEn: "Cursor Interaction Layout",
    category: "실험적 / 트렌디한 레이아웃",
    summary: "커서 움직임을 피드백 요소로 삼아 조작감을 강화합니다.",
    previewType: "split-screen",
    complexity: "hard",
  },

  {
    nameKo: "피드형 레이아웃",
    nameEn: "Feed Layout",
    category: "모바일 웹 / 앱형 레이아웃",
    summary: "짧은 콘텐츠를 연속적으로 소비하도록 설계한 모바일 중심 구조입니다.",
    previewType: "feed",
    complexity: "medium",
  },
  {
    nameKo: "카드 스와이프 레이아웃",
    nameEn: "Card Swipe Layout",
    category: "모바일 웹 / 앱형 레이아웃",
    summary: "하나의 카드에 집중하고 좌우 제스처로 다음 선택지를 넘깁니다.",
    previewType: "feed",
    complexity: "hard",
  },
  {
    nameKo: "하단 탭바 레이아웃",
    nameEn: "Bottom Tabbar Layout",
    category: "모바일 웹 / 앱형 레이아웃",
    summary: "핵심 기능을 하단에 고정해 모바일 반복 이동을 빠르게 만듭니다.",
    previewType: "feed",
    complexity: "medium",
  },
  {
    nameKo: "채팅형 레이아웃",
    nameEn: "Chat Layout",
    category: "모바일 웹 / 앱형 레이아웃",
    summary: "대화 단위로 정보를 주고받는 인터페이스에 맞춘 구조입니다.",
    previewType: "feed",
    complexity: "medium",
  },
  {
    nameKo: "스텝 플로우 레이아웃",
    nameEn: "Step Flow Layout",
    category: "모바일 웹 / 앱형 레이아웃",
    summary: "작은 화면에서 복잡한 입력을 단계별로 나누어 완료하게 합니다.",
    previewType: "timeline",
    complexity: "medium",
  },
  {
    nameKo: "검색 중심 레이아웃",
    nameEn: "Search First Layout",
    category: "모바일 웹 / 앱형 레이아웃",
    summary: "검색창과 결과 피드가 화면의 중심이 되는 탐색 구조입니다.",
    previewType: "feed",
    complexity: "medium",
  },
  {
    nameKo: "지도 중심 레이아웃",
    nameEn: "Map First Layout",
    category: "모바일 웹 / 앱형 레이아웃",
    summary: "위치 기반 탐색에서 지도와 주변 결과를 함께 보여줍니다.",
    previewType: "map-list",
    complexity: "hard",
  },
  {
    nameKo: "숏폼형 레이아웃",
    nameEn: "Short Form Layout",
    category: "모바일 웹 / 앱형 레이아웃",
    summary: "한 화면 한 콘텐츠 소비를 전제로 하는 몰입형 모바일 구조입니다.",
    previewType: "feed",
    complexity: "hard",
  },

  {
    nameKo: "Z 패턴 레이아웃",
    nameEn: "Z Pattern Layout",
    category: "정보 구조별 레이아웃",
    summary: "시선을 좌상단에서 우하단으로 흐르게 해 CTA 도달을 유도합니다.",
    previewType: "hero",
    complexity: "easy",
  },
  {
    nameKo: "F 패턴 레이아웃",
    nameEn: "F Pattern Layout",
    category: "정보 구조별 레이아웃",
    summary: "사용자의 빠른 훑기 습관에 맞춰 제목과 핵심 정보를 좌측에 정렬합니다.",
    previewType: "editorial",
    complexity: "easy",
  },
  {
    nameKo: "피라미드 레이아웃",
    nameEn: "Pyramid Layout",
    category: "정보 구조별 레이아웃",
    summary: "가장 중요한 정보를 먼저 제시하고 점차 세부 내용으로 내려갑니다.",
    previewType: "single-column",
    complexity: "easy",
  },
  {
    nameKo: "계층형 레이아웃",
    nameEn: "Hierarchical Layout",
    category: "정보 구조별 레이아웃",
    summary: "중요도에 따라 크기, 위치, 간격을 달리해 정보 우선순위를 드러냅니다.",
    previewType: "bento-grid",
    complexity: "medium",
  },
  {
    nameKo: "허브 앤 스포크",
    nameEn: "Hub and Spoke Layout",
    category: "정보 구조별 레이아웃",
    summary: "중앙 허브에서 여러 세부 페이지로 뻗어나가는 탐색 구조입니다.",
    previewType: "card-grid",
    complexity: "medium",
  },
  {
    nameKo: "위저드 레이아웃",
    nameEn: "Wizard Layout",
    category: "정보 구조별 레이아웃",
    summary: "복잡한 과정을 단계로 나눠 사용자가 하나씩 완료하게 합니다.",
    previewType: "timeline",
    complexity: "medium",
  },
  {
    nameKo: "검색 결과 레이아웃",
    nameEn: "Search Results Layout",
    category: "정보 구조별 레이아웃",
    summary: "쿼리, 필터, 정렬, 결과 목록을 빠르게 조작하게 합니다.",
    previewType: "two-column",
    complexity: "medium",
  },
  {
    nameKo: "비교 중심 레이아웃",
    nameEn: "Comparison Focused Layout",
    category: "정보 구조별 레이아웃",
    summary: "대상 간 차이와 선택 기준을 중심으로 정보를 배열합니다.",
    previewType: "comparison",
    complexity: "medium",
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}

function buildLayout(seed: LayoutSeed): WebLayout {
  const category = categoryGuides[seed.category];
  const preview = previewGuides[seed.previewType];
  const bestFor = seed.bestFor ?? category.defaultBestFor;
  const notGoodFor = seed.notGoodFor ?? category.defaultNotGoodFor;

  return {
    slug: slugify(seed.nameEn),
    nameKo: seed.nameKo,
    nameEn: seed.nameEn,
    category: seed.category,
    summary: seed.summary,
    description: `${seed.nameKo}은(는) ${category.role} ${seed.summary} 실제 설계에서는 콘텐츠 우선순위, 사용자의 탐색 의도, 모바일 전환 방식을 함께 결정해야 완성도가 높아집니다.`,
    structure: preview.structure,
    bestFor,
    notGoodFor,
    pros: [
      "구조가 명확해 사용자가 다음에 볼 영역을 예측하기 쉽습니다.",
      `${bestFor[0]} 같은 목적에서 핵심 정보와 행동을 빠르게 연결합니다.`,
      "컴포넌트 단위로 나누면 유지보수와 재사용이 수월합니다.",
    ],
    cons: [
      "콘텐츠 우선순위가 흐리면 같은 구조라도 산만하게 느껴질 수 있습니다.",
      `${notGoodFor[0]}에는 정보 흐름이나 조작 방식이 맞지 않을 수 있습니다.`,
      "반응형 전환 규칙을 늦게 정하면 모바일에서 구조가 쉽게 무너집니다.",
    ],
    responsiveBehavior: preview.responsive,
    accessibilityNotes: [
      "시각적 배치와 DOM 읽기 순서가 같은 흐름을 갖도록 구성합니다.",
      "클릭 가능한 요소는 button 또는 a 요소로 만들고 focus-visible 상태를 제공합니다.",
      "색상만으로 섹션 상태를 구분하지 말고 텍스트 라벨이나 구조적 heading을 함께 둡니다.",
    ],
    implementationTips: preview.tips,
    complexity: seed.complexity,
    tags: unique([
      ...(seed.tags ?? []),
      ...category.defaultTags,
      seed.previewType,
      seed.complexity,
    ]),
    related: [],
    previewType: seed.previewType,
  };
}

const layoutsWithoutRelated = layoutSeeds.map(buildLayout);

function findRelated(layout: WebLayout) {
  return layoutsWithoutRelated
    .filter((candidate) => candidate.slug !== layout.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.previewType === layout.previewType) score += 3;
      if (candidate.category === layout.category) score += 2;
      if (candidate.complexity === layout.complexity) score += 1;
      score += candidate.tags.filter((tag) => layout.tags.includes(tag)).length;

      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || a.candidate.nameKo.localeCompare(b.candidate.nameKo))
    .slice(0, 3)
    .map(({ candidate }) => candidate.slug);
}

export const webLayouts: WebLayout[] = layoutsWithoutRelated.map((layout) => ({
  ...layout,
  related: findRelated(layout),
}));

export const webLayoutCategories = Object.keys(categoryGuides);

export const webLayoutPurposes = unique(
  webLayouts.flatMap((layout) => layout.bestFor),
).sort((a, b) => a.localeCompare(b));

export const previewTypes = unique(webLayouts.map((layout) => layout.previewType));

export function getLayoutBySlug(slug: string) {
  return webLayouts.find((layout) => layout.slug === slug);
}

export function getLayoutsBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getLayoutBySlug(slug))
    .filter((layout): layout is WebLayout => Boolean(layout));
}

export function getLayoutsByCategory(category: string) {
  return webLayouts.filter((layout) => layout.category === category);
}
