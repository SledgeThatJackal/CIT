import React from 'react';
import { createRoot } from 'react-dom/client';
import ContainerTable from "./src/Components/Container/ContainerTable.jsx";
import ItemTable from "./src/Components/Item/ItemTable.jsx";
import ContainerForm from './src/Components/Container/ContainerForm.tsx';

document.addEventListener('DOMContentLoaded', () => {
    const containerTable = document.getElementById('containerTable');
    const itemTable = document.getElementById('itemTable');
    const containerForm = document.getElementById('containerForm');

    if(containerTable){
        const root = createRoot(containerTable);
        root.render(React.createElement(ContainerTable));
    }

    if(itemTable){
        const root = createRoot(itemTable);
        root.render(React.createElement(ItemTable));
    }

    if(containerForm){
        const root = createRoot(containerForm);
        root.render(React.createElement(ContainerForm));
    }
});