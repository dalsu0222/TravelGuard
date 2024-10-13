import { useState, useCallback, lazy } from "react";
import Search from "../components/common/Search";
import * as G from "../styles/GlobalStyle";
import * as M from "../styles/MainpageStyle";
import ColorBadge from "../components/common/ColorBadge";
import { useNavigate } from "react-router-dom";

const CountriesList = lazy(() => import("../components/CountriesList"));

export default function MainPage() {
  const [selectedLevel, setSelectedLevel] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <G.Container>
      <G.mw>
        <G.ResponsiveHeading>국가/지역별 정보</G.ResponsiveHeading>
        <G.ResponsiveParagraph>
          국가/지역별 현지 연락처, 사건 사고정보, 문화 등 다양한 정보를
          제공합니다.
        </G.ResponsiveParagraph>

        <M.Box style={{ marginTop: 16 }}>
          <Search onSearch={handleSearch} />
        </M.Box>
        <M.TabsContainer2 style={{ marginTop: 16 }}>
          {[
            { key: -1, label: "전체", color: "none" },
            { key: 0, label: "0단계 여행경보 없음", color: 0 },
            { key: 1, label: "1단계 여행유의", color: 1 },
            { key: 2, label: "2단계 여행자제", color: 2 },
            { key: 3, label: "3단계 출국권고", color: 3 },
            { key: 4, label: "4단계 여행금지", color: 4 },
          ].map((tab) => (
            <M.Tab2
              key={tab.key}
              className={selectedLevel === tab.key ? "active" : ""}
              onClick={() => setSelectedLevel(tab.key)}
            >
              {tab.key >= 0 ? (
                <ColorBadge number={tab.color as 0 | 1 | 2 | 3 | 4} />
              ) : (
                ""
              )}
              {tab.label}
            </M.Tab2>
          ))}
        </M.TabsContainer2>
        <M.Box style={{ marginTop: 16 }} className="scroll">
          <CountriesList
            selectedLevel={selectedLevel}
            searchTerm={searchTerm}
            onCountryClick={(country) => navigate(`/${country}`)}
          />
        </M.Box>
      </G.mw>
    </G.Container>
  );
}
