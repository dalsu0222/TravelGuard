import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// lazy 로딩을 사용하여 컴포넌트 import

library.add(faMagnifyingGlass);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true, // Enable suspense mode for all queries
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
