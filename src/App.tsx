import React from "react";
import { RouterProvider } from "react-router-dom";
import { Helmet } from "react-helmet";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// lazy 로딩을 사용하여 컴포넌트 import

library.add(faMagnifyingGlass);

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Helmet>
        <html lang="ko" />
        <title>TravelGuard</title>
        <meta
          name="description"
          content="국가별 현지 연락처, 입국 허가요건, 사건 사고정보 등 다양한 정보를 제공합니다."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Helmet>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
