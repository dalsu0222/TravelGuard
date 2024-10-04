// 검색 기능 관련 로직 정리
import { useState, useCallback, useRef } from "react";
import { GeoJsonFeature } from "../types/geoTypes";
import { getPolygonLabel } from "../globeConfig";

interface UseGlobeSearchProps {
  countriesData: {
    features: GeoJsonFeature[];
  } | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globeRef: React.MutableRefObject<any>;
}

const calculatePolygonArea = (polygon: [number, number][][]): number => {
  let area = 0;
  for (let i = 0; i < polygon[0].length; i++) {
    const j = (i + 1) % polygon[0].length;
    area += polygon[0][i][0] * polygon[0][j][1];
    area -= polygon[0][j][0] * polygon[0][i][1];
  }
  return Math.abs(area / 2);
};

const calculateArea = (coordinates: number[][] | number[][][]): number => {
  if (coordinates.length === 0) return 0;

  if (typeof coordinates[0][0] === "number") {
    return calculatePolygonArea(coordinates as [number, number][][]);
  } else {
    return (coordinates as number[][][]).reduce((totalArea, polygon) => {
      return (
        totalArea +
        calculatePolygonArea(polygon as unknown as [number, number][][])
      );
    }, 0);
  }
};

const getAltitudeForCountry = (country: GeoJsonFeature): number => {
  const area = calculateArea(
    country.geometry.coordinates as number[][] | number[][][]
  );
  if (area < 5) return 0.5;
  if (area < 10) return 0.6;
  if (area < 100) return 0.7;
  return 0.9;
};

const calculateCentroid = (coordinates: number[][][]): [number, number] => {
  let sumLat = 0;
  let sumLng = 0;
  let count = 0;

  function processCoordinates(coords: number[][] | number[][][]) {
    coords.forEach((coord) => {
      if (Array.isArray(coord[0])) {
        processCoordinates(coord as number[][]);
      } else {
        sumLng += coord[0] as number;
        sumLat += coord[1] as number;
        count++;
      }
    });
  }

  processCoordinates(coordinates);

  if (count === 0) {
    console.error("No valid coordinates found");
    return [0, 0];
  }

  return [
    Number((sumLng / count).toFixed(6)),
    Number((sumLat / count).toFixed(6)),
  ];
};

export const useGlobeSearch = ({
  countriesData,
  globeRef,
}: UseGlobeSearchProps) => {
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchedCountry, setSearchedCountry] = useState<GeoJsonFeature | null>(
    null
  );
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [customLabel, setCustomLabel] = useState<{
    html: string;
    position: [number, number];
  } | null>(null);
  const searchTimerRef = useRef<number | null>(null);

  const handleSearch = useCallback(
    (countryName: string) => {
      if (!countriesData || !globeRef.current) return;

      const country = countriesData.features.find(
        (feature: GeoJsonFeature) =>
          feature.properties.country_nm === countryName
      );

      if (country) {
        setSearchError(null);
        const [centerLng, centerLat] = calculateCentroid(
          Array.isArray(country.geometry.coordinates[0][0])
            ? (country.geometry.coordinates as number[][][])
            : [country.geometry.coordinates as number[][]]
        );
        if (centerLat !== 0 && centerLng !== 0) {
          const altitude = getAltitudeForCountry(country);
          globeRef.current.pointOfView(
            { lat: centerLat, lng: centerLng, altitude },
            1000
          );
          setSearchedCountry(country);
          setIsSearchMode(true);

          setCustomLabel({
            html: getPolygonLabel(country),
            position: [centerLng, centerLat],
          });

          if (searchTimerRef.current !== null) {
            window.clearTimeout(searchTimerRef.current);
          }

          searchTimerRef.current = window.setTimeout(() => {
            setIsSearchMode(false);
            setSearchedCountry(null);
            setCustomLabel(null);
            searchTimerRef.current = null;
          }, 5000);
        } else {
          setSearchError("국가의 좌표를 계산할 수 없습니다.");
        }
      } else {
        setSearchError("검색된 국가가 없습니다.");
      }
    },
    [countriesData, globeRef]
  );

  const handleInputChange = useCallback(() => {
    setSearchError(null);
  }, []);

  return {
    searchError,
    searchedCountry,
    isSearchMode,
    customLabel,
    handleSearch,
    handleInputChange,
  };
};
