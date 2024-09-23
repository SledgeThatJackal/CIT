import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './Layouts/RootLayout.jsx';

import Home from './Layouts/Home.jsx';

const ContainerTable = lazy(() => import('./Components/Container/ContainerTable.tsx'));
const ContainerForm = lazy(() => import('./Components/Container/ContainerForm.tsx'));

const ItemTable = lazy(() => import('./Components/Item/ItemTable.tsx'));
const ItemForm = lazy(() => import('./Components/Item/ItemForm.tsx'));

const SettingsPage = lazy(() => import('./Components/Settings/SettingsPage.tsx'));

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
                {index: true, element: <ItemTable />},
                {path: "form", element: <ItemForm />},
            ]},
        {path: "settings",
            children: [
                {index: true, element: <SettingsPage />},
        ]}
     ]
    }
]);