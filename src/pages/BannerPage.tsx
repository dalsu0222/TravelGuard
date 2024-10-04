import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Globe from "react-globe.gl";
import * as G from "../styles/GlobalStyle";
import * as B from "../styles/BannerPageStyle";
import TravelStep from "../components/common/TravelStep";
import SearchBar from "../components/common/SearchBar";
import { useCountriesData } from "../utils/hooks/useCountriesData";
import {
  getPolygonLabel,
  getTravelAdvisoryLevel,
  globeConfig,
} from "../utils/globeConfig";
import { GeoJsonFeature } from "../utils/types/geoTypes";
import {
  TRAVEL_ADVISORY_LEVELS,
  COLOR_SCALE,
} from "../utils/constant/travelAdvisory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const BannerPage: React.FC = () => {
  const [hoverD, setHoverD] = useState<GeoJsonFeature | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>();
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const { data: countriesData, isLoading, error } = useCountriesData();
  const navigate = useNavigate();
  const location = useLocation();
  const [key, setKey] = useState(0);
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

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    setDimensions({ width: innerWidth, height: innerHeight });
  }, []);

  const updateDimensions = useCallback(() => {
    if (globeContainerRef.current) {
      const { offsetWidth, offsetHeight } = globeContainerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [location]);

  useEffect(() => {
    if ((countriesData?.features?.length ?? 0) > 0 && globeRef.current) {
      const setInitialView = () => {
        const isMobile = window.innerWidth <= 1000;
        globeRef.current.pointOfView(
          {
            lat: 35.9078,
            lng: 127.7669,
            altitude: isMobile ? 2.5 : 3,
          },
          4000
        );
      };

      if (globeRef.current.scene) {
        setInitialView();
      } else {
        globeRef.current.onGlobeReady(() => {
          setInitialView();
        });
      }
    }
  }, [countriesData, key]);

  const calculatePolygonArea = (polygon: [number, number][][]): number => {
    // console.log("inner polygon:", polygon);
    // console.log("polygon[0] :", polygon[0]);
    let area = 0;
    for (let i = 0; i < polygon[0].length; i++) {
      const j = (i + 1) % polygon[0].length;
      // console.log(i, j);
      // console.log("i :", polygon[0][i]);
      // console.log("j :", polygon[0][j]);
      area += polygon[0][i][0] * polygon[0][j][1];
      area -= polygon[0][j][0] * polygon[0][i][1];
    }
    return Math.abs(area / 2);
  };

  const calculateArea = useCallback(
    (coordinates: number[][] | number[][][]): number => {
      if (coordinates.length === 0) return 0;

      if (typeof coordinates[0][0] === "number") {
        // 단일 폴리곤 케이스 (number[][])
        return calculatePolygonArea(coordinates as [number, number][][]);
      } else {
        // 멀티폴리곤 케이스 (number[][][])
        return (coordinates as number[][][]).reduce((totalArea, polygon) => {
          console.log(polygon);
          return (
            totalArea +
            calculatePolygonArea(polygon as unknown as [number, number][][])
          );
        }, 0);
      }
    },
    []
  );

  const getAltitudeForCountry = useCallback(
    (country: GeoJsonFeature): number => {
      const area = calculateArea(
        country.geometry.coordinates as number[][] | number[][][]
      );
      console.log(country.properties.ADMIN, area);
      // 면적에 따라 altitude 조정, 면적이 작은 국가일수록 더 확대되어 보임
      if (area < 5) return 0.5;
      if (area < 10) return 0.6;
      if (area < 100) return 0.7;
      return 0.9;
    },
    [calculateArea]
  );

  function calculateCentroid(coordinates: number[][][]): [number, number] {
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
  }

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
          setHoverD(country);
          setIsSearchMode(true);

          // 커스텀 라벨 설정
          setCustomLabel({
            html: getPolygonLabel(country),
            position: [centerLng, centerLat],
          });

          // 이전 타이머가 있다면 취소
          if (searchTimerRef.current !== null) {
            window.clearTimeout(searchTimerRef.current);
          }

          // 새로운 5초 타이머 설정
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
    [countriesData, getAltitudeForCountry]
  );

  const handlePolygonHover = useCallback(
    (polygon: object | null) => {
      if (!isSearchMode) {
        setHoverD(polygon as GeoJsonFeature | null);
      }
    },
    [isSearchMode]
  );

  useEffect(() => {
    if (searchedCountry) {
      const timer = setTimeout(() => {
        setSearchedCountry(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [searchedCountry]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

  const handleInputChange = useCallback(() => {
    setSearchError(null);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <G.Wrap>
      <SearchBar
        onSearch={handleSearch}
        errorContent={searchError}
        onInputChange={handleInputChange}
      />
      <div
        ref={globeContainerRef}
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {dimensions.width > 0 && dimensions.height > 0 && (
          <>
            <Globe
              key={key}
              ref={globeRef}
              width={dimensions.width}
              height={dimensions.height}
              {...globeConfig.globeProps}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              polygonsData={
                countriesData?.features?.filter(
                  (d: GeoJsonFeature) => d.properties.ISO_A2 !== "AQ"
                ) || []
              }
              polygonAltitude={(d: object) => (d === hoverD ? 0.12 : 0.06)}
              polygonCapColor={(d: object) =>
                isSearchMode && d === searchedCountry
                  ? "pink" // Highlight color for searched country
                  : COLOR_SCALE(getTravelAdvisoryLevel(d as GeoJsonFeature))
              }
              polygonLabel={
                isSearchMode
                  ? undefined
                  : (d: object) => getPolygonLabel(d as GeoJsonFeature)
              }
              onPolygonHover={
                isSearchMode
                  ? undefined
                  : (polygon) => handlePolygonHover(polygon)
              }
              onPolygonClick={(polygon: object) => {
                const geoPolygon = polygon as GeoJsonFeature;
                navigate(`/${geoPolygon.properties.country_nm}`);
              }}
            />
            {customLabel && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "rgba(35, 35, 35, 0.4)",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  pointerEvents: "none",
                }}
                dangerouslySetInnerHTML={{ __html: customLabel.html }}
              />
            )}
          </>
        )}
        <B.ExpCard isExpanded={isCardExpanded}>
          <B.CardHeader
            onClick={() => setIsCardExpanded(!isCardExpanded)}
            style={{ display: window.innerWidth <= 1000 ? "block" : "none" }}
          >
            {isCardExpanded ? (
              <FontAwesomeIcon icon={faChevronDown} size="2x" />
            ) : (
              <FontAwesomeIcon icon={faChevronUp} size="2x" />
            )}
            <span>여행 경보 단계</span>
          </B.CardHeader>
          <B.CardContent>
            {TRAVEL_ADVISORY_LEVELS.slice(0, 5).map((level, index) => (
              <B.StepCol key={index}>
                <TravelStep number={index as 0 | 1 | 2 | 3 | 4} />
                <div style={{ fontSize: "14px", flexGrow: 1 }}>
                  <p>{level.description}</p>
                  {level.additionalInfo && <p>{level.additionalInfo}</p>}
                </div>
              </B.StepCol>
            ))}
          </B.CardContent>
        </B.ExpCard>
      </div>
    </G.Wrap>
  );
};

export default BannerPage;
