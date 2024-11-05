import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './Layouts/RootLayout.jsx';

import Home from './Layouts/Home.jsx';

const ContainerTable = lazy(() => import('./Components/Container/ContainerTable.tsx'));
const ContainerForm = lazy(() => import('./Components/Container/ContainerForm.tsx'));

const Item = lazy(() => import('./Components/DataGrid/Item/ItemComponent.tsx'));

const SettingsPage = lazy(() => import('./Components/Settings/SettingsPage.tsx'));
const TagSettings = lazy(() => import('./Components/Settings/TagSettings.tsx'));
const TypeSettings = lazy(() => import('./Components/Settings/TypeSettings.tsx'));

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
                {index: true, element: <ContainerTable />},
                {path: "form", element: <ContainerForm />}
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