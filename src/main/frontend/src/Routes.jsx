import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './Layouts/RootLayout.jsx';

import Home from './Layouts/Home.jsx';

import ContainerTable from './Components/Container/ContainerTable.tsx';
import ContainerForm from './Components/Container/ContainerForm.tsx';

import ItemTable from './Components/Item/ItemTable.tsx';
import ItemForm from './Components/Item/ItemForm.tsx';

export const router = createBrowserRouter([
    {path: '/',
     element: <RootLayout />,
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