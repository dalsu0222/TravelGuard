import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CountryData {
  국가: string;
  "일반여권소지자-입국가능기간": string;
  "일반여권소지자-입국가능여부": string;
  "입국시 소지여부": string;
  비고: string;
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

  // 타이완 -> 대만으로 변경
  const data = response.data.data.map((item: CountryData) => {
    if (item.국가 === "타이완") {
      return { ...item, 국가: "대만" };
    }
    return item;
  });

  return data;
};

export const usePermissionEnterData = () => {
  return useQuery({
    queryKey: ["permissionEnterData"],
    queryFn: fetchPermissionEnterData,
    staleTime: 1000 * 60 * 60 * 6, // 6시간
  });
};
