export const countryNameMapping: { [key: string]: string } = {
  Antarctica: "남극",
  "French Southern and Antarctic Lands": "프랑스령 남방 및 남극",
  "Northern Cyprus": "북키프로스",
  "Falkland Islands": "포클랜드 제도",
  Greenland: "그린란드",
  "South Korea": "대한민국",
  Kosovo: "코소보",
  "New Caledonia": "뉴칼레도니아",
  "Puerto Rico": "푸에르토리코",
  "North Korea": "조선민주주의인민공화국",
  "Western Sahara": "서사하라",
  Taiwan: "대만",
};

export function getKoreanCountryName(Name: string): string {
  // 가끔씩 영어로 넘어오는 국가이름 매핑처리
  return countryNameMapping[Name] || Name;
}
