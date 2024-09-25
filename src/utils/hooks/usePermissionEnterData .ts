import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CountryData {
  국가: string;
  "일반여권소지자-입국가능기간": string;
  "일반여권소지자-입국가능여부": string;
  "입국시 소지여부": string;
}

const fetchPermissionEnterData = async (): Promise<CountryData[]> => {
  const apiKey = import.meta.env.VITE_API_KEY_ENTER;
  const response = await axios.get(
    "https://api.odcloud.kr/api/15076574/v1/uddi:b0a4deac-3443-4e7b-bee1-a6163b1dbc17",
    {
      params: {
        page: 1,
        perPage: 1000,
        serviceKey: apiKey,
      },
    }
  );
  return response.data.data;
};

export const usePermissionEnterData = () => {
  return useQuery({
    queryKey: ["permissionEnterData"],
    queryFn: fetchPermissionEnterData,
    staleTime: 1000 * 60 * 60 * 6, // 6시간
  });
};
