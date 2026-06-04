export type ComponentSpecType = "button" | "card" | "nav" | "input" | "badge";

export type ComponentSpec = {
  slug: string;
  nameKo: string;
  nameEn: string;
  type: ComponentSpecType;
  summary: string;
};

export const componentSpecs: ComponentSpec[] = [
  {
    slug: "button",
    nameKo: "버튼",
    nameEn: "Button",
    type: "button",
    summary: "주요 행동을 유도하는 클릭 요소입니다.",
  },
  {
    slug: "card",
    nameKo: "카드",
    nameEn: "Card",
    type: "card",
    summary: "반복 콘텐츠를 묶어 비교 가능하게 보여줍니다.",
  },
  {
    slug: "nav",
    nameKo: "내비게이션",
    nameEn: "Navigation",
    type: "nav",
    summary: "페이지 이동과 현재 구조를 보여줍니다.",
  },
  {
    slug: "input",
    nameKo: "입력 필드",
    nameEn: "Input",
    type: "input",
    summary: "검색과 폼 입력을 받는 기본 컨트롤입니다.",
  },
  {
    slug: "badge",
    nameKo: "배지",
    nameEn: "Badge",
    type: "badge",
    summary: "상태, 카테고리, 짧은 메타 정보를 표시합니다.",
  },
];
