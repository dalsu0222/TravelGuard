import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// interface EmbassyData {
//   국가명: string;
//   국가코드: string;
//   긴급전화번호: string;
//   재외공관명: string;
//   재외공관주소: string;
//   전화번호: string;
// }

interface EmbassyData {
  country_nm: string;
  embassy_kor_nm: string;
  emblgbd_addr: string;
  tel_no: string;
  urgency_tel_no: string;
}

const fetchEmbassyData = async (): Promise<EmbassyData[]> => {
  const apiKey = import.meta.env.VITE_API_KEY_EMBASSY;
  const response = await axios.get(
    "https://apis.data.go.kr/1262000/EmbassyService2/getEmbassyList2?",
    {
      params: {
        pageNo: 1,
        numOfRows: 1000,
        serviceKey: apiKey,
      },
    }
  );

  // 미합중국 -> 미국으로 변경
  const data = response.data.data.map((item: EmbassyData) => {
    if (item.country_nm === "미합중국") {
      return { ...item, country_nm: "미국" };
    }
    return item;
  });

  return data;
};

export const useEmbassyData = () => {
  return useQuery({
    queryKey: ["embassyData"],
    queryFn: fetchEmbassyData,
    staleTime: 1000 * 60 * 60 * 6, // 6시간
  });
};
