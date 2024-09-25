import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/common/Search";
import * as G from "../styles/GlobalStyle";
import * as M from "../styles/MainpageStyle";
import * as P from "../styles/PermissionEnterStyle";

interface CountryData {
  국가: string;
  "일반여권소지자-입국가능기간": string;
  "일반여권소지자-입국가능여부": string;
  "입국시 소지여부": string;
}

const PermissionEnter: React.FC = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.odcloud.kr/api/15076574/v1/uddi:b0a4deac-3443-4e7b-bee1-a6163b1dbc17",
          {
            params: {
              page: 1,
              perPage: 1000,
              serviceKey:
                "6+dN4DfuPjp96sLh1/go7M3BLBwwigNpa7rx6a1+F+n3//4kjjvwEJMX2wTZc2T1BLsnfnM3d56UQSmOjMwCww==",
            },
          }
        );
        setCountries(response.data.data);
        setFilteredCountries(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.국가.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
                  <P.td>{country.국가}</P.td>
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
};

export default PermissionEnter;
