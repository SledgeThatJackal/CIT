import React from 'react';
import { createRoot } from 'react-dom/client';
import ContainerTable from "./src/Components/Container/ContainerTable.jsx";
import ItemTable from "./src/Components/Item/ItemTable.jsx";

document.addEventListener('DOMContentLoaded', () => {
    const containerTable = document.getElementById('containerTable');
    const itemTable = document.getElementById('itemTable');

    if(containerTable){
        const root = createRoot(containerTable);
        root.render(React.createElement(ContainerTable));
    }

    if(itemTable){
        const root = createRoot(itemTable);
        root.render(React.createElement(ItemTable));
    }
});