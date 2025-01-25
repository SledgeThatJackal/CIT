import React, { lazy, Suspense } from "react";

import RootLayout from "../layouts/RootLayout.tsx";

import HomePage from "../pages/home/HomePage.tsx";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/user/LoginPage.tsx";

const ContainerPage = lazy(
  () => import("../pages/container/ContainerPage.tsx"),
);
const DetailedContainerPage = lazy(
  () => import("../pages/container/DetailedContainerPage.tsx"),
);

const ItemPage = lazy(() => import("../pages/item/ItemPage.tsx"));
const DetailedItemPage = lazy(
  () => import("../pages/item/DetailedItemPage.tsx"),
);

const TagPage = lazy(() => import("../pages/tag/TagPage.tsx"));
const TypePage = lazy(() => import("../pages/type/TypePage.tsx"));

const SettingsPage = lazy(() => import("../pages/settings/SettingsPage.tsx"));

const ContainerSettings = lazy(
  () =>
    import("../../features/settings/components/pages/ContainerSettings.tsx"),
);

const ItemSettings = lazy(
  () => import("../../features/settings/components/pages/ItemSettings.tsx"),
);

const TagSettings = lazy(
  () => import("../../features/settings/components/pages/TagSettings.tsx"),
);

const TypeSettings = lazy(
  () => import("../../features/settings/components/pages/TypeSettings.tsx"),
);

const FindPage = lazy(() => import("../pages/find/FindPage.tsx"));

const SuspenseLayout = () => (
  <Suspense fallback={<>Loading...</>}>
    <RootLayout />
  </Suspense>
);

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <SuspenseLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "container",
          children: [
            { index: true, element: <ContainerPage /> },
            { path: "id/:scannerId", element: <DetailedContainerPage /> },
          ],
        },
        {
          path: "item",
          children: [
            {
              path: ":type?",
              element: <ItemPage />,
            },
            {
              path: "id/:id",
              element: <DetailedItemPage />,
            },
          ],
        },
        {
          path: "tag",
          children: [{ index: true, element: <TagPage /> }],
        },
        {
          path: "type",
          children: [{ index: true, element: <TypePage /> }],
        },
        {
          path: "settings",
          element: <SettingsPage />,
          children: [
            { path: "container", element: <ContainerSettings /> },
            { path: "item", element: <ItemSettings /> },
            { path: "tag", element: <TagSettings /> },
            { path: "type", element: <TypeSettings /> },
          ],
        },
        {
          path: "find",
          children: [{ index: true, element: <FindPage /> }],
        },
      ],
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<>Loading...</>}>
          <LoginPage />
        </Suspense>
      ),
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);
