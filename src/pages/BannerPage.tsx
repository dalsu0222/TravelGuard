import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const BannerPage: React.FC = () => {
  const [hoverD, setHoverD] = useState<GeoJsonFeature | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>();
  const { data: countriesData, isLoading, error } = useCountriesData();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      countriesData &&
      countriesData.features.length > 0 &&
      globeRef.current
    ) {
      // 데이터가 로드되고 Globe 컴포넌트가 마운트된 후 카메라 위치 설정
      setTimeout(() => {
        globeRef.current.pointOfView(
          {
            lat: 35.9078,
            lng: 127.7669,
            altitude: 3,
          },
          0
        );
      }, 100); // 약간의 지연을 주어 Globe 컴포넌트가 완전히 렌더링되도록 함
    }
  }, [countriesData]);

  if (isLoading) return <div>Loading...</div>; // 나중에 로딩스피너로 대체
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <G.Wrap>
      <div className="globe-container" style={globeConfig.containerStyle}>
        <Globe
          ref={globeRef}
          {...globeConfig.globeProps} // 국가 밑바탕 색상 오로라처럼?
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
        <B.expCard>
          {TRAVEL_ADVISORY_LEVELS.slice(0, 4).map((level, index) => (
            <B.stepCol key={index}>
              <TravelStep number={(index + 1) as 1 | 2 | 3 | 4} />
              <div style={{ fontSize: "14px", flexGrow: 1 }}>
                <p>{level.description}</p>
                {level.additionalInfo && <p>{level.additionalInfo}</p>}
              </div>
            </B.stepCol>
          ))}
        </B.expCard>
      </div>
    </G.Wrap>
  );
};

export default BannerPage;

{
  /* {hoverD && (
        <div
          className="scene-tooltip"
          style={{
            left: `${hoverD ? "10%" : "-9999px"}`,
            top: `${hoverD ? "30%" : "-9999px"}`,
            transform: hoverD
              ? `translate(${hoverD ? "0" : "0"}, -50%)`
              : "none",
          }}
        >
          <b>
            {hoverD?.properties.ADMIN} ({hoverD?.properties.ISO_A2}):
          </b>{" "}
          <br />
          <i>
            여행경보 단계: {hoverD?.properties.travelAdvisoryLevel || "없음"}
          </i>
        </div>
      )} */
}
