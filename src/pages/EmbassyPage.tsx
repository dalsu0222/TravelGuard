import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/common/Search";
import * as G from "../styles/GlobalStyle";
import * as M from "../styles/MainpageStyle";
import * as P from "../styles/PermissionEnterStyle";

interface EmbassyData {
  국가명: string;
  국가코드: string;
  긴급전화번호: string;
  // 무료전화번호: string;
  // 영사콜센터번호: string;
  // 재외공관경도: string;
  // 재외공관위도: string;
  // 재외공관유형: string;
  재외공관명: string;
  재외공관주소: string;
  전화번호: string;
}

export default function EmbassyPage() {
  const [embassies, setEmbassies] = useState<EmbassyData[]>([]);
  const [filteredEmbassies, setFilteredEmbassies] = useState<EmbassyData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.odcloud.kr/api/15076569/v1/uddi:7692653c-21f9-4396-b6b3-f3f0cdbe9370",
          {
            params: {
              page: 1,
              perPage: 1000,
              serviceKey:
                "6+dN4DfuPjp96sLh1/go7M3BLBwwigNpa7rx6a1+F+n3//4kjjvwEJMX2wTZc2T1BLsnfnM3d56UQSmOjMwCww==",
            },
          }
        );
        console.log(response.data.data);
        setEmbassies(response.data.data);
        setFilteredEmbassies(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = embassies.filter(
      (embassy) =>
        embassy.국가명.toLowerCase().includes(searchTerm.toLowerCase()) ||
        embassy.재외공관명.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmbassies(filtered);
  }, [searchTerm, embassies]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
                  <P.td style={{ minWidth: 150 }}>{embassy.재외공관명}</P.td>
                  <P.td>{embassy.재외공관주소}</P.td>
                  <P.td style={{ minWidth: 170 }}>{embassy.긴급전화번호}</P.td>
                  <P.td style={{ minWidth: 170 }}>{embassy.전화번호}</P.td>
                </tr>
              ))}
            </tbody>
          </table>
        </M.Box>
      </G.mw>
    </G.Container>
  );
}
