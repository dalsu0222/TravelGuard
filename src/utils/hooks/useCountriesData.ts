// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { GeoJsonFeature } from "../types/geoTypes";
// import { getKoreanCountryName } from "../countryNameMapping";

// export const useCountriesData = () => {
//   const [countries, setCountries] = useState<{ features: GeoJsonFeature[] }>({
//     features: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCountriesData = async () => {
//       try {
//         const [geoJsonRes, travelAdvisoryRes] = await Promise.all([
//           fetch("/datasets/ne_110m_admin_0_countries.geojson").then((res) =>
//             res.json()
//           ),
//           axios.get(
//             "https://apis.data.go.kr/1262000/MedicalEnvironmentService/getMedicalEnvironmentList?serviceKey=6%2BdN4DfuPjp96sLh1%2Fgo7M3BLBwwigNpa7rx6a1%2BF%2Bn3%2F%2F4kjjvwEJMX2wTZc2T1BLsnfnM3d56UQSmOjMwCww%3D%3D&numOfRows=1000&pageNo=1"
//           ),
//         ]);

//         const travelAdvisoryData = travelAdvisoryRes.data.data;
//         console.log(travelAdvisoryData);

//         const updatedCountries = geoJsonRes.features.map(
//           (country: GeoJsonFeature) => {
//             let isoCode = country.properties.ISO_A2;
//             if (
//               isoCode === "-99" &&
//               country.properties.ADMIN === "Somaliland"
//             ) {
//               isoCode = "SO";
//               country.properties.ISO_A2 = "SO";
//             }
//             const advisory = travelAdvisoryData.find(
//               (advisoryItem: { country_iso_alp2: string }) =>
//                 advisoryItem.country_iso_alp2 === isoCode
//             );
//             return {
//               ...country,
//               properties: {
//                 ...country.properties,
//                 travelAdvisoryLevel: advisory
//                   ? advisory.current_travel_alarm
//                   : "없음",
//                 country_nm: advisory
//                   ? advisory.country_nm
//                   : getKoreanCountryName(country.properties.ADMIN), // 한글 국가명 추가
//               },
//             };
//           }
//         );

//         setCountries({ features: updatedCountries });
//         setLoading(false);
//       } catch (err) {
//         console.log(err);
//         setError("Failed to fetch countries data");
//         setLoading(false);
//       }
//     };

//     fetchCountriesData();
//   }, []);

//   return { countries, loading, error };
// };

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GeoJsonFeature } from "../types/geoTypes";
import { getKoreanCountryName } from "../countryNameMapping";

const fetchCountriesData = async (): Promise<{
  features: GeoJsonFeature[];
}> => {
  const [geoJsonRes, travelAdvisoryRes] = await Promise.all([
    fetch("/datasets/ne_110m_admin_0_countries.geojson").then((res) =>
      res.json()
    ),
    axios.get(
      "https://apis.data.go.kr/1262000/MedicalEnvironmentService/getMedicalEnvironmentList?serviceKey=6%2BdN4DfuPjp96sLh1%2Fgo7M3BLBwwigNpa7rx6a1%2BF%2Bn3%2F%2F4kjjvwEJMX2wTZc2T1BLsnfnM3d56UQSmOjMwCww%3D%3D&numOfRows=1000&pageNo=1"
    ),
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
