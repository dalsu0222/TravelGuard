import * as d3 from "d3";

export const TRAVEL_ADVISORY_LEVELS = [
  { level: "0단계: 경보없음", description: "여행경보가 지정되지 않음" },
  { level: "1단계: 여행유의", description: "신변안전 위험요인 숙지ㆍ대비" },
  {
    level: "2단계: 여행자제",
    description: "(여행예정자) 불필요한 여행 자제",
    additionalInfo: "(체류자) 신변안전 특별유의",
  },
  {
    level: "3단계: 철수권고",
    description: "(여행예정자) 여행 취소ㆍ연기",
    additionalInfo: "(체류자) 긴요한 용무가 아닌 한 출국",
  },
  {
    level: "4단계: 여행금지",
    description: "(여행예정자) 여행금지 준수",
    additionalInfo: "(체류자) 즉시 대피ㆍ철수",
  },
];

export const COLOR_SCALE = d3
  .scaleOrdinal<string, string>()
  .domain([
    // "0단계 경보없음",
    "1단계: 여행유의",
    "2단계: 여행자제",
    "3단계: 철수권고",
    "4단계: 여행금지",
    "없음",
  ])
  // .range(["#8AB5FF", "#80FFCF", "#FFF9A5", "#FF9D82", "#d3d3d3"]);
  .range([
    "rgba(138, 181, 255, 0.85)",
    "rgba(128, 255, 207, 0.85)",
    "rgba(255, 249, 165, 0.85)",
    "rgba(255, 157, 130, 0.85)",
    "rgba(211, 211, 211, 0.85)",
  ]);
