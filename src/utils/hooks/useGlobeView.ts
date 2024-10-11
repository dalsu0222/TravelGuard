import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { GeoJsonFeature } from "../types/geoTypes";

interface UseGlobeViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globeRef: React.MutableRefObject<any>;
  countriesData: {
    features: GeoJsonFeature[];
  } | null;
}

interface GlobeView {
  lat: number;
  lng: number;
  altitude: number;
}

const DEFAULT_VIEW: GlobeView = {
  // default : 대한민국
  lat: 35.9078,
  lng: 127.7669,
  altitude: 3,
};

export const useGlobeView = ({
  globeRef,
  countriesData,
}: UseGlobeViewProps) => {
  const [key, setKey] = useState(0);
  const location = useLocation();
  const initialViewSet = useRef(false);

  const saveCurrentView = useCallback(() => {
    if (globeRef.current) {
      const currentView = globeRef.current.pointOfView();
      sessionStorage.setItem("globeView", JSON.stringify(currentView));
    }
  }, [globeRef]);

  const loadSavedView = useCallback((): GlobeView => {
    const savedView = sessionStorage.getItem("globeView");
    return savedView ? JSON.parse(savedView) : DEFAULT_VIEW;
  }, []);

  const setInitialView = useCallback(() => {
    if (globeRef.current && !initialViewSet.current) {
      const view = loadSavedView();
      const isMobile = window.innerWidth <= 1000;
      if (isMobile) {
        view.altitude = 2.5;
      }
      globeRef.current.pointOfView(view, 2000);
      initialViewSet.current = true;
    }
  }, [globeRef, loadSavedView]);

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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveCurrentView();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", saveCurrentView);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", saveCurrentView);
      saveCurrentView();
    };
  }, [saveCurrentView]);

  return { key, saveCurrentView };
};
