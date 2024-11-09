import React, { lazy, Suspense } from "react";

import RootLayout from "../layouts/RootLayout.tsx";

import HomePage from "../pages/home/HomePage.tsx";
import { createBrowserRouter } from "react-router-dom";

const ContainerPage = lazy(
  () => import("../pages/container/ContainerPage.tsx"),
);

const ItemPage = lazy(() => import("../pages/item/ItemPage.tsx"));

const SettingsPage = lazy(() => import("../pages/settings/SettingsPage.tsx"));
const TagSettingsPage = lazy(() => import("../pages/settings/TagPage.tsx"));
const TypeSettingsPage = lazy(() => import("../pages/settings/TypePage.tsx"));

const SuspenseLayout = () => (
  <Suspense fallback={<>Loading...</>}>
    <RootLayout />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SuspenseLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "container",
        children: [{ index: true, element: <ContainerPage /> }],
      },
      { path: "item", children: [{ index: true, element: <ItemPage /> }] },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          { path: "tags", element: <TagSettingsPage /> },
          { path: "types", element: <TypeSettingsPage /> },
        ],
      },
    ],
  },
]);
