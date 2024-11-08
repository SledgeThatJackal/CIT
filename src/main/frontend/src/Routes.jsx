import React, { lazy, Suspense } from 'react';

import RootLayout from './layouts/RootLayout.jsx';

import Home from './layouts/Home.jsx';
import { createBrowserRouter } from 'react-router-dom';

const Container = lazy(() => import('./components/data_grid/container/ContainerTable.tsx'));

const Item = lazy(() => import('./components/data_grid/item/ItemComponent.tsx'));

const SettingsPage = lazy(() => import('./components/settings/SettingsPage.tsx'));
const TagSettings = lazy(() => import('./components/settings/TagSettings.tsx'));
const TypeSettings = lazy(() => import('./components/settings/TypeSettings.tsx'));

const SuspenseLayout = () => (
    <Suspense fallback={<>Loading...</>}>
        <RootLayout />
    </Suspense>
);

export const router = createBrowserRouter([
    {path: '/',
     element: <SuspenseLayout />,
     children: [
        {index: true, element: <Home />},
        {path: "container", 
            children: [
                {index: true, element: <Container />},
        ]},
        {path: "item",
            children: [
                {index: true, element: <Item />},
            ]},
        {path: "settings",
            element: <SettingsPage />,
            children: [
                {path: "tags", element: <TagSettings />},
                {path: "types", element: <TypeSettings />}
        ]}
     ]
    }
]);