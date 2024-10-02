import React, { useState, useMemo } from "react";
import Search from "../components/common/Search";
import * as G from "../styles/GlobalStyle";
import * as M from "../styles/MainpageStyle";
import * as P from "../styles/PermissionEnterStyle";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { usePermissionEnterData } from "../utils/hooks/usePermissionEnterData";

interface CountryData {
  국가: string;
  "일반여권소지자-입국가능기간": string;
  "일반여권소지자-입국가능여부": string;
  "입국시 소지여부": string;
}

const CountryRow = React.memo(
  ({
    country,
    onRowClick,
  }: {
    country: CountryData;
    onRowClick: (country: string) => void;
  }) => (
    <P.Tr onClick={() => onRowClick(country.국가)}>
      <P.Td>
        {country.국가} <FontAwesomeIcon icon={faArrowRightToBracket} />
      </P.Td>
      <P.Td>{country["일반여권소지자-입국가능기간"]}</P.Td>
      <P.Td>{country["일반여권소지자-입국가능여부"]}</P.Td>
      <P.Td>{country["입국시 소지여부"]}</P.Td>
    </P.Tr>
  )
);

export default function PermissionEnter() {
  const { data: countries, isLoading, error } = usePermissionEnterData();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const filteredCountries = useMemo(() => {
    if (!countries) return [];
    const term = searchTerm.trim();
    return countries.filter((country) => country.국가.includes(term));
  }, [searchTerm, countries]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const goToDetail = (country: string) => {
    navigate(`/${country}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <G.Container>
      <G.mw>
        <G.ResponsiveHeading>국가별 입국 허가요건</G.ResponsiveHeading>
        <G.ResponsiveParagraph>
          국가별 입국가능기간, 입국가능여부, 입국시 소지여부를 확인할 수
          있습니다.
        </G.ResponsiveParagraph>

        <M.Box style={{ marginTop: 16 }}>
          <Search
            onSearch={(value: string) =>
              handleSearchChange({
                target: { value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            placeholder="국가명을 입력하세요"
          />
        </M.Box>
        <M.Box style={{ marginTop: 16 }} className="scroll permission">
          <P.Table>
            <P.Thead>
              <tr>
                <P.Th>국가</P.Th>
                <P.Th>입국가능기간</P.Th>
                <P.Th>입국가능여부</P.Th>
                <P.Th>입국시 소지여부</P.Th>
              </tr>
            </P.Thead>
            <tbody>
              {filteredCountries.map((country, index) => (
                <CountryRow
                  key={index}
                  country={country}
                  onRowClick={goToDetail}
                />
              ))}
            </tbody>
          </P.Table>
        </M.Box>
      </G.mw>
    </G.Container>
  );
}
