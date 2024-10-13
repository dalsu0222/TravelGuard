import React, { useMemo } from "react";
import { useCountriesData } from "../utils/hooks/useCountriesData";
import ColorBadge from "./common/ColorBadge";
import * as M from "../styles/MainpageStyle";
import {
  continentMap,
  wbRegionMap,
  subregionMap,
} from "../utils/constant/regionsMap";

interface CountriesListProps {
  selectedLevel: number;
  searchTerm: string;
  onCountryClick: (country: string) => void;
}

const CountriesList: React.FC<CountriesListProps> = ({
  selectedLevel,
  searchTerm,
  onCountryClick,
}) => {
  const { data: countriesData } = useCountriesData();

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

      const englishSearchTerm =
        continentMap[searchTerm] ||
        wbRegionMap[searchTerm] ||
        subregionMap[searchTerm] ||
        searchTerm;

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

    return filtered.sort((a, b) =>
      String(a.properties.country_nm).localeCompare(
        String(b.properties.country_nm),
        "ko"
      )
    );
  }, [countriesData, selectedLevel, searchTerm]);

  return (
    <M.GridUl>
      {filteredCountries.map((country) => (
        <M.Li
          key={`${country.properties.ISO_A2}-${country.properties.ADMIN}`}
          onClick={() => onCountryClick(country.properties.country_nm)}
        >
          <ColorBadge
            number={getLevelColor(
              country.properties.travelAdvisoryLevel ?? null
            )}
          />
          {country.properties.country_nm}
        </M.Li>
      ))}
    </M.GridUl>
  );
};

export default CountriesList;
