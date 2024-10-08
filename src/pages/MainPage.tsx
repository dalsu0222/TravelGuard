import { useState, useMemo, useCallback } from "react";
import Search from "../components/common/Search";
import * as G from "../styles/GlobalStyle";
import * as M from "../styles/MainpageStyle";
import ColorBadge from "../components/common/ColorBadge";
import { useCountriesData } from "../utils/hooks/useCountriesData";
import {
  continentMap,
  wbRegionMap,
  subregionMap,
} from "../utils/constant/regionsMap";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [selectedLevel, setSelectedLevel] = useState(-1);
  const { data: countriesData, isLoading, error } = useCountriesData();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getLevelColor = (level: string | null): 0 | 1 | 2 | 3 | 4 => {
    if (level === null || level === "없음" || level.startsWith("0단계"))
      return 0;
    if (level.startsWith("1단계")) return 1;
    if (level.startsWith("2단계")) return 2;
    if (level.startsWith("3단계")) return 3;
    if (level.startsWith("4단계")) return 4;
    return 0;
  };

  const getNumericLevel = (level: string | null): number => {
    if (level === null || level === "없음" || level.startsWith("0단계"))
      return 0;
    if (level.startsWith("1단계")) return 1;
    if (level.startsWith("2단계")) return 2;
    if (level.startsWith("3단계")) return 3;
    if (level.startsWith("4단계")) return 4;
    return 0;
  };

  const filteredCountries = useMemo(() => {
    if (!countriesData || !countriesData.features) return [];

    const filtered = countriesData.features.filter((country) => {
      const level = country.properties.travelAdvisoryLevel;
      const numericLevel = getNumericLevel(level ?? null);
      const matchesLevel =
        selectedLevel === -1 || numericLevel === selectedLevel;

      const countryName = String(
        country.properties.country_nm ?? ""
      ).toLowerCase();
      const regionUN = String(country.properties.REGION_UN ?? "").toLowerCase();
      const regionWB = String(country.properties.REGION_WB ?? "").toLowerCase();
      const subregion = String(
        country.properties.SUBREGION ?? ""
      ).toLowerCase();

      // 한글 대륙 이름 -> 영어로 변환
      const englishSearchTerm =
        continentMap[searchTerm] ||
        wbRegionMap[searchTerm] ||
        subregionMap[searchTerm] ||
        searchTerm;

      // 대륙이름과 정확히 일치하거나 or 일부 포함하는 경우 검색결과로 제공
      const matchesSearch =
        countryName.includes(searchTerm.toLowerCase()) ||
        regionUN.includes(englishSearchTerm.toLowerCase()) ||
        regionWB.includes(englishSearchTerm.toLowerCase()) ||
        subregion.includes(englishSearchTerm.toLowerCase()) ||
        Object.keys(continentMap).some(
          (continent) =>
            continent.toLowerCase().includes(searchTerm.toLowerCase()) &&
            regionUN === continentMap[continent].toLowerCase()
        ) ||
        Object.keys(wbRegionMap).some(
          (region) =>
            region.toLowerCase().includes(searchTerm.toLowerCase()) &&
            regionWB === wbRegionMap[region].toLowerCase()
        ) ||
        Object.keys(subregionMap).some(
          (subregionName) =>
            subregionName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            subregion === subregionMap[subregionName].toLowerCase()
        );

      return matchesLevel && matchesSearch;
    });

    // ㄱㄴㄷ순으로 제공
    return filtered.sort((a, b) =>
      String(a.properties.country_nm).localeCompare(
        String(b.properties.country_nm),
        "ko"
      )
    );
  }, [countriesData, selectedLevel, searchTerm]);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const goToDetail = (country: string) => {
    navigate(`/${country}`);
  };

  return (
    <G.Container>
      <G.mw>
        <G.ResponsiveHeading>국가/지역별 정보</G.ResponsiveHeading>
        <G.ResponsiveParagraph>
          국가/지역별 현지 연락처, 사건 사고정보, 문화 등 다양한 정보를
          제공합니다.
        </G.ResponsiveParagraph>

        <M.Box style={{ marginTop: 16 }}>
          <Search onSearch={handleSearch} />
        </M.Box>
        <M.TabsContainer2 style={{ marginTop: 16 }}>
          {[
            { key: -1, label: "전체", color: "none" },
            { key: 0, label: "0단계 여행경보 없음", color: 0 },
            { key: 1, label: "1단계 여행유의", color: 1 },
            { key: 2, label: "2단계 여행자제", color: 2 },
            { key: 3, label: "3단계 출국권고", color: 3 },
            { key: 4, label: "4단계 여행금지", color: 4 },
          ].map((tab) => (
            <M.Tab2
              key={tab.key}
              className={selectedLevel === tab.key ? "active" : ""}
              onClick={() => setSelectedLevel(tab.key)}
            >
              {tab.key >= 0 ? (
                <ColorBadge number={tab.color as 0 | 1 | 2 | 3 | 4} />
              ) : (
                ""
              )}
              {tab.label}
            </M.Tab2>
          ))}
        </M.TabsContainer2>
        <M.Box style={{ marginTop: 16 }} className="scroll">
          {isLoading && <p>로딩 중...</p>}
          {error && <p>에러: {String(error)}</p>}
          {!isLoading && !error && countriesData && (
            <M.GridUl>
              {filteredCountries.map((country) => (
                <M.Li
                  key={`${country.properties.ISO_A2}-${country.properties.ADMIN}`}
                  onClick={() => goToDetail(country.properties.country_nm)}
                >
                  <ColorBadge
                    number={getLevelColor(
                      country.properties.travelAdvisoryLevel ?? "null"
                    )}
                  />

                  {country.properties.country_nm}
                </M.Li>
              ))}
            </M.GridUl>
          )}
        </M.Box>
      </G.mw>
    </G.Container>
  );
}
