import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import RootLayout from './Layouts/RootLayout.jsx';

import Home from './Layouts/Home.jsx';

const ContainerTable = React.lazy(() => import('./Components/Container/ContainerTable.tsx'));
const ContainerForm = React.lazy(() => import('./Components/Container/ContainerForm.tsx'));

const ItemTable = React.lazy(() => import('./Components/Item/ItemTable.tsx'));
const ItemForm = React.lazy(() => import('./Components/Item/ItemForm.tsx'));

const SuspenseLayout = () => (
    <React.Suspense fallback={<>...</>}>
        <RootLayout />
    </React.Suspense>
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
            ]}
     ]
    }
]);