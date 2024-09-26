import { GeoJsonFeature } from "./types/geoTypes";

// src/utils/globeConfig.ts
export const globeConfig = {
  containerStyle: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(180deg, #04001E 0%, #020010 43%)",
    position: "relative" as const,
  },
  globeProps: {
    backgroundImageUrl: "//unpkg.com/three-globe/example/img/night-sky.png",
    // backgroundColor: "#040019",
    globeImageUrl: "//unpkg.com/three-globe/example/img/earth-day.jpg",
    atmosphereColor: "#9bbafa",
    atmosphereAltitude: 0.25,
    polygonSideColor: () => "rgba(102, 153, 255, 0.25)",
    polygonStrokeColor: () => "#818181",
    polygonsTransitionDuration: 300,
  },
};

export const getPolygonLabel = (feature: GeoJsonFeature) => `
    <b>${feature.properties.country_nm} (${
  // 한글 나라명으로 대체
  feature.properties.ISO_A2
}):</b> <br />
    <i>여행경보 ${feature.properties.travelAdvisoryLevel || "없음"}</i>
  `;

export const getTravelAdvisoryLevel = (feat: GeoJsonFeature) =>
  feat.properties.travelAdvisoryLevel || "없음";
