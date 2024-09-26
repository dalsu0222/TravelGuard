import React, { useState, useEffect } from "react";
import Search from "../components/common/Search";
import * as G from "../styles/GlobalStyle";
import * as M from "../styles/MainpageStyle";
import * as P from "../styles/PermissionEnterStyle";
import { useEmbassyData } from "../utils/hooks/useEmbassyData";

// interface EmbassyData {
//   국가명: string;
//   국가코드: string;
//   긴급전화번호: string;
//   // 무료전화번호: string;
//   // 영사콜센터번호: string;
//   // 재외공관경도: string;
//   // 재외공관위도: string;
//   // 재외공관유형: string;
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

export default function EmbassyPage() {
  const { data: embassies, isLoading, error } = useEmbassyData();

  const [filteredEmbassies, setFilteredEmbassies] = useState<EmbassyData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (embassies) {
      const filtered = embassies.filter(
        (embassy: { country_nm: string; embassy_kor_nm: string }) =>
          embassy.country_nm.toLowerCase().includes(searchTerm.toLowerCase()) ||
          embassy.embassy_kor_nm
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredEmbassies(filtered);
    }
  }, [searchTerm, embassies]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <G.Container>
      <G.mw>
        <h1 style={{ fontSize: 32 }}>국가별 대사관 정보</h1>
        <p style={{ fontSize: 20 }}>
          국가별 대사관 위치, 연락처 등을 확인할 수 있습니다.
        </p>

        <M.Box style={{ marginTop: 16 }}>
          <Search
            onSearch={(value: string) =>
              handleSearchChange({
                target: { value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            placeholder="국가 또는 지역을 입력하세요"
          />
        </M.Box>
        <M.Box style={{ marginTop: 16 }} className="scroll permission">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {/* <P.th>국가명</P.th> */}
                <P.th>재외공관명</P.th>
                <P.th>주소</P.th>
                <P.th>긴급전화번호</P.th>
                <P.th>전화번호</P.th>
              </tr>
            </thead>
            <tbody>
              {filteredEmbassies.map((embassy, index) => (
                <tr key={index}>
                  {/* <P.td>{embassy.국가명}</P.td> */}
                  <P.td style={{ minWidth: 150 }}>
                    {embassy.embassy_kor_nm}
                  </P.td>
                  <P.td>{embassy.emblgbd_addr}</P.td>
                  <P.td style={{ minWidth: 170 }}>
                    {embassy.urgency_tel_no}
                  </P.td>
                  <P.td style={{ minWidth: 170 }}>{embassy.tel_no}</P.td>
                </tr>
              ))}
            </tbody>
          </table>
        </M.Box>
      </G.mw>
    </G.Container>
  );
}
