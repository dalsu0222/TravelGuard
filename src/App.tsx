import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BannerPage from "./pages/BannerPage.tsx"; // 배너 페이지
import MainPage from "./pages/MainPage.tsx";
import PermissionEnter from "./pages/PermissionEnter.tsx";
import EmbassyPage from "./pages/EmbassyPage.tsx";
import Header from "./components/common/Header.tsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

library.add(faMagnifyingGlass);

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* 기본 경로 - bannerPage가 렌더링 */}
        <Route path="/" element={<BannerPage />} />

        {/* 추가된 경로 */}
        <Route path="/main" element={<MainPage />} />
        <Route path="/permission" element={<PermissionEnter />} />
        <Route path="/embassy" element={<EmbassyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
