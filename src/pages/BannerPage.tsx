import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Globe from "react-globe.gl";
import * as G from "../styles/GlobalStyle";
import * as B from "../styles/BannerPageStyle";
import TravelStep from "../components/common/TravelStep";
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
  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    setDimensions({ width: innerWidth, height: innerHeight });
  }, []);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const { data: countriesData, isLoading, error } = useCountriesData();
  const navigate = useNavigate();
  const location = useLocation();
  const [key, setKey] = useState(0); // 강제 리렌더링을 위한 키

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
    setKey((prevKey) => prevKey + 1); // 라우트 변경 시 강제 리렌더링
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
          1000 // 전환 시간을 1초로 설정
        );
      };

      // Globe 컴포넌트의 onGlobeReady 이벤트 사용
      if (globeRef.current.scene) {
        setInitialView();
      } else {
        globeRef.current.onGlobeReady(() => {
          setInitialView();
        });
      }
    }
  }, [countriesData, key]); // key를 의존성 배열에 추가

  if (isLoading) return <div>Loading...</div>; // 나중에 로딩스피너로 대체
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <G.Wrap>
      <div
        ref={globeContainerRef}
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative", // 추가
        }}
      >
        {dimensions.width > 0 &&
          dimensions.height > 0 && ( // 조건부 렌더링
            <Globe
              key={key} // 강제 리렌더링을 위한 키 추가
              ref={globeRef}
              width={dimensions.width}
              height={dimensions.height}
              {...globeConfig.globeProps} // 국가 밑바탕 색상 오로라처럼?
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              polygonsData={
                countriesData?.features?.filter(
                  (d: GeoJsonFeature) => d.properties.ISO_A2 !== "AQ"
                ) || []
              }
              polygonAltitude={(d: object) => (d === hoverD ? 0.12 : 0.06)}
              polygonCapColor={(d: object) =>
                COLOR_SCALE(getTravelAdvisoryLevel(d as GeoJsonFeature))
              }
              polygonLabel={(d: object) => getPolygonLabel(d as GeoJsonFeature)}
              onPolygonHover={(polygon: object | null) =>
                setHoverD(polygon as GeoJsonFeature | null)
              }
              onPolygonClick={(polygon: object) => {
                const geoPolygon = polygon as GeoJsonFeature;
                navigate(`/${geoPolygon.properties.country_nm}`);
              }}
            />
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
