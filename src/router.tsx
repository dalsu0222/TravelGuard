import { Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Loading from "./components/common/Loading";
import Header from "./components/common/Header";

// Lazy imports moved to separate file
import {
  BannerPage,
  MainPage,
  PermissionEnter,
  EmbassyPage,
  CountryDetail,
} from "./lazyComponents";

// eslint-disable-next-line react-refresh/only-export-components
const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <BannerPage />
          </Suspense>
        ),
      },
      {
        path: "main",
        element: (
          <Suspense fallback={<Loading />}>
            <MainPage />
          </Suspense>
        ),
        // element: <MainPage />,
      },
      {
        path: "permission",
        element: (
          <Suspense fallback={<Loading />}>
            <PermissionEnter />
          </Suspense>
        ),
      },
      {
        path: "embassy",
        element: (
          <Suspense fallback={<Loading />}>
            <EmbassyPage />
          </Suspense>
        ),
      },
      {
        path: ":country_nm",
        element: (
          <Suspense fallback={<Loading />}>
            <CountryDetail />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
