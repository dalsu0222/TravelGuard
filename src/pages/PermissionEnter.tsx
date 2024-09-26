import React, { useState, useEffect } from "react";
import Search from "../components/common/Search";
import * as G from "../styles/GlobalStyle";
import * as M from "../styles/MainpageStyle";
import * as P from "../styles/PermissionEnterStyle";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faArrowRight,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { usePermissionEnterData } from "../utils/hooks/usePermissionEnterData";

interface CountryData {
  국가: string;
  "일반여권소지자-입국가능기간": string;
  "일반여권소지자-입국가능여부": string;
  "입국시 소지여부": string;
}

export default function PermissionEnter() {
  const { data: countries, isLoading, error } = usePermissionEnterData();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    if (countries) {
      const filtered = countries.filter((country) =>
        country.국가.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <G.Container>
      <G.mw>
        <h1 style={{ fontSize: 32 }}>국가별 입국 허가요건</h1>
        <p style={{ fontSize: 20 }}>
          국가별 입국가능기간, 입국가능여부, 입국시 소지여부를 확인할 수
          있습니다.
        </p>

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
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <P.th>국가</P.th>
                <P.th>입국가능기간</P.th>
                <P.th>입국가능여부</P.th>
                <P.th>입국시 소지여부</P.th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries.map((country, index) => (
                <tr key={index}>
                  <P.td>
                    <Link to={`/${country.국가}`}>
                      {country.국가}{" "}
                      <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </Link>
                  </P.td>
                  <P.td>
                    {/* style={{ textAlign: "center" }} */}
                    {country["일반여권소지자-입국가능기간"]}
                  </P.td>
                  <P.td>{country["일반여권소지자-입국가능여부"]}</P.td>
                  <P.td>{country["입국시 소지여부"]}</P.td>
                </tr>
              ))}
            </tbody>
          </table>
        </M.Box>
      </G.mw>
    </G.Container>
  );
}
