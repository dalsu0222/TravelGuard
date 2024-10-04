import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/common/Header.tsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// lazy 로딩을 사용하여 컴포넌트 import
const BannerPage = lazy(() => import("./pages/BannerPage.tsx"));
const MainPage = lazy(() => import("./pages/MainPage.tsx"));
const PermissionEnter = lazy(() => import("./pages/PermissionEnter.tsx"));
const EmbassyPage = lazy(() => import("./pages/EmbassyPage.tsx"));
const CountryDetail = lazy(() => import("./pages/CountryDetail.tsx"));

library.add(faMagnifyingGlass);
const queryClient = new QueryClient();

// 컴포넌트가 로딩되는 동안 표시할 UI를 제공
const LoadingFallback = () => <div>Loading...</div>;

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* 기본 경로 - bannerPage가 렌더링 */}
            <Route path="/" element={<BannerPage />} />
            {/* 추가된 경로 */}
            <Route path="/main" element={<MainPage />} />
            <Route path="/permission" element={<PermissionEnter />} />
            <Route path="/embassy" element={<EmbassyPage />} />
            <Route path="/:country_nm" element={<CountryDetail />} />
            <Route path="/*" element={<BannerPage />} /> {/* 그 외 페이지 */}
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
