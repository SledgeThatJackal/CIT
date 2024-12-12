import React, { lazy, Suspense } from "react";

import RootLayout from "../layouts/RootLayout.tsx";

import HomePage from "../pages/home/HomePage.tsx";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/user/LoginPage.tsx";

const ContainerPage = lazy(
  () => import("../pages/container/ContainerPage.tsx"),
);

const ItemPage = lazy(() => import("../pages/item/ItemPage.tsx"));

const TagSettingsPage = lazy(() => import("../pages/tag/TagPage.tsx"));
const TypeSettingsPage = lazy(() => import("../pages/type/TypePage.tsx"));

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
          children: [{ index: true, element: <ContainerPage /> }],
        },
        { path: "item", children: [{ index: true, element: <ItemPage /> }] },
        {
          path: "tag",
          children: [{ index: true, element: <TagSettingsPage /> }],
        },
        {
          path: "type",
          children: [{ index: true, element: <TypeSettingsPage /> }],
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
