import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GeoJsonFeature } from "../types/geoTypes";

interface UseGlobeViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globeRef: React.MutableRefObject<any>;
  countriesData: {
    features: GeoJsonFeature[];
  } | null;
}

export const useGlobeView = ({
  globeRef,
  countriesData,
}: UseGlobeViewProps) => {
  const [key, setKey] = useState(0);
  const location = useLocation();

  const setInitialView = useCallback(() => {
    if (globeRef.current) {
      const isMobile = window.innerWidth <= 1000;
      globeRef.current.pointOfView(
        {
          lat: 35.9078,
          lng: 127.7669,
          altitude: isMobile ? 2.5 : 3,
        },
        4000
      );
    }
  }, [globeRef]);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [location]);

  useEffect(() => {
    if ((countriesData?.features?.length ?? 0) > 0 && globeRef.current) {
      if (globeRef.current.scene) {
        setInitialView();
      } else {
        globeRef.current.onGlobeReady(setInitialView);
      }
    }
  }, [countriesData, key, setInitialView, globeRef]);

  return { key };
};
