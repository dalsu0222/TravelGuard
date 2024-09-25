import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface EmbassyData {
  국가명: string;
  국가코드: string;
  긴급전화번호: string;
  재외공관명: string;
  재외공관주소: string;
  전화번호: string;
}

const fetchEmbassyData = async (): Promise<EmbassyData[]> => {
  const apiKey = import.meta.env.VITE_API_KEY_EMBASSY;
  const response = await axios.get(
    "https://api.odcloud.kr/api/15076569/v1/uddi:7692653c-21f9-4396-b6b3-f3f0cdbe9370",
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

export const useEmbassyData = () => {
  return useQuery({
    queryKey: ["embassyData"],
    queryFn: fetchEmbassyData,
    staleTime: 1000 * 60 * 60 * 6, // 6시간
  });
};
