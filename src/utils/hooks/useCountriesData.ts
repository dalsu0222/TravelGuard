import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GeoJsonFeature } from "../types/geoTypes";
import { getKoreanCountryName } from "../countryNameMapping";

const fetchCountriesData = async (): Promise<{
  features: GeoJsonFeature[];
}> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [geoJsonRes, travelAdvisoryRes] = await Promise.all([
    fetch("/datasets/ne_110m_admin_0_countries.geojson").then((res) =>
      res.json()
    ),
    axios.get(
      `https://apis.data.go.kr/1262000/MedicalEnvironmentService/getMedicalEnvironmentList?serviceKey=${apiKey}&numOfRows=1000&pageNo=1`
    ),
    // error code 500
    // axios.get(
    //   "https://apis.data.go.kr/1262000/MedicalEnvironmentService/getMedicalEnvironmentList",
    //   {
    //     params: {
    //       page: 1,
    //       perPage: 1000,
    //       serviceKey: apiKey,
    //     },
    //   }
    // ),
  ]);

  const travelAdvisoryData = travelAdvisoryRes.data.data;

  const updatedCountries = geoJsonRes.features.map(
    (country: GeoJsonFeature) => {
      let isoCode = country.properties.ISO_A2;
      if (isoCode === "-99" && country.properties.ADMIN === "Somaliland") {
        isoCode = "SO";
        country.properties.ISO_A2 = "SO";
      }
      const advisory = travelAdvisoryData.find(
        (advisoryItem: { country_iso_alp2: string }) =>
          advisoryItem.country_iso_alp2 === isoCode
      );
      return {
        ...country,
        properties: {
          ...country.properties,
          travelAdvisoryLevel: advisory
            ? advisory.current_travel_alarm
            : "없음",
          country_nm: advisory
            ? advisory.country_nm
            : getKoreanCountryName(country.properties.ADMIN),
        },
      };
    }
  );

  return { features: updatedCountries };
};

export const useCountriesData = () => {
  return useQuery({
    queryKey: ["countriesData"],
    queryFn: fetchCountriesData,
    staleTime: 1000 * 60 * 60 * 6, // 6시간
  });
};
