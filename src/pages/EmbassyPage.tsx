import React, { useState, useMemo } from "react";
import Search from "../components/common/Search";
import * as G from "../styles/GlobalStyle";
import * as M from "../styles/MainpageStyle";
import * as P from "../styles/PermissionEnterStyle";
import { useEmbassyData } from "../utils/hooks/useEmbassyData";

interface EmbassyData {
  country_nm: string;
  embassy_kor_nm: string;
  emblgbd_addr: string;
  tel_no: string;
  urgency_tel_no: string;
}

const EmbassyRow = React.memo(({ embassy }: { embassy: EmbassyData }) => (
  <tr>
    <P.Td style={{ minWidth: 150 }}>{embassy.embassy_kor_nm}</P.Td>
    <P.Td>{embassy.emblgbd_addr}</P.Td>
    <P.Td style={{ minWidth: 170 }}>{embassy.urgency_tel_no}</P.Td>
    <P.Td style={{ minWidth: 170 }}>{embassy.tel_no}</P.Td>
  </tr>
));

export default function EmbassyPage() {
  const { data: embassies, isLoading, error } = useEmbassyData();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredEmbassies = useMemo(() => {
    if (!embassies) return [];
    const term = searchTerm.trim();
    return embassies.filter(
      (embassy) =>
        embassy.country_nm.includes(term) ||
        embassy.embassy_kor_nm.includes(term)
    );
  }, [searchTerm, embassies]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <G.Container>
      <G.mw>
        <G.ResponsiveHeading>국가별 대사관 정보</G.ResponsiveHeading>
        <G.ResponsiveParagraph>
          국가별 대사관 위치, 연락처 등을 확인할 수 있습니다.
        </G.ResponsiveParagraph>

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
        <M.Box style={{ marginTop: 16 }} className="scroll embassy">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <P.Thead>
              <tr>
                <P.Th>재외공관명</P.Th>
                <P.Th>주소</P.Th>
                <P.Th>긴급전화번호</P.Th>
                <P.Th>전화번호</P.Th>
              </tr>
            </P.Thead>
            <tbody>
              {filteredEmbassies.map((embassy, index) => (
                <EmbassyRow key={index} embassy={embassy} />
              ))}
            </tbody>
          </table>
        </M.Box>
      </G.mw>
    </G.Container>
  );
}
