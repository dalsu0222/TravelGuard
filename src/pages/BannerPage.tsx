import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Globe from "react-globe.gl";
import * as G from "../styles/GlobalStyle";
import * as B from "../styles/BannerPageStyle";
import SearchBar from "../components/common/SearchBar";
import ExpCard from "../components/common/ExpCard";
import Loading from "../components/common/Loading";
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
  const { key, saveCurrentView } = useGlobeView({
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
      saveCurrentView();
      navigate(`/${geoPolygon.properties.country_nm}`);
    },
    [navigate, saveCurrentView]
  );

  useEffect(() => {
    return () => {
      saveCurrentView();
    };
  }, [saveCurrentView]);

  if (isLoading) return <Loading fullScreen />;
  if (error) return <div>Error: {String(error)}</div>;

  return (
    <>
      <Helmet>
        <html lang="ko" />
        <title>TravelGuard</title>
        <meta
          name="description"
          content="국가별 현지 연락처, 입국 허가요건, 사건 사고정보 등 다양한 정보를 제공합니다."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌏</text></svg>"
        />
      </Helmet>
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
    </>
  );
};

export default BannerPage;
