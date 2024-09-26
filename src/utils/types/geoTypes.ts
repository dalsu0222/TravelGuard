export interface GeoJsonFeature {
  type: string;
  properties: {
    [key: string]: string | number | undefined;
    ISO_A2: string;
    ADMIN: string;
    travelAdvisoryLevel?: string;
    country_nm: string;
  };
  geometry: {
    type: string;
    coordinates: number[][] | number[][][];
  };
}
