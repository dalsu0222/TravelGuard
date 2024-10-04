import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Globe from "react-globe.gl";
import * as G from "../styles/GlobalStyle";
import * as B from "../styles/BannerPageStyle";
import SearchBar from "../components/common/SearchBar";
import ExpCard from "../components/common/ExpCard";
import { useCountriesData } from "../utils/hooks/useCountriesData";
import { useGlobeSearch } from "../utils/hooks/useGlobeSearch";
import { useResponsiveDimensions } from "../utils/hooks/useResponsiveDimensions";
import { useGlobeView } from "../utils/hooks/useGlobeView";
import {
  getPolygonLabel,
  getTravelAdvisoryLevel,
  globeConfig,
} from "../utils/globeConfig";
import { GeoJsonFeature } from "../utils/types/geoTypes";
import { COLOR_SCALE } from "../utils/constant/travelAdvisory";

const BannerPage: React.FC = () => {
  const [hoverD, setHoverD] = useState<GeoJsonFeature | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>();
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const { data: countriesData, isLoading, error } = useCountriesData();
  const navigate = useNavigate();

  const dimensions = useResponsiveDimensions(globeContainerRef);
  const { key } = useGlobeView({
    globeRef,
    countriesData: countriesData ?? null,
  });
  const {
    searchError,
    searchedCountry,
    isSearchMode,
    customLabel,
    handleSearch,
    handleInputChange,
  } = useGlobeSearch({ countriesData: countriesData ?? null, globeRef });

  const handlePolygonHover = useCallback(
    (polygon: object | null) => {
      if (!isSearchMode) {
        setHoverD(polygon as GeoJsonFeature | null);
      }
    },
    [isSearchMode]
  );

  const handlePolygonClick = useCallback(
    (polygon: object) => {
      const geoPolygon = polygon as GeoJsonFeature;
      navigate(`/${geoPolygon.properties.country_nm}`);
    },
    [navigate]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <G.Wrap>
      <SearchBar
        onSearch={handleSearch}
        errorContent={searchError}
        onInputChange={handleInputChange}
      />
      <B.GlobeContainer ref={globeContainerRef}>
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
                  ? "pink" // 검색된 국가의 색상을 pink으로 변경하며 강조
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
              onPolygonClick={handlePolygonClick}
            />
            {customLabel && (
              <B.CustomLabel
                dangerouslySetInnerHTML={{ __html: customLabel.html }}
              />
            )}
          </>
        )}
        <ExpCard
          isExpanded={isCardExpanded}
          setIsExpanded={setIsCardExpanded}
        />
      </B.GlobeContainer>
    </G.Wrap>
  );
};

export default BannerPage;
